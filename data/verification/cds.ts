/* Project NEO · verification overlay — CDS views (`cds:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Foundation state: one worked example, repository-verified ONLY (see tables.ts).
   Note the honesty trap the plan names: the enrichment's "verified" carries
   templated source strings, not URLs, so it stays repository_verified here. */
import type { VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";

export const CDS_VERIFICATION: VerificationRecord[] = [
  {
    id: "cds:I_MaterialDocumentItem",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תצוגת Interface (VDM) לפריט מסמך חומר מעל MATDOC; ב-ECC המקור הוא MSEG, וב-S/4HANA טבלת MATDOC " +
          "המאוחדת. רשומת ההעשרה מסומנת במאגר כמאומתת, עם מקורות טקסטואליים ללא קישור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-enrichment.ts#I_MaterialDocumentItem",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "המיפוי מקשר את התצוגה לטבלאות MSEG ו-MKPF ולטבלת MATDOC, עם שכבת צריכה C_MaterialDocumentItem " +
          "ויישום Fiori של סקירת מסמכי חומר.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MaterialDocumentItem",
      },
    ],
    xrefs: ["table:MSEG", "table:MKPF", "tx:MB51", "obj:material-document"],
    lastVerifiedAt: DATE,
    notes: "רשומת עבודה של שלב היסוד: ללא קישור רשמי, ולכן הרמה נשארת אימות מול נתוני הפרויקט בלבד.",
  },
];
