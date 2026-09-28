/* Knowledge Workbench: one of three direction boards (BOARD-SPEC.md).
   Server component. Every number, name, status and relation is read at build
   time through the site's own accessors (./data.ts). */

import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import {
  ArrowUpLeft, BookOpen, ChevronLeft, CircleAlert, Clock, GitBranch, GraduationCap, History, House, Library,
  ListChecks, Pin, Plug, RotateCw, Search, SearchX, Table2, Terminal, Workflow,
} from "lucide-react";
import { plexHe, plexLat, plexMono } from "@/app/fonts/plex";
import { boardData, type BoardData } from "./data";
import {
  Bidi, Code, FAM_HE, FamGlyph, Kbd, LevelChip, LVL_HE, LvlGlyph, Md, ModChip, modClass, Num, StatusChip,
  type Fam, type Lvl,
} from "./marks";
import { Catalog, CopyButton, DemoAction, ErdFrame, ModeToggle, Palette } from "./client";
import "./board.css";

export const metadata: Metadata = {
  title: { absolute: "Knowledge Workbench · כיוון עיצוב · SAP by Sali" },
  description: "כיוון עיצוב ל-SAP by Sali: שולחן עבודה לידע, חיפוש במרכז, מקלדת קודם, טבלאות ופאנלים, על נתוני האתר האמיתיים.",
  robots: { index: false, follow: false },
};

/* next/font/local appends an automatic "<family> Fallback" face (local Arial,
   no unicode-range) to each family variable. Stacked as var(he), var(lat) the
   Hebrew fallback would catch every Latin glyph before Plex Latin could. The
   stack is therefore built from the primary family names. */
const head = (f: string) => f.split(",")[0].trim();
const tail = (f: string) => f.split(",").slice(1).map((s) => s.trim()).join(", ");
const UI_STACK = [head(plexHe.style.fontFamily), head(plexLat.style.fontFamily), tail(plexHe.style.fontFamily), "\"Segoe UI\"", "system-ui", "sans-serif"]
  .filter(Boolean)
  .join(", ");

const pad = (n: number) => String(n).padStart(2, "0");
const dmy = (iso: string | null) => (iso ? iso.split("-").reverse().join(".") : "לא מתועד במאגר");

const SECTIONS: [number, string][] = [
  [0, "הכיוון"], [1, "מעטפת"], [2, "בית"], [3, "חיפוש"], [4, "קטלוג"], [5, "רשומה"], [6, "שיטת עבודה"],
  [7, "ERD"], [8, "ספרייה וקורא"], [9, "אקדמיה"], [10, "מערכת סטטוס"], [11, "עמוד משפטי"], [12, "ריק ושגיאה"], [13, "תנועת חתימה"],
];

function Sec({ n, title, cap, children }: { n: number; title: string; cap: string; children: ReactNode }) {
  return (
    <section className="wb-sec" id={`wb-s${n}`} aria-labelledby={`wb-s${n}-h`}>
      <header className="wb-sec__head">
        <span className="wb-sec__num" aria-hidden="true">{pad(n)}</span>
        <h2 className="wb-h2" id={`wb-s${n}-h`}>{title}</h2>
        <p className="wb-sec__cap">{cap}</p>
      </header>
      <div className="wb-sec__body">{children}</div>
    </section>
  );
}

/* ================================================================== 00 */

const ROLE: Record<string, string> = {
  canvas: "קרקע", panel: "פאנל", raised: "משטח מוגבה", sunken: "משטח שקוע וריחוף", backdrop: "שכבת עמעום",
  "ink-1": "טקסט ראשי", "ink-2": "טקסט משני", "ink-3": "טקסט מושתק", "ink-inverse": "טקסט הפוך",
  "line-1": "מפריד", "line-2": "גבול רכיב", "line-strong": "גבול פקד",
  action: "פעולה, אדום המותג", "action-hover": "פעולה בריחוף", "action-press": "פעולה בלחיצה", "action-ink": "טקסט על פעולה",
  "action-text": "טקסט פעולה", "select-bg": "רקע בחירה", link: "קישור", focus: "טבעת מיקוד", "info-bg": "רקע מידע",
  "st-keep": "S/4: נשמרת", "st-change": "S/4: משתנה", "st-replace": "S/4: מוחלפת", "st-removed": "S/4: הוסרה",
  "st-verify": "S/4: נדרש אימות", "st-past": "S/4: ECC בלבד",
  "code-bg": "רקע קוד", "code-ink": "טקסט קוד", "kbd-bg": "מקש", "kbd-line": "קו מקש", "kbd-ink": "טקסט מקש",
  "edge-verified": "קשר מוצהר", "edge-unverified": "קשר לא מאומת", "node-bg": "צומת", "node-sel": "צומת נבחר",
  paper: "נייר", "paper-ink": "דיו", "page-edge": "קצה דפים", "shadow-1": "צל שכבה צפה", "shadow-2": "צל שכבה צפה, קרוב",
};
const roleOf = (t: string) =>
  ROLE[t] ??
  (t.startsWith("mod-") ? `מודול ${t.slice(4).toUpperCase()}` : t.startsWith("cloth-") ? `כריכה ${t.slice(6)}` : t.endsWith("-bg") ? `רקע ${ROLE[t.slice(0, -3)] ?? t}` : t);

const CORE = [
  "canvas", "panel", "raised", "sunken", "ink-1", "ink-2", "ink-3", "line-2", "line-strong", "action", "action-text", "select-bg",
  "link", "focus", "code-bg", "st-keep", "st-change", "st-replace", "st-removed", "st-verify", "mod-pm", "mod-pppi", "edge-verified", "edge-unverified",
];

function Swatch({ hex }: { hex: string }) {
  return <span className="wb-sw" style={{ "--sw": hex } as CSSProperties} aria-hidden="true" />;
}

function TokenRows({ list }: { list: BoardData["tokens"] }) {
  return (
    <div className="wb-tokens">
      <div className="wb-tokens__head" aria-hidden="true">
        <span>Token</span><span>בהיר</span><span>כהה</span>
      </div>
      <ul>
        {list.map((t) => (
          <li key={t.name} className="wb-token">
            <span className="wb-token__name"><Code>--{t.name}</Code><span className="wb-token__role">{roleOf(t.name)}</span></span>
            <span className="wb-token__v"><Swatch hex={t.light} /><Code>{t.light}</Code></span>
            <span className="wb-token__v wb-token__v--dark"><Swatch hex={t.dark} /><Code>{t.dark}</Code></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The pairs the eye checks first; the full list sits behind a disclosure. */
const KEY_PAIRS = [
  "ink-1/canvas", "ink-2/panel", "ink-3/canvas", "action-ink/action", "action-text/select-bg",
  "link/panel", "focus/canvas", "line-strong/canvas", "st-keep/sunken", "mod-pp/panel",
];

function ContrastTable({ rows, label }: { rows: BoardData["contrast"]; label: string }) {
  return (
    <div className="wb-tablewrap" role="region" aria-label={label} tabIndex={0}>
      <table className="wb-table wb-table--dense">
        <thead>
          <tr>
            <th scope="col">טקסט או סימן</th><th scope="col">על משטח</th>
            <th scope="col" className="wb-num">סף</th><th scope="col" className="wb-num">יום</th><th scope="col" className="wb-num">לילה</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.fg}/${r.bg}`}>
              <td><Code>--{r.fg}</Code></td>
              <td><Code>--{r.bg}</Code></td>
              <td className="wb-num"><bdi className="wb-numv">{r.min}</bdi></td>
              <td className="wb-num"><bdi className="wb-numv">{r.light.toFixed(2)}</bdi></td>
              <td className="wb-num"><bdi className="wb-numv">{r.dark.toFixed(2)}</bdi></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function S0({ d }: { d: BoardData }) {
  const core = CORE.map((n) => d.tokens.find((t) => t.name === n)).filter((t): t is BoardData["tokens"][number] => !!t);
  const text = d.contrast.filter((r) => r.min === 4.5);
  const fails = d.contrast.filter((r) => r.light < r.min || r.dark < r.min).length;
  const minL = Math.min(...text.map((r) => r.light));
  const minD = Math.min(...text.map((r) => r.dark));
  const f0 = d.tableRec.fields[0];
  return (
    <Sec n={0} title="הכיוון" cap="השם, ההצהרה, הצבעים בשני המצבים והסולם הטיפוגרפי, כפי שהם מוגדרים בגיליון העיצוב.">
      <div className="wb-dir">
        <div className="wb-dir__name">
          <p className="wb-dir__latin"><bdi dir="ltr">Knowledge Workbench</bdi></p>
          <p className="wb-dir__he">שולחן עבודה לידע</p>
        </div>
        <dl className="wb-statement">
          <div>
            <dt>רעיון</dt>
            <dd>כלי מקצועי לעבודה יומיומית: החיפוש הוא מרכז הכובד, המקלדת קודמת לעכבר, ובמקום כרטיסים יש פאנלים וטבלאות.</dd>
          </div>
          <div>
            <dt>טיפוגרפיה</dt>
            <dd><bdi>IBM Plex Sans Hebrew</bdi> לכל הממשק והקריאה, <bdi>IBM Plex Mono</bdi> לכל מזהה SAP. ממשק 14 עד 15px, קריאה 16px, כותרות מסך 24 עד 28px.</dd>
          </div>
          <div>
            <dt>צבע</dt>
            <dd>גרפיט קריר וניטרלי. אדום המותג לפעולה ולבחירה בלבד, כחול למידע ולמיקוד. הלילה מעוצב בנפרד ואינו היפוך של היום.</dd>
          </div>
          <div>
            <dt>צפיפות, צורה ותנועה</dt>
            <dd>רדיוס 4px, קו 1px, צל רק לשכבות צפות. שורות של 36 עד 40px. תנועה חדה של 100 עד 160ms, רק כשהיא מסבירה מעבר.</dd>
          </div>
        </dl>
      </div>

      <div className="wb-split">
        <div className="wb-panel">
          <h3 className="wb-h3">לוח הצבעים</h3>
          <p className="wb-muted">הערכים נקראים מתוך board.css בזמן הבנייה, כך שהדוגמאות לא יכולות לסטות מהגיליון.</p>
          <TokenRows list={core} />
          <details className="wb-details">
            <summary>כל ה-Tokens (<Num n={d.tokens.length} />)</summary>
            <TokenRows list={d.tokens} />
          </details>
        </div>

        <div className="wb-stack">
        <div className="wb-panel">
          <h3 className="wb-h3">ניגודיות מחושבת</h3>
          <p className="wb-contrast-sum">
            <strong><Num n={d.contrast.length} /> זוגות</strong> נבדקו בשני המצבים, <strong><Num n={fails} /> כשלים</strong>.
            הניגודיות הנמוכה ביותר לטקסט: <bdi className="wb-numv">{minL.toFixed(2)}:1</bdi> ביום, <bdi className="wb-numv">{minD.toFixed(2)}:1</bdi> בלילה.
          </p>
          <ContrastTable rows={d.contrast.filter((r) => KEY_PAIRS.includes(`${r.fg}/${r.bg}`))} label="זוגות מפתח" />
          <details className="wb-details">
            <summary>כל <Num n={d.contrast.length} /> הזוגות</summary>
            <ContrastTable rows={d.contrast} label="טבלת ניגודיות מלאה" />
          </details>
        </div>

      <div className="wb-panel wb-type">
        <h3 className="wb-h3">סולם טיפוגרפי</h3>
        <dl className="wb-type__list">
          <div className="wb-type__row">
            <dt><span>כותרת מסך עבודה</span><Code>28/36 · 600</Code></dt>
            <dd className="wb-t-title"><Bidi t={d.txRec.he} /></dd>
          </div>
          <div className="wb-type__row">
            <dt><span>כותרת מקטע</span><Code>20/28 · 600</Code></dt>
            <dd className="wb-t-sec"><Bidi t={d.tableRec.he} /></dd>
          </div>
          <div className="wb-type__row">
            <dt><span>גוף קריאה</span><Code>16/28 · 400</Code></dt>
            <dd className="wb-t-read"><Bidi t={d.txRec.purpose} /></dd>
          </div>
          <div className="wb-type__row">
            <dt><span>ממשק</span><Code>15/22 · 400 · 500</Code></dt>
            <dd className="wb-t-ui"><Bidi t={d.catalog.rows[0].he} /> · <strong>מודול <bdi>PM</bdi></strong></dd>
          </div>
          <div className="wb-type__row">
            <dt><span>מידע משני</span><Code>13/18 · 400</Code></dt>
            <dd className="wb-t-meta"><Num n={d.counts.dictRows} /> רשומות מילון · <Num n={d.counts.shared} /> טבלאות משותפות ל-<bdi>PM</bdi> ול-<bdi>PP-PI</bdi></dd>
          </div>
          <div className="wb-type__row">
            <dt><span>מזהה SAP</span><Code>Plex Mono 14 · 500</Code></dt>
            <dd className="wb-t-code"><Code>{`${d.tableRec.name}-${f0.tech}`}</Code> <Code>{`${f0.dt} ${f0.len}`}</Code> <Code>{f0.pk && f0.fk ? "PK/FK" : f0.pk ? "PK" : "FK"}</Code></dd>
          </div>
          <div className="wb-type__row">
            <dt><span>מקש</span><Code>Plex Mono 12 · 500</Code></dt>
            <dd className="wb-t-kbd"><Kbd>Ctrl</Kbd><Kbd>K</Kbd> <Kbd>↑</Kbd><Kbd>↓</Kbd> <Kbd>Enter</Kbd> <Kbd>Esc</Kbd></dd>
          </div>
        </dl>
      </div>
        </div>
      </div>
    </Sec>
  );
}

/* ================================================================== 01 */

type NavItem = { label: ReactNode; icon?: ReactNode; href: string; n: number | null; unit?: string; active?: boolean; kbd?: boolean };

/** Footer legal links. The real pages come later; the accessibility link
 *  points at section 11 of this board. */
function Legal() {
  return (
    <nav className="wb-legal-links" aria-label="קישורים משפטיים">
      <a href="#">פרטיות</a>
      <a href="#">תנאי שימוש</a>
      <a href="#wb-s11">הצהרת נגישות</a>
    </nav>
  );
}

function S1({ d }: { d: BoardData }) {
  const c = d.counts;
  const groups: { g: string | null; items: NavItem[] }[] = [
    {
      g: null,
      items: [
        { label: "בית", icon: <House size={16} strokeWidth={2} aria-hidden="true" />, href: "#wb-s2", n: null },
        { label: "חיפוש", icon: <Search size={16} strokeWidth={2} aria-hidden="true" />, href: "#wb-s3", n: null, kbd: true },
      ],
    },
    {
      g: "מילון נתונים",
      items: [
        { label: "טבלאות", icon: <Table2 size={16} strokeWidth={2} aria-hidden="true" />, href: "#wb-s5", n: c.tables, unit: "טבלאות" },
        { label: "טרנזקציות", icon: <Terminal size={16} strokeWidth={2} aria-hidden="true" />, href: "#wb-s4", n: c.tcodes, unit: "טרנזקציות", active: true },
        { label: "BAPI ו-FM", icon: <Plug size={16} strokeWidth={2} aria-hidden="true" />, href: "#wb-s1", n: c.funcs, unit: "אובייקטי פונקציה במילון" },
        { label: "קשרי ER", icon: <GitBranch size={16} strokeWidth={2} aria-hidden="true" />, href: "#wb-s7", n: c.relations, unit: "קשרים" },
      ],
    },
    {
      g: "מודולים",
      items: c.modules.map((m) => ({ label: <ModChip m={m.code} he={m.he} />, href: "#wb-s1", n: m.tables, unit: "טבלאות" })),
    },
    {
      g: "ידע",
      items: [
        { label: "תהליכים", icon: <Workflow size={16} strokeWidth={2} aria-hidden="true" />, href: "#wb-s6", n: c.flows.length, unit: "שרשראות" },
        { label: "שיטות עבודה", icon: <ListChecks size={16} strokeWidth={2} aria-hidden="true" />, href: "#wb-s6", n: c.bp, unit: "שיטות" },
        { label: "ספרים", icon: <Library size={16} strokeWidth={2} aria-hidden="true" />, href: "#wb-s8", n: c.books, unit: "ספרים" },
        { label: "אקדמיה", icon: <GraduationCap size={16} strokeWidth={2} aria-hidden="true" />, href: "#wb-s9", n: null },
      ],
    },
  ];
  const top = [...d.catalog.rows].filter((r) => r.module === "PM").sort((a, b) => b.refs - a.refs).slice(0, 4);
  return (
    <Sec n={1} title="מעטפת" cap="מסגרת המחשב עם סרגל צד דק ושורת פקודה עליונה, ומסגרת טלפון עם ניווט תחתון. הקישורים בתוך המסגרות מובילים למקטעי הלוח.">
      <div className="wb-shells">
        <div className="wb-frame wb-frame--desk">
          <p className="wb-frame__label">מחשב · <bdi>1440px</bdi></p>
          <div className="wb-frame__scroll" role="region" aria-label="מסגרת מחשב" tabIndex={0}>
          <div className="wb-app">
            <header className="wb-app__bar">
              <span className="wb-wordmark"><bdi dir="ltr">SAP by Sali</bdi></span>
              <nav className="wb-crumbs" aria-label="מיקום">
                <span>עיון</span>
                <ChevronLeft size={14} strokeWidth={2} aria-hidden="true" />
                <span aria-current="page">טרנזקציות</span>
              </nav>
              <a className="wb-cmdbar" href="#wb-s3">
                <Search size={16} strokeWidth={2} aria-hidden="true" />
                <span className="wb-cmdbar__t">חיפוש או פקודה</span>
                <span className="wb-cmdbar__k" aria-hidden="true"><Kbd>Ctrl</Kbd><Kbd>K</Kbd></span>
              </a>
            </header>
            <div className="wb-app__body">
              <nav className="wb-side" aria-label="ניווט ראשי">
                {groups.map((grp, gi) => (
                  <div key={gi} className="wb-side__grp">
                    {grp.g ? <p className="wb-side__gl">{grp.g}</p> : null}
                    <ul>
                      {grp.items.map((it, ii) => (
                        <li key={ii}>
                          <a className="wb-side__item" href={it.href} aria-current={it.active ? "page" : undefined}>
                            {it.icon ?? null}
                            <span className="wb-side__label">{it.label}</span>
                            {it.n !== null ? (
                              <span className="wb-side__n"><Num n={it.n} /><span className="wb-sr"> {it.unit}</span></span>
                            ) : it.kbd ? (
                              <span className="wb-side__k" aria-hidden="true"><Kbd>Ctrl</Kbd><Kbd>K</Kbd></span>
                            ) : null}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
              <div className="wb-app__main">
                <div className="wb-app__title">
                  <h3 className="wb-h3">טרנזקציות</h3>
                  <span className="wb-muted"><Num n={c.tcodes} /> בקטלוג · ממוין לפי הפניות בגרף</span>
                </div>
                <table className="wb-table wb-table--mini">
                  <thead>
                    <tr><th scope="col">קוד</th><th scope="col">משמעות</th><th scope="col"><bdi>S/4HANA</bdi></th></tr>
                  </thead>
                  <tbody>
                    {top.map((r) => (
                      <tr key={r.code}>
                        <td><Code>{r.code}</Code></td>
                        <td className="wb-cell-he"><Bidi t={r.he} /></td>
                        <td><StatusChip s={r.status} compact /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <footer className="wb-app__foot">
              <span><bdi dir="ltr">SAP by Sali</bdi> · פיתוח: סאלי חליף</span>
              <Legal />
            </footer>
          </div>
          </div>
        </div>

        <div className="wb-frame wb-frame--phone">
          <p className="wb-frame__label">טלפון · <bdi>390px</bdi></p>
          <div className="wb-phone">
            <header className="wb-phone__bar">
              <span className="wb-wordmark"><bdi dir="ltr">SAP by Sali</bdi></span>
              <a className="wb-iconbtn" href="#wb-s3" aria-label="חיפוש">
                <Search size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </header>
            <div className="wb-phone__body">
              <a className="wb-hero-cmd wb-hero-cmd--phone" href="#wb-s3">
                <span className="wb-hero-cmd__label">מה צריך למצוא?</span>
                <span className="wb-hero-cmd__field">
                  <Search size={18} strokeWidth={2} aria-hidden="true" />
                  <span className="wb-hero-cmd__ph">קוד, שדה או מושג</span>
                </span>
              </a>
              <ul className="wb-entries wb-entries--compact">
                <li><a className="wb-entry" href="#wb-s5"><Table2 className="wb-entry__i" size={18} strokeWidth={2} aria-hidden="true" /><span className="wb-entry__name">טבלאות</span><Num n={c.tables} className="wb-entry__n" /></a></li>
                <li><a className="wb-entry" href="#wb-s4"><Terminal className="wb-entry__i" size={18} strokeWidth={2} aria-hidden="true" /><span className="wb-entry__name">טרנזקציות</span><Num n={c.tcodes} className="wb-entry__n" /></a></li>
                <li><a className="wb-entry" href="#wb-s8"><Library className="wb-entry__i" size={18} strokeWidth={2} aria-hidden="true" /><span className="wb-entry__name">ספרים</span><Num n={c.books} className="wb-entry__n" /></a></li>
              </ul>
              <footer className="wb-phone__foot">
                <span><bdi dir="ltr">SAP by Sali</bdi> · פיתוח: סאלי חליף</span>
                <Legal />
              </footer>
            </div>
            <nav className="wb-tabbar" aria-label="ניווט תחתון">
              <a href="#wb-s2" aria-current="page"><House size={20} strokeWidth={2} aria-hidden="true" /><span>בית</span></a>
              <a href="#wb-s3"><Search size={20} strokeWidth={2} aria-hidden="true" /><span>חיפוש</span></a>
              <a href="#wb-s1"><Workflow size={20} strokeWidth={2} aria-hidden="true" /><span>ניווט</span></a>
              <a href="#wb-s8"><Library size={20} strokeWidth={2} aria-hidden="true" /><span>ספרייה</span></a>
            </nav>
          </div>
        </div>
      </div>
    </Sec>
  );
}

/* ================================================================== 02 */

function S2({ d }: { d: BoardData }) {
  const c = d.counts;
  const pm = c.modules.find((m) => m.code === "PM");
  const pp = c.modules.find((m) => m.code === "PP-PI");
  const entries: { icon: ReactNode; name: string; n: number; sub: ReactNode; href: string }[] = [
    {
      icon: <GitBranch size={18} strokeWidth={2} aria-hidden="true" />, name: "מודולים", n: c.modules.length, href: "#wb-s1",
      sub: <><bdi>PM</bdi>: <Num n={pm?.tables ?? 0} /> טבלאות · <bdi>PP-PI</bdi>: <Num n={pp?.tables ?? 0} /> טבלאות</>,
    },
    {
      icon: <Workflow size={18} strokeWidth={2} aria-hidden="true" />, name: "תהליכים", n: c.flows.length, href: "#wb-s6",
      sub: <>{c.flows.map((f, i) => <span key={f.key}>{i ? " · " : ""}שרשרת <bdi>{f.key}</bdi>: <Num n={f.steps} /> שלבים</span>)}</>,
    },
    {
      icon: <Table2 size={18} strokeWidth={2} aria-hidden="true" />, name: "טבלאות", n: c.tables, href: "#wb-s5",
      sub: <><Num n={c.fields} /> שדות מתועדים · <Num n={c.shared} /> טבלאות משותפות ל-<bdi>PM</bdi> ול-<bdi>PP-PI</bdi></>,
    },
    {
      icon: <Terminal size={18} strokeWidth={2} aria-hidden="true" />, name: "טרנזקציות", n: c.tcodes, href: "#wb-s4",
      sub: <><Num n={c.tcodesDict} /> קודים ממופים בשני מילוני הנתונים</>,
    },
    {
      icon: <Library size={18} strokeWidth={2} aria-hidden="true" />, name: "ספרים", n: c.books, href: "#wb-s8",
      sub: <><Num n={c.chapters} /> פרקים · <Num n={c.sections} /> סעיפים</>,
    },
    {
      icon: <ListChecks size={18} strokeWidth={2} aria-hidden="true" />, name: "שיטות עבודה", n: c.bp, href: "#wb-s6",
      sub: <><Num n={c.bpProcess} /> מהן מתעדות תהליך שלם</>,
    },
  ];
  return (
    <Sec n={2} title="בית" cap="משפט זהות אחד, החיפוש כפעולה הראשית, כניסות עם מספרים אמיתיים, ומקומות להמשך שנשארים ריקים עד שיש מה להמשיך.">
      <div className="wb-screen wb-home">
        <div className="wb-home__hero">
          <p className="wb-home__id">
            SAP by Sali הוא מאגר ידע מקצועי בעברית על <bdi>SAP</bdi>, עם דגש על המעבר מ-<bdi>ECC</bdi> ל-<bdi>S/4HANA</bdi> במודולים <bdi>PM</bdi> ו-<bdi>PP-PI</bdi>.
          </p>
          <a className="wb-hero-cmd" href="#wb-s3">
            <span className="wb-hero-cmd__label">מה צריך למצוא?</span>
            <span className="wb-hero-cmd__field">
              <Search size={20} strokeWidth={2} aria-hidden="true" />
              <span className="wb-hero-cmd__ph">קוד טבלה או טרנזקציה, שם שדה, או מושג בעברית</span>
              <span className="wb-hero-cmd__k" aria-hidden="true"><Kbd>Ctrl</Kbd><Kbd>K</Kbd></span>
            </span>
          </a>
          <p className="wb-home__try">
            <span className="wb-muted">לדוגמה</span>
            <a href="#wb-s3"><Code>AFKO</Code></a>
            <a href="#wb-s5"><Code>IP30H</Code></a>
            <a href="#wb-s4"><Code>IW31</Code></a>
          </p>
        </div>
        <div className="wb-home__grid">
          <section className="wb-panel" aria-labelledby="wb-home-entries">
            <h3 className="wb-h3" id="wb-home-entries">כניסות</h3>
            <ul className="wb-entries">
              {entries.map((e) => (
                <li key={e.name}>
                  <a className="wb-entry" href={e.href}>
                    <span className="wb-entry__i">{e.icon}</span>
                    <span className="wb-entry__name">{e.name}</span>
                    <Num n={e.n} className="wb-entry__n" />
                    <span className="wb-entry__sub">{e.sub}</span>
                    <ChevronLeft className="wb-entry__go" size={16} strokeWidth={2} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <div className="wb-home__side">
            <section className="wb-panel" aria-labelledby="wb-home-cont">
              <h3 className="wb-h3" id="wb-home-cont">להמשיך</h3>
              <div className="wb-slot">
                <Clock size={18} strokeWidth={2} aria-hidden="true" />
                <p>המשך מופיע כאן רק אחרי שפותחים רשומה, פרק או שיעור במכשיר הזה. כרגע אין מה להמשיך.</p>
              </div>
            </section>
            <section className="wb-panel" aria-labelledby="wb-home-recent">
              <h3 className="wb-h3" id="wb-home-recent">אחרונים</h3>
              <div className="wb-slot">
                <History size={18} strokeWidth={2} aria-hidden="true" />
                <p>עדיין לא נפתח כאן דבר. פריטים שנפתחים במכשיר הזה יופיעו לפי סדר הפתיחה.</p>
              </div>
            </section>
            <section className="wb-panel" aria-labelledby="wb-home-pin">
              <h3 className="wb-h3" id="wb-home-pin">מוצמדים</h3>
              <div className="wb-slot">
                <Pin size={18} strokeWidth={2} aria-hidden="true" />
                <p>אין פריטים מוצמדים. הצמדה נעשית מכותרת של רשומה.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Sec>
  );
}

/* ================================================================== 03 */

function S3({ d }: { d: BoardData }) {
  return (
    <Sec n={3} title="חיפוש" cap="לוח הפקודות פתוח על השאילתה AFKO. התוצאות מקובצות לפי סוג, לכל שורה סטטוס S/4HANA, והמקלדת מזיזה את ההדגשה.">
      <div className="wb-stage">
        <div className="wb-stage__app" aria-hidden="true">
          <span className="wb-wordmark"><bdi dir="ltr">SAP by Sali</bdi></span>
          <span className="wb-stage__crumb">עיון · טבלאות</span>
        </div>
        <Palette data={d.search} uid="wb-pal-a" />
      </div>
      <p className="wb-note">
        הקבוצות: התאמה לשם הטבלה, טרנזקציות שה-blueprint ממפה ל-<bdi>AFKO</bdi>, תצוגות <bdi>CDS</bdi> שקוראות ממנה, וטבלאות בקשר <bdi>ER</bdi> איתה. בכל קבוצה עד חמש שורות, והמספר ליד שם הקבוצה הוא הסך האמיתי.
      </p>
    </Sec>
  );
}

/* ================================================================== 04 */

function S4({ d }: { d: BoardData }) {
  return (
    <Sec n={4} title="קטלוג" cap="קטלוג הטרנזקציות כרשימה ופאנל תצוגה מקדימה. חיפוש, מסננים פעילים, מיון ומונה תוצאות, על עשר שורות אמיתיות.">
      <div className="wb-screen">
        <Catalog data={d.catalog} />
      </div>
    </Sec>
  );
}

/* ================================================================== 05 */

function RecHead({
  kind, mods, context, code, he, en, status, level, meta, jumps, headId,
}: {
  kind: string; mods: string[]; context: ReactNode; code: string; he: string; en: string;
  status: BoardData["txRec"]["status"]; level: BoardData["txRec"]["level"]; meta: ReactNode;
  jumps: [string, string][]; headId: string;
}) {
  return (
    <header className="wb-rec__head">
      <p className="wb-kind">
        <span>{kind}</span>
        {mods.map((m) => <ModChip key={m} m={m} />)}
        <span className="wb-kind__ctx">{context}</span>
      </p>
      <div className="wb-rec__idline">
        <Code className="wb-rec__code">{code}</Code>
        <CopyButton value={code} />
      </div>
      <h3 className="wb-rec__he" id={headId}><Bidi t={he} /></h3>
      {en ? <p className="wb-rec__en"><bdi dir="ltr">{en}</bdi></p> : <p className="wb-missing">שם באנגלית: לא מתועד במאגר</p>}
      <div className="wb-marks">
        <StatusChip s={status} />
        <LevelChip l={level} full />
        <span className="wb-meta">{meta}</span>
      </div>
      <nav className="wb-jump" aria-label={`קפיצה בתוך ${code}`}>
        {jumps.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>
    </header>
  );
}

function S5({ d }: { d: BoardData }) {
  const t = d.txRec;
  const a = d.tableRec;
  return (
    <Sec n={5} title="רשומה" cap="אותה תבנית כותרת לכל סוג: מזהה בשורה משלו עם העתקה, משמעות, מודול, סטטוס ורמת אימות. למטה IP30H ואחריה הטבלה AFKO.">
      <div className="wb-recs">
        <article className="wb-rec" aria-labelledby="wb-rec-tx">
          <RecHead
            headId="wb-rec-tx" kind="טרנזקציה" mods={[t.module]} context={<><Bidi t={t.moduleHe} /> · <Bidi t={t.area} /></>}
            code={t.code} he={t.he} en={t.en} status={t.status} level={t.level}
            meta={<><bdi className="wb-numv">{t.known}/{t.total}</bdi> עובדות מתועדות</>}
            jumps={[["#wb-ip30h-purpose", "מטרה"], ["#wb-ip30h-steps", "שלבים"], ["#wb-ip30h-tables", "טבלאות"]]}
          />
          <div className="wb-rec__grid">
            <div className="wb-rec__main">
              <section id="wb-ip30h-purpose" className="wb-rec__part">
                <h4 className="wb-h4">מטרה</h4>
                <p className="wb-read">{t.purpose ? <Bidi t={t.purpose} /> : "לא מתועד במאגר"}</p>
              </section>
              <section id="wb-ip30h-steps" className="wb-rec__part">
                <h4 className="wb-h4">שלבים</h4>
                {t.steps.length ? (
                  <ol className="wb-steps">
                    {t.steps.map((s, i) => (
                      <li key={i}><span className="wb-steps__n" aria-hidden="true">{i + 1}</span><span><Bidi t={s} /></span></li>
                    ))}
                  </ol>
                ) : <p className="wb-missing">לא מתועד במאגר</p>}
                {t.stepsFrom === "process" ? (
                  <p className="wb-note">רשימת הזרימה הטיפוסית ריקה ברשומה. השלבים לקוחים משורת התהליך של הרשומה, מחולקים לפי החצים שבה.</p>
                ) : null}
              </section>
              <section id="wb-ip30h-tables" className="wb-rec__part">
                <h4 className="wb-h4">טבלאות</h4>
                <div className="wb-tablewrap" role="region" aria-label="טבלאות של IP30H" tabIndex={0}>
                  <table className="wb-table">
                    <thead><tr><th scope="col">טבלה</th><th scope="col">משמעות</th><th scope="col">מצב ב-<bdi>S/4HANA</bdi></th><th scope="col">אמינות</th></tr></thead>
                    <tbody>
                      {t.tables.map((x) => (
                        <tr key={x.name}>
                          <td>{x.href ? <a className="wb-codelink" href={x.href}><Code>{x.name}</Code></a> : <Code>{x.name}</Code>}</td>
                          <td className="wb-cell-he">{x.he ? <Bidi t={x.he} /> : "לא מתועד במאגר"}</td>
                          <td className="wb-cell-he">{x.note ? <Bidi t={x.note} /> : "לא מתועד במאגר"}</td>
                          <td>{x.trust}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            <aside className="wb-rec__aside" aria-label="עובדות על IP30H">
              <dl className="wb-facts">
                <div><dt>מהדורה</dt><dd>{t.release ? <Code>{t.release}</Code> : "לא מתועד במאגר"}</dd></div>
                <div><dt>מקורות אימות</dt><dd><Num n={t.sources} /></dd></div>
                <div><dt>אומת לאחרונה</dt><dd><bdi className="wb-numv">{dmy(t.lastVerified)}</bdi></dd></div>
                <div><dt>יישום Fiori</dt><dd>{t.fiori ? <Bidi t={t.fiori} /> : "לא מתועד במאגר"}</dd></div>
                <div>
                  <dt>שגיאות מוכרות</dt>
                  <dd>{t.issues.length ? <ul className="wb-list">{t.issues.map((x) => <li key={x}><Bidi t={x} /></li>)}</ul> : "לא מתועד במאגר"}</dd>
                </div>
              </dl>
              <a className="wb-btn wb-btn--secondary" href={t.href}>לרשומה המלאה<ChevronLeft size={16} strokeWidth={2} aria-hidden="true" /></a>
            </aside>
          </div>
        </article>

        <article className="wb-rec" aria-labelledby="wb-rec-table">
          <RecHead
            headId="wb-rec-table" kind="טבלה" mods={a.mods} context={<>{a.shared ? "משותפת לשני המודולים" : null} · <Bidi t={a.zoneHe} /></>}
            code={a.name} he={a.he} en={a.en} status={a.status} level={a.level}
            meta={<><Num n={a.nFields} /> שדות · <Num n={a.rels} /> קשרים · <Num n={a.tx} /> טרנזקציות · <Num n={a.cds} /> תצוגות <bdi>CDS</bdi></>}
            jumps={[["#wb-afko-fields", "שדות"], ["#wb-s7", "קשרים"]]}
          />
          <section id="wb-afko-fields" className="wb-rec__part">
            <h4 className="wb-h4">שדות <span className="wb-muted">שישה מתוך <Num n={a.nFields} /></span></h4>
            <div className="wb-tablewrap" role="region" aria-label="שדות AFKO" tabIndex={0}>
              <table className="wb-table">
                <thead>
                  <tr><th scope="col">שדה</th><th scope="col">משמעות</th><th scope="col">סוג ואורך</th><th scope="col">מפתח</th><th scope="col">מתועד ב</th></tr>
                </thead>
                <tbody>
                  {a.fields.map((f) => (
                    <tr key={f.tech}>
                      <td><Code>{f.tech}</Code></td>
                      <td className="wb-cell-he"><Bidi t={f.he} /></td>
                      <td>{f.dt ? <Code>{`${f.dt}${f.len ? ` ${f.len}` : ""}`}</Code> : <span className="wb-missing">לא מתועד במאגר</span>}</td>
                      <td>
                        <span className="wb-keys">
                          {f.pk ? <span className="wb-key wb-key--pk">PK</span> : null}
                          {f.fk ? <span className="wb-key wb-key--fk">FK</span> : null}
                          {!f.pk && !f.fk ? <span className="wb-muted">אין</span> : null}
                        </span>
                      </td>
                      <td><span className="wb-mods">{f.mods.map((m) => <ModChip key={m} m={m} />)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="wb-note">
              מפתח ראשי: {a.pk.map((k) => <Code key={k} className="wb-code--chip">{k}</Code>)} · דירוג קישוריות <Num n={a.rank} /> מתוך <Num n={a.totalTables} /> טבלאות במילון.
            </p>
          </section>
        </article>
      </div>
    </Sec>
  );
}

/* ================================================================== 06 */

function S6({ d }: { d: BoardData }) {
  const b = d.bp;
  return (
    <Sec n={6} title="שיטת עבודה" cap="התחשבנות פקודות מתוך קטלוג שיטות העבודה: המטרה וחמשת הצעדים הראשונים, עם הקודים שכל צעד נוגע בהם.">
      <article className="wb-rec wb-bp" aria-labelledby="wb-bp-h">
        <header className="wb-rec__head">
          <p className="wb-kind"><span>שיטת עבודה</span><span className="wb-kind__ctx"><Bidi t={b.moduleHe} /></span></p>
          <h3 className="wb-rec__he" id="wb-bp-h"><Bidi t={b.he} /></h3>
          <p className="wb-rec__en"><bdi dir="ltr">{b.en}</bdi></p>
          <div className="wb-marks">
            <StatusChip s={b.status} />
            <LevelChip l={b.level} full />
            {b.filled !== null && b.total !== null ? (
              <span className="wb-meta"><bdi className="wb-numv">{b.filled}/{b.total}</bdi> שדות בפרופיל התהליך</span>
            ) : null}
          </div>
        </header>
        <div className="wb-rec__grid">
          <div className="wb-rec__main">
            <section className="wb-rec__part">
              <h4 className="wb-h4">מטרה</h4>
              <p className="wb-read"><Bidi t={b.purpose} /></p>
            </section>
            <section className="wb-rec__part">
              <h4 className="wb-h4">צעדים <span className="wb-muted">חמישה מתוך <Num n={b.totalSteps} /></span></h4>
              <ol className="wb-steps wb-steps--bp">
                {b.steps.map((s) => (
                  <li key={s.n}>
                    <span className="wb-steps__n" aria-hidden="true">{s.n}</span>
                    <div>
                      <p><Bidi t={s.he} /></p>
                      {s.xrefs.length ? (
                        <ul className="wb-xrefs" aria-label={`קודים בצעד ${s.n}`}>
                          {s.xrefs.map((x) => (
                            <li key={x.name}>
                              {x.href ? (
                                <a className="wb-xref" href={x.href}><span className="wb-xref__k">{x.kindHe}</span><Code>{x.name}</Code></a>
                              ) : (
                                <span className="wb-xref"><span className="wb-xref__k">{x.kindHe}</span><Code>{x.name}</Code></span>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>
          <aside className="wb-rec__aside" aria-label="מקור רשמי">
            <dl className="wb-facts">
              <div><dt>מקור רשמי</dt><dd>{b.reference ? <bdi dir="ltr">{b.reference.title}</bdi> : "לא אותר מקור רשמי"}</dd></div>
              <div><dt>רמת המקור</dt><dd>{b.reference ? <Bidi t={b.reference.level} /> : "לא מתועד במאגר"}</dd></div>
            </dl>
            <p className="wb-note">מעמד ה-<bdi>S/4HANA</bdi> של שיטת העבודה עצמה לא נקבע ברשומה, ולכן הוא מוצג כ״נדרש אימות נוסף״.</p>
            <a className="wb-btn wb-btn--secondary" href={b.href}>לכל שמונת הצעדים<ChevronLeft size={16} strokeWidth={2} aria-hidden="true" /></a>
          </aside>
        </div>
      </article>
    </Sec>
  );
}

/* ================================================================== 07 */

/** An edge label with its own backing, so it reads over the line. */
function EdgeLabel({ x, y, t, cls }: { x: number; y: number; t: string; cls: string }) {
  const w = Math.round(t.length * 7.4 + 12);
  return (
    <g className={cls}>
      <rect x={x - w / 2} y={y - 10} width={w} height={20} rx={3} />
      <text x={x} y={y + 4} textAnchor="middle" direction="ltr">{t}</text>
    </g>
  );
}

function ErdSvg({ e }: { e: BoardData["erd"] }) {
  const parent = e.rels.filter((r) => r.dir === "parent");
  const kids = e.rels.filter((r) => r.dir === "child").sort((a, b) => (a.kind === "unstated" ? 1 : 0) - (b.kind === "unstated" ? 1 : 0));
  // 320 user units wide: at a 390px phone the figure is ~320px, so 12.5-unit
  // labels render at 12px or more.
  const W = 320;
  const C = { x: 192, y: 150, w: 122, h: 88 };
  const P = { x: 192, y: 16, w: 122, h: 44 };
  const K = { x: 6, w: 104, h: 40, y0: 56, gap: 50 };
  const H = K.y0 + kids.length * K.gap + 4;
  const Label = EdgeLabel;
  return (
    <svg className="wb-erd__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="wb-erd-t wb-erd-d">
      <title id="wb-erd-t">AFKO והקשרים הישירים שלה</title>
      <desc id="wb-erd-d">
        {`טבלת ${e.name} במרכז. הורה: ${parent.map((r) => `${r.name} (${r.card || "קרדינליות לא צוינה"})`).join(", ")}. ילדים: ${kids.map((r) => `${r.name} (${r.card || "קרדינליות לא צוינה"})`).join(", ")}.`}
      </desc>
      {parent.map((r) => (
        <g key={r.name} className={`wb-erd__edge${r.kind === "unstated" ? " is-open" : ""}`}>
          <line x1={P.x + P.w / 2} y1={P.y + P.h} x2={C.x + C.w / 2} y2={C.y} />
        </g>
      ))}
      {kids.map((r, i) => (
        <g key={r.name} className={`wb-erd__edge${r.kind === "unstated" ? " is-open" : ""}`}>
          <line x1={C.x} y1={C.y + 14 + i * 12} x2={K.x + K.w} y2={K.y0 + i * K.gap + K.h / 2} />
        </g>
      ))}
      {parent.map((r) => {
        const mx = P.x + P.w / 2;
        const my = (P.y + P.h + C.y) / 2;
        return (
          <g key={`l-${r.name}`}>
            {r.card ? <Label x={mx} y={my} t={r.card} cls="wb-erd__lbl wb-erd__card" /> : null}
            {r.key ? <Label x={mx} y={my} t={r.key} cls="wb-erd__lbl wb-erd__key" /> : null}
          </g>
        );
      })}
      {kids.map((r, i) => {
        const mx = (C.x + K.x + K.w) / 2;
        const my = (C.y + 14 + i * 12 + K.y0 + i * K.gap + K.h / 2) / 2;
        return (
          <g key={`l-${r.name}`}>
            {r.card ? <Label x={mx} y={my} t={r.card} cls="wb-erd__lbl wb-erd__card" /> : null}
            {r.key ? <Label x={mx} y={my} t={r.key} cls="wb-erd__lbl wb-erd__key" /> : null}
          </g>
        );
      })}
      {parent.map((r) => (
        <g key={`n-${r.name}`} className="wb-erd__node">
          <rect x={P.x} y={P.y} width={P.w} height={P.h} rx={4} />
          <text className="wb-erd__code" x={P.x + P.w / 2} y={P.y + 19} textAnchor="middle" direction="ltr">{r.name}</text>
          <text className="wb-erd__sub" x={P.x + P.w / 2} y={P.y + 36} textAnchor="middle" direction="rtl">{`${r.fields} שדות`}</text>
        </g>
      ))}
      <g className="wb-erd__node wb-erd__sel">
        <rect x={C.x} y={C.y} width={C.w} height={C.h} rx={4} />
        <text className="wb-erd__code wb-erd__code--lg" x={C.x + C.w / 2} y={C.y + 32} textAnchor="middle" direction="ltr">{e.name}</text>
        <text className="wb-erd__sub" x={C.x + C.w / 2} y={C.y + 54} textAnchor="middle" direction="rtl">{`${e.fields} שדות · ${e.rels.length} קשרים`}</text>
        <text className="wb-erd__sub wb-erd__mono" x={C.x + C.w / 2} y={C.y + 74} textAnchor="middle" direction="ltr">{e.pk.join(" · ")}</text>
      </g>
      {kids.map((r, i) => (
        <g key={`n-${r.name}`} className="wb-erd__node">
          <rect x={K.x} y={K.y0 + i * K.gap} width={K.w} height={K.h} rx={4} />
          <text className="wb-erd__code" x={K.x + K.w / 2} y={K.y0 + i * K.gap + 17} textAnchor="middle" direction="ltr">{r.name}</text>
          <text className="wb-erd__sub" x={K.x + K.w / 2} y={K.y0 + i * K.gap + 33} textAnchor="middle" direction="rtl">{`${r.fields} שדות`}</text>
        </g>
      ))}
    </svg>
  );
}

function S7({ d }: { d: BoardData }) {
  const e = d.erd;
  const ordered = [...e.rels].sort((a, b) => (a.dir === b.dir ? 0 : a.dir === "parent" ? -1 : 1) || (a.kind === "unstated" ? 1 : 0) - (b.kind === "unstated" ? 1 : 0));
  return (
    <Sec n={7} title="ERD" cap="תת-גרף אמיתי: AFKO ושבעת הקשרים הישירים שלה ממילון הנתונים. קשר עם קרדינליות מוצהרת ברציף, קשר בלי קרדינליות במקווקו.">
      <ErdFrame>
        <div className="wb-erd__grid">
          <figure className="wb-erd__fig">
            <ErdSvg e={e} />
            <figcaption className="wb-note">מעלה הזרם מימין למעלה, הטבלה הנבחרת במרכז, מורד הזרם משמאל.</figcaption>
          </figure>
          <div className="wb-erd__side">
            <ul className="wb-legend" aria-label="מקרא">
              <li><svg width="40" height="12" aria-hidden="true"><line className="wb-legend__solid" x1="2" y1="6" x2="38" y2="6" /></svg>קשר עם קרדינליות מוצהרת במאגר</li>
              <li><svg width="40" height="12" aria-hidden="true"><line className="wb-legend__dash" x1="2" y1="6" x2="38" y2="6" /></svg>קשר רשום בלי קרדינליות, לא אומת</li>
              <li><span className="wb-legend__node" aria-hidden="true" />הטבלה הנבחרת, מסומנת בקו אדום</li>
            </ul>
            <div className="wb-tablewrap" role="region" aria-label="קשרי AFKO" tabIndex={0}>
              <table className="wb-table wb-table--dense">
                <thead>
                  <tr><th scope="col">טבלה</th><th scope="col">כיוון</th><th scope="col">קרדינליות</th><th scope="col" className="wb-erd__keycol">שדה JOIN</th></tr>
                </thead>
                <tbody>
                  {ordered.map((r) => (
                    <tr key={r.name}>
                      <td><Code>{r.name}</Code><span className="wb-cell-sub"><Bidi t={r.he} /></span></td>
                      <td>{r.dir === "parent" ? "הורה" : "בן"}</td>
                      <td>{r.card ? <Code>{r.card}</Code> : <span className="wb-muted">לא צוינה</span>}</td>
                      <td className="wb-erd__keycol">{r.key ? <Code>{r.key}</Code> : <span className="wb-muted">לא מתועד במאגר</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ErdFrame>
    </Sec>
  );
}

/* ================================================================== 08 */

function S8({ d }: { d: BoardData }) {
  const r = d.reader;
  const pct = Math.max(1, Math.round((r.pos / r.totalSections) * 100));
  return (
    <Sec n={8} title="ספרייה וקורא" cap="כל אחד-עשר הספרים כחפצים עם עובי לפי מספר העמודים, ואחריהם עמוד בקורא עם פסקה אמיתית אחת מתוך נתוני הספר.">
      <ul className="wb-shelf" aria-label={`מדף הספרים, ${d.shelf.length} ספרים`}>
        {d.shelf.map((b, i) => (
          <li key={b.id} className="wb-book" style={{ "--cloth": `var(--cloth-${(i % 12) + 1})`, "--thick": b.thick } as CSSProperties}>
            <div className="wb-cover">
              <span className={`wb-cover__band ${modClass(b.module)}`} aria-hidden="true" />
              <span className="wb-cover__mod"><bdi dir="ltr">{b.module}</bdi></span>
              <span className="wb-cover__title" dir={b.titleHe ? "rtl" : "ltr"}>{b.titleHe ?? b.title}</span>
              <span className="wb-cover__pub"><bdi dir="ltr">{b.publisher ?? ""}</bdi></span>
            </div>
            <div className="wb-book__meta">
              <ModChip m={b.module} />
              <span>{b.pages !== null ? <><Num n={b.pages} /> עמ׳</> : "עמודים לא מתועדים"}</span>
              <span><Num n={b.chapters} /> פרקים · <Num n={b.sections} /> סעיפים</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="wb-note">עובי כל ספר נגזר ממספר העמודים שלו ביחס לספר הדק והעבה במדף. לספר בלי מספר עמודים מתועד ניתן עובי אמצעי, והוא מסומן ״עמודים לא מתועדים״.</p>

      <article className="wb-reader" aria-labelledby="wb-reader-h">
        <header className="wb-reader__bar">
          <span className="wb-reader__book"><BookOpen size={16} strokeWidth={2} aria-hidden="true" /><bdi dir="ltr">{r.bookTitle}</bdi></span>
          <span className="wb-muted">פרק <Num n={r.chapterN} /> מתוך <Num n={r.chapters} /></span>
          <span className="wb-reader__prog">
            <span className="wb-meter" role="meter" aria-valuemin={1} aria-valuemax={r.totalSections} aria-valuenow={r.pos} aria-label="מיקום בספר">
              <span className="wb-meter__fill" style={{ "--p": `${pct}%` } as CSSProperties} />
            </span>
            <span className="wb-muted">סעיף <Num n={r.pos} /> מתוך <Num n={r.totalSections} /></span>
          </span>
        </header>
        <div className="wb-reader__page">
          <p className="wb-reader__eyebrow">פרק <Num n={r.chapterN} /></p>
          <h3 className="wb-reader__ch" id="wb-reader-h"><bdi dir="ltr">{r.chapterTitle}</bdi></h3>
          <p className="wb-reader__sec"><Code>{r.sectionId}</Code> <bdi dir="ltr">{r.sectionTitle}</bdi></p>
          {r.paragraph ? <p className="wb-reader__p"><Bidi t={r.paragraph} /></p> : <p className="wb-missing">לא נמצאה פסקה מתאימה בנתוני הספר.</p>}
          <p className="wb-reader__src">
            הפסקה מוצגת כפי שהיא בנתוני הספר, <Num n={r.paragraph.length} /> תווים. כותרות הפרק והסעיף מוצגות באנגלית כי לספר זה אין כותרות בעברית במאגר.
          </p>
        </div>
      </article>
    </Sec>
  );
}

/* ================================================================== 09 */

function S9({ d }: { d: BoardData }) {
  const l = d.lesson;
  return (
    <Sec n={9} title="אקדמיה" cap="שיעור עץ מוצר אחזקה מקורס PM: מה לומדים, התחלה או המשך, ותוכן עניינים מקומי של כל חלקי השיעור.">
      <article className="wb-lesson" aria-labelledby="wb-lesson-h">
        <header className="wb-rec__head">
          <p className="wb-kind"><span>אקדמיה</span><ModChip m={l.module} he={l.course} /><span className="wb-kind__ctx">פרק <Num n={l.chapterIndex} /> מתוך <Num n={l.chapterCount} />: <Bidi t={l.chapterTitle} /></span></p>
          <h3 className="wb-rec__he" id="wb-lesson-h"><Bidi t={l.title} /></h3>
          <p className="wb-meta-line">
            <span>רמה: {l.level}</span>
            <span><Num n={l.minutes} /> דקות קריאה</span>
            <span>שיעור <Num n={l.posInChapter} /> מתוך <Num n={l.chapterSize} /> בפרק</span>
            <span><Num n={l.globalIndex} /> מתוך <Num n={l.globalTotal} /> בקורס</span>
            <span className="wb-trust"><GraduationCap size={14} strokeWidth={2} aria-hidden="true" />{l.trust}</span>
          </p>
        </header>
        <div className="wb-lesson__grid">
          <div className="wb-lesson__main">
            <h4 className="wb-h4">מה תלמד</h4>
            <p className="wb-read">{l.objective ? <Md t={l.objective} /> : "לא מתועד במאגר"}</p>
            <div className="wb-actions">
              <a className="wb-btn wb-btn--primary" href={l.href}>התחלת השיעור<ChevronLeft size={16} strokeWidth={2} aria-hidden="true" /></a>
              <p className="wb-slot wb-slot--inline">
                <Clock size={16} strokeWidth={2} aria-hidden="true" />
                <span>״המשך מאיפה שעצרת״ מופיע כאן רק אם השיעור כבר נפתח במכשיר הזה.</span>
              </p>
            </div>
            <dl className="wb-facts wb-facts--row">
              <div><dt>השיעור הקודם</dt><dd>{l.prev ? <Bidi t={l.prev} /> : "אין"}</dd></div>
              <div><dt>השיעור הבא</dt><dd>{l.next ? <Bidi t={l.next} /> : "אין"}</dd></div>
              <div><dt>מקור</dt><dd>{l.source ? <Bidi t={l.source} /> : "לא מתועד במאגר"}</dd></div>
              <div><dt>נסקר לאחרונה</dt><dd><bdi className="wb-numv">{dmy(l.lastReviewed || null)}</bdi></dd></div>
            </dl>
          </div>
          <nav className="wb-ltoc" aria-label="תוכן השיעור">
            <p className="wb-ltoc__h">בשיעור הזה · <Num n={l.toc.length} /> חלקים</p>
            <ol>
              {l.toc.map((x) => (
                <li key={x.n} className={x.n === 1 ? "is-here" : undefined}>
                  <span className="wb-ltoc__n" aria-hidden="true">{pad(x.n)}</span>
                  <span className="wb-ltoc__t"><Bidi t={x.he} /></span>
                  <span className={`wb-ltoc__trust${x.verified ? " is-verified" : ""}`}>{x.trust}</span>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </article>
    </Sec>
  );
}

/* ================================================================== 10 */

const FAM_NOTE: Partial<Record<Fam, string>> = {
  removed: "כולל גם ״לא אסטרטגי״, למשל IP30: הסמל משותף, והמילה בכל שורה היא של המאגר.",
  new: "IP30H בקטע 05 נושאת את המצב הזה.",
};
const LVL_PATTERN: Record<Lvl, string> = { verified: "קו רציף", partial: "קו מקווקו", required: "קו מנוקד", conflict: "קו כפול" };

function FamRow({ fam, n, keys }: { fam: Fam; n: number; keys: { key: string; label: string; n: number }[] }) {
  return (
    <tr>
      <td><span className={`wb-st wb-st--${fam}`}><FamGlyph fam={fam} size={14} /><span className="wb-st__t">{FAM_HE[fam]}</span></span></td>
      <td>
        <ul className="wb-keylist">
          {keys.map((k) => <li key={k.key}><Bidi t={k.label} /> <span className="wb-muted"><Num n={k.n} /></span></li>)}
        </ul>
        {FAM_NOTE[fam] ? <p className="wb-cell-sub"><Bidi t={FAM_NOTE[fam] ?? ""} /></p> : null}
      </td>
      <td className="wb-num"><Num n={n} /></td>
    </tr>
  );
}

function S10({ d }: { d: BoardData }) {
  const five = d.dist.status.slice(0, 5);
  const extra = d.dist.status.slice(5);
  return (
    <Sec n={10} title="מערכת סטטוס" cap="חמשת מצבי S/4HANA וארבע רמות האימות. כל אחד עם סמל, מילה וצבע, ורמות האימות גם עם דפוס קו, כך שהם נקראים גם בלי צבע.">
      <div className="wb-status">
        <label className="wb-check">
          <input type="checkbox" className="wb-status__gray" />
          <span>הצגה בלי צבע</span>
        </label>
        <div className="wb-status__tables">
          <div className="wb-tablewrap" role="region" aria-label="מצבי S/4HANA" tabIndex={0}>
            <table className="wb-table">
              <caption>מצב <bdi>S/4HANA</bdi> · ערכי המאגר לפי משפחה, ומספר הטרנזקציות בקטלוג לכל ערך</caption>
              <thead><tr><th scope="col">משפחה</th><th scope="col">ערכי המאגר ומספר הטרנזקציות</th><th scope="col" className="wb-num">סך הכול</th></tr></thead>
              <tbody>
                {five.map((f) => <FamRow key={f.id} fam={f.id} n={f.n} keys={f.keys} />)}
                <tr className="wb-table__sub"><th scope="rowgroup" colSpan={3}>שני מצבים נוספים שהמאגר כבר משתמש בהם</th></tr>
                {extra.map((f) => <FamRow key={f.id} fam={f.id} n={f.n} keys={f.keys} />)}
              </tbody>
            </table>
          </div>
          <div className="wb-tablewrap" role="region" aria-label="רמות אימות" tabIndex={0}>
            <table className="wb-table">
              <caption>רמת אימות · סמל, מילה ודפוס קו</caption>
              <thead><tr><th scope="col">רמה</th><th scope="col">דפוס</th><th scope="col">ערכי המאגר ומספר הטרנזקציות</th><th scope="col" className="wb-num">סך הכול</th></tr></thead>
              <tbody>
                {d.dist.levels.map((l) => (
                  <tr key={l.id}>
                    <td><span className={`wb-lv wb-lv--${l.id}`}><LvlGlyph lvl={l.id} size={14} /><span className="wb-lv__t">{LVL_HE[l.id]}</span></span></td>
                    <td>{LVL_PATTERN[l.id]}</td>
                    <td>
                      <ul className="wb-keylist">
                        {l.keys.map((k) => <li key={k.key}><Bidi t={k.label} /> <span className="wb-muted"><Num n={k.n} /></span></li>)}
                      </ul>
                    </td>
                    <td className="wb-num"><Num n={l.n} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="wb-note">הספירה רצה על כל <Num n={d.dist.total} /> הטרנזקציות בקטלוג, לפי אותו בלוק ראיות שהרשומה עצמה מציגה.</p>
      </div>
    </Sec>
  );
}

/* ================================================================== 11 */

function Owner() {
  return <span className="wb-placeholder"><bdi dir="ltr">REQUIRES_OWNER_INPUT</bdi></span>;
}

function S11() {
  return (
    <Sec n={11} title="עמוד משפטי" cap="פריסה של הצהרת נגישות. כל פרט שרק בעל האתר יכול לספק מסומן כמקום ריק, בלי פרטי קשר או תאריכים מומצאים.">
      <div className="wb-screen wb-legal">
        <nav className="wb-legal__toc" aria-label="תוכן ההצהרה">
          <p className="wb-ltoc__h">בעמוד</p>
          <ol>
            <li><a href="#wb-leg-1">היקף ההצהרה</a></li>
            <li><a href="#wb-leg-2">רמת התאמה ותקן</a></li>
            <li><a href="#wb-leg-3">מגבלות ידועות</a></li>
            <li><a href="#wb-leg-4">פנייה בנושא נגישות</a></li>
          </ol>
        </nav>
        <article className="wb-legal__doc" aria-labelledby="wb-leg-h">
          <p className="wb-meta-line"><span>עודכן לאחרונה: <Owner /></span></p>
          <h3 className="wb-t-title" id="wb-leg-h">הצהרת נגישות</h3>
          <p className="wb-read">העמוד מתאר את מצב הנגישות של SAP by Sali. הנוסח הסופי ייכתב אחרי בדיקת נגישות, ועד אז הערכים החסרים מסומנים ולא ממולאים.</p>
          <h4 className="wb-h4" id="wb-leg-1">היקף ההצהרה</h4>
          <p className="wb-read">החלקים של האתר שההצהרה חלה עליהם: <Owner /></p>
          <h4 className="wb-h4" id="wb-leg-2">רמת התאמה ותקן</h4>
          <p className="wb-read">התקן, רמת ההתאמה ותאריך הבדיקה: <Owner /></p>
          <h4 className="wb-h4" id="wb-leg-3">מגבלות ידועות</h4>
          <p className="wb-read">רכיבים שעדיין אינם נגישים והחלופה לכל אחד מהם: <Owner /></p>
          <h4 className="wb-h4" id="wb-leg-4">פנייה בנושא נגישות</h4>
          <dl className="wb-facts wb-facts--card">
            <div><dt>רכז או רכזת נגישות</dt><dd><Owner /></dd></div>
            <div><dt>טלפון</dt><dd><Owner /></dd></div>
            <div><dt>דואר אלקטרוני</dt><dd><Owner /></dd></div>
            <div><dt>כתובת למשלוח</dt><dd><Owner /></dd></div>
          </dl>
        </article>
      </div>
    </Sec>
  );
}

/* ================================================================== 12 */

function S12({ d }: { d: BoardData }) {
  return (
    <Sec n={12} title="ריק ושגיאה" cap="מצב ריק עם משפט אחד ופעולה אחת, ושגיאה שאומרת מה קרה ומה אפשר לעשות, עם ניסיון חוזר.">
      <div className="wb-states">
        <section className="wb-panel wb-state" aria-labelledby="wb-empty-h">
          <p className="wb-kind"><span>קטלוג הטבלאות</span></p>
          <div className="wb-state__box">
            <SearchX className="wb-state__i" size={24} strokeWidth={2} aria-hidden="true" />
            <h3 className="wb-h3" id="wb-empty-h">לא נמצאו טבלאות מתאימות. נסה חיפוש אחר או נקה מסננים</h3>
            <div className="wb-actions">
              <DemoAction label="נקה מסננים" note="הדגמה: בגרסה הבנויה הפעולה מנקה את כל המסננים ומחזירה את הרשימה המלאה." primary />
              <span className="wb-muted">כל הטבלאות: <Num n={d.counts.tables} /></span>
            </div>
          </div>
        </section>
        <section className="wb-panel wb-state wb-state--error" aria-labelledby="wb-err-h">
          <p className="wb-kind"><span>קורא הספרים</span></p>
          <div className="wb-state__box">
            <CircleAlert className="wb-state__i" size={24} strokeWidth={2} aria-hidden="true" />
            <h3 className="wb-h3" id="wb-err-h">הפרק לא נטען</h3>
            <p>הטקסט של כל פרק נטען בנפרד, והטעינה הזאת לא הגיעה לדפדפן. תוכן העניינים עדיין זמין. אפשר לנסות שוב עכשיו.</p>
            <div className="wb-actions">
              <DemoAction label="נסה שוב" note="הדגמה: בגרסה הבנויה הפעולה מבקשת את הפרק שוב." primary icon={<RotateCw size={16} strokeWidth={2} aria-hidden="true" />} />
              <a className="wb-btn wb-btn--secondary" href="#wb-s8">לתוכן העניינים</a>
            </div>
          </div>
        </section>
      </div>
    </Sec>
  );
}

/* ================================================================== 13 */

function S13({ d }: { d: BoardData }) {
  return (
    <Sec n={13} title="תנועת חתימה" cap="פתיחת לוח הפקודות, הדגשה שעוברת עם המקלדת, ושורה שנפתחת לפאנל הפרטים. לחצו על שורת החיפוש, או העבירו אליה מיקוד והקישו Ctrl K.">
      <div className="wb-sig">
        <div className="wb-stage wb-stage--sig">
          <div className="wb-stage__app" aria-hidden="true">
            <span className="wb-wordmark"><bdi dir="ltr">SAP by Sali</bdi></span>
            <span className="wb-stage__crumb">בית</span>
          </div>
          <p className="wb-sig__label" aria-hidden="true">מה צריך למצוא?</p>
          <Palette data={d.search} uid="wb-pal-b" launcher />
          <p className="wb-sig__hint">
            <Kbd>Enter</Kbd> על שורת החיפוש פותח את הלוח. בתוכו <Kbd>↑</Kbd><Kbd>↓</Kbd> ו-<Kbd>Enter</Kbd>.
          </p>
        </div>
        <ol className="wb-sig__beats">
          <li><Code>140ms</Code><span>פתיחה: קנה מידה מ-<bdi>0.98</bdi> ל-<bdi>1</bdi> ודהייה פנימה, עם יציאה מהירה.</span></li>
          <li><Code>100ms</Code><span>מקלדת: <Kbd>↑</Kbd><Kbd>↓</Kbd> מחליפים את השורה המודגשת בדהייה חדה ופס אדום שנמתח.</span></li>
          <li><Code>160ms</Code><span><Kbd>Enter</Kbd>: השורה נפתחת לפאנל הפרטים שמחליק מכיוון הרשימה.</span></li>
        </ol>
        <p className="wb-sig__rm">
          <strong>בתנועה מופחתת:</strong> הלוח, ההדגשה והפאנל מופיעים מיד במצבם הסופי, והמיקוד והבחירה נשארים מסומנים בטבעת, בפס ובצבע.
        </p>
      </div>
    </Sec>
  );
}

/* ================================================================ page */

export default function Page() {
  const d = boardData();
  return (
    <div
      className={`rb rb-workbench ${plexHe.variable} ${plexLat.variable} ${plexMono.variable}`}
      data-mode="light"
      dir="rtl"
      lang="he"
      style={{ "--wb-font-ui": UI_STACK } as CSSProperties}
    >
      <header className="wb-top">
        <div className="wb-top__row">
          <div className="wb-top__id">
            <p className="wb-eyebrow">כיוון עיצוב · <bdi dir="ltr">SAP by Sali</bdi> · <bdi dir="ltr">Project NEO</bdi></p>
            <h1 className="wb-h1"><bdi dir="ltr">Knowledge Workbench</bdi></h1>
            <p className="wb-top__he">שולחן עבודה לידע SAP: החיפוש במרכז, המקלדת קודם, טבלאות ופאנלים במקום כרטיסים.</p>
          </div>
          <ModeToggle />
        </div>
        <nav className="wb-toc" aria-label="מקטעי הלוח">
          <ol>
            {SECTIONS.map(([n, t]) => (
              <li key={n}><a href={`#wb-s${n}`}><span className="wb-toc__n" aria-hidden="true">{pad(n)}</span>{t}</a></li>
            ))}
          </ol>
        </nav>
      </header>
      <main className="wb-main">
        <S0 d={d} />
        <S1 d={d} />
        <S2 d={d} />
        <S3 d={d} />
        <S4 d={d} />
        <S5 d={d} />
        <S6 d={d} />
        <S7 d={d} />
        <S8 d={d} />
        <S9 d={d} />
        <S10 d={d} />
        <S11 />
        <S12 d={d} />
        <S13 d={d} />
      </main>
      <footer className="wb-foot">
        <p><bdi dir="ltr">SAP by Sali</bdi> · <bdi dir="ltr">Project NEO</bdi> · פותח על ידי סאלי חליף</p>
        <p className="wb-muted">כל מספר, שם, סטטוס וקשר בלוח נקרא בזמן הבנייה דרך פונקציות הנתונים של האתר. ערך שחסר במאגר מוצג כ״לא מתועד במאגר״.</p>
        <p><a href="#wb-s0" className="wb-link"><ArrowUpLeft size={14} strokeWidth={2} aria-hidden="true" />לראש הלוח</a></p>
      </footer>
    </div>
  );
}
