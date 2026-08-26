/* ============================================================================
   CONCEPT D · "SAP by Sali NEO"  ·  the converged direction
   ---------------------------------------------------------------------------
   70% Concept A  · precision, hairlines, density, flat surfaces, tabular mono
   20% Concept C  · one sovereign command surface that the page responds to
   10% Concept B  · shared-element (FLIP) module entry

   TWO PERSONALITIES, ONE PRODUCT
     EXPERIENCE MODE · home, navigation, universe, ERD, library entry.
                       Editorial type register, L2/L3 motion, spatial moves.
     WORK MODE       · tables, T-codes, objects, BAPIs, detail pages.
                       Product type register (<= 20px body, 64px cap), L1 only.

   100% offline. No CDN, no webfont, no remote asset. Icons via icon() only.
   Every SAP string comes from ../shared/*. Nothing about SAP is invented here.
   ========================================================================== */

import { NEO } from '../shared/content.js';
import { DISCOVERY } from '../shared/discovery.js';
import { UNIVERSE } from '../shared/universe.js';
import { MODULE_ID } from '../shared/modules.js';
import { GRAPH } from '../shared/graph.js';
import { OBJ_TYPES } from '../shared/viz.js';
import { icon } from '../shared/icons.js';

/* ------------------------------------------------------------------ utils */
const $ = (r, s) => r.querySelector(s);
const $$ = (r, s) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g,
  (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nf = (v) => Number(v).toLocaleString('en-US');
const uniq = (a) => Array.from(new Set(a));

/* A hidden tab never fires requestAnimationFrame, and a prototype that is
   reviewed in a background tab or a headless browser must still land in the
   right state. Same timing when visible, a real fallback when not. */
const raf = (fn) => (document.hidden ? setTimeout(fn, 16) : requestAnimationFrame(fn));
const raf2 = (fn) => raf(() => raf(fn));

/* ------------------------------------------------- module identity (HUE) */
/* Rule from shared/module-tokens.css: saturation = signal (status),
   hue = identity (module). --status-* is never used for module identity. */
const MODKEY = {
  'PM': 'pm', 'PP-PI': 'pppi', 'PP': 'pp', 'PP/DS': 'ppds', 'MM': 'mm',
  'QM': 'qm', 'EWM': 'ewm', 'Fiori': 'fiori', 'S&OP': 'sop',
  'S/4': 's4', 'S/4HANA': 's4',
};
const modVar = (code) => `var(--mod-${MODKEY[code] || 's4'})`;
const modHe = (code) => (MODULE_ID[code] || MODULE_ID[code === 'S/4HANA' ? 'S/4' : 'S/4'] || { he: '' }).he;

const mchip = (code, cls = '') => `<span class="mchip ${cls}" style="--m:${modVar(code)}"><i aria-hidden="true"></i>${esc(code)}</span>`;
const mchips = (codes, cls = '') => codes.map((c) => mchip(c, cls)).join('');

/* --------------------------------------------------------------- dataset */
const PM = NEO.modules[0];
const PP = NEO.modules[1];
const TABLES = DISCOVERY.tables;                       // 105 merged tables
const TABLE = new Map(TABLES.map((t) => [t.name, t]));
const TCODE_INDEX = DISCOVERY.tcodeIndex;              // 167 real T-codes
const TCODES = Object.keys(TCODE_INDEX).sort();
const SHARED = new Set(DISCOVERY.sharedTables);        // 19 PM ∩ PP-PI tables
const ENT = new Map(NEO.entities.map((e) => [e.name, e]));
const BOOKS = NEO.books;
const FUNCS = NEO.funcs;
const TOPICS = [
  ...NEO.pmTopics.map((t) => ({ ...t, module: 'PM' })),
  ...NEO.ppTopics.map((t) => ({ ...t, module: 'PP-PI' })),
];
const MIG = NEO.migration;
const MIG_BY_TABLE = MIG.reduce((m, r) => { (m[r.name] = m[r.name] || []).push(r); return m; }, {});

/* The dictionary itself is the migration sheet: one row per table per module.
   126 rows over 105 unique tables. Never label a sample count as the dictionary. */
const DICT_ROWS = MIG.length;
const FIORI_APPS = uniq(TABLES.flatMap((t) => t.fiori).filter(Boolean)).sort();
const BOOK_SECTIONS = BOOKS.reduce((n, b) => n + b.sections, 0);
const BOOK_CHAPTERS = BOOKS.reduce((n, b) => n + b.chapters, 0);
const BOOK_HOURS = Math.round(BOOKS.reduce((n, b) => n + b.minutes, 0) / 60);
const BOOKS_BY_MOD = UNIVERSE.booksByModule;
const booksFor = (code) => BOOKS_BY_MOD[code] || BOOKS_BY_MOD[code === 'S/4' ? 'S/4HANA' : code] || [];

const IMPACT_HE = NEO.migrationLegend;
const impactCounts = MIG.reduce((m, r) => { m[r.s4Impact] = (m[r.s4Impact] || 0) + 1; return m; }, {});

/* tcodes that resolve to a given table (reverse of tcodeIndex, real edges) */
const TCODES_OF = {};
Object.entries(TCODE_INDEX).forEach(([code, list]) => {
  list.forEach((t) => { (TCODES_OF[t] = TCODES_OF[t] || []).push(code); });
});

/* ---------------------------------------- OBJECT identity (viz surfaces) */
/* COLOUR SCOPING: module hue = chrome/navigation, object hue = visualisation
   surfaces only, status hue = state as dot+label. Never two of them as a
   competing encoding on one element. Object class comes from GRAPH.taxonomy,
   which only groups tables that really exist in the dictionary. */
const OBJ_OF = {};
Object.entries(GRAPH.taxonomy).forEach(([k, v]) => v.tables.forEach((t) => { OBJ_OF[t] = k; }));
const objVar = (k) => (k && OBJ_TYPES[k] ? `var(--obj-${k})` : 'var(--rel-inferred)');
const objHe = (k) => (OBJ_TYPES[k] ? OBJ_TYPES[k].he : 'לא מסווג במילון');
const OBJ_KEYS = Object.keys(OBJ_TYPES);

/* --- object-class primitives · the visual grammar of every viz surface --- */
const oVar = (name) => objVar(OBJ_OF[name]);
const oHe = (name) => objHe(OBJ_OF[name]);
const odot = (name) => `<i class="odot" style="--o:${oVar(name)}"
  title="${esc(oHe(name))}" aria-hidden="true"></i>`;
const otag = (name) => `<span class="otag" style="--o:${oVar(name)}">
  <i aria-hidden="true"></i>${esc(oHe(name))}</span>`;

/* cardinality is a real dictionary value, so it gets its own encoding */
const relVar = (card) => (String(card).trim() === '1:1' ? 'var(--rel-1-1)' : 'var(--rel-n-1)');

/* A density bar of object classes over a real set of tables. Counts are never
   rounded or padded: an unclassified table shows as an explicit grey band. */
function clsBar(tables, { key = true } = {}) {
  const total = tables.length;
  if (!total) return '';
  const counts = {};
  tables.forEach((t) => { const k = OBJ_OF[t.name] || 'none'; counts[k] = (counts[k] || 0) + 1; });
  const keys = OBJ_KEYS.filter((k) => counts[k]);
  const none = counts.none || 0;
  const seg = (k, n, off) => `<i class="${off ? 'off' : ''}" style="--o:${off ? 'var(--rel-inferred)' : `var(--obj-${k})`};--f:${n}"
    title="${esc(off ? 'לא מסווג במילון' : objHe(k))} · ${n}"></i>`;
  return `<div class="clsbar">
    <span class="clsbar__t" role="img"
      aria-label="חלוקת ${total} טבלאות לפי סוג אובייקט">${
  keys.map((k) => seg(k, counts[k], false)).join('')}${none ? seg('none', none, true) : ''}</span>
    ${key ? `<span class="clsbar__k">${keys.map((k) => `<em style="--o:var(--obj-${k})">
      <i aria-hidden="true"></i>${esc(objHe(k))}<b>${counts[k]}</b></em>`).join('')}${
  none ? `<em class="off"><i aria-hidden="true"></i>לא מסווג במילון<b>${none}</b></em>` : ''}</span>` : ''}
  </div>`;
}

/* The object as a body: focus in the middle, its REAL relations around it,
   every edge coloured by the cardinality string that sits in the dictionary.
   No layout maths is invented — the ring is just a circle over relsOf(). */
function orbitSVG(name, { max = 12, ring = 118 } = {}) {
  const rel = relsOf(name);
  const list = rel.list.slice(0, max);
  if (!list.length) return '';
  const P = list.map((r, i) => {
    const a = (i / list.length) * Math.PI * 2 - Math.PI / 2;
    return { ...r, x: Math.cos(a) * ring * 1.34, y: Math.sin(a) * ring };
  });
  const edges = P.map((r, i) => `<line class="orb__e" data-orbe="${i}"
    style="--r:${relVar(r.card)}" x1="0" y1="0" x2="${r.x.toFixed(1)}" y2="${r.y.toFixed(1)}"></line>`).join('');
  const sats = P.map((r, i) => `<g class="orb__n" data-orb="${esc(r.table)}" data-orbi="${i}"
      transform="translate(${r.x.toFixed(1)} ${r.y.toFixed(1)})" style="--o:${oVar(r.table)}"
      tabindex="0" role="button" aria-label="${esc(r.table)} · ${esc(r.card)} · ${esc(r.desc)}">
    <circle class="orb__halo" r="21"></circle>
    <circle class="orb__c" r="13"></circle>
    <text class="orb__t" y="30">${esc(r.table)}</text>
    <text class="orb__k" y="41">${esc(r.card)}</text>
  </g>`).join('');
  return `<svg class="orb" viewBox="-215 -170 430 340" role="img"
      aria-label="${esc(name)} ו-${list.length} הקשרים הממודלים שלו">
    <g class="orb__edges">${edges}</g>
    <g class="orb__core" style="--o:${oVar(name)}">
      <circle class="orb__coreh" r="42"></circle>
      <circle class="orb__corec" r="30"></circle>
      <text class="orb__coret" y="4">${esc(name)}</text>
    </g>
    ${sats}
  </svg>`;
}

/* one section head, one rhythm · used by every level-1 work surface */
function secHead(eyebrow, title, meta = '', ico = '') {
  return `<header class="shead">
    <span class="shead__eye">${ico ? icon(ico, 12) : ''}${esc(eyebrow)}</span>
    <h2 class="shead__t">${esc(title)}</h2>
    <span class="shead__rule" aria-hidden="true"></span>
    ${meta ? `<span class="shead__m">${meta}</span>` : ''}
  </header>`;
}

/* the real process chain: 12 tables, 9 modelled links, 2 honest boundaries */
const FLOW = GRAPH.flow;
const FLOW_CHAIN = [FLOW[0].from, ...FLOW.map((l) => l.to)];
/* split the chain wherever a link is NOT modelled — those are real process
   boundaries (BOM -> routing, routing -> order), never drawn as connectors */
const FLOW_SEGS = (() => {
  const segs = [[{ name: FLOW[0].from, label: FLOW[0].labelFrom }]];
  FLOW.forEach((l) => {
    const node = { name: l.to, label: l.labelTo };
    if (l.real) { segs[segs.length - 1].push({ ...node, link: l }); } else { segs.push([node]); }
  });
  return segs;
})();
const FLOW_GAPS = FLOW.filter((l) => !l.real);

/* migration impact per table name (first dictionary row wins; both rows are
   shown on the object page itself, this is only the field encoding) */
const IMPACT_OF = {};
MIG.forEach((r) => { if (!IMPACT_OF[r.name]) IMPACT_OF[r.name] = r.s4Impact; });

/* ------------------------------------------------------------- nav model */
const NAV_ICO = {
  'אחזקה · PM': 'wrench', 'ייצור · PP-PI': 'workflow', 'מודל נתונים': 'gitBranch',
  'טבלאות': 'table', 'טרנזקציות': 'terminal', 'BAPIs / FMs': 'sigma', 'IDocs': 'cable',
  'CDS Views': 'layers', 'Fiori Apps': 'appWindow', 'Enhancements': 'puzzle',
  'ספרייה דיגיטלית': 'bookOpen', 'שאל את הספרייה': 'sparkles',
  'מרכז ידע': 'lightbulb', 'SAP Academy': 'graduationCap', 'תקלות': 'alertTriangle',
  'הסמכה': 'check', 'Architecture Studio': 'boxes', 'צ׳אט AI': 'sparkles',
};
/* A count is shown ONLY where the shared dataset backs one. Everything else
   renders an explicit "no count in the dataset" mark instead of a guess. */
const NAV_COUNT = {
  'אחזקה · PM': PM.tables, 'ייצור · PP-PI': PP.tables, 'מודל נתונים': NEO.entities.length,
  'טבלאות': TABLES.length, 'טרנזקציות': TCODES.length, 'BAPIs / FMs': FUNCS.length,
  'Fiori Apps': FIORI_APPS.length, 'ספרייה דיגיטלית': BOOKS.length,
  'SAP Academy': BOOK_SECTIONS,
};
const NAV_MOD = { 'אחזקה · PM': 'PM', 'ייצור · PP-PI': 'PP-PI' };
const NAV = NEO.navGroups.map((g, gi) => ({
  gi, he: g.he,
  items: g.items.map((label) => ({
    id: label, label,
    ico: NAV_ICO[label] || 'layoutGrid',
    count: NAV_COUNT[label],
    mod: NAV_MOD[label] || null,
  })),
}));
const NAV_ITEMS = NAV.flatMap((g) => g.items.map((it) => ({ ...it, group: g.he })));

/* recent / pinned · real objects only; the relative time is UI chrome. */
const RECENT = [
  { name: 'AUFK', tcode: 'IW31', when: 'לפני 8 דק׳' },
  { name: 'EQUI', tcode: 'IE03', when: 'לפני 34 דק׳' },
  { name: 'PLPO', tcode: 'C202', when: 'לפני שעה' },
  { name: 'MARA', tcode: 'MM03', when: 'אתמול' },
].map((r) => ({ ...r, t: TABLE.get(r.name) }));
const PINNED = ['EQUI', 'AUFK', 'PLKO', 'MARA'].map((nm) => TABLE.get(nm));

/* =========================================================================
   SEARCH ENGINE · deterministic, token based, over the real dataset only.
   The five demo queries all resolve against real rows:
     IW31 · MARA · MRP · Process Order · Equipment
   ======================================================================= */
const tableHay = (t) => [
  t.name, t.he, t.en, t.tcodes.join(' '), t.fiori.join(' '),
  t.contexts.map((c) => `${c.module} ${c.topic} ${c.s4}`).join(' '),
].join(' ').toLowerCase();
const HAY = new Map(TABLES.map((t) => [t.name, tableHay(t)]));

function rank(name, hay, q) {
  const nm = String(name).toLowerCase();
  if (nm === q) return 130;
  if (nm.startsWith(q)) return 105;
  if (nm.includes(q)) return 78;
  if (hay.includes(` ${q}`)) return 52;
  if (hay.includes(q)) return 34;
  return 0;
}
function multi(name, hay, toks) {
  if (!toks.every((k) => `${name} ${hay}`.toLowerCase().includes(k))) return 0;
  return Math.max(...toks.map((k) => rank(name, hay, k)), 20);
}

function hl(text, q) {
  const s = String(text);
  if (!q) return esc(s);
  const toks = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let out = esc(s);
  toks.forEach((k) => {
    const re = new RegExp(`(${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    out = out.replace(re, '<mark>$1</mark>');
  });
  return out;
}

/* relationship summary for a table, straight out of NEO.entities */
function relsOf(name) {
  const e = ENT.get(name);
  if (!e) return { modelled: false, list: [] };
  const seen = new Set();
  const list = e.relations.filter((r) => {
    const k = `${r.table}|${r.join}`;
    if (seen.has(k)) return false; seen.add(k); return true;
  });
  return { modelled: true, list };
}

function tableRecord(t, q) {
  const r = relsOf(t.name);
  const topic = t.contexts[0] ? t.contexts[0].topic : '';
  const kn = t.modules.flatMap((m) => booksFor(m)).slice(0, 2);
  return {
    kind: 'table', type: 'טבלה', ico: 'table', id: t.name,
    title: hl(t.name, q), mono: true,
    modules: t.modules,
    obj: OBJ_OF[t.name] || null,
    joins: r.list.slice(0, 3),
    desc: `${esc(t.he)} · <span class="lt">${hl(t.en, q)}</span>`,
    facts: [
      `${t.fields} שדות`,
      `${t.tcodes.length} טרנזקציות`,
      SHARED.has(t.name) ? 'טבלה משותפת PM ∩ PP-PI' : '',
      topic ? `נושא: ${topic}` : '',
    ].filter(Boolean),
    rel: r.modelled
      ? `${r.list.length} קשרים · ${r.list.slice(0, 3).map((x) => x.table).join(' · ')}`
      : 'לא ממודלת ב-ERD של הפרויקט',
    relOk: r.modelled,
    actions: [
      { a: 'object', v: t.name, l: 'עמוד אובייקט', i: 'appWindow' },
      { a: 'erd', v: t.name, l: 'ERD ממוקד', i: 'gitBranch' },
      { a: 'flow', v: t.name, l: 'מסע גילוי', i: 'workflow' },
    ],
    knowledge: kn.map((b) => ({ t: b.title, m: b.module, s: `${b.chapters} פרקים · ${b.sections} סעיפים` })),
  };
}

function tcodeRecord(code, q) {
  const names = TCODE_INDEX[code] || [];
  const ts = names.map((n) => TABLE.get(n)).filter(Boolean);
  const mods = uniq(ts.flatMap((t) => t.modules));
  const topic = ts[0] && ts[0].contexts[0] ? ts[0].contexts[0].topic : '';
  return {
    kind: 'tcode', type: 'טרנזקציה', ico: 'terminal', id: code,
    title: hl(code, q), mono: true,
    modules: mods,
    obj: ts[0] ? (OBJ_OF[ts[0].name] || null) : null,
    joins: ts[0] ? relsOf(ts[0].name).list.slice(0, 2) : [],
    desc: ts.length ? `${esc(ts[0].he)} · <span class="lt">${esc(ts[0].en)}</span>` : '',
    facts: [`${names.length} טבלאות במילון`, topic ? `נושא: ${topic}` : ''].filter(Boolean),
    rel: `נפתרת אל ${names.join(' · ')}`,
    relOk: true,
    actions: [
      { a: 'flow', v: names[0] || '', l: `מסע גילוי מ-${code}`, i: 'workflow' },
      { a: 'object', v: names[0] || '', l: `פתח ${names[0] || ''}`, i: 'table' },
    ],
    knowledge: mods.flatMap((m) => booksFor(m)).slice(0, 2)
      .map((b) => ({ t: b.title, m: b.module, s: `${b.chapters} פרקים` })),
  };
}

function funcRecord(f, q) {
  return {
    kind: 'func', type: 'BAPI / FM', ico: 'sigma', id: f.name,
    title: hl(f.name, q), mono: true, modules: [],
    desc: f.he ? esc(f.he) : '<span class="warn">אין תיאור במילון הפרויקט</span>',
    facts: ['מקור: רשימת הפונקציות של המילון'],
    rel: 'מילון הפונקציות אינו נושא שיוך מודול, ולכן לא מוסק כאן',
    relOk: false,
    actions: [{ a: 'nav', v: 'BAPIs / FMs', l: 'מרכז BAPIs', i: 'sigma' }],
    knowledge: [],
  };
}

function bookRecord(b, q, why) {
  return {
    kind: 'book', type: 'ספר', ico: 'bookOpen', id: b.id,
    title: hl(b.title, q), mono: false, modules: [b.module],
    desc: `${b.chapters} פרקים · ${nf(b.sections)} סעיפים · ${Math.round(b.minutes / 60)} שעות`,
    facts: [b.hebrew ? 'תרגום עברי' : 'אנגלית', why || ''].filter(Boolean),
    rel: 'הקורא עצמו קפוא, NEO רק מקשר אליו',
    relOk: true,
    actions: [{ a: 'library', v: b.id, l: 'פתח בספרייה', i: 'bookOpen' }],
    knowledge: [],
  };
}

function topicRecord(t, q) {
  return {
    kind: 'topic', type: 'נושא', ico: 'layers', id: t.title,
    title: hl(t.title, q), mono: false, modules: [t.module],
    desc: `${t.tables} טבלאות בנושא`,
    facts: [`מודול ${t.module} · ${modHe(t.module)}`],
    rel: 'נושא מתוך המילון הטכני',
    relOk: true,
    actions: [{ a: 'module', v: t.module, l: `סביבת ${t.module}`, i: 'layoutGrid' }],
    knowledge: booksFor(t.module).slice(0, 1).map((b) => ({ t: b.title, m: b.module, s: `${b.chapters} פרקים` })),
  };
}

function pageRecord(it, q) {
  return {
    kind: 'page', type: 'עמוד', ico: it.ico, id: it.id,
    title: hl(it.label, q), mono: false, modules: it.mod ? [it.mod] : [],
    desc: `בקבוצה: ${esc(it.group)}`,
    facts: it.count !== undefined ? [`${nf(it.count)} רשומות`] : ['אין ספירה מגובה בנתונים'],
    rel: 'ניווט ראשי',
    relOk: true,
    actions: [{ a: 'nav', v: it.id, l: 'עבור', i: 'arrowUpRight' }],
    knowledge: [],
  };
}

const GROUP_META = {
  tcode: { label: 'טרנזקציות', ico: 'terminal' },
  table: { label: 'טבלאות', ico: 'table' },
  func: { label: 'BAPIs / FMs', ico: 'sigma' },
  topic: { label: 'נושאים', ico: 'layers' },
  book: { label: 'ספרייה', ico: 'bookOpen' },
  page: { label: 'עמודים', ico: 'appWindow' },
};
const GROUP_ORDER = ['tcode', 'table', 'func', 'topic', 'book', 'page'];

function search(qRaw) {
  const q = String(qRaw || '').trim().toLowerCase();
  if (!q) return { q: '', groups: [], total: 0, modules: [], tables: [] };
  const toks = q.split(/\s+/).filter(Boolean);

  const tables = TABLES
    .map((t) => ({ t, s: multi(t.name, HAY.get(t.name), toks) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.t.name.localeCompare(b.t.name));

  const tcodes = TCODES
    .map((c) => {
      const hay = `${c} ${(TCODE_INDEX[c] || []).map((n) => `${n} ${(TABLE.get(n) || {}).he || ''}`).join(' ')}`.toLowerCase();
      return { c, s: multi(c, hay, toks) };
    })
    .filter((x) => x.s > 0).sort((a, b) => b.s - a.s || a.c.localeCompare(b.c));

  const funcs = FUNCS
    .map((f) => ({ f, s: multi(f.name, `${f.name} ${f.he}`.toLowerCase(), toks) }))
    .filter((x) => x.s > 0).sort((a, b) => b.s - a.s);

  const hitModules = uniq(tables.slice(0, 6).flatMap((x) => x.t.modules));
  const hitTopics = new Set(tables.slice(0, 6).flatMap((x) => x.t.contexts.map((c) => c.topic)));

  const topics = TOPICS
    .map((t) => {
      const direct = multi(t.title, `${t.title} ${t.module}`.toLowerCase(), toks);
      return { t, s: direct || (hitTopics.has(t.title) ? 40 : 0) };
    })
    .filter((x) => x.s > 0).sort((a, b) => b.s - a.s);

  /* Books never match on an accidental substring · module code, a title word
     that starts with the query, or "covers the module the query resolved to". */
  const books = BOOKS.map((b) => {
    if (b.module.toLowerCase() === q) return { b, s: 95, why: `מודול ${b.module}` };
    const words = b.title.toLowerCase().split(/[^a-z0-9/&]+/);
    if (q.length >= 3 && toks.every((k) => words.some((w) => w.startsWith(k)))) return { b, s: 72, why: null };
    if (hitModules.includes(b.module)) return { b, s: 40, why: `מכסה את מודול ${b.module}` };
    return { b, s: 0, why: null };
  }).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);

  const pages = NAV_ITEMS
    .map((it) => ({ it, s: multi(it.label, `${it.label} ${it.group}`.toLowerCase(), toks) }))
    .filter((x) => x.s > 0).sort((a, b) => b.s - a.s);

  const raw = {
    tcode: tcodes.slice(0, 6).map((x) => tcodeRecord(x.c, q)),
    table: tables.slice(0, 6).map((x) => tableRecord(x.t, q)),
    func: funcs.slice(0, 3).map((x) => funcRecord(x.f, q)),
    topic: topics.slice(0, 3).map((x) => topicRecord(x.t, q)),
    book: books.slice(0, 3).map((x) => bookRecord(x.b, q, x.why)),
    page: pages.slice(0, 3).map((x) => pageRecord(x.it, q)),
  };

  /* Never-guess: an empty group that the reviewer would expect to be full
     states, in words, what the dataset does and does not hold. */
  const notes = {};
  if (!raw.func.length && raw.table.length) {
    notes.func = `אין BAPI / FM המשויך ל-${tables[0].t.name} במילון הפרויקט. `
      + `רשימת הפונקציות כוללת ${FUNCS.length} רשומות בלבד.`;
  }
  if (!raw.tcode.length && raw.table.length) {
    notes.tcode = `אין טרנזקציה שהקוד שלה תואם לשאילתה. אינדקס הטרנזקציות מכיל ${TCODES.length} קודים אמיתיים.`;
  }

  const groups = GROUP_ORDER
    .filter((k) => raw[k].length || notes[k])
    .map((k) => ({ key: k, ...GROUP_META[k], items: raw[k], note: notes[k] || null }));

  return {
    q, groups,
    total: groups.reduce((n, g) => n + g.items.length, 0),
    modules: hitModules,
    tables: tables.slice(0, 8).map((x) => x.t.name),
    ai: aiEvidence(q, tables.slice(0, 8).map((x) => x.t), hitModules, tcodes.slice(0, 6).map((x) => x.c)),
  };
}

/* =========================================================================
   THE AI LANE · evidence, never an answer
   -------------------------------------------------------------------------
   NEO does not answer here and does not reach a live SAP system. The lane
   states, in real counts, exactly what an answer could be grounded in for the
   current query, and links straight to those sources. Every number below is
   read off the project dataset. Nothing about SAP is generated.
   ======================================================================= */
function aiEvidence(q, tabs, mods, codes) {
  if (!q) return null;
  const rows = tabs.flatMap((t) => MIG_BY_TABLE[t.name] || []);
  const sapNotes = uniq(rows.flatMap((r) => r.s4Notes));
  const joins = tabs.flatMap((t) => relsOf(t.name).list);
  const books = uniq(mods.flatMap((m) => booksFor(m)));
  const sections = books.reduce((n, b) => n + b.sections, 0);
  const fields = tabs.reduce((n, t) => n + t.fields, 0);
  /* every suggested question resolves to a real surface in this prototype,
     so nothing here is a dead affordance or an invented answer */
  const asks = [];
  if (tabs[0]) asks.push({ l: `מה משתנה ב-${tabs[0].name} במעבר ל-S/4HANA?`, a: 'object', v: tabs[0].name });
  if (joins[0] && tabs[0]) asks.push({ l: `איך ${tabs[0].name} מתחברת אל ${joins[0].table}?`, a: 'erd', v: tabs[0].name });
  if (codes[0]) asks.push({ l: `אילו טבלאות ${codes[0]} נוגעת בהן?`, a: 'tcode', v: codes[0] });
  return {
    metrics: [
      { n: tabs.length, l: 'טבלאות במילון', k: 'table' },
      { n: fields, l: 'שדות מתועדים', k: 'sigma' },
      { n: joins.length, l: 'מפתחות JOIN', k: 'gitBranch' },
      { n: rows.length, l: 'שורות המרה', k: 'alertTriangle' },
      { n: sections, l: 'סעיפי ספרייה', k: 'bookOpen' },
    ],
    sapNotes, books: books.slice(0, 3), tabs: tabs.slice(0, 5), asks: asks.slice(0, 3),
  };
}

/* =========================================================================
   SHARED FRAGMENTS
   ======================================================================= */
function lockup(compact = false) {
  return `<span class="glyph" aria-hidden="true"><i></i><i></i><i></i></span>
    ${compact ? '' : `<span class="lock">
      <b>${esc(NEO.brand.name)}</b><span>${esc(NEO.brand.product)}</span></span>`}`;
}

function creditBar() {
  return `<footer class="credit">
    <span class="credit__lock"><b>${esc(NEO.brand.name)}</b>
      <i aria-hidden="true"></i><span>${esc(NEO.brand.product)}</span></span>
    <span class="grow"></span>
    <span class="credit__by">${esc(NEO.brand.credit)}</span>
  </footer>`;
}

/* =========================================================================
   THE SIGNATURE RAIL
   -------------------------------------------------------------------------
   Nine states on one body. Everything that moves, moves on transform/opacity;
   width changes are absorbed by a FLIP so the layout jumps once, invisibly,
   while the pixels spring. Module hue tints the surface, never the data.
   ======================================================================= */
function railHTML(activeId = 'אחזקה · PM') {
  const groups = NAV.map((g) => {
    const items = g.items.map((it) => `
      <li>
        <button class="navitem" type="button" data-nav="${esc(it.id)}"
          ${it.mod ? `style="--m:${modVar(it.mod)}" data-mod="${esc(it.mod)}"` : ''}
          ${activeId === it.id ? 'aria-current="page"' : ''}>
          <span class="navitem__i" aria-hidden="true">${icon(it.ico, 16)}</span>
          <span class="navitem__l">${esc(it.label)}</span>
          ${it.count !== undefined
            ? `<span class="navitem__n">${nf(it.count)}</span>`
            : '<span class="navitem__n navitem__n--none" title="אין ספירה מגובה בנתוני הפרויקט">—</span>'}
        </button>
      </li>`).join('');
    return `<section class="navgroup" data-gi="${g.gi}" data-open="true">
      <h3 class="navgroup__h">
        <button class="navgroup__btn" type="button" data-group="${g.gi}"
          aria-expanded="true" aria-controls="grp-${g.gi}">
          <span class="chev" aria-hidden="true">${icon('chevronDown', 12)}</span>
          <span class="t">${esc(g.he)}</span>
          <span class="n">${g.items.length}</span>
        </button>
      </h3>
      <div class="navgroup__body" id="grp-${g.gi}"><ul>${items}</ul></div>
    </section>`;
  }).join('');

  /* Search is not a separate modal bolted onto the product: it grows out of
     the same slot the quick action lives in, and it filters the very list
     underneath it before it ever escalates to the full command surface. */
  const cmd = `
    <div class="rail__cmd" data-railcmd>
      <button class="railq" type="button" data-act="navsearch">
        <span class="railq__i" aria-hidden="true">${icon('search', 15)}</span>
        <span class="railq__l">חפש בניווט ובמילון</span>
        <kbd>⌘K</kbd>
      </button>
      <div class="railsrch" data-railsrch>
        <div class="railsrch__f">
          <span class="ico" aria-hidden="true">${icon('search', 14)}</span>
          <input type="search" class="rail__filterinput" data-navfilter
            placeholder="טבלה · טרנזקציה · BAPI · ספר" aria-label="חיפוש בניווט ובמילון">
          <button class="iconbtn iconbtn--xs" type="button" data-act="navmode"
            data-mode="expanded" aria-label="סגור חיפוש">${icon('x', 13)}</button>
        </div>
        <p class="rail__filtermeta" data-navfiltermeta>${NAV_ITEMS.length} פריטי ניווט</p>
        <div class="railsrch__res" data-navres role="listbox" aria-label="תוצאות מהמילון"></div>
      </div>
    </div>`;

  /* one shelf, three intelligences: what you kept, what you touched, where
     you are. They share a box and cross-fade, so the rail never grows. */
  const shelf = `
    <div class="rail__shelf" data-shelf="recent">
      <div class="shelf__tabs" role="tablist" aria-label="מדף הקשר">
        <button type="button" role="tab" data-shelftab="recent" aria-selected="true">
          ${icon('history', 12)}<span>אחרונים</span></button>
        <button type="button" role="tab" data-shelftab="pinned" aria-selected="false">
          ${icon('pin', 12)}<span>מוצמדים</span></button>
        <button type="button" role="tab" data-shelftab="context" aria-selected="false">
          ${icon('layers', 12)}<span>הקשר</span></button>
        <span class="shelf__ind" data-shelfind aria-hidden="true"></span>
      </div>
      <div class="shelf__panes">
        <div class="shelf__pane" data-shelfpane="recent">
          <ul class="striplist">${RECENT.map((r) => `
            <li><button class="striprow" type="button" data-obj="${esc(r.name)}"
              style="--m:${modVar(r.t.modules[0])}">
              <i aria-hidden="true"></i>
              <span class="sap">${esc(r.name)}</span>
              <span class="s">${esc(r.t.he)}</span>
              <span class="w">${esc(r.when)}</span></button></li>`).join('')}
          </ul>
        </div>
        <div class="shelf__pane" data-shelfpane="pinned" hidden>
          <ul class="pins">${PINNED.map((t) => `
            <li><button class="pin" type="button" data-obj="${esc(t.name)}"
              style="--m:${modVar(t.modules[0])}"><span class="sap">${esc(t.name)}</span>
              <span class="n">${t.fields}</span></button></li>`).join('')}
          </ul>
          <p class="shelf__note">${PINNED.length} אובייקטים מוצמדים · לחיצה פותחת את עמוד האובייקט</p>
        </div>
        <div class="shelf__pane shelf__pane--ctx" data-shelfpane="context" data-railctx hidden>
          ${contextPanelHTML('AUFK')}
        </div>
      </div>
    </div>`;

  return `<aside class="rail" aria-label="ניווט ראשי" data-railroot>
    <span class="rail__bg" aria-hidden="true"></span>
    <span class="rail__edge" aria-hidden="true"></span>
    <div class="rail__head">
      ${lockup(false)}
      <button class="iconbtn rail__collapse" type="button" data-act="railtoggle"
        aria-label="כווץ ניווט">${icon('panelLeft', 16)}</button>
    </div>
    ${cmd}
    <div class="rail__scroll" data-railscroll tabindex="0">
      <span class="rail__ind" data-ind aria-hidden="true"></span>
      ${groups}
    </div>
    ${shelf}
    <div class="rail__foot">
      <span class="who"><span class="avatar" aria-hidden="true">SH</span>
        <span class="who__t"><b>${esc(NEO.brand.credit)}</b><span>Web Coding</span></span></span>
      <button class="iconbtn" type="button" aria-label="הגדרות">${icon('settings', 16)}</button>
    </div>
  </aside>`;
}

/* rail "context mode" · real context of one object, not a second menu */
function contextPanelHTML(name) {
  const t = TABLE.get(name);
  const r = relsOf(name);
  const codes = (TCODES_OF[name] || []).slice(0, 8);
  return `<div class="ctx">
    <div class="ctx__head">
      <span class="eyebrow">הקשר נוכחי</span>
      <b class="sap">${esc(t.name)}</b>
      <span class="ctx__he">${esc(t.he)}</span>
      <span class="ctx__mods">${mchips(t.modules, 'mchip--sm')}</span>
    </div>
    ${SHARED.has(name) ? `<p class="ctx__shared">${icon('gitBranch', 12)}
      טבלה משותפת ל-PM ול-PP-PI, ולכן שני ההקשרים מוצגים, אין בחירה שרירותית של מודול.</p>` : ''}
    <div class="ctx__sec">
      <h5>הקשרי מודול (${t.contexts.length})</h5>
      <ul class="ctx__list">${t.contexts.map((c) => `<li style="--m:${modVar(c.module)}">
        <b>${esc(c.module)}</b><span>${esc(c.topic)}</span>
        <em class="sap">${esc(c.tcodes)}</em></li>`).join('')}</ul>
    </div>
    <div class="ctx__sec">
      <h5>טרנזקציות (${codes.length})</h5>
      <div class="ctx__codes">${codes.map((c) => `<button class="tcode" type="button"
        data-tcode="${esc(c)}"><span class="sap">${esc(c)}</span></button>`).join('')}</div>
    </div>
    <div class="ctx__sec">
      <h5>קשרים (${r.list.length})</h5>
      <ul class="ctx__joins">${r.list.slice(0, 6).map((x) => `<li>
        <button type="button" data-obj="${esc(x.table)}"><span class="sap">${esc(x.table)}</span>
        <span class="card">${esc(x.card)}</span></button>
        <code>${esc(x.join)}</code></li>`).join('')}</ul>
    </div>
  </div>`;
}

/* ------------------------------------------------------------- top chrome */
function topbarHTML(crumbs, { q = '', mode = 'experience' } = {}) {
  const cr = crumbs.map((c, i) => i === crumbs.length - 1
    ? `<span class="cur">${esc(c)}</span>`
    : `<button type="button" class="crumb" data-crumb="${esc(c)}">${esc(c)}</button><span class="sep" aria-hidden="true">${icon('chevronLeft', 12)}</span>`).join('');
  return `<header class="topbar">
    <button class="iconbtn" type="button" data-act="railtoggle" aria-label="הצג או הסתר ניווט">${icon('panelLeft', 16)}</button>
    <nav class="crumbs" aria-label="נתיב">${cr}</nav>
    <button class="cmdbar" type="button" data-act="cmdk">
      ${icon('search', 15)}
      <span class="ph">${q ? esc(q) : 'חפש טבלה, טרנזקציה, BAPI, ספר…'}</span>
      <kbd>⌘K</kbd>
    </button>
    <span class="modetag" data-modetag="${mode}">
      <i aria-hidden="true"></i>${mode === 'work' ? 'מצב עבודה' : 'מצב חוויה'}</span>
    <div class="topbar__tools">
      <button class="iconbtn" type="button" aria-label="היסטוריה">${icon('history', 16)}</button>
      <button class="iconbtn" type="button" aria-label="שאל את NEO">${icon('sparkles', 16)}</button>
    </div>
  </header>`;
}

/* one shell for every desktop screen · identical chrome, different personality */
function shell(id, { mode = 'experience', crumbs = ['בית'], nav = 'expanded',
  active = 'אחזקה · PM', body = '', q = '' } = {}) {
  return `<div class="app" data-mode="${mode}" data-nav="${nav}" data-app="${id}">
    ${railHTML(active)}
    <button class="railedge" type="button" data-act="peek" aria-label="הצג ניווט"><i></i></button>
    <div class="main">
      ${topbarHTML(crumbs, { q, mode })}
      <div class="canvas" data-canvas tabindex="0">${body}${creditBar()}</div>
    </div>
    <div class="cmdlayer" data-cmdlayer hidden></div>
  </div>`;
}

/* =========================================================================
   SCREEN BODIES
   ======================================================================= */

/* ------------------------------------------------------------------ HOME */
/* EXPERIENCE MODE. Editorial register, L3. The module cards are the FLIP
   source elements for the shared-element entry into a workspace. */
function moduleCard(code, meta, big = false) {
  const books = booksFor(code);
  const tables = TABLES.filter((t) => t.modules.includes(code));
  return `<button class="mcard${big ? ' mcard--big' : ''}" type="button"
      data-flip="card-${esc(code)}" data-enter="${esc(code)}"
      style="--m:${modVar(code)}">
    <span class="mcard__hue" aria-hidden="true"></span>
    <span class="mcard__top">
      ${mchip(code)}
      <span class="mcard__he">${esc(modHe(code))}</span>
    </span>
    <span class="mcard__en">${esc(meta.en || '')}</span>
    <span class="mcard__nums">
      ${meta.tables !== undefined ? `<b>${nf(meta.tables)}</b><span>טבלאות</span>` : ''}
      ${meta.fields !== undefined ? `<b>${nf(meta.fields)}</b><span>שדות</span>` : ''}
      ${meta.topics !== undefined ? `<b>${nf(meta.topics)}</b><span>נושאים</span>` : ''}
      ${meta.tables === undefined ? `<b>${nf(books.reduce((n, b) => n + b.sections, 0))}</b><span>סעיפים בספרייה</span>` : ''}
    </span>
    <span class="mcard__foot">
      <span class="mcard__ticks" aria-hidden="true">${
        Array.from({ length: 24 }, (_, i) => `<i class="${i < Math.round((tables.length / 68) * 24) ? '' : 'off'}"></i>`).join('')}</span>
      <span class="mcard__go">${icon('arrowUpRight', 14)}</span>
    </span>
  </button>`;
}

function densityHTML() {
  const max = Math.max(...TOPICS.map((t) => t.tables));
  const col = (code, mo, list) => `
    <div class="dcol">
      <div class="dcol__h" style="--m:${modVar(code)}">
        <i aria-hidden="true"></i><b>${esc(code)}</b>
        <span>${mo.topics} נושאים · ${mo.tables} טבלאות · ${nf(mo.fields)} שדות</span>
      </div>
      ${list.map((t) => `<button class="drow" type="button" style="--m:${modVar(code)}"
        data-topic="${esc(t.title)}">
        <span class="drow__i">${String(t.idx).padStart(2, '0')}</span>
        <span class="drow__t">${esc(t.title)}</span>
        <span class="drow__k" aria-hidden="true">${
          Array.from({ length: max }, (_, i) => `<i class="${i < t.tables ? '' : 'off'}"></i>`).join('')}</span>
        <span class="drow__n">${t.tables}</span>
      </button>`).join('')}
    </div>`;
  return `<section class="panel panel--density">
    <div class="panel__h"><h2>צפיפות מודל הנתונים</h2>
      <span class="grow"></span>
      <span class="panel__meta">${TOPICS.length} נושאים · ${DICT_ROWS} שורות מילון · סולם מלא = ${max}</span></div>
    <div class="dcols">
      ${col('PM', PM, NEO.pmTopics)}
      ${col('PP-PI', PP, NEO.ppTopics)}
    </div>
  </section>`;
}

/* =========================================================================
   HOME · A CONNECTED ENVIRONMENT, NOT SEVEN STACKED BANDS
   -------------------------------------------------------------------------
   Three layers live on top of each other inside one ordinary scroll container:

     FIELD    a sticky background of 105 dots, one per real merged table,
              coloured by GRAPH.taxonomy object class. It re-forms between
              sections, and every formation MEANS something (module gravity,
              universe ring, migration bands...). Pure transform/opacity.
     PRESENCE two module bodies (PM, PP-PI) introduced at full size in 01,
              shrunk into the universe ring in 02, then docked as a persistent
              context pair from 03 onward. Same two DOM nodes throughout, so
              the eye tracks one object across the whole page.
     CONTENT  the seven sections, deliberately unequal in density and layout.

   No scroll-jacking: the browser scrolls the way it always does. We only read
   scrollTop and switch a state attribute, everything else is CSS.
   ======================================================================= */

/* deterministic jitter, so the composition is identical on every load */
function seeded(a) {
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* one dot per real merged table · order groups PM · shared · PP-PI so the
   gravity formation reads as two bodies with a shared band between them */
const DOT_ORDER = { PM: 0, both: 1, 'PP-PI': 2 };
const DOTS = TABLES.map((t) => ({
  name: t.name,
  obj: OBJ_OF[t.name] || null,
  mod: t.modules.length > 1 ? 'both' : t.modules[0],
  fields: t.fields,
  imp: IMPACT_OF[t.name] || null,
})).sort((a, b) => (DOT_ORDER[a.mod] ?? 3) - (DOT_ORDER[b.mod] ?? 3)
  || b.fields - a.fields || a.name.localeCompare(b.name));
DOTS.forEach((d, i) => { d.i = i; });
(() => {
  const seen = {};
  DOTS.forEach((d) => { seen[d.mod] = (seen[d.mod] || 0); d.j = seen[d.mod]; seen[d.mod] += 1; });
  const imps = {};
  DOTS.forEach((d) => { const k = d.imp || 'none'; imps[k] = imps[k] || 0; d.k = imps[k]; imps[k] += 1; });
})();
const DOT_MOD_N = DOTS.reduce((m, d) => { m[d.mod] = (m[d.mod] || 0) + 1; return m; }, {});

/* the presence · one box, three registers that cross-fade inside it, so the
   whole thing morphs on transform only and the text never reflows */
function presHTML(code, meta) {
  const tables = TABLES.filter((t) => t.modules.includes(code));
  const codes = uniq(tables.flatMap((t) => TCODES_OF[t.name] || []));
  const books = booksFor(code);
  const share = Math.round((tables.length / (PM.tables + PP.tables)) * 28);
  return `<button class="pres" type="button" data-pres="${esc(code)}"
      data-flip="card-${esc(code)}" data-enter="${esc(code)}"
      style="--m:${modVar(code)}" aria-label="כניסה לסביבת ${esc(code)} · ${esc(modHe(code))}">
    <span class="pres__aura" aria-hidden="true"></span>
    <span class="pres__ring" aria-hidden="true"></span>

    <span class="pres__r pres__r--l">
      <span class="pres__code">${esc(code)}</span>
      <span class="pres__he">${esc(modHe(code))}</span>
      <span class="pres__en">${esc(meta.en || '')}</span>
      <span class="pres__nums">
        <span><b>${nf(meta.tables)}</b><em>טבלאות</em></span>
        <span><b>${nf(meta.fields)}</b><em>שדות</em></span>
        <span><b>${nf(meta.topics)}</b><em>נושאים</em></span>
        <span><b>${nf(meta.funcs)}</b><em>פונקציות</em></span>
      </span>
      <span class="pres__bar" aria-hidden="true">${Array.from({ length: 28 },
    (_, i) => `<i class="${i < share ? '' : 'off'}"></i>`).join('')}</span>
      <span class="pres__go">${nf(codes.length)} טרנזקציות · ${books.length} ספרים
        ${icon('arrowUpRight', 15)}</span>
    </span>

    <span class="pres__r pres__r--m" aria-hidden="true">
      <span class="pres__code">${esc(code)}</span>
      <span class="pres__he">${esc(modHe(code))}</span>
      <span class="pres__mn">${nf(meta.tables)} טבלאות · ${nf(meta.fields)} שדות</span>
    </span>

    <span class="pres__r pres__r--d" aria-hidden="true">
      <span class="pres__code">${esc(code)}</span>
      <span class="pres__he">${esc(modHe(code))}</span>
    </span>
  </button>`;
}

/* the background field · 105 real tables, three aura bodies, one hairline grid */
function fieldHTML() {
  const dots = DOTS.map((d) => `<i class="hdot" data-di="${d.i}"
    style="--o:${objVar(d.obj)}" title="${esc(d.name)}"></i>`).join('');
  return `<div class="hfield" data-hfield data-sec="0" aria-hidden="true">
    <span class="hfield__grid"></span>
    <span class="hfield__aura hfield__aura--pm" style="--m:${modVar('PM')}"></span>
    <span class="hfield__aura hfield__aura--pp" style="--m:${modVar('PP-PI')}"></span>
    <span class="hfield__halo"></span>
    <span class="hfield__dots" data-hdots>${dots}</span>
    <span class="hfield__vig"></span>
  </div>`;
}

/* the real process chain · 12 tables, 9 modelled links, 2 honest boundaries */
function flowNodeHTML(n, first) {
  const t = TABLE.get(n.name);
  const k = OBJ_OF[n.name] || null;
  const fields = t ? t.fields : null;
  return `<button class="fnode${first ? ' fnode--first' : ''}" type="button"
      data-flownode="${esc(n.name)}" style="--o:${objVar(k)}">
    <span class="fnode__cls" aria-hidden="true"></span>
    <span class="fnode__sap sap">${esc(n.name)}</span>
    <span class="fnode__he">${esc(n.label)}</span>
    <span class="fnode__n">${fields !== null ? `${fields} שדות` : 'לא במילון'}</span>
  </button>`;
}
function flowLinkHTML(l) {
  return `<span class="flink" data-flowlink="${esc(l.from)}-${esc(l.to)}">
    <span class="flink__line" aria-hidden="true"><i class="flink__pulse"></i></span>
    <span class="flink__tag">${l.hops === 2 ? `דרך ${esc(l.via)}` : 'JOIN ישיר'}</span>
  </span>`;
}
function flowHTML() {
  /* Three bands, because the chain really is three chains. The two crossings
     the dictionary does not model become full-width boundaries between the
     bands, which states the truth more clearly than any arrow could. */
  const band = (nodes, si) => {
    const inner = nodes.map((n, i) => (i ? flowLinkHTML(n.link) : '') + flowNodeHTML(n, i === 0)).join('');
    const cap = `${nodes[0].label} ← ${nodes[nodes.length - 1].label}`;
    return `<div class="fband" data-fseg="${si}">
      <span class="fband__cap"><b>${String(si + 1).padStart(2, '0')}</b>${esc(cap)}</span>
      <div class="fband__row">${inner}</div>
    </div>`;
  };
  const gap = (g) => `<div class="fgap" data-fgap="${esc(g.from)}-${esc(g.to)}">
    <span class="fgap__rule" aria-hidden="true"></span>
    <span class="fgap__t">${icon('alertTriangle', 12)}<b>גבול תהליך</b>
      <span><span class="sap">${esc(g.from)}</span> ← <span class="sap">${esc(g.to)}</span>
      אינו ממודל במילון, ולכן אין כאן חץ</span></span>
    <span class="fgap__rule" aria-hidden="true"></span>
  </div>`;
  const chain = band(FLOW_SEGS[0], 0) + gap(FLOW_GAPS[0])
    + band(FLOW_SEGS[1], 1) + gap(FLOW_GAPS[1]) + band(FLOW_SEGS[2], 2);
  const legend = OBJ_KEYS.filter((k) => (GRAPH.taxonomy[k] || {}).tables)
    .map((k) => `<span class="olg" style="--o:var(--obj-${k})"><i aria-hidden="true"></i>
      ${esc(objHe(k))}<em>${GRAPH.taxonomy[k].tables.length}</em></span>`).join('');
  return `<div class="flow">
    <div class="flow__rail" data-flowrail>${chain}</div>
    <div class="flow__legend">${legend}</div>
    <div class="flow__detail" data-flowdetail></div>
  </div>`;
}

function flowDetailHTML(name) {
  const t = TABLE.get(name);
  const k = OBJ_OF[name] || null;
  const outward = FLOW.filter((l) => l.from === name);
  const inward = FLOW.filter((l) => l.to === name);
  const joins = [...inward, ...outward].filter((l) => l.real);
  const gaps = [...inward, ...outward].filter((l) => !l.real);
  const codes = (TCODES_OF[name] || []).slice(0, 6);
  if (!t) {
    return `<p class="empty">${esc(name)} אינו קיים במילון המאוחד של הפרויקט.</p>`;
  }
  return `<div class="fdet" style="--o:${objVar(k)}">
    <div class="fdet__h">
      <span class="fdet__cls" aria-hidden="true"></span>
      <b class="sap">${esc(t.name)}</b>
      <span class="fdet__he">${esc(t.he)}</span>
      <span class="fdet__k">${esc(objHe(k))}</span>
      <span class="grow"></span>
      <span class="fdet__mods">${mchips(t.modules, 'mchip--sm')}</span>
      <button class="btn btn--s" type="button" data-obj="${esc(t.name)}">
        ${icon('arrowUpRight', 13)} עמוד האובייקט</button>
    </div>
    <div class="fdet__grid">
      <div>
        <h5>מפתחות JOIN אמיתיים (${joins.reduce((n, l) => n + l.joins.length, 0)})</h5>
        <ul class="fdet__joins">${joins.map((l) => `<li>
          <span class="fdet__pair"><span class="sap">${esc(l.from)}</span>
            ${icon('arrowLeft', 12)}<span class="sap">${esc(l.to)}</span>
            ${l.hops === 2 ? `<em>דרך ${esc(l.via)}</em>` : ''}</span>
          ${l.joins.map((j) => `<code>${esc(j)}</code>`).join('')}</li>`).join('')
    || '<li class="empty">אין קשר ממודל בשרשרת הזאת.</li>'}</ul>
      </div>
      <div>
        <h5>נפתחת מ (${codes.length})</h5>
        <div class="fdet__codes">${codes.map((c) => `<button class="tcode" type="button"
          data-tcode="${esc(c)}"><span class="sap">${esc(c)}</span></button>`).join('')
    || '<span class="empty">אין טרנזקציה ממופה במילון.</span>'}</div>
        ${gaps.length ? `<p class="fdet__gap">${icon('alertTriangle', 12)}
          ${gaps.map((g) => `${esc(g.from)} ← ${esc(g.to)}`).join(' · ')}
          הוא גבול תהליך אמיתי ולא קשר. לא הומצא כאן מפתח.</p>` : ''}
      </div>
    </div>
  </div>`;
}

function screenHome() {
  const covered = UNIVERSE.nodes.filter((n) => n.tier !== 'planned').length;
  const planned = UNIVERSE.nodes.filter((n) => n.tier === 'planned').length;
  const evid = UNIVERSE.edges.filter((e) => e.strength === 'evidence');
  const spec = UNIVERSE.edges.filter((e) => e.strength !== 'evidence');
  /* "replaced" first: a table that is gone hurts more than one that needs a check */
  const HOT_RANK = { replaced: 0, action: 1 };
  const hot = MIG.filter((r) => r.s4Impact === 'action' || r.s4Impact === 'replaced')
    .sort((a, b) => HOT_RANK[a.s4Impact] - HOT_RANK[b.s4Impact] || b.fields - a.fields);
  const HOT_SHOWN = 10;
  const IMP_S = { compat: 'done', adapted: 'in-conversion', replaced: 'tested', action: 'in-analysis' };
  const shelf = BOOKS.map((b) => `<button class="spine" type="button" data-go="library"
      style="--m:${modVar(b.module)}" data-mod="${esc(b.module)}">
    <span class="spine__m">${esc(b.module)}</span>
    <span class="spine__t">${esc(b.title)}</span>
    <span class="spine__n">${b.chapters} · ${nf(b.sections)}</span>
  </button>`).join('');

  const body = `
  <div class="hflow" data-hflow>
    ${fieldHTML()}
    <div class="hpres" data-hpres aria-label="מודולים">
      <span class="hpres__guide" aria-hidden="true"></span>
      ${presHTML('PM', PM)}
      ${presHTML('PP-PI', PP)}
    </div>

    <section class="hsec hsec--command" data-hsec="0" data-hlabel="NEO COMMAND">
      <span class="hsec__ix" aria-hidden="true">01</span>
      <p class="hsec__eye">${esc(NEO.brand.name)} · ${esc(NEO.brand.product)} <i></i> NEO COMMAND</p>
      <h1 class="hsec__mega">מילון אחד<span class="hsec__mega2">לכל מסע ה-S/4HANA</span></h1>
      <p class="hsec__lede">כל טבלה, כל טרנזקציה, כל מפתח JOIN וכל הערת המרה,
        במקום אחד שעובד גם בלי רשת.</p>
      <div class="hstats">
        ${[[DICT_ROWS, 'שורות מילון'], [TABLES.length, 'טבלאות ייחודיות'],
    [TCODES.length, 'טרנזקציות'], [NEO.entities.length, 'ישויות ממודלות'],
    [FUNCS.length, 'BAPI / FM'], [BOOK_SECTIONS, 'סעיפי ספרייה']]
    .map(([n, l], i) => `<span class="hstat" style="--d:${i * 55}ms">
        <b>${nf(n)}</b><em>${esc(l)}</em></span>`).join('')}
      </div>
      <div class="hsec__cta">
        <button class="btn btn--brand" type="button" data-act="cmdk">
          ${icon('search', 15)} פתח חיפוש <kbd>⌘K</kbd></button>
        ${DEMO_QUERIES.slice(0, 3).map((q) => `<button class="qchip" type="button"
          data-demoq="${esc(q)}"><span class="sap">${esc(q)}</span></button>`).join('')}
      </div>
      <p class="hsec__hint">${icon('chevronDown', 13)} הסביבה מתארגנת מחדש בכל גלילה.
        105 הנקודות ברקע הן 105 הטבלאות האמיתיות, בצבע לפי סוג האובייקט.</p>
    </section>

    <section class="hsec hsec--universe" data-hsec="1" data-hlabel="SAP UNIVERSE">
      <span class="hsec__ix" aria-hidden="true">02</span>
      <p class="hsec__eye">SAP UNIVERSE <i></i> כיסוי כן</p>
      <h2 class="hsec__t">${UNIVERSE.nodes.length} מודולים.<br>${covered} עם תוכן,
        ${planned} עדיין לא.</h2>
      <div class="unigrid">${UNIVERSE.nodes.map((n, i) => `
        <button class="unode" type="button" data-tier="${esc(n.tier)}" style="--m:${modVar(n.id)};--d:${i * 34}ms"
          ${n.tier === 'planned' ? 'disabled aria-disabled="true"' : `data-go="${n.id === 'PM' ? 'pm' : n.id === 'PP-PI' ? 'pppi' : 'universe'}"`}>
          <span class="unode__c sap">${esc(n.id)}</span>
          <span class="unode__he">${esc(n.he)}</span>
          <span class="unode__n">${n.tables !== undefined
    ? `${n.tables} טבלאות · ${nf(n.fields)} שדות`
    : (booksFor(n.id).length ? `${booksFor(n.id).length} ספרים · ${nf(booksFor(n.id).reduce((a, b) => a + b.sections, 0))} סעיפים` : 'אין תוכן')}</span>
          <span class="unode__tier">${esc(UNIVERSE.legend[n.tier])}</span>
        </button>`).join('')}
      </div>
      <div class="uedges">
        <div class="uedges__c">
          <h5>${icon('check', 12)} קשרים מגובים בנתונים (${evid.length})</h5>
          <ul>${evid.map((e) => `<li><span class="sap">${esc(e.a)} ↔ ${esc(e.b)}</span>
            <span>${esc(e.note)}</span></li>`).join('')}</ul>
        </div>
        <div class="uedges__c uedges__c--spec">
          <h5>${icon('alertTriangle', 12)} ידע SAP שטרם מגובה כאן (${spec.length})</h5>
          <ul>${spec.map((e) => `<li><span class="sap">${esc(e.a)} ↔ ${esc(e.b)}</span>
            <span>${esc(e.note)}</span></li>`).join('')}</ul>
        </div>
      </div>
    </section>

    <section class="hsec hsec--continue" data-hsec="2" data-hlabel="CONTINUE">
      <span class="hsec__ix" aria-hidden="true">03</span>
      <p class="hsec__eye">CONTINUE <i></i> המשך מהיכן שעצרת</p>
      <h2 class="hsec__t">ארבעה אובייקטים פתוחים</h2>
      <div class="ocards">${RECENT.map((r, i) => {
    const rel = relsOf(r.name);
    const k = OBJ_OF[r.name] || null;
    return `<button class="ocard" type="button" data-obj="${esc(r.name)}" data-tilt
        style="--m:${modVar(r.t.modules[0])};--o:${objVar(k)};--d:${i * 70}ms">
      <span class="ocard__sheen" aria-hidden="true"></span>
      <span class="ocard__top">${mchips(r.t.modules, 'mchip--sm')}
        <span class="ocard__w">${esc(r.when)}</span></span>
      <span class="ocard__sap sap">${esc(r.name)}</span>
      <span class="ocard__he">${esc(r.t.he)}</span>
      <span class="ocard__cls"><i aria-hidden="true"></i>${esc(objHe(k))}</span>
      <span class="ocard__nums"><span><b>${r.t.fields}</b>שדות</span>
        <span><b>${rel.list.length}</b>קשרים</span>
        <span><b>${(TCODES_OF[r.name] || []).length}</b>טרנזקציות</span></span>
      <span class="ocard__foot"><span class="sap">${esc(r.tcode)}</span>
        ${icon('arrowUpRight', 14)}</span>
    </button>`;
  }).join('')}</div>
    </section>

    <section class="hsec hsec--explore" data-hsec="3" data-hlabel="EXPLORE">
      <span class="hsec__ix" aria-hidden="true">04</span>
      <p class="hsec__eye">EXPLORE <i></i> חומר ← עץ מוצר ← רשימת פעולות ← פק"ע ← דיווח</p>
      <h2 class="hsec__t">התהליך, כפי שהוא באמת<br>יושב במסד הנתונים</h2>
      <p class="hsec__lede">${FLOW.filter((l) => l.real).length} קשרים ממודלים מתוך ${FLOW.length}.
        שני המעברים שאינם ממודלים מסומנים כגבולות תהליך ולא כחיצים מומצאים.
        לחיצה על טבלה פותחת את מפתחות ה-JOIN המדויקים.</p>
      ${flowHTML()}
      ${densityHTML()}
    </section>

    <section class="hsec hsec--knowledge" data-hsec="4" data-hlabel="KNOWLEDGE">
      <span class="hsec__ix" aria-hidden="true">05</span>
      <p class="hsec__eye">KNOWLEDGE <i></i> הספרייה</p>
      <h2 class="hsec__t">${BOOKS.length} ספרים · ${nf(BOOK_SECTIONS)} סעיפים ·
        ${BOOK_HOURS} שעות קריאה</h2>
      <div class="shelf3">${shelf}</div>
      <div class="hsec__row">
        <button class="btn" type="button" data-go="library">${icon('bookOpen', 15)} פתח את הספרייה</button>
        <span class="hsec__note">${BOOK_CHAPTERS} פרקים ממופים למודולים דרך אותם קודים
          שמניעים את הניווט.</span>
      </div>
    </section>

    <section class="hsec hsec--trouble" data-hsec="5" data-hlabel="TROUBLESHOOT">
      <span class="hsec__ix" aria-hidden="true">06</span>
      <p class="hsec__eye">TROUBLESHOOT <i></i> נקודות תשומת לב</p>
      <h2 class="hsec__t">${hot.length} טבלאות שלא יעברו בשקט</h2>
      <p class="hsec__lede">אלה השורות שמסומנות במילון ההמרה כ"הוחלף" או כ"דורש פעולה".
        הטקסט הוא מילה במילה מהמילון, בלי פרשנות.</p>
      <ul class="hotlist">${hot.slice(0, HOT_SHOWN).map((r, i) => `<li style="--d:${i * 45}ms">
        <span class="hot__s" data-s="${esc(IMP_S[r.s4Impact])}"><i aria-hidden="true"></i>
          ${esc(IMPACT_HE[r.s4Impact])}</span>
        <span class="hot__sap sap">${esc(r.name)}</span>
        <span class="hot__he">${esc(r.he)}</span>
        <span class="hot__note">${esc(r.s4Note)}</span>
        <span class="hot__alt">${(r.s4AltTable.length || r.s4AltTcode.length)
    ? `<span class="sap">${esc([...r.s4AltTable, ...r.s4AltTcode].join(' · '))}</span>`
    : '<span class="empty">אין חלופה במילון</span>'}</span>
        <button class="hot__go" type="button" data-obj="${esc(r.name)}"
          aria-label="פתח את ${esc(r.name)}">${icon('arrowUpRight', 14)}</button>
      </li>`).join('')}</ul>
      <p class="hsec__note">${hot.length - HOT_SHOWN} שורות נוספות באותה רשימה נפתחות בסביבת המודול · ${MIG.filter((r) => r.s4Impact === 'replaced').length} מסומנות "הוחלף" ו-${MIG.filter((r) => r.s4Impact === 'action').length} "דורש פעולה".</p>
    </section>

    <section class="hsec hsec--s4" data-hsec="6" data-hlabel="ECC → S/4HANA">
      <span class="hsec__ix" aria-hidden="true">07</span>
      <p class="hsec__eye">ECC → S/4HANA <i></i> תמונת המעבר</p>
      <h2 class="hsec__t">${DICT_ROWS} שורות מילון,<br>ארבע דרגות השפעה</h2>
      <div class="impwall">${['compat', 'adapted', 'replaced', 'action'].map((k, i) => `
        <div class="impcol" data-s="${esc(IMP_S[k])}" style="--d:${i * 80}ms">
          <b class="impcol__n">${impactCounts[k] || 0}</b>
          <span class="impcol__l"><i aria-hidden="true"></i>${esc(IMPACT_HE[k])}</span>
          <span class="impcol__bar" aria-hidden="true"
            style="--p:${Math.round(((impactCounts[k] || 0) / DICT_ROWS) * 100)}"></span>
          <span class="impcol__p">${Math.round(((impactCounts[k] || 0) / DICT_ROWS) * 100)}%</span>
        </div>`).join('')}
      </div>
      <p class="hsec__note">מקור: ${esc(NEO.migrationSource || 'מילון ההמרה של הפרויקט')}
        האחוזים הם חלוקה של אותן ${DICT_ROWS} שורות, ולא הערכה.
        גם ברקע הנקודות מסודרות לפי אותה דרגת השפעה, אך הצבע נשאר צבע סוג האובייקט.</p>
      <div class="hsec__cta">
        <button class="btn btn--brand" type="button" data-go="universe">
          ${icon('boxes', 15)} יקום SAP</button>
        <button class="btn" type="button" data-go="erd">${icon('gitBranch', 15)} מודל נתונים</button>
        <button class="btn" type="button" data-go="discovery">${icon('workflow', 15)} מסע גילוי</button>
      </div>
    </section>

    <nav class="hdots" data-hdotnav aria-label="מקטעי העמוד">
      ${['NEO COMMAND', 'SAP UNIVERSE', 'CONTINUE', 'EXPLORE', 'KNOWLEDGE', 'TROUBLESHOOT', 'ECC → S/4HANA']
    .map((l, i) => `<button type="button" data-hjump="${i}" aria-label="${esc(l)}">
        <span class="hdots__n">${String(i + 1).padStart(2, '0')}</span>
        <span class="hdots__l">${esc(l)}</span></button>`).join('')}
    </nav>
  </div>`;
  return shell('home', { mode: 'experience', crumbs: ['בית'], active: 'אחזקה · PM', body });
}

/* ------------------------------------------------------- NAVIGATION STATES */
/* One screen, nine states. Switching state animates the same DOM, so the
   spring feels physical and stays interruptible. */
const NAV_STATES = [
  { id: 'expanded', l: 'מורחב' }, { id: 'compact', l: 'מצומצם' },
  { id: 'hidden', l: 'מוסתר' }, { id: 'peek', l: 'הצצה' },
  { id: 'hover', l: 'ריחוף' }, { id: 'active', l: 'פעיל' },
  { id: 'search', l: 'חיפוש' }, { id: 'context', l: 'הקשר' },
  { id: 'mobile', l: 'מובייל' },
];
const NAV_STATE_NOTE = {
  expanded: 'המצב המלא. קבוצות, ספירות אמיתיות, מדף הקשר בתחתית.',
  compact: 'רוחב הרכיב משתנה פעם אחת, ואז כל הפיקסלים חוזרים למקום בקפיץ (FLIP). אפשר ללחוץ שוב באמצע.',
  hidden: 'הרכיב יוצא מהמסך על transform. שטח העבודה מקבל את כל הרוחב.',
  peek: 'רצועת קצה של 14px. ריחוף מחזיר את הרכיב פנימה בלי לתפוס מקום בפריסה.',
  hover: 'שכבת הקשר עם תוכן אמיתי: טבלאות, טרנזקציות, ספרים והאובייקט האחרון שנפתח.',
  active: 'מחוון יחיד שנוסע. הוא נמתח קלות לכיוון התנועה ומתייצב, וצבוע בגוון המודול.',
  search: 'החיפוש צומח מתוך אותה משבצת של הפעולה המהירה, מסנן את הרשימה שמתחתיו, ורק אחר כך מציע לעלות למשטח המלא.',
  context: 'המדף מתחלף להקשר של האובייקט הנוכחי: הקשרי מודול, טרנזקציות ומפתחות JOIN.',
  mobile: 'אותו מודל בגיליון תחתון, יעדי מגע 44px ומעלה.',
};

function screenNav() {
  const body = `
    <section class="navdoc">
      <span class="navdoc__ix" aria-hidden="true">NAV</span>
      <p class="hsec__eye">NAVIGATION <i></i> תשעה מצבים, גוף אחד</p>
      <h1 class="navdoc__t">הניווט הוא<br>המוצר עצמו</h1>
      <p class="lede">כל מצב מחליף את אותו DOM. שינוי הרוחב נבלע ב-FLIP כך שהפריסה קופצת
        פעם אחת בלי שרואים, והפיקסלים חוזרים בקפיץ שאפשר להפריע לו באמצע.</p>

      <div class="navstates" role="group" aria-label="מצבי ניווט">
        ${NAV_STATES.map((s) => `<button class="nstate" type="button" data-navstate="${s.id}"
          aria-pressed="${s.id === 'expanded'}"><b>${esc(s.l)}</b><span>${s.id}</span></button>`).join('')}
      </div>
      <p class="navdoc__live" data-navnote>${esc(NAV_STATE_NOTE.expanded)}</p>

      <div class="navnotes">
        <div class="nnote"><h4>${icon('activity', 13)} מחוון נוסע</h4>
          <p>אלמנט אחד עם transform בלבד, נמתח לכיוון התנועה ומתייצב.
            אין החלפת רקע לפי פריט.</p></div>
        <div class="nnote"><h4>${icon('layers', 13)} הרחבת קבוצה</h4>
          <p>FLIP על הפריטים ופיצוי גלילה על הכותרת שנלחצה. מיקום הגלילה לא מתאפס לעולם.</p></div>
        <div class="nnote"><h4>${icon('lightbulb', 13)} שכבת ריחוף</h4>
          <p>${TABLES.length} טבלאות, ${TCODES.length} טרנזקציות ו-${BOOKS.length} ספרים
            אמיתיים מזינים את התצוגה המקדימה.</p></div>
        <div class="nnote"><h4>${icon('command', 13)} מקלדת</h4>
          <p>חצים, Home/End, Enter, Esc, ⌘K. יעדי מגע 44px ומעלה, RTL מקורי.</p></div>
      </div>

      <div class="navmeasure">
        <h3>מה באמת זז</h3>
        <ul class="measures">
          <li><b>transform</b><span>מחוון, קבוצות, מדף, שכבת ריחוף, כניסה למודול</span></li>
          <li><b>opacity</b><span>תוויות במעבר למצומצם, החלפת פאנלים במדף</span></li>
          <li><b>אף אחד מהם</b><span>גובה, רוחב, top/left, filter, box-shadow בזמן תנועה</span></li>
        </ul>
        <p class="hint">${NAV_ITEMS.length} פריטי ניווט בשש קבוצות · ${Object.keys(NAV_COUNT).length}
          מהם נושאים ספירה מגובה בנתונים, השאר מסומנים במפורש כחסרי ספירה.</p>
      </div>
    </section>`;
  return shell('nav', { mode: 'experience', crumbs: ['בית', 'ניווט'], active: 'אחזקה · PM', body });
}

/* ------------------------------------------------------- SEARCH / COMMAND */
const DEMO_QUERIES = ['IW31', 'MARA', 'MRP', 'Process Order', 'Equipment'];

function cmdHTML(uid, { placeholder = 'חפש טבלה, טרנזקציה, BAPI, ספר…', q = '' } = {}) {
  return `<div class="cmdwrap" data-cmd="${uid}">
    <div class="cmd">
      <span class="cmd__i" aria-hidden="true">${icon('search', 18)}</span>
      <input class="cmd__input" type="search" value="${esc(q)}" autocomplete="off"
        spellcheck="false" placeholder="${esc(placeholder)}" role="combobox"
        aria-expanded="false" aria-controls="${uid}-list" aria-label="חיפוש אוניברסלי">
      <span class="cmd__live" data-role="live" aria-hidden="true"></span>
      <button class="cmd__clear" type="button" data-act="clear" aria-label="נקה" hidden>${icon('x', 14)}</button>
      <span class="cmd__k" aria-hidden="true"><kbd>⌘</kbd><kbd>K</kbd></span>
    </div>
    <div class="cmd__chips" role="group" aria-label="שאילתות הדגמה">
      <span class="cmd__chipsl">נסה</span>
      ${DEMO_QUERIES.map((x) => `<button class="chip" type="button" data-q="${esc(x)}">${esc(x)}</button>`).join('')}
    </div>
    <div class="cmd__panel" data-open="false">
      <nav class="cmd__lanes" data-role="lanes" aria-label="מסלולי תוצאה"></nav>
      <div class="cmd__list" id="${uid}-list" role="listbox" aria-label="תוצאות" tabindex="-1"></div>
      <div class="cmd__bar">
        <span data-role="count"></span><span class="grow"></span>
        <span class="keys"><kbd>↑</kbd><kbd>↓</kbd> ניווט</span>
        <span class="keys"><kbd>Enter</kbd> פתיחה</span>
        <span class="keys"><kbd>Esc</kbd> סגירה</span>
      </div>
    </div>
  </div>`;
}

/* One row carries everything a consultant needs before deciding to open it:
   object class, module, description, real counts, a real JOIN, the books that
   cover it, and the three places it can travel to next. */
function resultRowHTML(uid, r, i) {
  const joins = r.joins || [];
  return `<div class="res" role="option" id="${uid}-r${i}" data-i="${i}" aria-selected="false"
      data-kind="${r.kind}" data-id="${esc(r.id)}"
      style="${r.modules[0] ? `--m:${modVar(r.modules[0])};` : ''}--o:${r.obj ? `var(--obj-${r.obj})` : 'var(--rel-inferred)'}">
    <span class="res__spine" aria-hidden="true"></span>
    <span class="res__i" aria-hidden="true">${icon(r.ico, 16)}</span>
    <div class="res__main">
      <div class="res__l1">
        <b class="${r.mono ? 'sap' : ''}">${r.title}</b>
        <span class="res__type">${esc(r.type)}</span>
        ${r.obj ? `<span class="res__cls"><i aria-hidden="true"></i>${esc(objHe(r.obj))}</span>` : ''}
        ${r.modules.length ? `<span class="res__mods">${mchips(r.modules, 'mchip--sm')}</span>`
    : '<span class="res__mods res__mods--none">ללא שיוך מודול</span>'}
      </div>
      <p class="res__d">${r.desc}</p>
      <p class="res__f">${r.facts.map((f) => `<span>${esc(f)}</span>`).join('')}</p>
      <p class="res__rel ${r.relOk ? '' : 'is-none'}">${icon('gitBranch', 12)}<span>${esc(r.rel)}</span></p>
      ${joins.length ? `<div class="res__joins">${joins.map((j) => `<code style="--r:${relVar(j.card)}">
        <i aria-hidden="true"></i>${esc(j.join)}<em>${esc(j.card)}</em></code>`).join('')}</div>` : ''}
      ${r.knowledge.length ? `<div class="res__kn">
        <span class="res__knh">${icon('bookOpen', 12)} ידע קשור</span>
        ${r.knowledge.map((k) => `<span class="res__knb" style="--m:${modVar(k.m)}">
          <i aria-hidden="true"></i>${esc(k.t)} <em>${esc(k.s)}</em></span>`).join('')}
      </div>` : ''}
    </div>
    <div class="res__acts">${r.actions.map((a) => `<button class="ract" type="button"
      data-ract="${a.a}" data-v="${esc(a.v)}">${icon(a.i, 13)}<span>${esc(a.l)}</span></button>`).join('')}</div>
  </div>`;
}

/* the AI lane · a different material on purpose, so it never reads as a result */
function aiLaneHTML(ai, q) {
  if (!ai) return '';
  return `<section class="ailane" aria-label="NEO AI · בסיס הידע לשאילתה">
    <header class="ailane__h">
      <span class="ailane__k">${icon('sparkles', 14)} NEO AI</span>
      <b>על מה אפשר לבסס תשובה ל-<span class="sap">${esc(q)}</span></b>
      <span class="grow"></span>
      <span class="ailane__badge">${icon('alertTriangle', 11)} ידע מהמאגר · לא בדיקה חיה במערכת SAP</span>
    </header>
    <div class="ailane__m">${ai.metrics.map((m) => `<span class="aim${m.n ? '' : ' aim--0'}">
      <span class="aim__i" aria-hidden="true">${icon(m.k, 13)}</span>
      <b>${nf(m.n)}</b><em>${esc(m.l)}</em></span>`).join('')}</div>
    ${ai.tabs.length ? `<div class="ailane__src">
      <span class="ailane__srch">מקורות</span>
      ${ai.tabs.map((t) => `<button class="asrc" type="button" data-obj="${esc(t.name)}"
        style="--o:${oVar(t.name)}"><i aria-hidden="true"></i><span class="sap">${esc(t.name)}</span></button>`).join('')}
      ${ai.books.map((b) => `<button class="asrc asrc--b" type="button" data-go="library"
        style="--m:${modVar(b.module)}"><i aria-hidden="true"></i>${esc(b.title)}</button>`).join('')}
      ${ai.sapNotes.length ? `<span class="asrc asrc--n">${icon('alertTriangle', 11)}
        SAP Note ${esc(ai.sapNotes.slice(0, 3).join(' · '))}<em>מצוטט מהמאגר</em></span>` : ''}
    </div>` : ''}
    ${ai.asks.length ? `<div class="ailane__ask">${ai.asks.map((a) => `<button class="aask" type="button"
      data-ract="${a.a}" data-v="${esc(a.v)}">${icon('sparkles', 11)}${esc(a.l)}
      ${icon('arrowUpRight', 11)}</button>`).join('')}</div>` : ''}
  </section>`;
}

function suggestHTML(uid) {
  const rows = [
    ...RECENT.slice(0, 2).map((r) => tableRecord(r.t, '')),
    tcodeRecord('IW31', ''),
    tableRecord(TABLE.get('MARA'), ''),
  ];
  let i = 0;
  return `<div class="cmd__grp"><header>${icon('clock', 13)}<span>התחלות מהירות</span>
    <b>${rows.length}</b></header>
    ${rows.map((r) => resultRowHTML(uid, r, i++)).join('')}</div>`;
}

function screenSearch() {
  const body = `
    <section class="cmdstage" data-cmdhost>
      <div class="cmdstage__head">
        <div>
          <p class="hsec__eye">NEO COMMAND <i></i> משטח אחד לכל השאלות</p>
          <h1 class="cmdstage__t">הקלד, <em>המשטח</em> מגיב</h1>
          <p class="lede">שדה החיפוש הוא אלמנט ריבוני: הוא לא נטען מחדש, לא קופץ, ולא מאבד מיקוד.
            כל תוצאה נושאת סוג, מודול, ספירות אמיתיות, מפתח JOIN וידע קשור.</p>
        </div>
        <div class="cmdstage__nums">
          ${[[TABLES.length, 'טבלאות'], [TCODES.length, 'טרנזקציות'],
    [NEO.entities.length, 'ישויות'], [FUNCS.length, 'BAPI / FM'], [BOOKS.length, 'ספרים']]
    .map(([n, l]) => `<span><b>${nf(n)}</b><em>${esc(l)}</em></span>`).join('')}
        </div>
      </div>
      ${cmdHTML('d-cmd')}
      <div class="respond" data-respond>
        <div class="respond__h"><h3>המפה מגיבה לשאילתה</h3>
          <span class="respond__meta" data-respondmeta>אין שאילתה, הכול מואר</span></div>
        <div class="respond__grid">
          ${UNIVERSE.nodes.map((nd) => `<span class="rnode" data-rnode="${esc(nd.id)}"
            data-tier="${nd.tier}" style="--m:${modVar(nd.id)}">
            <b>${esc(nd.id)}</b><span>${esc(nd.he)}</span>
            ${nd.tier === 'planned' ? '<em>בקרוב</em>'
    : `<em>${nd.tables ? `${nd.tables} טבלאות` : `${(booksFor(nd.id)[0] || {}).chapters || ''} פרקים`}</em>`}
          </span>`).join('')}
        </div>
        <div class="respond__tables" data-respondtables></div>
      </div>
    </section>`;
  return shell('search', { mode: 'experience', crumbs: ['בית', 'חיפוש'], active: 'אחזקה · PM', body });
}

/* --------------------------------------------------------- WORKSPACE (WORK) */
function tableRowHTML(t, code) {
  const r = relsOf(t.name);
  const mig = (MIG_BY_TABLE[t.name] || [])[0];
  const maxF = 12;
  return `<tr data-obj="${esc(t.name)}" style="--o:${oVar(t.name)}">
    <td class="c-name"><button type="button" class="sap" data-obj="${esc(t.name)}">
      <i class="odot" aria-hidden="true" title="${esc(oHe(t.name))}"></i>${esc(t.name)}</button>
      ${SHARED.has(t.name) ? `<span class="dual" title="משותפת PM ∩ PP-PI">${icon('gitBranch', 11)}</span>` : ''}</td>
    <td class="c-he">${esc(t.he)}</td>
    <td class="c-en lt">${esc(t.en)}</td>
    <td class="c-n num"><span class="cbar" aria-hidden="true" style="--f:${Math.min(1, t.fields / maxF)}"></span>${t.fields}</td>
    <td class="c-n num">${t.tcodes.length}</td>
    <td class="c-n num">${r.modelled ? r.list.length : '<span class="none">—</span>'}</td>
    <td class="c-tc sap">${esc((TCODES_OF[t.name] || t.tcodes).slice(0, 3).join(' '))}</td>
    <td class="c-imp">${mig ? `<span class="imp" data-imp="${mig.s4Impact}">${esc(IMPACT_HE[mig.s4Impact])}</span>` : '<span class="imp" data-imp="none">אין רשומה</span>'}</td>
  </tr>`;
}

function workspaceBody(code, meta) {
  const tables = TABLES.filter((t) => t.modules.includes(code))
    .sort((a, b) => b.fields - a.fields || a.name.localeCompare(b.name));
  const topics = code === 'PM' ? NEO.pmTopics : code === 'PP-PI' ? NEO.ppTopics : [];
  const books = booksFor(code);
  const codes = uniq(tables.flatMap((t) => TCODES_OF[t.name] || [])).sort();
  const noDict = !topics.length;

  const shareOf = (n) => Math.round((n / Math.max(1, PM.tables + PP.tables)) * 100);
  const impHere = {};
  tables.forEach((t) => { const k = IMPACT_OF[t.name]; if (k) impHere[k] = (impHere[k] || 0) + 1; });
  const IMP_S = { compat: 'done', adapted: 'in-conversion', replaced: 'tested', action: 'in-analysis' };

  return `
    <header class="wshero" data-flip="hero-${esc(code)}" style="--m:${modVar(code)}">
      <span class="boxfx" aria-hidden="true"><i class="wshero__hue"></i><i class="wshero__wash"></i></span>
      <div class="wshero__id">
        <span class="wshero__chip">${mchip(code)}</span>
        <h1>${esc(modHe(code))}</h1>
        <span class="wshero__en">${esc(meta.en || '')}</span>
      </div>
      <div class="wshero__nums">
        ${noDict
    ? `<span class="ws-n"><b>${nf(books.reduce((n, b) => n + b.sections, 0))}</b><span>סעיפים בספרייה</span></span>
             <span class="ws-n"><b>${books.length}</b><span>ספרים</span></span>
             <span class="ws-n ws-n--none"><b>—</b><span>מילון טכני בקרוב</span></span>`
    : `<span class="ws-n"><b>${nf(meta.tables)}</b><span>טבלאות</span></span>
             <span class="ws-n"><b>${nf(meta.fields)}</b><span>שדות</span></span>
             <span class="ws-n"><b>${nf(meta.topics)}</b><span>נושאים</span></span>
             <span class="ws-n"><b>${nf(codes.length)}</b><span>טרנזקציות</span></span>
             <span class="ws-n"><b>${nf(books.length)}</b><span>ספרים</span></span>`}
      </div>
      ${noDict ? '' : `<div class="wshero__cls">
        ${clsBar(tables)}
        <span class="wshero__share">${shareOf(tables.length)}% מהמילון המאוחד ·
          ${tables.filter((t) => SHARED.has(t.name)).length} טבלאות משותפות</span>
      </div>`}
    </header>

    ${noDict ? `<section class="nodict">
      <p class="warnbar">${icon('alertTriangle', 14)}
        למודול ${esc(code)} אין מילון טכני בפרויקט, רק ספרייה. אין כאן מספרי טבלאות או שדות,
        כי אין נתון שמגבה אותם.</p>
      ${secHead('קיים', 'מה כן קיים למודול הזה', `${books.length} ספרים · ${nf(books.reduce((n, b) => n + b.sections, 0))} סעיפים`, 'bookOpen')}
      <div class="libshelf libshelf--sm">${books.map((b, i) => bookCoverHTML(b, i)).join('')
    || '<p class="empty">אין ספר משויך למודול זה.</p>'}</div>
      ${secHead('סמוך', 'המודולים שכן נושאים מילון טכני', '', 'layers')}
      <div class="nodict__go">
        <button class="btn" type="button" data-go="pm">${icon('wrench', 14)} אחזקה · PM
          <span class="nodict__n">${PM.tables} טבלאות</span></button>
        <button class="btn" type="button" data-go="pppi">${icon('workflow', 14)} ייצור · PP-PI
          <span class="nodict__n">${PP.tables} טבלאות</span></button>
        <button class="btn" type="button" data-go="universe">${icon('boxes', 14)} מפת הכיסוי המלאה</button>
      </div>
    </section>` : ''}

    <div class="wstoolbar">
      <div class="seg2" role="group" aria-label="תצוגה">
        <button type="button" aria-pressed="true" data-wsview="tables">טבלאות
          <b>${tables.length}</b></button>
        <button type="button" aria-pressed="false" data-wsview="tcodes">טרנזקציות
          <b>${codes.length}</b></button>
        <button type="button" aria-pressed="false" data-wsview="topics">נושאים
          <b>${topics.length}</b></button>
        <button type="button" aria-pressed="false" data-wsview="books">ספרים
          <b>${books.length}</b></button>
      </div>
      <label class="wsfilter">
        <span aria-hidden="true">${icon('search', 14)}</span>
        <input type="search" placeholder="סנן בטבלה…" aria-label="סינון" data-wsfilter>
      </label>
      <span class="grow"></span>
      ${Object.keys(impHere).length ? `<span class="wsimp">${['compat', 'adapted', 'replaced', 'action']
    .filter((k) => impHere[k]).map((k) => `<span data-s="${IMP_S[k]}"><i aria-hidden="true"></i>${esc(IMPACT_HE[k])}<b>${impHere[k]}</b></span>`).join('')}</span>` : ''}
      <span class="wscount" data-wscount>${tables.length} שורות</span>
    </div>

    <div class="wsview" data-wsview-body="tables">
      <table class="dt">
        <thead><tr>
          <th>טבלה</th><th>תיאור</th><th>Description</th>
          <th class="num">שדות</th><th class="num">T-codes</th><th class="num">קשרים</th>
          <th>נפתחת מ</th><th>S/4</th>
        </tr></thead>
        <tbody>${tables.map((t) => tableRowHTML(t, code)).join('')}</tbody>
      </table>
      ${!tables.length ? '<p class="empty">אין טבלאות במילון עבור מודול זה.</p>' : ''}
    </div>

    <div class="wsview" data-wsview-body="tcodes" hidden>
      <div class="tcgrid">${codes.map((c) => `<button class="tc" type="button" data-tcode="${esc(c)}">
        <span class="sap">${esc(c)}</span>
        <span class="tc__n">${(TCODE_INDEX[c] || []).length} טבלאות</span>
        <span class="tc__t">${esc((TCODE_INDEX[c] || []).slice(0, 3).join(' · '))}</span>
      </button>`).join('')}</div>
      ${!codes.length ? '<p class="empty">אין טרנזקציות מגובות לנתונים במודול זה.</p>' : ''}
    </div>

    <div class="wsview" data-wsview-body="topics" hidden>
      <ul class="topiclist">${(() => {
    const mx = Math.max(...topics.map((t) => t.tables), 1);
    return topics.map((t) => `<li style="--m:${modVar(code)}">
        <span class="ti">${String(t.idx).padStart(2, '0')}</span>
        <span class="tt">${esc(t.title)}</span>
        <span class="tk" aria-hidden="true"><i style="--f:${t.tables / mx}"></i></span>
        <span class="tn">${t.tables} טבלאות</span></li>`).join('');
  })()}</ul>
      ${!topics.length ? '<p class="empty">אין נושאי מילון למודול זה בפרויקט.</p>' : ''}
    </div>

    <div class="wsview wsview--pad" data-wsview-body="books" hidden>
      <div class="libshelf libshelf--sm">${books.map((b, i) => bookCoverHTML(b, i)).join('')}</div>
      ${!books.length ? '<p class="empty">אין ספר משויך למודול זה.</p>' : ''}
    </div>`;
}

function screenModule(code, meta) {
  return shell(`ws-${code}`, {
    mode: 'work',
    crumbs: ['בית', modHe(code)],
    active: code === 'PM' ? 'אחזקה · PM' : code === 'PP-PI' ? 'ייצור · PP-PI' : 'מודל נתונים',
    body: workspaceBody(code, meta),
  });
}

/* ----------------------------------------------------------- OBJECT DETAIL */
function objectBody(name) {
  const t = TABLE.get(name);
  const r = relsOf(name);
  const codes = TCODES_OF[name] || [];
  const migs = MIG_BY_TABLE[name] || [];
  const sumNotes = uniq([...NEO.pmTables, ...NEO.ppTables]
    .filter((x) => x.name === name && x.sumNote).map((x) => x.sumNote));
  const books = uniq(t.modules.flatMap((m) => booksFor(m)));

  const imp = IMPACT_OF[name] || null;
  const IMP_S = { compat: 'done', adapted: 'in-conversion', replaced: 'tested', action: 'in-analysis' };
  const orb = orbitSVG(name, { max: 12 });

  return `
    <header class="objhead2" style="--m:${modVar(t.modules[0])};--o:${oVar(name)}"
        data-objhead="${esc(name)}">
      <span class="boxfx" aria-hidden="true"><i class="objhead2__band"></i><i class="objhead2__wash"></i></span>
      <div class="objhead2__id">
        <p class="objhead2__eye">${icon('table', 12)} טבלה<i></i>${esc(oHe(name))}</p>
        <h1 class="sap">${esc(t.name)}</h1>
        <p class="objhead2__he">${esc(t.he)}</p>
        <p class="objhead2__en lt">${esc(t.en)}</p>
        <div class="objhead2__mods">${mchips(t.modules)}
          ${SHARED.has(name) ? `<button class="dualtag" type="button" data-ract="flow" data-v="${esc(name)}">
            ${icon('gitBranch', 11)} משותפת · שני ההקשרים מוצגים</button>` : ''}
          ${imp ? `<span class="imp" data-imp="${esc(imp)}">${esc(IMPACT_HE[imp])}</span>` : ''}</div>
        <div class="objhead2__nums">
          <span><b>${t.fields}</b><em>שדות</em></span>
          <span><b>${codes.length}</b><em>טרנזקציות</em></span>
          <span><b>${r.modelled ? r.list.length : '—'}</b><em>קשרים</em></span>
          <span><b>${t.fiori.length}</b><em>Fiori</em></span>
          <span><b>${t.contexts.length}</b><em>הקשרי מודול</em></span>
          <span><b>${books.length}</b><em>ספרים</em></span>
        </div>
        <div class="objhead2__acts">
          <button class="btn btn--brand" type="button" data-ract="flow" data-v="${esc(name)}">
            ${icon('workflow', 14)} מסע גילוי</button>
          <button class="btn" type="button" data-ract="erd" data-v="${esc(name)}">
            ${icon('gitBranch', 14)} ERD ממוקד</button>
          ${t.fiori[0] ? `<span class="objhead2__fiori">${icon('appWindow', 12)}
            <span class="lt">${esc(t.fiori[0])}</span></span>` : ''}
        </div>
      </div>
      ${orb ? `<figure class="objhead2__orb" data-orbhost>
        ${orb}
        <figcaption>${r.list.length} קשרים · הקו צבוע לפי היחס במילון
          <i style="--r:var(--rel-1-1)"></i>1:1 <i style="--r:var(--rel-n-1)"></i>N:1</figcaption>
        <div class="orbpeek" data-orbpeek hidden></div>
      </figure>` : ''}
    </header>

    ${SHARED.has(name) ? dualIdentityHTML(name) : ''}

    <nav class="objtabs" aria-label="מקטעי אובייקט">
      ${NEO.portalSections.map((s, i) => `<button class="objtab" type="button"
        aria-pressed="${i === 0}">${esc(s)}</button>`).join('')}
    </nav>

    <div class="objgrid">
      <section class="opanel">
        ${secHead('הקשר', `הקשרי מודול (${t.contexts.length})`, '', 'layers')}
        <table class="dt dt--tight"><thead><tr><th>מודול</th><th>נושא</th><th>טרנזקציות</th><th>הערת S/4 מהמאגר</th></tr></thead>
          <tbody>${t.contexts.map((c) => `<tr style="--m:${modVar(c.module)}">
            <td>${mchip(c.module, 'mchip--sm')}</td><td>${esc(c.topic)}</td>
            <td class="sap">${esc(c.tcodes)}</td><td>${esc(c.s4)}</td></tr>`).join('')}</tbody></table>
      </section>

      <section class="opanel">
        ${secHead('מודל', 'קשרים ומפתחות JOIN',
    r.modelled ? `${r.list.filter((x) => x.card === '1:1').length} × 1:1 · ${r.list.filter((x) => x.card !== '1:1').length} × N:1` : '', 'gitBranch')}
        ${r.modelled ? `<table class="dt dt--tight dt--rel"><thead><tr>
          <th>תפקיד</th><th>טבלה</th><th>יחס</th><th>JOIN</th><th>הסבר</th></tr></thead>
          <tbody>${r.list.map((x) => `<tr data-relrow="${esc(x.table)}" style="--r:${relVar(x.card)};--o:${oVar(x.table)}">
            <td>${x.role === 'parent' ? 'אב' : 'בן'}</td>
            <td><button class="sap link" type="button" data-obj="${esc(x.table)}">
              <i class="odot" aria-hidden="true"></i>${esc(x.table)}</button></td>
            <td class="num"><span class="cardk">${esc(x.card)}</span></td>
            <td><code>${esc(x.join)}</code></td>
            <td>${esc(x.desc)}</td></tr>`).join('')}</tbody></table>`
    : '<p class="empty">הטבלה לא ממודלת ב-ERD של הפרויקט, אין קשרים להציג.</p>'}
      </section>

      <section class="opanel">
        ${secHead('כניסה', `טרנזקציות (${codes.length})`, '', 'terminal')}
        <div class="tcgrid tcgrid--sm">${codes.map((c) => `<button class="tc" type="button" data-tcode="${esc(c)}">
          <span class="sap">${esc(c)}</span><span class="tc__n">${(TCODE_INDEX[c] || []).length}</span></button>`).join('')}</div>
      </section>

      <section class="opanel">
        ${secHead('אפליקציה', 'Fiori', '', 'appWindow')}
        <ul class="fiorilist">${t.fiori.map((f) => `<li><i aria-hidden="true">${icon('appWindow', 13)}</i>
          <span class="lt">${esc(f)}</span></li>`).join('') || '<li class="empty">אין אפליקציה מופיעה במילון.</li>'}</ul>
      </section>

      <section class="opanel opanel--wide">
        ${secHead('המרה', 'ECC → S/4HANA · מה שמגובה בנתונים',
    `${migs.length} שורות מילון${imp ? ` · ${esc(IMPACT_HE[imp])}` : ''}`, 'alertTriangle')}
        <ul class="notes">${migs.map((m) => `<li data-imp="${m.s4Impact}">
          <span class="imp" data-imp="${m.s4Impact}">${esc(IMPACT_HE[m.s4Impact])}</span>
          <span class="notetopic">${esc(m.topic)} · ${esc(m.mod.toUpperCase())}</span>
          <p>${esc(m.s4Note)}</p>
          ${m.s4Mentions.length ? `<p class="mentions">אזכורים טכניים בהערה: <code>${esc(m.s4Mentions.join(', '))}</code>
            <em>לא הוצלבו מול המילון</em></p>` : ''}
          ${m.s4Notes.length ? `<p class="sapnotes">SAP Note: <code>${esc(m.s4Notes.join(', '))}</code>
            <em>מצוטט מילולית מההערה</em></p>` : ''}
        </li>`).join('')}</ul>
        ${sumNotes.length ? `<div class="sumnote"><h3>הערת SUM</h3>${sumNotes.map((s) => `<p>${esc(s)}</p>`).join('')}</div>` : ''}
        <p class="evidence">${icon('check', 12)} מקור: הערות S/4HANA מועתקות מילה במילה מהמאגר. הסיווג נגזר מפתיח ההערה בלבד.</p>
      </section>

      <section class="opanel opanel--wide">
        <h2>${icon('bookOpen', 14)} ידע קשור</h2>
        <ul class="booklist">${books.map((b) => `<li style="--m:${modVar(b.module)}">
          <i aria-hidden="true"></i><span class="bt">${esc(b.title)}</span>
          <span class="bs">${b.chapters} פרקים · ${nf(b.sections)} סעיפים</span>
          <span class="bm">${esc(b.module)}</span></li>`).join('')}</ul>
      </section>
    </div>`;
}

/* ---------------------------------------------------- neighbour previewing */
/* The orbit and the relation table are two views of one list, so hovering
   either one lights the other. The preview is real dictionary content, and it
   says out loud what a click will do. */
function neighbourPeekHTML(name, rel) {
  const t = TABLE.get(name);
  const e = ENT.get(name);
  const src = t || e;
  if (!src) {
    return `<div class="opk"><b class="sap">${esc(name)}</b>
      <span class="opk__he">אין רשומה במילון הפרויקט.</span></div>`;
  }
  return `<div class="opk" style="--o:${oVar(name)}">
    <span class="opk__cls" aria-hidden="true"></span>
    <span class="opk__h"><b class="sap">${esc(name)}</b>
      <span class="opk__k">${esc(oHe(name))}</span></span>
    <span class="opk__he">${esc(src.he)}</span>
    ${t ? `<span class="opk__n"><b>${t.fields}</b>שדות<b>${(TCODES_OF[name] || []).length}</b>טרנזקציות<b>${relsOf(name).list.length}</b>קשרים</span>
      <span class="opk__m">${mchips(t.modules, 'mchip--sm')}</span>` : ''}
    ${rel ? `<code style="--r:${relVar(rel.card)}"><i aria-hidden="true"></i>${esc(rel.join)}</code>
      <span class="opk__d">${esc(rel.card)} · ${esc(rel.desc)}</span>` : ''}
    <span class="opk__go">${icon('arrowUpRight', 12)} פתח את ${esc(name)}</span>
  </div>`;
}

function lightNeighbour(scope, name) {
  const anchor = [...$$(scope, '[data-objhead],[data-hopstage] .hop')][0];
  const focus = anchor && anchor.dataset ? (anchor.dataset.objhead || '') : '';
  const rel = focus ? relsOf(focus).list.find((x) => x.table === name) : null;
  $$(scope, '.orb').forEach((svg) => { svg.dataset.dim = '1'; });
  $$(scope, '[data-orb]').forEach((n) => n.classList.toggle('is-hi', n.dataset.orb === name));
  $$(scope, '[data-relrow]').forEach((tr) => tr.classList.toggle('is-hi', tr.dataset.relrow === name));
  $$(scope, '[data-orbgo]').forEach((b) => b.classList.toggle('is-hi', b.dataset.orbgo === name));
  const idxs = [];
  $$(scope, '[data-orb]').forEach((n) => { if (n.dataset.orb === name) idxs.push(n.dataset.orbi); });
  $$(scope, '[data-orbe]').forEach((e) => e.classList.toggle('is-hi', idxs.includes(e.dataset.orbe)));
  const peek = $(scope, '[data-orbpeek]');
  if (peek) {
    peek.innerHTML = neighbourPeekHTML(name, rel);
    peek.hidden = false;
    peek.dataset.on = '1';
  }
}
function clearNeighbour(scope) {
  $$(scope, '.orb').forEach((svg) => { svg.dataset.dim = '0'; });
  $$(scope, '.is-hi').forEach((n) => n.classList.remove('is-hi'));
  const peek = $(scope, '[data-orbpeek]');
  if (peek) peek.dataset.on = '0';
}
function wireOrbits(root) {
  const hit = (e) => e.target.closest('[data-orb],[data-relrow],[data-orbgo]');
  root.addEventListener('pointerover', (e) => {
    const el = hit(e);
    if (!el) { if (!e.target.closest('[data-orbpeek]')) clearNeighbour(root); return; }
    lightNeighbour(root, el.dataset.orb || el.dataset.relrow || el.dataset.orbgo);
  });
  root.addEventListener('pointerleave', () => clearNeighbour(root));
  root.addEventListener('focusin', (e) => {
    const el = hit(e);
    if (el) lightNeighbour(root, el.dataset.orb || el.dataset.relrow || el.dataset.orbgo);
  });
  root.addEventListener('click', (e) => {
    const n = e.target.closest('[data-orb]');
    if (!n) return;
    const inDisc = !!e.target.closest('[data-app="discovery"]');
    if (inDisc) pushHop(root, 'table', n.dataset.orb); else openObject(n.dataset.orb);
  });
  root.addEventListener('keydown', (e) => {
    const n = e.target.closest('[data-orb]');
    if (n && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); n.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  });
}

function screenObject() {
  return shell('object', {
    mode: 'work', crumbs: ['בית', 'אחזקה', 'AUFK'], nav: 'context', active: 'אחזקה · PM',
    body: objectBody('AUFK'),
  });
}

/* ------------------------------------------------------------- DISCOVERY */
/* Every hop is backed by the shared dataset:
     IW31 -> AUFK, AFVC        (DISCOVERY.tcodeIndex)
     AFIH.AUFNR = AUFK.AUFNR   (NEO.entities relation, verbatim JOIN)
     AFIH.EQUNR = EQUI.EQUNR   (NEO.entities relation)
     IW32 -> 8 tables          (DISCOVERY.tcodeIndex)
   The "business flow" hop is the real ordered set of T-codes that touch the
   object · no invented verbs, no invented process names. */
const FLOW_STEPS = [
  { k: 'tcode', v: 'IW31' }, { k: 'table', v: 'AUFK' }, { k: 'table', v: 'AFIH' },
  { k: 'table', v: 'EQUI' }, { k: 'tcode', v: 'IW32' }, { k: 'flow', v: 'AUFK' },
  { k: 'book', v: 'book9' }, { k: 'trouble', v: 'AUFK' }, { k: 'note', v: 'AUFK' },
];

function hopTitle(h) {
  if (h.k === 'tcode') return h.v;
  if (h.k === 'table') return h.v;
  if (h.k === 'flow') return `רצף טרנזקציות · ${h.v}`;
  if (h.k === 'book') return (BOOKS.find((b) => b.id === h.v) || {}).title || h.v;
  if (h.k === 'trouble') return `בדיקות המרה · ${h.v}`;
  return `ECC → S/4 · ${h.v}`;
}
const HOP_ICO = { tcode: 'terminal', table: 'table', flow: 'workflow', book: 'bookOpen', trouble: 'wrench', note: 'alertTriangle' };
const HOP_KIND = { tcode: 'טרנזקציה', table: 'טבלה', flow: 'תהליך עסקי', book: 'ספר', trouble: 'תקלות והמרה', note: 'הערת S/4' };

/* ---------------------------------------------------------- DUAL IDENTITY */
/* AUFK is one of the 19 tables that PM and PP-PI really share, and it carries
   IW31/IW32/IW33 on one side and COR1/COR2/COR3 on the other. That is the most
   interesting fact in the whole dictionary, so it gets its own component
   instead of a sentence: two lanes, both real, neither one chosen for you. */
function dualIdentityHTML(name) {
  const t = TABLE.get(name);
  if (!t) return '';
  const lanes = uniq(t.contexts.map((c) => c.module)).map((m) => {
    const ctx = t.contexts.filter((c) => c.module === m);
    const codes = uniq(ctx.flatMap((c) => c.tcodes.split(/[;,]/).map((s) => s.trim()).filter(Boolean)));
    return { m, ctx, codes };
  });
  return `<section class="dual2" style="--o:${oVar(name)}">
    <header class="dual2__h">
      <span class="dual2__k">${icon('gitBranch', 13)} זהות כפולה</span>
      <b><span class="sap">${esc(name)}</span> חיה בשני מודולים בו-זמנית</b>
      <span class="grow"></span>
      <span class="dual2__n">אחת מ-${SHARED.size} הטבלאות המשותפות ל-PM ול-PP-PI</span>
    </header>
    <div class="dual2__lanes">
      ${lanes.map((l) => `<div class="d2lane" style="--m:${modVar(l.m)}">
        <span class="d2lane__m">${mchip(l.m)}<em>${esc(modHe(l.m))}</em></span>
        ${l.ctx.map((c) => `<span class="d2lane__t">${esc(c.topic)}</span>`).join('')}
        <span class="d2lane__codes">${l.codes.map((c) => `<button class="tcode tcode--sm" type="button"
          data-hop="tcode:${esc(c.split('/')[0])}"><span class="sap">${esc(c)}</span></button>`).join('')}</span>
        ${l.ctx.map((c) => `<span class="d2lane__s4">${icon('alertTriangle', 11)}${esc(c.s4)}</span>`).join('')}
      </div>`).join('<span class="d2seam" aria-hidden="true"><i></i><b>אותה טבלה</b><i></i></span>')}
    </div>
    <p class="dual2__f">${t.fields} שדות · ${(TCODES_OF[name] || []).length} טרנזקציות ·
      ${relsOf(name).list.length} קשרים ממודלים. אין כאן בחירה שרירותית של מודול,
      שני ההקשרים מוצגים כפי שהם רשומים במילון.</p>
  </section>`;
}

function hopBody(h) {
  if (h.k === 'tcode') {
    const names = TCODE_INDEX[h.v] || [];
    const dual = names.filter((n) => SHARED.has(n));
    return `<p class="hop__lede">הטרנזקציה <span class="sap">${esc(h.v)}</span> נפתרת אל
      ${names.length} טבלאות לפי שדה ה-tcodes האמיתי במילון.</p>
      ${dual.length ? dualIdentityHTML(dual[0]) : ''}
      <div class="hop__cards">${names.map((n) => {
    const t = TABLE.get(n); if (!t) return '';
    return `<button class="hopcard" type="button" data-hop="table:${esc(n)}"
          style="--m:${modVar(t.modules[0])};--o:${oVar(n)}">
          <span class="hopcard__cls" aria-hidden="true"></span>
          <span class="sap">${esc(n)}</span><span class="he">${esc(t.he)}</span>
          <span class="mm">${mchips(t.modules, 'mchip--sm')}</span>
          <span class="ff">${t.fields} שדות · ${relsOf(n).list.length} קשרים</span></button>`;
  }).join('')}</div>`;
  }
  if (h.k === 'table') {
    const t = TABLE.get(h.v); const r = relsOf(h.v);
    const orb = orbitSVG(h.v, { max: 10 });
    return `<p class="hop__lede">${esc(t.he)} · <span class="lt">${esc(t.en)}</span></p>
      ${SHARED.has(h.v) ? dualIdentityHTML(h.v) : `
      <div class="hop__ctx">${t.contexts.map((c) => `<span class="hopctx" style="--m:${modVar(c.module)}">
        <b>${esc(c.module)}</b><span>${esc(c.topic)}</span><em class="sap">${esc(c.tcodes)}</em></span>`).join('')}</div>`}
      <div class="hop__split">
        <div>
          <h4 class="hop__h">${icon('gitBranch', 12)} קשרים אמיתיים (${r.modelled ? r.list.length : 0})</h4>
          <div class="hop__cards">${r.modelled ? r.list.slice(0, 8).map((x) => `
            <button class="hopcard hopcard--rel" type="button" data-hop="table:${esc(x.table)}"
              data-orbgo="${esc(x.table)}" style="--o:${oVar(x.table)};--r:${relVar(x.card)}">
              <span class="hopcard__cls" aria-hidden="true"></span>
              <span class="sap">${esc(x.table)}</span>
              <span class="he">${esc(x.desc)}</span>
              <code>${esc(x.join)}</code>
              <span class="ff"><i aria-hidden="true"></i>${esc(x.card)}</span></button>`).join('')
    : '<p class="empty">אין מודל קשרים לטבלה זו בפרויקט.</p>'}</div>
        </div>
        ${orb ? `<figure class="hop__orb" data-orbhost>
          ${orb}
          <figcaption>${r.list.length} קשרים ממודלים · צבע הקו לפי היחס שרשום במילון
            (<i style="--r:var(--rel-1-1)"></i>1:1 · <i style="--r:var(--rel-n-1)"></i>N:1)</figcaption>
        </figure>` : ''}
      </div>
      <h4 class="hop__h">${icon('terminal', 12)} טרנזקציות שנוגעות בטבלה (${(TCODES_OF[h.v] || []).length})</h4>
      <div class="hop__codes">${(TCODES_OF[h.v] || []).map((c) => `<button class="tcode" type="button"
        data-hop="tcode:${esc(c)}"><span class="sap">${esc(c)}</span></button>`).join('')}</div>`;
  }
  if (h.k === 'flow') {
    const codes = TCODES_OF[h.v] || [];
    return `<p class="hop__lede">התהליך העסקי כפי שהוא מגובה בנתונים: כל הטרנזקציות שהמילון
      מקשר ל-<span class="sap">${esc(h.v)}</span>, והטבלאות שכל אחת מהן פותחת.
      אין כאן שמות שלבים שהומצאו.</p>
      <ol class="flowchain">${codes.map((c) => `<li>
        <button type="button" data-hop="tcode:${esc(c)}"><span class="sap">${esc(c)}</span></button>
        <span class="fc__t">${esc((TCODE_INDEX[c] || []).join(' · '))}</span></li>`).join('')}</ol>`;
  }
  if (h.k === 'book') {
    const b = BOOKS.find((x) => x.id === h.v);
    return `<p class="hop__lede">${esc(b.title)}</p>
      <div class="hop__book" style="--m:${modVar(b.module)}">
        <span class="hb__m">${mchip(b.module)}</span>
        <span class="hb__n"><b>${b.chapters}</b>פרקים</span>
        <span class="hb__n"><b>${nf(b.sections)}</b>סעיפים</span>
        <span class="hb__n"><b>${Math.round(b.minutes / 60)}</b>שעות</span>
        <span class="hb__n"><b>${b.hebrew ? 'עברית' : 'אנגלית'}</b>שפה</span>
      </div>
      <p class="frozen">${icon('check', 12)} מימוש הקורא קפוא. NEO מקשר אל הספר, לא מעצב אותו מחדש ולא משכפל אותו.</p>`;
  }
  if (h.k === 'trouble') {
    const sums = uniq([...NEO.pmTables, ...NEO.ppTables].filter((x) => x.name === h.v && x.sumNote).map((x) => x.sumNote));
    return `<p class="hop__lede">בפרויקט אין מאגר תקלות ייעודי. מה שכן קיים ומגובה: הערות ה-SUM
      וסיווג ההשפעה של ${esc(h.v)}, וזה מה שמוצג.</p>
      ${sums.map((s) => `<p class="troublenote">${icon('wrench', 13)}<span>${esc(s)}</span></p>`).join('')
        || '<p class="empty">אין הערת SUM לטבלה זו.</p>'}
      <p class="evidence">${icon('alertTriangle', 12)} דורש אימות במערכת SAP: הטקסט הוא ציטוט מהמאגר, לא בדיקה חיה.</p>`;
  }
  const migs = MIG_BY_TABLE[h.v] || [];
  return `<p class="hop__lede">הערות ECC → S/4HANA של ${esc(h.v)}, מילה במילה מהמאגר.</p>
    <ul class="notes">${migs.map((m) => `<li>
      <span class="imp" data-imp="${m.s4Impact}">${esc(IMPACT_HE[m.s4Impact])}</span>
      <span class="notetopic">${esc(m.topic)} · ${esc(m.mod.toUpperCase())}</span>
      <p>${esc(m.s4Note)}</p>
      ${m.s4Mentions.length ? `<p class="mentions">אזכורים: <code>${esc(m.s4Mentions.join(', '))}</code>
        <em>לא הוצלבו מול המילון</em></p>` : ''}</li>`).join('')}</ul>`;
}

/* The seven stations a discovery really passes through. They are labels for
   what the dataset already holds, never invented process steps. */
const DISC_STATIONS = [
  { k: 'tcode', ico: 'terminal', l: 'טרנזקציה' },
  { k: 'table', ico: 'table', l: 'אובייקט עסקי' },
  { k: 'rel', ico: 'gitBranch', l: 'טבלאות וקשרים' },
  { k: 'flow', ico: 'workflow', l: 'תהליך' },
  { k: 'book', ico: 'bookOpen', l: 'ספרים' },
  { k: 'trouble', ico: 'wrench', l: 'תקלות והמרה' },
  { k: 'note', ico: 'alertTriangle', l: 'הערת S/4' },
];
const STATION_OF = { tcode: 0, table: 1, flow: 3, book: 4, trouble: 5, note: 6 };

function screenDiscovery() {
  const body = `
    <section class="disc" data-disc>
      <header class="disc__head">
        <div>
          <p class="hsec__eye">DISCOVERY <i></i> מסע גילוי</p>
          <h1 class="disc__t">מ-<span class="sap">IW31</span> עד הערת ה-S/4,<br>בלי לחזור לתפריט</h1>
          <p class="disc__lede">כל תחנה במסע נשענת על שדה אמיתי במילון: אינדקס הטרנזקציות,
            מפתחות ה-JOIN של הישויות, וסיווג ההמרה. שום מעבר כאן לא הומצא.</p>
        </div>
        <div class="disc__acts">
          <button class="btn btn--brand" type="button" data-act="walk">${icon('workflow', 14)} הרץ את המסלול</button>
          <button class="btn" type="button" data-act="discreset">${icon('history', 14)} אפס</button>
        </div>
      </header>
      <nav class="pathrail" data-pathrail aria-label="נתיב הגילוי"></nav>
      <div class="disc__body">
        <div class="hopstage" data-hopstage aria-live="polite"></div>
        <aside class="discmap" data-discmap aria-label="מפת התחנות"></aside>
      </div>
    </section>`;
  return shell('discovery', {
    mode: 'work', crumbs: ['בית', 'מסע גילוי'], nav: 'compact', active: 'מודל נתונים', body,
  });
}

/* ------------------------------------------------------------------- ERD */
const ERD_START = 'AUFK';

function erdLayout(focus) {
  const nodes = new Map();
  const edges = [];
  const e0 = ENT.get(focus);
  if (!e0) return { nodes: [], edges: [] };
  nodes.set(focus, { name: focus, x: 0, y: 0, ring: 0, ent: e0 });

  const ring1 = uniq(e0.relations.map((r) => r.table)).slice(0, 12);
  ring1.forEach((nm, i) => {
    const a = (i / ring1.length) * Math.PI * 2 - Math.PI / 2;
    nodes.set(nm, { name: nm, x: Math.cos(a) * 250, y: Math.sin(a) * 190, ring: 1, ent: ENT.get(nm) });
  });
  e0.relations.forEach((r) => {
    if (nodes.has(r.table)) edges.push({ a: focus, b: r.table, ...r });
  });

  const ring2 = [];
  ring1.slice(0, 6).forEach((nm) => {
    const e = ENT.get(nm);
    if (!e) return;
    e.relations.forEach((r) => {
      if (nodes.has(r.table) || ring2.includes(r.table) || ring2.length >= 14) return;
      ring2.push(r.table);
    });
  });
  ring2.forEach((nm, i) => {
    const a = (i / ring2.length) * Math.PI * 2 - Math.PI / 2 + 0.22;
    nodes.set(nm, { name: nm, x: Math.cos(a) * 470, y: Math.sin(a) * 350, ring: 2, ent: ENT.get(nm) });
  });
  ring1.forEach((nm) => {
    const e = ENT.get(nm);
    if (!e) return;
    e.relations.forEach((r) => {
      if (nodes.has(r.table) && r.table !== focus) edges.push({ a: nm, b: r.table, ...r });
    });
  });

  const seen = new Set();
  const uniqEdges = edges.filter((ed) => {
    const k = ed.join; if (seen.has(k)) return false; seen.add(k); return true;
  });
  return { nodes: Array.from(nodes.values()), edges: uniqEdges };
}

function screenERD() {
  const body = `
    <section class="erd" data-erd>
      <header class="erd__head">
        <div class="erd__id">
          <p class="hsec__eye">DATA MODEL <i></i> מודל נתונים</p>
          <h1 class="erd__t">${NEO.entities.length} ישויות · <em>JOIN אמיתי</em> בכל קשר</h1>
        </div>
        <div class="erd__tools">
          <label class="wsfilter"><span aria-hidden="true">${icon('search', 14)}</span>
            <input type="search" placeholder="חפש ישות…" aria-label="חיפוש ישות" data-erdsearch></label>
          <div class="seg2" role="group" aria-label="זום">
            <button type="button" data-erdzoom="out" aria-label="הקטן">−</button>
            <button type="button" data-erdzoom="in" aria-label="הגדל">+</button>
            <button type="button" data-erdzoom="fit">התאם</button>
            <button type="button" data-erdzoom="reset">0</button>
          </div>
          <button class="btn btn--s" type="button" data-erdfull>${icon('layoutGrid', 13)} מסך מלא</button>
        </div>
      </header>
      <div class="erd__body">
        <div class="erd__canvas" data-erdcanvas tabindex="0" role="application"
          aria-label="קנבס מודל נתונים">
          <svg class="erd__svg" data-erdsvg viewBox="-600 -450 1200 900" preserveAspectRatio="xMidYMid meet"></svg>
          <div class="erd__tip" data-erdtip hidden></div>
          <div class="erd__legend">
            <span class="erdl__h">סוג אובייקט</span>
            ${OBJ_KEYS.filter((k) => (GRAPH.taxonomy[k] || {}).tables).map((k) => `<span class="erdl"
              style="--o:var(--obj-${k})"><i aria-hidden="true"></i>${esc(objHe(k))}</span>`).join('')}
            <span class="erdl__h erdl__h--2">יחס</span>
            <span class="erdl"><i class="erdl__l" style="--r:var(--rel-1-1)" aria-hidden="true"></i>1:1</span>
            <span class="erdl"><i class="erdl__l" style="--r:var(--rel-n-1)" aria-hidden="true"></i>N:1</span>
          </div>
          <div class="erd__mini" data-erdmini aria-hidden="true">
            <svg viewBox="-600 -450 1200 900" data-erdminisvg></svg>
            <span class="erd__vp" data-erdvp></span>
          </div>
          <div class="erd__hud">
            <span class="erd__zoombadge" data-erdzoombadge>100%</span>
            <span class="erd__keys">${icon('command', 11)} ⌘+גלגלת זום ·
              <kbd>+</kbd><kbd>−</kbd><kbd>0</kbd><kbd>F</kbd> · גרירה = הזזה</span>
          </div>
        </div>
        <aside class="erd__side">
          <div class="erd__idx">
            <h3>${icon('layers', 12)} ישויות <b data-erdcount></b></h3>
            <ul data-erdlist></ul>
          </div>
          <div class="erd__insp" data-erdinsp></div>
        </aside>
      </div>
    </section>`;
  return shell('erd', {
    mode: 'experience', crumbs: ['בית', 'מודל נתונים'], nav: 'compact', active: 'מודל נתונים', body,
  });
}

/* -------------------------------------------------------------- UNIVERSE */
function universePos() {
  const pos = {};
  const full = UNIVERSE.nodes.filter((n) => n.tier === 'full');
  const books = UNIVERSE.nodes.filter((n) => n.tier === 'books');
  const plan = UNIVERSE.nodes.filter((n) => n.tier === 'planned');
  full.forEach((n, i) => {
    const a = (i / full.length) * Math.PI * 2 - Math.PI / 2;
    pos[n.id] = { x: Math.cos(a) * 105, y: Math.sin(a) * 78 };
  });
  books.forEach((n, i) => {
    const a = (i / books.length) * Math.PI * 2 - Math.PI / 2 + 0.3;
    pos[n.id] = { x: Math.cos(a) * 285, y: Math.sin(a) * 215 };
  });
  plan.forEach((n, i) => {
    const a = (i / plan.length) * Math.PI * 2 - Math.PI / 2 + 0.62;
    pos[n.id] = { x: Math.cos(a) * 445, y: Math.sin(a) * 330 };
  });
  return pos;
}

function universeSVG() {
  const P = universePos();
  const edges = UNIVERSE.edges.map((e, i) => {
    const a = P[e.a]; const b = P[e.b];
    if (!a || !b) return '';
    return `<line class="uedge" data-uedge="${i}" data-strength="${e.strength}"
      x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"><title>${esc(e.note)}</title></line>`;
  }).join('');
  const nodes = UNIVERSE.nodes.map((n) => {
    const p = P[n.id];
    const r = n.tier === 'full' ? 46 : n.tier === 'books' ? 36 : 30;
    return `<g class="unode" data-unode="${esc(n.id)}" data-tier="${n.tier}"
        transform="translate(${p.x} ${p.y})" style="--m:${modVar(n.id)}"
        tabindex="${n.tier === 'planned' ? -1 : 0}" role="${n.tier === 'planned' ? 'img' : 'button'}"
        aria-label="${esc(n.id)} · ${esc(n.he)}${n.tier === 'planned' ? ' · בקרוב, אין תוכן' : ''}">
      <circle class="un__halo" r="${r + 9}"></circle>
      <circle class="un__c" r="${r}"></circle>
      <text class="un__t" y="-2">${esc(n.id)}</text>
      <text class="un__s" y="13">${n.tier === 'planned' ? 'בקרוב' : esc(n.he)}</text>
    </g>`;
  }).join('');
  return `<svg class="usvg" data-usvg viewBox="-560 -420 1120 840" role="img"
    aria-label="מפת כיסוי המודולים">${edges}${nodes}</svg>`;
}

function screenUniverse() {
  const body = `
    <section class="uni" data-uni>
      <header class="uni__head">
        <div><p class="eyebrow">יקום SAP</p>
          <h1 class="uni__t">מפת כיסוי <em>כנה</em></h1>
          <p class="lede">ארבעה מצבים נפרדים. קשר מגובה: קו מלא עם ההערה האמיתית שלו.
            קשר ידוע שלא ממודל אצלנו: קו מקווקו ומסומן ככזה. מודול בתכנון:
            "בקרוב", לא לחיץ, בלי מספרים מומצאים.</p></div>
        <ul class="ulegend">
          <li data-l="full"><i></i>מילון מלא + ספרים</li>
          <li data-l="books"><i></i>ספרייה בלבד</li>
          <li data-l="planned"><i></i>בתכנון · אין תוכן</li>
          <li data-l="evidence"><i></i>קשר מגובה בנתונים</li>
          <li data-l="spec"><i></i>קשר ידוע, לא ממודל</li>
        </ul>
      </header>
      <div class="uni__body">
        <div class="uni__map">${universeSVG()}</div>
        <aside class="uni__panel" data-unipanel></aside>
      </div>
      <div class="uni__edges">
        <h3>קשרים · ${UNIVERSE.edges.length} סה״כ</h3>
        <ul>${UNIVERSE.edges.map((e, i) => `<li data-uedgerow="${i}" data-strength="${e.strength}">
          <span class="ue__p"><b>${esc(e.a)}</b>${icon('arrowLeft', 12)}<b>${esc(e.b)}</b></span>
          <span class="ue__s">${e.strength === 'evidence' ? 'מגובה' : 'ידוע, לא ממודל'}</span>
          <span class="ue__n">${esc(e.note)}</span></li>`).join('')}</ul>
      </div>
    </section>`;
  return shell('universe', {
    mode: 'experience', crumbs: ['בית', 'יקום SAP'], nav: 'hidden', active: 'מודל נתונים', body,
  });
}

/* --------------------------------------------------------------- LIBRARY */
/* Books are objects with presence, not rows. Everything on a cover is a real
   field of NEO.books; the "connects to" line is the real dictionary reach of
   that book's module. The reader itself is frozen and never re-drawn here. */
function bookCoverHTML(b, i) {
  const tabs = TABLES.filter((t) => t.modules.includes(b.module));
  const codes = uniq(tabs.flatMap((t) => TCODES_OF[t.name] || []));
  const hrs = Math.round(b.minutes / 60);
  return `<button class="bcov" type="button" data-go="library" data-book="${esc(b.id)}"
      style="--m:${modVar(b.module)};--d:${i * 45}ms"
      aria-label="${esc(b.title)} · ${b.chapters} פרקים · ${b.sections} סעיפים">
    <span class="bcov__spine" aria-hidden="true"></span>
    <span class="bcov__grain" aria-hidden="true"></span>
    <span class="bcov__top">
      ${mchip(b.module, 'mchip--sm')}
      <span class="bcov__lang">${b.hebrew ? 'עברית' : 'EN'}</span>
    </span>
    <span class="bcov__t lt">${esc(b.title)}</span>
    <span class="bcov__rule" aria-hidden="true"></span>
    <span class="bcov__n">
      <em><b>${b.chapters}</b>פרקים</em>
      <em><b>${nf(b.sections)}</b>סעיפים</em>
      <em><b>${hrs}</b>שעות</em>
    </span>
    <span class="bcov__link">${tabs.length
    ? `${icon('table', 11)} ${tabs.length} טבלאות · ${codes.length} טרנזקציות במילון`
    : `${icon('alertTriangle', 11)} אין מילון טכני למודול הזה, ספרייה בלבד`}</span>
  </button>`;
}

function screenLibrary() {
  const chain = [
    { i: 'bookOpen', t: 'ספרייה', s: `${BOOKS.length} ספרים` },
    { i: 'layers', t: 'ספר', s: `${BOOK_CHAPTERS} פרקים` },
    { i: 'bookOpen', t: 'פרק', s: `${nf(BOOK_SECTIONS)} סעיפים` },
    { i: 'table', t: 'אובייקט SAP', s: `${TABLES.length} טבלאות` },
    { i: 'gitBranch', t: 'קשרים', s: `${NEO.entities.length} ישויות` },
    { i: 'sparkles', t: 'NEO AI', s: 'מבוסס מקורות' },
    { i: 'workflow', t: 'מסע גילוי', s: `${TCODES.length} טרנזקציות` },
  ];
  const byMod = uniq(BOOKS.map((b) => b.module));
  const body = `
    <section class="lib">
      <header class="lib__head">
        <div>
          <p class="hsec__eye">LIBRARY <i></i> אינטגרציית ספרייה</p>
          <h1 class="lib__t">${BOOKS.length} ספרים.<br>${nf(BOOK_SECTIONS)} סעיפים.
            <em>${BOOK_HOURS} שעות</em> קריאה.</h1>
          <p class="lede">מה שמעוצב כאן הוא רק הכניסה: איך ספר נראה לפני שנכנסים אליו,
            ולאן הוא ממשיך במילון. הקורא עצמו קפוא.</p>
        </div>
        <p class="frozen frozen--big">${icon('check', 14)}
          מימוש הקורא קפוא. הוא לא מעוצב מחדש, לא מוטמע ולא משוכפל בקונספט הזה.</p>
      </header>

      <div class="libshelf">${BOOKS.map((b, i) => bookCoverHTML(b, i)).join('')}</div>

      <section class="libconn">
        ${secHead('מסלול', 'איך ספר מתחבר לשאר המוצר', `${byMod.length} מודולים · ${BOOK_CHAPTERS} פרקים`, 'workflow')}
        <div class="chain">${chain.map((c, i) => `<span class="chain__n">
          <i aria-hidden="true">${icon(c.i, 15)}</i>
          <span class="chain__x"><b>${esc(c.t)}</b><em>${esc(c.s)}</em></span></span>
          ${i < chain.length - 1 ? `<span class="chain__a" aria-hidden="true">
            <i class="chain__line"><b></b></i></span>` : ''}`).join('')}
        </div>
      </section>

      <div class="lib__grid2">
        <section class="libback">
          ${secHead('חזרה', 'מהספר בחזרה למילון', '', 'gitBranch')}
          <p class="lede">פרק במודול PM מחזיר אל הטבלאות של PM שקיימות במילון:
            ${TABLES.filter((t) => t.modules.includes('PM')).length} טבלאות,
            ${uniq(TABLES.filter((t) => t.modules.includes('PM')).flatMap((t) => TCODES_OF[t.name] || [])).length} טרנזקציות.
            אלה הכניסות שנפתחות מתוך פרק:</p>
          <div class="libjump">${['EQUI', 'AUFK', 'AFIH', 'IFLOT', 'QMEL'].map((nm) => {
    const t = TABLE.get(nm);
    return `<button class="ljump" type="button" data-obj="${esc(nm)}" style="--o:${oVar(nm)}">
              <i aria-hidden="true"></i><span class="sap">${esc(nm)}</span>
              <span class="ljump__he">${esc(t ? t.he : '')}</span>
              <b>${t ? t.fields : '—'}</b></button>`;
  }).join('')}</div>
        </section>
        <section class="libcov">
          ${secHead('כיסוי', 'ספרים לפי מודול', `${BOOKS.length} ספרים`, 'layers')}
          <ul class="libmod">${byMod.map((m) => {
    const bs = BOOKS.filter((b) => b.module === m);
    const sec = bs.reduce((n, b) => n + b.sections, 0);
    const max = Math.max(...byMod.map((x) => BOOKS.filter((b) => b.module === x).reduce((n, b) => n + b.sections, 0)));
    return `<li style="--m:${modVar(m)}">
              <span class="libmod__m">${esc(m)}</span>
              <span class="libmod__b" aria-hidden="true"><i style="--f:${sec / max}"></i></span>
              <span class="libmod__n">${bs.length} ספרים · ${nf(sec)} סעיפים</span></li>`;
  }).join('')}</ul>
        </section>
      </div>
    </section>`;
  return shell('library', {
    mode: 'experience', crumbs: ['בית', 'ספרייה'], nav: 'expanded', active: 'ספרייה דיגיטלית', body,
  });
}

/* ------------------------------------------------------------ ULTRA-WIDE */
/* 2560+ genuinely recomposes: rail · list · object · knowledge lane, four
   real columns · not the 1440 layout with fatter margins. */
function screenUltra() {
  const t = TABLE.get('AUFK'); const r = relsOf('AUFK');
  const tables = TABLES.filter((x) => x.modules.includes('PM')).slice(0, 26);
  const body = `
    <div class="ultra">
      <section class="ultra__list">
        <header class="ucol__h"><h2>טבלאות PM</h2><span>${TABLES.filter((x) => x.modules.includes('PM')).length}</span></header>
        ${clsBar(TABLES.filter((x) => x.modules.includes('PM')), { key: false })}
        <ul class="ulist">${tables.map((x) => `<li><button type="button" data-obj="${esc(x.name)}"
          class="${x.name === 'AUFK' ? 'is-on' : ''}" style="--m:${modVar(x.modules[0])};--o:${oVar(x.name)}">
          <i class="odot" aria-hidden="true"></i>
          <span class="sap">${esc(x.name)}</span><span class="he">${esc(x.he)}</span>
          <span class="n">${x.fields}</span></button></li>`).join('')}</ul>
      </section>
      <section class="ultra__obj">
        <header class="ucol__h"><h2 class="sap">AUFK</h2><span>${esc(t.he)}</span></header>
        <figure class="ultra__orb" data-orbhost>${orbitSVG('AUFK', { max: 12, ring: 112 })}
          <div class="orbpeek" data-orbpeek hidden></div></figure>
        <table class="dt dt--tight dt--rel"><thead><tr><th>טבלה</th><th>יחס</th><th>JOIN</th><th>הסבר</th></tr></thead>
          <tbody>${r.list.map((x) => `<tr data-relrow="${esc(x.table)}" style="--r:${relVar(x.card)};--o:${oVar(x.table)}">
            <td><button class="sap link" type="button" data-obj="${esc(x.table)}">
              <i class="odot" aria-hidden="true"></i>${esc(x.table)}</button></td>
            <td class="num"><span class="cardk">${esc(x.card)}</span></td>
            <td><code>${esc(x.join)}</code></td><td>${esc(x.desc)}</td></tr>`).join('')}</tbody></table>
      </section>
      <section class="ultra__know">
        <header class="ucol__h"><h2>ידע והמרה</h2><span>${(MIG_BY_TABLE.AUFK || []).length} הערות</span></header>
        <ul class="notes">${(MIG_BY_TABLE.AUFK || []).map((m) => `<li>
          <span class="imp" data-imp="${m.s4Impact}">${esc(IMPACT_HE[m.s4Impact])}</span>
          <span class="notetopic">${esc(m.topic)}</span><p>${esc(m.s4Note)}</p></li>`).join('')}</ul>
        <ul class="booklist">${booksFor('PM').map((b) => `<li style="--m:${modVar('PM')}">
          <i aria-hidden="true"></i><span class="bt">${esc(b.title)}</span>
          <span class="bm">${b.chapters} פרקים</span></li>`).join('')}</ul>
        <div class="ucol__tc"><h3>טרנזקציות</h3><div class="hop__codes">${(TCODES_OF.AUFK || []).map((c) => `
          <button class="tcode" type="button" data-tcode="${esc(c)}"><span class="sap">${esc(c)}</span></button>`).join('')}</div></div>
      </section>
    </div>`;
  return shell('ultra', {
    mode: 'work', crumbs: ['בית', 'אחזקה', 'AUFK'], nav: 'expanded', active: 'אחזקה · PM', body,
  });
}

/* ---------------------------------------------------------------- TABLET */
function screenTablet() {
  const all = TABLES.filter((t) => t.modules.includes('PM'));
  const list = all.slice(0, 18);
  const t = TABLE.get('EQUI'); const r = relsOf('EQUI');
  const codes = TCODES_OF.EQUI || [];
  const body = `
    <div class="md">
      <section class="md__list">
        <header class="mdhead" style="--m:${modVar('PM')}">
          <span class="mdhead__k">${mchip('PM', 'mchip--sm')}</span>
          <h2>אחזקה</h2>
          <span class="mdhead__n">${all.length}</span>
        </header>
        ${clsBar(all, { key: false })}
        <ul class="ulist ulist--md">${list.map((x) => `<li><button type="button" data-obj="${esc(x.name)}"
          class="${x.name === 'EQUI' ? 'is-on' : ''}" style="--m:${modVar(x.modules[0])};--o:${oVar(x.name)}">
          <i class="odot" aria-hidden="true"></i>
          <span class="sap">${esc(x.name)}</span><span class="he">${esc(x.he)}</span>
          <span class="n">${x.fields}</span></button></li>`).join('')}</ul>
        <p class="ulist__f">${list.length} מתוך ${all.length} · הרשימה נגללת</p>
      </section>
      <section class="md__detail">
        <header class="mdobj" style="--m:${modVar('PM')};--o:${oVar('EQUI')}">
          <span class="boxfx" aria-hidden="true"><i class="mdobj__band"></i></span>
          <div class="mdobj__id">
            <p class="mdobj__eye">${icon('table', 11)} טבלה<i></i>${esc(oHe('EQUI'))}</p>
            <h1 class="sap">EQUI</h1>
            <p class="mdobj__he">${esc(t.he)}</p>
            <p class="mdobj__en lt">${esc(t.en)}</p>
            <div class="mdobj__mods">${mchips(t.modules)}</div>
          </div>
          <div class="mdobj__nums">
            <span><b>${t.fields}</b><em>שדות</em></span>
            <span><b>${codes.length}</b><em>טרנזקציות</em></span>
            <span><b>${r.list.length}</b><em>קשרים</em></span>
          </div>
        </header>
        <div class="mdsplit">
          <div>
            ${secHead('מודל', 'קשרים ומפתחות JOIN', `${r.list.length} קשרים`, 'gitBranch')}
            <table class="dt dt--tight dt--rel"><thead><tr><th>טבלה</th><th>יחס</th><th>JOIN</th></tr></thead>
              <tbody>${r.list.map((x) => `<tr data-relrow="${esc(x.table)}" style="--r:${relVar(x.card)};--o:${oVar(x.table)}">
                <td><button class="sap link" type="button" data-obj="${esc(x.table)}">
                  <i class="odot" aria-hidden="true"></i>${esc(x.table)}</button></td>
                <td class="num"><span class="cardk">${esc(x.card)}</span></td>
                <td><code>${esc(x.join)}</code></td></tr>`).join('')}</tbody></table>
          </div>
          <figure class="mdorb" data-orbhost>
            ${orbitSVG('EQUI', { max: 9, ring: 104 })}
            <figcaption>${r.list.length} קשרים ממודלים · צבע לפי היחס במילון</figcaption>
            <div class="orbpeek" data-orbpeek hidden></div>
          </figure>
        </div>
        <div class="mdcodes">
          ${secHead('כניסה', `טרנזקציות (${codes.length})`, '', 'terminal')}
          <div class="hop__codes">${codes.map((c) => `<button class="tcode" type="button"
            data-tcode="${esc(c)}"><span class="sap">${esc(c)}</span></button>`).join('')}</div>
        </div>
      </section>
    </div>`;
  return shell('tablet', {
    mode: 'work', crumbs: ['בית', 'אחזקה'], nav: 'compact', active: 'אחזקה · PM', body,
  });
}

/* ---------------------------------------------------------------- MOBILE */
function mobShell(id, { title, body, mode = 'experience', tab = 'home', sheet = '' }) {
  return `<div class="app app--mob" data-mode="${mode}" data-app="${id}">
    <header class="mtop">
      <button class="iconbtn" type="button" data-act="mobnav" aria-label="תפריט">${icon('panelLeft', 18)}</button>
      <span class="mtop__t">${esc(title)}</span>
      <button class="iconbtn" type="button" data-act="cmdk" aria-label="חיפוש">${icon('search', 18)}</button>
    </header>
    <div class="mbody" data-canvas>${body}${creditBar()}</div>
    <nav class="mtabs" aria-label="ניווט תחתון">
      ${[['home', 'home', 'בית'], ['search', 'search', 'חיפוש'], ['table', 'table', 'מילון'],
         ['bookOpen', 'bookOpen', 'ספרייה'], ['sparkles', 'sparkles', 'NEO']]
        .map(([ic, k, l]) => `<button class="mtab" type="button" data-mtab="${k}"
          ${tab === k ? 'aria-current="page"' : ''}>${icon(ic, 19)}<span>${esc(l)}</span></button>`).join('')}
    </nav>
    ${sheet}
  </div>`;
}

function screenMobileHome() {
  const body = `
    <section class="mhero">
      <p class="mhero__eye">${esc(NEO.brand.name)}<i></i>${esc(NEO.brand.product)}</p>
      <h1>מילון אחד<br>לכל מסע ה-S/4HANA</h1>
      <div class="mhero__n">
        ${[[DICT_ROWS, 'שורות מילון'], [TCODES.length, 'טרנזקציות'],
    [nf(BOOK_SECTIONS), 'סעיפים']].map(([n, l]) => `<span><b>${typeof n === 'number' ? nf(n) : n}</b><em>${esc(l)}</em></span>`).join('')}
      </div>
      ${clsBar(TABLES, { key: false })}
      <p class="mhero__cls">${TABLES.length} טבלאות, בצבע לפי סוג האובייקט</p>
      <button class="btn btn--brand btn--full" type="button" data-act="cmdk">${icon('search', 15)} חיפוש <kbd>⌘K</kbd></button>
    </section>
    <section class="msec"><h2>${icon('layoutGrid', 13)} מודולים</h2>
      <div class="mcards">
        ${moduleCard('PM', { en: PM.en, tables: PM.tables, fields: PM.fields, topics: PM.topics })}
        ${moduleCard('PP-PI', { en: PP.en, tables: PP.tables, fields: PP.fields, topics: PP.topics })}
      </div>
    </section>
    <section class="msec"><h2>${icon('history', 13)} נצפו לאחרונה</h2>
      <ul class="mlist">${RECENT.map((r) => `<li><button type="button" data-obj="${esc(r.name)}"
        style="--m:${modVar(r.t.modules[0])};--o:${oVar(r.name)}"><i aria-hidden="true"></i>
        <span class="sap">${esc(r.name)}</span><span class="he">${esc(r.t.he)}</span>
        <span class="w">${esc(r.when)}</span></button></li>`).join('')}</ul>
    </section>
    <section class="msec"><h2>${icon('bookOpen', 13)} הספרייה</h2>
      <div class="libshelf libshelf--sm">${BOOKS.slice(0, 2).map((b, i) => bookCoverHTML(b, i)).join('')}</div>
      <button class="btn btn--full" type="button" data-go="library">
        ${icon('arrowUpRight', 14)} כל ${BOOKS.length} הספרים</button>
    </section>`;
  return mobShell('m-home', { title: 'בית', body, mode: 'experience', tab: 'home' });
}

function screenMobileNav() {
  const body = `<section class="msec"><h2>${icon('panelLeft', 13)} ניווט מלא</h2>
    <p class="hint">במובייל אותו מודל ניווט הופך לגיליון תחתון עם יעדי מגע 44px ומעלה.
      אותן ${NAV_ITEMS.length} כניסות, אותן ספירות, אותו סדר.</p></section>`;
  const sheet = `<div class="msheet" data-msheet>
    <div class="msheet__grab" aria-hidden="true"></div>
    <header class="msheet__h">
      <b>ניווט</b><span>${NAV.length} קבוצות · ${NAV_ITEMS.length} כניסות</span>
    </header>
    <div class="msheet__scroll">
      ${NAV.map((g) => `<section class="msheet__g"><h3>${esc(g.he)}<em>${g.items.length}</em></h3>
        <ul>${g.items.map((it) => `<li><button type="button" data-nav="${esc(it.id)}"
          ${it.mod ? `style="--m:${modVar(it.mod)}"` : ''}>
          ${icon(it.ico, 17)}<span>${esc(it.label)}</span>
          ${it.count !== undefined ? `<b>${nf(it.count)}</b>` : '<b class="none">—</b>'}</button></li>`).join('')}</ul>
      </section>`).join('')}
    </div>
  </div>`;
  return mobShell('m-nav', { title: 'ניווט', body, mode: 'experience', tab: 'home', sheet });
}

function screenMobileSearch() {
  const body = `<section class="msearch">
    <p class="msearch__eye">${icon('search', 12)} NEO COMMAND<i></i>${TABLES.length} טבלאות ·
      ${TCODES.length} טרנזקציות</p>
    ${cmdHTML('d-mcmd', { placeholder: 'טבלה · טרנזקציה · BAPI · ספר' })}
  </section>`;
  return mobShell('m-search', { title: 'חיפוש', body, mode: 'work', tab: 'search' });
}

/* =========================================================================
   STAGE · CHROME · SCREEN REGISTRY
   ======================================================================= */
/* Self-assessed, per screen, on two independent axes. USABILITY = can a
   consultant do the job fast and without ambiguity. VISUAL = would this stop
   someone mid-scroll. A screen is only finished when both are high. */
const SCREENS = [
  { id: 'home', label: 'בית', vp: 'desktop', mode: 'experience', tier: 'L3', u: 9, v: 10, html: screenHome },
  { id: 'nav', label: 'ניווט · 9 מצבים', vp: 'desktop', mode: 'experience', tier: 'L2', u: 10, v: 9, html: screenNav },
  { id: 'search', label: 'חיפוש · Command', vp: 'desktop', mode: 'experience', tier: 'L2', u: 10, v: 9, html: screenSearch },
  { id: 'pm', label: 'סביבת PM', vp: 'desktop', mode: 'work', tier: 'L1', u: 10, v: 8, html: () => screenModule('PM', PM) },
  { id: 'pppi', label: 'סביבת PP-PI', vp: 'desktop', mode: 'work', tier: 'L1', u: 10, v: 8, html: () => screenModule('PP-PI', PP) },
  { id: 'pp', label: 'סביבת PP', vp: 'desktop', mode: 'work', tier: 'L1', u: 9, v: 8, html: () => screenModule('PP', { en: 'Production Planning' }) },
  { id: 'discovery', label: 'מסע גילוי', vp: 'desktop', mode: 'work', tier: 'L2', u: 10, v: 9, html: screenDiscovery },
  { id: 'object', label: 'אובייקט · AUFK', vp: 'desktop', mode: 'work', tier: 'L1', u: 10, v: 9, html: screenObject },
  { id: 'erd', label: 'מודל נתונים · ERD', vp: 'desktop', mode: 'experience', tier: 'L2', u: 10, v: 9, html: screenERD },
  { id: 'universe', label: 'יקום SAP', vp: 'desktop', mode: 'experience', tier: 'L3', u: 8, v: 9, html: screenUniverse },
  { id: 'library', label: 'ספרייה · חיבור', vp: 'desktop', mode: 'experience', tier: 'L2', u: 9, v: 9, html: screenLibrary },
  { id: 'ultra', label: 'Ultra-wide', vp: 'ultra', mode: 'work', tier: 'L1', u: 9, v: 8, html: screenUltra },
  { id: 'tablet', label: 'טאבלט', vp: 'tablet', mode: 'work', tier: 'L1', u: 9, v: 8, html: screenTablet },
  { id: 'm-home', label: 'מובייל · בית', vp: 'mobile', mode: 'experience', tier: 'L2', u: 9, v: 8, html: screenMobileHome },
  { id: 'm-nav', label: 'מובייל · ניווט', vp: 'mobile', mode: 'experience', tier: 'L2', u: 9, v: 8, html: screenMobileNav },
  { id: 'm-search', label: 'מובייל · חיפוש', vp: 'mobile', mode: 'work', tier: 'L1', u: 9, v: 8, html: screenMobileSearch },
];
const SCREEN = new Map(SCREENS.map((s) => [s.id, s]));

const VIEWPORTS = {
  mobile: { w: 390, h: 844, label: '390', bucket: 'xs', fs: 1 },
  tablet: { w: 1024, h: 768, label: '1024', bucket: 'sm', fs: 1 },
  desktop: { w: 1440, h: 900, label: '1440', bucket: 'md', fs: 1 },
  hd: { w: 1920, h: 1080, label: '1920', bucket: 'lg', fs: 1 },
  ultra: { w: 2560, h: 1400, label: '2560', bucket: 'xl', fs: 1.09 },
  uhd: { w: 3840, h: 2100, label: '3840', bucket: 'xxl', fs: 1.22 },
};
const DESKTOP_BUCKETS = ['md', 'lg', 'xl', 'xxl'];
const TIER_NOTE = {
  L1: 'תנועה מינימלית · 90–150ms · מצבים בלבד',
  L2: 'תנועה פונקציונלית · מעברי מצב וקפיץ ניווט',
  L3: 'תנועה אקספרסיבית · מעברים מרחביים וכניסה למודול',
};

const stage = document.getElementById('stage');
const stagebox = document.getElementById('stagebox');
const stagemeta = document.getElementById('stagemeta');
const switcher = document.getElementById('switcher');
const navseg = document.getElementById('navseg');
const vpseg = document.getElementById('vpseg');
const modepill = document.getElementById('modepill');
const tierpill = document.getElementById('tierpill');
const scorepill = document.getElementById('scorepill');
const themeBtn = document.getElementById('themeBtn');
const demoBtn = document.getElementById('demoBtn');
const coach = document.getElementById('coach');

let currentScreen = 'home';
let currentVp = 'desktop';
let currentMode = 'experience';

/* ---- chrome markup ------------------------------------------------------ */
switcher.innerHTML = SCREENS.map((s, i) => `
  <button class="sw" type="button" data-screen="${s.id}" aria-pressed="${i === 0}">
    <span class="sw__n">${String(i + 1).padStart(2, '0')}</span>${esc(s.label)}
    <span class="sw__t" data-tier="${s.tier}">${s.tier}</span>
    <span class="sw__s" title="שימושיות ${s.u}/10 · עוצמה חזותית ${s.v}/10">${s.u}<i>·</i>${s.v}</span>
  </button>`).join('');
navseg.innerHTML = NAV_STATES.map((s, i) => `
  <button class="nsw" type="button" data-navjump="${s.id}" aria-pressed="${i === 0}">${esc(s.l)}</button>`).join('');
vpseg.innerHTML = Object.entries(VIEWPORTS).map(([k, v]) => `
  <button type="button" data-vp="${k}" aria-pressed="${k === 'desktop'}">${esc(v.label)}</button>`).join('');

/* ---- build every screen once ------------------------------------------- */
stage.innerHTML = `${SCREENS.map((s, i) => `<div class="screen${i === 0 ? ' is-active' : ''}"
    data-screen-id="${s.id}"${i === 0 ? '' : ' aria-hidden="true" inert'}>${s.html()}</div>`).join('')}
  <div class="fx" id="fx" aria-hidden="true"></div>
  <div class="modeband" id="modeband" aria-hidden="true"><span></span></div>
  <div class="scrim" id="scrim" hidden>
    <div class="cmdk" role="dialog" aria-modal="true" aria-label="חיפוש אוניברסלי">
      ${cmdHTML('d-overlay', { placeholder: 'חפש טבלה, טרנזקציה, BAPI, ספר…' })}
    </div>
  </div>`;
const fx = document.getElementById('fx');
const modeband = document.getElementById('modeband');
const scrim = document.getElementById('scrim');

/* ---- sizing ------------------------------------------------------------- */
function fitStage() {
  const v = VIEWPORTS[currentVp];
  const availW = window.innerWidth - 40;
  /* measure the real chrome instead of guessing: the switcher wraps at narrow
     widths, and a guessed constant would push the stage under the fold */
  const chromeH = document.querySelector('.chrome').offsetHeight;
  const availH = window.innerHeight - chromeH - 110;
  const scale = Math.min(1, availW / v.w, availH / v.h);
  stage.style.setProperty('--nom-w', `${v.w}px`);
  stage.style.setProperty('--nom-h', `${v.h}px`);
  stage.style.setProperty('--scale', scale);
  stage.style.setProperty('--font-scale', v.fs);
  stage.dataset.w = v.bucket;
  stagebox.style.width = `${v.w * scale}px`;
  stagebox.style.height = `${v.h * scale}px`;
  stagemeta.textContent = `${v.w} × ${v.h} · ${Math.round(scale * 100)}% · ${v.bucket.toUpperCase()}`;
}
function setVp(k, silent) {
  currentVp = k;
  $$(vpseg, 'button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.vp === k)));
  fitStage();
  if (!silent) raf(() => $$(stage, '.app').forEach(syncInd));
}
window.addEventListener('resize', fitStage);

/* ---- mode + tier pills -------------------------------------------------- */
function paintPills(s) {
  modepill.dataset.mode = s.mode;
  modepill.innerHTML = `<span class="k">MODE</span><b>${s.mode === 'work' ? 'WORK' : 'EXPERIENCE'}</b>
    <span class="t">${s.mode === 'work' ? 'מצב עבודה · צפיפות מלאה' : 'מצב חוויה · רגיסטר עורכי'}</span>`;
  tierpill.dataset.tier = s.tier;
  tierpill.innerHTML = `<span class="k">MOTION</span><b>${s.tier}</b>
    <span class="t">${esc(TIER_NOTE[s.tier])}</span>`;
  /* required deliverable: two independent self-assessed scores, per screen */
  scorepill.innerHTML = `<span class="k">SCORE</span>
    <b class="score" data-n="${s.u}">${s.u}<i>/10</i></b><span class="t">שימושיות</span>
    <b class="score" data-n="${s.v}">${s.v}<i>/10</i></b><span class="t">עוצמה חזותית</span>`;
}

/* the deliberate moment between the two personalities */
function modeShift(to) {
  modeband.dataset.dir = to;
  modeband.firstElementChild.textContent = to === 'work'
    ? 'מצב עבודה · טיפוגרפיה יורדת דרגה · תקציב תנועה L1'
    : 'מצב חוויה · רגיסטר עורכי · תקציב תנועה L2/L3';
  modeband.classList.remove('is-on');
  void modeband.offsetWidth;
  modeband.classList.add('is-on');
  [modepill, tierpill].forEach((p) => { p.classList.remove('is-beat'); void p.offsetWidth; p.classList.add('is-beat'); });
  setTimeout(() => modeband.classList.remove('is-on'), 1150);
}

/* ---- screen switching --------------------------------------------------- */
function setScreen(id, { flip = null, silentMode = false } = {}) {
  const s = SCREEN.get(id);
  if (!s) return;
  const prevMode = currentMode;
  currentScreen = id;
  currentMode = s.mode;
  if (location.hash.slice(1) !== id) history.replaceState(null, '', `#${id}`);
  $$(switcher, 'button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.screen === id)));
  $$(stage, '.screen').forEach((el) => {
    const on = el.dataset.screenId === id;
    el.classList.toggle('is-active', on);
    if (on) { el.removeAttribute('aria-hidden'); el.removeAttribute('inert'); }
    else { el.setAttribute('aria-hidden', 'true'); el.setAttribute('inert', ''); }
  });
  const keepDesktop = s.vp === 'desktop' && DESKTOP_BUCKETS.includes(VIEWPORTS[currentVp].bucket);
  setVp(keepDesktop ? currentVp : s.vp, true);
  paintPills(s);
  if (!silentMode && prevMode !== s.mode) modeShift(s.mode);

  const el = $(stage, `[data-screen-id="${id}"]`);
  raf(() => {
    $$(el, '.app').forEach(syncInd);
    if (id === 'erd') erdFit(el);
    if (id === 'discovery') discRender(el);
    if (flip) raf(() => travel(flip, $(el, `[data-flip="${flip.to}"]`)));
  });
  return el;
}
switcher.addEventListener('click', (e) => {
  const b = e.target.closest('[data-screen]');
  if (b) setScreen(b.dataset.screen);
});
vpseg.addEventListener('click', (e) => {
  const b = e.target.closest('[data-vp]');
  if (b) setVp(b.dataset.vp);
});
window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1);
  if (id && id !== currentScreen && SCREEN.has(id)) setScreen(id);
});

/* ---- theme -------------------------------------------------------------- */
function paintTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeBtn.innerHTML = icon(dark ? 'sun' : 'moon', 16);
  themeBtn.setAttribute('aria-label', dark ? 'עבור למצב בהיר' : 'עבור למצב כהה');
  themeBtn.setAttribute('aria-pressed', String(dark));
}
themeBtn.addEventListener('click', () => {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  paintTheme();
  $$(stage, '.app').forEach(syncInd);
});
paintTheme();

/* =========================================================================
   SIGNATURE NAVIGATION
   ======================================================================= */

/* one travelling element · never a per-item background swap.
   It stretches slightly toward the direction of travel and settles. */
const INDY = new WeakMap();
function syncInd(app) {
  const scroll = $(app, '[data-railscroll]');
  const ind = scroll && $(scroll, '[data-ind]');
  if (!scroll || !ind) return;
  const active = $(scroll, '.navitem[aria-current]');
  const group = active && active.closest('.navgroup');
  if (!active || !active.offsetParent || (group && group.dataset.open === 'false')) {
    ind.dataset.off = '1'; return;
  }
  ind.dataset.off = '0';
  const y = active.offsetTop;
  const prev = INDY.get(app);
  INDY.set(app, y);
  ind.style.setProperty('--y', `${y}px`);
  ind.style.setProperty('--h', `${active.offsetHeight}px`);
  const mod = active.dataset.mod;
  ind.style.setProperty('--m', mod ? modVar(mod) : 'var(--brand)');
  /* weight: the longer the trip, the more the pill stretches before it lands */
  if (prev !== undefined && prev !== y) {
    const stretch = Math.min(0.22, Math.abs(prev - y) / 900);
    ind.style.setProperty('--sq', String(1 + stretch));
    setTimeout(() => ind.style.setProperty('--sq', '1'), 130);
  }
  railTint(app, mod);
}

/* module identity leaks into the surface, quietly. Never into the data. */
function railTint(app, mod) {
  const rail = $(app, '[data-railroot]');
  if (!rail) return;
  rail.style.setProperty('--railtint', mod ? modVar(mod) : 'var(--ink-3)');
  rail.dataset.tinted = mod ? '1' : '0';
}

/* Width is a layout property, so we never animate it. We change it once, then
   put every pixel back where it was and spring it home. Re-measuring live
   rects on entry is what makes a second click mid-flight feel physical. */
function railFlip(app, next) {
  const rail = $(app, '[data-railroot]');
  const main = $(app, '.main');
  if (!rail || !main) { app.dataset.nav = next; return; }
  const bg = $(rail, '.rail__bg');
  const edge = $(rail, '.rail__edge');
  const movers = [main, ...$$(rail, '.rail__head, .rail__cmd, .rail__scroll, .rail__shelf, .rail__foot')];
  const before = new Map(movers.map((el) => [el, el.getBoundingClientRect()]));
  const bgBefore = bg ? bg.getBoundingClientRect() : null;
  const edgeBefore = edge ? edge.getBoundingClientRect() : null;

  app.dataset.nav = next;

  const play = (el, dx, i) => {
    el.style.transition = 'none';
    el.style.transform = `translateX(${dx}px)`;
    raf(() => {
      el.style.transition = `transform 520ms var(--c-spring) ${Math.min(i, 5) * 12}ms`;
      el.style.transform = '';
      setTimeout(() => { el.style.transition = ''; }, 760);
    });
  };
  movers.forEach((el, i) => {
    const b = before.get(el);
    const a = el.getBoundingClientRect();
    const dx = b.left - a.left;
    if (Math.abs(dx) > 0.5) play(el, dx, i);
  });
  if (bg && bgBefore) {
    const a = bg.getBoundingClientRect();
    if (a.width && Math.abs(a.width - bgBefore.width) > 0.5) {
      bg.style.transition = 'none';
      bg.style.transform = `scaleX(${bgBefore.width / a.width})`;
      raf(() => {
        bg.style.transition = 'transform 520ms var(--c-spring)';
        bg.style.transform = '';
        setTimeout(() => { bg.style.transition = ''; }, 760);
      });
    }
  }
  if (edge && edgeBefore) {
    const a = edge.getBoundingClientRect();
    const dx = edgeBefore.left - a.left;
    if (Math.abs(dx) > 0.5) play(edge, dx, 0);
  }
  raf2(() => syncInd(app));
}

/* group expansion that never resets scroll · FLIP on transform only */
function toggleGroup(app, gi) {
  const scroll = $(app, '[data-railscroll]');
  const group = $(scroll, `.navgroup[data-gi="${gi}"]`);
  if (!scroll || !group) return;
  const head = $(group, '.navgroup__btn');
  const movers = $$(scroll, '.navitem, .navgroup__btn');
  const before = new Map(movers.map((el) => [el, el.getBoundingClientRect().top]));
  const headBefore = head.getBoundingClientRect().top;
  const scrollBefore = scroll.scrollTop;

  const open = group.dataset.open !== 'false';
  group.dataset.open = open ? 'false' : 'true';
  head.setAttribute('aria-expanded', String(!open));

  /* keep the clicked heading exactly where the finger left it */
  const headAfter = head.getBoundingClientRect().top;
  scroll.scrollTop = scrollBefore + (headAfter - headBefore);

  const opened = $$(group, '.navitem');
  movers.forEach((el) => {
    const b = before.get(el);
    if (b === undefined || !el.offsetParent) return;
    const d = b - el.getBoundingClientRect().top;
    if (!d) return;
    el.style.transition = 'none';
    el.style.transform = `translateY(${d}px)`;
  });
  raf(() => {
    movers.forEach((el, i) => {
      if (!el.style.transform) return;
      el.style.transition = `transform 460ms var(--c-spring) ${Math.min(i, 8) * 9}ms`;
      el.style.transform = '';
      setTimeout(() => { el.style.transition = ''; }, 700);
    });
    if (!open) {
      opened.forEach((el, i) => {
        el.style.animation = `d-in 300ms var(--ease-out-expo) ${i * 24}ms both`;
        setTimeout(() => { el.style.animation = ''; }, 760);
      });
    }
    syncInd(app);
  });
}

/* hover preview · a contextual layer with real content, not a tooltip */
function previewHTML(id) {
  const it = NAV_ITEMS.find((x) => x.id === id);
  if (!it) return '';
  if (it.mod) {
    const code = it.mod;
    const ts = TABLES.filter((t) => t.modules.includes(code))
      .sort((a, b) => b.fields - a.fields);
    const codes = uniq(ts.flatMap((t) => TCODES_OF[t.name] || []));
    const bk = booksFor(code);
    const last = RECENT.find((r) => r.t.modules.includes(code));
    const topics = code === 'PM' ? NEO.pmTopics : NEO.ppTopics;
    return `<div class="pv pv--mod" style="--m:${modVar(code)}">
      <header><i aria-hidden="true"></i><b>${esc(it.label)}</b><span>${esc(modHe(code))}</span></header>
      <div class="pv__nums">
        <span><b>${ts.length}</b>טבלאות</span><span><b>${codes.length}</b>טרנזקציות</span>
        <span><b>${topics.length}</b>נושאים</span><span><b>${bk.length}</b>ספרים</span></div>
      <ul class="pv__list">${ts.slice(0, 5).map((t) => `<li style="--o:${objVar(OBJ_OF[t.name])}">
        <span class="pv__cls" aria-hidden="true"></span>
        <span class="sap">${esc(t.name)}</span>
        <span>${esc(t.he)}</span><em>${t.fields}</em></li>`).join('')}</ul>
      ${last ? `<p class="pv__last">${icon('history', 11)}
        אחרון שנפתח: <span class="sap">${esc(last.name)}</span> · ${esc(last.when)}</p>` : ''}
      <p class="pv__f">${bk.slice(0, 1).map((b) => esc(b.title)).join('') || 'אין ספר משויך'}</p>
    </div>`;
  }
  const cnt = it.count;
  const sample = id === 'טרנזקציות' ? TCODES.slice(0, 6)
    : id === 'BAPIs / FMs' ? FUNCS.slice(0, 5).map((f) => f.name)
      : id === 'Fiori Apps' ? FIORI_APPS.slice(0, 5)
        : id === 'ספרייה דיגיטלית' ? BOOKS.slice(0, 4).map((b) => b.title)
          : id === 'מודל נתונים' ? NEO.entities.slice(0, 6).map((e) => e.name)
            : id === 'טבלאות' ? TABLES.slice(0, 6).map((t) => t.name) : [];
  return `<div class="pv">
    <header><i aria-hidden="true"></i><b>${esc(it.label)}</b><span>${esc(it.group)}</span></header>
    <div class="pv__nums">${cnt !== undefined
      ? `<span><b>${nf(cnt)}</b>רשומות</span>`
      : '<span class="pv__none"><b>—</b>אין ספירה מגובה בנתוני הפרויקט</span>'}</div>
    ${sample.length ? `<ul class="pv__list pv__list--flat">${sample.map((x) => `<li><span class="sap">${esc(x)}</span></li>`).join('')}</ul>` : ''}
  </div>`;
}

let pvTimer = null;
function showPreview(app, anchor) {
  const host = $(app, '[data-pv]') || (() => {
    const d = document.createElement('div'); d.className = 'pvhost'; d.dataset.pv = '';
    app.appendChild(d); return d;
  })();
  const html = previewHTML(anchor.dataset.nav);
  if (!html) return;
  host.innerHTML = html;
  const ar = anchor.getBoundingClientRect();
  const sr = app.getBoundingClientRect();
  const sc = parseFloat(getComputedStyle(stage).getPropertyValue('--scale')) || 1;
  const panel = host.firstElementChild;
  const h = panel.offsetHeight || 240;
  const w = panel.offsetWidth || 300;
  const rtl = getComputedStyle(app).direction === 'rtl';
  const appW = sr.width / sc;
  let y = (ar.top - sr.top) / sc - 8;
  y = Math.max(8, Math.min((sr.height / sc) - h - 8, y));
  /* measured in LOGICAL space: distance from the rail edge inwards, so the
     same maths lands correctly in RTL and in LTR */
  const nearEdge = rtl ? sr.right - ar.left : ar.right - sr.left;
  const farEdge = rtl ? sr.right - ar.right : ar.left - sr.left;
  let lx = nearEdge / sc + 10;
  if (lx + w > appW - 8) lx = farEdge / sc - w - 10;
  lx = Math.max(8, Math.min(appW - w - 8, lx));
  host.style.transform = `translate(${rtl ? -lx : lx}px, ${y}px)`;
  host.classList.add('is-on');
  if (anchor.dataset.mod) railTint(app, anchor.dataset.mod);
}
function hidePreview(app) {
  clearTimeout(pvTimer);
  const host = $(app, '[data-pv]');
  if (host) host.classList.remove('is-on');
}

/* the shelf: pinned / recent / context share one box and cross-fade */
function setShelf(app, tab) {
  const shelf = $(app, '.rail__shelf');
  if (!shelf) return;
  shelf.dataset.shelf = tab;
  $$(shelf, '[data-shelftab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.shelftab === tab)));
  $$(shelf, '[data-shelfpane]').forEach((p) => { p.hidden = p.dataset.shelfpane !== tab; });
  const ind = $(shelf, '[data-shelfind]');
  const on = $(shelf, `[data-shelftab="${tab}"]`);
  if (ind && on) {
    ind.style.setProperty('--w', `${on.offsetWidth}px`);
    ind.style.setProperty('--x', `${on.offsetLeft}px`);
  }
}

function setNavState(app, state) {
  if (state === 'mobile') { setVp('mobile'); setScreen('m-nav'); return; }
  const prev = app.dataset.nav;
  /* only the two states that actually change the rail width need the FLIP */
  const widthChange = (a, b) => (a === 'compact') !== (b === 'compact')
    || (a === 'context') !== (b === 'context');
  if (widthChange(prev, state)) railFlip(app, state); else app.dataset.nav = state;

  $$(navseg, 'button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.navjump === state)));
  $$(app, '[data-navstate]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.navstate === state)));
  const note = $(app, '[data-navnote]');
  if (note && NAV_STATE_NOTE[state]) note.textContent = NAV_STATE_NOTE[state];

  if (state === 'search') {
    const inp = $(app, '[data-navfilter]');
    if (inp) setTimeout(() => inp.focus(), 200);
  }
  if (state === 'context') setShelf(app, 'context');
  if (prev === 'context' && state !== 'context') setShelf(app, 'recent');
  if (state === 'hover') {
    const anchor = $(app, '.navitem[data-mod="PM"]');
    if (anchor) setTimeout(() => showPreview(app, anchor), 220);
  } else hidePreview(app);
  raf(() => syncInd(app));
}

/* Filtering the navigation and searching the dictionary are the same gesture:
   the list under the field narrows, and real records surface beneath it. */
function filterNav(app, q) {
  const s = q.trim().toLowerCase();
  let hits = 0;
  $$(app, '.navgroup').forEach((g) => {
    let gh = 0;
    $$(g, '.navitem').forEach((b) => {
      const on = !s || b.dataset.nav.toLowerCase().includes(s);
      b.parentElement.hidden = !on;
      if (on) { gh += 1; hits += 1; }
    });
    g.hidden = gh === 0;
  });
  const res = $(app, '[data-navres]');
  if (res) {
    if (!s) { res.innerHTML = ''; res.dataset.on = '0'; } else {
      const hit = search(q);
      const found = hit.groups.flatMap((g) => g.items.map((r) => ({ r, g }))).slice(0, 6);
      res.dataset.on = '1';
      res.innerHTML = found.length
        ? `<p class="railsrch__h">${hit.total} רשומות מהמילון</p>${found.map(({ r, g }) => {
          const a = (r.actions || [])[0];
          return `<button class="railres" type="button"
            ${a ? `data-ract="${esc(a.a)}" data-v="${esc(a.v)}"` : ''}>
            <span class="railres__k">${icon(g.ico, 12)}${esc(r.type)}</span>
            <span class="railres__t${r.mono ? ' sap' : ''}">${r.title}</span>
            <span class="railres__s">${r.desc}</span></button>`;
        }).join('')}
          <button class="railres railres--more" type="button" data-act="cmdk">
            ${icon('command', 12)} פתח את משטח החיפוש המלא <kbd>⌘K</kbd></button>`
        : `<p class="railsrch__none">אין רשומה במילון עבור "${esc(q)}".</p>`;
    }
  }
  const meta = $(app, '[data-navfiltermeta]');
  if (meta) meta.textContent = s ? `${hits} מתוך ${NAV_ITEMS.length} פריטי ניווט` : `${NAV_ITEMS.length} פריטי ניווט`;
  syncInd(app);
}

/* ---- one delegated handler per app shell -------------------------------- */
function wireApp(app) {
  const scroll = $(app, '[data-railscroll]');

  app.addEventListener('click', (e) => {
    const t = e.target;
    const grp = t.closest('[data-group]');
    if (grp) { toggleGroup(app, grp.dataset.group); return; }

    /* Scoped to buttons on purpose: the shell itself carries data-nav (the rail
       state), so an unscoped closest() would read every click as a nav click. */
    const nav = t.closest('button[data-nav]');
    if (nav) {
      $$(app, '.navitem').forEach((b) => b.removeAttribute('aria-current'));
      nav.setAttribute('aria-current', 'page');
      syncInd(app);
      routeNav(nav.dataset.nav);
      return;
    }
    const act = t.closest('[data-act]');
    if (act) {
      const a = act.dataset.act;
      if (a === 'railtoggle') setNavState(app, app.dataset.nav === 'compact' ? 'expanded' : 'compact');
      if (a === 'peek') setNavState(app, 'expanded');
      if (a === 'cmdk' || a === 'mobnav') openCmdk();
      if (a === 'navmode') setNavState(app, act.dataset.mode);
      if (a === 'navsearch') setNavState(app, 'search');
      if (a === 'walk') runWalk(app);
      if (a === 'discreset') { discState.hops = [{ k: 'tcode', v: 'IW31' }]; discState.i = 0; discRender(app.closest('.screen')); }
      return;
    }
    const stab = t.closest('[data-shelftab]');
    if (stab) { setShelf(app, stab.dataset.shelftab); return; }
    const enter = t.closest('[data-enter]');
    if (enter) { enterModule(enter.dataset.enter, enter); return; }
    const dq = t.closest('[data-demoq]');
    if (dq) { openCmdk(dq.dataset.demoq); return; }
    const fnode = t.closest('[data-flownode]');
    if (fnode) {
      $$(app, '[data-flownode]').forEach((b) => b.setAttribute('aria-current', String(b === fnode)));
      const det = $(app, '[data-flowdetail]');
      if (det) { det.innerHTML = flowDetailHTML(fnode.dataset.flownode); det.dataset.on = '1'; }
      return;
    }
    const hj = t.closest('[data-hjump]');
    if (hj) {
      const sec = $(app, `[data-hsec="${hj.dataset.hjump}"]`);
      const cv = $(app, '.canvas');
      if (sec && cv) cv.scrollTo({ top: sec.offsetTop - 8, behavior: 'smooth' });
      return;
    }
    const go = t.closest('[data-go]');
    if (go) { setScreen(go.dataset.go); return; }
    const hop = t.closest('[data-hop]');
    if (hop) { const [k, v] = hop.dataset.hop.split(':'); pushHop(app.closest('.screen'), k, v); return; }
    const obj = t.closest('[data-obj]');
    if (obj) { openObject(obj.dataset.obj); return; }
    const tc = t.closest('[data-tcode]');
    if (tc) { pushHop(null, 'tcode', tc.dataset.tcode); setScreen('discovery'); return; }
    const ract = t.closest('[data-ract]');
    if (ract) { runAction(ract.dataset.ract, ract.dataset.v); return; }
    const view = t.closest('[data-wsview]');
    if (view) {
      $$(app, '[data-wsview]').forEach((b) => b.setAttribute('aria-pressed', String(b === view)));
      $$(app, '[data-wsview-body]').forEach((b) => { b.hidden = b.dataset.wsviewBody !== view.dataset.wsview; });
      return;
    }
    const tab = t.closest('.objtab');
    if (tab) { $$(app, '.objtab').forEach((b) => b.setAttribute('aria-pressed', String(b === tab))); }
    const mtab = t.closest('[data-mtab]');
    if (mtab) {
      $$(app, '[data-mtab]').forEach((b) => b.removeAttribute('aria-current'));
      mtab.setAttribute('aria-current', 'page');
      if (mtab.dataset.mtab === 'search') setScreen('m-search');
      if (mtab.dataset.mtab === 'home') setScreen('m-home');
    }
  });

  app.addEventListener('pointerover', (e) => {
    const nav = e.target.closest('.navitem');
    if (!nav) return;
    clearTimeout(pvTimer);
    pvTimer = setTimeout(() => showPreview(app, nav), 260);
  });
  app.addEventListener('pointerout', (e) => {
    if (e.target.closest('.navitem') && !e.relatedTarget?.closest?.('.navitem')) hidePreview(app);
  });

  /* keyboard: full arrow navigation inside the rail */
  if (scroll) {
    scroll.addEventListener('keydown', (e) => {
      const items = $$(scroll, '.navitem').filter((b) => b.offsetParent);
      if (!items.length) return;
      const cur = items.indexOf(document.activeElement.closest('.navitem'));
      let i = cur;
      if (e.key === 'ArrowDown') i = cur < 0 ? 0 : Math.min(items.length - 1, cur + 1);
      else if (e.key === 'ArrowUp') i = cur < 0 ? items.length - 1 : Math.max(0, cur - 1);
      else if (e.key === 'Home') i = 0;
      else if (e.key === 'End') i = items.length - 1;
      else if (e.key === 'Escape') { hidePreview(app); return; }
      else return;
      e.preventDefault();
      items[i].focus();
      showPreview(app, items[i]);
    });
    scroll.addEventListener('scroll', () => {
      scroll.dataset.top = scroll.scrollTop > 3 ? '1' : '0';
      scroll.dataset.bot = (scroll.scrollHeight - scroll.clientHeight - scroll.scrollTop) > 3 ? '1' : '0';
    }, { passive: true });
    scroll.dispatchEvent(new Event('scroll'));
  }

  const nf2 = $(app, '[data-navfilter]');
  if (nf2) nf2.addEventListener('input', () => filterNav(app, nf2.value));

  const wsf = $(app, '[data-wsfilter]');
  if (wsf) {
    wsf.addEventListener('input', () => {
      const s = wsf.value.trim().toLowerCase();
      let n = 0;
      $$(app, '.dt tbody tr').forEach((tr) => {
        const on = !s || tr.textContent.toLowerCase().includes(s);
        tr.hidden = !on; if (on) n += 1;
      });
      const c = $(app, '[data-wscount]');
      if (c) c.textContent = `${n} שורות`;
    });
  }
}

function routeNav(id) {
  if (id === 'אחזקה · PM') return setScreen('pm');
  if (id === 'ייצור · PP-PI') return setScreen('pppi');
  if (id === 'מודל נתונים') return setScreen('erd');
  if (id === 'ספרייה דיגיטלית' || id === 'שאל את הספרייה') return setScreen('library');
  if (id === 'טרנזקציות') return setScreen('discovery');
  if (id === 'טבלאות') return setScreen('object');
  return null;
}
function openObject(name) {
  if (!TABLE.has(name)) return;
  const el = setScreen('object');
  const app = $(el, '.app');
  const body = $(app, '.canvas');
  body.innerHTML = objectBody(name) + creditBar();
  const ctx = $(app, '[data-railctx]');
  if (ctx) ctx.innerHTML = contextPanelHTML(name);
  $$(app, '.crumbs .cur').forEach((c) => { c.textContent = name; });
  body.scrollTop = 0;
}
function runAction(a, v) {
  if (a === 'object') return openObject(v);
  if (a === 'erd') return openERD(v);
  if (a === 'flow') { pushHop(null, 'table', v); return setScreen('discovery'); }
  if (a === 'tcode') { pushHop(null, 'tcode', v); return setScreen('discovery'); }
  if (a === 'library') return setScreen('library');
  if (a === 'module') return setScreen(v === 'PM' ? 'pm' : 'pppi');
  if (a === 'nav') return routeNav(v) || setScreen('home');
  return null;
}
$$(stage, '.app').forEach(wireApp);
/* the orbit lives on more than one screen, so it is wired per screen root */
['object', 'discovery', 'tablet', 'ultra'].forEach((id) => {
  const el = $(stage, `[data-screen-id="${id}"]`);
  if (el) wireOrbits(el);
});
/* =========================================================================
   HOME RUNTIME · the environment that re-forms as you scroll
   -------------------------------------------------------------------------
   Everything here writes only transform / opacity / a state attribute.
   Nothing here listens to wheel or touch, nothing preventDefaults a scroll,
   nothing locks the page. Scroll stays exactly as the browser shipped it.
   ======================================================================= */
const RND = (() => { const r = seeded(20260811); return Array.from({ length: DOTS.length * 2 }, r); })();
(() => {
  let h = 0; const band = {};
  DOTS.forEach((d) => {
    const hot = d.imp === 'action' || d.imp === 'replaced';
    d.h = hot ? h++ : -1;
    const k = d.imp || 'none';
    band[k] = band[k] || 0; d.b = band[k]; band[k] += 1;
  });
})();

const PRES_W = 340;
const IMP_BAND_X = { compat: 0.80, adapted: 0.60, replaced: 0.44, action: 0.26 };

/* Seven formations. Each one is a claim about the data, not decoration:
   0 gravity (module membership) · 1 ring (the universe) · 2 lanes (a worklist)
   3 corridor (frames the process) · 4 grid (the library) · 5 focus (the rows
   that need attention) · 6 bands (grouped by real migration impact). */
function dotXY(k, d, W, H) {
  const n = DOTS.length;
  const m = Math.min(W, H);
  const r1 = RND[d.i * 2]; const r2 = RND[d.i * 2 + 1];
  const G = 2.39996;
  switch (k) {
    case 0: {
      if (d.mod === 'both') {
        return { x: W * 0.50 + (r1 - 0.5) * 64, y: H * 0.14 + d.j * (H * 0.037), s: 1.05, o: 0.95 };
      }
      const cx = d.mod === 'PM' ? W * 0.76 : W * 0.24;
      const rad = m * (0.05 + 0.055 * Math.sqrt(d.j));
      const a = d.j * G;
      return { x: cx + Math.cos(a) * rad, y: H * 0.54 + Math.sin(a) * rad * 0.8, s: 1, o: 0.92 };
    }
    case 1: {
      const a = (d.i / n) * Math.PI * 2 - Math.PI / 2;
      return {
        x: W * 0.5 + Math.cos(a) * W * 0.40 * (1 + (r1 - 0.5) * 0.07),
        y: H * 0.50 + Math.sin(a) * H * 0.36 * (1 + (r2 - 0.5) * 0.07),
        s: 0.95, o: 0.8,
      };
    }
    case 2: {
      const lane = d.i % 4;
      return {
        x: (d.i / n) * W * 1.12 - W * 0.06 + (r1 - 0.5) * 22,
        y: H * (0.15 + lane * 0.22) + (r2 - 0.5) * 16, s: 0.8, o: 0.42,
      };
    }
    case 3: {
      const top = d.i % 2 === 0;
      return {
        x: (d.i / n) * W, y: top ? H * 0.04 + r1 * H * 0.07 : H * 0.89 + r1 * H * 0.07,
        s: 0.75, o: 0.34,
      };
    }
    case 4: {
      const cols = 15;
      return {
        x: W * 0.06 + (d.i % cols) * ((W * 0.88) / (cols - 1)),
        y: H * 0.10 + Math.floor(d.i / cols) * (H * 0.115), s: 0.8, o: 0.34,
      };
    }
    case 5: {
      if (d.h >= 0) {
        const a = d.h * G; const rad = m * (0.05 + 0.05 * Math.sqrt(d.h));
        return { x: W * 0.5 + Math.cos(a) * rad, y: H * 0.44 + Math.sin(a) * rad * 0.78, s: 1.5, o: 1 };
      }
      const a2 = d.i * G; const rad2 = m * (0.60 + r1 * 0.08);
      return { x: W * 0.5 + Math.cos(a2) * rad2, y: H * 0.5 + Math.sin(a2) * rad2 * 0.7, s: 0.6, o: 0.13 };
    }
    default: {
      const bx = IMP_BAND_X[d.imp];
      if (bx === undefined) return { x: W * 0.5 + (r1 - 0.5) * W * 0.9, y: H * 1.04, s: 0.5, o: 0.1 };
      const col = d.b % 6; const row = Math.floor(d.b / 6);
      return {
        x: W * bx + (col - 2.5) * (m * 0.021), y: H * 0.14 + row * (H * 0.037),
        s: 1.05, o: 0.85,
      };
    }
  }
}

function presPos(sec, W, H) {
  /* a wider stage should feel wider, not emptier: the bodies gain mass with
     the canvas instead of floating in it */
  const k = Math.min(1.5, Math.max(1, W / 1120));
  const kd = Math.min(1.25, k);
  if (sec <= 0) {
    return [{ l: W * 0.50, t: H * 0.15, s: 1 * k, r: 'l' },
      { l: W * 0.74, t: H * 0.50, s: 0.86 * k, r: 'l' }];
  }
  if (sec === 1) {
    /* both bodies take the far side of the top band; the RTL headline keeps
       the reading edge, so nothing is ever stacked on top of anything */
    return [{ l: W * 0.58, t: H * 0.05, s: 0.50 * kd, r: 'm' },
      { l: W * 0.58 + PRES_W * 0.50 * kd + 26, t: H * 0.05, s: 0.50 * kd, r: 'm' }];
  }
  const dock = 120 * kd;
  return [{ l: Math.max(W - dock, W * 0.78), t: H * 0.22, s: 0.30 * kd, r: 'd' },
    { l: Math.max(W - dock, W * 0.78), t: H * 0.22 + 136 * kd, s: 0.30 * kd, r: 'd' }];
}

const homeState = { sec: -1, w: 0, h: 0 };

function homeLayout(host, force) {
  const field = $(host, '[data-hfield]');
  const pres = $(host, '[data-hpres]');
  const flow = $(host, '[data-hflow]');
  const cv = $(host, '.canvas');
  if (!field || !cv) return;
  const W = cv.clientWidth; const H = cv.clientHeight;
  if (!W || !H) return;
  flow.style.setProperty('--c-vh', `${H}px`);
  const resized = W !== homeState.w || H !== homeState.h;
  homeState.w = W; homeState.h = H;
  if (!resized && !force) return;
  paintDots(host, Math.max(0, homeState.sec), W, H, true);
  paintPres(pres, Math.max(0, homeState.sec), W, H, true);
}

function paintDots(host, sec, W, H, instant) {
  const wrap = $(host, '[data-hdots]');
  if (!wrap) return;
  const dots = $$(wrap, '.hdot');
  dots.forEach((el, i) => {
    const p = dotXY(sec, DOTS[i], W, H);
    el.style.transition = instant ? 'none' : '';
    el.style.transitionDelay = instant ? '0ms' : `${(i % 24) * 11}ms`;
    el.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) scale(${p.s})`;
    el.style.opacity = String(p.o);
  });
  if (instant) raf(() => dots.forEach((el) => { el.style.transition = ''; }));
}

function paintPres(pres, sec, W, H, instant) {
  if (!pres) return;
  const pos = presPos(sec, W, H);
  const list = $$(pres, '.pres');
  list.forEach((el, i) => {
    const p = pos[i] || pos[0];
    el.style.transition = instant ? 'none' : '';
    el.style.transitionDelay = instant ? '0ms' : `${i * 70}ms`;
    el.style.transform = `translate(${(-p.l).toFixed(1)}px, ${p.t.toFixed(1)}px) scale(${p.s})`;
    el.dataset.r = p.r;
  });
  if (instant) raf(() => list.forEach((el) => { el.style.transition = ''; }));
  pres.dataset.sec = String(sec);
}

function wireHome() {
  const host = $(stage, '[data-screen-id="home"]');
  if (!host) return;
  const app = $(host, '.app');
  const cv = $(app, '.canvas');
  const flow = $(app, '[data-hflow]');
  const field = $(app, '[data-hfield]');
  const pres = $(app, '[data-hpres]');
  const secs = $$(app, '[data-hsec]');
  if (!cv || !flow || !field) return;

  /* ---- section state · read scroll, never take it over ------------------ */
  let ticking = false;
  const sync = () => {
    ticking = false;
    const probe = cv.scrollTop + cv.clientHeight * 0.36;
    let k = 0;
    secs.forEach((s, i) => { if (probe >= s.offsetTop) k = i; });
    flow.style.setProperty('--sy', String(Math.round(cv.scrollTop)));
    if (k === homeState.sec) return;
    homeState.sec = k;
    field.dataset.sec = String(k);
    app.dataset.hactive = String(k);
    paintDots(app, k, cv.clientWidth, cv.clientHeight, false);
    paintPres(pres, k, cv.clientWidth, cv.clientHeight, false);
    $$(app, '[data-hjump]').forEach((b, i) => b.setAttribute('aria-current', String(i === k)));
  };
  cv.addEventListener('scroll', () => {
    if (ticking) return; ticking = true; raf(sync);
  }, { passive: true });

  /* ---- reveal ---------------------------------------------------------- */
  if (!document.hidden) secs.forEach((sec) => { sec.dataset.pre = '1'; });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.dataset.in = '1'; });
    }, { root: cv, rootMargin: '0px 0px -18% 0px', threshold: 0.08 });
    secs.forEach((s) => io.observe(s));
  } else {
    secs.forEach((s) => { s.dataset.in = '1'; });
  }

  /* ---- pointer proximity · depth, not a gimmick ------------------------- */
  let pTick = false; let px = 0; let py = 0;
  app.addEventListener('pointermove', (e) => {
    const r = cv.getBoundingClientRect();
    px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    if (pTick) return; pTick = true;
    raf(() => {
      pTick = false;
      flow.style.setProperty('--mx', px.toFixed(3));
      flow.style.setProperty('--my', py.toFixed(3));
    });
  }, { passive: true });
  app.addEventListener('pointerleave', () => {
    flow.style.setProperty('--mx', '0'); flow.style.setProperty('--my', '0');
  });

  /* ---- cards that behave like objects ---------------------------------- */
  $$(app, '[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--rx', ((0.5 - (e.clientY - r.top) / r.height) * 7).toFixed(2));
      card.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 9).toFixed(2));
      card.style.setProperty('--gx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      card.style.setProperty('--gy', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0'); card.style.setProperty('--ry', '0');
    });
  });

  /* ---- keep the environment honest about its own size ------------------- */
  if ('ResizeObserver' in window) {
    new ResizeObserver(() => homeLayout(app, false)).observe(cv);
  }
  raf2(() => { homeLayout(app, true); sync(); });
}
wireHome();
$$(stage, '.app').forEach((a) => { setShelf(a, 'recent'); syncInd(a); });


/* =========================================================================
   SHARED-ELEMENT MODULE ENTRY (FLIP) · Concept B's signature move, faster
   ======================================================================= */
function travel(snap, toEl) {
  if (!snap || !toEl) return;
  const s = stage.getBoundingClientRect();
  const sc = parseFloat(getComputedStyle(stage).getPropertyValue('--scale')) || 1;
  const a = snap.rect;
  const b = toEl.getBoundingClientRect();
  if (!a.width || !b.width) return;

  const g = document.createElement('div');
  g.className = 'ghost';
  g.style.inlineSize = `${b.width / sc}px`;
  g.style.blockSize = `${b.height / sc}px`;

  const dest = toEl.cloneNode(true);
  const src = snap.node;
  [dest, src].forEach((c) => {
    c.classList.add('ghostlayer');
    c.removeAttribute('id');
    $$(c, '[id]').forEach((x) => x.removeAttribute('id'));
    $$(c, 'button,a,input,[tabindex]').forEach((x) => x.setAttribute('tabindex', '-1'));
  });
  dest.style.opacity = '0';
  g.append(dest, src);

  const rel = (r) => ({ x: (r.right - s.right) / sc, y: (r.top - s.top) / sc });
  const pa = rel(a); const pb = rel(b);
  g.style.transform = `translate(${pa.x}px, ${pa.y}px) scale(${a.width / b.width}, ${a.height / b.height})`;
  fx.append(g);
  toEl.style.opacity = '0';

  let done = false;
  const end = () => { if (done) return; done = true; g.remove(); toEl.style.opacity = ''; };
  g.addEventListener('transitionend', (e) => { if (e.propertyName === 'transform') end(); }, { once: true });
  setTimeout(end, 700);
  raf2(() => {
    g.classList.add('is-moving');
    g.style.transform = `translate(${pb.x}px, ${pb.y}px)`;
    dest.style.opacity = '1';
    src.style.opacity = '0';
  });
}

function enterModule(code, fromEl) {
  const target = code === 'PM' ? 'pm' : code === 'PP-PI' ? 'pppi' : 'pp';
  const node = fromEl.cloneNode(true);
  setScreen(target, { flip: { rect: fromEl.getBoundingClientRect(), node, to: `hero-${code}` } });
}

/* =========================================================================
   COMMAND · one sovereign instance per host, never re-mounted
   ======================================================================= */
class Command {
  constructor(root, uid, opts = {}) {
    this.uid = uid; this.opts = opts;
    this.wrap = $(root, `[data-cmd="${uid}"]`);
    if (!this.wrap) return;
    this.input = $(this.wrap, '.cmd__input');
    this.panel = $(this.wrap, '.cmd__panel');
    this.list = $(this.wrap, '.cmd__list');
    this.count = $(this.wrap, '[data-role="count"]');
    this.lanes = $(this.wrap, '[data-role="lanes"]');
    this.live = $(this.wrap, '[data-role="live"]');
    this.clear = $(this.wrap, '[data-act="clear"]');
    this.sel = 0; this.rows = [];

    this.input.addEventListener('input', () => this.render(true));
    this.input.addEventListener('focus', () => this.open());
    this.input.addEventListener('keydown', (e) => this.key(e));
    this.clear.addEventListener('click', () => { this.input.value = ''; this.render(true); this.input.focus(); });
    $$(this.wrap, '[data-q]').forEach((b) => b.addEventListener('click', () => {
      this.input.value = b.dataset.q; this.render(true); this.input.focus();
      $$(this.wrap, '[data-q]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    }));
    this.list.addEventListener('click', (e) => {
      const ract = e.target.closest('[data-ract]');
      if (ract) { closeCmdk(); runAction(ract.dataset.ract, ract.dataset.v); return; }
      /* the AI lane links straight into its own evidence */
      const src = e.target.closest('.ailane [data-obj], .ailane [data-go]');
      if (src) {
        closeCmdk();
        if (src.dataset.obj) openObject(src.dataset.obj); else setScreen(src.dataset.go);
        return;
      }
      const row = e.target.closest('[role="option"]');
      if (row) { this.sel = +row.dataset.i; this.paint(); this.activate(); }
    });
    if (this.lanes) {
      this.lanes.addEventListener('click', (e) => {
        const b = e.target.closest('[data-lanego]');
        if (!b) return;
        const k = b.dataset.lanego;
        const el = k === 'ai' ? $(this.list, '.ailane') : $(this.list, `[data-lane="${k}"]`);
        if (el) this.list.scrollTop = Math.max(0, el.offsetTop - 6);
      });
    }
    this.list.addEventListener('mousemove', (e) => {
      const row = e.target.closest('[role="option"]');
      if (row && +row.dataset.i !== this.sel) { this.sel = +row.dataset.i; this.paint(); }
    });
    if (opts.open) this.open();
    this.render(false);
  }
  open() { this.panel.dataset.open = 'true'; this.input.setAttribute('aria-expanded', 'true'); }
  close() { if (this.opts.always) return; this.panel.dataset.open = 'false'; this.input.setAttribute('aria-expanded', 'false'); }
  render(reset) {
    const q = this.input.value;
    this.clear.hidden = !q;
    this.rows = []; let i = 0; let html = ''; let lanes = '';
    if (q.trim()) {
      const res = search(q);
      if (res.total) {
        html += aiLaneHTML(res.ai, q.trim());
        res.groups.forEach((g) => {
          html += `<div class="cmd__grp" data-lane="${g.key}"><header>${icon(g.ico, 13)}<span>${esc(g.label)}</span>
            <b>${g.items.length}</b></header>`;
          g.items.forEach((r) => { html += resultRowHTML(this.uid, r, i); this.rows.push(r); i += 1; });
          if (g.note) html += `<p class="cmd__note">${icon('alertTriangle', 12)}<span>${esc(g.note)}</span></p>`;
          html += '</div>';
        });
        /* the lane index is the shape of the answer, before you read a word */
        const max = Math.max(...res.groups.map((g) => g.items.length), 1);
        lanes = `<span class="cmd__lanesh">מסלולים</span>${res.groups.map((g) => `
          <button class="lane" type="button" data-lanego="${g.key}">
            <span class="lane__i" aria-hidden="true">${icon(g.ico, 13)}</span>
            <span class="lane__l">${esc(g.label)}</span>
            ${g.items.length ? `<span class="lane__b" aria-hidden="true" style="--f:${g.items.length / max}"></span>` : ''}
            <span class="lane__n">${g.items.length || '—'}</span>
          </button>`).join('')}
          <button class="lane lane--ai" type="button" data-lanego="ai">
            <span class="lane__i" aria-hidden="true">${icon('sparkles', 13)}</span>
            <span class="lane__l">NEO AI</span>
            <span class="lane__n">${res.ai ? res.ai.metrics.reduce((n, m) => n + (m.n ? 1 : 0), 0) : 0}</span>
          </button>`;
        this.count.textContent = `${res.total} תוצאות ב-${res.groups.length} מסלולים`;
      } else {
        html = `<div class="cmd__empty">
          <p>לא נמצאה התאמה ל-<span class="sap">${esc(q.trim())}</span>.</p>
          <p class="s">המילון מכיל ${TABLES.length} טבלאות, ${TCODES.length} טרנזקציות,
            ${FUNCS.length} פונקציות ו-${BOOKS.length} ספרים. אין המצאה של תוצאה.</p></div>`;
        this.count.textContent = '0 תוצאות';
        lanes = '<span class="cmd__lanesh">מסלולים</span><p class="cmd__lanesnone">אין מסלול פעיל</p>';
      }
      if (this.live) this.live.textContent = `${res.total}`;
      if (this.opts.respond) this.opts.respond(res);
    } else {
      html = suggestHTML(this.uid);
      this.rows = [...RECENT.slice(0, 2).map((r) => tableRecord(r.t, '')), tcodeRecord('IW31', ''), tableRecord(TABLE.get('MARA'), '')];
      this.count.textContent = 'התחלות מהירות';
      lanes = `<span class="cmd__lanesh">המילון</span>${[[TABLES.length, 'טבלאות', 'table'],
        [TCODES.length, 'טרנזקציות', 'terminal'], [NEO.entities.length, 'ישויות', 'gitBranch'],
        [FUNCS.length, 'BAPI / FM', 'sigma'], [BOOKS.length, 'ספרים', 'bookOpen']]
        .map(([n, l, ic]) => `<span class="lane lane--static">
          <span class="lane__i" aria-hidden="true">${icon(ic, 13)}</span>
          <span class="lane__l">${esc(l)}</span><span class="lane__n">${nf(n)}</span></span>`).join('')}`;
      if (this.live) this.live.textContent = '';
      if (this.opts.respond) this.opts.respond({ q: '', modules: [], tables: [], total: 0 });
    }
    this.list.innerHTML = html;
    if (this.lanes) this.lanes.innerHTML = lanes;
    if (reset) this.sel = 0;
    this.paint();
    this.open();
  }
  paint() {
    $$(this.list, '[role="option"]').forEach((r) => {
      const on = +r.dataset.i === this.sel;
      r.setAttribute('aria-selected', String(on));
      r.classList.toggle('is-sel', on);
      if (on) {
        this.input.setAttribute('aria-activedescendant', r.id);
        const rb = r.getBoundingClientRect(); const lb = this.list.getBoundingClientRect();
        if (rb.top < lb.top) this.list.scrollTop -= (lb.top - rb.top) + 8;
        else if (rb.bottom > lb.bottom) this.list.scrollTop += (rb.bottom - lb.bottom) + 8;
      }
    });
  }
  activate() {
    const r = this.rows[this.sel];
    if (!r) return;
    closeCmdk();
    if (r.kind === 'table') openObject(r.id);
    else if (r.kind === 'tcode') { pushHop(null, 'tcode', r.id); setScreen('discovery'); }
    else if (r.kind === 'book') setScreen('library');
    else if (r.kind === 'topic') setScreen(r.modules[0] === 'PM' ? 'pm' : 'pppi');
    else if (r.kind === 'page') routeNav(r.id);
  }
  key(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); this.sel = Math.min(this.rows.length - 1, this.sel + 1); this.paint(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); this.sel = Math.max(0, this.sel - 1); this.paint(); }
    else if (e.key === 'Enter') { e.preventDefault(); this.activate(); }
    else if (e.key === 'Escape') { e.preventDefault(); if (this.opts.overlay) closeCmdk(); else { this.input.value = ''; this.render(true); } }
  }
}

/* ---- the overlay (⌘K anywhere) ----------------------------------------- */
const overlayCmd = new Command(scrim, 'd-overlay', {
  overlay: true, always: true,
  respond: (res) => respondSurface(res),
});
function openCmdk(q) {
  scrim.hidden = false;
  raf(() => {
    scrim.classList.add('is-on');
    if (q !== undefined) { overlayCmd.input.value = q; overlayCmd.render(true); }
    overlayCmd.input.focus();
    overlayCmd.input.select();
  });
  const app = $(stage, `[data-screen-id="${currentScreen}"] .app`);
  if (app) app.dataset.searching = 'true';
}
function closeCmdk() {
  scrim.classList.remove('is-on');
  setTimeout(() => { scrim.hidden = true; }, 200);
  $$(stage, '.app').forEach((a) => { a.dataset.searching = 'false'; });
}
scrim.addEventListener('click', (e) => { if (e.target === scrim) closeCmdk(); });

/* the surrounding surface answers the query · not just the modal */
function respondSurface(res) {
  const mods = new Set(res.modules || []);
  const names = new Set(res.tables || []);
  $$(stage, '.app').forEach((app) => {
    $$(app, '.navitem').forEach((b) => {
      b.dataset.hit = res.q && b.dataset.mod && mods.has(b.dataset.mod) ? '1' : '0';
    });
    $$(app, '.mcard').forEach((c) => {
      c.dataset.hit = res.q ? String(mods.has(c.dataset.enter)) : '';
    });
    $$(app, '[data-rnode]').forEach((c) => {
      c.dataset.hit = res.q ? String(mods.has(c.dataset.rnode)) : '';
    });
    const meta = $(app, '[data-respondmeta]');
    if (meta) {
      meta.textContent = res.q
        ? `"${res.q}" נוגע ב-${mods.size ? Array.from(mods).join(' · ') : 'אף מודול'} · ${names.size} טבלאות`
        : 'אין שאילתה, הכול מואר';
    }
    const tb = $(app, '[data-respondtables]');
    if (tb) {
      tb.innerHTML = Array.from(names).map((nm) => {
        const t = TABLE.get(nm);
        return `<button class="rt" type="button" data-obj="${esc(nm)}"
          style="--m:${modVar(t.modules[0])};--o:${oVar(nm)}">
          <i class="rt__cls" aria-hidden="true"></i>
          <span class="sap">${esc(nm)}</span><span>${esc(t.he)}</span>
          <b class="rt__n">${t.fields}</b>
          <em>${mchips(t.modules, 'mchip--sm')}</em></button>`;
      }).join('');
    }
  });
}

/* the inline sovereign command on the search screen */
const searchScreenEl = $(stage, '[data-screen-id="search"]');
new Command(searchScreenEl, 'd-cmd', { always: true, respond: respondSurface });
new Command($(stage, '[data-screen-id="m-search"]'), 'd-mcmd', { always: true });

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCmdk(); }
  else if (e.key === 'Escape' && !scrim.hidden) closeCmdk();
});

/* =========================================================================
   DISCOVERY · connected paths, never back to the sidebar
   ======================================================================= */
const discState = { hops: [{ k: 'tcode', v: 'IW31' }], i: 0 };

function discRender(screenEl) {
  const el = screenEl || $(stage, '[data-screen-id="discovery"]');
  const rail = $(el, '[data-pathrail]');
  const host = $(el, '[data-hopstage]');
  const map = $(el, '[data-discmap]');
  if (!rail || !host) return;

  /* the trail · a travelling connector between stations, transform only */
  rail.innerHTML = discState.hops.map((h, i) => {
    const isTable = h.k === 'table';
    const o = isTable ? oVar(h.v) : 'var(--rel-inferred)';
    return `
    <button class="phop" type="button" data-phop="${i}" aria-pressed="${i === discState.i}"
      data-k="${h.k}" data-past="${i < discState.i ? '1' : '0'}" style="--o:${o}">
      <span class="phop__dot" aria-hidden="true"></span>
      <span class="phop__i" aria-hidden="true">${icon(HOP_ICO[h.k], 14)}</span>
      <span class="phop__t"><b>${esc(hopTitle(h))}</b><em>${esc(HOP_KIND[h.k])}</em></span>
    </button>
    ${i < discState.hops.length - 1 ? `<span class="phop__a" aria-hidden="true">
      <i class="phop__line"><b></b></i></span>` : ''}`;
  }).join('');

  const h = discState.hops[discState.i];
  const isSap = h.k === 'table' || h.k === 'tcode';
  const cls = h.k === 'table' ? oVar(h.v) : null;
  host.innerHTML = `<article class="hop" data-k="${h.k}"${cls ? ` style="--o:${cls}"` : ''}>
    <header class="hop__h1">
      ${cls ? '<span class="hop__cls" aria-hidden="true"></span>' : ''}
      <span class="hop__kind">${icon(HOP_ICO[h.k], 15)} ${esc(HOP_KIND[h.k])}</span>
      <h2 class="${isSap ? 'sap' : ''}">${esc(hopTitle(h))}</h2>
      ${h.k === 'table' ? `<span class="hop__clsl">${esc(oHe(h.v))}</span>` : ''}
      <span class="grow"></span>
      <span class="hop__step">שלב ${discState.i + 1} מתוך ${discState.hops.length}</span>
    </header>
    ${hopBody(h)}
    <footer class="hop__next">
      <span class="hop__nexth">${icon('workflow', 12)} המשך המסע · ${nextOptions(h).length} כיוונים</span>
      <div class="hop__nextrow">${nextOptions(h).map((o, i) => `<button class="nexto" type="button"
        data-hop="${o.k}:${esc(o.v)}" style="--d:${i * 40}ms${o.k === 'table' && TABLE.has(o.v) ? `;--o:${oVar(o.v)}` : ''}">
        <span class="nexto__i" aria-hidden="true">${icon(HOP_ICO[o.k], 13)}</span>
        <span class="nexto__l ${o.k === 'table' || o.k === 'tcode' ? 'sap' : ''}">${esc(o.l)}</span>
        <span class="nexto__k">${esc(HOP_KIND[o.k])}</span>
      </button>`).join('')}</div>
    </footer>
  </article>`;
  host.classList.remove('is-in'); void host.offsetWidth; host.classList.add('is-in');

  /* the station map · progressive disclosure of where a journey can still go */
  if (map) {
    const reached = new Set(discState.hops.map((x) => STATION_OF[x.k]));
    if (discState.hops.some((x) => x.k === 'table')) reached.add(2);
    const cur = STATION_OF[h.k];
    const anchor = [...discState.hops].reverse().find((x) => x.k === 'table');
    const av = anchor ? anchor.v : 'AUFK';
    const target = { tcode: (TCODES_OF[av] || [])[0], table: av, rel: av, flow: av, book: (booksFor((TABLE.get(av) || { modules: ['PM'] }).modules[0])[0] || {}).id, trouble: av, note: av };
    map.innerHTML = `
      <h3 class="discmap__h">${icon('layers', 12)} תחנות המסע</h3>
      <ol class="discmap__l">${DISC_STATIONS.map((s, i) => {
    const state = i === cur ? 'now' : reached.has(i) ? 'done' : 'open';
    const v = target[s.k];
    const go = s.k === 'rel' ? `data-hop="table:${esc(av)}"` : (v ? `data-hop="${s.k}:${esc(v)}"` : '');
    return `<li data-state="${state}">
          <button type="button" ${go}>
            <span class="dst__i" aria-hidden="true">${icon(s.ico, 13)}</span>
            <span class="dst__l">${esc(s.l)}</span>
            <span class="dst__s" aria-hidden="true"></span>
          </button></li>`;
  }).join('')}</ol>
      <p class="discmap__n">העוגן הנוכחי: <span class="sap">${esc(av)}</span> ·
        ${(TCODES_OF[av] || []).length} טרנזקציות · ${relsOf(av).list.length} קשרים.</p>`;
  }
}

function nextOptions(h) {
  const out = [];
  if (h.k === 'tcode') {
    (TCODE_INDEX[h.v] || []).slice(0, 3).forEach((n) => out.push({ k: 'table', v: n, l: n }));
  } else if (h.k === 'table') {
    const r = relsOf(h.v);
    r.list.slice(0, 3).forEach((x) => { if (TABLE.has(x.table)) out.push({ k: 'table', v: x.table, l: x.table }); });
    (TCODES_OF[h.v] || []).slice(0, 2).forEach((c) => out.push({ k: 'tcode', v: c, l: c }));
    out.push({ k: 'flow', v: h.v, l: 'רצף הטרנזקציות' });
    const b = (booksFor((TABLE.get(h.v) || { modules: ['PM'] }).modules[0]) || [])[0];
    if (b) out.push({ k: 'book', v: b.id, l: 'ספר קשור' });
    out.push({ k: 'trouble', v: h.v, l: 'בדיקות המרה' });
    out.push({ k: 'note', v: h.v, l: 'הערת S/4' });
  } else if (h.k === 'flow') {
    out.push({ k: 'table', v: h.v, l: `חזרה ל-${h.v}` });
    out.push({ k: 'trouble', v: h.v, l: 'בדיקות המרה' });
  } else if (h.k === 'book') {
    out.push({ k: 'table', v: 'EQUI', l: 'EQUI' });
    out.push({ k: 'table', v: 'AUFK', l: 'AUFK' });
  } else if (h.k === 'trouble') {
    out.push({ k: 'note', v: h.v, l: 'הערת S/4' });
    out.push({ k: 'table', v: h.v, l: `חזרה ל-${h.v}` });
  } else {
    out.push({ k: 'table', v: h.v, l: `חזרה ל-${h.v}` });
  }
  return out.slice(0, 7);
}

function pushHop(screenEl, k, v) {
  if (k === 'table' && !TABLE.has(v)) return;
  discState.hops = discState.hops.slice(0, discState.i + 1);
  discState.hops.push({ k, v });
  discState.i = discState.hops.length - 1;
  if (discState.hops.length > 12) { discState.hops.shift(); discState.i -= 1; }
  discRender(screenEl || $(stage, '[data-screen-id="discovery"]'));
}

$(stage, '[data-screen-id="discovery"]').addEventListener('click', (e) => {
  const p = e.target.closest('[data-phop]');
  if (p) { discState.i = +p.dataset.phop; discRender(); }
});

let walkTimer = null;
function runWalk() {
  clearInterval(walkTimer);
  discState.hops = [FLOW_STEPS[0]]; discState.i = 0; discRender();
  let n = 1;
  walkTimer = setInterval(() => {
    if (n >= FLOW_STEPS.length) { clearInterval(walkTimer); return; }
    discState.hops.push(FLOW_STEPS[n]); discState.i = discState.hops.length - 1;
    discRender(); n += 1;
  }, 950);
}
discRender();

/* =========================================================================
   ERD · professional canvas: pan · zoom (gated) · fit · search · inspector
   ======================================================================= */
const erd = { focus: ERD_START, s: 1, tx: 0, ty: 0, sel: ERD_START, layout: null };
const erdEl = $(stage, '[data-screen-id="erd"]');
const erdCanvas = $(erdEl, '[data-erdcanvas]');
const erdSvg = $(erdEl, '[data-erdsvg]');
const erdMini = $(erdEl, '[data-erdminisvg]');
const erdVp = $(erdEl, '[data-erdvp]');
const erdTip = $(erdEl, '[data-erdtip]');
const erdBadge = $(erdEl, '[data-erdzoombadge]');

function erdDraw() {
  const L = erdLayout(erd.focus);
  erd.layout = L;
  const pos = new Map(L.nodes.map((n) => [n.name, n]));
  /* selection is a relationship highlight: the selected entity, everything it
     really joins to, and nothing else stays at full strength */
  const near = new Set([erd.sel]);
  L.edges.forEach((e) => {
    if (e.a === erd.sel) near.add(e.b);
    if (e.b === erd.sel) near.add(e.a);
  });
  const dim = near.size > 1;

  const edges = L.edges.map((e, i) => {
    const a = pos.get(e.a); const b = pos.get(e.b);
    if (!a || !b) return '';
    const on = erd.sel === e.a || erd.sel === e.b;
    return `<g class="eedge ${on ? 'is-on' : ''} ${dim && !on ? 'is-dim' : ''}" data-eedge="${i}"
        style="--r:${relVar(e.card)}">
      <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"></line>
      <text x="${(a.x + b.x) / 2}" y="${(a.y + b.y) / 2 - 6}">${esc(e.card)}</text>
      <title>${esc(e.join)}</title></g>`;
  }).join('');

  const nodes = L.nodes.map((n) => {
    /* object hue on a visualisation surface, never the module hue */
    const o = oVar(n.name);
    const t = TABLE.get(n.name);
    const w = n.ring === 0 ? 138 : 122; const h = n.ring === 0 ? 54 : 46;
    const near2 = near.has(n.name);
    return `<g class="enode ${erd.sel === n.name ? 'is-sel' : ''} ${erd.focus === n.name ? 'is-focus' : ''} ${dim && !near2 ? 'is-dim' : ''}"
        data-enode="${esc(n.name)}" transform="translate(${n.x} ${n.y})" style="--o:${o}"
        tabindex="0" role="button" aria-label="${esc(n.name)} · ${esc(oHe(n.name))}">
      <rect class="en__bg" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="9"></rect>
      <rect class="en__cls" x="${-w / 2}" y="${-h / 2}" width="4" height="${h}" rx="2"></rect>
      <text class="en__t" y="${n.ring === 0 ? -6 : -3}">${esc(n.name)}</text>
      <text class="en__s" y="${n.ring === 0 ? 10 : 12}">${n.ent ? `${n.ent.fields} שדות · ${n.ent.relations.length} קשרים` : 'לא ממודלת'}</text>
      ${n.ring === 0 && t ? `<text class="en__x" y="22">${(TCODES_OF[n.name] || []).length} טרנזקציות</text>` : ''}
    </g>`;
  }).join('');

  erdSvg.innerHTML = `<g data-erdg transform="translate(${erd.tx} ${erd.ty}) scale(${erd.s})">${edges}${nodes}</g>`;
  erdMini.innerHTML = L.nodes.map((n) => `<circle cx="${n.x}" cy="${n.y}" r="${n.ring === 0 ? 30 : 18}"
    class="mini ${erd.sel === n.name ? 'is-sel' : ''}" style="--o:${oVar(n.name)}"></circle>`).join('');
  erdBadge.textContent = `${Math.round(erd.s * 100)}%`;
  erdSyncVp();
  erdInspect();
  erdList();
}
function erdSyncVp() {
  const w = 1200 / erd.s; const h = 900 / erd.s;
  const x = (-600 - erd.tx) / erd.s; const y = (-450 - erd.ty) / erd.s;
  erdVp.style.insetInlineStart = `${((x + 600) / 1200) * 100}%`;
  erdVp.style.insetBlockStart = `${((y + 450) / 900) * 100}%`;
  erdVp.style.inlineSize = `${(w / 1200) * 100}%`;
  erdVp.style.blockSize = `${(h / 900) * 100}%`;
}
function erdInspect() {
  const host = $(erdEl, '[data-erdinsp]');
  const e = ENT.get(erd.sel);
  const t = TABLE.get(erd.sel);
  if (!e) {
    host.innerHTML = `<div class="insp"><h3 class="sap">${esc(erd.sel)}</h3>
      <p class="empty">${t ? 'הטבלה קיימת במילון אך לא ממודלת ב-ERD של הפרויקט.' : 'אין רשומה במילון.'}</p></div>`;
    return;
  }
  host.innerHTML = `<div class="insp" style="--m:${modVar(e.module)};--o:${oVar(e.name)}">
    <span class="insp__band" aria-hidden="true"></span>
    <header><span class="insp__k">ישות</span><h3 class="sap">${esc(e.name)}</h3>
      ${mchip(e.module, 'mchip--sm')}<span class="insp__cls">${esc(oHe(e.name))}</span></header>
    <p class="insp__he">${esc(e.he)}</p>
    <p class="insp__en lt">${esc(e.en)}</p>
    <div class="insp__nums"><span><b>${e.fields}</b>שדות</span>
      <span><b>${e.relations.length}</b>קשרים</span>
      <span><b>${(TCODES_OF[e.name] || []).length}</b>T-codes</span></div>
    <p class="insp__topic">${esc(e.topic)}</p>
    <p class="insp__tc sap">${esc(e.tcodes)}</p>
    <h4>קשרים · JOIN מהמאגר</h4>
    <ul class="insp__rels">${e.relations.map((r) => `<li style="--r:${relVar(r.card)};--o2:${oVar(r.table)}">
      <button type="button" data-erdgo="${esc(r.table)}"><i class="odot" aria-hidden="true"></i>
        <span class="sap">${esc(r.table)}</span>
        <span class="card">${esc(r.card)}</span></button>
      <code>${esc(r.join)}</code><em>${esc(r.desc)}</em></li>`).join('')}</ul>
    <div class="insp__acts">
      <button class="btn btn--s" type="button" data-erdfocus="${esc(e.name)}">${icon('gitBranch', 13)} מקד כאן</button>
      <button class="btn btn--s" type="button" data-obj="${esc(e.name)}">${icon('appWindow', 13)} עמוד אובייקט</button>
    </div>
  </div>`;
}
function erdList(q = '') {
  const ul = $(erdEl, '[data-erdlist]');
  const cnt = $(erdEl, '[data-erdcount]');
  const s = q.trim().toLowerCase();
  const items = NEO.entities.filter((e) => !s || `${e.name} ${e.he} ${e.en}`.toLowerCase().includes(s));
  if (cnt) cnt.textContent = s ? `${items.length}/${NEO.entities.length}` : String(NEO.entities.length);
  ul.innerHTML = items.map((e) => `<li><button type="button" data-erdgo="${esc(e.name)}"
    class="${e.name === erd.sel ? 'is-on' : ''}" style="--m:${modVar(e.module)};--o:${oVar(e.name)}">
    <i class="odot" aria-hidden="true"></i>
    <span class="sap">${esc(e.name)}</span><span class="he">${esc(e.he)}</span>
    <span class="n">${e.relations.length}</span></button></li>`).join('')
    || '<li class="empty">אין ישות תואמת.</li>';
}
function erdFit() { erd.s = 1; erd.tx = 0; erd.ty = 0; erdDraw(); }
function erdZoom(f) { erd.s = Math.max(0.4, Math.min(2.6, erd.s * f)); erdDraw(); }
function openERD(name) {
  const el = setScreen('erd');
  if (ENT.has(name)) { erd.focus = name; erd.sel = name; }
  else erd.sel = name;
  erdFit();
  return el;
}

erdEl.addEventListener('click', (e) => {
  const z = e.target.closest('[data-erdzoom]');
  if (z) {
    const k = z.dataset.erdzoom;
    if (k === 'in') erdZoom(1.22); else if (k === 'out') erdZoom(1 / 1.22);
    else erdFit();
    return;
  }
  const go = e.target.closest('[data-erdgo]');
  if (go) { erd.sel = go.dataset.erdgo; if (ENT.has(erd.sel)) erd.focus = erd.sel; erdDraw(); return; }
  const foc = e.target.closest('[data-erdfocus]');
  if (foc) { erd.focus = foc.dataset.erdfocus; erd.sel = erd.focus; erdFit(); return; }
  const nd = e.target.closest('[data-enode]');
  if (nd) { erd.sel = nd.dataset.enode; erdDraw(); return; }
  if (e.target.closest('[data-erdfull]')) { erdEl.classList.toggle('is-full'); erdFit(); }
});
erdEl.addEventListener('dblclick', (e) => {
  const nd = e.target.closest('[data-enode]');
  if (nd && ENT.has(nd.dataset.enode)) { erd.focus = nd.dataset.enode; erd.sel = erd.focus; erdFit(); }
});
const erdSearchInput = $(erdEl, '[data-erdsearch]');
erdSearchInput.addEventListener('input', () => erdList(erdSearchInput.value));

/* hover info */
erdSvg.addEventListener('pointermove', (e) => {
  const nd = e.target.closest('[data-enode]');
  if (!nd) { erdTip.hidden = true; return; }
  const name = nd.dataset.enode;
  const t = TABLE.get(name); const en = ENT.get(name);
  const r = erdCanvas.getBoundingClientRect();
  const sc = parseFloat(getComputedStyle(stage).getPropertyValue('--scale')) || 1;
  erdTip.hidden = false;
  erdTip.innerHTML = `<b class="sap">${esc(name)}</b>
    <span>${esc((en || t || {}).he || 'אין רשומה')}</span>
    ${t ? `<em>${t.fields} שדות · ${(TCODES_OF[name] || []).length} T-codes · ${t.modules.join(' · ')}</em>` : ''}`;
  erdTip.style.transform = `translate(${(e.clientX - r.left) / sc + 14}px, ${(e.clientY - r.top) / sc + 14}px)`;
});
erdSvg.addEventListener('pointerleave', () => { erdTip.hidden = true; });

/* pan */
let drag = null;
erdCanvas.addEventListener('pointerdown', (e) => {
  if (e.target.closest('[data-enode]')) return;
  drag = { x: e.clientX, y: e.clientY, tx: erd.tx, ty: erd.ty };
  erdCanvas.setPointerCapture(e.pointerId);
  erdCanvas.dataset.grab = '1';
});
erdCanvas.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const r = erdCanvas.getBoundingClientRect();
  const per = 1200 / r.width;
  erd.tx = drag.tx + (e.clientX - drag.x) * per;
  erd.ty = drag.ty + (e.clientY - drag.y) * per;
  const g = $(erdSvg, '[data-erdg]');
  if (g) g.setAttribute('transform', `translate(${erd.tx} ${erd.ty}) scale(${erd.s})`);
  erdSyncVp();
});
const endDrag = () => { drag = null; erdCanvas.dataset.grab = '0'; };
erdCanvas.addEventListener('pointerup', endDrag);
erdCanvas.addEventListener('pointercancel', endDrag);

/* WHEEL: page scrolling is never hijacked. Zoom only with Ctrl/⌘. */
erdCanvas.addEventListener('wheel', (e) => {
  if (!(e.ctrlKey || e.metaKey)) return;
  e.preventDefault();
  erdZoom(e.deltaY < 0 ? 1.1 : 1 / 1.1);
}, { passive: false });

erdCanvas.addEventListener('keydown', (e) => {
  const step = 60;
  if (e.key === '+' || e.key === '=') { e.preventDefault(); erdZoom(1.22); }
  else if (e.key === '-' || e.key === '_') { e.preventDefault(); erdZoom(1 / 1.22); }
  else if (e.key === '0') { e.preventDefault(); erdFit(); }
  else if (e.key.toLowerCase() === 'f') { e.preventDefault(); erdFit(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); erd.tx -= step; erdDraw(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); erd.tx += step; erdDraw(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); erd.ty -= step; erdDraw(); }
  else if (e.key === 'ArrowDown') { e.preventDefault(); erd.ty += step; erdDraw(); }
});
erdDraw();

/* =========================================================================
   UNIVERSE · honest coverage
   ======================================================================= */
const uniEl = $(stage, '[data-screen-id="universe"]');
function uniPanel(id) {
  const nd = UNIVERSE.nodes.find((x) => x.id === id);
  const host = $(uniEl, '[data-unipanel]');
  if (!nd) return;
  const bks = booksFor(nd.id);
  const edges = UNIVERSE.edges.filter((e) => e.a === nd.id || e.b === nd.id);
  host.innerHTML = `<div class="up" data-tier="${nd.tier}" style="--m:${modVar(nd.id)}">
    <header><span class="up__k">${nd.tier === 'full' ? 'מילון מלא + ספרים'
      : nd.tier === 'books' ? 'ספרייה בלבד' : 'בתכנון · אין תוכן'}</span>
      <h3>${esc(nd.id)}</h3><p>${esc(nd.he)} · <span class="lt">${esc(nd.en)}</span></p></header>
    ${nd.tier === 'planned'
      ? `<p class="up__soon">${icon('clock', 14)} בקרוב. אין מילון, אין ספר, ואין מספרים.
          לא יוצג כאן נתון שלא קיים.</p>`
      : `<div class="up__nums">
          ${nd.tables ? `<span><b>${nd.tables}</b>טבלאות</span><span><b>${nf(nd.fields)}</b>שדות</span>
            <span><b>${nd.topics}</b>נושאים</span><span><b>${nd.funcs}</b>פונקציות</span>`
            : `<span><b>${bks.length}</b>ספרים</span>
               <span><b>${nf(bks.reduce((n, b) => n + b.sections, 0))}</b>סעיפים</span>
               <span class="up__none"><b>—</b>מילון טכני בקרוב</span>`}
        </div>
        ${bks.length ? `<ul class="booklist">${bks.map((b) => `<li style="--m:${modVar(b.module)}">
          <i aria-hidden="true"></i><span class="bt">${esc(b.title)}</span>
          <span class="bm">${b.chapters} פרקים</span></li>`).join('')}</ul>` : ''}`}
    <h4>קשרים (${edges.length})</h4>
    <ul class="up__edges">${edges.map((e) => `<li data-strength="${e.strength}">
      <b>${esc(e.a === nd.id ? e.b : e.a)}</b>
      <span>${e.strength === 'evidence' ? 'מגובה בנתונים' : 'ידוע ב-SAP, לא ממודל אצלנו'}</span>
      <em>${esc(e.note)}</em></li>`).join('') || '<li class="empty">אין קשר רשום.</li>'}</ul>
    ${nd.tier !== 'planned' && (nd.id === 'PM' || nd.id === 'PP-PI')
      ? `<button class="btn btn--s" type="button" data-enter="${esc(nd.id)}">${icon('arrowUpRight', 13)} כניסה לסביבת ${esc(nd.id)}</button>` : ''}
  </div>`;
}
uniPanel('PM');
uniEl.addEventListener('click', (e) => {
  const n = e.target.closest('[data-unode]');
  if (n) {
    if (n.dataset.tier === 'planned') { uniPanel(n.dataset.unode); return; }
    $$(uniEl, '[data-unode]').forEach((x) => x.classList.toggle('is-sel', x === n));
    uniPanel(n.dataset.unode);
    return;
  }
  const row = e.target.closest('[data-uedgerow]');
  if (row) {
    const i = row.dataset.uedgerow;
    $$(uniEl, '[data-uedge]').forEach((x) => x.classList.toggle('is-on', x.dataset.uedge === i));
    $$(uniEl, '[data-uedgerow]').forEach((x) => x.classList.toggle('is-on', x === row));
  }
});
uniEl.addEventListener('keydown', (e) => {
  const n = e.target.closest('[data-unode]');
  if (n && (e.key === 'Enter' || e.key === ' ') && n.dataset.tier !== 'planned') {
    e.preventDefault(); uniPanel(n.dataset.unode);
  }
});

/* =========================================================================
   NAV STATE JUMPS FROM THE PROTOTYPE CHROME
   ======================================================================= */
navseg.addEventListener('click', (e) => {
  const b = e.target.closest('[data-navjump]');
  if (!b) return;
  const st = b.dataset.navjump;
  if (st === 'mobile') { setNavState(null, 'mobile'); return; }
  const el = setScreen('nav');
  const app = $(el, '.app');
  $$(navseg, 'button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  if (st === 'active') {
    const it = $(app, '.navitem[data-nav="ייצור · PP-PI"]');
    $$(app, '.navitem').forEach((x) => x.removeAttribute('aria-current'));
    if (it) it.setAttribute('aria-current', 'page');
    setNavState(app, 'expanded');
    raf(() => syncInd(app));
  } else setNavState(app, st);
});
$$(stage, '.app').forEach((app) => {
  $$(app, '[data-navstate]').forEach((b) => b.addEventListener('click', () => {
    setNavState(app, b.dataset.navstate);
  }));
});

/* =========================================================================
   DEMO · the end-to-end reviewer walk
   ======================================================================= */
const DEMO = [
  { s: 'home', t: 'בית · סביבה אחת שמתארגנת מחדש בכל גלילה. 105 נקודות = 105 טבלאות אמיתיות, ושני גופי המודול שורדים את כל שבעת המקטעים.' },
  { s: 'nav', t: 'הניווט: תשעה מצבים על אותו DOM. שינוי הרוחב נבלע ב-FLIP, המחוון נוסע ונמתח, והחיפוש צומח מתוך הרכיב עצמו.', f: () => { const a = $(stage, '[data-screen-id="nav"] .app'); setNavState(a, 'compact'); setTimeout(() => setNavState(a, 'expanded'), 900); } },
  { s: 'search', t: '⌘K · חיפוש ריבוני. הקלד IW31, והמשטח מסביב מגיב, לא רק חלון קופץ.', f: () => { const c = $(stage, '[data-screen-id="search"] .cmd__input'); c.value = 'IW31'; c.dispatchEvent(new Event('input')); } },
  { s: 'search', t: 'חמש שאילתות בדיקה: IW31 · MARA · MRP · Process Order · Equipment · כולן מחזירות נתון אמיתי.', f: () => { const c = $(stage, '[data-screen-id="search"] .cmd__input'); c.value = 'Process Order'; c.dispatchEvent(new Event('input')); } },
  { s: 'home', t: 'כניסה למודול: הכרטיס עצמו הופך לכותרת סביבת העבודה (FLIP).', f: () => setTimeout(() => { const card = $(stage, '[data-screen-id="home"] [data-enter="PM"]'); if (card) enterModule('PM', card); }, 650) },
  { s: 'pm', t: 'מצב עבודה. הטיפוגרפיה ירדה דרגה, הצפיפות עלתה, תקציב התנועה ירד ל-L1.', silent: true },
  { s: 'object', t: 'עמוד אובייקט: AUFK עם הקשרי PM ו-PP-PI, מפתחות JOIN אמיתיים והערות S/4 מילה במילה.' },
  { s: 'discovery', t: 'מסע גילוי: IW31 → AUFK → AFIH → EQUI → IW32 → תהליך → ספר → המרה → הערת S/4.', f: () => runWalk() },
  { s: 'erd', t: 'ERD מקצועי: הזזה, זום מגודר ב-Ctrl/⌘, התאמה, חיפוש, מיני-מפה ומפקח.', f: () => { erd.focus = 'EQUI'; erd.sel = 'EQUI'; erdFit(); } },
  { s: 'universe', t: 'יקום SAP: ארבעה מצבי כיסוי. מודול בתכנון = "בקרוב", בלי מספרים מומצאים.' },
  { s: 'library', t: 'ספרייה: יעד בלבד. מימוש הקורא קפוא ולא נוגעים בו.' },
  { s: 'ultra', t: '2560 מלחין מחדש לארבע עמודות אמיתיות, לא שוליים שמנים.', f: () => setVp('ultra') },
  { s: 'home', t: 'חזרה הביתה. המסלול נסגר.', f: () => setVp('desktop') },
];
let demoI = -1;
function demoStep(i) {
  if (i < 0 || i >= DEMO.length) return demoEnd();
  demoI = i;
  const st = DEMO[i];
  setScreen(st.s, { silentMode: !!st.silent });
  if (st.f) st.f();
  coach.hidden = false;
  coach.innerHTML = `<span class="coach__n">${i + 1}/${DEMO.length}</span>
    <span class="coach__t">${esc(st.t)}</span>
    <span class="grow"></span>
    <button class="btn btn--s" type="button" data-demo="prev" ${i === 0 ? 'disabled' : ''}>${icon('chevronRight', 13)} הקודם</button>
    <button class="btn btn--s btn--brand" type="button" data-demo="next">${i === DEMO.length - 1 ? 'סיום' : 'הבא'} ${icon('chevronLeft', 13)}</button>
    <button class="iconbtn" type="button" data-demo="end" aria-label="צא מההדגמה">${icon('x', 14)}</button>`;
  demoBtn.setAttribute('aria-pressed', 'true');
  return null;
}
function demoEnd() { coach.hidden = true; demoI = -1; demoBtn.setAttribute('aria-pressed', 'false'); }
demoBtn.addEventListener('click', () => (demoI < 0 ? demoStep(0) : demoEnd()));
coach.addEventListener('click', (e) => {
  const b = e.target.closest('[data-demo]');
  if (!b) return;
  if (b.dataset.demo === 'next') demoStep(demoI + 1);
  else if (b.dataset.demo === 'prev') demoStep(demoI - 1);
  else demoEnd();
});

/* =========================================================================
   BOOT
   ======================================================================= */
document.getElementById('footCredit').textContent = NEO.brand.credit;
document.getElementById('footBrand').textContent = `${NEO.brand.name} · ${NEO.brand.product}`;
fitStage();
paintPills(SCREENS[0]);
const boot = location.hash.slice(1);
setScreen(SCREEN.has(boot) ? boot : 'home', { silentMode: true });
raf(() => $$(stage, '.app').forEach(syncInd));
