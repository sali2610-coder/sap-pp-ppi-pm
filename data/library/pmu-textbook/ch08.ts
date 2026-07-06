// ===== PM Business User Guide — Chapter 8 (full 18-facet learning chapter) =====
// Plant Maintenance Controlling. Every node is a complete LearningNode with 18
// facets of authored Hebrew (beginner + consultant friendly). Hierarchy + ids
// preserved exactly; הארגון = Example Product bottling maintenance cost controlling/budgeting.
import type { TextbookChapter } from "./types";

export const CH8: TextbookChapter = {
  n: 8,
  titleHe: "בקרת תחזוקת מפעל (Controlling)",
  titleEn: "Plant Maintenance Controlling",
  introHe:
    "פרק זה הוא יחידת-לימוד מלאה לבקרת-עלויות ולתקצוב בתחזוקת-מפעל (PM Controlling). תחזוקה אינה רק 'לתקן מכונות' — היא צרכנית-תקציב גדולה שיש לתכנן, למדוד ולבקר. הפרק מסביר תחילה מהי בקרת-תחזוקה ומדוע היא קריטית, ואז סוקר את שתי משפחות-הכלים: כלים להפקת-מידע (SAP List Viewer ALV, QuickViewer, LIS, BW/4HANA, SAP Lumira) וכלים לתקצוב (Order budgeting, Cost-center budgeting, Investment Management, WBS, ותקצוב-עלות-תחזוקה). כל תת-פרק ותת-סעיף הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת הארגון, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. כל אובייקטי-SAP נשמרים באנגלית verbatim. המטרה: לשלוט בבקרת-התחזוקה ובתקצובה ללא הספר המקורי.",
  subchapters: [
    // ============================================================ 8.1
    {
      id: "8.1",
      titleHe: "מהי בקרת תחזוקת מפעל",
      titleEn: "What Plant Maintenance Controlling Involves",
      execHe:
        "בקרת-תחזוקה היא המשמעת הניהולית של תכנון, מדידה והשוואה של עלויות-התחזוקה מול תקציב ומול תוצרת. כל פעולת-תחזוקה ב-SAP — מהודעה (Notification), דרך פקודת-תחזוקה (Maintenance Order) ועד אישור (Confirmation) — מייצרת עלות. בקרת-התחזוקה דואגת שהעלויות נאספות לאובייקט-הנכון, נמדדות מול תכנון, ומנותחות לקבלת-החלטות: לתקן או להחליף, להעסיק קבלן או צוות-פנים, להאריך מרווחי-תחזוקה-מונעת או לקצרם.",
      beginnerHe:
        "תחשוב על תחזוקה כמו על תקציב-משק-בית לרכב: דלק, ביטוח, תיקונים. בלי מעקב לא תדע אם אתה מוציא יותר מדי. ב-SAP, ה-Maintenance Order הוא ה'מעטפה' שאוספת את כל ההוצאות של עבודה אחת — שעות-עבודה, חלקי-חילוף וקבלנים. בקרת-תחזוקה היא פשוט להסתכל בכל המעטפות האלה, לסכם, ולהשוות לכמה תכננו להוציא.",
      consultantHe:
        "ב-SAP ה-Maintenance Order הוא Cost Object (אובייקט-עלות) פנימי מסוג PM/CS. עלויות נאספות עליו דרך Confirmations (שעות → Activity Types), Goods Issues (חלקים → טבלת RESB/MSEG), ושירותים חיצוניים (PReq → PO → חשבונית). בסיום, ה-Order עובר Settlement (KO88/CO88) ל-Receiver — לרוב Cost Center של הנכס, פעמים Asset או WBS. ההשוואה Plan/Actual נעשית ברמת ה-Order (Value Categories, טבלת COVP/COEP) וברמת ה-Cost Center. ב-S/4HANA ה-Universal Journal (ACDOCA) מאחד את הנתונים, ומאפשר דיווח-בזמן-אמת בלי טבלות-סיכום נפרדות. הבנת זרימת-העלות מ-Order ל-Settlement היא הליבה של כל בקרת-תחזוקה.",
      purposeHe:
        "המטרה העסקית: לשלוט בעלות-המחזור-של-נכס (Total Cost of Ownership), לאזן בין תחזוקה-מונעת (PM) למתקנת (Breakdown), ולספק להנהלה תמונת-אמת על היכן הכסף נשרף. בלי בקרה, תחזוקה הופכת ל'בור-תקציבי' ללא נראות, וההחלטה 'לתקן מול להחליף' מתקבלת בעיוורון.",
      processExampleHe:
        "תקלה במשאבה ➔ נפתחת Notification (M2) ➔ ממנה Maintenance Order (IW31). מתכננים שעות-עבודה (Operations), חלקים (Components) וקבלן (External). שחרור ה-Order יוצר עלות-מתוכננת (Planned). הביצוע: Confirmation (IW41) מזין עלות-עבודה בפועל, Goods Issue (MIGO/261) מזין עלות-חלקים, קבלת-שירות מזינה עלות-קבלן. בסגירה (TECO) משווים Plan מול Actual, מבצעים Settlement ל-Cost Center של הנכס, ומנתחים סטיות.",
      scenarioHe:
        "בארגון (מפעל-מילוי מוצר לדוגמה): קו-מילוי PET עוצר בגלל תקלת-מנוע. ה-Maintenance Order אוסף 6 שעות-טכנאי, מנוע חלופי מהמלאי, וקריאת-קבלן-חשמל. בסוף-החודש בקרת-התחזוקה מסכמת את כל ה-Orders של קו-המילוי, מסלקת ל-Cost Center 'Line-PET-01', ומשווה לתקציב-התחזוקה-החודשי. סטייה חיובית מתמשכת מפעילה שיחה: לחדש את הקו או להמשיך לתחזק.",
      navHe: [
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Costing Data for Maintenance and Service Orders ► Assign Costing Parameters and Results Analysis Keys",
        "Controlling ► Internal Orders ► Actual Postings ► Settlement ► Maintain Settlement Profiles",
        "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Basic Settings ► Define Default Values for Value Categories",
      ],
      tables: ["AUFK", "COEP", "COVP", "ACDOCA", "RESB", "JEST"],
      tcodes: ["IW31", "IW41", "KO88", "S_ALR_87013533", "IW38", "KOB1"],
      fiori: ["F2929", "F0967", "F0811"],
      configHe: [
        "Order Type (PM): קובע Number Range, Settlement Profile, Costing Variants (Plan/Actual) — דרך OIOA / Costing data.",
        "Settlement Profile: מגדיר Receiver מותר (Cost Center/Asset/WBS), Allocation Structure ו-Default Object Type.",
        "Value Categories: ממפות Cost Elements לקטגוריות-דיווח (Labor/Material/External) להשוואת Plan/Actual.",
        "Results Analysis Key: רלוונטי ל-orders ארוכי-טווח / מסירת-שירות עם הכרת-הכנסה.",
      ],
      flow: [
        { he: "תקלה ➔ Notification", code: "IW21", note: "מקור-העלות" },
        { he: "פקודת-תחזוקה", code: "IW31", note: "Cost Object" },
        { he: "תכנון עלויות", code: "Plan", note: "Operations+Components" },
        { he: "ביצוע ➔ עלות בפועל", code: "IW41/MIGO", note: "Actual" },
        { he: "השוואת Plan/Actual", code: "KOB1", note: "סטיות" },
        { he: "Settlement ל-Receiver", code: "KO88", note: "Cost Center/Asset" },
      ],
      masterDataHe: [
        "AUFK = כותרת-ה-Order (סוג, מפעל, אובייקט-אחראי, Settlement rule).",
        "COEP/COVP = שורות-עלות בפועל/מתוכננות לפי Cost Element; ב-S/4HANA גם ACDOCA.",
        "Functional Location / Equipment = נושאים את ה-Cost Center ברירת-המחדל לסילוק.",
      ],
      mistakesHe: [
        "אי-הגדרת Settlement Rule ➔ ה-Order נשאר עם עלות 'תקועה' ולא מגיע ל-Cost Center.",
        "ערבוב עלויות PM ו-Production על אותו Cost Object ➔ דיווח-תחזוקה מעוות.",
        "סגירת Order (TECO) לפני קליטת חשבונית-קבלן ➔ עלות מגיעה אחרי הסגירה, סטייה מטעה.",
        "אי-שימוש ב-Value Categories ➔ אי-אפשר לפלח עלות לעבודה/חומר/חוץ.",
      ],
      troubleshootHe: [
        "Order ללא עלות בפועל ➔ בדוק Confirmations (IW41) ו-Goods Issues; אולי לא בוצעו.",
        "Settlement נכשל ➔ חסר Settlement Rule, Cost Center חסום, או תקופה סגורה (OB52/MMPV).",
        "סטיית Plan/Actual ענקית ➔ עלות-תכנון לא עודכנה אחרי שחרור, או חשבונית כפולה.",
        "עלות לא מופיעה בדוח ➔ Cost Element לא ממופה ל-Value Category.",
      ],
      bestPracticeHe: [
        "סלק Orders באופן תקופתי (סוף-חודש) ולא רק בסגירה — שמור נראות שוטפת.",
        "הפרד Order Types לפי סוג-עבודה (מונעת/מתקנת/השקעה) לדיווח נקי.",
        "הגדר Value Categories מההתחלה — קשה להוסיף רטרואקטיבית.",
        "השתמש ב-Maintenance Cost Budgeting (ראה 8.3.5) להצבת תקרות לפני ביצוע.",
      ],
      interviewHe: [
        { qHe: "מהו ה-Cost Object המרכזי בבקרת-תחזוקה?", aHe: "ה-Maintenance Order — אובייקט-עלות פנימי (Internal Order) שאוסף עבודה, חומר ושירות-חיצוני, ואז מסולק (Settlement) ל-Cost Center / Asset / WBS." },
        { qHe: "מה ההבדל בין עלות-Order ל-Cost-Center בתחזוקה?", aHe: "ה-Order אוסף עלות-עבודה-בודדת (מיקרו), ה-Cost Center מצטבר עלות-תקופתית של אזור/קו (מאקרו). ה-Settlement מעביר מהראשון לשני." },
        { qHe: "כיצד S/4HANA משנה את בקרת-התחזוקה?", aHe: "ה-Universal Journal (ACDOCA) מאחד FI+CO, מבטל טבלות-סיכום נפרדות ומאפשר דיווח-Plan/Actual בזמן-אמת ברמת-ה-Order." },
      ],
      takeawaysHe: [
        "תחזוקה היא צרכנית-תקציב שיש לתכנן, למדוד ולבקר — לא רק 'לתקן'.",
        "ה-Maintenance Order הוא לב-הבקרה: אוסף עלות ואז מסולק ל-Receiver.",
        "השוואת Plan/Actual + Value Categories היא הכלי האנליטי המרכזי.",
        "ב-S/4HANA הכל זורם ל-ACDOCA — דיווח בזמן-אמת.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · פקודות-תחזוקה ועלויות", href: "/library/pm-academy/" },
        { labelHe: "אובייקט · AUFK", href: "/library/pm/object/AUFK/" },
      ],
    },
    // ============================================================ 8.2
    {
      id: "8.2",
      titleHe: "כלי SAP להפקת מידע",
      titleEn: "SAP Tools for Obtaining Information",
      execHe:
        "אחרי שעלויות-התחזוקה נאספו, צריך להפיק מהן מידע. SAP מציע סולם-כלים מהפשוט למתוחכם: SAP List Viewer (ALV) לדוחות-תפעוליים מובנים, QuickViewer (SQVI) לשאילתות-אד-הוק, Logistics Information System (LIS) לאנליזה-תקופתית, ו-SAP BW/4HANA + SAP Lumira לבינה-עסקית ארגונית. הבחירה תלויה בשאלה: דוח חד-פעמי, דוח-תקופתי-חוזר, או אנליטיקה רב-מערכתית.",
      beginnerHe:
        "יש לך הר-נתונים של עלויות-תחזוקה. איך מסתכלים עליו? יש ארבע 'משקפיים': ALV — טבלה חכמה שאפשר למיין ולסכם; SQVI — דרך לבנות שאילתה משלך בלי תכנות; LIS — מחסן-נתונים פנימי לניתוחי-מגמה; BW/Lumira — כלים גדולים לדשבורדים ולגרפים יפים. מתחילים מהקל ועולים לפי הצורך.",
      consultantHe:
        "מבחינה ארכיטקטונית: ALV הוא שכבת-תצוגה (GRID/Tree) מעל כל Internal Table; SQVI מייצר Quick-View מעל Join/Logical-Database (להמרה ל-Query ב-SQ01); LIS בונה Information Structures (S0xx) המתעדכנות מ-events לוגיסטיים; BW/4HANA הוא EDW נפרד עם InfoProviders ו-CompositeProviders; Lumira (Discovery) הוא self-service visualization מעל BW/HANA. ב-S/4HANA רבים מ-LIS ו-BW מוחלפים ב-Embedded Analytics (CDS Views + Fiori Analytical Apps) מעל ACDOCA, אך הכלים הקלאסיים עדיין נתמכים ונפוצים בנופי-נחיתה היברידיים.",
      purposeHe:
        "לספק לכל קהל את הכלי המתאים: לטכנאי דוח-ALV מהיר, לאנליסט שאילתת-SQVI גמישה, למנהל-תחזוקה מגמת-LIS, ולהנהלה דשבורד-BW/Lumira. התאמת-הכלי-למשימה חוסכת זמן-פיתוח ומונעת 'פטיש-אחד-לכל-מסמר'.",
      processExampleHe:
        "מנהל-תחזוקה רוצה 'עלות-תחזוקה לפי ציוד ברבעון'. ALV: מריץ IW38, מסנן ומסכם — מהיר אך מוגבל לדוח-ה-Order. SQVI: בונה שאילתה Join בין AUFK ל-COEP. LIS: מנתח Information Structure S061 (Object class) למגמה-תקופתית. BW: דשבורד עם drill-down לפי Plant→Line→Equipment. הכלי נבחר לפי עומק-הניתוח הנדרש.",
      scenarioHe:
        "בארגון: צוות-הרצפה משתמש ב-ALV (IW38) לרשימת-Orders-פתוחים; מהנדס-אמינות בונה SQVI ל-MTBF לפי ציוד; בקר-תחזוקה מנתח ב-LIS את עלות-התחזוקה-למקרה-ייצור (cost per case) חודש-מול-חודש; וסמנכ\"ל-תפעול רואה דשבורד-Lumira מעל BW עם עלות-תחזוקה לכל מפעלי-הבקבוק בישראל.",
      navHe: [
        "Logistics Information System ► Logistics Data Warehouse ► Updating ► Updating Control ► Settings: Maintenance ► Define Update (OMOY)",
        "Plant Maintenance and Customer Service ► Information System ► Configure Standard Analyses",
        "(SQVI/SQ01 ו-ALV layouts מנוהלים ברמת-המשתמש, לא ב-SPRO)",
      ],
      tables: ["AUFK", "COEP", "QMEL", "S061", "S065", "MCIS"],
      tcodes: ["IW38", "IW39", "SQVI", "MCI1", "MCI3", "MCI8"],
      fiori: ["F2929", "F0967", "F2691"],
      configHe: [
        "LIS Update (OMOY): קובע אילו Information Structures מתעדכנות (S061-S065) ובאיזה תזמון (synchron/asynchron).",
        "Standard Analyses: הגדרת ברירות-מחדל לניתוחי-PM (MCI1-MCI8).",
        "ALV Layouts: נשמרים כ-Variants (גלובלי/אישי) — ניהול-תצוגה ללא תכנות.",
        "BW/Lumira: מוגדרים במערכת ה-BW הנפרדת, מעבר ל-SPRO של ה-ECC.",
      ],
      flow: [
        { he: "נתוני-תחזוקה גולמיים", code: "AUFK/COEP", note: "מקור" },
        { he: "דוח מהיר", code: "ALV", note: "תפעולי" },
        { he: "שאילתת אד-הוק", code: "SQVI", note: "גמיש" },
        { he: "ניתוח-מגמה", code: "LIS", note: "תקופתי" },
        { he: "בינה-עסקית", code: "BW/4HANA", note: "ארגוני" },
        { he: "ויזואליזציה", code: "Lumira", note: "דשבורד" },
      ],
      mistakesHe: [
        "בניית שאילתת-SQVI כבדה במקום LIS לניתוח-מגמה חוזר ➔ ביצועים גרועים.",
        "הסתמכות על ALV-export ל-Excel כ'מחסן-נתונים' ➔ אובדן-בקרה ואין מקור-אמת.",
        "אי-הפעלת LIS Update ➔ Information Structures ריקות, אנליזה חסרה.",
        "פיתוח דשבורד-BW כשדוח-ALV פשוט הספיק ➔ over-engineering.",
      ],
      troubleshootHe: [
        "LIS ריק ➔ Update לא הופעל (OMOY) או setup-run לא הורץ (OLIx).",
        "SQVI איטי ➔ חסר אינדקס על ה-Join, או טווח-בחירה רחב מדי.",
        "ALV לא מציג עמודה ➔ Field לא ב-catalog או Layout מסתיר אותו.",
        "נתוני-BW לא מעודכנים ➔ DataSource/Process-Chain לא רץ.",
      ],
      bestPracticeHe: [
        "התחל מ-ALV; עלה ל-SQVI/LIS/BW רק כשהצורך מצדיק.",
        "תקנן ALV Layouts גלובליים לדוחות-תחזוקה נפוצים.",
        "ב-S/4HANA העדף Embedded Analytics (CDS+Fiori) על-פני LIS קלאסי.",
        "תעד מקור-אמת אחד לכל KPI-תחזוקה (cost/case, MTBF) למנוע סתירות.",
      ],
      interviewHe: [
        { qHe: "מתי SQVI ומתי LIS?", aHe: "SQVI לשאילתת-אד-הוק חד-פעמית מעל טבלאות; LIS לניתוח-מגמה תקופתי-חוזר מעל Information Structures מצטברות." },
        { qHe: "מה מחליף LIS ו-BW ב-S/4HANA?", aHe: "Embedded Analytics — CDS Views + Fiori Analytical Apps מעל ה-Universal Journal (ACDOCA), בזמן-אמת וללא העתקת-נתונים." },
      ],
      takeawaysHe: [
        "סולם-כלים: ALV → SQVI → LIS → BW/4HANA → Lumira, מהפשוט למתוחכם.",
        "התאם כלי-למשימה: דוח / אד-הוק / מגמה / בינה-עסקית.",
        "ב-S/4HANA רבים מהכלים הקלאסיים מתכנסים ל-Embedded Analytics.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · דוחות מערכת-מידע", href: "/library/pm-academy/" },
      ],
      children: [
        // -------------------------------------------------- 8.2.1
        {
          id: "8.2.1",
          titleHe: "SAP List Viewer (ALV)",
          titleEn: "SAP List Viewer",
          execHe:
            "SAP List Viewer (ALV) הוא מנוע-התצוגה הסטנדרטי של רשימות ב-SAP — הטבלה האינטראקטיבית מאחורי כמעט כל דוח-תחזוקה (IW38/IW39). הוא מאפשר מיון, סינון, סיכום-ביניים, פריסות (Layouts) וייצוא — הכל ללא תכנות. זהו הכלי הראשון והנפוץ ביותר להפקת-מידע-תחזוקה.",
          beginnerHe:
            "ALV היא 'אקסל חכם בתוך SAP'. כל דוח שמראה שורות — רשימת-Orders, רשימת-Notifications — מוצג ב-ALV. אתה יכול לגרור עמודות, למיין, לסכם עמודת-עלות, לשמור את התצוגה כ'Layout', ולייצא לאקסל. הכל בלחיצות, בלי לכתוב קוד.",
          consultantHe:
            "ALV (REUSE_ALV / SALV / CL_GUI_ALV_GRID) הוא שכבת-תצוגה מעל Internal Table עם Field Catalog. תומך GRID, List ו-Tree-ALV. ב-PM, IW38/IW39 הם דוחות-ALV מובנים מעל list של Orders. Layouts נשמרים כ-Variants (משתמש/גלובלי) בטבלאות LTDX. סיכומי-ביניים (Subtotals) ו-Filters הם client-side. ב-S/4HANA רבים מהדוחות עברו ל-Fiori List Report (SmartTable/SAPUI5) השומר על אותה פרדיגמה.",
          purposeHe:
            "לתת למשתמש-הקצה שליטה-מלאה בתצוגת-הדוח בלי IT — לחתוך, לסנן ולסכם עלויות-תחזוקה לפי הצורך, ולשמור תצוגות חוזרות.",
          processExampleHe:
            "טכנאי מריץ IW38, מקבל רשימת-Orders ב-ALV, מסנן לפי Plant ו-Status, ממיין לפי Actual-Cost יורד, מוסיף Subtotal לפי Cost Center, שומר Layout בשם /MAINT-COST, ומייצא לאקסל לישיבת-בוקר.",
          scenarioHe:
            "בארגון: מנהל-המשמרת מריץ IW38 כל בוקר עם Layout שמור המציג Orders-פתוחים בקו-PET, ממוין לפי תאריך-יעד ועלות-מתוכננת — תמונת-מצב מיידית של עומס-התחזוקה במשמרת.",
          navHe: [
            "(ALV Layouts מנוהלים ברמת-המשתמש דרך כפתור Settings/Layout בכל דוח — לא ב-SPRO)",
            "Plant Maintenance and Customer Service ► Information System ► Reports — כל דוח מוצג ב-ALV",
          ],
          tables: ["LTDX", "AUFK", "AFIH"],
          tcodes: ["IW38", "IW39", "IW28", "IW29"],
          fiori: ["F2929", "F0967"],
          configHe: [
            "Layout/Variant: שמירת תצוגה (עמודות, מיון, סינון, סיכומים) כ-Variant אישי או גלובלי.",
            "Field Catalog: נקבע בדוח; משתמש בוחר אילו עמודות מתוכו להציג.",
            "Default Layout: אפשר לקבע Layout ברירת-מחדל למשתמש לכל דוח.",
          ],
          flow: [
            { he: "הרצת דוח", code: "IW38", note: "list של Orders" },
            { he: "סינון + מיון", code: "ALV", note: "client-side" },
            { he: "סיכומי-ביניים", code: "Subtotal", note: "לפי Cost Center" },
            { he: "שמירת Layout", code: "Variant", note: "חוזר" },
            { he: "ייצוא", code: "XLS", note: "להמשך-עבודה" },
          ],
          mistakesHe: [
            "אי-שמירת Layout ➔ בנייה-מחדש בכל הרצה, בזבוז-זמן.",
            "ייצוא-לאקסל כתחליף-קבוע לדוח-מנוהל ➔ נתונים מתיישנים.",
            "טווח-בחירה רחב מדי ➔ ALV עמוס ואיטי.",
          ],
          troubleshootHe: [
            "עמודה חסרה ➔ לא ב-Field-Catalog של הדוח או מוסתרת ב-Layout.",
            "Layout לא נטען ➔ נשמר אישי במקום גלובלי, או שם שגוי.",
            "סיכום שגוי ➔ מסננים פעילים מסתירים שורות מהסכום.",
          ],
          bestPracticeHe: [
            "תקנן Layouts גלובליים לדוחות-תחזוקה נפוצים בארגון.",
            "השתמש ב-Subtotals לפי Cost Center/Object לפילוח-עלות מהיר.",
            "קבע Default Layout למשתמשי-תחזוקה לחיסכון-זמן.",
          ],
          interviewHe: [
            { qHe: "מהו Layout ב-ALV?", aHe: "תצוגה שמורה (עמודות, מיון, סינון, סיכומים) הניתנת לטעינה-חוזרת; אישית או גלובלית, נשמרת ב-LTDX." },
            { qHe: "האם ALV דורש תכנות לשינוי-תצוגה?", aHe: "לא — מיון, סינון, סיכום ושמירת-Layout נעשים על-ידי המשתמש ללא קוד." },
          ],
          takeawaysHe: [
            "ALV = הטבלה-החכמה מאחורי כל דוח-תחזוקה.",
            "Layouts מאפשרים תצוגות-חוזרות ללא IT.",
            "ב-S/4HANA הפרדיגמה ממשיכה ב-Fiori List Report.",
          ],
          relatedHe: [{ labelHe: "PM Academy · דוחות-Orders", href: "/library/pm-academy/" }],
        },
        // -------------------------------------------------- 8.2.2
        {
          id: "8.2.2",
          titleHe: "QuickViewer (SQVI)",
          titleEn: "QuickViewer",
          execHe:
            "QuickViewer (SQVI) הוא כלי לבניית-שאילתות-אד-הוק בלי תכנות. המשתמש בוחר טבלאות, מגדיר Join או Logical Database, בוחר שדות-יציאה ושדות-בחירה — ומקבל דוח-ALV. הוא אישי (single-user) אך ניתן להמרה ל-SAP Query (SQ01) לשיתוף. כלי-זהב לשאלות-עלות-תחזוקה שאין להן דוח-מוכן.",
          beginnerHe:
            "לפעמים השאלה שלך לא קיימת כדוח-מוכן — למשל 'עלות-תחזוקה לפי יצרן-המכונה'. SQVI נותן לך לבנות דוח כזה בעצמך: בוחרים שתי טבלאות, מחברים ביניהן (Join), מסמנים אילו עמודות להראות ולפי מה לחפש — ומקבלים טבלה. בלי מתכנת.",
          consultantHe:
            "SQVI מייצר QuickView אישי המבוסס על Table-Join, Logical Database או InfoSet. ה-Join מבוצע ב-DB-level (inner/left). היתרון: מהיר להקמה; החיסרון: אישי ולא-מובנה לתחזוקה ארגונית. המעבר ל-SQ02/SQ01 (InfoSet+Query+User-Group) הופך אותו לבר-שיתוף ובר-הרשאה. ב-PM נפוץ Join בין AUFK (Order header) ל-COEP/COVP (cost lines) או בין EQUI/EQKT ל-AFIH לדוחות-עלות-לפי-ציוד. זהירות: Joins רחבים ללא אינדקס פוגעים בביצועים.",
          purposeHe:
            "לאפשר לאנליסט-תחזוקה לענות על שאלות-אד-הוק במהירות, בלי להמתין לפיתוח-IT, ובלי ידע-ABAP.",
          processExampleHe:
            "מהנדס-אמינות רוצה 'מספר-Orders ועלות-כוללת לפי יצרן-ציוד'. ב-SQVI הוא בונה Join: EQUI (Manufacturer) ↔ AFIH (Order↔Equipment) ↔ COEP (Cost). בוחר שדות-יציאה, מריץ — ומקבל ALV. אם זה שימושי-חוזר, הוא ממיר ל-Query ב-SQ01 ומשתף עם הצוות.",
          scenarioHe:
            "בארגון: בקר-תחזוקה בונה SQVI ל-'עלות-תחזוקה לכל ארגז-מילוי (cost per case)' — Join בין נתוני-ייצור (כמות-ארגזים) לבין סיכום-COEP של Orders באותו קו, לחודש. אחרי תיקוף, הופך ל-Query משותף לכל מנהלי-הקווים.",
          navHe: [
            "(SQVI נפתח ישירות כ-transaction; QuickViews אישיים, לא ב-SPRO)",
            "להמרה לשיתוף: Tools ► ABAP Workbench ► Utilities ► SAP Query ► InfoSets (SQ02) / Queries (SQ01)",
          ],
          tables: ["AUFK", "COEP", "EQUI", "AFIH", "QMEL"],
          tcodes: ["SQVI", "SQ01", "SQ02", "SQ03"],
          fiori: [],
          configHe: [
            "Data Source: Table-Join, Logical Database, או InfoSet.",
            "Join Definition: בחירת טבלאות וקישור שדות-מפתח (inner/left outer).",
            "Selection/List Fields: בחירת שדות-בחירה ושדות-יציאה.",
            "המרה לשיתוף: QuickView → InfoSet (SQ02) → Query (SQ01) עם User-Group (SQ03).",
          ],
          flow: [
            { he: "בחירת מקור-נתונים", code: "SQVI", note: "Join/LDB" },
            { he: "הגדרת Join", code: "AUFK↔COEP", note: "שדות-מפתח" },
            { he: "שדות-יציאה+בחירה", code: "Fields", note: "מה להראות" },
            { he: "הרצה ➔ ALV", code: "Output", note: "אד-הוק" },
            { he: "המרה לשיתוף", code: "SQ01", note: "Query+User-Group" },
          ],
          mistakesHe: [
            "Join רחב ללא תנאי-מפתח ➔ מכפלה-קרטזית וביצועים גרועים.",
            "השארת השאילתה אישית כשהיא חיונית-לצוות ➔ אובדן בעת עזיבת-עובד.",
            "שימוש ב-SQVI לניתוח-מגמה כבד במקום LIS/BW.",
          ],
          troubleshootHe: [
            "תוצאות-כפולות ➔ Join חסר תנאי-מפתח (Cartesian).",
            "אין שורות ➔ Inner-Join מסנן; נסה Left-Outer.",
            "שאילתה איטית ➔ חסר אינדקס או טווח-בחירה רחב.",
            "אי-אפשר לשתף ➔ זה QuickView אישי; המר ל-Query (SQ01).",
          ],
          bestPracticeHe: [
            "השתמש ל-אד-הוק; המר לשאילתות-חוזרות-חשובות ל-SQ01.",
            "התחל מ-Join צר עם תנאי-מפתח ברורים.",
            "תעד את ה-Joins הנפוצים בתחזוקה (AUFK↔COEP, EQUI↔AFIH).",
          ],
          interviewHe: [
            { qHe: "מה ההבדל בין SQVI ל-SQ01?", aHe: "SQVI מייצר QuickView אישי (single-user); SQ01 מייצר Query משותף מבוסס-InfoSet עם User-Group והרשאות. ניתן להמיר SQVI ל-Query." },
            { qHe: "מתי נעדיף SQVI על דוח-מוכן?", aHe: "כשהשאלה אד-הוק ואין לה דוח קיים, וצריך תשובה מהירה בלי פיתוח-IT." },
          ],
          takeawaysHe: [
            "SQVI = שאילתת-אד-הוק ללא תכנות, מבוססת-Join.",
            "אישית כברירת-מחדל; המרה ל-SQ01 לשיתוף.",
            "Joins נפוצים ב-PM: AUFK↔COEP, EQUI↔AFIH.",
          ],
          relatedHe: [{ labelHe: "PM Academy · ניתוח-עלות-ציוד", href: "/library/pm-academy/" }],
        },
        // -------------------------------------------------- 8.2.3
        {
          id: "8.2.3",
          titleHe: "מערכת מידע לוגיסטית (LIS)",
          titleEn: "Logistics Information System",
          execHe:
            "Logistics Information System (LIS) הוא מחסן-נתונים-תפעולי מובנה בתוך ECC, האוסף נתוני-תחזוקה ל-Information Structures (S061-S065) המתעדכנות אוטומטית מאירועים. הוא מאפשר Standard ו-Flexible Analyses — ניתוחי-מגמה תקופתיים של עלות, זמן-השבתה ותדירות-תקלות, ללא העברת-נתונים ל-BW.",
          beginnerHe:
            "LIS הוא 'מחסן-נתונים קטן בתוך SAP' לתחזוקה. בכל פעם שנפתח Order או נסגרת תקלה, LIS צובר את הנתון בטבלה-מסכמת. אחר-כך אתה יכול לשאול 'איך השתנתה עלות-התחזוקה ב-12 החודשים האחרונים' ולקבל מגמה — בלי לחשב הכל מחדש בכל פעם.",
          consultantHe:
            "LIS בנוי מ-Information Structures (S0xx) המתעדכנות דרך Update Rules מ-events לוגיסטיים (Notification/Order/Confirmation). מבנה-PM כולל S061 (Object class), S062 (Object statistics), S063 (Damage analysis), S065 (Breakdown). העדכון מוגדר ב-OMOY (synchron/asynchron/collective). Standard Analyses (MCI1-MCI8) רצים מעלן; Flexible Analyses (MCSI) מאפשרים Self-defined. דרוש setup-run ראשוני (OLIx). ב-S/4HANA LIS נחשב legacy ומומלץ Embedded Analytics, אך עדיין נתמך ונפוץ.",
          purposeHe:
            "לספק ניתוחי-מגמה תקופתיים (KPIs: MTBR, MTTR, עלות-תחזוקה, זמן-השבתה) בלי בניית-שאילתה בכל פעם ובלי מערכת-BW נפרדת — מקור-אמת מצטבר לתחזוקה.",
          processExampleHe:
            "מנהל-תחזוקה מריץ MCI8 (Breakdown analysis) על S065: מקבל לכל Equipment את מספר-ההשבתות, זמן-ההשבתה-הכולל ו-MTBR (Mean Time Between Repairs) על-פני 12 חודשים, עם drill-down מ-Plant ל-Equipment. מזהה את 5 הציודים ה'גרועים' להשקעת-שיפור.",
          scenarioHe:
            "בארגון: בקר-אמינות מנתח ב-LIS את S065 לכל קווי-המילוי — איזה קו סובל מהכי הרבה השבתות-בלתי-מתוכננות, ומה עלות-התחזוקה-למקרה לאורך-זמן. הניתוח מזין את תוכנית-ההשקעות-השנתית (ראה 8.3.3).",
          navHe: [
            "Logistics Information System ► Logistics Data Warehouse ► Updating ► Updating Control ► Settings: Maintenance ► Define Update (OMOY)",
            "Logistics Information System ► Logistics Data Warehouse ► Data Basis ► Tools ► Set Up Statistical Data ► Application Specific Setup (OLI…)",
            "Plant Maintenance and Customer Service ► Information System ► Standard Analyses",
          ],
          tables: ["S061", "S062", "S063", "S065", "MCIS", "TMC4"],
          tcodes: ["MCI1", "MCI3", "MCI4", "MCI8", "MCSI", "OMOY"],
          fiori: ["F2691"],
          configHe: [
            "Update Control (OMOY): אילו Information Structures מתעדכנות ומתי (synchron/asynchron/collective).",
            "Setup Run (OLI…): מילוי-ראשוני של ה-structures מנתונים היסטוריים.",
            "Standard Analyses (MCI1-MCI8): ניתוחי-PM מובנים (Object/Damage/Breakdown).",
            "Flexible Analyses (MCSI/MC…): מבנים וניתוחים מוגדרי-משתמש.",
          ],
          flow: [
            { he: "אירוע לוגיסטי", code: "Order/Notif", note: "מקור" },
            { he: "Update Rule", code: "OMOY", note: "צבירה" },
            { he: "Information Structure", code: "S065", note: "מצטבר" },
            { he: "Standard Analysis", code: "MCI8", note: "מגמה" },
            { he: "Drill-down", code: "Plant→Equip", note: "החלטה" },
          ],
          mistakesHe: [
            "אי-הפעלת Update (OMOY) ➔ Information Structures ריקות.",
            "דילוג על Setup-Run ➔ אין נתוני-עבר, רק מנקודת-ההפעלה.",
            "עדכון synchron-כבד ➔ פגיעה בביצועי-עסקה; עדיף asynchron/collective.",
          ],
          troubleshootHe: [
            "ניתוח ריק ➔ Update לא פעיל (OMOY) או Setup-Run לא רץ (OLIx).",
            "מספרים לא-תואמים לדוחות-תפעוליים ➔ צבירה כפולה או Update Rule שגוי.",
            "ביצועי-עסקה ירדו ➔ עדכון-synchron כבד; עבור ל-asynchron.",
          ],
          bestPracticeHe: [
            "השתמש ב-update asynchron/collective להגנה על ביצועים.",
            "הרץ Setup-Run פעם-אחת בעת-ההפעלה לכיסוי-עבר.",
            "ב-S/4HANA העדף Embedded Analytics על-פני LIS חדש.",
            "תקנן KPIs (MTBR/MTTR/cost-per-case) על Information Structures קבועות.",
          ],
          interviewHe: [
            { qHe: "מהי Information Structure ב-LIS?", aHe: "טבלה-מסכמת (S0xx) המתעדכנת אוטומטית מ-events לוגיסטיים דרך Update Rules, ומשמשת בסיס לניתוחי-מגמה." },
            { qHe: "מהו S065 ב-PM?", aHe: "Information Structure לניתוח-השבתות (Breakdown) — בסיס ל-MTBR/MTTR ולניתוח-אמינות-ציוד." },
          ],
          takeawaysHe: [
            "LIS = מחסן-נתונים-תפעולי מובנה ב-ECC לניתוחי-מגמה.",
            "Information Structures (S061-S065) מתעדכנות אוטומטית.",
            "Standard (MCI1-MCI8) ו-Flexible (MCSI) Analyses.",
            "ב-S/4HANA נחשב legacy מול Embedded Analytics.",
          ],
          relatedHe: [{ labelHe: "PM Academy · KPIs ואמינות-ציוד", href: "/library/pm-academy/" }],
        },
        // -------------------------------------------------- 8.2.4
        {
          id: "8.2.4",
          titleHe: "SAP Business Warehouse ו-SAP BW/4HANA",
          titleEn: "SAP Business Warehouse and SAP BW/4HANA",
          execHe:
            "SAP Business Warehouse (BW) ו-יורשו SAP BW/4HANA הם מחסן-נתונים-ארגוני (EDW) נפרד מה-ECC, המאחד נתוני-תחזוקה ממקורות-רבים לדיווח-אסטרטגי. הם מספקים מודלים-רב-ממדיים, היסטוריה-עמוקה, ו-drill-down חוצה-מערכות — לדשבורדים ול-KPIs ארגוניים שמעבר ליכולות LIS.",
          beginnerHe:
            "כש-LIS קטן מדי — כשרוצים לשלב נתונים מכמה מפעלים, כמה מערכות, ולשמור היסטוריה-עמוקה — עוברים ל-BW. זו מערכת-נפרדת שמושכת נתונים מ-SAP (וממקורות-אחרים), מסדרת אותם, ומאפשרת לבנות דשבורדים גדולים. BW/4HANA הוא הדור-החדש, מהיר יותר, רץ על HANA.",
          consultantHe:
            "BW מבוסס InfoObjects, ADSOs (BW/4HANA) / DSO+InfoCube (BW קלאסי), CompositeProviders ו-Queries (BEx/Analysis). נתוני-PM נמשכים דרך DataSources סטנדרטיים (0PM_*) ו-Extractors מעל ECC, נטענים ב-Process Chains. BW/4HANA מצמצם ל-4 LSA++ אובייקטים (ADSO, CompositeProvider, InfoObject, Open ODS) ורץ in-memory. שכבת-הצריכה: Lumira/Analysis for Office/SAC. בנופי-S/4 רבים, Embedded Analytics מטפל ב-operational reporting, ו-BW/4HANA נשאר ל-cross-system strategic EDW.",
          purposeHe:
            "לאחד נתוני-תחזוקה ממפעלים/מערכות מרובים, לשמור היסטוריה-ארוכה, ולספק להנהלה דיווח-אסטרטגי ו-KPIs חוצי-ארגון שלא ניתן להפיק ממערכת-תפעולית בודדת.",
          processExampleHe:
            "ארגון רב-מפעלי: Extractors מושכים עלויות-תחזוקה מכל ECC ל-BW/4HANA; Process Chain טוען ל-ADSO; CompositeProvider מאחד עם נתוני-נכסים; Query מציג עלות-תחזוקה-לנכס לכל המפעלים עם drill-down מ-Region ל-Equipment, על-פני 5 שנים.",
          scenarioHe:
            "בארגון: כל מפעלי-הבקבוק של הזכיין מזינים נתוני-תחזוקה ל-BW/4HANA מרכזי. ההנהלה רואה עלות-תחזוקה-לארגז benchmark בין מפעלים, מזהה את ה-outliers, ומקצה תקציבי-שיפור — החלטה שאי-אפשר לקבל ממפעל-בודד.",
          navHe: [
            "(מוגדר במערכת ה-BW/4HANA הנפרדת — Modeling ב-Eclipse/BW-tooling, לא ב-SPRO של ה-ECC)",
            "ECC: SBIW ► Business Information Warehouse ► Settings for Application-Specific DataSources (PM extraction)",
            "RSA5 (התקנת DataSources) / RSA6 (postprocessing) במערכת-המקור",
          ],
          tables: ["RSDCUBE", "RSDODSO", "ROOSOURCE", "RSDS"],
          tcodes: ["RSA1", "RSA5", "RSA6", "SBIW", "RSPC"],
          fiori: [],
          configHe: [
            "DataSource (RSA5/RSA6): התקנה והפעלה של PM extractors (0PM_*) במערכת-המקור.",
            "Modeling (RSA1): ADSO/CompositeProvider/Query במערכת ה-BW.",
            "Process Chains (RSPC): תזמון-טעינה אוטומטי.",
            "Consumption: Lumira / Analysis for Office / SAC מעל ה-Queries.",
          ],
          flow: [
            { he: "DataSource ב-ECC", code: "RSA5", note: "Extractor" },
            { he: "טעינה ל-BW", code: "RSPC", note: "Process Chain" },
            { he: "מודל-נתונים", code: "ADSO/CP", note: "אחסון" },
            { he: "Query", code: "BEx", note: "רב-ממדי" },
            { he: "צריכה", code: "Lumira/SAC", note: "דשבורד" },
          ],
          mistakesHe: [
            "בניית BW כשדיווח-תפעולי (ALV/Embedded) הספיק ➔ over-engineering יקר.",
            "Extractor לא מופעל ב-RSA5 ➔ אין נתוני-PM ב-BW.",
            "Process Chain כושל ללא ניטור ➔ דשבורד מציג נתונים-ישנים.",
          ],
          troubleshootHe: [
            "נתוני-BW לא מעודכנים ➔ Process Chain (RSPC) כשל או delta לא נמשך.",
            "אין נתוני-PM ➔ DataSource לא מותקן/מופעל (RSA5/RSA6).",
            "מספרים סוטים מ-ECC ➔ delta-init חסר או transformation שגוי.",
          ],
          bestPracticeHe: [
            "השתמש ב-BW/4HANA ל-cross-system strategic reporting בלבד.",
            "השאר operational reporting ב-Embedded Analytics על S/4.",
            "נטר Process Chains; הגדר התראות-כשל.",
            "תקנן InfoObjects לנכסים/Cost-Centers בין מפעלים ל-benchmark תקֵף.",
          ],
          interviewHe: [
            { qHe: "מתי BW/4HANA ולא Embedded Analytics?", aHe: "כשנדרש דיווח חוצה-מערכות, היסטוריה-עמוקה או איחוד ממקורות מרובים; Embedded Analytics מתאים לדיווח-תפעולי על מערכת-S/4 בודדת." },
            { qHe: "כיצד נתוני-PM מגיעים ל-BW?", aHe: "דרך DataSources/Extractors (0PM_*) המותקנים ב-RSA5, נמשכים בדלתא ונטענים דרך Process Chains (RSPC)." },
          ],
          takeawaysHe: [
            "BW/BW4HANA = EDW ארגוני נפרד לדיווח-אסטרטגי חוצה-מערכות.",
            "נתוני-PM נמשכים דרך Extractors (0PM_*) ו-Process Chains.",
            "BW/4HANA = LSA++ מצומצם, in-memory על HANA.",
            "תפעולי → Embedded Analytics; אסטרטגי-חוצה-מערכות → BW/4HANA.",
          ],
          relatedHe: [{ labelHe: "PM Academy · דיווח-ארגוני", href: "/library/pm-academy/" }],
        },
        // -------------------------------------------------- 8.2.5
        {
          id: "8.2.5",
          titleHe: "SAP Lumira, Discovery Edition",
          titleEn: "SAP Lumira, Discovery Edition",
          execHe:
            "SAP Lumira, Discovery Edition הוא כלי self-service לויזואליזציה וגילוי-נתונים. הוא מאפשר למשתמש-עסקי (לא-מתכנת) לחבר מקור-נתונים — BW, HANA או קובץ — ולבנות גרפים, מפות ודשבורדים אינטראקטיביים של עלויות-ותקלות-תחזוקה, בגרירה-ושחרור.",
          beginnerHe:
            "Lumira הוא כמו 'Tableau של SAP'. אתה מחבר אותו לנתוני-התחזוקה, גורר שדה ל'ציר' ושדה ל'ערך', ומקבל גרף יפה — עמודות, עוגה, מפה. אפשר לסנן בלחיצה ולבנות דשבורד שלם בלי קוד. נועד לאנשי-עסקים, לא למתכנתים.",
          consultantHe:
            "Lumira Discovery (חלק מ-SAP Lumira 2.x) הוא self-service viz מעל BW/HANA/flat. הוא יוצר Stories ו-visualizations; ה-Designer Edition (אותו מוצר) משמש לדשבורדים-מנוהלים. הערה אסטרטגית: SAP העבירה את ה-roadmap ל-SAP Analytics Cloud (SAC) — Lumira במצב maintenance. בנופים חדשים מומלץ SAC; Lumira עדיין נפוץ בהתקנות-קיימות. מבחינת-תחזוקה, Lumira יושב מעל BW-Queries או HANA-Views של עלויות-PM.",
          purposeHe:
            "להעצים את מנהל-התחזוקה לבנות ויזואליזציות ודשבורדים בעצמו, מבלי להמתין ל-IT — מקצר את מחזור 'שאלה→תובנה' ומגביר אימוץ-נתונים בקרב-המשתמשים.",
          processExampleHe:
            "מנהל-תחזוקה מחבר Lumira ל-BW-Query של עלויות-תחזוקה, גורר 'Plant' לציר-X, 'Actual Cost' לערך, מוסיף מסנן-תקופה, צובע לפי 'Order Type' (מונעת/מתקנת), ובונה Story עם גרף-מגמה + מפת-מפעלים. משתף עם ההנהלה כדשבורד-אינטראקטיבי.",
          scenarioHe:
            "בארגון: דשבורד-Lumira מציג לכל מפעל-בקבוק את חלוקת-עלות-התחזוקה בין מונעת-למתקנת, מגמת-cost-per-case, ו-Top-10 ציודים-יקרים. ההנהלה משתמשת בו בסקירת-תפעול-רבעונית להחלטות-השקעה.",
          navHe: [
            "(כלי-Client נפרד / שרת-BI — מוגדר מחוץ ל-SPRO של ה-ECC)",
            "התחברות: Lumira ► New Dataset ► SAP BW / SAP HANA / File",
            "Roadmap: SAP ממליצה על SAP Analytics Cloud (SAC) לנופים חדשים",
          ],
          tables: [],
          tcodes: [],
          fiori: [],
          configHe: [
            "Connectivity: חיבור ל-BW (BICS), HANA (online/offline), או קובץ.",
            "Stories/Visualizations: בניית גרפים בגרירה-ושחרור; מסננים ו-drill.",
            "Sharing: פרסום לשרת-BI / SAP BusinessObjects.",
            "Roadmap-note: לנופים חדשים — SAP Analytics Cloud (SAC) במקום Lumira.",
          ],
          flow: [
            { he: "חיבור-מקור", code: "BW/HANA", note: "Dataset" },
            { he: "גרירת-שדות", code: "Drag&Drop", note: "ציר+ערך" },
            { he: "גרף+מסנן", code: "Viz", note: "אינטראקטיבי" },
            { he: "בניית Story", code: "Dashboard", note: "מרובה-גרפים" },
            { he: "שיתוף", code: "Publish", note: "להנהלה" },
          ],
          mistakesHe: [
            "בניית Lumira מעל נתון-לא-מתוקף ➔ דשבורד-יפה-ושגוי.",
            "השקעה ב-Lumira חדש כש-SAC הוא ה-roadmap ➔ חוב-טכני.",
            "ויזואליזציה ללא מקור-אמת-מוסכם ➔ KPIs סותרים בין דשבורדים.",
          ],
          troubleshootHe: [
            "חיבור-BW נכשל ➔ הרשאות BICS / SSO / Query לא-נחשף.",
            "מספרים לא-תואמים ➔ filter/aggregation שונה מהמקור.",
            "ביצועים איטיים ➔ Dataset גדול מדי; השתמש ב-online-HANA במקום import.",
          ],
          bestPracticeHe: [
            "בנה מעל מקור-אמת-מתוקף (BW-Query/HANA-View), לא קבצים-ידניים.",
            "בנופים חדשים שקול SAP Analytics Cloud (SAC) במקום Lumira.",
            "תקנן KPIs-תחזוקה משותפים בין כל הדשבורדים.",
            "השתמש ב-online-connectivity לנתונים-טריים בנפח-גדול.",
          ],
          interviewHe: [
            { qHe: "מהו ההבדל בין Lumira ל-BW?", aHe: "BW הוא מחסן-הנתונים (אחסון+מודל); Lumira הוא שכבת-הצריכה/ויזואליזציה self-service מעליו." },
            { qHe: "מה ה-roadmap של Lumira?", aHe: "SAP העבירה את הפוקוס ל-SAP Analytics Cloud (SAC); Lumira במצב-maintenance, ולנופים חדשים מומלץ SAC." },
          ],
          takeawaysHe: [
            "Lumira Discovery = self-service viz מעל BW/HANA.",
            "מעצים משתמש-עסקי לבנות דשבורדים ללא IT.",
            "ה-roadmap עבר ל-SAP Analytics Cloud (SAC).",
            "בנה תמיד מעל מקור-אמת-מתוקף.",
          ],
          relatedHe: [{ labelHe: "PM Academy · דשבורדי-תחזוקה", href: "/library/pm-academy/" }],
        },
      ],
    },
    // ============================================================ 8.3
    {
      id: "8.3",
      titleHe: "כלי SAP לתקצוב",
      titleEn: "SAP Tools for Budgeting",
      execHe:
        "תקצוב הוא הצד-המקדים של בקרת-התחזוקה: קביעת תקרת-הוצאה לפני הביצוע, ומעקב שהביצוע-בפועל לא חורג. SAP מציע חמש דרכים לתקצב תחזוקה: Order budgeting (תקציב לפקודה-בודדת), Cost-center budgeting (תקציב למרכז-עלות), Investment Management (תקציב-השקעות-הון), WBS budgeting (תקציב-פרויקט), ו-Maintenance Cost Budgeting (כלי-PM ייעודי). הבחירה תלויה ברמת-הפירוט וברמת-הבקרה הנדרשת.",
      beginnerHe:
        "תקצוב = להחליט מראש 'כמה מותר להוציא'. בלי תקצוב, מגלים את החריגה רק בסוף-החודש — מאוחר מדי. SAP נותן חמש 'קופות-תקציב' שונות: על Order בודד, על מרכז-עלות שלם, על השקעה גדולה (IM), על פרויקט (WBS), או דרך כלי-PM ייעודי. כל אחת מתאימה למצב-אחר, וחלקן יכולות אפילו לחסום הוצאה שחורגת מהתקציב.",
      consultantHe:
        "ב-SAP, תקצוב נשען על Availability Control (AVAC) — בדיקה אקטיבית מול תקציב בעת הזמנת-עלות (PReq/PO/Confirmation), עם פעולה: warning / warning+mail / error. Order budgeting (KO22/KO24) מגדיר תקציב-שנתי/כולל לפקודה-פנימית עם Tolerance-Limits. Cost-center budgeting מסורתי הוא Plan (KP06) ללא AVAC חוסם — לכן מבוקרי-תחזוקה מעדיפים Order/WBS/IM ל-hard-control. IM (Investment Programs) מנהל היררכיית-תקציב-הון מלמעלה-למטה עם distribution ל-Orders/WBS. WBS (Projects) נושא תקציב עם AVAC משלו. Maintenance Cost Budgeting הוא מסגרת-PM-ייעודית (Budget per Functional Location/Equipment/Planner-Group). ב-S/4HANA חלק מהפונקציות מתכנסות אך הליבה זהה.",
      purposeHe:
        "להחליף בקרה-בדיעבד בבקרה-מקדימה: לעצור או להתריע על חריגה ברגע-ההזמנה, לא בסוף-התקופה. כך תחזוקה נשארת בתוך-מסגרת, וההנהלה מקבלת נראות-מחויבויות (Commitments) בזמן-אמת.",
      processExampleHe:
        "ארגון מקצה תקציב-תחזוקה-שנתי לכל Cost-Center-של-קו. תקציבי-Orders נגזרים ממנו. כש-Order מנסה ליצור PReq שחורגת מתקציב-ה-Order, Availability Control מתריע (Tolerance 90%) או חוסם (100%). המתכנן מבקש העברת-תקציב לפני שהוא יכול להמשיך.",
      scenarioHe:
        "בארגון: תקציב-התחזוקה-השנתי מחולק לכל מפעל ➔ לכל Planner-Group ➔ לכל קו (Cost Center). השקעות-הון גדולות (קו-מילוי-חדש) דרך IM; שדרוגי-פרויקט דרך WBS; ותחזוקה-שוטפת תחת תקציבי-Orders עם AVAC. כך אין 'הפתעות-תקציב' בסוף-הרבעון.",
      navHe: [
        "Controlling ► Internal Orders ► Budgeting and Availability Control ► Maintain Budget Profile",
        "Controlling ► Internal Orders ► Budgeting and Availability Control ► Define Tolerance Limits for Availability Control",
        "Investment Management ► Investment Programs ► Budgeting in Program ► Define Budget Profiles",
      ],
      tables: ["BPGE", "BPJA", "COSP", "IMPR", "PRPS"],
      tcodes: ["KO22", "KO24", "KP06", "IM52", "CJ30", "CJ31"],
      fiori: ["F0967", "F2929"],
      configHe: [
        "Budget Profile: טווח-שנים, תקציב-כולל/שנתי, מטבע, ו-Availability-Control on/off.",
        "Tolerance Limits: ספי-אזהרה/שגיאה (למשל 90% אזהרה, 100% שגיאה) לפי Activity-Group.",
        "Availability Control (AVAC): הפעלה אקטיבית מול תקציב ב-PReq/PO/Confirmation.",
        "Budget Manager / Number-Ranges לתיעוד-תקציב (Original/Supplement/Return/Transfer).",
      ],
      flow: [
        { he: "הקצאת תקציב", code: "KO22/IM52", note: "תקרה" },
        { he: "הפעלת AVAC", code: "Profile", note: "בקרה-אקטיבית" },
        { he: "הזמנת-עלות", code: "PReq/PO", note: "מחויבות" },
        { he: "בדיקת-זמינות", code: "AVAC", note: "warning/error" },
        { he: "חריגה ➔ העברה", code: "KO24/CJ30", note: "Supplement" },
      ],
      mistakesHe: [
        "הסתמכות על Cost-Center-Plan (KP06) כ'תקציב' — אין AVAC חוסם.",
        "אי-הפעלת Availability Control ➔ תקציב 'מעוטר' בלי בקרה.",
        "Tolerance-Limits לא-מוגדרים ➔ חריגה עוברת בשקט.",
        "ערבוב תחזוקה-שוטפת והשקעות-הון באותה קופה ➔ דיווח מעוות.",
      ],
      troubleshootHe: [
        "חריגה לא נחסמת ➔ AVAC לא פעיל בפרופיל, או Tolerance ב-warning בלבד.",
        "AVAC חוסם בטעות ➔ Commitments ישנים תופסים תקציב; הרץ reconstruction (KO31).",
        "תקציב לא נראה בדוח ➔ נרשם לשנה/גרסה שגויה.",
        "העברת-תקציב נכשלת ➔ Budget Profile חוסם או תקופה נעולה.",
      ],
      bestPracticeHe: [
        "השתמש ב-hard-control (Order/WBS/IM AVAC) למבוקרי-תחזוקה, לא ב-Plan-בלבד.",
        "הגדר Tolerance-Limits מדורגים (אזהרה לפני שגיאה).",
        "הפרד השקעות-הון (IM/WBS) מתחזוקה-שוטפת (Order budgeting).",
        "נטר Commitments (KOB2) — לא רק Actuals — לתמונת-תקציב אמיתית.",
      ],
      interviewHe: [
        { qHe: "מה ההבדל בין Planning ל-Budgeting ב-SAP?", aHe: "Planning (KP06) הוא אומדן-עלות צופה-פני-עתיד ללא בקרה-חוסמת; Budgeting הוא הקצאה-מאושרת עם Availability Control שיכולה להתריע או לחסום חריגה." },
        { qHe: "מהו Availability Control?", aHe: "מנגנון הבודק כל מחויבות-עלות (PReq/PO/Confirmation) מול התקציב, ומפעיל warning/error לפי Tolerance-Limits — בקרה-מקדימה." },
        { qHe: "מתי IM ומתי Order-budgeting?", aHe: "IM להשקעות-הון רב-שנתיות בהיררכיה מלמעלה-למטה; Order-budgeting לבקרת-עלות של פקודת-תחזוקה-בודדת או קבוצת-פקודות שוטפות." },
      ],
      takeawaysHe: [
        "תקצוב = בקרה-מקדימה; Planning ≠ Budgeting.",
        "Availability Control (AVAC) הוא הלב: warning/error מול תקציב.",
        "חמש דרכים: Order / Cost-Center / IM / WBS / Maintenance-Cost-Budgeting.",
        "נטר Commitments, לא רק Actuals.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · תקצוב ובקרת-עלות", href: "/library/pm-academy/" },
        { labelHe: "אובייקט · BPJA", href: "/library/pm/object/BPJA/" },
      ],
      children: [
        // -------------------------------------------------- 8.3.1
        {
          id: "8.3.1",
          titleHe: "תקצוב פקודות (Order Budgeting)",
          titleEn: "Order Budgeting",
          execHe:
            "Order budgeting מקצה תקציב לפקודה-פנימית-בודדת (לרבות Maintenance Order דרך מבנה-עלות), עם Availability Control הבודק כל מחויבות מול התקציב. זו הדרך הישירה ביותר לבקר עלות-עבודה-תחזוקתית-בודדת, ולעצור חריגה ברגע-ההזמנה.",
          beginnerHe:
            "כל פקודת-תחזוקה יכולה לקבל 'תקרה' משלה. אם התקרה היא 10,000₪ ואתה מנסה להזמין חלקים ב-11,000₪, SAP יתריע או יחסום. כך אתה יודע על חריגה מיד, לא בסוף-החודש.",
          consultantHe:
            "תקציב נשמר ב-BPGE (כולל) / BPJA (שנתי) לפי Order-Number, מנוהל ב-KO22 (original) ו-KO24 (supplement/return/transfer). Budget Profile מגדיר years, total-vs-annual, ו-AVAC-activation; Tolerance-Limits מגדירים warning/error לפי usage-%. ה-AVAC בודק PReq/PO/Confirmation. הערה: Maintenance Orders (PM) משתמשים לרוב ב-Maintenance Cost Budgeting או ב-WBS/IM, אך Internal-Order-budgeting הוא מנגנון-הבסיס. Reconstruction ב-KO31 בעת חוסר-סנכרון.",
          purposeHe:
            "בקרה-מקדימה ברמת-הפקודה — לעצור חריגת-עלות של עבודת-תחזוקה-יחידה לפני שהיא קורית, ולתת למתכנן נראות-מיידית של ניצול-התקציב.",
          processExampleHe:
            "Order לשיפוץ-משאבה מקבל תקציב 15,000₪ (KO22, AVAC פעיל, Tolerance 95%/100%). המתכנן יוצר PReq לחלקים ב-9,000₪ — עובר. Confirmation של עבודה מוסיף 5,500₪ — חוצה 95%, מתקבלת אזהרה. ניסיון להוסיף עוד 1,000₪ חוצה 100% — נחסם עד supplement (KO24).",
          scenarioHe:
            "בארגון: שיפוץ-תקופתי של ממלא (filler) מקבל Order עם תקציב-מאושר; AVAC מבטיח שעלות-החלקים-והקבלן לא תחרוג בלי אישור-מנהל-תחזוקה דרך supplement.",
          navHe: [
            "Controlling ► Internal Orders ► Budgeting and Availability Control ► Maintain Budget Profile",
            "Controlling ► Internal Orders ► Budgeting and Availability Control ► Define Tolerance Limits for Availability Control",
          ],
          tables: ["BPGE", "BPJA", "AUFK", "COSP"],
          tcodes: ["KO22", "KO24", "KO30", "KO31"],
          fiori: ["F0967"],
          configHe: [
            "Budget Profile: total/annual, years past+future, AVAC activation, currency.",
            "Tolerance Limits: % usage לכל action (warning / warning+mail / error).",
            "AVAC objects: PReq, PO, Confirmation, Goods-Issue נכנסים לבדיקה.",
            "Reconstruction (KO31): סנכרון-מחדש של AVAC בעת חוסר-התאמה.",
          ],
          flow: [
            { he: "הקצאת-תקציב", code: "KO22", note: "Original" },
            { he: "הפעלת AVAC", code: "Profile", note: "פעיל" },
            { he: "מחויבות", code: "PReq/Conf", note: "צריכת-תקציב" },
            { he: "בדיקה", code: "AVAC", note: "warn/error" },
            { he: "Supplement", code: "KO24", note: "אם חורג" },
          ],
          mistakesHe: [
            "תקציב-שנתי כשהפקודה רב-שנתית ➔ AVAC שגוי בין-שנים.",
            "AVAC לא-מופעל בפרופיל ➔ תקציב-דקורטיבי.",
            "התעלמות מ-Commitments ➔ AVAC 'מפתיע' בחסימה.",
          ],
          troubleshootHe: [
            "AVAC לא חוסם ➔ פרופיל ללא activation או Tolerance ב-warning.",
            "חסימה לא-מוצדקת ➔ Commitments ישנים; הרץ KO31.",
            "תקציב לא נראה ➔ נרשם ל-Order/שנה שגויים.",
          ],
          bestPracticeHe: [
            "הגדר Tolerance מדורג (אזהרה לפני שגיאה).",
            "נטר Commitments (KOB2) לצד Actuals.",
            "השתמש ל-Orders-בודדים; לתחזוקה-המונית שקול Maintenance Cost Budgeting.",
          ],
          interviewHe: [
            { qHe: "במה Order-budgeting שונה מ-Planning?", aHe: "Planning הוא אומדן ללא בקרה; Order-budgeting מקצה תקציב-מאושר עם AVAC החוסם/מתריע על חריגה ברמת-הפקודה." },
            { qHe: "היכן נשמר תקציב-Order?", aHe: "ב-BPGE (total) ו-BPJA (annual) לפי Order-Number; מנוהל ב-KO22/KO24." },
          ],
          takeawaysHe: [
            "Order-budgeting = תקרת-עלות לפקודה-בודדת עם AVAC.",
            "BPGE/BPJA + KO22/KO24 + Tolerance-Limits.",
            "בקרה-מקדימה ברגע-המחויבות.",
          ],
          relatedHe: [{ labelHe: "PM Academy · פקודות-תחזוקה", href: "/library/pm-academy/" }],
        },
        // -------------------------------------------------- 8.3.2
        {
          id: "8.3.2",
          titleHe: "תקצוב מרכז עלות (Cost Center Budgeting)",
          titleEn: "Cost Center Budgeting",
          execHe:
            "Cost-center budgeting מקצה תקציב לאזור-אחריות-תחזוקתי (קו, אזור, Planner-Group) ברמת-Cost-Center. בעולם ה-CO-OM הקלאסי זהו Plan (KP06) ללא AVAC-חוסם; לבקרה-חוסמת משתמשים ב-Commitment-Management או מפנים ל-Order/WBS. עדיין, זהו הבסיס לדיווח Plan/Actual תקופתי של מרכז-תחזוקה.",
          beginnerHe:
            "במקום לתקצב כל Order בנפרד, אפשר לתת תקציב לכל 'מחלקת-תחזוקה' שלמה — קו-מילוי, אזור. כך רואים אם המחלקה-כולה בתוך-התקציב. החיסרון: התקצוב-הקלאסי של מרכז-עלות לרוב לא חוסם הוצאה, רק מאפשר השוואה.",
          consultantHe:
            "Cost-Center Planning (KP06/KP07) מזין plan לפי Cost-Element/Period ב-COSP/COSS. ה-CO-OM הקלאסי אינו מספק AVAC-חוסם ברמת-Cost-Center כברירת-מחדל (להבדיל מ-Internal-Order/WBS/IM). לבקרה-אקטיבית: Commitment-Management (ME21N→COOI) + דיווח Plan/Actual/Variance (S_ALR_*), או הפניית-עלות-תחזוקה ל-Orders מתוקצבים המסולקים ל-Cost-Center. ב-S/4HANA תכנון יושב גם ב-ACDOCP (plan) מול ACDOCA (actual). מבוקרי-תחזוקה מחמירים מעדיפים Order/WBS ל-hard-stop.",
          purposeHe:
            "לקבוע מסגרת-עלות-תקופתית לאזור-תחזוקה שלם ולמדוד Plan/Actual ברמת-מנהל-המחלקה — בקרה-ניהולית גם כשאין חסימה-אוטומטית.",
          processExampleHe:
            "מרכז-עלות 'Maint-Line-PET' מקבל Plan-שנתי 1.2M₪ (KP06), מפולח לחודשים ולקטגוריות (עבודה/חומר/חוץ). מדי-חודש מנהל-התחזוקה מריץ דוח Plan/Actual (S_ALR_87013611) ובוחן סטיות. עלויות מגיעות דרך Settlement של Orders ל-Cost-Center.",
          scenarioHe:
            "בארגון: כל קו-מילוי הוא Cost-Center עם Plan-שנתי. מנהל-המפעל עוקב אחר Plan/Actual של כל הקווים, מזהה קו שחורג, ומתחקר — האם תחזוקה-מתקנת עלתה (סימן-בלאי) או מחיר-חלקים.",
          navHe: [
            "Controlling ► Cost Center Accounting ► Planning ► Manual Planning ► Define User-Defined Planner Profiles",
            "Controlling ► Cost Center Accounting ► Planning ► Basic Settings for Planning ► Define Versions",
          ],
          tables: ["COSP", "COSS", "CSKS", "ACDOCP"],
          tcodes: ["KP06", "KP07", "KP26", "S_ALR_87013611"],
          fiori: ["F0967", "F2764"],
          configHe: [
            "Planner Profile / Layouts: מסכי-תכנון ידני (KP06) לפי Cost-Element/Period.",
            "Versions (OKEQ): גרסת-תכנון (0 actual-relevant) להשוואת Plan/Actual.",
            "KP26: תכנון Activity-Rates (תעריפי-עבודה) המזינים עלות-Confirmation.",
            "הערה: אין AVAC-חוסם קלאסי ברמת-Cost-Center — לבקרה השתמש ב-Order/WBS/IM.",
          ],
          flow: [
            { he: "תכנון-Plan", code: "KP06", note: "לפי Cost-Element" },
            { he: "תעריפי-Activity", code: "KP26", note: "עבודה" },
            { he: "Actual דרך Settlement", code: "KO88", note: "מ-Orders" },
            { he: "דוח Plan/Actual", code: "S_ALR", note: "סטיות" },
            { he: "תחקור-חריגה", code: "Variance", note: "החלטה" },
          ],
          mistakesHe: [
            "ציפייה ל-hard-block ברמת-Cost-Center-קלאסי ➔ אין כזה כברירת-מחדל.",
            "תכנון ללא תעריפי-KP26 ➔ עלות-Confirmation שגויה/אפס.",
            "גרסת-תכנון שגויה ➔ Plan לא מופיע מול Actual.",
          ],
          troubleshootHe: [
            "Plan לא נראה בדוח ➔ Version/שנה שגויים או Layout לא-תואם.",
            "עלות-עבודה אפס ➔ KP26 לא-מתוכנן או Activity-Type לא-משויך.",
            "Actual לא מגיע ל-Cost-Center ➔ Settlement-Rule של Orders שגוי.",
          ],
          bestPracticeHe: [
            "תכנן KP26 לפני העונה — בלעדיו עלות-עבודה לא נכונה.",
            "ל-hard-control הפנה עלות דרך Orders/WBS מתוקצבים.",
            "סקור Plan/Actual חודשי ברמת-Cost-Center עם מנהלי-המחלקות.",
          ],
          interviewHe: [
            { qHe: "האם Cost-Center-budgeting חוסם חריגה?", aHe: "ה-CO-OM הקלאסי לא מספק AVAC-חוסם ברמת-Cost-Center כברירת-מחדל; לבקרה-חוסמת משתמשים ב-Internal-Order/WBS/IM או ב-Commitment-Management." },
            { qHe: "מה תפקיד KP26 בתקצוב-תחזוקה?", aHe: "מתכנן תעריפי-Activity (עבודת-טכנאי/מכונה) המכפילים את שעות-ה-Confirmation לעלות — בסיס לעלות-עבודה מתוכננת ובפועל." },
          ],
          takeawaysHe: [
            "Cost-Center-budgeting = מסגרת-תקופתית לאזור-תחזוקה.",
            "קלאסי ≈ Plan (KP06) ללא AVAC-חוסם.",
            "KP26 קריטי לעלות-העבודה.",
            "ל-hard-stop הפנה ל-Order/WBS/IM.",
          ],
          relatedHe: [{ labelHe: "PM Academy · מרכזי-עלות-תחזוקה", href: "/library/pm-academy/" }],
        },
        // -------------------------------------------------- 8.3.3
        {
          id: "8.3.3",
          titleHe: "תקצוב באמצעות תוכניות ניהול-השקעות (Investment Management)",
          titleEn: "Budgeting by Using Investment Management Programs",
          execHe:
            "Investment Management (IM) מנהל תקציבי-השקעות-הון בהיררכיית-תוכנית מלמעלה-למטה. Investment Program מחולק ל-Program-Positions, ותקציב מחולק (distributed) ל-Measures — Orders או WBS-Elements. זהו הכלי לתקצב פרויקטי-תחזוקה-הוניים גדולים (החלפת-קו, שדרוג-מתקן) עם בקרת-זמינות.",
          beginnerHe:
            "כשהתחזוקה היא לא 'תיקון קטן' אלא השקעה-גדולה — להחליף קו-מילוי שלם — צריך לנהל את התקציב מלמעלה: ההנהלה קובעת תקציב-השקעה-כולל, מחלקת לפרויקטים, וכל פרויקט מקבל את חלקו. IM הוא העץ-ההיררכי שמנהל את החלוקה הזו ומבטיח שלא חורגים מהסכום-העליון.",
          consultantHe:
            "מבנה: Investment Program (IM01) ► Program-Positions (היררכיה) ► Budget distribution (IM52) ל-Measures (Internal-Orders עם Investment-Profile, או WBS). תקציב נשמר ב-BPGE/BPJA לתוכנית ול-Measures; AVAC פעיל ברמת-ה-Measure. Capitalization: עלות נאספת על ה-Measure (AuC — Asset under Construction) ומסולקת ל-Final-Asset ב-Settlement (KO88/CJ88). Investment-Profile (OITA) קושר Order/WBS ל-AuC אוטומטי. Roll-up מאפשר לראות actuals מצטברים במעלה-ההיררכיה. ב-S/4HANA המודל נשמר עם simplifications ב-Asset-Accounting.",
          purposeHe:
            "לנהל השקעות-הון-תחזוקתיות-גדולות במשמעת-תקציב-היררכית, להבטיח שסך-ההשקעות לא חורג מהמסגרת-המאושרת, ולהון (capitalize) נכון את העלות לנכס.",
          processExampleHe:
            "תוכנית-השקעה-שנתית 20M₪ (IM01). Position 'Bottling-Upgrade' מקבלת 8M₪ (IM52), מחולקים ל-3 Orders/WBS (החלפת-ממלא, מערכת-CIP, רובוט-פליטה). כל Measure צובר עלות כ-AuC; AVAC חוסם חריגה; בסיום Settlement מהון ל-Final-Asset (ציוד-חדש).",
          scenarioHe:
            "בארגון: פרויקט הכנסת קו-PET-חדש מנוהל כ-Investment-Program-Position; תקציב-ההון מחולק ל-Measures (מכונות, צנרת, אוטומציה); העלויות נצברות כ-AuC ומהוונות לנכסים בעת ה-go-live — בשליטת-תקציב מלאה.",
          navHe: [
            "Investment Management ► Investment Programs ► Master Data ► Define Program Types",
            "Investment Management ► Investment Programs ► Budgeting in Program ► Define Budget Profiles",
            "Investment Management ► Internal Orders as Investment Measures ► Define Investment Profile",
          ],
          tables: ["IMPR", "IMAV", "BPGE", "BPJA", "ANLC"],
          tcodes: ["IM01", "IM22", "IM52", "IMA11", "KO88"],
          fiori: ["F2929"],
          configHe: [
            "Program Type / Budget Profile: מבנה-תוכנית, שנים, total/annual, AVAC.",
            "Investment Profile (OITA): קישור Order/WBS ל-AuC לצבירה-והיוון.",
            "Budget Distribution (IM52): חלוקת-תקציב מ-Program ל-Measures.",
            "Settlement: AuC → Final Asset בעת השלמת-ההשקעה.",
          ],
          flow: [
            { he: "Investment Program", code: "IM01", note: "תקציב-על" },
            { he: "Program Positions", code: "Hierarchy", note: "חלוקה" },
            { he: "Distribution ל-Measures", code: "IM52", note: "Orders/WBS" },
            { he: "צבירת-עלות כ-AuC", code: "Actual", note: "AVAC" },
            { he: "היוון לנכס", code: "KO88", note: "Final Asset" },
          ],
          mistakesHe: [
            "אי-קישור Investment-Profile ➔ עלות לא נצברת כ-AuC, היוון שגוי.",
            "Distribution לא תואם total-program ➔ AVAC חוסם Measures בטעות.",
            "ערבוב תחזוקה-שוטפת (OpEx) בתוכנית-השקעה (CapEx) ➔ דיווח-הוני מעוות.",
          ],
          troubleshootHe: [
            "Measure נחסם למרות תקציב ➔ Distribution לא בוצע מ-Program ל-Measure.",
            "עלות לא מהוונת ➔ Investment-Profile חסר או Settlement-Rule שגוי.",
            "actuals לא מתגלגלים ➔ roll-up לא הורץ בהיררכיה.",
          ],
          bestPracticeHe: [
            "הפרד CapEx (IM/WBS) מ-OpEx (Order/Cost-Center budgeting).",
            "קשר Investment-Profile מראש לכל Measure.",
            "נהל Distribution לפי שלבי-הפרויקט; אל תחלק הכל מראש.",
            "סלק ל-Final-Asset רק עם go-live לקבל-פחת נכון.",
          ],
          interviewHe: [
            { qHe: "מהו Measure ב-IM?", aHe: "האובייקט המבצע — Internal-Order (עם Investment-Profile) או WBS-Element — שמקבל תקציב מה-Program, צובר עלות כ-AuC ומהוון לנכס." },
            { qHe: "מה ההבדל בין IM ל-Order-budgeting פשוט?", aHe: "IM מנהל היררכיית-תקציב-הון מלמעלה-למטה עם distribution, roll-up והיוון-נכס; Order-budgeting מבקר פקודה-בודדת ללא היררכיה ולרוב ללא היוון." },
          ],
          takeawaysHe: [
            "IM = תקצוב-השקעות-הון היררכי מלמעלה-למטה.",
            "Program → Positions → Measures (Orders/WBS).",
            "עלות נצברת כ-AuC ומהוונת ל-Final-Asset.",
            "הפרד CapEx מ-OpEx.",
          ],
          relatedHe: [{ labelHe: "PM Academy · השקעות-הון בתחזוקה", href: "/library/pm-academy/" }],
        },
        // -------------------------------------------------- 8.3.4
        {
          id: "8.3.4",
          titleHe: "תקצוב באמצעות אלמנטי WBS",
          titleEn: "Budgeting Using WBS Elements",
          execHe:
            "WBS budgeting מתקצב פרויקטי-תחזוקה דרך Work Breakdown Structure (WBS) ב-PS. כל WBS-Element נושא תקציב עם Availability-Control משלו, ו-Maintenance-Orders משויכים אליו כ-account-assignment. מתאים לעצירות-תחזוקה-מתוכננות (Shutdowns/Turnarounds) רב-עבודתיות הדורשות מבנה-פרויקט ובקרת-תקציב מדורגת.",
          beginnerHe:
            "לפעמים תחזוקה היא 'פרויקט' שלם — עצירת-מפעל-שנתית עם מאות-משימות. אז מנהלים אותה כפרויקט (WBS): עץ-משימות שכל ענף שלו מקבל תקציב, וכל פקודת-תחזוקה תלויה בענף המתאים. כך רואים תקציב-וביצוע לכל חלק-של-העצירה.",
          consultantHe:
            "Project-Builder (CJ20N) בונה WBS-Hierarchy; כל WBS-Element מקבל תקציב (CJ30 original / CJ31 supplement) עם Budget-Profile ו-AVAC. Maintenance-Orders מקבלים את ה-WBS כ-settlement-receiver או כ-account-assignment, כך שעלותם נצברת לפרויקט. תקציב נשמר ב-BPGE/BPJA לפי PSPNR (PRPS). Bottom-up budgeting + top-down distribution (CJ30). מתאים ל-Shutdown/Turnaround/Revamp. ב-S/4HANA PS נשמר; commitments ו-actuals זורמים ל-ACDOCA תחת ה-WBS.",
          purposeHe:
            "לנהל תחזוקה-פרויקטלית רב-עבודתית עם מבנה-עבודה-מדורג ובקרת-תקציב לכל-ענף — נראות-וגמישות שאין ב-Order-בודד, והקצאת-עלות לפי שלבי-הפרויקט.",
          processExampleHe:
            "Turnaround-שנתי מנוהל כפרויקט: WBS-Top 'TA-2026' עם תקציב 5M₪, מחולק ל-WBS-Elements לפי-אזור (Boiler/Filler/Utilities). כל אזור מקבל תקציב; Maintenance-Orders משויכים ל-WBS-המתאים; AVAC חוסם חריגה-לפי-אזור; דוח-פרויקט (CN41N/S_ALR) מציג Plan/Budget/Actual/Commitment.",
          scenarioHe:
            "בארגון: עצירת-תחזוקה-שנתית של מפעל-הבקבוק מנוהלת כ-WBS — ענף לכל מערכת (קיטור, מילוי, CIP, חשמל). תקציב-עצירה מחולק לענפים, וכל פק\"ע-עצירה נצברת לענף-שלה, מאפשר בקרת-תקציב-עצירה מדויקת.",
          navHe: [
            "Project System ► Costs ► Budget ► Maintain Budget Profile",
            "Project System ► Costs ► Budget ► Define Tolerance Limits",
            "Project System ► Structures ► Operative Structures ► Work Breakdown Structure (WBS)",
          ],
          tables: ["PRPS", "PROJ", "BPGE", "BPJA", "COSP"],
          tcodes: ["CJ20N", "CJ30", "CJ31", "CJ33", "CN41N"],
          fiori: ["F2929", "F0967"],
          configHe: [
            "Project Profile / Budget Profile: מבנה, שנים, total/annual, AVAC.",
            "Tolerance Limits (PS): ספי-warning/error לפרויקט.",
            "Budgeting (CJ30/CJ31): original ו-supplement/return/transfer לכל WBS-Element.",
            "Assignment: Maintenance-Order → WBS כ-settlement-receiver/account-assignment.",
          ],
          flow: [
            { he: "בניית WBS", code: "CJ20N", note: "עץ-משימות" },
            { he: "תקצוב-ענפים", code: "CJ30", note: "AVAC" },
            { he: "שיוך Orders", code: "IW31", note: "ל-WBS" },
            { he: "צבירת-עלות", code: "Actual", note: "לפרויקט" },
            { he: "דוח-פרויקט", code: "CN41N", note: "Plan/Budget/Actual" },
          ],
          mistakesHe: [
            "תקצוב WBS-Top בלבד בלי distribution לענפים ➔ אין בקרה-מדורגת.",
            "אי-שיוך Orders ל-WBS ➔ עלות לא נצברת לפרויקט.",
            "שימוש ב-WBS לתחזוקה-שוטפת-קטנה ➔ over-structure מיותר.",
          ],
          troubleshootHe: [
            "AVAC חוסם ענף ➔ תקציב לא חולק לאותו WBS-Element (CJ30).",
            "עלות-Order לא בפרויקט ➔ Order לא משויך ל-WBS / Settlement שגוי.",
            "תקציב לא נראה ➔ נרשם לשנה/Version שגויים.",
          ],
          bestPracticeHe: [
            "השתמש ב-WBS ל-Shutdowns/Turnarounds רב-עבודתיים בלבד.",
            "חלק תקציב לענפים (top-down) לבקרה-מדורגת.",
            "שייך כל Maintenance-Order ל-WBS-Element הנכון.",
            "נטר Commitment+Actual מול Budget בדוח-פרויקט.",
          ],
          interviewHe: [
            { qHe: "מתי WBS-budgeting ולא Order-budgeting?", aHe: "כשהתחזוקה היא פרויקט רב-משימתי (Shutdown/Turnaround) הדורש מבנה-עבודה-מדורג ובקרת-תקציב לכל-ענף, מעבר לפקודה-בודדת." },
            { qHe: "כיצד עלות-Order מגיעה ל-WBS?", aHe: "ה-Maintenance-Order משויך ל-WBS-Element כ-settlement-receiver או account-assignment, כך שעלותו נצברת לפרויקט." },
          ],
          takeawaysHe: [
            "WBS-budgeting = תקצוב תחזוקה-פרויקטלית מדורגת.",
            "כל WBS-Element נושא תקציב + AVAC.",
            "Orders משויכים ל-WBS וצוברים עלות לפרויקט.",
            "מתאים ל-Shutdowns/Turnarounds.",
          ],
          relatedHe: [{ labelHe: "PM Academy · עצירות-תחזוקה ופרויקטים", href: "/library/pm-academy/" }],
        },
        // -------------------------------------------------- 8.3.5
        {
          id: "8.3.5",
          titleHe: "תקצוב עלות תחזוקה (Maintenance Cost Budgeting)",
          titleEn: "Maintenance Cost Budgeting",
          execHe:
            "Maintenance Cost Budgeting הוא כלי-PM-ייעודי המתקצב עלות-תחזוקה ברמת-אובייקט-תחזוקתי — Functional-Location, Equipment או Planner-Group — לתקופה, ומשווה מול עלות-הפקודות-בפועל. הוא ממלא את הפער בין תקצוב-CO-גנרי לבין שפת-התחזוקה היומיומית, ומאפשר תכנון-תקציב 'בשפה של תחזוקה'.",
          beginnerHe:
            "כלי-התקצוב הקודמים (Order/Cost-Center/IM/WBS) הם 'שפת-כספים'. Maintenance Cost Budgeting הוא 'שפת-תחזוקה': מתקצבים ישירות לפי ציוד, מיקום-פונקציונלי או קבוצת-מתכננים — בדיוק האובייקטים שמנהל-התחזוקה חושב בהם — ומשווים לעלות-הפק\"ע-בפועל על אותם אובייקטים.",
          consultantHe:
            "הכלי מאפשר Budget per maintenance-object (Functional-Location/Equipment/Planner-Group/Cost-Center) לתקופה, ומתאים מול actuals של Maintenance-Orders המשויכים לאותו אובייקט (דרך AUFK↔ILOA↔AFIH). הוא מאפשר תכנון top-down (תקציב-שנתי לאזור ➔ פירוק לאובייקטים) ומעקב bottom-up (actuals מצטברים מהפקודות). בחלק מהמהדורות זה מיושם דרך מבנה-תקצוב-PM ייעודי / Flexible-Planning, ובאחרות נשען על Internal-Order/Cost-Center budgeting + Value-Categories. הליבה: לתקצב ולמדוד 'בשפת-תחזוקה' עם נראות לפי-אובייקט, ולעיתים עם AVAC דרך ה-Orders המשויכים.",
          purposeHe:
            "לתת למנהל-התחזוקה כלי-תקצוב במונחים שלו (ציוד/מיקום/קבוצת-מתכננים), לזהות אילו אובייקטים צורכים-תקציב-יתר, ולבסס החלטות-החלפה/שיפור על תקציב-מול-ביצוע ברמת-הנכס.",
          processExampleHe:
            "מנהל-תחזוקה מתקצב 800K₪ ל-Planner-Group 'PG-Filling' לשנה, מפולח ל-Functional-Locations של קווי-המילוי. במהלך-השנה, actuals של כל Maintenance-Orders המשויכים לאותם FLOCs נאספים ומושווים מול התקציב-לפי-אובייקט. FLOC שחורג-באופן-עקבי מסומן למועמדות-החלפה.",
          scenarioHe:
            "בארגון: תקציב-התחזוקה-השנתי מפולק ל-Functional-Locations של כל קו-מילוי ולכל Planner-Group. בקר-התחזוקה רואה 'cost-per-FLOC' מול-תקציב, מזהה את הממלא-הישן שצורך תקציב-יתר, ומזין את הנתון לתוכנית-ההשקעות (8.3.3) להחלפתו.",
          navHe: [
            "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Basic Settings ► Define Default Values for Value Categories",
            "Plant Maintenance and Customer Service ► Maintenance and Service Processing ► Maintenance and Service Orders ► Functions and Settings for Order Types ► Costing Data",
            "Controlling ► Internal Orders ► Budgeting and Availability Control ► Maintain Budget Profile (תקציב מיושם דרך ה-Orders המשויכים)",
          ],
          tables: ["AUFK", "ILOA", "AFIH", "COVP", "BPJA"],
          tcodes: ["IW38", "IP30", "KO22", "S_ALR_87013533", "MCI3"],
          fiori: ["F2929", "F0967"],
          configHe: [
            "Value Categories: מיפוי Cost-Elements לקטגוריות-PM (עבודה/חומר/חוץ) להשוואת תקציב/actual לפי-קטגוריה.",
            "Reference object linkage (ILOA): קישור Order ל-FLOC/Equipment לצבירת-עלות-לפי-אובייקט.",
            "Budget application: תקציב לפי-אובייקט מיושם דרך Order/Cost-Center budgeting + AVAC.",
            "Planner-Group / Cost-Center assignment: בסיס לאגרגציה 'בשפת-תחזוקה'.",
          ],
          flow: [
            { he: "תקציב לפי-אובייקט", code: "FLOC/Equip", note: "שפת-תחזוקה" },
            { he: "פירוק לתקופות", code: "Top-down", note: "שנתי→חודשי" },
            { he: "Orders משויכים", code: "ILOA", note: "צבירה" },
            { he: "actual לפי-אובייקט", code: "COVP", note: "Bottom-up" },
            { he: "תקציב-מול-ביצוע", code: "S_ALR", note: "החלטה" },
          ],
          masterDataHe: [
            "ILOA = אובייקט-מיקום (FLOC/Equipment/Cost-Center) המקשר את ה-Order לאובייקט-התחזוקתי.",
            "Planner-Group (T024I) = יחידת-אגרגציה ארגונית לתקצוב 'בשפת-תחזוקה'.",
            "Value-Categories = פילוח-עלות לעבודה/חומר/שירות-חיצוני להשוואה.",
          ],
          mistakesHe: [
            "תקצוב 'בשפת-תחזוקה' בלי מיפוי-Value-Categories ➔ אי-אפשר להשוות actual לפי-קטגוריה.",
            "אי-קישור Orders ל-FLOC/Equipment (ILOA) ➔ עלות לא נצברת לאובייקט.",
            "בלבול בין תקציב-תחזוקה-שוטפת (OpEx) להשקעות (CapEx/IM).",
          ],
          troubleshootHe: [
            "עלות לא מצטברת לאובייקט ➔ Order ללא Reference-Object (ILOA) או FLOC שגוי.",
            "השוואת-קטגוריות ריקה ➔ Cost-Elements לא ממופים ל-Value-Categories.",
            "תקציב לא חוסם ➔ AVAC לא מיושם דרך ה-Orders המשויכים.",
          ],
          bestPracticeHe: [
            "תקצב 'בשפת-תחזוקה' (FLOC/Equipment/Planner-Group) אך יישם AVAC דרך ה-Orders.",
            "הגדר Value-Categories מההתחלה לפילוח עבודה/חומר/חוץ.",
            "קשר כל Maintenance-Order לאובייקט-התייחסות לצבירה-נכונה.",
            "השתמש ב-cost-per-object לזיהוי מועמדי-החלפה והזנת תוכנית-השקעות.",
          ],
          interviewHe: [
            { qHe: "במה Maintenance Cost Budgeting שונה מ-Order-budgeting?", aHe: "הוא מתקצב ומודד 'בשפת-תחזוקה' לפי Functional-Location/Equipment/Planner-Group במקום פקודה-בודדת או מספר-Order גנרי, ומאחד actuals של כל הפקודות המשויכות לאותו אובייקט." },
            { qHe: "כיצד עלות-פקודה נקשרת לאובייקט-התחזוקתי?", aHe: "דרך ה-Reference-Object (ILOA) של ה-Order — FLOC/Equipment/Cost-Center — המאפשר אגרגציה לפי-אובייקט." },
          ],
          takeawaysHe: [
            "Maintenance Cost Budgeting = תקצוב 'בשפת-תחזוקה' לפי FLOC/Equipment/Planner-Group.",
            "מאחד actuals של Orders משויכים מול תקציב-לפי-אובייקט.",
            "דורש Value-Categories וקישור-ILOA תקין.",
            "מזין החלטות-החלפה ותוכנית-השקעות.",
          ],
          relatedHe: [
            { labelHe: "PM Academy · תקציב-תחזוקה לפי-ציוד", href: "/library/pm-academy/" },
            { labelHe: "אובייקט · ILOA", href: "/library/pm/object/ILOA/" },
          ],
        },
      ],
    },
    // ============================================================ 8.4
    {
      id: "8.4",
      titleHe: "סיכום",
      titleEn: "Summary",
      execHe:
        "בקרת-תחזוקה היא מעגל-שלם: לתכנן תקציב, לאסוף עלות על ה-Maintenance-Order, להפיק מידע בכלי-המתאים, ולהשוות Plan/Actual לקבלת-החלטות. הפרק כיסה את שני העמודים — הפקת-מידע (ALV→SQVI→LIS→BW/4HANA→Lumira) ותקצוב (Order/Cost-Center/IM/WBS/Maintenance-Cost-Budgeting) — והדגיש מתי-כל-כלי ומה הופך ב-S/4HANA.",
      beginnerHe:
        "סיכמנו: תחזוקה עולה כסף, ולכן צריך גם לראות את העלות (כלי-מידע) וגם לרסן אותה מראש (כלי-תקצוב). יש סולם-כלי-מידע מהקל לכבד, ויש חמש-דרכי-תקצוב לפי-גודל-וסוג-העבודה. הבחירה הנכונה חוסכת זמן וכסף.",
      consultantHe:
        "ברמת-המימוש: ודא זרימת-עלות תקינה Order→Settlement, מיפוי-Value-Categories, ובחירת-כלי-מידע לפי עומק-הניתוח. בתקצוב, הבחן Planning מ-Budgeting, הפעל Availability-Control היכן-שנדרשת-בקרה-חוסמת, והפרד CapEx (IM/WBS) מ-OpEx (Order/Cost-Center/Maintenance-Cost-Budgeting). ב-S/4HANA: ACDOCA מאחד-דיווח, Embedded-Analytics מחליף-LIS לתפעולי, ו-BW/4HANA נשאר לאסטרטגי-חוצה-מערכות. שלוט בקישורים AUFK↔COEP↔ILOA כדי לחבר עלות-לאובייקט-תחזוקתי.",
      purposeHe:
        "לאחד את הפרק לתמונת-עבודה אחת: בקרת-תחזוקה אפקטיבית = מידע-נכון בכלי-הנכון + תקצוב-חוסם-במקום-הנכון, המבוססים על נתוני-Order נקיים ועל הבנת-זרימת-העלות.",
      processExampleHe:
        "מחזור-שנתי טיפוסי: (1) תקצוב — IM להשקעות, WBS לעצירות, Order/Maintenance-Cost-Budgeting לשוטף, עם AVAC. (2) ביצוע — Orders אוספים עלות ומסולקים. (3) מידע — ALV/SQVI לתפעול, LIS/Embedded למגמה, BW/Lumira להנהלה. (4) החלטה — Plan/Actual מזין תקציב-השנה-הבאה.",
      scenarioHe:
        "בארגון: המעגל סוגר את-עצמו — תקציב-תחזוקה-שנתי לפי-קו ➔ Orders עם AVAC ➔ דשבורד-Lumira של cost-per-case ➔ זיהוי-קו-בעייתי ➔ תוכנית-השקעה-להחלפה ➔ תקציב-שנה-הבאה. בקרת-תחזוקה הופכת מ'מרכז-עלות-עיוור' למנוע-החלטות.",
      navHe: [
        "(סיכום — ראה נתיבי-ה-SPRO בכל תת-פרק: Value-Categories, Budget-Profiles, Tolerance-Limits, LIS-Update)",
      ],
      tables: ["AUFK", "COEP", "ACDOCA", "BPJA", "ILOA"],
      tcodes: ["IW38", "KO88", "KO22", "MCI8", "S_ALR_87013533"],
      fiori: ["F2929", "F0967", "F2691"],
      configHe: [
        "Information tools: בחר ALV/SQVI/LIS/BW/Lumira לפי עומק-הניתוח.",
        "Budgeting tools: בחר Order/Cost-Center/IM/WBS/Maintenance-Cost-Budgeting לפי סוג-העבודה.",
        "ודא: Settlement-Rules, Value-Categories, Budget-Profiles + Availability-Control.",
        "S/4HANA: ACDOCA + Embedded-Analytics לתפעולי, BW/4HANA לאסטרטגי.",
      ],
      flow: [
        { he: "תקצוב", code: "IM/WBS/Order", note: "מקדים" },
        { he: "ביצוע ➔ עלות", code: "Order", note: "Settlement" },
        { he: "הפקת-מידע", code: "ALV→BW", note: "ניתוח" },
        { he: "Plan/Actual", code: "Variance", note: "החלטה" },
        { he: "תקציב-הבא", code: "Cycle", note: "סגירת-מעגל" },
      ],
      mistakesHe: [
        "תקצוב ללא בקרת-זמינות ➔ תקציב-דקורטיבי.",
        "כלי-מידע כבד כשפשוט הספיק (over-engineering) או להפך (אין-נראות).",
        "ערבוב CapEx/OpEx ➔ דיווח מעוות.",
        "נתוני-Order מלוכלכים ➔ כל הבקרה מעליהם שגויה.",
      ],
      troubleshootHe: [
        "בקרה לא-אפקטיבית ➔ בדוק Settlement, Value-Categories ו-AVAC.",
        "סטיות לא-מוסברות ➔ עלות שהגיעה אחרי TECO או Commitments לא-מנוטרים.",
        "דיווח-הנהלה לא-עקבי ➔ אין מקור-אמת-יחיד ל-KPIs.",
      ],
      bestPracticeHe: [
        "סגור מעגל: תקצוב ➔ ביצוע ➔ מידע ➔ החלטה ➔ תקציב-הבא.",
        "התאם כלי-למשימה בשתי-המשפחות (מידע ותקצוב).",
        "הפעל AVAC ו-Value-Categories — הם תשתית-הבקרה.",
        "נצל S/4HANA: ACDOCA + Embedded-Analytics לדיווח-בזמן-אמת.",
      ],
      interviewHe: [
        { qHe: "מהם שני העמודים של בקרת-תחזוקה?", aHe: "הפקת-מידע (ALV/SQVI/LIS/BW/Lumira) ותקצוב (Order/Cost-Center/IM/WBS/Maintenance-Cost-Budgeting), שניהם מעל נתוני-Order נקיים וזרימת-עלות-Settlement תקינה." },
        { qHe: "מה השינוי-המרכזי שמביא S/4HANA לבקרת-תחזוקה?", aHe: "ה-Universal-Journal (ACDOCA) מאחד FI+CO לדיווח-בזמן-אמת, Embedded-Analytics מחליף LIS לתפעולי, ו-BW/4HANA נשמר לאסטרטגי-חוצה-מערכות." },
      ],
      takeawaysHe: [
        "בקרת-תחזוקה = מעגל: תקצוב → ביצוע → מידע → החלטה.",
        "שני עמודים: כלי-מידע (סולם ALV→Lumira) וכלי-תקצוב (5 דרכים).",
        "AVAC + Value-Categories הם תשתית-הבקרה.",
        "S/4HANA: ACDOCA + Embedded-Analytics; BW/4HANA לאסטרטגי.",
      ],
      relatedHe: [
        { labelHe: "PM Academy · מעגל בקרת-תחזוקה", href: "/library/pm-academy/" },
      ],
    },
  ],
};
