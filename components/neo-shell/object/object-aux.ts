/* ============================================================================
   PROJECT NEO · THE SUPPLEMENTAL OBJECT PAGE — data layer.
   ----------------------------------------------------------------------------
   SERVER ONLY, build time.

   81 of the project's 186 objects are not in the PM/PP-PI migration blueprint,
   so `objectView()` — which is built entirely on the ER model — returns null for
   every one of them. That is correct behaviour, not a bug: those objects have no
   modelled edges, no JOIN statements and no place in the process chain, and a
   page that implied otherwise would be inventing SAP structure.

   This file builds the page they CAN honestly have, from the registry that owns
   each one, and states which registry that was. Two shapes:

     HR / BW (65)  a real dictionary record — PK, fields, relations, T-Codes,
                   Fiori app, S/4 note. Everything the adapter carries is
                   rendered; nothing is padded.
     VERIFIED (16) a curated cross-module reference — business meaning, aliases,
                   ECC and S/4 availability, related objects, T-Codes, and for
                   two of them a PP-PI connection and use cases. It carries NO
                   field list, and the page says so instead of implying one.

   WHAT THIS FILE REFUSES TO DO
     · invent a field, a key, a cardinality, a T-Code or an S/4 note
     · borrow the blueprint's S/4 resolver for an object the blueprint does not
       document — `lib/s4`'s curated map is keyed on blueprint tables, and asking
       it about PA0000 would return "needs verification" dressed as an answer.
       The registry's own `s4` sentence is printed verbatim instead.
     · link anywhere without asking the shared registry whether the page exists.
   ========================================================================== */

import { hrBwTableByName } from "@/lib/hr-bw-adapter";
import { HR_TABLES } from "@/data/hr-module";
import { BW_TABLES } from "@/data/bw-module";
import { verifiedObject, LO_HU_DOMAIN, type DataDomain, type VerifiedObject } from "@/data/verified-objects";
import { txHref, cdsHref, bapiHref, fioriHref } from "../reference/ref-links";
import { hasObjectPage, objectSource } from "./object-names";
import { splitTcodes } from "../erd/model";

/* ------------------------------------------------------------------ types */

export interface AuxLink {
  /** The identifier as the registry wrote it. Always shown. */
  t: string;
  /** A destination only when the project generates a page for it. */
  href: string | null;
  /** Hebrew gloss where the registry carries one. */
  he?: string;
}

export interface AuxField {
  tech: string;
  en: string;
  len: string;
  /** "PK" / "-" / whatever the registry wrote. Printed, not interpreted. */
  key: string;
}

export interface AuxRelation {
  role: "parent" | "child";
  table: string;
  href: string | null;
  card: string;
  desc: string;
}

export interface AuxView {
  source: "hrbw" | "verified";
  name: string;
  he: string;
  en: string;
  /** The registry's own family label — "HR" / "BW" / the owning module code. */
  family: string;
  familyHe: string;
  /** Zone (HR/BW) or business area (verified). The registry's own words. */
  area: string;
  /** Every module the registry says uses the object. */
  modules: string[];
  /** ECC / S/4 availability, verbatim. "" when the registry is silent. */
  ecc: string;
  s4: string;
  s4alt: string;
  /** HR/BW only: landscape (ECC / SuccessFactors / Hybrid) as written. */
  landscape: string;
  guide: string;
  fiori: AuxLink | null;
  tcodes: AuxLink[];
  cds: AuxLink[];
  funcs: AuxLink[];
  pk: string[];
  fields: AuxField[];
  relations: AuxRelation[];
  /* verified-only */
  aliases: string[];
  keywords: string[];
  related: AuxLink[];
  useCases: string[];
  ppPi: string;
  status: string;
  statusHe: string;
  domain: DataDomain | null;
  /** Sibling objects in the same zone / area, so the page is not a dead end. */
  siblings: AuxLink[];
}

/* ---------------------------------------------------------------- helpers */

const clean = (s?: string) => (s || "").trim();
const link = (t: string, he?: string): AuxLink => ({
  t,
  href: hasObjectPage(t) ? `/neo/object/${encodeURIComponent(t)}/` : null,
  he,
});

/** Verification status, in the registry's own vocabulary. The Hebrew is a
 *  translation of the flag, not a judgement added on top of it. */
const STATUS_HE: Record<string, string> = {
  verified: "מאומת",
  "needs-review": "נדרש אימות נוסף",
  "cross-module": "חוצה מודולים",
  "s4-only": "S/4HANA בלבד",
  "ecc-only": "ECC בלבד",
};

const FAMILY_HE: Record<string, string> = {
  HR: "משאבי אנוש · HCM / SuccessFactors",
  BW: "אנליטיקה · BW / Embedded Analytics",
};

/* ------------------------------------------------------------------ HR/BW */

/** The raw registry row behind an adapted SAPTable. The adapter drops `zone`
 *  and `landscape`, and both are real content, so the row is read directly. */
type RawRow = (typeof HR_TABLES)[number] | (typeof BW_TABLES)[number];
let _raw: Map<string, RawRow> | null = null;
function rawRow(name: string): RawRow | undefined {
  if (!_raw) {
    _raw = new Map();
    for (const r of HR_TABLES) _raw.set(r.name, r);
    for (const r of BW_TABLES) _raw.set(r.name, r);
  }
  return _raw.get(name);
}

/** Other objects in the same registry zone — the HR/BW equivalent of a
 *  neighbourhood, taken from the registry's own `zone` field. */
function zoneSiblings(name: string, zone: string): AuxLink[] {
  if (!zone) return [];
  const all = [...HR_TABLES, ...BW_TABLES];
  return all
    .filter((r) => r.zone === zone && r.name !== name)
    .map((r) => link(r.name, r.he))
    .slice(0, 12);
}

function hrbwView(name: string): AuxView | null {
  const t = hrBwTableByName(name);
  const r = rawRow(name);
  if (!t || !r) return null;

  const codes = splitTcodes(t.tcodes);
  const zone = clean(r.zone);

  return {
    source: "hrbw",
    name,
    he: clean(t.descriptionHe),
    en: clean(t.descriptionEn),
    family: String(t.module),
    familyHe: FAMILY_HE[String(t.module)] || String(t.module),
    area: zone,
    modules: [String(t.module)],
    ecc: "",
    s4: clean(t.s4Note),
    s4alt: clean(t.s4AltTable),
    landscape: clean((r as { landscape?: string }).landscape),
    guide: clean(t.guideHe),
    fiori: t.fioriApp ? { t: clean(t.fioriApp), href: null } : null,
    tcodes: codes.map((c) => ({ t: c, href: txHref(c) })),
    cds: (r.cds || []).map((v) => ({ t: v, href: cdsHref(v) })),
    funcs: t.funcs.map(([fn]) => ({ t: fn, href: bapiHref(fn) })),
    pk: r.pk || [],
    fields: t.fields.map((f) => ({
      tech: f.tech, en: f.en || f.he || "", len: f.len || "", key: f.key || "-",
    })),
    relations: t.relations.map((rel) => ({
      role: rel.role,
      table: rel.table,
      href: hasObjectPage(rel.table) ? `/neo/object/${encodeURIComponent(rel.table)}/` : null,
      card: clean(rel.card),
      desc: clean(rel.desc),
    })),
    aliases: [],
    keywords: [],
    related: [],
    useCases: [],
    ppPi: "",
    status: "",
    statusHe: "",
    domain: null,
    siblings: zoneSiblings(name, zone),
  };
}

/* --------------------------------------------------------------- verified */

const DOMAIN_OF: Record<string, DataDomain> = { "LO-HU": LO_HU_DOMAIN };

function verifiedView(name: string): AuxView | null {
  const o: VerifiedObject | undefined = verifiedObject(name);
  if (!o) return null;

  return {
    source: "verified",
    name: o.name,
    he: clean(o.he),
    en: clean(o.en),
    family: o.primary,
    familyHe: clean(o.area),
    area: clean(o.area),
    modules: o.modules,
    ecc: clean(o.ecc),
    s4: clean(o.s4),
    s4alt: "",
    landscape: "",
    guide: "",
    fiori: null,
    tcodes: (o.tcodes || []).map((c) => ({ t: c, href: txHref(c) })),
    cds: [],
    funcs: [],
    pk: [],
    fields: [],
    relations: [],
    aliases: o.aliases || [],
    keywords: o.keywords || [],
    related: (o.related || []).map((t) => link(t)),
    useCases: o.useCases || [],
    ppPi: clean(o.ppPi),
    status: o.status,
    statusHe: STATUS_HE[o.status] || o.status,
    domain: o.domain ? DOMAIN_OF[o.domain] ?? null : null,
    siblings: [],
  };
}

/* ------------------------------------------------------------------ build */

const cache = new Map<string, AuxView | null>();

/** The supplemental view of an object, or null when the name belongs to the
 *  blueprint (in which case `objectView()` owns it) or to nothing at all. */
export function auxView(raw: string): AuxView | null {
  const name = (raw || "").toUpperCase();
  if (cache.has(name)) return cache.get(name) ?? null;
  const src = objectSource(name);
  const v = src === "hrbw" ? hrbwView(name) : src === "verified" ? verifiedView(name) : null;
  cache.set(name, v);
  return v;
}

/** What the page can state about its own coverage, counted rather than claimed. */
export const auxSummary = (v: AuxView) => ({
  fields: v.fields.length,
  keys: v.fields.filter((f) => f.key.toUpperCase() === "PK").length || v.pk.length,
  relations: v.relations.length,
  tcodes: v.tcodes.length,
  linkedTcodes: v.tcodes.filter((c) => c.href).length,
  related: v.related.length,
  linkedRelated: v.related.filter((c) => c.href).length,
});

export { fioriHref };
