/* Project NEO · verification overlay — IDoc message types (`idoc:msg:`) and
   the IDoc basic-type registry (`idoc:basic:`).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Foundation state: one worked example, repository-verified ONLY (see tables.ts).
   The basic-type registry lists ONLY names the repository itself records:
   MATMAS05 appears in the PP-PI blueprint ("MATMAS (MATMAS05)"), in
   data/function-intel.ts and in data/bapi-enrichment.sweep.ts. */
import type { RegistryEntry, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";

export const IDOC_BASIC_TYPES: RegistryEntry[] = [
  {
    id: "idoc:basic:MATMAS05",
    he: "סוג בסיסי (Basic Type) של הודעת אב החומר MATMAS",
    en: "MATMAS05 basic type",
    members: ["idoc:msg:MATMAS"],
  },
];

export const IDOC_VERIFICATION: VerificationRecord[] = [
  {
    id: "idoc:msg:MATMAS",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "סריקת האימות של אובייקטי הפונקציה (sweep)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MATMAS הוא סוג הודעת IDoc להפצת נתוני אב חומר (גרסאות בסיס MATMAS05 ו-MATMAS06) דרך ALE או EDI, " +
          "ואינו Function Module.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.sweep.ts#MATMAS",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האינטליגנציה של אובייקטי הפונקציה",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "סוג ההודעה זמין ב-ECC (ALE) וזמין ב-S/4HANA; לפי הרשומה, לתרחישים חדשים מומלץ OData API_PRODUCT " +
          "ויש לשים לב לאורך שדה MATNR (40 תווים).",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#MATMAS",
      },
    ],
    xrefs: ["table:MARA", "table:MARC", "cds:I_Product", "idoc:basic:MATMAS05"],
    lastVerifiedAt: DATE,
    notes: "רשומת עבודה של שלב היסוד: ראיות מן המאגר בלבד.",
  },
];
