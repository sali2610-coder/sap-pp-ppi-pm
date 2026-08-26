/* ============================================================================
   Concept D · Engineering specification sheet — SAP by Sali · PROJECT NEO
   100% offline ES module. Every SAP string comes from ../shared/content.js,
   ../shared/universe.js or ../shared/discovery.js. Nothing here is invented.
   Every contrast number is computed at runtime from the live custom properties.
   ========================================================================== */

import icon from '../shared/icons.js';
import { NEO } from '../shared/content.js';
import { UNIVERSE } from '../shared/universe.js';
import { DISCOVERY } from '../shared/discovery.js';
import { MODULE_ID } from '../shared/modules.js';

const html = document.documentElement;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const n = (x) => Number(x).toLocaleString('en-US');

/* ══════════════════════════════════════════ 1 · colour + contrast maths */

function toRGB(v) {
  v = String(v).trim();
  if (v.startsWith('#')) {
    let h = v.slice(1);
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const m = v.match(/rgba?\(([^)]+)\)/);
  if (m) return m[1].split(/[,\s/]+/).filter(Boolean).slice(0, 3).map(Number);
  return [0, 0, 0];
}
/** WCAG 2.1 relative luminance. */
function lum(v) {
  const [r, g, b] = toRGB(v).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
/** WCAG 2.1 contrast ratio. */
function cr(a, b) {
  const la = lum(a), lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
/** Chroma proxy used across this sheet: sRGB max channel minus min channel. */
function chroma(v) {
  const c = toRGB(v);
  return Math.max(...c) - Math.min(...c);
}
const r2 = (x) => x.toFixed(2);

function verdict(ratio) {
  if (ratio >= 7) return ['AAA', 'aaa'];
  if (ratio >= 4.5) return ['AA', 'aa'];
  if (ratio >= 3) return ['AA גדול', 'lg'];
  return ['נכשל', 'fail'];
}
const passHTML = (ratio) => {
  const [t, k] = verdict(ratio);
  return `<span class="pass pass--${k}">${t}</span>`;
};

/** Read live custom properties for a theme without leaving the theme applied. */
function readTokens(theme, names) {
  const prev = html.dataset.theme;
  html.dataset.theme = theme;
  const cs = getComputedStyle(html);
  const out = {};
  names.forEach((k) => { out[k] = cs.getPropertyValue(k).trim(); });
  html.dataset.theme = prev;
  return out;
}

/* ══════════════════════════════════════════════════ 2 · chrome + shell */

const SECTIONS = [
  { id: 's1', n: '01', label: 'אסימונים' },
  { id: 's2', n: '02', label: 'תנועה' },
  { id: 's3', n: '03', label: 'רכיבים' },
  { id: 's4', n: '04', label: 'שלבי יישום' },
  { id: 's5', n: '05', label: 'ביצועים' },
  { id: 's6', n: '06', label: 'נגישות' },
];

$('#secnav').innerHTML = SECTIONS.map((s) =>
  `<a href="#${s.id}" data-spy="${s.id}"><b>${s.n}</b>${esc(s.label)}</a>`).join('');

const spyLinks = new Map(SECTIONS.map((s) => [s.id, $(`[data-spy="${s.id}"]`)]));
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    spyLinks.forEach((a) => a.removeAttribute('aria-current'));
    spyLinks.get(e.target.id)?.setAttribute('aria-current', 'true');
  });
}, { rootMargin: '-18% 0px -74% 0px' });
SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) spy.observe(el); });

/* reading progress rail — transform only */
const railFill = $('#progressRail i');
railFill.style.inlineSize = '100%';
railFill.style.transform = 'scaleX(0)';
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const h = document.body.scrollHeight - innerHeight;
    railFill.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
    ticking = false;
  });
}, { passive: true });

/* icons in the chrome */
$$('[data-ico]').forEach((el) => { el.innerHTML = icon(el.dataset.ico, 15); });

/* theme */
const themeBtn = $('#themeBtn');
function setTheme(t) {
  html.dataset.theme = t;
  const dark = t === 'dark';
  themeBtn.setAttribute('aria-pressed', String(dark));
  $('.tool__ico', themeBtn).innerHTML = icon(dark ? 'sun' : 'moon', 15);
  $('.tool__lbl', themeBtn).textContent = dark ? 'מצב בהיר' : 'מצב כהה';
  renderTokenSection();
}
themeBtn.addEventListener('click', () => setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark'));

/* reduced motion — two buttons, one state */
const motionBtns = [$('#motionBtn'), $('#motionBtn2')];
function setMotion(mode) {
  html.dataset.motion = mode;
  const red = mode === 'reduced';
  motionBtns.forEach((b) => {
    b.setAttribute('aria-pressed', String(red));
    const lbl = $('.tool__lbl', b);
    if (b.id === 'motionBtn') lbl.textContent = red ? 'תנועה מלאה' : 'תנועה מופחתת';
    else lbl.textContent = red ? 'החזר תנועה מלאה' : 'הפעל תנועה מופחתת';
  });
}
motionBtns.forEach((b) => b.addEventListener('click', () =>
  setMotion(html.dataset.motion === 'reduced' ? 'full' : 'reduced')));
if (matchMedia('(prefers-reduced-motion: reduce)').matches) setMotion('reduced');

$('#footCredit').textContent = NEO.brand.credit;

/* ══════════════════════════════════════════════════ 3 · masthead facts */

const PM = NEO.modules.find((m) => m.code === 'PM');
const PPPI = NEO.modules.find((m) => m.code === 'PP-PI');
const TOTAL_TABLES = PM.tables + PPPI.tables;
const TOTAL_FIELDS = PM.fields + PPPI.fields;
const ENTITY_COUNT = NEO.entities.length;
const REL_COUNT = NEO.entities.reduce((s, e) => s + (e.relations?.length || 0), 0);
const UNI_NODES = UNIVERSE.nodes.length;
const MOD_TOKEN_COUNT = Object.keys(MODULE_ID).length;

$('#mastFacts').innerHTML = [
  [`${MOD_TOKEN_COUNT}`, 'אסימוני זהות מודול חדשים · שתי ערכות'],
  ['12', 'תנועות מתועדות · שלושה דרגים'],
  ['7', 'שלבי יישום · ארבעה מהם עצמאיים'],
  ['0', 'WebGL · 0 אימוג׳י · 0 נכס מרוחק'],
  [`${n(TOTAL_TABLES)}`, `טבלאות SAP אמיתיות · ${n(TOTAL_FIELDS)} שדות`],
].map(([b, s]) => `<div class="fact"><b class="num">${esc(b)}</b><span>${esc(s)}</span></div>`).join('');

/* ══════════════════════════════════════════════ 4 · §1 · design tokens */

const PLANES = [
  ['--background', 'רקע האפליקציה', 'המישור העמוק ביותר. אף כרטיס לא יושב עליו ישירות בלי קו־שיער.'],
  ['--surface', 'משטח כרטיס', 'ברירת המחדל לכל רכיב מוגדר.'],
  ['--surface-2', 'משטח מוגבה', 'ראש טבלה, מצב hover, שקע.'],
  ['--hairline', 'קו־שיער', 'הגבול היחיד. עובי 1px, לעולם לא 2px למעט חוצץ סקשן.'],
];

function planesTable(theme, label) {
  const t = readTokens(theme, ['--background', '--surface', '--surface-2', '--hairline', '--ink-1', '--ink-3']);
  const rows = PLANES.map(([k, name, note]) => `
    <div class="plane" style="background:${t[k]};border-block-end-color:${t['--hairline']}">
      <span style="color:${t['--ink-1']}"><b>${k}</b> <span style="color:${t['--ink-3']}">${esc(name)}</span></span>
      <span style="color:${t['--ink-3']}" class="num">${t[k]}</span>
    </div>`).join('');
  return `<div class="themebox" style="background:${t['--background']};border-color:${t['--hairline']}">
    <span class="cap" style="color:${t['--ink-3']}">${esc(label)}</span>
    <div class="planes" style="border-color:${t['--hairline']}">${rows}</div>
    <p style="color:${t['--ink-3']};font-size:var(--t-micro);margin-block-start:var(--sp-3)">
      ${esc(PLANES.map((p) => p[2])[3])}
    </p>
  </div>`;
}

function renderPlanes() {
  $('#planes').innerHTML = `<div class="grid2">${planesTable('light', 'ערכה בהירה')}${planesTable('dark', 'ערכה כהה')}</div>`;
}

/* ---- 1.2 ink hierarchy ---- */
function inkTable(theme, label) {
  const t = readTokens(theme, ['--ink-1', '--ink-2', '--ink-3', '--surface', '--surface-2', '--hairline', '--background']);
  const rows = [
    ['--ink-1', 'כותרות · ערכים · טקסט ראשי'],
    ['--ink-2', 'גוף טקסט · תיאורים'],
    ['--ink-3', 'מטא בלבד — מספרים, תוויות מִשנה, זמנים. לא גוף טקסט.'],
  ].map(([k, use]) => {
    const a = cr(t[k], t['--surface']);
    const b = cr(t[k], t['--surface-2']);
    return `<tr>
      <td><span class="dot" style="background:${t[k]}"></span> <span class="sap">${k}</span></td>
      <td>${esc(use)}</td>
      <td class="n">${r2(a)}:1 ${passHTML(a)}</td>
      <td class="n">${r2(b)}:1 ${passHTML(b)}</td>
    </tr>`;
  }).join('');
  return `<div class="card">
    <span class="cap">${esc(label)}</span>
    <table class="ctable">
      <thead><tr><th>אסימון</th><th>שימוש מותר</th><th>מול surface</th><th>מול surface-2</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}
function renderInks() {
  $('#inks').innerHTML = `<div class="grid2">${inkTable('light', 'ערכה בהירה')}${inkTable('dark', 'ערכה כהה')}</div>`;
}

/* ---- 1.3 brand triad ---- */
function brandCard(theme, label) {
  const t = readTokens(theme, ['--brand', '--brand-dark', '--brand-soft', '--brand-foreground', '--surface', '--ink-1', '--ink-3', '--hairline']);
  const onSurface = cr(t['--brand'], t['--surface']);
  const fgOnBrand = cr(t['--brand-foreground'], t['--brand']);
  const darkOnSurface = cr(t['--brand-dark'], t['--surface']);
  return `<div class="card">
    <span class="cap">${esc(label)}</span>
    <div class="brandrow">
      <div class="bswatch" style="background:${t['--brand']};color:${t['--brand-foreground']};border-color:transparent">
        <b>--brand</b><span>${t['--brand']}</span>
      </div>
      <div class="bswatch" style="background:${t['--brand-dark']};color:${t['--brand-foreground']};border-color:transparent">
        <b>--brand-dark</b><span>${t['--brand-dark']}</span>
      </div>
      <div class="bswatch" style="background:${t['--brand-soft']};color:${t['--ink-1']};border-color:${t['--hairline']}">
        <b>--brand-soft</b><span>${t['--brand-soft']}</span>
      </div>
    </div>
    <table class="ctable">
      <tbody>
        <tr><td>‏brand כטקסט על surface</td><td class="n">${r2(onSurface)}:1 ${passHTML(onSurface)}</td></tr>
        <tr><td>‏brand-foreground על מילוי brand</td><td class="n">${r2(fgOnBrand)}:1 ${passHTML(fgOnBrand)}</td></tr>
        <tr><td>‏brand-dark כטקסט על surface</td><td class="n">${r2(darkOnSurface)}:1 ${passHTML(darkOnSurface)}</td></tr>
      </tbody>
    </table>
  </div>`;
}
function renderBrand() {
  $('#brand').innerHTML = `
    <div class="grid2">${brandCard('light', 'ערכה בהירה')}${brandCard('dark', 'ערכה כהה')}</div>
    <div class="card" style="margin-block-start:var(--sp-4)">
      <span class="cap">חוק הנגיעה — שלושה שימושים מותרים, השאר אסור</span>
      <p class="usegood">סמן הפריט הפעיל בניווט — פס 2px, זה כל האדום שיש בסרגל.</p>
      <p class="usegood">טבעת מיקוד — <span class="sap">--focus-ring</span>, שפה אחת בכל המוצר.</p>
      <p class="usegood">שורת תוצאה נבחרת — <span class="sap">--sel-bg</span> עם פס <span class="sap">--sel-bar</span>.</p>
      <p class="usebad">אסור: זהות מודול, סטטוס הגירה, מילוי כרטיס, צבע של גוף טקסט, גבול של רכיב במצב מנוחה.</p>
      <p class="usebad">אסור: יותר מלחצן ראשי אחד במסך. יותר מנקודת אדום אחת בשדה ראייה אחד.</p>
    </div>`;
}

/* ---- 1.4 status palette ---- */
const STATUS = [
  ['--status-not-started', 'טרם החל'],
  ['--status-in-analysis', 'בניתוח'],
  ['--status-in-conversion', 'בהמרה'],
  ['--status-tested', 'נבדק'],
  ['--status-done', 'הושלם'],
];
function statusTable(theme, label) {
  const keys = STATUS.map((s) => s[0]).concat(['--surface', '--ink-2']);
  const t = readTokens(theme, keys);
  const rows = STATUS.map(([k, he]) => {
    const a = cr(t[k], t['--surface']);
    return `<tr>
      <td><span class="dot" style="background:${t[k]}"></span> <span class="sap">${k.replace('--status-', '')}</span></td>
      <td>${esc(he)}</td>
      <td class="n">${chroma(t[k])}</td>
      <td class="n">${r2(a)}:1 ${passHTML(a)}</td>
    </tr>`;
  }).join('');
  return `<div class="card">
    <span class="cap">${esc(label)}</span>
    <table class="ctable">
      <thead><tr><th>אסימון</th><th>משמעות</th><th>כרומה</th><th>כטקסט על surface</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}
function renderStatus() {
  $('#status').innerHTML = `
    <div class="grid2">${statusTable('light', 'ערכה בהירה')}${statusTable('dark', 'ערכה כהה')}</div>
    <div class="card" style="margin-block-start:var(--sp-4)">
      <span class="cap">כלל השימוש שנגזר מהמספרים</span>
      <p class="usebad">צבעי הסטטוס אינם עוברים AA כטקסט בערכה הבהירה. אסור להשתמש בהם כ־<span class="sap">color</span> של מחרוזת.</p>
      <p class="usegood">מותר: נקודה, מילוי תג, קצה פס — תמיד לצד תווית מילולית ב־<span class="sap">--ink-2</span>. הצבע מחזק, המילה קובעת.</p>
      <p class="usegood">מותר: צורה משנית לצד הצבע (מלא / חלול / מקווקו) כדי שהמידע ישרוד עיוורון צבעים.</p>
    </div>`;
}

/* ---- 1.5 module identity tokens ---- */
const MOD_KEYS = [
  ['--mod-pm', 'PM'], ['--mod-pppi', 'PP-PI'], ['--mod-pp', 'PP'], ['--mod-ppds', 'PP/DS'],
  ['--mod-mm', 'MM'], ['--mod-qm', 'QM'], ['--mod-ewm', 'EWM'], ['--mod-fiori', 'Fiori'],
  ['--mod-sop', 'S&OP'], ['--mod-s4', 'S/4'],
];

function modGrid(theme, label) {
  const t = readTokens(theme, MOD_KEYS.map((m) => m[0]).concat(['--surface', '--surface-2', '--background', '--hairline', '--ink-1', '--ink-3']));
  const cells = MOD_KEYS.map(([k, id]) => {
    const v = t[k];
    const a = cr(v, t['--surface']);
    const b = cr(v, t['--surface-2']);
    const meta = MODULE_ID[id];
    const uni = UNIVERSE.nodes.find((x) => x.id === id);
    return `<div class="modcell" style="border-color:${t['--hairline']};background:${t['--surface']}">
      <div class="modcell__top">
        <span class="modcell__chip" style="background:${v}"></span>
        <span>
          <span class="modcell__id" style="color:${t['--ink-1']}">${esc(id)}</span>
          <span class="modcell__he" style="display:block;color:${t['--ink-3']}">${esc(meta ? meta.he : (uni ? uni.he : ''))}</span>
        </span>
      </div>
      <div class="modcell__on" style="color:${v};background:${t['--surface-2']};border-block-start-color:${t['--hairline']}">
        טקסט בגוון המודול
      </div>
      <div class="modcell__met" style="color:${t['--ink-3']}">
        <span><i>ערך</i><b>${v}</b></span>
        <span><i>surface</i><b>${r2(a)}:1 ${verdict(a)[0]}</b></span>
        <span><i>surface-2</i><b>${r2(b)}:1 ${verdict(b)[0]}</b></span>
        <span><i>כרומה</i><b>${chroma(v)}</b></span>
      </div>
    </div>`;
  }).join('');
  const worst = Math.min(...MOD_KEYS.map(([k]) => cr(t[k], t['--surface-2'])));
  return `<div class="themebox" style="background:${t['--background']};border-color:${t['--hairline']}">
    <span class="cap" style="color:${t['--ink-3']}">
      ${esc(label)} · הנמוך ביותר מול surface-2: <b class="num">${r2(worst)}:1</b> ${verdict(worst)[0]}
    </span>
    <div class="modgrid">${cells}</div>
  </div>`;
}
function renderMods() {
  $('#modsLight').innerHTML = modGrid('light', 'ערכה בהירה · 10 מודולים');
  $('#modsDark').innerHTML = modGrid('dark', 'ערכה כהה · 10 מודולים');
}

/* ---- 1.6 the separation law, measured ---- */
function renderChroma() {
  const t = readTokens('light', MOD_KEYS.map((m) => m[0]).concat(STATUS.map((s) => s[0])).concat(['--hairline', '--ink-3']));
  const modC = MOD_KEYS.map(([k, id]) => ({ id, v: t[k], c: chroma(t[k]) }));
  const stC = STATUS.map(([k, he]) => ({ id: he, v: t[k], c: chroma(t[k]) }));
  const maxMod = Math.max(...modC.map((x) => x.c));
  const satStatus = stC.filter((x) => x.c > 100);
  const minSat = Math.min(...satStatus.map((x) => x.c));
  const grey = stC.filter((x) => x.c <= 100);

  const scale = 255;
  const tick = (x) => `
    <span class="chbar__tick" style="inset-inline-start:${(x.c / scale) * 100}%;background:color-mix(in srgb, var(--ink-3) 40%, transparent)">
      <i style="background:${x.v}"></i>
    </span>`;
  const legend = (arr) => `<div class="chlegend">${arr.slice().sort((a, b) => b.c - a.c).map((x) =>
    `<span><i style="background:${x.v}"></i><b>${esc(x.id)}</b><em>${x.c}</em></span>`).join('')}</div>`;
  const axis = '<div class="chaxis"><span>0</span><span>64</span><span>128</span><span>192</span><span>255</span></div>';

  $('#chroma').innerHTML = `
    <div class="chroma">
      <div>
        <span class="cap">כרומה של אסימוני זהות מודול — כולם מתחת ל־${maxMod}</span>
        <div class="chbar">
          <span class="chbar__zone" style="inset-inline-start:0;inline-size:${(maxMod / scale) * 100}%;background:var(--ink-3)"></span>
          ${modC.map((x) => tick(x)).join('')}
        </div>
        ${axis}${legend(modC)}
      </div>
      <div>
        <span class="cap">כרומה של פלטת הסטטוס — הרוויים מתחילים ב־${minSat}</span>
        <div class="chbar">
          <span class="chbar__zone" style="inset-inline-start:${(minSat / scale) * 100}%;inline-size:${100 - (minSat / scale) * 100}%;background:var(--brand)"></span>
          ${stC.map((x) => tick(x)).join('')}
        </div>
        ${axis}${legend(stC)}
      </div>
      <div class="chgap">
        <div class="fact"><b class="num">${maxMod}</b><span>כרומת המודול הגבוהה ביותר — <span class="sap">--mod-pppi</span></span></div>
        <div class="fact"><b class="num">${minSat}</b><span>כרומת הסטטוס הרווי הנמוכה ביותר — <span class="sap">--status-tested</span></span></div>
        <div class="fact"><b class="num">${minSat - maxMod}</b><span>רצועת ההפרדה. אין אף ערך בתוכה, בשתי המערכות.</span></div>
        <div class="fact"><b class="num">${Math.round((minSat / maxMod) * 100) / 100}×</b><span>יחס הרוויה בין האיתות החלש ביותר לזהות החזקה ביותר</span></div>
      </div>
      <p class="note">
        היוצא מן הכלל היחיד הוא <span class="sap">--status-not-started</span> בכרומה ${grey[0] ? grey[0].c : 0} — הוא אפור במכוון,
        מפני ש«טרם החל» הוא היעדר איתות ולא איתות. הוא לא מתחרה בזהות המודול מפני שהוא נטול גוון,
        ובכל מקרה מלווה תמיד בתווית מילולית. שאר ארבעת הסטטוסים רוויים מ־${minSat} ומעלה.
      </p>
    </div>`;
}

/* ---- 1.7 ramps ---- */
function renderRamps() {
  const rad = ['--r-xs', '--r-sm', '--r-md', '--r-lg', '--r-xl', '--r-2xl', '--r-pill'];
  const sp = ['--sp-1', '--sp-2', '--sp-3', '--sp-4', '--sp-5', '--sp-6', '--sp-8', '--sp-10', '--sp-12', '--sp-16'];
  const elev = ['--elev-1', '--elev-2', '--elev-3', '--elev-4'];
  const type = [
    ['--t-display', 'תצוגה · Home ו־L3 בלבד', 800],
    ['--t-h1', 'כותרת מסך', 800],
    ['--t-h2', 'כותרת בלוק', 800],
    ['--t-body', 'גוף טקסט', 400],
    ['--t-sm', 'משני', 400],
    ['--t-xs', 'מטא', 400],
    ['--t-micro', 'תווית · eyebrow', 700],
  ];
  const cs = getComputedStyle(html);
  const val = (k) => cs.getPropertyValue(k).trim();

  $('#ramps').innerHTML = `<div class="ramps">
    <div class="card">
      <span class="cap">רדיוס · <span class="sap">--r-xs … --r-pill</span></span>
      <div class="radrow">${rad.map((k) => `<div class="radchip" style="border-radius:${val(k)}">${k.replace('--r-', '')}</div>`).join('')}</div>
      <p class="block__d" style="margin-block:var(--sp-3) 0">כרטיס = <span class="sap">--r-lg</span>. שדה וכפתור = <span class="sap">--r-md</span>. תג = <span class="sap">--r-pill</span>. אין ערך אחר.</p>
    </div>
    <div class="card">
      <span class="cap">מרווח · בסיס 4px</span>
      <div class="sprow">${sp.map((k) => `<span class="spwrap"><i class="spchip" style="inline-size:${val(k)}"></i><span>${k.replace('--sp-', '')}</span></span>`).join('')}</div>
      <p class="block__d" style="margin-block:var(--sp-3) 0">צפיפות עבודה = 2/3. צפיפות קריאה = 4/5. חוצץ סקשן = 10/12/16.</p>
    </div>
    <div class="card">
      <span class="cap">הרמה · <span class="sap">--elev-1 … --elev-4</span></span>
      <div class="elevrow">${elev.map((k) => `<div class="elevchip" style="box-shadow:${val(k)}">${k.replace('--elev-', 'e')}</div>`).join('')}</div>
      <p class="block__d" style="margin-block:var(--sp-3) 0">‏e1 שורה · e2 תפריט · e3 הצצה · e4 משטח פקודה. מעל e4 אין דבר.</p>
    </div>
    <div class="card">
      <span class="cap">טיפוגרפיה · מחסנית מערכת בלבד</span>
      <div class="typerow">
        ${type.map(([k, use, w]) => `<div><b style="font-size:${val(k)};font-weight:${w};letter-spacing:${k === '--t-display' ? 'var(--t-display-tr)' : k === '--t-h1' ? 'var(--t-h1-tr)' : 'normal'}">${esc(use)}</b><span>${k} · ${val(k)}</span></div>`).join('')}
      </div>
      <p class="block__d" style="margin-block:var(--sp-3) 0">עברית מקבלת <span class="sap">--lh-he</span> = ${val('--lh-he')} — גובה שורה גבוה מלטינית באותו גודל.</p>
    </div>
  </div>`;
}

function renderTokenSection() {
  renderPlanes();
  renderInks();
  renderBrand();
  renderStatus();
  renderMods();
  renderChroma();
  renderRamps();
}
setTheme(html.dataset.theme || 'light');

/* ═════════════════════════════════════════ 5 · §2 · motion storyboard */

const TIER_MAP = [
  ['בית · סיפור גלילה בן שבעה סקשנים', 'L3', 'גילוי תלוי־גלילה, טיפוגרפיה עריכותית. זה המסך היחיד עם רישום 64px+.'],
  ['יקום SAP · מפת המודולים', 'L3', 'מיקוד צומת, הדגשת קשתות, כניסה למודול.'],
  ['כניסה למודול · המעבר עצמו', 'L3', 'מעבר אלמנט משותף מהכרטיס לכותרת סביבת העבודה.'],
  ['‏ERD · קנבס, מיקוד, מפת־על', 'L3', 'מיקוד ישות ועמעום השאר. זום דורש Ctrl/⌘ — גלגלת חשופה תמיד גוללת עמוד.'],
  ['משטח ECC → S/4HANA', 'L3', 'חשיפת הערות S/4 והשפעתן.'],
  ['ניווט · סרגל, הצצה, קבוצות, סמן פעיל', 'L2', 'הכרעה: כיוון C סימן את זה L3. ניווט מסביר מרחב, לא נרטיב.'],
  ['משטח פקודה · פתיחה וסגירה', 'L2', 'שכבת־על מודאלית — היא צריכה להסביר מאיפה הגיעה.'],
  ['משטח פקודה · תנועה בין תוצאות', 'L1', 'הכרעה: ברגע שהמשטח פתוח, המשתמש עובד. הבחירה נעה ב־140ms ולא יותר.'],
  ['גיליון תחתון · ניווט מובייל', 'L2', 'הגיליון חייב להיראות כמגיע מהקצה שממנו נגעו.'],
  ['כותרת סביבת עבודה', 'L2', 'רק בכניסה. אחרי שהמשתמש בפנים היא סטטית.'],
  ['סביבות עבודה PM / PP-PI', 'L1', 'מצב עבודה. אין גילוי תלוי־גלילה, אין קנה־מידה, אין הנפשת כניסה.'],
  ['טבלת נתונים · מיון, סינון, בחירה', 'L1', 'מיקוד ובחירה בלבד. שורות לא מונפשות בכניסה.'],
  ['דף אובייקט · EQUI, טבלה, BAPI', 'L1', 'הכרעה: כיוון A סימן אותו L2, כיוון C סימן L1. זה מקום עבודה — L1.'],
  ['תצוגה מקדימה בריחוף', 'L1', 'מופיע ונעלם ב־120ms. תנועה ארוכה יותר מרגישה כמו עיכוב.'],
  ['הספרייה הדיגיטלית והקורא', '—', 'קפוא. אין שינוי תנועה, אין שינוי DOM, אין שינוי CSS מעבר לאסימונים.'],
];

$('#tierMap').innerHTML = `<div class="scroller"><table class="ctable">
  <thead><tr><th>משטח</th><th>דרג</th><th>הערה מחייבת</th></tr></thead>
  <tbody>${TIER_MAP.map(([s, t, note]) => `<tr>
    <td><b>${esc(s)}</b></td>
    <td><span class="tpill" data-t="${esc(t)}">${esc(t)}</span></td>
    <td>${esc(note)}</td>
  </tr>`).join('')}</tbody>
</table></div>`;

/* ---- demo helpers ---- */
const isReduced = () => html.dataset.motion === 'reduced';
function playOnce(stage, hold = 1900) {
  clearTimeout(stage._t);
  stage.dataset.play = '0';
  void stage.offsetWidth;
  stage.dataset.play = '1';
  if (hold) stage._t = setTimeout(() => { stage.dataset.play = '0'; }, isReduced() ? 900 : hold);
}
const mrow = (ico, label, meta = '', attrs = '') =>
  `<div class="mrow" ${attrs}>${icon(ico, 12)}<span class="g">${esc(label)}</span>${meta ? `<span class="n">${esc(meta)}</span>` : ''}</div>`;

const NAV_ICO = ['wrench', 'workflow', 'gitBranch', 'table', 'terminal', 'sigma', 'cable', 'appWindow', 'puzzle', 'boxes'];
const G_MOD = NEO.navGroups[0];
const G_REF = NEO.navGroups[1];
const EQUI = NEO.pmTables.find((t) => t.name === 'EQUI') || NEO.pmTables[0];
const TOP_TABLES = DISCOVERY.tables.slice(0, 4);

const MOTIONS = [
  /* 01 ───────────────────────────────────────────── nav open / close */
  {
    n: '01', tier: 'L2', title: 'פתיחה וסגירה של הניווט',
    stage: () => `<div class="d01">
      <div class="d01__rail">${['panelLeft', 'wrench', 'workflow', 'bookOpen'].map((i) => `<span class="d01__rb">${icon(i, 13)}</span>`).join('')}</div>
      <div class="d01__body">${Array.from({ length: 7 }, (_, i) => `<span class="d01__ln" style="inline-size:${[92, 70, 84, 55, 78, 64, 88][i]}%"></span>`).join('')}</div>
      <div class="d01__scrim"></div>
      <div class="d01__panel mini">
        <div class="mtitle">${esc(G_MOD.he)}</div>
        ${G_MOD.items.map((t, i) => mrow(NAV_ICO[i], t)).join('')}
        <div class="mtitle">${esc(NEO.navGroups[2].he)}</div>
        ${NEO.navGroups[2].items.map((t) => mrow('bookOpen', t)).join('')}
      </div>
    </div>`,
    run: (s) => playOnce(s, 2100),
    read: 'סגור ← פתוח ← סגור',
    spec: {
      purpose: 'להסביר שהפאנל הוא הרחבה של הסרגל ולא חלון חדש שנחת מלמעלה.',
      trigger: 'לחיצה על מתג הניווט, או <span class="kbd">⌘</span><span class="kbd">\\</span>.',
      from: 'פאנל ב־<span class="sap">translateX(calc(-112% * var(--cd-flip)))</span>, <span class="sap">opacity 0</span>. עמעום ב־0.',
      to: 'פאנל ב־<span class="sap">none</span>, <span class="sap">opacity 1</span>. פריטים נכנסים במדרג של 30ms.',
      dur: '<span class="sap">--dur-panel</span> 280ms לפאנל · 120ms לאטימות · 140ms לכל פריט',
      ease: '<span class="sap">--ease-spring</span> — הקפיצה הקלה היא החתימה של המוצר',
      cost: ['low', 'שתי שכבות מונפשות. <span class="sap">will-change: transform</span> מוחל בתחילת המעבר ומוסר ב־<span class="sap">transitionend</span>. אין layout, אין paint מחדש של התוכן.'],
      rm: 'הפאנל מופיע במצב הסופי מיידית. אין החלקה, אין מדרג. העמעום מופיע בלי מעבר. מצב הפתיחה נשאר קריא ב־<span class="sap">aria-expanded</span>.',
    },
  },

  /* 02 ─────────────────────────────────────────────────── nav peek */
  {
    n: '02', tier: 'L2', title: 'הצצה מהסרגל המצומצם',
    stage: () => `<div class="d02">
      <div class="d01__rail">${['panelLeft', 'wrench', 'workflow', 'table'].map((i) => `<span class="d01__rb">${icon(i, 13)}</span>`).join('')}</div>
      <div class="d01__body">${Array.from({ length: 7 }, (_, i) => `<span class="d01__ln" style="inline-size:${[88, 62, 80, 50, 74, 60, 84][i]}%"></span>`).join('')}</div>
      <div class="d02__cursor"></div>
      <div class="d02__peek mini">
        <div class="mtitle">${esc(G_REF.he)}</div>
        ${G_REF.items.slice(0, 5).map((t, i) => mrow(NAV_ICO[i + 3] || 'table', t)).join('')}
      </div>
    </div>`,
    run: (s) => playOnce(s, 2000),
    read: 'ריחוף על הסרגל — התוכן לא זז',
    spec: {
      purpose: 'לתת גישה מלאה לניווט בלי לוותר על שטח העבודה ובלי לדחוף את התוכן.',
      trigger: 'ריחוף או מיקוד מקלדת על פריט בסרגל המצומצם. השהיית כניסה 120ms, השהיית יציאה 240ms.',
      from: '<span class="sap">translateX(calc(-104% * var(--cd-flip))) scale(.98)</span>, <span class="sap">opacity 0</span>.',
      to: 'מיקום מנוחה, <span class="sap">opacity 1</span>. התוכן מאחורי ההצצה לא זז ולו פיקסל.',
      dur: '180ms כניסה · 120ms יציאה — יציאה תמיד מהירה מכניסה',
      ease: '<span class="sap">--ease-out-expo</span>',
      cost: ['low', 'שכבה אחת מעל התוכן. ההצצה מרונדרת פעם אחת ומוסתרת ב־<span class="sap">opacity</span>, בלי בנייה מחדש של ה־DOM בכל ריחוף.'],
      rm: 'ההצצה מופיעה מיידית במיקומה הסופי. השהיית הכניסה נשמרת — היא מונעת הבהוב, לא אנימציה.',
    },
  },

  /* 03 ──────────────────────────────── group expansion, no scroll reset */
  {
    n: '03', tier: 'L1', title: 'פתיחת קבוצה — בלי איפוס גלילה',
    stage: () => `<div class="d03 mini">
      <div class="d03__scroll" data-scroll>
        <div class="mtitle">${esc(G_MOD.he)}</div>
        ${G_MOD.items.map((t, i) => mrow(NAV_ICO[i], t)).join('')}
        <button class="d03__btn" type="button" aria-expanded="true" data-grp>
          ${icon('chevronDown', 12, 'chev')}<span class="g">${esc(G_REF.he)}</span><span class="n">${G_REF.items.length}</span>
        </button>
        <div class="d03__items">${G_REF.items.map((t, i) => mrow(NAV_ICO[i + 3] || 'table', t)).join('')}</div>
        <div class="mtitle">${esc(NEO.navGroups[3].he)}</div>
        ${NEO.navGroups[3].items.map((t) => mrow('graduationCap', t)).join('')}
      </div>
    </div>`,
    run: (s) => {
      const btn = $('[data-grp]', s), sc = $('[data-scroll]', s), out = $('[data-read]', s.closest('.mo'));
      const keep = sc.scrollTop;
      btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      sc.scrollTop = keep;
      if (out) out.textContent = `scrollTop ${Math.round(keep)}px ← ${Math.round(sc.scrollTop)}px`;
    },
    read: 'גלול, ואז הרץ — scrollTop לא זז',
    spec: {
      purpose: 'לפתוח ולסגור קבוצה בלי לזרוק את המשתמש למקום אחר ברשימה.',
      trigger: 'לחיצה או <span class="kbd">Enter</span> על כותרת הקבוצה. המצב נשמר ב־<span class="sap">aria-expanded</span>.',
      from: 'הפריטים ב־<span class="sap">opacity 0</span> ו־<span class="sap">translateY(-5px)</span>. הגובה כבר סופי.',
      to: 'הפריטים במצב מנוחה, במדרג של 24ms. <span class="sap">scrollTop</span> נקרא לפני ונכתב אחרי.',
      dur: '130ms אטימות · 160ms תנועה · מדרג 24ms עד לכל היותר 7 פריטים',
      ease: '<span class="sap">--ease-out-expo</span>',
      cost: ['low', 'הכרעה מפורשת: <b>לא</b> מנפישים <span class="sap">grid-template-rows: 0fr → 1fr</span>. זו הנפשת פריסה שמפילה layout על כל ההורים בכל פריים. הגובה נסגר מיידית והפריטים נכנסים ב־transform בלבד.'],
      rm: 'הפריטים מופיעים מיידית. שמירת מיקום הגלילה נשארת פעילה — היא לוגיקה, לא אנימציה, וזה בדיוק הערך של התנועה הזאת.',
    },
  },

  /* 04 ──────────────────────────────────── travelling active indicator */
  {
    n: '04', tier: 'L2', title: 'סמן הפריט הפעיל — נוסע ולא קופץ',
    stage: () => {
      const items = [...G_MOD.items, ...G_REF.items.slice(0, 3)];
      return `<div class="d04 mini">
        <span class="d04__marker" style="--i:0"></span>
        <div class="d04__list">${items.map((t, i) =>
          mrow(NAV_ICO[i], t, '', `aria-current="${i === 0 ? 'true' : 'false'}" data-ind="${i}"`)).join('')}</div>
      </div>`;
    },
    run: (s) => {
      const rows = $$('[data-ind]', s);
      const mk = $('.d04__marker', s);
      const cur = rows.findIndex((r) => r.getAttribute('aria-current') === 'true');
      const next = (cur + 1) % rows.length;
      rows.forEach((r, i) => r.setAttribute('aria-current', String(i === next)));
      mk.style.setProperty('--i', String(next));
      const out = $('[data-read]', s.closest('.mo'));
      if (out) out.textContent = `aria-current ← ${next + 1} / ${rows.length}`;
    },
    read: 'לחץ שוב ושוב — הסמן נוסע',
    spec: {
      purpose: 'להראות שהמיקום השתנה בתוך אותה רשימה, ולא שהרשימה התחלפה.',
      trigger: 'שינוי מסלול, או ניווט מקלדת בין פריטי הניווט.',
      from: '<span class="sap">translateY(i × גובה שורה)</span> של הפריט הקודם.',
      to: '<span class="sap">translateY</span> של הפריט החדש. יסוד DOM אחד בלבד נע — לא סמן לכל שורה.',
      dur: '<span class="sap">--dur-base</span> 220ms',
      ease: '<span class="sap">--ease-emphasis</span> — יציאה חדה, כניסה רכה',
      cost: ['low', 'אלמנט אחד, תכונה אחת. עולה פחות מהוספת <span class="sap">border</span> לשורה הפעילה, שהייתה גורמת ל־reflow.'],
      rm: 'הסמן מופיע מיידית במיקום החדש. המידע נישא ממילא ב־<span class="sap">aria-current="page"</span> וברקע <span class="sap">--sel-bg</span> של השורה, ולכן אף מידע לא אובד.',
    },
  },

  /* 05 ────────────────────────────────── module entry, shared element */
  {
    n: '05', tier: 'L3', title: 'כניסה למודול — אלמנט משותף (FLIP)',
    stage: () => {
      const cards = [PM, PPPI].map((m, i) => `
        <div class="d05__card" ${i === 0 ? 'data-src' : ''}>
          <b>${esc(m.code)}</b><span>${esc(m.he)}</span>
          <span style="display:block;font-size:9px;color:var(--ink-3)" class="num">${m.tables} טבלאות</span>
        </div>`).join('');
      const mm = UNIVERSE.nodes.find((x) => x.id === 'MM');
      return `<div class="d05 mini">
        <div class="d05__grid">
          ${cards}
          <div class="d05__card"><b>${esc(mm.id)}</b><span>${esc(mm.he)}</span>
          <span style="display:block;font-size:9px;color:var(--ink-3)">ספרייה בלבד</span></div>
        </div>
        <div class="d05__ws">
          <div class="d05__hd"><h5>${esc(PM.code)} · ${esc(PM.he)}</h5>
          <p class="num">${PM.topics} נושאים · ${PM.tables} טבלאות · ${PM.fields} שדות</p></div>
          <div style="margin-block-start:8px;display:grid;gap:4px">
            ${NEO.pmTopics.slice(0, 3).map((t) => mrow('layers', t.title, `${t.tables}`)).join('')}
          </div>
        </div>
      </div>`;
    },
    run: (s) => {
      const inner = $('.d05', s);
      const card = $('[data-src]', s);
      const hd = $('.d05__hd', s);
      const out = $('[data-read]', s.closest('.mo'));
      clearTimeout(s._t);
      $$('.d05__ghost', s).forEach((g) => g.remove());
      if (inner.classList.contains('is-ws')) { inner.classList.remove('is-ws'); if (out) out.textContent = 'חזרה לרשת'; return; }

      const sBox = s.getBoundingClientRect();
      const a = card.getBoundingClientRect();
      const b = hd.getBoundingClientRect();
      inner.classList.add('is-ws');
      if (isReduced()) { if (out) out.textContent = 'תנועה מופחתת — חיתוך ישיר'; return; }

      const ghost = document.createElement('div');
      ghost.className = 'd05__ghost';
      ghost.innerHTML = card.innerHTML;
      ghost.style.cssText = `left:${a.left - sBox.left}px;top:${a.top - sBox.top}px;width:${a.width}px;height:${a.height}px`;
      s.appendChild(ghost);
      const dx = b.left - a.left, dy = b.top - a.top;
      const sx = b.width / a.width, sy = Math.max(0.35, b.height / a.height);
      requestAnimationFrame(() => {
        ghost.style.transition = 'transform 420ms var(--ease-out-expo), opacity 200ms 180ms linear';
        ghost.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
        ghost.style.opacity = '0';
      });
      const kill = () => ghost.remove();
      ghost.addEventListener('transitionend', kill, { once: true });
      s._t = setTimeout(kill, 700);          /* safety net for reduced motion */
      if (out) out.textContent = `FLIP · Δ${Math.round(dx)},${Math.round(dy)}px · scale ${sx.toFixed(2)}`;
    },
    read: 'לחץ — כרטיס הופך לכותרת',
    spec: {
      purpose: 'לענות על השאלה «מאיפה הגעתי לכאן» בלי פירור לחם, ולקשור בין הכרטיס לסביבת העבודה.',
      trigger: 'הפעלת כרטיס מודול ביקום או בבית.',
      from: 'מלבן הכרטיס, נמדד ב־<span class="sap">getBoundingClientRect</span> לפני שינוי ה־DOM.',
      to: 'מלבן כותרת סביבת העבודה. אלמנט־רפאים נוסע בין השניים ומתאייד ב־opacity.',
      dur: '<span class="sap">--dur-route</span> 420ms לתנועה · 200ms להתאיידות עם השהיה של 180ms',
      ease: '<span class="sap">--ease-out-expo</span>',
      cost: ['mid', 'שתי מדידות <span class="sap">getBoundingClientRect</span> בפריים אחד ואז transform בלבד. היחידה שנוגעת ב־layout — ולכן היחידה שמוגבלת ל־L3 ולמעבר יחיד בכל פעם.'],
      rm: 'אין אלמנט־רפאים כלל: חיתוך ישיר לסביבת העבודה. הקשר מוסבר בפירור הלחם ובכותרת. <b>נתיב הבטיחות של <span class="sap">setTimeout</span> חובה כאן</b> — בלעדיו הרפאים נתקע כשהמעבר מקוצר ל־0.01ms.',
    },
  },

  /* 06 ──────────────────────────────────────────── command open */
  {
    n: '06', tier: 'L2', title: 'פתיחת משטח הפקודה',
    stage: () => `<div class="d06 mini" style="position:absolute;inset:0">
      <div style="padding:10px;display:grid;gap:6px;align-content:start">
        ${Array.from({ length: 6 }, (_, i) => `<span class="d01__ln" style="inline-size:${[90, 66, 82, 52, 76, 62][i]}%"></span>`).join('')}
      </div>
      <div class="d06__scrim"></div>
      <div class="d06__panel">
        <div class="d06__inp">${icon('search', 12)}<span>EQUI</span><span class="d06__caret"></span></div>
        <div style="padding-block-start:4px">
          ${mrow('table', EQUI.name + ' — ' + EQUI.he, 'טבלה')}
          ${mrow('terminal', 'IE01 / IE02 / IE03', 'טרנזקציה')}
          ${mrow('wrench', PM.he + ' · ' + PM.code, 'מודול')}
        </div>
      </div>
    </div>`,
    run: (s) => playOnce(s, 2200),
    read: 'סגור ← פתוח ← סגור',
    spec: {
      purpose: 'לפתוח משטח ריבוני שמכסה את המסך בלי לגרום לתחושה שהעמוד התחלף.',
      trigger: '<span class="kbd">⌘</span><span class="kbd">K</span> · <span class="kbd">Ctrl</span><span class="kbd">K</span> · לחיצה על שדה החיפוש בראש המסך.',
      from: 'פאנל ב־<span class="sap">translateY(-10px) scale(.985)</span>, <span class="sap">opacity 0</span>. עמעום ב־0.',
      to: 'מיקום מנוחה, <span class="sap">opacity 1</span>. המיקוד עובר לשדה הקלט באותו פריים.',
      dur: '<span class="sap">--dur-base</span> 220ms לפאנל · 140ms לעמעום. סגירה 140ms.',
      ease: '<span class="sap">--ease-out-expo</span> — בלי קפיצה, כדי שהקלדה מיידית לא תרגיש רועדת',
      cost: ['low', 'שתי שכבות. קנה־המידה מתחיל ב־0.985 ולא נמוך יותר, כדי שהטקסט לא ייראה מטושטש בפריים הראשון.'],
      rm: 'הפאנל מופיע מיידית פתוח. המיקוד עובר לשדה הקלט בדיוק כמו במצב מלא — הפתיחה היא לוגיקה, לא אנימציה.',
    },
  },

  /* 07 ────────────────────────────────────── command result selection */
  {
    n: '07', tier: 'L1', title: 'בחירה בין תוצאות',
    stage: () => {
      const rows = [
        ['table', `${EQUI.name} — ${EQUI.he}`, 'טבלה'],
        ['table', `${TOP_TABLES[0].name} — ${TOP_TABLES[0].he}`, 'טבלה'],
        ['terminal', TOP_TABLES[0].tcodes.slice(0, 3).join(' / '), 'טרנזקציה'],
        ['sigma', NEO.funcs[0]?.name || 'BAPI', 'BAPI'],
        ['bookOpen', NEO.books[0].title, 'ספר'],
      ];
      return `<div class="d07 mini">
        <div class="d07__list">
          <span class="d07__sel" style="--i:0"></span>
          ${rows.map(([i, t, m], k) => mrow(i, t, m, `aria-selected="${k === 0}" data-sel="${k}"`)).join('')}
        </div>
      </div>`;
    },
    run: (s) => {
      const rows = $$('[data-sel]', s);
      const sel = $('.d07__sel', s);
      const cur = rows.findIndex((r) => r.getAttribute('aria-selected') === 'true');
      const next = (cur + 1) % rows.length;
      rows.forEach((r, i) => r.setAttribute('aria-selected', String(i === next)));
      sel.style.setProperty('--i', String(next));
      const out = $('[data-read]', s.closest('.mo'));
      if (out) out.textContent = `aria-activedescendant ← result-${next + 1}`;
    },
    read: 'חץ למטה — הבחירה נעה',
    spec: {
      purpose: 'להראות בחירה בקצב שמאפשר להחזיק חץ למטה לחוץ בלי שהממשק יפגר.',
      trigger: '<span class="kbd">↑</span><span class="kbd">↓</span>, ריחוף עכבר, או הקלדה שמסננת מחדש.',
      from: 'פס הבחירה במיקום השורה הקודמת.',
      to: '<span class="sap">translateY(i × 28px)</span>. <span class="sap">aria-activedescendant</span> מתעדכן באותו רגע.',
      dur: '140ms — קצר במכוון. מעל 180ms הבחירה מרגישה איטית בהחזקת מקש.',
      ease: '<span class="sap">--ease-emphasis</span>',
      cost: ['low', 'אלמנט אחד נע. השורות עצמן אינן מונפשות ואינן משנות רקע — אחרת כל צעד היה מצייר מחדש את הרשימה.'],
      rm: 'הפס קופץ מיידית. הבחירה קריאה גם בלי תנועה דרך <span class="sap">aria-selected</span>, רקע <span class="sap">--sel-bg</span> ופס <span class="sap">--sel-bar</span>.',
    },
  },

  /* 08 ─────────────────────────────── surface responds to the query */
  {
    n: '08', tier: 'L3', title: 'המשטח מגיב לשאילתה',
    stage: () => {
      const secs = [
        ['יקום SAP', `${UNI_NODES} מודולים במפה`, '0'],
        ['מודל הנתונים', `${n(ENTITY_COUNT)} ישויות · ${n(REL_COUNT)} קשרים`, '1'],
        ['הספרייה הדיגיטלית', `${NEO.books.length} ספרים`, '0'],
      ];
      return `<div class="d08 mini">
        <div class="d08__q">${icon('search', 12)}<span>EQUI</span><span class="d06__caret"></span></div>
        ${secs.map(([t, s2, hit]) => `<div class="d08__sec" data-hit="${hit}"><b>${esc(t)}</b><span>${esc(s2)}</span></div>`).join('')}
      </div>`;
    },
    run: (s) => playOnce(s, 2400),
    read: 'הקלדה מאירה את הסקשן הרלוונטי',
    spec: {
      purpose: 'לחבר בין מה שמוקלד לבין מה שקיים על המסך, במקום להחליף את המסך בתוצאות.',
      trigger: 'הקלדה במשטח הפקודה, בהשהיה של 120ms אחרי הקשה אחרונה.',
      from: 'כל הסקשנים ב־<span class="sap">opacity 1</span>.',
      to: 'סקשנים שאינם מתאימים ב־<span class="sap">opacity .34</span>; המתאים ב־<span class="sap">scale(1.015)</span> עם פס מותג פנימי.',
      dur: '200ms אטימות · 260ms קנה־מידה',
      ease: '<span class="sap">--ease-out-expo</span>',
      cost: ['low', 'רק <span class="sap">opacity</span> על מספר קטן של מכולות. אין סינון DOM — התוכן נשאר במקומו, מה שמונע reflow בכל הקשה.'],
      rm: 'אין עמעום ואין קנה־מידה. ההתאמה מסומנת בפס המותג ובספירת תוצאות טקסטואלית («3 התאמות בסקשן הזה»), כך שהמידע עובר במילים.',
    },
  },

  /* 09 ─────────────────────────────────────────── discovery hop */
  {
    n: '09', tier: 'L2', title: 'קפיצת גילוי — מטבלה לטרנזקציה',
    stage: () => {
      const t0 = TOP_TABLES[0];
      return `<div class="d09 mini">
        <div class="d09__col">
          <div class="mtitle">טבלאות</div>
          ${TOP_TABLES.slice(0, 3).map((t) => mrow('table', t.name, String(t.fields))).join('')}
        </div>
        <div class="d09__col">
          <div class="mtitle">טרנזקציות</div>
          ${t0.tcodes.slice(0, 3).map((c) => mrow('terminal', c)).join('')}
        </div>
        <span class="d09__chip">${esc(t0.name)}</span>
      </div>`;
    },
    run: (s) => playOnce(s, 2200),
    read: 'האובייקט נוסע לרשימה החדשה',
    spec: {
      purpose: 'לשמור על זהות האובייקט כשהמשתמש עובר בין שתי עדשות על אותו נתון.',
      trigger: 'הפעלת קשר גילוי — טבלה ← טרנזקציה, טרנזקציה ← אפליקציית Fiori, ישות ← ישות אב.',
      from: 'מיקום השבב ברשימת המקור.',
      to: '<span class="sap">translate(calc(-146px * var(--cd-flip)), 56px)</span> — מיקומו ברשימת היעד. ה־flip הוא מה שהופך את זה לנכון ב־RTL.',
      dur: '320ms',
      ease: '<span class="sap">--ease-emphasis</span>',
      cost: ['low', 'אלמנט אחד נע מעל שתי רשימות סטטיות. הרשימות לא מונפשות ולא נבנות מחדש.'],
      rm: 'השבב מופיע מיידית ביעד עם הבזק רקע חד־פעמי (<span class="sap">--sel-bg</span>) שנשאר 1.2 שניות. הקשר גם נאמר במילים בשורת הסטטוס.',
    },
  },

  /* 10 ──────────────────────────────────────────────── ERD focus */
  {
    n: '10', tier: 'L3', title: 'מיקוד ישות ב־ERD',
    stage: () => {
      const ents = NEO.entities.slice(0, 6);
      const pos = [[46, 40], [150, 30], [250, 52], [70, 118], [172, 124], [268, 116]];
      const edges = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4]];
      const focus = 1;
      const nodes = ents.map((e, i) => `
        <g class="nd" data-f="${i === focus || edges.some(([a, b]) => (a === focus && b === i) || (b === focus && a === i)) ? 1 : 0}">
          <rect x="${pos[i][0] - 30}" y="${pos[i][1] - 13}" width="60" height="26" rx="5"
            fill="var(--surface)" stroke="var(--hairline)"></rect>
          <text x="${pos[i][0]}" y="${pos[i][1] + 3}" text-anchor="middle"
            font-family="var(--font-mono)" font-size="9" fill="var(--ink-2)">${esc(e.name)}</text>
        </g>`).join('');
      const lines = edges.map(([a, b]) => `
        <line class="eg" data-f="${a === focus || b === focus ? 1 : 0}"
          x1="${pos[a][0]}" y1="${pos[a][1]}" x2="${pos[b][0]}" y2="${pos[b][1]}"
          stroke="var(--ink-3)" stroke-width="1"></line>`).join('');
      return `<div class="d10"><svg viewBox="0 0 320 160" role="img"
        aria-label="דוגמת מיקוד ב־ERD — ${esc(ents[focus].name)} והישויות הקשורות אליה">
        ${lines}${nodes}</svg></div>`;
    },
    run: (s) => playOnce(s, 2600),
    read: 'ישות ממוקדת · שכנותיה נשארות',
    spec: {
      purpose: 'לצמצם 62 ישויות ו־146 קשרים לשכונה שאפשר לקרוא, בלי לאבד את התמונה הכללית.',
      trigger: 'לחיצה או מיקוד מקלדת על ישות בקנבס.',
      from: 'כל הישויות והקשתות ב־<span class="sap">opacity 1</span>.',
      to: 'לא־שכנות ב־<span class="sap">opacity .22</span>, קשתות לא רלוונטיות ב־<span class="sap">.12</span>, הממוקדת ב־<span class="sap">scale(1.09)</span>.',
      dur: '200ms אטימות · 260ms קנה־מידה',
      ease: '<span class="sap">--ease-out-expo</span>',
      cost: ['low', '‏SVG ולא WebGL. <span class="sap">transform-box: fill-box</span> כדי שקנה־המידה יסתובב סביב מרכז הישות. מיקוד לא מצייר מחדש את הקנבס — רק משנה תכונות של קבוצות קיימות.'],
      rm: 'העמעום נשמר (הוא מידע, לא תנועה) אך ללא מעבר, וללא שינוי קנה־מידה. הישות הממוקדת מסומנת בנוסף במסגרת מוצקה, ופאנל המפקח מציג את שמה במילים.',
    },
  },

  /* 11 ─────────────────────────────── mode transition experience→work */
  {
    n: '11', tier: 'L3', title: 'מעבר מצב — מחוויה לעבודה',
    stage: () => `<div class="d11 mini" style="position:absolute;inset:0">
      <div class="d11__ed">
        <span class="eyebrow">SAP UNIVERSE</span>
        <h5>${esc(PM.he)} · ${esc(PM.code)}</h5>
        <p class="num">${PM.topics} נושאים · ${PM.tables} טבלאות · ${PM.fields} שדות</p>
      </div>
      <div class="d11__wk">
        <div class="mtitle">${esc(PM.code)} · סביבת עבודה</div>
        ${NEO.pmTopics.slice(0, 5).map((t) => mrow('layers', t.title, String(t.tables))).join('')}
      </div>
    </div>`,
    run: (s) => playOnce(s, 2600),
    read: 'רישום עריכותי ← רישום מוצרי',
    spec: {
      purpose: 'לסמן שינוי רישום: הטיפוגרפיה יורדת, הצפיפות עולה, והתנועה נסוגה מ־L3 ל־L1.',
      trigger: 'כניסה לסביבת עבודה מכל משטח L3.',
      from: 'שכבה עריכותית ב־<span class="sap">opacity 1 / scale(1)</span>; שכבת עבודה ב־<span class="sap">opacity 0 / translateY(8px)</span>.',
      to: 'עריכותית ב־<span class="sap">opacity 0 / scale(.965)</span>; עבודה במצב מנוחה. אחרי המעבר, המשטח מקבל L1 בלבד.',
      dur: '200ms אטימות · 360ms קנה־מידה ותנועה',
      ease: '<span class="sap">--ease-out-expo</span>',
      cost: ['low', 'שתי שכבות בערימה. השכבה העריכותית מוסרת מה־DOM אחרי המעבר כדי לא לשלם עליה בתקציב הצמתים של סביבת העבודה.'],
      rm: 'חיתוך ישיר. שינוי הרישום נשאר גלוי — גודל הטיפוגרפיה והצפיפות משתנים ממילא, וזה המידע האמיתי.',
    },
  },

  /* 12 ──────────────────────────────────────────── mobile sheet */
  {
    n: '12', tier: 'L2', title: 'גיליון תחתון במובייל',
    stage: () => `<div class="d12 mini">
      <div class="d12__ph">
        <div class="d12__body">
          ${TOP_TABLES.slice(0, 4).map((t) => mrow('table', t.name, String(t.fields))).join('')}
        </div>
        <div class="d12__scrim"></div>
        <div class="d12__sheet">
          <div class="d12__grab"></div>
          <div style="font-size:10px;font-weight:800">${esc(TOP_TABLES[0].name)} — ${esc(TOP_TABLES[0].he)}</div>
          <div style="margin-block-start:5px;display:grid;gap:3px">
            ${TOP_TABLES[0].tcodes.slice(0, 3).map((c) => mrow('terminal', c)).join('')}
          </div>
        </div>
      </div>
    </div>`,
    run: (s) => playOnce(s, 2400),
    read: 'הגיליון עולה מהקצה שנגעו בו',
    spec: {
      purpose: 'להציג פרטי אובייקט במובייל בלי לעזוב את ההקשר שממנו הגיעו.',
      trigger: 'הקשה על שורה, או החלקה מעלה מהקצה התחתון.',
      from: '<span class="sap">translateY(100%)</span>, עמעום ב־0.',
      to: '<span class="sap">translateY(0)</span>, עמעום ב־1. גרירה מטה מחזירה בעקיבה ישירה לאצבע.',
      dur: '<span class="sap">--dur-panel</span> 280ms · סגירה 200ms · גרירה = 1:1 בלי השהיה',
      ease: '<span class="sap">--ease-out-expo</span>. אין קפיץ — קפיץ בגיליון נקרא כתקלת מגע.',
      cost: ['low', 'שכבה אחת ועמעום. הגיליון מרונדר רק כשהוא נפתח, ומוסר מה־DOM אחרי הסגירה.'],
      rm: 'הגיליון מופיע מיידית פתוח. מלכודת המגע לסגירה, מלכודת המיקוד ומקש <span class="kbd">Esc</span> זהים בשני המצבים.',
    },
  },
];

$('#motion').innerHTML = MOTIONS.map((m) => `
  <figure class="mo" data-mo="${m.n}">
    <figcaption class="mo__h">
      <span class="mo__n">${m.n}</span>
      <span class="mo__t">${esc(m.title)}</span>
      <span class="tpill" data-t="${m.tier}">${m.tier}</span>
    </figcaption>
    <div class="mo__body">
      <div class="mo__demo">
        <div class="dstage" data-play="0">${m.stage()}</div>
        <div class="mo__foot">
          <button class="replay" type="button" data-replay>${icon('history', 13)} הרץ שוב</button>
          <span class="mo__read" data-read>${esc(m.read)}</span>
        </div>
      </div>
      <dl class="mo__spec">
        <dt>מטרה</dt><dd>${m.spec.purpose}</dd>
        <dt>טריגר</dt><dd>${m.spec.trigger}</dd>
        <dt>מצב פתיחה</dt><dd>${m.spec.from}</dd>
        <dt>מצב סיום</dt><dd>${m.spec.to}</dd>
        <dt>משך</dt><dd>${m.spec.dur}</dd>
        <dt>האצה</dt><dd>${m.spec.ease}</dd>
        <dt>מחיר</dt><dd><span class="cost" data-c="${m.spec.cost[0]}">${m.spec.cost[0] === 'low' ? 'נמוך' : 'בינוני'}</span> — ${m.spec.cost[1]}</dd>
        <dt>תנועה מופחתת</dt><dd>${m.spec.rm}</dd>
      </dl>
    </div>
  </figure>`).join('');

/* Stateful demos (they toggle a real state) are not auto-played, so the sheet
   opens with every stage in its documented start state. */
const NO_AUTOPLAY = new Set(['03', '04', '05', '07']);
$$('.mo').forEach((fig) => {
  const m = MOTIONS.find((x) => x.n === fig.dataset.mo);
  const stage = $('.dstage', fig);
  $('[data-replay]', fig).addEventListener('click', () => m.run(stage));
  if (!NO_AUTOPLAY.has(m.n)) m.run(stage);
});

/* ═════════════════════════════════════ 6 · §3 · component architecture */

$('#tree').innerHTML = `<pre>${[
  ['0', '&lt;html lang="he" dir="rtl" data-theme&gt;', 'שורש. הערכה ודרג התנועה נקבעים כאן ותו לא.'],
  ['1', 'AppShell', 'רשת אחת: rail | main. אין grid מקונן ברמת המסך.'],
  ['2', '├─ NavShell', 'compact 4.5rem · expanded 17rem · peek = שכבת־על'],
  ['3', '│  ├─ NavGroup', 'aria-expanded · שומר scrollTop'],
  ['4', '│  │  └─ NavItem', 'aria-current="page"'],
  ['3', '│  ├─ NavActiveIndicator', 'יסוד אחד. נוסע ב־translateY.'],
  ['3', '│  └─ NavPeek', 'role="dialog" aria-modal="false"'],
  ['2', '├─ MainRegion', '<main id="main"> — יעד של דלג לתוכן'],
  ['3', '│  ├─ Breadcrumb', 'nav[aria-label] · מפריד מסובב ב־scaleX'],
  ['3', '│  ├─ WorkspaceHeader', 'יעד ה־FLIP. נושא --mod-*.'],
  ['3', '│  ├─ DiscoveryRail', 'קשרי אובייקט. aside[aria-label].'],
  ['3', '│  └─ &lt;Surface&gt;', 'אחד מאלה, לעולם לא שניים:'],
  ['4', '│     ├─ ModuleGrid → ModuleCard', 'L3 · כניסה'],
  ['4', '│     ├─ ObjectView', 'L1 · דף אובייקט'],
  ['4', '│     ├─ DataTable', 'L1 · חלון גלילה'],
  ['4', '│     ├─ ErdCanvas + ErdInspector + ErdMinimap', 'L3'],
  ['4', '│     └─ LibraryEntryGrid', 'קפוא — קריאה בלבד'],
  ['2', '├─ CommandSurface', 'portal · role="dialog" · combobox בפנים'],
  ['3', '│  ├─ CommandInput', 'role="combobox" aria-expanded aria-controls'],
  ['3', '│  ├─ CommandResultRow', 'role="option" aria-selected'],
  ['3', '│  └─ CommandAiLane', 'aria-live="polite" · תשובה מסומנת כמקור'],
  ['2', '├─ HoverPreview', 'portal · aria-hidden · מקלדת מקבלת פאנל, לא ריחוף'],
  ['2', '├─ BottomSheet', 'portal · מלכודת מיקוד · מובייל בלבד'],
  ['2', '└─ MobileNav', 'pointer:coarse בלבד — לעולם לא לפי רוחב'],
].map(([lvl, cmp, cmt]) =>
  `<span class="cmp">${cmp}</span>` +
  `<span class="cmt">${'&nbsp;'.repeat(Math.max(2, 54 - cmp.replace(/&[a-z]+;/g, 'x').length))}// <bdi>${esc(cmt)}</bdi></span>`
).join('\n')}</pre>`;

/* ---- 3.2 button system ---- */
const BTN_STATES = [['', 'מנוחה'], ['is-hover', 'ריחוף'], ['is-active', 'לחוץ'], ['is-focus', 'מיקוד'], ['is-dis', 'מנוטרל'], ['is-load', 'טוען']];
const BTN_KINDS = [
  ['pri', 'ראשי', 'פעולה אחת במסך. מילוי מותג.', 'הצג טבלה'],
  ['sec', 'משני', 'ברירת המחדל לכל פעולה אחרת.', 'ייצוא'],
  ['ghost', 'שקוף', 'פעולה שלישונית בתוך צפיפות.', 'בטל'],
  ['icon', 'אייקון', 'תמיד עם aria-label. 40px מינימום.', null],
  ['cmp', 'קומפקטי', 'בתוך שורת טבלה בלבד. 28px.', 'פתח'],
  ['float', 'צף', 'פעולה גלובלית במובייל. elev-3.', 'פעולה'],
  ['ctx', 'הקשרי', 'צף מעל בחירה. משתנה לפי המשטח.', 'הוסף לנושא'],
];
$('#buttons').innerHTML = `<div class="btnwrap">${BTN_KINDS.map(([k, name, note, label]) => `
  <div class="btnrow">
    <div class="btnrow__meta"><b>${esc(name)}</b><span>${esc(note)}</span></div>
    <div class="btnrow__set">${BTN_STATES.map(([st, sn]) => `
      <span class="stwrap">
        <span class="btn btn--${k} ${st}">${k === 'icon' ? icon('settings', 16) : (k === 'ctx' || k === 'float' ? icon('pin', 14) : '')}${label ? esc(label) : ''}</span>
        <span>${esc(sn)}</span>
      </span>`).join('')}</div>
  </div>`).join('')}</div>`;

/* ---- 3.3 live specimens from real SAP data ---- */
const T0 = DISCOVERY.tables[0];
const BOOK0 = NEO.books.find((b) => b.module === 'PM') || NEO.books[0];
const MIG0 = NEO.migration.find((m) => m.s4Impact !== 'compat') || NEO.migration[0];

$('#specimens').innerHTML = `<div class="spec-grid">

  <div class="spx"><div class="spx__h"><b>כרטיס מודול</b><span>L3 · <span class="sap">--mod-*</span></span></div>
    <div class="spx__box" style="display:grid;gap:var(--sp-2)">
      ${[['PM', PM], ['PP-PI', PPPI]].map(([id, m]) => `
        <div class="modcard" style="--m:var(--mod-${id === 'PM' ? 'pm' : 'pppi'})">
          <span class="modcard__bar"></span>
          <span style="flex:1">
            <span class="modcard__t">${esc(m.he)} · <span class="sap">${esc(m.code)}</span></span>
            <span class="modcard__s">${esc(m.en)}</span>
            <span class="modcard__n">
              <span><b class="num">${m.topics}</b> נושאים</span>
              <span><b class="num">${m.tables}</b> טבלאות</span>
              <span><b class="num">${m.fields}</b> שדות</span>
            </span>
          </span>
          ${icon('arrowUpRight', 14)}
        </div>`).join('')}
    </div></div>

  <div class="spx"><div class="spx__h"><b>שורת תוצאה במשטח הפקודה</b><span>L1 · <span class="sap">--sel-bg</span></span></div>
    <div class="spx__box">
      ${[[T0.name + ' — ' + T0.he, 'table', 'טבלה · ' + T0.fields + ' שדות', true],
         [T0.tcodes.slice(0, 3).join(' / '), 'terminal', 'טרנזקציה', false],
         [NEO.funcs[0].name, 'sigma', 'BAPI', false]].map(([t, ic, s2, sel]) => `
        <div class="rrow" aria-selected="${sel}">
          ${icon(ic, 15)}
          <span><span class="rrow__t">${esc(t)}</span><span class="rrow__s">${esc(s2)}</span></span>
          <span class="kbd">${sel ? '↵' : ''}</span>
        </div>`).join('')}
    </div></div>

  <div class="spx"><div class="spx__h"><b>פירורי לחם</b><span>L1 · מפריד מסובב</span></div>
    <div class="spx__box">
      <nav class="crumb" aria-label="מיקום">
        <a href="#s3">בית</a><span class="sep">${icon('chevronLeft', 12)}</span>
        <a href="#s3">${esc(PM.he)} · ${esc(PM.code)}</a><span class="sep">${icon('chevronLeft', 12)}</span>
        <a href="#s3">${esc(NEO.pmTopics[1].title)}</a><span class="sep">${icon('chevronLeft', 12)}</span>
        <span aria-current="page" class="sap">${esc(EQUI.name)}</span>
      </nav>
      <p style="font-size:var(--t-micro);color:var(--ink-3);margin-block-start:var(--sp-2)">
        המפריד מקבל <span class="sap">transform: scaleX(var(--cd-flip))</span>. שם הטבלה מבודד ב־<span class="sap">unicode-bidi: isolate</span>.
      </p>
    </div></div>

  <div class="spx"><div class="spx__h"><b>תגים</b><span>סטטוס · מודול · שכבה</span></div>
    <div class="spx__box" style="display:flex;gap:var(--sp-2);flex-wrap:wrap">
      ${STATUS.map(([k, he]) => `<span class="badge badge--st" style="--c:var(${k})"><i></i>${esc(he)}</span>`).join('')}
      ${[['PM', 'pm'], ['PP-PI', 'pppi'], ['QM', 'qm'], ['EWM', 'ewm']].map(([id, key]) =>
        `<span class="badge badge--mod" style="--m:var(--mod-${key})">${esc(id)}</span>`).join('')}
      <span class="badge">${esc(NEO.migrationLegend[MIG0.s4Impact] || NEO.migrationLegend.compat)}</span>
    </div>
    <p style="font-size:var(--t-micro);color:var(--ink-3);margin-block-start:var(--sp-2)">
      תג סטטוס = נקודה + מילה. תג מודול = גוון על גבול וטקסט, בלי מילוי — כדי שלא יתחרה בסטטוס.
    </p></div>

  <div class="spx"><div class="spx__h"><b>טבלת נתונים · מצב עבודה</b><span>L1 · צפיפות 2/3</span></div>
    <div class="spx__box">
      <table class="dtable">
        <thead><tr><th>טבלה</th><th>שדות</th><th>טרנזקציות</th></tr></thead>
        <tbody>${DISCOVERY.tables.slice(0, 4).map((t) => `<tr>
          <td class="k">${esc(t.name)}</td>
          <td class="num">${t.fields}</td>
          <td class="k">${esc(t.tcodes.slice(0, 2).join(', '))}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div></div>

  <div class="spx"><div class="spx__h"><b>כרטיס ספרייה</b><span>קפוא · קריאה בלבד</span></div>
    <div class="spx__box">
      <div class="modcard" style="--m:var(--mod-pm)">
        <span class="modcard__bar"></span>
        <span style="flex:1">
          <span class="modcard__t">${esc(BOOK0.title)}</span>
          <span class="modcard__n">
            <span><b class="num">${BOOK0.chapters}</b> פרקים</span>
            <span><b class="num">${n(BOOK0.sections)}</b> מקטעים</span>
            <span><b class="num">${Math.round(BOOK0.minutes / 60)}</b> שעות</span>
          </span>
        </span>
      </div>
      <p style="font-size:var(--t-micro);color:var(--ink-3);margin-block-start:var(--sp-2)">
        הדגימה כאן היא ייצוג בלבד. רכיב הספרייה בייצור <b>לא נוגעים בו</b> — הוא יורש אסימונים ותו לא.
      </p>
    </div></div>

  <div class="spx"><div class="spx__h"><b>שבבי מקלדת</b><span>גלויים תמיד</span></div>
    <div class="spx__box" style="display:flex;gap:var(--sp-3);flex-wrap:wrap;align-items:center">
      ${[['⌘', 'K', 'משטח פקודה'], ['⌘', '\\', 'ניווט'], ['/', '', 'חיפוש בעמוד'], ['Esc', '', 'סגירה']].map(([a, b, lbl]) =>
        `<span style="display:flex;align-items:center;gap:6px">
          <span class="kbd">${esc(a)}</span>${b ? `<span class="kbd">${esc(b)}</span>` : ''}
          <span style="font-size:var(--t-micro);color:var(--ink-3)">${esc(lbl)}</span>
        </span>`).join('')}
    </div>
    <p style="font-size:var(--t-micro);color:var(--ink-3);margin-block-start:var(--sp-2)">
      השבב מוצג ב־<span class="sap">direction: ltr</span> כדי ש־⌘K לא יתהפך ל־K⌘.
    </p></div>

</div>`;

/* ---- 3.4 component registry ---- */
const REGISTRY = [
  { name: 'קליפת האפליקציה', api: 'AppShell', tier: 'L1', purpose: 'רשת אחת ברמת המסך: סרגל ניווט ואזור ראשי. מחזיקה את מצב הניווט ומצב הערכה, ולא יותר.',
    states: 'nav-compact · nav-expanded · nav-peek · mobile',
    tokens: ['--rail-compact', '--rail-expanded', '--topbar-h', '--background'],
    rtl: 'הרשת מוגדרת ב־<span class="sap">grid-template-columns</span> עם הסרגל ראשון — ב־RTL הוא נוחת מימין בלי כלל נוסף.',
    a11y: 'מכילה <span class="sap">&lt;main id="main"&gt;</span> יחיד ואת קישור «דלג לתוכן». סדר ה־DOM = סדר הקריאה.' },

  { name: 'סרגל הניווט', api: 'NavShell', tier: 'L2', purpose: 'הגישה הקבועה לכל חלקי המוצר. שלושה מצבים בלבד — הכרעה מול כיוון B שהציע גם מצב צף עצמאי וכיוון C שהציע מצב מוסתר לגמרי.',
    states: 'compact · expanded · peek · hidden(mobile)',
    tokens: ['--rail-compact', '--rail-expanded', '--surface', '--hairline', '--dur-panel', '--ease-spring'],
    rtl: 'נצמד ל־<span class="sap">inline-start</span>. תנועת הפתיחה משתמשת ב־<span class="sap">--cd-flip</span> ולא בערך שלילי קשיח.',
    a11y: '<span class="sap">&lt;nav aria-label="ניווט ראשי"&gt;</span>. מצב מצומצם שומר על תוויות נגישות מלאות למרות שהטקסט מוסתר ויזואלית.' },

  { name: 'פריט ניווט', api: 'NavItem', tier: 'L2', purpose: 'יעד ניווט יחיד. אף פעם לא כפתור — תמיד קישור, כדי שפתיחה בלשונית חדשה תעבוד.',
    states: 'rest · hover · focus-visible · current · disabled(בקרוב)',
    tokens: ['--ink-2', '--ink-1', '--surface-2', '--sel-bg', '--focus-ring', '--r-sm'],
    rtl: 'האייקון ב־<span class="sap">inline-start</span>; המונה ב־<span class="sap">inline-end</span>. אין <span class="sap">margin-left</span> באף מקום.',
    a11y: '<span class="sap">aria-current="page"</span> על הפעיל. מודול ללא תוכן מקבל <span class="sap">aria-disabled</span> ותווית «בקרוב», ולא נעלם.' },

  { name: 'קבוצת ניווט', api: 'NavGroup', tier: 'L1', purpose: 'איגוד פריטים תחת כותרת שאפשר לקפל, בלי לאבד את מיקום הגלילה.',
    states: 'expanded · collapsed',
    tokens: ['--ink-3', '--t-micro', '--r-xs', '--ease-out-expo'],
    rtl: 'החץ מסובב ב־<span class="sap">rotate(calc(90deg * var(--cd-flip)))</span> במצב מקופל.',
    a11y: 'כותרת = <span class="sap">&lt;button aria-expanded aria-controls&gt;</span>. הרשימה נשארת ב־DOM כשמקופלת רק אם היא <span class="sap">hidden</span>.' },

  { name: 'סמן פריט פעיל', api: 'NavActiveIndicator', tier: 'L2', purpose: 'להראות מיקום נוכחי בתנועה אחת. יסוד DOM יחיד לכל הסרגל.',
    states: 'idle · travelling',
    tokens: ['--brand', '--r-pill', '--dur-base', '--ease-emphasis'],
    rtl: 'נצמד ל־<span class="sap">inset-inline-start</span> של הרשימה; נע ב־<span class="sap">translateY</span> בלבד, ולכן חסין כיוון.',
    a11y: 'דקורטיבי לחלוטין — <span class="sap">aria-hidden="true"</span>. המידע חי ב־<span class="sap">aria-current</span> של הפריט.' },

  { name: 'הצצת ניווט', api: 'NavPeek', tier: 'L2', purpose: 'לפתוח קבוצה מהסרגל המצומצם כשכבה, בלי לדחוף את התוכן.',
    states: 'hidden · entering · open',
    tokens: ['--surface', '--elev-3', '--r-md', '--ease-out-expo'],
    rtl: 'נפתחת מ־<span class="sap">inset-inline-start: var(--rail-compact)</span>, מוצמדת לסרגל.',
    a11y: 'לא מודאלית: <span class="sap">role="dialog" aria-modal="false"</span>. נסגרת ב־<span class="sap">Esc</span> ובעזיבת מיקוד, ולא רק בעזיבת עכבר.' },

  { name: 'תצוגה מקדימה בריחוף', api: 'HoverPreview', tier: 'L1', purpose: 'לענות על «מה זה» בלי ניווט — טבלה, טרנזקציה, BAPI.',
    states: 'hidden · shown · pinned',
    tokens: ['--surface', '--elev-3', '--hairline', '--t-xs', '--dur-fast'],
    rtl: 'מתמקמת ב־<span class="sap">inline-start/-end</span> לפי המקום הפנוי, לא לפי left/right.',
    a11y: 'ריחוף לבדו לעולם לא מספיק. מיקוד מקלדת פותח את אותו תוכן כפאנל עם <span class="sap">aria-describedby</span>; במגע — הקשה פותחת גיליון.' },

  { name: 'משטח הפקודה', api: 'CommandSurface', tier: 'L2', purpose: 'נקודת הכניסה האוניברסלית. מוצג כ־portal מעל הכול, אף פעם לא בתוך זרימת המסך.',
    states: 'closed · open · loading · empty · error',
    tokens: ['--surface', '--elev-4', '--r-md', '--dur-base', '--ease-out-expo'],
    rtl: 'הקלט מקבל <span class="sap">text-align: start</span>. מזהי SAP בתוצאות מבודדים ב־<span class="sap">unicode-bidi: isolate</span>.',
    a11y: 'מודאלי: מלכודת מיקוד, החזרת מיקוד לפותח, <span class="sap">Esc</span> סוגר. הקלט הוא <span class="sap">role="combobox"</span> עם <span class="sap">aria-expanded</span> ו־<span class="sap">aria-controls</span>.' },

  { name: 'שורת תוצאה', api: 'CommandResultRow', tier: 'L1', purpose: 'תוצאה יחידה עם סוג, כותרת, הקשר ורמז מקלדת.',
    states: 'rest · selected · hover · disabled',
    tokens: ['--sel-bg', '--sel-bar', '--r-sm', '--t-sm', '--ink-3'],
    rtl: 'רשת שלוש עמודות עם <span class="sap">justify-items: start</span>; שבב המקלדת ב־<span class="sap">inline-end</span>.',
    a11y: '<span class="sap">role="option"</span> בתוך <span class="sap">role="listbox"</span>. הבחירה מוכרזת דרך <span class="sap">aria-activedescendant</span> ולא דרך העברת מיקוד.' },

  { name: 'נתיב ה־AI', api: 'CommandAiLane', tier: 'L1', purpose: 'תשובה מנוסחת מעל אותן תוצאות, מסומנת במפורש כמסקנה ולא כעובדת מערכת.',
    states: 'idle · streaming · answered · no-evidence',
    tokens: ['--brand-soft', '--ink-2', '--r-md', '--t-sm'],
    rtl: 'הטקסט זורם RTL; קטעי קוד ומזהי SAP בתוכו נשארים LTR ומבודדים.',
    a11y: '<span class="sap">aria-live="polite"</span>, לא assertive. כל תשובה נושאת תווית מקור: «מבוסס על קובץ» / «דורש אימות במערכת». היעדר ראיה מוצג כטקסט, לא כתשובה ריקה.' },

  { name: 'כרטיס מודול', api: 'ModuleCard', tier: 'L3', purpose: 'שער הכניסה למודול, ומקור המעבר המשותף. נושא את זהות הגוון של המודול.',
    states: 'rest · hover · focus · entering · unavailable(בקרוב)',
    tokens: ['--mod-*', '--surface', '--hairline', '--r-lg', '--elev-2'],
    rtl: 'פס הזהות ב־<span class="sap">border-inline-start</span>. חץ הכניסה מסובב ב־<span class="sap">scaleX(var(--cd-flip))</span>.',
    a11y: 'הכרטיס כולו קישור אחד, לא ערימת קישורים. מודול ללא תוכן אינו ניתן לניווט ומצהיר «בקרוב» בטקסט.' },

  { name: 'כותרת סביבת עבודה', api: 'WorkspaceHeader', tier: 'L2', purpose: 'יעד המעבר המשותף, ומקום המספרים של המודול. מכאן ומטה המסך הוא L1.',
    states: 'entering · rest · sticky-condensed',
    tokens: ['--mod-*', '--t-h1', '--ink-1', '--hairline', '--ease-out-expo'],
    rtl: 'המספרים מוצגים ב־<span class="sap">font-variant-numeric: tabular-nums</span> ומבודדים כדי שלא יתערבבו עם המילים.',
    a11y: 'זו ה־<span class="sap">&lt;h1&gt;</span> של המסך. במצב מכווץ הכותרת נשארת אותו יסוד — לא מוחלפת בכותרת שנייה.' },

  { name: 'מסילת גילוי', api: 'DiscoveryRail', tier: 'L2', purpose: 'להראות לאן אפשר לקפוץ מהאובייקט הנוכחי: טרנזקציות, אפליקציות Fiori, ישויות קשורות.',
    states: 'rest · hopping · empty',
    tokens: ['--surface-2', '--r-md', '--ink-3', '--ease-emphasis'],
    rtl: 'הקשרים מסודרים כרשימה אנכית ולא כמסילה אופקית, כדי לא להסתמך על כיוון גלילה.',
    a11y: '<span class="sap">&lt;aside aria-label="קשרים"&gt;</span>. מצב ריק אומר במפורש «אין קשרים מגובי־ראיות», ולא נשאר ריק.' },

  { name: 'דף אובייקט', api: 'ObjectView', tier: 'L1', purpose: 'התצוגה המלאה של טבלה, טרנזקציה, BAPI או ישות. מסמך טכני ארוך שנקרא ברצף.',
    states: 'loading · loaded · partial-evidence · not-found',
    tokens: ['--surface', '--t-body', '--lh-he', '--hairline', '--sp-6'],
    rtl: 'שמות שדות ואורכים ב־LTR מבודד בתוך פסקה עברית. אורך שורה מוגבל ל־92ch.',
    a11y: 'ניווט «בעמוד זה» עם <span class="sap">aria-current</span> על הכותרת הנוכחית. כל כותרת מדורגת נכון, בלי דילוג רמות.' },

  { name: 'טבלת נתונים', api: 'DataTable', tier: 'L1', purpose: 'עבודה עם רשימות ארוכות: מיון, סינון, בחירה. משטח עבודה מובהק.',
    states: 'rest · sorted · filtered · row-selected · empty · loading',
    tokens: ['--surface-2', '--hairline', '--t-xs', '--sp-2', '--focus-ring'],
    rtl: '<span class="sap">text-align: start</span> בכל תא. עמודות מספריות מיושרות end עם ספרות טבלאיות.',
    a11y: 'טבלה סמנטית עם <span class="sap">&lt;th scope&gt;</span>. מיון מוצהר ב־<span class="sap">aria-sort</span>. גלילה אופקית מקבלת <span class="sap">tabindex="0"</span> ותווית.' },

  { name: 'קנבס ERD', api: 'ErdCanvas', tier: 'L3', purpose: 'לצייר ישויות וקשרים אמיתיים מהמאגר. SVG, לא WebGL, לא canvas.',
    states: 'overview · entity-focused · path-highlighted · panning',
    tokens: ['--surface', '--hairline', '--ink-3', '--brand', '--ease-out-expo'],
    rtl: 'הפריסה מחושבת בקואורדינטות ולכן חסינת כיוון; רק תוויות הטקסט מקבלות טיפול RTL.',
    a11y: '<span class="sap">role="img"</span> עם תיאור מלא, ולצידו רשימת ישויות נגישה שמאפשרת את אותו מיקוד במקלדת. זום דורש <span class="sap">Ctrl/⌘</span> — גלגלת חשופה גוללת עמוד.' },

  { name: 'מפקח ERD', api: 'ErdInspector', tier: 'L1', purpose: 'הפרטים של הישות הממוקדת: שדות, מפתחות, קשרים, הערת S/4.',
    states: 'empty · loaded · evidence-missing',
    tokens: ['--surface', '--hairline', '--t-xs', '--sp-4'],
    rtl: 'ביטויי <span class="sap">JOIN</span> נשארים LTR בבלוק קוד, ולא נשברים באמצע.',
    a11y: '<span class="sap">aria-live="polite"</span> — שינוי מיקוד בקנבס מכריז את שם הישות החדשה.' },

  { name: 'מפת־על ERD', api: 'ErdMinimap', tier: 'L1', purpose: 'התמצאות בקנבס גדול מהמסך.',
    states: 'rest · dragging',
    tokens: ['--surface-2', '--hairline', '--brand', '--r-sm'],
    rtl: 'מוצבת ב־<span class="sap">inset-inline-end</span>; מלבן התצוגה נגזר מהקנבס ולא ממראה המסך.',
    a11y: 'עזר בלבד — <span class="sap">aria-hidden="true"</span>. כל מה שהיא עושה זמין גם דרך רשימת הישויות.' },

  { name: 'כרטיס ספרייה', api: 'LibraryEntryCard', tier: 'L1', purpose: 'ערך בספרייה הדיגיטלית. <b>קפוא</b> — מוצג כאן כדי להגדיר מה מותר לרשת, לא כדי לשנותו.',
    states: 'rest · hover · in-progress · completed',
    tokens: ['--surface', '--hairline', '--r-lg'],
    rtl: 'כותרות ספרים באנגלית מבודדות; המטא בעברית זורם RTL סביבן.',
    a11y: 'ללא שינוי מהמצב הקיים בייצור. אין להוסיף מצבים ואין לשנות סמנטיקה.' },

  { name: 'פירורי לחם', api: 'Breadcrumb', tier: 'L1', purpose: 'מיקום היררכי — וגם הגיבוי הטקסטואלי של המעבר המשותף כשהתנועה מכובה.',
    states: 'rest · truncated',
    tokens: ['--ink-3', '--ink-1', '--t-xs', '--r-xs'],
    rtl: 'המפריד מסובב ב־<span class="sap">scaleX(var(--cd-flip))</span>. קיצור מתבצע באמצע, לא בקצה.',
    a11y: '<span class="sap">&lt;nav aria-label="מיקום"&gt;</span> עם <span class="sap">aria-current="page"</span> על האחרון.' },

  { name: 'תג', api: 'Badge', tier: 'L1', purpose: 'עובדה קצרה על אובייקט: סטטוס הגירה, שיוך מודול, סוג.',
    states: 'status · module · neutral',
    tokens: ['--status-*', '--mod-*', '--r-pill', '--t-micro'],
    rtl: 'הנקודה ב־<span class="sap">inline-start</span>. אין תג שמכיל רק צבע בלי מילה.',
    a11y: 'הצבע לעולם אינו נושא המידע היחיד. תג סטטוס נקרא כטקסט מלא לקורא מסך.' },

  { name: 'שבב מקלדת', api: 'Kbd', tier: 'L1', purpose: 'לחשוף שהמוצר מונע מקלדת. מופיע ליד כל פעולה שיש לה קיצור.',
    states: 'rest · pressed',
    tokens: ['--surface-2', '--hairline', '--font-mono', '--r-xs'],
    rtl: '<span class="sap">direction: ltr</span> חובה — אחרת ⌘K מוצג הפוך.',
    a11y: '<span class="sap">&lt;kbd&gt;</span> אמיתי. הקיצור מוזכר גם ב־<span class="sap">aria-keyshortcuts</span> על הפקד עצמו.' },

  { name: 'גיליון תחתון', api: 'BottomSheet', tier: 'L2', purpose: 'תצוגת פרטים במובייל בלי לעזוב את ההקשר.',
    states: 'closed · open · dragging · snapped',
    tokens: ['--surface', '--r-lg', '--dur-panel', '--ease-out-expo'],
    rtl: 'תנועה על ציר Y בלבד — חסין כיוון לחלוטין. הידית ממורכזת.',
    a11y: 'מודאלי: מלכודת מיקוד, <span class="sap">Esc</span>, החזרת מיקוד. הידית היא כפתור עם תווית, לא רק אזור גרירה.' },

  { name: 'ניווט מובייל', api: 'MobileNav', tier: 'L2', purpose: 'ניווט תחתון למכשירי מגע.',
    states: 'rest · current · badge',
    tokens: ['--surface', '--hairline', '--brand', '--t-micro'],
    rtl: 'סדר הפריטים הוא סדר ה־DOM; ב־RTL הראשון נוחת מימין ללא כלל נוסף.',
    a11y: 'יעדי מגע לפחות 44px. <span class="sap">aria-current="page"</span>. נבחר לפי <span class="sap">(pointer: coarse)</span> — לעולם לא לפי רוחב חלון בלבד.' },

  { name: 'מערכת הפעולות', api: 'Button', tier: 'L1', purpose: 'שבעה סוגים על מדרג חשיבות אחד. ראשי אחד בלבד למסך.',
    states: 'rest · hover · active · focus-visible · disabled · loading',
    tokens: ['--brand', '--brand-dark', '--surface', '--hairline', '--focus-ring', '--r-md'],
    rtl: 'האייקון ב־<span class="sap">inline-start</span> של התווית; ריווח ב־<span class="sap">gap</span> ולא ב־margin.',
    a11y: 'מנוטרל נשאר במיקוד עם <span class="sap">aria-disabled</span> כשצריך להסביר למה. מצב טעינה מכריז דרך <span class="sap">aria-busy</span>. גובה מינימלי 40px, במגע 44px.' },
];

$('#registry').innerHTML = `<div class="reg">${REGISTRY.map((c) => `
  <article class="regrow">
    <div class="regrow__h">
      <span class="regrow__n">${esc(c.name)}</span>
      <span class="regrow__api">${esc(c.api)}</span>
      <span class="tpill" data-t="${c.tier}">${c.tier}</span>
      <span class="regrow__p">${c.purpose}</span>
    </div>
    <div class="regrow__b">
      <div class="regfield"><b>מצבים</b><p>${esc(c.states)}</p></div>
      <div class="regfield"><b>אסימונים</b><p>${c.tokens.map((t) => `<span class="tk">${esc(t)}</span>`).join(' ')}</p></div>
      <div class="regfield"><b>‏RTL</b><p>${c.rtl}</p></div>
      <div class="regfield"><b>נגישות</b><p>${c.a11y}</p></div>
    </div>
  </article>`).join('')}</div>`;

/* ═════════════════════════════════════ 7 · §4 · implementation phases */

const PHASES = [
  {
    k: 'P0', title: 'שכבת האסימונים', risk: 'low', solo: true,
    goal: 'להכניס את <span class="sap">module-tokens.css</span>, את סולמות הרדיוס/המרווח/הטיפוגרפיה ואת שפת המיקוד האחידה לתוך <span class="sap">app/globals.css</span> — בלי לגעת באף רכיב.',
    surfaces: ['<span class="sap">app/globals.css</span> בלבד', 'משפיע על כל מסך במוצר דרך ירושה', 'כולל את הספרייה — ולכן היא נבדקת כאן במפורש'],
    risk_note: 'נמוך. אין שינוי DOM ואין שינוי לוגיקה. הסיכון היחיד הוא רגרסיה ויזואלית בספרייה הקפואה.',
    verify: ['<span class="sap">npm run build</span> עובר, מספר העמודים ב־<span class="sap">out/</span> לא משתנה', 'צילומי מסך משווים של מסכי הספרייה לפני ואחרי — חייבים להיות זהים', 'סריקת <span class="sap">out/</span>: אפס בקשות לנכס חיצוני', 'הרצת §6 של המסמך הזה על בילד מקומי — ניגודיות בשתי הערכות'],
    roll: 'להחזיר קומיט אחד ב־<span class="sap">app/globals.css</span>. אין תלות, אין מיגרציית נתונים, אין שינוי מסלול.',
  },
  {
    k: 'P1', title: 'קליפה וניווט', risk: 'low', solo: true,
    goal: 'קליפת אפליקציה אחת: סרגל compact/expanded, הצצה, קבוצות עם שמירת גלילה, וסמן פעיל נוסע יחיד.',
    surfaces: ['<span class="sap">AppShell</span> · <span class="sap">NavShell</span> · <span class="sap">NavItem</span> · <span class="sap">NavGroup</span> · <span class="sap">NavPeek</span>', 'פירורי לחם', 'כל מסך יורש — אך אף מסך לא נערך'],
    risk_note: 'נמוך־בינוני. הניווט נוגע בכל עמוד, אבל אינו נוגע בתוכן. הסיכון האמיתי הוא מיקוד ומצב פתיחה, ולא ויזואליה.',
    verify: ['מעבר מקלדת מלא: <span class="kbd">Tab</span> מכסה את כל הסרגל בסדר DOM', '<span class="sap">aria-current</span> נכון בכל מסלול', 'קיפול קבוצה אינו מאפס <span class="sap">scrollTop</span> — בדיקה ידנית בכל קבוצה', 'אין גלישה אופקית ב־390 / 1024 / 1440 / 2560', 'רשימת המסלולים לפני ואחרי זהה'],
    roll: 'הקליפה נכנסת מאחורי דגל <span class="sap">NEXT_PUBLIC_SHELL_V2</span> בזמן פיתוח; הסרת הדגל מחזירה את הקליפה הקיימת. אחרי ייצוב — הדגל נמחק.',
  },
  {
    k: 'P2', title: 'משטח הפקודה', risk: 'mid', solo: true,
    goal: 'משטח ⌘K גלובלי מעל מנוע החיפוש הקיים: תוצאות מסווגות, ניווט מקלדת מלא, נתיב AI מסומן־מקור.',
    surfaces: ['<span class="sap">CommandSurface</span> · <span class="sap">CommandResultRow</span> · <span class="sap">CommandAiLane</span>', 'מחליף את שדה החיפוש בראש המסך — לא את מנוע החיפוש'],
    risk_note: 'בינוני. הרכיב מודאלי ולכן נושא סיכון מיקוד ונעילת גלילה. אין סיכון נתונים: אותו מקור, אותה שאילתה.',
    verify: ['מלכודת מיקוד עוברת בדיקה ידנית: <span class="kbd">Tab</span> לא בורח מהמודאל', 'מיקוד חוזר לפותח אחרי <span class="kbd">Esc</span>', '<span class="sap">aria-activedescendant</span> מתעדכן בכל חץ', 'השהיית תוצאה מהקשה עד רשימה מסוננת מתחת ל־50ms על מכשיר עם throttle ×4', 'מצב ריק אומר טקסט, לא רשימה ריקה'],
    roll: 'קומפוננטה עצמאית שנטענת מנקודה אחת בקליפה. הסרת ההרכבה מחזירה את שדה החיפוש הקודם באותו קומיט.',
  },
  {
    k: 'P3', title: 'כניסה למודול', risk: 'mid', solo: false,
    goal: 'כרטיסי מודול נושאי־גוון, כותרת סביבת עבודה, ומעבר FLIP ביניהם.',
    surfaces: ['<span class="sap">ModuleCard</span> · <span class="sap">WorkspaceHeader</span>', 'מסך הבית ומפת היקום', 'תלוי ב־P1 — הכותרת חייבת לחיות בתוך הקליפה החדשה'],
    risk_note: 'בינוני. זו התנועה היחידה שנוגעת ב־layout. מלכודת ידועה: אלמנט־רפאים שנתקע כשמשתמש בחר תנועה מופחתת.',
    verify: ['נתיב <span class="sap">setTimeout</span> מוכח: הפעלה עם <span class="sap">prefers-reduced-motion</span> ואימות שאין אלמנט שנשאר ב־DOM', 'המעבר רץ ב־55fps ומעלה תחת throttle ×4', 'ניווט ישיר לכתובת סביבת העבודה נותן אותה תוצאה בלי מעבר', 'הכתובות לא השתנו — השוואת <span class="sap">sitemap</span> לפני ואחרי'],
    roll: 'המעבר עצמו הוא שכבה אחת בקוד: ביטול הקריאה ל־FLIP משאיר חיתוך ישיר, וכל השאר נשאר עובד.',
  },
  {
    k: 'P4', title: 'סביבות עבודה וצפיפות', risk: 'mid', solo: false,
    goal: 'להוריד את סביבות PM ו־PP-PI, את דפי האובייקט ואת הטבלאות לצפיפות עבודה ולרישום L1: טיפוגרפיה קטנה יותר, ריווח 2/3, אפס תנועת גילוי.',
    surfaces: ['<span class="sap">ObjectView</span> · <span class="sap">DataTable</span> · <span class="sap">DiscoveryRail</span>', 'מסכי המודולים ומרכזי ההפניה'],
    risk_note: 'בינוני. הרבה מסכים, אך כל שינוי הוא מצגתי. הסיכון הוא רגרסיה בקריאוּת של טבלאות רחבות ב־RTL.',
    verify: ['אין גלישה אופקית באף מסך בארבעת הרוחבים', 'טבלה עם גלילה אופקית מקבלת מיקוד ותווית', 'תקציב הצמתים למסך נמדד ועומד בסעיף 05', 'זמן בנייה של הייצוא הסטטי לא גדל ביותר מ־20%'],
    roll: 'שינוי צפיפות מרוכז במחלקת עטיפה אחת לכל משטח. הסרת המחלקה מחזירה את המצב הקודם.',
  },
  {
    k: 'P5', title: 'ויזואליזציה', risk: 'high', solo: false,
    goal: 'קנבס ERD, מפקח, מפת־על ומשטח ECC→S/4HANA — הכול SVG, עם רשימה נגישה מקבילה.',
    surfaces: ['<span class="sap">ErdCanvas</span> · <span class="sap">ErdInspector</span> · <span class="sap">ErdMinimap</span>', 'מסך מודל הנתונים ומסך המעבר'],
    risk_note: 'גבוה. זה השטח היחיד עם ציור דינמי, עם 62 ישויות ו־146 קשרים, ועם סיכון נגישות אמיתי. גם הסיכון היחיד שאם ייכשל — לא נשארת בעיה במסכים אחרים.',
    verify: ['אפס long tasks מעל 50ms במיקוד ישות, תחת throttle ×4', 'גלגלת חשופה גוללת עמוד; זום רק עם <span class="sap">Ctrl/⌘</span>', 'כל ישות ניתנת למיקוד ולהפעלה במקלדת דרך הרשימה המקבילה', 'ספירת הישויות והקשרים במסך תואמת בדיוק את המאגר — בלי קשר מומצא'],
    roll: 'מסך עצמאי בכתובת נפרדת. אם הוא לא בשל, הוא פשוט לא משוגר; שום מסך אחר לא תלוי בו.',
  },
  {
    k: 'P6', title: 'מגע, מצבים וליטוש', risk: 'low', solo: true,
    goal: 'גיליון תחתון, ניווט מגע, וסריקת מצבים גלובלית: ריק, טוען, שגיאה, «בקרוב», חוסר ראיה.',
    surfaces: ['<span class="sap">BottomSheet</span> · <span class="sap">MobileNav</span>', 'כל מצב ריק/שגיאה בכל המוצר'],
    risk_note: 'נמוך. תוספות בלבד, ללא שינוי במסלול קיים.',
    verify: ['כל יעד מגע לפחות 44px — נמדד, לא מוערך', 'חלון צר על שולחן עבודה לא מקבל ניווט מובייל: בדיקה ידנית ב־<span class="sap">(pointer: fine)</span> ברוחב 600px', 'לכל מצב ריק יש טקסט שמסביר מה חסר ומה לעשות', 'אין מחרוזת SAP שנוצרה בקוד ולא הגיעה מהמאגר'],
    roll: 'כל פריט בשלב הזה עצמאי וניתן להסרה בנפרד.',
  },
];

$('#phases').innerHTML = `<div class="ph">${PHASES.map((p) => `
  <article class="phase">
    <header class="phase__h">
      <span class="phase__k">${p.k}</span>
      <span class="phase__t">${esc(p.title)}</span>
      <span class="phase__tags">
        <span class="rk" data-r="${p.risk}">סיכון ${p.risk === 'low' ? 'נמוך' : p.risk === 'mid' ? 'בינוני' : 'גבוה'}</span>
        <span class="rk" data-r="solo">${p.solo ? 'ניתן לשיגור עצמאי' : 'תלוי בשלב קודם'}</span>
      </span>
    </header>
    <div class="phase__b">
      <div class="pf"><b>מטרה</b><p>${p.goal}</p></div>
      <div class="pf"><b>משטחים שנוגעים בהם</b><ul>${p.surfaces.map((s) => `<li>${s}</li>`).join('')}</ul></div>
      <div class="pf"><b>סיכון</b><p>${p.risk_note}</p></div>
      <div class="pf"><b>איך מאמתים</b><ul>${p.verify.map((s) => `<li>${s}</li>`).join('')}</ul></div>
      <div class="pf pf--roll"><b>גלגול אחורה</b><p>${p.roll}</p></div>
    </div>
  </article>`).join('')}</div>`;

/* ═══════════════════════════════════════ 8 · §5 · performance budget */

const BUDGET = [
  ['‏JavaScript שנוסף', 'עד 35KB gzip', 'סך כל שבעת השלבים יחד. הקליפה והניווט לבדם עד 12KB. אפס תלויות ריצה חדשות, ואפס ספריית אנימציה — ה־FLIP נכתב ביד ושוקל פחות מ־2KB.', 'מדידה על <span class="sap">out/</span> אחרי בנייה, לפני ואחרי כל שלב.'],
  ['‏CSS שנוסף', 'עד 18KB gzip', 'שכבת האסימונים כולה עד 3KB. Tailwind v4 עם קונפיג בתוך CSS — אסימון חדש הוא שורה, לא קובץ.', 'השוואת גודל של גיליון הסגנון בפלט.'],
  ['תקציב צמתי DOM', 'בית עד 1,400 · סביבת עבודה עד 1,800 · ERD עד 900 · תקרה קשיחה 2,200', 'הרפרנסים שנמדדו: Vercel 1,120 · Cursor 2,214 · Linear 4,486. ‏Linear נדחה במפורש כתקציב. טבלה מעל 200 שורות עוברת לחלון גלילה.', '<span class="sap">document.querySelectorAll("*").length</span> בכל מסך, בבדיקת בנייה.'],
  ['מחיר אנימציה', 'רק <span class="sap">transform</span> ו־<span class="sap">opacity</span> · עד 2 שכבות מונפשות במקביל', 'אין הנפשה של <span class="sap">width</span>, <span class="sap">height</span>, <span class="sap">top</span>, <span class="sap">margin</span> או <span class="sap">grid-template-rows</span>. <span class="sap">will-change</span> מוחל בתחילת מעבר ומוסר בסיומו, לעולם לא סטטי בגיליון.', 'סריקת קוד: כל <span class="sap">transition</span>-property חייב להיות ברשימה המותרת.'],
  ['נכסים', 'אפס תמונות · אפס גופנים · אפס רצפי תמונות', 'הוויזואל של NEO הוא SVG מונע־נתונים. הרפרנסים שילמו 26–40MB על צילומים; ל־NEO אין צילומים כלל. אייקונים הם נתיבי lucide מוטבעים ב־<span class="sap">shared/icons.js</span>.', 'סריקת <span class="sap">out/</span>: אפס בקשה חיצונית, אפס <span class="sap">@font-face</span>.'],
  ['משקל מסלול', 'עד 350KB לכל עמוד, כולל הכול', 'עמוד סטטי אחד מתוך ~4,600. המשקל נשלט על ידי היעדר נכסים, לא על ידי דחיסה.', 'דוח גודל של הייצוא הסטטי.'],
  ['קצב פריימים', 'לפחות 55fps מתמשך תחת CPU throttle ×4', 'הרפרנסים החזיקו 59–60fps באותם תנאים בדיוק. יעד נמוך מזה פירושו שמשהו מנפיש layout.', 'הקלטת ביצועים בגלילה ובכל אחת מ־12 התנועות.'],
  ['משימות ארוכות', '‏0 מעל 50ms באינטראקציה · לכל היותר 1 בטעינה ראשונית', 'שני רפרנסי האנרגיה הוויזואלית מדדו אפס long tasks. אין סיבה שאפליקציה סטטית תעשה פחות טוב.', '<span class="sap">PerformanceObserver</span> על <span class="sap">longtask</span> בבדיקה.'],
  ['השהיית אינטראקציה', 'מקסימום — פתיחת ⌘K 100ms · הקשה עד תוצאה מסוננת 50ms · הפעלת פריט ניווט 100ms · INP 200ms', 'משטח הפקודה הוא הרכיב שנוגעים בו הכי הרבה. אם הוא מרגיש איטי, כל המוצר מרגיש איטי.', 'מדידה ידנית עם throttle ×4 על המכשיר האיטי ביותר בסביבה התאגידית.'],
  ['זמן בנייה', 'עד +20% מול הבסיס', 'הייצוא הסטטי מייצר כ־4,600 עמודים. עלייה גדולה יותר משמעה שרכיב חדש עושה עבודה בזמן בנייה שאין לו סיבה לעשות.', 'זמן <span class="sap">npm run build</span> לפני ואחרי כל שלב.'],
];

$('#budget').innerHTML = `<div class="bud scroller"><table class="budtable">
  <thead><tr><th style="min-width:130px">ממד</th><th style="min-width:180px">גבול</th><th>נימוק</th><th style="min-width:200px">איך נאכף</th></tr></thead>
  <tbody>${BUDGET.map(([d, lim, why, how]) =>
    `<tr><td>${d}</td><td class="lim">${lim}</td><td>${why}</td><td>${how}</td></tr>`).join('')}</tbody>
</table></div>`;

/* ═════════════════════════════════════ 9 · §6 · accessibility checklist */

const A11Y = [
  { g: 'א', t: 'נכונות RTL', s: 'המוצר הוא dir="rtl" מלידה, לא תרגום', items: [
    ['אין ולו <span class="sap">margin-left</span> / <span class="sap">padding-right</span> / <span class="sap">left</span> / <span class="sap">right</span> אחד בקוד המוצר.', 'חיפוש טקסטואלי בכל קבצי הסגנון. חריג יחיד מותר: מדידת FLIP ב־JS, שהיא פיזית מטבעה.'],
    ['אייקוני כיוון מסובבים: <span class="sap">chevronLeft</span>, <span class="sap">chevronRight</span>, <span class="sap">arrowLeft</span>, <span class="sap">arrowUpRight</span>, <span class="sap">cornerDown</span>, <span class="sap">panelLeft</span>.', 'סיבוב ב־<span class="sap">transform: scaleX(var(--cd-flip))</span> ולא בהחלפת אייקון.'],
    ['אייקונים שאסור לסובב: <span class="sap">search</span>, <span class="sap">clock</span>, <span class="sap">history</span>, <span class="sap">check</span>, <span class="sap">settings</span>, <span class="sap">wrench</span>, <span class="sap">command</span>, <span class="sap">sun</span>, <span class="sap">moon</span>, <span class="sap">gitBranch</span>, <span class="sap">sigma</span>.', 'סיבובם משנה משמעות או יוצר סמל שגוי. <span class="sap">history</span> במיוחד — חץ הזמן חייב להישאר נגד כיוון השעון.'],
    ['כל מזהה SAP עטוף ב־<span class="sap">unicode-bidi: isolate</span> עם <span class="sap">direction: ltr</span>.', 'בדיקה ויזואלית על מחרוזת מעורבת: «טבלת EQUI מכילה 27 שדות» — הנקודה בסוף המשפט במקום הנכון.'],
    ['מספרים ומידות ב־<span class="sap">font-variant-numeric: tabular-nums</span> ומיושרים <span class="sap">end</span> בטבלאות.', 'בדיקה על עמודת «שדות» בכל טבלת נתונים.'],
    ['תנועה אופקית משתמשת ב־<span class="sap">--cd-flip</span> ולא בערך שלילי קשיח.', 'החלפת <span class="sap">dir</span> ל־ltr זמנית — כל תנועה חייבת להתהפך נכון.'],
  ]},
  { g: 'ב', t: 'מקלדת וסדר מיקוד', s: 'כל פעולה נגישה בלי עכבר', items: [
    ['סדר המיקוד: דלג-לתוכן ← סרגל ניווט ← פירורי לחם ← פעולות המסך ← תוכן ראשי ← מסילת גילוי.', 'לחיצות <span class="kbd">Tab</span> רצופות מתחילת העמוד, בכל אחד ממסכי המפתח.'],
    ['סדר ה־DOM זהה לסדר הוויזואלי. אין <span class="sap">tabindex</span> חיובי בשום מקום.', 'חיפוש טקסטואלי: <span class="sap">tabindex="0"</span> ו־<span class="sap">tabindex="-1"</span> בלבד.'],
    ['קיצורים: <span class="kbd">⌘</span><span class="kbd">K</span> פקודה · <span class="kbd">⌘</span><span class="kbd">\\</span> ניווט · <span class="kbd">Esc</span> סגירה · <span class="kbd">↑</span><span class="kbd">↓</span> תוצאות · <span class="kbd">Enter</span> הפעלה.', 'כל אחד מוצהר ב־<span class="sap">aria-keyshortcuts</span> על הפקד שלו, ומופיע כשבב גלוי.'],
    ['מלכודת מיקוד בכל משטח מודאלי: משטח פקודה, גיליון תחתון.', '<span class="kbd">Tab</span> מסתובב בתוך המודאל; <span class="kbd">Esc</span> סוגר ומחזיר מיקוד לפותח.'],
    ['תצוגה מקדימה נגישה במקלדת — לא רק בריחוף.', 'מיקוד על השורה חושף את אותו תוכן כפאנל מקושר.'],
    ['ה־ERD ניתן לתפעול מלא במקלדת דרך רשימת הישויות המקבילה.', 'מיקוד ישות ברשימה ממקד אותה בקנבס ומעדכן את המפקח.'],
  ]},
  { g: 'ג', t: 'שפת המיקוד', s: 'טבעת אחת בכל המוצר', items: [
    ['כל יסוד אינטראקטיבי משתמש ב־<span class="sap">--focus-ring</span> ובו בלבד.', 'חיפוש: אין <span class="sap">outline</span> מותאם ואין <span class="sap">box-shadow</span> אחר על <span class="sap">:focus-visible</span>.'],
    ['אין <span class="sap">outline: none</span> בלי החלפה מיידית בטבעת.', 'סריקת קוד.'],
    ['הטבעת נראית בשתי הערכות — היא בנויה משתי שכבות (משטח + מותג) בדיוק בשביל זה.', 'בדיקה ויזואלית של מיקוד על כפתור בהיר, כהה, ועל מילוי מותג.'],
    ['מיקוד לעולם לא נחתך על ידי <span class="sap">overflow: hidden</span> של ההורה.', 'מיקוד על פריט אחרון בקבוצה שנגללת.'],
  ]},
  { g: 'ד', t: 'ניגודיות', s: 'המספרים מסעיף 01, מול בילד אמיתי', items: [
    ['<span class="sap">--ink-1</span> ו־<span class="sap">--ink-2</span> עוברים AA בשתי הערכות מול <span class="sap">--surface</span> ומול <span class="sap">--surface-2</span>.', 'טבלת 1.2 מחשבת את זה חי. להריץ אותה מול משתני הבילד.'],
    ['<span class="sap">--ink-3</span> אינו משמש כגוף טקסט בשום מקום.', 'חיפוש שימושים; כל שימוש חייב להיות מטא, תווית או מספר.'],
    ['כל עשרת אסימוני <span class="sap">--mod-*</span> עוברים AA מול <span class="sap">--surface-2</span> בשתי הערכות.', 'טבלת 1.5 מציגה את הנמוך ביותר. אם הוא יורד מתחת ל־4.5 — הבילד נכשל.'],
    ['אסימוני <span class="sap">--status-*</span> אינם משמשים כצבע טקסט בערכה הבהירה.', 'הם נכשלים ב־AA שם. מותר רק כנקודה או מילוי לצד תווית מילולית.'],
    ['אין מידע שנישא בצבע לבדו — כל סטטוס, כל שיוך מודול וכל השפעת S/4 נאמרים גם במילים.', 'צילום מסך בגווני אפור: כל המידע חייב לשרוד.'],
  ]},
  { g: 'ה', t: 'גודל יעדים', s: 'נמדד, לא מוערך', items: [
    ['כל יעד מגע לפחות <span class="sap">44×44px</span> במצב <span class="sap">(pointer: coarse)</span>.', 'מדידה ב־DevTools על ניווט מובייל, ידית הגיליון, וכפתורי אייקון.'],
    ['כל יעד עכבר לפחות 32px גובה, כפתור סטנדרטי 40px.', 'הכפתור הקומפקטי 28px מותר אך ורק בתוך שורת טבלה, כשכל השורה גם היא לחיצה.'],
    ['מרווח של לפחות 8px בין יעדים סמוכים.', 'בדיקה על שורת פעולות בכותרת סביבת עבודה.'],
  ]},
  { g: 'ו', t: 'סמנטיקה לקורא מסך', s: 'תפקידים אמיתיים, לא div-ים', items: [
    ['משטח הפקודה: <span class="sap">role="combobox"</span> על הקלט, <span class="sap">aria-expanded</span>, <span class="sap">aria-controls</span> לרשימה, <span class="sap">aria-activedescendant</span> לבחירה.', 'המיקוד נשאר בקלט; לעולם לא עובר לשורות. בדיקה עם VoiceOver או NVDA.'],
    ['התוצאות: <span class="sap">role="listbox"</span> עם <span class="sap">role="option"</span> ו־<span class="sap">aria-selected</span>.', 'ספירת התוצאות מוכרזת ב־<span class="sap">aria-live="polite"</span> אחרי כל סינון.'],
    ['הניווט: <span class="sap">&lt;nav aria-label&gt;</span> עם רשימות מקוננות; קבוצות הן <span class="sap">button[aria-expanded][aria-controls]</span>.', 'לא <span class="sap">role="tree"</span> אלא אם מיושמת מלוא סמנטיקת העץ כולל חצי מקלדת. הכרעה: רשימות מקוננות.'],
    ['קנבס ה־ERD: <span class="sap">role="img"</span> עם <span class="sap">aria-label</span> שמונה את הישות הממוקדת ואת שכנותיה, לצד רשימה נגישה מקבילה.', 'הרשימה אינה <span class="sap">sr-only</span> — היא מוצגת גם ויזואלית כפאנל.'],
    ['נתיב ה־AI: <span class="sap">aria-live="polite"</span> ותווית מקור מילולית בכל תשובה.', 'לעולם לא <span class="sap">assertive</span> — תשובה זורמת שמפריעה לקריאה היא כשל.'],
    ['היררכיית כותרות בלי דילוג רמות, <span class="sap">&lt;h1&gt;</span> אחד לעמוד.', 'סריקת מבנה כותרות בכל סוג מסך.'],
    ['<span class="sap">&lt;html lang="he" dir="rtl"&gt;</span>; קטעים באנגלית מסומנים <span class="sap">lang="en"</span>.', 'שמות ספרים וטבלאות באנגלית — כדי שהקורא לא יהגה אותם בעברית.'],
  ]},
  { g: 'ז', t: 'תנועה מופחתת', s: 'prefers-reduced-motion: reduce', items: [
    ['כל אחת מ־12 התנועות מגיעה למצב הסופי שלה מיידית, בלי לאבד מידע.', 'הפעלת המתג בראש המסמך והרצת כל 12 ההדגמות.'],
    ['אף אלמנט לא נשאר ב־<span class="sap">opacity: 0</span> אחרי כיבוי התנועה.', 'גילוי תלוי־גלילה חייב להתחיל גלוי כשהמצב מופחת.'],
    ['נתיב הבטיחות של <span class="sap">setTimeout</span> קיים בכל מקום שמנקה אלמנט ב־<span class="sap">transitionend</span>.', 'הרצת המעבר המשותף עם תנועה מופחתת ואימות שאין רפאים שנשאר.'],
    ['גלילה חלקה מכובה; <span class="sap">scroll-behavior: auto</span>.', 'כבר מטופל בכלל הגלובלי ב־<span class="sap">tokens.css</span> — לוודא שלא נדרס.'],
    ['אין אנימציה אינסופית בשום מקום מלבד מחוון טעינה, וגם הוא נעצר במצב מופחת.', 'סריקה של <span class="sap">animation-iteration-count: infinite</span>.'],
  ]},
  { g: 'ח', t: 'החוק העליון', s: 'תנועה אינה תנאי להבנה', items: [
    ['מיקום נוכחי מובן בלי הסמן הנוסע.', 'לכבות תנועה ולוודא ש־<span class="sap">aria-current</span> ורקע השורה מספיקים.'],
    ['הקשר מקור-יעד במעבר המשותף מובן בלי המעבר.', 'פירורי הלחם וכותרת סביבת העבודה נושאים את אותו מידע.'],
    ['בחירה במשטח הפקודה מובנת בלי תנועת הפס.', 'רקע <span class="sap">--sel-bg</span>, פס <span class="sap">--sel-bar</span> ו־<span class="sap">aria-selected</span>.'],
    ['מיקוד ב־ERD מובן בלי ההנפשה.', 'מסגרת מוצקה על הממוקדת ושם הישות במפקח.'],
    ['אין מסך שבו כיבוי התנועה מסתיר מידע כלשהו.', 'מעבר על כל 15 המשטחים בטבלת הדרגים עם המתג דלוק.'],
  ]},
];

let a11yTotal = 0;
$('#a11y').innerHTML = `<div class="ck">${A11Y.map((g, gi) => `
  <section class="ckgroup">
    <header class="ckgroup__h"><b>${esc(g.g)} · ${esc(g.t)}</b><span>${esc(g.s)}</span></header>
    ${g.items.map((it, ii) => {
      const id = `ck-${gi}-${ii}`;
      a11yTotal++;
      return `<div class="ckitem">
        <input type="checkbox" id="${id}" data-ck>
        <label for="${id}"><p>${it[0]}</p><em>איך בודקים: ${it[1]}</em></label>
      </div>`;
    }).join('')}
  </section>`).join('')}</div>`;

const ckBoxes = $$('[data-ck]');
$('#a11yTotal').textContent = String(a11yTotal);
function updateA11y() {
  const done = ckBoxes.filter((b) => b.checked).length;
  $('#a11yDone').textContent = String(done);
  $('#a11yFill').style.transform = `scaleX(${done / ckBoxes.length})`;
}
ckBoxes.forEach((b) => b.addEventListener('change', updateA11y));
$('#a11yReset').addEventListener('click', () => { ckBoxes.forEach((b) => { b.checked = false; }); updateA11y(); });
updateA11y();
