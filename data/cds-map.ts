// Curated classic-table → S/4HANA CDS view mapping (authored SAP reference, like
// the academy/library content). Each view is a real released S/4 CDS view; `tables`
// are the classic ECC tables it virtualizes. Not auto-generated — hand-verified.

export interface CdsView {
  view: string;        // released CDS view name
  he: string;          // Hebrew purpose
  module: "PM" | "PP-PI";
  tables: string[];    // classic tables it replaces / reads
}

export const CDS_VIEWS: CdsView[] = [
  // ---- Master data ----
  { view: "I_Product", he: "נתוני אב חומר (כללי)", module: "PP-PI", tables: ["MARA"] },
  { view: "I_ProductPlant", he: "נתוני אב חומר ברמת מפעל", module: "PP-PI", tables: ["MARC"] },
  { view: "I_BillOfMaterial", he: "עץ מוצר — כותרת", module: "PP-PI", tables: ["MAST", "STKO"] },
  { view: "I_BillOfMaterialItem", he: "עץ מוצר — פריטים", module: "PP-PI", tables: ["STPO"] },
  // ---- Routing / recipe / resources ----
  { view: "I_Routing", he: "מסלול ייצור / מתכון — כותרת", module: "PP-PI", tables: ["PLKO"] },
  { view: "I_RoutingOperation", he: "פעולות מסלול / מתכון", module: "PP-PI", tables: ["PLPO"] },
  { view: "I_WorkCenter", he: "מרכז עבודה / משאב", module: "PP-PI", tables: ["CRHD", "CRTX", "CRCA", "KAKO"] },
  // ---- Production / process orders ----
  { view: "I_ProductionOrder", he: "פקודת ייצור — כותרת", module: "PP-PI", tables: ["AFKO", "AUFK"] },
  { view: "I_ProductionOrderItem", he: "פקודת ייצור — פריט", module: "PP-PI", tables: ["AFPO"] },
  { view: "I_ProductionOrderOperation", he: "פקודת ייצור — פעולות", module: "PP-PI", tables: ["AFVC", "AFFL"] },
  { view: "I_ProductionOrderComponent", he: "רכיבי פקודת ייצור (הזמנות מלאי)", module: "PP-PI", tables: ["RESB"] },
  // ---- Plant Maintenance ----
  { view: "I_Equipment", he: "ציוד (Equipment)", module: "PM", tables: ["EQUI", "EQKT"] },
  { view: "I_FunctionalLocation", he: "מיקום פונקציונלי", module: "PM", tables: ["IFLOT", "ILOA"] },
  { view: "I_MaintenanceOrder", he: "פקודת אחזקה", module: "PM", tables: ["AUFK", "AFKO"] },
  { view: "I_MaintenanceNotification", he: "הודעת אחזקה", module: "PM", tables: ["QMEL"] },
  { view: "I_MaintNotificationItem", he: "פריט הודעת אחזקה", module: "PM", tables: ["QMFE"] },
];

// reverse index: classic table → CDS views that read it
const BY_TABLE = new Map<string, CdsView[]>();
for (const v of CDS_VIEWS) for (const t of v.tables) { const a = BY_TABLE.get(t) || []; a.push(v); BY_TABLE.set(t, a); }

export const cdsForTable = (table: string): CdsView[] => BY_TABLE.get(table) || [];
export const cdsByView = (view: string): CdsView | undefined => CDS_VIEWS.find((v) => v.view.toLowerCase() === view.toLowerCase());
export const listCdsViews = (): string[] => CDS_VIEWS.map((v) => v.view);
