// Clipped text, and the way to the rest of it (P0, 2026-10-01).
//
// A summary clipped by a line clamp or an ellipsis is acceptable only when the
// full text is one deliberate step away without a pointer: a link the keyboard
// and a tap can follow to a page that prints it, a disclosure that opens it,
// or the same page printing it unclipped. A `title` alone is a hover, and a
// hover is not a path on a phone or for the keyboard.
//
// Per route the check runs twice, as shipped and with the WCAG 1.4.12 spacing
// forced (line height 1.5, letter spacing .12em, word spacing .16em), because
// the spacing is what clips most summaries. For every element whose visible
// text no longer fits its clipping box it records the path:
//   link      inside a[href], or in the same row as one (a table row, a list
//             item); the target page is fetched and must contain every text
//             segment of the element (tags stripped, whitespace folded)
//   control   inside a button: the button is pressed, and the full text must
//             then be printed unclipped (on the page or the page it opened)
//   in-page   the same page prints the full text in an element that is not
//             clipped (a breadcrumb's current step is the page's own title)
//   expand    inside a <summary>, or an [aria-expanded] control
//   title     only a title attribute: FAIL
//   none      no path at all: FAIL
// and whether the accessibility tree still carries the full text (the clamp
// is visual; a screen reader is given the whole string unless it is hidden).
// Excluded, as in text-spacing.mjs: aria-hidden or inert subtrees, boxes of
// 2px or less (screen-reader-only text) and the studio's pan/zoom canvas.
//   NEO_BASE=http://localhost:4300 OUT=<json> [PROFILE=desk|phone] [ROUTES_FROM=<json [[name, route]] or [route]>] node scripts/qa/clip-reach.mjs
import { chromium } from "playwright-core";
import fs from "node:fs";

const BASE = process.env.NEO_BASE || "http://localhost:4300";
const OUT = process.env.OUT || "clip-reach.json";
const PROFILE = process.env.PROFILE || "desk";
const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const CTX = PROFILE === "phone"
  ? { viewport: { width: 390, height: 844 }, userAgent: IPHONE, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
  : { viewport: { width: 1363, height: 936 } };
let ROUTES = ["/neo/bapi/", "/neo/tables/"];
if (process.env.ROUTES_FROM) {
  const j = JSON.parse(fs.readFileSync(process.env.ROUTES_FROM, "utf8"));
  ROUTES = j.map((r) => (Array.isArray(r) ? r[1] : r));
}
const SPACING = "*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} p{margin-block-end:2em!important}";
const fold = (s) => String(s).replace(/\s+/g, "").replace(/[‎‏⁦-⁩]/g, "");

// The page text of a target, from the exported HTML (the static export puts
// the page in its S:0 segment, which is plain markup).
const targetText = new Map();
async function textOf(href) {
  const u = new URL(href, BASE);
  if (u.origin !== new URL(BASE).origin) return null;
  const key = u.pathname;
  if (targetText.has(key)) return targetText.get(key);
  let t = null;
  try {
    const r = await fetch(BASE + key);
    if (r.ok) {
      const html = await r.text();
      t = fold(html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, "")
        .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " "));
    }
  } catch { t = null; }
  targetText.set(key, t);
  return t;
}

const collect = () => {
  const out = [];
  let i = 0;
  const clippedBox = (el) => {
    const cs = getComputedStyle(el);
    const clipX = /hidden|clip/.test(cs.overflowX), clipY = /hidden|clip/.test(cs.overflowY);
    const clamp = cs.webkitLineClamp && cs.webkitLineClamp !== "none";
    if (!clipX && !clipY && !clamp) return null;
    const dx = el.scrollWidth - el.clientWidth, dy = el.scrollHeight - el.clientHeight;
    if (!((clipX && dx > 1) || ((clipY || clamp) && dy > 1))) return null;
    return { dx, dy, ellipsis: cs.textOverflow === "ellipsis", clamp: !!clamp };
  };
  const all = [...document.querySelectorAll("body *")];
  // pass 1: every clipped box, marked
  const hits = [];
  for (const el of all) {
    if (el.closest("[aria-hidden='true'], [hidden], [inert], .nst-canvas")) continue;
    if (el.clientWidth <= 2 || el.clientHeight <= 2) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    // the frame itself (.nx-app clips by design; its only overflow is 1px
    // screen-reader text) is not a summary
    if (el.matches(".nx-app, .nx-main, .nx-canvas")) continue;
    const text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (!text) continue;
    // a page or section container that clips a bleed is not a clipped summary:
    // most of its text belongs to block children
    const own = [...el.childNodes].filter((n) => n.nodeType === 3 || (n.nodeType === 1 && getComputedStyle(n).display.startsWith("inline"))).map((n) => n.textContent || "").join("").replace(/\s+/g, "");
    if (own.length < text.replace(/\s+/g, "").length * 0.5) continue;
    const c = clippedBox(el);
    if (!c) continue;
    const id = `cr-${i++}`; el.setAttribute("data-cr", id);
    hits.push({ el, id, text, c });
  }
  // pass 2: the path to the rest of each one
  const pool = [];
  for (const o of all) {
    const t = (o.textContent || "").replace(/\s+/g, "");
    if (t.length >= 4 && t.length <= 4000) pool.push([o, t]);
  }
  for (const { el, id, text, c } of hits) {
    // the row's own link when the clipped cell is not inside it
    const row = el.closest("tr, li, [role=row], .nxd-item, .nw-row");
    const a = el.closest("a[href]") || (row ? row.querySelector("a[href]") : null);
    // the text as its segments (a composed label: "תפקיד: " + roles)
    const segs = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    // …and each text node as its sentences: a summary that joins the S/4HANA
    // note and the QA line is printed on its record as two blocks
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      for (const sentence of (n.textContent || "").split(/(?<=[.!?;])\s+|\s+·\s+/)) {
        const t = sentence.replace(/\s+/g, "");
        if (t.length >= 6) segs.push(t);
      }
    }
    const sum = el.closest("summary");
    const exp = el.closest("[aria-expanded]");
    const btn = el.closest("button");
    // a row's own disclosure ("open the details") when the cell is not inside it
    const rowExp = !btn && row ? row.querySelector("button[aria-expanded]") : null;
    if (rowExp) rowExp.setAttribute("data-cr-x", `${rowExp.getAttribute("data-cr-x") || ""} ${id}`.trim());
    // in-page: the same text printed in full somewhere that is not clipped
    const folded = text.replace(/\s+/g, "");
    let inPage = false;
    const unclippedHas = (want) => pool.some(([o, ot]) => ot.length >= want.length && ot.length <= want.length * 4 + 40 && ot.includes(want)
      && !(o === el || el.contains(o) || o.contains(el)) && !o.closest("[aria-hidden='true'], [hidden], [data-cr]")
      && o.getBoundingClientRect().width >= 4 && !clippedBox(o));
    if (folded.length >= 4) {
      for (const [o, ot] of pool) {
        if (ot.length < folded.length || ot.length > folded.length * 4 + 40 || !ot.includes(folded)) continue;
        if (o === el || el.contains(o) || o.contains(el)) continue;
        if (o.closest("[aria-hidden='true'], [hidden], [data-cr]")) continue;
        const or = o.getBoundingClientRect();
        if (or.width < 4 || or.height < 4) continue;
        if (clippedBox(o)) continue;
        inPage = true; break;
      }
      // a composed label ("PM · תחזוקת מפעל") whose parts the page prints apart
      if (!inPage && segs.length > 1 && segs.every(unclippedHas)) inPage = true;
    }
    out.push({ id, cls: `${el.tagName.toLowerCase()}.${String(el.className || "").split(" ")[0]}`, text, ...c,
      href: a ? a.getAttribute("href") : null, segs, summary: !!sum, expanded: !!exp, button: !!btn || !!rowExp, rowExp: !!rowExp, inPage, title: !!(el.getAttribute("title") || el.closest("[title]")) });
  }
  return out;
};

const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const ctx = await browser.newContext({ ...CTX, locale: "he-IL", serviceWorkers: "block", reducedMotion: "reduce" });
const page = await ctx.newPage();
const rows = [];
for (const route of ROUTES) {
  for (const mode of ["shipped", "spacing"]) {
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 90000 });
      await page.waitForTimeout(500);
      if (mode === "spacing") { await page.addStyleTag({ content: SPACING }); await page.waitForTimeout(400); }
      const found = await page.evaluate(collect);
      for (const f of found) {
        let path = "none";
        if (f.href) {
          const t = await textOf(f.href);
          const segs = f.segs.length ? f.segs : [fold(f.text)];
          path = t && (t.includes(fold(f.text)) || segs.every((g) => t.includes(g))) ? "link" : (t ? "link-missing" : "link-unreadable");
        }
        if (path !== "link" && f.inPage) path = "in-page";
        if (path !== "link" && path !== "in-page" && (f.summary || f.expanded)) path = "expand";
        if (path !== "link" && path !== "in-page" && path !== "expand" && f.button) {
          // press the button and look for the text, unclipped, where it lands
          try {
            // a fresh context per press: the reader resumes at the chapter the
            // previous press opened, and the page would no longer match
            // the main page's storage (its recent items, the reader's position),
            // copied so the press page is the same page; separate, so one press
            // cannot move the next one's page
            const pctx = await browser.newContext({ ...CTX, locale: "he-IL", serviceWorkers: "block", reducedMotion: "reduce", storageState: await ctx.storageState() });
            const pg = await pctx.newPage();
            await pg.goto(BASE + route, { waitUntil: "networkidle", timeout: 90000 });
            await pg.waitForTimeout(400);
            if (mode === "spacing") { await pg.addStyleTag({ content: SPACING }); await pg.waitForTimeout(300); }
            await pg.evaluate(collect);
            const btn = f.rowExp ? pg.locator(`[data-cr-x~="${f.id}"]`) : pg.locator(`[data-cr="${f.id}"]`).locator("xpath=ancestor-or-self::button[1]");
            await btn.click({ timeout: 4000 });
            await pg.waitForTimeout(1200);
            const seen = await pg.evaluate((want) => {
              const f2 = (s) => String(s).replace(/\s+/g, "");
              for (const e of document.querySelectorAll("h1, h2, h3, p, span, a, b, li, dd, td, div")) {
                if (e.closest("[aria-hidden='true'], [hidden]")) continue;
                const t = f2(e.textContent || "");
                if (t.length < want.length || t.length > want.length * 3 + 40 || !t.includes(want)) continue;
                const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4) continue;
                const cs = getComputedStyle(e);
                const clipped = (/hidden|clip/.test(cs.overflowX) && e.scrollWidth > e.clientWidth + 1) || ((/hidden|clip/.test(cs.overflowY) || (cs.webkitLineClamp && cs.webkitLineClamp !== "none")) && e.scrollHeight > e.clientHeight + 1);
                if (!clipped) return true;
              }
              return false;
            }, fold(f.text).replace(/^פרק\d+·?/, ""));
            await pctx.close();
            if (seen) path = "control";
          } catch { /* the press failed: the path stays unproven */ }
        }
        if (path === "none" && f.title) path = "title";
        // the accessibility tree: the element's accessible text still carries
        // the whole string (a clamp hides pixels, not text)
        let ax = null;
        try {
          const snap = await page.locator(`[data-cr="${f.id}"]`).ariaSnapshot({ timeout: 3000 });
          // the snapshot is YAML-ish ("- text: …" per text run; a <wbr> splits a
          // run): strip the markers before comparing
          const flat = fold(snap.replace(/^\s*-\s*(text:\s*)?/gm, "").replace(/^\s*\/[a-z]+:.*$/gm, "").replace(/\\/g, "").replace(/["']/g, ""));
          ax = flat.includes(fold(f.text).replace(/["']/g, "").slice(0, Math.min(60, fold(f.text).length)));
        } catch { ax = null; }
        rows.push({ route, mode, path, ax, cls: f.cls, text: f.text.slice(0, 80), href: f.href, dx: f.dx, dy: f.dy, ellipsis: f.ellipsis, clamp: f.clamp, title: f.title });
      }
      const fails = rows.filter((r) => r.route === route && r.mode === mode && !["link", "in-page", "expand", "control"].includes(r.path)).length;
      console.log(`${PROFILE} ${mode.padEnd(7)} ${route.padEnd(52)} clipped ${found.length} · no path ${fails}`);
    } catch (e) {
      rows.push({ route, mode, fatal: String(e).slice(0, 160) });
      console.log(`${route} ${mode} FATAL ${String(e).slice(0, 120)}`);
    }
  }
}
await browser.close();
const byPath = {};
for (const r of rows) if (r.path) byPath[r.path] = (byPath[r.path] || 0) + 1;
const failing = rows.filter((r) => r.path && !["link", "in-page", "expand", "control"].includes(r.path));
const axMissing = rows.filter((r) => r.ax === false);
const byCls = {};
for (const r of failing) byCls[r.cls] = (byCls[r.cls] || 0) + 1;
fs.writeFileSync(OUT, JSON.stringify({ base: BASE, profile: PROFILE, at: new Date().toISOString(), summary: { clipped: rows.filter((r) => r.path).length, byPath, failing: failing.length, failingByClass: byCls, axMissing: axMissing.length, fatal: rows.filter((r) => r.fatal).length }, rows }, null, 1));
console.log(JSON.stringify({ byPath, failing: failing.length, failingByClass: byCls, axMissing: axMissing.length }));
process.exit(failing.length || rows.some((r) => r.fatal) ? 1 : 0);
