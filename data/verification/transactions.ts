/* Project NEO · verification overlay — transactions (`tx:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Foundation state: one worked example, repository-verified ONLY (see tables.ts). */
import type { VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";

export const TX_VERIFICATION: VerificationRecord[] = [
  {
    id: "tx:MIGO",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הטרנזקציות בפרויקט (LIFECYCLE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MIGO פעילה ומרכזית ב-S/4HANA: תנועות הסחורה נרשמות ל-MATDOC, והיא החלופה לטרנזקציות ה-MB " +
          "שהוסרו (MB1A, MB1B, MB1C ודומותיהן). כחלופת Fiori רשומה Post Goods Movement (F0843).",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MIGO",
      },
    ],
    xrefs: ["table:MSEG", "table:MKPF", "fm:BAPI_GOODSMVT_CREATE", "fiori:F0843"],
    lastVerifiedAt: DATE,
    notes: "רשומת עבודה של שלב היסוד: ראיה אחת מן המאגר; תיעוד רשמי יתווסף בשלב האיסוף.",
  },
];
