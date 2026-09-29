// Canonical PRIMARY module ownership for SAP objects — verified standard SAP
// table ownership (not invented). Fixes cross-module misclassification: objects
// pulled into a PM / PP-PI blueprint keep the blueprint's module tag, but their
// TRUE owning module is elsewhere (e.g. MKPF/MSEG/MATDOC are MM-IM, not PM).
//
// Rule: show the honest primary owner + the module the user reached it through.
// If a table isn't listed here, we trust the dataset's own module tag.

export const PRIMARY_MODULE: Record<string, string> = {
  // ── MM · material master ──
  MARA: "MM", MARC: "MM", MARD: "MM", MARM: "MM", MAKT: "MM", MBEW: "MM", MVKE: "MM",
  MLAN: "MM", MEAN: "MM", MDMA: "MM", MPGD: "MM",
  // ── MM · inventory management (material documents) ──
  MKPF: "MM", MSEG: "MM", MATDOC: "MM",
  // ── MM · procurement ──
  EBAN: "MM", EBKN: "MM", EKKO: "MM", EKPO: "MM", EKET: "MM", EKBE: "MM", EKKN: "MM",
  EINA: "MM", EINE: "MM", RBKP: "MM", RSEG: "MM", LFA1: "MM", LFB1: "MM", LFM1: "MM",
  T001W: "MM", T001L: "MM",
  // ── Batch management ──
  MCH1: "BATCH", MCHA: "BATCH", MCHB: "BATCH",
  // ── Classification ──
  KLAH: "CLASS", KLAT: "CLASS", KSSK: "CLASS", KSML: "CLASS", AUSP: "CLASS",
  CABN: "CLASS", CABNT: "CLASS", CAWN: "CLASS", CAWNT: "CLASS", INOB: "CLASS",
  // ── FI / CO ──
  BKPF: "FI", BSEG: "FI", ACDOCA: "FI", SKA1: "FI", SKB1: "FI", T001: "FI",
  COEP: "CO", COSP: "CO", COSS: "CO", CSKS: "CO", CSKA: "CO", CSLA: "CO", COBRA: "CO", COBRB: "CO",
  // ── SD ──
  VBAK: "SD", VBAP: "SD", LIKP: "SD", LIPS: "SD", VBRK: "SD", VBRP: "SD", KNA1: "SD", ADRC: "SD",
};

export const MODULE_HE: Record<string, string> = {
  MM: "ניהול חומרים / מלאי", "PP-PI": "ייצור תהליכי", PP: "תכנון ייצור", PM: "תחזוקת מפעל",
  QM: "ניהול איכות", SD: "מכירות והפצה", FI: "הנהלת חשבונות", CO: "בקרת עלויות",
  BATCH: "ניהול אצוות", CLASS: "מערכת סיווג", HR: "משאבי אנוש", BW: "Analytics", CS: "שירות לקוחות",
};

/** True primary module for a table; falls back to the dataset tag when unknown. */
export function primaryModule(name: string, fallback = ""): string {
  return PRIMARY_MODULE[(name || "").toUpperCase()] || fallback;
}

/** Cross-module classification: the honest owner + the module reached through
 *  (contextMod), when they differ. */
export function moduleContext(name: string, datasetMod: string, contextMod?: string) {
  const primary = primaryModule(name, datasetMod);
  const related = [datasetMod, contextMod].filter((m): m is string => !!m && m !== primary);
  return { primary, primaryHe: MODULE_HE[primary] || primary, related: [...new Set(related)] };
}
