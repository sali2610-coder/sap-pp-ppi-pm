// Route-existence guards — a cross-link must resolve to a statically-generated
// page (dynamicParams=false). Mirrors each route's generateStaticParams source
// so link chips render as plain (non-link) when no page exists. Prevents dead
// links without dropping the information.
// Imports ONLY the generated string manifest (a few KB), never the datasets —
// so the client <SmartLink> resolver stays lightweight. Regenerate the manifest
// with `npm run gen:routes` after any dataset change (committed artifact).
import { ROUTE_MANIFEST as M } from "@/lib/route-manifest.generated";

let _obj: Set<string> | null = null, _tc: Set<string> | null = null, _fn: Set<string> | null = null,
    _id: Set<string> | null = null, _cds: Set<string> | null = null, _apps: Set<string> | null = null,
    _imp: Set<string> | null = null;
const norm = (s: string) => (s || "").trim();

export const objectHasPage = (c: string) => { _obj ??= new Set(M.objects); return _obj.has(norm(c)); };
const appHasPage = (c: string) => { _apps ??= new Set(M.apps); const n = norm(c); return _apps.has(n) || _apps.has(n.toUpperCase()); };
const impactHasPage = (c: string) => { _imp ??= new Set(M.impact); return _imp.has(norm(c)); };

export const tcodeHasPage = (c: string) => { _tc ??= new Set(M.tcodes); return _tc.has(norm(c).toUpperCase()); };
export const funcHasPage = (n: string) => { _fn ??= new Set(M.bapiFm); return _fn.has(norm(n)); };
export const idocHasPage = (n: string) => { _id ??= new Set(M.idocs); return _id.has(norm(n)); };
export const cdsHasPage = (v: string) => { _cds ??= new Set(M.cds); return _cds.has(norm(v)); };

// a clean SAP code token (no descriptive noise like "IA05 verify SE93")
export const isCleanCode = (s: string) => /^[A-Za-z][A-Za-z0-9_/]{1,}$/.test(norm(s));

// ── unified internal-route resolver ──
// Returns FALSE only when we can AFFIRMATIVELY prove the target static page is
// missing (family is modeled + item not in its generateStaticParams set).
// For every unmodeled family or non-internal href it FAILS OPEN (true) so real
// links are never downgraded. Used by <SmartLink> to render dead cross-links as
// plain, non-navigating chips instead of 404s.
const DYNAMIC: Record<string, (seg: string) => boolean> = {
  object: objectHasPage,
  tcode: tcodeHasPage,
  apps: appHasPage,
  bapi: funcHasPage,
  idoc: idocHasPage,
  cds: cdsHasPage,
  impact: impactHasPage,
};

export function pageExists(href: string): boolean {
  const h = norm(href);
  if (!h || !h.startsWith("/") || h.startsWith("//")) return true; // external / protocol-relative / hash / mailto
  const path = h.split("#")[0].split("?")[0].replace(/^\//, "");
  const slash = path.indexOf("/");
  const fam = slash === -1 ? path : path.slice(0, slash);
  const check = DYNAMIC[fam];
  if (!check) return true;                               // unmodeled family → trust it
  // The remainder after the family is the code. Codes MAY contain "/" (e.g.
  // "V/06", "/SCWM/MON") — those pages exist under URL-encoded params — so keep
  // the whole remainder and decode it, rather than splitting on "/".
  const raw = (slash === -1 ? "" : path.slice(slash + 1)).replace(/\/$/, "");
  if (!raw) return true;                                 // family index route
  let code = raw;
  try { code = decodeURIComponent(raw); } catch { /* keep raw */ }
  return check(code);
}
