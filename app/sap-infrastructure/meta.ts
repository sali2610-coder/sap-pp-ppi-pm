// UI / architecture presentation metadata for the SAP Architecture Explorer.
// Factual data (tables, fields, relations, modules, processes) lives in the
// single source of truth: public/sap-infrastructure/dataset.json.

export const MOD_ICON: Record<string, string> = {
  MM: "📦", SD: "🛒", PP: "🏭", "PP-PI": "⚗️", PM: "🔧", QM: "✅", CS: "🎧",
  FI: "💰", CO: "📊", BATCH: "🏷️", CLASS: "🗂️", IDOC: "🔌", PIPO: "🔗",
};

// Short purpose for the 4 modules without a full blueprint (the 9 use blueprint.purpose)
export const MOD_PURPOSE: Record<string, string> = {
  BATCH: "ניהול אצוות — עקיבות מלאה של חומרים ומוצרים לאורך הייצור והמלאי",
  CLASS: "מערכת סיווג — מאפיינים וערכים המעשירים חומרים, אצוות וציוד",
  IDOC: "מסגרת IDOC/ALE — חיבור אסינכרוני בין SAP למערכות חיצוניות (Zetes/Daymax)",
  PIPO: "ממשקי PI/PO — תזמור ותרגום הודעות בין SAP לעולם החיצון",
};

// Ordered business flow per module (Level 2). step = {he, en, doc?}
export const MOD_FLOW: Record<string, { he: string; en: string; doc?: string }[]> = {
  MM: [
    { he: "דרישת רכש", en: "Purchase Requisition", doc: "Purchase Requisition" },
    { he: "הזמנת רכש", en: "Purchase Order", doc: "Purchase Order" },
    { he: "קבלת טובין", en: "Goods Receipt", doc: "Goods Receipt" },
    { he: "מלאי", en: "Inventory" },
    { he: "חשבונית ספק", en: "Supplier Invoice", doc: "Invoice" },
    { he: "רישום חשבונאי", en: "Accounting", doc: "Accounting Document" },
  ],
  PP: [
    { he: "חומר", en: "Material" },
    { he: "עץ מוצר (BOM)", en: "Bill of Materials" },
    { he: "מסלול ייצור", en: "Routing" },
    { he: "הזמנת ייצור", en: "Production Order", doc: "Production Order" },
    { he: "דיווח ביצוע", en: "Confirmation" },
    { he: "תנועת מלאי", en: "Goods Movement", doc: "Goods Issue" },
    { he: "רישום עלויות", en: "Cost Posting" },
  ],
  "PP-PI": [
    { he: "חומר", en: "Material" },
    { he: "מתכון מאסטר", en: "Master Recipe" },
    { he: "הזמנת תהליך", en: "Process Order", doc: "Process Order" },
    { he: "ביצוע (MES/Daymax)", en: "Execution" },
    { he: "אצווה", en: "Batch" },
    { he: "תנועת מלאי", en: "Goods Movement", doc: "Goods Issue" },
  ],
  PM: [
    { he: "הודעת תקלה", en: "Notification", doc: "Notification" },
    { he: "הזמנת תחזוקה", en: "Maintenance Order", doc: "Maintenance Order" },
    { he: "שריון חומרים", en: "Reservation" },
    { he: "ביצוע עבודה", en: "Execution" },
    { he: "סגירה טכנית", en: "Completion" },
    { he: "רישום עלות", en: "Cost Settlement" },
  ],
  QM: [
    { he: "מקור (קבלה/ייצור)", en: "Origin" },
    { he: "מנת בדיקה", en: "Inspection Lot", doc: "Inspection Lot" },
    { he: "רישום תוצאות", en: "Results Recording" },
    { he: "החלטת שימוש", en: "Usage Decision" },
    { he: "שחרור אצווה", en: "Batch Release" },
  ],
  CS: [
    { he: "פניית לקוח", en: "Customer Request" },
    { he: "הודעת שירות", en: "Service Notification", doc: "Notification" },
    { he: "הזמנת שירות", en: "Service Order", doc: "Service Order" },
    { he: "ביצוע", en: "Execution" },
    { he: "חיוב", en: "Billing", doc: "Billing" },
  ],
  SD: [
    { he: "הזמנת מכירה", en: "Sales Order", doc: "Sales Order" },
    { he: "בדיקת זמינות", en: "ATP Check" },
    { he: "משלוח", en: "Delivery", doc: "Delivery" },
    { he: "חיוב", en: "Billing", doc: "Billing" },
    { he: "רישום הכנסה", en: "Revenue Posting", doc: "Accounting Document" },
  ],
  FI: [
    { he: "אירוע עסקי", en: "Business Event" },
    { he: "מסמך חשבונאי", en: "Accounting Document", doc: "Accounting Document" },
    { he: "ACDOCA — יומן אוניברסלי", en: "Universal Journal" },
    { he: "דוחות כספיים", en: "Financial Statements" },
  ],
  CO: [
    { he: "צבירת עלויות", en: "Cost Capture" },
    { he: "סילוק להזמנה", en: "Order Settlement" },
    { he: "מרכז עלות", en: "Cost Center" },
    { he: "ניתוח רווחיות", en: "Profitability" },
  ],
  BATCH: [
    { he: "יצירת אצווה", en: "Batch Creation" },
    { he: "סיווג אצווה", en: "Batch Classification" },
    { he: "מלאי אצווה", en: "Batch Stock" },
    { he: "עקיבות", en: "Traceability" },
  ],
  CLASS: [
    { he: "מאפיין", en: "Characteristic" },
    { he: "מחלקה", en: "Class" },
    { he: "שיוך אובייקט", en: "Assignment" },
    { he: "ערכים", en: "Values" },
  ],
  IDOC: [
    { he: "אירוע ב-SAP", en: "SAP Event" },
    { he: "יצירת IDoc", en: "IDoc Created" },
    { he: "הפצה (ALE)", en: "ALE Distribution" },
    { he: "מערכת חיצונית", en: "External System" },
  ],
  PIPO: [
    { he: "SAP", en: "SAP" },
    { he: "PI/PO תזמור", en: "Orchestration" },
    { he: "תרגום הודעה", en: "Mapping" },
    { he: "שותף חיצוני", en: "Partner" },
  ],
};

// Main reports per module (Level: technical / side panel)
export const MOD_REPORTS: Record<string, string[]> = {
  MM: ["ME2M", "ME80FN", "MB52", "MB51", "MMBE"],
  PP: ["COOIS", "CO24", "MD04", "MDBT"],
  "PP-PI": ["COOISPI", "COR3", "CO24", "MD04"],
  PM: ["IW38", "IW29", "IW39", "IH08"],
  QM: ["QA32", "QGC1", "QM10", "QGA3"],
  CS: ["IW58", "IW59", "VA05"],
  SD: ["VA05", "VF05", "VL06O", "V.15"],
  FI: ["FBL3N", "FAGLL03", "FS10N", "F.01"],
  CO: ["KSB1", "S_ALR_87013611", "KOB1"],
  BATCH: ["MSC3N", "MB56", "MMBE"],
  CLASS: ["CL30N", "CL6O", "CL6BN"],
  IDOC: ["WE02", "WE05", "BD87"],
  PIPO: ["SXMB_MONI"],
};

// Sample values for synthetic example records (looks like real SAP data)
const SAMPLE: Record<string, string[]> = {
  MATNR: ["100023", "FG-COLA-330"], MTART: ["FERT", "ROH"], MATKL: ["00107", "00203"], MEINS: ["EA", "L"],
  WERKS: ["1010", "1010"], LGORT: ["0001", "0002"], CHARG: ["0000004711", "0000004712"], MENGE: ["1.500", "200"],
  EBELN: ["4500000123", "4500000124"], EBELP: ["10", "20"], BANFN: ["10000455", "10000456"], LIFNR: ["0000100021", "0000100099"],
  AUFNR: ["000010004567", "000010004568"], VBELN: ["0000012345", "0000012346"], POSNR: ["10", "20"], KUNNR: ["0000020045", "0000020099"],
  MBLNR: ["4900001122", "4900001123"], MJAHR: ["2026", "2026"], BWART: ["101", "261"], BUKRS: ["1000", "1000"],
  BELNR: ["1900000045", "1900000046"], GJAHR: ["2026", "2026"], HKONT: ["0000400000", "0000113100"], DMBTR: ["12,400.00", "980.50"],
  EQUNR: ["000000010045", "000000010046"], QMNUM: ["010000345", "010000346"], PRUEFLOS: ["010000000789", "010000000790"],
  KOSTL: ["0000041010", "0000041020"], KOKRS: ["1000", "1000"], OBJNR: ["OR000010004567", "QM010000345"],
  KTOPL: ["CACO", "CACO"], SAKNR: ["0000400000", "0000113100"], CLINT: ["0000001234", "0000001235"], ATINN: ["0000000891", "0000000892"],
};
function sampleFor(tech: string, t: string, i: number): string {
  if (SAMPLE[tech]) return SAMPLE[tech][i % 2];
  if (/DATUM|DATE|ERSDA|BUDAT|BLDAT|EDATU/.test(tech)) return ["2026-05-14", "2026-06-02"][i % 2];
  if (/MENGE|WERT|BTR|HSL|NETWR|PREIS/.test(tech)) return ["1,250.00", "640.75"][i % 2];
  if (/NAME|TXT|MAKTX|BUTXT/.test(tech)) return ["דוגמה / Sample", "ערך / Value"][i % 2];
  return (i % 2 === 0 ? "A100" : "B200") + tech.slice(0, 2);
}
export function genExampleRecords(fields: [string, string, string, string][], name: string) {
  const cols = fields.slice(0, 5).map((f) => f[0]);
  const rows = [0, 1].map((i) => cols.map((c) => sampleFor(c, name, i)));
  return { cols, rows };
}

// Curated "major tables" per module for the ERD / Table layer (cross-module + shared allowed).
// These names are resolved against the global table set (which already holds rich PM/PP-PI data).
export const ERD_MODULES: Record<string, string[]> = {
  PP: ["MARA", "MARC", "MAKT", "MBEW", "STKO", "STPO", "MAST", "MAPL", "PLKO", "PLPO", "CRHD", "CRCA", "AFKO", "AFPO", "AFVC", "AFRU", "AUFK", "RESB", "JEST", "JSTO"],
  "PP-PI": ["MARA", "MARC", "MAPL", "PLKO", "PLPO", "AFKO", "AFPO", "AFVC", "AFRU", "AUFK", "CRHD", "RESB", "MCH1", "JEST", "JSTO"],
  PM: ["EQUI", "IFLOT", "AFIH", "AUFK", "AFKO", "AFPO", "AFVC", "AFRU", "QMEL", "QMFE", "STKO", "PLKO", "PLPO", "CRHD", "JEST", "JSTO", "OBJNR"],
  MM: ["MARA", "MARC", "MARD", "MBEW", "MAKT", "EBAN", "EKKO", "EKPO", "EKET", "EKBE", "MKPF", "MSEG", "MATDOC", "RBKP", "LFA1", "T001W"],
  SD: ["VBAK", "VBAP", "VBEP", "LIKP", "LIPS", "VBRK", "VBRP", "VBFA", "KONV", "PRCD_ELEMENTS", "KNA1", "MARA"],
  QM: ["QALS", "QAVE", "QAMV", "QPAM", "MARA", "MCH1", "PLKO", "MAPL"],
  FI: ["BKPF", "BSEG", "ACDOCA", "BSID", "BSAD", "BSIK", "BSAK", "SKA1", "T001", "KNA1", "LFA1"],
  CO: ["COEP", "COBK", "CSKS", "ACDOCA", "AUFK", "OBJNR"],
  CS: ["VIQMEL", "QMEL", "AUFK", "AFIH", "EQUI", "VBAK", "KNA1"],
  BATCH: ["MCH1", "MCHA", "MCHB", "MCHBH", "MARA", "MARC", "KLAH", "KSSK", "AUSP"],
  CLASS: ["KLAH", "KSSK", "AUSP", "CABN", "CAWN", "KSML", "MARA"],
  IDOC: ["EDIDC", "EDIDS", "EDID4", "MARA", "MATDOC"],
  PIPO: ["EDIDC", "MARA", "VBAK", "AFKO", "LIKP"],
};

// Technical/audit fields (categorised separately in expanded ERD cards)
export const TECH_FIELDS = new Set(["AEDAT", "ERDAT", "ERNAM", "AENAM", "LAEDA", "LAEDB", "CPUDT", "CPUTM", "USNAM", "UDATE", "UTIME", "CRTSP", "CHTSP", "ERSDA"]);

// Enriched field lists (top business fields) for key hub tables — depth for detail panel & ERD.
// [tech, en, he, key]
export const FIELDS_PLUS: Record<string, [string, string, string, string][]> = {
  MARA: [["MATNR", "Material", "מספר חומר", "PK"], ["MTART", "Material type", "סוג חומר", "FK"], ["MBRSH", "Industry sector", "ענף", "FK"], ["MATKL", "Material group", "קבוצת חומר", "FK"], ["MEINS", "Base UoM", "יח׳ מידה", "FK"], ["GROES", "Size/dimensions", "גודל", "-"], ["BRGEW", "Gross weight", "משקל ברוטו", "-"], ["NTGEW", "Net weight", "משקל נטו", "-"], ["GEWEI", "Weight unit", "יח׳ משקל", "-"], ["VOLUM", "Volume", "נפח", "-"], ["XCHPF", "Batch mgmt", "ניהול אצווה", "-"], ["MSTAE", "X-plant status", "סטטוס חומר", "-"], ["ERSDA", "Created on", "נוצר בתאריך", "-"], ["ERNAM", "Created by", "נוצר ע״י", "-"], ["LAEDA", "Last change", "שונה לאחרונה", "-"]],
  AFKO: [["AUFNR", "Order number", "מספר פקודה", "PK"], ["AUART", "Order type", "סוג פקודה", "FK"], ["GLTRP", "Basic finish", "סיום בסיסי", "-"], ["GSTRP", "Basic start", "התחלה בסיסית", "-"], ["GSTRI", "Actual start", "התחלה בפועל", "-"], ["GETRI", "Actual finish", "סיום בפועל", "-"], ["PLNBEZ", "Planned material", "חומר מתוכנן", "FK"], ["GAMNG", "Total order qty", "כמות פקודה", "-"], ["IGMNG", "Confirmed qty", "כמות מדווחת", "-"], ["AUFPL", "Routing no.", "מס׳ מסלול", "FK"], ["OBJNR", "Object number", "מס׳ אובייקט", "FK"], ["FTRMS", "Scheduled release", "שחרור מתוזמן", "-"], ["AEDAT", "Changed on", "שונה", "-"], ["ERNAM", "Created by", "נוצר ע״י", "-"]],
  AFPO: [["AUFNR", "Order number", "מספר פקודה", "PK"], ["POSNR", "Order item", "פריט פקודה", "PK"], ["MATNR", "Material", "חומר", "FK"], ["MEINS", "UoM", "יח׳ מידה", "FK"], ["PSMNG", "Order item qty", "כמות פריט", "-"], ["WEMNG", "GR quantity", "כמות שהתקבלה", "-"], ["DWERK", "Plant", "מפעל", "FK"], ["CHARG", "Batch", "אצווה", "FK"], ["KDAUF", "Sales order", "הזמנת מכירה", "FK"], ["ELIKZ", "Delivery complete", "אספקה הושלמה", "-"]],
  EKKO: [["EBELN", "PO number", "מספר הזמנה", "PK"], ["BUKRS", "Company code", "חברה", "FK"], ["BSTYP", "Doc category", "קטגוריה", "-"], ["BSART", "Doc type", "סוג מסמך", "FK"], ["LIFNR", "Vendor", "ספק", "FK"], ["EKORG", "Purch org", "ארגון רכש", "FK"], ["EKGRP", "Purch group", "קבוצת רכש", "FK"], ["WAERS", "Currency", "מטבע", "FK"], ["BEDAT", "Doc date", "תאריך מסמך", "-"], ["AEDAT", "Created on", "נוצר", "-"], ["ERNAM", "Created by", "נוצר ע״י", "-"]],
  EKPO: [["EBELN", "PO number", "מספר הזמנה", "PK"], ["EBELP", "Item", "פריט", "PK"], ["MATNR", "Material", "חומר", "FK"], ["WERKS", "Plant", "מפעל", "FK"], ["LGORT", "Storage loc", "אחסון", "FK"], ["MENGE", "Quantity", "כמות", "-"], ["MEINS", "UoM", "יח׳ מידה", "FK"], ["NETPR", "Net price", "מחיר נטו", "-"], ["NETWR", "Net value", "ערך נטו", "-"], ["MATKL", "Material group", "קבוצת חומר", "FK"]],
  VBAK: [["VBELN", "Sales doc", "מסמך מכירה", "PK"], ["AUART", "Doc type", "סוג מסמך", "FK"], ["VKORG", "Sales org", "ארגון מכירות", "FK"], ["VTWEG", "Distrib channel", "ערוץ הפצה", "FK"], ["SPART", "Division", "מגזר", "FK"], ["KUNNR", "Sold-to", "לקוח", "FK"], ["AUDAT", "Doc date", "תאריך", "-"], ["NETWR", "Net value", "ערך נטו", "-"], ["WAERK", "Currency", "מטבע", "FK"], ["VDATU", "Req. deliv date", "תאריך אספקה", "-"]],
  VBAP: [["VBELN", "Sales doc", "מסמך מכירה", "PK"], ["POSNR", "Item", "פריט", "PK"], ["MATNR", "Material", "חומר", "FK"], ["ARKTX", "Description", "תיאור", "-"], ["KWMENG", "Order qty", "כמות", "-"], ["VRKME", "Sales unit", "יח׳ מכירה", "FK"], ["NETWR", "Net value", "ערך נטו", "-"], ["WERKS", "Plant", "מפעל", "FK"], ["PMATN", "Pricing material", "חומר תמחור", "FK"]],
  BKPF: [["BUKRS", "Company code", "חברה", "PK"], ["BELNR", "Document no.", "מספר מסמך", "PK"], ["GJAHR", "Fiscal year", "שנת כספים", "PK"], ["BLART", "Doc type", "סוג מסמך", "FK"], ["BLDAT", "Doc date", "תאריך מסמך", "-"], ["BUDAT", "Posting date", "תאריך רישום", "-"], ["WAERS", "Currency", "מטבע", "FK"], ["XBLNR", "Reference", "אסמכתא", "-"], ["TCODE", "Transaction", "טרנזקציה", "-"], ["USNAM", "User", "משתמש", "-"]],
  BSEG: [["BUKRS", "Company code", "חברה", "PK"], ["BELNR", "Document no.", "מספר מסמך", "PK"], ["GJAHR", "Fiscal year", "שנה", "PK"], ["BUZEI", "Line item", "שורה", "PK"], ["BSCHL", "Posting key", "מפתח רישום", "FK"], ["HKONT", "G/L account", "חשבון ראשי", "FK"], ["DMBTR", "Amount (LC)", "סכום מקומי", "-"], ["WRBTR", "Amount (DC)", "סכום מטבע", "-"], ["KOSTL", "Cost center", "מרכז עלות", "FK"], ["AUFNR", "Order", "פקודה", "FK"]],
  EQUI: [["EQUNR", "Equipment", "מספר ציוד", "PK"], ["EQTYP", "Equip category", "קטגוריה", "FK"], ["EQART", "Object type", "סוג אובייקט", "FK"], ["HERST", "Manufacturer", "יצרן", "-"], ["TYPBZ", "Model", "דגם", "-"], ["BAUJJ", "Year of constr", "שנת ייצור", "-"], ["OBJNR", "Object number", "מס׳ אובייקט", "FK"], ["ANSWT", "Acquisition val", "ערך רכישה", "-"], ["ERDAT", "Created on", "נוצר", "-"]],
  QALS: [["PRUEFLOS", "Inspection lot", "מנת בדיקה", "PK"], ["MATNR", "Material", "חומר", "FK"], ["WERK", "Plant", "מפעל", "FK"], ["CHARG", "Batch", "אצווה", "FK"], ["HERKUNFT", "Lot origin", "מקור", "FK"], ["ART", "Inspection type", "סוג בדיקה", "FK"], ["LOSMENGE", "Lot quantity", "כמות", "-"], ["GSAV", "UD made", "החלטה בוצעה", "-"], ["ENSTEHDAT", "Created on", "נוצר", "-"]],
  MCH1: [["MATNR", "Material", "חומר", "PK"], ["CHARG", "Batch", "אצווה", "PK"], ["ERSDA", "Created on", "נוצר", "-"], ["ERNAM", "Created by", "נוצר ע״י", "-"], ["VFDAT", "Expiry date", "תוקף", "-"], ["HSDAT", "Production date", "תאריך ייצור", "-"], ["LICHA", "Vendor batch", "אצוות ספק", "-"], ["CHARGE_TXT", "Batch desc", "תיאור", "-"]],
};

// Document detail (Level 3)
export const DOC_META: Record<string, { tcodes: string; owner: string; purpose: string; inputs: string[]; outputs: string[] }> = {
  "Purchase Requisition": { tcodes: "ME51N · ME52N · ME53N", owner: "MM — רכש", purpose: "בקשה פנימית לרכש חומר או שירות", inputs: ["דרישת חומר מ-PP/PM", "תכנון MRP"], outputs: ["הזמנת רכש"] },
  "Purchase Order": { tcodes: "ME21N · ME22N · ME23N", owner: "MM — רכש", purpose: "מסמך רכש מחייב מול ספק", inputs: ["דרישת רכש"], outputs: ["קבלת טובין", "חשבונית ספק"] },
  "Goods Receipt": { tcodes: "MIGO · MB01", owner: "MM — מלאי", purpose: "קליטת חומר למלאי כנגד הזמנת רכש", inputs: ["הזמנת רכש"], outputs: ["עדכון מלאי (MATDOC)", "רישום FI"] },
  "Goods Issue": { tcodes: "MIGO · MB1A", owner: "MM — מלאי", purpose: "ניפוק חומר מהמלאי לייצור/הוצאה", inputs: ["הזמנת ייצור / משלוח"], outputs: ["ניכוי מלאי", "רישום עלות CO"] },
  "Production Order": { tcodes: "CO01 · CO02 · CO03", owner: "PP", purpose: "הוראת ייצור דיסקרטי עם BOM ומסלול", inputs: ["דרישת מכירה / תחזית"], outputs: ["מוצר מוגמר", "עלויות ל-CO"] },
  "Process Order": { tcodes: "COR1 · COR2 · COR3", owner: "PP-PI", purpose: "הוראת ייצור תהליכי מבוססת מתכון ואצווה", inputs: ["תכנית ייצור"], outputs: ["אצווה מוגמרת", "דיווח MES"] },
  "Maintenance Order": { tcodes: "IW31 · IW32 · IW33", owner: "PM", purpose: "הזמנת עבודת תחזוקה לציוד/מתקן", inputs: ["הודעת תקלה"], outputs: ["צריכת חלקים MM", "עלות ל-CO"] },
  "Service Order": { tcodes: "IW51 · IW52 · IW53", owner: "CS", purpose: "הזמנת שירות לציוד לקוח", inputs: ["פניית לקוח / הודעת שירות"], outputs: ["חיוב SD", "עבודת PM"] },
  "Notification": { tcodes: "IW21 · QM01 · IW51", owner: "PM / QM / CS", purpose: "תיעוד תקלה / בעיית איכות / פניית שירות", inputs: ["אירוע בשטח"], outputs: ["הזמנת תחזוקה/שירות"] },
  "Sales Order": { tcodes: "VA01 · VA02 · VA03", owner: "SD", purpose: "הזמנת לקוח למוצר או שירות", inputs: ["הזמנת לקוח / EDI"], outputs: ["משלוח", "חיוב"] },
  "Delivery": { tcodes: "VL01N · VL02N · VL03N", owner: "SD — לוגיסטיקה", purpose: "תעודת משלוח ללקוח", inputs: ["הזמנת מכירה"], outputs: ["ניכוי מלאי", "חשבונית"] },
  "Billing": { tcodes: "VF01 · VF02 · VF03", owner: "SD — חיוב", purpose: "חשבונית מכירה ללקוח", inputs: ["משלוח / הזמנה"], outputs: ["רישום הכנסה FI"] },
  "Accounting Document": { tcodes: "FB01 · FB03 · FBL3N", owner: "FI", purpose: "רישום פיננסי — מקור האמת ב-ACDOCA", inputs: ["כל אירוע לוגיסטי"], outputs: ["דוחות כספיים"] },
};
