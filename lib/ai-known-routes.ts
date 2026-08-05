// The set of identifiers NEO actually has a page for.
//
// This is built from the SAME registries that feed generateStaticParams, so a
// link the AI produces can never point at a route that was not exported. If an
// identifier is absent here, ai-links leaves it as plain text and (for SAP
// Notes) falls back to an official SAP destination.
import { listTcodes } from "@/lib/object-intel";
import { registryCodes } from "@/lib/tx-registry";
import { registry } from "@/lib/bapi-registry";
import { listCdsViews } from "@/data/cds-map";
import { ALL_TABLES } from "@/data/sapData";

export interface KnownRoutes {
  all: Set<string>;
  href: Map<string, string>;
}

let cache: KnownRoutes | null = null;

/** Built once per process; the underlying registries are static imports. */
export function knownRoutes(): KnownRoutes {
  if (cache) return cache;
  const all = new Set<string>();
  const href = new Map<string, string>();
  const add = (id: string | undefined, to: string) => {
    const k = (id || "").trim().toUpperCase();
    if (!k || href.has(k)) return;
    all.add(k);
    href.set(k, to.replace("%s", encodeURIComponent(k)));
  };

  for (const c of registryCodes()) add(c, "/tcode/%s");
  for (const c of listTcodes()) add(c, "/tcode/%s");
  for (const o of registry()) add(o.id, "/bapi/%s");
  for (const v of listCdsViews()) add(v, "/cds/%s");
  // Tables live on a single indexed page, addressed by anchor.
  for (const t of ALL_TABLES) add(t.tableName, "/tables#%s");

  cache = { all, href };
  return cache;
}
