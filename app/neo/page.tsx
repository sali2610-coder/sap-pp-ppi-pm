import Link from "next/link";
import { ArrowUpLeft, BookOpen, ClipboardCheck, GitBranch, GraduationCap, Route, Table2, Terminal, Waypoints } from "lucide-react";
// The interaction system first, the page's own sheet second: Home never invents
// a control style, it consumes .nu-* and only lays out around them.
import "./ui.css";
import "./home.css";
import { homeData, type HomeData } from "@/components/neo-shell/home/home-data";
import { booksData } from "@/components/neo-shell/books/books-data";
import { tablesData } from "@/components/neo-shell/data/tables-data";
import { domainTotals } from "@/components/neo-shell/domain/domain-data";
import { registryStats } from "@/lib/tx-registry";
import { s4ObjectTotals } from "@/components/neo-shell/s4/s4-data";
import { workspaceData } from "@/components/neo-shell/workspace/workspace-data";
import { bpList } from "@/components/neo-shell/best-practices/bp-data";
import { BOOKS as ACADEMY_BOOKS } from "@/data/library/academy-index";
import { HomeSearch } from "@/components/neo-shell/home/home-search";
import { HomeContinue } from "@/components/neo-shell/home/home-continue";
import { ProcessMap } from "@/components/neo-shell/home/process-map";
import { StatusPill } from "@/components/neo-shell/evidence/status-pill";
import { S4_STATUS_DOT, S4_STATUS_WORD, type S4Status } from "@/lib/evidence/types";

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
  // The module page's own counters (its header reads this same object), so a
  // number on the card is a number the page states: 280 fields, not the 270 of
  // the distinct tables; 95 interface records, not 94.
  const c = workspaceData(mo.key).counts;
  const nums: [number, string][] = [
    [c.tables, "טבלאות"], [c.fields, "שדות"], [c.tcodes, "טרנזקציות"],
    [c.funcEntries, "רשומות ממשק"], [c.cds, "תצוגות CDS"], [c.fiori, "יישומי Fiori"],
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
        <span><bdi className="nh-sap">{pct(c.tables, d.tables)}%</bdi> מתוך {nf.format(d.tables)} הטבלאות בתיעוד <bdi>PM</bdi> ו-<bdi>PP-PI</bdi></span>
      </span>
    </Link>
  );
}

export default function NeoHome() {
  const d = homeData();
  const books = booksData();
  const td = tablesData();
  const tt = td.totals;
  const s4t = s4ObjectTotals();
  const bp = bpList();
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
      href: "/neo/s4hana/", icon: <Waypoints size={20} strokeWidth={1.75} aria-hidden="true" />, name: "מרכז S/4HANA", n: s4t.total,
      sub: <>אובייקטים · {nf.format(s4t.byKey.replaced || 0)} {S4_STATUS_WORD.replaced} · {nf.format(s4t.byKey.not_available || 0)} {S4_STATUS_WORD.not_available}</>,
    },
    {
      href: "/neo/domain-model/", icon: <Route size={20} strokeWidth={1.75} aria-hidden="true" />, name: "תחומים עסקיים", n: dm.domains,
      sub: <>{nf.format(dm.steps)} שלבי תהליך · {nf.format(dm.deep)} עם רשומה מלאה</>,
    },
    {
      href: "/neo/best-practices/", icon: <ClipboardCheck size={20} strokeWidth={1.75} aria-hidden="true" />, name: "שיטות עבודה מומלצות", n: bp.length,
      sub: <>{nf.format(bp.reduce((a, r) => a + r.steps, 0))} צעדי עבודה, עם דפוסים שגויים ובדיקות</>,
    },
    {
      href: "/neo/books/", icon: <BookOpen size={20} strokeWidth={1.75} aria-hidden="true" />, name: "ספרים", n: books.totals.books,
      sub: <>{nf.format(books.totals.chapters)} פרקים · {nf.format(books.totals.sections)} תת-פרקים</>,
    },
    {
      href: "/neo/academy/", icon: <GraduationCap size={20} strokeWidth={1.75} aria-hidden="true" />, name: "אקדמיה", n: ACADEMY_BOOKS.length,
      sub: <>קורסים, שיעור אחר שיעור, עם בדיקת ידע</>,
    },
  ];

  // The status each table's own page shows (tables-data resolves it as the page
  // does: the authored verification record where one exists, otherwise the
  // blueprint's S/4HANA column), counted by its dictionary word. The home, the
  // catalogue's chip and the table page therefore say the same thing. It used
  // to count the blueprint column alone, which put AUFK or AFKO under "משתנה"
  // while their pages say "נשמר".
  const byWord = (k: S4Status) => td.rows.filter((r) => S4_STATUS_WORD[r.status.key as S4Status] === S4_STATUS_WORD[k]).length;
  const impact = (["changed", "replaced", "not_available", "verification_required"] as const).map((key) => ({ key, n: byWord(key) }));
  const marked = byWord("changed") + byWord("replaced") + byWord("not_available");

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
            הזרימה של פקודת אחזקה ב-<bdi>PM</bdi> ושל פקודת תהליך ב-<bdi>PP-PI</bdi>. קו מופיע רק בין טבלאות שמילון הנתונים
            מקשר ביניהן; מעבר שהמילון לא מתעד נשאר פתוח.
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
            {nf.format(td.rows.length)} טבלאות מתיעוד <bdi>PM</bdi> ו-<bdi>PP-PI</bdi>, {nf.format(marked)} מהן מושפעות מהמעבר
          </h2>
          <p className="nh-sec-lede">
            המעמד של כל טבלה הוא זה שמוצג בעמוד שלה: רשומת האימות כשיש כזו, ואחרת עמודת <bdi>S/4HANA</bdi> בתיעוד המודול.
            {" "}{nf.format(byWord("unchanged"))} טבלאות נשמרות.
          </p>
        </div>
        <ul className="nh-imp">
          {impact.map((im) => (
            <li key={im.key} style={{ "--bar": S4_STATUS_DOT[im.key] } as React.CSSProperties}>
              <StatusPill status={im.key} label={S4_STATUS_WORD[im.key]} />
              <bdi className="nh-sap nh-imp-n">{nf.format(im.n)}</bdi>
              <span className="nh-bar" aria-hidden="true"><i style={{ "--p": im.n / td.rows.length } as React.CSSProperties} /></span>
              <bdi className="nh-sap nh-imp-p">{pct(im.n, td.rows.length)}%</bdi>
            </li>
          ))}
        </ul>
        <div className="nh-sec-out">
          <p>הסיווג לפי טבלה, עם הטבלאות והטרנזקציות החלופיות, נמצא בפרק המעבר של כל מודול.</p>
          <Link className="nu-btn2" href="/neo/pm/#nw-s4" prefetch={false}>
            <Waypoints size={16} strokeWidth={1.75} aria-hidden="true" />
            <span>המעבר ב-<bdi>PM</bdi></span>
          </Link>
          <Link className="nu-btn2" href="/neo/pp-pi/#nw-s4" prefetch={false}>
            <Waypoints size={16} strokeWidth={1.75} aria-hidden="true" />
            <span>המעבר ב-<bdi>PP-PI</bdi></span>
          </Link>
          <Link className="nu-link" href="/neo/migration-cockpit/" prefetch={false}>קוקפיט המעבר: אובייקטי המעבר ורצף הטעינה</Link>
          <Link className="nu-link" href="/neo/s4-readiness/" prefetch={false}>כיסוי התיעוד למעבר</Link>
        </div>
      </section>
    </div>
  );
}
