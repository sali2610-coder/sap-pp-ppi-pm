# טבלת סגירה · ממצאי BLOCKER ו-MAJOR בשערים 1 עד 10

**תאריך:** 2026-09-29, כ-21:00 · **ענף:** `design/neo-experience-redesign` · **HEAD:** `3989d65e` · **נקודת הפתיחה:** `6ba22207` (הייצור) · **הייצוא שנמדד בסדרה הסופית:** `out/` שנבנה ב-19:50 מ-`92a6af75` (`build-a11y3.log`)

**שיטה.** קראתי את עשרת דוחות השערים (`gate-01` עד `gate-10`), את `content-review-copy-sap.md` ואת `sap-correctness.md`, את `PROGRESS.md` ואת `BLOCKERS.md`, ואת 60 ה-commits בין `6ba22207` ל-HEAD עם גוף ההודעה של כל אחד. HEAD זז במהלך העבודה מ-`92a6af75` ל-`3989d65e` (20:17, סשן אחר), ולכן כל הפניה בצורת file:line כאן נבדקה מול `git show 3989d65e:<path>`: 179 הפניות נבדקו בסקריפט שרק קורא, וכולן תואמות. לא הרצתי דבר: לא נפתח דפדפן, לא הופעל ולא נעצר שרת, לא הורצו build, בדיקות או lint, ולא נשלחה בקשה ל-4300. המדידות שבטבלאות הן קבצים שכבר היו ב-`neo-redesign-evidence/`, והנתיבים יחסיים לתיקייה הזו. קובצי התיקון (`fix-*/`, `gate-fix-*/`, `notfound/`) נמדדו על הבנייה של התיקון או על שרת פיתוח, `final-run/` על בניות מ-13:17 עד 16:44, ו-`final-run-3/` על הייצוא של `92a6af75`. במקומות שבהם כתוב "ספירה סטטית", ספרתי בעצמי בקובצי ה-HTML של `out/` (קריאת קבצים בלבד). "code only" פירושו שלא מצאתי קובץ מדידה אחרי התיקון. הסדרה `final-run-3/` הסתיימה ב-20:53:59, תוך כדי הכתיבה, וכל 25 הצעדים שלה יצאו ב-rc=0 (`summary.txt`); התוצאות שלה כלולות כאן עד הצעד האחרון. `BLOCKERS.md` מצוטט כפי שהוא ב-`3989d65e`. `sap-correctness.md` אינו מעלה BLOCKER או MAJOR משלו (הסקירה העצמית שבו כולה MINOR): הוא רישום התיקון של `content-review-copy-sap.md`, ולכן הוא ראיה בטבלה של סקירת התוכן. מצב אחד לכל שורה: CLOSED כשהתיקון נמצא בקוד ב-HEAD ונבדק שם; OPEN, RECORDED כשחלק מהפגם נשאר ו-`BLOCKERS.md` רושם אותו; OPEN, NOT RECORDED כשחלק מהפגם נשאר ואינו רשום; SUPERSEDED כשמה שהממצא מתאר כבר לא קיים. שורה שתוקנה ברובה ונשאר בה שארית גלויה מסומנת לפי השארית, והעמודה "ראיה" אומרת מה נסגר ומה לא.

## שער 1 · איכות תוכן ועובדות SAP

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| 1 | #1 BLOCKER | מפת התהליכים בבית מחברת טבלאות "דרך JSTO" ומדביקה קרדינליות של רגל אחת לקפיצה כולה | CLOSED | `d7461ae1`. `components/neo-shell/home/home-data.ts:317-338`: טבלת ביניים רק כשהיא הורה של קצה אחד וילד של השני (`:332`), ומסלול דרך ביניים בלי קרדינליות (`:335`). הבדיקה `test/home-flows.test.ts` (JSTO לא מחבר שלבים). ספירה סטטית ב-`out/neo/index.html`: 0 מופעים של "דרך JSTO"; הקשר היחיד דרך ביניים הוא AUFK, ‏AFKO, ‏AFVC, בלי קרדינליות |
| 1 | #2 MAJOR | "הזמנת ייצור ב-PP-PI" במקום פקודת תהליך | CLOSED | `d7461ae1`. `app/neo/page.tsx:193` ("הזרימה של פקודת אחזקה ב-PM ושל פקודת תהליך ב-PP-PI"). code only; ב-`out/neo/index.html` "הזמנת ייצור" נשאר רק בטקסט של תקלות ופרקים באינדקס החיפוש |
| 1 | #3 MAJOR | פרק ה-S/4 בבית סופר את עמודת הבלופרינט במילות המילון, בלי מקור, וסותר את עמודי הטבלה | CLOSED | `d7461ae1`, `137a05e1`. `app/neo/page.tsx:134-145` (ספירה לפי `r.status.key` של `tablesData`, המעמד שעמוד הטבלה והשבב מציגים), `:223` (שורת המקור), `:232-234` ("כולל 2 Simplification Item"). מדידה: `fix-pages/results-after2-home.json` (משתנה 11 כולל 2, מוחלף 3, הוסר 0, נדרש אימות 16) |
| 1 | #4 MAJOR | דלת מרכז S/4HANA מציגה "14 טבלאות מסומנות", מספר שהיעד לא מציג | CLOSED | `d7461ae1`. `app/neo/page.tsx:112-115` (מספרי המרכז עצמו מ-`s4ObjectTotals`: 29 אובייקטים, מוחלף, הוסר). מדידה: `gate-fix-home2/home-check.json` (7 מתוך 7 דלתות שוות ליעד), `fix-pages/results-after1-s4.json` (ביעד: 29, מוחלף 5, הוסר 6) |
| 1 | #5 MAJOR | "הסיווג המלא בקוקפיט המעבר", שאין בו הכרעות S/4 | CLOSED | `d7461ae1`. `app/neo/page.tsx:243-252`: קישורים ל-`/neo/pm/#nw-s4` ול-`/neo/pp-pi/#nw-s4`, והקוקפיט מוצג במה שיש בו ("אובייקטי המעבר ורצף הטעינה"). code only |
| 1 | #6 MAJOR | "3 עם טבלה חלופית" בפס הסיכום, כשהספירה היא מעמד "מוחלף" | CLOSED | `d7461ae1`. `components/neo-shell/data/tables-surface.tsx:525` (התווית `S4_STATUS_HE.replaced`). code only |
| 1 | #7 MAJOR | הצומת COGI, טרנזקציה, מצויר כטבלה חסרה | CLOSED | `d7461ae1`. `lib/studio-graph.ts:211` (צומת `AFFW`, "תיקון Backflush ב-COGI"). ספירה סטטית ב-`out/neo/index.html`: AFFW עם "לא במילון" |
| 1 | #8 MAJOR | הצהרת הנגישות מתארת את `6ba22207` ואת מגבלת סימוני הפרקים, שכבר אינה קיימת | OPEN, NOT RECORDED | `d7461ae1` תיקן רק את נוסח התקן (`components/neo-shell/legal/legal-content.ts:185`) ואת "בדיקת ניגודיות פנימית" (`:186`). ב-HEAD: `:30-38` עדיין "28 בספטמבר 2026", ‏`6ba22207`, "ממצא אחד... סימוני הפרקים", 1,280 עצירות, 15,924 צמתים ו-pendingNote; `:210` עדיין מגבלת סימוני הפרקים; `:193` ו-`:195` מיושנים. `final-run-3/g8-desk-day.log` ו-`g8-phone-day.log`: 0 הפרות axe. אותו פגם כמו שער 8 M5. `BLOCKERS.md` לא רושם; `PROGRESS.md` מתכנן ("Next", סעיף 2) |

## שער 2 · ארכיטקטורת הידע

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| 2 | #1 BLOCKER | קשרים בלי בסיס במילון במפת התהליכים (IFLOT ו-EQUI, ‏QMEL ו-AUFK "דרך JSTO") | CLOSED | כמו שער 1 #1 (`d7461ae1`, `home-data.ts:317-338`, `test/home-flows.test.ts`) |
| 2 | #2 MAJOR | פרק ה-S/4 בבית ודלת המרכז: שני מקורות תחת אוצר מילים אחד | CLOSED | כמו שער 1 #3 ו-#4 (`d7461ae1`, `page.tsx:112-115`, `:134-145`, `:217-241`). ההצעה לקשר כל מספר לקטלוג מסונן היא ממצא 17 (MINOR) ולא בוצעה |
| 2 | #3 MAJOR | הפניה לקוקפיט המעבר כאילו הסיווג שם | CLOSED | כמו שער 1 #5 (`page.tsx:243-252`) |
| 2 | #4 MAJOR | COGI בתפקיד טבלה בנתיב PP-PI | CLOSED | כמו שער 1 #7 (`lib/studio-graph.ts:211`). הקישור מהצומת החלול ל-`/neo/domain/pppi-backflush/` שהוצע לא נוסף, והצומת נשאר `span` |
| 2 | #5 MAJOR | ספירת ה-ERD ברייל (118) שונה מהיעד (232); אותה תווית ל-105 ול-220 טבלאות | CLOSED | `d7461ae1`. `components/neo-shell/nav-data.ts:177` (`erdCatalog().stats.edges`); `app/neo/page.tsx:220` ("טבלאות מתיעוד PM ו-PP-PI"). שאריות MINOR: `components/neo-shell/s4/s4-view.tsx:367` עדיין "מחושב מ-220 טבלאות SAP מתועדות" בלי היקף; ב-1440 "232 קשרים" נחתך בכותרת ה-ERD (`final-run-3/sweep/shots/desk1440-day/erd-d2-erd.png`, שער 7 #16) |
| 2 | #6 MAJOR | לכל סוג רשומה כותרת אחרת: העתקה, גלולת S/4, רמת אימות וקפיצות חסרות | CLOSED | `05919eee`. `RecordStatus` בכותרת: `data/tables-detail-view.tsx:249`, `data/tx-detail-view.tsx:191`, `object/object-view.tsx:167`, `reference/ref-detail-view.tsx:237`; העתקה: `tx-detail-view.tsx:177`, `object-view.tsx:160`; ניווט פרקים: `ref-detail-view.tsx:286`. החריגים מתועדים ב-`05919eee`: Fiori פותח בשם העסקי, ו-81 אובייקטי HR/BW בלי גלולה. מדידה: `gate-fix-headers/header-check.json` (שרת פיתוח); ספירה סטטית: בקרת העתקה בכל עמודי הרשומה ב-`out/neo` (1,818 טרנזקציות, 186 אובייקטים, 144 BAPI, ‏39 CDS, ‏34 Fiori, ‏13 הרחבות, 3 IDoc) |
| 2 | #7 MAJOR | שיטות עבודה, מרכזים, מרכז הידע ותקלות בלי סרגל הקטלוג | CLOSED | `05919eee`. `components/neo-shell/best-practices/bp-list.tsx:54-98`, `centers/center-topics.tsx:42-83`, מיון ב-`learn/knowledge-surface.tsx:181` וב-`learn/incidents-surface.tsx:294-296`. מדידה: `gate-fix-catalog/catalog-bar-check.json` (7 קטלוגים: חיפוש, מיון, מסננים, "N מתוך M", מצב ריק עם פעולה) |
| 2 | #8 MAJOR | עמוד האובייקט לא מקשר לעמוד הטבלה (105 זוגות בכיוון אחד) | CLOSED | `d7461ae1`. `components/neo-shell/object/object-view.tsx:253-260`. ספירה סטטית ב-`out/neo/object/*/index.html`: 105 מתוך 105. ההורה בברירת מחדל נשאר הקטלוג (`nav-context/fallbacks.ts:37`), כפי שהוצע כחלופה |

## שער 3 · עיצוב חזותי ומערכת העיצוב

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| 3 | #1 BLOCKER (B1) | מונה המסנן הלחוץ ב-ink-2 על מילוי הדיו (1.82:1) | CLOSED | `41ff9b15`, `b83d8382`, `baa819ef`. `app/neo/ui.css:137-139`, `app/neo/books.css:249`. מדידה: `fix-content/probe-contrast-final.json` (b1: 10.48:1 ביום, 7.33:1 בלילה, 11 קטלוגים), `fix-pages/results-after1-booksFilter.json` (16.65:1 ו-13.92:1) |
| 3 | #2 BLOCKER (B2) | מספר המקטע הפעיל במותג על 20% מותג (3.73:1) | CLOSED | `6167e61e`. `components/neo-shell/workspace/section-nav.css:197` (`var(--ink-1)`). מדידה: `fix-content/probe-contrast-final.json` (b2: 12.72:1 ביום) |
| 3 | #3 BLOCKER (B3) | אין מיקוד נראה על אפשרות השפה הנבחרת בקורא | CLOSED | `b83d8382`. `app/neo/reader.css:266-272` (המצב הנבחר בלי box-shadow), `app/neo/ui.css:193-198`. מדידה: `fix-pages/results-after3-reader.json` (הטבעת הכחולה על האפשרות הנבחרת) |
| 3 | #4 BLOCKER (B4) | לוח הצד של הסטודיו בטלפון מתכווץ ל-19px | CLOSED | `a673f893`. `app/neo/studio.css:269-276`. מדידה: `gate-fix-catalog/studio-phone-after.png` (צילום בלבד) |
| 3 | #5 BLOCKER (B5) | מספר בתא סטטיסטיקה נצמד לתווית של התא הבא (`.nx-sap` ב-LTR) | CLOSED | `013f0329`, `b189c244`, `a6a56f22`. `app/neo/data.css:1798-1804`, `:1961-1983`, `app/neo/s4.css:480-489`, `app/neo/learn.css:1295`. מדידה: `fix-content/probe-contrast-final.json` (b5: worstGap 0), `fix-pages/results-after1-s4.json` (dRight 0). אותו מנגנון נשאר ב-`.no-stat` של עמוד האובייקט (`app/neo/object.css:221-228`, `object-view.tsx:238-245`, ‏186 עמודים), שלא היה ברשימת הממצא; לא נמדד (ראו שער 10 M1) |
| 3 | #6 MAJOR | מעמדות S/4 במרכז S/4HANA ובתחומים בפלטת Tailwind הישנה ובאדום המותג | CLOSED | `b189c244`. `components/neo-shell/s4/s4-data.ts:83-100`, `:142-147`, `s4/s4-view.tsx:45-57`, `s4/s4-catalog.tsx:17-18`, `domain/domain-view.tsx:36-45`. מדידה: `fix-pages/results-after1-s4.json`, `fix-pages/results-after1-domains.json` |
| 3 | #7 MAJOR | צבעי הסטודיו hex ישן; הנקודה בצומת בצבע בלבד | CLOSED | `a673f893`. `components/neo-shell/studio/studio-view.tsx:292-297` (`S4_STATUS_DOT`), `:504-507` (מילת המעמד בצומת), `:559-570` (מקרא בכל מצב). מדידה: `gate-fix-erd/gate7-fix-check.json` (studioS4Words). נשאר קוד ישן בלי צרכן ב-NEO: `lib/studio-graph.ts:229-233` מחזיק את ה-hex הישן עם ההערה "Hex twins of the S4_STATUS_DOT tokens", ורק `components/architecture-studio.tsx` קורא אותו; `/studio/` מופנה ל-`/neo/studio/` ב-`vercel.json` |
| 3 | #8 MAJOR | אדום המותג על שבבי קישור ועל "אין עמוד אובייקט" במרכז S/4HANA | CLOSED | `b189c244`. `app/neo/s4.css:247-253`, `:451-452`. מדידה: `fix-pages/results-after1-s4.json` (שבב בקו שיער של 1px ובצבע קישור #1d5486; "אין עמוד" ב-#655e54) |
| 3 | #9 MAJOR | מפת התהליכים לא נכנסת ב-1440 | CLOSED | `137a05e1`. `app/neo/home.css:203-211` (`.fm-lane` עם flex-wrap), `components/neo-shell/home/process-map.tsx:49-53`. מדידה: `fix-pages/results-after2-home.json` (0 צמתים מוסתרים מ-1024 עד 3840) |
| 3 | #10 MAJOR | טקסט מתחת ל-12px ב-ERD ובסטודיו, כולל תוויות המפה בזום הפתיחה | OPEN, NOT RECORDED | `f555cfb3` ו-`a6a56f22` העלו כל הצהרה ב-`erd.css` וב-`studio.css` ל-12px ומעלה (סריקה סטטית שלי: 0 הצהרות מתחת ל-12px ב-27 הגיליונות של NEO). נשאר: מפת המודולים נפתחת בהתאמה אמיתית בלי רצפה (`components/neo-shell/erd/erd-workspace.tsx:853`, ההחלטה בהערה ב-`:844-849`), ותוויותיה ב-12px (`app/neo/erd.css:580`, `:742`, `:751`). בייצוא הסופי המפה נפתחת ב-49% ב-1440 (`final-run-3/sweep/shots/desk1440-day/erd-d2-erd.png`), כלומר כ-6px על המסך. `BLOCKERS.md` לא רושם |
| 3 | #11 MAJOR | טורי קריאה של 86 עד 98 תווים | CLOSED | `41ff9b15`, `7b8db044`, `b83d8382`, `6167e61e`. `app/neo/system.css:277` (`--measure: 31em`), `legal.css:31`, `:64`, `reference.css:86-87`, `best-practices.css:108-112`, `reader.css:59-62`. מדידה: `fix-pages/results-after1-legal.json` (עד 70), `fix-pages/results-after3-reader.json` (פתיח הפרק עד 69), `fix-content/final-extra-f1c.json` (64 עד 71) |
| 3 | #12 MAJOR | ה-404 מחוץ ל-`.nx-app`, בלי לילה, עם React #418 | CLOSED | `7b8db044`, `7da3441e`. `app/not-found.tsx:28-48`, `components/app-shell.tsx:102-103`. מדידה: `notfound/check-pagesmerge.txt` (16 שילובים: 404, מסגרת NEO, קרדיט ושלושת הקישורים, הערכה נשמרת), `final-run-3/g8-desk-day.log` (axe על `/neo/nope-404/`: 0). ההערה ב-`app/not-found.tsx:19-22` עדיין מייחסת את #418 ל-app-shell, אף ש-`7da3441e` תיקן אותו |
| 3 | #13 MAJOR | `--c-hair` הקר של `:root` בתוך המערכת החמה | CLOSED | `202fdc23`. `app/globals.css:1310-1318`. מדידה: `fix-shell/verify-shell.json` (desk-day-G3: ‏#e1dbd1 ביום, ‏#35302a בלילה) |
| 3 | #14 MAJOR | כל קשר ב-ERD מקווקו וצועד בלולאה | CLOSED | `ffd0f265`. `app/neo/erd.css:1778-1779` (רציף לקשר עם קרדינליות, מקווקו רק ל-unstated). מדידה: `final-run-3/g8-desk-day.log` (M13 ב-`/neo/erd/#EQUI`: 0 אינסופיות, 0 רצות אחרי 6 שניות) |
| 3 | #15 MAJOR | סולם הכותרות לא אחיד (36px בקטלוגים, 20px ב-ERD, 16px בסטודיו), וגופן התצוגה חסר בשערים | OPEN, NOT RECORDED | תוקן: קטלוגים ב-`--t-h1` (`013f0329`, `app/neo/data.css:71-76`), גופן התצוגה במרכז S/4HANA (`b189c244`, `s4/s4-view.tsx:103`), ב-PM וב-PP-PI (`6167e61e`, `workspace/workspace-header.tsx:73`), באקדמיה ובקורא (`b83d8382`). נשאר: `app/neo/erd.css:197-198` (`.ne-h1` ב-`--t-h2`, 20px) ו-`app/neo/studio.css:34` (`.nst-h1` ב-1rem), נראה ב-`final-run-3/sweep/shots/desk1440-day/studio-d2-studio.png`. השם "Architecture Studio" הוא החלטת בעלים (`b4f87193`); הגודל לא. `BLOCKERS.md` לא רושם |
| 3 | #16 MAJOR | בטלפון המסננים פרושים בגוף העמוד ולא ב-Sheet | CLOSED | `013f0329`. `components/neo-shell/data/tables-surface.tsx:447-513`, `data/transactions-surface.tsx:449-527`. מדידה: `fix-content/sheet-check.json` (dialog מודאלי, Tab נלכד), `final-run-3/g8-phone-day.log` (axe על גיליון המסננים: 0) |

## שער 4 · ממשק מסתגל

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| 4 | #1 BLOCKER | הסרגל העליון נשבר בזום 200% ו-400% | CLOSED | `202fdc23`, `f41dfc2a`, `1c8d293b`. `app/globals.css:1878` (`container: nx-top`), `:1909-1925`. מדידה: `fix-shell/verify-shell.json` (G4B1 ב-682×468 וב-320×256: 0 גלישה, 0 חפיפה בין השביל לשדה), `final-run-3/sweep-reflow682x468-day.log` (80 מסלולים, 0 דגלים) |
| 4 | #2 BLOCKER | בקורא הכותרת והדוק הדביקים מכסים את רוב חלון הקריאה | CLOSED | `b83d8382`. `components/neo-shell/reader/env.ts:72-90` (`stickyBars`), `reader/neo-reader.tsx:406-420`, `app/neo/reader.css:158`; הבדיקה `test/pages-reader-sticky.test.ts`. מדידה: `fix-pages/results-after1-readerCover.json` (כיסוי 13%, 8%, 23%, 15%) |
| 4 | #3 BLOCKER | לוח הסטודיו קורס ל-19px עד 900px | CLOSED | כמו שער 3 #4 (`a673f893`, `app/neo/studio.css:269-276`) |
| 4 | #4 BLOCKER | החיפוש בזום 400% משאיר לתוצאות 12px, והרייל נשאר מעל הדף | CLOSED | `40035346`. `components/neo-shell/search/shell-client.tsx:88-103`, `:215` (חלון צר מקבל גיליון), `search/command-surface.tsx:310-311`. מדידה: `fix-shell/verify-shell.json` (G4B4: dialog מודאלי ברוחב 320, הסמן בתצוגה, המיקוד חוזר, הרייל לא מכסה) |
| 4 | #5 BLOCKER | מ-2200px השם בשורת הקטלוג נדחס ל-23 עד 50px | CLOSED | `013f0329`. `app/neo/data.css:434-462`, `:569-577`. מדידה: `fix-content/final-extra-f1b.json` (xl: השם הצר ביותר 1010px ב-2560 ו-1042px ב-3840, 0 חציות) |
| 4 | #6 MAJOR | החלפת הגופן מזיזה את הקטלוג (CLS 0.29) | CLOSED | `41ff9b15`, `31d39b4d`. `app/neo/system.css:29-80` (פני fallback מכוילות), `app/fonts/plex.ts:21-22`. מדידה: `fix-content/cls-after-fallback3.json` (0.0027 בטרנזקציות ב-1440), `final-run/vitals.json` (CLS 0 בכל הנתיבים) |
| 4 | #7 MAJOR | מפת התהליכים לא נכנסת בשום רוחב מחשב | CLOSED | כמו שער 3 #9 (`137a05e1`) |
| 4 | #8 MAJOR | כלל ה-44px במצביע גס מבוטל בכללים מאוחרים | OPEN, RECORDED | `41ff9b15`, `013f0329`, `f555cfb3`, `fab76fa6`, `a6a56f22`, `92a6af75`: `app/neo/ui.css:249-275`, `app/neo/studio.css:290-292`. נשארו צמתי התרשימים: `final-run-3/g8-phone-day.log` (M8: 16 `button.nst-node` של 83×24 ב-`/neo/studio/`, ‏10 צמתי SVG של 121×29 ב-`/neo/object/MARA/`), `g8-ipad-day.log` (MARA 149×36). `BLOCKERS.md` §5, שורת שער 8: «M8: צומתי הסטודיו (24px בטלפון) וצומתי ה־SVG במפת הקשרים של רשומה (29px)», «גאומטריית תרשים; הגדלה משנה את מיקום הקווים» |
| 4 | #9 MAJOR | רצועת ההצצה של הרייל מוצגת ולוכדת נגיעות בטלפון | CLOSED | `202fdc23`. `app/globals.css:1785-1786`. מדידה: `fix-shell/verify-shell.json` (phone-day-railedge: display none), `final-run-3/g8-phone-day.log` (M8: אין מטרה צרה חוץ מצמתי תרשים) |
| 4 | #10 MAJOR | טקסט HTML של 10px ב-ERD, כותרות של 10.2 עד 11.8px בסטודיו, תוויות מפה של 6.6 עד 10.7px | OPEN, NOT RECORDED | כמו שער 3 #10: ההצהרות תוקנו (`f555cfb3`, `a6a56f22`), ותוויות מפת המודולים נשארות מתחת ל-12px בהתאמה האמיתית (49% ב-1440, `final-run-3/sweep/shots/desk1440-day/erd-d2-erd.png`) |

## שער 5 · חוויית משתמש ארגונית

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| 5 | #1 BLOCKER | החיפוש, הפעולה הראשית בבית, מכיר 162 מתוך 1,818 טרנזקציות | CLOSED | `40035346`, `6b8584c0`. `components/neo-shell/search/command-index.ts:118-144`, `:376-377`, `app/neo/search-tx.json/route.ts`. ספירה סטטית ב-`out/neo/search-tx.json`: 1,847 שורות, ואף אחד מ-1,818 עמודי הטרנזקציה לא חסר. מדידה: `fix-shell/verify-search.json` (ME21N ו-MB01 נמצאים), `m9/lazy-tx-check.json` |
| 5 | #2 BLOCKER | תוצאת "פרק" בחיפוש מובילה ל-404 | CLOSED | `40035346`. `components/neo-shell/search/command-index.ts:271-300` (הפרקים מהרישום שהקורא נבנה ממנו); הבדיקה `test/search-index-routes.test.ts`. מדידה: `fix-shell/verify-search.json` (B1: `/neo/read/book9/?c=1`, בלי notFound) |
| 5 | #3 BLOCKER | 404 בכתובת `/neo/` בלי פוטר, קרדיט ולילה | CLOSED | כמו שער 3 #12 (`7b8db044`, `7da3441e`, `notfound/check-pagesmerge.txt`) |
| 5 | #4 MAJOR | "להמשיך מאיפה שהפסקת" פותח את תחילת הפרק | CLOSED | `137a05e1`. `components/neo-shell/home/home-continue.tsx:29`, `:38-42` (`neoResumeHref` עם תת-הפרק). מדידה: `fix-pages/results-after2-home.json` (הקישור `?s=3.6`, התווית "פרק 3 · 3.6") |
| 5 | #5 MAJOR | קודים-קישורים נושאים את קו הבחירה ומתרוממים | CLOSED | `b189c244`, `6167e61e`. `app/neo/domain.css:299-309`, `app/neo/object.css:1286-1299`, `app/neo/s4.css:247-253`. מדידה: `fix-pages/results-focus.json`, `fix-pages/results-after1-s4.json` |
| 5 | #6 MAJOR | שלוש שפות בקרה במרכז הידע (לשונית במילוי, מסננים כלשוניות) | CLOSED | `6167e61e`. `app/neo/learn.css:1198-1206`, `components/neo-shell/learn/knowledge-surface.tsx:306-312` (לשוניות בקו תחתון), `:354`, `:372` (`nu-filter`). code only (צילום `fix-content/shots/knowledge-desktop-after.png`) |
| 5 | #7 MAJOR | "מרכזי עבודה" לנושאי העבודה: השם העברי של Work Center, אובייקט SAP | OPEN, NOT RECORDED | `b189c244` ו-`6167e61e` שינו את העמודים ל"מדריכי עבודה": `app/neo/centers/page.tsx:13`, `centers/centers-view.tsx:62-66`, `learn/knowledge-surface.tsx:10-12`; מדידה `fix-pages/results-after1-centers.json`. נשאר בחיפוש: `components/neo-shell/search/build.ts:45` (`{ k: "center", he: "מרכז עבודה" }`, תווית הסוג על כל תוצאה של 11 המדריכים) ו-`search/command-surface.tsx:52` (`center: "מרכזי עבודה"` במשפט המצב הריק). המחרוזת נמצאת בחבילת הייצוא (`out/_next/static/chunks/13_kr4xkj5mmk.js`). `BLOCKERS.md` לא רושם |
| 5 | #8 MAJOR | מפת התהליכים לא נקראת כתהליך: חתוכה במחשב, 2.8 מסכים בטלפון, פער אחרי פער | CLOSED | `137a05e1`. כמו שער 3 #9, ועוד פער שקט עם מילים פעם אחת במקרא (`process-map.tsx:49-53`, `:90-92`). מדידה: `fix-pages/results-after2-home.json` (mapH 1015 בטלפון, היה 2,326) |

## שער 6 · חוויית החיפוש

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| 6 | #1 BLOCKER | כל 105 תוצאות "פרק" מובילות ל-404 | CLOSED | כמו שער 5 #2 (`40035346`, `command-index.ts:271-300`) |
| 6 | #2 BLOCKER | סגירת המשטח משאירה מיקוד על שדה מוסתר | CLOSED | `40035346`. `components/neo-shell/search/shell-client.tsx:556-577`. מדידה: `fix-shell/verify-search.json` (B2: המיקוד על `nh-find` או `nx-cmdbar`, לא בתוך aria-hidden, ביום ובלילה) |
| 6 | #3 BLOCKER | סמן המקלדת יוצא מהתצוגה | CLOSED | `40035346`. `shell-client.tsx:757-775` (מדידה ביחס לתיבה שגוללת). מדידה: `fix-shell/verify-search.json` (B3: 21 אפשרויות, 0 מחוץ לתצוגה) |
| 6 | #4 BLOCKER | Tab עובר על הדף שמתחת ללוח לפני המסננים | CLOSED | `40035346`. `shell-client.tsx:1177` (`inert` על `.nx-main` בזמן חיפוש). מדידה: `fix-shell/verify-search.json` (B4: main-inert, surface-after-field) |
| 6 | #5 BLOCKER | עמעום הרייל בשתי שכבות שקיפות (1.31:1) | CLOSED | `40035346`, `86a00f73`. `app/neo/rail.css:192-203`. מדידה: `fix-shell/verify-search.json` (B5: minOpacity 1, ניגודיות מינימלית 5.62:1 ביום ו-6.56:1 בלילה) |
| 6 | #6 BLOCKER | אין הכרזה בטלפון, הגיליון אינו dialog, מונה ה-ERD לא מוכרז | CLOSED | `40035346`, `f555cfb3`. `search/command-surface.tsx:349` (status בתוך המשטח), `:310-311`, `shell-client.tsx:938`, `:947`, `:1170` (inert מאחור), `erd/erd-inspector.tsx:64-66`. מדידה: `fix-shell/verify-shell.json` (phone-day-sheet: dialog, modal, status), `final-run-3/g8-phone-day.log` (axe על החיפוש בטלפון: 0) |
| 6 | #7 BLOCKER | listbox לא תקין: `ul`, ‏`h3` וכפתורים בתוכו, כפתור בתוך option | CLOSED | `40035346`. `search/command-surface.tsx:85-100` (option בלי כפתור), `:489-540` (קבוצות עם aria-labelledby, "עוד" כ-option). מדידה: `final-run-3/g8-desk-day.log` ו-`g8-desk-night.log` (axe על המשטח ריק, עם AFKO ועם zzqq: 0) |
| 6 | #8 BLOCKER | מזהה ה-SAP בשורת התוצאה נחתך או נעלם ב-1280 עד 1440 | CLOSED | `40035346`. `app/neo/search.css:308`, `:496-504`. מדידה: `fix-shell/verify-shell.json` (B8 ב-1280, ‏1366, ‏1440 ו-1920: cut 0, zero 0) |
| 6 | #9 MAJOR | האינדקס מכסה חלק קטן מהעמודים | CLOSED | כמו שער 5 #1, ועוד BAPI, ‏IDoc, אובייקטים, הרחבות, ספרים ומרכזים (`command-index.ts`, `40035346`) |
| 6 | #10 MAJOR | חיפוש בעברית לא מגיע לאובייקטים המרכזיים | CLOSED | `40035346`, `013f0329`. `components/neo-shell/search/hebrew.ts:3-37` (פקודה/הזמנה, אחזקה/תחזוקה, סיומות), `command-index.ts:118-144` (השורה העברית מהרישום), `components/neo-shell/data/catalog-match.ts`. code only; הבדיקות `test/search-query.test.ts`, `test/content-catalog-match.test.ts` |
| 6 | #11 MAJOR | שורות פונקציה משם הבלופרינט הגולמי, בלי מעמד, עם כפילויות | CLOSED | `40035346`. `command-index.ts:156-172` (שורה אחת לכל עמוד BAPI ו-IDoc, בשם הנקי ובמעמד העמוד), `:84-100` (`cleanFunc`). code only |
| 6 | #12 MAJOR | תוצאות IDoc מסומנות "מודול פונקציה" | CLOSED | `40035346`. `search/build.ts:227-231`. code only |
| 6 | #13 MAJOR | תקלה וספר פותחים את רשימת המשפחה | CLOSED | `40035346`. `components/neo-shell/nav-data.ts:424-426`, `search/command-index.ts:253-269`; הבדיקה `test/search-index-routes.test.ts`. code only |
| 6 | #14 MAJOR | המצב הריק בלי פעולה, ואומר שכל האינדקס נסרק | CLOSED | `40035346`. `search/command-surface.tsx:467-486`. מדידה: `fix-shell/verify-search.json` (M14: משפט ההיקף ו"חיפוש «ZZ99N» בקטלוג הטרנזקציות") |
| 6 | #15 MAJOR | מסנן פעיל נעלם כשאין תוצאות | CLOSED | `40035346`. `search/command-surface.tsx:369-371`, `:481`. מדידה: `fix-shell/verify-search.json` (M15: השבב הלחוץ נשאר, "ניקוי המסנן") |
| 6 | #16 MAJOR | הקשות מיד אחרי הפתיחה אובדות בטיימר של 200ms | CLOSED | `40035346`. `shell-client.tsx:547-554`. מדידה: `fix-shell/verify-search.json` (M16: "AFKO" מלא בהקלדה מיידית) |

## שער 7 · ERD וסטודיו הארכיטקטורה

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| 7 | #1 BLOCKER | הקרדיט חתוך ב-ERD בכל רוחב מחשב מעל 1100px | CLOSED | `a673f893`. `app/neo/erd.css:1781-1790`. מדידה: `gate-fix-erd/gate7-fix-check.json` (credit גלוי ב-1280, ‏1440, ‏1920), `final-run-3/sweep/shots/desk1440-day/erd-d2-erd.png` |
| 7 | #2 BLOCKER | 65 טבלאות HR ו-BW מסווגות "נתוני תנועה" | CLOSED | `a673f893`. `components/neo-shell/erd/erd-catalog.ts:418-430`. ספירה סטטית במטען של `out/neo/erd/index.html`: 65 טבלאות HR ו-BW עם האזור של המאגר (Personnel Admin, ‏HR Config, ‏InfoProviders ועוד); צילום `gate-fix-erd/erd-hr.png` |
| 7 | #3 BLOCKER | הסטודיו מצייר VEKP, ‏VEPO וקשר שאינם במאגר | CLOSED | `a673f893`. `lib/studio-graph.ts:77-80`. מדידה: `gate-fix-erd/gate7-fix-check.json` (ppiLayer "68 מתוך 68", ppiHasVEKP false) |
| 7 | #4 BLOCKER | מעמד S/4 בסטודיו בצבע בלבד, מתחת ל-3:1 | CLOSED | כמו שער 3 #7 (`a673f893`); צילום `gate-fix-erd/studio-1440-s4.png` |
| 7 | #5 BLOCKER | חלון "קיצורי מקלדת ומקרא" לא מקבל מיקוד ולא לוכד | CLOSED | `a673f893`. `components/neo-shell/erd/erd-workspace.tsx:3075-3105`. מדידה: `gate-fix-erd/gate7-fix-check.json` (legendDialog: המיקוד נכנס, Tab נשאר, המיקוד חוזר), `final-run-3/g8-desk-day.log` (axe על המקרא: 0) |
| 7 | #6 BLOCKER | בטלפון אי אפשר להחליף מודול או תצוגה בסטודיו | CLOSED | כמו שער 3 #4 |
| 7 | #7 MAJOR | מספרי הקווים במפה לא סופרים קשרים בין המודולים; סף 4 לא מוצהר | CLOSED | `a673f893`. `erd-workspace.tsx:2393-2396`: ההסבר אומר מה נספר ושמוצגים קווים של 4 ומעלה, אחת משתי האפשרויות שהממצא הציע; הספירה עצמה לא השתנתה (`erd-catalog.ts:526-557`). ההערה ב-`erd-catalog.ts:554-555` ("more than a single relation") לא תואמת לסף 4. code only |
| 7 | #8 MAJOR | כל הקווים מקווקווים, בניגוד למקרא | CLOSED | `ffd0f265`. `app/neo/erd.css:1778-1779`. code only (לולאות: #13) |
| 7 | #9 MAJOR | מודול נפתח בזום שבו הטקסט לא קריא (37%) | CLOSED | `a673f893`. `erd-workspace.tsx:88-90` (`ENTRY_MIN_K = 1.05`), `:850-863`. מדידה: `gate-fix-erd/gate7-fix-check.json` (כניסה ל-PM ב-105% ב-1280, ‏1440, ‏1920). מפת המודולים נשארת בהתאמה אמיתית: שער 3 #10 |
| 7 | #10 MAJOR | במצב הצגה ב-1080p רוב התוויות מתחת ל-16px | CLOSED | `a673f893`. `erd-workspace.tsx:83-86` (`PRESENT_TABLE_MIN_K = 1.25`), `:802`. code only |
| 7 | #11 MAJOR | תג S/4 בצומת מסתיר את תווית האזור | CLOSED | `f555cfb3`. `erd-workspace.tsx:2805-2818` (התג על הקצה העליון). code only |
| 7 | #12 MAJOR | תוכן של 10px בחלונית ובכרטיס | CLOSED | `f555cfb3`, `a6a56f22`. `app/neo/erd.css` בחלונית ובכרטיס ב-`--t-micro` וב-`--t-xs` (למשל `:1117`, `:1223`, `:1233`, `:1240`, `:1256`; סריקה סטטית: 0 הצהרות מתחת ל-12px). code only |
| 7 | #13 MAJOR | לולאות אינסופיות: הצעידה והנקודות הנעות | CLOSED | `ffd0f265`, `a673f893`, `fab76fa6`. `app/neo/erd.css:1778`, `:1795` (הדופק פעמיים). מדידה: `final-run-3/g8-desk-day.log` (M13: 0 אינסופיות, 0 רצות אחרי 6 שניות) |
| 7 | #14 MAJOR | צומת הסטודיו בלי סימון סוג והכרעה; המקרא מתאר צבעים שלא מצוירים | CLOSED | `a673f893`. `studio/studio-view.tsx:504-507`, `:559-570`, `app/neo/studio.css:240-248`. מדידה: `final-run-3/sweep/shots/desk1440-day/studio-d2-studio.png` (סימון ותיאור בכל צומת) |
| 7 | #15 MAJOR | כל קווי הסטודיו באדום המותג בלי בחירה | CLOSED | `a673f893`. `studio/studio-view.tsx:469-476`, `app/neo/studio.css:141-143`. מדידה: `gate-fix-erd/gate7-fix-check.json` (studioEdgesNoSelection: ‏rgb(101, 94, 84) ×14) |

## שער 8 · נגישות

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| 8 | B1 BLOCKER | צבעי מצבי הבחינה ביום מתחת ל-4.5:1 | CLOSED | `fab76fa6`. `app/neo/cert.css:17-18`, `:96`, `:128-135`. מדידה: `final-run-3/g8-desk-day.log`, `g8-desk-night.log`, `g8-phone-day.log`, `g8-phone-night.log` (axe על הבחינה בזמן ריצה ואחרי תשובה שגויה: 0) |
| 8 | B2 BLOCKER | אנגלית בדף `lang="he"` בלי `lang="en"` | CLOSED | `fab76fa6`, `db03d1d3`, `3989d65e`. `components/neo-shell/lang.ts:5` (`enLang`, ב-32 קבצים). מדידה: `final-run-2/static-sweep.json` (19:51, על הייצוא של 19:50): מה שנשאר בלי lang הוא שמות מותג, מונחים טכניים ו-slugs, החריגים של 3.1.2. קורא מסך אמיתי: `MANUAL_TEST_REQUIRED` ב-`BLOCKERS.md` §4 |
| 8 | B3 BLOCKER | גיליון הניווט בטלפון הוא dialog בלי מיקוד, Escape ולכידה | CLOSED | `fab76fa6`. `components/neo-shell/mobile-nav.tsx:63`, `:67`. מדידה: `final-run-3/g8-phone-day.log` ו-`g8-ipad-day.log` (M11: המיקוד נכנס ונשאר בפנים, Escape ו-X מחזירים ל"ניווט") |
| 8 | B4 BLOCKER | כרטיס הריחוף ברייל לא נגיש לסמן ולא נסגר ב-Escape | CLOSED | `fab76fa6`. `app/globals.css:1818-1830`, `components/neo-shell/search/shell-client.tsx:812`, `:1268-1270`. מדידה: `final-run-3/g8-desk-day.log` (M9: נשאר פתוח מעל הכרטיס, Escape סוגר) |
| 8 | B5 BLOCKER | שכבות הסגירה של הדוק והקורא בסדר ה-Tab, עם טבעת מחוץ למסך | CLOSED | `fab76fa6`. `dock/neo-dock.tsx:116`, `reader/reader-panel.tsx:141`. מדידה: `final-run-3/g8-desk-day.log` (M10: Shift+Tab לא נוחת על שכבה) |
| 8 | B6 BLOCKER | צמתים ממוקדים בתוך `svg role="img"` ב-ERD | CLOSED | `fab76fa6`. `erd/erd-workspace.tsx:2544-2547`. מדידה: `final-run-3/g8-desk-day.log` (axe על `/neo/erd/#EQUI`: 0) |
| 8 | M1 MAJOR | פקד ממוקד עלול לשבת מתחת לשכבה דביקה | CLOSED | `fab76fa6`, `db03d1d3`, `3989d65e`. `workspace/section-nav.css:338-341`, `app/neo/reader.css:1602-1604`, `cert.css:222`, `chat.css:1794`, `dock/neo-dock.tsx:76-86`, `app/globals.css:1518`, `workspace/section-nav.tsx:386-392`. מדידה: `final-run-3/g8-desk-day.log` (M5: 0 עצירות מוסתרות ב-6 מתוך 7 מסכים, ועצירה אחת מתוך 160 ברשומת `BAPI_ALM_ORDER_MAINTAIN`, השבב "02" מתחת ל-`nav.nxs`), `g8-phone-day.log` (0 בכל 8). `3989d65e` מתקן את העצירה הזו בקוד אחרי הבנייה הנמדדת, והתיקון האחרון עוד לא נבנה ולא נמדד |
| 8 | M2 MAJOR | פוטר, תוכן עניינים משפטי, שבבי חיפוש ומתג המראה קטנים מ-44px במצביע גס | OPEN, RECORDED | כמו שער 4 #8: הפקדים עצמם ב-44px (`app/neo/ui.css:249-275`), וצמתי התרשים נשארו. `BLOCKERS.md` §5: «M8: צומתי הסטודיו (24px בטלפון) וצומתי ה־SVG במפת הקשרים של רשומה (29px)» (M8 הוא מזהה המדידה של שער 8 לממצא הזה) |
| 8 | M3 MAJOR | חלונית הקורא לא מחזירה מיקוד לפותח | CLOSED | `fab76fa6`. `reader/reader-panel.tsx:72`, `:98-99`. מדידה: `final-run-3/g8-desk-day.log` (M10: Escape מחזיר ל"תוכן העניינים") |
| 8 | M4 MAJOR | כותרת הבחינה חולקת מחלקה עם פס התוצאה ונחתכת | CLOSED | `fab76fa6`. `learn/cert-exam.tsx:267`, `app/neo/cert.css:69-72`. מדידה: `final-run-3/g8-desk-day.log` (M4: clipped false גם בגודל xl), `g8-desk-day-exam-head-xl.png` |
| 8 | M5 MAJOR | טענות בהצהרת הנגישות שנסתרות או רחבות ממה שנבדק | OPEN, NOT RECORDED | כמו שער 1 #8 (`legal-content.ts:30-38`, `:193`, `:195`, `:205`, `:210` בלי שינוי) |
| 8 | M6 MAJOR | הריצה הסופית לא מכסה את סעיף 3 של הבריף ולא נעשתה על בנייה אחת | OPEN, NOT RECORDED | `final-run-3/` רצה על הייצוא של `92a6af75`, עם git status נקי בתחילתה (`summary.txt`, `series.zsh`), ומכסה axe ב-1363, ב-390 וב-UA של iPhone, יום ולילה, 36 מסכים ו-404, ‏19 מצבים פתוחים, M4, ‏M5, ‏M8 עד M13, ריווח טקסט, 11 פרופילי sweep כולל Reflow ב-682×468 וב-320×256, מקלדת בשלושה פרופילים, ניווט, ודגימת ניגודיות ב-39 מסכים (`a11y-light.log`, `a11y-dark.log`: 0 כשלי ניגודיות, 0 מיקוד מוסתר, מטרה אחת מתחת ל-24px ב-`/neo/academy/`, הקישור שבתוך משפט). הכיסוי כמעט שלם, אבל: HEAD כבר `3989d65e`, עם קוד ב-9 קבצים שהשתנה אחרי הבנייה הנמדדת; ועוד תוצאות פתוחות מהסדרה. `sweep-reflow320x256-day.log` מסמן גלישת קנבס של 5px ב-`/neo/domain/pppi-batch-management/` ושל 6px ב-`/neo/fiori-apps/manage-material-coverage-f0251a/`. ‏`kb-1363-n80.json` ו-`kb-phone.json` מוצאים 7 עצירות בלי טבעת בבית (שער 10 M2). ‏`nav-desk.log` ו-`nav-phone.log`: בדיקת ה-offline (D) נכשלה בשניהם, `/neo/offline/?from=%2Fneo%2Ftables%2FMARA%2F` לא הציג לא את מסגרת NEO ולא את טקסט ה-offline. ‏`ts-desk-day.log` ו-`ts-phone-night.log`: 0 גלישה, ‏346 ו-309 רכיבים נחתכים בריווח טקסט. `BLOCKERS.md` לא רושם |

הערה לשער 8: הסדרה הסופית מצאה רגרסיה מחוץ לממצאי השער, שבע דלתות הבית בלי טבעת מיקוד. היא רשומה בשורה של שער 10 M2, כי התיקון שם גרם לה.

## שער 9 · ביצועים

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| 9 | #1 MAJOR | 8 קובצי גופן (140 KB) נטענים מראש לפני 9 גיליונות ומאחרים את הצביעה בטלפון | OPEN, RECORDED | `31d39b4d` הוריד את Frank מהטעינה המוקדמת: 6 קבצים בכל עמוד (ספירה סטטית ב-`out/neo/index.html`, ‏`tables/`, ‏`erd/`, ‏`transactions/IP30H/`, ‏`read/book2/`). נשאר: 6 קובצי Plex לפני ה-CSS (P2 לא בוצע), ו-LCP בטלפון בין -0.4% ל-+10.8% מול הייצור (`final-run/vitals.json` מול `baseline/vitals.json`). המדידה במארח שדוחס תלויה ב-Preview. `BLOCKERS.md` §6: «חמש משפחות גופנים באחסון עצמי; בביקור ראשון זו העלות העיקרית החדשה (`DEPENDENCIES.md`, `QA-REPORT.md`)», ו-§1 (ה-Preview) |
| 9 | #2 MAJOR | Frank Ruhl נטען מראש ב-2,694 עמודים שלא מציירים אותו | CLOSED | `31d39b4d`. `app/fonts/frank.ts:10-35` (`preload: false`). ספירה סטטית: אף אחד מששת קובצי ה-preload אינו Frank בחמשת הנתיבים שלמעלה; `final-run/vitals.json` |

## שער 10 · Impeccable

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| 10 | M1 MAJOR | רצועות מדדים (מספר גדול מעל תווית) במסכי עבודה וברשומות | OPEN, NOT RECORDED | `a6a56f22`: הקטלוג, רשומת הטבלה, מרכז S/4HANA והקוקפיט והלמידה עברו לשורת מונים (`app/neo/data.css:1961-1983`, `s4.css:480-489`, `learn.css:1295`). נשאר: עמוד האובייקט, ובו ACDOCA שהממצא נוקב בו, עדיין לוח של מספרים גדולים מעל תוויות (`app/neo/object.css:214-229`, `:1538`; `object/object-view.tsx:238-245`; ‏186 עמודים; `a6a56f22` לא נגע ב-`object.css`). `BLOCKERS.md` לא רושם |
| 10 | M2 MAJOR | הבית נקרא כלוח מחוונים; שורת הפקודה לא נראית כבית | OPEN, NOT RECORDED | `a6a56f22`, `3989d65e`: החיפוש ברוחב העמודה עם שלוש דוגמאות (`app/neo/page.tsx:158-166`), הדלתות כרשימה צפופה (`app/neo/home.css:113-136`); בצילום של הייצוא הסופי כותרת המפה והמקרא במסך הראשון ב-1440 (`final-run-3/sweep/shots/desk1440-day/(root)-d1-neo.png`). אבל התיקון שבר את המיקוד: `app/neo/home.css:129-134` קובע `box-shadow: none` על `.nx-app .nh-doors .nh-door` (ספציפיות 0,3,0), וזה גובר על `.nu-card:focus-visible` (`app/neo/ui.css:193-198`, ‏0,2,0). `final-run-3/kb-1363-n80.json` ו-`kb-phone.json`: ב-`/neo/` ‏7 עצירות בלי טבעת, שבע הדלתות, במחשב ובטלפון (WCAG 2.4.7). בעץ העבודה יש תיקון שלא נשמר (`app/neo/home.css`, כלל `:focus-visible` לדלת), לא ב-HEAD, לא בנוי ולא נמדד. `BLOCKERS.md` לא רושם |
| 10 | M3 MAJOR | רצפת 12px נשברת בתוויות ה-ERD והסטודיו | OPEN, NOT RECORDED | כמו שער 3 #10: כל ההצהרות ב-12px ומעלה (`a6a56f22`; `app/neo/studio.css:166`), ומפת המודולים נפתחת ב-49% בלי רצפה ביחס לזום (`erd-workspace.tsx:853`) |
| 10 | M4 MAJOR (סיכון) | `:root` הישן, כולל ערכים סגולים, חי מתחת למערכת, ושכבה מחוץ ל-`.nx-app` תקבל אותו | CLOSED | `a6a56f22`. `app/globals.css:1217`, `:1219`, `:1227`, `:2084`, `:2105` (ערכי 2026 במקום הסגול, הוורוד והשזיף). אין portal ב-`components/neo-shell` ואין Radix ב-NEO, כך ששום שכבה של NEO לא מרונדרת מחוץ ל-`.nx-app`. סריקת הסגול הסטטית כוללת את `app/globals.css` (`TOKENS.md:7`: 282 קבצים, 2 פגיעות מאושרות). code only |
| 10 | M5 MAJOR (מותנה) | הזזה והגדלה ב-hover במחלקות `nx-*` של `globals.css` | CLOSED | `a6a56f22`, `beb3a89a`. ה-transforms הוסרו במקור (`git show a6a56f22 -- app/globals.css`), ‏`app/globals.css:1493-1495`, `app/neo/rail.css:132-133`, `:214`. code only |
| 10 | M6 MAJOR (מותנה) | בחירת גופן וגודל נקראת רק אחרי mount, והדף קופץ | CLOSED | `a6a56f22`. `lib/theme-boot.ts:13-31`, `app/neo/dock.css:181-188`. code only |

## סקירת התוכן · `content-review-copy-sap.md` (התיקונים ב-`sap-correctness.md`)

| שער | מזהה | הממצא בשורה אחת | מצב | ראיה |
|---|---|---|---|---|
| תוכן | 1 BLOCKER | הסטודיו גזר את מעמד S/4 מעמודת הטבלה החלופית | CLOSED | `3b9e5583`. `lib/studio-graph.ts:56-60` (`s4ClassOf`). הבדיקה `test/sap-correctness.test.ts` (נכשלה על הקוד הישן); שער 1 אימת בעמודים (PM ‏43, 8, 5; PP-PI ‏51, 5, 1, 11) |
| תוכן | 2 BLOCKER | שבב "הוחלף" בקטלוג הטבלאות סינן לפי העמודה החלופית (56 שורות) | CLOSED | `3b9e5583`. `components/neo-shell/data/table-caps.ts:23-24`. הבדיקה `test/sap-correctness.test.ts` |
| תוכן | 3 BLOCKER | טרנזקציות עוקבות הפוכות או שגויות, באמון "מאומת" | CLOSED | `3b9e5583`. `components/neo-shell/data/tx-detail.ts:196-215` (`SELF_OUT`; קשר הפוך נשאר partial). הנתונים עצמם ב-`BLOCKERS.md` §3: «`data/tx-intel.ts`: ערכי `obsolete` שגויים והפניות עצמיות ברשומות שנמנו בדוח.» |
| תוכן | 4 BLOCKER | ציון PI/PO של 45 שהוזן ביד | CLOSED | `3b9e5583`. `lib/s4-readiness.ts:47-48`, `:70-84`. ספירה סטטית ב-`out/neo/s4-readiness/index.html`: "לא מתועד במאגר", ואין "PI/PO · 45" |
| תוכן | 5 BLOCKER | MATDOC ו-ACDOCA תחת "נשאר" | CLOSED | `3b9e5583`. `lib/evidence/s4-status.ts:101-121`. הבדיקה `test/sap-correctness.test.ts` |
| תוכן | 6 MAJOR | מונה "BAPI ו-FM" ברייל 147 מול 142 בקטלוג | CLOSED | `1fe5a3a5`. `components/neo-shell/nav-data.ts:179` (`bapiFnCount()`). שער 2 מדד 142 מול 142. `sap-correctness.md` §3 רשם "לא טופל"; ב-HEAD זה מתוקן |
| תוכן | 7 MAJOR | תיאור הציון בכיסוי התיעוד לא תואם לחישוב | CLOSED | `3b9e5583`. `components/neo-shell/s4/s4-view.tsx:383` |
| תוכן | 8 MAJOR | רצועות "S/4 Ready", "Cloud Ready" ועוד על ציון כיסוי | CLOSED | `3b9e5583`. אין רצועה ב-`s4-view.tsx`; ספירה סטטית: 0 מופעים ב-`out/neo/s4-readiness/index.html`. `lib/s4-readiness.ts:12`, `:52-56` עוד מחשב band לעמוד הישן `components/s4-readiness.tsx`, ו-`/s4-readiness/` מופנה ל-NEO (`vercel.json`) |
| תוכן | 9 MAJOR | "ללא שינוי ב-S/4HANA" חזק מהמקור | CLOSED | `3b9e5583`. `lib/evidence/types.ts:129` ("נשמר ב-S/4HANA") |
| תוכן | 10 MAJOR | הקיבוץ ממזג משמעויות (deprecated כ"הוסר" ועוד) | CLOSED | `3b9e5583`. `lib/evidence/types.ts:192` (`S4_STATUS_READING`) |
| תוכן | 11 MAJOR | אותו מפתח נקרא אחרת ב-ERD ובעמוד הרשומה | CLOSED | `3b9e5583`. `components/neo-shell/erd/erd-workspace.tsx:200-208` (`s4Word` מהמילון) |
| תוכן | 12 MAJOR | הערך Deprecated מחזיק שתי עובדות (WM אל EWM, ‏Foreign Trade) | OPEN, RECORDED | `3b9e5583` מציג "הוסר או לא אסטרטגי" (`components/neo-shell/s4/s4-data.ts:137-140`); הנתון ב-`data/ecc-s4.ts:22`, `:127` לא פוצל. `BLOCKERS.md` §3: «`data/ecc-s4.ts`: הערך Deprecated מחזיק שתי עובדות (WM אל EWM: לא אסטרטגי; Foreign Trade: הוסר). עד הפיצול התצוגה אומרת "הוסר או לא אסטרטגי".» |
| תוכן | 13 MAJOR | "היישום העוקב ב-Fiori Launchpad" ב-workspace-build | CLOSED | `1fe5a3a5`. `components/neo-shell/workspace/workspace-build.tsx:44` |
| תוכן | 14 MAJOR | "הטרנזקציות המוחלפות" ב-fiori-data | CLOSED | `3b9e5583`. `components/neo-shell/reference/fiori-data.ts:169` |
| תוכן | 15 MAJOR | "יישום Fiori עוקב" על כל טרנזקציה עם שדה fiori | CLOSED | `1fe5a3a5`, `3b9e5583`. `components/neo-shell/data/tx-detail-view.tsx:265`, `data/transactions-surface.tsx:179`, `:272`, `:478` |
| תוכן | 16 MAJOR | שתי שורות SAP ב-workspace-s4 בנוסח שנדחה | CLOSED | `1fe5a3a5`. `components/neo-shell/workspace/workspace-s4.tsx:57`, `:108-109` |
| תוכן | 17 MAJOR | BOARD-SPEC ממזג רמות אימות ומילות מעמד | CLOSED | `98bf289a`. `docs/redesign-2026-09/BOARD-SPEC.md:44` |

## פתוח ולא מתועד

עשר שורות, שבע שאריות שונות. לכל אחת: מה שחסר, והתיקון או השורה שצריך להוסיף ל-`BLOCKERS.md`.

1. **שער 1 #8 ושער 8 M5 · הצהרת הנגישות.** למלא את `A11Y_RUN` ב-`components/neo-shell/legal/legal-content.ts:30-38` מהריצה הסופית (תאריך, ה-SHA שממנו נבנה הייצוא, רשימת המסכים, ספירת axe לפי פרופיל, 0 הפרות), למחוק את מגבלת סימוני הפרקים ב-`:210` ואת "ממצא אחד" ב-`:35`, לעדכן את `:193` (הדפים הישנים מופנים ל-NEO), `:195` (יש עכשיו Reflow ב-682×468 וב-320×256) ו-`:205` (לנסח לפי מה שנמדד), ולהוסיף את המגבלות הפתוחות (צמתי תרשים מתחת ל-44px). אם זה ממתין לסוף הסדרה: שורה ב-`BLOCKERS.md` §5, "שער 8 · M5: `A11Y_RUN` עדיין של `6ba22207` (28.9), ממתין ל-final-run-3 ולבנייה מ-HEAD".
2. **שער 3 #10, שער 4 #10, שער 10 M3 · תוויות מפת המודולים ב-ERD.** רצפה לתוויות המפה ביחס לזום, או הסתרת `.ne-mod-en`, `.ne-mod-l` ו-`.ne-edge-t` כשהזום מתחת ל-1 (`app/neo/erd.css:580`, `:742`, `:751`), או רצפה להתאמה של המפה (`components/neo-shell/erd/erd-workspace.tsx:853`). אם ההתאמה האמיתית היא החלטה: שורה ב-`BLOCKERS.md` §5, "שער 10 · M3 (וגם 3 #10, 4 #10): מפת המודולים ב-ERD נפתחת ב-49% ב-1440 ותוויותיה כ-6px; הרשימה בחלונית נותנת אותו מידע בגודל מלא, והזום זמין".
3. **שער 3 #15 · כותרות ה-ERD והסטודיו.** `.ne-h1 { font-size: var(--t-h1) }` ב-`app/neo/erd.css:197-198` ו-`.nst-h1 { font-size: var(--t-h1) }` ב-`app/neo/studio.css:34`, או חריג מתועד לכלי הקנבס ב-`TOKENS.md` וב-`BLOCKERS.md` §5.
4. **שער 5 #7 · "מרכז עבודה" בחיפוש.** `he: "מדריך עבודה"` ב-`components/neo-shell/search/build.ts:45` ו-`center: "מדריכי עבודה"` ב-`components/neo-shell/search/command-surface.tsx:52`.
5. **שער 8 M6 · הריצה הסופית.** לבנות מ-HEAD (`3989d65e`, 9 קובצי קוד אחרי `92a6af75`) ולהריץ שוב לפחות M5 (שבב הרשומה של BAPI), מקלדת על `/neo/` (הדלתות), ריווח טקסט וה-sweeps; לברר או לרשום את גלישת הקנבס של 5px ו-6px ב-320×256 בשני העמודים, ואת בדיקת ה-offline שנכשלה (`nav-desk.log`, `nav-phone.log`, D). אחרת: שורה ב-`BLOCKERS.md`, "המספרים בהצהרה ובדוחות הם של `92a6af75`; `3989d65e` לא נמדד; Reflow ב-320×256 ובדיקת ה-offline פתוחים".
6. **שער 10 M1 · לוח המספרים בעמוד האובייקט.** להעביר את `.no-stats` ו-`.no-stat` (`app/neo/object.css:214-229`, `:1538`) לשורת המונים של `app/neo/data.css:1961-1983`, מספר צמוד לתווית. אותו שינוי סוגר גם את המספר ב-LTR שנצמד לקצה הלא נכון (המנגנון של שער 3 #5).
7. **שער 10 M2 · טבעת המיקוד בדלתות הבית.** להסיר את `box-shadow: none` מ-`app/neo/home.css:129-134`, או להוסיף `.nx-app .nh-doors .nh-door:focus-visible { box-shadow: var(--focus-ring); }` (בעץ העבודה כבר יש כלל כזה, שלא נשמר), ואז להריץ שוב `kb-1363-n80` על `/neo/`.

## ספירה לפי מצב

| קבוצה | שורות | CLOSED | OPEN, RECORDED | OPEN, NOT RECORDED | SUPERSEDED |
|---|---|---|---|---|---|
| שער 1 | 8 | 7 | 0 | 1 | 0 |
| שער 2 | 8 | 8 | 0 | 0 | 0 |
| שער 3 | 16 | 14 | 0 | 2 | 0 |
| שער 4 | 10 | 8 | 1 | 1 | 0 |
| שער 5 | 8 | 7 | 0 | 1 | 0 |
| שער 6 | 16 | 16 | 0 | 0 | 0 |
| שער 7 | 15 | 15 | 0 | 0 | 0 |
| שער 8 | 12 | 9 | 1 | 2 | 0 |
| שער 9 | 2 | 1 | 1 | 0 | 0 |
| שער 10 | 6 | 3 | 0 | 3 | 0 |
| **שערים 1 עד 10** | **101** | **88** | **3** | **10** | **0** |
| סקירת התוכן | 17 | 16 | 1 | 0 | 0 |
| **סך הכול** | **118** | **104** | **4** | **10** | **0** |

שורות שחוזרות על אותו פגם נספרו כל אחת בשערה: שער 2 #1 עד #4 חוזרים על שער 1, שער 4 #3 ו-#7 ושער 7 #4 ו-#6 על שער 3, ושער 5 #3 ושער 6 #1 ו-#9 על שורות אחרות. רוב התיקונים נמדדו בזמן התיקון על בנייה מוקדמת, ורק החלק של הנגישות, ה-sweeps וריווח הטקסט נמדד על הייצוא הסופי (`92a6af75`).

## עדכון המוביל · 30.09: מה קרה לשורות הפתוחות

הסעיף הזה נכתב על ידי המוביל, לא על ידי הסוקר. הטבלאות של הסוקר למעלה והציונים בדוחות השערים לא שונו. כאן נרשם מה נעשה אחרי `3989d65e` בכל שורה שהסוקר השאיר פתוחה, ובממצאי שער 11 (`gate-11-final-ux.md`), שנכתב אחרי הטבלה הזו. המדידות הן של הסדרה `final-run-6/` על הייצוא של `32089ffb` (השערים: `final-3/`), אלא אם נכתב אחרת.

| מקור | ממצא | מצב אצל הסוקר | מצב עכשיו | ראיה |
|---|---|---|---|---|
| שער 1 #8, שער 8 M5 | הצהרת הנגישות מתארת את `6ba22207` ואת מגבלת סימוני הפרקים | OPEN, NOT RECORDED | CLOSED | `22186616`: `components/neo-shell/legal/legal-content.ts` (`A11Y_RUN`): הגרסה `32089ffb`, המספרים מ-`final-run-6/numbers.json`; מגבלת סימוני הפרקים הוסרה, ונוספו המגבלות שנמדדו (צומתי תרשים, חיתוך ברשימות צפופות, הפוטר בתוך `main`, מתגי התצוגה) |
| שער 3 #10, שער 4 #10, שער 10 M3, שער 11 M2 | תוויות מפת המודולים ב-ERD מתחת ל-12px בזום הפתיחה | OPEN, NOT RECORDED | OPEN, RECORDED | `BLOCKERS.md` §5, השורה "3, 4, 7, 10, 11". כל ההצהרות ב-CSS עומדות ברצפת 12px |
| שער 3 #15, שער 11 M3 | כותרות ה-ERD והסטודיו ב-`--t-h2` | OPEN, NOT RECORDED | OPEN, RECORDED | `BLOCKERS.md` §5, השורה "3, 11"; כותרת הסטודיו עלתה ל-20px (`app/neo/studio.css`) |
| שער 5 #7, שער 11 M1 | "מרכז עבודה" כתווית של מדריכי העבודה בחיפוש | OPEN, NOT RECORDED | CLOSED | `d175dba7`: `components/neo-shell/search/build.ts:46` ("מדריך עבודה"), `command-surface.tsx` ("מדריכי עבודה"). בייצוא: `k:"center",he:"מדריך עבודה"` ו-`center:"מדריכי עבודה"` בחבילה של החיפוש |
| שער 8 M6 | הסדרה הסופית לא על בנייה אחת, ותוצאות פתוחות | OPEN, NOT RECORDED | CLOSED | `final-run-6/summary.txt`: הייצוא של `32089ffb`, עץ נקי בתחילתה, 34 צעדים, כולם rc=0. ‏11 פרופילי sweep על 80 נתיבים, 0 דגלים, כולל Reflow ב-320×256 (שישה מ-39 עמודי התחום גלשו עד `9dc3f2be`) |
| שער 10 M1, שער 11 M4 | עמוד האובייקט כלוח של מספרים גדולים | OPEN, NOT RECORDED | CLOSED | `d175dba7`: שורת המונים (`app/neo/object.css`, `no-stats`); בייצוא של `/neo/object/ACDOCA/` שני מופעים של `no-stats` |
| שער 10 M2, שער 11 B1 | דלתות הבית בלי טבעת מיקוד | OPEN, NOT RECORDED | CLOSED | `d175dba7`: `app/neo/home.css` (כלל `:focus-visible` לדלת). מקלדת: 0 עצירות בלי טבעת בכל שלושת הפרופילים (`final-run-6/kb-*.json`) |
| שער 11 B2 | עמוד ה-offline נופל על ChunkLoadError | — | CLOSED | `d175dba7`: `public/sw.js` (neo-v3 שומר גם את קובצי הבנייה שעמוד ה-offline מזכיר). ניווט D: PASS במחשב ובטלפון (`final-run-6/nav-click-*.json`) |
| שער 11 B3 | הפוטר של ה-ERD מעל התוכן ב-1100px ומטה | — | CLOSED | `d175dba7`: `app/neo/erd.css`. `final-run-6/g11-probes.json`: הפוטר מתחת לסביבת העבודה 5 מתוך 5 |
| שער 11 B4 | גלילה אופקית ב-320×256 | — | CLOSED | `d175dba7` (Fiori, מקור הרשומה), `9dc3f2be` (רשומות התחום: מחרוזת בלי נקודת שבירה נשברת רק כשאינה נכנסת; 0 מ-39 ב-320, ובלי תזוזה ב-1440). Sweep ב-320×256: 0 דגלים ב-80 נתיבים |
| שער 9 #1, שער 11 M5 | LCP ו-TBT בטלפון מול הייצור | OPEN, RECORDED | OPEN, RECORDED | P2 (`dfcafdb6`): נטענים מראש רק שלושת הקבצים העבריים. ‏LCP בטלפון: שישה מתוך שבעה נתיבים בין ‎-41.5% ל-‎-0.6% (`final-run-6/vitals.json`). קטלוג הטבלאות ‎+46.1%: גבול הטעינה של השורש, החלטת בעלים (`BLOCKERS.md` §2, הניסוי `exp-noloading/`). ‏TBT: ‏NOT VERIFIED במכונה הזו (`BLOCKERS.md` §5) |
| שער 11 m1 עד m10 | עשרה MINOR | — | 8 CLOSED; ‏m3 ו-m8 OPEN, RECORDED | `d175dba7` (m1, m2, m4, m5, m6, m7, m9, ובשורות הקטלוג והסביבה של m8 הטקסט המלא בריחוף); m3 רשום ב-`TOKENS.md` וב-`BLOCKERS.md` §5; m8: ‏346 ו-310 רכיבים עדיין נחתכים בריווח טקסט מוגדל (`final-run-6/text-spacing-*.json`), בלי גלילה אופקית, והחיתוך רשום במגבלות של הצהרת הנגישות; m10 נסגר עם `QA-REPORT.md`, `MATRIX.md` ו-`CHANGED-FILES.md` |
| חדש | ציטוט נפתח בקורא NEO בלי סימון המשפט | — | CLOSED | `6ab0084c`: `components/neo-shell/reader/cited.ts`. `verify-reader` ‏108/108 (הבדיקה גם תוקנה: עשר בדיקות לא יכלו להיכשל) |
| חדש | בדיקת עקביות המעמד נכשלה על COR3 | — | CLOSED | `9dc3f2be`: שם השדה של החיפוש בבדיקה; 12/12, 0 סתירות |
| חדש | השרת המקומי נתקע מאחורי חיבור פתוח אחד | — | CLOSED | `9dc3f2be`: `scripts/serve-out.py` רב-תהליכוני; sweep של 1280: 80 נתיבים, 0 דגלים |
| חדש | סקירת קוד בלתי תלויה של `9dc3f2be`, `6ab0084c` ו-`dfcafdb6` | — | CLOSED | FAIL: ‏3 MAJOR, ‏2 MINOR, ‏2 NIT, כולם תוקנו ב-`2610ef1a`: הסימון אחרי החלפת שפה, ציטוטים לספר 7, שתי בדיקות ב-`verify-reader` שלא יכלו להיכשל, שמות הקישורים בגיליון הניווט בטלפון, ציטוט על פני שני מונחים מודגשים, ו-`inert` בלי רינדור נוסף ושני פריימים אחרי הפתיחה |
