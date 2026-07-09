// Reusable module-portal engine. PM & PP-PI are the reference implementation;
// every future SAP module (MM/SD/FI/QM/WM…) plugs into the SAME registry +
// derivation and inherits the identical documentation portal + design language.
import { PM_DATA } from "@/data/sapData.pm";
import { PPPI_DATA } from "@/data/sapData.pppi";
import { FLOWS, zoneOf } from "@/lib/studio-graph";
import { cdsForTable } from "@/data/cds-map";
import { classifyFunc, cleanFunc } from "@/lib/object-intel";
import { INCIDENTS } from "@/data/troubleshooting";
import type { SAPModuleData, SAPTable } from "@/lib/types";

export const MODULE_BY_SLUG: Record<string, SAPModuleData> = { pm: PM_DATA, "pp-pi": PPPI_DATA };
export const MODULE_SLUGS = Object.keys(MODULE_BY_SLUG);
export const moduleBySlug = (slug: string): SAPModuleData | undefined => MODULE_BY_SLUG[slug];
export const moduleTables = (m: SAPModuleData): SAPTable[] => m.topics.flatMap((tp) => tp.tables);
export const moduleAccent = (m: SAPModuleData) => (m.module === "PM" ? "#f97316" : "#6d28d9");

export type SectionMeta = { slug: string; he: string; en: string; icon: string; desc: string };
// Consistent structure across every module (official-SAP-docs style).
export const SECTIONS: SectionMeta[] = [
  { slug: "overview", he: "סקירה", en: "Overview", icon: "LayoutGrid", desc: "מה המודול מכסה, מבנה ונקודות כניסה." },
  { slug: "business-process", he: "תהליך עסקי", en: "Business Process", icon: "Workflow", desc: "הזרימה מקצה לקצה — אובייקט אחרי אובייקט." },
  { slug: "master-data", he: "נתוני אב", en: "Master Data", icon: "Boxes", desc: "הליבה שעליה נשען כל התהליך." },
  { slug: "transactions", he: "טרנזקציות", en: "Transactions", icon: "Terminal", desc: "T-Codes ראשיים ומשניים של המודול." },
  { slug: "tables", he: "טבלאות", en: "Tables", icon: "Table", desc: "מילון הנתונים המלא, מקובץ לפי נושא." },
  { slug: "bapis", he: "BAPIs / FMs", en: "Function Modules", icon: "Plug", desc: "ממשקי BAPI ו-Function Modules." },
  { slug: "cds", he: "CDS Views", en: "CDS Views", icon: "Sigma", desc: "תצוגות CDS של S/4HANA מעל הטבלאות." },
  { slug: "fiori", he: "Fiori Apps", en: "Fiori Apps", icon: "AppWindow", desc: "אפליקציות Fiori הקשורות." },
  { slug: "configuration", he: "תצורה", en: "Configuration", icon: "Settings", desc: "נקודות קונפיגורציה (SPRO) מרכזיות." },
  { slug: "integration", he: "אינטגרציה", en: "Integration", icon: "Cable", desc: "IDocs, ממשקים ונקודות אינטגרציה." },
  { slug: "troubleshooting", he: "תקלות", en: "Troubleshooting", icon: "AlertTriangle", desc: "תקלות נפוצות, שורש ופתרון." },
  { slug: "related", he: "אובייקטים קשורים", en: "Related Objects", icon: "GitBranch", desc: "קשרים חוצי-מודול." },
];
export const sectionBySlug = (slug: string) => SECTIONS.find((s) => s.slug === slug);
export const NAV_SECTIONS = SECTIONS.filter((s) => s.slug !== "overview");

const uniq = <T,>(a: T[]) => [...new Set(a)];
const incMatch = (m: SAPModuleData) => (mod: string) => (m.module === "PP-PI" ? mod === "PP-PI" || mod === "PP" : mod === m.module);

export type TableRow = { code: string; he: string; fields: number; s4?: string };
export type TopicGroup = { topic: string; rows: TableRow[] };

export function tablesByTopic(m: SAPModuleData): TopicGroup[] {
  return m.topics.map((tp) => ({
    topic: tp.title,
    rows: tp.tables.map((t) => ({ code: t.tableName, he: t.descriptionHe || t.descriptionEn || "", fields: t.fields.length, s4: t.s4AltTable ? "replaced" : /הוסר|בוטל|removed/i.test(t.s4Note || "") ? "removed" : "kept" })),
  }));
}

export function transactions(m: SAPModuleData): { code: string }[] {
  const split = (s: string) => (s || "").split(/[,\s/]+/).map((x) => x.trim().toUpperCase()).filter((x) => /^[A-Z][A-Z0-9_]{1,}$/.test(x));
  return uniq(moduleTables(m).flatMap((t) => split(t.tcodes))).sort().map((code) => ({ code }));
}

export function funcs(m: SAPModuleData, kinds: ("BAPI" | "FM" | "IDoc")[]): { name: string; kind: string }[] {
  const seen = new Map<string, string>();
  for (const t of moduleTables(m)) for (const [raw] of t.funcs || []) { const nm = cleanFunc(raw); if (!nm) continue; const k = classifyFunc(nm); if (kinds.includes(k as "BAPI" | "FM" | "IDoc") && !seen.has(nm)) seen.set(nm, k); }
  return [...seen.entries()].map(([name, kind]) => ({ name, kind })).sort((a, b) => a.name.localeCompare(b.name));
}

export function cdsViews(m: SAPModuleData): { view: string; tables: string[] }[] {
  const map = new Map<string, Set<string>>();
  for (const t of moduleTables(m)) for (const v of cdsForTable(t.tableName)) { if (!map.has(v.view)) map.set(v.view, new Set()); map.get(v.view)!.add(t.tableName); }
  return [...map.entries()].map(([view, s]) => ({ view, tables: [...s] })).sort((a, b) => a.view.localeCompare(b.view));
}

export function fioriApps(m: SAPModuleData): { app: string; table: string }[] {
  const seen = new Set<string>(); const out: { app: string; table: string }[] = [];
  for (const t of moduleTables(m)) if (t.fioriApp && !seen.has(t.fioriApp)) { seen.add(t.fioriApp); out.push({ app: t.fioriApp, table: t.tableName }); }
  return out;
}

export function masterData(m: SAPModuleData): TableRow[] {
  return moduleTables(m).filter((t) => zoneOf(t.tableName) === "master").map((t) => ({ code: t.tableName, he: t.descriptionHe || "", fields: t.fields.length }));
}

export function processSteps(m: SAPModuleData) {
  const flow = FLOWS[m.module] || [];
  const tset = new Set(moduleTables(m).map((t) => t.tableName));
  return flow.map((s) => ({ ...s, exists: tset.has(s.code) }));
}

export function configRows(m: SAPModuleData): string[][] {
  return (m.config?.rows || []).slice(0, 200);
}
export const configHeaders = (m: SAPModuleData) => m.config?.headers || [];

export function incidents(m: SAPModuleData) {
  const match = incMatch(m);
  return INCIDENTS.filter((i) => match(i.module)).map((i) => ({ slug: i.slug, he: i.he, symptom: i.symptom, impact: i.impact }));
}

export function relatedObjects(m: SAPModuleData): { code: string; he: string; module: string }[] {
  const own = new Set(moduleTables(m).map((t) => t.tableName));
  const seen = new Map<string, { code: string; he: string; module: string }>();
  for (const t of moduleTables(m)) for (const r of t.relations || []) if (!own.has(r.table) && !seen.has(r.table)) seen.set(r.table, { code: r.table, he: r.desc || "", module: "?" });
  return [...seen.values()];
}

export function overviewStats(m: SAPModuleData) {
  const tabs = moduleTables(m);
  return {
    tables: tabs.length,
    fields: tabs.reduce((a, t) => a + t.fields.length, 0),
    topics: m.topics.length,
    transactions: transactions(m).length,
    bapis: funcs(m, ["BAPI", "FM"]).length,
    idocs: funcs(m, ["IDoc"]).length,
    cds: cdsViews(m).length,
    fiori: fioriApps(m).length,
  };
}

// count shown on each Overview section card
export function sectionCount(m: SAPModuleData, slug: string): number {
  switch (slug) {
    case "business-process": return processSteps(m).length;
    case "master-data": return masterData(m).length;
    case "transactions": return transactions(m).length;
    case "tables": return moduleTables(m).length;
    case "bapis": return funcs(m, ["BAPI", "FM"]).length;
    case "cds": return cdsViews(m).length;
    case "fiori": return fioriApps(m).length;
    case "configuration": return configRows(m).length;
    case "integration": return funcs(m, ["IDoc", "BAPI"]).length;
    case "troubleshooting": return incidents(m).length;
    case "related": return relatedObjects(m).length;
    default: return 0;
  }
}
