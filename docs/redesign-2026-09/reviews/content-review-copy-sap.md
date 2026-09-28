# סקירת תוכן SAP · שורות SAP=כן בביקורת הנוסח

**תאריך:** 2026-09-29 · **עץ עבודה:** `/Users/salihalif/Desktop/My-Projects/neo-redesign` (ענף `design/neo-experience-redesign`, HEAD `cd95f6c7`) · **בודק:** neo-sap-content-quality-reviewer · זה הקובץ היחיד שנכתב בסקירה.

**היקף:** 25 שורות מתוך `docs/redesign-2026-09/copy-audit-candidates.md`: 24 השורות שמסומנות SAP=כן, ושורה 126, שמסומנת שם "לא" אבל נוגעת באוצר המילים של סיכון S/4HANA ולכן נכללה לפי הבקשה.

**קיצור:** `cns/` = `components/neo-shell/`. `N` = מספר שנגזר מהנתונים. `X` = שם אובייקט דינמי.

**שיטה:**
1. כל מיקום שצוטט נקרא ב-HEAD עם הסביבה שלו, וגם הקוד שגוזר את הערך שמוצג בו.
2. כל טענת SAP נבדקה מול נתוני הפרויקט: `data/sapData.pm.ts` ו-`data/sapData.pppi.ts` (כולל הגיליונות `ppvs`, `config`, `customCode`, `tools`, `simplification`), `lib/s4-class.ts`, `lib/evidence/types.ts`, `lib/evidence/s4-status.ts`, `lib/s4.ts`, `data/s4-impact.ts`, `data/s4-objects.ts`, `data/ecc-s4.ts`, `data/tx-intel.ts`, `data/exits.ts`, `data/fiori/apps.ts`, `lib/bapi-registry.ts`, `lib/s4-readiness.ts`, `public/sap-infrastructure/dataset.json` ורשומות האימות ב-`data/verification/`.
3. ספירות נמדדו בסקריפט (טעינת קובצי TS דרך jiti). מה שמוצג בפועל נבדק ב-`out/` הקיים (בנייה מ-2026-09-28). לא נפתח דפדפן, ולא בוצעה בדיקה במערכת SAP חיה: כל קביעה כאן מבוססת קובץ.

**עבודה מקבילה:** בזמן הסקירה רץ על עץ העבודה סבב נוסח לשורות שאינן SAP (56 קבצים שונו, בלי commit). הסקירה נעשתה מול HEAD. שתי שורות SAP כבר שונו באותו סבב (ממצא 16).

**סיכום החלטות:** APPROVE ‏8 · APPROVE WITH CHANGE ‏17 · REJECT ‏0. בתוך שורה 12 נדחה חלק אחד (`cns/search/build.ts:27` נשאר כמו שהוא).

## 1. החלטות לפי שורה

| שורה | קובץ:שורה | נוכחי | מוצע | החלטה | נוסח מאושר | נימוק |
|---|---|---|---|---|---|---|
| 10 | cns/nav-data.ts:72, 146, 283; cns/mod-var.ts:30; cns/erd/model.ts:185; cns/learn/mod.ts:55; cns/data/tx-detail.ts:166; cns/books/books-data.ts:48 (ועוד 20 מיקומים, סעיף 3) | PP-PI · תעשיות תהליכיות | PP-PI · ייצור תהליכי; בכותרות אפשר "תכנון ייצור לתעשיות תהליכיות" | APPROVE WITH CHANGE | בכל תווית ובכל כותרת: "PP-PI · ייצור תהליכי". השם המלא "תכנון ייצור לתעשיות תהליכיות (PP-PI)" רק בפרוזה ובמטא-דאטה שמציגים את המודול, לא בכותרות, כדי שיהיה שם אחד בממשק | פסיקה מלאה בסעיף 4. הבלופרינט עצמו כותב "SAP PP-PI - ייצור תהליכי (Process)" ומפריד בין סוג הייצור לבין הענפים |
| 11 | cns/nav-data.ts:163; app/neo/s4-readiness/page.tsx:15; cns/s4/s4-view.tsx:338 | בסרגל "מוכנות ל-S/4HANA", בכותרת העמוד "כיסוי תיעוד למעבר ל-S/4HANA" | "כיסוי תיעוד ל-S/4HANA" בסרגל ובעמוד | APPROVE WITH CHANGE | nav-data.ts:163: "כיסוי תיעוד למעבר" (כותרת הקבוצה "המעבר ל-S/4HANA" כבר מעליו). cns/nav-context/fallbacks.ts:48, אותה מחרוזת שלא צוינה בביקורת: "כיסוי תיעוד למעבר ל-S/4HANA". page.tsx:15 ו-s4-view.tsx:338 נשארים "כיסוי תיעוד למעבר ל-S/4HANA" | "מוכנות" מרמזת על SAP Readiness Check, והעמוד עצמו אומר שהציון מודד כיסוי תיעוד בלבד ואינו מחליף אותו (s4-view.tsx:357). בלי "למעבר", "כיסוי תיעוד ל-S/4HANA" נקרא כתיעוד של S/4HANA עצמו |
| 12 | cns/nav-data.ts:174; cns/search/build.ts:27; app/neo/bapi/page.tsx:22; app/neo/bapi/[name]/page.tsx:23 | "אובייקטי פונקציה" (מונה ו-title), "מודול פונקציה" (סוג תוצאה בחיפוש), "BAPIs ומודולי פונקציה" (title) | "BAPI ו-FM" בתוויות קצרות, "BAPI ומודולי פונקציה" בכותרות, בלי "BAPIs" | APPROVE WITH CHANGE | nav-data.ts:174: countLabel "BAPI ו-FM", בתנאי שהמונה יספור BAPI ו-FM בלבד (142, כמו הקטלוג) ולא funcRegistry().length ‏(147). build.ts:27: נשאר "מודול פונקציה" (החלק הזה נדחה). bapi/page.tsx:22: "BAPI ומודולי פונקציה · Project NEO". bapi/[name]/page.tsx:23, 27: במקום "אובייקט פונקציה", סוג הרשומה ("BAPI", "מודול פונקציה" או "מושג תהליכי"); כשהרשומה חסרה: "BAPI ומודולי פונקציה · Project NEO". אותו מונח גם ב-cns/reference/bapi-data.ts:269, 274-276, cns/domain/domain-view.tsx:74, 151, 186, 277, cns/best-practices/bp-data.ts:45 ו-cns/nav-data.ts:429 ("BAPI או FM" כשהסוג לא ידוע) | BAPI ו-FM הם המונחים של SAP; "אובייקט פונקציה" הוא מונח פנימי. תוצאה אחת מסוג func היא מודול פונקציה, ולכן התווית שם נכונה ו"BAPI ו-FM" היה שגוי לרשומה בודדת. המונה בסרגל כולל את BOMMAT, ‏LOIPRO ו-MATMAS (סוגי הודעות IDoc) ושני מושגים תהליכיים, ולכן "147 BAPI ו-FM" יהיה מספר לא נכון (ממצא 6) |
| 39 | app/neo/s4-readiness/page.tsx:16 | ציון מוכנות לכל מודול ו-N נושאי שינוי ECC → S/4HANA, עם סטטוס, Fiori, CDS והשפעת המעבר. | ציון כיסוי תיעוד לכל מודול ו-N נושאי שינוי במעבר מ-ECC ל-S/4HANA: סטטוס, Fiori, CDS והשפעת המעבר. | APPROVE | כמו ההצעה | תואם לכותרת העמוד ולמה שהציון מודד. לכל נושא ב-data/ecc-s4.ts יש סטטוס והשפעת מעבר, ולחלקם Fiori או CDS |
| 40 | app/neo/fiori-apps/page.tsx:14 | …והטרנזקציות ב-SAP GUI שכל יישום מחליף. | …והטרנזקציות ב-SAP GUI הקשורות לכל יישום. | APPROVE | כמו ההצעה | guiTx מוגדר כ-"backend transactions" (lib/fiori/types.ts:37), והרשומות ב-data/fiori/apps.ts מבחינות בין טרנזקציה מובילה לקשורה לפי ספריית ה-Fiori (למשל IP30 ו-IP30H), לא "מוחלפת". טרנזקציית GUI שיש לה חלופת Fiori ממשיכה לפעול (lib/evidence/s4-status.ts:43), כך ש"מחליף" מחזק את העובדה. אותה טעות גם ב-fiori-data.ts:170 (ממצא 14) |
| 41 | app/neo/erd/page.tsx:16 | …קרדינליות וניסוחי JOIN כפי שנרשמו בתיעוד. | …קרדינליות ותנאי JOIN מתיעוד הפרויקט. | APPROVE | כמו ההצעה | השדה join ב-SAPRelation הוא תנאי ה-ON של הקשר (lib/types.ts:35, למשל IFLOS.TPLNR = IFLOT.TPLNR). על "N מודולי SAP" באותה שורה ראו ממצא 19 |
| 53 | app/neo/page.tsx:272-274 | לכל טבלה מוצמדת הערת ה-S/4HANA מתיעוד הפרויקט, כולל טבלה או טרנזקציה חלופית במקום שבו התיעוד מציין אחת. טבלה ללא סיווג בתיעוד נשארת ללא תווית. | לכל טבלה מוצגת הערת S/4HANA מתיעוד הפרויקט, וכשצוינה חלופה, גם הטבלה או הטרנזקציה החלופית. טבלה שלא סווגה מוצגת בלי תווית. | APPROVE WITH CHANGE | לכל טבלה יש בתיעוד הפרויקט הערת S/4HANA, ולחלקן גם טבלה או טרנזקציה חלופית. טבלה שהתיעוד לא סיווג נשארת בלי תווית. | נמדד: ל-105 מתוך 105 הטבלאות יש הערת S/4HANA, ול-56 חלופה. עמוד הבית לא מציג את ההערות (migrationRows לא מוצג בשום רכיב), ולכן "מוצגת" טוען משהו על התצוגה שלא קורה בעמוד הזה. "שלא סווגה" בלי "התיעוד" מאבד את ייחוס החוסר למקור |
| 56 | app/neo/page.tsx:225, 229; cns/s4/s4-view.tsx:342, 367, 381, 399 | "מוכנות למעבר", "מוכנות לפי מודול", "ציון מוכנות N אחוז", "ציון המוכנות אינו זמין" | "כיסוי תיעוד למעבר", "כיסוי תיעוד לפי מודול", "ציון כיסוי N אחוז" | APPROVE WITH CHANGE | page.tsx:229: "תמונת המעבר". page.tsx:225 (aria-label): "תמונת המעבר ל-S/4HANA לפי תיעוד הפרויקט: פתיחת עמוד כיסוי התיעוד". s4-view.tsx:329 ו-367: "כיסוי תיעוד לפי מודול". s4-view.tsx:342: "ציון כיסוי התיעוד אינו זמין, מכיוון שקטלוג טבלאות SAP לא נטען. N נושאי השינוי מוצגים במלואם." s4-view.tsx:381: "ציון כיסוי תיעוד N אחוז". s4-view.tsx:399: "ציון כיסוי התיעוד אינו זמין: קטלוג טבלאות SAP לא נטען." לא לשנות את "קריטריוני מוכנות" (s4-view.tsx:455, 649-650) | הכרטיס בבית מציג את הכרעות הבלופרינט (מותאם, הוחלף, הוסר ואחוז הטבלאות שמסומנות לשינוי), לא ציון כיסוי. "כיסוי תיעוד" מעל המספרים האלה יתפרש כאחוז כיסוי. "תמונת המעבר" הוא השם שהעמוד כבר נותן לאותו תוכן (כותרת פרק 02, eyebrow של פרק 03). "קריטריוני מוכנות" בקוקפיט המעבר הם קריטריוני מוכנות להגירת נתונים, מושג אחר. ציון הכיסוי עצמו כולל ערך שהוזן ביד (ממצא 4) |
| 58 | cns/workspace/workspace-data.ts:707-708 | ציוד, מיקומים פונקציונליים, הודעות תחזוקה והזמנות תחזוקה, כפי שהם מתועדים בתיעוד הטכני של הפרויקט. כל מספר בעמוד נגזר מהתיעוד. (וב-PP-PI: מתכוני אב, משאבים, הזמנות תהליך ואישורי ביצוע, באותו מבנה) | …לפי התיעוד הטכני של הפרויקט; רשימת האובייקטים לא משתנה | APPROVE WITH CHANGE | PM: "ציוד, מיקומים פונקציונליים, הודעות תחזוקה והזמנות תחזוקה, לפי התיעוד הטכני של הפרויקט." PP-PI: "מתכוני אב, משאבים, פקודות תהליך ואישורי ביצוע, לפי התיעוד הטכני של הפרויקט." | "הזמנות תהליך" היא הצורה החריגה: ב-NEO "פקודת תהליך" מופיעה 15 פעמים ו"הזמנת תהליך" 3, והבלופרינט כותב "פקודת ייצור תהליכית (Process Order)" ו-פק"ע. שאר האובייקטים תואמים לבלופרינט (מתכון 72 מופעים, משאב 43, מיקום פונקציונלי 22). השמטת "כל מספר בעמוד נגזר מהתיעוד" לא מסירה עובדת SAP, והייחוס לתיעוד נשאר. על "הזמנת תחזוקה" ראו ממצא 22 |
| 63 | cns/workspace/workspace-build.tsx:36, 40, 44 | "…כפי שנכתבו בגיליון." / "…כפי שנרשמו בגיליון." (שלוש פעמים) | להשמיט את הסיומת | APPROVE WITH CHANGE | :36 "לכל אובייקט קונפיגורציה: הטרנזקציה, ההסבר הפונקציונלי ותרגום המונחים." :40 "בדיקת הקוד המותאם: User Exits ו-BAdIs, עם סטטוס הבדיקה וההמלצה למעבר ל-S/4HANA." :44 "ערכת הכלים של המיישם ושל Basis: תפקיד כל כלי, מצבו ב-S/4HANA ויישום ה-Fiori הקשור ב-Launchpad." | ההשמטה עצמה נכונה: שורה 71 כבר אומרת שהגיליונות מוצגים כלשונם. אבל שני פרטים לא תואמים לגיליונות. ב-config העמודה היא "טרנזקציה (SPRO/T-code)" והערכים הם כמו "SPRO; OIOA", בלי נתיב IMG, ועמודת המונחים היא "תרגום מונחים (HE = EN)". ב-tools העמודה היא "Fiori App + ID" ורוב הכלים מסומנים "נשמר" (SU01, SM37), כך ש"היישום העוקב" טוען החלפה שהגיליון לא טוען (ממצאים 13, 18) |
| 66 | cns/workspace/workspace-s4.tsx:108-109 | מתוך N הטבלאות הייחודיות של המודול, N מסומנות כמשתנות מהותית במעבר ל-S/4HANA. כל אחת מהן מוצגת כאן במלואה, עם מקור ההכרעה. | N מתוך N טבלאות המודול מסומנות כמשתנות מהותית במעבר ל-S/4HANA. לכל אחת מוצג מקור ההכרעה. | APPROVE WITH CHANGE | N מתוך N טבלאות המודול מסומנות בסיכון גבוה או בינוני במעבר ל-S/4HANA. לכל אחת מוצג מקור ההכרעה. | הרשימה היא d.s4x.changed: טבלאות ש-lib/s4 מסמן בסיכון high או medium (workspace-data.ts:629), חלקן נגזרות מעמודת הבלופרינט באמון partial. "משתנות מהותית" הוא פרשנות חזקה מהנתון; הנוסח המאושר אומר בדיוק מה מסומן, כמו ההערה בשורה 175. השמטת "מוצגת כאן במלואה" נכונה: מוצגות 4 ראשונות והשאר בלחיצה. הסבב המקביל כבר שינה את השורה ל"השונות" (ממצא 16) |
| 73 | cns/data/tables-detail-view.tsx:57; cns/object/object-view.tsx:42; cns/workspace/workspace-s4.tsx:57 | "מבוסס על ידע Simplification List המתוחזק בפרויקט" / "מבוסס על Simplification List המתוחזק בפרויקט" | "מבוסס על ה-Simplification List של הפרויקט", אותו נוסח בשלושת המקומות | APPROVE WITH CHANGE | "מבוסס על שכבת ה-S/4HANA שנערכה בפרויקט", אותו נוסח בשלושת המקומות | ה-Simplification List הוא מסמך של SAP; לפרויקט אין Simplification List משלו, ו"של הפרויקט" מייחס לו אחד. אמון verified ב-lib/s4.ts:9-11 מגיע מ-data/s4-impact.ts: 11 רשומות S4_IMPACT, חלקן עם הפניית Simplification, ו-S4_STABLE, קבוצה של 27 טבלאות בלי שום הפניה ל-Simplification Item (בהן MARC, שהבלופרינט כותב עליו "MRP Live מחליף MRP קלאסי"). הפניות ה-Note נשארות גלויות בכרטיסים ובפרק ההפניות, כך ששום עובדה לא נמחקת |
| 78 | cns/data/tables-detail-view.tsx:267, 394, 445; cns/object/object-view.tsx:106, 352, 401; cns/object/object-aux-view.tsx:255; cns/object/object-orbit.tsx:610; cns/erd/erd-inspector.tsx:463; cns/erd/erd-workspace.tsx:2250 | ניסוחי JOIN / ניסוח JOIN | תנאי JOIN | APPROVE | "תנאי JOIN" בכל המיקומים, וגם cns/object/object-orbit.tsx:633 ("את תנאי ה-JOIN"), שלא צוין בביקורת | הערך הוא תנאי ה-ON של הקשר (lib/types.ts:35), ו"תנאי JOIN" הוא המונח המקצועי. "תנאי" זהה ביחיד ובריבוי, כך שהתחביר בכל מיקום נשמר |
| 82 | cns/reference/bapi-data.ts:352 | מושג תהליכי שהבלופרינט מונה בעמודת הפונקציות של הטבלאות (מקף ארוך) לא מודול פונקציה ולא BAPI. אין לו מזהה fm: והוא אינו נספר בקטלוג הפונקציות; התוכן נשמר כמידע תהליכי. | מושג תהליכי מעמודת הפונקציות בבלופרינט. אינו מודול פונקציה ואינו BAPI, ולכן אינו נספר בקטלוג הפונקציות. | APPROVE | כמו ההצעה | תואם לנתונים: שתי הרשומות מסוג concept ב-data/function-intel.ts ‏(Control Recipe, ‏PPCC1) מוצאות מ-fnRows (bapi-data.ts:253) ולכן לא נספרות. המזהה fm: הוא פנימי |
| 85 | cns/reference/enh-data.ts:143-145 | …ו-N הרחבות בשם מקטלוג PM ו-PP-PI משויכות לטכניקות בעלות אותו שם מנגנון. | …ו-N הרחבות ספציפיות מקטלוג PM ו-PP-PI, משויכות לטכניקה לפי המנגנון שלהן. | APPROVE WITH CHANGE | …ו-N הרחבות ספציפיות מקטלוג ההרחבות של הפרויקט (PM, PP וחוצות מודולים) משויכות לטכניקה לפי סוג המנגנון שלהן. | ב-data/exits.ts יש 27 הרחבות: 13 מתויגות PM, ‏12 PP ו-2 Cross, ואף אחת לא PP-PI. "PM ו-PP-PI" מייחס 12 הרחבות PP ל-PP-PI. את רשימת המודולים עדיף לגזור מ-EXITS[].module. על שיוך ה-BAdIs ראו ממצא 20 |
| 86 | cns/reference/fiori-data.ts:137-139 | N יישומי SAP Fiori המתועדים בפרויקט: מזהה יישום, תפקיד עסקי, קטלוג, שירות OData, תצוגת CDS והטרנזקציות ב-SAP GUI הקשורות לכל יישום (מובילה או קשורה, כפי שספריית ה-Fiori מציינת). זהו הצד של S/4HANA מול מסכי ה-ECC שבתיעוד הטכני. | N יישומי SAP Fiori מתועדים: מזהה, תפקיד עסקי, קטלוג, שירות OData, תצוגת CDS וטרנזקציות SAP GUI קשורות. אלה המסכים של S/4HANA מול מסכי ה-ECC שבתיעוד. | APPROVE WITH CHANGE | N יישומי SAP Fiori המתועדים בפרויקט: מזהה יישום, תפקיד עסקי, קטלוג, שירות OData, תצוגת CDS וטרנזקציות SAP GUI קשורות. זהו הצד של S/4HANA מול מסכי ה-ECC שבתיעוד הטכני. | השמטת הסוגריים נכונה: בחלק מהרשומות guiTx נערך ידנית ולא נלקח מהספרייה (למשל F3951, data/fiori/apps.ts:272), כך ש"כפי שספריית ה-Fiori מציינת" לא נכון לכולן. אבל "אלה המסכים של S/4HANA" אומר שמסכי S/4HANA הם יישומי Fiori, בזמן שטרנזקציות GUI ממשיכות לפעול ב-S/4HANA (lib/evidence/s4-status.ts:43). "מתועדים" בלי "בפרויקט" מאבד את הייחוס |
| 90 | cns/s4/s4-view.tsx:467-468 | …הפניות ל-N טבלאות מקור נבדלות ב-ECC. | …הפניות ל-N טבלאות מקור שונות ב-ECC. | APPROVE | כמו ההצעה | אותה עובדה (49 טבלאות שונות מתוך 56 הפניות, cns/s4/s4-data.ts:14-15), בניסוח טבעי. על שלושת השמות של migration objects ראו ממצא 21 |
| 91 | app/neo/page.tsx:111-113; cns/s4/s4-catalog.tsx:19-22; cns/evidence/status-pill.tsx:35-41; cns/studio/studio-view.tsx:55; cns/erd/erd-workspace.tsx:193-195; cns/domain/domain-data.ts:113-116 | שש קבוצות תוויות למעמד S/4HANA | מילון אחד לכל האתר | APPROVE WITH CHANGE | מילון 1 (סעיף 2) | יש מקור קנוני בקוד (lib/evidence/types.ts), אבל הוא מקבץ משמעויות שונות תחת מילה אחת. שתיים מהקבוצות מוצגות על נתון שגוי: ב-studio הגזירה מעמודה שגויה, וב-s4-catalog ערך הנתונים ממזג אובייקט חדש עם אובייקט שנשמר. לכן החלפת מילים לבדה לא מספיקה (ממצאים 1, 5) |
| 105 | cns/erd/erd-inspector.tsx:278, 297; cns/erd/erd-sheet.tsx:239, 254 | קשר המסומן CARDINALITY_NOT_VERIFIED נרשם במילון הפרויקט עם הורה, ילד ושדות ה-JOIN כשהם קיימים, בלי יחס כמותי; PK/FK או Association לא אומתו מול מקור SAP רשמי. הקו מצויר מקווקו כתלות מתועדת ולא כיחס מחייב. | קשר בלי קרדינליות מאומתת: רשום בתיעוד הפרויקט (אב, בן ושדות JOIN כשיש), אבל PK/FK או Association לא אומתו מול מקור SAP רשמי. הקו המקווקו מסמן תלות מתועדת, לא יחס מחייב. | APPROVE WITH CHANGE | :297 ו-:254: להסיר את שבב הקוד CARDINALITY_NOT_VERIFIED; השבב שלידו כבר כתוב "קרדינליות לא צוינה" (REL_HE.unstated). :278 ו-:239, נוסח אחד: "בקשר שמסומן «קרדינליות לא צוינה», תיעוד הפרויקט רושם אב, בן ושדות JOIN כשהם קיימים, אבל לא את הקרדינליות, ו-PK/FK או Association לא אומתו מול מקור SAP רשמי. הקו המקווקו מסמן תלות מתועדת, לא יחס מחייב." | הקוד מופיע בדיוק כשהשדה card ריק (cns/erd/erd-catalog.ts:201-206, 323-324), כלומר התיעוד לא מציין קרדינליות בכלל: 108 קשרים ב-dataset.json, וכל 194 הקשרים של PP-PI. "בלי קרדינליות מאומתת" רומז שקיימת קרדינליות שלא אומתה, וזו עובדה אחרת. "אב/בן" תואם לשאר האתר (object-view.tsx:356, tables-detail-view.tsx:397) |
| 106 | cns/erd/erd-workspace.tsx:2994 | תג הקרדינליות על הקו מוצג כלשונו מהמאגר: 1:1 · 1:N · N:1 · N:N. … | לעטוף את הערכים בבידוד LTR | APPROVE | כמו ההצעה, כל ערך בנפרד: `<bdi dir="ltr">1:N</bdi>` | בפסקה RTL הרצף 1:N מוצג כ-N:1, כלומר כיוון הקשר מתהפך לעין. הערכים עצמם נכונים: ב-dataset.json יש N:1 ‏(204), 1:N ‏(63), 1:1 ‏(31), N:N ‏(11). השבבים על הקווים כבר מבודדים (inline-flex עם direction:ltr), ולכן רק שורת המקרא דורשת תיקון |
| 110 | cns/books/books-data.ts:46-55; cns/learn/mod.ts:52-62; cns/data/tx-detail.ts:164-179 | שמות שונים לאותו מודול | מילון שמות מודולים אחד | APPROVE WITH CHANGE | מילון 2 (סעיף 3) | "רכש ואספקה" הוא נושא הספר (Sourcing and Procurement), לא שם המודול MM; "ניהול מחסן" ל-EWM הוא השם של WM; "תכנון מתקדם" אינו שם הקוד PP/DS; "בסיס" הוא תרגום מילולי של שם מוצר |
| 115 | cns/workspace/workspace-s4.tsx:244 | המזהים שנרשמו ב-Simplification List המתוחזק בפרויקט עבור טבלאות המודול. הרשימה כוללת רק מזהים שקיימים בתיעוד הפרויקט. | להשמיט את המשפט השני | APPROVE WITH CHANGE | הפניות SAP Note ו-Simplification שנרשמו בשכבת ה-S/4HANA של הפרויקט עבור טבלאות המודול. | השמטת המשפט השני בסדר. המשפט הראשון צריך את התיקון של שורה 73: הערכים באים מ-st.impact.note של S4_IMPACT (workspace-data.ts:628), למשל "SAP Note 2267140 · MATNR 40" ב-PP-PI ו-"Simplification: MM-IM" ב-PM. הסבב המקביל כבר כתב כאן "Simplification List של הפרויקט", הנוסח שנדחה בשורה 73 (ממצא 16) |
| 121 | cns/data/tx-detail-view.tsx:215 | רשומת הטרנזקציה העוקבת מצהירה על X כטרנזקציה שהוחלפה. הקשר מוצהר במאגר. | לפי המאגר, הטרנזקציה העוקבת מחליפה את X. | APPROVE WITH CHANGE | רשומת הטרנזקציה העוקבת במאגר מציינת את X כטרנזקציה שהוחלפה. (בריבוי: "רשומות הטרנזקציות העוקבות במאגר מציינות את X כטרנזקציה שהוחלפה.") | ההצעה הופכת "הרשומה מצהירה" ל"מחליפה", כלומר מחזקת את הטענה. כאן זה מסוכן במיוחד: היחס נגזר משדה obsolete ב-data/tx-intel.ts ויוצא הפוך או שגוי בעמודים בנויים: BP מוצגת כטרנזקציה שהוחלפה על ידי VD01 ו-VD02, ‏XD01 על ידי XK01, ו-MB01 על ידי MB1A, ‏MB1B, ‏MB1C ו-MB31 (ממצא 3). הנוסח המאושר שומר את הייחוס לרשומה ומסיר את המשפט הכפול |
| 123 | cns/evidence/evidence-block.tsx:31 | פריט פישוט (Simplification Item) | Simplification Item | APPROVE | כמו ההצעה | זה סוג מקור ברשימה שכולה שמות SAP באנגלית (SAP Help Portal, ‏SAP Note, ‏SAP KBA). "Simplification Item" הוא המונח של SAP, ו"פריט פישוט" אינו מונח SAP. לאחד גם את הצורות האחרות (ממצא 23) |
| 126 | cns/s4/s4-catalog.tsx:15; cns/s4/s4-view.tsx:39 מול cns/workspace/workspace-s4.tsx:97; cns/erd/erd-types.ts:215 | "סיכון נמוך" מול "יציב" לאותה רמה | מונח אחד | APPROVE WITH CHANGE | low: "סיכון נמוך". none: "ללא הערכת סיכון" (במקום "לא ידוע", workspace-s4.tsx:98). מקור אחד: RISK_HE ב-lib/s4.ts:32, מיובא במקום ארבעת העותקים המקומיים (s4-catalog.tsx:15, s4-view.tsx:39, erd-types.ts:212-216, workspace-s4.tsx:94-99) | הפרויקט כבר הכריע ב-lib/s4.ts:26-32: "יציב" נקרא כסטטוס S/4HANA לצד סטטוס אחר (ממצא AFKO של ביקורת העיצוב), ולכן סיכון וסטטוס הם שני אוצרות מילים נפרדים |

## 2. מילון 1 · מעמד S/4HANA (שורה 91)

**המקור הקנוני שכבר קיים:** `lib/evidence/types.ts`, עם 14 מפתחות (S4_STATUS_HE) ושבע קבוצות קריאה (S4_STATUS_GROUP), ו-`cns/evidence/status-pill.tsx` שמצייר אותם. כל אוצר מילים ישן כבר ממופה למפתחות האלה ב-`lib/evidence/s4-status.ts` (fromBlueprintClass, fromS4Object, fromLifecycle, fromChangeStatus, fromTxDisposition, fromFuncRegistry, fromEccS4Block, fromVStatus). ביקורת העיצוב של 14.9 (`audit/ux-2026-09/COVERAGE-MATRIX.md`, שורה S5-3) ו-`BOARD-SPEC.md:43` מבקשות "נשמרת · משתנה · מוחלפת · הוסרה · נדרש אימות". `lib/s4-class.ts` (S4_HE) הוא אוצר המילים של הבלופרינט עצמו, ונכנס למפתחות דרך fromBlueprintClass.

**ההכרעה:** מילון אחד. לכל מעמד מפתח קנוני אחד, ולכל מפתח מילה קצרה אחת (לתגים, מקראות, מסננים ופילוחים) ותווית מלאה אחת (StatusPill). שום משטח לא מחזיק רשימת מילים משלו: כל משטח ממפה את הנתון שלו למפתח ומציג את המילה מהמילון.

**מין דקדוקי:** המילים הקצרות בזכר, כצורה ניטרלית. ה-pill מסמן גם רשומות בזכר (BAPI, מודול פונקציה, יישום Fiori, IDoc, טכניקת הרחבה) ולא רק טבלאות וטרנזקציות, ו"מוחלפת" על מודול פונקציה אינה תקינה. אלה חמש המילים של ביקורת העיצוב בצורה ניטרלית; את BOARD-SPEC.md:43 צריך לעדכן בהתאם (ממצא 17).

| מפתח קנוני | קבוצת קריאה (סמל) | מילה קצרה | תווית מלאה | שינוי מול הקוד היום |
|---|---|---|---|---|
| s4_native | new | חדש ב-S/4HANA (בתג צומת ב-ERD מותר "חדש") | חדש ב-S/4HANA | אין |
| unchanged | keeps | נשמר | נשמר ב-S/4HANA | התווית המלאה היום "ללא שינוי ב-S/4HANA" (ממצא 9). כשהמקור כותב "ללא שינוי", המילים שלו נשארות בשורת ההסבר |
| released_api_available | keeps | נשמר | קיים API משוחרר | אין |
| fiori_alternative_available | keeps | נשמר | קיימת חלופת Fiori | עובר מ-moves ("מוחלף") ל-keeps |
| changed | changes | משתנה | משתנה ב-S/4HANA | אין |
| simplified | changes | משתנה | Simplification Item | התווית היום "פריט פישוט (Simplification Item)" |
| restricted | changes (סמל בלבד) | מוגבל | מוגבל ב-S/4HANA | מילה משלו; ב-ERD מוצג היום "משתנה" |
| replaced | moves | מוחלף | הוחלף ב-S/4HANA | אין |
| deprecated | קבוצה חדשה: לא אסטרטגי (סמל לבחירת העיצוב) | לא אסטרטגי | לא אסטרטגי ב-S/4HANA | יוצא מ-gone ("הוסר") |
| compatibility_scope | לא אסטרטגי | לא אסטרטגי | בהיקף תאימות (Compatibility Scope) | יוצא מ-changes ("משתנה") |
| not_available | gone | הוסר | לא זמין ב-S/4HANA | אין |
| legacy_ecc_only | past | ECC בלבד | ECC בלבד | ב-ERD מוצג היום "הוסרה" |
| verification_required | open | נדרש אימות | נדרש אימות נוסף | כשהמקור הוא הבלופרינט, שורת ההסבר "לא הוכרע במקור" |
| not_applicable | open (סמל בלבד) | לא רלוונטי | לא רלוונטי | הטולטיפ היום "נדרש אימות" |

**משמעויות שאסור למזג:**
- "לא אסטרטגי" אינו "הוסר". deprecated ו-compatibility_scope קיימים ב-S/4HANA; not_available לא. כך גם רשימת הפישוט של SAP מבחינה בין פונקציונליות שאינה זמינה לבין פונקציונליות שאינה אסטרטגית.
- "קיימת חלופת Fiori" אינה "מוחלף": מסך ה-GUI ממשיך לפעול (s4-status.ts:43).
- "מוגבל" אינו "משתנה": אובייקט פנימי שאינו משוחרר לשימוש כממשק (s4-status.ts:39).
- "לא רלוונטי" אינו "נדרש אימות": השם אינו אובייקט SAP תקני (s4-status.ts:47).
- "ECC בלבד" אינו "הוסר".
- "ללא שינוי" של הבלופרינט חזק מ"נשמר", ולכן הוא נשאר בשורת ההסבר ולא נמחק.
- "הוסר או אינו אסטרטגי" (domain-data.ts:116), "הוסר/לא מומלץ" (data/ecc-s4.ts:22) והערך Deprecated ב-data/ecc-s4.ts מחזיקים שתי עובדות שונות, ולכן לא ממופים בגוש לאף אחת מהן (ממצא 12).
- "נשאר" ב-data/s4-objects.ts כולל את MATDOC ו-ACDOCA, שהם אובייקטים חדשים ב-S/4HANA (ממצא 5).

**מיפוי מכל קבוצת תוויות קיימת**

א. `app/neo/page.tsx:111-113` (עמוד הבית, הכרעת הבלופרינט דרך lib/s4-class):

| תווית היום | מקור | מפתח | מילה במילון |
|---|---|---|---|
| מותאם | s4-class 1 | changed | משתנה |
| הוחלף | s4-class 2 | replaced | מוחלף |
| הוסר | s4-class 3 | not_available | הוסר (0 טבלאות היום) |

ב. `cns/s4/s4-catalog.tsx:19-22`, מתוך `data/s4-objects.ts:24-29`:

| תווית היום | ערך בנתונים | מפתח | מילה במילון |
|---|---|---|---|
| בוטל | removed (6: BSIS, BSID, BSIK, COEP, VBUK, VBUP) | not_available | הוסר. שורת ה-S/4 שמציינת Compatibility View נשארת |
| הוחלף | replaced (5) | replaced | מוחלף |
| השתנה | changed (10) | changed | משתנה |
| נשאר | stays (8) | unchanged | נשמר, חוץ מ-MATDOC ו-ACDOCA (שורת ה-ECC שלהם: "לא קיים"), שהם s4_native, "חדש ב-S/4HANA". משמעות שונה; לא למפות בגוש |

ג. `cns/evidence/status-pill.tsx:35-41` (GROUP_HE, הטולטיפ):

| תווית היום | קבוצה | אחרי המילון |
|---|---|---|
| חדש ב-S/4HANA | new | ללא שינוי |
| נשמר | keeps | ללא שינוי, ומצטרף אליו fiori_alternative_available |
| משתנה | changes | ללא שינוי; restricted מציג "מוגבל", compatibility_scope יוצא |
| מוחלף | moves | ללא שינוי, בלי fiori_alternative_available |
| הוסר | gone | רק not_available. deprecated עובר ל"לא אסטרטגי" (משמעות שונה) |
| ECC בלבד | past | ללא שינוי |
| נדרש אימות | open | ללא שינוי; not_applicable מציג "לא רלוונטי" (משמעות שונה) |

ד. `cns/studio/studio-view.tsx:55`, מתוך `lib/studio-graph.ts:39`:

| תווית היום | איך נגזרת היום | אחרי תיקון הגזירה ל-s4ClassOf |
|---|---|---|
| ללא החלפה מתועדת | s4AltTable ריק ובלי "הוסר/בוטל" בהערה | 0 = נשמר, 1 = משתנה, null = נדרש אימות |
| הוחלפה | s4AltTable לא ריק | 2 = מוחלף |
| הוסרה | ביטוי רגולרי על ההערה | 3 = הוסר |

תנאי: לא להחליף מילים לפני תיקון הגזירה. היום זה ידפיס "מוחלף" על כל 56 טבלאות PM (ממצא 1).

ה. `cns/erd/erd-workspace.tsx:193-195` (S4_WORD, התג על צומת):

| מפתח | מילה היום | אחרי המילון |
|---|---|---|
| changed, simplified | משתנה | משתנה |
| restricted | משתנה | מוגבל (משמעות שונה) |
| compatibility_scope, deprecated | משתנה | לא אסטרטגי (משמעות שונה) |
| fiori_alternative_available, released_api_available | משתנה | בלי תג, כמו כל נשמר (משמעות שונה) |
| replaced | מוחלפת | מוחלף |
| not_available | הוסרה | הוסר |
| legacy_ecc_only | הוסרה | ECC בלבד (משמעות שונה) |
| s4_native | חדשה | חדש |
| verification_required (רק כשנכתב ידנית) | נדרש אימות | נדרש אימות |

ו. `cns/domain/domain-data.ts:113-116` (כותרות של שדות פרוזה בבלוק ECC מול S/4HANA, לא הכרעה לרשומה):

| שדה | כותרת היום | אחרי המילון |
|---|---|---|
| unchanged | ללא שינוי | נשמר |
| changed | משתנה ב-S/4HANA | משתנה ב-S/4HANA |
| replaced | מוחלף | מוחלף |
| deprecated | הוסר או אינו אסטרטגי | נשאר מאוחד: "הוסר או לא אסטרטגי". השדה מכיל פרוזה על שני המצבים, ו-fromEccS4Block (s4-status.ts:246) קורא אותו כ-deprecated בלבד. לא למזג ל"הוסר" |
| simplification | פריט Simplification | Simplification Item |

**קבוצות נוספות שנמצאו, מחוץ לשש, שצריכות את אותו מילון:**
- `data/ecc-s4.ts:21-23` (STATUS_HE, מוצג ב-s4-view.tsx:417): ללא שינוי = נשמר; שונה = משתנה; הוחלף = מוחלף; "הוסר/לא מומלץ" = מעורב: נושא WM הוא לא אסטרטגי ונושא Foreign Trade הוא הוסר. לפצל את הערך בנתונים (ממצא 12); עד אז להציג "הוסר או לא אסטרטגי", לא "לא מומלץ", שחלש מהמונח של SAP.
- `lib/s4-class.ts:54-62` (פילוח ההכרעה ב-workspace-s4 ובבית): ללא שינוי = נשמר (המילה של המקור נשארת בציטוט ב-workspace-s4.tsx:233); מותאם = משתנה; הוחלף = מוחלף; הוסר = הוסר; לא הוכרע במקור = נדרש אימות, עם שורת ההסבר "לא הוכרע במקור".
- `cns/data/tables-surface.tsx:83` (שבב סינון "הוחלף ב-S/4HANA"): "מוחלף", אחרי שהסינון יעבור למעמד הקנוני (ממצא 2).
- `cns/s4/s4-view.tsx:389` ("מוחלף/הוסר"): "מוחלף או הוסר".
- `cns/data/tx-detail.ts:263-267`: אלה שורות הסבר ולא תוויות, ונשארות. superseded = replaced, changed = changed, available = unchanged ("זמינה ב-S/4HANA" תואם ל"נשמר"), unknown = verification_required.
- מחוץ להיקף NEO: `components/ecc-s4-block.tsx:16-24` במעטפת הישנה מחזיק סט נוסף. אם המעטפת הישנה נשארת חיה, ליישר גם אותו.

## 3. מילון 2 · שמות מודולים (שורה 110)

שם אחד לכל קוד. שם מוצר (Basis, ‏Business Warehouse) לא מתורגם. קוד וסדר: "PM · תחזוקת מפעל", הקוד קודם, כמו בסרגל.

| קוד | שם SAP | שם עברי אחד | הערה |
|---|---|---|---|
| PM | Plant Maintenance | תחזוקת מפעל | כבר אחיד |
| PP | Production Planning | תכנון ייצור | בלי "(דיסקרטי)": PP כולל גם MRP, קיבולת וייצור סדרתי |
| PP-PI | Production Planning for Process Industries | ייצור תהליכי | שם מלא, בפרוזה ובמטא-דאטה בלבד: "תכנון ייצור לתעשיות תהליכיות" (סעיף 4) |
| PP/DS | Production Planning and Detailed Scheduling | תכנון ייצור ותזמון מפורט | הקוד בכתיב SAP: PP/DS, לא PP-DS |
| MM | Materials Management | ניהול חומרים | "רכש ואספקה" נשאר נושא הספר, לא שם המודול |
| QM | Quality Management | ניהול איכות | |
| EWM | Extended Warehouse Management | ניהול מחסן מורחב | |
| WM | Warehouse Management | ניהול מחסן | |
| SD | Sales and Distribution | מכירות והפצה | |
| FI | Financial Accounting | חשבונאות פיננסית | |
| CO | Controlling | בקרה | |
| PS | Project System | מערכת פרויקטים | לא "ניהול פרויקטים", שמתנגש עם SAP Portfolio and Project Management |
| LE | Logistics Execution | ביצוע לוגיסטי | |
| CS | Customer Service | שירות לקוחות | |
| HR | Human Resources | משאבי אנוש | |
| S&OP | Sales and Operations Planning | תכנון מכירות ותפעול | קוד אחד: S&OP (לא SOP) |
| Basis | SAP Basis | Basis | שם מוצר |
| BW | SAP Business Warehouse | Business Warehouse | שם מוצר |
| BATCH | Batch Management | ניהול אצוות | רכיב חוצה, לא מודול |
| CLASS | Classification System | מערכת סיווג | רכיב חוצה, לא מודול |
| IDOC | IDoc / ALE | IDoc / ALE | כתיב IDoc |
| PIPO | SAP PI/PO | ממשקי PI/PO | |
| Cross | | חוצה מודולים | בלי מקף |
| PM-User | | תחזוקת מפעל · משתמש עסקי | וריאנט קורס, לא קוד SAP |

ABAP, ‏SECURITY, ‏INTEGRATION, ‏FIORI ו-S/4HANA הם קטגוריות ולא קודי מודול, והתוויות שלהם ("פיתוח", "אבטחה והרשאות", "אינטגרציה", "יישומי Fiori", "יסודות S/4HANA") נשארות.

**מה משתנה (שורות לפי HEAD):**

PP-PI, "תעשיות תהליכיות" ל"ייצור תהליכי":
- `cns/mod-var.ts:30`
- `cns/nav-data.ts:72, 146, 283, 724` (שורה 488 היא lede שאינו מוצג, לפי סעיף 8 בקובץ המועמדים; לשנות יחד עם הקובץ)
- `cns/nav-context/fallbacks.ts:67`
- `cns/search/command-index.ts:141`
- `cns/home/home-data.ts:277, 340`
- `cns/home/home-zones.tsx:37`
- `cns/learn/mod.ts:55`
- `cns/learn/incidents-data.ts:98`
- `cns/learn/cert-pick.tsx:22`
- `cns/learn/cert-data.ts:61`
- `cns/workspace/workspace-data.ts:703` (שורה 704 כבר נושאת את השם האנגלי המלא)
- `cns/books/books-data.ts:48`
- `cns/erd/model.ts:185`
- `cns/data/tx-detail.ts:166`
- `cns/object/object-view.tsx:38`, `cns/domain/domain-hub-list.tsx:15`, `cns/domain/domain-data.ts:104`: "PP-PI · ייצור תהליכי" וגם "PM · תחזוקת מפעל", הקוד קודם
- `lib/s4-readiness.ts:24`
- `public/sap-infrastructure/dataset.json`, ‏modules[PP-PI]: השם העברי "ייצור (מקף בינוני) תעשיית תהליך" ל"ייצור תהליכי", והשם האנגלי "Production (מקף בינוני) Process Industry" ל-"Production Planning for Process Industries" (מוצג ב-ERD)

PP-PI בפרוזה:
- `cns/workspace/workspace-build.tsx:48`: "…בין ייצור בדיד (PP) לייצור תהליכי (PP-PI)…", כמו כותרת הגיליון "PP (בדיד) מול PP-PI (תהליכי)"
- `cns/books/books-data.ts:237`: "…התיעוד הטכני מכסה ייצור תהליכי (PP-PI)…"
- `cns/reference/bapi-data.ts:270`: "…בתחזוקת מפעל (PM) או בייצור תהליכי (PP-PI)…"
- `cns/reference/enh-data.ts:226`: "PP / PP-PI · תכנון ייצור וייצור תהליכי"

שאר הקודים:
- PP: `public/sap-infrastructure/dataset.json` ‏modules[PP]: "תכנון ייצור (דיסקרטי)" ל"תכנון ייצור"
- PP/DS: `cns/books/books-data.ts:49` "תכנון מתקדם", ו-`cns/learn/mod.ts:56` "תכנון ותזמון מפורט", ל"תכנון ייצור ותזמון מפורט"
- MM: `cns/books/books-data.ts:50` "רכש ואספקה" ו-`cns/data/tx-detail.ts:168` "חומרים" ל"ניהול חומרים"
- QM: `cns/data/tx-detail.ts:167` "איכות" ל"ניהול איכות"
- EWM: `cns/books/books-data.ts:52` "ניהול מחסן" ל"ניהול מחסן מורחב"
- SD: `cns/data/tx-detail.ts:169` "מכירות" ל"מכירות והפצה"
- FI: `cns/data/tx-detail.ts:170` "כספים", `lib/s4-readiness.ts:25` ו-dataset.json ‏modules[FI] "הנהלת חשבונות", ל"חשבונאות פיננסית"
- CO: `lib/s4-readiness.ts:25` "בקרת עלויות" ו-dataset.json ‏modules[CO] "בקרה ועלויות" ל"בקרה"
- PS: `cns/data/tx-detail.ts:172` "פרויקטים" ל"מערכת פרויקטים"
- LE: `cns/data/tx-detail.ts:174` "לוגיסטיקה" ל"ביצוע לוגיסטי"
- Basis: `cns/data/tx-detail.ts:176` "בסיס" ל-"Basis"
- IDOC: `lib/s4-readiness.ts:26` "IDOC / ALE" ו-dataset.json ‏modules[IDOC] "מסגרת IDOC" ל-"IDoc / ALE"
- Cross: `cns/learn/mod.ts:62` ו-`cns/learn/incidents-data.ts:100` "חוצה-מודולים" ל"חוצה מודולים"
- PM-User: `cns/learn/mod.ts:53` "תחזוקת מפעל · משתמש" ל"תחזוקת מפעל · משתמש עסקי"
- במעטפת הישנה בלבד, לא NEO: `lib/primary-module.ts:32-34` (MM "ניהול חומרים / מלאי", ‏FI, ‏CO, ‏BW "Analytics") ו-`lib/ai-context.ts:22`

**הערות ביצוע:** יש היום עשר מפות מקומיות. מפה אחת מיוצאת (למשל הרחבת MOD_HE ב-`cns/mod-var.ts`) ומיובאת בכל המקומות תמנע את הסחיפה הבאה. `public/sap-infrastructure/dataset.json` נאפה במקום על ידי `scripts/build-dataset.mjs`, שלא נוגע ב-modules[], ולכן התיקון שם הוא עריכה בקובץ עצמו; `exports/sap-infrastructure-data.json` הוא עותק נפרד.

## 4. פסיקה לשורה 10: "PP-PI · תעשיות תהליכיות"

**הכרעה:** לא מקובל כתווית המודול. התווית הקצרה היא "ייצור תהליכי". "תכנון ייצור לתעשיות תהליכיות" הוא השם המלא, לפרוזה ולמטא-דאטה בלבד.

1. **המקור הקובע כבר הכריע.** הגיליון ppvs בבלופרינט של PP-PI (`data/sapData.pppi.ts`, מתוך `docs/SAP_PPPI_ECC6_to_S4_Migration.xlsx`) נקרא "PP (בדיד) מול PP-PI (תהליכי)", וכותרות העמודות שלו הן "SAP PP - ייצור בדיד (Discrete)" ו-"SAP PP-PI - ייצור תהליכי (Process)".
2. **אותו גיליון מפריד בין הדברים.** שורה 1, "סוג ייצור": "ייצור תהליכי / אצוות ונוזלים". שורה 2, "ענפים אופייניים (Industries)": "מזון ומשקאות, כימיה, פארמה, קוסמטיקה". "תעשיות תהליכיות" הוא שם של ענפים, לא של מודול.
3. **התאמה לשאר התוויות.** "PM · תחזוקת מפעל" ו-"PP · תכנון ייצור" מתארים פונקציה; "תעשיות תהליכיות" מתאר סוג לקוח. "ייצור תהליכי" מתאר את מה שהמודול מנהל ועומד מול "ייצור בדיד" של PP.
4. **שם הרכיב ב-SAP הוא Production Planning for Process Industries** (כך ב-`workspace-data.ts:704` ובנתיבי ה-SPRO בשיעורי האקדמיה שמסומנים verified-docs). התרגום הנאמן, "תכנון ייצור לתעשיות תהליכיות", ארוך מדי לפריט בסרגל ולשבב, והקיצור "תעשיות תהליכיות" משמיט דווקא את החלק הפונקציונלי.
5. **אין כאן מונח חדש.** "ייצור תהליכי" כבר משמש בפרוזה של הפרויקט לאותו מודול (`lib/cross-links.ts:120`, `data/ecc-s4.ts`, `data/function-intel.ts`: "ייצור תהליכי (PP-PI)").

ה-ERD מציג היום גרסה שלישית, "ייצור (מקף בינוני) תעשיית תהליך", מתוך dataset.json; גם היא עוברת ל"ייצור תהליכי" (סעיף 3).

## 5. ממצאים נוספים

| מיקום | חומרה | בעיה | תיקון |
|---|---|---|---|
| 1 · lib/studio-graph.ts:39; cns/studio/studio-view.tsx:55, 495, 521 | BLOCKER | הסטודיו גוזר את מעמד S/4HANA מ-s4AltTable, העמודה ש-lib/s4-class.ts:5-16 מתעד כשגויה. נמדד: כל 56 טבלאות PM מוצגות "הוחלפה", בעוד הבלופרינט מסמן 43 "ללא שינוי", 8 "מותאם" ו-5 "הוחלף"; כל 68 טבלאות PP-PI מוצגות "ללא החלפה מתועדת", כולל BUT000 שהבלופרינט מסמן "הוחלף", 5 "מותאם" ו-11 שלא הוכרעו. מוצג בחלונית ההקשר ובמקרא של מצב "ECC ↔ S/4" | לגזור עם s4ClassOf ולהציג לפי מילון 1; לא להחליף מילים לפני כן |
| 2 · cns/data/tables-surface.tsx:83, 248 | BLOCKER | השבב "הוחלף ב-S/4HANA" מסנן לפי r.s4Alt, כלומר s4AltTable לא ריק. הוא בוחר 56 טבלאות, ו-43 מהן מסומנות בבלופרינט "ללא שינוי" (ב-PM העמודה מחזיקה ערכים כמו "IFLOT (זהה)") | לסנן לפי המעמד הקנוני (r.status.key === "replaced") ולכתוב "מוחלף" |
| 3 · cns/data/tx-detail.ts:197-216, 250-252; cns/data/tx-detail-view.tsx:202-216, 228 | BLOCKER | יחס הטרנזקציה העוקבת נגזר משדה obsolete ב-data/tx-intel.ts ויוצא הפוך או שגוי, באמון verified. /neo/transactions/BP/ כותב ש-BP "הוחלף ב-S/4HANA · מאומת מול נתוני הפרויקט", עם VD01 ו-VD02 כעוקבות, בזמן שהרשומה של VD01 עצמה כותבת שהיא מוחלפת ב-BP. ל-XD01 מוצגת עוקבת XK01, והרשומה של XD01 עצמה מפנה ל-BP. ל-MB01 מוצגות MB1A, ‏MB1B, ‏MB1C ו-MB31, והרשומות שלהן עצמן כותבות "הוחלפה ב-S/4HANA ב-MIGO" ו"אינה נתמכת ב-S/4HANA". ל-VF05N מוצגת VF05 (דורש אימות). "טרנזקציות שהוחלפו על ידה" חוזר על אותן טעויות בעמודי VD01, ‏VD02, ‏XK01 ו-MB1A | לקבל עוקבת רק כשהרשומה שלה זמינה ב-S/4HANA ואינה מסומנת בעצמה כמוחלפת; לתקן את obsolete של VD01, ‏VD02, ‏XK01, ‏MB1A, ‏MB1B, ‏MB1C, ‏MB31 ו-VF05 בנתיב שמצוין בכותרת data/tx-intel.ts; עד אז אמון partial ולא verified |
| 4 · lib/s4-readiness.ts:76 (מוצג ב-cns/s4/s4-view.tsx:367-399) | BLOCKER | שורת PIPO: 0 טבלאות, ציון 45 שהוזן ביד, Hybrid, סיכון בינוני, "3-6 שבועות". out/neo/s4-readiness מציג "ממשקי PI/PO · 45". מספר שלא נגזר מנתונים | להסיר את השורה, או להציג "אין נתונים" בלי ציון |
| 5 · data/s4-objects.ts (MATDOC, ACDOCA בסטטוס stays); cns/s4/s4-catalog.tsx:22; lib/evidence/s4-status.ts:108 | BLOCKER | MATDOC ו-ACDOCA מופיעים תחת "נשאר" ב-/neo/s4hana/ (הקבוצה "נשאר 8"), בזמן ששורת ה-ECC שלהם אומרת "לא קיים ב-ECC" ו"לא קיים". fromS4Object ממפה stays ל"ללא שינוי ב-S/4HANA". אובייקט חדש ב-S/4HANA מוצג כמי שנשאר מ-ECC | מעמד s4_native ("חדש ב-S/4HANA") לשניהם, בתיקון נתונים ב-data/s4-objects.ts; stays של השאר ל"נשמר" |
| 6 · cns/nav-data.ts:174 | MAJOR | המונה בסרגל הוא funcRegistry().length = 147: ‏85 FM, ‏59 BAPI ו-3 מסוג IDoc (BOMMAT, ‏LOIPRO, ‏MATMAS), ושניים מה-FM הם המושגים Control Recipe ו-PPCC1. הקטלוג מציג 142 (59 BAPI ו-83 FM). תחת "BAPI ו-FM" המספר 147 שגוי | לספור רק שורות BAPI ו-FM, כמו fnRows ב-bapiDir |
| 7 · cns/s4/s4-view.tsx:341, 357 | MAJOR | תיאור הציון לא תואם ל-lib/s4-readiness.ts:47-48. ה-lede מונה "אומדן עבודת הקוד המותאם", שאינו בציון, ומשמיט את כיסוי הערות S/4HANA (25%). ההערה מונה "מספר הקשרים", שמשפיע רק על המורכבות. רצפת 80 למודולי ענן לא מוזכרת | "הציון משקלל את שיעור הטבלאות עם יישום Fiori (30%), עם תצוגת CDS (30%) ועם הערת S/4HANA (25%), ואת שיעור הטבלאות שאינן מסומנות כמוחלפות או כמוסרות (15%)." ולציין את הרצפה או להסיר אותה |
| 8 · cns/s4/s4-view.tsx:377; lib/s4-readiness.ts:52-56 | MAJOR | הרצועות "S/4 Ready", ‏"Cloud Ready", ‏"Hybrid", ‏"ECC Only" טוענות מוכנות מערכת על ציון של כיסוי תיעוד (CS "S/4 Ready" ב-100, ‏PM "S/4 Ready" ב-86) | להסיר את הרצועה, או רצועות כיסוי בעברית (כיסוי גבוה, בינוני, נמוך) |
| 9 · lib/evidence/types.ts:117 | MAJOR | "ללא שינוי ב-S/4HANA" מוצג גם לרשומות שהמקור שלהן אומר רק זמינה, פעילה, נתמכת או מאומתת כקיימת (s4-status.ts:128, 163, 190, 259-260). זו טענה חזקה מהמקור | תווית מלאה "נשמר ב-S/4HANA"; מילות המקור נשארות בשורת ההסבר |
| 10 · lib/evidence/types.ts:158-173; cns/evidence/status-pill.tsx:34-42 | MAJOR | הקיבוץ ממזג משמעויות שונות: deprecated כ"הוסר", ‏fiori_alternative_available כ"מוחלף", ‏compatibility_scope כ"משתנה", ‏not_applicable כ"נדרש אימות" | מילון 1 |
| 11 · cns/erd/erd-workspace.tsx:193-195 | MAJOR | אותו מפתח קנוני נקרא אחרת ב-ERD ובעמוד הרשומה: deprecated, ‏restricted, ‏compatibility_scope, ‏released_api_available ו-fiori_alternative_available כולם "משתנה"; legacy_ecc_only "הוסרה" | מילון 1, קבוצה ה |
| 12 · data/ecc-s4.ts:22, 127, 148; lib/s4-catalog.ts:10; lib/evidence/s4-status.ts:142-147 | MAJOR | הערך Deprecated מחזיק שתי עובדות: WM אל EWM (שורת ה-S/4 של הנושא: מצב Compatibility, לא אסטרטגי) ו-Foreign Trade (שורת ה-S/4: "SD-FT הוסר"). הקטלוג ממפה אותו ל-removed והשכבה הקנונית ל-deprecated, וכל אחד מהם שגוי לאחד הנושאים | לפצל את הערך בנתונים (הוסר, לא אסטרטגי); עד אז "הוסר או לא אסטרטגי" |
| 13 · cns/workspace/workspace-build.tsx:44 | MAJOR | "היישום העוקב ב-Fiori Launchpad": עמודת הגיליון היא "Fiori App + ID", ורוב הכלים מסומנים "נשמר". המקור לא טוען החלפה | הנוסח המאושר בשורה 63 ("יישום ה-Fiori הקשור") |
| 14 · cns/reference/fiori-data.ts:170 | MAJOR | "…והטרנזקציות המוחלפות שבתיעוד": אותו חיזוק כמו בשורה 40 | "…וטרנזקציות ה-SAP GUI הקשורות" |
| 15 · cns/data/tx-detail-view.tsx:224 | MAJOR | התווית "יישום Fiori עוקב" על כל טרנזקציה עם שדה fiori, גם על MIGO, שהרשומה שלה כותבת שהיא נשארת מרכזית ב-S/4HANA | "יישום Fiori קשור" |
| 16 · cns/workspace/workspace-s4.tsx:108, 244 (עץ העבודה) | MAJOR | סבב הנוסח המקביל שינה שתי שורות SAP לפני הסקירה: ‏108 (שורה 66, דרך שורה 59) ו-244 (שורה 115, דרך שורה 113, שכתבה "Simplification List של הפרויקט", הנוסח שנדחה בשורה 73) | להחיל כאן את הנוסח המאושר של שורות 66 ו-115; שורות 59 ו-113 צריכות לדלג על שורות SAP |
| 17 · docs/redesign-2026-09/BOARD-SPEC.md:43 | MAJOR | מפרט הלוחות: ארבע רמות האימות "מאומת, חלקי, דורש אימות, סתירה" ממזגות "מאומת מול תיעוד SAP רשמי" עם "מאומת מול נתוני הפרויקט" (lib/evidence/types.ts:43-50) ל"מאומת" אחד, כלומר אימות מול נתוני הפרויקט נקרא כאימות רשמי. חמש מילות המעמד בנקבה | רמות VERIFICATION_HE כמו שהן; המילים של מילון 1 |
| 18 · cns/workspace/workspace-build.tsx:36 | MINOR | "נתיב ה-SPRO": בגיליון config אין נתיב IMG, רק "SPRO" וקוד טרנזקציה | הנוסח המאושר בשורה 63 |
| 19 · app/neo/erd/page.tsx:16 | MINOR | "N מודולי SAP" סופר גם את BATCH, ‏CLASS, ‏IDOC ו-PIPO, שהם רכיבים חוצים וטכנולוגיית אינטגרציה, לא מודולים | "N מודולים ורכיבים של SAP" |
| 20 · cns/reference/enh-data.ts:31-45 | MINOR | ההערה בקוד וה-lede אומרים שהשיוך לפי "אותה מילה למנגנון", אבל BAdI ממופה ל-classic-badi לפי בחירה (גם new-badi הוא BAdI). לא רשום אם כל אחד משמונת ה-BAdIs (WORKORDER_UPDATE, ‏NOTIF_EVENT_SAVE, ‏BADI_EAM_TOB, ‏WORKORDER_CONFIRM, ‏WORKORDER_GOODSMVT, ‏MD_PLDORD_POST, ‏MD_ADD_ELEMENTS, ‏MB_MIGO_BADI) הוא קלאסי | לרשום את סוג ה-BAdI לכל הרחבה (דורש אימות במערכת SAP, ‏SE18), או לשייך ל-"BAdI" בלי קלאסי או חדש |
| 21 · cns/s4/s4-view.tsx:467; cns/nav-data.ts:164; data/migration-cockpit.ts | MINOR | migration object של SAP מופיע כ"אובייקטי מעבר", "אובייקטי מיגרציה" ו"אובייקטי הגירה" | מונח אחד: "אובייקטי הגירה" |
| 22 · cns/workspace/workspace-data.ts:707-708 וכל NEO | MINOR | order של SAP: "הזמנת תחזוקה" (15), "פקודת תחזוקה" (5), "פקודת תהליך" (15), "הזמנת תהליך" (3); הבלופרינט כותב פק"ע | החלטת מילון אחת; שורה 58 כבר מיישרת את PP-PI |
| 23 · lib/evidence/types.ts:119; lib/evidence/s4-status.ts:37; cns/domain/domain-data.ts:119; cns/s4/s4-view.tsx:354; cns/workspace/workspace-s4.tsx:201 | MINOR | ארבע צורות: "פריט פישוט (Simplification Item)", "פריט הפישוט", "פריט Simplification", "פריטי Simplification" | "Simplification Item", וברבים "Simplification Items" |
| 24 · cns/data/tables-detail-view.tsx:56-60; cns/object/object-view.tsx:41-45; cns/workspace/workspace-s4.tsx:56-60 | MINOR | TRUST_WHY כתוב שלוש פעמים, עם שורות partial ו-needs שונות ("נדרש אימות במערכת SAP" מול "נדרש אימות נוסף מול SAP"; "הכרעה מאומתת ... במאגר" מול "הכרעה בתיעוד") | ייצוא אחד ב-lib/s4.ts ליד TRUST_HE |
| 25 · cns/object/object-view.tsx:38; cns/domain/domain-hub-list.tsx:15; cns/domain/domain-data.ts:104 | MINOR | "תחזוקת מפעל · PM" (שם קודם) מול "PM · תחזוקת מפעל" (nav-data.ts:145) | הקוד קודם בכל מקום |
| 26 · cns/nav-data.ts:163; cns/s4/s4-view.tsx:408 | MINOR | שלושה מתוך 18 הנושאים ב-data/ecc-s4.ts הם Unchanged (למשל ניהול אצוות), ובכל זאת נקראים "נושאי שינוי" | "נושאי השוואה", או להשאיר ולציין שחלקם ללא שינוי |

**סיכום:** אפשר להחיל את 25 הצעות הנוסח עם הנוסח המאושר כאן (8 כמו שהוצעו, 17 בשינוי). ה-FAIL נובע מגזירות באותן שורות שמפרסמות טענות S/4HANA שגויות (הסטודיו, שבב הטבלאות, הטרנזקציות העוקבות, MATDOC ו-ACDOCA) ומציון מוכנות אחד שהוזן ביד. המקף הארוך היחיד בקובץ הוא בשורת ה-VERDICT, בתבנית שנדרשה.

VERDICT: FAIL — 5 blockers, 12 majors
