#!/usr/bin/env node
// gen-legacy-redirects · Project NEO is the only site. Every page of the
// pre-NEO interface still in the export (out/**/index.html outside /neo/) gets
// a redirect to its NEO counterpart, written into vercel.json, so the old shell
// is never rendered to a reader. The export itself is the source of truth for
// both sides: a target is used only if out/neo/<target>/index.html exists.
//
//   node scripts/gen-legacy-redirects.mjs            write vercel.json + print the report
//   node scripts/gen-legacy-redirects.mjs --check    verify vercel.json covers every legacy page
//   REPORT=<json> node scripts/gen-legacy-redirects.mjs   also write the per-page report
//
// A target is "exact" (the same record in NEO), "equivalent" (the same thing
// in NEO's form: a textbook's course, a book's reader) or "hub" (no NEO page
// yet; the closest NEO section). Hubs are reported by family, never hidden.
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out");
const VERCEL = path.join(ROOT, "vercel.json");
const CHECK = process.argv.includes("--check");

/* ------------------------------------------------------------ the pages */
const pagesUnder = (dir) => {
  const r = [];
  const walk = (d) => { for (const n of readdirSync(d, { withFileTypes: true })) { const p = path.join(d, n.name); if (n.isDirectory()) walk(p); else if (n.name === "index.html") r.push("/" + path.relative(OUT, d).split(path.sep).join("/") + "/"); } };
  walk(dir);
  return r;
};
const NEO = new Set(pagesUnder(path.join(OUT, "neo")));
NEO.add("/neo/");
const has = (p) => NEO.has(p);
// Pages that are not the pre-NEO shell: the 404 frames (they render the NEO
// 404) and the redesign's own direction boards (bare specimens, deliverable 7).
const KEEP = (p) => p === "/404/" || p === "/_not-found/" || p.startsWith("/design/redesign-2026/");
const LEGACY = [];
for (const n of readdirSync(OUT, { withFileTypes: true })) {
  if (!n.isDirectory() || n.name === "neo" || n.name === "_next") continue;
  for (const p of pagesUnder(path.join(OUT, n.name))) if (!KEEP(p)) LEGACY.push(p);
}
LEGACY.sort();

/* ------------------------------------------------------ NEO lookups */
const lessonCourse = new Map(); // slug -> course id, from /neo/academy/<course>/<slug>/
for (const p of NEO) { const m = p.match(/^\/neo\/academy\/([^/]+)\/([^/]+)\/$/); if (m) lessonCourse.set(m[2], m[1]); }
const centers = new Map(); // slug -> /neo/centers/<family>/<slug>/
for (const p of NEO) { const m = p.match(/^\/neo\/centers\/([^/]+)\/([^/]+)\/$/); if (m && !centers.has(m[2])) centers.set(m[2], p); }
// The digital library's textbooks and the NEO course each became (the course
// lessons are a content-preserving migration of the textbook;
// data/academy/lessons/<id>-generated.ts, lib/academy/model.ts).
const TEXTBOOK = { pp: "pp-pi", "pm-academy": "pm", "qm-academy": "qm", "mm-academy": "mm", "wm-academy": "wm", "ppds-academy": "pp-ds", "sop-academy": "sop", "pmu-academy": "pm-user" };
const REPORT_OF = { pp: "pp-pi", pm: "pm", qm: "qm", mm: "mm", wm: "wm", ppds: "pp-ds", sop: "sop", pmu: "pm-user" };
const LESSON_PREFIX = { mm: "mm", wm: "wm", "pp-ds": "ppds", sop: "sop", "pm-user": "pmu" };
const recordOf = (code) => {
  for (const f of ["transactions", "tables", "object", "cds", "idoc", "bapi"]) if (has(`/neo/${f}/${code}/`)) return `/neo/${f}/${code}/`;
  return null;
};
const CENTER_FAMILIES = ["abap", "blueprints", "config", "debugging", "fiori", "integration", "manufacturing", "migration", "playbooks", "toolkit"];
// One NEO section per legacy family whose pages have no NEO record yet.
const HUB = {
  tcode: "/neo/transactions/", apps: "/neo/transactions/", resolution: "/neo/incidents/", troubleshooting: "/neo/incidents/",
  impact: "/neo/s4hana/", concepts: "/neo/knowledge/", exits: "/neo/enhancements/", "sap-notes": "/neo/incidents/",
  oic: "/neo/knowledge/", solutions: "/neo/best-practices/", process: "/neo/domain-model/", "process-explorer": "/neo/domain-model/",
  story: "/neo/domain-model/", learn: "/neo/academy/", "qa-testing": "/neo/centers/", workbench: "/neo/centers/", guides: "/neo/centers/",
  security: "/neo/centers/process-auth/", authorizations: "/neo/centers/process-auth/", "ecc-s4": "/neo/s4-readiness/",
  pm: "/neo/pm/", "pp-pi": "/neo/pp-pi/", design: "/neo/", bapi: "/neo/bapi/", object: "/neo/tables/", cds: "/neo/cds/",
  domain: "/neo/domain-model/", "fiori-apps": "/neo/fiori-apps/", enhancements: "/neo/enhancements/", idoc: "/neo/idoc/",
  knowledge: "/neo/knowledge/", academy: "/neo/academy/", library: "/neo/books/",
};
// Single pre-NEO tools, each to the NEO surface that does that job.
const SINGLE = {
  "/architect/": ["/neo/studio/", "equivalent"], "/copilot/": ["/neo/chat/", "equivalent"], "/brain/": ["/neo/ai/", "equivalent"],
  "/graph/": ["/neo/erd/", "hub"], "/lineage/": ["/neo/erd/", "hub"], "/notes-graph/": ["/neo/knowledge/", "hub"],
  "/mrp/": ["/neo/domain/pppi-mrp/", "equivalent"], "/onboarding/": ["/neo/academy/", "hub"], "/delivery/": ["/neo/centers/toolkit/", "hub"],
  "/alm/": ["/neo/", "hub"], "/connector/": ["/neo/", "hub"], "/evolution/": ["/neo/", "hub"], "/import/": ["/neo/", "hub"],
  "/quality-audit/": ["/neo/s4-readiness/", "hub"], "/sap-infrastructure/": ["/neo/", "hub"], "/verification/": ["/neo/s4hana/", "hub"],
  // Visited online, the old offline page leads home; the worker reaches the
  // NEO offline page from its cache, never through this address.
  "/offline/": ["/neo/", "equivalent"],
};

/* ------------------------------------------------------ one page -> target */
function resolve(p) {
  const seg = p.split("/").filter(Boolean);
  const fam = seg[0];
  if (SINGLE[p] && has(SINGLE[p][0])) return SINGLE[p];
  // the same record at the same address under /neo/
  if (has("/neo" + p)) return ["/neo" + p, "exact"];
  if (fam === "academy") {
    if (seg[1] === "lesson" && lessonCourse.has(seg[2])) return [`/neo/academy/${lessonCourse.get(seg[2])}/${seg[2]}/`, "exact"];
    if (seg[1] === "path" && has(`/neo/academy/${seg[2]}/`)) return [`/neo/academy/${seg[2]}/`, "exact"];
    return ["/neo/academy/", seg.length === 1 ? "equivalent" : "hub"];
  }
  if (fam === "library") {
    if (seg.length === 1) return ["/neo/books/", "equivalent"];
    const book = seg[1] === "v2" ? seg[2] : seg[1];
    if (/^book\d+$/.test(book) && has(`/neo/read/${book}/`)) return [`/neo/read/${book}/`, "equivalent"];
    const course = TEXTBOOK[seg[1]];
    if (course) {
      if (seg[2] === "object" && seg[3]) { const r = recordOf(seg[3]); return r ? [r, "exact"] : [`/neo/academy/${course}/`, "hub"]; }
      const ch = seg[2]?.match(/^chapter-0*(\d+)$/);
      const pre = LESSON_PREFIX[course];
      if (ch && pre && has(`/neo/academy/${course}/${pre}-${ch[1]}-1/`)) return [`/neo/academy/${course}/${pre}-${ch[1]}-1/`, "equivalent"];
      return [`/neo/academy/${course}/`, "equivalent"];
    }
    const rep = seg[1].match(/^(.+)-quality-report$/);
    if (rep && REPORT_OF[rep[1]]) return [`/neo/academy/${REPORT_OF[rep[1]]}/`, "hub"];
    if (seg[1] === "academy" && seg[2] === "reference" && REPORT_OF[seg[3]]) return [`/neo/academy/${REPORT_OF[seg[3]]}/`, "hub"];
    if (seg[1] === "academy" && seg[2] === "fiori") return ["/neo/fiori-apps/", "hub"];
    if (seg[1] === "academy") return ["/neo/academy/", "equivalent"];
    if (seg[1] === "ask") return ["/neo/ai/", "equivalent"];
    return ["/neo/books/", "hub"];
  }
  if ((fam === "tcode" || fam === "apps") && seg[1]) { const r = recordOf(seg[1]); if (r) return [r, "exact"]; }
  if ((fam === "resolution" || fam === "troubleshooting") && has(`/neo/incidents/${seg[1]}/`)) return [`/neo/incidents/${seg[1]}/`, "exact"];
  if (fam === "impact" && seg[1]) { const r = recordOf(seg[1]); if (r) return [r, "exact"]; }
  if (fam === "concepts" && seg[1]) {
    for (const f of ["knowledge", "enhancements"]) if (has(`/neo/${f}/${seg[1]}/`)) return [`/neo/${f}/${seg[1]}/`, "exact"];
  }
  if (fam === "exits" && seg[1] && has(`/neo/enhancements/${seg[1].toLowerCase()}/`)) return [`/neo/enhancements/${seg[1].toLowerCase()}/`, "exact"];
  if (fam === "bapi" && seg[1] && has(`/neo/idoc/${seg[1]}/`)) return [`/neo/idoc/${seg[1]}/`, "exact"];
  if (CENTER_FAMILIES.includes(fam)) {
    if (!seg[1] && has(`/neo/centers/${fam}/`)) return [`/neo/centers/${fam}/`, "equivalent"];
    if (seg[1] && has(`/neo/centers/${fam}/${seg[1]}/`)) return [`/neo/centers/${fam}/${seg[1]}/`, "exact"];
  }
  // a knowledge page with the same slug in another NEO family
  if (seg[1] && ["guides", "authorizations", "ecc-s4", "learn", "workbench", "qa-testing", "pm", "pp-pi", "debugging", "fiori", "migration"].includes(fam) && centers.has(seg[1])) return [centers.get(seg[1]), "exact"];
  if (seg[1] && ["oic", "solutions"].includes(fam) && has(`/neo/knowledge/${seg[1]}/`)) return [`/neo/knowledge/${seg[1]}/`, "exact"];
  if (fam === "security" && seg[1]) { const r = recordOf(seg[1].toUpperCase()); if (r) return [r, "exact"]; }
  if (fam === "knowledge") return ["/neo/knowledge/", "hub"];
  if (HUB[fam] && has(HUB[fam])) return [HUB[fam], seg.length === 1 ? "equivalent" : "hub"];
  return ["/neo/", "hub"];
}

const RESOLVED = LEGACY.map((p) => { const [to, kind] = resolve(p); return { from: p, to, kind }; });
for (const r of RESOLVED) if (!has(r.to)) throw new Error(`target missing for ${r.from}: ${r.to}`);

/* ------------------------------------------ compress: patterns + exceptions */
// A pattern covers every page whose resolved target equals its template; the
// others become explicit entries, which vercel.json evaluates first.
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Each group lists candidate patterns for one family; the generator keeps the
// candidate that covers the most pages and writes the others as explicit
// entries (evaluated first). A hub pattern maps a family to one NEO section.
const hubPat = (f) => ({ source: `/${f}/:slug/`, dest: HUB[f] });
const GROUPS = [
  ...["pmu", "mm", "wm", "ppds", "sop", "pm", "pp", "qm"].map((pre) => {
    const course = { pmu: "pm-user", ppds: "pp-ds", pp: "pp-pi" }[pre] || pre;
    return [{ source: `/academy/lesson/:slug(${pre}-[^/]+)/`, dest: `/neo/academy/${course}/:slug/` }];
  }),
  [{ source: "/academy/path/:id/", dest: "/neo/academy/:id/" }],
  [{ source: "/tcode/:code/", dest: "/neo/transactions/:code/" }],
  [{ source: "/apps/:code/", dest: "/neo/transactions/:code/" }],
  [{ source: "/resolution/:slug/", dest: "/neo/incidents/:slug/" }],
  [{ source: "/troubleshooting/:slug/", dest: "/neo/incidents/:slug/" }],
  [{ source: "/impact/:code/", dest: "/neo/tables/:code/" }],
  [{ source: "/concepts/:slug/", dest: "/neo/knowledge/:slug/" }],
  [{ source: "/library/:book(book\\d+)/", dest: "/neo/read/:book/" }],
  [{ source: "/library/v2/:book(book\\d+)/", dest: "/neo/read/:book/" }],
  [{ source: "/library/pp/object/:code/", dest: "/neo/transactions/:code/" }, { source: "/library/pp/object/:code/", dest: "/neo/academy/pp-pi/" }],
  ...["object", "cds", "domain", "fiori-apps", "enhancements", "idoc", "bapi"].map((f) => [{ source: `/${f}/:id/`, dest: `/neo/${f}/:id/` }]),
  ...CENTER_FAMILIES.map((f) => [{ source: `/${f}/:slug/`, dest: `/neo/centers/${f}/:slug/` }]),
  ...["exits", "sap-notes", "learn", "process", "oic", "solutions", "pm", "pp-pi", "security", "qa-testing", "process-explorer", "workbench", "design", "ecc-s4", "guides"].map((f) => [hubPat(f)]),
];
// path-to-regexp subset used above: literal segments, :name, :name(regex).
export function compile(source) {
  const names = [];
  const re = source.replace(/:([A-Za-z]+)(\(((?:[^()\\]|\\.)+)\))?|[^:]+/g, (m, name, _g, rx) => {
    if (!name) return esc(m);
    names.push(name);
    return `(${rx || "[^/]+"})`;
  });
  return { re: new RegExp(`^${re}$`), names };
}
// The compiled pattern is cached beside the rule, never on it: the rule objects
// are what vercel.json is written from, and Vercel rejects a redirect with any
// property it does not know. A cached `_c` on 50 pattern rules failed the
// Preview deployment before it built (2026-10-01).
const COMPILED = new WeakMap();
export function apply(rules, p) {
  for (const r of rules) {
    let c = COMPILED.get(r);
    if (!c) { c = compile(r.source); COMPILED.set(r, c); }
    const m = p.match(c.re);
    if (!m) continue;
    let d = r.destination;
    c.names.forEach((n, i) => { d = d.replace(new RegExp(`:${n}\\b`, "g"), m[i + 1]); });
    return d;
  }
  return null;
}
const pats = GROUPS.map((cands) => {
  let best = null, bestN = -1;
  for (const c of cands) {
    const rule = [{ source: c.source, destination: c.dest }];
    const n = RESOLVED.filter((r) => apply(rule, r.from) === r.to).length;
    if (n > bestN) { best = c; bestN = n; }
  }
  return { source: best.source, destination: best.dest };
});
const explicit = [];
const coveredBy = {};
for (const r of RESOLVED) {
  const viaPattern = apply(pats, r.from);
  if (viaPattern === r.to) { coveredBy[r.from] = "pattern"; continue; }
  explicit.push({ source: r.from, destination: r.to });
}

/* ------------------------------------------------------------ vercel.json */
const vercel = JSON.parse(readFileSync(VERCEL, "utf8"));
const head = [
  { source: "/(.*)", has: [{ type: "host", value: "www.sapbysali.app" }], destination: "https://sapbysali.app/$1", permanent: true },
  { source: "/", destination: "/neo/", permanent: false },
];
const generated = [
  ...explicit.map((e) => ({ source: e.source, destination: e.destination, permanent: false })),
  ...pats.filter((pt) => RESOLVED.some((r) => coveredBy[r.from] && apply([pt], r.from))).map((pt) => ({ ...pt, permanent: false })),
];
const next = { ...vercel, redirects: [...head, ...generated] };

// every legacy page lands on an existing NEO page through the rules as written
const rules = next.redirects.slice(1).map((r) => ({ source: r.source, destination: r.destination }));
const misses = [];
for (const r of RESOLVED) { const d = apply(rules, r.from); if (d !== r.to || !has(d)) misses.push([r.from, d, r.to]); }

const byKind = {}, byFamily = {};
for (const r of RESOLVED) {
  byKind[r.kind] = (byKind[r.kind] || 0) + 1;
  const f = "/" + r.from.split("/")[1] + "/";
  (byFamily[f] ||= { pages: 0, exact: 0, equivalent: 0, hub: 0, hubTargets: {} }).pages++;
  byFamily[f][r.kind]++;
  if (r.kind === "hub") byFamily[f].hubTargets[r.to] = (byFamily[f].hubTargets[r.to] || 0) + 1;
}
const summary = { legacyPages: LEGACY.length, kept: "404 frames and /design/redesign-2026/ boards", byKind, rules: generated.length + head.length, explicit: explicit.length, patterns: generated.length - explicit.length, misses: misses.length, byFamily };

// The fields Vercel accepts on a redirect. Anything else fails the deployment at
// creation, before the build, so the check rejects it here.
const REDIRECT_KEYS = new Set(["source", "destination", "permanent", "statusCode", "has", "missing"]);
const badKeys = (list) => list.flatMap((r, i) => Object.keys(r).filter((k) => !REDIRECT_KEYS.has(k)).map((k) => `redirects[${i}].${k}`));

if (CHECK) {
  const current = vercel.redirects || [];
  const same = JSON.stringify(current) === JSON.stringify(next.redirects);
  const invalid = badKeys(current);
  console.log(JSON.stringify({ upToDate: same, invalidFields: invalid.slice(0, 10), misses: misses.slice(0, 10), ...summary }, null, 1));
  process.exit(same && !misses.length && !invalid.length ? 0 : 1);
}
if (badKeys(next.redirects).length) { console.error("invalid redirect fields:", badKeys(next.redirects).slice(0, 10)); process.exit(1); }
if (misses.length) { console.error("unresolved:", misses.slice(0, 10)); process.exit(1); }
writeFileSync(VERCEL, JSON.stringify(next, null, 2) + "\n");
if (process.env.REPORT) writeFileSync(process.env.REPORT, JSON.stringify({ summary, pages: RESOLVED }, null, 1));
console.log(JSON.stringify(summary, null, 1));
