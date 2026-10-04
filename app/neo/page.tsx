import Link from "next/link";
import { ArrowUpLeft, BookOpen, GitBranch, GraduationCap, Route, Search, ShieldCheck, Sparkles, Table, Terminal, Waypoints } from "lucide-react";
// The interaction system first, the page's own sheet second: Home never invents
// a control style, it consumes .nu-* and only overrides layout around them.
import "./ui.css";
import "./home.css";
import { SiteLogo } from "@/components/site-logo";
import { homeData, type HomeData } from "@/components/neo-shell/home/home-data";
import { HomeScene, type SceneSection } from "@/components/neo-shell/home/home-scene";
import { HomeNet } from "@/components/neo-shell/home/home-net";
import { HomeContinue } from "@/components/neo-shell/home/home-continue";
import { booksData } from "@/components/neo-shell/books/books-data";

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
// Five scenes retain Astra's visual system while putting search and direct
// entry points before the workspaces. Counts come from the project dataset;
// the resume card reads only Astra's existing local history.
//
//   01  deep   identity, global search, resume, and the protected entry cards.
//   02  cream  seven direct links to the content and tools.
//   03  data   the three work paths: PM, PP-PI, S/4HANA readiness.
//   04  s4     the transition picture and the cockpit.
//   05  deep   site information, privacy, and the credit.

/** Split a list into n roughly equal slices, in order — the three parallax
 *  columns of the hero name wall, deterministic. */
function slices<T>(list: T[], n: number): T[][] {
  const size = Math.ceil(list.length / n);
  return Array.from({ length: n }, (_, i) => list.slice(i * size, (i + 1) * size));
}

/** One module entry card — real counts from the module's own dataset. */
function ModuleCard({ d, i }: { d: HomeData; i: 0 | 1 }) {
  const mo = d.modules[i];
  return (
    <Link
      href={mo.href}
      prefetch={false}
      className="nh-mod nm-rise nm-lift"
      aria-label={`כניסה לסביבת ${mo.code} · ${mo.he}`}
      style={{ "--m": mo.m } as React.CSSProperties}
    >
      <span className="nh-mod-top">
        <b className="nh-sap">{mo.code}</b>
        <span className="nh-mod-he">{mo.he}</span>
        <ArrowUpLeft size={17} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="nh-mod-nums">
        <span><b className="nh-sap">{nf.format(mo.tables)}</b><em>טבלאות</em></span>
        <span><b className="nh-sap">{nf.format(mo.fields)}</b><em>שדות</em></span>
        <span><b className="nh-sap">{nf.format(mo.tcodes)}</b><em>טרנזקציות</em></span>
        <span><b className="nh-sap">{nf.format(mo.funcs)}</b><em>BAPI · FM · IDoc</em></span>
        <span><b className="nh-sap">{nf.format(mo.cds)}</b><em>CDS Views</em></span>
        <span><b className="nh-sap">{nf.format(mo.fiori)}</b><em>יישומי Fiori</em></span>
      </span>
      <span className="nh-mod-share">
        <span className="nh-bar" aria-hidden="true">
          <i className="nm-grow" style={{ "--p": mo.share } as React.CSSProperties} />
        </span>
        <em className="nh-sap">{pct(mo.tables, d.tables)}%</em>
        <span>מתוך {nf.format(d.tables)} טבלאות SAP מתועדות</span>
      </span>
    </Link>
  );
}

export default function NeoHome() {
  const d = homeData();
  const resumeBooks = booksData().books.map((b) => ({
    id: b.id, title: b.titleHe || b.titleEn,
    chapters: b.chapterRows.map((c) => ({ n: c.n, sections: c.rows.map(([id]) => id) })),
  }));
  const marked = d.migration.adapted + d.migration.replaced + d.migration.removed;

  const sections: SceneSection[] = [
    { id: "nh-1", label: "פתיחה", field: "S/4HANA תחילה", tone: "#c8102e" },
    { id: "nh-quick", label: "כניסות מהירות", field: "התוכן והכלים", tone: "#c8102e" },
    { id: "nh-2", label: "מסלולים", field: "PM · PP-PI · מעבר", tone: "#47a8ff" },
    { id: "nh-3", label: "S/4HANA", field: "תמונת המעבר", tone: "#47a8ff" },
    { id: "nh-4", label: "מידע", field: "אודות ופרטיות", tone: "#c8102e" },
  ];

  // ONE COUNTING BASIS. The hero states 105 merged-unique tables, so the two
  // numbers beside it are computed on the same basis: fields as the per-table
  // max the dots already carry (a shared table's fields counted once), and
  // relations as the deduplicated undirected ER pairs the page itself draws —
  // not the 126 per-module relation rows.
  // THREE NUMBERS THAT LEAD SOMEWHERE (design audit S7-HOME-4: drop the
  // metrics that do not help choose an action). Each one is the size of the
  // catalog it opens: the tables, the transactions, and the tables the
  // blueprints mark for change in the move. The field and ER-relation counts
  // left the gate: they describe the model, they do not choose a door, and
  // both are still counted where they are used (the module cards below, the
  // data model itself).
  const stats: [number, string, string][] = [
    [d.tables, "טבלאות SAP", "/neo/tables/"],
    [d.tcodes, "טרנזקציות", "/neo/transactions/"],
    [marked, "מסומנות לשינוי במעבר", "/neo/s4hana/"],
  ];

  // The verdict labels are lib/s4-class S4_HE, verbatim — the blueprint's own
  // vocabulary. Tables whose note states no verdict are simply not counted.
  const impact: { he: string; n: number; k: "adapted" | "replaced" | "removed" }[] = [
    { he: "מותאם", n: d.migration.adapted, k: "adapted" },
    { he: "הוחלף", n: d.migration.replaced, k: "replaced" },
    { he: "הוסר", n: d.migration.removed, k: "removed" },
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
          <SiteLogo tone="dark" size="hero" className="nh-brand nm-rise nm-once" />

          <p className="nh-eye nh-eye--gate">
            SAP Enterprise Knowledge Platform
            <i aria-hidden="true" />
            CBC Israel
          </p>

          <h1 className="nh-mega nm-kin" id="nh-1-h">
            <span><span>מפת הידע</span></span>
            <span><span>ל-<span className="nh-sap">SAP S/4HANA</span></span></span>
          </h1>
          <p className="nh-lede nh-lede--gate">
            פלטפורמת ידע מקצועית למודולי <span className="nh-sap">PM</span> ו-<span className="nh-sap">PP-PI</span>:
            אובייקטים עסקיים, טבלאות, טרנזקציות, קשרי נתונים והמעבר מ-<span className="nh-sap">ECC</span> ל-
            <span className="nh-sap">S/4HANA</span>. זמינה במלואה גם ללא חיבור לרשת.
          </p>
          <div className="nh-stats nm-seq">
            {stats.map(([n, l, href]) => (
              <Link className="nh-stat nm-rise" key={l} href={href} prefetch={false}>
                <b className="nh-sap">{nf.format(n)}</b>
                <em>{l}</em>
              </Link>
            ))}
          </div>
          <div className="nh-cta">
            <button className="nu-btn" type="button" data-neo-open-search aria-label="פתיחת החיפוש הגלובלי">
              <Search size={15} strokeWidth={1.75} aria-hidden="true" />
              חיפוש בכל האתר
            </button>
          </div>
          <p className="nh-start-note">פתיחה מכל מסך באמצעות <kbd dir="ltr">⌘/Ctrl+K</kbd></p>
          <HomeContinue objects={d.dots.map(({ n, he }) => ({ name: n, title: he }))} books={resumeBooks} />
         </div>
         <nav className="nh-start" aria-label="כניסה לספרייה, לעוזר ולמודל הנתונים">
          <p className="nh-start-eye">סביבת העבודה שלך</p>
          <Link href="/neo/books/" prefetch={false} className="nh-start-card" style={{ "--entry": "var(--mod-pm)" } as React.CSSProperties}>
            <span className="nh-start-icon"><BookOpen size={25} strokeWidth={1.6} aria-hidden="true" /></span>
            <span className="nh-start-copy"><b>ספריית SAP</b><span>ספרים, פרקים ומקום הקריאה האחרון שלך</span></span>
            <ArrowUpLeft className="nh-start-arrow" size={18} aria-hidden="true" />
          </Link>
          <Link href="/neo/ai/" prefetch={false} className="nh-start-card" style={{ "--entry": "var(--mod-pp)" } as React.CSSProperties}>
            <span className="nh-start-icon"><Sparkles size={25} strokeWidth={1.6} aria-hidden="true" /></span>
            <span className="nh-start-copy"><b>שאל את הספרייה</b><span>שאלות על התוכן, עם מקורות לקריאה</span></span>
            <ArrowUpLeft className="nh-start-arrow" size={18} aria-hidden="true" />
          </Link>
          <Link href="/neo/erd/" prefetch={false} className="nh-start-card" style={{ "--entry": "var(--mod-pppi)" } as React.CSSProperties}>
            <span className="nh-start-icon"><GitBranch size={25} strokeWidth={1.6} aria-hidden="true" /></span>
            <span className="nh-start-copy"><b>מודל הנתונים</b><span>מודולים, טבלאות והקשרים ביניהם</span></span>
            <ArrowUpLeft className="nh-start-arrow" size={18} aria-hidden="true" />
          </Link>
          <p className="nh-start-note">בחר נקודת כניסה, והמשך משם אל התוכן והכלים.</p>
         </nav>
        </div>
       </div>
      </section>

      <section className="nh-sec" data-scene="cream" id="nh-quick" data-hsec aria-labelledby="nh-quick-h">
       <div className="nh-body nm-scene">
        <div className="nh-in">
          <div className="nh-head">
            <p className="nh-eye nm-fade">התוכן והכלים<i aria-hidden="true" />כניסה ישירה</p>
            <h2 className="nh-h2 nm-kin" id="nh-quick-h"><span><span>כניסות מהירות</span></span></h2>
          </div>
          <nav className="nh-paths nm-seq" aria-label="כניסות מהירות">
            {[
              { href: "/neo/tables/", label: "טבלאות SAP", text: "טבלאות, שדות וקשרים במודל הנתונים", Icon: Table },
              { href: "/neo/transactions/", label: "טרנזקציות", text: "איתור קוד והבנת הפעולה העסקית", Icon: Terminal },
              { href: "/neo/s4hana/", label: "S/4HANA", text: "מה משתנה במעבר מ-ECC והיכן נדרשת בדיקה", Icon: Waypoints },
              { href: "/neo/domain-model/", label: "תחומים עסקיים", text: "התהליכים והאובייקטים לפי תחום", Icon: Route },
              { href: "/neo/best-practices/", label: "שיטות עבודה מומלצות", text: "תהליכים מתועדים וצעדים ליישום", Icon: ShieldCheck },
              { href: "/neo/books/", label: "ספרייה", text: "ספרים, פרקים והמשך הקריאה", Icon: BookOpen },
              { href: "/neo/academy/", label: "אקדמיה", text: "מסלולי לימוד והעמקה מקצועית", Icon: GraduationCap },
            ].map(({ href, label, text, Icon }) => (
              <Link key={href} href={href} prefetch={false} className="nh-mod nm-rise nm-lift" style={{ "--m": "var(--scene-accent, var(--brand))" } as React.CSSProperties}>
                <span className="nh-mod-top"><Icon size={18} strokeWidth={1.75} aria-hidden="true" /><b><bdi dir="auto">{label}</bdi></b><ArrowUpLeft size={17} strokeWidth={1.75} aria-hidden="true" /></span>
                <span className="nh-mod-he">{text}</span>
              </Link>
            ))}
          </nav>
        </div>
       </div>
      </section>

      {/* =========================================================== 02 · data
          THE WORK PATHS. Three entries, three destinations: the two module
          environments and the S/4HANA readiness picture. */}
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
            <p className="nh-eye nm-fade">מסלולי עבודה<i aria-hidden="true" />שלוש נקודות כניסה</p>
            <h2 className="nh-h2 nm-kin" id="nh-2-h">
              <span><span>בחירת סביבת עבודה</span></span>
              <span><span className="nh-dim">מודול מקצועי, או תמונת המעבר</span></span>
            </h2>
          </div>

          <div className="nh-paths nm-seq">
            <ModuleCard d={d} i={0} />
            <ModuleCard d={d} i={1} />
            <Link
              href="/neo/s4-readiness/"
              prefetch={false}
              className="nh-mod nm-rise nm-lift"
              aria-label="מוכנות למעבר S/4HANA: סיווג המעבר כפי שהתיעוד מציין"
            >
              <span className="nh-mod-top">
                <b className="nh-sap">S/4HANA</b>
                <span className="nh-mod-he">מוכנות למעבר</span>
                <ArrowUpLeft size={17} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="nh-mod-nums">
                {impact.map((im) => (
                  <span key={im.k}><b className="nh-sap">{nf.format(im.n)}</b><em>{im.he}</em></span>
                ))}
              </span>
              <span className="nh-mod-share">
                <span className="nh-bar" aria-hidden="true">
                  <i className="nm-grow" style={{ "--p": marked / d.tables } as React.CSSProperties} />
                </span>
                <em className="nh-sap">{pct(marked, d.tables)}%</em>
                <span>מהטבלאות מסומנות לשינוי במעבר</span>
              </span>
            </Link>
          </div>
        </div>
       </div>
      </section>

      {/* ============================================================= 03 · s4
          THE TRANSITION PICTURE. The marked migration verdicts, in the
          blueprint's own vocabulary, and one door to the full cockpit. */}
      <section
        className="nh-sec"
        data-scene="s4"
        id="nh-3"
        data-hsec
        aria-labelledby="nh-3-h"
      >
       <div className="nh-body nh-close nm-scene">
        <span className="nh-glow" aria-hidden="true" />
        <div className="nh-in">
          <div className="nh-head">
            <p className="nh-eye nm-fade">
              <span className="nh-sap">ECC → S/4HANA</span><i aria-hidden="true" />תמונת המעבר
            </p>
            <h2 className="nh-h2 nm-kin" id="nh-3-h">
              <span><span>{nf.format(d.tables)} טבלאות SAP מתועדות,</span></span>
              <span><span className="nh-accent">{nf.format(marked)} מסומנות לשינוי במעבר</span></span>
            </h2>
            <p className="nh-lede nm-rise">
              לכל טבלה מוצמדת הערת ה-<span className="nh-sap">S/4HANA</span> מתיעוד הפרויקט, כולל
              טבלה או טרנזקציה חלופית במקום שבו התיעוד מציין אחת. טבלה ללא סיווג בתיעוד
              נשארת ללא תווית.
            </p>
          </div>

          <div className="nh-imp nm-seq">
            {impact.map((im) => (
              <div
                className="nh-impcol nm-rise"
                key={im.k}
                data-k={im.k}
                data-empty={im.n === 0 ? "1" : undefined}
              >
                <span className="nh-impcol-k"><i aria-hidden="true" />{im.he}</span>
                <b className="nh-sap">{nf.format(im.n)}</b>
                <span className="nh-bar" aria-hidden="true">
                  <i className="nm-grow" style={{ "--p": im.n / d.tables } as React.CSSProperties} />
                </span>
                <span className="nh-impcol-p nh-sap">{pct(im.n, d.tables)}%</span>
              </div>
            ))}
          </div>

          <div className="nh-out nm-rise">
            <p className="nh-out-t">
              הסיווג המלא עם החלופות המתועדות: בקוקפיט המעבר.
            </p>
            <div className="nh-cta">
              <Link className="nu-btn" href="/neo/migration-cockpit/" prefetch={false}>
                <Waypoints size={15} strokeWidth={1.75} aria-hidden="true" />
                קוקפיט המעבר
              </Link>
            </div>
          </div>
        </div>
       </div>
      </section>

      {/* =========================================================== 04 · deep
          THE CLOSE. Site information, privacy, and the credit. */}
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
          <div className="nh-head">
            <p className="nh-eye nm-fade">Project NEO<i aria-hidden="true" />SAP by Sali</p>
            <h2 className="nh-h2 nm-kin" id="nh-4-h">
              <span><span>הידע שלך, במקום אחד</span></span>
              <span><span className="nh-dim">מידע על האתר והפרטיות שלך</span></span>
            </h2>
          </div>

          <footer>
            <nav className="nh-cta nm-rise" aria-label="מסמכי האתר">
              <Link className="nu-btn2" href="/neo/privacy/" prefetch={false}><ShieldCheck size={15} strokeWidth={1.75} aria-hidden="true" />מדיניות פרטיות</Link>
            </nav>
            <p className="nh-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>
          </footer>
        </div>
       </div>
      </section>
    </HomeScene>
  );
}
