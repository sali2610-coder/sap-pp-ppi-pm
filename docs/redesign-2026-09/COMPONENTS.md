# מלאי הרכיבים · Knowledge Workbench

המלאי של המערכת כפי שנבנתה (לא של נקודת הפתיחה; זו מתוארת ב־`SYSTEM-MAP.md`). לכל רכיב: מה הוא, איפה הקוד, ואילו מצבים הוא מממש. הצבעים, הרדיוסים והמשכים מגיעים מ־`app/neo/system.css` (ראו `TOKENS.md`), והתנועה מ־`MOTION.md`.

## 1. פקדים בסיסיים · `app/neo/ui.css`

הצורה אומרת מה הפקד עושה עוד לפני שקוראים אותו:

| מחלקה | מה זה | צורה | מצבים |
|---|---|---|---|
| `.nu-btn` | הפעולה הראשית במסך, אחת לכל היותר | מילוי אדום המותג | hover, focus-visible, disabled, busy |
| `.nu-btn2` | פעולה משנית | מסגרת | hover, focus-visible, disabled, busy |
| `.nu-ghost` | פעולה בתוך שורה צפופה | בלי מסגרת | hover, focus-visible, disabled |
| `.nu-tab` | החלפת תצוגה במקום | קו תחתון, לא Pill | hover, נבחר (`aria-selected`), focus-visible, disabled |
| `.nu-link` | יציאה לנתיב אחר | טקסט וחץ | hover (קו תחתון), focus-visible |
| `.nu-filter` | מסנן שמצמצם את המוצג | מסגרת; לחוץ: מילוי דיו | hover, לחוץ (`aria-pressed`), focus-visible, disabled |
| `.nu-chip` | ערך, לא לחיץ | רקע שקט ומסגרת דקה | בלי hover ובלי סמן יד; שבב שהוא קישור מקבל 24px גובה |
| `.nu-status` | מצב | נקודה ומילה | סטטי |
| `.nu-card` | אזור שלם שנבחר | מסגרת דקה | hover (מסגרת), נבחר, focus-visible |

כללים: אין הרמה, הגדלה או זוהר. שפת מיקוד אחת (`--focus-ring`). במצביע גס כל פקד מקבל 44px: כלל אחד ב־`ui.css` חל על כל פקד HTML בתוך `.nx-app` (שער 8, M8). קישור בתוך טקסט רץ שומר על השורה שלו (חריג inline של WCAG 2.5.8), וצומתי תרשים מצוירים לפי גאומטריה משלהם ואינם בכלל (ה־ERD מציג כל צומת גם כשורה, הסטודיו מגיע לכל צומת מהחיפוש, ולשניהם זום). כל המעברים מבוטלים בהפחתת תנועה.

**שורת מונים.** הספירות בראש הקטלוגים, רשומת הטבלה, מרכז S/4HANA, הקוקפיט ומסכי הלמידה (`.nxd-stats`, ‏`.nxb-stats`, ‏`.ns4-stats`, ‏`.nxl-stats`) הן שורת טקסט אחת בכל רוחב ("105 טבלאות · 1,234 שדות"), לא רצועה של מספרים גדולים מעל תוויות. כל מספר נשאר (שער 10, M1).

## 2. מעטפת · `components/neo-shell/`

| רכיב | קובץ | תפקיד |
|---|---|---|
| Shell | `neo-shell.tsx`, `search/shell-client.tsx`, `app/neo/rail.css` | רייל ניווט שטוח במחשב, סרגל עליון עם החיפוש והכלים, ניווט תחתון בטלפון |
| פירורי לחם | `search/shell-client.tsx` (`.nx-crumbs`) | NEO › קבוצה › קטלוג (קישור) › המזהה של הרשומה; משפחה בלי פריט רייל מקבלת הורה מ־`nav-context/fallbacks.ts` |
| כלי תצוגה ועזרה | `dock/neo-dock.tsx`, `dock/theme-switch.tsx`, `dock/typography.ts`, `app/neo/dock.css` | מראה יום/לילה/מערכת, גופן וגודל טקסט, עזרה בעמוד. במחשב בסרגל העליון (`#nx-dock-slot`), בטאבלט ובטלפון בסרגל העליון הנייד (`#nx-dock-mslot`) |
| חלון חיפוש | `search/command-surface.tsx`, `search/build.ts`, `app/neo/search.css` | ⌘K, תוצאות לפי סוג, ניווט מקלדת |
| פוטר | `site-footer.tsx` | קרדיט ושלושת המסמכים המשפטיים, בכל עמוד NEO |
| חזרה חכמה | `nav-context/smart-return.tsx` | "חזרה ל…" אל המקום שממנו הגיעו, או להורה הקבוע |
| ניווט בעמוד | `workspace/section-nav.tsx` | תוכן העניינים של העמוד, נשאר על המסך, מסמן את הפרק הנוכחי |
| ניווט נייד | `mobile-nav.tsx` | הניווט התחתון בטלפון |
| העתקת מזהה | `copy-id.tsx` | כפתור העתקה עם משוב "הועתק" גם לקורא מסך |

## 3. מצב ואימות · `components/neo-shell/evidence/`

| רכיב | קובץ | תפקיד |
|---|---|---|
| `StatusPill` | `status-pill.tsx` | מעמד S/4HANA: סמל, מילה וצבע המשפחה (`--s4-*`), אף פעם לא צבע לבד |
| `RecordStatus` | `record-status.tsx` | הזוג שכל כותרת רשומה מציגה: מעמד S/4HANA ורמת האימות, מתוך רשומת הראיות של הרשומה |
| `EvidenceBlock` | `evidence-block.tsx` | "אימות ומקורות": מעמד, מהדורה, רמת אימות, מקורות ותאריכי גישה, עומק התיעוד |

## 4. כותרת רשומה אחת

אותו סדר בכל סוגי הרשומה: שורת הקשר, המזהה בשורה משלו עם העתקה, השם העברי והאנגלי, שורת מעמד S/4HANA ורמת אימות (`RecordStatus`), ואחריה המצבים של הרשומה עצמה, המודול והשבבים. מתחת: ניווט בעמוד.

| סוג | קובץ |
|---|---|
| טבלה | `data/tables-detail-view.tsx` |
| אובייקט | `object/object-view.tsx`; אובייקט HR/BW או מאומת: `object/object-aux-view.tsx` |
| טרנזקציה | `data/tx-detail-view.tsx` |
| BAPI ו־FM, CDS, IDoc, Fiori, הרחבות | `reference/ref-detail-view.tsx` |

חריגים מתועדים: יישום Fiori פותח בשם העסקי, והמזהה בשורה משלו עם העתקה. לאובייקט HR/BW או מאומת אין גלולת מעמד, כי `object-aux.ts` לא מפעיל עליו את ההכרעה של הבלופרינט ומציג את משפט ה־S/4HANA של הרישום שלו.

## 5. סרגל קטלוג אחד

חיפוש, תצוגות, מיון, מסננים, פס עובדות, מונה "N מתוך M" עם ניקוי, ומצב ריק עם פעולה.

| קטלוג | קובץ | מחלקות |
|---|---|---|
| טבלאות | `data/tables-surface.tsx` | `.nxd-*` (`data.css`) |
| טרנזקציות | `data/transactions-surface.tsx` | `.nxd-*` |
| BAPI, CDS, IDoc, Fiori, הרחבות | `reference/ref-surface.tsx` | `.nxd-*` |
| שיטות עבודה מומלצות | `best-practices/bp-view.tsx` + `best-practices/bp-list.tsx` | `.nxd-*` |
| מרכז הידע, תקלות | `learn/knowledge-surface.tsx`, `learn/incidents-surface.tsx` | `.nxl-*` (`learn.css`) |
| נושאי העבודה במרכזים | `centers/center-topics.tsx` | `.nxl-*` |

## 6. הבית · `components/neo-shell/home/`, `app/neo/page.tsx`

| רכיב | קובץ | הערה |
|---|---|---|
| שער וחיפוש | `home-search.tsx` | פותח את חלון החיפוש של המעטפת. השער ברוחב העמודה, כך שהחיפוש הוא העצם הראשון במסך; מתחתיו שלוש רשומות אמיתיות כדוגמה (AFKO, ‏IW31, ‏BAPI_ALM_ORDER_MAINTAIN; שער 10, M2) |
| שבע דלתות | `app/neo/page.tsx` | רשימה צפופה אחת (שם, מספר, מה היא פותחת), ארבע עמודות מ־60rem, כך שמפת התהליכים מגיעה למסך הראשון. כל מספר הוא המספר שהיעד מציין על עצמו (נבדק ב־`home-check.mjs`) |
| להמשיך | `home-continue.tsx` | מופיע רק כשיש היסטוריה במכשיר |
| מפת התהליכים | `process-map.tsx`, `home-data.ts` (`flows`) | רגע החתימה; קשר רק ממה שהמילון מתעד (`test/home-flows.test.ts`) |
| כרטיסי מודול | `app/neo/page.tsx` | המונים של עמוד המודול עצמו |
| פרק S/4HANA | `app/neo/page.tsx` | המעמד הקנוני של כל טבלה, עם המקור |

## 7. גרפים

| רכיב | קובץ |
|---|---|
| מודל הנתונים (ERD) | `erd/erd-workspace.tsx`, `erd/erd-catalog.ts`, `app/neo/erd.css` |
| Architecture Studio | `studio/studio-view.tsx`, `lib/studio-graph.ts` |
| גרף הקשרים בעמוד אובייקט | `object/object-lanes.tsx` |

## 8. ספרים וקריאה (לא נערכו: קבצים קפואים)

`components/book-reader.tsx`, `components/chapter-reader.tsx`, `components/library/**`, `components/neo/**`. בתוך NEO נבנו סביבם: המדף (`books/book-shelf.tsx`), כרטיס הספר (`books/book-hub.tsx`) וסרגל ההתקדמות בקורא (`reader/progress-rail.tsx`, שבו סימוני הפרקים הם סימון, והמסילה מטפלת בלחיצה).

## 9. מסמכים משפטיים ו־404

| רכיב | קובץ |
|---|---|
| מסמך משפטי | `legal/legal-view.tsx`, `legal/legal-content.ts`, `app/neo/legal.css`; עמודים `/neo/privacy/`, `/neo/terms/`, `/neo/accessibility/`, ו־`/privacy/` הישן |
| 404 | `app/not-found.tsx` |
