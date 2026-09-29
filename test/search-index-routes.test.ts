// Every destination the command surface offers is a page the export generates
// (gate 6, blocker 1: all 105 chapter results were 404s, because their hrefs
// were built from data/library.ts ids while the reader is generated from the
// book registry). The generated routes are read from the very functions the
// route files' generateStaticParams call, and each route file is checked to
// still call that function, so the two lists cannot drift apart unnoticed.
import "./app-modules.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const { shellData, NEO_HUBS } = await import("../components/neo-shell/nav-data.ts");
const { commandIndex } = await import("../components/neo-shell/search/command-index.ts");
const { buildIndex } = await import("../components/neo-shell/search/build.ts");
const { txHref } = await import("../components/neo-shell/reference/ref-links.ts");
const { tableDetailNames } = await import("../components/neo-shell/data/tables-detail.ts");
const { objectNames } = await import("../components/neo-shell/object/object-names.ts");
const { txDetailCodes } = await import("../components/neo-shell/data/tx-detail.ts");
const { bapiDir, bapiIds } = await import("../components/neo-shell/reference/bapi-data.ts");
const { idocNames } = await import("../components/neo-shell/reference/idoc-data.ts");
const { cdsNames } = await import("../components/neo-shell/reference/cds-data.ts");
const { fioriSlugs } = await import("../components/neo-shell/reference/fiori-data.ts");
const { enhSlugs } = await import("../components/neo-shell/reference/enh-data.ts");
const { bookIds } = await import("../components/neo-shell/books/books-data.ts");
const { readerBookIds } = await import("../components/neo-shell/reader/reader-data.ts");
const { incidentSlugs } = await import("../components/neo-shell/learn/incidents-data.ts");
const { domainSlugs } = await import("../components/neo-shell/domain/domain-data.ts");
const { conceptSlugs } = await import("../components/neo-shell/learn/knowledge-data.ts");
const { bpSlugs } = await import("../components/neo-shell/best-practices/bp-data.ts");
const { CENTER_FAMILIES, allCenterParams } = await import("../components/neo-shell/centers/centers-data.ts");
const { getBook } = await import("../lib/library/registry.ts");
const { moduleTables } = await import("../lib/module-portal.ts");
const { PM_DATA } = await import("../data/sapData.pm.ts");
const { PPPI_DATA } = await import("../data/sapData.pppi.ts");

const APP = path.join(process.cwd(), "app", "neo");

/** [route file, the call its generateStaticParams makes, the param lists]. */
const DYNAMIC: [string, string, string, string[][]][] = [
  ["tables/[name]", "tableDetailNames()", "/neo/tables/", [tableDetailNames()]],
  ["object/[name]", "objectNames()", "/neo/object/", [objectNames()]],
  ["transactions/[code]", "txDetailCodes()", "/neo/transactions/", [txDetailCodes()]],
  ["bapi/[name]", "bapiIds()", "/neo/bapi/", [bapiIds()]],
  ["idoc/[name]", "idocNames()", "/neo/idoc/", [idocNames()]],
  ["cds/[view]", "cdsNames()", "/neo/cds/", [cdsNames()]],
  ["fiori-apps/[slug]", "fioriSlugs()", "/neo/fiori-apps/", [fioriSlugs()]],
  ["enhancements/[slug]", "enhSlugs()", "/neo/enhancements/", [enhSlugs()]],
  ["books/[bookId]", "bookIds()", "/neo/books/", [bookIds()]],
  ["read/[bookId]", "readerBookIds()", "/neo/read/", [readerBookIds()]],
  ["incidents/[slug]", "incidentSlugs()", "/neo/incidents/", [incidentSlugs()]],
  ["domain/[slug]", "domainSlugs()", "/neo/domain/", [domainSlugs()]],
  ["knowledge/[slug]", "conceptSlugs()", "/neo/knowledge/", [conceptSlugs()]],
  ["best-practices/[slug]", "bpSlugs()", "/neo/best-practices/", [bpSlugs()]],
  ["centers/[family]", "CENTER_FAMILIES", "/neo/centers/", [CENTER_FAMILIES.map((f: { id: string }) => f.id)]],
  ["[hub]", "NEO_HUBS", "/neo/", [NEO_HUBS]],
];

/** Every page the export generates for /neo, as a decoded path. */
function generatedRoutes(): Set<string> {
  const out = new Set<string>(["/neo/"]);
  for (const [, , prefix, lists] of DYNAMIC) for (const list of lists) for (const p of list) out.add(`${prefix}${p}/`);
  for (const p of allCenterParams() as { family: string; slug: string }[]) out.add(`/neo/centers/${p.family}/${p.slug}/`);
  // The static pages: a page.tsx in a directory with no dynamic segment.
  for (const dir of readdirSync(APP, { withFileTypes: true })) {
    if (dir.isDirectory() && !dir.name.includes("[") && existsSync(path.join(APP, dir.name, "page.tsx"))) out.add(`/neo/${dir.name}/`);
  }
  return out;
}

const routes = generatedRoutes();
const index = buildIndex(shellData(), commandIndex());
const pathOf = (href: string) => decodeURIComponent(href.split("#")[0].split("?")[0]);

test("the route files still generate from the lists this test reads", () => {
  for (const [dir, call] of DYNAMIC) {
    const src = readFileSync(path.join(APP, dir, "page.tsx"), "utf8");
    assert.ok(src.includes(call), `app/neo/${dir}/page.tsx no longer calls ${call}`);
  }
  assert.ok(readFileSync(path.join(APP, "centers/[family]/[slug]/page.tsx"), "utf8").includes("allCenterParams()"));
});

test("every href the command index produces is a generated page", () => {
  const missing = index.filter((r) => r.href && !routes.has(pathOf(r.href))).map((r) => `${r.k}:${r.title} → ${r.href}`);
  assert.deepEqual(missing, []);
  assert.ok(index.filter((r) => r.href).length > 3000);
});

test("a chapter result opens a chapter the reader has", () => {
  const chapters = index.filter((r) => r.k === "chapter");
  assert.ok(chapters.length >= 105);
  for (const r of chapters) {
    const m = /^\/neo\/read\/([^/]+)\/\?c=(\d+)$/.exec(r.href ?? "");
    assert.ok(m, `${r.title}: ${r.href}`);
    const book = getBook(decodeURIComponent(m[1]));
    assert.ok(book?.chapters.some((c: { n: number }) => c.n === Number(m[2])), `${r.href} names a chapter the book does not have`);
  }
});

test("a field result opens its own table page at a field that table documents", () => {
  const fieldsOf = new Map<string, Set<string>>();
  for (const m of [PM_DATA, PPPI_DATA]) for (const t of moduleTables(m)) {
    const s = fieldsOf.get(t.tableName) ?? new Set<string>();
    for (const f of t.fields) s.add((f.tech || "").trim());
    fieldsOf.set(t.tableName, s);
  }
  for (const r of index.filter((x) => x.k === "field")) {
    const m = /^\/neo\/tables\/([^/]+)\/#field-(.+)$/.exec(r.href ?? "");
    assert.ok(m, `${r.id}: ${r.href}`);
    assert.ok(fieldsOf.get(decodeURIComponent(m[1]))?.has(decodeURIComponent(m[2])), r.id);
  }
});

test("every transaction page is in the index, once, with the ref-links destination", () => {
  const rows = index.filter((r) => r.k === "tcode");
  const byCode = new Map(rows.map((r) => [r.title, r]));
  assert.equal(byCode.size, rows.length, "one row per code");
  for (const code of txDetailCodes()) {
    const r = byCode.get(code);
    assert.ok(r, `${code} has a page and no row`);
    assert.equal(r.href, txHref(code));
  }
  for (const r of rows) if (!r.href) assert.equal(txHref(r.title), null, `${r.title} has a page but no link`);
});

test("one row per function page, and the IDoc message types are IDoc", () => {
  const fn = index.filter((r) => r.k === "bapi" || r.k === "func");
  assert.deepEqual(fn.map((r) => r.title).sort(), [...bapiIds()].sort());
  // the title is the page's id; a page kept for a process concept is labelled
  // as the page labels it, and only an identifier is set as code
  const pageKind = new Map(bapiDir().rows.map((r: { id: string; kind: string }) => [r.id, r.kind]));
  for (const r of fn) {
    const k = pageKind.get(r.title);
    assert.equal(r.kindHe ?? null, k === "FM" || k === "BAPI" ? null : k, r.title);
    assert.equal(r.mono, /^[A-Za-z0-9_/]+$/.test(r.title), r.title);
  }
  const idoc = index.filter((r) => r.k === "idoc");
  assert.deepEqual(idoc.map((r) => r.title).sort(), [...idocNames()].sort());
  assert.ok(idoc.every((r) => r.href?.startsWith("/neo/idoc/") && r.st));
});

test("every object, enhancement, book, incident and work centre page is reachable", () => {
  const hrefs = new Set(index.map((r) => r.href && pathOf(r.href)));
  const tables = new Set(tableDetailNames());
  for (const n of objectNames()) assert.ok(hrefs.has(tables.has(n) ? `/neo/tables/${n}/` : `/neo/object/${n}/`), n);
  for (const s of enhSlugs()) assert.ok(hrefs.has(`/neo/enhancements/${s}/`), s);
  for (const id of bookIds()) assert.ok(hrefs.has(`/neo/books/${id}/`), id);
  for (const s of incidentSlugs()) assert.ok(hrefs.has(`/neo/incidents/${s}/`), s);
  for (const p of allCenterParams() as { family: string; slug: string }[]) assert.ok(hrefs.has(`/neo/centers/${p.family}/${p.slug}/`), p.slug);
});
