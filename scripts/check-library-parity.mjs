#!/usr/bin/env node
/* ============================================================================
   PROJECT NEO · LIBRARY PARITY GATE
   ----------------------------------------------------------------------------
   Compares the VALIDATED SOURCE against what the application actually serves,
   for all 11 books, and fails when content went missing between them.

     source  data/library/book{N}-full.json      spine + prose
             data/library/book{N}/raw/ch*.json   raw chapter text
             data/library/book{N}-figures.json   figures, keyed by chapter
     active  data/books/book{N}.json             spine the app reads
             public/books/book{N}/ch*.json       prose shards
             public/books/book{N}/fig*.json      figure metadata

   WHY A SCRIPT AND NOT A ONE-OFF REPORT

     A chapter went missing once already — book7 ch12 — and nothing noticed,
     because every surface counted the same wrong number confidently. A number
     that is only checked by hand is a number that drifts. This runs in CI.

   WHAT COUNTS AS A FAILURE VS A RECORDED FACT

     FAIL      the active representation has FEWER chapters, sections or
               figures than the source. That is content loss.
     VERIFIED  the source genuinely has none of something (book7 has no
               figures at all). Recorded, not hidden.
     NOTE      a difference that is explained and intentional — e.g. sections
               recovered from raw text that the index never had, so active
               legitimately exceeds the index.

   Run: node scripts/check-library-parity.mjs
   Exit 0 when every book passes; 1 on any content loss.
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LIB = path.join(ROOT, "data", "library");
const BOOKS = path.join(ROOT, "data", "books");
const SHARDS = path.join(ROOT, "public", "books");

const readJSON = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);
const ids = Array.from({ length: 11 }, (_, i) => `book${i + 1}`);

const rows = [];
const failures = [];
const notes = [];

for (const id of ids) {
  const full = readJSON(path.join(LIB, `${id}-full.json`));
  const active = readJSON(path.join(BOOKS, `${id}.json`));
  if (!full || !active) {
    failures.push(`${id}: missing ${!full ? "source" : "active"} file`);
    continue;
  }

  /* ---- chapters. The source truth is the union of -full.json and raw/. ---- */
  const srcChNums = new Set((full.chapters ?? []).map((c) => Number(c.n)).filter(Number.isFinite));
  const rawDir = path.join(LIB, id, "raw");
  if (fs.existsSync(rawDir)) {
    for (const f of fs.readdirSync(rawDir).filter((x) => /^ch\d+\.json$/.test(x))) {
      const n = Number(readJSON(path.join(rawDir, f))?.n);
      if (Number.isFinite(n)) srcChNums.add(n);
    }
  }
  const actChNums = new Set((active.chapters ?? []).map((c) => Number(c.n)));
  const missingCh = [...srcChNums].filter((n) => !actChNums.has(n)).sort((a, b) => a - b);
  const extraCh = [...actChNums].filter((n) => !srcChNums.has(n)).sort((a, b) => a - b);

  /* ---- sections ---- */
  const srcSec = new Set();
  for (const c of full.chapters ?? []) for (const s of c.sections ?? []) if (s?.id) srcSec.add(String(s.id));
  const actSec = new Set();
  for (const c of active.chapters ?? []) for (const s of c.sections ?? []) if (s?.id) actSec.add(String(s.id));
  const missingSec = [...srcSec].filter((x) => !actSec.has(x));
  const extraSec = [...actSec].filter((x) => !srcSec.has(x));

  /* ---- prose: does every active section actually have a body served? ---- */
  let withEn = 0;
  let withHe = 0;
  let bodied = 0;
  for (const c of active.chapters ?? []) {
    const shard = readJSON(path.join(SHARDS, id, `ch${c.n}.json`)) ?? {};
    for (const s of c.sections ?? []) {
      const b = shard[String(s.id)];
      if (!b) continue;
      bodied++;
      // FORMAT-AWARE. Two body shapes exist and only one has en/he:
      //   prose    { en, he }            ten books
      //   academy  { facets, refs }      book8 — the consultant edition, whose
      //            content is Hebrew inside facets (exec/beginner/consultant/…)
      // Measuring `he` on an academy body reports 0% and looks like total
      // content loss on the richest book in the library. It is not: the field
      // simply does not exist in that schema.
      if (b.format === "academy") {
        const f = b.facets ?? {};
        const any = Object.values(f).some((v) =>
          typeof v === "string" ? v.trim() : Array.isArray(v) ? v.length : v != null,
        );
        if (any) withHe++;            // academy facets are Hebrew
      } else {
        if (String(b.en ?? "").trim()) withEn++;
        if (String(b.he ?? "").trim()) withHe++;
      }
    }
  }

  /* ---- figures ---- */
  const figSrc = readJSON(path.join(LIB, `${id}-figures.json`));
  const srcFig = figSrc
    ? Object.values(figSrc).reduce((n, v) => n + (Array.isArray(v) ? v.length : 0), 0)
    : 0;
  let actFig = 0;
  const shardDir = path.join(SHARDS, id);
  if (fs.existsSync(shardDir)) {
    for (const f of fs.readdirSync(shardDir).filter((x) => /^fig\d+\.json$/.test(x))) {
      const v = readJSON(path.join(shardDir, f));
      actFig += Array.isArray(v) ? v.length : 0;
    }
  }

  /* ---- verdict ---- */
  let status = "PASS";
  if (missingCh.length) {
    status = "FAIL";
    failures.push(`${id}: chapters missing from the app: ${missingCh.join(", ")}`);
  }
  if (missingSec.length) {
    status = "FAIL";
    failures.push(`${id}: ${missingSec.length} sections missing (e.g. ${missingSec.slice(0, 5).join(", ")})`);
  }
  if (actFig < srcFig) {
    status = "FAIL";
    failures.push(`${id}: ${srcFig - actFig} figures missing (${srcFig} in source, ${actFig} served)`);
  }
  if (status === "PASS" && srcFig === 0 && actFig === 0) status = "PASS · no figures";
  if (extraSec.length) {
    notes.push(`${id}: ${extraSec.length} section(s) served that the index never had — ${extraSec.slice(0, 4).join(", ")} (recovered from raw text)`);
  }

  rows.push({
    id,
    srcCh: srcChNums.size,
    actCh: actChNums.size,
    srcSec: srcSec.size,
    actSec: actSec.size,
    bodied,
    withEn,
    withHe,
    srcFig,
    actFig,
    status,
  });
}

/* ------------------------------------------------------------- the matrix */

console.log("PROJECT NEO · library parity — validated source vs what the app serves\n");
console.log(
  "  book    ch src/app   sections src/app   bodies  EN     HE*    figures src/app   status",
);
for (const r of rows) {
  console.log(
    `  ${r.id.padEnd(7)} ${String(r.srcCh).padStart(3)}/${String(r.actCh).padEnd(5)} ` +
      `${String(r.srcSec).padStart(7)}/${String(r.actSec).padEnd(9)} ` +
      `${String(r.bodied).padStart(5)}  ${String(r.withEn).padStart(5)}  ${String(r.withHe).padStart(5)}  ` +
      `${String(r.srcFig).padStart(8)}/${String(r.actFig).padEnd(8)} ${r.status}`,
  );
}
const t = rows.reduce(
  (a, r) => ({
    srcCh: a.srcCh + r.srcCh, actCh: a.actCh + r.actCh,
    srcSec: a.srcSec + r.srcSec, actSec: a.actSec + r.actSec,
    withEn: a.withEn + r.withEn, withHe: a.withHe + r.withHe,
    srcFig: a.srcFig + r.srcFig, actFig: a.actFig + r.actFig,
  }),
  { srcCh: 0, actCh: 0, srcSec: 0, actSec: 0, withEn: 0, withHe: 0, srcFig: 0, actFig: 0 },
);
console.log(
  `\n  TOTAL   ${t.srcCh}/${t.actCh} chapters · ${t.srcSec}/${t.actSec} sections · ` +
    `EN ${t.withEn} · HE ${t.withHe} · figures ${t.srcFig}/${t.actFig}`,
);

notes.push("HE* counts Hebrew bodies. For book8 (format: academy) that is its facets — exec/beginner/consultant/… — not an `he` field, which its schema does not have.");
if (notes.length) console.log("\nNOTES\n" + notes.map((n) => `  · ${n}`).join("\n"));

if (failures.length) {
  console.log("\nFAILURES\n" + failures.map((f) => `  ✗ ${f}`).join("\n"));
  process.exit(1);
}
console.log("\n  OK — no chapter, section or figure is missing from the application.\n");
