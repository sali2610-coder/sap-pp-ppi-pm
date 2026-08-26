import puppeteer from "puppeteer-core";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const B = "http://localhost:4173";
const SHOTS = [
  ["neo-domain-model", "/neo/domain-model/"],
  ["neo-domain-pm-equipment", "/neo/domain/pm-equipment/"],
  ["neo-domain-thin-record", "/neo/domain/pppi-planning/"],
  ["neo-s4hana", "/neo/s4hana/"],
  ["neo-s4-readiness", "/neo/s4-readiness/"],
  ["neo-migration-cockpit", "/neo/migration-cockpit/"],
  ["neo-object-PA0000-hrbw", "/neo/object/PA0000/"],
  ["neo-object-VEKP-verified", "/neo/object/VEKP/"],
  ["neo-object-AUFK-depth", "/neo/object/AUFK/"],
  ["neo-object-IFLOT-hierarchy", "/neo/object/IFLOT/"],
];
const br = await puppeteer.launch({ executablePath: CH, headless: "new", args: ["--no-sandbox"] });
const p = await br.newPage();
await p.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
const errs = [];
p.on("console", (m) => { if (m.type() === "error") errs.push(`${p.url()} :: ${m.text().slice(0, 140)}`); });
p.on("pageerror", (e) => errs.push(`${p.url()} :: ${String(e).slice(0, 140)}`));
for (const [name, url] of SHOTS) {
  await p.goto(B + url, { waitUntil: "networkidle0", timeout: 60000 });
  await p.evaluate(() => { try { localStorage.setItem("neo:onboarded", "1"); } catch {} });
  await p.goto(B + url, { waitUntil: "networkidle0", timeout: 60000 });
  const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await p.screenshot({ path: `audit/repair/shots/${name}.png`, fullPage: false });
  console.log(`${over === 0 ? "OK " : "OVERFLOW+" + over} ${name}  ${url}`);
}
console.log("\nconsole errors:", errs.length);
for (const e of errs.slice(0, 8)) console.log("  " + e);
await br.close();
