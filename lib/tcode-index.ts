import { ALL_TABLES, MODULES } from "@/data/sapData";
import type { Module } from "@/lib/types";

export interface TCodeInfo {
  code: string;
  descHe: string;
  descEn: string;
  module: Module;
  tables: string[]; // associated table names
  href: string;
}

const TCODE_RE = /\b([A-Z]{2,4}\d{1,3}[A-Z]?)\b/g;

// Pre-index: tcode -> directory description (Hebrew), from the T-code dir sheets.
const DIR_DESC = new Map<string, string>();
for (const m of MODULES) {
  for (const row of m.tcodesDir?.rows ?? []) {
    // row: [#, code, scope, descHe, ...] — code at col1, desc at col3
    const codes = String(row[1] ?? "").toUpperCase().match(TCODE_RE) ?? [];
    const desc = String(row[3] ?? "");
    for (const c of codes) if (desc && !DIR_DESC.has(c)) DIR_DESC.set(c, desc);
  }
}

// Curated bilingual blurbs for the most-used PM/PP-PI transactions.
const BLURB: Record<string, { he: string; en: string }> = {
  IW21: { he: "יצירת הודעת אחזקה — משמש בעיקר טכנאי אחזקה לדיווח תקלה.", en: "Create Maintenance Notification — used primarily by maintenance technicians to report a malfunction." },
  IW22: { he: "שינוי הודעת אחזקה.", en: "Change Maintenance Notification." },
  IW23: { he: "תצוגת הודעת אחזקה.", en: "Display Maintenance Notification." },
  IW31: { he: "יצירת פקודת עבודה (פק\"ע) לאחזקה.", en: "Create Maintenance Work Order." },
  IW32: { he: "שינוי פקודת עבודה לאחזקה.", en: "Change Maintenance Work Order." },
  IW33: { he: "תצוגת פקודת עבודה לאחזקה.", en: "Display Maintenance Work Order." },
  IE01: { he: "יצירת ציוד (Equipment master).", en: "Create Equipment master record." },
  IE02: { he: "שינוי ציוד.", en: "Change Equipment." },
  IE03: { he: "תצוגת ציוד.", en: "Display Equipment." },
  IL01: { he: "יצירת מיקום פונקציונלי.", en: "Create Functional Location." },
  COR1: { he: "יצירת פק\"ע ייצור (Process Order).", en: "Create Process Order." },
  COR2: { he: "שינוי פק\"ע ייצור.", en: "Change Process Order." },
  CO11N: { he: "דיווח ביצוע פעולת ייצור (Confirmation).", en: "Confirm Production Operation." },
  MM01: { he: "יצירת אב חומר (Material master).", en: "Create Material master." },
  CS01: { he: "יצירת עץ מוצר (BOM).", en: "Create Bill of Material." },
  C201: { he: "יצירת מתכון ייצור (Master Recipe).", en: "Create Master Recipe." },
};

export function isTCodeQuery(q: string): boolean {
  return /^[A-Za-z]{2,4}\d{1,3}[A-Za-z]?$/.test(q.trim());
}

export function lookupTCode(query: string): TCodeInfo | null {
  const code = query.trim().toUpperCase();
  if (!isTCodeQuery(code)) return null;

  const tables: string[] = [];
  let module: Module | null = null;
  for (const t of ALL_TABLES) {
    if (t.tcodes.toUpperCase().includes(code)) {
      tables.push(t.tableName);
      if (!module) module = t.module;
    }
  }

  const blurb = BLURB[code];
  const dirDesc = DIR_DESC.get(code);
  if (!blurb && !dirDesc && tables.length === 0) return null;

  module = module ?? "PM";
  return {
    code,
    descHe: blurb?.he ?? dirDesc ?? "טרנזקציית SAP.",
    descEn: blurb?.en ?? dirDesc ?? "SAP transaction.",
    module,
    tables: [...new Set(tables)].slice(0, 8),
    href: `/${module === "PM" ? "pm" : "pp-pi"}/?q=${encodeURIComponent(tables[0] ?? code)}`,
  };
}
