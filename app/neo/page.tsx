import Link from "next/link";
import { ArrowUpLeft, GitBranch, Table, Terminal, Waypoints } from "lucide-react";
// The interaction system first, the page's own sheet second: Home never invents
// a control style, it consumes .nu-* and only overrides layout around them.
import "./ui.css";
import "./home.css";
import { SiteLogo } from "@/components/site-logo";
import { homeData, type HomeData } from "@/components/neo-shell/home/home-data";
import { HomeScene, type SceneSection } from "@/components/neo-shell/home/home-scene";
import { HomeNet } from "@/components/neo-shell/home/home-net";

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
// Content pass, 2026-08: the page went from eight scenes to four. Every number
// is rendered on the SERVER from the project dataset via home-data.ts; nothing
// below is authored, and where the dictionary states no verdict the page says
// nothing instead of inventing one. The copy speaks to the SAP professional
// about the work; it does not narrate the page's own design.
//
//   01  deep   the gate: identity, scope, S/4HANA first, one primary action.
//   02  data   the three work paths: PM, PP-PI, S/4HANA readiness.
//   03  s4     the transition picture: marked migration verdicts, one door in.
//   04  deep   the close: global search, and the credit.

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
        <span><b className="nh-sap">{nf.format(mo.fiori)}</b><em>אפליקציות Fiori</em></span>
      </span>
      <span className="nh-mod-share">
        <span className="nh-bar" aria-hidden="true">
          <i className="nm-grow" style={{ "--p": mo.share } as React.CSSProperties} />
        </span>
        <em className="nh-sap">{pct(mo.tables, d.tables)}%</em>
        <span>מתוך {nf.format(d.tables)} הטבלאות במילון</span>
      </span>
    </Link>
  );
}

export default function NeoHome() {
  const d = homeData();
  const marked = d.migration.adapted + d.migration.replaced + d.migration.removed;

  const sections: SceneSection[] = [
    { id: "nh-1", label: "פתיחה", field: "S/4HANA תחילה", tone: "#c8102e" },
    { id: "nh-2", label: "מסלולים", field: "PM · PP-PI · מעבר", tone: "#47a8ff" },
    { id: "nh-3", label: "S/4HANA", field: "תמונת המעבר", tone: "#47a8ff" },
    { id: "nh-4", label: "איתור", field: "חיפוש וניווט", tone: "#c8102e" },
  ];

  // ONE COUNTING BASIS. The hero states 105 merged-unique tables, so the two
  // numbers beside it are computed on the same basis: fields as the per-table
  // max the dots already carry (a shared table's fields counted once), and
  // relations as the deduplicated undirected ER pairs the page itself draws —
  // not the 126 per-module relation rows.
  const fieldsUnique = d.dots.reduce((a, x) => a + x.f, 0);
  const stats: [number, string][] = [
    [d.tables, "טבלאות SAP"],
    [fieldsUnique, "שדות מתועדים"],
    [d.tcodes, "טרנזקציות"],
    [d.edges.length, "קשרי ER ממודלים"],
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

        <div className="nh-in nh-gate-in">
          <SiteLogo tone="dark" size="lg" className="nh-brand nm-rise nm-once" />

          <p className="nh-eye nh-eye--gate">
            SAP Enterprise Knowledge Platform
            <i aria-hidden="true" />
            CBC Israel
          </p>

          <h1 className="nh-mega nm-kin" id="nh-1-h">
            <span><span>מפת הידע</span></span>
            <span><span>ל־<span className="nh-sap">SAP S/4HANA</span></span></span>
          </h1>
          <p className="nh-lede nh-lede--gate">
            פלטפורמת ידע מקצועית למודולי <span className="nh-sap">PM</span> ו־<span className="nh-sap">PP-PI</span>:
            אובייקטים עסקיים, טבלאות, טרנזקציות, קשרי נתונים והמעבר מ־<span className="nh-sap">ECC</span> ל־
            <span className="nh-sap">S/4HANA</span>. זמינה במלואה גם ללא חיבור לרשת.
          </p>
          <div className="nh-stats nm-seq">
            {stats.map(([n, l]) => (
              <span className="nh-stat nm-rise" key={l}>
                <b className="nh-sap">{nf.format(n)}</b>
                <em>{l}</em>
              </span>
            ))}
          </div>
          <div className="nh-cta">
            <Link className="nu-btn" href="/neo/s4hana/" prefetch={false}>
              <Waypoints size={15} strokeWidth={1.75} aria-hidden="true" />
              מרכז <span className="nh-sap">S/4HANA</span>
            </Link>
            <Link className="nu-btn2" href="/neo/erd/" prefetch={false}>
              <GitBranch size={15} strokeWidth={1.75} aria-hidden="true" />
              מודל הנתונים
            </Link>
            <Link className="nu-btn2" href="/neo/tables/" prefetch={false}>
              <Table size={15} strokeWidth={1.75} aria-hidden="true" />
              טבלאות SAP
            </Link>
          </div>
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
              <span><span>{nf.format(d.tables)} טבלאות במילון,</span></span>
              <span><span className="nh-accent">{nf.format(marked)} מסומנות לשינוי במעבר</span></span>
            </h2>
            <p className="nh-lede nm-rise">
              לכל טבלה מוצמדת הערת ה־<span className="nh-sap">S/4HANA</span> מתיעוד הפרויקט, כולל
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
              הסיווג המלא עם החלופות המתועדות: בקוקפיט המיגרציה.
            </p>
            <div className="nh-cta">
              <Link className="nu-btn" href="/neo/migration-cockpit/" prefetch={false}>
                <Waypoints size={15} strokeWidth={1.75} aria-hidden="true" />
                קוקפיט המיגרציה
              </Link>
            </div>
          </div>
        </div>
       </div>
      </section>

      {/* =========================================================== 04 · deep
          THE CLOSE. One focused action: find the object you came for. */}
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
            <p className="nh-eye nm-fade">איתור<i aria-hidden="true" />טבלה, טרנזקציה, אובייקט</p>
            <h2 className="nh-h2 nm-kin" id="nh-4-h">
              <span><span>מחפשים אובייקט מסוים?</span></span>
              <span><span className="nh-dim">חיפוש גלובלי בכל עמודי הפלטפורמה: Ctrl+K</span></span>
            </h2>
          </div>

          <div className="nh-cta nm-rise">
            <Link className="nu-btn" href="/neo/transactions/" prefetch={false}>
              <Terminal size={15} strokeWidth={1.75} aria-hidden="true" />
              טרנזקציות
            </Link>
            <Link className="nu-btn2" href="/neo/tables/" prefetch={false}>
              <Table size={15} strokeWidth={1.75} aria-hidden="true" />
              טבלאות SAP
            </Link>
          </div>

          <p className="nh-credit">
            Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding
          </p>
        </div>
       </div>
      </section>
    </HomeScene>
  );
}
