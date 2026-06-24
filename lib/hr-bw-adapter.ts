// Adapter — expose HR (HCM/SuccessFactors) and BW (Analytics) objects through
// the same SAPTable shape the Object Workspace renders, so they get full object
// pages (Explain card + Consultant mode + interview) on /object/<name> exactly
// like PM / PP-PI. ADDITIVE: does not touch the core dataset, graph, or counts.
import type { SAPTable, SAPField, SAPRelation, Module } from "@/lib/types";
import { HR_TABLES } from "@/data/hr-module";
import { BW_TABLES } from "@/data/bw-module";

type RawField = [string, string, string, string]; // [tech, en, len, key]
type RawRel = { role: "parent" | "child"; table: string; card: string; desc: string };

function adapt(o: {
  name: string; mod: string; he: string; en: string; zone: string; tcodes: string;
  fiori: string; s4: string; s4alt: string; guideHe: string; pk: string[];
  fields: RawField[]; funcs: string[]; cds: string[]; rel: RawRel[];
}): SAPTable {
  const fields: SAPField[] = o.fields.map(([tech, en, len, key]) => ({ tech, en, he: en, dt: "", len: len || "", key: key || "-" }));
  const relations: SAPRelation[] = o.rel.map((r) => ({ role: r.role, table: r.table, card: r.card, desc: r.desc, join: "" }));
  return {
    id: `${o.mod}:${o.name}`,
    module: o.mod as Module, // "HR" | "BW" — rendered as a tag; color falls back to neutral
    topicIdx: 0,
    topicTitle: o.zone,
    tableName: o.name,
    descriptionHe: o.he,
    descriptionEn: o.en,
    tcodes: o.tcodes || "",
    sqlJoinSnippet: "",
    guideHe: o.guideHe || "",
    s4Note: o.s4 || "",
    s4AltTable: o.s4alt || undefined,
    fioriApp: o.fiori || undefined,
    funcs: (o.funcs || []).map((f) => [f, ""] as [string, string]),
    progs: [],
    fields,
    relations,
    migrationStatus: "Not started",
  };
}

const map = new Map<string, SAPTable>();
for (const h of HR_TABLES) map.set(h.name, adapt(h));
for (const bw of BW_TABLES) map.set(bw.name, adapt(bw));

export const hrBwTableByName = (name: string): SAPTable | undefined => map.get(name);
export const HR_BW_NAMES: string[] = [...map.keys()];
