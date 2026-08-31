"use client";

// Project NEO · NEO ERD — the contextual detail panel.
//
// Split out of erd-workspace.tsx so the engine file is engine only. This panel
// renders VERBATIM dataset content and nothing else: the stated cardinality,
// the relation wording, the JOIN wording where the PM/PP-PI dictionary holds
// one, the primary and foreign key fields, the transactions, the ECC→S/4
// statement. No value here is derived, completed or paraphrased — where the
// dataset is silent the panel says "לא קיים מידע מאומת" in words.
//
// READABILITY IS A REQUIREMENT, NOT A PREFERENCE
//   Nothing critical is set below --t-xs. The panel is 26rem at desktop and
//   30rem above 2000px, and every table that needs more room has an explicit
//   "הרחב לקריאה" that opens the full-width sheet instead of shrinking type.
//
// Every control is a class from app/neo/ui.css. There is no button chrome
// defined for this panel.

import { OriginLink, type OriginArg } from "@/components/neo-shell/nav-context";
import {
  ArrowUpLeft, Crosshair, Expand, Focus, GitBranch, KeyRound, Link2, Terminal,
} from "lucide-react";
import {
  MODULE_ORDER, REL_HE, ZONE_HE, modVar,
  type ErdCatalog, type ErdEdgeOut, type ErdModuleOut, type ErdTable, type ModCode, type RelKind,
} from "./erd-types";

const nf = new Intl.NumberFormat("he-IL");

export interface InspectorProps {
  data: ErdCatalog;
  module: ErdModuleOut | null;
  active: ErdTable | null;
  /** True when the panel is showing a hovered table rather than a selected one. */
  peek: boolean;
  activeEdges: ErdEdgeOut[];
  l1: number;
  l2: number;
  hits: ErdTable[];
  q: string;
  degOf: (n: string) => number;
  onClearQ: () => void;
  onPick: (name: string) => void;
  onCentre: (name: string) => void;
  onOpen: (name: string) => void;
  /** Builds the origin for a link leaving the graph, at click time — the camera
   *  it reads is the one the reader is actually looking at. */
  origin: (name: string) => OriginArg;
  onExpand: (name: string) => void;
  onModule: (code: ModCode) => void;
  selected: string | null;
}

export function ErdInspector({
  data, module: M, active, peek, activeEdges, l1, l2, hits, q, degOf,
  onClearQ, onPick, onCentre, onOpen, origin, onExpand, onModule, selected,
}: InspectorProps) {
  return (
    <aside className="ne-insp" aria-label="פרטים">
      {M ? (
        <div className="ne-find">
          <p className="ne-find-n">
            {nf.format(hits.length)} טבלאות ברשימה
            {q ? (
              <button type="button" className="nu-ghost" onClick={onClearQ}>
                מסונן לפי &quot;{q}&quot; · נקה
              </button>
            ) : null}
          </p>
          <ul className="ne-list">
            {hits.slice(0, 200).map((n) => (
              <li key={n.n}>
                <button
                  type="button"
                  className="nu-ghost ne-row"
                  aria-pressed={selected === n.n}
                  style={{ "--ms": modVar(n.m), "--o": n.o } as React.CSSProperties}
                  onClick={() => onPick(n.n)}
                >
                  <i className="ne-row-bar" aria-hidden="true" />
                  <b className="nx-sap">{n.n}</b>
                  <em>{n.he || n.en || "–"}</em>
                  <span className="nx-sap">{degOf(n.n)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* No aria-live here: the panel is driven by HOVER, and a live region on
          it re-announced the whole panel on every mouse pass over the canvas. */}
      <div className="ne-detail">
        {active ? (
          <>
            <header className="ne-det-h" style={{ "--o": active.o, "--m": modVar(active.m) } as React.CSSProperties}>
              <i aria-hidden="true" />
              <b className="nx-sap">{active.n}</b>
              {peek ? <span className="nu-chip">תצוגה מקדימה</span> : null}
              <p>{active.he || active.en || "המערך אינו מחזיק תיאור לטבלה הזו."}</p>
              {active.he && active.en ? <small>{active.en}</small> : null}
            </header>

            <div className="ne-det-act">
              {active.pg ? (
                <OriginLink
                  className="nu-btn"
                  href={`/neo/object/${active.n}/`}
                  origin={() => origin(active.n)}
                  style={{ "--m": modVar(active.m) } as React.CSSProperties}
                >
                  עמוד האובייקט
                  <ArrowUpLeft size={14} strokeWidth={1.9} aria-hidden="true" className="nu-arw" />
                </OriginLink>
              ) : (
                <button
                  type="button"
                  className="nu-btn"
                  style={{ "--m": modVar(active.m) } as React.CSSProperties}
                  onClick={() => onOpen(active.n)}
                >
                  כרטיס הטבלה
                  <Expand size={14} strokeWidth={1.9} aria-hidden="true" className="nu-arw" />
                </button>
              )}
              <button type="button" className="nu-btn2" onClick={() => onExpand(active.n)}>
                <Expand size={14} strokeWidth={1.8} aria-hidden="true" />
                הרחב לקריאה
              </button>
              <button type="button" className="nu-btn2" onClick={() => onCentre(active.n)}>
                <Crosshair size={14} strokeWidth={1.8} aria-hidden="true" />
                מרכז בתרשים
              </button>
            </div>

            <dl className="ne-det-n">
              <div>
                <dt>קשרים ישירים</dt>
                <dd className="nx-sap">{nf.format(l1)}</dd>
              </div>
              <div>
                <dt>רמה שנייה</dt>
                <dd className="nx-sap">{nf.format(l2)}</dd>
              </div>
              <div>
                <dt>שדות מתועדים</dt>
                <dd className="nx-sap">{nf.format(active.fn)}</dd>
              </div>
            </dl>

            <ul className="ne-det-mods">
              {active.ms.map((m) => (
                <li key={m} style={{ "--m": modVar(m) } as React.CSSProperties}>
                  <i aria-hidden="true" />
                  <button type="button" className="nu-ghost ne-det-modgo" onClick={() => onModule(m)}>
                    {m}
                    {m === active.m ? " · מודול הבית" : ""}
                  </button>
                  <em>{data.modules.find((x) => x.code === m)?.he || ""}</em>
                </li>
              ))}
              <li className="ne-det-cls" style={{ "--o": active.o } as React.CSSProperties}>
                <span aria-hidden="true" />
                {ZONE_HE[active.z] || active.z}
                {active.tp ? ` · ${active.tp}` : ""}
              </li>
            </ul>

            <div className="ne-keys">
              <div>
                <h3>
                  <KeyRound size={13} strokeWidth={2} aria-hidden="true" />
                  מפתח ראשי
                </h3>
                {active.pk.length ? (
                  <ul className="ne-chips">
                    {active.pk.map((f) => (
                      <li key={f} className="nu-chip is-sap" data-k="PK">
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="ne-none">המערך אינו מסמן מפתח ראשי לטבלה הזו.</p>
                )}
              </div>
              <div>
                <h3>
                  <Link2 size={13} strokeWidth={2} aria-hidden="true" />
                  מפתחות זרים
                </h3>
                {active.fk.length ? (
                  <ul className="ne-chips">
                    {active.fk.map((f) => (
                      <li key={f} className="nu-chip is-sap" data-k="FK">
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="ne-none">המערך אינו מסמן מפתח זר לטבלה הזו.</p>
                )}
              </div>
            </div>

            {active.f.length ? (
              <div className="ne-blk">
                <h3>שדות · {nf.format(active.fn)}</h3>
                <table className="ne-fields">
                  <tbody>
                    {active.f.slice(0, 8).map((f) => (
                      <tr key={f[0]} data-k={f[3]}>
                        <td className="nx-sap">{f[0]}</td>
                        <td>{f[2] || f[1] || "–"}</td>
                        <td>{f[3] !== "-" ? <span className="nu-chip" data-k={f[3]}>{f[3]}</span> : null}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* "More" counts against the rows actually shown, not against a
                    fixed 8 — the payload may hold fewer than 8 rows while the
                    documented total (fn) is far larger. */}
                {active.fn > Math.min(8, active.f.length) ? (
                  <button type="button" className="nu-ghost ne-more" onClick={() => onExpand(active.n)}>
                    עוד {nf.format(active.fn - Math.min(8, active.f.length))} שדות: פתח את הכרטיס המלא
                  </button>
                ) : null}
              </div>
            ) : null}

            {active.tc.length ? (
              <div className="ne-blk">
                <h3>
                  <Terminal size={13} strokeWidth={2} aria-hidden="true" />
                  טרנזקציות
                </h3>
                <ul className="ne-chips">
                  {active.tc.map((c) => (
                    <li key={c} className="nu-chip is-sap">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="ne-blk">
              <h3>ECC → S/4HANA</h3>
              {active.s4 ? (
                <>
                  <p className="ne-s4">{active.s4}</p>
                  {active.s4a ? (
                    <p className="ne-s4-alt">
                      אובייקט חלופי: <b className="nx-sap">{active.s4a}</b>
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="ne-none">לא קיים מידע מאומת · דורש אימות במערכת SAP</p>
              )}
            </div>

            <div className="ne-blk">
              <h3>
                <GitBranch size={13} strokeWidth={2} aria-hidden="true" />
                {nf.format(activeEdges.length)} קשרים
              </h3>
              {activeEdges.length ? (
                <ul className="ne-joins">
                  {activeEdges.map((e) => {
                    const other = e.p === active.n ? e.c : e.p;
                    const isParent = e.p === active.n;
                    return (
                      <li key={e.i} data-kind={e.k}>
                        <div className="ne-join-h">
                          <span className="nu-chip">{isParent ? "צד המפתח הראשי" : "צד המפתח הזר"}</span>
                          <button type="button" className="nu-ghost ne-join-go nx-sap" onClick={() => onPick(other)}>
                            {other}
                          </button>
                          <span className="ne-card nx-sap">{e.cd || REL_HE[e.k as RelKind]}</span>
                          {e.x ? <span className="ne-ct">חוצה מודול</span> : null}
                        </div>
                        {e.ds ? <p className="ne-join-d">{e.ds}</p> : null}
                        {e.j.map((j, i) => (
                          <div className="ne-join-s" key={i} style={{ "--m": modVar(j.m) } as React.CSSProperties}>
                            <span className="ne-join-m">
                              <i aria-hidden="true" />
                              {j.m}
                            </span>
                            {j.j ? <code>{j.j}</code> : null}
                            {j.pk || j.fk ? (
                              <span className="ne-join-k">
                                {j.pk ? (
                                  <em>
                                    PK <b className="nx-sap">{j.pk}</b>
                                  </em>
                                ) : null}
                                {j.fk ? (
                                  <em>
                                    FK <b className="nx-sap">{j.fk}</b>
                                  </em>
                                ) : null}
                              </span>
                            ) : null}
                          </div>
                        ))}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="ne-none">
                  אין לטבלה הזו קשר ממודל בתחום התצוגה הנוכחי. היא מתועדת, אך היא עומדת לבדה בתרשים.
                </p>
              )}
            </div>
          </>
        ) : M ? (
          <div className="ne-idle">
            <h2>
              <Focus size={15} strokeWidth={1.75} aria-hidden="true" />
              {M.code} · {M.he}
            </h2>
            {M.purpose ? <p>{M.purpose}</p> : <p className="ne-none">לא קיים מידע מאומת על מטרת המודול.</p>}
            {M.flow.length ? (
              <div className="ne-blk">
                <h3>הזרימה העסקית</h3>
                <ol className="ne-flow">
                  {M.flow.map((s) => (
                    <li key={s.en}>
                      <b>{s.he}</b>
                      <em>{s.en}</em>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
            {M.reports.length ? (
              <div className="ne-blk">
                <h3>דוחות מרכזיים</h3>
                <ul className="ne-chips">
                  {M.reports.map((r) => (
                    <li key={r} className="nu-chip is-sap">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <dl className="ne-facts">
              <div>
                <dt>טבלאות ב-ERD המרכזי</dt>
                <dd className="nx-sap">{nf.format(M.core.length)}</dd>
              </div>
              <div>
                <dt>טבלאות נוספות במילון</dt>
                <dd className="nx-sap">{nf.format(M.more.length)}</dd>
              </div>
              <div>
                <dt>קשרים ב-ERD המרכזי</dt>
                <dd className="nx-sap">{nf.format(M.ec.length)}</dd>
              </div>
              <div>
                <dt>קשרים בכל המודול</dt>
                <dd className="nx-sap">{nf.format(M.es.length)}</dd>
              </div>
              <div>
                <dt>אובייקטים עסקיים</dt>
                <dd className="nx-sap">{nf.format(M.objects.length)}</dd>
              </div>
              <div>
                <dt>נושאים במילון</dt>
                <dd className="nx-sap">{nf.format(M.topics.length)}</dd>
              </div>
            </dl>
            <p className="ne-note">
              רחף כדי להציץ, לחץ כדי לבחור. הטבלה הנבחרת נשארת גלויה ודומיננטית, הקשרים הישירים שלה
              מתחזקים, והשאר נשאר גלוי אך עמום.
            </p>
          </div>
        ) : (
          <div className="ne-idle">
            <h2>
              <Focus size={15} strokeWidth={1.75} aria-hidden="true" />
              מפת המודולים
            </h2>
            <p>
              {nf.format(data.stats.modules)} מודולים עסקיים, {nf.format(data.stats.memberships)} שיוכי
              טבלה ל-ERD ו-{nf.format(data.stats.tables)} טבלאות מובחנות. בחר מודול כדי לפתוח את מודל
              הנתונים שלו: ומשם נושא, אובייקט וטבלה.
            </p>
            <ul className="ne-modlist">
              {MODULE_ORDER.map((code) => {
                const m = data.modules.find((x) => x.code === code);
                if (!m) return null;
                return (
                  <li key={code} style={{ "--ms": modVar(code) } as React.CSSProperties}>
                    <button type="button" className="nu-ghost ne-row" onClick={() => onModule(code)}>
                      <i className="ne-row-bar" aria-hidden="true" />
                      <b className="nx-sap">{code}</b>
                      <em>{m.he}</em>
                      <span className="nx-sap">{m.core.length}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <dl className="ne-facts">
              <div>
                <dt>קשרים ממודלים</dt>
                <dd className="nx-sap">{nf.format(data.stats.edges)}</dd>
              </div>
              <div>
                <dt>עוצמה מצוינת</dt>
                <dd className="nx-sap">{nf.format(data.stats.stated)}</dd>
              </div>
              <div>
                <dt>ללא עוצמה</dt>
                <dd className="nx-sap">{nf.format(data.stats.unstated)}</dd>
              </div>
              <div>
                <dt>קשרים חוצי מודול</dt>
                <dd className="nx-sap">{nf.format(data.stats.cross)}</dd>
              </div>
              <div>
                <dt>טבלאות משותפות</dt>
                <dd className="nx-sap">{nf.format(data.stats.shared)}</dd>
              </div>
              <div>
                <dt>קשרים עם ניסוח JOIN</dt>
                <dd className="nx-sap">{nf.format(data.stats.withJoin)}</dd>
              </div>
              <div>
                <dt>טבלאות עם עמוד אובייקט</dt>
                <dd className="nx-sap">{nf.format(data.stats.pages)}</dd>
              </div>
            </dl>
            <p className="ne-note">
              {nf.format(data.stats.unstated)} מתוך {nf.format(data.stats.edges)} הקשרים נרשמו במערך
              בלי עוצמה. הם מצוירים מקווקו ומסומנים ככאלה: לא הושלמה להם עוצמה שלא נכתבה.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
