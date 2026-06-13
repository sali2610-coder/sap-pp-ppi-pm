// ===== MM Digital Textbook — Chapter 11 (Product Sourcing) =====
// Every node is a complete LearningNode with 18 facets of authored Hebrew.
// Source hierarchy preserved (ids + order); x.y.z nested under x.y.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.
import type { TextbookChapter } from "./types";

export const CH11: TextbookChapter = {
  n: 11,
  titleHe: "מקורות מוצר (Product Sourcing)",
  titleEn: "Product Sourcing",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה ל-Product Sourcing — תהליך מקורות-המוצר ב-SAP S/4HANA Sourcing & Procurement, הממנף את Sourcing Project, Quotation Evaluation, Enterprise Contract Management, Commodity Pricing Engine (CPE) ו-SAP Business Network. כל תת-פרק וכל תת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC (מפעל-מילוי משקאות של קוקה-קולה — מקורות לאריזות ול-SKU חדשים, תמחור-סחורה לסוכר), ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך מ-Sourcing Project ועד Award, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. Product Sourcing הוא תהליך מונחה-Fiori מובהק; ה-Fiori apps מודגשים בכל סעיף. המטרה: לשלוט בכל מחזור-החיים של מקורות-מוצר — מהגדרת-פרויקט ועד פסיקת-זכייה, חוזה, תמחור ושיתוף-ספקים — ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 11.1
    {
      id: "11.1", titleHe: "מהו מקורות מוצר?", titleEn: "What Is Product Sourcing?",
      execHe:
        "Product Sourcing הוא תהליך-העל לזיהוי, הערכה ובחירת ספקים לפריטים — בדגש על מוצרים חדשים, רכיבים ואריזות הדורשים מיקור אסטרטגי. בניגוד לרכש-תפעולי שוטף (PO על חוזה קיים), Product Sourcing עוסק ב'מי יספק ובאיזה תנאי' עוד לפני שקיים חוזה: איסוף הצעות-מחיר, השוואתן, ופסיקת-זכייה המתורגמת לחוזה ולמקור-אספקה. זהו הגשר בין הצורך העסקי (SKU חדש) ובין שרשרת-האספקה התפעולית.",
      beginnerHe:
        "דמיין שאתה צריך למצוא ספק חדש לבקבוק מסוג חדש. Product Sourcing הוא התהליך המסודר שעוזר לך: מגדירים מה צריך, פונים לכמה ספקים, מקבלים מהם הצעות-מחיר, משווים ביניהן (מחיר, איכות, זמן-אספקה), בוחרים את הזוכה, וחותמים חוזה. במקום אקסל ומיילים מפוזרים — הכול במערכת אחת, מסודר ומתועד, עם מסכי Fiori נוחים.",
      consultantHe:
        "Product Sourcing ב-S/4HANA הוא יכולת מונחית-Fiori המשלבת Sourcing Project (קונטיינר לתהליך), Supplier Quotation (הצעות-ספק), Quotation Evaluation (השוואה מבוססת-קריטריונים) ו-Award (פסיקה המתורגמת ל-Enterprise Contract / Purchasing Info Record / Source List). היא נשענת על Master Data של MM (Material, Supplier=Business Partner, Purchasing Org) ומשתלבת עם Enterprise Contract Management ו-Commodity Pricing Engine. אין כאן עדיין PO תפעולי — התוצר הוא מקור-אספקה מוסכם. בהטמעה, ההבחנה מ-Operational Procurement (Self-Service / PO) ומ-RFQ הקלאסי (ME41) קריטית.",
      purposeHe:
        "המטרה: להפוך את בחירת-הספק לתהליך אסטרטגי, שקוף ומתועד — להוזיל עלויות דרך תחרות, להבטיח איכות וזמינות, ולקצר את הדרך מצורך עסקי ל-מקור-אספקה מאושר. בכך מצמצמים סיכון-אספקה ל-SKU חדשים ומבססים תשתית-חוזים ל-MRP ולרכש התפעולי.",
      processExampleHe:
        "ארגון משיק מוצר חדש. צוות-הרכש פותח Sourcing Project, מגדיר את הפריטים והכמויות, מזמין ארבעה ספקים להגיש Supplier Quotation, אוסף את ההצעות, מריץ Quotation Evaluation לפי משקלות (מחיר 50%, איכות 30%, אספקה 20%), בוחר זוכה, ופסיקת-ה-Award יוצרת חוזה (Enterprise Contract) ומקור-אספקה — ומשם הרכש התפעולי יכול להזמין PO.",
      cbcHe:
        "ב-CBC: השקת SKU חדש (פחית 250 מ\"ל בעיצוב חדש) מצריכה מקור לפחיות, לתוויות ולקרטונים. צוות-הרכש פותח Sourcing Project, מזמין יצרני-פחיות מקומיים ובינלאומיים, משווה הצעות, ופוסק זכייה שמתורגמת לחוזה — מבלי לערב עדיין את קווי-המילוי. במקביל הסוכר (Commodity) מתומחר דרך CPE לפי מדד-בורסה.",
      navHe: [
        "SAP Fiori Launchpad ► Sourcing and Procurement ► Sourcing ► Manage Sourcing Projects",
        "Materials Management ► Purchasing ► Sourcing ► Product Sourcing (configuration via SPRO)",
      ],
      tables: ["EKKO", "EKPO", "EINA", "EINE", "WYT3", "EORD"],
      tcodes: ["ME41", "ME49", "ME01", "ME11", "ME31K"],
      fiori: ["F1990 (Manage Sourcing Projects)", "F2370 (Manage Supplier Quotations)", "F0842A (Manage Purchasing Info Records)"],
      configHe: [
        "Product Sourcing מופעל כ-scope ב-Sourcing & Procurement; דורש הקצאת Purchasing Organization ו-Purchasing Group פעילים.",
        "ההבחנה מ-RFQ הקלאסי (ME41) ומ-Operational Procurement מוגדרת ברמת-תהליך: Product Sourcing = אסטרטגי/Fiori, RFQ = transactional/GUI.",
        "Master Data תנאי-סף: Material Master (Purchasing view), Supplier (BP עם Purchasing role), Purchasing Info Record כיעד-Award אפשרי.",
      ],
      flow: [
        { he: "צורך עסקי (SKU/רכיב חדש)", note: "Demand / New product" },
        { he: "פתיחת Sourcing Project", code: "F1990" },
        { he: "הזמנת ספקים + Supplier Quotations", code: "F2370" },
        { he: "Quotation Evaluation", code: "ME49", note: "השוואה מבוססת-קריטריונים" },
        { he: "Award (פסיקה)", note: "Contract / Info Record / Source List" },
        { he: "מקור-אספקה מאושר ► רכש תפעולי", code: "EORD" },
      ],
      masterDataHe: [
        "Material Master (Purchasing/MRP views) = מה ממקרים.",
        "Supplier = Business Partner עם Purchasing role; ספק פוטנציאלי או קיים.",
        "Purchasing Info Record (EINA/EINE) = יעד אפשרי לפסיקת-Award; מחיר ותנאי ספק↔חומר.",
      ],
      mistakesHe: [
        "בלבול בין Product Sourcing (אסטרטגי) ל-Operational Procurement (PO שוטף) — שימוש בכלי הלא-נכון.",
        "פתיחת Sourcing Project ללא Master Data בסיסי (חומר/ספק) — חוסם הזמנת-הצעות.",
        "ערבוב RFQ קלאסי (ME41) עם תהליך-ה-Fiori — תהליכים כפולים ולא-מתואמים.",
      ],
      troubleshootHe: [
        "לא ניתן להזמין ספק ➔ הספק חסר Purchasing role או אינו משויך ל-Purchasing Org.",
        "Award לא יוצר מקור-אספקה ➔ חסר Info Record/Contract יעד או הרשאת-יצירה.",
        "הפריט לא נכנס לפרויקט ➔ חסרה Purchasing view באב-החומר.",
      ],
      bestPracticeHe: [
        "השתמש ב-Product Sourcing למקור-אסטרטגי (חדש/קריטי), ב-Operational Procurement לשוטף.",
        "ודא Master Data מלא לפני פתיחת-פרויקט — חומר, ספק, ארגון-רכש.",
        "תעד את קריטריוני-ההערכה מראש כדי שהפסיקה תהיה שקופה וברת-הגנה.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Product Sourcing ל-Operational Procurement?", aHe: "Product Sourcing = תהליך אסטרטגי מונחה-Fiori לבחירת ספק ומקור-אספקה (לפני חוזה); Operational Procurement = רכש שוטף (PO) על מקור-אספקה קיים." },
        { qHe: "מהו התוצר של Product Sourcing?", aHe: "מקור-אספקה מאושר — חוזה (Enterprise Contract), Purchasing Info Record ו/או Source List — שעליו הרכש התפעולי יזמין PO." },
      ],
      takeawaysHe: [
        "Product Sourcing = הגשר מצורך עסקי למקור-אספקה מאושר.",
        "אסטרטגי ומונחה-Fiori, להבדיל מרכש-תפעולי שוטף.",
        "התוצר: חוזה / Info Record / Source List — לא PO.",
      ],
      relatedHe: [
        { labelHe: "MM · Product Sourcing (11.2)", href: "/library/mm/chapter-11/#sub-11.2" },
        { labelHe: "MM · Enterprise Contract Management (11.4)", href: "/library/mm/chapter-11/#sub-11.4" },
        { labelHe: "אובייקט · EINA", href: "/library/mm/object/EINA/" },
      ],
    },
    // ============================================================ 11.2
    {
      id: "11.2", titleHe: "מקורות מוצר (Product Sourcing)", titleEn: "Product Sourcing",
      execHe:
        "זהו ליבת-התהליך: ניהול מחזור-חיי המיקור בתוך Sourcing Project — מהגדרת הצורך, דרך איסוף Supplier Quotations והערכתן (Quotation Evaluation), ועד פסיקת-זכייה (Award Decision) המתורגמת למקור-אספקה. Product Sourcing מאחד את שלושת השלבים האלה לזרימה אחת, מתועדת ושקופה, המנוהלת כולה מ-Fiori.",
      beginnerHe:
        "החלק הזה הוא 'הלב' של הפרק. הוא מחלק את התהליך לשלושה שלבים ברורים: (1) פותחים פרויקט-מיקור ומגדירים מה צריך; (2) מקבלים הצעות-מחיר מספקים ומשווים אותן; (3) בוחרים זוכה. שלושת השלבים האלה מפורטים בתת-הסעיפים 11.2.1, 11.2.2 ו-11.2.3.",
      consultantHe:
        "Product Sourcing ב-S/4HANA נשען על Sourcing Project כקונטיינר. הזרימה: יצירת-פרויקט → הוספת פריטים → הזמנת ספקים → Supplier Quotation (קליטה/הקלדה) → Quotation Evaluation (ניקוד מול קריטריונים משוקללים) → Award. הפסיקה מייצרת Enterprise Contract / Purchasing Info Record / Source List. כל שלב מתועד עם Status ו-Audit Trail. ההבדל מ-RFQ הקלאסי: עבודה מבוססת-Fiori, קריטריוני-הערכה גמישים, ושילוב מובנה עם Enterprise Contract Management ו-Business Network.",
      purposeHe:
        "לרכז את כל פעולות-המיקור תחת פרויקט אחד מנוהל — להבטיח תחרות הוגנת, השוואה אובייקטיבית ופסיקה מתועדת המתורגמת אוטומטית למקור-אספקה. כך מקצרים זמן, מצמצמים סיכון ומבססים שקיפות-רכש.",
      processExampleHe:
        "רוכש פותח Sourcing Project עבור רכיב חדש, מוסיף שלוש שורות-פריט, מזמין חמישה ספקים. שלושה מגישים Supplier Quotation. ה-Quotation Evaluation מנקד אותם לפי מחיר/איכות/אספקה ומציג טבלת-השוואה (כמו ME49). הרוכש פוסק זכייה לספק עם הניקוד הגבוה — וה-Award מייצר חוזה ו-Source List.",
      cbcHe:
        "ב-CBC: פרויקט-מיקור לאריזות ה-SKU החדש מנהל בו-זמנית פחיות, תוויות וקרטונים. כל קטגוריה מקבלת קבוצת-ספקים משלה; ההערכה והפסיקה נעשות לכל שורה, וה-Award מייצר חוזי-מסגרת נפרדים לכל ספק-זוכה.",
      navHe: [
        "SAP Fiori Launchpad ► Sourcing ► Manage Sourcing Projects",
        "SAP Fiori Launchpad ► Sourcing ► Manage Supplier Quotations",
        "Materials Management ► Purchasing ► RFQ/Quotation (ME41/ME49) — תהליך-השוואה קלאסי",
      ],
      tables: ["EKKO", "EKPO", "WYT3", "EINA", "EINE", "EORD"],
      tcodes: ["ME41", "ME47", "ME49", "ME01"],
      fiori: ["F1990 (Manage Sourcing Projects)", "F2370 (Manage Supplier Quotations)", "F2371 (Compare Supplier Quotations)", "F0842A (Manage Purchasing Info Records)"],
      configHe: [
        "Sourcing Project Type: קובע ברירות-מחדל לתהליך (סוג-מיקור, קריטריוני-הערכה, סוג-Award).",
        "Quotation Evaluation Criteria: הגדרת קריטריונים (מחיר/איכות/אספקה/שירות) ומשקלותיהם.",
        "Award Document Type: סוג-המסמך הנוצר בפסיקה (Contract / Info Record / Source List).",
      ],
      flow: [
        { he: "Sourcing Project", code: "F1990", note: "קונטיינר התהליך" },
        { he: "הגדרת פריטים + כמויות", note: "שורות-מיקור" },
        { he: "הזמנת ספקים + Quotations", code: "F2370" },
        { he: "Quotation Evaluation", code: "ME49/F2371", note: "ניקוד משוקלל" },
        { he: "Award Decision", note: "Contract / Info Record / Source List" },
      ],
      masterDataHe: [
        "Material + Supplier (BP) + Purchasing Org = הבסיס לכל שורת-מיקור.",
        "קריטריוני-הערכה ומשקלות = master/config של ה-Project Type.",
        "Award → Contract (EKKO/EKPO) / Info Record (EINA/EINE) / Source List (EORD).",
      ],
      mistakesHe: [
        "פתיחת פרויקט בלי להגדיר קריטריוני-הערכה מראש — פסיקה שרירותית ולא-שקופה.",
        "הזמנת ספק יחיד — אין תחרות ואין בסיס-השוואה.",
        "אי-תרגום ה-Award למקור-אספקה — התהליך נשאר 'תיאורטי' והרכש לא יכול להזמין.",
      ],
      troubleshootHe: [
        "אין הצעות להשוואה ➔ ספקים לא הוזמנו או לא הגישו Quotation בתוקף.",
        "Evaluation לא מנקד ➔ חסרים קריטריונים/משקלות או ערכים בהצעות.",
        "Award נכשל ➔ סוג-מסמך-יעד לא מוגדר או הרשאה חסרה.",
      ],
      bestPracticeHe: [
        "הגדר קריטריונים ומשקלות לפני הזמנת-ספקים.",
        "הזמן לפחות שלושה ספקים לתחרות אפקטיבית.",
        "ודא שכל פסיקה מתרגמת אוטומטית למקור-אספקה (Award Document Type).",
      ],
      interviewHe: [
        { qHe: "מה מכיל Sourcing Project?", aHe: "פריטים, כמויות, ספקים מוזמנים, Supplier Quotations, קריטריוני-הערכה ופסיקת-Award — כל מחזור-החיים בקונטיינר אחד." },
        { qHe: "מהם שלושת שלבי ה-Product Sourcing?", aHe: "Sourcing Project (הגדרה), Quotation Evaluation (השוואה), Award Decision (פסיקה→מקור-אספקה)." },
      ],
      takeawaysHe: [
        "Sourcing Project מאחד את כל מחזור-המיקור.",
        "שלושה שלבים: פרויקט → הערכה → פסיקה.",
        "Award מתרגם פסיקה למקור-אספקה אמיתי.",
      ],
      relatedHe: [
        { labelHe: "MM · Sourcing Project (11.2.1)", href: "/library/mm/chapter-11/#sub-11.2.1" },
        { labelHe: "MM · Award Decisions (11.2.3)", href: "/library/mm/chapter-11/#sub-11.2.3" },
        { labelHe: "אובייקט · EORD", href: "/library/mm/object/EORD/" },
      ],
      children: [
        {
          id: "11.2.1", titleHe: "פרויקט מיקור (Sourcing Project)", titleEn: "Sourcing Project",
          execHe:
            "Sourcing Project הוא הקונטיינר המנהל תהליך-מיקור שלם: הוא אוסף את הפריטים, הספקים, ההצעות והפסיקה תחת מזהה-אחד עם Status ו-Audit Trail. הוא מאפשר לנהל מיקור מורכב (רב-פריטי, רב-ספקי) בצורה מסודרת ושקופה.",
          beginnerHe:
            "חשוב על פרויקט-מיקור כמו 'תיקייה' לכל מה שקשור לחיפוש-ספק מסוים: מה צריך, מי מוזמן, אילו הצעות הגיעו, ומי זכה. הכול במקום אחד, עם סטטוס שמראה איפה אנחנו בתהליך.",
          consultantHe:
            "ה-Sourcing Project נוצר ב-Manage Sourcing Projects (F1990), נושא Project Type (קובע ברירות-מחדל), Items (שורות-מיקור עם חומר/כמות/מפעל), Suppliers ו-Status (Created/In Process/Awarded/Closed). הוא משמש מסגרת ל-Supplier Quotations ול-Evaluation. שדות-מפתח: Purchasing Org/Group, תאריכי-יעד להגשה, ו-Award strategy. ניתן לקשר Enterprise Contract כיעד.",
          purposeHe:
            "לתת מבנה ומשילות לתהליך-מיקור — לרכז פריטים/ספקים/הצעות, לאכוף תאריכי-יעד, ולשמור תיעוד-מלא לביקורת ולקבלת-החלטה.",
          processExampleHe:
            "רוכש יוצר פרויקט 'מיקור-אריזות-Q3', מוסיף שלושה פריטים, מגדיר תאריך-הגשה אחרון, ומזמין ספקים. ה-Status עובר ל-In Process עד שכל ההצעות מגיעות, ואז להערכה.",
          cbcHe:
            "ב-CBC: פרויקט 'SKU-Launch-Cans-2026' מנהל פחיות + תוויות + קרטונים; כל שורה עם כמות-שנתית-צפויה ותאריך-יעד התואם למועד-ההשקה.",
          navHe: ["SAP Fiori Launchpad ► Sourcing ► Manage Sourcing Projects (Create Sourcing Project)"],
          tables: ["EKKO", "EKPO", "WYT3"],
          tcodes: ["ME41", "ME47"],
          fiori: ["F1990 (Manage Sourcing Projects)", "F2370 (Manage Supplier Quotations)"],
          configHe: [
            "Sourcing Project Type: ברירות-מחדל לקריטריונים, סוג-Award ותהליך-אישור.",
            "Number Range לפרויקטים; Purchasing Org/Group כשדות-חובה.",
            "תאריכי-יעד להגשה (Submission Deadline) ברמת-פרויקט.",
          ],
          flow: [
            { he: "Create Sourcing Project", code: "F1990" },
            { he: "הוסף פריטים + כמויות", note: "שורות-מיקור" },
            { he: "הזמן ספקים", note: "Invited Suppliers" },
            { he: "Status: In Process", note: "ממתין להצעות" },
          ],
          masterDataHe: [
            "Items = Material + Plant + Quantity + UoM.",
            "Suppliers = רשימת BP מוזמנים.",
            "Project Type = config הקובע התנהגות-ברירת-מחדל.",
          ],
          mistakesHe: [
            "אי-קביעת תאריך-יעד להגשה — הצעות נגררות ללא דדליין.",
            "פרויקט ענק רב-קטגורי במקום פיצול לפי קטגוריה — קושי בניהול ובפסיקה.",
          ],
          troubleshootHe: [
            "לא ניתן להוסיף פריט ➔ חסרה Purchasing view בחומר או Plant לא מוקצה.",
            "ספק לא מופיע להזמנה ➔ אין Purchasing role / שיוך לארגון-רכש.",
          ],
          bestPracticeHe: [
            "פצל פרויקטים לפי קטגוריית-רכש לניהול נקי.",
            "הגדר Submission Deadline ברור לכל פרויקט.",
          ],
          interviewHe: [
            { qHe: "מהו Sourcing Project?", aHe: "קונטיינר המאגד פריטים, ספקים, הצעות ופסיקה תחת מזהה-אחד עם Status ו-Audit Trail." },
            { qHe: "מה קובע Project Type?", aHe: "ברירות-מחדל לתהליך — קריטריוני-הערכה, סוג-Award ותהליך-אישור." },
          ],
          takeawaysHe: [
            "פרויקט-מיקור = תיקיית-העל של התהליך.",
            "נוצר ב-F1990, נושא Items + Suppliers + Status.",
            "Project Type קובע ברירות-מחדל.",
          ],
          relatedHe: [{ labelHe: "MM · Quotation Evaluation (11.2.2)", href: "/library/mm/chapter-11/#sub-11.2.2" }],
        },
        {
          id: "11.2.2", titleHe: "הערכת הצעות מחיר (Quotation Evaluation)", titleEn: "Quotation Evaluation",
          execHe:
            "Quotation Evaluation הוא השלב שבו ההצעות שהתקבלו מושוות אובייקטיבית לפי קריטריונים משוקללים — מחיר, איכות, זמן-אספקה, שירות — ומקבלות ניקוד המאפשר דירוג-ספקים ובסיס-החלטה שקוף לפסיקה.",
          beginnerHe:
            "אחרי שכמה ספקים שלחו הצעות, צריך להשוות ביניהן בצורה הוגנת. במקום 'הכי זול ניצח', נותנים משקל לכל קריטריון (למשל מחיר 50%, איכות 30%, אספקה 20%) והמערכת מחשבת ניקוד לכל ספק. כך הבחירה מבוססת ולא שרירותית.",
          consultantHe:
            "ההערכה נעשית ב-Compare Supplier Quotations (F2371) או ב-ME49 הקלאסי. מגדירים Criteria עם משקלות; כל הצעה מקבלת ערכים (מחיר אוטומטי, איכות/אספקה ידני או מ-Supplier Evaluation). הניקוד-המשוקלל מדרג. ניתן לשלב Total Cost of Ownership (לא רק מחיר-יחידה: לוגיסטיקה, מכס, תנאי-תשלום). התוצאה מזינה את ה-Award.",
          purposeHe:
            "להפוך השוואת-הצעות מתחושת-בטן להחלטה מבוססת-נתונים, שקופה וברת-הגנה — תוך איזון מחיר מול איכות, אספקה ושירות.",
          processExampleHe:
            "שלוש הצעות לרכיב: A זול אך אספקה איטית; B יקר אך איכות-מעולה; C מאוזן. ההערכה המשוקללת (מחיר 50/איכות 30/אספקה 20) מנקדת ומציגה ש-C מוביל — בסיס לפסיקה.",
          cbcHe:
            "ב-CBC: השוואת יצרני-פחיות — מחיר-ליחידה, אחוז-פסולת (איכות), זמן-אספקה ויכולת-נפח. הניקוד המשוקלל בולם בחירה ב'הזול ביותר' אם איכותו נמוכה (סיכון-קו-מילוי).",
          navHe: [
            "SAP Fiori Launchpad ► Sourcing ► Compare Supplier Quotations",
            "Materials Management ► Purchasing ► RFQ/Quotation ► Price Comparison List (ME49)",
          ],
          tables: ["EKKO", "EKPO", "EINE"],
          tcodes: ["ME49", "ME47"],
          fiori: ["F2371 (Compare Supplier Quotations)", "F2370 (Manage Supplier Quotations)"],
          configHe: [
            "Evaluation Criteria + Weights: הגדרת קריטריונים ומשקלם הכולל (סך 100%).",
            "Price Comparison (ME49): Reference quotation, mean-value, %-deviation.",
            "שילוב Supplier Evaluation (LIS) לציוני-איכות/אספקה היסטוריים.",
          ],
          flow: [
            { he: "קליטת Supplier Quotations", code: "F2370" },
            { he: "הזנת/חישוב ערכים לקריטריונים", note: "מחיר אוטומטי, איכות ידני" },
            { he: "ניקוד משוקלל", code: "F2371/ME49" },
            { he: "דירוג ספקים", note: "בסיס ל-Award" },
          ],
          masterDataHe: [
            "Criteria + Weights = config-הערכה.",
            "Supplier Quotation values = מחיר/אספקה/איכות לכל הצעה.",
            "Supplier Evaluation scores (אופציונלי) = היסטוריית-ביצועים.",
          ],
          mistakesHe: [
            "משקל-100% למחיר בלבד — מתעלם מאיכות ואספקה.",
            "השוואת מחיר-יחידה בלבד במקום TCO (מכס/לוגיסטיקה/תשלום).",
            "ערכי-קריטריון חסרים בהצעה — מעוות את הניקוד.",
          ],
          troubleshootHe: [
            "ניקוד לא מחושב ➔ חסרים משקלות או ערכים בהצעות.",
            "השוואה ריקה ➔ הצעות לא נקלטו/לא בתוקף.",
            "סטיית-מחיר חריגה ➔ יחידות-מידה/מטבע לא-אחידים בין הצעות.",
          ],
          bestPracticeHe: [
            "אזן מחיר מול איכות ואספקה — אל תנקד מחיר בלבד.",
            "השווה TCO ולא רק מחיר-יחידה.",
            "שלב ציוני Supplier Evaluation היסטוריים לסיכון-ספק.",
          ],
          interviewHe: [
            { qHe: "כיצד Quotation Evaluation שומר על אובייקטיביות?", aHe: "קריטריונים משוקללים מראש (מחיר/איכות/אספקה) מנקדים כל הצעה — דירוג מבוסס-נתונים ולא תחושה." },
            { qHe: "מהו ME49?", aHe: "Price Comparison List הקלאסי — משווה הצעות מול reference/mean ומציג %-deviation." },
          ],
          takeawaysHe: [
            "הערכה = השוואה משוקללת ואובייקטיבית.",
            "מחיר + איכות + אספקה, לא מחיר בלבד.",
            "TCO עדיף על מחיר-יחידה.",
          ],
          relatedHe: [{ labelHe: "MM · Award Decisions (11.2.3)", href: "/library/mm/chapter-11/#sub-11.2.3" }],
        },
        {
          id: "11.2.3", titleHe: "החלטות זכייה (Award Decisions)", titleEn: "Award Decisions",
          execHe:
            "Award Decision היא פסיקת-הזכייה: בחירת הספק/ים הזוכה על-בסיס ההערכה, ותרגומה האוטומטי למקור-אספקה — Enterprise Contract, Purchasing Info Record ו/או Source List. זהו הרגע שבו תהליך-המיקור הופך לתוצר תפעולי בר-שימוש.",
          beginnerHe:
            "אחרי ההשוואה — בוחרים זוכה. ה-Award לוקח את הבחירה ויוצר ממנה משהו שאפשר להזמין עליו: חוזה או רשומת-מחיר. אפשר לפסוק לספק יחיד, או לחלק בין כמה ספקים (Split Award) — למשל 70% לאחד ו-30% לאחר.",
          consultantHe:
            "ה-Award יכול להיות Full (ספק יחיד) או Split (פיצול-נפח בין ספקים, להפחתת סיכון-אספקה). הוא מתרגם לפי Award Document Type ל-Enterprise Contract (EKKO/EKPO), Info Record (EINA/EINE) ו/או Source List (EORD). ניתן לחבר תהליך-אישור (Workflow). הפסיקה נשמרת ב-Audit Trail עם נימוקים. שדה-מפתח: Quantity Split per supplier ו-validity של החוזה הנוצר.",
          purposeHe:
            "לסגור את מעגל-המיקור — להפוך החלטה לחוזה ולמקור-אספקה תפעולי, תוך תיעוד-נימוקים ואפשרות לפיצול-סיכון בין ספקים.",
          processExampleHe:
            "אחרי הערכה, הרוכש פוסק Split Award: 60% לספק C (המוביל) ו-40% לספק B (גיבוי-איכות). ה-Award יוצר שני חוזי-מסגרת ו-Source List עם Quota Arrangement התואם.",
          cbcHe:
            "ב-CBC: פסיקת-פחיות מפוצלת בין יצרן-מקומי (70%, אספקה-מהירה) ויצרן-בינלאומי (30%, גיבוי) — Split Award מצמצם סיכון-השבתת-קו ומייצר שני חוזים + Quota Arrangement.",
          navHe: [
            "SAP Fiori Launchpad ► Sourcing ► Manage Sourcing Projects (Award)",
            "Materials Management ► Purchasing ► Source List / Quota Arrangement (ME01/MEQ1)",
          ],
          tables: ["EKKO", "EKPO", "EORD", "EQUK", "EINA", "EINE"],
          tcodes: ["ME31K", "ME01", "MEQ1", "ME11"],
          fiori: ["F1990 (Manage Sourcing Projects)", "F1850 (Manage Purchasing Contracts)", "F0842A (Manage Purchasing Info Records)"],
          configHe: [
            "Award Document Type: סוג-המסמך הנוצר (Contract / Info Record / Source List).",
            "Split Award: אפשור פיצול-נפח בין ספקים + יצירת Quota Arrangement (MEQ1).",
            "Approval Workflow לפסיקה (אופציונלי) לפי ערך/קטגוריה.",
          ],
          flow: [
            { he: "תוצאת Quotation Evaluation", note: "דירוג ספקים" },
            { he: "בחירת זוכה — Full / Split", note: "פיצול-נפח אופציונלי" },
            { he: "Award → מקור-אספקה", code: "F1850/ME01" },
            { he: "Contract / Info Record / Source List", code: "EORD/EINE" },
            { he: "מוכן לרכש תפעולי (PO)", note: "Operational Procurement" },
          ],
          masterDataHe: [
            "Award split = כמות/אחוז לכל ספק.",
            "תוצר: Contract (EKKO/EKPO) / Info Record (EINA/EINE) / Source List (EORD).",
            "Quota Arrangement (EQUK) ל-Split Award.",
          ],
          mistakesHe: [
            "פסיקה לספק-יחיד לפריט-קריטי — סיכון-אספקה ללא גיבוי.",
            "אי-יצירת Source List/Contract — הרכש לא יכול להזמין על הזוכה.",
            "Split ללא Quota Arrangement — MRP לא מחלק נפח בין הספקים.",
          ],
          troubleshootHe: [
            "Award לא יוצר חוזה ➔ Award Document Type לא מוגדר או הרשאה חסרה.",
            "MRP לא מפצל בין ספקים ➔ חסר Quota Arrangement (MEQ1).",
            "מקור-אספקה לא נבחר ב-PO ➔ Source List לא פעיל/לא רלוונטי-לתאריך.",
          ],
          bestPracticeHe: [
            "שקול Split Award לפריטים-קריטיים לפיזור-סיכון.",
            "ודא שכל פסיקה יוצרת מקור-אספקה אמיתי (Contract/Source List).",
            "תעד נימוקי-פסיקה ב-Audit Trail להגנה ביקורתית.",
          ],
          interviewHe: [
            { qHe: "מהו Split Award ומתי משתמשים בו?", aHe: "פיצול-נפח בין כמה ספקים זוכים (למשל 70/30) — לפיזור סיכון-אספקה לפריטים-קריטיים; יוצר Quota Arrangement." },
            { qHe: "מה יוצר ה-Award?", aHe: "מקור-אספקה — Enterprise Contract, Purchasing Info Record ו/או Source List — לפי Award Document Type." },
          ],
          takeawaysHe: [
            "Award = פסיקה → מקור-אספקה תפעולי.",
            "Full או Split (פיצול-סיכון עם Quota Arrangement).",
            "תוצר: Contract / Info Record / Source List.",
          ],
          relatedHe: [
            { labelHe: "MM · Enterprise Contract Management (11.4)", href: "/library/mm/chapter-11/#sub-11.4" },
            { labelHe: "אובייקט · EORD", href: "/library/mm/object/EORD/" },
          ],
        },
      ],
    },
    // ============================================================ 11.3
    {
      id: "11.3", titleHe: "תכנון רכש (Procurement Planning)", titleEn: "Procurement Planning",
      execHe:
        "Procurement Planning הוא שלב-ההכנה של המיקור: ייבוא הפריטים שיש למקרם, שיוכם לפרויקטים, קביעת אבני-דרך ולוחות-זמנים, ואיגוד פריטים לחבילות-מיקור לפי צורך. תכנון נכון מבטיח שכל פריט ימוקר בזמן, בקיבוץ הנכון, מול הספקים המתאימים.",
      beginnerHe:
        "לפני שמתחילים למקר, צריך לתכנן: אילו פריטים ממקרים, מתי כל שלב צריך להסתיים, ואילו פריטים כדאי לקבץ יחד (למשל כל האריזות ביחד כדי לקבל מחיר-נפח טוב יותר). תת-הסעיפים 11.3.1–11.3.3 מפרטים את שלושת ההיבטים האלה.",
      consultantHe:
        "Procurement Planning מקדים את ה-Sourcing Project: ייבוא Parts (מ-Material Master / רשימות חיצוניות) ושיוכם לפרויקטים, הגדרת Milestones ו-Task Scheduling (תאריכי-יעד לכל שלב), ו-Bundling (קיבוץ פריטים לחבילות-מיקור לפי קטגוריה/ספק/נפח). זהו שלב תכנוני שמזין את ה-Sourcing Project במידע מובנה ובלוחות-זמנים, ומשפר מנוף-מיקור דרך איגוד-נפחים.",
      purposeHe:
        "להבטיח שהמיקור מתבצע בצורה מתוכננת ולא ספונטנית — כל פריט משויך לפרויקט, עם לוח-זמנים ברור, ובקיבוץ שממקסם מנוף-מחיר ויעילות.",
      processExampleHe:
        "צוות-רכש מקבל רשימת 40 פריטים חדשים. הוא מייבא אותם, משייך כל קבוצה לפרויקט מתאים, קובע אבני-דרך (סיום-הזמנת-ספקים, סיום-הערכה, פסיקה), ומאגד פריטים דומים לחבילה אחת למינוף-מחיר.",
      cbcHe:
        "ב-CBC: ייבוא רשימת-רכיבים ל-SKU החדש; אבני-דרך מתואמות למועד-ההשקה; איגוד כל חומרי-האריזה לחבילה אחת מול ספק-אריזות אסטרטגי לקבלת מחיר-נפח.",
      navHe: [
        "SAP Fiori Launchpad ► Sourcing ► Manage Sourcing Projects (Planning)",
        "Materials Management ► Purchasing ► Sourcing ► Procurement Planning (SPRO)",
      ],
      tables: ["EKKO", "EKPO", "MARA", "MARC"],
      tcodes: ["ME41", "MM03", "ME01"],
      fiori: ["F1990 (Manage Sourcing Projects)", "F2370 (Manage Supplier Quotations)"],
      configHe: [
        "Procurement Planning כשלב מקדים ל-Sourcing Project; הגדרת Milestone templates.",
        "Import format לפריטים (חומר/כמות/קטגוריה) ושיוך-לפרויקט.",
        "Bundling rules — קיבוץ לפי קטגוריה/ספק/נפח.",
      ],
      flow: [
        { he: "ייבוא Parts ושיוך לפרויקטים", note: "11.3.1" },
        { he: "Milestones + Task Scheduling", note: "11.3.2" },
        { he: "Bundling לפי צורך", note: "11.3.3" },
        { he: "מזין את Sourcing Project", code: "F1990" },
      ],
      masterDataHe: [
        "Parts = Material + Quantity + Category לייבוא.",
        "Milestones = תבנית-אבני-דרך עם תאריכים.",
        "Bundles = קבוצות-פריטים לחבילת-מיקור.",
      ],
      mistakesHe: [
        "מיקור ספונטני ללא תכנון — פספוס דדליינים ואיבוד מנוף-מחיר.",
        "אי-איגוד פריטים דומים — הצעות מפוזרות ומחירים גבוהים.",
        "אבני-דרך לא מתואמות למועד-העסקי (השקה) — מיקור מאחר.",
      ],
      troubleshootHe: [
        "פריטים מיובאים לא נכנסים לפרויקט ➔ פורמט-ייבוא/חומר חסר.",
        "אבני-דרך לא נאכפות ➔ Milestone template לא משויך לפרויקט.",
        "Bundle לא נוצר ➔ כללי-קיבוץ לא מוגדרים.",
      ],
      bestPracticeHe: [
        "תכנן אבני-דרך אחורה ממועד-ההשקה העסקי.",
        "אגד פריטים דומים למינוף-מחיר.",
        "השתמש בייבוא-מובנה במקום הזנה ידנית לפריטים רבים.",
      ],
      interviewHe: [
        { qHe: "מה כולל Procurement Planning?", aHe: "ייבוא פריטים ושיוכם לפרויקטים, אבני-דרך ולוחות-זמנים, ואיגוד פריטים לחבילות-מיקור." },
        { qHe: "מדוע לאגד פריטים?", aHe: "כדי למנף נפח מול ספק — מחיר טוב יותר ויעילות-תהליך." },
      ],
      takeawaysHe: [
        "תכנון-רכש מקדים ומזין את ה-Sourcing Project.",
        "שלושה היבטים: ייבוא/שיוך, אבני-דרך, איגוד.",
        "איגוד-נפחים = מנוף-מחיר.",
      ],
      relatedHe: [
        { labelHe: "MM · Sourcing Project (11.2.1)", href: "/library/mm/chapter-11/#sub-11.2.1" },
        { labelHe: "MM · Parts Bundling (11.3.3)", href: "/library/mm/chapter-11/#sub-11.3.3" },
      ],
      children: [
        {
          id: "11.3.1", titleHe: "ייבוא פריטים ושיוך לפרויקטים", titleEn: "Parts Import and Assignment to Projects",
          execHe:
            "ייבוא הפריטים (Parts) שיש למקרם ושיוכם ל-Sourcing Projects הוא נקודת-ההזנה של תכנון-הרכש: רשימת-פריטים (חומר, כמות, קטגוריה) נטענת ומחולקת לפרויקטים מתאימים, ובכך כל פריט מקבל 'בית' שבו ימוקר.",
          beginnerHe:
            "לוקחים רשימה של כל מה שצריך למקר ומכניסים אותה למערכת, ואז מחלקים כל פריט לפרויקט המתאים. למשל — כל הפחיות לפרויקט-אריזות, כל המעבדה לפרויקט-שירותים.",
          consultantHe:
            "הפריטים מיובאים מ-Material Master או מקובץ-חיצוני (Part list / spreadsheet) ומשויכים ל-Sourcing Project לפי קטגוריה/מפעל. ניתן לשייך פריט קיים או חדש. השיוך קובע באיזה פרויקט יתבצעו ההזמנה, ההערכה והפסיקה. שדות: Material, Plant, Quantity, Category, Target project.",
          purposeHe:
            "לקבל את כל הפריטים-למיקור למערכת בצורה מובנית ולחלקם לפרויקטים — בסיס מסודר לכל התהליך.",
          processExampleHe:
            "טעינת 40 פריטים מקובץ; המערכת משייכת אוטומטית לפי קטגוריה: 25 לפרויקט-אריזות, 10 לפרויקט-חומרי-גלם, 5 לפרויקט-שירותים.",
          cbcHe:
            "ב-CBC: ייבוא רשימת-רכיבים ל-SKU החדש מ-PLM/אקסל; שיוך אוטומטי — פחיות/תוויות/קרטונים לפרויקט-אריזות.",
          navHe: ["SAP Fiori Launchpad ► Sourcing ► Manage Sourcing Projects ► Import / Assign Parts"],
          tables: ["MARA", "MARC", "EKPO"],
          tcodes: ["MM03", "ME41"],
          fiori: ["F1990 (Manage Sourcing Projects)"],
          configHe: [
            "Import template/format לפריטים (Material, Plant, Qty, Category).",
            "כללי-שיוך-אוטומטי לפרויקט לפי קטגוריה/מפעל.",
          ],
          flow: [
            { he: "טען רשימת-פריטים", note: "Material/Qty/Category" },
            { he: "שיוך לפרויקט", note: "אוטומטי/ידני" },
            { he: "פריט מוכן למיקור בפרויקט", code: "F1990" },
          ],
          masterDataHe: ["Material Master (Purchasing view) = מקור-הפריט.", "Project assignment = שיוך לפרויקט-יעד."],
          mistakesHe: [
            "ייבוא ללא Purchasing view בחומר — הפריט לא ניתן-למיקור.",
            "שיוך לפרויקט שגוי — הפריט ממוקר בהקשר לא-נכון.",
          ],
          troubleshootHe: [
            "פריט מיובא לא משויך ➔ קטגוריה/כלל-שיוך חסרים.",
            "שגיאת-ייבוא ➔ פורמט/חומר לא קיים.",
          ],
          bestPracticeHe: [
            "השתמש בייבוא-מובנה לפריטים רבים במקום הזנה ידנית.",
            "תקנן קטגוריות לשיוך-אוטומטי אמין.",
          ],
          interviewHe: [
            { qHe: "מהיכן מיובאים הפריטים?", aHe: "מ-Material Master או מקובץ-חיצוני (part list), עם חומר/כמות/קטגוריה." },
            { qHe: "מה קובע שיוך-לפרויקט?", aHe: "באיזה Sourcing Project יתבצעו ההזמנה, ההערכה והפסיקה לאותו פריט." },
          ],
          takeawaysHe: [
            "ייבוא = הזנת הפריטים-למיקור.",
            "שיוך לפרויקט נותן לכל פריט 'בית'.",
            "ייבוא-מובנה לפריטים רבים.",
          ],
          relatedHe: [{ labelHe: "MM · Milestones (11.3.2)", href: "/library/mm/chapter-11/#sub-11.3.2" }],
        },
        {
          id: "11.3.2", titleHe: "אבני דרך ותזמון משימות", titleEn: "Milestones and Task Scheduling",
          execHe:
            "אבני-דרך (Milestones) ותזמון-משימות (Task Scheduling) קובעים את לוח-הזמנים של תהליך-המיקור: תאריכי-יעד לכל שלב (סיום-הזמנת-ספקים, סיום-הערכה, פסיקה), המבטיחים שהמיקור יושלם בזמן הנדרש לעסק.",
          beginnerHe:
            "כל פרויקט-מיקור צריך לוח-זמנים: עד מתי הספקים מגישים, עד מתי משווים, ומתי מחליטים. אבני-הדרך הן 'תחנות' עם תאריך-יעד, ותזמון-המשימות מחבר ביניהן כך שהכול מוכן בזמן.",
          consultantHe:
            "Milestones מוגדרות כתבנית (template) ומשויכות לפרויקט; כל אבן-דרך נושאת תאריך-יעד ואחראי. Task Scheduling יכול לגזור תאריכים אחורה ממועד-יעד-עסקי (backward scheduling). ניתן לחבר התראות/Workflow לאיחור. זה מאפשר משילות-לוחות-זמנים ושקיפות-התקדמות לאורך הפרויקט.",
          purposeHe:
            "לאכוף משמעת-זמנים על המיקור — שכל שלב יסתיים בזמן, והפסיקה תהיה מוכנה למועד שבו העסק זקוק למקור-האספקה.",
          processExampleHe:
            "מועד-השקה ב-1 בספטמבר; backward scheduling קובע: פסיקה עד 1 ביולי, סיום-הערכה עד 15 ביוני, סיום-הגשת-הצעות עד 1 ביוני. כל אבן-דרך מנוטרת.",
          cbcHe:
            "ב-CBC: מועד-השקת-ה-SKU מכתיב את כל לוח-המיקור אחורה — פסיקת-אריזות חייבת להסתיים מספיק מוקדם כדי לאפשר ייצור-ראשוני ובדיקות-קו.",
          navHe: ["SAP Fiori Launchpad ► Sourcing ► Manage Sourcing Projects ► Milestones / Schedule"],
          tables: ["EKKO", "EKPO"],
          tcodes: ["ME41"],
          fiori: ["F1990 (Manage Sourcing Projects)"],
          configHe: [
            "Milestone template: שלבי-תהליך עם תאריכי-יעד ואחראים.",
            "Backward scheduling ממועד-יעד-עסקי.",
            "התראות/Workflow לאיחור אבן-דרך.",
          ],
          flow: [
            { he: "קבע מועד-יעד עסקי", note: "השקה/דרישה" },
            { he: "Backward scheduling", note: "גזירת תאריכים אחורה" },
            { he: "Milestones לכל שלב", note: "הזמנה/הערכה/פסיקה" },
            { he: "ניטור התקדמות + התראות", note: "Workflow" },
          ],
          masterDataHe: ["Milestone template = תבנית-שלבים.", "Target date = מועד-יעד עסקי.", "Responsible = אחראי לכל אבן-דרך."],
          mistakesHe: [
            "אבני-דרך לא מתואמות למועד-העסקי — מיקור מאחר להשקה.",
            "ללא התראות-איחור — חריגות מתגלות מאוחר מדי.",
          ],
          troubleshootHe: [
            "אבני-דרך לא נאכפות ➔ template לא משויך לפרויקט.",
            "תאריכים לא-הגיוניים ➔ backward scheduling ממועד שגוי.",
          ],
          bestPracticeHe: [
            "תזמן אחורה ממועד-היעד העסקי (backward).",
            "הגדר התראות-איחור לאבני-דרך קריטיות.",
          ],
          interviewHe: [
            { qHe: "מהי אבן-דרך בתהליך-מיקור?", aHe: "תחנת-יעד עם תאריך ואחראי (סיום-הגשה/הערכה/פסיקה) המבטיחה השלמה-בזמן." },
            { qHe: "מהו backward scheduling במיקור?", aHe: "גזירת תאריכי-אבני-הדרך אחורה ממועד-היעד-העסקי כדי להבטיח מוכנות בזמן." },
          ],
          takeawaysHe: [
            "אבני-דרך = תחנות-יעד עם תאריכים.",
            "Backward scheduling ממועד-עסקי.",
            "התראות-איחור = משמעת-זמנים.",
          ],
          relatedHe: [{ labelHe: "MM · Parts Bundling (11.3.3)", href: "/library/mm/chapter-11/#sub-11.3.3" }],
        },
        {
          id: "11.3.3", titleHe: "איגוד פריטים לפי צורכי המיקור", titleEn: "Parts Bundling per Sourcing Needs",
          execHe:
            "איגוד-פריטים (Bundling) הוא קיבוץ פריטים לחבילות-מיקור לפי קטגוריה, ספק או נפח — כדי למנף נפח מול ספקים, לפשט את התהליך, ולהשיג מחירים ותנאים טובים יותר ממיקור-פריט-בודד.",
          beginnerHe:
            "במקום לחפש ספק לכל פריט בנפרד, מקבצים פריטים דומים יחד ('חבילה') ופונים לספק עם נפח גדול. ספק שמקבל הזמנה גדולה ייתן מחיר טוב יותר — וגם ננהל פחות תהליכים.",
          consultantHe:
            "Bundling מוגדר לפי כללים (קטגוריה/ספק/מפעל/נפח) ויכול להיות אוטומטי או ידני. החבילה הופכת ל-Sourcing Project אחד עם פריטים מרובים מול קבוצת-ספקים אחת. ההחלטה היא איזון: איגוד-יתר מסבך הצעות ומגביל-תחרות; תת-איגוד מאבד מנוף. שיקול: spend analysis וקטגוריזציה.",
          purposeHe:
            "למקסם מנוף-מיקור — מחיר ותנאים — דרך נפח מאוגד, ולצמצם עומס-תהליך מול ריבוי-פריטים.",
          processExampleHe:
            "במקום שלושה מיקורים נפרדים לפחיות/תוויות/קרטונים, מאגדים את כל חומרי-האריזה לחבילה אחת מול ספקי-אריזה — מחיר-נפח טוב יותר ופחות תהליכים.",
          cbcHe:
            "ב-CBC: איגוד כל חומרי-האריזה (פחיות+תוויות+קרטונים) לחבילה אחת מול ספק-אריזות אסטרטגי משיג הנחת-נפח ומפשט את הניהול לקראת ההשקה.",
          navHe: ["SAP Fiori Launchpad ► Sourcing ► Manage Sourcing Projects ► Bundle Items"],
          tables: ["EKKO", "EKPO"],
          tcodes: ["ME41"],
          fiori: ["F1990 (Manage Sourcing Projects)"],
          configHe: [
            "Bundling rules — לפי קטגוריה/ספק/מפעל/נפח.",
            "איגוד אוטומטי מול ידני; מגבלות-גודל-חבילה.",
          ],
          flow: [
            { he: "זיהוי פריטים דומים", note: "קטגוריה/ספק" },
            { he: "איגוד לחבילה", note: "Bundle" },
            { he: "מיקור-חבילה מול קבוצת-ספקים", code: "F1990" },
            { he: "מחיר-נפח + תהליך מפושט", note: "מנוף" },
          ],
          masterDataHe: ["Bundling rules = config-קיבוץ.", "Category = קריטריון-איגוד מרכזי.", "Volume = מנוף-מחיר."],
          mistakesHe: [
            "איגוד-יתר — חבילה ענקית שמגבילה ספקים ומסבכת הצעות.",
            "תת-איגוד — איבוד מנוף-מחיר ועומס-תהליך.",
            "איגוד פריטים מקטגוריות-שונות — אף ספק לא מתאים לכולם.",
          ],
          troubleshootHe: [
            "אף ספק לא יכול להגיש לחבילה ➔ פריטים מקטגוריות לא-תואמות אוגדו יחד.",
            "Bundle לא נוצר ➔ כללי-קיבוץ לא מוגדרים.",
          ],
          bestPracticeHe: [
            "אגד לפי קטגוריה-הומוגנית שספק יכול לספק במלואה.",
            "אזן מנוף מול תחרות — אל תאגד-יתר.",
            "בסס איגוד על spend analysis.",
          ],
          interviewHe: [
            { qHe: "מדוע לאגד פריטים למיקור?", aHe: "למנף נפח מול ספק (מחיר/תנאים טובים יותר) ולפשט תהליך מול ריבוי-פריטים." },
            { qHe: "מהו סיכון איגוד-יתר?", aHe: "חבילה רחבה-מדי מגבילה את מספר-הספקים שיכולים להגיש ופוגעת בתחרות." },
          ],
          takeawaysHe: [
            "איגוד = קיבוץ פריטים למנוף-נפח.",
            "לפי קטגוריה/ספק/נפח.",
            "אזן מנוף מול תחרות.",
          ],
          relatedHe: [{ labelHe: "MM · Procurement Planning (11.3)", href: "/library/mm/chapter-11/#sub-11.3" }],
        },
      ],
    },
    // ============================================================ 11.4
    {
      id: "11.4", titleHe: "מקורות מוצר עם ניהול חוזים ארגוני", titleEn: "Product Sourcing with Enterprise Contract Management",
      execHe:
        "Enterprise Contract Management (ECM) הוא יכולת-החוזים המתקדמת של S/4HANA המשתלבת ב-Product Sourcing: פסיקת-Award מתורגמת לחוזה-ארגוני עשיר — עם תנאים משפטיים, מסמכים מצורפים, היררכיית-תנאים ותהליכי-אישור — מעבר לחוזה-הרכש הקלאסי (ME31K). זהו הגשר בין המיקור האסטרטגי לבין החוזה המחייב.",
      beginnerHe:
        "אחרי שבוחרים ספק, צריך חוזה. Enterprise Contract Management הוא כלי-חוזים 'גדול' שמנהל לא רק מחיר וכמות, אלא גם את הצד המשפטי: סעיפים, מסמכים, אישורים. כשפוסקים זכייה ב-Product Sourcing, אפשר שהיא תתורגם ישירות לחוזה-ארגוני כזה.",
      consultantHe:
        "ECM (Enterprise Contract Management / SAP CLM) מרחיב את ה-Purchasing Contract הקלאסי ב-Legal Content Assembly, Clause Library, Hierarchical Contracts, ו-Approval Workflow. ב-Product Sourcing, ה-Award יכול ליצור Enterprise Contract הקושר את תנאי-ההצעה-הזוכה למסמך-משפטי מנוהל. שילוב עם DMS לנספחים ועם CPE לתנאי-תמחור דינמיים. נבדל מ-Outline Agreement (EKKO type K/L) ברובד המשפטי והמשילותי.",
      purposeHe:
        "להבטיח שמקור-האספקה שנפסק מעוגן בחוזה מחייב, מנוהל-משפטית ובר-ביקורת — לא רק רשומת-מחיר טכנית. כך מצמצמים סיכון-משפטי ומבטיחים אכיפות-תנאים.",
      processExampleHe:
        "Award לספק-אריזות מייצר Enterprise Contract: מחיר ותנאים מההצעה-הזוכה, סעיפים-משפטיים מ-Clause Library, נספח-איכות מ-DMS, ותהליך-אישור משפטי+רכש. החוזה משמש מקור-אספקה ל-PO.",
      cbcHe:
        "ב-CBC: חוזה-מסגרת רב-שנתי לאריזות מנוהל ב-ECM — כולל סעיפי-איכות (מפרט-פחית), סעיפי-מחיר (כולל הצמדה דרך CPE), ונספחי-תקינה למזון; מאושר משפטית לפני שהרכש מזמין.",
      navHe: [
        "SAP Fiori Launchpad ► Sourcing and Procurement ► Manage Purchase Contracts / Enterprise Contracts",
        "Materials Management ► Purchasing ► Outline Agreement ► Contract (ME31K/ME32K/ME33K)",
      ],
      tables: ["EKKO", "EKPO", "EKAB", "CDHDR"],
      tcodes: ["ME31K", "ME32K", "ME33K", "ME3L"],
      fiori: ["F1850 (Manage Purchasing Contracts)", "F1990 (Manage Sourcing Projects)", "F3665 (Manage Legal Documents)"],
      configHe: [
        "Contract Document Types + Award→Contract mapping מ-Product Sourcing.",
        "Clause Library + Legal Content Assembly (CLM) לסעיפים-סטנדרטיים.",
        "Approval Workflow (Flexible Workflow) לחוזה לפי ערך/קטגוריה.",
        "DMS integration לנספחים; CPE assignment לתנאי-תמחור.",
      ],
      flow: [
        { he: "Award ב-Sourcing Project", note: "פסיקה" },
        { he: "יצירת Enterprise Contract", code: "F1850" },
        { he: "סעיפים מ-Clause Library + נספחי-DMS", note: "Legal content" },
        { he: "Approval Workflow", note: "משפטי + רכש" },
        { he: "חוזה פעיל = מקור-אספקה", code: "EKKO" },
      ],
      masterDataHe: [
        "Enterprise Contract (EKKO/EKPO) = מקור-אספקה מחייב.",
        "Clause Library = מאגר-סעיפים משפטיים.",
        "DMS docs = נספחים/מפרטים מצורפים.",
      ],
      mistakesHe: [
        "שימוש בחוזה-קלאסי בלבד לעסקה מורכבת-משפטית — חוסר עיגון משפטי.",
        "דילוג על Approval Workflow — חוזה לא-מאושר נכנס לתוקף.",
        "אי-קישור CPE לחוזה-Commodity — מחיר קבוע במקום מוצמד.",
      ],
      troubleshootHe: [
        "Award לא יוצר Enterprise Contract ➔ mapping/Document Type חסר.",
        "סעיפים לא נטענים ➔ Clause Library לא מוגדרת/לא משויכת.",
        "החוזה לא ניתן-להזמנה ➔ לא אושר ב-Workflow / לא פעיל.",
      ],
      bestPracticeHe: [
        "השתמש ב-ECM לעסקאות אסטרטגיות/משפטיות-מורכבות.",
        "תקנן Clause Library לסעיפים חוזרים.",
        "אכוף Approval Workflow לפי ערך-חוזה.",
      ],
      interviewHe: [
        { qHe: "במה ECM שונה מ-Outline Agreement קלאסי?", aHe: "ECM מוסיף רובד משפטי-ומשילותי — Clause Library, Legal Content Assembly, חוזים-היררכיים, נספחי-DMS ו-Approval Workflow — מעבר למחיר/כמות." },
        { qHe: "כיצד Product Sourcing משתלב עם ECM?", aHe: "פסיקת-Award מתורגמת ל-Enterprise Contract הקושר את תנאי-ההצעה-הזוכה למסמך-משפטי מנוהל." },
      ],
      takeawaysHe: [
        "ECM = רובד-חוזים משפטי-מתקדם.",
        "Award → Enterprise Contract עם סעיפים ונספחים.",
        "Approval Workflow מבטיח חוזה-מאושר.",
      ],
      relatedHe: [
        { labelHe: "MM · Award Decisions (11.2.3)", href: "/library/mm/chapter-11/#sub-11.2.3" },
        { labelHe: "MM · Commodity Pricing Engine (11.5)", href: "/library/mm/chapter-11/#sub-11.5" },
        { labelHe: "אובייקט · EKKO", href: "/library/mm/object/EKKO/" },
      ],
    },
    // ============================================================ 11.5
    {
      id: "11.5", titleHe: "מקורות מוצר ומנוע תמחור סחורות (CPE)", titleEn: "Product Sourcing and Commodity Pricing Engine",
      execHe:
        "Commodity Pricing Engine (CPE) מחשב מחירים דינמיים לפריטים שמחירם נגזר ממדדי-סחורה (Commodity) — סוכר, אלומיניום, נפט — לפי נוסחאות ומקורות-שוק. ב-Product Sourcing, CPE מאפשר חוזים והצעות שמחירם 'צף' עם השוק במקום קבוע, ובכך משקף נכון את עלות-חומרי-הגלם.",
      beginnerHe:
        "מחיר של חלק מהחומרים (כמו סוכר או אלומיניום) משתנה כל הזמן בבורסה. במקום לקבע מחיר בחוזה, CPE קושר את המחיר למדד-שוק דרך נוסחה — כך שכשהסוכר מתייקר/מוזל, מחיר-החוזה מתעדכן אוטומטית. זה הוגן לשני הצדדים.",
      consultantHe:
        "CPE (Commodity Pricing Engine) מגדיר Commodity, Quotation source (מדד), Term ו-Pricing Formula (Routine) המחשבת מחיר מ-Commodity price + premiums/discounts. הוא משתלב ב-Pricing Procedure של החוזה/PO דרך Condition Types מסוג CPE. ב-Product Sourcing, הצעות-ספק לפריטי-סחורה וחוזי-מסגרת נשענים על CPE לתמחור-דינמי. דורש Commodity master, Quotation data (לרוב מ-Market Data feed), ו-CPE formula assignment ל-Condition. שילוב הדוק עם ECM (11.4) למחיר-חוזה מוצמד.",
      purposeHe:
        "לשקף את תנודתיות-שוק-הסחורות במחיר-החוזה בצורה אוטומטית, שקופה והוגנת — להימנע מסיכון-מחיר-קבוע ומסכסוכי-תמחור, ולתמחר נכון מוצרים עתירי-סחורה.",
      processExampleHe:
        "חוזה לרכיב עתיר-אלומיניום: ה-CPE formula = מחיר-LME-אלומיניום (ממוצע-חודשי) + premium-עיבוד. כל חודש המחיר מחושב-מחדש מהמדד; ה-PO על החוזה מקבל את המחיר-המעודכן.",
      cbcHe:
        "ב-CBC: הסוכר הוא Commodity מובהק. CPE מקשר את מחיר-הסוכר בחוזה למדד-בורסת-הסוכר (לדוגמה ICE Sugar No.11) + premium-לוגיסטי; כשמחיר-הסוכר העולמי עולה, עלות-המשקה מתעדכנת אוטומטית דרך החוזה.",
      navHe: [
        "Materials Management ► Purchasing ► Conditions ► Commodity Pricing (CPE) (SPRO)",
        "SAP Fiori Launchpad ► Sourcing and Procurement ► Commodity Management / Manage Quotations",
      ],
      tables: ["KONV", "KONP", "T685", "EKPO"],
      tcodes: ["ME31K", "ME11", "MEK1"],
      fiori: ["F1850 (Manage Purchasing Contracts)", "F0842A (Manage Purchasing Info Records)", "F1990 (Manage Sourcing Projects)"],
      configHe: [
        "Commodity master + Quotation source (מדד-שוק) + Term.",
        "CPE Formula (Routine): Commodity price + premiums/discounts.",
        "CPE Condition Types ב-Pricing Procedure של החוזה/PO.",
        "Market Data feed / Quotation import לעדכון-מחירים.",
      ],
      flow: [
        { he: "הגדרת Commodity + מדד", note: "Sugar/Aluminum" },
        { he: "CPE Formula", note: "מדד + premium" },
        { he: "שיוך Condition Type ל-חוזה", code: "MEK1" },
        { he: "חישוב-מחיר דינמי", note: "מ-Quotation data" },
        { he: "מחיר מוצמד ב-PO/Contract", code: "EKPO" },
      ],
      masterDataHe: [
        "Commodity master = הגדרת-הסחורה.",
        "Quotation/Market data = מחירי-מדד שוטפים.",
        "CPE Condition (KONP/KONV) = תנאי-התמחור הדינמי.",
      ],
      mistakesHe: [
        "מחיר-קבוע לפריט-סחורה תנודתי — סיכון-מחיר וסכסוכים.",
        "Quotation data לא מתעדכן — נוסחה מחשבת לפי מדד מיושן.",
        "Formula שגויה (premium/יחידות) — מחיר חריג.",
      ],
      troubleshootHe: [
        "מחיר CPE לא מחושב ➔ Quotation data חסר/לא-בתוקף.",
        "מחיר חריג ➔ Formula/premium/יחידות-מדה שגויים.",
        "Condition לא חלה ➔ CPE Condition Type לא ב-Pricing Procedure.",
      ],
      bestPracticeHe: [
        "השתמש ב-CPE לכל פריט שמחירו נגזר ממדד-שוק.",
        "ודא feed-מחירים אמין ומעודכן.",
        "תעד את ה-Formula ואת ה-premiums בבירור בחוזה.",
      ],
      interviewHe: [
        { qHe: "מהו Commodity Pricing Engine?", aHe: "מנוע המחשב מחיר דינמי לפריטי-סחורה לפי מדד-שוק ונוסחה (Commodity price + premiums), המשתלב ב-Pricing Procedure של חוזה/PO." },
        { qHe: "מדוע להעדיף CPE על מחיר-קבוע לסוכר?", aHe: "מחיר-הסוכר תנודתי; CPE מצמיד את מחיר-החוזה למדד-בורסה — הוגן, שקוף, ומשקף עלות-אמת ללא משא-ומתן חוזר." },
      ],
      takeawaysHe: [
        "CPE = תמחור-דינמי לפריטי-סחורה.",
        "מחיר = מדד-שוק + premiums (Formula).",
        "משתלב בחוזה/PO דרך CPE Condition Types.",
      ],
      relatedHe: [
        { labelHe: "MM · Enterprise Contract Management (11.4)", href: "/library/mm/chapter-11/#sub-11.4" },
        { labelHe: "MM · Mass Price Update (11.7)", href: "/library/mm/chapter-11/#sub-11.7" },
        { labelHe: "אובייקט · KONP", href: "/library/mm/object/KONP/" },
      ],
    },
    // ============================================================ 11.6
    {
      id: "11.6", titleHe: "ניהול הצעות מחיר והצעות ספקים", titleEn: "Quotation Management and Supplier Quotations",
      execHe:
        "ניהול הצעות-המחיר עוסק בקליטה, מעקב והשוואה של Supplier Quotations — ההצעות שהספקים מגישים בתגובה להזמנת-המיקור. ניהול-תקין מבטיח שכל הצעה נקלטת מלאה, בתוקף, ועם כל הנתונים הדרושים להערכה ולפסיקה.",
      beginnerHe:
        "כשמזמינים ספקים להציע מחיר, כל אחד שולח 'הצעה' (Quotation) עם מחיר, כמות וזמן-אספקה. ניהול-הצעות הוא לוודא שכל ההצעות מגיעות בזמן, נקלטות במערכת בצורה מלאה, ושאפשר להשוות ביניהן. בלי זה — אי-אפשר להעריך ולבחור.",
      consultantHe:
        "Supplier Quotation מנוהלת ב-Manage Supplier Quotations (F2370): קליטה ידנית (מהזמנת-RFQ) או דרך Business Network (אוטומטית מהספק). כל הצעה נושאת Validity, Conditions (מחיר/הנחות/CPE), Lead time ו-Status. ה-Quotation מקושרת ל-RFQ/Sourcing Project ומזינה את ה-Evaluation. שדות-מפתח: Quotation deadline, Bidder, Net price, Incoterms. בתהליך-Fiori ניתן לעבוד גם ב-collaboration ישיר עם הספק.",
      purposeHe:
        "להבטיח בסיס-השוואה מלא ואמין — שכל ההצעות נקלטות, תקפות, ומכילות את כל הנתונים — תנאי-הכרחי להערכה אובייקטיבית ולפסיקה תקפה.",
      processExampleHe:
        "חמישה ספקים הוזמנו; שלושה מגישים. הרוכש קולט כל הצעה ב-F2370 (מחיר, אספקה, Incoterms, תוקף), מוודא שלמות, וסוגר את חלון-ההגשה. שלוש ההצעות התקפות עוברות ל-Quotation Evaluation.",
      cbcHe:
        "ב-CBC: הצעות יצרני-הפחיות נקלטות עם מחיר-לאלף-יחידות, MOQ, זמן-אספקה ו-Incoterms; חלקן מגיעות אוטומטית דרך Business Network. הצעה ללא תוקף או חסרת-MOQ מסומנת לא-שלמה ולא נכנסת להערכה.",
      navHe: [
        "SAP Fiori Launchpad ► Sourcing ► Manage Supplier Quotations",
        "Materials Management ► Purchasing ► RFQ/Quotation ► Maintain Quotation (ME47)",
      ],
      tables: ["EKKO", "EKPO", "EKET", "EINE"],
      tcodes: ["ME41", "ME47", "ME48", "ME49"],
      fiori: ["F2370 (Manage Supplier Quotations)", "F2371 (Compare Supplier Quotations)", "F1990 (Manage Sourcing Projects)"],
      configHe: [
        "Quotation deadline + Validity ברמת-RFQ/Project.",
        "Condition Types בהצעה (מחיר/הנחה/CPE).",
        "Business Network integration לקליטה-אוטומטית של הצעות.",
        "Completeness checks (חובה: מחיר/אספקה/תוקף).",
      ],
      flow: [
        { he: "הזמנת-מיקור לספקים", code: "ME41" },
        { he: "קליטת Supplier Quotations", code: "F2370/ME47" },
        { he: "בדיקת-שלמות + תוקף", note: "Completeness" },
        { he: "סגירת חלון-הגשה", note: "Deadline" },
        { he: "מעבר ל-Evaluation", code: "ME49" },
      ],
      masterDataHe: [
        "Supplier Quotation = מחיר/אספקה/תוקף/Incoterms לכל ספק.",
        "Bidder = הספק המגיש (BP).",
        "Conditions (KONP) = תנאי-התמחור בהצעה.",
      ],
      mistakesHe: [
        "קליטת הצעה חלקית (ללא תוקף/אספקה) — מעוות השוואה.",
        "אי-סגירת חלון-ההגשה — הצעות-מאוחרות פוגעות בהוגנות.",
        "ערבוב מטבעות/יחידות בין הצעות — השוואה שגויה.",
      ],
      troubleshootHe: [
        "הצעה לא נכנסת להערכה ➔ חסרים שדות-חובה/תוקף.",
        "הצעת-Network לא נקלטה ➔ חיבור Business Network/mapping תקול.",
        "השוואה מעוותת ➔ מטבע/יחידת-מדה לא-אחידים.",
      ],
      bestPracticeHe: [
        "אכוף שלמות-הצעה (מחיר/אספקה/תוקף) לפני הערכה.",
        "סגור חלון-הגשה ברור לכל הספקים.",
        "אחֵד מטבע ויחידת-מדה להשוואה הוגנת.",
      ],
      interviewHe: [
        { qHe: "מהי Supplier Quotation?", aHe: "הצעת-הספק בתגובה להזמנת-מיקור — מחיר, כמות, אספקה, Incoterms ותוקף — המזינה את ה-Quotation Evaluation." },
        { qHe: "כיצד Business Network משפר את ניהול-ההצעות?", aHe: "הצעות נקלטות אוטומטית ומובנית מהספק, ללא הקלדה-ידנית — מהיר, מדויק ובר-השוואה." },
      ],
      takeawaysHe: [
        "Supplier Quotation = הצעת-הספק להזמנת-מיקור.",
        "שלמות + תוקף = תנאי להערכה.",
        "Business Network מאפשר קליטה-אוטומטית.",
      ],
      relatedHe: [
        { labelHe: "MM · Quotation Evaluation (11.2.2)", href: "/library/mm/chapter-11/#sub-11.2.2" },
        { labelHe: "MM · External Collaboration (11.8)", href: "/library/mm/chapter-11/#sub-11.8" },
        { labelHe: "אובייקט · EKKO", href: "/library/mm/object/EKKO/" },
      ],
    },
    // ============================================================ 11.7
    {
      id: "11.7", titleHe: "עדכון מחירים המוני (Mass Price Update)", titleEn: "Mass Price Update",
      execHe:
        "Mass Price Update הוא עדכון-מחירים גורף על-פני מקורות-אספקה רבים (Purchasing Info Records, חוזים) בבת-אחת — בעקבות פסיקה, שינוי-תנאים, או עדכון-Commodity. במקום לעדכן רשומה-רשומה, מבצעים עדכון-המוני מבוקר, חוסך-זמן ומונע-שגיאות.",
      beginnerHe:
        "אחרי משא-ומתן או שינוי-מחיר-סחורה, ייתכן שצריך לעדכן עשרות או מאות מחירים. במקום לפתוח כל רשומה בנפרד, Mass Price Update מאפשר לעדכן את כולם ביחד — מהר, אחיד, ובלי טעויות-הקלדה.",
      consultantHe:
        "העדכון נעשה על Purchasing Info Records (MEK1/MEKE, Mass Maintenance) או על חוזים, לרוב לפי קריטריון (ספק/קטגוריה/חומר/תוקף). ניתן לעדכן Condition value/percentage, validity dates, ו-scales. בהקשר-CPE, עדכון-המדד מתפשט אוטומטית, אך premiums/קבועים עשויים לדרוש Mass Update ידני. שילוב עם Price Determination ו-Release. שדות: Condition Type, new value, valid-from, selection.",
      purposeHe:
        "לעדכן מחירים בקנה-מידה ביעילות ובעקביות — בעקבות פסיקות, סבבי-משא-ומתן או שינויי-תנאים — בלי עומס-תפעולי ובלי שגיאות-רשומה-בודדת.",
      processExampleHe:
        "אחרי סבב-משא-ומתן שנתי, מחירי-100 Info Records של ספק עולים ב-3%. Mass Price Update מסנן לפי ספק, מחיל +3% על Condition PB00 מתאריך-תוקף, ומעדכן את כולם בפעולה אחת מבוקרת.",
      cbcHe:
        "ב-CBC: עדכון-מחירים שנתי לכל חוזי-האריזה של ספק-אסטרטגי בבת-אחת; ולחומרי-סחורה (סוכר) — עדכון ה-premiums הקבועים דרך Mass Update בעוד ה-CPE מטפל ברכיב-המדד אוטומטית.",
      navHe: [
        "Materials Management ► Purchasing ► Conditions ► Change/Mass Maintenance (MEK1/MEKE)",
        "SAP Fiori Launchpad ► Sourcing and Procurement ► Mass Changes to Purchasing Info Records / Contracts",
      ],
      tables: ["KONP", "KONH", "EINE", "A017"],
      tcodes: ["MEK1", "MEK2", "MEKE", "MEKR", "MEMASSIN"],
      fiori: ["F0842A (Manage Purchasing Info Records)", "F1850 (Manage Purchasing Contracts)", "F4198 (Mass Changes to Purchasing Info Records)"],
      configHe: [
        "Condition Type ל-Mass Update (PB00 וכו').",
        "Selection criteria (ספק/קטגוריה/חומר/מפעל/תוקף).",
        "Validity & scales לעדכון; Release strategy אם נדרש.",
      ],
      flow: [
        { he: "בחירת-רשומות לפי קריטריון", code: "MEKE" },
        { he: "הגדרת שינוי-מחיר", note: "value/% + valid-from" },
        { he: "תצוגה-מקדימה (Simulation)", note: "בדיקה" },
        { he: "ביצוע Mass Update", code: "MEK1" },
        { he: "עדכון מקורות-אספקה", code: "KONP" },
      ],
      masterDataHe: [
        "Info Record conditions (A017/KONP) = יעד-העדכון.",
        "Contract conditions = יעד-עדכון נוסף.",
        "CPE = רכיב-מדד מתעדכן אוטומטית; premiums ידני.",
      ],
      mistakesHe: [
        "עדכון ללא Simulation — שינוי-המוני שגוי קשה-לתיקון.",
        "תאריך-תוקף שגוי — מחיר-חדש חל על PO היסטוריים/עתידיים בטעות.",
        "עדכון-ידני לרכיב-מדד שמטופל ע\"י CPE — כפילות-עדכון.",
      ],
      troubleshootHe: [
        "עדכון לא תפס ➔ קריטריון-בחירה שגוי או Release חוסם.",
        "מחיר לא חל ב-PO ➔ valid-from לא-תואם לתאריך-PO.",
        "שינוי כפול ➔ CPE כבר מעדכן את רכיב-המדד.",
      ],
      bestPracticeHe: [
        "תמיד הרץ Simulation לפני ביצוע.",
        "הקפד על valid-from מדויק.",
        "עדכן ידנית רק premiums/קבועים; השאר את המדד ל-CPE.",
      ],
      interviewHe: [
        { qHe: "מתי משתמשים ב-Mass Price Update?", aHe: "לעדכון-מחירים גורף על Info Records/חוזים רבים — אחרי פסיקה, סבב-משא-ומתן או שינוי-תנאים — במקום רשומה-רשומה." },
        { qHe: "כיצד Mass Price Update מתייחס ל-CPE?", aHe: "רכיב-המדד מתעדכן אוטומטית ב-CPE; את ה-premiums/קבועים מעדכנים ב-Mass Update — להימנע מכפילות." },
      ],
      takeawaysHe: [
        "עדכון-מחירים גורף ביעילות ובעקביות.",
        "תמיד Simulation לפני ביצוע.",
        "CPE מטפל במדד; Mass Update ב-premiums.",
      ],
      relatedHe: [
        { labelHe: "MM · Commodity Pricing Engine (11.5)", href: "/library/mm/chapter-11/#sub-11.5" },
        { labelHe: "אובייקט · KONP", href: "/library/mm/object/KONP/" },
      ],
    },
    // ============================================================ 11.8
    {
      id: "11.8", titleHe: "שיתוף חיצוני עם ספקים", titleEn: "External Collaboration with Suppliers",
      execHe:
        "שיתוף-פעולה חיצוני עם ספקים מאפשר תקשורת דו-כיוונית, דיגיטלית ומובנית עם הספקים לאורך תהליך-המיקור — הזמנה-להצעה, קליטת-הצעות, שאלות-ותשובות ומסמכים — דרך SAP Business Network או דרך פורטל-ספקים פרטי. כך מצמצמים מיילים, מאיצים את התהליך ומשפרים את איכות-הנתונים.",
      beginnerHe:
        "במקום לנהל את הספקים במיילים, אפשר לחבר אותם למערכת. הספק מקבל את ההזמנה-להצעה, מגיש הצעה, שואל שאלות ומעלה מסמכים — הכול דרך פלטפורמה משותפת. תת-הסעיפים 11.8.1 ו-11.8.2 מציגים שתי דרכים: רשת-עסקים ציבורית (SAP Business Network) או פורטל פרטי.",
      consultantHe:
        "External Collaboration נתמך בשני ערוצים: SAP Business Network (רשת ציבורית, רב-קונה-רב-ספק, onboarding-מנוהל) ו-Supplier Portal פרטי (network-פרטי לקונה-בודד). שניהם מאפשרים RFQ distribution, Quotation submission, Q&A ו-document exchange, ומסתנכרנים עם Manage Supplier Quotations. נדרשת אינטגרציה (cXML/API) ו-Supplier onboarding. שיקול: Business Network לרוחב-ספקים גדול; Portal פרטי לשליטה ולברנדינג.",
      purposeHe:
        "לדגיטל את ממשק-הספק — להאיץ סבבי-מיקור, לצמצם טעויות-הקלדה, לשפר שקיפות ולנהל תקשורת מתועדת — במקום מיילים מפוזרים.",
      processExampleHe:
        "רוכש מפרסם RFQ דרך הרשת; חמישה ספקים מקבלים התראה, מגישים הצעות ישירות בפורטל, שואלים שאלות-הבהרה ב-Q&A מתועד, ומעלים תעודות-איכות. ההצעות נכנסות אוטומטית ל-Manage Supplier Quotations.",
      cbcHe:
        "ב-CBC: יצרני-פחיות בינלאומיים מחוברים דרך SAP Business Network להגשת-הצעות ולשיתוף-מפרטים; ספקים-מקומיים אסטרטגיים עובדים דרך פורטל-ספקים פרטי ממותג-CBC עם שאלוני-תקינה-למזון.",
      navHe: [
        "SAP Fiori Launchpad ► Sourcing ► Manage Supplier Quotations (Collaboration)",
        "SAP Business Network ► Supplier onboarding / RFQ distribution",
      ],
      tables: ["EKKO", "EKPO", "WYT3", "LFA1"],
      tcodes: ["ME41", "ME47", "ME49"],
      fiori: ["F2370 (Manage Supplier Quotations)", "F1990 (Manage Sourcing Projects)", "F0842A (Manage Purchasing Info Records)"],
      configHe: [
        "ערוץ-שיתוף: SAP Business Network מול Supplier Portal פרטי.",
        "Integration (cXML/API) + Supplier onboarding.",
        "RFQ distribution + Quotation auto-import mapping.",
        "Q&A ו-document exchange settings.",
      ],
      flow: [
        { he: "פרסום RFQ דרך הרשת/פורטל", note: "Distribution" },
        { he: "ספקים מגישים הצעות", note: "Submission" },
        { he: "Q&A + מסמכים", note: "Collaboration" },
        { he: "Auto-import ל-Supplier Quotations", code: "F2370" },
      ],
      masterDataHe: [
        "Supplier (BP/LFA1) + Network ID = הספק המחובר.",
        "RFQ/Sourcing Project = הזמנת-המיקור המופצת.",
        "Quotation = ההצעה הנקלטת מהרשת.",
      ],
      mistakesHe: [
        "ניהול-מיקור במיילים במקום בערוץ-משותף — אובדן-תיעוד ושגיאות.",
        "Onboarding-ספק לא-מושלם — ההצעות לא נקלטות.",
        "בחירת-ערוץ לא-מתאימה (Network לרוחב מול Portal לשליטה).",
      ],
      troubleshootHe: [
        "הצעה מהרשת לא נקלטת ➔ integration/mapping או onboarding תקול.",
        "ספק לא מקבל RFQ ➔ Network ID/חיבור חסר.",
        "מסמכים לא עוברים ➔ document-exchange settings.",
      ],
      bestPracticeHe: [
        "דגיטל את ממשק-הספק — הימנע ממיילים.",
        "ודא onboarding-ספק מלא לפני סבב-מיקור.",
        "בחר ערוץ לפי צורך: Network לרוחב, Portal לשליטה/ברנדינג.",
      ],
      interviewHe: [
        { qHe: "מהם שני ערוצי-השיתוף עם ספקים?", aHe: "SAP Business Network (רשת ציבורית רב-קונה-רב-ספק) ו-Supplier Portal פרטי (network-פרטי לקונה-בודד)." },
        { qHe: "מה היתרון בשיתוף-דיגיטלי על מיילים?", aHe: "האצת-תהליך, צמצום-שגיאות, שקיפות, וקליטה-אוטומטית של הצעות ל-Manage Supplier Quotations." },
      ],
      takeawaysHe: [
        "שיתוף-חיצוני מדגיטל את ממשק-הספק.",
        "שני ערוצים: Business Network ו-Portal פרטי.",
        "Auto-import של הצעות מצמצם שגיאות.",
      ],
      relatedHe: [
        { labelHe: "MM · Supplier Quotations (11.6)", href: "/library/mm/chapter-11/#sub-11.6" },
        { labelHe: "MM · SAP Business Network (11.8.1)", href: "/library/mm/chapter-11/#sub-11.8.1" },
      ],
      children: [
        {
          id: "11.8.1", titleHe: "רשת העסקים של SAP ומקורות מוצר", titleEn: "SAP Business Network and Product Sourcing",
          execHe:
            "SAP Business Network היא רשת-עסקים ציבורית המחברת קונים וספקים רבים בפלטפורמה אחת. ב-Product Sourcing היא מאפשרת הפצת-RFQ לרוחב-ספקים, קליטת-הצעות אוטומטית, ו-onboarding מנוהל — מינוף רשת-ספקים גלובלית ללא חיבורי-נקודה-לנקודה.",
          beginnerHe:
            "זו רשת ענקית שבה מחוברים המון ספקים. במקום לחבר כל ספק בנפרד, מתחברים פעם אחת לרשת ומגיעים לכולם. הספקים מקבלים את ההזמנות-להצעה דרך הרשת ומגיבים שם.",
          consultantHe:
            "SAP Business Network (לשעבר Ariba Network) מספקת supplier discovery, RFQ distribution, Quotation collaboration ו-document exchange דרך cXML/API. אינטגרציה עם S/4HANA דרך Ariba/Network adapter; הצעות מסתנכרנות ל-Manage Supplier Quotations. יתרונה: רוחב-ספקים גלובלי ו-onboarding מנוהל-רשת; שיקול: עלות-מנוי ותלות-פלטפורמה.",
          purposeHe:
            "להגיע לרוחב-ספקים גלובלי ולמכן את החלפת-המיקור — דרך רשת מחוברת אחת במקום חיבורים נפרדים לכל ספק.",
          processExampleHe:
            "פרסום RFQ ברשת מגיע ל-50 ספקים-פוטנציאליים מתאימים; 12 מגיבים בהצעות-מובנות שנקלטות אוטומטית ל-S/4HANA להערכה.",
          cbcHe:
            "ב-CBC: גישה ליצרני-פחיות בינלאומיים דרך SAP Business Network מרחיבה את בסיס-הספקים ל-SKU החדש מעבר לספקים-המקומיים, ומשפרת תחרות-מחיר.",
          navHe: ["SAP Business Network ► Sourcing / RFQ distribution; S/4HANA ► Manage Supplier Quotations"],
          tables: ["EKKO", "EKPO", "LFA1"],
          tcodes: ["ME41", "ME47"],
          fiori: ["F2370 (Manage Supplier Quotations)", "F1990 (Manage Sourcing Projects)"],
          configHe: [
            "Network connectivity (Ariba/Network adapter, cXML).",
            "Supplier discovery + onboarding דרך הרשת.",
            "RFQ distribution + Quotation auto-import mapping.",
          ],
          flow: [
            { he: "חיבור לרשת", note: "Network adapter" },
            { he: "RFQ distribution לרוחב-ספקים", note: "Discovery" },
            { he: "ספקים מגישים הצעות ברשת", note: "Collaboration" },
            { he: "Auto-import ל-S/4HANA", code: "F2370" },
          ],
          masterDataHe: ["Supplier + Network ID = הספק-המחובר.", "RFQ = הזמנה-מופצת.", "Quotation = הצעה-נקלטת."],
          mistakesHe: [
            "ציפייה שכל ספק כבר ברשת — חלק דורשים onboarding.",
            "אי-mapping של שדות — הצעות לא נקלטות נכון.",
          ],
          troubleshootHe: [
            "הצעות לא מסתנכרנות ➔ adapter/cXML/mapping תקול.",
            "ספק לא מגיב ➔ אינו onboarded לרשת.",
          ],
          bestPracticeHe: [
            "מנף discovery להרחבת-בסיס-ספקים.",
            "ודא onboarding לפני סבב-מיקור.",
          ],
          interviewHe: [
            { qHe: "מהי SAP Business Network?", aHe: "רשת-עסקים ציבורית רב-קונה-רב-ספק להפצת-RFQ, קליטת-הצעות ושיתוף-מסמכים — גישה לרוחב-ספקים גלובלי דרך חיבור-אחד." },
            { qHe: "מהו יתרונה המרכזי?", aHe: "רוחב-ספקים גלובלי ו-onboarding מנוהל-רשת ללא חיבורי-נקודה-לנקודה לכל ספק." },
          ],
          takeawaysHe: [
            "Business Network = רשת ציבורית רב-ספק.",
            "RFQ distribution + auto-import.",
            "רוחב-ספקים גלובלי דרך חיבור-אחד.",
          ],
          relatedHe: [{ labelHe: "MM · Supplier Portal (11.8.2)", href: "/library/mm/chapter-11/#sub-11.8.2" }],
        },
        {
          id: "11.8.2", titleHe: "פורטל ספקים (רשת פרטית)", titleEn: "Supplier Portal (Private Network)",
          execHe:
            "Supplier Portal הוא ערוץ-שיתוף פרטי (network-פרטי) שבו הקונה מחבר את ספקיו לפלטפורמה משלו — עם שליטה-מלאה, ברנדינג, ותהליכים-מותאמים — להגשת-הצעות, Q&A ושיתוף-מסמכים, ללא תלות ברשת-ציבורית.",
          beginnerHe:
            "בניגוד לרשת-הציבורית, פורטל-ספקים הוא 'אתר פרטי' של הארגון, שאליו מזמינים את הספקים. יש יותר שליטה, אפשר למתג אותו, ולהתאים תהליכים — אבל צריך לחבר כל ספק בעצמך.",
          consultantHe:
            "Supplier Portal (private network / SAP Supplier Collaboration / custom Fiori portal) מספק את אותן יכולות-שיתוף — RFQ, Quotation, Q&A, documents — בשליטת-הקונה. אינטגרציה ישירה ל-S/4HANA דרך API/OData. יתרון: שליטה, ברנדינג, התאמת-תהליך ופרטיות; חיסרון: onboarding ותחזוקה באחריות-הקונה, ללא discovery רשתי. מתאים לבסיס-ספקים יציב ואסטרטגי.",
          purposeHe:
            "לתת לקונה ערוץ-שיתוף בשליטתו-המלאה — לספקים-אסטרטגיים, עם ברנדינג, פרטיות ותהליכים-מותאמים — היכן שרשת-ציבורית אינה נדרשת או רצויה.",
          processExampleHe:
            "ספקים-אסטרטגיים מקבלים גישה לפורטל-ממותג; הם מגישים הצעות, ממלאים שאלוני-תאימות ומעלים תעודות — הכול מסתנכרן ל-S/4HANA, בשליטה-מלאה של הקונה.",
          cbcHe:
            "ב-CBC: ספקי-אריזה אסטרטגיים-מקומיים עובדים בפורטל-CBC ממותג, עם שאלוני-תקינה-למזון ומפרטי-איכות מותאמים — פרטיות ושליטה מלאה מול ספקים-מועדפים.",
          navHe: ["Buyer-hosted Supplier Portal ► RFQ / Quotation; S/4HANA ► Manage Supplier Quotations (API)"],
          tables: ["EKKO", "EKPO", "LFA1"],
          tcodes: ["ME41", "ME47"],
          fiori: ["F2370 (Manage Supplier Quotations)", "F1990 (Manage Sourcing Projects)"],
          configHe: [
            "Private portal setup + branding.",
            "Integration ל-S/4HANA (API/OData).",
            "Supplier onboarding באחריות-הקונה.",
            "Custom forms/questionnaires + document exchange.",
          ],
          flow: [
            { he: "הקמת פורטל-פרטי + ברנדינג", note: "Buyer-hosted" },
            { he: "Onboarding ספקים-אסטרטגיים", note: "באחריות-הקונה" },
            { he: "הגשת-הצעות + Q&A + מסמכים", note: "Collaboration" },
            { he: "סנכרון ל-S/4HANA", code: "F2370" },
          ],
          masterDataHe: ["Supplier (LFA1) + portal access = הספק-המחובר.", "RFQ/Quotation = ההזמנה וההצעה.", "Custom forms = שאלוני-תאימות."],
          mistakesHe: [
            "בחירת-פורטל-פרטי לבסיס-ספקים רחב — onboarding כבד.",
            "הזנחת-תחזוקת-הפורטל — ערוץ לא-אמין.",
          ],
          troubleshootHe: [
            "ספק לא מצליח להגיש ➔ גישה/onboarding לא-הושלמו.",
            "הצעה לא מסתנכרנת ➔ API/OData integration תקול.",
          ],
          bestPracticeHe: [
            "השתמש בפורטל-פרטי לבסיס-ספקים אסטרטגי-יציב.",
            "השקע ב-onboarding ובתחזוקה — הם באחריותך.",
          ],
          interviewHe: [
            { qHe: "במה Supplier Portal פרטי שונה מ-Business Network?", aHe: "פורטל-פרטי בשליטת-הקונה (ברנדינג/פרטיות/התאמה) אך onboarding באחריותו וללא discovery; Network = ציבורי, רב-ספק, עם discovery מנוהל-רשת." },
            { qHe: "מתי לבחור פורטל-פרטי?", aHe: "לבסיס-ספקים אסטרטגי-יציב הדורש שליטה, ברנדינג ופרטיות, היכן שרוחב-רשת אינו נדרש." },
          ],
          takeawaysHe: [
            "Supplier Portal = רשת-פרטית בשליטת-הקונה.",
            "שליטה/ברנדינג מול onboarding-עצמי.",
            "מתאים לספקים-אסטרטגיים יציבים.",
          ],
          relatedHe: [{ labelHe: "MM · SAP Business Network (11.8.1)", href: "/library/mm/chapter-11/#sub-11.8.1" }],
        },
      ],
    },
    // ============================================================ 11.9
    {
      id: "11.9", titleHe: "קונפיגורציה של מקורות מוצר", titleEn: "Configuration Product Sourcing",
      execHe:
        "קונפיגורציית Product Sourcing מגדירה את כל אבני-הבניין של התהליך ב-SPRO: Sourcing Project Types, Quotation Evaluation Criteria, Award Document Types, Number Ranges, Approval Workflows, אינטגרציית-CPE ו-Business Network. קונפיגורציה נכונה היא התנאי לכך שכל התהליך — מפרויקט ועד פסיקה — יפעל אוטומטית ועקבית.",
      beginnerHe:
        "כדי שכל מה שלמדנו יעבוד, צריך 'להגדיר' את המערכת מאחורי-הקלעים: אילו סוגי-פרויקטים יש, אילו קריטריוני-הערכה, מה נוצר בפסיקה, ומי מאשר. כל ההגדרות האלה נמצאות ב-SPRO תחת Sourcing & Procurement.",
      consultantHe:
        "הקונפיגורציה ב-SPRO כוללת: Define Sourcing Project Types, Define/Weight Evaluation Criteria, Award Document Type mapping (Contract/Info Record/Source List), Number Ranges, Flexible Workflow (Award/Contract approval), CPE Condition Types ו-Pricing Procedure, ו-Business Network integration. כל הגדרה מקושרת ל-Purchasing Org/Group. סדר-מומלץ: ארגון→סוגי-פרויקט→קריטריונים→Award mapping→Workflow→אינטגרציות. בדיקת end-to-end חיונית.",
      purposeHe:
        "לבסס את התשתית שעליה רץ Product Sourcing — להבטיח שכל פרויקט, הערכה ופסיקה מתנהגים עקבית, אוטומטית ובהתאם למדיניות-הרכש.",
      processExampleHe:
        "יועץ מגדיר Project Type 'STD-SOURCING' עם קריטריוני-הערכה ברירת-מחדל (מחיר/איכות/אספקה), ממפה Award ל-Contract Document Type, מחבר Flexible Workflow לאישור מעל סף-ערך, ובודק end-to-end מפרויקט ועד חוזה.",
      cbcHe:
        "ב-CBC: קונפיגורציה ייעודית לקטגוריות-אריזה — Project Type עם משקלות-איכות גבוהות (קריטי לקו-מילוי), CPE Condition לסוכר, ו-Workflow-אישור משפטי+רכש לחוזים מעל סף.",
      navHe: [
        "IMG (SPRO) ► Materials Management ► Purchasing ► Sourcing / Product Sourcing ► Define Sourcing Project Types",
        "IMG (SPRO) ► Materials Management ► Purchasing ► Sourcing ► Define Quotation Evaluation Criteria",
        "IMG (SPRO) ► Materials Management ► Purchasing ► Conditions ► Commodity Pricing (CPE)",
        "IMG (SPRO) ► Materials Management ► Purchasing ► Flexible Workflow for Purchasing Documents",
      ],
      tables: ["T160", "T685", "KONP", "EKKO", "EORD"],
      tcodes: ["SPRO", "OMEW", "ME31K", "MEK1", "SWDD"],
      fiori: ["F1990 (Manage Sourcing Projects)", "F1850 (Manage Purchasing Contracts)", "F0842A (Manage Purchasing Info Records)"],
      configHe: [
        "Define Sourcing Project Types — ברירות-מחדל לתהליך, קריטריונים ו-Award.",
        "Define & Weight Quotation Evaluation Criteria — מחיר/איכות/אספקה/שירות (סך 100%).",
        "Award Document Type mapping — Contract / Info Record / Source List.",
        "Number Ranges לפרויקטים/חוזים; Flexible Workflow לאישורים.",
        "CPE Condition Types + Pricing Procedure; Business Network integration.",
      ],
      flow: [
        { he: "ארגון-רכש (Org/Group)", code: "SPRO" },
        { he: "Sourcing Project Types", note: "ברירות-מחדל" },
        { he: "Evaluation Criteria + משקלות", code: "OMEW" },
        { he: "Award Document mapping", note: "Contract/IR/Source List" },
        { he: "Workflow + CPE + Network", note: "אינטגרציות" },
        { he: "בדיקת end-to-end", note: "פרויקט→פסיקה→חוזה" },
      ],
      masterDataHe: [
        "Project Types + Criteria = config-תהליך.",
        "Award mapping = config-תוצר.",
        "CPE/Network = config-אינטגרציה.",
      ],
      mistakesHe: [
        "קריטריונים שסכומם ≠ 100% — ניקוד-הערכה מעוות.",
        "Award mapping חסר — פסיקה לא יוצרת מקור-אספקה.",
        "Workflow לא-מחובר — חוזים נכנסים לתוקף ללא אישור.",
        "אי-בדיקת end-to-end — תקלות מתגלות בייצור.",
      ],
      troubleshootHe: [
        "פרויקט לא נוצר ➔ Project Type/Number Range חסרים.",
        "הערכה לא מנקדת ➔ קריטריונים/משקלות לא מוגדרים.",
        "Award נכשל ➔ Document Type mapping חסר.",
        "אישור לא נדרש/לא עובר ➔ Flexible Workflow לא-מוגדר נכון.",
      ],
      bestPracticeHe: [
        "ודא שמשקלות-הקריטריונים מסתכמים ל-100%.",
        "מפה כל Award לתוצר-אספקה אמיתי.",
        "בדוק end-to-end (פרויקט→פסיקה→חוזה→PO) לפני go-live.",
        "תעד את הקונפיגורציה ואת ההיגיון-העסקי מאחוריה.",
      ],
      interviewHe: [
        { qHe: "מהם רכיבי-הקונפיגורציה המרכזיים של Product Sourcing?", aHe: "Sourcing Project Types, Evaluation Criteria+weights, Award Document mapping, Number Ranges, Flexible Workflow, ואינטגרציות CPE/Business Network." },
        { qHe: "מדוע משקלות-הקריטריונים חייבים להסתכם ל-100%?", aHe: "כדי שהניקוד-המשוקלל יהיה מנורמל ובר-השוואה בין ספקים; סכום שונה מעוות את הדירוג." },
      ],
      takeawaysHe: [
        "כל התהליך נשען על קונפיגורציה ב-SPRO.",
        "Project Types, Criteria, Award mapping, Workflow, אינטגרציות.",
        "בדיקת end-to-end לפני go-live.",
      ],
      relatedHe: [
        { labelHe: "MM · Product Sourcing (11.2)", href: "/library/mm/chapter-11/#sub-11.2" },
        { labelHe: "MM · Commodity Pricing Engine (11.5)", href: "/library/mm/chapter-11/#sub-11.5" },
        { labelHe: "אובייקט · EORD", href: "/library/mm/object/EORD/" },
      ],
    },
    // ============================================================ 11.10
    {
      id: "11.10", titleHe: "סיכום", titleEn: "Summary",
      execHe:
        "Product Sourcing הוא התהליך האסטרטגי, מונחה-ה-Fiori, של מקורות-המוצר ב-S/4HANA: מ-Sourcing Project, דרך Supplier Quotations ו-Quotation Evaluation, ועד Award המתורגם למקור-אספקה (Enterprise Contract / Info Record / Source List). הוא נשען על תכנון-רכש (ייבוא/אבני-דרך/איגוד), משתלב עם Enterprise Contract Management, Commodity Pricing Engine ו-SAP Business Network, ונשען כולו על קונפיגורציה ב-SPRO.",
      beginnerHe:
        "סיכמנו פרק שלם: איך מוצאים, מעריכים ובוחרים ספקים למוצרים חדשים. למדנו לפתוח פרויקט-מיקור, לאסוף ולהשוות הצעות, לפסוק זוכה ולתרגם זאת לחוזה; לתכנן את הרכש; לתמחר סחורות דינמית (CPE); לעדכן מחירים בהמון; ולשתף ספקים דרך רשת ציבורית או פורטל פרטי — והכול נשען על הגדרות-מערכת.",
      consultantHe:
        "מבט-על: Product Sourcing מאחד Sourcing Project, Quotation Management, Evaluation ו-Award לזרימה אחת מתועדת; Procurement Planning מזין אותו במידע ולוחות-זמנים; ECM נותן רובד-חוזים משפטי; CPE נותן תמחור-סחורה דינמי; Mass Price Update מתחזק מחירים בקנה-מידה; ו-External Collaboration (Business Network / Portal) מדגיטל את ממשק-הספק. כל אלה רצים על קונפיגורציה ב-SPRO. שליטה בפרק = יכולת להוביל מימוש מקורות-מוצר מקצה-לקצה.",
      purposeHe:
        "לקשור את כל חלקי-הפרק לתמונה אחת — שהלומד יבין כיצד כל יכולת (פרויקט, הערכה, פסיקה, חוזה, תמחור, שיתוף) משתלבת לתהליך-מיקור שלם ובר-מימוש.",
      processExampleHe:
        "מצורך-עסקי (SKU חדש): תכנון-רכש→Sourcing Project→Supplier Quotations (דרך Business Network)→Quotation Evaluation→Award→Enterprise Contract (עם CPE לסחורה)→מקור-אספקה→PO תפעולי. כל שלב מתועד, מוגדר ב-SPRO, ומנוהל ב-Fiori.",
      cbcHe:
        "ב-CBC: השקת-SKU מקצה-לקצה — תכנון, מיקור-אריזות דרך Business Network ופורטל-פרטי, הערכה-משוקללת מוטת-איכות, Split Award לפיזור-סיכון, חוזי-ECM עם CPE לסוכר, ועדכוני-מחיר-המוניים שנתיים — כל מחזור-המיקור במערכת אחת.",
      navHe: ["SAP Fiori Launchpad ► Sourcing and Procurement ► Sourcing (overview of all Product Sourcing apps)"],
      tables: ["EKKO", "EKPO", "EINA", "EINE", "EORD", "KONP"],
      tcodes: ["ME41", "ME49", "ME31K", "MEK1", "ME01"],
      fiori: ["F1990 (Manage Sourcing Projects)", "F2370 (Manage Supplier Quotations)", "F1850 (Manage Purchasing Contracts)", "F0842A (Manage Purchasing Info Records)"],
      configHe: [
        "כל היכולות נשענות על קונפיגורציה ב-SPRO (11.9): Project Types, Criteria, Award mapping, Workflow, CPE, Network.",
        "Master Data תנאי-סף: Material, Supplier (BP), Purchasing Org/Group, Info Record.",
        "אינטגרציות: ECM (חוזים), CPE (תמחור), Business Network/Portal (שיתוף).",
      ],
      flow: [
        { he: "צורך עסקי", note: "SKU/רכיב חדש" },
        { he: "תכנון-רכש", note: "11.3" },
        { he: "Sourcing Project + Quotations", note: "11.2 / 11.6" },
        { he: "Evaluation + Award", note: "11.2.2 / 11.2.3" },
        { he: "Enterprise Contract + CPE", note: "11.4 / 11.5" },
        { he: "מקור-אספקה → PO תפעולי", code: "EORD" },
      ],
      masterDataHe: [
        "Material + Supplier + Purchasing Org = בסיס.",
        "Contract / Info Record / Source List = תוצרי-Award.",
        "CPE Conditions = תמחור-סחורה דינמי.",
      ],
      mistakesHe: [
        "התייחסות ל-Product Sourcing כרכש-תפעולי — בלבול-כלים.",
        "דילוג על תכנון-רכש — מיקור ספונטני ולא-ממונף.",
        "אי-תרגום פסיקה למקור-אספקה — תהליך-עקר.",
      ],
      troubleshootHe: [
        "התהליך נתקע ➔ אתר את החוליה: Master Data, config (SPRO), או אינטגרציה.",
        "פסיקה ללא תוצר ➔ Award mapping (11.9).",
        "מחיר-סחורה שגוי ➔ CPE/Quotation data (11.5).",
      ],
      bestPracticeHe: [
        "נהל מקור-אסטרטגי ב-Product Sourcing, שוטף ב-Operational Procurement.",
        "תכנן, אגד-נפחים, ופצל-סיכון בפסיקות-קריטיות.",
        "מנף CPE לסחורות ו-Business Network לרוחב-ספקים.",
        "בסס הכול על קונפיגורציה תקינה ובדיקת end-to-end.",
      ],
      interviewHe: [
        { qHe: "תאר את זרימת Product Sourcing מקצה-לקצה.", aHe: "תכנון-רכש→Sourcing Project→Supplier Quotations→Quotation Evaluation→Award→Enterprise Contract/Info Record/Source List→מקור-אספקה→PO; עם CPE לתמחור-סחורה ו-Business Network/Portal לשיתוף-ספקים." },
        { qHe: "אילו יכולות-S/4HANA משתלבות ב-Product Sourcing?", aHe: "Enterprise Contract Management (חוזים), Commodity Pricing Engine (תמחור-סחורה), SAP Business Network/Supplier Portal (שיתוף), ו-Flexible Workflow (אישורים) — מעל קונפיגורציית-SPRO." },
      ],
      takeawaysHe: [
        "Product Sourcing = מיקור-מוצר אסטרטגי מקצה-לקצה, מונחה-Fiori.",
        "פרויקט→הערכה→פסיקה→חוזה→מקור-אספקה.",
        "משתלב עם ECM, CPE ו-Business Network, על-גבי SPRO.",
        "שליטה בפרק = הובלת מימוש מקורות-מוצר שלם.",
      ],
      relatedHe: [
        { labelHe: "MM · What Is Product Sourcing? (11.1)", href: "/library/mm/chapter-11/#sub-11.1" },
        { labelHe: "MM · Configuration Product Sourcing (11.9)", href: "/library/mm/chapter-11/#sub-11.9" },
        { labelHe: "אובייקט · EORD", href: "/library/mm/object/EORD/" },
      ],
    },
  ],
};
