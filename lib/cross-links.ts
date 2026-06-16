// Cross-Link Engine (Phase 2) — aggregates every dataset around a single SAP
// object (keyed by its primary table). Powers the Object Intelligence Center,
// Resolution Path Engine and SAP Notes Graph. Pure functions over authored data.

import { ALL_TABLES } from "@/data/sapData";
import { tableByName, kgraph } from "@/lib/knowledge-graph";
import { FUNCTION_INTEL } from "@/data/function-intel";
import { classifyFunc, listTcodes, listFuncs } from "@/lib/object-intel";
import { cdsForTable } from "@/data/cds-map";
import { TRANSACTIONS } from "@/data/transactions";
import { EXITS } from "@/data/exits";
import { INCIDENTS } from "@/data/troubleshooting";
import { SAP_NOTES } from "@/data/sap-notes";
import { DEBUGGINGS } from "@/data/centers/debugging";
import { CBC_SCENARIOS } from "@/data/centers/cbc";
import type { CenterItem } from "@/components/topic-center";

export interface LinkRef { id: string; label: string; href: string; sub?: string }

export interface ObjectGraph {
  name: string;
  module: string;
  he: string;
  exists: boolean;
  relatedTables: LinkRef[];
  tcodes: LinkRef[];
  bapis: LinkRef[];
  fms: LinkRef[];
  badis: LinkRef[];      // BAdIs + user exits
  cds: LinkRef[];
  incidents: LinkRef[];
  notes: LinkRef[];
  debug: LinkRef[];
  cbc: LinkRef[];
  s4Note: string;
}

const FN = new Set(listFuncs());
const TC = new Set(listTcodes());
const splitTc = (s: string) => (s || "").split(/[^A-Za-z0-9_]+/).map((x) => x.trim().toUpperCase()).filter((x) => x.length >= 2);
const uniq = <T,>(arr: T[], key: (t: T) => string) => { const s = new Set<string>(); return arr.filter((t) => { const k = key(t); if (s.has(k)) return false; s.add(k); return true; }); };

// flatten chip/linkchip items out of a CenterItem's sections
function centerItemTokens(it: CenterItem): Set<string> {
  const out = new Set<string>();
  for (const sec of it.sections) if (sec.type === "linkchips" || sec.type === "chips") for (const v of sec.items || []) out.add(v.toUpperCase());
  return out;
}

export function objectGraph(rawName: string): ObjectGraph | null {
  const name = (rawName || "").trim();
  const t = tableByName(name);
  if (!t) return null;
  const module = t.module;
  const objTcodes = new Set(splitTc(t.tcodes));
  const g = kgraph(name);

  // related tables (kgraph up+down)
  const relatedTables: LinkRef[] = uniq([...(g?.upstream || []), ...(g?.downstream || [])], (x) => x).map((n) => ({ id: n, label: n, href: `/object/${encodeURIComponent(n)}/`, sub: tableByName(n)?.descriptionHe }));

  // transactions referencing this object/table
  const tx = TRANSACTIONS.filter((x) => (x.objects || []).some((o) => o.includes(name)) || (x.tables || []).includes(name) || objTcodes.has(x.code));
  const tcodes: LinkRef[] = uniq(tx, (x) => x.code).map((x) => ({ id: x.code, label: x.code, href: `/transactions/${encodeURIComponent(x.code)}/`, sub: x.title }));
  // tcodes from table record not in catalog → plain
  for (const code of objTcodes) if (!tcodes.find((c) => c.id === code)) tcodes.push({ id: code, label: code, href: TC.has(code) ? `/tcode/${encodeURIComponent(code)}/` : "", sub: "" });

  // functions whose curated intel links this table; + table.funcs
  const funcNames = new Set<string>();
  for (const [k, v] of Object.entries(FUNCTION_INTEL)) if ((v.related.tables || []).includes(name)) funcNames.add(k);
  for (const f of (t.funcs || [])) funcNames.add(f[0]);
  const fnRefs = (kind: "BAPI" | "FM") => [...funcNames].filter((f) => classifyFunc(f) === kind).map((f) => ({ id: f, label: f, href: FN.has(f) ? `/${classifyFunc(f) === "IDoc" ? "idoc" : "bapi"}/${encodeURIComponent(f)}/` : "" }));
  const bapis = uniq(fnRefs("BAPI"), (x) => x.id);
  const fms = uniq(fnRefs("FM"), (x) => x.id);

  // exits/BAdIs whose tcodes overlap the object's tcodes, or referenced by the object's transactions
  const txExits = new Set<string>();
  tx.forEach((x) => (x.exits || []).forEach((e) => txExits.add(e)));
  const badis: LinkRef[] = uniq(EXITS.filter((e) => e.tcodes.some((c) => objTcodes.has(c.toUpperCase())) || txExits.has(e.name)), (e) => e.name)
    .map((e) => ({ id: e.name, label: e.name, href: `/exits/${e.name.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "")}/`, sub: e.kind }));

  // CDS for the table
  const cds: LinkRef[] = cdsForTable(name).map((v) => ({ id: v.view, label: v.view, href: `/cds/${encodeURIComponent(v.view)}/`, sub: v.he }));

  // incidents referencing this table or sharing tcodes
  const inc = INCIDENTS.filter((i) => i.tables.includes(name) || i.analyzeTcodes.some((c) => objTcodes.has(c.toUpperCase())));
  const incidents: LinkRef[] = uniq(inc, (i) => i.slug).map((i) => ({ id: i.slug, label: i.he, href: `/troubleshooting/${i.slug}/`, sub: i.module }));
  const incSlugs = new Set(inc.map((i) => i.slug));

  // notes linked to those incidents, or whose keywords hit a tcode/table of the object
  const notes: LinkRef[] = uniq(SAP_NOTES.filter((n) => (n.relatedIncidents || []).some((s) => incSlugs.has(s)) || n.keywords.some((k) => objTcodes.has(k.toUpperCase()) || k.toUpperCase() === name)), (n) => n.slug)
    .map((n) => ({ id: n.slug, label: n.he, href: `/sap-notes/${n.slug}/`, sub: n.component }));

  // debug entries: module match + token overlap with object fms/exits/tcodes
  const objTokens = new Set<string>([...objTcodes, ...bapis.map((b) => b.id.toUpperCase()), ...fms.map((f) => f.id.toUpperCase()), ...badis.map((b) => b.id.toUpperCase())]);
  const debug: LinkRef[] = DEBUGGINGS.filter((d) => (d.module === module || d.module === "Cross") && [...centerItemTokens(d)].some((tok) => objTokens.has(tok)))
    .map((d) => ({ id: d.slug, label: d.he, href: `/debugging/${d.slug}/`, sub: d.module }));

  // CBC scenarios: master-data token includes this table, or module match
  const cbc: LinkRef[] = CBC_SCENARIOS.filter((c) => centerItemTokens(c).has(name.toUpperCase()) || c.module === module)
    .map((c) => ({ id: c.slug, label: c.he, href: `/cbc/${c.slug}/`, sub: c.module }));

  return {
    name, module, he: t.descriptionHe || t.descriptionEn || name, exists: true,
    relatedTables, tcodes, bapis, fms, badis, cds, incidents, notes, debug, cbc,
    s4Note: [t.s4Note, t.s4AltTable ? `→ ${t.s4AltTable}` : "", t.fioriApp ? `Fiori: ${t.fioriApp}` : ""].filter(Boolean).join(" · ") || "ללא שינוי מהותי ב-S/4HANA.",
  };
}

// Object Intelligence Center registry — key business objects → primary table + authored framing.
export interface OICObject { slug: string; table: string; he: string; title: string; module: string; description: string; cbc: string }
export const OIC_OBJECTS: OICObject[] = [
  { slug: "equipment", table: "EQUI", he: "ציוד", title: "Equipment", module: "PM", description: "נכס בודד הניתן למעקב — נושא היסטוריית אחזקה, מדידות ומספר סידורי; מותקן במיקום פונקציונלי או בציוד-אב.", cbc: "ב-CBC: 'משאבת CIP #3' כציוד עם מספר סידורי, מותקנת בתחנת שטיפה; נקודת מדידה לשעות-פעולה מזינה אחזקה מונעת." },
  { slug: "functional-location", table: "IFLOT", he: "מיקום פונקציונלי", title: "Functional Location", module: "PM", description: "מבנה היררכי קבוע של המפעל (אזור→קו→תחנה) — היכן מתבצעת אחזקה; נושא נתוני מיקום/חיוב (ILOA).", cbc: "ב-CBC: 'קו מילוי 1 → ממלאת → מכסה' כמיקומים; כל הזמנת אחזקה מחויבת למרכז העלות של הקו דרך ILOA." },
  { slug: "maintenance-order", table: "AUFK", he: "הזמנת אחזקה", title: "Maintenance Order", module: "PM", description: "מנהלת ביצוע עבודת אחזקה — פעולות, מרכזי עבודה, חומרים, עלויות והיתרים; מחזור יצירה→שחרור→אישור→TECO→התחשבנות.", cbc: "ב-CBC: פקודת PM01 לאחזקת מערכת CIP — ניקוי+החלפת משאבה, רכיב מלאי + שירות קבלן; התחשבנות למרכז עלות הייצור." },
  { slug: "notification", table: "QMEL", he: "הודעת אחזקה", title: "Maintenance Notification", module: "PM", description: "מתעדת תקלה/בקשה — אובייקט ייחוס, קודי קטלוג (פגם/סיבה/פעילות) ומשימות; נקודת הכניסה לתהליך האחזקה.", cbc: "ב-CBC: מפעיל פותח M1 'ממלאת #2 — דליפה'; קוד פגם דליפה + סיבה אטם בלוי → פקודה דחופה; ניתוח מצביע על אטמים כגורם חוזר." },
  { slug: "process-order", table: "AFKO", he: "פקודת ייצור/תהליך", title: "Process / Production Order", module: "PP-PI", description: "מנהלת ייצור — מתכון/מסלול, שלבים, רכיבים, מרשם בקרה, אישורים ועלויות; AFKO כותרת, AFPO פריט, AFVC פעולות.", cbc: "ב-CBC: פקודת תהליך לייצור 50K בקבוקים — שחרור שולח מרשם בקרה לקו, אישור עושה Backflush + GR לאצווה." },
  { slug: "material", table: "MARA", he: "אב חומר", title: "Material", module: "PP-PI", description: "ישות הליבה של הלוגיסטיקה — נתוני בסיס/MRP/ייצור/חשבונאות; בסיס לתכנון, ייצור ואצוות.", cbc: "ב-CBC: 'משקה תוסס 500ml' כ-FG עם תצוגות MRP/ייצור; תרכיז כ-SFG; בקבוקים/מכסים כ-RAW." },
  { slug: "bom", table: "MAST", he: "עץ מוצר (BOM)", title: "Bill of Material", module: "PP-PI", description: "מגדיר רכיבים וכמויות לייצור מוצר — בסיס לפיצוץ דרישות ולצריכה בפקודה; MAST מקשר חומר↔BOM, STKO כותרת, STPO פריטים.", cbc: "ב-CBC: BOM ל'בקבוק 500ml' = תרכיז+מים+CO2+בקבוק+מכסה+תווית; פריט פנטום 'תערובת בסיס'." },
  { slug: "batch", table: "MCH1", he: "אצווה", title: "Batch", module: "PP-PI", description: "מנת ייצור עם מאפיינים, תוקף וסיווג — קריטית למעקב (Traceability) ולקביעה אוטומטית (FEFO).", cbc: "ב-CBC: כל מנת משקה מקבלת אצווה עם תאריך תפוגה (SLED); מכירה לפי FEFO; אצווה פסולה ב-QM נחסמת." },
  { slug: "work-center", table: "CRHD", he: "מרכז עבודה / משאב", title: "Work Center / Resource", module: "PP-PI", description: "היכן ומי מבצע עבודה — קיבולת, נוסחאות תזמון/עלות, שיוך מרכז עלות; בייצור תהליכי = משאב (Resource).", cbc: "ב-CBC: משאב 'כור ערבוב 5000L' עם קיבולת 2 אצוות/משמרת; כל שעת פעילות מחויבת למרכז עלות הייצור." },
  { slug: "master-recipe", table: "PLKO", he: "מתכון אב / מסלול", title: "Master Recipe / Routing", module: "PP-PI", description: "מגדיר כיצד מיוצר מוצר — פעולות, שלבים (Phases), משאבים והוראות תהליך (PI); בסיס לפקודה ולמרשם הבקרה.", cbc: "ב-CBC: מתכון 'משקה תוסס' — ערבוב→פסטור→מילוי→סגירה; הוראות תהליך (טמפ'/זמן) נשלחות ל-MES." },
  { slug: "reservation", table: "RESB", he: "הזמנת רכיבים", title: "Reservation", module: "PP-PI", description: "דרישת רכיבים לפקודה — בסיס ל-GI ולבדיקת זמינות; מקשרת פקודה לצריכת מלאי.", cbc: "ב-CBC: רזרבציה של תרכיז ומכסים לפקודת מילוי; GI 261 צורך מהמלאי באישור." },
];
export const oicBySlug = (s: string) => OIC_OBJECTS.find((o) => o.slug === s);
