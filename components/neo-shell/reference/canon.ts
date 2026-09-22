/* Project NEO · the reference directories — ONE status per record.
   A row's pill is the resolver's answer (label, dot, key): the same three the
   detail page's evidence block renders, so a catalog row can never say what
   its page does not (design audit S5-2 / ACC-3). Structural, no dataset. */

import type { EvidenceBlockData } from "@/lib/evidence/types";
import type { RefStatus } from "./types";

export const canonStatus = (e: EvidenceBlockData): RefStatus => ({
  he: e.status.label,
  color: e.status.dot,
  key: e.status.key,
});
