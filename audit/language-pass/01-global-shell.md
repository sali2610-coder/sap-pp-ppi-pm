# Language pass · 01 · Global application shell

Branch: `design/neo-correction-pass` · Scope: route families 1, 27, 28, 29, 30 · Glossary: `audit/language-pass/GLOSSARY.md`
Files in scope: `components/neo-shell/{neo-shell.tsx, mobile-nav.tsx, mod-var.ts, nav-data.ts, preview.tsx, shelf.tsx, table-list.tsx, types.ts}`, `components/neo-shell/search/**`, `components/neo-shell/dock/**`, `components/neo-shell/nav-context/**`, `app/neo/layout.tsx`.
Method: every string literal, JSX text, `aria-label`, `title=`, `placeholder=`, metadata and screen-reader text was inventoried; code comments were left untouched. Edits are strings only: no JSX structure, class, prop, logic, route, href, number or identifier changed. `./node_modules/.bin/tsc --noEmit` passes after the edits (exit 0).

Line numbers are post-edit.

## 1. Changed strings

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| 1 rail · module labels (shared constant, consumed by tables/transactions/reference/IDoc/BAPI/CDS/Fiori surfaces) | components/neo-shell/mod-var.ts:29-31 | `PM: "אחזקה"`, `"PP-PI": "ייצור תהליכי"`, `PP: "ייצור"` | inaccurate SAP terminology | `PM: "תחזוקת מפעל"`, `"PP-PI": "תעשיות תהליכיות"`, `PP: "תכנון ייצור"` | A: Plant Maintenance / PP-PI / PP rows (avoid אחזקה, ייצור תהליכי, ייצור alone) | rewrite | medium: constant is imported by 11 files outside this scope; every consumer now renders the glossary form |
| 1 rail · module labels (server copy) | components/neo-shell/nav-data.ts:65 | same three values | inaccurate SAP terminology | same three values as mod-var | A | rewrite | low |
| 1 rail · Modules group | nav-data.ts:138 | `אחזקה · PM` | inaccurate SAP terminology + must-do rail label | `PM · תחזוקת מפעל` | A: rail label `PM · תחזוקת מפעל` | rewrite | low |
| 1 rail · Modules group | nav-data.ts:139 | `ייצור · PP-PI` | inaccurate SAP terminology + must-do rail label | `PP-PI · תעשיות תהליכיות` | A: rail label `PP-PI · תעשיות תהליכיות` | rewrite | low |
| 1 rail · S/4 group heading | nav-data.ts:153 | `מעבר ל-S/4HANA` | inconsistent naming | `המעבר ל-S/4HANA` | A: S/4HANA transition | rewrite | low |
| 1 rail · S/4 group | nav-data.ts:156 | `מוכנות למעבר` | vague label | `מוכנות ל-S/4HANA` | A: S/4HANA readiness | rewrite | low |
| 1 rail · S/4 group | nav-data.ts:157 | `קוקפיט מיגרציה` | inconsistent naming | `קוקפיט המעבר` | A: Migration Cockpit (avoid קוקפיט המיגרציה) | rewrite | low |
| 1 rail · Reference group | nav-data.ts:164 | `טבלאות` | vague label (bare "table" in heading) | `טבלאות SAP` | A: SAP Table (avoid טבלה alone in headings) | rewrite | low |
| 1 rail · Reference group | nav-data.ts:165 | `מודל נתונים · ERD` | inconsistent Hebrew | `מודל הנתונים · ERD` | A: Data Model | rewrite | low |
| 1 rail · Reference group | nav-data.ts:167 | `BAPIs / FMs` | inconsistent naming | `BAPI ו-FM` | A: Function Module pair `BAPI ו-FM` | rewrite | low |
| 1 rail · Reference group | nav-data.ts:169 | countLabel `תצוגות` | vague label (view alone) | `תצוגות CDS` | A: CDS View (avoid תצוגה alone) | rewrite | low |
| 1 rail · Reference group | nav-data.ts:170 | `Fiori Apps` / countLabel `אפליקציות מלאות` | must-do + translation | `יישומי Fiori` / `יישומים` | A: Fiori Application | rewrite | low |
| 1 rail · Reference group | nav-data.ts:171 | `Enhancements` | translation problem | `הרחבות` | A: Enhancement = הרחבה | rewrite | medium: the `/neo/enhancements/` page heading (out of scope) may still say "Enhancements" |
| 1 rail · Library group | nav-data.ts:191 | `ספרייה דיגיטלית` | inconsistent naming | `ספריית SAP` | A: SAP Books = ספריית SAP | rewrite | low |
| 1 rail · Knowledge group | nav-data.ts:206 | `מרכז ידע` | inconsistent naming | `מרכז הידע` | A: Knowledge Center | rewrite | low |
| 1 rail · Assistant group | nav-data.ts:220 | `צ'אט AI` | inconsistent naming (the `/neo/chat/` surface calls itself `צ׳אט NEO` in its h1 and metadata) | `צ׳אט NEO` | consolidation with app/neo/chat/page.tsx:22 and chat/general-chat.tsx:100 | consolidate | low |
| 1 rail hover preview · module header | nav-data.ts:273 | `אחזקה · PM` / `ייצור · PP-PI` | inaccurate SAP terminology | `PM · תחזוקת מפעל` / `PP-PI · תעשיות תהליכיות` | A | rewrite | low (see note on duplication in §5) |
| 27 rail search index · T-Code subtitle | nav-data.ts:393 | `טרנזקציה במודולים PM / PP-PI` | inaccurate (a code may belong to one module only) | `טרנזקציית SAP בתיעוד הפרויקט` | C: never upgrade an uncertain status | rewrite | low |
| 27 rail search index · function fallback subtitle | nav-data.ts:402 | `ממשק פונקציה` | inaccurate SAP terminology | `אובייקט פונקציה` | consistency with countLabel `אובייקטי פונקציה` (nav-data.ts:167) | rewrite | low |
| 1 hub page · PM lede | nav-data.ts:460 | `אחזקת מפעל: ציוד, מיקומים פונקציונליים, הודעות ופקודות אחזקה. כל מספר בעמוד נגזר ממילון הנתונים של הפרויקט.` | inaccurate SAP terminology + מילון | `תחזוקת מפעל: ציוד, מיקומים פונקציונליים, הודעות תחזוקה והזמנות תחזוקה. כל מספר בעמוד נגזר מהתיעוד הטכני של הפרויקט.` | A: Maintenance Notification / Maintenance Order (avoid פקודת עבודה); B: מילון → תיעוד טכני | rewrite | low (module hubs render `ModuleWorkspace`, so this lede is not on the live page) |
| 1 hub page · PP-PI lede | nav-data.ts:461 | `ייצור תהליכי: מתכונים, משאבים, פקודות תהליך ואישורים. כל מספר בעמוד נגזר ממילון הנתונים של הפרויקט.` | inaccurate SAP terminology + מילון | `תעשיות תהליכיות: מתכוני אב, משאבים, הזמנות תהליך ואישורים. כל מספר בעמוד נגזר מהתיעוד הטכני של הפרויקט.` | A: Master Recipe, Process Order; B | rewrite | low |
| 1 hub page · module stats | nav-data.ts:466, 468 | `BAPIs / FMs`, `Fiori Apps` | inconsistent naming | `BAPI ו-FM`, `יישומי Fiori` | A | rewrite | low |
| 1 hub page · tables lede | nav-data.ts:481 | `מילון הטבלאות המלא של הפרויקט, מסודר לפי עומק התיעוד. לחיצה על שורה טוענת את ההקשר המלא שלה במדף שברכיב הניווט.` | מילון + unclear CTA | `קטלוג טבלאות SAP המלא של הפרויקט, מסודר לפי עומק התיעוד. בחירת שורה טוענת את ההקשר המלא שלה למדף ההקשר שבניווט.` | B: SAP tables → קטלוג טבלאות SAP; C: action labels | rewrite | low |
| 1 hub page · transactions lede | nav-data.ts:503 | `מרשם הטרנזקציות של הפרויקט. הפירוט לעומק קיים לחלק מהן; השאר נשמרות כרשומות קלות: ההבחנה מוצגת ולא מטושטשת.` | מרשם + defensive copy | `קטלוג הטרנזקציות של הפרויקט. לחלק מהטרנזקציות קיים תיעוד מלא; השאר רשומות כרשומות בסיסיות, וההבחנה מסומנת בכל רשומה.` | B: מרשם → קטלוג; C: no defensive explanations | rewrite | low |
| 1 hub page · transactions stat | nav-data.ts:507 | `רשומות קלות` | vague label | `רשומות בסיסיות` | consistency with the rewritten lede | rewrite | low |
| 1 hub page · BAPI lede + list title | nav-data.ts:520, 523 | `אובייקטי פונקציה, BAPIs ו-Function Modules, כפי שהם רשומים במרשם הפרויקט.` / `מדגם מהמרשם` | מרשם + inconsistent naming | `אובייקטי פונקציה, BAPI ו-FM, כפי שהם רשומים בקטלוג הפרויקט.` / `מדגם מהקטלוג` | B; A | rewrite | low |
| 1 hub page · IDoc lede | nav-data.ts:531 | `סוגי ההודעה של IDoc שקיימים בפועל בנתוני PM / PP-PI. שניים בלבד: המספר מוצג כפי שהוא ולא מנופח.` | defensive copy + hard-coded count duplicated in prose | `סוגי הודעת IDoc המתועדים בנתוני PM ו-PP-PI. המספר נספר מהנתונים כפי שהם.` | C: no defensive explanations; D: the count itself is untouched (`types.length` stat directly above) | rewrite | medium: the literal "שניים" was removed from prose; the number is still displayed from the dataset |
| 1 hub page · CDS lede + labels | nav-data.ts:541-544 | `מיפוי טבלה קלאסית → תצוגת CDS ב-S/4HANA, מאומת ידנית.` / `תצוגות` (x2) | unsupported claim ("מאומת ידנית") + view alone | `מיפוי טבלה קלאסית → תצוגת CDS ב-S/4HANA, לפי תיעוד הפרויקט.` / `תצוגות CDS` (x2) | C: never upgrade an uncertain status; A: CDS View. Arrow kept: SAP flow notation | rewrite | low |
| 1 hub page · Fiori lede + list title | nav-data.ts:550, 553 | `אפליקציות Fiori עם עמוד מלא בפרויקט. קיים בנוסף אינדקס מטא-דאטה רחב בהרבה, והשניים אינם מוצגים כמספר אחד.` / `אפליקציות` | must-do + defensive copy | `יישומי Fiori עם עמוד מלא בפרויקט. אינדקס המטא-דאטה הרחב יותר של יישומי Fiori נספר בנפרד.` / `יישומים` | A; C | rewrite | low |
| 1 hub page · library lede | nav-data.ts:568 | `הספרייה הדיגיטלית: אינדקס מבני של המדריכים הרשמיים.` | inconsistent naming | `ספריית SAP: אינדקס מבני של המדריכים הרשמיים.` | A | rewrite | low |
| 1 hub page · knowledge lede | nav-data.ts:581 | `מרכז המושגים: הסבר עסקי וטכני לכל מונח, כולל ההבדל בין ECC ל-S/4HANA.` | inconsistent naming + ECC form | `מרכז הידע: הסבר עסקי וטכני לכל מונח, כולל ההבדל בין SAP ECC ל-S/4HANA.` | A: Knowledge Center; A: ECC | rewrite | low |
| 1 hub page · incidents lede | nav-data.ts:599 | `קטלוג התקלות: סימפטום, שורש, טרנזקציות אבחון וצעדי תיקון.` | translation problem | `קטלוג התקלות: תסמין, סיבת שורש, טרנזקציות אבחון וצעדי תיקון.` | C: Hebrew register | rewrite | low |
| 1 hub page · default lede (ai/certification/studio/chat fall-through) | nav-data.ts:623 | `היעד קיים במוצר, ואין לו ספירה מגובה בנתוני הפרויקט. שלב 1 של העיצוב מציג את מסגרת הניווט בלבד: התוכן המלא נבנה בשלב הבא.` | internal note / design narration | `ליעד זה אין ספירה מגובה בנתוני הפרויקט.` | C: no implementation notes | rewrite | low (each of these ids owns a route dir, so the fall-through is not the live page) |
| 1 landing stats | nav-data.ts:678, 680 | `טבלאות במילון` / `טרנזקציות במרשם` | מילון / מרשם | `טבלאות SAP` / `טרנזקציות בקטלוג` | B | rewrite | low (`landingContent()` has no importer today) |
| 1 landing modules | nav-data.ts:686, 692, 697, 703 | `אחזקה · PM`, `ייצור · PP-PI`, `BAPIs / FMs` (x2) | inaccurate SAP terminology | `PM · תחזוקת מפעל`, `PP-PI · תעשיות תהליכיות`, `BAPI ו-FM` (x2) | A | rewrite | low |
| 30 mobile sheet · close button | components/neo-shell/mobile-nav.tsx:60 | aria-label `סגור` | accessibility label (no result of the action) | `סגירת הניווט` | C: action labels; brief must-do | rewrite | low |
| 28 shelf · recent empty state | components/neo-shell/shelf.tsx:66 | `עדיין לא נפתח אובייקט. פתיחת טבלה מהעמוד או מהחיפוש תוסיף אותה לכאן, זו אותה רשימה שהמוצר כבר שומר, לא רשימה נפרדת.` | implementation note + "not X but Y" | `עדיין לא נפתח אובייקט. פתיחת טבלה מהעמוד או מהחיפוש תוסיף אותה לרשימה זו.` | C | rewrite | low |
| 28 shelf · pinned empty state | shelf.tsx:102 | `אין אובייקטים מוצמדים. הצמדה נעשית מעמוד האובייקט ומשותפת לכל המוצר.` | vague ("המוצר") | `אין אובייקטים מוצמדים. הצמדה נעשית מעמוד האובייקט וחלה בכל Project NEO.` | D: product name | rewrite | low |
| 28 shelf · pinned note | shelf.tsx:121 | `{n} אובייקטים מוצמדים · לחיצה טוענת את ההקשר המלא` | unclear CTA | `{n} אובייקטים מוצמדים · בחירה טוענת את ההקשר המלא` | C: action labels | rewrite | low |
| 28 shelf · shared-table note | shelf.tsx:145 | `טבלה משותפת ל-PM ול-PP-PI, ולכן שני ההקשרים מוצגים: אין כאן בחירה שרירותית של מודול.` | defensive copy | `טבלה משותפת ל-PM ול-PP-PI: שני ההקשרים מוצגים.` | C | rewrite | low |
| 1 metadata · title | app/neo/layout.tsx:23 | `Project NEO · שלב עיצוב` | internal note | `Project NEO` | C: no implementation notes; D: product name kept | rewrite | low |
| 1 metadata · description | app/neo/layout.tsx:24 | `מעטפת האפליקציה והניווט של Project NEO: שלב 1.` | internal note / design narration | `Project NEO: קוקפיט המעבר מ-SAP ECC ל-S/4HANA ותיעוד טכני למודולי PM ו-PP-PI.` | CLAUDE.md product definition; A: ECC, S/4HANA transition | rewrite | low |
| 1 back links · fallback parents | components/neo-shell/nav-context/fallbacks.ts:32, 37 | `טבלאות` (x2) | bare "tables" | `טבלאות SAP` (x2) | A; consistency with rail | rewrite | low |
| 1 back links · fallback parents | fallbacks.ts:40 | `מרשם BAPI ו-FM` | מרשם | `קטלוג BAPI ו-FM` | B | rewrite | low |
| 1 back links · fallback parents | fallbacks.ts:41 | `מרשם ה-IDoc` | מרשם | `קטלוג IDoc` | B | rewrite | low |
| 1 back links · fallback parents | fallbacks.ts:42 | `אפליקציות Fiori` | must-do | `יישומי Fiori` | A | rewrite | low |
| 1 back links · fallback parents | fallbacks.ts:43 | `Enhancements` | translation | `הרחבות` | A | rewrite | low |
| 1 back links · fallback parents | fallbacks.ts:48-49 | `מוכנות למעבר` / `קוקפיט מיגרציה` | inconsistent naming | `מוכנות ל-S/4HANA` / `קוקפיט המעבר` | A | rewrite | low |
| 1 back links · fallback parents | fallbacks.ts:53, 55 | `מדף הספרים` (x2) | inconsistent naming | `ספריית SAP` (x2) | A; consistency with rail | rewrite | low |
| 1 back links · fallback parents | fallbacks.ts:57, 61 | `מרכז ידע` (x2) | inconsistent naming | `מרכז הידע` (x2) | A | rewrite | low |
| 1 back links · fallback parents | fallbacks.ts:65-66 | `אחזקה · PM` / `ייצור · PP-PI` | inaccurate SAP terminology | `PM · תחזוקת מפעל` / `PP-PI · תעשיות תהליכיות` | A | rewrite | low (`returnLabel()` yields `חזרה ל-PM · תחזוקת מפעל`, Latin-first rule holds) |
| 1 back links · fallback parents | fallbacks.ts:69 | `צ׳אט AI` | inconsistent naming | `צ׳אט NEO` | consolidation with chat surface | consolidate | low |
| 28 dock · context kind | components/neo-shell/dock/context.ts:49 | `מדריך עיון` | vague label | `קטלוג` | B: reference lists are catalogs | rewrite | low |
| 28 dock · context subject | context.ts:75 | `מדף הספרים` | inconsistent naming | `ספריית SAP` | A | rewrite | low |
| 28 dock · context subject | context.ts:77 | `האקדמיה` | inconsistent naming | `SAP Academy` | D: product name | rewrite | low |
| 28 dock · context subject | context.ts:78 | `מרכז ידע` | inconsistent naming | `מרכז הידע` | A | rewrite | low |
| 27 command surface · result kinds | components/neo-shell/search/build.ts:27 | `Function Module` | translation | `מודול פונקציה` | A: Function Module | rewrite | low |
| 27 command surface · result kinds | build.ts:29 | `Fiori App` | must-do | `יישום Fiori` | A | rewrite | low |
| 27 command surface · result kinds | build.ts:33 | `מדריך` (kind `guide`, built from CONCEPTS) | inaccurate label | `מושג` | consistency with context.ts `knowledge: "מושג"` and the knowledge hub's `מושגים` | rewrite | low |
| 27 command surface · module results | components/neo-shell/search/command-index.ts:130-131 | `אחזקה · PM` / `ייצור · PP-PI` | inaccurate SAP terminology | `PM · תחזוקת מפעל` / `PP-PI · תעשיות תהליכיות` | A | rewrite | low |
| 27 command surface · footer gap | command-index.ts:248 | `אין ישות «אובייקט» נפרדת בנתוני הפרויקט: אובייקט מילון הוא הטבלה עצמה, ולכן תוצאות «טבלה» נפתחות לעמוד האובייקט המלא ב-/neo/object.` | ישות (avoid) + מילון + internal path in copy | `אין רשומת «אובייקט» נפרדת בנתוני הפרויקט: האובייקט הוא טבלת SAP עצמה, ולכן תוצאה מסוג «טבלה» נפתחת בעמוד האובייקט המלא.` | A: Business Object (avoid ישות); B; C | rewrite | low |
| 27 command surface · row context action | components/neo-shell/search/command-surface.tsx:127 | aria-label `טען את ההקשר של X למדף` | accessibility label (imperative) | `טעינת ההקשר של X למדף ההקשר` | C: action labels | rewrite | low |
| 27 command surface · detail empty | command-surface.tsx:152 | `בחר תוצאה כדי לראות את ההקשר המלא שלה.` | second-person imperative | `בחירת תוצאה תציג את ההקשר המלא שלה.` | C | rewrite | low |
| 27 command surface · detail destination | command-surface.tsx:195 | `אין עמוד ייעודי לרשומה הזו` | register | `לרשומה זו אין עמוד ייעודי` | C | rewrite | low |
| 27 command surface · detail footer | command-surface.tsx:226 | `לרשומה הזו אין עדיין עמוד ייעודי במרחב /neo` | internal path + implied promise ("עדיין") | `לרשומה זו אין עמוד ייעודי` | C | rewrite | low |
| 27/30 command surface · mobile field | command-surface.tsx:310-311 | placeholder `טבלה · שדה · טרנזקציה · BAPI · ספר` / aria-label `חיפוש בפרויקט` | vague placeholder + inconsistent with rail field | `טבלה, שדה, טרנזקציה, BAPI או ספר` / `חיפוש בניווט ובתיעוד הטכני` | brief: professional, specific; consolidated with rail field | consolidate | low |
| 27/30 command surface · mobile close | command-surface.tsx:318 | aria-label `סגור חיפוש` | accessibility label | `סגירת החיפוש` | C | rewrite | low |
| 27 command surface · browse readout | command-surface.tsx:336 | `{n} רשומות ב{kind} · הקלד כדי לצמצם` | imperative + "רשומות בטבלה" reads as "records in the table" | `{n} רשומות מסוג {kind} · הקלדה מצמצמת את הרשימה` | C | rewrite | low |
| 27 command surface · idle readout | command-surface.tsx:340 | `... · הקלד כדי לסנן` | imperative | `... · הקלדה מסננת את הרשימה` | C | rewrite | low |
| 27 command surface · scope hint | command-surface.tsx:376 | `כל התוצאות נקראות מנתוני הפרויקט: טבלאות, טרנזקציות, אובייקטי פונקציה, ספרים ותהליכים.` | incomplete list (fields are indexed) | `התוצאות נקראות מנתוני הפרויקט: טבלאות, שדות, טרנזקציות, אובייקטי פונקציה, ספרים ותהליכים.` | command-index.ts `fields()` | rewrite | low |
| 29 command surface · idle heading | command-surface.tsx:420 | `מה יש באינדקס: בחר משפחה כדי לעיין בה` | immature tone + imperative | `תוכן האינדקס: בחירת משפחה מציגה את כל הרשומות שלה` | C | rewrite | low |
| 29 command surface · idle footer | command-surface.tsx:439 | `{n} רשומות: כולן מנתוני הפרויקט. אין כאן טקסט חופשי ואין השלמות שהומצאו.` | defensive copy | `{n} רשומות, כולן מנתוני הפרויקט.` | C | rewrite | low |
| 29 command surface · no results | command-surface.tsx:444-446 | `אין רשומה בנתוני הפרויקט עבור «q»[ במודול X]. החיפוש עובר על כל האינדקס, {n} רשומות אמיתיות, ולא על טקסט חופשי.` | empty state wording + defensive | `לא נמצאו תוצאות עבור «q»[ במודול X]. החיפוש עובר על כל האינדקס, {n} רשומות מנתוני הפרויקט.` | C: empty wording; JSX slots unchanged | rewrite | low |
| 27 command surface · show-all | command-surface.tsx:484 | `הצג את כל {n} התוצאות ב{kind}` | imperative + "ב" reads wrong with singular kind | `הצגת כל {n} התוצאות מסוג {kind}` | C | rewrite | low |
| 1 shell · skip link | components/neo-shell/search/shell-client.tsx:644 | `דלג לתוכן` | imperative | `מעבר לתוכן הראשי` | C: action labels | rewrite | low |
| 1 rail · logo link | shell-client.tsx:658 | aria-label `SAP by Sali · Project NEO` | accessibility label (names, not the action) | `Project NEO: מעבר למסך הבית` | brief: aria-label describes the result | rewrite | low |
| 1 rail · collapse | shell-client.tsx:668 | `הרחב ניווט` / `כווץ ניווט` | imperative | `הרחבת הניווט` / `כיווץ הניווט` | C | rewrite | low |
| 27 rail · quick action | shell-client.tsx:681 | `חפש בניווט ובתיעוד` | imperative | `חיפוש בניווט ובתיעוד` | C | rewrite | low |
| 27 rail · search field | shell-client.tsx:694-695 | placeholder `טבלה · טרנזקציה · BAPI · ספר` / aria-label `חיפוש בניווט ובמילון` | vague + מילון | `טבלה, שדה, טרנזקציה, BAPI או ספר` / `חיפוש בניווט ובתיעוד הטכני` | B: technical documentation; consolidated with mobile field | consolidate | low |
| 27 rail · close search | shell-client.tsx:706 | `סגור חיפוש` | accessibility label | `סגירת החיפוש` | C | rewrite | low |
| 27 rail · sr live region | shell-client.tsx:720 | `{n} יעדי ניווט · האינדקס המלא בלוח הפקודות` | vague ("לוח הפקודות" is not a product name) | `{n} יעדי ניווט · האינדקס המלא זמין בחלון החיפוש` | consistency | rewrite | low |
| 1 rail · group toggle | shell-client.tsx:770 | aria-label `כווץ X` / `הרחב X` | imperative | `כיווץ הקבוצה X` / `הרחבת הקבוצה X` | C | rewrite | low |
| 1 rail foot · context mode | shell-client.tsx:848 | `חזור לעץ הניווט` / `עבור למצב הקשר` | imperative | `חזרה לעץ הניווט` / `מעבר למצב הקשר` | C | rewrite | low |
| 1 peek strip | shell-client.tsx:862 | `הצג ניווט` | imperative | `הצגת הניווט` | C | rewrite | low |
| 1 topbar · rail toggle | shell-client.tsx:875 | `הצג או הסתר ניווט` | imperative | `הצגה או הסתרה של הניווט` | C | rewrite | low |
| 27 topbar · command bar | shell-client.tsx:897 | `חפש טבלה, טרנזקציה, BAPI, ספר…` | imperative + ellipsis (AI signature) | `חיפוש: טבלה, שדה, טרנזקציה, BAPI או ספר` | C: no `…` | rewrite | low |
| 1 topbar · peek mode | shell-client.tsx:904 | `מצב הצצה לניווט` | vague accessibility label | `מעבר למצב הצצה: הניווט נפתח בריחוף בלבד` | brief: describe the result | rewrite | low |
| 28 dock · scrim | components/neo-shell/dock/neo-dock.tsx:120 | aria-label `סגור` | accessibility label | `סגירת החלונית` | C | rewrite | low |
| 28 dock · font panel | neo-dock.tsx:125-126 | h2 `גופן וגודל` / close `סגור` | duplicate copy (dialog label says `גופן וגודל טקסט`) + label | `גופן וגודל טקסט` / `סגירת חלונית הגופן` | consolidation with aria-label on line 123 | consolidate | low |
| 28 dock · reset | neo-dock.tsx:175 | `חזרה לברירת המחדל של NEO` | action label | `איפוס לברירת המחדל של NEO` | C: איפוס | rewrite | low |
| 28 dock · ask panel close | neo-dock.tsx:201 | `סגור` | accessibility label | `סגירת חלונית שאל את NEO` | C | rewrite | low |
| 28 dock · ask panel note | neo-dock.tsx:213-214 | `העוזר הכללי של NEO עדיין לא מחובר למנוע מענה. כדי לא להציג תשובה שאין מאחוריה מקור מאומת, הוא אינו עונה כאן. שתי הסביבות שכן עונות פתוחות למטה, ושתיהן יקבלו את ההקשר שמוצג למעלה.` | defensive copy + unsupported claim (both links are plain `<Link>`s and pass no context) | `חלונית זו מציגה את ההקשר הנוכחי בלבד ואינה עונה על שאלות. שאלות נענות באחת משתי הסביבות שלמטה.` | C: no defensive explanations; never claim what does not happen | rewrite | low |
| 28 dock · chat link | neo-dock.tsx:226 | `צ׳אט NEO כללי` | inconsistent naming | `צ׳אט NEO` | consolidation with chat surface | consolidate | low |

## 2. Kept strings (by group)

- Product and brand names: `Project NEO`, `SAP by Sali`, `NEO`, `שאל את NEO`, `שאל את הספרייה`, `SAP Academy`, `Architecture Studio`, `Sali Halif`, `Web Coding`, footer credit `Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding` (shell-client.tsx:928). Glossary D.
- Rail group labels `מודולים`, `עיון · Reference`, `ספרייה`, `ידע ולמידה`, `כלים`, `עוזר SAP`; item labels `תחומים עסקיים`, `מרכז S/4HANA`, `טרנזקציות`, `IDocs`, `CDS Views`, `שאל את הספרייה`, `SAP Academy`, `תקלות`, `הסמכה`, `Architecture Studio`; count labels `טבלאות`, `תחומים`, `אובייקטים`, `נושאי שינוי`, `אובייקטי מיגרציה` (see §6), `קשרים`, `טרנזקציות`, `אובייקטי פונקציה`, `סוגי הודעה`, `טכניקות`, `ספרים`, `רשומות`, `ספרי לימוד`, `תקלות`.
- Hub page stats and list titles that already match the glossary: `טבלאות ייחודיות`, `שדות מתועדים`, `טרנזקציות`, `CDS Views`, `נושאים במודול`, `שדות`, `PM`, `PP-PI`, `סה״כ`, `מתועדות לעומק`, `לפי מודול`, `אובייקטים`, `סוגי הודעה`, `סוג הודעת IDoc בנתוני הפרויקט`, `עמודים מלאים`, `טכניקות ההרחבה של SAP: מ-User Exit ועד BAdI ו-Extension Points.`, `ספרים`, `פרקים`, `עמודים`, `מושגים`, `ספרי הלימוד של האקדמיה: ...`, `תקלות`, `תחומים`, domain-model lede, `ספרים בספרייה`.
- Preview layer (preview.tsx): `אחרון שנפתח:`, `אין ספר משויך`, `אין ספירה מגובה בנתוני הפרויקט`.
- Shelf (shelf.tsx): tabs `אחרונים` / `מוצמדים` / `הקשר`, `מדף הקשר`, `אין הקשר טעון. בחירת טבלה מהעמוד או מהמדף תטען לכאן את ההקשר המלא שלה.`, `הקשר נוכחי`, `הקשרי מודול (n)`, `טרנזקציות (n)`, `קשרים (n)`.
- Mobile shell (mobile-nav.tsx): `ניווט תחתון`, `בית`, `ניווט`, `חיפוש`, dialog label `ניווט`.
- Shell chrome (shell-client.tsx): `ניווט ראשי`, `⌘K` kbd hints, `נתיב`, `NEO` crumb, `Project NEO` mobile fallback, `SH` avatar, live-region `{n} רשומות · {hits} מתוך {total} יעדי ניווט`, `תוצאות החיפוש` (origin label, yields `חזרה לתוצאות החיפוש · <query>`), tab-panel labels `אחרונים` / `מוצמדים` / `הקשר`.
- Command surface (command-surface.tsx): `אין עמוד ייעודי`, `הקשר`, `מודול`, `מחלקת אובייקט`, `קשר`, `יעד`, `Enter פותח את היעד`, readout `{n} תוצאות עבור {q} · {hits} מתוך {total} יעדי ניווט`, `רשומות באינדקס`, `סינון לפי סוג`, `הכל`, `סינון לפי מודול`, `כל המודולים`, `תוצאות חיפוש`, `הקשר התוצאה`, `{n} מתוך {total}`, footer kbd hints `מעבר` / `קצוות` / `פתיחה` / `סגירה`, `טרנזקציות (n)`, `קשרים (n)`.
- Result kinds (build.ts): `ניווט`, `מודול`, `טבלה`, `שדה`, `טרנזקציה`, `BAPI`, `CDS View`, `תהליך`, `פרק`, `ספר`, `תקלה`. Relationship lines (command-index.ts): `{n} טבלאות · {n} טרנזקציות · {n} נושאים`, `{title} · פרק {n} · עמ׳ {page}`, `{n} שלבים · {n} טבלאות · {n} טרנזקציות`, `{title} · {group}`; gap heading `אובייקט`.
- Dock: `בחירת גופן וגודל טקסט`, `גופן`, `שאל את NEO על העמוד הזה`, `שאל את NEO`, dialog label `גופן וגודל טקסט`, `הבחירה נשמרת במכשיר הזה וחלה על כל מסכי NEO. הגופנים מותקנים במערכת ההפעלה, ולכן נטענים מיידית וללא חיבור לרשת.`, legends `גופן` / `גודל טקסט`, sample `אבגד Aa`, `ההקשר הנוכחי`, `תשובות מתוך 11 הספרים, עם מקורות` (see §6), `שאלות SAP כלליות, ללא מקורות מהפרויקט`.
- Theme switch (theme-switch.tsx): `יום` / `אוטומטי` / `לילה`, hints `מצב יום` / `לפי הגדרת מערכת ההפעלה` / `מצב לילה`, `מראה: יום, אוטומטי או לילה`, `{hint} · כרגע {resolved}`.
- Typography (typography.ts): faces `מערכת` / `סן־סריף` / `סריף` / `קריאוּת מוגברת` with notes, sizes `קטן` / `רגיל` / `גדול` / `גדול מאוד`. (`סן־סריף` uses a maqaf inside a Hebrew compound, not before a Latin term; glossary C only bans maqaf before Latin.)
- Dock context kinds (context.ts): `מסך הבית`, `מודול`, `אובייקט SAP`, `טבלת SAP`, `טרנזקציה`, `ספר`, `קריאה`, `שיעור`, `קורס`, `מודל הנתונים`, `מושג`, `תקלה`, `חיפוש`, `Project NEO`; subjects `טבלאות SAP`, `טרנזקציות`, `תקלות`.
- Back links (fallbacks.ts / origin.ts): `טרנזקציות`, `מודל הנתונים`, `תצוגות CDS`, `תחומים עסקיים` (x2), `מרכז S/4HANA`, `SAP Academy`, `תקלות`, `הסמכה`, `Architecture Studio`, `שאל את הספרייה`, `מסך הבית` (x2); prefix `חזרה ל` / `חזרה ל-` (ASCII hyphen before Latin, glossary C).
- Files with no visible strings: neo-shell.tsx, types.ts, table-list.tsx (except `{n} שדות` and the `—` placeholder), search/types.ts, nav-context/{smart-return.tsx, index.ts, types.ts}.

## 3. Totals

| | count |
|---|---|
| Strings reviewed | 271 |
| Kept | 175 |
| Rewritten | 88 |
| Removed | 0 (removals were folded into rewrites; no string was deleted outright) |
| Consolidated | 8 (search placeholders/labels x2, chat name x3, font panel heading, `טבלאות SAP` parents x2 aligned to the rail) |

## 4. "מילון" replacements

| file:line | context | before | after |
|---|---|---|---|
| nav-data.ts:460 | PM hub lede | `נגזר ממילון הנתונים של הפרויקט` | `נגזר מהתיעוד הטכני של הפרויקט` |
| nav-data.ts:461 | PP-PI hub lede | `נגזר ממילון הנתונים של הפרויקט` | `נגזר מהתיעוד הטכני של הפרויקט` |
| nav-data.ts:481 | tables hub lede | `מילון הטבלאות המלא` | `קטלוג טבלאות SAP המלא` |
| nav-data.ts:678 | landing stat | `טבלאות במילון` | `טבלאות SAP` |
| shell-client.tsx:695 | rail search field aria-label | `חיפוש בניווט ובמילון` | `חיפוש בניווט ובתיעוד הטכני` |
| command-index.ts:248 | command-surface footer gap | `אובייקט מילון הוא הטבלה עצמה` | `האובייקט הוא טבלת SAP עצמה` |

"מרשם" → "קטלוג": nav-data.ts:503, 520, 523, 680; fallbacks.ts:40, 41.

## 5. Removed AI-writing signals

- Ellipsis in the topbar command bar `חפש טבלה, טרנזקציה, BAPI, ספר…` (shell-client.tsx:897).
- "Not X but Y" contrasts: shelf recent empty state (`זו אותה רשימה ... לא רשימה נפרדת`), transactions lede (`מוצגת ולא מטושטשת`), IDoc lede (`כפי שהוא ולא מנופח`), Fiori lede (`אינם מוצגים כמספר אחד`), command-surface idle footer and no-results (`ולא על טקסט חופשי`, `אין כאן טקסט חופשי ואין השלמות שהומצאו`).
- Defensive explanations: shelf shared-table note (`אין כאן בחירה שרירותית של מודול`), dock assistant note (`כדי לא להציג תשובה שאין מאחוריה מקור מאומת`).
- Design narration / internal notes in visible copy: metadata title `שלב עיצוב`, metadata description `שלב 1`, default hub lede `שלב 1 של העיצוב ... נבנה בשלב הבא`, internal paths `/neo` and `/neo/object` in command-surface copy.
- Second-person imperatives replaced by verbal nouns across 16 labels (`דלג`, `הרחב`, `כווץ`, `חפש`, `סגור`, `בחר`, `הקלד`, `הצג`, `הסתר`, `חזור`, `עבור`, `טען`).
- No em dash or en dash remains in any prose string in scope. The four remaining `—` characters are null-value glyphs, not prose (see §6).

Structural note (not a string change): the module hover preview (preview.tsx header) and the module search result (command-surface row) each render the label `PM · תחזוקת מפעל` next to the `he` line `תחזוקת מפעל`. The duplication existed before this pass with the old words; removing it needs a prop change, which is outside a strings-only remit.

## 6. Unresolved terminology questions

1. `—` as a null-value glyph (mobile-nav.tsx:79 count, shell-client.tsx:803 count with title `אין ספירה מגובה בנתוני הפרויקט`, preview.tsx:69, table-list.tsx:28 missing T-Code). Glossary C bans the em dash in visible copy; these are table-cell placeholders, not sentences. Kept, pending a decision on a replacement glyph (`·` or blank) that would apply to every count column in the product.
2. `…` as a truncation marker on clipped dataset excerpts (command-index.ts:66, `clip()` for chapter/flow/guide subtitles). Kept: dropping it would present a cut sentence as complete. Pending a decision.
3. `אובייקטי מיגרציה` (nav-data.ts:157 count label). "Migration object" is the SAP Migration Cockpit's own term; the glossary maps Migration Cockpit → `קוקפיט המעבר` but gives no form for the object. `אובייקטי מעבר` reads as vague. Kept, flagged.
4. `הרחבות` for the rail item and fallback parent of `/neo/enhancements/`. The page heading (out of scope) may still read `Enhancements`; whichever wins should be applied on both sides.
5. `תשובות מתוך 11 הספרים, עם מקורות` (neo-dock.tsx:222). The `11` is a literal in copy while the rail counts `allBookIds().length`. Glossary D forbids changing numbers in copy, so it stays; it will drift if a book is added.
6. `עיון · Reference` group heading (nav-data.ts:162): bilingual heading kept as is; if a Hebrew-only heading is preferred, `עיון` alone is the candidate.
7. `סן־סריף` (typography.ts:37): maqaf inside a Hebrew compound; `סאנס סריף` is the alternative if the maqaf is to be avoided everywhere.

## 7. Out-of-scope strings found in other files (not edited)

| path | string | note |
|---|---|---|
| components/neo-shell/domain/domain-view.tsx:31 | `PM: "אחזקה · PM", "PP-PI": "ייצור · PP-PI"` | local MOD_HE copy; now disagrees with the rail |
| components/neo-shell/domain/domain-data.ts:104 | `PM: "אחזקת מפעל · PM", "PP-PI": "ייצור תהליכי · PP-PI"` | local copy; `ייצור תהליכי` and word order differ from the rail |
| components/neo-shell/object/object-view.tsx:37 | `PM: "אחזקת מפעל · PM", "PP-PI": "ייצור תהליכי · PP-PI"` | same |
| components/neo-shell/books/books-data.ts:45 | local `MOD_HE` | not inspected in detail; another module-name copy |
| components/neo-shell/erd/model.ts:183 | `MOD_HE` | another module-name copy |
| components/neo-shell/learn/mod.ts:51 | `LEARN_MOD_HE` | another module-name copy |
| components/exit-explorer.tsx:13 | `PM: "אחזקה (PM)", PP: "ייצור (PP)", "PP-PI": "תהליכי (PP-PI)"` | legacy explorer |
| components/incident-explorer.tsx:12 | `PM: "אחזקה", PP: "ייצור", "PP-PI": "תהליכי"` | legacy explorer |
| lib/s4-readiness.ts:23, 76 | `MOD_HE`, `effort: "3–6 שבועות"` | en dash in a data value; lib is out of bounds |
| app/neo/[hub]/page.tsx:64, 75-76 | `aria-label="מספרים"`, `טבלאות` heading | hub frame; would become `טבלאות SAP` for consistency |
| app/neo/chat/page.tsx:22 | `צ'אט NEO · Project NEO` | uses ASCII apostrophe while the h1 (general-chat.tsx:100) uses geresh `צ׳אט`; the shell now uses the geresh form |
