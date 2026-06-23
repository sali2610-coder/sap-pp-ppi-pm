// Unified S/4 Object Catalog — merges the curated catalog with entries derived
// from already-verified datasets (S4_IMPACT, ECC_S4_TOPICS, TRANSACTIONS) into
// one searchable index of 100+ ECC→S/4 objects. Curated entries win on dedup.

import { S4_OBJECTS, type S4Obj, type S4Status } from "@/data/s4-objects";
import { S4_IMPACT } from "@/data/s4-impact";
import { ECC_S4_TOPICS, type ChangeStatus } from "@/data/ecc-s4";
import { TRANSACTIONS } from "@/data/transactions";

const STATUS_MAP: Record<ChangeStatus, S4Status> = { Unchanged: "stays", Changed: "changed", Replaced: "replaced", Deprecated: "removed" };

function fromImpact(): S4Obj[] {
  return Object.entries(S4_IMPACT).map(([name, im]) => ({
    name, kind: "Table" as const, he: name, status: (im.note || im.changed).match(/הוחלף|בוטל/) ? "replaced" : "changed" as S4Status,
    risk: (im.risk === "high" || im.risk === "medium" || im.risk === "low") ? im.risk : "medium",
    ecc: "", s4: im.changed, why: im.why, modules: ["Cross"],
    related: [...(im.cds || []), ...(im.tcodes || [])].slice(0, 6),
    checklist: im.qa, trust: im.trust === "verified" ? "curated" : "needs-verification",
  }));
}
function fromTopics(): S4Obj[] {
  return ECC_S4_TOPICS.map((t) => ({
    name: t.title, kind: (t.area === "Data" ? "Table" : "Framework") as S4Obj["kind"], he: t.he,
    status: STATUS_MAP[t.status], risk: t.status === "Replaced" || t.status === "Deprecated" ? "high" : "medium",
    ecc: t.ecc, s4: t.s4, why: t.simplification, modules: [t.area === "Data" ? "Cross" : t.area], related: [],
    checklist: t.impact ? [t.impact] : undefined, trust: "curated" as const,
  }));
}
function fromTcodes(): S4Obj[] {
  return TRANSACTIONS.map((t) => {
    const e = t.eccS4 || {};
    const status: S4Status = e.replaced ? "replaced" : e.changed ? "changed" : "stays";
    return {
      name: t.code, kind: "Tcode" as const, he: t.title, status,
      risk: e.replaced ? "medium" : "low" as S4Obj["risk"],
      ecc: "טרנזקציית SAP GUI", s4: t.fiori ? `Fiori: ${t.fiori}` : (e.replaced || e.changed || e.unchanged || "נתמך ב-S/4"),
      why: e.migration, modules: [t.module],
      related: [...(t.tables || []), ...(e.cds ? [e.cds] : [])].slice(0, 6),
      trust: t.inferred ? "needs-verification" : "curated",
    } as S4Obj;
  });
}

function dedupe(list: S4Obj[]): S4Obj[] {
  const seen = new Set<string>(); const out: S4Obj[] = [];
  for (const o of list) { const k = o.name.toUpperCase(); if (seen.has(k)) continue; seen.add(k); out.push(o); }
  return out;
}

// curated first → wins on dedup
export const S4_CATALOG: S4Obj[] = dedupe([...S4_OBJECTS, ...fromImpact(), ...fromTopics(), ...fromTcodes()]);

export const catalogByName = (name: string): S4Obj | undefined =>
  S4_CATALOG.find((o) => o.name.toUpperCase() === name.toUpperCase());

export function searchCatalog(q: string, limit = 40): S4Obj[] {
  const s = q.trim().toLowerCase();
  if (!s) return S4_CATALOG.slice(0, limit);
  return S4_CATALOG.filter((o) => `${o.name} ${o.he} ${o.ecc} ${o.s4} ${o.kind}`.toLowerCase().includes(s)).slice(0, limit);
}

export const catalogStats = () => ({
  total: S4_CATALOG.length,
  byKind: S4_CATALOG.reduce((a, o) => ((a[o.kind] = (a[o.kind] || 0) + 1), a), {} as Record<string, number>),
});
