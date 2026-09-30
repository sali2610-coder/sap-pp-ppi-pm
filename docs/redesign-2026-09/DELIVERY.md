# מסירה · Project NEO, העיצוב מחדש 2026-09

המסמך מרכז את 23 התוצרים שהבריף מבקש (§27): איפה כל אחד נמצא ומה מצבו. המספרים שמופיעים כאן לקוחים ממדידות על הייצוא הסופי (`QA-REPORT.md`), ולא נכתבו מהזיכרון.

## 1. ה־Preview

- **Preview ב־Vercel:** `EXTERNAL_BLOCKER`. מערכת ההרשאות של Claude Code סירבה לדחיפת הענף ל־GitHub, ובלי דחיפה Vercel לא בונה Preview. הפקודה היחידה שנדרשת, להרצה על ידי בעל האתר: `git -C /Users/salihalif/Desktop/My-Projects/neo-redesign push -u origin design/neo-experience-redesign:design/neo-experience-redesign`. אחרי הדחיפה Vercel בונה Preview לענף הזה בלבד; שום דבר לא מגיע ל־Production.
- **כתובת מקומית (עד שיהיה Preview):** `http://localhost:4300/neo/`, מהייצוא הסופי: `./node_modules/.bin/next build`, ואחריו `PORT=4300 python3 scripts/serve-out.py` בתיקיית הענף. השרת מיישם את כללי ההפניה של `vercel.json` כמו שרת האירוח.
- **הבדיקה הראשונה ב־Preview:** `REVIEW-GUIDE.md`, בדיקה 0 (שהקובץ המהודר של `globals.css` עדכני).

## 2. הענף וה־SHA

- ענף: `design/neo-experience-redesign`, בעץ העבודה `/Users/salihalif/Desktop/My-Projects/neo-redesign`.
- נקודת הפתיחה: `6ba22207` (הגרסה שבייצור).
- הגרסה שנמדדה: `7795e53b`, הקוד אחרי תיקוני שער 11 בסבב השני (הסדרה המלאה `neo-redesign-evidence/final-run-7/`, השערים `final-4/`). אחריה בקוד: `64d36a53` (שורה מתה והערה, ה־CSS המהודר זהה), `bb8a7204` (ניגודיות של צעד בשרשרת בעמוד אובייקט) ו־`389863af` (בודק הניגודיות). מה שהם יכולים לשנות נבדק שוב על `a50116a3` (`final-run-7b/`, השערים `final-5/`), והצהרת הנגישות נכתבה מהמספרים האלה (`19e1a4f9`). Astra רץ במלואו על הייצוא הסופי (`final-run-8/astra/`). הסדרה הקודמת, `final-run-6/` על `32089ffb`, נשמרת. ה־SHA האחרון של הענף מופיע בדוח הסופי.
- הפירוט: `QA-REPORT.md`, סעיף 1.
- לא בוצע Merge ל־`main`, לא בוצעה דחיפה ולא בוצעה פריסה.

## 3. התוצרים

| # | תוצר | איפה |
|---|---|---|
| 1 | Preview או כתובת מקומית | סעיף 1 למעלה |
| 2 | ענף ו־SHA | סעיף 2 למעלה |
| 3 | Design Brief | `DESIGN-BRIEF.md` |
| 4 | Design Specification | `DESIGN-SPEC.md` |
| 5 | ביקורת הניסוח | `COPY-AUDIT.md` (ומועמדים: `copy-audit-candidates.md`; ביקורת התוכן: `reviews/content-review-copy-sap.md`) |
| 6 | מערכת Tokens | `TOKENS.md`; בקוד: `app/neo/system.css` |
| 7 | שלושת הכיוונים וה־Bakeoff | `BAKEOFF.md`, `BOARD-SPEC.md`; הלוחות: `/design/redesign-2026/editorial/`, `/workbench/`, `/atlas/`, ‏`/motion/`; השופטים: `reviews/bakeoff-judge-*.md` |
| 8 | הכיוון שנבחר והנימוק | `BAKEOFF.md` (Workbench כבסיס, עם שתלים מ־Editorial ומ־Atlas) |
| 9 | צבעי יום ולילה | `TOKENS.md` (ניגודיות מחושבת, בדיקת הסגול) |
| 10 | Motion והפחתת תנועה | `MOTION.md` |
| 11 | מלאי הרכיבים | `COMPONENTS.md` |
| 12 | צילומי לפני ואחרי | לפני: `neo-redesign-evidence/before/` (479 צילומים של `6ba22207`); אחרי: `neo-redesign-evidence/final-run-7/sweep/shots/` (80 נתיבים בשבעה פרופילים), `final-run-7b/sweep/shots/` (שלושה פרופילים אחרי תיקון הניגודיות), `final-run-7/g11-shots/`, ‏`final-run-7/cited/` (הציטוט של `REVIEW-GUIDE.md`), ‏`final-run-7/erd-count/`, ושל Astra (`QA-REPORT.md` §8) |
| 13 | מטריצת מסכים ורוחבים | `MATRIX.md` |
| 14 | דוח נגישות | `QA-REPORT.md` §4, `reviews/gate-08-accessibility.md`; הצהרת הנגישות: `/neo/accessibility/` |
| 15 | דוח ביצועים | `QA-REPORT.md` §5, `reviews/gate-09-performance.md` |
| 16 | דוח Astra | `QA-REPORT.md` §6, `ASTRA-CRITERIA.md` |
| 17 | Routes, Sitemap, Crawl | `QA-REPORT.md` §7 |
| 18 | `ZERO_CONTENT_LOSS 574/574` | `QA-REPORT.md` §7 |
| 19 | הקבצים ששונו | `CHANGED-FILES.md` |
| 20 | Dependencies | `DEPENDENCIES.md` (לא נוספה אף חבילת npm; חמש משפחות גופנים באחסון עצמי, OFL) |
| 21 | חסמים ומה שלא נבדק | `BLOCKERS.md` |
| 22 | הוראות סקירה | `REVIEW-GUIDE.md` |
| 23 | תוכנית Merge ו־Production | `MERGE-PLAN.md` (לא בוצעה) |

שערי הביקורת: `reviews/gate-01` עד `gate-11`, וטבלת הסגירה של כל BLOCKER ו־MAJOR: `reviews/CLOSURE.md`.
