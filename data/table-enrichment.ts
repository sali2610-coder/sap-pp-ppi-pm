// ============================================================================
// Phase 14 · Sprint 2 — Table enrichment layer (VERIFIED, additive).
//
// `data/sapData.*` is GENERATED from the xlsx blueprints and must never be
// hand-edited. This layer sits ALONGSIDE it, keyed by tableName, and adds only
// the Enterprise-template fields the generated dataset does not carry (deep
// purpose, key notes, indexes, performance, ABAP/SQL/debug examples, ECC↔S/4).
//
// Every fact is standard DDIC / SAP Help content. Uncertain specifics (e.g.
// exact secondary-index names) are omitted, never invented. Merged into the
// object page render only when an entry exists → tables without enrichment are
// visually unchanged.  Mirrors the data/bapi-enrichment.* architecture.
// ============================================================================

export interface TableEnrichment {
  purposeDeep?: string;        // deep functional purpose
  primaryKey?: string[];       // key fields (with meaning)
  foreignKeys?: string[];      // FK relationships to other tables
  indexes?: string[];          // notable access paths / index guidance
  matdocNote?: string;         // MATDOC / ACDOCA (S/4) impact where relevant
  perfNotes?: string[];        // performance considerations
  abapExample?: string;        // ABAP snippet
  sqlExample?: string;         // SQL / CDS join snippet
  debugExample?: string;       // how to inspect / debug this table's data
  verified?: "verified" | "needs-verification";
  sources?: string[];
}

export const TABLE_ENRICHMENT: Record<string, TableEnrichment> = {
  AUFK: {
    purposeDeep: "כותרת אב-הזמנה (Order master data) — משותפת להזמנות PM (אחזקה), PP (ייצור/תהליך) ו-CO (פנימיות). מחזיקה את מספר ההזמנה (AUFNR), סוג הזמנה (AUART), אזור בקרה, קוד חברה, מפעל, ומספר אובייקט לסטטוס (OBJNR).",
    primaryKey: ["MANDT — client", "AUFNR — Order Number"],
    foreignKeys: ["AUART → T003O (Order Type)", "OBJNR → JEST/JSTO (System/User Status)", "KOKRS → TKA01 (Controlling Area)"],
    indexes: ["גישה תמיד לפי AUFNR (מפתח ראשי)", "לסטטוס — join דרך OBJNR ל-JEST"],
    perfNotes: ["בחר לפי AUFNR; חיבורים ל-AFKO (כותרת מורחבת), AFPO (פריטים), AFVC (פעולות)", "לנפחים גדולים — join סטטוס דרך OBJNR ולא סריקה"],
    abapExample: "SELECT SINGLE * FROM aufk INTO @DATA(ls_aufk) WHERE aufnr = @lv_aufnr.",
    sqlExample: "SELECT a~aufnr, a~auart, h~gamng\n  FROM aufk AS a\n  INNER JOIN afko AS h ON h~aufnr = a~aufnr\n  WHERE a~auart = 'PM01'.",
    debugExample: "סטטוס: FM STATUS_READ עם OBJNR; אובייקט ההזמנה נטען דרך CO_BT_ORDER_OBJECT_MANAGE.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — AUFK", "SAP Help Portal — Order Master Data"],
  },
  AFKO: {
    purposeDeep: "נתוני כותרת הזמנה (Order header data) — הרחבת הכותרת להזמנות ייצור/תהליך/אחזקה. מחזיקה הפניה ל-Routing/BOM (PLNBEZ, AUFPL — מספר ה-routing של ההזמנה), תאריכי תזמון, כמות כוללת (GAMNG) ו-MRP controller.",
    primaryKey: ["MANDT — client", "AUFNR — Order Number"],
    foreignKeys: ["AUFNR → AUFK (Order master)", "AUFPL → AFVC (Operations)", "PLNBEZ → MARA (Material)"],
    indexes: ["גישה לפי AUFNR", "AUFPL הוא מפתח ה-routing המקשר ל-AFVC/AFVV (פעולות + ערכים)"],
    perfNotes: ["AUFPL הוא הצומת לפעולות — join אליו ל-AFVC לקבלת operations", "GAMNG/GLTRP לתזמון וכמות"],
    abapExample: "SELECT SINGLE aufpl, gamng, gstrp, gltrp\n  FROM afko INTO @DATA(ls_afko) WHERE aufnr = @lv_aufnr.",
    sqlExample: "SELECT h~aufnr, o~vornr, o~arbid\n  FROM afko AS h\n  INNER JOIN afvc AS o ON o~aufpl = h~aufpl.",
    debugExample: "תזמון: ניתוח שדות GSTRP/GLTRP; פעולות דרך AUFPL ב-AFVC.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — AFKO", "SAP Help Portal — Production/Process Orders"],
  },
  AFPO: {
    purposeDeep: "פריט הזמנה (Order item) — החומר לייצור, כמויות, אחסון, אספקה ודרישה. הזמנת ייצור/תהליך יכולה להכיל פריט אחד או יותר (co-products). מפתח AUFNR + POSNR.",
    primaryKey: ["MANDT — client", "AUFNR — Order Number", "POSNR — Item Number"],
    foreignKeys: ["AUFNR → AUFK / AFKO (Order header)", "MATNR → MARA (Material)", "PWERK → T001W (Plant)"],
    indexes: ["גישה לפי AUFNR (+POSNR); ל-material — סינון על MATNR"],
    perfNotes: ["הרוב המכריע של ההזמנות = פריט בודד (POSNR 0001)", "co-products/by-products → פריטים נוספים"],
    abapExample: "SELECT * FROM afpo INTO TABLE @DATA(lt_afpo) WHERE aufnr = @lv_aufnr ORDER BY posnr.",
    sqlExample: "SELECT i~aufnr, i~posnr, i~matnr, i~psmng\n  FROM afpo AS i WHERE i~aufnr = @aufnr.",
    debugExample: "כמות מתוכננת PSMNG מול WEMNG (התקבל); ניתוח דרישה דרך RESB (רכיבים).",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — AFPO", "SAP Help Portal — Order Items"],
  },
  EQUI: {
    purposeDeep: "רשומת אב ציוד (Equipment master record) — אובייקט טכני מרכזי ב-EAM. מחזיקה מספר ציוד (EQUNR), קטגוריה (EQTYP), ומספר אובייקט לסטטוס (OBJNR). הטקסט ב-EQKT; שיוך מיקום/חשבונאות ב-ILOA (דרך ILOAN); סיווג דרך INOB/AUSP.",
    primaryKey: ["MANDT — client", "EQUNR — Equipment Number"],
    foreignKeys: ["EQUNR → EQKT (Short text)", "ILOAN → ILOA (Location/Account assignment)", "OBJNR → JEST (Status)", "EQUNR → INOB/AUSP (Classification)"],
    indexes: ["גישה לפי EQUNR", "לחיפוש לפי מיקום — דרך ILOA/IFLOT"],
    perfNotes: ["טקסט תמיד ב-EQKT (join לפי EQUNR+SPRAS)", "היסטוריית שינויים ב-EQUZ (time segments) אם מנוהלת"],
    abapExample: "SELECT SINGLE e~equnr, t~eqktx\n  FROM equi AS e\n  INNER JOIN eqkt AS t ON t~equnr = e~equnr AND t~spras = @sy-langu\n  WHERE e~equnr = @lv_equnr.",
    sqlExample: "SELECT e~equnr, l~tplnr, l~kostl\n  FROM equi AS e\n  INNER JOIN iloa AS l ON l~iloan = e~iloan.",
    debugExample: "סטטוס ציוד דרך OBJNR ב-JEST; סיווג דרך CLAF_CLASSIFICATION_OF_OBJECTS.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — EQUI/EQKT/ILOA", "SAP Help Portal — Equipment (PM/EAM)"],
  },
  MCH1: {
    purposeDeep: "אב אצווה ברמת החומר (Batch master, material level) — מפתח MATNR + CHARG. מחזיקה תכונות אצווה, תאריך תפוגה (VFDAT/SLED) והפניה לסיווג. MCHA = אצווה ברמת מפעל; MCHB = מלאי אצווה. רמת האצווה (client/plant/material) נקבעת בהגדרות.",
    primaryKey: ["MANDT — client", "MATNR — Material", "CHARG — Batch Number"],
    foreignKeys: ["MATNR → MARA (Material)", "Classification → INOB/AUSP (Class Type 023)", "אצווה/מפעל → MCHA", "מלאי → MCHB"],
    indexes: ["גישה לפי MATNR+CHARG", "לתכונות — דרך AUSP (Class Type 023)"],
    perfNotes: ["בחר תמיד עם MATNR+CHARG", "מלאי אצווה ב-MCHB (לא ב-MCH1)", "SLED (VFDAT) ל-FEFO"],
    abapExample: "SELECT SINGLE * FROM mch1 INTO @DATA(ls_mch1)\n  WHERE matnr = @lv_matnr AND charg = @lv_charg.",
    sqlExample: "SELECT b~matnr, b~charg, s~clabs\n  FROM mch1 AS b\n  INNER JOIN mchb AS s ON s~matnr = b~matnr AND s~charg = b~charg.",
    debugExample: "תכונות סיווג דרך AUSP (OBJEK = MATNR+CHARG, KLART='023'); FM VB_BATCH_DETAIL.",
    verified: "verified",
    sources: ["SAP DDIC (SE11) — MCH1/MCHA/MCHB", "SAP Help Portal — Batch Management (LO-BM)"],
  },
};

export const getTableEnrichment = (name?: string): TableEnrichment | undefined =>
  name ? TABLE_ENRICHMENT[name.toUpperCase()] : undefined;
