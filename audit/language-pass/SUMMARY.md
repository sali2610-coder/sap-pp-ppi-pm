# Project NEO · Full-site SAP professional language pass · Summary

Branch: `design/neo-correction-pass` (preview only; `main` and production untouched).
Scope: visible copy, titles, labels, states, accessibility text across every NEO route family. No layout, data, logic, routes or SAP records changed.

## Method
- Glossary and editing rules: `GLOSSARY.md` (authoritative).
- Nine family audits with per-string tables: `01-global-shell.md`, `02-home.md`, `03-s4hana-domains.md`, `04-pm-pppi-objects.md`, `06-data-model-tables-tx.md`, `13-reference-catalogs.md`, `18-learn.md`, `22-books-reader.md`, `25-chat.md`.
- Cross-site consistency sweep (source grep on non-comment lines for מילון / מרשם / אחזקה / ייצור תהליכי / אפליקציות / em-en dashes / ellipsis / maqaf; rail-vs-page label alignment; lib label constants rendered by NEO surfaces).
- Browser sweep: `browser-sweep.log` + `evidence/` (31 routes × desktop 1440 light+dark × phone 390 dark).

## Totals (from the nine audits + cross-site fixes)
| | reviewed | kept | rewritten | removed | consolidated |
|---|---|---|---|---|---|
| 01 Global shell / search / dock / return | 271 | 175 | 88 | 0 | 8 |
| 02 Home | 41 | 31 | 10 | 0 | 0 |
| 03 S/4HANA + business domains + centers + studio | 320 | 195 | 125 | 11 | 6 |
| 04 PM / PP-PI workspaces + object detail | 318 | 118 | 200 | 0 (24 clauses inside rewrites) | 0 |
| 06 Tables / transactions / ERD | 478 | 258 | 187 | 9 | 24 |
| 13 BAPI-FM / IDoc / CDS / Fiori / enhancements | 471 | 250 | 221 | 0 (9 clauses) | 24 |
| 18 Knowledge / incidents / academy / certification | 214 | 71 | 138 | 3 | 2 |
| 22 Books / hub / reader | 254 | 112 | 142 | 0 (9 clauses) | 3 |
| 25 Ask the Library / NEO AI | 122 | 68 | 47 | 0 | 7 |
| Cross-site (NEO AI naming, מרכז הידע, REL_HE, lib label constants) | 25 | 0 | 25 | 0 | 0 |
| **Total** | **2,514** | **1,278** | **1,183** | **23 (+42 clauses)** | **74** |

## "מילון" replacements (context → term)
- Tables directory / catalogs → `טבלאות SAP`, `קטלוג טבלאות SAP`, `טבלאות SAP מתועדות` (Home, tables surface, rail counts).
- Field definitions, table structure, coverage bar on the shelf → `תיעוד טכני`, `התיעוד הטכני`, `מבנה הטבלה`.
- The two blueprint workbooks as a source → `תיעוד המקור`, `תיעוד הפרויקט` (ERD, object pages, S/4 impact copy in `lib/s4.ts`, CDS/Fiori data labels).
- Connected knowledge → `מרכז הידע`, `פלטפורמת הידע`, `מפת הידע`.
- Concept group "נתונים ומילון" → `ABAP Dictionary` (the group holds DDIC objects).
- "מרשם X" → `קטלוג X` everywhere (transactions, BAPI ו-FM, IDoc, enhancements).

## Major terminology corrections
- PM = `תחזוקת מפעל` (was אחזקה / אחזקת מפעל); PP-PI = `תעשיות תהליכיות` (was ייצור תהליכי); PP = `תכנון ייצור`.
- `יישום/יישומי Fiori` (was אפליקציה/אפליקציות); `מודול פונקציה (FM)`; `BAPI ו-FM`; `CDS Views` in headings, `תצוגת CDS` in sentences; `IDoc`/`IDocs`.
- `קרדינליות` (was עוצמה); `קשרים עם JOIN` (was קשרים חזקים); `טבלאות מקושרות` (was שכנים); `צעד` for process-chain steps so `שלב` stays the PP-PI Phase.
- `המעבר ל-S/4HANA`, `מוכנות ל-S/4HANA`, `קוקפיט המעבר` (was מיגרציה); bare `S/4` → `S/4HANA`; `ECC6` → `ECC`.
- Verdict vocabulary untouched (blueprint's own: ללא שינוי / מותאם / הוחלף / הוסר / לא הוכרע במקור); the Home migration counts map 1=מותאם, 2=הוחלף, 3=הוסר (content pass).
- `RISK_HE.none` = `נדרש אימות נוסף` (was לא ידוע); Studio legend `kept` = `ללא החלפה מתועדת` (it is a default bucket, not a verdict).
- Product names fixed: `NEO AI` for `/neo/chat/` (rail, dock, H1, metadata, return control), `שאל את הספרייה`, `SAP Academy`, `Architecture Studio`, `Project NEO`.
- Action labels in verbal-noun form across the site (הצגת / פתיחת / מעבר ל / חזרה ל / ניקוי / איפוס / שליחת / בחירת / המשך).

## Removed AI-writing signals (visible copy)
- Em/en dashes as punctuation in every in-scope string (remaining `—` occurrences are code comments; `–` remains only as the absent-value glyph in cells and unstated-cardinality chips).
- `…` in placeholders and copy (kept only for genuine loading states and the `clip()` truncation marker).
- Decorative arrows / `↔` / `➔` in headings; lettered "א ·/ב ·" kickers; "not X but Y" contrasts; first-person AI persona ("אני יועץ", "אחפש … ואענה"); "honesty" signatures ("האמיתי", "לא הומצאה", "לא נוסחו כאן עובדות"); design narration and implementation notes; defensive explanations ("המספר מוצג כפי שהוא ולא מנופח"); imperative plural / second-person masculine forms; curly and guillemet quotes in RTL copy.

## Unresolved terminology questions (owner decision)
1. `הסמכה` vs `הערכת ידע` for `/neo/certification/` (rail + page).
2. `Reservation` category label `שריונים (Reservation)`; `Fact Sheet`, VDM types (`Interface · Consumption · Analytical`), `Message Type` chip kept in SAP Latin form.
3. `טכניקות הרחבה` (chosen) vs the brief's `הרחבות והתאמות` (התאמות reads as Customizing).
4. `שריונים`, `בלופרינטים`, `Blast radius`, `ייצור בדיד (PP)`, `HCM / SuccessFactors`, `BW / Embedded Analytics`, MM/QM/WM/EWM/PP-DS/IBP Hebrew names — not in the glossary; kept as found.
5. `MOD_HE.MM` = `רכש ואספקה` (books) vs `ניהול חומרים / מלאי` (lib/primary-module).
6. `רשומות שדה` vs `שדות מתועדים`: Home counts fields on the merged-table basis (505), the tables page on the row basis (its own stats); labels differ, both derived.
7. Follow-up question chips in `lib/ai/client.ts` are the literal next question sent to the model, so their imperative wording was left as-is.

## Out of scope, found and not edited
- Authored knowledge content in `data/**` (topic titles such as "הודעות אחזקה", "תוכנית אחזקה", S/4 notes with em dashes, concept/incident bodies, domain descriptions) — validated source content; terminology drift there needs a data-owner pass.
- Legacy (non-NEO) surfaces: `app/page.tsx`, `app/pm/**`, `app/pp-pi/**`, `app/sap-infrastructure/**`, `components/function-catalog.tsx`, `components/onboarding-journey.tsx`, `components/cert/**`, `components/ecc-s4-block.tsx`, `lib/i18n.tsx`, `lib/academy/lesson-types.ts`, `lib/cert/generate.ts`.
- Frozen: `components/book-reader.tsx`, `components/chapter-reader.tsx`, `components/library/**`, `components/neo/**`, `app/library/**`, `data/books/**`, `data/ai-tree/**`.

## Recorded for the visual-polish phase (not copy)
- `/neo/ai/`: the `<h1>` sits inside `header.nxq-hero`, hidden by the stylesheet; the visible title is the welcome card `h2`.
- Long identifiers / book titles truncate in narrow rails (BAPI rows on phone, reader rail, ERD H1 at 390px) — pre-existing overflow handling, strings unchanged or shorter.
- Strings that grew and may need room: shelf H1 line 2, PP-PI filter pill, reader continue CTA (`המשך קריאה בתת-הפרק`), ERD node hint (`לחיצה ↡`), studio legend `ללא החלפה מתועדת`.
- `/neo/tables/AUFK/` books section links `/neo/books/` twice (structural duplicate).
- `nav-data.ts:207` SAP Academy rail count counts books while `/neo/academy/` lists courses.

## Gates (final build)
tsc 0 errors · eslint 0 errors (405 warnings, baseline) · 180/180 tests · build 7,800 pages · route manifest in sync · dead links 0 (7,802 pages) · sitemap 4,507 URLs, 0 dead · browser sweep 364 PASS, 8 pre-existing flags above.
