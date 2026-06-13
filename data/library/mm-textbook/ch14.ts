// ===== MM Digital Textbook — Chapter 14 (Centralized Procurement) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Hierarchy preserved verbatim from the source; SAP objects kept in English.
// CBC = Coca-Cola bottling central procurement across plants/companies.
import type { TextbookChapter } from "./types";

export const CH14: TextbookChapter = {
  n: 14,
  titleHe: "רכש מרכזי",
  titleEn: "Centralized Procurement",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לרכש מרכזי (Centralized Procurement) ב-SAP S/4HANA. הרעיון: ארגון בעל מספר חברות ומפעלים — שכל אחד מריץ מערכת-ERP נפרדת — מנהל את הרכש מתוך רכזת אחת (Central Procurement hub) המחוברת לכל מערכות-הביצוע. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. דגש מיוחד: אפליקציות Fiori מסוג Central (Manage Purchase Requisitions Central, Manage Purchase Orders Central וכו'), חיבוריות SOAP/RFC בין הרכזת למערכות-המחוברות, ושילוב SAP Ariba ו-SAP Business Network. המטרה: ללמוד את הנושא ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 14.1
    {
      id: "14.1", titleHe: "מהו רכש מרכזי?", titleEn: "What Is Centralized Procurement?",
      execHe:
        "רכש מרכזי הוא דגם-תפעול שבו ארגון רב-חברות ורב-מפעלים מנהל את פעילות-הרכש שלו מתוך מערכת-רכזת אחת (Central Procurement hub) ב-SAP S/4HANA, בעוד מערכות-הביצוע (Connected Systems) — ECC או S/4HANA נפרדות לכל חברה/אזור — ממשיכות לבצע את הקליטה, המלאי והחשבונאות מקומית. הרכזת נותנת שקיפות גלובלית, מינוף-מסה מול ספקים ובקרה אחידה, מבלי לאחד פיזית את כל ה-ERP-ים. זוהי 'שכבת-רכש על' מעל נוף-מערכות מבוזר.",
      beginnerHe:
        "דמיין רשת-חנויות שבה לכל סניף יש קופה משלו, אבל מטה-רכש אחד מזמין עבור כולם וזוכה במחירים טובים יותר. ב-SAP: הרכזת (hub) היא ה'מטה', וכל מפעל/חברה הוא 'סניף' עם מערכת-ERP משלו. דרישות-רכש זורמות מהסניפים אל המטה, המטה מאחד, מתמחר ומזמין, וההזמנה חוזרת אל הסניף שמבצע קבלה ותשלום. הסניפים לא צריכים להתאחד למערכת אחת — הם רק 'מחוברים'.",
      consultantHe:
        "ארכיטקטונית, הרכזת היא S/4HANA (On-Premise / Private Cloud / Public Cloud) המריצה את חבילת-ה-Central Procurement: Central Requisitioning, Central Purchasing, Central Sourcing, Central Purchase Contracts ו-Central Analytics. ה-Connected Systems מחוברים דרך שירותי-אינטגרציה (SOAP services ו-RFC) המוגדרים ב-SOAMANAGER ו-SM59, עם הקצאת מספרים-לוגיים (Logical System) ו-Business System ID. נתוני-אב (Materials, Suppliers/Business Partners, Plants, Company Codes) מועתקים/ממופים אל הרכזת דרך Data Replication Framework (DRF) ו-Master Data Governance. ה-Central object מחזיק מצב-משוכפל, וה-Connected System מחזיק את ה-object התפעולי (ה-PO/PR האמיתי). הזיהוי הוא תמיד צמד (System Alias + Document Number).",
      purposeHe:
        "המטרה: לאחד את כוח-הקנייה ואת השקיפות מבלי לאחד את מערכות-הביצוע. ארגונים גדולים אינם יכולים (או רוצים) למזג עשרות ERP-ים בבת-אחת; רכש מרכזי נותן ערך מהיר — חוזים גלובליים, ניתוח-הוצאה רוחבי, ובקרת-תאימות — תוך שמירה על אוטונומיה תפעולית מקומית.",
      processExampleHe:
        "תהליך מקצה-לקצה: מבקש במפעל בגרמניה יוצר דרישת-רכש מקומית; היא מסונכרנת לרכזת דרך Central Requisitioning; רוכש-מרכזי באמצעות Manage Purchase Requisitions Central רואה דרישות מכל המערכות, מאחד אותן ב-Central Sourcing, מנהל RFQ, מנפיק Central Purchase Order שמורד חזרה אל ה-Connected System; שם מבוצעת Goods Receipt ו-Invoice — והרכזת רואה את הסטטוס המעודכן.",
      cbcHe:
        "ב-CBC: מפעלי-בקבוק בכמה מדינות (כל מדינה company code/ERP נפרד) מנהלים רכש תרכיז, סוכר, CO2 ופחיות מתוך רכזת אחת. הרכזת מאחדת את הביקוש לפחיות מכל המפעלים, חותמת חוזה-מסגרת גלובלי מול ספק-אלומיניום, וכל מפעל מושך מהחוזה דרך ה-Connected System שלו — מחיר אחיד, נראות מלאה למטה.",
      navHe: [
        "SAP S/4HANA (Hub) ► Fiori Launchpad ► Central Procurement ► Procurement Overview Page",
        "SPRO ► Materials Management ► Central Procurement ► Basic Settings",
        "SPRO ► Cross-Application Components ► Central Procurement ► Configure Connected Systems",
      ],
      tables: ["EKKO", "EKPO", "EBAN", "T160", "TBE11"],
      tcodes: ["SOAMANAGER", "SM59", "DRFOUT", "ME53N"],
      fiori: ["F1990 (Procurement Overview)", "F2418 (Manage PR Central)", "F2420 (Manage PO Central)"],
      configHe: [
        "Central Procurement מופעל כ-Business Function/Scope item ברכזת; ה-Connected Systems מוגדרים כ-Logical Systems.",
        "כל Connected System מקבל System Alias (Business System ID) המשמש בכל אובייקט מרכזי לזיהוי המקור.",
        "הפעלת השירותים: Central Requisitioning, Central Purchasing, Central Sourcing, Central Contracts, Central Analytics — לפי הצורך.",
        "מיפוי נתוני-אב (Plant, Company Code, Material, Supplier) בין הרכזת ל-Connected System דרך Value Mapping.",
      ],
      flow: [
        { he: "דרישה במערכת-מחוברת", code: "Connected ERP", note: "PR מקומי" },
        { he: "סנכרון לרכזת", code: "SOAP", note: "Central Requisitioning" },
        { he: "איחוד ומקור", code: "Central Sourcing" },
        { he: "הזמנה מרכזית", code: "Central PO", note: "מורד למערכת-המחוברת" },
        { he: "קבלה + חשבונית", code: "Connected ERP", note: "GR/IR מקומי" },
      ],
      masterDataHe: [
        "Business Partner (Supplier) ממופה בין הרכזת לכל Connected System.",
        "Material / Plant / Company Code ממופים דרך Value Mapping ל-System Alias הנכון.",
        "Central object מחזיק העתק-מצב; ה-object התפעולי חי ב-Connected System.",
      ],
      mistakesHe: [
        "תפיסת הרכזת כמערכת-ביצוע — בפועל הקליטה והחשבונאות מתבצעות תמיד ב-Connected System.",
        "דילוג על מיפוי נתוני-אב — אובייקטים מרכזיים נכשלים בהורדה למערכת-המחוברת.",
        "הנחה שכל מערכת-מחוברת חייבת להיות S/4HANA — גם ECC נתמך כ-Connected System.",
      ],
      troubleshootHe: [
        "דרישה לא מופיעה ברכזת ➔ בדוק שירות-SOAP פעיל ו-System Alias ממופה.",
        "הזמנה מרכזית לא יורדת ל-Connected System ➔ חוסר מיפוי Plant/Material או שגיאת RFC.",
        "סטטוס לא מתעדכן ברכזת ➔ שירות-עדכון חד-כיווני או queue תקוע (SMQ1/SMQ2).",
      ],
      bestPracticeHe: [
        "התחל ב-Use Case אחד (למשל Central Requisitioning) והרחב הדרגתית.",
        "נהל מיפוי נתוני-אב באופן מרכזי דרך MDG כדי למנוע סחף.",
        "תעד את כל ה-System Aliases ואת השירותים הפעילים בכל מערכת-מחוברת.",
      ],
      interviewHe: [
        { qHe: "מהו ההבדל בין הרכזת ל-Connected System?", aHe: "הרכזת (Central Procurement hub) מנהלת ומאחדת רכש ומחזיקה העתק-מצב; ה-Connected System (ECC/S4) מבצע בפועל קבלה, מלאי וחשבונאות ומחזיק את ה-object התפעולי." },
        { qHe: "האם רכש מרכזי מחליף את ה-ERP-ים המקומיים?", aHe: "לא. הוא שכבת-על מעליהם; הם נשארים מערכות-הביצוע. המטרה היא איחוד-רכש ושקיפות בלי איחוד-מערכות." },
        { qHe: "כיצד מזוהה אובייקט מרכזי למקורו?", aHe: "דרך צמד System Alias (Business System ID) + מספר-המסמך במערכת-המקור." },
      ],
      takeawaysHe: [
        "רכש מרכזי = רכזת אחת מעל מספר ERP-ים מחוברים.",
        "הרכזת מאחדת ומנהלת; ה-Connected System מבצע.",
        "החיבור הוא SOAP/RFC + מיפוי נתוני-אב לפי System Alias.",
        "ערך מהיר ללא מיזוג-מערכות פיזי.",
      ],
      relatedHe: [
        { labelHe: "MM · דרישה מרכזית (14.2)", href: "/library/mm/chapter-14/#sub-14.2" },
        { labelHe: "MM · רכש מרכזי (14.3)", href: "/library/mm/chapter-14/#sub-14.3" },
        { labelHe: "אובייקט · EKKO", href: "/library/mm/object/EKKO/" },
      ],
    },
    // ============================================================ 14.2
    {
      id: "14.2", titleHe: "דרישה מרכזית", titleEn: "Central Requisitioning",
      execHe:
        "Central Requisitioning מאפשר למשתמשים מכל מערכת-מחוברת ליצור ולנהל דרישות-רכש (Purchase Requisitions) מתוך הרכזת, או לסנכרן דרישות שנוצרו מקומית אל הרכזת. רוכש-מרכזי מקבל תצוגה מאוחדת של כל הדרישות ברחבי הארגון דרך Manage Purchase Requisitions Central, ויכול לעבד אותן הלאה למקור-אספקה ולהזמנה — בלי להיכנס לכל מערכת בנפרד.",
      beginnerHe:
        "דרישת-רכש היא 'בקשה לקנות'. ב-Central Requisitioning עובד בכל מפעל יכול לבקש דרך אפליקציית-Fiori אחת (Create Purchase Requisition), והבקשה מגיעה למטה-הרכש המרכזי. המטה רואה את כל הבקשות מכל המפעלים במסך אחד ומחליט מה לעשות עם כל אחת — לאחד, לתמחר, להזמין.",
      consultantHe:
        "השירות עובד דו-כיוונית: דרישה שנוצרה ב-Connected System משוכפלת לרכזת כ-Central Purchase Requisition (טבלת-מצב מרכזית), ודרישה שנוצרת ברכזת מורדת ל-Connected System ליצירת ה-PR התפעולי שם. ה-self-service requisitioning משתמש בקטלוגים (OCI/Punch-out) ובחומר חופשי-טקסט. כל פריט-דרישה נושא את ה-System Alias של המערכת המבצעת, ה-Plant וה-Company Code שלה. אפליקציות-Fiori מרכזיות: Manage Purchase Requisitions Central (F2418) ו-Create Purchase Requisition. הסטטוס מסונכרן בחזרה בעת המרת-הדרישה להזמנה ב-Connected System.",
      purposeHe:
        "לרכז את שלב-ה'בקשה' של הרכש — לתת לרוכש-מרכזי נראות מלאה לכל הביקוש בארגון, לאפשר איחוד-דרישות לחיסכון-מסה, ולתת למבקשים חוויית self-service אחידה ללא תלות במערכת-המקור.",
      processExampleHe:
        "מבקש במפעל ספרד יוצר דרישה לפחיות ב-Create Purchase Requisition; הדרישה נשמרת מקומית ומשתכפלת לרכזת. רוכש-מרכזי ב-Manage Purchase Requisitions Central מסנן לפי קבוצת-חומר, מאתר דרישות דומות ממפעלים אחרים, ומסמן אותן לאיחוד ב-Central Sourcing.",
      cbcHe:
        "ב-CBC כל מפעל-בקבוק יוצר דרישות לחומרי-אריזה דרך Central Requisitioning; מטה-הרכש רואה את כלל הביקוש לפחיות ופקקים בכל המדינות, ויכול לאחד הזמנה-רבעונית גדולה במקום עשרות הזמנות מפוצלות.",
      navHe: [
        "Fiori Launchpad (Hub) ► Procurement ► Create Purchase Requisition",
        "Fiori Launchpad (Hub) ► Central Procurement ► Manage Purchase Requisitions Central",
        "SPRO ► Materials Management ► Central Procurement ► Central Requisitioning ► Activate and Configure",
      ],
      tables: ["EBAN", "EBKN", "T160", "TBE31"],
      tcodes: ["ME51N", "ME53N", "ME5A", "SOAMANAGER"],
      fiori: ["F2418 (Manage PR Central)", "F1643 (Create PR)", "F2419 (My PR)"],
      configHe: [
        "הפעלת Central Requisitioning ברכזת ושיוך ה-Connected Systems הרלוונטיים.",
        "הגדרת קטלוגים (OCI Catalogs) ל-self-service requisitioning, אם נדרש.",
        "מיפוי Document Type, Plant ו-Purchasing Group בין הרכזת ל-Connected System.",
        "הגדרת זרימת-אישורים (Flexible Workflow) לדרישות מרכזיות לפי ערך/קבוצת-חומר.",
      ],
      flow: [
        { he: "יצירת דרישה", code: "Create PR", note: "ברכזת או במערכת-מחוברת" },
        { he: "שכפול דו-כיווני", code: "SOAP", note: "Central PR state" },
        { he: "תצוגה מאוחדת", code: "F2418", note: "Manage PR Central" },
        { he: "איחוד / מקור", code: "Central Sourcing" },
        { he: "סטטוס חוזר", code: "Status sync" },
      ],
      masterDataHe: [
        "כל פריט-דרישה נושא System Alias + Plant + Company Code של המערכת המבצעת.",
        "Material / Account Assignment ממופים ל-Connected System הנכון.",
      ],
      mistakesHe: [
        "שכפול-דרישות כפול עקב סנכרון דו-כיווני לא-מתואם.",
        "חוסר מיפוי Document Type ➔ דרישה נכשלת בהורדה ל-Connected System.",
        "התעלמות מ-Flexible Workflow ➔ דרישות עוברות ללא אישור.",
      ],
      troubleshootHe: [
        "דרישה לא מסונכרנת ➔ בדוק שירות-SOAP פעיל ו-queue (SMQ2) ברכזת.",
        "שגיאת-הורדה ל-Connected System ➔ מיפוי Plant/Document Type חסר.",
        "סטטוס לא מתעדכן אחרי המרה ➔ שירות-עדכון-סטטוס לא פעיל.",
      ],
      bestPracticeHe: [
        "הגדר במפורש כיוון-שכפול לכל סוג-דרישה כדי למנוע כפילויות.",
        "השתמש ב-Flexible Workflow מרכזי לאישורים אחידים.",
        "תקנן Document Types בין כל המערכות-המחוברות.",
      ],
      interviewHe: [
        { qHe: "מה מאפשר Central Requisitioning?", aHe: "יצירה וניהול של דרישות-רכש מהרכזת על-פני כל המערכות-המחוברות, עם תצוגה מאוחדת ב-Manage Purchase Requisitions Central." },
        { qHe: "כיצד מזוהה הדרישה למערכת-הביצוע שלה?", aHe: "דרך System Alias + Plant + Company Code הנשמרים בכל פריט-דרישה מרכזי." },
      ],
      takeawaysHe: [
        "דרישה מרכזית = שכבת-בקשה מאוחדת מעל כל ה-ERP-ים.",
        "Manage Purchase Requisitions Central נותנת נראות רוחבית.",
        "סנכרון דו-כיווני; שמור על כיוון מוגדר למניעת כפילות.",
      ],
      relatedHe: [
        { labelHe: "MM · רכש מרכזי (14.3)", href: "/library/mm/chapter-14/#sub-14.3" },
        { labelHe: "MM · מקור מרכזי (14.4)", href: "/library/mm/chapter-14/#sub-14.4" },
        { labelHe: "אובייקט · EBAN", href: "/library/mm/object/EBAN/" },
      ],
    },
    // ============================================================ 14.3
    {
      id: "14.3", titleHe: "רכש מרכזי", titleEn: "Central Purchasing",
      execHe:
        "Central Purchasing מאפשר לרוכש-מרכזי ליצור, לשנות ולנטר הזמנות-רכש (Purchase Orders) בכל המערכות-המחוברות מתוך הרכזת, דרך Manage Purchase Orders Central. ההזמנה נוצרת ברכזת ומורדת ל-Connected System לביצוע, או נוצרת מקומית ומשוכפלת לרכזת לניטור. כך מתקבלת בקרה רוחבית על כל ההזמנות בארגון מנקודה אחת.",
      beginnerHe:
        "אחרי שמחליטים מה לקנות, יוצרים הזמנת-רכש (PO) — מסמך מחייב לספק. ב-Central Purchasing הרוכש-המרכזי יכול ליצור ולעקוב אחרי הזמנות של כל המפעלים ממסך אחד (Manage Purchase Orders Central), בלי להתחבר לכל מערכת בנפרד. ההזמנה עצמה תמיד 'חיה' במערכת של המפעל, אך הרוכש שולט בה מהמטה.",
      consultantHe:
        "ההזמנה המרכזית מורדת ל-Connected System כ-PO תפעולי (EKKO/EKPO שם), והרכזת מחזיקה העתק-מצב לניטור. השדות מועברים דרך שירותי-SOAP; מיפוי Plant, Purchasing Org, Material ו-Account Assignment חיוני. ה-Central PO תומך גם ב-mass change ובניטור-סטטוס (GR/IR) מהרכזת. אפליקציה מרכזית: Manage Purchase Orders Central (F2420). חשוב להבחין בין שדות הנשלטים ברכזת (Header/Item commercials) לבין שדות שנשארים בשליטת ה-Connected System (Inventory/Account).",
      purposeHe:
        "לתת לרוכש-המרכזי כלי-ביצוע אחיד להזמנות על-פני כל המערכות — יצירה, שינוי-המוני, וניטור-סטטוס — תוך שמירה על הביצוע התפעולי (קבלה, חשבונית) במערכת-המקור.",
      processExampleHe:
        "רוכש-מרכזי יוצר Central PO לספק-סוכר עבור מפעל איטליה; ההזמנה מורדת ל-ERP האיטלקי, נשלחת לספק, ומבוצעת שם Goods Receipt. הרוכש רואה ב-Manage Purchase Orders Central את סטטוס-הקבלה והחשבונית בזמן-אמת מבלי להיכנס ל-ERP המקומי.",
      cbcHe:
        "ב-CBC רוכש-מרכזי מנפיק הזמנות-CO2 לכל מפעלי-הבקבוק מתוך הרכזת; כל הזמנה מורדת ל-ERP של המפעל המקומי, וניטור-הקבלות נעשה ריכוזית — חיווי מיידי אם מפעל לא קיבל אספקה בזמן.",
      navHe: [
        "Fiori Launchpad (Hub) ► Central Procurement ► Manage Purchase Orders Central",
        "Fiori Launchpad (Hub) ► Central Procurement ► Create Central Purchase Order",
        "SPRO ► Materials Management ► Central Procurement ► Central Purchasing ► Activate and Configure",
      ],
      tables: ["EKKO", "EKPO", "EKET", "EKBE", "T161"],
      tcodes: ["ME21N", "ME22N", "ME23N", "ME2N", "SOAMANAGER"],
      fiori: ["F2420 (Manage PO Central)", "F1990 (Procurement Overview)", "F0842A (Monitor PO Items)"],
      configHe: [
        "הפעלת Central Purchasing ושיוך מערכות-מחוברות לרכזת.",
        "מיפוי Purchasing Organization / Purchasing Group / Plant בין רכזת ל-Connected System.",
        "הגדרת Document Types ו-Field Control להזמנות מרכזיות.",
        "הגדרת שירותי-עדכון-סטטוס (GR/IR) חוזרים מה-Connected System לרכזת.",
      ],
      flow: [
        { he: "יצירת PO ברכזת", code: "Create Central PO" },
        { he: "הורדה ל-Connected", code: "SOAP", note: "PO תפעולי" },
        { he: "שליחה לספק", code: "Connected ERP" },
        { he: "GR / IR מקומי", code: "MIGO/MIRO" },
        { he: "ניטור ברכזת", code: "F2420", note: "סטטוס חוזר" },
      ],
      masterDataHe: [
        "Purchasing Org / Group / Plant ממופים ל-System Alias של מערכת-הביצוע.",
        "Account Assignment ו-Inventory נשארים בשליטת ה-Connected System.",
      ],
      mistakesHe: [
        "שינוי שדה-מלאי מהרכזת שאמור להישלט מקומית ➔ אי-עקביות.",
        "מיפוי Purchasing Org חסר ➔ ההזמנה נכשלת בהורדה.",
        "הסתמכות על סטטוס-רכזת מבלי לוודא ששירות-עדכון GR/IR פעיל.",
      ],
      troubleshootHe: [
        "Central PO לא יורדת ➔ מיפוי Plant/Purchasing Org או שגיאת-SOAP.",
        "סטטוס-GR לא מתעדכן ברכזת ➔ שירות-עדכון חוזר לא פעיל או queue תקוע.",
        "שדה ריק אחרי הורדה ➔ Field Control / מיפוי-ערכים חסר.",
      ],
      bestPracticeHe: [
        "הגדר בבירור אילו שדות נשלטים ברכזת ואילו ב-Connected System.",
        "השתמש ב-mass change מרכזי לעדכוני-מחיר/תאריך רוחביים.",
        "ודא ששירותי-עדכון-סטטוס דו-כיווניים פעילים בכל מערכת.",
      ],
      interviewHe: [
        { qHe: "היכן 'חיה' ההזמנה ב-Central Purchasing?", aHe: "ה-PO התפעולי חי ב-Connected System (EKKO/EKPO שם); הרכזת מחזיקה העתק-מצב לניהול ולניטור." },
        { qHe: "איזו אפליקציה משמשת לניטור הזמנות מרכזי?", aHe: "Manage Purchase Orders Central — נראות רוחבית על כל ההזמנות בכל המערכות-המחוברות." },
      ],
      takeawaysHe: [
        "רכש מרכזי = יצירה וניטור הזמנות על-פני כל ה-ERP-ים ממסך אחד.",
        "ה-PO התפעולי נשאר ב-Connected System; הרכזת מנהלת.",
        "Manage Purchase Orders Central + עדכוני-סטטוס דו-כיווניים.",
      ],
      relatedHe: [
        { labelHe: "MM · דרישה מרכזית (14.2)", href: "/library/mm/chapter-14/#sub-14.2" },
        { labelHe: "MM · חוזי רכש מרכזיים (14.5)", href: "/library/mm/chapter-14/#sub-14.5" },
        { labelHe: "אובייקט · EKPO", href: "/library/mm/object/EKPO/" },
      ],
    },
    // ============================================================ 14.4
    {
      id: "14.4", titleHe: "מקור מרכזי", titleEn: "Central Sourcing",
      execHe:
        "Central Sourcing מאפשר לרוכש-המרכזי לאחד דרישות מכל המערכות-המחוברות, לנהל תהליכי-מקור (RFQ — בקשה-להצעת-מחיר), להשוות הצעות-ספקים, ולהמיר את הזוכה לחוזה או להזמנה. זהו שלב-ה'מקור' של הרכש המרכזי — מהביקוש המאוחד ועד בחירת-הספק האופטימלי במחיר ובתנאים.",
      beginnerHe:
        "אחרי שאספנו את כל הבקשות, צריך להחליט מאיזה ספק לקנות ובאיזה מחיר. Central Sourcing שולח 'בקשה-להצעת-מחיר' (RFQ) לכמה ספקים, אוסף את ההצעות, משווה ביניהן, ובוחר את הזוכה. כל זה נעשה ברכזת על-בסיס הביקוש המאוחד מכל המפעלים — מה שנותן כוח-מיקוח גדול יותר.",
      consultantHe:
        "התהליך: איחוד דרישות (מ-Central Requisitioning) ל-Sourcing Project; הנפקת RFQ למספר ספקים; קליטת הצעות והשוואה (Bid comparison); הענקת-זכייה (Award) שמומרת ל-Central Purchase Contract או ל-Central PO שיורדים ל-Connected Systems. ניתן לשלב מקורות חיצוניים — RFx ב-SAP Ariba Sourcing — ולהחזיר את התוצאה לרכזת. נתוני-האב הקריטיים הם ה-Supplier (Business Partner) וה-Source List/Purchasing Info Record. אפליקציות: Manage RFQs, Manage Supplier Quotations.",
      purposeHe:
        "למנף את הביקוש המאוחד לכוח-מיקוח, לנהל תחרות-ספקים שקופה, ולחבר את בחירת-המקור ישירות לחוזה/הזמנה — כך שהחיסכון מהמקור מתורגם אוטומטית לביצוע.",
      processExampleHe:
        "רוכש מאחד דרישות-פחיות משלושה מפעלים ל-Sourcing Project יחיד; מנפיק RFQ לארבעה ספקי-אלומיניום; משווה הצעות לפי מחיר ותנאי-אספקה; מעניק זכייה לספק הזול ביותר וממיר ל-Central Purchase Contract שכל מפעל מושך ממנו.",
      cbcHe:
        "ב-CBC Central Sourcing מאחד את ביקוש-הפחיות הרבעוני מכל מפעלי-הבקבוק, מריץ RFQ מול ספקי-אלומיניום גלובליים, ומעגן את הזוכה בחוזה-מסגרת — מינוף-מסה שמפעל בודד לא היה משיג לבדו.",
      navHe: [
        "Fiori Launchpad (Hub) ► Central Procurement ► Manage RFQs",
        "Fiori Launchpad (Hub) ► Central Procurement ► Manage Supplier Quotations",
        "SPRO ► Materials Management ► Central Procurement ► Central Sourcing ► Configure",
      ],
      tables: ["EBAN", "EKKO", "EORD", "EINA", "EINE"],
      tcodes: ["ME41", "ME47", "ME49", "ME57", "ME58"],
      fiori: ["F2785 (Manage RFQs)", "F2787 (Manage Supplier Quotations)", "F1990 (Procurement Overview)"],
      configHe: [
        "הפעלת Central Sourcing ושיוך מערכות-מחוברות.",
        "הגדרת RFQ Document Types ותהליך השוואת-הצעות.",
        "אינטגרציה אופציונלית ל-SAP Ariba Sourcing להרצת RFx חיצוני.",
        "כללי-המרה מ-Award ל-Central Contract / Central PO.",
      ],
      flow: [
        { he: "איחוד דרישות", code: "Sourcing Project" },
        { he: "הנפקת RFQ", code: "Manage RFQs" },
        { he: "השוואת הצעות", code: "Bid comparison" },
        { he: "הענקת זכייה", code: "Award" },
        { he: "המרה לחוזה/PO", code: "Central Contract" },
      ],
      masterDataHe: [
        "Supplier (Business Partner) ממופה בין הרכזת לכל מערכת-מחוברת.",
        "Source List / Info Record מעדכנים את מקור-האספקה לאחר Award.",
      ],
      mistakesHe: [
        "הרצת RFQ ללא איחוד-דרישות מלא ➔ אובדן כוח-מיקוח.",
        "אי-עדכון Source List אחרי Award ➔ הזמנות עתידיות לא מצביעות על הזוכה.",
        "חוסר מיפוי Supplier ➔ כשל בהמרה לחוזה/PO ב-Connected System.",
      ],
      troubleshootHe: [
        "הצעות לא נקלטות ➔ RFQ Document Type / הרשאות-ספק שגויים.",
        "Award לא מומר לחוזה ➔ מיפוי Supplier/Material או כללי-המרה חסרים.",
        "Ariba RFx לא חוזר לרכזת ➔ אינטגרציית Ariba Sourcing לא פעילה.",
      ],
      bestPracticeHe: [
        "אחד דרישות ככל הניתן לפני RFQ למקסום מינוף-מסה.",
        "תעד קריטריוני-השוואה אובייקטיביים (מחיר, אספקה, איכות).",
        "חבר Award אוטומטית ל-Central Contract למימוש-חיסכון מובטח.",
      ],
      interviewHe: [
        { qHe: "מה מטרת Central Sourcing?", aHe: "לאחד דרישות מכל המערכות, לנהל RFQ ולהשוות ספקים, ולהמיר את הזוכה לחוזה/הזמנה — מינוף הביקוש המאוחד לכוח-מיקוח." },
        { qHe: "כיצד משולב SAP Ariba ב-Central Sourcing?", aHe: "ניתן להנפיק RFx ב-SAP Ariba Sourcing ולהחזיר את התוצאה (Award) לרכזת להמרה לחוזה/PO." },
      ],
      takeawaysHe: [
        "מקור מרכזי = איחוד-ביקוש → RFQ → השוואה → Award.",
        "ה-Award מומר ל-Central Contract/PO היורד ל-Connected Systems.",
        "אופציה לשלב SAP Ariba Sourcing להרצת RFx.",
      ],
      relatedHe: [
        { labelHe: "MM · דרישה מרכזית (14.2)", href: "/library/mm/chapter-14/#sub-14.2" },
        { labelHe: "MM · חוזי רכש מרכזיים (14.5)", href: "/library/mm/chapter-14/#sub-14.5" },
        { labelHe: "MM · שילוב Ariba (14.7)", href: "/library/mm/chapter-14/#sub-14.7" },
      ],
    },
    // ============================================================ 14.5
    {
      id: "14.5", titleHe: "חוזי רכש מרכזיים", titleEn: "Central Purchase Contracts",
      execHe:
        "Central Purchase Contract הוא הסכם-מסגרת (Outline Agreement) המנוהל ברכזת ומופץ למספר מערכות-מחוברות, כך שכל מפעל/חברה יכול 'למשוך' ממנו (Release Order / Call-off) במחיר ובתנאים אחידים. זהו המנגנון שמתרגם חוזה גלובלי אחד למחיר-קנייה אחיד בכל אתרי-הביצוע.",
      beginnerHe:
        "חוזה-מסגרת הוא הסכם ארוך-טווח עם ספק: 'נקנה ממך X טון בשנה במחיר Y'. בחוזה מרכזי, החוזה נחתם פעם אחת ברכזת ומופץ לכל המפעלים. אחר-כך כל מפעל מזמין 'על-חשבון' החוזה (call-off) ומקבל את אותו מחיר טוב — בלי לנהל מו\"מ נפרד.",
      consultantHe:
        "ה-Central Contract נוצר ברכזת ומופץ (distributed) ל-Connected Systems הרלוונטיים כ-Operational Contract מקומי; כל Connected System יוצר ממנו Release Orders. ניטור-מימוש (Release documentation, target/released quantity) מצרף את הניצול מכל המערכות לתצוגה מרכזית. אפליקציות: Manage Central Purchase Contracts, Monitor Central Purchase Contract Items. מיפוי Plant/Purchasing Org/Material חיוני להפצה. מצב-המימוש המאוחד מאפשר לראות מתי מתקרבים ל-target quantity גלובלי.",
      purposeHe:
        "לעגן תנאים שהושגו ב-Central Sourcing בהסכם-מחייב אחד, להבטיח מחיר אחיד בכל האתרים, ולנטר את המימוש הגלובלי מול היעד — כל זאת תוך ביצוע מקומי בכל מערכת.",
      processExampleHe:
        "אחרי Award לספק-סוכר, נוצר Central Contract עם target quantity של 50,000 טון/שנה; הוא מופץ לחמש מערכות-מחוברות; כל מפעל מנפיק Release Orders לפי צרכיו; הרוכש-המרכזי מנטר ב-Monitor Central Purchase Contract Items את הניצול המצטבר מול היעד.",
      cbcHe:
        "ב-CBC חוזה-מסגרת גלובלי לתרכיז (מספק-המותג) מנוהל כ-Central Contract; כל מפעל-בקבוק מושך ממנו call-offs לפי תוכנית-המילוי שלו, וכולם נהנים מאותם תנאים — והמטה רואה את הניצול המאוחד מול ה-target.",
      navHe: [
        "Fiori Launchpad (Hub) ► Central Procurement ► Manage Central Purchase Contracts",
        "Fiori Launchpad (Hub) ► Central Procurement ► Monitor Central Purchase Contract Items",
        "SPRO ► Materials Management ► Central Procurement ► Central Contracts ► Configure Distribution",
      ],
      tables: ["EKKO", "EKPO", "EKAB", "EKPA", "T16FS"],
      tcodes: ["ME31K", "ME32K", "ME33K", "ME3N", "ME3L"],
      fiori: ["F2319 (Manage Central Contracts)", "F2322 (Monitor Central Contract Items)", "F1990"],
      configHe: [
        "הפעלת Central Contracts והגדרת מערכות-יעד להפצה (Distribution).",
        "מיפוי Plant / Purchasing Org / Material לכל מערכת-יעד.",
        "הגדרת target quantity/value ותנאי-תמחור הנשלטים ברכזת.",
        "שירותי-עדכון Release documentation חוזרים מכל Connected System.",
      ],
      flow: [
        { he: "יצירת חוזה מרכזי", code: "Central Contract" },
        { he: "הפצה למערכות", code: "Distribution", note: "Operational Contract מקומי" },
        { he: "Call-off מקומי", code: "Release Order" },
        { he: "ניצול חוזר לרכזת", code: "Release doc" },
        { he: "ניטור מאוחד", code: "F2322", note: "מול target" },
      ],
      masterDataHe: [
        "Material / Plant / Purchasing Org ממופים לכל מערכת-יעד בהפצה.",
        "Supplier (Business Partner) ממופה אחיד בכל המערכות.",
      ],
      mistakesHe: [
        "חוזה לא מופץ לכל מערכות-היעד ➔ מפעלים מסוימים לא יכולים למשוך.",
        "מיפוי Material/Plant חסר ➔ כשל בהפצת-החוזה.",
        "התעלמות מ-target quantity ➔ חריגה גלובלית לא-מנוטרת.",
      ],
      troubleshootHe: [
        "Release Order נכשל ב-Connected System ➔ החוזה לא הופץ או מיפוי חסר.",
        "ניצול לא מתעדכן ברכזת ➔ שירות Release documentation חוזר לא פעיל.",
        "מחיר שונה במפעל ➔ תנאי-תמחור לא הופצו או נדרסו מקומית.",
      ],
      bestPracticeHe: [
        "הפץ את החוזה לכל מערכות-היעד מיד עם החתימה.",
        "נטר את ה-target quantity הגלובלי דרך Monitor Central Contract Items.",
        "נעל תנאי-תמחור-מפתח ברכזת כדי למנוע דריסה מקומית.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Central Contract ל-Operational Contract?", aHe: "ה-Central Contract מנוהל ברכזת ומופץ; ה-Operational Contract הוא העותק המקומי ב-Connected System שממנו מבוצעים Release Orders." },
        { qHe: "כיצד מנוטר המימוש הגלובלי?", aHe: "דרך Monitor Central Purchase Contract Items, המצרף את ה-Release documentation מכל המערכות מול ה-target quantity." },
      ],
      takeawaysHe: [
        "חוזה מרכזי = הסכם-מסגרת אחד המופץ לכל המערכות.",
        "כל מפעל מושך Release Orders במחיר ובתנאים אחידים.",
        "ניטור-מימוש מאוחד מול target quantity גלובלי.",
      ],
      relatedHe: [
        { labelHe: "MM · מקור מרכזי (14.4)", href: "/library/mm/chapter-14/#sub-14.4" },
        { labelHe: "MM · אנליטיקה מרכזית (14.6)", href: "/library/mm/chapter-14/#sub-14.6" },
        { labelHe: "אובייקט · EKAB", href: "/library/mm/object/EKAB/" },
      ],
    },
    // ============================================================ 14.6
    {
      id: "14.6", titleHe: "אנליטיקה מרכזית", titleEn: "Central Analytics",
      execHe:
        "Central Analytics מספק תצוגות-ניתוח רוחביות על-פני כל המערכות-המחוברות — ניתוח-הוצאה (Spend), ביצועי-ספקים, מצב-הזמנות וניצול-חוזים — מתוך הרכזת. הוא הופך את נתוני-הרכש המבוזרים לתובנה אחת, ומאפשר החלטות-מקור מבוססות-נתונים ברמה הגלובלית.",
      beginnerHe:
        "אחרי שכל הרכש זורם דרך הרכזת, אפשר לשאול שאלות-על: 'כמה הוצאנו על פחיות בכל המפעלים?', 'מי הספק שמאחר הכי הרבה?'. Central Analytics נותן דוחות ולוחות-מחוונים (dashboards) שמסכמים את כל המערכות יחד — נראות שאי-אפשר לקבל ממערכת בודדת.",
      consultantHe:
        "האנליטיקה נשענת על CDS Views ו-Embedded Analytics ב-S/4HANA, המאחדים נתונים-משוכפלים מה-Connected Systems (ו/או נתוני-Ariba) ב-Procurement Overview Page ובאפליקציות-KPI. מקורות-הנתונים כוללים העתקי-מצב של PR/PO/Contract ברכזת. ניתן להעמיק ל-SAP Analytics Cloud לדוחות-על. דורש שהנתונים יסונכרנו לרכזת ושמיפוי נתוני-האב יהיה עקבי — אחרת ה-Spend מקובץ שגוי.",
      purposeHe:
        "להפוך נתוני-רכש מבוזרים לתובנה אחידה — לזהות הזדמנויות-איחוד, סיכוני-ספק וחריגות-הוצאה, ולכוון את אסטרטגיית-המקור ברמה הגלובלית.",
      processExampleHe:
        "מנהל-רכש פותח Procurement Overview Page ברכזת, רואה ניתוח-Spend לפי קבוצת-חומר על-פני כל המפעלים, מזהה שלושה מפעלים שקונים אותו חומר מספקים שונים, ויוזם Central Sourcing לאיחוד — החלטה שנתוני-מערכת-בודדת לא היו חושפים.",
      cbcHe:
        "ב-CBC Central Analytics מציג את ה-Spend המאוחד על פחיות, סוכר ו-CO2 בכל המדינות, חושף שונות-מחיר בין מפעלים, ומכוון את המטה לאחד הזמנות ולחתום חוזה גלובלי במקום מקומי.",
      navHe: [
        "Fiori Launchpad (Hub) ► Central Procurement ► Procurement Overview Page",
        "Fiori Launchpad (Hub) ► Central Procurement ► Spend / Supplier KPIs",
        "SPRO ► Materials Management ► Central Procurement ► Analytics ► Configure CDS Sources",
      ],
      tables: ["EKKO", "EKPO", "EKBE", "EBAN", "ACDOCA"],
      tcodes: ["ME2N", "ME80FN", "S_ALR_87012357", "RSRT"],
      fiori: ["F1990 (Procurement Overview)", "F2392 (Supplier Evaluation)", "F0863 (Purchasing Spend)"],
      configHe: [
        "הפעלת Embedded Analytics ו-CDS Views לרכש מרכזי.",
        "הבטחת סנכרון נתוני PR/PO/Contract לרכזת כמקור-אנליטי.",
        "מיפוי נתוני-אב עקבי (Material Group, Supplier) למניעת קיבוץ-שגוי.",
        "אינטגרציה אופציונלית ל-SAP Analytics Cloud לדוחות-על.",
      ],
      flow: [
        { he: "סנכרון נתונים לרכזת", code: "Replication" },
        { he: "CDS Views מאחדים", code: "Embedded Analytics" },
        { he: "Overview Page", code: "F1990" },
        { he: "תובנה → פעולה", code: "Central Sourcing" },
      ],
      masterDataHe: [
        "Material Group / Supplier עקביים הם תנאי לקיבוץ-Spend נכון.",
        "העתקי-מצב של PR/PO/Contract ברכזת הם מקור-הנתונים.",
      ],
      mistakesHe: [
        "מיפוי Material Group לא-עקבי ➔ Spend מקובץ שגוי.",
        "ניתוח על נתונים לא-מסונכרנים ➔ תמונה חלקית.",
        "התעלמות מנתוני-Ariba ➔ הוצאת Off-contract לא-נראית.",
      ],
      troubleshootHe: [
        "Spend חסר ממפעל ➔ נתוני אותה מערכת לא סונכרנו לרכזת.",
        "קיבוץ שגוי ➔ מיפוי Material Group/Supplier לא-עקבי.",
        "KPI ריק ➔ CDS View / הרשאות-אנליטיקה חסרים.",
      ],
      bestPracticeHe: [
        "ודא סנכרון מלא ועקבי לפני הסתמכות על דוחות.",
        "תקנן Material Groups ו-Supplier IDs בין המערכות.",
        "חבר תובנות-אנליטיקה ישירות ל-Central Sourcing לפעולה.",
      ],
      interviewHe: [
        { qHe: "על מה נשענת Central Analytics?", aHe: "על CDS Views ו-Embedded Analytics ב-S/4HANA המאחדים העתקי-מצב של PR/PO/Contract מכל המערכות-המחוברות ב-Procurement Overview Page." },
        { qHe: "מהו תנאי-מפתח לאמינות הניתוח?", aHe: "מיפוי עקבי של נתוני-אב (Material Group, Supplier) וסנכרון מלא לרכזת — אחרת ה-Spend מקובץ שגוי." },
      ],
      takeawaysHe: [
        "אנליטיקה מרכזית = תובנת-רכש רוחבית על כל המערכות.",
        "נשענת על CDS/Embedded Analytics + סנכרון נתונים.",
        "מזהה הזדמנויות-איחוד וחריגות-הוצאה גלובליות.",
      ],
      relatedHe: [
        { labelHe: "MM · חוזי רכש מרכזיים (14.5)", href: "/library/mm/chapter-14/#sub-14.5" },
        { labelHe: "MM · שילוב Ariba (14.7)", href: "/library/mm/chapter-14/#sub-14.7" },
        { labelHe: "אובייקט · EKBE", href: "/library/mm/object/EKBE/" },
      ],
    },
    // ============================================================ 14.7
    {
      id: "14.7", titleHe: "שילוב עם SAP Ariba ו-SAP Business Network", titleEn: "Integration with SAP Ariba and SAP Business Network",
      execHe:
        "הרכזת אינה אי — היא משולבת עם פתרונות-הענן של SAP: SAP Ariba (Sourcing, Buying, Contracts) ו-SAP Business Network (רשת-הספקים שבעבר Ariba Network) לשיתוף-מסמכים עם ספקים. השילוב מרחיב את הרכש המרכזי לתהליכי-מקור אסטרטגיים בענן ולשיתוף-פעולה דיגיטלי עם ספקים — PO, אישור-הזמנה, חשבונית — דרך הרשת.",
      beginnerHe:
        "SAP Ariba הוא 'שוק-רכש' ענן: מקום לנהל מכרזים, חוזים וקטלוגים. SAP Business Network הוא 'הרשת החברתית של הספקים' — רשת שבה הקונה והספק מחליפים הזמנות וחשבוניות דיגיטלית. הרכזת מתחברת לשניהם: היא יכולה להריץ מכרז ב-Ariba ולשלוח הזמנות לספקים דרך הרשת, במקום פקס ואימייל.",
      consultantHe:
        "האינטגרציה נשענת על SAP Integration Suite / Cloud Integration (תרחישי cXML, SOAP, OData). תרחישים מרכזיים: שליחת PO מהרכזת אל ה-Business Network ל-order confirmation ו-e-invoice; הזרמת Sourcing Awards מ-SAP Ariba Sourcing אל Central Sourcing; סנכרון חוזים מ-SAP Ariba Contracts. ב-SAP Ariba Central Procurement, Private Cloud Edition (נושא 14.8) הרכזת היא S/4HANA Private Cloud המשמשת hub עבור Ariba Buying. נדרשים מיפוי-מסמכים (cXML↔IDoc/SOAP), אישורי-ספק ברשת, וניהול שגיאות דרך Integration Suite monitoring.",
      purposeHe:
        "להרחיב את הרכש המרכזי מעבר לגבולות-ה-ERP — אל מקור-אסטרטגי בענן ואל שיתוף-פעולה דיגיטלי עם ספקים — לקיצור מחזורי-רכש, להפחתת-טעויות ולתאימות-חשבוניות אוטומטית.",
      processExampleHe:
        "רוכש מריץ RFx ב-SAP Ariba Sourcing; ה-Award חוזר לרכזת ל-Central Contract; ההזמנה נשלחת אל הספק דרך SAP Business Network; הספק מאשר (order confirmation) ושולח e-invoice חזרה — והכל מנוטר מהרכזת ומה-Integration Suite.",
      cbcHe:
        "ב-CBC מכרזי-אלומיניום אסטרטגיים מנוהלים ב-SAP Ariba Sourcing; הזמנות-הפחיות נשלחות לספקים דרך SAP Business Network עם אישור-הזמנה ו-e-invoice — מחליף תקשורת ידנית ומאיץ את מחזור ה-Procure-to-Pay.",
      navHe: [
        "SAP Integration Suite ► Cloud Integration ► Discover (Ariba / Business Network packages)",
        "SAP Business Network ► Buyer Account ► Transaction Configuration",
        "SPRO ► Materials Management ► Central Procurement ► Integration with SAP Ariba / Business Network",
      ],
      tables: ["EKKO", "EKPO", "EDIDC", "EDID4", "BBP_PDIGP"],
      tcodes: ["SOAMANAGER", "SXMB_MONI", "WE02", "BD87"],
      fiori: ["F1990", "Integration Suite Monitor", "F2785 (Manage RFQs)"],
      configHe: [
        "הקמת חבילות-אינטגרציה ב-SAP Integration Suite (Ariba, Business Network).",
        "מיפוי-מסמכים cXML ↔ IDoc/SOAP (PO, Order Confirmation, Invoice).",
        "הגדרת חשבון-קונה (Buyer Account) ב-SAP Business Network והזמנת-ספקים.",
        "ניהול-שגיאות וניטור דרך Integration Suite / SXMB_MONI.",
      ],
      flow: [
        { he: "RFx בענן", code: "Ariba Sourcing" },
        { he: "Award לרכזת", code: "Central Contract" },
        { he: "PO לרשת", code: "Business Network", note: "cXML" },
        { he: "אישור + חשבונית", code: "Order Conf / e-Invoice" },
        { he: "ניטור מאוחד", code: "Integration Suite" },
      ],
      masterDataHe: [
        "Supplier חייב להיות רשום ומחובר ב-SAP Business Network (Vendor ANID).",
        "מיפוי Material/Unit/Currency בין הרכזת ל-cXML של הרשת.",
      ],
      mistakesHe: [
        "ספק לא מחובר לרשת ➔ ה-PO לא נשלח / לא מאושר.",
        "מיפוי cXML שגוי ➔ חשבוניות נדחות אוטומטית.",
        "התעלמות מניטור-Integration Suite ➔ הודעות-שגיאה לא מטופלות.",
      ],
      troubleshootHe: [
        "PO לא מגיע לספק ➔ ANID לא ממופה או חבילת-אינטגרציה לא פעילה.",
        "e-Invoice נדחית ➔ מיפוי cXML / נתוני-מס שגויים.",
        "Award לא חוזר מ-Ariba ➔ תרחיש-אינטגרציית Sourcing לא מוגדר.",
      ],
      bestPracticeHe: [
        "וודא הצטרפות-ספקים לרשת לפני הפעלת תרחישי-מסמכים.",
        "השתמש בחבילות-תוכן מובנות של Integration Suite במקום מיפוי ידני.",
        "נטר באופן יזום שגיאות-אינטגרציה ותרגם ל-SLA.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין SAP Ariba ל-SAP Business Network?", aHe: "SAP Ariba הוא חבילת-יישומי-רכש (Sourcing/Buying/Contracts); SAP Business Network היא רשת-הספקים לשיתוף-מסמכים (PO/Confirmation/Invoice) בין קונה לספק." },
        { qHe: "על מה נשענת האינטגרציה טכנית?", aHe: "על SAP Integration Suite / Cloud Integration עם תרחישי cXML, SOAP ו-OData, וניטור דרך ה-Integration Suite." },
      ],
      takeawaysHe: [
        "הרכזת משולבת עם SAP Ariba (מקור/חוזים) ו-SAP Business Network (מסמכי-ספק).",
        "האינטגרציה נשענת על SAP Integration Suite (cXML/SOAP/OData).",
        "מרחיב את הרכש המרכזי למקור-בענן ו-Procure-to-Pay דיגיטלי.",
      ],
      relatedHe: [
        { labelHe: "MM · מקור מרכזי (14.4)", href: "/library/mm/chapter-14/#sub-14.4" },
        { labelHe: "MM · קונפיגורציית Ariba Central (14.8)", href: "/library/mm/chapter-14/#sub-14.8" },
        { labelHe: "MM · אנליטיקה מרכזית (14.6)", href: "/library/mm/chapter-14/#sub-14.6" },
      ],
    },
    // ============================================================ 14.8
    {
      id: "14.8", titleHe: "קונפיגורציית SAP Ariba Central Procurement, Private Cloud Edition", titleEn: "Configuring SAP Ariba Central Procurement, Private Cloud Edition",
      execHe:
        "תת-פרק זה הוא מדריך-המימוש לתצורת SAP Ariba Central Procurement, Private Cloud Edition — פריסה שבה רכזת S/4HANA (Private Cloud) משמשת hub מרכזי המשולב עם SAP Ariba Buying ועם ה-Connected Systems. הוא עובר את שלבי-ההקמה לפי סדר: תנאים-מוקדמים, חיבוריות למערכות-ERP, אימות-נתונים וזיהוי-פערים, קונפיגורציה של הרכזת, ושילוב SAP Ariba Buying for SAP S/4HANA עם הרכש המרכזי.",
      beginnerHe:
        "כאן עוברים מ'מה זה' ל'איך מקימים'. כמו הרכבת רהיט: יש סדר-שלבים. קודם בודקים שיש את כל הדרוש (תנאים-מוקדמים), אז מחברים את המערכות זו-לזו, מוודאים שהנתונים תקינים, מגדירים את הרכזת, ולבסוף מחברים את SAP Ariba Buying. כל שלב הוא תת-סעיף נפרד בהמשך.",
      consultantHe:
        "הפריסה משלבת שלושה רכיבים: (1) רכזת S/4HANA Private Cloud עם חבילת Central Procurement, (2) Connected Systems (S/4 ו/או ECC) דרך SOAP/RFC, ו-(3) SAP Ariba Buying for SAP S/4HANA דרך SAP Integration Suite. סדר-המימוש קריטי: חיבוריות לפני מיפוי-נתונים, ומיפוי לפני הפעלת-תרחישים. כל תת-סעיף (14.8.1–14.8.5) מטפל בשלב — מ-Prerequisites ועד שילוב-Ariba — וכולל את ה-SOAMANAGER/SM59 logical systems, DRF replication, ו-Integration Suite content.",
      purposeHe:
        "לספק מסלול-מימוש ברור ומסודר לתצורת הרכש-המרכזי-בענן, כך שצוות-הפרויקט יוכל להקים את הרכזת, לחבר את המערכות ולהפעיל את SAP Ariba Buying בשלבים נשלטים עם נקודות-בקרה.",
      processExampleHe:
        "פרויקט-מימוש פותח ב-Prerequisites (גרסאות, רישוי, הרשאות), עובר ל-Establishing Connectivity (SOAMANAGER/SM59), ממשיך ל-Validating Data and Identifying Gaps, מגדיר את הרכזת, ולבסוף מחבר את SAP Ariba Buying — כל שלב נבדק לפני המעבר לבא.",
      cbcHe:
        "ב-CBC הקמת רכזת-רכש-בענן מתבצעת בשלבים: חיבור מפעלי-הבקבוק תחילה (חיבוריות), מיפוי קטלוגי-החומרים (אימות-נתונים), הגדרת הרכזת, ואז הפעלת SAP Ariba Buying ל-self-service של רוכשי-המפעלים.",
      navHe: [
        "SPRO ► Materials Management ► Central Procurement ► SAP Ariba Central Procurement (Private Cloud)",
        "SAP Integration Suite ► Discover ► SAP Ariba Buying content packages",
        "Hub ► SOAMANAGER / SM59 ► Connected Systems setup",
      ],
      tables: ["TBE11", "TBE31", "EKKO", "EBAN", "EDIDC"],
      tcodes: ["SOAMANAGER", "SM59", "DRFOUT", "SPRO"],
      fiori: ["F1990", "Integration Suite Monitor", "F2418 (Manage PR Central)"],
      configHe: [
        "סדר-מימוש: Prerequisites → Connectivity → Data Validation → Hub Config → Ariba Buying integration.",
        "רכזת = S/4HANA Private Cloud עם חבילת Central Procurement מופעלת.",
        "Connected Systems מחוברים דרך SOAP/RFC; Ariba דרך SAP Integration Suite.",
        "כל שלב נבדק בנקודת-בקרה לפני המעבר הלאה (ראה 14.8.1–14.8.5).",
      ],
      flow: [
        { he: "תנאים-מוקדמים", code: "14.8.1" },
        { he: "חיבוריות ל-ERP", code: "14.8.2" },
        { he: "אימות-נתונים", code: "14.8.3" },
        { he: "קונפיגורציית רכזת", code: "14.8.4" },
        { he: "שילוב Ariba Buying", code: "14.8.5" },
      ],
      masterDataHe: [
        "Logical Systems / Business System IDs לכל Connected System.",
        "מיפוי Material/Plant/Supplier מוקם לפני הפעלת-תרחישים.",
      ],
      mistakesHe: [
        "דילוג על סדר-השלבים ➔ הפעלת-תרחישים נכשלת מחוסר חיבוריות/מיפוי.",
        "ערבוב תצורת-רכזת עם תצורת-Connected System.",
        "אי-ביצוע נקודות-בקרה בין שלבים ➔ תקלות מתגלות מאוחר.",
      ],
      troubleshootHe: [
        "תרחיש-Ariba נכשל ➔ ודא שהושלמו 14.8.1–14.8.4 לפניו.",
        "Connected System לא נראה ➔ Logical System / RFC לא מוגדרים (14.8.2).",
        "אובייקט מרכזי לא יורד ➔ מיפוי-נתונים לא הושלם (14.8.3/14.8.4).",
      ],
      bestPracticeHe: [
        "עקוב אחר הסדר 14.8.1→14.8.5 בלי דילוגים.",
        "תעד נקודת-בקרה בסוף כל שלב.",
        "השתמש בחבילות-תוכן מובנות של Integration Suite ל-Ariba.",
      ],
      interviewHe: [
        { qHe: "מהו סדר-המימוש הנכון של Ariba Central Procurement, Private Cloud?", aHe: "Prerequisites → Connectivity → Data Validation & Gaps → Hub Configuration → SAP Ariba Buying integration." },
        { qHe: "מאילו שלושה רכיבים מורכבת הפריסה?", aHe: "רכזת S/4HANA Private Cloud, Connected Systems (S4/ECC) דרך SOAP/RFC, ו-SAP Ariba Buying דרך SAP Integration Suite." },
      ],
      takeawaysHe: [
        "תצורה משלבת רכזת Private Cloud + Connected Systems + Ariba Buying.",
        "סדר-מימוש קריטי: חיבוריות → נתונים → רכזת → Ariba.",
        "כל שלב (14.8.1–14.8.5) הוא נקודת-בקרה נפרדת.",
      ],
      relatedHe: [
        { labelHe: "MM · שילוב Ariba (14.7)", href: "/library/mm/chapter-14/#sub-14.7" },
        { labelHe: "MM · חיבוריות ל-ERP (14.8.2)", href: "/library/mm/chapter-14/#sub-14.8.2" },
      ],
      children: [
        {
          id: "14.8.1", titleHe: "תנאים מוקדמים", titleEn: "Prerequisites",
          execHe: "שלב התנאים-המוקדמים מוודא שכל היסודות קיימים לפני תחילת-המימוש: גרסאות-מערכת נתמכות (רכזת S/4HANA Private Cloud + Connected Systems בגרסה תואמת), רישוי SAP Ariba Central Procurement, הרשאות, וזמינות SAP Integration Suite. ללא תנאים-מוקדמים מלאים, שלבי-החיבור והקונפיגורציה ייכשלו.",
          beginnerHe: "לפני שבונים, בודקים שיש את כל החלקים: הגרסאות הנכונות, הרישיון, ההרשאות, והחיבור-לענן (Integration Suite). זו רשימת-תיוג של 'מה צריך להיות מוכן' לפני שמתחילים בכלל.",
          consultantHe: "בודקים: גרסת-רכזת S/4HANA (Private Cloud) תואמת ל-Central Procurement; גרסאות Connected Systems (S/4HANA או ECC עם רמת-תיקונים נדרשת); רישוי Ariba Central Procurement ו-Integration Suite; משתמשי-תקשורת (Communication Users) והרשאות; וזמינות SAP Notes רלוונטיים. תיעוד התנאים מונע הפתעות בשלבים מתקדמים.",
          purposeHe: "להבטיח שכל היסודות הטכניים והרישוייים קיימים לפני ההשקעה בחיבוריות ובקונפיגורציה — מניעת כשל-מימוש בשלב מאוחר ויקר.",
          processExampleHe: "צוות-הפרויקט ממלא רשימת-תיוג: גרסת-רכזת ✓, גרסת-ECC-מחובר ✓, רישוי Ariba ✓, Integration Suite tenant ✓, Communication Users ✓ — ורק אז עובר ל-14.8.2.",
          cbcHe: "ב-CBC לפני ההקמה בודקים שכל מפעל-בקבוק מריץ גרסת-ERP נתמכת, שהרישוי המרכזי קיים, ושיש גישת-Integration-Suite — מונע גילוי-מאוחר שמפעל מסוים לא תואם.",
          navHe: ["SPRO ► Central Procurement ► SAP Ariba Central Procurement ► Prerequisites Checklist", "SAP for Me ► Licenses / SAP Notes"],
          tables: ["TBE11", "PRGN_CUST"],
          tcodes: ["SU01", "PFCG", "SNOTE"],
          fiori: ["Maintain Communication Users", "F1990"],
          configHe: ["ודא גרסת-רכזת ו-Connected Systems נתמכות.", "אמת רישוי Ariba Central Procurement + Integration Suite.", "צור Communication Users והקצה הרשאות.", "החל SAP Notes נדרשים."],
          mistakesHe: ["דילוג על בדיקת-גרסאות ➔ אי-תאימות בשלב-חיבור.", "חוסר Communication Users ➔ שירותי-SOAP נכשלים.", "התעלמות מ-SAP Notes נדרשים."],
          troubleshootHe: ["שירות-SOAP נכשל מאוחר ➔ Communication User/הרשאה חסרים (תנאי-מוקדם).", "אי-תאימות-גרסה ➔ Connected System לא עומד ברמת-התיקונים."],
          bestPracticeHe: ["נהל רשימת-תיוג פורמלית של תנאים-מוקדמים.", "אמת רישוי והרשאות מול SAP לפני kickoff."],
          interviewHe: [{ qHe: "מדוע התנאים-המוקדמים קריטיים?", aHe: "כי כשל-גרסה/רישוי/הרשאה מתגלה אחרת רק בשלבי-חיבור מאוחרים ויקרים; בדיקה מוקדמת מונעת זאת." }],
          takeawaysHe: ["תנאים-מוקדמים = רשימת-תיוג גרסאות/רישוי/הרשאות.", "מוודאים לפני חיבוריות.", "מונעים כשל-מימוש מאוחר."],
          relatedHe: [{ labelHe: "MM · חיבוריות ל-ERP (14.8.2)", href: "/library/mm/chapter-14/#sub-14.8.2" }],
        },
        {
          id: "14.8.2", titleHe: "הקמת חיבוריות למערכות ERP", titleEn: "Establishing Connectivity to ERP Systems",
          execHe: "שלב החיבוריות מקים את התקשורת בין הרכזת לכל Connected System: הגדרת Logical Systems, חיבורי-RFC (SM59), שירותי-SOAP (SOAMANAGER), ומשתמשי-תקשורת. זהו הגשר שעליו זורמים כל האובייקטים המרכזיים — בלעדיו אין רכש מרכזי כלל.",
          beginnerHe: "כאן 'מחברים את הצינורות' בין המטה למפעלים. מגדירים לכל מפעל 'כתובת' (Logical System), פותחים ערוץ-תקשורת (RFC + SOAP), ויוצרים משתמש-טכני שדרכו המערכות מדברות. אחרי שלב זה, הרכזת והמפעלים 'רואים' זה את זה.",
          consultantHe: "מגדירים Logical System לכל מערכת (BD54) ומקצים Business System ID; יוצרים RFC Destinations (SM59) דו-כיווניים; מפעילים שירותי-SOAP ב-SOAMANAGER (provider+consumer) עם binding ו-Communication User; ובודקים קישוריות (connection test). כל אובייקט מרכזי נושא את ה-System Alias המבוסס על הגדרות אלו. תקלות-חיבור נפוצות: SSL/certificate, user/auth, או binding שגוי.",
          purposeHe: "להקים את תשתית-התקשורת שעליה נשען כל הרכש המרכזי — שכפול-דרישות, הורדת-הזמנות, הפצת-חוזים ועדכוני-סטטוס.",
          processExampleHe: "טכנאי מגדיר Logical System למפעל-גרמניה, יוצר RFC Destination ב-SM59, מפעיל את שירותי-ה-SOAP ב-SOAMANAGER עם Communication User, ומריץ connection test מוצלח — Connected System מוכן.",
          cbcHe: "ב-CBC כל מפעל-בקבוק מקבל Logical System ו-RFC/SOAP destinations ייעודיים; אחרי connection test מוצלח, דרישות-הרכש שלו מתחילות לזרום לרכזת.",
          navHe: ["Hub ► SM59 ► RFC Destinations", "Hub ► SOAMANAGER ► Web Service Configuration", "Hub ► BD54 ► Define Logical Systems"],
          tables: ["TBDLS", "RFCDES", "TBE11", "SRT_CONFIG"],
          tcodes: ["SM59", "SOAMANAGER", "BD54", "SLDCHECK"],
          fiori: ["Communication Arrangements", "Communication Systems", "F1990"],
          configHe: ["הגדר Logical System + Business System ID לכל Connected System (BD54).", "צור RFC Destinations דו-כיווניים (SM59).", "הפעל שירותי-SOAP ב-SOAMANAGER עם binding + Communication User.", "הרץ connection test לכל מערכת."],
          mistakesHe: ["binding שגוי ב-SOAMANAGER ➔ שירות לא נענה.", "RFC חד-כיווני ➔ עדכוני-סטטוס לא חוזרים.", "תעודת-SSL לא-תקפה ➔ כשל-תקשורת מאובטחת."],
          troubleshootHe: ["שירות-SOAP נכשל ➔ בדוק binding, Communication User ו-certificate.", "סטטוס לא חוזר ➔ RFC/SOAP הפוך לא מוגדר.", "connection test אדום ➔ SLDCHECK / host/port שגויים."],
          bestPracticeHe: ["הגדר חיבוריות דו-כיוונית מלאה לכל מערכת.", "תעד את כל ה-System Aliases וה-destinations.", "אמת certificates לפני production."],
          interviewHe: [
            { qHe: "אילו רכיבי-חיבוריות נדרשים?", aHe: "Logical System (BD54), RFC Destinations (SM59), ושירותי-SOAP (SOAMANAGER) עם Communication User — דו-כיווני." },
            { qHe: "מהו תפקיד ה-System Alias?", aHe: "הוא מזהה כל אובייקט מרכזי למערכת-הביצוע שלו, ומבוסס על ה-Business System ID שהוגדר בחיבוריות." },
          ],
          takeawaysHe: ["חיבוריות = Logical System + RFC + SOAP + Communication User.", "חייבת להיות דו-כיוונית לעדכוני-סטטוס.", "ה-System Alias נשען עליה."],
          relatedHe: [{ labelHe: "MM · אימות-נתונים (14.8.3)", href: "/library/mm/chapter-14/#sub-14.8.3" }],
        },
        {
          id: "14.8.3", titleHe: "אימות נתונים וזיהוי פערים", titleEn: "Validating Data and Identifying Gaps",
          execHe: "לפני הפעלת-תרחישים, מוודאים שנתוני-האב (Materials, Suppliers/Business Partners, Plants, Company Codes) עקביים בין הרכזת ל-Connected Systems, ומזהים פערים-במיפוי. נתון לא-ממופה גורם לכשל-הורדה של אובייקטים מרכזיים — לכן אימות-נתונים הוא תנאי-סף קריטי.",
          beginnerHe: "לפני שמתחילים לעבוד, בודקים שכולם 'מדברים אותה שפה': שאותו חומר, ספק ומפעל מזוהים נכון בכל המערכות. אם מפעל מסוים מספרר חומר אחרת — צריך למפות. שלב זה מאתר את כל הפערים האלה לפני שהם הופכים לתקלות.",
          consultantHe: "מריצים השוואת-נתונים בין הרכזת ל-Connected Systems: Material numbers, Business Partner (Supplier) IDs, Plants, Company Codes, Purchasing Orgs. מקימים Value Mapping (דרך SAP Integration Suite או טבלאות-מיפוי ברכזת) לכל פער. שוקלים MDG לממשל-מרכזי. מתעדים פערים שלא ניתן למפות (חומר חסר במערכת-יעד) כדרישות-תיקון-נתונים. כלי-עזר: DRF (Data Replication Framework) לבדיקת-עקביות.",
          purposeHe: "להבטיח שכל אובייקט מרכזי יוכל לרדת בהצלחה ל-Connected System ושה-Analytics יקבץ נכון — מניעת כשלי-הורדה וקיבוץ-Spend שגוי בהמשך.",
          processExampleHe: "צוות מריץ השוואה ומגלה שספק מסוים קיים ברכזת אך לא במערכת-ספרד; מקים Value Mapping או מבקש להקים את הספק שם — ורק אז מפעיל תרחישי-הורדה.",
          cbcHe: "ב-CBC משווים קטלוגי-חומרים בין מפעלי-הבקבוק: אותה פחית עם מספרים שונים בכל מדינה. מקימים מיפוי-ערכים מרכזי כדי שאובייקטים יורדו נכון וה-Spend יקובץ אחיד.",
          navHe: ["Hub ► DRFOUT ► Data Replication / Consistency", "SAP Integration Suite ► Value Mapping", "SPRO ► Central Procurement ► Configure Value Mapping"],
          tables: ["MARA", "BUT000", "T001W", "T001", "DRF_OUTB_LOG"],
          tcodes: ["DRFOUT", "DRFF", "MDG_BS_WD", "BP"],
          fiori: ["Manage Value Mapping", "F1990", "Data Replication Monitor"],
          configHe: ["השווה Material/Supplier/Plant/Company Code בין רכזת ל-Connected Systems.", "הקם Value Mapping לכל פער-זיהוי.", "תעד פערים שאינם בני-מיפוי כדרישות-תיקון-נתונים.", "שקול MDG לממשל-נתונים מרכזי."],
          mistakesHe: ["דילוג על אימות ➔ כשלי-הורדה המוניים בהמשך.", "מיפוי חלקי ➔ חלק מהאובייקטים נכשל.", "התעלמות מ-Material חסר במערכת-יעד ➔ הזמנה לא יורדת."],
          troubleshootHe: ["אובייקט מרכזי לא יורד ➔ נתון לא-ממופה (Material/Plant/Supplier).", "Spend מקובץ שגוי ➔ Value Mapping לא-עקבי.", "ספק לא נמצא ב-Connected System ➔ חוסר נתון, לא רק מיפוי."],
          bestPracticeHe: ["בצע אימות-נתונים מקיף לפני כל תרחיש.", "נהל Value Mapping מרכזית ועקבית.", "השתמש ב-MDG לממשל-נתונים ארוך-טווח."],
          interviewHe: [
            { qHe: "מדוע אימות-נתונים הוא תנאי-סף?", aHe: "כי נתון לא-ממופה (Material/Supplier/Plant) גורם לכשל-הורדה של אובייקטים מרכזיים ולקיבוץ-Spend שגוי באנליטיקה." },
            { qHe: "במה מטפל Value Mapping?", aHe: "בהמרת מזהים שונים לאותו אובייקט בין הרכזת ל-Connected System (למשל אותו חומר עם מספרים שונים)." },
          ],
          takeawaysHe: ["אימות-נתונים מוודא עקביות-מזהים בין המערכות.", "Value Mapping סוגר פערי-זיהוי.", "תנאי-סף לפני הפעלת-תרחישים."],
          relatedHe: [{ labelHe: "MM · קונפיגורציית רכזת (14.8.4)", href: "/library/mm/chapter-14/#sub-14.8.4" }],
        },
        {
          id: "14.8.4", titleHe: "קונפיגורציית SAP Ariba Central Procurement, Private Cloud", titleEn: "Configuring SAP Ariba Central Procurement, Private Cloud",
          execHe: "שלב קונפיגורציית-הרכזת מפעיל ומכוון את חבילת Central Procurement ברכזת ה-S/4HANA Private Cloud: הפעלת שירותי-ה-Central (Requisitioning, Purchasing, Sourcing, Contracts, Analytics), שיוך ה-Connected Systems, הגדרת Document Types ו-Field Control, וזרימות-אישור. כאן הרכזת הופכת מ'מחוברת' ל'מתפקדת'.",
          beginnerHe: "אחרי שהמערכות מחוברות והנתונים תקינים, מגדירים את המטה עצמו: אילו יכולות-רכש מרכזי להפעיל, אילו מפעלים משויכים, ואיך זורמים אישורים. זה השלב שבו 'מדליקים' את הרכש המרכזי בפועל.",
          consultantHe: "מפעילים את Scope items/שירותי ה-Central הרלוונטיים ב-SPRO; משייכים System Aliases ל-Use Cases; מגדירים Document Types, Number Ranges ו-Field Control לאובייקטים מרכזיים; מקימים Flexible Workflow לאישורי-דרישות/הזמנות מרכזיות; ומגדירים שירותי-עדכון-סטטוס דו-כיווניים. בודקים end-to-end על מערכת-בדיקה לפני production. זהו הליבה הפונקציונלית של ההקמה.",
          purposeHe: "להפוך את התשתית (חיבוריות + נתונים) לרכש-מרכזי מתפקד — להפעיל את היכולות הנדרשות ולכוון אותן לתהליכי-הארגון.",
          processExampleHe: "יועץ מפעיל Central Requisitioning ו-Central Purchasing, משייך שלוש מערכות-מחוברות, מגדיר Flexible Workflow לאישור-דרישות מעל סכום מסוים, ומריץ בדיקת-קצה-לקצה לפני העלאה ל-production.",
          cbcHe: "ב-CBC מפעילים Central Requisitioning, Sourcing ו-Contracts; משייכים את כל מפעלי-הבקבוק; ומגדירים Flexible Workflow שמנתב אישורי-חוזה גלובליים למטה-הרכש — לפני הפעלה מסחרית.",
          navHe: ["SPRO ► Central Procurement ► Activate Central Procurement Services", "SPRO ► Central Procurement ► Assign Connected Systems / Document Types", "Hub ► Manage Flexible Workflow for Purchase Requisitions"],
          tables: ["TBE11", "T160", "T161", "SWF_FLEX"],
          tcodes: ["SPRO", "SWDD", "OMEC", "NACE"],
          fiori: ["Manage Workflows for PR", "F2418 (Manage PR Central)", "F2420 (Manage PO Central)"],
          configHe: ["הפעל שירותי Central (Requisitioning/Purchasing/Sourcing/Contracts/Analytics).", "שייך System Aliases ל-Use Cases.", "הגדר Document Types, Number Ranges ו-Field Control מרכזיים.", "הקם Flexible Workflow לאישורים; הגדר עדכוני-סטטוס דו-כיווניים."],
          mistakesHe: ["הפעלת שירות ללא שיוך-מערכות ➔ אין על מה לעבוד.", "Document Types לא-ממופים ➔ כשל-הורדה.", "חוסר Flexible Workflow ➔ אישורים נעקפים."],
          troubleshootHe: ["דרישה/הזמנה לא יורדת ➔ Document Type/Number Range לא מוגדר.", "אישור לא מנותב ➔ Flexible Workflow לא פעיל/שגוי.", "סטטוס לא מתעדכן ➔ שירות-עדכון דו-כיווני חסר."],
          bestPracticeHe: ["הפעל יכולות בהדרגה (Use Case אחד בכל פעם).", "בדוק end-to-end על מערכת-בדיקה לפני production.", "תקנן Document Types ו-Workflows בין המערכות."],
          interviewHe: [
            { qHe: "מה כולל שלב קונפיגורציית-הרכזת?", aHe: "הפעלת שירותי-Central, שיוך מערכות-מחוברות, הגדרת Document Types/Field Control, ו-Flexible Workflow לאישורים." },
            { qHe: "מדוע להפעיל יכולות בהדרגה?", aHe: "כדי לבחון כל Use Case end-to-end ולבודד תקלות לפני הרחבה — מימוש נשלט ובטוח." },
          ],
          takeawaysHe: ["קונפיגורציית-הרכזת = הפעלת שירותי-Central + שיוך + Workflow.", "הופכת תשתית למערכת מתפקדת.", "הפעל בהדרגה ובדוק end-to-end."],
          relatedHe: [{ labelHe: "MM · שילוב Ariba Buying (14.8.5)", href: "/library/mm/chapter-14/#sub-14.8.5" }],
        },
        {
          id: "14.8.5", titleHe: "שילוב SAP Ariba Buying for SAP S/4HANA עם רכש מרכזי", titleEn: "Integrating SAP Ariba Buying for SAP S/4HANA with Central Procurement",
          execHe: "השלב המסכם מחבר את SAP Ariba Buying for SAP S/4HANA אל הרכזת המרכזית: דרישות-self-service וקטלוגים מנוהלים ב-Ariba Buying, זורמים אל הרכש-המרכזי ברכזת דרך SAP Integration Suite, ומשם להורדה ל-Connected Systems. כך נסגר המעגל — חוויית-קנייה מודרנית בענן מעל רכש-מרכזי מאוחד.",
          beginnerHe: "השלב האחרון: מחברים את 'חנות-הקנייה' של Ariba (Ariba Buying) אל המטה. עובד בוחר פריט מקטלוג ב-Ariba, הבקשה זורמת לרכש-המרכזי, ומשם להזמנה במפעל. זה מחבר חוויית-משתמש נוחה בענן עם הכוח של הרכש-המרכזי.",
          consultantHe: "מקימים את חבילות-התוכן של SAP Ariba Buying ב-SAP Integration Suite; מגדירים מיפוי-מסמכים (Requisition/PO/Confirmation/Invoice) ב-cXML; מחברים קטלוגים (catalog enablement); ומכוונים את הזרימה: Ariba Buying Requisition → Central Requisitioning → Central PO → Connected System. נדרש סנכרון נתוני-אב ל-Ariba (suppliers, commodity codes) וניטור דרך Integration Suite. זהו השילוב שהופך את הפריסה למלאה: Source-to-Pay בענן מעל hub מרכזי.",
          purposeHe: "להוסיף חוויית-self-service מודרנית מבוססת-קטלוג (Ariba Buying) מעל הרכש-המרכזי — להאיץ קנייה, להגדיל-תאימות (on-contract buying), ולסגור את מחזור ה-Source-to-Pay בענן.",
          processExampleHe: "עובד בוחר פריט מקטלוג ב-SAP Ariba Buying; דרישת-ה-Ariba זורמת דרך Integration Suite ל-Central Requisitioning ברכזת; הרוכש-המרכזי ממיר ל-Central PO היורד ל-Connected System; הספק מאשר דרך SAP Business Network.",
          cbcHe: "ב-CBC רוכשי-המפעלים מזמינים חומרי-MRO ואריזה דרך קטלוגי SAP Ariba Buying; הדרישות זורמות לרכש-המרכזי, מומרות להזמנות במערכות-המפעלים, ונשלחות לספקים ברשת — חוויית-קנייה אחידה ומבוקרת בכל הקבוצה.",
          navHe: ["SAP Integration Suite ► Discover ► SAP Ariba Buying packages", "SAP Ariba Buying ► Administration ► Integration / Catalog enablement", "SPRO ► Central Procurement ► Integration with SAP Ariba Buying"],
          tables: ["EBAN", "EKKO", "EDIDC", "BBP_PDIGP", "COMM_PRODUCT"],
          tcodes: ["SOAMANAGER", "SXMB_MONI", "WE02", "SPRO"],
          fiori: ["Integration Suite Monitor", "F2418 (Manage PR Central)", "F2785 (Manage RFQs)"],
          configHe: ["הקם חבילות-תוכן SAP Ariba Buying ב-Integration Suite.", "הגדר מיפוי cXML למסמכים (Requisition/PO/Confirmation/Invoice).", "חבר קטלוגים (catalog enablement) וסנכרן נתוני-אב ל-Ariba.", "כוון זרימה: Ariba Buying → Central Requisitioning → Central PO → Connected System."],
          mistakesHe: ["קטלוג לא מאופשר ➔ עובדים לא יכולים להזמין.", "מיפוי cXML שגוי ➔ דרישה/הזמנה נכשלת.", "אי-סנכרון נתוני-אב ל-Ariba ➔ ספקים/קטגוריות חסרים."],
          troubleshootHe: ["דרישת-Ariba לא מגיעה לרכזת ➔ חבילת-Integration-Suite/cXML לא פעילה.", "PO לא יורד ל-Connected System ➔ מיפוי-נתונים חסר (14.8.3).", "קטלוג ריק ➔ catalog enablement / סנכרון לא הושלם."],
          bestPracticeHe: ["השתמש בחבילות-תוכן מובנות של Integration Suite.", "ודא סנכרון מלא של ספקים וקטגוריות ל-Ariba.", "בדוק את הזרימה end-to-end (Ariba → Central → Connected) לפני production."],
          interviewHe: [
            { qHe: "כיצד זורמת דרישה מ-SAP Ariba Buying לביצוע?", aHe: "Ariba Buying Requisition → (Integration Suite) → Central Requisitioning ברכזת → Central PO → הורדה ל-Connected System." },
            { qHe: "מה תורם SAP Ariba Buying לרכש המרכזי?", aHe: "חוויית self-service מבוססת-קטלוג, קנייה-בתוך-חוזה (compliance), וסגירת מחזור Source-to-Pay בענן מעל ה-hub." },
          ],
          takeawaysHe: ["שילוב Ariba Buying = self-service קטלוגי מעל הרכש-המרכזי.", "הזרימה: Ariba → Central Requisitioning → Central PO → Connected.", "נשען על Integration Suite וסנכרון נתוני-אב; סוגר Source-to-Pay."],
          relatedHe: [
            { labelHe: "MM · שילוב Ariba (14.7)", href: "/library/mm/chapter-14/#sub-14.7" },
            { labelHe: "MM · אימות-נתונים (14.8.3)", href: "/library/mm/chapter-14/#sub-14.8.3" },
          ],
        },
      ],
    },
    // ============================================================ 14.9
    {
      id: "14.9", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "פרק זה הציג את הרכש המרכזי (Centralized Procurement) ב-SAP S/4HANA: רכזת אחת (Central Procurement hub) המנהלת רכש מעל מספר מערכות-ERP מחוברות, מבלי לאחדן פיזית. סקרנו את חמשת ה-Use Cases — Central Requisitioning, Central Purchasing, Central Sourcing, Central Purchase Contracts ו-Central Analytics — את השילוב עם SAP Ariba ו-SAP Business Network, ואת מסלול-המימוש של SAP Ariba Central Procurement, Private Cloud Edition.",
      beginnerHe:
        "סיכמנו: הרכש המרכזי הוא 'מטה' אחד שמנהל קנייה לכל ה'סניפים' (המפעלים), כל אחד עם מערכת משלו. ראינו איך זורמות דרישות, הזמנות, מכרזים וחוזים דרך הרכזת, איך מנתחים הכל יחד, ואיך מחברים את הענן (Ariba, Business Network). ולבסוף — איך מקימים את כל זה צעד-אחר-צעד.",
      consultantHe:
        "מבחינה ארכיטקטונית, הרכזת מחזיקה העתקי-מצב והמערכות-המחוברות מחזיקות את ה-objects התפעוליים, מחוברות דרך SOAP/RFC ומיפוי נתוני-אב לפי System Alias. המימוש מתבצע בסדר: Prerequisites → Connectivity → Data Validation → Hub Configuration → Ariba Buying integration. הצלחה תלויה בעקביות נתוני-האב, בחיבוריות דו-כיוונית מלאה, ובהפעלה-הדרגתית של ה-Use Cases עם בדיקות-קצה-לקצה.",
      purposeHe:
        "לקבע את התמונה המלאה: מה הרכש המרכזי נותן (איחוד-כוח ושקיפות ללא מיזוג-מערכות), כיצד הוא בנוי (hub + Connected Systems + Ariba), וכיצד מממשים אותו בשלבים נשלטים.",
      processExampleHe:
        "מהדרישה ועד התשלום: דרישה מקומית → Central Requisitioning → Central Sourcing (RFQ/Award) → Central Contract → Central PO → הורדה ל-Connected System → GR/IR → Central Analytics. כל שלב נוגע ברכזת לניהול ובמערכת-המחוברת לביצוע.",
      cbcHe:
        "ב-CBC: רכזת אחת מנהלת רכש פחיות, תרכיז, סוכר ו-CO2 לכל מפעלי-הבקבוק; חוזים גלובליים, נראות-Spend מאוחדת, ו-self-service קטלוגי דרך Ariba Buying — איחוד-כוח-קנייה אמיתי תוך שמירה על ביצוע מקומי בכל מדינה.",
      navHe: [
        "Fiori Launchpad (Hub) ► Central Procurement ► Procurement Overview Page",
        "SPRO ► Materials Management ► Central Procurement",
      ],
      tables: ["EKKO", "EKPO", "EBAN", "EKAB", "TBE11"],
      tcodes: ["SOAMANAGER", "SM59", "DRFOUT", "ME53N"],
      fiori: ["F1990 (Procurement Overview)", "F2418 (Manage PR Central)", "F2420 (Manage PO Central)"],
      configHe: [
        "חמישה Use Cases: Central Requisitioning / Purchasing / Sourcing / Contracts / Analytics.",
        "חיבוריות SOAP/RFC + מיפוי נתוני-אב לפי System Alias.",
        "שילוב SAP Ariba ו-SAP Business Network דרך Integration Suite.",
        "מסלול-מימוש: Prerequisites → Connectivity → Data → Hub → Ariba Buying.",
      ],
      flow: [
        { he: "דרישה מרכזית", code: "14.2" },
        { he: "מקור + חוזה", code: "14.4/14.5" },
        { he: "רכש מרכזי", code: "14.3" },
        { he: "ביצוע מקומי", code: "Connected ERP" },
        { he: "אנליטיקה מרכזית", code: "14.6" },
      ],
      masterDataHe: [
        "עקביות Material/Supplier/Plant/Company Code היא תנאי-הצלחה רוחבי.",
        "System Alias מזהה כל אובייקט מרכזי למערכת-הביצוע.",
      ],
      mistakesHe: [
        "תפיסת הרכזת כמערכת-ביצוע במקום שכבת-ניהול.",
        "דילוג על סדר-המימוש (חיבוריות לפני נתונים לפני תרחישים).",
        "הזנחת עקביות נתוני-אב — שורש רוב התקלות.",
      ],
      troubleshootHe: [
        "אובייקט לא יורד ➔ מיפוי-נתונים או חיבוריות (14.8.2/14.8.3).",
        "סטטוס לא מתעדכן ➔ שירות דו-כיווני חסר.",
        "Spend שגוי ➔ מיפוי Material Group/Supplier לא-עקבי.",
      ],
      bestPracticeHe: [
        "הפעל Use Cases בהדרגה עם בדיקות-קצה-לקצה.",
        "נהל נתוני-אב מרכזית (MDG/Value Mapping).",
        "תעד System Aliases, שירותים ומיפויים במלואם.",
      ],
      interviewHe: [
        { qHe: "מהו הערך המרכזי של רכש מרכזי?", aHe: "איחוד כוח-קנייה ושקיפות גלובלית מעל מספר ERP-ים מבלי לאחדם פיזית — ערך מהיר עם אוטונומיה מקומית נשמרת." },
        { qHe: "מהם חמשת ה-Use Cases?", aHe: "Central Requisitioning, Central Purchasing, Central Sourcing, Central Purchase Contracts ו-Central Analytics." },
        { qHe: "מהו סדר-המימוש?", aHe: "Prerequisites → Connectivity → Data Validation → Hub Configuration → SAP Ariba Buying integration." },
      ],
      takeawaysHe: [
        "רכש מרכזי = hub אחד מעל מספר ERP-ים מחוברים.",
        "חמישה Use Cases + שילוב Ariba/Business Network.",
        "ביצוע נשאר ב-Connected System; הרכזת מנהלת ומנתחת.",
        "הצלחה = עקביות נתוני-אב + חיבוריות דו-כיוונית + מימוש הדרגתי.",
      ],
      relatedHe: [
        { labelHe: "MM · מהו רכש מרכזי (14.1)", href: "/library/mm/chapter-14/#sub-14.1" },
        { labelHe: "MM · קונפיגורציית Ariba Central (14.8)", href: "/library/mm/chapter-14/#sub-14.8" },
        { labelHe: "MM · שילוב Ariba (14.7)", href: "/library/mm/chapter-14/#sub-14.7" },
      ],
    },
  ],
};
