/* Editorial Reference · מהדורת עיון · direction board.
   A server component. Every number, name, status and relation below is read at
   build time from the site's own accessors; where one is silent the board says
   "לא מתועד במאגר". Presentation vocabulary lives in ./lib.ts, browser parts in
   ./client.tsx. */

import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import {
  ArrowRightLeft, BadgeCheck, Ban, BookOpen, Check, ChevronLeft, ChevronRight, CircleDashed,
  CircleHelp, Contrast, Diff, House, ListTree, Moon, Search, SlidersHorizontal, Split,
} from "lucide-react";
import { homeData } from "@/components/neo-shell/home/home-data";
import { txDetail, txDetailCodes } from "@/components/neo-shell/data/tx-detail";
import { tableDetail, tableHref } from "@/components/neo-shell/data/tables-detail";
import { bpDetail, bpList } from "@/components/neo-shell/best-practices/bp-data";
import { booksData } from "@/components/neo-shell/books/books-data";
import { neoLessonData } from "@/components/neo-shell/learn/lesson-data";
import { erdCatalog } from "@/components/neo-shell/erd/erd-catalog";
import { cdsDir } from "@/components/neo-shell/reference/cds-data";
import { bapiDir } from "@/components/neo-shell/reference/bapi-data";
import { BLOCK_META, orderedBlocks } from "@/lib/academy/lesson-types";
import type { SectionBody } from "@/lib/library/book";
import { frankHe, frankLat, plexHe, plexLat, plexMono } from "@/app/fonts/fonts";
import {
  S5_HE, S5_MEMBERS, S5_NOTE, S5_ORDER, V4_HE, V4_LINE, V4_MEMBERS, V4_ORDER,
  boardTokens, contrast, fmt, s4Label, s5Of, stack, v4Of, v4OfHe,
  type S5, type Tokens, type V4,
} from "./lib";
import { Catalog, CopyCode, EmptyDemo, ErdModes, GreyCheck, ModeToggle, RetryDemo, Reveal, type CatRow } from "./client";
import "./board.css";

export const metadata: Metadata = {
  title: { absolute: "מהדורת עיון · כיוון עיצוב · SAP by Sali" },
  robots: { index: false, follow: false },
};

const MISSING = "לא מתועד במאגר";

/* ================================================================ atoms */

const pad = (n: number) => String(n).padStart(2, "0");

function N({ v }: { v: number }) {
  return <bdi className="ed-n">{fmt(v)}</bdi>;
}

function En({ children }: { children: ReactNode }) {
  return (
    <bdi dir="ltr" lang="en">
      {children}
    </bdi>
  );
}

function Code({ v, href, size }: { v: string; href?: string | null; size?: "xl" }) {
  const c = (
    <bdi dir="ltr" className={size === "xl" ? "ed-code ed-code-xl" : "ed-code"}>
      {v}
    </bdi>
  );
  return href ? (
    <Link prefetch={false} className="ed-code-link" href={href}>
      {c}
    </Link>
  ) : (
    c
  );
}

function Missing({ children = MISSING }: { children?: ReactNode }) {
  return <span className="ed-missing">{children}</span>;
}

const S5_ICON = { keep: Check, change: Diff, replace: ArrowRightLeft, removed: Ban, verify: CircleHelp } as const;

/** Rule 7 for text that arrives from the data: every Latin run (a code, a number,
 *  an English phrase, or a whole Latin parenthetical) is isolated LTR, so a Hebrew
 *  sentence that ends in "(Maintenance Plan Scheduling)" cannot scatter its
 *  parentheses when it wraps. The characters are untouched; only direction is set. */
/** A token starts and ends on a letter or digit, so trailing punctuation (":", ".")
 *  stays in the Hebrew flow instead of being carried into the LTR isolate. */
const LATIN_TOKEN = "[A-Za-z0-9](?:[A-Za-z0-9_./:+&'-]*[A-Za-z0-9])?";
const LATIN_RUN = new RegExp(`(\\([A-Za-z0-9][^()\\u0590-\\u05FF]*\\)|${LATIN_TOKEN}(?:[ ,]+${LATIN_TOKEN})*)`, "g");

function Bidi({ text }: { text: string }) {
  return (
    <>
      {text.split(LATIN_RUN).map((t, i) =>
        i % 2 ? (
          <bdi key={i} dir="ltr">
            {t}
          </bdi>
        ) : (
          t
        ),
      )}
    </>
  );
}

/** Keeps a prefixed token ("ב-S/4HANA", "PP-PI") on one line. */
function Keep({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\S+-\S+)/g).map((t, i) =>
        i % 2 ? (
          <span key={i} className="ed-nowrap">
            <Bidi text={t} />
          </span>
        ) : (
          <Bidi key={i} text={t} />
        ),
      )}
    </>
  );
}

/** Glyph + the canonical label, coloured by its state. */
function Status({ k, label }: { k?: string; label?: string }) {
  const s = s5Of(k);
  const Icon = S5_ICON[s];
  return (
    <span className="ed-st" data-s5={s}>
      <Icon size={16} strokeWidth={2} aria-hidden="true" />
      <span>
        <Keep text={label || s4Label(k) || MISSING} />
      </span>
    </span>
  );
}

/** The state's own word, for the legend. */
function StateWord({ s }: { s: S5 }) {
  const Icon = S5_ICON[s];
  return (
    <span className="ed-st ed-st-word" data-s5={s}>
      <Icon size={18} strokeWidth={2} aria-hidden="true" />
      <span>{S5_HE[s]}</span>
    </span>
  );
}

const V4_ICON = { verified: BadgeCheck, partial: Contrast, required: CircleDashed, conflict: Split } as const;

/** Glyph + word, underlined in the level's own line pattern. */
function Verif({ v, detail }: { v: V4; detail?: string }) {
  const Icon = V4_ICON[v];
  return (
    <span className="ed-vf" data-v4={v}>
      <Icon size={16} strokeWidth={2} aria-hidden="true" />
      <span className="ed-vf-w">{V4_HE[v]}</span>
      {detail ? <span className="ed-vf-d"><Bidi text={detail} /></span> : null}
    </span>
  );
}

const MOD_TOKEN: Record<string, string> = { PM: "pm", "PP-PI": "pppi", PP: "pp", BW: "bw" };

function Mod({ code, he }: { code: string; he?: string }) {
  return (
    <span className="ed-mod" style={{ "--m": `var(--mod-${MOD_TOKEN[code] ?? "other"})` } as CSSProperties}>
      <i aria-hidden="true" />
      <bdi dir="ltr">{code}</bdi>
      {he ? <span className="ed-mod-he">{he}</span> : null}
    </span>
  );
}

function Todo() {
  return (
    <span className="ed-todo">
      <span className="ed-sr">חסר מידע שרק בעל האתר יכול למלא: </span>
      <bdi dir="ltr">REQUIRES_OWNER_INPUT</bdi>
    </span>
  );
}

/** `**bold**` is the only inline markup the book and lesson bodies carry; it is
 *  drawn the way the NEO reader draws it (components/neo-shell/reader/section-body). */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
        chunk.startsWith("**") && chunk.endsWith("**") ? (
          <strong key={i}>
            <Bidi text={chunk.slice(2, -2)} />
          </strong>
        ) : (
          <span key={i}>
            <Bidi text={chunk} />
          </span>
        ),
      )}
    </>
  );
}

/* ============================================================== sections */

const SECTIONS = [
  { title: "הכיוון", cap: "שם הכיוון, ההצהרה בארבע שורות, לוח הצבעים ביום ובלילה וסולם האותיות על טקסט אמיתי." },
  { title: "מעטפת", cap: "מסגרת הניווט במחשב וסרגל הניווט התחתון בטלפון, עם המספרים האמיתיים של המאגר." },
  { title: "דף הבית", cap: "משפט זהות, החיפוש כפעולה הראשית, תוכן המאגר עם ספירות אמיתיות ומקום להמשך." },
  { title: "חיפוש", cap: "לוח הפקודות פתוח על השאילתה AFKO: תוצאות אמיתיות לפי סוג, כל שורה עם סטטוס S/4." },
  { title: "קטלוג", cap: "קטלוג הטרנזקציות: חיפוש, מסננים פעילים, מיון ומונה תוצאות על שורות אמיתיות. הכול עובד." },
  { title: "רשומה", cap: "הטרנזקציה IP30H והטבלה AFKO בתבנית כותרת אחת: מזהה, משמעות, ומטא-נתונים בשוליים." },
  { title: "שיטת עבודה", cap: "התחשבנות פקודות: המטרה וחמשת הצעדים הראשונים, עם ההפניות של כל צעד." },
  { title: "מודל הנתונים", cap: "AFKO וקשריה הישירים מקטלוג ה-ERD: קשר מאומת בקו רציף, קשר חסר בקו מקווקו." },
  { title: "ספרייה וקורא", cap: "המדף עם 11 הספרים, ועמוד קורא עם כותרת פרק, מיקום בספר ופסקה אמיתית אחת." },
  { title: "אקדמיה", cap: "השיעור על עץ מוצר אחזקה בקורס PM: מה תלמדו, התחלה או המשך, ותוכן עניינים מקומי." },
  { title: "מערכת הסטטוס", cap: "חמישה מצבי S/4 וארבע רמות אימות, כל אחד בסמל, במילה ובצבע או בדפוס קו." },
  { title: "עמוד משפטי", cap: "מבנה הצהרת הנגישות, עם מקומות מסומנים לפרטים שרק בעל האתר יכול למלא." },
  { title: "ריק ושגיאה", cap: "מצב ריק עם פעולה אחת, ומצב שגיאה עם ניסיון חוזר. שניהם פועלים." },
  { title: "תנועת חתימה", cap: "חשיפת תוכן העניינים: הקווים נמתחים פעם אחת והערכים נכנסים בזה אחר זה." },
];

function Sec({ n, children }: { n: number; children: ReactNode }) {
  const s = SECTIONS[n];
  return (
    <section className="ed-sec" id={`sec-${n}`} aria-labelledby={`sec-${n}-h`}>
      <div className="ed-sec-mark" data-n={pad(n)} aria-hidden="true" />
      <header className="ed-sec-head">
        <h2 id={`sec-${n}-h`}>{s.title}</h2>
        <p className="ed-cap"><Bidi text={s.cap} /></p>
      </header>
      <div className="ed-sec-body">{children}</div>
    </section>
  );
}

/* ================================================================= data */

type Home = ReturnType<typeof homeData>;
interface Entry {
  key: string;
  he: string;
  n: number;
  unit: string;
  note: ReactNode;
  href: string;
}

function contentsOf(home: Home, txTotal: number, books: ReturnType<typeof booksData>, bpTotal: number, bpProfiled: number): Entry[] {
  const pm = home.modules.find((m) => m.key === "PM");
  const pp = home.modules.find((m) => m.key === "PP-PI");
  const steps = (k: string) => home.flows.find((f) => f.key === k)?.steps.length ?? 0;
  return [
    {
      key: "modules", he: "מודולים", n: home.modules.length, unit: "מודולים", href: "/neo/pm/",
      note: <><En>PM</En>, <N v={pm?.tables ?? 0} /> טבלאות · <En>PP-PI</En>, <N v={pp?.tables ?? 0} /> טבלאות</>,
    },
    {
      key: "processes", he: "תהליכים", n: home.flows.length, unit: "שרשראות", href: "/neo/",
      note: <><En>PM</En> ב־<N v={steps("PM")} /> צעדים · <En>PP-PI</En> ב־<N v={steps("PP-PI")} /> צעדים</>,
    },
    {
      key: "tables", he: "טבלאות", n: home.tables, unit: "טבלאות", href: "/neo/tables/",
      note: <><N v={home.dictRows} /> רשומות מילון · <N v={home.fields} /> שדות · <N v={home.relations} /> קשרים</>,
    },
    {
      key: "tx", he: "טרנזקציות", n: txTotal, unit: "טרנזקציות", href: "/neo/transactions/",
      note: <><N v={home.tcodes} /> קודים ממופים לטבלאות המילון</>,
    },
    {
      key: "books", he: "ספרים", n: books.totals.books, unit: "ספרים", href: "/neo/books/",
      note: <><N v={books.totals.chapters} /> פרקים · <N v={books.totals.sections} /> סעיפים</>,
    },
    {
      key: "bp", he: "שיטות עבודה", n: bpTotal, unit: "שיטות", href: "/neo/best-practices/",
      note: <><N v={bpProfiled} /> מהן מתועדות כפרופיל תהליך</>,
    },
  ];
}

function Contents({ entries, small }: { entries: Entry[]; small?: boolean }) {
  return (
    <ol className={small ? "ed-contents ed-contents-sm" : "ed-contents"}>
      {entries.map((e, i) => (
        <li key={e.key} className="ed-toc-entry" style={{ "--i": i } as CSSProperties}>
          <span className="ed-toc-rule" aria-hidden="true" />
          <Link prefetch={false} href={e.href} className="ed-contents-a">
            <span className="ed-contents-t">{e.he}</span>
            <span className="ed-leader" aria-hidden="true" />
            <span className="ed-contents-n">
              <N v={e.n} /> <span className="ed-contents-u">{e.unit}</span>
            </span>
          </Link>
          {small ? null : <p className="ed-contents-note">{e.note}</p>}
        </li>
      ))}
    </ol>
  );
}

/* ================================================================ page */

export default function EditorialBoard() {
  const home = homeData();
  const allTx = txDetailCodes();
  const books = booksData();
  const practices = bpList();
  const tokens = boardTokens();
  const entries = contentsOf(home, allTx.length, books, practices.length, practices.filter((p) => p.profile).length);

  const fonts: CSSProperties = {
    "--ed-serif": stack(frankHe, frankLat, '"Frank Ruhl Libre", "David", "Times New Roman", serif'),
    "--ed-sans": stack(plexHe, plexLat, '"Segoe UI", system-ui, sans-serif'),
    "--ed-mono": stack(plexMono, null, '"Cascadia Code", Consolas, ui-monospace, monospace'),
  } as CSSProperties;

  return (
    <div
      id="rb-editorial"
      className={`rb rb-editorial ${frankHe.variable} ${frankLat.variable} ${plexHe.variable} ${plexLat.variable} ${plexMono.variable}`}
      data-mode="light"
      dir="rtl"
      lang="he"
      style={fonts}
    >
      <Masthead />
      <Direction tokens={tokens} />
      <Shell home={home} txTotal={allTx.length} books={books.totals.books} bpTotal={practices.length} entries={entries} />
      <HomeSection entries={entries} />
      <SearchSection />
      <CatalogSection allTx={allTx} />
      <RecordSection />
      <PracticeSection />
      <ErdSection />
      <LibrarySection books={books} />
      <AcademySection />
      <StatusSection />
      <LegalSection />
      <StatesSection total={home.tables} />
      <MotionSection entries={entries} />
      <footer className="ed-colophon">
        <p>
          <strong>קולופון.</strong> מהדורת עיון, לוח כיוון עיצוב של <En>SAP by Sali · Project NEO</En>. אותיות:{" "}
          <En>Frank Ruhl Libre</En>, <En>IBM Plex Sans Hebrew</En> ו־<En>IBM Plex Mono</En>, מקבצים מקומיים. הנתונים נקראים בזמן הבנייה
          מ־<En>homeData</En>, <En>txDetail</En>, <En>tableDetail</En>, <En>bpDetail</En>, <En>booksData</En>, <En>neoLessonData</En> ו־
          <En>erdCatalog</En>; סטטוס תצוגות <En>CDS</En> ופונקציות מ־<En>cdsDir</En> ו־<En>bapiDir</En>, כמו בחיפוש של האתר.
        </p>
      </footer>
    </div>
  );
}

/* ============================================================ masthead */

function Masthead() {
  return (
    <header className="ed-mast">
      <div className="ed-mast-top">
        <p className="ed-wordmark">
          <En>SAP by Sali</En>
          <span className="ed-wordmark-sub">
            <En>Project NEO</En> · כיוון עיצוב <bdi>2026</bdi>
          </span>
        </p>
        <ModeToggle target="rb-editorial" />
      </div>
      <p className="ed-kicker">לוח כיוון · עיון עורכי</p>
      <h1>מהדורת עיון</h1>
      <p className="ed-h1-en">
        <En>Editorial Reference</En>
      </p>
      <p className="ed-lede">
        המאגר כספר עיון ערוך: כל מסך נקרא כמו עמוד בספר מקצועי, עם שוליים למטא-נתונים, קווים במקום מסגרות, ומספרים
        שכולם נגזרים מהנתונים.
      </p>
      <nav className="ed-board-toc" aria-label="תוכן הלוח">
        <ol>
          {SECTIONS.map((s, i) => (
            <li key={s.title}>
              <a href={`#sec-${i}`}>
                <span className="ed-board-toc-n">
                  <bdi>{pad(i)}</bdi>
                </span>
                <span>{s.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <p className="ed-live-note">
        פקדים חיים בלוח: מצב לילה, העתקת מזהה, הקטלוג, מצבי התרשים, בדיקה בגווני אפור, מצב ריק, ניסיון חוזר ורגע החתימה.
        הקישורים מובילים לעמודים האמיתיים של האתר.
      </p>
    </header>
  );
}

/* ====================================================== 0 · direction */

const SWATCHES: { he: string; keys: string[] }[] = [
  { he: "קרקע, משטח, דיו וקווים", keys: ["canvas", "surface", "surface-2", "ink-1", "ink-2", "ink-3", "rule", "rule-strong"] },
  { he: "פעולה, קישור, מיקוד ובחירה", keys: ["action", "brand", "link", "focus", "select-bg", "code-bg"] },
  { he: "סטטוס S/4", keys: ["st-keep", "st-change", "st-replace", "st-removed", "st-verify"] },
  { he: "מודולים", keys: ["mod-pm", "mod-pppi", "mod-pp", "mod-bw"] },
];
/** Which surface each swatch is measured against in the printed ratio. */
const AGAINST: Record<string, string> = {
  "ink-1": "surface", "ink-2": "surface", "ink-3": "canvas", "rule-strong": "canvas",
  action: "surface", brand: "canvas", link: "surface", focus: "canvas",
  "st-keep": "surface", "st-change": "surface", "st-replace": "surface", "st-removed": "surface", "st-verify": "surface",
  "mod-pm": "surface", "mod-pppi": "surface", "mod-pp": "surface", "mod-bw": "surface",
};
const ratioText = (r: number) => `${(Math.floor(r * 100) / 100).toFixed(2)}:1`;

function Direction({ tokens }: { tokens: { light: Tokens; dark: Tokens } }) {
  const ip = txDetail("IP30H");
  const afko = tableDetail("AFKO");
  const lesson = neoLessonData("pm", "pm-bom");
  const TYPE: { role: string; spec: string; cls: string; sample: ReactNode }[] = [
    { role: "כותרת שער", spec: "Frank Ruhl Libre 700 · 44/1.1", cls: "ed-t-gate", sample: ip?.he || MISSING },
    { role: "כותרת מסך עבודה", spec: "Frank Ruhl Libre 600 · 30/1.2", cls: "ed-t-work", sample: afko?.he || MISSING },
    { role: "כותרת מקטע", spec: "Frank Ruhl Libre 500 · 21/1.35", cls: "ed-t-sec", sample: lesson?.lesson.title || MISSING },
    { role: "גוף קריאה", spec: "IBM Plex Sans Hebrew 400 · 17/1.75", cls: "ed-t-body", sample: ip?.purpose || MISSING },
    {
      role: "גוף ממשק", spec: "IBM Plex Sans Hebrew 400 · 15/1.5", cls: "ed-t-ui",
      sample: afko ? <><Code v={afko.name} /> · {afko.he} · <En>{afko.mods.join(" · ")}</En></> : MISSING,
    },
    {
      role: "מידע משני", spec: "IBM Plex Sans Hebrew 400 · 13/1.5", cls: "ed-t-small",
      sample: ip ? <>נבדק לאחרונה <bdi>{ip.evidence.lastVerifiedAt ?? MISSING}</bdi> · <N v={ip.evidence.sources.length} /> מקורות</> : MISSING,
    },
    { role: "מזהה SAP", spec: "IBM Plex Mono 600 · 15", cls: "ed-t-mono", sample: <En>IP30H · AFKO.AUFNR · BAPI_PROCORD_CREATE</En> },
    {
      role: "מספר מקטע", spec: "Frank Ruhl Libre 700 · 112, קישוט בלבד", cls: "ed-t-mark",
      sample: (
        <>
          <span className="ed-mark-glyph" data-n="05" aria-hidden="true" />
          <span className="ed-sr">מספר מקטע לדוגמה: 05, קישוט בלבד</span>
        </>
      ),
    },
  ];

  return (
    <Sec n={0}>
      <dl className="ed-lines">
        <div>
          <dt>שם</dt>
          <dd>
            מהדורת עיון · <En>Editorial Reference</En>
          </dd>
        </div>
        <div>
          <dt>רעיון</dt>
          <dd>המאגר כספר עיון ערוך ומדויק. הסמכות באה מטיפוגרפיה, מקווים ומקצב, לא ממסגרות.</dd>
        </div>
        <div>
          <dt>אות</dt>
          <dd>
            <En>Frank Ruhl Libre</En> לכותרות, <En>IBM Plex Sans Hebrew</En> לגוף ולממשק, <En>IBM Plex Mono</En> למזהי <En>SAP</En>.
          </dd>
        </div>
        <div>
          <dt>צבע, צפיפות וצורה</dt>
          <dd>
            נייר חם ודיו כהה; אדום המותג לפעולה ולבחירה בלבד. קווי שיער במקום כרטיסים, טבלאות בגובה שורה נדיב, רדיוס{" "}
            <bdi>2px</bdi>, בלי צל.
          </dd>
        </div>
        <div>
          <dt>תנועה</dt>
          <dd>רגועה ועורכית: קו נמתח פעם אחת, הערכים נכנסים בזה אחר זה, ואז הכול נח. בהפחתת תנועה, המצב הסופי מיד.</dd>
        </div>
      </dl>

      <div className="ed-palettes">
        {(["light", "dark"] as const).map((mode) => (
          <div key={mode} className="ed-palette" data-tone={mode}>
            <h3 className="ed-h3">{mode === "light" ? "יום" : "לילה"}</h3>
            {SWATCHES.map((g) => (
              <div key={g.he} className="ed-swatch-group">
                <p className="ed-swatch-h">
                  <Bidi text={g.he} />
                </p>
                <ul>
                  {g.keys.map((k) => {
                    const hex = tokens[mode][k];
                    const on = AGAINST[k];
                    const r = on ? contrast(hex, tokens[mode][on]) : null;
                    return (
                      <li key={k} className="ed-swatch">
                        <span className="ed-swatch-chip" style={{ background: `var(--${k})` }} aria-hidden="true" />
                        <span className="ed-swatch-name">
                          <bdi dir="ltr">--{k}</bdi>
                        </span>
                        <span className="ed-swatch-hex">
                          <bdi dir="ltr">{hex ?? MISSING}</bdi>
                          {r ? (
                            <>
                              {" · "}
                              <bdi dir="ltr">{ratioText(r)}</bdi> מול <bdi dir="ltr">{on}</bdi>
                            </>
                          ) : null}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="ed-typescale">
        <h3 className="ed-h3">סולם האותיות</h3>
        <dl>
          {TYPE.map((t) => (
            <div key={t.role} className="ed-type-row">
              <dt>
                <span className="ed-type-role">{t.role}</span>
                <span className="ed-type-spec">
                  <bdi dir="ltr">{t.spec}</bdi>
                </span>
              </dt>
              <dd className={t.cls}>{t.sample}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Sec>
  );
}

/* ========================================================= 1 · shell */

function Shell({ home, txTotal, books, bpTotal, entries }: { home: Home; txTotal: number; books: number; bpTotal: number; entries: Entry[] }) {
  const pm = home.modules.find((m) => m.key === "PM");
  const pp = home.modules.find((m) => m.key === "PP-PI");
  const lesson = neoLessonData("pm", "pm-bom");
  const nav: { he: ReactNode; n?: number; unit?: string; href: string; sub?: boolean; active?: boolean }[] = [
    { he: "בית", href: "/neo/" },
    { he: "מודולים", n: home.modules.length, href: "/neo/pm/" },
    { he: <><Mod code="PM" /> {pm?.he}</>, n: pm?.tables, unit: "טבלאות", href: pm?.href ?? "/neo/pm/", sub: true },
    { he: <><Mod code="PP-PI" /> {pp?.he}</>, n: pp?.tables, unit: "טבלאות", href: pp?.href ?? "/neo/pp-pi/", sub: true },
    { he: "תהליכים", n: home.flows.length, unit: "שרשראות", href: "/neo/" },
    { he: "טבלאות", n: home.tables, href: "/neo/tables/", active: true },
    { he: "טרנזקציות", n: txTotal, href: "/neo/transactions/" },
    { he: "מודל הנתונים", n: home.relations, unit: "קשרים", href: "/neo/erd/" },
    { he: "שיטות עבודה", n: bpTotal, href: "/neo/best-practices/" },
    { he: "ספרים", n: books, href: "/neo/books/" },
    { he: <>אקדמיה · <En>PM</En></>, n: lesson?.place.globalTotal, unit: "שיעורים", href: lesson?.course.href ?? "/neo/" },
  ];
  const sample = ["AFKO", "AFVC", "AUFK"].map((n) => tableDetail(n)).filter((t) => t !== null);

  return (
    <Sec n={1}>
      <figure className="ed-frame-fig">
        <div className="ed-scroll" role="region" aria-label="מסגרת הניווט במחשב, גלילה אופקית" tabIndex={0}>
          <div className="ed-desk">
            <div className="ed-desk-top">
              <p className="ed-desk-mark">
                <En>SAP by Sali</En>
              </p>
              <a className="ed-searchline ed-searchline-sm" href="#sec-3">
                <Search size={16} aria-hidden="true" />
                <span>חיפוש טבלה, טרנזקציה, <En>BAPI</En> או מושג</span>
                <kbd>
                  <bdi dir="ltr">Ctrl K</bdi>
                </kbd>
              </a>
              <span className="ed-desk-tool" aria-hidden="true">
                <Moon size={16} />
              </span>
            </div>
            <div className="ed-desk-cols">
              <nav className="ed-desk-nav" aria-label="מפתח המאגר בדוגמה">
                <p className="ed-desk-nav-h">מפתח המאגר</p>
                <ul>
                  {nav.map((it, i) => (
                    <li key={i} data-sub={it.sub ? "" : undefined} data-active={it.active ? "" : undefined}>
                      <Link prefetch={false} href={it.href}>
                        <span className="ed-desk-nav-t">{it.he}</span>
                        {typeof it.n === "number" ? (
                          <span className="ed-desk-nav-n">
                            <N v={it.n} />
                            {it.unit ? <span className="ed-sr"> {it.unit}</span> : null}
                          </span>
                        ) : null}
                        {it.active ? <span className="ed-sr"> · העמוד הפעיל בדוגמה</span> : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="ed-desk-main">
                <p className="ed-crumb">בית · עיון</p>
                <p className="ed-desk-title">טבלאות</p>
                <p className="ed-desk-lede">
                  <N v={home.tables} /> טבלאות ייחודיות במילון · <N v={home.dictRows} /> רשומות · <N v={home.fields} /> שדות
                </p>
                <ul className="ed-index">
                  {sample.map((t) => (
                    <li key={t.name}>
                      <Code v={t.name} href={tableHref(t.name)} />
                      <span className="ed-index-he"><Bidi text={t.he} /></span>
                      <Status k={t.evidence.status.key} label={t.evidence.status.label} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <footer className="ed-desk-foot">
              <ul aria-label="קישורים משפטיים">
                <li>
                  <a href="#">פרטיות</a>
                </li>
                <li>
                  <a href="#">תנאי שימוש</a>
                </li>
                <li>
                  <a href="#">הצהרת נגישות</a>
                </li>
              </ul>
              <p>
                <En>SAP by Sali · Project NEO</En>
              </p>
            </footer>
          </div>
        </div>
        <figcaption className="ed-figcap">
          מחשב: מפתח המאגר בצד, כמו תוכן עניינים, עם הספירה של כל ערך. החיפוש יושב בשורה העליונה בכל עמוד.
        </figcaption>
      </figure>

      <figure className="ed-frame-fig ed-phone-fig">
        <div className="ed-phone">
          <div className="ed-phone-top">
            <En>SAP by Sali</En>
          </div>
          <div className="ed-phone-body">
            <p className="ed-phone-id">
              מאגר ידע מקצועי בעברית על <En>SAP</En>, עם דגש על המעבר מ־<En>ECC</En> ל־<En>S/4HANA</En>.
            </p>
            <a className="ed-searchline ed-searchline-sm" href="#sec-3">
              <Search size={16} aria-hidden="true" />
              <span>חיפוש במאגר</span>
            </a>
            <Contents entries={entries} small />
          </div>
          <nav className="ed-tabbar" aria-label="ניווט תחתון בדוגמה">
            <Link prefetch={false} href="/neo/" data-active="">
              <House size={20} aria-hidden="true" />
              <span>בית</span>
            </Link>
            <a href="#sec-1">
              <ListTree size={20} aria-hidden="true" />
              <span>ניווט</span>
            </a>
            <a href="#sec-3">
              <Search size={20} aria-hidden="true" />
              <span>חיפוש</span>
            </a>
            <a href="#sec-0">
              <SlidersHorizontal size={20} aria-hidden="true" />
              <span>תצוגה</span>
            </a>
          </nav>
        </div>
        <figcaption className="ed-figcap">
          טלפון, עד <bdi>390px</bdi>: ארבע לשוניות ברוחב שווה, כל התא לחיץ, והלשונית הפעילה מסומנת בקו אדום מעליה. אין כפתור
          צף מעל הסרגל.
        </figcaption>
      </figure>
    </Sec>
  );
}

/* =========================================================== 2 · home */

function HomeSection({ entries }: { entries: Entry[] }) {
  return (
    <Sec n={2}>
      <div className="ed-home">
        <p className="ed-identity">
          <En>SAP by Sali</En> הוא מאגר ידע מקצועי בעברית על <En>SAP</En>, עם דגש על המעבר מ־<En>ECC</En> ל־<En>S/4HANA</En>{" "}
          במודולים <En>PM</En> ו־<En>PP-PI</En> ובסביבתם.
        </p>
        <a className="ed-searchline" href="#sec-3">
          <Search size={20} aria-hidden="true" />
          <span className="ed-searchline-t">
            <span className="ed-sr">פתיחת החיפוש: </span>
            חיפוש טבלה, טרנזקציה, <En>BAPI</En> או מושג
          </span>
          <kbd>
            <bdi dir="ltr">Ctrl K</bdi>
          </kbd>
        </a>
        <h3 className="ed-h3">תוכן המאגר</h3>
        <Contents entries={entries} />
        <aside className="ed-continue" aria-labelledby="ed-continue-h">
          <p className="ed-continue-h" id="ed-continue-h">
            <BookOpen size={16} aria-hidden="true" /> להמשיך מאיפה שעצרתם
          </p>
          <p>המקום הזה מתמלא רק אחרי שפותחים רשומה, שיעור או ספר במכשיר הזה. כרגע אין מה להמשיך.</p>
        </aside>
      </div>
    </Sec>
  );
}

/* ========================================================= 3 · search */

interface Hit {
  code: string;
  he: string;
  meta?: ReactNode;
  st?: { key?: string; label?: string };
  href: string | null;
}

function SearchSection() {
  const q = "AFKO";
  const afko = tableDetail(q);
  const cds = cdsDir().rows;
  const fns = bapiDir().rows;
  const groups: { key: string; he: string; rows: Hit[]; cap: number }[] = afko
    ? [
        {
          key: "tables", he: "טבלאות", cap: 1,
          rows: [{ code: afko.name, he: afko.he, meta: <En>{afko.mods.join(" · ")}</En>, st: afko.evidence.status, href: tableHref(afko.name) }],
        },
        {
          key: "related", he: "טבלאות קשורות, לפי קשרי המילון", cap: 3,
          rows: afko.rels.map((r) => {
            const t = tableDetail(r.name);
            return { code: r.name, he: r.he, meta: r.dir === "parent" ? "טבלת אב" : "טבלת בן", st: t?.evidence.status, href: r.href };
          }),
        },
        {
          key: "tx", he: "טרנזקציות", cap: 5,
          rows: afko.tx.map((x) => {
            const d = txDetail(x.code);
            return { code: x.code, he: d?.he || "", meta: d ? <En>{d.module}</En> : null, st: d?.evidence.status, href: x.href };
          }),
        },
        {
          key: "cds", he: "תצוגות CDS", cap: 2,
          rows: afko.cds.map((v) => {
            const r = cds.find((c) => c.name === v.view);
            return { code: v.view, he: v.he, st: r ? { key: r.s4.status.key, label: r.s4.status.he } : undefined, href: r?.href ?? null };
          }),
        },
        {
          key: "fn", he: "פונקציות ו־BAPI", cap: 3,
          rows: afko.funcs.map((f) => {
            // The dictionary writes two of these as "NAME - תיאור"; the name is looked up alone.
            const [name, ...rest] = f.name.split(" - ");
            const r = fns.find((x) => x.name.toUpperCase() === name.trim().toUpperCase());
            return { code: name.trim(), he: f.he || rest.join(" - ").trim(), st: r ? { key: r.s4.status.key, label: r.s4.status.he } : undefined, href: r?.href ?? null };
          }),
        },
      ]
    : [];
  const total = groups.reduce((a, g) => a + g.rows.length, 0);

  const Row = ({ r, sel }: { r: Hit; sel: boolean }) => {
    const inner = (
      <>
        <Code v={r.code} />
        <span className="ed-cmd-he">{r.he ? <Bidi text={r.he} /> : <Missing />}</span>
        <span className="ed-cmd-meta">{r.meta}</span>
        <Status k={r.st?.key} label={r.st?.label} />
        {sel ? <span className="ed-sr"> · מסומן</span> : null}
      </>
    );
    return r.href ? (
      <Link prefetch={false} className="ed-cmd-row" href={r.href} data-sel={sel ? "" : undefined}>
        {inner}
      </Link>
    ) : (
      <div className="ed-cmd-row" data-sel={sel ? "" : undefined}>
        {inner}
      </div>
    );
  };

  return (
    <Sec n={3}>
      <div className="ed-cmd-stage">
        <div className="ed-cmd">
          <div className="ed-cmd-q">
            <Search size={20} aria-hidden="true" />
            <label className="ed-sr" htmlFor="ed-cmd-input">
              שאילתת חיפוש
            </label>
            <input id="ed-cmd-input" value={q} readOnly dir="ltr" />
            <kbd>
              <bdi dir="ltr">Esc</bdi>
            </kbd>
          </div>
          {afko ? (
            <div className="ed-cmd-results">
              {groups.map((g, gi) => (
                <section key={g.key} className="ed-cmd-group" aria-labelledby={`cmd-${g.key}`}>
                  <h3 id={`cmd-${g.key}`} className="ed-cmd-gh">
                    <span>
                      <Bidi text={g.he} />
                    </span>
                    <N v={g.rows.length} />
                  </h3>
                  <ul>
                    {g.rows.slice(0, g.cap).map((r, i) => (
                      <li key={r.code}>
                        <Row r={r} sel={gi === 0 && i === 0} />
                      </li>
                    ))}
                  </ul>
                  {g.rows.length > g.cap ? (
                    <p className="ed-cmd-more">
                      ועוד <N v={g.rows.length - g.cap} /> · מוצגות <N v={g.cap} /> מתוך <N v={g.rows.length} />
                    </p>
                  ) : null}
                </section>
              ))}
            </div>
          ) : (
            <p className="ed-empty">
              <Missing />
            </p>
          )}
          <div className="ed-cmd-foot">
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> מעבר
            </span>
            <span>
              <kbd>
                <bdi dir="ltr">Enter</bdi>
              </kbd>{" "}
              פתיחה
            </span>
            <span>
              <kbd>
                <bdi dir="ltr">Tab</bdi>
              </kbd>{" "}
              לקבוצה הבאה
            </span>
            <span>
              <kbd>
                <bdi dir="ltr">Esc</bdi>
              </kbd>{" "}
              סגירה
            </span>
            <span className="ed-cmd-total">
              <N v={total} /> תוצאות
            </span>
          </div>
        </div>
      </div>
    </Sec>
  );
}

/* ======================================================== 4 · catalog */

const SAMPLE = ["IW31", "IW32", "IW33", "IW38", "IW39", "IP10", "IP30", "IP30H", "IA01", "IA05", "CO11N", "COR1"];

function CatalogSection({ allTx }: { allTx: string[] }) {
  const details = SAMPLE.map((c) => txDetail(c)).filter((d) => d !== null);
  const pmTotal = allTx.filter((c) => txDetail(c)?.module === "PM").length;
  const rows: CatRow[] = details.map((d) => ({
    code: d.code,
    he: d.he,
    heNode: <Bidi text={d.he} />,
    en: d.en,
    module: d.module,
    href: `/neo/transactions/${encodeURIComponent(d.code)}/`,
    known: d.known,
    total: d.total,
    verified: v4Of(d.evidence.level.key) === "verified",
    mod: <Mod code={d.module} />,
    status: <Status k={d.evidence.status.key} label={d.evidence.status.label} />,
    verif: <Verif v={v4Of(d.evidence.level.key)} />,
  }));
  return (
    <Sec n={4}>
      <div className="ed-cat-head">
        <h3 className="ed-h3">טרנזקציות</h3>
        <p className="ed-cat-sub">
          <N v={allTx.length} /> במרשם · <N v={pmTotal} /> מהן ב־<En>PM</En>
        </p>
      </div>
      <Catalog
        rows={rows}
        sample={details.length}
        scopeNote={
          <>
            היקף הלוח: מדגם של <N v={details.length} /> קודים מהמרשם
          </>
        }
      />
    </Sec>
  );
}

/* ========================================================= 5 · record */

const SOURCE_HE: Record<string, string> = {
  sap_help: "SAP Help", sap_api_hub: "API Hub", fiori_library: "Fiori Apps Library", sap_note: "SAP Note", kba: "KBA",
  simplification_item: "פריט פישוט", sap_press_book: "ספר SAP PRESS", repository: "רשומת מאגר", sap_community: "SAP Community",
};

function RecordSection() {
  const ip = txDetail("IP30H");
  const afko = tableDetail("AFKO");
  const steps = ip ? (ip.flow.length ? ip.flow : ip.process.split("→").map((s) => s.trim()).filter(Boolean)) : [];
  const kinds = ip
    ? Object.entries(ip.evidence.sources.reduce<Record<string, number>>((a, s) => ({ ...a, [s.kind]: (a[s.kind] ?? 0) + 1 }), {}))
    : [];
  const ipTables = (ip?.tables ?? []).map((t) => ({ t, d: tableDetail(t.name) }));

  return (
    <Sec n={5}>
      {ip ? (
        <article className="ed-row" aria-labelledby="rec-ip">
          <header className="ed-rec-head">
            <p className="ed-kicker">טרנזקציה</p>
            <div className="ed-codeline">
              <Code v={ip.code} size="xl" />
              <CopyCode code={ip.code} />
            </div>
            <h3 id="rec-ip" className="ed-rec-title">
              {ip.he}
            </h3>
            <p className="ed-rec-en">{ip.en ? <En>{ip.en}</En> : <Missing>שם באנגלית: לא מתועד במאגר</Missing>}</p>
          </header>
          <aside className="ed-margin" aria-label={`מטא-נתונים של ${ip.code}`}>
            <dl className="ed-meta">
              <div>
                <dt>מודול</dt>
                <dd>
                  <Mod code={ip.module} he={ip.moduleHe} />
                </dd>
              </div>
              <div>
                <dt>אזור</dt>
                <dd>{ip.area || <Missing />}</dd>
              </div>
              <div>
                <dt>
                  סטטוס <En>S/4</En>
                </dt>
                <dd>
                  <Status k={ip.evidence.status.key} label={ip.evidence.status.label} />
                </dd>
              </div>
              <div>
                <dt>רמת אימות</dt>
                <dd>
                  <Verif v={v4Of(ip.evidence.level.key)} detail={ip.evidence.level.he} />
                </dd>
              </div>
              <div>
                <dt>נבדק לאחרונה</dt>
                <dd>{ip.evidence.lastVerifiedAt ? <bdi>{ip.evidence.lastVerifiedAt}</bdi> : <Missing />}</dd>
              </div>
              <div>
                <dt>מקורות</dt>
                <dd>
                  {kinds.length ? (
                    <ul className="ed-meta-list">
                      {kinds.map(([k, n]) => (
                        <li key={k}>
                          <N v={n} /> <Bidi text={SOURCE_HE[k] ?? k} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Missing />
                  )}
                </dd>
              </div>
              <div>
                <dt>עומק הרשומה</dt>
                <dd>
                  <N v={ip.known} /> מתוך <N v={ip.total} /> עובדות מתועדות
                </dd>
              </div>
            </dl>
          </aside>
          <div className="ed-record">
            <h4 className="ed-h4">מטרה</h4>
            <p className="ed-read">{ip.purpose ? <Bidi text={ip.purpose} /> : <Missing />}</p>

            <h4 className="ed-h4">מהלך העבודה</h4>
            {steps.length ? (
              <ol className="ed-steps">
                {steps.map((s, i) => (
                  <li key={i}>
                    <span className="ed-step-n" aria-hidden="true">
                      <bdi>{i + 1}</bdi>
                    </span>
                    <p><Bidi text={s} /></p>
                  </li>
                ))}
              </ol>
            ) : (
              <p>
                <Missing />
              </p>
            )}
            {!ip.flow.length && steps.length ? (
              <p className="ed-note">הצעדים מתוך שדה התהליך ברשומה. רשימת צעדים מפורטת: לא מתועד במאגר.</p>
            ) : null}

            <h4 className="ed-h4">
              ב־<En>S/4HANA</En>
            </h4>
            <p className="ed-read">{ip.s4.note ? <Bidi text={ip.s4.note} /> : <Missing />}</p>
            <p className="ed-note">
              יישום <En>Fiori</En>: {ip.s4.fiori ? <En>{ip.s4.fiori}</En> : <Missing />}
            </p>

            <h4 className="ed-h4">טבלאות</h4>
            {ipTables.length ? (
              <ul className="ed-index">
                {ipTables.map(({ t, d }) => (
                  <li key={t.name}>
                    <Code v={t.name} href={d ? tableHref(t.name) : null} />
                    <span className="ed-index-he">{t.he ? <Bidi text={t.he} /> : <Missing />}</span>
                    <Status k={d?.evidence.status.key} label={d?.evidence.status.label} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <Missing />
              </p>
            )}
          </div>
        </article>
      ) : (
        <p>
          <Missing />
        </p>
      )}

      {afko ? (
        <article className="ed-row ed-row-rule" aria-labelledby="rec-afko">
          <header className="ed-rec-head">
            <p className="ed-kicker">טבלה</p>
            <div className="ed-codeline">
              <Code v={afko.name} size="xl" />
              <CopyCode code={afko.name} />
            </div>
            <h3 id="rec-afko" className="ed-rec-title">
              {afko.he}
            </h3>
            <p className="ed-rec-en">{afko.en ? <En>{afko.en}</En> : <Missing>שם באנגלית: לא מתועד במאגר</Missing>}</p>
          </header>
          <aside className="ed-margin" aria-label={`מטא-נתונים של ${afko.name}`}>
            <dl className="ed-meta">
              <div>
                <dt>מודולים</dt>
                <dd className="ed-meta-mods">
                  {afko.mods.map((m) => (
                    <Mod key={m} code={m} />
                  ))}
                  {afko.shared ? <span className="ed-meta-note">מתועדת בשני המודולים</span> : null}
                </dd>
              </div>
              <div>
                <dt>סוג אובייקט</dt>
                <dd>{afko.zoneHe || <Missing />}</dd>
              </div>
              <div>
                <dt>
                  סטטוס <En>S/4</En>
                </dt>
                <dd>
                  <Status k={afko.evidence.status.key} label={afko.evidence.status.label} />
                </dd>
              </div>
              <div>
                <dt>רמת אימות</dt>
                <dd>
                  <Verif v={v4Of(afko.evidence.level.key)} detail={afko.evidence.level.he} />
                </dd>
              </div>
              <div>
                <dt>מבנה</dt>
                <dd>
                  <N v={afko.fields.length} /> שדות · <N v={afko.pk.length} /> במפתח הראשי · <N v={afko.fk.length} /> מפתחות זרים
                </dd>
              </div>
              <div>
                <dt>קשרים</dt>
                <dd>
                  <N v={afko.rels.length} /> קשרים · מקום <N v={afko.rank} /> מתוך <N v={afko.total} /> לפי מספר הקשרים
                </dd>
              </div>
            </dl>
          </aside>
          <div className="ed-record">
            <h4 className="ed-h4">שדות</h4>
            <div className="ed-scroll" role="region" aria-label="שדות הטבלה AFKO" tabIndex={0}>
              <table className="ed-table">
                <thead>
                  <tr>
                    <th scope="col">שדה</th>
                    <th scope="col">תיאור</th>
                    <th scope="col">סוג</th>
                    <th scope="col">אורך</th>
                    <th scope="col">מפתח</th>
                    <th scope="col">מודולים</th>
                  </tr>
                </thead>
                <tbody>
                  {afko.fields.slice(0, 6).map((f) => (
                    <tr key={f.tech}>
                      <th scope="row">
                        <Code v={f.tech} />
                      </th>
                      <td>
                        <span className="ed-cell-he">{f.he ? <Bidi text={f.he} /> : <Missing />}</span>
                        {f.en ? (
                          <bdi dir="ltr" lang="en" className="ed-cell-en">
                            {f.en}
                          </bdi>
                        ) : null}
                      </td>
                      <td>{f.dt ? <Code v={f.dt} /> : <Missing />}</td>
                      <td className="ed-cell-num">{f.len ? <bdi>{f.len}</bdi> : <Missing />}</td>
                      <td>
                        {f.pk || f.fk ? (
                          <span className="ed-keys">
                            {f.pk ? <span className="ed-key" data-k="pk">ראשי</span> : null}
                            {f.fk ? <span className="ed-key" data-k="fk">זר</span> : null}
                          </span>
                        ) : (
                          <span className="ed-dash">
                            <span aria-hidden="true">–</span>
                            <span className="ed-sr">אין</span>
                          </span>
                        )}
                      </td>
                      <td className="ed-cell-mods">
                        {f.mods.map((m) => (
                          <Mod key={m} code={m} />
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="ed-note">
              מוצגים <N v={Math.min(6, afko.fields.length)} /> מתוך <N v={afko.fields.length} /> שדות ·{" "}
              <Link prefetch={false} href={tableHref(afko.name)}>
                לכל השדות של <En>AFKO</En>
              </Link>
            </p>
          </div>
        </article>
      ) : null}
    </Sec>
  );
}

/* ======================================================= 6 · practice */

function PracticeSection() {
  const bp = bpDetail("order-settlement-process");
  if (!bp)
    return (
      <Sec n={6}>
        <p>
          <Missing />
        </p>
      </Sec>
    );
  const ref = bp.process?.reference ?? null;
  return (
    <Sec n={6}>
      <article className="ed-row" aria-labelledby="rec-bp">
        <header className="ed-rec-head">
          <p className="ed-kicker">שיטת עבודה · תהליך</p>
          <h3 id="rec-bp" className="ed-rec-title ed-rec-title-long">
            {bp.he}
          </h3>
          <p className="ed-rec-en">
            <En>{bp.en}</En>
          </p>
        </header>
        <aside className="ed-margin" aria-label="מטא-נתונים של שיטת העבודה">
          <dl className="ed-meta">
            <div>
              <dt>מודול</dt>
              <dd>{bp.moduleHe}</dd>
            </div>
            <div>
              <dt>
                מעמד <En>S/4</En> של הרשומה
              </dt>
              <dd>
                <Status k={bp.evidence.status.key} label={bp.evidence.status.label} />
              </dd>
            </div>
            <div>
              <dt>מקור רשמי</dt>
              <dd>{ref ? <Verif v={v4OfHe(ref.levelHe)} detail={ref.levelHe} /> : <Missing />}</dd>
            </div>
            <div>
              <dt>פרופיל התהליך</dt>
              <dd>
                {bp.process ? (
                  <>
                    <N v={bp.process.filled} /> מתוך <N v={bp.process.total} /> שדות
                  </>
                ) : (
                  <Missing />
                )}
              </dd>
            </div>
            <div>
              <dt>נבדק לאחרונה</dt>
              <dd>
                <bdi>{bp.lastVerifiedAt}</bdi>
              </dd>
            </div>
          </dl>
        </aside>
        <div className="ed-record">
          <h4 className="ed-h4">מטרה</h4>
          <p className="ed-read">{bp.process?.purpose || bp.summary ? <Bidi text={bp.process?.purpose || bp.summary} /> : <Missing />}</p>
          <h4 className="ed-h4">הצעדים</h4>
          <ol className="ed-steps">
            {bp.steps.slice(0, 5).map((s) => {
              const byKind = s.xrefs.reduce<Record<string, typeof s.xrefs>>((a, x) => ({ ...a, [x.kindHe]: [...(a[x.kindHe] ?? []), x] }), {});
              return (
                <li key={s.n}>
                  <span className="ed-step-n" aria-hidden="true">
                    <bdi>{s.n}</bdi>
                  </span>
                  <div>
                    <p><Bidi text={s.he} /></p>
                    {s.xrefs.length ? (
                      <p className="ed-xrefs">
                        {Object.entries(byKind).map(([kind, xs]) => (
                          <span key={kind} className="ed-xref-group">
                            <span className="ed-xref-kind">{kind}</span>
                            {xs.map((x) => (
                              <Code key={x.id} v={x.name} href={x.href} />
                            ))}
                          </span>
                        ))}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="ed-note">
            מוצגים <N v={Math.min(5, bp.steps.length)} /> מתוך <N v={bp.steps.length} /> צעדים · <Link prefetch={false} href={bp.href}>לשיטת העבודה המלאה</Link>
          </p>
        </div>
      </article>
    </Sec>
  );
}

/* ============================================================ 7 · ERD */

function ErdSection() {
  const focus = "AFKO";
  const erd = erdCatalog();
  const byName = new Map(erd.tables.map((t) => [t.n, t]));
  const edges = erd.edges.filter((e) => e.p === focus || e.c === focus);
  /** Solid only when the record carries BOTH a stated cardinality and a JOIN. */
  const full = (e: (typeof edges)[number]) => e.k !== "unstated" && e.j.some((s) => s.j);
  const parents = edges.filter((e) => e.c === focus).sort((a, b) => a.p.localeCompare(b.p));
  const children = edges.filter((e) => e.p === focus).sort((a, b) => Number(full(b)) - Number(full(a)) || a.c.localeCompare(b.c));

  // Geometry: upstream on the right, the table in the middle, downstream on the left.
  const NH = 46, GAP = 12, PAD = 28;
  const XC = 12, CW = 214; // children column
  const XF = 318, FW = 252, FH = 66; // focus
  const XP = 624, PW = 262; // parents column
  const W = XP + PW + 12;
  const colH = (k: number) => k * NH + Math.max(0, k - 1) * GAP;
  const H = Math.max(colH(children.length), colH(parents.length), FH) + PAD * 2;
  const cy = H / 2;
  const top = (k: number, i: number) => cy - colH(k) / 2 + i * (NH + GAP);
  const verified = edges.filter(full).length;
  const f = byName.get(focus);

  const node = (name: string, x: number, y: number, w: number, h: number, sel?: boolean) => {
    const t = byName.get(name);
    return (
      <g key={name} className={sel ? "erd-node erd-focus" : "erd-node"}>
        <rect x={x} y={y} width={w} height={h} rx={2} />
        <text className="erd-code" x={x + w - 14} y={y + (sel ? 27 : 20)} textAnchor="end" direction="ltr">
          {name}
        </text>
        <text className="erd-he" x={x + w - 14} y={y + (sel ? 49 : 37)} textAnchor="start" direction="rtl">
          {t?.he || MISSING}
        </text>
      </g>
    );
  };

  return (
    <Sec n={7}>
      <ErdModes selected={focus}>
        <figure className="ed-erd-fig">
          <div className="ed-scroll" role="region" aria-label="תרשים הקשרים של AFKO, גלילה אופקית" tabIndex={0}>
            <svg className="ed-erd-svg" viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-labelledby="erd-t erd-d">
              <title id="erd-t">AFKO וקשריה הישירים</title>
              <desc id="erd-d">
                {`${edges.length} קשרים ישירים: ${parents.length} טבלת אב ו-${children.length} טבלאות בן. ${verified} מאומתים במלואם ו-${edges.length - verified} חסרים קרדינליות או JOIN.`}
              </desc>
              {children.map((e, i) => {
                const y = top(children.length, i) + NH / 2;
                const mid = (XF + XC + CW) / 2;
                return (
                  <g key={e.i} className="erd-edge" data-full={full(e) ? "" : undefined}>
                    <path d={`M${XF} ${cy} C${mid} ${cy} ${mid} ${y} ${XC + CW} ${y}`} />
                    <circle cx={XF} cy={cy} r={3.5} />
                    <text className="erd-card" x={mid} y={(cy + y) / 2 - 6} textAnchor="middle" direction={e.cd ? "ltr" : "rtl"}>
                      {e.cd || "לא צוינה"}
                    </text>
                  </g>
                );
              })}
              {parents.map((e, i) => {
                const y = top(parents.length, i) + NH / 2;
                const mid = (XF + FW + XP) / 2;
                return (
                  <g key={e.i} className="erd-edge" data-full={full(e) ? "" : undefined}>
                    <path d={`M${XP} ${y} C${mid} ${y} ${mid} ${cy} ${XF + FW} ${cy}`} />
                    <circle cx={XP} cy={y} r={3.5} />
                    <text className="erd-card" x={mid} y={Math.min(y, cy) - 10} textAnchor="middle" direction={e.cd ? "ltr" : "rtl"}>
                      {e.cd || "לא צוינה"}
                    </text>
                  </g>
                );
              })}
              {children.map((e, i) => node(e.c, XC, top(children.length, i), CW, NH))}
              {parents.map((e, i) => node(e.p, XP, top(parents.length, i), PW, NH))}
              {node(focus, XF, cy - FH / 2, FW, FH, true)}
            </svg>
          </div>
          <figcaption className="ed-figcap">
            {f ? (
              <>
                <Code v={focus} /> ({f.he}): <N v={edges.length} /> קשרים ישירים בקטלוג ה־<En>ERD</En>, <N v={verified} /> מאומתים במלואם.
              </>
            ) : (
              <Missing />
            )}
          </figcaption>
        </figure>
        <ul className="ed-legend" aria-label="מקרא">
          <li>
            <svg width="44" height="10" aria-hidden="true">
              <line x1="2" y1="5" x2="42" y2="5" className="lg-full" />
            </svg>
            <span>
              קו רציף: מאומת, הקרדינליות וה־<En>JOIN</En> רשומים במאגר
            </span>
          </li>
          <li>
            <svg width="44" height="10" aria-hidden="true">
              <line x1="2" y1="5" x2="42" y2="5" className="lg-part" />
            </svg>
            <span>
              קו מקווקו: לא מאומת במלואו, חסרה קרדינליות או <En>JOIN</En>
            </span>
          </li>
          <li>
            <svg width="44" height="10" aria-hidden="true">
              <circle cx="22" cy="5" r="3.5" className="lg-dot" />
            </svg>
            נקודה: הצד של טבלת האב
          </li>
          <li>
            <svg width="44" height="14" aria-hidden="true">
              <rect x="4" y="2" width="36" height="10" rx="2" className="lg-sel" />
            </svg>
            מסגרת אדומה: הטבלה שנבחרה
          </li>
        </ul>
        <ol className="ed-rels">
          {[...parents, ...children].map((e) => {
            const other = e.p === focus ? e.c : e.p;
            const t = byName.get(other);
            const join = e.j.find((s) => s.j)?.j;
            return (
              <li key={e.i}>
                <p className="ed-rels-head">
                  <Code v={other} href={t?.pg ? tableHref(other) : null} />
                  <span>{e.p === focus ? "טבלת בן" : "טבלת אב"}</span>
                  <span className="ed-rels-card">{e.cd ? <bdi dir="ltr">{e.cd}</bdi> : "קרדינליות לא צוינה"}</span>
                  <Verif v={full(e) ? "verified" : "partial"} detail={e.j.some((s) => s.j) ? undefined : "אין JOIN במילון"} />
                </p>
                <p className="ed-rels-desc">{e.ds || t?.he ? <Bidi text={e.ds || t?.he || ""} /> : <Missing />}</p>
                {join ? (
                  <p className="ed-rels-join">
                    <bdi dir="ltr">{join}</bdi>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </ErdModes>
    </Sec>
  );
}

/* ======================================================= 8 · library */

function readerExcerpt(bookId: string, chapter: number): { id: string; text: string } | null {
  try {
    const file = path.join(process.cwd(), "public", "books", bookId, `ch${chapter}.json`);
    const bodies = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, SectionBody>;
    for (const [id, body] of Object.entries(bodies)) {
      if (body.format !== "prose" || !body.he) continue;
      const para = body.he.split(/\n{2,}/).map((p) => p.trim()).find((p) => p.length > 0 && p.length < 600);
      if (para) return { id, text: para };
    }
  } catch {
    /* the shard is optional in the reader too; the board then says so */
  }
  return null;
}

function LibrarySection({ books }: { books: ReturnType<typeof booksData> }) {
  const bookId = "book1";
  const chapterN = 6;
  const book = books.books.find((b) => b.id === bookId);
  const excerpt = readerExcerpt(bookId, chapterN);
  const chIdx = book ? book.chapterRows.findIndex((c) => c.n === chapterN) : -1;
  const ch = book && chIdx >= 0 ? book.chapterRows[chIdx] : null;
  const secIdx = ch && excerpt ? ch.rows.findIndex(([id]) => id === excerpt.id) : -1;
  const before = book && chIdx >= 0 ? book.chapterRows.slice(0, chIdx).reduce((a, c) => a + c.sections, 0) : 0;
  const pos = before + secIdx + 1;

  return (
    <Sec n={8}>
      <ul className="ed-shelf" aria-label="מדף הספרים">
        {books.books.map((b, i) => (
          <li
            key={b.id}
            className="ed-book"
            style={{ "--cloth": `var(--cloth-${(i % 12) + 1})`, "--thick": b.thick } as CSSProperties}
          >
            <Link prefetch={false} className="ed-cover" href={b.hubHref} data-fit={b.fit} data-thick={b.thickFrom}>
              <span className="ed-cover-mod">
                <bdi dir="ltr">{b.module}</bdi>
              </span>
              <span className="ed-cover-title" lang={b.titleHe ? "he" : "en"} dir={b.titleHe ? "rtl" : "ltr"}>
                {b.titleHe || b.titleEn}
              </span>
              <span className="ed-cover-pub">{b.publisher ? <bdi dir="ltr">{b.publisher}</bdi> : null}</span>
            </Link>
            <p className="ed-book-cap">
              <Mod code={b.module} />
              <span>
                <N v={b.chapters} /> פרקים
              </span>
              <span>
                <N v={b.sections} /> סעיפים
              </span>
              <span>{b.pages !== null ? <><N v={b.pages} /> עמודים</> : <Missing>עמודים לא מתועדים</Missing>}</span>
            </p>
          </li>
        ))}
      </ul>
      {books.twinNote ? <p className="ed-note">{books.twinNote}</p> : null}

      {book && ch && excerpt ? (
        <article className="ed-reader" aria-labelledby="ed-reader-h">
          <header className="ed-reader-head">
            <p className="ed-reader-book">
              <En>{book.titleEn}</En>
            </p>
            <h3 id="ed-reader-h" className="ed-reader-ch">
              <span className="ed-reader-chn">
                פרק <N v={ch.n} />
              </span>
              <span>
                <bdi dir="auto" lang={/[\u0590-\u05FF]/.test(ch.title) ? "he" : "en"}>
                  {ch.title}
                </bdi>
              </span>
            </h3>
            <div className="ed-progress">
              <div className="ed-progress-bar" aria-hidden="true">
                <span style={{ "--p": pos / book.sections } as CSSProperties} />
              </div>
              <p>
                סעיף <bdi dir="ltr">{excerpt.id}</bdi> · <N v={secIdx + 1} /> מתוך <N v={ch.sections} /> בפרק · <N v={pos} /> מתוך{" "}
                <N v={book.sections} /> בספר
              </p>
            </div>
          </header>
          <p className="ed-reader-p">
            <Inline text={excerpt.text} />
          </p>
          <p className="ed-note">
            הפסקה כפי שהיא בתרגום שבמאגר, <bdi dir="ltr">{bookId}</bdi>, סעיף <bdi dir="ltr">{excerpt.id}</bdi>. המקור באנגלית זמין
            בקורא לצידה.
          </p>
        </article>
      ) : (
        <p>
          <Missing />
        </p>
      )}
    </Sec>
  );
}

/* ======================================================= 9 · academy */

/** The lesson data's own four trust words, as lesson-view.tsx prints them. */
const LESSON_TRUST: Record<string, string> = {
  "verified-docs": "מאומת מול תיעוד",
  "verified-system": "מאומת במערכת",
  curated: "תוכן ערוך",
  "needs-review": "נדרש אימות נוסף",
};

function AcademySection() {
  const L = neoLessonData("pm", "pm-bom");
  if (!L)
    return (
      <Sec n={9}>
        <p>
          <Missing />
        </p>
      </Sec>
    );
  const href = `${L.course.href}${L.lesson.slug}/`;
  const blocks = orderedBlocks(L.lesson);
  const objective = blocks.find((b) => b.kind === "objective");
  const objectiveText = objective && "md" in objective ? objective.md : "";
  const p = L.place;
  return (
    <Sec n={9}>
      <article className="ed-row" aria-labelledby="rec-lesson">
        <header className="ed-rec-head">
          <p className="ed-kicker">
            אקדמיה · <En>{L.course.module}</En> · {L.course.title}
          </p>
          <h3 id="rec-lesson" className="ed-rec-title">
            {L.lesson.title}
          </h3>
        </header>
        <aside className="ed-margin" aria-label="מטא-נתונים של השיעור">
          <dl className="ed-meta">
            <div>
              <dt>קורס</dt>
              <dd>
                <Mod code={L.course.module} he={L.course.title} />
              </dd>
            </div>
            <div>
              <dt>פרק</dt>
              <dd>
                <N v={p.chapterIndex} /> מתוך <N v={p.chapterCount} /> · {p.chapterTitle}
              </dd>
            </div>
            <div>
              <dt>מיקום</dt>
              <dd>
                שיעור <N v={p.posInChapter} /> מתוך <N v={p.chapterSize} /> בפרק · <N v={p.globalIndex} /> מתוך <N v={p.globalTotal} /> בקורס
              </dd>
            </div>
            <div>
              <dt>רמה וזמן</dt>
              <dd>
                {L.lesson.level} · <N v={L.lesson.minutes} /> דקות
              </dd>
            </div>
            <div>
              <dt>אימות השיעור</dt>
              <dd>{LESSON_TRUST[L.lesson.trust] ?? <Missing />}</dd>
            </div>
            <div>
              <dt>מקור</dt>
              <dd>{L.lesson.source ? <En>{L.lesson.source}</En> : <Missing />}</dd>
            </div>
          </dl>
        </aside>
        <div className="ed-record">
          <h4 className="ed-h4">מה תלמדו</h4>
          <p className="ed-read">{objectiveText ? <Inline text={objectiveText} /> : <Missing />}</p>
          <div className="ed-actions">
            <Link prefetch={false} className="ed-btn ed-btn-primary" href={href}>
              התחלת השיעור
            </Link>
            <p className="ed-note">
              כשהשיעור כבר נפתח במכשיר הזה, הכפתור הופך ל״המשך מהמקום שעצרתם״. ההתקדמות נשמרת במכשיר בלבד.
            </p>
          </div>
          <h4 className="ed-h4">תוכן השיעור</h4>
          <ol className="ed-lesson-toc">
            {blocks.map((b, i) => (
              <li key={b.kind}>
                <Link prefetch={false} href={`${href}#nxs-${b.kind}`}>
                  <span className="ed-lesson-n" aria-hidden="true">
                    <bdi>{i + 1}</bdi>
                  </span>
                  <span className="ed-lesson-t">{b.title || BLOCK_META[b.kind].he}</span>
                  {b.trust === "verified-docs" || b.trust === "verified-system" ? (
                    <span className="ed-lesson-v">
                      <BadgeCheck size={14} aria-hidden="true" />
                      <span className="ed-sr">{LESSON_TRUST[b.trust]}</span>
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ol>
          <p className="ed-note">
            <BadgeCheck size={14} aria-hidden="true" /> ליד פריט: מאומת מול תיעוד. בלי סימן: תוכן ערוך.
          </p>
          <nav className="ed-prevnext" aria-label="שיעורים סמוכים">
            {L.prev ? (
              <Link prefetch={false} href={L.prev.href}>
                <ChevronRight size={16} aria-hidden="true" />
                <span>
                  <span className="ed-prevnext-k">הקודם</span> {L.prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {L.next ? (
              <Link prefetch={false} href={L.next.href}>
                <span>
                  <span className="ed-prevnext-k">הבא</span> {L.next.title}
                </span>
                <ChevronLeft size={16} aria-hidden="true" />
              </Link>
            ) : null}
          </nav>
        </div>
      </article>
    </Sec>
  );
}

/* ======================================================= 10 · status */

function StatusSection() {
  return (
    <Sec n={10}>
      <GreyCheck>
        <div className="ed-scroll" role="region" aria-label="חמשת מצבי S/4" tabIndex={0}>
          <table className="ed-table ed-legend-table">
            <caption>
              חמישה מצבי <En>S/4HANA</En>
            </caption>
            <thead>
              <tr>
                <th scope="col">סמל ומילה</th>
                <th scope="col">משמעות</th>
                <th scope="col">הסטטוסים הקנוניים שבמצב</th>
              </tr>
            </thead>
            <tbody>
              {S5_ORDER.map((s) => (
                <tr key={s}>
                  <th scope="row">
                    <StateWord s={s} />
                  </th>
                  <td><Bidi text={S5_NOTE[s]} /></td>
                  <td className="ed-members"><Bidi text={S5_MEMBERS[s].join(" · ")} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ed-scroll" role="region" aria-label="ארבע רמות האימות" tabIndex={0}>
          <table className="ed-table ed-legend-table">
            <caption>ארבע רמות אימות</caption>
            <thead>
              <tr>
                <th scope="col">סמל, מילה וקו</th>
                <th scope="col">דפוס</th>
                <th scope="col">רמות המקור שבה</th>
              </tr>
            </thead>
            <tbody>
              {V4_ORDER.map((v) => (
                <tr key={v}>
                  <th scope="row">
                    <Verif v={v} />
                  </th>
                  <td>
                    <span className="ed-line-sample" data-v4={v} aria-hidden="true" /> {V4_LINE[v]}
                  </td>
                  <td className="ed-members"><Bidi text={V4_MEMBERS[v].join(" · ")} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ed-note">
          בכל שורה ובכל רשומה מודפסת המילה הקנונית של המוצר, למשל ״לא אסטרטגי ב־<En>S/4HANA</En>״; המצב קובע רק את הסמל והצבע. כך
          שורה, רשומה ותוצאת חיפוש אומרות אותן מילים.
        </p>
      </GreyCheck>
    </Sec>
  );
}

/* ======================================================== 11 · legal */

function LegalSection() {
  return (
    <Sec n={11}>
      <article className="ed-row" aria-labelledby="legal-h">
        <header className="ed-rec-head">
          <h3 id="legal-h" className="ed-rec-title">
            הצהרת נגישות
          </h3>
          <p className="ed-legal-meta">
            עודכנה לאחרונה: <Todo />
          </p>
        </header>
        <aside className="ed-margin" aria-label="מטא-נתונים של העמוד">
          <dl className="ed-meta">
            <div>
              <dt>סוג עמוד</dt>
              <dd>משפטי</dd>
            </div>
            <div>
              <dt>נגיש מ־</dt>
              <dd>תחתית כל עמוד, ביום ובלילה</dd>
            </div>
            <div>
              <dt>עודכן</dt>
              <dd>
                <Todo />
              </dd>
            </div>
          </dl>
        </aside>
        <div className="ed-legal">
          <h4 className="ed-h4">על ההצהרה</h4>
          <p className="ed-read">
            הצהרה זו מתארת את מצב הנגישות של <En>SAP by Sali</En> ואת הדרך לפנות בנושא.
          </p>
          <h4 className="ed-h4">רמת ההתאמה</h4>
          <p className="ed-read">
            רמת ההתאמה לתקן הישראלי <bdi>5568</bdi> ולהנחיות <En>WCAG</En>: <Todo />
          </p>
          <h4 className="ed-h4">יעדי התכנון</h4>
          <ul className="ed-bullets">
            <li>ניגודיות ברמת <En>AA</En> לטקסט ולממשק, ביום ובלילה.</li>
            <li>הפעלה מלאה במקלדת, עם טבעת מיקוד גלויה.</li>
            <li>כיבוד העדפת הפחתת התנועה של מערכת ההפעלה.</li>
            <li>עברית מימין לשמאל, ומזהי <En>SAP</En> מבודדים משמאל לימין.</li>
          </ul>
          <h4 className="ed-h4">מגבלות ידועות</h4>
          <p className="ed-read">
            <Todo />
          </p>
          <h4 className="ed-h4">פנייה בנושא נגישות</h4>
          <dl className="ed-legal-contact">
            <div>
              <dt>רכז או רכזת הנגישות</dt>
              <dd>
                <Todo />
              </dd>
            </div>
            <div>
              <dt>טלפון</dt>
              <dd>
                <Todo />
              </dd>
            </div>
            <div>
              <dt>דואר אלקטרוני</dt>
              <dd>
                <Todo />
              </dd>
            </div>
          </dl>
          <h4 className="ed-h4">תאריך עדכון ההצהרה</h4>
          <p className="ed-read">
            <Todo />
          </p>
        </div>
      </article>
    </Sec>
  );
}

/* ======================================================= 12 · states */

function StatesSection({ total }: { total: number }) {
  return (
    <Sec n={12}>
      <div className="ed-states">
        <EmptyDemo total={total} />
        <RetryDemo src="/books/book1/ch6.json" chapter="פרק 6" />
      </div>
    </Sec>
  );
}

/* ======================================================= 13 · motion */

function MotionSection({ entries }: { entries: Entry[] }) {
  return (
    <Sec n={13}>
      <Reveal>
        <Contents entries={entries} />
      </Reveal>
      <dl className="ed-motion-spec">
        <div>
          <dt>קווי המפתח</dt>
          <dd>
            נמתחים מימין לשמאל פעם אחת, <bdi dir="ltr">420ms</bdi>, בעקומת יציאה רכה.
          </dd>
        </div>
        <div>
          <dt>הערכים</dt>
          <dd>
            נכנסים בשקיפות ובהזזה של <bdi dir="ltr">4px</bdi>, <bdi dir="ltr">220ms</bdi> לכל ערך, בהפרש של{" "}
            <bdi dir="ltr">50ms</bdi> ובתקרה של <bdi dir="ltr">300ms</bdi>.
          </dd>
        </div>
        <div>
          <dt>גבולות</dt>
          <dd>
            רק <bdi dir="ltr">transform</bdi> ו־<bdi dir="ltr">opacity</bdi>, פעם אחת, בלי לולאה ובלי תלות בגלילה. משך כולל עד{" "}
            <bdi dir="ltr">800ms</bdi>.
          </dd>
        </div>
        <div>
          <dt>הפחתת תנועה</dt>
          <dd>תוכן העניינים מוצג במצבו הסופי מיד: בלי מתיחת קווים, בלי השהיה ובלי כניסה מדורגת.</dd>
        </div>
      </dl>
    </Sec>
  );
}
