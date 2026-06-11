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
