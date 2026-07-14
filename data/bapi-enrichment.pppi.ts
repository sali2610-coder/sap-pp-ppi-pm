// ============================================================================
// Phase 15.3 — PP / PP-PI BAPI/FM enrichment — VERIFIED content.
// Verified against SAP Help + SE37/BAPI-Explorer metadata mirrors
// (sapdatasheet.org / tcodesearch.com / se80.co.uk). Nothing invented.
// S/4 Public Cloud whitelisting left unknown. Verified 2026-07-14 · HIGH.
// ============================================================================

import type { SapFuncObject, TriState, VerificationStatus, OperationType, RegistryModule, BusinessCategory, Difficulty } from "@/lib/bapi-registry";

const LV = "2026-07-14";
// local facet helpers (inlined to avoid a circular import with the registry)
const catOf = (proc: string): BusinessCategory => {
  const p = proc.toLowerCase();
  if (p.includes("confirm")) return "Confirmation"; if (p.includes("goods")) return "GoodsMovement";
  if (p.includes("material")) return "MasterData"; if (p.includes("bill of material") || p.includes("bom")) return "BOM";
  if (p.includes("batch")) return "Batch"; if (p.includes("reservation")) return "Reservation";
  if (p.includes("planned")) return "Planning"; if (p.includes("routing")) return "Planning";
  if (p.includes("order")) return "Execution"; return "BusinessAPI";
};
const diffOf = (op: OperationType): Difficulty => op === "Read" ? "Beginner" : (op === "Post" || op === "Confirm" || op === "Mixed") ? "Advanced" : "Intermediate";
const PO_SEQ = ["BAPI_PROCORD_CREATE", "BAPI_PROCORD_RELEASE", "BAPI_PROCORDCONF_CREATE_TT", "BAPI_GOODSMVT_CREATE (אם נדרש)", "BAPI_TRANSACTION_COMMIT"];

type Def = {
  id: string; op: OperationType; write: boolean; he: string; en: string; params?: string;
  proc: string; bor?: string; tx: string[]; tbl: string[]; rel: string[]; seq?: string[];
  src: string; mod?: RegistryModule; type?: "BAPI" | "FM"; vs?: VerificationStatus; qa?: string; kw?: string[];
};
const def = (d: Def): SapFuncObject => ({
  id: d.id, technicalName: d.id, objectType: d.type || (/^BAPI_/.test(d.id) ? "BAPI" : "FM"),
  primaryModule: d.mod || "PP-PI", secondaryModules: [],
  businessProcess: d.proc, operationType: d.op,
  shortDescriptionHe: d.he, shortDescriptionEn: d.en,
  transactions: d.tx, tables: d.tbl, businessObject: d.bor, relatedObjects: d.rel,
  sequence: d.seq, requiresSave: (d.write ? "yes" : "no") as TriState, requiresCommit: (d.write ? "yes" : "no") as TriState,
  remoteEnabled: "yes", releasedStatus: d.vs === "internal-unsupported" ? "Remote-enabled FM · לא Released רשמית" : "Released · RFC",
  eccSupport: "yes", s4OnPremSupport: "yes", cloudSupport: "unknown",
  verificationStatus: d.vs || "verified-docs", verificationSource: d.src, lastVerified: LV, confidence: "high",
  aliases: [], keywords: d.kw || [d.id, d.proc],
  category: catOf(d.proc), difficulty: diffOf(d.op),
  stability: d.vs === "internal-unsupported" ? "Use-With-Caution" : (/^BAPI_/.test(d.id) ? "Released" : "SAP-Recommended"),
  processChain: d.proc.includes("Order") || d.proc.includes("Confirmation") || d.proc.includes("Goods") ? ["פקודת תהליך", "שחרור", "דיווח", "תנועת סחורה", "סילוק"] : undefined,
  parameterSummary: d.params,
  qaNotes: d.qa || (d.write ? "בדוק טבלת RETURN. חובה BAPI_TRANSACTION_COMMIT (WAIT='X' אם קוראים מיד) על אותו LUW. בשגיאה — BAPI_TRANSACTION_ROLLBACK." : "קריאה בלבד."),
});

const SD = "SE37 metadata mirror (sapdatasheet.org)";
const HELP = "SAP Help Portal + SE37 metadata";

// full verified records (used both to overlay existing derived records and to add missing ones)
const ALL: SapFuncObject[] = [
  def({ id: "BAPI_PROCORD_CREATE", op: "Create", write: true, proc: "Process Order", bor: "BUS2116", src: HELP,
    he: "יצירת פקודת תהליך (Process Order) — חומר, מפעל, סוג פקודה, כמות, גרסת ייצור.", en: "Create a process order.",
    params: "IMP ORDERDATA (material, plant, orderType, quantity, dates, prodVersion) · EXP RETURN, ORDER_NUMBER",
    tx: ["COR1", "COR2", "COR3", "COR5"], tbl: ["AFKO", "AFPO", "AFVC", "RESB"], rel: PO_SEQ, seq: PO_SEQ, kw: ["process order", "פקודת תהליך", "BUS2116"] }),
  def({ id: "BAPI_PROCORD_GET_DETAIL", op: "Read", write: false, proc: "Process Order", bor: "BUS2116", src: SD,
    he: "שליפת פרטי פקודת תהליך — קריאה בלבד.", en: "Output details of a process order.",
    params: "IMP NUMBER · EXP ORDER_OBJECTS · TAB RETURN", tx: ["COR3"], tbl: ["AFKO", "AFPO", "AFVC"], rel: PO_SEQ }),
  def({ id: "BAPI_PROCORD_GET_LIST", op: "Read", write: false, proc: "Process Order", bor: "BUS2116", src: SD,
    he: "רשימת פקודות תהליך לפי בחירה — קריאה בלבד.", en: "List process-order headers by selection.",
    params: "IMP PLANT, SELPROD… · TAB PROCESS_ORDERS, RETURN", tx: ["COOISPI", "COHV"], tbl: ["AFKO", "AUFK"], rel: PO_SEQ }),
  def({ id: "BAPI_PROCORD_RELEASE", op: "Change", write: true, proc: "Process Order", bor: "BUS2116", src: "se80.co.uk (SE37)",
    he: "שחרור פקודות תהליך (Release).", en: "Release process orders.",
    params: "TAB ORDERS (order numbers), DETAIL_RETURN, RETURN", tx: ["COR2"], tbl: ["AFKO", "JEST"], rel: PO_SEQ, seq: PO_SEQ }),
  def({ id: "BAPI_PROCORD_COMPLETE_TECH", op: "Change", write: true, proc: "Process Order", bor: "BUS2116", src: "se80.co.uk (SE37)",
    he: "סגירה טכנית של פקודות תהליך (TECO).", en: "Technically complete process orders (TECO).",
    params: "TAB ORDERS, DETAIL_RETURN, RETURN", tx: ["COR2"], tbl: ["AFKO", "JEST"], rel: ["BAPI_PROCORD_CREATE", "BAPI_TRANSACTION_COMMIT"] }),
  def({ id: "BAPI_PROCORDCONF_CREATE_TT", op: "Confirm", write: true, proc: "Process Order Confirmation", bor: "BUS2116", src: HELP,
    he: "דיווח פקודת תהליך — Time Ticket (תפוקה, פסולת, פעילויות).", en: "Enter a process-order time-ticket confirmation.",
    params: "IMP POST_WRONG_ENTRIES · TAB TIMETICKETS, GOODSMOVEMENTS, LINK_CONF_GOODSMOV, DETAIL_RETURN, RETURN", tx: ["CORK", "CORR"], tbl: ["AFRU", "AFVC"], rel: ["BAPI_PROCORDCONF_CANCEL", "BAPI_GOODSMVT_CREATE", "BAPI_TRANSACTION_COMMIT"], seq: PO_SEQ,
    qa: "דיווח _TT (Time Ticket) — לא לבלבל עם _GETLIST. תנועות סחורה נלוות דרך GOODSMOVEMENTS. חובה COMMIT. ביטול: BAPI_PROCORDCONF_CANCEL." }),
  def({ id: "BAPI_PROCORDCONF_GETLIST", op: "Read", write: false, proc: "Process Order Confirmation", src: SD,
    he: "רשימת דיווחים לפקודות תהליך — קריאה בלבד. (שם: GETLIST, ללא קו תחתון לפני LIST).", en: "List of process-order confirmations (read-only).",
    params: "IMP selection · TAB CONF_LIST, RETURN", tx: ["COConf"], tbl: ["AFRU"], rel: ["BAPI_PROCORDCONF_CREATE_TT"] }),
  def({ id: "BAPI_PROCORDCONF_CANCEL", op: "Change", write: true, proc: "Process Order Confirmation", src: "tcodesearch.com (SE37)",
    he: "ביטול דיווח פקודת תהליך.", en: "Cancel a process-order confirmation.",
    params: "TAB CONFIRMATIONS, DETAIL_RETURN, RETURN", tx: ["CORS"], tbl: ["AFRU"], rel: ["BAPI_PROCORDCONF_CREATE_TT", "BAPI_TRANSACTION_COMMIT"] }),
  def({ id: "BAPI_GOODSMVT_CREATE", op: "Post", write: true, proc: "Goods Movement", bor: "BUS2017", src: HELP,
    he: "רישום תנועת סחורה / יצירת מסמך חומר. אין COMMIT פנימי — הקורא חייב COMMIT.", en: "Post a goods movement / create a material document (no internal commit).",
    params: "IMP GOODSMVT_HEADER, GOODSMVT_CODE · TAB GOODSMVT_ITEM, RETURN · EXP MATERIALDOCUMENT, MATDOCUMENTYEAR", tx: ["MIGO", "MB1A", "MB31"], tbl: ["MSEG", "MKPF", "MATDOC"], rel: ["BAPI_TRANSACTION_COMMIT"], seq: PO_SEQ,
    qa: "אין COMMIT פנימי — חובה BAPI_TRANSACTION_COMMIT. תנועות 101/261/531 וכו' לפי GOODSMVT_CODE. בדוק RETURN." }),
  def({ id: "BAPI_MATERIAL_SAVEDATA", op: "Change", write: true, proc: "Material Master", bor: "MATERIAL", src: HELP,
    he: "יצירה/שינוי של אב-חומר (Material Master).", en: "Create or change a material master.",
    params: "IMP HEADDATA, CLIENTDATA(+X), PLANTDATA(+X)… · TAB MATERIALDESCRIPTION, RETURN", tx: ["MM01", "MM02"], tbl: ["MARA", "MARC", "MAKT"], rel: ["BAPI_MATERIAL_GET_DETAIL", "BAPI_TRANSACTION_COMMIT"] }),
  def({ id: "BAPI_MATERIAL_GET_DETAIL", op: "Read", write: false, proc: "Material Master", bor: "MATERIAL", src: SD,
    he: "שליפת פרטי אב-חומר — קריאה בלבד.", en: "Read material master detail.",
    params: "IMP MATERIAL, PLANT · EXP MATERIAL_GENERAL_DATA · TAB RETURN", tx: ["MM03"], tbl: ["MARA", "MARC"], rel: ["BAPI_MATERIAL_SAVEDATA"] }),
  def({ id: "BAPI_MATERIAL_BOM_GROUP_CREATE", op: "Create", write: true, proc: "Bill of Material", src: SD,
    he: "יצירת קבוצת עצי-מוצר לחומר (BOM group).", en: "Create a material BOM group.",
    params: "IMP ALL_ERROR · TAB BOMGROUP, VARIANTS, ITEMS, RETURN", tx: ["CS01"], tbl: ["STKO", "STPO", "MAST"], rel: ["CSAP_MAT_BOM_MAINTAIN", "BAPI_TRANSACTION_COMMIT"] }),
  def({ id: "BAPI_BATCH_CREATE", op: "Create", write: true, proc: "Batch Management", bor: "BUS1001_BATCH", src: SD,
    he: "יצירת אצווה (סיווג נעשה בנפרד).", en: "Create a batch (classification handled separately).",
    params: "IMP MATERIAL, PLANT, BATCH, BATCHATTRIBUTES · TAB RETURN · EXP BATCH", tx: ["MSC1N"], tbl: ["MCH1", "MCHA", "MCHB"], rel: ["BAPI_BATCH_GET_DETAIL", "BAPI_TRANSACTION_COMMIT"] }),
  def({ id: "BAPI_BATCH_GET_DETAIL", op: "Read", write: false, proc: "Batch Management", src: SD,
    he: "שליפת פרטי אצווה — קריאה בלבד (קבוצת פונקציות VBWB).", en: "Read batch detail (function group VBWB).",
    params: "IMP MATERIAL, BATCH, PLANT · EXP BATCHATTRIBUTES · TAB RETURN", tx: ["MSC3N"], tbl: ["MCH1", "MCHA"], rel: ["BAPI_BATCH_CREATE"] }),
  def({ id: "BAPI_RESERVATION_CREATE1", op: "Create", write: true, proc: "Reservation", bor: "BUS2093", src: SD,
    he: "יצירת הזמנה פנימית (Reservation) בודדת.", en: "Create an individual reservation.",
    params: "IMP RESERVATION_GENERAL_DATA · TAB RESERVATION_ITEMS, RETURN · EXP RESERVATION", tx: ["MB21"], tbl: ["RESB", "RKPF"], rel: ["BAPI_GOODSMVT_CREATE", "BAPI_TRANSACTION_COMMIT"] }),
  def({ id: "BAPI_PLANNEDORDER_CREATE", op: "Create", write: true, proc: "Planned Order", src: "tcodesearch.com (SE37)",
    he: "יצירת הזמנה מתוכננת (Planned Order).", en: "Create a planned order.",
    params: "IMP HEADERDATA · EXP PLANNEDORDER · TAB RETURN", tx: ["MD11"], tbl: ["PLAF"], rel: ["BAPI_PLANNEDORDER_GET_DETAIL", "BAPI_TRANSACTION_COMMIT"] }),
  def({ id: "BAPI_PLANNEDORDER_GET_DETAIL", op: "Read", write: false, proc: "Planned Order", src: SD,
    he: "שליפת פרטי הזמנה מתוכננת — קריאה בלבד.", en: "Get details for a planned order.",
    params: "IMP PLANNEDORDER · EXP HEADER · TAB COMPONENTS, RETURN", tx: ["MD13"], tbl: ["PLAF"], rel: ["BAPI_PLANNEDORDER_CREATE"] }),
  def({ id: "BAPI_ROUTING_CREATE", op: "Create", write: true, proc: "Routing", src: "SE37 metadata",
    he: "יצירת מסלול ייצור (Routing). אין BAPI לקריאת מסלול — לקריאה השתמש בטבלאות PLKO·PLPO·MAPL·PLAS.", en: "Create a routing. No routing-read BAPI exists — read via tables PLKO/PLPO/MAPL/PLAS.",
    params: "IMP TASKLISTGROUP · TAB OPERATIONS, MATERIALTASKLISTALLOC, RETURN", tx: ["CA01"], tbl: ["PLKO", "PLPO", "MAPL", "PLAS"], rel: ["BAPI_TRANSACTION_COMMIT"] }),
  // BOM function modules (SAP-sanctioned APIs, not formally released BAPIs)
  def({ id: "CSAP_MAT_BOM_MAINTAIN", op: "Change", write: true, proc: "Bill of Material", type: "FM", vs: "verified-docs", src: SD,
    he: "תחזוקת עץ-מוצר לחומר (FM עם RFC). לא מסומן כ-BAPI Released רשמי — הקורא חייב COMMIT.", en: "Maintain a material BOM (remote-enabled FM; not a formally released BAPI — caller must commit).",
    params: "IMP MATERIAL, PLANT, BOM_USAGE, VALID_FROM · TAB T_STKO, T_STPO, T_LTX_LINE, RETURN", tx: ["CS01", "CS02"], tbl: ["STKO", "STPO", "MAST"], rel: ["CSAP_MAT_BOM_READ", "BAPI_TRANSACTION_COMMIT"],
    qa: "FM נתמך אך לא Released רשמית כ-BAPI. חובה COMMIT חיצוני. אמת התנהגות בסביבת בדיקה." }),
  def({ id: "CSAP_MAT_BOM_READ", op: "Read", write: false, proc: "Bill of Material", type: "FM", vs: "internal-unsupported", src: SD,
    he: "תצוגת עץ-מוצר לחומר. מסומן ‘Not Released’ ע\"י SAP — לשימוש בזהירות.", en: "Display a material BOM. Flagged 'Not Released' by SAP — use with caution.",
    params: "IMP MATERIAL, PLANT, BOM_USAGE, VALID_FROM · TAB T_STKO, T_STPO, RETURN", tx: ["CS03"], tbl: ["STKO", "STPO", "MAST"], rel: ["CSAP_MAT_BOM_MAINTAIN"],
    qa: "SAP: 'Not Released'. ודא תמיכה לפני שימוש בפרודקשן; חלופה: קריאת טבלאות STKO/STPO/MAST." }),
];

export const PPPI_ENRICHMENT: Record<string, Partial<SapFuncObject>> = {};
export const PPPI_ADDITIONS: SapFuncObject[] = [];
// existing PP-PI dataset objects get an overlay; verified-but-absent objects are additions.
const EXISTING = new Set(["BAPI_PROCORD_CREATE", "BAPI_PROCORD_GET_DETAIL", "BAPI_PROCORD_GET_LIST", "BAPI_PROCORDCONF_CREATE_TT", "BAPI_PROCORDCONF_GETLIST", "BAPI_GOODSMVT_CREATE", "BAPI_MATERIAL_SAVEDATA", "BAPI_MATERIAL_GET_DETAIL", "BAPI_MATERIAL_BOM_GROUP_CREATE", "BAPI_BATCH_CREATE", "BAPI_BATCH_GET_DETAIL", "BAPI_RESERVATION_CREATE1", "CSAP_MAT_BOM_MAINTAIN"]);
for (const o of ALL) { if (EXISTING.has(o.id)) { const { id, technicalName, aliases, ...rest } = o; void id; void technicalName; void aliases; PPPI_ENRICHMENT[o.id] = rest; } else PPPI_ADDITIONS.push(o); }

// corrections — dataset entries that are NOT standard callable objects (verified absent / wrong kind)
const bad = (id: string, he: string, en: string, rel: string[] = []): Partial<SapFuncObject> => ({
  verificationStatus: "invalid-name", confidence: "high", verificationSource: SD, lastVerified: LV,
  shortDescriptionHe: he, shortDescriptionEn: en, relatedObjects: rel, qaNotes: "אומת: אינו FM/BAPI סטנדרטי. אין לפרסם כאובייקט תקין.",
});
Object.assign(PPPI_ENRICHMENT, {
  BAPI_ROUTING_GETDETAIL: bad("BAPI_ROUTING_GETDETAIL",
    "אינו קיים. אין BAPI לקריאת מסלול. ליצירה: BAPI_ROUTING_CREATE · לקריאה: טבלאות PLKO·PLPO·MAPL·PLAS.",
    "Does not exist. No routing-read BAPI. Create: BAPI_ROUTING_CREATE · read: tables PLKO/PLPO/MAPL/PLAS.",
    ["BAPI_ROUTING_CREATE"]),
  BOMMAT: bad("BOMMAT", "שם מבנה/טבלה של נתוני BOM — אינו FM. טבלאות אמת: STKO·STPO·MAST.", "A BOM data structure/table name, not an FM. Real tables: STKO/STPO/MAST.", ["CSAP_MAT_BOM_MAINTAIN"]),
  PPCC1: bad("PPCC1", "קוד טרנזקציה — אינו FM.", "A transaction code, not an FM.", []),
  "Control Recipe": bad("Control Recipe", "מושג עסקי/IDoc של PP-PI (מתכון בקרה) — אינו FM ניתן לקריאה.", "A PP-PI business object / IDoc (control recipe), not a callable FM.", []),
  RFC_READ_TABLE: {
    verificationStatus: "internal-unsupported", confidence: "high", verificationSource: SD, lastVerified: LV,
    shortDescriptionHe: "FM שירות גנרי לקריאת טבלה דרך RFC — אינו אובייקט עסקי של PP. הימנע בפרודקשן; חלופה: CDS/OData או קריאה ייעודית.",
    shortDescriptionEn: "Generic RFC table-read utility FM — not a PP business object. Avoid in production; prefer CDS/OData or a dedicated read.",
    qaNotes: "כלי-עזר בלבד. אינו נתמך כממשק אינטגרציה יציב; מגבלות אורך שדה ואבטחה.",
  },
  VIEW_MAINTENANCE_CALL: {
    verificationStatus: "internal-unsupported", confidence: "high", verificationSource: SD, lastVerified: LV,
    shortDescriptionHe: "FM גנרי לתחזוקת טבלאות (SM30) — אינו אובייקט עסקי של PP.",
    shortDescriptionEn: "Generic table-maintenance (SM30) utility FM — not a PP business object.",
    qaNotes: "כלי-עזר של Dictionary. לא לשימוש כ-API עסקי.",
  },
});
