# Language pass · 22 SAP Books library · 23 Book Hub · 24 Reader

Branch: `design/neo-correction-pass`. Copy-only pass, no logic / JSX structure / class / href / number changes. Typecheck: `./node_modules/.bin/tsc --noEmit` exit 0 after the pass. No build, no browser run in this pass.

Files edited (16):
`app/neo/books/page.tsx`, `app/neo/books/[bookId]/page.tsx`, `app/neo/read/[bookId]/page.tsx`,
`components/neo-shell/books/{book-shelf,book-hub,book-toc,quick-view,book-cover}.tsx`, `components/neo-shell/books/{books-data,resume}.ts`,
`components/neo-shell/reader/{neo-reader,progress-rail,reader-panel,section-body}.tsx`, `components/neo-shell/reader/{prefs,progress}.ts`.

Files in scope with no visible strings (reviewed, untouched): `books/cover-title.ts`, `books/links.ts`, `books/reading-state.ts`, `reader/env.ts`, `reader/figures.ts`, `reader/lens.tsx`, `reader/reader-data.ts`, `reader/types.ts`.

Never touched: book titles, chapter/section titles, page counts, publisher strings, `intro.en`, figure source pages, anything read from the registry. Code comments untouched.

Naming decisions applied across the family:
- The surface at `/neo/books/` is `ספריית SAP` (H1). The return label `מדף הספרים` and the action `חזרה למדף` stay as the approved short names of the shelf.
- The `/library/` reader is named `הקורא של הספרייה הדיגיטלית` (the product's existing name for `/library/`), replacing the internal term `הקורא הקנוני`.
- "מילון" on these surfaces always meant the PM / PP-PI technical documentation (tables and fields), so every instance became `התיעוד הטכני` / `תיעוד טכני` (GLOSSARY §A "Technical documentation", §B row 2).
- One phrase for a chapter without subchapters everywhere: `לפרק זה אין תת-פרקים במאגר`.
- One phrase for missing publisher everywhere: `מוציא לאור לא מתועד`.

## Table

| route/surface | file:line | current text | issue category | final text | evidence/glossary ref | action | risk |
|---|---|---|---|---|---|---|---|
| 22 Shelf · metadata title | app/neo/books/page.tsx:11 | ספרים · Project NEO | vague title | ספריית SAP · Project NEO | §A SAP Books | rewrite | low |
| 22 Shelf · metadata description | page.tsx:12 | מדף הספרים של Project NEO: אחד עשר ספרי SAP כאובייקטים, והדרך מהם אל המילון הטכני. | design narration + "מילון" + hard-coded count not derived from data | ספריית SAP של Project NEO: ספרי SAP לפי מודול, תוכן העניינים של כל ספר והקישור לתיעוד הטכני. | §A, §B, §C | rewrite (dropped the literal "אחד עשר": the live count is printed in the H1 from `d.totals.books`) | low |
| 22 Shelf · H1 line 1 | page.tsx:53 | {books} ספרי SAP | H1 does not name the subject | ספריית SAP | task rule "one H1 naming the subject" | rewrite | low |
| 22 Shelf · H1 line 2 | page.tsx:54 | מקצועיים. | hype / vague | {books} ספרים | §C no hype | rewrite (count expression moved from line 1 to line 2, same value) | low: line 2 is longer than "מקצועיים." at display size, flagged for visual pass |
| 22 Shelf · lede | page.tsx:57-59 | …פרקים ו־… תת-פרקים, פרושים על … כל כריכה כאן משורטטת מהמטא-דאטה … אין תמונות עטיפה בפרויקט, ולכן גם לא הומצאה אחת. כרטיס הספר פותח את תוכן העניינים האמיתי … לקורא הקיים | maqaf prefix; design narration; defensive copy; AI signature ("האמיתי", "לא הומצאה") | {chapters} פרקים ו-{sections} תת-פרקים ב-{modules} מודולים של SAP. כרטיס הספר מציג את תוכן העניינים עד רמת תת-הפרק, וכל שורה בו נפתחת בקורא של Project NEO. | §C | rewrite, 3 sentences removed | low |
| 22 Shelf · pages-missing note (1) | page.tsx:82 | …והוא אינו נספר בסכום העמודים. הכרטיס שלו אומר זאת במפורש במקום להציג אפס. | defensive copy | לספר אחד אין ספירת עמודים במטא-דאטה, והוא אינו נכלל בסכום העמודים. | §C | rewrite | low |
| 22 Shelf · pages-missing note (n) | page.tsx:83 | …והם אינם נספרים בסכום העמודים. | wording | …והם אינם נכללים בסכום העמודים. | §C | rewrite | low |
| 22 Shelf · coverage bar aria | page.tsx:89 | כיסוי המילון הטכני | "מילון" | כיסוי התיעוד הטכני | §B | rewrite | low |
| 22 Shelf · coverage bar title | page.tsx:92 | המילון הטכני של NEO מתעד {n} מודולים מתוך {m} | "מילון"; product name shortened | התיעוד הטכני של Project NEO מכסה {n} מודולים מתוך {m} | §B, §D product names | rewrite | low |
| 22 Shelf · coverage bar note | page.tsx:110-111 | …נשענים על מודול שיש לו מילון טכני. בכרטיס של כל ספר אחר כתוב במפורש שאין לו כיסוי במילון, במקום קישור שרומז אחרת. | "מילון" ×2; defensive "not X but Y" | …שייכים למודול שיש לו תיעוד טכני במאגר. בכרטיס של שאר הספרים מצוין שלמודול שלהם לא קיים תיעוד טכני. | §B, §C | rewrite | low |
| 22 Shelf · eyebrow, stats labels, filter labels, counts, shelf headers, card meta, aria on slab/bookmark, footer link "הספרייה הדיגיטלית", credit | page.tsx:45-47, 67-71, 125, 127; book-shelf.tsx:246, 268, 290, 297, 304-359, 392, 408, 437 | — | — | kept | reviewed against §A/§C | keep | — |
| 22 Shelf · continue block heading | book-shelf.tsx:271 | המשך מהמקום האחרון | inconsistent Hebrew (מקום / מיקום) | המשך מהמיקום האחרון | §C consistency with "המיקום נשמר" | rewrite | low |
| 22 Shelf · continue CTA | book-shelf.tsx:283 | חזרה לתת-הפרק / חזרה לפרק | unclear CTA (reads as "go back") | המשך קריאה בתת-הפרק / המשך קריאה בפרק | §C verbal-noun; task list "המשך קריאה" | rewrite | low: +5 chars in a `nu-btn`, flagged |
| 22 Shelf · card CTA | book-shelf.tsx:462 | פתח בקורא | imperative | פתיחה בקורא | §C | rewrite | low |
| 23 Hub · metadata description | app/neo/books/[bookId]/page.tsx:29 | …והדרך אל הקורא הקיים של Project NEO. | design narration | …: תוכן העניינים, המשך קריאה והקישור לתיעוד הטכני. | §C | rewrite | low |
| 24 Reader · metadata description | app/neo/read/[bookId]/page.tsx:39 | …נקראים ממאגר הספרים של הפרויקט. | wording | … תת-פרקים בקורא של Project NEO. | §C | rewrite | low |
| 23 Hub · breadcrumb aria | book-hub.tsx:144 | מיקום | accessibility label (ambiguous) | מסלול ניווט | §C | rewrite | low |
| 23 Hub · publisher chip | book-hub.tsx:182 | ללא מוציא לאור במטא-דאטה | inconsistent empty wording | מוציא לאור לא מתועד | §C empty wording; consolidated with cover + reader footer | rewrite | low |
| 23 Hub · source line (no pages) | book-hub.tsx:191 | אין ספירת עמודים במטא-דאטה של הספר הזה, ולכן אינה מוצגת. … | defensive | לספר זה אין ספירת עמודים במטא-דאטה. במאגר מתועדים … | §C | rewrite | low |
| 23 Hub · source line tail | book-hub.tsx:194 | המקור הוא מרשם הספרים של Project NEO, אותו מרשם שהקורא עצמו קורא ממנו. | "מרשם"; implementation note | המקור: מאגר הספרים של Project NEO. | §B ("מרשם" → catalog / source wording) | rewrite | low |
| 23 Hub · modes aria | book-hub.tsx:227 | דרכי הכניסה לספר | vague | אפשרויות קריאה | §C | rewrite | low |
| 23 Hub · mode A kicker | book-hub.tsx:230 | א · המשך קריאה | design narration (lettered "two ways in") | המשך קריאה | §C | rewrite | low |
| 23 Hub · mode B kicker | book-hub.tsx:248 | ב · פתיחת הספר / פתיחת הספר | design narration | פתיחת הספר מההתחלה / פתיחת הספר | §C | rewrite (ternary kept, both branches now meaningful) | low |
| 23 Hub · open CTA | book-hub.tsx:256 | פתח בקורא של NEO | imperative; product name | פתיחה בקורא | §C, §D | rewrite | low |
| 23 Hub · reader description | book-hub.tsx:259-262 | משטח הקריאה של Project NEO: תוכן העניינים, מפת ההתקדמות, מצב מיקוד, גודל הטקסט ורוחב הטור. הפתיחה היא בפרק … / …והקורא יאמר זאת במפורש. | design narration; defensive | הקורא של Project NEO כולל תוכן עניינים, מפת התקדמות, מצב מיקוד והגדרות תצוגה. הקריאה נפתחת בפרק … / לספר זה לא קיימים פרקים במאגר. | §C | rewrite | low |
| 23 Hub · no stored position | book-hub.tsx:269 | אין מיקום קריאה שמור לספר הזה. המיקום נשמר ברגע שקוראים בו בפועל. | wording | לספר זה אין מיקום קריאה שמור. המיקום נשמר במהלך הקריאה. | §C | rewrite | low |
| 23 Hub · canonical reader link | book-hub.tsx:281, 284 | הקורא הקנוני של הפרויקט … {href}: ממשיך לפעול ללא שינוי. | internal term; implementation note | הקורא של הספרייה הדיגיטלית {href}. | §C; existing product name for /library/ | rewrite, clause removed | low |
| 23 Hub · dict section aria + H2 | book-hub.tsx:299-300 | החיבור למילון NEO / החיבור ל-Project NEO | "מילון"; vague heading | הקישור לתיעוד הטכני / התיעוד הטכני ב-Project NEO | §B | rewrite | low |
| 23 Hub · dict row | book-hub.tsx:306 | מילון {code} · {he} | "מילון" | תיעוד טכני {code} · {he} | §B | rewrite | low |
| 23 Hub · Fiori registry count | book-hub.tsx:322 | {n} אפליקציות מלאות | inaccurate SAP terminology; vague | {n} יישומי Fiori | §A Fiori Application | rewrite | low |
| 23 Hub · siblings aria + H2 | book-hub.tsx:329-331 | ספרים נוספים במדף / על אותו מדף | design metaphor | ספרים נוספים במודול (both) | §C | rewrite | low |
| 23 Hub · status lines, chips, "חזרה למדף", credit, return labels "ספר"/"מדף הספרים" | book-hub.tsx:130, 145, 176-181, 207-213, 238, 345, 358, 360 | — | — | kept | §A/§C/§D | keep | — |
| 23/22 TOC · header count | book-toc.tsx:125 | …תת-פרקים, כפי שהם במאגר | defensive | {c} פרקים · {s} תת-פרקים | §C | rewrite | low |
| 23/22 TOC · search aria | book-toc.tsx:138 | חיפוש בכותרות הפרקים ותתי-הפרקים של הספר הזה | inconsistent Hebrew (תתי / תת) | חיפוש בכותרות הפרקים ותת-הפרקים של הספר | §C | rewrite | low |
| 23/22 TOC · no results | book-toc.tsx:152 | אין התאמה בכותרות של הספר הזה. החיפוש כאן הוא על תוכן העניינים בלבד ואינו קורא את גוף הטקסט. | defensive | לא נמצאו כותרות התואמות לחיפוש. החיפוש פועל על תוכן העניינים בלבד, לא על גוף הטקסט. | §C empty-state wording | rewrite | low |
| 23/22 TOC · chapter open button | book-toc.tsx:197 | פרק בקורא | unclear CTA | פתיחת הפרק | §C | rewrite | low: +1 char in a narrow row |
| 23/22 TOC · empty chapter | book-toc.tsx:204 | לפרק הזה אין תת-פרקים במאגר. | inconsistent phrasing | לפרק זה אין תת-פרקים במאגר. | consolidation | rewrite | low |
| 23/22 TOC · bookmark title | book-toc.tsx:220 | סימנייה שהונחה בקורא של NEO | product name | סימנייה מהקורא של Project NEO | §D | rewrite | low |
| 23/22 TOC · footnote | book-toc.tsx:245 | כל שורה כאן נפתחת … במיקום עצמו: פרק על הפרק, תת-פרק על תת-הפרק. | design narration | כל שורה נפתחת בקורא של Project NEO, בפרק או בתת-הפרק שנבחר. | §C | rewrite | low |
| 22 Quick view · continue heading | quick-view.tsx:273 | המשך מהמקום האחרון | consistency | המשך מהמיקום האחרון | §C | rewrite | low |
| 22 Quick view · continue CTA | quick-view.tsx:283 | חזרה לתת-הפרק / חזרה לפרק | unclear CTA | המשך קריאה בתת-הפרק / המשך קריאה בפרק | §C | rewrite | low, flagged (button width) |
| 22 Quick view · resume notes | quick-view.tsx:287-288 | המיקום נשמר עד רמת תת-הפרק, והקורא של NEO נוחת עליו. / נשמר פרק בלבד. תת-פרק נשמר רק כשהקריאה בפועל הגיעה לאחד. | translation problem ("נוחת"); defensive | המיקום נשמר ברמת תת-הפרק, והקורא נפתח בו. / נשמר פרק בלבד; תת-פרק נשמר במהלך הקריאה. | §C | rewrite | low |
| 22 Quick view · scroll note tail | quick-view.tsx:293 | הנחיתה עצמה היא ברמת תת-הפרק. | translation problem | הפתיחה היא ברמת תת-הפרק. | §C | rewrite | low |
| 22 Quick view · no stored position | quick-view.tsx:298 | אין מיקום קריאה שמור לספר הזה. אחרי פתיחה ראשונה בקורא, המקום האחרון יופיע כאן. | wording | לספר זה אין מיקום קריאה שמור. המיקום נשמר במהלך הקריאה ויוצג כאן. | §C | rewrite | low |
| 22 Quick view · dict aria / H3 / row / Fiori count | quick-view.tsx:309-316, 332 | החיבור למילון NEO / החיבור ל-Project NEO / מילון … / אפליקציות מלאות | "מילון"; SAP terminology | as Hub rows above | §A, §B | rewrite | low |
| 22 Quick view · open CTA | quick-view.tsx:346 | פתח את הספר בקורא | imperative | פתיחת הספר בקורא | §C | rewrite | low |
| 22 Quick view · footer sentence | quick-view.tsx:355-359 | הקורא הקנוני של הפרויקט, {href}, ממשיך לפעול ללא שינוי: העמוד הזה אינו עוטף אף אחד מהשניים. | internal term; implementation note | הספר זמין גם בקורא של הספרייה הדיגיטלית: {href}. | §C | rewrite, clause removed | low |
| 22 Quick view · close aria, facts labels, "לא מתועד", status lines, "מרכז הספר" | quick-view.tsx:205, 252-263, 224-230, 350 | — | — | kept | §C | keep | — |
| 22 Cover · publisher foot | book-cover.tsx:180 | ללא מוציא לאור במטא-דאטה | consistency | מוציא לאור לא מתועד | consolidation | rewrite | low (cover is aria-hidden; visible only) |
| 22 Cover · "עמודים לא מתועדים" | book-cover.tsx:182; book-hub.tsx:179; neo-reader.tsx:992 | — | — | kept | §C honest absence | keep | — |
| all · module name PP-PI | books-data.ts:48 | ייצור תהליכי | inaccurate SAP terminology | תעשיות תהליכיות | §A PP-PI; same change made by the Home pass in home-data.ts | rewrite | low: +5 chars in the filter pill and shelf header, flagged |
| all · module name Fiori | books-data.ts:54 | אפליקציות Fiori | inaccurate SAP terminology | יישומי Fiori | §A Fiori Application | rewrite | low |
| all · structure label (catalogue) | books-data.ts:106 | קטלוג: ערך לכל אפליקציה | SAP terminology | קטלוג: ערך לכל יישום | §A | rewrite | low |
| 23/22 · PP-book caveat (UI-authored, not a source quote) | books-data.ts:237 | הספר מתויג PP; המילון מתעד ייצור תהליכי (PP-PI). … | "מילון"; PP-PI term | הספר מתויג PP; התיעוד הטכני מכסה תעשיות תהליכיות (PP-PI). הכיסוי חופף אך אינו זהה. | §A, §B | rewrite | low |
| 23/22 · no-dict note | books-data.ts:244 | אין מילון טכני ל-{m} ב-Project NEO. המילון מתעד היום את PM ואת PP-PI בלבד, והספר הזה נשען על עצמו. | "מילון" ×2; AI signature ("נשען על עצמו") | לא קיים תיעוד טכני ל-{m} במאגר. התיעוד הטכני מכסה כיום את PM ואת PP-PI בלבד. | §B, §C empty wording | rewrite | low |
| 23 · book7 exact note | books-data.ts:293 | מזהי הערכים … אפליקציות Fiori … הקישור העמוק של הקורא מקבל מספרי סעיף בלבד. לחיצה על ערך פותחת את הפרק שלו בקורא, לא את הערך עצמו. | SAP terminology; implementation note | מזהי הערכים בספר זה הם מזהי יישומי Fiori ולא מספרי סעיף, ולכן קורא הספרייה הדיגיטלית פותח את הפרק ולא את הערך עצמו. | §A, §C | rewrite | low |
| 23/22 · Fiori registry label | books-data.ts:299 | מרשם ה-Fiori של NEO | "מרשם"; product name | קטלוג יישומי Fiori של Project NEO | §B "מרשם → קטלוג" | rewrite | low |
| 22 · twin note | books-data.ts:377 | …בשתי סכימות שדה שונות. שניהם מוצגים כאן כפי שהם קיימים במאגר, ולא מאוחדים לכרטיס אחד. | internal note; defensive | …בשני מבני נתונים שונים, ולכן מוצגים כשני ספרים נפרדים. | §C | rewrite | low |
| 22/23 · scroll line | resume.ts:86 | הקורא שמר גם את מיקום הגלילה: כ-{n}% לאורך הטקסט. | wording | נשמר גם מיקום הגלילה: כ-{n}% מהטקסט. | §C | rewrite | low |
| 24 Reader · empty book | neo-reader.tsx:615 | לספר {t} אין פרקים בקובץ הספר, ולכן אין מה לקרוא כאן. | defensive | לספר {t} לא קיימים פרקים במאגר. | §C empty wording | rewrite | low |
| 24 Reader · bookmark aria | neo-reader.tsx:688 | הסר סימנייה מהמיקום הזה / סמן את המיקום הזה בסימנייה | imperative | הסרת הסימנייה מהמיקום הנוכחי / הוספת סימנייה במיקום הנוכחי | §C | rewrite | low |
| 24 Reader · bookmark titles | neo-reader.tsx:692-695 | סימנייה מונחת כאן… / הנח סימנייה על תת-הפרק הנוכחי / הנח סימנייה על הפרק: … בנתוני הספר | imperative; phrasing | סימנייה במיקום הנוכחי… / הוספת סימנייה לתת-הפרק הנוכחי / הוספת סימנייה לפרק: לפרק זה אין תת-פרקים במאגר | §C | rewrite | low |
| 24 Reader · focus title | neo-reader.tsx:735 | מצב מיקוד: פחות סביבה, אותו טקסט | "not X but Y" contrast | מצב מיקוד: הסתרת רכיבי הממשק סביב הטקסט | §C | rewrite | low |
| 24 Reader · lens titles | neo-reader.tsx:749-750 | …מושבתת כי המערכת מבקשת פחות תנועה / …מבודדת חלון קריאה קצר; להגדלה השתמש בגודל הטקסט | second-person imperative; design narration | עדשת הקריאה מושבתת כאשר במערכת מופעלת העדפה לתנועה מופחתת / עדשת קריאה: הדגשת רצועת קריאה קצרה ועמעום שאר העמוד | §C; reduced-motion note kept honest | rewrite | low |
| 24 Reader · size / measure aria | neo-reader.tsx:761, 771, 783, 794 | הקטן טקסט / הגדל טקסט / הצר את הטור / הרחב את הטור | imperative | הקטנת הטקסט / הגדלת הטקסט / הצרת הטור / הרחבת הטור | §C | rewrite | low |
| 24 Reader · paper title | neo-reader.tsx:819 | גוון נייר: חם יותר, רק על משטח הקריאה | design narration | גוון נייר: רקע חם יותר למשטח הקריאה | §C | rewrite | low |
| 24 Reader · reset title + aria | neo-reader.tsx:828-829 | אפס את הגדרות הקריאה | imperative; does not say what is reset (code: `prefs.reset()` restores display DEFAULTS only) | title: איפוס הגדרות התצוגה: גודל טקסט, רוחב טור, רווח שורות, גוון נייר, שפה, מיקוד ועדשה. התקדמות הקריאה והסימניות נשמרות · aria: איפוס הגדרות התצוגה, ללא מחיקת התקדמות הקריאה | task rule; prefs.ts:167 | rewrite | low (icon-only button, no width impact) |
| 24 Reader · resume banner | neo-reader.tsx:843, 858, 862 | הפעם הקודמת הסתיימה כאן: / התחל את הפרק מחדש / הפרק כבר פתוח; הכפתור מדלג … והקורא לא יבטיח מה שאינו יכול לקיים. | wording; imperative; AI signature + defensive | המיקום האחרון שנשמר: / קריאת הפרק מההתחלה / המיקום נשמר ברמת פרק ותת-פרק, לא ברמת מיקום הגלילה. | §C | rewrite, 2 clauses removed; "המשך מכאן" kept | low |
| 24 Reader · chapter meta / empty chapter | neo-reader.tsx:888, 949 | אין תת-פרקים בנתוני הספר לפרק זה / בנתוני הספר אין תת-פרקים לפרק הזה. זהו מצב אמיתי במאגר, לא תקלה: ולכן לא הומצאו כאן סעיפים. | defensive; AI signature | לפרק זה אין תת-פרקים במאגר (both) | §C, consolidation | rewrite | low |
| 24 Reader · figure line | neo-reader.tsx:903-907 | …משובצים בגוף הטקסט לפי עמוד המקור שלהם · … בלי שיבוץ / פתח את כל האיורים | wording; imperative | …משובצים בטקסט לפי עמוד המקור · … ללא שיבוץ / הצגת כל האיורים | §C | rewrite | low |
| 24 Reader · load error | neo-reader.tsx:924-926 | לא הצלחתי לקרוא את קובץ הפרק מהמאגר. … / נסה שוב | first-person AI voice; imperative | טעינת גוף הפרק מהמאגר נכשלה. הכותרות שלמטה הן מבנה הפרק בלבד, ללא גוף הטקסט. / ניסיון חוזר | §C errors | rewrite | low |
| 24 Reader · loading | neo-reader.tsx:915 | טוען את גוף הפרק… | — | kept (genuine loading state) | §C | keep | — |
| 24 Reader · footer sentence | neo-reader.tsx:986 | הטקסט, הפרקים ותת-הפרקים נקראים ממאגר הספרים של הפרויקט. הקורא הקנוני של הפרויקט ממשיך לפעול ללא שינוי: | internal term; implementation note | התוכן נקרא ממאגר הספרים של Project NEO. הספר זמין גם בקורא של הספרייה הדיגיטלית: | §C | rewrite | low |
| 24 Reader · footer publisher | neo-reader.tsx:991 | ללא מוציא לאור במטא-דאטה | consistency | מוציא לאור לא מתועד | consolidation | rewrite | low |
| 24 Reader · unfocus | neo-reader.tsx:1064 | צא ממצב מיקוד | imperative | יציאה ממצב מיקוד | §C | rewrite | low |
| 24 Reader · crumbs, tool labels (תוכן/מיקוד/עדשה/רווח/נייר/סימנייה/מסומן), group arias, chapter H1, prev/next, dock labels and arias, "זהו הפרק הראשון/האחרון בספר.", intro chrome "פתיח הפרק · מהמקור", "% מהספר" | neo-reader.tsx:643-676, 701-822, 883-891, 942-943, 970-982, 1025-1058 | — | — | kept | §C/§D | keep | — |
| 24 Rail · fold aria | progress-rail.tsx:127 | קפל / פרוש את תת-הפרקים של פרק {n} | imperative | קיפול / פרישת תת-הפרקים של פרק {n} | §C | rewrite | low |
| 24 Rail · empty chapter title + row | progress-rail.tsx:134, 189 | לפרק זה אין תת-פרקים בנתוני הספר / אין תת-פרקים בנתוני הספר לפרק הזה. | consistency | לפרק זה אין תת-פרקים במאגר | consolidation | rewrite | low |
| 24 Rail · meter placeholder | progress-rail.tsx:328, 340, 385 | — (em dash) | em dash in visible copy | - (ASCII hyphen) | §C no em dash | rewrite | low, flagged for visual pass (placeholder glyph) |
| 24 Rail · "מהספר", "מסלול הספר: {n} פרקים", meter labels בפרק/בתת-פרק/בספר, strip labels, tick titles, sr text | progress-rail.tsx:235-407 | — | — | kept | §C | keep | — |
| 24 Panel · close arias | reader-panel.tsx:124, 136 | סגור | imperative; ambiguous | סגירת החלונית | §C | rewrite | low |
| 24 Panel · tablist aria | reader-panel.tsx:141 | מצב הפאנל | accessibility label (loan word) | תצוגות החלונית | §C | rewrite | low |
| 24 Panel · search placeholder + note | reader-panel.tsx:171, 177 | חפש פרק, תת-פרק או מזהה / החיפוש עובר על כותרות ומזהים בלבד: גוף הטקסט נטען פרק-פרק ואינו נמצא כאן. | imperative; implementation note | חיפוש פרק, תת-פרק או מזהה / החיפוש פועל על כותרות ומזהים בלבד, לא על גוף הטקסט. | §C | rewrite | low |
| 24 Panel · no hits | reader-panel.tsx:184 | אין התאמה בכותרות של הספר הזה. | empty wording | לא נמצאו כותרות התואמות לחיפוש. | §C | rewrite | low |
| 24 Panel · row titles | reader-panel.tsx:225, 230 | בפרק הזה מונחת סימנייה / סומן כנקרא בקורא של הפרויקט | wording; internal naming | בפרק זה יש סימנייה / סומן כנקרא בקורא של הספרייה הדיגיטלית | §C | rewrite | low |
| 24 Panel · empty chapter / empty book | reader-panel.tsx:256, 275 | לפרק זה אין תת-פרקים בנתוני הספר. / הספר אינו מחזיק תת-פרקים | consistency; translation problem ("מחזיק") | לפרק זה אין תת-פרקים במאגר. / לספר זה אין תת-פרקים במאגר | consolidation | rewrite | low |
| 24 Panel · bookmarks / read lines | reader-panel.tsx:299-300, 310 | {n} מיקומים מסומנים בקורא של NEO / לא הונחה סימנייה בספר הזה / {r} מתוך {c} פרקים: נרשם בקורא הקנוני | product name; internal term | … בקורא של Project NEO / אין סימניות בספר זה / {r} מתוך {c} פרקים, לפי הקורא של הספרייה הדיגיטלית | §D, §C | rewrite | low |
| 24 Panel · bookmarks H3 | reader-panel.tsx:318 | הסימניות שלי בספר הזה | tone | סימניות בספר זה | §C | rewrite | low |
| 24 Panel · unmark aria + title | reader-panel.tsx:336-337 | הסר את הסימנייה מ{t} / הסר סימנייה | imperative | הסרת הסימנייה מ{t} / הסרת סימנייה | §C | rewrite | low |
| 24 Panel · measurement note | reader-panel.tsx:349 | המדידה נשענת על ספירת תת-הפרקים האמיתית של הספר. אין בנתונים זמן קריאה משוער או ספירת מילים, ולכן אין כאן הערכת זמן. | defensive; AI signature ("האמיתית") | ההתקדמות נמדדת לפי מספר תת-הפרקים בספר. | §C | rewrite, 1 sentence removed | low |
| 24 Panel · tab labels, map dt/dd labels, "אין תת-פרק פתוח", "עדיין לא סומן פרק כנקרא", "עמ׳" | reader-panel.tsx:150, 160, 269-311 | — | — | kept | §C | keep | — |
| 24 · position line | progress.ts:171 | לפרק זה אין תת-פרקים בנתוני הספר | consistency | לפרק זה אין תת-פרקים במאגר | consolidation | rewrite | low |
| 24 Body · academy refs labels | section-body.tsx:195, 197 | טבלאות / אפליקציות Fiori | glossary forms | טבלאות SAP / יישומי Fiori | §A | rewrite | low |
| 24 Body · figure aria | section-body.tsx:240 | הגדל את האיור מעמוד {p} | imperative | הגדלת האיור מעמוד {p} | §C | rewrite | low |
| 24 Body · figure caption chrome | section-body.tsx:259-260 | המיקום נגזר מעמוד המקור של הסריקה. בנתוני הספר אין שיוך איור לתת-פרק. / לסריקה הזו אין עמוד שניתן לשבץ לפיו, ולכן היא בסוף הפרק. | wording (meaning kept: position is derived, not recorded) | המיקום משוער לפי עמוד המקור של הסריקה; במאגר אין שיוך איור לתת-פרק. / לסריקה זו אין עמוד מקור לשיבוץ, ולכן היא מוצגת בסוף הפרק. | §C | rewrite | low |
| 24 Body · tail H2 | section-body.tsx:283 | איורים שלא ניתן היה לשבץ בגוף הפרק | wording | איורים ללא שיבוץ בגוף הפרק | §C | rewrite | low |
| 24 Body · HE · EN chip title | section-body.tsx:344 | לתת-פרק הזה יש טקסט בעברית ומקור באנגלית | wording | לתת-פרק זה קיימים תרגום לעברית ומקור באנגלית | §C | rewrite | low |
| 24 Body · no content (×2 sites) | section-body.tsx:351, 389 | אין תוכן מורחב לתת-פרק זה במאגר הספר. | empty wording | לתת-פרק זה לא קיים תוכן במאגר. | §C empty wording | rewrite | low |
| 24 Body · language notes | section-body.tsx:357, 381-382 | הספר הזה כתוב בעברית בלבד במאגר… / לתת-הפרק הזה קיים במאגר הטקסט העברי בלבד. / …בלי תרגום. | wording | ספר זה קיים במאגר בעברית בלבד, ללא מקור באנגלית. / לתת-פרק זה קיים במאגר טקסט בעברית בלבד. / …ללא תרגום. | §C | rewrite | low |
| 24 Body · "עברית"/"English" tags, "המקור באנגלית"/"התרגום לעברית" summaries, "איור {n}", "p. {page}", "עמ׳" | section-body.tsx:81, 135, 254-256, 343 | — | — | kept | §C | keep | — |
| 24 Prefs · size xxl | prefs.ts:87 | מוגדל (after "גדול מאוד") | inconsistent scale | מרבי | §C | rewrite | low |
| 24 Prefs · lead / measure normal | prefs.ts:89-90 | נוח / נוח | inconsistent with size "רגיל" | רגיל / רגיל | §C | rewrite | low |
| 24 Prefs · language tooltips | prefs.ts:95-97 | …נשאר בעמוד ונפתח בלחיצה בתוך כל תת-פרק. / שתי השפות יחד. במסך רחב זו לצד זו, במסך צר זו מתחת לזו, פסקה מול פסקה. | design narration | עברית בלבד. המקור באנגלית זמין בלחיצה בכל תת-פרק. / שתי השפות יחד, פסקה מול פסקה. / המקור באנגלית בלבד. התרגום לעברית זמין בלחיצה בכל תת-פרק. | §C | rewrite | low |
| 24 Prefs · SIZE_HE sm/md/lg/xl, LEAD snug/air, MEASURE narrow/wide, LANG_HE | prefs.ts:83-92 | — | — | kept | §C | keep | — |

## Totals

Reviewed 254 visible string literals · kept 112 · rewritten 142 · removed 0 standalone strings (9 clauses / sentences removed inside rewrites, listed below) · consolidated 3 groups.

Consolidations:
1. "chapter without subchapters": 5 phrasings → `לפרק זה אין תת-פרקים במאגר` (book-toc, neo-reader ×3, progress-rail ×2, reader-panel ×2, progress.ts).
2. missing publisher: `ללא מוציא לאור במטא-דאטה` (hub, cover, reader footer) → `מוציא לאור לא מתועד`, matching the quick view's `לא מתועד`.
3. `הקורא הקנוני` (hub, quick view, reader footer, panel) → `הקורא של הספרייה הדיגיטלית`.

## "מילון" replacements (9, all → technical documentation)

| where | context | replacement |
|---|---|---|
| shelf aria-label (page.tsx:89) | coverage bar names the PM/PP-PI tables+fields documentation | כיסוי התיעוד הטכני |
| shelf bar title (page.tsx:92) | same | התיעוד הטכני של Project NEO מכסה … |
| shelf bar note (page.tsx:110-111) ×2 | same | תיעוד טכני |
| hub section aria + row (book-hub.tsx:299, 306) | link into /neo/pm/ or /neo/pp-pi/ | הקישור לתיעוד הטכני · תיעוד טכני {code} |
| quick view aria + row (quick-view.tsx:309, 316) | same | same |
| PP caveat (books-data.ts:237) | documentation module vs book module | התיעוד הטכני מכסה תעשיות תהליכיות (PP-PI) |
| no-dict note (books-data.ts:244) ×2 | module without documentation | לא קיים תיעוד טכני ל-{m} במאגר … התיעוד הטכני מכסה כיום … |

"מרשם" → catalog / source wording: books-data.ts:299 (`קטלוג יישומי Fiori של Project NEO`), book-hub.tsx:194 (`מאגר הספרים`).

## Removed AI-writing signals

- "האמיתית / האמיתי" (shelf lede, panel note) and "לא הומצאה / לא הומצאו" (shelf lede, reader empty chapter).
- "והקורא לא יבטיח מה שאינו יכול לקיים", "זהו מצב אמיתי במאגר, לא תקלה" (reader).
- "ממשיך לפעול ללא שינוי", "העמוד הזה אינו עוטף אף אחד מהשניים" (hub, quick view, reader footer).
- "במקום קישור שרומז אחרת", "במקום להציג אפס", "אומר זאת במפורש / יאמר זאת במפורש" (shelf, hub).
- First-person "לא הצלחתי לקרוא" (reader error).
- Lettered "א · / ב ·" mode kickers (hub).
- Maqaf prefix "ו־" (shelf lede).
- Em dash "—" as a meter placeholder (rail ×3).

## Unresolved terminology questions

1. `MOD_HE["MM"] = "רכש ואספקה"` (books-data.ts:49) differs from `lib/primary-module.ts` (`ניהול חומרים / מלאי`). Not in the glossary; left as is. Needs one product-wide decision.
2. `MOD_HE["PP/DS"] = "תכנון מתקדם"`, `"EWM": "ניהול מחסן"`, `"S&OP": "תכנון מכירות ותפעול"`: not in the glossary, kept.
3. `components/neo-shell/nav-data.ts:65` and `mod-var.ts:30` still carry `PM: "אחזקה"` / `"PP-PI": "ייצור תהליכי"` (owned by the global-shell pass, not edited here). The shelf now prints `תעשיות תהליכיות`; the rail may disagree until that pass lands.
4. "עמ׳" uses a geresh (U+05F3) throughout; kept since it is the correct Hebrew abbreviation mark, not a quotation or dash.

## Out-of-scope strings (seen, not edited)

- `components/chapter-reader.tsx:72` (FROZEN): `מקור ברזולוציה מוגבלת` and its title `רזולוציית המקור מוגבלת (w×h)`. The flag the task asked to preserve lives only in the frozen canonical reader; NEO's own reader (`section-body.tsx`) does not render it and instead caps the image at source width. Meaning intact; no wording touched.
- `lib/book-identity.ts:71-77` `KIND_LABEL` (`מדריכי הגדרה · Configuration`, `מדריכי משתמש עסקי · Business User`, `מדריכי עיון · Reference`, `יסודות S/4HANA`, `SAP PRESS`) rendered as `kindLabel` on shelf, hub and quick view. Under `lib/`, not a label constant in my set.
- `components/neo-shell/nav-context/**`: return-control prefix that wraps `מדף הספרים` / `ספר` / `מרכז הספר` (global shell pass).
- `components/figure-viewer.tsx`: the lightbox chrome the reader opens (outside `reader/**`).
- All book content: titles, chapter/section titles, `intro.en`, prose, academy facet names (`FACET_ORDER` in `lib/library/book.ts`), figure pages.

## Strings flagged for the visual pass (length)

| where | before | after | note |
|---|---|---|---|
| Shelf H1 line 2 (page.tsx:54) | מקצועיים. | {n} ספרים | second kinetic line now carries the count; check the `.nb-mega-2` measure |
| Filter pill + shelf header PP-PI (books-data.ts:48) | ייצור תהליכי (12) | תעשיות תהליכיות (17) | `.nb-f-he` in the filter row, `.nb-shelf-he` in the shelf header |
| Continue CTA (book-shelf.tsx:283, quick-view.tsx:283) | חזרה לתת-הפרק (14) | המשך קריאה בתת-הפרק (19) | `nu-btn`; wraps on narrow quick-view sheet? |
| TOC chapter open (book-toc.tsx:197) | פרק בקורא (9) | פתיחת הפרק (10) | `.nb-ch-open-t`, hidden at narrow widths anyway |
| Rail meter placeholder (progress-rail.tsx:328, 340, 385) | — | - | glyph is narrower; confirm it still reads as "no value" |
| Reset tooltip (neo-reader.tsx:828) | short | long | `title` only; no layout impact |
