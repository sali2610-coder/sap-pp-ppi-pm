/* ============================================================================
   PROJECT NEO · MODULE SECTIONS — the data sections: tables, relationships,
   transactions, BAPI/FM, CDS, Fiori, integration, related objects, ECC↔S/4.
   Server components over section-data.ts. Every value is the dataset's own.
   ========================================================================== */

import Link from "next/link";
import { enLang } from "../lang";
import { s4Dot, type S4Class } from "@/lib/s4-class";
import {
  cdsHref, cdsOf, edgesOf, fioriOf, funcHref, funcsOf, objectHref, relatedOf, s4BucketsOf, sheetOf,
  tableGroups, txHref, txOf, type MsFunc, type MsModule, type S4Row,
} from "./section-data";
import { Code, Codes, Empty, More, Scroll, Sec, Sheet, nf } from "./parts";

const tableCodes = (names: string[]) => <Codes items={names.map((n) => ({ id: n, href: objectHref(n) }))} />;
const Dot = ({ k }: { k: S4Class | null }) => (
  <i className="nms-dot" style={{ "--s": s4Dot(k) } as React.CSSProperties} aria-hidden="true" />
);

/* ------------------------------------------------------------------ tables */

export function TablesBody({ mod }: { mod: MsModule }) {
  const groups = tableGroups(mod.data);
  return (
    <>
      {groups.map((g, i) => (
        <Sec
          key={i}
          id={`nms-tp-${i + 1}`}
          title={<>{g.n ? <span className="nms-ord">{g.n}.</span> : null} {g.t}</>}
          count={g.rows.length}
          unit="טבלאות"
        >
          <Scroll label={`טבלאות · ${g.t}`}>
            <table className="nms-tbl">
              <thead>
                <tr><th scope="col">טבלה</th><th scope="col">תיאור</th><th scope="col">שדות</th><th scope="col">S/4HANA</th></tr>
              </thead>
              <tbody>
                {g.rows.map((r) => (
                  <tr key={r.code}>
                    <th scope="row"><Code id={r.code} href={objectHref(r.code)} /></th>
                    <td lang={enLang(r.he)}>{r.he}</td>
                    <td className="nms-num">{nf.format(r.f)}</td>
                    <td><span className="nms-verdict"><Dot k={r.s4} />{r.word}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Scroll>
        </Sec>
      ))}
    </>
  );
}

/* ----------------------------------------------------------- relationships */

export function RelationshipsBody({ mod }: { mod: MsModule }) {
  const { edges, groups, hubs } = edgesOf(mod.data);
  if (!edges.length) return <Empty text="אין קשרים מתועדים." />;
  const hasCard = edges.some((e) => e.card);
  return (
    <>
      <Sec id="nms-hubs" title="צמתים מרכזיים" count={hubs.length} unit="טבלאות" lede="הטבלאות שהכי הרבה קשרים במודל עוברים דרכן, ומספר הקשרים של כל אחת.">
        <ol className="nms-hubs">
          {hubs.map(([n, d]) => (
            <li key={n}><Code id={n} href={objectHref(n)} /><em>{nf.format(d)} קשרים</em></li>
          ))}
        </ol>
      </Sec>
      <Sec
        id="nms-rel"
        title="הקשרים לפי טבלת המקור"
        count={edges.length}
        unit="קשרים"
        lede={hasCard
          ? "לכל קשר: הטבלה הקשורה, הקרדינליות, התיאור ותנאי ה-JOIN, כפי שהם כתובים בתיעוד."
          : "לכל קשר: הטבלה הקשורה, התיאור ותנאי ה-JOIN, כפי שהם כתובים בתיעוד. התיעוד של המודול אינו מציין קרדינליות לקשרים."}
      >
        {groups.map(([from, es]) => (
          <section key={from} className="nms-grp" aria-labelledby={`nms-r-${from}`}>
            <h3 className="nms-h3" id={`nms-r-${from}`}>
              <Code id={from} href={objectHref(from)} />
              <em>{nf.format(es.length)} קשרים</em>
            </h3>
            <Scroll label={`הקשרים של ${from}`}>
              <table className="nms-tbl">
                <thead>
                  <tr>
                    <th scope="col">טבלה קשורה</th>
                    {hasCard ? <th scope="col">קרדינליות</th> : null}
                    <th scope="col">תיאור</th>
                    <th scope="col">JOIN</th>
                  </tr>
                </thead>
                <tbody>
                  {es.map((e) => (
                    <tr key={e.to}>
                      <th scope="row"><Code id={e.to} href={objectHref(e.to)} /></th>
                      {hasCard ? <td><span className="nx-sap" dir="ltr">{e.card || "–"}</span></td> : null}
                      <td>{e.desc}</td>
                      <td><code className="nms-join" dir="ltr">{e.join}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Scroll>
          </section>
        ))}
      </Sec>
    </>
  );
}

/* ------------------------------------------------------------ transactions */

export function TransactionsBody({ mod }: { mod: MsModule }) {
  const tx = txOf(mod.data);
  const dir = sheetOf(mod.data, "tcodesDir");
  return (
    <>
      <Sec id="nms-tx" title={`T-Codes של ${mod.code}`} count={tx.length} unit="טרנזקציות" lede="כל טרנזקציה שהתיעוד קושר לטבלאות המודול, והטבלאות שהוא ממפה אליה. קוד בלי עמוד מוצג בלי קישור.">
        <Scroll label="טרנזקציות והטבלאות שלהן">
          <table className="nms-tbl nms-tbl--narrow">
            <thead><tr><th scope="col">T-Code</th><th scope="col">טבלאות במודול</th></tr></thead>
            <tbody>
              {tx.map((t) => (
                <tr key={t.code}>
                  <th scope="row"><Code id={t.code} href={txHref(t.code)} /></th>
                  <td>{tableCodes(t.tables)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Scroll>
      </Sec>
      {dir ? (
        <Sec id="nms-txdir" title={dir.title} count={dir.rows.length} unit="שורות" lede="מדריך הטרנזקציות והדוחות מתיעוד המודול, כלשונו: הסבר פונקציונלי, השינוי ב-S/4HANA ויישום ה-Fiori.">
          <More label={`הצגת ${nf.format(dir.rows.length)} השורות`}><Sheet sheet={dir} /></More>
        </Sec>
      ) : null}
    </>
  );
}

/* --------------------------------------------------------------- BAPI / FM */

function FuncTable({ rows, label }: { rows: MsFunc[]; label: string }) {
  return (
    <Scroll label={label}>
      <table className="nms-tbl">
        <thead><tr><th scope="col">אובייקט</th><th scope="col">סוג</th><th scope="col">תיאור</th><th scope="col">טבלאות</th></tr></thead>
        <tbody>
          {rows.map((f) => (
            <tr key={f.name}>
              <th scope="row"><Code id={f.name} href={funcHref(f.name)} /></th>
              <td><span className="nx-sap" dir="ltr">{f.kind}</span></td>
              <td lang={enLang(f.he)}>{f.he}</td>
              <td>{tableCodes(f.tables)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Scroll>
  );
}

export function BapisBody({ mod }: { mod: MsModule }) {
  const f = funcsOf(mod.data, ["BAPI", "FM"]);
  if (!f.length) return <Empty text={`אין בתיעוד BAPI או FM ל-${mod.code}.`} />;
  const linked = f.filter((x) => funcHref(x.name)).length;
  const n = (k: string) => f.filter((x) => x.kind === k).length;
  return (
    <Sec
      id="nms-fn"
      title={`כל ה-BAPI / FM של ${mod.code}`}
      count={f.length}
      unit="אובייקטים"
      lede={
        <>
          {nf.format(n("BAPI"))} BAPI ו-{nf.format(n("FM"))} FM, עם התיאור מהתיעוד והטבלאות שמזכירות כל אחד.{" "}
          {linked === f.length
            ? `${nf.format(f.length)} אובייקטים · סטטוס אימות · תאימות ECC↔S/4 · דף מלא לכל אובייקט.`
            : `${nf.format(linked)} מתוך ${nf.format(f.length)} אובייקטים עם דף מלא: סטטוס אימות · תאימות ECC↔S/4.`}{" "}
          <Link className="nms-inl" href="/neo/bapi/" prefetch={false}>כל ה-BAPI / FM של {mod.code} — במרכז המאוחד</Link>
        </>
      }
    >
      <FuncTable rows={f} label={`BAPI ו-FM של ${mod.code}`} />
    </Sec>
  );
}

/* --------------------------------------------------------------------- CDS */

export function CdsBody({ mod }: { mod: MsModule }) {
  const v = cdsOf(mod.data);
  if (!v.length) return <Empty text="אין CDS Views מאומתות למודול זה עדיין." />;
  return (
    <Sec id="nms-cds" title="תצוגות CDS מעל טבלאות המודול" count={v.length} unit="תצוגות" lede="כל תצוגת CDS שמפת ה-CDS של הפרויקט משייכת לטבלה של המודול, והטבלאות שהיא נשענת עליהן.">
      <Scroll label="תצוגות CDS">
        <table className="nms-tbl">
          <thead><tr><th scope="col">CDS View</th><th scope="col">תיאור</th><th scope="col">טבלאות</th></tr></thead>
          <tbody>
            {v.map((x) => (
              <tr key={x.view}>
                <th scope="row"><Code id={x.view} href={cdsHref(x.view)} /></th>
                <td lang={enLang(x.he)}>{x.he}</td>
                <td>{tableCodes(x.tables)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Scroll>
    </Sec>
  );
}

/* ------------------------------------------------------------------- Fiori */

export function FioriBody({ mod }: { mod: MsModule }) {
  const apps = fioriOf(mod.data);
  if (!apps.length) return <Empty text="אין אפליקציות Fiori מקושרות עדיין." />;
  return (
    <Sec
      id="nms-fiori"
      title="יישומי Fiori של המודול"
      count={apps.length}
      unit="יישומים"
      lede={
        <>
          שם היישום כפי שהתיעוד כותב אותו, כולל הסימון «אמת ID» כשהמזהה לא אומת, והטבלאות שמציינות אותו. יישום
          מקושר לדף שלו רק כשהמזהה או השם תואמים יישום בקטלוג ה-Fiori של הפרויקט.{" "}
          <Link className="nms-inl" href="/neo/fiori-apps/" prefetch={false}>קטלוג יישומי Fiori</Link>
        </>
      }
    >
      <Scroll label="יישומי Fiori">
        <table className="nms-tbl nms-tbl--narrow">
          <thead><tr><th scope="col">יישום</th><th scope="col">טבלאות</th></tr></thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.app}>
                <th scope="row">
                  {a.href ? (
                    <Link className="nms-app" href={a.href} prefetch={false} dir="auto" lang={enLang(a.app)}>{a.app}</Link>
                  ) : (
                    <span className="nms-app" dir="auto" lang={enLang(a.app)}>{a.app}</span>
                  )}
                </th>
                <td>{tableCodes(a.tables)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Scroll>
    </Sec>
  );
}

/* ------------------------------------------------------------- integration */

export function IntegrationBody({ mod }: { mod: MsModule }) {
  const idocs = funcsOf(mod.data, ["IDoc"]);
  const bapis = funcsOf(mod.data, ["BAPI"]);
  return (
    <>
      <Sec id="nms-idoc" title="IDocs" count={idocs.length} unit="סוגי הודעה" lede="סוגי הודעות ה-IDoc שהתיעוד רושם על טבלאות המודול.">
        {idocs.length ? <FuncTable rows={idocs} label="IDocs" /> : <Empty text="אין IDocs מאומתים." />}
      </Sec>
      <Sec
        id="nms-bapi"
        title="BAPIs / FMs"
        count={bapis.length}
        unit="BAPI"
        lede={
          <>
            ממשקי ה-BAPI שהתיעוד רושם על טבלאות המודול.{" "}
            <Link className="nms-inl" href={`${mod.home}bapis/`} prefetch={false}>כל ה-BAPI / FM של {mod.code}</Link>
            {" "}(מסונן ל-{mod.code} · דף מלא לכל אובייקט) ·{" "}
            <Link className="nms-inl" href="/neo/bapi/" prefetch={false}>פתח במרכז ה-BAPI / FM המאוחד</Link>
          </>
        }
      >
        {bapis.length ? <FuncTable rows={bapis} label={`BAPI של ${mod.code}`} /> : <Empty text="אין BAPI מתועדים." />}
      </Sec>
    </>
  );
}

/* ----------------------------------------------------------------- related */

export function RelatedBody({ mod }: { mod: MsModule }) {
  const rel = relatedOf(mod.data);
  if (!rel.length) return <Empty text="אין אובייקטים חוצי-מודול." />;
  return (
    <Sec id="nms-rel-x" title="טבלאות מחוץ למודול" count={rel.length} unit="טבלאות" lede="טבלאות שמפת הקשרים של המודול מגיעה אליהן ואינן מתועדות בו, ותיאור הקשר כפי שנכתב.">
      <Scroll label="אובייקטים קשורים">
        <table className="nms-tbl">
          <thead><tr><th scope="col">טבלה</th><th scope="col">תיאור הקשר</th><th scope="col">מקושרת מ</th></tr></thead>
          <tbody>
            {rel.map((r) => (
              <tr key={r.code}>
                <th scope="row"><Code id={r.code} href={objectHref(r.code)} /></th>
                <td>{r.desc}</td>
                <td>{tableCodes(r.from)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Scroll>
    </Sec>
  );
}

/* ----------------------------------------------------------------- ECC↔S/4 */

function S4Table({ rows, label }: { rows: S4Row[]; label: string }) {
  return (
    <Scroll label={label}>
      <table className="nms-tbl">
        <thead><tr><th scope="col">טבלה</th><th scope="col">תיאור</th><th scope="col">חלופה ב-S/4HANA</th><th scope="col">הערת S/4HANA בתיעוד</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.code}>
              <th scope="row"><Code id={r.code} href={objectHref(r.code)} /></th>
              <td lang={enLang(r.he)}>{r.he}</td>
              <td>{r.alt ? <span className="nms-alt" dir="ltr">→ {r.alt}</span> : "–"}</td>
              <td>{(r.note || "").trim() || "–"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Scroll>
  );
}

export function EccS4Body({ mod }: { mod: MsModule }) {
  const s = s4BucketsOf(mod.data);
  const simpl = sheetOf(mod.data, "simplification");
  const buckets: { id: string; k: S4Class | null; title: string; rows: S4Row[]; fold?: boolean }[] = [
    { id: "replaced", k: 2, title: "הוחלף · טבלה חלופית", rows: s.replaced },
    { id: "removed", k: 3, title: "הוסר / בוטל", rows: s.removed },
    { id: "changed", k: 1, title: "מותאם", rows: s.changed },
    { id: "undecided", k: null, title: "נדרש אימות", rows: s.undecided },
    { id: "kept", k: 0, title: "נשמר ללא שינוי מהותי", rows: s.kept, fold: true },
  ];
  return (
    <>
      {buckets.filter((b) => b.rows.length).map((b) => (
        <Sec
          key={b.id}
          id={`nms-s4-${b.id}`}
          title={<><Dot k={b.k} />{b.title}</>}
          count={b.rows.length}
          unit="טבלאות"
          lede={b.k === null ? "ההכרעה על הטבלאות האלה פתוחה: שכבת הראיות מסמנת אותן \"נדרש אימות\", וסיווג עמודת S/4HANA בתיעוד, כשיש בה סיווג, מופיע לצד הטבלה בעמוד המודול." : undefined}
        >
          {b.fold ? (
            <More label={`הצגת ${nf.format(b.rows.length)} הטבלאות`}><S4Table rows={b.rows} label={b.title} /></More>
          ) : (
            <S4Table rows={b.rows} label={b.title} />
          )}
        </Sec>
      ))}
      {simpl ? (
        <Sec id="nms-simpl" title={simpl.title} count={simpl.rows.length} unit="פריטים" lede="רשימת פריטי ה-Simplification מתיעוד המודול, עם מספרי ה-SAP Notes כפי שנכתבו בו.">
          <Sheet sheet={simpl} />
        </Sec>
      ) : null}
    </>
  );
}
