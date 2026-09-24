// Astra re-verification extras: measures, on the served export, the matrix rows
// the other QA scripts do not cover: the round-1 interaction runs (S11-1..5,
// S7-ERD-2, APPX-4), the SAP fact rows (SAP-1..8, strings from SAP-FIXES.md),
// catalog order (S7-CAT-4/8), the ACC-6 bridge, "continue reading" (S7-LIB-3),
// the AI limits column (S7-AI-3), the home opener (S7-HOME-3) and the
// build-explanation string scan (S9-1, S7-TBL-3). Prints JSON; exit 1 on failure.
import { chromium } from "playwright-core";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const base = process.env.NEO_BASE || "http://localhost:4196";
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const out = { base };
const fail = [];
const check = (id, ok, detail) => { out[id] = { ok: !!ok, ...detail }; if (!ok) fail.push(id); };

const visible = (h) => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ");
const get = async (u) => { const r = await fetch(base + u); const html = await r.text(); return { status: r.status, html, t: visible(html) }; };

/* ------------------------------------------------ SAP fact rows (static) */
{
  const p = await get("/neo/transactions/IP30/");
  check("SAP-1", p.status === 200 && p.t.includes("פישוט") && /RISTRA20/.test(p.t) && p.t.includes("IP30H"), { status: p.status, simplification: p.t.includes("פישוט"), ristra20: /RISTRA20/.test(p.t), successorIP30H: p.t.includes("IP30H") });
}
{
  const a = await get("/neo/bapi/NOTIF_TASK_READ/"), b = await get("/neo/bapi/NOTIF_ACTIVITY_READ/");
  const oldMix = a.t.includes("QMMA/QMSM");
  check("SAP-2", a.status === 200 && b.status === 200 && a.t.includes("QMSM") && b.t.includes("QMMA") && !oldMix, { status: [a.status, b.status], taskShowsQMSM: a.t.includes("QMSM"), activityShowsQMMA: b.t.includes("QMMA"), oldMixedClaim: oldMix });
}
{
  const p = await get("/neo/tables/QMAT/");
  check("SAP-3", p.status === 200 && p.t.includes("QA08") && p.t.includes("MM01"), { status: p.status, QA08: p.t.includes("QA08"), MM01: p.t.includes("MM01") });
}
{
  const p = await get("/neo/tables/TJ30T/");
  check("SAP-4", p.status === 200 && p.t.includes("TXTSH") && p.t.includes("TXTMD"), { status: p.status, TXTSH: p.t.includes("TXTSH"), TXTMD: p.t.includes("TXTMD") });
}
{
  const b = await get("/neo/bapi/"), i = await get("/neo/idoc/BOMMAT/"), ic = await get("/neo/idoc/");
  const stats = (h) => [...h.matchAll(/class="nxd-stat"[\s\S]*?<b>([\d,]+)<\/b>\s*<span>([^<]*)<\/span>/g)].map((m) => `${m[1]} ${m[2]}`);
  check("SAP-5", b.status === 200 && i.status === 200 && ic.status === 200, { status: { bapi: b.status, idocBOMMAT: i.status, idoc: ic.status }, bapiStats: stats(b.html), idocStats: stats(ic.html) });
}
{
  const ce = await get("/neo/enhancements/customer-exit/"), ie = await get("/neo/enhancements/implicit-enhancement/");
  const oc = await get("/exits/CMOD-SMOD/"), oi = await get("/exits/Implicit-Enhancement/");
  const links = (h, to) => h.includes(`href="${to}"`);
  const ok = ce.status === 200 && ie.status === 200 && ce.t.includes("CMOD") && links(oc.html, "/neo/enhancements/customer-exit/") && links(oi.html, "/neo/enhancements/implicit-enhancement/");
  check("SAP-6", ok, { status: [ce.status, ie.status], customerExitNamesCMOD: ce.t.includes("CMOD"), legacyCMODpointsToNeo: links(oc.html, "/neo/enhancements/customer-exit/"), legacyImplicitPointsToNeo: links(oi.html, "/neo/enhancements/implicit-enhancement/") });
}
{
  const p = await get("/neo/bapi/BAPI_PROCORD_GET_DETAIL/");
  const need = ["COR3", "BUS2116", "AFKO", "AFPO", "AFVC"], miss = need.filter((x) => !p.t.includes(x));
  check("SAP-7", p.status === 200 && !miss.length, { status: p.status, missing: miss });
}
{
  const g = await get("/neo/bapi/BAPI_PROCORDCONF_GETLIST/"), c = await get("/neo/bapi/BAPI_BATCH_CREATE/");
  // wrong names outside the evidence layer (which records them as history on purpose);
  // a line that also names the corrected value is a dated correction note, not a claim
  const OLD_NEW = [["API_PROCESSORDER_2", "API_PROCESS_ORDER_2_SRV"], ["\"API_PROCORDCONF\"", "API_PROC_ORDER_CONFIRMATION_2_SRV"], ["BUS1001_BATCH", "BUS1001002"], ["COConf", "COR6"]];
  const roots = ["data", "lib", "components", "app"], skip = /^(data\/(verification|books|library|ai-tree)\/)/;
  const hits = {};
  const walk = (d) => { for (const f of readdirSync(d)) { const p = path.join(d, f); if (skip.test(p + "/")) continue; const s = statSync(p); if (s.isDirectory()) walk(p); else if (/\.(ts|tsx|json|mjs)$/.test(f)) { const src = readFileSync(p, "utf8"); for (const [n, fixed] of OLD_NEW) for (const line of src.split("\n")) if (line.includes(n) && !line.includes(fixed)) { (hits[n] ||= []).push(p); break; } } } };
  roots.forEach(walk);
  const ok = g.status === 200 && c.status === 200 && g.t.includes("COR6N") && g.t.includes("CORK") && !g.t.includes("COConf") && c.t.includes("BUS1001002") && !c.t.includes("BUS1001_BATCH") && !Object.keys(hits).length;
  check("SAP-8", ok, { status: [g.status, c.status], getlistShowsCOR6N_CORK: g.t.includes("COR6N") && g.t.includes("CORK"), batchShowsBUS1001002: c.t.includes("BUS1001002"), oldNamesOutsideEvidence: hits });
}

/* ---------------------------------------------------- S9-1 / S7-TBL-3 scan */
{
  const phrases = ["לא נכתב ביד", "הומצא", "סרגל ריק", "נספרים כאן"], hits = [];
  const walk = (d) => { for (const f of readdirSync(d)) { const p = path.join(d, f); const s = statSync(p); if (s.isDirectory()) walk(p); else if (/\.(ts|tsx)$/.test(f)) { const src = readFileSync(p, "utf8"); for (const x of phrases) if (src.includes(x)) hits.push(`${p}: ${x}`); } } };
  ["components/neo-shell", "app/neo"].forEach(walk);
  const openers = {};
  for (const u of ["/sap-notes/", "/knowledge/"]) {
    const p = await get(u); const m = p.html.match(/<h1[\s\S]*?<\/h1>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/);
    const lede = m ? visible(m[1]) : "";
    openers[u] = { status: p.status, lede: lede.slice(0, 90), builtNote: /מומצאים/.test(lede) };
  }
  check("S9-1", !hits.length && Object.values(openers).every((o) => o.status === 200 && !o.builtNote), { neoSourceHits: hits, legacyOpeners: openers });
}

const browser = await chromium.launch({ executablePath: CHROME });
const desk = async (w = 1363, h = 936, extra = {}) => {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, locale: "he-IL", reducedMotion: "reduce", ...extra });
  const page = await ctx.newPage(); const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
  return { ctx, page, errs };
};

/* ------------------------------------------------ S11-1 / S11-2 tables */
{
  const { ctx, page, errs } = await desk();
  await page.goto(base + "/neo/tables/", { waitUntil: "networkidle" });
  const box = page.locator('.nxd-tools input[type="search"]').first();
  const count = () => page.evaluate(() => (document.querySelector(".nxd-count")?.textContent || "").replace(/\s+/g, " ").trim());
  const rows = () => page.evaluate(() => document.querySelectorAll(".nxd-list > li").length);
  await box.fill("MARA"); await page.waitForTimeout(600);
  const mara = { count: await count(), rows: await rows() };
  check("S11-1", mara.rows === 1 && /^1 מתוך 105 טבלאות/.test(mara.count), mara);
  await box.fill("ZZZNOPE"); await page.waitForTimeout(600);
  const none = await page.evaluate(() => ({ empty: !!document.querySelector(".nxd-none"), buttons: [...document.querySelectorAll(".nxd-none-a button")].map((b) => b.textContent.trim()) }));
  await page.locator(".nxd-none-a .nu-btn").click(); await page.waitForTimeout(600);
  const restored = { count: await count(), query: await box.inputValue() };
  check("S11-2", none.empty && none.buttons.includes("הצגת כל הטבלאות") && none.buttons.includes("ניקוי החיפוש בלבד") && /^105 מתוך 105/.test(restored.count) && restored.query === "" && errs.length === 0, { ...none, afterShowAll: restored, consoleErrors: errs.length });
  await ctx.close();
}

/* ------------------------------------------------ S11-3 AFKO section chip */
{
  const { ctx, page, errs } = await desk();
  await page.goto(base + "/neo/tables/AFKO/", { waitUntil: "networkidle" });
  const chip = page.locator('.nxs-i[href="#nxb-fields"]').first();
  const label = (await chip.textContent())?.replace(/\s+/g, " ").trim();
  await chip.click(); await page.waitForTimeout(900);
  const m = await page.evaluate(() => ({ top: Math.round(document.getElementById("nxb-fields")?.getBoundingClientRect().top ?? -1), active: document.querySelector('.nxs-i[href="#nxb-fields"]')?.getAttribute("aria-current") }));
  check("S11-3", m.top >= 0 && m.top <= 200 && m.active === "true" && errs.length === 0, { chip: label, ...m, consoleErrors: errs.length });
  await ctx.close();
}

/* ------------------------------------------------ S11-4 object lanes */
{
  const { ctx, page, errs } = await desk();
  await page.goto(base + "/neo/object/MARA/", { waitUntil: "networkidle" });
  const n = await page.evaluate(() => document.querySelectorAll(".nol-n").length);
  check("S11-4", n > 0 && errs.length === 0, { lanesNodes: n, round1: 21, consoleErrors: errs.length });
  await ctx.close();
}

/* ------------------------------------------------ ERD: S11-5, APPX-4, S7-ERD-2 */
{
  const { ctx, page, errs } = await desk();
  await page.goto(base + "/neo/erd/", { waitUntil: "networkidle" }); await page.waitForTimeout(900);
  const probe = () => page.evaluate(() => {
    const st = document.querySelector(".ne-stage")?.getBoundingClientRect();
    const nodes = [...document.querySelectorAll(".ne-node")];
    const outside = st ? nodes.filter((n) => { const r = n.getBoundingClientRect(); return r.width && (r.left < st.left - 1 || r.right > st.right + 1 || r.top < st.top - 1 || r.bottom > st.bottom + 1); }).length : -1;
    const z = [...document.querySelectorAll("button, span, output")].find((e) => /^\d{2,3}%$/.test((e.textContent || "").trim()));
    return { zoom: z ? z.textContent.trim() : null, nodes: nodes.length, outside };
  });
  const open = await probe();
  await page.locator(".ne-stage").focus(); await page.keyboard.press("0"); await page.waitForTimeout(700);
  const fit = await probe();
  check("S11-5", fit.nodes > 0 && fit.outside === 0, { afterKey0: fit });
  check("APPX-4", open.zoom != null && open.zoom === fit.zoom && open.outside === 0, { opening: open, fit });
  await page.setViewportSize({ width: 1100, height: 936 }); await page.waitForTimeout(900);
  const narrow = await probe();
  await page.setViewportSize({ width: 1363, height: 936 }); await page.waitForTimeout(900);
  const back = await probe();
  check("S7-ERD-2", narrow.outside === 0 && back.outside === 0 && back.zoom === open.zoom && errs.length === 0, { at1363: open, at1100: narrow, backTo1363: back, consoleErrors: errs.length });
  await ctx.close();
}

/* ------------------------------------------------ S7-CAT-4 / S7-CAT-8 */
{
  const { ctx, page, errs } = await desk();
  const cats = ["/neo/tables/", "/neo/transactions/", "/neo/bapi/", "/neo/idoc/", "/neo/cds/", "/neo/fiori-apps/", "/neo/enhancements/"];
  const sig = {};
  for (const u of cats) {
    await page.goto(base + u, { waitUntil: "networkidle" });
    sig[u] = await page.evaluate(() => {
      const tok = (el) => el.matches('input[type="search"]') || el.querySelector('input[type="search"]') ? "search" : /nxd-sort/.test(el.className) ? "sort" : /nxd-tabs/.test(el.className) || el.getAttribute("role") === "tablist" ? "view" : String(el.className || el.tagName).split(" ")[0];
      const tools = [...(document.querySelector(".nxd-tools")?.children || [])].map(tok);
      const blocks = [];
      for (const el of document.querySelectorAll("h1, .nxd-tools, .nxd-facet, .nxd-count, .nxd-list, .nxd-groups, .nxd-none")) {
        const k = el.tagName === "H1" ? "h1" : el.matches(".nxd-tools") ? "tools" : el.matches(".nxd-facet") ? "filters" : el.matches(".nxd-count") ? "count" : "list";
        if (blocks[blocks.length - 1] !== k && !blocks.includes(k)) blocks.push(k);
      }
      const h1 = document.querySelector("h1"); let lede = h1?.nextElementSibling; while (lede && lede.tagName !== "P") lede = lede.nextElementSibling;
      return { tools, blocks, ledeParagraphs: lede ? 1 : 0 };
    });
  }
  const same = (k) => new Set(Object.values(sig).map((s) => JSON.stringify(s[k]))).size === 1;
  check("S7-CAT-8", same("tools") && errs.length === 0, { toolbarOrder: sig["/neo/tables/"].tools, identicalAcross7: same("tools"), perCatalog: Object.fromEntries(Object.entries(sig).map(([u, s]) => [u, s.tools.join(">")])) });
  check("S7-CAT-4", same("blocks"), { blockOrder: sig["/neo/tables/"].blocks, identicalAcross7: same("blocks"), perCatalog: Object.fromEntries(Object.entries(sig).map(([u, s]) => [u, s.blocks.join(">")])) });
  await ctx.close();
}

/* ------------------------------------------------ S7-HOME-3 */
{
  const { ctx, page } = await desk();
  await page.goto(base + "/neo/", { waitUntil: "networkidle" });
  const lede = await page.evaluate(() => { const h1 = document.querySelector("h1"); let p = h1?.nextElementSibling; while (p && p.tagName !== "P") p = p.nextElementSibling; return (p?.textContent || "").replace(/\s+/g, " ").trim(); });
  // Acceptance: the repository-structure explanation sits behind a secondary
  // section, not in the opener. Measured: the opener carries none of the
  // build/structure vocabulary, and the numbered secondary sections exist.
  const structure = ["בלופרינט", "נוצר מ", "נבנה", "שכבת", "נספרים", "לא נכתב ביד", "הומצא", "מקור הנתונים"].filter((w) => lede.includes(w));
  const secondary = await page.evaluate(() => document.querySelectorAll("section h2").length);
  const sentences = lede ? lede.split(/(?<=[.!?])\s+/).filter(Boolean).length : 0;
  check("S7-HOME-3", !!lede && !structure.length && secondary >= 2, { lede, sentences, structureWordsInOpener: structure, secondarySections: secondary });
  await ctx.close();
}

/* ------------------------------------------------ S7-AI-3 */
{
  const { ctx, page } = await desk();
  const res = {};
  for (const u of ["/neo/ai/", "/neo/chat/"]) {
    await page.goto(base + u, { waitUntil: "networkidle" }); await page.waitForTimeout(500);
    res[u] = await page.evaluate(() => {
      const t = document.body.innerText;
      const lim = [...document.querySelectorAll("h2, h3, h4, strong, b")].find((e) => e.textContent.trim() === "מגבלות");
      const adv = (t.match(/[^.\n]{0,70}(?:לאמת|אינו תחליף|אינה תחליף|מתוך ספרי SAP)[^.\n]{0,70}/) || [""])[0].trim();
      return { limitsHeading: !!lim && lim.getBoundingClientRect().height > 0, advisory: adv };
    });
  }
  // The limits column lives on /neo/chat/ (general AI). /neo/ai/ answers from the
  // library's books; while idle its hero is hidden (chat.css, the welcome block
  // carries the title) and the welcome block keeps the scope line visible.
  check("S7-AI-3", res["/neo/chat/"].limitsHeading && !!res["/neo/chat/"].advisory && /מתוך ספרי SAP/.test(res["/neo/ai/"].advisory), res);
  await ctx.close();
}

/* ------------------------------------------------ S7-LIB-3 continue reading */
{
  const fresh = await desk();
  await fresh.page.goto(base + "/neo/books/", { waitUntil: "networkidle" });
  const resume = () => fresh.page.evaluate(() => [...document.querySelectorAll("a, button")].filter((e) => e.textContent.trim().startsWith("המשך קריאה") && e.getBoundingClientRect().height > 0).map((e) => ({ text: e.textContent.trim().slice(0, 40), primary: /\bnu-btn\b/.test(e.className) })));
  const before = (await resume()).length;
  await fresh.page.goto(base + "/neo/read/book2/?c=3", { waitUntil: "networkidle" }); await fresh.page.waitForTimeout(800);
  for (let i = 0; i < 4; i++) { await fresh.page.mouse.wheel(0, 900); await fresh.page.waitForTimeout(400); }
  await fresh.page.waitForTimeout(1200);
  await fresh.page.goto(base + "/neo/books/", { waitUntil: "networkidle" }); await fresh.page.waitForTimeout(600);
  const after = await resume();
  check("S7-LIB-3", before === 0 && after.length >= 1 && after.some((a) => a.primary) && fresh.errs.length === 0, { freshProfile: before, afterReadingBook2: after, consoleErrors: fresh.errs.length });
  await fresh.ctx.close();
}

/* ------------------------------------------------ ACC-6 bridge on the legacy shell */
{
  const res = {};
  for (const [kind, opts] of [["desktop", {}], ["phone", { userAgent: PHONE_UA, isMobile: true, hasTouch: true }]]) {
    const { ctx, page, errs } = await desk(kind === "phone" ? 390 : 1363, kind === "phone" ? 844 : 936, opts);
    // A first visit opens the legacy welcome dialog (modal, lib/role.ts neo:onboarded)
    // over the header; record it, then measure as a returning reader.
    await page.goto(base + "/tables/", { waitUntil: "networkidle" });
    res[`${kind} first-visit welcome dialog`] = await page.evaluate(() => !!document.querySelector('aside[role="dialog"][aria-modal="true"]'));
    await page.evaluate(() => { try { localStorage.setItem("neo:onboarded", "1"); } catch {} });
    for (const u of ["/library/", "/knowledge/", "/tables/", "/sap-notes/"]) {
      await page.goto(base + u, { waitUntil: "networkidle" });
      res[`${kind} ${u}`] = await page.evaluate(() => { const a = [...document.querySelectorAll("[data-neo-bridge]")].find((e) => e.getBoundingClientRect().width > 0); const r = a?.getBoundingClientRect(); return a ? { href: a.getAttribute("href"), w: Math.round(r.width), h: Math.round(r.height) } : null; });
    }
    await page.goto(base + "/tables/", { waitUntil: "networkidle" });
    const a = page.locator("[data-neo-bridge]").filter({ visible: true }).first();
    await a.click(); await page.waitForTimeout(800);
    res[`${kind} click`] = { landed: new URL(page.url()).pathname, consoleErrors: errs.length };
    await ctx.close();
  }
  const pills = Object.entries(res).filter(([k]) => / \/.*\/$/.test(k)).map(([, v]) => v);
  const ok = pills.every((v) => v && v.href === "/neo/" && v.h >= 24 && v.w >= 24) && ["desktop click", "phone click"].every((k) => res[k].landed === "/neo/");
  check("ACC-6", ok, res);
}

await browser.close();
out.failed = fail;
console.log(JSON.stringify(out, null, 1));
process.exit(fail.length ? 1 : 0);
