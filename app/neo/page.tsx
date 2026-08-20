import Link from "next/link";
import {
  ArrowDown, ArrowUpLeft, Award, BookOpen, GitBranch, LayoutGrid,
  Search, Table, Terminal, Waypoints,
} from "lucide-react";
// The interaction system first, the page's own sheet second: Home never invents
// a control style, it consumes .nu-* and only overrides layout around them.
import "./ui.css";
import "./home.css";
import { homeData, zoneVar, type HomeData } from "@/components/neo-shell/home/home-data";
import { HomeScene, type SceneSection } from "@/components/neo-shell/home/home-scene";
import { HomeZones } from "@/components/neo-shell/home/home-zones";
import { HomeNet } from "@/components/neo-shell/home/home-net";

export const metadata = {
  title: "Project NEO · מפת הידע של SAP",
  robots: { index: false, follow: false },
};

const nf = new Intl.NumberFormat("he-IL");
const pct = (a: number, b: number) => Math.round((a / b) * 100);

// THE SIGNATURE HOME — an entrance, not a dashboard.
//
// Everything on this page is rendered on the SERVER from the project dataset via
// components/neo-shell/home/home-data.ts. Not a single count, name, note or JOIN
// below is authored here: where the dictionary holds nothing, the page says so.
//
// THE COMPOSITION, AND WHY IT IS BUILT THIS WAY
//
//   The previous Home made an animated dot field the meaning of the hero, and
//   ran it from a scroll listener. Both are gone. What carries the page now is
//   the GROUND: six chapters, each wearing one of the five scenes declared in
//   app/neo/ground.css, descending from a warm dark opening into two working
//   module grounds and closing dark again.
//
//     01  deep   the gate. Warm dark in both themes, the one cinematic moment.
//     02  base   the working ground. Coverage, measured honestly.
//     03  cream  paper. A pinned map holds while three panels pass it.
//     04  pm     PM identity carried by the ground itself.
//     05  pppi   PP-PI identity carried by the ground itself.
//     06  deep   the close, bookending the gate.
//
//   The dictionary is still the texture of the hero, but it is now the TABLE
//   NAMES themselves — three parallax columns holding all 105 real merged table
//   names. It is unreadable as prose and completely legible as a claim: this is
//   what the product knows. The dots survive as one honest diagram in 03, where
//   they are a lattice of three membership bands rather than a decoration.
//
//   Every reveal, parallax, pin, stagger and bar growth below is a class from
//   app/neo/motion.css and therefore a CSS scroll-driven animation on the
//   compositor. There is no scroll handler anywhere on this page.

/** The chapter ledge. Every section but the last ends with one, naming the
 *  scene the reader is about to descend into, in the counts that change is made
 *  of. The page states its choreography in motion AND in words, and both are
 *  generated from the same numbers, so they cannot drift apart. */
function Ledge({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <p className="nh-next nm-fade">
      <ArrowDown size={14} strokeWidth={1.75} aria-hidden="true" />
      <span className="nh-next-to">{to}</span>
      <span className="nh-next-t">{children}</span>
    </p>
  );
}

/** Split a list into n roughly equal slices, in order. Used only for the three
 *  parallax columns of the name wall, so the wall is deterministic and the same
 *  table never appears twice. */
function slices<T>(list: T[], n: number): T[][] {
  const size = Math.ceil(list.length / n);
  return Array.from({ length: n }, (_, i) => list.slice(i * size, (i + 1) * size));
}

/* -------------------------------------------------------------------------- */
/*  04 / 05 — the two module chapters. One component, two scenes: the ONLY      */
/*  difference between them is the ground and the data, which is exactly what   */
/*  "module identity is carried by the ground" has to mean to be true.          */
/* -------------------------------------------------------------------------- */

function ModuleChapter({
  d, i, scene, id, next, ledge,
}: {
  d: HomeData;
  i: 0 | 1;
  /* The soft tints are what /neo/pm/ and /neo/pp-pi/ wear: those pages are
     STUDIED, and a saturated ground would fight the content. Home is looked at
     rather than worked in, so it takes the full-strength variants. Both are
     allowed here so one component serves both jobs. */
  scene: "pm" | "pppi" | "pm-full" | "pppi-full";
  id: string;
  next: string;
  ledge: React.ReactNode;
}) {
  const mo = d.modules[i];
  const flow = d.flows.find((f) => f.key === mo.key)!;
  const topics = d.density
    .map((t, gi) => [t, gi] as const)
    .filter(([t]) => t.key === mo.key);
  const maxT = Math.max(...topics.map(([t]) => t.tables));
  const live = flow.steps.filter((s) => s.exists).length;

  return (
    <section
      className="nh-sec"
      data-scene={scene}
      id={id}
      data-hsec
      aria-labelledby={`${id}-h`}
      style={{ "--m": mo.m } as React.CSSProperties}
    >
     <div className="nh-body nm-scene">
      {/* SPLIT EDITORIAL, not another centred stack.
          Every scene on this page was head + paragraph + one wide metrics box,
          which is the formula the review rejected. The module scenes are a two
          column composition instead: the editorial column reads, and beside it
          the module's OWN tables are lit inside the whole 105-table field.

          That makes the lede's closing claim — "this module touches N% of the
          merged tables" — something you can see rather than something you are
          told. The tables it does not document stay drawn and recede, because
          they are the context that gives the percentage meaning. */}
      <div className="nh-in nh-split">
       <div className="nh-split-t">
        <div className="nh-head">
          <p className="nh-eye nm-fade">
            <span className="nh-sap">{mo.code}</span>
            <i aria-hidden="true" />
            {mo.he}
          </p>
          <h2 className="nh-h2 nm-kin" id={`${id}-h`}>
            <span><span>{mo.en}</span></span>
            <span><span className="nh-dim">{nf.format(mo.tables)} טבלאות · {nf.format(mo.fields)} שדות</span></span>
          </h2>
          <p className="nh-lede nm-rise">
            {mo.topics} נושאים במילון של המודול הזה, {nf.format(mo.tcodes)} טרנזקציות,{" "}
            {nf.format(mo.funcs)} פונקציות BAPI · FM · IDoc ו־{nf.format(mo.cds)} תצוגות CDS.
            המודול נוגע ב־{pct(mo.tables, d.tables)}% מ־{nf.format(d.tables)} הטבלאות המאוחדות.
          </p>
        </div>

       </div>

       <div className="nh-split-v nm-rise">
         <HomeNet
           dots={d.dots}
           edges={d.edges}
           focus={i === 0 ? ([0, 1] as const) : ([1, 2] as const)}
         />
         <p className="nh-split-cap">
           {nf.format(mo.tables)} מתוך {nf.format(d.tables)} הטבלאות המאוחדות, מוארות בשדה
           המלא. הטבלאות הכהות הן אלה שהמודול השני מתעד.
         </p>
       </div>
      </div>

      <div className="nh-in">
        <Link
          href={mo.href}
          prefetch={false}
          className="nh-mod nm-rise nm-lift"
          aria-label={`כניסה לסביבת ${mo.code} · ${mo.he}`}
        >
          <span className="nh-mod-top">
            <b className="nh-sap">{mo.code}</b>
            <span className="nh-mod-he">{mo.he}</span>
            <ArrowUpLeft size={17} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="nh-mod-nums">
            <span><b className="nh-sap">{nf.format(mo.tables)}</b><em>טבלאות</em></span>
            <span><b className="nh-sap">{nf.format(mo.fields)}</b><em>שדות</em></span>
            <span><b className="nh-sap">{mo.topics}</b><em>נושאים</em></span>
            <span><b className="nh-sap">{nf.format(mo.tcodes)}</b><em>טרנזקציות</em></span>
            <span><b className="nh-sap">{nf.format(mo.funcs)}</b><em>פונקציות</em></span>
            <span><b className="nh-sap">{nf.format(mo.fiori)}</b><em>אפליקציות Fiori</em></span>
          </span>
          <span className="nh-mod-share">
            <span className="nh-bar" aria-hidden="true">
              <i className="nm-grow" style={{ "--p": mo.share } as React.CSSProperties} />
            </span>
            <em className="nh-sap">{pct(mo.tables, d.tables)}%</em>
            <span>מתוך {nf.format(d.tables)} הטבלאות המאוחדות</span>
          </span>
        </Link>

        <div className="nh-two">
          <div className="nh-blk nm-rise">
            <h3 className="nh-h3">
              צפיפות לפי נושא
              <em>{mo.topics} נושאים · הסולם הוא {d.maxTopicTables} טבלאות, הנושא העמוס ביותר במילון</em>
            </h3>
            <ul className="nh-topics nm-seq">
              {topics.map(([t]) => (
                <li key={`${t.key}-${t.idx}`} className="nm-rise">
                  <span className="nh-topics-i nh-sap">{String(t.idx).padStart(2, "0")}</span>
                  <span className="nh-topics-t">{t.title}</span>
                  <span className="nh-bar" aria-hidden="true">
                    <i className="nm-grow" style={{ "--p": t.tables / d.maxTopicTables } as React.CSSProperties} />
                  </span>
                  <span className="nh-topics-n nh-sap">{t.tables}</span>
                </li>
              ))}
            </ul>
            <p className="nh-note">
              הנושא הגדול כאן מחזיק {maxT} טבלאות. אין נירמול שמשטח את ההבדל בין נושא לנושא.
            </p>
          </div>

          <div className="nh-blk nm-rise">
            <h3 className="nh-h3">
              השרשרת כפי שהיא יושבת במסד הנתונים
              <em>
                {flow.direct} מעברים ישירים · {flow.via} דרך טבלת ביניים ·{" "}
                {flow.hops - flow.direct - flow.via} גבולות תהליך שאינם ממודלים
              </em>
            </h3>
            <ol className="nh-chain nm-seq">
              {flow.steps.map((s, k) => (
                <li key={s.code} className="nm-rise">
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
                  {k < flow.steps.length - 1 && (
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
            <p className="nh-note">
              {live} מתוך {flow.steps.length} שלבי התהליך יושבים על טבלה שהמילון של{" "}
              <span className="nh-sap">{mo.code}</span> מתעד. במקום שבו אין קשר שמור, לא מצויר חץ
              ולא מומצא מפתח.
            </p>
          </div>
        </div>

        <Ledge to={next}>{ledge}</Ledge>
      </div>
     </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export default function NeoHome() {
  const d = homeData();

  const sections: SceneSection[] = [
    { id: "nh-1", label: "הפתיחה", field: "רקע כהה" },
    { id: "nh-2", label: "כיסוי", field: "רקע עבודה" },
    { id: "nh-3", label: "המפה", field: "נייר" },
    { id: "nh-4", label: "PM", field: "גוון המודול" },
    { id: "nh-5", label: "PP-PI", field: "גוון המודול" },
    { id: "nh-6", label: "S/4HANA", field: "רקע כהה" },
    { id: "nh-7", label: "הספרייה", field: "עור חם" },
    { id: "nh-8", label: "NEO AI", field: "אינדיגו" },
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

  // The three membership bands of the lattice in 03. Real counts, and they add
  // up to the 105 by construction rather than by assertion.
  const bands = ([0, 1, 2] as const).map((b) => ({
    b,
    dots: d.dots.filter((x) => x.b === b),
  }));
  const bandCopy = [
    { t: `${pm.code} בלבד`, s: "טבלאות שרק מילון אחזקת המפעל מתעד" },
    { t: "ליבה משותפת", s: "אותה טבלה, שני הקשרים, שורה אחת במיזוג" },
    { t: `${pp.code} בלבד`, s: "טבלאות שרק מילון הייצור התהליכי מתעד" },
  ];
  /* The axis is one image to a screen reader, so it states the whole partition
     rather than leaving three unlabelled segments. */
  const memLabel =
    `חלוקת ${nf.format(d.tables)} הטבלאות המאוחדות: ` +
    bands.map(({ b, dots }) => `${dots.length} ${bandCopy[b].t}`).join(", ");

  return (
    <HomeScene sections={sections}>
      {/* ============================================================ 01 · deep
          THE GATE. The one cinematic moment the ground system allows, and it is
          spent on arrival. Behind the headline stand all 105 real merged table
          names in three parallax columns: the texture of this page is the
          dictionary itself, at last. */}
      <section
        className="nh-sec"
        data-scene="deep"
        id="nh-1"
        data-hsec
        aria-labelledby="nh-1-h"
      >
       {/* SCENE ON AN INNER ELEMENT, ON PURPOSE.
           ground.css declares base/pm/pppi as `--scene-raised: var(--surface)`
           while .nm-scene declares `--surface: var(--scene-raised)`. Put both on
           ONE element and the two custom properties reference each other, the
           cycle makes them invalid at computed-value time, and every raised
           surface and hairline inside that scene silently loses its colour.
           Splitting them — the section names the scene, the child wears it —
           breaks the cycle: the section resolves --scene-* against the shell's
           tokens, and the child rebinds the product tokens from those. Same
           system, same five scenes, one element apart. */}
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
        {/* THE MIDDLE PLANE.
            The gate had two planes: the name wall behind, the type in front.
            Two planes is a backdrop; three is depth. This is the same
            architecture field the map scene draws, at the same coordinates,
            run in faint mode and drifting at its own rate — so between the
            names and the headline there are now actual SAP objects and the
            relationships between them.

            The ORYZO lesson taken literally: the ground stays one constant
            warm dark, and depth comes from content sitting at different
            distances rather than from painting sections different colours. */}
        <div className="nh-mid nm-par" aria-hidden="true">
          <HomeNet dots={d.dots} edges={d.edges} faint />
        </div>
        <span className="nh-glow" aria-hidden="true" />

        <div className="nh-in nh-gate-in">
          <p className="nh-eye nh-eye--gate">
            CBC ISRAEL · PROJECT NEO
            <i aria-hidden="true" />
            מפת הידע
          </p>
          <h1 className="nh-mega nm-kin" id="nh-1-h">
            <span><span>מילון SAP אחד</span></span>
            <span><span>לכל מסע ה־<span className="nh-sap">S/4HANA</span></span></span>
          </h1>
          <p className="nh-lede nh-lede--gate">
            {nf.format(d.tables)} טבלאות אמיתיות, {nf.format(d.fields)} שדות מתועדים,{" "}
            {nf.format(d.tcodes)} טרנזקציות ו־{nf.format(d.relations)} קשרי ER. הכול במקום אחד
            שעובד גם בלי רשת. כל שם שברקע הוא טבלה אחת מתוך המילון, ולא קישוט.
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
            <Link className="nu-btn" href="/neo/tables/" prefetch={false}>
              <Search size={15} strokeWidth={1.75} aria-hidden="true" />
              פתח את מילון הטבלאות
            </Link>
            <Link className="nu-btn2" href="/neo/erd/" prefetch={false}>
              <GitBranch size={15} strokeWidth={1.75} aria-hidden="true" />
              מודל הנתונים
            </Link>
            <Link className="nu-btn2" href="/neo/transactions/" prefetch={false}>
              <Terminal size={15} strokeWidth={1.75} aria-hidden="true" />
              מרשם הטרנזקציות
            </Link>
          </div>
          <ul className="nh-legend" aria-label="מקרא צבע · מחלקת אובייקט">
            {d.zones.map((z) => (
              <li key={z.id} style={{ "--o": zoneVar(z.id) } as React.CSSProperties}>
                <i aria-hidden="true" />
                {z.he}
                <em className="nh-sap">{z.n}</em>
              </li>
            ))}
          </ul>
        </div>

        <Ledge to="כיסוי">
          הרקע מתבהר. אותן {nf.format(d.tables)} טבלאות נמדדות מול שישה צירי תיעוד,
          כולל השניים שיוצאים נמוך.
        </Ledge>
       </div>
      </section>

      {/* =========================================================== 02 · base
          The focus shift out of the dark: the working ground, and the first
          thing the product does on it is admit what it does not have. */}
      <section
        className="nh-sec"
        data-scene="s4"
        id="nh-2"
        data-hsec
        aria-labelledby="nh-2-h"
      >
       <div className="nh-body nm-scene">
        <div className="nh-in">
          <div className="nh-head">
            <p className="nh-eye nm-fade">כיסוי<i aria-hidden="true" />מה באמת מתועד</p>
            <h2 className="nh-h2 nm-kin" id="nh-2-h">
              <span><span>{nf.format(d.tables)} טבלאות.</span></span>
              <span><span className="nh-dim">לא כולן מתועדות באותו עומק.</span></span>
            </h2>
            <p className="nh-lede nm-rise">
              שישה צירי תיעוד, נמדדים על אותן {nf.format(d.tables)} טבלאות מאוחדות.
              שניים מהם יוצאים נמוך, וזה בדיוק העניין: המספר מוצג כפי שהוא, ולא נבחרים
              הצירים המחמיאים.
            </p>
          </div>

          <ul className="nh-cov nm-seq">
            {d.coverage.map((c) => (
              // The two axes the lede admits come out low are marked so the eye
              // finds them first. The cut is presentational emphasis, not a
              // claim: the number beside it is always the raw count.
              <li key={c.he} className="nm-rise" data-low={c.n / d.tables < 0.75 ? "1" : undefined}>
                <span className="nh-cov-l">{c.he}</span>
                <span className="nh-bar" aria-hidden="true">
                  <i className="nm-grow" style={{ "--p": c.n / d.tables } as React.CSSProperties} />
                </span>
                <span className="nh-cov-n nh-sap">{c.n}<em>/{d.tables}</em></span>
                <span className="nh-cov-s">{c.note}</span>
              </li>
            ))}
          </ul>

          <p className="nh-note nm-fade">
            המילון מחזיק {nf.format(d.dictRows)} שורות על פני {nf.format(d.tables)} טבלאות
            ייחודיות. ההפרש איננו טעות: {d.shared} טבלאות מתועדות פעמיים, כי הן באמת חיות
            בשני המודולים.
          </p>

          <Ledge to="המפה">
            הרקע נעשה נייר. {nf.format(d.tables)} הטבלאות נפרשות למפה אחת שנעצרת במקום,
            בזמן שהקריאה עוברת עליה.
          </Ledge>
        </div>
       </div>
      </section>

      {/* ========================================================== 03 · cream
          THE PINNED MAP. The lattice holds still while three panels pass it, so
          the reader studies one object through three claims instead of three
          drawings. Every dot is one real merged table: its colour is the object
          class, its size is the number of fields the dictionary holds for it. */}
      <section
        className="nh-sec"
        data-scene="shared"
        id="nh-3"
        data-hsec
        aria-labelledby="nh-3-h"
      >
       <div className="nh-body nm-scene">
        <div className="nh-in">
          <div className="nh-head">
            <p className="nh-eye nm-fade">מפת המודולים<i aria-hidden="true" />חפיפה בין שני המילונים</p>
            {/* Was "19 טבלאות חיות בשני העולמות בבת אחת". Tables do not live in
                worlds; they are documented by two dictionaries. Same fact, said
                the way an SAP platform says it. */}
            <h2 className="nh-h2 nm-kin" id="nh-3-h">
              <span><span><span className="nh-accent">{d.shared} טבלאות ליבה</span></span></span>
              <span><span>משותפות ל-{pm.code} ול-{pp.code}</span></span>
            </h2>
          </div>
        </div>

        <div className="nh-stage">
          <div className="nh-hold nm-pin">
            {/* THE MEMBERSHIP AXIS.
                This used to be 105 coloured dots, and the review is right that
                rows of circles are not the identity of an SAP platform. The
                COUNTS are the useful part, so they stay exactly as they are and
                are read from the same data as before.

                What changed is the form. The 105 merged tables are a partition,
                so they are drawn as one continuous axis cut into three real
                segments whose widths ARE the counts. The middle segment is the
                shared core, and it is styled as a bridge carrying both module
                hues at once, because that is literally what it is: the tables
                both dictionaries document.

                It is not a Venn, deliberately. A Venn would imply an
                intersection area the data does not measure. A partitioned axis
                claims only what is true — 37 + 19 + 49 = 105. */}
            {/* THE ARCHITECTURE FIELD.
                This was three proportional bars. The counts were honest, but a
                bar chart is not architecture, and this is the most important
                visual on the product's most important page.

                It is drawn now as what it is: two fields of real tables with
                the shared core standing between them, and the dictionary's own
                ER relationships running through it. Node = one table, radius =
                its documented field count, colour = its band, line = one
                modelled pair. The counts stay, underneath, as a legend rather
                than as the picture. */}
            {/* THE THREE POPULATIONS, AS NAMED TABLES.
                The dot field is gone. It was honest and unreadable: learning
                "37" meant counting circles, and the strongest impression the
                page gave was that the product is about dots.

                Same partition, same numbers, drawn as the objects a consultant
                recognises — real table names, the dictionary's own Hebrew, the
                documented field count, the functional class as a colour. The
                count is now TYPE, so it is read rather than tallied, and the
                tables that do not fit are counted out loud instead of being
                quietly dropped. */}
            <div className="nh-mem" role="group" aria-label={memLabel}>
              <HomeZones dots={d.dots} show={7} />
            </div>
            <p className="nh-lat-k">
              כל כרטיס הוא טבלה מהמילון: השם כפי שהוא ב-SAP, התיאור כפי שהמילון מנסח אותו,
              ומספר השדות המתועדים לה. הצבע הוא מחלקת האובייקט. המילון מחזיק
              {" "}{nf.format(d.relations)} קשרי ER בין הטבלאות האלה.
            </p>
          </div>

          {/* The per-band panels that used to sit here printed 37 / 19 / 49 and
              their descriptions a second time. Now that each zone states its
              own count, name, sample and remainder, repeating it was just
              filling the scene twice. The one fact the panels carried that the
              zones do not — why 56 + 68 is not 105 — moves to the line below,
              where it belongs. */}
          <p className="nh-lat-k nh-lat-wide">
            {nf.format(pm.tables)} + {nf.format(pp.tables)} = {nf.format(pm.tables + pp.tables)} שורות מודול,
            אבל רק {nf.format(d.tables)} טבלאות, כי {d.shared} מהן נספרות פעמיים.
          </p>
        </div>

        <div className="nh-in">
          <h3 className="nh-h3 nm-rise">
            {d.shared} המשותפות, עם הנושא שממנו כל מודול מגיע אליהן
            <em>ממוינות לפי עומק התיעוד, מהעמוקה ביותר</em>
          </h3>
          <div className="nh-shared nm-seq">
            {d.sharedRows.map((r) => (
              <article
                key={r.n}
                className="nh-scard nm-rise nm-lift"
                style={{ "--o": zoneVar(r.z) } as React.CSSProperties}
              >
                <header>
                  <i className="nh-cls" aria-hidden="true" />
                  <b className="nh-sap">{r.n}</b>
                  <span className="nh-scard-f nh-sap">{r.f}</span>
                </header>
                <p className="nh-scard-he">{r.he}</p>
                <dl className="nh-scard-ctx">
                  <div style={{ "--m": pm.m } as React.CSSProperties}>
                    <dt className="nh-sap">PM</dt><dd>{r.pm || "אין נושא רשום"}</dd>
                  </div>
                  <div style={{ "--m": pp.m } as React.CSSProperties}>
                    <dt className="nh-sap">PP-PI</dt><dd>{r.pp || "אין נושא רשום"}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <Ledge to={pm.code}>
            הרקע מקבל את גוון המודול. מכאן ואילך הקרקע עצמה אומרת באיזה עולם אתם עומדים.
          </Ledge>
        </div>
       </div>
      </section>

      {/* ============================================================= 04 · pm */}
      <ModuleChapter
        d={d}
        i={0}
        scene="pm-full"
        id="nh-4"
        next={pp.code}
        ledge={<>הקרקע מחליפה גוון. אותו מבנה בדיוק, {nf.format(pp.tables)} טבלאות ו־{pp.topics} נושאים.</>}
      />

      {/* =========================================================== 05 · pppi */}
      <ModuleChapter
        d={d}
        i={1}
        scene="pppi-full"
        id="nh-5"
        next="S/4HANA"
        ledge={<>הרקע חוזר להיות כהה. {d.migration.replaced} הטבלאות שהמילון מסמן כמוחלפות נשלפות החוצה.</>}
      />

      {/* =========================================================== 06 · deep
          The close bookends the gate: the page ends on the same warm dark it
          opened on, so the descent reads as one journey with a floor. */}
      <section
        className="nh-sec"
        data-scene="deep"
        id="nh-6"
        data-hsec
        aria-labelledby="nh-6-h"
      >
       <div className="nh-body nh-close nm-scene">
        <span className="nh-glow" aria-hidden="true" />
        <div className="nh-in">
          <div className="nh-head">
            <p className="nh-eye nm-fade">
              <span className="nh-sap">ECC → S/4HANA</span><i aria-hidden="true" />תמונת המעבר
            </p>
            <h2 className="nh-h2 nm-kin" id="nh-6-h">
              <span><span>{nf.format(d.tables)} טבלאות,</span></span>
              <span><span className="nh-accent">{d.migration.replaced} מהן לא יעברו בשקט</span></span>
            </h2>
            <p className="nh-lede nm-rise">
              הסיווג מגיע מאותה פונקציה שממנה נבנה עמוד ה־ECC ↔ S/4HANA של כל מודול.
              כל {nf.format(d.dictRows)} שורות המילון נושאות הערת S/4HANA; רק{" "}
              {d.migration.replaced} מהטבלאות מסומנות כמוחלפות.
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
                {/* STATUS colour appears here in the one form the design system
                    allows it: a small filled dot immediately followed by its
                    word. The card itself and its bar stay neutral. */}
                <span className="nh-impcol-k"><i aria-hidden="true" />{im.he}</span>
                <b className="nh-sap">{im.n}</b>
                <span className="nh-bar" aria-hidden="true">
                  <i className="nm-grow" style={{ "--p": im.n / d.tables } as React.CSSProperties} />
                </span>
                <span className="nh-impcol-p nh-sap">{pct(im.n, d.tables)}%</span>
              </div>
            ))}
          </div>

          {d.migrationRows.length > 0 ? (
            <ul className="nh-hot nm-seq">
              {d.migrationRows.map((r) => (
                <li key={r.n} className="nm-rise" style={{ "--o": zoneVar(r.z) } as React.CSSProperties}>
                  <i className="nh-cls" aria-hidden="true" />
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
            <p className="nh-note nm-fade">אין במילון שורה המסומנת כמוחלפת או כמוסרת.</p>
          )}

          <p className="nh-note nm-fade">
            {d.migration.removed === 0
              ? "אף טבלה במילון אינה מסומנת כמוסרת ב-S/4HANA. הרצועה הזאת ריקה במכוון, והיא לא הוסתרה."
              : `${d.migration.removed} טבלאות מסומנות כמוסרות.`}
          </p>

          <div className="nh-out nm-rise">
            <p className="nh-out-t">
              {nf.format(d.migration.kept)} הטבלאות שנשמרות כפי שהן מפסיקות כאן להיות רקע.
              אלה הדלתות אל אותו מידע בדיוק, בסביבת העבודה.
            </p>
            <div className="nh-cta">
              <Link className="nu-btn2" href="/neo/pm/" prefetch={false} style={{ "--m": pm.m } as React.CSSProperties}>
                <Waypoints size={15} strokeWidth={1.75} aria-hidden="true" />
                סביבת <span className="nh-sap">PM</span>
              </Link>
              <Link className="nu-btn2" href="/neo/pp-pi/" prefetch={false} style={{ "--m": pp.m } as React.CSSProperties}>
                <Waypoints size={15} strokeWidth={1.75} aria-hidden="true" />
                סביבת <span className="nh-sap">PP-PI</span>
              </Link>
              <Link className="nu-btn" href="/neo/tables/" prefetch={false}>
                <Table size={15} strokeWidth={1.75} aria-hidden="true" />
                מילון הטבלאות
              </Link>
              <Link className="nu-btn2" href="/neo/library/" prefetch={false}>
                <LayoutGrid size={15} strokeWidth={1.75} aria-hidden="true" />
                ספרייה · {nf.format(d.books)} ספרים
              </Link>
              <Link className="nu-btn2" href="/neo/academy/" prefetch={false}>
                <Award size={15} strokeWidth={1.75} aria-hidden="true" />
                אקדמיה
                <ArrowUpLeft size={14} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
       </div>
      </section>

      {/* ============================================================ 07 · books
          THE LIBRARY. A warm editorial breath after the S/4HANA statement, and
          the only scene on the page whose subject is not a table. The shelf is
          the product's other half, so the narrative has to stop here before it
          can end at NEO. */}
      <section className="nh-sec" data-scene="books" id="nh-7" data-hsec aria-labelledby="nh-7-h">
       <div className="nh-body nm-scene">
        <div className="nh-in nh-split">
         <div className="nh-split-t">
          <div className="nh-head">
            <p className="nh-eye nm-fade">הספרייה<i aria-hidden="true" />SAP PRESS</p>
            <h2 className="nh-h2 nm-kin" id="nh-7-h">
              <span><span>{nf.format(d.books)} ספרים טכניים</span></span>
              <span><span className="nh-dim">{nf.format(d.bookPages)} עמודים, {nf.format(d.bookChapters)} פרקים</span></span>
            </h2>
            <p className="nh-lede nm-rise">
              המילון עונה מה קיים במערכת. הספרייה עונה למה. אותם {nf.format(d.books)} ספרים
              נקראים במעטפת NEO עצמה, עם ניווט פרקים ותצוגה דו-לשונית, והם גם מקור התשובות
              של מומחה הספרים.
            </p>
          </div>
          <div className="nh-cta nm-rise">
            <Link className="nu-btn" href="/neo/books/" prefetch={false}>
              <LayoutGrid size={15} strokeWidth={1.75} aria-hidden="true" />
              אל הספרייה
            </Link>
            <Link className="nu-btn2" href="/neo/ai/" prefetch={false}>
              <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
              שאל את הספרייה
              <ArrowUpLeft size={14} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
         </div>
         <div className="nh-split-v nm-rise">
           <ul className="nh-spines" aria-hidden="true">
             {Array.from({ length: d.books }).map((_, k) => (
               <li key={k} style={{ "--i": k } as React.CSSProperties} />
             ))}
           </ul>
           <p className="nh-split-cap">
             שדרה אחת לכל ספר בספרייה. הצבע הוא הבד שבו הספר כרוך במדף.
           </p>
         </div>
        </div>
       </div>
      </section>

      {/* ============================================================== 08 · ai
          THE CLOSE. Everything above converges here: the dictionary, the two
          modules, the migration and the shelf are all things NEO answers from.
          It returns to dark, as the brief asks, but to the assistant's own
          indigo rather than to the gate's brown, so the page ends somewhere
          rather than looping. */}
      <section className="nh-sec" data-scene="ai" id="nh-8" data-hsec aria-labelledby="nh-8-h">
       <div className="nh-body nm-scene">
        <div className="nh-in">
          <div className="nh-head">
            <p className="nh-eye nm-fade">NEO AI<i aria-hidden="true" />שתי סביבות מענה</p>
            <h2 className="nh-h2 nm-kin" id="nh-8-h">
              <span><span>כל מה שלמעלה,</span></span>
              <span><span className="nh-accent">נשאל בשאלה אחת</span></span>
            </h2>
            <p className="nh-lede nm-rise">
              מומחה הספרים עונה מתוך {nf.format(d.books)} הספרים ומצרף מקורות. צ׳אט NEO הכללי
              עונה על SAP רחב יותר, ומצהיר במפורש כשאין לו מקור בפרויקט. שתי הסביבות לא
              ממציאות תשובה כשאין להן מקור.
            </p>
          </div>
          <div className="nh-cta nm-rise">
            <Link className="nu-btn" href="/neo/ai/" prefetch={false}>
              <BookOpen size={15} strokeWidth={1.75} aria-hidden="true" />
              שאל את הספרייה
            </Link>
            <Link className="nu-btn2" href="/neo/chat/" prefetch={false}>
              צ׳אט NEO כללי
              <ArrowUpLeft size={14} strokeWidth={1.75} aria-hidden="true" />
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
