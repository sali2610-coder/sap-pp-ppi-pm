/* Project NEO · verification overlay — enhancements (`enh:badi:` / `enh:exit:`
   / `enh:technique:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Foundation state: one worked example, repository-verified ONLY (see tables.ts). */
import type { VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";

export const ENH_VERIFICATION: VerificationRecord[] = [
  {
    id: "enh:badi:WORKORDER_UPDATE",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "BAdI מרכזי להתערבות במחזור החיים של הזמנת עבודה (אחזקה או ייצור): בדיקות, עדכונים ואכיפת כללים " +
          "במתודות BEFORE_UPDATE, AT_SAVE ו-IN_UPDATE. לפי הרשומה, נתמך ב-S/4HANA והוא הדרך המומלצת " +
          "בגישת Clean Core להרחבת פקודות, במקום Customer Exits דוגמת IWO10009.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#WORKORDER_UPDATE",
      },
    ],
    xrefs: ["enh:technique:classic-badi", "enh:exit:IWO10009", "tx:IW31", "tx:IW32", "tx:SE19"],
    lastVerifiedAt: DATE,
    notes: "רשומת עבודה של שלב היסוד: ראיה מן המאגר בלבד.",
  },
];
