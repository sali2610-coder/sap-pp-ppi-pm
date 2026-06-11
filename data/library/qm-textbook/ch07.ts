import type { TextbookChapter } from "./types";

// ===== QM Digital Textbook — Chapter 7 =====
// שילוב QM↔PM: ניהול ציוד-בדיקה וכיול (Test Equipment Management / Calibration).
// כל צומת = LearningNode מלא בן 18 מקטעים, עברית מקורית (מתחילים + יועצים).
// היררכיית-המקור נשמרת (ids + סדר), x.y.z מקונן תחת x.y. מזהי-SAP מילוליים.

export const CH7: TextbookChapter = {
  n: 7,
  titleHe: "שילוב עם תחזוקת מפעל (PM) — ניהול ציוד-בדיקה",
  titleEn: "Integrating with Plant Maintenance",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לשילוב בין QM (ניהול-איכות) ל-PM (תחזוקת-מפעל) סביב ניהול ציוד-הבדיקה והכיול (Test Equipment Management / Calibration). הרעיון המרכזי: כדי שתוצאות-בדיקה יהיו אמינות, מכשירי-המדידה עצמם חייבים להיות מכוילים ותקפים. SAP פותר זאת בכך שכל מכשיר-מדידה הופך ל-Equipment ב-PM, מחובר לתוכנית-תחזוקה (Maintenance Plan) המייצרת אוטומטית הזמנת-כיול (Calibration Order), ושלב-הכיול עצמו מבוצע כ-Inspection Lot של QM מסוג Inspection Type 14. כך נסגר המעגל: PM מתזמן, QM בודק ומתעד תוצאות, ובסוף ה-Usage Decision קובע אם המכשיר תקין להמשך-שימוש. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך, דוגמת CBC (כיול ציוד-מעבדה וציוד-קו במפעל-מילוי משקאות), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי-קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 7.1
    {
      id: "7.1",
      titleHe: "החלטה אילו פונקציונליות לממש",
      titleEn: "Deciding which Functionalities to Implement",
      execHe:
        "ניהול ציוד-בדיקה ב-QM אינו פתרון יחיד אלא ספקטרום של אפשרויות-מימוש, התלוי במודולים הנוספים שכבר פעילים בארגון — בעיקר MM (ניהול-חומרים) ו-PM (תחזוקת-מפעל). לפני שכותבים קונפיגורציה אחת, יש להחליט באיזה תרחיש מהארבעה הארגון נמצא, כי ההחלטה קובעת כיצד יוגדר המכשיר (כחומר? כ-Equipment?), כיצד ייווצר הכיול (כהזמנת-PM? ידנית?) וכמה מובנית האוטומציה.",
      beginnerHe:
        "תאר לעצמך שיש לך מכשיר-מדידה שצריך לכייל פעם בשנה. השאלה הראשונה היא: באילו כלים אתה כבר מצויד במערכת? אם יש לך PM (תחזוקת-מפעל), המכשיר יהיה 'ציוד' ש-PM מטפל בו ומתזמן לו כיול אוטומטית. אם אין לך PM, תצטרך לעשות הרבה יותר ידנית. ארבעת התרחישים הם פשוט ארבע תשובות לשאלה 'מה כבר יש לי?': PM בלי MM, PM עם MM, MM בלי PM, ולא זה ולא זה.",
      consultantHe:
        "ההחלטה הארכיטקטונית: ה-Inspection Type 14 (Test Equipment) דורש שהאובייקט-המבוקר יהיה Equipment ב-PM, וה-Calibration Order היא PM Order (סוג-הזמנה PM, לרוב PM05/PM06) שאליה מוצמד אוטומטית ה-Inspection Lot. לכן התרחיש האידיאלי הוא PM+MM: המכשיר = Material עם Serial Number ↔ Equipment מסונכרן, Maintenance Plan מסוג Single-cycle מתזמן את הכיול, וה-Inspection Lot נוצר אוטומטית בשחרור-ההזמנה. ככל שמתרחקים מהתרחיש הזה (אין MM, אין PM) — מאבדים אוטומציה ונדרשים לפתרונות-עוקפים (Inspection Type 13 ידני, ניהול ב-Document וכד'). ה-Best Practice של SAP הוא Test Equipment כ-Equipment ב-PM.",
      purposeHe:
        "המטרה: למפות נכון את נקודת-הפתיחה הארגונית כדי לבחור מסלול-מימוש ריאלי. בחירה שגויה (למשל ניסיון להפעיל Inspection Type 14 בלי PM) תוביל למבוי-סתום קונפיגורטיבי. ההחלטה משפיעה ישירות על היקף-העבודה, על רמת-האוטומציה ועל עלות-הבעלות של הפתרון.",
      processExampleHe:
        "ארגון עם S/4HANA מלא (MM+PM+QM) בוחר בתרחיש 2: כל מכשיר נפתח כ-Material עם Serial Number, מסונכרן אוטומטית ל-Equipment, מקושר ל-General Task List, ול-Maintenance Plan שמתזמן כיול שנתי. בכל מועד-כיול ה-Deadline Monitoring מייצר Calibration Order עם Inspection Lot (type 14), טכנאי רושם תוצאות ב-QGA2, וה-UD קובע 'תקין/לא-תקין'.",
      cbcHe:
        "ב-CBC (מפעל-מילוי משקאות): קיימים MM, PM ו-QM. מכשירי-מעבדה (pH-meter, רפרקטומטר למדידת Brix, מד-CO2) וציוד-קו (מד-מילוי, מד-לחץ, בקרת-משקל) — כולם מכשירי-בדיקה המשפיעים על שחרור-אצווה. לכן CBC בוחר בתרחיש 2 (PM+MM) לכל ציוד-המדידה: כך כל כיול מתועד, מתוזמן ובר-ביקורת מול תקני-מזון ו-ISO.",
      navHe: [
        "Quality Management ► QM in Logistics ► QM in Maintenance ► Test Equipment Management ► Define Scenario / Scope",
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► (Order Type setup for Calibration)",
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Maintain Inspection Types",
      ],
      tables: ["EQUI", "MARA", "TQ08", "T399X"],
      tcodes: ["OQB1", "SM30", "SPRO"],
      fiori: ["F2218", "F1605"],
      configHe: [
        "מפה תחילה את המודולים הפעילים: MM? PM? — זו תשובת-המסד לבחירת-התרחיש.",
        "תרחיש מומלץ (PM+MM): הפעל Inspection Type 14 ושייך אותו לסוג-הזמנת-PM של כיול (PM05/PM06).",
        "ללא PM: שקול Inspection Type 13 (ידני) או ניהול-מסמכים — אך תאבד תזמון ו-Deadline Monitoring.",
        "תעד את ההחלטה כ-Design Decision; שינוי-תרחיש בדיעבד יקר מאוד.",
      ],
      flow: [
        { he: "יש PM?", code: "PM", note: "כן → Equipment-based" },
        { he: "יש MM?", code: "MM", note: "כן → Material+Serial" },
        { he: "בחר תרחיש 1–4", note: "מיפוי מודולים" },
        { he: "תרחיש 2 = מומלץ", code: "Type 14", note: "אוטומציה מלאה" },
      ],
      mistakesHe: [
        "ניסיון להפעיל Inspection Type 14 בלי PM — אין Equipment ואין Calibration Order; מבוי-סתום.",
        "בחירת-תרחיש לפי 'מה נוח עכשיו' במקום לפי המודולים הקיימים.",
        "אי-תיעוד ההחלטה — מה שמוביל לחוסר-עקביות בין מפעלים.",
      ],
      troubleshootHe: [
        "לא ניתן ליצור Calibration Order ➔ אין PM פעיל או אין Equipment למכשיר.",
        "Inspection Type 14 לא זמין לבחירה ➔ לא הופעל/לא שויך לסוג-הזמנת-PM.",
      ],
      bestPracticeHe: [
        "אם קיימים MM+PM — בחר תמיד בתרחיש 2 (Material+Serial↔Equipment). זה ה-Best Practice של SAP.",
        "תקנן את התרחיש בין כל המפעלים בארגון לאחידות-ביקורת.",
        "תעד את שיקולי-הבחירה במסמך-עיצוב (Design Document).",
      ],
      interviewHe: [
        { qHe: "מהו התרחיש המומלץ לניהול ציוד-בדיקה ומדוע?", aHe: "תרחיש 2 — PM עם MM: המכשיר מוגדר כ-Material עם Serial Number ומסונכרן ל-Equipment ב-PM. כך מקבלים אוטומציה מלאה: Maintenance Plan מתזמן, Deadline Monitoring מייצר Calibration Order, וה-Inspection Lot (type 14) נוצר אוטומטית." },
        { qHe: "מה ההשלכה של היעדר PM על ניהול ציוד-בדיקה?", aHe: "ללא PM אין Equipment ואין Calibration Order, ולכן אין Inspection Type 14 אוטומטי. נדרש לעבור ל-Inspection Type 13 ידני או לניהול-מסמכים, תוך אובדן תזמון ו-Deadline Monitoring." },
      ],
      takeawaysHe: [
        "בחירת-התרחיש נגזרת מהמודולים הקיימים (MM/PM), לא מהעדפה.",
        "PM הוא תנאי לאוטומציית-כיול (Equipment + Calibration Order + Inspection Type 14).",
        "תרחיש 2 (PM+MM) הוא ה-Best Practice; השאר הם פשרות.",
      ],
      relatedHe: [
        { labelHe: "PM · אב-ציוד (Equipment)", href: "/library/pm/object/EQUI/" },
        { labelHe: "QM · סוגי-בדיקה", href: "/library/qm/chapter-07/#sub-7.3.1" },
      ],
      children: [
        {
          id: "7.1.1",
          titleHe: "תרחיש 1: PM ללא MM",
          titleEn: "Scenario 1: PM without MM",
          execHe:
            "בתרחיש זה קיים PM אך לא MM. ניתן עדיין לנהל את ציוד-הבדיקה כ-Equipment ב-PM וליהנות מתזמון-כיול ומ-Inspection Type 14, אך אי-אפשר לנהל את המכשיר כחומר במלאי, ולכן אין Serial Number מסונכרן ואין רכש/ניהול-מלאי של מכשירים.",
          beginnerHe:
            "יש לך מערכת-תחזוקה אבל לא מערכת-מלאי. אז את המכשיר אתה מגדיר ישירות כ'ציוד' (Equipment) ב-PM — בלי לפתוח לו 'כרטיס-מוצר' (Material). הכיול האוטומטי עדיין עובד, אבל לא תוכל לעקוב אחרי המכשיר כמו פריט-מלאי.",
          consultantHe:
            "ה-Equipment נוצר ישירות ב-IE01 ללא קישור ל-Material/Serial. ה-Maintenance Plan וה-Inspection Type 14 פועלים כרגיל. החיסרון: אין Material Master, אין Batch/Serial-stock, ואין יכולת לנהל את המכשיר במלאי או ברכש סטנדרטי. מתאים לארגונים שבהם מכשירי-המדידה אינם פריטי-מלאי (נכסים קבועים בלבד).",
          purposeHe:
            "לאפשר כיול-אוטומטי מלא גם בלי MM, כל עוד אין צורך בניהול-מלאי/רכש של המכשירים עצמם.",
          processExampleHe:
            "טכנאי יוצר Equipment ב-IE01 עבור מד-לחץ, משייך General Task List ו-Maintenance Plan; הכיול מתוזמן ומבוצע — בלי שום רשומת-Material.",
          cbcHe:
            "ב-CBC זה רלוונטי למפעל-משנה שבו MM אינו פרוס, אך PM כן: מד-טמפרטורה של מקרר-אחסון מנוהל כ-Equipment בלבד.",
          navHe: ["Plant Maintenance and Customer Service ► Technical Objects ► Equipment ► Create Equipment (IE01)"],
          tables: ["EQUI", "EQKT", "MPLA"],
          tcodes: ["IE01", "IA05", "IP42"],
          fiori: ["F2218"],
          configHe: [
            "צור Equipment ישירות ב-IE01 ללא שדה Material/Serial.",
            "שייך Task List ו-Maintenance Plan כרגיל; Inspection Type 14 פעיל.",
          ],
          mistakesHe: [
            "ניסיון לסנכרן Serial Number כשאין MM — בלתי-אפשרי בתרחיש זה.",
            "הנחה ש'אין MM' = 'אין כיול-אוטומטי' — שגוי; PM לבדו מספיק לכיול.",
          ],
          troubleshootHe: [
            "אין יכולת לנהל מכשיר במלאי ➔ זו מגבלת-התרחיש (אין MM), לא תקלה.",
          ],
          bestPracticeHe: [
            "השתמש בתרחיש זה רק כשמכשירי-המדידה אינם פריטי-מלאי.",
            "תכנן מעבר עתידי ל-MM אם יידרש ניהול-מלאי/רכש.",
          ],
          interviewHe: [
            { qHe: "האם ניתן לכייל ציוד אוטומטית בלי MM?", aHe: "כן — PM לבדו מספיק. יוצרים Equipment ישירות ב-IE01, משייכים Maintenance Plan ו-Inspection Type 14. החיסרון היחיד: אין ניהול-מלאי/Serial של המכשיר." },
          ],
          takeawaysHe: [
            "PM לבדו מאפשר כיול-אוטומטי מלא.",
            "ללא MM אין Material/Serial — אין ניהול-מלאי של המכשיר.",
            "מתאים למכשירים שאינם פריטי-מלאי.",
          ],
        },
        {
          id: "7.1.2",
          titleHe: "תרחיש 2: PM עם MM",
          titleEn: "Scenario 2: PM with MM",
          execHe:
            "התרחיש המומלץ והעשיר ביותר. המכשיר מוגדר כ-Material (עם Serial Number Profile), מסונכרן אוטומטית ל-Equipment ב-PM, ומקבל את כל יכולות-הכיול: Maintenance Plan, Deadline Monitoring, Calibration Order, ו-Inspection Lot מסוג 14. זהו ה-Best Practice של SAP.",
          beginnerHe:
            "כאן יש לך גם מערכת-מלאי וגם מערכת-תחזוקה — והן עובדות יחד. המכשיר הוא גם 'מוצר' (Material) עם מספר-סידורי, וגם 'ציוד' (Equipment). שני אלה מסונכרנים: כשאתה יוצר אחד, השני נוצר אוטומטית. וכל הכיול האוטומטי עובד בצורה מושלמת.",
          consultantHe:
            "המכשיר = Material (לרוב סוג-חומר ייעודי) עם Serial Number Profile המכיל Equipment Category. ביצירת Serial Number (IQ01/MMSL) נוצר אוטומטית Equipment מסונכרן (טבלאות MARA↔EQUI). מכאן זמינים Task List (IA05), Maintenance Plan (IP42) מסוג Single-cycle, Schedule (IP10), Deadline Monitoring (IP30), והכיול עצמו כ-PM Order + Inspection Lot type 14. זהו המסלול בעל האוטומציה והנראות המקסימליות.",
          purposeHe:
            "לקבל מעגל-כיול סגור ואוטומטי לחלוטין, עם נראות-מלאי, רכש, ומעקב-ביקורת מלא — בלי תהליכים-ידניים.",
          processExampleHe:
            "פותחים Material ל-pH-meter, יוצרים Serial Number → Equipment נוצר אוטומטית → משייכים Task List ו-Maintenance Plan שנתי → IP30 מזהה מועד ומייצר Calibration Order עם Inspection Lot 14 → תוצאות ב-QGA2 → UD.",
          cbcHe:
            "ב-CBC זהו התרחיש שנבחר לכל ציוד-המדידה: רפרקטומטר Brix, מד-CO2, מד-מילוי — כולם Material+Serial↔Equipment עם כיול-אוטומטי שנתי/חצי-שנתי.",
          navHe: [
            "Logistics – General ► Serial Number Management ► Define Serial Number Profiles",
            "Plant Maintenance and Customer Service ► Maintenance Plans ► Create Maintenance Plan",
          ],
          tables: ["MARA", "EQUI", "MPLA", "MPOS", "SER01"],
          tcodes: ["MM01", "IQ01", "IE01", "IA05", "IP42", "IP10", "IP30"],
          fiori: ["F2218", "F1605"],
          configHe: [
            "הגדר Serial Number Profile עם Equipment Category לסנכרון אוטומטי Material↔Equipment.",
            "הפעל Inspection Type 14 ושייך לסוג-הזמנת-PM של כיול.",
            "הקם Maintenance Plan מסוג Single-cycle לתזמון-הכיול.",
          ],
          flow: [
            { he: "פתח Material", code: "MM01" },
            { he: "צור Serial Number", code: "IQ01", note: "→ Equipment אוטומטי" },
            { he: "שייך Task List + Plan", code: "IA05/IP42" },
            { he: "תזמן + נטר", code: "IP10/IP30", note: "→ Calibration Order" },
          ],
          mistakesHe: [
            "Serial Number Profile ללא Equipment Category — אין סנכרון Equipment.",
            "הזנחת תיאום בין נתוני-Material לנתוני-Equipment לאחר הסנכרון.",
          ],
          troubleshootHe: [
            "Equipment לא נוצר עם ה-Serial ➔ Equipment Category חסר בפרופיל-הסידורי.",
            "Inspection Lot לא נוצר בשחרור-ההזמנה ➔ Inspection Type 14 לא שויך לסוג-ההזמנה.",
          ],
          bestPracticeHe: [
            "אמץ תרחיש זה תמיד כשקיימים MM+PM — אוטומציה מקסימלית.",
            "ודא סנכרון דו-כיווני תקין בין Material/Serial ל-Equipment.",
          ],
          interviewHe: [
            { qHe: "כיצד מתבצע הסנכרון Material↔Equipment בתרחיש 2?", aHe: "דרך Serial Number Profile המכיל Equipment Category. כשנוצר Serial Number ל-Material (IQ01), המערכת יוצרת אוטומטית Equipment מקושר; שינויים מסונכרנים בשני הכיוונים." },
          ],
          takeawaysHe: [
            "תרחיש 2 = Material+Serial↔Equipment = אוטומציה מלאה.",
            "Equipment Category בפרופיל-הסידורי הוא מפתח-הסנכרון.",
            "זהו ה-Best Practice של SAP לניהול ציוד-בדיקה.",
          ],
          relatedHe: [{ labelHe: "QM · סנכרון Serial↔Equipment", href: "/library/qm/chapter-07/#sub-7.4.3" }],
        },
        {
          id: "7.1.3",
          titleHe: "תרחיש 3: MM ללא PM",
          titleEn: "Scenario 3: MM without PM",
          execHe:
            "קיים MM אך אין PM. ניתן לנהל את המכשיר כ-Material עם Serial Number, אך ללא PM אין Equipment-based Calibration Order ואין Inspection Type 14 אוטומטי. הכיול ינוהל ידנית דרך Inspection Type 13 (Inspection for Goods Movement / manual) או תהליך-עוקף.",
          beginnerHe:
            "יש לך מערכת-מלאי אבל לא מערכת-תחזוקה. אז אתה יודע 'איזה מכשיר יש לך ואיפה', אבל אין מי שיתזמן לך כיול אוטומטית. תצטרך ליצור את בדיקת-הכיול ידנית בכל פעם.",
          consultantHe:
            "Material+Serial מנוהלים, אך בלי PM אין Maintenance Plan ואין Deadline Monitoring. אין Calibration Order (היא PM Order). הכיול מבוצע כ-Inspection Lot ידני (לרוב Inspection Type 13 או יצירה ידנית ב-QA01), ללא תזמון-אוטומטי. הארגון מאבד את לב-האוטומציה.",
          purposeHe:
            "לאפשר תיעוד-כיול בסיסי בארגון עם MM בלבד, תוך הכרה במגבלת היעדר-התזמון.",
          processExampleHe:
            "מכשיר מנוהל כ-Material+Serial; כל רבעון איש-QA יוצר ידנית Inspection Lot, רושם תוצאות וקובע UD — בלי תזמון-מערכתי.",
          cbcHe:
            "ב-CBC תרחיש זה היה מתאים אילו PM לא היה פרוס; בפועל CBC מעדיף תרחיש 2. רלוונטי כשלב-ביניים במפעל שטרם הטמיע PM.",
          navHe: ["Quality Management ► Quality Inspection ► Inspection Lot Creation ► Manual Inspection (QA01)"],
          tables: ["MARA", "SER01", "QALS"],
          tcodes: ["MM01", "IQ01", "QA01"],
          fiori: ["F1605"],
          configHe: [
            "הגדר Inspection Type 13 / ידני לבדיקת-המכשירים.",
            "תעד תהליך-תזמון חיצוני (לוח-זמנים ידני) כפיצוי על היעדר Deadline Monitoring.",
          ],
          mistakesHe: [
            "ציפייה ל-Calibration Order ללא PM — היא אינה זמינה.",
            "הסתמכות על זיכרון-אנושי לתזמון-כיול במקום בקרה מסודרת.",
          ],
          troubleshootHe: [
            "אין תזמון-כיול אוטומטי ➔ מגבלת-התרחיש (אין PM); נדרש מעקב-ידני.",
          ],
          bestPracticeHe: [
            "ראה בתרחיש זה שלב-ביניים; תכנן הטמעת PM להשגת אוטומציה.",
            "נהל לוח-כיול ידני קפדני עם תזכורות חיצוניות.",
          ],
          interviewHe: [
            { qHe: "מדוע אין Calibration Order ב-MM ללא PM?", aHe: "Calibration Order היא PM Order. ללא PM אין סוג-הזמנת-תחזוקה ואין Equipment, ולכן הכיול חייב להתבצע כ-Inspection Lot ידני (Inspection Type 13 / QA01) בלי תזמון-אוטומטי." },
          ],
          takeawaysHe: [
            "MM ללא PM = Material+Serial אך ללא תזמון-אוטומטי.",
            "הכיול ידני (Inspection Type 13 / QA01).",
            "מתאים כשלב-ביניים לפני הטמעת PM.",
          ],
        },
        {
          id: "7.1.4",
          titleHe: "תרחיש 4: לא MM ולא PM",
          titleEn: "Scenario 4: Neither MM nor PM",
          execHe:
            "התרחיש המינימלי: אין MM ואין PM. אין Material, אין Equipment, אין Maintenance Plan ואין Calibration Order. ניהול ציוד-הבדיקה מצטמצם לבדיקות-ידניות ו/או לניהול-מסמכים (Document). זהו הפתרון הדל ביותר ומומלץ רק כשאין ברירה.",
          beginnerHe:
            "אין לך לא מערכת-מלאי ולא מערכת-תחזוקה. במצב כזה אין כמעט אוטומציה — אתה מנהל את המכשירים כמסמכים או ברשימה חיצונית, ויוצר בדיקות ידנית לחלוטין.",
          consultantHe:
            "ללא MM/PM נותרת רק יצירת Inspection Lot ידנית או ניהול במסגרת Document Management (DMS). אין Serial, אין Equipment, אין תזמון. רוב יכולות-הליבה של Test Equipment Management אינן זמינות. מתאים לארגונים זעירים או לפיילוט מצומצם בלבד.",
          purposeHe:
            "לאפשר תיעוד-כיול בסיסי ביותר כשאין שום מודול-לוגיסטי תומך.",
          processExampleHe:
            "מכשיר מתועד כמסמך; הכיול נרשם ידנית בדף-בדיקה חיצוני או Inspection Lot ידני בודד, ללא קישור-מערכתי.",
          cbcHe:
            "ב-CBC אינו רלוונטי (כל המודולים פרוסים); מובא להשלמת-התמונה בלבד.",
          navHe: ["Quality Management ► Quality Inspection ► Inspection Lot Creation ► Manual Inspection (QA01)"],
          tables: ["QALS", "DRAW"],
          tcodes: ["QA01", "CV01N"],
          fiori: ["F1605"],
          configHe: [
            "הגדר Inspection Type ידני בלבד.",
            "נהל מכשירים ב-DMS (Document) כפתרון-עוקף.",
          ],
          mistakesHe: [
            "ציפייה לאוטומציה כלשהי — בלתי-זמינה בתרחיש זה.",
            "בחירה בתרחיש זה כשקיימים MM/PM — בזבוז יכולות.",
          ],
          troubleshootHe: [
            "כל יכולת-אוטומציה חסרה ➔ מגבלת-התרחיש; שקול הטמעת MM/PM.",
          ],
          bestPracticeHe: [
            "השתמש רק כשאין שום מודול תומך.",
            "תעד קפדנית במסמכים והגדר תזכורות-כיול חיצוניות.",
          ],
          interviewHe: [
            { qHe: "מה זמין לניהול ציוד-בדיקה כשאין MM ולא PM?", aHe: "מעט מאוד: יצירת Inspection Lot ידנית ו/או ניהול-מסמכים (DMS). אין Material, Equipment, Maintenance Plan או Calibration Order — אין שום אוטומציה." },
          ],
          takeawaysHe: [
            "ללא MM/PM אין כמעט יכולות Test Equipment Management.",
            "נותר רק תיעוד-ידני / DMS.",
            "פתרון אחרון; הטמע MM/PM אם אפשר.",
          ],
        },
      ],
    },
    // ============================================================ 7.2
    {
      id: "7.2",
      titleHe: "הגדרת ציוד-בדיקה",
      titleEn: "Defining Test Equipment",
      execHe:
        "ציוד-בדיקה (מכשיר-מדידה) יכול להיות מיוצג ב-SAP בארבע דרכים שונות, לכל אחת יתרונות ומגבלות: כ-Material, כ-PM Equipment, כ-Production Resource/Tool (PRT), או כ-Document. הבחירה קובעת אילו תהליכי-כיול אפשריים ועד כמה הם אוטומטיים. ההמלצה הגורפת: ייצוג כ-PM Equipment (לרוב משולב עם Material+Serial), כי רק הוא תומך במעגל-הכיול האוטומטי המלא.",
      beginnerHe:
        "יש כמה דרכים 'לרשום' מכשיר במערכת. אתה יכול לרשום אותו כמוצר (Material), כציוד-תחזוקה (Equipment), ככלי-ייצור (PRT), או כמסמך (Document). כל דרך מתאימה למשהו אחר. הדרך הכי טובה לכיול היא 'ציוד-תחזוקה', כי רק היא מאפשרת תזמון וכיול אוטומטיים.",
      consultantHe:
        "ההכרעה הארכיטקטונית: Inspection Type 14 דורש Equipment. לכן Material לבדו אינו מספיק (משמש לרכש/מלאי), PRT מתאים לכלי-ייצור הנדרשים ל-Routing (לא לכיול-עצמאי), ו-Document מתאים לתיעוד-בלבד. השילוב Material+Serial↔Equipment הוא האידיאל, כי הוא מאחד נראות-מלאי עם יכולת-כיול. בחירה לא-נכונה כאן מקבעת את גבול-האוטומציה לכל אורך-חיי הפתרון.",
      purposeHe:
        "לבחור את הייצוג שמאפשר את תהליכי-הכיול הנדרשים ברמת-האוטומציה הרצויה, תוך התאמה למודולים הקיימים.",
      processExampleHe:
        "ארגון מגדיר מד-לחץ כ-Material (לרכש ומלאי) + Serial Number (לזיהוי-יחידה) → Equipment (לכיול). אותו מכשיר משרת רכש, מלאי וכיול — דרך שלושה ייצוגים מסונכרנים.",
      cbcHe:
        "ב-CBC כל מכשיר-מדידה מוגדר כ-Material+Serial↔Equipment; כלי-ייצור (תבניות-מילוי) שאינם נמדדים מנוהלים כ-PRT; תעודות-כיול חיצוניות נשמרות כ-Document מקושר.",
      navHe: [
        "Plant Maintenance and Customer Service ► Technical Objects ► Equipment",
        "Production ► Basic Data ► Production Resources/Tools",
        "Cross-Application Components ► Document Management",
      ],
      tables: ["EQUI", "MARA", "CRVD_A", "DRAW"],
      tcodes: ["IE01", "MM01", "CF01", "CV01N"],
      fiori: ["F2218"],
      configHe: [
        "החלט על ייצוג-העל: Equipment (מומלץ) / Material / PRT / Document.",
        "לכיול-אוטומטי — חייב Equipment (תנאי ל-Inspection Type 14).",
        "שלב Material+Serial לנראות-מלאי + כיול.",
      ],
      flow: [
        { he: "Material", note: "רכש/מלאי" },
        { he: "Serial Number", note: "זיהוי-יחידה" },
        { he: "Equipment", code: "Type 14", note: "כיול אוטומטי" },
        { he: "Document", note: "תיעוד-נלווה" },
      ],
      mistakesHe: [
        "ייצוג כ-Material בלבד וציפייה לכיול-אוטומטי — חסר Equipment.",
        "שימוש ב-PRT לכיול-עצמאי במקום ל-Routing.",
      ],
      troubleshootHe: [
        "אין Calibration Order ➔ המכשיר אינו מיוצג כ-Equipment.",
        "אין נראות-מלאי ➔ חסר Material/Serial.",
      ],
      bestPracticeHe: [
        "ייצג כ-Equipment (משולב Material+Serial) לכל מכשיר הדורש כיול.",
        "השאר PRT לכלי-ייצור ו-Document לתיעוד-נלווה בלבד.",
      ],
      interviewHe: [
        { qHe: "מהן ארבע הדרכים לייצג ציוד-בדיקה ב-SAP?", aHe: "Material, PM Equipment, Production Resource/Tool (PRT), ו-Document. רק Equipment תומך בכיול-אוטומטי (Inspection Type 14); ההמלצה היא Material+Serial↔Equipment." },
      ],
      takeawaysHe: [
        "ארבעה ייצוגים אפשריים; רק Equipment מאפשר כיול-אוטומטי.",
        "האידיאל: Material+Serial↔Equipment.",
        "PRT=כלי-ייצור, Document=תיעוד בלבד.",
      ],
      children: [
        {
          id: "7.2.1",
          titleHe: "ציוד-בדיקה כחומר (Material)",
          titleEn: "Test Equipment as a Material",
          execHe:
            "ייצוג המכשיר כ-Material מאפשר רכש, ניהול-מלאי ותמחיר, אך לבדו אינו מאפשר כיול-אוטומטי. הוא משמש בסיס שעליו נבנה ה-Serial Number וה-Equipment.",
          beginnerHe:
            "לרשום את המכשיר כ'מוצר' פירושו שאתה יכול לקנות אותו, להחזיק אותו במלאי ולתמחר אותו — בדיוק כמו כל פריט. אבל זה לבדו לא נותן כיול אוטומטי.",
          consultantHe:
            "Material (MARA/MARC) עם סוג-חומר מתאים. לכיול נדרש להוסיף Serial Number Profile (לסנכרון Equipment). לבדו ה-Material משמש רק לרכש/מלאי. שדה-מפתח: Serial Number Profile ב-Work Scheduling/Sales view.",
          purposeHe:
            "לנהל את המכשיר כפריט-לוגיסטי (רכש, מלאי, תמחיר) ולשמש בסיס לסנכרון Equipment.",
          processExampleHe:
            "פותחים Material למד-CO2 ב-MM01, מגדירים Serial Number Profile; מכאן ניתן ליצור Serial→Equipment.",
          cbcHe:
            "ב-CBC כל מכשיר-מדידה הוא Material (לרכש ומלאי-חלפים) המהווה בסיס ל-Serial↔Equipment.",
          navHe: ["Logistics – General ► Material Master ► Create Material (MM01)"],
          tables: ["MARA", "MARC"],
          tcodes: ["MM01", "MM02", "MM03"],
          fiori: ["F1602A"],
          configHe: [
            "בחר סוג-חומר מתאים למכשיר-מדידה.",
            "הזן Serial Number Profile (תנאי לסנכרון Equipment).",
          ],
          mistakesHe: [
            "פתיחת Material בלי Serial Number Profile — אין מסלול ל-Equipment.",
            "ציפייה לכיול מ-Material לבדו.",
          ],
          troubleshootHe: [
            "לא ניתן ליצור Serial ➔ חסר Serial Number Profile ב-Material.",
          ],
          bestPracticeHe: [
            "שייך Serial Number Profile כבר בפתיחת-החומר.",
            "השתמש בסוג-חומר ייעודי לציוד-בדיקה.",
          ],
          interviewHe: [
            { qHe: "האם Material לבדו מספיק לכיול?", aHe: "לא. Material נותן רכש/מלאי/תמחיר אך לא כיול-אוטומטי. נדרש Serial Number Profile כדי לסנכרן ל-Equipment, שבו מתבצע הכיול (Inspection Type 14)." },
          ],
          takeawaysHe: [
            "Material = רכש/מלאי/תמחיר, לא כיול.",
            "Serial Number Profile הוא הגשר ל-Equipment.",
          ],
        },
        {
          id: "7.2.2",
          titleHe: "ציוד-בדיקה כ-Equipment של PM",
          titleEn: "Test Equipment as PM Equipment",
          execHe:
            "ייצוג המכשיר כ-Equipment ב-PM הוא הליבה של ניהול ציוד-בדיקה. רק Equipment תומך ב-Maintenance Plan, Calibration Order ו-Inspection Type 14 — כלומר במעגל-הכיול האוטומטי המלא. זהו הייצוג המומלץ.",
          beginnerHe:
            "'ציוד' (Equipment) הוא הדרך של PM לתאר נכס פיזי שצריך תחזוקה. כשהמכשיר הוא Equipment, המערכת יכולה לתזמן לו כיול אוטומטית, ליצור הזמנת-כיול, ולקשר אליה בדיקת-QM. זו הדרך הטובה ביותר.",
          consultantHe:
            "Equipment (EQUI/EQKT) עם Equipment Category מתאים. אליו נצמדים Task List (IA05), Maintenance Plan (IP42), ו-Inspection Type 14. ה-Calibration Order היא PM Order המקושרת ל-Equipment, וה-Inspection Lot נוצר אוטומטית בשחרורה. לרוב מסונכרן מ-Material+Serial אך יכול להיווצר גם ישירות (IE01).",
          purposeHe:
            "לאפשר את מעגל-הכיול האוטומטי המלא: תזמון, יצירת-הזמנה, בדיקה ו-UD.",
          processExampleHe:
            "Equipment למד-מילוי משויך ל-Task List ול-Maintenance Plan; IP30 מייצר Calibration Order עם Inspection Lot 14; תוצאות נרשמות ו-UD נקבע.",
          cbcHe:
            "ב-CBC כל מכשיר-מדידה הוא Equipment עם כיול-מתוזמן; היסטוריית-הכיולים נשמרת ב-Equipment לצורכי-ביקורת.",
          navHe: ["Plant Maintenance and Customer Service ► Technical Objects ► Equipment ► Create Equipment (IE01)"],
          tables: ["EQUI", "EQKT", "EQUZ"],
          tcodes: ["IE01", "IE02", "IE03"],
          fiori: ["F2218"],
          configHe: [
            "הגדר Equipment Category לציוד-בדיקה.",
            "ודא Inspection Type 14 פעיל ומשויך לסוג-הזמנת-הכיול.",
          ],
          mistakesHe: [
            "Equipment ללא Task List/Maintenance Plan — אין תזמון-כיול.",
            "Equipment Category לא-מתאים שלא תומך בכיול.",
          ],
          troubleshootHe: [
            "Inspection Lot 14 לא נוצר ➔ Type 14 לא משויך לסוג-ההזמנה / חסר Task List.",
          ],
          bestPracticeHe: [
            "ייצג כל מכשיר-בדיקה כ-Equipment (מומלץ: מסונכרן מ-Material+Serial).",
            "שמור היסטוריית-כיולים ב-Equipment לביקורת.",
          ],
          interviewHe: [
            { qHe: "מדוע Equipment הוא הייצוג המומלץ לציוד-בדיקה?", aHe: "כי רק Equipment תומך ב-Maintenance Plan, Calibration Order ו-Inspection Type 14 — כלומר במעגל-הכיול האוטומטי המלא, כולל תזמון, יצירת-הזמנה, בדיקה, UD ושמירת-היסטוריה לביקורת." },
          ],
          takeawaysHe: [
            "Equipment = ליבת ניהול ציוד-הבדיקה.",
            "רק הוא תומך בכיול-אוטומטי (Type 14 + Calibration Order).",
            "לרוב מסונכרן מ-Material+Serial.",
          ],
          relatedHe: [{ labelHe: "PM · אב-ציוד (EQUI)", href: "/library/pm/object/EQUI/" }],
        },
        {
          id: "7.2.3",
          titleHe: "ציוד-בדיקה כמשאב/כלי-ייצור (PRT)",
          titleEn: "Test Equipment as a Production Resource/Tool",
          execHe:
            "Production Resource/Tool (PRT) הוא ייצוג לכלי הנדרש בפעולת-ייצור (Routing). מכשיר-בדיקה יכול להיות PRT כאשר הוא משמש כחלק מתהליך-ייצור, אך PRT אינו תומך בכיול-עצמאי אוטומטי כמו Equipment.",
          beginnerHe:
            "PRT הוא 'כלי' שמשתמשים בו במהלך הייצור — כמו תבנית או מד שמחובר לפעולה ב-Routing. אם המכשיר משמש בתוך תהליך-ייצור, אפשר לרשום אותו כ-PRT, אבל זו לא הדרך לכייל אותו לבד.",
          consultantHe:
            "PRT (CRVD_A) משויך לפעולות ב-Routing ומנהל זמינות/שימוש. PRT יכול להתבסס על Material, Equipment או Document. לכיול-עצמאי עדיף Equipment; PRT מתאים כשהמכשיר הוא חלק-מהותי מהפעולה היצרנית. ניתן לשלב: PRT המבוסס על Equipment שמכויל בנפרד.",
          purposeHe:
            "לנהל את המכשיר כמשאב נדרש לפעולת-ייצור, עם בקרת-זמינות.",
          processExampleHe:
            "מד-עובי המחובר לפעולת-ביקורת ב-Routing מוגדר כ-PRT; שימושו נרשם בפק\"ע, אך כיולו מנוהל דרך ה-Equipment שעליו הוא מבוסס.",
          cbcHe:
            "ב-CBC תבניות-מילוי וכלים נלווים = PRT; מכשירי-המדידה עצמם = Equipment (לכיול), ולעיתים גם PRT אם משמשים בפעולה.",
          navHe: ["Production ► Basic Data ► Production Resources/Tools ► Create PRT (CF01)"],
          tables: ["CRVD_A", "CRVD_B"],
          tcodes: ["CF01", "CF02", "CF03"],
          fiori: ["F4006"],
          configHe: [
            "צור PRT (CF01) המבוסס על Material/Equipment/Document.",
            "שייך PRT לפעולות ב-Routing; לכיול — קשר ל-Equipment.",
          ],
          mistakesHe: [
            "שימוש ב-PRT כדי 'לכייל' במקום ב-Equipment.",
            "אי-קישור PRT ל-Equipment כשנדרש כיול.",
          ],
          troubleshootHe: [
            "אין כיול-אוטומטי ל-PRT ➔ PRT אינו תומך בכך; השתמש ב-Equipment.",
          ],
          bestPracticeHe: [
            "השתמש ב-PRT לכלי-ייצור הנדרשים ל-Routing.",
            "לכיול — בסס PRT על Equipment ונהל את הכיול דרכו.",
          ],
          interviewHe: [
            { qHe: "מתי משתמשים ב-PRT לציוד-בדיקה?", aHe: "כשהמכשיר נדרש כחלק מפעולת-ייצור ב-Routing ומנוהל לזמינות/שימוש. PRT עצמו אינו מכייל; לכיול מבססים אותו על Equipment ומנהלים את הכיול דרך ה-Equipment." },
          ],
          takeawaysHe: [
            "PRT = כלי הנדרש לפעולת-ייצור.",
            "אינו תומך בכיול-עצמאי; קשר ל-Equipment.",
          ],
        },
        {
          id: "7.2.4",
          titleHe: "ציוד-בדיקה כמסמך (Document)",
          titleEn: "Test Equipment as a Document",
          execHe:
            "ניתן לתעד מכשיר-בדיקה כ-Document ב-DMS (Document Management System) — למשל תעודות-כיול, מפרטים או מדריכים. ייצוג זה מתאים לתיעוד-נלווה בלבד ולא מספק שום יכולת-כיול אוטומטי.",
          beginnerHe:
            "לפעמים אתה רק רוצה לשמור מסמכים על המכשיר — תעודת-כיול, מפרט, מדריך-הפעלה. בשביל זה משתמשים ב-DMS. זה לא מנהל כיול, רק שומר מסמכים מקושרים.",
          consultantHe:
            "Document (DRAW) ב-DMS מקושר ל-Equipment/Material. מתאים לשמירת Certificates, מפרטים וגרסאות. אינו מחליף את ה-Equipment לצורכי-כיול אלא משלים אותו בתיעוד. ניתן לקשר Document ל-PRT/Equipment.",
          purposeHe:
            "לשמור ולנהל גרסאות של מסמכי-מכשיר (תעודות, מפרטים) בקישור-מבני.",
          processExampleHe:
            "תעודת-כיול חיצונית מספק נשמרת כ-Document (CV01N) ומקושרת ל-Equipment של המכשיר לצורכי-ביקורת.",
          cbcHe:
            "ב-CBC תעודות-כיול של מעבדה חיצונית והסמכות ISO נשמרות כ-Document מקושר ל-Equipment.",
          navHe: ["Cross-Application Components ► Document Management ► Create Document (CV01N)"],
          tables: ["DRAW", "DRAD"],
          tcodes: ["CV01N", "CV02N", "CV03N"],
          fiori: ["F1605"],
          configHe: [
            "צור Document (CV01N) וקשר ל-Equipment/Material.",
            "נהל גרסאות ותעודות-כיול ב-DMS.",
          ],
          mistakesHe: [
            "שימוש ב-Document כתחליף ל-Equipment לכיול — אינו מתזמן/מכייל.",
            "אי-קישור המסמך לאובייקט-הטכני.",
          ],
          troubleshootHe: [
            "אין כיול ➔ Document הוא תיעוד בלבד; נדרש Equipment.",
          ],
          bestPracticeHe: [
            "השתמש ב-Document לתעודות/מפרטים מקושרים בלבד.",
            "נהל גרסאות וקישורים בקפידה לביקורת.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד ייצוג כ-Document?", aHe: "תיעוד-נלווה בלבד — תעודות-כיול, מפרטים, מדריכים — המנוהל ב-DMS ומקושר ל-Equipment/Material. אינו מספק יכולת-כיול; הוא משלים את ה-Equipment, לא מחליף אותו." },
          ],
          takeawaysHe: [
            "Document = תיעוד-נלווה ב-DMS.",
            "אינו מכייל; משלים את ה-Equipment.",
          ],
        },
      ],
    },
    // ============================================================ 7.3
    {
      id: "7.3",
      titleHe: "יסודות הקונפיגורציה",
      titleEn: "Configuration Basics",
      execHe:
        "לפני שניתן להפעיל את מעגל-הכיול, יש לבצע שתי הגדרות-יסוד: (1) שיוך Inspection Type 14 לסוג-הזמנת-PM של הכיול, כך שבשחרור-ההזמנה ייווצר אוטומטית Inspection Lot; (2) הגדרת Serial Number Profile המכיל Equipment Category, לסנכרון אוטומטי Material↔Equipment. שתי הגדרות אלה הן עמוד-השדרה הטכני של כל התרחיש.",
      beginnerHe:
        "כדי שהקסם של הכיול-האוטומטי יעבוד, צריך 'לחבר את החוטים' פעם אחת בהגדרות. שני החיבורים החשובים: לומר למערכת שכשנפתחת הזמנת-כיול תיווצר אוטומטית בדיקת-QM (Inspection Type 14), ולומר לה שכשנותנים למכשיר מספר-סידורי הוא יהפוך אוטומטית ל'ציוד'.",
      consultantHe:
        "שני אדנים: (1) Inspection Type 14 ↔ PM Order Type — נקבע ב-Customizing של QM in Maintenance (שיוך סוג-בדיקה לסוג-הזמנה). בלעדיו ה-Calibration Order לא תלד Inspection Lot. (2) Serial Number Profile עם Equipment Category — מבטיח שיצירת Serial תיצור Equipment מסונכרן. בלעדיו אין גשר Material↔Equipment. שתי ההגדרות חייבות להיות עקביות בין-מפעלים.",
      purposeHe:
        "להניח את התשתית הקונפיגורטיבית המאפשרת אוטומציה: יצירת-Inspection-Lot אוטומטית וסנכרון Material↔Equipment.",
      processExampleHe:
        "צוות-המימוש משייך Type 14 לסוג-הזמנה PM05 ומגדיר Serial Number Profile עם Equipment Category. מעתה כל הזמנת-כיול מולידה Inspection Lot, וכל Serial מוליד Equipment.",
      cbcHe:
        "ב-CBC הוגדר Type 14 ↔ PM05 ו-Serial Number Profile אחיד לכל מכשירי-המדידה, כך שהאוטומציה זהה בכל המפעלים.",
      navHe: [
        "Quality Management ► QM in Logistics ► QM in Maintenance ► Assign Inspection Types to Maintenance/Service Order Types",
        "Logistics – General ► Serial Number Management ► Define Serial Number Profiles",
      ],
      tables: ["TQ08", "T399X", "T377P"],
      tcodes: ["SPRO", "OIS2"],
      fiori: ["F2218"],
      configHe: [
        "שייך Inspection Type 14 לסוג-הזמנת-הכיול (למשל PM05/PM06).",
        "הגדר Serial Number Profile עם Equipment Category לסנכרון.",
        "ודא עקביות בין-מפעלים בשתי ההגדרות.",
      ],
      flow: [
        { he: "שייך Type 14 ↔ PM Order Type", code: "TQ08/T399X" },
        { he: "הגדר Serial Number Profile", code: "OIS2", note: "+ Equipment Category" },
        { he: "תשתית מוכנה", note: "אוטומציה פעילה" },
      ],
      mistakesHe: [
        "אי-שיוך Type 14 לסוג-ההזמנה — אין Inspection Lot אוטומטי.",
        "Serial Number Profile בלי Equipment Category — אין סנכרון.",
      ],
      troubleshootHe: [
        "Inspection Lot לא נוצר ➔ Type 14 לא שויך לסוג-הזמנת-PM.",
        "Equipment לא נוצר עם Serial ➔ Equipment Category חסר בפרופיל.",
      ],
      bestPracticeHe: [
        "בצע את שתי ההגדרות מוקדם, לפני יצירת נתוני-אב.",
        "תקנן את ההגדרות בין-מפעלים.",
      ],
      interviewHe: [
        { qHe: "מהן שתי הגדרות-היסוד למעגל-הכיול?", aHe: "(1) שיוך Inspection Type 14 לסוג-הזמנת-PM של הכיול — כדי שייווצר Inspection Lot בשחרור-ההזמנה; (2) Serial Number Profile עם Equipment Category — לסנכרון אוטומטי Material↔Equipment." },
      ],
      takeawaysHe: [
        "שני אדנים: Type 14↔PM Order Type, ו-Serial Profile+Equipment Category.",
        "בלעדיהם אין אוטומציה.",
        "בצע מוקדם ובאחידות בין-מפעלים.",
      ],
      children: [
        {
          id: "7.3.1",
          titleHe: "שיוך סוג-הבדיקה לסוג-הזמנת-PM",
          titleEn: "Inspection Type Assignment to PM Order Type",
          execHe:
            "ההגדרה המרכזית של מעגל-הכיול: שיוך Inspection Type 14 לסוג-הזמנת-התחזוקה. שיוך זה גורם לכך שבשחרור Calibration Order (PM Order) ייווצר אוטומטית Inspection Lot עבור Equipment-הבדיקה.",
          beginnerHe:
            "כאן אתה אומר למערכת: 'בכל פעם שנפתחת הזמנת-כיול מהסוג הזה — צור גם בדיקת-QM מסוג 14'. זה החיבור שהופך את הכיול לאוטומטי.",
          consultantHe:
            "ב-Customizing משייכים Inspection Type 14 לסוג-הזמנת-PM (למשל PM05). השיוך נשמר (TQ08/T399X) וקובע שבשחרור-ההזמנה ה-Inspection Lot ייווצר עם origin 14. ה-Inspection Lot מקושר ל-Equipment ול-Maintenance Order, ומאפשר רישום-תוצאות מול ה-Task List.",
          purposeHe:
            "לקשר את עולם-ה-PM (ההזמנה) לעולם-ה-QM (הבדיקה) באופן אוטומטי בשחרור-ההזמנה.",
          processExampleHe:
            "בשחרור Calibration Order מסוג PM05 נוצר מיד Inspection Lot type 14 עם רשימת-המאפיינים מה-Task List; הטכנאי רושם תוצאות ב-QGA2.",
          cbcHe:
            "ב-CBC כל Calibration Order של מכשיר-מדידה (PM05) מולידה Inspection Lot 14 אוטומטית — ללא צעד-ידני.",
          navHe: ["Quality Management ► QM in Logistics ► QM in Maintenance ► Assign Inspection Types to Maintenance/Service Order Types"],
          tables: ["TQ08", "T399X"],
          tcodes: ["SPRO", "OIOC"],
          fiori: ["F2218"],
          configHe: [
            "שייך Inspection Type 14 לסוג-הזמנת-הכיול (PM05/PM06).",
            "ודא ש-origin 14 מופעל ליצירת Inspection Lot בשחרור.",
          ],
          mistakesHe: [
            "שיוך ל-Order Type שגוי — Inspection Lot לא נוצר עבור הזמנות-הכיול.",
            "שכחת השיוך לחלוטין — אין אוטומציית-בדיקה.",
          ],
          troubleshootHe: [
            "Inspection Lot 14 לא נוצר בשחרור ➔ בדוק שיוך Type 14 לסוג-ההזמנה הנכון.",
          ],
          bestPracticeHe: [
            "השתמש בסוג-הזמנה ייעודי לכיול (PM05) ושייך אליו את Type 14.",
            "בדוק את השיוך בסביבת-בדיקות לפני Go-Live.",
          ],
          interviewHe: [
            { qHe: "מה מבטיח שבשחרור Calibration Order ייווצר Inspection Lot?", aHe: "שיוך Inspection Type 14 לסוג-הזמנת-ה-PM של הכיול ב-Customizing. בלעדיו ההזמנה תשוחרר אך ללא Inspection Lot, ולא יהיה היכן לרשום תוצאות-כיול." },
          ],
          takeawaysHe: [
            "השיוך מחבר PM Order ל-QM Inspection Lot.",
            "בלעדיו אין Inspection Lot 14 אוטומטי.",
            "השתמש בסוג-הזמנה ייעודי לכיול.",
          ],
        },
        {
          id: "7.3.2",
          titleHe: "פרופיל מספר-סידורי (Serial Number Profile)",
          titleEn: "Serial Number Profile",
          execHe:
            "Serial Number Profile קובע את התנהגות המספרים-הסידוריים של ה-Material, ובמיוחד — אם וכיצד נוצר Equipment מסונכרן. הכללת Equipment Category בפרופיל היא התנאי לסנכרון האוטומטי Material↔Equipment.",
          beginnerHe:
            "המספר-הסידורי מזהה יחידה ספציפית של מכשיר. ה'פרופיל' קובע את הכללים — והכלל החשוב ביותר כאן הוא: 'כשנותנים מספר-סידורי, צור גם ציוד (Equipment)'. כך הם נשארים מסונכרנים.",
          consultantHe:
            "ב-OIS2 מגדירים Serial Number Profile עם Serializing Procedures ועם Equipment Category. ה-Category קובע שכל Serial מוליד Equipment מהסוג המתאים (סנכרון דו-כיווני). הפרופיל משויך ל-Material ב-Work Scheduling/Sales view. בלעדיו אין גשר Material↔Equipment ולא ניתן לכייל דרך PM.",
          purposeHe:
            "להבטיח שכל יחידת-מכשיר (Serial) תיוצג גם כ-Equipment, לאפשר כיול דרך PM.",
          processExampleHe:
            "פרופיל עם Equipment Category Q (ציוד-בדיקה); יצירת Serial ל-Material (IQ01) יוצרת אוטומטית Equipment מסוג Q המקושר ל-Material/Serial.",
          cbcHe:
            "ב-CBC הוגדר Serial Number Profile אחיד עם Equipment Category לציוד-מדידה, כך שכל מכשיר חדש מקבל אוטומטית Equipment.",
          navHe: ["Logistics – General ► Serial Number Management ► Define Serial Number Profiles (OIS2)"],
          tables: ["T377P", "T377X"],
          tcodes: ["OIS2", "MM02"],
          fiori: ["F1605"],
          configHe: [
            "הגדר Serial Number Profile והכלל Equipment Category.",
            "שייך את הפרופיל ל-Material (Work Scheduling/Sales view).",
            "קבע Serializing Procedures מתאימים.",
          ],
          mistakesHe: [
            "פרופיל ללא Equipment Category — אין סנכרון Equipment.",
            "אי-שיוך הפרופיל ל-Material — לא ניתן ליצור Serial.",
          ],
          troubleshootHe: [
            "Equipment לא נוצר עם Serial ➔ Equipment Category חסר בפרופיל.",
            "לא ניתן ליצור Serial ל-Material ➔ הפרופיל לא שויך ל-Material.",
          ],
          bestPracticeHe: [
            "השתמש בפרופיל אחיד לכל ציוד-המדידה.",
            "ודא Equipment Category נכון לסנכרון.",
          ],
          interviewHe: [
            { qHe: "מה מבטיח את הסנכרון Material↔Equipment?", aHe: "Serial Number Profile המכיל Equipment Category. כשהפרופיל משויך ל-Material ונוצר Serial Number, המערכת יוצרת אוטומטית Equipment מהסוג שב-Category, ושומרת סנכרון דו-כיווני." },
          ],
          takeawaysHe: [
            "הפרופיל קובע התנהגות-Serial וסנכרון-Equipment.",
            "Equipment Category הוא מפתח-הסנכרון.",
            "שייך את הפרופיל ל-Material.",
          ],
          relatedHe: [{ labelHe: "QM · סנכרון Serial↔Equipment", href: "/library/qm/chapter-07/#sub-7.4.3" }],
        },
      ],
    },
    // ============================================================ 7.4
    {
      id: "7.4",
      titleHe: "נתוני-אב של ציוד-בדיקה",
      titleEn: "Test Equipment Master Data",
      execHe:
        "לאחר הקונפיגורציה, יש להקים את נתוני-האב המרכיבים את מעגל-הכיול: אב-חומר (Material), מספר-סידורי (Serial), Equipment מסונכרן, General Task List המגדיר את פעולות-הכיול ומאפייניו, Maintenance Plan המתזמן, תזמון-התוכנית (IP10) ו-Deadline Monitoring (IP30). שרשרת נתוני-אב זו היא המנוע שמייצר את הזמנות-הכיול במועדן.",
      beginnerHe:
        "אחרי שהגדרנו את הכללים, צריך להזין את הנתונים בפועל: לפתוח את המכשיר, לתת לו מספר-סידורי, ליצור לו ציוד, להגדיר 'מה בודקים בכיול' (Task List), ליצור 'תוכנית' שתזכיר מתי לכייל (Maintenance Plan), ולתזמן ולנטר אותה. כל אלה יחד גורמים להזמנות-הכיול להופיע בזמן.",
      consultantHe:
        "שרשרת נתוני-האב: MARA (Material) → SER01 (Serial) → EQUI (Equipment, מסונכרן) → General Task List (PLKO/PLPO, יוצר ב-IA05) הנושא Inspection Characteristics → Maintenance Plan (MPLA/MPOS, יוצר ב-IP42) מסוג Single-cycle המקשר Equipment+Task List → IP10 לתזמון → IP30 ל-Deadline Monitoring שמייצר את ה-Calibration Order. כל חוליה חסרה שוברת את האוטומציה.",
      purposeHe:
        "לבנות את כל נתוני-האב הנדרשים כדי שמועדי-הכיול יזוהו אוטומטית ויומרו להזמנות-כיול עם Inspection Lot.",
      processExampleHe:
        "מקימים Material→Serial→Equipment למד-pH, מגדירים Task List עם מאפיינים (טווח-תקין), מקשרים ל-Maintenance Plan שנתי, מתזמנים ב-IP10, ו-IP30 הלילי מייצר את ההזמנה במועד.",
      cbcHe:
        "ב-CBC כל מכשיר-מדידה עובר את השרשרת המלאה; ה-Task List מגדיר את מאפייני-הכיול (למשל Brix תקן 11.0 עם סטייה מותרת), וה-Maintenance Plan מתזמן לפי דרישות-רגולציה.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance Plans",
        "Plant Maintenance and Customer Service ► Task Lists ► General Maintenance Task Lists",
      ],
      tables: ["MARA", "SER01", "EQUI", "PLKO", "PLPO", "MPLA", "MPOS"],
      tcodes: ["MM01", "IQ01", "IE01", "IA05", "IP42", "IP10", "IP30"],
      fiori: ["F2218", "F1605"],
      configHe: [
        "ודא שכל חוליות-השרשרת קיימות: Material→Serial→Equipment→Task List→Plan→Schedule→Monitoring.",
        "שייך Inspection Characteristics ל-General Task List.",
        "הגדר Maintenance Plan מסוג Single-cycle לכיול.",
      ],
      flow: [
        { he: "Material", code: "MM01" },
        { he: "Serial → Equipment", code: "IQ01/IE01" },
        { he: "General Task List", code: "IA05", note: "+ Inspection Char." },
        { he: "Maintenance Plan", code: "IP42" },
        { he: "Schedule", code: "IP10" },
        { he: "Deadline Monitoring", code: "IP30", note: "→ Calibration Order" },
      ],
      mistakesHe: [
        "חוליה חסרה בשרשרת (למשל Task List ללא מאפיינים) — אין בדיקה לרשום.",
        "אי-תזמון התוכנית (IP10) — הזמנות לא ייווצרו לעולם.",
      ],
      troubleshootHe: [
        "אין הזמנת-כיול במועד ➔ Plan לא מתוזמן (IP10) או IP30 לא רץ.",
        "אין מאפיינים לרשום ➔ Task List חסר Inspection Characteristics.",
      ],
      bestPracticeHe: [
        "בנה Checklist לשרשרת נתוני-האב; אל תדלג על חוליה.",
        "תזמן IP30 כ-Job לילי קבוע.",
      ],
      interviewHe: [
        { qHe: "מהי שרשרת נתוני-האב של מעגל-הכיול?", aHe: "Material → Serial → Equipment (מסונכרן) → General Task List (עם Inspection Characteristics) → Maintenance Plan (Single-cycle) → Schedule (IP10) → Deadline Monitoring (IP30) שמייצר את ה-Calibration Order." },
      ],
      takeawaysHe: [
        "מעגל-הכיול הוא שרשרת נתוני-אב; כל חוליה חיונית.",
        "Task List נושא את מאפייני-הכיול; Plan מתזמן.",
        "IP10 מתזמן, IP30 מנטר ומייצר הזמנות.",
      ],
      children: [
        {
          id: "7.4.1",
          titleHe: "יצירת אב-חומר",
          titleEn: "Create Material Master",
          execHe:
            "השלב הראשון בשרשרת: פתיחת Material למכשיר, עם Serial Number Profile, כתשתית ל-Serial ול-Equipment המסונכרן.",
          beginnerHe:
            "פותחים למכשיר 'כרטיס-מוצר' ב-MM01, ומוודאים שיש לו פרופיל-מספר-סידורי כדי שנוכל בהמשך לתת לו מספר-סידורי ולהפוך אותו לציוד.",
          consultantHe:
            "ב-MM01 פותחים Material עם סוג-חומר מתאים ועם Serial Number Profile ב-Work Scheduling/Sales view. ה-Profile (עם Equipment Category) הוא שיאפשר את הסנכרון בהמשך. ללא תצוגות אלה אין מסלול ל-Serial/Equipment.",
          purposeHe:
            "להקים את הבסיס הלוגיסטי של המכשיר ולחבר אותו לסנכרון-Equipment.",
          processExampleHe:
            "פותחים Material למד-CO2 ב-MM01, מזינים Serial Number Profile; כעת ניתן ליצור Serial.",
          cbcHe:
            "ב-CBC כל מכשיר-מדידה נפתח כ-Material עם Serial Number Profile אחיד.",
          navHe: ["Logistics – General ► Material Master ► Create Material (MM01)"],
          tables: ["MARA", "MARC"],
          tcodes: ["MM01", "MM02"],
          fiori: ["F1602A"],
          configHe: [
            "בחר סוג-חומר ייעודי לציוד-בדיקה.",
            "הזן Serial Number Profile (עם Equipment Category).",
          ],
          mistakesHe: [
            "פתיחת Material בלי Serial Number Profile.",
            "סוג-חומר לא-מתאים שלא תומך בתצוגות הנדרשות.",
          ],
          troubleshootHe: [
            "לא ניתן ליצור Serial ➔ חסר Serial Number Profile.",
          ],
          bestPracticeHe: [
            "שייך Serial Number Profile כבר בפתיחה.",
            "השתמש בסוג-חומר אחיד לכל מכשירי-המדידה.",
          ],
          interviewHe: [
            { qHe: "מה חייב לכלול אב-החומר של מכשיר-בדיקה?", aHe: "Serial Number Profile (עם Equipment Category), כדי לאפשר יצירת Serial Number וסנכרון אוטומטי ל-Equipment שבו יתבצע הכיול." },
          ],
          takeawaysHe: [
            "Material = החוליה הראשונה.",
            "חובה Serial Number Profile.",
          ],
        },
        {
          id: "7.4.2",
          titleHe: "מספר-סידורי של החומר",
          titleEn: "Material Serial Number",
          execHe:
            "Serial Number מזהה יחידה ספציפית של ה-Material. יצירתו (IQ01) — בזכות ה-Serial Number Profile — מולידה אוטומטית Equipment מסונכרן, ובכך פותחת את מסלול-הכיול.",
          beginnerHe:
            "המספר-הסידורי הוא כמו תעודת-זהות ליחידה אחת של המכשיר. כשיוצרים אותו, נוצר אוטומטית גם 'ציוד' מקושר — וזה מה שמאפשר כיול.",
          consultantHe:
            "ב-IQ01 (או דרך תנועת-סחורות) נוצר Serial Number (SER01). אם ה-Serial Number Profile מכיל Equipment Category, נוצר במקביל Equipment מסונכרן (EQUI). הקישור Material/Serial↔Equipment נשמר ומאפשר ניהול-כיול ב-PM.",
          purposeHe:
            "לזהות יחידת-מכשיר ולהוליד את ה-Equipment המסונכרן.",
          processExampleHe:
            "יוצרים Serial ל-pH-meter ב-IQ01; Equipment נוצר אוטומטית ומקושר.",
          cbcHe:
            "ב-CBC לכל מכשיר פיזי Serial ייחודי ↔ Equipment, לצורכי-מעקב וכיול.",
          navHe: ["Logistics – General ► Serial Number Management ► Create Serial Number (IQ01)"],
          tables: ["SER01", "OBJK", "EQUI"],
          tcodes: ["IQ01", "IQ02", "IQ03"],
          fiori: ["F1605"],
          configHe: [
            "צור Serial Number ב-IQ01.",
            "ודא יצירת Equipment מסונכרן (תלוי ב-Equipment Category בפרופיל).",
          ],
          mistakesHe: [
            "יצירת Serial כשהפרופיל בלי Equipment Category — אין Equipment.",
            "אי-תיעוד הקישור Serial↔Equipment.",
          ],
          troubleshootHe: [
            "Equipment לא נוצר ➔ Equipment Category חסר ב-Serial Number Profile.",
          ],
          bestPracticeHe: [
            "ודא סנכרון Serial↔Equipment מיד לאחר היצירה.",
            "שמור מספור-סידורי עקבי.",
          ],
          interviewHe: [
            { qHe: "מה קורה כשיוצרים Serial Number למכשיר?", aHe: "אם ה-Serial Number Profile מכיל Equipment Category, נוצר אוטומטית Equipment מסונכרן (Material/Serial↔Equipment), הפותח את מסלול-הכיול ב-PM." },
          ],
          takeawaysHe: [
            "Serial = זיהוי-יחידה + טריגר ליצירת Equipment.",
            "תלוי ב-Equipment Category בפרופיל.",
          ],
        },
        {
          id: "7.4.3",
          titleHe: "סנכרון ציוד-בדיקה ומספר-סידורי",
          titleEn: "Test Equipment & Serial Number Synchronization",
          execHe:
            "הסנכרון הדו-כיווני בין Serial Number ל-Equipment מבטיח שכל שינוי בצד אחד משתקף בשני. זהו הדבק שמאחד את עולם-ה-Material (לוגיסטיקה) עם עולם-ה-Equipment (תחזוקה/כיול).",
          beginnerHe:
            "המספר-הסידורי והציוד הם שני צדדים של אותו מטבע — והם מסונכרנים. אם משנים פרט באחד, זה מתעדכן בשני. כך אין סתירות בין 'המוצר' ל'ציוד'.",
          consultantHe:
            "הסנכרון נשען על Equipment Category ב-Serial Number Profile. שינוי-מיקום, סטטוס או נתוני-אב מתעדכן דו-כיוונית בין SER01/OBJK ל-EQUI/EQUZ. ב-S/4HANA הסנכרון הוא הליבה לניהול עקבי; ניתוק-הסנכרון (Decoupling) הוא מקור-תקלות נפוץ.",
          purposeHe:
            "לשמור עקביות-נתונים מלאה בין הייצוג-הלוגיסטי לייצוג-התחזוקתי של אותו מכשיר.",
          processExampleHe:
            "העברת מכשיר למיקום חדש מתעדכנת ב-Equipment וב-Serial גם יחד, ללא הזנה-כפולה.",
          cbcHe:
            "ב-CBC העברת מד-מילוי בין קווים מתעדכנת אוטומטית בשני הצדדים — נראות-מלאי וגם היסטוריית-Equipment.",
          navHe: ["Logistics – General ► Serial Number Management ► Serial Number Profiles (sync settings)"],
          tables: ["SER01", "OBJK", "EQUI", "EQUZ"],
          tcodes: ["IQ02", "IE02", "OIS2"],
          fiori: ["F1605"],
          configHe: [
            "ודא Equipment Category בפרופיל לסנכרון מלא.",
            "אל תנתק את הקישור Serial↔Equipment ללא הצדקה.",
          ],
          mistakesHe: [
            "ניתוק-סנכרון ידני שגורם לסתירות-נתונים.",
            "עדכון רק בצד אחד והנחה שהשני התעדכן.",
          ],
          troubleshootHe: [
            "נתוני Serial ו-Equipment לא תואמים ➔ סנכרון נותק / Equipment Category שונה.",
          ],
          bestPracticeHe: [
            "שמור על קישור-סנכרון רציף לאורך-חיי-המכשיר.",
            "עדכן תמיד דרך הזרימה התומכת-סנכרון.",
          ],
          interviewHe: [
            { qHe: "מהו הסנכרון Serial↔Equipment ומדוע הוא חשוב?", aHe: "סנכרון דו-כיווני המבטיח שנתוני המספר-הסידורי וה-Equipment תמיד עקביים. הוא מאחד את העולם-הלוגיסטי (Material) עם העולם-התחזוקתי (Equipment), ומונע סתירות-נתונים בכיול ובמעקב." },
          ],
          takeawaysHe: [
            "סנכרון דו-כיווני Serial↔Equipment שומר עקביות.",
            "מבוסס Equipment Category בפרופיל.",
            "ניתוק = מקור-תקלות.",
          ],
        },
        {
          id: "7.4.4",
          titleHe: "ציוד-בדיקה (Equipment)",
          titleEn: "Test Equipment",
          execHe:
            "ה-Equipment הוא הרשומה התחזוקתית של המכשיר, המקשרת אותו ל-Task List, ל-Maintenance Plan ול-Calibration Order. כאן נשמרת היסטוריית-הכיולים ונקבע סיווג-המכשיר.",
          beginnerHe:
            "ה'ציוד' הוא הרשומה שבה PM מנהל את המכשיר: אילו כיולים בוצעו, מתי, ומה התוצאות. זו הרשומה שמחברת את הכל יחד.",
          consultantHe:
            "Equipment (EQUI/EQKT/EQUZ) עם Equipment Category לציוד-בדיקה, מיקום (Functional Location אופציונלי), וקישור ל-Task List ול-Maintenance Plan. ה-Equipment הוא ה-Reference Object של ה-Calibration Order וה-Inspection Lot. היסטוריית-הכיולים נשמרת ומשמשת לביקורת.",
          purposeHe:
            "לרכז את כל ניהול-הכיול והיסטוריה סביב אובייקט-תחזוקה יחיד לכל מכשיר.",
          processExampleHe:
            "Equipment למד-לחץ מקושר ל-Task List ול-Plan; כל כיול מתועד בהיסטוריית-ה-Equipment.",
          cbcHe:
            "ב-CBC היסטוריית-הכיולים ב-Equipment משמשת להוכחת-תאימות מול מבקרי-מזון ו-ISO.",
          navHe: ["Plant Maintenance and Customer Service ► Technical Objects ► Equipment ► Display Equipment (IE03)"],
          tables: ["EQUI", "EQKT", "EQUZ"],
          tcodes: ["IE01", "IE02", "IE03"],
          fiori: ["F2218"],
          configHe: [
            "הגדר Equipment Category לציוד-בדיקה.",
            "קשר Task List ו-Maintenance Plan.",
          ],
          mistakesHe: [
            "Equipment ללא קישור ל-Task List/Plan — אין כיול.",
            "סיווג-Equipment שגוי.",
          ],
          troubleshootHe: [
            "כיול לא מתוזמן ➔ Equipment לא מקושר ל-Maintenance Plan.",
          ],
          bestPracticeHe: [
            "נהל היסטוריית-כיולים ב-Equipment לביקורת.",
            "השתמש ב-Equipment Category אחיד.",
          ],
          interviewHe: [
            { qHe: "מהו תפקיד ה-Equipment במעגל-הכיול?", aHe: "ה-Equipment הוא ה-Reference Object של ה-Calibration Order וה-Inspection Lot, ומקשר את המכשיר ל-Task List ול-Maintenance Plan. בו נשמרת היסטוריית-הכיולים לביקורת." },
          ],
          takeawaysHe: [
            "Equipment = רשומת-הכיול המרכזית.",
            "Reference Object להזמנה ול-Inspection Lot.",
            "שומר היסטוריית-כיולים.",
          ],
          relatedHe: [{ labelHe: "PM · אב-ציוד (EQUI)", href: "/library/pm/object/EQUI/" }],
        },
        {
          id: "7.4.5",
          titleHe: "רשימת-משימות כללית (General Task List)",
          titleEn: "General Task List",
          execHe:
            "ה-General Task List מגדיר את פעולות-הכיול ואת Inspection Characteristics (מאפייני-הבדיקה עם טווחי-תקן). הוא ה'מתכון' של מה לבדוק בכיול וכיצד, ומשמש בסיס ל-Inspection Lot שנוצר עם ה-Calibration Order.",
          beginnerHe:
            "רשימת-המשימות אומרת 'מה בודקים בכיול': אילו מאפיינים למדוד (למשל קריאת-pH ב-3 נקודות), מה הטווח-התקין, ובאיזה סדר. זה התסריט שהטכנאי ממלא.",
          consultantHe:
            "General Task List (PLKO כותרת, PLPO פעולות) יוצר ב-IA05, נושא Inspection Characteristics (טווחי-תקן, Master Inspection Characteristics אופציונלי). הוא 'כללי' (לא קשור ל-Material יחיד), ומשויך ל-Maintenance Plan. בעת יצירת ה-Inspection Lot, המאפיינים מועתקים ל-Lot לרישום-תוצאות (QGA2).",
          purposeHe:
            "להגדיר באופן סטנדרטי ובר-שימוש-חוזר את תוכן-הכיול ומאפייניו.",
          processExampleHe:
            "Task List לכיול pH-meter כולל פעולה 'מדידת-buffer 4/7/10' עם מאפיין לכל buffer וטווח-תקין מצומצם; ה-Lot יורש מאפיינים אלה.",
          cbcHe:
            "ב-CBC Task List לרפרקטומטר מגדיר מדידת Brix בתקן ידוע עם טווח-תקין, ומשמש את כל מכשירי אותו סוג.",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance Plans ► Task Lists ► General Maintenance Task Lists (IA05)"],
          tables: ["PLKO", "PLPO", "PLMK"],
          tcodes: ["IA05", "IA06", "IA07"],
          fiori: ["F2218"],
          configHe: [
            "צור General Task List (IA05) עם פעולות-כיול.",
            "הוסף Inspection Characteristics עם טווחי-תקן (ו-MIC אם רלוונטי).",
          ],
          mistakesHe: [
            "Task List ללא Inspection Characteristics — אין מה לרשום ב-Lot.",
            "טווחי-תקן שגויים שמכשילים מכשירים תקינים.",
          ],
          troubleshootHe: [
            "אין מאפיינים ב-Inspection Lot ➔ Task List חסר Inspection Characteristics.",
          ],
          bestPracticeHe: [
            "השתמש ב-Master Inspection Characteristics לאחידות.",
            "תקנן Task Lists לסוגי-מכשירים זהים.",
          ],
          interviewHe: [
            { qHe: "מה מגדיר ה-General Task List בכיול?", aHe: "את פעולות-הכיול ואת ה-Inspection Characteristics (מאפיינים עם טווחי-תקן). הוא 'כללי' ובר-שימוש-חוזר, ומאפייניו מועתקים ל-Inspection Lot לרישום-תוצאות ב-QGA2." },
          ],
          takeawaysHe: [
            "Task List = 'מה בודקים' בכיול.",
            "נושא Inspection Characteristics עם טווחי-תקן.",
            "בר-שימוש-חוזר (כללי) ומשויך ל-Plan.",
          ],
        },
        {
          id: "7.4.6",
          titleHe: "תוכנית-תחזוקה (Maintenance Plan)",
          titleEn: "Maintenance Plan",
          execHe:
            "ה-Maintenance Plan מתזמן את הכיול לאורך-זמן ומקשר Equipment + General Task List. בכיול משתמשים לרוב בתוכנית מסוג Single-cycle (מחזור-יחיד), הקובעת תדירות-כיול קבועה (למשל שנתי).",
          beginnerHe:
            "התוכנית היא 'התזכורת החוזרת': היא אומרת 'כל שנה צריך לכייל את המכשיר הזה לפי רשימת-המשימות הזו'. היא מחברת בין הציוד לבדיקה ולתדירות.",
          consultantHe:
            "Maintenance Plan (MPLA כותרת, MPOS פריט) יוצר ב-IP42, מסוג Single-cycle לכיול. הוא מקשר Equipment + General Task List + Order Type (PM05) + Cycle (תדירות). בעת תזמון (IP10) המערכת מחשבת תאריכי-יעד; ב-Deadline Monitoring (IP30) הם הופכים ל-Calibration Orders. ניתן גם Strategy Plan למחזורים-מרובים.",
          purposeHe:
            "לקבוע מתי ובאיזו תדירות יבוצע הכיול, ולקשר את הציוד לתוכן-הבדיקה.",
          processExampleHe:
            "Maintenance Plan שנתי למד-pH מקשר את ה-Equipment ל-Task List ול-PM05; IP10 מתזמן, IP30 מייצר הזמנה במועד.",
          cbcHe:
            "ב-CBC תדירות-הכיול נקבעת לפי-רגולציה: מכשירים קריטיים לשחרור-אצווה — חצי-שנתי; אחרים — שנתי.",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance Plans ► Create Maintenance Plan (IP42)"],
          tables: ["MPLA", "MPOS", "MMPT"],
          tcodes: ["IP42", "IP02", "IP03"],
          fiori: ["F2218"],
          configHe: [
            "צור Maintenance Plan מסוג Single-cycle (IP42).",
            "קשר Equipment + General Task List + Order Type (PM05) + Cycle.",
          ],
          mistakesHe: [
            "תדירות שגויה (Cycle) — כיול תכוף-מדי או נדיר-מדי.",
            "אי-קישור Task List לתוכנית — אין מאפיינים בהזמנה.",
          ],
          troubleshootHe: [
            "אין הזמנות ➔ התוכנית לא מתוזמנת (IP10) או Cycle שגוי.",
            "אין מאפיינים בהזמנה ➔ Task List לא מקושר לתוכנית.",
          ],
          bestPracticeHe: [
            "השתמש ב-Single-cycle לכיול-פשוט; Strategy Plan למחזורים-מרובים.",
            "התאם תדירות לדרישות-רגולציה.",
          ],
          interviewHe: [
            { qHe: "איזה סוג Maintenance Plan נפוץ לכיול ומה הוא מקשר?", aHe: "Single-cycle Plan. הוא מקשר Equipment + General Task List + Order Type (PM05) + Cycle (תדירות), וקובע מתי ייווצרו הזמנות-הכיול דרך IP10/IP30." },
          ],
          takeawaysHe: [
            "Maintenance Plan = תזמון-הכיול.",
            "לרוב Single-cycle; מקשר Equipment+Task List+Cycle.",
            "MPLA/MPOS; יוצר ב-IP42.",
          ],
          relatedHe: [{ labelHe: "PM · תוכניות-תחזוקה (MPLA)", href: "/library/pm/object/MPLA/" }],
        },
        {
          id: "7.4.7",
          titleHe: "תזמון תוכנית-התחזוקה",
          titleEn: "Schedule Maintenance Plan",
          execHe:
            "תזמון התוכנית (IP10) מפעיל את מחזור-הכיול: המערכת מחשבת את תאריכי-היעד הראשונים על-בסיס ה-Cycle ותאריך-ההתחלה, ויוצרת Scheduled Calls הממתינים להמרה להזמנות.",
          beginnerHe:
            "אחרי שיצרת את התוכנית, צריך 'להפעיל' אותה — לתזמן. ב-IP10 אומרים למערכת 'התחל לספור', והיא מחשבת מתי הכיול הבא צריך לקרות.",
          consultantHe:
            "ב-IP10 מבצעים Start/Schedule ל-Maintenance Plan. המערכת מייצרת Scheduled Calls (תאריכי-יעד) לפי ה-Cycle, Scheduling Period ו-Call Horizon. ה-Calls בסטטוס 'Hold/Scheduled' עד שה-Deadline Monitoring (IP30) ממיר אותם להזמנות. ניתן לבצע Manual Call במידת-הצורך.",
          purposeHe:
            "להניע את מחזור-התזמון ולחשב את מועדי-הכיול הצפויים.",
          processExampleHe:
            "מתזמנים תוכנית שנתית ב-IP10 בתאריך-התחלה 01.01; המערכת קובעת מועד-יעד ל-01.01 בשנה הבאה ויוצרת Scheduled Call.",
          cbcHe:
            "ב-CBC כל תוכניות-הכיול מתוזמנות ב-IP10 עם Call Horizon התואם את חלון-התכנון של המעבדה.",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance Plans ► Schedule Maintenance Plan (IP10)"],
          tables: ["MPLA", "MHIS"],
          tcodes: ["IP10", "IP30"],
          fiori: ["F2218"],
          configHe: [
            "בצע Start/Schedule ל-Plan ב-IP10.",
            "הגדר Scheduling Period ו-Call Horizon מתאימים.",
          ],
          mistakesHe: [
            "אי-תזמון התוכנית — לא ייווצרו לעולם הזמנות.",
            "Call Horizon קצר-מדי — הזמנות נוצרות מאוחר.",
          ],
          troubleshootHe: [
            "אין Scheduled Calls ➔ התוכנית לא תוזמנה (IP10).",
            "הזמנות נוצרות באיחור ➔ Call Horizon לא מתאים.",
          ],
          bestPracticeHe: [
            "תזמן מיד לאחר יצירת-התוכנית.",
            "כוון Call Horizon לחלון-ההיערכות של המעבדה.",
          ],
          interviewHe: [
            { qHe: "מה עושה IP10 ומהו Call Horizon?", aHe: "IP10 מתזמן את ה-Maintenance Plan ומחשב Scheduled Calls (תאריכי-יעד). Call Horizon קובע כמה מוקדם לפני מועד-היעד ה-Call ייפתח להמרה להזמנה — מאפשר היערכות-מראש." },
          ],
          takeawaysHe: [
            "IP10 מניע את מחזור-התזמון.",
            "יוצר Scheduled Calls לפי Cycle/Horizon.",
            "ללא תזמון — אין הזמנות.",
          ],
        },
        {
          id: "7.4.8",
          titleHe: "ניטור מועדים (Deadline Monitoring)",
          titleEn: "Deadline Monitoring",
          execHe:
            "Deadline Monitoring (IP30) הוא ה-Job הסורק את כל תוכניות-התחזוקה, מזהה Scheduled Calls שהגיע מועדם בתוך ה-Call Horizon, וממיר אותם ל-Calibration Orders בפועל (עם Inspection Lot type 14). זהו השלב שהופך תזמון לפעולה.",
          beginnerHe:
            "זו ה'משימה הלילית' שעוברת על כל התוכניות ושואלת 'למי הגיע הזמן לכייל?'. למי שכן — היא יוצרת את הזמנת-הכיול בפועל.",
          consultantHe:
            "IP30 רץ כ-Batch Job תקופתי, מבצע Deadline Monitoring לכל ה-Plans, וממיר Calls בתוך ה-Call Horizon להזמנות-תחזוקה. עם השחרור (אם Type 14 משויך) נוצר Inspection Lot. ניתן להגביל לפי תחום/מתזמן. כשלון ה-Job = אין הזמנות-כיול אוטומטיות.",
          purposeHe:
            "להמיר אוטומטית את מועדי-הכיול המתוזמנים להזמנות-עבודה במועד.",
          processExampleHe:
            "IP30 הלילי מזהה שמועד-הכיול של מד-pH בתוך ה-Horizon, ויוצר Calibration Order עם Inspection Lot 14 הממתין לטכנאי.",
          cbcHe:
            "ב-CBC IP30 רץ כל לילה ומייצר את כל הזמנות-הכיול ליום-המחרת, כך שהמעבדה מתחילה את היום עם רשימת-עבודה מוכנה.",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance Plans ► Deadline Monitoring (IP30)"],
          tables: ["MPLA", "MHIS", "QALS"],
          tcodes: ["IP30", "IP10"],
          fiori: ["F2218"],
          configHe: [
            "תזמן IP30 כ-Batch Job תקופתי (לילי).",
            "הגדר טווח-Plans/Scope ו-Interval מתאימים.",
          ],
          mistakesHe: [
            "אי-תזמון IP30 — Scheduled Calls לא הופכים להזמנות.",
            "Scope צר-מדי שמפספס תוכניות.",
          ],
          troubleshootHe: [
            "אין הזמנות-כיול למרות תזמון ➔ IP30 לא רץ או Scope שגוי.",
            "אין Inspection Lot בהזמנה ➔ Type 14 לא משויך לסוג-ההזמנה.",
          ],
          bestPracticeHe: [
            "הרץ IP30 כ-Job לילי קבוע על כל המפעלים.",
            "נטר את תוצאות-ה-Job יומית.",
          ],
          interviewHe: [
            { qHe: "מה עושה IP30 (Deadline Monitoring)?", aHe: "סורק את כל ה-Maintenance Plans, מזהה Scheduled Calls שמועדם בתוך ה-Call Horizon, וממיר אותם ל-Calibration Orders (עם Inspection Lot type 14 בשחרור). רץ לרוב כ-Batch Job לילי." },
          ],
          takeawaysHe: [
            "IP30 = הממיר תזמון להזמנות בפועל.",
            "רץ כ-Job לילי קבוע.",
            "כשלונו = אין הזמנות-כיול אוטומטיות.",
          ],
        },
      ],
    },
    // ============================================================ 7.5
    {
      id: "7.5",
      titleHe: "תהליכים עסקיים בניהול ציוד-בדיקה",
      titleEn: "Business Processes in Test Equipment Management",
      execHe:
        "זהו לב-הפרק: התהליך-העסקי השוטף של הכיול. הוא מתחיל ב-Calibration Order (PM Order), שאליה צמוד Inspection Lot מסוג 14; הטכנאי רושם תוצאות (QGA2) מול מאפייני-ה-Task List; העבודה מנוהלת דרך Worklist; ההזמנה נסגרת ומסכמת; ולבסוף מתבצעות הערכות והפקת-תובנות. ה-UD (Usage Decision) קובע אם המכשיר תקין להמשך-שימוש.",
      beginnerHe:
        "עד עכשיו הכנו הכל; כאן זה קורה בפועל. נפתחת הזמנת-כיול, אליה מחוברת בדיקת-QM. הטכנאי מודד ורושם תוצאות, בודק מול הטווח-התקין, ומחליט אם המכשיר תקין. ואז סוגרים את ההזמנה ומפיקים דוחות.",
      consultantHe:
        "התהליך: IP30 → Calibration Order (PM Order) + Inspection Lot 14 (QALS) → שחרור-ההזמנה → רישום-תוצאות (QGA2/QE51N) מול מאפייני-ה-Task List → Usage Decision (QA11/QA32) הקובע Accept/Reject → סגירת-הזמנה (TECO) → הערכות (QGA3 וכד'). אם המכשיר נכשל בכיול — ה-UD מסמן זאת, ויש להוציאו משימוש עד תיקון/כיול-מחדש, מה שעשוי להשפיע על שחרור-אצוות שנמדדו בו.",
      purposeHe:
        "להריץ את מחזור-הכיול מקצה-לקצה: הזמנה→בדיקה→תוצאות→החלטה→סגירה→הערכה, תוך שמירת-תיעוד מלא לביקורת.",
      processExampleHe:
        "IP30 פותח Calibration Order; הטכנאי משחרר, מבצע מדידות מול תקן-ייחוס, רושם ב-QGA2, קובע UD 'Accept', וסוגר את ההזמנה. דוח-ההערכה מציג את שיעור-ה-Pass של כלל-המכשירים.",
      cbcHe:
        "ב-CBC הטכנאי מכייל מד-CO2 מול גז-ייחוס, רושם תוצאות, וקובע UD. אם נכשל — המד מוצא משימוש, ונבדקת השפעה אחורה על אצוות שנמדדו בו (Quarantine/Recall אם נדרש).",
      navHe: [
        "Quality Management ► Quality Inspection ► Worklist",
        "Plant Maintenance and Customer Service ► Maintenance and Service Orders",
      ],
      tables: ["QALS", "AUFK", "AFKO", "QAVE"],
      tcodes: ["IP30", "IW32", "QGA2", "QA11", "QA32"],
      fiori: ["F2218", "F1605"],
      configHe: [
        "ודא שמעגל ה-Order↔Inspection Lot↔Results↔UD פעיל מקצה-לקצה.",
        "הגדר Worklist ו-Selection לטכנאים.",
        "הגדר השפעת UD שלילי על שחרור-אצווה (אם נדרש).",
      ],
      flow: [
        { he: "Calibration Order", code: "IP30/IW32" },
        { he: "Inspection Lot 14", code: "QALS" },
        { he: "רישום-תוצאות", code: "QGA2" },
        { he: "Usage Decision", code: "QA11", note: "Accept/Reject" },
        { he: "סגירת-הזמנה", code: "TECO" },
        { he: "הערכות", code: "QGA3" },
      ],
      mistakesHe: [
        "סגירת-הזמנה לפני UD — תיעוד-כיול חסר.",
        "התעלמות מ-UD שלילי והמשך-שימוש במכשיר פגום.",
      ],
      troubleshootHe: [
        "לא ניתן לקבוע UD ➔ תוצאות לא נרשמו במלואן.",
        "ההזמנה לא נסגרת ➔ Inspection Lot פתוח ללא UD.",
      ],
      bestPracticeHe: [
        "אכוף רישום-תוצאות מלא ו-UD לפני סגירת-הזמנה.",
        "הגדר תגובה אוטומטית ל-UD שלילי (חסימת-מכשיר/בדיקת-אצוות).",
      ],
      interviewHe: [
        { qHe: "מהו זרימת התהליך-העסקי של כיול מקצה-לקצה?", aHe: "IP30 יוצר Calibration Order + Inspection Lot 14; הטכנאי משחרר, רושם תוצאות (QGA2), קובע Usage Decision (Accept/Reject), סוגר את ההזמנה (TECO), ומפיק הערכות. UD שלילי מוציא את המכשיר משימוש." },
      ],
      takeawaysHe: [
        "המחזור: Order→Lot→Results→UD→Close→Evaluate.",
        "UD קובע תקינות-מכשיר; שלילי = הוצאה-משימוש.",
        "תיעוד מלא לפני סגירה — חיוני לביקורת.",
      ],
      children: [
        {
          id: "7.5.1",
          titleHe: "הזמנת-כיול (Calibration Order)",
          titleEn: "Calibration Order",
          execHe:
            "ה-Calibration Order היא PM Order (סוג PM05/PM06) המתארת את עבודת-הכיול: המכשיר (Equipment), הפעולות (מה-Task List), והמשאבים. אליה צמוד אוטומטית ה-Inspection Lot. היא מנהלת תכנון, ביצוע ועלות של הכיול.",
          beginnerHe:
            "הזמנת-הכיול היא 'כרטיס-העבודה' של הכיול: מה לעשות, על איזה מכשיר, מי מבצע וכמה זה עולה. היא נוצרת אוטומטית מהתוכנית, ואליה מחוברת בדיקת-ה-QM.",
          consultantHe:
            "PM Order (AUFK/AFKO) מסוג כיול, נוצרת מ-IP30 או ידנית (IW31). נושאת Operations מה-Task List, Reference Object = Equipment, ועלויות. בשחרור (אם Type 14 משויך) נוצר Inspection Lot 14. מנהלת זמן-עבודה (Confirmations) ועלות-כיול. סגירה ב-TECO לאחר UD.",
          purposeHe:
            "לתכנן, לבצע ולתמחר את עבודת-הכיול, ולשמש מיכל ל-Inspection Lot.",
          processExampleHe:
            "Calibration Order למד-לחץ נפתחת מ-IP30, משוחררת, הטכנאי מבצע ומדווח שעות, ה-Inspection Lot נרשם, ולבסוף TECO.",
          cbcHe:
            "ב-CBC כל הזמנת-כיול אוגרת את עלות-המעבדה והשעות, לצורכי-תקצוב ובקרת-איכות.",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance and Service Orders ► Create/Change Order (IW31/IW32)"],
          tables: ["AUFK", "AFKO", "AFVC"],
          tcodes: ["IW31", "IW32", "IW33"],
          fiori: ["F2218"],
          configHe: [
            "השתמש בסוג-הזמנה ייעודי לכיול (PM05) עם Type 14 משויך.",
            "ודא Reference Object = Equipment.",
          ],
          mistakesHe: [
            "פתיחה ידנית בסוג-הזמנה ללא Type 14 — אין Inspection Lot.",
            "Reference Object שגוי — בדיקה למכשיר הלא-נכון.",
          ],
          troubleshootHe: [
            "אין Inspection Lot בהזמנה ➔ סוג-ההזמנה ללא שיוך Type 14.",
          ],
          bestPracticeHe: [
            "העדף יצירה אוטומטית (IP30) על-פני ידנית.",
            "נהל עלות-כיול דרך ההזמנה לבקרת-תקציב.",
          ],
          interviewHe: [
            { qHe: "מהי Calibration Order ומה ייחודה?", aHe: "PM Order מסוג כיול (PM05/PM06) הנושאת את פעולות-הכיול מה-Task List ומקושרת ל-Equipment. בשחרורה נוצר אוטומטית Inspection Lot type 14 לרישום-תוצאות. מנהלת תכנון, ביצוע ועלות-כיול." },
          ],
          takeawaysHe: [
            "Calibration Order = PM Order של כיול.",
            "מולידה Inspection Lot 14 בשחרור.",
            "מנהלת עבודה ועלות; נסגרת ב-TECO.",
          ],
          relatedHe: [{ labelHe: "PM · הזמנת-תחזוקה", href: "/library/pm/object/AUFK/" }],
        },
        {
          id: "7.5.2",
          titleHe: "Inspection Lot של QM לציוד-בדיקה (סוג-בדיקה 14)",
          titleEn: "QM Inspection Lot for Test Equipment (Inspection Type 14)",
          execHe:
            "ה-Inspection Lot מסוג 14 הוא רשומת-הבדיקה שנוצרת אוטומטית עם שחרור Calibration Order. הוא נושא את Inspection Characteristics מה-Task List ומשמש לרישום-תוצאות ו-UD. זהו הגשר הפורמלי בין PM ל-QM.",
          beginnerHe:
            "ה-Inspection Lot הוא 'טופס-הבדיקה' של ה-QM. כשנפתחת הזמנת-כיול, נוצר אוטומטית טופס כזה (מסוג 14) עם כל המאפיינים שצריך למדוד. הטכנאי ממלא אותו.",
          consultantHe:
            "Inspection Lot (QALS) עם Origin 14, מקושר ל-PM Order ול-Equipment. יורש Inspection Characteristics מה-Task List. סטטוס-הזרימה: Created→Released (אוטומטי)→Results→UD. ה-Lot מאפשר רישום ערכי-מדידה והשוואה לטווחי-תקן, ובסיומו UD שמשפיע על סטטוס-המכשיר.",
          purposeHe:
            "לספק את מסגרת ה-QM הפורמלית לרישום, הערכה ותיעוד תוצאות-הכיול.",
          processExampleHe:
            "Inspection Lot 14 נוצר עם הזמנת-כיול pH; כולל 3 מאפיינים (buffer 4/7/10); הטכנאי רושם ערכים, המערכת משווה לטווח, ומסכמת תקין/חורג.",
          cbcHe:
            "ב-CBC כל כיול מתועד כ-Inspection Lot 14 — בסיס לאישור-תאימות מול מבקרי-מזון.",
          navHe: ["Quality Management ► Quality Inspection ► Inspection Lot ► Display (QA03)"],
          tables: ["QALS", "QAPP", "QAMR"],
          tcodes: ["QA03", "QA32", "QE51N"],
          fiori: ["F1605"],
          configHe: [
            "ודא Origin 14 מופעל ומשויך לסוג-הזמנת-הכיול.",
            "הגדר Auto-release ל-Lot בשחרור-ההזמנה.",
          ],
          mistakesHe: [
            "ציפייה ל-Lot ללא שיוך Type 14 לסוג-ההזמנה.",
            "Task List ללא מאפיינים — Lot ריק.",
          ],
          troubleshootHe: [
            "Lot 14 לא נוצר ➔ Type 14 לא משויך / Task List לא מקושר.",
            "Lot ללא מאפיינים ➔ Task List חסר Inspection Characteristics.",
          ],
          bestPracticeHe: [
            "הפעל Auto-release ל-Lot לזרימה חלקה.",
            "ודא ירושת-מאפיינים תקינה מה-Task List.",
          ],
          interviewHe: [
            { qHe: "כיצד נוצר Inspection Lot מסוג 14?", aHe: "אוטומטית בשחרור Calibration Order, בתנאי ש-Inspection Type 14 משויך לסוג-הזמנת-ה-PM. ה-Lot יורש את Inspection Characteristics מה-General Task List ומשמש לרישום-תוצאות ו-UD." },
          ],
          takeawaysHe: [
            "Inspection Lot 14 = הגשר הפורמלי PM↔QM.",
            "נוצר אוטומטית בשחרור-ההזמנה.",
            "יורש מאפיינים מה-Task List.",
          ],
          relatedHe: [{ labelHe: "QM · אובייקט QALS", href: "/library/qm/object/QALS/" }],
        },
        {
          id: "7.5.3",
          titleHe: "רישום תוצאות (Results Recording)",
          titleEn: "Results Recording",
          execHe:
            "רישום-התוצאות (QGA2 / QE51N) הוא המעשה המרכזי בכיול: הטכנאי מזין את ערכי-המדידה למאפייני-ה-Inspection Lot, והמערכת משווה אוטומטית לטווחי-התקן וקובעת תקין/חורג לכל מאפיין.",
          beginnerHe:
            "כאן הטכנאי ממלא את הטופס: מזין את מה שמדד (למשל 'pH=7.02'), והמערכת בודקת אם זה בטווח-התקין. כל מאפיין מקבל 'תקין' או 'חורג'.",
          consultantHe:
            "ב-QGA2 (Results Recording for Maintenance Order) או QE51N רושמים ערכי-מדידה ל-Inspection Characteristics. המערכת מבצעת Valuation מול טווחי-התקן (QAMR/QAPP). ניתן לרשום ערכים-מדודים (Quantitative) או תכונות (Qualitative). תוצאות-ה-Lot מסכמות Accept/Reject ומזינות את ה-UD.",
          purposeHe:
            "לתעד את מדידות-הכיול ולהעריך אוטומטית את תקינות-המכשיר מול התקן.",
          processExampleHe:
            "טכנאי מזין ב-QGA2 קריאות buffer; המערכת מסמנת מאפיין שחרג מהטווח כ-'Reject', והשאר כ-'Accept'.",
          cbcHe:
            "ב-CBC קריאות הרפרקטומטר מול תקן Brix נרשמות ב-QGA2; חריגה מסמנת את המד ככשל-כיול.",
          navHe: ["Quality Management ► Quality Inspection ► Results Recording (QE51N) / Maintenance Order Results (QGA2)"],
          tables: ["QAMR", "QASE", "QAPP"],
          tcodes: ["QGA2", "QE51N", "QE11"],
          fiori: ["F1605"],
          configHe: [
            "הגדר Results Recording דרך QGA2 להזמנות-כיול.",
            "ודא Valuation אוטומטי מול טווחי-תקן.",
          ],
          mistakesHe: [
            "רישום-חלקי שמונע קביעת-UD.",
            "טווחי-תקן שגויים שמכשילים/מאשרים בטעות.",
          ],
          troubleshootHe: [
            "לא ניתן לקבוע UD ➔ לא כל המאפיינים נרשמו.",
            "Valuation שגוי ➔ טווחי-תקן/יחידות לא-תואמים.",
          ],
          bestPracticeHe: [
            "אכוף רישום-מלא של כל המאפיינים.",
            "השתמש ב-MIC לאחידות-מדידה.",
          ],
          interviewHe: [
            { qHe: "מה קורה ברישום-תוצאות של כיול?", aHe: "הטכנאי מזין ערכי-מדידה למאפייני-ה-Inspection Lot ב-QGA2/QE51N, והמערכת מבצעת Valuation אוטומטי מול טווחי-התקן — קובעת תקין/חורג לכל מאפיין, מה שמזין את ה-Usage Decision." },
          ],
          takeawaysHe: [
            "QGA2/QE51N = רישום-מדידות הכיול.",
            "Valuation אוטומטי מול טווחי-תקן.",
            "מזין את ה-UD.",
          ],
        },
        {
          id: "7.5.4",
          titleHe: "רשימת-עבודה של הזמנות-כיול (Worklist)",
          titleEn: "Calibration Orders Worklist",
          execHe:
            "ה-Worklist מרכז את כל הזמנות-הכיול הפתוחות ואת ה-Inspection Lots הממתינים, ומאפשר לטכנאי לתעדף, לבחור ולעבד אותם ביעילות במקום-אחד.",
          beginnerHe:
            "במקום לחפש כל הזמנה בנפרד, ה-Worklist הוא 'רשימת-המטלות' של הטכנאי: כל הכיולים שצריך לבצע, במסך-אחד, מסודרים לפי עדיפות.",
          consultantHe:
            "Worklist דרך QE51N (Results Recording Worklist) או IW38/IW39 (Order/Operation lists) ו-QA32 (Inspection Lot selection). מאפשר Selection לפי תחום/תאריך/סטטוס, עיבוד-המוני ומעקב-עומס. בסיס לניהול תפוקת-המעבדה.",
          purposeHe:
            "לנהל את עומס-הכיול ולאפשר עיבוד-יעיל ומתועדף של הזמנות ו-Lots.",
          processExampleHe:
            "טכנאי פותח QE51N עם Selection 'כל ה-Lots הפתוחים מסוג 14 השבוע', מתעדף לפי מועד, ומעבד ברצף.",
          cbcHe:
            "ב-CBC מנהל-המעבדה משתמש ב-Worklist יומי לחלוקת-עבודת-הכיול בין הטכנאים.",
          navHe: ["Quality Management ► Quality Inspection ► Worklist (QE51N) / Order Lists (IW38)"],
          tables: ["QALS", "AUFK"],
          tcodes: ["QE51N", "QA32", "IW38", "IW39"],
          fiori: ["F1605", "F2218"],
          configHe: [
            "הגדר Selection Variants ל-Worklist לפי תחום/סטטוס.",
            "אפשר עיבוד-המוני להזמנות-כיול.",
          ],
          mistakesHe: [
            "Selection רחב-מדי שמציף את הרשימה.",
            "אי-תעדוף לפי מועד שגורם לאיחורי-כיול.",
          ],
          troubleshootHe: [
            "הזמנות לא מופיעות ב-Worklist ➔ Selection/סטטוס שגוי.",
          ],
          bestPracticeHe: [
            "בנה Selection Variants קבועים לטכנאים.",
            "תעדף לפי מועד-יעד ועדיפות-מכשיר.",
          ],
          interviewHe: [
            { qHe: "מה מספק ה-Worklist בניהול-כיול?", aHe: "ריכוז כל הזמנות-הכיול וה-Inspection Lots הפתוחים במסך-אחד (QE51N/IW38/QA32), עם Selection ותעדוף — לעיבוד-יעיל ומעקב-עומס של עבודת-המעבדה." },
          ],
          takeawaysHe: [
            "Worklist = רשימת-המטלות של הטכנאי.",
            "QE51N/IW38/QA32 עם Selection.",
            "מנהל עומס ותעדוף.",
          ],
        },
        {
          id: "7.5.5",
          titleHe: "סגירת הזמנות-כיול (Completion)",
          titleEn: "Calibration Orders Completion",
          execHe:
            "סגירת ההזמנה כוללת קביעת Usage Decision ל-Inspection Lot, סיכום-עבודה (Confirmation), וביצוע Technical Completion (TECO). ה-UD קובע אם המכשיר 'תקין-לשימוש'; שלילי מוביל להוצאתו-משימוש.",
          beginnerHe:
            "אחרי שרשמנו תוצאות — מחליטים: המכשיר תקין? (Usage Decision), מדווחים שעות, וסוגרים את ההזמנה. אם המכשיר נכשל, הוא יוצא משימוש עד תיקון.",
          consultantHe:
            "השלמה: UD (QA11) ל-Lot — Accept/Reject + Status-Change ל-Equipment; Confirmation (IW41) של שעות-עבודה; TECO ל-PM Order. UD שלילי יכול לעדכן User Status של ה-Equipment ('לא-תקין') ולחסום שימוש, ולהפעיל בדיקת-השפעה אחורה על אצוות שנמדדו. הזמנה לא תיסגר עם Lot פתוח.",
          purposeHe:
            "לחתום את מחזור-הכיול: החלטה, תיעוד-עבודה וסגירה — תוך אכיפת-תקינות.",
          processExampleHe:
            "טכנאי קובע UD 'Accept', מדווח 1.5 שעות ב-IW41, ומבצע TECO; ה-Equipment חוזר ל-'תקין' עם תאריך-כיול-הבא.",
          cbcHe:
            "ב-CBC UD 'Reject' למד-CO2 מסמן את ה-Equipment 'לא-תקין', חוסם שימוש, ומפעיל בדיקת-אצוות שנמדדו בו מאז הכיול הקודם.",
          navHe: [
            "Quality Management ► Quality Inspection ► Usage Decision (QA11)",
            "Plant Maintenance and Customer Service ► Maintenance and Service Orders ► Complete Order (TECO)",
          ],
          tables: ["QAVE", "AUFK", "JEST"],
          tcodes: ["QA11", "IW41", "IW32"],
          fiori: ["F1605", "F2218"],
          configHe: [
            "הגדר UD Codes (Accept/Reject) והשפעתם על סטטוס-Equipment.",
            "הגדר חסימת-שימוש אוטומטית ל-UD שלילי (אם נדרש).",
            "אכוף UD לפני TECO.",
          ],
          mistakesHe: [
            "TECO לפני UD — תיעוד חסר.",
            "אי-עדכון סטטוס-Equipment לאחר UD שלילי.",
          ],
          troubleshootHe: [
            "הזמנה לא נסגרת ➔ Inspection Lot פתוח ללא UD.",
            "מכשיר פגום עדיין בשימוש ➔ UD לא עדכן סטטוס-Equipment.",
          ],
          bestPracticeHe: [
            "אכוף רצף: Results→UD→Confirmation→TECO.",
            "קשר UD שלילי לחסימת-מכשיר ולבדיקת-אצוות.",
          ],
          interviewHe: [
            { qHe: "מה כוללת סגירת הזמנת-כיול ומה ההשפעה של UD שלילי?", aHe: "קביעת UD ל-Lot, Confirmation של שעות (IW41), ו-TECO ל-Order. UD 'Reject' מסמן את ה-Equipment 'לא-תקין', חוסם שימוש, ועשוי להפעיל בדיקת-השפעה אחורה על אצוות שנמדדו במכשיר." },
          ],
          takeawaysHe: [
            "סגירה = UD + Confirmation + TECO.",
            "UD קובע תקינות-מכשיר.",
            "שלילי = חסימה + בדיקת-אצוות.",
          ],
        },
        {
          id: "7.5.6",
          titleHe: "הערכות (Evaluations)",
          titleEn: "Evaluations",
          execHe:
            "ההערכות מפיקות תובנות מנתוני-הכיול שנצברו: שיעורי-Pass, מגמות-סחיפה (Drift) של מכשירים, מכשירים-בעייתיים, ועמידה במועדי-כיול. הן הבסיס לשיפור-מתמיד ולהוכחת-תאימות.",
          beginnerHe:
            "אחרי שצברנו הרבה כיולים, אפשר 'להסתכל אחורה': כמה מכשירים עברו? אילו נכשלים שוב ושוב? האם כיילנו בזמן? הדוחות עונים על השאלות האלה.",
          consultantHe:
            "הערכות דרך QGA3 (Maintenance Order results evaluation), QM Info System (MCXX) ו-QGD-reports. מאפשרות ניתוח-מגמות (Trend/Drift) של ערכי-מדידה לאורך-כיולים, שיעורי-Reject, ו-OTD של כיולים. ב-S/4HANA זמינים גם CDS-based Analytical Apps. הבסיס להחלטות על תדירות-כיול ועל החלפת-מכשירים.",
          purposeHe:
            "להפיק תובנות לשיפור-תהליך, לאופטימיזציית-תדירות ולהוכחת-תאימות-רגולטורית.",
          processExampleHe:
            "דוח-מגמה מראה שמד-pH מסוים סוחף עקבית לכיוון חיובי — סימן לבלאי; מחליטים על החלפה.",
          cbcHe:
            "ב-CBC דוח-הערכות חודשי מציג שיעור-Pass של כלל-המכשירים ומגמות-סחיפה — מוצג למבקרי-איכות ולרגולטור.",
          navHe: ["Quality Management ► Information System ► Inspection Results / Maintenance Evaluations (QGA3)"],
          tables: ["QAMR", "QALS", "QAVE"],
          tcodes: ["QGA3", "QGP1", "MCXX"],
          fiori: ["F1605"],
          configHe: [
            "הגדר דוחות-הערכה (QGA3/QMIS) ו-Selection.",
            "הפעל ניתוח-מגמות (Trend) לערכי-מדידה.",
          ],
          mistakesHe: [
            "אי-ניצול נתוני-הכיול לניתוח-מגמות.",
            "התעלמות מסחיפה עקבית של מכשיר.",
          ],
          troubleshootHe: [
            "דוח חסר-נתונים ➔ תוצאות לא נרשמו / Selection שגוי.",
          ],
          bestPracticeHe: [
            "נתח מגמות-סחיפה להתאמת-תדירות והחלפה-יזומה.",
            "הפק דוחות-תאימות תקופתיים לרגולטור.",
          ],
          interviewHe: [
            { qHe: "אילו תובנות מספקות הערכות-הכיול?", aHe: "שיעורי-Pass/Reject, מגמות-סחיפה (Drift) של מכשירים לאורך-זמן, מכשירים-בעייתיים, ועמידה במועדים. הן מבססות החלטות על תדירות-כיול, החלפת-מכשירים והוכחת-תאימות-רגולטורית." },
          ],
          takeawaysHe: [
            "הערכות = תובנות מנתוני-הכיול.",
            "מגמות-סחיפה מובילות להחלפה-יזומה ולכיוון-תדירות.",
            "QGA3/QMIS; בסיס לתאימות.",
          ],
        },
      ],
    },
    // ============================================================ 7.6
    {
      id: "7.6",
      titleHe: "רשימות-תיוג לבדיקה (Inspection Checklists)",
      titleEn: "Inspection Checklists",
      execHe:
        "רשימות-תיוג לבדיקה הן תרחיש-שימוש משלים: בדיקות מבוססות-תיוג (כן/לא, עבר/נכשל) — למשל בדיקות-בטיחות, סבבי-מבדק או בדיקות-תקופתיות — המנוהלות באמצעות אותו מנגנון QM↔PM אך עם מאפיינים איכותניים (Qualitative) פשוטים יותר. הן מרחיבות את הכיול לעולם הבדיקות-המובנות הלא-מדידות.",
      beginnerHe:
        "לא כל בדיקה היא 'מדידת-מספר'. לפעמים זו פשוט רשימת-תיוג: 'האם הכיסוי תקין? כן/לא'. רשימות-תיוג מאפשרות לנהל בדיקות כאלה באותו מנגנון, עם מאפיינים מסוג 'עבר/נכשל'.",
      consultantHe:
        "Checklists ממומשים כ-Inspection Characteristics איכותניים (Qualitative, עם Selected Sets / Code Groups לערכי 'עבר/נכשל') ב-Task List, המקושר ל-Maintenance Plan ו-Inspection Lot. ההבדל מהכיול הכמותי: אין ערכי-מדידה אלא בחירת-קוד. שימושי לבדיקות-בטיחות, סבבי-תחזוקה-מונעת ובדיקות-ויזואליות. אותה תשתית (Type 14/Order/Lot/UD).",
      purposeHe:
        "להרחיב את מנגנון-הכיול לבדיקות-מובנות איכותניות (כן/לא), עם תיעוד ו-UD מלאים.",
      processExampleHe:
        "רשימת-תיוג לבדיקת-בטיחות-קו כוללת 10 פריטי 'תקין/לא-תקין'; הטכנאי מסמן קוד לכל פריט, ו-UD מסכם.",
      cbcHe:
        "ב-CBC רשימת-תיוג לבדיקת-היגיינה-יומית של קו-מילוי (ניקיון, אטמים, מכסים) מנוהלת כ-Checklist עם מאפיינים איכותניים.",
      navHe: ["Quality Management ► Quality Planning ► Inspection Characteristics / Catalogs (Selected Sets)"],
      tables: ["PLMK", "QPMK", "QPAC"],
      tcodes: ["QS41", "QS51", "IA05"],
      fiori: ["F1605"],
      configHe: [
        "הגדר Catalogs ו-Selected Sets לערכי 'עבר/נכשל'.",
        "צור Inspection Characteristics איכותניים ב-Task List.",
        "השתמש באותה תשתית Type 14/Order/Lot/UD.",
      ],
      flow: [
        { he: "הגדר Selected Sets", code: "QS51" },
        { he: "Task List עם מאפיינים איכותניים", code: "IA05" },
        { he: "Inspection Lot", code: "QALS" },
        { he: "רישום קודים + UD", code: "QGA2/QA11" },
      ],
      mistakesHe: [
        "שימוש במאפיין כמותי כשנדרש איכותני (כן/לא).",
        "Selected Sets חסרים — אין ערכים לבחירה.",
      ],
      troubleshootHe: [
        "לא ניתן לרשום 'עבר/נכשל' ➔ חסר Selected Set / מאפיין כמותי בטעות.",
      ],
      bestPracticeHe: [
        "השתמש ב-Catalogs/Selected Sets אחידים לכל ה-Checklists.",
        "שמור Checklists קצרות וברורות לטכנאי.",
      ],
      interviewHe: [
        { qHe: "במה שונה Inspection Checklist מכיול-כמותי?", aHe: "Checklist משתמש במאפיינים איכותניים (Qualitative) עם Selected Sets לערכי 'עבר/נכשל', במקום ערכי-מדידה מספריים. התשתית זהה (Type 14/Order/Lot/UD), אך הרישום הוא בחירת-קוד ולא מדידה." },
      ],
      takeawaysHe: [
        "Checklists = בדיקות איכותניות (כן/לא) על אותה תשתית.",
        "מבוססים מאפיינים איכותניים + Selected Sets.",
        "מתאימים לבטיחות/היגיינה/בדיקות-ויזואליות.",
      ],
      children: [
        {
          id: "7.6.1",
          titleHe: "יסודות הקונפיגורציה (Checklists)",
          titleEn: "Configuration Basics",
          execHe:
            "הקונפיגורציה ל-Checklists מתמקדת בהגדרת Catalogs ו-Selected Sets לערכים האיכותניים (עבר/נכשל/לא-רלוונטי), שישמשו את המאפיינים האיכותניים ב-Task List.",
          beginnerHe:
            "כדי שהטכנאי יוכל לסמן 'עבר/נכשל', צריך קודם להגדיר את האפשרויות האלה במערכת — דרך 'קטלוגים' ו'סטים-נבחרים'.",
          consultantHe:
            "מגדירים Catalog Type מתאים (למשל Catalog 1 לתכונות) ו-Code Groups, ומהם בונים Selected Sets (QS51) עם Valuation (Accept/Reject) לכל קוד. אלה משויכים למאפיינים האיכותניים ב-Task List. ה-Valuation שב-Selected Set קובע אם קוד נחשב 'תקין' או 'חורג'.",
          purposeHe:
            "להניח את תשתית-הערכים האיכותניים שתאפשר רישום 'עבר/נכשל' עם הערכה אוטומטית.",
          processExampleHe:
            "מגדירים Selected Set 'בדיקת-בטיחות' עם קודים 'תקין=Accept', 'פגום=Reject'; משייכים למאפיין ב-Task List.",
          cbcHe:
            "ב-CBC Selected Set 'היגיינת-קו' עם קודים 'נקי/לא-נקי' משמש את כל רשימות-התיוג היומיות.",
          navHe: ["Quality Management ► Quality Planning ► Basic Data ► Catalog ► Edit Selected Sets (QS51)"],
          tables: ["QPAC", "QPGR", "TQ15"],
          tcodes: ["QS41", "QS51"],
          fiori: ["F1605"],
          configHe: [
            "הגדר Catalog Type ו-Code Groups.",
            "בנה Selected Sets (QS51) עם Valuation (Accept/Reject) לכל קוד.",
          ],
          mistakesHe: [
            "Selected Set ללא Valuation — אין הערכה אוטומטית.",
            "ריבוי Selected Sets לא-עקביים.",
          ],
          troubleshootHe: [
            "קוד לא מסומן תקין/חורג ➔ חסר Valuation ב-Selected Set.",
          ],
          bestPracticeHe: [
            "תקנן Selected Sets לכל סוגי-ה-Checklists.",
            "הגדר Valuation ברור לכל קוד.",
          ],
          interviewHe: [
            { qHe: "מה צריך להגדיר לפני יצירת Checklist?", aHe: "Catalogs, Code Groups ו-Selected Sets (QS51) עם Valuation (Accept/Reject) לכל קוד. אלה מספקים את ערכי-ה'עבר/נכשל' שישמשו את המאפיינים האיכותניים ב-Task List." },
          ],
          takeawaysHe: [
            "בסיס ה-Checklist = Catalogs + Selected Sets.",
            "Valuation לכל קוד מאפשר הערכה אוטומטית.",
            "QS51 ליצירת Selected Sets.",
          ],
        },
        {
          id: "7.6.2",
          titleHe: "נתוני-אב (Checklists)",
          titleEn: "Master Data",
          execHe:
            "נתוני-האב ל-Checklists הם Task List עם מאפיינים איכותניים (המפנים ל-Selected Sets) המקושר ל-Equipment ול-Maintenance Plan — בדיוק כמו בכיול, אך עם אופי-בדיקה איכותני.",
          beginnerHe:
            "בונים את אותה שרשרת כמו בכיול (ציוד→רשימת-משימות→תוכנית), אבל ברשימת-המשימות מגדירים מאפיינים מסוג 'בחר מהרשימה' במקום 'הזן-מספר'.",
          consultantHe:
            "Task List (PLKO/PLPO/PLMK) עם Inspection Characteristics איכותניים המפנים ל-Selected Sets. מקושר ל-Maintenance Plan (Single-cycle) ול-Equipment/Functional Location. ניתן לשלב מאפיינים כמותיים ואיכותניים באותה רשימה. יוצר ב-IA05; אפשר MIC איכותני (QS21/QS23) לאחידות.",
          purposeHe:
            "להגדיר את תוכן ה-Checklist ולשייכו לאובייקט-הטכני ולתוכנית-התזמון.",
          processExampleHe:
            "Task List 'בדיקת-בטיחות-שבועית' עם 8 מאפיינים איכותניים מקושר ל-Maintenance Plan שבועי על ה-Equipment.",
          cbcHe:
            "ב-CBC Task List 'היגיינה-יומית' עם מאפיינים איכותניים מקושר ל-Maintenance Plan יומי על קו-המילוי.",
          navHe: ["Plant Maintenance and Customer Service ► Task Lists ► General Maintenance Task Lists (IA05)"],
          tables: ["PLKO", "PLPO", "PLMK"],
          tcodes: ["IA05", "QS21", "IP42"],
          fiori: ["F2218", "F1605"],
          configHe: [
            "צור Task List עם מאפיינים איכותניים (Selected Sets).",
            "קשר ל-Maintenance Plan ול-Equipment/Functional Location.",
          ],
          mistakesHe: [
            "מאפיין איכותני ללא Selected Set מקושר.",
            "אי-קישור Task List ל-Plan/Equipment.",
          ],
          troubleshootHe: [
            "אין ערכים לבחירה ➔ מאפיין לא מקושר ל-Selected Set.",
          ],
          bestPracticeHe: [
            "השתמש ב-MIC איכותני לאחידות.",
            "שלב מאפיינים כמותיים+איכותניים בעת-הצורך.",
          ],
          interviewHe: [
            { qHe: "מהם נתוני-האב של Checklist?", aHe: "General Task List עם Inspection Characteristics איכותניים (המפנים ל-Selected Sets), מקושר ל-Maintenance Plan ול-Equipment/Functional Location — מבנה זהה לכיול אך עם מאפיינים איכותניים." },
          ],
          takeawaysHe: [
            "Task List + מאפיינים איכותניים = ליבת ה-Checklist.",
            "אותה שרשרת כמו כיול (Equipment→Task List→Plan).",
            "MIC איכותני לאחידות.",
          ],
        },
        {
          id: "7.6.3",
          titleHe: "התהליך העסקי (Checklists)",
          titleEn: "Business Process",
          execHe:
            "התהליך זהה לכיול: Maintenance Plan מתזמן→Order+Inspection Lot→רישום-קודים (עבר/נכשל)→UD→סגירה. ההבדל היחיד הוא אופי-הרישום (בחירת-קוד במקום מדידה).",
          beginnerHe:
            "הכל זורם כמו בכיול: התוכנית פותחת הזמנה ובדיקה, הטכנאי מסמן 'עבר/נכשל' לכל פריט, מחליט UD, וסוגר. רק שכאן מסמנים במקום למדוד.",
          consultantHe:
            "IP30→Order+Inspection Lot→Results Recording (QGA2/QE51N) עם בחירת-קודים מ-Selected Sets→Valuation אוטומטי→UD (QA11)→TECO. UD שלילי ב-Checklist-בטיחות יכול לחסום שימוש-בציוד או להפעיל Notification. ניתן לטריגר Maintenance Notification מ-Reject ליצירת תיקון.",
          purposeHe:
            "להריץ בדיקות איכותניות מובנות מקצה-לקצה עם תיעוד, החלטה ומעקב-תיקון.",
          processExampleHe:
            "IP30 פותח Order לבדיקת-בטיחות; הטכנאי מסמן 'נכשל' לפריט; UD 'Reject' מפעיל Notification לתיקון, ואז TECO.",
          cbcHe:
            "ב-CBC כשל בבדיקת-היגיינה-יומית מפעיל Notification מיידי לצוות-הניקיון, וחוסם את הקו עד תיקון.",
          navHe: [
            "Quality Management ► Quality Inspection ► Results Recording (QGA2)",
            "Quality Management ► Quality Inspection ► Usage Decision (QA11)",
          ],
          tables: ["QALS", "QAMR", "QAVE", "QMEL"],
          tcodes: ["IP30", "QGA2", "QA11", "IW32"],
          fiori: ["F1605", "F2218"],
          configHe: [
            "ודא זרימת Order→Lot→קודים→UD פעילה.",
            "קשר UD 'Reject' ל-Notification/חסימת-ציוד.",
          ],
          mistakesHe: [
            "סגירה ללא UD.",
            "כשל ללא Notification/פעולה-מתקנת.",
          ],
          troubleshootHe: [
            "Notification לא נוצר מ-Reject ➔ Follow-up Action לא מוגדר ל-UD.",
          ],
          bestPracticeHe: [
            "קשר Reject לפעולה-מתקנת אוטומטית (Notification).",
            "אכוף UD לפני סגירה.",
          ],
          interviewHe: [
            { qHe: "כיצד שונה התהליך-העסקי של Checklist מכיול?", aHe: "הוא זהה (IP30→Order+Lot→Results→UD→TECO), פרט לרישום: בחירת-קוד 'עבר/נכשל' מ-Selected Sets במקום ערכי-מדידה. UD 'Reject' יכול להפעיל Notification ולחסום ציוד." },
          ],
          takeawaysHe: [
            "אותו תהליך כמו כיול; רישום בקודים.",
            "Reject → Notification/חסימה.",
            "תיעוד מלא עד UD ו-TECO.",
          ],
        },
      ],
    },
    // ============================================================ 7.7
    {
      id: "7.7",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הראה כיצד QM ו-PM משתלבים לניהול ציוד-בדיקה וכיול. העיקרון: כדי שתוצאות-בדיקה יהיו אמינות, מכשירי-המדידה חייבים להיות מכוילים ותקפים. SAP פותר זאת בכך שכל מכשיר הוא Equipment ב-PM, מתוזמן דרך Maintenance Plan, ומכויל כ-Inspection Lot מסוג 14 הצמוד ל-Calibration Order — מעגל-אוטומטי סגור מתזמון ועד Usage Decision.",
      beginnerHe:
        "סיכמנו: בחרנו תרחיש-מימוש (הכי טוב — PM+MM), הגדרנו את המכשיר כ-Material+Serial↔Equipment, הקמנו רשימת-משימות ותוכנית-תחזוקה, תזמנו וניטרנו, ואז ביצענו את הכיול עצמו — הזמנה, בדיקה, תוצאות, החלטה וסגירה. כל זה אוטומטי ומתועד לביקורת.",
      consultantHe:
        "מבחינה ארכיטקטונית: התרחיש המומלץ הוא Material+Serial↔Equipment (תרחיש 2). שני אדני-הקונפיגורציה — שיוך Inspection Type 14 לסוג-הזמנת-PM, ו-Serial Number Profile עם Equipment Category. שרשרת נתוני-האב: Material→Serial→Equipment→General Task List→Maintenance Plan (Single-cycle)→IP10→IP30. התהליך-העסקי: Calibration Order→Inspection Lot 14→Results (QGA2)→UD→TECO→Evaluations. Checklists מרחיבים זאת לבדיקות-איכותניות. טבלאות-מפתח: EQUI, MPLA, MPOS, QALS.",
      purposeHe:
        "לקבע את התמונה-המלאה ולחבר את כל החלקים: קונפיגורציה, נתוני-אב ותהליך-עסקי — לכלל מערכת-כיול אוטומטית ובת-ביקורת.",
      processExampleHe:
        "מקצה-לקצה: בחירת-תרחיש→קונפיגורציה (Type 14 + Serial Profile)→נתוני-אב (Material→Serial→Equipment→Task List→Plan)→תזמון (IP10/IP30)→כיול (Order→Lot→Results→UD→TECO)→הערכות.",
      cbcHe:
        "ב-CBC המערכת מבטיחה שכל מכשיר-מדידה המשפיע על שחרור-אצווה מכויל בזמן, מתועד ובר-ביקורת — תנאי לעמידה בתקני-מזון ו-ISO ולהגנה על איכות-המוצר.",
      navHe: ["Quality Management ► QM in Logistics ► QM in Maintenance ► Test Equipment Management"],
      tables: ["EQUI", "MPLA", "MPOS", "QALS"],
      tcodes: ["IE01", "IA05", "IP42", "IP10", "IP30", "QGA2", "QA11"],
      fiori: ["F2218", "F1605"],
      configHe: [
        "שני אדנים: Type 14↔PM Order Type, ו-Serial Number Profile + Equipment Category.",
        "שרשרת נתוני-אב מלאה ללא חוליות חסרות.",
        "Job לילי קבוע ל-IP30; UD לפני TECO.",
      ],
      flow: [
        { he: "בחר תרחיש", note: "PM+MM מומלץ" },
        { he: "קונפיגורציה", code: "Type 14 + Serial Profile" },
        { he: "נתוני-אב", code: "Material→Equipment→Plan" },
        { he: "תזמון", code: "IP10/IP30" },
        { he: "כיול", code: "Order→Lot→UD" },
        { he: "הערכות", code: "QGA3" },
      ],
      mistakesHe: [
        "דילוג על אחד משני אדני-הקונפיגורציה.",
        "חוליה חסרה בשרשרת נתוני-האב.",
        "סגירת-הזמנה ללא UD.",
      ],
      troubleshootHe: [
        "אין כיול-אוטומטי ➔ בדוק את שני האדנים ואת שלמות-השרשרת.",
        "אין Inspection Lot ➔ Type 14 לא משויך.",
        "אין הזמנות ➔ IP10/IP30 לא רצים.",
      ],
      bestPracticeHe: [
        "אמץ תרחיש 2 (PM+MM) לכל ציוד-המדידה.",
        "תקנן קונפיגורציה ונתוני-אב בין-מפעלים.",
        "נטר IP30 ודוחות-הערכה תקופתית.",
      ],
      interviewHe: [
        { qHe: "סכם את מעגל ניהול ציוד-הבדיקה ב-QM/PM.", aHe: "מכשיר = Material+Serial↔Equipment; קונפיגורציה = Type 14↔PM Order Type + Serial Profile; נתוני-אב = Equipment→Task List→Maintenance Plan; תזמון = IP10/IP30 → Calibration Order + Inspection Lot 14; תהליך = Results (QGA2)→UD→TECO→Evaluations. טבלאות: EQUI/MPLA/MPOS/QALS." },
        { qHe: "מדוע השילוב QM↔PM חיוני לכיול?", aHe: "PM מספק את ה-Equipment, ה-Maintenance Plan והתזמון (Calibration Order); QM מספק את הבדיקה (Inspection Type 14), רישום-התוצאות וה-UD. רק השילוב יוצר מעגל-אוטומטי סגור ובר-ביקורת — תזמון, בדיקה, החלטה ותיעוד." },
      ],
      takeawaysHe: [
        "מכשיר אמין = תוצאות-בדיקה אמינות; הכיול הוא הבסיס.",
        "תרחיש 2 (PM+MM) + שני אדני-קונפיגורציה הם הליבה.",
        "מעגל: Equipment→Plan→Order→Lot 14→UD; טבלאות EQUI/MPLA/MPOS/QALS.",
        "Checklists מרחיבים את המנגנון לבדיקות-איכותניות.",
      ],
      relatedHe: [
        { labelHe: "QM · הגדרת ציוד-בדיקה (7.2)", href: "/library/qm/chapter-07/#sub-7.2" },
        { labelHe: "PM · תוכניות-תחזוקה (MPLA)", href: "/library/pm/object/MPLA/" },
      ],
    },
  ],
};
