// Curated classic-table → S/4HANA CDS view mapping (authored SAP reference, like
// the academy/library content). Each view is a real released S/4 CDS view; `tables`
// are the classic ECC tables it virtualizes. Not auto-generated — hand-verified.

export interface CdsView {
  view: string;        // released CDS view name
  he: string;          // Hebrew purpose
  module: "PM" | "PP-PI";
  tables: string[];    // classic tables it replaces / reads
  consumption?: string; // C_ consumption / analytical view on top (where applicable)
  fiori?: string;       // Fiori app that consumes the chain
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

  // ===== P1 expansion — full Table → CDS → Consumption → Fiori chain =====
  // material master views
  { view: "I_ProductDescription", he: "תיאורי חומר", module: "PP-PI", tables: ["MAKT"], consumption: "C_ProductMaster", fiori: "Manage Product Master Data" },
  { view: "I_ProductUnitOfMeasure", he: "יחידות מידה לחומר", module: "PP-PI", tables: ["MARM"], fiori: "Manage Product Master Data" },
  { view: "I_ProductValuation", he: "הערכת שווי חומר", module: "PP-PI", tables: ["MBEW"], consumption: "C_ProductValuation", fiori: "Manage Material Valuations" },
  { view: "I_ProductSalesData", he: "נתוני מכירה לחומר", module: "PP-PI", tables: ["MVKE"], fiori: "Manage Product Master Data" },
  { view: "I_ProductPlantIntlTrd", he: "נתוני מס/סחר לחומר", module: "PP-PI", tables: ["MLAN"] },
  { view: "I_MRPMaterial", he: "נתוני MRP לחומר/אזור", module: "PP-PI", tables: ["MARC", "MDMA"], consumption: "C_MaterialCoverageNetwork", fiori: "Monitor Material Coverage" },
  // stock / material documents (NSDM)
  { view: "I_MaterialStock", he: "מלאי חומר (NSDM)", module: "PP-PI", tables: ["MARD", "MCHB"], consumption: "C_MaterialStock", fiori: "Manage Stock" },
  { view: "I_MaterialDocumentItem", he: "פריטי מסמך חומר", module: "PP-PI", tables: ["MSEG", "MKPF", "MATDOC"], consumption: "C_MaterialDocumentItem", fiori: "Material Documents Overview" },
  // batch
  { view: "I_Batch", he: "אצווה", module: "PP-PI", tables: ["MCH1", "MCHA"], consumption: "C_BatchMaster", fiori: "Manage Batches" },
  // production version / BOM assignment / recipe selection
  { view: "I_ProductionVersion", he: "גרסת ייצור", module: "PP-PI", tables: ["MKAL"], fiori: "Manage Production Versions" },
  { view: "I_BillOfMaterialItemAssgmt", he: "שיוך רשימת פעולות לחומר", module: "PP-PI", tables: ["MAPL"] },
  { view: "I_RoutingOperationComponent", he: "הקצאת רכיבים לפעולה", module: "PP-PI", tables: ["PLMZ", "PLAS"] },
  // capacity / costing on work center
  { view: "I_WorkCenterCapacity", he: "קיבולת מרכז עבודה", module: "PP-PI", tables: ["KAKO", "KAZT", "CRCA"], consumption: "C_WorkCenterCapacity", fiori: "Monitor Capacity Utilization" },
  { view: "I_WorkCenterCostCenter", he: "מרכז עלות למרכז עבודה", module: "PP-PI", tables: ["CRCO", "CSLA"] },
  // order execution
  { view: "I_ProductionOrderConfirmation", he: "אישור פקודת ייצור", module: "PP-PI", tables: ["AFRU"], consumption: "C_ProductionOrderConf", fiori: "Confirm Production Operation" },
  { view: "I_MfgOrderComponent", he: "רכיבי פקודה / שמורות", module: "PP-PI", tables: ["RESB", "AFFH"] },
  { view: "I_ObjectStatus", he: "סטטוס אובייקט", module: "PP-PI", tables: ["JEST", "JSTO"] },
  // PM — measurement, plans, work center text, costs
  { view: "I_MeasuringPoint", he: "נקודת מדידה", module: "PM", tables: ["IMPTT"], fiori: "Manage Measuring Points" },
  { view: "I_MeasurementDocument", he: "מסמך מדידה", module: "PM", tables: ["IMRG"], consumption: "C_MeasurementDocument", fiori: "Manage Measurement Documents" },
  { view: "I_MaintenancePlan", he: "תוכנית אחזקה", module: "PM", tables: ["MPLA", "MPOS"], consumption: "C_MaintenancePlan", fiori: "Manage Maintenance Plans" },
  { view: "I_MaintNotifActivity", he: "פעולות/משימות בהודעה", module: "PM", tables: ["QMMA", "QMSM", "QMUR"] },
  { view: "I_WorkCenterText", he: "טקסט מרכז עבודה (PM)", module: "PM", tables: ["CRTX"] },
  { view: "I_EquipmentTimeSegment", he: "מקטע זמן ציוד", module: "PM", tables: ["EQUZ"] },
];

// reverse index: classic table → CDS views that read it
const BY_TABLE = new Map<string, CdsView[]>();
for (const v of CDS_VIEWS) for (const t of v.tables) { const a = BY_TABLE.get(t) || []; a.push(v); BY_TABLE.set(t, a); }

export const cdsForTable = (table: string): CdsView[] => BY_TABLE.get(table) || [];
export const cdsByView = (view: string): CdsView | undefined => CDS_VIEWS.find((v) => v.view.toLowerCase() === view.toLowerCase());
export const listCdsViews = (): string[] => CDS_VIEWS.map((v) => v.view);
