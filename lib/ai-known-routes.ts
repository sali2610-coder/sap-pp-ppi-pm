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

export type SapKind = "tcode" | "table" | "bapi" | "cds";

export interface KnownRoutes {
  all: Set<string>;
  href: Map<string, string>;
  kind: Map<string, SapKind>;
}

let cache: KnownRoutes | null = null;

/** Built once per process; the underlying registries are static imports. */
export function knownRoutes(): KnownRoutes {
  if (cache) return cache;
  const all = new Set<string>();
  const href = new Map<string, string>();
  const kind = new Map<string, SapKind>();
  const add = (id: string | undefined, to: string, k: SapKind) => {
    const key = (id || "").trim().toUpperCase();
    if (!key || href.has(key)) return;
    all.add(key);
    href.set(key, to.replace("%s", encodeURIComponent(key)));
    kind.set(key, k);
  };

  for (const c of registryCodes()) add(c, "/tcode/%s", "tcode");
  for (const c of listTcodes()) add(c, "/tcode/%s", "tcode");
  for (const o of registry()) add(o.id, "/bapi/%s", "bapi");
  for (const v of listCdsViews()) add(v, "/cds/%s", "cds");
  // Tables live on a single indexed page, addressed by anchor.
  for (const t of ALL_TABLES) add(t.tableName, "/tables#%s", "table");

  cache = { all, href, kind };
  return cache;
}
