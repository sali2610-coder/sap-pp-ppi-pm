// ===== Project NEO Cockpit — xlsx blueprint extraction =====
// Parses the two definitive migration workbooks in docs/ and regenerates a
// fully-typed data/sapData.ts. Deterministic, lossless: every field, key,
// BAPI/IDoc, S/4 note, Fiori app and ER parent-child relation is imported.
//
// Run: node scripts/extract-xlsx.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs");

const PM_FILE = path.join(DOCS, "SAP_PM_ECC6_to_S4_Migration.xlsx");
const PPPI_FILE = path.join(DOCS, "SAP_PPPI_ECC6_to_S4_Migration.xlsx");

// Curated BUSINESS-PURPOSE titles. The workbook title column holds the key-field
// label (e.g. MARA/MARC/MBEW all "מספר חומר"), which is educationally confusing.
// Override with the real business purpose where curated; else fall back to source.
const TITLE_HE = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "table-titles.json"), "utf8"));
const titleFor = (table, fallback) => TITLE_HE[table] || fallback;
// Curated real-SAP T-Codes per table — fills tcodes ONLY where the workbook left it empty.
const TCODES = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "table-tcodes.json"), "utf8"));
// Curated Fiori apps (PP-PI sheet has none) + English names (PM separator gaps), filled only when empty.
const FIORI = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "table-fiori.json"), "utf8"));
const EN_NAME = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "table-en.json"), "utf8"));
// Primary-key corrections — promote these fields to PK where the workbook missed composite/empty keys (standard SAP DDIC).
const PK_FIX = {
  AFKO: ["AUFPL"], MARC: ["MATNR", "WERKS"], MARD: ["MATNR", "WERKS", "LGORT"], JEST: ["OBJNR", "STAT"],
  AFPO: ["AUFNR", "POSNR"], AFVC: ["AUFPL", "APLZL"], PLPO: ["PLNTY", "PLNNR", "PLNKN"], MAPL: ["MATNR", "PLNTY", "PLNNR", "PLNAL"],
};

// ---------- brand neutralisation ----------
//
// Commit ea212c0b ("purge all CBC/company branding from the production website")
// removed every customer/company reference from everything that ships, and
// replaced it with neutral manufacturing vocabulary. The SAP teaching content
// was preserved word for word; only the company name changed.
//
// That edit was made DIRECTLY IN THE GENERATED FILE, because the workbooks in
// docs/ still say "CBC". So the purge survived only until the next
// `node scripts/extract-xlsx.mjs`, which silently reinstated the branding —
// exactly what happened during this repair pass, and it is why the rules live
// here now instead of in a commit. Regeneration is idempotent again.
//
// Order matters: the specific phrases must run before the generic particles,
// or "CBC (Coca-Cola)" would be half-replaced by the "ב-CBC" rule.
const BRAND = [
  [/CBC\s*\(Coca-Cola\)/g, "הארגון (Example Product)"],
  [/הערת CBC/g, "הערת יישום"],
  [/במפעל CBC הספציפי/g, "במפעל לדוגמה הספציפי"],
  [/ב-CBC/g, "בארגון"],
  [/ל-CBC/g, "לארגון"],
  [/של CBC/g, "של הארגון"],
  [/מוצר CBC/g, "מוצר הארגון"],
  [/לתהליכי CBC/g, "לתהליכי הארגון"],
  [/CBC:/g, "הארגון:"],
];
// Anything the rules above did not catch must stop the build rather than ship.
// A new workbook phrasing is a content decision, not something a regex should
// guess at.
const BRAND_GUARD = /CBC|Coca[- ]?Cola|Central Bottling/i;

function neutralise(s) {
  let out = s;
  for (const [re, to] of BRAND) out = out.replace(re, to);
  if (BRAND_GUARD.test(out)) {
    throw new Error(
      `Brand reference survived neutralisation — add a rule to BRAND in scripts/extract-xlsx.mjs:\n  ${out.slice(0, 240)}`,
    );
  }
  return out;
}

const S = (v) => (v == null ? "" : neutralise(String(v).trim()));
const TYPE_RE = /^(CHAR|NUMC|DEC|QUAN|UNIT|DATS|TIMS|LANG|CURR|CUKY|INT[1248]|RAW|RAWSTRING|CLNT|FLTP|STRG|SSTR|D16R|DF16|DF34|NUMC)$/i;
const KEY_SET = new Set(["PK", "FK", "PK/FK", "-"]);

// Split a multi-line bulleted cell into clean items.
function bullets(cell) {
  return S(cell)
    .split(/\n/)
    .map((l) => l.replace(/^\s*[•·▪◦*\-–]\s*/, "").trim())
    .filter(Boolean);
}
// Zip a names column with a descriptions column into [name, desc] pairs.
function zipPairs(namesCell, descCell) {
  const names = bullets(namesCell);
  const descs = bullets(descCell);
  return names.map((n, i) => [n, descs[i] ?? ""]);
}

const rowsOf = (ws) => XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
const topicSheets = (wb) => wb.SheetNames.filter((n) => /^\d+\./.test(n));

// Generic sheet → {title, headers, rows} (header at row index 1, data after).
function sheetTable(wb, name, title) {
  const ws = wb.Sheets[name];
  if (!ws) return undefined;
  const rows = rowsOf(ws);
  const headerRow = rows[1] ?? [];
  let lastCol = 0;
  headerRow.forEach((c, i) => {
    if (S(c)) lastCol = i;
  });
  const headers = headerRow.slice(0, lastCol + 1).map(S);
  const data = rows
    .slice(2)
    .map((r) => r.slice(0, lastCol + 1).map(S))
    .filter((r) => r.some((c) => c));
  return { title, headers, rows: data };
}

// ---------- PM workbook: ◆ separator + field grid ----------
function parsePM(wb) {
  const topics = [];
  for (const sn of topicSheets(wb)) {
    const idx = Number(sn.match(/^(\d+)\./)[1]);
    const title = sn;
    const rows = rowsOf(wb.Sheets[sn]);
    const tables = [];
    let cur = null;

    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      const c0 = S(r[0]);

      // separator: "◆ טבלה NAME  -  he  (En)"
      if (c0.includes("◆") && /טבלה/.test(c0)) {
        const m = c0.match(/טבלה\s+([^\s]+)\s*[-–]\s*(.+?)\s*\(([^)]*)\)\s*$/);
        const name = m ? m[1] : (c0.match(/טבלה\s+([^\s]+)/)?.[1] ?? "");
        cur = {
          tableName: name,
          descriptionHe: titleFor(name, m ? m[2].trim() : ""),
          descriptionEn: m ? m[3].trim() : "",
          tcodes: "",
          fioriApp: "",
          s4Note: "",
          s4AltTable: "",
          s4AltTcode: "",
          sumNote: "",
          guideHe: "",
          funcs: [],
          progs: [],
          fields: [],
        };
        tables.push(cur);
        continue;
      }

      const tech = S(r[3]);
      const key = S(r[6]);
      const isField = tech && /^[A-Z0-9_/]+$/.test(tech) && (KEY_SET.has(key) || key === "");
      if (!isField || !cur) continue;

      // table-level attrs live on the first field row (merged cells elsewhere)
      if (cur.fields.length === 0) {
        cur.tcodes = S(r[1]);
        if (!cur.tableName) cur.tableName = S(r[2]);
        cur.funcs = zipPairs(r[7], r[8]);
        cur.progs = zipPairs(r[9], r[10]);
        cur.s4Note = S(r[11]);
        cur.s4AltTable = S(r[12]);
        cur.s4AltTcode = S(r[13]);
        cur.fioriApp = S(r[14]);
        cur.sumNote = S(r[15]);
      }
      cur.fields.push({ tech, en: S(r[4]), he: S(r[5]), dt: "", len: "", key: key || "-" });
    }

    topics.push({ idx, title, tables });
  }
  return topics;
}

// ---------- PP-PI workbook: table-name col + field grid + sub-blocks ----------
function parsePPPI(wb) {
  const topics = [];
  for (const sn of topicSheets(wb)) {
    const idx = Number(sn.match(/^(\d+)\./)[1]);
    const rows = rowsOf(wb.Sheets[sn]);
    const tables = [];
    let cur = null;
    let pendingFuncs = [];
    let pendingFiori = [];

    const SKIP_LABELS = new Set(["Name", "S/4HANA Fiori App", "תיאור ומטרה / Usage"]);

    for (let i = 2; i < rows.length; i++) {
      const r = rows[i];
      const table = S(r[1]);
      const field = S(r[2]);
      const type = S(r[3]);
      const len = S(r[4]);
      const key = S(r[5]);

      const isField = field && TYPE_RE.test(type) && KEY_SET.has(key);

      // Fiori sub-block: col3 = app name, col8 = Fiori ID  (precedes its table)
      const fioriId = S(r[7]);
      if (!isField && S(r[2]) && !type && fioriId && S(r[2]) !== "S/4HANA Fiori App" && !table) {
        // (rare path) skip
      }
      if (!isField && type && /Fiori|Manage|Configure|Create|Confirm|Maintain|Mass|Master|Order|Process/.test(type) && fioriId) {
        const lbl = type + (fioriId && fioriId !== "-" ? ` (${fioriId})` : "");
        if (type !== "S/4HANA Fiori App") pendingFiori.push(lbl);
        continue;
      }

      if (isField && table) {
        // new table — flush pending sub-blocks into it
        cur = {
          tableName: table,
          descriptionHe: titleFor(table, S(r[7]) || table),
          descriptionEn: S(r[6]),
          tcodes: "",
          fioriApp: pendingFiori.join("; "),
          s4Note: S(r[12]),
          guideHe: S(r[11]),
          helpLbl: S(r[13]),
          sqlJoinSnippet: S(r[10]),
          funcs: pendingFuncs.length ? pendingFuncs : bullets(r[8]).map((n) => [n, ""]),
          progs: bullets(r[9]).map((n) => [n, ""]),
          fields: [],
        };
        tables.push(cur);
        pendingFuncs = [];
        pendingFiori = [];
        cur.fields.push({ tech: field, en: S(r[6]), he: S(r[7]), dt: type, len, key });
        continue;
      }

      if (isField && cur) {
        cur.fields.push({ tech: field, en: S(r[6]), he: S(r[7]), dt: type, len, key });
        continue;
      }

      // BAPI / IDoc sub-block: name in col2, Hebrew desc in col6 (incl Zetes/Daymax)
      const subName = S(r[2]);
      const subDesc = S(r[6]);
      if (subName && !type && !key && subDesc && !SKIP_LABELS.has(subName)) {
        pendingFuncs.push([subName, subDesc]);
      }
    }

    topics.push({ idx, title: sn, tables });
  }
  return topics;
}

// ---------- ER / Join Map ----------
function parsePMRelations(wb) {
  const rows = rowsOf(wb.Sheets["ER - Join Map"]).slice(2);
  const rels = [];
  for (const r of rows) {
    const child = S(r[1]);
    if (!child) continue;
    rels.push({
      child,
      fkField: S(r[2]),
      parent: S(r[4]),
      pkField: S(r[5]),
      card: S(r[6]),
      join: S(r[7]),
      desc: S(r[8]),
    });
  }
  return rels;
}
// The PP-PI workbook has no child/parent COLUMNS — it has one column headed
// "טבלה (Child)" and one holding the whole JOIN statement.
//
// THE BUG THIS REPLACES, AND WHY IT WAS INVISIBLE
//
//   The old parser took the child from column 1 and the parent from the first
//   `JOIN <table>` token. That is correct for 51 of the 65 rows. In the other
//   14 the workbook author put the OTHER table in column 1 — every one of them
//   a customizing / check table (T006 TC60 TCA01 CRFH T134 T023 T399X TCK03
//   T438M T003O TJ30 BUT000 TC22 TJ02T), i.e. the row is ABOUT the check table
//   and the JOIN names the table that references it. For those rows column 1
//   and the JOIN token are the same string, so the parser produced
//   parent === child, `attachRelations` then dropped the parent-side view, and
//   14 real, documented relationships rendered nowhere in either site.
//
//   It was invisible because a self-referencing relation is LEGITIMATE — the PM
//   workbook has a real one (IFLOT.TPLMA → IFLOT.TPLNR, the functional-location
//   hierarchy) — so nothing downstream could tell a true self-loop from this.
//
// THE FIX: read BOTH sides from the JOIN statement, which is unambiguous SQL.
//   FROM <A> JOIN <B> ON <A>.f = <B>.g   ⇒   A references B   ⇒   A is the
//   child, B is the parent. That is exactly the convention the 51 correct rows
//   already follow, so applying it uniformly changes none of them and repairs
//   all 14. Verified against the workbook: 65/65 rows match the pattern, 51 have
//   column 1 == FROM and 14 have column 1 == JOIN, and none is "neither".
//
// Column 1 is kept only as a CROSS-CHECK. If a row ever stops matching the
// pattern the extraction fails loudly rather than silently emitting a self-loop.
const FROM_JOIN_RE = /\bFROM\s+([A-Z0-9_/]+)\s+JOIN\s+([A-Z0-9_/]+)/i;

function parsePPPIRelations(wb) {
  const rows = rowsOf(wb.Sheets["ER - Join Map"]).slice(2);
  const rels = [];
  const unparsed = [];
  for (const r of rows) {
    const labelled = S(r[1]);
    const join = S(r[2]);
    if (!labelled) continue;

    const m = join.match(FROM_JOIN_RE);
    if (!m) { unparsed.push(`${labelled} :: ${join}`); continue; }

    const child = m[1].toUpperCase();
    const parent = m[2].toUpperCase();
    // The row must be about one of the two tables it joins. Anything else means
    // the sheet changed shape and the assumption above no longer holds.
    const up = labelled.toUpperCase();
    if (up !== child && up !== parent) unparsed.push(`${labelled} :: ${join}`);

    rels.push({ child, fkField: "", parent, pkField: "", card: "", join, desc: S(r[3]) });
  }
  if (unparsed.length) {
    throw new Error(
      `PP-PI "ER - Join Map": ${unparsed.length} row(s) do not match "FROM <A> JOIN <B>" or name a third table.\n` +
      `Parent/child direction cannot be derived safely — fix the workbook or this parser.\n  ${unparsed.join("\n  ")}`,
    );
  }
  return rels;
}

// Attach relations to their tables (as parent and/or child views).
function attachRelations(topics, rels) {
  const byName = new Map();
  for (const t of topics) for (const tb of t.tables) byName.set(tb.tableName, tb);
  for (const tb of byName.values()) tb.relations = [];
  for (const rel of rels) {
    const childT = byName.get(rel.child);
    const parentT = byName.get(rel.parent);
    if (childT)
      childT.relations.push({ role: "child", table: rel.parent || rel.child, fkField: rel.fkField, pkField: rel.pkField, card: rel.card, join: rel.join, desc: rel.desc });
    // A GENUINE self-relation keeps exactly one entry. The PM workbook has one
    // — IFLOT.TPLMA → IFLOT.TPLNR, the functional-location hierarchy — and
    // pushing a second, "parent"-role copy onto the same table would render the
    // same edge twice. The `!== rel.child` guard is therefore deliberate and
    // stays; what changed is that PP-PI no longer produces FALSE self-relations
    // for it to swallow (see parsePPPIRelations).
    if (parentT && rel.parent && rel.parent !== rel.child)
      parentT.relations.push({ role: "parent", table: rel.child, fkField: rel.fkField, pkField: rel.pkField, card: rel.card, join: rel.join, desc: rel.desc });
  }
}

// ---------- assemble a module ----------
function buildModule(module, title, topics, rels, extras) {
  attachRelations(topics, rels);

  // stable ids, default status, fill missing optionals
  const seen = new Map();
  for (const t of topics) {
    for (const tb of t.tables) {
      const base = `${module}:${tb.tableName}`;
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      tb.id = n === 0 ? base : `${base}#${t.idx}`;
      tb.module = module;
      tb.topicIdx = t.idx;
      tb.topicTitle = t.title;
      tb.tcodes = tb.tcodes || TCODES[tb.tableName] || "";
      tb.fioriApp = tb.fioriApp || FIORI[tb.tableName] || "";
      tb.descriptionEn = tb.descriptionEn || EN_NAME[tb.tableName] || "";
      if (PK_FIX[tb.tableName] && Array.isArray(tb.fields)) {
        const pk = new Set(PK_FIX[tb.tableName]);
        tb.fields.forEach((f) => { if (pk.has(f.tech)) f.key = "PK"; });
      }
      tb.sqlJoinSnippet = tb.sqlJoinSnippet ?? "";
      tb.guideHe = tb.guideHe ?? "";
      tb.s4Note = tb.s4Note ?? "";
      tb.relations = tb.relations ?? [];
      tb.migrationStatus = "Not started";
    }
  }

  const joins = rels
    .filter((r) => r.join)
    .map((r) => ({ table: r.child, join: r.join, he: r.desc }));

  return {
    module,
    title,
    topics: topics.map((t) => ({ idx: t.idx, module, title: t.title, tables: t.tables, ops: { tcodes: [], interfaces: [] } })),
    relations: rels.flatMap((r) => {
      const out = [{ role: "child", table: r.parent || r.child, fkField: r.fkField, pkField: r.pkField, card: r.card, join: r.join, desc: r.desc }];
      return out;
    }),
    joins,
    statuses: ["Not started", "In analysis", "In conversion", "Tested", "Done"],
    ...extras,
  };
}

// ===== run =====
const pmWb = XLSX.readFile(PM_FILE);
const ppWb = XLSX.readFile(PPPI_FILE);

const PM = buildModule("PM", "SAP PM Hub", parsePM(pmWb), parsePMRelations(pmWb), {
  simplification: sheetTable(pmWb, "Simplification Item list", "Simplification Item List · SAP Notes"),
  config: sheetTable(pmWb, "Config Guide", "Config Guide · מדריך קונפיגורציה (SPRO)"),
  customCode: sheetTable(pmWb, "Custom Code Check", "Custom Code Check · User Exits / BAdIs"),
});

const PPPI = buildModule("PP-PI", "SAP PP-PI Hub", parsePPPI(ppWb), parsePPPIRelations(ppWb), {
  tcodesDir: sheetTable(ppWb, "PP_PPPI_Tcodes", "מדריך טרנזקציות ודוחות ייצור"),
  tools: sheetTable(ppWb, "SAP_Maint_Tools", "ערכת כלי המיישם וה-Basis"),
  ppvs: sheetTable(ppWb, "PP מול PP-PI", "PP (בדיד) מול PP-PI (תהליכי)"),
});

// ---------- assertions ----------
function count(mod) {
  const tables = mod.topics.reduce((n, t) => n + t.tables.length, 0);
  const fields = mod.topics.reduce((n, t) => n + t.tables.reduce((m, tb) => m + tb.fields.length, 0), 0);
  return { tables, fields };
}
const cPM = count(PM);
const cPP = count(PPPI);
if (cPP.tables !== 68) throw new Error(`PP-PI tables ${cPP.tables} !== 68`);
if (cPM.tables !== 58) throw new Error(`PM tables ${cPM.tables} !== 58`);

// ---------- emit ----------
const banner = `// ===== AUTO-GENERATED by scripts/extract-xlsx.mjs — DO NOT EDIT BY HAND =====
// Source of truth: docs/SAP_PM_ECC6_to_S4_Migration.xlsx,
//                  docs/SAP_PPPI_ECC6_to_S4_Migration.xlsx
// Real CBC PM + PP-PI migration blueprints ported verbatim (zero truncation):
// fields, keys, BAPIs/IDocs (incl Zetes/Daymax), S/4 notes, Fiori apps,
// and the full ER parent-child relation map.
import type { SAPModuleData, SAPTable } from "@/lib/types";
`;

// Per-module files so a module page (e.g. /pm) bundles ONLY its own data
// instead of the full ~500KB dataset. The barrel re-exports for code that
// genuinely needs both (cross-module search, ERD, object intelligence).
const pmBanner = `// ===== AUTO-GENERATED by scripts/extract-xlsx.mjs — DO NOT EDIT BY HAND =====
import type { SAPModuleData } from "@/lib/types";
`;
fs.writeFileSync(path.join(ROOT, "data", "sapData.pm.ts"),
  `${pmBanner}\nexport const PM_DATA = ${JSON.stringify(PM, null, 2)} as SAPModuleData;\n`, "utf8");
fs.writeFileSync(path.join(ROOT, "data", "sapData.pppi.ts"),
  `${pmBanner}\nexport const PPPI_DATA = ${JSON.stringify(PPPI, null, 2)} as SAPModuleData;\n`, "utf8");

const out = `${banner}import { PM_DATA } from "@/data/sapData.pm";
import { PPPI_DATA } from "@/data/sapData.pppi";

export { PM_DATA, PPPI_DATA };

export const MODULES: SAPModuleData[] = [PM_DATA, PPPI_DATA];

/** Flattened table list across both modules — feeds the Omni-Search index. */
export const ALL_TABLES: SAPTable[] = MODULES.flatMap((m) =>
  m.topics.flatMap((t) => t.tables),
);
`;

fs.writeFileSync(path.join(ROOT, "data", "sapData.ts"), out, "utf8");

const relCount = (m) => m.topics.reduce((n, t) => n + t.tables.reduce((a, tb) => a + tb.relations.length, 0), 0);
console.log("✓ data/sapData.ts regenerated from xlsx blueprints");
console.log(`  PM   : ${cPM.tables} tables · ${cPM.fields} fields · ${relCount(PM)} relations`);
console.log(`  PP-PI: ${cPP.tables} tables · ${cPP.fields} fields · ${relCount(PPPI)} relations`);
