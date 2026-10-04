/* ============================================================================
   PROJECT NEO · RECORDS — where a record may link.
   ----------------------------------------------------------------------------
   SERVER ONLY, build time. Every href a record page emits comes from here and
   is a string only when the NEO page behind it is generated, so the dead-link
   crawl (scripts/crawl-dead-links.mjs) cannot find a record link that opens
   nothing. A code with no NEO page is still shown, as a value.

   The SAP reference families are gated by the same lists their routes build
   from (../reference/ref-links). The record families rebuilt in this folder
   are gated by their own datasets, the same lists their generateStaticParams
   read.
   ========================================================================== */

import { bapiHref, cdsHref, idocHref, objectHref, txHref } from "../reference/ref-links";
import { incidentSlugs } from "../learn/incidents-data";
import { centerFamily, centerItem } from "../centers/centers-data";
import { EXITS, exitSlug } from "@/data/exits";
import { SAP_NOTES } from "@/data/sap-notes";
import { SOLUTIONS } from "@/data/solutions";
import { ECC_S4_TOPICS } from "@/data/ecc-s4";
import { QA_PACKS } from "@/data/qa-center";
import { AUTH_ITEMS } from "@/data/authorizations";
import { PROCESS_MAPS } from "@/data/processes";
import { PROCESS_GUIDES } from "@/data/process-guides";
import { STORIES } from "@/data/story/pppi-process-order";
import { OIC_OBJECTS } from "@/lib/cross-links";
import { classifyFunc, cleanFunc, listProcesses } from "@/lib/object-intel";
import type { Ref } from "./kit";

const memo = <T,>(fn: () => T): (() => T) => {
  let v: T | undefined;
  let done = false;
  return () => { if (!done) { v = fn(); done = true; } return v as T; };
};

/* ------------------------------------------------- the record families */

/** The slugs each rebuilt family generates, keyed by its URL segment. The
 *  routes in app/neo/<family>/[slug] read the same lists. */
export const FAMILY_SLUGS = memo((): Record<string, Set<string>> => ({
  exits: new Set(EXITS.map((e) => exitSlug(e.name))),
  "sap-notes": new Set(SAP_NOTES.map((n) => n.slug)),
  solutions: new Set(SOLUTIONS.map((s) => s.slug)),
  "ecc-s4": new Set(ECC_S4_TOPICS.map((t) => t.slug)),
  oic: new Set(OIC_OBJECTS.map((o) => o.slug)),
  "qa-testing": new Set(QA_PACKS.map((p) => p.slug)),
  security: new Set(AUTH_ITEMS.map((a) => a.slug)),
  "process-explorer": new Set(PROCESS_MAPS.map((p) => p.slug)),
  guides: new Set(PROCESS_GUIDES.map((g) => g.slug)),
  process: new Set(listProcesses().map((p) => p.slug)),
  story: new Set(Object.keys(STORIES)),
}));

const own = (family: string, slug: string): string | null =>
  FAMILY_SLUGS()[family]?.has(slug) ? `/neo/${family}/${slug}/` : null;

const incSet = memo(() => new Set(incidentSlugs()));

export const incidentHref = (slug: string): string | null =>
  incSet().has(slug) ? `/neo/incidents/${encodeURIComponent(slug)}/` : null;
export const exitHref = (name: string): string | null => own("exits", exitSlug(name));
export const noteHref = (slug: string): string | null => own("sap-notes", slug);
export const oicHref = (slug: string): string | null => own("oic", slug);
export const processHref = (slug: string): string | null => own("process", slug);
export const centerHref = (family: string, slug: string): string | null =>
  centerItem(family, slug) ? `/neo/centers/${family}/${encodeURIComponent(slug)}/` : null;

/** A function object: an IDoc message type has one home (/neo/idoc), every
 *  other function its BAPI/FM page. Gated on the cleaned name, shown as written. */
export const funcHref = (name: string): string | null => {
  const c = cleanFunc(name);
  if (!c) return null;
  return classifyFunc(c) === "IDoc" ? idocHref(c) : bapiHref(c) ?? idocHref(c);
};

/* ----------------------------------------------------------- one value */

export const txRef = (code: string, sub?: string): Ref => ({ label: code, href: txHref(code), sub });
export const tableRef = (name: string, sub?: string): Ref => ({ label: name, href: objectHref(name), sub });
export const funcRef = (name: string, sub?: string): Ref => ({ label: name, href: funcHref(name), sub });
export const cdsRef = (view: string, sub?: string): Ref => ({ label: view, href: cdsHref(view), sub });
export const exitRef = (name: string, sub?: string): Ref => ({ label: name, href: exitHref(name), sub });
export const plain = (label: string, sub?: string): Ref => ({ label, sub });

/* --------------------------------------------------- a legacy address */

/** Top-level NEO destinations a legacy family root maps onto. Only pages the
 *  export really generates are listed. */
const ROOT: Record<string, string> = {
  tcode: "/neo/transactions/", object: "/neo/tables/", tables: "/neo/tables/", bapi: "/neo/bapi/",
  idoc: "/neo/idoc/", cds: "/neo/cds/", troubleshooting: "/neo/incidents/", resolution: "/neo/incidents/",
  incidents: "/neo/incidents/", pm: "/neo/pm/", "pp-pi": "/neo/pp-pi/", s4hana: "/neo/s4hana/",
  "migration-cockpit": "/neo/migration-cockpit/", knowledge: "/neo/knowledge/", "fiori-apps": "/neo/fiori-apps/",
  enhancements: "/neo/enhancements/", domain: "/neo/domain-model/",
  // Match the redirect generator's BEFORE_TWIN exception: online legacy
  // links go home; /neo/offline/ is reserved for the worker's offline fallback.
  offline: "/neo/",
};

/** Legacy pages NEO rebuilt at the same address under /neo/ (a static page,
 *  app/neo/<path>/page.tsx) that no family rule below reaches. The redirect
 *  generator (scripts/gen-legacy-redirects.mjs) sends such an address to that
 *  exact twin before any hub, so a record link does the same: /fiori/ is the
 *  Fiori and UX course at /neo/fiori/, not the Fiori centre.
 *  test/legacy-link-maps.test.ts checks this list against vercel.json. */
const TWIN = new Set([
  "/academy/", "/ai/", "/alm/", "/certification/", "/chat/", "/connector/", "/delivery/", "/domain-model/",
  "/evolution/", "/fiori/", "/import/", "/integration/", "/knowledge/coverage/", "/notes-graph/",
  "/onboarding/", "/privacy/", "/quality-audit/", "/s4-readiness/", "/sap-infrastructure/", "/studio/",
  "/transactions/", "/verification/", "/workbench/",
]);

/** The NEO twin of a legacy href, or null when NEO has no page for it: the
 *  value is then shown, not linked. An already-NEO href is returned as is. */
export function neoOf(href?: string | null): string | null {
  if (!href || href.startsWith("#")) return null;
  if (href.startsWith("/neo/")) return href;
  const path = href.split(/[?#]/)[0];
  const slashed = path.endsWith("/") ? path : `${path}/`;
  if (TWIN.has(slashed)) return `/neo${slashed}`;
  const [fam, raw] = path.split("/").filter(Boolean);
  if (!fam) return null;
  let id = "";
  try { id = raw ? decodeURIComponent(raw) : ""; } catch { id = raw || ""; }
  if (!id) {
    if (FAMILY_SLUGS()[fam]) return `/neo/${fam}/`;
    if (centerFamily(fam)) return `/neo/centers/${fam}/`;
    return ROOT[fam] ?? null;
  }
  switch (fam) {
    case "tcode": return txHref(id);
    case "object": case "tables": return objectHref(id);
    case "bapi": case "idoc": return funcHref(id);
    case "cds": return cdsHref(id);
    case "troubleshooting": case "resolution": return incidentHref(id);
    default:
      if (FAMILY_SLUGS()[fam]) return own(fam, id);
      if (centerFamily(fam)) return centerHref(fam, id);
      return null;
  }
}
