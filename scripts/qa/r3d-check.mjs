// Round 3 batch 5 checks (static HTML + one browser pass): incident section
// order, gate role lines, academy opener + start control, home actions, lesson
// exposure wording + local TOC, chat openers ≤ 4. Prints JSON; exit 1 on failure.
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const get = async (u) => (await fetch(base + u)).text();
const out = {};
const cogi = await get("/neo/incidents/cogi-stuck/");
const idx = (s, t) => s.indexOf(t);
out.incident = { sym: idx(cogi, 'id="i-sym"'), fix: idx(cogi, 'id="i-fx"'), s4: idx(cogi, 'id="i-s4"'), sc: idx(cogi, 'id="i-sc"') };
out.incident.ok = out.incident.sym > 0 && out.incident.sym < out.incident.fix && out.incident.fix < out.incident.s4 && out.incident.s4 < out.incident.sc;
out.gates = { knowledge: (await get("/neo/knowledge/")).includes("nx-gate-note"), centers: (await get("/neo/centers/")).includes("nx-gate-note"), domains: (await get("/neo/domain-model/")).includes("nx-gate-note") };
const academy = await get("/neo/academy/");
out.academy = { what: academy.includes("מה תלמד"), start: academy.includes("התחלת הלמידה"), cert: academy.includes("תרגול ובדיקת ידע") };
const home = await get("/neo/");
out.home = ["חיפוש טבלה", "פתיחת תהליך עסקי", "בדיקת שינוי ב-", "המשך ללמוד", "מודל הנתונים"].map((t) => [t, home.includes(t)]);
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage({ viewport: { width: 1363, height: 936 } });
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
// a lesson with many blocks: take the first lesson link from the PM course
await page.goto(base + "/neo/academy/pm/", { waitUntil: "networkidle" });
const lessonHref = await page.evaluate(() => [...document.querySelectorAll('a[href^="/neo/academy/pm/"]')].map((a) => a.getAttribute("href")).find((h) => h.split("/").filter(Boolean).length >= 4));
out.lessonHref = lessonHref;
if (lessonHref) {
  await page.goto(base + lessonHref, { waitUntil: "networkidle" });
  // The viewed label appears only once a section has passed the reading band,
  // so read it after scrolling the lesson through, as a reader does.
  const before = await page.evaluate(() => document.querySelectorAll(".nxs-read").length);
  for (const sec of await page.locator(".nxs-sec").all()) { await sec.scrollIntoViewIfNeeded(); await page.waitForTimeout(120); }
  await page.waitForTimeout(400);
  out.lesson = await page.evaluate(() => ({ toc: !!document.querySelector(".nxs-toc"), blocks: document.querySelectorAll(".nxs-sec").length, exposure: !!document.querySelector(".nxs-exposure"), readWord: [...document.querySelectorAll(".nxs-read")].map((e) => e.textContent.trim())[0] || null, viewed: document.querySelectorAll(".nxs-read").length, nikra: document.body.innerText.includes("נקראו") }));
  out.lesson.viewedBeforeScroll = before;
}
await page.goto(base + "/neo/chat/", { waitUntil: "networkidle" });
out.chatStarters = await page.evaluate(() => document.querySelectorAll(".nxq-starters-row > *").length);
await page.goto(base + "/neo/ai/", { waitUntil: "networkidle" });
out.libStarters = await page.evaluate(() => document.querySelectorAll(".nxq-starters-row > *").length);
// focus mode on the ERD (re-check after the CSS fix)
await page.goto(base + "/neo/erd/", { waitUntil: "networkidle" });
await page.locator('button[aria-label^="מצב מיקוד"]').first().click();
await page.waitForTimeout(300);
out.focus = await page.evaluate(() => { const vis = (el) => !!el && getComputedStyle(el).display !== "none"; return { rail: vis(document.querySelector(".nx-rail")), top: vis(document.querySelector(".nx-topbar")), dock: vis(document.querySelector(".nxk")), exitBtn: vis(document.querySelector(".nx-focus-exit")) }; });
await page.keyboard.press("Escape"); await page.waitForTimeout(300);
out.focusAfterEsc = await page.evaluate(() => { const vis = (el) => !!el && getComputedStyle(el).display !== "none"; return { rail: vis(document.querySelector(".nx-rail")), top: vis(document.querySelector(".nx-topbar")), dock: vis(document.querySelector(".nxk")) }; });
out.consoleErrors = errs.length;
console.log(JSON.stringify(out, null, 2));
await browser.close();
const ok = out.incident.ok && Object.values(out.gates).every(Boolean) && out.academy.what && out.home.every(([, v]) => v) && out.chatStarters <= 4 && out.libStarters <= 4 && !out.focus.rail && !out.focus.top && !out.focus.dock && out.focus.exitBtn && out.focusAfterEsc.rail && out.focusAfterEsc.top && errs.length === 0;
process.exit(ok ? 0 : 1);
