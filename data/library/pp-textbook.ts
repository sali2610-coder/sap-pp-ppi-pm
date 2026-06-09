// ===== PP Digital Textbook — Chapter 3 (reference chapter) =====
// SAP-Learning-Hub-grade. Every subchapter carries 12 dedicated sections with
// substantial authored Hebrew. Transformative / copyright-safe: no verbatim
// source prose. SAP identifiers (T-Codes, tables, Fiori, IMG paths) verbatim EN.

export interface FlowStep { he: string; code?: string }
export interface Subchapter {
  id: string;
  titleHe: string;
  titleEn: string;
  conceptHe: string;
  purposeHe: string;
  configHe: string[];
  navHe: string[]; // SPRO / IMG navigation paths
  tcodes: string[];
  tables: string[];
  fiori: string[];
  masterDataHe: string[];
  flow?: FlowStep[];
  cbcHe: string;
  troubleshootHe: string[];
  bestPracticeHe: string[];
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
      "פרק זה מלמד את הקונפיגורציה המלאה של ייצור בדיד ב-SAP S/4HANA — מנתוני האב (אב חומר, BOM, מרכז עבודה, מסלול ייצור) דרך אובייקטי הבקרה (סוג פק\"ע, בדיקת זמינות, תזמון, פרופיל תזמון) ועד גרסת הייצור המאחדת הכל. כל תת-פרק בנוי כיחידת לימוד עצמאית: מושג, מטרה עסקית, קונפיגורציה, ניווט SPRO, T-Codes, טבלאות, אפליקציות Fiori, נתוני אב, תרשים תהליך, דוגמת CBC, פתרון תקלות ושיטות עבודה מומלצות.",
    subchapters: [
      {
        id: "3.1", titleHe: "אב חומר לייצור", titleEn: "Material Master for Production",
        conceptHe:
          "אב החומר הוא רשומת המקור המתארת כל חומר שהארגון מתכנן, רוכש, מייצר, מאחסן ומוכר. הוא מאורגן בתצוגות (Views) לפי תחום: Basic Data, MRP 1–4, Work Scheduling, Accounting, Costing. הנתונים נשמרים ברמת לקוח (MARA) וברמת מפעל (MARC). לייצור בדיד, תצוגות ה-MRP וה-Work Scheduling הן הקריטיות.",
        purposeHe:
          "מטרת התצוגות הללו היא לאפשר ל-MRP לתכנן את החומר נכון: מתי, כמה, ומאיפה (ייצור פנימי מול רכש). פרמטרים שגויים כאן מתפשטים לכל שרשרת התכנון — לכן אב החומר הוא נקודת הפתיחה של כל מימוש PP.",
        configHe: [
          "הגדר Material Type (FERT מוגמר, HALB חצי-מוגמר, ROH חומר גלם) — קובע תצוגות, טווחי מספרים וסוג רכש מותר.",
          "שלוט בפריסת התצוגות והשדות דרך Field Selection (OMS9/OMSR) ורצף המסכים (OMT3B/OMT3E).",
          "קבע Scheduling Margin Key (Floats) ב-OPJK — בסיס לחישוב תאריכי ההזמנה המתוכננת.",
        ],
        navHe: [
          "Logistics – General ► Material Master ► Field Selection ► Maintain Field Selection for Data Screens (OMS9)",
          "Logistics – General ► Material Master ► Configuring the Material Master ► Assign Screen Sequences (OMT3E)",
        ],
        tcodes: ["MM01", "MM02", "MM03", "MM17", "MMSC", "MD04"],
        tables: ["MARA", "MARC", "MAKT", "MARD", "MBEW"],
        fiori: ["F1602A", "F0247", "F1422"],
        masterDataHe: [
          "MARC-DISMM = MRP Type (PD תכנון דרישות / VB נקודת הזמנה).",
          "MARC-DISLS = Lot Size · MARC-BESKZ = Procurement Type (E פנימי / F רכש).",
          "MARC-SFCPF = Production Scheduling Profile (תצוגת Work Scheduling).",
          "MARC-DZEIT = In-house Production Time · Safety Stock · Reorder Point.",
        ],
        flow: [
          { he: "Material Type", code: "FERT/HALB/ROH" },
          { he: "תצוגות בסיס + MRP", code: "MM01" },
          { he: "פרמטרי MRP", code: "DISMM/DISLS" },
          { he: "Work Scheduling", code: "SFCPF" },
          { he: "מוכן ל-MRP", code: "MD04" },
        ],
        cbcHe:
          "ב-CBC: תרכיז/סוכר/CO2 הם ROH מנוהלי-אצווה (Batch); המשקה המוגמר FERT. לכל מוצר מיוצר יש להזין נתוני MRP מלאים + Production Scheduling Profile כדי שה-MRP יתכנן את קווי המילוי.",
        troubleshootHe: [
          "MRP לא מייצר הזמנות לחומר ➔ בדוק MRP Type (לא ND), MRP Controller ותצוגת MRP חסרה במפעל.",
          "תאריכי הזמנה מתוכננת לא הגיוניים ➔ Scheduling Margin Key / In-house Production Time שגויים.",
          "החומר לא נכלל בהרצת MRP ➔ בדוק Plant/Storage extension (MMSC) ו-MRP view במפעל הרלוונטי.",
        ],
        bestPracticeHe: [
          "הזן פרמטרי MRP באמצעות Mass Maintenance (MM17) לעקביות בין חומרים.",
          "תקנן MRP Types ו-Lot Sizes מועטים וברורים — פחות שונות = פחות שגיאות תכנון.",
          "שמור על Material Type Strategy אחיד (FERT/HALB/ROH) המתואם עם FI/CO.",
        ],
      },
      {
        id: "3.2", titleHe: "עץ מוצר (Bill of Materials)", titleEn: "Bill of Materials",
        conceptHe:
          "ה-BOM הוא רשימה מובנית של כל הרכיבים המרכיבים מוצר או מכלול. בייצור בדיד משתמשים ב-Material BOM. מבנה: כותרת (STKO) ופריטים (STPO). פריט נושא קטגוריה (Item Category) הקובעת את התנהגותו, וכמות עם פחת (Component Scrap).",
        purposeHe:
          "ה-BOM הוא מקור הפיצוץ (Explosion) של הפק\"ע וה-MRP — ממנו נגזרות דרישות הרכיבים (Reservation למלאי, דרישת רכש ללא-מלאי). הוא גם בסיס לתמחיר המוצר (Costing).",
        configHe: [
          "הגדר BOM Usage (1 = ייצור) — קובע לאילו יישומים תקף ה-BOM (OS20).",
          "הגדר Item Categories (OS23): L מלאי, N לא-מלאי, T טקסט, D מסמך, I אלמנט מבנה.",
          "הגדר BOM Status (OS23/OS27) — Status 1 פעיל, ושחרור לרשימת משימות/פק\"ע.",
          "הגדר סוגי חומר מותרים בכותרת ה-BOM (Allowed Material Types in BOM Header).",
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
          { he: "כותרת BOM", code: "STKO" },
          { he: "פריטים + קטגוריה", code: "STPO" },
          { he: "שיוך לחומר", code: "MAST" },
          { he: "פיצוץ בפק\"ע/MRP", code: "Explosion" },
          { he: "Reservation/דרישת רכש", code: "RESB/BANF" },
        ],
        cbcHe:
          "ב-CBC ה-BOM של משקה כולל תרכיז + סוכר + CO2 + חומרי אריזה, עם פחת רכיב (~1%). פריטי מלאי (L) מפעילים Reservation; שירותי חוץ כ-non-stock (N).",
        troubleshootHe: [
          "רכיב לא מופיע בפק\"ע ➔ BOM Status לא משוחרר, תוקף (Valid-From) עתידי, או כמות בסיס שגויה.",
          "כמות רכיב כפולה מהצפוי ➔ כפל פחת (Assembly Scrap + Component Scrap).",
          "בחירת BOM שגויה ➔ בדוק Alternative Selection ו-Production Version.",
        ],
        bestPracticeHe: [
          "נהל שינויי BOM עם Change Number (ECM, CC01) — שומר היסטוריה ותוקף.",
          "הימנע מ-Alternatives מיותרים; נהל בחירה דרך Production Version.",
          "הגדר Item Category נכונה כבר בהזנה — L מול N קובע Reservation מול רכש.",
        ],
      },
      {
        id: "3.3", titleHe: "מרכז עבודה (Work Center)", titleEn: "Work Center",
        conceptHe:
          "מרכז העבודה מייצג מכונה, קו או תחנת עבודה, ומספק שלוש יכולות: תזמון (Scheduling), קיבולת (Capacity) ועלות (Costing). הוא מקושר ל-Routing דרך הפעולות. קטגוריית מרכז העבודה קובעת מסכים ויישום רשימת משימות.",
        purposeHe:
          "מרכז העבודה הוא הגשר בין נתוני האב לביצוע: הוא מתרגם ערכי זמן תקן לזמן תזמון, לעומס קיבולת ולעלות פעולה. ללא הגדרה נכונה — תזמון ועלות הפק\"ע יהיו שגויים.",
        configHe: [
          "הגדר Work Center Category (OP40) — קובע מסכים ויישום (Routing/PP).",
          "הגדר Standard Value Key (OP19) — אילו ערכי זמן (Setup/Machine/Labor) נאספים.",
          "הגדר Formulas (OP21) לתזמון, קיבולת ועלות; ו-Control Keys (OP00) לפעולות.",
          "שייך Cost Center ו-Activity Types (KP26 לתעריפים) בתצוגת Costing.",
        ],
        navHe: [
          "Production ► Basic Data ► Work Center ► General Data ► Define Work Center Category (OP40)",
          "Production ► Basic Data ► Work Center ► Costing ► Work Center Formulas (OP21)",
        ],
        tcodes: ["CR01", "CR02", "CR03", "CR05", "CR06", "CR15", "KP26"],
        tables: ["CRHD", "CRCO", "CRCA", "KAKO", "CRTX"],
        fiori: ["F2336", "F4006"],
        masterDataHe: [
          "CRHD = כותרת מרכז עבודה · CRCO = שיוך מרכז עלות/Activity Type · KAKO = קיבולת.",
          "Capacity Category 001 (מכונה) / 002 (כוח-אדם), Available Capacity, Utilization %.",
        ],
        flow: [
          { he: "קטגוריה", code: "OP40" },
          { he: "Standard Value Key", code: "OP19" },
          { he: "נוסחאות", code: "OP21" },
          { he: "Cost Center + Activity", code: "KP26" },
          { he: "שימוש ב-Routing", code: "CA01" },
        ],
        cbcHe:
          "ב-CBC קו מילוי מוגדר כמרכז עבודה עם Activity Types למכונה ולכוח-אדם; התעריפים (KP26) מזינים את עלות המשקה דרך פעולות הפק\"ע.",
        troubleshootHe: [
          "תזמון פק\"ע שגוי ➔ נוסחאות (OP21) או Standard Values ברשימת המשימות שגויים.",
          "עלות פעולה אפס ➔ Activity Type ללא תעריף (KP26) או Control Key ללא 'Costing'.",
          "אין עומס קיבולת ➔ Control Key ללא 'Capacity Requirements' או קיבולת לא מוגדרת (KAKO).",
        ],
        bestPracticeHe: [
          "השתמש ב-Standard Value Key הסטנדרטי; הגדר נוסחאות מותאמות רק בעת צורך אמיתי.",
          "הקפד על Control Key עם Scheduling+Costing+Capacity לפעולות ייצור פנימיות.",
          "תאם מוסכמת שמות Activity Types עם ה-CO.",
        ],
      },
      {
        id: "3.4", titleHe: "מסלול ייצור (Routing)", titleEn: "Routing",
        conceptHe:
          "ה-Routing מגדיר את רצף הפעולות לייצור המוצר: לכל פעולה מרכז עבודה, Control Key, ערכי זמן תקן ורכיבים מוקצים. כותרת PLKO, פעולות PLPO, שיוך לחומר MAPL. סוג רשימת משימות N לייצור בדיד.",
        purposeHe:
          "ה-Routing קובע כיצד מיוצר המוצר (להבדיל מה-BOM שקובע ממה). הוא בסיס לתזמון הפק\"ע, לחישוב הקיבולת ולתמחיר העבודה.",
        configHe: [
          "הגדר Task List Type N (Routing) וטווחי מספרים.",
          "הגדר Reference Operation Sets (CA11) לפעולות חוזרות.",
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
          "PLKO = כותרת · PLPO = פעולות · PLAS = בחירת פעולה · MAPL = שיוך לחומר · PLMZ = הקצאת רכיבים.",
          "כל פעולה: Work Center, Control Key, Setup/Machine/Labor times.",
        ],
        flow: [
          { he: "כותרת מסלול", code: "PLKO" },
          { he: "פעולות + מרכז עבודה", code: "PLPO" },
          { he: "הקצאת רכיבים", code: "PLMZ" },
          { he: "שיוך לחומר", code: "MAPL" },
          { he: "Production Version", code: "C223" },
        ],
        cbcHe:
          "ב-CBC מסלול קו ייצור: 0010 הכנה ➔ 0020 ערבול ➔ 0030 מילוי ➔ 0040 בקרת איכות (Control Key עם Inspection) ➔ 0050 אריזה.",
        troubleshootHe: [
          "פק\"ע ללא פעולות ➔ Routing לא משויך (MAPL) או תוקף/Lot Size לא תואמים.",
          "רכיב נצרך בפעולה שגויה ➔ Component Allocation (PLMZ) לא הוגדר.",
        ],
        bestPracticeHe: [
          "אחד Routing + BOM ל-Production Version אחת (C223) — חובה ב-S/4HANA.",
          "השתמש ב-Reference Operation Sets לפעולות סטנדרטיות בין מוצרים.",
          "שנה Routing עם Change Number לשמירת היסטוריה.",
        ],
      },
      {
        id: "3.5", titleHe: "סוג פק\"ע ופרמטרים תלויי סוג-הזמנה", titleEn: "Order Type & Dependent Parameters",
        conceptHe:
          "סוג הפק\"ע (Order Type) הוא רכיב הבקרה המרכזי לעיבוד פק\"ע ייצור בדיד. הוא קובע טווח מספרים, פרופיל תזמון, פרופיל זמינות, פרופיל התחשבנות ופרופיל תקצוב. כל סוג משויך ל-Order Category 10 (PP Production Order). הפרמטרים תלויי סוג-הזמנה מוגדרים פר-מפעל.",
        purposeHe:
          "סוג הפק\"ע מאפשר התנהגות שונה לתרחישים שונים (ייצור רגיל, Rework, מוצר חצי-מוגמר) ומבטיח שליטה אחידה בעיבוד, בעלות ובמספור.",
        configHe: [
          "הגדר Order Type (OPJH) ושייך Order Category 10.",
          "הגדר טווחי מספרים (CO82) ושייך לסוג הפק\"ע.",
          "הגדר Order Type–Dependent Parameters (OPL8) פר-מפעל: Planning, Implementation, Cost Accounting.",
        ],
        navHe: [
          "Production ► Shop Floor Control ► Master Data ► Order ► Define Order Types (OPJH)",
          "Production ► Shop Floor Control ► Master Data ► Order ► Define Order Type-Dependent Parameters (OPL8)",
        ],
        tcodes: ["OPJH", "OPL8", "CO82", "OPKP", "CO01"],
        tables: ["T399X", "AUFK", "AFKO", "AFPO"],
        fiori: ["F2336"],
        masterDataHe: ["AUFK = כותרת פקודה · AFKO = כותרת ייצור · AFPO = פריט פק\"ע."],
        flow: [
          { he: "Order Type", code: "OPJH" },
          { he: "טווח מספרים", code: "CO82" },
          { he: "פרמטרים פר-מפעל", code: "OPL8" },
          { he: "פרופיל תזמון", code: "OPKP" },
          { he: "יצירת פק\"ע", code: "CO01" },
        ],
        cbcHe: "ב-CBC מספיקים 3–5 סוגי פק\"ע (ייצור רגיל, Rework, חצי-מוגמר); ריבוי סוגים מקשה על תחזוקה ודיווח.",
        troubleshootHe: [
          "לא ניתן ליצור פק\"ע במפעל ➔ שיוך לא-מלא של Order Type ל-Plant ב-OPL8.",
          "מספור שגוי ➔ טווח מספרים (CO82) לא משויך או חופף.",
        ],
        bestPracticeHe: [
          "הגדר מעט סוגי פק\"ע; השתמש ב-Production Scheduling Profile לאוטומציות.",
          "תאם טווחי מספרים וסוגים עם PP-PI/QM/PM כדי למנוע התנגשויות.",
        ],
      },
      {
        id: "3.6", titleHe: "בדיקת זמינות (Availability Check)", titleEn: "Availability Check",
        conceptHe:
          "בדיקת הזמינות הדינמית (ATP — Available-to-Promise) בודקת אם החומר הנדרש זמין בתאריך הדרישה של הפק\"ע. נשלטת על-ידי Checking Group (באב החומר) + Checking Rule (לפי סוג פק\"ע ומפעל) → Scope of Check.",
        purposeHe:
          "המטרה היא למנוע שחרור פק\"ע ללא חומר זמין, ולהתריע למתכנן על חוסרים — כדי שהביצוע לא ייתקע ברצפת הייצור.",
        configHe: [
          "הגדר Checking Group (OVZ2 — בתפריט Production) ושייך לאב החומר (MRP view).",
          "הגדר Checking Rule ושייך ב-Checking Control (OPJK) לפי Order Type+Plant.",
          "הגדר Scope of Check (OPJJ) — אילו מלאים, קבלות (רכש) והוצאות (Reservations) נכללים.",
          "קבע Release material: 1 המשתמש מחליט / 2 שחרור למרות חוסר / 3 ללא שחרור (מומלץ 1).",
        ],
        navHe: [
          "Production ► Shop Floor Control ► Operations ► Availability Check ► Define Checking Control (OPJK)",
          "Production ► Shop Floor Control ► Operations ► Availability Check ► Define Scope of Check (OPJJ)",
        ],
        tcodes: ["OVZ2", "OPJK", "OPJJ", "CO24", "MD04", "CO09"],
        tables: ["TMVF", "MARC", "RESB"],
        fiori: ["F0247", "F2101"],
        masterDataHe: ["MARC-MTVFP = Checking Group (תצוגת MRP3) · ATP נקבע מול MARD/RESB."],
        flow: [
          { he: "Checking Group", code: "OVZ2" },
          { he: "Checking Rule", code: "OPJK" },
          { he: "Scope of Check", code: "OPJJ" },
          { he: "בדיקת ATP בשחרור", code: "CO02" },
          { he: "ניתוח חוסרים", code: "CO24/MD04" },
        ],
        cbcHe: "ב-CBC בדיקת הזמינות מבטיחה שתרכיז/אריזה זמינים לפני שחרור פק\"ע המילוי; חוסר נחסם ומנותב ל-MD04.",
        troubleshootHe: [
          "פק\"ע לא משוחררת — Status MSPT ➔ נתח חוסרים ב-CO24 (Missing Parts) וב-MD04.",
          "הבדיקה לא מתחשבת ברכש צפוי ➔ הפעל With Purchase Orders ב-OPJJ.",
          "בדיקה מאשרת למרות חוסר ➔ Scope of Check כולל מלאי לא רלוונטי.",
        ],
        bestPracticeHe: [
          "צור Checking Rule ייעודי לייצור — בידוד לוגיקת ה-ATP מתחומים אחרים.",
          "השאר Release material=1 — שהמתכנן יחליט, לא המערכת.",
        ],
      },
      {
        id: "3.7", titleHe: "תזמון (Scheduling)", titleEn: "Scheduling",
        conceptHe:
          "התזמון מחשב את תאריכי ההתחלה והסיום של הפק\"ע ופעולותיה, על בסיס ערכי הזמן ב-Routing, נוסחאות מרכז העבודה, ופרמטרי התזמון (Scheduling Type, Reduction). סוגי תזמון: Forward, Backward, Today.",
        purposeHe:
          "תזמון מדויק קובע מתי להתחיל ייצור כדי לעמוד בתאריך הסיום הנדרש, ומאפשר תכנון קיבולת ריאלי.",
        configHe: [
          "הגדר Scheduling Parameters פר-Order Type+Plant (OPU3 לפק\"ע, OPU5 לרשימת משימות).",
          "קבע Scheduling Type, Automatic Scheduling, ו-Reduction Strategies לקיצור משך.",
          "הגדר Scheduling Margin Key (OPJK) — Floats לפני/אחרי ייצור.",
        ],
        navHe: [
          "Production ► Shop Floor Control ► Operations ► Scheduling ► Define Scheduling Parameters for Production Orders (OPU3)",
        ],
        tcodes: ["OPU3", "OPU5", "OPJK", "CO01", "CM01"],
        tables: ["AFKO", "AFVV", "PLPO"],
        fiori: ["F2336", "F0289"],
        masterDataHe: ["AFKO-GLTRP/GSTRP = תאריכי סיום/התחלה · AFVV = ערכי זמן/תזמון פעולה."],
        flow: [
          { he: "ערכי זמן (Routing)", code: "PLPO" },
          { he: "נוסחאות מרכז עבודה", code: "OP21" },
          { he: "פרמטרי תזמון", code: "OPU3" },
          { he: "תזמון אחורה/קדימה", code: "Backward/Forward" },
          { he: "תאריכי פק\"ע", code: "AFKO" },
        ],
        cbcHe: "ב-CBC תזמון אחורה (Backward) מתאריך אספקה נדרש קובע מתי להתחיל מילוי, בהתחשב בזמני הכנה וניקוי הקו.",
        troubleshootHe: [
          "תאריכי התחלה בעבר ➔ המערכת עברה ל-Today Scheduling; בדוק Floats ו-Reduction.",
          "משך פק\"ע ארוך מדי ➔ נוסחאות/ערכי תקן שגויים או Reduction לא מופעל.",
        ],
        bestPracticeHe: [
          "הגדר Scheduling Margin Key ריאלי — Floats גדולים מדי מנפחים את משך התכנון.",
          "הפעל Automatic Scheduling בשחרור לקבלת תאריכים מעודכנים.",
        ],
      },
      {
        id: "3.8", titleHe: "פרופיל תזמון ייצור (Production Scheduling Profile)", titleEn: "Production Scheduling Profile",
        conceptHe:
          "פרופיל תזמון הייצור מרכז אוטומציות לפק\"ע: שחרור אוטומטי ביצירה, יצירת מתכון בקרה אוטומטית, קבלת תוצר אוטומטית (Automatic GR), סגירה אוטומטית ופרמטרי דיווח. משויך לאב החומר (שדה SFCPF בתצוגת Work Scheduling).",
        purposeHe:
          "הפרופיל חוסך צעדים ידניים חוזרים ומבטיח עיבוד אחיד — חיוני לייצור בנפח גבוה.",
        configHe: [
          "הגדר Production Scheduling Profile (OPKP): Automatic Release, Automatic GR, Settlement, Confirmation defaults.",
          "שייך את הפרופיל לאב החומר (Work Scheduling view).",
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
          { he: "שייך לאב חומר", code: "MM02" },
          { he: "אוטומציות בפק\"ע", code: "Release/GR" },
        ],
        cbcHe: "ב-CBC הפרופיל מפעיל שחרור וקבלת תוצר אוטומטיים בקווי המילוי בנפח גבוה — מצמצם התערבות ידנית.",
        troubleshootHe: [
          "פק\"ע נפתחת ב-CRTD במקום REL ➔ Automatic Release לא מופעל בפרופיל / לא משויך לאב החומר.",
          "רישומי מלאי שגויים ➔ Automatic GR פעיל אך הדיווח לא מדויק.",
        ],
        bestPracticeHe: [
          "הפעל שחרור אוטומטי רק היכן שבדיקת הזמינות אינה קריטית.",
          "הימנע מ-Automatic GR אם הדיווח (Confirmation) אינו אמין.",
        ],
      },
      {
        id: "3.9", titleHe: "גרסת ייצור (Production Version)", titleEn: "Production Version",
        conceptHe:
          "גרסת הייצור (MKAL) מקשרת BOM Alternative + Routing/Recipe Group לחומר ומפעל, עם תוקף וטווח כמויות (Lot Size From/To). ב-S/4HANA היא חובה — ה-MRP, ההמרה לפק\"ע והתמחיר נשענים עליה.",
        purposeHe:
          "הגרסה מגדירה איזה שילוב BOM+Routing תקף לאיזה טווח כמויות ומתי — ומאפשרת ניהול מספר שיטות ייצור לאותו מוצר.",
        configHe: [
          "תחזק Production Versions ב-C223 (או בתצוגת MRP4 של אב החומר).",
          "הרץ Consistency Check (C223) לאימות קיום ותוקף ה-BOM וה-Routing.",
          "קבע ADATU/BDATU (תוקף) ו-BSTMI/BSTMA (טווח כמות).",
        ],
        navHe: ["Logistics ► Production ► Master Data ► Production Version (C223)"],
        tcodes: ["C223", "MM02", "CU51"],
        tables: ["MKAL", "MARC"],
        fiori: ["F1421", "F2336"],
        masterDataHe: [
          "MKAL: ALNAL=Routing group, STLAL=BOM alternative, ADATU/BDATU=תוקף, BSTMI/BSTMA=טווח כמות.",
        ],
        flow: [
          { he: "BOM Alternative", code: "STLAL" },
          { he: "Routing Group", code: "ALNAL" },
          { he: "Production Version", code: "C223" },
          { he: "Consistency Check", code: "Cons.chk" },
          { he: "זמין ל-MRP/פק\"ע", code: "MD01N" },
        ],
        cbcHe: "ב-CBC כל מוצר מיוצר חייב Production Version תקפה — תנאי סף להרצת MRP ולהמרת הזמנות מתוכננות על קווי המילוי.",
        troubleshootHe: [
          "MRP לא מוצא Production Version ➔ תוקף/טווח כמות לא תואמים או Consistency Check אדום.",
          "המרת הזמנה מתוכננת נכשלת ➔ חוסר Production Version (כשל קשיח ב-S/4HANA).",
        ],
        bestPracticeHe: [
          "שמור Production Version אחת ברורה לכל חומר; ריבוי גרסאות מסבך את בחירת ה-MRP.",
          "הרץ Consistency Check לאחר כל שינוי ב-BOM/Routing.",
        ],
      },
    ],
  },
};

export const PP_TEXTBOOK_STATS = Object.fromEntries(
  Object.entries(PP_TEXTBOOK).map(([ch, c]) => {
    const subs = c.subchapters;
    const sections = subs.length * 12;
    const items = subs.reduce(
      (s, u) => s + u.configHe.length + u.navHe.length + u.masterDataHe.length + u.troubleshootHe.length + u.bestPracticeHe.length + (u.flow?.length ?? 0),
      0,
    );
    return [ch, { subchapters: subs.length, sections, items }];
  }),
);
