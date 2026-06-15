// ECC vs S/4HANA Knowledge Engine — authored comparison topics.
// status: כל פריט מסומן Unchanged / Changed / Replaced / Deprecated.
// Hand-written, focused on PM + PP/PP-PI relevance. Not generated.

export type ChangeStatus = "Unchanged" | "Changed" | "Replaced" | "Deprecated";

export interface EccS4Topic {
  slug: string;
  title: string;     // EN
  he: string;
  area: "Data" | "PP" | "PM" | "Platform";
  status: ChangeStatus;
  ecc: string;       // how it worked in ECC
  s4: string;        // how it works in S/4
  fioriCds?: string; // Fiori app / CDS replacement
  simplification?: string; // SAP Simplification Item ref (textual)
  impact: string;    // migration impact
  note?: string;
}

export const STATUS_HE: Record<ChangeStatus, string> = {
  Unchanged: "ללא שינוי", Changed: "שונה", Replaced: "הוחלף", Deprecated: "הוסר/לא מומלץ",
};
export const STATUS_COLOR: Record<ChangeStatus, string> = {
  Unchanged: "#16a34a", Changed: "#d97706", Replaced: "#2563eb", Deprecated: "#dc2626",
};

export const ECC_S4_TOPICS: EccS4Topic[] = [
  { slug: "matdoc", title: "Material Documents (MATDOC)", he: "מסמכי חומר", area: "Data", status: "Replaced",
    ecc: "תנועות מלאי נשמרו ב-MKPF (כותרת) + MSEG (פריטים), ומלאי מצרפי בטבלאות MARD/MARC/MCHB וכו'.",
    s4: "טבלת ליבה אחת MATDOC מאחדת כותרת+פריט; כמויות מלאי מחושבות on-the-fly מ-MATDOC (Aggregation בזמן ריצה).",
    fioriCds: "CDS NSDM_* ; MARD/MKPF/MSEG נחשפים כ-Compatibility Views.",
    simplification: "Simplification: Material Inventory Management (MM-IM) data model.",
    impact: "קוד שכותב/קורא ישירות ל-MKPF/MSEG/MARD צריך בדיקה; קריאות SELECT עדיין עובדות דרך compat views אך לא לכתיבה ישירה.",
    note: "רלוונטי ל-PP/PM דרך תנועות 261/101/261/Goods Issue לפקודות." },
  { slug: "acdoca", title: "Universal Journal (ACDOCA)", he: "יומן אוניברסלי", area: "Data", status: "Replaced",
    ecc: "FI ו-CO נפרדים: BKPF/BSEG ל-FI, COEP ל-CO, טבלאות סיכום נפרדות.",
    s4: "ACDOCA = שורת אמת יחידה ל-FI+CO+עלויות; מאחדת מסמכים, ללא reconciliation.",
    fioriCds: "CDS ניתוח עלויות; BSEG נשאר למסמך אך הדיווח מ-ACDOCA.",
    simplification: "Simplification: Universal Journal.",
    impact: "דיווח עלויות פקודות ייצור/אחזקה עובר ל-ACDOCA; דוחות CO ישנים צריכים התאמה.",
    note: "עלויות פקודת ייצור (CO) זורמות ל-ACDOCA." },
  { slug: "mrp-live", title: "MRP Live", he: "MRP חי", area: "PP", status: "Changed",
    ecc: "MRP קלאסי (MD01/MD02) רץ על DB מסורתי, batch, planning file (MDVM).",
    s4: "MRP Live (MD01N) רץ על HANA עם push-down, מהיר משמעותית; חלק מהפרמטרים הישנים לא נתמכים.",
    fioriCds: "Fiori 'Monitor Material Coverage' / 'Manage Material Coverage'.",
    simplification: "Simplification: MRP in S/4HANA.",
    impact: "תרחישי MRP מסוימים (subcontracting מורכב) עדיין נופלים ל-classic; בדוק תאימות.",
    note: "MD01N מועדף; MD01 קלאסי עדיין קיים לחלק מהמקרים." },
  { slug: "pp-ds", title: "PP-DS (Advanced Planning)", he: "תכנון מתקדם PP-DS", area: "PP", status: "Changed",
    ecc: "PP-DS היה רכיב נפרד ב-SCM/APO (מערכת נפרדת + CIF).",
    s4: "Embedded PP-DS בתוך S/4HANA — ללא מערכת APO נפרדת; תכנון מפורט סדר-עבודה/קיבולת.",
    fioriCds: "Fiori Planning Board / PP-DS apps.",
    simplification: "Embedded PP-DS.",
    impact: "ארגונים עם APO צריכים להחליט על מעבר ל-embedded; CIF פנימי.",
    note: "רלוונטי לייצור תהליכי מורכב (PP-PI)." },
  { slug: "atp", title: "Advanced ATP (aATP)", he: "בדיקת זמינות מתקדמת", area: "PP", status: "Changed",
    ecc: "ATP קלאסי (CO09) על בסיס ערכי ATP בטבלאות.",
    s4: "aATP על HANA: Back-Order Processing (BOP), Product Allocation, Release for Delivery — מהיר ומבוסס Fiori.",
    fioriCds: "Fiori 'Release for Delivery', BOP apps.",
    simplification: "Advanced ATP.",
    impact: "תהליכי הקצאה ידניים מוחלפים ב-BOP; הגדרות חדשות.",
    note: "משפיע על שחרור פקודות ואספקה." },
  { slug: "production-order-s4", title: "Production / Process Orders", he: "פקודות ייצור/תהליך", area: "PP", status: "Unchanged",
    ecc: "CO01-CO03 (ייצור בדיד), COR1-COR3 (תהליך); טבלאות AUFK/AFKO/AFPO/AFVC.",
    s4: "מבנה נתונים זהה ברובו; נוספים Fiori + OData APIs; שילוב PP-DS/aATP.",
    fioriCds: "Fiori 'Manage Production Orders', OData API_PRODUCTION_ORDER_2 / API_PROCESSORDER_2; CDS I_ProductionOrder / I_ManufacturingOrder.",
    simplification: "—",
    impact: "מינימלי במבנה; שכבת קריאה/אנליטיקה דרך CDS.",
    note: "AUFK/AFKO/AFPO נשמרות; שמות CDS אמת מול גרסת S/4." },
  { slug: "plant-maintenance-s4", title: "Plant Maintenance Objects", he: "אובייקטי אחזקה", area: "PM", status: "Unchanged",
    ecc: "EQUI/EQKT/EQUZ (ציוד), IFLOT (מיקום פונקציונלי), הזמנות (AUFK/AFIH), הודעות (QMEL/QMIH).",
    s4: "מבנה נתונים זהה ברובו; נוסף Fiori 'Manage Technical Objects', 'Find Maintenance Notifications' + CDS.",
    fioriCds: "CDS I_Equipment / I_FunctionalLocation; Fiori Maintenance apps.",
    simplification: "—",
    impact: "מינימלי; UX עובר ל-Fiori, GUI עדיין נתמך.",
    note: "אמת שמות CDS מול גרסת S/4." },
  { slug: "notifications-s4", title: "Maintenance Notifications", he: "הודעות תקלה (PM)", area: "PM", status: "Changed",
    ecc: "IW21-IW28; טבלאות QMEL/QMFE/QMUR; עיבוד GUI.",
    s4: "אותו מודל נתונים; UX מבוסס Fiori ('Create Maintenance Request/Notification'), זרימה מובנית להזמנה.",
    fioriCds: "Fiori Maintenance Notification apps; CDS אנליטי.",
    simplification: "—",
    impact: "תהליך זהה לוגית; הדרכה על Fiori; GUI קיים.",
    note: "QMEL/QMFE/QMUR נשמרות." },
  { slug: "fiori", title: "Fiori & CDS Layer", he: "שכבת Fiori ו-CDS", area: "Platform", status: "Replaced",
    ecc: "SAP GUI + Dynpro; דיווח דרך SE16/SQVI/ABAP reports.",
    s4: "Fiori Launchpad כממשק מוביל; CDS Views כמודל קריאה; Embedded Analytics; OData.",
    fioriCds: "Fiori Launchpad + Business Catalogs + I_* CDS.",
    simplification: "Fiori as primary UX.",
    impact: "תפקידים (PFCG) צריכים Business Catalogs ל-Fiori; הדרכת משתמשים; GUI עדיין זמין למעבר.",
    note: "GUI לא נעלם — אך UX מומלץ הוא Fiori." },
  { slug: "matnr-extension", title: "Material Number Extension", he: "הרחבת מספר חומר", area: "Data", status: "Changed",
    ecc: "MATNR באורך 18 תווים (דומיין MATNR).",
    s4: "תמיכה בהרחבה ל-40 תווים (Extended Material Number) — לפי הפעלה.",
    fioriCds: "—",
    simplification: "Material Number field length extension.",
    impact: "קוד עם אורך 18 קשיח, conversion exits, ו-interfaces חיצוניים צריכים בדיקה.",
    note: "השפעה רוחבית על PM/PP — חומרים בכל מקום." },
];

export const eccS4BySlug = (s: string) => ECC_S4_TOPICS.find((t) => t.slug === s);
