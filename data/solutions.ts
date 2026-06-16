// SAP Solution Finder (Phase 6) — search by BUSINESS REQUIREMENT, not T-Code.
// Each solution maps a need → standard SAP solution + ECC tcode + S/4 alt + Fiori
// + tables + CDS + APIs + BAPIs + exits + incidents + implementation complexity.
// Cross-links reference real entities in the platform. Hand-authored.

export type Complexity = "Low" | "Medium" | "High";
export interface Solution {
  slug: string;
  domain: string;
  he: string;
  title: string;
  keywords: string[];
  process: string;
  eccTcodes: string[];
  s4Alt: string;
  fiori: string[];
  tables: string[];
  cds: string[];
  apis: string[];
  bapis: string[];
  exits: string[];
  incidents: string[];   // incident slugs (troubleshooting.ts)
  complexity: Complexity;
}

export const SOLUTIONS: Solution[] = [
  { slug: "stock-overview", domain: "MM", he: "צפייה במלאי", title: "Stock Overview & Availability", keywords: ["stock", "inventory", "מלאי", "availability", "מצאי", "on hand"],
    process: "צפייה במלאי זמין/חסום/בדרך לפי חומר/מפעל/מחסן/אצווה — בסיס לזמינות, תכנון ומכירה.",
    eccTcodes: ["MMBE", "MB52", "MB5B", "CO09"], s4Alt: "MMBE נתמך; Fiori 'Stock – Single/Multiple Materials'.",
    fiori: ["Stock - Single Material (F1076)", "Stock - Multiple Materials"], tables: ["MARD", "MCHB", "MATDOC", "MARC"], cds: ["I_MaterialStock"], apis: ["API_MATERIAL_STOCK_SRV"], bapis: ["BAPI_MATERIAL_STOCK_REQ_LIST"], exits: [], incidents: ["goods-movement-stock"], complexity: "Low" },
  { slug: "goods-movement", domain: "MM", he: "תנועות מלאי", title: "Goods Movements (GR/GI/Transfer)", keywords: ["stock", "movement", "goods", "תנועה", "GR", "GI", "261", "101", "transfer"],
    process: "רישום תנועות מלאי — קבלה, ניפוק, העברה — שמעדכנות כמות, ערך ותכנון.",
    eccTcodes: ["MIGO", "MB1A", "MB1B", "MB31"], s4Alt: "MIGO מרכזי; MB* הוסרו. תנועות ל-MATDOC.",
    fiori: ["Post Goods Movement (F0843)", "Manage Material Documents"], tables: ["MATDOC", "MSEG", "MKPF", "RESB"], cds: ["I_MaterialDocumentItem"], apis: ["API_MATERIAL_DOCUMENT_SRV"], bapis: ["BAPI_GOODSMVT_CREATE", "BAPI_GOODSMVT_GETDETAIL"], exits: ["MBCF0002", "MB_MIGO_BADI"], incidents: ["goods-movement-stock", "duplicate-goods-receipt", "period-mm-not-open"], complexity: "Medium" },
  { slug: "batch-management", domain: "PP-PI", he: "ניהול אצוות ומעקב", title: "Batch Management & Traceability", keywords: ["batch", "אצווה", "traceability", "מעקב", "FEFO", "recall", "shelf life", "SLED"],
    process: "ניהול מנות ייצור עם מאפיינים ותוקף, קביעה אוטומטית (FEFO) ומעקב מלא ל-Recall.",
    eccTcodes: ["MSC1N", "MSC3N", "MB56", "CL30N"], s4Alt: "מודל זהה; Fiori 'Manage Batches' + Batch Information Cockpit.",
    fiori: ["Manage Batches (F1576)", "Batch Information Cockpit"], tables: ["MCH1", "MCHA", "MCHB", "AUSP", "CHVW"], cds: ["I_Batch"], apis: ["API_BATCH_SRV"], bapis: ["BAPI_BATCH_CREATE", "BAPI_BATCH_GET_DETAIL", "VB_BATCH_DETAIL_GET"], exits: ["SAPLV01Z", "VB_BD_BATCH_DETERMINATION"], incidents: ["batch-determination-fail", "char-batch-classification-missing", "batch-derivation-fail"], complexity: "High" },
  { slug: "maintenance", domain: "PM", he: "אחזקת מפעל", title: "Plant Maintenance (Corrective & Preventive)", keywords: ["maintenance", "אחזקה", "breakdown", "preventive", "equipment", "ציוד", "notification", "order"],
    process: "ניהול אחזקה — הודעות תקלה, פקודות אחזקה, אחזקה מונעת מתוזמנת, אישור והתחשבנות.",
    eccTcodes: ["IW21", "IW31", "IW41", "IP30"], s4Alt: "נתמך; UX Fiori EAM; עלויות ל-ACDOCA.",
    fiori: ["Create Maintenance Order (F2731)", "Create Maintenance Request", "Confirm Jobs"], tables: ["QMEL", "AUFK", "AFIH", "EQUI", "IFLOT"], cds: ["C_MaintOrderListReport", "I_Equipment"], apis: ["API_MAINTENANCEORDER", "API_MAINTENANCENOTIFICATION"], bapis: ["BAPI_ALM_ORDER_MAINTAIN", "BAPI_ALM_NOTIF_CREATE", "BAPI_ALM_CONF_CREATE"], exits: ["IWO10009", "QQMA0001", "WORKORDER_UPDATE"], incidents: ["order-wont-release", "notification-cant-close", "teco-blocked", "downtime-not-recorded"], complexity: "High" },
  { slug: "production-order", domain: "PP", he: "פקודת ייצור", title: "Production Order Execution", keywords: ["production order", "פקודת ייצור", "discrete", "confirmation", "GR", "shop floor"],
    process: "ייצור בדיד — יצירה מ-MRP, שחרור, אישור (CO11N), Backflush, GR והתחשבנות.",
    eccTcodes: ["CO01", "CO02", "CO11N", "CO15"], s4Alt: "נתמך; API_PRODUCTION_ORDER_2 + Fiori; MRP Live.",
    fiori: ["Manage Production Orders (F2336)", "Confirm Production Operation"], tables: ["AUFK", "AFKO", "AFPO", "AFVC", "AFRU", "RESB"], cds: ["I_ProductionOrder", "I_ManufacturingOrder"], apis: ["API_PRODUCTION_ORDER_2"], bapis: ["BAPI_PRODORD_CREATE", "BAPI_PRODORDCONF_CREATE_TT"], exits: ["PPCO0001", "CONFPP01", "WORKORDER_UPDATE"], incidents: ["planned-order-not-convert", "bom-explosion-no-components", "order-teco-wip"], complexity: "High" },
  { slug: "process-order", domain: "PP-PI", he: "פקודת תהליך", title: "Process Order & MES", keywords: ["process order", "פקודת תהליך", "recipe", "מתכון", "control recipe", "MES", "PI sheet"],
    process: "ייצור תהליכי מבוסס-מתכון — שחרור, מרשם בקרה ל-MES, אישור שלבים, GR לאצווה.",
    eccTcodes: ["COR1", "COR2", "COR6N", "CO53"], s4Alt: "נתמך; API_PROCESSORDER_2 + Fiori; PP-DS/aATP.",
    fiori: ["Manage Process Orders (F3577)", "Confirm Process Order"], tables: ["AUFK", "AFKO", "AFPO", "AFRU", "MCH1"], cds: ["I_ManufacturingOrder"], apis: ["API_PROCESSORDER_2"], bapis: ["BAPI_PROCORD_CREATE", "BAPI_PROCORDCONF_CREATE_TT"], exits: ["PPCO0001", "CONFPP01", "WORKORDER_CONFIRM"], incidents: ["process-order-no-control-recipe", "process-message-not-sent", "phase-confirm-sequence", "cogi-stuck"], complexity: "High" },
  { slug: "mrp", domain: "PP", he: "תכנון דרישות (MRP)", title: "Material Requirements Planning", keywords: ["MRP", "תכנון", "planning", "MPS", "PIR", "demand", "תחזית", "MD04"],
    process: "תרגום ביקוש להיצע — הזמנות מתוכננות ודרישות רכש, אסטרטגיות תכנון, MPS.",
    eccTcodes: ["MD01", "MD01N", "MD04", "MD61"], s4Alt: "MRP Live (MD01N) על HANA; MD01 לא אסטרטגי.",
    fiori: ["Monitor Material Coverage (F0247)", "Manage Material Coverage"], tables: ["MDKP", "MDTB", "PLAF", "PBED", "MDVM"], cds: ["C_MRPMaterials"], apis: [], bapis: ["MD_CONVERT_MATERIAL_UNIT"], exits: ["M61X0001", "MD_PLDORD_POST"], incidents: ["mrp-no-planned-orders", "mrp-exception-messages", "no-production-version"], complexity: "High" },
  { slug: "quality-inspection", domain: "QM", he: "בדיקת איכות", title: "Quality Inspection (QM)", keywords: ["quality", "איכות", "inspection", "בדיקה", "lot", "usage decision", "UD", "COA", "calibration"],
    process: "בדיקת איכות — מנת בדיקה ב-GR/ייצור, רישום תוצאות, החלטת שימוש, תעודות וכיול.",
    eccTcodes: ["QA32", "QE11", "QA11", "QP01"], s4Alt: "נתמך; Fiori QM apps; אינטגרציה PM-QM לכיול.",
    fiori: ["Manage Inspection Lots", "Record Inspection Results"], tables: ["QALS", "QAMR", "QAVE", "PLMK"], cds: [], apis: [], bapis: ["QPK1_INSPCHAR_READ", "BAPI_INSPLOT_GETLIST"], exits: ["QEEM0001", "QEVA0001"], incidents: ["qm-no-inspection-lot", "qm-ud-blocked", "qm-results-out-of-spec", "qm-inspection-lot-block"], complexity: "Medium" },
  { slug: "idoc-integration", domain: "INTEGRATION", he: "אינטגרציית IDoc", title: "IDoc / ALE Integration", keywords: ["idoc", "ALE", "integration", "אינטגרציה", "EDI", "interface", "ממשק"],
    process: "תקשורת אסינכרונית בין מערכות — אב-נתונים ותנועות דרך IDoc/ALE; ניטור וטיפול שגיאות.",
    eccTcodes: ["WE02", "WE05", "BD87", "WE20"], s4Alt: "נתמך; לתרחישים חדשים Events/OData/CPI; אורך MATNR 40.",
    fiori: ["—"], tables: ["EDIDC", "EDIDS", "EDID4"], cds: [], apis: ["OData API_* (modern alt)"], bapis: ["MASTER_IDOC_DISTRIBUTE"], exits: [], incidents: ["idoc-51", "idoc-29-ale-config", "idoc-64-eoio-queue", "idoc-status-26-syntax"], complexity: "Medium" },
  { slug: "authorization", domain: "SECURITY", he: "הרשאות ואבטחה", title: "Authorizations & Security", keywords: ["authorization", "הרשאה", "security", "role", "תפקיד", "PFCG", "SU53", "auth object"],
    process: "ניהול גישה — משתמשים, תפקידים, אובייקטי הרשאה, אבחון כשלים (SU53→PFCG).",
    eccTcodes: ["SU01", "PFCG", "SU53", "SUIM"], s4Alt: "מודל זהה; מתווספים Business Catalogs ל-Fiori (S_SERVICE).",
    fiori: ["Maintain Business Roles", "Maintain Users"], tables: ["AGR_1251", "USOBT_C", "USR02"], cds: [], apis: [], bapis: ["BAPI_USER_CREATE1", "PRGN_*"], exits: [], incidents: ["auth-missing", "auth-trace-mass"], complexity: "Medium" },
  { slug: "workflow", domain: "BASIS", he: "תהליכי אישור (Workflow)", title: "Workflow & Approvals", keywords: ["workflow", "approval", "אישור", "תהליך אישור", "SWI1", "agent", "release strategy"],
    process: "אוטומציית תהליכי אישור — ניתוב לפי תפקיד/כלל, תיבת עבודה, אירועים וטיפול בתקיעות.",
    eccTcodes: ["SWI1", "SWIA", "SWDD", "SWU3"], s4Alt: "נתמך; Flexible Workflow ב-S/4 (scenario-based) + Fiori 'My Inbox'.",
    fiori: ["My Inbox", "Manage Workflows / Teams"], tables: ["SWWWIHEAD", "SWW_CONT"], cds: [], apis: [], bapis: [], exits: [], incidents: ["workflow-stuck"], complexity: "High" },
  { slug: "settlement-costing", domain: "CO", he: "התחשבנות ותמחיר", title: "Order Settlement & Product Costing", keywords: ["settlement", "התחשבנות", "costing", "תמחיר", "variance", "סטיות", "WIP", "ACDOCA"],
    process: "צבירת עלויות פקודה, WIP, סטיות והעברה ליעד; עלות תקן ותמחיר מוצר.",
    eccTcodes: ["KO88", "CO88", "KKS2", "CK11N"], s4Alt: "נתמך; Material Ledger חובה; עלויות ב-ACDOCA.",
    fiori: ["Run Settlement", "Manage Material Cost Estimates", "Production Cost Analysis"], tables: ["COBRB", "COSS", "COSP", "KEKO", "ACDOCA"], cds: [], apis: [], bapis: ["K_ORDER_SETTLEMENT"], exits: ["COOM0001"], incidents: ["settlement-error", "variance-missing", "scrap-variance-high", "acdoca-coep-mismatch"], complexity: "High" },
  { slug: "bom", domain: "PP", he: "עץ מוצר", title: "Bill of Materials", keywords: ["bom", "עץ מוצר", "components", "רכיבים", "structure", "where used"],
    process: "מבנה מוצר לייצור — רכיבים, כמויות, גרסאות; בסיס לפיצוץ MRP ולצריכה.",
    eccTcodes: ["CS01", "CS02", "CS03", "CS15"], s4Alt: "נתמך; Fiori 'Manage BOM'; CDS I_BillOfMaterial.",
    fiori: ["Manage Bills of Material (F1814)"], tables: ["MAST", "STKO", "STPO", "STAS"], cds: ["I_BillOfMaterial", "I_BillOfMaterialItem"], apis: ["API_BILL_OF_MATERIAL_SRV"], bapis: ["CSAP_MAT_BOM_MAINTAIN", "CSAP_MAT_BOM_READ"], exits: ["PCSD0002"], incidents: ["bom-explosion-no-components"], complexity: "Medium" },
  { slug: "procurement", domain: "MM", he: "רכש (Procure-to-Pay)", title: "Procurement (P2P)", keywords: ["purchase", "רכש", "procurement", "PO", "requisition", "invoice", "P2P", "vendor"],
    process: "רכש מקצה-לקצה — דרישה, הזמנת רכש, קבלה, חשבונית ותשלום.",
    eccTcodes: ["ME51N", "ME21N", "MIGO", "MIRO"], s4Alt: "נתמך; ספק=BP; Fiori procurement; MM-IM/MATDOC.",
    fiori: ["Create Purchase Order (F0842A)", "Manage Purchase Requisitions"], tables: ["EBAN", "EKKO", "EKPO", "RBKP"], cds: [], apis: ["API_PURCHASEORDER_PROCESS_SRV"], bapis: ["BAPI_PO_CREATE1", "BAPI_REQUISITION_GETDETAIL"], exits: [], incidents: ["subcontracting-components", "pricing-condition-missing"], complexity: "Medium" },
  { slug: "sales-order", domain: "SD", he: "מכירות (Order-to-Cash)", title: "Sales (O2C)", keywords: ["sales", "מכירה", "order to cash", "delivery", "billing", "O2C", "customer"],
    process: "מכירה מקצה-לקצה — הזמנת לקוח, אספקה (PGI), חיוב וגבייה.",
    eccTcodes: ["VA01", "VL01N", "VF01", "VKM3"], s4Alt: "נתמך; לקוח=BP; aATP; Fiori sales.",
    fiori: ["Manage Sales Orders", "Create Outbound Deliveries"], tables: ["VBAK", "VBAP", "LIKP", "VBRK"], cds: ["I_SalesOrder"], apis: ["API_SALES_ORDER_SRV"], bapis: ["BAPI_SALESORDER_CREATEFROMDAT2"], exits: ["MV45AFZZ (userexit)"], incidents: ["pricing-condition-missing"], complexity: "Medium" },
  { slug: "equipment-asset", domain: "PM", he: "ציוד ונכסים טכניים", title: "Technical Objects (Equipment / FuncLoc)", keywords: ["equipment", "ציוד", "functional location", "מיקום", "asset", "technical object"],
    process: "ניהול נכסים טכניים — ציוד, מיקומים פונקציונליים, היררכיה, התקנה והיסטוריה.",
    eccTcodes: ["IE01", "IE02", "IL01", "IH08"], s4Alt: "נתמך; Fiori 'Manage Technical Objects'; CDS.",
    fiori: ["Manage Technical Objects (F2730A)"], tables: ["EQUI", "EQKT", "EQUZ", "IFLOT", "ILOA"], cds: ["I_Equipment", "I_FunctionalLocation"], apis: ["API_EQUIPMENT", "API_FUNCTIONALLOCATION"], bapis: ["BAPI_EQUI_CREATE", "BAPI_FUNCLOC_CREATE"], exits: ["ITOB0001", "BADI_EAM_TOB"], incidents: ["equipment-not-in-order", "funcloc-status-block", "equipment-cost-center"], complexity: "Medium" },
];

export const solutionBySlug = (s: string) => SOLUTIONS.find((x) => x.slug === s);
