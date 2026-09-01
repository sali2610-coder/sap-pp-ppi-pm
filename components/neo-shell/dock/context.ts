/* ============================================================================
   PROJECT NEO · PAGE CONTEXT — what the assistant is standing on.
   ----------------------------------------------------------------------------
   §22 asks for a context interface now, so that a later AI can consume it
   without the dock being rebuilt around it. This is that interface, and it is
   deliberately small.

   THE HONESTY RULE THAT SHAPES THIS FILE
     The context is DERIVED FROM THE ROUTE, never guessed. /neo/object/AUFK/
     tells us the kind is an object and the subject is AUFK, and that is a fact.
     It does NOT tell us AUFK's module, its Hebrew name or what it does — those
     live in the dataset, and the dock does not import the dataset.

     So a surface that already holds richer facts PUBLISHES them, and the dock
     merges. Nothing is inferred in between. A page that publishes nothing shows
     only what its own URL proves, and that is the correct amount.
   ========================================================================== */

export type NeoContextKind =
  | "home" | "module" | "object" | "table" | "transaction"
  | "book" | "reader" | "lesson" | "course" | "reference"
  | "graph" | "knowledge" | "incident" | "search" | "other";

export interface NeoContext {
  /** What sort of thing is on screen. Always derivable from the route. */
  kind: NeoContextKind;
  /** The thing itself, as the URL names it. `AUFK`, `IW31`, `book3`. */
  subject?: string;
  /** Hebrew label for the kind, e.g. "טבלת SAP", "טרנזקציה". */
  kindHe: string;
  /** Module code, ONLY when a surface published one. Never guessed from a name. */
  module?: string;
  /** Free extra facts a surface chose to publish: chapter, section, topic. */
  detail?: string[];
  /** The route this context describes. */
  path: string;
}

const KIND_HE: Record<NeoContextKind, string> = {
  home: "מסך הבית",
  module: "מודול",
  object: "אובייקט SAP",
  table: "טבלת SAP",
  transaction: "טרנזקציה",
  book: "ספר",
  reader: "קריאה",
  lesson: "שיעור",
  course: "קורס",
  reference: "קטלוג",
  graph: "מודל הנתונים",
  knowledge: "מושג",
  incident: "תקלה",
  search: "חיפוש",
  other: "Project NEO",
};

/** Read the route. Only claims what the path itself states. */
export function contextFromPath(path: string): NeoContext {
  const p = (path || "/").replace(/\/+$/, "");
  const seg = p.split("/").filter(Boolean); // ["neo", "object", "AUFK"]
  const at = (i: number) => seg[i] ?? "";
  const mk = (kind: NeoContextKind, subject?: string): NeoContext => ({
    kind, subject, kindHe: KIND_HE[kind], path: p || "/",
  });

  if (at(0) !== "neo") return mk("other");
  switch (at(1)) {
    case "":            return mk("home");
    case "pm":          return { ...mk("module", "PM"), module: "PM" };
    case "pp-pi":       return { ...mk("module", "PP-PI"), module: "PP-PI" };
    case "object":      return mk("object", at(2));
    case "tables":      return at(2) ? mk("table", at(2)) : mk("reference", "טבלאות SAP");
    case "transactions":return at(2) ? mk("transaction", at(2)) : mk("reference", "טרנזקציות");
    case "erd":         return mk("graph");
    case "books":       return at(2) ? mk("book", at(2)) : mk("reference", "ספריית SAP");
    case "read":        return mk("reader", at(2));
    case "academy":     return at(3) ? mk("lesson", at(3)) : at(2) ? mk("course", at(2)) : mk("reference", "SAP Academy");
    case "knowledge":   return at(2) ? mk("knowledge", at(2)) : mk("reference", "מרכז הידע");
    case "incidents":   return at(2) ? mk("incident", at(2)) : mk("reference", "תקלות");
    case "bapi": case "cds": case "idoc":
    case "fiori-apps": case "enhancements":
      return mk("reference", at(2) || at(1));
    default:            return mk("other");
  }
}

/* ---------------------------------------------------------------- publish

   A surface enriches its own context by dispatching this event. The dock
   listens; nothing imports the dock. A surface that never publishes still gets
   a correct, if thinner, context from its URL.

   Deliberately an event rather than a React context: the dock is mounted by the
   layout, ABOVE every page, so a provider would have to wrap the whole tree to
   let a leaf speak upwards.                                                  */

export const NEO_CTX_EVENT = "neo:ctx";

export type NeoContextPatch = Pick<NeoContext, "module" | "detail"> & { subject?: string };

export function publishContext(patch: NeoContextPatch): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NEO_CTX_EVENT, { detail: patch }));
}

/** One line a human reads: "AUFK · אובייקט SAP · PM". */
export function contextLine(c: NeoContext): string {
  return [c.subject, c.kindHe, c.module, ...(c.detail ?? [])].filter(Boolean).join(" · ");
}
