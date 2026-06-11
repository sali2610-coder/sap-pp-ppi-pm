// ===== QM Digital Textbook — Chapter 17 (Early Warning System) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew —
// beginner + consultant friendly, enough to study the topic without the book.
// SAP identifiers verbatim EN. CBC = Coca-Cola bottling quality-trend early warning.
import type { TextbookChapter } from "./types";

export const CH17: TextbookChapter = {
  n: 17,
  titleHe: "מערכת התראה מוקדמת (Early Warning System)",
  titleEn: "Early Warning System",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה למערכת ההתראה המוקדמת (Early Warning System – EWS) של מערכת המידע ב-QM. ה-EWS יושב מעל מבני-המידע של ה-LIS (Logistics Information System) ומנטר אותם באופן יזום: הוא סורק נתוני-איכות שנצברים (שיעורי-פסילה, ערכי-מדידה, חריגות-תהליך) ומפעיל התראה ברגע שמגמה חוצה סף שהוגדר מראש. כל תת-פרק ותת-סעיף הורחבו ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי-קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון-תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד לבנות, לתזמן ולתפעל EWS על מגמות-איכות — כולל מקרה-הבוחן של CBC: זיהוי מוקדם של עליית שיעור-פסילות בקו-מילוי לפני שהיא הופכת לסיכון-בטיחות-מזון או ל-Recall.",
  subchapters: [
    // ============================================================ 17.1
    {
      id: "17.1", titleHe: "סקירה כללית", titleEn: "Overview",
      execHe:
        "מערכת ההתראה המוקדמת (EWS) היא רובד-ניטור יזום מעל מערכת המידע הלוגיסטית (LIS) שמתריע מוקדם על מגמות-איכות שליליות. במקום שמנהל-איכות 'יגלה' בעיה רק כשהיא כבר חמורה, ה-EWS סורק את מבני-המידע (Information Structures) באופן אוטומטי, משווה ערכים מול ספים שהוגדרו (Exceptions), ושולח התראה ברגע שמגמה חוצה את הסף. בכך הוא הופך נתונים היסטוריים שנצברים ממילא לכלי-מנע.",
      beginnerHe:
        "דמיין מנורת-אזהרה בלוח-המחוונים של מכונית: היא נדלקת לפני שהמנוע נשרף, לא אחרי. ה-EWS הוא בדיוק זה עבור האיכות — הוא מסתכל כל הזמן על המספרים (כמה מוצרים נפסלו, כמה חריגות היו) ומדליק 'נורה' כשמשהו מתחיל להחמיר. אתה לא צריך לבדוק דוחות ידנית כל יום; המערכת מתריעה אותך כשצריך.",
      consultantHe:
        "ה-EWS אינו מאגר-נתונים נפרד אלא מנוע-ניטור הרץ מעל מבני-המידע של ה-LIS — לרוב מבני-המידע הסטנדרטיים של QM (S004 Inspection lot, S008 ו-QMIS). הארכיטקטורה: (1) Information Structure אוגר Key Figures (למשל כמות-פסילה, שיעור-פסילה) לפי Characteristics (Material, Plant, Vendor, Inspection type); (2) Exception מגדיר תנאי-חריגה (Requirement) על Key Figure; (3) Periodic Analysis מבצע את הניטור בפועל. T-Code הליבה הוא MC=‎ (Early Warning System) ומשפחת MCYx/MCYG. ב-S/4HANA חלק מ-LIS נחשב Classical ומומלץ לשקול CDS/embedded analytics, אך EWS עדיין נתמך ופעיל.",
      purposeHe:
        "המטרה העסקית: לקצר את זמן-התגובה לבעיות-איכות מימים/שבועות לשעות, ולהפוך ניהול-איכות מתגובתי ליזום. במקום לחכות לתלונת-לקוח או לפסילת-אצווה גדולה, הארגון מזהה את ההידרדרות בעודה קטנה — וחוסך עלויות-פסילה, Recalls וקנסות-רגולציה.",
      processExampleHe:
        "מנהל-איכות מגדיר חריגה: 'התרע אם שיעור-הפסילה של חומר X חורג מ-2% בחודש'. ה-EWS, ברקע, סורק את מבנה-המידע מדי לילה; ברגע שהשיעור עולה ל-2.3% נוצרת התראה הנשלחת ל-SAP Office Inbox/דוא\"ל של המנהל, עם קישור ל-Exception Analysis לתחקור.",
      cbcHe:
        "ב-CBC: מבנה-מידע אוגר את שיעור-הפסילות בכל קו-מילוי לפי משמרת. ה-EWS מוגדר להתריע אם שיעור-הפסילה בקו 3 עולה מעל 1.5% או אם הוא עלה ב-50% מול השבוע שעבר — סימן מוקדם לתקלת-מכונת-מילוי או לסטיית-CO2 לפני שהיא הופכת לסיכון בטיחות-מזון.",
      navHe: [
        "Logistics ► Logistics Controlling ► Quality Management Information System ► Early Warning System",
        "SPRO ► Logistics – General ► Logistics Information System (LIS) ► Logistics Data Warehouse ► Standard Analyses ► Early Warning System",
      ],
      tables: ["S004", "S008", "TMC4", "QMEL", "QALS"],
      tcodes: ["MCYG", "MC=", "MC/E", "MCSI"],
      fiori: ["F2745", "F1652"],
      configHe: [
        "ה-EWS פועל מעל Information Structure קיים (סטנדרטי S0xx או מותאם Sxxx) — תנאי-סף הוא שהמבנה מאוכלס בנתונים.",
        "שלושת רכיבי-הליבה: Exceptions (תנאי-חריגה), Exception Groups (קיבוץ), Periodic Analysis (ניטור מתוזמן).",
        "ההתראה נשלחת דרך SAPoffice/Workflow — מוגדרת ב-Follow-Up Processing של החריגה.",
      ],
      flow: [
        { he: "LIS אוגר Key Figures", code: "S004", note: "מבנה-מידע מאוכלס" },
        { he: "הגדרת חריגה", code: "MC=", note: "Requirement על Key Figure" },
        { he: "קיבוץ חריגות", code: "Exception Group" },
        { he: "ניתוח-תקופתי מתוזמן", code: "MCYG", note: "Periodic Analysis" },
        { he: "התראה + תחקור", code: "MC/E", note: "Exception Analysis" },
      ],
      masterDataHe: [
        "Information Structure (Sxxx) = מבנה-נתונים אגור: Characteristics (Material/Plant/Vendor) + Key Figures (כמות/שיעור-פסילה).",
        "Update Rules קובעים אילו אירועי-QM (סגירת Inspection Lot, רישום Usage Decision) מעדכנים את המבנה.",
      ],
      mistakesHe: [
        "ניסיון להפעיל EWS על מבנה-מידע שאינו מאוכלס — אין נתונים, אין התראות.",
        "בלבול בין ה-EWS (ניטור יזום) לבין Standard Analysis (תחקור ידני) — שניהם על אותו LIS אך מטרות שונות.",
        "הזנחת Update Rules — אם ה-Inspection Lots לא מעדכנים את המבנה, ה-EWS 'עיוור'.",
      ],
      troubleshootHe: [
        "EWS לא מתריע כלל ➔ ודא שמבנה-המידע מאוכלס (MCSI) ושה-Update Rules פעילים.",
        "התראות מאוחרות ➔ תדירות ה-Periodic Analysis נמוכה מדי (חודשי במקום יומי).",
        "אין למי לשלוח ➔ Follow-Up Processing / נמען לא הוגדר בחריגה.",
      ],
      bestPracticeHe: [
        "התחל ממבנה-מידע סטנדרטי של QM (S004) לפני שאתה בונה מותאם.",
        "הגדר מעט חריגות חדות וברורות לפני שאתה מרחיב — הצפת-התראות הורגת אמון.",
        "תזמן ניטור בתדירות שתואמת את קצב-הדרדרות הבעיה (יומי לקו-ייצור, חודשי לספק).",
      ],
      interviewHe: [
        { qHe: "מהו ה-Early Warning System ובמה הוא שונה מ-Standard Analysis?", aHe: "EWS הוא ניטור יזום ומתוזמן מעל ה-LIS שמתריע אוטומטית כשמגמה חוצה סף (Exception); Standard Analysis הוא תחקור ידני של אותם נתונים. EWS דוחף התראה; Standard Analysis ממתין שתשאל." },
        { qHe: "על מה רץ ה-EWS?", aHe: "על מבני-המידע (Information Structures) של ה-LIS — כמו S004 ב-QM — שאוגרים Key Figures לפי Characteristics. בלי מבנה מאוכלס אין EWS." },
      ],
      takeawaysHe: [
        "EWS = רובד-ניטור יזום מעל ה-LIS שהופך נתוני-איכות אגורים לכלי-מנע.",
        "שלושה רכיבים: Exceptions, Exception Groups, Periodic Analysis.",
        "ערך עסקי: זיהוי מגמה-שלילית בעודה קטנה — חיסכון בפסילות, Recalls וקנסות.",
      ],
      relatedHe: [
        { labelHe: "QM · מערכת המידע של QM (QMIS)", href: "/library/qm/chapter-16/" },
        { labelHe: "QM · החלטת-שימוש (Usage Decision)", href: "/library/qm/chapter-10/" },
      ],
    },
    // ============================================================ 17.2
    {
      id: "17.2", titleHe: "הקמת מערכת ההתראה המוקדמת", titleEn: "Set Up Early Warning System",
      execHe:
        "הקמת ה-EWS היא תהליך תלת-שלבי: מגדירים חריגות (Exceptions) שהן תנאי-הסף, מקבצים אותן לקבוצות-חריגה (Exception Groups) להפעלה מרוכזת, ומגדירים את הניתוח-התקופתי (Periodic Analysis) שמריץ את הניטור בפועל. רק שילוב שלושת השלבים יוצר מערכת-התראה פעילה.",
      beginnerHe:
        "כדי ש'נורת-האזהרה' תעבוד צריך שלושה דברים: (1) להחליט מתי היא נדלקת — זה ה-Exception (הכלל); (2) לאסוף כמה כללים לחבילה אחת — זה ה-Group; (3) לקבוע מתי המערכת בודקת — זה ה-Periodic Analysis. בלי שלושתם אין התראה אמיתית.",
      consultantHe:
        "ההקמה מתבצעת בעיקר ב-MC=‎ (ומשפחת MCYx). שלב 1 — Exception: בוחרים Information Structure, Key Figure, ומגדירים Requirement (תנאי-חריגה — Threshold Value / Trend / Planned-Actual). שלב 2 — Exception Group: מאגדים מספר Exceptions תחת קבוצה אחת כדי להריץ ולנהל אותן יחד, ולהגדיר Follow-Up Processing משותף. שלב 3 — Periodic Analysis: קושרים את הקבוצה למסגרת-זמן (Period to analyze) ולשיטת-ניתוח, ומגדירים אותה לתזמון תקופתי. שמירת-העקביות קריטית: ה-Key Figure בחריגה חייב להתקיים במבנה-המידע.",
      purposeHe:
        "המטרה: לתרגם מדיניות-איכות ('שיעור-פסילה לא יעבור X', 'אל תרשה הידרדרות מגמתית') להגדרות-מערכת אופרטיביות שיתריעו אוטומטית — מבלי שאיש יצטרך לזכור לבדוק.",
      processExampleHe:
        "צוות-איכות מגדיר שלוש חריגות (חריגת-סף לשיעור-פסילה, חריגת-מגמה לערכי-מדידה, חריגת-תכנון-מול-בפועל), מקבץ אותן ל-Exception Group אחת בשם 'QM_LINE_MONITOR', ומגדיר Periodic Analysis יומי. מאותו רגע הקבוצה כולה נסרקת מדי לילה.",
      cbcHe:
        "ב-CBC מקימים Exception Group אחת לכל קו-מילוי ('CBC_FILLLINE_03'), המאגדת חריגות לשיעור-פסילה, לסטיית-CO2 ולמשקל-מילוי. הקבוצה נסרקת יומית כך שכל קו מנוטר כיחידה אחת.",
      navHe: [
        "Logistics ► Logistics Controlling ► Quality Management Information System ► Early Warning System ► Edit Exceptions",
        "SPRO ► Logistics – General ► Logistics Information System (LIS) ► Logistics Data Warehouse ► Standard Analyses ► Early Warning System ► Maintain Exceptions",
      ],
      tables: ["TMC4", "S004", "TMCEXC"],
      tcodes: ["MC=", "MCYG", "MC/E"],
      fiori: ["F2745"],
      configHe: [
        "שלב 1 — Exception (MC=): בחר Information Structure, Key Figure, וסוג-Requirement.",
        "שלב 2 — Exception Group: אגד Exceptions; הגדר Follow-Up Processing (נמען/דוא\"ל/Workflow).",
        "שלב 3 — Periodic Analysis: הגדר Period to analyze ושיטת-ניתוח לתזמון תקופתי.",
        "ודא Key Figure קיים במבנה-המידע — בדיקת-עקביות לפני הפעלה.",
      ],
      flow: [
        { he: "הגדרת Exception", code: "MC=", note: "Key Figure + Requirement" },
        { he: "קיבוץ ל-Exception Group" },
        { he: "הגדרת Periodic Analysis", code: "MCYG" },
        { he: "תזמון תקופתי", note: "Job ב-SM37" },
      ],
      masterDataHe: [
        "Exception = ישות-קונפיגורציה הקושרת Information Structure + Key Figure + Requirement.",
        "Exception Group = מיכל לוגי לאיגוד חריגות ולהגדרת Follow-Up משותף.",
      ],
      mistakesHe: [
        "הגדרת Exception על Key Figure שאינו במבנה-המידע — שגיאת-עקביות.",
        "דילוג על שלב ה-Periodic Analysis — חריגות מוגדרות אך אף אחד לא מריץ אותן.",
        "Exception Group ענקית עם עשרות חריגות — קשה לנהל ולתחקר.",
      ],
      troubleshootHe: [
        "החריגה לא נשמרת ➔ Key Figure לא קיים במבנה-המידע שנבחר.",
        "אין התראות למרות הגדרה ➔ לא הוגדר/לא תוזמן Periodic Analysis.",
        "ההתראה לא מגיעה לנמען ➔ Follow-Up Processing בקבוצה ריק.",
      ],
      bestPracticeHe: [
        "בנה Exception Group לפי יחידה-עסקית (קו/ספק/מוצר) — לא ערבוב.",
        "תעד לכל Exception את הסף ואת ההיגיון העסקי שמאחוריו.",
        "הרץ בדיקת-עקביות אחרי כל שינוי במבנה-המידע.",
      ],
      interviewHe: [
        { qHe: "מהם שלושת שלבי ההקמה של EWS?", aHe: "(1) הגדרת Exceptions — תנאי-הסף; (2) קיבוצן ל-Exception Groups; (3) הגדרת Periodic Analysis שמריץ את הניטור. בלי שלושתם אין מערכת-התראה פעילה." },
        { qHe: "מה תפקיד ה-Exception Group?", aHe: "לאגד מספר חריגות ליחידה אחת שמנוהלת, מורצת ומקבלת Follow-Up Processing יחד — נוח לניהול לפי קו/ספק/מוצר." },
      ],
      takeawaysHe: [
        "הקמת EWS = שלושה שלבים: Exceptions → Groups → Periodic Analysis.",
        "כל Key Figure בחריגה חייב להתקיים במבנה-המידע.",
        "ה-Periodic Analysis הוא מה שהופך הגדרה למערכת רצה בפועל.",
      ],
      relatedHe: [
        { labelHe: "QM · מערכת המידע של QM (QMIS)", href: "/library/qm/chapter-16/" },
      ],
      children: [
        // -------------------------------------------------- 17.2.1
        {
          id: "17.2.1", titleHe: "יצירת חריגות", titleEn: "Create Exceptions",
          execHe:
            "חריגה (Exception) היא תנאי-הסף הבודד של ה-EWS: על איזה Key Figure לנטר, ובאיזה תנאי להתריע. זהו לב-המערכת — הכלל שקובע מתי 'הנורה נדלקת'. SAP תומך בכמה סוגי-תנאי (Requirements): סף-ערך, מגמה, ותכנון-מול-בפועל.",
          beginnerHe:
            "חריגה היא משפט פשוט: 'התרע אם <מדד> <תנאי> <ערך>'. למשל: 'התרע אם שיעור-הפסילה גדול מ-2%'. אתה בוחר את המדד מתוך מבנה-המידע, בוחר את סימן-התנאי (גדול-מ / קטן-מ), ומקליד את הסף. זהו.",
          consultantHe:
            "ב-MC=‎ יוצרים Exception עם: Information Structure, Characteristics לסינון (Material/Plant/Vendor), Key Figure, וסוג-Requirement: (1) Threshold value analysis — השוואה לערך-קבוע; (2) Trend analysis — שינוי באחוזים מול תקופה קודמת; (3) Planned/actual comparison — בפועל מול מתוכנן. כל Requirement מקבל סימן-יחס וערך. אפשר להגדיר Characteristic display ו-Follow-up Processing (נמען/צבע/הדגשה) ברמת-החריגה.",
          purposeHe:
            "להמיר כלל-איכות בודד להגדרה אופרטיבית מדויקת — מספיק חדה כדי לתפוס בעיה אמיתית, ומספיק רחבה כדי לא להציף בהתראות-שווא.",
          processExampleHe:
            "יוצרים Exception: Information Structure S004, Key Figure 'שיעור-פסילה', Characteristic = Material, Requirement = Threshold, יחס '>' ‏2%. כל חומר שעובר 2% מסומן כחריג בעת הניתוח.",
          cbcHe:
            "ב-CBC יוצרים Exception: 'שיעור-פסילה בקו-מילוי 3 > 1.5%' כסף, ובמקביל Exception מסוג Trend: 'עלייה > 50% בשיעור-הפסילה מול השבוע שעבר' — לתפוס הידרדרות פתאומית גם מתחת לסף-המוחלט.",
          navHe: [
            "Logistics ► Logistics Controlling ► QMIS ► Early Warning System ► Exceptions ► Create (MC=)",
            "SPRO ► Logistics – General ► LIS ► Logistics Data Warehouse ► Standard Analyses ► Early Warning System ► Maintain Exceptions",
          ],
          tables: ["TMCEXC", "S004", "TMC4"],
          tcodes: ["MC=", "MC/1"],
          fiori: ["F2745"],
          configHe: [
            "בחר Information Structure ו-Key Figure לניטור.",
            "בחר סוג-Requirement: Threshold value / Trend analysis / Planned-actual comparison.",
            "הגדר סימן-יחס (>, <, >=) וערך-סף; קבע Characteristics לסינון.",
            "אופציונלי: הגדר Follow-Up Processing (נמען/הדגשה) ברמת-החריגה.",
          ],
          flow: [
            { he: "בחירת מבנה-מידע + Key Figure", code: "MC=" },
            { he: "בחירת סוג-Requirement", note: "Threshold/Trend/Plan-Actual" },
            { he: "הזנת יחס + ערך-סף" },
            { he: "שמירה", note: "TMCEXC" },
          ],
          masterDataHe: [
            "Exception מאוחסן כישות-קונפיגורציה הקושרת מבנה + Key Figure + Requirement + Follow-Up.",
          ],
          mistakesHe: [
            "סף הדוק מדי ➔ הצפת התראות-שווא; סף רחב מדי ➔ פספוס בעיות.",
            "בחירת Requirement שגוי (Threshold כשצריך Trend) — מפספס הידרדרות הדרגתית.",
            "אי-סינון לפי Characteristic — חריגה גלובלית במקום ממוקדת.",
          ],
          troubleshootHe: [
            "החריגה לא מזהה בעיה ידועה ➔ סוג-Requirement או ערך-הסף שגוי.",
            "יותר מדי חריגות מסומנות ➔ סף נמוך מדי או חוסר-סינון.",
            "Key Figure לא מופיע ברשימה ➔ אינו חלק ממבנה-המידע שנבחר.",
          ],
          bestPracticeHe: [
            "שלב Threshold + Trend לאותו מדד — לתפוס גם רמה-מוחלטת וגם הידרדרות.",
            "כייל את הסף מול נתונים היסטוריים אמיתיים לפני הפעלה.",
            "תן לכל Exception שם ותיאור ברורים שמסבירים את ההיגיון.",
          ],
          interviewHe: [
            { qHe: "אילו סוגי Requirement קיימים לחריגה?", aHe: "Threshold value (השוואה לערך-קבוע), Trend analysis (שינוי באחוזים מול תקופה קודמת), ו-Planned/actual comparison (בפועל מול מתוכנן)." },
            { qHe: "מתי תעדיף Trend על Threshold?", aHe: "כשהבעיה היא הידרדרות הדרגתית שעדיין מתחת לסף-המוחלט — Trend תופס את קצב-העלייה לפני שהערך עצמו חוצה סף קבוע." },
          ],
          takeawaysHe: [
            "Exception = הכלל הבודד: Key Figure + Requirement + ערך-סף.",
            "שלושה סוגי-Requirement: Threshold, Trend, Planned/actual.",
            "כיול-סף נכון הוא ההבדל בין מערכת שימושית להצפת-שווא.",
          ],
          relatedHe: [
            { labelHe: "QM · מערכת המידע של QM (QMIS)", href: "/library/qm/chapter-16/" },
          ],
        },
        // -------------------------------------------------- 17.2.2
        {
          id: "17.2.2", titleHe: "קיבוץ חריגות", titleEn: "Group Exceptions",
          execHe:
            "קבוצת-חריגה (Exception Group) מאגדת מספר חריגות ליחידה אחת שמנוהלת, מורצת ומקבלת טיפול-המשך (Follow-Up) יחד. זה מאפשר לנטר תחום שלם — קו-ייצור, ספק, מוצר — במכה אחת במקום חריגה-חריגה בנפרד.",
          beginnerHe:
            "במקום להפעיל עשרה כללים בנפרד, אוגדים אותם ל'חבילה' אחת. כשמריצים את החבילה, כל הכללים שבתוכה נבדקים יחד, וכל ההתראות שלהם נשלחות לאותו אחראי. נוח לניהול.",
          consultantHe:
            "Exception Group נוצרת ב-MC=‎ ומקבלת Exceptions תחתיה. ברמת-הקבוצה מגדירים Follow-Up Processing משותף — נמען (SAPoffice/דוא\"ל), Workflow, או הדגשה-גרפית — שחל על כל החריגות בקבוצה אלא אם נדרסה ברמת-חריגה. הקבוצה היא גם יחידת-ההפעלה של ה-Periodic Analysis: מתזמנים קבוצה, לא חריגה בודדת. מומלץ ארגון הקבוצות לפי אחריות-תפעולית.",
          purposeHe:
            "לפשט תפעול וניהול: לתחזק, להריץ ולנתב התראות של תחום-אחריות שלם כיחידה אחת, ולהבטיח שכל ההתראות הרלוונטיות מגיעות לאדם הנכון.",
          processExampleHe:
            "מנהל-איכות מאגד חמש חריגות הנוגעות לאותו ספק ל-Exception Group 'VENDOR_4711', ומגדיר ברמת-הקבוצה שכל התראה תישלח גם לקניין וגם למבטיח-האיכות. מעתה כל הספק מנוטר כיחידה אחת.",
          cbcHe:
            "ב-CBC כל קו-מילוי מקבל Exception Group ('CBC_FILLLINE_03') המאגדת חריגות לשיעור-פסילה, CO2 ומשקל; ה-Follow-Up מנתב את כל ההתראות למנהל-המשמרת ולמעבדת-QA יחד.",
          navHe: [
            "Logistics ► Logistics Controlling ► QMIS ► Early Warning System ► Exceptions ► Group (MC=)",
            "SPRO ► Logistics – General ► LIS ► Logistics Data Warehouse ► Standard Analyses ► Early Warning System ► Maintain Exception Groups",
          ],
          tables: ["TMCEXC", "TMCEXCG"],
          tcodes: ["MC=", "MCYG"],
          fiori: ["F2745"],
          configHe: [
            "צור Exception Group והקצה לה את החריגות הרלוונטיות.",
            "הגדר Follow-Up Processing ברמת-הקבוצה: נמען / Workflow / הדגשה.",
            "הקבוצה היא יחידת-ההפעלה של ה-Periodic Analysis.",
          ],
          flow: [
            { he: "יצירת Exception Group", code: "MC=" },
            { he: "הקצאת חריגות לקבוצה" },
            { he: "הגדרת Follow-Up משותף", note: "נמען/Workflow" },
            { he: "הקבוצה מוכנה לתזמון", code: "MCYG" },
          ],
          masterDataHe: [
            "Exception Group = מיכל לוגי המקשר חריגות + Follow-Up משותף; יחידת-ההרצה של הניתוח-התקופתי.",
          ],
          mistakesHe: [
            "ערבוב חריגות מתחומים שונים בקבוצה אחת — התראות מגיעות לאדם הלא-נכון.",
            "אי-הגדרת Follow-Up ברמת-קבוצה — אין למי לשלוח.",
            "קבוצות רבות מדי בגרנולריות גבוהה — תקורת-תחזוקה.",
          ],
          troubleshootHe: [
            "התראות נשלחות לנמען שגוי ➔ Follow-Up ברמת-הקבוצה לא תואם את האחריות.",
            "חריגה לא נכללת בהרצה ➔ לא הוקצתה לאף Exception Group.",
            "הקבוצה לא מופיעה בתזמון ➔ לא נשמרה / חסרות חריגות.",
          ],
          bestPracticeHe: [
            "ארגן קבוצות לפי תחום-אחריות תפעולי (קו/ספק/מוצר).",
            "הגדר Follow-Up ברמת-הקבוצה כברירת-מחדל; דרוס ברמת-חריגה רק בחריג.",
            "שמור כמות-קבוצות מנוהלת — לא חריגה=קבוצה.",
          ],
          interviewHe: [
            { qHe: "למה לקבץ חריגות?", aHe: "כדי לנהל, להריץ ולנתב התראות של תחום-אחריות שלם כיחידה אחת, עם Follow-Up Processing משותף — נוח, עקבי ופחות שגיאות-ניתוב." },
            { qHe: "מהי יחידת-ההרצה של Periodic Analysis?", aHe: "ה-Exception Group, לא החריגה הבודדת — מתזמנים קבוצה והיא סורקת את כל חריגותיה." },
          ],
          takeawaysHe: [
            "Exception Group מאגדת חריגות ליחידת-ניהול והרצה אחת.",
            "Follow-Up Processing משותף מבטיח ניתוב-התראות עקבי.",
            "ארגן קבוצות לפי תחום-אחריות, לא באקראי.",
          ],
        },
        // -------------------------------------------------- 17.2.3
        {
          id: "17.2.3", titleHe: "הגדרת ניתוח תקופתי", titleEn: "Set Up Periodic Analysis",
          execHe:
            "הניתוח-התקופתי (Periodic Analysis) הוא המנוע שמריץ את ה-EWS בפועל: הוא קושר Exception Group למסגרת-זמן ולשיטת-ניתוח, ומתוזמן כעבודת-רקע (Background Job) שתסרוק את הנתונים בתדירות קבועה. בלעדיו החריגות הן רק הגדרות רדומות.",
          beginnerHe:
            "זהו ה'טיימר' של המערכת. הוא קובע מתי ובאיזו תדירות SAP בודק את החריגות — כל לילה, כל שבוע, כל חודש — ועל איזו תקופת-נתונים. בלי ניתוח-תקופתי מתוזמן, אף אחד לא לוחץ על 'בדוק' והנורה לעולם לא נדלקת.",
          consultantHe:
            "ב-MCYG מגדירים Periodic Analysis: בוחרים Exception Group, Period to analyze (טווח-התקופות הנסרק), ושיטת-ניתוח. את ה-Analysis מתזמנים כ-Background Job (SM36/SM37) בתדירות הרצויה. כל הרצה מייצרת רשימת-חריגים שאפשר לצפות בה ב-Exception Analysis (MC/E) ו/או נשלחת דרך Follow-Up. חשוב להתאים את ה-Period to analyze לסוג-ה-Requirement (Trend דורש לפחות שתי תקופות).",
          purposeHe:
            "להבטיח שהניטור קורה אוטומטית, באופן עקבי ובתדירות שתואמת את קצב-ההידרדרות של הסיכון — בלי תלות בזיכרון-אנושי.",
          processExampleHe:
            "מגדירים Periodic Analysis ל-Exception Group 'QM_LINE_MONITOR', Period to analyze = החודש האחרון, ומתזמנים Background Job יומי ב-02:00. כל בוקר ממתינה רשימת-חריגים מעודכנת בתיבת-הנמען.",
          cbcHe:
            "ב-CBC הניתוח-התקופתי של 'CBC_FILLLINE_03' מתוזמן יומי בסוף-משמרת-לילה, סורק את נתוני-24-השעות האחרונות, כך שכל חריגת-איכות בקו מזוהה לפני תחילת המשמרת הבאה.",
          navHe: [
            "Logistics ► Logistics Controlling ► QMIS ► Early Warning System ► Periodic Analysis (MCYG)",
            "SPRO ► Logistics – General ► LIS ► Logistics Data Warehouse ► Standard Analyses ► Early Warning System ► Schedule Periodic Analysis",
          ],
          tables: ["TMC4", "TMCEXCG", "TBTCO"],
          tcodes: ["MCYG", "SM36", "SM37"],
          fiori: ["F2745"],
          configHe: [
            "בחר Exception Group לניתוח-התקופתי (MCYG).",
            "הגדר Period to analyze (טווח-התקופות הנסרק) ושיטת-ניתוח.",
            "תזמן כ-Background Job (SM36) בתדירות התואמת לסיכון; עקוב ב-SM37.",
            "ל-Trend analysis — ודא שטווח-התקופות כולל לפחות שתי תקופות-השוואה.",
          ],
          flow: [
            { he: "בחירת Exception Group", code: "MCYG" },
            { he: "הגדרת Period to analyze + שיטה" },
            { he: "תזמון Background Job", code: "SM36" },
            { he: "מעקב-הרצה + תפוקה", code: "SM37", note: "→ MC/E" },
          ],
          masterDataHe: [
            "Periodic Analysis = הגדרה הקושרת Exception Group + Period to analyze + שיטת-ניתוח, המתוזמנת כ-Background Job.",
          ],
          mistakesHe: [
            "הגדרת Periodic Analysis אך אי-תזמונה כ-Job — ניטור לעולם לא רץ.",
            "Period to analyze קצר מדי ל-Trend (תקופה אחת) — אין מול מה להשוות.",
            "תדירות-תזמון איטית מקצב-ההידרדרות — התראה מאוחרת מדי.",
          ],
          troubleshootHe: [
            "אין רשימת-חריגים ➔ ה-Job לא תוזמן או נכשל (בדוק SM37).",
            "Trend לא מחושב ➔ Period to analyze כולל תקופה אחת בלבד.",
            "תוצאה לא נשלחת ➔ Follow-Up בקבוצה לא הוגדר.",
          ],
          bestPracticeHe: [
            "תזמן את התדירות לפי קצב-הסיכון — יומי לקו-ייצור, שבועי/חודשי לספק.",
            "עקוב אחר הצלחת ה-Job ב-SM37 וקבע התראת-כשל.",
            "התאם את Period to analyze לסוג-ה-Requirement (Trend ≥ שתי תקופות).",
          ],
          interviewHe: [
            { qHe: "מה תפקיד ה-Periodic Analysis?", aHe: "הוא מריץ את ה-EWS בפועל — קושר Exception Group למסגרת-זמן ולשיטת-ניתוח, ומתוזמן כ-Background Job שסורק את הנתונים בתדירות קבועה. בלעדיו החריגות רדומות." },
            { qHe: "מה דרוש כדי שניתוח-Trend יעבוד?", aHe: "Period to analyze הכולל לפחות שתי תקופות-השוואה, אחרת אין מול מה לחשב את אחוז-השינוי." },
          ],
          takeawaysHe: [
            "Periodic Analysis = מנוע-ההרצה של ה-EWS, מתוזמן כ-Background Job.",
            "קושר Exception Group + Period to analyze + שיטה.",
            "התדירות חייבת לתאום את קצב-ההידרדרות; Trend דורש ≥ שתי תקופות.",
          ],
        },
      ],
    },
    // ============================================================ 17.3
    {
      id: "17.3", titleHe: "תזמון מערכת ההתראה המוקדמת", titleEn: "Schedule Early Warning System",
      execHe:
        "תזמון ה-EWS הופך אותו ממערכת תגובתית-ידנית למערכת אוטומטית-יזומה. במקום שמישהו יריץ את הניתוח, מגדירים Background Job חוזר (SM36) המריץ את ה-Periodic Analysis בתדירות קבועה — וכך ההתראות נוצרות ונשלחות מבלי שאיש יזכור.",
      beginnerHe:
        "אחרי שבנית את הכללים, צריך לומר ל-SAP 'בדוק אותם לבד כל לילה'. זה התזמון: יוצרים 'משימה' שרצה ברקע לפי שעון — ואז המערכת עובדת גם כשאתה ישן.",
      consultantHe:
        "התזמון מתבצע ב-SM36: יוצרים Background Job עם Step שמריץ את תוכנית ה-Periodic Analysis (לרוב דרך הווריאנט שהוגדר ב-MCYG), קובעים Start Condition (Daily/Weekly/Monthly או After event) ו-Periodic flag. מעקב ב-SM37. שיקולים: חלון-זמן שבו הנתונים מעודכנים (אחרי Update Rules / סגירת-משמרת), עומס-מערכת, ותלות בעדכון ה-LIS. אפשר לשרשר את ה-Job אחרי ה-Job המעדכן את מבנה-המידע.",
      purposeHe:
        "להבטיח ניטור עקבי ובלתי-תלוי באדם, בתדירות שמתאימה לסיכון, כדי שהתראה תגיע בזמן שעדיין אפשר לפעול.",
      processExampleHe:
        "מנהל-המערכת יוצר ב-SM36 Job בשם 'EWS_QM_DAILY' המריץ את ה-Periodic Analysis של קבוצת-החריגה כל יום ב-03:00, אחרי ה-Job שמעדכן את מבנה-המידע. SM37 מציג היסטוריית-הרצות מוצלחות.",
      cbcHe:
        "ב-CBC ה-Job 'EWS_CBC_LINES' מתוזמן יומי בסוף-משמרת-שלישית ומשורשר אחרי עדכון מבני-המידע של קווי-המילוי, כך שהניטור תמיד רץ על נתונים מלאים של היממה.",
      navHe: [
        "Tools ► CCMS ► Background Processing ► Define Job (SM36)",
        "SPRO ► Logistics – General ► LIS ► Logistics Data Warehouse ► Standard Analyses ► Early Warning System ► Schedule Periodic Analysis",
      ],
      tables: ["TBTCO", "TBTCP", "TMC4"],
      tcodes: ["SM36", "SM37", "MCYG"],
      fiori: ["F1652", "F2745"],
      configHe: [
        "צור Background Job (SM36) עם Step להרצת ה-Periodic Analysis (וריאנט מ-MCYG).",
        "הגדר Start Condition: Daily/Weekly/Monthly או After event; סמן Periodic.",
        "שרשר את ה-Job אחרי עדכון מבנה-המידע כדי לרוץ על נתונים מלאים.",
        "עקוב ב-SM37 והגדר התראה על כשל-Job.",
      ],
      flow: [
        { he: "וריאנט Periodic Analysis", code: "MCYG" },
        { he: "יצירת Background Job", code: "SM36" },
        { he: "Start Condition + Periodic" },
        { he: "מעקב-הרצות", code: "SM37" },
      ],
      masterDataHe: [
        "Background Job = הגדרת-תזמון (TBTCO/TBTCP) המריצה את תוכנית ה-Periodic Analysis בתדירות חוזרת.",
      ],
      mistakesHe: [
        "תזמון ה-Job לפני עדכון מבנה-המידע — ניתוח על נתונים חלקיים/ישנים.",
        "אי-סימון Periodic — ה-Job רץ פעם אחת בלבד.",
        "התעלמות מ-SM37 — כשלים שקטים והתראות שלא נוצרות.",
      ],
      troubleshootHe: [
        "התראות מפסיקות פתאום ➔ ה-Job נכשל/בוטל (בדוק SM37 + Job log).",
        "נתונים ישנים בהתראה ➔ ה-Job רץ לפני עדכון ה-LIS — שרשר נכון.",
        "ה-Job רץ רק פעם ➔ לא סומן Periodic / Start Condition שגוי.",
      ],
      bestPracticeHe: [
        "שרשר את EWS אחרי ה-Job המעדכן את מבני-המידע.",
        "התאם תדירות לסיכון; הימנע משעות-עומס.",
        "נטר את ה-Job עצמו (SM37) — מערכת-התראה שלא רצה גרועה מאין.",
      ],
      interviewHe: [
        { qHe: "כיצד מתזמנים EWS?", aHe: "יוצרים Background Job ב-SM36 שמריץ את ה-Periodic Analysis בווריאנט שהוגדר ב-MCYG, עם Start Condition תקופתי (Daily/Weekly), ועוקבים ב-SM37." },
        { qHe: "מדוע חשוב לשרשר את ה-Job אחרי עדכון מבנה-המידע?", aHe: "כדי שה-EWS ינתח נתונים מלאים ועדכניים; הרצה לפני העדכון מנתחת נתונים חלקיים ומפיקה התראות מטעות או מאחרת אותן." },
      ],
      takeawaysHe: [
        "תזמון = הפיכת ה-EWS לאוטומטי דרך Background Job (SM36).",
        "סמן Periodic ושרשר אחרי עדכון מבני-המידע.",
        "נטר את ה-Job ב-SM37 — כשל שקט = אין התראות.",
      ],
      relatedHe: [
        { labelHe: "QM · מערכת המידע של QM (QMIS)", href: "/library/qm/chapter-16/" },
      ],
    },
    // ============================================================ 17.4
    {
      id: "17.4", titleHe: "מערכת ההתראה המוקדמת בפעולה", titleEn: "Early Warning System in Action",
      execHe:
        "כאשר ה-EWS פעיל ומתוזמן, הוא רץ ברקע, מזהה חריגות ודוחף התראות בזמן-אמת לאחראים. שלב זה ממחיש את מחזור-החיים המלא: מאירוע-נתונים (סגירת Inspection Lot) דרך עדכון ה-LIS, סריקת ה-Periodic Analysis, זיהוי-חריגה, ועד התראה ותחקור.",
      beginnerHe:
        "עכשיו הכול עובד לבד. מישהו רושם תוצאת-בדיקה, המספרים מתעדכנים, בלילה המערכת בודקת את הכללים, ואם משהו חרג — בבוקר מחכה לך הודעה: 'שיעור-הפסילה בקו 3 עלה, בדוק'. אתה לוחץ על הקישור ורואה את הפרטים.",
      consultantHe:
        "מחזור-החיים: (1) אירוע-QM (Usage Decision / סגירת QALS) מפעיל Update Rule שמעדכן את מבנה-המידע; (2) ה-Background Job מריץ את ה-Periodic Analysis בלילה; (3) ה-Analysis משווה כל Key Figure מול ה-Requirement; (4) חריגים מודגשים ברשימת-Exception Analysis (MC/E) ונשלחים דרך Follow-Up Processing (SAPoffice/Workflow). המשתמש מקבל הודעה עם drill-down ל-Standard Analysis לתחקור-שורש. אפשר לסמן חריגים בצבעים (Traffic-light) להבחנה מהירה.",
      purposeHe:
        "לסגור את הלולאה בין נתון-איכות לפעולה-מתקנת: לוודא שהתראה לא רק נוצרת אלא מגיעה לאדם-הנכון בזמן ומובילה לתחקור ותיקון.",
      processExampleHe:
        "בלילה ה-EWS מזהה ששיעור-הפסילה של חומר X עלה ל-2.4% (סף 2%). נוצרת התראה אדומה ב-MC/E ונשלחת לתיבת-מנהל-האיכות. בבוקר הוא פותח, עושה drill-down לפי ספק וזמן, ומגלה שכל הפסילות הגיעו מאצווה אחת של ספק מסוים — ופותח Quality Notification.",
      cbcHe:
        "ב-CBC ה-EWS מזהה לפנות-בוקר עלייה חדה בשיעור-פסילות בקו-מילוי 3 (Trend +60%). התראה אדומה נשלחת למנהל-המשמרת ולמעבדת-QA; ה-drill-down מצביע על משמרת-לילה ספציפית, ומוביל לעצירת-הקו ובדיקת-כיול של מכונת-המילוי לפני שאצוות פגומות יוצאות מהמפעל.",
      navHe: [
        "Logistics ► Logistics Controlling ► QMIS ► Early Warning System ► Display Exceptions (MC/E)",
        "SAP Business Workplace ► Inbox (SBWP) — קבלת התראות",
      ],
      tables: ["S004", "QMEL", "QALS", "TMCEXC"],
      tcodes: ["MC/E", "MCSI", "SBWP", "QM01"],
      fiori: ["F2745", "F1652"],
      configHe: [
        "Follow-Up Processing מנתב את ההתראה ל-SAPoffice/דוא\"ל/Workflow.",
        "סימון-חריגים בצבע (Traffic-light) להבחנה מהירה ב-MC/E.",
        "drill-down מההתראה ל-Standard Analysis (MCSI) לתחקור-שורש.",
      ],
      flow: [
        { he: "אירוע-QM מעדכן LIS", code: "QALS→S004", note: "Update Rule" },
        { he: "Periodic Analysis סורק", code: "Job" },
        { he: "השוואה מול Requirement", note: "זיהוי-חריגה" },
        { he: "התראה + צבע", code: "MC/E" },
        { he: "drill-down לתחקור", code: "MCSI", note: "→ QM01" },
      ],
      masterDataHe: [
        "ההתראה נוצרת מ-Exception שנמצא חורג; היא נושאת drill-down אל מבנה-המידע ואל מסמכי-המקור (QALS/QMEL).",
      ],
      mistakesHe: [
        "התראות נשלחות אך אף אחד לא קורא — חוסר-בעלות תהליכי.",
        "אין drill-down מוגדר — ההתראה מודיעה 'יש בעיה' אך לא 'איפה'.",
        "הצפת-התראות עקב ספים רכים — המשתמשים מתעלמים מכולן.",
      ],
      troubleshootHe: [
        "התראה לא הגיעה למשתמש ➔ Follow-Up/נמען שגוי או תיבת-SAPoffice לא מנוטרת.",
        "ההתראה ריקה מפרטים ➔ Characteristics/drill-down לא הוגדרו בחריגה.",
        "התראת-שווא ➔ סף שגוי או נתוני-LIS לא מעודכנים.",
      ],
      bestPracticeHe: [
        "הגדר בעלות-תהליך ברורה: מי מקבל, מי מתחקר, מי מתקן.",
        "השתמש בצבעי-Traffic-light לתיעדוף מיידי.",
        "ודא drill-down עד מסמך-המקור (Inspection Lot / Notification).",
      ],
      interviewHe: [
        { qHe: "מהו מחזור-החיים של התראה ב-EWS?", aHe: "אירוע-QM מעדכן את מבנה-המידע דרך Update Rule → Periodic Analysis סורק → השוואה מול Requirement → זיהוי-חריגה → התראה דרך Follow-Up → drill-down ל-Standard Analysis לתחקור-שורש." },
        { qHe: "כיצד מבטיחים שהתראה מובילה לפעולה?", aHe: "דרך Follow-Up Processing המנתב לנמען-הנכון, drill-down עד מסמך-המקור, ובעלות-תהליך מוגדרת (מי מתחקר ומתקן)." },
      ],
      takeawaysHe: [
        "ב-EWS פעיל, התראות נוצרות ונשלחות אוטומטית בזמן-אמת.",
        "מחזור: אירוע→עדכון LIS→סריקה→זיהוי→התראה→drill-down.",
        "ערך נוצר רק כשהתראה מגיעה לאדם-הנכון ומובילה לפעולה.",
      ],
      relatedHe: [
        { labelHe: "QM · הודעת-איכות (Quality Notification)", href: "/library/qm/chapter-11/" },
        { labelHe: "QM · החלטת-שימוש (Usage Decision)", href: "/library/qm/chapter-10/" },
      ],
    },
    // ============================================================ 17.5
    {
      id: "17.5", titleHe: "ניתוח חריגות", titleEn: "Exception Analysis",
      execHe:
        "ניתוח-החריגות (Exception Analysis) הוא שלב-התחקור: כאן צופים ברשימת-החריגים שזיהה ה-EWS, מתעדפים אותם, ועושים drill-down אל הנתונים והמסמכים שמאחוריהם כדי להבין את שורש-הבעיה. זהו הגשר בין ההתראה ('יש בעיה') לבין הפעולה-המתקנת ('הנה הסיבה').",
      beginnerHe:
        "קיבלת התראה — מה עכשיו? פותחים את מסך-הניתוח, רואים את רשימת-כל-החריגים (לרוב בצבעים: אדום=חמור), בוחרים אחד, ו'צוללים' פנימה: לפי ספק, מוצר, זמן — עד שמוצאים מאיפה הבעיה באה.",
      consultantHe:
        "Exception Analysis נצפה ב-MC/E (וגם משולב ב-Standard Analysis, MCSI). הרשימה מציגה את החריגים עם Traffic-light וערכי-ה-Key Figures. ה-drill-down נע לאורך ה-Characteristics של מבנה-המידע (Material→Vendor→Period) ומאפשר מעבר ל-Standard Analysis לפילוח-נוסף, ומשם ל-Document level (Inspection Lot QALS, Quality Notification QMEL). אפשר לייצא לרשימה, ל-SAP Office או ל-Spreadsheet, ולפתוח Notification ישירות לטיפול.",
      purposeHe:
        "להפוך התראה גולמית לתובנה ניתנת-לפעולה: לתעדף לפי חומרה, לבודד את הגורם (ספק/מכונה/משמרת/אצווה), ולהתחיל את התהליך-המתקן.",
      processExampleHe:
        "מנהל-איכות פותח את Exception Analysis, רואה שלושה חריגים אדומים, בוחר את החמור, ועושה drill-down: Material→Vendor מגלה שספק אחד אחראי ל-80% מהפסילות. הוא מייצא את הרשימה ופותח Quality Notification מול הספק.",
      cbcHe:
        "ב-CBC ניתוח-החריגות של קו-מילוי 3 מאפשר drill-down לפי משמרת ושעה; מנהל-QA מגלה שכל הפסילות מרוכזות במשמרת-לילה אחת, מבודד את מכונת-המילוי החשודה, ומתעד CAPA לבדיקת-כיול.",
      navHe: [
        "Logistics ► Logistics Controlling ► QMIS ► Early Warning System ► Exception Analysis (MC/E)",
        "Logistics ► Logistics Controlling ► QMIS ► Standard Analyses ► drill-down (MCSI)",
      ],
      tables: ["S004", "QALS", "QMEL", "TMCEXC"],
      tcodes: ["MC/E", "MCSI", "MCXX", "QM01"],
      fiori: ["F2745", "F1652"],
      configHe: [
        "רשימת-חריגים עם Traffic-light וערכי-Key-Figures ב-MC/E.",
        "drill-down לאורך ה-Characteristics (Material→Vendor→Period) ומעבר ל-MCSI.",
        "ייצוא לרשימה/SAPoffice/Spreadsheet ופתיחת Quality Notification (QM01).",
      ],
      flow: [
        { he: "פתיחת רשימת-חריגים", code: "MC/E" },
        { he: "תיעדוף לפי Traffic-light" },
        { he: "drill-down לפי Characteristic", code: "MCSI" },
        { he: "מעבר למסמך-מקור", code: "QALS/QMEL" },
        { he: "פתיחת Notification", code: "QM01" },
      ],
      masterDataHe: [
        "Exception Analysis קוראת מ-Information Structure (Key Figures + Characteristics) ומקשרת למסמכי-מקור QALS/QMEL ל-drill-down.",
      ],
      mistakesHe: [
        "עצירה ברמת-ההתראה בלי drill-down — לא מזהים את הגורם.",
        "ניתוח בלי תיעדוף — מטפלים בחריג זניח ומפספסים קריטי.",
        "אי-תיעוד הממצא ב-Notification — אין מעקב-טיפול.",
      ],
      troubleshootHe: [
        "drill-down לא מגיע למסמך ➔ Characteristics לא הוגדרו במבנה-המידע.",
        "ערכים לא תואמים ל-Standard Analysis ➔ מבנה-מידע לא מעודכן (Update Rules).",
        "אין חריגים למרות התראה ➔ צפייה בתקופה/וריאנט שגוי.",
      ],
      bestPracticeHe: [
        "התחל מהחריג האדום-ביותר; תעדף לפי חומרה ולא לפי סדר-רשימה.",
        "צלול עד מסמך-המקור לפני שמסיקים מסקנה.",
        "תעד כל ממצא ב-Quality Notification ליצירת-מעקב ו-CAPA.",
      ],
      interviewHe: [
        { qHe: "מה מטרת ה-Exception Analysis?", aHe: "לתחקר את החריגים שזיהה ה-EWS — לתעדף לפי חומרה, לעשות drill-down לאורך ה-Characteristics עד מסמך-המקור (Inspection Lot/Notification), ולבודד את שורש-הבעיה לפעולה-מתקנת." },
        { qHe: "כיצד עוברים מהתראה לפעולה?", aHe: "drill-down ב-MC/E/MCSI מ-Key Figure → Characteristic → מסמך-מקור, ואז פתיחת Quality Notification (QM01) לתיעוד ולמעקב CAPA." },
      ],
      takeawaysHe: [
        "Exception Analysis = שלב-התחקור: רשימה, תיעדוף, drill-down.",
        "drill-down לאורך Characteristics עד מסמך-המקור (QALS/QMEL).",
        "סגור את הלולאה דרך Quality Notification.",
      ],
      relatedHe: [
        { labelHe: "QM · הודעת-איכות (Quality Notification)", href: "/library/qm/chapter-11/" },
        { labelHe: "QM · מערכת המידע של QM (QMIS)", href: "/library/qm/chapter-16/" },
      ],
    },
    // ============================================================ 17.6
    {
      id: "17.6", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "ה-EWS משלים את מערכת-המידע של QM: הוא הופך נתוני-איכות אגורים ב-LIS לכלי-ניטור יזום שמתריע מוקדם על מגמות שליליות. ההקמה היא תלת-שלבית (Exceptions → Exception Groups → Periodic Analysis), התזמון הופך אותו לאוטומטי, ובפעולה הוא דוחף התראות ומאפשר תחקור עד שורש-הבעיה — מתגובתי ליזום.",
      beginnerHe:
        "סיכום במשפט: ה-EWS הוא ה'נורת-האזהרה' של האיכות. בנית כללים (חריגות), קיבצת אותם, תזמנת בדיקה אוטומטית — ועכשיו המערכת מתריעה אותך מוקדם, ומאפשרת לצלול לפרטים ולתקן לפני שהבעיה גדלה.",
      consultantHe:
        "מבחינה ארכיטקטונית ה-EWS תלוי לחלוטין באיכות ה-LIS שמתחתיו: מבנה-מידע מאוכלס, Update Rules תקינים, Key Figures רלוונטיים. ההצלחה תלויה בכיול-ספים נכון (Threshold + Trend), ב-Exception Groups מאורגנות לפי אחריות, ב-Periodic Analysis מתוזמן בתדירות שתואמת-סיכון, וב-Follow-Up Processing שמנתב לאדם-הנכון עם drill-down. ב-S/4HANA כדאי לשקול גם embedded analytics/CDS לצד ה-EWS הקלאסי, אך עקרונות הניטור-היזום נשמרים.",
      purposeHe:
        "לקבע את ה-EWS כשכבת-המנע של ניהול-האיכות: לקצר זמן-תגובה, למנוע פסילות והרחבת-נזק, ולעמוד בדרישות-רגולציה דרך ניטור-מגמות שיטתי ואוטומטי.",
      processExampleHe:
        "מקצה-לקצה: רשמת תוצאות-בדיקה → ה-LIS התעדכן → ה-EWS המתוזמן זיהה חריגת-סף → התראה נשלחה → תחקרת ב-Exception Analysis → בודדת ספק/משמרת → פתחת Notification ותיקנת. הלולאה נסגרה אוטומטית-למחצה.",
      cbcHe:
        "ב-CBC ה-EWS מנטר את כל קווי-המילוי יומית; עליית-מגמה בשיעור-פסילה או סטיית-CO2 מזוהה לפנות-בוקר, מובילה לעצירת-קו ובדיקת-כיול, ומונעת שחרור אצוות-משקה פגומות — הגנה ישירה על בטיחות-המזון, המותג והעמידה ברגולציה.",
      navHe: [
        "Logistics ► Logistics Controlling ► Quality Management Information System ► Early Warning System",
        "SPRO ► Logistics – General ► LIS ► Logistics Data Warehouse ► Standard Analyses ► Early Warning System",
      ],
      tables: ["S004", "TMCEXC", "TMCEXCG", "QALS", "QMEL"],
      tcodes: ["MC=", "MCYG", "MC/E", "SM36"],
      fiori: ["F2745", "F1652"],
      configHe: [
        "ודא תשתית-LIS: מבנה-מידע מאוכלס + Update Rules + Key Figures רלוונטיים.",
        "כייל ספים (Threshold + Trend), ארגן Exception Groups לפי אחריות.",
        "תזמן Periodic Analysis בתדירות-תואמת-סיכון; הגדר Follow-Up עם drill-down.",
        "ב-S/4HANA שקול embedded analytics/CDS לצד ה-EWS הקלאסי.",
      ],
      flow: [
        { he: "תשתית LIS מאוכלסת", code: "S004" },
        { he: "Exceptions + Groups", code: "MC=" },
        { he: "Periodic Analysis מתוזמן", code: "MCYG/SM36" },
        { he: "התראה + תחקור", code: "MC/E", note: "→ QM01" },
      ],
      masterDataHe: [
        "כל מחזור-החיים נשען על Information Structure תקין; ה-EWS אינו מאחסן נתונים אלא מנטר את ה-LIS.",
      ],
      mistakesHe: [
        "השקעה ב-EWS בלי לתקן את תשתית-ה-LIS שמתחתיו — בסיס רעוע.",
        "ספים לא-מכוילים → הצפת-שווא או פספוס → אובדן-אמון במערכת.",
        "התראות בלי בעלות-תהליך → מערכת רצה אך חסרת-ערך.",
      ],
      troubleshootHe: [
        "EWS 'לא עובד' ➔ ברוב המקרים השורש הוא LIS לא-מעודכן (Update Rules) או Job לא-מתוזמן.",
        "התראות-שווא חוזרות ➔ כיול-ספים מחדש מול נתונים היסטוריים.",
        "ערך-עסקי נמוך ➔ חוסר-בעלות וחוסר drill-down עד מסמך-המקור.",
      ],
      bestPracticeHe: [
        "בסס LIS תקין לפני EWS; נטר את ה-Job (SM37) ואת איכות-הנתונים.",
        "התחל קטן וחד, הרחב הדרגתית; הימנע מהצפת-התראות.",
        "קבע בעלות-תהליך: מי מקבל, מתחקר ומתקן כל סוג-התראה.",
      ],
      interviewHe: [
        { qHe: "מהו הסיכון המרכזי בהטמעת EWS?", aHe: "תלות מוחלטת באיכות ה-LIS שמתחתיו ובכיול-הספים: מבנה-מידע לא-מעודכן או ספים גרועים מובילים להצפת-שווא או לפספוס — ובכך לאובדן-אמון ולמערכת חסרת-ערך." },
        { qHe: "כיצד EWS משנה את אופי ניהול-האיכות?", aHe: "מתגובתי (מגלים בעיה כשהיא חמורה) ליזום (מתריעים על מגמה בעודה קטנה) — מקצר זמן-תגובה, מונע פסילות ו-Recalls, ותומך בעמידה ברגולציה." },
      ],
      takeawaysHe: [
        "EWS הופך את ניהול-האיכות מתגובתי ליזום מעל ה-LIS.",
        "הצלחה = LIS תקין + ספים מכוילים + תזמון תואם-סיכון + בעלות-תהליך.",
        "ב-CBC: הגנה ישירה על בטיחות-מזון, מותג ורגולציה דרך זיהוי-מגמה מוקדם.",
      ],
      relatedHe: [
        { labelHe: "QM · מערכת המידע של QM (QMIS)", href: "/library/qm/chapter-16/" },
        { labelHe: "QM · הודעת-איכות (Quality Notification)", href: "/library/qm/chapter-11/" },
      ],
    },
  ],
};
