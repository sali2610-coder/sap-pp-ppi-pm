// Builds the scope tree the AI workspace navigates.
//
// Reads data/books/*.json — the canonical spine — plus the prose shards, and
// NOT the raw index files.
//
// That change is the whole point. The previous version re-derived titles with:
//
//     t: String(e.he || e.titleHe || "").trim() || String(e.title || ...)
//
// In ten of the eleven books `he` is a BOOLEAN meaning "a Hebrew translation
// exists", not a heading. String(true) is "true", which is truthy, so it won the
// fallback chain and became the title: 4,043 of 4,314 section titles in the
// shipped tree were the literal string "true".
//
// The spine already resolves that correctly, and the reader, the search index
// and this tree now all descend from it — so a title cannot differ between
// surfaces, which was the second half of the same bug.
//
// Output: data/ai-tree/<bookId>.json + index.json
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BOOKS = path.join(ROOT, "data", "books");
const SHARDS = path.join(ROOT, "public", "books");
const OUT = path.join(ROOT, "data", "ai-tree");
mkdirSync(OUT, { recursive: true });

if (!existsSync(BOOKS)) {
  console.error("data/books missing — run `node scripts/migrate-books.mjs` first");
  process.exit(1);
}

/** Words per minute for Hebrew technical prose. Deliberately conservative. */
const WPM = 180;

/**
 * A title must be a heading, not a flag. Anything that stringifies a boolean —
 * or is merely the section number — is treated as absent so the caller falls
 * back. This is the guard the old generator lacked.
 */
const BAD_TITLE = /^(true|false|null|undefined|\d+(\.\d+)*)$/i;
const cleanTitle = (v) => {
  const t = String(v ?? "").trim();
  return t && !BAD_TITLE.test(t) ? t : "";
};

/** Identifier shapes, matched against body text to count real SAP objects. */
const TCODE = /\b[A-Z]{2}\d{2}[A-Z0-9]?\b|\b(?:SPRO|MIGO|MMBE|COGI|SE16N|SU53|ST22|PFCG|SUIM|BD87|WE02|WE20|OB52|MMPV|COHV|BMBC)\b/g;
const OBJECT = /\b(?:BAPI|FM)_[A-Z0-9_]{3,}\b/g;

/** Fenced blocks we render as diagrams, so a chapter can advertise them. */
const DIAGRAM_FENCE = /```\s*(?:mermaid|flowchart|graph|diagram|process|timeline|gantt|swimlane|bpmn|sequence)\b/gi;
const MD_TABLE = /^\s*\|.+\|\s*$/gm;
const ABAP_HINT = /\b(?:REPORT|DATA:|SELECT\s+\*|LOOP\s+AT|ENDLOOP|CALL\s+FUNCTION|PERFORM)\b/;
const IMG_PATH = /\bSPRO\b|נתיב\s*IMG|IMG\s*[:→-]/i;
const FIORI_HINT = /\bF\d{3,4}\b|Fiori/i;
const FIGURE_HINT = /\bFigure\s*\d|איור\s*\d/i;

const count = (s, re) => (String(s || "").match(re) || []).length;

/** Everything a node can advertise before it is opened. */
function analyse(text) {
  const t = String(text || "");
  const tcodes = new Set(t.match(TCODE) || []);
  const objects = new Set(t.match(OBJECT) || []);
  return {
    words: t.split(/\s+/).filter(Boolean).length,
    diagrams: count(t, DIAGRAM_FENCE),
    // Presence, not row count: "this section contains a table" is the useful
    // signal in a nav tree; the exact number is noise.
    tables: MD_TABLE.test(t) ? 1 : 0,
    tcodes: tcodes.size,
    objects: objects.size,
    abap: ABAP_HINT.test(t) ? 1 : 0,
    config: IMG_PATH.test(t) ? 1 : 0,
    fiori: FIORI_HINT.test(t) ? 1 : 0,
    figures: FIGURE_HINT.test(t) ? 1 : 0,
  };
}

const ZERO = { words: 0, diagrams: 0, tables: 0, tcodes: 0, objects: 0, abap: 0, config: 0, fiori: 0, figures: 0 };
const add = (a, b) => Object.fromEntries(Object.keys(ZERO).map((k) => [k, a[k] + b[k]]));

/** Flattens an academy body's facets and refs into one searchable string. */
function bodyText(body) {
  if (!body) return "";
  if (body.format === "academy") {
    const facets = Object.values(body.facets ?? {})
      .map((v) => (Array.isArray(v) ? v.join(" ") : String(v ?? ""))).join(" ");
    const refs = Object.values(body.refs ?? {})
      .map((v) => (Array.isArray(v) ? v.join(" ") : String(v ?? ""))).join(" ");
    return `${facets} ${refs} ${body.snippet ?? ""}`;
  }
  return `${body.he ?? ""} ${body.en ?? ""} ${body.snippet ?? ""}`;
}


/**
 * Nests sections by their dotted id: 1.1 owns 1.1.1 and 1.1.2.
 *
 * The ids already encode the hierarchy the books use — 854 sections sit at two
 * levels and 1,771 at three — so the tree was flattening a structure that was
 * there all along. A catalogue like book7 uses app codes (F1234) with no dots
 * and simply comes back flat, which is correct for it.
 *
 * A child whose parent is missing is attached at the top rather than dropped:
 * losing a section from navigation is worse than showing it one level too high.
 */
function nest(sections) {
  const byId = new Map(sections.map((s) => [s.id, { ...s, children: [] }]));
  const roots = [];
  for (const s of sections) {
    const node = byId.get(s.id);
    const parentId = String(s.id).includes(".") ? String(s.id).replace(/\.[^.]+$/, "") : null;
    const parent = parentId ? byId.get(parentId) : null;
    if (parent && parent !== node) parent.children.push(node);
    else roots.push(node);
  }
  // Drop empty arrays so the shipped JSON stays small — 4,314 of them adds up.
  const prune = (n) => {
    if (!n.children.length) delete n.children;
    else n.children.forEach(prune);
    return n;
  };
  return roots.map(prune);
}

const files = readdirSync(BOOKS).filter((f) => f.endsWith(".json")).sort();
const index = [];
let rejected = 0;

for (const file of files) {
  const id = file.replace(/\.json$/, "");
  const book = JSON.parse(readFileSync(path.join(BOOKS, file), "utf8"));

  const prose = new Map();
  const sdir = path.join(SHARDS, id);
  if (existsSync(sdir)) {
    for (const f of readdirSync(sdir).filter((x) => x.startsWith("ch"))) {
      const o = JSON.parse(readFileSync(path.join(sdir, f), "utf8"));
      for (const [sid, b] of Object.entries(o)) prose.set(sid, b);
    }
  }

  const chapters = book.chapters.map((c) => {
    let stats = { ...ZERO };

    const sections = c.sections.map((s) => {
      const he = cleanTitle(s.title?.he);
      const en = cleanTitle(s.title?.en);
      if (!he && String(s.title?.he ?? "").trim()) rejected++;
      // Hebrew heading, else English, else the id — which at least navigates.
      // Never a boolean.
      const t = he || en || String(s.id);

      const st = analyse(bodyText(prose.get(s.id)));
      stats = add(stats, st);

      return {
        id: String(s.id), t, en: en || t,
        ...(s.page != null ? { p: Number(s.page) } : {}),
        m: { w: st.words, d: st.diagrams, tb: st.tables, tc: st.tcodes, o: st.objects,
             ab: st.abap, cf: st.config, fi: st.fiori, fg: st.figures },
      };
    });

    return {
      n: Number(c.n),
      t: cleanTitle(c.title?.he) || cleanTitle(c.title?.en) || `פרק ${c.n}`,
      // Nested view of the same sections. The flat list stays, because scope
      // and citations address a section by id and must not care about depth.
      nodes: nest(sections),
      ...(c.startPage != null ? { p: Number(c.startPage) } : {}),
      m: { w: stats.words, d: stats.diagrams, tb: stats.tables, tc: stats.tcodes,
           o: stats.objects, ab: stats.abap, cf: stats.config, fi: stats.fiori,
           fg: stats.figures, min: Math.max(1, Math.round(stats.words / WPM)) },
      sections,
    };
  });

  const title = cleanTitle(book.meta?.title?.he) || cleanTitle(book.meta?.title?.en) || id;
  writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify({ id, title, chapters }));

  const sections = chapters.reduce((n, c) => n + c.sections.length, 0);
  const words = chapters.reduce((n, c) => n + c.m.w, 0);
  index.push({
    id, title,
    module: book.meta?.module ?? "SAP",
    chapters: chapters.length,
    sections,
    hebrew: chapters.some((c) => c.sections.some((s) => /[֐-׿]/.test(s.t))),
    minutes: Math.max(1, Math.round(words / WPM)),
  });
}

writeFileSync(path.join(OUT, "index.json"), JSON.stringify({ books: index }));

console.log(`\nAI TREE  ->  data/ai-tree/`);
for (const b of index) {
  console.log(`  ${b.id.padEnd(7)} ${String(b.chapters).padStart(2)}ch ${String(b.sections).padStart(4)}sec  ${b.hebrew ? "he" : "EN"}  ~${b.minutes}min  ${b.title.slice(0, 40)}`);
}
console.log(`\n  ${index.length} books · ${index.reduce((n, b) => n + b.sections, 0)} sections`);
if (rejected) console.log(`  ${rejected} non-heading titles rejected (booleans/ids) and replaced`);
