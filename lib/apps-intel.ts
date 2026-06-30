// SAP Apps & Transactions Center — aggregation layer. Joins ALREADY-VERIFIED
// metadata into one object per transaction/app: tx-intel (deep per-tcode) +
// lifecycle (ECC→S/4 evolution) + the curated Fiori catalog + CDS map. NOTHING
// is invented here — pure joins over existing data. Powers the unified search,
// the object page, and compare mode.
import { TX_INTEL, type TxIntel } from "@/data/tx-intel";
import { lifecycle, type Lifecycle } from "@/data/lifecycle";
import { FIORI_APPS } from "@/data/centers/fiori";
import { cdsByView, cdsForTable } from "@/data/cds-map";
import type { CenterItem } from "@/components/topic-center";

// ---- Fiori catalog: lift the structured fields out of the curated CenterItems ----
export interface FioriApp { app: string; appId: string; gui: string[]; catalog: string; role: string; odata: string; cds: string; module: string; slug: string }
const sectionText = (it: CenterItem, title: string) => it.sections.find((s) => s.title === title)?.text || "";
export const FIORI: FioriApp[] = FIORI_APPS.map((it) => {
  const sub = it.sub || "";
  const guiRaw = sub.split("→")[0] || "";
  const appId = (sub.match(/\(([^)]+)\)\s*$/) || [])[1] || "";
  return {
    app: it.title || "",
    appId,
    gui: guiRaw.split("/").map((s) => s.trim()).filter(Boolean),
    catalog: sectionText(it, "Business Catalog"),
    role: sectionText(it, "Business Role"),
    odata: sectionText(it, "OData Service"),
    cds: sectionText(it, "CDS Source"),
    module: it.module || "",
    slug: it.slug,
  };
});
const FIORI_BY_GUI = new Map<string, FioriApp[]>();
for (const f of FIORI) for (const g of f.gui) { const a = FIORI_BY_GUI.get(g) || []; a.push(f); FIORI_BY_GUI.set(g, a); }

export const fioriForCode = (code: string): FioriApp[] => FIORI_BY_GUI.get(code.toUpperCase()) || [];

// ---- the unified object ----
export interface AppObject {
  code: string;
  intel: TxIntel;
  lc: Lifecycle;
  fiori: FioriApp[];        // Fiori apps that replace / relate to this tcode
  cdsViews: { view: string; he: string; consumption?: string; fiori?: string }[];
}

export const appCodes = (): string[] => Object.keys(TX_INTEL);

export function appObject(code: string): AppObject | null {
  const key = code.toUpperCase();
  const intel = TX_INTEL[key];
  if (!intel) return null;
  const lc = lifecycle(key);
  const fiori = fioriForCode(key);
  // CDS: from intel.cds (named views) + reverse from intel.tables
  const seen = new Set<string>();
  const cdsViews: AppObject["cdsViews"] = [];
  for (const v of intel.cds || []) { const cv = cdsByView(v); if (cv && !seen.has(cv.view)) { seen.add(cv.view); cdsViews.push({ view: cv.view, he: cv.he, consumption: cv.consumption, fiori: cv.fiori }); } }
  for (const t of intel.tables || []) for (const cv of cdsForTable(t)) if (!seen.has(cv.view)) { seen.add(cv.view); cdsViews.push({ view: cv.view, he: cv.he, consumption: cv.consumption, fiori: cv.fiori }); }
  return { code: key, intel, lc, fiori, cdsViews };
}

// criticality heuristic from verified signals (not invented): obsolete/high
// migration impact, or a process-central tcode with many links.
export function criticality(o: AppObject): { level: "high" | "medium" | "normal"; he: string } {
  if (o.lc.status === "Obsolete" || o.lc.impact === "High") return { level: "high", he: "השפעת מיגרציה גבוהה" };
  const links = (o.intel.before?.length || 0) + (o.intel.after?.length || 0) + (o.intel.together?.length || 0);
  if (o.lc.status === "Deprecated" || o.lc.impact === "Medium" || links >= 6) return { level: "medium", he: "תשומת לב במיגרציה" };
  return { level: "normal", he: "פעיל / יציב" };
}

// ---- unified search across tx + fiori + cds ----
export type SearchKind = "tx" | "fiori" | "cds";
export interface SearchHit { kind: SearchKind; code: string; label: string; sub: string; module: string; href: string; status?: string }

let _idx: SearchHit[] | null = null;
function buildIndex(): SearchHit[] {
  const out: SearchHit[] = [];
  for (const [code, t] of Object.entries(TX_INTEL)) {
    const lc = lifecycle(code);
    out.push({ kind: "tx", code, label: code, sub: t.descHe?.slice(0, 80) || t.area, module: t.module, href: `/apps/${encodeURIComponent(code)}/`, status: lc.status });
  }
  for (const f of FIORI) out.push({ kind: "fiori", code: f.appId || f.app, label: f.app, sub: `Fiori · ${f.appId} · GUI: ${f.gui.join(" / ")}`, module: f.module, href: f.gui[0] ? `/apps/${encodeURIComponent(f.gui[0])}/` : "/fiori-apps/" });
  return out;
}
export function searchApps(q: string, limit = 24): SearchHit[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  _idx ??= buildIndex();
  const scored = _idx
    .map((h) => {
      const hay = `${h.code} ${h.label} ${h.sub} ${h.module}`.toLowerCase();
      if (!hay.includes(s)) return null;
      // rank: exact code > code prefix > label > sub
      let score = 0;
      if (h.code.toLowerCase() === s) score = 100;
      else if (h.code.toLowerCase().startsWith(s)) score = 70;
      else if (h.label.toLowerCase().includes(s)) score = 40;
      else score = 10;
      return { h, score };
    })
    .filter(Boolean) as { h: SearchHit; score: number }[];
  scored.sort((a, b) => b.score - a.score || a.h.code.localeCompare(b.h.code));
  return scored.slice(0, limit).map((x) => x.h);
}

// featured entry points for the hub (verified, high-value daily-driver tcodes)
export const FEATURED: string[] = ["IW31", "IW32", "IE03", "IW38", "QM01", "COR1", "CO01", "MD04", "MIGO", "MM03", "CS03", "IP10"].filter((c) => TX_INTEL[c]);
