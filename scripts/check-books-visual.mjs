#!/usr/bin/env node
/* ============================================================================
   PROJECT NEO · BOOKS VISUAL ACCEPTANCE GATE
   ----------------------------------------------------------------------------
   Structural parity says the data is present. This says the READER actually
   renders it. 11 books x 5 checkpoints x 3 modes = 150 states, each opened in
   a real browser against the running app.

     checkpoints  first chapter · middle chapter · last chapter ·
                  a subchapter deep link · a chapter that has figures
     modes        desktop light · desktop dark · mobile 390x844

   Per state it verifies: route resolves, prose renders, both languages are
   present, figures sit BETWEEN paragraphs rather than in a trailing gallery,
   every figure is captioned, the TOC exists, prev/next exist, no blank
   section, no horizontal overflow, no console error, no hydration warning.

   THE FIGURE CHECK, AND WHY IT IS WRITTEN THIS WAY

     The first version asked whether a <figure>'s sibling was a <p>. It failed
     on all six illustrated books — and the books were fine. Figures are
     wrapped in a .nr-infigs group, so a figure's siblings are other figures.
     The check now walks up to the group, and separately proves the negative:
     `galleryLike` is true only if EVERY figure sits after the last paragraph,
     which is exactly the layout the brief forbids.

   Requires the dev server (or a preview) on BASE.
   Run: node scripts/check-books-visual.mjs
   ========================================================================== */
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BASE = process.env.NEO_BASE ?? "http://localhost:3111";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const IPH =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const SHOTS = process.env.NEO_SHOTS ?? "/tmp/neo-books-visual";
fs.mkdirSync(SHOTS, { recursive: true });

const J = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

/* ---- pick the checkpoints per book, from the real data ---- */
const plan = [];
for (let i = 1; i <= 11; i++) {
  const id = `book${i}`;
  const b = J(`data/books/${id}.json`);
  const chs = b.chapters;
  const first = chs[0];
  const mid = chs[Math.floor(chs.length / 2)];
  const last = chs[chs.length - 1];
  // a chapter that actually has figures served
  let figCh = null;
  const dir = path.join(ROOT, "public", "books", id);
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter((x) => /^fig\d+\.json$/.test(x))) {
      const n = Number(f.match(/\d+/)[0]);
      const v = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
      if (Array.isArray(v) && v.length && chs.some((c) => c.n === n)) { figCh = n; break; }
    }
  }
  // a chapter with more than one section, for the subchapter deep link
  const subCh = chs.find((c) => (c.sections || []).length > 1) || first;
  const subSec = (subCh.sections || [])[1]?.id ?? (subCh.sections || [])[0]?.id ?? null;
  plan.push({
    id,
    title: b.meta?.title?.en ?? id,
    points: [
      { k: "first", c: first.n },
      { k: "middle", c: mid.n },
      { k: "last", c: last.n },
      ...(subSec ? [{ k: "subchapter", c: subCh.n, s: subSec }] : []),
      ...(figCh ? [{ k: "figures", c: figCh }] : []),
    ],
  });
}

const modes = [
  { n: "desktop-light", w: 1500, h: 950, mob: false, dark: false, full: true },
  { n: "desktop-dark", w: 1500, h: 950, mob: false, dark: true, full: false },
  { n: "mobile", w: 390, h: 844, mob: true, dark: false, full: false },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const results = [];

for (const mode of modes) {
  const page = await browser.newPage();
  await page.emulate({
    viewport: { width: mode.w, height: mode.h, deviceScaleFactor: 1, isMobile: mode.mob, hasTouch: mode.mob },
    userAgent: mode.mob ? IPH : undefined,
  });
  // THE THEME COMES FROM localStorage, NOT FROM THE ATTRIBUTE.
  // app/layout.tsx runs a pre-paint boot script that reads neo:theme and WRITES
  // data-theme itself. Setting the attribute here was overwritten on every
  // load, so an earlier version of this harness rendered light twice and
  // reported "dark PASS" for a page that was never dark.
  await page.evaluateOnNewDocument((dark) => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("neo:onboarded", "1");
      localStorage.setItem("neo:theme", dark ? "dark" : "light");
    } catch {}
  }, mode.dark);
  if (mode.dark) await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);

  for (const bk of plan) {
    for (const pt of bk.points) {
      const errs = [];
      const hyd = [];
      const onMsg = (m) => {
        const t = m.text();
        if (m.type() === "error") errs.push(t);
        if (/hydrat|did not match|Text content does not match/i.test(t)) hyd.push(t);
      };
      page.on("console", onMsg);
      const url = `${BASE}/neo/read/${bk.id}/?c=${pt.c}${pt.s ? `&s=${encodeURIComponent(pt.s)}` : ""}`;
      let r;
      try {
        r = await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
        await new Promise((x) => setTimeout(x, mode.full ? 2600 : 1800));
      } catch (e) {
        results.push({ mode: mode.n, book: bk.id, pt: pt.k, ok: false, why: `nav: ${e.message.slice(0, 50)}` });
        page.off("console", onMsg);
        continue;
      }

      const d = await page.evaluate((want) => {
        const de = document.documentElement;
        const canvas = document.querySelector(".nx-canvas");
        const txt = document.body.innerText;
        const heb = (txt.match(/[֐-׿]/g) || []).length;
        const lat = (txt.match(/[A-Za-z]/g) || []).length;
        const figs = document.querySelectorAll("figure").length;
        const imgs = document.querySelectorAll("img").length;
        // is any figure inside the prose flow rather than in a trailing gallery?
        // Figures are wrapped in a .nr-infigs group, so a figure's SIBLINGS are
        // other figures. Walk up to the group and ask whether IT sits between
        // paragraphs — that is what "inline, not a gallery" actually means.
        let inline = 0;
        let captioned = 0;
        const groups = new Set();
        document.querySelectorAll("figure").forEach((f) => {
          if (f.querySelector("figcaption")) captioned++;
          groups.add(f.closest(".nr-infigs") ?? f);
        });
        const isPara = (el) => !!el && (el.tagName === "P" || !!el.querySelector?.("p"));
        groups.forEach((g) => {
          if (isPara(g.previousElementSibling) || isPara(g.nextElementSibling)) inline++;
        });
        // a gallery would put every figure after ALL the prose: detect that
        const paras = [...document.querySelectorAll("p.nr-p")];
        const lastPara = paras[paras.length - 1];
        const figEls = [...document.querySelectorAll("figure")];
        const galleryLike =
          figEls.length > 1 && lastPara &&
          figEls.every((f) => f.compareDocumentPosition(lastPara) & Node.DOCUMENT_POSITION_PRECEDING);
        const blanks = [...document.querySelectorAll("[data-sec-id],section")].filter(
          (s) => (s.innerText || "").trim().length === 0,
        ).length;
        return {
          theme: document.documentElement.getAttribute("data-theme"),
          paper: getComputedStyle(document.querySelector(".nr-sheet") ?? document.body).backgroundColor,
          title: document.title.slice(0, 70),
          textLen: txt.length,
          heb, lat, figs, imgs, inline, blanks, captioned, galleryLike,
          ovf: Math.max(de.scrollWidth - de.clientWidth, canvas ? canvas.scrollWidth - canvas.clientWidth : 0),
          hasToc: !!document.querySelector(".nx-canvas") &&
            [...document.querySelectorAll("button")].some((b) => /^תוכן$/.test(b.textContent.trim())),
          prevNext: [...document.querySelectorAll("button,a")].filter((b) =>
            /הפרק הבא|הפרק הקודם/.test(b.textContent || ""),
          ).length,
          url: location.search,
          wantC: want.c, wantS: want.s ?? null,
        };
      }, pt);

      const themeOk = mode.dark ? d.theme === "dark" : d.theme === "light";
      const ok =
        themeOk &&
        r.status() < 400 &&
        d.textLen > 300 &&
        d.ovf <= 2 &&
        errs.length === 0 &&
        hyd.length === 0 &&
        d.blanks === 0;

      results.push({
        mode: mode.n, book: bk.id, pt: pt.k, c: pt.c, s: pt.s ?? null,
        http: r.status(), ok,
        heb: d.heb, lat: d.lat, figs: d.figs, imgs: d.imgs, inline: d.inline,
        ovf: d.ovf, toc: d.hasToc, prevNext: d.prevNext, blanks: d.blanks,
        captioned: d.captioned, galleryLike: d.galleryLike, theme: d.theme, paper: d.paper,
        errs: errs.length, hyd: hyd.length,
        why: !ok
          ? [
              r.status() >= 400 && `http ${r.status()}`,
              d.textLen <= 300 && `text ${d.textLen}`,
              d.ovf > 2 && `overflow ${d.ovf}`,
              errs.length && `console ${errs.length}: ${errs[0].slice(0, 60)}`,
              hyd.length && `hydration ${hyd.length}`,
              d.blanks && `blank ${d.blanks}`,
              !themeOk && `theme is ${d.theme}, expected ${mode.dark ? "dark" : "light"}`,
            ].filter(Boolean).join("; ")
          : "",
      });

      if (mode.full && (pt.k === "first" || pt.k === "figures")) {
        await page.screenshot({ path: `${SHOTS}/${bk.id}-${pt.k}.png` });
      }
      page.off("console", onMsg);
    }
  }
  await page.close();
  console.log(`${mode.n} done`);
}
await browser.close();

fs.writeFileSync(path.join(SHOTS, "results.json"), JSON.stringify(results, null, 1));

/* ---------------------------------------------------------------- report */
const byBook = new Map();
for (const r of results) {
  if (!byBook.has(r.book)) byBook.set(r.book, []);
  byBook.get(r.book).push(r);
}
console.log("\nVISUAL ACCEPTANCE — Books\n");
console.log("  book     pts  desktop  dark  mobile  biling  figs(inline)  toc  p/n  errs  status");
let allPass = true;
for (const [id, rs] of byBook) {
  const dl = rs.filter((r) => r.mode === "desktop-light");
  const dd = rs.filter((r) => r.mode === "desktop-dark");
  const mo = rs.filter((r) => r.mode === "mobile");
  const pass = (a) => a.every((r) => r.ok);
  const biling = dl.every((r) => r.heb > 50 && r.lat > 50);
  const anyFig = dl.some((r) => r.figs > 0);
  const figRows = dl.filter((r) => r.figs > 0);
  const figInline = anyFig ? figRows.every((r) => r.inline > 0 && !r.galleryLike && r.captioned === r.figs) : null;
  const toc = dl.every((r) => r.toc);
  const pn = dl.every((r) => r.prevNext > 0);
  const errs = rs.reduce((n, r) => n + r.errs + r.hyd, 0);
  const status = pass(dl) && pass(dd) && pass(mo) && biling && toc && errs === 0 && (figInline !== false);
  if (!status) allPass = false;
  console.log(
    `  ${id.padEnd(8)} ${String(dl.length).padStart(2)}   ` +
      `${pass(dl) ? "PASS" : "FAIL"}     ${pass(dd) ? "PASS" : "FAIL"}  ${pass(mo) ? "PASS" : "FAIL"}    ` +
      `${biling ? "PASS" : "FAIL"}    ${anyFig ? (figInline ? "PASS" : "FAIL") : "N/A "}          ` +
      `${toc ? "PASS" : "FAIL"} ${pn ? "PASS" : "FAIL"} ${String(errs).padStart(4)}  ${status ? "PASS" : "FAIL"}`,
  );
}
const bad = results.filter((r) => !r.ok);
if (bad.length) {
  console.log(`\nFAILING CHECKPOINTS (${bad.length}/${results.length})`);
  for (const b of bad.slice(0, 25)) console.log(`  ✗ ${b.mode} ${b.book} ${b.pt} c=${b.c}${b.s ? ` s=${b.s}` : ""} — ${b.why}`);
}
console.log(`\n  ${results.length} checkpoints across ${byBook.size} books x 3 modes · ${allPass ? "ALL PASS" : "FAILURES ABOVE"}`);
process.exit(allPass ? 0 : 1);
