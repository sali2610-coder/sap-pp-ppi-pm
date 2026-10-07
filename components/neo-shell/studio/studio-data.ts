// Project NEO · /neo/studio/ — BUILD-TIME data for Architecture Studio.
//
// SERVER ONLY. The studio's two graphs (PM, PP-PI), assembled once at build
// time from lib/studio-graph.ts and handed to the page as plain data. The old
// studio imported buildHetero in the browser, which shipped the source of both
// blueprints (about 500KB) to every visitor; the client now receives only the
// nodes, the relations and the words the panel shows.
//
// WHAT EACH NODE CARRIES, AND FROM WHERE
//   he, en   the table's own description; for other objects the catalog name
//            of its NEO page (transaction registry, BAPI, CDS, IDoc, Fiori)
//   z        the business zone (lib/studio-graph zoneOf), tables only
//   s4, note the blueprint's S/4HANA verdict class (lib/s4-class) and its
//            s4Note, verbatim
//   fi       the blueprint's Fiori text for the table, verbatim
//   t        the studio's size tier, from relations to OTHER TABLES only:
//            core = a curated master object or 6+ table relations, major =
//            3-5, leaf = 0-2. (lib/studio-graph's nodeTier counts every kind
//            of neighbour, so 53 of PM's 56 tables came out core or major and
//            size said nothing; nodeTier itself is left for the legacy route.)
//   href     the object's own NEO page, ONLY when its record route generates
//            it (each list below is that route's generateStaticParams source)
//   none     a Fiori entry where the blueprint says there is NO dedicated app
//            ("אין Fiori ייעודי", "מוטמע (אין ייעודי)"): not drawn as an app
//
// Fiori: the blueprint names an app in free text. An app is linked only when
// the catalog holds the same app: its Fiori ID AND its name agree, or its name
// matches exactly. The blueprint's F2079, F2393 and F2215 are not catalog IDs
// (the catalog lists Manage Technical Objects as F2730A), so an ID alone is
// never trusted.

import { buildHetero, FLOWS, ZONES, zoneOf, type SKind, type Zone } from "@/lib/studio-graph";
import type { S4Class } from "@/lib/s4-class";
import { ALL_TABLES } from "@/data/sapData";
import { tableDetailNames } from "@/components/neo-shell/data/tables-detail";
import { registryRouteCodes, registryTx } from "@/lib/tx-registry";
import { bapiDetail, bapiIds } from "@/components/neo-shell/reference/bapi-data";
import { cdsDetail, cdsNames } from "@/components/neo-shell/reference/cds-data";
import { idocDetail, idocNames } from "@/components/neo-shell/reference/idoc-data";
import { FIORI_APPS } from "@/data/fiori/apps";

export type StudioModule = "PM" | "PP-PI";
export type Tier = "core" | "major" | "leaf";

export interface StudioNode {
  id: string;
  k: SKind;
  /** the object's code as the blueprint writes it */
  l: string;
  he?: string;
  en?: string;
  z?: Zone;
  s4?: S4Class;
  note?: string;
  fi?: string;
  t?: Tier;
  href?: string;
  none?: true;
}

export interface StudioStep { label: string; code: string; he?: string; href?: string }

export interface StudioGraph {
  nodes: StudioNode[];
  /** undirected relations, each pair once, a < b */
  edges: [string, string][];
  /** the curated master objects, in the blueprint's order */
  master: string[];
  /** the module's process, step by step */
  flow: StudioStep[];
  /** the business zones that hold a table of the module, in business order */
  zones: { id: Zone; he: string }[];
}
export type StudioPayload = Record<StudioModule, StudioGraph>;

const NO_APP = /אין\s*(Fiori\s*)?ייעודי|^\s*אין\b/;

export function studioPayload(): StudioPayload {
  const tables = new Set(tableDetailNames());
  const txCodes = new Set(registryRouteCodes());
  const bapis = new Set(bapiIds());
  const cds = new Set(cdsNames());
  const idocs = new Set(idocNames());
  const fioriById = new Map(FIORI_APPS.map((a) => [a.id.toUpperCase(), a]));
  const fioriByName = new Map(FIORI_APPS.map((a) => [a.name.trim().toLowerCase(), a]));
  const fioriApp = (label: string) => {
    const bare = label.replace(/\s*\(.*?\)\s*/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
    const exact = fioriByName.get(label.trim().toLowerCase()) ?? fioriByName.get(bare);
    if (exact) return exact;
    const id = label.match(/\bF\d{3,5}[A-Z]?\b/i)?.[0]?.toUpperCase();
    const byId = id ? fioriById.get(id) : undefined;
    return byId && byId.name.trim().toLowerCase() === bare ? byId : undefined;
  };
  const tableHe = new Map<string, string>();
  for (const t of ALL_TABLES) if (!tableHe.has(t.tableName)) tableHe.set(t.tableName, t.descriptionHe || t.descriptionEn || "");

  const build = (mod: StudioModule): StudioGraph => {
    const h = buildHetero(mod as never);
    const rows = new Map(ALL_TABLES.filter((t) => t.module === mod).map((t) => [t.tableName, t]));
    const master = new Set(h.master);
    const tableDegree = (id: string) => [...(h.adj.get(id) || [])].filter((n) => h.nodes.get(n)?.kind === "table").length;

    const nodes: StudioNode[] = [];
    for (const n of h.nodes.values()) {
      const out: StudioNode = { id: n.id, k: n.kind, l: n.label };
      if (n.he) out.he = n.he;
      if (n.kind === "table") {
        out.z = zoneOf(n.id);
        if (n.s4k !== undefined) out.s4 = n.s4k;
        const row = rows.get(n.id);
        if (row?.s4Note) out.note = row.s4Note;
        if (row?.fioriApp) out.fi = row.fioriApp;
        const d = tableDegree(n.id);
        out.t = master.has(n.id) || d >= 6 ? "core" : d >= 3 ? "major" : "leaf";
        if (tables.has(n.label)) out.href = `/neo/tables/${encodeURIComponent(n.label)}/`;
      } else if (n.kind === "tcode") {
        const t = registryTx(n.label);
        if (t?.he) out.he = t.he;
        if (t?.en) out.en = t.en;
        // the NEO record route generates every registry code; the registry's
        // own href is the legacy /tcode/ page
        if (txCodes.has(n.label)) out.href = `/neo/transactions/${encodeURIComponent(n.label)}/`;
      } else if (n.kind === "bapi" || n.kind === "fm") {
        if (bapis.has(n.label)) {
          const d = bapiDetail(n.label);
          if (d?.he) out.he = d.he;
          if (d?.en) out.en = d.en;
          out.href = `/neo/bapi/${encodeURIComponent(n.label)}/`;
        }
      } else if (n.kind === "cds") {
        if (cds.has(n.label)) {
          const d = cdsDetail(n.label);
          if (d?.he) out.he = d.he;
          if (d?.en) out.en = d.en;
          out.href = `/neo/cds/${encodeURIComponent(n.label)}/`;
        }
      } else if (n.kind === "idoc") {
        if (idocs.has(n.label)) {
          const d = idocDetail(n.label);
          if (d?.he) out.he = d.he;
          if (d?.en) out.en = d.en;
          out.href = `/neo/idoc/${encodeURIComponent(n.label)}/`;
        }
      } else if (n.kind === "fiori") {
        if (NO_APP.test(n.label)) out.none = true;
        else {
          const a = fioriApp(n.label);
          if (a) { out.he = a.he; out.en = a.name; out.href = `/neo/fiori-apps/${encodeURIComponent(a.slug)}/`; }
        }
      }
      nodes.push(out);
    }

    const edges: [string, string][] = [];
    for (const [a, set] of h.adj) for (const b of set) if (a < b && h.nodes.has(a) && h.nodes.has(b)) edges.push([a, b]);
    edges.sort((x, y) => x[0].localeCompare(y[0]) || x[1].localeCompare(y[1]));

    // a process step whose code is not a table of this module keeps its page
    // when NEO has one (AFRU is a PP-PI table page; COGI a transaction page)
    const flow: StudioStep[] = (FLOWS[mod] || []).map((s) => {
      const step: StudioStep = { label: s.label, code: s.code };
      if (!h.nodes.has(s.code)) {
        if (tables.has(s.code)) { step.href = `/neo/tables/${encodeURIComponent(s.code)}/`; const he = tableHe.get(s.code); if (he) step.he = he; }
        else if (txCodes.has(s.code)) { step.href = `/neo/transactions/${encodeURIComponent(s.code)}/`; const t = registryTx(s.code); if (t?.he) step.he = t.he; }
      }
      return step;
    });

    const zones = ZONES.filter((z) => nodes.some((n) => n.k === "table" && n.z === z.id)).map((z) => ({ id: z.id, he: z.he }));
    return { nodes: nodes.sort((a, b) => a.id.localeCompare(b.id)), edges, master: [...h.master], flow, zones };
  };

  return { PM: build("PM"), "PP-PI": build("PP-PI") };
}
