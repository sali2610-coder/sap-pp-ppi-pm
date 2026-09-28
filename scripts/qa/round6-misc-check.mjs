// Round 6 · the smaller rows: ERD-5 relation sentences, LIB-2 first cover,
// LIB-5 basic/advanced reader bar, AI-1 question field first, AI-4 names.
//   NEO_BASE=http://localhost:4195 node scripts/qa/round6-misc-check.mjs
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const PHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const out = {}; const errs = [];
const desk = await browser.newPage({ viewport: { width: 1363, height: 936 } }); desk.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
// ERD-5
await desk.goto(base + "/neo/erd/#AFKO", { waitUntil: "networkidle" }); await desk.waitForTimeout(1500);
out.erd5 = await desk.evaluate(() => { const s = [...document.querySelectorAll(".ne-join-say")]; return { sentences: s.length, first: s[0]?.textContent?.trim().slice(0, 120), joins: document.querySelectorAll(".ne-joins > li").length }; });
out.erd5.ok = out.erd5.sentences > 0 && out.erd5.sentences === out.erd5.joins;
// LIB-2
await desk.goto(base + "/neo/books/", { waitUntil: "networkidle" }); await desk.waitForTimeout(600);
out.lib2 = await desk.evaluate(() => { const c = document.querySelector(".nb-card"); const d = document.querySelector(".nb-dictbar"); return { firstCoverTop: Math.round(c?.getBoundingClientRect().top || 0), dictbarTop: Math.round(d?.getBoundingClientRect().top || 0), vh: innerHeight }; });
out.lib2.ok = out.lib2.firstCoverTop > 0 && out.lib2.firstCoverTop < out.lib2.vh && out.lib2.dictbarTop > out.lib2.firstCoverTop;
// LIB-5
await desk.goto(base + "/neo/read/book2/", { waitUntil: "networkidle" }); await desk.waitForTimeout(1200);
out.lib5 = await desk.evaluate(() => ({ before: document.querySelectorAll(".nr-tools button, .nr-tools .nr-steps").length, toggle: !!document.querySelector(".nr-adv-b"), advOpen: !!document.querySelector(".nr-adv"), langs: !!document.querySelector(".nr-langs"), size: !!document.querySelector('.nr-steps[aria-label="גודל טקסט"]'), focus: !!document.querySelector('button[aria-label="מצב מיקוד"]') }));
await desk.locator(".nr-adv-b").click(); await desk.waitForTimeout(300);
out.lib5.after = await desk.evaluate(() => ({ advOpen: !!document.querySelector(".nr-adv"), advControls: document.querySelectorAll(".nr-adv button").length, expanded: document.querySelector(".nr-adv-b")?.getAttribute("aria-expanded"), lens: !!document.querySelector('.nr-adv button[aria-label="עדשת קריאה"]'), paper: !!document.querySelector('.nr-adv button[aria-label="גוון נייר"]') }));
out.lib5.ok = out.lib5.toggle && !out.lib5.advOpen && out.lib5.langs && out.lib5.size && out.lib5.focus && out.lib5.after.advOpen && out.lib5.after.advControls >= 5 && out.lib5.after.expanded === "true";
// AI-4 names
await desk.goto(base + "/neo/chat/", { waitUntil: "networkidle" }); await desk.waitForTimeout(500);
out.ai4 = await desk.evaluate(() => ({ chatH1: document.querySelector("h1")?.textContent?.trim(), chatEyebrow: document.querySelector(".nxq-eyebrow")?.textContent?.trim(), dockBtn: document.querySelector(".nxk-b--ask span")?.textContent?.trim(), title: document.title }));
await desk.locator(".nxk-b--ask").click(); await desk.waitForTimeout(400);
out.ai4.panel = await desk.evaluate(() => ({ h2: document.querySelector(".nxk-p--ask h2")?.textContent?.trim(), links: [...document.querySelectorAll(".nxk-go-a")].map((a) => a.textContent.trim().split("\n")[0].trim().slice(0, 30)) }));
await desk.goto(base + "/neo/ai/", { waitUntil: "networkidle" }); await desk.waitForTimeout(400);
out.ai4.libH1 = await desk.evaluate(() => document.querySelector("h1")?.textContent?.trim());
out.ai4.ok = /שיחה כללית/.test(out.ai4.chatH1 || "") && /עזרה בעמוד/.test(out.ai4.dockBtn || "") && /עזרה בעמוד/.test(out.ai4.panel.h2 || "") && /ספרייה/.test(out.ai4.libH1 || "");
await desk.close();
// AI-1 composer first (phone + desktop)
for (const [kind, opts] of [["desktop", { viewport: { width: 1363, height: 936 } }], ["phone", { viewport: { width: 390, height: 844 }, userAgent: PHONE_UA, isMobile: true, hasTouch: true }]]) {
  const ctx = await browser.newContext(opts); const page = await ctx.newPage(); page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  for (const u of ["/neo/ai/", "/neo/chat/"]) {
    await page.goto(base + u, { waitUntil: "networkidle" }); await page.waitForTimeout(500);
    const m = await page.evaluate(() => { const c = document.querySelector(".nxq-composer"); const s = document.querySelector(".nxq-starters, .nxg-intro"); return { composerTop: Math.round(c?.getBoundingClientRect().top || 0), startersTop: Math.round(s?.getBoundingClientRect().top || 0), vh: innerHeight }; });
    m.ok = m.composerTop > 0 && m.composerTop < m.vh && (m.startersTop === 0 || m.composerTop < m.startersTop);
    out[`ai1:${kind}:${u}`] = m;
  }
  await ctx.close();
}
await browser.close();
out.consoleErrors = errs.length;
const ok = out.erd5.ok && out.lib2.ok && out.lib5.ok && out.ai4.ok && Object.keys(out).filter((k) => k.startsWith("ai1:")).every((k) => out[k].ok) && errs.length === 0;
console.log(JSON.stringify(out, null, 2)); console.log(ok ? "MISC OK" : "MISC FAIL");
process.exit(ok ? 0 : 1);
