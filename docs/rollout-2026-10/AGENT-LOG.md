# יומן סוכנים וסקילים · rollout אוקטובר 2026

כל הפעלה של סוכן או סקיל בשלב ה־rollout נרשמת כאן, לפי סדר הזמן. לכל הפעלה מופיעים השם, המטרה, הקלט, המסקנה, השינוי שנעשה בעקבותיה והראיה.
הראיות נשמרות מחוץ ל־git, בתיקייה `neo-redesign-evidence/r5-rollout/`. כלי הבדיקה של העברת התוכן נמצאים בתיקיית ה־scratchpad של הסשן (`mig/`), ועותק שלהם יוכנס לתיקיית הראיות בסוף השלב.

**מה לא הופעל, ולמה:**
- **ממשק 21st.dev (magic):** לא היה זמין, כי אין לו מפתח API.
- **Figma, Notion, Linear ודומיהם:** לא היו זמינים בסשן, כי הם דורשים התחברות של הבעלים.
- **ראיון ההתחלה של Impeccable (`init`):** דולג, לפי ההנחיה לעבוד בלי עצירות.
- **עדכון Impeccable לגרסה 4.5.0:** לא הותקן. מותקנת גרסה 4.0.1.

## סקילים

| # | שם | מטרה | קלט | מסקנה | שינוי | ראיה |
|---|---|---|---|---|---|---|
| S1 | `impeccable` (colorize) | העשרת המצב הבהיר החיוור (P1 §6) | `app/neo/editorial.css` על כל נתיבי `/neo` | צבע לכל משפחה כסימן התמצאות: פס ראש, סמן מקטע, מספרים ולוחות קטלוג. גוון אחד לכל משפחה, בלי קשת צבעים. גיליונות לבנים על חול, עם צל מגוון בשתי דרגות. | `d2bfd7b4d` | `r5-rollout/fam2-{0,1}.png` |
| S2 | `ui-ux-pro-max` (חיפוש `--domain color`) | בדיקת פלטות לכלי ידע ארגוני | "enterprise knowledge tool, warm neutral, domain colours" | אישר בסיס ניטרלי חם עם צבעי תחום מעומעמים. נדחו סגול, ניאון וגרדיאנטים. | נכלל ב־S1 | — |
| S3 | `motion-doctrine` | תנאי קבלה לתנועה מול 59 פריטי המלאי (P1 §7) | `OLD-NEO-MOTION-INVENTORY.md` וגיליונות התנועה | הסקיל הוא דוקטרינה לקומפוזיציית וידאו: חוק התפרים, ledger וקטורי, `seam-gate` על timelines של HyperFrames. הסקריפטים שלו לא חלים על ממשק ווב, ולכן לא הורצו. חלק 2 שלו אומץ כתנאי קבלה (פרטים מתחת לטבלה). | `MOTION-CHECKLIST.md` (בהכנה), השינויים ב־`motion.css`, ‏`search.css`, ‏`ui.css`, ‏`editorial.css` ו־`chat.css` | `idle-anim.mjs`: 0 אנימציות אינסופיות במנוחה ב־15 מסלולים |

תנאי הקבלה מ־S3:
- אין לולאות בטלה: לא נשימה, לא ריחוף ולא זוהר.
- תנועה מוצתת באותו פריים של הסיבה שלה.
- כניסה עד כ־800ms; יציאה כ־75% מהכניסה.
- stagger כולל עד 500ms.
- בלי bounce ובלי elastic.
- כיוון דומיננטי אחד.

## סוכנים: העברת התוכן (P0 §3–§5)

הכלל המשותף לכל הסוכנים נמצא ב־`mig/RULES.md`, ובודק השקילות ב־`mig/check.py` ו־`mig/parity.py`:
- כל עמוד ישן מושווה מול עמוד ה־NEO שאליו הוא מופנה.
- שורות תבנית שחוזרות במשפחה מסוננות מההשוואה.
- העובדות שבחריצי התבנית נבדקות בנפרד.

קו הבסיס (`parity1.json`):
- **מיפויים "מדויקים" שהתוכן שלהם חסר:**
  - `/object/` ‏0.25
  - `/bapi/` ‏0.44
  - `/apps/` ‏0.52
  - `/impact/` ‏0.58
  - `/resolution/` ‏0.72
  - 641 מתוך 1,818 עמודי `/tcode/` מתחת ל־0.95
- **465 עמודי hub:** בין 0 ל־0.15.

| # | סוכן | מטרה | קלט | מסקנה | שינוי | ראיה |
|---|---|---|---|---|---|---|
| A | general-purpose | טרנזקציות: ‏`/tcode/` (1,818 + 32 hub) ו־`/apps/` (539) | `transaction-page.tsx`, ‏`transaction-light.tsx`, ‏`related-view.tsx`, ‏`app-object.tsx` ← `tx-detail-view.tsx` | ‏`/apps/` עלה מ־0.52 ל־0.996. עמודי הרשומה של `/tcode/` עלו מ־0.46 ל־0.91, ול־0.9996 בניכוי כרום ניווט ישן. עמודי `/tcode/` הקלים ב־1.0. נוספו 31 עמודים לקודים שמופיעים רק בבלופרינט, וכל אחד מהם מציין זאת. ל־ECC אין עמוד, כי זה שם מהדורה. מה לא הועבר: "פעיל / יציב" שנגזר מברירת מחדל של `lifecycle.ts`, וכיוון "הוחלף ע\"י" שהנתונים לא מאשרים (VD01↔BP). שניהם הומרו בהצגה כנה. | `tx-detail.ts`, ‏`tx-detail-view.tsx`, ‏`data/tx/{blocks,codes}.ts`, ‏`app/neo/tx-detail.css` | הדוח של הסוכן; צילומים של IW31, ‏CO02, ‏IQ01, ‏MB1A ו־CMOD ב־1440 וב־390, יום ולילה, ב־`mig/agentA/` |
| B | general-purpose | אובייקטים וטבלאות: ‏`/object/` (186) ו־`/impact/` (105) | `object-workspace` וה־libs ← `components/neo-shell/object/**`, ‏`tables-detail-view.tsx` | ‏`/impact/` עלה מ־0.58 ל־0.98, ו־104 מתוך 106 ב־1.0. ‏`/object/` עלה מ־0.25 ל־0.91: הבלופרינט ב־0.996 והמאומתים ב־1.0. 65 עמודי HR/BW נשארו ב־0.76 בכוונה: משפטי הסיכום הנגזרים שלהם סתרו את הנתונים ("רדיוס השפעה 0" ליד רשימת קשרים, "ללא שינוי" מול הערת S/4). תנועה #38 תוקנה. | `object-view.tsx`, ‏`object-aux-view.tsx`, ‏`object-data.ts`, ‏`object-profile{,-view}.ts(x)`, ‏`tables-detail{,-view}.ts(x)`, ‏`app/neo/{object,tables-detail}.css` | הדוח של הסוכן; ‏`check.py` חי על כל העמודים |
| C | general-purpose | רפרנס: ‏`/bapi/` (148), ‏`/idoc/`, ‏`/cds/` (40), ‏`/fiori-apps/` (35), ‏`/enhancements/` (14) | ← `components/neo-shell/reference/**` | ‏BAPI עלה מ־0.44 ל־0.997, ‏CDS מ־0.75 ל־0.9996. ‏Fiori וההרחבות ב־1.0, בניכוי תווית Ask-NEO. ‏IDoc ב־0.95, כרום בלבד. לא הועברו שתי הנחיות שגויות: "חפש ב־SE37" עבור Control Recipe, ו־Function Module עבור IDoc. שדה הקטלוג הוא סינון רשימה. 27 Exits מקושרים, ו־`txSet` כולל את 31 הקודים. נמצא לבדיקה: מרכז ה־Fiori עם אינדקס של 1,450 שוקל כ־1.6MB. | `reference/**` (ובהם `profile.ts` ו־`ref-more.tsx` החדשים), ‏`app/neo/reference.css`, ‏`app/neo/{bapi,fiori-apps,enhancements}/page.tsx` | הדוח של הסוכן; ‏`check.py` חי על כל העמודים |
| D | general-purpose | תקלות, מושגים, מרכזים ותחומים | ← `incident-view`, ‏`concept-view`, ‏`centers/**`, ‏`domain/**` | ‏`/resolution/` עלה מ־0.72 ל־0.98, ו־`/troubleshooting/` מ־0.94 ל־1.0. המרכזים ב־1.0, והתחומים והמושגים ב־1.0 בניכוי שבב AskAI. משפט מניעה גנרי שהיה קבוע בקוד הישן לא הועבר. "ראו גם" חובר ב־4 מרכזים לעמודי E. תנועה #58 תוקנה. נמצא: ‏`/fiori/` ו־`/integration/` הם קורסים, ועברו ל־H. | `learn/incident*`, ‏`knowledge-surface`, ‏`centers/**`, ‏`domain/**`, ‏`app/neo/learn-records.css` | הדוח של הסוכן; 156 עמודי תקלה ו־38 יעדים חדשים מחזירים 200; ‏Playwright ב־1440 וב־390 |
| E | general-purpose | עמודי NEO חדשים למשפחות בלי עמוד: ‏exits, ‏sap-notes, ‏solutions, ‏ecc-s4, ‏oic, ‏qa-testing, ‏security, ‏process-explorer, ‏guides, ‏process, ‏story | נתוני המשפחות הישנות ← `app/neo/<family>/**` וערכת רשומה משותפת | ל־171 העמודים הישנים יש עמוד NEO בכתובתם הישנה. השקילות עלתה בממוצע מ־0.13 ל־0.9993, ו־168 מתוך 171 ב־0.98 ומעלה. שלושת האחרים חסרים כרום בלבד: מוני התקדמות, "הקודם/הבא". 790 הפניות פנימיות, כולן לעמודי NEO קיימים. | `components/neo-shell/records/**` (ערכה, ‏links, ‏common, ומתאם לכל משפחה), ‏`app/neo/{11 משפחות}/**`, ‏`app/neo/records.css`, ו־`/neo/process/` כעמוד אינדקס חדש | הדוח של הסוכן; `mig/check.py` על כל העמודים; Playwright על 8 עמודים ב־1280 וב־390: 0 גלילה אופקית, ‏h1 אחד |
| F | general-purpose | ספרייה ו־Academy אחד־לאחד: 340 אובייקטי PP, דפי רפרנס, דוחות איכות, פרקים, ספרים, ‏`/learn/` ומעטפות שיעור | `lib/pp-object-index.ts`, ‏`data/learn/paths`, ‏`lib/academy/model.ts` ← `app/neo/academy/**`, ‏`books/**` | מיפוי של 989 כתובות: 983 exact ו־6 intentional_alias (`mig/F-mapping.csv`). ממצא מרכזי: ספרי הלימוד של PP, ‏PM ו־QM מעולם לא הועברו לשיעורים, למרות ש־PR-10 טען שהועברו. עכשיו הם מוצגים במלואם, כל צומת עם 18 ההיבטים. השקילות: אובייקטי PP ‏1.0 על 340, רפרנס ודוחות איכות 1.0, נחיתות הספרים 1.0, ‏`/learn/<id>/` ‏1.0. בשיעורים, המטרה מופיעה לפני תיבת ההתקדמות. תנועה #46 ו־#48 תוקנו. | `app/neo/academy/[courseId]/{textbook,objects}/**`, ‏`academy/{fiori,tracks}/**`, ‏`components/neo-shell/academy-ref/**`, קבצי `books/**`, ענפי הספרייה במחולל ההפניות | `mig/F-mapping.csv`; הדוח של הסוכן; 515 עמודים מחזירים 200 בשרת הפיתוח |
| G | general-purpose | מקטעי מודול: ‏`/pm/<section>/` ו־`/pp-pi/<section>/` (30) | `components/module-section.tsx` ← `app/neo/[hub]/[section]/` | ל־30 העמודים יש עמוד NEO. ‏`/pm/` עלה מ־0.37 ל־0.9986, ו־`/pp-pi/` מ־0.29 ל־0.9984. ‏26 עמודים ב־1.0, ו־4 בין 0.977 ל־0.998, כרום בלבד. נוספו: תנאי JOIN, חמש קבוצות הכרעה של S/4 (בעמוד הישן היו שלוש), וגיליונות הבלופרינט במלואם. נמצא: בעמוד המודול רק 3 שורות גיליון ב־HTML; תוקן, וכל השורות נמצאות ב־`<details>`. | `app/neo/[hub]/[section]/page.tsx`, ‏`components/neo-shell/module-sections/**`, ‏`app/neo/module-sections.css` | הדוח של הסוכן; Playwright על 30 העמודים ב־390 וב־1440: 0 גלילה אופקית ו־h1 אחד |
| H | general-purpose | כלים ולוחות: ‏alm, ‏delivery, ‏onboarding, ‏evolution, ‏notes-graph, ‏verification, ‏quality-audit, ‏connector, ‏import, ‏workbench, ‏knowledge/coverage, ‏sap-infrastructure; וגם קורסי fiori ו־integration | `app/<tool>/**` ← `app/neo/<tool>/**` | ‏19 עמודים מדויקים ב־1.0, ובממוצע 0.9996 על 18 עמודים עם טקסט. כל טקסט בכל נושא של ארבעת הקורסים נבדק: 0 חסר. שני intentional alias: ‏`/lineage/` ← `/neo/object/EQUI/`, ו־`/graph/` ← `/neo/erd/`. ‏`/design/*` ממשיך להפנות ל־`/neo/` כפרישה מכוונת. נמצא באג בסדר הכללים במחולל, ותוקן. | `components/neo-shell/tools/**`, ‏`app/neo/{14 נתיבים}/**`, ‏`app/neo/tools.css` | ‏`mig/H-decisions.csv`; 427 קישורים פנימיים מחזירים 200; 0 שגיאות קונסול ב־15 עמודים |
