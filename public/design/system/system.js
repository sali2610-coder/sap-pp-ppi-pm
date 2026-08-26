/* ============================================================================
   SAP by Sali · PROJECT NEO — DESIGN SYSTEM SHEET
   Every SAP string comes verbatim from ../shared/content.js.
   Every icon comes from ../shared/icons.js. Zero emoji. 100% offline.
   ========================================================================== */

import { NEO } from '../shared/content.js';
import icon from '../shared/icons.js';

/* --------------------------------------------------------------- helpers */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const html = document.documentElement;

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** LTR-isolated SAP identifier. */
const sap = (s) => `<span class="sap">${esc(s)}</span>`;
const tok = (s) => `<span class="tok"><b>${esc(s)}</b></span>`;

/* --------------------------------------------------------- brand lockups */
$$('[data-brand-name]').forEach(n => { n.textContent = NEO.brand.name; });
$$('[data-brand-product]').forEach(n => { n.textContent = NEO.brand.product; });
$$('[data-brand-credit]').forEach(n => { n.textContent = NEO.brand.credit; });

/* ============================================================ 1. controls */

/* ---- theme ---- */
function paintThemeBtn() {
  const dark = html.dataset.theme === 'dark';
  const btn = $('#themeBtn');
  btn.setAttribute('aria-pressed', String(dark));
  btn.setAttribute('aria-label', dark ? 'עבור למצב בהיר' : 'עבור למצב כהה');
  $('[data-slot="themeicon"]', btn).innerHTML = icon(dark ? 'sun' : 'moon', 15);
  $('[data-slot="themelabel"]', btn).textContent = dark ? 'מצב בהיר' : 'מצב כהה';
}
$('#themeBtn').addEventListener('click', () => {
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  paintThemeBtn();
  paintContrast();
});
paintThemeBtn();

/* ---- reduced motion ---- */
const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
function setMotion(reduced) {
  html.dataset.motion = reduced ? 'reduced' : 'full';
  const btn = $('#motionBtn');
  btn.setAttribute('aria-pressed', String(reduced));
  btn.setAttribute('aria-label', reduced
    ? 'כבה סימולציית תנועה מופחתת'
    : 'הדמה משתמש עם תנועה מופחתת');
}
$('#motionBtn').addEventListener('click', () => {
  setMotion(html.dataset.motion !== 'reduced');
});
setMotion(mqReduce.matches);
mqReduce.addEventListener('change', e => setMotion(e.matches));

/* ============================================== 2. section navigation */
const SECTIONS = [
  { id: 'sec-tokens',     n: '01', label: 'אסימוני עיצוב' },
  { id: 'sec-motion',     n: '02', label: 'סטוריבורד תנועה' },
  { id: 'sec-components', n: '03', label: 'משפחת רכיבים' },
  { id: 'sec-rtl',        n: '04', label: 'דגימות RTL' },
  { id: 'sec-a11y',       n: '05', label: 'נגישות' },
];

$('#secnav').innerHTML = SECTIONS.map(s => `
  <li><a href="#${s.id}" data-spy="${s.id}"><span class="n">${s.n}</span><span>${esc(s.label)}</span></a></li>
`).join('');

const spyLinks = new Map($$('[data-spy]').map(a => [a.dataset.spy, a]));
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    spyLinks.forEach(a => a.removeAttribute('aria-current'));
    const a = spyLinks.get(e.target.id);
    if (a) a.setAttribute('aria-current', 'true');
  });
}, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) spy.observe(el); });

/* ========================================== 3. token reading + contrast math */

/** Read live custom-property values for a given theme without repainting. */
function readTokens(theme, names) {
  const prev = html.dataset.theme;
  html.dataset.theme = theme;
  const cs = getComputedStyle(html);
  const out = {};
  names.forEach(n => { out[n] = cs.getPropertyValue(n).trim(); });
  html.dataset.theme = prev;
  return out;
}

function toRGB(v) {
  v = String(v).trim();
  if (v.startsWith('#')) {
    let h = v.slice(1);
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  }
  const m = v.match(/rgba?\(([^)]+)\)/);
  if (m) return m[1].split(/[,\s/]+/).slice(0, 3).map(Number);
  return [0, 0, 0];
}

/** WCAG 2.1 relative luminance. */
function luminance(v) {
  const [r, g, b] = toRGB(v).map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.1 contrast ratio between two colours. */
function contrast(a, b) {
  const la = luminance(a), lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/* ================================================== 4. §1 — DESIGN TOKENS */

/* ---- 4.1 surface planes, both themes, from the live variables ---- */
const PLANE_KEYS = ['--background', '--surface', '--surface-2', '--hairline', '--ink-1', '--ink-2', '--ink-3'];

function planeBox(theme, label) {
  const t = readTokens(theme, PLANE_KEYS);
  const row = (bg, name, desc, bar) => `
    <div class="plane" style="background:${bg};border-color:${t['--hairline']}">
      ${bar ? `<span class="swatchbar" style="background:${t['--hairline']}"></span>` : ''}
      <span class="grow">
        <span class="lbl" style="color:${t['--ink-2']}">${esc(desc)}</span>
      </span>
      <span class="tok" style="color:${t['--ink-3']}"><b style="color:${t['--ink-1']}">${esc(name)}</b> ${esc(t[name])}</span>
    </div>`;
  return `
    <div class="planebox">
      <div class="planebox__h">${icon(theme === 'dark' ? 'moon' : 'sun', 13)}<span>${esc(label)}</span></div>
      <div class="themed" style="background:${t['--background']}">
        <div class="stack3">
          ${row(t['--background'], '--background', 'רקע העמוד — המישור האחורי ביותר')}
          ${row(t['--surface'], '--surface', 'משטח — כרטיס, ניווט, סרגל עליון')}
          ${row(t['--surface-2'], '--surface-2', 'משטח מוגבה — כותרות, בארות, שורה נבחרת')}
          ${row(t['--surface'], '--hairline', 'קו־שיער — כל גבול במערכת', true)}
        </div>
      </div>
    </div>`;
}
$('#planes').innerHTML = planeBox('light', 'ערכה בהירה') + planeBox('dark', 'ערכה כהה');

/* ---- 4.2 ink hierarchy with runtime-computed contrast ---- */
const INKS = [
  { k: '--ink-1', use: 'כותרות, ערכים, טקסט ראשי', sample: 'רשומת אב של ציוד' },
  { k: '--ink-2', use: 'גוף טקסט, תוויות פעילות', sample: 'כותרת פקודת אחזקה (PM)' },
  { k: '--ink-3', use: 'מטא בלבד — מספרים, זמנים, תוויות מִשנה', sample: 'היסטוריית תזמון תכנית אחזקה' },
];

function paintContrast() {
  const cs = getComputedStyle(html);
  const surface = cs.getPropertyValue('--surface').trim();
  const rows = INKS.map(i => {
    const c = cs.getPropertyValue(i.k).trim();
    const r = contrast(c, surface);
    const aa = r >= 4.5, aaa = r >= 7, lg = r >= 3;
    const pass = aa ? '1' : (lg ? 'lg' : '0');
    const verdict = aa ? (aaa ? 'AAA PASS' : 'AA PASS') : (lg ? 'AA LARGE' : 'FAIL');
    return `
      <div class="inkrow">
        <div class="inkrow__spec">
          <div class="t" style="color:${c}">${esc(i.sample)}</div>
          <div class="m">${esc(i.use)}</div>
        </div>
        <span class="tok"><b>${esc(i.k)}</b><br>${esc(c)}</span>
        <span class="ratio" style="color:${c}">${r.toFixed(2)}</span>
        <span class="verdict" data-pass="${pass}">${verdict}</span>
      </div>`;
  }).join('');
  $('#contrast').innerHTML = `
    <div class="card__h">
      ${icon('activity', 15)}
      <b>ניגודיות מול <span class="sap">--surface</span></b>
      <span class="grow"></span>
      <span class="tok">מחושב בזמן ריצה · ${esc(surface)}</span>
    </div>
    ${rows}
    <div class="card__f">
      סף AA לגוף טקסט 4.5:1 · סף AA לטקסט גדול 3:1 · סף AAA 7:1.
      גודל גוף הטקסט הוא <span class="sap">--t-body</span> = 0.875rem — לא נחשב «טקסט גדול».
    </div>`;
}
paintContrast();

/* ---- 4.3 brand ---- */
const BRANDS = [
  { k: '--brand', cls: 'brand', use: 'סמן פעיל, טבעת מיקוד, פס בחירה, CTA יחיד' },
  { k: '--brand-dark', cls: 'dark', use: 'מצב hover / pressed של ה־CTA היחיד' },
  { k: '--brand-soft', cls: 'soft', use: 'רקע בחירה עדין — לעולם לא מאחורי גוף טקסט' },
];
$('#brand').innerHTML = BRANDS.map(b => {
  const v = getComputedStyle(html).getPropertyValue(b.k).trim();
  return `
    <div class="bswatch">
      <div class="bswatch__c bswatch__c--${b.cls}"></div>
      <div class="bswatch__m">
        <span class="tok"><b>${esc(b.k)}</b> ${esc(v)}</span>
        <span class="use">${esc(b.use)}</span>
      </div>
    </div>`;
}).join('');

$('#brandUse').innerHTML = `
  <div class="usebox usebox--ok">
    <div class="usebox__h">${icon('check', 14)}<span>נכון — נגיעה נושאת משמעות</span></div>
    <div class="usebox__b">
      <div class="correct">
        <b>${esc(NEO.pmTables[1].name)} · ${esc(NEO.pmTables[1].he)}</b>
        <span>פס מותג ברוחב 2px מסמן «כאן אתה נמצא». כל השאר בדיו.</span>
      </div>
    </div>
  </div>
  <div class="usebox usebox--bad">
    <div class="usebox__h">${icon('alertTriangle', 14)}<span>שגוי — אדום כמשטח</span></div>
    <div class="usebox__b">
      <div class="misuse">
        <b>${esc(NEO.pmTables[1].name)} · ${esc(NEO.pmTables[1].he)}</b>
        <span>מילוי מותג על כרטיס תוכן. הצבע צועק לפני הנתון, והטקסט הלבן על אדום נכשל ב־AAA.</span>
      </div>
    </div>
  </div>`;

/* ---- 4.4 status palette ---- */
const STATUS = [
  { k: '--status-not-started',  he: 'טרם התחיל',  en: 'not started' },
  { k: '--status-in-analysis',  he: 'בניתוח',     en: 'in analysis' },
  { k: '--status-in-conversion',he: 'בהמרה',      en: 'in conversion' },
  { k: '--status-tested',       he: 'נבדק',       en: 'tested' },
  { k: '--status-done',         he: 'הושלם',      en: 'done' },
];
$('#status').innerHTML = STATUS.map(s => {
  const v = getComputedStyle(html).getPropertyValue(s.k).trim();
  return `
    <div class="stat" style="--c:${v}">
      <div class="stat__c"></div>
      <div class="stat__he">${esc(s.he)}</div>
      <div class="stat__en">${esc(s.en)}</div>
      <span class="stat__pill"><i></i>${esc(s.he)}</span>
      <span class="tok"><b>${esc(s.k.replace('--status-', ''))}</b><br>${esc(v)}</span>
    </div>`;
}).join('');

/* ---- 4.5 radius ramp ---- */
const RADII = ['--r-xs', '--r-sm', '--r-md', '--r-lg', '--r-xl', '--r-2xl', '--r-pill'];
$('#radius').innerHTML = RADII.map(r => {
  const v = getComputedStyle(html).getPropertyValue(r).trim();
  return `<div class="radspec">
    <div class="radspec__b" style="--r:var(${r})"></div>
    <span class="tok"><b>${esc(r)}</b></span>
    <span class="tok">${esc(v)}</span>
  </div>`;
}).join('');

/* ---- 4.6 spacing rhythm ---- */
const SPACES = ['--sp-1','--sp-2','--sp-3','--sp-4','--sp-5','--sp-6','--sp-8','--sp-10','--sp-12','--sp-16'];
$('#spacing').innerHTML = SPACES.map(s => {
  const v = getComputedStyle(html).getPropertyValue(s).trim();
  const px = parseFloat(v) * 16;
  return `<div class="spacespec">
    <span class="tok"><b>${esc(s)}</b></span>
    <span class="spacespec__bar" style="--w:var(${s})"></span>
    <span class="spacespec__px">${px}px</span>
  </div>`;
}).join('');

/* ---- 4.7 elevation ramp ---- */
const ELEVS = [
  { k: '--elev-1', use: 'משטח יושב — כרטיס במנוחה' },
  { k: '--elev-2', use: 'מוגבה — תפריט, tooltip' },
  { k: '--elev-3', use: 'צף — פאנל ניווט, דיאלוג' },
  { k: '--elev-4', use: 'שכבת־על — פקודה, גיליון תחתון' },
];
$('#elev').innerHTML = ELEVS.map(e => `
  <div class="elevspec">
    <div class="elevspec__b" style="--e:var(${e.k})"></div>
    <span class="tok"><b>${esc(e.k)}</b></span>
    <span class="tok" style="white-space:normal;text-align:center">${esc(e.use)}</span>
  </div>`).join('');

/* ---- 4.8 type scale ---- */
const TYPE = [
  { k: '--t-display', w: 800, s: 'PROJECT NEO', note: 'כותרת עמוד יחידה' },
  { k: '--t-h1',      w: 800, s: NEO.modules[0].he + ' · ' + NEO.modules[0].code, note: 'כותרת מסך' },
  { k: '--t-h2',      w: 700, s: NEO.pmTopics[6].title, note: 'כותרת מקטע' },
  { k: '--t-body',    w: 400, s: NEO.pmTables[3].he, note: 'גוף טקסט — 4.5:1 חובה' },
  { k: '--t-sm',      w: 400, s: NEO.pmTables[4].he, note: 'טקסט צפוף בטבלה' },
  { k: '--t-xs',      w: 400, s: NEO.ppTables[2].he, note: 'מטא בשורה' },
  { k: '--t-micro',   w: 700, s: 'BAPIs / FMs', note: 'תווית עילית, ספירה' },
];
$('#type').innerHTML = TYPE.map(t => {
  const v = getComputedStyle(html).getPropertyValue(t.k).trim();
  const px = (parseFloat(v) * 16).toFixed(2).replace(/\.00$/, '');
  return `
    <div class="typerow">
      <div class="typerow__s" style="font-size:var(${t.k});font-weight:${t.w};line-height:1.3">${esc(t.s)}</div>
      <div class="typerow__m">
        <span class="tok"><b>${esc(t.k)}</b> ${esc(v)} · ${px}px · ${t.w}</span>
        <span class="tok">${esc(t.note)}</span>
      </div>
    </div>`;
}).join('');

/* ================================================ 5. §2 — MOTION STORYBOARD */

const PM = NEO.modules[0], PP = NEO.modules[1];
const EQUI = NEO.pmTables.find(t => t.name === 'EQUI');
const REF_GROUP = NEO.navGroups[1];            /* "עיון · Reference", 7 items */
const NAV_ICONS = ['wrench', 'boxes', 'gitBranch', 'table', 'terminal', 'plug', 'cable', 'sigma', 'appWindow', 'puzzle'];

function miniRow(iconName, label, meta, extra = '') {
  return `<div class="mini-row" ${extra}>
    ${icon(iconName, 14)}
    <span class="grow">${esc(label)}</span>
    ${meta ? `<span class="n">${esc(meta)}</span>` : ''}
  </div>`;
}

/** Restart a CSS-driven demo: force reflow so the transition replays. */
function playOnce(stage, holdMs) {
  clearTimeout(stage._t);
  stage.dataset.play = '0';
  void stage.offsetWidth;
  stage.dataset.play = '1';
  if (holdMs) stage._t = setTimeout(() => { stage.dataset.play = '0'; }, holdMs);
}
const isReduced = () => html.dataset.motion === 'reduced';

/* ---- the nine motions ---- */
const MOTIONS = [

  /* 1 ------------------------------------------------ navigation open/close */
  {
    n: '01', title: 'פתיחה וסגירה של הניווט',
    stage: () => `
      <div class="d-nav">
        <div class="d-nav__rail">
          ${['panelLeft','wrench','boxes','bookOpen'].map(i =>
            `<span class="d-nav__railbtn">${icon(i, 15)}</span>`).join('')}
        </div>
        <div></div>
        <div class="d-nav__scrim"></div>
        <div class="d-nav__panel mini">
          <div class="mini-title">${esc(NEO.navGroups[0].he)}</div>
          ${NEO.navGroups[0].items.map((t, i) => miniRow(NAV_ICONS[i], t, '')).join('')}
        </div>
      </div>`,
    run: (s) => playOnce(s, 1900),
    readout: 'סגור → פתוח → סגור',
    spec: {
      trigger: 'לחיצה על מתג הניווט, או <span class="kbd">⌘</span> <span class="kbd">\\</span>',
      from: 'הפאנל ב־<span class="sap">translateX(--ds-flip × -110%) scale(.97)</span>, אטימות 0. המסך המעומעם ב־0.',
      to: 'הפאנל ב־<span class="sap">none</span>, אטימות 1. הפריטים נכנסים במדרג של 30ms.',
      dur: '--dur-panel (280ms) לפאנל · --dur-fast (120ms) לאטימות',
      ease: '--ease-spring — הקפיצה הקלה היא החתימה של המוצר',
      why: 'הפאנל מגיע מקצה ה־inline-start ולכן מרגיש כמו הרחבה של הסרגל, לא כמו חלון חדש.',
    },
  },

  /* 2 ------------------------------------------------------ group expansion */
  {
    n: '02', title: 'פתיחת קבוצה — בלי לאפס גלילה',
    stage: () => `
      <div class="d-grp">
        <div class="d-grp__scroll" data-scroll>
          <button class="d-grp__btn" type="button" aria-expanded="true" data-grp>
            ${icon('chevronDown', 13, 'chev')}
            <span class="grow">${esc(REF_GROUP.he)}</span>
            <span class="n">${REF_GROUP.items.length}</span>
          </button>
          <div class="d-grp__items"><div>
            ${REF_GROUP.items.map((t, i) => miniRow(NAV_ICONS[i + 3] || 'table', t, '')).join('')}
          </div></div>
          <div class="mini-title">${esc(NEO.navGroups[3].he)}</div>
          ${NEO.navGroups[3].items.map(t => miniRow('graduationCap', t, '')).join('')}
        </div>
      </div>`,
    run: (s) => {
      const btn = $('[data-grp]', s), sc = $('[data-scroll]', s), out = $('[data-readout]', s.parentElement);
      const keep = sc.scrollTop;
      btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      sc.scrollTop = keep;                       /* the whole point of the motion */
      if (out) out.textContent = `scrollTop ${Math.round(keep)}px → ${Math.round(sc.scrollTop)}px`;
    },
    readout: 'גלול ואז הרץ — scrollTop לא זז',
    spec: {
      trigger: 'לחיצה על כותרת הקבוצה (<span class="sap">aria-expanded</span>)',
      from: '<span class="sap">grid-template-rows: 1fr</span> — הקבוצה פתוחה',
      to: '<span class="sap">grid-template-rows: 0fr</span> — גובה נמדד, בלי <span class="sap">height</span> קבוע',
      dur: '--dur-panel (280ms)',
      ease: '--ease-emphasis',
      why: 'הגובה מונפש מבלי למדוד ב־JS, ומיקום הגלילה נשמר במפורש כדי שהפריט שהמשתמש הביט בו יישאר במקום.',
    },
  },

  /* 3 ------------------------------------------- active indicator movement */
  {
    n: '03', title: 'תנועת סמן הפריט הפעיל',
    stage: () => {
      const items = [...NEO.navGroups[0].items, NEO.navGroups[1].items[0]];
      return `
      <div class="d-ind mini">
        <span class="d-ind__marker" style="--i:0"></span>
        <div class="d-ind__list">
          ${items.map((t, i) => miniRow(NAV_ICONS[i], t, '', `aria-current="${i === 0 ? 'true' : 'false'}" data-ind="${i}"`)).join('')}
        </div>
      </div>`;
    },
    run: (s) => {
      const rows = $$('[data-ind]', s), mk = $('.d-ind__marker', s);
      const cur = rows.findIndex(r => r.getAttribute('aria-current') === 'true');
      const next = (cur + 1) % rows.length;
      rows.forEach((r, i) => r.setAttribute('aria-current', String(i === next)));
      mk.style.setProperty('--i', next);
      const out = $('[data-readout]', s.parentElement);
      if (out) out.textContent = `translateY(${next} × 2rem)`;
    },
    readout: 'translateY(0 × 2rem)',
    spec: {
      trigger: 'שינוי הפריט הפעיל — ניווט, חיפוש או חזרה בהיסטוריה',
      from: 'הסמן ב־<span class="sap">translateY(i × 2rem)</span> של הפריט הקודם',
      to: '<span class="sap">translateY(i × 2rem)</span> של הפריט החדש',
      dur: '--dur-base (220ms)',
      ease: '--ease-spring',
      why: 'אלמנט אחד שנע, ולא החלפת רקע בין שני פריטים. העין עוקבת אחרי הסמן ולומדת את מבנה הניווט.',
    },
  },

  /* 4 ---------------------------------------- module transition (travel) */
  {
    n: '04', title: 'מעבר מודול — נסיעת אלמנט משותף',
    stage: () => `
      <div class="d-travel">
        <div class="d-travel__hero" data-hero>
          <span class="tile__c">${esc(PM.code)}</span>
          <span class="grow">
            <b style="font-size:var(--t-sm)">${esc(PM.he)}</b>
            <span class="tile__he" style="display:block">${esc(PM.en)}</span>
          </span>
          <span class="badge">${PM.tables} tables</span>
        </div>
        <div class="d-travel__tiles">
          ${[PM, PP].map((m, i) => `
            <button class="tile" type="button" data-tile="${i}" style="--m:var(--ink-3)">
              <span class="tile__c">${esc(m.code)}</span>
              <span class="tile__he">${esc(m.he)}</span>
              <span class="n tok"><b>${m.tables}</b> tables · <b>${m.fields}</b> fields</span>
            </button>`).join('')}
        </div>
      </div>`,
    run: (s) => {
      const tile = $('[data-tile="0"]', s), hero = $('[data-hero]', s);
      const out = $('[data-readout]', s.parentElement);
      s.dataset.play = '0';
      $$('.ghost', s).forEach(g => g.remove());
      if (isReduced()) {                          /* no travel — cross-fade only */
        s.dataset.play = '1';
        if (out) out.textContent = 'תנועה מופחתת — ללא נסיעה, הצלבה בלבד';
        setTimeout(() => { s.dataset.play = '0'; }, 1400);
        return;
      }
      const box = s.getBoundingClientRect();
      const a = tile.getBoundingClientRect(), b = hero.getBoundingClientRect();
      const g = tile.cloneNode(true);
      g.classList.add('ghost');
      g.style.inlineSize = a.width + 'px';
      g.style.blockSize = a.height + 'px';
      g.style.transform = `translate(${a.left - box.left}px, ${a.top - box.top}px)`;
      s.appendChild(g);
      tile.style.opacity = '0';
      if (out) out.textContent = `FLIP · Δx ${Math.round(b.left - a.left)}px · Δy ${Math.round(b.top - a.top)}px`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        g.classList.add('is-moving');
        g.style.transform =
          `translate(${b.left - box.left}px, ${b.top - box.top}px) scale(${b.width / a.width}, ${b.height / a.height})`;
        g.style.opacity = '0';
        s.dataset.play = '1';
      }));
      const end = () => { g.remove(); tile.style.opacity = ''; s.dataset.play = '0'; };
      g.addEventListener('transitionend', e => { if (e.propertyName === 'transform') setTimeout(end, 700); }, { once: true });
      setTimeout(end, 2000);                      /* safety net — reduced motion kills transitionend */
    },
    readout: 'לחץ הרץ מחדש',
    spec: {
      trigger: 'בחירת מודול מלוח ההפעלה',
      from: 'מלבן האריח הנמדד — <span class="sap">translate(x,y)</span> בקנה מידה 1',
      to: 'מלבן הכותרת הנמדד — <span class="sap">translate + scale</span>, ואז אטימות 0 כשהיעד נכנס',
      dur: '--dur-route (420ms)',
      ease: '--ease-emphasis',
      why: 'האובייקט שהמשתמש בחר הוא זה שנוסע. אין «טעינת מסך» — יש המשכיות.',
    },
  },

  /* 5 ------------------------------------------------- hover preview */
  {
    n: '05', title: 'הופעת תצוגה מקדימה בריחוף',
    stage: () => `
      <div class="d-prev">
        <div class="mini" style="inline-size:8rem">
          <div class="mini-title">${esc(NEO.navGroups[1].he)}</div>
          ${miniRow('table', NEO.navGroups[1].items[0], '', 'class="mini-row d-prev__anchor"')}
          ${miniRow('terminal', NEO.navGroups[1].items[1], '')}
          ${miniRow('plug', NEO.navGroups[1].items[2], '')}
        </div>
        <div class="d-prev__panel">
          <div class="hd">
            <b>${esc(EQUI.name)}</b>
            <span>${esc(EQUI.he)}</span>
          </div>
          <div class="d-prev__stats">
            <div><b>${EQUI.fields}</b><span>שדות</span></div>
            <div><b>2</b><span>קשרים</span></div>
            <div><b>5</b><span>tcodes</span></div>
          </div>
        </div>
      </div>`,
    run: (s) => {
      clearTimeout(s._t); clearTimeout(s._d);
      s.dataset.play = '0';
      const out = $('[data-readout]', s.parentElement);
      if (out) out.textContent = 'השהיית כוונה 420ms…';
      s._d = setTimeout(() => {
        s.dataset.play = '1';
        if (out) out.textContent = 'מוצג — 420ms השהייה + 220ms כניסה';
        s._t = setTimeout(() => { s.dataset.play = '0'; }, 1900);
      }, 420);
    },
    readout: 'ריחוף מדומה',
    spec: {
      trigger: 'ריחוף מעל פריט ניווט, אחרי 420ms של כוונה יציבה',
      from: '<span class="sap">opacity 0</span> · <span class="sap">translateX(--ds-flip × -8px)</span>',
      to: '<span class="sap">opacity 1</span> · <span class="sap">translateX(0)</span>',
      dur: '420ms השהייה, ואז 120ms אטימות / 220ms הזזה',
      ease: '--ease-out-expo',
      why: 'ההשהייה מונעת «הבהוב» כשמעבירים עכבר על הרשימה. הכניסה מכיוון הפריט קושרת בין הפאנל למקור.',
    },
  },

  /* 6 --------------------------------------------- search / command open */
  {
    n: '06', title: 'פתיחת חיפוש / פקודה',
    stage: () => `
      <div class="d-cmd">
        <div class="mini" style="opacity:.7">
          ${miniRow('home', 'בית', '')}
          ${miniRow('table', NEO.navGroups[1].items[0], String(PM.tables))}
        </div>
        <div class="d-cmd__scrim"></div>
        <div class="d-cmd__box">
          <div class="d-cmd__field">
            ${icon('search', 15)}
            <span class="q">MA</span><span class="caret"></span>
            <span class="kbd">Esc</span>
          </div>
          <div class="d-res">
            ${['MARA','MARC','MAPL'].map((id, i) => {
              const t = NEO.ppTables.find(x => x.name === id);
              return `<div class="mini-row"><span class="id">${esc(id)}</span><span class="grow">${esc(t.he)}</span></div>`;
            }).join('')}
          </div>
        </div>
      </div>`,
    run: (s) => playOnce(s, 2200),
    readout: '⌘K',
    spec: {
      trigger: '<span class="kbd">⌘</span> <span class="kbd">K</span> מכל מקום, או לחיצה על מפעיל החיפוש',
      from: 'המסך המעומעם 0 · הדיאלוג <span class="sap">translateY(-8px) scale(.985)</span>, אטימות 0',
      to: 'המסך המעומעם 1 · הדיאלוג <span class="sap">none</span>, אטימות 1. המיקוד עובר לשדה.',
      dur: '--dur-panel (280ms) לתיבה · --dur-base (220ms) למסך המעומעם',
      ease: '--ease-out-expo — כניסה מהירה, עצירה רכה',
      why: 'התיבה יורדת מעט כלפי מטה כדי לא להיראות כמו קפיצה. אין scale גדול — זה כלי, לא אירוע.',
    },
  },

  /* 7 --------------------------------------------- search result selection */
  {
    n: '07', title: 'בחירת תוצאת חיפוש',
    stage: () => `
      <div class="d-cmd" data-cmd>
        <div class="d-cmd__dest">
          <b style="font-size:var(--t-sm)"><span class="sap">MAPL</span></b>
          <span class="tile__he">${esc(NEO.ppTables.find(t => t.name === 'MAPL').he)}</span>
          <span class="tok">${esc(NEO.ppTables.find(t => t.name === 'MAPL').tcodes)}</span>
        </div>
        <div class="d-cmd__scrim"></div>
        <div class="d-cmd__box">
          <div class="d-cmd__field">${icon('search', 15)}<span class="q">MA</span><span class="caret"></span></div>
          <div class="d-res">
            <span class="d-res__bar" style="--i:0"></span>
            ${['MARA','MARC','MAPL'].map((id, i) => {
              const t = NEO.ppTables.find(x => x.name === id);
              return `<div class="mini-row" role="option" aria-selected="${i === 0}" data-res="${i}">
                <span class="id">${esc(id)}</span><span class="grow">${esc(t.he)}</span>
                ${i === 2 ? `<span class="n">${icon('cornerDown', 12, 'flip-x')}</span>` : ''}
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>`,
    run: (s) => {
      const rows = $$('[data-res]', s), bar = $('.d-res__bar', s), box = $('.d-cmd__box', s);
      const wrap = $('[data-cmd]', s), out = $('[data-readout]', s.parentElement);
      clearTimeout(s._t); [s._a, s._b, s._c].forEach(clearTimeout);
      s.dataset.play = '1'; wrap.classList.remove('is-commit'); box.classList.remove('is-commit');
      const sel = (i) => {
        rows.forEach((r, j) => r.setAttribute('aria-selected', String(i === j)));
        bar.style.setProperty('--i', i);
        if (out) out.textContent = `aria-activedescendant → ${rows[i].querySelector('.id').textContent}`;
      };
      sel(0);
      s._a = setTimeout(() => sel(1), 420);
      s._b = setTimeout(() => sel(2), 840);
      s._c = setTimeout(() => {
        box.classList.add('is-commit'); wrap.classList.add('is-commit');
        if (out) out.textContent = 'Enter — הדיאלוג מתקפל, היעד נשאר';
      }, 1400);
      s._t = setTimeout(() => {
        s.dataset.play = '0'; wrap.classList.remove('is-commit'); box.classList.remove('is-commit'); sel(0);
      }, 3000);
    },
    readout: 'חצים ואז Enter',
    spec: {
      trigger: '<span class="kbd">↑</span> <span class="kbd">↓</span> לניווט, <span class="kbd">Enter</span> לבחירה',
      from: 'פס הבחירה ב־<span class="sap">translateY(i × 2rem)</span> של השורה הקודמת',
      to: 'הפס בשורה החדשה, ואז בבחירה: הדיאלוג ל־<span class="sap">scale(.97)</span> ואטימות 0',
      dur: '--dur-fast (120ms) לפס · --dur-base (220ms) לסגירה',
      ease: '--ease-out-expo',
      why: 'הפס נע מיידית כי הוא עוקב אחרי הקלדה. הסגירה איטית יותר כדי שהיעד שמאחוריה יספיק להיקרא.',
    },
  },

  /* 8 --------------------------------------------------- bottom sheet */
  {
    n: '08', title: 'פתיחת גיליון תחתון במובייל',
    stage: () => `
      <div class="d-sheet">
        <div class="d-sheet__phone">
          <div class="mini" style="border:0">
            ${miniRow('wrench', PM.he + ' · ' + PM.code, String(PM.tables))}
            ${miniRow('boxes', PP.he + ' · ' + PP.code, String(PP.tables))}
            ${miniRow('table', NEO.navGroups[1].items[0], '')}
          </div>
          <div class="d-sheet__scrim"></div>
          <div class="d-sheet__panel">
            <div class="d-sheet__grab"></div>
            <div style="font-family:var(--font-mono);font-size:var(--t-sm);font-weight:700;direction:ltr;unicode-bidi:isolate;text-align:end">${esc(EQUI.name)}</div>
            <div style="font-size:var(--t-micro);color:var(--ink-3)">${esc(EQUI.he)}</div>
            <div style="margin-block-start:var(--sp-2)"><span class="badge">${esc(EQUI.fiori)}</span></div>
          </div>
        </div>
      </div>`,
    run: (s) => playOnce(s, 2200),
    readout: 'הקשה על אובייקט',
    spec: {
      trigger: 'הקשה על שורת אובייקט, או גרירה כלפי מעלה מהקצה התחתון',
      from: '<span class="sap">translateY(100%)</span> · המסך המעומעם 0',
      to: '<span class="sap">translateY(0)</span> · המסך המעומעם 1',
      dur: '--dur-panel (280ms)',
      ease: '--ease-emphasis — יציאה מהירה, נחיתה שקטה, בלי קפיצה',
      why: 'הגיליון לא מנפיש <span class="sap">block-size</span> אלא מחליק כיחידה אחת, כך שהתוכן שבתוכו לא מתפרק בזמן התנועה.',
    },
  },

  /* 9 ------------------------------------------------- context transition */
  {
    n: '09', title: 'החלפת הקשר — ממודול למודול',
    stage: () => `
      <div class="d-ctx">
        <div class="d-ctx__bar">
          <span class="d-ctx__tab" aria-selected="true" data-ctx="0">${esc(PM.code)}</span>
          <span class="d-ctx__tab" aria-selected="false" data-ctx="1">${esc(PP.code)}</span>
        </div>
        <div class="d-ctx__view">
          ${[PM, PP].map((m, i) => `
            <div class="d-ctx__pane" data-on="${i === 0}" data-pane="${i}" style="--m:var(--ink-2)">
              <span class="accent"></span>
              <span class="ttl">${esc(m.he)} · <span class="sap">${esc(m.code)}</span></span>
              <span class="tile__he">${esc(m.en)}</span>
              <span class="tok"><b>${m.topics}</b> נושאים · <b>${m.tables}</b> טבלאות · <b>${m.fields}</b> שדות · <b>${m.funcs}</b> פונקציות</span>
            </div>`).join('')}
        </div>
      </div>`,
    run: (s) => {
      const tabs = $$('[data-ctx]', s), panes = $$('[data-pane]', s);
      const cur = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
      const next = (cur + 1) % tabs.length;
      tabs.forEach((t, i) => t.setAttribute('aria-selected', String(i === next)));
      panes.forEach((p, i) => p.setAttribute('data-on', String(i === next)));
      const out = $('[data-readout]', s.parentElement);
      if (out) out.textContent = `${tabs[cur].textContent} → ${tabs[next].textContent}`;
    },
    readout: 'PM → PP-PI',
    spec: {
      trigger: 'החלפת מודול מהניווט, מהחיפוש או מפירורי הלחם',
      from: 'ההקשר היוצא: אטימות 1 · <span class="sap">translateX(0)</span>',
      to: 'ההקשר הנכנס: אטימות 1 · <span class="sap">translateX(0)</span>; היוצא ל־<span class="sap">translateX(--ds-flip × -10px)</span>',
      dur: '--dur-base (220ms)',
      ease: '--ease-emphasis',
      why: 'הזזה קטנה בציר ה־inline מספרת «החלפת מקום», ולא «טענתי מסך». המרחק קטן בכוונה — 10px, לא 40.',
    },
  },
];

$('#motion').innerHTML = MOTIONS.map(m => `
  <figure class="mo" data-motion-id="${m.n}">
    <figcaption class="mo__h">
      <span class="mo__n">${m.n}</span>
      <span class="mo__t">${m.title}</span>
      <span class="grow"></span>
      <button class="replay" type="button" data-replay aria-label="הרץ מחדש: ${esc(m.title)}">
        ${icon('history', 13)}<span>הרץ מחדש</span>
      </button>
    </figcaption>
    <div class="mo__body">
      <div class="mo__left">
        <div class="stage" data-play="0">${m.stage()}</div>
        <div class="stage__foot">
          <span>מצב</span>
          <span class="readout" data-readout>${m.readout}</span>
          <span class="grow"></span>
          <span>transform · opacity בלבד</span>
        </div>
      </div>
      <div class="mo__right">
        <dl class="spec">
          <div class="specrow"><dt>טריגר</dt><dd>${m.spec.trigger}</dd></div>
          <div class="specrow"><dt>מצב פתיחה</dt><dd>${m.spec.from}</dd></div>
          <div class="specrow"><dt>מצב סיום</dt><dd>${m.spec.to}</dd></div>
          <div class="specrow"><dt>משך</dt><dd>${m.spec.dur}</dd></div>
          <div class="specrow"><dt>האטה</dt><dd>${m.spec.ease}</dd></div>
          <div class="specrow"><dt>מטרה</dt><dd>${m.spec.why}</dd></div>
        </dl>
      </div>
    </div>
  </figure>`).join('');

$$('[data-motion-id]').forEach(fig => {
  const m = MOTIONS.find(x => x.n === fig.dataset.motionId);
  const stage = $('.stage', fig);
  $('[data-replay]', fig).addEventListener('click', () => m.run(stage));
  if (m.n === '02') $('[data-grp]', stage).addEventListener('click', (e) => { e.preventDefault(); m.run(stage); });
  if (m.n === '03') $$('[data-ind]', stage).forEach((r, i) => r.addEventListener('click', () => {
    $$('[data-ind]', stage).forEach((x, j) => x.setAttribute('aria-current', String(i === j)));
    $('.d-ind__marker', stage).style.setProperty('--i', i);
  }));
  if (m.n === '09') $$('[data-ctx]', stage).forEach(() => {});
});

/* =============================================== 6. §3 — COMPONENT FAMILY */

/** One component block: a title, a one-line rule, and a grid of forced states. */
function cmp(title, desc, cells) {
  return `
    <div class="cmp">
      <div class="cmp__h"><b>${title}</b><span class="desc">${desc}</span></div>
      <div class="states">
        ${cells.map(c => `
          <div class="statecell">
            <span class="statecell__l">${esc(c.l)}</span>
            <div class="statecell__d">${c.html}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

const T_AUFK = NEO.pmTables.find(t => t.name === 'AUFK');
const T_PLKO = NEO.ppTables.find(t => t.name === 'PLKO');
const T_QMEL = NEO.pmTables.find(t => t.name === 'QMEL');

const navItem = (extra = '', cur = false) => `
  <div class="mini" style="inline-size:100%">
    <div class="mini-row ${extra}" ${cur ? 'aria-current="true" style="color:var(--ink-1);font-weight:700;background:var(--ds-hover)"' : ''}>
      ${icon('table', 14)}<span class="grow">${esc(NEO.navGroups[1].items[0])}</span>
      <span class="n">${PM.tables}</span>
      ${cur ? '<span style="position:absolute;inset-block:6px;inset-inline-start:0;inline-size:2px;background:var(--brand);border-radius:var(--r-pill)"></span>' : ''}
    </div>
  </div>`;

const resultRow = (state) => {
  const sel = state === 'selected';
  return `<div class="mini" style="inline-size:100%"><div class="mini-row ${state === 'hover' ? 'is-hover' : ''}"
    ${sel ? 'aria-selected="true" style="background:var(--sel-bg);color:var(--ink-1)"' : ''}>
    ${sel ? '<span style="position:absolute;inset-block:0;inset-inline-start:0;inline-size:2px;background:var(--brand)"></span>' : ''}
    <span class="sap" style="font-weight:700">${state === 'match' ? '<mark style="background:none;color:var(--brand);font-weight:700">EQ</mark>UI' : 'EQUI'}</span>
    <span class="grow">${esc(EQUI.he)}</span>
    <span class="n">${EQUI.fields}</span>
  </div></div>`;
};

$('#components').innerHTML = [

  cmp('מעטפת ניווט', 'מצומצם 4.5rem · מורחב 17rem — <span class="sap">--rail-compact / --rail-expanded</span>', [
    { l: 'compact', html: `<div class="mini" style="inline-size:2.75rem">
        ${['wrench','boxes','table','search'].map(i => `<div class="mini-row" style="justify-content:center;padding:0">${icon(i, 15)}</div>`).join('')}
      </div>` },
    { l: 'expanded', html: `<div class="mini" style="inline-size:100%">
        ${['wrench','boxes','table'].map((ic, i) => miniRow(ic, NEO.navGroups[0].items[i] || NEO.navGroups[1].items[0], '')).join('')}
      </div>` },
    { l: 'overlay', html: `<div class="mini" style="inline-size:100%;box-shadow:var(--elev-3);border-radius:var(--r-md)">
        ${miniRow('wrench', NEO.navGroups[0].items[0], String(PM.tables))}
        ${miniRow('boxes', NEO.navGroups[0].items[1], String(PP.tables))}
      </div>` },
  ]),

  cmp('פריט ניווט', 'גובה שורה קבוע · הסמן הוא פס 2px, לא החלפת רקע', [
    { l: 'default', html: navItem() },
    { l: 'hover', html: navItem('is-hover') },
    { l: 'pressed', html: navItem('is-press') },
    { l: 'aria-current', html: navItem('', true) },
    { l: 'focus-visible', html: navItem('is-focus') },
    { l: 'disabled', html: navItem('is-disabled') },
  ]),

  cmp('קבוצת ניווט', 'כותרת דביקה · <span class="sap">aria-expanded</span> · הצ׳ברון מסתובב לכיוון ה־inline-start', [
    { l: 'expanded', html: `<div class="mini" style="inline-size:100%">
        <button class="d-grp__btn" type="button" aria-expanded="true" style="pointer-events:none">
          ${icon('chevronDown', 13, 'chev')}<span class="grow">${esc(NEO.navGroups[2].he)}</span><span class="n">2</span>
        </button>
        ${NEO.navGroups[2].items.map(t => miniRow('bookOpen', t, '')).join('')}
      </div>` },
    { l: 'collapsed', html: `<div class="mini" style="inline-size:100%">
        <button class="d-grp__btn" type="button" aria-expanded="false" style="pointer-events:none">
          ${icon('chevronDown', 13, 'chev')}<span class="grow">${esc(NEO.navGroups[2].he)}</span><span class="n">2</span>
        </button>
      </div>` },
  ]),

  cmp('פריט מודול', 'קוד המודול במונו · פס זהות בקצה ה־inline-start', [
    { l: 'default', html: `<button class="tile" type="button" style="--m:var(--ink-3);inline-size:100%">
        <span class="tile__c">${esc(PM.code)}</span><span class="tile__he">${esc(PM.he)}</span></button>` },
    { l: 'hover', html: `<button class="tile is-hover" type="button" style="--m:var(--ink-1);inline-size:100%">
        <span class="tile__c">${esc(PM.code)}</span><span class="tile__he">${esc(PM.he)}</span></button>` },
    { l: 'selected', html: `<button class="tile" type="button" style="--m:var(--brand);inline-size:100%;background:var(--surface-2)">
        <span class="tile__c">${esc(PP.code)}</span><span class="tile__he">${esc(PP.he)}</span></button>` },
  ]),

  cmp('סמן פעיל', 'אלמנט אחד שנע — 2px · <span class="sap">--sel-bar</span>', [
    { l: 'at rest', html: `<div class="d-ind mini" style="inline-size:100%"><span class="d-ind__marker" style="--i:0"></span>
        <div class="d-ind__list">${miniRow('table', NEO.navGroups[1].items[0], '')}${miniRow('terminal', NEO.navGroups[1].items[1], '')}</div></div>` },
    { l: 'moved', html: `<div class="d-ind mini" style="inline-size:100%"><span class="d-ind__marker" style="--i:1"></span>
        <div class="d-ind__list">${miniRow('table', NEO.navGroups[1].items[0], '')}${miniRow('terminal', NEO.navGroups[1].items[1], '')}</div></div>` },
    { l: 'hidden (off-route)', html: `<div class="d-ind mini" style="inline-size:100%"><span class="d-ind__marker" style="--i:0;opacity:0"></span>
        <div class="d-ind__list">${miniRow('table', NEO.navGroups[1].items[0], '')}${miniRow('terminal', NEO.navGroups[1].items[1], '')}</div></div>` },
  ]),

  cmp('תקציר מודול', 'ארבע מידות תמיד — נושאים / טבלאות / שדות / פונקציות', [
    { l: 'default', html: `<div class="card"><div class="card__b" style="padding:var(--sp-3)">
        <div style="display:flex;gap:var(--sp-2);align-items:baseline"><b class="sap" style="font-size:var(--t-h2);font-weight:800">${esc(PM.code)}</b><span style="font-size:var(--t-xs)">${esc(PM.he)}</span></div>
        <div class="tok" style="margin-block-start:6px"><b>${PM.topics}</b> · <b>${PM.tables}</b> · <b>${PM.fields}</b> · <b>${PM.funcs}</b></div>
      </div></div>` },
    { l: 'loading', html: `<div class="card"><div class="card__b" style="padding:var(--sp-3);display:grid;gap:6px">
        <span class="skel" style="inline-size:45%"></span><span class="skel" style="inline-size:80%"></span><span class="skel" style="inline-size:60%"></span>
      </div></div>` },
    { l: 'empty', html: `<div class="card"><div class="empty">${icon('layers', 20)}<b>אין נתונים למודול</b><span>הרץ את סקריפט החילוץ</span></div></div>` },
  ]),

  cmp('פאנל הקשר', 'ניווט משני בתוך אובייקט — מקטעי הפורטל האמיתיים', [
    { l: 'default', html: `<div class="mini" style="inline-size:100%">
        ${NEO.portalSections.slice(0, 4).map((s, i) => `<div class="mini-row" ${i === 1 ? 'style="color:var(--ink-1);font-weight:700;background:var(--ds-hover)"' : ''}>
          <span class="n">${String(i + 1).padStart(2, '0')}</span><span class="grow">${esc(s)}</span></div>`).join('')}
      </div>` },
    { l: 'scrolled / sticky', html: `<div class="mini" style="inline-size:100%">
        <div class="mini-title" style="background:var(--surface-2);border-block-end:1px solid var(--hairline)">${esc(EQUI.name)}</div>
        ${NEO.portalSections.slice(4, 7).map((s, i) => `<div class="mini-row"><span class="n">${String(i + 5).padStart(2, '0')}</span><span class="grow">${esc(s)}</span></div>`).join('')}
      </div>` },
  ]),

  cmp('תצוגה מקדימה בריחוף', 'כותרת + שלוש מידות + מקור — לעולם לא יותר', [
    { l: 'default', html: `<div class="d-prev__panel" style="position:static;opacity:1;transform:none;inline-size:100%">
        <div class="hd"><b>${esc(T_PLKO.name)}</b><span>${esc(T_PLKO.he)}</span></div>
        <div class="d-prev__stats"><div><b>${T_PLKO.fields}</b><span>שדות</span></div><div><b>4</b><span>tcodes</span></div><div><b>1</b><span>Fiori</span></div></div>
      </div>` },
    { l: 'empty', html: `<div class="d-prev__panel" style="position:static;opacity:1;transform:none;inline-size:100%">
        <div class="empty" style="padding:var(--sp-4)">${icon('search', 18)}<b>אין תצוגה מקדימה</b><span>האובייקט לא נטען מהמאגר</span></div>
      </div>` },
  ]),

  cmp('מפעיל חיפוש', 'תמיד מציג את הקיצור — הקיצור הוא חלק מהלימוד', [
    { l: 'default', html: `<span class="searchtrig">${icon('search', 15)}<span class="ph">חפש טבלה, tcode, BAPI…</span><span class="kbd">⌘K</span></span>` },
    { l: 'hover', html: `<span class="searchtrig is-hover">${icon('search', 15)}<span class="ph">חפש טבלה, tcode, BAPI…</span><span class="kbd">⌘K</span></span>` },
    { l: 'focus-visible', html: `<span class="searchtrig is-focus">${icon('search', 15)}<span class="ph">חפש טבלה, tcode, BAPI…</span><span class="kbd">⌘K</span></span>` },
  ]),

  cmp('דיאלוג חיפוש', 'שדה השאילתה LTR ומונו · המיקוד נישא בקו־שיער מותג, לא בטבעת מסביב לכותרת', [
    { l: 'idle', html: `<div class="card"><div class="d-cmd__field" style="border-block-end:1px solid var(--hairline)">${icon('search', 15)}<span class="q" style="color:var(--ink-3)">חפש…</span><span class="kbd">Esc</span></div></div>` },
    { l: 'typing + focus', html: `<div class="card"><div class="d-cmd__field" style="border-block-end:1px solid var(--brand)">${icon('search', 15)}<span class="q">EQUI</span><span class="caret"></span><span class="kbd">Esc</span></div></div>` },
    { l: 'no results', html: `<div class="card"><div class="d-cmd__field" style="border-block-end:1px solid var(--hairline)">${icon('search', 15)}<span class="q">ZZTOP</span></div>
        <div class="empty" style="padding:var(--sp-4)">${icon('search', 18)}<b>אין תוצאות</b><span>נסה שם טבלה או קוד טרנזקציה</span></div></div>` },
  ]),

  cmp('תוצאת חיפוש', 'מזהה מונו LTR · תיאור עברי · מונה שדות', [
    { l: 'default', html: resultRow('default') },
    { l: 'hover', html: resultRow('hover') },
    { l: 'aria-selected', html: resultRow('selected') },
    { l: 'match highlight', html: resultRow('match') },
  ]),

  cmp('פריט אחרון', 'זמן יחסי במונו — <span class="sap">tabular-nums</span> כדי שהעמודה לא תרקוד', [
    { l: 'default', html: `<div class="mini" style="inline-size:100%">
        <div class="mini-row">${icon('clock', 14)}<span class="sap" style="font-weight:700">${esc(T_AUFK.name)}</span><span class="grow">${esc(T_AUFK.he)}</span><span class="n">12:04</span></div>
        <div class="mini-row">${icon('clock', 14)}<span class="sap" style="font-weight:700">${esc(T_QMEL.name)}</span><span class="grow">${esc(T_QMEL.he)}</span><span class="n">11:58</span></div>
      </div>` },
    { l: 'empty', html: `<div class="mini" style="inline-size:100%"><div class="empty">${icon('history', 18)}<b>אין היסטוריה</b><span>פריטים שתפתח יופיעו כאן</span></div></div>` },
  ]),

  cmp('פריט מוצמד', 'הצמדה היא פעולה מפורשת — אייקון <span class="sap">pin</span> ולא כוכבית', [
    { l: 'default', html: `<div class="mini" style="inline-size:100%"><div class="mini-row">${icon('pin', 14)}<span class="sap" style="font-weight:700">${esc(EQUI.name)}</span><span class="grow">${esc(EQUI.he)}</span></div></div>` },
    { l: 'hover (unpin)', html: `<div class="mini" style="inline-size:100%"><div class="mini-row is-hover">${icon('pin', 14)}<span class="sap" style="font-weight:700">${esc(EQUI.name)}</span><span class="grow">${esc(EQUI.he)}</span><span class="n">${icon('x', 12)}</span></div></div>` },
    { l: 'empty', html: `<div class="mini" style="inline-size:100%"><div class="empty">${icon('pin', 18)}<b>אין פריטים מוצמדים</b><span>הצמד טבלה כדי לגשת אליה מיד</span></div></div>` },
  ]),

  cmp('פירורי לחם', 'המפריד הוא צ׳ברון שמצביע לכיוון הקריאה — משתקף אוטומטית', [
    { l: 'default', html: `<span class="crumbs"><a href="#sec-components">בית</a><span class="sep flip-x">${icon('chevronRight', 12)}</span>
        <a href="#sec-components">${esc(PM.he)}</a><span class="sep flip-x">${icon('chevronRight', 12)}</span>
        <span class="cur sap">${esc(EQUI.name)}</span></span>` },
    { l: 'truncated', html: `<span class="crumbs"><a href="#sec-components">בית</a><span class="sep flip-x">${icon('chevronRight', 12)}</span>
        <span>…</span><span class="sep flip-x">${icon('chevronRight', 12)}</span>
        <span class="cur sap">${esc(T_PLKO.name)}</span></span>` },
  ]),

  cmp('Tooltip', 'תמיד לצד הקצה ה־inline-end של הסרגל המצומצם', [
    { l: 'default', html: `<span class="tip-spec">${esc(NEO.navGroups[1].items[0])}<span class="n" style="opacity:.65">${PM.tables}</span></span>` },
    { l: 'with shortcut', html: `<span class="tip-spec">חיפוש <span class="kbd" style="border-color:transparent;background:rgba(255,255,255,.16);color:inherit">⌘K</span></span>` },
  ]),

  cmp('תג', 'מונו + LTR תמיד — התוכן הוא מזהה SAP או מספר', [
    { l: 'neutral', html: `<span class="badge">${esc(EQUI.fiori)}</span>` },
    { l: 'brand', html: `<span class="badge badge--brand">S/4 note</span>` },
    { l: 'status', html: STATUS.slice(1, 4).map(s => `<span class="badge badge--status" style="--c:var(${s.k})"><i></i>${esc(s.he)}</span>`).join(' ') },
    { l: 'count', html: `<span class="badge">${PP.fields} fields</span> <span class="badge">${PP.tables} tables</span>` },
  ]),

  cmp('קיצור מקלדת', 'אלמנט <span class="sap">&lt;kbd&gt;</span> אמיתי — לא span מעוצב', [
    { l: 'single', html: `<span class="kbd">Esc</span> <span class="kbd">Enter</span> <span class="kbd">↑</span> <span class="kbd">↓</span>` },
    { l: 'combo', html: `<span class="kbd">⌘</span> <span class="kbd">K</span> &nbsp; <span class="kbd">⌘</span> <span class="kbd">\\</span>` },
  ]),

  cmp('ניווט מובייל', 'ארבעה יעדים · יעד 3.25rem — מעל סף ה־44px', [
    { l: 'default', html: `<div class="mobnav-spec">
        <a href="#sec-components" aria-current="page">${icon('home', 17)}<span>בית</span></a>
        <a href="#sec-components">${icon('wrench', 17)}<span>${esc(PM.code)}</span></a>
        <a href="#sec-components">${icon('search', 17)}<span>חיפוש</span></a>
        <a href="#sec-components">${icon('sparkles', 17)}<span>NEO</span></a>
      </div>` },
  ]),

  cmp('גיליון תחתון', 'ידית גרירה + כותרת אובייקט · נסגר ב־Esc וב־swipe', [
    { l: 'default', html: `<div class="card" style="border-start-start-radius:var(--r-lg);border-start-end-radius:var(--r-lg)">
        <div class="card__b" style="padding:var(--sp-3)">
          <div class="d-sheet__grab"></div>
          <div class="sap" style="font-weight:700">${esc(T_QMEL.name)}</div>
          <div style="font-size:var(--t-micro);color:var(--ink-3)">${esc(T_QMEL.he)}</div>
        </div></div>` },
    { l: 'loading', html: `<div class="card" style="border-start-start-radius:var(--r-lg);border-start-end-radius:var(--r-lg)">
        <div class="card__b" style="padding:var(--sp-3);display:grid;gap:6px"><div class="d-sheet__grab"></div>
        <span class="skel" style="inline-size:40%"></span><span class="skel" style="inline-size:70%"></span></div></div>` },
  ]),

  cmp('נקודת כניסה ל־AI', 'הכניסה היחידה שנושאת מילוי רך של המותג', [
    { l: 'default', html: `<span class="aientry">${icon('sparkles', 16)}<span><b>${esc(NEO.navGroups[5].items[0])}</b><span>שאל על ${esc(EQUI.name)} בשפה חופשית</span></span></span>` },
    { l: 'hover', html: `<span class="aientry is-hover">${icon('sparkles', 16)}<span><b>${esc(NEO.navGroups[5].items[0])}</b><span>שאל על ${esc(EQUI.name)} בשפה חופשית</span></span></span>` },
    { l: 'focus-visible', html: `<span class="aientry is-focus">${icon('sparkles', 16)}<span><b>${esc(NEO.navGroups[5].items[0])}</b><span>שאל על ${esc(EQUI.name)} בשפה חופשית</span></span></span>` },
    { l: 'thinking', html: `<span class="aientry">${icon('sparkles', 16)}<span><b>${esc(NEO.navGroups[5].items[0])}</b><span>מנסח תשובה…</span></span><span class="spin" style="color:var(--brand)"></span></span>` },
  ]),

].join('');

/* ---- the action system ---- */
const BTN_VARIANTS = [
  { c: 'btn--primary',   l: 'primary',    body: `${icon('check', 15)}<span>שמור סטטוס</span>` },
  { c: 'btn--secondary', l: 'secondary',  body: `${icon('arrowUpRight', 15, 'flip-x')}<span>פתח ב־SAP</span>` },
  { c: 'btn--ghost',     l: 'ghost',      body: `${icon('history', 15)}<span>אחרונים</span>` },
  { c: 'btn--icon',      l: 'icon',       body: icon('settings', 17), aria: 'הגדרות' },
  { c: 'btn--compact',   l: 'compact',    body: `${icon('pin', 12)}<span>הצמד</span>` },
  { c: 'btn--float',     l: 'floating',   body: icon('sparkles', 19), aria: 'שאל את NEO' },
  { c: 'btn--ctx',       l: 'contextual', body: `${icon('table', 13)}<span>${esc(NEO.portalSections[4])}</span>` },
];
const BTN_STATES = [
  { l: 'default',      mod: '' },
  { l: 'hover',        mod: 'is-hover' },
  { l: 'pressed',      mod: 'is-press' },
  { l: 'focus-visible',mod: 'is-focus' },
  { l: 'disabled',     mod: '', attr: 'disabled' },
  { l: 'loading',      mod: 'is-loading', extra: '<span class="spin"></span>' },
];

$('#actions').innerHTML = `
  <div class="states" style="grid-template-columns:7rem repeat(${BTN_STATES.length}, minmax(0,1fr))">
    <div class="statecell"><span class="statecell__l">variant / state</span></div>
    ${BTN_STATES.map(s => `<div class="statecell"><span class="statecell__l">${esc(s.l)}</span></div>`).join('')}
    ${BTN_VARIANTS.map(v => `
      <div class="statecell"><span class="statecell__l">${esc(v.l)}</span></div>
      ${BTN_STATES.map(s => `
        <div class="statecell"><div class="statecell__d">
          <button class="btn ${v.c} ${s.mod}" type="button" ${s.attr || ''} tabindex="-1"
            ${v.aria ? `aria-label="${esc(v.aria)}"` : ''}>${v.body}${s.extra || ''}</button>
        </div></div>`).join('')}
    `).join('')}
  </div>
  <p class="note" style="margin-block-start:var(--sp-4)">
    מצב <span class="sap">loading</span> שומר על רוחב הלחצן ומסתיר את התווית באטימות, כדי שהפריסה לא תזוז.
    הספינר מונפש ב־<span class="sap">rotate</span> בלבד. מצב <span class="sap">disabled</span> אינו מסתמך על צבע בלבד —
    הוא גם מסיר את היעד מסדר ה־Tab.
  </p>`;

/* ================================================== 7. §4 — RTL SPECIMENS */

function rtlSpec(title, rule, ok, bad, foot) {
  return `
    <div class="rtlspec">
      <div class="rtlspec__h"><b>${title}</b><span class="grow"></span><span class="tok">${rule}</span></div>
      <div class="rtlspec__b">
        <div class="rtlcell rtlcell--ok">
          <span class="rtlcell__l">${icon('check', 12)}נכון</span>
          ${ok}
        </div>
        <div class="rtlcell rtlcell--bad">
          <span class="rtlcell__l">${icon('x', 12)}שגוי</span>
          ${bad}
        </div>
      </div>
      ${foot ? `<div class="rtlspec__f">${foot}</div>` : ''}
    </div>`;
}

const FLIP_YES = [
  { i: 'chevronRight', why: 'כיוון' }, { i: 'chevronLeft', why: 'כיוון' },
  { i: 'arrowLeft', why: 'חזרה' }, { i: 'arrowUpRight', why: 'יציאה החוצה' },
  { i: 'cornerDown', why: 'מסלול Enter' }, { i: 'panelLeft', why: 'צד הניווט' },
];
const FLIP_NO = [
  { i: 'search', why: 'עצם פיזי' }, { i: 'terminal', why: 'תוכן LTR' },
  { i: 'clock', why: 'זמן ≠ קריאה' }, { i: 'history', why: 'זמן ≠ קריאה' },
  { i: 'command', why: 'גליף קבוע' }, { i: 'sigma', why: 'סימן מתמטי' },
  { i: 'check', why: 'סימטרי בתפיסה' }, { i: 'sparkles', why: 'לוגו / קישוט' },
];

$('#rtl').innerHTML = [

  rtlSpec('כיוון הניווט',
    'inset-inline-start · border-inline-end',
    `<div class="mini">${['wrench','boxes','table'].map((ic, i) =>
        miniRow(ic, [PM.he + ' · ' + PM.code, PP.he + ' · ' + PP.code, NEO.navGroups[1].items[0]][i], '')).join('')}</div>
     <span class="tok">הסרגל יושב ב־<b>inset-inline-start</b> — בעברית זה הצד הימני, ובאנגלית הוא יעבור לשמאל מבלי לגעת ב־CSS.</span>`,
    `<span class="tok" style="white-space:normal;line-height:1.8">
       <b>border-left: 1px solid</b><br><b>padding-left: 16px</b><br><b>left: 0</b><br>
       שלוש שורות שמקבעות את הניווט לצד הפיזי השמאלי. בעברית הן הופכות את הפריסה.
     </span>`,
    'בכל שלושת הכיוונים לא נמצאה אף תכונה פיזית — זה החלק הבריא ביותר של הבסיס הקיים.'),

  rtlSpec('שיקוף אייקונים',
    'transform: scaleX(var(--ds-flip))',
    `<div class="mirror">${FLIP_YES.map(f => `<span class="mirror__i flip-x">${icon(f.i, 18)}<span>${f.i}<br>${esc(f.why)}</span></span>`).join('')}</div>
     <span class="tok">מה שמסמן כיוון — משתקף.</span>`,
    `<div class="mirror">${FLIP_NO.map(f => `<span class="mirror__i">${icon(f.i, 18)}<span>${f.i}<br>${esc(f.why)}</span></span>`).join('')}</div>
     <span class="tok">מה שמייצג עצם, זמן, קוד או מותג — <b>לא</b> משתקף. שיקוף שלהם נראה כמו תקלה.</span>`,
    'הכיוונים לא מסכימים כאן: אחד משתמש ב־<span class="sap">chevronLeft</span> ישירות, אחר לוקח <span class="sap">chevronRight</span> ומוסיף <span class="sap">scaleX(-1)</span>. שתי הדרכים נותנות אותה תוצאה חזותית, אבל רק השנייה תישאר נכונה אם המוצר יקבל אי־פעם ממשק LTR.'),

  rtlSpec('פירורי לחם',
    'הצ׳ברון מצביע לכיוון הקריאה',
    `<span class="crumbs"><a href="#sec-rtl">בית</a><span class="sep flip-x">${icon('chevronRight', 12)}</span>
      <a href="#sec-rtl">${esc(PP.he)} · <span class="sap">${esc(PP.code)}</span></a>
      <span class="sep flip-x">${icon('chevronRight', 12)}</span><span class="cur sap">${esc(T_PLKO.name)}</span></span>
     <span class="tok">הנתיב נקרא מימין לשמאל, והצ׳ברון נוסע איתו.</span>`,
    `<span class="crumbs" style="direction:ltr"><span class="cur sap">${esc(T_PLKO.name)}</span>
      <span class="sep">${icon('chevronRight', 12)}</span><a href="#sec-rtl">${esc(PP.he)}</a>
      <span class="sep">${icon('chevronRight', 12)}</span><a href="#sec-rtl">בית</a></span>
     <span class="tok">נתיב שנשאר LTR — ההיררכיה נקראת הפוך.</span>`),

  rtlSpec('שדה חיפוש',
    'השדה RTL · הערך LTR',
    `<span class="searchtrig">${icon('search', 15)}
       <span class="ph" style="font-family:var(--font-mono);direction:ltr;unicode-bidi:isolate;text-align:end;color:var(--ink-1)">IE01/IE02/IE03</span>
       <span class="kbd">⌘K</span></span>
     <span class="tok">התווית והמסגרת RTL, אבל השאילתה עצמה מונו ו־LTR ונצמדת לקצה ה־inline-start.</span>`,
    `<span class="searchtrig">${icon('search', 15)}
       <span class="ph" style="direction:rtl">IE01/IE02/IE03</span><span class="kbd">⌘K</span></span>
     <span class="tok">בלי בידוד — הלוכסנים והנקודות־פסיק מתעופפים לקצה הלא נכון של המחרוזת.</span>`,
    'הערך האמיתי של <span class="sap">IFLOT</span> בשדה <span class="sap">tcodes</span> הוא <span class="sap">IL01/IL02/IL03; IH01, IH06</span> — בדיוק סוג המחרוזת שנשברת בלי בידוד.'),

  rtlSpec('פאנלים ושכבות־על',
    'הפאנל נכנס מקצה ה־inline-start',
    `<div class="mini" style="box-shadow:var(--elev-3);border-radius:var(--r-md);inline-size:70%">
       <div class="mini-title">${esc(NEO.navGroups[4].he)}</div>${miniRow('workflow', NEO.navGroups[4].items[0], '')}</div>
     <span class="tok">מקור ההנפשה הוא <b>transform-origin: 100% 30%</b> ב־RTL — הפינה שממנה הפאנל «נפתח».</span>`,
    `<div class="mini" style="box-shadow:var(--elev-3);border-radius:var(--r-md);inline-size:70%;margin-inline-start:auto">
       <div class="mini-title">${esc(NEO.navGroups[4].he)}</div>${miniRow('workflow', NEO.navGroups[4].items[0], '')}</div>
     <span class="tok">פאנל שנצמד לקצה הפיזי הימני ונפתח מהצד ההפוך לסרגל שהפעיל אותו.</span>`),

  rtlSpec('Tooltip',
    'inset-inline-end: calc(100% + 12px)',
    `<span class="tip-spec">${esc(NEO.navGroups[3].items[0])}</span>
     <span class="tok">ה־tooltip יוצא מהקצה ה־inline-end של הסרגל — כלומר שמאלה בעברית, ימינה באנגלית, מאותו כלל.</span>`,
    `<span class="tip-spec">${esc(NEO.navGroups[3].items[0])}</span>
     <span class="tok">מיקום ב־<b>right: calc(100% + 12px)</b> — ה־tooltip נופל מחוץ למסך ברגע שהסרגל עובר צד.</span>`),

  rtlSpec('טבלאות עם עמודות מספריות',
    'text-align: end · tabular-nums',
    `<table class="numtable">
       <thead><tr><th>טבלה</th><th>תיאור</th><th class="num">שדות</th></tr></thead>
       <tbody>${NEO.pmTables.slice(0, 4).map(t =>
         `<tr><td class="id">${esc(t.name)}</td><td>${esc(t.he)}</td><td class="num">${t.fields}</td></tr>`).join('')}</tbody>
     </table>
     <span class="tok">המזהה מונו ומבודד, המספר מיושר ל־<b>end</b> עם ספרות ברוחב אחיד — העמודה נשארת ישרה.</span>`,
    `<table class="numtable numtable--bad">
       <thead><tr><th>טבלה</th><th>תיאור</th><th class="num">שדות</th></tr></thead>
       <tbody>${NEO.pmTables.slice(0, 4).map(t =>
         `<tr><td class="id" style="direction:inherit;font-family:var(--font-ui)">${esc(t.name)}</td><td>${esc(t.he)}</td><td class="num">${t.fields}</td></tr>`).join('')}</tbody>
     </table>
     <span class="tok">מספרים ביישור start ובגופן פרופורציונלי — קשה להשוות ערכים בין שורות.</span>`),

  rtlSpec('כיוון התנועה',
    'translateX(calc(var(--ds-flip) * N))',
    `<span class="tok" style="white-space:normal;line-height:1.9">
       <b>:root { --ds-flip: 1 }</b><br><b>[dir="rtl"] { --ds-flip: -1 }</b><br>
       <b>transform: translateX(calc(var(--ds-flip) * -8px))</b>
     </span>
     <span class="tok">טרנספורמים הם פיזיים ולא לוגיים. מכפיל כיוון אחד פותר את כל התנועות בציר ה־inline בבת אחת.</span>`,
    `<span class="tok" style="white-space:normal;line-height:1.9"><b>transform: translateX(-8px)</b></span>
     <span class="tok">בעברית זו כניסה מהכיוון ההפוך: הפאנל בורח מהסרגל שפתח אותו במקום להיפתח ממנו.</span>`,
    'זו הבדיקה שקל לפספס — הכול נראה תקין עד שמסתכלים לאיזה כיוון הדברים נכנסים.'),

  rtlSpec('עברית ולטינית באותה שורה',
    'unicode-bidi: isolate',
    `<div class="bidi-line">הטבלה <span class="sap">${esc(EQUI.name)}</span> — ${esc(EQUI.he)},
       טרנזקציות <span class="sap">${esc(EQUI.tcodes)}</span>, אפליקציית ${esc(EQUI.fiori)}.</div>
     <div class="bidi-line">${esc(NEO.funcs[0].he)} — <span class="sap">${esc(NEO.funcs[0].name)}</span>.</div>
     <span class="tok">כל ריצה לטינית עטופה ב־<b>.sap</b> (<b>direction: ltr; unicode-bidi: isolate</b>) ולכן היא אטומה לשכנים שלה.</span>`,
    `<div class="bidi-line bidi-bad">הטבלה <span class="sap">${esc(EQUI.name)}</span> — ${esc(EQUI.he)},
       טרנזקציות <span class="sap">${esc(EQUI.tcodes)}</span>, אפליקציית ${esc(EQUI.fiori)}.</div>
     <div class="bidi-line bidi-bad">${esc(NEO.funcs[0].he)} — <span class="sap">${esc(NEO.funcs[0].name)}</span>.</div>
     <span class="tok">אותו טקסט בדיוק בלי בידוד. שים לב לסוגריים, לנקודה ולפסיקים שקופצים לקצה הלא נכון.</span>`,
    'הכלל חי כבר ב־<span class="sap">shared/reset.css</span>: <span class="sap">code, kbd, samp, pre, .sap</span>. כל מזהה SAP חדש חייב לקבל את הכיתה הזאת.'),

].join('');

/* ================================================ 8. §5 — ACCESSIBILITY */

const KEYS = [
  { k: ['⌘', 'K'], w: 'גלובלי', d: 'פותח את דיאלוג החיפוש/הפקודה מכל מסך. המיקוד עובר לשדה, והמיקוד הקודם נשמר להחזרה.' },
  { k: ['⌘', '\\'], w: 'גלובלי', d: 'מקפל ומרחיב את הניווט. הסמן הפעיל נשאר על אותו פריט.' },
  { k: ['↑', '↓'], w: 'דיאלוג חיפוש', d: 'מזיז את הבחירה ברשימה. השדה שומר על המיקוד; מתעדכן <span class="sap">aria-activedescendant</span>.' },
  { k: ['Enter'], w: 'דיאלוג חיפוש', d: 'פותח את התוצאה הנבחרת וסוגר את הדיאלוג.' },
  { k: ['Esc'], w: 'כל שכבת־על', d: 'סוגר דיאלוג, גיליון תחתון או תצוגה מקדימה, ומחזיר את המיקוד לרכיב שפתח אותם.' },
  { k: ['Tab'], w: 'כל המסך', d: 'עובר בין אזורים בסדר הקריאה. שכבת־על פתוחה כולאת את ה־Tab בתוכה.' },
  { k: ['→', '←'], w: 'עץ הניווט', d: 'פותח וסוגר קבוצה. בעברית החץ שפותח הוא זה שמצביע לכיוון ה־inline-start.' },
  { k: ['Home', 'End'], w: 'רשימות', d: 'קפיצה לפריט הראשון והאחרון בלי לעבור פריט־פריט.' },
];

const TARGETS = [
  { s: 32, l: 'סרגל כלי צפוף', ok: false },
  { s: 40, l: 'לחצן אייקון בינוני', ok: false },
  { s: 44, l: 'תקן מגע — המינימום', ok: true },
  { s: 52, l: 'ניווט מובייל', ok: true },
];

const ARIA = [
  { t: 'role="combobox"', d: 'שדה החיפוש. נושא <span class="sap">aria-expanded</span>, <span class="sap">aria-controls</span> אל רשימת התוצאות, <span class="sap">aria-autocomplete="list"</span> ו־<span class="sap">aria-activedescendant</span> אל התוצאה הנבחרת. המיקוד לא עוזב את השדה.' },
  { t: 'role="listbox"', d: 'מיכל התוצאות. הוא ה־<span class="sap">aria-controls</span> של השדה, ואינו מקבל מיקוד בעצמו.' },
  { t: 'role="option"', d: 'שורת תוצאה. <span class="sap">aria-selected</span> מסמן את הבחירה הנוכחית — ולא כיתת CSS בלבד.' },
  { t: 'role="tree"', d: 'עץ הניווט. הקבוצות הן <span class="sap">treeitem</span> עם <span class="sap">aria-expanded</span>, והפריטים יורדים תחת <span class="sap">group</span>.' },
  { t: 'aria-current="page"', d: 'הפריט הפעיל בניווט. הסמן האדום הוא רק ביטוי חזותי של המצב הזה.' },
  { t: 'role="dialog"', d: 'דיאלוג החיפוש והגיליון התחתון. <span class="sap">aria-modal="true"</span> + כליאת מיקוד + החזרת מיקוד בסגירה.' },
  { t: 'aria-live="polite"', d: 'מונה התוצאות. משתנה מספר התוצאות מוכרז בלי לקטוע את ההקלדה.' },
];

$('#a11y').innerHTML = `

  <div class="sub">
    <div class="sub__head"><h3>סדר מיקוד</h3><span class="grow"></span><span class="tok">DOM = סדר קריאה</span></div>
    <p>סדר ה־Tab נגזר מסדר ה־DOM ולא מ־<span class="sap">tabindex</span> חיובי. אין בכל הגיליון ובכל שלושת הכיוונים ולו <span class="sap">tabindex</span> חיובי אחד. עבור עם Tab על השורה כדי לראות את הטבעת האמיתית:</p>
    <div class="focusrun" style="margin-block-start:var(--sp-4)">
      <span><span class="ord">1</span><button class="btn btn--icon" type="button" aria-label="פתח ניווט">${icon('panelLeft', 17, 'flip-x')}</button></span>
      <span><span class="ord">2</span><button class="searchtrig" type="button" style="inline-size:16rem">${icon('search', 15)}<span class="ph">חפש טבלה, tcode, BAPI…</span><span class="kbd">⌘K</span></button></span>
      <span><span class="ord">3</span><button class="btn btn--ctx" type="button">${icon('table', 13)}<span>${esc(NEO.portalSections[4])}</span></button></span>
      <span><span class="ord">4</span><button class="btn btn--secondary" type="button">${icon('arrowUpRight', 15, 'flip-x')}<span>פתח ב־SAP</span></button></span>
      <span><span class="ord">5</span><button class="btn btn--primary" type="button">${icon('check', 15)}<span>שמור סטטוס</span></button></span>
    </div>
    <p class="note" style="margin-block-start:var(--sp-4)">
      בסרגל מצומצם התווית קיימת רק כ־tooltip. לכן כל לחצן אייקון נושא <span class="sap">aria-label</span> בעברית,
      וה־SVG עצמו מסומן <span class="sap">aria-hidden="true"</span> ו־<span class="sap">focusable="false"</span> — כפי שמייצרת אותו הפונקציה <span class="sap">icon()</span>.
    </p>
  </div>

  <div class="sub">
    <div class="sub__head"><h3>שפת מיקוד אחת</h3><span class="grow"></span><span class="tok">--focus-ring</span></div>
    <p>טבעת אחת בלבד בכל המערכת: <span class="sap">0 0 0 2px var(--surface), 0 0 0 4px var(--brand)</span>. הטבעת הפנימית היא «חריץ» בצבע המשטח, כך שהטבעת נראית גם על רקע צבעוני וגם על קצה של כרטיס.</p>
    <div class="states" style="margin-block-start:var(--sp-4)">
      <div class="statecell"><span class="statecell__l">on surface</span><div class="statecell__d"><button class="btn btn--secondary is-focus" type="button" tabindex="-1">${esc(NEO.portalSections[0])}</button></div></div>
      <div class="statecell" style="background:var(--surface-2)"><span class="statecell__l">on surface-2</span><div class="statecell__d"><button class="btn btn--secondary is-focus" type="button" tabindex="-1">${esc(NEO.portalSections[1])}</button></div></div>
      <div class="statecell"><span class="statecell__l">on brand</span><div class="statecell__d"><button class="btn btn--primary is-focus" type="button" tabindex="-1">${esc(NEO.portalSections[3])}</button></div></div>
      <div class="statecell"><span class="statecell__l">icon-only</span><div class="statecell__d"><button class="btn btn--icon is-focus" type="button" tabindex="-1" aria-label="הגדרות">${icon('settings', 17)}</button></div></div>
    </div>
    <p class="note note--warn" style="margin-block-start:var(--sp-4)">
      אי־התאמה אמיתית שנמצאה: שדה החיפוש מבטל את הטבעת המשותפת בכל שלושת הכיוונים — ומחליף אותה בשלוש שפות שונות
      (קו־שיער מותג מתחת לשדה · טבעת מותג בשקיפות 34% · הדגשת מסגרת בלבד). זו החלטה סבירה בפני עצמה,
      כי הטבעת הרגילה מציירת קופסה אדומה סביב כותרת הדיאלוג — אבל צריך לבחור <b>אחת</b> ולתעד אותה כחריג רשמי.
    </p>
  </div>

  <div class="sub">
    <div class="sub__head"><h3>ניגודיות</h3><span class="grow"></span><span class="tok">תוצאות חיות מ־§01</span></div>
    <div id="a11yContrast" class="card"></div>
  </div>

  <div class="sub">
    <div class="sub__head"><h3>גודל יעד מגע</h3><span class="grow"></span><span class="tok">מינימום 44 × 44 CSS px</span></div>
    <p>הריבועים נמדדים ב־<span class="sap">getBoundingClientRect()</span> אחרי הציור — המספרים למטה הם המידה בפועל, לא הצהרה.</p>
    <div class="targets" id="targets" style="margin-block-start:var(--sp-4)"></div>
    <p class="note" style="margin-block-start:var(--sp-4)">
      בדסקטופ צפוף מותר יעד קטן יותר (שורת ניווט של 34px, לחצן כלי של 32px) כל עוד יש מרווח בין היעדים
      וכל עוד קיימת דרך מקלדת מלאה לאותה פעולה. במגע — 44px הוא רצפה, לא יעד.
    </p>
  </div>

  <div class="sub">
    <div class="sub__head"><h3>מודל המקלדת</h3><span class="grow"></span><span class="tok">8 קיצורים · ללא תלות בעכבר</span></div>
    <table class="keytable" style="margin-block-start:var(--sp-3)">
      <thead><tr><th>מקש</th><th>הקשר</th><th>התנהגות</th></tr></thead>
      <tbody>
        ${KEYS.map(k => `<tr>
          <td class="k">${k.k.map(x => `<span class="kbd">${esc(x)}</span>`).join('')}</td>
          <td style="color:var(--ink-3)">${esc(k.w)}</td>
          <td>${k.d}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="sub">
    <div class="sub__head"><h3>תפקידי ARIA בשימוש</h3><span class="grow"></span><span class="tok">חיפוש · עץ ניווט · שכבות־על</span></div>
    <div class="arialist" style="margin-block-start:var(--sp-3)">
      ${ARIA.map(a => `<div class="ariarow"><span class="tok"><b>${esc(a.t)}</b></span><p>${a.d}</p></div>`).join('')}
    </div>
    <p class="note note--warn" style="margin-block-start:var(--sp-4)">
      פער שנמצא: הניווט מסומן היום כרשימה עם <span class="sap">aria-current</span>, אבל לא כ־<span class="sap">tree</span> מלא
      עם <span class="sap">treeitem</span>. מכיוון שהקבוצות נפתחות ונסגרות, קורא מסך מקבל «רשימה שמשתנה» במקום עץ.
      זה הפריט הפתוח הגדול ביותר בסעיף הזה.
    </p>
  </div>

  <div class="sub">
    <div class="sub__head"><h3>תיוג פקדים שהם אייקון בלבד</h3><span class="grow"></span><span class="tok">aria-label · לא title</span></div>
    <div class="states" style="margin-block-start:var(--sp-3)">
      ${[
        ['פתח ניווט', 'panelLeft', 'flip-x'], ['חיפוש', 'search', ''], ['הגדרות', 'settings', ''],
        ['שאל את NEO', 'sparkles', ''], ['סגור', 'x', ''], ['חזרה', 'arrowLeft', 'flip-x'],
      ].map(([label, ic, fl]) => `
        <div class="statecell">
          <span class="statecell__l">aria-label</span>
          <div class="statecell__d" style="display:flex;align-items:center;gap:var(--sp-3)">
            <button class="btn btn--icon" type="button" tabindex="-1" aria-label="${esc(label)}">${icon(ic, 17, fl)}</button>
            <span style="font-size:var(--t-xs)">${esc(label)}</span>
          </div>
        </div>`).join('')}
    </div>
    <p class="note" style="margin-block-start:var(--sp-4)">
      התווית היא בעברית כי ממשק המערכת עברי, אבל שם האובייקט שבתוכה נשאר בלטינית ובבידוד —
      «פתח את <span class="sap">${esc(EQUI.name)}</span>» ולא תרגום של שם הטבלה. שם טכני של SAP הוא לא טקסט מתורגם.
    </p>
  </div>

  <div class="sub">
    <div class="sub__head"><h3>תנועה מופחתת</h3><span class="grow"></span><span class="tok">prefers-reduced-motion: reduce</span></div>
    <p>
      ההתנהגות אינה «לבטל הכול». שינוי המצב עדיין קורה מיידית, ההצלבה באטימות נשארת כדי שהשינוי ייקרא,
      ורק הנסיעה במרחב נעלמת. הפעל את המתג בראש העמוד וחזור לסעיף 02 — כל תשע ההדגמות מתנהגות אחרת.
    </p>
    <div class="grid2" style="margin-block-start:var(--sp-4)">
      <div class="card"><div class="card__h">${icon('activity', 14)}<b>תנועה מלאה</b></div>
        <div class="card__b"><span class="tok" style="white-space:normal;line-height:1.9">
          <b>transform: translateY(-8px) scale(.985)</b><br><b>opacity: 0 → 1</b><br><b>280ms · --ease-out-expo</b>
        </span></div></div>
      <div class="card"><div class="card__h">${icon('check', 14)}<b>תנועה מופחתת</b></div>
        <div class="card__b"><span class="tok" style="white-space:normal;line-height:1.9">
          <b>transform</b> — מוחל מיידית, ללא מעבר<br><b>opacity: 0 → 1</b><br><b>120ms · linear</b>
        </span></div></div>
    </div>
    <p class="note note--bad" style="margin-block-start:var(--sp-4)">
      אזהרת מימוש: הכלל ב־<span class="sap">tokens.css</span> מקצר כל מעבר ל־0.01ms.
      אירוע <span class="sap">transitionend</span> עדיין נורה, אבל מיד — כך שכל לוגיקה שמניחה זמן אמיתי
      (ניקוי אלמנט־רפאים, פתיחת מיקוד אחרי אנימציה) חייבת נתיב חלופי. בהדגמה 04 כאן יש בדיוק כזה.
    </p>
  </div>
`;

/* live contrast summary inside §5, recomputed with the theme */
function paintA11yContrast() {
  const cs = getComputedStyle(html);
  const surface = cs.getPropertyValue('--surface').trim();
  const pairs = [
    { a: '--ink-1', b: '--surface', label: 'טקסט ראשי על משטח' },
    { a: '--ink-2', b: '--surface', label: 'גוף טקסט על משטח' },
    { a: '--ink-3', b: '--surface', label: 'מטא על משטח' },
    { a: '--ink-1', b: '--surface-2', label: 'טקסט ראשי על משטח מוגבה' },
    { a: '--brand-foreground', b: '--brand', label: 'טקסט על ה־CTA היחיד' },
    { a: '--brand', b: '--surface', label: 'סמן מותג על משטח (לא טקסט)' },
  ];
  const host = $('#a11yContrast');
  if (!host) return;
  host.innerHTML = `
    <div class="card__h">${icon('activity', 15)}<b>יחסי ניגודיות במצב ${html.dataset.theme === 'dark' ? 'כהה' : 'בהיר'}</b>
      <span class="grow"></span><span class="tok">--surface ${esc(surface)}</span></div>
    ${pairs.map(p => {
      const ca = cs.getPropertyValue(p.a).trim(), cb = cs.getPropertyValue(p.b).trim();
      const r = contrast(ca, cb);
      const isText = !p.label.includes('לא טקסט');
      const need = isText ? 4.5 : 3;
      const pass = r >= need ? '1' : (r >= 3 ? 'lg' : '0');
      return `<div class="inkrow">
        <div class="inkrow__spec"><div class="t" style="font-size:var(--t-sm)">${esc(p.label)}</div>
          <div class="m"><span class="sap">${esc(p.a)}</span> · <span class="sap">${esc(p.b)}</span></div></div>
        <span class="tok">סף ${need}:1</span>
        <span class="ratio">${r.toFixed(2)}</span>
        <span class="verdict" data-pass="${pass}">${r >= need ? 'PASS' : (r >= 3 ? 'LARGE ONLY' : 'FAIL')}</span>
      </div>`;
    }).join('')}
    <div class="card__f">הסמן האדום נמדד מול סף 3:1 של רכיב גרפי לא־טקסטואלי — הוא סמן, לא טקסט.</div>`;
}
paintA11yContrast();

/* measured target sizes */
$('#targets').innerHTML = TARGETS.map(t => `
  <div class="target">
    <span class="target__hit" style="--s:${t.s}px">${icon('pin', Math.min(18, t.s / 2.4))}</span>
    <span class="target__m" data-target>${t.s}×${t.s}</span>
    <span class="tok" style="white-space:normal;text-align:center;max-inline-size:7rem">${esc(t.l)}</span>
    <span class="chip ${t.s >= 44 ? 'chip--ok' : 'chip--bad'}">${t.s >= 44 ? 'עומד בתקן' : 'מתחת ל־44px'}</span>
  </div>`).join('');

/* measure for real, after layout */
requestAnimationFrame(() => {
  $$('#targets .target').forEach(t => {
    const box = $('.target__hit', t).getBoundingClientRect();
    $('[data-target]', t).textContent = `${Math.round(box.width)}×${Math.round(box.height)}px`;
  });
});

/* keep every computed panel honest when the theme flips */
$('#themeBtn').addEventListener('click', () => {
  paintA11yContrast();
  $('#brand').querySelectorAll('.tok b').forEach(() => {});
});

/* ------------------------------------------------------------- hero meta */
$('#heroMeta').innerHTML = [
  `<span class="chip">${icon('layers', 13)}5 פרקים</span>`,
  `<span class="chip">${icon('activity', 13)}9 תנועות חיות</span>`,
  `<span class="chip">${icon('layoutGrid', 13)}20 רכיבים + 7 לחצנים</span>`,
  `<span class="chip chip--mono">${NEO.modules.map(m => m.code).join(' · ')}</span>`,
  `<span class="chip chip--mono">${NEO.modules.reduce((a, m) => a + m.tables, 0)} tables · ${NEO.modules.reduce((a, m) => a + m.fields, 0)} fields</span>`,
  `<span class="chip">${icon('bookOpen', 13)}${NEO.books.length} ספרים בספרייה</span>`,
].join('');

