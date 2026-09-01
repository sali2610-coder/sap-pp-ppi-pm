/* Project NEO · verification overlay — tables (`table:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Foundation state: one worked example, repository-verified ONLY. Every claim
   below is copied or condensed from the named repository record (repoRef);
   nothing asserts a new SAP fact. Official (Tier-1) sources arrive in the
   per-catalog data commits. */
import type { VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";

export const TABLE_VERIFICATION: VerificationRecord[] = [
  {
    id: "table:MSEG",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "פריטי מסמך חומר: הנתונים מאוחסנים ב-S/4HANA ב-MATDOC, ו-MSEG הופכת לתצוגת תאימות (NSDM_V_MSEG). " +
          "SELECT ישיר ממשיך לעבוד דרך התצוגה, אך ביצועים והרחבות שנשענו על המבנה הפיזי מושפעים.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#MSEG",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג אובייקטי ה-S/4HANA של הפרויקט (S4_OBJECTS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "S/4 1511",
        accessedAt: DATE,
        claim:
          "האיחוד של MSEG ל-MATDOC רשום בקטלוג תחת גרסת S/4 1511. כתיבה ישירה ל-MSEG אסורה; " +
          "תנועות נרשמות דרך MIGO או BAPI_GOODSMVT_CREATE בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-objects.ts#MSEG",
      },
    ],
    xrefs: ["table:MKPF", "tx:MIGO", "tx:MB51", "fm:BAPI_GOODSMVT_CREATE", "cds:I_MaterialDocumentItem"],
    lastVerifiedAt: DATE,
    notes:
      "רשומת עבודה של שלב היסוד: הראיות הן רשומות המאגר בלבד. קישור לפריט הפישוט הרשמי (MM-IM) " +
      "יתווסף בשלב האיסוף מול help.sap.com.",
  },
];
