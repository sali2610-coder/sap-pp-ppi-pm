# Language pass · 13-17 · Reference catalogs (BAPI ו-FM, IDocs, CDS Views, יישומי SAP Fiori, הרחבות)

Branch: `design/neo-correction-pass` · Scope: route families 13, 14, 15, 16, 17 · Glossary: `audit/language-pass/GLOSSARY.md`
Files in scope: `components/neo-shell/reference/{ref-surface.tsx, ref-detail-view.tsx, idoc-reference-block.tsx, icons.tsx, types.ts, ref-links.ts, bapi-data.ts, cds-data.ts, enh-data.ts, fiori-data.ts, idoc-data.ts}`, `app/neo/{bapi,idoc,cds,fiori-apps,enhancements}/page.tsx`, `app/neo/{bapi/[name],idoc/[name],cds/[view],fiori-apps/[slug],enhancements/[slug]}/page.tsx`.
Method: every string literal, JSX text, `aria-label`, screen-reader prefix (`sr`), placeholder, UI label constant (kind / category / stability / verification / trust maps) and metadata title+description was inventoried. Code comments were left untouched. Edits are strings only: no JSX structure, class, prop, logic, route, href, number, cardinality, identifier, dataset value or `...` spread changed. `icons.tsx` and `types.ts` carry no user-facing string (comments and type contracts only) and were not edited.
Gate: `./node_modules/.bin/tsc --noEmit` passes after the edits (exit 0). No build, no git, no browser run in this pass (not requested).

Line numbers are post-edit. Route/surface key: 13 = BAPI ו-FM (catalog + detail), 14 = IDocs (catalog, reference block, detail), 15 = CDS Views (directory + detail), 16 = יישומי SAP Fiori (directory + detail), 17 = הרחבות (directory + detail), SH = shared surface used by all five.

## 1. Changed strings

### 1a. Shared catalog surface and shared record screen

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| SH catalog row · missing Hebrew | ref-surface.tsx:125 | `לא קיים מידע מאומת במאגר` | inconsistent Hebrew (siblings tables/tx use תיעוד) | `לא קיים תיעוד מאומת במאגר` | C: empty wording; tx-detail-view.tsx:42 precedent | consolidate | low |
| SH catalog row · missing S/4 line | ref-surface.tsx:149 | `המאגר אינו מציין הערת S/4 לרשומה זו` | inconsistent naming (bare S/4) | `לא קיים תיעוד S/4HANA מאומת לרשומה זו` | A: S/4HANA; C | rewrite | low |
| SH sort option | ref-surface.tsx:183 | `משתנה ב-S/4 קודם` | inconsistent naming + unclear label | `משתנה ב-S/4HANA תחילה` | A | rewrite | low |
| SH stats plate aria-label | ref-surface.tsx:317 | `מספרי המאגר` | accessibility-label problem (vague) | `מספרי הקטלוג` | B: מרשם/מאגר → קטלוג; tables-surface.tsx:387 pattern | rewrite | low |
| SH clear-search aria-label | ref-surface.tsx:338 | `נקה חיפוש` | imperative action label | `ניקוי החיפוש` | C: verbal-noun; tables-surface.tsx:417 precedent | consolidate | low |
| SH reset filters | ref-surface.tsx:438 | `נקה סינון` | imperative action label | `ניקוי הסינון` | C; tables-surface.tsx:509 precedent | consolidate | low |
| SH empty state headline | ref-surface.tsx:443 | `אין רשומה במאגר שעונה על הסינון הזה.` | inconsistent Hebrew (glossary empty form) | `לא נמצאו רשומות התואמות לסינון שנבחר.` | C: filter-empty wording | rewrite | low |
| SH empty state CTA | ref-surface.tsx:446 | `הצג את כל הרשומות` | imperative action label | `הצגת כל הרשומות` | C; tables-surface.tsx:519 | rewrite | low |
| SH empty state CTA | ref-surface.tsx:447 | `נקה רק את החיפוש` | imperative action label | `ניקוי החיפוש בלבד` | C; tables-surface.tsx:520 | consolidate | low |
| SH pagination | ref-surface.tsx:473 | `הצג עוד` | imperative + vague CTA | `הצגת רשומות נוספות` | C | rewrite | low |
| SH record · NONE constant (used for every absent fact) | ref-detail-view.tsx:42 | `לא קיים מידע מאומת במאגר` | inconsistent Hebrew | `לא קיים תיעוד מאומת במאגר` | C | consolidate | low |
| SH record · return fallback labels | ref-detail-view.tsx:45-49 | `BAPIs / FMs`, `CDS Views`, `IDocs`, `Fiori Apps`, `Enhancements` | inconsistent naming, translation problem | `קטלוג BAPI ו-FM`, `קטלוג CDS Views`, `קטלוג IDoc`, `קטלוג יישומי Fiori`, `קטלוג הרחבות` | A: BAPI ו-FM, CDS Views, IDoc, יישומי Fiori, הרחבה; B: מרשם → קטלוג | rewrite | low |
| SH record · inert card aria-label | ref-detail-view.tsx:150 | `{code}: אין עמוד ייעודי במאגר` | accessibility label wording | `{code}: ללא עמוד ייעודי בתיעוד` | consolidation with :246 and idoc-reference-block:56 | consolidate | low |
| SH record · return fallback default | ref-detail-view.tsx:171 | `עיון` | vague label | `קטלוג` | B | rewrite | low |
| SH record · table standing label | ref-detail-view.tsx:230 | `מעמד הטבלאות הקלאסיות שהרשומה נשענת עליהן` | ECC/S4 ambiguity (standing "where") | `מעמד הטבלאות הקלאסיות שהרשומה נשענת עליהן במעבר ל-S/4HANA` | A: המעבר ל-S/4HANA | rewrite | low |
| SH record · table without description | ref-detail-view.tsx:236 | `אין תיאור בתיעוד` | inconsistent Hebrew | `לא קיים תיאור בתיעוד` | C | rewrite | low |
| SH record · inert table aria-label | ref-detail-view.tsx:246 | `{name}: אין עמוד אובייקט בתיעוד` | accessibility label wording | `{name}: ללא עמוד ייעודי בתיעוד` | consolidation | consolidate | low |
| SH table standing note (lib/s4 silent) | ref-links.ts:138 | `המילון אינו מציין הערת S/4 לטבלה זו: נדרש אימות במערכת SAP.` | מילון + bare S/4 | `לא קיימת הערת S/4HANA לטבלה זו בתיעוד הטכני: נדרש אימות נוסף במערכת SAP.` | B: fields/technical → תיעוד טכני; A; C: נדרש אימות נוסף | rewrite | low |
| SH record · completeness chip | ref-links.ts:169 | `{n}/{m} שדות מאומתים ברשומה` | unsupported claim (the count is "filled fields", not verified ones; the code comment itself says "שדות מלאים") | `{n}/{m} שדות מתועדים ברשומה` | D: no verdict upgrade; C | rewrite | low |

### 1b. 14 IDocs · shared reference block

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| 14 reference block · section h2 | idoc-reference-block.tsx:27 | `האנטומיה של IDoc` | immature tone (metaphor in heading) | `מבנה ה-IDoc` | C: no hype; A: IDoc | rewrite | low |
| 14 reference block · inert record aria-label | idoc-reference-block.tsx:56 | `{table}: אין עמוד אובייקט בתיעוד` | accessibility label wording | `{table}: ללא עמוד ייעודי בתיעוד` | consolidation | consolidate | low |
| 14 reference block · section h2 | idoc-reference-block.tsx:68 | `מדריך סטטוסים` | vague title | `קודי סטטוס של IDoc` | subject-naming heading | rewrite | low |

### 1c. 13 BAPIs ומודולי פונקציה

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| 13 category label | bapi-data.ts:39 | `ציוד ומיקומים` | inaccurate SAP terminology (מיקום alone) | `ציוד ומיקומים פונקציונליים` | A: Functional Location | rewrite | low |
| 13 category label | bapi-data.ts:40 | `שמורות` | inaccurate SAP terminology (not a Hebrew SAP term for Reservation) | `שריונים (Reservation)` | Israeli SAP usage for RESB reservation; Latin kept for traceability | rewrite | medium: term not in glossary, see §5 |
| 13 stability labels | bapi-data.ts:61-65 | `Released: ממשק משוחרר`, `מומלץ ע"י SAP`, `פנימי`, `לשימוש בזהירות`, `הוצא משימוש` | inconsistent naming (one bilingual, four not; abbreviation ע"י) | `ממשק משוחרר (Released)`, `מומלץ על ידי SAP`, `פנימי (Internal)`, `לשימוש בזהירות (Use with caution)`, `הוצא משימוש (Obsolete)` | C: consistent bilingual pattern; SAP release-status vocabulary kept in Latin | consolidate | low |
| 13 verification status | bapi-data.ts:71 | `דורש אימות במערכת SAP` | inconsistent Hebrew | `נדרש אימות במערכת SAP` | C: נדרש אימות form; lib/s4 `נדרש אימות SAP` | rewrite | low |
| 13 verification status | bapi-data.ts:73 | `FM פנימי: לא ממשק נתמך` | translation problem | `מודול פונקציה פנימי: אינו ממשק נתמך` | A: Function Module = מודול פונקציה | rewrite | low |
| 13 S/4 headline · structural change | bapi-data.ts:131 | `הרשומה מסמנת את האובייקט כלא-נתמך או כמוצא משימוש ב-S/4HANA.` | inconsistent Hebrew | `לפי הרשומה, האובייקט אינו נתמך ב-S/4HANA או הוצא משימוש.` | C | rewrite | low |
| 13 S/4 headline · critical table | bapi-data.ts:133 | `אחת מטבלאות הליבה שהאובייקט קורא, X, משתנה מהותית ב-S/4HANA.` | inaccurate when several tables are listed ("אחת") | `האובייקט נשען על X: טבלה שמשתנה מהותית ב-S/4HANA.` | consolidation with cds/fiori/idoc headline pattern | consolidate | low |
| 13 S/4 headline · stable | bapi-data.ts:135 | `לפי הרשומה במאגר האובייקט זמין ב-S/4HANA On-Premise.` | inconsistent Hebrew | `לפי הרשומה, האובייקט זמין ב-S/4HANA On-Premise.` | C | rewrite | low |
| 13 S/4 headline · unknown | bapi-data.ts:136 | `לא קיים מידע מאומת במאגר על מעמד האובייקט ב-S/4HANA.` | inconsistent Hebrew | `לא קיים תיעוד מאומת במאגר על מעמד האובייקט ב-S/4HANA.` | C | consolidate | low |
| 13 row S/4 badges | bapi-data.ts:157-162 | `משתנה ב-S/4`, `זמין ב-S/4`, `יש אמירת S/4`, `לא צוין` | bare S/4, inconsistent Hebrew, vague empty | `משתנה ב-S/4HANA`, `זמין ב-S/4HANA`, `קיימת הערת S/4HANA`, `נדרש אימות נוסף` | A; C: uncertain → נדרש אימות נוסף | rewrite | low |
| 13 eyebrow | bapi-data.ts:204 | `עיון · Reference` | vague title | `קטלוג BAPI ו-FM · Function Catalog` | tables-surface.tsx:371 / transactions-surface.tsx:360 pattern (Hebrew · English) | rewrite | low |
| 13 H1 | bapi-data.ts:205 | `BAPIs ו-Function Modules` | translation problem | `BAPIs ומודולי פונקציה` | A: Function Module = מודול פונקציה; H1 names the subject | rewrite | low |
| 13 lede | bapi-data.ts:208-210 | `{n} אובייקטי פונקציה מהרישום הקנוני של הפרויקט: כל אחד מהם מוזכר בפועל על טבלה מתועדת ב-PM או ב-PP-PI, או נוסף כרשומה מאומתת. הרשימה מציגה את מה שהמאגר יודע: מודול, משמעות, הטבלאות והטרנזקציות שהאובייקט נוגע בהן, ומה נאמר עליו לגבי S/4HANA.` | internal note ("רישום קנוני"), defensive copy, module names bare | `{n} אובייקטי פונקציה (BAPI ו-FM) מקטלוג הפרויקט: כל אחד מהם מתועד על טבלת SAP בתחזוקת מפעל (PM) או בתעשיות תהליכיות (PP-PI), או נוסף כרשומה מאומתת. לכל אובייקט מוצגים המודול, המשמעות, הטבלאות והטרנזקציות המקושרות ומעמדו ב-S/4HANA לפי התיעוד.` | A: PM/PP-PI forms, BAPI ו-FM; B; C | rewrite | low (count expression untouched) |
| 13 stat label | bapi-data.ts:214 | `Function Modules` | translation problem | `מודולי פונקציה (FM)` | A | rewrite | low |
| 13 facet | bapi-data.ts:234 | `יש CDS מקביל` | vague label; differs from stat `עם תצוגת CDS מקבילה` | `עם תצוגת CDS מקבילה` | A: תצוגת CDS in sentences; consolidation with :219 | consolidate | low |
| 13 foot | bapi-data.ts:240-241 | `הרישום נגזר מהטבלאות המתועדות של PM ו-PP-PI ומשכבות ההעשרה המאומתות של הפרויקט. אובייקט שלא אומת מול SE37 / BAPI Explorer מסומן ככזה במפורש, ולא הושלם בהשערה.` | defensive copy ("ולא הושלם בהשערה"), מרשם | `הקטלוג נגזר מטבלאות SAP המתועדות של PM ו-PP-PI ומשכבות ההעשרה המאומתות של הפרויקט. אובייקט שלא אומת מול SE37 או BAPI Explorer מסומן ככזה במפורש.` | B; C | rewrite | low |
| 13 empty note | bapi-data.ts:243 | `החיפוש עובר על השם הטכני, המשמעות, המודול, הטבלאות והטרנזקציות של רשומות אמיתיות בלבד. הוא אינו מנחש שמות אובייקטים ואינו משלים טקסט חופשי.` | defensive copy, design narration | `החיפוש מתבצע על השם הטכני, המשמעות, המודול, הטבלאות והטרנזקציות של הרשומות בקטלוג.` | C | rewrite | low |
| 13 S/4 plate labels | bapi-data.ts:260-261 | `מה כתוב במאגר על S/4HANA`, `מה כתוב על ECC` | immature tone (question-style labels) | `הערת S/4HANA ברשומה`, `הערת ECC ברשומה` | C | rewrite | low |
| 13 availability bullets | bapi-data.ts:265-267 | `ECC — כן` etc. (em dash) | punctuation (em dash) | `ECC: כן`, `S/4HANA On-Premise: …`, `S/4HANA Cloud: …` | C: no em dash | rewrite | low |
| 13 fact labels | bapi-data.ts:287-289 | `מה האובייקט עושה`, `מתי משתמשים בו` | immature tone | `תפקיד האובייקט`, `מקרי שימוש` | C | rewrite | low |
| 13 section h2 | bapi-data.ts:299 | `מה זה ומתי` | vague title, immature tone | `תפקיד ושימוש` | C | rewrite | low |
| 13 output bullet | bapi-data.ts:312 | `{name} — {he}` | em dash | `{name}: {he}` | C | rewrite | low |
| 13 COMMIT derived note | bapi-data.ts:320 | `: נגזר מסוג הפעולה, לא מרשומה מפורשת` | "not X but Y" contrast | ` (נגזר מסוג הפעולה, ללא רשומה מפורשת)` | C | rewrite | low |
| 13 section h2 | bapi-data.ts:331 | `חוזה הקריאה` | translation problem ("call contract" calque) | `ממשק הקריאה והפרמטרים` | C | rewrite | low |
| 13 fact label + absent | bapi-data.ts:338, 342 | `טבלאות שהאובייקט נוגע בהן` / `אין במאגר טבלה שמקשרת את האובייקט הזה.` | vague label; empty wording | `טבלאות SAP מקושרות` / `לא קיימת בתיעוד טבלת SAP המקושרת לאובייקט זה.` | A: SAP Table; C | rewrite | low |
| 13 absent | bapi-data.ts:349 | `אין במאגר טרנזקציה שמקשרת את האובייקט הזה.` | empty wording | `לא קיימת בתיעוד טרנזקציה המקושרת לאובייקט זה.` | C | rewrite | low |
| 13 fact labels | bapi-data.ts:364, 366 | `לפני שמשתמשים`, `מה לבדוק` | immature tone | `בדיקות מקדימות`, `נקודות לבדיקה` | C | rewrite | low |
| 13 fact label | bapi-data.ts:376 | `איך לאבחן` | immature tone | `אבחון` | C | rewrite | low |
| 13 complexity | bapi-data.ts:396 | `מדוע` | vague label | `נימוקים` | C | rewrite | low |
| 13 learn time | bapi-data.ts:399 | `{a}–{b} דקות: נגזר ממודל המורכבות המתועד של הפרויקט, לא ממדידה.` | en dash in range, "not X but Y" | `{a}-{b} דקות (לפי מודל המורכבות של הפרויקט).` | C: ranges keep hyphen; numbers untouched | rewrite | low |
| 13 related empty | bapi-data.ts:427 | `לא קיים מידע מאומת במאגר על אובייקטים קשורים לרשומה הזו.` | inconsistent Hebrew | `לא קיים תיעוד מאומת במאגר על אובייקטים קשורים לרשומה זו.` | C | consolidate | low |
| 13 section h2 | bapi-data.ts:435 | `להמשך קריאה` | inconsistent Hebrew | `קריאה נוספת` | C | rewrite | low |
| 13 enAbsent | bapi-data.ts:465 | `אין תיאור אנגלי ברשומה` | inconsistent Hebrew | `לא קיים תיאור באנגלית ברשומה` | C | rewrite | low |
| 13 S/4 plate statuses | bapi-data.ts:484-485 | `קיימת אמירת S/4 ברשומה`, `אין אמירת S/4 במאגר` | bare S/4, "אמירה" | `קיימת הערת S/4HANA ברשומה`, `לא קיימת הערת S/4HANA במאגר` | A | rewrite | low |
| 13 S/4 warn (unknown tone) | bapi-data.ts:495 | `למאגר אין אמירה על מעמד האובייקט ב-S/4HANA. הפריט דורש אימות מול SE37 / BAPI Explorer או מול תיעוד SAP לפני החלטת מיגרציה: ולא הושלם כאן בהשערה.` | defensive copy, מיגרציה, broken colon | `לא קיים תיעוד מאומת במאגר על מעמד האובייקט ב-S/4HANA. נדרש אימות נוסף מול SE37, BAPI Explorer או תיעוד SAP לפני החלטת מעבר.` | A: המעבר (avoid הגירה/מיגרציה); C | rewrite | low |
| 13 record foot | bapi-data.ts:501-502 | `כל שדה בעמוד הזה נלקח מהרישום הקנוני של הפרויקט ומשכבת ההעשרה המאומתת שלו. שדה שהמאגר שותק לגביו אינו מוצג, או מסומן במפורש «לא קיים מידע מאומת במאגר». מספר SAP Note אינו נכתב כאן אלא אם הוא קיים ברשומה עצמה.` | internal note, defensive copy | `כל שדה בעמוד זה נלקח מקטלוג הפרויקט ומשכבת ההעשרה המאומתת שלו. שדה ללא תיעוד אינו מוצג, או מסומן «לא קיים תיעוד מאומת במאגר». מספרי SAP Note מופיעים רק כאשר הם קיימים ברשומה עצמה.` | B; C | rewrite | low |
| 13 metadata title | app/neo/bapi/page.tsx:22 | `BAPIs ו-Function Modules · Project NEO` | translation problem | `BAPIs ומודולי פונקציה · Project NEO` | A | rewrite | low |
| 13 metadata description | app/neo/bapi/page.tsx:24 | `הרישום הקנוני של אובייקטי הפונקציה במעטפת NEO: …` | internal note ("מעטפת NEO", "רישום קנוני") | `קטלוג BAPI ו-FM של Project NEO: מודול, משמעות, טבלאות וטרנזקציות מקושרות ומעמד ב-S/4HANA.` | B; D: product name | rewrite | low |

### 1d. 14 IDocs · catalog and record

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| 14 row S/4 text (unknown) | idoc-data.ts:64, 191 | `לא קיים מידע מאומת במאגר על מעמד סוג ההודעה ב-S/4HANA.` | inconsistent Hebrew | `לא קיים תיעוד מאומת במאגר על מעמד סוג ההודעה ב-S/4HANA.` | C | consolidate | low |
| 14 group fallback | idoc-data.ts:79 | `ללא תחום במאגר` | vague label (group tab is "לפי תחום תהליכי") | `ללא תחום תהליכי במאגר` | consistency with :136 | rewrite | low |
| 14 row S/4 badges | idoc-data.ts:89-90 | `יש אמירת S/4`, `לא צוין` | bare S/4, vague empty | `קיימת הערת S/4HANA`, `נדרש אימות נוסף` | A; C | rewrite | low |
| 14 eyebrow | idoc-data.ts:112 | `עיון · Reference` | vague title | `קטלוג IDoc · IDoc Catalog` | B: קטלוג IDoc; sibling eyebrow pattern | rewrite | low |
| 14 lede | idoc-data.ts:116-118 | `הפרויקט מתעד {n} סוגי הודעת IDoc: בדיוק אלה שמופיעים בפועל על טבלה מתועדת ב-PM או ב-PP-PI. הרשימה קצרה בכוונה: סוג הודעה שאינו מופיע במאגר אינו נוסף כאן כדי להאריך אותה. מתחת לרשימה נמצא מה שהמאגר כן יודע לעומק על IDoc: האנטומיה של ההודעה ומדריך הסטטוסים.` | defensive copy, design narration, metaphor | `{n} סוגי הודעת IDoc המתועדים על טבלאות SAP בתחזוקת מפעל (PM) ובתעשיות תהליכיות (PP-PI). מתחת לרשימה מוצג התיעוד המשותף לכל סוגי ההודעה: מבנה ה-IDoc, קודי הסטטוס וטרנזקציות הניטור.` | A; C | rewrite | low (count expression untouched) |
| 14 facet | idoc-data.ts:133 | `יש CDS מקביל` | vague label | `עם תצוגת CDS מקבילה` | A; consolidation with 13 | consolidate | low |
| 14 foot | idoc-data.ts:140 | `רשומות ה-IDoc, קודי הסטטוס וטרנזקציות הניטור נלקחו מילולית מרשומת האינטגרציה המאומתת של הפרויקט. לא נוספו כאן סטטוסים, סגמנטים או סוגי הודעה שאינם מופיעים בה.` | defensive copy | `הרשומות הפיזיות, קודי הסטטוס וטרנזקציות הניטור נלקחו כלשונם מרשומת האינטגרציה המאומתת של הפרויקט.` | C | rewrite | low |
| 14 empty note | idoc-data.ts:142 | `המאגר מתעד מספר קטן של סוגי הודעה, ולכן גם חיפוש קצר עלול לא להחזיר דבר. זהו מצב אמיתי של הנתונים ולא כשל בחיפוש.` | "not X but Y", defensive | `המאגר מתעד מספר קטן של סוגי הודעה, ולכן ייתכן שחיפוש לא יחזיר תוצאות.` | C | rewrite | low |
| 14 S/4 plate labels + absents | idoc-data.ts:194-195 | `מה כתוב על S/4HANA` / `המאגר אינו מציין אמירת S/4 לסוג ההודעה הזה.`, `מה כתוב על ECC` / `המאגר אינו מציין אמירת ECC לסוג ההודעה הזה.` | immature tone, bare S/4 | `הערת S/4HANA ברשומה` / `לא קיימת הערת S/4HANA ברשומה לסוג הודעה זה.`, `הערת ECC ברשומה` / `לא קיימת הערת ECC ברשומה לסוג הודעה זה.` | A; C | rewrite | low |
| 14 section h2 | idoc-data.ts:209 | `מה סוג ההודעה עושה` | immature tone | `תפקיד סוג ההודעה` | C | rewrite | low |
| 14 fact label | idoc-data.ts:212 | `למה זה חשוב` | immature tone | `הקשר עסקי` | C (absent text already says הקשר עסקי) | rewrite | low |
| 14 payload bullets | idoc-data.ts:226, 230 | `{name} — {he}` | em dash | `{name}: {he}` | C | rewrite | low |
| 14 fact label + absents | idoc-data.ts:242, 244, 249 | `טבלאות שההודעה נוגעת בהן` / `אין במאגר טבלה שמקשרת את סוג ההודעה הזה.` / `אין במאגר טרנזקציה שמקשרת את סוג ההודעה הזה.` | vague label, empty wording | `טבלאות SAP מקושרות` / `לא קיימת בתיעוד טבלת SAP המקושרת לסוג הודעה זה.` / `לא קיימת בתיעוד טרנזקציה המקושרת לסוג הודעה זה.` | A; C | rewrite | low |
| 14 fact labels | idoc-data.ts:260, 269 | `מה לבדוק`, `מה נכשל בפועל` | immature tone | `נקודות לבדיקה`, `כשלים מתועדים` | C | rewrite | low |
| 14 related function cards | idoc-data.ts:293, 295 | `ממשק פונקציה שהרשומה שלו מזכירה את סוג ההודעה`, `ממשקי פונקציה קשורים` | inconsistent naming (01 audit consolidated on אובייקט פונקציה) | `אובייקט פונקציה שרשומתו מפנה לסוג ההודעה`, `אובייקטי פונקציה קשורים` | 01-global-shell.md nav-data.ts:402 decision | consolidate | low |
| 14 record status | idoc-data.ts:310 | `תלוי גרסה: נדרש אימות` | inconsistent Hebrew | `תלוי גרסה: נדרש אימות נוסף` | C | rewrite | low |
| 14 S/4 plate statuses | idoc-data.ts:331-332 | `קיימת אמירת S/4 ברשומה`, `אין אמירת S/4 במאגר` | bare S/4 | `קיימת הערת S/4HANA ברשומה`, `לא קיימת הערת S/4HANA במאגר` | A | rewrite | low |
| 14 S/4 warn | idoc-data.ts:337 | `למאגר אין אמירה על מעמד סוג ההודעה ב-S/4HANA. הפריט דורש אימות במערכת SAP (WE30 / WE20 / תיעוד ALE) לפני החלטת מיגרציה.` | מיגרציה, inconsistent Hebrew | `לא קיים תיעוד מאומת במאגר על מעמד סוג ההודעה ב-S/4HANA. נדרש אימות נוסף במערכת SAP (WE30, WE20 או תיעוד ALE) לפני החלטת מעבר.` | A; C | rewrite | low |
| 14 record foot | idoc-data.ts:343-344 | `הרשומה נבנתה מתוך המידע המאומת של הפרויקט על ממשקי פונקציה ו-IDoc. מדריך הסטטוסים והאנטומיה של ההודעה אינם משוכפלים לכאן: הם משותפים לכל סוגי ההודעה ומוצגים פעם אחת, בעמוד הרשימה.` | design narration, metaphor | `הרשומה נבנתה מהתיעוד המאומת של הפרויקט על אובייקטי פונקציה ו-IDoc. מבנה ה-IDoc וקודי הסטטוס משותפים לכל סוגי ההודעה ומוצגים בעמוד קטלוג IDoc.` | B; C | rewrite | low |
| 14 metadata description | app/neo/idoc/page.tsx:21 | `סוגי הודעת IDoc שהמאגר מתעד, לצד האנטומיה של ההודעה, מדריך הסטטוסים המאומת וטרנזקציות הניטור.` | metaphor | `קטלוג IDoc של Project NEO: סוגי הודעת IDoc מתועדים, מבנה ה-IDoc, קודי הסטטוס וטרנזקציות הניטור.` | B | rewrite | low |

### 1e. 15 CDS Views

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| 15 S/4 headline · critical | cds-data.ts:68 | `התצוגה יושבת מעל X: טבלה שמשתנה מהותית ב-S/4HANA.` | inconsistent Hebrew ("יושבת מעל") | `תצוגת ה-CDS נשענת על X: טבלה שמשתנה מהותית ב-S/4HANA.` | A: תצוגת CDS; pattern consolidation | consolidate | low |
| 15 S/4 headline · default | cds-data.ts:69 | `שכבת ה-VDM של S/4HANA מעל X.` | ECC/S4 ambiguity (what X is) | `שכבת ה-VDM של S/4HANA מעל הטבלאות הקלאסיות X.` | C | rewrite | low |
| 15 group fallback | cds-data.ts:93 | `ללא מחלקה` | vague label | `ללא מחלקת אובייקט במאגר` | consistency with groupLabel :155 | rewrite | low |
| 15 sr prefix | cds-data.ts:97 | `אפליקציות Fiori ` | inaccurate terminology | `יישומי Fiori ` | A: Fiori Application | rewrite | low |
| 15 row S/4 badges | cds-data.ts:102-103 | `מעל טבלה שמשתנה`, `שכבת S/4 מעל ECC` | bare S/4; pattern | `נשענת על טבלה שמשתנה`, `שכבת S/4HANA מעל ECC` | A | rewrite | low |
| 15 eyebrow | cds-data.ts:126 | `עיון · Reference` | vague title | `קטלוג CDS Views · CDS Catalog` | A: CDS Views in headings; sibling pattern | rewrite | low |
| 15 H1 | cds-data.ts:127 | `תצוגות CDS` | glossary heading form | `CDS Views` | A: "Headings: CDS Views" | rewrite | low |
| 15 lede | cds-data.ts:130-132 | `{n} תצוגות CDS משוחררות שהפרויקט מיפה אל הטבלאות הקלאסיות שהן מחליפות. זהו הצד של S/4HANA במילון: כל שורה אומרת איזו טבלת ECC היא מכסה, איזו שכבת Consumption יושבת מעליה ואיזו אפליקציית Fiori צורכת אותה: ומה מעמד הטבלה הקלאסית עצמה במעבר.` | unsupported claim ("משוחררות" is not a dataset field), מילון, אפליקציה, broken colons | `{n} תצוגות CDS של S/4HANA שתיעוד הפרויקט ממפה אל הטבלאות הקלאסיות שהן מכסות. לכל תצוגה מוצגים טבלאות ה-ECC שהיא מכסה, שכבת ה-Consumption שמעליה, יישום ה-Fiori שצורך אותה ומעמד הטבלה הקלאסית במעבר ל-S/4HANA.` | A; B: מילון → תיעוד הפרויקט; C: no unverified claim | rewrite | low |
| 15 stat label | cds-data.ts:138 | `עם אפליקציית Fiori` | inaccurate terminology | `עם יישום Fiori` | A | rewrite | low |
| 15 stat label | cds-data.ts:141 | `מעל טבלה שמשתנה ב-S/4` | bare S/4 | `מעל טבלה שמשתנה ב-S/4HANA` | A | rewrite | low |
| 15 facets | cds-data.ts:149-152 | `רשומת העשרה מלאה`, `יש Consumption`, `יש Fiori`, `יש דוגמת ABAP` | vague labels, inconsistent with stats | `עם רשומת העשרה`, `עם שכבת Consumption`, `עם יישום Fiori`, `עם דוגמת ABAP` | consolidation with stats :136-139 | consolidate | low |
| 15 foot | cds-data.ts:159-160 | `המיפוי בין תצוגה לטבלאות קלאסיות הוא מיפוי מאומת ידנית בקובצי הפרויקט, לא תוצר של גזירה אוטומטית. מחרוזות annotation שאינן ודאיות מתוארות ברמת המושג ולא נכתבות כטקסט מדויק.` | unsupported claim ("מאומת ידנית", same call as 01 audit nav-data.ts:541), "not X but Y" | `המיפוי בין תצוגת CDS לטבלאות הקלאסיות נלקח מתיעוד הפרויקט. אנוטציות שאינן ודאיות מתוארות ברמת המושג בלבד.` | C; 01-global-shell.md CDS lede decision | rewrite | low |
| 15 empty note | cds-data.ts:162 | `החיפוש עובר על … : כולם ערכים אמיתיים מקובצי הפרויקט.` | defensive copy, אפליקציה | `החיפוש מתבצע על שם התצוגה, המשמעות, הטבלאות הקלאסיות, שכבת ה-Consumption ויישום ה-Fiori שבתיעוד.` | A; C | rewrite | low |
| 15 ECC alternative absent | cds-data.ts:182 | `המאגר אינו מציין את המסלול הקלאסי המקביל לתצוגה הזו.` | empty wording | `לא קיים תיעוד מאומת במאגר לחלופה הקלאסית ב-ECC לתצוגה זו.` | C | rewrite | low |
| 15 fact label | cds-data.ts:190 | `אפליקציית Fiori שהמיפוי מציין` | inaccurate terminology | `יישום Fiori לפי המיפוי` | A | rewrite | low |
| 15 section h2 | cds-data.ts:198 | `מה התצוגה נותנת` | immature tone | `תפקיד התצוגה` | C | rewrite | low |
| 15 absent | cds-data.ts:201 | `המאגר אינו מסווג את סוג התצוגה.` | empty wording | `סוג התצוגה לא צוין בתיעוד.` | C | rewrite | low |
| 15 section h2 | cds-data.ts:215 | `המודל והצריכה` | vague title ("מודל" reserved for Data Model) | `מבנה התצוגה והצריכה` | A: Data Model = מודל הנתונים | rewrite | low |
| 15 card reasons | cds-data.ts:226, 235 | `אפליקציית Fiori שצורכת את התצוגה`, `ממשק פונקציה שהרשומה שלו מפנה לתצוגה` | inaccurate terminology; inconsistent naming | `יישום Fiori שצורך את התצוגה`, `אובייקט פונקציה שרשומתו מפנה לתצוגה` | A; 01 audit consolidation | consolidate | low |
| 15 section h2 + empty | cds-data.ts:241, 244 | `מי צורך את התצוגה` / `אין במאגר רשומת Fiori או ממשק פונקציה שמפנה לתצוגה הזו.` | immature tone; empty wording | `צרכני התצוגה` / `לא קיימת בתיעוד רשומת Fiori או אובייקט פונקציה שמפנה לתצוגה זו.` | C | rewrite | low |
| 15 record status | cds-data.ts:262 | `דורש אימות` | inconsistent Hebrew | `נדרש אימות נוסף` | C | rewrite | low |
| 15 S/4 plate status | cds-data.ts:283 | `מעל טבלה שמשתנה מהותית` | pattern | `נשענת על טבלה שמשתנה מהותית` | consolidation | consolidate | low |
| 15 record foot | cds-data.ts:292-293 | `המיפוי תצוגה↔טבלאות והרשומה המורחבת נכתבו ואומתו ידנית בקובצי הפרויקט. מעמד ה-S/4 של כל טבלה קלאסית נלקח משכבת ה-S/4 המשותפת של האתר, ולא נכתב מחדש כאן.` | decorative arrow, unsupported claim, bare S/4, design narration | `המיפוי בין התצוגה לטבלאות והרשומה המורחבת נלקחו מתיעוד הפרויקט. מעמד ה-S/4HANA של כל טבלה קלאסית נלקח משכבת ה-S/4HANA המשותפת של Project NEO.` | A; C | rewrite | low |
| 15 metadata title | app/neo/cds/page.tsx:14 | `תצוגות CDS · Project NEO` | glossary heading form | `CDS Views · Project NEO` | A | rewrite | low |
| 15 metadata description | app/neo/cds/page.tsx:16 | `תצוגות ה-CDS של S/4HANA במעטפת NEO: … אפליקציית ה-Fiori ומעמד הטבלה במעבר.` | internal note, אפליקציה | `תצוגות CDS של S/4HANA ב-Project NEO: הטבלאות הקלאסיות שכל תצוגה מכסה, שכבת ה-Consumption, יישום ה-Fiori ומעמד הטבלה במעבר ל-S/4HANA.` | A; D | rewrite | low |

### 1f. 16 יישומי SAP Fiori

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| 16 type labels | fiori-data.ts:27-28 | `טרנזקציונלית`, `אנליטית` | inconsistent Hebrew (feminine agreement with the removed word "אפליקציה") | `טרנזקציוני`, `אנליטי` | A: יישום (masculine) | rewrite | low |
| 16 trust label | fiori-data.ts:35 | `דורש סקירה` | inconsistent Hebrew | `נדרשת סקירה` | C | rewrite | low |
| 16 S/4 headlines | fiori-data.ts:54-57 | `האפליקציה יושבת מעל X: …`, `החוויה של S/4HANA במקום X ב-SAP GUI.`, `אפליקציית S/4HANA. המאגר אינו מציין טרנזקציית GUI מקבילה.` | אפליקציה, hype ("החוויה"), empty wording | `היישום נשען על X: טבלה שמשתנה מהותית ב-S/4HANA.`, `יישום S/4HANA המחליף את X ב-SAP GUI.`, `יישום S/4HANA. לא צוינה בתיעוד טרנזקציית SAP GUI מקבילה.` | A; C: no hype; "replaces" is the dataset's own `guiTx` semantics (data/fiori/apps.ts) | rewrite | low |
| 16 group fallback | fiori-data.ts:82 | `ללא תפקיד במאגר` | vague label | `ללא תפקיד עסקי במאגר` | consistency with groupLabel :146 | rewrite | low |
| 16 row S/4 badges | fiori-data.ts:91-92 | `מעל טבלה שמשתנה`, `מחליפה מסך GUI` | pattern; gender | `נשען על טבלה שמשתנה`, `מחליף מסך SAP GUI` | A | rewrite | low |
| 16 eyebrow | fiori-data.ts:116 | `עיון · Reference` | vague title | `קטלוג יישומי Fiori · Fiori Catalog` | A; sibling pattern | rewrite | low |
| 16 H1 | fiori-data.ts:117 | `אפליקציות Fiori` | inaccurate terminology | `יישומי SAP Fiori` | A: Fiori Application | rewrite | low |
| 16 lede | fiori-data.ts:120-122 | `{n} אפליקציות Fiori שהפרויקט תיעד במלואן: מזהה אמיתי, תפקיד עסקי, קטלוג, שירות OData ותצוגת CDS, ובעיקר: איזו טרנזקציית SAP GUI כל אחת מהן מחליפה. זהו הצד של S/4HANA מול מסכי ה-ECC שהמילון מתעד.` | אפליקציה, מילון, defensive ("אמיתי", "במלואן"), broken colons | `{n} יישומי SAP Fiori המתועדים בפרויקט: מזהה יישום, תפקיד עסקי, קטלוג, שירות OData, תצוגת CDS והטרנזקציות ב-SAP GUI שכל יישום מחליף. זהו הצד של S/4HANA מול מסכי ה-ECC שבתיעוד הטכני.` | A; B: מילון → תיעוד טכני; C | rewrite | low |
| 16 stat labels | fiori-data.ts:124, 130, 131 | `אפליקציות`, `זמינות ב-Cloud`, `מעל טבלה שמשתנה` | אפליקציה; vague; pattern | `יישומים`, `זמינים ב-S/4HANA Cloud`, `נשענים על טבלה שמשתנה` | A | rewrite | low |
| 16 kinds label | fiori-data.ts:137 | `סוג אפליקציה` | אפליקציה | `סוג יישום` | A | rewrite | low |
| 16 facets | fiori-data.ts:141-142 | `יש OData`, `יש CDS` | vague labels | `עם שירות OData`, `עם תצוגת CDS` | consolidation with stats :128-129 | consolidate | low |
| 16 foot | fiori-data.ts:150-151 | `מזהי האפליקציות, … תאריך הסקירה האחרון. לא נכתב כאן מספר SAP Note שאינו קיים ברשומה.` | אפליקציה, defensive | `מזהי היישומים, התפקידים והקטלוגים נלקחו מקובץ ה-Fiori של הפרויקט, המציין לכל רשומה את מקורה ואת מועד הסקירה האחרון. מספרי SAP Note מופיעים רק כאשר הם קיימים ברשומה.` | A; C | rewrite | low |
| 16 empty note | fiori-data.ts:153 | `החיפוש עובר על … : כולם ערכים אמיתיים מהקובץ.` | defensive | `החיפוש מתבצע על המזהה, השם בעברית ובאנגלית, התפקיד, הקטלוג, שירות ה-OData והטרנזקציות המוחלפות שבתיעוד.` | C | rewrite | low |
| 16 S/4 plate label + absent | fiori-data.ts:167, 169 | `טרנזקציות SAP GUI שהאפליקציה מחליפה` / `המאגר אינו מציין טרנזקציית GUI מקבילה לאפליקציה הזו.` | אפליקציה | `טרנזקציות SAP GUI שהיישום מחליף` / `לא צוינה בתיעוד טרנזקציית SAP GUI מקבילה ליישום זה.` | A; C | rewrite | low |
| 16 S/4 plate label + absent | fiori-data.ts:171 | `מה היה ב-ECC` / `המאגר אינו מציין מצב ECC לאפליקציה הזו.` | immature tone | `המצב ב-ECC` / `לא צוין בתיעוד מצב ECC ליישום זה.` | C | rewrite | low |
| 16 availability bullets | fiori-data.ts:175-177 | `S/4HANA On-Premise — …`, `S/4HANA Cloud — …`, `גרסה, …` / `גרסה, לא צוין במאגר` | em dash; comma as separator | `S/4HANA On-Premise: …`, `S/4HANA Cloud: …`, `גרסה: …` / `גרסה: לא צוין במאגר` | C | rewrite | low |
| 16 section h2 + labels | fiori-data.ts:195-200 | `מה האפליקציה עושה`, `איזו בעיה היא פותרת`, absent `המאגר אינו מציין מיקום בתהליך.`, `סוג אפליקציה` | immature tone, אפליקציה | `תפקיד היישום`, `הבעיה העסקית שהיישום פותר`, `לא צוין מיקום בתהליך ברשומה.`, `סוג יישום` | A; C | rewrite | low |
| 16 three-level section | fiori-data.ts:207-211 | `אותה אפליקציה, בשלוש רמות`; subs `למשתמש`/`בשפה פשוטה`, `ליועץ`/`מה חשוב לדעת`, `לטכני`/`איך זה בנוי` | immature tone, אפליקציה | `הסבר בשלוש רמות`; `למשתמש העסקי`/`הסבר בסיסי`, `ליועץ`/`נקודות מרכזיות`, `למפתח`/`מבנה טכני` | C | rewrite | low |
| 16 tech section | fiori-data.ts:229, 236, 240 | `טבלאות שמאחורי האפליקציה`, `ממשקי פונקציה קשורים`, h2 `מאחורי הקלעים` | אפליקציה; inconsistent naming; immature heading | `טבלאות SAP שמאחורי היישום`, `אובייקטי פונקציה קשורים`, `טבלאות ואובייקטי פונקציה` | A; 01 audit consolidation; C | rewrite | low |
| 16 ops labels | fiori-data.ts:244-245 | `איך לאבחן`, `כך זה נראה ב-CBC` | immature tone | `אבחון`, `יישום ב-CBC` | C | rewrite | low |
| 16 similar section | fiori-data.ts:255, 261, 264 | `אפליקציה קרובה לפי הרשומה`, `אפליקציות קרובות`, `הרשומה אינה מציינת אפליקציות קרובות.` | אפליקציה | `יישום קרוב לפי הרשומה`, `יישומים קרובים`, `לא צוינו יישומים קרובים ברשומה.` | A | rewrite | low |
| 16 record eyebrow | fiori-data.ts:277 | `Fiori App · {module}` | translation problem | `יישום Fiori · {module} · {modHe}` | A | rewrite | low |
| 16 S/4 plate statuses | fiori-data.ts:292-293 | `מעל טבלה שמשתנה מהותית`, `חלופת S/4HANA למסך GUI` | pattern; GUI alone | `נשען על טבלה שמשתנה מהותית`, `חלופת S/4HANA למסך SAP GUI` | consolidation | consolidate | low |
| 16 record foot | fiori-data.ts:301-302 | `כל שדה כאן נלקח מרשומת האפליקציה … שדה שהרשומה שותקת לגביו מסומן במפורש ולא הושלם מזיכרון.` | אפליקציה, defensive | `כל שדה בעמוד זה נלקח מרשומת היישום בקובץ ה-Fiori של הפרויקט, כולל רמת האמון והמקור שלה. שדה ללא תיעוד מסומן במפורש.` | A; C | rewrite | low |
| 16 metadata title + description | app/neo/fiori-apps/page.tsx:12, 14 | `אפליקציות Fiori · Project NEO` / `האפליקציות שהפרויקט תיעד במלואן: מזהה, תפקיד עסקי, קטלוג, OData ו-CDS, ואיזו טרנזקציית SAP GUI כל אחת מחליפה.` | אפליקציה, defensive | `יישומי SAP Fiori · Project NEO` / `יישומי SAP Fiori המתועדים בפרויקט: מזהה יישום, תפקיד עסקי, קטלוג, שירות OData, תצוגת CDS והטרנזקציות ב-SAP GUI שכל יישום מחליף.` | A | rewrite | low |
| 16 detail metadata fallbacks | app/neo/fiori-apps/[slug]/page.tsx:18, 20 | `אפליקציית Fiori` (x2) | אפליקציה | `יישום Fiori` (x2) | A | rewrite | low |

### 1g. 17 הרחבות (טכניקות הרחבה)

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| 17 row S/4 badges | enh-data.ts:76-77 | `יש הסתייגות ברשומה`, `יש אמירת ECC ו-S/4` | inconsistent Hebrew, bare S/4 | `קיימת הסתייגות ברשומה`, `קיימות הערות ECC ו-S/4HANA` | A; C | rewrite | low |
| 17 eyebrow | enh-data.ts:98 | `עיון · Reference` | vague title | `קטלוג הרחבות · Enhancement Catalog` | A: Enhancement = הרחבה; sibling pattern | rewrite | low |
| 17 lede | enh-data.ts:102-104 | `{n} טכניקות הרחבה של SAP: מ-User Exit ועד הרחבת Key-User ב-S/4HANA. לכל טכניקה כתובים במאגר גם מה היא הייתה ב-ECC וגם מה מעמדה ב-S/4HANA, ולכן כל רשומה כאן נפתחת בהשוואה הזו ולא בהגדרה. {m} הרחבות בשם מקטלוג ה-PM/PP-PI משויכות לטכניקות שנושאות את אותו שם מנגנון.` | design narration ("נפתחת בהשוואה הזו ולא בהגדרה"), PM/PP-PI slash form | `{n} טכניקות הרחבה של SAP, מ-User Exit ועד הרחבת Key-User ב-S/4HANA. לכל טכניקה מתועדים מעמדה ב-ECC ומעמדה ב-S/4HANA, ו-{m} הרחבות בשם מקטלוג PM ו-PP-PI משויכות לטכניקות בעלות אותו שם מנגנון.` | A; C | rewrite | low (both count expressions untouched) |
| 17 facets | enh-data.ts:120, 122, 123 | `יש הרחבות בשם`, `דוגמת PP / PP-PI`, `יש הסתייגות` | vague labels | `עם הרחבות בשם`, `דוגמת PP או PP-PI`, `עם הסתייגות` | consolidation with stats | consolidate | low |
| 17 foot | enh-data.ts:129-130 | `טכניקות ההרחבה נכתבו ידנית בקובץ הפרויקט וכוללות לכל אחת אמירת ECC ואמירת S/4HANA. שמות Exit ספציפיים תלויי-גרסה, ולכן רשומה שמסייגת זאת מציגה את ההסתייגות שלה במפורש ולא מוסתרת.` | defensive copy ("ולא מוסתרת"), internal note | `טכניקות ההרחבה מתועדות בקובץ הפרויקט, ולכל אחת הערת ECC והערת S/4HANA. שמות Exit ספציפיים תלויים בגרסה, והסתייגות שקיימת ברשומה מוצגת במפורש.` | C | rewrite | low |
| 17 empty note | enh-data.ts:132 | `החיפוש עובר על … : כולם טקסטים אמיתיים מהקובץ.` | defensive | `החיפוש מתבצע על שם הטכניקה, ההגדרה, אופן המימוש, טרנזקציות המימוש והתרחיש שבתיעוד.` | C | rewrite | low |
| 17 S/4 plate label | enh-data.ts:148 | `הסתייגות שהרשומה מציינת` | wordy | `הסתייגות ברשומה` | C | rewrite | low |
| 17 section h2 | enh-data.ts:156 | `מה הטכניקה` | immature tone | `הגדרת הטכניקה` | C | rewrite | low |
| 17 section h2 + absent | enh-data.ts:167, 173 | `איך מממשים` / `הרשומה אינה מציינת טרנזקציית מימוש.` | immature tone | `אופן המימוש` / `לא צוינה טרנזקציית מימוש ברשומה.` | C | rewrite | low |
| 17 module example labels + absents | enh-data.ts:183-184 | `אחזקה · PM` / `הרשומה אינה מציינת דוגמת PM לטכניקה הזו.`, `ייצור · PP / PP-PI` / `הרשומה אינה מציינת דוגמת PP לטכניקה הזו.` | inaccurate SAP terminology (אחזקה, ייצור alone) | `PM · תחזוקת מפעל` / `לא צוינה דוגמת PM ברשומה.`, `PP / PP-PI · תכנון ייצור ותעשיות תהליכיות` / `לא צוינה דוגמת PP או PP-PI ברשומה.` | A: PM / PP / PP-PI rows; rail label form | rewrite | low (the `"—"` sentinel comparisons are data logic and untouched) |
| 17 named-exit empties | enh-data.ts:207-208 | `אין במאגר הרחבה בשם מהסוג הזה.`, `קטלוג ההרחבות של הפרויקט אינו משתמש בשם המנגנון הזה, ולכן לא בוצע כאן שיוך: שיוך רופף היה ניחוש.` | empty wording; defensive/design narration | `לא קיימת בקטלוג הפרויקט הרחבה בשם מסוג זה.`, `קטלוג ההרחבות של הפרויקט אינו מסווג הרחבות בשם תחת מנגנון זה.` | C | rewrite | low |
| 17 record statuses | enh-data.ts:235, 260, 261 | `יש הסתייגות` (x2), `ECC ו-S/4 שניהם כתובים ברשומה` | inconsistent Hebrew, bare S/4 | `קיימת הסתייגות` (x2), `הערות ECC ו-S/4HANA קיימות ברשומה` | A; C | rewrite | low |
| 17 record foot | enh-data.ts:268-269 | `הרשומה נכתבה ידנית בקובץ טכניקות ההרחבה של הפרויקט. שמות Exit ו-BAdI ספציפיים תלויים בגרסה ובחבילת התמיכה, ולכן יש לאמת אותם ב-SMOD / SE18 / SE19 במערכת עצמה לפני מימוש.` | internal note; imperative | `הרשומה נלקחה מקובץ טכניקות ההרחבה של הפרויקט. שמות Exit ו-BAdI ספציפיים תלויים בגרסה ובחבילת התמיכה, ונדרש אימות שלהם ב-SMOD, SE18 או SE19 במערכת לפני המימוש.` | A: BAdI; C | rewrite | low |
| 17 metadata description | app/neo/enhancements/page.tsx:14 | `טכניקות ההרחבה של SAP במעטפת NEO: מה כל אחת הייתה ב-ECC, מה מעמדה ב-S/4HANA, ואילו הרחבות בשם מקטלוג הפרויקט משתמשות בה.` | internal note, question-style | `טכניקות ההרחבה של SAP ב-Project NEO: מעמד כל טכניקה ב-ECC וב-S/4HANA, וההרחבות בשם מקטלוג הפרויקט המשויכות אליה.` | D | rewrite | low |

## 2. Totals

Counted by hand from the string inventory of the 21 files (comments excluded).

| Measure | Count |
|---|---|
| String positions reviewed | 471 |
| Kept as-is | 250 |
| Rewritten (incl. consolidations) | 221 |
| of which consolidated to an existing form | 24 |
| Removed outright | 0 (no visible element removed; 9 defensive / design-narration clauses were dropped inside rewrites, listed in §4) |

Files changed (15): `ref-surface.tsx`, `ref-detail-view.tsx`, `idoc-reference-block.tsx`, `ref-links.ts`, `bapi-data.ts`, `cds-data.ts`, `enh-data.ts`, `fiori-data.ts`, `idoc-data.ts`, `app/neo/bapi/page.tsx`, `app/neo/idoc/page.tsx`, `app/neo/cds/page.tsx`, `app/neo/fiori-apps/page.tsx`, `app/neo/fiori-apps/[slug]/page.tsx`, `app/neo/enhancements/page.tsx`.
Files reviewed and unchanged (6): `icons.tsx`, `types.ts` (no user-facing strings), `app/neo/bapi/[name]/page.tsx`, `app/neo/idoc/[name]/page.tsx`, `app/neo/cds/[view]/page.tsx`, `app/neo/enhancements/[slug]/page.tsx` (metadata fallbacks `אובייקט פונקציה`, `סוג הודעת IDoc`, `תצוגת CDS`, `טכניקת הרחבה` already conform).

## 3. "מילון" replacements (with context)

| file:line | context | replaced by | glossary B row |
|---|---|---|---|
| ref-links.ts:138 | table S/4 note fallback (fields and technical definitions) | `בתיעוד הטכני` | Fields and technical definitions → תיעוד טכני |
| cds-data.ts:131 | CDS lede: "הצד של S/4HANA במילון" (the blueprint/source itself) | `תיעוד הפרויקט` | The blueprint source itself → תיעוד הפרויקט |
| fiori-data.ts:122 | Fiori lede: "מסכי ה-ECC שהמילון מתעד" (technical documentation of ECC screens) | `שבתיעוד הטכני` | Technical documentation → תיעוד טכני |

"מרשם"/"רישום" replacements: bapi-data.ts:208 (`הרישום הקנוני` → `קטלוג הפרויקט`), bapi-data.ts:240 (`הרישום` → `הקטלוג`), bapi-data.ts:501 (`הרישום הקנוני` → `קטלוג הפרויקט`), app/neo/bapi/page.tsx:24 (`הרישום הקנוני` → `קטלוג BAPI ו-FM`), ref-detail-view.tsx:45-49 (return labels → `קטלוג …`).

## 4. Removed AI-writing / defensive signals

Clauses dropped inside rewrites (the surrounding string stays, the clause is gone):

1. bapi-data.ts:241 `ולא הושלם בהשערה`
2. bapi-data.ts:243 `הוא אינו מנחש שמות אובייקטים ואינו משלים טקסט חופשי`
3. bapi-data.ts:399 `לא ממדידה` (not X but Y)
4. bapi-data.ts:495 `ולא הושלם כאן בהשערה`
5. cds-data.ts:159 `לא תוצר של גזירה אוטומטית` / `ולא נכתבות כטקסט מדויק` (not X but Y, twice)
6. cds-data.ts:293 `ולא נכתב מחדש כאן`
7. enh-data.ts:103 `ולכן כל רשומה כאן נפתחת בהשוואה הזו ולא בהגדרה` (design narration)
8. enh-data.ts:208 `שיוך רופף היה ניחוש`
9. idoc-data.ts:117 `הרשימה קצרה בכוונה: סוג הודעה שאינו מופיע במאגר אינו נוסף כאן כדי להאריך אותה` and idoc-data.ts:142 `זהו מצב אמיתי של הנתונים ולא כשל בחיפוש`

Also removed: all em/en dashes in visible strings (bapi-data 265-267, 312, 399; fiori-data 175-177; idoc-data 226, 230), the decorative `↔` in cds-data.ts:292, the "אמיתי / במלואן / מזיכרון" assurances in Fiori and CDS ledes/foots, the metaphor "אנטומיה" (4 places), "החוויה של S/4HANA" (fiori-data.ts:56), and the "מה … / איך … / למה …" question-style labels (bapi 287-289, 299, 364-376; cds 198, 241; fiori 195-211, 244; idoc 209-212, 260, 269; enh 156, 167).

## 5. Unresolved terminology questions

1. **Reservation → `שריונים (Reservation)`** (bapi-data.ts:40). The previous label `שמורות` is not a term used for SAP reservations (RESB). `שריון` is the usual Israeli SAP-consultant term but is not in the glossary. If the product owner prefers another form (e.g. `הזמנות שריון`), it is a one-line change. Latin kept in parentheses so the meaning stays traceable either way.
2. **H1 for family 17.** The brief suggested `הרחבות והתאמות`; validated against `data/enhancements.ts` (13 records: exits, BAdIs, enhancement spots, BTE, VOFM, substitution/validation, transaction/screen variants, key-user extensibility). `התאמות` was rejected because in Israeli SAP usage it commonly means Customizing (SPRO), which this catalog does not cover. Kept `טכניקות הרחבה` (accurate, glossary-conformant, matches every record eyebrow `טכניקת הרחבה · …`). The rail item (01 audit) says `הרחבות`, and the return label here says `קטלוג הרחבות`; both are consistent with the H1 as a short form. Flag if a different H1 is wanted.
3. **`Interface · בסיסי` / `Interface · מורכב` / `Consumption` / `Analytical`** (cds-data.ts:33-38) are the VDM view-type labels. Left as-is: they are SAP VDM vocabulary, and a Hebrew form for Basic/Composite Interface View is not in the glossary.
4. **`Fact Sheet`** (fiori-data.ts:29) left in Latin; it is an SAP app-type name. No occurrence in the current dataset (types are Transactional ×18, Analytical ×2), so it is not rendered today.
5. **Kind values shown verbatim from data**: `BAPI` / `FM` (objectType), `Message Type` (idoc-data.ts:78), `Exit קלאסי` / `BAdI` / `מסגרת הרחבה` (KIND_HE). These are label constants but map 1:1 to dataset enumerations; `Message Type` was left in English because the only alternative (`סוג הודעה`) is already the row's noun and would read as a duplicate chip. Flag if a Hebrew chip is preferred.
6. **`נדרש אימות במערכת SAP`** (bapi-data.ts:71) vs the shared `lib/s4` label `נדרש אימות SAP` (out of scope). The two coexist on the same screen (verification status vs table risk). They are not identical strings; harmonising the lib/s4 constant is outside this pass.
7. **SmartReturn hint `לא נשמר מסלול הגעה בביקור הזה`** (ref-surface.tsx:307, ref-detail-view.tsx:172) kept verbatim: it is the same string the tables/transactions/object surfaces use (tables-detail-view.tsx:145, tx-detail-view.tsx:134, object-return.tsx:23), and changing it here alone would create drift.

## 6. Out-of-scope strings noticed (not edited)

| file | string | note |
|---|---|---|
| lib/s4.ts:26-27 | `TRUST_HE`: `מאומת / חלקי / נדרש אימות SAP`; `RISK_HE`: `סיכון גבוה / סיכון בינוני / יציב / לא ידוע` | Rendered inside every reference record's table-standing rows and in row badges. `לא ידוע` for risk "none" reads as a definite status; glossary C would prefer `נדרש אימות נוסף`. Owner: S/4 family. |
| components/neo-shell/mod-var.ts:29-31 | `MOD_HE` | Already glossary-conformant after the 01 pass; rendered in every module chip here. |
| components/neo-shell/nav-data.ts (rail) | `BAPI ו-FM`, `תצוגות CDS`, `יישומי Fiori`, `הרחבות` | Rail labels vs the new H1s (`BAPIs ומודולי פונקציה`, `CDS Views`, `יישומי SAP Fiori`, `טכניקות הרחבה`): consistent as short/long forms; no change proposed. |
| data/function-intel.ts, data/bapi-enrichment.*.ts, data/cds-map.ts, data/cds-enrichment.ts, data/fiori/apps.ts, data/enhancements.ts, data/exits.ts, lib/idoc-intel.ts | All `he`, `what`, `why`, `ecc`, `s4`, `def`, `how`, `scenario`, `cause`, `fix`, `role`, `explain.*` prose and every identifier | Dataset content, rendered verbatim; not touched per D. Some of that prose contains em dashes and `אפליקציה`; that is data, not UI copy. |
| components/neo-shell/nav-context (SmartReturn) | `חזרה ל…` link rendering around `label` | Shared component; label text supplied from here is now `קטלוג …`. |

## 7. Copy-vs-data conflicts (data untouched)

1. **Completeness chip claimed verification** (ref-links.ts:169 `שדות מאומתים`). The value is a count of non-empty fields (`checks.filter(Boolean)`), not of verified ones. Copy corrected to `שדות מתועדים`; the count itself is unchanged.
2. **CDS lede said the views are "משוחררות" (released)**. No `released` flag exists in `data/cds-map.ts` or `data/cds-enrichment.ts`; the only trust field is `verified`. Claim removed from copy; data untouched.
3. **CDS foot said the mapping is "מאומת ידנית"**. The per-view `verified` field is rendered as its own status chip (`רשומה מאומתת` / `נדרש אימות נוסף` / `מיפוי בלבד`), and some views have no enrichment record at all, so a blanket "manually verified" sentence over-claimed. Copy now says `נלקח מתיעוד הפרויקט`; chips continue to show the per-record truth.
4. **BAPI headline "אחת מטבלאות הליבה"** was singular even when several critical tables were listed; rewritten to the neutral `נשען על X` form. The list of tables and the tone rule (`critical.length`) are unchanged.
5. **Enhancement example sentinel `"—"`** in `data/enhancements.ts` (an em dash used as "no example") is data and drives logic (`e.pmExample !== "—"`); left untouched. The `absent` copy that replaces it on screen is now glossary-conformant.
6. **Enhancement lede**: the `EXITS.length` figure is rendered as "הרחבות בשם … משויכות לטכניקות", but only techniques whose slug is in `EXIT_KIND_OF` receive a join. The number is the catalog size, not the joined count; the sentence was tightened but still states the catalog size, matching the stat plate (`עם הרחבות בשם במאגר` counts techniques, not exits). No number changed.
