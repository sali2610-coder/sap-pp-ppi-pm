// ===== PM Digital Textbook — Chapter 7 (Academy Template, gold-standard) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved from pm-toc.json key "7"; SAP identifiers verbatim.
import type { TextbookChapter } from "./types";

export const CH7: TextbookChapter = {
  n: 7,
  titleHe: "הגדרת תהליכים עסקיים נוספים",
  titleEn: "Configuring Additional Business Processes",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לקונפיגורציה של תהליכים עסקיים מתקדמים בתחזוקה (Plant Maintenance) ב-SAP S/4HANA Asset Management. בעוד הפרקים הקודמים בנו את התשתית — אובייקטים טכניים, הודעות, פקודות-עבודה, תוכניות-תחזוקה — פרק זה מוסיף תהליכים שלמים שכל ארגון-תחזוקה רציני נדרש להם: עיבוד-חיצוני (External Processing) של תיקונים אצל קבלן, שיקום (Refurbishment) של חלפים בני-תיקון, מיקור-חוץ (Subcontracting) של ציוד שנשלח החוצה, כיול (Calibration) של ציוד-מדידה בצימוד PM/QM, ניהול מאגר-נכסים (Pool Asset Management), Maintenance Event Builder לתכנון מקבצי-עבודה, דוחות-משמרת ורשימות-תיוג (Checklists), ולבסוף מודל-השלבים (Phase Model) החדש למחזור-חיי פקודת-העבודה. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC (מפעל בקבוק של קוקה-קולה), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי-קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את הנושא במלואו ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 7.1
    {
      id: "7.1", titleHe: "עיבוד חיצוני (External Processing)", titleEn: "External Processing",
      execHe:
        "עיבוד-חיצוני הוא הפניית עבודת-תחזוקה לגורם חוץ. בתחזוקה משקלו עצום — בסקר בקבוצת-המשתמשים הדוברת-גרמנית כמחצית מעלויות-התחזוקה נובעות מעיבוד-חיצוני, ויש ארגונים ללא בית-מלאכה פנימי כלל. השליטה בכל סוגי העיבוד-החיצוני נעשית דרך Control Key בפעולת ה-Routing/הפקודה, ולכן ההבחנה בין Control Keys היא לב הנושא.",
      beginnerHe:
        "כשאין לך עובד או כלי לבצע משימה, אתה שולח אותה החוצה. SAP צריך לדעת איזה סוג של 'שליחה החוצה' זה: האם זה מרכז-עבודה של חברה חיצונית שמתנהג כמו פנימי, האם זו הזמנת-רכש בודדת לעבודה, או האם זו מפרט-שירותים מפורט. ההבדל ביניהם נקבע דרך מפתח-בקרה (Control Key) אחד שמצורף לפעולה.",
      consultantHe:
        "שלוש תצורות עיקריות נבדלות בשני שדות ב-Control Key — Ext. Processing ו-Service: (1) PM01 = מרכז-עבודה לחברה חיצונית, Ext.Processing='Internally processed operation', Service ריק — מתנהג כמו עיבוד-פנימי עם הזמנה-פנימית; (2) PM02 = הזמנת-רכש בודדת, Ext.Processing='Externally processed operation', Service ריק; (3) PM03 = מפרט-שירותים, Ext.Processing='Externally', Service מסומן. ה-Control Key נשלט ב-Maintain Control Keys (Chapter 2). פרופיל-העיבוד-החיצוני (ExternProfile) משותף לכל הסוגים — SAP אינה מבחינה ביניהם בנקודה זו.",
      purposeHe:
        "לאפשר תכנון, רכש, קבלת-שירות ובקרת-עלות לעבודה שמבוצעת בידי קבלן, מתוך פקודת-התחזוקה עצמה ובאינטגרציה מלאה ל-MM ו-FI/CO — דרישת-רכש נוצרת אוטומטית, קבלת-השירות מזרימה עלות בפועל לפקודה, וההפרש מחשבונית מתקן את העלות.",
      processExampleHe:
        "מתכנן-התחזוקה מתכנן פעולת-עיבוד-חיצוני בפקודה; ברקע נוצרת דרישת-רכש; הרכש ממיר אותה להזמנת-רכש לספק; הקבלן מבצע; קבלת-השירות (Goods Receipt/Service Entry Sheet) מזרימה עלות בפועל; חשבונית-הספק חותמת את התהליך ומתקנת עלויות אם הסכום שונה.",
      cbcHe:
        "ב-CBC: כיול מנוע חיצוני, תיקון רובוט-מילוי אצל היצרן, או ניקוי-מיכל בידי קבלן מורשה — כולם פעולות-עיבוד-חיצוני בפקודת-התחזוקה. תיקון-מנוע פשוט = PM02 (הזמנה בודדת); חוזה-שירות שנתי עם פירוט-עבודות = PM03 (מפרט-שירותים).",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists, and PRTs ► Work Centers ► Task List Data ► Maintain Control Keys",
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Procurement ► Create Default Value Profiles for External Procurement",
      ],
      tables: ["AFVC", "AUFK", "AFKO", "EBAN", "EKKO", "T399X"],
      tcodes: ["IW31", "IW32", "ME57", "ME21N", "MIGO", "OPL8"],
      fiori: ["F2175", "F4604"],
      configHe: [
        "Maintain Control Keys: PM01/PM02/PM03 לפי שדות Ext. Processing ו-Service.",
        "Create Default Value Profiles for External Procurement: ברירות-מחדל ל-Cost element, Purchasing organization, Purchasing group, Material group.",
        "Default Values for Task List Data and Profile Assignments: שיוך פרופיל לכל Order Type+Plant (אפשר * למיסוך).",
        "Define Collective Purchase Requisition and MRP Relevance: CollReqstn, Res/PurRq (1/2/3), Net Order Price — משותף לכל סוגי העיבוד-החיצוני.",
      ],
      flow: [
        { he: "תכנון פעולה חיצונית", code: "IW32", note: "Control Key PM02/PM03" },
        { he: "דרישת-רכש אוטומטית", code: "EBAN" },
        { he: "המרה להזמנת-רכש", code: "ME21N" },
        { he: "קבלת-שירות/טובין", code: "MIGO", note: "עלות בפועל לפקודה" },
        { he: "אימות-חשבונית", code: "MIRO", note: "תיקון-עלות" },
      ],
      masterDataHe: [
        "Control Key בפעולה (AFVC-STEUS) קובע את אופי העיבוד-החיצוני.",
        "ExternProfile (ברמת Order Type+Plant) מזין ערכי-ברירת-מחדל לדרישת-הרכש.",
      ],
      mistakesHe: [
        "סימון Service בטעות ב-PM02 — נוצר מפרט-שירותים מיותר במקום הזמנה בודדת.",
        "השארת Confirmation מאופשר — עובד פנימי כותב שעות לאותה פעולה חיצונית.",
        "אי-סימון Cost — עלויות העיבוד-החיצוני אינן נכנסות לתמחיר-הפקודה.",
        "שכחת שיוך ExternProfile ל-Order Type/Plant — דרישת-הרכש נוצרת ללא Cost element/ארגון-רכש.",
      ],
      troubleshootHe: [
        "דרישת-רכש לא נוצרת ➔ Res/PurRq=1 (Never) או Control Key שגוי.",
        "עלות לא מוזרמת לפקודה ➔ Cost indicator לא מסומן או GR לא-מוערך.",
        "ריבוי דרישות-רכש לאותה פקודה ➔ CollReqstn לא מסומן.",
        "מחיר משתנה בהזמנת-הרכש ➔ Net Order Price לא נכפה.",
      ],
      bestPracticeHe: [
        "הגדר Control Keys ייעודיים (PM01/02/03) ותעד מתי כל אחד.",
        "צור פרופיל-עיבוד-חיצוני אחיד והקצה דרך מיסוך-* כדי לחסוך תחזוקה.",
        "סמן Confirmation='not possible' לפעולות חיצוניות למניעת רישום-שעות פנימי.",
        "החלט מראש GR מוערך מול לא-מוערך לפי דרישת בקרת-העלות.",
      ],
      interviewHe: [
        { qHe: "כיצד יוזמים עיבוד-חיצוני ב-SAP?", aHe: "באמצעות Control Key בפעולה — השדות Ext. Processing ו-Service קובעים את אחד משלושת הסוגים (מרכז-עבודה חיצוני / הזמנה בודדת / מפרט-שירותים)." },
        { qHe: "מה ההבדל בין PM02 ל-PM03?", aHe: "PM02 = הזמנת-רכש בודדת, Service ריק; PM03 = מפרט-שירותים, Service מסומן — מאפשר Service Entry Sheet ופריטים לא-מתוכננים." },
        { qHe: "מתי עלות בפועל נכנסת לפקודה בעיבוד-חיצוני?", aHe: "בקבלת-השירות (GR/Service Entry Sheet) אם ה-GR מוערך; חשבונית מתקנת בהמשך הפרשים." },
      ],
      takeawaysHe: [
        "עיבוד-חיצוני = כמחצית מעלויות-התחזוקה; Control Key הוא הלב.",
        "שלושה סוגים: מרכז-חיצוני (PM01), הזמנה בודדת (PM02), מפרט-שירותים (PM03).",
        "פרופיל-עיבוד-חיצוני ו-MRP Relevance משותפים לכל הסוגים.",
        "אינטגרציה מלאה: פקודה → דרישת-רכש → הזמנה → GR → חשבונית.",
      ],
      relatedHe: [
        { labelHe: "PM · פקודות-תחזוקה (5.2)", href: "/library/pm/chapter-05/#sub-5.2" },
        { labelHe: "PM · מרכזי-עבודה (2.4)", href: "/library/pm/chapter-02/#sub-2.4" },
        { labelHe: "אובייקט · AFVC", href: "/library/pm/object/AFVC/" },
      ],
      children: [
        {
          id: "7.1.1", titleHe: "עיבוד חיצוני כהזמנת-רכש בודדת", titleEn: "External Processing as an Individual Purchase Order",
          execHe: "הצורה הפשוטה של עיבוד-חיצוני: תכנון בפקודה יוצר דרישת-רכש שמומרת להזמנת-רכש בודדת (Individual PO). הקבלן מבצע, מזינים קבלת-שירות כ-Goods Receipt על הזמנת-הרכש, וחשבונית חותמת. השירות מתואר בטקסט-הפריט בהזמנה, בלי מפרט-שירותים מפורט.",
          beginnerHe: "שולחים עבודה החוצה בעזרת הזמנת-רכש 'רגילה'. SAP יוצר את הבקשה אוטומטית מתוך הפקודה; הרכש הופך אותה להזמנה; כשהעבודה הסתיימה רושמים 'קבלת-טובין' מול ההזמנה — וזה מזרים את העלות לפקודה.",
          consultantHe: "ה-Control Key חייב: Ext. Processing='Externally processed operation', Cost מסומן (עלות נכנסת לתמחיר), Confirmation='Confirmation not possible', Service ריק (כדי שלא ייווצר מפרט-שירותים). Sched.Ext.Op. אופציונלי אם מזמינים על בסיס-שעות ורוצים לכלול בתזמון-הפקודה. אם ה-GR מוערך — עלות בפועל נרשמת בקבלה; הפרש-חשבונית מתקן אוטומטית לעלות-נטו.",
          purposeHe: "לאפשר תיקון/שירות חיצוני פשוט ללא ניהול-שירותים מפורט — מתאים לעבודות חד-פעמיות שבהן תיאור-טקסט ומחיר-כולל מספיקים.",
          processExampleHe: "פעולה 0010 בפקודה 901760 = 'תיקון-מנוע אצל Miller Inc.'. תכנון יוצר דרישת-רכש → הרכש ממיר להזמנה → המנוע תוקן → GR מזרים עלות בפועל לפקודה → חשבונית-הספק חותמת ומתקנת הפרשים.",
          cbcHe: "ב-CBC: תיקון משאבת-CO2 חד-פעמי אצל ספק — Control Key PM02, GR מוערך כך שעלות-התיקון נרשמת מיד בפקודת-התחזוקה של מערכת-הקרבונציה.",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists, and PRTs ► Work Centers ► Task List Data ► Maintain Control Keys", "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Procurement ► Create Default Value Profiles for External Procurement"],
          tables: ["AFVC", "EBAN", "EKPO", "T399X"],
          tcodes: ["IW32", "ME21N", "MIGO", "MIRO"],
          fiori: ["F2175"],
          configHe: [
            "Control Key: Ext.Processing='Externally processed operation', Cost=✓, Confirmation='not possible', Service= ריק, Sched.Ext.Op.= לפי-צורך.",
            "Default Value Profile for External Procurement: Cost element + ארגון-רכש + קבוצת-רכש + קבוצת-חומר.",
            "Define Collective Purchase Requisition and MRP Relevance: Res/PurRq, CollReqstn, Net Order Price.",
          ],
          mistakesHe: ["סימון Service ➔ נוצר מפרט-שירותים במקום הזמנה בודדת.", "Cost לא מסומן ➔ עלות לא בתמחיר.", "Confirmation מאופשר ➔ שעות-פנים מתערבבות."],
          troubleshootHe: ["עלות לא בפקודה ➔ GR לא-מוערך או Cost לא מסומן.", "אין דרישת-רכש ➔ Res/PurRq=1 או Control Key שגוי."],
          bestPracticeHe: ["סמן GR מוערך לקבלת עלות-בפועל מוקדמת.", "השתמש ב-Net Order Price כדי לקבע מחיר מדרישה להזמנה."],
          interviewHe: [
            { qHe: "כיצד מאשרים עבודה חיצונית בהזמנה בודדת?", aHe: "לא דרך אישור-זמן רגיל אלא דרך קבלת-שירות כ-Goods Receipt מול הזמנת-הרכש." },
            { qHe: "אילו דגלים חובה ב-Control Key?", aHe: "Externally processed operation, Cost, ו-Confirmation='not possible'; Service חייב להישאר ריק." },
          ],
          takeawaysHe: ["הזמנה בודדת = הצורה הפשוטה; תיאור בטקסט-הפריט.", "אישור = GR ולא Time Confirmation.", "GR מוערך מזרים עלות מיד."],
          relatedHe: [{ labelHe: "אובייקט · EBAN", href: "/library/pm/object/EBAN/" }],
        },
        {
          id: "7.1.2", titleHe: "עיבוד חיצוני עם מפרט-שירותים", titleEn: "External Processing with Service Specifications",
          execHe: "כאן השירותים אינם מתוארים בטקסט בלבד אלא מפורטים פריט-פריט במפרט-שירותים (Service Specification). מאפשר מגבלות לשירות-מתוכנן ולא-מתוכנן, Service Entry Sheet במקום GR, והוספת פריטים לא-מתוכננים — בכפוף ל-Service Acceptance (עיקרון ארבע-עיניים).",
          beginnerHe: "במקום לכתוב 'תיקון כללי' בשורה אחת, מפרטים כל עבודה בנפרד עם מחיר: 'החלפת-מיסב X', 'יישור-ציר Y'. בסיום מזינים 'גיליון-קבלת-שירות' (Service Entry Sheet) שאפשר להוסיף בו עבודות שלא תוכננו, ואז אדם שני מאשר.",
          consultantHe: "ה-Control Key: Ext.Processing='Externally', Service מסומן (מאפשר מפרט-שירותים), Cost מסומן, Print מסומן (הדפסת SES), Confirmation='not possible'. נדרש Service Master עם Service Category (AS01/AS02/AS03) ו-Account Category Reference (ARef) לקביעת-חשבון אוטומטית. ה-SES מאפשר פריטים לא-מתוכננים ומחייב Service Acceptance לשחרור לחשבונית.",
          purposeHe: "לנהל עבודות-קבלן מורכבות עם פירוט-עלות, מגבלות-תקציב לשירות-לא-מתוכנן, ובקרת-ארבע-עיניים — נדרש בחוזי-שירות גדולים ובמכרזים.",
          processExampleHe: "קביעת-דרישה בפקודה → מכרז → הצעות → בחירת-ספק → הזמנה → ביצוע → Service Entry → Service Acceptance → אימות-חשבונית. כל שלב מתועד, ופריטים לא-מתוכננים מתווספים ב-SES בכפוף-למגבלה.",
          cbcHe: "ב-CBC: חוזה-שירות שנתי לתחזוקת קו-המילוי עם פירוט-עבודות (סיכה, יישור, החלפת-חלקים) — מפרט-שירותים מאפשר מגבלת-תקציב לעבודות-חירום לא-מתוכננות.",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance Plans, Work Centers, Task Lists, and PRTs ► Work Centers ► Task List Data ► Maintain Control Keys", "Materials Management ► External Services Management ► Service Master ► Define Service Category"],
          tables: ["ASMD", "ESLL", "ESSR", "T399X"],
          tcodes: ["IW32", "AC01", "ML81N", "ME21N"],
          fiori: ["F2175"],
          configHe: [
            "Control Key: Ext.Processing='Externally', Service=✓, Cost=✓, Print=✓, Confirmation='not possible', Sched.Ext.Op.= לפי-צורך.",
            "Define Service Category: AS01 (Basic), AS02 (+Controlling), AS03 (+Purchasing) — קובע מסכים, בחירת-שדה, הקצאת-מספר.",
            "Define Organizational Status for Service Categories: סטטוס-ארגוני (לדוגמה AS03) + ARef לקביעת-חשבון.",
            "Define Attributes of System Messages: אופן-פלט הודעות SES (שגיאה/אזהרה).",
          ],
          mistakesHe: ["שכחת Service indicator ➔ אי-יצירת מפרט-שירותים.", "ARef שגוי ➔ קביעת-חשבון אוטומטית כושלת.", "דילוג על Service Acceptance ➔ שירות לא משתחרר לחשבונית."],
          troubleshootHe: ["לא ניתן ליצור SES ➔ Service indicator לא מסומן.", "חשבונית חסומה ➔ חסר Service Acceptance (ארבע-עיניים).", "Service Master לא נשמר ➔ Service Category/ARef חסר."],
          bestPracticeHe: ["הגדר Service Categories מובנות (AS01–AS03) לפי עומק-הנתונים.", "אכוף Service Acceptance למניעת תשלום ללא-בקרה.", "השתמש במגבלות לשירות-לא-מתוכנן לשמירת-תקציב."],
          interviewHe: [
            { qHe: "מהו Service Entry Sheet ומדוע הוא שונה מ-GR?", aHe: "SES מתעד את השירותים שבוצעו לפי מפרט-השירותים; בניגוד ל-GR הוא מאפשר הוספת פריטים לא-מתוכננים ומחייב Service Acceptance." },
            { qHe: "מהו Service Category?", aHe: "מקביל ל-Material Type עבור Service Master — קובע מסכים, בחירת-שדה, הקצאת-מספר ו-ARef; AS01/AS02/AS03." },
          ],
          takeawaysHe: ["מפרט-שירותים = פירוט פריט-פריט עם מגבלות.", "SES מחליף GR ומאפשר לא-מתוכנן.", "Service Acceptance = בקרת-ארבע-עיניים."],
          relatedHe: [{ labelHe: "אובייקט · ESLL", href: "/library/pm/object/ESLL/" }],
        },
      ],
    },
    // ============================================================ 7.2
    {
      id: "7.2", titleHe: "שיקום חלפים (Refurbishment)", titleEn: "Refurbishment",
      execHe:
        "שיקום הוא תהליך שבו חלפים בני-תיקון (Repairable Spares) מוחזקים במלאי ומשוקמים — מוחזרים למצב-תקין — בידי כוח-אדם פנימי או חיצוני. החלף נושא ערכים-חשבונאיים שונים לפי מצבו (חדש/תקין/פגום), ולכן השיקום נשען על הערכה-מפוצלת (Split Valuation). זהו תהליך-מפתח לצמצום-עלויות בארגון עתיר-נכסים.",
      beginnerHe:
        "במקום לזרוק רכיב יקר שהתקלקל ולקנות חדש, שומרים אותו במלאי בסטטוס 'פגום', מתקנים אותו, ומחזירים למלאי בסטטוס 'תקין'. אותו מספר-חומר, אבל בשלושה מצבים בעלי ערך שונה: כמו-חדש, משוקם, פגום. SAP מנהל את שלושת המצבים תחת חומר אחד בעזרת 'הערכה-מפוצלת'.",
      consultantHe:
        "מנגנון-הליבה: Split Valuation עם Valuation Category C (Condition) ו-Valuation Types C1 (Like new), C2 (Refurbished/operational), C3 (Faulty). תהליך-השיקום מבוצע דרך Refurbishment Order (סוג-פקודה ייעודי) עם Settlement על מספר-חומר. ב-S/4HANA אפשר ליצור פקודות-שיקום גם ב-MRP (MD04) דרך Spare Part Class Code. בסיס: הפעלת Split Valuation (OMW0) והגדרתה (OMWC) — Global Types, Global Categories, Local Definitions.",
      purposeHe:
        "להבטיח זמינות מיידית של רכיבים קריטיים ויקרי-ערך לנכס, לחסוך רכש-חדש, ולנהל נכון את הערך-החשבונאי של החלף לאורך מחזור-חיי השיקום.",
      processExampleHe:
        "רכש חלף בן-תיקון → התקנה בנכס → כשל → הוצאת-פגום והחזרתו למלאי (C3) → צבירת-פגומים מגיעה לסף → יצירת Refurbishment Order → משיכה מהמלאי → שיקום (אישורים/GR/SES) → GR למלאי כתקין (C2) → או גריטה אם לא ניתן לשקם.",
      cbcHe:
        "ב-CBC: משאבות, מנועים וראשי-מילוי הם חלפים בני-תיקון יקרים. משאבה פגומה (C3, $700) משוקמת בפקודת-שיקום ומוחזרת כתקינה (C2, $2,500); כך מובטחת זמינות-מיידית לקו-המילוי בלי לקנות משאבה חדשה (C1, $3,000).",
      navHe: [
        "Materials Management ► Valuation and Account Assignment ► Split Valuation ► Activate Split Valuation (OMW0)",
        "Materials Management ► Valuation and Account Assignment ► Split Valuation ► Configure Split Valuation (OMWC)",
      ],
      tables: ["MBEW", "MARC", "AUFK", "T156", "EQUI"],
      tcodes: ["IW81", "OMW0", "OMWC", "MD04", "MM01"],
      fiori: ["F2175"],
      configHe: [
        "Activate Split Valuation (OMW0): סימון 'Split material valuation active'.",
        "Configure Split Valuation (OMWC): Global Types (C1/C2/C3, Int.POs=2 לפקודות-שיקום), Global Categories (C=Condition), Local Definitions לכל מפעל.",
        "Refurbishment Order Type עם Settlement Profile על מספר-חומר.",
        "Spare Part Class Code (2 עם CMM / 6 בלי CMM) באב-החומר לאפשר המרת תוכנית-מתוכננת לפקודת-שיקום.",
      ],
      flow: [
        { he: "כשל חלף בנכס", code: "C3", note: "פגום למלאי" },
        { he: "סף-פגומים מושג", code: "MD04" },
        { he: "פקודת-שיקום", code: "IW81" },
        { he: "ביצוע-שיקום", code: "GR/SES" },
        { he: "החזרה כתקין", code: "C2", note: "ערך גבוה יותר" },
      ],
      masterDataHe: [
        "MBEW = ערך לפי Valuation Type (C1/C2/C3) · MARC = Spare Part Class Code.",
        "Valuation Category C באב-החומר ברמת Accounting/Plant.",
      ],
      mistakesHe: [
        "אי-הפעלת Split Valuation ➔ אי-אפשר לנהל ערכים שונים למצבים.",
        "Int. POs ≠ 2 ב-Valuation Type ➔ לא ניתן להשתמש בו בפקודת-שיקום.",
        "Settlement Profile רגיל לפקודת-שיקום ➔ אי-אפשר Settle על מספר-חומר.",
        "Spare Part Class Code חסר ➔ MRP לא ימיר תוכנית-מתוכננת לפקודת-שיקום.",
      ],
      troubleshootHe: [
        "אי-אפשר להזין Valuation Type בפקודה ➔ Int.POs לא הוגדר 2 (Allowed).",
        "פקודה לא מתחשבנת על חומר ➔ Settlement Profile ללא Material כ-Receiver.",
        "MD04 לא מציע פקודת-שיקום ➔ Business Functions או Spare Part Class Code חסרים.",
      ],
      bestPracticeHe: [
        "עבוד בסדר OMWC: Global Types → Global Categories → Local Definitions.",
        "הגדר Valuation Types ברורים (C1/C2/C3) ותעד את משמעות-הערכים.",
        "נהל חלפים-קריטיים יקרים כבני-תיקון לחיסכון משמעותי.",
        "השתמש בסידוריזציה (Serial Numbers) לחלפים יחידניים יקרי-ערך.",
      ],
      interviewHe: [
        { qHe: "מהי הערכה-מפוצלת ולמה היא חיונית לשיקום?", aHe: "Split Valuation מנהל ערכים-חשבונאיים שונים לאותו חומר לפי מצב (Valuation Type C1/C2/C3); חיונית כי חלף-תקין שווה יותר מפגום, וצריך לשקף זאת במלאי." },
        { qHe: "במה שונה Settlement Profile של פקודת-שיקום?", aHe: "ה-Material חייב להיות Valid Receiver (Settlement Optional=1) ו-Default Object Type='MAT', כדי שהעלות תיזקף חזרה למספר-החומר." },
        { qHe: "כיצד מאפשרים פקודת-שיקום מ-MRP?", aHe: "הפעלת Business Functions (LOG_EAM_ROTSUB ועוד) והקצאת Spare Part Class Code (2/6) באב-החומר; אז MD04 ממיר תוכנית-מתוכננת לפקודת-שיקום." },
      ],
      takeawaysHe: [
        "שיקום = החזרת חלף-פגום למצב-תקין במקום רכש-חדש.",
        "נשען על Split Valuation: Category C, Types C1/C2/C3.",
        "פקודת-שיקום ייעודית מתחשבנת על מספר-חומר.",
        "ב-S/4HANA אפשר ליצור פקודות-שיקום גם דרך MRP.",
      ],
      relatedHe: [
        { labelHe: "PM · חומרים והרכבות (4.7)", href: "/library/pm/chapter-04/#sub-4.7" },
        { labelHe: "PM · פקודות-תחזוקה (5.2)", href: "/library/pm/chapter-05/#sub-5.2" },
        { labelHe: "אובייקט · MBEW", href: "/library/pm/object/MBEW/" },
      ],
      children: [
        {
          id: "7.2.1", titleHe: "אב-החומר (Material Master)", titleEn: "Material Master",
          execHe: "אב-החומר של החלף בן-התיקון מוגדר עם Valuation Category C (Condition) ברמת-המפעל ומספר Valuation Types (C1/C2/C3) הנושאים ערכים שונים. זהו הבסיס לכל תהליך-השיקום — בלי הערכה-מפוצלת אין ניהול-מצבים.",
          beginnerHe: "מגדירים את החומר כך ש-SAP יידע לנהל לו שלושה 'מחירים' לפי מצב: כמו-חדש, משוקם, פגום. עושים זאת על-ידי בחירת 'קטגוריית-הערכה' C והגדרת שלושה 'סוגי-הערכה' תחתיה.",
          consultantHe: "תחילה מפעילים Split Valuation גלובלית (OMW0), אז מגדירים (OMWC): Global Valuation Types (C1=Like new, C2=Refurbished, C3=Faulty; חובה Int.POs=2 כדי שיותרו בפקודות-שיקום), Global Valuation Categories (C=Condition), ולבסוף Local Definitions — הפעלת-הקטגוריה למפעל יוצרת אוטומטית את ה-Local Valuation Types. דוגמת-ערכים: C1 $3,000, C2 $2,500, C3 $700.",
          purposeHe: "לשקף נכון את הערך-החשבונאי של החלף בכל מצב לאורך מחזור-השיקום, ולאפשר רישומי-מלאי תקפים בכל מעבר-מצב.",
          processExampleHe: "יצירת אב-חומר עם Valuation Category C; הוצאת-חלף-פגום נרשמת ב-C3 ($700); לאחר שיקום ה-GR למלאי נרשם ב-C2 ($2,500) — ההפרש משקף את הערך שנוסף.",
          cbcHe: "ב-CBC: משאבת-מילוי מנוהלת כחומר עם Valuation Category C; הוצאתה כפגומה ב-C3 והחזרתה כמשוקמת ב-C2 משקפות נכון את ערך-המלאי של מחסן-החלפים.",
          navHe: ["Materials Management ► Valuation and Account Assignment ► Split Valuation ► Activate Split Valuation (OMW0)", "Materials Management ► Valuation and Account Assignment ► Split Valuation ► Configure Split Valuation (OMWC)"],
          tables: ["MBEW", "T149", "T149C", "MARC"],
          tcodes: ["OMW0", "OMWC", "MM01", "MM02"],
          fiori: ["F1602A"],
          configHe: [
            "OMW0: הפעלת 'Split material valuation active'.",
            "OMWC Global Types: C1/C2/C3, Ext.POs ו-Int.POs (Int.POs=2 לפקודות-שיקום).",
            "OMWC Global Categories: C=Condition + שיוך Types↔Cat.",
            "OMWC Local Definitions: הפעלת-קטגוריה למפעל (Cats→OU) — יוצרת Local Types אוטומטית.",
          ],
          mistakesHe: ["Int.POs ≠ 2 ➔ ה-Type לא זמין לפקודת-שיקום.", "אי-הפעלת Local Definitions ➔ אין Valuation Types במפעל.", "ערכים לא-מעודכנים ל-C1/C2/C3 ➔ ערך-מלאי שגוי."],
          troubleshootHe: ["אין Valuation Type בבחירה ➔ Local Definitions לא הופעלו למפעל.", "שגיאת-ערך בקבלה ➔ ערך לא-מתוחזק ל-Valuation Type."],
          bestPracticeHe: ["עבוד בסדר Global Types → Global Categories → Local Definitions.", "תחזק ערכים מעודכנים לכל Valuation Type.", "הגבל Split Valuation לחלפים יקרים בלבד."],
          interviewHe: [
            { qHe: "מהם C1/C2/C3?", aHe: "Valuation Types תחת Category C: C1=כמו-חדש, C2=משוקם/תקין, C3=פגום — נושאים ערכים-חשבונאיים שונים." },
            { qHe: "מה מאפשר Int.POs=2?", aHe: "מתיר את ה-Valuation Type לשימוש בפקודות-שיקום (Internal POs)." },
          ],
          takeawaysHe: ["Valuation Category C + Types C1/C2/C3 = בסיס-השיקום.", "Int.POs=2 חובה לפקודת-שיקום.", "Local Definitions יוצרות את ה-Types למפעל."],
          relatedHe: [{ labelHe: "אובייקט · MBEW", href: "/library/pm/object/MBEW/" }],
        },
        {
          id: "7.2.2", titleHe: "הודעות-שיקום (Refurbishment Notifications)", titleEn: "Refurbishment Notifications",
          execHe: "הודעת-שיקום אופציונלית המשמשת ליזום תהליך-השיקום או להבטחת היסטוריה-מלאה. ההגדרות זהות כמעט להודעות רגילות (Chapter 5), פרט ל-ScrnType Object שחייב לכלול מספר-חומר — תהליך-השיקום תמיד מתייחס לחומר.",
          beginnerHe: "כמו כל הודעת-תקלה, אבל לשיקום: מתעדים שצריך לשקם חלף. זה לא חובה, אבל עוזר לתיעוד מלא ולפתיחת התהליך בצורה מסודרת. ההבדל היחיד — המסך מציג מספר-חומר במקום ציוד.",
          consultantHe: "מומלץ Notification Type נפרד להבחנה ולבקרה. ב-Overview of Notification Type → Screen Areas in Notification Header: Screen Type Hdr='H100' (Header maintenance notification); ScrnType Object='O130' (serial number + material number + device ID) — כי השיקום מתייחס למספר-חומר. שאר ההגדרות כמו הודעות רגילות.",
          purposeHe: "לתעד את פעולות-מחלקת-התחזוקה בשיקום, להבטיח היסטוריה-מלאה, ולשמש טריגר-ראשון מסודר לתהליך כאשר הארגון מחייב הודעה לפני פקודה.",
          processExampleHe: "פותחים הודעת-שיקום (סוג ייעודי) עם מספר-החומר של המשאבה הפגומה; ההודעה מתעדת ומזניקה את פקודת-השיקום; ההיסטוריה נשמרת לתחקור עתידי.",
          cbcHe: "ב-CBC: כל החזרת-משאבה פגומה למחסן פותחת הודעת-שיקום ייעודית עם מספר-החומר — כך נשמרת היסטוריית-תקלות מלאה לכל דגם-משאבה.",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Notifications ► Overview of Notification Types ► Subfunction Screen Areas in Notification Header"],
          tables: ["QMEL", "TQ80", "T356"],
          tcodes: ["IW21", "IW22", "OION"],
          fiori: ["F4072"],
          configHe: [
            "Notification Type נפרד לשיקום.",
            "Screen Type Hdr='H100' (Header maintenance notification).",
            "ScrnType Object='O130' (serial + material + device) — חובה למספר-חומר.",
          ],
          mistakesHe: ["ScrnType Object ללא מספר-חומר ➔ לא ניתן לקשר את ההודעה לחומר-השיקום.", "שימוש בסוג-הודעה רגיל ➔ ערבוב עם הודעות-תקלה אחרות."],
          troubleshootHe: ["אין שדה מספר-חומר בהודעה ➔ ScrnType Object שגוי (לא O130).", "אי-אפשר להבחין בהודעות-שיקום ➔ לא הוגדר סוג נפרד."],
          bestPracticeHe: ["הגדר Notification Type ייעודי לשיקום.", "ודא ScrnType Object='O130' לקישור-חומר.", "השתמש בהודעות גם כשהן אופציונליות — לשם היסטוריה."],
          interviewHe: [
            { qHe: "מהו ההבדל היחיד בהגדרת הודעת-שיקום?", aHe: "ScrnType Object חייב לכלול מספר-חומר (O130), כי השיקום תמיד מתייחס לחומר; שאר ההגדרות כמו הודעה רגילה." },
            { qHe: "האם הודעת-שיקום חובה?", aHe: "לא — היא אופציונלית; משמשת ליזום-התהליך או להבטחת היסטוריה-מלאה." },
          ],
          takeawaysHe: ["הודעת-שיקום אופציונלית; סוג נפרד מומלץ.", "Screen Type Hdr=H100, ScrnType Object=O130.", "ההודעה תמיד מתייחסת למספר-חומר."],
          relatedHe: [{ labelHe: "PM · הודעות (5.1)", href: "/library/pm/chapter-05/#sub-5.1" }],
        },
        {
          id: "7.2.3", titleHe: "פקודות-שיקום (Refurbishment Orders)", titleEn: "Refurbishment Orders",
          execHe: "פקודת-השיקום היא סוג-פקודה ייעודי שלא ניתן לשמש לתחזוקה רגילה ולהיפך. ייחודה ב-Settlement Profile המתחשבן על מספר-חומר ובסימון Order Type כ-Refurbishment. נדרשת התייעצות בין-מחלקתית על שמות וטווחי-מספרים.",
          beginnerHe: "פקודה מיוחדת לשיקום בלבד. כל מה שמיוחד בה: כשהיא נסגרת, העלות 'חוזרת' למספר-החומר (לא למרכז-עלות), ו-SAP מסומן לדעת שזו פקודת-שיקום.",
          consultantHe: "Configure Order Types (OIDA): Settlement Profile שונה מרגיל — Material כ-Valid Receiver (Settlement Optional=1), Default Object Type='MAT'. Indicate Order Types for Refurbishment Processing: סימון הסוג כשיקום (חוסם שימוש רגיל). Assign Notification Types to Order Types: הצעת סוג-פקודת-שיקום מסוג-הודעת-שיקום. שאר ההגדרות כמו פקודות רגילות (Chapter 5).",
          purposeHe: "לבודד את תהליך-השיקום מתחזוקה רגילה, ולאפשר התחשבנות נכונה של עלות-השיקום חזרה לערך-החומר במלאי.",
          processExampleHe: "יצירת Refurbishment Order עם Settlement על החומר; משיכת-פגומים, ביצוע-שיקום, GR למלאי כתקין; ב-Settlement העלות נזקפת למספר-החומר ומעדכנת את ערכו.",
          cbcHe: "ב-CBC: סוג-פקודה PMRF ייעודי לשיקום-משאבות; ה-Settlement מחזיר את עלות-העבודה-והחלקים לערך-החומר של המשאבה במחסן-החלפים.",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Configure Order Types (OIDA)", "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Indicate Order Types for Refurbishment Processing"],
          tables: ["AUFK", "T003O", "T156", "TKB1A"],
          tcodes: ["OIDA", "IW81", "KO88"],
          fiori: ["F2175"],
          configHe: [
            "Configure Order Types (OIDA): Settlement Profile ייעודי לשיקום.",
            "Maintain Settlement Profiles: Material כ-Valid Receiver (1=Optional), Default Object Type='MAT'.",
            "Indicate Order Types for Refurbishment Processing: סימון הסוג כשיקום.",
            "Assign Notification Types to Order Types: שיוך הודעת-שיקום ↔ פקודת-שיקום.",
          ],
          mistakesHe: ["Settlement Profile רגיל ➔ אי-אפשר Settle על חומר.", "אי-סימון הסוג כשיקום ➔ התהליך לא עובד.", "שימוש בסוג-שיקום לתחזוקה רגילה ➔ נחסם."],
          troubleshootHe: ["Settlement נכשל ➔ Material לא Valid Receiver / Default Object Type ≠ MAT.", "הסוג לא זמין לשיקום ➔ לא סומן ב-Indicate Order Types."],
          bestPracticeHe: ["צור Settlement Profile נפרד לשיקום.", "תאם שמות וטווחי-מספרים בין-מחלקתית.", "שייך הודעת-שיקום לפקודת-שיקום להצעה-אוטומטית."],
          interviewHe: [
            { qHe: "במה Settlement Profile של שיקום שונה?", aHe: "Material הוא Valid Receiver (Settlement Optional=1) ו-Default Object Type='MAT', כדי שהעלות תיזקף למספר-החומר." },
            { qHe: "מדוע סוג-פקודת-שיקום נפרד?", aHe: "כי לאחר סימון כ-Refurbishment אי-אפשר להשתמש בו לתחזוקה רגילה ולהיפך — בידוד-תהליך מלא." },
          ],
          takeawaysHe: ["סוג-פקודה ייעודי, נפרד מתחזוקה רגילה.", "Settlement על מספר-חומר (MAT).", "סימון Indicate Order Types חובה."],
          relatedHe: [{ labelHe: "PM · סוגי-פקודה (5.2.1)", href: "/library/pm/chapter-05/#sub-5.2" }],
        },
        {
          id: "7.2.4", titleHe: "תכנון דרישות-חומר (MRP)", titleEn: "Material Requirements Planning",
          execHe: "ב-S/4HANA ניתן ליצור פקודות-שיקום אוטומטית ב-MRP (MD04): כשכמות-החלקים-התקינים יורדת מתחת לנקודת-הזמנה אך יש פגומים במלאי, MRP יוצר תוכנית-מתוכננת שניתן להמיר לפקודת-שיקום במקום רכש/ייצור.",
          beginnerHe: "במקום לחכות שמישהו ישים לב שנגמרו החלפים התקינים, MRP עושה זאת אוטומטית: רואה שנגמרו תקינים אבל יש פגומים, ומציע 'בוא נשקם'. אתה ממיר את ההצעה לפקודת-שיקום בלחיצה.",
          consultantHe: "תנאי: הפעלת Business Functions LOG_EAM_ROTSUB, LOG_EAM_ROTSUB_2, LOG_MM_SERNO (תחת S/4H_ALWAYS_ON_FUNCTIONS), והקצאת Spare Part Class Code באב-החומר (2=repairable עם CMM, 6=בלי CMM). אם תת-המסך חסר — Define Structure of Data Screens for Each Screen Sequence (OMT3B): Program='SAPLADRT21', Screen='2000'. אז ב-MD04 ניתן להמיר תוכנית-מתוכננת לפקודת-שיקום.",
          purposeHe: "להבטיח זמינות-רציפה של חלפים תקינים דרך אוטומציה — MRP מזהה מחסור ומציע שיקום מהמלאי-הפגום במקום רכש-חדש.",
          processExampleHe: "תקינים יורדים מתחת ל-Reorder Point; MRP רואה פגומים במלאי ויוצר Planned Order; המתכנן ממיר אותה ב-MD04 ל-Refurbishment Order; השיקום ממלא מחדש את מלאי-התקינים.",
          cbcHe: "ב-CBC: כשמלאי-משאבות-תקינות יורד מתחת ל-2, MRP מציע פקודת-שיקום אוטומטית מתוך מלאי-המשאבות-הפגומות — מבטיח זמינות מיידית לקווי-המילוי.",
          navHe: ["Logistics - General ► Material Master ► Configuring the Material Master ► Define Structure of Data Screens for Each Screen Sequence (OMT3B)"],
          tables: ["MARC", "MDKP", "MDTB", "PLAF"],
          tcodes: ["MD04", "MD01", "OMT3B", "MM02"],
          fiori: ["F2175"],
          configHe: [
            "הפעלת Business Functions: LOG_EAM_ROTSUB, LOG_EAM_ROTSUB_2, LOG_MM_SERNO.",
            "Spare Part Class Code באב-החומר: 2 (repairable + CMM) או 6 (בלי CMM).",
            "OMT3B: מיקום תת-מסך Spare Part Class Code — Program 'SAPLADRT21', Screen '2000'.",
          ],
          mistakesHe: ["Business Functions לא פעילות ➔ אין המרה לפקודת-שיקום.", "Spare Part Class Code חסר ➔ MD04 לא מציע שיקום.", "תת-מסך לא ממוקם ➔ אי-אפשר להזין את הקוד."],
          troubleshootHe: ["MD04 לא מאפשר פקודת-שיקום ➔ Business Functions או Spare Part Class Code חסרים.", "שדה Spare Part Class Code לא מופיע ➔ הגדר תת-מסך ב-OMT3B."],
          bestPracticeHe: ["ודא הפעלת-Business-Functions לפני ההטמעה.", "הגדר Reorder Point ו-Safety Stock לחלפי-תקינים.", "הקצה Spare Part Class Code לכל חלף בן-תיקון מתוכנן-MRP."],
          interviewHe: [
            { qHe: "כיצד MRP יוצר פקודת-שיקום?", aHe: "כשתקינים < Reorder Point ויש פגומים במלאי, MRP יוצר Planned Order הניתנת להמרה ב-MD04 לפקודת-שיקום — בתנאי Spare Part Class Code ו-Business Functions פעילות." },
            { qHe: "מה תפקיד Spare Part Class Code?", aHe: "מסמן את החומר כחלף בן-תיקון (2 עם CMM / 6 בלי) ומאפשר את ההמרה לפקודת-שיקום ב-MRP." },
          ],
          takeawaysHe: ["MRP יכול ליצור פקודות-שיקום אוטומטית ב-S/4HANA.", "תנאי: Business Functions + Spare Part Class Code.", "המרה מתבצעת ב-MD04."],
          relatedHe: [{ labelHe: "אובייקט · MARC", href: "/library/pm/object/MARC/" }],
        },
      ],
    },
    // ============================================================ 7.3
    {
      id: "7.3", titleHe: "מיקור-חוץ (Subcontracting)", titleEn: "Subcontracting",
      execHe:
        "מיקור-חוץ — או Subcontracting ל-MRO (Maintenance, Repair, Overhaul) — מתאר תיקון של פריט (מספר-סידורי) אצל ספק-שירות, שאליו הפריט נשלח, מעובד, ומוחזר. בניגוד לעיבוד-חיצוני, כאן האובייקט הפיזי עובר לידי הספק. מבוסס פריט-Subcontracting (Item Category L) עם מספר-סידורי ומלאי-בידי-ספק.",
      beginnerHe:
        "מיקור-חוץ הוא 'לשלוח את החלק עצמו לתיקון בחוץ'. לא רק את העבודה — את הציוד הפיזי. הספק מתקן ומחזיר את אותו פריט (לפי מספר-סידורי). בדרך, SAP מנהל את הפריט כ'מלאי-אצל-הספק' עד שהוא חוזר.",
      consultantHe:
        "התהליך: פקודת-תחזוקה (refurbishment order type) עם מספר-סידורי ופעולת-Subcontracting → דרישת-רכש עם פריט-Subcontracting (Item Category L) ומספר-סידורי → הזמנת-רכש (L) → Outbound Delivery לספק → Transfer Posting (541) למלאי-Subcontracting → תיקון אצל ספק → GR (101) + GI (543) מהמלאי-המסופק → חשבונית → השלמה. נדרשים Serial Number Profiles (OIS2) עם הליכי-סידור MMSL/POSL/PRSL, ו-Material Provision Indicators (OICO) עם AD MP. מיקור-החוץ פותח עבור Aerospace & Defense אך זמין כללית ב-S/4H_ALWAYS_ON_FUNCTIONS.",
      purposeHe:
        "לאפשר תיקון/שיפוץ/החלפה של ציוד יקר אצל ספק-מומחה תוך מעקב מלא אחר הפריט הפיזי (מספר-סידורי) ואחר המלאי-המסופק לספק.",
      processExampleHe:
        "IW81: פקודה עם ציוד+Subcontracting → ME52N דרישת-רכש עם מספר-סידורי → ME21N הזמנה (L) → MIGO 541 העברה למלאי-Subcontracting → עיבוד אצל ספק → MIGO 543 הוצאה ממלאי-מסופק + MIGO 101 GR לפריט-המשוקם → MIRO חשבונית → IW32 השלמה-טכנית.",
      cbcHe:
        "ב-CBC: מנוע-מילוי מורכב נשלח לשיפוץ-יסודי אצל היצרן. הוא מנוהל במספר-סידורי, נשלח ב-Outbound Delivery, נכנס למלאי-אצל-הספק, חוזר משופץ ומתקבל ב-GR — הכל באותו מספר-סידורי לשמירת היסטוריית-הציוד.",
      navHe: [
        "Plant Maintenance and Customer Service ► Master Data in Plant Maintenance and Customer Service ► Technical Objects ► Serial Number Management ► Define Serial Number Profiles (OIS2)",
        "Plant Maintenance and Customer Service ► Master Data in Plant Maintenance and Customer Service ► Bills of Material ► Item Data ► Define Material Provision Indicators (OICO)",
      ],
      tables: ["EQUI", "SER01", "EKPO", "MSLB", "EBAN"],
      tcodes: ["IW81", "ME21N", "MIGO", "MIRO", "OIS2", "ADSUBCON"],
      fiori: ["F2175"],
      configHe: [
        "Define Serial Number Profiles (OIS2): הליכי-סידור MMSL (GR/GI), POSL (הזמנות), PRSL (דרישות).",
        "Purchase Requisition: Define Document Types — Item Category L + Serial Number Profile.",
        "Purchase Order: Define Document Types — Item Category L + Serial Number Profile.",
        "Define Material Provision Indicators (OICO): סימון AD MP (aerospace and defense material provision).",
      ],
      flow: [
        { he: "פקודה + מספר-סידורי", code: "IW81", note: "פעולת-Subcontracting" },
        { he: "הזמנת-רכש (L)", code: "ME21N" },
        { he: "שליחה לספק", code: "MIGO 541", note: "מלאי-Subcontracting" },
        { he: "קבלת פריט-משוקם", code: "MIGO 101" },
        { he: "השלמה-טכנית", code: "IW32" },
      ],
      masterDataHe: [
        "Serial Number Profile (MARC) עם MMSL/POSL/PRSL.",
        "Item Category L בדרישה ובהזמנה · Material Provision Indicator (AD MP).",
        "מלאי-Subcontracting (MSLB) = מלאי-בידי-ספק.",
      ],
      mistakesHe: [
        "חסר הליך-סידור (MMSL/POSL/PRSL) ➔ אי-אפשר לנהל מספר-סידורי לאורך התהליך.",
        "Item Category ≠ L ➔ אין פריט-Subcontracting והעברה למלאי-ספק.",
        "Material Provision Indicator ללא AD MP ➔ הפריט לא מסומן כחומר-מסופק.",
        "Transfer Posting (541) חסר ➔ הפריט אינו במלאי-Subcontracting.",
      ],
      troubleshootHe: [
        "אי-אפשר להזין מספר-סידורי בהזמנה ➔ POSL חסר בפרופיל.",
        "GR לא מקושר לפריט-Subcontracting ➔ Item Category ≠ L.",
        "המלאי-המסופק לא מתעדכן ➔ תנועות 541/543 לא בוצעו.",
      ],
      bestPracticeHe: [
        "הקצה לפחות MMSL+POSL+PRSL לכל פרופיל-Subcontracting.",
        "השתמש ב-ADSUBCON Monitor למעקב אחר המלאי-המסופק.",
        "נהל את הפריט במספר-סידורי לשמירת היסטוריית-ציוד מלאה.",
        "ודא הפעלת Business Functions לפני ההטמעה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Subcontracting לעיבוד-חיצוני?", aHe: "בעיבוד-חיצוני שולחים רק את העבודה; ב-Subcontracting שולחים את הציוד הפיזי עצמו (מספר-סידורי) לספק, הוא מתקן ומחזיר אותו." },
        { qHe: "מהם הליכי-הסידור הנדרשים?", aHe: "MMSL (GR/GI למספר-סידורי), POSL (סידורי בהזמנות), PRSL (סידורי בדרישות) — לפחות שלושתם בפרופיל." },
        { qHe: "מהי Item Category L?", aHe: "פריט-Subcontracting — מפעיל מלאי-בידי-ספק והעברות 541/543; חובה בדרישה ובהזמנה." },
      ],
      takeawaysHe: [
        "Subcontracting = שליחת הציוד הפיזי לתיקון אצל ספק.",
        "מבוסס Item Category L + מספר-סידורי + מלאי-Subcontracting.",
        "נדרשים Serial Number Profiles (MMSL/POSL/PRSL) ו-Material Provision Indicators.",
        "פותח ל-Aerospace & Defense, זמין כללית ב-S/4HANA.",
      ],
      relatedHe: [
        { labelHe: "PM · מספרים-סידוריים (4.8)", href: "/library/pm/chapter-04/#sub-4.8" },
        { labelHe: "PM · שיקום (7.2)", href: "/library/pm/chapter-07/#sub-7.2" },
        { labelHe: "אובייקט · EQUI", href: "/library/pm/object/EQUI/" },
      ],
    },
    // ============================================================ 7.4
    {
      id: "7.4", titleHe: "כיול ציוד-מדידה (Calibration)", titleEn: "Calibration of Test/Measurement Equipment",
      execHe:
        "כיול ציוד-מדידה (משקלים, מדי-לחץ, מד-מדידה) מבטיח שהציוד עומד בקריטריוני-ביצוע. התהליך מצמיד PM ל-QM (PM/QM coupling): ציוד-המדידה מנוהל כ-Equipment, נוצרת General Task List עם Master Inspection Characteristics, תוכנית-תחזוקה מייצרת פקודה ו-Inspection Lot, וכל בדיקה כוללת רישום-תוצאות והחלטת-שימוש (Usage Decision).",
      beginnerHe:
        "מכשירי-מדידה צריכים בדיקה תקופתית כדי לוודא שהם מודדים נכון. SAP מנהל זאת כשילוב של תחזוקה (תזמון הבדיקה דרך תוכנית-תחזוקה) ואיכות (רישום-התוצאות והחלטה אם המכשיר עבר). שני העולמות נפגשים — לכן קוראים לזה 'צימוד PM/QM'.",
      consultantHe:
        "הצימוד דורש קונפיגורציה משני הצדדים. PM: View Profile ייעודי, Equipment Category עם Reference Category P (PRT), הפעלת PRT View ו-SD View, Serial Number Profile. QM: SPC Criteria, Inspection Points (type 1 לציוד), Control Keys עם Insp.Char.Required, Inspection Types, Inspection Lot Origin 14, ו-Define Inspections in Plant Maintenance (קישור Order Type↔Inspection Type לכל מפעל). תוכנית-התחזוקה מייצרת אוטומטית Inspection Lot עם ה-Inspection Type המקושר.",
      purposeHe:
        "להבטיח אמינות-מדידה רגולטורית של ציוד-בדיקה דרך תזמון-אוטומטי של כיולים, רישום-תוצאות מובנה, והחלטת-שימוש (קבל/דחה) עם פעולות-המשך — חיוני בתעשיות מפוקחות.",
      processExampleHe:
        "תוכנית-תחזוקה לציוד-מדידה מייצרת פקודה + Inspection Lot; הטכנאי רושם תוצאות-אפיון מול Master Inspection Characteristics; Usage Decision קובע קבל/דחה; פעולת-המשך (נעילת-ציוד / השלמה-טכנית) מופעלת אוטומטית.",
      cbcHe:
        "ב-CBC: משקלי-מעבדה ומדי-pH לבקרת-איכות-המשקה מכוילים תקופתית. כל מכשיר = Equipment עם קטגוריית-PRT; תוכנית-התחזוקה מייצרת פקודת-כיול + Inspection Lot; אם המשקל סוטה — Usage Decision='דחה' נועל את הציוד אוטומטית.",
      navHe: [
        "Plant Maintenance and Customer Service ► Master Data in Plant Maintenance and Customer Service ► Technical Objects ► Equipment ► Equipment Categories ► Maintain Equipment Category",
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Define Inspections in Plant Maintenance",
      ],
      tables: ["EQUI", "QPMK", "QALS", "PLKO", "TQ30"],
      tcodes: ["IE01", "QS21", "IP42", "QGA1", "QE51N"],
      fiori: ["F2175"],
      configHe: [
        "PM: Set View Profiles for Technical Objects + Equipment Category (Reference Category P=PRT) + PRT/SD Views + Serial Number Profile.",
        "QM: Define SPC Criteria + Define Inspection Points (type 1) + Control Keys (Insp.Char.Required) + Maintain Inspection Types.",
        "Maintain Inspection Lot Origins and Assign Inspection Types: Origin 14 (Plant Maintenance).",
        "Define Inspections in Plant Maintenance: קישור Order Type↔Inspection Type לכל מפעל — לב הצימוד.",
      ],
      flow: [
        { he: "ציוד-מדידה כ-Equipment", code: "IE01", note: "PRT category" },
        { he: "General Task List + MIC", code: "QS21" },
        { he: "תוכנית-תחזוקה", code: "IP42" },
        { he: "פקודה + Inspection Lot", code: "Origin 14" },
        { he: "רישום + Usage Decision", code: "QE51N", note: "קבל/דחה" },
      ],
      masterDataHe: [
        "Equipment (EQUI) עם Reference Category P · Serial Number Profile.",
        "Master Inspection Characteristics (QPMK) משויכים לפעולת ה-Task List.",
        "Inspection Lot (QALS) עם Inspection Type ו-Origin 14.",
      ],
      mistakesHe: [
        "Reference Category ≠ P ➔ תהליך-הכיול לא עובד לקטגוריית-הציוד.",
        "Origin ≠ 14 ➔ ה-Inspection Type לא שמיש לכיול-PM.",
        "אי-קישור Order Type↔Inspection Type ➔ אין צימוד, לא נוצר Inspection Lot.",
        "Control Key ללא Insp.Char.Required ➔ הפעולה לא מזניקה Inspection Lot.",
      ],
      troubleshootHe: [
        "לא נוצר Inspection Lot ➔ Define Inspections in Plant Maintenance חסר/שגוי.",
        "ה-Inspection Type לא בבחירה ➔ לא שויך ל-Origin 14.",
        "PRT View ריק ➔ Production Resources/Tools View לא הוגדר ל-Selection.",
      ],
      bestPracticeHe: [
        "הגדר Equipment Category, Inspection Type ו-Control Key ייעודיים לכיול.",
        "ודא Inspection Point לכל מפעל (ברירות-Usage-Decision תלויות-מפעל).",
        "תאם שמות-Control-Key בין PM, PP, QM, PS.",
        "אכוף שיוך מלא Order Type↔Inspection Type לכל מפעל.",
      ],
      interviewHe: [
        { qHe: "מהו PM/QM coupling?", aHe: "צימוד שבו קונפיגורציות PM (ציוד, תוכנית-תחזוקה) ו-QM (Inspection Type, Inspection Lot) פועלות יחד לכיול ציוד-מדידה; הלב הוא Define Inspections in Plant Maintenance." },
        { qHe: "מהו Inspection Lot Origin 14?", aHe: "המקור שמסמן Inspection Lot כנובע מתחזוקה; כל Inspection Type לכיול חייב להיות משויך לו." },
        { qHe: "מדוע Reference Category P?", aHe: "מסמן את הציוד כ-PRT (Production Resource/Tool) — תנאי לקטגוריות-ציוד בכיול." },
      ],
      takeawaysHe: [
        "כיול = צימוד PM/QM להבטחת אמינות-מדידה.",
        "ציוד-מדידה מנוהל כ-Equipment עם קטגוריית-PRT.",
        "Inspection Lot Origin 14 + קישור Order Type↔Inspection Type.",
        "Usage Decision קובע קבל/דחה עם פעולות-המשך.",
      ],
      relatedHe: [
        { labelHe: "PM · תוכניות-תחזוקה (6.2)", href: "/library/pm/chapter-06/#sub-6.2" },
        { labelHe: "PM · רשימות-תיוג (7.8)", href: "/library/pm/chapter-07/#sub-7.8" },
        { labelHe: "אובייקט · QALS", href: "/library/pm/object/QALS/" },
      ],
      children: [
        {
          id: "7.4.1", titleHe: "פונקציות-קונפיגורציה ל-PM", titleEn: "Customizing Functions for Plant Maintenance",
          execHe: "צד-ה-PM של הכיול כולל הגדרות לציוד, הודעות, פקודות ותוכניות-תחזוקה. עיקרו: View Profile ייעודי לציוד-מדידה, Equipment Category עם Reference Category P (PRT), הפעלת PRT View ו-SD View, ו-Serial Number Profile לאחסון-מלאי.",
          beginnerHe: "כדי ש-SAP יכיר את מכשיר-המדידה כשונה משאר הציוד, מגדירים לו 'פרופיל-תצוגה' נפרד ו'קטגוריית-ציוד' מיוחדת המסומנת ככלי-עבודה (PRT). זה מאפשר לשבץ אותו בתהליך-הכיול.",
          consultantHe: "Set View Profiles for Technical Objects: מבנה-מסכים ייעודי. Maintain Equipment Category: Reference Category חייב P (Production resources/tools). Define Additional Business Views: PRT View ל-Selection (חובה — ריק לא עובד); SD View אם מאחסנים (דורש Serial Number Profile). Define Serial Number Profiles (OIS2) למספר-סידורי.",
          purposeHe: "לבדל את ציוד-המדידה משאר-הציוד, ולהקנות לו את התכונות (PRT, סידוריזציה, מבנה-מסך) הנדרשות לתהליך-הכיול.",
          processExampleHe: "יצירת Equipment Category חדשה עם Reference Category P והפעלת PRT View; כל משקל-מעבדה נוצר תחתיה ב-IE01 ומקבל אוטומטית את מבנה-המסך והתכונות הנדרשות לכיול.",
          cbcHe: "ב-CBC: קטגוריית-ציוד 'CALIB' למכשירי-מעבדה, עם Reference Category P ו-PRT/SD Views — מבדילה משקלי-pH ומדי-לחץ משאר-ציוד-המפעל.",
          navHe: ["Plant Maintenance and Customer Service ► Master Data in Plant Maintenance and Customer Service ► Technical Objects ► General Data ► Set View Profiles for Technical Objects", "Plant Maintenance and Customer Service ► Master Data in Plant Maintenance and Customer Service ► Technical Objects ► Equipment ► Equipment Categories ► Maintain Equipment Category"],
          tables: ["EQUI", "T370K", "T370U", "T377X"],
          tcodes: ["IE01", "OIS2", "OIBS"],
          fiori: ["F2175"],
          configHe: [
            "Set View Profiles for Technical Objects: פרופיל-תצוגה ייעודי תקף ל-Equipment.",
            "Maintain Equipment Category: Reference Category=P (PRT) + שיוך View Profile.",
            "Define Additional Business Views: PRT View=Selection (חובה); SD View למאחסנים.",
            "Define Serial Number Profiles (OIS2).",
          ],
          mistakesHe: ["PRT View ריק ➔ הכיול לא עובד לקטגוריה.", "Reference Category ≠ P ➔ הציוד לא PRT.", "SD View ללא Serial Number Profile ➔ אי-אפשר לאחסן."],
          troubleshootHe: ["הכיול לא עובד לקטגוריה ➔ PRT View=Blank במקום Selection.", "אי-אפשר לאחסן ציוד ➔ SD View לא פעיל / חסר Serial Number Profile."],
          bestPracticeHe: ["צור View Profile ו-Equipment Category ייעודיים לכיול.", "הפעל PRT View=Selection תמיד.", "הוסף SD View רק אם מאחסנים את הציוד."],
          interviewHe: [
            { qHe: "מדוע PRT View חובה לכיול?", aHe: "תהליך-הכיול אינו עובד לקטגוריות-ציוד שבהן PRT View ריק; חייב להיות Selection." },
            { qHe: "מתי נדרש SD View?", aHe: "כשרוצים לאחסן את ציוד-המדידה — אז נדרש גם מספר-חומר, מספר-סידורי ו-Serial Number Profile." },
          ],
          takeawaysHe: ["View Profile + Equipment Category ייעודיים לציוד-מדידה.", "Reference Category=P (PRT) חובה.", "PRT View=Selection; SD View למאחסנים."],
          relatedHe: [{ labelHe: "PM · ציוד (4.3)", href: "/library/pm/chapter-04/#sub-4.3" }],
        },
        {
          id: "7.4.2", titleHe: "פונקציות-קונפיגורציה ל-QM", titleEn: "Customizing Functions for Quality Management",
          execHe: "צד-ה-QM של הכיול מקיף תכנון-איכות, בדיקת-איכות והודעת-איכות. עיקרו: SPC Criteria לאפיוני-בדיקה, Inspection Points (type 1 לציוד), Control Keys עם Insp.Char.Required, Inspection Types, שיוך ל-Inspection Lot Origin 14, ו-Define Inspections in Plant Maintenance — לב הצימוד.",
          beginnerHe: "כאן מגדירים את 'צד-האיכות': אילו תכונות בודקים, איך מנקדים אותן, ומה קורה כשמכשיר עובר או נכשל. החלק הקריטי ביותר — לקשר את סוג-פקודת-הכיול לסוג-הבדיקה, אחרת לא ייווצר Inspection Lot כלל.",
          consultantHe: "Define SPC Criteria: שני קריטריונים — אחד ל-Task List Characteristics (QRKS_CHARACTERISTIC_PM_OBJECT), שני ל-Master Inspection Characteristics (QRKS_MASTER_CHAR_PM_OBJECT); שניהם Usage 004/009 ו-'New assignment in each insp. point'. Define Inspection Points: type 1 (Equipment) עם Selected Set/Code לקבל-דחה לכל מפעל. Control Keys: Insp.Char.Required. Maintain Inspection Types + Origin 14. Define Inspections in Plant Maintenance: קישור Order Type↔Inspection Type לכל מפעל — בלעדיו אין צימוד. Follow-up Actions (V_TQ07, function L) דרך QFOA_OBJECT_STATUS_SET לנעילת-ציוד.",
          purposeHe: "לבנות את שרשרת-האיכות שמייצרת Inspection Lot מכל פקודת-כיול, רושמת תוצאות, ומפעילה פעולות-המשך לפי החלטת-השימוש.",
          processExampleHe: "פקודת-כיול במפעל מסוים יוצרת אוטומטית Inspection Lot עם ה-Inspection Type המקושר; הטכנאי רושם תוצאות; Usage Decision='דחה' מפעיל QFOA_OBJECT_STATUS_SET לנעילת-המכשיר.",
          cbcHe: "ב-CBC: Inspection Type ייעודי 'CAL' מקושר לסוג-פקודת-הכיול במפעל-המעבדה; כל פקודת-כיול-משקל מייצרת Inspection Lot, וקוד-דחייה נועל אוטומטית את המשקל הסוטה.",
          navHe: ["Quality Management ► Quality Inspection ► Inspection Lot Creation ► Maintain Inspection Types", "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Define Inspections in Plant Maintenance"],
          tables: ["QPMK", "QALS", "TQ30", "TQ07", "TQ31"],
          tcodes: ["QS21", "QE51N", "QGA1", "V_TQ07"],
          fiori: ["F2175"],
          configHe: [
            "Define SPC Criteria: 410 (Task List Char) + 420 (Master Char); Usage 004/009; New assignment in each insp. point.",
            "Define Inspection Points: InsPt type 1 (Equipment) + Selected Set/Code לכל מפעל.",
            "Maintain Inspection Types + Maintain Inspection Lot Origins (Origin 14).",
            "Define Inspections in Plant Maintenance: קישור Order Type↔Inspection Type; Follow-up Action (V_TQ07, L) → QFOA_OBJECT_STATUS_SET.",
          ],
          mistakesHe: ["אי-קישור Order Type↔Inspection Type ➔ אין Inspection Lot.", "Origin ≠ 14 ➔ Inspection Type לא שמיש.", "Control Key ללא Insp.Char.Required ➔ אין הזנקת-בדיקה.", "function ≠ L ב-Follow-up ➔ פעולות-המשך לא לפי Usage Decision."],
          troubleshootHe: ["לא נוצר Inspection Lot ➔ Define Inspections in PM חסר.", "Usage Decision לא נועל ציוד ➔ Follow-up Action / function L חסרים.", "Inspection Type לא נבחר ➔ לא שויך ל-Origin 14."],
          bestPracticeHe: ["הגדר Inspection Type ו-Control Key ייעודיים לכיול.", "צור Inspection Point לכל מפעל (תלוי-מפעל).", "ודא לפחות קוד-קבלה אחד וקוד-דחייה אחד לכל מפעל.", "אכוף שיוך מלא Order Type↔Inspection Type."],
          interviewHe: [
            { qHe: "מהי הפונקציה המרכזית בצימוד PM/QM?", aHe: "Define Inspections in Plant Maintenance — מקשרת Order Type ל-Inspection Type לכל מפעל; בלעדיה לא נוצר Inspection Lot." },
            { qHe: "כיצד ננעל ציוד אוטומטית בכשל-כיול?", aHe: "דרך Follow-up Action (V_TQ07, function L) המפעיל QFOA_OBJECT_STATUS_SET לפי קוד-הדחייה ב-Usage Decision." },
          ],
          takeawaysHe: ["צד-QM: SPC Criteria, Inspection Points, Inspection Types, Origin 14.", "Define Inspections in Plant Maintenance = לב הצימוד.", "Follow-up Actions נועלים ציוד-כושל אוטומטית."],
          relatedHe: [{ labelHe: "אובייקט · QPMK", href: "/library/pm/object/QPMK/" }],
        },
      ],
    },
    // ============================================================ 7.5
    {
      id: "7.5", titleHe: "ניהול מאגר-נכסים (Pool Asset Management)", titleEn: "Pool Asset Management",
      execHe:
        "ניהול מאגר-נכסים (PAM) מנהל אובייקטים במאגר שניתן להשאיל לזמן-מוגדר — צי-רכב, ציוד-IT, טלפונים, כלים. האובייקטים מוחזרים למאגר לאחר השאלה, והשירות מחויב לאובייקט-עלות (מרכז-עלות). מבוסס הודעת-PAM, לוח-תכנון גרפי (PAM03), והקצאה דרך פקודת-PAM ברקע.",
      beginnerHe:
        "דמיין 'השכרת-רכב' פנימית בארגון. עובד מבקש רכב מהמאגר, מקבל אישור-הזמנה במייל, לוקח את הרכב, מחזיר, והעלות מחויבת למחלקתו. SAP מנהל את כל זה — בקשה, שיבוץ, אישור, הוצאה, החזרה, חיוב — דרך 'ניהול מאגר-נכסים'.",
      consultantHe:
        "התהליך: בקשה (PAM Notification עם נתוני-נסיעה/נהג/התחשבנות) → שיבוץ בלוח-התכנון → אישור-הזמנה במייל → הוצאה (מד-ק\"מ) → החזרה → הקצאת-עלות (פקודת-PAM ברקע, Settlement למרכז-עלות). תנאי: הפעלת Business Function LOG_EAM_PAM. הגדרות: Notification Type (ScrnType Object='O150' Equipment only, Tab 10\\TAB23, Partner Determination עם PE/US), Basic Settings (OrdTy IntAlloc/ExtAlloc, Class Type PAM), Classes/Characteristics (CT04/CL02), Planning Board (Display Variants, status בטבלת PAMS_VSTAI דרך SM30). מגבלה: רק Class אחד לכל המאגר.",
      purposeHe:
        "לנהל ביעילות מאגר-משאבים משותף — שיבוץ, מעקב-זמינות, אישור-אוטומטי וחיוב-עלות לפי-שימוש — תוך שקיפות בלוח-תכנון גרפי.",
      processExampleHe:
        "עובד פותח הודעת-PAM לרכב; המתזמן משבץ רכב בלוח; העובד מקבל מייל-אישור; בהוצאה נרשם מד-ק\"מ ושעת-נטילה; בהחזרה נרשם מד-ק\"מ ותאריך; העלות מחושבת ומוקצית למרכז-העלות דרך פקודת-PAM ברקע.",
      cbcHe:
        "ב-CBC: מאגר מלגזות-המחסן וצי-רכבי-החלוקה מנוהל ב-PAM. נהג מבקש מלגזה למשמרת, מקבל אישור, וזמן-השימוש מחויב למרכז-העלות של מחלקת-הלוגיסטיקה — עם שקיפות-זמינות בלוח-התכנון.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Pool Asset Management ► Basic Settings for Pool Asset Management",
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Pool Asset Management ► Define Settings for Planning Board",
      ],
      tables: ["QMEL", "EQUI", "AUFK", "PAMS_VSTAI", "KSSK"],
      tcodes: ["PAM03", "IW21", "CT04", "CL02", "SM30"],
      fiori: ["F2175"],
      configHe: [
        "Business Function LOG_EAM_PAM (תנאי-הפעלה).",
        "Overview of Notification Type: ScrnType Object='O150' (Equipment only), Tab 10\\TAB23, Partner Determination (PE/US).",
        "Basic Settings: Application=FL, Reservation Txt (SAPscript), OrdTy IntAlloc/ExtAlloc, Class Type=PAM + Class.",
        "Classes/Characteristics (CT04/CL02) + Planning Board (Display Variants, PAMS_VSTAI דרך SM30).",
      ],
      flow: [
        { he: "בקשה", code: "IW21", note: "הודעת-PAM" },
        { he: "שיבוץ בלוח", code: "PAM03" },
        { he: "אישור-הזמנה", code: "Email" },
        { he: "הוצאה והחזרה", code: "מד-ק\"מ" },
        { he: "הקצאת-עלות", code: "Settlement", note: "פקודת-PAM ברקע" },
      ],
      masterDataHe: [
        "Equipment (EQUI) = אובייקטי-המאגר · Class Type PAM עם Characteristics.",
        "הודעת-PAM (QMEL) עם Partner Functions (Requester/User, PE/US).",
        "פקודת-PAM (AUFK) ברקע ל-Settlement למרכז-עלות.",
      ],
      mistakesHe: [
        "ScrnType Object ≠ O150 ➔ אובייקטי-המאגר אינם Equipment.",
        "Partner Type ≠ PE/US ➔ מיילי-אישור לא נשלחים.",
        "ניסיון לנהל מספר מאגרים ➔ רק Class אחד נתמך — מגבלה ידועה.",
        "PAMS_VSTAI לא מתוחזק ➔ צבעי-סטטוס בלוח שגויים.",
      ],
      troubleshootHe: [
        "מייל-אישור לא נשלח ➔ Partner Type ≠ PE/US או SAPscript לא מוגדר.",
        "אובייקט לא בלוח-התכנון ➔ Edit Object Processing / Notification Type חסר.",
        "סטטוס-בר ללא צבע ➔ PAMS_VSTAI לא מתוחזק (SM30).",
      ],
      bestPracticeHe: [
        "הגדר שני סוגי-הודעות לפחות: בקשה (MF) ותיקון (M1).",
        "השתמש ב-Partner Type PE/US לאישורי-מייל.",
        "תכנן את ה-Class הבודד בקפידה — אי-אפשר מספר מאגרים.",
        "תחזק PAMS_VSTAI דרך SM30 לצבעי-סטטוס ברורים.",
      ],
      interviewHe: [
        { qHe: "אילו אובייקטים מנהל PAM?", aHe: "אובייקטי-מאגר הניתנים להשאלה — צי-רכב, ציוד-IT, טלפונים, כלים — המנוהלים כ-Equipment ומוחזרים לאחר השימוש, עם חיוב-עלות לאובייקט-עלות." },
        { qHe: "מהי המגבלה המרכזית של PAM?", aHe: "ניתן לשייך רק Class אחד; כל המאגרים חולקים אותו Class — אי-אפשר לנהל מאגרים שונים עם מאפיינים שונים במלוא-היקף-הפונקציות." },
        { qHe: "מהו ScrnType Object הנדרש?", aHe: "O150 (Equipment only) — כי אובייקטי-המאגר חייבים להיות Equipment." },
      ],
      takeawaysHe: [
        "PAM = השאלת-נכסים פנימית עם חיוב לפי-שימוש.",
        "מבוסס הודעת-PAM, לוח-תכנון (PAM03), פקודת-PAM ל-Settlement.",
        "תנאי: Business Function LOG_EAM_PAM; ScrnType Object=O150.",
        "מגבלה: Class אחד בלבד לכל המאגרים.",
      ],
      relatedHe: [
        { labelHe: "PM · ניהול-צי (4.4)", href: "/library/pm/chapter-04/#sub-4.4" },
        { labelHe: "PM · שותפים (3.7)", href: "/library/pm/chapter-03/#sub-3.7" },
        { labelHe: "אובייקט · EQUI", href: "/library/pm/object/EQUI/" },
      ],
    },
    // ============================================================ 7.6
    {
      id: "7.6", titleHe: "Maintenance Event Builder", titleEn: "Maintenance Event Builder",
      execHe:
        "ה-Maintenance Event Builder (WPS1) הוא Workbench לתכנון פרויקטי-תחזוקה קטנים כמקבצי-עבודה (Work Packages). הוא בודק רשימת-המתנה (Backlog) של הודעות, מקבץ אותן ל-Revisions, יוצר פקודות, מקצה משימות, ומציג מידע (דרישות-פתוחות, מועדים, זמינות-משאבים). הלב הוא ה-Revision.",
      beginnerHe:
        "כשצריך לתכנן 'אירוע-תחזוקה' שלם — למשל השבתה מתוכננת עם הרבה משימות — ה-MEB עוזר לקבץ את כל ההודעות הפתוחות, להפוך אותן לפקודות, ולנהל הכל יחד תחת 'Revision' אחד עם תאריכי-התחלה-וסיום וסטטוס.",
      consultantHe:
        "ה-MEB עובד עם Revisions שיש להן תאריכים וניהול-סטטוס (Created, Released, Assignments Exist). יוצרים Revision מפורשות ב-IWR1 או מובלעות ב-MEB. תנאי: Business Functions LOG_EAM_POM, LOG_EAM_POM_2 (תחת S/4H_ALWAYS_ON_FUNCTIONS). הגדרה עיקרית: Maintain Revision Type (DIWPSC4) — 'Not WPS-Controlled' לתחזוקה רגילה (שמיש בהודעות/פקודות אך לא ב-MEB); 'WPS-Controlled' שמיש רק ב-MEB.",
      purposeHe:
        "לתכנן ולנהל אירועי-תחזוקה מורכבים בצורה מקובצת — בקרת-Backlog, קיבוץ ל-Revisions, יצירת-פקודות והקצאת-משימות במקום-אחד.",
      processExampleHe:
        "מתכנן פותח WPS1, בודק Backlog של הודעות-פתוחות, מקבץ אותן ל-Revision של השבתה-מתוכננת, יוצר פקודות מההודעות, מקצה משימות, ובודק זמינות-משאבים — הכל מתוך ה-Workbench.",
      cbcHe:
        "ב-CBC: השבתה-שנתית של קו-המילוי מנוהלת ב-MEB כ-Revision; כל הודעות-התחזוקה הפתוחות לקו מקובצות, מומרות לפקודות, ומתוזמנות לחלון-ההשבתה תוך בדיקת-זמינות של אנשי-התחזוקה.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance Event Builder ► Maintain Revision Type (DIWPSC4)",
      ],
      tables: ["T350I", "AUFK", "QMEL", "T352R"],
      tcodes: ["WPS1", "IWR1", "DIWPSC4"],
      fiori: ["F2175"],
      configHe: [
        "Business Functions LOG_EAM_POM + LOG_EAM_POM_2 (תנאי).",
        "Maintain Revision Type (DIWPSC4): 'Not WPS-Controlled' לתחזוקה רגילה; 'WPS-Controlled' ל-MEB בלבד.",
        "יצירת Revision: מפורשת (IWR1) או מובלעת (MEB).",
      ],
      flow: [
        { he: "בדיקת Backlog", code: "WPS1" },
        { he: "קיבוץ ל-Revision", code: "IWR1" },
        { he: "יצירת פקודות", code: "מהודעות" },
        { he: "הקצאת משימות", code: "MEB" },
        { he: "בדיקת זמינות", code: "Capacity" },
      ],
      masterDataHe: [
        "Revision (T352R) עם תאריכים וניהול-סטטוס = לב ה-MEB.",
        "Revision Type קובע WPS-Controlled מול Not WPS-Controlled.",
      ],
      mistakesHe: [
        "Revision Type 'Not WPS-Controlled' לאירוע-MEB ➔ לא שמיש ב-MEB.",
        "Business Functions לא פעילות ➔ ה-MEB לא זמין.",
        "ערבוב Revisions רגילות עם WPS-Controlled ➔ בלבול-תהליך.",
      ],
      troubleshootHe: [
        "אי-אפשר להזין Revision ב-MEB ➔ Revision Type הוא Not WPS-Controlled.",
        "ה-MEB לא נטען ➔ LOG_EAM_POM/POM_2 לא פעילות.",
      ],
      bestPracticeHe: [
        "הגדר Revision Types נפרדים: WPS-Controlled ל-MEB, Not WPS-Controlled לתחזוקה רגילה.",
        "השתמש ב-Revisions לתכנון השבתות-מתוכננות.",
        "ודא הפעלת Business Functions לפני שימוש.",
      ],
      interviewHe: [
        { qHe: "מהו ה-Maintenance Event Builder?", aHe: "Workbench (WPS1) לתכנון אירועי-תחזוקה קטנים — קיבוץ הודעות ל-Revisions, יצירת-פקודות והקצאת-משימות; הלב הוא ה-Revision." },
        { qHe: "מה ההבדל בין סוגי-Revision?", aHe: "'Not WPS-Controlled' שמיש בהודעות/פקודות רגילות אך לא ב-MEB; 'WPS-Controlled' שמיש רק ב-MEB." },
      ],
      takeawaysHe: [
        "MEB = Workbench לתכנון אירועי-תחזוקה מקובצים.",
        "הלב הוא ה-Revision (תאריכים + סטטוס).",
        "Revision Type: WPS-Controlled (MEB) מול Not WPS-Controlled (רגיל).",
      ],
      relatedHe: [
        { labelHe: "PM · פקודות-תחזוקה (5.2)", href: "/library/pm/chapter-05/#sub-5.2" },
        { labelHe: "PM · מודל-השלבים (7.9)", href: "/library/pm/chapter-07/#sub-7.9" },
        { labelHe: "אובייקט · AUFK", href: "/library/pm/object/AUFK/" },
      ],
    },
    // ============================================================ 7.7
    {
      id: "7.7", titleHe: "דוחות-משמרת ורשימות-משמרת", titleEn: "Shift Reports and Shift Notes",
      execHe:
        "רשימות-משמרת (Shift Notes) ודוחות-משמרת (Shift Reports) מתעדים אירועים במהלך משמרת. Shift Note רושמת אירוע יחיד (הערות, זמנים, אובייקטים — הפסקות, תקלות, הצעות-שיפור); Shift Report הוא מסמך-PDF שמייצר אחראי-המשמרת בסיומה, הכולל את רשימות-המשמרת ומסמכים נוספים, עם חתימה-דיגיטלית אופציונלית.",
      beginnerHe:
        "בסוף כל משמרת רושמים מה קרה: מכונה שנעצרה, הפסקת-חשמל, הצעת-שיפור, הערה על-עובד. כל רישום כזה הוא 'הערת-משמרת'. בסוף, אחראי-המשמרת מפיק 'דוח-משמרת' — PDF שמרכז את כל ההערות והאירועים, ולעיתים חותם עליו דיגיטלית.",
      consultantHe:
        "טכנית, Shift Note היא Notification (Notification Category 05, general). תנאי: Business Functions LOG_PP_SRN_CONF, LOG_PP_SRN_02. הגדרות: Overview of Notification Type (Screen Type Hdr='H700', Screen Area '130'); Make Settings for Shift Note Type (Note Number, Origin, Event, Category, Reference Obj. כמו EQUI/BUS2007/BUS2038, Long Text, Track Changes, Attachments, GOS); Define Shift Report Types (ORPS7) עם Class CL_COCF_SR_PDF ו-Form COCF_SR_PDF_LAYOUT, Gap-Free, Use Signature, Complete; Groups לסיווג לפי Functional Location/Equipment.",
      purposeHe:
        "לתעד אירועי-משמרת בצורה מובנית ולהפיק דוח-PDF חתום המשמש כראיה-תיעודית — חיוני להעברת-מידע בין משמרות ולתחקור-אירועים.",
      processExampleHe:
        "במהלך-משמרת נרשמות Shift Notes על תקלת-מכונה והצעת-שיפור; בסוף-המשמרת האחראי מפיק Shift Report (PDF) המרכז אותן יחד עם אישורים, תנועות-מלאי והודעות, וחותם דיגיטלית.",
      cbcHe:
        "ב-CBC: מפעיל קו-המילוי רושם Shift Notes על עצירות-קו והפסקות; בסוף-המשמרת מנהל-המשמרת מפיק Shift Report חתום הכולל את כל האירועים, אישורי-הייצור ותנועות-המלאי — להעברה למשמרת הבאה.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Shift Reports/Notes ► Settings for Shift Notes ► Make Settings for Shift Note Type",
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Shift Reports/Notes ► Settings for Shift Reports ► Define Shift Report Types (ORPS7)",
      ],
      tables: ["QMEL", "COCF_SR", "COCF_SN", "TQ80"],
      tcodes: ["ORPS7", "QS41", "SE71", "SE73"],
      fiori: ["F2175"],
      configHe: [
        "Business Functions LOG_PP_SRN_CONF + LOG_PP_SRN_02 (תנאי).",
        "Overview of Notification Type: Screen Type Hdr='H700' (general), Screen Area '130' (Shift Note); Category 05.",
        "Make Settings for Shift Note Type: Note Number, Origin, Event, Category, Reference Obj. (EQUI/BUS2007/BUS2038...), Long Text, Track Changes, Attachments (subscreen 131), GOS.",
        "Define Shift Report Types (ORPS7): Class CL_COCF_SR_PDF, Form COCF_SR_PDF_LAYOUT, Gap-Free, Use Signature, Complete, Groups.",
      ],
      flow: [
        { he: "רישום אירוע", code: "Shift Note", note: "Category 05" },
        { he: "צבירת-הערות", code: "במשמרת" },
        { he: "הפקת-דוח", code: "Shift Report", note: "PDF" },
        { he: "חתימה-דיגיטלית", code: "Signature", note: "אופציונלי" },
        { he: "השלמה", code: "Complete" },
      ],
      masterDataHe: [
        "Shift Note (QMEL, Category 05) = Notification טכנית.",
        "Shift Report (COCF_SR) = מסמך-PDF מאוחד.",
        "Reference Objects: EQUI, BUS2007 (פקודת-תחזוקה), BUS2038 (הודעה), BUS0010 (Functional Location).",
      ],
      mistakesHe: [
        "Screen Type Hdr ≠ H700 ➔ כותרת-הודעה שגויה ל-Shift Note.",
        "Notification Category ≠ 05 ➔ ה-Shift Note לא תקין.",
        "Attachments ללא subscreen 131 ➔ אזור-הצרופות לא מוצג.",
        "Gap-Free דורש דוח-קודם שהסתיים — שכחה גורמת לחסימת-יצירה.",
      ],
      troubleshootHe: [
        "אזור-צרופות חסר ➔ subscreen 131 לא הוקצה.",
        "אי-אפשר ליצור דוח חדש ➔ Gap-Free/Complete חוסם עד סגירת-הקודם.",
        "דוח לא נחתם ➔ Signature Strategy לא הוגדר.",
      ],
      bestPracticeHe: [
        "השתמש בסוג-הודעה נפרד (Category 05) ל-Shift Notes.",
        "הגדר מספר Shift Report Types לפי דרישות-אובייקט/מרכז-עבודה שונות.",
        "הפעל Protect/Check Documents להגנת-PDF מפני-שינוי.",
        "השתמש ב-Groups לסיווג לפי Functional Location/Equipment.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Shift Note ל-Shift Report?", aHe: "Shift Note מתעדת אירוע-יחיד במהלך-המשמרת (Notification, Category 05); Shift Report הוא מסמך-PDF המרכז את כל ההערות והאירועים בסוף-המשמרת, עם חתימה-דיגיטלית אופציונלית." },
        { qHe: "מהו Gap-Free Reports?", aHe: "אינדיקטור המבטיח שדוח-משמרת חדש מתחיל בדיוק בזמן שהקודם הסתיים — רצף ללא-פערים בתיעוד-המשמרות." },
        { qHe: "אילו Reference Objects אפשריים ב-Shift Note?", aHe: "EQUI, פקודת-תחזוקה (BUS2007), הודעה (BUS2038), Functional Location (BUS0010), מסמך-מדידה (BUS2092) ועוד." },
      ],
      takeawaysHe: [
        "Shift Note = אירוע-יחיד; Shift Report = PDF מאוחד בסוף-משמרת.",
        "Shift Note היא Notification (Category 05, Screen H700).",
        "Shift Report (ORPS7): Class CL_COCF_SR_PDF, Form COCF_SR_PDF_LAYOUT.",
        "Gap-Free וחתימה-דיגיטלית מבטיחים תיעוד-רציף ומאומת.",
      ],
      relatedHe: [
        { labelHe: "PM · הודעות (5.1)", href: "/library/pm/chapter-05/#sub-5.1" },
        { labelHe: "PM · אישורי-ביצוע (5.3)", href: "/library/pm/chapter-05/#sub-5.3" },
        { labelHe: "אובייקט · QMEL", href: "/library/pm/object/QMEL/" },
      ],
    },
    // ============================================================ 7.8
    {
      id: "7.8", titleHe: "רשימות-תיוג (Checklists)", titleEn: "Checklists",
      execHe:
        "רשימות-תיוג נדרשות לביצוע בדיקות וביקורות של נכסים, ומשמשות כסדר-יום-תיעודי מחייב-משפטית. תהליך-הבדיקה הוא end-to-end מתוכניות-בדיקה ועד רישום-תוצאות ופעולות-המשך. תוצאת-בדיקה: OK/לא-OK, תיאור-איכותי (דרגת-קורוזיה), או מדידה-כמותית (טמפרטורה). שתי גרסאות: בסיסית ומורחבת.",
      beginnerHe:
        "רשימת-תיוג היא 'טופס-בדיקה' שעוברים עליו פריט-פריט: לבדוק, לסמן OK או לא-OK, או לרשום-מדידה. SAP מנהל זאת בדומה לכיול — תוכנית-תחזוקה מייצרת פקודה ו-Inspection Lot, והבודק רושם את התוצאות.",
      consultantHe:
        "התהליך דומה מאוד לכיול (7.4) עם Master Inspection Characteristics, General Task List, תוכנית-תחזוקה, פקודה ו-Inspection Lot — אך עם הבדלים: (1) האובייקט יכול להיות Functional Location וגם/או Equipment (לא רק Equipment); (2) חובה להגדיר Order Type; (3) בפעולות-המשך ניתן לנעול Equipment אך לא Functional Location. שתי גרסאות: בסיסית (Basic) ומורחבת (Extended).",
      purposeHe:
        "להבטיח ביצוע-בדיקות מובנה ומתועד-משפטית של נכסים, עם רישום-תוצאות אחיד ופעולות-המשך אוטומטיות — לעמידה ברגולציה ובבטיחות.",
      processExampleHe:
        "תוכנית-תחזוקה מייצרת פקודת-בדיקה + Inspection Lot עבור Functional Location או Equipment; הבודק רושם OK/לא-OK או מדידה; Usage Decision קובע קבל/דחה; פעולת-המשך נועלת את ה-Equipment אם נכשל.",
      cbcHe:
        "ב-CBC: בדיקת-בטיחות יומית של קו-המילוי (Functional Location) — רשימת-תיוג עם פריטי OK/לא-OK; בדיקה-נכשלת מסמנת את הקו לטיפול, ובדיקת-Equipment ספציפי אף יכולה לנעול אותו אוטומטית.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Configure Order Types (OIDA)",
        "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Define Inspections in Plant Maintenance",
      ],
      tables: ["QPMK", "QALS", "PLKO", "EQUI", "IFLOT"],
      tcodes: ["OIDA", "QS21", "IP42", "QE51N"],
      fiori: ["F2175"],
      configHe: [
        "Configure Order Types (OIDA): Order Type ייעודי לרשימות-תיוג; RefObject O110/O180 (Functional Location + Equipment).",
        "Define Identifier for Inspection Points: type 1 (Equipment) או type 2 (Functional Location).",
        "Define Inspections in Plant Maintenance: קישור Order Type↔Inspection Type לכל מפעל.",
        "Define Follow-up Action (V_TQ07): QFOA_OBJECT_STATUS_SET לנעילת Equipment (לא Functional Location).",
      ],
      flow: [
        { he: "פקודת-בדיקה", code: "Order Type", note: "FL/Equipment" },
        { he: "Inspection Lot", code: "Origin 14" },
        { he: "רישום OK/לא-OK", code: "QE51N" },
        { he: "Usage Decision", code: "קבל/דחה" },
        { he: "פעולת-המשך", code: "נעילת-Equipment" },
      ],
      masterDataHe: [
        "Master Inspection Characteristics (QPMK) על פעולת ה-General Task List.",
        "אובייקט: Equipment (EQUI) ו/או Functional Location (IFLOT).",
        "Inspection Lot (QALS) עם Origin 14.",
      ],
      mistakesHe: [
        "RefObject שגוי ➔ לא ניתן לנהל Functional Location + Equipment יחד.",
        "אי-הגדרת Order Type ➔ התהליך לא עובד.",
        "ציפייה לנעילת Functional Location ➔ אין פעולת-המשך לנעילתו.",
      ],
      troubleshootHe: [
        "לא נוצר Inspection Lot ➔ Define Inspections in PM חסר.",
        "Functional Location לא ננעל ➔ אין follow-up action לנעילתו (רק Equipment).",
        "אובייקט לא נבחר בפקודה ➔ RefObject (O110/O180) שגוי.",
      ],
      bestPracticeHe: [
        "השתמש ב-RefObject O110/O180 לניהול FL+Equipment.",
        "הגדר Order Type ייעודי לרשימות-תיוג.",
        "בחר Inspection Point type לפי-אובייקט (1=Equipment, 2=Functional Location).",
        "זכור: נעילה-אוטומטית אפשרית רק ל-Equipment.",
      ],
      interviewHe: [
        { qHe: "מהם ההבדלים בין רשימת-תיוג לכיול?", aHe: "(1) האובייקט יכול להיות Functional Location וגם/או Equipment; (2) חובה Order Type; (3) פעולת-המשך נועלת Equipment אך לא Functional Location." },
        { qHe: "מהן שתי גרסאות-רשימות-התיוג?", aHe: "בסיסית (Basic) ומורחבת (Extended) — נבדלות בעומק-הקונפיגורציה ובאופן-עיבוד-הבדיקה." },
      ],
      takeawaysHe: [
        "רשימות-תיוג = בדיקות מתועדות-משפטית של נכסים.",
        "מבנה דומה לכיול אך תומך גם ב-Functional Location.",
        "תוצאה: OK/לא-OK, איכותי, או כמותי.",
        "נעילה-אוטומטית רק ל-Equipment, לא Functional Location.",
      ],
      relatedHe: [
        { labelHe: "PM · כיול (7.4)", href: "/library/pm/chapter-07/#sub-7.4" },
        { labelHe: "PM · תוכניות-תחזוקה (6.2)", href: "/library/pm/chapter-06/#sub-6.2" },
        { labelHe: "אובייקט · QALS", href: "/library/pm/object/QALS/" },
      ],
      children: [
        {
          id: "7.8.1", titleHe: "עיבוד רשימת-תיוג (גרסה בסיסית)", titleEn: "Checklist Processing (Basic Version)",
          execHe: "הגרסה הבסיסית בנויה כמו תהליך-הכיול: Master Inspection Characteristics על General Task List, אובייקט (Equipment/Functional Location), Sampling Procedures, תוכנית-תחזוקה המייצרת פקודה ו-Inspection Lot, ורישום-תוצאות עם Usage Decision. נדרשים רק שלושת השינויים מהכיול: Order Type, Inspection Point, ו-Follow-up Action.",
          beginnerHe: "הגרסה הבסיסית היא 'הכיול עם שלושה שינויים': מגדירים סוג-פקודה, מגדירים נקודת-בדיקה (גם ל-Functional Location), ומגדירים פעולת-המשך. כל השאר זהה לכיול.",
          consultantHe: "Configure Order Types (OIDA): RefObject O110 (FL, Equipment) או O180 (FL 1:1, Equipment). Define Identifier for Inspection Points: type 2 (Functional Location) או type 1 (Equipment), עם Selected Set/Code לקבל-דחה לכל מפעל. Define Inspections in Plant Maintenance: קישור Order Type↔Inspection Type. Define Follow-up Action (V_TQ07): QFOA_OBJECT_STATUS_SET — נועל Equipment בלבד. הודעה אופציונלית. שאר ההגדרות זהות לכיול (7.4).",
          purposeHe: "לאפשר בדיקות-נכסים מובנות לציוד ולמיקומים-תפקודיים עם מינימום-קונפיגורציה מעבר לתהליך-הכיול הקיים.",
          processExampleHe: "תוכנית-תחזוקה לבדיקת-בטיחות יומית של Functional Location מייצרת פקודה (Order Type ייעודי) + Inspection Lot (Origin 14); הבודק רושם OK/לא-OK; Usage Decision='דחה' מסמן את המיקום (אך לא נועל אותו).",
          cbcHe: "ב-CBC: בדיקת-בטיחות-יומית של קו-המילוי כ-Functional Location — Inspection Point type 2; אם נכשל, מסומן לטיפול אך לא ננעל (Functional Location לא ניתן לנעילה-אוטומטית).",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Configure Order Types (OIDA)", "Quality Management ► Quality Planning ► Inspection Planning ► General ► Define Inspection Points"],
          tables: ["QALS", "PLKO", "IFLOT", "EQUI"],
          tcodes: ["OIDA", "QS21", "QE51N", "V_TQ07"],
          fiori: ["F2175"],
          configHe: [
            "Configure Order Types (OIDA): RefObject O110/O180 (FL + Equipment).",
            "Define Inspection Points: type 1 (Equipment) / type 2 (Functional Location) + Selected Set/Code לכל מפעל.",
            "Define Inspections in Plant Maintenance: קישור Order Type↔Inspection Type.",
            "Define Follow-up Action (V_TQ07): QFOA_OBJECT_STATUS_SET — נועל Equipment בלבד.",
          ],
          mistakesHe: ["RefObject שגוי ➔ FL+Equipment לא נתמכים יחד.", "ציפייה לנעילת FL ➔ אין follow-up action לכך.", "Inspection Point type שגוי לאובייקט."],
          troubleshootHe: ["FL לא ננעל ➔ אין follow-up action לנעילת Functional Location.", "Inspection Lot לא נוצר ➔ Define Inspections in PM חסר."],
          bestPracticeHe: ["השתמש ב-RefObject O110/O180.", "בחר Inspection Point type לפי-אובייקט.", "צור Inspection Point לכל מפעל (תלוי-מפעל)."],
          interviewHe: [
            { qHe: "מהם שלושת השינויים מהכיול בגרסה הבסיסית?", aHe: "Order Type ייעודי, Inspection Point (גם type 2 ל-FL), ו-Follow-up Action (נועל Equipment בלבד)." },
            { qHe: "מהו Inspection Point type 2?", aHe: "Inspection Point for Functional Location — מאפשר בדיקות-רשימת-תיוג למיקומים-תפקודיים." },
          ],
          takeawaysHe: ["גרסה בסיסית = כיול + שלושה שינויים.", "תומכת ב-Functional Location (type 2) וב-Equipment (type 1).", "נעילה-אוטומטית רק ל-Equipment."],
          relatedHe: [{ labelHe: "PM · כיול (7.4.1)", href: "/library/pm/chapter-07/#sub-7.4" }],
        },
        {
          id: "7.8.2", titleHe: "עיבוד רשימת-תיוג (גרסה מורחבת)", titleEn: "Checklist Processing (Extended Version)",
          execHe: "הגרסה המורחבת מספקת עיבוד-רשימות-תיוג עשיר יותר מהבסיסית — בנויה על תשתית ה-Inspection Lot והודעות, עם יכולות-תיעוד, פעולות-המשך ואינטגרציית-מובייל מורחבות, להליכי-בדיקה מורכבים ומפוקחים.",
          beginnerHe: "כשהבדיקות מורכבות יותר — דורשות תיעוד מפורט, צרופות, או עיבוד-במובייל — משתמשים בגרסה המורחבת. היא מוסיפה יכולות מעבר ל'OK/לא-OK' הפשוט של הגרסה הבסיסית.",
          consultantHe: "הגרסה המורחבת נשענת על אותה תשתית PM/QM (Inspection Lot, Origin 14, Inspection Types, Usage Decision) אך מרחיבה את עיבוד-הבדיקה: catalogs ופרופילי-catalog להודעות, פעולות-המשך מתקדמות, ואינטגרציה לאפליקציות-מובייל/Fiori לרישום-תוצאות-בשטח. הקונפיגורציה ממנפת את Maintain Catalogs, Define Catalog Profile, ו-Inspection Types עם רישום-תוצאות מורחב.",
          purposeHe: "לתמוך בהליכי-בדיקה מורכבים ומפוקחים-רגולטורית הדורשים תיעוד עשיר, פעולות-המשך מתקדמות ורישום-תוצאות-נייד.",
          processExampleHe: "הליך-בדיקה רב-שלבי עם catalog-קודים, רישום-תוצאות-מפורט וצרופות; הבודק מתעד בשטח דרך אפליקציית-מובייל; Usage Decision מפעיל פעולות-המשך מתקדמות לפי קוד-הדחייה.",
          cbcHe: "ב-CBC: ביקורת-איכות-מקיפה של קו-המילוי לפני-הסמכה — רשימת-תיוג מורחבת עם תיעוד-מפורט, צרופות-תמונה וקודי-catalog לכל ממצא; נרשמת במובייל בשטח-הייצור.",
          navHe: ["Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Notifications ► Notification Creation ► Notification Content ► Define Catalog Profile", "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Maintain Inspection Types"],
          tables: ["QALS", "QPMK", "QPCD", "TQ15"],
          tcodes: ["QS41", "QS21", "QE51N", "QGA1"],
          fiori: ["F2175"],
          configHe: [
            "Maintain Catalogs + Define Catalog Profile להודעות-הבדיקה.",
            "Maintain Inspection Types עם רישום-תוצאות-מורחב.",
            "Define Follow-up Action מתקדם דרך Usage Decision.",
            "אינטגרציית-מובייל/Fiori לרישום-תוצאות-בשטח.",
          ],
          mistakesHe: ["Catalog Profile חסר ➔ אין קודים מובנים לממצאים.", "Inspection Type ללא רישום-תוצאות מורחב ➔ תיעוד דל.", "אי-הגדרת follow-up מתקדם ➔ פעולות-המשך לא מופעלות."],
          troubleshootHe: ["קודי-catalog חסרים ➔ Catalog Profile לא הוגדר.", "רישום-תוצאות מוגבל ➔ Inspection Type ללא Record Characteristic Results."],
          bestPracticeHe: ["הגדר Catalog Profile עשיר לתיעוד-ממצאים.", "השתמש ברישום-תוצאות-נייד לבדיקות-שטח.", "תכנן פעולות-המשך מתקדמות לפי קודי-Usage-Decision."],
          interviewHe: [
            { qHe: "מתי בוחרים בגרסה המורחבת על-פני הבסיסית?", aHe: "כשהבדיקות מורכבות ודורשות תיעוד עשיר, catalogs לממצאים, פעולות-המשך מתקדמות ורישום-תוצאות-נייד." },
            { qHe: "על איזו תשתית נשענת הגרסה המורחבת?", aHe: "על אותה תשתית PM/QM (Inspection Lot, Origin 14, Inspection Types, Usage Decision) עם הרחבות-עיבוד ותיעוד." },
          ],
          takeawaysHe: ["גרסה מורחבת = עיבוד-בדיקה עשיר מהבסיסית.", "מוסיפה catalogs, פעולות-המשך מתקדמות ורישום-נייד.", "נשענת על תשתית ה-Inspection Lot של PM/QM."],
          relatedHe: [{ labelHe: "PM · כיול ל-QM (7.4.2)", href: "/library/pm/chapter-07/#sub-7.4" }],
        },
      ],
    },
    // ============================================================ 7.9
    {
      id: "7.9", titleHe: "מחזור פקודת-העבודה במודל-השלבים", titleEn: "Work Order Cycle Using the Phase Model",
      execHe:
        "מודל-השלבים (Phase Model), שהוצג מ-SAP S/4HANA 2021, מחליף את מחזור-פקודת-העבודה הסטנדרטי (שש-פאזות) בתשעה-שלבים: יזום, סינון, תכנון, אישור, הכנה, תזמון, ביצוע, פוסט-ביצוע, וסגירה. כל שלב נתמך באפליקציות-Fiori ותפקיד-אחראי. הקונפיגורציה נרחבת וקשה — SAP ממליצה על Best Practices (4HH/4HI/4VT/4WM).",
      beginnerHe:
        "מודל-השלבים הוא דרך חדשה ומפורטת יותר לנהל פקודת-עבודה מתחילתה ועד-סופה. במקום שש-תחנות, יש תשע — מהבקשה הראשונית (עובד פותח בקשה), דרך אישור-מנהל, תכנון, ביצוע בשטח, ועד-סגירה. לכל שלב יש אפליקציית-Fiori משלו ותפקיד אחראי.",
      consultantHe:
        "תשעת-השלבים: 1.Initiation (Create Maintenance Request F1511A) → 2.Screening (Screen Maintenance Requests F4072) → 3.Planning (Manage Maintenance Notifications and Orders F4604) → 4.Approval (My Inbox F0862, Workflow) → 5.Preparation (Manage Maintenance Planning Buckets F3888) → 6.Scheduling (Find Maintenance Order F2175) → 7.Execution (Perform Maintenance Jobs F5104A) → 8.Postexecution → 9.Completion. תנאי-יסוד: Activate Business Feature EAM_PHASE_MODEL_PROCESSING=3 (Active). אז Define Notification Types (Y1 סטנדרטי), Assign Notification Types to Order Types (YA01 סטנדרטי), Event Prioritization. SAP מזהירה: קונפיגורציה ידנית = מאמץ עצום; עדיף Best Practices scope items.",
      purposeHe:
        "לספק מחזור-חיים מובנה, מפוקח-Workflow ומבוסס-Fiori לפקודת-העבודה — עם הפרדת-תפקידים ברורה, אישורי-עלות, ותכנון-Backlog מתקדם דרך Planning Buckets.",
      processExampleHe:
        "עובד פותח Maintenance Request (F1511A) → מפקח מסנן (F4072) → מתכנן יוצר פקודות (F4604) → מנהל מאשר (F0862) → הכנה ב-Planning Buckets (F3888) → תזמון (F2175) → טכנאי מבצע (F5104A) → מפקח בודק פוסט-ביצוע → סגירה והתחשבנות.",
      cbcHe:
        "ב-CBC: בקשת-תחזוקה לקו-מילוי תקול עוברת את תשעת-השלבים — מפעיל-הקו פותח בקשה ב-F1511A, מפקח-המשמרת מסנן, מתכנן-התחזוקה מתכנן ומבקש אישור-עלות, מנהל מאשר, והטכנאי מבצע ב-F5104A תוך רישום-זמן ונתוני-כשל.",
      navHe: [
        "ABAP Platform ► Application Server ► Business Management ► SAP Business Feature ► Activate Business Feature (EAM_PHASE_MODEL_PROCESSING)",
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Notifications ► Notification Creation ► Notification Types ► Define Notification Types",
      ],
      tables: ["AUFK", "QMEL", "AFKO", "T350I"],
      tcodes: ["SFW5", "OIDA", "IW32"],
      fiori: ["F1511A", "F4072", "F4604", "F0862", "F5104A"],
      configHe: [
        "Activate Business Feature: EAM_PHASE_MODEL_PROCESSING=3 (Active) — נקודת-המוצא.",
        "Define Notification Types: Y1 (סטנדרטי למודל-השלבים).",
        "Assign Notification Types to Order Types: Y1 → YA01 (סטנדרטי).",
        "Event Prioritization: חישוב-עדיפות מ-Consequence Categories ו-Likelihoods (רק דרך F1511A). מומלץ Best Practices 4HH/4HI/4VT/4WM.",
      ],
      flow: [
        { he: "יזום + סינון", code: "F1511A", note: "עובד / מפקח" },
        { he: "תכנון + אישור", code: "F4604", note: "מתכנן / מנהל" },
        { he: "הכנה + תזמון", code: "F3888", note: "Planning Buckets" },
        { he: "ביצוע", code: "F5104A", note: "טכנאי" },
        { he: "פוסט-ביצוע + סגירה", code: "F2175" },
      ],
      masterDataHe: [
        "Notification Type Y1 + Order Type YA01 (סטנדרטיים למודל-השלבים).",
        "Business Feature EAM_PHASE_MODEL_PROCESSING מאפשר את כל ההגדרות.",
        "Maintenance Planning Buckets (F3888) לניהול-Backlog.",
      ],
      mistakesHe: [
        "אי-הפעלת EAM_PHASE_MODEL_PROCESSING ➔ אף הגדרת-המשך אינה זמינה.",
        "קונפיגורציה ידנית מלאה במקום Best Practices ➔ מאמץ עצום ומיותר.",
        "אי-שיוך Y1↔YA01 ➔ סוג-פקודה לא מוצע מההודעה.",
        "ציפייה ל-Event Prioritization מחוץ ל-F1511A ➔ עובד רק באפליקציה זו.",
      ],
      troubleshootHe: [
        "הגדרות-מודל-השלבים חסרות ➔ Business Feature לא פעיל (=3).",
        "סוג-פקודה לא מוצע ➔ Assign Notification Types to Order Types חסר.",
        "עדיפות לא מחושבת ➔ הבקשה לא נוצרה דרך F1511A.",
      ],
      bestPracticeHe: [
        "השתמש ב-Best Practices scope items (4HH/4HI/4VT/4WM) לקונפיגורציה-אוטומטית.",
        "הפעל EAM_PHASE_MODEL_PROCESSING תחילה.",
        "השתמש ב-Y1/YA01 הסטנדרטיים אלא-אם נדרשת התאמה.",
        "נצל Planning Buckets (F3888) לתכנון-Backlog והשבתות.",
      ],
      interviewHe: [
        { qHe: "כמה שלבים במודל-השלבים ומה ההבדל מהסטנדרטי?", aHe: "תשעה שלבים (יזום, סינון, תכנון, אישור, הכנה, תזמון, ביצוע, פוסט-ביצוע, סגירה) לעומת שש-פאזות במחזור-הסטנדרטי; כל שלב נתמך באפליקציית-Fiori ובתפקיד-אחראי." },
        { qHe: "מהי נקודת-המוצא לקונפיגורציה?", aHe: "Activate Business Feature EAM_PHASE_MODEL_PROCESSING=3 (Active); בלעדיה אף הגדרת-המשך אינה זמינה." },
        { qHe: "מדוע SAP ממליצה על Best Practices?", aHe: "הקונפיגורציה הידנית נרחבת וקשה מאוד; scope items 4HH/4HI/4VT/4WM מספקים קונפיגורציה-אוטומטית וחוסכים מאמץ עצום." },
      ],
      takeawaysHe: [
        "מודל-השלבים (S/4HANA 2021) = תשעה-שלבים במקום שש.",
        "כל שלב נתמך באפליקציית-Fiori ובתפקיד-אחראי.",
        "תנאי: Business Feature EAM_PHASE_MODEL_PROCESSING=3.",
        "Y1/YA01 סטנדרטיים; עדיף Best Practices scope items.",
      ],
      relatedHe: [
        { labelHe: "PM · פקודות-תחזוקה (5.2)", href: "/library/pm/chapter-05/#sub-5.2" },
        { labelHe: "PM · SAP Fiori (8.1)", href: "/library/pm/chapter-08/#sub-8.1" },
        { labelHe: "אובייקט · AUFK", href: "/library/pm/object/AUFK/" },
      ],
    },
  ],
};
