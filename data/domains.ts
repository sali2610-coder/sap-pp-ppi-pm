// SAP PM / PP-PI functional domains — authored from standard SAP knowledge
// (Plant Maintenance & Process Industries). Tables/T-Codes/BAPIs are real SAP
// objects. Hand-verified reference content (same class as the academy/library),
// NOT auto-generated and NOT random. Tables present in the dataset deep-link to
// /object; the rest render as reference chips.

export interface DomainTrouble { issue: string; fix: string }
export interface DomainStep { step: string; he: string }
export interface Domain {
  slug: string;
  module: "PM" | "PP-PI";
  title: string;       // English domain title
  he: string;          // Hebrew title
  summary: string;     // executive summary (he)
  flow: DomainStep[];  // business flow
  tables: string[];
  tcodes: string[];
  bapis: string[];
  learning: string[];  // key learning points (he)
  trouble: DomainTrouble[];
}

export const DOMAINS: Domain[] = [
  /* ========================= PM ========================= */
  {
    slug: "pm-work-centers", module: "PM", title: "Work Centers", he: "מרכזי עבודה",
    summary: "מרכז עבודה (Work Center) מגדיר היכן ועל ידי מי מתבצעת עבודת אחזקה — קיבולת, נוסחאות תזמון, ושיוך מרכז עלות. משמש במשימות (Task Lists) ובפקודות אחזקה לחישוב עומסים ועלויות.",
    flow: [{ step: "Define", he: "הגדרת מרכז עבודה (IR01)" }, { step: "Capacity", he: "קיבולת זמינה (KAKO)" }, { step: "Costing", he: "שיוך מרכז עלות (CRCO)" }, { step: "Assign", he: "שיוך למשימה/פקודה" }, { step: "Load", he: "חישוב עומס וקיבולת" }],
    tables: ["CRHD", "CRCA", "CRCO", "CRTX", "KAKO"],
    tcodes: ["IR01", "IR02", "IR03", "CR60", "CM01"],
    bapis: ["CR_WORKCENTER_READ", "CRAP_WORKCENTER_GET_DETAIL"],
    learning: ["מרכז עבודה = איפה+מי+כמה (קיבולת)", "CRHD כותרת, CRCA קיבולת, CRCO שיוך עלות, CRTX טקסט", "קטגוריה 0005 לאחזקה (PM)", "מרכז עבודה מקושר למרכז עלות לצורך חיוב שעות"],
    trouble: [{ issue: "מרכז עבודה לא נמצא בפקודה", fix: "בדוק תוקף תאריך ושיוך מרכז עבודה/מפעל (IR03)" }, { issue: "שגיאת חיוב עלויות", fix: "ודא שיוך מרכז עלות פעיל ב-CRCO לתקופה" }, { issue: "אין קיבולת", fix: "הגדר קיבולת זמינה ב-KAKO ולוח שנת מפעל" }],
  },
  {
    slug: "pm-maintenance-planning", module: "PM", title: "Maintenance Planning", he: "תכנון אחזקה",
    summary: "תכנון אחזקה מנהל מתי לבצע פעילות אחזקה — תכניות אחזקה (Maintenance Plans), פריטי תכנית, ותזמון מבוסס זמן/ביצועים. ה-Scheduling יוצר קריאות שמומרות אוטומטית לפקודות/הודעות אחזקה.",
    flow: [{ step: "Plan", he: "תכנית אחזקה (IP01)" }, { step: "Items", he: "פריטי תכנית (MPOS)" }, { step: "Schedule", he: "תזמון (IP10)" }, { step: "Monitor", he: "ניטור מועדים (IP30)" }, { step: "Call", he: "יצירת פקודה/הודעה" }],
    tables: ["MPLA", "MPOS", "MHIO", "MHIS", "PLKO", "PLPO"],
    tcodes: ["IP01", "IP02", "IP03", "IP10", "IP30", "IP19"],
    bapis: ["BAPI_ALM_ORDER_MAINTAIN"],
    learning: ["תכנית מבוססת-זמן מול מבוססת-ביצועים (Counter)", "MPLA כותרת תכנית, MPOS פריט תכנית, MHIS היסטוריית תזמון", "IP30 = job אצווה לניטור מועדים יומי", "אופק קריאה (Call Horizon) קובע מתי נוצרת הפקודה"],
    trouble: [{ issue: "לא נוצרות פקודות", fix: "הרץ IP30 / בדוק שהתכנית מתוזמנת (Start) ואופק הקריאה" }, { issue: "תזמון שגוי במבוסס-ביצועים", fix: "ודא קריאות מונה ב-IK11 ושער הערכה בנקודת המדידה" }],
  },
  {
    slug: "pm-maintenance-execution", module: "PM", title: "Maintenance Execution", he: "ביצוע אחזקה",
    summary: "ביצוע אחזקה מנהל את מחזור פקודת האחזקה: תכנון משאבים וחומרים, שחרור, ביצוע בשטח, אישורי שעות (Confirmations), תנועות מלאי וסגירה טכנית/עסקית (TECO/CLSD).",
    flow: [{ step: "Notification", he: "הודעת תקלה" }, { step: "Order", he: "פקודת אחזקה (IW31)" }, { step: "Plan", he: "תכנון פעולות/חומרים" }, { step: "Release", he: "שחרור (REL)" }, { step: "Confirm", he: "אישור ביצוע (IW41)" }, { step: "Complete", he: "סגירה טכנית (TECO)" }],
    tables: ["AUFK", "AFIH", "AFKO", "AFVC", "AFRU", "RESB"],
    tcodes: ["IW31", "IW32", "IW33", "IW38", "IW41", "IW3D"],
    bapis: ["BAPI_ALM_ORDER_MAINTAIN", "BAPI_ALM_CONF_CREATE"],
    learning: ["AFIH = הרחבת אחזקה של כותרת הפקודה (AUFK/AFKO)", "סטטוסים: CRTD → REL → CNF → TECO → CLSD", "אישור (AFRU) מזין שעות בפועל ועלויות", "TECO סוגר טכנית; CLSD סוגר עסקית אחרי התחשבנות"],
    trouble: [{ issue: "לא ניתן לשחרר פקודה", fix: "בדוק הרשאות, מרכז עבודה, וזמינות חומר (RESB)" }, { issue: "עלויות לא מתעדכנות", fix: "ודא אישור (IW41) ושיוך מרכז עלות; בדוק התחשבנות (KO88)" }, { issue: "לא ניתן ל-TECO", fix: "סגור הודעות פתוחות והזמנות רכש פתוחות" }],
  },
  {
    slug: "pm-notifications", module: "PM", title: "Notifications", he: "הודעות אחזקה",
    summary: "הודעת אחזקה מתעדת תקלה/בקשת עבודה: אובייקט פגוע, תיאור, פריטים, סיבות וקודי קטלוג. משמשת כנקודת פתיחה לפקודת אחזקה ולניתוח תקלות חוזרות.",
    flow: [{ step: "Malfunction", he: "תקלה/בקשה" }, { step: "Notification", he: "הודעה (IW21)" }, { step: "Items", he: "פריטים/סיבות (QMFE/QMUR)" }, { step: "Order", he: "המרה לפקודה" }, { step: "Close", he: "סגירת הודעה" }],
    tables: ["QMEL", "QMFE", "QMUR", "QMMA"],
    tcodes: ["IW21", "IW22", "IW23", "IW24", "IW28", "IW29"],
    bapis: ["BAPI_ALM_NOTIF_CREATE", "BAPI_ALM_NOTIF_DATA_ADD"],
    learning: ["סוגי הודעה: M1 תקלה, M2 בקשה, M3 פעילות", "QMEL כותרת, QMFE פריטים, QMUR סיבות, QMMA פעולות", "קודי קטלוג (Catalog Profile) מאפשרים ניתוח Pareto של תקלות", "IW28/IW29 = רשימות עבודה להמונים"],
    trouble: [{ issue: "קוד פגם לא זמין", fix: "בדוק Catalog Profile בסוג הודעה/סוג ציוד" }, { issue: "הודעה לא נסגרת", fix: "סגור פקודה מקושרת ופריטים פתוחים" }],
  },
  {
    slug: "pm-preventive-maintenance", module: "PM", title: "Preventive Maintenance", he: "אחזקה מונעת",
    summary: "אחזקה מונעת משלבת משימות אחזקה (Task Lists), אסטרטגיות (חבילות זמן/ביצועים) ותכניות אחזקה ליצירת פקודות אוטומטיות מתוזמנות — מפחיתה תקלות ומאריכה חיי נכס.",
    flow: [{ step: "Task List", he: "משימת אחזקה (IA01)" }, { step: "Strategy", he: "אסטרטגיה/חבילות (IP11)" }, { step: "Plan", he: "תכנית אחזקה (IP01)" }, { step: "Schedule", he: "תזמון (IP10)" }, { step: "Auto Orders", he: "פקודות אוטומטיות (IP30)" }],
    tables: ["PLKO", "PLPO", "PLMZ", "MPLA", "MHIO"],
    tcodes: ["IA01", "IA05", "IA06", "IP11", "IP10", "IP30"],
    bapis: ["BAPI_ALM_ORDER_MAINTAIN"],
    learning: ["משימה כללית (A) מול משימת ציוד (E)/מיקום (T)", "אסטרטגיית חבילות = תדירויות שונות לפעולות (חודשי/שנתי)", "תכנית אסטרטגיה מתזמנת מספר חבילות יחד", "PLKO/PLPO משותפים ל-PM ול-PP (מסלולים/מתכונים)"],
    trouble: [{ issue: "פעולות לא מופיעות בפקודה", fix: "בדוק שיוך חבילת אסטרטגיה לפעולה ב-IA06" }, { issue: "תזמון לא נכון", fix: "בדוק נקודת התחלה ולוח שנה; הרץ IP10 מחדש" }],
  },
  {
    slug: "pm-measuring-points", module: "PM", title: "Measuring Points & Counters", he: "נקודות מדידה ומונים",
    summary: "נקודות מדידה ומונים מתעדים מצב נכס (טמפ', שעות, ק\"מ). קריאות מדידה מזינות אחזקה מבוססת-מצב ותכניות מבוססות-ביצועים, ומאפשרות ניטור מגמות וגבולות אזהרה.",
    flow: [{ step: "Object", he: "ציוד/מיקום טכני" }, { step: "Point", he: "נקודת מדידה (IK01)" }, { step: "Counter", he: "מונה" }, { step: "Reading", he: "קריאה (IK11)" }, { step: "CBM", he: "אחזקה מבוססת-מצב" }],
    tables: ["IMPTT", "IMRG", "EQUI", "IFLOT"],
    tcodes: ["IK01", "IK02", "IK03", "IK11", "IK07", "IK17"],
    bapis: ["BAPI_MEASUREMENTDOCUM_CREATE", "BAPI_MEASUREMENTDOCUM_CREATEMULT"],
    learning: ["IMPTT = נקודת מדידה, IMRG = מסמך קריאה", "מונה (Counter) מצטבר; נקודת מדידה רגעית", "קריאה יכולה להפעיל תכנית אחזקה מבוססת-ביצועים", "גבולות אזהרה מפעילים הודעות אוטומטיות"],
    trouble: [{ issue: "קריאה נדחית", fix: "בדוק שהקריאה עולה (מונה) ובתחום מותר" }, { issue: "תכנית מבוססת-ביצועים לא מתוזמנת", fix: "ודא קריאות סדירות ושער הערכה (Annual Estimate)" }],
  },

  {
    slug: "pm-functional-locations", module: "PM", title: "Functional Locations", he: "מיקומים פונקציונליים",
    summary: "מיקום פונקציונלי (Functional Location) מייצג היכן מתבצעת אחזקה — מבנה היררכי של המפעל לפי תהליך/מרחב. בסיס לשיוך ציוד, היסטוריה וניתוח עלויות לפי אתר.",
    flow: [{ step: "Structure", he: "מחוון מבנה (Edit Mask)" }, { step: "Create", he: "מיקום פונקציונלי (IL01)" }, { step: "Hierarchy", he: "היררכיה רב-שכבתית" }, { step: "Link", he: "שיוך ציוד" }, { step: "History", he: "היסטוריה ועלויות" }],
    tables: ["IFLOT", "IFLOS", "ILOA"],
    tcodes: ["IL01", "IL02", "IL03", "IL05", "IH06"],
    bapis: ["BAPI_FUNCLOC_CREATE", "BAPI_FUNCLOC_CHANGE", "BAPI_FUNCLOC_GETDETAIL"],
    learning: ["IFLOT כותרת מיקום, IFLOS מבנה, ILOA נתוני מיקום/חשבונאות", "מחוון מבנה (Structure Indicator) קובע פורמט מזהה היררכי", "מיקום קבוע מול ציוד נייד — ציוד מותקן/מפורק במיקום", "היררכיית מיקומים = בסיס לגלגול עלויות אחזקה"],
    trouble: [{ issue: "מזהה מיקום נדחה", fix: "בדוק מחוון מבנה ו-Edit Mask ב-SPRO" }, { issue: "נתוני חשבונאות חסרים", fix: "ILOA — בדוק מרכז עלות/אתר תחזוקה" }],
  },
  {
    slug: "pm-equipment", module: "PM", title: "Equipment", he: "ציוד",
    summary: "ציוד (Equipment) הוא נכס בודד הניתן למעקב — מותקן במיקום פונקציונלי, נושא מספר סידורי, היסטוריית אחזקה ונקודות מדידה. ליבת ניהול הנכסים ב-PM.",
    flow: [{ step: "Category", he: "קטגוריית ציוד" }, { step: "Create", he: "ציוד (IE01)" }, { step: "Serial", he: "מספר סידורי" }, { step: "Install", he: "התקנה במיקום (IE4N)" }, { step: "History", he: "היסטוריית שימוש" }],
    tables: ["EQUI", "EQKT", "EQUZ", "OBJK", "ILOA"],
    tcodes: ["IE01", "IE02", "IE03", "IE4N", "IE07", "IH08"],
    bapis: ["BAPI_EQUI_CREATE", "BAPI_EQUI_CHANGE", "BAPI_EQUI_GETDETAIL", "BAPI_EQUI_INSTALL", "BAPI_EQUI_DISMANTLE"],
    learning: ["EQUI כותרת, EQKT טקסט, EQUZ חלוקת זמן (Time Segment), OBJK אובייקט סידורי", "ציוד מותקן/מפורק ממיקום פונקציונלי (היסטוריה נשמרת)", "קטגוריית ציוד (M מכונה, S סידורי) קובעת התנהגות", "ILOA משותף — נתוני מיקום/חשבונאות לציוד ולמיקום"],
    trouble: [{ issue: "לא ניתן להתקין ציוד", fix: "בדוק תאריך התקנה, קטגוריה ושיוך מיקום (IE4N)" }, { issue: "מספר סידורי כפול", fix: "בדוק פרופיל סידורי וטווח מספרים" }],
  },
  {
    slug: "pm-maintenance-orders", module: "PM", title: "Maintenance Orders", he: "פקודות אחזקה",
    summary: "פקודת אחזקה היא אובייקט הביצוע והעלות — מתכננת פעולות, חומרים ומשאבים, מתעדת עלויות בפועל ומשמשת לתכנון, שחרור, אישור והתחשבנות של עבודת אחזקה.",
    flow: [{ step: "Order", he: "פקודה (IW31)" }, { step: "Operations", he: "פעולות + משאבים" }, { step: "Components", he: "חומרים (RESB)" }, { step: "Release", he: "שחרור" }, { step: "Settle", he: "התחשבנות (KO88)" }],
    tables: ["AUFK", "AFIH", "AFKO", "AFVC", "RESB"],
    tcodes: ["IW31", "IW32", "IW33", "IW38", "IW39"],
    bapis: ["BAPI_ALM_ORDER_MAINTAIN", "BAPI_ALM_ORDER_GET_DETAIL"],
    learning: ["AUFK כותרת פקודה, AFIH הרחבת אחזקה, AFKO/AFVC לוגיסטיקה/פעולות, RESB רכיבים", "סוגי פקודה: PM01 תיקון, PM02 מונע, PM03 השקעה", "IW38/IW39 = רשימות עבודה לניהול פקודות המוני", "עלויות מתגלגלות לפקודה ומותחשבנות למרכז עלות/נכס"],
    trouble: [{ issue: "פקודה ללא עלות מתוכננת", fix: "בדוק פעולות, מרכז עבודה ונוסחאות תמחור" }, { issue: "לא ניתן לסגור (CLSD)", fix: "השלם התחשבנות (KO88) וסגור הזמנות פתוחות" }],
  },
  {
    slug: "pm-technical-objects", module: "PM", title: "Technical Objects", he: "אובייקטים טכניים",
    summary: "אובייקטים טכניים = המבנה ההיררכי של נכסי המפעל: מיקומים פונקציונליים, ציוד, תת-ציוד ונקודות מדידה. תצוגת-העל לניווט וניתוח כל היררכיית האחזקה.",
    flow: [{ step: "Locations", he: "היררכיית מיקומים" }, { step: "Equipment", he: "ציוד מותקן" }, { step: "Sub-Equipment", he: "תת-ציוד" }, { step: "Measuring", he: "נקודות מדידה" }, { step: "Structure", he: "תצוגת מבנה (IH01)" }],
    tables: ["IFLOT", "EQUI", "EQUZ", "IMPTT", "OBJK"],
    tcodes: ["IH01", "IH06", "IL03", "IE03", "IK03"],
    bapis: ["BAPI_FUNCLOC_GETDETAIL", "BAPI_EQUI_GETDETAIL"],
    learning: ["היררכיה: מיקום פונקציונלי → ציוד → תת-ציוד → נקודת מדידה", "IH01/IH06 = תצוגת מבנה גרפית/רשימתית של אובייקטים טכניים", "ריבוי-שכבות מאפשר גלגול עלויות והיסטוריה לפי רמה", "אובייקט ייחוס (Reference Object) בהודעה/פקודה = מיקום או ציוד"],
    trouble: [{ issue: "אובייקט לא בהיררכיה", fix: "בדוק שיוך עליון (Superior FL/Equipment) ב-IL02/IE02" }, { issue: "מבנה לא מוצג", fix: "בדוק רמות תצוגה ופילטר ב-IH01" }],
  },
  {
    slug: "pm-spare-parts", module: "PM", title: "Spare Parts Integration (PM-MM)", he: "אינטגרציית חלפים (PM-MM)",
    summary: "אינטגרציית חלפים מחברת אחזקה לרכש ומלאי — רכיבי פקודה, הזמנות מלאי, דרישות רכש ומשיכת חומר מהמחסן. מבטיחה זמינות חלפים לביצוע אחזקה.",
    flow: [{ step: "Components", he: "רכיבי פקודה" }, { step: "Reservation", he: "הזמנת מלאי (RESB)" }, { step: "PReq", he: "דרישת רכש (EBAN)" }, { step: "Issue", he: "משיכת חומר (MB1A)" }, { step: "Confirm", he: "צריכה בפקודה" }],
    tables: ["RESB", "EBKN", "EBAN", "MAST", "MARC"],
    tcodes: ["IW31", "MB1A", "ME21N", "IW3M", "MB21"],
    bapis: ["BAPI_RESERVATION_CREATE1", "BAPI_PR_CREATE", "BAPI_GOODSMVT_CREATE"],
    learning: ["RESB = הזמנת מלאי לרכיבי הפקודה; EBKN/EBAN = דרישת רכש לחלפים לא-מלאיים", "חומר מלאי (Stock) מול לא-מלאי (Non-stock → דרישת רכש)", "IW3M = רשימת חומרים/חלפים בפקודה", "משיכת חומר (261) מקטינה מלאי ומחייבת את הפקודה"],
    trouble: [{ issue: "חוסר חלף", fix: "בדוק ATP/מלאי; הפוך לדרישת רכש לחלף לא-מלאי" }, { issue: "תנועת מלאי נכשלת", fix: "בדוק תקופה, אצווה ומיקום אחסון (COGI/MB1A)" }],
  },
  {
    slug: "pm-analytics", module: "PM", title: "PM Analytics & KPIs", he: "אנליטיקה ומדדי PM",
    summary: "אנליטיקת PM נותנת שקיפות לביצועי אחזקה — מערכת מידע PM (PMIS), רשימות עבודה ומדדי אמינות (MTBF/MTTR), עלויות ותקלות חוזרות. בסיס לאחזקה מבוססת-נתונים.",
    flow: [{ step: "Source", he: "פקודות + הודעות" }, { step: "PMIS", he: "מערכת מידע PM (MCI*)" }, { step: "Worklists", he: "רשימות (IW38/IW28)" }, { step: "KPIs", he: "MTBF · MTTR · עלות" }],
    tables: ["AUFK", "QMEL", "AFRU"],
    tcodes: ["IW38", "IW39", "IW28", "IW29", "MCI3", "MCI8"],
    bapis: ["BAPI_ALM_ORDER_GET_DETAIL", "BAPI_ALM_NOTIF_GET_DETAIL"],
    learning: ["PMIS (MCI*) = מערכת מידע אחזקה מבוססת מבני מידע (S061-S070)", "מדדי אמינות: MTBF (זמן ממוצע בין תקלות), MTTR (זמן תיקון ממוצע)", "IW28/IW29 הודעות, IW38/IW39 פקודות — ניתוח המוני", "ב-S/4 — אנליטיקה חיה דרך CDS + Fiori (Maintenance Management Overview)"],
    trouble: [{ issue: "מדדים ריקים", fix: "ודא עדכון מבני מידע (LIS) ופרק זמן בניתוח" }, { issue: "תקלות חוזרות לא מזוהות", fix: "השתמש בקודי קטלוג בהודעות לניתוח Pareto" }],
  },

  /* ========================= PP-PI ========================= */
  {
    slug: "pppi-planning", module: "PP-PI", title: "Demand Planning", he: "תכנון ביקוש",
    summary: "תכנון ביקוש קובע מה לייצר ובכמה — תחזיות (SOP/PIR), ניהול ביקוש והעברה ל-MRP. בסיס לכל שרשרת הייצור התהליכי.",
    flow: [{ step: "SOP", he: "תכנון מכירות ותפעול (MC87)" }, { step: "Demand", he: "ניהול ביקוש" }, { step: "PIR", he: "דרישות תכנון עצמאיות (MD61)" }, { step: "Transfer", he: "העברה ל-MRP" }],
    tables: ["PBED", "PBIM", "MARC", "MARA"],
    tcodes: ["MD61", "MD62", "MD63", "MC87", "MC88"],
    bapis: ["BAPI_REQUIREMENTS_CREATE", "BAPI_REQUIREMENTS_CHANGE"],
    learning: ["PIR = Planned Independent Requirement (תחזית)", "PBED טבלת דרישות תכנון, PBIM אינדקס", "אסטרטגיות תכנון (10/40) — Make-to-Stock מול Make-to-Order", "צריכת תחזית מול הזמנות בפועל (Consumption Mode)"],
    trouble: [{ issue: "PIR לא נצרך", fix: "בדוק אסטרטגיית תכנון וגרסת דרישות (00)" }, { issue: "תחזית לא עוברת ל-MRP", fix: "ודא Active version ו-MRP type מתאים" }],
  },
  {
    slug: "pppi-mrp", module: "PP-PI", title: "MRP", he: "תכנון דרישות חומר (MRP)",
    summary: "MRP מחשב מה, כמה ומתי לרכוש/לייצר על בסיס דרישות, מלאי ופרמטרי תכנון. מייצר הזמנות מתוכננות ודרישות רכש, ומאזן היצע מול ביקוש.",
    flow: [{ step: "Input", he: "דרישות + מלאי + BOM" }, { step: "Run", he: "ריצת MRP (MD01/MD02)" }, { step: "Planned Orders", he: "הזמנות מתוכננות (PLAF)" }, { step: "Evaluate", he: "רשימת MRP (MD04)" }, { step: "Convert", he: "המרה לפקודת תהליך/רכש" }],
    tables: ["PLAF", "MDKP", "MDTB", "RESB", "MARC"],
    tcodes: ["MD01", "MD02", "MD03", "MD04", "MD05", "MD07", "MD01N"],
    bapis: ["BAPI_MATERIAL_AVAILABILITY", "BAPI_PLANNEDORDER_CREATE"],
    learning: ["MRP Type (PD/VB) ו-Lot Size קובעים את צורת התכנון", "MD04 = רשימת מלאי/דרישות חיה; MD05 = רשימת MRP סטטית", "PLAF = הזמנה מתוכננת → מומרת לפקודת תהליך (COR8)", "Net Change (NETCH) מול Regenerative (NEUPL)"],
    trouble: [{ issue: "חומר לא מתוכנן", fix: "בדוק MRP Type ≠ ND ו-MRP Group/Plant" }, { issue: "כפל דרישות", fix: "בדוק אסטרטגיית תכנון וצריכת PIR" }, { issue: "הזמנות לא מומרות", fix: "ודא גרסת ייצור (MKAL) תקפה" }],
  },
  {
    slug: "pppi-production-versions", module: "PP-PI", title: "Production Versions", he: "גרסאות ייצור",
    summary: "גרסת ייצור מקשרת עץ מוצר (BOM) למתכון/מסלול ולתקופת תוקף — קובעת איזה שילוב חומרים+תהליך משמש לייצור. נדרשת ל-MRP ולפקודת תהליך.",
    flow: [{ step: "BOM", he: "עץ מוצר" }, { step: "Recipe", he: "מתכון אב" }, { step: "Version", he: "גרסת ייצור (C223)" }, { step: "Validity", he: "תוקף וכמויות" }, { step: "Use", he: "שימוש ב-MRP/פקודה" }],
    tables: ["MKAL", "PLKO", "MARC"],
    tcodes: ["C223", "MM01", "MM02"],
    bapis: ["BAPI_MATERIAL_SAVEDATA"],
    learning: ["MKAL = טבלת גרסאות ייצור", "גרסה = BOM + מתכון + תוקף + טווח כמויות", "ב-S/4 גרסת ייצור חובה (לא אופציונלית כמו ECC)", "בחירת גרסה אוטומטית/ידנית בפקודה"],
    trouble: [{ issue: "אין גרסת ייצור תקפה", fix: "צור גרסה ב-C223 עם תוקף וכמות מתאימים" }, { issue: "גרסה לא נבחרת", fix: "בדוק נעילה (Lock) וטווח כמויות מול כמות הפקודה" }],
  },
  {
    slug: "pppi-master-recipes", module: "PP-PI", title: "Master Recipes", he: "מתכוני אב",
    summary: "מתכון אב מגדיר את תהליך הייצור התהליכי — פעולות (Operations), שלבים (Phases), משאבים, חומרים ויחסי תזמון. בסיס לפקודת התהליך ולמרשם הבקרה (Control Recipe).",
    flow: [{ step: "Group", he: "קבוצת מתכונים" }, { step: "Operations", he: "פעולות (C201)" }, { step: "Phases", he: "שלבים" }, { step: "Materials", he: "הקצאת רכיבים" }, { step: "Costing", he: "תמחור" }],
    tables: ["PLKO", "PLPO", "PLMZ", "PLFL"],
    tcodes: ["C201", "C202", "C203", "C251", "C298"],
    bapis: ["BAPI_RECIPE_CREATE", "CRAP_RECIPE_GET_DETAIL"],
    learning: ["מתכון = Operations (משאב) → Phases (פעילות בפועל)", "PLKO כותרת, PLPO פעולות/שלבים, PLMZ הקצאת רכיבים, PLFL רצף", "Process Instructions בשלבים מזינים את מרשם הבקרה", "מתכון משותף במבנה ל-Routing של PP בדיד"],
    trouble: [{ issue: "שלב ללא משאב", fix: "שייך משאב (מרכז עבודה) לפעולת-העל של השלב" }, { issue: "רכיב לא מוקצה", fix: "בדוק הקצאת BOM לפעולה ב-PLMZ" }],
  },
  {
    slug: "pppi-process-orders", module: "PP-PI", title: "Process Orders", he: "פקודות תהליך",
    summary: "פקודת תהליך מנהלת ייצור תהליכי בפועל: כמויות, מתכון, משאבים, מרשם בקרה, תנועות מלאי, אישורים והתחשבנות. ליבת הביצוע של PP-PI.",
    flow: [{ step: "Planned", he: "הזמנה מתוכננת" }, { step: "Order", he: "פקודת תהליך (COR1)" }, { step: "Release", he: "שחרור" }, { step: "Control Recipe", he: "מרשם בקרה" }, { step: "Confirm", he: "אישור (COR6N)" }, { step: "Settle", he: "התחשבנות (KO88)" }],
    tables: ["AUFK", "AFKO", "AFPO", "AFVC", "AFFL", "RESB"],
    tcodes: ["COR1", "COR2", "COR3", "COR5", "COR6N", "COR7", "COR8"],
    bapis: ["BAPI_PROCORD_CREATE", "BAPI_PROCORD_RELEASE", "BAPI_PROCORD_GET_DETAIL"],
    learning: ["AFKO כותרת, AFPO פריט, AFVC פעולות, RESB רכיבים, AFFL רצף", "סטטוס: CRTD→REL→PCNF→CNF→TECO→CLSD", "שחרור מייצר מרשם בקרה (Control Recipe) ל-MES", "COR8 = המרת הזמנה מתוכננת לפקודת תהליך"],
    trouble: [{ issue: "שגיאת זמינות חומר", fix: "בדוק ATP ו-RESB; הרץ בדיקת זמינות מחדש" }, { issue: "פקודה לא משוחררת", fix: "בדוק גרסת ייצור, מרכז עבודה ובדיקת אצווה" }, { issue: "מרשם בקרה לא נוצר", fix: "ודא יעד מרשם בקרה (C2A1) ו-Process Instructions במתכון" }],
  },
  {
    slug: "pppi-confirmations", module: "PP-PI", title: "Confirmations", he: "אישורי ייצור",
    summary: "אישור מדווח על ביצוע פעולה/שלב — כמויות שיוצרו, זמן, צריכת רכיבים (Backflush) וקבלת תוצר. מעדכן עלויות ומלאי; שגיאות נופלות ל-COGI.",
    flow: [{ step: "Operation", he: "פעולה/שלב" }, { step: "Confirm", he: "אישור (COR6N)" }, { step: "Backflush", he: "צריכת רכיבים אוטומטית" }, { step: "GR", he: "קבלת תוצר" }, { step: "Errors", he: "טיפול שגיאות (COGI)" }],
    tables: ["AFRU", "AFKO", "RESB", "MSEG"],
    tcodes: ["COR6N", "CORK", "CO11N", "COGI", "MF47"],
    bapis: ["BAPI_PROCORDCONF_CREATE_TT", "BAPI_PROCORDCONF_GETLIST"],
    learning: ["AFRU = טבלת אישורים", "Backflush = צריכת רכיבים אוטומטית באישור", "אישור חלקי/סופי (Partial/Final)", "תנועות מלאי כושלות נחסמות ב-COGI לתיקון ידני"],
    trouble: [{ issue: "תנועות תקועות", fix: "טפל ב-COGI (MF47) — חוסר מלאי/אצווה/תקופה" }, { issue: "עלויות שגויות", fix: "בדוק כמות בסיס וגרסת חישוב; בטל ותקן אישור" }],
  },
  {
    slug: "pppi-batch-management", module: "PP-PI", title: "Batch Management", he: "ניהול אצוות",
    summary: "ניהול אצוות מאפשר מעקב, סיווג וקביעת אצווה (Batch Determination) לחומרים — קריטי לתעשיית מזון/משקאות (CBC), עם שלמות, שחרור והיסטוריה מלאה.",
    flow: [{ step: "Master", he: "אב אצווה (MSC1N)" }, { step: "Classify", he: "סיווג מאפיינים" }, { step: "Determine", he: "קביעת אצווה (COB1)" }, { step: "Track", he: "מעקב ושחרור" }, { step: "Derive", he: "גזירת אצווה" }],
    tables: ["MCHA", "MCH1", "MCHB", "AUSP", "INOB"],
    tcodes: ["MSC1N", "MSC2N", "MSC3N", "MSC4N", "COB1", "CL20N"],
    bapis: ["BAPI_BATCH_CREATE", "BAPI_BATCH_CHANGE", "VB_BATCH_DETERMINATION"],
    learning: ["MCH1 רמת חומר, MCHA רמת אצווה, MCHB רמת מלאי", "סיווג דרך AUSP/INOB (Classification)", "אסטרטגיית קביעת אצווה לפי תנאי בחירה ומיון", "Batch derivation מעביר מאפיינים בין רמות BOM"],
    trouble: [{ issue: "אצווה לא נקבעת", fix: "בדוק רשומת תנאי, קלאס בחירה (023) ומיון (Sort)" }, { issue: "מאפיין חסר", fix: "ודא שיוך קלאס 022/023 לחומר וערכים ב-MSC2N" }],
  },
  {
    slug: "pppi-mes-integration", module: "PP-PI", title: "MES Integration (PI/PCS)", he: "אינטגרציית MES",
    summary: "אינטגרציית MES מחברת את פקודת התהליך לבקרת רצפת הייצור — מרשמי בקרה (Control Recipes), גליונות PI ו-PCS, הודעות תהליך חזרה ל-SAP. מאפשרת ייצור אוטומטי וניטור בזמן אמת.",
    flow: [{ step: "Order", he: "פקודת תהליך משוחררת" }, { step: "Control Recipe", he: "מרשם בקרה (CO53)" }, { step: "Destination", he: "יעד (C2A1)" }, { step: "PI Sheet", he: "גליון PI (CO60)" }, { step: "Messages", he: "הודעות תהליך → SAP" }],
    tables: ["AFKO", "AFVC", "PLPO"],
    tcodes: ["CO53", "CO60", "C2A1", "CO54", "O09C"],
    bapis: ["BAPI_CONTROL_RECIPE_GETLIST", "BAPI_PROCESS_MESSAGE_CREATEMULT"],
    learning: ["Process Instructions (PI) במתכון → מרשם בקרה", "מרשם בקרה נשלח ליעד (Destination) — גליון PI או PCS/MES", "הודעות תהליך (Process Messages) מחזירות נתונים: אישור, צריכה, מדידה", "LOIPRO = IDoc העברת מסלול/מתכון למערכת חיצונית"],
    trouble: [{ issue: "מרשם בקרה לא נשלח", fix: "בדוק יעד ב-C2A1 וסטטוס מרשם ב-CO53" }, { issue: "הודעות תהליך לא נקלטות", fix: "בדוק קטגוריות הודעה ו-Destination; עיבוד ב-CO54" }],
  },
  {
    slug: "pppi-production-analytics", module: "PP-PI", title: "Production Analytics", he: "אנליטיקת ייצור",
    summary: "אנליטיקת ייצור מספקת שקיפות תפעולית — מערכת מידע פקודות (COOIS), עיבוד המוני (COHV), ו-KPIs: תפוקה, פסולת, זמן מחזור, ניצול קיבולת. בסיס לשיפור מתמיד.",
    flow: [{ step: "Orders", he: "פקודות תהליך" }, { step: "Info System", he: "מערכת מידע (COOIS)" }, { step: "Mass", he: "עיבוד המוני (COHV)" }, { step: "KPIs", he: "מדדים: תפוקה/פסולת/מחזור" }],
    tables: ["AFKO", "AFPO", "AFRU"],
    tcodes: ["COOIS", "COHV", "MCP1", "MCPB", "COGI"],
    bapis: ["BAPI_PROCORD_GET_LIST"],
    learning: ["COOIS = מערכת מידע פקודות (Order Info System) עם תצוגות גמישות", "COHV = שינוי/עיבוד המוני של פקודות", "KPIs מרכזיים: Yield, Scrap %, Lead Time, OEE", "ב-S/4 — אנליטיקה חיה דרך CDS + Fiori (Manage Production Orders)"],
    trouble: [{ issue: "נתונים חסרים בדוח", fix: "בחר תצוגה (Layout) ושדות מתאימים ב-COOIS" }, { issue: "פערי תפוקה", fix: "בדוק אישורים (AFRU) ופסולת מדווחת מול תקן" }],
  },
  {
    slug: "pppi-capacity-planning", module: "PP-PI", title: "Capacity Planning", he: "תכנון קיבולת",
    summary: "תכנון קיבולת מאזן עומס מול קיבולת זמינה של משאבים — הערכת קיבולת (CM01), פנמייה (CM21) ואיזון. מונע צווארי בקבוק ומבטיח תאריכי ייצור ברי-ביצוע.",
    flow: [{ step: "Capacity", he: "קיבולת זמינה (KAKO)" }, { step: "Requirements", he: "דרישות מפקודות" }, { step: "Evaluate", he: "הערכה (CM01)" }, { step: "Level", he: "איזון/פנמייה (CM21)" }, { step: "Dispatch", he: "שיבוץ פעולות" }],
    tables: ["KAKO", "CRCA", "CRHD"],
    tcodes: ["CM01", "CM21", "CM25", "CM07", "CM50"],
    bapis: ["CR_CAPACITY_READ"],
    learning: ["קיבולת זמינה (KAKO) מול דרישת קיבולת מפקודות", "CM01 = עומס/קיבולת; CM21 = לוח פנמייה (Planning Board)", "פרופיל כללי (Overall Profile) קובע תצוגות וקריטריוני שיבוץ", "Finite vs Infinite Scheduling"],
    trouble: [{ issue: "עומס יתר במשאב", fix: "אזן ב-CM21 — דחה/הקדם פעולות או הוסף משמרת ב-KAKO" }, { issue: "דרישת קיבולת לא מחושבת", fix: "ודא נוסחאות קיבולת במרכז העבודה ומפתח בקרת קיבולת" }],
  },
];

export const listDomains = () => DOMAINS.map((d) => ({ slug: d.slug, module: d.module, title: d.title, he: d.he }));
export const domainBySlug = (slug: string) => DOMAINS.find((d) => d.slug === slug);
export const domainsByModule = (m: "PM" | "PP-PI") => DOMAINS.filter((d) => d.module === m);
