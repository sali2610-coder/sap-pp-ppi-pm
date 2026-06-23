// ===== BW / BI / Analytics module — REAL data model =====
// Research-based. Classic SAP BW metadata tables (RS*) and extraction/ODP
// objects are real DDIC tables with their true keys. Logical analytics objects
// (ADSO, CompositeProvider, Open ODS View, BEx Query, CDS Analytical View, SAC
// Story, Analysis for Office) are represented as objects, never as fake tables.
// Every item is landscape-tagged so classic BW is never silently mixed with
// BW/4HANA / S/4 Embedded Analytics / Datasphere / SAC. trust: curated.

export type BWLand = "ECC BW" | "BW on HANA" | "BW/4HANA" | "S/4 Embedded" | "Datasphere" | "SAC";
type Field = [string, string, string, string];
type Rel = { role: "parent" | "child"; table: string; card: string; desc: string };
export interface BWTable {
  name: string; mod: "BW"; real: boolean; he: string; en: string;
  landscape: BWLand; zone: string; tcodes: string; fiori: string;
  s4: string; s4alt: string; guideHe: string;
  pk: string[]; fields: Field[]; funcs: string[]; cds: string[]; rel: Rel[]; degree: number;
}

const B = (
  name: string, he: string, en: string, landscape: BWLand, zone: string,
  pk: string[], fields: Field[], rel: Rel[],
  o: { tcodes?: string; s4?: string; s4alt?: string; guideHe?: string; cds?: string[] } = {},
): BWTable => ({
  name, mod: "BW", real: true, he, en, landscape, zone,
  tcodes: o.tcodes || "", fiori: "", s4: o.s4 || "", s4alt: o.s4alt || "", guideHe: o.guideHe || "",
  pk, fields, funcs: [], cds: o.cds || [], rel, degree: rel.length,
});
const F = (tech: string, en: string, key: "PK" | "FK" | "-" = "-"): Field => [tech, en, "", key];

export const BW_TABLES: BWTable[] = [
  /* ───────── Source extraction (ECC / ODP / CDS) ───────── */
  B("ROOSOURCE", "כותרת DataSource (Extractor)", "DataSource Header (Extractor)", "ECC BW", "Extraction",
    ["OLTPSOURCE", "OBJVERS"], [F("OLTPSOURCE", "DataSource", "PK"), F("EXMETHOD", "Extraction method", "-"), F("EXTRACTOR", "Extractor (FM/View)", "-"), F("DELTA", "Delta process", "-")],
    [{ role: "parent", table: "ROOSFIELD", card: "1:N", desc: "שדות ה-DataSource" }, { role: "parent", table: "RSDS", card: "1:N", desc: "DataSource ב-BW מבוסס על ה-extractor" }],
    { tcodes: "RSA2, RSA5, RSA6, SBIW", s4: "Extractors קלאסיים נתמכים אך SAP ממליצה על ODP/CDS; חלקם הוחלפו ב-CDS extraction.", s4alt: "ODP / CDS Extraction", guideHe: "ROOSOURCE מגדיר extractor במערכת המקור (ECC/S4): שיטת חילוץ, FM/View ותהליך דלתא. נקודת ההתחלה של זרימת הנתונים ל-BW." }),
  B("ROOSFIELD", "שדות DataSource", "DataSource Fields", "ECC BW", "Extraction",
    ["OLTPSOURCE", "FIELD", "OBJVERS"], [F("OLTPSOURCE", "DataSource", "PK"), F("FIELD", "Field name", "PK"), F("SELECTION", "Selection allowed", "-"), F("HIDID", "Hidden", "-")],
    [{ role: "child", table: "ROOSOURCE", card: "N:1", desc: "שדות השייכים ל-DataSource" }],
    { tcodes: "RSA2, RSA6", s4: "זהה; ב-CDS extraction השדות נגזרים מה-View.", guideHe: "ROOSFIELD מפרט את שדות ה-DataSource — אילו ניתנים לבחירה ואילו מוסתרים." }),
  B("RSDS", "DataSource (BW)", "DataSource (BW side)", "BW on HANA", "Extraction",
    ["DATASOURCE", "LOGSYS", "OBJVERS"], [F("DATASOURCE", "DataSource", "PK"), F("LOGSYS", "Source system", "PK"), F("RSDS_TYPE", "Type", "-")],
    [{ role: "child", table: "ROOSOURCE", card: "N:1", desc: "מבוסס על extractor במקור" }, { role: "parent", table: "RSTRAN", card: "1:N", desc: "טרנספורמציה מה-DataSource" }],
    { tcodes: "RSA1, RSDS", s4: "ב-BW/4HANA DataSource נשמר; ODP-based מועדף.", s4alt: "ODP DataSource", guideHe: "RSDS — אובייקט ה-DataSource בצד ה-BW; מקבל נתונים מה-extractor ומזין טרנספורמציות." }),
  B("ODP_Queue", "תור ODP (Delta)", "ODP Delta Queue", "BW on HANA", "Extraction",
    ["QUEUE", "SUBSCRIBER"], [F("QUEUE", "ODP queue name", "PK"), F("SUBSCRIBER", "Subscriber", "PK"), F("UNITS", "Pending units", "-")],
    [{ role: "child", table: "RSDS", card: "N:1", desc: "מנגנון דלתא ל-DataSource" }],
    { tcodes: "ODQMON, RSA7", s4: "ODP הוא מנגנון הדלתא המודרני (מחליף RSA7 הקלאסי).", s4alt: "ODQMON", guideHe: "תור ODP מנהל חילוץ דלתא בין מערכת המקור ל-BW; ניטור ב-ODQMON. תקיעת תור = נתונים לא מגיעים." }),
  B("CDS_AnalyticalView", "CDS אנליטי (Embedded)", "CDS Analytical View", "S/4 Embedded", "Embedded Analytics",
    ["DDLNAME"], [F("DDLNAME", "CDS view name", "PK"), F("ANNOTATION", "@Analytics.dataCategory", "-"), F("CUBECDS", "Cube/Dimension", "-")],
    [{ role: "parent", table: "SAC_Story", card: "1:N", desc: "צריכה ב-SAC / Fiori" }, { role: "child", table: "AFKO", card: "N:1", desc: "נגזר מנתוני פקודת ייצור (אינטגרציה PP-PI)" }],
    { tcodes: "RSRTS, /n (Fiori)", s4: "ליבת Embedded Analytics ב-S/4HANA — דיווח בזמן אמת ללא BW נפרד.", s4alt: "Embedded Analytics", guideHe: "CDS Analytical View (@Analytics.dataCategory: #CUBE) מספק דיווח חי על נתוני S/4 ללא חילוץ ל-BW — תחליף מודרני לקוביות." }),

  /* ───────── InfoObjects (master data + key figures) ───────── */
  B("RSDIOBJ", "מאגר InfoObjects", "InfoObject Directory", "BW on HANA", "InfoObjects",
    ["IOBJNM", "OBJVERS"], [F("IOBJNM", "InfoObject", "PK"), F("IOBJTP", "Type (CHA/KYF/UNI/TIM)", "-"), F("DATATP", "Data type", "-")],
    [{ role: "parent", table: "RSDIOBJT", card: "1:N", desc: "טקסטים" }, { role: "parent", table: "ADSO", card: "N:N", desc: "InfoObjects מרכיבים את ה-ADSO" }],
    { tcodes: "RSD1, RSA1", s4: "InfoObjects נשמרים ב-BW/4HANA; חלק מוחלף ב-fields ישירים ב-ADSO.", s4alt: "RSD1", guideHe: "RSDIOBJ — מאגר כל ה-InfoObjects (Characteristics, Key Figures, Units, Time). אבני הבניין של מודל הנתונים ב-BW." }),
  B("RSDIOBJT", "טקסטים ל-InfoObject", "InfoObject Texts", "BW on HANA", "InfoObjects",
    ["IOBJNM", "LANGU", "OBJVERS"], [F("IOBJNM", "InfoObject", "PK"), F("LANGU", "Language", "PK"), F("TXTLG", "Long text", "-")],
    [{ role: "child", table: "RSDIOBJ", card: "N:1", desc: "תיאורים רב-לשוניים" }],
    { tcodes: "RSD1", s4: "זהה.", guideHe: "RSDIOBJT — תיאורי ה-InfoObjects בשפות." }),
  B("SID_Table", "טבלת SID (Master Data)", "SID Table (/BI0/S...)", "BW on HANA", "InfoObjects",
    ["CHAR_VALUE"], [F("SID", "Surrogate ID (numeric)", "PK"), F("CHAR_VALUE", "Characteristic value", "-"), F("CHCKFL", "Check flag", "-")],
    [{ role: "child", table: "RSDIOBJ", card: "N:1", desc: "ממפה ערך תו ל-SID מספרי" }],
    { tcodes: "RSD1, RSRV", s4: "מנגנון SID נשמר; ב-HANA חלק מהביצועים שונה.", guideHe: "טבלת SID (/BI0/S<IOBJ>) ממירה ערכי Characteristic ל-Surrogate ID מספרי — בסיס לביצועי דיווח. תקלות SID = ערכים חסרים בדיווח." }),

  /* ───────── InfoProviders (storage) ───────── */
  B("RSDCUBE", "מאגר InfoCube", "InfoCube Directory", "ECC BW", "InfoProviders",
    ["INFOCUBE", "OBJVERS"], [F("INFOCUBE", "InfoCube", "PK"), F("CUBETYPE", "Cube type", "-"), F("BWAPPL", "Application", "-")],
    [{ role: "parent", table: "RSRREPDIR", card: "1:N", desc: "שאילתות על הקובייה" }],
    { tcodes: "RSA1, RSDCUBE, LISTCUBE", s4: "InfoCube ירד מרכזיות — ב-BW/4HANA הוחלף ב-ADSO (אין יותר טיפוסי קובייה קלאסיים).", s4alt: "ADSO", guideHe: "RSDCUBE — מאגר ה-InfoCubes הקלאסיים (סכמת כוכב). ב-BW/4HANA אינו קיים יותר — ה-ADSO תפס את מקומו." }),
  B("RSDODSO", "מאגר DSO קלאסי", "Classic DSO Directory", "ECC BW", "InfoProviders",
    ["ODSOBJECT", "OBJVERS"], [F("ODSOBJECT", "DSO", "PK"), F("ODSOTYPE", "DSO type", "-")],
    [{ role: "parent", table: "RSTRAN", card: "1:N", desc: "טרנספורמציות שמזינות את ה-DSO" }],
    { tcodes: "RSA1, RSDODS", s4: "DSO קלאסי הוחלף לחלוטין ב-ADSO ב-BW/4HANA.", s4alt: "ADSO", guideHe: "RSDODSO — מאגר ה-DSO הקלאסיים (Standard/Write-Optimized). ב-BW/4HANA מומרים ל-ADSO." }),
  B("ADSO", "Advanced DSO", "Advanced DataStore Object", "BW/4HANA", "InfoProviders",
    ["ADSONM"], [F("ADSONM", "ADSO name", "PK"), F("MODELING_TYPE", "Modeling type", "-"), F("INV_ENABLED", "Inventory", "-")],
    [{ role: "child", table: "RSTRAN", card: "N:1", desc: "נטען דרך טרנספורמציה+DTP" }, { role: "parent", table: "CompositeProvider", card: "N:N", desc: "משולב ב-CompositeProvider" }, { role: "child", table: "RSDIOBJ", card: "N:N", desc: "בנוי מ-InfoObjects" }],
    { tcodes: "RSA1, RSOADSO", s4: "אובייקט האחסון המרכזי של BW/4HANA — מאחד DSO+Cube+PSA לטיפוס אחד גמיש.", s4alt: "—", guideHe: "ADSO — אובייקט האחסון האוניברסלי של BW/4HANA. מחליף את InfoCube, DSO הקלאסי וה-PSA; תומך ב-staging ובדיווח כאחד." }),
  B("CompositeProvider", "CompositeProvider", "CompositeProvider (HCPR)", "BW/4HANA", "InfoProviders",
    ["HCPRNM"], [F("HCPRNM", "CompositeProvider", "PK"), F("SCENARIO", "Join/Union", "-")],
    [{ role: "child", table: "ADSO", card: "N:N", desc: "Join/Union של ADSOs ו-InfoObjects" }, { role: "parent", table: "RSRREPDIR", card: "1:N", desc: "שכבת הדיווח" }],
    { tcodes: "RSA1, RSLIMOBW", s4: "מחליף את MultiProvider ו-InfoSet הקלאסיים ב-BW/4HANA.", s4alt: "—", guideHe: "CompositeProvider — משלב (Join/Union) כמה ADSOs/InfoObjects לשכבת דיווח וירטואלית. מחליף MultiProvider+InfoSet." }),
  B("OpenODSView", "Open ODS View", "Open ODS View", "BW/4HANA", "InfoProviders",
    ["VIEWNAME"], [F("VIEWNAME", "View name", "PK"), F("SOURCE_TYPE", "Source (DB/DataSource)", "-")],
    [{ role: "child", table: "RSDS", card: "N:1", desc: "וירטואליזציה של מקור ללא טעינה" }],
    { tcodes: "RSA1", s4: "וירטואליזציה — דיווח על מקור ללא העתקת נתונים; מודרני ל-BW/4HANA.", s4alt: "—", guideHe: "Open ODS View — חושף מקור נתונים (טבלת DB/DataSource) לדיווח וירטואלי ללא staging — גמישות וזריזות." }),

  /* ───────── Transformation & loading ───────── */
  B("RSTRAN", "טרנספורמציה", "Transformation", "BW on HANA", "Transformation",
    ["TRANID", "OBJVERS"], [F("TRANID", "Transformation ID", "PK"), F("SOURCENAME", "Source", "FK"), F("TARGETNAME", "Target", "FK"), F("HANA_PUSHDOWN", "HANA pushdown", "-")],
    [{ role: "child", table: "RSDS", card: "N:1", desc: "ממפה DataSource ליעד" }, { role: "parent", table: "ADSO", card: "1:N", desc: "טוען ADSO" }, { role: "parent", table: "RSBKDTP", card: "1:N", desc: "מורץ דרך DTP" }],
    { tcodes: "RSA1, RSTRAN", s4: "ב-BW/4HANA טרנספורמציות רצות עם HANA pushdown (ביצועים); רוטינות ABAP ישנות נבדקות.", s4alt: "HANA-optimized transformation", guideHe: "RSTRAN — חוקי המיפוי/ניקוי בין מקור ליעד. ב-HANA חלק מהלוגיקה נדחף למסד (pushdown) לביצועים." }),
  B("RSBKDTP", "DTP", "Data Transfer Process", "BW on HANA", "Transformation",
    ["DTP", "OBJVERS"], [F("DTP", "DTP ID", "PK"), F("SRC", "Source", "FK"), F("TGT", "Target", "FK"), F("EXTRACTIONMODE", "Delta/Full", "-")],
    [{ role: "child", table: "RSTRAN", card: "N:1", desc: "מפעיל טרנספורמציה" }, { role: "parent", table: "RSPCCHAIN", card: "N:N", desc: "מתוזמן ב-Process Chain" }],
    { tcodes: "RSA1, RSBKDTPMON", s4: "DTP נשמר ב-BW/4HANA; ניטור דרך DTP Monitor.", s4alt: "—", guideHe: "RSBKDTP — מנהל את העברת הנתונים בפועל (Full/Delta) דרך הטרנספורמציה אל היעד. כשל DTP = טעינה אדומה." }),

  /* ───────── Orchestration ───────── */
  B("RSPCCHAIN", "הגדרת Process Chain", "Process Chain Definition", "BW on HANA", "Process Chains",
    ["CHAIN_ID", "OBJVERS"], [F("CHAIN_ID", "Process chain", "PK"), F("TYPE", "Variant type", "-")],
    [{ role: "child", table: "RSBKDTP", card: "N:N", desc: "מתזמן DTPs וצעדים" }, { role: "parent", table: "RSPCLOGCHAIN", card: "1:N", desc: "לוג ריצות" }],
    { tcodes: "RSPC, RSPCM", s4: "Process Chains נשמרים; ב-BW/4HANA חלק מנוהל גם ב-Datasphere Task Chains.", s4alt: "Datasphere Task Chain", guideHe: "RSPCCHAIN — הגדרת שרשרת התהליך שמתזמנת טעינות (DTP, אקטיבציה, אינדקסים). 'שרשרת אדומה' = כשל טעינה." }),
  B("RSPCLOGCHAIN", "לוג Process Chain", "Process Chain Logs", "BW on HANA", "Process Chains",
    ["LOG_ID", "CHAIN_ID"], [F("LOG_ID", "Run log ID", "PK"), F("CHAIN_ID", "Chain", "FK"), F("ANALYZED_STATUS", "Status (G/R/Y)", "-")],
    [{ role: "child", table: "RSPCCHAIN", card: "N:1", desc: "ריצות והסטטוס שלהן" }],
    { tcodes: "RSPC, RSPCM", s4: "זהה.", guideHe: "RSPCLOGCHAIN — היסטוריית ריצות השרשרת וסטטוס (ירוק/אדום/צהוב); נקודת האבחון לכשלי טעינה." }),

  /* ───────── Reporting / Query ───────── */
  B("RSRREPDIR", "מאגר שאילתות", "Query Directory", "BW on HANA", "Reporting",
    ["COMPID", "OBJVERS"], [F("COMPID", "Query technical name", "PK"), F("COMPUID", "Query UID", "-"), F("INFOCUBE", "InfoProvider", "FK")],
    [{ role: "child", table: "CompositeProvider", card: "N:1", desc: "שאילתה מעל InfoProvider" }, { role: "parent", table: "BEx_Query", card: "1:1", desc: "מוצגת ב-BEx/AFO/SAC" }],
    { tcodes: "RSRT, RSRT2, RSZDELETE", s4: "שאילתות BW נשמרות; הצריכה עוברת מ-BEx ל-Analysis for Office / SAC.", s4alt: "Analysis for Office / SAC", guideHe: "RSRREPDIR — מאגר השאילתות (BEx Queries). כל שאילתה רצה מעל InfoProvider ומוצגת בכלי קצה." }),
  B("RSZCOMPDIR", "רכיבי שאילתה", "Query Components Directory", "BW on HANA", "Reporting",
    ["COMPUID", "OBJVERS"], [F("COMPUID", "Component UID", "PK"), F("COMPID", "Component", "-"), F("DEFTP", "Type (REP/STR/VAR)", "-")],
    [{ role: "child", table: "RSRREPDIR", card: "N:1", desc: "מבנים, משתנים ורכיבים לשימוש חוזר" }, { role: "parent", table: "RSZELTDIR", card: "1:N", desc: "אלמנטים" }],
    { tcodes: "RSRT, RSZC", s4: "זהה.", guideHe: "RSZCOMPDIR — רכיבי שאילתה לשימוש חוזר (Restricted/Calculated Key Figures, Structures, Variables)." }),
  B("RSZELTDIR", "אלמנטי שאילתה", "Query Elements Directory", "BW on HANA", "Reporting",
    ["ELTUID", "OBJVERS"], [F("ELTUID", "Element UID", "PK"), F("DEFTP", "Element type", "-")],
    [{ role: "child", table: "RSZCOMPDIR", card: "N:1", desc: "אלמנטים בתוך רכיבים" }, { role: "parent", table: "RSZELTXREF", card: "1:N", desc: "הפניות בין אלמנטים" }],
    { tcodes: "RSRT, RSRV", s4: "זהה.", guideHe: "RSZELTDIR — אלמנטי השאילתה (שורות/עמודות/בחירות). RSRV בודק עקביות מול הפניות." }),
  B("RSZELTXREF", "הפניות אלמנטים", "Query Element Cross-Reference", "BW on HANA", "Reporting",
    ["SELTUID", "TELTUID"], [F("SELTUID", "Source element", "PK"), F("TELTUID", "Target element", "PK")],
    [{ role: "child", table: "RSZELTDIR", card: "N:1", desc: "גרף ההפניות בין אלמנטי שאילתה" }],
    { tcodes: "RSRV", s4: "זהה.", guideHe: "RSZELTXREF — מיפוי ההפניות בין אלמנטי שאילתה; חוסר עקביות כאן גורם לשגיאות שאילתה (תוקן ב-RSRV)." }),
  B("BEx_Query", "שאילתת BEx", "BEx Query", "ECC BW", "Reporting",
    ["COMPID"], [F("COMPID", "Query", "PK"), F("INFOPROV", "InfoProvider", "FK")],
    [{ role: "child", table: "RSRREPDIR", card: "1:1", desc: "הגדרת השאילתה" }],
    { tcodes: "RSRT, BEx Query Designer", s4: "BEx פחות מרכזי — SAP דוחפת ל-Analysis for Office ו-SAC; BEx Web Analyzer מוצא משימוש.", s4alt: "Analysis for Office / SAC", guideHe: "BEx Query — השאילתה כפי שנצרכת ב-BEx. כלי ה-BEx הקלאסיים (Web Analyzer) פחות נתמכים מול AFO/SAC." }),

  /* ───────── Consumption (SAC / AFO / Embedded) ───────── */
  B("SAC_Story", "סיפור SAC (Dashboard)", "SAC Story / Dashboard", "SAC", "Consumption",
    ["storyId"], [F("storyId", "Story ID", "PK"), F("model", "SAC model", "FK"), F("connection", "Live/Import connection", "-")],
    [{ role: "child", table: "RSRREPDIR", card: "N:1", desc: "צורך שאילתת BW (Live) או CDS" }, { role: "child", table: "CDS_AnalyticalView", card: "N:1", desc: "צורך Embedded Analytics" }],
    { tcodes: "SAC (cloud)", s4: "SAP Analytics Cloud — שכבת הדשבורד/תכנון המודרנית; Live ל-BW/4HANA או S/4 Embedded.", s4alt: "SAP Analytics Cloud", guideHe: "SAC Story — דשבורד/דוח ב-SAP Analytics Cloud. מתחבר Live לשאילתת BW או ל-CDS של S/4. אי-התאמת נתונים כאן = בעיית חיבור/הרשאה." }),
  B("AnalysisForOffice", "Analysis for Office", "Analysis for Office (AFO)", "BW on HANA", "Consumption",
    ["workbook"], [F("workbook", "Workbook", "PK"), F("query", "BW Query", "FK")],
    [{ role: "child", table: "RSRREPDIR", card: "N:1", desc: "מציג שאילתת BW ב-Excel" }],
    { tcodes: "AFO (Excel add-in)", s4: "כלי הקצה המוביל לדיווח BW מבוסס-שאילתה (מחליף BEx Analyzer).", s4alt: "—", guideHe: "Analysis for Office — תוסף Excel להרצת שאילתות BW אינטראקטיביות; כלי הקצה הנפוץ ביותר לאנליסטים." }),

  /* ───────── Authorization ───────── */
  B("RSECVAL", "הרשאות אנליזה", "Analysis Authorization Values", "BW on HANA", "Authorization",
    ["AUTH", "IOBJNM"], [F("AUTH", "Authorization", "PK"), F("IOBJNM", "InfoObject", "PK"), F("VALUE", "Allowed value", "-")],
    [{ role: "child", table: "RSDIOBJ", card: "N:1", desc: "מגביל ערכי Characteristic לדיווח" }],
    { tcodes: "RSECADMIN, RSU01", s4: "Analysis Authorizations (מחליף את הרשאות הדיווח הישנות מבוססות RSR).", s4alt: "RSECADMIN", guideHe: "RSECVAL — ערכי הרשאת אנליזה (לפי InfoObject); קובע אילו נתונים משתמש רשאי לראות בדיווח. כשל = 'No authorization' בשאילתה." }),
];

/* business-object groups (Object Explorer cubes) */
export const BW_OBJECTS: { he: string; en: string; tables: string[] }[] = [
  { he: "מקורות נתונים", en: "Source Systems & Extraction", tables: ["ROOSOURCE", "ROOSFIELD", "RSDS", "ODP_Queue"] },
  { he: "Embedded Analytics", en: "CDS Analytical Views", tables: ["CDS_AnalyticalView", "SAC_Story"] },
  { he: "InfoObjects", en: "InfoObjects (Char/KeyFig)", tables: ["RSDIOBJ", "RSDIOBJT", "SID_Table"] },
  { he: "InfoProviders", en: "InfoProviders (Storage)", tables: ["ADSO", "CompositeProvider", "OpenODSView", "RSDCUBE", "RSDODSO"] },
  { he: "טרנספורמציה וטעינה", en: "Transformation & DTP", tables: ["RSTRAN", "RSBKDTP", "RSDS"] },
  { he: "Process Chains", en: "Orchestration", tables: ["RSPCCHAIN", "RSPCLOGCHAIN", "RSBKDTP"] },
  { he: "שכבת דיווח", en: "Reporting Layer", tables: ["RSRREPDIR", "RSZCOMPDIR", "RSZELTDIR", "RSZELTXREF", "BEx_Query"] },
  { he: "צריכת נתונים", en: "Analytics Consumers", tables: ["SAC_Story", "AnalysisForOffice", "CDS_AnalyticalView"] },
  { he: "הרשאות", en: "Analysis Authorizations", tables: ["RSECVAL"] },
];

/* full BW data flow (Source → Dashboard) */
export const BW_FLOW: { he: string; en: string; tables: string[] }[] = [
  { he: "מערכת מקור", en: "Source System", tables: ["ROOSOURCE"] },
  { he: "Extractor / CDS / ODP", en: "Extraction", tables: ["ROOSOURCE", "CDS_AnalyticalView", "ODP_Queue"] },
  { he: "DataSource", en: "DataSource", tables: ["RSDS"] },
  { he: "טרנספורמציה", en: "Transformation", tables: ["RSTRAN"] },
  { he: "DTP", en: "Data Transfer", tables: ["RSBKDTP"] },
  { he: "ADSO", en: "Storage (ADSO)", tables: ["ADSO"] },
  { he: "CompositeProvider", en: "Virtual Layer", tables: ["CompositeProvider"] },
  { he: "שאילתה", en: "Query", tables: ["RSRREPDIR", "BEx_Query"] },
  { he: "דשבורד / SAC / AFO", en: "Consumption", tables: ["SAC_Story", "AnalysisForOffice"] },
  { he: "הרשאות", en: "Authorization", tables: ["RSECVAL"] },
  { he: "ניטור", en: "Monitoring", tables: ["RSPCLOGCHAIN", "ODP_Queue"] },
];

export const BW_LANDSCAPE_META: Record<BWLand, { he: string; c: string }> = {
  "ECC BW": { he: "BW קלאסי", c: "#64748b" },
  "BW on HANA": { he: "BW on HANA", c: "#d97706" },
  "BW/4HANA": { he: "BW/4HANA", c: "#4f46e5" },
  "S/4 Embedded": { he: "S/4 Embedded", c: "#2563eb" },
  "Datasphere": { he: "Datasphere", c: "#7c3aed" },
  "SAC": { he: "SAC", c: "#0d9488" },
};

export const BW_ACCENT = "#4f46e5"; // indigo — analytics
export const BW_META = {
  tables: BW_TABLES.length,
  relations: BW_TABLES.reduce((n, t) => n + t.rel.length, 0),
  objects: BW_OBJECTS.length,
  flow: BW_FLOW.length,
};
