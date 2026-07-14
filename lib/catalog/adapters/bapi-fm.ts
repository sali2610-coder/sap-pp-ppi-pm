/**
 * BAPI/FM adapter — turns the curated function dataset into universal CatalogObjects
 * (Plan §9). The first of many adapters; future kinds (tables, CDS, IDocs, …) plug
 * into the same registry with zero UI change.
 */
import type { CatalogObject } from "@/lib/catalog/types";
import { listFuncs, funcIntel } from "@/lib/object-intel";
import { fnIntel } from "@/data/function-intel";
import { trustFor, typeFor, commitFor, INVALID_NAMES } from "@/data/function-trust";
import { scoreComplexity, deriveSignals } from "@/lib/complexity";

function build(name: string): CatalogObject | null {
  if (INVALID_NAMES.has(name)) return null;
  const intel = funcIntel(name);
  const fn = fnIntel(name);
  const inferred = !!fn?.inferred;
  const kind = intel?.kind === "BAPI" || /^BAPI_/.test(name) ? "bapi" : "fm";
  const commit = commitFor(name);
  const type = typeFor(name, inferred);
  const trust = trustFor(name, inferred);
  const module = fn?.module || intel?.modules?.[0] || "—";
  const purpose = fn?.what || intel?.he || "";
  const complexity = fn ? scoreComplexity(deriveSignals(fn, commit)) : undefined;

  return {
    id: `${kind}:${name}`,
    name,
    kind,
    module,
    process: fn?.processArea,
    purpose,
    type,
    trust,
    commit,
    complexity,
    ecc: fn?.ecc,
    s4: fn?.s4,
    detailHref: `/bapi/${encodeURIComponent(name)}/`,
  };
}

export function bapiFmObjects(): CatalogObject[] {
  const names = [...new Set([...listFuncs("BAPI"), ...listFuncs("FM")])];
  return names.map(build).filter((o): o is CatalogObject => o !== null);
}
