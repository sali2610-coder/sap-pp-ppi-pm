// ===== PP Digital Textbook — Chapter 3 (reference chapter) =====
// SAP-Learning-Hub-grade. Hierarchy follows the source book; corrupted parent
// headings from the PDF TOC extraction were corrected, coherent source
// sub-headings (3.2.x / 3.3.x / 3.5.x / 3.6.x / 3.9.x) preserved verbatim in
// original order as nested units. Transformative Hebrew (no source prose);
// SAP identifiers (T-Codes, tables, Fiori, IMG paths) verbatim EN.

export interface FlowStep { he: string; code?: string; note?: string }

// nested source sub-heading (3.2.1 …) — focused authored content
export interface SubSection {
  id: string;
  titleHe: string;
  titleEn: string;
  conceptHe: string;
  implementationHe: string[];
  cbcHe: string;
  troubleshootHe: string[];
  consultantHe: string;
}

export interface Subchapter {
  id: string;
  titleHe: string;
  titleEn: string;
  conceptHe: string;
  purposeHe: string;
  configHe: string[];
  navHe: string[];
  tcodes: string[];
  tables: string[];
  fiori: string[];
  masterDataHe: string[];
  flow?: FlowStep[];
  cbcHe: string;
  troubleshootHe: string[];
  bestPracticeHe: string[];
  children?: SubSection[];
}

export interface TextbookChapter {
  n: number;
  titleHe: string;
  titleEn: string;
  introHe: string;
  subchapters: Subchapter[];
}

export const PP_TEXTBOOK: Record<string, TextbookChapter> = {
  "3": {
    n: 3,
    titleHe: "הגדרת ייצור בדיד (Discrete Manufacturing Configuration)",
    titleEn: "Discrete Manufacturing Configuration",
    introHe:
      "פרק זה מלמד את הקונפיגורציה המלאה של ייצור בדיד ב-SAP S/4HANA — מנתוני האב (אב חומר, BOM, מרכז עבודה, מסלול ייצור) דרך אובייקטי הבקרה (סוג פק\"ע, פרמטרים תלויי סוג-הזמנה, תזמון, פרופיל תזמון, בדיקת זמינות) ועד גרסת הייצור המאחדת הכל. כל תת-פרק הוא יחידת לימוד עצמאית עם 12 מקטעים, ותתי-הסעיפים של הספר המקורי שמורים כיחידות מקוננות הניתנות לפתיחה.",
    subchapters: [
      // ---------- 3.1 ----------
      {
        id: "3.1", titleHe: "אב חומר לייצור", titleEn: "Material Master",
        conceptHe:
          "אב החומר הוא רשומת המקור המתארת כל חומר שהארגון מתכנן, רוכש, מייצר, מאחסן ומוכר. הוא מאורגן בתצוגות (Views) לפי תחום: Basic Data, MRP 1–4, Work Scheduling, Accounting, Costing. הנתונים נשמרים ברמת לקוח (MARA) וברמת מפעל (MARC). לייצור בדיד, תצוגות ה-MRP וה-Work Scheduling הן הקריטיות.",
        purposeHe:
          "מטרת התצוגות היא לאפשר ל-MRP לתכנן נכון: מתי, כמה, ומאיפה (ייצור פנימי מול רכש). פרמטרים שגויים כאן מתפשטים לכל שרשרת התכנון — לכן אב החומר הוא נקודת הפתיחה של כל מימוש PP.",
        configHe: [
          "הגדר Material Type (FERT מוגמר, HALB חצי-מוגמר, ROH חומר גלם) — קובע אילו תצוגות נפתחות, טווחי מספרים וסוגי רכש מותרים.",
          "שלוט בנראות שדות דרך Field Selection (OMS9) — שדה חובה / אופציונלי / מוסתר לפי Field Reference.",
          "קבע רצף מסכים ובחירת תצוגות לפי ענף ותפקיד משתמש (OMT3E).",
          "קבע Scheduling Margin Key (Floats) ב-OPJK — בסיס לחישוב תאריכי ההזמנה המתוכננת.",
        ],
        navHe: [
          "Logistics – General ► Material Master ► Field Selection ► Maintain Field Selection for Data Screens (OMS9)",
          "Logistics – General ► Material Master ► Configuring the Material Master ► Maintain Order of Main and Additional Screens (OMT3E)",
        ],
        tcodes: ["MM01", "MM02", "MM03", "MM17", "MMSC", "MD04"],
        tables: ["MARA", "MARC", "MAKT", "MARD", "MBEW"],
        fiori: ["F1602A", "F0247", "F1422"],
        masterDataHe: [
          "MARC-DISMM = MRP Type (PD תכנון דרישות / VB נקודת הזמנה / ND ללא תכנון).",
          "MARC-DISLS = Lot Size · MARC-BESKZ = Procurement Type (E פנימי / F רכש / X שניהם).",
          "MARC-SFCPF = Production Scheduling Profile · MARC-DZEIT = In-house Production Time.",
          "Safety Stock · Reorder Point · MRP Controller · Strategy Group (תכנון מלאי/הזמנה).",
        ],
        flow: [
          { he: "בחירת Material Type", code: "FERT/HALB/ROH", note: "קובע תצוגות וטווח מספרים" },
          { he: "תצוגות בסיס", code: "MM01", note: "Basic Data 1/2" },
          { he: "פרמטרי MRP", code: "DISMM/DISLS", note: "MRP 1–4" },
          { he: "Work Scheduling", code: "SFCPF", note: "פרופיל תזמון" },
          { he: "Accounting/Costing", code: "MBEW", note: "הערכת שווי" },
          { he: "מוכן ל-MRP", code: "MD04", note: "מצב מלאי/דרישות" },
        ],
        cbcHe:
          "ב-CBC: תרכיז/סוכר/CO2 הם ROH מנוהלי-אצווה (Batch); המשקה המוגמר FERT. לכל מוצר מיוצר נדרשים נתוני MRP מלאים + Production Scheduling Profile כדי שה-MRP יתכנן את קווי המילוי.",
        troubleshootHe: [
          "MRP לא מייצר הזמנות ➔ MRP Type = ND, או תצוגת MRP חסרה במפעל, או אין MRP Controller.",
          "תאריכי הזמנה מתוכננת לא הגיוניים ➔ Scheduling Margin Key / In-house Production Time שגויים.",
          "החומר לא נכלל בהרצת MRP ➔ חסר Plant/Storage extension (MMSC) או תצוגת MRP במפעל הרלוונטי.",
        ],
        bestPracticeHe: [
          "הזן פרמטרי MRP באמצעות Mass Maintenance (MM17) לעקביות בין חומרים.",
          "תקנן מעט MRP Types ו-Lot Sizes ברורים — פחות שונות = פחות שגיאות תכנון.",
          "שמור על אסטרטגיית Material Type אחידה מתואמת עם FI/CO.",
        ],
      },
      // ---------- 3.2 BOM + children ----------
      {
        id: "3.2", titleHe: "עץ מוצר (Bill of Materials)", titleEn: "Bill of Materials",
        conceptHe:
          "ה-BOM הוא רשימה מובנית של כל הרכיבים המרכיבים מוצר או מכלול. בייצור בדיד משתמשים ב-Material BOM. מבנה: כותרת (STKO) ופריטים (STPO). פריט נושא Item Category הקובעת התנהגות, וכמות עם פחת רכיב (Component Scrap).",
        purposeHe:
          "ה-BOM הוא מקור הפיצוץ (Explosion) של הפק\"ע וה-MRP — ממנו נגזרות דרישות הרכיבים (Reservation למלאי, דרישת רכש ללא-מלאי). הוא גם בסיס לתמחיר המוצר (Costing).",
        configHe: [
          "הגדר BOM Usage (1 = ייצור) — קובע לאילו יישומים תקף ה-BOM ואילו סטטוסי-בחירה ברירת-מחדל לכל יישום.",
          "הגדר Item Categories (L מלאי, N לא-מלאי, T טקסט, D מסמך, R variable-size, I אלמנט מבנה).",
          "הגדר BOM Status — שולט בשימוש ב-MRP, תמחיר, פק\"ע ושחרור הנדסי.",
          "הגדר סוגי חומר מותרים בכותרת ה-BOM ו-Explosion Types לבחירה דינמית.",
        ],
        navHe: [
          "Production ► Basic Data ► Bill of Material ► General Data ► BOM Usage ► Define BOM Usages (OS20)",
          "Production ► Basic Data ► Bill of Material ► Item Data ► Define Item Categories (OS23)",
        ],
        tcodes: ["CS01", "CS02", "CS03", "CS11", "CS12", "CS20", "CS40"],
        tables: ["STKO", "STPO", "MAST", "STAS", "STZU"],
        fiori: ["F1813", "F1743"],
        masterDataHe: [
          "MAST = שיוך BOM לחומר/מפעל · STKO = כותרת (Base Quantity, Usage, Status).",
          "STPO = פריט (Component IDNRK, Quantity MENGE, Item Category POSTP, Scrap).",
        ],
        flow: [
          { he: "כותרת BOM", code: "STKO", note: "כמות בסיס + Usage" },
          { he: "פריטים + קטגוריה", code: "STPO", note: "L/N/T/D/R" },
          { he: "שיוך לחומר/מפעל", code: "MAST" },
          { he: "פיצוץ בפק\"ע/MRP", code: "Explosion", note: "לפי Explosion Type" },
          { he: "Reservation / דרישת רכש", code: "RESB/BANF" },
        ],
        cbcHe:
          "ב-CBC ה-BOM של משקה כולל תרכיז + סוכר + CO2 + חומרי אריזה, עם פחת רכיב (~1%). פריטי מלאי (L) מפעילים Reservation; שירותי חוץ כ-non-stock (N).",
        troubleshootHe: [
          "רכיב לא מופיע בפק\"ע ➔ BOM Status לא משוחרר, Valid-From עתידי, או כמות בסיס שגויה.",
          "כמות רכיב כפולה מהצפוי ➔ כפל פחת (Assembly Scrap + Component Scrap).",
          "בחירת BOM שגויה ➔ בדוק Alternative Selection ו-Production Version.",
        ],
        bestPracticeHe: [
          "נהל שינויי BOM עם Change Number (ECM, CC01) — שומר היסטוריה ותוקף.",
          "הימנע מ-Alternatives מיותרים; נהל בחירה דרך Production Version.",
          "הגדר Item Category נכונה כבר בהזנה — L מול N קובע Reservation מול רכש.",
        ],
        children: [
          {
            id: "3.2.1", titleHe: "הגדרת שימושי BOM", titleEn: "Defining Bill of Materials Usages",
            conceptHe: "BOM Usage קובע באילו יישומים (ייצור, תכנון, תמחיר, מכירות, תחזוקה) ה-BOM תקף, ומגדיר עבור כל יישום אילו פריטים רלוונטיים דרך אינדיקטורי-בחירה (Production/Engineering/Costing relevancy).",
            implementationHe: [
              "ב-OS20 הגדר Usage והגדר לכל אינדיקטור-יישום ערך: + חובה, - לא רלוונטי, . אופציונלי.",
              "Usage 1 (ייצור) מסמן Production+Costing+Engineering כרלוונטיים כברירת מחדל.",
            ],
            cbcHe: "ב-CBC משתמשים ב-Usage 1 לכל ה-BOMs של המשקאות; Usage נפרד לתחזוקה (PM) מופרד כדי לא לערבב רכיבי אריזה עם חלקי חילוף.",
            troubleshootHe: ["פריט לא נצרך בפק\"ע למרות שקיים ב-BOM ➔ אינדיקטור Production ב-Usage מוגדר '-'."],
            consultantHe: "הגדר מעט Usages; ריבוי Usages מקשה על תחזוקת ה-BOM ועל בחירת ה-Alternative.",
          },
          {
            id: "3.2.2", titleHe: "סוגי חומר מותרים בכותרת ה-BOM", titleEn: "Allowed Material Types in the BOM Header",
            conceptHe: "הגדרה השולטת אילו Material Types מותר שיהיו חומר-הכותרת של BOM לכל Usage — מונעת יצירת BOM לחומר שאינו אמור להיות מיוצר/מורכב.",
            implementationHe: ["שייך Material Types מותרים (FERT, HALB) ל-BOM Usage; חומרי ROH בדרך-כלל אינם נושאי-כותרת BOM."],
            cbcHe: "ב-CBC רק FERT ו-HALB מורשים ככותרת BOM; ROH (תרכיז/סוכר) חסומים מיצירת BOM כדי למנוע מבנים שגויים.",
            troubleshootHe: ["שגיאה ביצירת BOM 'Material type not allowed' ➔ הוסף את ה-Material Type לרשימת המותרים ל-Usage."],
            consultantHe: "כלל זה הוא בקרת איכות-נתונים זולה — הגדר אותו מוקדם כדי למנוע BOMs מומצאים.",
          },
          {
            id: "3.2.3", titleHe: "סטטוס BOM", titleEn: "Bill of Materials Status",
            conceptHe: "BOM Status קובע אם ה-BOM פעיל ב-MRP, בתמחיר, בפק\"ע ובשחרור הנדסי. סטטוס 1 = פעיל לכל היישומים.",
            implementationHe: ["הגדר Status וסמן את אינדיקטורי-היישום (Active, MRP, Costing, Order, Engineering)."],
            cbcHe: "ב-CBC BOM של מוצר בפיתוח מקבל סטטוס 'Inactive' עד אישור הנדסי, ואז מועבר ל-Status 1 לפני ייצור מסחרי.",
            troubleshootHe: ["MRP מתעלם מ-BOM ➔ Status ללא אינדיקטור MRP, או Status לא-פעיל."],
            consultantHe: "השתמש בסטטוס לא-פעיל לניהול מוצרים בפיתוח — עדיף מאשר למחוק/לשחזר BOMs.",
          },
          {
            id: "3.2.4", titleHe: "BOM עם דרישת היסטוריה", titleEn: "Bill of Materials with History Requirement",
            conceptHe: "כאשר מופעלת דרישת היסטוריה, כל שינוי ב-BOM מחייב Change Number (ECM) — נשמרת היסטוריית תוקף מלאה (Valid-From) לצורכי ביקורת ושחזור.",
            implementationHe: ["הפעל History Requirement ל-Usage; מרגע זה שינויים ללא Change Number נחסמים."],
            cbcHe: "ב-CBC מוצרים תחת רגולציה (מתכון/אלרגנים) מנוהלים עם דרישת היסטוריה — כל שינוי רכיב מתועד עם תאריך ומאשר.",
            troubleshootHe: ["לא ניתן לשמור שינוי BOM ➔ History Requirement פעיל ולא הוזן Change Number (CC01)."],
            consultantHe: "הפעל היסטוריה רק היכן שנדרש (רגולציה/בטיחות) — היא מוסיפה חיכוך לכל שינוי.",
          },
          {
            id: "3.2.5", titleHe: "קטגוריית פריט ב-BOM", titleEn: "Item Category in Bill of Materials",
            conceptHe: "Item Category קובעת את אופי הפריט: L פריט-מלאי (Reservation), N פריט לא-מלאי (דרישת רכש ישירה), T טקסט, D מסמך, R variable-size, I אלמנט מבנה.",
            implementationHe: ["ב-OS23 הגדר קטגוריה וסמן מאפיינים: Stock relevance, Inventory mgmt, Sub-item allowed, Variable-size."],
            cbcHe: "ב-CBC רכיבי מלאי (תרכיז/אריזה) = L; שירותי מעבדה חיצונית = N (דרישת רכש ישירה לפק\"ע).",
            troubleshootHe: ["דרישת רכש לא נוצרת לרכיב-שירות ➔ הפריט הוגדר L במקום N."],
            consultantHe: "L מול N היא ההחלטה החשובה ביותר בשורת BOM — היא קובעת Reservation מול רכש.",
          },
          {
            id: "3.2.6", titleHe: "נוסחאות פריט משתנה-גודל", titleEn: "Variable-Size Item Formulas",
            conceptHe: "פריט variable-size (קטגוריה R) מחשב כמות מתוך מידות (אורך/רוחב/עובי) באמצעות נוסחה — לחומרים הנמדדים פיזית ולא בכמות בדידה.",
            implementationHe: ["הגדר Formula עם משתני-מידה (ROMS1/ROMS2/ROMS3); הקצה לפריט ה-variable-size ב-BOM."],
            cbcHe: "ב-CBC רלוונטי פחות למשקאות; שימושי ליריעות/פילם אריזה הנמדדים בשטח (אורך×רוחב) ומתורגמים לצריכה.",
            troubleshootHe: ["כמות variable-size שגויה ➔ הנוסחה או יחידות-המידה שהוזנו אינן תואמות."],
            consultantHe: "השתמש בנוסחאות מובנות (SAP-delivered) כשאפשר לפני כתיבת נוסחה מותאמת.",
          },
          {
            id: "3.2.7", titleHe: "סוגי פיצוץ BOM", titleEn: "Bill of Materials Explosion Types",
            conceptHe: "Explosion Type קובע כיצד MRP מפוצץ את ה-BOM לאורך הזמן — האם להשתמש בתאריך הדרישה, בתוקף קבוע, או בפיצוץ פאנטום (Phantom).",
            implementationHe: ["הגדר Explosion Type והקצה לפריט; פאנטום (קטגוריה מיוחדת) מעביר דרישות ישירות לרכיבי-המשנה ללא מלאי ביניים."],
            cbcHe: "ב-CBC מכלול-ביניים שאינו מאוחסן (תערובת בסיס) מוגדר כפאנטום — דרישותיו עוברות ישירות לרכיבי הגלם.",
            troubleshootHe: ["מלאי-ביניים מצטבר שלא לצורך ➔ הרכיב לא הוגדר כפאנטום (Special Procurement 50)."],
            consultantHe: "פאנטום הוא כלי רב-עוצמה לפישוט מבני-מוצר — מודל ללא רישום מלאי מיותר.",
          },
          {
            id: "3.2.8", titleHe: "בחירת BOM (סדר עדיפויות)", titleEn: "Bill of Materials Selection (Order of Priority)",
            conceptHe: "כאשר קיימים מספר Alternatives, סדר העדיפויות לבחירה הוא: Production Version → Selection by date → Selection by lot-size range → Selection ID.",
            implementationHe: ["הגדר BOM Selection ID (per Plant/Usage) הקובע איזה Alternative נבחר לפי תאריך וטווח כמות."],
            cbcHe: "ב-CBC ריבוי קווי-מילוי לאותו משקה מנוהל דרך Production Versions, כך שכל קו בוחר את ה-BOM/Routing הנכון אוטומטית.",
            troubleshootHe: ["MRP בוחר Alternative שגוי ➔ Selection ID או טווחי הכמות ב-Production Versions שגויים."],
            consultantHe: "ב-S/4HANA העדף בחירה דרך Production Version על-פני Selection ID — היא מפורשת וחד-משמעית.",
          },
        ],
      },
      // ---------- 3.3 Work Center + children ----------
      {
        id: "3.3", titleHe: "מרכז עבודה (Work Center)", titleEn: "Work Center",
        conceptHe:
          "מרכז העבודה מייצג מכונה, קו או תחנת עבודה, ומספק שלוש יכולות: תזמון (Scheduling), קיבולת (Capacity) ועלות (Costing). הוא מקושר ל-Routing דרך הפעולות. Work Center Category קובעת מסכים ויישום רשימת-משימות.",
        purposeHe:
          "מרכז העבודה מתרגם ערכי-זמן תקן לזמן-תזמון, לעומס-קיבולת ולעלות-פעולה. ללא הגדרה נכונה — תזמון ועלות הפק\"ע יהיו שגויים.",
        configHe: [
          "הגדר Work Center Category (OP40) — קובע מסכים, Standard Value Key ויישום (Routing/PP).",
          "הגדר Standard Value Key (OP19) — אילו ערכי-זמן (Setup/Machine/Labor) נאספים.",
          "הגדר Formulas (OP21) לתזמון, קיבולת ועלות; ו-Control Keys (OP00) לפעולות.",
          "שייך Cost Center ו-Activity Types (KP26 לתעריפים) בתצוגת Costing.",
        ],
        navHe: [
          "Production ► Basic Data ► Work Center ► General Data ► Define Work Center Category (OP40)",
          "Production ► Basic Data ► Work Center ► Costing ► Work Center Formulas (OP21)",
        ],
        tcodes: ["CR01", "CR02", "CR03", "CR05", "CR06", "KP26"],
        tables: ["CRHD", "CRCO", "CRCA", "KAKO", "CRTX"],
        fiori: ["F2336", "F4006"],
        masterDataHe: [
          "CRHD = כותרת מרכז-עבודה · CRCO = שיוך מרכז-עלות/Activity Type · KAKO = קיבולת.",
          "Capacity Category 001 (מכונה) / 002 (כוח-אדם), Available Capacity, Utilization %.",
        ],
        flow: [
          { he: "קטגוריה", code: "OP40", note: "מסכים + יישום" },
          { he: "Standard Value Key", code: "OP19", note: "ערכי-זמן נאספים" },
          { he: "נוסחאות", code: "OP21", note: "תזמון/קיבולת/עלות" },
          { he: "Cost Center + Activity", code: "KP26", note: "תעריפים" },
          { he: "שימוש ב-Routing", code: "CA01" },
        ],
        cbcHe:
          "ב-CBC קו-מילוי מוגדר כמרכז עבודה עם Activity Types למכונה ולכוח-אדם; התעריפים (KP26) מזינים את עלות המשקה דרך פעולות הפק\"ע.",
        troubleshootHe: [
          "תזמון פק\"ע שגוי ➔ נוסחאות (OP21) או Standard Values ברשימת-המשימות שגויים.",
          "עלות פעולה אפס ➔ Activity Type ללא תעריף (KP26) או Control Key ללא 'Costing'.",
          "אין עומס קיבולת ➔ Control Key ללא 'Capacity Requirements' או קיבולת לא מוגדרת (KAKO).",
        ],
        bestPracticeHe: [
          "השתמש ב-Standard Value Key הסטנדרטי; הגדר נוסחאות מותאמות רק בעת צורך אמיתי.",
          "הקפד על Control Key עם Scheduling+Costing+Capacity לפעולות ייצור פנימיות.",
          "תאם מוסכמת שמות Activity Types עם ה-CO.",
        ],
        children: [
          {
            id: "3.3.1", titleHe: "קטגוריית מרכז עבודה", titleEn: "Work Center Category",
            conceptHe: "Work Center Category (למשל 0001 מכונה, 0003 כוח-אדם) קובעת אילו תצוגות ושדות זמינים, איזה Standard Value Key ברירת-מחדל, ולאיזה יישום (Routing/Rate Routing/Inspection) מרכז העבודה משמש.",
            implementationHe: ["ב-OP40 הגדר קטגוריה, שייך Field Selection ו-Standard Value Key, וקבע יישומי רשימת-משימות מותרים."],
            cbcHe: "ב-CBC קווי-מילוי = קטגוריית 'מכונה' עם נתוני קיבולת ועלות; תחנות בקרת-איכות = קטגוריה נפרדת ללא קיבולת.",
            troubleshootHe: ["תצוגות חסרות במרכז עבודה ➔ Field Selection של הקטגוריה מסתיר אותן."],
            consultantHe: "הגדר קטגוריות לפי תפקיד פיזי (קו/תחנה/מעבדה) — לא לפי מחלקה ארגונית.",
          },
          {
            id: "3.3.2", titleHe: "בחירת שדות במרכז עבודה", titleEn: "Field Selection in the Work Center",
            conceptHe: "Field Selection קובע לכל שדה במרכז העבודה אם הוא חובה, אופציונלי, לקריאה-בלבד או מוסתר — לפי Influencing factors (קטגוריה, יישום).",
            implementationHe: ["הגדר Field Selection group; קבע השפעות (Modifiable fields with influences) לפי קטגוריה ויישום."],
            cbcHe: "ב-CBC שדה 'תקן בקרת-איכות' מוגדר חובה למרכזי QA ומוסתר לקווי-מילוי טהורים.",
            troubleshootHe: ["שדה חובה חוסם שמירה ➔ שנה ל'אופציונלי' ב-Field Selection אם אינו נחוץ."],
            consultantHe: "השאר שדות לא-רלוונטיים מוסתרים — מסך נקי מפחית שגיאות הזנה.",
          },
          {
            id: "3.3.3", titleHe: "נוסחאות למרכז העבודה", titleEn: "Formulas for the Work Center",
            conceptHe: "נוסחאות מתרגמות Standard Values (Setup/Machine/Labor) לזמן-ביצוע (תזמון), לדרישת-קיבולת ולכמות-Activity לתמחיר. כל נוסחה מורכבת מפרמטרים ופעולות חשבון.",
            implementationHe: ["ב-OP21 הגדר נוסחה עם Parameters; שייך נוסחאות נפרדות ל-Scheduling, Capacity ו-Costing בתצוגות מרכז העבודה."],
            cbcHe: "ב-CBC נוסחת קו-מילוי: זמן-מכונה = (כמות / קצב-מילוי) + זמן-הכנה — מזינה תזמון ועלות גם יחד.",
            troubleshootHe: ["משך פעולה = 0 ➔ הנוסחה מפנה לפרמטר שאינו מקבל ערך ברשימת-המשימות."],
            consultantHe: "בדוק נוסחאות עם 'Formula test' לפני שחרור — שגיאת-נוסחה מסיטה את כל התזמון.",
          },
          {
            id: "3.3.4", titleHe: "מפתח ערכי תקן", titleEn: "Standard Value Key",
            conceptHe: "Standard Value Key (SVK) מגדיר עד 6 פרמטרי-זמן הנאספים בכל פעולה (לרוב Setup, Machine, Labor). הוא קושר את ערכי-התקן בפעולה לפרמטרים בנוסחאות.",
            implementationHe: ["ב-OP19 הגדר SVK עם הפרמטרים והממדים שלהם (זמן); שייך אותו לקטגוריית מרכז-העבודה."],
            cbcHe: "ב-CBC SVK של קו-מילוי כולל Setup (ניקוי/החלפת טעם), Machine (זמן-מילוי) ו-Labor (תפעול) — שלושתם מתומחרים.",
            troubleshootHe: ["לא ניתן להזין ערך-זמן בפעולה ➔ הפרמטר אינו מוגדר ב-SVK של מרכז-העבודה."],
            consultantHe: "השתמש ב-SVK הסטנדרטי SAP1 אלא אם יש צורך מובהק — תואם לנוסחאות המובנות.",
          },
          {
            id: "3.3.5", titleHe: "קבוצות מיקום", titleEn: "Location Groups",
            conceptHe: "Location Group מקבץ מרכזי-עבודה לפי מיקום פיזי/אזור, ומשמש לתזמון מעבר (זמני-תנועה בין מרכזים) ולדיווח קיבולת מצרפי.",
            implementationHe: ["הגדר Location Group ושייך מרכזי-עבודה; ניתן להגדיר זמני-מעבר בין קבוצות."],
            cbcHe: "ב-CBC קווי-מילוי באותו אולם מקובצים ל-Location Group אחד לצורך ניתוח קיבולת מצרפי לכל אתר.",
            troubleshootHe: ["זמני-מעבר בין פעולות לא מחושבים ➔ Location Groups או זמני-המעבר ביניהם לא הוגדרו."],
            consultantHe: "Location Groups רלוונטיים בעיקר לאתרים גדולים; באתר קטן אפשר לוותר.",
          },
          {
            id: "3.3.6", titleHe: "מפתח בקרה לפעולות", titleEn: "Control Key for Operations",
            conceptHe: "Control Key (למשל PP01) קובע לכל פעולה אילו פונקציות פעילות: Scheduling, Capacity, Costing, Confirmation, Print, Automatic GR, External Processing.",
            implementationHe: ["ב-OP00 הגדר Control Key וסמן את הפונקציות; PP01 = פעולה פנימית מלאה, PP02 = עיבוד-חוץ (External)."],
            cbcHe: "ב-CBC פעולת מילוי = PP01 (תזמון+קיבולת+עלות+דיווח); פעולת מעבדה חיצונית = Control Key עם External Processing וללא קיבולת פנימית.",
            troubleshootHe: [
              "פעולה לא מתומחרת ➔ Control Key ללא אינדיקטור 'Costing'.",
              "לא ניתן לדווח (Confirm) פעולה ➔ Control Key ללא 'Confirmation' (או 'Milestone').",
            ],
            consultantHe: "Control Key היא ההגדרה הקריטית-ביותר ברמת הפעולה — מיפוי שגוי שובר תזמון/עלות/דיווח כאחד.",
          },
        ],
      },
      // ---------- 3.4 Routing ----------
      {
        id: "3.4", titleHe: "מסלול ייצור (Routing)", titleEn: "Routing",
        conceptHe:
          "ה-Routing מגדיר את רצף הפעולות לייצור המוצר: לכל פעולה מרכז-עבודה, Control Key, ערכי-זמן תקן ורכיבים מוקצים. כותרת PLKO, פעולות PLPO, שיוך לחומר MAPL. סוג רשימת-משימות N לייצור בדיד.",
        purposeHe:
          "ה-Routing קובע כיצד מיוצר המוצר (להבדיל מה-BOM שקובע ממה). הוא בסיס לתזמון הפק\"ע, לחישוב הקיבולת ולתמחיר העבודה.",
        configHe: [
          "הגדר Task List Type N (Routing) וטווחי-מספרים.",
          "הגדר Reference Operation Sets (CA11) לפעולות חוזרות בין מוצרים.",
          "הקצה רכיבי BOM לפעולות (Component Allocation) — קובע מתי כל רכיב נצרך.",
        ],
        navHe: [
          "Production ► Basic Data ► Routing ► Control Data ► Define Number Ranges",
          "Production ► Basic Data ► Routing ► Operation Data ► Define Control Keys",
        ],
        tcodes: ["CA01", "CA02", "CA03", "CA11", "CA85", "C223"],
        tables: ["PLKO", "PLPO", "PLAS", "MAPL", "PLMZ"],
        fiori: ["F2245", "F1842"],
        masterDataHe: [
          "PLKO = כותרת · PLPO = פעולות · PLAS = בחירת-פעולה · MAPL = שיוך לחומר · PLMZ = הקצאת-רכיבים.",
          "כל פעולה: Work Center, Control Key, Setup/Machine/Labor times.",
        ],
        flow: [
          { he: "כותרת מסלול", code: "PLKO" },
          { he: "פעולות + מרכז-עבודה", code: "PLPO", note: "0010,0020…" },
          { he: "הקצאת רכיבים", code: "PLMZ", note: "רכיב↔פעולה" },
          { he: "שיוך לחומר", code: "MAPL" },
          { he: "Production Version", code: "C223" },
        ],
        cbcHe:
          "ב-CBC מסלול קו-ייצור: 0010 הכנה ➔ 0020 ערבול ➔ 0030 מילוי ➔ 0040 בקרת-איכות (Control Key עם Inspection) ➔ 0050 אריזה.",
        troubleshootHe: [
          "פק\"ע ללא פעולות ➔ Routing לא משויך (MAPL) או תוקף/Lot-Size לא תואמים.",
          "רכיב נצרך בפעולה שגויה ➔ Component Allocation (PLMZ) לא הוגדר.",
        ],
        bestPracticeHe: [
          "אחד Routing + BOM ל-Production Version אחת (C223) — חובה ב-S/4HANA.",
          "השתמש ב-Reference Operation Sets לפעולות סטנדרטיות בין מוצרים.",
          "שנה Routing עם Change Number לשמירת היסטוריה.",
        ],
      },
      // ---------- 3.5 Order Type + children ----------
      {
        id: "3.5", titleHe: "סוג פקודת-ייצור (Order Type)", titleEn: "Order Type",
        conceptHe:
          "סוג הפק\"ע הוא רכיב-הבקרה המרכזי לעיבוד פק\"ע ייצור בדיד. הוא קובע טווח-מספרים ומשויך ל-Order Category 10 (PP Production Order). דרכו נקשרים פרופיל-תזמון, פרופיל-זמינות ופרופיל-התחשבנות.",
        purposeHe:
          "סוג הפק\"ע מאפשר התנהגות שונה לתרחישים שונים (ייצור רגיל, Rework, חצי-מוגמר) ומבטיח שליטה אחידה בעיבוד, בעלות ובמספור.",
        configHe: [
          "הגדר Order Type (OPJH) ושייך Order Category 10.",
          "הגדר טווחי-מספרים (CO82) ושייך לסוג הפק\"ע — פנימי (מוקצה אוטומטית) או חיצוני.",
          "קשר פרופיל-תזמון, פרופיל-זמינות וברירות-מחדל לעיבוד.",
        ],
        navHe: [
          "Production ► Shop Floor Control ► Master Data ► Order ► Define Order Types (OPJH)",
          "Production ► Shop Floor Control ► Master Data ► Order ► Define Number Ranges (CO82)",
        ],
        tcodes: ["OPJH", "CO82", "CO01", "CO40"],
        tables: ["T399X", "AUFK", "AFKO", "AFPO"],
        fiori: ["F2336"],
        masterDataHe: ["AUFK = כותרת-פקודה · AFKO = כותרת-ייצור · AFPO = פריט פק\"ע."],
        flow: [
          { he: "Order Type", code: "OPJH", note: "Category 10" },
          { he: "טווח-מספרים", code: "CO82" },
          { he: "פרמטרים פר-מפעל", code: "OPL8" },
          { he: "יצירת פק\"ע", code: "CO01" },
        ],
        cbcHe: "ב-CBC מספיקים 3–5 סוגי-פק\"ע (ייצור רגיל, Rework, חצי-מוגמר); ריבוי סוגים מקשה תחזוקה ודיווח.",
        troubleshootHe: [
          "מספור שגוי ➔ טווח-מספרים (CO82) לא משויך או חופף.",
          "סוג-פק\"ע לא זמין במפעל ➔ חסרים פרמטרים תלויי-סוג-הזמנה (OPL8) למפעל.",
        ],
        bestPracticeHe: [
          "הגדר מעט סוגי-פק\"ע; השתמש בפרופיל-תזמון-ייצור לאוטומציות.",
          "תאם טווחי-מספרים וסוגים עם PP-PI/QM/PM כדי למנוע התנגשויות.",
        ],
        children: [
          {
            id: "3.5.1", titleHe: "תחזוקת סוגי-הזמנה", titleEn: "Maintaining Order Types",
            conceptHe: "הגדרת סוג-ההזמנה עצמו: שם, Order Category, ואינדיקטורים בסיסיים (CO-relevant, settlement). סוג-ההזמנה הוא המפתח שכל שאר הקונפיגורציה תלויה בו.",
            implementationHe: ["ב-OPJH צור Order Type, שייך Category 10, וקבע אם הוא רלוונטי ל-CO ולהתחשבנות."],
            cbcHe: "ב-CBC: PP01 ייצור-רגיל, PP02 Rework, PP03 חצי-מוגמר — שלושה סוגים שמכסים את רוב התרחישים.",
            troubleshootHe: ["לא ניתן ליצור פק\"ע מסוג מסוים ➔ הסוג לא הוגדר או לא קיבל פרמטרים פר-מפעל."],
            consultantHe: "תכנן את רשימת סוגי-ההזמנה מראש עם ה-CO — שינוי בדיעבד יקר בגלל תלות בהתחשבנות.",
          },
          {
            id: "3.5.2", titleHe: "טווחי מספרים", titleEn: "Number Ranges",
            conceptHe: "טווח-המספרים קובע את מספור הפק\"ע — פנימי (המערכת מקצה) או חיצוני (המשתמש מזין). כל קבוצת-טווח משויכת לסוג/סוגי-הזמנה.",
            implementationHe: ["ב-CO82 הגדר Number Range Group, הקצה אינטרוול, ושייך אליו את סוגי-ההזמנה."],
            cbcHe: "ב-CBC כל הפק\"ע במספור פנימי רציף; אינטרוול נפרד ל-Rework כדי להקל על דיווח ומעקב.",
            troubleshootHe: [
              "שגיאה 'No number range' ביצירת פק\"ע ➔ הסוג לא משויך לקבוצת-טווח.",
              "מספרים אוזלים ➔ האינטרוול קרוב למיצוי; הרחב לפני שיגיע לקצה.",
            ],
            consultantHe: "הקצה מרווח נדיב לכל אינטרוול; הרחבה בדיעבד אפשרית אך דורשת תיאום והפסקת מספור.",
          },
        ],
      },
      // ---------- 3.6 Order-Type-Dependent Parameters + children ----------
      {
        id: "3.6", titleHe: "פרמטרים תלויי סוג-הזמנה", titleEn: "Order Type-Dependent Parameters",
        conceptHe:
          "פרמטרים תלויי-סוג-הזמנה (OPL8) מוגדרים פר Order Type + Plant ושולטים בשלוש קבוצות: Planning (תכנון/BOM/Routing/Production Version), Implementation (שחרור/דיווח/בדיקת-זמינות), ו-Cost Accounting (Costing Variants לתכנון ולבפועל).",
        purposeHe:
          "כאן מתחבר סוג-הפק\"ע למפעל הקונקרטי — אותו סוג יכול להתנהג שונה במפעלים שונים. בלי הגדרה זו לא ניתן ליצור פק\"ע במפעל.",
        configHe: [
          "ב-OPL8 בחר Order Type + Plant.",
          "לשונית Planning: בחירת BOM/Routing/Production Version, Task List Application, Routing selection.",
          "לשונית Implementation: Availability check defaults, status profile, documentation.",
          "לשונית Cost Accounting: Costing Variant Plan/Actual, Results Analysis Key, RA-relevance.",
        ],
        navHe: [
          "Production ► Shop Floor Control ► Master Data ► Order ► Define Order Type-Dependent Parameters (OPL8)",
        ],
        tcodes: ["OPL8", "OPJH", "OKZ3"],
        tables: ["T399X", "AFKO"],
        fiori: ["F2336"],
        masterDataHe: ["נשלט פר Order Type+Plant; משפיע על בחירת BOM/Routing ועל Costing Variant של הפק\"ע."],
        flow: [
          { he: "Order Type + Plant", code: "OPL8" },
          { he: "Planning", code: "BOM/Routing", note: "בחירה אוטומטית" },
          { he: "Implementation", code: "ATP/Release" },
          { he: "Cost Accounting", code: "PPP1/PPP2", note: "Costing Variants" },
        ],
        cbcHe: "ב-CBC אותו Order Type PP01 מוגדר בכל מפעלי-המילוי, אך כל מפעל מצביע על Costing Variant מקומי ועל ברירות-בחירה משלו.",
        troubleshootHe: [
          "לא ניתן ליצור פק\"ע במפעל ➔ חסרה רשומת OPL8 ל-Order Type+Plant.",
          "הפק\"ע לא מתומחרת ➔ Costing Variant חסר/שגוי בלשונית Cost Accounting.",
        ],
        bestPracticeHe: [
          "תחזק OPL8 לכל צירוף Order Type+Plant פעיל — זו טעות-מימוש נפוצה שמתגלה רק בעת יצירת פק\"ע.",
          "תאם Costing Variants עם ה-CO לפני העלאה לסביבת-ייצור.",
        ],
        children: [
          {
            id: "3.6.1", titleHe: "תכנון (Planning)", titleEn: "Planning",
            conceptHe: "לשונית Planning קובעת כיצד הפק\"ע בוחרת BOM ו-Routing: Application לבחירת-מסלול, Routing selection (אוטומטי/ידני/אין), וכללי בחירת Production Version.",
            implementationHe: ["קבע Task List Application (למשל PP01), Routing Selection = 'automatic with manual option', וכללי BOM Application."],
            cbcHe: "ב-CBC בחירה אוטומטית של Production Version מבטיחה שכל פק\"ע על קו-מילוי נטענת עם ה-BOM וה-Routing הנכונים ללא התערבות.",
            troubleshootHe: ["פק\"ע נפתחת ללא Routing ➔ Routing Selection = 'no selection' או Application לא תואם."],
            consultantHe: "Routing selection אוטומטי עם אפשרות-ידנית הוא ברירת-המחדל המעשית — אוטומציה עם רשת-ביטחון.",
          },
          {
            id: "3.6.2", titleHe: "מימוש (Implementation)", titleEn: "Implementation",
            conceptHe: "לשונית Implementation שולטת בהתנהגות-הביצוע: ברירות בדיקת-זמינות (חומר/קיבולת/PRT), Status Profile, ואינדיקטורי-תיעוד לשינויים.",
            implementationHe: ["שייך Status Profile (אם נדרש), קבע האם בדיקת-זמינות אוטומטית בשחרור, והפעל תיעוד-שינויים לפי צורך."],
            cbcHe: "ב-CBC בדיקת-זמינות חומר אוטומטית בשחרור מונעת התחלת מילוי ללא תרכיז/אריזה זמינים.",
            troubleshootHe: ["בדיקת-זמינות לא רצה בשחרור ➔ לא הופעלה בלשונית Implementation למרות שה-Checking Control מוגדר."],
            consultantHe: "הפעל בדיקת-זמינות אוטומטית בשחרור — עדיף לחסום מוקדם מאשר לגלות חוסר ברצפה.",
          },
          {
            id: "3.6.3", titleHe: "חשבונאות עלויות (Cost Accounting)", titleEn: "Cost Accounting",
            conceptHe: "לשונית Cost Accounting קובעת את ה-Costing Variants: Plan (תמחיר מתוכנן בעת יצירה) ו-Actual (איסוף עלויות בפועל), Results Analysis Key ורלוונטיות-WIP.",
            implementationHe: ["שייך Costing Variant Plan (למשל PPP1) ו-Actual (PPP2), Results Analysis Key, וקבע RA-relevance."],
            cbcHe: "ב-CBC עלות-תקן של המשקה נקבעת מ-Costing Variant Plan; סטיות (חומר/עבודה) נאספות מול Actual ומנותחות חודשית.",
            troubleshootHe: [
              "אין תמחיר-תכנון לפק\"ע ➔ Costing Variant Plan חסר בלשונית.",
              "סטיות לא מחושבות בסגירה ➔ Results Analysis Key או RA-relevance לא הוגדרו.",
            ],
            consultantHe: "אל תיגע ב-Costing Variants ללא ה-CO — הם משותפים לתהליך הסגירה החודשית.",
          },
        ],
      },
      // ---------- 3.7 Scheduling ----------
      {
        id: "3.7", titleHe: "תזמון (Scheduling)", titleEn: "Scheduling",
        conceptHe:
          "התזמון מחשב את תאריכי ההתחלה והסיום של הפק\"ע ופעולותיה, על בסיס ערכי-הזמן ב-Routing, נוסחאות מרכז-העבודה, ופרמטרי-התזמון. סוגי-תזמון: Forward, Backward, Today, Only capacity reqs.",
        purposeHe:
          "תזמון מדויק קובע מתי להתחיל ייצור כדי לעמוד בתאריך-הסיום הנדרש, ומאפשר תכנון-קיבולת ריאלי.",
        configHe: [
          "הגדר Scheduling Parameters פר Order Type+Plant (OPU3 לפק\"ע).",
          "קבע Scheduling Type, Automatic Scheduling, ו-Reduction Strategies לקיצור-משך.",
          "הגדר Scheduling Margin Key (OPJK) — Floats לפני/אחרי ייצור.",
        ],
        navHe: [
          "Production ► Shop Floor Control ► Operations ► Scheduling ► Define Scheduling Parameters for Production Orders (OPU3)",
        ],
        tcodes: ["OPU3", "OPJK", "CO01", "CM01"],
        tables: ["AFKO", "AFVV", "PLPO"],
        fiori: ["F2336", "F0289"],
        masterDataHe: ["AFKO-GLTRP/GSTRP = תאריכי סיום/התחלה · AFVV = ערכי-זמן/תזמון פעולה."],
        flow: [
          { he: "ערכי-זמן (Routing)", code: "PLPO" },
          { he: "נוסחאות מרכז-עבודה", code: "OP21" },
          { he: "פרמטרי-תזמון", code: "OPU3" },
          { he: "תזמון אחורה/קדימה", code: "Backward", note: "מתאריך-יעד" },
          { he: "תאריכי פק\"ע", code: "AFKO" },
        ],
        cbcHe: "ב-CBC תזמון אחורה (Backward) מתאריך-אספקה נדרש קובע מתי להתחיל מילוי, בהתחשב בזמני-הכנה וניקוי-הקו.",
        troubleshootHe: [
          "תאריכי-התחלה בעבר ➔ המערכת עברה ל-Today Scheduling; בדוק Floats ו-Reduction.",
          "משך-פק\"ע ארוך מדי ➔ נוסחאות/ערכי-תקן שגויים או Reduction לא מופעל.",
        ],
        bestPracticeHe: [
          "הגדר Scheduling Margin Key ריאלי — Floats גדולים מדי מנפחים את משך-התכנון.",
          "הפעל Automatic Scheduling בשחרור לקבלת תאריכים מעודכנים.",
        ],
      },
      // ---------- 3.8 Production Scheduling Profile ----------
      {
        id: "3.8", titleHe: "פרופיל תזמון-ייצור", titleEn: "Production Scheduling Profile",
        conceptHe:
          "פרופיל תזמון-הייצור מרכז אוטומציות לפק\"ע: שחרור-אוטומטי ביצירה, יצירת מתכון-בקרה אוטומטית, קבלת-תוצר אוטומטית (Automatic GR), סגירה-אוטומטית וברירות-דיווח. משויך לאב-החומר (שדה SFCPF בתצוגת Work Scheduling).",
        purposeHe:
          "הפרופיל חוסך צעדים ידניים חוזרים ומבטיח עיבוד אחיד — חיוני לייצור בנפח גבוה.",
        configHe: [
          "הגדר Production Scheduling Profile (OPKP): Automatic Release, Automatic GR, Settlement, Confirmation defaults.",
          "שייך את הפרופיל לאב-החומר (Work Scheduling view).",
        ],
        navHe: [
          "Production ► Shop Floor Control ► Master Data ► Define Production Scheduling Profile (OPKP)",
        ],
        tcodes: ["OPKP", "MM02", "CO01"],
        tables: ["T399P", "MARC"],
        fiori: ["F2336"],
        masterDataHe: ["MARC-SFCPF = Production Scheduling Profile (תצוגת Work Scheduling)."],
        flow: [
          { he: "הגדר פרופיל", code: "OPKP" },
          { he: "שייך לאב-חומר", code: "MM02", note: "SFCPF" },
          { he: "אוטומציות בפק\"ע", code: "Release/GR" },
        ],
        cbcHe: "ב-CBC הפרופיל מפעיל שחרור וקבלת-תוצר אוטומטיים בקווי-המילוי בנפח גבוה — מצמצם התערבות ידנית.",
        troubleshootHe: [
          "פק\"ע נפתחת ב-CRTD במקום REL ➔ Automatic Release לא מופעל בפרופיל / לא משויך לאב-החומר.",
          "רישומי מלאי שגויים ➔ Automatic GR פעיל אך הדיווח אינו מדויק.",
        ],
        bestPracticeHe: [
          "הפעל שחרור-אוטומטי רק היכן שבדיקת-הזמינות אינה קריטית.",
          "הימנע מ-Automatic GR אם הדיווח (Confirmation) אינו אמין.",
        ],
      },
      // ---------- 3.9 Availability Check + children ----------
      {
        id: "3.9", titleHe: "בדיקת זמינות (Availability Check)", titleEn: "Availability Check",
        conceptHe:
          "בדיקת-הזמינות הדינמית (ATP — Available-to-Promise) בודקת אם החומר הנדרש זמין בתאריך-הדרישה של הפק\"ע. נשלטת על-ידי Checking Group (באב-החומר) + Checking Rule (לפי סוג-פק\"ע ומפעל) → Scope of Check.",
        purposeHe:
          "המטרה למנוע שחרור פק\"ע ללא חומר זמין, ולהתריע למתכנן על חוסרים — כדי שהביצוע לא ייתקע ברצפה.",
        configHe: [
          "הגדר Checking Group ושייך לאב-החומר (MRP3, שדה MTVFP).",
          "הגדר Checking Rule ושייך ב-Checking Control (OPJK) לפי Order Type+Plant.",
          "הגדר Scope of Check (OPJJ) — אילו מלאים, קבלות (רכש) והוצאות (Reservations) נכללים.",
          "קבע Release material: 1 המשתמש מחליט / 2 שחרור-למרות-חוסר / 3 ללא-שחרור (מומלץ 1).",
        ],
        navHe: [
          "Production ► Shop Floor Control ► Operations ► Availability Check ► Define Checking Control (OPJK)",
          "Production ► Shop Floor Control ► Operations ► Availability Check ► Define Scope of Check (OPJJ)",
        ],
        tcodes: ["OPJK", "OPJJ", "CO24", "MD04", "CO09"],
        tables: ["TMVF", "MARC", "RESB"],
        fiori: ["F0247", "F2101"],
        masterDataHe: ["MARC-MTVFP = Checking Group (תצוגת MRP3) · ATP נקבע מול MARD/RESB."],
        flow: [
          { he: "Checking Group", code: "MTVFP", note: "אב-חומר" },
          { he: "Checking Rule", code: "OPJK", note: "Order Type+Plant" },
          { he: "Scope of Check", code: "OPJJ", note: "מלאי/קבלות/דרישות" },
          { he: "בדיקת ATP בשחרור", code: "CO02" },
          { he: "ניתוח חוסרים", code: "CO24" },
        ],
        cbcHe: "ב-CBC בדיקת-הזמינות מבטיחה שתרכיז/אריזה זמינים לפני שחרור פק\"ע-המילוי; חוסר נחסם ומנותב ל-MD04.",
        troubleshootHe: [
          "פק\"ע לא משוחררת — Status MSPT ➔ נתח חוסרים ב-CO24 (Missing Parts) וב-MD04.",
          "הבדיקה לא מתחשבת ברכש-צפוי ➔ הפעל With Purchase Orders ב-OPJJ.",
          "בדיקה מאשרת למרות חוסר ➔ Scope of Check כולל מלאי לא-רלוונטי.",
        ],
        bestPracticeHe: [
          "צור Checking Rule ייעודי לייצור — בידוד לוגיקת ה-ATP מתחומים אחרים.",
          "השאר Release material=1 — שהמתכנן יחליט, לא המערכת.",
        ],
        children: [
          {
            id: "3.9.1", titleHe: "הגדרת קבוצת-הבדיקה", titleEn: "Define the Checking Group",
            conceptHe: "Checking Group (Availability Check group) מוגדרת באב-החומר (MARC-MTVFP) וקובעת אם בכלל מתבצעת בדיקה ובאיזו לוגיקה (ATP מול תכנון). היא נקודת-הכניסה ללוגיקת הזמינות.",
            implementationHe: ["הגדר Checking Group (למשל 02 'individual requirements'); שייך לאב-החומר בתצוגת MRP3."],
            cbcHe: "ב-CBC כל הרכיבים המיוצרים מקבלים Checking Group עם ATP פעיל; חומרי-עזר זניחים יכולים לקבל קבוצה ללא-בדיקה.",
            troubleshootHe: ["אין בדיקת-זמינות כלל ➔ Checking Group ריקה באב-החומר או קבוצה שמוגדרת 'no check'."],
            consultantHe: "Checking Group ריקה = אין בדיקה. ודא שכל רכיב-קריטי נושא קבוצה פעילה.",
          },
          {
            id: "3.9.2", titleHe: "הגדרת כלל-הבדיקה", titleEn: "Define the Checking Rule",
            conceptHe: "Checking Rule (יחד עם Checking Group) קובע את Scope of Check — אילו אלמנטי-מלאי, קבלות והוצאות נכללים בחישוב ה-ATP עבור יישום מסוים (פק\"ע, מכירות, וכו').",
            implementationHe: ["שייך Checking Rule (למשל PP) ב-OPJK לפי Order Type+Plant; הגדר את ה-Scope המתאים ב-OPJJ."],
            cbcHe: "ב-CBC Checking Rule ייעודי לייצור כולל מלאי-זמין + קבלות-רכש מאושרות, אך מתעלם ממלאי-באיכות (QI) שטרם שוחרר.",
            troubleshootHe: [
              "תוצאת-ATP שונה בין פק\"ע למכירות ➔ Checking Rules שונים עם Scope שונה — תקין אך יש להבין.",
              "מלאי QI נספר בטעות כזמין ➔ הסר אותו מ-Scope of Check ב-OPJJ.",
            ],
            consultantHe: "הצירוף Checking Group × Checking Rule הוא שקובע את ה-Scope — תמיד דבּר עליהם כזוג, לא בנפרד.",
          },
        ],
      },
      // ---------- 3.10 Production Version ----------
      {
        id: "3.10", titleHe: "גרסת ייצור (Production Version)", titleEn: "Production Version",
        conceptHe:
          "גרסת-הייצור (MKAL) מקשרת BOM Alternative + Routing/Recipe Group לחומר ומפעל, עם תוקף וטווח-כמויות (Lot Size From/To). ב-S/4HANA היא חובה — ה-MRP, ההמרה-לפק\"ע והתמחיר נשענים עליה.",
        purposeHe:
          "הגרסה מגדירה איזה שילוב BOM+Routing תקף לאיזה טווח-כמויות ומתי — ומאפשרת ניהול מספר שיטות-ייצור לאותו מוצר.",
        configHe: [
          "תחזק Production Versions ב-C223 (או בתצוגת MRP4 של אב-החומר).",
          "הרץ Consistency Check (C223) לאימות קיום ותוקף ה-BOM וה-Routing.",
          "קבע ADATU/BDATU (תוקף) ו-BSTMI/BSTMA (טווח-כמות).",
        ],
        navHe: ["Logistics ► Production ► Master Data ► Production Version (C223)"],
        tcodes: ["C223", "MM02", "CU51"],
        tables: ["MKAL", "MARC"],
        fiori: ["F1421", "F2336"],
        masterDataHe: [
          "MKAL: ALNAL=Routing group, STLAL=BOM alternative, ADATU/BDATU=תוקף, BSTMI/BSTMA=טווח-כמות.",
        ],
        flow: [
          { he: "BOM Alternative", code: "STLAL" },
          { he: "Routing Group", code: "ALNAL" },
          { he: "Production Version", code: "C223" },
          { he: "Consistency Check", code: "Cons.chk", note: "ירוק = תקף" },
          { he: "זמין ל-MRP/פק\"ע", code: "MD01N" },
        ],
        cbcHe: "ב-CBC כל מוצר-מיוצר חייב Production Version תקפה — תנאי-סף להרצת MRP ולהמרת הזמנות-מתוכננות על קווי-המילוי.",
        troubleshootHe: [
          "MRP לא מוצא Production Version ➔ תוקף/טווח-כמות לא תואמים או Consistency Check אדום.",
          "המרת הזמנה-מתוכננת נכשלת ➔ חוסר Production Version (כשל-קשיח ב-S/4HANA).",
        ],
        bestPracticeHe: [
          "שמור Production Version אחת ברורה לכל חומר; ריבוי-גרסאות מסבך את בחירת ה-MRP.",
          "הרץ Consistency Check לאחר כל שינוי ב-BOM/Routing.",
        ],
      },
    ],
  },
};

function countSubsections(c: TextbookChapter) {
  return c.subchapters.reduce((s, u) => s + 1 + (u.children?.length ?? 0), 0);
}

export const PP_TEXTBOOK_STATS = Object.fromEntries(
  Object.entries(PP_TEXTBOOK).map(([ch, c]) => [
    ch,
    {
      parents: c.subchapters.length,
      nested: c.subchapters.reduce((s, u) => s + (u.children?.length ?? 0), 0),
      total: countSubsections(c),
      sections: c.subchapters.length * 12,
    },
  ]),
);
