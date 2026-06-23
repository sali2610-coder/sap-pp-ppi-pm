// Canonical dataset builder — bakes the curated fixes (titles / tcodes / fiori /
// EN names) into public/sap-infrastructure/dataset.json AND merges the HR and BW
// extension modules, so the graph + global search read ONE trusted source with
// no runtime patching. Run: node scripts/build-dataset.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DS = path.join(ROOT, "public", "sap-infrastructure", "dataset.json");
const j = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

const TITLE = j("data/table-titles.json");
const TCODE = j("data/table-tcodes.json");
const FIORI = j("data/table-fiori.json");
const EN = j("data/table-en.json");
const { HR_TABLES, HR_ACCENT } = await import("../data/hr-module.ts");
const { BW_TABLES, BW_ACCENT } = await import("../data/bw-module.ts");

const d = JSON.parse(fs.readFileSync(DS, "utf8"));

// 1) bake fixes into existing tables (only where empty / curated title)
for (const t of d.tables) {
  if (TITLE[t.name]) t.he = TITLE[t.name];
  if (!t.tcodes && TCODE[t.name]) t.tcodes = TCODE[t.name];
  if (!t.fiori && FIORI[t.name]) t.fiori = FIORI[t.name];
  if (!t.en && EN[t.name]) t.en = EN[t.name];
}

// 2) merge HR + BW (map extension shape → canonical dataset table shape)
const toDsTable = (t) => ({
  name: t.name, mod: t.mod, real: !!t.real, en: t.en || "", he: t.he || "",
  tcodes: t.tcodes || "", fiori: t.fiori || "", s4: t.s4 || "", s4alt: t.s4alt || "",
  pk: t.pk || [], fields: t.fields || [], funcs: t.funcs || [], cds: t.cds || [],
  topic: t.zone || "", topicIdx: 0, rel: t.rel || [], degree: t.degree || (t.rel?.length || 0),
  inDegree: (t.rel || []).filter((r) => r.role === "child").length,
  outDegree: (t.rel || []).filter((r) => r.role === "parent").length,
  density: 0, isHub: (t.degree || 0) >= 5, zone: t.zone || "",
  landscape: t.landscape, guideHe: t.guideHe,
});
const existing = new Set(d.tables.map((t) => t.name));
let added = 0;
for (const t of [...HR_TABLES, ...BW_TABLES]) { if (!existing.has(t.name)) { d.tables.push(toDsTable(t)); added++; } }

d.palette = { ...d.palette, HR: HR_ACCENT, BW: BW_ACCENT };
d.meta = d.meta || {}; d.meta.counts = d.meta.counts || {};
d.meta.counts.tables = d.tables.length;
d.meta.counts.modules = new Set(d.tables.map((t) => t.mod)).size;

fs.writeFileSync(DS, JSON.stringify(d), "utf8");
const outDir = path.join(ROOT, "out", "sap-infrastructure");
if (fs.existsSync(outDir)) fs.writeFileSync(path.join(outDir, "dataset.json"), JSON.stringify(d), "utf8");

console.log(`✓ dataset.json rebuilt — ${d.tables.length} tables (+${added} HR/BW), modules: ${d.meta.counts.modules}`);
const byMod = {}; d.tables.forEach((t) => (byMod[t.mod] = (byMod[t.mod] || 0) + 1));
console.log("  per module:", JSON.stringify(byMod));
