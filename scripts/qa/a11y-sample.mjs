// A sampled accessibility pass without external tooling (design audit §10):
//   · text contrast (WCAG 2.x ratio) for visible text nodes against the first
//     opaque ancestor background — 4.5:1 normal, 3:1 large (>=24px or >=18.66px bold)
//   · interactive target size: buttons/links/inputs smaller than 24×24 CSS px
//   · focus not obscured: Tab through the first 40 focusable elements and check
//     the focused element's box stays fully inside the viewport
// Sampling, not certification: routes come from the audit's 30, viewport 1363×936,
// THEME=dark repeats the pass on the dark theme. Prints a JSON summary.
import { chromium } from "playwright-core";
import fs from "node:fs";
const base = process.env.NEO_BASE || "http://localhost:4195";
const OUT = process.env.OUT || "audit/ux-2026-09/a11y-sample.json";
// The route list is the measurement run's (round 6 by default: /neo/domain/ was a
// directory listing in round 3's list; the hub is /neo/domain-model/).
const ROUTES = JSON.parse(fs.readFileSync(process.env.ROUTES_FROM || "audit/ux-2026-09/after-measurements.round6.json", "utf8")).results.map((r) => r.url);
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const ctx = await browser.newContext({ viewport: { width: 1363, height: 936 } });
if (process.env.THEME === "dark") await ctx.addInitScript(() => { try { localStorage.setItem("neo:theme", "dark"); } catch {} });
const page = await ctx.newPage();
const results = [];
for (const url of ROUTES) {
  await page.goto(base + url, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const r = await page.evaluate(() => {
    const lum = (c) => { const [r, g, b] = c.map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
    const parse = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(",").map((x) => parseFloat(x)); return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 }; };
    const bgOf = (el) => { let e = el; while (e) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a >= 0.99) return c.rgb; e = e.parentElement; } return [255, 255, 255]; };
    const ratio = (f, b) => { const l1 = lum(f), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
    const contrast = []; let checked = 0;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    let n;
    while ((n = walker.nextNode())) {
      const t = n.textContent.trim(); if (t.length < 3) continue;
      const el = n.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
      // decorative / hidden-from-AT text and skipped (closed <details>) subtrees are not judged
      if (el.closest('[aria-hidden="true"], details:not([open]) > :not(summary)')) continue;
      const cs = getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) < 0.5) continue;
      const box = el.getBoundingClientRect(); if (box.width === 0 || box.height === 0) continue;
      const fg = parse(cs.color); if (!fg || fg.a < 0.99) continue;
      const bg = bgOf(el);
      const size = parseFloat(cs.fontSize); const bold = parseInt(cs.fontWeight, 10) >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const need = large ? 3 : 4.5; const r = ratio(fg.rgb, bg); checked++;
      if (r < need) contrast.push({ text: t.slice(0, 40), ratio: +r.toFixed(2), need, size: +size.toFixed(1), cls: (typeof el.className === "string" ? el.className : "").split(" ").slice(0, 2).join(".") });
    }
    const small = [];
    for (const el of document.querySelectorAll("button, a[href], input, select, [role=button]")) {
      if (el.closest('details:not([open]) > :not(summary)')) continue;
      const b = el.getBoundingClientRect(); if (b.width === 0 || b.height === 0) continue;
      const cs = getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none") continue;
      if (b.width < 24 || b.height < 24) small.push({ tag: el.tagName.toLowerCase(), w: Math.round(b.width), h: Math.round(b.height), label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 30), cls: (typeof el.className === "string" ? el.className : "").split(" ").slice(0, 2).join(".") });
    }
    return { checked, contrast: contrast.slice(0, 40), contrastCount: contrast.length, small: small.slice(0, 25), smallCount: small.length };
  });
  // focus not obscured: tab through the first 40 focusables
  const obscured = [];
  await page.keyboard.press("Tab");
  for (let i = 0; i < 40; i++) {
    const info = await page.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return null; const b = a.getBoundingClientRect(); return { tag: a.tagName.toLowerCase(), label: (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 30), top: Math.round(b.top), bottom: Math.round(b.bottom), inside: b.top >= 0 && b.bottom <= window.innerHeight }; });
    if (info && !info.inside && info.bottom - info.top < 600) obscured.push(info);
    await page.keyboard.press("Tab");
  }
  results.push({ url, ...r, focusObscured: obscured.slice(0, 5), focusObscuredCount: obscured.length });
  console.log(`${url}: text ${r.checked} · contrast<need ${r.contrastCount} · targets<24px ${r.smallCount} · focus-obscured ${obscured.length}`);
}
fs.writeFileSync(OUT, JSON.stringify({ theme: process.env.THEME || "light", viewport: "1363x936", measuredAt: new Date().toISOString(), results }, null, 2));
await browser.close();
