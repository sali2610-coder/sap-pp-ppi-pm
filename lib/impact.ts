// SAP Impact & Dependency Center — per-object impact/migration analysis.
// Pure aggregation over existing layers (dataset relations, object intel, CDS
// map, S/4 layer, troubleshooting KB). No invented content. The impact score is
// a TRANSPARENT heuristic with a visible factor breakdown — not a black box.

import { ALL_TABLES, objectIntel } from "@/lib/data";
import { tableByName, kgraph } from "@/lib/knowledge-graph";
import { cdsForTable } from "@/data/cds-map";
import { s4For } from "@/lib/s4";
import { knowledgeFor } from "@/lib/knowledge";
import { INCIDENTS } from "@/data/troubleshooting";

export interface ScoreFactor { label: string; points: number; detail: string }
export interface ImpactReport {
  name: string;
  module: string;
  descHe: string;
  upstream: string[];
  downstream: string[];
  tcodes: string[];
  bapis: string[];
  cds: string[];
  s4Replacement?: string;
  s4Changed?: string;
  s4Why?: string;
  s4Risk: "high" | "medium" | "low" | "none";
  s4Trust: "verified" | "partial" | "needs";
  businessProcess?: string;
  process?: string;
  incidents: { slug: string; he: string; symptom: string }[];
  score: number;            // 0..100
  tier: "high" | "medium" | "low";
  factors: ScoreFactor[];
}

export function allImpactNames(): string[] {
  return ALL_TABLES.map((t) => t.tableName);
}

export function impactReport(name: string): ImpactReport | null {
  const t = tableByName(name);
  if (!t) return null;
  const g = kgraph(name);
  const intel = objectIntel(name);
  const st = s4For(name, t.s4Note, t.s4AltTable);
  const upstream = g?.upstream || [];
  const downstream = g?.downstream || [];
  const tcodes = intel?.tcodes || [];
  const bapis = intel?.bapis || [];
  const cds = cdsForTable(name).map((v) => v.view);
  const incidents = INCIDENTS.filter((i) => i.tables.includes(name)).map((i) => ({ slug: i.slug, he: i.he, symptom: i.symptom }));
  const k = knowledgeFor(name);

  // ---- transparent impact score ----
  const factors: ScoreFactor[] = [];
  const riskPts = st.risk === "high" ? 40 : st.risk === "medium" ? 25 : st.risk === "low" ? 10 : 5;
  factors.push({ label: "השפעת S/4", points: riskPts, detail: st.impact ? (st.risk === "high" ? "סיכון גבוה" : st.risk === "medium" ? "סיכון בינוני" : "השפעה נמוכה") : "אין הערה — נדרש אימות" });
  const blast = Math.min(30, downstream.length * 3);
  factors.push({ label: "רדיוס השפעה (תלויים מטה)", points: blast, detail: `${downstream.length} אובייקטים תלויים` });
  const coupling = Math.min(15, upstream.length * 2);
  factors.push({ label: "צימוד (תלות מעלה)", points: coupling, detail: `${upstream.length} תלויות` });
  const incPts = Math.min(15, incidents.length * 5);
  factors.push({ label: "תקלות ידועות", points: incPts, detail: `${incidents.length} תקלות מתועדות` });
  const score = Math.min(100, riskPts + blast + coupling + incPts);
  const tier: ImpactReport["tier"] = score >= 60 ? "high" : score >= 35 ? "medium" : "low";

  return {
    name, module: t.module, descHe: t.descriptionHe || t.descriptionEn,
    upstream, downstream, tcodes, bapis, cds,
    s4Replacement: t.s4AltTable || undefined,
    s4Changed: st.impact?.changed, s4Why: st.impact?.why,
    s4Risk: st.risk, s4Trust: st.trust,
    businessProcess: k?.step, process: intel?.process || t.topicTitle,
    incidents, score, tier, factors,
  };
}
