// Project NEO · Stage 2B — the SAP object page.
//
// SERVER component. Every value on the page comes from `objectView()`, which
// reads the project dataset at build time; the only client code is the orbit,
// which receives plain serialisable props.
//
// THE RULE THIS PAGE IS BUILT AROUND. Where the dictionary holds something, it
// is printed verbatim. Where it holds nothing, the page SAYS the dictionary
// holds nothing, in the place the content would have been. There is no state in
// which a reader can mistake a gap for a fact — no placeholder prose, no
// generic SAP knowledge poured into an empty section, no invented note number.
//
// COLOUR, per the form rule in app/globals.css:
//   MODULE (--mod-*)  ring, line, section marker, surface tint. Never a dot.
//   OBJECT (--obj-*)  the data's own class — chips and markers on the object.
//   RELATION (--rel-*) cardinality only.
//   Brand red stays the single global accent and is never a data category.

import Link from "next/link";
import {
  AlertTriangle, ArrowLeft, ArrowUpLeft, BadgeCheck, BookOpen, Boxes, Cable,
  Code2, Columns3, GitBranch, Layers, Library, Route, Sigma, Table2, Terminal,
  TriangleAlert, Workflow,
} from "lucide-react";
import { RISK_COLOR } from "@/lib/s4";
import { OriginLink } from "@/components/neo-shell/nav-context";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { ObjectDepth } from "./object-depth";
import { ObjectFields } from "./object-fields";
import { ObjectReturn } from "./object-return";
import { ObjectLanes } from "./object-lanes";
import { objectSummary, relVar, type ObjectView } from "./object-data";

const nf = new Intl.NumberFormat("he-IL");

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };
const MOD_HE: Record<string, string> = { PM: "אחזקת מפעל · PM", "PP-PI": "ייצור תהליכי · PP-PI" };
const REL_HE: Record<string, string> = { "1-1": "1:1", "n-1": "N:1", unstated: "לא מצוין" };

const TRUST_WHY: Record<string, string> = {
  verified: "ידע Simplification List מתוחזק בפרויקט",
  partial: "נגזר מעמודת ה-S/4 של התיעוד. מומלץ אימות מול SAP",
  needs: "הפרויקט אינו מחזיק הכרעה לטבלה הזאת",
};

/** The one empty state on the page. It names the dataset that is silent instead
 *  of apologising, so the absence is auditable. */
function Silent({ what }: { what: string }) {
  return <p className="no-silent">התיעוד של Project NEO אינו מחזיק {what} עבור האובייקט הזה.</p>;
}

/** A SECTION of the object page.
 *
 *  The client kept the page's structure and asked for its hierarchy: "Each major
 *  section needs stronger visual separation… a stronger heading, larger type,
 *  intentional accent, icon where useful, clear spacing." So a section is now
 *  numbered, its icon carries the module accent as a tinted ring, the h2 is the
 *  largest type on the page after the object's own name, and one sentence of
 *  orientation sits under it. The number comes from the page, which also builds
 *  the jump nav from the same list — so the nav and the sections cannot drift. */
function Sec({
  id, n, icon, eyebrow, title, lede, children,
}: {
  id: string;
  n: number;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  lede?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    // nm-rise + nm-once, from app/neo/motion.css. /neo/object/<NAME>/ resolves
    // to [data-motion="2"]: an 8px rise scrubbed on .nx-canvas's own view
    // timeline, complete while the section is still entering so it never
    // replays on the way back up. One class, on the single wrapper all eleven
    // sections already share.
    <section className="no-sec nm-rise nm-once" id={id} aria-labelledby={`${id}-h`}>
      <header className="no-sec-h">
        <span className="no-sec-n" aria-hidden="true">{String(n).padStart(2, "0")}</span>
        <p className="no-sec-k">
          <span className="no-sec-ico" aria-hidden="true">{icon}</span>
          {eyebrow}
        </p>
        <h2 className="no-h2" id={`${id}-h`}>{title}</h2>
        {lede ? <p className="no-sec-s">{lede}</p> : null}
      </header>
      <div className="no-sec-b">{children}</div>
    </section>
  );
}

export function ObjectPage({ v }: { v: ObjectView }) {
  const s = objectSummary(v);
  // Where a reader who leaves this page is leaving FROM. Nothing on the object
  // page is live — no query, no filter, no camera — so the record is a plain
  // object and can be built on the server. The name is the dictionary's own.
  const from = { href: `/neo/object/${v.name}/`, label: "אובייקט", detail: v.name };
  const rowsPerMod = new Map<string, number>();
  for (const r of v.rows) rowsPerMod.set(r.mod, (rowsPerMod.get(r.mod) || 0) + 1);

  const stats: [string, string][] = [
    [nf.format(v.fields.length), "שדות מתועדים"],
    [nf.format(s.neighbours), "טבלאות מקושרות"],
    [nf.format(s.joins), "ניסוחי JOIN"],
    [nf.format(new Set(v.tcodes.flatMap((t) => t.codes)).size), "טרנזקציות"],
    [nf.format(v.funcs.length), "BAPI · FM · IDoc"],
    [nf.format(v.cds.length), "תצוגות CDS"],
  ];

  // ONE list drives the numbering and the jump nav, so a section can never be
  // numbered 06 in the page and 05 in the nav. The order and the wording are
  // the client's own: מפת קשרים · שדות · טרנזקציות · היכן האובייקט יושב
  // בשרשרת · מה התכנון אומר על המעבר · תצוגות CDS · BAPI/FM/IDoc · תקלות ·
  // ספרים המכסים את המודול — with the dictionary record first, because it is
  // the thing every other section is about.
  const nav: [string, string][] = [
    ["no-rows", v.rows.length > 1 ? "רשומות התיעוד" : "רשומת התיעוד"],
    ["no-map", "מפת קשרים"],
    ["no-rel", "קשרים ו־JOIN"],
    ["no-fields", "שדות"],
    ["no-deep", "עומק טכני"],
    ["no-tx", "טרנזקציות"],
    ["no-flow", "בשרשרת התהליך"],
    ["no-s4", "המעבר ל-S/4HANA"],
    ["no-cds", "תצוגות CDS"],
    ["no-if", "BAPI · FM · IDoc"],
    ["no-trb", "תקלות"],
    ["no-books", "ספרים"],
  ];
  const num = Object.fromEntries(nav.map(([id], i) => [id, i + 1])) as Record<string, number>;

  return (
    <div className="no" style={{ "--o": v.obj } as React.CSSProperties}>
      {/* Where the reader came from, when the session knows: a module
          workspace with its topic, the ERD with its focus, the search with its
          query. With no memory it falls back to the table dictionary. */}
      <ObjectReturn />

      {/* ==================================================== IDENTITY */}
      <header className="no-hero nm-rise nm-once">
        <div className="no-hero-copy">
          <p className="no-eye">
            <OriginLink href="/neo/erd/" origin={from}>מודל הנתונים</OriginLink>
            <i aria-hidden="true" />
            {v.zoneHe}
            <i aria-hidden="true" />
            טבלת SAP
          </p>

          <h1 className="no-mega">
            <span className="no-cls" aria-hidden="true" />
            <span className="nx-sap">{v.name}</span>
          </h1>

          <p className="no-lede">{v.he || "התיעוד אינו מחזיק תיאור עברי לטבלה הזו."}</p>
          {v.en ? <p className="no-en nx-sap">{v.en}</p> : null}

          <ul className="no-mods" aria-label="שיוך למודול">
            {v.mods.map((m) => (
              <li key={m} style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>
                <span className="no-mod-bar" aria-hidden="true" />
                <b>{MOD_HE[m]}</b>
                <em>
                  {rowsPerMod.get(m)} {rowsPerMod.get(m) === 1 ? "רשומת תיעוד" : "רשומות תיעוד"}
                </em>
              </li>
            ))}
            <li className="no-mods-cls" style={{ "--o": v.obj } as React.CSSProperties}>
              <i aria-hidden="true" />
              מחלקת אובייקט · {v.zoneHe}
            </li>
          </ul>

          {v.shared ? (
            <p className="no-shared">
              <Layers size={14} strokeWidth={1.75} aria-hidden="true" />
              אחת מ־19 הטבלאות ששני התכנונים מתעדים; לכל מודול נושא, טרנזקציות ושדות משלו.
              שני הפרצופים מוצגים כאן זה לצד זה, בלי לאחד אותם לאחד.
            </p>
          ) : null}

          {/* THE KEY LINE. The brief: "Primary Key must be obvious. Foreign Key
              must be obvious." So the compound key is spelled out in the
              identity band, before anything else on the page — it is what the
              object IS. Both lists are the blueprint's own `key` column; a
              blank one is stated as blank and never inferred from a name. */}
          <p className="no-keyline">
            <span className="no-keyline-g" data-k="PK">
              <b>PK</b>
              {v.pk.length ? (
                v.pk.map((f) => (
                  <span key={f} className="nx-sap">{f}</span>
                ))
              ) : (
                <em>התיעוד אינו מסמן מפתח ראשי</em>
              )}
            </span>
            <span className="no-keyline-g" data-k="FK">
              <b>FK</b>
              {v.fk.length ? (
                v.fk.map((f) => (
                  <span key={f} className="nx-sap">{f}</span>
                ))
              ) : (
                <em>התיעוד אינו מסמן מפתח זר</em>
              )}
            </span>
          </p>

          {/* S/4HANA, in the identity band and not in a footnote — the brief
              makes it the primary forward context. It appears only when the
              project actually resolves a material change for this table. */}
          {v.s4.impacted ? (
            <p className="no-s4flag">
              <span className="nu-status" style={{ "--s": RISK_COLOR[v.s4.risk] } as React.CSSProperties}>
                {v.s4.riskHe}
              </span>
              <b>הטבלה משתנה מהותית ב-S/4HANA</b>
              <span>{v.s4.changed}</span>
              <a className="nu-link" href="#no-s4">
                מה בדיוק משתנה
                <ArrowLeft className="nu-arw" size={13} strokeWidth={2} aria-hidden="true" />
              </a>
            </p>
          ) : null}

          <div className="no-stats">
            {stats.map(([n, l]) => (
              <span className="no-stat" key={l}>
                <b className="nx-sap">{n}</b>
                <em>{l}</em>
              </span>
            ))}
          </div>

          <div className="no-cta">
            <OriginLink className="nu-btn" href={`/neo/erd/#${v.name}`} origin={from}>
              <GitBranch size={15} strokeWidth={1.75} aria-hidden="true" />
              הצג במודל הנתונים המלא
              <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
            </OriginLink>
            <OriginLink className="nu-btn2" href="/neo/tables/" origin={from}>
              <Table2 size={15} strokeWidth={1.75} aria-hidden="true" />
              טבלאות SAP
            </OriginLink>
            {v.mods.map((m) => (
              <OriginLink
                key={m}
                className="nu-link"
                href={m === "PM" ? "/neo/pm/" : "/neo/pp-pi/"}
                origin={from}
              >
                סביבת העבודה של {m}
                <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
              </OriginLink>
            ))}
          </div>
        </div>

      </header>

      {/* The same eleven destinations that used to sit inside the hero, kept on
          screen instead of scrolling away with it, and marking which section the
          reader is currently in. Built from the SAME `nav` array as the section
          numbers below, so the two can never disagree. */}
      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      {/* ============================================ DUAL IDENTITY / ROWS */}
      <Sec
        id="no-rows"
        n={num["no-rows"]}
        icon={<Boxes size={16} strokeWidth={1.75} />}
        eyebrow={v.rows.length > 1 ? "זהות כפולה" : "רשומת התיעוד"}
        title={v.rows.length > 1 ? `${v.rows.length} רשומות תיעוד לאותה טבלה` : "ההקשר העסקי"}
        lede={
          v.rows.length > 1
            ? "אותה טבלה פיזית, מתועדת יותר מפעם אחת. כל כרטיס הוא שורה אחת בתכנון המקורי, עם הנושא, הטרנזקציות וההערות שלה, כפי שנכתבו, בלי מיזוג."
            : "השורה שהתכנון של המודול כתב על הטבלה הזאת: הנושא שאליו היא משויכת, הטרנזקציות שנרשמו לה וההערות שנלוו אליה."
        }
      >
        <div className="no-rows">
          {v.rows.map((r, i) => (
            <article className="no-row" key={`${r.mod}-${r.topicIdx}-${i}`} style={{ "--m": MOD_VAR[r.mod] } as React.CSSProperties}>
              <header>
                <span className="no-row-bar" aria-hidden="true" />
                <b>{MOD_HE[r.mod]}</b>
                <em>{r.topic || "ללא נושא"}</em>
              </header>
              <dl className="no-kv">
                <div>
                  <dt>טרנזקציות</dt>
                  <dd className="nx-sap">{r.tcodesRaw || "–"}</dd>
                </div>
                <div>
                  <dt>שדות ברשומה</dt>
                  <dd className="nx-sap">{nf.format(r.fields)}</dd>
                </div>
                {r.fiori ? (
                  <div>
                    <dt>אפליקציית Fiori</dt>
                    <dd className="nx-sap">{r.fiori}</dd>
                  </div>
                ) : null}
                {r.helpLbl ? (
                  <div>
                    <dt>מקור</dt>
                    <dd>{r.helpLbl}</dd>
                  </div>
                ) : null}
              </dl>
              {r.guide ? <p className="no-guide">{r.guide}</p> : null}
            </article>
          ))}
        </div>
      </Sec>

      {/* ==================================================== THE ORBIT */}
      <Sec
        id="no-map"
        n={num["no-map"]}
        icon={<Workflow size={16} strokeWidth={1.75} />}
        eyebrow="מפת קשרים"
        title="האובייקט במרכז, והקשרים שסביבו"
        lede={
          v.neighbours.length ? (
            <>
              {v.name} מדורגת <b>{nf.format(v.rank)}</b> מתוך {nf.format(v.total)} טבלאות לפי מספר
              הקשרים הממודלים. בחירה במפה מציגה את ניסוח ה-JOIN המדויק כפי שהתיעוד מחזיק אותו.
            </>
          ) : undefined
        }
      >
        {/* The relationship map is the OLD Architecture Studio graph, ported.
            Only this visualisation changed; the section, its heading, its lede
            and the whole page around it are the new NEO Object Detail and stay
            exactly as they are. */}
        {v.neighbours.length ? (
          <ObjectLanes name={v.name} />
        ) : (
          <Silent what="קשרי ER ממודלים" />
        )}
      </Sec>

      {/* ============================================== RELATIONS + JOINS */}
      <Sec
        id="no-rel"
        n={num["no-rel"]}
        icon={<GitBranch size={16} strokeWidth={1.75} />}
        eyebrow="קשרים ו־JOIN"
        title={`${s.neighbours} קשרים ממודלים · ${s.joins} ניסוחי JOIN`}
        lede={
          v.neighbours.length ? (
            <>
              כיוון הקשר נקרא מתוך התיעוד: <b>בן</b> הוא טבלה שנושאת מפתח זר אל {v.name}, ו<b>אב</b> הוא
              טבלה ש־{v.name} מפנה אליה. עוצמת הקשר מוצגת כפי שנכתבה, וכאשר לא נכתבה, כתוב שלא נכתבה.
            </>
          ) : undefined
        }
      >
        {v.neighbours.length ? (
          <>
            {s.contested ? (
              <p className="no-warn">
                <TriangleAlert size={14} strokeWidth={1.75} aria-hidden="true" />
                {s.contested === 1 ? "טבלה אחת מופיעה" : `${s.contested} טבלאות מופיעות`} כאן פעמיים,
                כבן וכאב. זו אינה כפילות: שני התכנונים רושמים את אותו קשר בכיוונים הפוכים, וכל אחד
                מציב צד אחר כבעל המפתח הראשי. שתי הרשומות נשמרות; הכרעה ביניהן תהיה המצאה.
              </p>
            ) : null}
            <ul className="no-rels">
              {v.neighbours.map((n) => (
                <li
                  key={`${n.dir}-${n.name}`}
                  className="no-rel-row"
                  style={{ "--r": relVar(n.kind), "--o": n.obj } as React.CSSProperties}
                >
                  <span className="no-rel-dir" data-dir={n.dir} data-ct={n.contested ? "1" : "0"}>
                    {n.dir === "child" ? "בן" : "אב"}
                  </span>
                  <span className="no-rel-name">
                    <i className="no-rel-cls" aria-hidden="true" />
                    <OriginLink className="nx-sap" href={`/neo/object/${n.name}/`} origin={from}>{n.name}</OriginLink>
                    <em>{n.he || "–"}</em>
                  </span>
                  <span className="no-rel-card">
                    <i aria-hidden="true" />
                    {n.card || REL_HE[n.kind]}
                  </span>
                  <span className="no-modtag">
                    {n.edgeMods.map((m) => (
                      <b key={m} style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>{m}</b>
                    ))}
                  </span>
                  <span className="no-rel-joins">
                    {n.joins.map((j, i) =>
                      j.join ? (
                        <code className="no-join" key={i}>{j.join}</code>
                      ) : (
                        <span className="no-none" key={i}>{j.mod}: אין ניסוח JOIN בתיעוד</span>
                      ),
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Silent what="קשרי ER ממודלים" />
        )}

        {/* SELF-REFERENCE — a hierarchy.
            Not a graph edge and not a dangling reference, so neither edges()
            nor danglingFor() can hold one, and until this block existed a real
            documented relation rendered nowhere: IFLOT.TPLMA → IFLOT.TPLNR, the
            superior functional location, which IS the plant's structure. */}
        {v.selfRels.length ? (
          <div className="no-dangle no-self">
            <h3 className="no-h3">
              <GitBranch size={14} strokeWidth={1.75} aria-hidden="true" />
              היררכיה — הטבלה מצביעה על עצמה
            </h3>
            <p className="no-note">
              רשומה בטבלה הזאת מפנה לרשומה אחרת באותה טבלה. זה קשר אמיתי שהתכנון מתעד,
              אך הוא אינו קשת במפה: מפה מציירת שתי טבלאות, וכאן יש אחת.
            </p>
            <ul className="no-dangle-l">
              {v.selfRels.map((r, i) => (
                <li key={i} style={{ "--r": relVar(r.kind) } as React.CSSProperties}>
                  <b className="nx-sap">{v.name}</b>
                  <span className="no-rel-card">
                    <i aria-hidden="true" />
                    {r.card || REL_HE[r.kind]}
                  </span>
                  {r.join ? <code className="no-join">{r.join}</code> : null}
                  {r.desc ? <em>{r.desc}</em> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {v.dangling.length ? (
          <div className="no-dangle">
            <h3 className="no-h3">
              <TriangleAlert size={14} strokeWidth={1.75} aria-hidden="true" />
              {v.dangling.length} קשרים אל טבלאות שאינן בתיעוד
            </h3>
            <p className="no-note">
              התכנון המקורי רושם את הקשרים האלה, אך את הטבלה שבצד השני הוא אינו מתעד.
              הם מופיעים כאן כרשומה, ולא מצוירים במפה. קצה שלא נבדק לא יצויר כאילו נבדק.
            </p>
            <ul className="no-dangle-l">
              {v.dangling.map((d, i) => (
                <li key={`${d.table}-${i}`} style={{ "--r": relVar(d.kind) } as React.CSSProperties}>
                  <b className="nx-sap">{d.table}</b>
                  <span className="no-rel-card">
                    <i aria-hidden="true" />
                    {d.card || REL_HE[d.kind]}
                  </span>
                  {d.join ? <code className="no-join">{d.join}</code> : null}
                  {d.desc ? <em>{d.desc}</em> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Sec>

      {/* ======================================================== FIELDS */}
      <Sec
        id="no-fields"
        n={num["no-fields"]}
        icon={<Columns3 size={16} strokeWidth={1.75} />}
        eyebrow="שדות"
        /* "12 מפתח ראשי" does not agree in Hebrew: a count needs a plural
           noun. PK/FK is this page's own vocabulary and is spelled out in the
           legend directly below, so it stays correct at every count. */
        title={`${v.fields.length} שדות · ${v.pk.length} שדות PK · ${v.fk.length} שדות FK`}
        lede="המפתחות נקראים ראשונים, כי הם מה שהאובייקט הוא. הטבלה שמתחתיהם מציגה את איחוד השדות שכל תכנון מתעד, בסדר שנכתב, וניתן לצמצם אותה לשדות המפתח בלבד."
      >
        {v.fields.length ? <ObjectFields fields={v.fields} name={v.name} /> : <Silent what="שדות" />}
      </Sec>

      {/* ======================================================== DEPTH
          data/table-enrichment — the layer the GENERATED blueprint cannot
          carry. It sits here, straight after the fields, because everything in
          it is about how this table is actually read and written: what each key
          field means, which foreign keys are really relationships, which access
          path to take, what MATDOC/ACDOCA does to it in S/4, and three worked
          examples. Every entry cites its own DDIC / SAP Help source and those
          sources are printed — the claim and its provenance travel together. */}
      <Sec
        id="no-deep"
        n={num["no-deep"]}
        icon={<Code2 size={16} strokeWidth={1.75} />}
        eyebrow="עומק טכני"
        title="איך קוראים וכותבים את הטבלה הזאת"
        lede={
          v.enrich
            ? "שכבת ההעשרה של הפרויקט: משמעות שדות המפתח, מפתחות זרים כקשרים, נתיב הגישה המומלץ, שיקולי ביצועים ושלוש דוגמאות עבודה. המקורות מודפסים בסוף הקטע."
            : undefined
        }
      >
        {v.enrich ? <ObjectDepth e={v.enrich} /> : <Silent what="שכבת עומק טכני" />}
      </Sec>

      {/* ================================================== TRANSACTIONS */}
      <Sec
        id="no-tx"
        n={num["no-tx"]}
        icon={<Terminal size={16} strokeWidth={1.75} />}
        eyebrow="טרנזקציות"
        title="הטרנזקציות שהתיעוד קושר לטבלה"
        lede="הקודים מוצגים לפי הרשומה שכתבה אותם, ולצידם המחרוזת המקורית מילה במילה, כדי שניתן יהיה לראות מה פוצל ומה נכתב במקור."
      >
        {v.tcodes.some((t) => t.codes.length) ? (
          <div className="no-tx">
            {v.tcodes.map((t, i) => (
              <div className="no-tx-g" key={`${t.mod}-${i}`} style={{ "--m": MOD_VAR[t.mod] } as React.CSSProperties}>
                <span className="no-row-bar" aria-hidden="true" />
                <b>{MOD_HE[t.mod]}</b>
                {t.codes.length ? (
                  <ul>
                    {t.codes.map((c) => (
                      <li key={c} className="nx-sap">{c}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="no-none">אין טרנזקציה ברשומה הזו</span>
                )}
                {t.raw ? <em className="no-raw nx-sap">{t.raw}</em> : null}
              </div>
            ))}
          </div>
        ) : (
          <Silent what="טרנזקציות" />
        )}
      </Sec>

      {/* ========================================================= FLOW */}
      <Sec
        id="no-flow"
        n={num["no-flow"]}
        icon={<Route size={16} strokeWidth={1.75} />}
        eyebrow="תהליך עסקי"
        title="היכן האובייקט יושב בשרשרת"
        lede="שרשרת התהליך מגיעה ממפת התהליכים של הפרויקט, אותה שרשרת שסביבת העבודה של המודול מציירת. שלב שאין לו טבלה בתיעוד מסומן ככזה ולא מושלם."
      >
        {v.flow.some((f) => f.idx >= 0) ? (
          v.flow.map((f) => (
            <div className="no-flow" key={f.mod} style={{ "--m": MOD_VAR[f.mod] } as React.CSSProperties}>
              <header>
                <span className="no-row-bar" aria-hidden="true" />
                <b>{MOD_HE[f.mod]}</b>
                {f.idx >= 0 ? (
                  <em>שלב {f.idx + 1} מתוך {f.steps.length}</em>
                ) : (
                  <em>אינו שלב בשרשרת של המודול הזה</em>
                )}
              </header>
              <ol className="no-chain">
                {f.steps.map((st) => (
                  <li key={st.code} data-here={st.here ? "1" : "0"} data-miss={st.exists ? "0" : "1"}>
                    <b className="nx-sap">{st.code}</b>
                    <em>{st.label}</em>
                    {!st.exists ? <span className="no-none">מחוץ לתיעוד של המודול</span> : null}
                  </li>
                ))}
              </ol>
            </div>
          ))
        ) : (
          <Silent what="מיקום בשרשרת התהליך" />
        )}
      </Sec>

      {/* ================================================ ECC ➔ S/4HANA
          The brief promotes this from a comparison footnote to the primary
          forward context, so the section opens with a STANDING block — risk,
          what changes, why it matters, the SAP Note the project holds — before
          the blueprint's own per-row wording. The risk hue lands only on a
          .nu-status dot; the block's weight comes from size, type and the
          module edge, which is what the form rule allows. */}
      <Sec
        id="no-s4"
        n={num["no-s4"]}
        icon={<TriangleAlert size={16} strokeWidth={1.75} />}
        eyebrow="ECC ➔ S/4HANA"
        title="מה התכנון אומר על המעבר"
        lede="קודם ההכרעה של הפרויקט על הטבלה הזאת ומאיפה היא מגיעה, ואחריה מה שכל תכנון כתב בעצמו, מילה במילה."
      >
        <div className="no-stand" data-risk={v.s4.risk} data-impact={v.s4.impacted ? "1" : "0"}>
          <p className="no-stand-h">
            <span className="nu-status" style={{ "--s": RISK_COLOR[v.s4.risk] } as React.CSSProperties}>
              {v.s4.riskHe}
            </span>
            {v.s4.note ? <span className="nu-chip is-sap">{v.s4.note}</span> : null}
          </p>
          <p className="no-stand-w">
            {v.s4.changed ||
              "הפרויקט אינו מחזיק ניסוח מפורש למה שמשתנה בטבלה הזאת ב-S/4HANA. מה שהתכנון כתב מופיע מתחת, כלשונו."}
          </p>
          {v.s4.why ? <p className="no-stand-y">{v.s4.why}</p> : null}
          {v.s4.tcodes.length || v.s4.cds.length ? (
            <dl className="no-kv">
              {v.s4.tcodes.length ? (
                <div>
                  <dt>טרנזקציות לבדיקה</dt>
                  <dd>
                    {v.s4.tcodes.map((c) => (
                      <span key={c} className="nu-chip is-sap">{c}</span>
                    ))}
                  </dd>
                </div>
              ) : null}
              {v.s4.cds.length ? (
                <div>
                  <dt>תצוגות תאימות</dt>
                  <dd>
                    {v.s4.cds.map((c) => (
                      <span key={c} className="nu-chip is-sap">{c}</span>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
          <p className="no-stand-t">
            <BadgeCheck size={12} strokeWidth={1.75} aria-hidden="true" />
            {v.s4.trustHe} · {TRUST_WHY[v.s4.trust]}
          </p>
        </div>

        <h3 className="no-h3">
          <Sigma size={14} strokeWidth={1.75} aria-hidden="true" />
          מה שהתכנון כתב, מילה במילה
        </h3>
        {v.rows.some((r) => r.s4Note || r.s4AltTable || r.s4AltTcode || r.sumNote) ? (
          <div className="no-s4">
            {v.rows.map((r, i) =>
              r.s4Note || r.s4AltTable || r.s4AltTcode || r.sumNote ? (
                <article key={`${r.mod}-${i}`} style={{ "--m": MOD_VAR[r.mod] } as React.CSSProperties}>
                  <header>
                    <span className="no-row-bar" aria-hidden="true" />
                    <b>{MOD_HE[r.mod]}</b>
                    <em>{r.topic}</em>
                  </header>
                  {r.s4Note ? <p className="no-quote">{r.s4Note}</p> : null}
                  <dl className="no-kv">
                    {r.s4AltTable ? (
                      <div>
                        <dt>טבלה / שדה חלופיים</dt>
                        <dd className="nx-sap">{r.s4AltTable}</dd>
                      </div>
                    ) : null}
                    {r.s4AltTcode ? (
                      <div>
                        <dt>טרנזקציה חלופית</dt>
                        <dd className="nx-sap">{r.s4AltTcode}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {r.sumNote ? (
                    <p className="no-sum">
                      <b>SUM</b>
                      {r.sumNote}
                    </p>
                  ) : null}
                </article>
              ) : null,
            )}
          </div>
        ) : (
          <Silent what="הערת מעבר ל־S/4HANA" />
        )}
      </Sec>

      {/* ========================================================== CDS */}
      <Sec
        id="no-cds"
        n={num["no-cds"]}
        icon={<Sigma size={16} strokeWidth={1.75} />}
        eyebrow="תצוגות CDS"
        title="מה קורא את הטבלה ב-S/4HANA"
        lede="מיפוי מתוחזק של טבלה קלאסית לתצוגת CDS משוחררת. תצוגה מופיעה כאן רק כשהטבלה הזאת נמצאת בה, ולצידה שאר הטבלאות שהיא קוראת."
      >
        {v.cds.length ? (
          <ul className="no-cds">
            {v.cds.map((c) => (
              <li key={c.view}>
                <b className="nx-sap">{c.view}</b>
                <em>{c.he}</em>
                <span className="nx-sap no-dim">{c.tables.join(" · ")}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Silent what="תצוגות CDS" />
        )}
        <OriginLink className="nu-link" href="/neo/cds/" origin={from}>
          מרשם ה-CDS של הפרויקט
          <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
        </OriginLink>
      </Sec>

      {/* =================================================== INTERFACES */}
      <Sec
        id="no-if"
        n={num["no-if"]}
        icon={<Cable size={16} strokeWidth={1.75} />}
        eyebrow="ממשקים"
        title={`${v.funcs.length} BAPI · FM · IDoc · ${v.progs.length} תוכניות`}
        lede="השם והתיאור הם של התיעוד, כולל ממשקי Zetes ו-Daymax שהתכנון רשם. עמודת המודול מראה איזה תכנון רשם את האובייקט."
      >
        {v.funcs.length ? (
          <ul className="no-funcs">
            {v.funcs.map((f) => (
              <li key={f.name}>
                <b className="nx-sap">{f.name}</b>
                <em>{f.he || "–"}</em>
                <span className="no-modtag">
                  {f.mods.map((m) => (
                    <b key={m} style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>{m}</b>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <Silent what="אובייקטי ממשק" />
        )}

        <h3 className="no-h3">
          <Terminal size={14} strokeWidth={1.75} aria-hidden="true" />
          תוכניות ודוחות
        </h3>
        {v.progs.length ? (
          <ul className="no-funcs">
            {v.progs.map((p) => (
              <li key={p.name}>
                <b className="nx-sap">{p.name}</b>
                <em>{p.he || "–"}</em>
                <span className="no-modtag">
                  {p.mods.map((m) => (
                    <b key={m} style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>{m}</b>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <Silent what="תוכניות ודוחות" />
        )}
        <p className="no-links">
          <OriginLink className="nu-link" href="/neo/bapi/" origin={from}>
            מרשם ה-BAPI וה-FM
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </OriginLink>
          <OriginLink className="nu-link" href="/neo/idoc/" origin={from}>
            מרשם ה-IDoc
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </OriginLink>
        </p>
      </Sec>

      {/* ================================================ TROUBLESHOOTING */}
      <Sec
        id="no-trb"
        n={num["no-trb"]}
        icon={<AlertTriangle size={16} strokeWidth={1.75} />}
        eyebrow="תקלות"
        title={`${v.incidents.length} תקלות שמפנות לטבלה הזו`}
        lede={
          <>
            מתוך קטלוג התקלות של הפרויקט. נכללות רק תקלות שרושמות במפורש את{" "}
            <span className="nx-sap">{v.name}</span> ברשימת הטבלאות לבדיקה. זו אינה תור תמיכה ואינה
            מערכת חיה.
          </>
        }
      >
        {v.incidents.length ? (
          <>
            <ul className="no-inc">
              {v.incidents.map((i) => (
                <li key={i.slug}>
                  <header>
                    <b>{i.he}</b>
                    <em className="nx-sap">{i.module}</em>
                    {i.impact ? <span className="no-imp">{i.impact}</span> : null}
                  </header>
                  <p>{i.symptom}</p>
                  {i.error ? <code className="no-join">{i.error}</code> : null}
                  <div className="no-inc-g">
                    <div>
                      <h4>סיבות שורש</h4>
                      <ul>{i.rootCauses.map((c) => <li key={c}>{c}</li>)}</ul>
                    </div>
                    <div>
                      <h4>טרנזקציות לניתוח</h4>
                      <ul className="no-inc-tx">{i.analyzeTcodes.map((c) => <li key={c} className="nx-sap">{c}</li>)}</ul>
                    </div>
                    <div>
                      <h4>תיקון</h4>
                      <ul>{i.fix.map((c) => <li key={c}>{c}</li>)}</ul>
                    </div>
                  </div>
                  {i.ecc || i.s4 ? (
                    <dl className="no-kv">
                      {i.ecc ? (<div><dt>ECC</dt><dd>{i.ecc}</dd></div>) : null}
                      {i.s4 ? (<div><dt>S/4HANA</dt><dd>{i.s4}</dd></div>) : null}
                    </dl>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Silent what="תקלות מתועדות" />
        )}
      </Sec>

      {/* ======================================================== BOOKS */}
      <Sec
        id="no-books"
        n={num["no-books"]}
        icon={<Library size={16} strokeWidth={1.75} />}
        eyebrow="ספרייה"
        title="ספרים המכסים את המודול"
        lede={
          <>
            הקישור כאן הוא <b>ברמת המודול</b>. אינדקס הספרייה בפרויקט הוא ברמת פרק, ואין בו מיפוי של
            טבלה לפרק, ולכן לא נטען שספר מסוים מכסה את <span className="nx-sap">{v.name}</span> עצמה.
          </>
        }
      >
        {v.books.length ? (
          <ul className="no-books">
            {v.books.map((b) =>
              b.href ? (
                <li key={b.id}>
                  <Link className="nu-card no-bookcard" href={b.href} prefetch={false}>
                    <b>{b.titleHe}</b>
                    <em className="nx-sap">{b.title}</em>
                    <span className="no-dim">
                      {b.module} · {nf.format(b.chapters)} פרקים · {nf.format(b.pages)} עמודים
                    </span>
                    <ArrowUpLeft className="no-bookarw" size={14} strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </li>
              ) : (
                // No spine on disk for this shelf entry, so no page was
                // generated for it and it is a record, not a link.
                <li key={b.id} className="no-bookflat">
                  <b>{b.titleHe}</b>
                  <em className="nx-sap">{b.title}</em>
                  <span className="no-dim">
                    {b.module} · {nf.format(b.chapters)} פרקים · {nf.format(b.pages)} עמודים
                  </span>
                </li>
              ),
            )}
          </ul>
        ) : (
          <Silent what="ספרים" />
        )}
        <p className="no-links">
          <Link className="nu-btn2" href="/neo/books/" prefetch={false}>
            <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
            הספרייה הדיגיטלית
          </Link>
          <Link className="nu-link" href="/neo/books/" prefetch={false}>
            מדף הספרים של NEO
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </Sec>

      <p className="no-credit nm-fade nm-once">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>
    </div>
  );
}
