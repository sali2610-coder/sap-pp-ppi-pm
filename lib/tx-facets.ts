// Transaction facets — Topic + Object classification for the master Transaction
// Center filters (P3 GOAL-1). This does NOT invent SAP facts: it organizes the
// ALREADY-VERIFIED transaction data (authored objects/tables/topic on
// data/transactions.ts, tables on tx-intel, area/he/en text on the catalog) into
// the controlled Topic/Object buckets the spec asks for. Classification is
// CONSERVATIVE — a tag is added only when a deterministic signal matches, so an
// unclassifiable code simply carries no tag (never a wrong one).

import { TX_INTEL } from "@/data/tx-intel";
import { TRANSACTIONS } from "@/data/transactions";
import { TCODE_CATALOG } from "@/data/tcode-catalog";

// Controlled vocabularies (the spec's lists; Favorites/Recently-Used are UI views).
export const TX_TOPICS = [
  "Master Data", "Orders", "Notifications", "Planning", "MRP", "Execution",
  "Confirmations", "Settlement", "Costing", "Printing", "Reports", "Monitoring",
  "Interfaces", "Analysis", "Customization", "Administration", "Utilities",
] as const;
export const TX_OBJECTS = [
  "Equipment", "Functional Location", "Order", "Notification", "Work Center",
  "Routing", "Recipe", "Material", "BOM", "Batch", "Maintenance Plan",
  "Measuring Point", "Production Version", "Resource", "Business Partner",
] as const;

type Rule = { tables?: string[]; re?: RegExp; kw?: string[] };

// Object detectors — table presence (strongest) → code pattern → text keyword.
const OBJ_RULES: [string, Rule][] = [
  ["Equipment", { tables: ["EQUI", "EQKT", "EQUZ", "EQST"], re: /^IE\d/i, kw: ["ציוד", "equipment"] }],
  ["Functional Location", { tables: ["IFLOT", "ILOA", "IFLOS"], re: /^IL\d/i, kw: ["מיקום פונקציונלי", "functional location"] }],
  ["Order", { tables: ["AUFK", "AFKO", "AFIH", "AFVC", "AFPO"], re: /^(IW3|CO0[12]|COR[12]|CO1[15])/i, kw: ["פקודת", "order"] }],
  ["Notification", { tables: ["QMEL", "QMFE", "QMIH"], re: /^IW2/i, kw: ["הודעת", "notification"] }],
  ["Work Center", { tables: ["CRHD", "CRTX", "CRCO"], re: /^(IR0|CR1[012])/i, kw: ["מרכז עבודה", "work center"] }],
  ["Routing", { tables: ["PLKO", "PLPO", "PLAS", "MAPL", "PLFL"], re: /^(IA0|CA0)/i, kw: ["רשימת פעולות", "routing", "task list", "מסלול"] }],
  ["Recipe", { re: /^C20/i, kw: ["מתכון", "recipe", "master recipe"] }],
  ["Material", { tables: ["MARA", "MARC", "MBEW", "MAKT"], re: /^MM0/i, kw: ["נתוני אב חומר", "material master"] }],
  ["BOM", { tables: ["STKO", "STPO", "MAST", "STAS"], re: /^CS0/i, kw: ["עץ מוצר", "bill of material"] }],
  ["Batch", { tables: ["MCH1", "MCHA", "MCHB"], re: /^MSC/i, kw: ["אצווה", "batch"] }],
  ["Maintenance Plan", { tables: ["MPLA", "MPOS", "MHIS", "MHIO"], re: /^IP\d/i, kw: ["תכנית אחזקה", "maintenance plan"] }],
  ["Measuring Point", { tables: ["IMPTT", "IMRG"], re: /^IK\d/i, kw: ["נקודת מדידה", "measuring"] }],
  ["Production Version", { tables: ["MKAL"], kw: ["גרסת ייצור", "production version"] }],
  ["Resource", { tables: ["CRC1", "CRCA"], re: /^CRC/i, kw: ["משאב", "resource"] }],
  ["Business Partner", { tables: ["BUT000", "IHPA"], kw: ["שותף עסקי", "business partner"] }],
];

// Topic detectors — code pattern + keyword (over area/desc/title/topic/he/en).
const TOP_RULES: [string, Rule][] = [
  ["Master Data", { re: /^(IE0|IL0|MM0[123]|CS0[123]|IA05|IP1|IK0[12]|CR01|CR02|CRC1|C20[12]|MSC1)/i, kw: ["נתוני אב", "master data"] }],
  ["Notifications", { re: /^IW2/i, kw: ["הודעת תקלה", "notification"] }],
  ["Orders", { re: /^(IW3|CO0[12]|COR[12])/i, kw: ["פקודת אחזקה", "פקודת תהליך", "process order", "maintenance order"] }],
  ["MRP", { re: /^MD0/i, kw: ["mrp", "תכנון דרישות", "requirements planning"] }],
  ["Confirmations", { re: /^(CO1[15]|COR[6K]|IW4|MFBF|MF47)/i, kw: ["אישור", "confirmation", "backflush", "דיווח ביצוע"] }],
  ["Settlement", { re: /^(KO8|CO88)/i, kw: ["התחשבנות", "settlement"] }],
  ["Costing", { re: /^(KK|CK)/i, kw: ["תמחיר", "costing"] }],
  ["Printing", { kw: ["הדפסה", "print", "shop paper"] }],
  ["Monitoring", { re: /^(COGI|CO24|COFC|SMQ|MD04)/i, kw: ["ניטור", "monitor", "worklist"] }],
  ["Interfaces", { re: /^(WE\d|BD\d|SXMB)/i, kw: ["idoc", "interface", "ממשק"] }],
  ["Planning", { re: /^(CM\d|MF50|MD4[36])/i, kw: ["תכנון קיבולת", "capacity", "planning table"] }],
  ["Execution", { re: /^(MB1|MIGO|COR6|MF42)/i, kw: ["תנועת מלאי", "goods movement", "שחרור", "release"] }],
  ["Reports", { re: /^(IW28|IW29|IW38|IW39|IH0|MB5|MCP)/i, kw: ["דוח", "report", "רשימה", "list"] }],
  ["Analysis", { re: /^(MCI|MC\.|MCP)/i, kw: ["ניתוח", "analysis", "pmis", "lis", "analytics"] }],
  ["Customization", { re: /^(O[A-Z]{2}\d?|SPRO)/i, kw: ["customizing", "קונפיגורציה", "img"] }],
  ["Administration", { re: /^(SM\d|SU\d|RZ\d|ST0)/i, kw: ["ניהול מערכת", "administration"] }],
  ["Utilities", { re: /^(SE\d|SA38|SM3[01])/i, kw: ["כלי", "utility"] }],
];

// Alias authored `objects[]` labels → the controlled TX_OBJECTS vocabulary.
const OBJ_ALIAS: Record<string, string> = {
  "task list": "Routing", "master recipe": "Recipe", "functional location": "Functional Location",
  "work center": "Work Center", "production version": "Production Version", "business partner": "Business Partner",
  "maintenance plan": "Maintenance Plan", "measuring point": "Measuring Point",
};
const OBJ_SET = new Set<string>(TX_OBJECTS);
const canonObject = (raw: string): string | null => {
  const t = (raw || "").trim();
  if (OBJ_SET.has(t)) return t;
  return OBJ_ALIAS[t.toLowerCase()] || null;
};

// Per-code evidence built once from the three verified sources.
interface Evidence { text: string; tables: string[]; objects: string[] }
let _ev: Map<string, Evidence> | null = null;
function evidence(): Map<string, Evidence> {
  if (_ev) return _ev;
  const m = new Map<string, Evidence>();
  const add = (code: string, text: string, tables: string[] = [], objects: string[] = []) => {
    const k = (code || "").toUpperCase().trim(); if (!k) return;
    const e = m.get(k) || { text: "", tables: [], objects: [] };
    e.text = `${e.text} ${text}`.toLowerCase();
    for (const t of tables) if (t) e.tables.push(t.toUpperCase());
    for (const o of objects) if (o) e.objects.push(o);
    m.set(k, e);
  };
  for (const k of Object.keys(TX_INTEL)) { const t = TX_INTEL[k]; add(k, `${t.area} ${t.descHe} ${t.process}`, t.tables || []); }
  for (const t of TRANSACTIONS) add(t.code, `${t.title} ${t.topic} ${t.purpose}`, t.tables || [], t.objects || []);
  for (const t of TCODE_CATALOG) add(t.code, `${t.he} ${t.en} ${t.area}`);
  _ev = m;
  return m;
}

const matches = (r: Rule, e: Evidence, code: string): boolean => {
  if (r.re && r.re.test(code)) return true;
  if (r.tables && r.tables.some((t) => e.tables.includes(t))) return true;
  if (r.kw && r.kw.some((k) => e.text.includes(k.toLowerCase()))) return true;
  return false;
};

let _facets: Map<string, { topics: string[]; objects: string[] }> | null = null;
function facetMap(): Map<string, { topics: string[]; objects: string[] }> {
  if (_facets) return _facets;
  const ev = evidence();
  const out = new Map<string, { topics: string[]; objects: string[] }>();
  for (const [code, e] of ev) {
    const objects = new Set<string>();
    for (const o of e.objects) { const c = canonObject(o); if (c) objects.add(c); }
    for (const [label, rule] of OBJ_RULES) if (matches(rule, e, code)) objects.add(label);
    const topics = new Set<string>();
    for (const [label, rule] of TOP_RULES) if (matches(rule, e, code)) topics.add(label);
    out.set(code, { topics: [...topics], objects: [...objects] });
  }
  _facets = out;
  return out;
}

/** Topic + Object tags for a transaction code (empty arrays when unclassifiable). */
export function facetsOf(code: string): { topics: string[]; objects: string[] } {
  return facetMap().get((code || "").toUpperCase()) || { topics: [], objects: [] };
}

/** Distinct topics/objects actually present across a set of codes, spec-order. */
export function presentFacets(codes: Iterable<string>): { topics: string[]; objects: string[] } {
  const t = new Set<string>(), o = new Set<string>();
  for (const c of codes) { const f = facetsOf(c); f.topics.forEach((x) => t.add(x)); f.objects.forEach((x) => o.add(x)); }
  return {
    topics: TX_TOPICS.filter((x) => t.has(x)),
    objects: TX_OBJECTS.filter((x) => o.has(x)),
  };
}
