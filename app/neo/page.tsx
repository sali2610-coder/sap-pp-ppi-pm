import Link from "next/link";
import { ArrowUpLeft, BookOpen, GitBranch, GraduationCap, Route, Table2, Terminal, Waypoints } from "lucide-react";
// The interaction system first, the page's own sheet second: Home never invents
// a control style, it consumes .nu-* and only lays out around them.
import "./ui.css";
import "./home.css";
import { homeData, type HomeData } from "@/components/neo-shell/home/home-data";
import { booksData } from "@/components/neo-shell/books/books-data";
import { tablesData } from "@/components/neo-shell/data/tables-data";
import { domainTotals } from "@/components/neo-shell/domain/domain-data";
import { registryStats } from "@/lib/tx-registry";
import { S4_OBJECTS } from "@/data/s4-objects";
import { BOOKS as ACADEMY_BOOKS } from "@/data/library/academy-index";
import { HomeSearch } from "@/components/neo-shell/home/home-search";
import { HomeContinue } from "@/components/neo-shell/home/home-continue";
import { ProcessMap } from "@/components/neo-shell/home/process-map";
import { StatusPill } from "@/components/neo-shell/evidence/status-pill";
import { S4_STATUS_DOT, S4_STATUS_WORD } from "@/lib/evidence/types";

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

/* THE HOME (2026 system, Knowledge Workbench).
   A place to start work, not a tour. Every number is computed on the server
   from the project's own data (home-data.ts, books-data.ts); where the data
   states no verdict the page says nothing rather than inventing one.

     gate       identity, scope, and the search as the primary action
     doors      six ways in, each with the size of what it opens
     continue   the book and the tables you had open (only when there are any)
     map        the signature: both documented processes, table by table
     modules    PM and PP-PI in numbers
     S/4HANA    the marked migration verdicts, one door to the cockpit

   Nothing the previous home said was dropped: its three figures and five
   actions are the doors, its module cards and transition picture are the two
   lower sections, and its closing search prompt is the gate's search. The
   decorative name wall and network behind the title were atmosphere, not
   content, and the process map now says what they gestured at. */

function ModuleCard({ d, i }: { d: HomeData; i: 0 | 1 }) {
  const mo = d.modules[i];
  const nums: [number, string][] = [
    [mo.tables, "טבלאות"], [mo.fields, "שדות"], [mo.tcodes, "טרנזקציות"],
    [mo.funcs, "BAPI · FM · IDoc"], [mo.cds, "תצוגות CDS"], [mo.fiori, "יישומי Fiori"],
  ];
  return (
    <Link
      href={mo.href}
      prefetch={false}
      className="nu-card nh-mod"
      aria-label={`כניסה לסביבת ${mo.code} · ${mo.he}`}
      style={{ "--m": mo.m } as React.CSSProperties}
    >
      <span className="nh-mod-top">
        <bdi className="nh-sap nh-mod-code">{mo.code}</bdi>
        <span className="nh-mod-he">{mo.he}</span>
        <ArrowUpLeft className="nh-mod-go" size={18} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <dl className="nh-mod-nums">
        {nums.map(([n, l]) => (
          <div key={l}><dt>{l}</dt><dd className="nh-sap">{nf.format(n)}</dd></div>
        ))}
      </dl>
      <span className="nh-mod-share">
        <span className="nh-bar" aria-hidden="true"><i style={{ "--p": mo.share } as React.CSSProperties} /></span>
        <span><bdi className="nh-sap">{pct(mo.tables, d.tables)}%</bdi> מתוך {nf.format(d.tables)} טבלאות SAP מתועדות</span>
      </span>
    </Link>
  );
}

export default function NeoHome() {
  const d = homeData();
  const books = booksData();
  const marked = d.migration.adapted + d.migration.replaced + d.migration.removed;
  const tt = tablesData().totals;
  const tx = registryStats();
  const dm = domainTotals();

  // The doors. Each number is the one its destination states about itself,
  // read from the same source (the catalogue merges a shared table once: 105,
  // not the 126 per-module rows; the transaction catalogue is the registry).
  const doors: { href: string; icon: React.ReactNode; name: string; n: number | null; sub: React.ReactNode }[] = [
    {
      href: "/neo/tables/", icon: <Table2 size={20} strokeWidth={1.75} aria-hidden="true" />, name: "טבלאות SAP", n: tt.tables,
      sub: <>{nf.format(tt.fields)} שדות · {nf.format(tt.shared)} טבלאות משותפות ל-<bdi>PM</bdi> ול-<bdi>PP-PI</bdi></>,
    },
    {
      href: "/neo/transactions/", icon: <Terminal size={20} strokeWidth={1.75} aria-hidden="true" />, name: "טרנזקציות", n: tx.total,
      sub: <>{nf.format(tx.deep)} מתועדות לעומק · {nf.format(Object.keys(tx.byModule).length)} מודולים</>,
    },
    {
      href: "/neo/s4hana/", icon: <Waypoints size={20} strokeWidth={1.75} aria-hidden="true" />, name: "מרכז S/4HANA", n: S4_OBJECTS.length,
      sub: <>אובייקטים · {nf.format(marked)} טבלאות מסומנות לשינוי במעבר</>,
    },
    {
      href: "/neo/domain-model/", icon: <Route size={20} strokeWidth={1.75} aria-hidden="true" />, name: "תחומים עסקיים", n: dm.domains,
      sub: <>{nf.format(dm.steps)} שלבי תהליך · {nf.format(dm.deep)} עם רשומה מלאה</>,
    },
    {
      href: "/neo/books/", icon: <BookOpen size={20} strokeWidth={1.75} aria-hidden="true" />, name: "ספרים", n: books.totals.books,
      sub: <>{nf.format(books.totals.chapters)} פרקים · {nf.format(books.totals.sections)} תת-פרקים</>,
    },
    {
      href: "/neo/academy/", icon: <GraduationCap size={20} strokeWidth={1.75} aria-hidden="true" />, name: "אקדמיה", n: ACADEMY_BOOKS.length,
      sub: <>ספרי לימוד, שיעור אחר שיעור, עם בדיקת ידע</>,
    },
  ];

  // The blueprint's own verdicts (lib/s4-class: 1 מותאם, 2 הוחלף, 3 הוסר),
  // worded and marked by the S/4HANA status dictionary, the same words and
  // glyphs every other surface prints. Tables whose note states no verdict are
  // not counted.
  const impact: { key: "changed" | "replaced" | "not_available"; n: number }[] = [
    { key: "changed", n: d.migration.adapted },
    { key: "replaced", n: d.migration.replaced },
    { key: "not_available", n: d.migration.removed },
  ];

  return (
    <div className="nh">
      <header className="nh-gate" aria-labelledby="nh-h1">
        <p className="nh-eye">
          <bdi>SAP by Sali</bdi> · <bdi>Project NEO</bdi> · <bdi>CBC Israel</bdi>
        </p>
        <h1 className="nh-h1 nx-display" id="nh-h1">מפת הידע ל-<bdi>SAP S/4HANA</bdi></h1>
        <p className="nh-lede">
          תיעוד מקצועי למודולי <bdi>PM</bdi> ו-<bdi>PP-PI</bdi>: אובייקטים עסקיים, טבלאות, טרנזקציות, קשרי נתונים
          והמעבר מ-<bdi>ECC</bdi> ל-<bdi>S/4HANA</bdi>.
        </p>
        <HomeSearch />
      </header>

      <nav className="nh-doors" aria-label="כניסות">
        <ul>
          {doors.map((x) => (
            <li key={x.href}>
              <Link className="nu-card nh-door" href={x.href} prefetch={false}>
                <span className="nh-door-i">{x.icon}</span>
                <span className="nh-door-name">{x.name}</span>
                {x.n !== null ? <bdi className="nh-sap nh-door-n">{nf.format(x.n)}</bdi> : null}
                <span className="nh-door-sub">{x.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <HomeContinue
        books={books.books.map((b) => ({ id: b.id, title: b.titleHe ?? b.titleEn }))}
        tables={Object.fromEntries(d.dots.map((x) => [x.n, x.he]))}
      />

      <section className="nh-sec" aria-labelledby="nh-map-h">
        <div className="nh-sec-head">
          <h2 className="nh-h2" id="nh-map-h">שני תהליכים, טבלה אחר טבלה</h2>
          <p className="nh-sec-lede">
            הזרימה של הזמנת אחזקה ב-<bdi>PM</bdi> ושל הזמנת ייצור ב-<bdi>PP-PI</bdi>, כפי שמילוני הנתונים מקשרים בין הטבלאות.
          </p>
        </div>
        <ProcessMap chains={d.flows} />
        <p className="nh-sec-out">
          <Link className="nu-link" href="/neo/erd/" prefetch={false}>
            <GitBranch size={16} strokeWidth={1.75} aria-hidden="true" />
            מודל הנתונים המלא
          </Link>
        </p>
      </section>

      <section className="nh-sec" aria-labelledby="nh-mods-h">
        <div className="nh-sec-head">
          <h2 className="nh-h2" id="nh-mods-h">בחירת סביבת עבודה</h2>
          <p className="nh-sec-lede">מודול מקצועי, עם מה שמתועד בו.</p>
        </div>
        <div className="nh-mods">
          <ModuleCard d={d} i={0} />
          <ModuleCard d={d} i={1} />
        </div>
      </section>

      <section className="nh-sec" aria-labelledby="nh-s4-h">
        <div className="nh-sec-head">
          <h2 className="nh-h2" id="nh-s4-h">
            {nf.format(d.tables)} טבלאות <bdi>SAP</bdi> מתועדות, {nf.format(marked)} מסומנות לשינוי במעבר
          </h2>
          <p className="nh-sec-lede">
            לכל טבלה יש בתיעוד הפרויקט הערת <bdi>S/4HANA</bdi>, ולחלקן גם טבלה או טרנזקציה חלופית. טבלה שהתיעוד לא סיווג
            נשארת בלי תווית.
          </p>
        </div>
        <ul className="nh-imp">
          {impact.map((im) => (
            <li key={im.key} style={{ "--bar": S4_STATUS_DOT[im.key] } as React.CSSProperties}>
              <StatusPill status={im.key} label={S4_STATUS_WORD[im.key]} />
              <bdi className="nh-sap nh-imp-n">{nf.format(im.n)}</bdi>
              <span className="nh-bar" aria-hidden="true"><i style={{ "--p": im.n / d.tables } as React.CSSProperties} /></span>
              <bdi className="nh-sap nh-imp-p">{pct(im.n, d.tables)}%</bdi>
            </li>
          ))}
        </ul>
        <div className="nh-sec-out">
          <p>הסיווג המלא והחלופות המתועדות נמצאים בקוקפיט המעבר.</p>
          <Link className="nu-btn2" href="/neo/migration-cockpit/" prefetch={false}>
            <Waypoints size={16} strokeWidth={1.75} aria-hidden="true" />
            קוקפיט המעבר
          </Link>
          <Link className="nu-link" href="/neo/s4-readiness/" prefetch={false}>כיסוי התיעוד למעבר</Link>
        </div>
      </section>
    </div>
  );
}
