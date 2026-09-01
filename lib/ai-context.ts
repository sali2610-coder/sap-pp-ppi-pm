"use client";
// Derives AI context from the current route. The user never states where they
// are — the pathname already encodes module, book, chapter and SAP subject.
import { usePathname } from "next/navigation";

export type SubjectKind = "TABLE" | "TCODE" | "BAPI" | "CDS" | "EXIT" | "ENHANCEMENT"
  | "FIORI" | "IDOC" | "OBJECT" | "CONCEPT" | "BLUEPRINT" | "DOMAIN" | "ABAP";

export interface AiContext {
  path: string;
  module?: string;
  persona?: string;
  bookId?: string;
  chapter?: number;
  section?: string;
  subject?: { kind: SubjectKind; id: string };
  task: string;
  label: string;
}

const MODULE_ROUTES: [RegExp, string, string][] = [
  [/^\/pp-pi/, "PP-PI", "יועץ PP-PI (תעשיות תהליכיות)"],
  [/^\/pp(\/|$)/, "PP", "יועץ תכנון ייצור"],
  [/^\/(pm|maintenance)(\/|$)/, "PM", "יועץ תחזוקת מפעל"],
  [/^\/(mm|procurement)(\/|$)/, "MM", "יועץ רכש ומלאי"],
  [/^\/(qm|quality)(\/|$)/, "QM", "יועץ ניהול איכות"],
  [/^\/(wm|ewm)(\/|$)/, "WM", "יועץ ניהול מחסן"],
  [/^\/abap/, "ABAP", "מומחה ABAP"],
  [/^\/fiori/, "FIORI", "מומחה SAP Fiori"],
  [/^\/authorizations/, "SECURITY", "מומחה הרשאות SAP"],
];

const SUBJECT_ROUTES: [RegExp, SubjectKind][] = [
  [/^\/tcode\/([^/]+)/, "TCODE"], [/^\/bapi\/([^/]+)/, "BAPI"],
  [/^\/cds\/([^/]+)/, "CDS"], [/^\/exits\/([^/]+)/, "EXIT"],
  [/^\/enhancements\/([^/]+)/, "ENHANCEMENT"], [/^\/fiori-apps\/([^/]+)/, "FIORI"],
  [/^\/apps\/([^/]+)/, "FIORI"], [/^\/object\/([^/]+)/, "OBJECT"],
  [/^\/concepts\/([^/]+)/, "CONCEPT"], [/^\/blueprints\/([^/]+)/, "BLUEPRINT"],
  [/^\/domain\/([^/]+)/, "DOMAIN"], [/^\/abap\/([^/]+)/, "ABAP"],
];

const BOOK_RE = /^\/library\/(book\d+)/;

/** Pure — unit-testable without React. */
export function contextFromPath(path: string, extra: Partial<AiContext> = {}): AiContext {
  const ctx: AiContext = { path, task: "HEBREW_EXPLAIN", label: "שאלה כללית" };

  for (const [re, mod, persona] of MODULE_ROUTES) {
    if (re.test(path)) { ctx.module = mod; ctx.persona = persona; ctx.task = "SAP_QA"; ctx.label = `מודול ${mod}`; break; }
  }
  const book = path.match(BOOK_RE);
  if (book) { ctx.bookId = book[1]; ctx.task = "BOOK_QA"; ctx.label = `ספר ${book[1].replace("book", "")}`; }

  for (const [re, kind] of SUBJECT_ROUTES) {
    const m = path.match(re);
    if (m) {
      ctx.subject = { kind, id: decodeURIComponent(m[1]) };
      ctx.task = kind === "BLUEPRINT" ? "STUDY_GUIDE" : "SAP_QA";
      ctx.label = `${kind} · ${ctx.subject.id}`;
      break;
    }
  }
  if (/^\/tables/.test(path) && ctx.label === "שאלה כללית") ctx.label = "טבלאות SAP";
  if (/^\/ecc-s4/.test(path)) { ctx.task = "COMPARE_ECC_S4"; ctx.label = "ECC מול S/4HANA"; }
  if (/^\/debugging/.test(path)) { ctx.task = "TROUBLESHOOT"; ctx.label = "אבחון תקלות"; }
  return { ...ctx, ...extra };
}

export function useAiContext(extra: Partial<AiContext> = {}): AiContext {
  const pathname = usePathname() || "/";
  return contextFromPath(pathname, extra);
}

export function contextPreamble(c: AiContext): string {
  const bits: string[] = [];
  if (c.persona) bits.push(`ענה כ${c.persona}.`);
  if (c.module) bits.push(`ההקשר הוא מודול ${c.module}.`);
  if (c.subject) bits.push(`המשתמש נמצא בעמוד של ${c.subject.kind} בשם ${c.subject.id}.`);
  if (c.bookId) bits.push(`הספר הנוכחי הוא ${c.bookId}${c.chapter ? `, פרק ${c.chapter}` : ""}${c.section ? `, סעיף ${c.section}` : ""}.`);
  return bits.join(" ");
}
