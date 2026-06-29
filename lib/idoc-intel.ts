// IDoc Explorer intelligence — a thin, HONEST accessor over already-verified
// data. Everything here is restructured from the curated `idoc` integration
// record (data/integration.ts) and the IDoc message types that actually appear
// in the PM/PP-PI blueprint (lib/object-intel). NOTHING is invented: anatomy
// records, status codes, monitoring tcodes and FMs are all taken verbatim from
// that source. The Explorer is a *diagnostic reference* surface — complementary
// to the Integration *course*, not a duplicate.
import { MODULES, type IntgModule } from "@/data/integration";
import { listFuncs } from "@/lib/object-intel";

export const IDOC = MODULES.find((m) => m.id === "idoc") as IntgModule;

// The three physical IDoc records, named verbatim in IDOC.architecture.
export interface IdocRecord { table: string; he: string; role: string }
export const IDOC_RECORDS: IdocRecord[] = [
  { table: "EDIDC", he: "מעטפת בקרה (Control Record)", role: "כותרת — שותף, סוג הודעה, Basic Type, נמל, כיוון" },
  { table: "EDID4", he: "מקטעי נתונים (Data Records)", role: "תוכן ההודעה — מקטעים (segments) היררכיים" },
  { table: "EDIDS", he: "היסטוריית סטטוס (Status Records)", role: "כל שינוי סטטוס לאורך חיי ה-IDoc" },
];

// Verified IDoc status reference — ONLY the codes the curated record names
// (51/64/68/30/03/56/29), with the meaning, root cause and where-to-fix taken
// from IDOC.troubleshooting + rootCauses + debug. No statuses are added.
export interface IdocStatus { code: string; dir: "in" | "out"; he: string; cause: string; fix: string[] }
export const IDOC_STATUSES: IdocStatus[] = [
  { code: "51", dir: "in", he: "שגיאת יישום — ה-IDoc התקבל אך עיבוד היישום נכשל", cause: "נתוני אב חסרים/שגויים ביעד, או Process Code/FM שגוי", fix: ["WE19", "BD87"] },
  { code: "64", dir: "in", he: "ממתין לעיבוד — ב-queue / scheduler", cause: "RBDAPP01 לא מתוזמן, או תור EOIO תקוע", fix: ["BD87", "SM58"] },
  { code: "68", dir: "in", he: "סומן 'לא יטופל' (No Further Processing)", cause: "סגירה ידנית או ריצת ניקוי", fix: ["WE19", "WE02"] },
  { code: "29", dir: "out", he: "שגיאת ALE — Partner Profile חסר/שגוי במוצא", cause: "Partner Profile (WE20) לא מוגדר ליציאה", fix: ["WE20", "WE21"] },
  { code: "30", dir: "out", he: "מוכן לשליחה — לא נשלח עדיין", cause: "אין output / RSEOUT00 לא רץ", fix: ["WE20", "BD87"] },
  { code: "03", dir: "out", he: "הועבר לנמל היעד / מערכת ה-EDI", cause: "תקין — הסטטוס הסופי המוצלח ביציאה", fix: ["WE02", "WE05"] },
  { code: "56", dir: "in", he: "IDoc עם שגיאה — Partner Profile חסר בכניסה", cause: "Partner Profile נכנס (WE20) לא מוגדר", fix: ["WE20", "WE21"] },
];

// The IDoc Basic / message types that actually exist in the PM/PP-PI dataset.
export function idocMessageTypes(): string[] {
  return listFuncs("IDoc").sort();
}
