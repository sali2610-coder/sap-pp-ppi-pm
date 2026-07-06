// ===== PM Business User Guide — Chapter 7 (gold-standard learning chapter) =====
// Integrating Applications. Every node is a complete LearningNode with 18 facets
// of authored Hebrew (beginner + consultant friendly). Hierarchy + ids preserved
// from the source TOC. SAP object identifiers verbatim English. הארגון = Example Product
// bottling Plant Maintenance integration scenarios. MUST compile.
import type { TextbookChapter } from "./types";

export const CH7: TextbookChapter = {
  n: 7,
  titleHe: "שילוב יישומים",
  titleEn: "Integrating Applications",
  introHe:
    "תחזוקת-מפעל (PM) אינה אי בודד. כל הזמנת-תחזוקה (Maintenance Order) נוגעת ברכש חלקי-חילוף (MM), בתפיסת קיבולת מול ייצור (PP/PP-PI), באיכות וכיול (QM), בבטיחות וסביבה (EHS), ובזרימת-עלויות אל הכספים (FI/CO) ואל רכוש-קבוע (AA). פרק זה הוא יחידת-לימוד מלאה על נקודות-המגע של PM עם שאר רכיבי SAP S/4HANA, עם מערכות SAP נוספות (MDM, MDG, SRM) ועם מערכות חיצוניות (ניטור-תפעול/IoT, מערכות-מידע, מפרטי-שירות). כל תת-פרק הורחב ליחידת-לימוד עצמאית בת 18 מקטעים: שלוש רמות-הסבר, מטרה עסקית, דוגמת-תהליך, דוגמת הארגון, ניווט/SPRO, טבלאות/T-Codes/Fiori, פרטי-קונפיגורציה, תרשים זרימת-נתונים בין-מודולרי, טעויות נפוצות, פתרון-תקלות, שיטות-מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: להבין את ה-PM כצומת-אינטגרציה בלב ה-ERP.",
  subchapters: [
    // ============================================================ 7.1
    {
      id: "7.1",
      titleHe: "שילוב בתוך SAP S/4HANA",
      titleEn: "Integration within SAP S/4HANA",
      execHe:
        "בתוך SAP S/4HANA, PM אינו רכיב עצמאי אלא צומת המחבר לוגיסטיקה, ייצור, איכות, בטיחות וכספים סביב מסמך-מפתח אחד: הזמנת-התחזוקה (Maintenance Order). מרגע פתיחתה היא מושכת חלקי-חילוף מ-MM, תופסת קיבולת לצד PP, מפעילה בדיקות QM, נושאת היבטי EHS, ומזרימה עלויות אל CO ו-FI. הבנת נקודות-המגע הללו היא ההבדל בין מימוש-PM 'מבודד' למימוש שמשתלב בתהליכי הליבה של המפעל.",
      beginnerHe:
        "דמיין את הזמנת-התחזוקה ככרטיס-עבודה שעובר בין מחלקות: המחסן מספק חלפים (MM), הייצור מפנה את הקו (PP), המעבדה מכיילת מכשירים (QM), הבטיחות מוודאת היתר-עבודה (EHS), וההנהלה-הכספית סופגת את העלות (FI/CO). אותו כרטיס אחד 'מדבר' עם כל המחלקות. בפרק זה נכיר אחת-אחת את המחלקות שאיתן PM מתכתב.",
      consultantHe:
        "השילוב הפנימי נשען על אובייקטים משותפים ועל זרימת-מסמכים: Maintenance Order (AUFK/AFKO/AFVC), Reservation (RESB) → MM, Capacity (CRHD/CRCO) ↔ PP, Inspection Lot (QALS) ↔ QM, Settlement Rule (COBRB) → CO/FI/AA. הזמנת-התחזוקה היא Cost Object זמני שמסולק (Settlement) אל Cost Center, WBS, Asset או Order-מקבל. ב-S/4HANA ה-Universal Journal (ACDOCA) מאחד את רישומי FI/CO, כך שתנועות-PM נראות בזמן-אמת ללא reconciliation. נקודות-המגע הקלאסיות: Goods Movement (MIGO/261/101), Service Procurement (PR→PO→Service Entry Sheet), Capacity Leveling, ו-Settlement (KO88).",
      purposeHe:
        "המטרה: לאפשר תהליך-תחזוקה מקצה-לקצה שבו זמינות-חלפים, פינוי-קו, איכות-עבודה ועלות מתואמים אוטומטית בין המודולים — במקום ממשקים ידניים, גיליונות-Excel ותיאום טלפוני.",
      processExampleHe:
        "תקלת-מסוע: נפתחת Notification (M2) → הופכת ל-Maintenance Order (PM01) → הזמנת רכיבים יוצרת Reservation ל-MM, חלק-חסר מפיק Purchase Requisition → קיבולת מתוכננת מול PP → מד-לחץ מנותב לכיול ב-QM → גמר-עבודה (Confirmation) → Goods Issue 261 → Settlement של העלויות אל Cost Center של הקו (CO) ורישום ב-ACDOCA (FI).",
      scenarioHe:
        "בארגון קו-מילוי בקבוקים מחבר את כל הקצוות: מנוע-מסוע פגום → הזמנת-תחזוקה מושכת מיסב מהמחסן (MM), תופסת חלון-עצירה מתואם עם תכנית-הייצור (PP-PI), מכיילת מד-מומנט (QM), דורשת היתר-עבודה-חמה (EHS), ומסלקת את העלות אל מרכז-העלות של הקו (CO) ואל ה-Asset של המכונה (AA).",
      navHe: [
        "Plant Maintenance ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Define Default Values for Component Item Categories and Procurement (OIDA)",
        "Plant Maintenance ► Maintenance and Service Processing ► Maintenance and Service Orders ► Costing Data for Maintenance and Service Orders ► Assign Costing Parameters and Results Analysis Keys",
        "Controlling ► Internal Orders ► Actual Postings ► Settlement ► Maintain Settlement Profiles (OKO7)",
      ],
      tables: ["AUFK", "AFKO", "AFVC", "RESB", "QALS", "COBRB", "ACDOCA"],
      tcodes: ["IW31", "IW32", "IW41", "KO88", "MIGO", "CN22"],
      fiori: ["F2972", "F2971", "F4072A"],
      configHe: [
        "Settlement Profile (OKO7): קובע למי מותר לסלק (Cost Center / WBS / Asset / Order) ומהי ברירת-המחדל — לב האינטגרציה PM→CO/FI/AA.",
        "Component Item Categories (OIDA): L (מלאי→Reservation) מול N (לא-מלאי→Purchase Requisition) קובע אם החלק נמשך ממחסן או נרכש — נקודת-מגע PM↔MM.",
        "Costing Variant ו-Valuation Variant: כיצד מתומחרים חומרים ופעולות בהזמנה — מחבר PM ל-CO.",
        "Order Type (OIOA): מקשר את ה-PM Order לפרמטרים תלויי-סוג, כולל profiles של תכנון, מימוש ועלויות.",
      ],
      flow: [
        { he: "Notification", code: "IW21", note: "תקלה/דרישה" },
        { he: "Maintenance Order", code: "IW31", note: "Cost Object" },
        { he: "רכיבים → MM", code: "RESB/BANF", note: "Reservation / PReq" },
        { he: "קיבולת ↔ PP", code: "CM01", note: "תיאום עצירה" },
        { he: "בדיקה ↔ QM", code: "QALS", note: "Inspection Lot" },
        { he: "Confirmation", code: "IW41", note: "שעות + חומר" },
        { he: "Settlement → CO/FI/AA", code: "KO88", note: "ACDOCA" },
      ],
      masterDataHe: [
        "Equipment (EQUI) / Functional Location (IFLOT) — אובייקט-התחזוקה שאליו הכל מקושר.",
        "Cost Center (CSKS) ב-master-data של ה-FL/Equipment — יעד-סילוק ברירת-מחדל.",
        "Material Master (MARC/MBEW) של חלקי-החילוף — מחבר PM↔MM↔CO.",
      ],
      mistakesHe: [
        "Settlement Rule חסר/שגוי בהזמנה ➔ עלויות נתקעות ב-Order ולא מגיעות ל-Cost Center.",
        "Item Category שגוי לרכיב (L במקום N) ➔ אין דרישת-רכש לחלק לא-מלאי.",
        "התעלמות מתיאום-קיבולת מול PP ➔ עצירת-תחזוקה מתנגשת עם פק\"ע פעילה.",
      ],
      troubleshootHe: [
        "עלות לא מופיעה ב-Cost Center ➔ בדוק Settlement Rule (COBRB) והרצת KO88.",
        "חלק לא נמשך/נרכש ➔ בדוק Item Category (L/N) ב-RESB וזמינות-מלאי.",
        "הזמנה לא נסגרת כספית ➔ בדוק Status (TECO/CLSD) ו-Variance/Settlement פתוחים.",
      ],
      bestPracticeHe: [
        "הגדר Settlement Profile ו-Order Type מתואמים מראש עם ה-CO לפני go-live.",
        "תקנן ברירות-מחדל של Item Categories כדי למזער בחירה ידנית שגויה.",
        "שלב את תכנון-התחזוקה (IP10/Scheduling) עם לוח-הייצור למניעת התנגשויות-קיבולת.",
      ],
      interviewHe: [
        { qHe: "מהי הזמנת-התחזוקה מבחינת אינטגרציה?", aHe: "Cost Object זמני שמרכז עלויות-חומר ועבודה, מושך חלפים מ-MM, תופס קיבולת מול PP, מפעיל QM ומסולק (Settlement) אל CO/FI/AA." },
        { qHe: "כיצד S/4HANA מפשט את אינטגרציית PM↔FI/CO?", aHe: "באמצעות ה-Universal Journal (ACDOCA) המאחד FI ו-CO ברישום אחד — תנועות-PM נראות בזמן-אמת ללא reconciliation." },
        { qHe: "מה ההבדל בין Item Category L ל-N לרכיב בהזמנת-תחזוקה?", aHe: "L = רכיב-מלאי → Reservation ומשיכה ממחסן; N = לא-מלאי → Purchase Requisition ורכש ישיר לספק." },
      ],
      takeawaysHe: [
        "הזמנת-התחזוקה היא צומת-האינטגרציה המרכזי של PM בתוך S/4HANA.",
        "נקודות-מגע: MM (חלפים), PP (קיבולת), QM (בדיקות), EHS (בטיחות), CO/FI/AA (עלויות).",
        "Settlement ו-Item Category הם שני המתגים הקריטיים לזרימת-נתונים תקינה.",
      ],
      relatedHe: [
        { labelHe: "MM Academy · רכש חלקי-חילוף", href: "/library/mm-academy/" },
        { labelHe: "QM Academy · כיול ובדיקות", href: "/library/qm-academy/" },
      ],
      children: [
        {
          id: "7.1.1",
          titleHe: "ניהול חומרים (Materials Management)",
          titleEn: "Materials Management",
          execHe:
            "MM הוא שותף-האינטגרציה ההדוק ביותר של PM: כל חלק-חילוף שמותקן בהזמנת-תחזוקה נמשך מהמלאי או נרכש דרך MM. הקשר נע משני כיוונים — PM צורך מלאי (Goods Issue 261) ומפיק דרישות-רכש (Purchase Requisition) לחלקים חסרים.",
          beginnerHe:
            "כשטכנאי צריך מיסב או חיישן, הוא רושם אותו כרכיב בהזמנה. אם החלק במחסן — SAP יוצר 'שריון' (Reservation) ומוציא אותו מהמלאי. אם אין במלאי — נוצרת בקשת-רכש שעוברת לרכש כדי לקנות אותו. זהו הגשר בין התחזוקה למחסן.",
          consultantHe:
            "רכיבי-ההזמנה יושבים ב-RESB. Item Category L יוצר Reservation מול המלאי (תנועה 261 בעת המשיכה); Item Category N (Non-stock) יוצר Purchase Requisition (EBAN) עם Account Assignment לפק\"ע-התחזוקה (F = Order). חלפי-PM מנוהלים לרוב כ-Material Type ERSA (Spare Parts) עם Valuation ו-MRP משלהם. אינטגרציית-המלאי נראית מיד ב-MD04 וב-IW3L.",
          purposeHe:
            "להבטיח שחלקי-החילוף הנכונים זמינים בזמן-העבודה — בלי מלאי-יתר ובלי השבתה בגלל חוסר — ולקשר את עלות-החלף ישירות להזמנת-התחזוקה.",
          processExampleHe:
            "הזמנה דורשת מיסב (ERSA): רכיב L → Reservation; בעת ביצוע-העבודה מבצעים Goods Issue 261 מ-MIGO/IW41; חיישן מיוחד שאינו במלאי → רכיב N → Purchase Requisition → PO → קבלת-טובין 101 → Goods Issue להזמנה.",
          scenarioHe:
            "בארגון חלפי קו-המילוי (מיסבים, חגורות, ראשי-מילוי) מנוהלים כ-ERSA עם Reorder Point; הזמנת-תחזוקה מושכת אותם מהמחסן הטכני, וחלקי-יבוא מיוחדים נרכשים כ-Non-stock עם הקצאה ישירה להזמנה.",
          navHe: [
            "Plant Maintenance ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Define Default Values for Component Item Categories and Procurement",
            "Materials Management ► Purchasing ► Account Assignment ► Maintain Account Assignment Categories (OME9)",
          ],
          tables: ["RESB", "EBAN", "MARC", "MBEW", "MSEG"],
          tcodes: ["IW31", "MIGO", "MB21", "ME51N", "IW3L"],
          fiori: ["F2972", "F0842", "F1990"],
          configHe: [
            "Item Category default (L/N) לסוג-ההזמנה — קובע מלאי מול רכש.",
            "Account Assignment Category (OME9): F = Order — הקצאת עלות-הרכש ישירות לפק\"ע-התחזוקה.",
            "Material Type ERSA לחלקי-חילוף עם Valuation Class ופרמטרי-MRP ייעודיים.",
          ],
          flow: [
            { he: "רכיב בהזמנה", code: "RESB", note: "L או N" },
            { he: "מלאי → Reservation", code: "261", note: "Goods Issue" },
            { he: "חוסר → PReq", code: "EBAN", note: "Acct Assign F" },
            { he: "PO + קבלה", code: "101", note: "MIGO" },
          ],
          masterDataHe: [
            "Material Master ERSA (MARC/MBEW) — חלף עם Valuation ו-MRP.",
            "Bill of Material לציוד (PM BOM) — רשימת-חלפים מוקצית ל-Equipment/FL.",
          ],
          mistakesHe: [
            "רכיב N ללא Account Assignment ➔ עלות-הרכש לא נצמדת להזמנה.",
            "חלף מנוהל ב-Material Type שגוי ➔ אין MRP/Reorder ➔ חוסר חוזר.",
          ],
          troubleshootHe: [
            "Goods Issue נכשל ➔ בדוק מלאי זמין, Storage Location ו-Movement Type 261.",
            "אין דרישת-רכש לחלק חסר ➔ Item Category הוגדר L במקום N.",
          ],
          bestPracticeHe: [
            "נהל PM BOM לכל Equipment קריטי — מצמצם חיפוש-חלפים בזמן-תקלה.",
            "הקצה Reorder Point לחלפים קריטיים למניעת השבתה.",
          ],
          interviewHe: [
            { qHe: "כיצד נמשך חלק-חילוף ממלאי בהזמנת-תחזוקה?", aHe: "רכיב Item Category L יוצר Reservation (RESB); בעת ביצוע מבצעים Goods Issue בתנועה 261." },
            { qHe: "מה קורה לחלק שאינו במלאי?", aHe: "Item Category N יוצר Purchase Requisition עם Account Assignment F (Order), שהופכת ל-PO וקבלת-טובין המוקצית ישירות להזמנה." },
          ],
          takeawaysHe: [
            "PM צורך מלאי (261) ומפיק דרישות-רכש דרך MM.",
            "L = Reservation ממלאי; N = Purchase Requisition לרכש.",
            "חלפים מנוהלים כ-ERSA עם MRP ו-Reorder Point.",
          ],
          relatedHe: [{ labelHe: "MM Academy · ניהול מלאי ורכש", href: "/library/mm-academy/" }],
        },
        {
          id: "7.1.2",
          titleHe: "תכנון ובקרת ייצור (Production Planning and Control)",
          titleEn: "Production Planning and Control",
          execHe:
            "PM ו-PP חולקים את אותם משאבי-ייצור: מרכזי-עבודה (Work Centers) וקיבולת. עצירת-תחזוקה תופסת קיבולת שאחרת הייתה משמשת לייצור, ולכן תכנון-התחזוקה חייב להיות מתואם עם תכנית-הייצור כדי שלא יתנגשו על אותו קו.",
          beginnerHe:
            "אותה מכונה משמשת גם לייצור וגם דורשת תחזוקה. אם לא מתאמים — התחזוקה 'תופסת' את הקו בדיוק כשהייצור צריך אותו. SAP מאפשר לראות את שני העומסים יחד ולתזמן עצירת-תחזוקה לחלון פנוי.",
          consultantHe:
            "מרכז-העבודה (CRHD) משותף ל-Routing של PP ול-Operations של PM Order; דרישת-הקיבולת של שתיהן מצטברת ב-Capacity (KAKO) וניתנת לאיזון ב-Capacity Leveling (CM01/CM21). תחזוקה-מונעת (Preventive, IP10) יוצרת הזמנות מחזוריות שיש לשבץ בחלונות בין פק\"עות. ב-S/4HANA ניתן לקשר תחזוקה ל-PP/DS לתזמון מתקדם.",
          purposeHe:
            "למנוע התנגשות בין עצירת-תחזוקה לפק\"ע פעילה, ולשבץ תחזוקה-מונעת בחלונות-זמן שאינם פוגעים בתפוקת-הייצור.",
          processExampleHe:
            "תכנית-תחזוקה-מונעת מפיקה הזמנה לבדיקת-מסוע כל 500 שעות-ריצה; המתכנן צופה ב-CM01 את עומס-הקיבולת של הקו, מזהה חלון בין שתי פק\"עות, ומתזמן את העצירה לשם.",
          scenarioHe:
            "בארגון עצירת-CIP/תחזוקה של קו-המילוי מתואמת עם לוח-הייצור היומי: התחזוקה מתוזמנת בין משמרות או בסוף-מחזור-ייצור כדי לא לעצור מילוי פעיל; מרכז-העבודה של הקו משותף ל-PP-PI ול-PM.",
          navHe: [
            "Plant Maintenance ► Maintenance Plans, Work Centers, Task Lists ► Work Centers ► General Data ► Define Control Keys",
            "Production ► Capacity Requirements Planning ► Evaluation ► Define Profiles for Capacity Leveling",
          ],
          tables: ["CRHD", "KAKO", "AFVC", "PLPO"],
          tcodes: ["IR01", "CM01", "CM21", "IP10", "CR03"],
          fiori: ["F2336", "F2297"],
          configHe: [
            "Work Center משותף עם Capacity Category ונוסחאות-תזמון/קיבולת.",
            "Control Key לפעולת-PM הקובע אם הפעולה רלוונטית-לתזמון/קיבולת.",
            "Capacity Leveling Profile לאיזון עומסי PP+PM באותו מרכז-עבודה.",
          ],
          flow: [
            { he: "מרכז-עבודה משותף", code: "CRHD", note: "PP + PM" },
            { he: "עומס מצטבר", code: "KAKO", note: "Capacity" },
            { he: "איזון", code: "CM21", note: "Leveling" },
            { he: "שיבוץ עצירה", code: "IP10", note: "חלון פנוי" },
          ],
          masterDataHe: [
            "Work Center (CRHD/CRCA) — משאב משותף PP↔PM.",
            "Maintenance Task List (PLKO/PLPO) — פעולות-תחזוקה תופסות קיבולת כמו Routing.",
          ],
          mistakesHe: [
            "תזמון תחזוקה ללא בדיקת-קיבולת ➔ התנגשות עם פק\"ע פעילה.",
            "פעולות-PM ללא Control Key רלוונטי-לקיבולת ➔ העומס לא נראה בתכנון.",
          ],
          troubleshootHe: [
            "עצירת-תחזוקה מתנגשת עם ייצור ➔ בדוק Capacity Leveling ושבץ מחדש (CM21).",
            "עומס-תחזוקה לא מופיע ➔ Control Key של הפעולה אינו רלוונטי-לקיבולת.",
          ],
          bestPracticeHe: [
            "תזמן תחזוקה-מונעת לחלונות בין-משמרות מתואמים עם PP.",
            "השתמש בתצוגת-קיבולת משולבת (PP+PM) לפני שחרור הזמנה.",
          ],
          interviewHe: [
            { qHe: "כיצד PM ו-PP חולקים משאבים?", aHe: "דרך מרכז-העבודה המשותף (CRHD); דרישות-הקיבולת של פק\"עות ושל הזמנות-תחזוקה מצטברות באותה Capacity וניתנות לאיזון ב-Capacity Leveling." },
            { qHe: "מדוע לתזמן תחזוקה-מונעת מול לוח-הייצור?", aHe: "כדי לשבץ עצירות בחלונות שאינם פוגעים בפק\"עות פעילות ובתפוקת-הקו." },
          ],
          takeawaysHe: [
            "PM ו-PP חולקים מרכז-עבודה וקיבולת.",
            "תחזוקה תופסת קיבולת — חובה לתאם מול תכנית-הייצור.",
            "Capacity Leveling מאזן עומסי PP+PM יחד.",
          ],
          relatedHe: [{ labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" }],
        },
        {
          id: "7.1.3",
          titleHe: "ייצור-עצמי של חלקי-חילוף למלאי",
          titleEn: "In-House Production of Spare Parts for Stock",
          execHe:
            "לעיתים זול ומהיר יותר לייצר חלק-חילוף בבית-המלאכה הפנימי במקום לרכוש מספק. כאן PM ו-PP נפגשים הפוך: הייצור (PP) מייצר חלף שנכנס למלאי (MM) ומשמש מאוחר יותר את התחזוקה (PM).",
          beginnerHe:
            "אם לבית-החרושת יש מחרטה, הוא יכול לייצר ציר או תושבת בעצמו במקום לקנות. זה נכנס למחסן כחלק-חילוף רגיל, וכשתהיה תקלה — התחזוקה תשתמש בו. מעגל שלם בתוך הארגון.",
          consultantHe:
            "החלף מנוהל כ-Material Type HALB/FERT עם BOM ו-Routing ומיוצר בפק\"ע רגילה (Production Order) המסולקת למלאי (Goods Receipt 101). בעת תקלה, הזמנת-PM מושכת אותו כרכיב L (Reservation, 261). זהו תהליך Make-to-Stock לחלקי-חילוף; חלופה: ייצור Make-to-Order ישירות מול הזמנת-PM.",
          purposeHe:
            "לנצל כושר-ייצור פנוי, לקצר זמני-אספקה לחלפים קריטיים, ולהפחית תלות בספקים חיצוניים.",
          processExampleHe:
            "בית-המלאכה מייצר תושבות-מנוע: Production Order → ייצור → Goods Receipt 101 למלאי כ-HALB; מאוחר יותר הזמנת-PM מושכת תושבת מהמלאי (261) להחלפה.",
          scenarioHe:
            "בארגון בית-המלאכה הטכני מייצר מתאמים/תושבות מותאמים לקו-המילוי; הם נכנסים למלאי הטכני, וכשמתבלה רכיב — הזמנת-התחזוקה מושכת אותם בלי המתנה ליבוא.",
          navHe: [
            "Production ► Shop Floor Control ► Master Data ► Order ► Define Order Types",
            "Plant Maintenance ► Maintenance and Service Processing ► Maintenance and Service Orders ► Define Default Values for Component Item Categories and Procurement",
          ],
          tables: ["AFKO", "AFPO", "MARC", "RESB", "MSEG"],
          tcodes: ["CO01", "MIGO", "IW31", "MB1A"],
          fiori: ["F2336", "F2972"],
          configHe: [
            "Material Type של החלף (HALB/FERT) עם BOM + Routing + Procurement Type E (In-house).",
            "Production Order Type לייצור-עצמי של חלפים.",
            "Item Category L בהזמנת-PM למשיכת החלף המיוצר מהמלאי.",
          ],
          flow: [
            { he: "ייצור חלף", code: "CO01", note: "Production Order" },
            { he: "כניסה למלאי", code: "101", note: "GR" },
            { he: "תקלה → משיכה", code: "261", note: "Reservation" },
          ],
          masterDataHe: [
            "Material Master HALB/FERT עם Procurement Type E.",
            "BOM + Routing לחלף המיוצר-עצמית.",
          ],
          mistakesHe: [
            "ייצור-עצמי ללא שיקול-עלות מול רכש ➔ עלות גבוהה מהנדרש.",
            "Procurement Type שגוי ➔ MRP מנסה לרכוש במקום לייצר.",
          ],
          troubleshootHe: [
            "החלף לא זמין לתחזוקה ➔ בדוק Goods Receipt 101 מהפק\"ע למלאי.",
            "MRP לא מציע ייצור ➔ Procurement Type אינו E.",
          ],
          bestPracticeHe: [
            "בצע Make-vs-Buy לחלפים קריטיים לפני קביעת-מדיניות.",
            "נהל את החלף המיוצר במלאי טכני נפרד לבקרת-זמינות.",
          ],
          interviewHe: [
            { qHe: "כיצד מנוהל חלק-חילוף המיוצר בבית?", aHe: "כ-HALB/FERT עם BOM+Routing ו-Procurement Type E; מיוצר בפק\"ע, נכנס למלאי (101), ונמשך מאוחר יותר להזמנת-PM (261)." },
            { qHe: "מהו היתרון בייצור-עצמי של חלפים?", aHe: "קיצור זמן-אספקה לחלפים קריטיים, ניצול כושר פנוי והפחתת תלות בספקים." },
          ],
          takeawaysHe: [
            "PP מייצר חלף → MM מאחסן → PM צורך.",
            "Procurement Type E מסמן ייצור-עצמי.",
            "מעגל Make-to-Stock פנימי לחלקי-חילוף.",
          ],
          relatedHe: [{ labelHe: "PP · אב חומר לייצור (3.1)", href: "/library/pp/chapter-03/#sub-3.1" }],
        },
        {
          id: "7.1.4",
          titleHe: "ניהול איכות (Quality Management)",
          titleEn: "Quality Management",
          execHe:
            "QM משתלב ב-PM בעיקר בשני מישורים: כיול ציוד-מדידה (Calibration) ובדיקת חלקי-חילוף נכנסים. כיול הוא תהליך-תחזוקה שמפיק Inspection Lot ב-QM ומתעד תוצאות-מדידה — קריטי לרגולציה ולמהימנות-מכשירים.",
          beginnerHe:
            "מכשירי-מדידה (מאזניים, מדי-לחץ, מדי-טמפרטורה) חייבים להיבדק מדי-תקופה כדי לוודא שהם מדויקים — זה נקרא 'כיול'. ב-SAP הכיול מתחיל כהזמנת-תחזוקה ומפעיל בדיקת-איכות (Inspection) שמתעדת אם המכשיר עבר. כך מוודאים שהמדידות במפעל אמינות.",
          consultantHe:
            "תהליך-הכיול מקשר Equipment (ציוד-המדידה) ל-Maintenance Plan עם Inspection Type 14; שחרור-ההזמנה יוצר Inspection Lot (QALS) עם Inspection Characteristics (QPMK/Master Inspection Characteristics). תוצאות נרשמות ב-Results Recording (QE11), Usage Decision (QA11) קובע עבר/נכשל, וה-Equipment מקבל סטטוס-כיול. בדיקת חלפים נכנסים מפעילה Inspection Lot בקבלת-הטובין (Inspection Type 01).",
          purposeHe:
            "להבטיח שציוד-המדידה מדויק ומכויל לפי רגולציה ותקנים (ISO, GMP), ולתעד ראיות-כיול לביקורת.",
          processExampleHe:
            "כיול מד-לחץ: Maintenance Plan מפיק הזמנת-כיול → שחרור יוצר Inspection Lot → טכנאי מודד ורושם תוצאות (QE11) → Usage Decision 'עבר' → תאריך-הכיול-הבא מתעדכן; אם 'נכשל' → המכשיר נחסם לשימוש.",
          scenarioHe:
            "בארגון מד-מומנט של ראש-המילוי ומדי-Brix של התרכיז מכוילים מחזורית דרך תכנית-תחזוקה+QM; כשל-כיול חוסם את הקו עד תיקון — מניעת מילוי מחוץ-לטולרנס (בטיחות-מזון).",
          navHe: [
            "Quality Management ► Quality Inspection ► Inspection Lot Creation ► Maintain Inspection Types",
            "Plant Maintenance ► Maintenance Plans, Work Centers, Task Lists ► Task Lists ► Control Data ► Configure Inspection Point Completion",
          ],
          tables: ["QALS", "QPMK", "QAMR", "PLPO", "EQUI"],
          tcodes: ["IP01", "QE11", "QA11", "IK01", "QGA1"],
          fiori: ["F2972", "F3019"],
          configHe: [
            "Inspection Type 14 (Calibration) מקושר לסוג-ההזמנה ולתכנית-התחזוקה.",
            "Master Inspection Characteristics (QS21) — מאפייני-המדידה לכיול.",
            "Sampling Procedure / Tolerance — קביעת עבר/נכשל לכיול.",
          ],
          flow: [
            { he: "תכנית-כיול", code: "IP01", note: "Inspection Type 14" },
            { he: "הזמנה → Inspection Lot", code: "QALS" },
            { he: "תיעוד תוצאות", code: "QE11", note: "Results" },
            { he: "Usage Decision", code: "QA11", note: "עבר/נכשל" },
          ],
          masterDataHe: [
            "Equipment של מכשיר-המדידה (EQUI) עם Inspection Plan מקושר.",
            "Master Inspection Characteristics (QPMK) — מאפייני-הכיול ותחומי-הטולרנס.",
          ],
          mistakesHe: [
            "כיול ללא Master Inspection Characteristics ➔ אין קריטריון עבר/נכשל.",
            "אי-חסימת מכשיר שנכשל בכיול ➔ מדידות לא-אמינות בייצור.",
          ],
          troubleshootHe: [
            "Inspection Lot לא נוצר ➔ Inspection Type 14 לא מקושר/לא פעיל.",
            "תאריך-כיול-הבא לא מתעדכן ➔ Usage Decision לא בוצע (QA11).",
          ],
          bestPracticeHe: [
            "נהל מחזורי-כיול בתכניות-תחזוקה מונעות מבוססות-זמן.",
            "חסום אוטומטית ציוד שנכשל בכיול עד תיקון.",
          ],
          interviewHe: [
            { qHe: "כיצד משולב QM בתהליך-כיול?", aHe: "הזמנת-הכיול (Inspection Type 14) יוצרת Inspection Lot (QALS); התוצאות נרשמות (QE11) וה-Usage Decision (QA11) קובע עבר/נכשל ומעדכן את תאריך-הכיול-הבא." },
            { qHe: "מה קורה למכשיר שנכשל בכיול?", aHe: "ה-Usage Decision מסמן כישלון, המכשיר נחסם/מסומן כלא-מכויל ואסור לשימוש עד תיקון וכיול-מחדש." },
          ],
          takeawaysHe: [
            "כיול = הזמנת-תחזוקה המפעילה Inspection Lot ב-QM.",
            "Inspection Type 14 הוא ליבת-הכיול.",
            "Usage Decision קובע עבר/נכשל ומעדכן מחזור-כיול.",
          ],
          relatedHe: [{ labelHe: "QM Academy · כיול ציוד-מדידה", href: "/library/qm-academy/" }],
        },
        {
          id: "7.1.5",
          titleHe: "סביבה, בריאות ובטיחות (Environment, Health, and Safety)",
          titleEn: "Environment, Health, and Safety",
          execHe:
            "EHS משתלב ב-PM כדי להבטיח שעבודות-תחזוקה מסוכנות מתבצעות בבטחה: היתרי-עבודה (Work Clearance/Permits), נעילה-ותיוג (LOTO), והערכות-סיכון משולבות בהזמנת-התחזוקה לפני שחרורה.",
          beginnerHe:
            "לפני שטכנאי נכנס לתקן מכונה מסוכנת, צריך לוודא שהיא כבויה, נעולה ושיש היתר-עבודה. EHS מוסיף את שכבת-הבטיחות הזו להזמנת-התחזוקה — בלי אישור-בטיחות, העבודה לא משתחררת.",
          consultantHe:
            "ב-S/4HANA האינטגרציה נשענת על Work Clearance Management (WCM) ועל EHS Health & Safety: הזמנת-PM מקושרת ל-Work Approval/Work Clearance Application ול-LOTO (Lockout-Tagout). שחרור-ההזמנה מותנה באישור-הבטיחות. Safety Measures, Permits ו-Risk Assessments נשמרים ומתועדים לביקורת. אובייקטים: WCM application, Safety measures בטבלאות EHS.",
          purposeHe:
            "למנוע פציעות ותקריות-סביבה בעבודות-תחזוקה, ולעמוד בדרישות-רגולציה (OSHA, ISO 45001) עם תיעוד-ראיות מלא.",
          processExampleHe:
            "תיקון משאבת-כימיקלים: הזמנת-PM דורשת היתר-עבודה-חמה ו-LOTO → EHS מנפיק Permit, מבצע Risk Assessment, נועל מקורות-אנרגיה → רק לאחר אישור משוחררת ההזמנה לביצוע.",
          scenarioHe:
            "בארגון עבודות על מערכת-ה-CO2 או על דוד-קיטור דורשות היתר-עבודה-חמה ו-LOTO; הזמנת-התחזוקה לא משוחררת עד שה-EHS מאשר נעילה, אוורור והערכת-סיכון — מניעת תאונת-לחץ/חנק.",
          navHe: [
            "Plant Maintenance ► Work Clearance Management ► Define Work Clearance Application Types",
            "Environment, Health and Safety ► Health and Safety Management ► Risk Assessment ► Define Risk Assessment Settings",
          ],
          tables: ["WCAA", "WCAS", "AUFK", "EQUI"],
          tcodes: ["WCAA", "WCAB", "IW31", "IW32"],
          fiori: ["F2972", "F4072A"],
          configHe: [
            "Work Clearance Application Types מקושרים לסוגי-הזמנה.",
            "תלות-שחרור: ההזמנה לא משתחררת ללא Work Approval מאושר.",
            "Risk Assessment + Safety Measures חובה לעבודות-סיכון.",
          ],
          flow: [
            { he: "הזמנת-PM מסוכנת", code: "IW31", note: "דורשת היתר" },
            { he: "Work Clearance", code: "WCAA", note: "Permit + LOTO" },
            { he: "Risk Assessment", code: "EHS", note: "הערכת-סיכון" },
            { he: "שחרור מותנה", code: "IW32", note: "אחרי אישור" },
          ],
          masterDataHe: [
            "Functional Location / Equipment עם סיווג-סיכון.",
            "Work Clearance Application מקושר להזמנה ולאובייקט-הטכני.",
          ],
          mistakesHe: [
            "שחרור-הזמנה ללא Work Clearance ➔ עבודה מסוכנת ללא היתר.",
            "אי-תיעוד Risk Assessment ➔ כשל-ביקורת רגולטורי.",
          ],
          troubleshootHe: [
            "הזמנה לא משתחררת ➔ Work Approval פתוח/לא-מאושר ב-WCM.",
            "אין דרישת-היתר לעבודה מסוכנת ➔ Application Type לא מקושר לסוג-ההזמנה.",
          ],
          bestPracticeHe: [
            "התנה שחרור-הזמנות-סיכון באישור-WCM אוטומטי.",
            "תעד Risk Assessment ו-LOTO לכל עבודה מסוכנת.",
          ],
          interviewHe: [
            { qHe: "כיצד EHS/WCM מגן על עבודת-תחזוקה?", aHe: "באמצעות Work Clearance Management המנפיק היתרי-עבודה ו-LOTO; שחרור הזמנת-ה-PM מותנה באישור-הבטיחות." },
            { qHe: "מהו LOTO?", aHe: "Lockout-Tagout — נעילה-ותיוג של מקורות-אנרגיה לפני עבודה, כדי למנוע הפעלה מקרית ופציעה." },
          ],
          takeawaysHe: [
            "EHS/WCM מוסיף שכבת-בטיחות לפני שחרור-הזמנה.",
            "היתרי-עבודה, LOTO והערכות-סיכון משולבים ב-PM Order.",
            "ללא אישור-בטיחות — אין שחרור-עבודה.",
          ],
        },
        {
          id: "7.1.6",
          titleHe: "הנהלת-חשבונות פיננסית (Financial Accounting)",
          titleEn: "Financial Accounting",
          execHe:
            "כל עלות בהזמנת-תחזוקה — חומר, עבודה, שירות-חוץ — מייצרת בסופו-של-דבר רישום ב-FI. ב-S/4HANA הרישומים מאוחדים ב-Universal Journal (ACDOCA), כך שתנועות-PM נראות מיד במאזן ובדוח-רווח-והפסד.",
          beginnerHe:
            "כשמוציאים חלק מהמחסן או רושמים שעות-עבודה על הזמנת-תחזוקה, נוצר 'רישום כספי' — הכסף יוצא מסעיף אחד ונכנס לאחר. FI הוא ספר-החשבונות הראשי שרושם את כל התנועות הללו כך שאפשר לראות כמה עלתה התחזוקה.",
          consultantHe:
            "Goods Issue 261 מייצר FI document (חיוב G/L חומר, זיכוי מלאי); Confirmation מייצר Activity Allocation (CO) ו-FI מקביל; חשבונית-שירות (MIRO) רושמת התחייבות לספק. כל אלה זורמים ל-ACDOCA עם Cost Center/Order כ-Account Assignment. ה-Settlement (KO88) מעביר את העלויות מההזמנה ליעד-הסופי. אינטגרציה דרך Automatic Account Determination (OBYC) הקובעת אילו חשבונות-G/L מנוקבים.",
          purposeHe:
            "לתת תמונה כספית אמיתית ובזמן-אמת של עלויות-התחזוקה, לתמוך בדיווח-כספי ובביקורת, ולחבר את הוצאות-התחזוקה למבנה-החשבונות הארגוני.",
          processExampleHe:
            "Goods Issue של חלף → FI document: חובה 'הוצאות-חלפים' / זכות 'מלאי-חלפים'; שעות-עבודה ב-Confirmation → רישום-עלות לפי תעריף-Activity; Settlement מעביר את הסך אל Cost Center של הקו — הכל ב-ACDOCA.",
          scenarioHe:
            "בארגון עלויות-תחזוקת קו-המילוי נרשמות ב-FI לפי חשבונות-הוצאה ייעודיים; דוח-עלות-תחזוקה-חודשי לכל קו נשען על ה-ACDOCA, ומשמש את ה-controller לניתוח עלות-לבקבוק.",
          navHe: [
            "Materials Management ► Valuation and Account Assignment ► Account Determination ► Account Determination Without Wizard ► Configure Automatic Postings (OBYC)",
            "Financial Accounting ► General Ledger Accounting ► Master Data ► G/L Accounts ► Define G/L Account Master Data",
          ],
          tables: ["ACDOCA", "BSEG", "BKPF", "MSEG", "T030"],
          tcodes: ["KO88", "MIGO", "MIRO", "FB03", "FAGLL03"],
          fiori: ["F0717", "F2218"],
          configHe: [
            "Automatic Account Determination (OBYC) — קביעת חשבונות-G/L לתנועות-מלאי של תחזוקה.",
            "Valuation Class לחלפים → חשבון-הוצאה/מלאי תואם.",
            "G/L Account master עם Cost Element (ב-S/4HANA חלק מתרשים-החשבונות).",
          ],
          flow: [
            { he: "Goods Issue 261", code: "MSEG", note: "FI doc" },
            { he: "Confirmation", code: "IW41", note: "Activity+FI" },
            { he: "חשבונית-שירות", code: "MIRO", note: "ספק" },
            { he: "Universal Journal", code: "ACDOCA", note: "מאוחד" },
          ],
          masterDataHe: [
            "G/L Accounts (SKA1/SKB1) עם Cost Element.",
            "Valuation Class בחומר → קישור לחשבון-G/L דרך OBYC.",
          ],
          mistakesHe: [
            "OBYC שגוי ➔ Goods Issue נכשל או רושם לחשבון לא-נכון.",
            "G/L ללא Cost Element ➔ העלות לא זורמת ל-CO.",
          ],
          troubleshootHe: [
            "Goods Movement נכשל 'account determination' ➔ בדוק OBYC ו-Valuation Class.",
            "עלות לא נראית ב-FI ➔ בדוק רישום ACDOCA ו-Posting Period פתוח.",
          ],
          bestPracticeHe: [
            "תאם Valuation Classes ו-OBYC עם ה-FI לפני go-live.",
            "השתמש בדוחות מבוססי-ACDOCA לניתוח עלות-תחזוקה בזמן-אמת.",
          ],
          interviewHe: [
            { qHe: "כיצד עלות-תחזוקה מגיעה ל-FI?", aHe: "תנועות כמו Goods Issue 261, Confirmation וחשבונית-שירות מייצרות FI documents הזורמים ל-Universal Journal (ACDOCA), עם Account Determination דרך OBYC." },
            { qHe: "מהו ה-Universal Journal?", aHe: "ACDOCA — טבלה אחת המאחדת FI ו-CO ב-S/4HANA, המבטלת reconciliation ומאפשרת תצוגת-עלות בזמן-אמת." },
          ],
          takeawaysHe: [
            "כל עלות-תחזוקה הופכת לרישום FI ב-ACDOCA.",
            "OBYC קובע אילו חשבונות-G/L מנוקבים.",
            "ACDOCA מאחד FI+CO — תצוגה בזמן-אמת.",
          ],
        },
        {
          id: "7.1.7",
          titleHe: "הנהלת-חשבונות נכסים (Asset Accounting)",
          titleEn: "Asset Accounting",
          execHe:
            "ציוד-PM הוא לרוב גם נכס-קבוע (Fixed Asset) ב-AA. כאשר תחזוקה משביחה ציוד (Capital improvement), העלות מסולקת אל ה-Asset ולא להוצאה שוטפת — מבחנה קריטית בין הוצאה (Expense) להשקעה (Capitalization).",
          beginnerHe:
            "מכונה היא 'נכס' שיש לו ערך בספרים שיורד עם הזמן (פחת). תחזוקה רגילה היא הוצאה שוטפת, אבל שדרוג שמאריך את חיי-המכונה הוא 'השקעה' שמוסיפה לערך-הנכס. AA מנהל את ערך-הנכסים והקשר בין הציוד הטכני לרשומת-הנכס.",
          consultantHe:
            "ה-Equipment (EQUI) ב-PM יכול להיות מקושר ל-Asset (ANLA) ב-AA. תחזוקה שוטפת מסולקת ל-Cost Center (Expense); פרויקט-השבחה מנוהל לרוב כ-Maintenance Order עם Investment Order/WBS שמסולק ל-Asset under Construction ואז ל-Asset (Capitalization). ב-S/4HANA האינטגרציה דרך ACDOCA והתאמת Settlement Receiver = Asset. חשוב לקשר Equipment↔Asset לתחקור היסטוריית-עלות-נכס.",
          purposeHe:
            "להבחין נכון בין הוצאה שוטפת להשקעה הונית, לנהל פחת מדויק, ולחבר היסטוריית-תחזוקה לערך-הנכס לצורכי דיווח-כספי ומיסוי.",
          processExampleHe:
            "החלפת מנוע רגילה → הוצאה ל-Cost Center; שדרוג קו שמאריך חיי-מכונה ב-5 שנים → Investment Order → AuC → Capitalization ל-Asset, מתחיל פחת חדש.",
          scenarioHe:
            "בארגון קו-מילוי הוא Asset; תחזוקה-שוטפת = הוצאה, אך פרויקט-שדרוג-קו (מהירות-מילוי גבוהה יותר) מהוון אל ה-Asset ומגדיל את בסיס-הפחת.",
          navHe: [
            "Asset Accounting ► Master Data ► Define Asset Classes",
            "Controlling ► Internal Orders ► Settlement ► Maintain Settlement Profiles (Capital settlement to Asset)",
          ],
          tables: ["ANLA", "ANLC", "EQUI", "AUFK", "COBRB"],
          tcodes: ["AS03", "KO88", "IE03", "AW01N"],
          fiori: ["F0936", "F2972"],
          configHe: [
            "Settlement Profile המתיר Settlement Receiver = Asset.",
            "Asset Class וקישור Equipment↔Asset במאסטר.",
            "Investment Profile לפרויקטי-השבחה (AuC).",
          ],
          flow: [
            { he: "תחזוקה שוטפת", code: "KO88", note: "→ Cost Center (Expense)" },
            { he: "השבחה", code: "Investment", note: "Order/WBS" },
            { he: "AuC → Asset", code: "AW01N", note: "Capitalization" },
          ],
          masterDataHe: [
            "Asset master (ANLA) מקושר ל-Equipment (EQUI).",
            "Settlement Rule (COBRB) עם Receiver = Asset לפרויקטי-הון.",
          ],
          mistakesHe: [
            "היוון תחזוקה-שוטפת בטעות ➔ עיוות מאזן וחבות-מס.",
            "אי-קישור Equipment↔Asset ➔ אובדן היסטוריית-עלות-נכס.",
          ],
          troubleshootHe: [
            "עלות-השבחה לא הוונה ➔ Settlement Receiver אינו Asset/AuC.",
            "פחת שגוי ➔ Capitalization Date או Asset Class שגויים.",
          ],
          bestPracticeHe: [
            "הגדר קריטריון ברור Expense מול Capitalize למימוש.",
            "קשר כל Equipment קריטי ל-Asset לתחקור עלות-מחזור-חיים.",
          ],
          interviewHe: [
            { qHe: "מתי עלות-תחזוקה מהוונת לנכס?", aHe: "כשהיא השבחה המאריכה חיי-ציוד או מגדילה את ערכו; אז ההזמנה מסולקת ל-Asset (דרך AuC) ולא להוצאה שוטפת ל-Cost Center." },
            { qHe: "כיצד מקושר ציוד-PM לנכס-קבוע?", aHe: "ה-Equipment (EQUI) מקושר ל-Asset master (ANLA), כך שהיסטוריית-התחזוקה והערך-הכספי מתואמים." },
          ],
          takeawaysHe: [
            "ציוד-PM הוא לרוב גם Asset ב-AA.",
            "תחזוקה שוטפת = הוצאה; השבחה = היוון ל-Asset.",
            "Settlement Receiver קובע Expense מול Capitalize.",
          ],
        },
        {
          id: "7.1.8",
          titleHe: "בקרת-עלויות (Controlling)",
          titleEn: "Controlling",
          execHe:
            "CO הוא היעד העיקרי של עלויות-התחזוקה. הזמנת-ה-PM היא Cost Object זמני הצובר עלויות-תכנון מול עלויות-בפועל, ובסופה מסולקת (Settlement) אל מרכז-עלות, פרויקט או נכס — שם מנותחות ההפרשים והבקרה.",
          beginnerHe:
            "CO עונה על השאלה 'כמה עלתה התחזוקה ולמי לחייב'. כל הזמנה אוספת עלויות, ובסוף 'מעבירה' אותן ליעד הנכון — למשל למרכז-העלות של הקו. כך ההנהלה רואה כמה כל קו/מחלקה מוציאים על תחזוקה.",
          consultantHe:
            "הזמנת-PM נושאת Planned Cost (מתמחור ה-BOM/Routing) מול Actual Cost (Goods Issue + Confirmation + שירות). ה-Settlement Rule (COBRB) קובע יעד וכלל-חלוקה. KO88 מבצע סילוק; הפרש תכנון-בפועל מנותח ב-Cost Analysis. עלויות-עבודה זורמות דרך Activity Allocation (תעריף KP26) מ-Cost Center המבצע אל ההזמנה. ב-S/4HANA הכל ב-ACDOCA עם Margin Analysis.",
          purposeHe:
            "לאפשר תקצוב, מעקב ובקרה של עלויות-תחזוקה לכל אובייקט-טכני וקו, ולזהות חריגות מול תקציב/תכנון.",
          processExampleHe:
            "הזמנה מתוכננת ל-10,000 ₪ (חומר+עבודה); בפועל: Goods Issue 6,000 + 8 שעות×תעריף = 4,800 → סך 10,800; Settlement מעביר ל-Cost Center; הפרש 800 ₪ מנותח כחריגה.",
          scenarioHe:
            "בארגון כל קו-מילוי הוא Cost Center; עלויות-התחזוקה שלו מסולקות אליו, ודוח חודשי משווה עלות-תחזוקה-מתוכננת מול בפועל לכל קו — בסיס ל-KPI 'עלות-תחזוקה לבקבוק'.",
          navHe: [
            "Controlling ► Internal Orders ► Actual Postings ► Settlement ► Maintain Settlement Profiles (OKO7)",
            "Controlling ► Cost Center Accounting ► Actual Postings ► Activity Allocation ► Define Activity Types (KP26 rates)",
          ],
          tables: ["AUFK", "COEP", "COBRB", "ACDOCA", "COSP"],
          tcodes: ["KO88", "KP26", "S_ALR_87013611", "KOB1"],
          fiori: ["F2972", "F0961"],
          configHe: [
            "Settlement Profile (OKO7) — Receivers מותרים וברירת-מחדל.",
            "Costing Variant + Valuation Variant לתמחור הזמנה.",
            "Activity Types ותעריפים (KP26) לעלות-עבודה.",
          ],
          flow: [
            { he: "Planned Cost", code: "Costing", note: "BOM/Routing" },
            { he: "Actual Cost", code: "COEP", note: "GI+Conf" },
            { he: "Settlement", code: "KO88", note: "→ Receiver" },
            { he: "ניתוח חריגות", code: "KOB1", note: "Plan vs Actual" },
          ],
          masterDataHe: [
            "Cost Center (CSKS) — Receiver/מבצע-עבודה.",
            "Activity Type + תעריף (KP26) — בסיס עלות-העבודה.",
            "Settlement Rule (COBRB) בהזמנה.",
          ],
          mistakesHe: [
            "Settlement Rule חסר ➔ עלויות נשארות תקועות בהזמנה.",
            "תעריף-Activity לא מתוחזק (KP26) ➔ עלות-עבודה אפס/שגויה.",
          ],
          troubleshootHe: [
            "Settlement נכשל ➔ Settlement Rule/Receiver חסר או Period סגור.",
            "עלות-עבודה אפס ➔ KP26 לא מתוחזק לתקופה.",
          ],
          bestPracticeHe: [
            "ודא Settlement Rule אוטומטי לכל סוג-הזמנה.",
            "עדכן תעריפי-Activity מדי-תקופה לדיוק-עלות.",
          ],
          interviewHe: [
            { qHe: "מהו תפקיד ה-Settlement Rule?", aHe: "להגדיר את יעד-הסילוק (Cost Center/WBS/Asset/Order) וכלל-החלוקה של עלויות-ההזמנה; KO88 מבצע אותו." },
            { qHe: "כיצד נצברת עלות-עבודה בהזמנה?", aHe: "דרך Activity Allocation — שעות ה-Confirmation מוכפלות בתעריף ה-Activity Type (KP26) מה-Cost Center המבצע." },
          ],
          takeawaysHe: [
            "הזמנת-PM = Cost Object זמני (Plan מול Actual).",
            "Settlement מעביר עלויות ליעד-CO/FI/AA.",
            "תעריף KP26 קובע את עלות-העבודה.",
          ],
        },
        {
          id: "7.1.9",
          titleHe: "ניהול נדל\"ן (Real Estate Management)",
          titleEn: "Real Estate Management",
          execHe:
            "כאשר אובייקטי-התחזוקה הם מבנים, חללים או תשתיות, RE-FX (Real Estate) מספק את ההקשר הנדל\"ני. Functional Locations של מבנים יכולים להיות מקושרים לאובייקטי-נדל\"ן (Architectural/Usage objects), כך שתחזוקת-מבנים מתואמת עם ניהול-החללים והחוזים.",
          beginnerHe:
            "מפעל הוא לא רק מכונות — יש גם מבנים, מחסנים, משרדים וחללים שדורשים תחזוקה (מיזוג, חשמל, אינסטלציה). ניהול-הנדל\"ן מתאר את החללים והמבנים, וה-PM מתחזק אותם. הקשר מאפשר לדעת איזה תיקון שייך לאיזה מבנה/חלל.",
          consultantHe:
            "ב-RE-FX קיימים Architectural Objects ו-Usage Objects (Business Entity, Building, Rental Object). Functional Location של מבנה (IFLOT) ניתן לקשר אליהם, כך שעבודות-תחזוקה (תאורה, HVAC) משויכות לחלל הנכון, ועלויותיהן ניתנות להקצאה לחוזה/שוכר. אינטגרציה דרך Account Assignment של ה-Settlement ל-RE object או דרך הקצאת-עלות לפי שטח.",
          purposeHe:
            "לחבר תחזוקת-מבנים ותשתיות לניהול-החללים והחוזים, לאפשר הקצאת-עלות-תחזוקה לפי שטח/שוכר, ולתחזק היסטוריית-מבנה.",
          processExampleHe:
            "תקלת-מיזוג בקומת-משרדים: Functional Location 'מערכת-HVAC-בניין-A' מקושר ל-RE Building; הזמנת-תחזוקה נפתחת, ועלותה ניתנת להקצאה לחוזי-השכירות של אותו בניין.",
          scenarioHe:
            "בארגון מבני-המפעל (אולם-ייצור, מחסן-קירור) מנוהלים כ-RE objects; תחזוקת-מערכות-הקירור והחשמל של המבנה מקושרת ל-FL של המבנה, ועלויותיה משויכות לעלות-התקורה של האתר.",
          navHe: [
            "Flexible Real Estate Management ► Master Data ► Architectural Objects ► Define Architectural Object Types",
            "Plant Maintenance ► Technical Objects ► Functional Locations ► Link Functional Location to Real Estate Object",
          ],
          tables: ["IFLOT", "VIBDAO", "VICNCN", "AUFK"],
          tcodes: ["IL03", "REBDBU", "RECN", "IW31"],
          fiori: ["F1990", "F2972"],
          configHe: [
            "Architectural/Usage Object Types ב-RE-FX.",
            "קישור Functional Location למבנה/אובייקט-נדל\"ן.",
            "כלל הקצאת-עלות-תחזוקה לפי שטח/חוזה.",
          ],
          flow: [
            { he: "מבנה כ-RE object", code: "REBDBU" },
            { he: "FL מקושר", code: "IFLOT", note: "מערכת-מבנה" },
            { he: "הזמנת-תחזוקה", code: "IW31" },
            { he: "הקצאת-עלות", code: "RE", note: "לפי שטח/חוזה" },
          ],
          masterDataHe: [
            "Real Estate Building/Usage object (VIBDAO).",
            "Functional Location (IFLOT) של מערכות-המבנה מקושר ל-RE.",
          ],
          mistakesHe: [
            "FL של מבנה לא מקושר ל-RE ➔ עלות-תחזוקה לא ניתנת להקצאה לחוזה.",
            "ערבוב מבנים בהיררכיית-FL ➔ קושי בהקצאת-עלות מדויקת.",
          ],
          troubleshootHe: [
            "עלות-תחזוקת-מבנה לא מוקצית ➔ חסר קישור FL↔RE object.",
            "תחזוקה משויכת למבנה שגוי ➔ היררכיית-FL לא תואמת ל-RE.",
          ],
          bestPracticeHe: [
            "תאם היררכיית-FL של מבנים עם מבנה-RE-FX.",
            "קשר מערכות-מבנה (HVAC/חשמל) ל-RE לאפשר הקצאת-עלות.",
          ],
          interviewHe: [
            { qHe: "מתי PM משולב עם RE-FX?", aHe: "כשאובייקטי-התחזוקה הם מבנים/חללים; Functional Locations של מערכות-המבנה מקושרים ל-RE objects, ועלויות-התחזוקה ניתנות להקצאה לחוזה/שוכר." },
            { qHe: "מה היתרון בקישור FL↔RE?", aHe: "הקצאת עלות-תחזוקת-מבנה לפי שטח/חוזה ותחזוק היסטוריית-מבנה מדויקת." },
          ],
          takeawaysHe: [
            "RE-FX מספק הקשר נדל\"ני לתחזוקת-מבנים.",
            "FL של מערכות-מבנה מקושר ל-RE object.",
            "מאפשר הקצאת-עלות-תחזוקה לפי שטח/חוזה.",
          ],
        },
        {
          id: "7.1.10",
          titleHe: "ניהול הון אנושי (Human Capital Management)",
          titleEn: "Human Capital Management",
          execHe:
            "אנשי-התחזוקה הם משאב מרכזי. HCM מספק את נתוני-העובד, הכישורים (Qualifications) וזמן-העבודה (Time Recording). שיוך טכנאים להזמנות נשען על נתוני-HCM, ושעות-העבודה יכולות לזרום בין PM ל-Time Management.",
          beginnerHe:
            "כדי לשבץ את הטכנאי הנכון לעבודה הנכונה, צריך לדעת מי מוסמך למה (כישורים) ומתי הוא זמין. HCM מנהל את מידע-העובדים, וה-PM משתמש בו כדי לשבץ ולתעד מי עשה מה וכמה זמן.",
          consultantHe:
            "ה-Personnel Number (PERNR) מקושר למרכז-העבודה (HR assignment ב-CRHD) או ל-Work Center capacity. כישורים (Qualifications) מ-HCM משמשים לבחירת-מבצע מתאים; שעות ה-Confirmation (IW41) יכולות להיות מתועדות מול CATS (Cross-Application Time Sheet) ולזרום ל-Time Management ולעלות-עבודה ב-CO. ב-S/4HANA לרוב משולב עם SAP SuccessFactors כ-HCM הענני.",
          purposeHe:
            "לשבץ את העובד המוסמך הזמין, לתעד זמן-עבודה מדויק לצורכי-עלות ושכר, ולנהל כישורים ובטיחות-עובד.",
          processExampleHe:
            "עבודת-ריתוך דורשת הסמכת-ריתוך; המערכת בוחרת טכנאי בעל Qualification מתאים; שעותיו נרשמות ב-CATS, זורמות לעלות-העבודה בהזמנה ולחישוב-שכר ב-HCM.",
          scenarioHe:
            "בארגון צוות-התחזוקה של האתר מנוהל ב-HCM/SuccessFactors; הסמכות (חשמל-מתח-גבוה, עבודה-בגובה) קובעות שיבוץ; שעות-העבודה על קווי-המילוי מתועדות ב-CATS וזורמות לעלות-הקו.",
          navHe: [
            "Personnel Management ► Personnel Administration ► Define Personnel Number Ranges",
            "Cross-Application Time Sheet ► Time Recording ► Set Up Data Entry Profiles",
          ],
          tables: ["PA0001", "CRHD", "CATSDB", "AFVC"],
          tcodes: ["CAT2", "PA20", "IW41", "CR03"],
          fiori: ["F2972", "F1823"],
          configHe: [
            "HR assignment במרכז-העבודה (PERNR ↔ Work Center).",
            "CATS Data Entry Profile לתיעוד-שעות-תחזוקה.",
            "Qualifications Catalog לבחירת-מבצע מוסמך.",
          ],
          flow: [
            { he: "עובד + כישורים", code: "PA20", note: "HCM" },
            { he: "שיבוץ למרכז-עבודה", code: "CRHD" },
            { he: "תיעוד שעות", code: "CAT2", note: "CATS" },
            { he: "עלות-עבודה → CO", code: "IW41" },
          ],
          masterDataHe: [
            "Personnel master (PA0001) — עובד ושיוך-ארגוני.",
            "Qualifications — הסמכות לבחירת-מבצע.",
            "HR assignment ב-Work Center (CRHD).",
          ],
          mistakesHe: [
            "שיבוץ ללא בדיקת-כישורים ➔ עבודה ע\"י לא-מוסמך (סיכון-בטיחות).",
            "שעות לא מתועדות ב-CATS ➔ עלות-עבודה לא מדויקת.",
          ],
          troubleshootHe: [
            "אי-אפשר לשבץ עובד ➔ חסר HR assignment במרכז-העבודה.",
            "עלות-עבודה לא זורמת ➔ CATS Profile/transfer ל-CO לא מוגדר.",
          ],
          bestPracticeHe: [
            "נהל Qualifications לבחירת-מבצע ובטיחות.",
            "השתמש ב-CATS לתיעוד-שעות אחיד הזורם ל-CO ול-HCM.",
          ],
          interviewHe: [
            { qHe: "כיצד HCM תומך בשיבוץ-תחזוקה?", aHe: "דרך נתוני-העובד (PERNR), שיוך למרכז-העבודה (CRHD) וקטלוג-כישורים לבחירת מבצע מוסמך וזמין." },
            { qHe: "כיצד זורמות שעות-עבודה?", aHe: "Confirmation (IW41) או CATS מתעדים שעות שזורמות לעלות-העבודה ב-CO ולחישוב-שכר ב-HCM." },
          ],
          takeawaysHe: [
            "HCM מספק עובדים, כישורים וזמן-עבודה ל-PM.",
            "כישורים קובעים שיבוץ-מבצע מוסמך.",
            "CATS מחבר שעות-תחזוקה ל-CO ול-HCM.",
          ],
        },
        {
          id: "7.1.11",
          titleHe: "שירות ומכירות (Service and Sales)",
          titleEn: "Service and Sales",
          execHe:
            "כאשר תחזוקה מבוצעת עבור לקוח חיצוני (Customer Service), PM משתלב עם SD ועם Customer Service. Service Order מחייבת את הלקוח (Billing) על חלקים ועבודה, וגוזרת חוזה-שירות (Service Contract) ותמחור-מכירה.",
          beginnerHe:
            "לפעמים מתקנים ציוד עבור לקוח ולא רק עבור עצמנו — אז צריך גם לחייב את הלקוח. כאן PM נפגש עם המכירות (SD): הזמנת-השירות מתעדת מה תוקן, ובסוף מפיקה חשבונית ללקוח על חלקים ועבודה.",
          consultantHe:
            "Service Order (סוג-הזמנה SM01/Service) נושאת DIP Profile (Dynamic Item Processor) הממיר עלויות-בפועל ל-Billing Request (Debit Memo Request ב-SD) → חשבונית. Service Contracts מנהלים זכאות והתחייבויות-שירות; Resource-Related Billing (DP90/DP91) הוא הגשר. אובייקטים: VBAK/VBAP (SD doc), AUFK (Service Order), Serviceable Items. ב-S/4HANA לרוב דרך Service Management module.",
          purposeHe:
            "לאפשר תחזוקה כשירות מסחרי — תמחור, חיוב-לקוח, חוזי-שירות ו-SLA — ולחבר עלות-תחזוקה להכנסה.",
          processExampleHe:
            "תיקון ציוד-לקוח: Service Order אוסף עלות חלקים+עבודה → DP90 ממיר ל-Billing Request → חשבונית-לקוח (SD) → הכנסה; חוזה-שירות מגדיר אילו תיקונים מכוסים.",
          scenarioHe:
            "בארגון פחות שכיח (תחזוקה פנימית); רלוונטי כאשר הארגון מתחזקת מתקני-קירור אצל לקוחות-קמעונאים תחת חוזה-שירות — הזמנת-שירות מחייבת את הקמעונאי על חלקים ועבודה מעבר לכיסוי-החוזה.",
          navHe: [
            "Service ► Service Order Management ► Transactions ► Define Service Order Types",
            "Sales and Distribution ► Sales ► Sales Documents ► Resource-Related Billing ► Define DIP Profiles (ODP1)",
          ],
          tables: ["AUFK", "VBAK", "VBAP", "VBRK", "COEP"],
          tcodes: ["IW51", "IW52", "DP90", "DP91", "VF01"],
          fiori: ["F2972", "F0018"],
          configHe: [
            "Service Order Type מקושר ל-DIP Profile.",
            "DIP Profile (ODP1) — המרת עלויות-בפועל לפריטי-חיוב.",
            "Service Contract לזכאות ולכיסוי.",
          ],
          flow: [
            { he: "Service Order", code: "IW51", note: "תיקון-לקוח" },
            { he: "צבירת עלות", code: "COEP" },
            { he: "Resource-Related Billing", code: "DP90", note: "→ SD" },
            { he: "חשבונית-לקוח", code: "VF01", note: "הכנסה" },
          ],
          masterDataHe: [
            "Customer master (KNA1) ו-Serviceable Equipment.",
            "Service Contract + DIP Profile.",
          ],
          mistakesHe: [
            "Service Order ללא DIP Profile ➔ אי-אפשר לחייב את הלקוח.",
            "התעלמות מכיסוי-חוזה ➔ חיוב-יתר/חסר ללקוח.",
          ],
          troubleshootHe: [
            "Billing Request לא נוצר ➔ DIP Profile חסר/שגוי.",
            "חיוב שגוי ➔ Service Contract/זכאות לא נבדקו.",
          ],
          bestPracticeHe: [
            "הגדר DIP Profiles מדויקים להמרת-עלות-לחיוב.",
            "נהל זכאויות דרך Service Contracts למניעת מחלוקות-חיוב.",
          ],
          interviewHe: [
            { qHe: "כיצד מחייבים לקוח על תחזוקה?", aHe: "Service Order אוספת עלויות; DIP Profile (Resource-Related Billing, DP90) ממיר אותן ל-Billing Request ב-SD שהופך לחשבונית-לקוח." },
            { qHe: "מהו תפקיד ה-Service Contract?", aHe: "להגדיר זכאות, כיסוי ו-SLA — מה מכוסה במסגרת-החוזה ומה מחויב בנפרד." },
          ],
          takeawaysHe: [
            "תחזוקה-ללקוח מחברת PM ל-SD/Service.",
            "DIP Profile ממיר עלות-בפועל לחיוב.",
            "Service Contract מנהל זכאות וכיסוי.",
          ],
        },
      ],
    },
    // ============================================================ 7.2
    {
      id: "7.2",
      titleHe: "שילוב עם מערכות SAP אחרות",
      titleEn: "Integration with Other SAP Systems",
      execHe:
        "מעבר ל-S/4HANA הליבה, PM מתכתב עם מערכות-SAP נוספות המתמחות בנתוני-אב ובמערכות-עקיף: SAP NetWeaver MDM ו-SAP MDG לאיכות-ושליטה בנתוני-אב (חומרים, ספקים, אובייקטים-טכניים), ו-SAP SRM לרכש-עקיף של חלקים ושירותים. שילוב זה מבטיח שנתוני-האב של PM עקביים בכל הנוף-המערכתי ושרכש-החלפים יעיל.",
      beginnerHe:
        "מערכת אחת לא עושה הכל. ל-SAP יש מערכות-עזר: כאלה שמנהלות את 'איכות-הנתונים' (שכל החומרים והספקים יהיו נכונים ואחידים בכל מקום), וכאלה שמנהלות רכש-מתוחכם. ה-PM נשען עליהן כדי שהחלפים, הספקים והציוד יהיו נכונים ושהרכש יזרום חלק.",
      consultantHe:
        "MDM/MDG מספקים Master Data Governance — תהליכי-אישור (workflow), הפצה (distribution) ובקרת-איכות לנתוני חומרים, ספקים ואובייקטים-טכניים שמזינים את PM. SRM (היסטורית) ניהל רכש-עקיף עם קטלוגים ו-self-service procurement שהזין דרישות-רכש של חלקים. ב-S/4HANA רבות מהיכולות הוטמעו פנימה (MDG-on-S/4, Ariba כתחליף-SRM), אך הארכיטקטורה ההיסטורית עדיין נפוצה בנוף-לקוחות. אינטגרציה דרך IDoc/ALE, Web Services ו-SOA.",
      purposeHe:
        "להבטיח נתוני-אב נקיים, מאושרים ומופצים אחיד (MDM/MDG), ולייעל רכש-עקיף של חלקים ושירותים (SRM) — שני תנאים לתחזוקה אמינה.",
      processExampleHe:
        "חלף-חדש נדרש: בקשת-אב-חומר עוברת workflow-אישור ב-MDG → לאחר אישור מופצת לכל המערכות → SRM/רכש מזמין אותו דרך קטלוג → הוא זמין כרכיב בהזמנת-PM.",
      scenarioHe:
        "בארגון כל אתרי-הבקבוק חולקים נתוני-אב מנוהלים מרכזית (MDG) — אותו חלף נושא אותו מספר ותיאור בכל אתר; רכש-חלפים-עקיף נעשה דרך קטלוג מרכזי, מה שמונע כפילויות ומפחית עלות.",
      navHe: [
        "Cross-Application Components ► Processes and Tools for Enterprise Applications ► Master Data Governance ► General Settings ► Data Modeling",
        "SAP NetWeaver ► Application Server ► IDoc Interface / ALE ► Modelling and Implementing Business Processes",
      ],
      tables: ["MARA", "LFA1", "EQUI", "EDIDC"],
      tcodes: ["MDGIMG", "BD64", "WE20", "SOAMANAGER"],
      fiori: ["F1990"],
      configHe: [
        "Data Model + Workflow ב-MDG לאובייקטי-אב (חומר/ספק/ציוד).",
        "Distribution Model (BD64) ו-Partner Profiles (WE20) להפצת-IDoc.",
        "Web Service config (SOAMANAGER) לאינטגרציית-SRM/שירותים.",
      ],
      flow: [
        { he: "בקשת נתון-אב", code: "MDG", note: "Workflow" },
        { he: "אישור + הפצה", code: "BD64", note: "ALE/IDoc" },
        { he: "רכש-עקיף", code: "SRM", note: "קטלוג" },
        { he: "זמין ל-PM", code: "RESB", note: "רכיב" },
      ],
      masterDataHe: [
        "Material/Vendor/Equipment master מנוהלים ב-MDG.",
        "Distribution Model + Partner Profiles להפצה.",
      ],
      mistakesHe: [
        "נתוני-אב לא-מנוהלים ➔ כפילויות-חלפים בין אתרים.",
        "Partner Profile/IDoc שגוי ➔ נתון לא מופץ לכל המערכות.",
      ],
      troubleshootHe: [
        "חלף לא קיים באתר ➔ IDoc-הפצה נכשל (WE05/BD87).",
        "כפילות-חומר ➔ חסר תהליך-MDG/dedup.",
      ],
      bestPracticeHe: [
        "נהל אובייקטי-אב קריטיים (חלפים/ספקים) דרך MDG עם workflow.",
        "תקנן רכש-עקיף בקטלוג מרכזי.",
      ],
      interviewHe: [
        { qHe: "מדוע PM נשען על MDM/MDG?", aHe: "כדי שנתוני-האב (חומרים, ספקים, ציוד) יהיו נקיים, מאושרים ואחידים בכל המערכות — בסיס לרכש-חלפים אמין ולמניעת-כפילויות." },
        { qHe: "מה תפקיד SRM באינטגרציה?", aHe: "ניהול רכש-עקיף של חלקים ושירותים דרך קטלוגים ו-self-service, המזין דרישות-רכש לתחזוקה (כיום לרוב Ariba/embedded ב-S/4)." },
      ],
      takeawaysHe: [
        "MDM/MDG שומרים על נתוני-אב נקיים ואחידים ל-PM.",
        "SRM/Ariba מייעל רכש-עקיף של חלפים ושירותים.",
        "אינטגרציה דרך IDoc/ALE ו-Web Services.",
      ],
      relatedHe: [{ labelHe: "MM Academy · נתוני-אב ורכש", href: "/library/mm-academy/" }],
      children: [
        {
          id: "7.2.1",
          titleHe: "SAP NetWeaver Master Data Management",
          titleEn: "SAP NetWeaver Master Data Management",
          execHe:
            "SAP NetWeaver MDM היא הפלטפורמה ההיסטורית לאיחוד, ניקוי והפצה של נתוני-אב על-פני נוף-מערכתי הטרוגני. עבור PM היא הבטיחה שחומרי-חלפים, ספקים ואובייקטים-טכניים יהיו אחידים בין מערכות מרובות.",
          beginnerHe:
            "MDM הוא כמו 'מאגר-אמת אחד' לנתונים: אם לאותו מיסב יש חמישה מספרים שונים בחמש מערכות — MDM מאחד אותם לרשומה אחת נכונה ומפיץ אותה. כך כולם מדברים באותה שפה.",
          consultantHe:
            "MDM סיפק Consolidation (זיהוי-כפילויות ומיזוג), Harmonization (תקנון) ו-Central Management עם הפצה דרך PI/XI. הוא קדם ל-MDG. עבור PM, מאגר-החומרים/ספקים שלו הזין את ה-ERP בנתונים-נקיים. כיום ברוב המימושים MDM הוחלף ב-SAP MDG, אך הרעיון זהה: single source of truth לנתוני-אב.",
          purposeHe:
            "לחסל כפילויות וסתירות בנתוני-אב בין מערכות, ולספק ל-PM חלפים/ספקים אחידים ואמינים.",
          processExampleHe:
            "שלוש מערכות-ERP אזוריות מנהלות חלפים בנפרד; MDM מזהה כפילויות, ממזג למספר-אב אחד ומפיץ — מעתה אותו חלף אחיד בכל אתר.",
          scenarioHe:
            "בארגון עם מספר אתרי-בקבוק היסטוריים, MDM איחד את קטלוג-החלפים כך שמיסב זהה לא מנוהל תחת חמישה מספרים — בסיס למלאי-חלפים משותף.",
          navHe: ["SAP NetWeaver ► Master Data Management ► Configure MDM Repositories and Syndication (MDM Console — חיצוני)"],
          tables: ["MARA", "LFA1", "EDIDC"],
          tcodes: ["BD64", "WE20", "SXMB_MONI"],
          fiori: [],
          configHe: [
            "MDM Repository לאובייקטי-אב (חומר/ספק).",
            "Syndication/Import maps להפצה אל ה-ERP דרך PI.",
            "Matching/Dedup rules לזיהוי-כפילויות.",
          ],
          flow: [
            { he: "איסוף ממערכות", code: "Import", note: "MDM" },
            { he: "ניקוי + dedup", code: "Match" },
            { he: "הפצה (Syndication)", code: "PI", note: "→ ERP" },
          ],
          masterDataHe: ["Repository מרכזי לחומרים/ספקים.", "Syndication maps ל-ERP."],
          mistakesHe: ["כללי-dedup רופפים ➔ כפילויות נשארות.", "Syndication לא מתוזמן ➔ נתון מיושן ב-PM."],
          troubleshootHe: ["נתון לא מעודכן ב-ERP ➔ בדוק Syndication/PI message (SXMB_MONI)."],
          bestPracticeHe: ["הגדר כללי-matching מחמירים.", "תזמן Syndication שוטף.", "שקול מעבר ל-MDG ב-S/4."],
          interviewHe: [
            { qHe: "מה תפקיד MDM ביחס ל-PM?", aHe: "לאחד ולנקות נתוני-אב (חלפים/ספקים) ולהפיצם אחיד לכל המערכות, כך שתחזוקה נשענת על single source of truth." },
            { qHe: "מה ההבדל בין MDM ל-MDG?", aHe: "MDM היא פלטפורמה היסטורית חיצונית (consolidation/syndication); MDG משולב ב-ERP/S4 עם workflow-אישור והפצה native." },
          ],
          takeawaysHe: ["MDM = single source of truth לנתוני-אב.", "Consolidation + Syndication ל-ERP.", "ברוב המימושים הוחלף ב-MDG."],
        },
        {
          id: "7.2.2",
          titleHe: "SAP Master Data Governance",
          titleEn: "SAP Master Data Governance",
          execHe:
            "SAP MDG הוא היורש המודרני, המשולב ב-S/4HANA, לשליטה בנתוני-אב. הוא מוסיף תהליכי-אישור (governance workflow), בקרת-איכות והפצה לנתוני חומרים, ספקים ואובייקטים-טכניים — קריטי לחלפי-PM ולנתוני-ציוד.",
          beginnerHe:
            "MDG הוא 'שומר-הסף' של הנתונים: לפני שחומר/ספק חדש נכנס למערכת, הוא עובר תהליך-אישור מסודר (מי ביקש, מי אישר), נבדק שהוא נכון ומלא, ורק אז מופץ. כך לא נכנסים נתונים פגומים.",
          consultantHe:
            "MDG מבוסס על Data Model (MM/BP/Custom), Change Request workflow (BRF+ rules), Data Quality + Validation, ו-Replication (DRF) דרך IDoc/SOA. עבור PM ניתן לנהל גם Technical Objects/Equipment כ-master data תחת governance. ה-Change Request מבטיח אישור-היררכי לפני יצירה/שינוי; ה-DRF מפיץ לכל ה-clients. ב-S/4HANA MDG רץ co-deployed עם ה-ERP — אותו client.",
          purposeHe:
            "להבטיח שנתוני-האב המזינים PM (חלפים, ספקים, ציוד) נוצרים תחת אישור, נקיים ומופצים אחיד — ממשל-נתונים אמיתי.",
          processExampleHe:
            "בקשה לחלף-חדש: Change Request נפתחת → מילוי שדות → Validation אוטומטי → אישור מנהל-קטגוריה → יצירת Material master → DRF מפיץ לאתרים → זמין ל-PM.",
          scenarioHe:
            "בארגון כל חלף/ספק-תחזוקה חדש עובר Change Request ב-MDG עם אישור-רכש ואיכות; רק אז נפתח ומופץ — מונע 'מיסבי-רפאים' כפולים ומבטיח תיאור אחיד בעברית/אנגלית.",
          navHe: [
            "Cross-Application Components ► Master Data Governance ► General Settings ► Data Modeling ► Edit Data Model",
            "Cross-Application Components ► Master Data Governance ► General Settings ► Process Modeling ► Workflow",
          ],
          tables: ["MARA", "LFA1", "EQUI", "USMD110C"],
          tcodes: ["MDGIMG", "MDG_BS_MAT_OG", "DRFOUT", "NWBC"],
          fiori: ["F1990"],
          configHe: [
            "Data Model (MM/BP) ושדות-מנוהלים.",
            "Change Request types + BRF+ workflow לאישור.",
            "DRF (Data Replication Framework) להפצה.",
          ],
          flow: [
            { he: "Change Request", code: "MDG", note: "בקשה" },
            { he: "Validation + אישור", code: "BRF+", note: "Workflow" },
            { he: "יצירת-אב", code: "MARA", note: "Active area" },
            { he: "הפצה", code: "DRFOUT", note: "→ clients" },
          ],
          masterDataHe: ["Material/Business Partner/Equipment תחת governance.", "Change Request כרשומת-בקרה."],
          mistakesHe: ["workflow רופף ➔ נתונים לא-מאושרים נכנסים.", "DRF לא מוגדר ➔ נתון לא מופץ."],
          troubleshootHe: ["נתון לא הופץ ➔ בדוק DRF/Replication log (DRFOUT/SLG1).", "Change Request תקועה ➔ בדוק workflow inbox (SBWP)."],
          bestPracticeHe: ["הגדר Validation אוטומטי מחמיר.", "נהל ציוד/חלפים קריטיים תחת MDG.", "השתמש ב-co-deployment ב-S/4."],
          interviewHe: [
            { qHe: "מה MDG מוסיף מעל MDM?", aHe: "Governance workflow לאישור Change Requests, Validation, ו-DRF להפצה — משולב native ב-S/4HANA (co-deployed), לא פלטפורמה חיצונית." },
            { qHe: "כיצד MDG מועיל ל-PM?", aHe: "מבטיח שחלפים, ספקים וציוד נוצרים מאושרים ונקיים ומופצים אחיד — מונע כפילויות ונתונים-פגומים בתחזוקה." },
          ],
          takeawaysHe: ["MDG = ממשל-נתוני-אב משולב ב-S/4.", "Change Request workflow + Validation + DRF.", "מבטיח חלפים/ציוד נקיים ל-PM."],
          relatedHe: [{ labelHe: "MM Academy · נתוני-אב", href: "/library/mm-academy/" }],
        },
        {
          id: "7.2.3",
          titleHe: "SAP Supplier Relationship Management",
          titleEn: "SAP Supplier Relationship Management",
          execHe:
            "SAP SRM ניהל את רכש-העקיף ואת מחזור-חיי-הספקים: קטלוגים, self-service procurement, מכרזים וניהול-חוזים. עבור PM הוא ייעל את רכש חלקי-החילוף והשירותים שאינם-מלאי, ולעיתים הזין ישירות דרישות-רכש להזמנות-תחזוקה.",
          beginnerHe:
            "SRM הוא 'אתר-קניות ארגוני': טכנאי או מתכנן בוחר חלף/שירות מקטלוג, מאשר, וההזמנה יוצאת לספק אוטומטית. זה הופך רכש-חלפים מהיר ומסודר במקום טפסים ידניים.",
          consultantHe:
            "SRM סיפק Self-Service Procurement (Shopping Cart), Catalog Management (CCM/MDM-catalog), Sourcing, Contract Management ו-Supplier Self-Services, מקושר ל-ERP דרך מסמכי-רכש. דרישת-רכש של חלק-PM (Non-stock, Account Assignment F) יכלה לזרום ל-SRM Shopping Cart → PO. ב-S/4HANA SRM הוחלף בעיקר ב-SAP Ariba ובפונקציות-רכש מוטמעות; הארכיטקטורה ההיסטורית עדיין רלוונטית לנוף-לקוחות קיים.",
          purposeHe:
            "לייעל ולהאיץ רכש-עקיף של חלפים ושירותי-תחזוקה, לאכוף חוזים ומחירים, ולקצר זמן-אספקה לחלקים-חסרים.",
          processExampleHe:
            "חלק חסר בהזמנת-PM (Non-stock) → דרישת-רכש → SRM Shopping Cart מול קטלוג-ספק → אישור → PO אוטומטי → קבלה והקצאה להזמנה.",
          scenarioHe:
            "בארגון רכש חלפי-תחזוקה-עקיפים נעשה דרך קטלוג מרכזי (SRM/Ariba) עם מחירי-חוזה מוסכמים; כך תיקון דחוף לקו-מילוי מזמין חלף-מאושר במחיר-חוזה תוך דקות.",
          navHe: [
            "SAP Supplier Relationship Management ► SRM Server ► Cross-Application Basic Settings ► Define Backend Systems",
            "Materials Management ► Purchasing ► Purchase Requisition ► Define Document Types",
          ],
          tables: ["EBAN", "EKKO", "LFA1", "BBP_PDIGP"],
          tcodes: ["ME51N", "ME21N", "BBP_PD", "ME57"],
          fiori: ["F0842", "F1990"],
          configHe: [
            "Backend system + integration ל-ERP מ-SRM.",
            "Catalog (CCM/MDM-catalog) לחלפים-עקיפים.",
            "Document Types לדרישות-רכש מתחזוקה.",
          ],
          flow: [
            { he: "דרישת-רכש (Non-stock)", code: "EBAN", note: "Acct F" },
            { he: "Shopping Cart", code: "SRM", note: "קטלוג" },
            { he: "PO", code: "EKKO", note: "אוטומטי" },
            { he: "קבלה → הזמנה", code: "101" },
          ],
          masterDataHe: ["Vendor master (LFA1) + קטלוג-ספק.", "Contract/מחירי-חוזה לחלפים."],
          mistakesHe: ["דרישת-רכש ללא קטלוג/חוזה ➔ מחיר לא-מבוקר.", "אינטגרציית-backend שגויה ➔ PO לא נוצר."],
          troubleshootHe: ["PO לא נוצר מ-Shopping Cart ➔ בדוק backend integration.", "מחיר שגוי ➔ חוזה/קטלוג לא מעודכן."],
          bestPracticeHe: ["נהל חלפים-עקיפים בקטלוג עם מחירי-חוזה.", "שקול מעבר ל-Ariba/embedded ב-S/4."],
          interviewHe: [
            { qHe: "כיצד SRM מועיל ל-PM?", aHe: "מייעל רכש-עקיף של חלפים/שירותים דרך קטלוגים ו-self-service; דרישות-רכש של חלקי Non-stock זורמות ל-Shopping Cart ול-PO אוטומטי." },
            { qHe: "מה מחליף SRM ב-S/4HANA?", aHe: "בעיקר SAP Ariba ופונקציות-רכש מוטמעות; אך הארכיטקטורה ההיסטורית עדיין נפוצה בנוף-לקוחות קיים." },
          ],
          takeawaysHe: ["SRM = רכש-עקיף וקטלוגים לחלפי-PM.", "מאיץ רכש-חלקים-חסרים ואוכף חוזים.", "כיום לרוב Ariba/embedded."],
          relatedHe: [{ labelHe: "MM Academy · רכש ומכרזים", href: "/library/mm-academy/" }],
        },
      ],
    },
    // ============================================================ 7.3
    {
      id: "7.3",
      titleHe: "שילוב עם מערכות שאינן SAP",
      titleEn: "Integration with Non-SAP Systems",
      execHe:
        "מפעל מודרני מחובר לעולם החיצוני: מערכות-ניטור-תפעול (SCADA/DCS/IoT) מזרימות נתוני-מצב-ציוד בזמן-אמת, מערכות-מידע-תפעוליות מספקות תובנות-ביצוע, ומפרטי-שירות חיצוניים מנהלים שירותים מורכבים. PM משתלב איתן דרך ממשקים (IDoc, OData/REST, PI/PO, BTP Integration Suite) כדי להפעיל תחזוקה מבוססת-מצב (Condition-Based) ולתעד שירותים.",
      beginnerHe:
        "לא כל מה שמתחבר ל-PM הוא SAP. חיישנים על המכונות (IoT) מודדים רעידות, טמפרטורה ולחץ; מערכות-בקרה במפעל יודעות מתי משהו חורג. PM 'מקשיב' להן: כשחיישן מזהה בעיה — נפתחת הזמנת-תחזוקה אוטומטית. וכשקונים שירות חיצוני מורכב — יש דרך מסודרת לתאר ולתעד אותו.",
      consultantHe:
        "האינטגרציה החיצונית נעשית דרך שכבת-ביניים: PI/PO או SAP Integration Suite (BTP) ממירים פרוטוקולים (OPC-UA, MQTT, REST) ל-IDoc/BAPI; Notification נפתחת אוטומטית ממדידת-חיישן חורגת (Measurement Document → MeasurementReading API). SAP Asset Intelligence Network / Predictive Maintenance (PdMS/APM) מוסיפים שכבת-אנליטיקה. מפרטי-שירות (Service Specifications) מנוהלים ב-External Services Management (MM-SRV) עם Service Entry Sheets. אובייקטים: Measurement Point (IMPTT), Measurement Document (IMRG), Service Entry Sheet (ESSR).",
      purposeHe:
        "להפוך תחזוקה מ-reactive ל-proactive/predictive על-בסיס נתוני-חיישנים אמיתיים, ולנהל שירותים-מורכבים מבחוץ עם תיעוד ובקרת-עלות מלאים.",
      processExampleHe:
        "חיישן-רעידות על מנוע שולח קריאה דרך IoT→BTP→SAP; חריגה מהסף יוצרת Measurement Document → Notification אוטומטית → הזמנת-תחזוקה לפני כשל; שירות-חיצוני מורכב (כיול-מעבדה) מנוהל כ-Service Specification עם Service Entry Sheet לתיעוד-ביצוע.",
      scenarioHe:
        "בארגון חיישני-IoT על קומפרסורי-ה-CO2 ומשאבות מזרימים נתוני-רעידות/טמפרטורה דרך BTP; חריגה פותחת הזמנת-תחזוקה מונעת-כשל; כיול-מעבדה חיצוני ל-Brix נרכש כ-Service Specification עם SES לאישור-ביצוע ותשלום.",
      navHe: [
        "Plant Maintenance ► Maintenance Plans, Work Centers, Task Lists ► Measuring Points and Counters ► Define Measuring Point Categories",
        "Materials Management ► External Services Management ► Source Determination and Default Values ► Define Service Specifications Settings",
      ],
      tables: ["IMPTT", "IMRG", "ESSR", "EDIDC"],
      tcodes: ["IK01", "IK11", "ML81N", "SOAMANAGER", "WE20"],
      fiori: ["F2972", "F1643"],
      configHe: [
        "Measuring Point Categories + סף-חריגה ל-auto-Notification.",
        "Integration via PI/PO / BTP Integration Suite (OPC-UA/MQTT→IDoc/OData).",
        "External Services Management + Service Entry Sheet לשירותים-חיצוניים.",
      ],
      flow: [
        { he: "חיישן/IoT", code: "OPC-UA", note: "→ BTP" },
        { he: "Measurement Document", code: "IMRG", note: "קריאה" },
        { he: "חריגה → Notification", code: "IW21", note: "auto" },
        { he: "הזמנת-תחזוקה", code: "IW31", note: "predictive" },
      ],
      masterDataHe: [
        "Measuring Point (IMPTT) על Equipment/FL.",
        "Service Master + Service Specification לשירותי-חוץ.",
      ],
      mistakesHe: [
        "סף-מדידה לא מוגדר ➔ אין auto-Notification מחריגה.",
        "ממשק לא מנוטר ➔ קריאות-חיישן נופלות בשקט.",
      ],
      troubleshootHe: [
        "Notification לא נפתחת מחיישן ➔ בדוק Measuring Point/סף ו-ממשק (SXMB_MONI).",
        "Service Entry Sheet לא מאושר ➔ workflow/Account Assignment.",
      ],
      bestPracticeHe: [
        "השתמש בשכבת-אינטגרציה (BTP/PI) ולא בחיבורים point-to-point.",
        "נטר ממשקים והגדר alerting לכשלי-הודעה.",
      ],
      interviewHe: [
        { qHe: "כיצד IoT/SCADA משולב ב-PM?", aHe: "דרך שכבת-אינטגרציה (PI/PO או BTP) הממירה פרוטוקולים ל-IDoc/OData; קריאת-חיישן יוצרת Measurement Document, וחריגה מהסף פותחת Notification אוטומטית לתחזוקה מונעת-כשל." },
        { qHe: "כיצד מנוהל שירות-חיצוני מורכב?", aHe: "כ-Service Specification ב-External Services Management עם Service Entry Sheet (ML81N) לתיעוד-ביצוע ובקרת-תשלום." },
      ],
      takeawaysHe: [
        "מערכות-לא-SAP מחוברות דרך PI/PO ו-BTP Integration Suite.",
        "IoT/חיישנים → Measurement Document → Notification אוטומטית.",
        "שירותים-חיצוניים דרך Service Specifications ו-SES.",
      ],
      children: [
        {
          id: "7.3.1",
          titleHe: "מערכות ניטור-תפעול",
          titleEn: "Operations Monitoring Systems",
          execHe:
            "מערכות-ניטור-תפעול (SCADA, DCS, PLC, IoT platforms) מנטרות את מצב-הציוד בזמן-אמת. שילובן ב-PM מאפשר תחזוקה מבוססת-מצב (Condition-Based) ותחזוקה-חזויה (Predictive): נתוני-חיישן הופכים אוטומטית להזמנות-תחזוקה לפני שמתרחש כשל.",
          beginnerHe:
            "מערכת-ניטור היא ה'מוניטור-הלב' של המכונה: חיישנים שמודדים רעידה, חום, לחץ וזרם כל הזמן. כשמשהו חורג מהנורמלי, במקום לחכות שהמכונה תתקלקל — המערכת מודיעה ל-PM שתפתח טיפול מראש.",
          consultantHe:
            "החיבור עובר OPC-UA/MQTT/REST דרך SAP Integration Suite או SAP PdMS/APM. קריאות-חיישן נכתבות כ-Measurement Document (IMRG) על Measuring Point (IMPTT) של ה-Equipment. כאשר הקריאה חוצה סף מוגדר, מופעלת auto-Notification (דרך BAPI_ALM_NOTIF_CREATE / Measurement Reading API) שיכולה להפוך אוטומטית ל-Maintenance Order. אנליטיקה חזויה (ML) ב-APM מזהה מגמות לפני חציית-סף.",
          purposeHe:
            "לעבור מתחזוקת-שבר/מתוזמנת לתחזוקה מבוססת-מצב — לתקן רק כשצריך ולפני כשל — ולהאריך חיי-ציוד ולצמצם השבתה.",
          processExampleHe:
            "מד-רעידות שולח קריאה כל דקה; ערך עולה מ-2 ל-7 mm/s ועובר סף; Measurement Document נכתב, Notification אוטומטית נפתחת, ומתוזמנת הזמנת-תחזוקה לבדיקת-מיסב — לפני כשל-קטסטרופלי.",
          scenarioHe:
            "בארגון קומפרסור-CO2 מנוטר ב-SCADA; עליית-טמפרטורה חורגת מפעילה Measurement Document ו-Notification אוטומטית; התחזוקה מחליפה מסנן לפני קריסת-הקומפרסור ועצירת-מילוי.",
          navHe: [
            "Plant Maintenance ► Maintenance Plans, Work Centers, Task Lists ► Measuring Points and Counters ► Define Measuring Point Categories",
            "Plant Maintenance ► Maintenance Notifications ► Notification Creation ► Set Up Automatic Notification from Measurement",
          ],
          tables: ["IMPTT", "IMRG", "EQUI", "QMEL"],
          tcodes: ["IK01", "IK11", "IK17", "IW21"],
          fiori: ["F2972", "F1643"],
          configHe: [
            "Measuring Point Category + Code/סף-חריגה.",
            "auto-Notification מ-Measurement (Measurement Reading API).",
            "אינטגרציה OPC-UA/MQTT דרך BTP/PI.",
          ],
          flow: [
            { he: "חיישן/SCADA", code: "OPC-UA" },
            { he: "Measurement Doc", code: "IMRG", note: "קריאה" },
            { he: "חציית-סף", code: "IMPTT", note: "valuation code" },
            { he: "Notification אוטומטית", code: "QMEL" },
          ],
          masterDataHe: ["Measuring Point (IMPTT) על Equipment.", "סף/Code group לחריגה."],
          mistakesHe: ["סף-חריגה לא מוגדר ➔ אין auto-Notification.", "תדירות-דגימה גבוהה מדי ➔ הצפת-נתונים."],
          troubleshootHe: ["אין Notification מחיישן ➔ בדוק Measuring Point, סף וממשק (SXMB_MONI).", "קריאות חסרות ➔ ממשק IoT נפל."],
          bestPracticeHe: ["הגדר ספים מבוססי-נתונים היסטוריים.", "השתמש ב-APM/ML לזיהוי-מגמות חזוי."],
          interviewHe: [
            { qHe: "מהי תחזוקה מבוססת-מצב?", aHe: "תחזוקה המופעלת מנתוני-חיישן בזמן-אמת (רעידה/חום/לחץ) — Measurement Document חוצה-סף פותח Notification אוטומטית, במקום לוח-זמנים קבוע." },
            { qHe: "כיצד נכתבת קריאת-חיישן ב-SAP?", aHe: "כ-Measurement Document (IMRG) על Measuring Point (IMPTT) של ה-Equipment, דרך Measurement Reading API/IDoc." },
          ],
          takeawaysHe: ["מערכות-ניטור מזרימות מצב-ציוד בזמן-אמת.", "Measurement Document חוצה-סף → Notification אוטומטית.", "מאפשר תחזוקה מבוססת-מצב וחזויה."],
        },
        {
          id: "7.3.2",
          titleHe: "מערכות מידע תפעוליות",
          titleEn: "Operations Information Systems",
          execHe:
            "מערכות-מידע-תפעוליות (MES, Historians, BI/Analytics, SAP Analytics Cloud) צוברות ומנתחות נתוני-ביצוע — זמינות-ציוד, MTBF/MTTR, OEE. שילובן עם PM הופך נתוני-תחזוקה גולמיים לתובנות-ניהול ול-KPIs להחלטות-תחזוקה.",
          beginnerHe:
            "אחרי שאוספים המון נתוני-תחזוקה, צריך גם להבין מהם: כמה זמן מכונה הייתה מושבתת, כמה זמן בין-כשלים, מה ה-KPI. מערכות-המידע לוקחות את הנתונים הגולמיים והופכות אותם לדוחות וגרפים שעוזרים להחליט מה לתחזק, מתי, ולמה.",
          consultantHe:
            "PM מזין נתוני-מסדר (Notifications, Orders, Measurement Documents, Confirmations) ל-Data Warehouse / SAP BW/4HANA או SAP Analytics Cloud דרך OData/CDS Views. מדדים: MTBF, MTTR, Availability, Maintenance Cost, OEE (משולב עם MES). PM Information System (PMIS, LIS) מספק dashboards מובנים (MCI*-reports). ב-S/4HANA Embedded Analytics ו-Fiori Overview Pages מציגים את ה-KPIs ישירות מה-CDS.",
          purposeHe:
            "להפוך נתוני-תחזוקה לתובנות-ניהול ול-KPIs (אמינות, זמינות, עלות), לתמוך בקבלת-החלטות מבוססת-נתונים ולשיפור-מתמיד.",
          processExampleHe:
            "כל Notification/Order מזין את ה-PMIS; דוח-MTBF חודשי לכל Equipment מזהה שמסוע-X נכשל תכופות → החלטה לשדרגו או להגביר תחזוקה-מונעת.",
          scenarioHe:
            "בארגון לוח-בקרה ב-SAP Analytics Cloud מציג זמינות-קווים, OEE ועלות-תחזוקה-לבקבוק; מנהל-האתר מזהה את הקו הבעייתי ביותר ומפנה אליו משאבי-תחזוקה.",
          navHe: [
            "Logistics – General ► Logistics Information System (LIS) ► Logistics Data Warehouse ► Updating ► Define Updating (Plant Maintenance)",
            "Plant Maintenance ► Information System (PMIS) ► Standard Analyses Settings",
          ],
          tables: ["S061", "S065", "S070", "QMEL", "AUFK"],
          tcodes: ["MCI1", "MCI3", "MCI7", "MCJB"],
          fiori: ["F2972", "F3211"],
          configHe: [
            "LIS/PMIS Info Structures (S061/S065/S070) ו-Updating rules.",
            "CDS Views / OData לחשיפת-נתונים ל-SAC/BW.",
            "Embedded Analytics / Overview Pages ל-KPIs.",
          ],
          flow: [
            { he: "נתוני-PM", code: "QMEL/AUFK", note: "Notif/Order" },
            { he: "Info Structures", code: "S061", note: "PMIS/LIS" },
            { he: "Analytics", code: "SAC/BW", note: "CDS/OData" },
            { he: "KPIs/Dashboards", code: "MTBF/OEE" },
          ],
          masterDataHe: ["Info Structures (LIS) לעדכון-נתוני-PM.", "CDS Views ל-Embedded Analytics."],
          mistakesHe: ["Updating לא פעיל ➔ Info Structures ריקות.", "KPIs ללא הגדרה אחידה ➔ השוואות מטעות."],
          troubleshootHe: ["דוח-PMIS ריק ➔ בדוק Updating rules (MCJB) ו-statistics setup.", "KPI שגוי ➔ הגדרת-נוסחה לא אחידה."],
          bestPracticeHe: ["הגדר KPIs אחידים (MTBF/MTTR/OEE) לכל האתרים.", "העדף Embedded Analytics/CDS על דוחות-batch ב-S/4."],
          interviewHe: [
            { qHe: "אילו KPIs מספקות מערכות-מידע-תפעוליות?", aHe: "MTBF (זמן בין-כשלים), MTTR (זמן-תיקון), Availability, עלות-תחזוקה ו-OEE — תוך שילוב נתוני-PM עם נתוני-ייצור." },
            { qHe: "כיצד נתוני-PM מגיעים ל-Analytics?", aHe: "דרך LIS/PMIS Info Structures או CDS Views/OData אל BW/4HANA או SAP Analytics Cloud ו-Embedded Analytics." },
          ],
          takeawaysHe: ["מערכות-מידע הופכות נתוני-PM ל-KPIs.", "MTBF/MTTR/Availability/OEE מנחים החלטות.", "ב-S/4 דרך CDS ו-Embedded Analytics."],
        },
        {
          id: "7.3.3",
          titleHe: "מפרטי-שירות ורישום שירותים שבוצעו",
          titleEn: "Service Specifications and Entry of Services Performed",
          execHe:
            "כאשר תחזוקה דורשת שירותי-חוץ מורכבים (קבלני-משנה, כיול-מעבדה, ניקוי-תעשייתי), External Services Management מנהל אותם דרך Service Specifications (מה הוזמן) ו-Service Entry Sheets (מה בוצע בפועל) — בקרה מלאה על שירות ותשלום.",
          beginnerHe:
            "לפעמים לא מתקנים בעצמנו אלא מזמינים קבלן. צריך לתאר מראש מה הזמנו ('מפרט-שירות') ובסוף לאשר מה הוא באמת עשה ('דף-רישום-שירות') לפני שמשלמים. כך לא משלמים על מה שלא בוצע.",
          consultantHe:
            "Service Specification מוגדר בדרישת/הזמנת-רכש (Item Category D — Service) עם שורות-שירות (Service Master AC03) וכמויות-מתוכננות. הביצוע נרשם ב-Service Entry Sheet (ESSR, ML81N), המאשר את הכמות-בפועל ומפעיל קבלת-שירות (תנועת 101 ערכית) והתחייבות-תשלום. ניתן לקשר את ה-PO-שירות ישירות להזמנת-PM (Account Assignment F). מודל-ההיררכיה: Outline → Service Lines → Entry. ב-S/4HANA קיים Lean Services / SES חדש.",
          purposeHe:
            "לתכנן, להזמין, לאשר ולשלם שירותי-תחזוקה-חיצוניים מורכבים בצורה מבוקרת, עם תיעוד-ביצוע ומניעת-תשלום-יתר.",
          processExampleHe:
            "כיול-מעבדה חיצוני: דרישת-רכש עם Service Specification (שורות: כיול, נסיעה, דוח) → PO → הקבלן מבצע → Service Entry Sheet רושם כמות-בפועל → אישור → התחייבות-תשלום → חשבונית.",
          scenarioHe:
            "בארגון ניקוי-תעשייתי של מיכלי-תרכיז וכיול-מעבדה חיצוני מנוהלים כ-Service Specifications; ה-Service Entry Sheet מאשר שעות/יחידות-בפועל מול המתוכנן לפני תשלום לקבלן.",
          navHe: [
            "Materials Management ► External Services Management ► Service Specifications ► Define Service Specifications Settings",
            "Materials Management ► External Services Management ► Service Entry Sheet ► Define Screen Layout",
          ],
          tables: ["ESLL", "ESSR", "ASMD", "EKPO", "EBAN"],
          tcodes: ["AC03", "ME21N", "ML81N", "ME2S"],
          fiori: ["F1643", "F2972"],
          configHe: [
            "Service Master (AC03) לשורות-שירות.",
            "Service Specification בדרישה/הזמנת-רכש (Item Category D).",
            "Service Entry Sheet layout ו-approval workflow.",
          ],
          flow: [
            { he: "מפרט-שירות", code: "ESLL", note: "Item Cat D" },
            { he: "PO-שירות", code: "EKPO", note: "Acct F→Order" },
            { he: "ביצוע → SES", code: "ML81N", note: "ESSR" },
            { he: "אישור → תשלום", code: "MIRO" },
          ],
          masterDataHe: ["Service Master (ASMD/AC03).", "Service Specification ו-Service Entry Sheet."],
          mistakesHe: ["אישור-SES ללא בדיקת-ביצוע ➔ תשלום-יתר.", "PO-שירות ללא הקצאה להזמנת-PM ➔ עלות לא נצמדת."],
          troubleshootHe: ["SES לא ניתן לאישור ➔ workflow/Account Assignment חסר.", "עלות-שירות לא בהזמנה ➔ PO לא מקושר (Acct F)."],
          bestPracticeHe: ["נהל שירותים-חוזרים ב-Service Master.", "אכוף Service Entry Sheet לפני תשלום.", "קשר PO-שירות להזמנת-PM."],
          interviewHe: [
            { qHe: "מה ההבדל בין Service Specification ל-Service Entry Sheet?", aHe: "Specification = מה הוזמן/מתוכנן (שורות-שירות וכמויות) בהזמנת-הרכש; Entry Sheet (ESSR) = מה בוצע בפועל, מאשר כמות-בפועל ומפעיל התחייבות-תשלום." },
            { qHe: "כיצד עלות-שירות-חיצוני נצמדת להזמנת-PM?", aHe: "ה-PO-שירות נושא Account Assignment F (Order), כך שעלות ה-SES מסולקת ישירות אל הזמנת-התחזוקה." },
          ],
          takeawaysHe: ["שירותי-חוץ מנוהלים ב-External Services Management.", "Specification = מתוכנן; Entry Sheet = בפועל.", "PO-שירות מקושר להזמנת-PM (Acct F)."],
          relatedHe: [{ labelHe: "MM Academy · רכש-שירותים", href: "/library/mm-academy/" }],
        },
      ],
    },
    // ============================================================ 7.4
    {
      id: "7.4",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "פרק זה הציג את PM כצומת-אינטגרציה בלב ה-ERP. בתוך S/4HANA הוא מתחבר ל-MM (חלפים), PP/PP-PI (קיבולת), QM (כיול), EHS (בטיחות), FI/AA/CO (עלויות), RE (מבנים), HCM (כוח-אדם) ו-Service/SD (תחזוקה-מסחרית). מעבר לכך הוא נשען על MDM/MDG (נתוני-אב נקיים) ועל SRM/Ariba (רכש-עקיף), ומתחבר למערכות-לא-SAP — IoT/SCADA, מערכות-מידע ושירותי-חוץ — דרך BTP/PI. הזמנת-התחזוקה היא המסמך-המאחד, וה-Settlement וה-Item Category הם המתגים הקריטיים לזרימת-נתונים.",
      beginnerHe:
        "הסיכום במשפט אחד: הזמנת-התחזוקה לא חיה לבד — היא מתכתבת עם המחסן, הייצור, האיכות, הבטיחות, הכספים, כוח-האדם, ואפילו עם חיישנים וקבלנים מבחוץ. מי שמבין את נקודות-המגע הללו מבין איך תחזוקה אמיתית עובדת ב-SAP מקצה-לקצה.",
      consultantHe:
        "מבחינת-מימוש, שלוש ההחלטות הקריטיות חוזרות בכל אינטגרציה: Settlement Profile/Rule (לאן זורמות העלויות → CO/FI/AA), Item Category של רכיבים (L מלאי מול N רכש → MM), ושכבת-האינטגרציה החיצונית (BTP/PI ולא point-to-point). נתוני-אב נקיים (MDG) הם תנאי-סף שקט לכל השאר. ב-S/4HANA ה-Universal Journal (ACDOCA) וה-Embedded Analytics מפשטים את שילוב-הכספים וה-KPIs, ו-PdMS/APM מובילים מ-reactive ל-predictive.",
      purposeHe:
        "לקבע את התובנה שמימוש-PM מוצלח אינו טכני-מקומי אלא תלוי-אינטגרציה: כל החלטה ב-PM מהדהדת ב-MM, PP, QM, FI ו-CO. הבנת-הצומת היא המפתח למימוש שמשתלב בליבת-המפעל.",
      processExampleHe:
        "מקצה-לקצה: Notification מחיישן (IoT) → Maintenance Order → חלפים מ-MM → קיבולת מתואמת PP → כיול QM → אישור-בטיחות EHS → Confirmation עם שעות-HCM → Settlement ל-CO/FI/AA → KPI ב-Analytics. כל החוליות בפרק נפגשות במחזור-חיים אחד.",
      scenarioHe:
        "בארגון המחזור המלא: חיישן-IoT על קומפרסור-CO2 פותח הזמנה → מיסב מהמחסן (MM) → חלון מתואם עם תכנית-המילוי (PP-PI) → כיול מד-מומנט (QM) → היתר-עבודה (EHS) → שעות-טכנאי (HCM) → סילוק ל-Cost Center של הקו (CO) ול-Asset (AA) → עלות-תחזוקה-לבקבוק ב-SAC.",
      navHe: [
        "Plant Maintenance ► Maintenance and Service Processing ► Maintenance and Service Orders ► (כל ה-Order Type / Settlement / Component settings שנסקרו בפרק)",
      ],
      tables: ["AUFK", "RESB", "QALS", "COBRB", "ACDOCA", "IMRG", "ESSR"],
      tcodes: ["IW31", "KO88", "MIGO", "ML81N", "IK11"],
      fiori: ["F2972", "F0717", "F1643"],
      configHe: [
        "Settlement Profile/Rule — שער-העלויות אל CO/FI/AA.",
        "Item Category (L/N) — שער-החלפים אל MM (מלאי/רכש).",
        "שכבת-אינטגרציה (BTP/PI) + MDG — שער הנתונים החיצוניים והאב.",
      ],
      flow: [
        { he: "טריגר (IoT/תקלה)", code: "Notification" },
        { he: "Maintenance Order", code: "IW31", note: "צומת" },
        { he: "MM/PP/QM/EHS/HCM", code: "—", note: "אינטגרציה" },
        { he: "Settlement → CO/FI/AA", code: "KO88" },
        { he: "Analytics/KPI", code: "SAC", note: "סגירת-מעגל" },
      ],
      mistakesHe: [
        "התייחסות ל-PM כמודול-מבודד ➔ עלויות לא-מסולקות, חלפים-חסרים, התנגשויות-קיבולת.",
        "הזנחת נתוני-אב ➔ כל האינטגרציות סובלות מנתונים-פגומים.",
        "חיבורים point-to-point למערכות-חוץ ➔ נוף-ממשקים שביר.",
      ],
      troubleshootHe: [
        "בעיית-אינטגרציה ➔ אבחן לפי המתג: Settlement (CO), Item Category (MM), ממשק (BTP/PI).",
        "נתון-פגום חוזר ➔ עלה ל-MDG/governance, לא תיקון-נקודתי.",
      ],
      bestPracticeHe: [
        "תכנן את שלושת המתגים (Settlement, Item Category, Integration layer) מוקדם במימוש.",
        "נהל נתוני-אב קריטיים תחת MDG.",
        "נצל ACDOCA ו-Embedded Analytics ל-KPIs בזמן-אמת, ושאף ל-predictive (APM).",
      ],
      interviewHe: [
        { qHe: "מהן שלוש החלטות-האינטגרציה הקריטיות ב-PM?", aHe: "Settlement Profile/Rule (עלויות→CO/FI/AA), Item Category של רכיבים (L/N→MM), ושכבת-האינטגרציה החיצונית (BTP/PI). נתוני-אב נקיים (MDG) הם תנאי-סף לכולן." },
        { qHe: "מדוע אומרים ש-PM הוא צומת-אינטגרציה?", aHe: "כי הזמנת-התחזוקה נוגעת כמעט בכל מודול — MM, PP, QM, EHS, FI, AA, CO, HCM, SD — ומחברת אותם סביב מחזור-חיי-תחזוקה אחד." },
        { qHe: "כיצד S/4HANA משפר את אינטגרציית-PM?", aHe: "Universal Journal (ACDOCA) מאחד FI+CO, Embedded Analytics נותן KPIs בזמן-אמת, ו-PdMS/APM מובילים מתחזוקה reactive ל-predictive מבוססת-IoT." },
      ],
      takeawaysHe: [
        "PM הוא צומת-אינטגרציה — לא מודול-מבודד.",
        "שלושת המתגים: Settlement, Item Category, שכבת-אינטגרציה.",
        "נתוני-אב נקיים (MDG) הם תנאי-סף לכל האינטגרציות.",
        "S/4HANA: ACDOCA + Embedded Analytics + APM = אינטגרציה בזמן-אמת ו-predictive.",
      ],
      relatedHe: [
        { labelHe: "MM Academy", href: "/library/mm-academy/" },
        { labelHe: "QM Academy", href: "/library/qm-academy/" },
      ],
    },
  ],
};
