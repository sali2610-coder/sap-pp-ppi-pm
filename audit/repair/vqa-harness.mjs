/* VISUAL ACCEPTANCE PASS — 21 surfaces × {desktop, mobile} × {light, dark}.
   CLIPPING is only real when the control is outside the viewport AND has no
   scrollable ancestor AND is not inside a hidden / off-canvas container.
   The first version of this probe missed that and produced 58 phantom failures. */
import puppeteer from "puppeteer-core";
import { writeFileSync } from "node:fs";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const B = process.env.BASE || "http://localhost:4173";
const TAG = process.env.TAG || "local";

const SURFACES = [
  ["home","/neo/"],["pm","/neo/pm/"],["pp-pi","/neo/pp-pi/"],["s4hana","/neo/s4hana/"],
  ["s4-readiness","/neo/s4-readiness/"],["migration-cockpit","/neo/migration-cockpit/"],
  ["erd","/neo/erd/"],["object-AUFK","/neo/object/AUFK/"],["object-EQUI","/neo/object/EQUI/"],
  ["object-IFLOT","/neo/object/IFLOT/"],["tables","/neo/tables/"],["table-detail","/neo/tables/EQUI/"],
  ["transactions","/neo/transactions/"],["tx-detail","/neo/transactions/IW31/"],
  ["books","/neo/books/"],["book-hub","/neo/books/book2/"],["reader","/neo/read/book2/"],
  ["ask-library","/neo/ai/"],["neo-ai","/neo/chat/"],["academy","/neo/academy/"],
  ["domain-model","/neo/domain-model/"],
];
/* THE USER-AGENT IS THE SHELL SWITCH, NOT THE VIEWPORT.
   lib/device.ts decides desktop/tablet/phone from the UA on purpose ("a desktop
   OS always gets the desktop UI, whatever the monitor size") — so resizing to
   390px WITHOUT changing the UA renders the DESKTOP shell at phone width and
   every "mobile" measurement is meaningless. The first run of this harness did
   exactly that and produced 42 invalid rows. */
const IPHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const VIEWS = [["desktop",1440,900,null],["mobile",390,844,IPHONE_UA]];
const THEMES = ["light","dark"];

const PROBE = () => {
  const de = document.documentElement, vw = de.clientWidth, vh = de.clientHeight;
  const inScroller = (e) => { let n = e.parentElement;
    while (n && n !== document.body) { const s = getComputedStyle(n);
      if (/auto|scroll/.test(s.overflowX) || /auto|scroll/.test(s.overflowY)) return true; n = n.parentElement; } return false; };
  const isHidden = (e) => { let n = e;
    while (n && n !== document.body) { const s = getComputedStyle(n);
      if (s.visibility === "hidden" || s.display === "none" || n.getAttribute("aria-hidden") === "true" || n.hasAttribute("inert")) return true; n = n.parentElement; } return false; };

  const ctrls = [...de.querySelectorAll("a,button,[role=button],input,select,textarea")];
  const visible = ctrls.filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !isHidden(e); });
  const clipped = visible.filter((e) => { const r = e.getBoundingClientRect();
    return (r.right > vw + 2 || r.left < -2) && !inScroller(e); });
  const tiny = visible.filter((e) => { const r = e.getBoundingClientRect(); return r.height < 32 && r.width < 32; });

  const c = document.createElement("canvas").getContext("2d");
  const lum = (css) => { c.fillStyle = "#fff"; c.fillStyle = css; const hex = c.fillStyle;
    if (!hex.startsWith("#")) return null; const n = parseInt(hex.slice(1),16);
    const f = (x) => (x <= 0.03928 ? x/12.92 : ((x+0.055)/1.055)**2.4);
    return 0.2126*f((n>>16)/255) + 0.7152*f(((n>>8)&255)/255) + 0.0722*f((n&255)/255); };
  const ratio = (a,b) => { const [x,y] = a > b ? [a,b] : [b,a]; return +(((x+0.05)/(y+0.05)).toFixed(2)); };
  const pageBg = lum(getComputedStyle(document.body).backgroundColor) ?? lum(getComputedStyle(de).backgroundColor) ?? 1;

  // contrast of the real reading text
  const texts = [...de.querySelectorAll("p,li,td,h1,h2,h3,b,span")]
    .filter((e) => { const r = e.getBoundingClientRect();
      return r.width > 30 && r.height > 8 && r.top < vh*3 && (e.textContent||"").trim().length > 12 && !isHidden(e); })
    .slice(0, 220);
  let worst = 99, lowCount = 0;
  for (const e of texts) { const fg = lum(getComputedStyle(e).color); if (fg == null) continue;
    let bgEl = e, bgL = null;
    while (bgEl && bgEl !== de) { const b = getComputedStyle(bgEl).backgroundColor;
      if (b && !/rgba\(0, 0, 0, 0\)|transparent/.test(b)) { bgL = lum(b); break; } bgEl = bgEl.parentElement; }
    const r = ratio(fg, bgL ?? pageBg);
    if (r < worst) worst = r;
    if (r < 4.5) lowCount++; }

  const sticky = [...de.querySelectorAll("*")].filter((e) => { const s = getComputedStyle(e);
    return (s.position === "sticky" || s.position === "fixed") && e.getBoundingClientRect().height > 24; }).length;

  return {
    overflowX: de.scrollWidth - de.clientWidth,
    pageHeight: de.scrollHeight, scrollable: de.scrollHeight > vh + 4,
    theme: de.getAttribute("data-theme"), dir: de.getAttribute("dir"),
    pageBgLum: pageBg == null ? null : +pageBg.toFixed(3),
    controls: visible.length, clipped: clipped.length,
    clippedSample: clipped.slice(0,3).map((e)=>`${e.tagName}.${(e.className||"").toString().slice(0,30)}`),
    tinyTargets: tiny.length,
    sticky, activeMarkers: de.querySelectorAll('[aria-current],[data-on="1"],[data-active="1"],.is-active').length,
    textsChecked: texts.length, worstContrast: worst === 99 ? null : worst, lowContrast: lowCount,
    h1: (de.querySelector("h1")?.textContent || "").trim().slice(0,64),
    hebrew: /[֐-׿]/.test(document.body.innerText),
    latinLeak: /(TODO|Lorem|undefined|NaN|\[object)/.test(document.body.innerText),
    emDash: (document.body.innerText.match(/—/g) || []).length,
  };
};

const br = await puppeteer.launch({ executablePath: CH, headless: "new", args: ["--no-sandbox"] });
const rows = [];
for (const [vname,w,h,ua] of VIEWS) for (const theme of THEMES) {
  const p = await br.newPage();
  if (ua) await p.setUserAgent(ua);
  await p.setViewport({ width: w, height: h, isMobile: vname === "mobile", hasTouch: vname === "mobile", deviceScaleFactor: vname === "mobile" ? 3 : 1 });
  const errs = [];
  p.on("console",(m)=>{ if (m.type()==="error") errs.push(m.text().slice(0,140)); });
  p.on("pageerror",(e)=>errs.push(String(e).slice(0,140)));
  for (const [name,url] of SURFACES) {
    errs.length = 0;
    await p.goto(B+"/neo/", { waitUntil:"domcontentloaded", timeout:60000 });
    await p.evaluate((t)=>{ try{ localStorage.setItem("neo:onboarded","1"); localStorage.setItem("neo:theme",t);}catch{} }, theme);
    await p.goto(B+url, { waitUntil:"networkidle0", timeout:90000 });
    await new Promise((r)=>setTimeout(r,300));
    // full-page scroll exercise
    await p.evaluate(()=>window.scrollTo(0, document.documentElement.scrollHeight));
    await new Promise((r)=>setTimeout(r,250));
    const bottom = await p.evaluate(()=>({ y: Math.round(window.scrollY), ox: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
    await p.evaluate(()=>window.scrollTo(0,0));
    await new Promise((r)=>setTimeout(r,200));
    const m = await p.evaluate(PROBE);
    m.deviceClass = await p.evaluate(() => document.documentElement.getAttribute("data-device"));
    rows.push({ surface:name, url, view:vname, theme, ...m, scrolledTo:bottom.y, overflowAtBottom:bottom.ox, consoleErrors:errs.length, errSample:errs[0]||"" });
  }
  await p.close();
}
await br.close();
writeFileSync(`/Users/salihalif/Desktop/My-Projects/sap-kb3/audit/repair/vqa-${TAG}.json`, JSON.stringify(rows,null,1));
const fail = (r) => r.overflowX>2 || r.overflowAtBottom>2 || r.consoleErrors>0 || r.clipped>0 || !r.hebrew || r.dir!=="rtl" || r.latinLeak || !r.h1;
const bad = rows.filter(fail);
console.log(`rows=${rows.length}  FAILURES=${bad.length}`);
for (const r of bad) console.log(` ✗ ${r.surface} ${r.view}/${r.theme} ovf=${r.overflowX}/${r.overflowAtBottom} err=${r.consoleErrors} clip=${r.clipped} ${r.clippedSample.join(",")} he=${r.hebrew} h1="${r.h1}" ${r.errSample}`);
console.log("\n-- theme applied correctly --");
console.log(" light rows with data-theme=light:", rows.filter(r=>r.theme==="light"&&r.theme===r.themeAttr||r.theme==="light").length, "| dark:", rows.filter(r=>r.theme==="dark").length);
const dark = rows.filter(r=>r.theme==="dark"), light = rows.filter(r=>r.theme==="light");
console.log(" mean page bg luminance  light:", (light.reduce((a,r)=>a+(r.pageBgLum??0),0)/light.length).toFixed(3), " dark:", (dark.reduce((a,r)=>a+(r.pageBgLum??0),0)/dark.length).toFixed(3));
console.log(" worst contrast overall:", Math.min(...rows.map(r=>r.worstContrast??99)));
console.log(" rows with any text <4.5:1:", rows.filter(r=>r.lowContrast>0).length, "/", rows.length);
console.log(" em-dashes in visible Hebrew UI:", rows.reduce((a,r)=>a+r.emDash,0));
console.log(" surfaces w/ sticky chrome:", rows.filter(r=>r.sticky>0).length, "/", rows.length);
const wrongShell = rows.filter(r => (r.view==="mobile") !== (r.deviceClass!=="desktop"));
console.log(" rows whose shell matches the viewport:", rows.length - wrongShell.length, "/", rows.length);
console.log(" surfaces w/ active markers:", rows.filter(r=>r.activeMarkers>0).length, "/", rows.length);
