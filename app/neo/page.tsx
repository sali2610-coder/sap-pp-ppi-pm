import Link from "next/link";
import {
  ArrowUpLeft, BookOpen, BrainCircuit, ClipboardCheck, EyeOff, GitBranch, GraduationCap,
  HardDrive, Library, Plug, Route, Search, ShieldCheck, Sparkles, Table, Terminal, TriangleAlert, UserX,
  type LucideIcon,
} from "lucide-react";
// The interaction system first, the page's own sheet second: Home never invents
// a control style, it consumes .nu-* and only overrides layout around them.
import "./ui.css";
import "./home.css";
import "./home-workspaces.css";
import { SiteLogo } from "@/components/site-logo";
import { homeData, type HomeData } from "@/components/neo-shell/home/home-data";
import { HomeScene, type SceneSection } from "@/components/neo-shell/home/home-scene";
import { HomeNet } from "@/components/neo-shell/home/home-net";
import { HomeContinue } from "@/components/neo-shell/home/home-continue";
import { booksData, type BookCard } from "@/components/neo-shell/books/books-data";
import { shellData } from "@/components/neo-shell/nav-data";
import { allModuleIds } from "@/lib/academy/model";

// ROOT CUTOVER. `/` 307s here, so this page is the site's public landing page
// and MUST be indexable. The other noindex declarations under app/neo/ stay
// exactly as they are; scripts/gen-sitemap.mjs reads the built HTML's robots
// meta, so /neo/ enters the sitemap automatically.
export const metadata = {
  title: "Project NEO · מפת הידע ל-SAP S/4HANA",
  robots: { index: true, follow: true },
};

const nf = new Intl.NumberFormat("he-IL");
const pct = (a: number, b: number) => Math.round((a / b) * 100);

// THE HOME — a focused professional entrance, not a product manual.
//
// Four scenes keep Astra's visual system and spend the page on what the site
// actually holds. Every count is read from the registry the destination page
// renders from, so Home and the rail cannot disagree.
//
//   01  deep   identity, global search, resume, and the protected entry cards.
//   02  cream  the collections: the library shelf and eight direct entries.
//   03  data   the two module environments, each with its process steps.
//   04  deep   privacy in the policy's own terms, and the credit.

/** Split a list into n roughly equal slices, in order — the three parallax
 *  columns of the hero name wall, deterministic. */
function slices<T>(list: T[], n: number): T[][] {
  const size = Math.ceil(list.length / n);
  return Array.from({ length: n }, (_, i) => list.slice(i * size, (i + 1) * size));
}

/** Entry hues, the same three the gate's start cards wear: reference work takes
 *  the data model's blue, field know-how the assistant's green, learning the
 *  library's teal. */
const REF = "var(--mod-pppi)";
const KNOW = "var(--mod-pp)";
const LEARN = "var(--mod-pm)";

interface Tile {
  href: string;
  label: string;
  n: number | null;
  unit: string;
  /** The destination page's own metadata description, shortened. */
  text: string;
  Icon: LucideIcon;
  m: string;
}

/** One collection on the content index. A destination without a backed count
 *  shows none rather than an estimate. */
function CollectionTile({ t }: { t: Tile }) {
  return (
    <Link href={t.href} prefetch={false} className="nh-tile nm-rise" style={{ "--m": t.m } as React.CSSProperties}>
      <span className="nh-tile-top">
        <span className="nh-tile-ico"><t.Icon size={20} strokeWidth={1.6} aria-hidden="true" /></span>
        <b className="nh-tile-t">{t.label}</b>
      </span>
      <span className="nh-tile-n">
        {t.n !== null && <><b className="nh-sap">{nf.format(t.n)}</b>{" "}<em>{t.unit}</em></>}
        <ArrowUpLeft className="nh-tile-go" size={17} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="nh-tile-d">{t.text}</span>
    </Link>
  );
}

/** The library as a shelf: the real books in their own binding cloth, each
 *  spine as wide as books-data says the book is thick (its page count,
 *  normalised across the shelf), as tall as its real section count allows
 *  (square root, 70% to 100%), and lettered with its module code. The same
 *  cloth and order the library itself uses, so a book is recognisable here. */
function LibraryBand({ books, totals }: { books: BookCard[]; totals: { books: number; chapters: number; sections: number; modules: number } }) {
  const most = Math.max(...books.map((b) => b.sections));
  return (
    <Link href="/neo/books/" prefetch={false} className="nh-lib nm-rise" style={{ "--m": LEARN } as React.CSSProperties}>
      <span className="nh-lib-copy">
        <span className="nh-tile-top">
          <span className="nh-tile-ico"><Library size={20} strokeWidth={1.6} aria-hidden="true" /></span>
          <b className="nh-tile-t">ספריית SAP</b>
        </span>
        <span className="nh-lib-d">
          {nf.format(totals.books)} ספרים מקצועיים ב־{nf.format(totals.modules)} תחומי SAP, לקריאה בתוך האתר
          ולהמשך מהמקום שבו עצרת.
        </span>
        <span className="nh-lib-n">
          <span><b className="nh-sap">{nf.format(totals.books)}</b>{" "}<em>ספרים</em></span>
          <span><b className="nh-sap">{nf.format(totals.chapters)}</b>{" "}<em>פרקים</em></span>
          <span><b className="nh-sap">{nf.format(totals.sections)}</b>{" "}<em>סעיפים</em></span>
        </span>
        <span className="nh-lib-go">לכל הספרים<ArrowUpLeft size={16} strokeWidth={1.75} aria-hidden="true" /></span>
      </span>
      <span
        className="nh-shelf"
        aria-hidden="true"
        style={{ gridTemplateColumns: books.map((b) => `${(1 + b.thick).toFixed(2)}fr`).join(" ") }}
      >
        {books.map((b, i) => (
          <i key={b.id} style={{ "--cloth": b.cloth, "--i": i, "--h": (0.7 + 0.3 * Math.sqrt(b.sections / most)).toFixed(3) } as React.CSSProperties}>
            <span>{b.module}</span>
          </i>
        ))}
      </span>
    </Link>
  );
}

/** One module entry card — real counts from the module's own dataset, and the
 *  module's process steps in their own order. Steps are numbered, not joined
 *  by arrows: whether two step tables are related is a different question,
 *  which the dictionary answers for only some crossings. A step whose table is
 *  not in the module's dictionary says so, as the workspace map does. */
function ModuleCard({ d, i }: { d: HomeData; i: 0 | 1 }) {
  const mo = d.modules[i];
  const flow = d.flows[i];
  return (
    <Link
      href={mo.href}
      prefetch={false}
      className="nh-mod nm-rise"
      aria-label={`כניסה לסביבת ${mo.code} · ${mo.he}`}
      style={{ "--m": mo.m } as React.CSSProperties}
    >
      <span className="nh-mod-top">
        <b className="nh-sap">{mo.code}</b>
        <span className="nh-mod-he">{mo.he}<span className="nh-mod-en"><bdi dir="ltr">{mo.en}</bdi></span></span>
        <ArrowUpLeft size={17} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="nh-work-purpose">{i === 0 ? "טבלאות, פעולות וקשרים לעבודה עם נתוני האחזקה." : "טבלאות, פעולות וקשרים לעבודה עם נתוני הייצור התהליכי."}</span>
      <div className="nh-flow">
        <em>תהליך העבודה, שלב אחר שלב</em>
        <ol className="nh-flow-steps">
          {flow.steps.map((s, k) => (
            <li key={`${s.code}-${k}`} data-gap={s.exists ? undefined : "1"}>
              <span className="nh-step">
                <i className="nh-sap">{s.code}</i>
                <span>
                  {s.label}
                  {!s.exists && <em> · לא מתועד במודול</em>}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <span className="nh-mod-nums">
        <span><b className="nh-sap">{nf.format(mo.tables)}</b>{" "}<em>טבלאות</em></span>
        <span><b className="nh-sap">{nf.format(mo.fields)}</b>{" "}<em>שדות</em></span>
        <span><b className="nh-sap">{nf.format(mo.tcodes)}</b>{" "}<em>טרנזקציות בתיעוד המודול</em></span>
        <span><b className="nh-sap">{nf.format(mo.funcs)}</b>{" "}<em>BAPI · FM · IDoc</em></span>
        <span><b className="nh-sap">{nf.format(mo.cds)}</b>{" "}<em>CDS Views</em></span>
        <span><b className="nh-sap">{nf.format(mo.fiori)}</b>{" "}<em>יישומי Fiori</em></span>
      </span>
      <span className="nh-mod-share">
        <span className="nh-bar" aria-hidden="true">
          <i className="nm-grow" style={{ "--p": mo.share } as React.CSSProperties} />
        </span>
        <em className="nh-sap">{pct(mo.tables, d.tables)}%</em>
        <span>
          {nf.format(mo.tables)} מתוך {nf.format(d.tables)} הטבלאות הייחודיות במודל, ו־{nf.format(d.shared)} מהן
          משותפות ל־<bdi dir="ltr">PM</bdi> ול־<bdi dir="ltr">PP-PI</bdi>
        </span>
      </span>
      <span className="nh-work-enter">כניסה לסביבת <bdi dir="ltr">{mo.code}</bdi><ArrowUpLeft size={16} aria-hidden="true" /></span>
    </Link>
  );
}

export default function NeoHome() {
  const d = homeData();
  const lib = booksData();
  const resumeBooks = lib.books.map((b) => ({
    id: b.id, title: b.titleHe || b.titleEn,
    chapters: b.chapterRows.map((c) => ({ n: c.n, sections: c.rows.map(([id]) => id) })),
  }));
  // The rail's own counts (nav-data.ts), so a tile and its rail item agree.
  const rail = new Map(shellData().groups.flatMap((g) => g.items).map((it) => [it.id, it.count] as const));
  const count = (id: string) => rail.get(id) ?? null;
  const erdLinks = count("erd");

  const sections: SceneSection[] = [
    { id: "nh-1", label: "פתיחה", field: "S/4HANA תחילה", tone: "#c8102e" },
    { id: "nh-quick", label: "מה באתר", field: "הספרייה והאוספים", tone: "#c8102e" },
    { id: "nh-2", label: "מסלולים", field: "PM · PP-PI", tone: "#47a8ff" },
    { id: "nh-4", label: "מידע", field: "פרטיות וקרדיט", tone: "#c8102e" },
  ];

  // Three real entry points. Each label states its counting scope.
  const stats: [number, string, string][] = [
    [d.tables, "טבלאות ייחודיות במודל", "/neo/tables/"],
    [d.tcodes, "טרנזקציות בקטלוג", "/neo/transactions/"],
    [allModuleIds().length, "מסלולי לימוד באקדמיה", "/neo/academy/"],
  ];

  // Tables are counted UNIQUE, as in the gate above. The rail counts the
  // dictionary ROWS, so the tile states that number and why the two differ.
  const tiles: Tile[] = [
    { href: "/neo/tables/", label: "טבלאות SAP", n: d.tables, unit: "טבלאות ייחודיות", text: `${nf.format(d.dictRows)} רשומות במילון, כי ${nf.format(d.shared)} טבלאות מתועדות גם ב-PM וגם ב-PP-PI`, Icon: Table, m: REF },
    { href: "/neo/transactions/", label: "טרנזקציות", n: count("transactions"), unit: "בקטלוג", text: "מודול, נושא, אובייקט עסקי ויישום Fiori עוקב", Icon: Terminal, m: REF },
    { href: "/neo/bapi/", label: "BAPI ו-FM", n: count("bapi"), unit: "אובייקטי פונקציה", text: "משמעות, טבלאות וטרנזקציות מקושרות לכל פונקציה", Icon: Plug, m: REF },
    { href: "/neo/domain-model/", label: "תחומים עסקיים", n: count("domain-model"), unit: "תחומים", text: "זרימה עסקית, טבלאות, טרנזקציות ותקלות לכל תחום", Icon: Route, m: REF },
    { href: "/neo/knowledge/", label: "מרכז הידע", n: count("knowledge"), unit: "רשומות", text: "מושגי SAP עם הסבר עסקי והסבר טכני", Icon: BrainCircuit, m: KNOW },
    { href: "/neo/incidents/", label: "תקלות", n: count("incidents"), unit: "תקלות מתועדות", text: "סימפטום, סיבות שורש, אבחון, תיקון ומניעה", Icon: TriangleAlert, m: KNOW },
    { href: "/neo/best-practices/", label: "שיטות עבודה מומלצות", n: count("best-practices"), unit: "שיטות", text: "צעדי עבודה, דפוסים שגויים ובדיקות לכל שיטה", Icon: ClipboardCheck, m: KNOW },
    { href: "/neo/academy/", label: "אקדמיה", n: count("academy"), unit: "קורסים", text: "מסלולי לימוד עם פרקים ושיעורים לפי מודול", Icon: GraduationCap, m: LEARN },
  ];

  return (
    <HomeScene sections={sections}>
      {/* ============================================================ 01 · deep
          THE GATE. Identity, scope, S/4HANA first. Behind the headline: the
          real merged table names and the modelled ER field, as atmosphere. */}
      <section
        className="nh-sec"
        data-scene="deep"
        id="nh-1"
        data-hsec
        aria-labelledby="nh-1-h"
      >
       <div className="nh-body nh-gate nm-scene">
        <div className="nh-wall" aria-hidden="true">
          {slices(d.dots, 3).map((col, ci) => (
            <span className={`nh-wall-c ${ci === 1 ? "nm-par-slow" : "nm-par"}`} key={ci} data-c={ci}>
              {col.map((x) => (
                <i key={x.n}>{x.n}</i>
              ))}
            </span>
          ))}
        </div>
        <div className="nh-mid nm-par" aria-hidden="true">
          <HomeNet dots={d.dots} edges={d.edges} faint />
        </div>
        <span className="nh-glow" aria-hidden="true" />

        <div className="nh-in nh-gate-in nh-gate-layout">
         <div className="nh-gate-copy">
          <div className="nh-mast">
            <SiteLogo tone="dark" size="hero" className="nh-brand nm-rise nm-once" />
            <p className="nh-eye nh-eye--gate">
              <span>SAP Enterprise</span>
              <span>Knowledge Platform</span>
              <span>CBC Israel</span>
            </p>
          </div>

          <h1 className="nh-mega nm-kin" id="nh-1-h">
            <span><span>מפת הידע</span></span>
            <span><span>ל-<span className="nh-sap">SAP S/4HANA</span></span></span>
          </h1>
          <p className="nh-lede nh-lede--gate">
            פלטפורמת ידע מקצועית למודולי <span className="nh-sap">PM</span> ו-<span className="nh-sap">PP-PI</span>:
            אובייקטים עסקיים, טבלאות, טרנזקציות, קשרי נתונים והמעבר מ-<span className="nh-sap">ECC</span> ל-
            <span className="nh-sap">S/4HANA</span>. מקום אחד לחיפוש, ללמידה ולהבנת הקשרים בין הנתונים.
          </p>
          <div className="nh-cta">
            <button className="nh-find" type="button" data-neo-open-search aria-keyshortcuts="Meta+K Control+K">
              <span className="nh-find-ico"><Search size={19} strokeWidth={2} aria-hidden="true" /></span>
              <span className="nh-find-t">
                <b>חיפוש בכל האתר</b>
                <span>טבלה, שדה, טרנזקציה, BAPI או ספר, מכל מסך</span>
              </span>
              <kbd dir="ltr">⌘/Ctrl K</kbd>
            </button>
          </div>
          <div className="nh-stats nm-seq">
            {stats.map(([n, l, href]) => (
              <Link className="nh-stat nm-rise" key={l} href={href} prefetch={false}>
                <b className="nh-sap">{nf.format(n)}</b>{" "}
                <em>{l}</em>
              </Link>
            ))}
          </div>
          <HomeContinue objects={d.dots.map(({ n, he }) => ({ name: n, title: he }))} books={resumeBooks} />
         </div>
         <nav className="nh-start" aria-label="כניסה לספרייה, לעוזר ולמודל הנתונים">
          <p className="nh-start-eye">סביבת העבודה שלך</p>
          <Link href="/neo/books/" prefetch={false} className="nh-start-card" style={{ "--entry": "var(--mod-pm)" } as React.CSSProperties}>
            <span className="nh-start-icon"><BookOpen size={25} strokeWidth={1.6} aria-hidden="true" /></span>
            <span className="nh-start-copy">
              <b>ספריית SAP</b>
              <span>ספרים, פרקים ומקום הקריאה האחרון שלך</span>
              <em className="nh-start-meta"><b className="nh-sap">{nf.format(lib.totals.books)}</b> ספרים · <b className="nh-sap">{nf.format(lib.totals.sections)}</b> סעיפים</em>
            </span>
            <ArrowUpLeft className="nh-start-arrow" size={18} aria-hidden="true" />
          </Link>
          <Link href="/neo/ai/" prefetch={false} className="nh-start-card" style={{ "--entry": "var(--mod-pp)" } as React.CSSProperties}>
            <span className="nh-start-icon"><Sparkles size={25} strokeWidth={1.6} aria-hidden="true" /></span>
            <span className="nh-start-copy">
              <b>שאל את הספרייה</b>
              <span>שאלות על התוכן, עם מקורות לקריאה</span>
            </span>
            <ArrowUpLeft className="nh-start-arrow" size={18} aria-hidden="true" />
          </Link>
          <Link href="/neo/erd/" prefetch={false} className="nh-start-card" style={{ "--entry": "var(--mod-pppi)" } as React.CSSProperties}>
            <span className="nh-start-icon"><GitBranch size={25} strokeWidth={1.6} aria-hidden="true" /></span>
            <span className="nh-start-copy">
              <b>מודל הנתונים</b>
              <span>מודולים, טבלאות והקשרים ביניהם</span>
              {erdLinks !== null && (
                <em className="nh-start-meta"><b className="nh-sap">{nf.format(erdLinks)}</b> קשרים במודל</em>
              )}
            </span>
            <ArrowUpLeft className="nh-start-arrow" size={18} aria-hidden="true" />
          </Link>
          <p className="nh-start-note">בחר נקודת כניסה, והמשך משם אל התוכן והכלים.</p>
         </nav>
        </div>
       </div>
      </section>

      {/* =========================================================== 02 · cream
          WHAT THE SITE HOLDS. The library first, as its real shelf, then the
          eight collections, each with the count its own page renders. */}
      <section className="nh-sec" data-scene="cream" id="nh-quick" data-hsec aria-labelledby="nh-quick-h">
       <div className="nh-body nm-scene">
        <div className="nh-in">
          <div className="nh-head">
            <p className="nh-eye nm-fade">התוכן באתר<i aria-hidden="true" />כניסה ישירה</p>
            <h2 className="nh-h2 nm-kin" id="nh-quick-h">
              <span><span>מה יש באתר</span></span>
              <span><span className="nh-dim">ספרייה, מילון טכני וידע מהשטח</span></span>
            </h2>
          </div>
          <nav className="nh-hub nm-seq" aria-label="אוספי התוכן באתר">
            <LibraryBand books={lib.books} totals={lib.totals} />
            {tiles.map((t) => <CollectionTile key={t.href} t={t} />)}
          </nav>
        </div>
       </div>
      </section>

      {/* =========================================================== 03 · data
          THE WORK PATHS. The two module environments, side by side. */}
      <section
        className="nh-sec"
        data-scene="data"
        id="nh-2"
        data-hsec
        aria-labelledby="nh-2-h"
      >
       <div className="nh-body nm-scene">
        <div className="nh-in">
          <div className="nh-head">
            <p className="nh-eye nm-fade">מסלולי עבודה<i aria-hidden="true" />שתי סביבות</p>
            <h2 className="nh-h2 nm-kin" id="nh-2-h">
              <span><span>בחירת סביבת עבודה</span></span>
              <span><span className="nh-dim">כל מודול עם הטבלאות, הפעולות והתהליך שלו</span></span>
            </h2>
          </div>

          <div className="nh-paths nm-seq">
            <ModuleCard d={d} i={0} />
            <ModuleCard d={d} i={1} />
          </div>
        </div>
       </div>
      </section>

      {/* =========================================================== 04 · deep
          THE CLOSE. Privacy, stated only as far as /neo/privacy states it, and
          the credit. */}
      <section
        className="nh-sec"
        data-scene="deep"
        id="nh-4"
        data-hsec
        aria-labelledby="nh-4-h"
      >
       <div className="nh-body nh-close nm-scene">
        <span className="nh-glow" aria-hidden="true" />
        <div className="nh-in">
          <div className="nh-end-copy">
            <SiteLogo tone="dark" size="lg" className="nh-end-logo" />
            <h2 className="nh-h2 nm-kin" id="nh-4-h">
              <span><span>הידע שלך, במקום אחד</span></span>
              <span><span className="nh-dim">והפרטיות שלך נשארת אצלך</span></span>
            </h2>
            <div className="nh-cta nm-rise">
              <button className="nu-btn" type="button" data-neo-open-search>
                <Search size={15} strokeWidth={1.75} aria-hidden="true" />
                חיפוש בכל האתר
              </button>
              <Link className="nu-btn2" href="/neo/privacy/" prefetch={false}>
                <ShieldCheck size={15} strokeWidth={1.75} aria-hidden="true" />
                מדיניות הפרטיות
              </Link>
            </div>
          </div>
          <ul className="nh-priv nm-seq" aria-label="הפרטיות שלך באתר">
            <li className="nm-rise">
              <span className="nh-priv-ico"><UserX size={19} strokeWidth={1.6} aria-hidden="true" /></span>
              <b>בלי הרשמה ובלי חשבון</b>
              <span>האתר לא מבקש שם, דוא״ל או מספר טלפון.</span>
            </li>
            <li className="nm-rise">
              <span className="nh-priv-ico"><HardDrive size={19} strokeWidth={1.6} aria-hidden="true" /></span>
              <b>ההתקדמות נשמרת אצלך</b>
              <span>התקדמות בלימוד, סימניות ומצב תצוגה נשמרים בדפדפן שלך ואינם נשלחים לשרת.</span>
            </li>
            <li className="nm-rise">
              <span className="nh-priv-ico"><EyeOff size={19} strokeWidth={1.6} aria-hidden="true" /></span>
              <b>בלי מעקב ובלי פרסומות</b>
              <span>אין כלי אנליטיקה, פיקסלים או עוגיות פרסום.</span>
            </li>
          </ul>

          <footer>
            <p className="nh-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>
          </footer>
        </div>
       </div>
      </section>
    </HomeScene>
  );
}
