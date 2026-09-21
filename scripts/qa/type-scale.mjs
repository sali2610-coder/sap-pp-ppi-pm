// Measures the rendered type scale on three screen types (gate / work / detail)
// so typography decisions rest on numbers, not on hardcoded targets. Prints px.
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const PAGES = [["gate", "/neo/"], ["work", "/neo/tables/"], ["detail", "/neo/tables/AFKO/"], ["detail-fn", "/neo/bapi/BAPI_ALM_CONF_CREATE/"], ["reader", "/neo/read/book2/"]];
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage({ viewport: { width: 1363, height: 936 } });
for (const [kind, url] of PAGES) {
  await page.goto(base + url, { waitUntil: "networkidle" });
  const r = await page.evaluate(() => {
    const px = (sel) => { const el = document.querySelector(sel); if (!el) return null; const cs = getComputedStyle(el); return `${parseFloat(cs.fontSize).toFixed(1)}px/${parseFloat(cs.lineHeight) ? (parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2) : cs.lineHeight}`; };
    const body = (() => { const p = [...document.querySelectorAll(".nx-canvas p")].find((e) => (e.textContent || "").trim().length > 60 && !e.className.includes("lede")); return p ? px("." + p.className.split(" ")[0]) || getComputedStyle(p).fontSize : null; })();
    return { h1: px("h1"), lede: px(".nx-lede, .nh-lede, .nb-lede, .nxq-lede, .nr-lede"), eyebrow: px(".nx-eyebrow, .nh-eye, .nb-eye"), muted: px(".nx-muted, .nxd-count, .nw-fine"), chip: px(".nu-chip, .nu-status, .nu-tab"), body, readerBody: px(".nr-body p, .nr-text p, .nr-sec p") };
  });
  console.log(kind.padEnd(10), url.padEnd(34), JSON.stringify(r));
}
await browser.close();
