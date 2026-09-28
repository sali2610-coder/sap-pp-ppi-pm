import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import {
  Accessibility, ArrowDown, ArrowLeft, ArrowRightLeft, Ban, BookOpen, CircleQuestionMark, ClipboardCheck, Compass,
  CornerDownLeft, Diff, GraduationCap, History, House, Layers, Library, ListFilter, Map as MapIcon, MapPin, Menu,
  Network, Plug, RefreshCw, RouteOff, Search, ShieldAlert, ShieldCheck, ShieldHalf, ShieldQuestionMark, Sigma,
  SquarePlus, Table2, Terminal, TriangleAlert, Waypoints, Workflow, X, Check, ArrowDownWideNarrow,
  type LucideIcon,
} from "lucide-react";
import { assistantHe, assistantLat, jbMono } from "@/app/fonts/fonts";
import { atlasBoard, modVar, type Board, type Crumb, type Five, type Lv, type Lvl, type RelNode, type St } from "./atlas-data";
import { AtlasMap } from "./atlas-map";
import { ModeRoot, ModeToggle } from "./mode";
import { CopyCode } from "./copy-code";
import "./board.css";

export const metadata: Metadata = {
  title: { absolute: "אטלס הידע · כיוון עיצוב · SAP by Sali" },
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------ small parts */

const fmt = (n: number) => n.toLocaleString("he-IL");
const vars = (o: Record<string, string>) => o as CSSProperties;
const N = ({ v }: { v: number }) => <bdi className="at-num">{fmt(v)}</bdi>;
const C = ({ c, className }: { c: string; className?: string }) => (
  <span className={`at-code${className ? ` ${className}` : ""}`} dir="ltr">{c}</span>
);
const En = ({ s }: { s: string }) => <bdi dir="ltr" lang="en">{s}</bdi>;
const MISSING = "לא מתועד במאגר";

/** A data title of the form "Hebrew (Latin words)": the trailing parenthetical becomes one LTR
 *  isolate, so a line break can never tear its brackets away from their text. Text unchanged. */
function HeEn({ s }: { s: string }) {
  const m = /^(.*\S)\s+(\([^()]*[A-Za-z][^()]*\))$/.exec(s);
  if (!m) return <>{s}</>;
  return <>{m[1]} <bdi dir="ltr">{m[2]}</bdi></>;
}

function ModChip({ m, he }: { m: string; he?: string }) {
  return (
    <span className="at-mod" style={vars({ "--m": modVar(m) })}>
      <span className="at-mod-sw" aria-hidden="true" />
      <C c={m} />
      {he ? <span className="at-mod-he">{he}</span> : null}
    </span>
  );
}

const FIVE: Record<Five, { he: string; Icon: LucideIcon; def: string }> = {
  keep: { he: "נשמרת", Icon: Check, def: "האובייקט קיים ב-S/4HANA והמאגר לא מתעד בו שינוי." },
  change: { he: "משתנה", Icon: Diff, def: "האובייקט קיים, אבל מבנה, התנהגות או היקף משתנים." },
  replace: { he: "מוחלפת", Icon: ArrowRightLeft, def: "יש יורש: טרנזקציה, טבלה או יישום Fiori אחרים." },
  removed: { he: "הוסרה", Icon: Ban, def: "לא זמין או לא אסטרטגי ב-S/4HANA לפי המקור." },
  verify: { he: "נדרש אימות", Icon: CircleQuestionMark, def: "אין במאגר הכרעה מבוססת; צריך לבדוק מול SAP." },
  new: { he: "חדשה", Icon: SquarePlus, def: "קיים רק ב-S/4HANA." },
  past: { he: "ECC בלבד", Icon: History, def: "הקשר היסטורי של ECC, בלי מקבילה ב-S/4HANA." },
};

function StatusTag({ st }: { st: St | null }) {
  if (!st) return <span className="at-st at-st--none">{`S/4HANA: ${MISSING}`}</span>;
  const { Icon, he } = FIVE[st.five];
  return (
    <span className={`at-st at-st--${st.five}`} title={he}>
      <Icon size={14} strokeWidth={2.25} aria-hidden="true" />
      <span>{st.label}</span>
    </span>
  );
}

const LVL: Record<Lvl, { he: string; Icon: LucideIcon; line: string; from: string }> = {
  verified: { he: "מאומת", Icon: ShieldCheck, line: "קו רציף", from: "מאומת מול תיעוד SAP רשמי או מול נתוני הפרויקט" },
  partial: { he: "חלקי", Icon: ShieldHalf, line: "קו מקווקו", from: "נתמך במקור משני, או הקשר ECC בלבד" },
  requires: { he: "דורש אימות", Icon: ShieldQuestionMark, line: "קו מנוקד", from: "נדרש אימות נוסף" },
  conflict: { he: "סתירה", Icon: ShieldAlert, line: "קו כפול", from: "מקורות סותרים" },
};

function LevelTag({ lv, detail = true }: { lv: Lv; detail?: boolean }) {
  const { Icon, he } = LVL[lv.lvl];
  return (
    <span className={`at-lv at-lv--${lv.lvl}`}>
      <Icon size={14} strokeWidth={2.25} aria-hidden="true" />
      <span className="at-lv-w">{he}</span>
      {detail && lv.label !== he ? <span className="at-lv-d">{lv.label}</span> : null}
    </span>
  );
}

function Crumbs({ items, label = "מיקום במפה" }: { items: Crumb[]; label?: string }) {
  return (
    <nav className="at-path" aria-label={label}>
      <ol>
        {items.map((c, i) =>
          c.fork ? (
            <li key={i} className="at-path-fork">
              {c.fork.map((f) => (
                <a key={f.label} href="#" style={vars({ "--m": modVar(f.mod ?? "") })}>
                  <span className="at-path-mk" aria-hidden="true" />
                  <C c={f.label} />
                </a>
              ))}
            </li>
          ) : c.current ? (
            <li key={i} aria-current="page" className="at-path-here">
              <MapPin size={16} aria-hidden="true" />
              {c.mono ? <C c={c.label} /> : c.label}
              <span className="at-path-tag">אתה כאן</span>
            </li>
          ) : (
            <li key={i} style={c.mod ? vars({ "--m": modVar(c.mod) }) : undefined} className={c.mod ? "is-mod" : undefined}>
              <a href="#">
                <span className="at-path-mk" aria-hidden="true" />
                {c.mono ? <C c={c.label} /> : c.label}
                {c.sub ? <span className="at-path-sub">{c.sub}</span> : null}
              </a>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

function RelItem({ r }: { r: RelNode }) {
  return (
    <li className={r.dashed ? "is-dashed" : undefined} style={vars({ "--m": modVar(r.mod ?? "") })}>
      <a href="#" className="at-rel">
        <span className="at-rel-top">
          <C c={r.code} className="at-rel-code" />
          <span className="at-rel-card">{r.rel}</span>
        </span>
        <span className="at-rel-he">{r.he ? <HeEn s={r.he} /> : MISSING}</span>
      </a>
    </li>
  );
}

function Strip({ up, self, down, upLabel = "מגיע מ", downLabel = "מוביל אל", empty }: {
  up: RelNode[]; self: ReactNode; down: RelNode[]; upLabel?: string; downLabel?: string; empty?: string;
}) {
  return (
    <div className="at-strip" role="group" aria-label="מקום ברשת: מעלה הזרם, האובייקט, מורד הזרם">
      <div className="at-strip-col at-strip-up">
        <p className="at-strip-h">{upLabel}</p>
        {up.length ? <ul>{up.map((r) => <RelItem key={r.code} r={r} />)}</ul> : <p className="at-strip-none">{empty ?? MISSING}</p>}
      </div>
      <div className="at-strip-self">
        <ArrowDown className="at-strip-arrow" size={18} aria-hidden="true" />
        {self}
        <ArrowDown className="at-strip-arrow" size={18} aria-hidden="true" />
      </div>
      <div className="at-strip-col at-strip-down">
        <p className="at-strip-h">{downLabel}</p>
        {down.length ? <ul>{down.map((r) => <RelItem key={r.code} r={r} />)}</ul> : <p className="at-strip-none">{MISSING}</p>}
      </div>
    </div>
  );
}

function Sec({ n, id, title, cap, children }: { n: number; id: string; title: string; cap: string; children: ReactNode }) {
  return (
    <section className="at-sec" id={id} aria-labelledby={`${id}-h`}>
      <header className="at-sec-h">
        <span className="at-sec-n" aria-hidden="true"><bdi>{String(n).padStart(2, "0")}</bdi></span>
        <div>
          <h2 id={`${id}-h`}>{title}</h2>
          <p className="at-cap">{cap}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

const Ph = ({ what }: { what: string }) => (
  <span className="at-ph"><C c="REQUIRES_OWNER_INPUT" /><span className="at-ph-w">{what}</span></span>
);

/* -------------------------------------------------------------- palette */

type Sw = [token: string, hex: string, he: string];
const PALETTE: Record<"light" | "dark", { groups: [string, Sw[]][] }> = {
  light: {
    groups: [
      ["משטחים", [["canvas", "#F4F6F5", "נייר אטלס"], ["surface", "#FFFFFF", "משטח"], ["sunken", "#EBF0EE", "שקוע"], ["paper", "#EEF3F1", "נייר מפה"]]],
      ["דיו", [["ink-1", "#11201F", "ראשי"], ["ink-2", "#4A5A58", "משני"], ["ink-3", "#556563", "מושתק"], ["code", "#1B3533", "מזהה"]]],
      ["קו, פעולה ומיקוד", [["line-1", "#D5DEDB", "מפריד"], ["line-2", "#738481", "גבול רכיב"], ["action", "#C8242B", "פעולה, אתה כאן"], ["link", "#0A5A78", "קישור"]]],
      ["סטטוס", [["keep", "#17693C", "נשמרת"], ["change", "#8A5300", "משתנה"], ["replace", "#1D5AA0", "מוחלפת"], ["removed", "#9A2A22", "הוסרה"], ["verify", "#556563", "נדרש אימות"]]],
    ],
  },
  dark: {
    groups: [
      ["משטחים", [["canvas", "#0B1316", "ים לילי"], ["surface", "#121C20", "משטח"], ["sunken", "#0E181B", "שקוע"], ["paper", "#0F1A1D", "נייר מפה"]]],
      ["דיו", [["ink-1", "#E2EBE9", "ראשי"], ["ink-2", "#9FB0AD", "משני"], ["ink-3", "#93A5A2", "מושתק"], ["code", "#CFE0DC", "מזהה"]]],
      ["קו, פעולה ומיקוד", [["line-1", "#23323A", "מפריד"], ["line-2", "#6A7E83", "גבול רכיב"], ["action", "#FF6166", "פעולה, אתה כאן"], ["link", "#79C3E3", "קישור"]]],
      ["סטטוס", [["keep", "#5DCB8C", "נשמרת"], ["change", "#E3A74A", "משתנה"], ["replace", "#86B4F2", "מוחלפת"], ["removed", "#F28B80", "הוסרה"], ["verify", "#93A5A2", "נדרש אימות"]]],
    ],
  },
};
const MODULE_HEX: [string, string, string][] = [
  ["PM", "#0E7A69", "#40C1A7"], ["PP-PI", "#1F63B6", "#74A9EE"], ["PP", "#5B7A12", "#AAC45A"], ["MM", "#B45A0E", "#E9A064"],
  ["QM", "#2F7D34", "#79C27D"], ["SD", "#1F7A55", "#5FC79A"], ["FI", "#3A5580", "#9AB0D6"], ["CO", "#8B5128", "#D49F78"],
  ["CS", "#8C6A00", "#D8B64E"], ["BATCH", "#7A6436", "#CDB88A"], ["CLASS", "#0B7590", "#5BC2DC"], ["IDOC", "#4B6A7D", "#9DB7C8"],
  ["PIPO", "#2E6C70", "#80C0C3"], ["HR", "#A04E2E", "#E4917A"], ["BW", "#56697A", "#A9B8C4"],
];

function Palette({ mode }: { mode: "light" | "dark" }) {
  return (
    <div className="at-pal" data-palette={mode}>
      <h3 className="at-h3">{mode === "light" ? "יום" : "לילה"}</h3>
      {PALETTE[mode].groups.map(([g, sws]) => (
        <div key={g} className="at-pal-g">
          <p className="at-pal-gh">{g}</p>
          <ul className="at-sws">
            {sws.map(([t, hex, he]) => (
              <li key={t} className="at-sw">
                <span className="at-sw-c" style={vars({ "--sw": `var(--${t})` })} aria-hidden="true" />
                <span className="at-sw-t"><C c={`--${t}`} /><span className="at-sw-he">{he}</span></span>
                <C c={hex} className="at-sw-hex" />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="at-pal-g">
        <p className="at-pal-gh">מקרא מודולים</p>
        <ul className="at-sws at-sws--mods">
          {MODULE_HEX.map(([m, l, d]) => (
            <li key={m} className="at-sw">
              <span className="at-sw-c" style={vars({ "--sw": modVar(m) })} aria-hidden="true" />
              <C c={m} />
              <C c={mode === "light" ? l : d} className="at-sw-hex" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ the board */

const SECTIONS = [
  "הכיוון", "מעטפת", "בית", "חיפוש", "קטלוג", "רשומה", "שיטת עבודה", "ERD", "ספרייה וקורא", "אקדמיה", "מערכת סטטוס",
  "עמוד משפטי", "ריק ושגיאה", "רגע חתימה",
];

export default function AtlasBoardPage() {
  const b = atlasBoard();
  const fonts = `${assistantHe.variable} ${assistantLat.variable} ${jbMono.variable}`;
  return (
    <ModeRoot className={`rb rb-atlas ${fonts}`}>
      <header className="at-top">
        <div className="at-top-row">
          <p className="at-top-id">
            <Compass size={20} aria-hidden="true" />
            <span>אטלס הידע</span>
            <span className="at-top-sub">כיוון עיצוב ללוח ההשוואה · SAP by Sali</span>
          </p>
          <ModeToggle />
        </div>
        <nav className="at-toc" aria-label="מקטעי הלוח">
          <ol>
            {SECTIONS.map((s, i) => (
              <li key={s}>
                <a href={`#s${i}`}>
                  <span className="at-toc-n"><bdi>{String(i).padStart(2, "0")}</bdi></span>
                  {s}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <S0 b={b} />
      <S1 b={b} />
      <S2 b={b} />
      <S3 b={b} />
      <S4 b={b} />
      <S5 b={b} />
      <S6 b={b} />
      <S7 b={b} />
      <S8 b={b} />
      <S9 b={b} />
      <S10 b={b} />
      <S11 />
      <S12 />
      <S13 b={b} />

      <footer className="at-foot">
        <p>SAP by Sali · פיתוח: Sali Halif</p>
        <p>כל מספר, שם וקשר בלוח נקרא מהנתונים של האתר. ערך שחסר במאגר מסומן «{MISSING}».</p>
      </footer>
    </ModeRoot>
  );
}

/* 0 · the direction ----------------------------------------------------- */

function S0({ b }: { b: Board }) {
  const TYPE: { tok: string; spec: string; cls: string; sample: ReactNode }[] = [
    { tok: "display", spec: "40 / 1.15 · 700", cls: "at-t-display", sample: b.counts.modules[0].he },
    { tok: "h1", spec: "32 / 1.2 · 700", cls: "at-t-h1", sample: b.afko.he },
    { tok: "h2", spec: "24 / 1.3 · 600", cls: "at-t-h2", sample: b.ip.he },
    { tok: "h3", spec: "20 / 1.35 · 600", cls: "at-t-h3", sample: b.bp.he.split(":")[0] },
    { tok: "reading", spec: "18 / 1.75 · 400", cls: "at-t-read", sample: b.ip.purpose },
    { tok: "body", spec: "16 / 1.65 · 400", cls: "at-t-body", sample: b.afko.changed },
    { tok: "ui", spec: "15 / 1.45 · 500", cls: "at-t-ui", sample: <>טבלאות <N v={b.catalog.rows[0].tables} /> · שכנים <N v={b.catalog.rows[0].neighbours} /> · הפניות בגרף <N v={b.catalog.rows[0].refs} /></> },
    { tok: "meta", spec: "13 / 1.4 · 500", cls: "at-t-meta", sample: b.ip.lv.label },
    { tok: "micro", spec: "12 / 1.35 · 500 (מינימום)", cls: "at-t-micro", sample: <>מקום <N v={b.afko.rank} /> מתוך <N v={b.afko.total} /> לפי מספר קשרים</> },
    { tok: "mono", spec: "15 / 1.4 · 500 · JetBrains Mono", cls: "at-t-mono", sample: <><C c={b.ip.code} /> <C c={`${b.afko.code}-${b.afko.fields[0].tech}`} /> <C c={b.search.groups.find((g) => g.kind === "bapi")?.rows[1]?.code ?? ""} /></> },
  ];
  return (
    <Sec n={0} id="s0" title="הכיוון: אטלס הידע" cap="השם, ההצהרה, לוח הצבעים ליום וללילה וסולם הטיפוגרפיה על תוכן אמיתי.">
      <div className="at-dir">
        <div className="at-dir-name">
          <p className="at-dir-title">אטלס הידע</p>
          <p className="at-dir-lat"><En s="Knowledge Atlas" /></p>
          <p className="at-dir-note">המאגר כמפה אחת: מודול, תהליך, טבלה, טרנזקציה וספר הם צמתים, וכל עמוד מראה איפה הוא יושב ומה סביבו.</p>
        </div>
        <dl className="at-statement">
          <div><dt>מושג</dt><dd>רשת אחת של ידע. כל עמוד פותח במקומו ברשת: מאיפה מגיעים אליו, לאן הוא מוביל, ובאיזה מודול ותהליך הוא יושב.</dd></div>
          <div><dt>טיפוגרפיה</dt><dd>Assistant לממשק ולקריאה במשקלים 400 עד 700; JetBrains Mono רק למזהי SAP, מבודדים משמאל לימין.</dd></div>
          <div><dt>צבע</dt><dd>נייר אטלס קריר ודיו כהה בגוון ים; אדום המותג רק לפעולה ול«אתה כאן»; צבעי מודול הם מקרא המפה, וצבעי סטטוס שמורים לסטטוס.</dd></div>
          <div><dt>צורה, צפיפות ותנועה</dt><dd>צמתים מלבניים ברדיוס 6 בחיבורי קו דק, צפיפות רגועה, ותנועה מחברת שמציירת מסלול לפי סדר המשמעות ואינה חוזרת.</dd></div>
        </dl>
      </div>
      <div className="at-pals">
        <Palette mode="light" />
        <Palette mode="dark" />
      </div>
      <div className="at-type">
        <h3 className="at-h3">סולם הטיפוגרפיה</h3>
        <ul>
          {TYPE.map((t) => (
            <li key={t.tok}>
              <span className="at-type-spec"><C c={t.tok} /><bdi>{t.spec}</bdi></span>
              <span className={t.cls}>{t.sample}</span>
            </li>
          ))}
        </ul>
      </div>
    </Sec>
  );
}

/* 1 · shell ------------------------------------------------------------- */

function S1({ b }: { b: Board }) {
  const c = b.counts;
  const pm = c.modules.find((m) => m.code === "PM")!;
  const pp = c.modules.find((m) => m.code === "PP-PI")!;
  const NAV: { Icon: LucideIcon; label: ReactNode; count?: ReactNode; mod?: string; here?: boolean }[] = [
    { Icon: House, label: "בית" },
    { Icon: MapIcon, label: "מפת הידע", count: <><N v={c.erdModules} /> מודולים</> },
    { Icon: Layers, label: <><C c="PM" /> תחזוקת מפעל</>, count: <><N v={pm.tables} /> טבלאות</>, mod: "PM" },
    { Icon: Layers, label: <><C c="PP-PI" /> תעשיות תהליכיות</>, count: <><N v={pp.tables} /> טבלאות</>, mod: "PP-PI" },
    { Icon: Table2, label: "טבלאות", count: <N v={c.dictTables} />, here: true },
    { Icon: Terminal, label: "טרנזקציות", count: <N v={c.tx} /> },
    { Icon: Workflow, label: "תהליכים", count: <N v={c.processes} /> },
    { Icon: ClipboardCheck, label: "שיטות עבודה", count: <N v={c.bp} /> },
    { Icon: Library, label: "ספרייה", count: <><N v={c.books} /> ספרים</> },
    { Icon: Network, label: <C c="ERD" />, count: <><N v={c.erdEdges} /> קשרים</> },
    { Icon: ArrowRightLeft, label: "מרכז S/4HANA", count: <><N v={c.s4Marked} /> טבלאות מסומנות</> },
  ];
  const TABS: { Icon: LucideIcon; he: string; here?: boolean }[] = [
    { Icon: House, he: "בית", here: true }, { Icon: MapIcon, he: "מפה" }, { Icon: Search, he: "חיפוש" }, { Icon: Library, he: "ספרייה" }, { Icon: Menu, he: "עוד" },
  ];
  const legal = (
    <ul className="at-legal-links">
      <li><a href="#">פרטיות</a></li>
      <li><a href="#">תנאי שימוש</a></li>
      <li><a href="#">הצהרת נגישות</a></li>
    </ul>
  );
  return (
    <Sec n={1} id="s1" title="מעטפת" cap="מסגרת מחשב עם קו ניווט, חיפוש וספירות אמיתיות, ומסגרת טלפון עם ניווט תחתון.">
      <div className="at-frames">
        <div className="at-desk" role="group" aria-label="מסגרת מחשב (דוגמה)">
          <div className="at-desk-bar">
            <span className="at-brand"><Compass size={18} aria-hidden="true" /> SAP by Sali</span>
            <button type="button" className="at-searchbtn">
              <Search size={16} aria-hidden="true" />
              <span>חיפוש קוד, טבלה, תהליך או ספר</span>
              <span className="at-kbds" aria-hidden="true"><kbd>Ctrl</kbd><kbd>K</kbd></span>
            </button>
          </div>
          <div className="at-desk-body">
            <div className="at-rail" role="group" aria-label="ניווט ראשי (דוגמה)">
              <p className="at-rail-h">קו הניווט</p>
              <ol>
                {NAV.map((it, i) => (
                  <li key={i} className={it.here ? "is-here" : undefined} style={it.mod ? vars({ "--m": modVar(it.mod) }) : undefined}>
                    <a href="#" aria-current={it.here ? "page" : undefined}>
                      <span className="at-rail-st" aria-hidden="true" />
                      <it.Icon size={16} aria-hidden="true" />
                      <span className="at-rail-l">{it.label}</span>
                      {it.count ? <span className="at-rail-c">{it.count}</span> : null}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="at-desk-main">
              <Crumbs label="מיקום במפה (דוגמה)" items={[{ label: "מפת הידע" }, { label: "טבלאות", current: true }]} />
              <p className="at-desk-title">טבלאות</p>
              <p className="at-desk-sub"><N v={c.dictTables} /> טבלאות · <N v={c.fields} /> שדות · <N v={c.relations} /> קשרים במילון הנתונים</p>
              <ul className="at-desk-rows">
                <li><C c={b.afko.code} /><span>{b.afko.he}</span><span className="at-meta"><N v={b.afko.deg} /> קשרים</span></li>
                {b.afko.upstream.concat(b.afko.downstream).slice(0, 2).map((r) => (
                  <li key={r.code}><C c={r.code} /><span>{r.he}</span><span className="at-meta">{r.rel}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="at-desk-foot">
            {legal}
            <p>SAP by Sali · Sali Halif</p>
          </div>
        </div>

        <div className="at-phone" role="group" aria-label="מסגרת טלפון, 390 פיקסלים (דוגמה)">
          <div className="at-phone-bar">
            <span className="at-brand"><Compass size={18} aria-hidden="true" /> SAP by Sali</span>
            <button type="button" className="at-iconbtn" aria-label="חיפוש"><Search size={20} aria-hidden="true" /></button>
          </div>
          <div className="at-phone-body">
            <p className="at-phone-id">מאגר ידע בעברית על SAP, עם דגש על המעבר ל-S/4HANA.</p>
            <button type="button" className="at-searchbtn at-searchbtn--full">
              <Search size={16} aria-hidden="true" />
              <span>חיפוש במאגר</span>
            </button>
            <ul className="at-phone-rows">
              <li style={vars({ "--m": modVar("PM") })}><span className="at-rail-st" aria-hidden="true" /><C c="PM" /> תחזוקת מפעל<span className="at-meta"><N v={pm.tables} /> טבלאות</span></li>
              <li style={vars({ "--m": modVar("PP-PI") })}><span className="at-rail-st" aria-hidden="true" /><C c="PP-PI" /> תעשיות תהליכיות<span className="at-meta"><N v={pp.tables} /> טבלאות</span></li>
              <li><span className="at-rail-st" aria-hidden="true" />טרנזקציות<span className="at-meta"><N v={c.tx} /></span></li>
            </ul>
            {legal}
          </div>
          <div className="at-tabs" role="group" aria-label="ניווט תחתון (דוגמה)">
            {TABS.map((t) => (
              <a key={t.he} href="#" className="at-tab" aria-current={t.here ? "page" : undefined}>
                <t.Icon size={20} aria-hidden="true" />
                <span>{t.he}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Sec>
  );
}

/* 2 · home -------------------------------------------------------------- */

function S2({ b }: { b: Board }) {
  const c = b.counts;
  const ENTRIES: { Icon: LucideIcon; he: string; v: number; sub: ReactNode }[] = [
    { Icon: Layers, he: "מודולים", v: c.modules.length, sub: <><C c="PM" /> ו-<C c="PP-PI" /> במילון · <N v={c.erdModules} /> במפה</> },
    { Icon: Workflow, he: "תהליכים", v: c.processes, sub: "רשומות עם פרופיל תהליך מלא" },
    { Icon: Table2, he: "טבלאות", v: c.dictTables, sub: <><N v={c.fields} /> שדות · <N v={c.relations} /> קשרים</> },
    { Icon: Terminal, he: "טרנזקציות", v: c.tx, sub: <><N v={c.dictTx} /> ממופות לטבלאות המילון</> },
    { Icon: BookOpen, he: "ספרים", v: c.books, sub: <><N v={c.bookSections} /> סעיפים</> },
    { Icon: ClipboardCheck, he: "שיטות עבודה", v: c.bp, sub: <><N v={c.bpCross} /> חוצות מודולים</> },
  ];
  return (
    <Sec n={2} id="s2" title="בית" cap="משפט זהות, חיפוש כפעולה הראשית, כניסות עם ספירות אמיתיות, ומפת הידע.">
      <div className="at-home">
        <p className="at-identity">
          SAP by Sali הוא מאגר ידע מקצועי בעברית על SAP, שמתמקד במעבר מ-ECC ל-S/4HANA בתחזוקת מפעל (<C c="PM" />) ובתעשיות תהליכיות (<C c="PP-PI" />) ובמה שמתחבר אליהן.
        </p>
        <div className="at-hsearch" role="search">
          <label htmlFor="at-home-q" className="at-sr">חיפוש במאגר</label>
          <Search size={20} aria-hidden="true" />
          <input id="at-home-q" type="search" placeholder="קוד טרנזקציה, טבלה, תהליך או ספר" autoComplete="off" />
          <span className="at-kbds" aria-hidden="true"><kbd>Ctrl</kbd><kbd>K</kbd></span>
          <button type="button" className="at-btn at-btn--primary">חיפוש</button>
        </div>
        <div className="at-continue">
          <MapPin size={18} aria-hidden="true" />
          <div>
            <p className="at-continue-h">המשך מהמקום שבו עצרת</p>
            <p className="at-continue-t">המקום הזה מתמלא רק אחרי שפותחים במכשיר הזה רשומה, ספר או שיעור. עדיין לא נפתח כאן דבר, ולכן אין מה להציג.</p>
          </div>
        </div>
        <ul className="at-entries">
          {ENTRIES.map((e) => (
            <li key={e.he}>
              <a href="#" className="at-entry">
                <e.Icon size={20} aria-hidden="true" />
                <span className="at-entry-he">{e.he}</span>
                <span className="at-entry-v"><N v={e.v} /></span>
                <span className="at-entry-sub">{e.sub}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="at-maphead">
          <h3 className="at-h3">מפת הידע</h3>
          <p className="at-meta">
            <N v={c.erdModules} /> מודולים, <N v={c.erdTables} /> טבלאות ו-<N v={c.erdEdges} /> קשרים בקטלוג ה-ERD. בחרו מסלול תהליך או מקדו מודול.
          </p>
        </div>
        <AtlasMap data={b.map} variant="home" uid="home-map" />
      </div>
    </Sec>
  );
}

/* 3 · search ------------------------------------------------------------ */

const KIND_ICON: Record<string, LucideIcon> = { table: Table2, tcode: Terminal, cds: Sigma, bapi: Plug };

function S3({ b }: { b: Board }) {
  const first = b.search.groups[0]?.rows[0];
  return (
    <Sec n={3} id="s3" title="חיפוש" cap="לוח הפקודות על AFKO: תוצאות לפי סוג, סטטוס S/4 לכל שורה, ומקשי מקלדת.">
      <div className="at-cmd" role="group" aria-label="לוח פקודות (דוגמה)">
        <div className="at-cmd-in">
          <Search size={20} aria-hidden="true" />
          <label htmlFor="at-cmd-q" className="at-sr">חיפוש</label>
          <input id="at-cmd-q" type="search" defaultValue="AFKO" dir="ltr" className="at-cmd-q" autoComplete="off" />
          <span className="at-cmd-count"><N v={b.search.groups.reduce((a, g) => a + g.rows.length, 0)} /> תוצאות</span>
          <button type="button" className="at-iconbtn" aria-label="ניקוי החיפוש"><X size={18} aria-hidden="true" /></button>
        </div>
        <div className="at-cmd-body">
          <div className="at-cmd-results">
            {b.search.groups.map((g) => {
              const Icon = KIND_ICON[g.kind] ?? Table2;
              return (
                <div key={g.kind} className="at-cmd-g">
                  <h3 className="at-cmd-gh"><Icon size={16} aria-hidden="true" />{g.he}<span className="at-meta"><N v={g.rows.length} /></span></h3>
                  <ul>
                    {g.rows.map((r) => (
                      <li key={r.code}>
                        <a href="#" className="at-cmd-row" aria-current={r === first ? "true" : undefined}>
                          <span className="at-cmd-r1">
                            <C c={r.code} className="at-cmd-code" />
                            {r.mods.map((m) => <ModChip key={m} m={m} />)}
                            <StatusTag st={r.st} />
                          </span>
                          <span className="at-cmd-r2">{r.he ? <HeEn s={r.he} /> : MISSING}{r.note ? <span className="at-cmd-note"> · {r.note}</span> : null}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <aside className="at-cmd-peek" aria-label="תצוגה מקדימה: AFKO">
            <p className="at-meta">תצוגה מקדימה</p>
            <p className="at-cmd-peek-t"><C c={b.afko.code} /></p>
            <p>{b.afko.he}</p>
            <ol className="at-mini-chain" aria-label="מקום ברשת">
              {b.afko.upstream.map((r) => <li key={r.code}><C c={r.code} /><span className="at-meta">{r.rel}</span></li>)}
              <li className="is-self"><C c={b.afko.code} /></li>
              <li><span className="at-meta"><N v={b.afko.downstream.length} /> טבלאות בנות</span></li>
            </ol>
            <p className="at-meta"><N v={b.afko.fieldTotal} /> שדות · <N v={b.afko.tx} /> טרנזקציות · <N v={b.afko.cds} /> תצוגות CDS</p>
          </aside>
        </div>
        <div className="at-cmd-keys" aria-label="מקשי מקלדת">
          <span><kbd>↑</kbd><kbd>↓</kbd> מעבר בין תוצאות</span>
          <span><kbd><CornerDownLeft size={14} aria-hidden="true" /><span className="at-sr">Enter</span></kbd> פתיחה</span>
          <span><kbd>Tab</kbd> הקבוצה הבאה</span>
          <span><kbd>Esc</kbd> סגירה</span>
        </div>
      </div>
    </Sec>
  );
}

/* 4 · catalog ----------------------------------------------------------- */

function S4({ b }: { b: Board }) {
  const k = b.catalog;
  return (
    <Sec n={4} id="s4" title="קטלוג" cap="טרנזקציות עם סינון, מסננים פעילים, מיון ומונה, ולכל שורה ספירת הקשרים שלה.">
      <div className="at-cat">
        <div className="at-cat-tools">
          <div className="at-field">
            <ListFilter size={18} aria-hidden="true" />
            <label htmlFor="at-cat-q" className="at-sr">סינון לפי קוד או שם</label>
            <input id="at-cat-q" type="search" placeholder="סינון לפי קוד או שם" autoComplete="off" />
          </div>
          <ul className="at-chips" aria-label="מסננים פעילים">
            {k.perModule.map((p) => (
              <li key={p.code} style={vars({ "--m": modVar(p.code) })}>
                <span className="at-chip">
                  <span className="at-mod-sw" aria-hidden="true" />
                  מודול: <C c={p.code} /> <span className="at-meta">(<N v={p.n} />)</span>
                  <button type="button" className="at-chip-x" aria-label={`הסרת המסנן ${p.code}`}><X size={14} aria-hidden="true" /></button>
                </span>
              </li>
            ))}
            <li><button type="button" className="at-btn at-btn--text">ניקוי המסננים</button></li>
          </ul>
          <div className="at-cat-meta">
            <p className="at-count" aria-live="polite"><b><N v={k.total} /></b> טרנזקציות · מוצגות <N v={k.rows.length} /> הראשונות</p>
            <button type="button" className="at-btn at-btn--quiet">
              <ArrowDownWideNarrow size={16} aria-hidden="true" />
              מיון: הפניות בגרף הקשרים
            </button>
          </div>
        </div>
        <table className="at-table">
          <caption className="at-sr">טרנזקציות במודולים PM ו-PP, ממוינות לפי מספר ההפניות בגרף הקשרים</caption>
          <thead>
            <tr>
              <th scope="col">קוד</th>
              <th scope="col">שם</th>
              <th scope="col">מודול</th>
              <th scope="col">S/4HANA</th>
              <th scope="col">קשרים ברשת</th>
            </tr>
          </thead>
          <tbody>
            {k.rows.map((r) => (
              <tr key={r.code}>
                <td data-l="קוד"><a href="#"><C c={r.code} className="at-cat-code" /></a></td>
                <td data-l="שם"><span className="at-cat-he"><HeEn s={r.he} /></span>{r.en ? <span className="at-cat-en"><En s={r.en} /></span> : null}</td>
                <td data-l="מודול"><ModChip m={r.module} /></td>
                <td data-l="S/4HANA"><StatusTag st={r.st} /></td>
                <td data-l="קשרים">
                  <span className="at-rels">
                    <span title="טבלאות"><Table2 size={14} aria-hidden="true" /><N v={r.tables} /><span className="at-sr"> טבלאות</span></span>
                    <span title="טרנזקציות שכנות"><Waypoints size={14} aria-hidden="true" /><N v={r.neighbours} /><span className="at-sr"> שכנים</span></span>
                    <span title="הפניות בגרף הקשרים"><Network size={14} aria-hidden="true" /><N v={r.refs} /><span className="at-sr"> הפניות</span></span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="at-note">ספירת השורות היא אמיתית: <N v={k.total} /> טרנזקציות במודולים <C c="PM" /> ו-<C c="PP" /> בקטלוג, והעשר המוצגות הן הראשונות לפי המיון.</p>
      </div>
    </Sec>
  );
}

/* 5 · record ------------------------------------------------------------ */

function S5({ b }: { b: Board }) {
  const ip = b.ip;
  const af = b.afko;
  return (
    <Sec n={5} id="s5" title="רשומה" cap="IP30H ו-AFKO: מזהה בשורה משלו, מקום ברשת, סטטוס, אימות, תהליך, טבלאות ושדות.">
      <article className="at-rec" aria-labelledby="rec-ip">
        <Crumbs items={ip.crumbs} label={`מיקום במפה: ${ip.code}`} />
        <Strip
          up={ip.upstream}
          down={ip.downstream}
          upLabel="מגיע מ (קודמת)"
          downLabel="מוביל אל (טבלאות)"
          self={<div className="at-self"><C c={ip.code} /><span><HeEn s={ip.he} /></span></div>}
        />
        <header className="at-rec-h">
          <p className="at-rec-kind"><Terminal size={16} aria-hidden="true" /> טרנזקציה</p>
          <div className="at-rec-code">
            <h3 id="rec-ip"><C c={ip.code} /></h3>
            <CopyCode code={ip.code} />
          </div>
          <p className="at-rec-he"><HeEn s={ip.he} /></p>
          <div className="at-rec-tags">
            <ModChip m={ip.module} he={ip.moduleHe} />
            <StatusTag st={ip.st} />
            <LevelTag lv={ip.lv} />
          </div>
          <p className="at-meta">
            אזור: {ip.area || MISSING} · גרסה: {ip.release ? <bdi>{ip.release}</bdi> : MISSING} · אומת לאחרונה: {ip.lastVerified ? <bdi>{ip.lastVerified}</bdi> : MISSING} · <N v={ip.sources} /> מקורות · <N v={ip.known} /> מתוך <N v={ip.total} /> עובדות מתועדות
          </p>
        </header>
        <div className="at-rec-grid">
          <div>
            <h4 className="at-h4">מטרה</h4>
            <p className="at-read">{ip.purpose || MISSING}</p>
            <h4 className="at-h4">תהליך, כפי שנרשם ברשומה</h4>
            <ol className="at-steps-line">
              {ip.process.map((s, i) => <li key={i}><span className="at-step-n"><bdi>{i + 1}</bdi></span>{s}</li>)}
            </ol>
            {ip.flowCount === 0 ? <p className="at-note">זרימת עבודה מפורטת צעד אחר צעד: {MISSING}.</p> : null}
            <h4 className="at-h4">בתהליכים</h4>
            <ul className="at-tags">{ip.processes.map((p) => <li key={p}><a href="#" className="at-tag"><Workflow size={14} aria-hidden="true" />{p}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="at-h4">טבלאות</h4>
            <ul className="at-mini-rows">
              {ip.tables.map((t) => (
                <li key={t.code}>
                  <C c={t.code} />
                  <span>{t.he}</span>
                  <span className="at-meta">{t.note || MISSING}</span>
                </li>
              ))}
            </ul>
            <h4 className="at-h4">יישום Fiori עוקב</h4>
            <p>{ip.fiori ? <En s={ip.fiori} /> : MISSING}</p>
            <h4 className="at-h4">שגיאות מוכרות</h4>
            <ul className="at-plain">{ip.issues.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="at-note">קשרי תהליך לטרנזקציות אחרות ברשומה של <C c={ip.code} />: {ip.neighbours ? <N v={ip.neighbours} /> : MISSING}.</p>
          </div>
        </div>
      </article>

      <article className="at-rec" aria-labelledby="rec-af">
        <Crumbs items={af.crumbs} label={`מיקום במפה: ${af.code}`} />
        <Strip
          up={af.upstream}
          down={af.downstream}
          upLabel="אב (מחזיקה את המפתח)"
          downLabel="בנות (מחזיקות מפתח זר)"
          self={<div className="at-self"><C c={af.code} /><span>{af.he}</span></div>}
        />
        <header className="at-rec-h">
          <p className="at-rec-kind"><Table2 size={16} aria-hidden="true" /> טבלה</p>
          <div className="at-rec-code">
            <h3 id="rec-af"><C c={af.code} /></h3>
            <CopyCode code={af.code} />
          </div>
          <p className="at-rec-he">{af.he} <span className="at-rec-en"><En s={af.en} /></span></p>
          <div className="at-rec-tags">
            {af.mods.map((m) => <ModChip key={m} m={m} />)}
            <StatusTag st={af.st} />
            <LevelTag lv={af.lv} />
          </div>
          <p className="at-meta">
            אזור: {af.zoneHe} · <N v={af.deg} /> קשרים, מקום <N v={af.rank} /> מתוך <N v={af.total} /> · <N v={af.tx} /> טרנזקציות · <N v={af.processes} /> תהליכים מפנים אליה
          </p>
        </header>
        <h4 className="at-h4">שדות · <N v={af.fields.length} /> מתוך <N v={af.fieldTotal} /></h4>
        <div className="at-scroll-x">
          <table className="at-table at-table--fields">
            <caption className="at-sr">{`שדות הטבלה ${af.code}: ${af.fields.length} מתוך ${af.fieldTotal}`}</caption>
            <thead>
              <tr><th scope="col">שדה</th><th scope="col">תיאור</th><th scope="col">סוג</th><th scope="col">אורך</th><th scope="col">מפתח</th><th scope="col">מודולים</th></tr>
            </thead>
            <tbody>
              {af.fields.map((f) => (
                <tr key={f.tech}>
                  <td><C c={f.tech} /></td>
                  <td>{f.he || MISSING}</td>
                  <td>{f.dt ? <C c={f.dt} /> : <span className="at-missing">{MISSING}</span>}</td>
                  <td>{f.len ? <bdi>{f.len}</bdi> : <span className="at-missing">{MISSING}</span>}</td>
                  <td>
                    <span className="at-keys">
                      {f.pk ? <span className="at-key">PK</span> : null}
                      {f.fk ? <span className="at-key at-key--fk">FK</span> : null}
                      {!f.pk && !f.fk ? <span className="at-meta">ללא</span> : null}
                    </span>
                  </td>
                  <td><span className="at-mods">{f.mods.map((m) => <ModChip key={m} m={m} />)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="at-note">שדה שהמאגר לא מתעד לו סוג או אורך מסומן «{MISSING}» ולא מושלם.</p>
      </article>
    </Sec>
  );
}

/* 6 · best practice ----------------------------------------------------- */

function S6({ b }: { b: Board }) {
  const p = b.bp;
  return (
    <Sec n={6} id="s6" title="שיטת עבודה" cap="התחשבנות פקודות: המסלול בין המודולים, המטרה וחמשת הצעדים הראשונים.">
      <article className="at-bp">
        <header>
          <p className="at-rec-kind"><ClipboardCheck size={16} aria-hidden="true" /> שיטת עבודה · {p.moduleHe}</p>
          <h3 className="at-bp-t">{p.he}</h3>
          <p className="at-bp-en"><En s={p.en} /></p>
          {p.route.length ? (
            <ol className="at-route-strip" aria-label="המודולים שהצעדים עוברים בהם">
              {p.route.map((m, i) => (
                <li key={m} style={vars({ "--m": modVar(m) })}>
                  <span className="at-route-n"><bdi>{i + 1}</bdi></span>
                  <C c={m} />
                </li>
              ))}
            </ol>
          ) : null}
        </header>
        <h4 className="at-h4">מטרה</h4>
        <p className="at-read">{p.purpose || MISSING}</p>
        <h4 className="at-h4">צעדים · <N v={Math.min(5, p.total)} /> מתוך <N v={p.total} /></h4>
        <ol className="at-bp-steps">
          {p.steps.map((s) => (
            <li key={s.n}>
              <span className="at-step-n"><bdi>{s.n}</bdi></span>
              <div>
                <p>{s.he}</p>
                {s.refs.length ? (
                  <ul className="at-refs" aria-label="אובייקטים בצעד">
                    {s.refs.map((r) => <li key={r.name}><span className="at-ref"><span className="at-ref-k">{r.kindHe}</span><C c={r.name} /></span></li>)}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        {p.reference ? (
          <p className="at-note">מקור רשמי לתהליך: <En s={p.reference.title} /> · <LevelTag lv={{ lvl: p.reference.official ? "verified" : "requires", label: p.reference.levelHe }} /></p>
        ) : null}
      </article>
    </Sec>
  );
}

/* 7 · ERD --------------------------------------------------------------- */

function S7({ b }: { b: Board }) {
  const e = b.erd;
  const W = 840, H = 470, CY = 235;
  const self = { x: 420, w: 220, h: 70 };
  const parentBox = { x: 700, w: 250, h: 54 };
  const childBox = { x: 125, w: 210, h: 50 };
  const parents = e.nodes.filter((n) => n.role === "parent");
  const edgeOf = (n: string) => e.edges.find((x) => x.p === n || x.c === n);
  const children = e.nodes.filter((n) => n.role === "child").sort((a, c) => Number(!!edgeOf(c.n)?.stated) - Number(!!edgeOf(a.n)?.stated) || a.n.localeCompare(c.n));
  const cy = (i: number, len: number, gap: number) => CY + (i - (len - 1) / 2) * gap;
  const center = e.nodes.find((n) => n.role === "self")!;
  const stated = e.edges.filter((x) => x.stated).length;
  const mods = [...new Set(e.nodes.map((n) => n.m).filter(Boolean))];

  const node = (n: (typeof e.nodes)[number], x: number, y: number, w: number, h: number, card: string) => (
    <g key={n.n} transform={`translate(${x - w / 2} ${y - h / 2})`} className="erd-node" style={vars({ "--m": modVar(n.m) })}>
      <rect className="erd-box" width={w} height={h} rx={6} />
      <rect className="erd-band" x={w - 8} y={10} width={3} height={h - 20} rx={1.5} />
      <text className="erd-name" x={w - 16} y={22} direction="ltr" textAnchor="end">{n.n}</text>
      <text className="erd-card" x={12} y={22} direction="rtl" textAnchor="end">{card}</text>
      <text className="erd-he" x={w - 16} y={40} direction="rtl" textAnchor="start">{n.he}</text>
      <text className="erd-mod" x={12} y={40} direction="ltr" textAnchor="start">{n.m}</text>
    </g>
  );

  return (
    <Sec n={7} id="s7" title="ERD" cap="AFKO וקשריה הישירים: קרדינליות מתועדת בקו רציף, חסרה בקו מקווקו, ומצב גלוי.">
      <div className="at-erd">
        <div className="at-erd-top">
          <div className="at-modes" role="group" aria-label="מצב התרשים">
            {["סקירה", "בחירה", "ניתוח"].map((m) => (
              <span key={m} className={m === "בחירה" ? "is-on" : undefined} aria-current={m === "בחירה" ? "true" : undefined}>{m}</span>
            ))}
          </div>
          <p className="at-erd-mode">מצב נוכחי: <b>בחירה</b> · <C c={center.n} /> נבחרה</p>
        </div>
        <div className="at-scroll-x at-erd-scroll">
          <svg className="erd-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="erd-t erd-d">
            <title id="erd-t">{`${center.n} וקשריה הישירים`}</title>
            <desc id="erd-d">{`${e.edges.length} קשרים: ${stated} עם קרדינליות מתועדת, ${e.edges.length - stated} בלי. אב: ${parents.map((p) => p.n).join(", ")}. בנות: ${children.map((c) => c.n).join(", ")}.`}</desc>
            <defs>
              <marker id="erd-arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 z" className="erd-arrow" />
              </marker>
            </defs>
            <rect className="erd-paper" width={W} height={H} rx={8} />
            {parents.map((p, i) => {
              const y = cy(i, parents.length, 70);
              const ed = edgeOf(p.n)!;
              return <path key={p.n} className={`erd-edge${ed.stated ? "" : " is-dashed"}`} d={`M${parentBox.x - parentBox.w / 2} ${y} C${parentBox.x - parentBox.w / 2 - 20} ${y} ${self.x + self.w / 2 + 20} ${CY} ${self.x + self.w / 2} ${CY}`} markerEnd="url(#erd-arr)" />;
            })}
            {children.map((c, i) => {
              const y = cy(i, children.length, 62);
              const ed = edgeOf(c.n)!;
              const x0 = self.x - self.w / 2, x1 = childBox.x + childBox.w / 2;
              return <path key={c.n} className={`erd-edge${ed.stated ? "" : " is-dashed"}`} d={`M${x0} ${CY} C${x0 - 34} ${CY} ${x1 + 34} ${y} ${x1} ${y}`} markerEnd="url(#erd-arr)" />;
            })}
            {parents.map((p, i) => node(p, parentBox.x, cy(i, parents.length, 70), parentBox.w, parentBox.h, edgeOf(p.n)?.card || "לא צוין"))}
            {children.map((c, i) => node(c, childBox.x, cy(i, children.length, 62), childBox.w, childBox.h, edgeOf(c.n)?.card || "לא צוין"))}
            <g transform={`translate(${self.x - self.w / 2} ${CY - self.h / 2})`} className="erd-node erd-self" style={vars({ "--m": modVar(center.m) })}>
              <rect className="erd-sel" x={-5} y={-5} width={self.w + 10} height={self.h + 10} rx={9} />
              <rect className="erd-box" width={self.w} height={self.h} rx={6} />
              <rect className="erd-band" x={self.w - 8} y={12} width={3} height={self.h - 24} rx={1.5} />
              <text className="erd-name erd-name--self" x={self.w - 16} y={30} direction="ltr" textAnchor="end">{center.n}</text>
              <text className="erd-he" x={self.w - 16} y={52} direction="rtl" textAnchor="start">{center.he}</text>
              <text className="erd-mod" x={12} y={30} direction="ltr" textAnchor="start">{center.m}</text>
            </g>
          </svg>
        </div>
        <p className="am-hint">במסך צר התרשים נגלל לצדדים בתוך המסגרת.</p>
        <ul className="at-erd-legend" aria-label="מקרא">
          <li><svg viewBox="0 0 48 12" aria-hidden="true"><line className="erd-edge" x1="2" x2="46" y1="6" y2="6" /></svg>קרדינליות מתועדת במאגר, <bdi>1:1</bdi> או <bdi>N:1</bdi> · <N v={stated} /></li>
          <li><svg viewBox="0 0 48 12" aria-hidden="true"><line className="erd-edge is-dashed" x1="2" x2="46" y1="6" y2="6" /></svg>קרדינליות לא צוינה במאגר, קשר לא מאומת · <N v={e.edges.length - stated} /></li>
          <li><svg viewBox="0 0 48 16" aria-hidden="true"><rect className="erd-sel" x="2" y="2" width="44" height="12" rx="3" /></svg>הטבלה הנבחרת</li>
          {mods.map((m) => <li key={m}><ModChip m={m} /></li>)}
        </ul>
        <p className="at-note">כיוון החץ: מהטבלה שמחזיקה את המפתח הראשי אל הטבלה שמחזיקה את המפתח הזר. <C c="CDS_AnalyticalView" /> היא צומת בקטלוג ה-ERD של <C c="BW" />, ואין לה עמוד טבלה במילון.</p>
      </div>
    </Sec>
  );
}

/* 8 · library and reader ------------------------------------------------ */

function S8({ b }: { b: Board }) {
  const s = b.shelf;
  const r = b.reader;
  let idx = 0;
  const total = r.chapters.reduce((a, c) => a + c.sections, 0);
  return (
    <Sec n={8} id="s8" title="ספרייה וקורא" cap="אחד-עשר הספרים ככרכי אטלס, ועמוד קורא עם כותרת, מיקום בספר ופסקה אמיתית.">
      <div className="at-shelf">
        <p className="at-meta"><N v={s.total} /> ספרים · <N v={s.chapters} /> פרקים · <N v={s.sections} /> סעיפים. עובי הכרך נגזר ממספר העמודים שלו.</p>
        <ul className="at-shelf-row">
          {s.groups.map((g) => (
            <li key={g.module} className="at-shelf-g" style={vars({ "--m": modVar(g.module) })}>
              <p className="at-shelf-h"><span className="at-mod-sw" aria-hidden="true" /><C c={g.module} /> {g.moduleHe}</p>
              <ul className="at-books">
                {g.books.map((bk) => {
                  const cloth = idx++ % 12;
                  return (
                    <li key={bk.id} style={vars({ "--thick": String(bk.thick) })}>
                      <a href="#" className="at-book" style={vars({ "--cloth": `var(--cloth-${cloth})` })}>
                        <span className="at-book-mod"><C c={g.module} /></span>
                        <span className="at-book-t" dir={bk.latin ? "ltr" : "rtl"} lang={bk.latin ? "en" : "he"}>{bk.title}</span>
                        <span className="at-book-m">
                          <span><N v={bk.chapters} /> פרקים · <N v={bk.sections} /> סעיפים</span>
                          <span>{bk.pages !== null ? <><N v={bk.pages} /> עמודים</> : "עמודים לא מתועדים"}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
        <p className="at-shelf-hint">במסך צר המדף נגלל לצדדים.</p>
        {s.twinNote ? <p className="at-note">{s.twinNote}</p> : null}
      </div>

      <article className="at-reader" aria-labelledby="reader-h">
        <header>
          <p className="at-meta"><BookOpen size={16} aria-hidden="true" /> <En s={r.bookTitle} /></p>
          <p className="at-reader-ch">פרק <N v={r.chapterN} /> · <En s={r.chapterTitle} /></p>
          <h3 id="reader-h" className="at-reader-h"><HeEn s={r.sectionTitle} /></h3>
        </header>
        <div className="at-bookmap" role="img" aria-label={`מיקום בספר: פרק ${r.chapterN} מתוך ${r.chapters.length}, סעיף ${r.position} מתוך ${r.bookSections}`}>
          {r.chapters.map((c) => (
            <span key={c.n} className={c.n === r.chapterN ? "is-here" : undefined} style={vars({ "--g": String(c.sections) })} />
          ))}
        </div>
        <p className="at-meta">פרק <N v={r.chapterN} /> מתוך <N v={r.chapters.length} /> · סעיף <bdi>{r.sectionId}</bdi> · <N v={r.position} /> מתוך <N v={total} /> סעיפים · רוחב כל פרק לפי מספר הסעיפים בו</p>
        {r.paragraph ? <p className="at-reading">{r.paragraph}</p> : <p className="at-missing">{MISSING}</p>}
        <footer className="at-reader-f">
          <a href="#" className="at-btn at-btn--quiet">הסעיף הבא<ArrowLeft size={16} aria-hidden="true" /></a>
        </footer>
      </article>
    </Sec>
  );
}

/* 9 · academy ----------------------------------------------------------- */

function S9({ b }: { b: Board }) {
  const l = b.lesson;
  if (!l) {
    return (
      <Sec n={9} id="s9" title="אקדמיה" cap="שיעור עץ מוצר אחזקה: מה תלמד, התחלה או המשך, ותוכן עניינים מקומי.">
        <p className="at-missing">{MISSING}</p>
      </Sec>
    );
  }
  return (
    <Sec n={9} id="s9" title="אקדמיה" cap="שיעור עץ מוצר אחזקה: מה תלמד, התחלה או המשך, ותוכן עניינים מקומי.">
      <article className="at-lesson">
        <Crumbs
          label="מיקום בקורס"
          items={[
            { label: "אקדמיה" },
            { label: l.module, sub: l.course, mod: l.module, mono: true },
            { label: `פרק ${l.chapterIndex} · ${l.chapterTitle}`, mod: l.module },
            { label: `שיעור ${l.pos} מתוך ${l.size}`, current: true },
          ]}
        />
        <div className="at-lesson-grid">
          <div>
            <h3 className="at-lesson-t">{l.title}</h3>
            <p className="at-rec-tags">
              <span className="at-tag"><GraduationCap size={14} aria-hidden="true" />{l.level}</span>
              <span className="at-tag"><bdi>{l.minutes}</bdi> דקות</span>
              <LevelTag lv={{ lvl: l.trustLvl, label: l.trust }} />
            </p>
            <h4 className="at-h4">מה תלמד</h4>
            <p className="at-read">{l.objective.replace(/\*\*/g, "") || MISSING}</p>
            <div className="at-lesson-go">
              <a href="#" className="at-btn at-btn--primary">התחלת השיעור<ArrowLeft size={16} aria-hidden="true" /></a>
              <p className="at-note">«המשך מהמקום שעצרת» מופיע כאן רק אם השיעור נפתח במכשיר הזה.</p>
            </div>
            <h4 className="at-h4">מקום בקורס · שיעור <N v={l.global} /> מתוך <N v={l.globalTotal} /></h4>
            <div className="at-ticks" role="img" aria-label={`שיעור ${l.global} מתוך ${l.globalTotal}`}>
              {Array.from({ length: l.globalTotal }, (_, i) => <span key={i} className={i + 1 === l.global ? "is-here" : i + 1 < l.global ? "is-before" : undefined} />)}
            </div>
            <h4 className="at-h4">שרשרת הטבלאות בשיעור</h4>
            <ol className="at-mini-chain at-chain">
              {l.tables.map((t) => <li key={t.code}><C c={t.code} /><span className="at-meta"><HeEn s={t.he} /></span></li>)}
            </ol>
            <p className="at-lesson-nav">
              {l.prev ? <a href="#">הקודם: {l.prev}</a> : null}
              {l.next ? <a href="#">הבא: {l.next}</a> : null}
            </p>
          </div>
          <nav className="at-ltoc" aria-label="תוכן השיעור">
            <p className="at-strip-h">תוכן השיעור · <N v={l.toc.length} /> חלקים</p>
            <ol>{l.toc.map((t, i) => <li key={i}><a href="#"><span className="at-step-n"><bdi>{i + 1}</bdi></span>{t}</a></li>)}</ol>
          </nav>
        </div>
      </article>
    </Sec>
  );
}

/* 10 · status system ---------------------------------------------------- */

function S10({ b }: { b: Board }) {
  const s = b.status;
  const five: Five[] = ["keep", "change", "replace", "removed", "verify"];
  const lvls: Lvl[] = ["verified", "partial", "requires", "conflict"];
  return (
    <Sec n={10} id="s10" title="מערכת סטטוס" cap="חמשת מצבי S/4HANA וארבע רמות האימות, בסמל, במילה ובצבע או בדוגמת קו.">
      <div className="at-stsys">
        <label className="at-gray">
          <input type="checkbox" />
          <span>הצגה בגווני אפור, לבדיקה שהכול קריא בלי צבע</span>
        </label>
        <h3 className="at-h3">מצב ב-S/4HANA</h3>
        <ul className="at-st-grid">
          {five.map((f) => {
            const { Icon, he, def } = FIVE[f];
            return (
              <li key={f} className={`at-st-tile at-st--${f}`}>
                <Icon size={24} strokeWidth={2} aria-hidden="true" />
                <p className="at-st-word">{he}</p>
                <p className="at-st-def">{def}</p>
                <p className="at-meta"><N v={s.five[f]} /> מתוך <N v={s.txTotal} /> טרנזקציות</p>
              </li>
            );
          })}
        </ul>
        <ul className="at-extra" aria-label="שתי קבוצות נוספות בנתונים">
          <li><StatusTag st={{ five: "new", label: "חדש ב-S/4HANA" }} /><span><N v={s.five.new} /> טרנזקציות, ובהן <C c="IP30H" /></span></li>
          <li><StatusTag st={{ five: "past", label: "ECC בלבד" }} /><span><N v={s.five.past} /> טרנזקציות</span></li>
        </ul>
        <p className="at-note">שתי קבוצות נוספות שקיימות בנתונים, כל אחת בסמל ובמילה משלה. ליד הסמל מודפסת תמיד התווית הקנונית של הרשומה, מילה במילה.</p>
        <h3 className="at-h3">רמת אימות</h3>
        <ul className="at-lv-grid">
          {lvls.map((k) => {
            const { Icon, he, line, from } = LVL[k];
            return (
              <li key={k} className={`at-lv-tile at-lv--${k}`}>
                <Icon size={24} strokeWidth={2} aria-hidden="true" />
                <p className="at-st-word">{he}</p>
                <span className="at-lv-line" aria-hidden="true" />
                <p className="at-st-def">{line}. {from}.</p>
                <p className="at-meta"><N v={s.lvl[k]} /> מתוך <N v={s.txTotal} /> טרנזקציות</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Sec>
  );
}

/* 11 · legal ------------------------------------------------------------ */

function S11() {
  const TOC = ["מחויבות לנגישות", "רמת ההתאמה", "מה הותאם באתר", "מגבלות ידועות", "פנייה בנושא נגישות"];
  return (
    <Sec n={11} id="s11" title="עמוד משפטי" cap="פריסת הצהרת נגישות; כל פרט שרק הבעלים יכול לקבוע מסומן כמקום ריק.">
      <article className="at-legal">
        <header>
          <h3 className="at-legal-t"><Accessibility size={22} aria-hidden="true" /> הצהרת נגישות</h3>
          <p className="at-meta">עודכנה לאחרונה: <Ph what="תאריך העדכון" /></p>
        </header>
        <div className="at-legal-grid">
          <nav className="at-ltoc" aria-label="בעמוד זה">
            <p className="at-strip-h">בעמוד זה</p>
            <ol>{TOC.map((t, i) => <li key={t}><a href="#"><span className="at-step-n"><bdi>{i + 1}</bdi></span>{t}</a></li>)}</ol>
          </nav>
          <div className="at-legal-body">
            <h4 className="at-h4">מחויבות לנגישות</h4>
            <p className="at-read"><Ph what="נוסח המחויבות של בעלי האתר" /></p>
            <h4 className="at-h4">רמת ההתאמה</h4>
            <p className="at-read">התקן ורמת ההתאמה שהאתר עומד בהם: <Ph what="תקן ורמה, לאחר בדיקה" /></p>
            <h4 className="at-h4">מה הותאם באתר</h4>
            <p className="at-read"><Ph what="רשימת ההתאמות שנבדקו בפועל" /></p>
            <h4 className="at-h4">מגבלות ידועות</h4>
            <p className="at-read"><Ph what="מגבלות ידועות וחלופות" /></p>
            <h4 className="at-h4">פנייה בנושא נגישות</h4>
            <dl className="at-contact">
              <div><dt>רכז או רכזת נגישות</dt><dd><Ph what="שם" /></dd></div>
              <div><dt>דוא״ל</dt><dd><Ph what="כתובת דוא״ל" /></dd></div>
              <div><dt>טלפון</dt><dd><Ph what="מספר טלפון" /></dd></div>
              <div><dt>תאריך ההצהרה</dt><dd><Ph what="תאריך" /></dd></div>
            </dl>
          </div>
        </div>
      </article>
    </Sec>
  );
}

/* 12 · empty and error -------------------------------------------------- */

function S12() {
  return (
    <Sec n={12} id="s12" title="ריק ושגיאה" cap="מצב ריק עם פעולה אחת, ושגיאה שמסבירה מה קרה ומציעה ניסיון חוזר.">
      <div className="at-states">
        <div className="at-state" role="status">
          <RouteOff size={28} aria-hidden="true" />
          <p className="at-state-h">לא נמצאו טבלאות מתאימות. נסה חיפוש אחר או נקה מסננים</p>
          <button type="button" className="at-btn at-btn--primary">ניקוי מסננים</button>
        </div>
        <div className="at-state at-state--err" role="alert">
          <TriangleAlert size={28} aria-hidden="true" />
          <p className="at-state-h">המפה לא נטענה</p>
          <p>הנתונים של מפת הידע לא הגיעו לדפדפן. שאר העמוד והחיפוש ממשיכים לעבוד.</p>
          <button type="button" className="at-btn at-btn--quiet"><RefreshCw size={16} aria-hidden="true" />ניסיון חוזר</button>
        </div>
      </div>
    </Sec>
  );
}

/* 13 · signature motion ------------------------------------------------- */

function S13({ b }: { b: Board }) {
  return (
    <Sec n={13} id="s13" title="רגע חתימה" cap="המפה נבנית לפי סדר המשמעות, ומיקוד מודול מאיר את שכניו ומעמעם את השאר.">
      <p className="at-rm">
        <Waypoints size={16} aria-hidden="true" />
        בתנועה מופחתת: המפה מוצגת מצוירת במלואה מההתחלה, ומיקוד מודול מסומן בקו מתאר ובשורת טקסט שמונה את שכניו, בלי עמעום ובלי מעברים.
      </p>
      <AtlasMap data={b.map} variant="signature" uid="sig-map" />
    </Sec>
  );
}
