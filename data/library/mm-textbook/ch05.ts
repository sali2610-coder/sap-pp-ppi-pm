// ===== MM Digital Textbook — Chapter 5 (Operational Procurement) =====
// Authored Hebrew learning chapter. Every node is a complete 18-facet
// LearningNode (beginner + consultant friendly). SAP identifiers verbatim EN.
// Hierarchy preserved from the source book exactly.
import type { TextbookChapter } from "./types";

export const CH5: TextbookChapter = {
  n: 5,
  titleHe: "רכש תפעולי",
  titleEn: "Operational Procurement",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לרכש התפעולי (Operational Procurement) ב-SAP S/4HANA — הלב הפועם של תהליך ה-Procure-to-Pay. כאן מתבצע התהליך היומיומי: דרישה (Requisition / Shopping Cart) ► הזמנת-רכש (Purchase Order) ► קבלת-טובין (Goods Receipt) ► חשבונית (Invoice). כל תת-פרק ותת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית מקצה-לקצה, דוגמת CBC (ייצור-בקבוק של קוקה-קולה — רכש חומרי-גלם, אריזה ו-MRO), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי-קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את הרכש התפעולי במלואו ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 5.1
    {
      id: "5.1", titleHe: "מהו רכש תפעולי?", titleEn: "What Is Operational Procurement?",
      execHe:
        "רכש תפעולי הוא הביצוע היומיומי של רכישת חומרים ושירותים שהארגון צורך באופן שוטף — מחומרי-גלם לייצור ועד ציוד-משרדי ושירותי-תחזוקה (MRO). זהו ליבת ה-Procure-to-Pay: זרימה מובנית מדרישה, דרך הזמנת-רכש מאושרת, לקבלת-טובין ולחשבונית. בניגוד לרכש אסטרטגי (ניהול-ספקים, חוזים, מקורות-אספקה), הרכש התפעולי עוסק ב'כאן ועכשיו' — להוציא את ההזמנה הנכונה לספק הנכון, בכמות ובמועד הנכונים.",
      beginnerHe:
        "דמיין שאתה צריך משהו לעבודה — חבילת מדפסת, או טון סוכר לקו-ייצור. רכש תפעולי הוא כל מה שקורה מרגע ה'אני צריך' ועד ש'הקופון שולם'. קודם רושמים דרישה (Requisition — 'אני צריך X'), אחר-כך הופכים אותה להזמנת-רכש לספק (Purchase Order — 'ספק, שלח לי X'), מקבלים את הסחורה (Goods Receipt), ולבסוף מקבלים ומשלמים חשבונית (Invoice). SAP מנהל את כל ארבעת השלבים בצורה מקושרת.",
      consultantHe:
        "הרכש התפעולי ב-S/4HANA נשען על שלוש טבלאות-ליבה: EBAN (דרישות-רכש), EKKO (כותרת הזמנת-רכש) ו-EKPO (שורות הזמנת-רכש), עם EKET (לוחות-זמנים) ו-EKBE (תנועות PO — GR/IR). הוא מחובר ל-MM-IM (קבלות, MIGO/טבלת MSEG) ול-MM-IV (חשבוניות, MIRO/RBKP). שני 'פרצופים' למשתמש: רכש קלאסי מבוסס-תפקיד-רכש (ME51N/ME21N), ו-Self-Service Procurement מבוסס Shopping Cart (Fiori) למשתמש-העסקי. ב-S/4HANA הדגש עבר לאפליקציות-Fiori (Manage Purchase Requisitions, Manage Purchase Orders), ל-flexible workflow לאישורים, ולשילוב SAP Business Network לשיתוף-פעולה עם ספקים.",
      purposeHe:
        "להבטיח שכל צורך עסקי מתורגם להזמנה מבוקרת, מאושרת ומתועדת — עם הפרדת-תפקידים (מבקש ≠ מאשר ≠ מקבל ≠ משלם), עקיבות מלאה (audit trail), ושליטה תקציבית. הרכש התפעולי הוא הגשר בין הצורך התפעולי לבין ההתחייבות הכספית והרישום החשבונאי.",
      processExampleHe:
        "תהליך מלא: מחלקת-ייצור מזהה מחסור בסוכר ► נוצרת דרישת-רכש (ME51N / Fiori) עם חומר, כמות, מפעל ותאריך ► רוכש ממיר אותה להזמנת-רכש (ME21N) לספק-החוזה ► ההזמנה עוברת flexible workflow לאישור ► נשלחת לספק (הדפסה / IDoc / SAP Business Network) ► הסחורה מגיעה ונרשמת GR (MIGO, תנועה 101) ► הספק שולח חשבונית, נרשמת MIRO ► ה-Three-Way-Match (PO↔GR↔Invoice) משחרר לתשלום.",
      cbcHe:
        "ב-CBC (מפעל-בקבוק של קוקה-קולה) הרכש התפעולי מזין את קו-הייצור: תרכיז מ-The Coca-Cola Company, סוכר, CO2, בקבוקי-PET, פקקים ותוויות מספקי-אריזה, וחלפי-MRO לתחזוקת קווי-המילוי. דרישות-הסוכר נוצרות אוטומטית מ-MRP, הופכות להזמנות-רכש מול חוזי-מסגרת, ונשלחות דרך SAP Business Network. רכש-MRO (חלפים) לרוב מתחיל כ-Shopping Cart של טכנאי-תחזוקה.",
      navHe: [
        "Materials Management ► Purchasing ► Purchase Requisition ► Define Document Types",
        "Materials Management ► Purchasing ► Purchase Order ► Define Document Types",
        "Logistics ► Materials Management ► Purchasing (SAP Easy Access) — ME51N / ME21N / ME21N",
      ],
      tables: ["EBAN", "EKKO", "EKPO", "EKET", "EKBE"],
      tcodes: ["ME51N", "ME21N", "ME53N", "ME23N", "MIGO", "MIRO"],
      fiori: ["F1048", "F0842A", "F0401", "F1990"],
      configHe: [
        "Document Types (NB דרישה רגילה / NB הזמנה רגילה) קובעים טווחי-מספרים, בקרת-שדות וסוגי-שורות מותרים.",
        "Account Assignment Categories (K=Cost Center, F=Order, P=Project, A=Asset) קובעות לאן נזקפת העלות.",
        "Item Categories (Standard, L=Subcontracting, K=Consignment, D=Service, U=Stock Transport) קובעות את אופי השורה.",
        "הפרדת רכש-קלאסי (ME-transactions) מ-Self-Service (Shopping Cart, Fiori) ברמת התהליך והתפקיד.",
      ],
      flow: [
        { he: "צורך עסקי", note: "מחסור / בקשה" },
        { he: "דרישת-רכש (PR)", code: "EBAN", note: "ME51N / Shopping Cart" },
        { he: "הזמנת-רכש (PO)", code: "EKKO/EKPO", note: "ME21N" },
        { he: "קבלת-טובין (GR)", code: "MSEG", note: "MIGO 101" },
        { he: "חשבונית (IR)", code: "RBKP", note: "MIRO" },
        { he: "תשלום", note: "FI — Three-Way-Match" },
      ],
      masterDataHe: [
        "Material Master (תצוגת Purchasing) · Vendor / Business Partner (תפקיד FLVN01) · Purchasing Info Record (EINA/EINE).",
        "Source List (Source of Supply) · Outline Agreement (חוזה / Scheduling Agreement) מזינים בחירת-מקור אוטומטית.",
        "Plant / Purchasing Organization / Purchasing Group — מבנה ארגוני המגדיר אחריות-רכש.",
      ],
      mistakesHe: [
        "ערבוב רכש-מלאי (חומר עם master) ברכש-טקסט-חופשי — מאבד תכנון-MRP ועקיבות.",
        "דילוג על דרישת-רכש והקלדה ישירה של PO — שובר את הפרדת-התפקידים ואת ה-workflow.",
        "Account Assignment שגוי — העלות נזקפת לאובייקט-עלות הלא-נכון.",
        "אי-שימוש במקור-אספקה (Source List / חוזה) — מחירים ידניים ולא-עקביים.",
      ],
      troubleshootHe: [
        "PR לא ניתנת להמרה ל-PO ➔ חסר Source of Supply, או הדרישה לא משוחררת (release strategy תקועה).",
        "PO לא נשלחת לספק ➔ Output / Message determination לא הוגדר, או רשומת-תקשורת חסרה ב-Business Partner.",
        "GR נדחה ➔ ה-PO לא משוחררת, או Item Category דורשת Confirmation שלא הגיעה.",
        "חשבונית חסומה (blocked) ➔ חריגת-Three-Way-Match (כמות/מחיר) מעבר ל-tolerance.",
      ],
      bestPracticeHe: [
        "אכוף מסלול PR ► PO ► GR ► IR מלא לכל רכש שאינו זניח — עקיבות ובקרה.",
        "השתמש בחומר עם master ובמקור-אספקה היכן שאפשר; שמור טקסט-חופשי למקרי-קצה.",
        "הגדר flexible workflow לאישורים במקום release strategy קלאסית בפרויקטים חדשים.",
        "מנף את Fiori (Manage Purchase Requisitions / Orders) לחוויית-משתמש עסקית.",
      ],
      interviewHe: [
        { qHe: "מהו ההבדל בין רכש תפעולי לרכש אסטרטגי?", aHe: "תפעולי = ביצוע יומיומי (PR►PO►GR►IR); אסטרטגי = ניהול-ספקים, חוזים, מקורות-אספקה וקטגוריות. התפעולי 'מבצע' את מה שהאסטרטגי 'מסכם'." },
        { qHe: "אילו שלוש טבלאות הן ליבת ה-PO?", aHe: "EKKO (כותרת), EKPO (שורות), EKET (לוחות-זמנים). EBAN מחזיקה את דרישות-הרכש לפני ההמרה." },
        { qHe: "מהו Three-Way-Match?", aHe: "השוואת PO ↔ Goods Receipt ↔ Invoice (כמות ומחיר) לפני שחרור לתשלום — בקרה מרכזית של הרכש התפעולי." },
      ],
      takeawaysHe: [
        "רכש תפעולי = ליבת ה-Procure-to-Pay: PR ► PO ► GR ► IR.",
        "EBAN / EKKO / EKPO הן הטבלאות המרכזיות.",
        "שני פרצופים: רכש-קלאסי (ME) ו-Self-Service (Shopping Cart).",
        "S/4HANA מדגיש Fiori, flexible workflow ו-SAP Business Network.",
      ],
      relatedHe: [
        { labelHe: "MM · עיבוד הזמנת-רכש (5.4)", href: "/library/mm/chapter-05/#sub-5.4" },
        { labelHe: "אובייקט · EKKO", href: "/library/mm/object/EKKO/" },
      ],
    },
    // ============================================================ 5.2
    {
      id: "5.2", titleHe: "רכש בשירות-עצמי", titleEn: "Self-Service Procurement",
      execHe:
        "רכש בשירות-עצמי (Self-Service Procurement) מאפשר למשתמש-העסקי הרגיל — לא רוכש מקצועי — לבקש בעצמו מוצרים ושירותים דרך 'עגלת-קניות' (Shopping Cart) ידידותית, בדומה לחנות-אונליין. ב-S/4HANA היכולת מובְנֵית בליבה (לא עוד SRM נפרד), עם קטלוגים, אישורים אוטומטיים והמרה ל-PR/PO ברקע. המטרה: להוריד את עומס-הרכש מהמשתמשים-העסקיים ולקצר זמני-מחזור.",
      beginnerHe:
        "במקום למלא טופס-רכש מסובך, העובד נכנס לקטלוג, בוחר פריטים, ומוסיף ל'עגלה' — בדיוק כמו קנייה ברשת. כשהוא מאשר, SAP יוצר ברקע דרישת-רכש או הזמנת-רכש, מנתב לאישור, ושולח לספק. העובד לא צריך להכיר תנועות-SAP או טבלאות — הוא רק 'קונה'.",
      consultantHe:
        "ב-S/4HANA ה-Self-Service Procurement מומש כ-embedded scenario עם אפליקציות Fiori (Create Purchase Requisition / My Shopping Cart). Shopping Cart ממופה ל-PR (EBAN) ולעיתים ישירות ל-PO. תומך בקטלוגים (OCI / internal catalog), ב-free-text items, ב-flexible workflow לאישור, וב-confirmation/return של פריטים שהתקבלו. שים לב: ה-Shopping Cart הקלאסי של SRM הוחלף; ב-S/4HANA ההמלצה היא Self-Service Requisitioning המבוסס על אובייקט ה-PR בליבה, או חיבור ל-Ariba Buying.",
      purposeHe:
        "לאפשר 'רכש מבוזר מבוקר' — המשתמשים מבקשים בעצמם, אך כל בקשה עוברת אישור-תקציבי וכללי-מקור-אספקה. מפחית צווארי-בקבוק במחלקת-הרכש, מקצר lead-time, ומגדיל ציות (compliance) דרך קטלוגים מאושרים מראש.",
      processExampleHe:
        "עובד פותח 'My Shopping Cart' (Fiori) ► בוחר 5 פריטי-משרד מקטלוג פנימי ► מוסיף free-text item לכבל-מיוחד ► מאשר ► נוצרת דרישת-רכש (EBAN) ► flexible workflow מנתב למנהל לאישור-תקציבי ► לאחר אישור, הדרישה מומרת ל-PO אוטומטית (אם יש מקור) ► נשלחת לספק ► העובד מבצע Confirmation עם קבלת-הפריטים.",
      cbcHe:
        "ב-CBC טכנאי-תחזוקה זקוק לאטם ולמסנן לקו-מילוי. הוא פותח Shopping Cart, בוחר מקטלוג-ה-MRO, ומאשר; הדרישה מנותבת לראש-צוות-התחזוקה לאישור, ואז הופכת ל-PO מול ספק-החלפים. כך טכנאים מזמינים MRO ללא תלות יומיומית במחלקת-הרכש.",
      navHe: [
        "Fiori Launchpad ► Procurement ► Create Purchase Requisition / My Shopping Cart",
        "Materials Management ► Purchasing ► Self-Service Procurement ► Catalog Management",
        "Materials Management ► Purchasing ► Purchase Requisition ► Activate Self-Service Requisitioning",
      ],
      tables: ["EBAN", "EKKO", "EKPO", "ESUH"],
      tcodes: ["ME51N", "ME53N", "ME21N"],
      fiori: ["F1048", "F2026", "F0842A"],
      configHe: [
        "הפעלת Self-Service Requisitioning והגדרת Document Type ייעודי ל-Shopping Cart.",
        "ניהול קטלוגים (internal catalog / OCI punch-out) כמקור-בחירה למשתמש.",
        "flexible workflow לאישור עגלת-הקניות לפי שווי / קטגוריה / מרכז-עלות.",
        "מיפוי Account Assignment ברירת-מחדל למשתמש (לרוב K=Cost Center של המבקש).",
      ],
      flow: [
        { he: "פתיחת עגלה", note: "My Shopping Cart" },
        { he: "בחירה מקטלוג / free-text", note: "פריטים + כמות" },
        { he: "אישור עגלה", note: "flexible workflow" },
        { he: "יצירת PR", code: "EBAN" },
        { he: "המרה ל-PO", code: "EKKO/EKPO" },
        { he: "Confirmation בקבלה", code: "ESUH" },
      ],
      masterDataHe: [
        "Catalog (internal / external OCI) · Material Master / Product · Cost Center ברירת-מחדל למבקש.",
        "Business Partner (Vendor) ומקור-אספקה לקטגוריות-הקטלוג.",
      ],
      mistakesHe: [
        "פתיחת רכש-שירות-עצמי ללא קטלוג מאושר — הכל הופך free-text ולא-מבוקר.",
        "אי-הגדרת workflow לאישור — עגלות עוברות לרכש בלי בקרה תקציבית.",
        "ניסיון להחיות את ה-Shopping Cart הקלאסי של SRM במקום הפתרון המובנה של S/4HANA.",
      ],
      troubleshootHe: [
        "עגלה לא הופכת ל-PR ➔ Self-Service Requisitioning לא מופעל או Document Type חסר.",
        "אין פריטים בקטלוג ➔ הקטלוג לא הוגדר / לא מוקצה למשתמש.",
        "עגלה תקועה באישור ➔ flexible workflow לא מצא מאשר (חסר agent determination).",
      ],
      bestPracticeHe: [
        "השען על קטלוגים מאושרים-מראש למקסם compliance ולמזער free-text.",
        "הגדר workflow פשוט מבוסס-שווי לעגלות-קניות.",
        "אמץ את הפתרון המובנה (Self-Service Requisitioning) או Ariba Buying — לא SRM הישן.",
      ],
      interviewHe: [
        { qHe: "מהו Shopping Cart וכיצד הוא שונה מ-PR?", aHe: "Shopping Cart הוא ממשק עסקי-ידידותי לבקשת-רכש; ברקע הוא מתורגם ל-PR (EBAN). ה-PR הוא אובייקט-ה-SAP הרשמי; העגלה היא חוויית-המשתמש." },
        { qHe: "האם SRM עדיין נדרש ל-Self-Service ב-S/4HANA?", aHe: "לא. היכולת מובְנֵית בליבת S/4HANA (Self-Service Requisitioning) או דרך Ariba Buying; SRM הקלאסי הופסק." },
      ],
      takeawaysHe: [
        "Self-Service = משתמש-עסקי קונה דרך Shopping Cart, לא רוכש מקצועי.",
        "העגלה ממופה ל-PR/PO ברקע; המשתמש לא נוגע בטבלאות.",
        "מובְנֵה ב-S/4HANA — לא SRM נפרד.",
      ],
      relatedHe: [
        { labelHe: "MM · עיבוד דרישות (5.3)", href: "/library/mm/chapter-05/#sub-5.3" },
        { labelHe: "MM · workflow (5.2.6)", href: "/library/mm/chapter-05/#sub-5.2.6" },
      ],
      children: [
        {
          id: "5.2.1", titleHe: "יצירת דרישה או עגלת-קניות", titleEn: "Creating a Requisition or Shopping Cart",
          execHe: "השלב הפותח של הרכש התפעולי: רישום הצורך כדרישת-רכש (ME51N / Fiori) או כעגלת-קניות. כאן נקבעים החומר/השירות, הכמות, המפעל, תאריך-האספקה ושיוך-החשבון — הבסיס לכל המשך-התהליך.",
          beginnerHe: "זה ה'אני צריך X'. ממלאים מה רוצים, כמה, לאן ולמתי. ב-Fiori זה נראה כמו טופס-הזמנה פשוט; בעגלת-קניות זה נראה כמו חנות-אונליין. התוצאה זהה: רשומת-דרישה במערכת.",
          consultantHe: "הדרישה נשמרת ב-EBAN. שדות-מפתח: MATNR (חומר), MENGE (כמות), WERKS (מפעל), LGORT (מחסן), BADAT/LFDAT (תאריכים), KNTTP (Account Assignment), PSTYP (Item Category). דרישה יכולה להיווצר ידנית (ME51N), אוטומטית מ-MRP, או מ-Shopping Cart. ב-S/4HANA אפליקציית 'Create Purchase Requisition' (F1048) ו-'Manage Purchase Requisitions' הן הממשק המומלץ.",
          purposeHe: "לתעד את הצורך באופן מובנה לפני התחייבות כספית — ולאפשר אישור, בחירת-מקור והמרה ל-PO מבוקרת.",
          processExampleHe: "מתכנן-ייצור פותח ME51N ► חומר 'סוכר', כמות 20 טון, מפעל 1000, תאריך-אספקה בעוד שבוע, Account Assignment ריק (מלאי) ► שומר ► נוצרת PR מספר 10xxxxxx ב-EBAN, ממתינה לבחירת-מקור והמרה.",
          cbcHe: "ב-CBC רוב דרישות-חומרי-הגלם (סוכר, תרכיז, CO2) נוצרות אוטומטית מ-MRP לפי תכנון-הייצור; דרישות-MRO נוצרות ידנית כ-Shopping Cart על-ידי טכנאים.",
          navHe: [
            "Logistics ► Materials Management ► Purchasing ► Purchase Requisition ► Create (ME51N)",
            "Fiori ► Procurement ► Create Purchase Requisition",
          ],
          tables: ["EBAN", "EBKN"],
          tcodes: ["ME51N", "ME52N", "ME53N"],
          fiori: ["F1048", "F1643"],
          configHe: [
            "Document Type (NB) קובע טווח-מספרים ובקרת-שדות לדרישה.",
            "Field Selection (per Document Type / transaction) — חובה/אופציונלי/מוסתר לכל שדה.",
            "Account Assignment Category ברירת-מחדל לפי תרחיש (מלאי vs צריכה).",
          ],
          flow: [
            { he: "פתיחת PR", code: "ME51N", note: "ידני / MRP / Cart" },
            { he: "חומר + כמות + מפעל", code: "EBAN" },
            { he: "תאריך + Account Assignment", code: "EBKN" },
            { he: "שמירה", note: "PR מוכנה לבחירת-מקור" },
          ],
          masterDataHe: ["Material Master (תצוגת Purchasing/MRP) · Plant/Storage Location · Cost Center / Order לשיוך-חשבון."],
          mistakesHe: ["השארת מפעל שגוי — הדרישה מתוכננת/נרכשת במקום הלא-נכון.", "Account Assignment חסר בדרישת-צריכה — חוסם המרה ל-PO."],
          troubleshootHe: ["שמירת PR נכשלת ➔ שדה-חובה (Field Selection) חסר.", "PR לא נראית ב-MRP/רכש ➔ מפעל/Purchasing Group שגוי."],
          bestPracticeHe: ["העדף חומר עם master על-פני free-text.", "מלא Account Assignment מיד בדרישות-צריכה."],
          interviewHe: [
            { qHe: "באילו דרכים נוצרת דרישת-רכש?", aHe: "ידנית (ME51N / Fiori), אוטומטית מ-MRP, או מ-Shopping Cart בשירות-עצמי." },
            { qHe: "באיזו טבלה נשמרת ה-PR?", aHe: "EBAN (שורות) ו-EBKN (שיוך-חשבון לכל שורה)." },
          ],
          takeawaysHe: ["הדרישה = ה'אני צריך' הפותח את התהליך.", "נשמרת ב-EBAN.", "מקור: ידני / MRP / Shopping Cart."],
          relatedHe: [{ labelHe: "אובייקט · EBAN", href: "/library/mm/object/EBAN/" }],
        },
        {
          id: "5.2.2", titleHe: "מעקב טביעת-רגל פחמנית", titleEn: "Carbon Footprint Tracking",
          execHe: "S/4HANA מאפשר לשייך נתוני-פליטה (carbon footprint) לפריטי-רכש כבר בשלב הדרישה/ההזמנה — כך שהחלטות-רכש לוקחות בחשבון לא רק מחיר וזמינות אלא גם השפעה-סביבתית, בתמיכת יעדי-קיימות (ESG).",
          beginnerHe: "מעבר ל'כמה זה עולה', המערכת יכולה להראות 'כמה CO2 הפריט הזה פולט'. כך אפשר להעדיף ספק ירוק יותר. זה נתון נוסף שמופיע ליד הפריט בדרישה/בעגלה.",
          consultantHe: "היכולת נשענת על SAP Sustainability Footprint Management / Green Token ועל שדות-פליטה המשולבים בנתוני-המוצר ובמסמכי-הרכש. ערכי-פליטה (לרוב kg CO2e ליחידה) מגיעים מ-master data של המוצר/ספק ומוצגים ב-Manage Purchase Requisitions / Orders, ויכולים להזין דיווחי-קיימות.",
          purposeHe: "להטמיע שיקולי-קיימות בהחלטות-הרכש התפעוליות — לעמוד ביעדי-ESG, רגולציה ודרישות-לקוחות לשרשרת-אספקה ירוקה.",
          processExampleHe: "רוכש בוחר בין שני ספקי-בקבוקים: המחיר זהה, אך אפליקציית-הרכש מציגה לספק A פליטה של 0.8 kg CO2e ליחידה ולספק B 0.5 — הרוכש בוחר ב-B מתוך שיקול-קיימות, והבחירה מתועדת.",
          cbcHe: "ב-CBC, קוקה-קולה מציבה יעדי-קיימות לאריזה; מעקב-הפחמן מאפשר להעדיף ספקי-PET ממוחזר עם טביעת-רגל נמוכה, ולדווח על פליטות שרשרת-האספקה (Scope 3).",
          navHe: [
            "Fiori ► Sustainability ► Manage Footprint Inventory",
            "Materials Management ► Purchasing ► Sustainability / Footprint integration",
          ],
          tables: ["EKPO", "MARA"],
          tcodes: ["ME21N", "ME53N"],
          fiori: ["F0842A", "F1048"],
          configHe: [
            "הפעלת אינטגרציית Footprint Management ושיוך ערכי-פליטה ל-master של המוצר/ספק.",
            "הצגת שדות-פליטה במסכי-הדרישה/ההזמנה (Fiori).",
            "הגדרת יחידות-מדידה לפליטה (CO2e) ומקורות-הנתונים.",
          ],
          masterDataHe: ["Product footprint data (kg CO2e/unit) · Supplier sustainability ratings · ערכי-Scope 3 ברמת-הפריט."],
          mistakesHe: ["התייחסות לפליטה כשדה-תצוגה בלבד בלי לשלב בהחלטה.", "נתוני-פליטה לא-מתוחזקים ➔ דיווח-ESG שגוי."],
          troubleshootHe: ["אין נתוני-פליטה בפריט ➔ master לא הוזן או אינטגרציה לא פעילה.", "ערכים לא-עקביים ➔ יחידות-מדידה/מקורות שונים."],
          bestPracticeHe: ["תחזק נתוני-פליטה כחלק מ-onboarding של ספק/מוצר.", "שלב את הפליטה בקריטריוני-בחירת-מקור, לא רק בתצוגה."],
          interviewHe: [
            { qHe: "מדוע לשלב carbon footprint ברכש?", aHe: "כדי לכלול שיקולי-קיימות (ESG) בהחלטות-רכש — מעבר למחיר וזמינות — ולעמוד ברגולציה ובדרישות-לקוח." },
            { qHe: "מאיפה מגיעים נתוני-הפליטה?", aHe: "מ-master של המוצר/ספק ומ-SAP Sustainability Footprint Management, מוצגים במסמכי-הרכש." },
          ],
          takeawaysHe: ["מעקב-פחמן מוסיף ממד-קיימות לרכש.", "ערכי-CO2e ברמת-הפריט מזינים החלטה ודיווח.", "תומך ביעדי-ESG ושרשרת-אספקה ירוקה."],
        },
        {
          id: "5.2.3", titleHe: "מכירות בין-חברתיות מתקדמות", titleEn: "Advanced Intercompany Sales",
          execHe: "תרחיש בין-חברתי מתקדם שבו רכש בחברה אחת מקושר אוטומטית למכירה בחברה-קשורה (Advanced Intercompany Sales / Stock). הזמנת-רכש בחברה הקונה יוצרת בו-זמנית הזמנת-מכירה בחברה המוכרת, עם תמחור-העברה ורישומי-IC אוטומטיים.",
          beginnerHe: "כשחברה אחת בקבוצה קונה מחברה אחרת באותה קבוצה, צריך גם 'קנייה' וגם 'מכירה' שמסתנכרנות. התרחיש המתקדם עושה את זה אוטומטית: PO בצד-הקונה ► SO בצד-המוכר, עם המחיר-הפנימי, בלי הקלדה כפולה.",
          consultantHe: "Advanced Intercompany מבוסס על intercompany STO / sales-flow המופעל ב-S/4HANA: ה-PO בקוד-החברה הקונה מפעיל יצירת Sales Order בקוד-החברה המוכרת, עם Intercompany Billing, transfer pricing (condition PI01/IV01) ורישומי-CO-PA נפרדים לכל ישות. תומך ב-drop-shipment ובשרשראות-אספקה רב-ישותיות.",
          purposeHe: "לייעל סחר פנים-קבוצתי — לשקף נכון רווח/עלות בכל ישות, לעמוד בדרישות transfer-pricing, ולמנוע עבודה כפולה בין הצדדים.",
          processExampleHe: "חברת-ההפצה (CC 2000) מזמינה מוצר ממפעל-הייצור (CC 1000) ► PO ב-2000 יוצר אוטומטית SO ב-1000 ► המפעל מספק ► Intercompany Billing מ-1000 ל-2000 לפי transfer price ► כל ישות רושמת רווח/עלות נפרדים.",
          cbcHe: "ב-CBC קבוצת-הבקבוק כוללת ישויות-ייצור וישויות-הפצה נפרדות; משקאות 'נמכרים' ממפעל-הייצור לישות-ההפצה האזורית דרך תרחיש בין-חברתי מתקדם, עם תמחור-העברה פנימי.",
          navHe: [
            "Sales & Distribution ► Billing ► Intercompany Billing",
            "Materials Management ► Purchasing ► Purchase Order ► Intercompany / STO setup",
          ],
          tables: ["EKKO", "EKPO", "VBAK", "VBAP"],
          tcodes: ["ME21N", "VA01", "VF01"],
          fiori: ["F0842A", "F1873"],
          configHe: [
            "הגדרת Intercompany flow בין קודי-חברה ומפעלים (sales-area assignment).",
            "תנאי transfer pricing (PI01 / IV01) ל-Intercompany Billing.",
            "Document Types ו-Item Categories לתרחיש הבין-חברתי המתקדם.",
          ],
          masterDataHe: ["Plant ↔ Company Code · Customer/Supplier בין-חברתי (Business Partner) · תנאי-תמחור-העברה."],
          mistakesHe: ["חוסר תיאום בין מפעל לקוד-חברה ➔ ה-flow הבין-חברתי לא נוצר.", "transfer price לא-מוגדר ➔ Intercompany Billing נכשל."],
          troubleshootHe: ["SO לא נוצר מ-PO ➔ Intercompany flow / sales-area לא הוגדר.", "Billing בין-חברתי חסר ➔ תנאי PI01/IV01 לא מתוחזק."],
          bestPracticeHe: ["יישר master של מפעלים/קודי-חברה לפני הפעלת התרחיש.", "תקנן transfer-pricing מול הדרישות החשבונאיות והמיסויות."],
          interviewHe: [
            { qHe: "מה ייחודי ב-Advanced Intercompany Sales?", aHe: "PO בצד-הקונה יוצר אוטומטית SO בצד-המוכר, עם תמחור-העברה ו-Intercompany Billing — סחר פנים-קבוצתי מסונכרן ללא עבודה כפולה." },
          ],
          takeawaysHe: ["מקשר PO (קונה) ל-SO (מוכר) בין ישויות הקבוצה.", "כולל transfer pricing ו-Intercompany Billing.", "מייעל סחר פנים-קבוצתי."],
        },
        {
          id: "5.2.4", titleHe: "אישור ומשלוח-החזרה", titleEn: "Confirmation and Return Delivery",
          execHe: "Confirmation היא הודעת-ספק על מועד/כמות-אספקה צפויים (לפני הקבלה בפועל), המעדכנת את ה-PO ואת ה-MRP. Return Delivery היא החזרת-טובין לספק לאחר קבלה (איכות לקויה / עודף), עם תנועת-מלאי הפוכה ותיעוד.",
          beginnerHe: "Confirmation = 'הספק אמר: אשלח 100 יחידות ב-15 בחודש'. זה עוזר לתכנון לדעת מתי הסחורה באמת תגיע. Return Delivery = 'קיבלנו, אבל זה פגום — מחזירים לספק'. שתי הפעולות מעדכנות את המלאי ואת ההזמנה.",
          consultantHe: "Confirmations מוגדרות דרך Confirmation Control Key ברמת שורת-ה-PO (EKPO-BSTAE) — קובע אילו סוגי-אישור (AB=Order Ack, LA=Inbound Delivery) צפויים ובאיזה רצף. Return Delivery נרשמת ב-MIGO כתנועה 122 (החזרה ל-GR) או דרך Returns PO (EKPO-RETPO), ויוצרת MSEG הפוך ועדכון-EKBE. ב-S/4HANA Returns מנוהל גם דרך Advanced Returns Management.",
          purposeHe: "Confirmation משפרת את אמינות-התכנון (תאריכים ריאליים מהספק); Return Delivery מטפלת בכמות/איכות לקויה בצורה מתועדת ומבוקרת, עם השפעה נכונה על המלאי וה-IR.",
          processExampleHe: "PO ל-100 בקבוקים עם Confirmation Control Key 0004 ► הספק שולח Order Acknowledgement (AB) ל-100 ב-20 בחודש ► נרשמת Confirmation, MRP מעדכן תאריך ► בקבלה מתגלים 10 פגומים ► נרשמת Return Delivery (122) ל-10, החשבונית תשולם רק על 90.",
          cbcHe: "ב-CBC ספקי-תרכיז שולחים Order Acknowledgements שמעדכנים את תכנון-המילוי; אצוות-אריזה שנכשלו בבדיקת-QA מוחזרות לספק כ-Return Delivery (122) עם תיעוד-איכות.",
          navHe: [
            "Materials Management ► Purchasing ► Confirmations ► Define Confirmation Control",
            "Logistics ► Materials Management ► Inventory Management ► Goods Movement (MIGO) — Return Delivery 122",
          ],
          tables: ["EKES", "EKPO", "EKBE", "MSEG"],
          tcodes: ["ME21N", "MIGO", "ME23N"],
          fiori: ["F0842A", "F1990", "F3601"],
          configHe: [
            "Confirmation Control Key (BSTAE): אילו אישורים צפויים (AB/LA), GR-relevance ו-MRP-relevance.",
            "Movement Type 122 ל-Return Delivery; הגדרת סיבות-החזרה (Reason for movement).",
            "Advanced Returns Management להפעלת תהליך-החזרה מובנה (אופציונלי).",
          ],
          flow: [
            { he: "Confirmation מהספק", code: "EKES", note: "AB / LA" },
            { he: "עדכון תאריך ב-MRP", note: "תכנון מדויק" },
            { he: "קבלת-טובין", code: "MSEG 101" },
            { he: "Return Delivery", code: "MSEG 122", note: "פגום / עודף" },
            { he: "התאמת IR", note: "תשלום על תקין בלבד" },
          ],
          masterDataHe: ["Confirmation Control Key במאסטר/ב-PO · Reason for Movement · Vendor returns settings."],
          mistakesHe: ["שכחת Confirmation Control Key ➔ אין נראות-תאריך אמיתי מהספק.", "החזרה כ-GR שלילי במקום 122 ➔ עקיבות-החזרה לקויה."],
          troubleshootHe: ["Confirmation לא מתקבלת ➔ Control Key לא מצפה לסוג-האישור, או IDoc-Ack נכשל.", "החזרה לא מעדכנת חשבונית ➔ ה-122 לא קושר ל-PO/GR הנכון."],
          bestPracticeHe: ["הפעל Confirmation Control לפריטים קריטיים-לתכנון.", "השתמש בתנועה 122 ובסיבת-החזרה לכל החזרה — לא ב-GR שלילי."],
          interviewHe: [
            { qHe: "מה ההבדל בין Confirmation ל-Goods Receipt?", aHe: "Confirmation היא הצהרת-ספק צפויה (לפני הקבלה) המעדכנת תכנון; GR הוא הרישום בפועל של קבלת-הסחורה למלאי." },
            { qHe: "באיזו תנועה נרשמת Return Delivery?", aHe: "תנועה 122 (החזרה ל-GR) ב-MIGO, היוצרת MSEG הפוך ומעדכנת EKBE." },
          ],
          takeawaysHe: ["Confirmation = תאריך/כמות צפויים מהספק, משפר תכנון.", "Return Delivery = החזרת-טובין (תנועה 122).", "Confirmation Control Key שולט באישורים הצפויים."],
          relatedHe: [{ labelHe: "MM · עיבוד הזמנת-רכש (5.4)", href: "/library/mm/chapter-05/#sub-5.4" }],
        },
        {
          id: "5.2.5", titleHe: "Shopping Cart מול Requisition-to-Pay והגירה", titleEn: "Shopping Cart vs Requisition-to-Pay and Migrating",
          execHe: "השוואה אסטרטגית בין שני מודלים: Shopping Cart הקלאסי (SRM) מול תהליך Requisition-to-Pay המובְנֵה ב-S/4HANA, ושיקולי ההגירה ביניהם. ב-S/4HANA הכיוון הוא Self-Service Requisitioning בליבה / Ariba, ולא SRM נפרד.",
          beginnerHe: "פעם השתמשו במערכת נפרדת (SRM) ל'עגלות-קניות'. עכשיו S/4HANA עושה את זה בעצמה. אם ארגון מגיע מ-SRM, הוא צריך 'להגר' — לעבור לתהליך החדש המובְנֵה. הסעיף מסביר את ההבדלים ואיך עוברים.",
          consultantHe: "Shopping Cart הקלאסי הוא אובייקט-SRM נפרד; Requisition-to-Pay ב-S/4HANA מבוסס על אובייקט ה-PR בליבה עם Self-Service Requisitioning ו-flexible workflow. הגירה כוללת מיפוי Shopping Carts פתוחים ל-PRs, העברת קטלוגים ל-internal catalog / OCI, והמרת אישורי-SRM ל-flexible workflow. אלטרנטיבה: SAP Ariba Buying כענן-רכש. נדרשת החלטת-ארכיטקטורה: embedded vs Ariba.",
          purposeHe: "להחליט נכון על מודל-הרכש העתידי בעת מעבר ל-S/4HANA — להימנע מהשקעה ב-SRM שהופסק, ולבחור בין הפתרון המובְנֵה ל-Ariba לפי גודל וצרכים.",
          processExampleHe: "ארגון על SRM נכנס לפרויקט-S/4HANA ► ממפה את תהליכי-ה-Shopping-Cart ל-Self-Service Requisitioning ► מהגר קטלוגים ל-OCI ► בונה flexible workflow מקביל לאישורי-SRM ► מכבה את SRM לאחר העברת-עגלות פתוחות.",
          cbcHe: "ב-CBC, אם ישות הסתמכה על SRM ל-MRO, ההגירה ל-S/4HANA תעביר את עגלות-ה-MRO ל-Self-Service Requisitioning המובְנֵה, ותשמור על חוויית-המשתמש של הטכנאים.",
          navHe: [
            "Materials Management ► Purchasing ► Self-Service Procurement ► Activate / Migrate",
            "Migration Cockpit (LTMC / Migrate Your Data) — Open Purchase Requisitions",
          ],
          tables: ["EBAN", "EKKO", "EKPO"],
          tcodes: ["ME51N", "ME53N"],
          fiori: ["F1048", "F2026"],
          configHe: [
            "החלטת-ארכיטקטורה: Self-Service Requisitioning מובְנֵה מול SAP Ariba Buying.",
            "מיפוי Shopping Carts פתוחים ל-PRs ב-Migration Cockpit.",
            "העברת קטלוגים (internal / OCI) והמרת אישורי-SRM ל-flexible workflow.",
          ],
          mistakesHe: ["המשך-השקעה ב-SRM שהופסק.", "הגירת קטלוגים בלי לבדוק תאימות-OCI ➔ קטלוגים שבורים.", "אי-העברת עגלות-פתוחות לפני כיבוי-SRM ➔ אובדן-דרישות."],
          troubleshootHe: ["עגלות-SRM לא הומרו ➔ מיפוי-הגירה חסר.", "אישורים לא עובדים אחרי הגירה ➔ flexible workflow לא הוגדר במקביל ל-SRM."],
          bestPracticeHe: ["בחר את הפתרון העתידי מוקדם (embedded vs Ariba).", "הגר עגלות-פתוחות לפני כיבוי-SRM.", "בנה flexible workflow מקביל לפני המעבר."],
          interviewHe: [
            { qHe: "מה קורה ל-SRM ב-S/4HANA?", aHe: "SRM הקלאסי הופסק; הפונקציונליות עברה לליבה (Self-Service Requisitioning) או ל-SAP Ariba Buying." },
            { qHe: "מהם השלבים העיקריים בהגירה מ-Shopping Cart?", aHe: "מיפוי עגלות-פתוחות ל-PRs, העברת קטלוגים, והמרת אישורי-SRM ל-flexible workflow." },
          ],
          takeawaysHe: ["S/4HANA מחליף את SRM בתהליך מובְנֵה / Ariba.", "הגירה = מיפוי עגלות ל-PRs + קטלוגים + workflow.", "החלט מוקדם: embedded מול Ariba."],
        },
        {
          id: "5.2.6", titleHe: "תהליך אישורים (Workflow)", titleEn: "Workflow",
          execHe: "מנגנון האישורים ברכש התפעולי. ב-S/4HANA ה-flexible workflow מחליף את ה-release strategy הקלאסית — ניתוב-אישור מבוסס-תנאים (שווי, קטגוריה, מרכז-עלות) דרך אפליקציות-Fiori ('My Inbox'), ללא תכנות-workflow מורכב.",
          beginnerHe: "לפני שדרישה/הזמנה יוצאת לפועל, מישהו צריך לאשר אותה — בדרך-כלל מנהל. ה-workflow שולח את הבקשה לאדם-הנכון, הוא לוחץ 'אשר' או 'דחה' ב-Inbox, וההזמנה ממשיכה או נעצרת. הכל אוטומטי לפי כללים.",
          consultantHe: "flexible workflow (Manage Workflows for Purchase Requisitions / Orders) מוגדר דרך Fiori: Preconditions (start conditions) + Steps + Agent determination (role/responsibility/expression). מחליף את ה-Release Strategy הקלאסית (Release Group/Code/Strategy ב-CL classes). אישורים מתבצעים ב-'My Inbox' (F0862). תומך בשלבים מקבילים, eסקלציה ו-substitution. ה-Release Strategy הקלאסית עדיין נתמכת אך ה-flexible workflow מומלץ ב-greenfield.",
          purposeHe: "לאכוף הפרדת-תפקידים ובקרה-תקציבית — שאף התחייבות-רכש לא יוצאת ללא אישור-מורשה — בצורה גמישה, שקופה ונטולת-תכנות.",
          processExampleHe: "דרישת-רכש ב-50,000 ₪ נשמרת ► start condition מזהה שווי>10,000 ► ה-workflow מנתב למנהל-המחלקה (Inbox) ► הוא מאשר ► שווי>40,000 מפעיל שלב-שני למנהל-כספים ► אישור ► הדרישה משוחררת ומומרת ל-PO.",
          cbcHe: "ב-CBC הזמנות-רכש לחומרי-גלם בשווי-גבוה מנותבות ל-flexible workflow רב-שלבי (ראש-רכש ► מנהל-מפעל ► כספים), בעוד דרישות-MRO זניחות מאושרות אוטומטית מתחת לסף.",
          navHe: [
            "Fiori ► Manage Workflows for Purchase Requisitions / Purchase Orders",
            "Materials Management ► Purchasing ► Purchase Order ► Release Procedure (קלאסי — OMGS/OMGQ)",
          ],
          tables: ["EBAN", "EKKO", "SWWWIHEAD"],
          tcodes: ["ME54N", "ME28", "ME29N"],
          fiori: ["F0862", "F2418", "F1990A"],
          configHe: [
            "flexible workflow: Preconditions (שווי/קטגוריה/מפעל) + Steps + Agent determination.",
            "Agent determination: role / responsibility rule / expression למאשר.",
            "(קלאסי) Release Group / Release Code / Release Strategy עם Classification.",
          ],
          flow: [
            { he: "שמירת PR/PO", note: "טריגר workflow" },
            { he: "Start condition", note: "שווי / קטגוריה" },
            { he: "ניתוב למאשר", code: "My Inbox" },
            { he: "אישור / דחייה", code: "SWWWIHEAD" },
            { he: "שחרור", note: "המרה / שליחה לספק" },
          ],
          masterDataHe: ["מבנה-אישורים (responsibility / org) · תפקידי-מאשרים · ערכי-סף (thresholds) לשווי."],
          mistakesHe: ["Agent determination ללא substitute ➔ אישור תקוע בהיעדרות.", "ערבוב release strategy קלאסית עם flexible workflow לאותו מסמך."],
          troubleshootHe: ["אישור לא מגיע למאשר ➔ Agent determination שגוי / חסר.", "מסמך לא משתחרר ➔ start condition לא מתאים או שלב לא הושלם."],
          bestPracticeHe: ["העדף flexible workflow ב-greenfield על-פני release strategy קלאסית.", "הגדר substitutes ו-escalation למניעת-תקיעות.", "שמור על תנאי-התחלה פשוטים וברורים."],
          interviewHe: [
            { qHe: "מה החליף את ה-release strategy ב-S/4HANA?", aHe: "flexible workflow — ניתוב-אישור מבוסס-תנאים דרך Fiori ('My Inbox'), בלי תכנות-workflow קלאסי." },
            { qHe: "מהם שלושת מרכיבי שלב ב-flexible workflow?", aHe: "Precondition (תנאי-התחלה), Step (פעולת-האישור) ו-Agent determination (מי המאשר)." },
          ],
          takeawaysHe: ["flexible workflow = אישורים מבוססי-תנאים ב-Fiori.", "מחליף את ה-release strategy הקלאסית.", "אישורים מתבצעים ב-'My Inbox'."],
          relatedHe: [{ labelHe: "MM · קונפיג רכש בשירות-עצמי (5.7.1)", href: "/library/mm/chapter-05/#sub-5.7.1" }],
        },
        {
          id: "5.2.7", titleHe: "פונקציונליות-רכש מבוססת למידת-מכונה", titleEn: "Machine Learning–Based Purchasing Functionality",
          execHe: "S/4HANA משלב למידת-מכונה ברכש כדי לאוטמט ולשפר החלטות: סיווג-מקור אוטומטי, ניתוב-עגלות חכם, חיזוי-מחיר וזיהוי-חריגות. המטרה: להפוך את הרוכש מ'מקליד' ל'מקבל-החלטות', עם המלצות מבוססות-נתונים.",
          beginnerHe: "המערכת 'לומדת' מהיסטוריית-הרכש: היא יודעת לנחש לאיזה ספק כדאי, אם המחיר חריג, ולמי לנתב את האישור. כך פחות עבודה ידנית ופחות טעויות. זה כמו 'השלמה-אוטומטית' חכמה לרכש.",
          consultantHe: "יכולות-ML ברכש כוללות: Predictive analytics לחיזוי-תאריכי-אספקה, intelligent approval routing, automatic source-of-supply assignment, ו-anomaly/duplicate detection בחשבוניות. נשען על SAP S/4HANA embedded ML (Predictive Scenarios / Intelligent Scenario Lifecycle Management — ISLM) ועל SAP AI Core/Business AI. מודלים מאומנים על נתוני-EKKO/EKPO/EKBE היסטוריים, ומשולבים באפליקציות-Fiori כהמלצות.",
          purposeHe: "להגדיל יעילות ודיוק — לקצר זמני-מחזור, להפחית טעויות-הקלדה, לזהות סיכונים (חריגות-מחיר, חשבוניות-כפולות) ולשחרר רוכשים למשימות אסטרטגיות.",
          processExampleHe: "רוכש פותח PR ללא מקור ► מנוע-ה-ML מציע ספק מומלץ לפי היסטוריה, מחיר ואמינות-אספקה ► הרוכש מאשר בלחיצה ► בעת רישום-חשבונית, ה-ML מסמן חריגת-מחיר של 18% מעל הממוצע — הרוכש בודק לפני אישור.",
          cbcHe: "ב-CBC ML מציע אוטומטית את ספק-הסוכר המתאים לפי עונתיות ומחיר, וחוזה עיכובי-אספקה אפשריים בתקופות-שיא — מה שמאפשר תכנון-מילוי יציב.",
          navHe: [
            "Fiori ► Intelligent Scenario Lifecycle Management (ISLM)",
            "Materials Management ► Purchasing ► Machine Learning–Based Functionality (activation)",
          ],
          tables: ["EKKO", "EKPO", "EKBE"],
          tcodes: ["ME21N", "ME53N"],
          fiori: ["F0842A", "F1048", "F2660"],
          configHe: [
            "הפעלת Intelligent Scenarios (ISLM) ואימון/פריסה של מודלי-ML.",
            "הגדרת ספי-ביטחון (confidence) להצגת המלצות-ML.",
            "אינטגרציה ל-SAP AI Core / Business AI עבור תרחישים מתקדמים.",
          ],
          masterDataHe: ["נתוני-רכש היסטוריים (EKKO/EKPO/EKBE) כבסיס-אימון · דירוגי-ספקים · היסטוריית-מחירים."],
          mistakesHe: ["אמון-עיוור בהמלצות-ML בלי בקרת-אדם.", "אימון על נתונים מלוכלכים ➔ המלצות שגויות.", "הפעלה ללא ספי-ביטחון ➔ רעש-המלצות."],
          troubleshootHe: ["אין המלצות ➔ מודל לא אומן/נפרס (ISLM) או נתונים לא-מספיקים.", "המלצות גרועות ➔ נתוני-אימון מוטים / לא-מנוקים."],
          bestPracticeHe: ["שמור 'אדם-בלולאה' לאישור המלצות-ML קריטיות.", "נקה והעשר נתוני-אימון לפני פריסה.", "התחל בתרחיש-ML אחד ומדוד תועלת לפני הרחבה."],
          interviewHe: [
            { qHe: "אילו תרחישי-ML נפוצים ברכש?", aHe: "חיזוי-תאריכי-אספקה, סיווג-מקור אוטומטי, ניתוב-אישור חכם, וזיהוי-חריגות/כפילויות בחשבוניות." },
            { qHe: "מהו ISLM?", aHe: "Intelligent Scenario Lifecycle Management — הכלי ב-S/4HANA לניהול אימון, פריסה וניטור של מודלי-ML מובְנֵים." },
          ],
          takeawaysHe: ["ML הופך את הרוכש למקבל-החלטות מבוסס-נתונים.", "תרחישים: חיזוי-אספקה, סיווג-מקור, זיהוי-חריגות.", "נשען על ISLM ו-Business AI; שמור אדם-בלולאה."],
        },
      ],
    },
    // ============================================================ 5.3
    {
      id: "5.3", titleHe: "עיבוד דרישות", titleEn: "Requirements Processing",
      execHe:
        "עיבוד-דרישות הוא ניהול מחזור-החיים של דרישת-הרכש (EBAN): יצירה, שינוי, אישור, בחירת-מקור-אספקה (Source of Supply) והמרה להזמנת-רכש. זהו הצומת שבו הצורך הופך להתחייבות — אוטומטית (MRP) או ידנית — וכאן נקבע מאיזה ספק, באיזה מחיר ולפי איזה חוזה.",
      beginnerHe:
        "אחרי שיש דרישה ('אני צריך X'), צריך לטפל בה: לאשר אותה, להחליט מאיזה ספק לקנות, ולהפוך אותה להזמנה אמיתית. עיבוד-דרישות הוא כל ה'ניהול' של הדרישות עד שהן יוצאות לדרך כ-PO.",
      consultantHe:
        "הדרישה (EBAN) נושאת FRGKZ/FRGZU (סטטוס-שחרור), ובחירת-מקור נקבעת מ-Source List (EORD), Outline Agreement (EKAB) או Info Record (EINA/EINE). המרה ל-PO: ידנית (ME57/ME58), אוטומטית (ME59N — Automatic PO Creation), או דרך assignment (ME56). ב-S/4HANA אפליקציית 'Manage Purchase Requisitions' (Professional) ו-'Process Purchase Requisitions' מספקות עיבוד מרוכז עם בחירת-מקור והמרה. דרישות מ-MRP נושאות BSART ו-Auto-PO flag במאסטר.",
      purposeHe:
        "לגשר בין הצורך לביצוע באופן מבוקר: לאשר, להקצות מקור-אספקה נכון, ולהמיר ל-PO ביעילות — תוך אכיפת חוזים, מחירים ומדיניות-רכש.",
      processExampleHe:
        "MRP יוצר 30 דרישות-רכש לסוכר ► רוכש פותח 'Manage Purchase Requisitions' ► לכל דרישה המערכת מציעה מקור מ-Source List ► הרוכש מאשר את הבחירה ► מריץ ME59N להמרה-אוטומטית ל-POs ► 30 הזמנות נוצרות ונשלחות לספקי-החוזה.",
      cbcHe:
        "ב-CBC זרם דרישות-ה-MRP (סוכר, תרכיז, CO2, אריזה) מעובד יומית: בחירת-מקור אוטומטית מחוזי-מסגרת, והמרה אצווה ל-POs דרך ME59N — מבטיח אספקה רציפה לקווי-המילוי.",
      navHe: [
        "Logistics ► Materials Management ► Purchasing ► Purchase Requisition ► Follow-On Functions ► Create PO (ME57/ME58/ME59N)",
        "Materials Management ► Purchasing ► Purchase Requisition ► Release Procedure / Source Determination",
        "Fiori ► Procurement ► Manage / Process Purchase Requisitions",
      ],
      tables: ["EBAN", "EBKN", "EORD", "EKAB"],
      tcodes: ["ME51N", "ME52N", "ME54N", "ME56", "ME57", "ME59N"],
      fiori: ["F1048", "F2027", "F1643"],
      configHe: [
        "Source Determination: Source List (EORD), Info Records ו-Outline Agreements כמקורות-בחירה.",
        "Automatic PO flag במאסטר-ספק וב-Material — תנאי ל-ME59N.",
        "Release Procedure / flexible workflow לאישור-דרישות.",
        "Document Types ו-Number Ranges לדרישות (NB / ייעודיים).",
      ],
      flow: [
        { he: "דרישה נוצרת", code: "EBAN", note: "MRP / ידני" },
        { he: "אישור", note: "release / workflow" },
        { he: "בחירת-מקור", code: "EORD/EKAB", note: "Source of Supply" },
        { he: "המרה ל-PO", code: "ME59N", note: "אוטומטי / ידני" },
        { he: "PO לספק", code: "EKKO/EKPO" },
      ],
      masterDataHe: [
        "Source List (EORD) · Purchasing Info Record (EINA/EINE) · Outline Agreement.",
        "Auto-PO flag (Material + Vendor) · Purchasing Group / Organization.",
      ],
      mistakesHe: [
        "דרישות ללא Source of Supply ➔ לא ניתנות להמרה-אוטומטית.",
        "Auto-PO flag חסר ➔ ME59N מדלג על הדרישה.",
        "אי-אישור דרישות ➔ נתקעות ולא מומרות.",
      ],
      troubleshootHe: [
        "ME59N לא יוצר PO ➔ חסר Source, Auto-PO flag, או דרישה לא-משוחררת.",
        "מקור-אספקה לא נמצא ➔ Source List לא-תקף לתאריך או Info Record חסר.",
        "דרישה תקועה ➔ release strategy / workflow לא הושלם.",
      ],
      bestPracticeHe: [
        "תחזק Source List לחומרים חוזרים — מאפשר המרה-אוטומטית.",
        "השתמש ב-ME59N ל-bulk conversion של דרישות-MRP.",
        "נטר דרישות-פתוחות (aging) שלא הומרו.",
      ],
      interviewHe: [
        { qHe: "אילו מקורות-אספקה קובעים את הספק לדרישה?", aHe: "Source List (EORD), Outline Agreement (חוזה) ו-Purchasing Info Record (EINA/EINE)." },
        { qHe: "מה עושה ME59N?", aHe: "Automatic PO Creation — ממיר דרישות-רכש מאושרות עם מקור ל-POs באצווה." },
        { qHe: "מה התנאים ל-Auto-PO?", aHe: "Source of Supply מוקצה, דרישה משוחררת, ו-Auto-PO flag במאסטר-ספק ובמאסטר-החומר." },
      ],
      takeawaysHe: [
        "עיבוד-דרישות = אישור + בחירת-מקור + המרה ל-PO.",
        "Source List / חוזה / Info Record קובעים את הספק.",
        "ME59N ממיר דרישות לאצוות-POs אוטומטית.",
      ],
      relatedHe: [
        { labelHe: "MM · עיבוד הזמנת-רכש (5.4)", href: "/library/mm/chapter-05/#sub-5.4" },
        { labelHe: "אובייקט · EBAN", href: "/library/mm/object/EBAN/" },
      ],
    },
    // ============================================================ 5.4
    {
      id: "5.4", titleHe: "עיבוד הזמנת-רכש", titleEn: "Purchase Order Processing",
      execHe:
        "הזמנת-הרכש (Purchase Order) היא ההתחייבות החוזית המחייבת לספק — מה, כמה, במחיר כמה, מתי ולאן. עיבוד-PO כולל יצירה, שינוי, אישור, שליחה לספק, מעקב וקבלת-טובין/חשבונית. ה-PO (EKKO/EKPO) הוא המסמך המרכזי של הרכש התפעולי ונקודת-העוגן ל-Three-Way-Match.",
      beginnerHe:
        "הזמנת-רכש היא ה'מסמך הרשמי' ששולחים לספק: 'אנא ספק לי 100 בקבוקים ב-2 ₪ כל אחד, עד ה-15 בחודש, למפעל 1000'. מרגע שהספק מקבל אותה, יש התחייבות הדדית. כל מה שקורה אחר-כך (קבלה, חשבונית, תשלום) מתייחס להזמנה הזו.",
      consultantHe:
        "ה-PO מורכב מ-EKKO (כותרת: ספק, ארגון-רכש, מטבע, תנאי-תשלום), EKPO (שורות: חומר, כמות, מחיר, מפעל, Account Assignment, Item Category) ו-EKET (לוחות-זמנים). מחיר נקבע מ-Pricing Procedure (תנאי PB00/RM0000). תנועות מצטברות ב-EKBE (GR/IR). Item Categories: סטנדרט / L (Subcontracting) / K (Consignment) / D (Service) / U (STO). יצירה: ME21N, מ-PR (ME21N עם reference), או ME59N. ב-S/4HANA 'Manage Purchase Orders' (F0842A) ו-'Create Purchase Order Advanced' הן הממשק.",
      purposeHe:
        "לעגן את ההתחייבות מול הספק במסמך אחד, מחייב ומתועד, שהוא הבסיס לקבלה, לחשבונית, לתשלום ולבקרה (commitment ב-CO). ה-PO מבטיח שכל צד יודע בדיוק מה הוסכם.",
      processExampleHe:
        "רוכש פותח ME21N ► ספק, ארגון-רכש 1000 ► שורה: 100 בקבוקים, 2 ₪, מפעל 1000, תאריך-אספקה ► מחיר נקבע אוטומטית מ-Info Record ► שמירה ► flexible workflow מאשר ► ה-PO נשלחת לספק (Output) ► בקבלה: GR 101 (EKBE) ► בחשבונית: MIRO, Three-Way-Match משחרר לתשלום.",
      cbcHe:
        "ב-CBC הזמנות-רכש לתרכיז, סוכר, CO2 ובקבוקים מבוססות על חוזי-מסגרת; הזמנות-MRO לחלפי-קווים נוצרות מ-Shopping Carts. כל PO נשלחת דרך SAP Business Network, ומעקב-האספקה מתבצע מול ה-EKET.",
      navHe: [
        "Logistics ► Materials Management ► Purchasing ► Purchase Order ► Create (ME21N)",
        "Materials Management ► Purchasing ► Purchase Order ► Define Document Types / Screen Layout",
        "Fiori ► Procurement ► Manage Purchase Orders / Create Purchase Order",
      ],
      tables: ["EKKO", "EKPO", "EKET", "EKBE"],
      tcodes: ["ME21N", "ME22N", "ME23N", "ME29N", "ME9F", "MIGO", "MIRO"],
      fiori: ["F0842A", "F1990", "F2229"],
      configHe: [
        "Document Types (NB רגיל / FO framework / UB stock-transport) — טווחי-מספרים, Item Categories מותרים.",
        "Screen Layout at Document Level — בקרת-שדות (חובה/אופציונלי/מוסתר) לכל סוג.",
        "Pricing Procedure (תנאי PB00 + מסים/הנחות) לקביעת-מחיר אוטומטית.",
        "Output / Message Determination לשליחת ה-PO (הדפסה / IDoc / Business Network).",
      ],
      flow: [
        { he: "יצירת PO", code: "EKKO/EKPO", note: "ME21N / מ-PR" },
        { he: "קביעת-מחיר", note: "Pricing Procedure" },
        { he: "אישור", code: "ME29N", note: "flexible workflow" },
        { he: "שליחה לספק", code: "ME9F", note: "Output / IDoc / BN" },
        { he: "Goods Receipt", code: "EKBE 101" },
        { he: "Invoice + Match", code: "MIRO" },
      ],
      masterDataHe: [
        "Vendor / Business Partner · Purchasing Info Record (מחיר) · Outline Agreement (חוזה).",
        "Material Master (Purchasing) · Pricing Conditions · Output Condition Records.",
      ],
      mistakesHe: [
        "Item Category שגוי (סטנדרט במקום L/K/D) ➔ תהליך-קבלה/חשבונית שגוי.",
        "Account Assignment חסר בהזמנת-צריכה ➔ העלות לא נזקפת.",
        "Output לא מוגדר ➔ ה-PO לא מגיעה לספק.",
        "שינוי-PO לאחר GR ללא בקרה ➔ פערי-Three-Way-Match.",
      ],
      troubleshootHe: [
        "PO לא נשלחת ➔ Message determination / Output condition חסר.",
        "מחיר שגוי ב-PO ➔ Info Record / Pricing Procedure לא-תקין.",
        "לא ניתן לבצע GR ➔ ה-PO לא משוחררת או Confirmation חסרה.",
        "חשבונית חסומה ➔ חריגת-Three-Way-Match מעבר ל-tolerance.",
      ],
      bestPracticeHe: [
        "צור PO תמיד מתוך PR/חוזה — לא הקלדה ידנית 'יש-מאין'.",
        "אכוף Item Category נכון לפי תרחיש (Subcontracting/Consignment/Service).",
        "הגדר Output אוטומטי (IDoc / Business Network) למזעור עבודה ידנית.",
        "נעל שינויי-PO לאחר GR או נהל דרך גרסאות (version management).",
      ],
      interviewHe: [
        { qHe: "מאילו רכיבים מורכב ה-PO?", aHe: "EKKO (כותרת), EKPO (שורות), EKET (לוחות-זמנים); תנועות מצטברות ב-EKBE." },
        { qHe: "מהן Item Categories עיקריות ב-PO?", aHe: "סטנדרט, L=Subcontracting, K=Consignment, D=Service, U=Stock Transport — כל אחת משנה את תהליך-הקבלה/החשבונית." },
        { qHe: "כיצד נקבע מחיר ה-PO?", aHe: "מ-Pricing Procedure (תנאי PB00 + מסים/הנחות), בדרך-כלל ברירת-מחדל מ-Purchasing Info Record או חוזה." },
      ],
      takeawaysHe: [
        "ה-PO = ההתחייבות החוזית המרכזית (EKKO/EKPO/EKET).",
        "Item Category קובעת את אופי התהליך.",
        "מחיר מ-Pricing Procedure; שליחה דרך Output/IDoc/Business Network.",
        "ה-PO היא עוגן ה-Three-Way-Match.",
      ],
      relatedHe: [
        { labelHe: "MM · שיתוף-פעולה בהזמנות-רכש (5.6)", href: "/library/mm/chapter-05/#sub-5.6" },
        { labelHe: "אובייקט · EKPO", href: "/library/mm/object/EKPO/" },
      ],
    },
    // ============================================================ 5.5
    {
      id: "5.5", titleHe: "רכש שירותים ואישור-שירות", titleEn: "Service Purchasing and Service Confirmation",
      execHe:
        "רכש-שירותים שונה מרכש-חומרים: אין סחורה פיזית אלא ביצוע (תחזוקה, ייעוץ, הובלה). ב-S/4HANA רכש-שירותים מנוהל דרך Lean Services (Item Category D עם שורות-שירות) או Service Master, וה'קבלה' היא Service Confirmation / Entry Sheet (אישור שהשירות בוצע) במקום Goods Receipt.",
      beginnerHe:
        "כשקונים שירות (למשל 'תיקון מנוע' או '40 שעות-ייעוץ') אין חבילה שמגיעה. במקום 'קיבלתי סחורה' מאשרים 'השירות בוצע' — דרך גיליון-אישור (Service Entry Sheet). רק אחרי האישור משלמים לספק.",
      consultantHe:
        "מודל קלאסי: Service Master (ASMD), External Service Management עם Item Category D, גיליון-שירות (ML81N) ב-ESLL/ESSR. ב-S/4HANA הוצג Lean Services — שורות-שירות ישירות ב-PO (ללא Service Master מלא), עם Service Entry Sheet מודרני ('Manage Service Entry Sheets', F2027). אישור-השירות יוצר GR-equivalent ומפעיל את ה-Two/Three-Way-Match לחשבונית. Limit items (FO) מאפשרים תקרת-הוצאה ללא כמות-מוגדרת.",
      purposeHe:
        "לנהל רכש לא-מוחשי בצורה מבוקרת — להזמין שירות, לאשר ביצוע בפועל (כמה שעות/יחידות), ולשלם רק על העבודה שאושרה — עם בקרה ותיעוד מלאים.",
      processExampleHe:
        "PO-שירות (Item Category D) ל-'תחזוקת קו-מילוי, 40 שעות, 300 ₪/שעה' ► הקבלן מבצע 35 שעות ► נרשם Service Entry Sheet ל-35 שעות (ML81N / Fiori) ► אישור ה-Entry Sheet יוצר GR-equivalent ► הספק שולח חשבונית, MIRO מתאים מול ה-Entry Sheet ► תשלום על 35 שעות בלבד.",
      cbcHe:
        "ב-CBC שירותי-תחזוקה לקווי-המילוי (כיול, תיקונים, ניקוי-CIP חיצוני) נרכשים כשירותים; הטכנאי מאשר את השעות שבוצעו ב-Service Entry Sheet, ורק אז משוחררת החשבונית לתשלום.",
      navHe: [
        "Materials Management ► External Services Management ► Service Master / Lean Services",
        "Logistics ► MM ► Service Entry Sheet ► Maintain (ML81N)",
        "Fiori ► Procurement ► Manage Service Entry Sheets / Create Service Entry Sheet",
      ],
      tables: ["ESLL", "ESSR", "ASMD", "EKPO"],
      tcodes: ["ME21N", "ML81N", "AC03", "MIRO"],
      fiori: ["F2027", "F0842A", "F1645"],
      configHe: [
        "Item Category D + Account Assignment (K/F/P) לשורות-שירות.",
        "Lean Services activation — שורות-שירות ישירות ב-PO ללא Service Master מלא.",
        "Service Entry Sheet acceptance ו-tolerance מול ה-PO.",
        "Limit items (FO) לתקרת-הוצאה ללא כמות-קבועה.",
      ],
      flow: [
        { he: "PO-שירות", code: "EKPO (D)", note: "שורות-שירות / Limit" },
        { he: "ביצוע השירות", note: "ע\"י הספק" },
        { he: "Service Entry Sheet", code: "ESSR", note: "ML81N / Fiori" },
        { he: "אישור (Acceptance)", note: "GR-equivalent" },
        { he: "חשבונית + Match", code: "MIRO" },
      ],
      masterDataHe: [
        "Service Master (ASMD) או Lean service lines · Account Assignment (Cost Center / Order / Project).",
        "Conditions למחיר-שירות · Limit values לפריטי-FO.",
      ],
      mistakesHe: [
        "אישור Entry Sheet על כמות שלא בוצעה ➔ תשלום-יתר.",
        "שימוש בחומר-מלאי לשירות במקום Item Category D.",
        "Limit item ללא תקרה ➔ אובדן-בקרה תקציבית.",
      ],
      troubleshootHe: [
        "לא ניתן לרשום Entry Sheet ➔ ה-PO אינו service item (D) או לא-משוחרר.",
        "חשבונית-שירות חסומה ➔ Entry Sheet לא אושר או חרג מהתקרה.",
        "כמות-שירות חורגת ➔ tolerance מול ה-PO הופר.",
      ],
      bestPracticeHe: [
        "השתמש ב-Lean Services ב-S/4HANA במקום Service Master כבד.",
        "אשר Entry Sheets רק על ביצוע בפועל — בקרה מול תקרה.",
        "הגדר Limit items בזהירות עם תקרות-הוצאה ברורות.",
      ],
      interviewHe: [
        { qHe: "מה מחליף Goods Receipt ברכש-שירות?", aHe: "Service Entry Sheet (אישור-ביצוע השירות), המהווה GR-equivalent ומפעיל את ה-Match לחשבונית." },
        { qHe: "מהו Lean Services ב-S/4HANA?", aHe: "מודל מפושט לשורות-שירות ישירות ב-PO (ללא Service Master מלא), עם Service Entry Sheet מודרני ב-Fiori." },
        { qHe: "מהו Limit item?", aHe: "פריט (FO) עם תקרת-הוצאה ללא כמות-מוגדרת, לשירותים בלתי-צפויים בגבול-תקציב." },
      ],
      takeawaysHe: [
        "רכש-שירות = ביצוע, לא סחורה פיזית.",
        "אישור דרך Service Entry Sheet (ESSR) במקום GR.",
        "S/4HANA: Lean Services + Item Category D + Limit items.",
      ],
      relatedHe: [
        { labelHe: "MM · עיבוד הזמנת-רכש (5.4)", href: "/library/mm/chapter-05/#sub-5.4" },
        { labelHe: "אובייקט · ESLL", href: "/library/mm/object/ESLL/" },
      ],
    },
    // ============================================================ 5.6
    {
      id: "5.6", titleHe: "שיתוף-פעולה בהזמנות-רכש", titleEn: "Purchase Order Collaboration",
      execHe:
        "שיתוף-פעולה בהזמנות-רכש הוא חיבור דיגיטלי ישיר בין הקונה לספק — לרוב דרך SAP Business Network (לשעבר Ariba Network). ה-PO נשלחת אלקטרונית, הספק מאשר/מציע-שינוי, שולח Confirmation, ASN (Advance Shipping Notification) וחשבונית — הכל ללא נייר ובזמן-אמת.",
      beginnerHe:
        "במקום לשלוח לספק PO בדוא\"ל ולחכות לטלפון, מחברים את שתי המערכות. הספק רואה את ההזמנה במסך שלו, מאשר, מודיע מתי ישלח, ושולח חשבונית — והכל זורם אוטומטית בחזרה ל-SAP. פחות טעויות, פחות עיכובים.",
      consultantHe:
        "השילוב נשען על SAP Business Network: ה-PO נשלחת כ-cXML/IDoc (ORDERS), הספק מחזיר Order Confirmation (ORDRSP→EKES), ASN (DESADV→Inbound Delivery), ו-Invoice (INVOIC→MIRO). מחייב הגדרת Output/Message determination, Trading Partner setup, ו-mapping. Supplier portal מאפשר אינטראקציה גם לספקים ללא ERP. תומך ב-document flow מלא וב-exception handling דו-כיווני. אלטרנטיבות: EDI ישיר, SAP Ariba.",
      purposeHe:
        "להפוך את התקשורת עם הספק לדיגיטלית, מהירה ושקופה — להפחית טעויות-הקלדה, לקצר זמני-מחזור, ולקבל נראות בזמן-אמת על מצב-ההזמנה (אושרה / נשלחה / חויבה).",
      processExampleHe:
        "PO נשלחת דרך SAP Business Network ► הספק רואה אותה בפורטל, מאשר ומחזיר Order Confirmation (EKES) ► לקראת-משלוח שולח ASN, שיוצר Inbound Delivery ב-SAP ► בקבלה GR מתבצע מול ה-ASN ► הספק שולח חשבונית אלקטרונית, שנכנסת ישירות ל-MIRO ל-Three-Way-Match.",
      cbcHe:
        "ב-CBC ספקי-תרכיז, סוכר ואריזה מחוברים ל-SAP Business Network; הזמנות-רכש, אישורים, ASNs וחשבוניות זורמים אוטומטית — מבטיח אספקה רציפה ושקופה לקווי-המילוי ללא טיפול-נייר ידני.",
      navHe: [
        "Materials Management ► Purchasing ► Messages / Output Determination",
        "SAP Business Network integration ► Trading Partner / Document Mapping",
        "Fiori ► Procurement ► Monitor Purchase Order Collaboration",
      ],
      tables: ["EKKO", "EKES", "EKPO", "EKBE"],
      tcodes: ["ME21N", "ME9F", "WE02", "MIRO"],
      fiori: ["F0842A", "F1990", "F2660A"],
      configHe: [
        "Output / Message Determination (ORDERS) לשליחת ה-PO אלקטרונית.",
        "הגדרת SAP Business Network / Trading Partner ו-document mapping (cXML/IDoc).",
        "Inbound processing ל-Order Confirmation (ORDRSP), ASN (DESADV) ו-Invoice (INVOIC).",
        "Confirmation Control Key לקליטת אישורים ו-ASNs מהספק.",
      ],
      flow: [
        { he: "שליחת PO", code: "ORDERS", note: "Business Network" },
        { he: "Order Confirmation", code: "EKES", note: "ORDRSP" },
        { he: "ASN", note: "DESADV → Inbound Delivery" },
        { he: "Goods Receipt", code: "EKBE", note: "מול ASN" },
        { he: "e-Invoice", code: "INVOIC → MIRO" },
      ],
      masterDataHe: [
        "Business Partner עם רשומת-תקשורת (ANID / Trading Partner) · Output Condition Records.",
        "Confirmation Control Key · Vendor EDI/Network profile.",
      ],
      mistakesHe: [
        "Output לא מוגדר ➔ ה-PO לא נשלחת דיגיטלית.",
        "Mapping שגוי ➔ Confirmation/Invoice נכשלים בקליטה.",
        "Trading Partner חסר ➔ אין חיבור לספק ב-Network.",
      ],
      troubleshootHe: [
        "PO לא הגיעה לספק ➔ Message determination / Network mapping תקול.",
        "Confirmation לא נקלטה ➔ Confirmation Control Key / IDoc ORDRSP נכשל (WE02).",
        "e-Invoice נדחתה ➔ mapping או Three-Way-Match שגוי.",
      ],
      bestPracticeHe: [
        "חבר ספקים אסטרטגיים ל-SAP Business Network לאוטומציה מלאה.",
        "נטר IDocs (WE02) ו-document flow ל-exception handling מהיר.",
        "אכוף Confirmation/ASN לפריטים קריטיים-לתכנון.",
      ],
      interviewHe: [
        { qHe: "מהו SAP Business Network בהקשר רכש?", aHe: "פלטפורמת שיתוף-פעולה (לשעבר Ariba Network) המחברת קונה-ספק לשליחת PO, אישורים, ASNs וחשבוניות אלקטרוניות בזמן-אמת." },
        { qHe: "אילו מסמכים זורמים דו-כיוונית?", aHe: "PO (ORDERS) החוצה; Order Confirmation (ORDRSP→EKES), ASN (DESADV→Inbound Delivery) ו-Invoice (INVOIC→MIRO) פנימה." },
      ],
      takeawaysHe: [
        "שיתוף-פעולה = חיבור דיגיטלי ישיר קונה↔ספק.",
        "SAP Business Network מזרים PO/Confirmation/ASN/Invoice.",
        "מפחית טעויות ומקצר זמני-מחזור עם נראות בזמן-אמת.",
      ],
      relatedHe: [
        { labelHe: "MM · עיבוד הזמנת-רכש (5.4)", href: "/library/mm/chapter-05/#sub-5.4" },
        { labelHe: "MM · אישור ומשלוח-החזרה (5.2.4)", href: "/library/mm/chapter-05/#sub-5.2.4" },
      ],
    },
    // ============================================================ 5.7
    {
      id: "5.7", titleHe: "קונפיגורציה של רכש תפעולי", titleEn: "Configuring Operational Procurement",
      execHe:
        "סעיף-הקונפיגורציה מרכז את ההגדרות ב-SPRO המפעילות את הרכש התפעולי: Self-Service Requisitioning, פונקציות-ML, עיבוד-דרישות, עיבוד-PO, שיתוף-פעולה ו-SuccessFactors. הקונפיגורציה הנכונה היא ההבדל בין תהליך זורם לבין חיכוך-יומיומי.",
      beginnerHe:
        "כדי שכל מה שלמדנו יעבוד, צריך 'להדליק מתגים' ב-SPRO — להגדיר סוגי-מסמכים, שיוכי-חשבון, מקורות-אספקה, workflow ואינטגרציות. תת-הסעיפים כאן עוברים על כל קבוצת-הגדרות בנפרד.",
      consultantHe:
        "הקונפיגורציה מתפרסת על Materials Management ► Purchasing ב-SPRO: Document Types, Account Assignment, Item Categories, Release/Workflow, Source Determination, Output, ועל אינטגרציות (Business Network, SuccessFactors, ML/ISLM). כל תת-סעיף ממפה לאזור-IMG ספציפי. סדר-העבודה: מבנה-ארגוני ► סוגי-מסמכים ► בקרת-שדות ► קביעת-מקור ► תמחור ► פלט ► workflow ► אינטגרציות.",
      purposeHe:
        "לתרגם את דרישות-העסק להתנהגות-מערכת — לקבוע כיצד נראות ומתנהגות הדרישות, ההזמנות, האישורים והאינטגרציות בכל תרחיש-רכש.",
      processExampleHe:
        "צוות-המימוש מגדיר ב-SPRO: Document Type לדרישות-Self-Service, Account Assignment ברירת-מחדל, Source List, flexible workflow לאישור, ו-Output ל-Business Network ► בודק תהליך מקצה-לקצה ► מעלה לפרודקשן.",
      cbcHe:
        "ב-CBC הקונפיגורציה מותאמת לתרחישי-הרכש: חומרי-גלם (MRP→PO אוטומטי), אריזה (חוזי-מסגרת), MRO (Self-Service), ושירותי-תחזוקה (Lean Services) — כל אחד עם סוגי-מסמכים, שיוכי-חשבון ו-workflow משלו.",
      navHe: [
        "SPRO ► Materials Management ► Purchasing (אזור-העל לכל הקונפיגורציה)",
        "SPRO ► Materials Management ► Purchasing ► Purchase Requisition / Purchase Order",
        "SPRO ► Integration with Other Components (Business Network / SuccessFactors)",
      ],
      tables: ["T161", "T163", "EBAN", "EKKO"],
      tcodes: ["SPRO", "OMET", "ME21N", "ME51N"],
      fiori: ["F0842A", "F1048"],
      configHe: [
        "מבנה-ארגוני: Purchasing Organization / Group / Plant assignment.",
        "Document Types + Number Ranges ל-PR ו-PO.",
        "Account Assignment Categories ו-Item Categories.",
        "Source Determination, Pricing, Output ו-flexible workflow.",
      ],
      flow: [
        { he: "מבנה-ארגוני", note: "Org/Group/Plant" },
        { he: "סוגי-מסמכים", code: "T161/T163" },
        { he: "בקרת-שדות + שיוך", note: "Field/Account" },
        { he: "מקור + תמחור + פלט", note: "Source/Pricing/Output" },
        { he: "workflow + אינטגרציות", note: "BN / SuccessFactors / ML" },
      ],
      masterDataHe: ["Org structure (Purchasing Org/Group) · Document Types · Account Assignment Categories · Item Categories."],
      mistakesHe: [
        "קונפיגורציה ללא תיאום עם FI/CO ➔ שיוכי-חשבון שגויים.",
        "ריבוי Document Types מיותרים ➔ בלבול ותחזוקה.",
        "דילוג על בדיקת-תהליך מקצה-לקצה לפני פרודקשן.",
      ],
      troubleshootHe: [
        "תהליך-רכש לא עובד ➔ חסר Document Type / Account Assignment / Source.",
        "אינטגרציה כושלת ➔ Business Network / SuccessFactors mapping לא הוגדר.",
        "אישורים לא רצים ➔ flexible workflow לא הופעל.",
      ],
      bestPracticeHe: [
        "עבוד לפי סדר-IMG: מבנה ► מסמכים ► שדות ► מקור ► תמחור ► פלט ► workflow ► אינטגרציות.",
        "תקנן Document Types — מעטים וברורים.",
        "בדוק כל תרחיש מקצה-לקצה ב-QA לפני פרודקשן.",
      ],
      interviewHe: [
        { qHe: "מהו סדר-העבודה הנכון בקונפיגורציית-רכש?", aHe: "מבנה-ארגוני ► סוגי-מסמכים ► בקרת-שדות/שיוך-חשבון ► קביעת-מקור ► תמחור ► פלט ► workflow ► אינטגרציות." },
        { qHe: "היכן ב-SPRO יושבת קונפיגורציית-הרכש?", aHe: "Materials Management ► Purchasing, עם ענפי-משנה ל-PR, PO, Source Determination, Output ואינטגרציות." },
      ],
      takeawaysHe: [
        "הקונפיגורציה מפעילה את כל הרכש התפעולי דרך SPRO.",
        "מסגרת: מבנה ► מסמכים ► שדות ► מקור ► תמחור ► פלט ► workflow.",
        "תת-הסעיפים מכסים Self-Service, ML, דרישות, PO, שיתוף-פעולה ו-SuccessFactors.",
      ],
      relatedHe: [
        { labelHe: "MM · רכש בשירות-עצמי (5.2)", href: "/library/mm/chapter-05/#sub-5.2" },
        { labelHe: "MM · עיבוד הזמנת-רכש (5.4)", href: "/library/mm/chapter-05/#sub-5.4" },
      ],
      children: [
        {
          id: "5.7.1", titleHe: "קונפיגורציה של דרישות בשירות-עצמי", titleEn: "Self-Service Procurement Requisitioning",
          execHe: "הגדרת ה-Self-Service Requisitioning ב-S/4HANA: הפעלת התרחיש, סוגי-מסמכים לעגלת-קניות, קטלוגים, שיוך-חשבון ברירת-מחדל ו-flexible workflow לאישור — המאפשרים למשתמש-העסקי לבקש בעצמו.",
          beginnerHe: "כאן 'מדליקים' את הרכש בשירות-עצמי: מאיזה קטלוג בוחרים, איזה מסמך נוצר, מי מאשר ולאן נזקפת העלות. בלי ההגדרות האלה ה-Shopping Cart לא יעבוד.",
          consultantHe: "מפעילים Self-Service Requisitioning, מגדירים Document Type ייעודי, מקצים internal catalog / OCI, קובעים Account Assignment ברירת-מחדל (K=Cost Center של המבקש), ומחברים flexible workflow לאישור. ה-PR (EBAN) הוא האובייקט הנוצר ברקע.",
          purposeHe: "לאפשר רכש-מבוזר-מבוקר — משתמשים מבקשים בעצמם, אך תחת קטלוגים מאושרים, שיוך-חשבון נכון ואישור-תקציבי.",
          processExampleHe: "Admin מפעיל את התרחיש, מגדיר Document Type 'ZSC', מקצה קטלוג-משרד, קובע K כברירת-מחדל, ובונה workflow מבוסס-שווי ► משתמש פותח Shopping Cart ומבקש ► PR נוצרת ומנותבת.",
          cbcHe: "ב-CBC מוגדר קטלוג-MRO לטכנאים, עם Account Assignment ל-Cost Center של התחזוקה ו-workflow לאישור ראש-הצוות.",
          navHe: ["SPRO ► Materials Management ► Purchasing ► Self-Service Procurement / Activate Self-Service Requisitioning"],
          tables: ["EBAN", "EBKN"],
          tcodes: ["ME51N", "ME53N", "SPRO"],
          fiori: ["F1048", "F2026"],
          configHe: ["הפעלת Self-Service Requisitioning + Document Type ייעודי.", "ניהול קטלוגים (internal / OCI) ושיוכם למשתמשים.", "Account Assignment ברירת-מחדל + flexible workflow לאישור."],
          mistakesHe: ["הפעלה ללא קטלוג ➔ הכל free-text.", "ללא Account Assignment ברירת-מחדל ➔ דרישות חסומות.", "ללא workflow ➔ אין בקרה תקציבית."],
          troubleshootHe: ["עגלה לא הופכת ל-PR ➔ התרחיש לא מופעל / Document Type חסר.", "אין פריטים ➔ קטלוג לא מוקצה למשתמש."],
          bestPracticeHe: ["העדף קטלוגים מאושרים-מראש.", "קבע Account Assignment ברירת-מחדל למבקש.", "workflow פשוט מבוסס-שווי."],
          interviewHe: [{ qHe: "מה נדרש להפעלת Self-Service Requisitioning?", aHe: "הפעלת התרחיש, Document Type ייעודי, קטלוגים, Account Assignment ברירת-מחדל ו-flexible workflow." }],
          takeawaysHe: ["מפעיל את ה-Shopping Cart בליבת S/4HANA.", "PR נוצרת ברקע מהעגלה.", "דורש קטלוג + שיוך-חשבון + workflow."],
          relatedHe: [{ labelHe: "MM · רכש בשירות-עצמי (5.2)", href: "/library/mm/chapter-05/#sub-5.2" }],
        },
        {
          id: "5.7.2", titleHe: "קונפיגורציה של פונקציות-רכש מבוססות-ML", titleEn: "Machine Learning–Based Procurement Functionality",
          execHe: "הגדרת תרחישי למידת-המכונה ברכש: הפעלת Intelligent Scenarios (ISLM), אימון ופריסה של מודלים, ספי-ביטחון, ושילוב ההמלצות באפליקציות-Fiori של הרכש.",
          beginnerHe: "כאן מגדירים איך ה'בינה' של הרכש תעבוד: אילו המלצות יוצגו (ספק, מחיר, חריגה), כמה המערכת צריכה להיות 'בטוחה' כדי להציע, ואיפה ההמלצה תופיע.",
          consultantHe: "מפעילים Intelligent Scenarios דרך ISLM, מאמנים מודל על נתוני-EKKO/EKPO/EKBE היסטוריים, פורסים אותו, וקובעים confidence threshold. אינטגרציה ל-SAP AI Core/Business AI לתרחישים מתקדמים. ניטור-ביצועים שוטף (drift) דרך ISLM.",
          purposeHe: "להטמיע אוטומציה-חכמה מבוקרת — המלצות מבוססות-נתונים עם ספי-ביטחון ובקרת-אדם, לשיפור-יעילות ולמזעור-טעויות.",
          processExampleHe: "צוות מפעיל תרחיש 'source prediction' ב-ISLM ► מאמן על שנתיים של נתוני-PO ► פורס עם threshold 80% ► ההמלצות מופיעות ב-'Manage Purchase Requisitions'.",
          cbcHe: "ב-CBC נפרס תרחיש חיזוי-אספקה לספקי-סוכר עונתיים, עם ניטור-drift לעדכון המודל לפי שינויי-שוק.",
          navHe: ["SPRO / Fiori ► Intelligent Scenario Lifecycle Management (ISLM)", "SPRO ► Materials Management ► Purchasing ► ML-Based Functionality"],
          tables: ["EKKO", "EKPO", "EKBE"],
          tcodes: ["SPRO", "ME53N"],
          fiori: ["F2660", "F1048"],
          configHe: ["הפעלת Intelligent Scenarios (ISLM) + אימון/פריסת מודל.", "הגדרת confidence threshold להצגת-המלצות.", "אינטגרציה ל-SAP AI Core / Business AI; ניטור-drift."],
          mistakesHe: ["פריסה ללא threshold ➔ רעש-המלצות.", "אימון על נתונים מלוכלכים ➔ המלצות שגויות.", "אי-ניטור drift ➔ מודל מתיישן."],
          troubleshootHe: ["אין המלצות ➔ מודל לא נפרס (ISLM) / נתונים חסרים.", "המלצות גרועות ➔ נתוני-אימון מוטים."],
          bestPracticeHe: ["נקה נתוני-אימון לפני פריסה.", "התחל בתרחיש אחד ומדוד תועלת.", "נטר drift ואמן-מחדש מעת-לעת."],
          interviewHe: [{ qHe: "מה תפקיד ISLM בקונפיגורציית-ML?", aHe: "ניהול מחזור-חיי המודל — אימון, פריסה, ניטור (drift) ואימון-מחדש של תרחישי-ML מובְנֵים ברכש." }],
          takeawaysHe: ["ISLM מנהל את מודלי-ה-ML של הרכש.", "הגדר confidence threshold ובקרת-אדם.", "נטר drift ואמן-מחדש."],
          relatedHe: [{ labelHe: "MM · פונקציונליות-רכש מבוססת-ML (5.2.7)", href: "/library/mm/chapter-05/#sub-5.2.7" }],
        },
        {
          id: "5.7.3", titleHe: "קונפיגורציה של עיבוד-דרישות", titleEn: "Requirements Processing",
          execHe: "הגדרת עיבוד דרישות-הרכש ב-SPRO: Document Types ו-Number Ranges, בקרת-שדות, Account Assignment, קביעת-מקור (Source Determination), Auto-PO ו-release/workflow לאישור-דרישות.",
          beginnerHe: "כאן מגדירים איך דרישות-רכש מתנהגות: איזה מסמך, אילו שדות חובה, מאיזה מקור נבחר הספק, ומתי דרישה הופכת אוטומטית להזמנה.",
          consultantHe: "ב-SPRO ► Purchase Requisition: Document Types (T161), Field Selection, Account Assignment, Source Determination (Source List/Info Record/Outline Agreement), Auto-PO indicators, ו-Release Procedure / flexible workflow. קובע את שלד עיבוד-ה-EBAN.",
          purposeHe: "לתרגם את מדיניות-הדרישות להתנהגות-מערכת — אילו דרישות, מאילו מקורות, באיזה אישור והמרה.",
          processExampleHe: "מגדירים Document Type 'NB', שדות-חובה, Source List חובה, Auto-PO לחומרים נבחרים, ו-flexible workflow מעל סף-שווי ► דרישות-MRP זורמות ל-PO אוטומטית.",
          cbcHe: "ב-CBC מוגדר Source List לסוכר/תרכיז + Auto-PO, כך שדרישות-MRP הופכות אוטומטית ל-POs מול חוזי-המסגרת.",
          navHe: ["SPRO ► Materials Management ► Purchasing ► Purchase Requisition (Document Types / Source Determination / Release)"],
          tables: ["EBAN", "EBKN", "EORD", "T161"],
          tcodes: ["ME51N", "ME59N", "SPRO"],
          fiori: ["F1048", "F2027"],
          configHe: ["Document Types + Number Ranges (T161).", "Field Selection + Account Assignment.", "Source Determination (Source List/Info Record/חוזה) + Auto-PO.", "Release Procedure / flexible workflow."],
          mistakesHe: ["ללא Source Determination ➔ אין המרה-אוטומטית.", "שדות-חובה מיותרים חוסמים יצירה.", "Auto-PO ללא Source ➔ ME59N מדלג."],
          troubleshootHe: ["דרישה לא מומרת ➔ Source/Auto-PO/Release חסרים.", "מקור לא נמצא ➔ Source List לא-תקף."],
          bestPracticeHe: ["תחזק Source List לחומרים חוזרים.", "הפעל Auto-PO היכן שבטוח.", "תקנן Document Types."],
          interviewHe: [{ qHe: "אילו הגדרות-מפתח בעיבוד-דרישות?", aHe: "Document Types, Field Selection, Account Assignment, Source Determination, Auto-PO ו-Release/workflow." }],
          takeawaysHe: ["מגדיר את התנהגות ה-EBAN.", "Source Determination + Auto-PO = המרה אוטומטית.", "Release/workflow לאישור."],
          relatedHe: [{ labelHe: "MM · עיבוד דרישות (5.3)", href: "/library/mm/chapter-05/#sub-5.3" }],
        },
        {
          id: "5.7.4", titleHe: "קונפיגורציה של עיבוד הזמנת-רכש", titleEn: "Purchase Order Processing",
          execHe: "הגדרת ה-PO ב-SPRO: Document Types (T163) ו-Number Ranges, Screen Layout (בקרת-שדות), Item Categories, Account Assignment, Pricing Procedure, Output/Message determination, ו-release/workflow.",
          beginnerHe: "כאן מגדירים איך הזמנות-רכש נראות ומתנהגות: איזה מסמך, אילו שדות, איך נקבע המחיר, איך ההזמנה נשלחת לספק, ומי מאשר.",
          consultantHe: "ב-SPRO ► Purchase Order: Document Types (NB/FO/UB), Screen Layout at Document Level (Field Selection Keys), Item Categories, Account Assignment, Pricing Procedure (תנאי PB00 + מסים), Output Determination, ו-flexible workflow / release strategy. קובע את שלד ה-EKKO/EKPO.",
          purposeHe: "לתרגם מדיניות-הזמנות להתנהגות-מערכת — מבנה, תמחור, שליחה ואישור של כל ה-POs.",
          processExampleHe: "מגדירים Document Type 'NB', Screen Layout עם שדות-חובה, Pricing Procedure RM0000, Output ל-Business Network, ו-flexible workflow ► כל PO נוצרת, מתומחרת, נשלחת ומאושרת לפי ההגדרה.",
          cbcHe: "ב-CBC מוגדר Document Type 'FO' לחוזי-מסגרת-אריזה, Pricing מ-Info Record, ו-Output אוטומטי ל-Business Network לספקי-חומרי-הגלם.",
          navHe: ["SPRO ► Materials Management ► Purchasing ► Purchase Order (Document Types / Screen Layout / Pricing / Output)"],
          tables: ["EKKO", "EKPO", "EKET", "T163"],
          tcodes: ["ME21N", "ME9F", "SPRO"],
          fiori: ["F0842A", "F1990"],
          configHe: ["Document Types + Number Ranges (T163).", "Screen Layout at Document Level (Field Selection).", "Item Categories + Account Assignment.", "Pricing Procedure + Output/Message Determination + workflow."],
          mistakesHe: ["Pricing Procedure שגוי ➔ מחירים לא-נכונים.", "Output לא מוגדר ➔ PO לא נשלחת.", "Item Categories לא-מותרים ➔ תרחישים חסומים."],
          troubleshootHe: ["מחיר שגוי ➔ Pricing Procedure / Info Record.", "PO לא נשלחת ➔ Output Determination חסר.", "שדה לא-זמין ➔ Screen Layout."],
          bestPracticeHe: ["תקנן Document Types ו-Screen Layouts.", "הגדר Output אוטומטי (IDoc/BN).", "תאם Pricing עם FI/CO."],
          interviewHe: [{ qHe: "אילו הגדרות-מפתח בעיבוד-PO?", aHe: "Document Types, Screen Layout, Item Categories, Account Assignment, Pricing Procedure, Output ו-release/workflow." }],
          takeawaysHe: ["מגדיר את התנהגות ה-EKKO/EKPO.", "Pricing Procedure + Output = תמחור ושליחה.", "Screen Layout שולט בשדות."],
          relatedHe: [{ labelHe: "MM · עיבוד הזמנת-רכש (5.4)", href: "/library/mm/chapter-05/#sub-5.4" }],
        },
        {
          id: "5.7.5", titleHe: "קונפיגורציה של שיתוף-פעולה בהזמנות-רכש", titleEn: "Purchase Order Collaboration",
          execHe: "הגדרת השילוב עם SAP Business Network: Output/Message determination לשליחת PO, Trading Partner setup, document mapping (cXML/IDoc), וקליטת Confirmations/ASNs/Invoices נכנסים.",
          beginnerHe: "כאן מחברים את SAP לספקים: איך ה-PO יוצאת אלקטרונית, איך הספק מוגדר ב-Network, ואיך אישורים, התראות-משלוח וחשבוניות חוזרים אוטומטית.",
          consultantHe: "מגדירים Output Determination (ORDERS), Trading Partner ב-Business Network, ו-mapping ל-cXML/IDoc. Inbound: ORDRSP (→EKES), DESADV (→Inbound Delivery), INVOIC (→MIRO). Confirmation Control Key לקליטת-אישורים. ניטור IDocs (WE02) ל-exception handling.",
          purposeHe: "להפוך את התקשורת עם הספק לדיגיטלית-אוטומטית — שליחה וקליטה של כל מסמכי-הרכש בזמן-אמת.",
          processExampleHe: "מגדירים Output ORDERS ל-Business Network, Trading Partner לספק, ו-inbound processing ל-ORDRSP/DESADV/INVOIC ► PO נשלחת, אישור/ASN/חשבונית חוזרים אוטומטית.",
          cbcHe: "ב-CBC מחוברים ספקי-תרכיז/סוכר/אריזה ל-Business Network עם mapping מלא — כל מסמכי-הרכש זורמים אוטומטית.",
          navHe: ["SPRO ► Materials Management ► Purchasing ► Messages / Output Determination", "SPRO ► Integration ► SAP Business Network / Trading Partner"],
          tables: ["EKKO", "EKES", "EKPO"],
          tcodes: ["ME9F", "WE02", "SPRO"],
          fiori: ["F0842A", "F2660A"],
          configHe: ["Output/Message Determination (ORDERS).", "Trading Partner ב-Business Network + document mapping (cXML/IDoc).", "Inbound processing: ORDRSP/DESADV/INVOIC + Confirmation Control Key."],
          mistakesHe: ["Mapping שגוי ➔ מסמכים נכשלים.", "Trading Partner חסר ➔ אין חיבור.", "ללא inbound processing ➔ אישורים לא נקלטים."],
          troubleshootHe: ["PO לא נשלחת ➔ Output Determination.", "Confirmation לא נקלטת ➔ IDoc ORDRSP נכשל (WE02).", "e-Invoice נדחתה ➔ mapping/Match."],
          bestPracticeHe: ["חבר ספקים אסטרטגיים ל-Business Network.", "נטר IDocs (WE02).", "אכוף Confirmation לפריטים קריטיים."],
          interviewHe: [{ qHe: "מה נדרש לקונפיגורציית שיתוף-פעולה?", aHe: "Output Determination (ORDERS), Trading Partner ב-Business Network, document mapping, ו-inbound processing ל-ORDRSP/DESADV/INVOIC." }],
          takeawaysHe: ["מחבר SAP ל-Business Network.", "Output החוצה; ORDRSP/DESADV/INVOIC פנימה.", "נטר IDocs ל-exception handling."],
          relatedHe: [{ labelHe: "MM · שיתוף-פעולה בהזמנות-רכש (5.6)", href: "/library/mm/chapter-05/#sub-5.6" }],
        },
        {
          id: "5.7.6", titleHe: "אינטגרציה ל-SAP SuccessFactors", titleEn: "SAP SuccessFactors",
          execHe: "אינטגרציית הרכש ל-SAP SuccessFactors מסנכרנת נתוני-עובדים (employee master) לשימוש ברכש — מבקשים, מאשרים, מרכזי-עלות ומבני-אישור — כך ש-flexible workflow וניתוב-עגלות מתבססים על היררכיה ארגונית עדכנית.",
          beginnerHe: "כדי שה-workflow ידע 'מי המנהל של מי' ולמי לנתב אישור, צריך נתוני-עובדים מעודכנים. SuccessFactors (מערכת משאבי-האנוש בענן) מזינה את המידע הזה לרכש.",
          consultantHe: "האינטגרציה (לרוב דרך SAP Integration Suite / CPI) מסנכרנת employee data, org assignments ו-cost-center mapping מ-SuccessFactors ל-S/4HANA. משמש את agent determination ב-flexible workflow (manager-based routing), את שיוך-המבקש לעגלות, ואת ה-Account Assignment ברירת-המחדל. מבוסס replication ו-employee↔Business Partner mapping.",
          purposeHe: "להבטיח שמבני-האישור ושיוכי-העלות ברכש משקפים את הארגון בפועל — ניתוב-אישור נכון לפי היררכיה-עדכנית, ללא תחזוקה כפולה.",
          processExampleHe: "עובד-חדש נקלט ב-SuccessFactors עם מנהל ומרכז-עלות ► הנתונים מסונכרנים ל-S/4HANA ► כשהעובד פותח Shopping Cart, ה-workflow מנתב אוטומטית למנהל-הישיר, וה-Account Assignment ברירת-המחדל הוא מרכז-העלות שלו.",
          cbcHe: "ב-CBC נתוני-העובדים מ-SuccessFactors מזינים את ניתוב-האישורים: דרישות-MRO מנותבות אוטומטית לראש-צוות-התחזוקה לפי ההיררכיה הארגונית המעודכנת.",
          navHe: ["SPRO ► Integration with SAP SuccessFactors / Employee Replication", "SAP Integration Suite (CPI) ► SuccessFactors ► S/4HANA replication"],
          tables: ["PA0001", "EBAN"],
          tcodes: ["SPRO", "ME53N"],
          fiori: ["F0862", "F1048"],
          configHe: ["הגדרת employee replication מ-SuccessFactors (Integration Suite / CPI).", "Employee ↔ Business Partner mapping + org/cost-center sync.", "שימוש בנתונים ב-agent determination של flexible workflow."],
          mistakesHe: ["נתוני-עובדים לא-מסונכרנים ➔ ניתוב-אישור שגוי.", "חוסר mapping employee↔BP ➔ workflow נכשל.", "סנכרון לא-תדיר ➔ היררכיה מיושנת."],
          troubleshootHe: ["אישור מנותב לאדם שגוי ➔ org data מ-SuccessFactors לא-מעודכן.", "workflow נכשל ➔ employee↔BP mapping חסר."],
          bestPracticeHe: ["סנכרן נתוני-עובדים בתדירות מתאימה.", "תחזק employee↔BP mapping.", "בסס agent determination על org-data מסונכרן."],
          interviewHe: [{ qHe: "מדוע לחבר רכש ל-SuccessFactors?", aHe: "כדי ש-flexible workflow ושיוכי-העלות יתבססו על היררכיה ארגונית עדכנית (manager-based routing) ללא תחזוקה כפולה." }],
          takeawaysHe: ["מסנכרן נתוני-עובדים/org מ-SuccessFactors לרכש.", "מזין agent determination ב-flexible workflow.", "דורש employee↔BP mapping."],
          relatedHe: [{ labelHe: "MM · workflow (5.2.6)", href: "/library/mm/chapter-05/#sub-5.2.6" }],
        },
      ],
    },
    // ============================================================ 5.8
    {
      id: "5.8", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק 5 כיסה את הרכש התפעולי במלואו — ליבת ה-Procure-to-Pay ב-S/4HANA. ראינו את הזרימה PR ► PO ► GR ► IR, את שני הפרצופים (רכש-קלאסי מול Self-Service / Shopping Cart), את עיבוד-הדרישות וההזמנות, רכש-שירותים, שיתוף-פעולה עם ספקים דרך SAP Business Network, את שכבת-החדשנות (carbon footprint, ML, intercompany מתקדם), ואת מלוא הקונפיגורציה ב-SPRO כולל אינטגרציה ל-SuccessFactors.",
      beginnerHe:
        "סיכמנו את כל מסע-הרכש: מ'אני צריך' (דרישה / עגלת-קניות), דרך 'ספק, שלח לי' (הזמנת-רכש), 'קיבלתי' (קבלת-טובין / אישור-שירות), ועד 'משלמים' (חשבונית). ראינו גם איך מאשרים (workflow), איך מתחברים לספקים (Business Network), ואיך מגדירים הכל (SPRO).",
      consultantHe:
        "מבחינת-יישום: שלוט ב-EBAN/EKKO/EKPO/EKET/EKBE כליבת-הנתונים; דע מתי להשתמש ב-Self-Service Requisitioning מול Ariba; העדף flexible workflow על release strategy קלאסית; אכוף Three-Way-Match; מנף Lean Services לשירותים; חבר ספקים ל-SAP Business Network; והטמע ML דרך ISLM עם בקרת-אדם. הקונפיגורציה עוקבת אחר סדר-IMG: מבנה ► מסמכים ► שדות ► מקור ► תמחור ► פלט ► workflow ► אינטגרציות.",
      purposeHe:
        "לקבע את התמונה-הכוללת — איך כל הרכיבים (דרישה, הזמנה, קבלה, חשבונית, אישורים, אינטגרציות וקונפיגורציה) מתחברים לתהליך-רכש אחד זורם, מבוקר ומתועד.",
      processExampleHe:
        "מקצה-לקצה: צורך ► דרישה (EBAN) ► בחירת-מקור ► הזמנה (EKKO/EKPO) ► אישור (flexible workflow) ► שליחה (Business Network) ► קבלה (GR/Service Entry Sheet) ► חשבונית (MIRO) ► Three-Way-Match ► תשלום — כל הפרק בתרשים אחד.",
      cbcHe:
        "ב-CBC הפרק כולו משרת מטרה אחת: שקווי-מילוי-המשקאות לעולם לא יעצרו ממחסור — תרכיז, סוכר, CO2, אריזה ו-MRO זמינים בזמן, במחיר-חוזה, ובאופן מבוקר ומתועד, עם אוטומציה מקסימלית מול הספקים.",
      navHe: ["SPRO ► Materials Management ► Purchasing (סקירת-העל)", "Fiori ► Procurement (כל אפליקציות-הרכש התפעולי)"],
      tables: ["EBAN", "EKKO", "EKPO", "EKBE"],
      tcodes: ["ME51N", "ME21N", "MIGO", "MIRO"],
      fiori: ["F1048", "F0842A", "F1990"],
      configHe: [
        "הזרימה: PR ► PO ► GR ► IR, עם Three-Way-Match כבקרה.",
        "שני מודלים: רכש-קלאסי (ME) ו-Self-Service (Shopping Cart).",
        "S/4HANA: Fiori, flexible workflow, SAP Business Network, Lean Services, ML/ISLM.",
        "קונפיגורציה לפי סדר-IMG: מבנה ► מסמכים ► שדות ► מקור ► תמחור ► פלט ► workflow ► אינטגרציות.",
      ],
      flow: [
        { he: "דרישה", code: "EBAN" },
        { he: "הזמנה", code: "EKKO/EKPO" },
        { he: "קבלה", code: "GR / Entry Sheet" },
        { he: "חשבונית", code: "MIRO" },
        { he: "תשלום", note: "Three-Way-Match" },
      ],
      masterDataHe: ["Material / Business Partner / Info Record / Source List / Outline Agreement — הבסיס לכל הרכש התפעולי."],
      mistakesHe: [
        "דילוג על שלבים בזרימת PR►PO►GR►IR ➔ אובדן-בקרה ועקיבות.",
        "השקעה בטכנולוגיה שהופסקה (SRM) במקום הפתרון המובְנֵה.",
        "אי-אכיפת Three-Way-Match ➔ סיכון-תשלום שגוי.",
      ],
      troubleshootHe: [
        "תהליך תקוע ➔ אתר את השלב (PR/PO/GR/IR) ובדוק release/source/output באותו שלב.",
        "חשבונית חסומה ➔ חריגת-Match; בדוק כמות/מחיר מול PO/GR.",
      ],
      bestPracticeHe: [
        "אכוף זרימה מלאה ובקרת-Three-Way-Match.",
        "אמץ Fiori, flexible workflow ו-Business Network.",
        "הטמע ML בהדרגה עם בקרת-אדם.",
        "תקנן קונפיגורציה לפי סדר-IMG.",
      ],
      interviewHe: [
        { qHe: "סכם את זרימת הרכש התפעולי במשפט.", aHe: "PR (EBAN) ► PO (EKKO/EKPO) ► GR / Service Entry Sheet ► Invoice (MIRO), עם Three-Way-Match כבקרה לפני תשלום." },
        { qHe: "מהם החידושים המרכזיים של הרכש התפעולי ב-S/4HANA?", aHe: "Fiori, flexible workflow, SAP Business Network, Lean Services, carbon footprint, ML/ISLM ו-Advanced Intercompany — במקום SRM הנפרד." },
      ],
      takeawaysHe: [
        "רכש תפעולי = PR ► PO ► GR ► IR עם Three-Way-Match.",
        "EBAN/EKKO/EKPO/EKBE = ליבת-הנתונים.",
        "S/4HANA מדגיש Fiori, flexible workflow, Business Network, Lean Services ו-ML.",
        "קונפיגורציה לפי סדר-IMG; אינטגרציה ל-SuccessFactors למבני-אישור.",
      ],
      relatedHe: [
        { labelHe: "MM · מהו רכש תפעולי? (5.1)", href: "/library/mm/chapter-05/#sub-5.1" },
        { labelHe: "MM · קונפיגורציה של רכש תפעולי (5.7)", href: "/library/mm/chapter-05/#sub-5.7" },
      ],
    },
  ],
};
