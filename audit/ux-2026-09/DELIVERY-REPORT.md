# דוח מסירה · PROJECT NEO · ביקורת UX + השלמת ידע S/4HANA · 2026-09-21

ענף: `design/neo-correction-pass` · Preview בלבד · `main` ו-Production לא נגעו · לא בוצע Merge, Promote או Deploy לפרודקשן.

## 1. ענף, HEAD, Preview
- HEAD: `{{HEAD}}` (ראו §2 לשרשרת הקומיטים).
- Preview: הדחיפה לענף מפעילה את אינטגרציית ה-Git של Vercel. כתובת ה-Preview המקובלת: `https://sap-pp-ppi-pm-git-design-neo-co-469aef-sali2610-coders-projects.vercel.app/neo/` — **חסומה ב-Vercel Authentication**, וטוקן ה-MCP של Vercel רואה רק את `cbc-interactive-case-study`. לכן כל האימותים נעשו מול ה-Export המקומי (`out/`, `next build` של אותו HEAD). **ה-Deployment עצמו לא נבדק.**
- מקור הביקורת: `/Users/salihalif/Downloads/SAP_by_Sali_Design_Audit_for_Claude_HE.docx` — לא שונה (sha256 `35405c28016f6380e65547504f71f195138417dfedcdc75ad097062449c70bab`).

## 2. קומיטים לפי משפחה
| קומיט | משפחה | תוכן |
|---|---|---|
| `5f3c7cc3` | audit | Phase 0: baseline, מטריצת כיסוי (132 שורות), capability matrix, manifest ספרים + hashes, מדידות Before |
| `f4ea604f` | UX P0 (סבב 1) | גלישה/חיתוך, טקסט דהוי, התאמת ERD בפתיחה, סטטוס S/4 אחד לטבלאות, קישורי שיעור פנימיים |
| `31d1eb68` | SAP (סבב 2) | שמונת התיקונים שבתור עם EvidenceRecords (`SAP-FIXES.md`) |
| `3ecaea6e` | UX P1 (3.1) | מדף הקשר ריק = שורה, סדר הקטלוגים (חיפוש לפני מספרים), שינוי שם "מוכנות" → "כיסוי תיעוד", שורת מזהה + העתקה, נוסח §9, "תרגול ובדיקת ידע" |
| `48517514` | UX P1 (3.2) | סביבות העבודה PM/PP-PI (טבלה לפני S/4, אינדקס ב-details, CTA לנושא), מסנן תחומים |
| `432e8d66` | UX P1 (3.3) | חשיפה הדרגתית: פרקים משניים, קטלוג S/4 עם מסננים ופעולה, קוקפיט עם עוגנים והדגשה |
| `abe9b32d` | UX P1 (3.4) | מצב מיקוד (קורא/ERD/Studio), מילים קנוניות על צמתי ERD, שבב מצב, פאנל צר בסקירה |
| `8ee3b790` | UX P1 (3.5) | פעולות בדף הבית, סדר סעיפי תקלה, שערי ידע, אקדמיה, צ'אט |
| `{{R5_COMMIT}}` | UX P2 + נגישות (סבב 5) | reduced-motion, גלישה ב-390, ניגודיות/גודל מטרה, סולם טיפוגרפי, צבע מודול אחד ב-ERD |
| `{{R4_COMMIT}}` | ידע (סבב 4) | {{R4_SUMMARY}} |

## 3. Capability matrix
`audit/ux-2026-09/CAPABILITY-MATRIX.md` — כולל מה נחסם (sc4sap MCP, Vercel MCP לפרויקט זה, Vercel Authentication) ומה לא הופעל (reviewer skills, axe). לא הותקן Plugin/Skill חדש.

## 4. מטריצת הכיסוי המלאה
`audit/ux-2026-09/COVERAGE-MATRIX.md` — 140 שורות (132 ממצאי ה-DOCX + 8 תיקוני SAP). {{MATRIX_STATES}}

## 5. Before / After
- לפני: `before-measurements.json`, `shots/before/*.png` (HEAD `1eac50cb`, 1363×936).
- אחרי: `after-measurements.round1/2/3/3a/3b/5.json`, `shots/after-r1|r2|r3|r5/*.png`, `matrix/*.json` + `matrix/shots-*/`.
- {{R5_MEASURE}}

## 6. קבצים
196 קבצים שונו מאז ה-baseline עד סוף סבב 3 (9,432+/448−); סבב 5 הוסיף {{R5_FILES}}. פירוט לפי קומיט ב-`git show --stat`.

## 7. תיקוני SAP עם מקורות
`audit/ux-2026-09/SAP-FIXES.md` — 8 תיקונים + 2 איחודים, כל אחד עם EvidenceRecord (מזהה, טענה, Release, Edition, URL/loio, קטע תומך, סטטוס, תאריך, Confidence). מקורות: Simplification List 2025 FPS01 (PDF, v1.36), help.sap.com 2025.001 (רשומות חיפוש), What's New. לא הומצא שם, מספר Note או יורש.

## 8. ספירות
- רשומות overlay: 282 (tables 105, functions 42{{R4_FN}}, cds 37, transactions 32, enhancements 38, fiori 19, idocs 7, objects 2).
- `report:coverage`: functions 142 (145 לפני: BOMMAT → IDoc, שני מושגים לא נספרים), idocs 3, enhancements 40 (42 לפני; 40 ברי-מזהה), TOTAL 2,169, L5 125, conflicting_sources 25.
- דפים: 7,802 עמודי index (7,803 לפני סבב 2), crawl 7,804 עמודים / 0 קישורים שבורים, sitemap/routes בסנכרון.

## 9. ספרים · ZERO_CONTENT_LOSS
`books-manifest.before.json` (574 קבצים, sha256) מול `books-zero-loss.round2.json` / `round3.json` / {{BOOKS_R5}}: 574/574 זהים, 0 שונו, 0 חסרים, 0 נוספו. הקורא הישן (`components/book-reader.tsx`, `components/library/**`, `data/books/**`) לא נגע. הקורא של NEO: שינוי בפקדים בלבד (מצב מיקוד מסתיר גם את המעטפת; גודל ברירת מחדל 16px).

## 10. בדיקות
- tsc 0 · tsc(tests) 0 · eslint 0 שגיאות (406 אזהרות baseline) · `npm test` 201/201 (14 כללי סכימה + xref) · `check:routes` בסנכרון · `crawl:deadlinks` 0.
- סקריפטי QA שנוספו: `scripts/qa/ux-measure.mjs` (30 מסלולים; VW/VH/THEME/MOTION/UA), `r3-check`, `r3b-check`, `r3c-check`, `r3d-check`, `shelf-check`, `section-profile`, `type-scale`, `a11y-sample`, `threed-local`, `ux-shots`.
- `verify:reader`: 69/96 — 27 הכישלונות הם סלקטורים מיושנים בסקריפט (מ-2026-08-11 08:29, לפני שינויי הקורא באותו יום); בדיקה ישירה של `/library/book1/`: 120,411 תווים מצוירים, 0 שגיאות קונסול, 0 גלישה. הסקריפט לא תוקן (דורש הכרת ה-DOM של משטח קפוא).

## 11. מטריצת דפדפן/מסך
{{MATRIX}}

## 12. צילומי מסך
`shots/before/` (30), `shots/after-r1/` (30), `shots/after-r2/` (36 + 6 של תיקוני SAP), `shots/after-r3/` (30), `shots/after-r5/` (30), `matrix/shots-*/` (5×30), `screenshots/` (verify:reader).

## 13. Preview URL
ראו §1: קיים, חסום ב-Vercel Authentication; לא נבדק. ה-Export המקומי הוא של אותו HEAD (byte-identical build של הענף).

## 14. מצב לפי סטטוס
{{STATE_LISTS}}

## 15. מגבלות
- אין בדיקה במערכת SAP חיה (ה-MCP של sc4sap לא התחבר) — פרמטרי FM, מבני DDIC וזמינות בפועל נשארים `verification_required` היכן שצוין.
- גוף עמודי help.sap.com אינו נשלף (מעטפת JS): טענות מוגבלות לכותרת/סניפט או ל-PDF שנקרא.
- הדוגמאות בדוח ל"איך זה נבנה" (§9) נצפו ב-production 2026-09-14 ולא אותרו בדפי NEO של הענף.
- "התלת-ממד": אין בריפו שום משטח WebGL/three.js; `/domain-model/` (הישן) הוא רשימת תחומים ונטען ללא שגיאות (LOCAL_ONLY). לא נבדק ב-Preview.
- איכות תשובות ה-AI, מהירות וחיוב לא נבדקו (אין קריאות AI במסגרת זו).
- הבדיקות ב-390 נעשו עם User-Agent של iPhone ב-Chrome (לא מכשיר פיזי).

## 16. `verification_required` (חדשים/נוגעים לסבב)
- `PPCC1` (רשומת העשרה): מהות המזהה לא אומתה במקור רשמי.
- `idoc:msg:BOMMAT`: מבנה המקטעים, קוד התהליך הנכנס והסוג הבסיסי בפועל.
- `table:TJ30T`: מבנה ה-DDIC המלא (ללא שינוי מהרשומה).
- שמות ה-FM `NOTIF_TASK_READ` / `NOTIF_ACTIVITY_READ` נשארים `inferred` (מיפוי הטבלאות אומת).
- {{R4_VR}}

## 17. `conflicting_sources`
- ללא שינוי: 25 רשומות רשומות ב-`report:coverage`; מהסבב: `tx-intel.ts#IP30.s4Delta` מפנה ל-F4072 כ"תזמון בודד" בעוד המזהה מתועד רשמית כ-Screen Maintenance Requests (פתוח, בתור ה-Fiori); F3364/CORK ו-F3577/F4587 (מזהי אפליקציה) נשארים כפי שנרשמו.

## 18. מה דורש אישור אנושי
1. Merge ל-`main` / Promote to Production — **לא בוצע, לא יבוצע ללא אישור מפורש**.
2. `tx:IP30`: שדרוג ל-`deprecated` דורש הוספת `IP30H` כרשומת טרנזקציה (רשומה חדשה במאגר — החלטת תוכן).
3. הסרת שתי השורות מ-`data/exits.ts` (התוכן הועבר ל-`note` של רשומות הטכניקה) — בוצע לפי התור; אם רוצים לשמר את הדפים הישנים `/exits/CMOD-SMOD/` ו-`/exits/Implicit-Enhancement/` יש להחזירן.
4. ה-ERD: PM/PP-PI בצבעי המודול של המוצר (טורקיז/כחול) במקום כתום/סגול של הגרף הישן — שינוי זהות מכוון לפי הביקורת (§5); ניתן להחזיר בשתי שורות ב-`erd.css`.
5. עדכון `scripts/verify-reader.mjs` לסלקטורים של הקורא הנוכחי (משטח QA; לא שונה כאן).

## 19. סיכום קצר
{{SUMMARY}}
