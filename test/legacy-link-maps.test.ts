// A legacy address that NEO code still links (old tool data, the learning
// tracks, record datasets) must open the page vercel.json now redirects that
// address to. The three maps that translate them drifted once: after /story/,
// /qa-testing/, /security/, /alm/, /delivery/, /sap-infrastructure/, /fiori/
// and /integration/ were rebuilt at their own address under /neo/, the maps
// still sent those links to the hubs they had fallen back on (review,
// 2026-10-03). vercel.json is the authority: scripts/gen-legacy-redirects.mjs
// writes it from the export, exact twin first.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import "./app-modules.mjs";

const { NEO_HREF, neoHref } = await import("../components/neo-shell/academy-ref/tracks-data.ts");
const { FAMILY_SLUGS, neoOf } = await import("../components/neo-shell/records/links.ts");
const { LEGACY } = await import("../components/neo-shell/tools/links.ts");
const { LEARN_PATHS } = await import("../data/learn/paths.ts");

interface Rule { source: string; destination: string; has?: unknown }
// The www → apex rule is conditioned on the host, not a page of the site.
const RULES = (JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8")).redirects as Rule[]).filter((r) => !r.has);

// The path-to-regexp subset the generator writes (literal segments, :name,
// :name(regex)), applied first match wins as Vercel does. The generator's own
// matcher is not imported: importing the script runs it, and it writes vercel.json.
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function redirect(path: string): string | null {
  for (const r of RULES) {
    const names: string[] = [];
    const re = r.source.replace(/:([A-Za-z]+)(\(((?:[^()\\]|\\.)+)\))?|[^:]+/g, (m: string, name?: string, _g?: string, rx?: string) => {
      if (!name) return esc(m);
      names.push(name);
      return `(${rx || "[^/]+"})`;
    });
    const m = path.match(new RegExp(`^${re}$`));
    if (m) return names.reduce((d, n, i) => d.replace(new RegExp(`:${n}\\b`, "g"), m[i + 1]), r.destination);
  }
  return null;
}

test("the learning tracks link a legacy address where vercel.json redirects it", () => {
  for (const [legacy, to] of Object.entries(NEO_HREF)) assert.equal(to, redirect(legacy), legacy);
  // every address the tracks' own data holds, the /troubleshooting/<slug>/ ones included
  const hrefs = Object.values(LEARN_PATHS).flatMap((p) => p.steps.map((s) => s.href).filter((h): h is string => !!h));
  assert.ok(hrefs.length > 0);
  for (const h of hrefs) assert.equal(neoHref(h), redirect(h), h);
});

test("the tool pages link a legacy address where vercel.json redirects it", () => {
  for (const [legacy, to] of Object.entries(LEGACY)) {
    // "/erd/" was never a legacy page (the ERD is NEO's own); nothing redirects it.
    if (legacy === "/erd/") { assert.equal(redirect(legacy), null); continue; }
    assert.equal(to, redirect(legacy), legacy);
  }
});

test("a record links a legacy address to its NEO twin first, and never elsewhere than the redirect", () => {
  for (const { source } of RULES) {
    // Patterns are covered by the family loop below. "/" → "/neo/" is the
    // site root's own (temporary) redirect, not a legacy page a record names.
    if (/[:(]/.test(source) || source === "/") continue;
    const to = redirect(source);
    const got = neoOf(source);
    // The same page at the same address under /neo/ is what the generator
    // picks first; a record link must land there too.
    if (to === `/neo${source}`) assert.equal(got, to, source);
    // Otherwise a record may decline to link (it shows the value; e.g. /graph/
    // or /design/, which only reach an alias or a hub), but never links elsewhere.
    else if (got !== null) assert.equal(got, to, source);
  }
  for (const [family, slugs] of Object.entries(FAMILY_SLUGS() as Record<string, Set<string>>)) {
    for (const slug of slugs) {
      const legacy = `/${family}/${slug}/`;
      assert.equal(neoOf(legacy), redirect(legacy), legacy);
    }
  }
});

test("legacy offline links lead home while the worker keeps its dedicated NEO offline page", () => {
  for (const href of ["/offline/", "/offline", "/offline/?retry=1#status"]) {
    assert.equal(neoOf(href), "/neo/", href);
  }
  assert.equal(neoOf("/neo/offline/"), "/neo/offline/");
});
