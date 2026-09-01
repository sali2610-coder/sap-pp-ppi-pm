/* Project NEO · verification overlay — function objects (`fm:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Foundation state: one worked example, repository-verified ONLY (see tables.ts). */
import type { VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";

export const FM_VERIFICATION: VerificationRecord[] = [
  {
    id: "fm:BAPI_TRANSACTION_COMMIT",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ביצוע COMMIT WORK חיצוני לאחר קריאות BAPI: הנתונים נשמרים במסד הנתונים רק לאחר קריאה זו. " +
          "לפי הרשומה: Released, RFC, קבוצת פונקציות BAPT (SAP_BASIS); נתמך ב-ECC וב-S/4HANA On-Premise. " +
          "יש להעביר WAIT='X' כאשר הנתונים נקראים מיד לאחר ה-COMMIT.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_TRANSACTION_COMMIT",
      },
    ],
    xrefs: ["fm:BAPI_TRANSACTION_ROLLBACK", "fm:BAPI_ALM_NOTIF_SAVE", "bp:bapi-commit-discipline"],
    lastVerifiedAt: DATE,
    notes:
      "רשומת עבודה של שלב היסוד. סימון released_api_available יינתן רק עם ראיה מ-api.sap.com; " +
      "עד אז הרשומה נשענת על נתוני המאגר בלבד.",
  },
];
