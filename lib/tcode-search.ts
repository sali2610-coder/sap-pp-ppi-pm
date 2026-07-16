// Transaction Intelligence search index + T-Code cross-links (Phase 4).
// Merges deep T-Codes (transactions.ts) + broad directory (tcode-directory.ts),
// tables, incidents(errors), objects — into one slim index for intelligent search.

import { TRANSACTIONS } from "@/data/transactions";
import { TCODE_DIRECTORY, tcodeDirByCode } from "@/data/tcode-directory";
import { TX_INTEL } from "@/data/tx-intel";
import { TCODE_CATALOG } from "@/data/tcode-catalog";
import { ALL_TABLES } from "@/data/sapData";
import { INCIDENTS } from "@/data/troubleshooting";
import { EXITS } from "@/data/exits";
import { OIC_OBJECTS } from "@/lib/cross-links";
import { CDS_VIEWS } from "@/data/cds-map";
import { FIORI_APPS } from "@/data/centers/fiori";

export interface SearchHit { kind: "tcode" | "table" | "error" | "object" | "cds" | "fiori"; code: string; label: string; sub: string; href: string; terms: string }
export interface SlimTcode { code: string; domain: string; he: string; purpose: string; deep: boolean; href: string }

const deepCodes = new Set(TRANSACTIONS.map((t) => t.code.toUpperCase()));
const dirCodes = new Set(TCODE_DIRECTORY.map((t) => t.code.toUpperCase()));
const txCat = TX_INTEL; // deep Transaction Intelligence pages (/tcode/<code>/)
// ONE canonical per-transaction page: /tcode/<code>/. Any code present in any
// verified source resolves there (the registry/route merges them all). Legacy
// /transactions/<code>/ and /tcode-dir/<slug>/ routes were removed in P3.
export const tcodeHref = (code: string) => { const c = code.toUpperCase(); return (txCat[c] || deepCodes.has(c) || dirCodes.has(c)) ? `/tcode/${encodeURIComponent(c)}/` : ""; };

// merged unique T-Code list — all resolve to the single /tcode/<code>/ page
export function allTcodesMerged(): SlimTcode[] {
  const map = new Map<string, SlimTcode>();
  const href = (c: string) => `/tcode/${encodeURIComponent(c.toUpperCase())}/`;
  for (const c of Object.keys(txCat)) { const t = txCat[c]; map.set(c, { code: t.code, domain: t.module, he: t.area || t.descHe, purpose: t.descHe, deep: true, href: href(c) }); }
  for (const t of TRANSACTIONS) { const k = t.code.toUpperCase(); if (!map.has(k)) map.set(k, { code: t.code, domain: t.module, he: t.title, purpose: t.purpose, deep: true, href: href(k) }); }
  for (const t of TCODE_DIRECTORY) { const k = t.code.toUpperCase(); if (!map.has(k)) map.set(k, { code: t.code, domain: t.domain, he: t.he, purpose: t.purpose, deep: false, href: href(k) }); }
  return [...map.values()];
}

export function buildSearchIndex(): SearchHit[] {
  const out: SearchHit[] = [];
  // T-Codes (Transaction Intelligence catalog → deep → directory)
  const seen = new Set<string>();
  for (const c of Object.keys(txCat)) { const t = txCat[c]; seen.add(c); out.push({ kind: "tcode", code: t.code, label: t.code, sub: `${t.area} · ${t.module}`, href: `/tcode/${encodeURIComponent(c)}/`, terms: `${t.code} ${t.area} ${t.descHe} ${t.process} ${(t.users || []).join(" ")} ${(t.tables || []).join(" ")} ${t.module}`.toLowerCase() }); }
  for (const t of TRANSACTIONS) { const k = t.code.toUpperCase(); if (seen.has(k)) continue; seen.add(k); out.push({ kind: "tcode", code: t.code, label: t.code, sub: `${t.title} · ${t.module}`, href: `/tcode/${encodeURIComponent(k)}/`, terms: `${t.code} ${t.title} ${t.purpose} ${t.topic} ${(t.objects || []).join(" ")} ${(t.tables || []).join(" ")}`.toLowerCase() }); }
  for (const t of TCODE_DIRECTORY) { const k = t.code.toUpperCase(); if (seen.has(k)) continue; seen.add(k); out.push({ kind: "tcode", code: t.code, label: t.code, sub: `${t.he} · ${t.domain}`, href: `/tcode/${encodeURIComponent(k)}/`, terms: `${t.code} ${t.he} ${t.purpose} ${t.keywords.join(" ")} ${t.domain}`.toLowerCase() }); }
  for (const t of TCODE_CATALOG) { const k = t.code.toUpperCase(); if (seen.has(k)) continue; seen.add(k); out.push({ kind: "tcode", code: t.code, label: t.code, sub: `${t.he} · ${t.module}`, href: `/tcode/${encodeURIComponent(k)}/`, terms: `${t.code} ${t.he} ${t.en} ${t.area} ${t.module}`.toLowerCase() }); }
  // Tables
  for (const t of ALL_TABLES) out.push({ kind: "table", code: t.tableName, label: t.tableName, sub: t.descriptionHe || t.descriptionEn || "", href: `/object/${encodeURIComponent(t.tableName)}/`, terms: `${t.tableName} ${t.descriptionHe} ${t.descriptionEn}`.toLowerCase() });
  // Errors (incidents)
  for (const i of INCIDENTS) out.push({ kind: "error", code: i.slug, label: i.he, sub: (i.error && i.error !== "—" ? i.error : i.module), href: `/troubleshooting/${i.slug}/`, terms: `${i.he} ${i.symptom} ${i.error || ""} ${i.analyzeTcodes.join(" ")} ${i.tables.join(" ")} ${(i.notes || []).join(" ")}`.toLowerCase() });
  // Objects (OIC)
  for (const o of OIC_OBJECTS) out.push({ kind: "object", code: o.slug, label: o.he, sub: `${o.title} · ${o.module}`, href: `/oic/${o.slug}/`, terms: `${o.he} ${o.title} ${o.table} ${o.description}`.toLowerCase() });
  // CDS Views
  for (const v of CDS_VIEWS) out.push({ kind: "cds", code: v.view, label: v.view, sub: `${v.he} · ${v.tables.join(", ")}`, href: `/cds/${encodeURIComponent(v.view)}/`, terms: `${v.view} ${v.he} ${v.tables.join(" ")} cds`.toLowerCase() });
  // Fiori apps
  for (const f of FIORI_APPS) out.push({ kind: "fiori", code: f.slug, label: f.title, sub: f.he, href: `/fiori/${f.slug}/`, terms: `${f.title} ${f.he} ${f.sub} fiori`.toLowerCase() });
  return out;
}

// Cross-links for a directory T-Code detail page
export interface TcodeLinks { incidents: { label: string; href: string }[]; exits: { label: string; href: string }[]; related: { label: string; href: string }[]; tables: { label: string; href: string }[] }
export function tcodeDirLinks(code: string): TcodeLinks {
  const cu = code.toUpperCase();
  const dir = tcodeDirByCode(code);
  const incidents = INCIDENTS.filter((i) => i.analyzeTcodes.some((c) => c.toUpperCase() === cu)).slice(0, 12).map((i) => ({ label: i.he, href: `/troubleshooting/${i.slug}/` }));
  const exits = EXITS.filter((e) => e.tcodes.some((c) => c.toUpperCase() === cu)).slice(0, 10).map((e) => ({ label: e.name, href: `/exits/${e.name.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "")}/` }));
  const related = TCODE_DIRECTORY.filter((t) => dir && t.domain === dir.domain && t.code !== code).slice(0, 14).map((t) => ({ label: t.code, href: tcodeHref(t.code) }));
  // tables whose name appears in keywords, or keyword matches a table name
  const kw = new Set((dir?.keywords || []).map((k) => k.toUpperCase()));
  const tables = ALL_TABLES.filter((t) => kw.has(t.tableName.toUpperCase())).slice(0, 10).map((t) => ({ label: t.tableName, href: `/object/${encodeURIComponent(t.tableName)}/` }));
  return { incidents, exits, related, tables };
}
