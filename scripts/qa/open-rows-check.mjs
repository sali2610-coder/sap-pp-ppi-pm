// Round 6 · QA for the five OPEN rows of the coverage matrix (S6-4, S7-DOM-2, S7-LIB-4, S7-KN-1, S7-CERT-2)
// against a served out/. Phone = 390x844 iPhone UA; desktop = 1363x936.
//   NEO_BASE=http://localhost:4195 SHOTS=<dir> node scripts/qa/open-rows-check.mjs

import { mkdirSync } from "node:fs";
import path from "node:path";

import { chromium } from "playwright-core";
const BASE = process.env.NEO_BASE || "http://localhost:4195";
const SHOTS = process.env.SHOTS || "/tmp/qa-open5";
mkdirSync(SHOTS, { recursive: true });
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const out = {};
const errsOf = (page) => { const e = []; page.on("pageerror", (x) => e.push(x.message)); page.on("console", (m) => { if (m.type() === "error") e.push(m.text()); }); return e; };
const overflow = (page) => page.evaluate(() => {
  const doc = document.documentElement; const c = document.querySelector(".nx-canvas") || doc;
  return { page: doc.scrollWidth - doc.clientWidth, canvas: c.scrollWidth - c.clientWidth };
});

async function ctxFor(kind, theme) {
  const ctx = await browser.newContext(kind === "phone"
    ? { viewport: { width: 390, height: 844 }, userAgent: PHONE_UA, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
    : { viewport: { width: 1363, height: 936 } });
  if (theme === "dark") await ctx.addInitScript(() => { try { localStorage.setItem("neo:theme", "dark"); } catch {} });
  return ctx;
}

/* ------------------------------------------------------------ S6-4 ERD phone */
for (const theme of ["light", "dark"]) {
  const ctx = await ctxFor("phone", theme); const page = await ctx.newPage(); const errs = errsOf(page);
  const r = { theme, steps: [] };
  try {
  await page.goto(BASE + "/neo/erd/", { waitUntil: "networkidle" }); await page.waitForTimeout(800);
  const s0 = await page.evaluate(() => ({
    plist: document.querySelector(".ne")?.getAttribute("data-plist"),
    level: document.querySelector(".ne")?.getAttribute("data-level"),
    stageVisible: !!document.querySelector(".ne-stage") && getComputedStyle(document.querySelector(".ne-stage")).display !== "none",
    bodyCols: getComputedStyle(document.querySelector(".ne-body")).gridTemplateColumns,
    rows: document.querySelectorAll(".ne-insp .ne-row").length,
    rowH: Math.round(document.querySelector(".ne-insp .ne-row")?.getBoundingClientRect().height || 0),
    phoneBarW: Math.round(document.querySelector(".ne-phone")?.getBoundingClientRect().width || 0),
  }));
  r.steps.push({ at: "overview", ...s0, ov: await overflow(page) });
  await page.screenshot({ path: path.join(SHOTS, `erd-phone-${theme}-0-list.png`) });
  // full map toggle
  await page.getByRole("button", { name: "הצגת המפה המלאה" }).click(); await page.waitForTimeout(600);
  const s1 = await page.evaluate(() => ({ plist: document.querySelector(".ne")?.getAttribute("data-plist"), stageVisible: getComputedStyle(document.querySelector(".ne-stage")).display !== "none", zoom: [...document.querySelectorAll("button, span, output, div")].find((e) => /^\d{2,3}%$/.test((e.textContent || "").trim()))?.textContent?.trim() }));
  r.steps.push({ at: "fullmap", ...s1, ov: await overflow(page) });
  await page.screenshot({ path: path.join(SHOTS, `erd-phone-${theme}-1-map.png`) });
  await page.getByRole("button", { name: /^(הסתרת המפה|חזרה לרשימת המודולים)$/ }).click(); await page.waitForTimeout(300);
  // open PM module from the inspector's list
  await page.locator(".ne-insp .ne-row").filter({ hasText: /^\s*PM\b/ }).first().click().catch(async () => { await page.locator(".ne-insp .ne-row").filter({ hasText: "PM" }).first().click(); }); await page.waitForTimeout(900);
  const s2 = await page.evaluate(() => ({ level: document.querySelector(".ne")?.getAttribute("data-level"), stageVisible: getComputedStyle(document.querySelector(".ne-stage")).display !== "none", zoom: [...document.querySelectorAll("button, span, output, div")].find((e) => /^\d{2,3}%$/.test((e.textContent || "").trim()))?.textContent?.trim(), focusBar: !!document.querySelector(".ne-phone--focus"), focusDisabled: document.querySelector(".ne-phone--focus .ne-phone-btn")?.disabled }));
  r.steps.push({ at: "module", ...s2, ov: await overflow(page) });
  await page.screenshot({ path: path.join(SHOTS, `erd-phone-${theme}-2-module.png`) });
  // select a table from the inspector list (first row) → refit after selection
  const listRow = page.locator(".ne-list .ne-row, .ne-list button, .ne-list li button").first();
  const rowText = (await listRow.textContent().catch(() => "")) || "";
  await listRow.click().catch(() => {}); await page.waitForTimeout(900);
  const s3 = await page.evaluate(() => ({ level: document.querySelector(".ne")?.getAttribute("data-level"), sel: document.querySelector(".ne")?.getAttribute("data-sel"), opencard: document.querySelector(".ne")?.getAttribute("data-opencard"), zoom: [...document.querySelectorAll("button, span, output, div")].find((e) => /^\d{2,3}%$/.test((e.textContent || "").trim()))?.textContent?.trim(), focusLabel: document.querySelector(".ne-phone--focus .ne-phone-btn")?.textContent?.trim() }));
  r.steps.push({ at: "selected", row: rowText.slice(0, 40), ...s3, ov: await overflow(page) });
  await page.screenshot({ path: path.join(SHOTS, `erd-phone-${theme}-3-selected.png`) });
  // whole module ↔ focus toggle
  await page.getByRole("button", { name: "המודול כולו" }).click(); await page.waitForTimeout(700);
  const z4 = await page.evaluate(() => [...document.querySelectorAll("button, span, output, div")].find((e) => /^\d{2,3}%$/.test((e.textContent || "").trim()))?.textContent?.trim());
  const focusBtn = page.locator(".ne-phone--focus .ne-phone-btn").first();
  const focusEnabled = await focusBtn.isEnabled();
  if (focusEnabled) { await focusBtn.click(); await page.waitForTimeout(700); }
  const z5 = await page.evaluate(() => [...document.querySelectorAll("button, span, output, div")].find((e) => /^\d{2,3}%$/.test((e.textContent || "").trim()))?.textContent?.trim());
  r.steps.push({ at: "toggle", wholeZoom: z4, focusEnabled, focusZoom: z5, ov: await overflow(page) });
  await page.screenshot({ path: path.join(SHOTS, `erd-phone-${theme}-4-focus.png`) });
  // back to all modules
  await page.getByRole("button", { name: "כל המודולים" }).click(); await page.waitForTimeout(500);
  const s6 = await page.evaluate(() => ({ level: document.querySelector(".ne")?.getAttribute("data-level"), plist: document.querySelector(".ne")?.getAttribute("data-plist") }));
  r.steps.push({ at: "back", ...s6, ov: await overflow(page) });
  } catch (e) { r.error = String(e.message || e).slice(0, 300); await page.screenshot({ path: path.join(SHOTS, `erd-phone-${theme}-ERROR.png`) }).catch(() => {}); }
  r.consoleErrors = errs.length; r.errs = errs.slice(0, 3);
  out[`erd-phone-${theme}`] = r;
  await ctx.close();
}
// desktop: nothing phone-only rendered
{
  const ctx = await ctxFor("desktop", "light"); const page = await ctx.newPage(); const errs = errsOf(page);
  await page.goto(BASE + "/neo/erd/", { waitUntil: "networkidle" }); await page.waitForTimeout(800);
  out["erd-desktop"] = await page.evaluate(() => ({ phoneEls: document.querySelectorAll(".ne-phone").length, plist: document.querySelector(".ne")?.getAttribute("data-plist"), stageVisible: getComputedStyle(document.querySelector(".ne-stage")).display !== "none" }));
  out["erd-desktop"].consoleErrors = errs.length; out["erd-desktop"].ov = await overflow(page);
  await ctx.close();
}

/* ------------------------------------------------------- S7-DOM-2 stepper */
for (const [kind, w] of [["phone", 390], ["desktop", 1363], ["desktop", 1440], ["desktop", 1920]]) {
  const ctx = kind === "phone" ? await ctxFor("phone", "light") : await browser.newContext({ viewport: { width: w, height: 936 } });
  const page = await ctx.newPage(); const errs = errsOf(page);
  await page.goto(BASE + "/neo/domain/pm-functional-locations/", { waitUntil: "networkidle" }); await page.waitForTimeout(600);
  const m = await page.evaluate(() => {
    const ol = document.querySelector(".ndm-steps"); const steps = [...document.querySelectorAll(".ndm-step")];
    const tops = new Set(steps.map((s) => Math.round(s.getBoundingClientRect().top)));
    const first = steps[0]?.getBoundingClientRect(); const last = steps[steps.length - 1]?.getBoundingClientRect();
    const em = steps[0]?.querySelector("em"); const cs = em ? getComputedStyle(em) : null;
    return { steps: steps.length, rows: tops.size, firstRightOfLast: first && last ? first.right >= last.right : null, emFont: cs?.fontSize, emColor: cs?.color, olW: Math.round(ol?.getBoundingClientRect().width || 0), more: document.querySelector(".ndm-step-more")?.textContent?.trim(), chainId: !!document.getElementById("ndm-chain"), texts: steps.map((s) => s.textContent.trim().slice(0, 30)) };
  });
  await page.locator(".ndm-steps").scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  await page.locator(".ndm-steps").screenshot({ path: path.join(SHOTS, `dom-steps-${w}.png`) });
  out[`dom-${w}`] = { ...m, ov: await overflow(page), consoleErrors: errs.length };
  await ctx.close();
}

/* ------------------------------------------------------- S7-LIB-4 books */
for (const kind of ["phone", "desktop"]) {
  const ctx = await ctxFor(kind, "light"); const page = await ctx.newPage(); const errs = errsOf(page);
  await page.goto(BASE + "/neo/books/", { waitUntil: "networkidle" }); await page.waitForTimeout(600);
  // .nb-dictbar enters with a scroll-driven scale (nm-rise, entry 0..160px):
  // bring the summary into view first so the measured box is the settled one.
  await page.evaluate(() => document.querySelector(".nb-more > summary")?.scrollIntoView({ block: "center" })); await page.waitForTimeout(400);
  const m = await page.evaluate(() => ({ line: document.querySelector(".nb-dictbar-t")?.textContent?.trim(), details: !!document.querySelector(".nb-more"), open: document.querySelector(".nb-more")?.open, notes: document.querySelectorAll(".nb-more .nb-note").length, sumH: Math.round(document.querySelector(".nb-more > summary")?.getBoundingClientRect().height || 0), sumLayoutH: document.querySelector(".nb-more > summary")?.offsetHeight || 0, wideNote: document.querySelectorAll(".nb-note--wide").length }));
  await page.locator(".nb-more > summary").click(); await page.waitForTimeout(300);
  m.openAfter = await page.evaluate(() => document.querySelector(".nb-more")?.open);
  m.noteTexts = await page.evaluate(() => [...document.querySelectorAll(".nb-more .nb-note")].map((n) => n.textContent.trim().slice(0, 60)));
  await page.locator(".nb-dictbar").screenshot({ path: path.join(SHOTS, `books-more-${kind}.png`) });
  out[`books-${kind}`] = { ...m, ov: await overflow(page), consoleErrors: errs.length };
  await ctx.close();
}

/* ------------------------------------------------------- S7-KN-1 knowledge */
{
  const ctx = await ctxFor("desktop", "light"); const page = await ctx.newPage(); const errs = errsOf(page);
  await page.goto(BASE + "/neo/knowledge/", { waitUntil: "networkidle" }); await page.waitForTimeout(500);
  const m = await page.evaluate(() => {
    const rows = [...document.querySelectorAll(".nxl-row .nxl-t1")];
    const dup = rows.filter((r) => { const b = r.querySelector("b")?.textContent?.trim().toLowerCase(); const e = r.querySelector("em")?.textContent?.trim().toLowerCase(); return b && e && b === e; }).length;
    return { rows: rows.length, duplicatedTitles: dup, sample: rows.slice(0, 2).map((r) => r.textContent.trim()) };
  });
  await page.goto(BASE + "/neo/knowledge/table/", { waitUntil: "networkidle" }); await page.waitForTimeout(500);
  m.refs = await page.evaluate(() => [...document.querySelectorAll(".nxv-ref")].map((a) => ({ b: a.querySelector("b")?.textContent, sec: a.querySelector("span")?.textContent, href: a.getAttribute("href") })));
  m.slugAsPrimary = m.refs.filter((r) => /^[a-z0-9-]+$/.test(r.b || "")).length;
  await page.locator(".nxv").screenshot({ path: path.join(SHOTS, `kn-table-refs.png`), fullPage: false }).catch(() => {});
  await page.goto(BASE + "/neo/knowledge/bapi/", { waitUntil: "networkidle" }); await page.waitForTimeout(300);
  m.bapiHead = await page.evaluate(() => ({ h1: document.querySelector(".nxv-h1")?.textContent, en: document.querySelector(".nxv-en")?.textContent ?? null }));
  out["knowledge"] = { ...m, consoleErrors: errs.length };
  await ctx.close();
}

/* ------------------------------------------------------- S7-CERT-2 entry */
for (const kind of ["phone", "desktop"]) {
  const ctx = await ctxFor(kind, "light"); const page = await ctx.newPage(); const errs = errsOf(page);
  await page.goto(BASE + "/neo/certification/", { waitUntil: "networkidle" }); await page.waitForTimeout(500);
  const m = await page.evaluate(() => {
    const cta = document.querySelector("a.nce-start");
    const btns = [...document.querySelectorAll(".nu-btn")];
    return { lede: document.querySelector(".nx-lede")?.textContent?.trim(), pickers: document.querySelectorAll(".nce-pick").length, opts: document.querySelectorAll(".nce-opt").length, primaryButtons: btns.length, ctaHref: cta?.getAttribute("href"), ctaTop: Math.round(cta?.getBoundingClientRect().top || 0), ctaH: Math.round(cta?.getBoundingClientRect().height || 0), details: document.querySelectorAll(".nxl-more").length, detailsOpen: [...document.querySelectorAll(".nxl-more")].filter((d) => d.open).length, hint: document.querySelector(".nce-pick-hint")?.textContent?.trim(), note: document.querySelector(".nxb-setup-n")?.textContent?.trim() };
  });
  await page.screenshot({ path: path.join(SHOTS, `cert-entry-${kind}.png`) });
  // change bank + level, follow the CTA, the runner should start at once
  await page.locator(".nce-opt").filter({ hasText: "PP-PI" }).click();
  await page.locator(".nce-pick").nth(1).locator(".nce-opt").nth(2).click();
  await page.locator(".nce-pick").nth(2).locator(".nce-opt").nth(0).click();
  m.ctaHref2 = await page.locator("a.nce-start").getAttribute("href");
  await page.locator("a.nce-start").click(); await page.waitForLoadState("networkidle"); await page.waitForTimeout(700);
  m.runner = await page.evaluate(() => ({ url: location.pathname + location.search, phase: document.querySelector(".nce")?.getAttribute("data-phase"), count: document.querySelector(".nce-count")?.textContent?.trim(), chips: [...document.querySelectorAll(".nce-q-meta .nce-chip")].map((c) => c.textContent.trim()) }));
  await page.screenshot({ path: path.join(SHOTS, `cert-runner-${kind}.png`) });
  // direct runner entry without query keeps the setup screen
  await page.goto(BASE + "/neo/certification/exam/", { waitUntil: "networkidle" }); await page.waitForTimeout(400);
  m.runnerNoQuery = await page.evaluate(() => document.querySelector(".nce")?.getAttribute("data-phase"));
  out[`cert-${kind}`] = { ...m, ov: await overflow(page), consoleErrors: errs.length };
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 2));
