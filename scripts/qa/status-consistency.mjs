// Design audit S5-2 / S5-3 / ACC-3: ONE S/4HANA status per record, everywhere.
// For a sample of records this reads the canonical status pill (data-status,
// the key from lib/evidence) on the catalog row, on the detail page's evidence
// block, in the ERD inspector (tables) and on the command-palette result, and
// fails when any two of them differ. It also checks that every canonical pill
// carries a glyph (shape beside colour and word).
//   NEO_BASE=http://localhost:4195 node scripts/qa/status-consistency.mjs
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const SAMPLE = [
  { kind: "table", id: "AFKO", list: "/neo/tables/", detail: "/neo/tables/AFKO/", erd: true },
  { kind: "table", id: "EQUI", list: "/neo/tables/", detail: "/neo/tables/EQUI/", erd: true },
  { kind: "table", id: "MARA", list: "/neo/tables/", detail: "/neo/tables/MARA/", erd: true },
  { kind: "tcode", id: "IP30", list: "/neo/transactions/", detail: "/neo/transactions/IP30/" },
  { kind: "tcode", id: "IW31", list: "/neo/transactions/", detail: "/neo/transactions/IW31/" },
  { kind: "tcode", id: "COR3", list: "/neo/transactions/", detail: "/neo/transactions/COR3/" },
  { kind: "fm", id: "BAPI_ALM_CONF_CREATE", list: "/neo/bapi/", detail: "/neo/bapi/BAPI_ALM_CONF_CREATE/" },
  { kind: "fm", id: "BAPI_PROCORD_GET_DETAIL", list: "/neo/bapi/", detail: "/neo/bapi/BAPI_PROCORD_GET_DETAIL/" },
  { kind: "cds", id: null, list: "/neo/cds/" },
  { kind: "fiori", id: null, list: "/neo/fiori-apps/" },
  { kind: "idoc", id: null, list: "/neo/idoc/" },
  { kind: "enh", id: null, list: "/neo/enhancements/" },
];
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const ctx = await browser.newContext({ viewport: { width: 1363, height: 936 }, locale: "he-IL" });
const page = await ctx.newPage();
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); }); page.on("pageerror", (e) => errs.push(e.message));

const pill = (root) => {
  const el = root?.querySelector(".nu-status[data-status]");
  return el ? { key: el.getAttribute("data-status"), text: el.textContent.trim(), glyph: !!el.querySelector("svg") } : null;
};

async function fromList(s) {
  await page.goto(base + s.list, { waitUntil: "networkidle" });
  if (s.id) {
    const box = page.locator('input[type="search"], input[role="searchbox"], input[type="text"]').first();
    if (await box.count()) { await box.fill(s.id); await page.waitForTimeout(500); }
  }
  return page.evaluate(({ id }) => {
    const rows = [...document.querySelectorAll("a.nu-card, .nu-card")];
    const row = id
      ? rows.find((r) => [...r.querySelectorAll("b.nx-sap, .nx-sap")].some((b) => b.textContent.trim() === id))
      : rows.find((r) => r.querySelector(".nu-status[data-status]"));
    if (!row) return null;
    const el = row.querySelector(".nu-status[data-status]");
    const name = row.querySelector("b.nx-sap")?.textContent.trim() || id;
    const href = row.getAttribute("href") || row.querySelector("a")?.getAttribute("href") || null;
    return { name, href, pill: el ? { key: el.getAttribute("data-status"), text: el.textContent.trim(), glyph: !!el.querySelector("svg") } : null };
  }, { id: s.id });
}
async function fromDetail(href) {
  await page.goto(base + href, { waitUntil: "networkidle" });
  return page.evaluate(() => {
    const el = document.querySelector(".nev .nu-status[data-status]");
    return el ? { key: el.getAttribute("data-status"), text: el.textContent.trim(), glyph: !!el.querySelector("svg") } : null;
  });
}
async function fromErd(name) {
  await page.goto(base + "/neo/erd/#" + name, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  return page.evaluate(() => {
    const el = document.querySelector(".ne-s4-canon .nu-status[data-status]");
    return el ? { key: el.getAttribute("data-status"), text: el.textContent.trim(), glyph: !!el.querySelector("svg") } : null;
  });
}
async function fromPalette(name) {
  await page.goto(base + "/neo/", { waitUntil: "networkidle" });
  await page.keyboard.press("Control+k");
  const input = page.locator('input[aria-label="חיפוש בניווט ובתיעוד הטכני"]:visible').first();
  await input.waitFor({ timeout: 4000 }).catch(() => {});
  if (!(await input.count())) return { absent: "palette did not open" };
  await input.fill(name);
  await page.waitForTimeout(600);
  return page.evaluate((n) => {
    const rows = [...document.querySelectorAll(".nxc-row")];
    const row = rows.find((r) => r.querySelector(".nxc-row-t .nx-sap, .nxc-row-t span")?.textContent.trim() === n);
    if (!row) return { absent: "no result row for " + n };
    const el = row.querySelector(".nu-status[data-status]");
    return el ? { key: el.getAttribute("data-status"), text: el.textContent.trim(), glyph: !!el.querySelector("svg") } : { absent: "row without pill" };
  }, name);
}

const out = []; let fails = 0;
for (const s of SAMPLE) {
  const list = await fromList(s);
  const name = list?.name || s.id;
  const detailHref = s.detail || list?.href;
  const detail = detailHref ? await fromDetail(detailHref) : null;
  const erd = s.erd ? await fromErd(name) : undefined;
  const pal = ["table", "tcode", "fm", "cds", "fiori"].includes(s.kind) ? await fromPalette(name) : undefined;
  const keys = [list?.pill?.key, detail?.key, erd?.key, pal?.key].filter(Boolean);
  const same = new Set(keys).size <= 1 && keys.length >= 2;
  const glyphs = [list?.pill, detail, erd, pal].filter((p) => p && p.key).every((p) => p.glyph);
  const ok = same && glyphs;
  if (!ok) fails++;
  out.push({ kind: s.kind, name, list: list?.pill, detail, erd, palette: pal, same, glyphs, ok });
  console.log(`${ok ? "OK  " : "FAIL"} ${s.kind} ${name}: list=${list?.pill?.key ?? "-"} detail=${detail?.key ?? "-"} erd=${erd?.key ?? (s.erd ? "-" : "n/a")} palette=${pal?.key ?? pal?.absent ?? "n/a"} glyph=${glyphs}`);
}
await browser.close();
console.log(JSON.stringify({ base, checkedAt: new Date().toISOString(), consoleErrors: errs.length, fails, results: out }, null, 2));
process.exit(fails ? 1 : 0);
