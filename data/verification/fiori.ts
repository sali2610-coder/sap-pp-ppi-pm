/* Project NEO · verification overlay — Fiori apps (`fiori:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Foundation state: one worked example that exercises the HONEST path: a
   curated app id with no official library URL stays verification_required
   (rule fiori-no-id-or-url), so both evidence rows are recorded at that level.
   The known F2731/F5241 conflict is deliberately NOT resolved here; it opens
   the Fiori data commit as the first conflicting_sources record. */
import type { VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";

export const FIORI_VERIFICATION: VerificationRecord[] = [
  {
    id: "fiori:F0843",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר מזהה את היישום Post Goods Movement במזהה F0843. הרשומה מתוחזקת ידנית (curated), " +
          "והמזהה טרם אומת מול SAP Fiori Apps Reference Library.",
        verificationLevel: "verification_required",
        repoRef: "data/fiori/apps.ts#F0843",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הטרנזקציות בפרויקט (LIFECYCLE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שכבת מחזור החיים מציינת את Post Goods Movement (F0843) כחלופת ה-Fiori של MIGO ושל טרנזקציות " +
          "ה-MB שהוסרו. מקור פנימי נוסף לאותו מזהה, עדיין ללא הספרייה הרשמית.",
        verificationLevel: "verification_required",
        repoRef: "data/lifecycle.ts#MIGO",
      },
    ],
    xrefs: ["tx:MIGO", "table:MSEG"],
    lastVerifiedAt: DATE,
    notes:
      "שני מקורות פנימיים עצמאיים במאגר מסכימים על המזהה, אך רמת האימות תעלה רק עם קישור " +
      "ל-SAP Fiori Apps Reference Library בשלב האיסוף.",
  },
];
