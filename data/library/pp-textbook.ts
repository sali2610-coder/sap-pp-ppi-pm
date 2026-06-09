// ===== PP Digital Textbook — Chapter 3 (gold-standard learning chapter) =====
// SAP-Learning-Hub / SAP-Press grade. Every node (parent + nested source
// sub-heading) is a complete LearningNode with 18 facets of authored Hebrew —
// enough to study the topic without the original book. Hierarchy follows the
// source book exactly; corrupted parent labels from the PDF TOC extraction were
// corrected, coherent source sub-headings preserved verbatim in original order.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.

export interface FlowStep { he: string; code?: string; note?: string }
export interface QA { qHe: string; aHe: string }
export interface RelatedLink { labelHe: string; href: string }

export interface LearningNode {
  id: string;
  titleHe: string;
  titleEn: string;
  // 1–3 explanations at three levels
  execHe: string;        // executive
  beginnerHe: string;    // beginner / first-principles
  consultantHe: string;  // consultant / deep
  // 4–6 context + examples
  purposeHe: string;          // business purpose
  processExampleHe: string;   // real end-to-end process example
  cbcHe: string;              // CBC production example
  // 7–11 reference
  navHe: string[];    // SAP navigation + SPRO path(s)
  tables: string[];
  tcodes: string[];
  fiori: string[];
  // 12–13
  configHe: string[];      // configuration details
  flow?: FlowStep[];       // process-flow diagram
  masterDataHe?: string[]; // master-data impact
  // 14–16
  mistakesHe: string[];      // common mistakes
  troubleshootHe: string[];  // troubleshooting scenarios
  bestPracticeHe: string[];  // best practices
  // 17–18
  interviewHe: QA[];     // interview questions
  takeawaysHe: string[]; // key takeaways
  relatedHe?: RelatedLink[]; // links to related PP / PP-PI concepts
  children?: LearningNode[];
}

export interface TextbookChapter {
  n: number;
  titleHe: string;
  titleEn: string;
  introHe: string;
  subchapters: LearningNode[];
}

// reading-time estimate (Hebrew ~180 wpm) per node, recursive
export function nodeWordCount(n: LearningNode): number {
  const txt = [
    n.execHe, n.beginnerHe, n.consultantHe, n.purposeHe, n.processExampleHe, n.cbcHe,
    ...n.configHe, ...(n.masterDataHe ?? []), ...n.mistakesHe, ...n.troubleshootHe,
    ...n.bestPracticeHe, ...n.takeawaysHe, ...n.interviewHe.flatMap((q) => [q.qHe, q.aHe]),
  ].join(" ");
  return txt.split(/\s+/).filter(Boolean).length;
}

export const PP_TEXTBOOK: Record<string, TextbookChapter> = {
  "3": {
    n: 3,
    titleHe: "הגדרת ייצור בדיד (Discrete Manufacturing Configuration)",
    titleEn: "Discrete Manufacturing Configuration",
    introHe:
      "פרק זה הוא יחידת-לימוד מלאה לקונפיגורציה של ייצור בדיד ב-SAP S/4HANA. כל תת-פרק וכל תת-סעיף מהספר המקורי הורחב ליחידת-לימוד עצמאית בת 18 מקטעים — שלוש רמות הסבר (מנהלים, מתחילים, יועצים), מטרה עסקית, דוגמת-תהליך אמיתית, דוגמת CBC, ניווט ו-SPRO, טבלאות/T-Codes/Fiori, פרטי קונפיגורציה, תרשים-תהליך, טעויות נפוצות, פתרון תקלות, שיטות מומלצות, שאלות-ראיון ומסקנות-מפתח. המטרה: ללמוד את הנושא ללא הספר המקורי.",
    subchapters: [
      // ============================================================ 3.1
      {
        id: "3.1", titleHe: "אב חומר לייצור", titleEn: "Material Master for Production",
        execHe:
          "אב החומר הוא רשומת-העל של כל פריט בארגון. בהקשר הייצור הוא מגדיר כיצד החומר מתוכנן, נרכש או מיוצר, מתומחר ומאוחסן. הוא הנכס הקריטי ביותר בנתוני-האב של PP: כל החלטת-תכנון של MRP, כל פק\"ע וכל חישוב-עלות נשענים עליו. שגיאה כאן מתפשטת לכל שרשרת-האספקה.",
        beginnerHe:
          "דמיין כרטיס-זהות לכל מוצר. הכרטיס מחולק ל'תצוגות' (Views) — כל תצוגה שייכת למחלקה אחרת: מכירות, רכש, תכנון (MRP), ייצור (Work Scheduling), כספים (Accounting). אותו מספר-חומר נושא את כל המידע, אך כל מחלקה רואה ומתחזקת רק את התצוגה שלה. בייצור בדיד התצוגות החשובות הן MRP 1–4 ו-Work Scheduling.",
        consultantHe:
          "אב החומר מאוחסן בשתי רמות: MARA (רמת-לקוח, נתונים כלל-ארגוניים) ו-MARC (רמת-מפעל, נתוני-תכנון). בעת מימוש שים לב ל-Material Type (קובע מסכים, טווחי-מספרים, סוגי-רכש), ל-Industry Sector, ול-MRP/Work Scheduling views כתנאי-סף ל-PP. ב-S/4HANA אב-החומר עבר ל-Business Partner-like simplification בתחומים מסוימים, אך מבנה ה-MARA/MARC נותר. שדה-מפתח: MARC-SFCPF (Production Scheduling Profile) — רבים שוכחים אותו וכך מאבדים שחרור/GR אוטומטי.",
        purposeHe:
          "המטרה: לתת ל-MRP את כל הפרמטרים לתכנן נכון — מתי (lead time), כמה (lot size), ומאיפה (procurement type). בנוסף הוא מחבר את הייצור ל-FI/CO דרך תצוגות Accounting/Costing, ומספק את הבסיס לתמחיר-תקן.",
        processExampleHe:
          "תכנון משקה מוגמר: MRP קורא את MARC-DISMM=PD, מזהה דרישה, מחשב כמות לפי Lot Size (DISLS), קובע תאריך-התחלה לפי In-house Production Time (DZEIT) ו-Scheduling Margin Key, ויוצר הזמנה-מתוכננת. ה-Production Scheduling Profile (SFCPF) קובע אם הפק\"ע תשוחרר אוטומטית בהמרה.",
        cbcHe:
          "ב-CBC: תרכיז, סוכר ו-CO2 = ROH מנוהלי-אצווה (Batch managed); המשקה המוגמר = FERT; תערובת-בסיס = HALB. לכל FERT/HALB מיוצר חובה למלא MRP views + Work Scheduling + Production Scheduling Profile, אחרת קווי-המילוי לא נכנסים לתכנון.",
        navHe: [
          "Logistics – General ► Material Master ► Basic Settings ► Material Types ► Define Attributes of Material Types (OMS2)",
          "Logistics – General ► Material Master ► Field Selection ► Maintain Field Selection for Data Screens (OMS9)",
          "Logistics – General ► Material Master ► Configuring the Material Master ► Maintain Order of Main and Additional Screens (OMT3E)",
        ],
        tables: ["MARA", "MARC", "MAKT", "MARD", "MBEW", "MVKE"],
        tcodes: ["MM01", "MM02", "MM03", "MM17", "MMSC", "MD04", "MM50"],
        fiori: ["F1602A", "F0247", "F1422"],
        configHe: [
          "Material Type (OMS2): קובע אילו תצוגות נפתחות, Number Range (פנימי/חיצוני), Procurement Type מותר, ו-Price Control (S/V).",
          "Field Selection (OMS9): לכל שדה — חובה / אופציונלי / לקריאה / מוסתר, נשלט דרך Field Reference.",
          "Screen Sequence (OMT3E): רצף מסכים ובחירת-תצוגות לפי ענף ותפקיד-משתמש.",
          "Scheduling Margin Key (OPJK): Floats (Opening/Float before/after production) — בסיס לתאריכי ההזמנה-המתוכננת.",
        ],
        flow: [
          { he: "בחירת Material Type", code: "OMS2", note: "תצוגות + טווח-מספרים" },
          { he: "תצוגות בסיס + מכירות", code: "MM01" },
          { he: "פרמטרי MRP 1–4", code: "DISMM/DISLS" },
          { he: "Work Scheduling", code: "SFCPF", note: "פרופיל תזמון" },
          { he: "Accounting/Costing", code: "MBEW", note: "Price Control" },
          { he: "מוכן ל-MRP", code: "MD04" },
        ],
        masterDataHe: [
          "MARC-DISMM = MRP Type (PD/VB/ND) · MARC-DISLS = Lot Size · MARC-BESKZ = Procurement Type (E/F/X).",
          "MARC-SFCPF = Production Scheduling Profile · MARC-DZEIT = In-house Production Time.",
          "MARC-MTVFP = Availability Checking Group · MARC-FEVOR = Production Supervisor (MRP Controller לחוד: DISPO).",
          "MBEW-VPRSV = Price Control (S תקן / V ממוצע נע) · Safety Stock · Reorder Point · Strategy Group.",
        ],
        mistakesHe: [
          "פתיחת חומר ללא תצוגת MRP במפעל הרלוונטי — MRP מתעלם ממנו לחלוטין.",
          "השארת SFCPF ריק — אין שחרור/GR אוטומטי; הפק\"ע נתקעת ב-CRTD.",
          "Price Control V למוצר מיוצר במקום S — סטיות-עלות לא מנותחות נכון.",
          "MRP Type = ND בטעות — החומר 'נעלם' מהתכנון בלי הודעת-שגיאה.",
        ],
        troubleshootHe: [
          "MRP לא מייצר הזמנות ➔ בדוק DISMM≠ND, קיום תצוגת-MRP במפעל, ו-DISPO (MRP Controller) מאוכלס.",
          "תאריכי הזמנה-מתוכננת לא הגיוניים ➔ Scheduling Margin Key / In-house Production Time שגויים.",
          "החומר לא נכלל בהרצה ➔ חסר Plant/Storage extension (MMSC) או תצוגה במפעל.",
          "שגיאת-תמחיר בפק\"ע ➔ תצוגת Costing/Accounting חסרה או Valuation Class שגוי.",
        ],
        bestPracticeHe: [
          "השתמש ב-Mass Maintenance (MM17) להזנת פרמטרי-MRP אחידים בין חומרים.",
          "תקנן מעט MRP Types ו-Lot Sizes — פחות שונות, פחות שגיאות.",
          "הגדר Material Type Strategy אחידה מתואמת עם FI/CO ו-Valuation Classes.",
          "בנה Checklist לפתיחת-חומר-מיוצר: Basic+MRP1-4+WorkSched+Account+Cost — אל תסמוך על זיכרון.",
        ],
        interviewHe: [
          { qHe: "מה ההבדל בין MARA ל-MARC?", aHe: "MARA = נתונים ברמת-לקוח (כלל-ארגוני, למשל UoM בסיסי); MARC = נתונים ברמת-מפעל (פרמטרי-תכנון, MRP, ייצור). אותו חומר יכול להיות מתוכנן שונה בכל מפעל דרך MARC." },
          { qHe: "אילו תצוגות חובה לחומר מיוצר ב-PP?", aHe: "Basic Data, MRP 1–4, Work Scheduling, Accounting ו-Costing. ללא MRP ו-Work Scheduling ה-PP אינו פועל." },
          { qHe: "מה תפקיד ה-Production Scheduling Profile באב-החומר?", aHe: "השדה MARC-SFCPF; הוא קושר את החומר לאוטומציות פק\"ע — שחרור-אוטומטי, GR-אוטומטי, סגירה — שמוגדרות ב-OPKP." },
        ],
        takeawaysHe: [
          "אב-החומר הוא נקודת-הפתיחה של כל מימוש PP — שגיאה כאן מתפשטת לכל מקום.",
          "שתי רמות: MARA (לקוח) + MARC (מפעל); פרמטרי-התכנון יושבים ב-MARC.",
          "תצוגות MRP + Work Scheduling הן תנאי-סף לתכנון ולייצור.",
          "אל תשכח SFCPF, DISPO ו-Price Control — שלושת ה'נשכחים' הנפוצים.",
        ],
        relatedHe: [
          { labelHe: "PP · MRP ותכנון דרישות", href: "/library/pp/chapter-04/" },
          { labelHe: "PP · גרסת ייצור (3.10)", href: "/library/pp/chapter-03/#sub-3.10" },
          { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
        ],
      },
      // ============================================================ 3.2
      {
        id: "3.2", titleHe: "עץ מוצר (Bill of Materials)", titleEn: "Bill of Materials",
        execHe:
          "ה-BOM (עץ-מוצר) הוא הרשימה המובנית של כל הרכיבים הדרושים לייצור מוצר. הוא ה'מתכון' שממנו MRP גוזר דרישות-רכיבים, שהפק\"ע מפוצצת לשורות-צריכה, ושהתמחיר משתמש בו לחישוב עלות-חומר. ללא BOM תקין אין תכנון-רכיבים, אין הזמנות-רכש נגזרות ואין עלות-מוצר נכונה.",
        beginnerHe:
          "BOM הוא כמו מתכון: כותרת (המוצר) ורשימת-מצרכים (הרכיבים) עם כמויות. כל שורה היא רכיב אחד עם כמות ו'קטגוריה' שמסבירה מה הוא — פריט-מלאי, פריט-שירות, טקסט וכו'. כשמייצרים את המוצר, SAP 'מפוצץ' את המתכון ויודע בדיוק כמה מכל רכיב להוציא מהמלאי.",
        consultantHe:
          "מבנה הנתונים: STKO (כותרת — Base Quantity, Usage, Status), STPO (פריטים), STAS (קישור פריט↔Alternative), MAST (שיוך BOM↔חומר/מפעל), STZU (היסטוריה). ב-S/4HANA הבחירה בין Alternatives נעשית מועדפת דרך Production Version. שים לב להבחנה כמות-בסיס (Base Quantity בכותרת) מול כמות-רכיב — פחת מחושב על-בסיס שתיהן, וכפל-פחת (Assembly + Component) הוא תקלה נפוצה.",
        purposeHe:
          "ה-BOM מגדיר 'ממה' מורכב המוצר (לעומת ה-Routing שמגדיר 'כיצד'). הוא הבסיס ל-MRP (דרישות-תלויות), לפק\"ע (Reservations/דרישות-רכש), לתמחיר (Material costing) ולתיעוד-הנדסי (Engineering Change).",
        processExampleHe:
          "MRP מזהה דרישה ל-1,000 יח' מוצר. הוא קורא את ה-BOM, מפצץ אותו: לכל רכיב-מלאי (L) נוצרת דרישה-תלויה; אם חסר מלאי — הזמנה-מתוכננת/דרישת-רכש. בעת יצירת הפק\"ע, אותם רכיבים הופכים ל-Reservations (טבלת RESB) הממתינות למשיכה ברצפה.",
        cbcHe:
          "ב-CBC ה-BOM של משקה: תרכיז + סוכר + CO2 + מים מטופלים + בקבוק + פקק + תווית + אריזה, עם פחת-רכיב ~1% על חומרי-אריזה. רכיבי-מלאי = L; שירות-מעבדה חיצוני = N (דרישת-רכש ישירה).",
        navHe: [
          "Production ► Basic Data ► Bill of Material ► General Data ► BOM Usage ► Define BOM Usages (OS20)",
          "Production ► Basic Data ► Bill of Material ► Item Data ► Define Item Categories (OS23)",
          "Production ► Basic Data ► Bill of Material ► Control Data for Bills of Material (OS27)",
        ],
        tables: ["STKO", "STPO", "MAST", "STAS", "STZU"],
        tcodes: ["CS01", "CS02", "CS03", "CS11", "CS12", "CS13", "CS20", "CS40"],
        fiori: ["F1813", "F1743"],
        configHe: [
          "BOM Usage (OS20): קובע יישומים ואינדיקטורי-רלוונטיות ברירת-מחדל (Production/Costing/Engineering).",
          "Item Categories (OS23): L/N/T/D/R/I — מאפיינים: Stock relevance, Inventory mgmt, Sub-items, Variable-size.",
          "BOM Status (OS27): פעיל ל-MRP/Costing/Order/Engineering.",
          "Allowed Material Types בכותרת + Explosion Types לבחירה דינמית.",
        ],
        flow: [
          { he: "כותרת BOM", code: "STKO", note: "Base Qty + Usage + Status" },
          { he: "פריטים + קטגוריה", code: "STPO", note: "L/N/T/D/R" },
          { he: "שיוך לחומר/מפעל", code: "MAST" },
          { he: "פיצוץ (MRP/פק\"ע)", code: "Explosion", note: "לפי Explosion Type" },
          { he: "דרישות-תלויות", code: "RESB/BANF" },
        ],
        masterDataHe: [
          "MAST = שיוך BOM↔חומר/מפעל/Usage/Alternative · STKO = כותרת.",
          "STPO = פריט (IDNRK רכיב, MENGE כמות, POSTP קטגוריה, Component Scrap).",
        ],
        mistakesHe: [
          "כפל-פחת: הגדרת Assembly Scrap באב-החומר + Component Scrap ב-BOM לאותו אובדן.",
          "השארת BOM ב-Status לא-משוחרר — MRP/Costing מתעלמים.",
          "ריבוי Alternatives ללא Production Version — בחירה לא-צפויה ב-MRP.",
          "Valid-From עתידי — הרכיב 'נעלם' מפק\"ע שנוצרת היום.",
        ],
        troubleshootHe: [
          "רכיב לא מופיע בפק\"ע ➔ BOM Status, Valid-From עתידי, או Item not relevant to production.",
          "כמות רכיב כפולה מהצפוי ➔ כפל-פחת (Assembly + Component).",
          "בחירת BOM שגויה ➔ Alternative Selection / Production Version.",
          "שגיאת-תמחיר ➔ פריט לא רלוונטי-לתמחיר או Status ללא Costing.",
        ],
        bestPracticeHe: [
          "נהל שינויים עם Change Number (ECM, CC01) — היסטוריה ותוקף.",
          "העדף Production Version על-פני Selection ID לבחירת Alternative.",
          "קבע Item Category נכונה בהזנה — L מול N קובע Reservation מול רכש.",
          "שמור מבנה רדוד ושטוח ככל האפשר; השתמש בפאנטום לפישוט.",
        ],
        interviewHe: [
          { qHe: "מה ההבדל בין BOM ל-Routing?", aHe: "BOM = 'ממה' (רכיבים); Routing = 'כיצד' (פעולות ומרכזי-עבודה). שניהם מאוחדים ב-Production Version." },
          { qHe: "מהי המשמעות של Item Category L מול N?", aHe: "L = פריט-מלאי, מפעיל Reservation מול המלאי; N = פריט לא-מלאי, מפעיל דרישת-רכש ישירה לפק\"ע." },
          { qHe: "כיצד שומרים היסטוריית-שינויים ב-BOM?", aHe: "באמצעות Change Number (ECM) — כל שינוי מקבל Valid-From ונשמר ב-STZU, מאפשר שחזור ותחקור." },
        ],
        takeawaysHe: [
          "BOM = המתכון; מקור הפיצוץ של MRP ופק\"ע.",
          "מבנה: STKO כותרת, STPO פריטים, MAST שיוך.",
          "Item Category (L/N…) היא ההחלטה הקריטית בכל שורה.",
          "נהל בחירת-Alternative דרך Production Version, ושינויים דרך ECM.",
        ],
        relatedHe: [
          { labelHe: "PP · מסלול ייצור (3.4)", href: "/library/pp/chapter-03/#sub-3.4" },
          { labelHe: "PP · גרסת ייצור (3.10)", href: "/library/pp/chapter-03/#sub-3.10" },
          { labelHe: "אובייקט · STPO", href: "/library/pp/object/STPO/" },
        ],
        children: [
          {
            id: "3.2.1", titleHe: "הגדרת שימושי BOM", titleEn: "Defining Bill of Materials Usages",
            execHe: "BOM Usage קובע באילו תחומים (ייצור, תכנון, תמחיר, מכירות, תחזוקה) ה-BOM תקף, ומהי רלוונטיות-ברירת-המחדל של פריטיו לכל תחום. הוא מאפשר לאותו מבנה לשרת תחומים שונים בלי כפילות.",
            beginnerHe: "ה-Usage עונה על השאלה 'לְמה ה-BOM הזה משמש?'. Usage 1 = ייצור — הנפוץ ביותר. כל Usage קובע מראש אילו פריטים נחשבים רלוונטיים לייצור, לתמחיר ולהנדסה.",
            consultantHe: "ב-OS20 כל Usage מגדיר לכל אינדיקטור-יישום ערך: + חובה-רלוונטי, - לא-רלוונטי, . אופציונלי (המשתמש קובע בשורה). השילוב קובע אילו פריטים נכנסים לפיצוץ של כל יישום. Usage 1 מסמן Production/Costing/Engineering = רלוונטי.",
            purposeHe: "להפריד הקשרי-שימוש: BOM-ייצור לא חייב להיות זהה ל-BOM-תמחיר או ל-BOM-תחזוקה. חוסך תחזוקה כפולה ומונע ערבוב רכיבים בין תחומים.",
            processExampleHe: "ביצירת BOM ב-CS01 המשתמש בוחר Usage. הפיצוץ בפק\"ע ישתמש רק בפריטים שסומנו רלוונטיים-לייצור באותו Usage.",
            cbcHe: "ב-CBC Usage 1 לכל BOM-המשקאות; Usage 4 (תחזוקה) נשמר לחלקי-חילוף של PM כדי לא לערבב אריזה עם חלפים.",
            navHe: ["Production ► Basic Data ► Bill of Material ► General Data ► BOM Usage ► Define BOM Usages (OS20)"],
            tables: ["TBST", "STKO"],
            tcodes: ["OS20", "CS01"],
            fiori: ["F1813"],
            configHe: ["ב-OS20 הגדר Usage והגדר אינדיקטורי-רלוונטיות (+/-/.) ל-Production, Engineering/Design, Costing, Spare parts, Plant maintenance, Sales."],
            mistakesHe: ["ריבוי Usages מיותרים — מקשה תחזוקה ובחירה.", "הגדרת אינדיקטור '-' ל-Production בטעות — הפריט לא נצרך בייצור."],
            troubleshootHe: ["פריט קיים ב-BOM אך לא נצרך בפק\"ע ➔ אינדיקטור Production ב-Usage = '-'."],
            bestPracticeHe: ["השתמש ב-Usages הסטנדרטיים של SAP; הגדר חדשים רק בצורך מובהק.", "תעד את משמעות כל Usage לארגון."],
            interviewHe: [
              { qHe: "מה קובע BOM Usage?", aHe: "באילו יישומים ה-BOM תקף ומהי רלוונטיות-ברירת-המחדל של פריטיו (Production/Costing/Engineering) דרך אינדיקטורי +/-/." },
              { qHe: "מהו Usage 1?", aHe: "Usage הייצור הסטנדרטי — מסמן Production+Costing+Engineering כרלוונטיים." },
            ],
            takeawaysHe: ["Usage = הקשר-השימוש של ה-BOM.", "אינדיקטורי +/-/. קובעים רלוונטיות-פריט ליישום.", "Usage 1 = ייצור."],
            relatedHe: [{ labelHe: "אובייקט · OS20", href: "/library/pp/object/OS20/" }],
          },
          {
            id: "3.2.2", titleHe: "סוגי חומר מותרים בכותרת ה-BOM", titleEn: "Allowed Material Types in the BOM Header",
            execHe: "הגדרה השולטת אילו Material Types רשאים לשמש חומר-כותרת של BOM לכל Usage — בקרת-איכות-נתונים המונעת יצירת מבני-מוצר לחומרים שאינם אמורים להיות מורכבים/מיוצרים.",
            beginnerHe: "לא לכל חומר מותר 'להיות מוצר עם מתכון'. הכלל קובע שרק סוגים מסוימים (כמו FERT מוגמר, HALB חצי-מוגמר) יכולים לעמוד בראש BOM; חומר-גלם (ROH) לרוב לא.",
            consultantHe: "ההגדרה מקשרת Material Type ל-BOM Usage. אם חומר-הכותרת אינו ברשימת-המותרים מתקבלת שגיאה ביצירה. זו בקרה זולה אך יעילה למניעת מבנים שגויים בנתוני-האב.",
            purposeHe: "למנוע טעויות-הזנה ושמירה על היגיון-מבני: רק מה שמיוצר/מורכב מקבל BOM.",
            processExampleHe: "ניסיון ליצור BOM שבכותרתו ROH מחזיר 'Material type not allowed for BOM' — המערכת חוסמת בשורש.",
            cbcHe: "ב-CBC רק FERT ו-HALB מורשים ככותרת; ROH (תרכיז/סוכר) חסומים — אי-אפשר 'בטעות' לבנות מתכון לחומר-גלם.",
            navHe: ["Production ► Basic Data ► Bill of Material ► General Data ► Define Allowed Material Types for BOM Header"],
            tables: ["TBST", "T418"],
            tcodes: ["OS24", "CS01"],
            fiori: ["F1813"],
            configHe: ["שייך Material Types מותרים (FERT, HALB) לכל BOM Usage; השאר ROH ודומיו מחוץ לרשימה."],
            mistakesHe: ["אי-הגדרת הכלל — מאפשר BOMs מומצאים לחומרי-גלם.", "הוספת ROH לרשימה 'כדי לעקוף שגיאה' במקום לתקן את שורש-הבעיה."],
            troubleshootHe: ["'Material type not allowed' ➔ הוסף את הסוג לרשימת-המותרים ל-Usage, או תקן את סוג-החומר."],
            bestPracticeHe: ["הגדר את הכלל מוקדם במימוש כחלק מבקרת-איכות-נתונים."],
            interviewHe: [{ qHe: "מדוע להגביל Material Types בכותרת BOM?", aHe: "כדי למנוע יצירת מבני-מוצר לחומרים שאינם אמורים להיות מיוצרים/מורכבים — בקרת איכות-נתונים." }],
            takeawaysHe: ["רק סוגים מורשים (FERT/HALB) ככותרת BOM.", "בקרה זולה למניעת מבנים שגויים."],
          },
          {
            id: "3.2.3", titleHe: "סטטוס BOM", titleEn: "Bill of Materials Status",
            execHe: "BOM Status קובע באילו יישומים ה-BOM פעיל: MRP, תמחיר, פק\"ע, שחרור-הנדסי. סטטוס 1 = פעיל לכל. הסטטוס הוא 'מתג-הזמינות' של המבנה.",
            beginnerHe: "כמו 'טיוטה' מול 'מאושר'. BOM בסטטוס לא-פעיל קיים אך אף תהליך לא משתמש בו, עד שמעבירים אותו לסטטוס פעיל.",
            consultantHe: "הסטטוס נושא אינדיקטורים נפרדים (Active, Explosion in MRP, Costing, Order, Engineering). אפשר לאפשר MRP אך לחסום Costing, למשל בשלב-מעבר. ב-OS27 מגדירים את ערכי-הסטטוס.",
            purposeHe: "לשלוט במחזור-חיי ה-BOM — פיתוח, אישור, ייצור — בלי למחוק/לשחזר מבנים.",
            processExampleHe: "BOM בפיתוח בסטטוס לא-פעיל; אחרי אישור-הנדסי מעבירים ל-Status 1 וכל היישומים מתחילים להשתמש בו.",
            cbcHe: "ב-CBC מוצר-בפיתוח מקבל סטטוס לא-פעיל עד אישור QA, ואז Status 1 לפני ייצור מסחרי.",
            navHe: ["Production ► Basic Data ► Bill of Material ► Control Data ► Define BOM Status (OS27)"],
            tables: ["STKO", "TCS03"],
            tcodes: ["OS27", "CS02"],
            fiori: ["F1813"],
            configHe: ["ב-OS27 הגדר Status וסמן אינדיקטורים: Active, MRP-explosion, Costing, Order, Engineering."],
            mistakesHe: ["BOM נשאר לא-פעיל ➔ MRP/Costing מתעלמים בלי שגיאה ברורה."],
            troubleshootHe: ["MRP מתעלם מ-BOM ➔ Status ללא אינדיקטור MRP או סטטוס לא-פעיל."],
            bestPracticeHe: ["נהל מוצרים-בפיתוח דרך סטטוס לא-פעיל במקום מחיקה.", "תאם משמעות-סטטוסים עם ההנדסה."],
            interviewHe: [{ qHe: "מה קובע BOM Status?", aHe: "באילו יישומים (MRP/Costing/Order/Engineering) ה-BOM פעיל; Status 1 = פעיל לכל." }],
            takeawaysHe: ["Status = מתג-זמינות ליישומים.", "מנהל מחזור-חיים בלי מחיקה."],
          },
          {
            id: "3.2.4", titleHe: "BOM עם דרישת היסטוריה", titleEn: "Bill of Materials with History Requirement",
            execHe: "כאשר מופעלת דרישת-היסטוריה, כל שינוי ב-BOM מחייב Change Number (ECM) ונשמר עם תוקף (Valid-From) — מאפשר ביקורת, שחזור ותחקור-שינויים מלא.",
            beginnerHe: "כמו 'מעקב-שינויים' במסמך: אי-אפשר לשנות בלי לרשום למה ומתי. כל גרסה נשמרת, ואפשר לראות מה היה ה-BOM בכל תאריך.",
            consultantHe: "מופעל ברמת-Usage. מרגע ההפעלה, שינוי ללא Change Number (CC01) נחסם. ההיסטוריה נשמרת ב-STZU ומאפשרת date-effective explosion — MRP מפצץ לפי התוקף הרלוונטי לתאריך-הדרישה.",
            purposeHe: "עמידה ברגולציה (מזון/תרופות), מעקב-תצורה (Configuration management) ויכולת לשחזר 'מה ייצרנו אז'.",
            processExampleHe: "שינוי מתכון נכנס לתוקף ב-1 בחודש דרך Change Number; פק\"ע לפני התאריך עדיין מפוצצת לפי המתכון הישן, ואחריו לפי החדש.",
            cbcHe: "ב-CBC מוצרים תחת רגולציית-מזון (אלרגנים/מתכון) מנוהלים עם דרישת-היסטוריה — כל שינוי-רכיב מתועד עם תאריך ומאשר.",
            navHe: ["Production ► Basic Data ► Bill of Material ► Control Data ► BOMs with History Requirement (OS27 / Usage settings)"],
            tables: ["STZU", "STKO", "AENR"],
            tcodes: ["CC01", "CC02", "CS02"],
            fiori: ["F1813"],
            configHe: ["הפעל History Requirement ל-Usage; מרגע זה כל שינוי דורש Change Number (AENR)."],
            mistakesHe: ["הפעלת היסטוריה גורפת — מוסיפה חיכוך לכל שינוי, גם זניח.", "שכחת Change Number ➔ חוסם שמירה."],
            troubleshootHe: ["לא ניתן לשמור שינוי-BOM ➔ History Requirement פעיל וחסר Change Number (CC01)."],
            bestPracticeHe: ["הפעל היסטוריה רק היכן שנדרש (רגולציה/בטיחות).", "נהל Change Numbers בתהליך-אישור מסודר."],
            interviewHe: [
              { qHe: "מה מחייבת דרישת-היסטוריה ב-BOM?", aHe: "Change Number (ECM) לכל שינוי, עם Valid-From — שמירת היסטוריה מלאה." },
              { qHe: "מהו date-effective explosion?", aHe: "MRP/פק\"ע מפצצים את ה-BOM לפי הגרסה התקפה בתאריך-הדרישה, הודות לתיעוד-התוקף." },
            ],
            takeawaysHe: ["היסטוריה = שינויים דרך ECM בלבד.", "מאפשרת ביקורת ו-date-effective explosion.", "הפעל היכן שרגולציה דורשת."],
            relatedHe: [{ labelHe: "אובייקט · STZU", href: "/library/pp/object/STZU/" }],
          },
          {
            id: "3.2.5", titleHe: "קטגוריית פריט ב-BOM", titleEn: "Item Category in Bill of Materials",
            execHe: "Item Category קובעת את אופי כל שורת-BOM: L פריט-מלאי (Reservation), N לא-מלאי (רכש ישיר), T טקסט, D מסמך, R variable-size, I אלמנט-מבנה. זו ההחלטה הקובעת ביותר ברמת-השורה.",
            beginnerHe: "כל שורה ב-BOM היא מסוג מסוים. הסוג מסביר ל-SAP מה לעשות: למשוך מהמלאי (L), להזמין מספק (N), רק להציג טקסט (T) וכו'.",
            consultantHe: "ב-OS23 כל קטגוריה נושאת מאפיינים: Stock relevance, Inventory management, Sub-item allowed, Variable-size, Material required. L מפעיל RESB מול המלאי; N יוצר Purchase Requisition הקשורה ישירות לפק\"ע (לרוב עם Account Assignment לפק\"ע).",
            purposeHe: "להגדיר התנהגות-רכש/צריכה לכל רכיב — האם הוא מנוהל-מלאי, נרכש ישירות, או רק מידע.",
            processExampleHe: "רכיב L ➔ פיצוץ יוצר Reservation; ברצפה מבצעים Goods Issue (261). רכיב N ➔ פיצוץ יוצר דרישת-רכש; הרכש מזמין ומקבל ישירות לפק\"ע.",
            cbcHe: "ב-CBC: תרכיז/אריזה = L (מלאי); בדיקת-מעבדה חיצונית = N (דרישת-רכש ישירה).",
            navHe: ["Production ► Basic Data ► Bill of Material ► Item Data ► Define Item Categories (OS23)"],
            tables: ["STPO", "TPOP"],
            tcodes: ["OS23", "CS02"],
            fiori: ["F1813"],
            configHe: ["ב-OS23 הגדר קטגוריה וסמן: Stock item, Inventory mgmt, Sub-items, Variable-size, Material required, Text/Document."],
            mistakesHe: ["הגדרת רכיב-שירות כ-L במקום N ➔ אין דרישת-רכש.", "שימוש ב-N לרכיב-מלאי ➔ רכש כפול במקום משיכה ממלאי."],
            troubleshootHe: ["דרישת-רכש לא נוצרת לרכיב-שירות ➔ הוגדר L במקום N.", "Reservation לא נוצרת ➔ הפריט אינו Stock-relevant."],
            bestPracticeHe: ["בחר L/N בכוונה כבר בהזנה.", "השתמש ב-T/D לתיעוד הוראות-עבודה במקום בשדות חופשיים."],
            interviewHe: [
              { qHe: "מה ההבדל L מול N?", aHe: "L = פריט-מלאי → Reservation; N = לא-מלאי → דרישת-רכש ישירה לפק\"ע." },
              { qHe: "מהי קטגוריה R?", aHe: "פריט variable-size — כמותו מחושבת מנוסחת-מידות (אורך/רוחב/עובי)." },
            ],
            takeawaysHe: ["Item Category = אופי השורה.", "L=מלאי/Reservation, N=רכש ישיר.", "ההחלטה הקריטית בכל שורת-BOM."],
          },
          {
            id: "3.2.6", titleHe: "נוסחאות פריט משתנה-גודל", titleEn: "Variable-Size Item Formulas",
            execHe: "פריט variable-size (קטגוריה R) מחשב את כמותו מתוך מידות פיזיות (אורך/רוחב/עובי) באמצעות נוסחה — לחומרים הנמדדים פיזית ולא בכמות-בדידה.",
            beginnerHe: "כשרכיב נמדד לפי גודל ולא לפי 'מספר-יחידות' — למשל יריעת-פילם לפי שטח — מזינים מידות, והמערכת מחשבת כמה צריך לפי נוסחה.",
            consultantHe: "מגדירים Formula עם משתני-מידה (ROMS1/ROMS2/ROMS3) ומקצים לפריט ה-R ב-BOM. הכמות-המחושבת מוכפלת ב-Variable-size-item quantity. שימושי בתעשיות-גיליון/מתכת/פילם.",
            purposeHe: "לחשב צריכת-חומר מדויקת לרכיבים הנמדדים בממדים פיזיים, במקום הזנת-כמות ידנית שגויה.",
            processExampleHe: "פריט יריעה: אורך 2מ' × רוחב 1.5מ' → הנוסחה מחשבת 3 מ\"ר לכל יחידה; פק\"ע ל-100 יח' צורכת 300 מ\"ר.",
            cbcHe: "ב-CBC פחות שכיח למשקאות; רלוונטי לפילם-אריזה/יריעות הנמדדים בשטח (אורך×רוחב).",
            navHe: ["Production ► Basic Data ► Bill of Material ► Item Data ► Variable-Size Item Formulas"],
            tables: ["STPO", "TC04"],
            tcodes: ["OS23", "CS02"],
            fiori: ["F1813"],
            configHe: ["הגדר Formula עם משתני-מידה (ROMS1/2/3) ויחידות; הקצה לפריט ה-variable-size ב-BOM."],
            mistakesHe: ["יחידות-מידה לא-עקביות בנוסחה ➔ כמות שגויה.", "כתיבת נוסחה מותאמת כשהמובנית מספיקה."],
            troubleshootHe: ["כמות variable-size שגויה ➔ נוסחה או יחידות-מידה לא-תואמות."],
            bestPracticeHe: ["העדף נוסחאות מובנות (SAP-delivered) לפני מותאמות.", "בדוק תוצאה מול חישוב-ידני בקבלה."],
            interviewHe: [{ qHe: "מתי משתמשים בפריט variable-size?", aHe: "כשהרכיב נמדד פיזית (אורך/רוחב/עובי) והכמות נגזרת מנוסחה — קטגוריה R." }],
            takeawaysHe: ["קטגוריה R = כמות מחושבת ממידות.", "מתאים לחומרים פיזיים-מדידים."],
          },
          {
            id: "3.2.7", titleHe: "סוגי פיצוץ BOM", titleEn: "Bill of Materials Explosion Types",
            execHe: "Explosion Type קובע כיצד MRP מפצץ את ה-BOM לאורך-זמן — לפי תאריך-דרישה, תוקף-קבוע, או פיצוץ-פאנטום (Phantom) שמעביר דרישות ישירות לרכיבי-המשנה ללא מלאי-ביניים.",
            beginnerHe: "לפעמים יש 'מכלול-ביניים' שלא באמת מאחסנים — מערבבים ומיד משתמשים. פאנטום אומר ל-SAP: 'אל תתכנן מלאי לזה, פשוט העבר את הדרישה לרכיבים שמתחתיו'.",
            consultantHe: "פאנטום מסומן דרך Special Procurement 50 באב-החומר או דרך Item Category מתאימה. ה-MRP 'מדלג' על רמת-הפאנטום ומעביר דרישות לרמה-מתחתיה, בלי הזמנה-מתוכננת לפאנטום עצמו. שימושי לפישוט מבנים ולמכלולים-זמניים.",
            purposeHe: "להימנע מרישום-מלאי וניהול מיותרים למכלולי-ביניים שלא נשמרים בפועל.",
            processExampleHe: "תערובת-בסיס מוגדרת פאנטום; דרישה למוצר-סופי מפצצת ישירות לרכיבי-הגלם של התערובת, ללא הזמנה-מתוכננת לתערובת.",
            cbcHe: "ב-CBC תערובת-בסיס שאינה מאוחסנת = פאנטום; דרישותיה עוברות ישירות לתרכיז/סוכר/מים.",
            navHe: ["Production ► Material Requirements Planning ► BOM Explosion ► Define Explosion Types"],
            tables: ["STPO", "MARC"],
            tcodes: ["OS23", "MM02"],
            fiori: ["F1813"],
            configHe: ["הגדר Explosion Type והקצה; לפאנטום — Special Procurement Key 50 באב-החומר (MARC)."],
            mistakesHe: ["מלאי-ביניים מצטבר שלא לצורך ➔ הרכיב לא הוגדר פאנטום.", "פאנטום למכלול שכן מאוחסן ➔ אובדן-נראות מלאי."],
            troubleshootHe: ["הזמנות-מתוכננות מיותרות לרמת-ביניים ➔ הגדר פאנטום (SPK 50)."],
            bestPracticeHe: ["השתמש בפאנטום למכלולים-זמניים בלבד.", "ודא שמכלולים שכן נשמרים אינם פאנטום."],
            interviewHe: [
              { qHe: "מהו פריט-פאנטום?", aHe: "מכלול-ביניים שאינו מנוהל-מלאי; דרישותיו עוברות ישירות לרכיבי-המשנה. מסומן SPK 50." },
              { qHe: "כיצד מסמנים פאנטום?", aHe: "Special Procurement Key 50 באב-החומר (MARC), או דרך Explosion/Item Category מתאימה." },
            ],
            takeawaysHe: ["Explosion Type שולט באופן-הפיצוץ לאורך-זמן.", "פאנטום מדלג על מלאי-ביניים (SPK 50).", "מפשט מבנים זמניים."],
          },
          {
            id: "3.2.8", titleHe: "בחירת BOM (סדר עדיפויות)", titleEn: "Bill of Materials Selection (Order of Priority)",
            execHe: "כשקיימים מספר Alternatives, סדר-העדיפויות לבחירה הוא: Production Version → בחירה-לפי-תאריך → בחירה-לפי-טווח-כמות (Lot-size) → Selection ID. ההגדרה מבטיחה ש-MRP/פק\"ע יבחרו את ה-BOM הנכון אוטומטית.",
            beginnerHe: "כשיש כמה 'מתכונים חלופיים' לאותו מוצר, SAP צריך כלל איך לבחור. הכלל מסתכל קודם על Production Version, ואם אין — על תאריך, על טווח-כמות, ולבסוף על מזהה-בחירה.",
            consultantHe: "Selection ID (per Plant/Usage) מגדיר את לוגיקת-הבחירה לפי תאריך וטווח-כמות. ב-S/4HANA ההמלצה היא בחירה מפורשת דרך Production Version (MKAL), שמקשרת BOM-Alternative + Routing וגם משמשת ל-MRP, להמרת-פק\"ע ולתמחיר.",
            purposeHe: "להבטיח בחירת-מבנה דטרמיניסטית כשיש חלופות — שהמערכת לא 'תנחש'.",
            processExampleHe: "מוצר עם שני Alternatives לפי כמות: עד 500 יח' Alt 1, מעל Alt 2. Production Versions עם טווחי-כמות שונים בוחרים אוטומטית לפי גודל-הפק\"ע.",
            cbcHe: "ב-CBC ריבוי קווי-מילוי לאותו משקה מנוהל דרך Production Versions; כל קו בוחר את ה-BOM/Routing הנכון אוטומטית.",
            navHe: ["Production ► Material Requirements Planning ► BOM Explosion ► Define BOM Selection (Selection IDs)"],
            tables: ["MAST", "STAS", "MKAL"],
            tcodes: ["OS31", "C223", "CS02"],
            fiori: ["F1421", "F1813"],
            configHe: ["הגדר Selection ID (per Plant/Usage) הקובע בחירה לפי תאריך/טווח-כמות; שייך Production Versions עם טווחי-כמות."],
            mistakesHe: ["טווחי-כמות חופפים בין Versions ➔ בחירה לא-צפויה.", "הסתמכות על Selection ID במקום Production Version ב-S/4HANA."],
            troubleshootHe: ["MRP בוחר Alternative שגוי ➔ Selection ID / טווחי-כמות ב-Production Versions שגויים."],
            bestPracticeHe: ["העדף Production Version — מפורשת וחד-משמעית.", "ודא טווחי-כמות רציפים וללא-חפיפה."],
            interviewHe: [
              { qHe: "מהו סדר-העדיפויות לבחירת BOM?", aHe: "Production Version → תאריך → טווח-כמות → Selection ID." },
              { qHe: "מדוע Production Version מועדפת ב-S/4HANA?", aHe: "היא מקשרת BOM+Routing במפורש, חובה להמרת-פק\"ע ולתמחיר, ומבטלת עמימות-בחירה." },
            ],
            takeawaysHe: ["בחירת-Alternative היא דטרמיניסטית לפי סדר-עדיפויות.", "Production Version קודמת לכל.", "הימנע מטווחי-כמות חופפים."],
            relatedHe: [{ labelHe: "PP · גרסת ייצור (3.10)", href: "/library/pp/chapter-03/#sub-3.10" }],
          },
        ],
      },
      // ============================================================ 3.3
      {
        id: "3.3", titleHe: "מרכז עבודה (Work Center)", titleEn: "Work Center",
        execHe:
          "מרכז-העבודה מייצג מכונה, קו או תחנת-עבודה, ומספק שלוש יכולות-ליבה: תזמון (Scheduling), קיבולת (Capacity) ועלות (Costing). הוא מחבר את ה-Routing לרצפת-הייצור ולמערכת-העלויות — בלעדיו אין תזמון-פק\"ע, אין עומס-קיבולת ואין עלות-עבודה.",
        beginnerHe:
          "מרכז-עבודה הוא 'המקום שבו עובדים' — מכונה או קו. SAP צריך לדעת כמה זמן עבודה לוקח (תזמון), כמה הקו יכול לייצר (קיבולת), וכמה זה עולה (עלות). שלושת אלה מוגדרים במרכז-העבודה ומשמשים את הפעולות ב-Routing.",
        consultantHe:
          "מבנה: CRHD (כותרת), CRCO (שיוך Cost Center + Activity Types), CRCA (יכולות), KAKO (קיבולת). מרכז-העבודה אוסף Standard Values (לפי Standard Value Key) ומתרגם אותם דרך נוסחאות (OP21) לזמן-תזמון, לדרישת-קיבולת ולכמות-Activity לתמחיר. ה-Control Key בפעולה קובע אילו מהיכולות פעילות. תיאום Activity Types עם ה-CO הוא קריטי.",
        purposeHe:
          "לתרגם ערכי-זמן-תקן למשך-ייצור, לעומס-קיבולת ולעלות. מרכז-עבודה מוגדר נכון = תזמון ועלות-פק\"ע מדויקים; מוגדר שגוי = כל החישובים סוטים.",
        processExampleHe:
          "פעולה ב-Routing מצביעה על מרכז-עבודה ונושאת Setup=30דק', Machine=2שע'. נוסחת-התזמון של המרכז מתרגמת ל-משך-פעולה; נוסחת-הקיבולת לעומס על הקו; נוסחת-העלות מכפילה ב-תעריף-Activity (KP26) לעלות-העבודה.",
        cbcHe:
          "ב-CBC קו-מילוי = מרכז-עבודה מסוג 'מכונה' עם Activity Types למכונה ולכוח-אדם; תעריפי KP26 מזינים את עלות-המשקה דרך פעולות-הפק\"ע. תחנות-QA = קטגוריה נפרדת ללא קיבולת.",
        navHe: [
          "Production ► Basic Data ► Work Center ► General Data ► Define Work Center Category (OP40)",
          "Production ► Basic Data ► Work Center ► Capacity Planning ► Define Standard Value Key (OP19)",
          "Production ► Basic Data ► Work Center ► Costing ► Define Formulas for Work Centers (OP21)",
        ],
        tables: ["CRHD", "CRCO", "CRCA", "KAKO", "CRTX"],
        tcodes: ["CR01", "CR02", "CR03", "CR05", "CR06", "KP26"],
        fiori: ["F2336", "F4006"],
        configHe: [
          "Work Center Category (OP40): מסכים, Standard Value Key ברירת-מחדל, יישומי רשימת-משימות מותרים.",
          "Standard Value Key (OP19): אילו ערכי-זמן (Setup/Machine/Labor) נאספים.",
          "Formulas (OP21): נוסחאות נפרדות לתזמון, קיבולת ועלות.",
          "Control Keys (OP00): פונקציות-פעולה; שיוך Cost Center + Activity Types (KP26).",
        ],
        flow: [
          { he: "קטגוריה", code: "OP40", note: "מסכים + יישום" },
          { he: "Standard Value Key", code: "OP19" },
          { he: "נוסחאות", code: "OP21", note: "תזמון/קיבולת/עלות" },
          { he: "Cost Center + Activity", code: "KP26", note: "תעריפים" },
          { he: "שימוש ב-Routing", code: "CA01" },
        ],
        masterDataHe: [
          "CRHD = כותרת · CRCO = Cost Center/Activity Type · KAKO = קיבולת.",
          "Capacity Category 001 (מכונה) / 002 (כוח-אדם), Available Capacity, Utilization %.",
        ],
        mistakesHe: [
          "Control Key ללא 'Costing' ➔ פעולה לא מתומחרת.",
          "Activity Type ללא תעריף (KP26) ➔ עלות-פעולה אפס.",
          "נוסחה שגויה ➔ משך-פעולה 0 או עומס לא-ריאלי.",
        ],
        troubleshootHe: [
          "תזמון-פק\"ע שגוי ➔ נוסחאות (OP21) או Standard Values שגויים.",
          "עלות-פעולה אפס ➔ Activity Type ללא תעריף או Control Key ללא Costing.",
          "אין עומס-קיבולת ➔ Control Key ללא Capacity או קיבולת לא-מוגדרת (KAKO).",
        ],
        bestPracticeHe: [
          "השתמש ב-Standard Value Key הסטנדרטי; נוסחאות-מותאמות רק בצורך אמיתי.",
          "Control Key עם Scheduling+Costing+Capacity לפעולות פנימיות.",
          "תאם מוסכמת-שמות Activity Types עם ה-CO.",
        ],
        interviewHe: [
          { qHe: "אילו שלוש יכולות מספק מרכז-עבודה?", aHe: "תזמון (Scheduling), קיבולת (Capacity) ועלות (Costing)." },
          { qHe: "כיצד מרכז-עבודה מתחבר לעלות?", aHe: "דרך שיוך Cost Center + Activity Types; נוסחת-העלות מכפילה Standard Values בתעריף (KP26)." },
          { qHe: "מה תפקיד ה-Standard Value Key?", aHe: "מגדיר אילו פרמטרי-זמן (Setup/Machine/Labor) נאספים בפעולה ומוזנים לנוסחאות." },
        ],
        takeawaysHe: [
          "מרכז-עבודה = תזמון + קיבולת + עלות.",
          "נוסחאות (OP21) מתרגמות ערכי-תקן לכל השלושה.",
          "Control Key קובע אילו יכולות פעילות בפעולה.",
        ],
        relatedHe: [
          { labelHe: "PP · מסלול ייצור (3.4)", href: "/library/pp/chapter-03/#sub-3.4" },
          { labelHe: "אובייקט · CRHD", href: "/library/pp/object/CRHD/" },
        ],
        children: [
          {
            id: "3.3.1", titleHe: "קטגוריית מרכז עבודה", titleEn: "Work Center Category",
            execHe: "Work Center Category (0001 מכונה, 0003 כוח-אדם וכו') קובעת אילו תצוגות/שדות זמינים, איזה Standard Value Key ברירת-מחדל, ולאיזה יישום (Routing/Rate Routing/Inspection) המרכז משמש.",
            beginnerHe: "סוג מרכז-העבודה קובע 'איזה טופס' פותחים — מכונה, תחנת-אדם או תחנת-בדיקה — וכך אילו שדות רואים.",
            consultantHe: "ב-OP40 מגדירים קטגוריה, משייכים Field Selection ו-Standard Value Key, וקובעים יישומי-רשימת-משימות מותרים. הקטגוריה היא 'התבנית' של המרכז.",
            purposeHe: "להתאים מסכים והתנהגות לסוג-המרכז הפיזי ולמנוע שדות לא-רלוונטיים.",
            processExampleHe: "פתיחת מרכז-עבודה ב-CR01 עם קטגוריית 'מכונה' פותחת תצוגות-קיבולת ועלות; קטגוריית 'בדיקה' מציגה שדות-QA.",
            cbcHe: "ב-CBC קווי-מילוי = קטגוריית 'מכונה' עם קיבולת ועלות; תחנות-QA = קטגוריה נפרדת ללא קיבולת.",
            navHe: ["Production ► Basic Data ► Work Center ► General Data ► Define Work Center Category (OP40)"],
            tables: ["CRHD", "T430"],
            tcodes: ["OP40", "CR01"],
            fiori: ["F2336"],
            configHe: ["ב-OP40 הגדר קטגוריה, שייך Field Selection + Standard Value Key, קבע יישומים מותרים."],
            mistakesHe: ["הגדרת קטגוריות לפי מחלקה-ארגונית במקום תפקיד-פיזי."],
            troubleshootHe: ["תצוגות חסרות במרכז-עבודה ➔ Field Selection של הקטגוריה מסתיר אותן."],
            bestPracticeHe: ["הגדר קטגוריות לפי תפקיד פיזי (קו/תחנה/מעבדה)."],
            interviewHe: [{ qHe: "מה קובעת Work Center Category?", aHe: "תצוגות/שדות, Standard Value Key ברירת-מחדל, ויישומי-רשימת-משימות מותרים." }],
            takeawaysHe: ["קטגוריה = תבנית המרכז.", "קובעת מסכים ויישום."],
          },
          {
            id: "3.3.2", titleHe: "בחירת שדות במרכז עבודה", titleEn: "Field Selection in the Work Center",
            execHe: "Field Selection קובע לכל שדה במרכז-העבודה אם הוא חובה / אופציונלי / לקריאה / מוסתר, לפי גורמים-משפיעים (קטגוריה, יישום).",
            beginnerHe: "מנגנון שמחליט אילו שדות חייבים למלא, אילו אפשר, ואילו להסתיר — כדי שהמסך יתאים לתפקיד.",
            consultantHe: "מגדירים Field Selection group וקובעים השפעות (Modifiable fields with influences). זהו אותו מנגנון-Influence הקיים גם באב-החומר ובפק\"ע.",
            purposeHe: "מסך נקי ובקרת-נתונים — חובה היכן שצריך, מוסתר היכן שלא-רלוונטי.",
            processExampleHe: "שדה 'תקן-QA' מוגדר חובה לקטגוריית-בדיקה ומוסתר לקו-מילוי.",
            cbcHe: "ב-CBC שדה 'תקן בקרת-איכות' חובה למרכזי-QA, מוסתר בקווי-מילוי טהורים.",
            navHe: ["Production ► Basic Data ► Work Center ► General Data ► Field Selection: Influencing / Modifiable Fields"],
            tables: ["CRHD", "T430F"],
            tcodes: ["OPFA", "CR02"],
            fiori: ["F2336"],
            configHe: ["הגדר Field Selection group; קבע השפעות לפי קטגוריה ויישום."],
            mistakesHe: ["שדה-חובה מיותר חוסם שמירה."],
            troubleshootHe: ["שדה-חובה חוסם שמירה ➔ שנה ל'אופציונלי' אם אינו נחוץ."],
            bestPracticeHe: ["השאר שדות לא-רלוונטיים מוסתרים."],
            interviewHe: [{ qHe: "מה מאפשר Field Selection?", aHe: "להגדיר לכל שדה חובה/אופציונלי/קריאה/מוסתר לפי גורמים-משפיעים." }],
            takeawaysHe: ["שולט בנראות-שדות.", "מסך נקי = פחות שגיאות."],
          },
          {
            id: "3.3.3", titleHe: "נוסחאות למרכז העבודה", titleEn: "Formulas for the Work Center",
            execHe: "נוסחאות מתרגמות Standard Values (Setup/Machine/Labor) לזמן-ביצוע (תזמון), לדרישת-קיבולת ולכמות-Activity (תמחיר). כל יכולת נשענת על נוסחה משלה.",
            beginnerHe: "נוסחה היא 'מחשבון' שלוקח את ערכי-הזמן בפעולה והופך אותם למשך, לעומס ולעלות.",
            consultantHe: "ב-OP21 מגדירים נוסחה עם Parameters; משייכים נוסחאות נפרדות ל-Scheduling, Capacity ו-Costing בתצוגות המרכז. בדיקת 'Formula test' חיונית לפני שחרור.",
            purposeHe: "להמיר ערכי-תקן אחידים לשלושת התוצרים (תזמון/קיבולת/עלות) באופן עקבי.",
            processExampleHe: "נוסחת-תזמון: משך = Setup + (Machine × כמות / Base). שינוי בכמות-הפק\"ע מעדכן אוטומטית את המשך.",
            cbcHe: "ב-CBC נוסחת קו-מילוי: זמן-מכונה = (כמות / קצב-מילוי) + זמן-הכנה — מזינה תזמון ועלות יחד.",
            navHe: ["Production ► Basic Data ► Work Center ► Costing ► Define Formulas for Work Centers (OP21)"],
            tables: ["TC21", "CRHD"],
            tcodes: ["OP21", "CR02"],
            fiori: ["F2336"],
            configHe: ["ב-OP21 הגדר נוסחה עם Parameters; שייך לתזמון/קיבולת/עלות במרכז."],
            mistakesHe: ["נוסחה מפנה לפרמטר שאינו מאוכלס ➔ תוצאה 0."],
            troubleshootHe: ["משך-פעולה = 0 ➔ הנוסחה מפנה לפרמטר ללא-ערך ברשימת-המשימות."],
            bestPracticeHe: ["בדוק נוסחה עם 'Formula test' לפני שחרור."],
            interviewHe: [{ qHe: "מה מתרגמות נוסחאות-מרכז?", aHe: "Standard Values לזמן-תזמון, לדרישת-קיבולת ולכמות-Activity לתמחיר." }],
            takeawaysHe: ["נוסחה לכל יכולת.", "בדוק עם Formula test."],
          },
          {
            id: "3.3.4", titleHe: "מפתח ערכי תקן", titleEn: "Standard Value Key",
            execHe: "Standard Value Key (SVK) מגדיר עד 6 פרמטרי-זמן הנאספים בכל פעולה (לרוב Setup/Machine/Labor) ומקשר אותם לפרמטרים בנוסחאות.",
            beginnerHe: "מגדיר 'אילו זמנים מודדים' בכל פעולה — הכנה, מכונה, עבודה.",
            consultantHe: "ב-OP19 מגדירים SVK עם פרמטרים וממדיהם (זמן), ומשייכים לקטגוריית-המרכז. SAP1 הוא ה-SVK הסטנדרטי התואם לנוסחאות-המובנות.",
            purposeHe: "תקנן את ערכי-הזמן הנאספים כדי שהנוסחאות יידעו מה להזין.",
            processExampleHe: "פעולה עם SVK הכולל Setup/Machine/Labor — המתכנן מזין שלושתם, והנוסחאות משתמשות בהם.",
            cbcHe: "ב-CBC SVK של קו-מילוי: Setup (ניקוי/החלפת-טעם), Machine (מילוי), Labor (תפעול) — שלושתם מתומחרים.",
            navHe: ["Production ► Basic Data ► Work Center ► Capacity Planning ► Define Standard Value Key (OP19)"],
            tables: ["TC23", "CRHD"],
            tcodes: ["OP19", "CR02"],
            fiori: ["F2336"],
            configHe: ["ב-OP19 הגדר SVK עם הפרמטרים וממדיהם; שייך לקטגוריית-המרכז."],
            mistakesHe: ["פרמטר חסר ב-SVK ➔ אי-אפשר להזין ערך-זמן בפעולה."],
            troubleshootHe: ["לא ניתן להזין ערך-זמן ➔ הפרמטר לא מוגדר ב-SVK של המרכז."],
            bestPracticeHe: ["השתמש ב-SAP1 אלא אם יש צורך מובהק."],
            interviewHe: [{ qHe: "מה מגדיר SVK?", aHe: "עד 6 פרמטרי-זמן הנאספים בפעולה, ומקשר אותם לנוסחאות." }],
            takeawaysHe: ["SVK = אילו זמנים נאספים.", "SAP1 = הסטנדרטי."],
          },
          {
            id: "3.3.5", titleHe: "קבוצות מיקום", titleEn: "Location Groups",
            execHe: "Location Group מקבץ מרכזי-עבודה לפי מיקום/אזור, ומשמש לתזמון-מעבר (זמני-תנועה בין מרכזים) ולדיווח-קיבולת מצרפי.",
            beginnerHe: "קיבוץ של מרכזי-עבודה לפי 'איפה הם נמצאים', לצורך חישוב זמני-מעבר ודיווח מאוחד.",
            consultantHe: "מגדירים Location Group ומשייכים מרכזים; ניתן להגדיר זמני-מעבר בין קבוצות. רלוונטי בעיקר באתרים-גדולים.",
            purposeHe: "לחשב זמני-תנועה בין-מרכזיים ולנתח קיבולת ברמת-אזור.",
            processExampleHe: "מעבר בין מרכז-ערבול למרכז-מילוי מוסיף זמן-תנועה לפי Location Groups.",
            cbcHe: "ב-CBC קווי-מילוי באולם אחד מקובצים ל-Location Group לניתוח-קיבולת מצרפי לאתר.",
            navHe: ["Production ► Basic Data ► Work Center ► General Data ► Define Location Groups"],
            tables: ["CRHD", "T357"],
            tcodes: ["CR02"],
            fiori: ["F2336"],
            configHe: ["הגדר Location Group, שייך מרכזים, והגדר זמני-מעבר אם נדרש."],
            mistakesHe: ["ציפייה לזמני-מעבר ללא הגדרת Location Groups."],
            troubleshootHe: ["זמני-מעבר לא מחושבים ➔ Location Groups/זמני-מעבר לא הוגדרו."],
            bestPracticeHe: ["רלוונטי לאתרים-גדולים; באתר קטן אפשר לוותר."],
            interviewHe: [{ qHe: "למה משמש Location Group?", aHe: "תזמון זמני-מעבר בין מרכזים ודיווח-קיבולת מצרפי לפי אזור." }],
            takeawaysHe: ["קיבוץ-מרכזים לפי מיקום.", "לזמני-מעבר וקיבולת-אזור."],
          },
          {
            id: "3.3.6", titleHe: "מפתח בקרה לפעולות", titleEn: "Control Key for Operations",
            execHe: "Control Key (PP01, PP02…) קובע לכל פעולה אילו פונקציות פעילות: Scheduling, Capacity, Costing, Confirmation, Print, Automatic GR, External Processing. זו ההגדרה הקריטית-ביותר ברמת-הפעולה.",
            beginnerHe: "מתג רב-ערוצי לכל פעולה: האם מתזמנים אותה, מתמחרים, מדווחים, מדפיסים, או שולחים לקבלן-חוץ.",
            consultantHe: "ב-OP00 מגדירים Control Key ומסמנים פונקציות. PP01 = פעולה פנימית מלאה; PP02 = עיבוד-חוץ (External Processing) עם רכש-שירות. מיפוי שגוי שובר תזמון/עלות/דיווח בבת-אחת.",
            purposeHe: "לשלוט בהתנהגות כל פעולה — פנימית מלאה, עיבוד-חוץ, ציון-דרך (Milestone) וכו'.",
            processExampleHe: "פעולת-מילוי PP01 מתזמנת, טוענת קיבולת, מתומחרת ומדווחת; פעולת-מעבדה-חיצונית עם External Processing מפעילה דרישת-רכש-שירות.",
            cbcHe: "ב-CBC פעולת-מילוי = PP01; פעולת-מעבדה-חיצונית = Control Key עם External Processing וללא קיבולת-פנימית.",
            navHe: ["Production ► Shop Floor Control ► Master Data ► Define Control Key (OP00)"],
            tables: ["PLPO", "T430C"],
            tcodes: ["OP00", "CA02"],
            fiori: ["F2336"],
            configHe: ["ב-OP00 הגדר Control Key וסמן: Scheduling, Capacity, Costing, Confirmation, Print, Auto-GR, External."],
            mistakesHe: ["Control Key ללא Costing ➔ פעולה לא מתומחרת.", "Control Key ללא Confirmation ➔ אי-אפשר לדווח."],
            troubleshootHe: [
              "פעולה לא מתומחרת ➔ Control Key ללא 'Costing'.",
              "לא ניתן לדווח פעולה ➔ Control Key ללא 'Confirmation'/'Milestone'.",
            ],
            bestPracticeHe: ["השתמש ב-PP01 לפעולות-פנימיות מלאות; PP02 לעיבוד-חוץ.", "בדוק את ה-Control Key בכל Routing חדש."],
            interviewHe: [
              { qHe: "מה קובע Control Key?", aHe: "אילו פונקציות פעילות בפעולה: תזמון/קיבולת/עלות/דיווח/הדפסה/GR-אוטומטי/עיבוד-חוץ." },
              { qHe: "מה ההבדל PP01 מול PP02?", aHe: "PP01 = פעולה פנימית מלאה; PP02 = עיבוד-חוץ (External Processing) עם רכש-שירות." },
            ],
            takeawaysHe: ["Control Key = ההגדרה הקריטית בפעולה.", "קובע תזמון/עלות/דיווח/עיבוד-חוץ.", "מיפוי שגוי שובר הכל."],
            relatedHe: [{ labelHe: "PP · מסלול ייצור (3.4)", href: "/library/pp/chapter-03/#sub-3.4" }],
          },
        ],
      },
      // ============================================================ 3.4
      {
        id: "3.4", titleHe: "מסלול ייצור (Routing)", titleEn: "Routing",
        execHe:
          "ה-Routing מגדיר את רצף-הפעולות לייצור המוצר: לכל פעולה מרכז-עבודה, Control Key, ערכי-זמן-תקן ורכיבים-מוקצים. הוא ה'כיצד' של הייצור (לעומת ה-BOM שהוא ה'ממה'), ובסיס לתזמון, לקיבולת ולתמחיר-העבודה.",
        beginnerHe:
          "אם ה-BOM הוא רשימת-המצרכים, ה-Routing הוא הוראות-ההכנה: שלב אחר שלב, באיזו מכונה, כמה זמן. כל שלב הוא 'פעולה' (Operation).",
        consultantHe:
          "מבנה: PLKO (כותרת), PLPO (פעולות), PLAS (בחירת-פעולה/Alternative), MAPL (שיוך-לחומר), PLMZ (הקצאת-רכיבים לפעולות). סוג רשימת-משימות N. הקצאת-רכיבים (Component Allocation) קובעת באיזו פעולה כל רכיב נצרך — חשוב לתזמון-משיכות ולדיוק-WIP.",
        purposeHe:
          "להגדיר את תהליך-הייצור התפעולי, לתזמן את הפק\"ע, לחשב עומס-קיבולת ולתמחר את העבודה.",
        processExampleHe:
          "פק\"ע מקבלת מה-Routing פעולות 0010–0050; כל פעולה מתוזמנת לפי מרכז-העבודה והנוסחאות; רכיבים מוקצים לפעולות כך שמשיכת-מלאי מתואמת לשלב-הצריכה.",
        cbcHe:
          "ב-CBC מסלול קו-ייצור: 0010 הכנה ➔ 0020 ערבול ➔ 0030 מילוי ➔ 0040 בקרת-איכות (Control Key עם Inspection) ➔ 0050 אריזה.",
        navHe: [
          "Production ► Basic Data ► Routing ► Control Data ► Define Number Ranges",
          "Production ► Basic Data ► Routing ► Operation Data ► Define Control Keys (OP00)",
        ],
        tables: ["PLKO", "PLPO", "PLAS", "MAPL", "PLMZ"],
        tcodes: ["CA01", "CA02", "CA03", "CA11", "CA85", "C223"],
        fiori: ["F2245", "F1842"],
        configHe: [
          "Task List Type N (Routing) + טווחי-מספרים.",
          "Reference Operation Sets (CA11) לפעולות-חוזרות בין מוצרים.",
          "Component Allocation (PLMZ) — קישור רכיב↔פעולה.",
        ],
        flow: [
          { he: "כותרת מסלול", code: "PLKO" },
          { he: "פעולות + מרכז", code: "PLPO", note: "0010,0020…" },
          { he: "הקצאת רכיבים", code: "PLMZ" },
          { he: "שיוך לחומר", code: "MAPL" },
          { he: "Production Version", code: "C223" },
        ],
        masterDataHe: [
          "PLKO=כותרת · PLPO=פעולות · MAPL=שיוך-לחומר · PLMZ=הקצאת-רכיבים.",
          "כל פעולה: Work Center, Control Key, Setup/Machine/Labor.",
        ],
        mistakesHe: [
          "Routing לא משויך (MAPL) ➔ פק\"ע ללא פעולות.",
          "אי-הקצאת רכיבים (PLMZ) ➔ רכיב נצרך בפעולה שגויה.",
          "Routing ללא Production Version ב-S/4HANA ➔ כשל-המרה.",
        ],
        troubleshootHe: [
          "פק\"ע ללא פעולות ➔ Routing לא משויך או תוקף/Lot-Size לא-תואמים.",
          "רכיב נצרך בפעולה שגויה ➔ Component Allocation (PLMZ) לא הוגדר.",
        ],
        bestPracticeHe: [
          "אחד Routing+BOM ל-Production Version (C223) — חובה ב-S/4HANA.",
          "השתמש ב-Reference Operation Sets לפעולות-סטנדרטיות.",
          "שנה Routing עם Change Number לשמירת-היסטוריה.",
        ],
        interviewHe: [
          { qHe: "מה ההבדל Routing מול BOM?", aHe: "Routing = 'כיצד' (פעולות/מרכזים); BOM = 'ממה' (רכיבים). מאוחדים ב-Production Version." },
          { qHe: "מהי Component Allocation?", aHe: "קישור רכיב-BOM לפעולת-Routing (PLMZ) — קובע באיזה שלב הרכיב נצרך." },
          { qHe: "מהו Reference Operation Set?", aHe: "אוסף-פעולות סטנדרטי לשימוש-חוזר בין Routings (CA11)." },
        ],
        takeawaysHe: [
          "Routing = רצף-הפעולות (ה'כיצד').",
          "מבנה: PLKO/PLPO/MAPL/PLMZ.",
          "אחד עם BOM ל-Production Version.",
        ],
        relatedHe: [
          { labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" },
          { labelHe: "PP · גרסת ייצור (3.10)", href: "/library/pp/chapter-03/#sub-3.10" },
          { labelHe: "אובייקט · PLPO", href: "/library/pp/object/PLPO/" },
        ],
      },
      // ============================================================ 3.5
      {
        id: "3.5", titleHe: "סוג פקודת-ייצור (Order Type)", titleEn: "Order Type",
        execHe:
          "סוג-הפק\"ע הוא רכיב-הבקרה המרכזי לעיבוד פק\"ע ייצור בדיד. הוא משויך ל-Order Category 10, קובע טווח-מספרים, ודרכו נקשרים פרופיל-תזמון, פרופיל-זמינות ופרופיל-התחשבנות. הוא 'סוג-המסמך' של עולם-הייצור.",
        beginnerHe:
          "כמו שיש סוגי-הזמנות-מכירה שונים, יש סוגי-פק\"ע שונים: ייצור-רגיל, Rework, חצי-מוגמר. הסוג קובע איך הפק\"ע מתנהגת ואיך היא ממוספרת.",
        consultantHe:
          "ב-OPJH מגדירים Order Type ומשייכים Category 10. כל הקונפיגורציה התלויה (תזמון/עלות/בחירה) נקשרת דרכו ב-OPL8. טווח-מספרים מוגדר ב-CO82. מומלץ מעט סוגים — כל סוג מוסיף תחזוקה ודיווח.",
        purposeHe:
          "לאפשר התנהגות-עיבוד שונה לתרחישים שונים ושליטה אחידה בעלות ובמספור.",
        processExampleHe:
          "יצירת פק\"ע ב-CO01 דורשת בחירת Order Type; הסוג קובע את טווח-המספר, את ברירות-הבחירה (BOM/Routing) ואת ה-Costing Variant דרך OPL8.",
        cbcHe:
          "ב-CBC: PP01 ייצור-רגיל, PP02 Rework, PP03 חצי-מוגמר — 3 סוגים שמכסים את רוב התרחישים.",
        navHe: [
          "Production ► Shop Floor Control ► Master Data ► Order ► Define Order Types (OPJH)",
          "Production ► Shop Floor Control ► Master Data ► Order ► Define Number Ranges (CO82)",
        ],
        tables: ["T399X", "AUFK", "AFKO", "AFPO"],
        tcodes: ["OPJH", "CO82", "CO01", "CO40"],
        fiori: ["F2336"],
        configHe: [
          "Order Type (OPJH) + Order Category 10.",
          "Number Ranges (CO82) — פנימי/חיצוני, משויך לסוג.",
          "קישור פרופיל-תזמון/זמינות וברירות-מחדל לעיבוד.",
        ],
        flow: [
          { he: "Order Type", code: "OPJH", note: "Category 10" },
          { he: "טווח-מספרים", code: "CO82" },
          { he: "פרמטרים פר-מפעל", code: "OPL8" },
          { he: "יצירת פק\"ע", code: "CO01" },
        ],
        masterDataHe: ["AUFK=כותרת-פקודה · AFKO=כותרת-ייצור · AFPO=פריט פק\"ע."],
        mistakesHe: [
          "ריבוי סוגי-פק\"ע ➔ תחזוקה ודיווח מורכבים.",
          "סוג ללא פרמטרים פר-מפעל (OPL8) ➔ אי-אפשר ליצור פק\"ע במפעל.",
        ],
        troubleshootHe: [
          "מספור שגוי ➔ טווח-מספרים (CO82) לא-משויך או חופף.",
          "סוג לא-זמין במפעל ➔ חסר OPL8 לאותו מפעל.",
        ],
        bestPracticeHe: [
          "הגדר מעט סוגים; אוטומציות דרך פרופיל-תזמון.",
          "תאם טווחי-מספרים עם PP-PI/QM/PM.",
        ],
        interviewHe: [
          { qHe: "מה קובע סוג-הפק\"ע?", aHe: "Order Category, טווח-מספרים, וקישור לפרופילי תזמון/זמינות/התחשבנות; בסיס לכל הקונפיגורציה התלויה." },
          { qHe: "מהי Order Category 10?", aHe: "קטגוריית פק\"ע-ייצור (PP Production Order)." },
        ],
        takeawaysHe: [
          "Order Type = 'סוג-המסמך' של הייצור.",
          "Category 10, טווח-מספרים ב-CO82.",
          "הגדר מעט סוגים.",
        ],
        relatedHe: [
          { labelHe: "PP · פרמטרים תלויי סוג-הזמנה (3.6)", href: "/library/pp/chapter-03/#sub-3.6" },
          { labelHe: "אובייקט · AUFK", href: "/library/pp/object/AUFK/" },
        ],
        children: [
          {
            id: "3.5.1", titleHe: "תחזוקת סוגי-הזמנה", titleEn: "Maintaining Order Types",
            execHe: "הגדרת סוג-ההזמנה עצמו: שם, Order Category, ואינדיקטורים בסיסיים (CO-relevant, settlement). הסוג הוא המפתח שכל שאר הקונפיגורציה תלויה בו.",
            beginnerHe: "יוצרים את 'הסוג' ונותנים לו שם וקטגוריה. זה הצעד הראשון לפני כל הגדרה אחרת.",
            consultantHe: "ב-OPJH יוצרים Order Type, משייכים Category 10, וקובעים רלוונטיות ל-CO/Settlement. תכנון מוקדם עם ה-CO חשוב — שינוי בדיעבד יקר.",
            purposeHe: "ליצור את אובייקט-הבקרה שעליו תלוי כל עיבוד-הפק\"ע.",
            processExampleHe: "יצירת PP01 ב-OPJH; מרגע זה אפשר לשייך לו טווח-מספרים ופרמטרים פר-מפעל.",
            cbcHe: "ב-CBC PP01/PP02/PP03 נוצרים ב-OPJH כבסיס לכל קונפיגורציית-הייצור.",
            navHe: ["Production ► Shop Floor Control ► Master Data ► Order ► Define Order Types (OPJH)"],
            tables: ["T399X"],
            tcodes: ["OPJH"],
            fiori: ["F2336"],
            configHe: ["ב-OPJH צור Order Type, שייך Category 10, קבע רלוונטיות CO/Settlement."],
            mistakesHe: ["יצירת סוגים מיותרים ➔ עומס-תחזוקה."],
            troubleshootHe: ["לא ניתן ליצור פק\"ע מסוג ➔ הסוג לא הוגדר או חסר OPL8."],
            bestPracticeHe: ["תכנן רשימת-סוגים מראש עם ה-CO."],
            interviewHe: [{ qHe: "מה הצעד הראשון בהגדרת פק\"ע?", aHe: "יצירת Order Type ב-OPJH ושיוך Order Category 10." }],
            takeawaysHe: ["OPJH יוצר את הסוג.", "בסיס לכל שאר הקונפיגורציה."],
          },
          {
            id: "3.5.2", titleHe: "טווחי מספרים", titleEn: "Number Ranges",
            execHe: "טווח-המספרים קובע את מספור-הפק\"ע — פנימי (המערכת מקצה) או חיצוני (המשתמש מזין). כל קבוצת-טווח משויכת לסוג/סוגי-הזמנה.",
            beginnerHe: "קובע אילו מספרים יקבלו הפק\"ע — אוטומטי או ידני, ובאיזה תחום-מספרים.",
            consultantHe: "ב-CO82 מגדירים Number Range Group, מקצים אינטרוול, ומשייכים סוגי-הזמנה. אינטרוול נפרד ל-Rework מקל על דיווח.",
            purposeHe: "להבטיח מספור-פק\"ע ייחודי ועקבי לפי סוג.",
            processExampleHe: "יצירת פק\"ע PP01 מקצה אוטומטית את המספר-הבא מהאינטרוול המשויך.",
            cbcHe: "ב-CBC מספור פנימי רציף לכל הפק\"ע; אינטרוול נפרד ל-Rework למעקב.",
            navHe: ["Production ► Shop Floor Control ► Master Data ► Order ► Define Number Ranges (CO82)"],
            tables: ["NRIV", "T399X"],
            tcodes: ["CO82"],
            fiori: ["F2336"],
            configHe: ["ב-CO82 הגדר Number Range Group, הקצה אינטרוול, שייך סוגי-הזמנה."],
            mistakesHe: ["סוג לא-משויך לקבוצת-טווח ➔ 'No number range'.", "אינטרוול קרוב-למיצוי לא-מורחב."],
            troubleshootHe: [
              "'No number range' ➔ הסוג לא משויך לקבוצת-טווח.",
              "מספרים אוזלים ➔ הרחב אינטרוול לפני הקצה.",
            ],
            bestPracticeHe: ["הקצה מרווח נדיב; הרחבה בדיעבד דורשת תיאום."],
            interviewHe: [{ qHe: "מה ההבדל מספור פנימי/חיצוני?", aHe: "פנימי = המערכת מקצה אוטומטית; חיצוני = המשתמש מזין ידנית." }],
            takeawaysHe: ["CO82 מגדיר ומשייך טווחים.", "אינטרוול נדיב מראש."],
          },
        ],
      },
      // ============================================================ 3.6
      {
        id: "3.6", titleHe: "פרמטרים תלויי סוג-הזמנה", titleEn: "Order Type-Dependent Parameters",
        execHe:
          "פרמטרים תלויי-סוג-הזמנה (OPL8) מוגדרים פר Order Type + Plant ושולטים בשלוש קבוצות: Planning (בחירת BOM/Routing/Production Version), Implementation (שחרור/דיווח/בדיקת-זמינות), ו-Cost Accounting (Costing Variants). זו נקודת-החיבור בין סוג-הפק\"ע למפעל הקונקרטי.",
        beginnerHe:
          "אותו סוג-פק\"ע יכול להתנהג שונה במפעלים שונים. כאן מגדירים, לכל צירוף סוג+מפעל, איך הפק\"ע בוחרת מתכון, מתי בודקת-זמינות, ואיך מתומחרת.",
        consultantHe:
          "ב-OPL8 בוחרים Order Type+Plant ומגדירים שלוש לשוניות. זו אחת מטעויות-המימוש הנפוצות: שוכחים להגדיר OPL8 למפעל ואז 'אי-אפשר ליצור פק\"ע'. ה-Costing Variants משותפים לתהליך הסגירה — אין לגעת ללא ה-CO.",
        purposeHe:
          "לקשר סוג-פק\"ע למפעל ולקבוע התנהגות-תכנון/ביצוע/עלות פר-מפעל.",
        processExampleHe:
          "יצירת פק\"ע PP01 במפעל 1010: OPL8 קובע Routing-selection אוטומטי, בדיקת-זמינות בשחרור, ו-Costing Variant PPP1/PPP2.",
        cbcHe:
          "ב-CBC PP01 מוגדר בכל מפעלי-המילוי, אך כל מפעל מצביע על Costing Variant מקומי וברירות-בחירה משלו.",
        navHe: [
          "Production ► Shop Floor Control ► Master Data ► Order ► Define Order Type-Dependent Parameters (OPL8)",
        ],
        tables: ["T399X", "AFKO"],
        tcodes: ["OPL8", "OPJH", "OKZ3"],
        fiori: ["F2336"],
        configHe: [
          "OPL8: בחר Order Type + Plant.",
          "Planning: בחירת BOM/Routing/Production Version, Task List Application.",
          "Implementation: Availability check defaults, Status Profile, documentation.",
          "Cost Accounting: Costing Variant Plan/Actual, Results Analysis Key.",
        ],
        flow: [
          { he: "Order Type + Plant", code: "OPL8" },
          { he: "Planning", code: "BOM/Routing" },
          { he: "Implementation", code: "ATP/Release" },
          { he: "Cost Accounting", code: "PPP1/PPP2" },
        ],
        masterDataHe: ["נשלט פר Order Type+Plant; משפיע על בחירת BOM/Routing ועל Costing Variant של הפק\"ע."],
        mistakesHe: [
          "חוסר רשומת-OPL8 למפעל ➔ 'אי-אפשר ליצור פק\"ע' (טעות-מימוש נפוצה).",
          "Costing Variant שגוי ➔ הפק\"ע לא מתומחרת.",
        ],
        troubleshootHe: [
          "לא ניתן ליצור פק\"ע במפעל ➔ חסרה רשומת OPL8 ל-Order Type+Plant.",
          "הפק\"ע לא מתומחרת ➔ Costing Variant חסר/שגוי.",
        ],
        bestPracticeHe: [
          "תחזק OPL8 לכל צירוף Order Type+Plant פעיל.",
          "תאם Costing Variants עם ה-CO לפני סביבת-ייצור.",
        ],
        interviewHe: [
          { qHe: "מה מגדירים ב-OPL8?", aHe: "פרמטרים פר Order Type+Plant בשלוש קבוצות: Planning, Implementation, Cost Accounting." },
          { qHe: "מדוע 'אי-אפשר ליצור פק\"ע' אחרי הגדרת Order Type?", aHe: "כי חסרה רשומת OPL8 לאותו Order Type+Plant — תנאי-סף ליצירת-פק\"ע." },
        ],
        takeawaysHe: [
          "OPL8 = חיבור סוג-פק\"ע ↔ מפעל.",
          "שלוש לשוניות: Planning/Implementation/Cost Accounting.",
          "חוסר-OPL8 = אי-אפשר ליצור פק\"ע.",
        ],
        relatedHe: [
          { labelHe: "PP · סוג פקודת-ייצור (3.5)", href: "/library/pp/chapter-03/#sub-3.5" },
          { labelHe: "PP · בדיקת זמינות (3.9)", href: "/library/pp/chapter-03/#sub-3.9" },
        ],
        children: [
          {
            id: "3.6.1", titleHe: "תכנון (Planning)", titleEn: "Planning",
            execHe: "לשונית Planning קובעת כיצד הפק\"ע בוחרת BOM ו-Routing: Application לבחירת-מסלול, Routing selection (אוטומטי/ידני/אין), וכללי בחירת Production Version.",
            beginnerHe: "כאן מחליטים אם הפק\"ע 'תטען' לבד את המתכון והמסלול, או שצריך לבחור ידנית.",
            consultantHe: "קובעים Task List Application (PP01), Routing Selection = 'automatic with manual option', וכללי BOM Application. בחירה-אוטומטית של Production Version מבטיחה טעינה נכונה ללא התערבות.",
            purposeHe: "להבטיח שהפק\"ע נטענת עם ה-BOM וה-Routing הנכונים אוטומטית.",
            processExampleHe: "פק\"ע על קו-מילוי נטענת אוטומטית עם ה-Production Version התואם לקו ולכמות.",
            cbcHe: "ב-CBC בחירה-אוטומטית של Production Version מבטיחה טעינה נכונה בכל קו-מילוי.",
            navHe: ["Production ► Shop Floor Control ► Master Data ► Order ► OPL8 ► Planning tab"],
            tables: ["T399X"],
            tcodes: ["OPL8"],
            fiori: ["F2336"],
            configHe: ["קבע Task List Application, Routing Selection אוטומטי-עם-ידני, כללי BOM Application."],
            mistakesHe: ["Routing Selection = 'no selection' ➔ פק\"ע ללא Routing."],
            troubleshootHe: ["פק\"ע נפתחת ללא Routing ➔ Routing Selection 'no selection' או Application לא-תואם."],
            bestPracticeHe: ["אוטומטי-עם-ידני = ברירת-מחדל מעשית."],
            interviewHe: [{ qHe: "מה קובעת לשונית Planning?", aHe: "בחירת BOM/Routing/Production Version ואופן בחירת-המסלול לפק\"ע." }],
            takeawaysHe: ["שולטת בבחירת מתכון+מסלול.", "אוטומטי-עם-ידני מומלץ."],
          },
          {
            id: "3.6.2", titleHe: "מימוש (Implementation)", titleEn: "Implementation",
            execHe: "לשונית Implementation שולטת בהתנהגות-הביצוע: ברירות בדיקת-זמינות (חומר/קיבולת/PRT), Status Profile, ואינדיקטורי-תיעוד-שינויים.",
            beginnerHe: "כאן מחליטים אם בודקים זמינות-חומר בשחרור, ואיזה סטטוסים זמינים לפק\"ע.",
            consultantHe: "משייכים Status Profile (אם נדרש), קובעים בדיקת-זמינות אוטומטית בשחרור, ומפעילים תיעוד-שינויים. הפעלת ATP-אוטומטי בשחרור חוסמת התחלת-ייצור ללא חומר.",
            purposeHe: "לשלוט בבדיקות ובסטטוסים בעת ביצוע-הפק\"ע.",
            processExampleHe: "בשחרור-פק\"ע מתבצעת בדיקת-זמינות-חומר אוטומטית; חוסר ➔ סטטוס MSPT.",
            cbcHe: "ב-CBC בדיקת-זמינות אוטומטית בשחרור מונעת מילוי ללא תרכיז/אריזה.",
            navHe: ["Production ► Shop Floor Control ► Master Data ► Order ► OPL8 ► Implementation tab"],
            tables: ["T399X"],
            tcodes: ["OPL8"],
            fiori: ["F2336"],
            configHe: ["שייך Status Profile, הפעל בדיקת-זמינות בשחרור, הפעל תיעוד-שינויים."],
            mistakesHe: ["אי-הפעלת ATP בשחרור למרות Checking Control מוגדר."],
            troubleshootHe: ["בדיקת-זמינות לא רצה בשחרור ➔ לא הופעלה בלשונית Implementation."],
            bestPracticeHe: ["הפעל ATP אוטומטי בשחרור — חסום מוקדם."],
            interviewHe: [{ qHe: "מה קובעת לשונית Implementation?", aHe: "ברירות בדיקת-זמינות, Status Profile ותיעוד-שינויים בעת ביצוע." }],
            takeawaysHe: ["שולטת בבדיקות-ביצוע.", "ATP אוטומטי בשחרור מומלץ."],
          },
          {
            id: "3.6.3", titleHe: "חשבונאות עלויות (Cost Accounting)", titleEn: "Cost Accounting",
            execHe: "לשונית Cost Accounting קובעת את ה-Costing Variants: Plan (תמחיר-מתוכנן ביצירה) ו-Actual (איסוף-עלויות בפועל), Results Analysis Key ורלוונטיות-WIP.",
            beginnerHe: "כאן מחברים את הפק\"ע למערכת-העלויות: כמה אמורה לעלות (Plan) וכמה עלתה בפועל (Actual).",
            consultantHe: "משייכים Costing Variant Plan (PPP1) ו-Actual (PPP2), Results Analysis Key, ו-RA-relevance. אלה משותפים לסגירה החודשית — אל תיגע ללא ה-CO.",
            purposeHe: "לקבוע כיצד הפק\"ע מתומחרת ואיך נאספות ומנותחות סטיות.",
            processExampleHe: "ביצירה — תמחיר-תכנון מ-PPP1; לאורך-החיים — עלויות-בפועל מול PPP2; בסגירה — חישוב-סטיות ו-WIP.",
            cbcHe: "ב-CBC עלות-תקן של המשקה מ-Costing Variant Plan; סטיות נאספות מול Actual ומנותחות חודשית.",
            navHe: ["Production ► Shop Floor Control ► Master Data ► Order ► OPL8 ► Cost Accounting tab"],
            tables: ["T399X", "TCK03"],
            tcodes: ["OPL8", "OKZ3"],
            fiori: ["F2336"],
            configHe: ["שייך Costing Variant Plan/Actual, Results Analysis Key, RA-relevance."],
            mistakesHe: ["Costing Variant Plan חסר ➔ אין תמחיר-תכנון.", "שינוי-עצמאי של Variants ללא ה-CO."],
            troubleshootHe: [
              "אין תמחיר-תכנון ➔ Costing Variant Plan חסר.",
              "סטיות לא מחושבות בסגירה ➔ RA Key/RA-relevance לא הוגדרו.",
            ],
            bestPracticeHe: ["אל תיגע ב-Costing Variants ללא ה-CO."],
            interviewHe: [{ qHe: "אילו Costing Variants בפק\"ע?", aHe: "Plan (תמחיר-מתוכנן) ו-Actual (עלויות-בפועל); משמשים לחישוב-סטיות בסגירה." }],
            takeawaysHe: ["מחבר פק\"ע למערכת-העלויות.", "Plan + Actual + RA.", "תחום ה-CO — תאם."],
          },
        ],
      },
      // ============================================================ 3.7
      {
        id: "3.7", titleHe: "תזמון (Scheduling)", titleEn: "Scheduling",
        execHe:
          "התזמון מחשב את תאריכי-ההתחלה-והסיום של הפק\"ע ופעולותיה, על-בסיס ערכי-הזמן ב-Routing, נוסחאות-המרכז ופרמטרי-התזמון. סוגים: Forward, Backward, Today, Only capacity reqs.",
        beginnerHe:
          "התזמון עונה על 'מתי להתחיל ומתי נסיים'. תזמון-אחורה מתחיל מתאריך-היעד ומחשב לאחור מתי חייבים להתחיל.",
        consultantHe:
          "פרמטרי-תזמון מוגדרים פר Order Type+Plant ב-OPU3. Scheduling Type, Automatic Scheduling ו-Reduction Strategies שולטים בהתנהגות. Scheduling Margin Key (OPJK) מוסיף Floats. אם תאריך-ההתחלה-המחושב בעבר, המערכת עוברת ל-Today Scheduling.",
        purposeHe:
          "לקבוע מתי להתחיל ייצור כדי לעמוד ביעד, ולאפשר תכנון-קיבולת ריאלי.",
        processExampleHe:
          "פק\"ע עם תאריך-סיום נדרש: תזמון-אחורה מחשב משך מכל פעולה (נוסחאות-המרכז) ומגיע לתאריך-התחלה; Floats מוסיפים מרווחי-ביטחון.",
        cbcHe:
          "ב-CBC תזמון-אחורה מתאריך-אספקה קובע מתי להתחיל מילוי, בהתחשב בזמני-הכנה וניקוי-קו.",
        navHe: [
          "Production ► Shop Floor Control ► Operations ► Scheduling ► Define Scheduling Parameters for Production Orders (OPU3)",
        ],
        tables: ["AFKO", "AFVV", "PLPO"],
        tcodes: ["OPU3", "OPJK", "CO01", "CM01"],
        fiori: ["F2336", "F0289"],
        configHe: [
          "Scheduling Parameters פר Order Type+Plant (OPU3).",
          "Scheduling Type, Automatic Scheduling, Reduction Strategies.",
          "Scheduling Margin Key (OPJK) — Floats.",
        ],
        flow: [
          { he: "ערכי-זמן (Routing)", code: "PLPO" },
          { he: "נוסחאות-מרכז", code: "OP21" },
          { he: "פרמטרי-תזמון", code: "OPU3" },
          { he: "תזמון אחורה/קדימה", code: "Backward" },
          { he: "תאריכי-פק\"ע", code: "AFKO" },
        ],
        masterDataHe: ["AFKO-GLTRP/GSTRP = תאריכי סיום/התחלה · AFVV = ערכי-זמן/תזמון-פעולה."],
        mistakesHe: [
          "Floats גדולים מדי ➔ משך-תכנון מנופח.",
          "Reduction לא-מופעל ➔ פק\"ע ארוכה מדי.",
        ],
        troubleshootHe: [
          "תאריכי-התחלה בעבר ➔ מעבר ל-Today Scheduling; בדוק Floats/Reduction.",
          "משך-פק\"ע ארוך ➔ נוסחאות/ערכי-תקן שגויים או Reduction כבוי.",
        ],
        bestPracticeHe: [
          "Scheduling Margin Key ריאלי.",
          "Automatic Scheduling בשחרור לתאריכים מעודכנים.",
        ],
        interviewHe: [
          { qHe: "מה ההבדל תזמון-אחורה מול קדימה?", aHe: "אחורה מחשב מתאריך-סיום נדרש לאחור; קדימה מתאריך-התחלה והלאה." },
          { qHe: "מתי המערכת עוברת ל-Today Scheduling?", aHe: "כשתאריך-ההתחלה-המחושב נופל בעבר." },
        ],
        takeawaysHe: [
          "תזמון = תאריכי-פק\"ע מערכי-זמן.",
          "פרמטרים ב-OPU3, Floats ב-OPJK.",
          "תאריך-עבר ➔ Today Scheduling.",
        ],
        relatedHe: [
          { labelHe: "PP · מרכז עבודה (3.3)", href: "/library/pp/chapter-03/#sub-3.3" },
          { labelHe: "אובייקט · AFKO", href: "/library/pp/object/AFKO/" },
        ],
      },
      // ============================================================ 3.8
      {
        id: "3.8", titleHe: "פרופיל תזמון-ייצור", titleEn: "Production Scheduling Profile",
        execHe:
          "פרופיל תזמון-הייצור (OPKP) מרכז אוטומציות-פק\"ע: שחרור-אוטומטי ביצירה, מתכון-בקרה אוטומטי, קבלת-תוצר אוטומטית (Auto-GR), סגירה-אוטומטית וברירות-דיווח. משויך לאב-החומר (MARC-SFCPF).",
        beginnerHe:
          "פרופיל שאומר ל-SAP 'עשה את הצעדים החוזרים לבד': שחרר את הפק\"ע מיד, קבל את התוצר אוטומטית וכו'. חוסך לחיצות ידניות.",
        consultantHe:
          "ב-OPKP מגדירים את האוטומציות ומשייכים לאב-החומר בתצוגת Work Scheduling. קריטי לנפח-גבוה. שים לב: Auto-GR מסוכן אם הדיווח (Confirmation) לא אמין — תקבל מלאי שגוי.",
        purposeHe:
          "לחסוך צעדים-ידניים חוזרים ולהבטיח עיבוד אחיד בנפח-גבוה.",
        processExampleHe:
          "יצירת פק\"ע עם SFCPF הכולל Auto-Release ➔ הפק\"ע נפתחת ישר ב-REL; דיווח-סיום ➔ Auto-GR מבצע קבלת-תוצר אוטומטית.",
        cbcHe:
          "ב-CBC הפרופיל מפעיל שחרור וקבלת-תוצר אוטומטיים בקווי-מילוי בנפח-גבוה — מצמצם התערבות ידנית.",
        navHe: [
          "Production ► Shop Floor Control ► Master Data ► Define Production Scheduling Profile (OPKP)",
        ],
        tables: ["T399P", "MARC"],
        tcodes: ["OPKP", "MM02", "CO01"],
        fiori: ["F2336"],
        configHe: [
          "OPKP: Automatic Release, Automatic GR, Settlement, Confirmation defaults.",
          "שיוך לאב-החומר (Work Scheduling, שדה SFCPF).",
        ],
        flow: [
          { he: "הגדר פרופיל", code: "OPKP" },
          { he: "שייך לאב-חומר", code: "MM02", note: "SFCPF" },
          { he: "אוטומציות", code: "Release/GR" },
        ],
        masterDataHe: ["MARC-SFCPF = Production Scheduling Profile (תצוגת Work Scheduling)."],
        mistakesHe: [
          "פרופיל לא-משויך לאב-החומר ➔ אין אוטומציה.",
          "Auto-GR עם דיווח לא-אמין ➔ מלאי שגוי.",
        ],
        troubleshootHe: [
          "פק\"ע נפתחת ב-CRTD במקום REL ➔ Auto-Release כבוי או פרופיל לא-משויך.",
          "רישומי-מלאי שגויים ➔ Auto-GR פעיל אך הדיווח לא-מדויק.",
        ],
        bestPracticeHe: [
          "שחרור-אוטומטי רק היכן שבדיקת-זמינות אינה קריטית.",
          "הימנע מ-Auto-GR אם הדיווח אינו אמין.",
        ],
        interviewHe: [
          { qHe: "מה מרכז ה-Production Scheduling Profile?", aHe: "אוטומציות-פק\"ע: Auto-Release, Auto-GR, Settlement וברירות-דיווח; משויך באב-החומר (SFCPF)." },
          { qHe: "מה הסיכון ב-Auto-GR?", aHe: "אם הדיווח לא אמין, קבלת-התוצר האוטומטית יוצרת מלאי שגוי." },
        ],
        takeawaysHe: [
          "OPKP = אוטומציות-פק\"ע.",
          "משויך באב-החומר (SFCPF).",
          "Auto-GR רק עם דיווח אמין.",
        ],
        relatedHe: [
          { labelHe: "PP · אב חומר (3.1)", href: "/library/pp/chapter-03/#sub-3.1" },
          { labelHe: "אובייקט · MARC", href: "/library/pp/object/MARC/" },
        ],
      },
      // ============================================================ 3.9
      {
        id: "3.9", titleHe: "בדיקת זמינות (Availability Check)", titleEn: "Availability Check",
        execHe:
          "בדיקת-הזמינות הדינמית (ATP — Available-to-Promise) בודקת אם החומר הנדרש זמין בתאריך-הדרישה של הפק\"ע. נשלטת על-ידי Checking Group (באב-החומר) + Checking Rule (לפי סוג-פק\"ע ומפעל) → Scope of Check.",
        beginnerHe:
          "לפני שמשחררים פק\"ע, SAP בודק 'יש לי את כל הרכיבים?'. אם חסר — מתריע. כך לא מתחילים ייצור שייתקע.",
        consultantHe:
          "Checking Group (MARC-MTVFP) + Checking Rule (OPJK) קובעים יחד את Scope of Check (OPJJ) — אילו מלאים/קבלות/דרישות נכללים. Release material: 1 המשתמש מחליט (מומלץ), 2 שחרור-למרות-חוסר, 3 ללא-שחרור.",
        purposeHe:
          "למנוע שחרור-פק\"ע ללא חומר, ולהתריע על חוסרים לפני שהביצוע נתקע.",
        processExampleHe:
          "בשחרור-פק\"ע ATP בודק מול Scope of Check; חוסר ➔ סטטוס MSPT (Missing Parts) ➔ ניתוח ב-CO24 ו-MD04.",
        cbcHe:
          "ב-CBC בדיקת-הזמינות מבטיחה שתרכיז/אריזה זמינים לפני שחרור פק\"ע-המילוי; חוסר נחסם ומנותב ל-MD04.",
        navHe: [
          "Production ► Shop Floor Control ► Operations ► Availability Check ► Define Checking Control (OPJK)",
          "Production ► Shop Floor Control ► Operations ► Availability Check ► Define Scope of Check (OPJJ)",
        ],
        tables: ["TMVF", "MARC", "RESB"],
        tcodes: ["OPJK", "OPJJ", "CO24", "MD04", "CO09"],
        fiori: ["F0247", "F2101"],
        configHe: [
          "Checking Group ➔ אב-החומר (MRP3, MTVFP).",
          "Checking Rule ב-Checking Control (OPJK) לפי Order Type+Plant.",
          "Scope of Check (OPJJ) — מלאים/קבלות/דרישות.",
          "Release material = 1/2/3 (מומלץ 1).",
        ],
        flow: [
          { he: "Checking Group", code: "MTVFP", note: "אב-חומר" },
          { he: "Checking Rule", code: "OPJK" },
          { he: "Scope of Check", code: "OPJJ" },
          { he: "ATP בשחרור", code: "CO02" },
          { he: "ניתוח-חוסרים", code: "CO24" },
        ],
        masterDataHe: ["MARC-MTVFP = Checking Group (MRP3) · ATP מול MARD/RESB."],
        mistakesHe: [
          "Checking Group ריקה ➔ אין בדיקה כלל.",
          "Scope of Check כולל מלאי לא-רלוונטי ➔ בדיקה מאשרת למרות חוסר.",
        ],
        troubleshootHe: [
          "פק\"ע לא משוחררת — MSPT ➔ נתח חוסרים ב-CO24/MD04.",
          "הבדיקה מתעלמת מרכש-צפוי ➔ הפעל With Purchase Orders ב-OPJJ.",
          "בדיקה מאשרת למרות חוסר ➔ Scope of Check כולל מלאי לא-רלוונטי.",
        ],
        bestPracticeHe: [
          "Checking Rule ייעודי לייצור — בידוד מתחומים אחרים.",
          "השאר Release material=1 — המתכנן מחליט.",
        ],
        interviewHe: [
          { qHe: "מה קובע את Scope of Check?", aHe: "הצירוף Checking Group × Checking Rule — אילו מלאים/קבלות/דרישות נכללים ב-ATP." },
          { qHe: "מהו סטטוס MSPT?", aHe: "Missing Parts — פק\"ע לא שוחררה בגלל חוסר-רכיבים; מנותח ב-CO24/MD04." },
        ],
        takeawaysHe: [
          "ATP בודק זמינות לפני שחרור.",
          "Checking Group × Rule → Scope of Check.",
          "Release material=1 מומלץ.",
        ],
        relatedHe: [
          { labelHe: "PP · MRP (פרק 4)", href: "/library/pp/chapter-04/" },
          { labelHe: "אובייקט · RESB", href: "/library/pp/object/RESB/" },
        ],
        children: [
          {
            id: "3.9.1", titleHe: "הגדרת קבוצת-הבדיקה", titleEn: "Define the Checking Group",
            execHe: "Checking Group (MARC-MTVFP) מוגדרת באב-החומר וקובעת אם בכלל מתבצעת בדיקה ובאיזו לוגיקה (ATP מול תכנון). זו נקודת-הכניסה ללוגיקת-הזמינות.",
            beginnerHe: "מחליטה האם החומר 'נבדק לזמינות' בכלל, ובאיזה אופן.",
            consultantHe: "מגדירים Checking Group (למשל 02 individual requirements) ומשייכים לאב-החומר (MRP3). Checking Group ריקה = אין בדיקה.",
            purposeHe: "להפעיל/לכבות בדיקת-זמינות ולקבוע את לוגיקתה ברמת-החומר.",
            processExampleHe: "חומר עם Checking Group 02 נבדק ב-ATP בעת שחרור-פק\"ע; חומר ללא קבוצה — לא נבדק.",
            cbcHe: "ב-CBC כל רכיב-מיוצר מקבל Checking Group עם ATP; חומרי-עזר זניחים — ללא-בדיקה.",
            navHe: ["Production ► MRP ► Availability Check ► Define Checking Groups"],
            tables: ["TMVF", "MARC"],
            tcodes: ["OVZ2", "MM02"],
            fiori: ["F0247"],
            configHe: ["הגדר Checking Group ושייך לאב-החומר בתצוגת MRP3 (MTVFP)."],
            mistakesHe: ["Checking Group ריקה לרכיב-קריטי ➔ אין בדיקה."],
            troubleshootHe: ["אין בדיקת-זמינות כלל ➔ Checking Group ריקה או 'no check'."],
            bestPracticeHe: ["ודא שכל רכיב-קריטי נושא קבוצה פעילה."],
            interviewHe: [{ qHe: "היכן מוגדרת Checking Group?", aHe: "באב-החומר, MARC-MTVFP (תצוגת MRP3)." }],
            takeawaysHe: ["קובעת אם/איך נבדקת זמינות.", "ריקה = אין בדיקה."],
          },
          {
            id: "3.9.2", titleHe: "הגדרת כלל-הבדיקה", titleEn: "Define the Checking Rule",
            execHe: "Checking Rule (יחד עם Checking Group) קובע את Scope of Check — אילו אלמנטי-מלאי, קבלות והוצאות נכללים בחישוב ה-ATP עבור יישום מסוים.",
            beginnerHe: "הכלל מגדיר 'מה נספר כזמין' — איזה מלאי וקבלות לוקחים בחשבון.",
            consultantHe: "משייכים Checking Rule (PP) ב-OPJK לפי Order Type+Plant ומגדירים Scope ב-OPJJ. Checking Rules שונים (פק\"ע מול מכירות) נותנים תוצאות-ATP שונות — תקין אך יש להבין.",
            purposeHe: "להתאים את היקף-הבדיקה ליישום — ייצור שונה ממכירות.",
            processExampleHe: "Checking Rule של ייצור כולל מלאי-זמין + קבלות-רכש מאושרות, מתעלם ממלאי-QI שטרם שוחרר.",
            cbcHe: "ב-CBC Checking Rule ייעודי-לייצור כולל מלאי-זמין + רכש-מאושר, מתעלם ממלאי-QI.",
            navHe: ["Production ► MRP ► Availability Check ► Define Checking Rule + Scope of Check (OPJJ)"],
            tables: ["TMVFP", "RESB"],
            tcodes: ["OPJK", "OPJJ"],
            fiori: ["F0247"],
            configHe: ["שייך Checking Rule ב-OPJK לפי Order Type+Plant; הגדר Scope ב-OPJJ (מלאים/קבלות/דרישות)."],
            mistakesHe: ["מלאי-QI נספר כזמין ➔ הסר מ-Scope.", "ערבוב לוגיקת-ATP בין תחומים."],
            troubleshootHe: [
              "תוצאת-ATP שונה פק\"ע מול מכירות ➔ Checking Rules שונים (תקין).",
              "מלאי-QI נספר בטעות ➔ הסר מ-Scope of Check ב-OPJJ.",
            ],
            bestPracticeHe: ["דבּר על Checking Group × Rule כזוג, לא בנפרד."],
            interviewHe: [{ qHe: "מה קובע יחד עם Checking Group?", aHe: "את Scope of Check — אילו מלאים/קבלות/דרישות נכללים ב-ATP." }],
            takeawaysHe: ["Rule + Group → Scope.", "כלל ייעודי-לייצור."],
          },
        ],
      },
      // ============================================================ 3.10
      {
        id: "3.10", titleHe: "גרסת ייצור (Production Version)", titleEn: "Production Version",
        execHe:
          "גרסת-הייצור (MKAL) מקשרת BOM Alternative + Routing/Recipe Group לחומר ומפעל, עם תוקף וטווח-כמויות. ב-S/4HANA היא חובה — ה-MRP, ההמרה-לפק\"ע והתמחיר נשענים עליה. היא ה'דבק' המאחד את כל נתוני-האב.",
        beginnerHe:
          "הגרסה אומרת 'לְמוצר הזה, באיזה מתכון (BOM) ובאיזה מסלול (Routing) מייצרים, ולאיזה כמויות ותאריכים'. היא מחברת הכל יחד.",
        consultantHe:
          "MKAL נושאת ALNAL (Routing group), STLAL (BOM alternative), ADATU/BDATU (תוקף), BSTMI/BSTMA (טווח-כמות). ב-S/4HANA חובה — המרת הזמנה-מתוכננת נכשלת בלעדיה (כשל-קשיח). הרץ Consistency Check (C223) אחרי כל שינוי.",
        purposeHe:
          "להגדיר איזה שילוב BOM+Routing תקף לאיזה טווח-כמויות ומתי, ולאפשר ניהול שיטות-ייצור מרובות.",
        processExampleHe:
          "MRP יוצר הזמנה-מתוכננת; ההמרה-לפק\"ע בוחרת Production Version תקפה לפי תאריך וכמות, וטוענת את ה-BOM וה-Routing המתאימים.",
        cbcHe:
          "ב-CBC כל מוצר-מיוצר חייב Production Version תקפה — תנאי-סף להרצת-MRP ולהמרת-הזמנות על קווי-המילוי.",
        navHe: ["Logistics ► Production ► Master Data ► Production Version (C223)"],
        tables: ["MKAL", "MARC"],
        tcodes: ["C223", "MM02", "CU51"],
        fiori: ["F1421", "F2336"],
        configHe: [
          "תחזק Production Versions ב-C223 (או MRP4 באב-החומר).",
          "Consistency Check (C223) לאימות-תוקף ה-BOM/Routing.",
          "ADATU/BDATU (תוקף), BSTMI/BSTMA (טווח-כמות).",
        ],
        flow: [
          { he: "BOM Alternative", code: "STLAL" },
          { he: "Routing Group", code: "ALNAL" },
          { he: "Production Version", code: "C223" },
          { he: "Consistency Check", code: "ירוק=תקף" },
          { he: "זמין ל-MRP/פק\"ע", code: "MD01N" },
        ],
        masterDataHe: ["MKAL: ALNAL/STLAL/ADATU/BDATU/BSTMI/BSTMA."],
        mistakesHe: [
          "ריבוי-גרסאות עם טווחים חופפים ➔ בחירה לא-צפויה.",
          "Production Version חסרה ➔ כשל-המרה קשיח ב-S/4HANA.",
        ],
        troubleshootHe: [
          "MRP לא מוצא Version ➔ תוקף/טווח-כמות לא-תואמים או Consistency Check אדום.",
          "המרת הזמנה-מתוכננת נכשלת ➔ חוסר Production Version.",
        ],
        bestPracticeHe: [
          "Production Version אחת ברורה לכל חומר.",
          "Consistency Check אחרי כל שינוי ב-BOM/Routing.",
        ],
        interviewHe: [
          { qHe: "מה מקשרת Production Version?", aHe: "BOM Alternative + Routing לחומר/מפעל, עם תוקף וטווח-כמות (MKAL)." },
          { qHe: "מדוע היא חובה ב-S/4HANA?", aHe: "ה-MRP, ההמרה-לפק\"ע והתמחיר נשענים עליה; בלעדיה ההמרה נכשלת." },
        ],
        takeawaysHe: [
          "Production Version = הדבק של BOM+Routing.",
          "חובה ב-S/4HANA.",
          "הרץ Consistency Check אחרי שינוי.",
        ],
        relatedHe: [
          { labelHe: "PP · עץ מוצר (3.2)", href: "/library/pp/chapter-03/#sub-3.2" },
          { labelHe: "PP · מסלול ייצור (3.4)", href: "/library/pp/chapter-03/#sub-3.4" },
          { labelHe: "אובייקט · MKAL", href: "/library/pp/object/MKAL/" },
        ],
      },
    ],
  },
};

function countNodes(n: LearningNode): number {
  return 1 + (n.children?.reduce((s, c) => s + countNodes(c), 0) ?? 0);
}

export const PP_TEXTBOOK_STATS = Object.fromEntries(
  Object.entries(PP_TEXTBOOK).map(([ch, c]) => {
    const total = c.subchapters.reduce((s, n) => s + countNodes(n), 0);
    const words = c.subchapters.reduce(
      (s, n) => s + nodeWordCount(n) + (n.children?.reduce((a, ch2) => a + nodeWordCount(ch2), 0) ?? 0),
      0,
    );
    return [ch, { parents: c.subchapters.length, totalNodes: total, words, readMin: Math.round(words / 180) }];
  }),
);
