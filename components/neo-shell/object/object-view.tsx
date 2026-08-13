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
  AlertTriangle, ArrowUpLeft, BookOpen, Boxes, Cable, Columns3, GitBranch,
  Layers, Library, Route, Sigma, Table2, Terminal, TriangleAlert, Workflow,
} from "lucide-react";
import { ObjectOrbit } from "./object-orbit";
import { objectSummary, relVar, type ObjectView } from "./object-data";

const nf = new Intl.NumberFormat("he-IL");

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };
const MOD_HE: Record<string, string> = { PM: "אחזקת מפעל · PM", "PP-PI": "ייצור תהליכי · PP-PI" };
const REL_HE: Record<string, string> = { "1-1": "1:1", "n-1": "N:1", unstated: "לא מצוין" };

/** The one empty state on the page. It names the dataset that is silent instead
 *  of apologising, so the absence is auditable. */
function Silent({ what }: { what: string }) {
  return <p className="no-silent">המילון של Project NEO אינו מחזיק {what} עבור האובייקט הזה.</p>;
}

function Sec({
  id, icon, eyebrow, title, children,
}: { id: string; icon: React.ReactNode; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="no-sec" id={id} aria-labelledby={`${id}-h`}>
      <header className="no-sec-h">
        <span className="no-sec-ico" aria-hidden="true">{icon}</span>
        <span className="no-eye">{eyebrow}</span>
        <h2 className="no-h2" id={`${id}-h`}>{title}</h2>
      </header>
      {children}
    </section>
  );
}

export function ObjectPage({ v }: { v: ObjectView }) {
  const s = objectSummary(v);
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

  const nav: [string, string][] = [
    ["no-map", "מפת קשרים"],
    ["no-rel", "קשרים ו־JOIN"],
    ["no-fields", "שדות"],
    ["no-tx", "טרנזקציות"],
    ["no-flow", "תהליך"],
    ["no-s4", "ECC ➔ S/4HANA"],
    ["no-if", "ממשקים"],
    ["no-trb", "תקלות"],
    ["no-books", "ספרייה"],
  ];

  return (
    <div className="no" style={{ "--o": v.obj } as React.CSSProperties}>
      {/* ==================================================== IDENTITY */}
      <header className="no-hero">
        <div className="no-hero-copy">
          <p className="no-eye">
            <Link href="/neo/erd/" prefetch={false}>מודל הנתונים</Link>
            <i aria-hidden="true" />
            {v.zoneHe}
            <i aria-hidden="true" />
            טבלת SAP
          </p>

          <h1 className="no-mega">
            <span className="no-cls" aria-hidden="true" />
            <span className="nx-sap">{v.name}</span>
          </h1>

          <p className="no-lede">{v.he || "המילון אינו מחזיק תיאור עברי לטבלה הזו."}</p>
          {v.en ? <p className="no-en nx-sap">{v.en}</p> : null}

          <ul className="no-mods" aria-label="שיוך למודול">
            {v.mods.map((m) => (
              <li key={m} style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>
                <span className="no-mod-bar" aria-hidden="true" />
                <b>{MOD_HE[m]}</b>
                <em>
                  {rowsPerMod.get(m)} {rowsPerMod.get(m) === 1 ? "רשומת מילון" : "רשומות מילון"}
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
              אחת מ־19 הטבלאות ששני התכנונים מתעדים — לכל מודול נושא, טרנזקציות ושדות משלו.
              שני הפרצופים מוצגים כאן זה לצד זה, בלי לאחד אותם לאחד.
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
            <Link className="no-btn no-btn--brand" href={`/neo/erd/#${v.name}`} prefetch={false}>
              <GitBranch size={15} strokeWidth={1.75} aria-hidden="true" />
              הצג במודל הנתונים המלא
            </Link>
            <Link className="no-btn" href="/neo/tables/" prefetch={false}>
              <Table2 size={15} strokeWidth={1.75} aria-hidden="true" />
              מילון הטבלאות
            </Link>
          </div>
        </div>

        <nav className="no-jump" aria-label="ניווט בעמוד">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>
      </header>

      {/* ============================================ DUAL IDENTITY / ROWS */}
      <Sec
        id="no-rows"
        icon={<Boxes size={16} strokeWidth={1.75} />}
        eyebrow={v.rows.length > 1 ? "זהות כפולה" : "רשומת המילון"}
        title={v.rows.length > 1 ? `${v.rows.length} רשומות מילון לאותה טבלה` : "ההקשר העסקי"}
      >
        {v.rows.length > 1 ? (
          <p className="no-note">
            אותה טבלה פיזית, מתועדת יותר מפעם אחת. כל כרטיס הוא שורה אחת בתכנון המקורי,
            עם הנושא, הטרנזקציות וההערות שלה — כפי שנכתבו, בלי מיזוג.
          </p>
        ) : null}
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
                  <dd className="nx-sap">{r.tcodesRaw || "—"}</dd>
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
        icon={<Workflow size={16} strokeWidth={1.75} />}
        eyebrow="מפת קשרים"
        title="האובייקט במרכז, והקשרים שסביבו"
      >
        {v.neighbours.length ? (
          <ObjectOrbit
            name={v.name}
            he={v.he}
            obj={v.obj}
            mods={v.mods}
            neighbours={v.neighbours}
            total={v.total}
            rank={v.rank}
          />
        ) : (
          <Silent what="קשרי ER ממודלים" />
        )}
      </Sec>

      {/* ============================================== RELATIONS + JOINS */}
      <Sec
        id="no-rel"
        icon={<GitBranch size={16} strokeWidth={1.75} />}
        eyebrow="קשרים"
        title={`${s.neighbours} קשרים ממודלים · ${s.joins} ניסוחי JOIN`}
      >
        {v.neighbours.length ? (
          <>
            <p className="no-note">
              כיוון הקשר נקרא מתוך המילון: <b>בן</b> הוא טבלה שנושאת מפתח זר אל {v.name},
              ו<b>אב</b> הוא טבלה ש־{v.name} מפנה אליה. עוצמת הקשר מוצגת כפי שנכתבה —
              וכאשר לא נכתבה, כתוב שלא נכתבה.
            </p>
            {s.contested ? (
              <p className="no-warn">
                <TriangleAlert size={14} strokeWidth={1.75} aria-hidden="true" />
                {s.contested === 1 ? "טבלה אחת מופיעה" : `${s.contested} טבלאות מופיעות`} כאן פעמיים,
                כבן וכאב. זו אינה כפילות: שני התכנונים רושמים את אותו קשר בכיוונים הפוכים, וכל אחד
                מציב צד אחר כבעל המפתח הראשי. שתי הרשומות נשמרות — הכרעה ביניהן תהיה המצאה.
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
                    <Link className="nx-sap" href={`/neo/object/${n.name}/`} prefetch={false}>{n.name}</Link>
                    <em>{n.he || "—"}</em>
                  </span>
                  <span className="no-rel-card">
                    <i aria-hidden="true" />
                    {n.card || REL_HE[n.kind]}
                  </span>
                  <span className="no-rel-mods">
                    {n.edgeMods.map((m) => (
                      <b key={m} style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>{m}</b>
                    ))}
                  </span>
                  <span className="no-rel-joins">
                    {n.joins.map((j, i) =>
                      j.join ? (
                        <code className="no-join" key={i}>{j.join}</code>
                      ) : (
                        <span className="no-none" key={i}>{j.mod}: אין ניסוח JOIN במילון</span>
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

        {v.dangling.length ? (
          <div className="no-dangle">
            <h3 className="no-h3">
              <TriangleAlert size={14} strokeWidth={1.75} aria-hidden="true" />
              {v.dangling.length} קשרים אל טבלאות שאינן במילון
            </h3>
            <p className="no-note">
              התכנון המקורי רושם את הקשרים האלה, אך את הטבלה שבצד השני הוא אינו מתעד.
              הם מופיעים כאן כרשומה, ולא מצוירים במפה — קצה שלא נבדק לא יצויר כאילו נבדק.
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
        icon={<Columns3 size={16} strokeWidth={1.75} />}
        eyebrow="שדות"
        title={`${v.fields.length} שדות · ${v.pk.length} מפתח ראשי · ${v.fk.length} מפתח זר`}
      >
        {v.fields.length ? (
          <div className="no-tw">
            <table className="no-table">
              <caption className="no-cap">
                איחוד השדות שכל תכנון מתעד לטבלה. עמודת המודול מראה מי תיעד את השדה —
                שדה שתועד במודול אחד בלבד נשמר ומסומן ככזה.
              </caption>
              <thead>
                <tr>
                  <th scope="col">שדה</th>
                  <th scope="col">תיאור</th>
                  <th scope="col">EN</th>
                  <th scope="col">טיפוס</th>
                  <th scope="col">אורך</th>
                  <th scope="col">מפתח</th>
                  <th scope="col">מודול</th>
                </tr>
              </thead>
              <tbody>
                {v.fields.map((f) => (
                  <tr key={f.tech} data-key={f.key === "PK" || f.key === "FK" ? f.key : ""}>
                    <th scope="row" className="nx-sap">{f.tech}</th>
                    <td>{f.he || "—"}</td>
                    <td className="nx-sap no-dim">{f.en || "—"}</td>
                    <td className="nx-sap">{f.dt || "—"}</td>
                    <td className="nx-sap">{f.len || "—"}</td>
                    <td>
                      {f.key === "PK" || f.key === "FK" ? (
                        <span className="no-key" data-k={f.key}>{f.key}</span>
                      ) : (
                        <span className="no-dim">—</span>
                      )}
                    </td>
                    <td>
                      <span className="no-rel-mods">
                        {f.mods.map((m) => (
                          <b key={m} style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>{m}</b>
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Silent what="שדות" />
        )}
      </Sec>

      {/* ================================================== TRANSACTIONS */}
      <Sec
        id="no-tx"
        icon={<Terminal size={16} strokeWidth={1.75} />}
        eyebrow="טרנזקציות"
        title="הטרנזקציות שהמילון קושר לטבלה"
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
        icon={<Route size={16} strokeWidth={1.75} />}
        eyebrow="תהליך עסקי"
        title="היכן האובייקט יושב בשרשרת"
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
                    {!st.exists ? <span className="no-none">מחוץ למילון של המודול</span> : null}
                  </li>
                ))}
              </ol>
            </div>
          ))
        ) : (
          <Silent what="מיקום בשרשרת התהליך" />
        )}
      </Sec>

      {/* ================================================ ECC ➔ S/4HANA */}
      <Sec
        id="no-s4"
        icon={<Sigma size={16} strokeWidth={1.75} />}
        eyebrow="ECC ➔ S/4HANA"
        title="מה התכנון אומר על המעבר"
      >
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

        <h3 className="no-h3">
          <Sigma size={14} strokeWidth={1.75} aria-hidden="true" />
          תצוגות CDS מעל הטבלה
        </h3>
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
      </Sec>

      {/* =================================================== INTERFACES */}
      <Sec
        id="no-if"
        icon={<Cable size={16} strokeWidth={1.75} />}
        eyebrow="ממשקים"
        title={`${v.funcs.length} BAPI · FM · IDoc · ${v.progs.length} תוכניות`}
      >
        {v.funcs.length ? (
          <ul className="no-funcs">
            {v.funcs.map((f) => (
              <li key={f.name}>
                <b className="nx-sap">{f.name}</b>
                <em>{f.he || "—"}</em>
                <span className="no-rel-mods">
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
                <em>{p.he || "—"}</em>
                <span className="no-rel-mods">
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
      </Sec>

      {/* ================================================ TROUBLESHOOTING */}
      <Sec
        id="no-trb"
        icon={<AlertTriangle size={16} strokeWidth={1.75} />}
        eyebrow="תקלות"
        title={`${v.incidents.length} תקלות שמפנות לטבלה הזו`}
      >
        {v.incidents.length ? (
          <>
            <p className="no-note">
              מתוך קטלוג התקלות של הפרויקט — נכללות רק תקלות שרושמות במפורש את{" "}
              <span className="nx-sap">{v.name}</span> ברשימת הטבלאות לבדיקה.
            </p>
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
        icon={<Library size={16} strokeWidth={1.75} />}
        eyebrow="ספרייה"
        title="ספרים המכסים את המודול"
      >
        <p className="no-note">
          <BookOpen size={13} strokeWidth={1.75} aria-hidden="true" />
          הקישור כאן הוא <b>ברמת המודול</b>. אינדקס הספרייה בפרויקט הוא ברמת פרק, ואין בו
          מיפוי של טבלה לפרק — לכן לא נטען שספר מסוים מכסה את {v.name} עצמה.
        </p>
        {v.books.length ? (
          <ul className="no-books">
            {v.books.map((b) => (
              <li key={b.id}>
                <b>{b.titleHe}</b>
                <em className="nx-sap">{b.title}</em>
                <span className="no-dim">
                  {b.module} · {nf.format(b.chapters)} פרקים · {nf.format(b.pages)} עמודים
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <Silent what="ספרים" />
        )}
        <Link className="no-btn" href="/neo/library/" prefetch={false}>
          <Library size={15} strokeWidth={1.75} aria-hidden="true" />
          הספרייה הדיגיטלית
          <ArrowUpLeft size={13} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </Sec>

      <p className="no-credit">Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding</p>
    </div>
  );
}
