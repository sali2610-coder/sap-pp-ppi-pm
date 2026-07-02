// Verified supplemental SAP object registry — real, standard SAP objects that
// sit OUTSIDE the PM/PP-PI migration blueprint (Logistics Execution, Handling
// Units, WM, SD, FI cross-module staples). Every field here is verified standard
// SAP knowledge (table ownership + business purpose). ZERO fabrication: fields we
// don't verify are simply omitted, and the object page shows the verification
// status + source. This exists so a consultant searching a real object (e.g.
// VEKP / Handling Unit) never gets a false "not found".
//
// Multi-module by design: `primary` = owning module, `modules` = every module
// that uses the object. Aliases carry business names, abbreviations, SAP jargon,
// and Hebrew + English so search resolves them all.

export type VStatus = "verified" | "needs-review" | "cross-module" | "s4-only" | "ecc-only";

export interface VerifiedObject {
  name: string;            // technical table name
  primary: string;         // primary/owning module code
  modules: string[];       // all modules that use it (many-to-many)
  area: string;            // business area (he)
  he: string;              // Hebrew business description
  en: string;              // English business/technical name
  ecc: string;             // ECC availability/notes
  s4: string;              // S/4HANA availability/notes
  aliases: string[];       // business names · abbreviations · jargon · he+en
  keywords: string[];      // extra search terms (processes, domains)
  related: string[];       // related technical objects
  tcodes?: string[];       // common transactions (verified)
  status: VStatus;
  domain?: string;         // data domain id (e.g. "LO-HU")
  ppPi?: string;           // how it connects to the PP-PI production/process flow
  useCases?: string[];     // common consultant use cases (verified, real-world)
}

// A first-class logistics data domain — not forced into any single module.
export interface DataDomain {
  id: string;
  he: string;              // Hebrew name
  en: string;              // English name
  component: string;       // SAP application component
  summary: string;         // what the domain is
  members: string[];       // core tables in the domain
  connections: { module: string; he: string }[]; // verified integration points
}

// LO-HU · Handling Unit Management — belongs to Logistics General (LO), NOT to
// PP-PI. It is an integrated logistics LAYER used across PP-PI, MM, WM/EWM and SD.
export const LO_HU_DOMAIN: DataDomain = {
  id: "LO-HU",
  he: "ניהול יחידות מטפלות",
  en: "Handling Unit Management",
  component: "LO-HU (Logistics — Handling Unit Management, תחת Logistics General)",
  summary:
    "שכבת לוגיסטיקה חוצת-מודולים לניהול יחידות מטפלות (HU) — אריזות, משטחים ומכלים. יחידה מטפלת עוטפת חומר+כמות+אצווה ומקבלת מזהה ייחודי (SSCC/Barcode) לצורך מעקב, אחסון, העברה ומשלוח. אינה שייכת ל-PP-PI, אך משולבת עמוקות בזרימת הייצור.",
  members: ["VEKP", "VEPO"],
  connections: [
    { module: "PP-PI", he: "אריזת מוצר מוגמר/חצי-מוגמר מפקודת תהליך ל-HU בזמן קליטה (GR), ו-staging של חומרי גלם ל-HU בקו הייצור." },
    { module: "MM-IM", he: "כל תנועת מלאי במיקום מנוהל-HU מחייבת HU; ה-HU מקושר למסמך החומר (MKPF/MSEG)." },
    { module: "WM / EWM", he: "אחסון, ליקוט והעברה של HU בין תאים/מחסנים; ב-EWM ה-HU הוא אובייקט ליבה." },
    { module: "SD / LE", he: "אריזת משלוח יוצא ל-HU (קישור VEKP↔VBELN של LIKP), הדפסת תוויות ומעקב שילוח." },
  ],
};

export const VERIFIED_OBJECTS: VerifiedObject[] = [
  // ── LO-HU · Handling Unit Management (Logistics General) — integrated with PP-PI ──
  {
    name: "VEKP", primary: "LO-HU", modules: ["LO-HU", "PP-PI", "MM", "WM", "EWM", "SD", "LE"], domain: "LO-HU",
    area: "לוגיסטיקה כללית — ניהול יחידות מטפלות (LO-HU)",
    he: "כותרת יחידה מטפלת (Handling Unit) — מזהה ייחודי (SSCC/ברקוד), חומר אריזה, משקל/נפח ברוטו/נטו, סטטוס, וקישור לחומר, לאצווה, למסמך חומר ולמשלוח.",
    en: "Handling Unit Header",
    ecc: "קיים ב-ECC (LO-HU).", s4: "קיים ב-S/4HANA (LO-HU נשמר; ב-EWM נעשה שימוש במבנה ה-HU של EWM).",
    aliases: ["Handling Unit", "HU", "HU Header", "handling unit header", "HUMO", "HU Monitor", "packaging", "pallet", "unit load", "shipment unit", "SSCC", "יחידה מטפלת", "יחידת מטפלת", "אריזה", "משטח", "יחידת שילוח", "מכל"],
    keywords: ["LO-HU", "handling unit management", "logistics", "warehouse", "shipping", "production packing", "finished goods", "staging", "HU management", "packing", "packaging", "לוגיסטיקה", "מחסן", "משלוח", "אריזה", "מוצר מוגמר", "ייצור", "PP-PI"],
    related: ["VEPO", "MKPF", "MSEG", "LIKP", "MCHA"], tcodes: ["HU02", "HU03", "HUMO", "VLMOVE", "VL02N"], status: "cross-module",
    ppPi: "בזרימת PP-PI: המוצר המוגמר/חצי-מוגמר של פקודת תהליך נארז ל-HU בזמן קליטת הייצור (GR) — ה-HU נרשם כמלאי מנוהל-HU ומקושר לתנועת המלאי (MSEG). כמו כן חומרי גלם עוברים staging ל-HU לפני פליטה לקו. במפעל משקאות/מזון ה-HU (משטח) הוא יחידת המעקב הפיזית בין הייצור למחסן ולמשלוח.",
    useCases: [
      "אריזת מוצר מוגמר מפקודת תהליך ל-HU/משטח בזמן GR — למעקב מלאי, אצווה ומשלוח.",
      "ניהול מלאי במיקום אחסון מנוהל-HU (חובה HU לכל תנועה) — שילוב עם WM/EWM.",
      "Staging של חומרי גלם ב-HU לקו הייצור לפני backflush/פליטה.",
      "מעקב Track & Trace / גנאלוגיה: HU ⇄ אצווה ⇄ מוצר מוגמר לאורך השרשרת.",
      "אריזת משלוח יוצא ל-HU + הדפסת תווית SSCC ל-EDI/לקוח.",
    ],
  },
  {
    name: "VEPO", primary: "LO-HU", modules: ["LO-HU", "PP-PI", "MM", "WM", "EWM", "SD"], domain: "LO-HU",
    area: "לוגיסטיקה כללית — ניהול יחידות מטפלות (LO-HU)",
    he: "פריט/תכולת יחידה מטפלת — מה ארוז בתוך ה-HU: חומר, כמות, אצווה, ו-HU מקונן (nested HU). כל שורה מייצגת פריט בתוך המשטח/מכל.",
    en: "Handling Unit Item (Content)",
    ecc: "קיים ב-ECC (LO-HU).", s4: "קיים ב-S/4HANA.",
    aliases: ["HU Item", "HU Content", "handling unit item", "handling unit content", "nested HU", "תכולת HU", "פריט יחידה מטפלת", "content"],
    keywords: ["LO-HU", "handling unit", "packing", "nested HU", "finished goods", "batch", "אריזה", "תכולה", "אצווה", "PP-PI"],
    related: ["VEKP", "MCHA"], tcodes: ["HU02", "HU03", "HUMO"], status: "cross-module",
    ppPi: "התכולה שנארזה ב-HU בקליטת פקודת התהליך — קושרת בין המוצר המוגמר, האצווה שיוצרה, וה-HU הפיזי (משטח). מאפשרת גנאלוגיה מלאה מהאצווה ל-HU למשלוח.",
    useCases: [
      "פירוט תכולת משטח מוצר מוגמר (חומר + אצווה + כמות) שנארז מפקודת תהליך.",
      "מבנה HU מקונן: קרטונים בתוך משטח — למעקב עד רמת יחידת האריזה.",
    ],
  },
  // ── Logistics Execution · Deliveries ──
  {
    name: "LIKP", primary: "LE", modules: ["LE", "SD", "MM", "WM"],
    area: "לוגיסטיקה — משלוחים (Deliveries)",
    he: "כותרת מסמך משלוח (Delivery) — משלוח נכנס/יוצא, נמען, תאריכים, סטטוס משלוח.",
    en: "Delivery Document Header",
    ecc: "קיים ב-ECC.", s4: "קיים ב-S/4HANA (Advanced Shipping/Delivery).",
    aliases: ["Delivery", "Outbound Delivery", "Inbound Delivery", "Delivery Header", "משלוח", "תעודת משלוח", "משלוח יוצא", "משלוח נכנס"],
    keywords: ["shipping", "picking", "goods issue", "logistics", "משלוח", "ליקוט", "פליטת מלאי"],
    related: ["LIPS", "VEKP"], tcodes: ["VL01N", "VL02N", "VL03N", "VL06O"], status: "cross-module",
  },
  {
    name: "LIPS", primary: "LE", modules: ["LE", "SD", "MM", "WM"],
    area: "לוגיסטיקה — משלוחים (Deliveries)",
    he: "פריט מסמך משלוח — חומר, כמות, מפעל/מחסן, אצווה, סטטוס ליקוט.",
    en: "Delivery Document Item",
    ecc: "קיים ב-ECC.", s4: "קיים ב-S/4HANA.",
    aliases: ["Delivery Item", "פריט משלוח", "delivery line"],
    keywords: ["shipping", "picking", "משלוח", "ליקוט"],
    related: ["LIKP"], tcodes: ["VL02N", "VL03N"], status: "cross-module",
  },
  // ── Sales & Distribution ──
  {
    name: "VBAK", primary: "SD", modules: ["SD", "LE", "FI", "CO"],
    area: "מכירות והפצה — הזמנות מכירה",
    he: "כותרת מסמך מכירה — הזמנת מכירה/הצעת מחיר/חוזה: לקוח, ארגון מכירות, תנאים.",
    en: "Sales Document Header",
    ecc: "קיים ב-ECC.", s4: "קיים ב-S/4HANA (Business Partner ללקוחות).",
    aliases: ["Sales Order", "Sales Document", "SO", "Quotation", "הזמנת מכירה", "מסמך מכירה", "הצעת מחיר"],
    keywords: ["order to cash", "O2C", "billing", "מכירות", "הזמנה"],
    related: ["VBAP", "LIKP", "VBRK"], tcodes: ["VA01", "VA02", "VA03"], status: "verified",
  },
  {
    name: "VBAP", primary: "SD", modules: ["SD", "LE", "FI", "CO"],
    area: "מכירות והפצה — הזמנות מכירה",
    he: "פריט מסמך מכירה — חומר, כמות, מחיר, מפעל, תנאי אספקה.",
    en: "Sales Document Item",
    ecc: "קיים ב-ECC.", s4: "קיים ב-S/4HANA.",
    aliases: ["Sales Order Item", "פריט הזמנת מכירה", "SO item"],
    keywords: ["order to cash", "מכירות", "פריט"],
    related: ["VBAK"], tcodes: ["VA02", "VA03"], status: "verified",
  },
  {
    name: "VBRK", primary: "SD", modules: ["SD", "FI"],
    area: "מכירות והפצה — חיוב (Billing)",
    he: "כותרת מסמך חיוב (חשבונית) — נמען, ערכים, סוג חשבונית, קישור ל-FI.",
    en: "Billing Document Header",
    ecc: "קיים ב-ECC.", s4: "קיים ב-S/4HANA.",
    aliases: ["Invoice", "Billing Document", "חשבונית", "מסמך חיוב", "billing"],
    keywords: ["order to cash", "invoice", "FI posting", "חשבונית", "חיוב"],
    related: ["VBRP", "VBAK"], tcodes: ["VF01", "VF02", "VF03"], status: "verified",
  },
  {
    name: "VBRP", primary: "SD", modules: ["SD", "FI", "CO"],
    area: "מכירות והפצה — חיוב (Billing)",
    he: "פריט מסמך חיוב — חומר, כמות, ערך, קישור לפריט המשלוח/הזמנה.",
    en: "Billing Document Item",
    ecc: "קיים ב-ECC.", s4: "קיים ב-S/4HANA.",
    aliases: ["Invoice Item", "פריט חשבונית", "billing item"],
    keywords: ["invoice", "חשבונית", "פריט"],
    related: ["VBRK"], tcodes: ["VF02", "VF03"], status: "verified",
  },
  // ── Warehouse Management (WM) ──
  {
    name: "LTAK", primary: "WM", modules: ["WM", "LE", "MM"],
    area: "ניהול מחסן — הוראות העברה",
    he: "כותרת הוראת העברה במחסן (Transfer Order) — העברות מלאי, ליקוט, אחסון.",
    en: "WM Transfer Order Header",
    ecc: "קיים ב-ECC (WM).", s4: "ב-S/4HANA מומלץ EWM; WM קלאסי ב-compatibility.",
    aliases: ["Transfer Order", "TO", "הוראת העברה", "transfer order header"],
    keywords: ["warehouse", "picking", "putaway", "מחסן", "ליקוט", "אחסון"],
    related: ["LTAP", "LQUA"], tcodes: ["LT01", "LT03", "LT21"], status: "cross-module",
  },
  {
    name: "LTAP", primary: "WM", modules: ["WM", "LE", "MM"],
    area: "ניהול מחסן — הוראות העברה",
    he: "פריט הוראת העברה — חומר, כמות, תא מקור/יעד, אצווה.",
    en: "WM Transfer Order Item",
    ecc: "קיים ב-ECC (WM).", s4: "EWM ב-S/4HANA.",
    aliases: ["Transfer Order Item", "פריט הוראת העברה"],
    keywords: ["warehouse", "מחסן", "ליקוט"],
    related: ["LTAK"], tcodes: ["LT21"], status: "cross-module",
  },
  {
    name: "LQUA", primary: "WM", modules: ["WM", "LE", "MM"],
    area: "ניהול מחסן — מלאי (Quants)",
    he: "כמות מלאי בתא אחסון (Quant) — חומר, כמות, אצווה, תא, סוג מלאי.",
    en: "WM Quant (Stock in Storage Bin)",
    ecc: "קיים ב-ECC (WM).", s4: "EWM ב-S/4HANA.",
    aliases: ["Quant", "Storage Bin Stock", "מלאי בתא", "quant"],
    keywords: ["warehouse", "stock", "bin", "מחסן", "מלאי", "תא"],
    related: ["LAGP", "LTAK"], tcodes: ["LS26", "LX03"], status: "cross-module",
  },
  {
    name: "LAGP", primary: "WM", modules: ["WM", "LE"],
    area: "ניהול מחסן — תאי אחסון",
    he: "אב תא אחסון (Storage Bin) — קואורדינטות, סוג תא, מספר מחסן.",
    en: "WM Storage Bin Master",
    ecc: "קיים ב-ECC (WM).", s4: "EWM ב-S/4HANA.",
    aliases: ["Storage Bin", "Bin", "תא אחסון", "storage bin"],
    keywords: ["warehouse", "bin", "מחסן", "תא"],
    related: ["LQUA"], tcodes: ["LS01N", "LS03N"], status: "cross-module",
  },
  // ── Finance (FI) cross-module staples ──
  {
    name: "BKPF", primary: "FI", modules: ["FI", "CO", "MM", "SD"],
    area: "הנהלת חשבונות — מסמכים",
    he: "כותרת מסמך הנהלת חשבונות — חברה, סוג מסמך, תאריך רישום, מטבע.",
    en: "Accounting Document Header",
    ecc: "קיים ב-ECC.", s4: "קיים ב-S/4HANA; הנתונים ב-Universal Journal (ACDOCA).",
    aliases: ["Accounting Document", "FI Document", "מסמך הנהלת חשבונות", "מסמך FI", "accounting header"],
    keywords: ["finance", "posting", "journal", "פיננסי", "רישום"],
    related: ["BSEG", "ACDOCA"], tcodes: ["FB03", "FB01", "FBL3N"], status: "cross-module",
  },
  {
    name: "BSEG", primary: "FI", modules: ["FI", "CO", "MM", "SD"],
    area: "הנהלת חשבונות — שורות מסמך",
    he: "שורת מסמך הנהלת חשבונות — חשבון, סכום, חובה/זכות, מרכז עלות/הזמנה.",
    en: "Accounting Document Segment (Line Item)",
    ecc: "קיים ב-ECC.", s4: "ב-S/4HANA השורות ב-ACDOCA; BSEG כ-Compatibility.",
    aliases: ["Line Item", "FI Line", "שורת מסמך", "פקודת יומן", "accounting line"],
    keywords: ["finance", "line item", "ledger", "פיננסי", "שורה"],
    related: ["BKPF", "ACDOCA"], tcodes: ["FB03", "FBL3N"], status: "cross-module",
  },
  {
    name: "ACDOCA", primary: "FI", modules: ["FI", "CO", "MM", "SD", "PP", "PM"],
    area: "הנהלת חשבונות — Universal Journal (S/4)",
    he: "טבלת הליבה של הפיננסים ב-S/4HANA — יומן אוניברסלי המאחד FI+CO בשורה אחת.",
    en: "Universal Journal Entry Line Items",
    ecc: "לא קיים ב-ECC.", s4: "טבלת ליבה של S/4HANA Finance (מחליפה BKPF/BSEG/COEP צבירה).",
    aliases: ["Universal Journal", "ACDOCA", "S/4 Finance", "יומן אוניברסלי"],
    keywords: ["finance", "S/4HANA", "universal journal", "פיננסי", "S/4"],
    related: ["BKPF", "BSEG"], tcodes: ["FB03"], status: "s4-only",
  },
  // ── Master data cross-module ──
  {
    name: "KNA1", primary: "SD", modules: ["SD", "FI", "LE"],
    area: "נתוני אב — לקוחות",
    he: "אב לקוח (כללי) — שם, כתובת, מספר לקוח. ב-S/4 מנוהל דרך Business Partner.",
    en: "Customer Master (General Data)",
    ecc: "קיים ב-ECC.", s4: "ב-S/4HANA דרך Business Partner (BUT000); KNA1 כ-View.",
    aliases: ["Customer", "Customer Master", "לקוח", "אב לקוח", "customer master"],
    keywords: ["master data", "business partner", "לקוח", "נתוני אב"],
    related: ["BUT000"], tcodes: ["XD03", "BP"], status: "cross-module",
  },
];

// ---- indexes ----
const _byName = new Map(VERIFIED_OBJECTS.map((o) => [o.name.toUpperCase(), o]));
export const verifiedObject = (name: string): VerifiedObject | undefined => _byName.get((name || "").toUpperCase());
export const verifiedNames = (): string[] => VERIFIED_OBJECTS.map((o) => o.name);

const DOMAINS: Record<string, DataDomain> = { "LO-HU": LO_HU_DOMAIN };
export const dataDomain = (id?: string): DataDomain | undefined => (id ? DOMAINS[id] : undefined);

/** search these objects by technical name, business name, alias, jargon, he/en. */
export function searchVerified(q: string): VerifiedObject[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return VERIFIED_OBJECTS.filter((o) =>
    o.name.toLowerCase().includes(s) ||
    o.en.toLowerCase().includes(s) ||
    o.he.includes(q.trim()) ||
    o.aliases.some((a) => a.toLowerCase().includes(s)) ||
    o.keywords.some((k) => k.toLowerCase().includes(s)),
  );
}
