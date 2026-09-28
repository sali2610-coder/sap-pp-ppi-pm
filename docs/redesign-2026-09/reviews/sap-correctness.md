# תיקון טענות S/4HANA שגויות · חמשת החוסמים, מילון 1 והממצאים הצמודים

**תאריך:** 2026-09-29 · **עץ עבודה:** `/Users/salihalif/Desktop/My-Projects/neo-redesign` (ענף `design/neo-experience-redesign`) · **קלט:** `docs/redesign-2026-09/reviews/content-review-copy-sap.md` · **בודק עצמי:** neo-sap-content-quality-reviewer, על השינויים שלי בלבד.

**HEAD:** העבודה התחילה ב-`1fe5a3a5`. במהלכה סשן מקביל ביצע commit ‏`255dfec5` (לוחות העיצוב) ומחזיק שינויים שלא נשמרו ב-`app/neo/*.css`, ‏`app/fonts/**`, ‏`app/neo/layout.tsx`, ‏`app/neo/system.css`, ‏`components/neo-shell/neo-shell.tsx`, ‏`components/neo-shell/search/shell-client.tsx`, ‏`components/neo-shell/erd/erd-types.ts` ו-`docs/redesign-2026-09/TOKENS.md`. לא נגעתי באף אחד מהם, וה-commit המקביל לא נגע באף קובץ שלי, כך שמספרי השורות "לפני" כאן נכונים ל-`1fe5a3a5` וגם ל-`255dfec5`. לא בוצע commit.

**שיטה:** כל שורש נמצא בקוד לפני שינוי. לכל חוסם נכתבה בדיקה ב-`test/sap-correctness.test.ts` שקוראת את נתוני המקור (עמודת הבלופרינט, `public/sap-infrastructure/dataset.json`, רשומות הטרנזקציות, קטלוג אובייקטי S/4) ועוברת דרך בוני הדפים עצמם. הבדיקות הורצו על הקוד הישן ונכשלו (סעיף 6), ואחרי התיקון עברו. הדפים שהשתנו רונדרו ל-HTML סטטי (react-dom/server) כדי לבדוק מה הקורא רואה. לא בוצעה בדיקה במערכת SAP חיה: כל קביעה כאן מבוססת קובץ.

## 1. החוסמים

### חוסם 1 · הסטודיו גזר את מעמד S/4HANA מהעמודה הלא נכונה · תוקן

- **שורש:** `lib/studio-graph.ts:39`: ‏`t.s4AltTable ? "replaced" : ...`. הבלופרינט של PM ממלא את עמודת הטבלה החלופית בכל טבלה (למשל "IFLOT (זהה)"), ושל PP-PI באף טבלה. התוויות המקומיות ב-`components/neo-shell/studio/studio-view.tsx:55` ("ללא החלפה מתועדת", "הוחלפה", "הוסרה") הוצגו בחלונית ההקשר (:495) ובמקרא (:521). אותה גזירה הזינה גם את הסטודיו הישן `components/architecture-studio.tsx`.
- **תיקון:** הגזירה המשותפת עברה לעמודת ההכרעה: `fromBlueprintClass(s4ClassOf(t)).status`, והצומת נושא גם את מילת הבלופרינט עצמה (`s4Src`). הסטודיו מציג את המילה מהמילון ומתחתיה שורת הסבר "לפי עמודת S/4HANA בתיעוד המקור: ללא שינוי / מותאם / הוחלף / לא הוכרע במקור". המקרא מציג רק מעמדות שקיימים בתצוגה, עם אותה כותרת מקור. שתי הטבלאות של LO-HU ‏(VEKP, ‏VEPO), שאינן בבלופרינט, נשארות בלי הכרעה ("לאובייקט זה לא קיימת הכרעת מעבר מתועדת"). הסטודיו הישן יושר לאותם מפתחות ומילים.
- **בדיקה:** `blocker 1: the Studio reads the blueprint's S/4HANA verdict, not the alternative-table column`. סופרת את צומתי הטבלאות של `buildHetero` לכל מודול ומשווה ל-`s4Split` על טבלאות המודול בבלופרינט. בנוסף: IFLOT ב-PM הוא unchanged, ‏BUT000 ב-PP-PI הוא replaced.
- **לפני ואחרי:**

| מודול | לפני | אחרי (זהה לעמודת הבלופרינט) |
|---|---|---|
| PM ‏(56 טבלאות) | 56 "הוחלפה" | נשמר 43 · משתנה 8 · מוחלף 5 |
| PP-PI ‏(68 טבלאות) | 68 "ללא החלפה מתועדת" | נשמר 51 · משתנה 5 · מוחלף 1 (BUT000) · נדרש אימות 11 |

- **מגבלה ידועה (לא שקר, אבל פער):** הסטודיו מציג את הכרעת הבלופרינט, כפי שהסקירה קבעה. עמוד הטבלה, רשימת הטבלאות וה-ERD מציגים את המעמד אחרי רשומות האימות המחוברות (`data/verification`). ב-14 צומתי PM וב-29 צומתי PP-PI שני המקורות שונים (למשל AFKO: בבלופרינט "מותאם", ברשומת האימות "נשמר ב-S/4HANA"). כל משטח מציין את מקורו. איחוד מלא דורש החלטה: להעביר לסטודיו מפת מעמדות שנבנית בשרת, כמו `txStatusMap` לטרנזקציות. לא בוצע.

### חוסם 2 · שבב "הוחלף ב-S/4HANA" בעמוד הטבלאות · תוקן

- **שורש:** `components/neo-shell/data/tables-surface.tsx:248`: ‏`if (c === "s4" && !r.s4Alt) return false;`, והתווית ב-:83. אותה גזירה בסיכום `components/neo-shell/data/tables-data.ts:199` ‏(`s4: count((r) => !!r.s4Alt)`). כל שורה כבר נושאת מעמד קנוני (`r.status`, אותו פותר שעמוד הטבלה מציג), אבל השבב קרא עמודה אחרת.
- **תיקון:** הפרדיקט והתוויות עברו לקובץ חדש `components/neo-shell/data/table-caps.ts` (כדי שהשבב, הסיכום והבדיקה יקראו אותו פרדיקט). השבב מסנן לפי `r.status.key === "replaced"` וכתוב "מוחלף" מהמילון. `tables-data.ts` סופר דרך אותו פרדיקט.
- **בדיקה:** `blocker 2: the tables chip keeps exactly the rows whose status is replaced`. השורות שהשבב משאיר שוות לשורות שה-pill שלהן "הוחלף ב-S/4HANA", אף אחת מהן אינה מסומנת "ללא שינוי" בעמודת הבלופרינט, התווית היא מילת המילון, והסיכום שווה למספר השורות.
- **לפני ואחרי:** לפני 56 שורות: לפי עמודת ההכרעה 43 "ללא שינוי", ‏8 "מותאם", ‏5 "הוחלף"; לפי ה-pill שלהן 44 נשמר, 5 נדרש אימות, 3 משתנה, 1 Simplification Item ו-3 הוחלף. אחרי: 3 שורות, COSP, ‏MKPF ו-MSEG, בדיוק השורות שה-pill שלהן "הוחלף ב-S/4HANA". `totals.s4`: ‏56 ל-3.

### חוסם 3 · טרנזקציות עוקבות הפוכות או שגויות, באמון "מאומת" · תוקן בגזירה; תיקון הנתונים חסום: דורש הרשאה נפרדת

- **שורש:** `components/neo-shell/data/tx-detail.ts:196-216` קרא את השדה `obsolete` של `data/tx-intel.ts` הפוך בלי לבדוק את רשומת העוקבת עצמה. :250-252 סימן את הקשר באמון `verified`. :241 הציג את `obsolete` כ"טרנזקציות שהוחלפו על ידה" כמו שהוא, כולל קוד שמפנה לעצמו. :224 (`OBSOLETE_RE`) חיפש "deprecat" בכל מקום בהערה, ולכן "ME22 הישן deprecated" בהערה של ME22N סימן את ME22N עצמה כמוחלפת. התצוגה: `components/neo-shell/data/tx-detail-view.tsx:202-219` ו-:227.
- **שורש בנתונים (לא נערך):** `data/tx-intel.ts` נוצר בתהליך ("the entries block is generated, edit via re-run" בכותרת). השדה `obsolete` שגוי ב: ‏:520 VD01 ‏["BP"], ‏:521 VD02 ‏["BP"], ‏:558 XK01 ‏["XD01"], ‏:331 MB1A, ‏:332 MB1B, ‏:333 MB1C ו-:340 MB31 ‏(כולן ["MB01"]), ‏:527 VF05 ‏["VF05N"]. רשומות שמפנות לעצמן: ‏:555 XD01, ‏:556 XD02, ‏:557 XD03, ‏:522 VD03, ‏:237 IW37, ‏:382 ME24, ‏:383 ME25, ‏:537 VKM4.
- **תיקון (גזירה בלבד):**
  - קשר "S החליפה את C" מתקבל רק כשהרשומה של S עצמה מאפשרת: S אינה C; להערת ה-S/4HANA של S יש פתיח, והוא אינו הכרעת יציאה (`SELF_OUT`: הוחלף, מוחלף, חסומה, אינה נתמכת, לא זמינה, Obsolete ועוד, מעוגן לתחילת ההערה כמו `lib/s4-class`); והערת S אינה ממליצה על C (VF05: ‏"VF05N מומלץ").
  - אותה בדיקה חלה על שני הכיוונים: רשימת העוקבות וגם "טרנזקציות שהוחלפו על ידה".
  - קשר שנקרא הפוך נשאר באמון `partial` עד שהשדה יתוקן במקור, כפי שהסקירה ביקשה.
  - הכרעה מהמילים של הרשומה עצמה נקראת רק מהפתיח שלה (`SELF_OUT` במקום `OBSOLETE_RE`).
- **בדיקה:** `blocker 3: a successor relation points in the direction its records state`. דוגמאות הסקירה (BP, ‏XD01, ‏MB01, ‏VF05N) והכיוון ההפוך (VD01, ‏VD02, ‏XK01, ‏MB1A, ‏VF05, ‏XD01 מול עצמה, MIGO מול MB01); ועל כל 1,818 הקודים: כל עוקבת מופיעה ב-`obsolete` של הקוד, הרשומה שלה אינה פותחת בהכרעת יציאה, אף קוד אינו מחליף את עצמו, ושום קשר הפוך אינו `verified`; ו-ME22N, ‏ME23N, ‏ME31K, ‏ME52N, ‏ME53N אינן מוצגות כמוחלפות.
- **לפני ואחרי (על כל 1,818 הקודים, נמדד בבונה הדף):**

| מדד | לפני | אחרי |
|---|---|---|
| קודים עם עוקבת | 17, מהם 14 באמון "מאומת" | 14, אף אחד "מאומת" |
| BP | הוחלף, עוקבות VD01 ו-VD02, "מאומת מול נתוני הפרויקט" | "אין תיעוד מאומת במאגר", נדרש אימות נוסף |
| XD01 | עוקבת XK01 | בלי עוקבת מהשדה; העוקבת BP מרשומת האימות נשארת בבלוק הראיות |
| MB01 | MB1A, ‏MB1B, ‏MB1C, ‏MB31, ‏MIGO | MIGO |
| VF05N | הוחלף, עוקבת VF05 | בלי עוקבת, נדרש אימות נוסף |
| קודים עם "טרנזקציות שהוחלפו על ידה" | 50 | 34 (16 תוקנו: 8 הפניות עצמיות, BP אצל VD01 ו-VD02, ‏XD01 אצל XK01, ‏MB01 אצל MB1A/B/C ו-MB31, ‏VF05N אצל VF05) |
| ME22N, ‏ME23N, ‏ME31K, ‏ME52N, ‏ME53N | "הוחלף ב-S/4HANA" (העוקבות עצמן) | "נשמר ב-S/4HANA" לפי הפתיח שלהן, "זמין ב-S/4HANA" |

  שינויי מעמד קנוני: 7 (BP, ‏VF05N ו-5 ה-ME). שינויי שורת ה-S/4 בלבד: VD02 ו-VKM4 עברו ל"קיימת טרנזקציה עוקבת" לפי ההערה שלהן ("מוחלף ב-S/4HANA"); המעמד הקנוני שלהן (נדרש אימות, מרשומת אימות) לא השתנה.
- **מה חסום:** תיקון השדה `obsolete` ב-`data/tx-intel.ts` בשורות שלמעלה, דרך ה-workflow שמייצר את הקובץ. אחריו אפשר להחזיר את הקשר ההפוך לאמון `verified`. ל-BP אין רשומה ב-`tx-intel` ואין לו מעמד מחובר ב-`data/verification`, אף שרשומות האימות של VD01, ‏XD01 ו-XK01 מציינות אותו כעוקבת: כתיבת מעמד ל-`tx:BP` היא עבודת מחקר נפרדת.

### חוסם 4 · ציון PI/PO שהוזן ביד · תוקן

- **שורש:** `lib/s4-readiness.ts:76`: שורת PIPO עם 0 טבלאות, ציון 45, ‏Hybrid, סיכון בינוני ו-"3-6 שבועות", כולם בכתב יד. מוצג ב-`components/neo-shell/s4/s4-view.tsx:367-399`. בנוסף :48: רצפת ציון 80 למודולי ענן, מספר שאף טבלה לא מבססת (בפועל לא חלה על אף מודול: HR ‏19 מ-40, ‏47.5%).
- **תיקון:** `computeReadiness` מחשב ציון רק למודול שיש לו לפחות טבלה אחת ב-dataset. `unmeasuredModules` (חדש) מחזיר את המודולים ברשימה שאין להם טבלה. העמוד מציג אותם בשורה בלי ציון, בלי פס ובלי רצועה: "לא מתועד במאגר: אין בו טבלאות של המודול, ולכן לא מחושב לו ציון." הרצפה הוסרה.
- **בדיקה:** `blocker 4: a module with no table in the dataset has no readiness score`. אף מודול עם ציון אינו בלי טבלאות, PIPO אינו ברשימת הציונים, `unmeasuredModules` שווה למודולים שב-`MOD_HE` ואין להם טבלה, וכל ציון שווה לשקלול המתועד בלי תוספת.
- **לפני ואחרי:** PIPO: ‏45 ל"לא מתועד במאגר". מודולים עם ציון: 15 ל-14 (הנתון "מודולים עם ציון"). הציון הכולל 64 לא השתנה (PIPO לא נכלל בו גם קודם). שום ציון אחר לא השתנה.

### חוסם 5 · MATDOC ו-ACDOCA תחת "נשאר" · תוקן

- **שורש:** `data/s4-objects.ts:43` ו-:51 מסווגים את MATDOC ו-ACDOCA כ-`stays`, אף ששורת ה-ECC שלהם היא "לא קיים ב-ECC." ו"לא קיים.". `lib/evidence/s4-status.ts:108` מיפה `stays` ל-unchanged, והקטלוג (`components/neo-shell/s4/s4-catalog.tsx:18-23`, ‏`s4-data.ts:88`) קיבץ לפי הערך הגולמי תחת "נשאר".
- **תיקון (בלי לערוך נתונים):** `fromS4Object` מקבל את שורת ה-ECC של הרשומה; שורה שנפתחת ב"לא קיים" (מעוגן) נותנת `s4_native`, ושורת ההסבר מצטטת אותה. `s4Objects()` גוזר מפתח קנוני לכל אובייקט דרך המיפוי הזה, והקטלוג מקבץ לפי המפתח: הוסר, מוחלף, משתנה, חדש ב-S/4HANA, נשמר.
- **בדיקה:** `blocker 5: an object whose own ECC line says it did not exist in ECC is new in S/4HANA`. כל אובייקט שהשורה שלו "לא קיים" הוא `s4_native` (MATDOC ו-ACDOCA ביניהם), שאר ה-stays הם unchanged, ובקטלוג המוצג קבוצת "נשמר" שווה ל-stays פחות החדשים.
- **לפני ואחרי:** "נשאר 8" ל"חדש ב-S/4HANA 2" (MATDOC, ‏ACDOCA) ו"נשמר 6". שאר הקבוצות: הוסר 6, מוחלף 5, משתנה 10 (ללא שינוי במספרים).

## 2. מילון 1 כפי שהוחל

המקור האחד: `lib/evidence/types.ts`. ‏`S4_STATUS_HE` (תווית מלאה, ה-pill), ‏`S4_STATUS_WORD` (מילה קצרה, חדש), ‏`S4_STATUS_READING` (קבוצת קריאה, 8 קבוצות, חדש), ‏`S4_STATUS_DOT`. ‏`S4_STATUS_GROUP` נגזר עכשיו מ-`S4_STATUS_READING` כהטלה על 7 המשפחות, כי לוחות העיצוב ב-`app/design` (לא נגעתי בהם) מקלידים Record על 7 המשפחות; "לא אסטרטגי" מתקפל שם ל-changes ולעולם לא ל-gone.

| מפתח | קבוצה (סמל) | מילה קצרה | תווית מלאה | שינוי |
|---|---|---|---|---|
| s4_native | new (Sparkles) | חדש ב-S/4HANA (בתג ERD: "חדש") | חדש ב-S/4HANA | אין |
| unchanged | keeps (Check) | נשמר | נשמר ב-S/4HANA | תווית: היה "ללא שינוי ב-S/4HANA" (ממצא 9). מילות המקור נשארות בשורת ההסבר |
| released_api_available | keeps | נשמר | קיים API משוחרר | אין |
| fiori_alternative_available | keeps | נשמר | קיימת חלופת Fiori | עבר מ-moves ל-keeps; נקודה ירוקה במקום כחולה |
| changed | changes (Diff) | משתנה | משתנה ב-S/4HANA | אין |
| simplified | changes | משתנה | Simplification Item | תווית: היה "פריט פישוט (Simplification Item)" |
| restricted | changes (סמל בלבד) | מוגבל | מוגבל ב-S/4HANA | מילה משלו (tooltip וב-ERD) |
| replaced | moves (ArrowRightLeft) | מוחלף | הוחלף ב-S/4HANA | אין |
| deprecated | notStrategic (Hourglass, חדש) | לא אסטרטגי | לא אסטרטגי ב-S/4HANA | יצא מ-gone; נקודה ענברית במקום אדומה |
| compatibility_scope | notStrategic | לא אסטרטגי | בהיקף תאימות (Compatibility Scope) | יצא מ-changes |
| not_available | gone (Ban) | הוסר | לא זמין ב-S/4HANA | אין |
| legacy_ecc_only | past (History) | ECC בלבד | ECC בלבד | ב-ERD היה "הוסרה" |
| verification_required | open (CircleHelp) | נדרש אימות | נדרש אימות נוסף | בבלופרינט שורת ההסבר "לא הוכרע במקור" |
| not_applicable | open (סמל בלבד) | לא רלוונטי | לא רלוונטי | ה-tooltip היה "נדרש אימות" |

**ה-pill:** `components/neo-shell/evidence/status-pill.tsx`: סמל לפי `S4_STATUS_READING`, ‏tooltip לפי המילה הקצרה של המפתח עצמו ולא שם הקבוצה (GROUP_HE נמחק).

**המשטחים ומה השתנה בכל אחד (כל הקבצים שנגעתי בהם):**

| משטח (טבלת מיפוי בסקירה) | קבצים | מה הוחל |
|---|---|---|
| בית (א) | `app/neo/page.tsx`, ‏`components/neo-shell/home/home-data.ts` (הערה) | מותאם, הוחלף, הוסר ל-משתנה, מוחלף, הוסר; הספירה נשארת הכרעת הבלופרינט |
| קטלוג S/4 (ב) | `components/neo-shell/s4/s4-catalog.tsx`, ‏`s4-data.ts`, ‏`s4-view.tsx`, ‏`lib/evidence/s4-status.ts` | בוטל, הוחלף, השתנה, נשאר ל-הוסר, מוחלף, משתנה, נשמר, ועוד "חדש ב-S/4HANA" (MATDOC, ‏ACDOCA). נתוני ה-hero והפתיח של הפרק באותן מילים |
| pill (ג) | `components/neo-shell/evidence/status-pill.tsx`, ‏`lib/evidence/types.ts` | כמו בטבלה |
| סטודיו (ד) | `lib/studio-graph.ts`, ‏`components/neo-shell/studio/studio-view.tsx`, ‏`components/architecture-studio.tsx` (המעטפת הישנה, צרכן של אותה גזירה) | אחרי תיקון הגזירה: נשמר, משתנה, מוחלף, הוסר, נדרש אימות, ומילת הבלופרינט בשורת ההסבר |
| תגי ERD (ה) | `components/neo-shell/erd/erd-workspace.tsx` | מילת המילון; כל מה שנקרא "נשמר" בלי תג; "חדש" ל-s4_native; נדרש אימות רק כשנכתב ידנית. נמדד על 220 הטבלאות: היום משתנה רק "מוחלפת" ל"מוחלף" (6 צמתים) |
| עמוד תחום (ו) | `components/neo-shell/domain/domain-data.ts` | ללא שינוי לנשמר; "הוסר או אינו אסטרטגי" ל"הוסר או לא אסטרטגי", נשאר מאוחד; "פריט Simplification" ל-Simplification Item |
| נושאי השינוי (נוסף) | `components/neo-shell/s4/s4-data.ts` | ללא שינוי, שונה, הוחלף ל-נשמר, משתנה, מוחלף. Deprecated מוצג "הוסר או לא אסטרטגי" ולא ממופה למפתח אחד (סעיף 4) |
| שבב הטבלאות (נוסף) | `components/neo-shell/data/table-caps.ts` | "מוחלף" |
| כיסוי תיעוד (נוסף) | `components/neo-shell/s4/s4-view.tsx` | "מוחלף/הוסר" ל"מוחלף או הוסר" |

**משמעויות שנשמרו נפרדות:** לא אסטרטגי מול הוסר (קבוצה, סמל, צבע ומילה נפרדים); חלופת Fiori מול מוחלף; מוגבל מול משתנה; לא רלוונטי מול נדרש אימות; ECC בלבד מול הוסר; "ללא שינוי" של הבלופרינט נשאר בשורת ההסבר של הסטודיו ובהסבר הנגזר (`fromBlueprintClass`); "הוסר או לא אסטרטגי" בעמוד התחום ובנושאי השינוי לא מוזג ל"הוסר"; MATDOC ו-ACDOCA הופרדו מ"נשמר".

**לא הוחל, בכוונה:**
- `lib/s4-class.ts` ‏`S4_HE` בסביבת המודול (`workspace-s4.tsx`, ‏`workspace-table.tsx`, ‏`module-workspace.tsx`): אוצר המילים של הבלופרינט כלשונו, תחת הכותרת "הכרעת התיעוד לפי עמודת S/4HANA", ומוגן בבדיקה "the validated label set are untouched". החלפתו דורשת לשנות את ההחלטה הזו.
- `components/neo-shell/data/tx-detail.ts:263-267` (לפי הסקירה אלה שורות הסבר ולא תוויות).
- הערך Deprecated בנתונים עצמם, `fromChangeStatus` ו-`lib/s4-catalog.ts:10`: לא סומנו מחדש עד פיצול הנתונים (סעיף 4).
- המעטפת הישנה: `components/ecc-s4-block.tsx`, ‏`components/s4-readiness.tsx` (רצועות "מוכן ל-S/4"), ‏`components/s4-transformation.tsx` ו-`lib/object-graph.ts` (MATDOC עדיין "נשאר ב-S/4" שם), ‏`app/ecc-s4/[slug]/page.tsx` ("פריט פישוט (Simplification Item)"). מחוץ ל-NEO.
- `app/neo/erd.css:1788-1789` צובע את התג של legacy_ecc_only באדום של "הוסר". אין היום אף טבלה ב-ERD עם המעמד הזה, והקובץ בעריכה בסשן המקביל, ולכן לא נגעתי.

## 3. ממצאי MAJOR

| ממצא | מצב | מה נעשה |
|---|---|---|
| 7 · תיאור הציון | תוקן | `s4-view.tsx`: הפתיח כבר לא מונה "אומדן עבודת הקוד המותאם"; ההערה היא הנוסח המאושר בסקירה (Fiori ‏30%, ‏CDS ‏30%, הערת S/4HANA ‏25%, לא מוחלפות ולא מוסרות 15%). הרצפה הוסרה מ-`lib/s4-readiness.ts` |
| 8 · רצועות "S/4 Ready" על ציון כיסוי | תוקן ב-NEO | הרצועה הוסרה מהשורה (`s4-view.tsx:377`) והספירה `bands` מ-`s4-data.ts`. העמוד הישן `components/s4-readiness.tsx` עדיין מציג אותן (מחוץ ל-NEO) |
| 9 · "ללא שינוי ב-S/4HANA" | תוקן | "נשמר ב-S/4HANA" |
| 10 · קיבוץ שממזג משמעויות | תוקן | `S4_STATUS_READING` וה-pill |
| 11 · מילות ה-ERD | תוקן | `s4Word` מהמילון |
| 12 · Deprecated מחזיק שתי עובדות | חלקי; הנתונים חסומים | בתצוגה: "הוסר או לא אסטרטגי". פיצול הנתונים (סעיף 4) |
| 13 · "היישום העוקב" ב-workspace-build | כבר תוקן ב-HEAD | נבדק: "יישום ה-Fiori הקשור" |
| 14 · fiori-data "הטרנזקציות המוחלפות" | תוקן | "וטרנזקציות ה-SAP GUI הקשורות" |
| 15 · "יישום Fiori עוקב" | תוקן | "יישום Fiori קשור" ב-`tx-detail-view.tsx`, וגם באותה טענה ב-`transactions-surface.tsx` (3 מקומות), ‏`app/neo/transactions/page.tsx` (metadata), ‏`workspace-s4.tsx:319` ו-`workspace-ops.tsx:81` ("ויישום ה-Fiori הקשור"; עמודת הגיליון היא "Fiori App + ID") |
| 16 · workspace-s4 ‏108, ‏244 | כבר תוקן ב-HEAD | נבדק: הנוסח המאושר של שורות 66 ו-115 |
| 6 · מונה "BAPI ו-FM" ‏147 מול 142 | לא טופל | `components/neo-shell/nav-data.ts:174`, קוד אחר; לספור רק שורות BAPI ו-FM |
| 17 · BOARD-SPEC.md:43 | לא טופל | מסמך מפרט של הלוחות; לעדכן למילון 1 ולרמות `VERIFICATION_HE` |

ממצאי MINOR ‏18-26 לא טופלו. אחד מהם נוגע במילון: `lib/evidence/s4-status.ts:37` (ACTION_HE ל-simplified) עדיין אומר "פריט הפישוט", ועכשיו הוא מופיע ליד התווית "Simplification Item" באותו בלוק.

## 4. דורש הרשאה נפרדת (נתונים, לא נערכו)

1. `data/tx-intel.ts` (נוצר; לתקן דרך ה-workflow שבכותרת): להסיר את הערכים השגויים ב-`obsolete` בשורות 520, 521, 558, 331, 332, 333, 340 ו-527, ואת ההפניות העצמיות בשורות 555, 556, 557, 522, 237, 382, 383 ו-537. אחרי זה אפשר להחזיר את הקשר ההפוך ל-`verified`.
2. `data/ecc-s4.ts:127` (Warehouse Management → EWM) ו-:148 (Foreign Trade → GTS): לפצל את Deprecated לשני ערכים (לא אסטרטגי, הוסר), ואז למפות כל אחד במקום אחד (`fromChangeStatus`, ‏`lib/s4-catalog.ts:10`) ולהסיר את "הוסר/לא מומלץ" (`data/ecc-s4.ts:21-23`).
3. רשות: `data/s4-objects.ts:43` ו-:51. התצוגה כבר נכונה בזכות שורת ה-ECC; ערך "new" באוצר המילים של הקובץ היה מסיר את הצורך בכלל.
4. `tx:BP`: אין מעמד מחובר; לחקור ולכתוב רשומת אימות.

## 5. בדיקות שהורצו

| בדיקה | תוצאה |
|---|---|
| `./node_modules/.bin/tsc --noEmit --incremental false` | ‏0 שגיאות (כולל `app/design` של הסשן המקביל) |
| `npm run typecheck:test` | ‏0 שגיאות |
| eslint על כל הקבצים ששיניתי | ‏0 שגיאות; 17 אזהרות, כולן קיימות: אותו מספר לכל קובץ ב-HEAD (נבדק דרך stdin) |
| `npm test` | ‏218 מתוך 218 (היו 211: ‏5 בדיקות חוסמים ועוד 2 בבדיקת המילון) |
| `npm run check:evidence` | ‏21 מתוך 21 |
| `node .../books-hash-check.mjs` | `ZERO_CONTENT_LOSS 574/574` |
| `git diff --stat` על הקבצים שלי | ‏25 קבצים ששונו (386+, ‏186-) ו-3 חדשים: `components/neo-shell/data/table-caps.ts`, ‏`test/sap-correctness.test.ts`, ‏`test/app-modules.mjs`. אין נתיב מוגן. ה-diff המלא של עץ העבודה כולל גם את `app/design` ו-`app/fonts`, והם של הסשן המקביל |
| רינדור HTML (react-dom/server) | כיסוי תיעוד: PIPO "לא מתועד במאגר", אין 45%, אין S/4 Ready/Hybrid, ההערה המאושרת, "מוחלף או הוסר", נושאים נשמר 3, משתנה 8, מוחלף 5, "הוסר או לא אסטרטגי" 2. קטלוג: הוסר 6, מוחלף 5, משתנה 10, חדש ב-S/4HANA 2, נשמר 6. טרנזקציות: BP ו-VF05N "אין תיעוד מאומת במאגר", ‏MB01 עוקבת MIGO בלבד, ‏ME22N "נשמר ב-S/4HANA". בית: משתנה, מוחלף, הוסר. שבב הטבלאות: "מוחלף" |

**לא בוצע:** `npm run build` ובדיקה בדפדפן. עץ העבודה משותף עם סשן שעורך עכשיו CSS, גופנים ו-layout, ו-build כותב ל-`out/` ומחדש את `data/ai-tree` (תוצר שצריך לבטל). בנייה ובדיקה חזותית נשארות לשלב הבא, אחרי שהסשן המקביל יסיים.

**הרצה על הקוד הישן:** אחרי חילוץ הפרדיקט של השבב ל-`table-caps.ts` בלי שינוי התנהגות, ולפני כל תיקון, כל חמש הבדיקות נכשלו:

1. `PM: Studio status counts differ from the blueprint column`: ‏actual `{ replaced: 56 }`, expected `{ unchanged: 43, changed: 8, replaced: 5 }`.
2. `the chip must agree with the pill each row shows`: ‏56 שורות מול `[ 'COSP', 'MKPF', 'MSEG' ]`.
3. `VD01 and VD02 say they are replaced BY BP`: ‏actual `[ 'VD01', 'VD02' ]`, expected `[]`.
4. `PIPO shows a score of 45 with no table behind it`.
5. `MATDOC (ECC: לא קיים ב-ECC.) is not shown as new`: ‏actual `'unchanged'`, expected `'s4_native'`.

## 6. סקירה עצמית (neo-sap-content-quality-reviewer, על ה-diff שלי)

| מיקום | חומרה | בעיה | תיקון |
|---|---|---|---|
| `components/neo-shell/studio/studio-view.tsx`, ‏`lib/studio-graph.ts` | MINOR | הסטודיו מציג את הכרעת הבלופרינט (כפי שהסקירה קבעה), ועמוד הטבלה מציג את רשומת האימות: 14 צמתי PM ו-29 צמתי PP-PI שונים (למשל AFKO: משתנה מול נשמר). כל משטח מציין את מקורו, ואין כאן טענה שאינה בנתונים | החלטת מוצר: מפת מעמדות מהשרת לסטודיו, כמו `txStatusMap` |
| `lib/evidence/s4-status.ts:37` | MINOR | ACTION_HE ל-simplified אומר "פריט הפישוט" ליד התווית החדשה "Simplification Item" | ממצא 23 של הסקירה: "Simplification Item" |
| `data/tx-intel.ts` ‏ME52N | MINOR | הפתיח "זמין ב-S/4HANA" קובע עכשיו "נשמר", וההערה מצטטת את שם היישום בספריית Fiori: "Change Purchase Requisition - deprecated" | דורש אימות במערכת SAP (SE93 וספריית Fiori) |
| `tx:BP` | MINOR | אחרי התיקון BP מוצג "נדרש אימות נוסף", כי שום רשומה אינה קובעת את מעמדו | רשומת אימות ל-BP (סעיף 4) |
| `app/neo/erd.css:1788` | MINOR | התג של legacy_ecc_only אדום כמו "הוסר"; המילה כבר "ECC בלבד". לא חל היום על אף טבלה | לצבוע בסגול של past, כשהסשן המקביל יסיים עם הקובץ |
| `app/design/**` (לא נגעתי) | MINOR | הלוחות קוראים את `S4_STATUS_GROUP`: ‏deprecated עבר שם מ-gone ל-changes ו-fiori_alternative_available מ-moves ל-keeps; ה-README של workbench עדיין מתאר את deprecated ב-gone | לעדכן את ה-README של הלוח |

אין בשינויים שלי טבלה, שדה, טרנזקציה, BAPI, קשר, מספר, SAP Note או KBA שאינם בנתונים. כל מספר בדוח נמדד בסקריפט על הקבצים. ECC ו-S/4HANA מופרדים: MATDOC ו-ACDOCA "חדש ב-S/4HANA", ‏BP כבר לא "הוחלף". אין מקף ארוך בטקסט חדש שמוצג לקורא.

VERDICT: PASS

חמשת החוסמים תוקנו בגזירה ובתצוגה וכל אחד מכוסה בבדיקה שנכשלה על הקוד הישן. נשארים ממצאי MINOR ותיקוני נתונים שדורשים הרשאה נפרדת (סעיף 4).
