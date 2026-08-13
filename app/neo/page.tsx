import Link from "next/link";
import {
  ArrowUpLeft, Award, GitBranch, LayoutGrid, Search, Table, Terminal, Waypoints,
} from "lucide-react";
import "./home.css";
import { homeData, zoneVar } from "@/components/neo-shell/home/home-data";
import { HomeScene, type SceneSection } from "@/components/neo-shell/home/home-scene";

export const metadata = {
  title: "Project NEO · מפת הידע של SAP",
  robots: { index: false, follow: false },
};

const nf = new Intl.NumberFormat("he-IL");
const pct = (a: number, b: number) => Math.round((a / b) * 100);

// STAGE 2A. The signature Home — an experience surface (L3), not a dashboard.
//
// Everything on this page is rendered on the SERVER from the project dataset via
// components/neo-shell/home/home-data.ts. The client scene receives one plain
// object and owns nothing but motion. Not a single count, name, note or JOIN
// below is authored here: where the dictionary holds nothing, the page says so.
export default function NeoHome() {
  const d = homeData();

  const sections: SceneSection[] = [
    { id: "nh-1", label: "מפת הידע", field: "שיוך למודול" },
    { id: "nh-2", label: "כיסוי", field: "עומק תיעוד" },
    { id: "nh-3", label: "משותפות", field: `${d.shared} המשותפות` },
    { id: "nh-4", label: "צפיפות", field: "שדות לטבלה" },
    { id: "nh-5", label: "התהליך", field: "שרשרת אמיתית" },
    { id: "nh-6", label: "S/4HANA", field: "השפעת מעבר" },
  ];

  const stats: [number, string][] = [
    [d.dictRows, "שורות מילון"],
    [d.tables, "טבלאות ייחודיות"],
    [d.fields, "שדות מתועדים"],
    [d.tcodes, "טרנזקציות"],
    [d.funcs, "BAPI · FM · IDoc"],
    [d.relations, "קשרי ER"],
  ];

  const [pm, pp] = d.modules;
  const impact: { he: string; n: number; k: "kept" | "replaced" | "removed" }[] = [
    { he: "נשמר כפי שהוא", n: d.migration.kept, k: "kept" },
    { he: "הוחלף", n: d.migration.replaced, k: "replaced" },
    { he: "הוסר", n: d.migration.removed, k: "removed" },
  ];

  return (
    <HomeScene data={d} sections={sections}>
      {/* ============================================================ 01 */}
      <section className="nh-sec nh-sec--open" id="nh-1" data-hsec aria-labelledby="nh-1-h">
        <span className="nh-ix" aria-hidden="true">01</span>
        <div className="nh-copy" data-nh-solid>
          <p className="nh-eye">
            CBC ISRAEL · PROJECT NEO<i aria-hidden="true" />מפת הידע
          </p>
          <h1 className="nh-mega" id="nh-1-h">
            מילון SAP אחד
            <span className="nh-mega-2">לכל מסע ה־<span className="nh-sap">S/4HANA</span></span>
          </h1>
          <p className="nh-lede">
            {nf.format(d.tables)} טבלאות אמיתיות, {nf.format(d.fields)} שדות מתועדים,{" "}
            {nf.format(d.tcodes)} טרנזקציות ו־{nf.format(d.relations)} קשרי ER — הכול במקום אחד
            שעובד גם בלי רשת. כל נקודה ברקע היא טבלה אחת מהמילון, ולא קישוט.
          </p>
          <div className="nh-stats">
            {stats.map(([n, l], i) => (
              <span className="nh-stat" key={l} style={{ "--d": `${i * 55}ms` } as React.CSSProperties}>
                <b className="nh-sap">{nf.format(n)}</b>
                <em>{l}</em>
              </span>
            ))}
          </div>
          <div className="nh-cta">
            <Link className="nh-btn nh-btn--brand" href="/neo/tables/" prefetch={false}>
              <Search size={15} strokeWidth={1.75} aria-hidden="true" />
              פתח את מילון הטבלאות
            </Link>
            <Link className="nh-btn" href="/neo/domain-model/" prefetch={false}>
              <GitBranch size={15} strokeWidth={1.75} aria-hidden="true" />
              מודל הנתונים
            </Link>
            <Link className="nh-btn" href="/neo/transactions/" prefetch={false}>
              <Terminal size={15} strokeWidth={1.75} aria-hidden="true" />
              מרשם הטרנזקציות
            </Link>
          </div>
          <ul className="nh-legend" aria-label="מקרא צבע — מחלקת אובייקט">
            {d.zones.map((z) => (
              <li key={z.id} style={{ "--o": zoneVar(z.id) } as React.CSSProperties}>
                <i aria-hidden="true" />
                {z.he}
                <em className="nh-sap">{z.n}</em>
              </li>
            ))}
          </ul>
          <p className="nh-note">
            צבע הנקודה הוא מחלקת האובייקט; טבעת הנקודה היא המודול שאליו היא שייכת.
            הגודל הוא עומק התיעוד בפועל — מספר השדות שהמילון מחזיק לאותה טבלה.
          </p>
        </div>
      </section>

      {/* ============================================================ 02 */}
      <section className="nh-sec" id="nh-2" data-hsec aria-labelledby="nh-2-h">
        <span className="nh-ix" aria-hidden="true">02</span>
        <div className="nh-copy" data-nh-solid>
          <p className="nh-eye">כיסוי<i aria-hidden="true" />מה באמת מתועד</p>
          <h2 className="nh-h2" id="nh-2-h">
            {nf.format(d.tables)} טבלאות.<br />
            <span className="nh-dim">לא כולן מתועדות באותו עומק.</span>
          </h2>
          <p className="nh-lede">
            שישה צירי תיעוד, נמדדים על אותן {nf.format(d.tables)} טבלאות מאוחדות.
            שניים מהם יוצאים נמוך, וזה בדיוק העניין: המספר מוצג כפי שהוא, ולא נבחרים
            הצירים המחמיאים.
          </p>
        </div>
        <ul className="nh-cov" data-nh-solid>
          {d.coverage.map((c, i) => (
            <li key={c.he} style={{ "--p": pct(c.n, d.tables) / 100, "--d": `${i * 70}ms` } as React.CSSProperties}>
              <span className="nh-cov-l">{c.he}</span>
              <span className="nh-cov-bar" aria-hidden="true"><i /></span>
              <span className="nh-cov-n nh-sap">{c.n}<em>/{d.tables}</em></span>
              <span className="nh-cov-s">{c.note}</span>
            </li>
          ))}
        </ul>
        <p className="nh-note" data-nh-solid>
          הרקע מסודר עכשיו בעמודות לפי מספר הצירים שכל טבלה עומדת בהם. העמודות הנמוכות
          ריקות כי אין טבלה שעומדת בפחות משלושה.
        </p>
      </section>

      {/* ============================================================ 03 */}
      <section className="nh-sec" id="nh-3" data-hsec aria-labelledby="nh-3-h">
        <span className="nh-ix" aria-hidden="true">03</span>
        <div className="nh-copy" data-nh-solid>
          <p className="nh-eye">חפיפה<i aria-hidden="true" />המפגש בין המודולים</p>
          <h2 className="nh-h2" id="nh-3-h">
            <span className="nh-accent">{d.shared} טבלאות</span> חיות בשני העולמות
          </h2>
          <p className="nh-lede">
            <span className="nh-sap">PM</span> מתעד {nf.format(pm.tables)} טבלאות,{" "}
            <span className="nh-sap">PP-PI</span> מתעד {nf.format(pp.tables)}.
            יחד זה {nf.format(pm.tables + pp.tables)} שורות — אבל רק {nf.format(d.tables)} טבלאות,
            כי {d.shared} מהן מתועדות פעמיים. אלה הן, עם הנושא שממנו כל מודול מגיע אליהן.
          </p>
        </div>
        <div className="nh-shared" data-nh-solid>
          {d.sharedRows.map((r, i) => (
            <article key={r.n} className="nh-scard" style={{ "--o": zoneVar(r.z), "--d": `${i * 26}ms` } as React.CSSProperties}>
              <header>
                <i className="nh-cls" aria-hidden="true" />
                <b className="nh-sap">{r.n}</b>
                <span className="nh-scard-f nh-sap">{r.f}</span>
              </header>
              <p className="nh-scard-he">{r.he}</p>
              <dl className="nh-scard-ctx">
                <div style={{ "--m": pm.m } as React.CSSProperties}>
                  <dt className="nh-sap">PM</dt><dd>{r.pm || "—"}</dd>
                </div>
                <div style={{ "--m": pp.m } as React.CSSProperties}>
                  <dt className="nh-sap">PP-PI</dt><dd>{r.pp || "—"}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================ 04 */}
      <section className="nh-sec" id="nh-4" data-hsec aria-labelledby="nh-4-h">
        <span className="nh-ix" aria-hidden="true">04</span>
        <div className="nh-copy" data-nh-solid>
          <p className="nh-eye">צפיפות<i aria-hidden="true" />מודל הנתונים לפי נושא</p>
          <h2 className="nh-h2" id="nh-4-h">
            {d.topics} נושאים,<br />
            <span className="nh-dim">לא אחד מהם באותו משקל</span>
          </h2>
          <p className="nh-lede">
            הסולם המלא הוא {d.maxTopicTables} טבלאות — הנושא העמוס ביותר במילון.
            כל שאר הנושאים נמדדים מולו, בלי נירמול שמשטח את ההבדל.
          </p>
        </div>
        <div className="nh-dens" data-nh-solid>
          {d.modules.map((mo) => (
            <div className="nh-dcol" key={mo.key} style={{ "--m": mo.m } as React.CSSProperties}>
              <h3>
                <i aria-hidden="true" />
                <b className="nh-sap">{mo.code}</b>
                <span>{mo.topics} נושאים · {nf.format(mo.tables)} טבלאות · {nf.format(mo.fields)} שדות</span>
              </h3>
              <ul>
                {d.density.filter((t) => t.key === mo.key).map((t) => (
                  <li key={`${t.key}-${t.idx}`}>
                    <span className="nh-drow-i nh-sap">{String(t.idx).padStart(2, "0")}</span>
                    <span className="nh-drow-t">{t.title}</span>
                    <span className="nh-drow-k" aria-hidden="true">
                      {Array.from({ length: d.maxTopicTables }, (_, k) => (
                        <i key={k} className={k < t.tables ? "" : "off"} />
                      ))}
                    </span>
                    <span className="nh-drow-n nh-sap">{t.tables}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ 05 */}
      <section className="nh-sec" id="nh-5" data-hsec aria-labelledby="nh-5-h">
        <span className="nh-ix" aria-hidden="true">05</span>
        <div className="nh-copy" data-nh-solid>
          <p className="nh-eye">התהליך<i aria-hidden="true" />כפי שהוא יושב במסד הנתונים</p>
          <h2 className="nh-h2" id="nh-5-h">
            השרשרת האמיתית,<br />
            <span className="nh-dim">כולל המקומות שבהם היא נקטעת</span>
          </h2>
          <p className="nh-lede">
            כל מעבר נבדק מול הקשרים שהמילון באמת מחזיק: קשר ישיר, קשר דרך טבלת ביניים אחת,
            או גבול תהליך שהמילון אינו ממדל. במקרה השלישי לא מצויר חץ ולא מומצא מפתח.
          </p>
        </div>
        <div className="nh-flows" data-nh-solid>
          {d.flows.map((f) => (
            <section className="nh-chain" key={f.key} style={{ "--m": f.m } as React.CSSProperties} aria-label={`שרשרת ${f.key}`}>
              <header>
                <i aria-hidden="true" />
                <b className="nh-sap">{f.key}</b>
                <span>{f.he}</span>
                <span className="nh-chain-n">
                  {f.direct} ישירים · {f.via} דרך טבלת ביניים · {f.hops - f.direct - f.via} גבולות
                </span>
              </header>
              <ol className="nh-steps">
                {f.steps.map((s, i) => (
                  <li key={s.code}>
                    <div
                      className="nh-node"
                      data-missing={s.exists ? undefined : "1"}
                      style={{ "--o": zoneVar(s.z) } as React.CSSProperties}
                    >
                      <i className="nh-cls" aria-hidden="true" />
                      <b className="nh-sap">{s.code}</b>
                      <span className="nh-node-he">{s.label}</span>
                      <span className="nh-node-n">
                        {s.exists ? `${s.f} שדות · ${s.rels} קשרים` : "לא במילון של המודול"}
                      </span>
                    </div>
                    {i < f.steps.length - 1 && (
                      <div className="nh-link" data-kind={s.link ? (s.link.via ? "via" : "direct") : "gap"}>
                        <span className="nh-link-line" aria-hidden="true" />
                        <span className="nh-link-t">
                          {s.link
                            ? (s.link.via ? <>דרך <span className="nh-sap">{s.link.via}</span></> : "JOIN ישיר")
                            : "גבול תהליך · לא ממודל"}
                        </span>
                        {s.link && <code className="nh-sap">{s.link.join}</code>}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
        <p className="nh-note" data-nh-solid>
          המילון מחזיק {nf.format(d.relations)} קשרי ER בסך הכול. חלקם פשוט לא יושבים על ציר
          התהליך הזה — וזה נאמר כאן במפורש במקום להיסגר בחץ.
        </p>
      </section>

      {/* ============================================================ 06 */}
      <section className="nh-sec nh-sec--close" id="nh-6" data-hsec aria-labelledby="nh-6-h">
        <span className="nh-ix" aria-hidden="true">06</span>
        <div className="nh-copy" data-nh-solid>
          <p className="nh-eye"><span className="nh-sap">ECC → S/4HANA</span><i aria-hidden="true" />תמונת המעבר</p>
          <h2 className="nh-h2" id="nh-6-h">
            {nf.format(d.tables)} טבלאות,<br />
            <span className="nh-accent">{d.migration.replaced} מהן לא יעברו בשקט</span>
          </h2>
          <p className="nh-lede">
            הסיווג מגיע מאותה פונקציה שממנה נבנה עמוד ה־ECC ↔ S/4HANA של כל מודול.
            כל {nf.format(d.dictRows)} שורות המילון נושאות הערת S/4HANA; רק{" "}
            {d.migration.replaced} מהטבלאות מסומנות כמוחלפות.
          </p>
        </div>
        <div className="nh-imp" data-nh-solid>
          {impact.map((im, i) => (
            <div
              className="nh-impcol"
              key={im.k}
              data-k={im.k}
              data-empty={im.n === 0 ? "1" : undefined}
              style={{ "--p": pct(im.n, d.tables) / 100, "--d": `${i * 90}ms` } as React.CSSProperties}
            >
              <b className="nh-sap">{im.n}</b>
              <span className="nh-impcol-l">{im.he}</span>
              <span className="nh-impcol-bar" aria-hidden="true"><i /></span>
              <span className="nh-impcol-p nh-sap">{pct(im.n, d.tables)}%</span>
            </div>
          ))}
        </div>
        {d.migrationRows.length > 0 ? (
          <ul className="nh-hot" data-nh-solid>
            {d.migrationRows.map((r, i) => (
              <li key={r.n} style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                <span className="nh-hot-k" data-k={r.s === 2 ? "removed" : "replaced"}>
                  <i aria-hidden="true" />
                  {r.s === 2 ? "הוסר" : "הוחלף"}
                </span>
                <b className="nh-sap">{r.n}</b>
                <span className="nh-hot-he">{r.he}</span>
                <span className="nh-hot-note">{r.note}</span>
                <span className="nh-hot-alt">
                  {r.alt ? <span className="nh-sap">{r.alt}</span> : <em>אין חלופה במילון</em>}
                </span>
                <span className="nh-hot-mods">
                  {r.mods.map((m) => (
                    <em key={m} className="nh-sap" style={{ "--m": m === "PM" ? pm.m : pp.m } as React.CSSProperties}>{m}</em>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="nh-note" data-nh-solid>אין במילון שורה המסומנת כמוחלפת או כמוסרת.</p>
        )}
        <p className="nh-note" data-nh-solid>
          {d.migration.removed === 0
            ? "אף טבלה במילון אינה מסומנת כמוסרת ב-S/4HANA. הרצועה הזאת ריקה במכוון — היא לא הוסתרה."
            : `${d.migration.removed} טבלאות מסומנות כמוסרות.`}
        </p>
        <div className="nh-cta" data-nh-solid>
          <Link className="nh-btn nh-btn--brand" href="/neo/pm/" prefetch={false} style={{ "--m": pm.m } as React.CSSProperties}>
            <Waypoints size={15} strokeWidth={1.75} aria-hidden="true" />
            סביבת <span className="nh-sap">PM</span>
          </Link>
          <Link className="nh-btn" href="/neo/pp-pi/" prefetch={false} style={{ "--m": pp.m } as React.CSSProperties}>
            <Waypoints size={15} strokeWidth={1.75} aria-hidden="true" />
            סביבת <span className="nh-sap">PP-PI</span>
          </Link>
          <Link className="nh-btn" href="/neo/tables/" prefetch={false}>
            <Table size={15} strokeWidth={1.75} aria-hidden="true" />
            מילון הטבלאות
          </Link>
          <Link className="nh-btn" href="/neo/library/" prefetch={false}>
            <LayoutGrid size={15} strokeWidth={1.75} aria-hidden="true" />
            ספרייה · {nf.format(d.books)} ספרים
          </Link>
          <Link className="nh-btn" href="/neo/academy/" prefetch={false}>
            <Award size={15} strokeWidth={1.75} aria-hidden="true" />
            אקדמיה
            <ArrowUpLeft size={14} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
        <p className="nh-credit" data-nh-solid>
          Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding
        </p>
      </section>
    </HomeScene>
  );
}
