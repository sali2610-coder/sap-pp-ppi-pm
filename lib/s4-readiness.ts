// S/4HANA Readiness Engine — computes per-module readiness from REAL metadata.
// No hardcoded percentages. Joins the canonical dataset tables with the curated
// layers (S4_IMPACT, ECC_S4_TOPICS, CDS map, migration objects, object catalog,
// architecture, landscape tags) and derives score / band / risk / effort.

import { S4_IMPACT } from "@/data/s4-impact";
import { cdsForTable } from "@/data/cds-map";
import { MIG_OBJECTS } from "@/data/migration-cockpit";
import { catalogByName } from "@/lib/s4-catalog";
import { ECC_S4_TOPICS } from "@/data/ecc-s4";

export type Band = "ECC Only" | "Hybrid" | "S/4 Ready" | "Cloud Ready";
export interface RTbl { name: string; mod: string; tcodes?: string; fiori?: string; cds?: string[]; s4?: string; rel?: unknown[]; landscape?: string }
export interface ModuleReadiness {
  mod: string; he: string; tables: number;
  fioriPct: number; cdsPct: number; s4Pct: number; deprecatedPct: number;
  migrationObjs: number; simplification: number;
  score: number; band: Band; color: string;
  risk: "high" | "medium" | "low"; complexity: "XL" | "L" | "M" | "S"; effort: string;
  customCodeImpact: number; dataModelImpact: number;
}

export const MOD_HE: Record<string, string> = {
  PM: "תחזוקת מפעל", PP: "תכנון ייצור", "PP-PI": "ייצור תהליכי", MM: "ניהול חומרים", SD: "מכירות והפצה",
  FI: "חשבונאות פיננסית", CO: "בקרה", QM: "ניהול איכות", CS: "שירות לקוחות", BW: "Business Warehouse",
  HR: "משאבי אנוש", IDOC: "IDoc / ALE", PIPO: "ממשקי PI/PO", CLASS: "מערכת סיווג", BATCH: "ניהול אצוות",
};
const ALL_MODS = ["PM", "PP", "PP-PI", "MM", "SD", "FI", "CO", "QM", "CS", "BW", "HR", "IDOC", "PIPO", "CLASS", "BATCH"];

const pct = (n: number, d: number) => (d > 0 ? Math.round((n / d) * 100) : 0);
const bandColor = (s: number) => (s >= 75 ? "#16a34a" : s >= 55 ? "#eab308" : s >= 35 ? "#f97316" : "#dc2626");

function moduleScore(tables: RTbl[], mod: string): ModuleReadiness {
  const n = tables.length;
  const cloudLand = tables.filter((t) => t.landscape && /SF|SAC|Datasphere/i.test(t.landscape)).length;
  const withFiori = tables.filter((t) => (t.fiori || "").trim()).length;
  const withCds = tables.filter((t) => (t.cds && t.cds.length > 0) || cdsForTable(t.name).length > 0).length;
  const withS4 = tables.filter((t) => (t.s4 || "").trim() || S4_IMPACT[t.name] || catalogByName(t.name)).length;
  const deprecated = tables.filter((t) => { const c = catalogByName(t.name); return c && (c.status === "removed" || c.status === "replaced"); }).length;
  const migrationObjs = MIG_OBJECTS.filter((m) => m.module === mod || m.ecc.some((e) => tables.some((t) => t.name === e))).length;
  const simplification = ECC_S4_TOPICS.filter((tp) => tp.area === mod || (tp.area === "Data" && (mod === "FI" || mod === "MM" || mod === "CO"))).length;

  const fioriPct = pct(withFiori, n), cdsPct = pct(withCds, n), s4Pct = pct(withS4, n), deprecatedPct = pct(deprecated, n);
  const cloudPct = pct(cloudLand, n);

  // A documentation-coverage score, and nothing else: the share of the module's
  // tables with a Fiori app (30%), with a CDS view (30%) and with an S/4HANA
  // note (25%), plus the share NOT marked replaced or removed (15%). No floor:
  // a fixed minimum for cloud-landscape modules was a number no table stated.
  const score = Math.min(100, Math.round(fioriPct * 0.3 + cdsPct * 0.3 + s4Pct * 0.25 + Math.max(0, 100 - deprecatedPct) * 0.15));

  // band
  let band: Band;
  if (cloudPct >= 50) band = "Cloud Ready";
  else if (score >= 70 && deprecatedPct < 25) band = "S/4 Ready";
  else if (score >= 35 || s4Pct > 0) band = "Hybrid";
  else band = "ECC Only";

  const customCodeImpact = deprecated;            // tables whose direct reads break Z code
  const dataModelImpact = deprecated + tables.filter((t) => catalogByName(t.name)?.status === "changed").length;
  const risk: ModuleReadiness["risk"] = deprecatedPct >= 30 || customCodeImpact >= 5 ? "high" : deprecatedPct >= 10 || customCodeImpact >= 2 ? "medium" : "low";
  const weight = n + tables.reduce((a, t) => a + (t.rel?.length || 0), 0) + deprecated * 3;
  const complexity: ModuleReadiness["complexity"] = weight >= 220 ? "XL" : weight >= 120 ? "L" : weight >= 50 ? "M" : "S";
  const effort = { XL: "12+ שבועות", L: "6-12 שבועות", M: "3-6 שבועות", S: "1-3 שבועות" }[complexity];

  return { mod, he: MOD_HE[mod] || mod, tables: n, fioriPct, cdsPct, s4Pct, deprecatedPct, migrationObjs, simplification, score, band, color: bandColor(score), risk, complexity, effort, customCodeImpact, dataModelImpact };
}

/** Only modules with at least one table in the dataset get a score. A module
 *  with none has no measured basis: it is listed by unmeasuredModules() and the
 *  page says so, instead of a number (PI/PO used to carry a hand-set 45). */
export function computeReadiness(allTables: RTbl[]): ModuleReadiness[] {
  const byMod: Record<string, RTbl[]> = {};
  for (const t of allTables) (byMod[t.mod] ||= []).push(t);
  const out: ModuleReadiness[] = [];
  for (const mod of ALL_MODS) {
    const tables = byMod[mod] || [];
    if (tables.length) out.push(moduleScore(tables, mod));
  }
  return out.sort((a, b) => b.score - a.score);
}

/** The listed modules the dataset holds no table for: no score, a visible gap. */
export const unmeasuredModules = (allTables: RTbl[]): { mod: string; he: string }[] => {
  const has = new Set(allTables.map((t) => t.mod));
  return ALL_MODS.filter((m) => !has.has(m)).map((mod) => ({ mod, he: MOD_HE[mod] || mod }));
};

export const overallReadiness = (mods: ModuleReadiness[]) => {
  const withTables = mods.filter((m) => m.tables > 0);
  return withTables.length ? Math.round(withTables.reduce((a, m) => a + m.score, 0) / withTables.length) : 0;
};
