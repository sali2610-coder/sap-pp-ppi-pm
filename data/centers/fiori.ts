import type { CenterItem } from "@/components/topic-center";

const A = "#7c3aed";
const mk = (slug: string, module: string, he: string, app: string, gui: string, appId: string, catalog: string, role: string, odata: string, cds: string, setup: string, ecc: string): CenterItem => ({
  slug, module, eyebrow: `Fiori Center · ${module}`, he, title: app, sub: `${gui} → ${app} (${appId})`, accent: A, tag: module,
  sections: [
    { title: "טרנזקציית SAP GUI", type: "linkchips", tone: "#0891b2", items: gui.split("/").map((s) => s.trim()) },
    { title: "אפליקציית Fiori", type: "text", tone: A, text: `${app} · App ID: ${appId}` },
    { title: "Business Catalog", type: "text", tone: A, text: catalog },
    { title: "Business Role", type: "text", tone: A, text: role },
    { title: "OData Service", type: "text", tone: "#0d9488", text: odata },
    { title: "CDS Source", type: "text", tone: "#16a34a", text: cds },
    { title: "Launchpad Setup", type: "text", tone: "#475569", text: setup },
    { title: "QA Validation", type: "bullets", tone: "#be185d", items: [`Positive: השק את ${app} מה-Launchpad ובצע פעולה`, `Regression: השווה תוצאה מול ${gui} ב-GUI`, "Validation: הרשאה דרך Business Role + Catalog"] },
  ],
  eccS4: { unchanged: `התהליך העסקי של ${gui} נשמר.`, changed: `UX עובר ל-${app}; GUI עדיין זמין.`, fiori: `${app} (${appId})`, cds: cds, migration: `QA: ${app} מחליף את ${gui}; ודא Catalog/Role ב-PFCG.` },
});

export const FIORI_APPS: CenterItem[] = [
  mk("manage-maintenance-orders", "PM", "ניהול הזמנות אחזקה", "Manage Maintenance Orders", "IW31 / IW32 / IW38", "F2731", "SAP_EAM_BC_MAINT_PLANNER", "SAP_BR_MAINTENANCE_PLANNER", "API_MAINTENANCEORDER", "C_MaintOrderListReport", "הוסף Catalog SAP_EAM_BC_MAINT_PLANNER ל-Group; הקצה Role למשתמש.", "x"),
  mk("create-maintenance-request", "PM", "פתיחת בקשת אחזקה", "Create Maintenance Request", "IW21", "F1511", "SAP_EAM_BC_MAINT_WORKER", "SAP_BR_MAINTENANCE_TECHNICIAN", "API_MAINTENANCENOTIFICATION", "C_MaintNotificationListReport", "Self-service tile לטכנאי/מפעיל; דורש Catalog לעובד אחזקה.", "x"),
  mk("confirm-jobs", "PM", "אישור עבודות אחזקה", "Confirm Jobs", "IW41 / IW42", "F2730", "SAP_EAM_BC_MAINT_WORKER", "SAP_BR_MAINTENANCE_TECHNICIAN", "API_MAINTENANCEORDERCONF", "—", "Tile לטכנאי; תומך מובייל לאישור בשטח.", "x"),
  mk("manage-technical-objects", "PM", "ניהול אובייקטים טכניים", "Manage Technical Objects", "IE01 / IL01 / IH08", "F2730A", "SAP_EAM_BC_TECH_OBJ", "SAP_BR_MAINTENANCE_PLANNER", "API_FUNCTIONALLOCATION / API_EQUIPMENT", "I_Equipment / I_FunctionalLocation", "Catalog לאובייקטים טכניים; כולל list+detail.", "x"),
  mk("schedule-maintenance-plans", "PM", "תזמון תכניות אחזקה", "Schedule Maintenance Plans", "IP10 / IP30", "F4072", "SAP_EAM_BC_MAINT_PLANNER", "SAP_BR_MAINTENANCE_PLANNER", "API_MAINTENANCEPLAN", "—", "מחליף Job IP30 בלוח תזמון אינטראקטיבי.", "x"),
  mk("monitor-material-coverage", "PP", "ניטור כיסוי חומר (MRP)", "Monitor Material Coverage", "MD04 / MD01N", "F0247", "SAP_MM_BC_MATL_PLANNER", "SAP_BR_PRODN_PLNR_DISC", "API_MATERIAL_STOCK / PP planning", "C_MRPMaterials / stock-requirements CDS", "מחליף MD04; כולל Net Segments + פתרון בעיות.", "x"),
  mk("manage-production-orders", "PP", "ניהול הזמנות ייצור", "Manage Production Orders", "CO01 / CO02 / COOIS", "F2336", "SAP_PP_BC_PRODN_ORDER", "SAP_BR_PRODN_OPERATOR_DISC", "API_PRODUCTION_ORDER_2", "I_ProductionOrder", "Catalog לפקודות ייצור בדיד.", "x"),
  mk("manage-process-orders", "PP-PI", "ניהול הזמנות תהליך", "Manage Process Orders", "COR1 / COR2 / COID", "F3577", "SAP_PP_BC_PROCESS_ORDER", "SAP_BR_PRODN_OPERATOR_PROC", "API_PROCESSORDER_2", "I_ManufacturingOrder", "Catalog לפקודות תהליך; שילוב PP-DS/aATP.", "x"),
  mk("confirm-process-order", "PP-PI", "אישור הזמנת תהליך", "Confirm Process Order", "COR6N", "F3364", "SAP_PP_BC_PROCESS_ORDER", "SAP_BR_PRODN_OPERATOR_PROC", "API_PROCORDCONF", "—", "אישור שלבים + Backflush + GR מה-Launchpad.", "x"),
  mk("manage-batches", "PP-PI", "ניהול אצוות", "Manage Batches", "MSC1N / MSC2N / MSC3N", "F1576", "SAP_LO_BC_BATCH", "SAP_BR_WAREHOUSE_CLERK", "API_BATCH", "I_Batch", "Catalog לאצוות + Batch Information Cockpit.", "x"),
  mk("post-goods-movement", "PP", "תנועות סחורה", "Post Goods Movement", "MIGO / MB31", "F0843", "SAP_MM_BC_GOODS_MVT", "SAP_BR_WAREHOUSE_CLERK", "API_MATERIAL_DOCUMENT_SRV", "I_MaterialDocumentItem", "מחליף MIGO; תנועות נרשמות ל-MATDOC.", "x"),
  mk("manage-bom", "PP", "ניהול עצי מוצר", "Manage Bills of Material", "CS01 / CS02 / CS03", "F1814", "SAP_PP_BC_BOM", "SAP_BR_BOM_ENGINEER", "API_BILLOFMATERIAL", "I_BillOfMaterial", "Catalog ל-BOM; כולל where-used.", "x"),
];
