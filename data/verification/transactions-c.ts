/* Project NEO · S/4HANA verification overlay · transactions, shard C.
   ----------------------------------------------------------------------------
   Same contract as transactions.ts and transactions-b.ts (VerificationRecord[],
   see lib/evidence/types.ts). Opened on 2026-09-25 so the second half of the
   named-code queue (audit/master-completion/tx-chain-args-2.json) can run as its
   own research chain while chain B keeps transactions-b.ts: one writer per file.
   data/verification/index.ts merges all shards and throws on a duplicate id.
   Open repository conflicts live in audit/s4-enrichment/research-queue-transactions-c.md. */
import type { VerificationRecord } from "@/lib/evidence/types";

export const TX_VERIFICATION_C: VerificationRecord[] = [];
