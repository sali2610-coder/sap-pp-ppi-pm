// Design audit S7-AI-5 · the AI surfaces' states, driven by CONTROLLED
// responses: every /api/*-stream call is intercepted in the browser and
// answered by this script, so no model is called and no key is needed. The
// wire format mirrors lib/ai/stream.ts (server-sent events: meta, delta,
// status, done) and lib/ai/client.ts (non-stream JSON errors). Each scenario
// runs in a fresh browser context, so no stored conversation leaks into it.
//
// Scenarios on /neo/ai/ (library) and /neo/chat/ (general), 1363 and 390:
//   unavailable   503 {"error":"AI_UNAVAILABLE"}      -> failure card, retry
//   generic       500 {"error":"X"}                   -> failure card, retry
//   incomplete    meta + delta, no `done`             -> failure card with the
//                                                        "retrieval done" note
//   empty         done with an empty answer           -> what the UI shows
//   long          done with a 3,000-character answer  -> answer, no overflow
//   citations     done with two sources               -> source cards
//   usage         the meta line after a done          -> passages / time printed
//   busy + stop   a stream that never ends, then Stop -> busy composer, then a
//                                                        stopped note and retry
//   retry         failure, then a good answer         -> answer replaces it
// Prints JSON; exits 1 on a failed expectation or a console error.
//   NEO_BASE=http://localhost:4195 SHOTS=<dir> node scripts/qa/ai-states-check.mjs
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
const base = process.env.NEO_BASE || "http://localhost:4195";
const SHOTS = process.env.SHOTS || ""; if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const PHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const MSG = { unavailable: "שירות ה-AI אינו זמין כרגע", generic: "אירעה שגיאה זמנית" };
const sse = (events) => events.map(([e, d]) => `event: ${e}\ndata: ${JSON.stringify(d)}\n\n`).join("");
const LONG = Array.from({ length: 40 }, (_, i) => `פסקה ${i + 1}: הודעת אחזקה (Maintenance Notification) נפתחת ב-IW21 ומתועדת בטבלאות QMEL ו-QMIH; הפקודה שנוצרת ממנה נשמרת ב-AUFK ו-AFIH. `).join("\n\n");
const SOURCES = [
  { id: "book1#1#1.1", book: "book1", chapter: 1, section: "1.1", title: "A Possible Process for Your Plant Maintenance Project", quote: "Plant Maintenance", cited: true },
  { id: "book9#3#3.2", book: "book9", chapter: 3, section: "3.2", title: "Maintenance Notifications", quote: "notification", cited: true },
];
const R = {
  unavailable: { status: 503, contentType: "application/json", body: JSON.stringify({ error: "AI_UNAVAILABLE" }) },
  generic: { status: 500, contentType: "application/json", body: JSON.stringify({ error: "X" }) },
  incomplete: { status: 200, contentType: "text/event-stream", body: sse([["meta", { books: 7 }], ["delta", { text: "התחלה של תשובה " }]]) },
  empty: { status: 200, contentType: "text/event-stream", body: sse([["meta", { books: 3 }], ["done", { answer: "", policy: "FULL", sources: [], ms: 900, model: "mock" }]]) },
  long: { status: 200, contentType: "text/event-stream", body: sse([["meta", { books: 5 }], ["delta", { text: LONG.slice(0, 200) }], ["status", { stage: "validating" }], ["done", { answer: LONG, policy: "FULL", sources: SOURCES.slice(0, 1), ms: 4200, model: "mock" }]]) },
  citations: { status: 200, contentType: "text/event-stream", body: sse([["meta", { books: 2 }], ["done", { answer: "הודעת אחזקה נפתחת ב-IW21 [1] ומתועדת ב-QMEL [2].", policy: "FULL", sources: SOURCES, ms: 1500, model: "mock" }]]) },
  good: { status: 200, contentType: "text/event-stream", body: sse([["meta", { books: 2 }], ["done", { answer: "תשובה תקינה אחרי ניסיון חוזר.", policy: "FULL", sources: SOURCES.slice(0, 1), ms: 1100, model: "mock" }]]) },
  hang: { status: 200, contentType: "text/event-stream", body: sse([["meta", { books: 4 }], ["delta", { text: "כתיבה… " }]]), hang: true },
};
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const out = []; let fails = 0;

/** One scenario in one fresh context. `responses` is the sequence of replies
 *  the intercepted endpoint gives, one per call. */
async function scenario(kind, opts, surface, url, name, responses, act, expect) {
  const ctx = await browser.newContext(opts); const page = await ctx.newPage();
  // A 5xx reply logs "Failed to load resource" in the console by itself; that
  // is the scenario, not a defect, so it is counted apart from real errors.
  const errs = []; const netErrs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => { if (m.type() !== "error") return; const t = m.text(); (/Failed to load resource/.test(t) ? netErrs : errs).push(t); });
  let call = 0;
  await page.route("**/api/*-stream", async (route) => {
    const r = responses[Math.min(call++, responses.length - 1)];
    if (r.hang) {
      // A body that is never completed: fulfil with a stream whose end never
      // comes by holding the request until the reader presses Stop.
      await new Promise((resolve) => { page.once("close", resolve); setTimeout(resolve, 20000); });
      return route.abort().catch(() => {});
    }
    await route.fulfill({ status: r.status, contentType: r.contentType, body: r.body });
  });
  await page.goto(base + url, { waitUntil: "networkidle" }); await page.waitForTimeout(300);
  const ask = async (q) => { const ta = page.locator("textarea").first(); await ta.fill(q); await ta.press("Enter"); await page.waitForTimeout(1000); };
  const read = () => page.evaluate(() => {
    const turns = document.querySelectorAll(".nxq-turn"); const t = turns[turns.length - 1] || document;
    const q = (s) => t.querySelector(s);
    return {
      turns: turns.length,
      fail: q(".nxq-fail-m")?.textContent?.trim() || null,
      failNote: q(".nxq-fail-s")?.textContent?.trim() || null,
      retry: !!q(".nxq-acts button"),
      answer: (q(".nxq-answer")?.textContent || "").trim().length,
      empty: q(".nxq-empty")?.textContent?.trim() || null,
      sources: document.querySelectorAll(".nxq-src").length,
      sourcesInTurn: t.querySelectorAll(".nxq-src").length,
      answerText: (q(".nxq-answer")?.textContent || "").trim().slice(0, 80),
      meta: q(".nxq-meta")?.textContent?.trim() || null,
      stopped: q(".nxq-note-plain")?.textContent?.trim() || null,
      busy: document.querySelector(".nxq-box")?.getAttribute("data-busy"),
      stopBtn: !!document.querySelector('button[aria-label="עצירת התשובה"]'),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  let m;
  try { m = await act({ page, ask, read }); } catch (e) { m = { error: String(e.message).slice(0, 160) }; }
  const ok = !m.error && expect(m) && errs.length === 0;
  if (!ok) fails++;
  out.push({ kind, surface, scenario: name, ok, ...m, consoleErrors: errs.length, errs: errs.slice(0, 2), expectedNetworkErrors: netErrs.length });
  console.log(`${ok ? "OK  " : "FAIL"} ${kind} ${surface} ${name}: ${JSON.stringify(m).slice(0, 170)}`);
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/ai-${surface}-${kind}-${name}.png` }).catch(() => {});
  await ctx.close();
}

for (const [kind, opts] of [["desktop", { viewport: { width: 1363, height: 936 } }], ["phone", { viewport: { width: 390, height: 844 }, userAgent: PHONE_UA, isMobile: true, hasTouch: true }]]) {
  for (const [surface, url] of [["library", "/neo/ai/"], ["general", "/neo/chat/"]]) {
    if (kind === "phone" && surface === "general") continue; // one phone pass proves the layout; the state code is shared
    const S = (name, responses, act, expect) => scenario(kind, opts, surface, url, name, responses, act, expect);
    await S("unavailable", [R.unavailable], async ({ ask, read }) => { await ask("שאלה"); return read(); }, (m) => (m.fail || "").includes(MSG.unavailable) && m.retry);
    await S("generic", [R.generic], async ({ ask, read }) => { await ask("שאלה"); return read(); }, (m) => (m.fail || "").includes(MSG.generic) && m.retry);
    await S("incomplete", [R.incomplete], async ({ ask, read, page }) => { await ask("שאלה"); await page.waitForTimeout(500); return read(); }, (m) => !!m.fail && /קטעים/.test(m.failNote || "") && m.retry);
    await S("empty", [R.empty], async ({ ask, read }) => { await ask("שאלה"); return read(); }, (m) => m.turns === 1 && !!m.empty && /לא התקבלה תשובה/.test(m.empty));
    await S("long", [R.long], async ({ ask, read, page }) => { await ask("שאלה"); await page.waitForTimeout(800); return read(); }, (m) => m.answer > 2500 && m.overflow <= 2 && !m.fail);
    await S("citations", [R.citations], async ({ ask, read, page }) => {
      await ask("שאלה"); await page.waitForTimeout(500);
      // The source cards sit behind the "N מקורות" disclosure under the answer.
      await page.locator(".nxq-sources-top").last().click().catch(() => {}); await page.waitForTimeout(300);
      const m = await read(); m.inlineCites = await page.evaluate(() => document.querySelectorAll(".nxq-answer sup, .nxq-answer [data-cite], .nxq-answer button[aria-label*='מקור']").length); return m;
    }, (m) => m.sources === 2 && m.answer > 0);
    await S("usage", [R.citations], async ({ ask, read, page }) => { await ask("שאלה"); await page.waitForTimeout(500); return read(); }, (m) => !!m.meta);
    await S("busy-stop", [R.hang], async ({ ask, read, page }) => {
      await ask("שאלה"); await page.waitForTimeout(400); const during = await read();
      await page.locator('button[aria-label="עצירת התשובה"]').click(); await page.waitForTimeout(800); const after = await read();
      return { during: { busy: during.busy, stopBtn: during.stopBtn }, stopped: after.stopped, retry: after.retry, busyAfter: after.busy };
    }, (m) => m.during.busy === "1" && m.during.stopBtn && !!m.stopped && m.retry && m.busyAfter === "0");
    await S("retry", [R.generic, R.good], async ({ ask, read, page }) => {
      await ask("שאלה"); const before = await read();
      await page.locator(".nxq-acts button").first().click(); await page.waitForTimeout(1000); const after = await read();
      return { failBefore: !!before.fail, answerAfter: after.answer, failAfter: after.fail };
    }, (m) => m.failBefore && m.answerAfter > 0 && !m.failAfter);
  }
}
await browser.close();
console.log(JSON.stringify({ base, checkedAt: new Date().toISOString(), fails, results: out }, null, 2));
process.exit(fails ? 1 : 0);
