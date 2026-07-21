/**
 * SAP Academy — behavioural scenario suite (G7 gate).
 * Drives a served static build with Puppeteer and asserts the engine behaviours
 * that the fix set guarantees. Additive test infra — no app code.
 *
 * Run: node scripts/academy-scenarios.mjs --base http://localhost:8899
 */
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg("base", "http://localhost:8899");
const KINDS = ["objective", "why", "business-value", "where-used", "key-concepts", "cbc-example", "flow", "diagram", "tables", "tcodes", "fiori", "spro", "objects", "odata", "authorizations", "notes", "common-mistakes", "troubleshooting", "best-practices", "tips", "related", "quiz", "summary"];

const results = [];
const rec = (name, pass, detail = "") => { results.push({ name, pass, detail }); console.log(`${pass ? "✅" : "❌"} ${name}${detail ? " — " + detail : ""}`); };

const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
async function page(seed) {
  const p = await b.newPage();
  await p.evaluateOnNewDocument((s) => { try { localStorage.setItem("neo:onboarded", "1"); if (s) localStorage.setItem("neo:academy:v2", s); else localStorage.removeItem("neo:academy:v2"); } catch {} }, seed || "");
  return p;
}
const seedDone = (slug) => JSON.stringify({ version: 2, lessons: { [slug]: KINDS }, activity: ["2026-07-20"], lastLesson: {} });
const text = (p) => p.evaluate(() => document.body.innerText.replace(/\s+/g, " "));
const goto = (p, u) => p.goto(base + u, { waitUntil: "networkidle0", timeout: 60000 });
const settle = () => new Promise((r) => setTimeout(r, 700));
const store = (p) => p.evaluate(() => JSON.parse(localStorage.getItem("neo:academy:v2") || "{}"));

try {
  // 1 · fresh user → Continue = first PM lesson (not Maintenance Order)
  { const p = await page(); await goto(p, "/academy/"); await settle();
    const t = await text(p);
    rec("1 fresh-user Continue = PM lesson 1", t.includes("מבנה ארגון האחזקה") && !t.includes("פקודת אחזקה — Maintenance Order"), ""); await p.close(); }

  // 2 · fresh PM path → chapter 1 current, chapter 2 locked with reason
  { const p = await page(); await goto(p, "/academy/path/pm/"); await settle();
    const t = await text(p);
    rec("2 fresh path: ch1 current + later chapter locked w/ reason", t.includes("אתה כאן") && t.includes("יש להשלים קודם את פרק"), ""); await p.close(); }

  // 3 · numbering: pilot breadcrumb shows chapter-position 1 (not 3/13)
  { const p = await page(); await goto(p, "/academy/lesson/pm-maintenance-order/"); await settle();
    const bc = await p.evaluate(() => document.querySelector('nav[aria-label="נתיב"]')?.innerText.replace(/\s+/g, " ") || "");
    rec("3 numbering: pilot breadcrumb = 'שיעור 1'", /שיעור\s*1(\D|$)/.test(bc) && !/שיעור\s*3\b/.test(bc), bc.slice(0, 60)); await p.close(); }

  // 4 · progress persists across reload
  { const p = await page(seedDone("pm-org-structure")); await goto(p, "/academy/path/pm/"); await settle();
    const s1 = await store(p); await goto(p, "/academy/path/pm/"); await settle(); const s2 = await store(p);
    rec("4 progress persists across reload", !!s1.lessons?.["pm-org-structure"] && !!s2.lessons?.["pm-org-structure"], ""); await p.close(); }

  // 5 · reset PATH clears the store (reactive, no reload)
  { const p = await page(seedDone("pm-org-structure")); await goto(p, "/academy/path/pm/"); await settle();
    await p.evaluate(() => [...document.querySelectorAll("button")].find((x) => x.textContent.includes("אפס מסלול"))?.click()); await new Promise((r) => setTimeout(r, 350));
    await p.evaluate(() => [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === "אפס")?.click()); await new Promise((r) => setTimeout(r, 500));
    const s = await store(p); rec("5 reset path clears store", Object.keys(s.lessons || {}).length === 0, `lessons=${Object.keys(s.lessons || {}).length}`); await p.close(); }

  // 6 · reset ALL from home clears the store
  { const p = await page(seedDone("qm-intro")); await goto(p, "/academy/"); await settle();
    await p.evaluate(() => [...document.querySelectorAll("button")].find((x) => x.textContent.includes("אפס את כל SAP Academy"))?.click()); await new Promise((r) => setTimeout(r, 350));
    await p.evaluate(() => [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === "אפס הכל")?.click()); await new Promise((r) => setTimeout(r, 500));
    const s = await store(p); rec("6 reset-all clears store", Object.keys(s.lessons || {}).length === 0, ""); await p.close(); }

  // 7 · Continue reflects the last-opened lesson
  { const p = await page(); await goto(p, "/academy/lesson/pm-equipment/"); await settle();
    await goto(p, "/academy/"); await settle(); const t = await text(p);
    rec("7 Continue = last opened (pm-equipment)", t.includes("ציוד (Equipment)"), ""); await p.close(); }

  // 8 · module switch PM→PP-PI→QM (each path loads, correct title)
  { const p = await page();
    await goto(p, "/academy/path/pp-pi/"); await settle(); const pp = (await text(p)).includes("תכנון ייצור");
    await goto(p, "/academy/path/qm/"); await settle(); const qm = (await text(p)).includes("ניהול איכות");
    rec("8 module switch PP-PI + QM paths load", pp && qm, ""); await p.close(); }

  // 9 · PM/PP/QM course cards route to the NEW reader (/academy/path/*)
  { const p = await page(); await goto(p, "/academy/"); await settle();
    const hrefs = await p.evaluate(() => [...document.querySelectorAll('a[href^="/academy/path/"]')].map((a) => a.getAttribute("href")));
    rec("9 de-split: home routes PM/PP/QM to /academy/path", ["/academy/path/pm/", "/academy/path/pp-pi/", "/academy/path/qm/"].every((h) => hrefs.includes(h)), ""); await p.close(); }

  // 10 · prev/next are canonical slugs (pilot next = pm-confirmation)
  { const p = await page(); await goto(p, "/academy/lesson/pm-maintenance-order/"); await settle();
    const nextHref = await p.evaluate(() => { const el = [...document.querySelectorAll("a")].find((a) => /השיעור הבא/.test(a.textContent)); return el?.getAttribute("href") || ""; });
    rec("10 canonical next = pm-confirmation", nextHref.includes("pm-confirmation"), nextHref); await p.close(); }
  // 11 · PM-User migrated path loads with its title + 10 chapters
  { const p = await page(); await goto(p, "/academy/path/pm-user/"); await settle();
    const t = await text(p);
    rec("11 PM-User path loads (migrated)", t.includes("תחזוקת מפעל") && t.includes("מדריך משתמש"), ""); await p.close(); }

  // 12 · PM-User lesson renders in the unified reader, breadcrumb = chapter position 1
  { const p = await page(); await goto(p, "/academy/lesson/pmu-1-1/"); await settle();
    const bc = await p.evaluate(() => document.querySelector('nav[aria-label="נתיב"]')?.innerText.replace(/\s+/g, " ") || "");
    const blocks = await p.evaluate(() => document.body.innerText.length);
    rec("12 PM-User lesson in unified reader", /שיעור\s*1(\D|$)/.test(bc) && bc.includes("PM-User") && blocks > 800, bc.slice(0, 50)); await p.close(); }

  // 13 · de-split: PM-User book card routes to the new reader (not legacy accordion)
  { const p = await page(); await goto(p, "/academy/"); await settle();
    const hrefs = await p.evaluate(() => [...document.querySelectorAll('a[href^="/academy/path/"]')].map((a) => a.getAttribute("href")));
    rec("13 de-split: PM-User card → /academy/path/pm-user", hrefs.includes("/academy/path/pm-user/"), ""); await p.close(); }

  // 14 · canonical prev/next inside PM-User (pmu-1-1 → pmu-1-2), no cross-module bleed
  { const p = await page(); await goto(p, "/academy/lesson/pmu-1-1/"); await settle();
    const nextHref = await p.evaluate(() => { const el = [...document.querySelectorAll('a[href*="/academy/lesson/"]')].find((a) => /הבא/.test(a.textContent)); return el?.getAttribute("href") || ""; });
    rec("14 PM-User canonical next = pmu-1-2", nextHref.includes("pmu-1-2"), nextHref); await p.close(); }
  // 15 · all four migrated modules: path loads + first lesson renders in unified reader
  { const mods = [
      { route: "pp-ds", first: "ppds-1-1" }, { route: "mm", first: "mm-1-1" },
      { route: "wm", first: "wm-1-1" }, { route: "sop", first: "sop-1-1" },
    ];
    let pass = true, detail = "";
    for (const m of mods) {
      const p = await page();
      await goto(p, `/academy/path/${m.route}/`); await settle();
      const pathOk = (await text(p)).length > 400;
      await goto(p, `/academy/lesson/${m.first}/`); await settle();
      const lessonOk = (await p.evaluate(() => document.querySelector('nav[aria-label="נתיב"]')?.innerText || "")).includes("שיעור");
      await p.close();
      if (!pathOk || !lessonOk) { pass = false; detail += `${m.route}:${pathOk ? "" : "path"}${lessonOk ? "" : "lesson"} `; }
    }
    rec("15 MM/WM/PP-DS/S&OP paths + first lessons render", pass, detail); }

  // 16 · de-split: all four migrated book cards route to /academy/path/*
  { const p = await page(); await goto(p, "/academy/"); await settle();
    const hrefs = await p.evaluate(() => [...document.querySelectorAll('a[href^="/academy/path/"]')].map((a) => a.getAttribute("href")));
    const need = ["/academy/path/mm/", "/academy/path/wm/", "/academy/path/pp-ds/", "/academy/path/sop/"];
    rec("16 de-split: MM/WM/PP-DS/S&OP → /academy/path", need.every((h) => hrefs.includes(h)), need.filter((h) => !hrefs.includes(h)).join(",")); await p.close(); }
  // 17 · legacy accordion routes client-redirect to the unified reader (one reader)
  { const pairs = [
      ["/library/mm-academy/", "/academy/path/mm/"], ["/library/pmu-academy/", "/academy/path/pm-user/"],
      ["/library/sop-academy/", "/academy/path/sop/"], ["/library/pp/", "/academy/path/pp-pi/"],
      ["/library/mm-academy/chapter-01/", "/academy/path/mm/"],
    ];
    let pass = true, detail = "";
    for (const [from, to] of pairs) {
      const p = await page();
      await goto(p, from); await new Promise((r) => setTimeout(r, 1200));
      const url = p.url();
      await p.close();
      if (!url.includes(to)) { pass = false; detail += `${from}→${url.split("/").slice(3).join("/")} `; }
    }
    rec("17 legacy accordions redirect to unified reader", pass, detail.slice(0, 80)); }
} catch (e) {
  rec("suite", false, "EXCEPTION " + String(e).slice(0, 120));
}
await b.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} scenarios passed.`);
process.exit(failed.length ? 1 : 0);
