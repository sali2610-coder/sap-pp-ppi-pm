// Cross-chapter SAP object index for the PP textbook drill-down pages.
// Aggregates every identifier (T-Code/table/CDS/Fiori/BAPI/IDoc/program) to the
// chapters it appears in, with a Hebrew note from the glossary when available.

import { PP_CHAPTERS, PP_GLOSSARY, type SapObjects } from "@/data/library/pp-knowledge";

export type ObjKind = keyof SapObjects;
export interface PPObject {
  code: string;
  kinds: ObjKind[];
  chapters: number[];
  he: string;
}

const KIND_HE: Record<ObjKind, string> = {
  tcodes: "T-Code",
  tables: "Table",
  cds: "CDS View",
  fiori: "Fiori App",
  bapis: "BAPI",
  idocs: "IDoc",
  programs: "Program",
};
export const KIND_LABEL = KIND_HE;

const KINDS: ObjKind[] = ["tcodes", "tables", "cds", "fiori", "bapis", "idocs", "programs"];

function buildIndex(): Map<string, PPObject> {
  const map = new Map<string, PPObject>();
  for (const ch of PP_CHAPTERS) {
    for (const k of KINDS) {
      for (const code of ch.objects[k] ?? []) {
        let o = map.get(code);
        if (!o) {
          const g = PP_GLOSSARY.find((x) => x.term.includes(code));
          o = { code, kinds: [], chapters: [], he: g?.he ?? "" };
          map.set(code, o);
        }
        if (!o.kinds.includes(k)) o.kinds.push(k);
        if (!o.chapters.includes(ch.n)) o.chapters.push(ch.n);
      }
    }
  }
  return map;
}

const INDEX = buildIndex();

// URL-safe slug (codes may contain "/")
export const slugOf = (code: string) => code.replace(/[^A-Za-z0-9_-]/g, "_");

export const PP_OBJECTS: PPObject[] = [...INDEX.values()].sort((a, b) => a.code.localeCompare(b.code));
export const PP_OBJECT_SLUGS = PP_OBJECTS.map((o) => slugOf(o.code));

export function objectBySlug(slug: string): PPObject | undefined {
  return PP_OBJECTS.find((o) => slugOf(o.code) === slug);
}
export function kindLabel(k: ObjKind) {
  return KIND_HE[k];
}
