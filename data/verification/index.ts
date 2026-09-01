/* Project NEO · verification overlays — the app-side merge.
   Throws AT MODULE LOAD on a duplicate id: the same guard the schema test
   runs, so `next build` fails loudly too. Tests never load this file (it has
   value imports); they load the eight catalog files directly and assert this
   file imports exactly that set. */
import type { CanonicalId, RegistryEntry, VerificationRecord } from "@/lib/evidence/types";
import { TABLE_VERIFICATION } from "./tables";
import { TX_VERIFICATION } from "./transactions";
import { FM_VERIFICATION } from "./functions";
import { IDOC_BASIC_TYPES, IDOC_VERIFICATION } from "./idocs";
import { CDS_VERIFICATION } from "./cds";
import { FIORI_VERIFICATION } from "./fiori";
import { ENH_VERIFICATION } from "./enhancements";
import { OBJECT_REGISTRY, OBJECT_VERIFICATION } from "./objects";

const ALL: VerificationRecord[] = [
  ...TABLE_VERIFICATION,
  ...TX_VERIFICATION,
  ...FM_VERIFICATION,
  ...IDOC_VERIFICATION,
  ...CDS_VERIFICATION,
  ...FIORI_VERIFICATION,
  ...ENH_VERIFICATION,
  ...OBJECT_VERIFICATION,
];

export const OVERLAYS: Record<CanonicalId, VerificationRecord> = (() => {
  const out: Record<CanonicalId, VerificationRecord> = {};
  for (const r of ALL) {
    if (out[r.id]) throw new Error(`data/verification: duplicate overlay id ${r.id}`);
    out[r.id] = r;
  }
  return out;
})();

export const REGISTRY: RegistryEntry[] = (() => {
  const merged = [...OBJECT_REGISTRY, ...IDOC_BASIC_TYPES];
  const seen = new Set<string>();
  for (const e of merged) {
    if (seen.has(e.id)) throw new Error(`data/verification: duplicate registry id ${e.id}`);
    seen.add(e.id);
  }
  return merged;
})();
