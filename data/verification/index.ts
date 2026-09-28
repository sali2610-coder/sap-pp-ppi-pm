/* Project NEO · verification overlays — the app-side merge.
   Throws AT MODULE LOAD on a duplicate id: the same guard the schema test
   runs, so `next build` fails loudly too. Tests never load this file (it has
   value imports); they load the eight catalog files directly and assert this
   file imports exactly that set. */
import type { CanonicalId, RegistryEntry, VerificationRecord } from "@/lib/evidence/types";
import { TABLE_VERIFICATION } from "./tables";
import { TX_VERIFICATION } from "./transactions";
import { TX_VERIFICATION_B } from "./transactions-b";
import { TX_VERIFICATION_C } from "./transactions-c";
import { TX_VERIFICATION_D } from "./transactions-d";
import { TX_VERIFICATION_E } from "./transactions-e";
import { TX_VERIFICATION_AUTO } from "./transactions-auto";
import { FM_VERIFICATION } from "./functions";
import { IDOC_BASIC_TYPES, IDOC_VERIFICATION } from "./idocs";
import { CDS_VERIFICATION } from "./cds";
import { FIORI_VERIFICATION } from "./fiori";
import { ENH_VERIFICATION } from "./enhancements";
import { OBJECT_REGISTRY, OBJECT_VERIFICATION } from "./objects";

// A researched record supersedes the generated evidence record for the same code
// (transactions-auto.ts is regenerated, never hand-edited), so a research chain can
// write any code without first deleting it from the generated shard.
const RESEARCHED_TX = new Set([...TX_VERIFICATION, ...TX_VERIFICATION_B, ...TX_VERIFICATION_C, ...TX_VERIFICATION_D, ...TX_VERIFICATION_E].map((r) => r.id));
const TX_AUTO = TX_VERIFICATION_AUTO.filter((r) => !RESEARCHED_TX.has(r.id));

const ALL: VerificationRecord[] = [
  ...TABLE_VERIFICATION,
  ...TX_VERIFICATION,
  ...TX_VERIFICATION_B,
  ...TX_VERIFICATION_C,
  ...TX_VERIFICATION_D,
  ...TX_VERIFICATION_E,
  ...TX_AUTO,
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
