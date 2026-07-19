# SAP Academy — Regression Test Matrix

**מטרה:** שכבת בטיחות לפני כל שינוי קוד. תופסת כל יכולת שעלולה להישבר במהלך ייצוב מנוע ה-Academy (PR 1-7) והמיגרציה (PR 8+).
**מקרא סטטוס נוכחי:** ✅ תקין · ⚠️ שבור/לא-עקבי (מהאודיט) · 🔒 מוקפא (אסור לגעת — חייב להישאר זהה) · ➖ לא קיים.
**לכל יכולת:** התנהגות צפויה · התנהגות נוכחית · אימות אוטומטי · אימות ידני · קבצים מושפעים · rollback.

**גייטים אוטומטיים משותפים (רצים בכל PR):**
`G1` npm run gen:routes + check:routes (route-manifest drift) · `G2` npx tsc --noEmit (0) · `G3` npx eslint (0 errors) · `G4` npm run build (static export) · `G5` node scripts/crawl-dead-links.mjs (0) · `G6` scripts/academy-coverage.mjs (חדש ב-PR-1) · `G7` Puppeteer harness (14 תרחישים, PR-7) · `G8` Lighthouse (Perf/A11y ≥ יעד).

---

## חלק 1 — מנוע Academy (הליבה שמתייצבת)

### 1. Lesson Engine (Reader חדש)
- **צפוי:** כל שיעור בכל מסלול (PM/PP-PI/QM ובהמשך MM/WM/PP-DS/S&OP/PMU) נפתח ב-`LessonView` — מסמך זורם, 23 סוגי בלוקים, אותו Design System.
- **נוכחי:** ⚠️ PM/PP-PI/QM עובדים ב-Reader חדש; MM/WM/PP-DS/S&OP/PMU + PP-custom עדיין accordion ישן.
- **אוטומטי:** `academy-coverage.mjs` — 0 שיעורים ללא Reader חדש; generateStaticParams מכסה כל slug.
- **ידני:** פתיחת דגימת שיעור מכל מודול → מוודא LessonView (לא accordion).
- **קבצים:** `components/academy/lesson-view.tsx`, `lib/academy/lesson-types.ts`, `data/academy/lessons/**`, `app/academy/lesson/[slug]/page.tsx`.
- **Rollback:** revert branch; ה-Reader לא נגזר מ-state חיצוני, בטוח.

### 2. Progress (התקדמות)
- **צפוי:** מקור אמת אחד (`neo:academy:v2`); כל מסך גוזר אחוז מאותו חוק מתועד; זהה ב-reader/home/path.
- **נוכחי:** ⚠️ 3+ נוסחאות סותרות (71/57/0); `neo:academy:progress` נקרא שונה בכל מסך.
- **אוטומטי:** unit על `store.ts` (pct(lesson)=blocks/required; pct(path)=doneLessons/total); Puppeteer מוודא זהות אחוז בין reader↔home↔path.
- **ידני:** השלמת בלוקים בשיעור → אותו אחוז בכל 3 המסכים.
- **קבצים:** `lib/academy/store.ts` (חדש), `lesson-progress.ts`, `gamification.ts`, `lesson-view.tsx`, `academy-home.tsx`, `learning-path.tsx`.
- **Rollback:** store v2 מגורסן; migration קורא v1 בלי למחוק → revert חוזר ל-v1.

### 3. Continue Learning
- **צפוי:** אלגוריתם — שיעור אחרון שנפתח ולא הושלם → אחרת ראשון-לא-הושלם במסלול פעיל → אחרת מסלול הבא → אחרת ברירת-מחדל. משתנה לפי המסלול שנבחר.
- **נוכחי:** ⚠️ hardcoded ל-`pm-maintenance-order` תמיד (`academy-home.tsx:16,77`).
- **אוטומטי:** unit על `continueTarget(store)`; Puppeteer תרחיש: פתח pm-equipment → כרטיס ההמשך = pm-equipment (לא Maintenance Order).
- **ידני:** פתיחת שיעור אחר, חזרה לבית → הכרטיס מצביע על השיעור האחרון.
- **קבצים:** `lib/academy/store.ts`, `lib/academy/model.ts`, `academy-home.tsx`.
- **Rollback:** revert.

### 4. Reset
- **צפוי:** 3 רמות (שיעור/פרק/מסלול) + reset-כל-האקדמיה; Confirmation Dialog (שם מסלול, מס' שיעורים, "לא מוחק תוכן"); עדכון מיידי בכל המסכים; מנקה רק scope נבחר.
- **נוכחי:** ➖ לא קיים כלל.
- **אוטומטי:** unit על `resetLesson/resetChapter/resetPath/resetAll`; Puppeteer: reset מסלול → אחוז 0, current=שיעור 1, continue מתעדכן, בלי refresh ידני.
- **ידני:** לחיצת reset בכל רמה → אישור → אימות scope.
- **קבצים:** `lib/academy/store.ts`, `components/academy/reset-dialog.tsx` (חדש), `learning-path.tsx`, `academy-home.tsx`.
- **Rollback:** revert; אין reset בפרוד היום, אין רגרסיה.

### 5. Navigation (הבא/הקודם/הבא-פרק/הקודם-פרק/חזרה-למסלול)
- **צפוי:** מבוסס IDs יציבים מהמודל הקנוני; סדר רציף לפי המסלול; לא לפי index במערך/route cache/מספר קשיח.
- **נוכחי:** ⚠️ prev/next לפי שרשרת authored; ה-pilot מוזרק בין notification-to-order↔confirmation → קפיצה.
- **אוטומטי:** `academy-coverage.mjs` — prev/next של כל שיעור תואם מיקום-במסלול; 0 קפיצות; Puppeteer: הבא/הקודם בכל שיעור.
- **ידני:** מעבר שיעור-אחר-שיעור בכל מסלול, אין דילוגים.
- **קבצים:** `lib/academy/model.ts`, `lesson-view.tsx`, `learning-path.tsx`.
- **Rollback:** revert.

### 6. Breadcrumbs
- **צפוי:** מספר-תצוגה = מיקום-בפרק (chapter lesson number), לא `lesson.index` הגולמי. עקבי עם ה-TOC.
- **נוכחי:** ⚠️ מציג `lesson.index` גולמי → "שיעור 3" ואז "שיעור 13".
- **אוטומטי:** Puppeteer: breadcrumb של pilot = מיקומו-בפרק; אין קפיצה למספר הבא.
- **ידני:** מעבר pilot→next; המספר עולה ב-1.
- **קבצים:** `lesson-view.tsx` (Breadcrumb), `lib/academy/model.ts`.
- **Rollback:** revert.

### 7. TOC ("בעמוד זה") + Scroll-Spy
- **צפוי:** רשימת בלוקי השיעור, active נגזר מ-scroll, done-checks מה-store. ✅ עובד היום.
- **נוכחי:** ✅ תקין (נבנה ב-#64) — צריך לשמור אחרי refactor ה-store.
- **אוטומטי:** Puppeteer: גלילה → active משתנה; בלוק שנצפה מסומן done.
- **ידני:** גלילה בשיעור; ה-rail עוקב.
- **קבצים:** `lesson-view.tsx`.
- **Rollback:** revert.

---

## חלק 2 — משטחי Academy

### 8. Home (`/academy`)
- **צפוי:** hero, continue-card (אלגוריתמי), roadmap, course cards → כל מודול ל-`/academy/path/{module}`, achievements, recent, weekly/streak — הכל מ-store אחד.
- **נוכחי:** ⚠️ continue hardcoded; course cards ל-legacy; PM_TRACK (6) ≠ PM_PATH (7); course pct=0 לכל מי שאינו PM.
- **אוטומטי:** Puppeteer: כל course card מוביל ל-`/academy/...` (לא `/library/*-academy`).
- **ידני:** לחיצה על כל כרטיס → Reader חדש.
- **קבצים:** `academy-home.tsx`, `lib/academy/model.ts`, `store.ts`.
- **Rollback:** revert.

### 9. Academy Dashboard (`/academy/dashboard`)
- **צפוי:** hub דוחות; כפתורי "פתח" למודולי lesson-engine → `/academy/path/{module}`; ציוני-איכות נשארים (מטא, לא התקדמות משתמש).
- **נוכחי:** ⚠️ כפתורי "פתח" → `/library/*` (ישן).
- **אוטומטי:** dead-links (G5); Puppeteer: "פתח" של PM/PP-PI/QM → `/academy`.
- **ידני:** לחיצה על "פתח" בכל BookCard.
- **קבצים:** `academy-dashboard.tsx`.
- **Rollback:** revert.

### 10. Search (⌘K) — Academy entities
- **צפוי:** שיעורים/מסלולים נמצאים; קישור ל-Reader חדש. ✅ בסיס עובד.
- **נוכחי:** ✅ command-palette עובד; לוודא שקישורי שיעור מצביעים ל-`/academy/lesson/*`.
- **אוטומטי:** dead-links; Puppeteer: חיפוש "פקודת אחזקה" → תוצאה → `/academy/lesson/*`.
- **ידני:** ⌘K → חיפוש שיעור → פתיחה.
- **קבצים:** `components/command-palette.tsx`, `lib/search-intel.ts` (קריאה בלבד; לא בהיקף PR-1-7 אלא אם קישור legacy נמצא).
- **Rollback:** revert.

### 11. Search Ranking
- **צפוי:** קוד-מדויק > כותרת > מושג > גוף; יציב. ✅ קיים.
- **נוכחי:** ✅ fuzzy+rank ב-transaction/command-palette; לא בהיקף שינוי Academy.
- **אוטומטי:** Puppeteer snapshot של סדר תוצאות לפני/אחרי (חייב זהה — Academy PRs לא נוגעים בחיפוש).
- **ידני:** אותו query → אותו סדר.
- **קבצים:** אין (out of scope; guard בלבד).
- **Rollback:** n/a.

### 12. Cross-links (בין שיעורים/אובייקטים)
- **צפוי:** בלוק `related` → related-lesson cards; קישורי אובייקט gated ל-route-manifest. ✅ נבנה ב-#64.
- **נוכחי:** ✅ תקין.
- **אוטומטי:** dead-links; coverage — כל `related` href תקף.
- **ידני:** פתיחת שיעור עם related → כרטיסים מקושרים.
- **קבצים:** `lesson-view.tsx`, `lib/academy/lesson-nav.ts`.
- **Rollback:** revert.

### 13. Deep Links
- **צפוי:** `/academy/lesson/{slug}`, `/academy/path/{module}` יציבים; legacy `/library/*-academy` → redirect בטוח **רק אחרי** מיגרציה+אימות (לא לפני).
- **נוכחי:** ⚠️ legacy routes חיים ומצביעים ל-accordion.
- **אוטומטי:** G1 route-manifest; dead-links; Puppeteer: deep link ישן עדיין 200 (עד המיגרציה), חדש 200.
- **ידני:** פתיחת deep link ישן+חדש.
- **קבצים:** `app/library/*-academy/**` (redirect רק ב-PR מיגרציה, אחרי אימות).
- **Rollback:** מחיקת ה-redirect מחזירה את ה-route הישן.

### 14. Sidebar (Knowledge Sidebar)
- **צפוי:** ניווט קבוע, active-indicator, קישורי Academy תקינים. ✅ עובד (לא בהיקף Academy-engine).
- **נוכחי:** ✅.
- **אוטומטי:** dead-links; Puppeteer: קישור SAP Academy בסייד-בר → `/academy`.
- **ידני:** ניווט מהסייד-בר.
- **קבצים:** `components/knowledge-sidebar.tsx` (guard בלבד).
- **Rollback:** n/a.

---

## חלק 3 — Library (🔒 מוקפא — regression guard בלבד)

> אסור שינוי. המטריצה מוודאת שה-Academy PRs **לא נוגעים** בהם. אימות = byte-identical + visual.

### 15. Library (`/library`) 🔒
- **צפוי:** זהה byte-for-byte למצב הנוכחי.
- **אוטומטי:** `git diff` על `app/library/page.tsx` + book components = ריק; screenshot diff = 0.
- **ידני:** פתיחת /library, מדף, חיפוש — ללא שינוי.
- **קבצים מושפעים:** **אין** (אסור).
- **Rollback:** n/a.

### 16. Bookshelf 🔒 · 17. Book Covers 🔒 · 18. Book Reader 🔒
- **צפוי:** `components/book-cover.tsx`, `book-reader.tsx`, `chapter-reader.tsx`, `figure-viewer.tsx`, `page-view.tsx`, `lib/reader-*`, `continuity-store.ts` — ללא שינוי.
- **אוטומטי:** git diff ריק על כל אלה; `neo:continuity:v1` לא נוגע (נפרד מ-`neo:academy:*`).
- **ידני:** פתיחת ספר, קריאה, figure zoom, page-turn — זהה.
- **קבצים מושפעים:** **אין** (אסור).
- **Rollback:** n/a.

> הערה: `/library/*-academy` (accordion) הם חלק מ-Academy (לא ה-Book Reader הקפוא). הם ימוגרו — אך **רק** אחרי אישור, עם redirect אחרי אימות. ה-Book Reader (book1-11), covers, bookshelf — מוקפאים לחלוטין.

---

## חלק 4 — Cross-cutting

### 19. Mobile (≤640)
- **צפוי:** sticky progress, ≥44px touch, 0 overflow, reader-comfort. ✅ קיים.
- **נוכחי:** ✅ (מאומת ב-#63/#64).
- **אוטומטי:** Puppeteer 390px על כל מסך Academy → 0 overflow, 0 console errors.
- **ידני:** iPhone-width בכל מסך.
- **קבצים:** globals.css (guard), lesson-view/home/path.
- **Rollback:** revert.

### 20. Desktop (1280+)
- **צפוי:** rail "בעמוד זה", grid, container. ✅.
- **אוטומטי:** Puppeteer 1280 → 0 overflow.
- **ידני:** בדיקה ויזואלית.
- **קבצים:** כנ"ל.
- **Rollback:** revert.

### 21. Dark Mode
- **צפוי:** ➖ אין dark-mode גלובלי היום (רק reader sepia/night מקומי, מוקפא). Theme tokens קיימים כתשתית. **לא בהיקף** ה-Academy fix.
- **נוכחי:** ➖ אין toggle גלובלי.
- **אוטומטי:** אין (לא ממומש). guard: לא מוסיפים dark-mode ב-PRs אלה.
- **ידני:** n/a.
- **קבצים:** אין.
- **Rollback:** n/a.

### 22. RTL
- **צפוי:** `dir="rtl"`, logical props, קודי SAP LTR+bidi-isolate. ✅.
- **נוכחי:** ✅.
- **אוטומטי:** Puppeteer RTL screenshot; אין left/right קשיח בקבצים ששונו.
- **ידני:** בדיקת משפט מעורב עברית+קוד.
- **קבצים:** כל קבצי Academy ששונו.
- **Rollback:** revert.

### 23. Offline / Static Export
- **צפוי:** 100% offline, אין fetch חיצוני ב-`out/`, `output:'export'`. ✅.
- **נוכחי:** ✅.
- **אוטומטי:** G4 build; grep `out/` ל-origins חיצוניים = 0 (למעט help.sap.com content).
- **ידני:** טעינה בלי רשת.
- **קבצים:** next.config (guard), model.ts/store.ts (client-only, localStorage).
- **Rollback:** revert.

### 24. Static Build
- **צפוי:** `npm run build` מפיק `out/` (~4373 עמ') ללא שגיאות.
- **נוכחי:** ✅.
- **אוטומטי:** G4.
- **ידני:** n/a.
- **קבצים:** כל שינוי.
- **Rollback:** revert.

### 25. Dead Links
- **צפוי:** 0 dead internal links; שיעור/route חסר לא מרונדר כלינק.
- **נוכחי:** ✅ (0).
- **אוטומטי:** G5 `crawl-dead-links.mjs`.
- **ידני:** n/a.
- **קבצים:** כל שינוי route/link.
- **Rollback:** revert.

### 26. Lighthouse + Accessibility
- **צפוי:** Perf mobile ≥90, A11y ≥95; heading hierarchy, focus, contrast, aria, keyboard.
- **נוכחי:** ✅ בסיס טוב (a11y תוקן ב-#67).
- **אוטומטי:** G8 Lighthouse על `/academy` + `/academy/lesson/*` + `/academy/path/*`; axe בבדיקות Puppeteer.
- **ידני:** ניווט מקלדת מלא ב-reader; screen-reader spot-check.
- **קבצים:** קבצי Academy ששונו.
- **Rollback:** revert.

---

## Baseline capture (לפני PR-1)
לפני שינוי כלשהו נלכד baseline: G2/G3/G4/G5 ירוקים + screenshots של כל מסכי Academy (desktop+mobile) + פלט `academy-coverage.mjs` (ברגע שקיים). כל PR מושווה מול baseline זה. כל סטייה ב-🔒 Library = חסימה מיידית.

## חוקי מעבר (gate) לכל PR של Academy
1. G1-G5 ירוקים (+ G6 מ-PR-1, G7 מ-PR-7).
2. `git diff` על קבצי 🔒 Library = **ריק**.
3. screenshots desktop+mobile של המסכים שהושפעו.
4. תוצאות Puppeteer לתרחישים הרלוונטיים.
5. דוח coverage.
6. **אין merge בלי אישור מפורש של Sali.**
