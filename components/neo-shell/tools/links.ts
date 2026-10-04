/* ============================================================================
   PROJECT NEO · TOOLS — where a value on a tool page may link.
   ----------------------------------------------------------------------------
   SERVER ONLY (build time). The tool pages (ALM, delivery, evolution, notes
   graph, verification, workbenches, …) name tables, T-Codes, BAPIs, CDS views
   and incidents. A name becomes a link only when the NEO route behind it is in
   the very list that route's generateStaticParams builds from; otherwise it is
   rendered as a plain LTR value. Nothing here decides what a record says.
   ========================================================================== */

import { INCIDENTS } from "@/data/troubleshooting";
import { tableDetailNames, tableHref } from "../data/tables-detail";
import { bapiHref, cdsHref, fioriHref, idocHref, objectHref, txHref } from "../reference/ref-links";

export { bapiHref, cdsHref, fioriHref, idocHref, objectHref, txHref };

let _tables: Set<string> | null = null;
let _inc: Set<string> | null = null;

/** A table's dictionary page when it has one, its object page otherwise. */
export function tableLink(name: string): string | null {
  const n = (name || "").trim();
  _tables ??= new Set(tableDetailNames());
  if (_tables.has(n)) return tableHref(n);
  return objectHref(n);
}

/** Any SAP code: a T-Code first, then a table, a BAPI/FM, an IDoc, a CDS view. */
export function codeLink(code: string): string | null {
  const c = (code || "").trim();
  if (!c) return null;
  return txHref(c) || tableLink(c) || bapiHref(c) || idocHref(c) || cdsHref(c);
}

/** /neo/incidents/<slug>/ is generated for every slug in data/troubleshooting. */
export function incidentLink(slug: string): string | null {
  _inc ??= new Set(INCIDENTS.map((i) => i.slug));
  return _inc.has(slug) ? `/neo/incidents/${encodeURIComponent(slug)}/` : null;
}

/** The SAP-note topic pages are built from data/sap-notes by the notes agent;
 *  the brief links them by path. */
export const noteLink = (slug: string) => `/neo/sap-notes/${encodeURIComponent(slug)}/`;

/* The legacy hrefs the old tool data carries, mapped to the NEO page that does
   the same job: where vercel.json redirects the address, that destination
   (test/legacy-link-maps.test.ts holds the two together). A legacy href with
   no entry here renders as plain text. */
export const LEGACY: Record<string, string> = {
  "/alm/": "/neo/alm/",
  "/delivery/": "/neo/delivery/",
  "/onboarding/": "/neo/onboarding/",
  "/evolution/": "/neo/evolution/",
  "/workbench/": "/neo/workbench/",
  "/sap-infrastructure/": "/neo/sap-infrastructure/",
  "/s4hana/": "/neo/s4hana/",
  "/migration-cockpit/": "/neo/migration-cockpit/",
  "/security/": "/neo/security/",
  "/authorizations/": "/neo/centers/process-auth/",
  "/integration/": "/neo/integration/",
  "/fiori/": "/neo/fiori/",
  "/cds/": "/neo/cds/",
  "/idoc/": "/neo/idoc/",
  "/incidents/": "/neo/incidents/",
  "/pm/": "/neo/pm/",
  "/pp-pi/": "/neo/pp-pi/",
  "/s4-readiness/": "/neo/s4-readiness/",
  "/knowledge/": "/neo/knowledge/",
  "/certification/": "/neo/certification/",
  "/learn/": "/neo/academy/tracks/",
  "/academy/": "/neo/academy/",
  "/story/": "/neo/story/",
  "/erd/": "/neo/erd/",
  "/architect/": "/neo/studio/",
};

export function neoHrefOf(href: string): string | null {
  const h = (href || "").split("#")[0];
  if (!h) return null;
  const inc = h.match(/^\/(?:troubleshooting|resolution)\/([^/]+)\/?$/);
  if (inc) return incidentLink(inc[1]);
  return LEGACY[h.endsWith("/") ? h : `${h}/`] ?? null;
}
