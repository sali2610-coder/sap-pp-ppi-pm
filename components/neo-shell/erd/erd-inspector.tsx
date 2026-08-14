"use client";

// Project NEO · NEO ERD — the inspector.
//
// Split out of erd-workspace.tsx so the engine file is engine only. This panel
// renders VERBATIM dictionary content and nothing else: the JOIN wording, the
// stated cardinality, the primary and foreign key fields, the transactions. No
// value here is derived, completed or paraphrased — where the blueprint is
// silent the panel says so in words.
//
// Every control is a class from app/neo/ui.css. There is no button chrome
// defined for this panel.

import Link from "next/link";
import { ArrowUpLeft, Crosshair, Focus, GitBranch, KeyRound, Link2 } from "lucide-react";
import type { ErdPayload, ErdPayloadEdge, ErdPayloadNode } from "./erd-data";

type ModuleKey = "PM" | "PP-PI";

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };
const MOD_HE: Record<string, string> = { PM: "אחזקת מפעל · PM", "PP-PI": "ייצור תהליכי · PP-PI" };
const REL_HE: Record<string, string> = { "1-1": "1:1", "n-1": "N:1", unstated: "עוצמה לא מצוינת" };

const nf = new Intl.NumberFormat("he-IL");

export interface InspectorProps {
  data: ErdPayload;
  active: ErdPayloadNode | null;
  /** True when the panel is showing a hovered table rather than a selected one. */
  peek: boolean;
  activeEdges: ErdPayloadEdge[];
  l1: number;
  l2: number;
  hits: ErdPayloadNode[];
  /** The live search term, owned by the toolbar. Shown here so the list never
   *  looks arbitrarily short without saying why. */
  q: string;
  onClearQ: () => void;
  onPick: (name: string) => void;
  onCentre: (name: string) => void;
  selected: string | null;
}

export function ErdInspector({
  data,
  active,
  peek,
  activeEdges,
  l1,
  l2,
  hits,
  q,
  onClearQ,
  onPick,
  onCentre,
  selected,
}: InspectorProps) {
  return (
    <aside className="ne-insp" aria-label="פרטי הטבלה">
      <div className="ne-find">
        <p className="ne-find-n">
          {nf.format(hits.length)} טבלאות ברשימה
          {q ? (
            <button type="button" className="nu-ghost" onClick={onClearQ}>
              מסונן לפי “{q}” · נקה
            </button>
          ) : null}
        </p>
        <ul className="ne-list">
          {hits.slice(0, 160).map((n) => (
            <li key={n.n}>
              <button
                type="button"
                className="nu-ghost ne-row"
                aria-pressed={selected === n.n}
                style={
                  {
                    "--m": n.b === 1 ? "var(--mod-pm)" : MOD_VAR[n.m[0]],
                    "--ms": n.b === 1 ? "var(--mod-pm)" : MOD_VAR[n.m[0]],
                    "--o": n.o,
                  } as React.CSSProperties
                }
                onClick={() => onPick(n.n)}
              >
                <i className="ne-row-bar" aria-hidden="true" />
                <b className="nx-sap">{n.n}</b>
                <em>{n.he || "—"}</em>
                <span className="nx-sap">{n.d}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="ne-detail" aria-live="polite">
        {active ? (
          <>
            <header className="ne-det-h" style={{ "--o": active.o } as React.CSSProperties}>
              <i aria-hidden="true" />
              <b className="nx-sap">{active.n}</b>
              {peek ? <span className="nu-chip">תצוגה מקדימה</span> : null}
              <p>{active.he || "המילון אינו מחזיק תיאור עברי."}</p>
            </header>

            <div className="ne-det-act">
              <Link
                className="nu-btn"
                href={`/neo/object/${active.n}/`}
                prefetch={false}
                style={{ "--m": MOD_VAR[active.m[0]] } as React.CSSProperties}
              >
                עמוד האובייקט
                <ArrowUpLeft size={14} strokeWidth={1.9} aria-hidden="true" className="nu-arw" />
              </Link>
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
                <dd className="nx-sap">{nf.format(active.f)}</dd>
              </div>
            </dl>

            <ul className="ne-det-mods">
              {active.m.map((m) => (
                <li key={m} style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>
                  <i aria-hidden="true" />
                  <b>{MOD_HE[m]}</b>
                  <em>{active.tp.filter((t) => t.m === m).map((t) => t.t).join(" · ") || "—"}</em>
                </li>
              ))}
              <li className="ne-det-cls" style={{ "--o": active.o } as React.CSSProperties}>
                <span aria-hidden="true" />
                {active.z}
              </li>
            </ul>

            <div className="ne-keys">
              <div>
                <h3>
                  <KeyRound size={12} strokeWidth={2} aria-hidden="true" />
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
                  <p className="ne-none">המילון אינו מסמן מפתח ראשי לטבלה הזו.</p>
                )}
              </div>
              <div>
                <h3>
                  <Link2 size={12} strokeWidth={2} aria-hidden="true" />
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
                  <p className="ne-none">המילון אינו מסמן מפתח זר לטבלה הזו.</p>
                )}
              </div>
            </div>

            {active.tc.length ? (
              <div className="ne-blk">
                <h3>טרנזקציות</h3>
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
              <h3>
                <GitBranch size={12} strokeWidth={2} aria-hidden="true" />
                {activeEdges.length} קשרים · ניסוח ה־JOIN כפי שנכתב
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
                          <span className="ne-card nx-sap">{e.cd || REL_HE[e.k]}</span>
                          {e.ct ? <span className="ne-ct">כיוון שנוי במחלוקת</span> : null}
                        </div>
                        {e.j.map((j, i) => (
                          <div className="ne-join-s" key={i} style={{ "--m": MOD_VAR[j.m as ModuleKey] } as React.CSSProperties}>
                            <span className="ne-join-m">
                              <i aria-hidden="true" />
                              {j.m}
                            </span>
                            {j.j ? <code>{j.j}</code> : <span className="ne-none">אין ניסוח JOIN במילון</span>}
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
                            {j.d ? <span className="ne-join-d">{j.d}</span> : null}
                          </div>
                        ))}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="ne-none">
                  המילון אינו מחזיק קשר ER ממודל לטבלה הזו. היא מתועדת, אך היא עומדת לבדה בתרשים.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="ne-idle">
            <h2>
              <Focus size={15} strokeWidth={1.75} aria-hidden="true" />
              בחר טבלה בתרשים
            </h2>
            <p>
              רחף כדי להציץ, לחץ כדי לבחור. הטבלה הנבחרת הופכת לדומיננטית, הקשרים הישירים שלה
              מתחזקים, והשאר נשאר גלוי אך עמום — עד שתפעיל מצב מיקוד.
            </p>
            <dl className="ne-facts">
              <div>
                <dt>טבלאות</dt>
                <dd className="nx-sap">{nf.format(data.stats.tables)}</dd>
              </div>
              <div>
                <dt>רשומות מילון</dt>
                <dd className="nx-sap">{nf.format(data.stats.rows)}</dd>
              </div>
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
                <dt>ללא קשר ממודל</dt>
                <dd className="nx-sap">{nf.format(data.stats.isolated)}</dd>
              </div>
              <div>
                <dt>כיוון שנוי במחלוקת</dt>
                <dd className="nx-sap">{nf.format(data.stats.contested)}</dd>
              </div>
            </dl>
            <p className="ne-note">
              {nf.format(data.stats.unstated)} מתוך {nf.format(data.stats.edges)} הקשרים נרשמו בתכנון
              בלי עוצמה. הם מצוירים מקווקו ומסומנים ככאלה — לא הושלמה להם עוצמה שלא נכתבה.
              {data.stats.contested
                ? ` בנוסף, ${nf.format(data.stats.contested)} זוגות טבלאות נרשמו בשני הכיוונים: שני התכנונים חלוקים על צד המפתח הראשי, ושתי הרשומות נשמרות.`
                : ""}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
