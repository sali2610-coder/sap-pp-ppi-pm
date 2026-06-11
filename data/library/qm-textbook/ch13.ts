// ===== QM Digital Textbook — Chapter 13 (Engineering Change Management) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Beginner + consultant friendly; SAP identifiers verbatim EN; CBC = Coca-Cola
// bottling recipe/spec change control. Hierarchy + ids preserved exactly.
import type { TextbookChapter } from "./types";

export const CH13: TextbookChapter = {
  n: 13,
  titleHe: "ניהול שינויים הנדסי (ECM)",
  titleEn: "Engineering Change Management",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לניהול שינויים הנדסי (Engineering Change Management) בהקשר ה-QM. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC (בקרת שינויי מתכון/מפרט בייצור משקאות), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. ECM הוא המנגנון שמבטיח שכל שינוי באובייקט-אב (תוכנית-בדיקה, BOM, מאסטר-בדיקה, מפרט) נעשה תחת מספר-שינוי (Change Number) עם תוקף, אישור ותיעוד מלא — הלב של בקרת-תצורה (Configuration Management) ושל עמידה ברגולציית-מזון.",
  subchapters: [
    // ============================================================ 13.1
    {
      id: "13.1", titleHe: "אב-שינוי (Change Master)", titleEn: "Change Master",
      execHe:
        "אב-השינוי (Change Master), המזוהה ב-Change Number, הוא הרשומה המרכזית של ECM. הוא קושר תאריך-תוקף (Valid-From), היקף-אובייקטים (Object Types: תוכנית-בדיקה, BOM, מאסטר-בדיקה ועוד) וסטטוס-אישור לכל שינוי הנדסי. כל שינוי שנעשה תחת מספר-שינוי נשמר עם היסטוריה מלאה ומאפשר date-effective explosion — המערכת יודעת בדיוק מה היה תקף בכל תאריך. זהו הבסיס לבקרת-תצורה, לביקורת-רגולטורית ולשחזור 'מה ייצרנו ובדקנו אז'.",
      beginnerHe:
        "דמיין שכל שינוי שאתה עושה במתכון או בתוכנית-בדיקה מחייב 'טופס-שינוי' רשמי. הטופס הזה הוא ה-Change Master: הוא נושא מספר (Change Number), אומר ממתי השינוי נכנס לתוקף, על אילו אובייקטים הוא חל, ומי אישר אותו. במקום לשנות 'בשקט', כל שינוי מתועד ומתוארך — אפשר תמיד לחזור ולראות מה היה ומה השתנה.",
      consultantHe:
        "אב-השינוי נוצר ב-CC01, נערך ב-CC02, מוצג ב-CC03; הרשומה נשמרת ב-AENR (כותרת אב-השינוי) ו-AEOI (פריטי-אובייקט המושפעים). כל Change Master נושא Valid-From date, Object Type indicators (Task list / BOM / Inspection plan / Document / Material), סטטוס (Status Profile דרך BS02), ואופציה ל-Effectivity מתקדם (Parameter/Date effectivity). ב-S/4HANA ECM זמין גם דרך Change Record / Engineering Record בעולם ה-Fiori. שדה קריטי: ה-Valid-From — הוא מניע date-effective explosion ב-MRP ובפיצוץ תוכנית-הבדיקה; שכחה של היקף-אובייקט נכון ב-Object Types תחסום עריכה של האובייקט תחת אותו מספר-שינוי.",
      purposeHe:
        "המטרה: לתת מסגרת מבוקרת, מתוארכת ומאושרת לכל שינוי באובייקטי-אב הנדסיים — להבטיח עמידה ברגולציה (מזון/תרופות), בקרת-תצורה, ומעקב-שינויים מלא, מבלי למחוק או לדרוס מידע קודם.",
      processExampleHe:
        "מהנדס-איכות יוצר Change Number ב-CC01 עם Valid-From = 1 בחודש הבא, מסמן Object Type = Inspection plan, ומגדיר סטטוס 'בעיבוד'. הוא עורך את תוכנית-הבדיקה (QP02) תוך ציון אותו Change Number; השינוי נשמר עם תוקף עתידי. בדיקות-קבלה שייפתחו לפני התאריך עדיין משתמשות בתוכנית הישנה; מהתאריך והלאה — בחדשה. לאחר אישור QA הסטטוס מוקפץ ל'משוחרר'.",
      cbcHe:
        "ב-CBC כל שינוי במתכון משקה או במפרט-בדיקת-איכות (למשל החמרת סף Brix או הוספת בדיקת-אלרגן) נעשה תחת Change Number ייעודי. ה-Valid-From מסונכרן עם מועד מעבר-הייצור בקו; בדיקות שנפתחו על אצוות שיוצרו לפני המעבר נשארות תחת המפרט הישן — קריטי לרגולציית-מזון ולתחקור-תלונות.",
      navHe: [
        "Logistics – General ► Engineering Change Management ► Define Change Types (OS54)",
        "Logistics – General ► Engineering Change Management ► Set Up Effectivity Parameters",
        "Logistics – General ► Engineering Change Management ► Define Status Profile (BS02)",
      ],
      tables: ["AENR", "AEOI", "AENV", "PLKO"],
      tcodes: ["CC01", "CC02", "CC03", "CC31", "OS54", "BS02"],
      fiori: ["F2768", "F1602A"],
      configHe: [
        "Change Types (OS54): מגדיר סוגי-שינוי, היקף-אובייקטים מותר, וסטטוס-פרופיל ברירת-מחדל.",
        "Effectivity: Date effectivity (Valid-From) הסטנדרטי; Parameter effectivity להקשרים מתקדמים (Variant configuration).",
        "Status Profile (BS02): מגדיר סטטוסי-משתמש ומעברים מותרים לאב-השינוי.",
        "Object Types: סימון אילו אובייקטים (Inspection plan / BOM / Task list / Document) ניתן לערוך תחת המספר.",
      ],
      flow: [
        { he: "יצירת Change Master", code: "CC01", note: "Valid-From + Object Types" },
        { he: "הגדרת סטטוס-אישור", code: "BS02", note: "User Status" },
        { he: "עריכת אובייקט תחת המספר", code: "QP02/CS02", note: "ציון Change Number" },
        { he: "שמירה עם תוקף", code: "AENR/AEOI" },
        { he: "אישור ושחרור", code: "CC02", note: "Status → Released" },
        { he: "date-effective explosion", code: "QP01/MD04" },
      ],
      masterDataHe: [
        "AENR = כותרת אב-השינוי (Change Number, Valid-From, Status).",
        "AEOI = פריטי-אובייקט המושפעים (Object Type, מפתח-אובייקט, אינדיקטור-שינוי).",
        "AENV = ניהול וריאנטים/effectivity מתקדם · PLKO = כותרת תוכנית-בדיקה הנושאת את התוקף.",
      ],
      mistakesHe: [
        "יצירת Change Number ללא סימון Object Type הנכון — אי-אפשר לערוך את האובייקט תחתיו.",
        "Valid-From שגוי (עבר/עתיד) — השינוי נכנס לתוקף בתאריך לא-מכוון.",
        "עריכת אובייקט ללא ציון Change Number כאשר History Requirement פעיל — השמירה נחסמת.",
        "שחרור Change Master לפני אישור QA — שינוי לא-מאושר נכנס לייצור.",
      ],
      troubleshootHe: [
        "לא ניתן לערוך תוכנית-בדיקה תחת מספר-שינוי ➔ Object Type לא סומן ב-Change Master.",
        "השינוי לא 'נכנס לתוקף' ➔ Valid-From עתידי, או הסטטוס עדיין לא משוחרר.",
        "השמירה דורשת Change Number ולא ניתן להמשיך ➔ History Requirement פעיל וחסר מספר-שינוי (CC01).",
        "פיצוץ מציג גרסה ישנה ➔ תאריך-הדרישה קודם ל-Valid-From של השינוי.",
      ],
      bestPracticeHe: [
        "הגדר Change Type ייעודי לכל תחום (QM/BOM/Routing) עם Status Profile מתאים.",
        "תאם תמיד Valid-From עם מועד מעבר-הייצור בפועל.",
        "אל תשחרר Change Master לפני אישור-QA בתהליך מסודר (Status Profile חוסם).",
        "תעד את היקף-האובייקטים והסיבה לשינוי בטקסט-הכותרת.",
      ],
      interviewHe: [
        { qHe: "מהו Change Master ובאיזו טבלה הוא נשמר?", aHe: "רשומת-העל של ECM, המזוהה ב-Change Number; נוצר ב-CC01 ונשמר ב-AENR (כותרת) + AEOI (פריטי-אובייקט). הוא נושא Valid-From, היקף-אובייקטים וסטטוס-אישור." },
        { qHe: "מה תפקיד ה-Valid-From?", aHe: "הוא מתאריך את כניסת-השינוי לתוקף ומניע date-effective explosion — בדיקות/פק\"ע לפני התאריך משתמשות בגרסה הישנה, ומהתאריך והלאה בחדשה." },
        { qHe: "מהו ההבדל בין CC01, CC02, CC03?", aHe: "CC01 = יצירת אב-שינוי, CC02 = עריכה/שינוי-סטטוס, CC03 = הצגה בלבד." },
      ],
      takeawaysHe: [
        "Change Master = הרשומה המרכזית של ECM, מזוהה ב-Change Number (CC01/CC02/CC03).",
        "נושא Valid-From, היקף-אובייקטים וסטטוס; נשמר ב-AENR + AEOI.",
        "מאפשר date-effective explosion ובקרת-תצורה מלאה.",
        "Object Type ו-Valid-From הם שני השדות שטעות בהם 'שוברת' את כל התהליך.",
      ],
      relatedHe: [
        { labelHe: "QM · תכנון-בדיקה", href: "/library/qm/chapter-13/#sub-13.1.4" },
        { labelHe: "PP · BOM עם דרישת-היסטוריה (3.2.4)", href: "/library/pp/chapter-03/#sub-3.2.4" },
        { labelHe: "אובייקט · AENR", href: "/library/qm/object/AENR/" },
      ],
      children: [
        {
          id: "13.1.1", titleHe: "הגדרת פרופיל-סטטוס (סטטוס-משתמש)", titleEn: "Configuring a Status Profile (User Status)",
          execHe: "פרופיל-הסטטוס (Status Profile) מגדיר את מחזור-החיים של אב-השינוי באמצעות סטטוסי-משתמש (User Status) ומעברים מותרים ביניהם. הוא הופך את ה-Change Master מ'רשומה חופשית' למסמך מבוקר עם תהליך-אישור — למשל בעיבוד → בבדיקה → מאושר → משוחרר → סגור.",
          beginnerHe: "פרופיל-סטטוס הוא כמו 'תחנות' שדרכן עובר טופס-השינוי: קודם 'בעיבוד', אחר-כך 'נשלח לאישור', ואז 'מאושר'. הפרופיל קובע אילו מעברים מותרים (אי-אפשר לקפוץ ישר ל'מאושר') ואילו פעולות חסומות בכל תחנה.",
          consultantHe: "מוגדר ב-BS02 (General Status Management). כל User Status נושא מספר-סדר (Status number — קובע סדר רציף), Lowest/Highest status number (טווח-מעברים מותר), ו-Business transactions שהוא מתיר/אוסר/מחייב. הפרופיל מוצמד לאובייקט CHANGEMASTER ומשויך ל-Change Type ב-OS54. שילוב נכון מאכוף תהליך-אישור — למשל חסימת 'Release' עד הגעה לסטטוס 'Approved'.",
          purposeHe: "לאכוף תהליך-אישור מסודר ובלתי-עקיף על שינויים הנדסיים — כך ששינוי לא-מאושר לא יכול להגיע לייצור, ושכל מעבר-סטטוס מתועד.",
          processExampleHe: "מהנדס יוצר Change Number; הסטטוס ההתחלתי הוא 'In process'. הוא מגיש לאישור (מעבר ל-'Submitted'). מנהל-QA מאשר ('Approved'), ורק אז ניתן 'Release'. ניסיון לדלג ישירות מ-'In process' ל-'Released' נחסם על-ידי טווחי Lowest/Highest.",
          cbcHe: "ב-CBC פרופיל-הסטטוס אוכף שכל שינוי-מתכון יעבור אישור QA ואישור-רגולציה לפני שחרור לייצור — חסימת 'Released' עד שני האישורים מתועדת ועומדת בביקורת.",
          navHe: ["Logistics – General ► Engineering Change Management ► Define Status Profile (BS02)"],
          tables: ["TJ30", "TJ30T", "AENR"],
          tcodes: ["BS02", "CC01", "CC02"],
          fiori: ["F2768"],
          configHe: [
            "ב-BS02 צור Status Profile והקצה אותו לאובייקט CHANGEMASTER.",
            "לכל User Status הגדר Status number, Lowest/Highest (טווח-מעברים), ו-Initial status.",
            "הגדר Business transactions: התר/אסור/חייב (למשל 'Release change master' מחייב סטטוס מסוים).",
          ],
          mistakesHe: [
            "אי-הצמדת הפרופיל לאובייקט CHANGEMASTER — הסטטוסים לא יחולו.",
            "טווחי Lowest/Highest שגויים — מאפשרים דילוג על תחנות-אישור.",
          ],
          troubleshootHe: [
            "סטטוס-משתמש לא מופיע ב-Change Master ➔ הפרופיל לא הוקצה ל-CHANGEMASTER או ל-Change Type.",
            "ניתן לשחרר ללא אישור ➔ Business transaction 'Release' לא נחסם לסטטוסים נמוכים.",
          ],
          bestPracticeHe: [
            "בנה תהליך-אישור פשוט וברור (3–5 סטטוסים); ריבוי סטטוסים מסבך.",
            "חסום 'Release' באמצעות Business transactions, לא רק בהדרכה.",
          ],
          interviewHe: [
            { qHe: "באיזו תנועה מגדירים Status Profile ל-ECM?", aHe: "ב-BS02 (General Status Management), והפרופיל מוצמד לאובייקט CHANGEMASTER." },
            { qHe: "מה מונע דילוג בין סטטוסים?", aHe: "שדות Lowest/Highest status number בכל User Status מגבילים לאילו סטטוסים מותר לעבור." },
          ],
          takeawaysHe: [
            "Status Profile (BS02) מגדיר את מחזור-חיי אב-השינוי.",
            "User Status + Lowest/Highest אוכפים תהליך-אישור מסודר.",
            "Business transactions חוסמים פעולות (כמו Release) לפי סטטוס.",
          ],
          relatedHe: [{ labelHe: "אובייקט · TJ30", href: "/library/qm/object/TJ30/" }],
        },
        {
          id: "13.1.2", titleHe: "תחזוקת הפרופיל", titleEn: "Maintain the Profile",
          execHe: "תחזוקת פרופיל-הסטטוס היא העבודה השוטפת של הגדרת הסטטוסים, סדרם, המעברים והעסקאות-העסקיות שלהם ב-BS02 — והצמדתם ל-Change Type. כאן הופכים את העיצוב המושגי לתצורה פעילה שאוכפת את התהליך בפועל.",
          beginnerHe: "אחרי שהחלטנו אילו תחנות יהיו, צריך 'לבנות' אותן במערכת: להקליד כל סטטוס, לקבוע את הסדר, לסמן מה מותר ומה אסור בכל אחד, ולחבר את הפרופיל לסוג-השינוי שלנו. זו פעולת-התחזוקה ב-BS02.",
          consultantHe: "במסך BS02 מתחזקים: שורת-Status (Status / Short text / Status number / Lowest+Highest / Initial / Position+Priority לתצוגה), ולכל סטטוס את לשונית ה-Business transactions (Allowed / Warning / Forbidden / Set / Delete). שינוי בפרופיל פעיל משפיע על Change Masters קיימים — לכן יש לתחזק בזהירות עם בקרת-תעבורה (Transport). ההצמדה ל-Change Type מתבצעת ב-OS54.",
          purposeHe: "לתרגם את עיצוב-התהליך לתצורה אכיפה — ולתחזק אותה לאורך-זמן כשהדרישות העסקיות/הרגולטוריות משתנות.",
          processExampleHe: "צוות-QM מבקש להוסיף סטטוס-ביניים 'Pending Regulatory'. היועץ פותח BS02, מוסיף שורת-סטטוס עם Status number בין 'Submitted' ל-'Approved', מעדכן טווחי Lowest/Highest של השכנים, ומגדיר שב-'Pending Regulatory' עסקת 'Release' אסורה.",
          cbcHe: "ב-CBC מוסיפים סטטוס 'אישור-רגולציה' לפרופיל שינויי-המתכון, כדי שתחנת-הרגולציה תהפוך לחלק מובנה ובלתי-עקיף בתהליך — מתוחזק ב-BS02 ומופץ לסביבת-הייצור דרך Transport.",
          navHe: ["Logistics – General ► Engineering Change Management ► Define Status Profile ► Maintain (BS02)"],
          tables: ["TJ30", "TJ30T", "TJ20"],
          tcodes: ["BS02", "OS54"],
          fiori: ["F2768"],
          configHe: [
            "תחזק שורות-Status: Status number, Lowest/Highest, Initial, Position/Priority.",
            "לכל סטטוס הגדר Business transactions (Allowed/Warning/Forbidden, ו-Set/Delete סטטוס).",
            "הצמד את הפרופיל ל-Change Type ב-OS54; הפץ דרך Transport.",
          ],
          mistakesHe: [
            "עריכת פרופיל פעיל ללא Transport מסודר — אי-התאמה בין סביבות.",
            "שינוי Status numbers אחרי שקיימים Change Masters — מבלבל מעברים קיימים.",
          ],
          troubleshootHe: [
            "מעבר-סטטוס נחסם בלא-צפוי ➔ טווחי Lowest/Highest השתנו בתחזוקה.",
            "סטטוס חדש לא זמין בייצור ➔ הפרופיל לא הופץ ב-Transport.",
          ],
          bestPracticeHe: [
            "תחזק תמיד דרך Transport; אל תערוך ישירות בסביבת-ייצור.",
            "תכנן Status numbers עם מרווחים (10,20,30) להוספות עתידיות.",
          ],
          interviewHe: [
            { qHe: "כיצד מוסיפים סטטוס-ביניים בלי לשבש מעברים קיימים?", aHe: "מקצים Status number בין הקיימים (לכן מומלץ מרווחים) ומעדכנים את טווחי Lowest/Highest של השכנים." },
            { qHe: "היכן מצמידים את הפרופיל ל-Change Type?", aHe: "ב-OS54 (Define Change Types)." },
          ],
          takeawaysHe: [
            "תחזוקה ב-BS02: סטטוסים, סדר, מעברים, עסקאות-עסקיות.",
            "הצמדה ל-Change Type ב-OS54; הפצה ב-Transport.",
            "תכנן Status numbers עם מרווחים לגמישות.",
          ],
        },
        {
          id: "13.1.3", titleHe: "יצירת אב-שינוי", titleEn: "Change Master Creation",
          execHe: "יצירת אב-השינוי ב-CC01 היא הצעד התפעולי שפותח שינוי הנדסי: מזינים Change Number (פנימי/חיצוני), Valid-From, היקף-אובייקטים, סטטוס וטקסט-תיאור. מרגע זה כל עריכה של אובייקט מאושר תחת המספר נשמרת עם תוקף והיסטוריה.",
          beginnerHe: "כאן 'פותחים את הטופס'. נכנסים ל-CC01, נותנים מספר (או שהמערכת נותנת), קובעים ממתי השינוי תקף, מסמנים על מה הוא חל (תוכנית-בדיקה? BOM?), וכותבים למה משנים. אחרי שמירה — המספר מוכן לשימוש בעריכות.",
          consultantHe: "ב-CC01 קובעים: Change Number (Number range לפי Change Type ב-OS54), Valid-From date, Object Type indicators, Status, ו-Effectivity (Date / Parameter). אפשר להוסיף Alternative Date, אובייקטים ספציפיים (Object overview) ו-Management records לכל אובייקט. הרשומה נכתבת ל-AENR; כל אובייקט מקושר נרשם ב-AEOI. מומלץ Number range פנימי לעקביות. CC31 משמש ליצירת Change Number עם ניהול-היררכי (Change Master Hierarchy / Leading change master).",
          purposeHe: "לפתוח באופן מבוקר את 'מעטפת-השינוי' שתחתיה יבוצעו וירשמו כל העריכות ההנדסיות, עם תוקף, אישור ותיעוד.",
          processExampleHe: "מהנדס פותח CC01, מקבל Change Number פנימי, מזין Valid-From = תחילת הרבעון, מסמן Object Type = Inspection plan + Material, וכותב 'הוספת בדיקת-אלרגן לפי תקן חדש'. שומר; כעת QP02 יקבל את המספר לעריכת-תוכנית-הבדיקה.",
          cbcHe: "ב-CBC נפתח Change Number לכל גל-שינויים במתכון/מפרט; כאשר שינוי משפיע על כמה אובייקטים (BOM + תוכנית-בדיקה + מאסטר-בדיקה) משתמשים ב-CC31 לניהול-היררכי תחת אב-שינוי מוביל אחד.",
          navHe: ["Logistics – General ► Engineering Change Management ► Create Change Master (CC01 / CC31)"],
          tables: ["AENR", "AEOI", "AENV"],
          tcodes: ["CC01", "CC31", "CC02", "CC03"],
          fiori: ["F2768"],
          configHe: [
            "Number range ל-Change Number מוגדר לפי Change Type (OS54) — מומלץ פנימי.",
            "ב-CC01 מזינים Valid-From, Object Types, Status ו-Effectivity (Date/Parameter).",
            "CC31 ליצירת אב-שינוי היררכי (Leading change master) המאגד מספרי-משנה.",
          ],
          flow: [
            { he: "פתיחת CC01", code: "CC01", note: "Change Number + Valid-From" },
            { he: "סימון Object Types", note: "Inspection plan / BOM / Material" },
            { he: "הגדרת Status התחלתי", code: "BS02" },
            { he: "שמירה", code: "AENR/AEOI" },
            { he: "(אופציונלי) היררכיה", code: "CC31" },
          ],
          masterDataHe: [
            "AENR נכתב בעת שמירת ה-Change Master; AEOI נכתב לכל אובייקט שמשויך.",
            "Number range נשלט ב-OS54 לפי Change Type.",
          ],
          mistakesHe: [
            "שימוש ב-Number range חיצוני ללא בקרה — כפילויות/חוסר-עקביות.",
            "אי-מילוי Object Types — אי-אפשר לערוך אובייקטים תחת המספר.",
          ],
          troubleshootHe: [
            "המערכת לא מאפשרת לשמור ➔ Valid-From ריק או Status התחלתי לא מוגדר בפרופיל.",
            "לא ניתן לקשר אובייקט ➔ Object Type שלו לא סומן ב-Change Master.",
          ],
          bestPracticeHe: [
            "השתמש ב-Number range פנימי וב-Change Type נכון לכל תחום.",
            "מלא תיאור-משמעותי וסיבת-שינוי כבר ביצירה — בסיס לביקורת.",
            "השתמש ב-CC31 כששינוי אחד נוגע בכמה אובייקטים.",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין CC01 ל-CC31?", aHe: "CC01 יוצר אב-שינוי בודד; CC31 יוצר אב-שינוי היררכי (Leading change master) המאגד מספרי-שינוי-משנה." },
            { qHe: "מה חובה למלא ביצירת Change Master?", aHe: "Change Number (או אוטומטי), Valid-From, Status התחלתי, והיקף-Object Types — בלי Object Type לא ניתן לערוך את האובייקט תחתיו." },
          ],
          takeawaysHe: [
            "CC01 פותח את מעטפת-השינוי; CC31 לניהול היררכי.",
            "Valid-From + Object Types = שני שדות-החובה הקריטיים.",
            "הרשומה נכתבת ל-AENR + AEOI.",
          ],
          relatedHe: [{ labelHe: "אובייקט · AEOI", href: "/library/qm/object/AEOI/" }],
        },
        {
          id: "13.1.4", titleHe: "שינויים בתוכנית-בדיקה עם מספר-שינוי", titleEn: "Changes in Inspection Plan with a Change Number",
          execHe: "עריכת תוכנית-בדיקה (Inspection plan) תחת Change Number מבטיחה ששינוי בפעולות, במאפייני-בדיקה או בערכי-יעד יישמר עם תוקף-תאריך, יאפשר date-effective explosion בעת יצירת מנת-בדיקה, וישמור היסטוריה מלאה לביקורת.",
          beginnerHe: "כשמשנים מה בודקים או איך בודקים — נכנסים ל-QP02, מציינים את ה-Change Number, ועורכים. השינוי לא 'דורס' את הגרסה הישנה: הוא נכנס לתוקף מהתאריך שנקבע. בדיקות שנפתחו קודם לכן עדיין מציגות את הגרסה הישנה.",
          consultantHe: "תוכנית-הבדיקה (PLKO כותרת, PLPO פעולות, PLMK מאפייני-בדיקה) נושאת Valid-From בכל גרסה. עריכה ב-QP02 תוך ציון Change Number יוצרת רשומה חדשה עם תוקף מה-Valid-From של אב-השינוי. בעת יצירת מנת-בדיקה (QP01 inspection lot) המערכת מבצעת date-effective explosion — בוחרת את גרסת-התוכנית התקפה לתאריך. כדי שעריכה תחת Change Number תהיה אפשרית, ה-Change Master חייב לסמן Object Type = Inspection plan/Task list, ולעיתים נדרשת History Requirement פעילה לתוכניות.",
          purposeHe: "לנהל שינויי-בדיקה תחת בקרת-תצורה: לדעת בדיוק לפי איזה מפרט נבדקה כל אצווה — חיוני לרגולציה, לתחקור-תלונות ולשחרור-אצוות.",
          processExampleHe: "צריך להחמיר טווח-pH ב-1 בחודש. פותחים Change Number עם Valid-From = 1 בחודש, נכנסים ל-QP02 עם המספר, מעדכנים את ערך-היעד של מאפיין-ה-pH. מנת-בדיקה שתיפתח על אצווה מ-2 בחודש תשתמש בטווח החדש; אצווה מ-28 בחודש הקודם — בישן.",
          cbcHe: "ב-CBC כל שינוי מפרט-בדיקה (Brix, CO2 volumes, סף-אלרגן) מתוכנת לתוקף תחת Change Number; מנות-הבדיקה של כל אצוות-מילוי נבדקות אוטומטית מול הגרסה התקפה ליום-המילוי שלהן.",
          navHe: [
            "Quality Management ► Quality Planning ► Inspection Planning ► Change Inspection Plan (QP02)",
            "Logistics – General ► Engineering Change Management ► assign Object Type = Task list to Change Master",
          ],
          tables: ["PLKO", "PLPO", "PLMK", "AEOI"],
          tcodes: ["QP01", "QP02", "QP03", "CC02"],
          fiori: ["F2768", "F1602A"],
          configHe: [
            "ב-Change Master (CC02) ודא Object Type = Inspection plan / Task list מסומן.",
            "במידת-הצורך הפעל History Requirement לתוכניות-הבדיקה כדי לחייב Change Number.",
            "ב-QP02 הזן את ה-Change Number במסך-הכניסה; השינוי נשמר עם Valid-From של אב-השינוי.",
          ],
          flow: [
            { he: "פתיחת/בחירת Change Number", code: "CC01/CC02" },
            { he: "כניסה ל-QP02 עם המספר", code: "QP02" },
            { he: "עריכת פעולות/מאפיינים", code: "PLPO/PLMK" },
            { he: "שמירה עם תוקף", code: "PLKO Valid-From" },
            { he: "date-effective explosion במנת-בדיקה", code: "QP01" },
          ],
          masterDataHe: [
            "PLKO = כותרת תוכנית-הבדיקה (נושאת Valid-From לגרסה).",
            "PLPO = פעולות · PLMK = מאפייני-בדיקה · AEOI = קישור האובייקט לאב-השינוי.",
          ],
          mistakesHe: [
            "עריכה ב-QP02 ללא הזנת Change Number כשנדרש — שינוי ללא תוקף/היסטוריה.",
            "Object Type 'Task list' לא מסומן באב-השינוי — לא ניתן לערוך תחתיו.",
            "Valid-From לא מתואם עם מעבר-הייצור — אצוות נבדקות לפי מפרט שגוי.",
          ],
          troubleshootHe: [
            "QP02 לא מקבל את ה-Change Number ➔ Object Type Task list לא מסומן באב-השינוי.",
            "מנת-בדיקה משתמשת בגרסה ישנה ➔ תאריך-הבדיקה קודם ל-Valid-From.",
            "אין אפשרות לשמור ללא Change Number ➔ History Requirement פעיל לתוכנית.",
          ],
          bestPracticeHe: [
            "תאם תמיד Valid-From עם מועד מעבר-הייצור/הרגולציה.",
            "הפעל History Requirement לתוכניות תחת רגולציה כדי לחייב מעקב.",
            "תעד בטקסט-השינוי איזה מאפיין/ערך השתנה ולמה.",
          ],
          interviewHe: [
            { qHe: "כיצד עורכים תוכנית-בדיקה תחת Change Number?", aHe: "ב-QP02 מזינים את ה-Change Number; השינוי נשמר עם ה-Valid-From של אב-השינוי, ובלבד ש-Object Type = Task list מסומן בו." },
            { qHe: "מהו date-effective explosion בהקשר מנת-בדיקה?", aHe: "בעת פתיחת מנת-בדיקה המערכת בוחרת את גרסת תוכנית-הבדיקה התקפה לתאריך, כך שכל אצווה נבדקת לפי המפרט שהיה בתוקף ביום שלה." },
          ],
          takeawaysHe: [
            "עריכה ב-QP02 תחת Change Number שומרת תוקף + היסטוריה.",
            "דורש Object Type = Task list באב-השינוי.",
            "מנת-בדיקה מבצעת date-effective explosion לפי תאריך.",
          ],
          relatedHe: [
            { labelHe: "QM · תוכנית-בדיקה (PLKO/PLPO)", href: "/library/qm/object/PLKO/" },
            { labelHe: "PP · BOM עם דרישת-היסטוריה (3.2.4)", href: "/library/pp/chapter-03/#sub-3.2.4" },
          ],
        },
        {
          id: "13.1.5", titleHe: "מערכת-המידע של ECM", titleEn: "ECM Information System",
          execHe: "מערכת-המידע של ECM מספקת שאילתות-דיווח על מספרי-שינוי, האובייקטים שהושפעו, התוקף והסטטוס — לאיתור מהיר 'מה שונה, מתי, על-ידי מי ותחת איזה מספר'. היא בסיס לביקורת, לתחקור ולבקרת-תצורה.",
          beginnerHe: "אחרי שצברנו הרבה שינויים, צריך לחפש ולדווח: 'אילו שינויים נכנסו לתוקף החודש?', 'אילו אובייקטים שינה מספר-שינוי X?'. מערכת-המידע של ECM נותנת את הדוחות האלה במקום לחפש ידנית.",
          consultantHe: "כוללת שאילתות סביב AENR/AEOI — רשימת Change Masters לפי Valid-From/סטטוס/יוצר, ו-Object overview לכל מספר-שינוי. ב-CC02/CC03 יש Object overview מובנה; דוחות נוספים מאפשרים חתך לפי Object Type. ב-S/4HANA / Fiori קיימים אריחי-ניתוח לשינויים ול-Change Records. השאילתות נשענות על שדות-המפתח: Change Number, Valid-From, Status, Object Type ו-Object key.",
          purposeHe: "לאפשר נראות, ביקורת ותחקור מהירים על כלל פעילות-השינויים — ולתמוך בעמידה ברגולציה ובחקירת-תלונות.",
          processExampleHe: "מבקר-איכות מבקש את כל השינויים בתוכניות-בדיקה ברבעון. דרך מערכת-המידע מסננים Change Masters לפי Object Type = Task list וטווח Valid-From, ומקבלים רשימה עם סטטוס ויוצר — ומשם צוללים ל-Object overview של כל מספר.",
          cbcHe: "ב-CBC בעת תלונת-צרכן על טעם, QA שולף דרך מערכת-המידע את כל שינויי-המתכון/מפרט שנכנסו לתוקף סביב תאריך-הייצור של האצווה — ומאתר מהר אם שינוי מסוים קשור.",
          navHe: ["Logistics – General ► Engineering Change Management ► Information System / Object Overview (CC02/CC03)"],
          tables: ["AENR", "AEOI", "AENV"],
          tcodes: ["CC02", "CC03"],
          fiori: ["F2768"],
          configHe: [
            "השתמש ב-Object overview ב-CC02/CC03 לראות את כל האובייקטים תחת מספר-שינוי.",
            "סנן Change Masters לפי Valid-From, Status, Created-by ו-Object Type.",
            "ב-Fiori נצל אריחי-ניתוח לשינויים/Change Records לתמונה רוחבית.",
          ],
          mistakesHe: [
            "תחקור ידני בטבלאות במקום שימוש ב-Object overview — איטי ושגיא.",
            "תיאורי-שינוי דלים — מקשים על דיווח ופרשנות בדיעבד.",
          ],
          troubleshootHe: [
            "לא רואים את כל האובייקטים שהושפעו ➔ חלקם נערכו ללא Change Number (אין רשומת AEOI).",
            "דוח לא מחזיר שינוי צפוי ➔ סינון Valid-From/Status לא תואם.",
          ],
          bestPracticeHe: [
            "תחזק תיאורי-שינוי עשירים — הם הופכים את הדיווח לשמיש.",
            "השתמש ב-Object overview כברירת-מחדל לתחקור, לא בשאילתות-טבלה.",
          ],
          interviewHe: [
            { qHe: "כיצד מאתרים את כל האובייקטים שהושפעו ממספר-שינוי?", aHe: "דרך ה-Object overview ב-CC02/CC03, הנשען על רשומות AEOI של אותו Change Number." },
            { qHe: "מדוע ECM Information System חשוב לרגולציה?", aHe: "הוא מאפשר לשחזר 'מה שונה, מתי ותחת איזה מספר', ולקשר שינויים לאצוות-ייצור בעת תחקור/ביקורת." },
          ],
          takeawaysHe: [
            "מערכת-המידע מדווחת על שינויים, אובייקטים, תוקף וסטטוס.",
            "Object overview (CC02/CC03) הוא הכלי המהיר לתחקור.",
            "נשענת על AENR/AEOI; בסיס לביקורת ולתחקור-תלונות.",
          ],
          relatedHe: [{ labelHe: "אובייקט · AENV", href: "/library/qm/object/AENV/" }],
        },
      ],
    },
    // ============================================================ 13.2
    {
      id: "13.2", titleHe: "רשומת-שינוי (Change Record)", titleEn: "Change Record",
      execHe:
        "רשומת-השינוי (Change Record) היא המעטפת התהליכית של ECM ב-S/4HANA: היא עוטפת את אב-השינוי בתהליך-עסקי מובנה (workflow) — בקשה, הערכה, אישור, מימוש וסגירה — ומאגדת תחתיה את כל האובייקטים, המסמכים והמשימות. בעוד ה-Change Master הוא הנתון-הטכני, ה-Change Record הוא ניהול-התהליך סביבו.",
      beginnerHe:
        "אם ה-Change Master הוא 'הטופס', ה-Change Record הוא 'התיק' שמנהל את כל מסע-השינוי: מי ביקש, מי מעריך, מי מאשר, אילו מסמכים מצורפים ואילו משימות פתוחות. הוא מרכז את הכל למקום אחד עם תהליך ברור.",
      consultantHe:
        "ה-Change Record הוא אובייקט ב-S/4HANA (מבוסס Case/Records Management ו-Engineering Change Management חדש) שמנהל workflow ומקשר Change Master(s), אובייקטים, מסמכים ומשתתפים. הוא נגיש בעיקר דרך Fiori (Manage Change Records / Manage Engineering Changes) ודרך ה-Engineering Cockpit. הוא מפריד בין שלב-הבקשה/הערכה (ECR-like) לשלב-המימוש (ECO-like), ומאפשר מעקב-סטטוס רוחבי. תחתיו עדיין נוצרים Change Masters (AENR/AEOI) למימוש הטכני בפועל.",
      purposeHe:
        "לתת תהליך-עסקי מנוהל ושקוף לשינויים הנדסיים — מבקשה ועד מימוש — עם אחריות, אישורים ותיעוד, מעל הרובד הטכני של אב-השינוי.",
      processExampleHe:
        "בקשת-שינוי נפתחת כ-Change Record (ECR): צוות מעריך השפעה, מאשר; הרשומה עוברת לשלב-מימוש (ECO) שתחתיו נוצר Change Master לעריכת ה-BOM ותוכנית-הבדיקה. עם השלמת המשימות והאישורים — הרשומה נסגרת.",
      cbcHe:
        "ב-CBC בקשת שינוי-מתכון נכנסת כ-Change Record; היא עוברת הערכת-השפעה (עלות, רגולציה, מלאי-אריזה ישן), אישור-QA ואישור-רגולציה, ורק אז ממומשת דרך Change Master על ה-BOM ותוכניות-הבדיקה — הכל גלוי ומתועד ב-Engineering Cockpit.",
      navHe: [
        "SAP Fiori Launchpad ► Manage Change Records",
        "Logistics – General ► Engineering Change Management ► Change Record configuration",
      ],
      tables: ["AENR", "AEOI", "SCMG_T_CASE_ATTR"],
      tcodes: ["CC01", "CC02", "CC03"],
      fiori: ["F2768", "F4421", "F4422"],
      configHe: [
        "Change Record מבוסס Case/Records Management; מוגדר workflow, סוגי-רשומה ומשתתפים.",
        "מבחין בין שלב-בקשה/הערכה (ECR) לשלב-מימוש (ECO).",
        "תחת הרשומה נוצרים Change Masters טכניים (AENR/AEOI) למימוש בפועל.",
      ],
      flow: [
        { he: "פתיחת בקשת-שינוי", code: "ECR", note: "Change Record" },
        { he: "הערכת-השפעה", note: "עלות/רגולציה/מלאי" },
        { he: "אישור", note: "QA + Regulatory" },
        { he: "מימוש", code: "ECO", note: "Change Master נוצר" },
        { he: "עדכון אובייקטים", code: "CS02/QP02" },
        { he: "סגירת הרשומה", note: "Closed" },
      ],
      mistakesHe: [
        "ערבוב שלב-הבקשה (ECR) עם המימוש (ECO) — אובדן בקרת-תהליך.",
        "מימוש שינוי-טכני (Change Master) ללא Change Record — אין מעקב-תהליך/אישור.",
      ],
      troubleshootHe: [
        "שינוי 'תקוע' בלי מימוש ➔ הרשומה נשארה בשלב-הערכה ללא אישור.",
        "אובייקטים לא עודכנו ➔ לא נוצר Change Master מתאים תחת ה-Change Record.",
      ],
      bestPracticeHe: [
        "השתמש ב-Change Record כשער-כניסה לכל שינוי; ה-Change Master הוא רק המימוש.",
        "הפרד ברור בין ECR (הערכה) ל-ECO (מימוש) עם אישורים בכל שער.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Change Record ל-Change Master?", aHe: "Change Record = מעטפת תהליך-עסקי (workflow, אישורים, מסמכים, ECR/ECO); Change Master = הרשומה הטכנית (AENR/AEOI) שמבצעת את השינוי באובייקטים בפועל." },
        { qHe: "מהם ECR ו-ECO?", aHe: "ECR = Engineering Change Request (בקשה והערכה); ECO = Engineering Change Order (מימוש מאושר). ה-Change Record מנהל את המעבר ביניהם." },
      ],
      takeawaysHe: [
        "Change Record = מעטפת-תהליך (workflow) מעל אב-השינוי.",
        "מפריד ECR (בקשה/הערכה) מ-ECO (מימוש).",
        "נגיש דרך Fiori; תחתיו נוצרים Change Masters טכניים.",
      ],
      relatedHe: [
        { labelHe: "QM · אב-שינוי", href: "/library/qm/chapter-13/#sub-13.1" },
        { labelHe: "QM · רשומת-הנדסה", href: "/library/qm/chapter-13/#sub-13.3" },
      ],
      children: [
        {
          id: "13.2.1", titleHe: "ניהול שינויים הנדסיים", titleEn: "Manage Engineering Changes",
          execHe: "אפליקציית Manage Engineering Changes (Fiori) היא נקודת-העבודה המודרנית ליצירה, חיפוש ומעקב אחר שינויים הנדסיים — תצוגה רשימתית עם סטטוס, תוקף ואובייקטים מושפעים, ומעבר ישיר לעריכה ולתהליך-האישור.",
          beginnerHe: "זה ה'מסך הראשי' החדש לשינויים: רואים את כל השינויים ברשימה, מסננים לפי סטטוס/תאריך, פותחים שינוי חדש או נכנסים לקיים — הכל מהדפדפן, בלי תנועות-SAP ישנות.",
          consultantHe: "אפליקציית Fiori המנהלת Engineering Changes מעל מנגנון ה-ECM; מציגה Change Masters/Records עם Valid-From, Status ו-Affected objects, ומאפשרת drill-down. היא נשענת על אותם נתונים (AENR/AEOI) אך מוסיפה חוויית-משתמש, סינון וניתוח. משמשת כתחליף מודרני ל-CC01/CC02/CC03 בתרחישי S/4HANA Cloud/On-Prem עם Fiori.",
          purposeHe: "להנגיש את יצירת-ומעקב-השינויים בחוויית-משתמש מודרנית, מרוכזת וניתנת-לסינון — ולהפחית תלות בתנועות-המסך הקלאסיות.",
          processExampleHe: "מהנדס פותח את Manage Engineering Changes, מסנן 'In process', בוחר שינוי, בודק את ה-Affected objects ואת ה-Valid-From, ומקדם את הסטטוס — הכל ממסך אחד.",
          cbcHe: "ב-CBC צוות-ההנדסה מנהל את גל-שינויי-המתכון מ-Manage Engineering Changes: רשימה מסוננת לפי קו-ייצור וסטטוס, עם נראות מיידית לאילו אצוות/מפרטים מושפעים.",
          navHe: ["SAP Fiori Launchpad ► Manage Engineering Changes"],
          tables: ["AENR", "AEOI"],
          tcodes: ["CC01", "CC02"],
          fiori: ["F2768", "F4421"],
          configHe: [
            "הקצה את Business Catalog/Role של Engineering Changes למשתמשים.",
            "וודא מיפוי לאותו Number range ו-Change Type של ה-ECM הקלאסי.",
          ],
          mistakesHe: [
            "ניהול חלק מהשינויים ב-Fiori וחלק ב-CC01 ללא תיאום — בלבול-סטטוס.",
            "חוסר-הרשאה לקטלוג Fiori — מסך ריק/שגיאה.",
          ],
          troubleshootHe: [
            "שינוי לא מופיע ברשימה ➔ סינון-סטטוס/תאריך לא תואם.",
            "האפליקציה לא נטענת ➔ חסרה הרשאת-Catalog/Role.",
          ],
          bestPracticeHe: [
            "בחר ערוץ-עבודה אחיד (Fiori או קלאסי) למניעת בלבול.",
            "נצל סינון לפי Object Type/Status לעבודה ממוקדת.",
          ],
          interviewHe: [
            { qHe: "על אילו נתונים נשענת Manage Engineering Changes?", aHe: "על אותם AENR/AEOI של ה-ECM הקלאסי — היא מוסיפה חוויית-Fiori, סינון ו-drill-down מעליהם." },
          ],
          takeawaysHe: [
            "אפליקציית-Fiori מודרנית ליצירה ומעקב-שינויים.",
            "מעל אותו מנגנון ECM (AENR/AEOI).",
            "מחליפה את CC01/CC02 בחוויית-משתמש.",
          ],
        },
        {
          id: "13.2.2", titleHe: "ניהול רשומות-שינוי", titleEn: "Manage Change Records",
          execHe: "אפליקציית Manage Change Records (Fiori) מנהלת את מעטפות-התהליך (Change Records) — בקשות, הערכות, אישורים ומשימות — עם תצוגת-סטטוס ומעבר בין שלבי ECR/ECO. היא הממשק התפעולי לניהול ה-workflow של השינוי.",
          beginnerHe: "כאן מנהלים את ה'תיקים' (Change Records), לא רק את הטפסים: רואים אילו בקשות פתוחות, מי צריך לאשר, אילו משימות תלויות, ובאיזה שלב כל שינוי נמצא.",
          consultantHe: "אפליקציית-Fiori לניהול Change Records מעל Case/Records Management: יצירת רשומה, הקצאת-משתתפים, צירוף-מסמכים, מעקב-משימות ומעברי-סטטוס בין ECR ל-ECO. היא מקשרת Change Master(s) טכניים תחת כל רשומה, ומספקת תצוגת-תהליך רוחבית. נשענת על טבלאות Case (SCMG_*) בנוסף ל-AENR/AEOI של המימוש הטכני.",
          purposeHe: "לנהל את התהליך-העסקי של השינוי (אנשים, אישורים, מסמכים, משימות) במקום מרוכז ושקוף — מעל הביצוע-הטכני.",
          processExampleHe: "מנהל-שינויים פותח Manage Change Records, יוצר רשומה לבקשת-שינוי, מקצה מעריכים, עוקב אחר אישורים, ובמעבר ל-ECO מקשר את ה-Change Master שמבצע את העריכה הטכנית.",
          cbcHe: "ב-CBC כל בקשת שינוי-מתכון מנוהלת כ-Change Record: שערי-אישור QA ורגולציה, מסמכי-מפרט מצורפים, ומשימות לעדכון BOM/תוכניות-בדיקה — מעקב מלא עד סגירה.",
          navHe: ["SAP Fiori Launchpad ► Manage Change Records"],
          tables: ["SCMG_T_CASE_ATTR", "AENR", "AEOI"],
          tcodes: ["CC02", "CC03"],
          fiori: ["F4422", "F2768"],
          configHe: [
            "הגדר Case/Record types, שלבים (ECR/ECO) ו-workflow אישורים.",
            "הקצה Business Catalog/Role; הגדר משתתפים ותפקידים.",
            "קשר Change Masters טכניים תחת הרשומה.",
          ],
          flow: [
            { he: "יצירת Change Record", code: "ECR" },
            { he: "הקצאת מעריכים/מאשרים", note: "Participants" },
            { he: "אישור והעברה ל-ECO", code: "ECO" },
            { he: "קישור Change Master", code: "AENR" },
            { he: "מעקב משימות וסגירה", note: "Closed" },
          ],
          mistakesHe: [
            "רשומות פתוחות ללא בעלים/מאשר — שינויים תקועים.",
            "מימוש טכני ללא קישור ל-Change Record — אובדן מעקב.",
          ],
          troubleshootHe: [
            "רשומה תקועה ➔ משימת-אישור ממתינה לבעלים לא-פעיל.",
            "אין קישור למימוש ➔ Change Master לא שויך לרשומה.",
          ],
          bestPracticeHe: [
            "הגדר בעלים ושערי-אישור ברורים לכל שלב.",
            "צרף מסמכי-מפרט ישירות לרשומה לתיעוד מלא.",
          ],
          interviewHe: [
            { qHe: "מה מנהלת Manage Change Records לעומת Manage Engineering Changes?", aHe: "Manage Change Records מנהלת את מעטפת-התהליך (workflow, אישורים, ECR/ECO, מסמכים); Manage Engineering Changes מתמקדת באב-השינוי הטכני והאובייקטים." },
          ],
          takeawaysHe: [
            "ניהול Change Records = ניהול workflow השינוי.",
            "שלבי ECR/ECO, משתתפים, מסמכים ומשימות.",
            "מקשרת Change Masters טכניים תחת כל רשומה.",
          ],
        },
        {
          id: "13.2.3", titleHe: "Engineering Cockpit", titleEn: "Engineering Cockpit",
          execHe: "ה-Engineering Cockpit הוא מרכז-בקרה רוחבי (Fiori) המאחד תצוגה של רשומות-שינוי, אב-שינוי, אובייקטים מושפעים, משימות וסטטוסים — תמונת-על אחת לניהול כל פעילות-ההנדסה והשינויים.",
          beginnerHe: "ה-Cockpit הוא 'לוח-מחוונים' לכל השינויים: רואים במבט-אחד מה פתוח, מה ממתין לאישור, מה נכנס לתוקף בקרוב, ולאן צריך לתת תשומת-לב.",
          consultantHe: "אפליקציית-Fiori מסוג Overview/Cockpit המרכזת KPIs ורשימות-עבודה סביב ECM: Change Records לפי שלב, Change Masters לפי Valid-From/Status, משימות פתוחות ואובייקטים מושפעים. מספקת drill-down ל-Manage Change Records / Manage Engineering Changes. אידיאלית למנהלי-שינויים ולצוות-QM הזקוקים לתמונת-מצב רוחבית ולתעדוף.",
          purposeHe: "לתת נראות-ניהולית ותעדוף לכלל פעילות-השינויים — לזהות צווארי-בקבוק, אישורים תקועים ושינויים שעומדים להיכנס לתוקף.",
          processExampleHe: "מנהל-QM פותח את ה-Engineering Cockpit בבוקר, רואה 3 רשומות ממתינות-לאישור ו-2 שינויים שייכנסו לתוקף השבוע, וצולל ישירות לטיפול בכל אחד.",
          cbcHe: "ב-CBC ה-Cockpit מציג למנהל-האיכות את כל שינויי-המתכון הקרבים לכניסה-לתוקף לצד מצב-מלאי-אריזה ישן — כדי לתזמן מעבר-קו בלי לזרוק מלאי.",
          navHe: ["SAP Fiori Launchpad ► Engineering Cockpit / Engineering Change Overview"],
          tables: ["AENR", "AEOI", "SCMG_T_CASE_ATTR"],
          tcodes: ["CC03"],
          fiori: ["F2768", "F4421", "F4422"],
          configHe: [
            "הקצה את קטלוג/תפקיד ה-Engineering Cockpit למנהלי-שינויים.",
            "הגדר KPIs ורשימות-עבודה רלוונטיות (לפי שלב/תוקף/סטטוס).",
          ],
          mistakesHe: [
            "הסתמכות על ה-Cockpit ללא נתוני-בסיס מתוחזקים — מדדים מטעים.",
            "הרשאות חלקיות — תמונת-מצב חסרה.",
          ],
          troubleshootHe: [
            "מדדים ריקים/שגויים ➔ נתוני Change Records/Masters לא מתוחזקים או סינון שגוי.",
            "אין drill-down ➔ חסרות הרשאות לאפליקציות-היעד.",
          ],
          bestPracticeHe: [
            "השתמש ב-Cockpit לתעדוף יומי של אישורים ושינויים-קרבים.",
            "הצלב כניסה-לתוקף עם מלאי/קו-ייצור לתזמון מעברים.",
          ],
          interviewHe: [
            { qHe: "מה תפקיד ה-Engineering Cockpit?", aHe: "מרכז-בקרה רוחבי (Fiori) המאחד Change Records, Change Masters, משימות וסטטוסים לתמונת-על אחת עם drill-down — לניהול ולתעדוף שינויים." },
          ],
          takeawaysHe: [
            "Engineering Cockpit = לוח-מחוונים רוחבי ל-ECM.",
            "מאחד רשומות, אב-שינוי, משימות וסטטוסים.",
            "כלי-תעדוף וניהול עם drill-down לאפליקציות-העבודה.",
          ],
          relatedHe: [{ labelHe: "QM · ניהול רשומות-שינוי", href: "/library/qm/chapter-13/#sub-13.2.2" }],
        },
      ],
    },
    // ============================================================ 13.3
    {
      id: "13.3", titleHe: "רשומת-הנדסה (Engineering Record)", titleEn: "Engineering Record",
      execHe:
        "רשומת-ההנדסה (Engineering Record) היא מסגרת-תהליך מבוססת-מסמכים ב-S/4HANA לניהול שינויים הנדסיים מורכבים — היא מאגדת אובייקטים, מסמכים, אישורים ומשימות, ומשתלבת עם ה-Change Master למימוש הטכני. בעוד ה-Change Record מתמקד בתהליך-העסקי, ה-Engineering Record שם דגש על תיעוד-הנדסי ועל קישור-אובייקטים מובנה.",
      beginnerHe:
        "ה-Engineering Record הוא 'תיק-הנדסי' מסודר לשינוי: הוא אוסף את כל המסמכים, האובייקטים והאישורים שקשורים לשינוי הנדסי אחד, ומחבר אותם לתהליך-עבודה. הוא מתאים לשינויים גדולים שדורשים תיאום בין מסמכים, BOM, תוכניות ואנשים.",
      consultantHe:
        "ה-Engineering Record (חלק מ-SAP S/4HANA Engineering) מנהל פריטי-אובייקט מקושרים (Documents/DMS, Materials, BOMs, Task lists), workflow-אישורים וסטטוסים, ומפעיל/מקשר Change Master(s) למימוש. הוא נגיש דרך Fiori (Manage Engineering Records). שונה מ-Change Record בכך שהוא ממוקד-תיעוד-הנדסי וקישור-DMS, אך השניים חופפים בתרחישים רבים. תחתיו, כמו תמיד, השינוי הטכני בפועל נרשם ב-AENR/AEOI.",
      purposeHe:
        "לנהל שינויים הנדסיים מורכבים עם תיעוד מובנה, קישור-מסמכים (DMS), אישורים וקישור-אובייקטים — מעבר לרובד הטכני של אב-השינוי.",
      processExampleHe:
        "שינוי-מוצר מורכב נפתח כ-Engineering Record: מצורפים מפרטי-תכן (DMS), מקושרים BOM ותוכנית-בדיקה, מוקצים מאשרים. לאחר אישור, נוצר/מקושר Change Master המבצע את השינוי באובייקטים עם Valid-From.",
      cbcHe:
        "ב-CBC שדרוג-קו-מילוי הדורש שינוי מפרט-אריזה, BOM ותוכנית-בדיקה בו-זמנית מנוהל כ-Engineering Record: מסמכי-תכן ותקני-איכות מצורפים, האישורים מתועדים, והמימוש מתבצע תחת Change Master מתואם-Valid-From.",
      navHe: [
        "SAP Fiori Launchpad ► Manage Engineering Records",
        "Logistics – General ► Engineering Change Management ► Engineering Record configuration",
      ],
      tables: ["AENR", "AEOI", "DRAW"],
      tcodes: ["CC01", "CC02", "CC03"],
      fiori: ["F2768", "F4421"],
      configHe: [
        "הגדר Engineering Record types, workflow-אישורים וקישורי-אובייקט (DMS/Material/BOM/Task list).",
        "קשר/הפעל Change Master למימוש הטכני תחת הרשומה.",
        "הקצה Business Catalog/Role למשתמשים.",
      ],
      flow: [
        { he: "פתיחת Engineering Record", note: "תיק-הנדסי" },
        { he: "קישור מסמכים ואובייקטים", code: "DRAW/BOM/Task list" },
        { he: "אישורים", note: "Workflow" },
        { he: "מימוש דרך Change Master", code: "AENR", note: "Valid-From" },
        { he: "סגירה ותיעוד", note: "Closed" },
      ],
      mistakesHe: [
        "ניהול שינוי-מורכב כסדרת Change Masters בודדים ללא Engineering Record — אובדן תיאום.",
        "אי-קישור מסמכי-DMS — תיעוד-הנדסי חסר.",
      ],
      troubleshootHe: [
        "אובייקטים לא מתואמים בתוקף ➔ Change Masters שונים עם Valid-From לא-מתואם תחת הרשומה.",
        "מסמך-תכן חסר ➔ לא קושר ב-DMS לרשומה.",
      ],
      bestPracticeHe: [
        "השתמש ב-Engineering Record לשינויים רב-אובייקטיים הדורשים תיאום ותיעוד.",
        "קשר מסמכי-DMS ותקני-איכות לרשומה לתיעוד מלא וביקורתי.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Engineering Record ל-Change Record?", aHe: "שניהם מעטפות-תהליך מעל ה-Change Master; Engineering Record ממוקד תיעוד-הנדסי וקישור-DMS/אובייקטים לשינויים מורכבים, ואילו Change Record ממוקד בתהליך-העסקי וב-workflow (ECR/ECO). בתרחישים רבים הם חופפים." },
        { qHe: "היכן נרשם השינוי הטכני בפועל?", aHe: "תמיד ב-Change Master (AENR/AEOI) המקושר/מופעל תחת ה-Engineering Record." },
      ],
      takeawaysHe: [
        "Engineering Record = תיק-הנדסי לשינויים מורכבים.",
        "מאגד מסמכים (DMS), אובייקטים, אישורים ומשימות.",
        "המימוש הטכני תמיד דרך Change Master (AENR/AEOI).",
      ],
      relatedHe: [
        { labelHe: "QM · רשומת-שינוי", href: "/library/qm/chapter-13/#sub-13.2" },
        { labelHe: "QM · אב-שינוי", href: "/library/qm/chapter-13/#sub-13.1" },
      ],
    },
    // ============================================================ 13.4
    {
      id: "13.4", titleHe: "ניהול שינויים (Management of Changes)", titleEn: "Management of Changes",
      execHe:
        "Management of Changes (MoC) הוא התפיסה-העל המאגדת את כל מנגנוני-ECM לכדי תהליך-ממשל אחד: מבקשה (ECR), דרך הערכת-השפעה ואישור, ועד מימוש (ECO), תיעוד וסגירה. הוא מבטיח ששינויים נעשים בצורה מבוקרת, מאושרת ומתועדת — לאורך כל מחזור-החיים ובכל האובייקטים.",
      beginnerHe:
        "MoC הוא 'התמונה הגדולה' של ניהול-שינויים: לא רק איך עורכים אובייקט, אלא איך כל שינוי עובר תהליך מסודר — מי מבקש, מי בודק השפעה, מי מאשר, מתי נכנס לתוקף, ואיך מתעדים. הוא מחבר את Change Master, Change Record ו-Engineering Record לשיטה אחת.",
      consultantHe:
        "MoC הוא מסגרת-ממשל (governance) המשלבת ECR/ECO, Status Profiles (BS02), Effectivity, ו-workflow (Change/Engineering Records) למחזור-חיים מלא. עקרונות-מפתח: הפרדת-תפקידים (מבקש≠מאשר), הערכת-השפעה (עלות, רגולציה, מלאי, איכות), date-effective implementation, ותיעוד מלא לביקורת. בתעשיות מפוקחות (מזון/תרופות) MoC הוא דרישת-רגולציה (למשל GMP Change Control). טכנית הוא נשען על AENR/AEOI, BS02, ו-Fiori Records.",
      purposeHe:
        "להבטיח ממשל-שינויים: ששום שינוי לא מגיע לייצור ללא הערכת-השפעה, אישור ותיעוד — להגן על איכות, רגולציה ועלות, ולשמר בקרת-תצורה מלאה.",
      processExampleHe:
        "שינוי מוצע נכנס כ-ECR; צוות מעריך השפעה רב-תחומית (QM/PP/רגולציה/עלות); ועדת-שינויים מאשרת; השינוי הופך ל-ECO וממומש תחת Change Master עם Valid-From; לאחר אימות-מימוש ובדיקות, התהליך נסגר ומתועד לביקורת.",
      cbcHe:
        "ב-CBC כל שינוי-מתכון/מפרט עובר MoC רשמי: הערכת-השפעה (אלרגנים, תווית, מלאי-אריזה, עלות-תרכיז), אישור-QA ואישור-רגולציה, מימוש date-effective מתואם עם מעבר-קו, ותיעוד מלא — בדיוק כפי שדורש Change Control בתעשיית-המזון.",
      navHe: [
        "Logistics – General ► Engineering Change Management ► Define Change Types (OS54)",
        "Logistics – General ► Engineering Change Management ► Define Status Profile (BS02)",
        "SAP Fiori Launchpad ► Manage Change Records / Engineering Records",
      ],
      tables: ["AENR", "AEOI", "TJ30", "SCMG_T_CASE_ATTR"],
      tcodes: ["CC01", "CC02", "CC03", "CC31", "BS02", "OS54"],
      fiori: ["F2768", "F4421", "F4422"],
      configHe: [
        "Change Types (OS54) + Status Profiles (BS02) לאכיפת תהליך-אישור.",
        "Effectivity (Date/Parameter) למימוש מתוארך.",
        "workflow דרך Change/Engineering Records להפרדת ECR/ECO ולאישורים.",
        "הפרדת-תפקידים: מבקש ≠ מעריך ≠ מאשר.",
      ],
      flow: [
        { he: "בקשת-שינוי", code: "ECR" },
        { he: "הערכת-השפעה רב-תחומית", note: "QM/PP/Reg/Cost" },
        { he: "אישור ועדת-שינויים", code: "BS02", note: "Status gate" },
        { he: "מימוש מתוארך", code: "ECO", note: "Change Master + Valid-From" },
        { he: "אימות ובדיקות", code: "QP01" },
        { he: "סגירה ותיעוד", note: "Closed / Audit" },
      ],
      mistakesHe: [
        "מימוש שינוי ללא הערכת-השפעה — סיכוני-איכות/רגולציה/עלות בלתי-צפויים.",
        "אותו אדם מבקש ומאשר — כשל-ממשל ופגיעה בביקורתיות.",
        "מימוש לא-מתוארך — שינוי 'קופץ' לכל האצוות במקום מנקודת-תוקף.",
      ],
      troubleshootHe: [
        "שינוי השפיע לא-צפוי על אצוות ➔ Valid-From/effectivity לא הוגדרו נכון.",
        "אישור עקף שלב ➔ Status Profile לא חוסם דילוגים (BS02).",
        "אין תיעוד-החלטה ➔ ה-ECR/הערכת-ההשפעה לא תועדו ב-Change/Engineering Record.",
      ],
      bestPracticeHe: [
        "אכוף הפרדת-תפקידים ושערי-אישור דרך Status Profile.",
        "חייב הערכת-השפעה רב-תחומית לפני אישור.",
        "מַמֵּש תמיד date-effective, מתואם עם מעבר-ייצור/מלאי.",
        "תעד הכל ב-Change/Engineering Record לעמידה ב-Change Control רגולטורי.",
      ],
      interviewHe: [
        { qHe: "מהו Management of Changes ואיך הוא נשען על ECM?", aHe: "מסגרת-ממשל למחזור-חיי שינוי (ECR→הערכה→אישור→ECO→מימוש→סגירה), הנשענת טכנית על Change Master (AENR/AEOI), Status Profiles (BS02), Effectivity ו-workflow (Change/Engineering Records)." },
        { qHe: "מדוע הפרדת-תפקידים קריטית ב-MoC?", aHe: "כדי שמי שמבקש שינוי לא יהיה גם המאשר — שמירה על ביקורתיות, מניעת שינויים לא-מבוקרים ועמידה בדרישות-רגולציה (GMP Change Control)." },
        { qHe: "כיצד MoC תומך ברגולציית-מזון?", aHe: "באמצעות הערכת-השפעה (אלרגנים/מפרט), אישורים מתועדים, מימוש date-effective ושמירת היסטוריה מלאה — כך שכל אצווה ניתנת-לשחזור מול המפרט שהיה בתוקף." },
      ],
      takeawaysHe: [
        "MoC = ממשל-שינויים מלא: ECR→הערכה→אישור→ECO→מימוש→סגירה.",
        "מאגד Change Master, Change/Engineering Records ו-Status Profiles.",
        "עקרונות: הפרדת-תפקידים, הערכת-השפעה, מימוש date-effective, תיעוד.",
        "דרישת-רגולציה בתעשיות מפוקחות (Change Control).",
      ],
      relatedHe: [
        { labelHe: "QM · אב-שינוי", href: "/library/qm/chapter-13/#sub-13.1" },
        { labelHe: "QM · רשומת-שינוי", href: "/library/qm/chapter-13/#sub-13.2" },
        { labelHe: "QM · רשומת-הנדסה", href: "/library/qm/chapter-13/#sub-13.3" },
      ],
    },
    // ============================================================ 13.5
    {
      id: "13.5", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק זה הציג את ניהול-השינויים-ההנדסי (ECM) ככלי-הליבה לבקרת-תצורה ב-QM ומעבר לו. ראינו את אב-השינוי (Change Master) כרשומה הטכנית הנושאת Valid-From, היקף-אובייקטים וסטטוס, ואת מעטפות-התהליך מעליו — Change Record, Engineering Record ו-Engineering Cockpit — המנהלות workflow, אישורים ותיעוד. לבסוף, Management of Changes איגד הכל לממשל-שינויים מלא, חיוני לרגולציה ולאיכות.",
      beginnerHe:
        "לסיכום: ECM מבטיח שכל שינוי הנדסי — במתכון, ב-BOM, בתוכנית-בדיקה — נעשה תחת 'מספר-שינוי' מתוארך ומאושר, עם היסטוריה מלאה. ה-Change Master הוא הטופס; ה-Change/Engineering Record הם התיק והתהליך; ה-Cockpit הוא לוח-המחוונים; ו-MoC הוא השיטה שמחברת הכל לתהליך-ממשל אחד.",
      consultantHe:
        "מבחינה טכנית: AENR/AEOI הן טבלאות-הליבה; BS02 מגדיר Status Profiles; OS54 מגדיר Change Types ו-Number ranges; Effectivity (Date/Parameter) מניע date-effective explosion ב-PLKO/BOM. CC01/CC02/CC03 הם התנועות הקלאסיות, CC31 לניהול היררכי, ו-Fiori (Manage Engineering Changes / Change Records / Engineering Cockpit) הם הממשק המודרני. בתעשיות מפוקחות ECM הוא הבסיס ל-Change Control רגולטורי. ההבחנה החשובה: Change Master = מימוש טכני; Records = מעטפת-תהליך; MoC = ממשל-העל.",
      purposeHe:
        "לקבע את ההבנה ש-ECM אינו 'עריכת-אובייקט' אלא מסגרת-ממשל מתוארכת, מאושרת ומתועדת — שמגינה על איכות, רגולציה, עלות ובקרת-תצורה לאורך כל מחזור-חיי השינוי.",
      processExampleHe:
        "מחזור-חיים שלם: ECR נפתח כ-Change Record ← הערכת-השפעה ואישור (BS02 gates) ← ECO ממומש תחת Change Master (CC01) עם Valid-From ← תוכנית-הבדיקה נערכת ב-QP02 תחת המספר ← מנת-בדיקה מבצעת date-effective explosion ← התהליך נסגר ומתועד ב-ECM Information System לביקורת.",
      cbcHe:
        "ב-CBC: גל שינויי-מתכון רבעוני מנוהל מקצה-לקצה — בקשות ב-Change Records, הערכת-השפעה (אלרגנים/תווית/מלאי/עלות), אישורי-QA ורגולציה, מימוש date-effective מתואם עם מעברי-קו תחת Change Masters, ותיעוד מלא לביקורת-מזון. ה-Engineering Cockpit נותן למנהל-האיכות נראות-על על כל הגל.",
      navHe: [
        "Logistics – General ► Engineering Change Management (סקירת תצורה כוללת)",
        "SAP Fiori Launchpad ► Engineering Cockpit",
      ],
      tables: ["AENR", "AEOI", "TJ30", "PLKO"],
      tcodes: ["CC01", "CC02", "CC03", "CC31", "BS02", "OS54", "QP02"],
      fiori: ["F2768", "F4421", "F4422"],
      configHe: [
        "Change Types (OS54) + Number ranges + Status Profiles (BS02) = תשתית-ECM.",
        "Effectivity (Date/Parameter) = מנוע date-effective explosion.",
        "Fiori Records + Cockpit = שכבת-התהליך והנראות המודרנית.",
      ],
      flow: [
        { he: "בקשה (ECR)", code: "Change Record" },
        { he: "הערכה + אישור", code: "BS02" },
        { he: "מימוש (ECO)", code: "CC01", note: "Change Master + Valid-From" },
        { he: "עריכת-אובייקטים", code: "QP02/CS02" },
        { he: "explosion מתוארך", code: "QP01/MD04" },
        { he: "סגירה + תיעוד", note: "ECM IS / Audit" },
      ],
      mistakesHe: [
        "תפיסת ECM כ'עריכת-אובייקט' בלבד במקום כמסגרת-ממשל — דילוג על אישור/תיעוד.",
        "ערבוב הרבדים: שימוש ב-Change Master ללא Record/MoC בתרחיש מפוקח.",
        "התעלמות מ-Effectivity — מימוש לא-מתוארך הפוגע בבקרת-תצורה.",
      ],
      troubleshootHe: [
        "אובדן יכולת-תחקור 'מה ייצרנו אז' ➔ שינויים בוצעו ללא Change Number/Valid-From.",
        "כשלי-ביקורת רגולטורית ➔ חוסר הפרדת-תפקידים, אישורים או תיעוד ב-Records.",
        "explosion מציג גרסה שגויה ➔ Effectivity/Valid-From לא הוגדרו נכון.",
      ],
      bestPracticeHe: [
        "הבן את שלושת הרבדים: Change Master (טכני), Records (תהליך), MoC (ממשל).",
        "אכוף date-effective implementation ושערי-אישור תמיד.",
        "תעד הכל; השתמש ב-ECM Information System וב-Cockpit לתחקור ולנראות.",
        "בתעשיות מפוקחות — יישר ECM עם דרישות Change Control רגולטוריות.",
      ],
      interviewHe: [
        { qHe: "סכם את שלושת רבדי-ECM.", aHe: "Change Master = הרשומה הטכנית (AENR/AEOI, Valid-From, אובייקטים); Change/Engineering Record = מעטפת-התהליך (workflow, ECR/ECO, אישורים, מסמכים); Management of Changes = ממשל-העל המאגד הכל למחזור-חיים מבוקר." },
        { qHe: "מהו המאפיין שהופך את ECM ל'בקרת-תצורה'?", aHe: "ה-Valid-From וה-Effectivity המאפשרים date-effective explosion ושמירת היסטוריה — היכולת לשחזר מה היה תקף בכל תאריך." },
        { qHe: "אילו תנועות/אפליקציות הן הליבה של ECM?", aHe: "קלאסי: CC01/CC02/CC03, CC31, BS02, OS54; מודרני (Fiori): Manage Engineering Changes, Manage Change Records, Engineering Cockpit." },
      ],
      takeawaysHe: [
        "ECM = בקרת-תצורה מתוארכת, מאושרת ומתועדת — לא רק עריכת-אובייקט.",
        "שלושה רבדים: Change Master (טכני) · Records (תהליך) · MoC (ממשל).",
        "ליבה טכנית: AENR/AEOI, BS02, OS54, Effectivity; ממשק: CC0x/CC31 + Fiori.",
        "חיוני לאיכות, לרגולציה (Change Control) ולתחקור-אצוות ב-QM.",
      ],
      relatedHe: [
        { labelHe: "QM · אב-שינוי", href: "/library/qm/chapter-13/#sub-13.1" },
        { labelHe: "QM · ניהול שינויים (MoC)", href: "/library/qm/chapter-13/#sub-13.4" },
        { labelHe: "PP · BOM עם דרישת-היסטוריה (3.2.4)", href: "/library/pp/chapter-03/#sub-3.2.4" },
      ],
    },
  ],
};
