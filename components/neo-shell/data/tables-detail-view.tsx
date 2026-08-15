/* ============================================================================
   PROJECT NEO · /neo/tables/<NAME>/ — the screen.
   ----------------------------------------------------------------------------
   A SERVER component. Every SAP fact is rendered to HTML at build time; the only
   island the browser receives is the contextual return, which needs the session.

   WHAT IT ANSWERS, IN ORDER
     identity → does it survive S/4HANA → who documents it → what is inside it →
     what it joins to → what opens it → what reads it in S/4 → what talks to it →
     what sits beside it → what to read next.

   S/4HANA IS THE PRIMARY WORLD, so it is the first section on the page, not a
   footnote. When the project resolves a material change it also gets a badge in
   the identity band, the page's one accent, and a jump link — three chances to
   see it before the fold.

   ABSENCE IS CONTENT. Where the project holds nothing, the page says
   `אין מידע מאומת במאגר` in the place the content would have been. There is no
   state in which a reader can mistake a gap for a fact.

   NO LINK OUTRUNS A PAGE. Every href on this screen arrives from
   tables-detail.ts already resolved to `string | null` against the list that
   generates that route. A `null` is rendered as a VALUE — a .nu-chip, which by
   definition has no hover and no pointer — so the reader can tell at a glance
   which of the 168 blueprint transaction codes have a page and which 31 do not.

   FORM RULE (app/globals.css, above --mod-pm), obeyed exactly
     STATUS  S/4 risk and verification trust. A small dot plus its word
             (.nu-status). Never a surface, never a ring.
     MODULE  the header bar, a section marker, a row edge, a ring, a tint.
             Never a small standalone dot.
     OBJECT  --obj-* is the table's own class marker, which globals.css
             sanctions on a data surface.
     ACCENT  brand red marks ONE thing: that this table materially changes in
             S/4HANA.
   ========================================================================== */

import Link from "next/link";
import {
  AppWindow, ArrowLeft, ArrowUpLeft, BadgeCheck, BookOpen, Boxes, Cable,
  Columns3, Database, GitBranch, KeyRound, Layers, Library, Sigma, Table2,
  Terminal, TriangleAlert, Workflow,
} from "lucide-react";
import { RISK_COLOR } from "@/lib/s4";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { MOD_HE, REL_HE, relVar, tableSummary, type TableDetail } from "./tables-detail";

const nf = new Intl.NumberFormat("he-IL");

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };

const TRUST_WHY: Record<string, string> = {
  verified: "ידע Simplification List מתוחזק בפרויקט",
  partial: "נגזר מעמודת ה-S/4 של המילון — מומלץ אימות מול SAP",
  needs: "המאגר אינו מחזיק הכרעה לטבלה הזאת",
};

/* ---------------------------------------------------------------- pieces */

/** The one empty state. It names the phrase the brief requires, and then names
 *  the thing that is missing, so the absence is auditable rather than apologetic. */
function Missing({ what }: { what: string }) {
  return (
    <p className="nxb-missing">
      <b>אין מידע מאומת במאגר</b>
      <span>המאגר של Project NEO אינו מחזיק {what} עבור הטבלה הזאת.</span>
    </p>
  );
}

function Sec({ id, n, icon, eyebrow, title, lede, children }: {
  id: string;
  n: number;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  lede?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="nxb-sec" id={id} aria-labelledby={`${id}-h`}>
      <header className="nxb-sec-h">
        <span className="nxb-sec-n" aria-hidden="true">{String(n).padStart(2, "0")}</span>
        <p className="nxb-sec-k">
          <span className="nxb-sec-i" aria-hidden="true">{icon}</span>
          {eyebrow}
        </p>
        <h2 className="nxb-h2" id={`${id}-h`}>{title}</h2>
        {lede ? <p className="nxb-sec-s">{lede}</p> : null}
      </header>
      <div className="nxb-sec-b">{children}</div>
    </section>
  );
}

function ModTag({ mods }: { mods: string[] }) {
  return (
    <span className="nxb-modtag">
      {mods.map((m) => (
        <b key={m} style={{ "--m": MOD_VAR[m] || "var(--ink-3)" } as React.CSSProperties}>{m}</b>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------- the screen */

export function TableDetailView({ t }: { t: TableDetail }) {
  const s = tableSummary(t);
  const m = MOD_VAR[t.mods[0]] || "var(--ink-3)";

  // ONE list drives the numbering and the jump nav, so a section can never be
  // numbered 04 in the page and 03 in the nav.
  const nav: [string, string][] = [
    ["nxb-s4", "המעבר ל-S/4HANA"],
    ["nxb-own", t.rows.length > 1 ? "רשומות המילון" : "רשומת המילון"],
    ["nxb-fields", "שדות ומפתחות"],
    ["nxb-rel", "קשרים ו-JOIN"],
    ["nxb-tx", "טרנזקציות"],
    ["nxb-cds", "תצוגות CDS"],
    ["nxb-if", "ממשקים ו-Fiori"],
    ["nxb-sib", "טבלאות באותו נושא"],
    ["nxb-books", "ספרים והפניות"],
  ];
  const num = Object.fromEntries(nav.map(([id], i) => [id, i + 1])) as Record<string, number>;

  return (
    <article
      className="nxb"
      data-surface="table"
      data-s4={t.s4.impacted ? "1" : "0"}
      style={{ "--m": m, "--o": t.obj } as React.CSSProperties}
    >
      {/* Where the reader came from, when the session knows: the directory with
          its filters, a module workspace, the ERD, a search. With no memory it
          falls back to /neo/tables/, which is this page's real parent. */}
      <SmartReturn
        fallback={{ href: "/neo/tables/", label: "טבלאות" }}
        hint="לא נשמר מסלול הגעה בביקור הזה"
      />

      {/* ==================================================== 1. IDENTITY */}
      <header className="nxb-head">
        <span className="nx-modbar" aria-hidden="true" />

        <p className="nx-eyebrow nxb-eyebrow">
          טבלת SAP
          <i aria-hidden="true" />
          {t.zoneHe}
          <i aria-hidden="true" />
          {t.mods.join(" · ")}
        </p>

        <div className="nxb-title">
          <h1 className="nxb-name nx-sap">
            <span className="nxb-cls" aria-hidden="true" />
            {t.name}
          </h1>
          <div className="nxb-names">
            <p className="nxb-he">{t.he || "אין מידע מאומת במאגר — המילון אינו מחזיק תיאור עברי לטבלה הזאת."}</p>
            {t.en ? <p className="nxb-en nx-sap">{t.en}</p> : null}
          </div>
        </div>

        {/* Module ownership. A bar and a ring, never a dot. */}
        <ul className="nxb-mods" aria-label="שיוך למודול">
          {t.mods.map((mod) => (
            <li key={mod} style={{ "--m": MOD_VAR[mod] } as React.CSSProperties}>
              <span className="nxb-mod-bar" aria-hidden="true" />
              <b>{mod}</b>
              <em>{MOD_HE[mod]}</em>
              <span className="nxb-mod-n">
                {nf.format(t.rows.filter((r) => r.mod === mod).length)}
                {t.rows.filter((r) => r.mod === mod).length === 1 ? " רשומת מילון" : " רשומות מילון"}
              </span>
            </li>
          ))}
          <li className="nxb-mods-cls" style={{ "--o": t.obj } as React.CSSProperties}>
            <i aria-hidden="true" />
            מחלקת אובייקט · {t.zoneHe}
          </li>
        </ul>

        {t.shared ? (
          <p className="nxb-shared">
            <Layers size={14} strokeWidth={1.75} aria-hidden="true" />
            שני התכנונים מתעדים את הטבלה הזאת. לכל מודול נושא, טרנזקציות ושדות משלו — שתי הרשומות מוצגות
            זו לצד זו ולא מאוחדות לאחת.
          </p>
        ) : null}

        {/* THE KEY LINE. The brief: PK and FK must be visually obvious. So the
            compound key is spelled out in the identity band, before anything
            else — it is what the table IS. Both lists come from the blueprint's
            own `key` column and neither is inferred from a field name. */}
        <dl className="nxb-keyline">
          <div data-k="PK">
            <dt>מפתח ראשי · PK</dt>
            <dd>
              {t.pk.length
                ? t.pk.map((f) => <span key={f} className="nx-sap">{f}</span>)
                : <em>אין מידע מאומת במאגר — המילון אינו מסמן מפתח ראשי</em>}
            </dd>
          </div>
          <div data-k="FK">
            <dt>מפתח זר · FK</dt>
            <dd>
              {t.fk.length
                ? t.fk.map((f) => <span key={f} className="nx-sap">{f}</span>)
                : <em>אין מידע מאומת במאגר — המילון אינו מסמן מפתח זר</em>}
            </dd>
          </div>
        </dl>

        {/* S/4HANA badge — the one place brand red appears on this page. */}
        {t.s4.impacted ? (
          <p className="nxb-s4flag">
            <span className="nu-status" style={{ "--s": RISK_COLOR[t.s4.risk] } as React.CSSProperties}>
              {t.s4.riskHe}
            </span>
            <b>הטבלה משתנה מהותית ב-S/4HANA</b>
            {t.s4.changed ? <span>{t.s4.changed}</span> : null}
            <a className="nu-link" href="#nxb-s4">
              מה בדיוק משתנה
              <ArrowLeft className="nu-arw" size={13} strokeWidth={2} aria-hidden="true" />
            </a>
          </p>
        ) : null}

        {/* Every number below is the length of something real. */}
        <div className="nxb-stats">
          {([
            [s.fields, "שדות מתועדים"],
            [s.pk, "שדות מפתח ראשי"],
            [s.fk, "שדות מפתח זר"],
            [s.rels, "קשרים ממודלים"],
            [s.joins, "ניסוחי JOIN"],
            [s.tx, "טרנזקציות"],
            [s.cds, "תצוגות CDS"],
            [s.funcs, "BAPI · FM · IDoc"],
          ] as [number, string][]).map(([v, l]) => (
            <span className="nxb-stat" key={l}>
              <b className="nx-sap">{nf.format(v)}</b>
              <em>{l}</em>
            </span>
          ))}
        </div>

        <div className="nxb-cta">
          <Link className="nu-btn" href={t.objectHref} prefetch={false}>
            <Boxes size={15} strokeWidth={1.75} aria-hidden="true" />
            עמוד האובייקט המלא
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link className="nu-btn2" href={t.erdHref} prefetch={false}>
            <GitBranch size={15} strokeWidth={1.75} aria-hidden="true" />
            הצג במודל הנתונים
          </Link>
          <Link className="nu-btn2" href="/neo/tables/" prefetch={false}>
            <Table2 size={15} strokeWidth={1.75} aria-hidden="true" />
            מילון הטבלאות
          </Link>
          {t.mods.map((mod) => (
            <Link
              key={mod}
              className="nu-link"
              href={mod === "PM" ? "/neo/pm/" : "/neo/pp-pi/"}
              prefetch={false}
            >
              סביבת העבודה של {mod}
              <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          ))}
        </div>

        <p className="nxb-rank">
          {t.deg
            ? <>לפי מספר הקשרים הממודלים, {t.name} מדורגת <b>{nf.format(t.rank)}</b> מתוך {nf.format(t.total)} טבלאות במאגר.</>
            : <>המאגר אינו רושם אף קשר ER לטבלה הזאת, מתוך {nf.format(t.total)} טבלאות מתועדות.</>}
        </p>

        <nav className="nxb-jump" aria-label="ניווט בעמוד">
          {nav.map(([id, label], i) => (
            <a key={id} className="nu-ghost" href={`#${id}`}>
              <em className="nx-sap" aria-hidden="true">{String(i + 1).padStart(2, "0")}</em>
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* ================================================= 2. S/4HANA */}
      <Sec
        id="nxb-s4"
        n={num["nxb-s4"]}
        icon={<TriangleAlert size={16} strokeWidth={1.75} />}
        eyebrow="ECC ➔ S/4HANA"
        title="מה קורה לטבלה במעבר"
        lede="קודם ההכרעה של הפרויקט ומאיפה היא מגיעה, ואחריה מה שכל תכנון כתב בעצמו — מילה במילה. הכרעה שאין לפרויקט, כתוב שאין."
      >
        <div className="nxb-stand" data-risk={t.s4.risk} data-impact={t.s4.impacted ? "1" : "0"}>
          <p className="nxb-stand-h">
            <span className="nu-status" style={{ "--s": RISK_COLOR[t.s4.risk] } as React.CSSProperties}>
              {t.s4.riskHe}
            </span>
            {t.s4.note ? <span className="nu-chip is-sap">{t.s4.note}</span> : null}
          </p>
          {t.s4.changed
            ? <p className="nxb-stand-w">{t.s4.changed}</p>
            : (
              <p className="nxb-stand-w nxb-stand-none">
                אין מידע מאומת במאגר לגבי מה שמשתנה בטבלה הזאת ב-S/4HANA.
              </p>
            )}
          {t.s4.why ? <p className="nxb-stand-y">{t.s4.why}</p> : null}
          {t.s4.tcodes.length || t.s4.cds.length ? (
            <dl className="nxb-kv">
              {t.s4.tcodes.length ? (
                <div>
                  <dt>טרנזקציות לבדיקה</dt>
                  <dd>{t.s4.tcodes.map((c) => <span key={c} className="nu-chip is-sap">{c}</span>)}</dd>
                </div>
              ) : null}
              {t.s4.cds.length ? (
                <div>
                  <dt>תצוגות תאימות</dt>
                  <dd>{t.s4.cds.map((c) => <span key={c} className="nu-chip is-sap">{c}</span>)}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}
          <p className="nxb-stand-t">
            <BadgeCheck size={12} strokeWidth={1.75} aria-hidden="true" />
            {t.s4.trustHe} · {TRUST_WHY[t.s4.trust]}
          </p>
        </div>

        <h3 className="nxb-h3">
          <Sigma size={14} strokeWidth={1.75} aria-hidden="true" />
          מה שהתכנון כתב, מילה במילה
        </h3>
        {t.s4.rows.length ? (
          <div className="nxb-s4rows">
            {t.s4.rows.map((r, i) => (
              <article key={`${r.mod}-${i}`} style={{ "--m": MOD_VAR[r.mod] } as React.CSSProperties}>
                <header>
                  <span className="nxb-row-bar" aria-hidden="true" />
                  <b>{r.mod} · {MOD_HE[r.mod]}</b>
                  {r.topic ? <em>{r.topic}</em> : null}
                </header>
                {r.note ? <p className="nxb-quote">{r.note}</p> : null}
                {r.altTable || r.altTcode ? (
                  <dl className="nxb-kv">
                    {r.altTable ? (<div><dt>טבלה / שדה חלופיים</dt><dd className="nx-sap">{r.altTable}</dd></div>) : null}
                    {r.altTcode ? (<div><dt>טרנזקציה חלופית</dt><dd className="nx-sap">{r.altTcode}</dd></div>) : null}
                  </dl>
                ) : null}
                {r.sum ? <p className="nxb-sum"><b>SUM</b>{r.sum}</p> : null}
              </article>
            ))}
          </div>
        ) : (
          <Missing what="הערת מעבר ל-S/4HANA" />
        )}
      </Sec>

      {/* ============================================== 3. WHO OWNS IT */}
      <Sec
        id="nxb-own"
        n={num["nxb-own"]}
        icon={<Boxes size={16} strokeWidth={1.75} />}
        eyebrow={t.rows.length > 1 ? "בעלות ותיעוד" : "בעלות"}
        title={
          t.rows.length > 1
            ? `${nf.format(t.rows.length)} רשומות מילון לאותה טבלה`
            : "השורה שהתכנון כתב על הטבלה"
        }
        lede="הנושא שאליו הטבלה משויכת, הטרנזקציות שנרשמו לה והמקור שממנו התיעוד נלקח — כפי שנכתבו, בלי מיזוג בין המודולים."
      >
        <div className="nxb-rows">
          {t.rows.map((r, i) => (
            <article className="nxb-row" key={`${r.mod}-${r.topicIdx}-${i}`} style={{ "--m": MOD_VAR[r.mod] } as React.CSSProperties}>
              <header>
                <span className="nxb-row-bar" aria-hidden="true" />
                <b>{r.mod} · {MOD_HE[r.mod]}</b>
                <em>{r.topic || "ללא נושא"}</em>
              </header>
              <dl className="nxb-kv">
                <div>
                  <dt>שדות ברשומה</dt>
                  <dd className="nx-sap">{nf.format(r.fields)}</dd>
                </div>
                <div>
                  <dt>טרנזקציות, כלשונן</dt>
                  <dd className="nx-sap">{r.tcodesRaw || "אין מידע מאומת במאגר"}</dd>
                </div>
                {r.fiori ? (<div><dt>אפליקציית Fiori</dt><dd className="nx-sap">{r.fiori}</dd></div>) : null}
                {r.helpLbl ? (<div><dt>מקור</dt><dd>{r.helpLbl}</dd></div>) : null}
              </dl>
              {r.guide ? <p className="nxb-guide">{r.guide}</p> : null}
            </article>
          ))}
        </div>
      </Sec>

      {/* =================================================== 4. FIELDS */}
      <Sec
        id="nxb-fields"
        n={num["nxb-fields"]}
        icon={<Columns3 size={16} strokeWidth={1.75} />}
        eyebrow="שדות"
        title={`${nf.format(s.fields)} שדות · ${nf.format(s.pk)} מפתח ראשי · ${nf.format(s.fk)} מפתח זר`}
        lede={
          <>
            עמודת המפתח היא של המילון עצמו, על ארבעת ערכיה — <b>PK</b>, <b>FK</b>, <b>PK/FK</b> ו-<b>-</b>.
            שדה שמסומן <b>PK/FK</b> הוא גם ראשי וגם זר, וכך הוא מסומן כאן. סדר השורות הוא סדר התכנון.
          </>
        }
      >
        {t.fields.length ? (
          <>
            <p className="nxb-legend" aria-hidden="true">
              <span className="nxb-kbadge" data-k="pk">PK</span> מפתח ראשי
              <span className="nxb-kbadge" data-k="fk">FK</span> מפתח זר
              <span className="nxb-kbadge" data-k="both">PK/FK</span> שניהם
            </p>
            <div className="nxb-tw">
              <table className="nxb-tbl">
                <caption className="nx-sr">שדות הטבלה {t.name}</caption>
                <thead>
                  <tr>
                    <th scope="col">מפתח</th>
                    <th scope="col">שדה טכני</th>
                    <th scope="col">תיאור</th>
                    <th scope="col">סוג</th>
                    <th scope="col">אורך</th>
                    <th scope="col">מודול</th>
                  </tr>
                </thead>
                <tbody>
                  {t.fields.map((f) => {
                    const k = f.pk && f.fk ? "both" : f.pk ? "pk" : f.fk ? "fk" : "none";
                    return (
                      <tr key={f.tech} data-k={k}>
                        <td data-l="מפתח">
                          {k === "none"
                            ? <span className="nxb-kbadge" data-k="none" aria-label="לא מפתח">—</span>
                            : <span className="nxb-kbadge" data-k={k}>{f.key}</span>}
                        </td>
                        <th scope="row" className="nx-sap nxb-ftech">{f.tech}</th>
                        <td data-l="תיאור">
                          {f.he || f.en || <span className="nxb-none">אין מידע מאומת במאגר</span>}
                          {f.he && f.en ? <em className="nxb-fen nx-sap">{f.en}</em> : null}
                        </td>
                        <td data-l="סוג" className="nx-sap">{f.dt || "—"}</td>
                        <td data-l="אורך" className="nx-sap">{f.len || "—"}</td>
                        <td data-l="מודול"><ModTag mods={f.mods} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Missing what="שדות" />
        )}
      </Sec>

      {/* ================================================ 5. RELATIONS */}
      <Sec
        id="nxb-rel"
        n={num["nxb-rel"]}
        icon={<GitBranch size={16} strokeWidth={1.75} />}
        eyebrow="קשרים ו-JOIN"
        title={`${nf.format(s.rels)} קשרים ממודלים · ${nf.format(s.joins)} ניסוחי JOIN`}
        lede={
          <>
            כיוון הקשר נקרא מתוך המילון: <b>בן</b> הוא טבלה שנושאת מפתח זר אל {t.name}, ו<b>אב</b> הוא
            טבלה ש-{t.name} מפנה אליה. עוצמת הקשר מוצגת כפי שנכתבה, וכאשר לא נכתבה — כתוב שלא נכתבה.
          </>
        }
      >
        {t.rels.length ? (
          <>
            {s.contested ? (
              <p className="nxb-warn">
                <TriangleAlert size={14} strokeWidth={1.75} aria-hidden="true" />
                {s.contested === 1 ? "טבלה אחת מופיעה" : `${nf.format(s.contested)} טבלאות מופיעות`} כאן
                פעמיים, כבן וכאב. זו אינה כפילות: שני התכנונים רושמים את אותו קשר בכיוונים הפוכים. שתי
                הרשומות נשמרות — הכרעה ביניהן תהיה המצאה.
              </p>
            ) : null}
            <ul className="nxb-rels">
              {t.rels.map((r) => (
                <li
                  key={`${r.dir}-${r.name}`}
                  className="nxb-rel"
                  style={{ "--r": relVar(r.kind), "--o": r.obj } as React.CSSProperties}
                >
                  <span className="nxb-rel-dir" data-dir={r.dir} data-ct={r.contested ? "1" : "0"}>
                    {r.dir === "child" ? "בן" : "אב"}
                  </span>
                  <span className="nxb-rel-name">
                    <i className="nxb-rel-cls" aria-hidden="true" />
                    {r.href ? (
                      <Link className="nx-sap nu-link nxb-rel-a" href={r.href} prefetch={false}>
                        {r.name}
                        <ArrowLeft className="nu-arw" size={12} strokeWidth={2} aria-hidden="true" />
                      </Link>
                    ) : (
                      // No page is generated for this table, so it is printed as
                      // the value it is. A chip has no hover and no pointer.
                      <span className="nu-chip is-sap">{r.name}</span>
                    )}
                    <em>{r.he || "אין מידע מאומת במאגר"}</em>
                  </span>
                  <span className="nxb-rel-card">
                    <i aria-hidden="true" />
                    {r.card || REL_HE[r.kind]}
                  </span>
                  <ModTag mods={r.edgeMods} />
                  <span className="nxb-rel-joins">
                    {r.joins.map((j, i) =>
                      j.join
                        ? <code className="nxb-join" key={`${j.mod}-${i}`} dir="ltr">{j.join}</code>
                        : <span className="nxb-none" key={`${j.mod}-${i}`}>{j.mod}: אין ניסוח JOIN במאגר</span>,
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Missing what="קשרי ER ממודלים" />
        )}

        {t.dangling.length ? (
          <div className="nxb-dangle">
            <h3 className="nxb-h3">
              <TriangleAlert size={14} strokeWidth={1.75} aria-hidden="true" />
              {nf.format(t.dangling.length)} קשרים אל טבלאות שאינן במאגר
            </h3>
            <p className="nxb-note">
              התכנון רושם את הקשרים האלה, אך את הטבלה שבצד השני הוא אינו מתעד. הם מופיעים כרשומה ולא
              כקישור — קצה שלא נבדק לא ייפתח כאילו נבדק.
            </p>
            <ul className="nxb-dangle-l">
              {t.dangling.map((d, i) => (
                <li key={`${d.table}-${i}`} style={{ "--r": relVar(d.kind) } as React.CSSProperties}>
                  <span className="nu-chip is-sap">{d.table}</span>
                  <span className="nxb-rel-card"><i aria-hidden="true" />{d.card || REL_HE[d.kind]}</span>
                  {d.join ? <code className="nxb-join" dir="ltr">{d.join}</code> : null}
                  {d.desc ? <em>{d.desc}</em> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="nxb-links">
          <Link className="nu-link" href={t.erdHref} prefetch={false}>
            הקשרים במפת ה-ER המלאה
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link className="nu-link" href={t.objectHref} prefetch={false}>
            מפת הקשרים סביב {t.name}
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </Sec>

      {/* ============================================= 6. TRANSACTIONS */}
      <Sec
        id="nxb-tx"
        n={num["nxb-tx"]}
        icon={<Terminal size={16} strokeWidth={1.75} />}
        eyebrow="טרנזקציות"
        title={`${nf.format(s.tx)} טרנזקציות שהמאגר קושר לטבלה`}
        lede={
          s.tx ? (
            <>
              {nf.format(s.txLinked)} מהן מתועדות במרשם הטרנזקציות ונפתחות לעמוד מלא. השאר מוצגות
              כערך — הקוד נרשם בתכנון, ואין לו עמוד במרשם.
            </>
          ) : undefined
        }
      >
        {t.tx.length ? (
          <ul className="nxb-tx">
            {t.tx.map((x) => (
              <li key={x.code}>
                {x.href ? (
                  <Link className="nu-card nxb-txcard" href={x.href} prefetch={false}>
                    <b className="nx-sap">{x.code}</b>
                    <ModTag mods={x.mods} />
                    <ArrowUpLeft className="nxb-txarw" size={14} strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="nxb-txflat">
                    <span className="nu-chip is-sap">{x.code}</span>
                    <ModTag mods={x.mods} />
                    <em>אין עמוד במרשם</em>
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <Missing what="טרנזקציות" />
        )}
        <p className="nxb-links">
          <Link className="nu-link" href="/neo/transactions/" prefetch={false}>
            מרשם הטרנזקציות
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </Sec>

      {/* ====================================================== 7. CDS */}
      <Sec
        id="nxb-cds"
        n={num["nxb-cds"]}
        icon={<Sigma size={16} strokeWidth={1.75} />}
        eyebrow="תצוגות CDS"
        title="מה קורא את הטבלה ב-S/4HANA"
        lede="מיפוי מתוחזק של טבלה קלאסית לתצוגת CDS משוחררת. תצוגה מופיעה כאן רק כשהטבלה הזאת נמצאת בה, ולצידה שאר הטבלאות שהיא קוראת."
      >
        {t.cds.length ? (
          <ul className="nxb-cds">
            {t.cds.map((c) => (
              <li key={c.view}>
                <b className="nx-sap">{c.view}</b>
                <em>{c.he}</em>
                <span className="nx-sap nxb-dim">{c.tables.join(" · ")}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Missing what="תצוגות CDS" />
        )}
        <p className="nxb-links">
          <Link className="nu-link" href="/neo/cds/" prefetch={false}>
            מרשם ה-CDS של הפרויקט
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </Sec>

      {/* =============================================== 8. INTERFACES */}
      <Sec
        id="nxb-if"
        n={num["nxb-if"]}
        icon={<Cable size={16} strokeWidth={1.75} />}
        eyebrow="ממשקים"
        title={`${nf.format(t.funcs.length)} BAPI · FM · IDoc · ${nf.format(t.progs.length)} תוכניות`}
        lede="השם והתיאור הם של המאגר, כולל ממשקי Zetes ו-Daymax שהתכנון רשם. עמודת המודול מראה איזה תכנון רשם את האובייקט."
      >
        {t.funcs.length ? (
          <ul className="nxb-funcs">
            {t.funcs.map((f) => (
              <li key={f.name}>
                <b className="nx-sap">{f.name}</b>
                <em>{f.he || "אין מידע מאומת במאגר"}</em>
                <ModTag mods={f.mods} />
              </li>
            ))}
          </ul>
        ) : (
          <Missing what="אובייקטי ממשק" />
        )}

        <h3 className="nxb-h3">
          <Terminal size={14} strokeWidth={1.75} aria-hidden="true" />
          תוכניות ודוחות
        </h3>
        {t.progs.length ? (
          <ul className="nxb-funcs">
            {t.progs.map((p) => (
              <li key={p.name}>
                <b className="nx-sap">{p.name}</b>
                <em>{p.he || "אין מידע מאומת במאגר"}</em>
                <ModTag mods={p.mods} />
              </li>
            ))}
          </ul>
        ) : (
          <Missing what="תוכניות ודוחות" />
        )}

        <h3 className="nxb-h3">
          <AppWindow size={14} strokeWidth={1.75} aria-hidden="true" />
          אפליקציות Fiori
        </h3>
        {t.fiori.length ? (
          <ul className="nxb-funcs">
            {t.fiori.map((f, i) => (
              <li key={`${f.mod}-${i}`}>
                <b className="nx-sap">{f.app}</b>
                <em>כפי שנרשם בתכנון</em>
                <ModTag mods={[f.mod]} />
              </li>
            ))}
          </ul>
        ) : (
          <Missing what="אפליקציית Fiori" />
        )}

        <p className="nxb-links">
          <Link className="nu-link" href="/neo/bapi/" prefetch={false}>
            מרשם ה-BAPI וה-FM
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link className="nu-link" href="/neo/idoc/" prefetch={false}>
            מרשם ה-IDoc
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link className="nu-link" href="/neo/fiori-apps/" prefetch={false}>
            מרשם אפליקציות Fiori
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </Sec>

      {/* ================================================= 9. SIBLINGS */}
      <Sec
        id="nxb-sib"
        n={num["nxb-sib"]}
        icon={<Workflow size={16} strokeWidth={1.75} />}
        eyebrow="אובייקטים קשורים"
        title={`${nf.format(s.siblings)} טבלאות תחת אותו נושא במאגר`}
        lede="הקיבוץ הוא של התכנון עצמו — אלה הטבלאות שנכתבו תחת אותו נושא, ולא הערכה של דמיון ביניהן."
      >
        {t.siblings.length ? (
          <ul className="nxb-sibs">
            {t.siblings.map((sb) => (
              <li key={sb.name} style={{ "--o": sb.obj } as React.CSSProperties}>
                {sb.href ? (
                  <Link className="nu-card nxb-sibcard" href={sb.href} prefetch={false}>
                    <i className="nxb-rel-cls" aria-hidden="true" />
                    <b className="nx-sap">{sb.name}</b>
                    <em>{sb.he || "אין מידע מאומת במאגר"}</em>
                    <span className="nxb-dim">{sb.topic}</span>
                    <ArrowUpLeft className="nxb-txarw" size={14} strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="nxb-sibflat">
                    <i className="nxb-rel-cls" aria-hidden="true" />
                    <span className="nu-chip is-sap">{sb.name}</span>
                    <em>{sb.he || "אין מידע מאומת במאגר"}</em>
                    <span className="nxb-dim">{sb.topic}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <Missing what="טבלאות נוספות תחת אותו נושא" />
        )}
      </Sec>

      {/* ==================================================== 10. BOOKS */}
      <Sec
        id="nxb-books"
        n={num["nxb-books"]}
        icon={<Library size={16} strokeWidth={1.75} />}
        eyebrow="ספרייה"
        title="ספרים המכסים את המודול"
        lede={
          <>
            הקישור כאן הוא <b>ברמת המודול</b>. אינדקס הספרייה של הפרויקט הוא ברמת פרק ואין בו מיפוי של
            טבלה לפרק, ולכן לא נטען שספר מסוים מכסה את <span className="nx-sap">{t.name}</span> עצמה.
          </>
        }
      >
        {t.books.length ? (
          <ul className="nxb-books">
            {t.books.map((b) =>
              b.href ? (
                <li key={b.id}>
                  <Link className="nu-card nxb-bookcard" href={b.href} prefetch={false}>
                    <b>{b.titleHe}</b>
                    <em className="nx-sap">{b.title}</em>
                    <span className="nxb-dim">
                      {b.module} · {nf.format(b.chapters)} פרקים · {nf.format(b.pages)} עמודים
                    </span>
                    <ArrowUpLeft className="nxb-txarw" size={14} strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </li>
              ) : (
                // No spine on disk for this shelf entry, so the books route
                // generated no page for it: a record, not a link.
                <li key={b.id} className="nxb-bookflat">
                  <b>{b.titleHe}</b>
                  <em className="nx-sap">{b.title}</em>
                  <span className="nxb-dim">
                    {b.module} · {nf.format(b.chapters)} פרקים · {nf.format(b.pages)} עמודים
                  </span>
                </li>
              ),
            )}
          </ul>
        ) : (
          <Missing what="ספרים" />
        )}
        <p className="nxb-links">
          <Link className="nu-btn2" href="/neo/library/" prefetch={false}>
            <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
            הספרייה הדיגיטלית
          </Link>
          <Link className="nu-link" href="/neo/books/" prefetch={false}>
            מדף הספרים של NEO
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link className="nu-link" href="/neo/knowledge/" prefetch={false}>
            מרכז הידע
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </Sec>

      <footer className="nxb-foot">
        <p>
          <Database size={13} strokeWidth={1.75} aria-hidden="true" />
          המקור הוא שני קובצי התכנון של הפרויקט ומיפויי ה-CDS וה-S/4 שלו. שדה שהמאגר שותק לגביו מוצג
          כ«אין מידע מאומת במאגר» ולא מולא בערך סביר.
        </p>
        <p className="nxb-credit">
          <KeyRound size={13} strokeWidth={1.75} aria-hidden="true" />
          Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding
        </p>
      </footer>
    </article>
  );
}
