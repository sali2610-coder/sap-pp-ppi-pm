// Canonical SAP transaction registry — merges every verified source into one
// deduplicated, normalized map keyed by uppercase code:
//   • TX_INTEL          — deep intelligence (full model)            → /tcode/<c>/
//   • TRANSACTIONS      — 14-column authored deep set               → /tcode/<c>/ (or /transactions)
//   • TCODE_DIRECTORY   — broad consultant directory (light)        → /tcode/<c>/
//   • TCODE_CATALOG     — verified breadth catalog (code+title)     → /tcode/<c>/
// Priority for title/module when a code appears in several sources: deep first.
import { TX_INTEL } from "@/data/tx-intel";
import { TRANSACTIONS } from "@/data/transactions";
import { TCODE_DIRECTORY } from "@/data/tcode-directory";
import { TCODE_CATALOG } from "@/data/tcode-catalog";

export type TxDepth = "deep" | "light";
export interface RegistryTx {
  code: string;
  module: string;
  area: string;
  he: string;      // short title / area label
  depth: TxDepth;  // deep = full intelligence page; light = verified breadth entry
  href: string;
}

let _reg: Map<string, RegistryTx> | null = null;

function build(): Map<string, RegistryTx> {
  const m = new Map<string, RegistryTx>();
  const put = (code: string, e: Omit<RegistryTx, "code" | "href">, override = false) => {
    const k = (code || "").toUpperCase().trim();
    if (!k) return;
    if (m.has(k) && !override) return;
    m.set(k, { code: k, href: `/tcode/${encodeURIComponent(k)}/`, ...e });
  };
  // deep first (wins)
  for (const k of Object.keys(TX_INTEL)) { const t = TX_INTEL[k]; put(k, { module: t.module, area: t.area || "", he: t.area || t.descHe, depth: "deep" }, true); }
  for (const t of TRANSACTIONS) { const k = t.code.toUpperCase(); if (!m.has(k)) put(k, { module: t.module, area: t.topic, he: t.title, depth: "deep" }); }
  // light breadth
  for (const t of TCODE_DIRECTORY) { if (!m.has(t.code.toUpperCase())) put(t.code, { module: t.domain, area: t.purpose, he: t.he, depth: "light" }); }
  for (const t of TCODE_CATALOG) { if (!m.has(t.code.toUpperCase())) put(t.code, { module: t.module, area: t.area, he: t.he, depth: "light" }); }
  return m;
}

export function txRegistry(): Map<string, RegistryTx> { return (_reg ??= build()); }
export const registryTx = (code: string): RegistryTx | undefined => txRegistry().get((code || "").toUpperCase());
export const registryCodes = (): string[] => [...txRegistry().keys()];
export const registryStats = () => {
  const all = [...txRegistry().values()];
  const byModule: Record<string, number> = {};
  all.forEach((t) => { byModule[t.module] = (byModule[t.module] || 0) + 1; });
  return { total: all.length, deep: all.filter((t) => t.depth === "deep").length, light: all.filter((t) => t.depth === "light").length, byModule };
};
