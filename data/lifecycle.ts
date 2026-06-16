// SAP Evolution Layer (Phase 5) — lifecycle intelligence per T-Code.
// status Active / Deprecated / Obsolete + ECC/S4 availability + Fiori replacement
// + recommended alternative + simplification impact + migration notes. Authored
// from SAP S/4HANA Simplification knowledge; uncertain items default to Active.

export type LcStatus = "Active" | "Deprecated" | "Obsolete";
export type LcImpact = "None" | "Low" | "Medium" | "High";

export interface Lifecycle {
  status: LcStatus;
  ecc: boolean;
  s4: boolean;
  fiori?: string;       // Fiori replacement app
  alt?: string;         // SAP recommended alternative T-Code/path
  simplification?: string;
  migration: string;
  impact: LcImpact;
}

const DEFAULT: Lifecycle = { status: "Active", ecc: true, s4: true, migration: "ללא שינוי מהותי; נתמך ב-S/4HANA (SAP GUI). שקול אפליקציית Fiori מקבילה.", impact: "None" };

export const LIFECYCLE: Record<string, Lifecycle> = {
  // ---- MM goods movements → MIGO (single-screen) ----
  "MB1A": { status: "Obsolete", ecc: true, s4: false, fiori: "Post Goods Movement (F0843)", alt: "MIGO", simplification: "MM-IM: single-screen transaction MIGO", migration: "הוסר ב-S/4HANA. החלף ב-MIGO/Fiori. בדוק BDC/ממשקים שמשתמשים ב-MB1A.", impact: "High" },
  "MB1B": { status: "Obsolete", ecc: true, s4: false, fiori: "Transfer Stock (F1061) / Post Goods Movement", alt: "MIGO", simplification: "MM-IM: single-screen MIGO", migration: "הוסר ב-S/4HANA. העברות מלאי דרך MIGO. השפעה גבוהה על batch-input/ממשקים.", impact: "High" },
  "MB1C": { status: "Obsolete", ecc: true, s4: false, fiori: "Post Goods Movement (F0843)", alt: "MIGO", simplification: "MM-IM: single-screen MIGO", migration: "הוסר ב-S/4HANA. קבלות אחרות דרך MIGO.", impact: "High" },
  "MB31": { status: "Obsolete", ecc: true, s4: false, fiori: "Post Goods Movement", alt: "MIGO (101)", simplification: "MM-IM", migration: "הוסר. GR מפקודה דרך MIGO/אישור עם auto-GR.", impact: "Medium" },
  "MB01": { status: "Obsolete", ecc: true, s4: false, alt: "MIGO", simplification: "MM-IM", migration: "הוסר ב-S/4HANA — GR להזמנת רכש דרך MIGO.", impact: "High" },
  "MB02": { status: "Obsolete", ecc: true, s4: false, alt: "MIGO", simplification: "MM-IM", migration: "הוסר — שינוי מסמך חומר דרך MIGO.", impact: "Medium" },
  "MB03": { status: "Obsolete", ecc: true, s4: false, fiori: "Display Material Documents (F1077)", alt: "MIGO / MB51", simplification: "MM-IM", migration: "הוסר — הצגת מסמך דרך MIGO/Fiori.", impact: "Low" },
  "MB11": { status: "Obsolete", ecc: true, s4: false, alt: "MIGO", simplification: "MM-IM", migration: "הוסר — תנועה דרך MIGO.", impact: "Medium" },
  "MBST": { status: "Obsolete", ecc: true, s4: false, alt: "MIGO (Cancellation)", simplification: "MM-IM", migration: "הוסר — ביטול מסמך דרך MIGO.", impact: "Medium" },
  "MMBE": { status: "Active", ecc: true, s4: true, fiori: "Stock - Single Material (F1076) / Stock Overview", alt: "MMBE / Fiori", migration: "נתמך; UX מומלץ Fiori 'Stock – Single Material'.", impact: "Low" },
  "MB51": { status: "Active", ecc: true, s4: true, fiori: "Material Documents Overview (F1077)", migration: "נתמך; נתונים מ-MATDOC. דוחות Z על MKPF/MSEG → CDS.", impact: "Low" },
  "MB52": { status: "Active", ecc: true, s4: true, fiori: "Stock - Multiple Materials", migration: "נתמך; Fiori מקביל.", impact: "Low" },
  "MIGO": { status: "Active", ecc: true, s4: true, fiori: "Post Goods Movement (F0843)", migration: "מרכזי ב-S/4; תנועות נרשמות ל-MATDOC. החלופה ל-MB*.", impact: "None" },
  // ---- Purchasing ----
  "ME21": { status: "Obsolete", ecc: true, s4: false, alt: "ME21N", migration: "הוסר — השתמש ב-ME21N (Enjoy).", impact: "Medium" },
  "ME22": { status: "Obsolete", ecc: true, s4: false, alt: "ME22N", migration: "הוסר — ME22N.", impact: "Medium" },
  "ME23": { status: "Obsolete", ecc: true, s4: false, alt: "ME23N", migration: "הוסר — ME23N.", impact: "Low" },
  "ME21N": { status: "Active", ecc: true, s4: true, fiori: "Create Purchase Order (F0842A)", migration: "נתמך; Fiori מקביל.", impact: "None" },
  // ---- Customer/Vendor → Business Partner ----
  "XD01": { status: "Obsolete", ecc: true, s4: false, fiori: "Manage Business Partner", alt: "BP", simplification: "Business Partner Approach (CVI mandatory)", migration: "לקוח/ספק דרך BP בלבד. XD01 חסום/מנותב ל-BP. השפעה גבוהה — CVI חובה.", impact: "High" },
  "XK01": { status: "Obsolete", ecc: true, s4: false, fiori: "Manage Business Partner", alt: "BP", simplification: "Business Partner Approach", migration: "ספק דרך BP בלבד. CVI חובה.", impact: "High" },
  "FK01": { status: "Obsolete", ecc: true, s4: false, alt: "BP", simplification: "Business Partner Approach", migration: "הוסר — BP.", impact: "High" },
  "FD01": { status: "Obsolete", ecc: true, s4: false, alt: "BP", simplification: "Business Partner Approach", migration: "הוסר — BP.", impact: "High" },
  "BP": { status: "Active", ecc: true, s4: true, fiori: "Manage Business Partner Master Data", migration: "נקודת הכניסה היחידה ללקוח/ספק ב-S/4HANA.", impact: "None" },
  // ---- PP MRP ----
  "MD01": { status: "Deprecated", ecc: true, s4: true, fiori: "—", alt: "MD01N (MRP Live)", simplification: "MRP in S/4HANA (MRP Live)", migration: "קיים אך לא אסטרטגי; MRP Live (MD01N) מועדף. חלק מהפרמטרים/Exits לא נתמכים ב-Live.", impact: "Medium" },
  "MD01N": { status: "Active", ecc: false, s4: true, fiori: "Monitor Material Coverage (F0247)", simplification: "MRP Live", migration: "MRP Live על HANA — הסטנדרט ב-S/4.", impact: "None" },
  "MD04": { status: "Active", ecc: true, s4: true, fiori: "Monitor Material Coverage – Net Segments", migration: "נתמך; נתונים בזמן אמת. Fiori מקביל.", impact: "Low" },
  "MD05": { status: "Deprecated", ecc: true, s4: true, alt: "MD04 (real-time)", simplification: "MRP Live", migration: "MRP List פחות מרכזי; MD04 בזמן אמת מועדף.", impact: "Low" },
  // ---- Capacity leveling ----
  "CM21": { status: "Deprecated", ecc: true, s4: true, fiori: "Capacity Scheduling Board (PP-DS)", alt: "PP-DS Planning Board", simplification: "Capacity planning — PP-DS", migration: "כלי leveling קלאסי; ב-S/4 העדף PP-DS Planning Board.", impact: "Medium" },
  // ---- PM (mostly active, Fiori UX) ----
  "IW31": { status: "Active", ecc: true, s4: true, fiori: "Create Maintenance Order (F2731)", migration: "נתמך; UX מומלץ Fiori EAM.", impact: "Low" },
  "IW21": { status: "Active", ecc: true, s4: true, fiori: "Create Maintenance Request (F1511)", migration: "נתמך; Fiori מקביל.", impact: "Low" },
  // ---- CO settlement / costing (active, ACDOCA) ----
  "KO88": { status: "Active", ecc: true, s4: true, fiori: "Run Settlement", simplification: "Universal Journal (ACDOCA)", migration: "נתמך; עלויות זורמות ל-ACDOCA.", impact: "Low" },
  "CK11N": { status: "Active", ecc: true, s4: true, fiori: "Manage Material Cost Estimates", simplification: "Material Ledger mandatory", migration: "נתמך; Material Ledger חובה ב-S/4.", impact: "Low" },
  // ---- SD Foreign Trade ----
  "ENPR": { status: "Obsolete", ecc: true, s4: false, alt: "SAP GTS", simplification: "Foreign Trade removed", migration: "סחר חוץ הוסר מ-S/4 Core → SAP GTS.", impact: "High" },
  // ---- WM classic ----
  "LT03": { status: "Deprecated", ecc: true, s4: true, alt: "EWM (embedded)", simplification: "LE-WM not strategic; EWM target", migration: "WM קלאסי ב-Compatibility; הכיוון Embedded EWM.", impact: "High" },
  // ---- Output (NAST) ----
  "NACE": { status: "Deprecated", ecc: true, s4: true, alt: "Output Management (BRF+)", simplification: "Output Management (BRF+/Adobe)", migration: "NAST קיים לחלק מהאובייקטים; OM החדש מבוסס BRF+.", impact: "Medium" },
  // ---- Process order / batch (active) ----
  "COR1": { status: "Active", ecc: true, s4: true, fiori: "Create Process Order", migration: "נתמך; OData API_PROCESSORDER_2 + Fiori.", impact: "None" },
  "MSC1N": { status: "Active", ecc: true, s4: true, fiori: "Manage Batches", migration: "נתמך; BIC משופר ב-Fiori.", impact: "None" },
};

export const lifecycle = (code: string): Lifecycle => LIFECYCLE[code.toUpperCase()] || DEFAULT;
export const LC_COLOR: Record<LcStatus, string> = { Active: "#16a34a", Deprecated: "#d97706", Obsolete: "#dc2626" };
export const LC_HE: Record<LcStatus, string> = { Active: "פעיל", Deprecated: "לא-אסטרטגי", Obsolete: "הוסר ב-S/4" };
export const IMPACT_HE: Record<LcImpact, string> = { None: "אין", Low: "נמוכה", Medium: "בינונית", High: "גבוהה" };
