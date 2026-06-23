// ===== S/4HANA Object Explorer — curated ECC→S/4 object catalog =====
// High-confidence, well-documented SAP S/4HANA simplifications (tables, CDS,
// BAPIs, frameworks). Real SAP knowledge; anything uncertain is tagged
// trust:"needs-verification". This curated layer is MERGED with derived
// entries (S4_IMPACT, ECC_S4_TOPICS, TRANSACTIONS) in lib/s4-catalog.

export type S4Status = "stays" | "changed" | "replaced" | "removed";
export type S4Kind = "Table" | "View" | "CDS" | "Tcode" | "BAPI" | "IDoc" | "Framework" | "Field";
export type Trust = "curated" | "needs-verification";
export interface S4Obj {
  name: string; kind: S4Kind; he: string; status: S4Status; risk: "high" | "medium" | "low";
  release?: string;          // S/4 release where it changed
  ecc: string;               // before (one line)
  s4: string;                // after (one line)
  why?: string;
  replaces?: string[];       // ECC objects merged into this one
  modules: string[];         // affected modules
  related: string[];         // related object names (for the graph)
  abap?: { k: string; note: string; code?: string }[];
  checklist?: string[];
  trust: Trust;
}

export const S4STATUS_META: Record<S4Status, { he: string; c: string }> = {
  stays: { he: "נשאר", c: "#16a34a" },
  changed: { he: "השתנה", c: "#d97706" },
  replaced: { he: "הוחלף", c: "#2563eb" },
  removed: { he: "בוטל", c: "#dc2626" },
};

const O = (o: S4Obj): S4Obj => o;

export const S4_OBJECTS: S4Obj[] = [
  /* ── MM-IM inventory: MATDOC ── */
  O({ name: "MSEG", kind: "Table", he: "פריטי מסמך חומר", status: "replaced", risk: "high", release: "S/4 1511",
    ecc: "פריטי תנועת מלאי ב-MSEG (עם MKPF ככותרת).", s4: "אוחד ל-MATDOC; MSEG נחשף כ-Compatibility View (קריאה).",
    why: "מודל נתוני המלאי החדש (NSDM) מבטל כפילות וטבלאות אגרגציה.", replaces: [], modules: ["MM", "PP", "PP-PI", "PM"], related: ["MKPF", "MATDOC", "MARD", "MARC"],
    abap: [{ k: "SELECT", note: "SELECT ישיר על MSEG עובד דרך compat view לקריאה; כתיבה אסורה.", code: "SELECT * FROM mseg ...  \" → reads via NSDM_E_MSEG view" }, { k: "כתיבה", note: "השתמש ב-BAPI_GOODSMVT_CREATE / MIGO; אין INSERT/UPDATE ישיר." }],
    checklist: ["קוד Z שכותב ל-MSEG", "JOINs על MSEG בדוחות", "ממשקים שמושכים תנועות מלאי"], trust: "curated" }),
  O({ name: "MKPF", kind: "Table", he: "כותרת מסמך חומר", status: "replaced", risk: "high", release: "S/4 1511",
    ecc: "כותרת מסמך חומר.", s4: "אוחד ל-MATDOC; MKPF = Compatibility View.", modules: ["MM", "PP", "PP-PI", "PM"], related: ["MSEG", "MATDOC"],
    checklist: ["דוחות JOIN MKPF-MSEG", "קוד שמתבסס על מספרי מסמך"], trust: "curated" }),
  O({ name: "MATDOC", kind: "Table", he: "מסמך חומר (S/4)", status: "stays", risk: "low", release: "S/4 1511",
    ecc: "לא קיים ב-ECC.", s4: "טבלת ליבה אחת לכותרת+פריט של תנועות מלאי; מצרפי מלאי מחושבים בזמן ריצה.", replaces: ["MKPF", "MSEG"], modules: ["MM", "PP", "PP-PI", "PM"], related: ["MSEG", "MKPF", "MARD"],
    why: "מקור האמת היחיד לתנועות מלאי ב-S/4.", trust: "curated" }),

  /* ── FI/CO: ACDOCA Universal Journal ── */
  O({ name: "BSEG", kind: "Table", he: "פריטי מסמך חשבונאי", status: "changed", risk: "high", release: "S/4 1511",
    ecc: "פריטי FI; טבלאות אינדקס נפרדות (BSIS/BSAS/BSIK/BSAK/BSID/BSAD).", s4: "BSEG נשמר למסמך, אך הדיווח עובר ל-ACDOCA; טבלאות האינדקס בוטלו.", modules: ["FI", "CO"], related: ["BKPF", "ACDOCA", "BSIS", "BSAK"],
    checklist: ["דוחות שקוראים BSIS/BSAK", "התאמות (reconciliation) ישנות"], trust: "curated" }),
  O({ name: "ACDOCA", kind: "Table", he: "יומן אוניברסלי", status: "stays", risk: "medium", release: "S/4 1511",
    ecc: "לא קיים.", s4: "שורת אמת יחידה ל-FI+CO; מאחדת מסמכים, ללא reconciliation.", replaces: ["BSIS", "BSAS", "BSIK", "BSAK", "BSID", "BSAD", "GLT0", "FAGLFLEXT", "COEP", "COSP", "COSS"], modules: ["FI", "CO"], related: ["BSEG", "BKPF"], trust: "curated" }),
  O({ name: "BSIS", kind: "Table", he: "אינדקס פריטים פתוחים — ח-ן ראשי", status: "removed", risk: "high", release: "S/4 1511",
    ecc: "טבלת אינדקס ל-G/L open items.", s4: "בוטלה — הנתונים ב-ACDOCA; קיים Compatibility View.", modules: ["FI"], related: ["ACDOCA", "BSEG"], checklist: ["דוחות Z על BSIS"], trust: "curated" }),
  O({ name: "BSID", kind: "Table", he: "אינדקס לקוחות — פתוחים", status: "removed", risk: "high", ecc: "אינדקס AR open items.", s4: "בוטלה → ACDOCA (compat view).", modules: ["FI"], related: ["ACDOCA", "KNA1"], trust: "curated" }),
  O({ name: "BSIK", kind: "Table", he: "אינדקס ספקים — פתוחים", status: "removed", risk: "high", ecc: "אינדקס AP open items.", s4: "בוטלה → ACDOCA (compat view).", modules: ["FI"], related: ["ACDOCA", "LFA1"], trust: "curated" }),
  O({ name: "COEP", kind: "Table", he: "פריטי CO לפי תקופה", status: "removed", risk: "high", ecc: "פריטי עלות בפועל ב-CO.", s4: "בוטלה — עלויות ב-ACDOCA (account-based).", modules: ["CO"], related: ["ACDOCA"], trust: "curated" }),
  O({ name: "MLIT", kind: "Table", he: "Material Ledger — פריטים", status: "changed", risk: "medium", ecc: "Material Ledger אופציונלי.", s4: "Material Ledger חובה ב-S/4 (לא בהכרח actual costing).", modules: ["CO", "MM"], related: ["ACDOCA", "MBEW"], trust: "curated" }),

  /* ── Business Partner (CVI) ── */
  O({ name: "KNA1", kind: "Table", he: "אב לקוח (כללי)", status: "changed", risk: "high", release: "S/4 1511",
    ecc: "לקוח נוצר ב-XD01/VD01; KNA1 הוא המוביל.", s4: "Business Partner (BP) הוא נקודת הכניסה היחידה; CVI מסנכרן ל-KNA1/KNB1. XD01 חסום.", why: "Business Partner approach — ישות אחת ללקוח/ספק.", modules: ["SD", "FI"], related: ["LFA1", "BUT000", "KNB1"],
    checklist: ["CVI מוגדר ופעיל", "ממשקים שיוצרים לקוחות", "תפקידי BP"], trust: "curated" }),
  O({ name: "LFA1", kind: "Table", he: "אב ספק (כללי)", status: "changed", risk: "high", ecc: "ספק ב-XK01/MK01; LFA1 מוביל.", s4: "BP מוביל; CVI מסנכרן ל-LFA1/LFB1. XK01 חסום.", modules: ["MM", "FI"], related: ["KNA1", "BUT000", "LFB1"], trust: "curated" }),

  /* ── SD simplifications ── */
  O({ name: "VBUK", kind: "Table", he: "סטטוס כותרת — מכירות", status: "removed", risk: "high", release: "S/4 1511",
    ecc: "טבלת סטטוס כותרת נפרדת למסמכי מכירה.", s4: "בוטלה — שדות הסטטוס הוטמעו ב-VBAK/LIKP/VBRK.", modules: ["SD"], related: ["VBAK", "VBUP"], checklist: ["קוד שקורא VBUK/VBUP", "דוחות סטטוס"], trust: "curated" }),
  O({ name: "VBUP", kind: "Table", he: "סטטוס פריט — מכירות", status: "removed", risk: "high", ecc: "סטטוס פריט נפרד.", s4: "בוטלה — סטטוס ב-VBAP/LIPS.", modules: ["SD"], related: ["VBAP", "VBUK"], trust: "curated" }),
  O({ name: "VBRK", kind: "Table", he: "כותרת חשבונית", status: "stays", risk: "low", ecc: "כותרת חשבונית מכירה.", s4: "נשמרת; סטטוס הוטמע; דיווח דרך CDS.", modules: ["SD"], related: ["VBRP", "ACDOCA"], trust: "curated" }),

  /* ── PP / PP-PI ── */
  O({ name: "MATNR", kind: "Field", he: "מספר חומר (אורך שדה)", status: "changed", risk: "high", release: "S/4 1511",
    ecc: "MATNR 18 תווים.", s4: "מורחב ל-40 תווים (ברירת מחדל 40).", why: "תמיכה במזהי חומר ארוכים גלובליים.", modules: ["MM", "PP", "PP-PI", "PM", "SD"], related: ["MARA", "MARC"],
    abap: [{ k: "OFFSET", note: "MOVE עם offset קבוע על MATNR יישבר; השתמש ב-CONVERSION_EXIT_MATN1.", code: "lv_x = matnr+0(18).  \" ← unsafe in S/4" }, { k: "ממשקים", note: "IDoc/RFC/ברקודים שמניחים 18 תווים — בדוק." }],
    checklist: ["ממשקי Zetes/Daymax", "ברקודים", "קוד Z עם offset על MATNR"], trust: "curated" }),
  O({ name: "PLAF", kind: "Table", he: "הזמנות מתוכננות", status: "changed", risk: "medium", ecc: "MRP קלאסי יוצר הזמנות מתוכננות.", s4: "MRP Live (PPH) — חישוב על HANA; PLAF נשמר אך הביצועים/לוגיקה שונים.", modules: ["PP", "PP-PI"], related: ["MDKP", "AFKO"], trust: "curated" }),
  O({ name: "AFKO", kind: "Table", he: "כותרת פקודת ייצור/תהליך", status: "stays", risk: "low", ecc: "כותרת פקודה.", s4: "נשמרת; aATP ו-MRP Live משפיעים על תהליכים סביבה.", modules: ["PP", "PP-PI"], related: ["AFPO", "AFVC", "RESB"], trust: "curated" }),

  /* ── Output / frameworks ── */
  O({ name: "NAST", kind: "Table", he: "ניהול פלט (קלאסי)", status: "changed", risk: "medium", ecc: "תנאי פלט קלאסיים (NACE) + SAPscript/Smartforms.", s4: "S/4 מקדמת Output Management מבוסס BRF+ ו-Adobe Forms; NAST נתמך חלקית.", modules: ["SD", "MM"], related: ["BRF+"], checklist: ["תהליכי פלט קריטיים", "טפסים מותאמים"], trust: "curated" }),
  O({ name: "Foreign Trade", kind: "Framework", he: "סחר חוץ", status: "replaced", risk: "medium", ecc: "Foreign Trade ב-SD/MM.", s4: "הוחלף ב-SAP GTS (Global Trade Services).", modules: ["SD", "MM"], related: [], trust: "curated" }),
  O({ name: "SD Rebates", kind: "Framework", he: "הנחות/רבייט מכירות", status: "replaced", risk: "medium", ecc: "SD Rebate Agreements קלאסיים.", s4: "הוחלף ב-Settlement Management (Condition Contract).", modules: ["SD"], related: [], trust: "curated" }),
  O({ name: "Credit Management", kind: "Framework", he: "ניהול אשראי", status: "replaced", risk: "medium", ecc: "FI-AR Credit Management קלאסי.", s4: "הוחלף ב-FSCM Credit Management.", modules: ["SD", "FI"], related: ["KNA1"], trust: "curated" }),
  O({ name: "CO-PA", kind: "Framework", he: "ניתוח רווחיות", status: "changed", risk: "medium", ecc: "Costing-based CO-PA נפוץ.", s4: "Account-based CO-PA מומלץ (משולב ב-ACDOCA); costing-based עדיין נתמך.", modules: ["CO"], related: ["ACDOCA"], trust: "curated" }),
  O({ name: "LIS", kind: "Framework", he: "מערכת מידע לוגיסטית", status: "changed", risk: "low", ecc: "LIS info structures לדיווח.", s4: "מוחלף ב-CDS / Embedded Analytics; LIS נתמך חלקית.", modules: ["MM", "SD", "PP"], related: [], trust: "needs-verification" }),

  /* ── Change docs / technical ── */
  O({ name: "CDHDR", kind: "Table", he: "מסמכי שינוי — כותרת", status: "stays", risk: "low", ecc: "תיעוד שינויים.", s4: "נשמר ללא שינוי.", modules: ["Cross"], related: ["CDPOS"], trust: "curated" }),
  O({ name: "CDPOS", kind: "Table", he: "מסמכי שינוי — פריטים", status: "stays", risk: "low", ecc: "פירוט שינויי שדה.", s4: "נשמר.", modules: ["Cross"], related: ["CDHDR"], trust: "curated" }),
  O({ name: "BAPI_GOODSMVT_CREATE", kind: "BAPI", he: "יצירת תנועת סחורה", status: "stays", risk: "low", ecc: "רישום תנועת מלאי.", s4: "נשמר ועובד מול MATDOC; ה-API היציב לכתיבת מלאי.", modules: ["MM", "PP", "PP-PI"], related: ["MATDOC", "MIGO"], trust: "curated" }),
  O({ name: "BAPI_PRODORDCONF_CREATE_TT", kind: "BAPI", he: "אישור פקודת ייצור", status: "stays", risk: "low", ecc: "אישור ייצור.", s4: "נשמר; בדוק שדות מורחבים.", modules: ["PP", "PP-PI"], related: ["AFRU"], trust: "curated" }),
  O({ name: "MATMAS", kind: "IDoc", he: "הפצת אב חומר", status: "changed", risk: "medium", ecc: "IDoc אב חומר.", s4: "נשמר; בדוק שדה MATNR 40 וסגמנטים.", modules: ["MM"], related: ["MARA"], checklist: ["סגמנטים מורחבים", "MATNR 40 בממשק"], trust: "curated" }),
];
