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
  // F1511 · 2026-09-24: name, catalog, role and OData from the SAP Fiori Apps Reference Library
  // (scripts/fal-app.mjs F1511, S32OP), as in data/fiori/apps.ts#F1511. The curated name
  // "Create Maintenance Request" belongs to F1511A.
  mk("create-maintenance-request", "PM", "פתיחת בקשת אחזקה", "Request Maintenance", "IW21", "F1511", "SAP_EAM_BC_MREQ", "SAP_BR_EMPLOYEE_MAINTENANCE", "EAM_NTF_CREATE", "C_MaintNotificationListReport", "Self-service tile לעובד (SAP_BR_EMPLOYEE_MAINTENANCE); דורש את הקטלוג SAP_EAM_BC_MREQ לפי ספריית ה-Fiori.", "x"),
  mk("confirm-jobs", "PM", "אישור עבודות אחזקה", "Confirm Jobs", "IW41 / IW42", "F2730", "SAP_EAM_BC_MAINT_WORKER", "SAP_BR_MAINTENANCE_TECHNICIAN", "API_MAINTENANCEORDERCONF", "—", "Tile לטכנאי; תומך מובייל לאישור בשטח.", "x"),
  mk("manage-technical-objects", "PM", "ניהול אובייקטים טכניים", "Manage Technical Objects", "IE01 / IL01 / IH08", "F2730A", "SAP_EAM_BC_TECH_OBJ", "SAP_BR_MAINTENANCE_PLANNER", "API_FUNCTIONALLOCATION / API_EQUIPMENT", "I_Equipment / I_FunctionalLocation", "Catalog לאובייקטים טכניים; כולל list+detail.", "x"),
  // corrected 2026-09-22: F4072 is Screen Maintenance Requests (official), not a scheduling app
  mk("screen-maintenance-requests", "PM", "סינון וקבלת בקשות תחזוקה", "Screen Maintenance Requests", "IW21 / IW22 / IW23 / IW28 / IW29", "F4072", "SAP_EAM_BC_MREQ_DSP", "SAP_BR_MAINT_SUPERVISOR", "UI_MAINTWORKREQUESTOVW_V2", "—", "סינון וקבלה של בקשות תחזוקה לפי Maintenance Management 2025 FPS01; תזמון תכניות תחזוקה מתועד תחת F2774 / F5325 (לשתיהן רשומות אימות בפרויקט). תפקיד, קטלוג, OData וטרנזקציות GUI מספריית ה-Fiori (scripts/fal-app.mjs F4072, S32OP).", ""),
  // F0247A · 2026-09-24: the entry named F0247, which is in neither the 2023 nor the 2025 Fiori Apps
  // Library; values as in data/fiori/apps.ts#F0247A (scripts/fal-app.mjs F0247A, S32OP). The CDS view
  // is left unverified there, and the library relates the GUI transactions without "replacing" them.
  mk("monitor-material-coverage", "PP", "ניטור כיסוי חומר (MRP)", "Monitor Material Coverage - Net Segments", "MD04 / MD06 / MD07", "F0247A", "SAP_SCM_BC_MRPCOCKPIT", "SAP_BR_MATL_PLNR_EXT_PROC, SAP_BR_PRODN_PLNR", "PP_MRP_AOR_SRV, PP_MRP_MATERIAL_COVERAGE_SRV", "טרם אומת", "יישום MRP Cockpit לניטור כיסוי חומרים לפי מקטעי נטו; טרנזקציות GUI קשורות לפי ספריית ה-Fiori: MB53 (מובילה), MD04, MD06, MD07, MS06, MS07.", "x"),
  // F2336 · 2026-09-24: GUI transactions, catalog, role and OData from the SAP Fiori Apps Reference
  // Library (scripts/fal-app.mjs F2336, S32OP), as in data/fiori/apps.ts#F2336; the library does not list CO01.
  mk("manage-production-orders", "PP", "ניהול הזמנות ייצור", "Manage Production Orders", "CO02 / COOIS", "F2336", "SAP_SCM_BC_PRODN_ORD_MNTR", "SAP_BR_PRODN_SUPERVISOR_DISC", "PP_MPE_ORDER_MANAGE", "I_ProductionOrder", "Catalog SAP_SCM_BC_PRODN_ORD_MNTR לפי ספריית ה-Fiori.", "x"),
  mk("manage-process-orders", "PP-PI", "ניהול הזמנות תהליך", "Manage Process Orders", "COR1 / COR2 / COID", "F3577", "SAP_PP_BC_PROCESS_ORDER", "SAP_BR_PRODN_OPERATOR_PROC", "API_PROCESS_ORDER_2_SRV", "I_ManufacturingOrder", "Catalog לפקודות תהליך; שילוב PP-DS/aATP.", "x"),
  mk("confirm-process-order", "PP-PI", "אישור הזמנת תהליך", "Confirm Process Order", "COR6N", "F3364", "SAP_PP_BC_PROCESS_ORDER", "SAP_BR_PRODN_OPERATOR_PROC", "API_PROC_ORDER_CONFIRMATION_2_SRV", "—", "אישור שלבים + Backflush + GR מה-Launchpad.", "x"),
  mk("manage-batches", "PP-PI", "ניהול אצוות", "Manage Batches", "MSC1N / MSC2N / MSC3N", "F1576", "SAP_LO_BC_BATCH", "SAP_BR_WAREHOUSE_CLERK", "API_BATCH", "I_Batch", "Catalog לאצוות + Batch Information Cockpit.", "x"),
  mk("post-goods-movement", "PP", "תנועות סחורה", "Post Goods Movement", "MIGO / MB31", "F0843", "SAP_MM_BC_GOODS_MVT", "SAP_BR_WAREHOUSE_CLERK", "API_MATERIAL_DOCUMENT_SRV", "I_MaterialDocumentItem", "מחליף MIGO; תנועות נרשמות ל-MATDOC.", "x"),
  // F1813 · 2026-09-24: the entry named F1814, which the SAP Fiori Apps Reference Library lists as
  // "Sales Order (S/4HANA)"; the BOM app for CS01 (leading) and CS02/CS03 (related) is F1813 "Maintain
  // Bill Of Material" (scripts/fal-app.mjs F1813, S32OP). Slug kept so the route keeps working.
  mk("manage-bom", "PP", "ניהול עצי מוצר", "Maintain Bill Of Material", "CS01 / CS02 / CS03", "F1813", "SAP_PLM_BC_BOM", "SAP_BR_BOM_ENGINEER", "BILLOFMATERIALV2_SRV", "I_BillOfMaterial", "Catalog SAP_PLM_BC_BOM לפי ספריית ה-Fiori.", "x"),
];
