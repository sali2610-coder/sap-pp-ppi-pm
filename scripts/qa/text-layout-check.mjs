// Text layout check · paragraphs that collapse, run too long, overflow or overlap.
//
// Written after the module pages' chapter heads collapsed their lead sentence to
// 140px at 1440 (two to four words a line, half the chapter empty beside it). A
// grid that auto-places text can do that silently; contrast, axe and the
// overflow sweeps all passed it. This check looks at the text itself.
//
// Per route and viewport, every visible block that carries 40+ characters of its
// own text (p, li, dd, dt, blockquote, figcaption, td, and leaf divs/spans) is
// measured: width, rendered lines (getClientRects of its text), characters per
// line, words per line. Flags:
//   stack     3+ lines, under 4 words and under 30 characters a line on
//             average: a paragraph broken into one to three words per line.
//   narrow    desktop (viewport 1024+): 3+ lines in a box under 32rem with under
//             45 characters a line. Body text in a narrow column; short labels
//             (under 3 lines) are not judged.
//   long      over 95 characters a line on 2+ lines (the reading target is
//             45 to 75).
//   overflow  a block whose text is wider than its box and spills (overflow
//             visible), or a document wider than the viewport.
//   overlap   two text blocks, neither inside the other, whose boxes cross by
//             more than 4px each way.
//   empty     desktop: a section of the main column (a direct child of a
//             <section>, or the section itself) whose content spans under 50%
//             of the section's width while the section carries 2+ lines of text.
// Two kinds of text are not judged as paragraphs, and are reported apart:
//   label     the text of a control or a title (inside a button, tab, menu
//             item, option or heading, or set at weight 600 and up): a short
//             intentional label, which the 32rem rule exempts. Wrapping to 3+
//             lines is a P1, never a P0.
//   tokens    phone: a block at 80%+ of the main column's width whose lines are
//             short only because its words are long (SAP identifiers, slash
//             compounds). The box cannot be wider; it is a P1 for the content.
// Inline elements are measured as part of their block: a span inside a
// paragraph shares the paragraph's lines, so measuring it alone counted its
// partial first and last lines as whole ones.
// Each finding carries a severity (P0, P1). One browser, one context, one page
// at a time. Exits 1 when any P0 is found (or an empty section, or a document
// wider than the viewport).
//   NEO_BASE=http://localhost:4300 OUT=<json> [ROUTES=/a/,/b/ | ROUTES_FROM=<json>]
//   [WIDTHS=1280,1440,1728,834,390] [THEMES=light,dark] [SHOTS=<dir>] node text-layout-check.mjs
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.NEO_BASE || "http://localhost:4300";
const OUT = process.env.OUT || "text-layout-check.json";
const WIDTHS = (process.env.WIDTHS || "1280,1440,1728,834,390").split(",").map(Number);
const THEMES = (process.env.THEMES || "light,dark").split(",");
const SHOTS = process.env.SHOTS || "";
let ROUTES = (process.env.ROUTES || "").split(",").filter(Boolean);
if (!ROUTES.length && process.env.ROUTES_FROM) {
  const j = JSON.parse(fs.readFileSync(process.env.ROUTES_FROM, "utf8"));
  ROUTES = (Array.isArray(j) ? j.map((r) => (Array.isArray(r) ? r[1] : r.url || r)) : j.results.map((r) => r.url));
}
if (!ROUTES.length) ROUTES = ["/neo/pm/", "/neo/pp-pi/"];
const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const IPAD = "Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const ctxFor = (w) => w <= 480
  ? { viewport: { width: w, height: 844 }, userAgent: IPHONE, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
  : w < 1024 ? { viewport: { width: w, height: 1112 }, userAgent: IPAD, isMobile: true, hasTouch: true }
  : { viewport: { width: w, height: 900 } };

const measure = () => {
  const desk = innerWidth >= 1024, rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const main = document.querySelector("main") || document.body;
  const vis = (el) => { const cs = getComputedStyle(el); return cs.display !== "none" && cs.visibility !== "hidden" && +cs.opacity > 0.05; };
  const hidden = (el) => !!el.closest('[aria-hidden="true"], .nx-sr, .sr-only, details:not([open]) > :not(summary), [hidden]');
  // The element's own inline flow: its text nodes and the children that are
  // laid out inline. A span set to block, flex or grid is a separate line of a
  // structured item (a card's number, title, count), not part of a paragraph.
  const inlineKids = (el) => [...el.childNodes].filter((n) => n.nodeType === 3 || (n.nodeType === 1 && getComputedStyle(n).display === "inline"));
  const own = (el) => inlineKids(el).map((n) => n.textContent).join("").replace(/\s+/g, " ").trim();
  const lineCount = (el) => {
    const tops = new Set();
    for (const n of inlineKids(el)) {
      let rects;
      if (n.nodeType === 3) { const rg = document.createRange(); rg.selectNodeContents(n); rects = rg.getClientRects(); }
      else rects = n.getClientRects();
      for (const r of rects) if (r.width > 1 && r.height > 1) tops.add(Math.round(r.top / 4));
    }
    return Math.max(1, tops.size);
  };
  const mainCS = getComputedStyle(main);
  const mainW = main.getBoundingClientRect().width - parseFloat(mainCS.paddingLeft) - parseFloat(mainCS.paddingRight);
  const cand = [...main.querySelectorAll("p, li, dd, dt, blockquote, figcaption, td, div, span")].filter((el) => {
    if (!vis(el) || hidden(el)) return false;
    if (getComputedStyle(el).display === "inline") return false;
    const t = own(el); if (t.length < 40) return false;
    // a leaf-ish text block: no block descendants carrying their own long text
    return ![...el.children].some((c) => /^(P|LI|DIV|UL|OL|TABLE|SECTION)$/.test(c.tagName) && own(c).length >= 40);
  });
  const blocks = [];
  for (const el of cand) {
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
    const t = own(el), lines = lineCount(el), words = t.split(" ").length;
    const cs = getComputedStyle(el);
    const b = { el, cls: `${el.tagName.toLowerCase()}.${String(el.className || "").split(" ")[0]}`, text: t.slice(0, 48), w: Math.round(r.width), wRem: +(r.width / rem).toFixed(1), lines, cpl: Math.round(t.length / lines), wpl: +(words / lines).toFixed(1), r };
    b.flags = [];
    b.label = !!el.closest('button, [role="tab"], [role="menuitem"], [role="option"], h1, h2, h3, h4, h5, h6') || +cs.fontWeight >= 600;
    b.full = !desk && innerWidth <= 480 && r.width >= 0.8 * mainW;
    // a line-clamped box shows fewer lines than its text needs (scripts that
    // audit truncation read this)
    if (el.scrollHeight > el.clientHeight + 2 && /hidden|clip/.test(cs.overflowY || cs.overflow)) b.clamped = true;
    // Authored line breaks (white-space pre-line or pre-wrap, a list of term
    // mappings one per line) are not a collapse: only lines beyond the authored
    // segments are judged.
    const pre = /^(pre|pre-line|pre-wrap|break-spaces)$/.test(cs.whiteSpace);
    const authored = pre ? (el.textContent || "").split("\n").filter((x) => x.trim()).length : 1;
    const wrapped = lines > authored;
    // A stack is few words AND few characters a line: a 112-character line of
    // long identifiers, or Hebrew compounds joined by a hyphen, is not one.
    if (wrapped && lines >= 3 && b.wpl < 4 && b.cpl < 30) b.flags.push("stack");
    if (wrapped && desk && lines >= 3 && r.width < 32 * rem && b.cpl < 45) b.flags.push("narrow");
    if (lines >= 2 && b.cpl > 95) b.flags.push("long");
    if (el.scrollWidth > el.clientWidth + 2 && cs.overflowX === "visible" && cs.whiteSpace !== "nowrap") b.flags.push("overflow");
    b.block = cs.display !== "inline";
    blocks.push(b);
  }
  // overlap between text BOXES: two inline runs of one paragraph share line
  // boxes by nature, so only block-level boxes are compared.
  const boxes = blocks.filter((b) => b.block);
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i], c = boxes[j];
    if (a.el.contains(c.el) || c.el.contains(a.el)) continue;
    const x = Math.min(a.r.right, c.r.right) - Math.max(a.r.left, c.r.left), y = Math.min(a.r.bottom, c.r.bottom) - Math.max(a.r.top, c.r.top);
    if (x > 4 && y > 4) { a.flags.push("overlap"); c.flags.push("overlap"); }
  }
  // half-empty sections (desktop)
  const empties = [];
  if (desk) for (const sec of main.querySelectorAll("section")) {
    if (!vis(sec) || hidden(sec)) continue;
    const sr = sec.getBoundingClientRect(); if (sr.width < 600 || sr.height < 40) continue;
    const kids = [...sec.children].filter((k) => vis(k) && k.getBoundingClientRect().width > 0);
    if (!kids.length) continue;
    // the union of the text runs' horizontal extent inside the section
    let lo = Infinity, hi = -Infinity, textLines = 0;
    const range = document.createRange(); range.selectNodeContents(sec);
    for (const rr of range.getClientRects()) { if (rr.width < 2 || rr.top > sr.bottom || rr.bottom < sr.top) continue; lo = Math.min(lo, rr.left); hi = Math.max(hi, rr.right); }
    for (const b of blocks) if (sec.contains(b.el)) textLines += b.lines;
    if (textLines >= 2 && hi > lo && (hi - lo) / sr.width < 0.5) empties.push({ id: sec.id || sec.className.split(" ")[0], used: +((hi - lo) / sr.width).toFixed(2), w: Math.round(sr.width) });
  }
  const docOverflow = document.documentElement.scrollWidth - innerWidth;
  // P0: a paragraph broken to one to three words a line, a column under 30
  // characters a line, overflow, overlap. P1: 30 to 44 characters a line in a
  // narrow desktop column, or lines over 95 characters.
  for (const b of blocks) {
    if (!b.flags.length) continue;
    // a label or a full-width phone block keeps its finding, as a P1 of its own kind
    if ((b.label || b.full) && (b.flags.includes("stack") || b.flags.includes("narrow"))) {
      b.flags = b.flags.filter((f) => f !== "stack" && f !== "narrow").concat(b.label ? "label" : "tokens");
    }
    b.sev = (b.flags.includes("stack") || b.flags.includes("overflow") || b.flags.includes("overlap") || (b.flags.includes("narrow") && b.cpl < 30)) ? "P0" : "P1";
  }
  const flagged = blocks.filter((b) => b.flags.length).map(({ el, r, block, ...rest }) => rest);
  return { blocks: blocks.length, docOverflow, flagged, empties };
};

const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const results = [];
let bad = 0;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
for (const theme of THEMES) for (const w of WIDTHS) {
  const ctx = await browser.newContext({ ...ctxFor(w), locale: "he-IL", serviceWorkers: "block", reducedMotion: "reduce" });
  await ctx.addInitScript((d) => { try { localStorage.setItem("neo:theme", d); } catch {} }, theme);
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 90000 });
      await page.waitForTimeout(500);
      // open every collapsed chapter so its text is judged too
      await page.evaluate(() => document.querySelectorAll("details:not([open])").forEach((d) => { d.open = true; }));
      await page.waitForTimeout(250);
      const m = await page.evaluate(measure);
      const p0 = m.flagged.filter((f) => f.sev === "P0").length;
      const n = p0 + m.empties.length + (m.docOverflow > 1 ? 1 : 0);
      bad += n;
      results.push({ route, w, theme, ...m });
      console.log(`${theme} ${w} ${route}: blocks ${m.blocks} · P0 ${p0} · P1 ${m.flagged.length - p0} · empty ${m.empties.length} · doc+${m.docOverflow}` + (m.flagged[0] ? ` | ${m.flagged[0].flags.join("+")} ${m.flagged[0].cls} ${m.flagged[0].w}px ${m.flagged[0].lines}L ${m.flagged[0].wpl}wpl "${m.flagged[0].text}"` : ""));
      if (SHOTS) await page.screenshot({ path: path.join(SHOTS, `${route.replace(/\W+/g, "_")}${w}-${theme}.png`), fullPage: true });
    } catch (e) {
      bad++; results.push({ route, w, theme, fatal: String(e).slice(0, 200) });
      console.log(`${theme} ${w} ${route}: FATAL ${String(e).slice(0, 120)}`);
    }
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(OUT, JSON.stringify({ base: BASE, widths: WIDTHS, themes: THEMES, at: new Date().toISOString(), flaggedTotal: bad, results }, null, 1));
console.log(`total P0 (and empty, overflow): ${bad}`);
process.exit(bad ? 1 : 0);
