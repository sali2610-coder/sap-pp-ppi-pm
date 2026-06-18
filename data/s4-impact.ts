// SAP S/4HANA impact intelligence — curated, accurate Simplification-List knowledge.
// NOT invented: entries reflect documented S/4HANA simplification items / migration
// notes. Tables without a curated entry derive a "partial" note from the dataset's
// own s4 text, or fall back to "needs SAP verification". Resolver: lib/s4.ts.

export type S4Trust = "verified" | "partial" | "needs";
export type S4Risk = "high" | "medium" | "low";

export interface S4FieldImpact { field: string; ecc: string; s4: string; changed: string; test: string }
export interface S4Impact {
  changed: string;   // what changed (he)
  why: string;       // why it matters (he)
  risk: S4Risk;
  trust: S4Trust;
  note?: string;     // SAP Note / Simplification ref
  tcodes?: string[];
  funcs?: string[];  // BAPIs / FMs
  cds?: string[];
  fields?: S4FieldImpact[];
  qa?: string[];     // recommended QA checks
}

export const S4_IMPACT: Record<string, S4Impact> = {
  // ── Material documents (MM-IM) ──
  MATDOC: {
    changed: "טבלת מסמכי החומר החדשה ב-S/4HANA. MKPF+MSEG מאוחדות ל-MATDOC; מלאי מחושב on-the-fly (ללא טבלאות aggregate כמו MARD/MARC ערכים).",
    why: "כל קריאה/דיווח מלאי שנשען ישירות על MKPF/MSEG חייב לעבור דרך MATDOC או CDS תאימות; קוד מותאם שקורא aggregate ישבר.",
    risk: "high", trust: "verified", note: "SAP Note 1976487 · Simplification: MM-IM",
    tcodes: ["MIGO", "MB51", "MB5B"], funcs: ["BAPI_GOODSMVT_CREATE", "MATERIAL_DOCUMENT_*"], cds: ["NSDM_V_MSEG", "NSDM_V_MKPF", "I_MaterialDocumentItem"],
    fields: [
      { field: "MBLNR", ecc: "מפתח מסמך חומר ב-MKPF", s4: "נשמר ב-MATDOC", changed: "אותו מפתח, מיקום אחר", test: "GR/GI ב-MIGO → אימות שורה ב-MATDOC" },
      { field: "MENGE", ecc: "כמות ב-MSEG", s4: "ב-MATDOC", changed: "מקור יחיד", test: "MB51 מול MATDOC" },
    ],
    qa: ["GR 101 דרך MIGO ומציאת השורה ב-MATDOC", "דוחות מלאי (MB51/MB5B) נשענים על CDS תאימות", "בדיקת קוד מותאם שקורא MKPF/MSEG ישירות"],
  },
  MSEG: {
    changed: "פריטי מסמך חומר — הנתונים מאוחסנים כעת ב-MATDOC. MSEG הופכת ל-View תאימות (NSDM_V_MSEG).",
    why: "SELECT ישיר מ-MSEG עדיין עובד דרך view, אך ביצועים/הרחבות שנשענו על מבנה הטבלה הפיזית מושפעים.",
    risk: "high", trust: "verified", note: "Simplification: MM-IM (MATDOC)",
    cds: ["NSDM_V_MSEG"], tcodes: ["MB51"],
    qa: ["וידוא קריאות MSEG עוברות דרך view התאימות", "בדיקת הרחבות/Append על MSEG"],
  },
  MKPF: {
    changed: "כותרת מסמך חומר — מאוחדת ל-MATDOC. MKPF = View תאימות (NSDM_V_MKPF).",
    why: "דוחות וקוד שקראו MKPF ישירות צריכים אימות מול view.",
    risk: "high", trust: "verified", note: "Simplification: MM-IM", cds: ["NSDM_V_MKPF"],
    qa: ["דוחות תנועות חומר", "ממשקים שקוראים MKPF"],
  },
  // ── Finance (Universal Journal) ──
  ACDOCA: {
    changed: "Universal Journal — טבלת התנועות המאוחדת ב-S/4HANA. מאחדת FI (BKPF/BSEG), CO (COEP/COBK), Asset, ML. טבלאות totals/index (GLT0, BSIS/BSAS, FAGLFLEXT) בוטלו.",
    why: "כל אנליטיקה/דיווח פיננסי עובר ל-ACDOCA; קוד שקרא totals/index ישבר; מקור אמת יחיד.",
    risk: "high", trust: "verified", note: "SAP Note 2270333 · Universal Journal",
    tcodes: ["FB03", "FAGLL03H"], cds: ["I_JournalEntryItem", "I_GLAccountLineItem"],
    qa: ["דוח GL דרך FAGLL03H/CDS", "התאמת COEP↔ACDOCA", "ביטול תלות ב-BSIS/BSAS"],
  },
  BSEG: {
    changed: "פריטי מסמך חשבונאי — עדיין קיים, אך מקור האמת לדיווח הוא ACDOCA. טבלאות אינדקס BSIS/BSAS/BSID/BSIK בוטלו (compat views).",
    why: "דיווח שנשען על BSIS/BSAS חייב לעבור ל-ACDOCA/CDS; BSEG נשאר לתאימות מסמך.",
    risk: "high", trust: "verified", note: "Universal Journal", cds: ["I_OperationalAcctgDocItem"],
    qa: ["פריטים פתוחים דרך CDS", "בדיקת אינדקסים שבוטלו"],
  },
  BKPF: {
    changed: "כותרת מסמך חשבונאי — קיימת לצד ACDOCA; אין שינוי מהותי במבנה.",
    why: "תאימות גבוהה; רוב הקוד ממשיך לעבוד.", risk: "medium", trust: "verified",
    qa: ["יצירת מסמך FI ואימות כותרת"],
  },
  // ── Business Partner ──
  KNA1: {
    changed: "אב לקוח — הטבלה נשמרת, אך התחזוקה עוברת ל-Business Partner (BP). XD01/XD02/VD01 הוחלפו ב-BP; חובה CVI sync.",
    why: "יצירת/שינוי לקוח דרך טרנזקציות ישנות חסומה; ממשקים שיצרו לקוח דרך XD01 צריכים BP/API.",
    risk: "high", trust: "verified", note: "SAP Note 2265093 · BP / CVI",
    tcodes: ["BP", "XD01→BP"], funcs: ["BAPI_BUPA_*", "CVI_*"],
    fields: [{ field: "KUNNR", ecc: "נוצר ב-XD01", s4: "נוצר דרך BP + CVI", changed: "ערוץ תחזוקה", test: "צור לקוח ב-BP → אימות KNA1 + CVI link" }],
    qa: ["יצירת לקוח דרך BP", "CVI synchronization פעיל", "ממשקי לקוח (IDoc DEBMAS) מול BP"],
  },
  LFA1: {
    changed: "אב ספק — נשמר; תחזוקה עוברת ל-Business Partner. XK01/MK01 הוחלפו ב-BP; חובה CVI.",
    why: "ממשקים/קוד שיצרו ספק דרך טרנזקציות ישנות צריכים BP/API.",
    risk: "high", trust: "verified", note: "SAP Note 2265093 · BP / CVI", tcodes: ["BP", "XK01→BP"], funcs: ["BAPI_BUPA_*", "CVI_*"],
    qa: ["יצירת ספק דרך BP", "CVI sync", "IDoc CREMAS מול BP"],
  },
  // ── Output management ──
  NAST: {
    changed: "ניהול פלט — S/4HANA מציגה Output Management חדש (BRF+ / Adobe Forms / cloud) לצד NAST/Message-control למסמכים מסוימים.",
    why: "פלטים חדשים (חשבוניות/הזמנות) עוברים ל-OM החדש; קביעת תנאי NAST לא תמיד רלוונטית.",
    risk: "medium", trust: "verified", note: "Simplification: Output Management",
    tcodes: ["NACE", "BRF+", "SFP"], qa: ["הפקת מסמך פלט בתצורה החדשה", "תוויות/COA דרך OM"],
  },
  // ── Material master ──
  MARA: {
    changed: "אב חומר — MATNR הורחב מ-18 ל-40 תווים. מבנה נשמר.",
    why: "ממשקים, ברקודים, המרות ו-IDocs שמניחים 18 תווים חייבים אימות.",
    risk: "medium", trust: "verified", note: "SAP Note 2267140 · MATNR 40",
    fields: [{ field: "MATNR", ecc: "CHAR 18", s4: "CHAR 40", changed: "אורך שדה", test: "ממשק Zetes/Daymax עם חומר באורך מלא; ברקוד" }],
    qa: ["IDoc MATMAS עם MATNR ארוך", "ברקודים/תוויות", "המרות EAN"],
  },
  // ── Batch / classification (stable-ish) ──
  MCH1: { changed: "אב אצווה — ללא שינוי מהותי במודל; ניהול אצוות תואם.", why: "תאימות גבוהה.", risk: "low", trust: "verified" },
};

// PM / PP-PI core that are explicitly stable in S/4 (verified, low risk) — so the
// UI can confidently show "no change" instead of "needs verification".
export const S4_STABLE = new Set<string>([
  "EQUI", "IFLOT", "IFLOS", "ILOA", "CRHD", "CRTX", "AFIH", "AFKO", "AFPO", "AFVC", "AFRU",
  "AUFK", "JEST", "JSTO", "OBJK", "QMEL", "QMFE", "PLKO", "PLPO", "MAPL", "MARC", "STKO", "STPO", "MAST", "EQKT", "EQUZ", "EQST",
]);
