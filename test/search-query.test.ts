// The command surface's matching (components/neo-shell/search/build.ts and
// hebrew.ts), run on the real index: Hebrew forms, mixed queries, the typo
// suggestion, the listing pages and the de-duplicated navigation (gate 6,
// majors 9 to 12, minors 21, 23 and 24; gate 5, blocker 1).
import "./app-modules.mjs";
import test from "node:test";
import assert from "node:assert/strict";

const { shellData } = await import("../components/neo-shell/nav-data.ts");
const { commandIndex, commandTransactions } = await import("../components/neo-shell/search/command-index.ts");
const { BROWSE_CAP, buildIndex, runQuery, suggest } = await import("../components/neo-shell/search/build.ts");
const { foldText, queryReadings } = await import("../components/neo-shell/search/hebrew.ts");

const index = buildIndex(shellData(), commandIndex(), commandTransactions());
const first = (q: string) => runQuery(index, q, null).items[0]?.rec;
const titles = (q: string) => runQuery(index, q, null).items.flatMap((i: { rec?: { title: string } }) => (i.rec ? [i.rec.title] : []));

test("Hebrew forms fold together", () => {
  assert.equal(foldText("הזמנות תחזוקה"), " הזמנ אחזק ");
  assert.equal(foldText("פקודת אחזקה"), " הזמנ אחזק ");
  assert.equal(foldText("טבלאות"), foldText("טבלה"));
  assert.equal(foldText("IW31 הזמנה"), " iw31 הזמנ ");
  // a one-letter prefix is a second reading of the word, never the only one
  assert.deepEqual(queryReadings("להזמנת"), [["להזמנ", "הזמנ", "זמנ"]]);
  assert.deepEqual(queryReadings("הזמנה"), [["הזמנ", "זמנ"]]);
});

test("a code with a page is found: the transactions home says it has 1,818", () => {
  for (const code of ["ME21N", "MB01", "ME23N", "VA01", "SE16N", "IP30H"]) {
    const r = first(code);
    assert.equal(r?.title, code);
    assert.equal(r?.href, `/neo/transactions/${code}/`);
    assert.ok(r?.sub, `${code} carries the registry's Hebrew line`);
  }
});

test("Hebrew order words reach the maintenance order", () => {
  assert.ok(titles("הזמנת תחזוקה").includes("IW31"));
  assert.ok(titles("פקודת תחזוקה").includes("IW31"));
  assert.equal(first("IW31 הזמנה")?.title, "IW31");
  assert.equal(first("הזמנת תחזוקה IW31")?.title, "IW31");
});

test("a function object is one clean row with its page's status; an IDoc is IDoc", () => {
  const r = runQuery(index, "BAPI_MATERIAL_SAVEDATA", null);
  assert.equal(r.total, 1);
  assert.equal(r.items[0].rec?.k, "bapi");
  const m = first("MATMAS");
  assert.equal(m?.k, "idoc");
  assert.equal(m?.href, "/neo/idoc/MATMAS/");
  assert.ok(m?.st);
});

test("a typo gets the closest code, and only when nothing matched", () => {
  assert.equal(runQuery(index, "IW3I", null).total, 0);
  assert.equal(suggest(index, "IW3I")?.title, "IW31");
  assert.equal(suggest(index, "AFK0")?.title, "AFKO");
  assert.equal(suggest(index, "BAPI_ALM_ORDR_MAINTAIN")?.title, "BAPI_ALM_ORDER_MAINTAIN");
  assert.equal(suggest(index, "zzzzzz"), null);
});

test("a module is listed once, as a module", () => {
  const modules = new Set(index.filter((r) => r.k === "module").map((r) => r.href));
  assert.equal(modules.size, 2);
  assert.ok(index.filter((r) => r.k === "nav").every((r) => !modules.has(r.href)));
});

test("a listed family pages on: a 'more' stop ends the page, the next limit shows more", () => {
  const one = runQuery(index, "", "tcode");
  assert.equal(one.browse, true);
  assert.equal(one.sections[0].rows.length, BROWSE_CAP);
  const last = one.items[one.items.length - 1];
  assert.equal(last.more, "tcode");
  assert.equal(last.next, true);
  const two = runQuery(index, "", "tcode", null, BROWSE_CAP * 2);
  assert.equal(two.sections[0].rows.length, BROWSE_CAP * 2);
  // an unfiltered query ends a long section with the "all of this family" stop
  const q = runQuery(index, "AF", null);
  const cut = q.sections.find((s: { more?: string }) => s.more);
  assert.equal(cut?.more, "all");
});
