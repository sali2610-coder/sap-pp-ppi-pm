/* Project NEO · verification overlay — business-object registry (`obj:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   A registry entry is a page-less grouping of objects the repository already
   documents together. "material-document" is the repository's own grouping:
   the ecc-s4 topic "matdoc" and the S4_IMPACT MATDOC entry list exactly these
   members. Nothing here invents a member. */
import type { RegistryEntry, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";

export const OBJECT_REGISTRY: RegistryEntry[] = [
  {
    id: "obj:material-document",
    he: "מסמך חומר (תנועות מלאי)",
    en: "Material Document",
    members: [
      "table:MKPF", "table:MSEG", "tx:MIGO", "tx:MB51", "tx:MB5B",
      "fm:BAPI_GOODSMVT_CREATE", "cds:I_MaterialDocumentItem",
    ],
  },
];

export const OBJECT_VERIFICATION: VerificationRecord[] = [
  {
    id: "obj:material-document",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "נושא ההשוואה ECC מול S/4HANA במאגר (matdoc)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תנועות מלאי נשמרו ב-ECC ב-MKPF (כותרת) וב-MSEG (פריטים); ב-S/4HANA טבלת ליבה אחת, MATDOC, " +
          "מאחדת כותרת ופריט, וכמויות המלאי מחושבות בזמן ריצה.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#matdoc",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת ההשפעה של MATDOC במאגר מפנה ל-SAP Note 1976487 ולפריט הפישוט של ניהול מלאי (MM-IM), " +
          "ומונה את MIGO, MB51 ו-MB5B ואת BAPI_GOODSMVT_CREATE כאובייקטי התהליך.",
        verificationLevel: "repository_verified",
        sapNote: "1976487",
        repoRef: "data/s4-impact.ts#MATDOC",
      },
    ],
    xrefs: ["table:MSEG", "table:MKPF", "bp:matdoc-read-through-compatibility"],
    lastVerifiedAt: DATE,
    notes:
      "מספר ה-SAP Note מועתק מרשומת המאגר, לא מהזיכרון. אימות מול me.sap.com יתבצע בשלב האיסוף.",
  },
];
