"use client";

// Project NEO · the working table. The centre of gravity of both workspaces.
//
// A real <table>: the data is tabular, the header is sortable, and screen
// readers get row/column semantics instead of a wall of divs. On a narrow
// canvas the same markup RECOMPOSES into touch cards through CSS alone (the
// column labels travel in `data-l`), so the phone gets its own composition
// rather than a squeezed desktop grid.
//
// TWO CONTROLS PER ROW, and they no longer look alike:
//   · the table NAME is a .nu-link — it leaves for the real object page at
//     /neo/object/<NAME>/, which app/neo/object/[name] generates from the same
//     dictionary these rows come from. It also pushes the name onto the
//     product's real recents list on the way out, so the "recent activity"
//     block below the table keeps working exactly as it did when the row
//     opened a shelf instead of a page.
//   · the expander is a .nu-ghost — a tertiary action that stays on the page
//     and opens this row's own documentation.
// Nothing else in a row is clickable, which is the whole point.

import { Fragment, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { OriginLink } from "@/components/neo-shell/nav-context";
import { pushRecentObject } from "../store";
import type { S4Class, WsRow, WsTopic } from "./workspace-data";
import { useWsOrigin } from "./workspace-origin";

const nf = new Intl.NumberFormat("he-IL");

/** S/4HANA verdict labels. The colour for these is a STATUS colour, so it may
 *  only ever appear as a small filled dot immediately followed by this word. */
export const S4_HE: Record<S4Class, string> = { 0: "נשמר", 1: "הוחלף", 2: "הוסר" };

export type SortKey = "f" | "n" | "tp" | "rel" | "tc" | "fn";

const COLS: { k: SortKey | null; he: string; cls: string }[] = [
  { k: "n", he: "טבלה", cls: "nw-c-n" },
  { k: null, he: "תיאור", cls: "nw-c-he" },
  { k: "tp", he: "נושא", cls: "nw-c-tp" },
  { k: "f", he: "שדות", cls: "nw-c-f" },
  { k: "tc", he: "T-Codes", cls: "nw-c-tc" },
  { k: "fn", he: "ממשקים", cls: "nw-c-fn" },
  { k: "rel", he: "קשרים", cls: "nw-c-rel" },
  { k: null, he: "CDS · Fiori", cls: "nw-c-cv" },
  { k: null, he: "S/4HANA", cls: "nw-c-s4" },
];

export function WorkspaceTable({
  rows,
  topics,
  total,
  onClear,
  sort,
  dir,
  onSort,
}: {
  rows: WsRow[];
  topics: WsTopic[];
  total: number;
  onClear: () => void;
  sort: SortKey;
  dir: 1 | -1;
  onSort: (k: SortKey) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const title = new Map(topics.map((t) => [t.idx, t.title]));
  // Where this table is leaving FROM, built at click time by the workspace.
  const origin = useWsOrigin();

  if (!rows.length) {
    return (
      <div className="nw-empty">
        <p>אף שורה במילון של המודול אינה עונה על הסינון הנוכחי.</p>
        <p className="nw-fine">
          המילון מחזיק {nf.format(total)} שורות. הסינון מצמצם; הוא אינו מסתיר חוסר בנתונים.
        </p>
        <button type="button" className="nu-btn2" onClick={onClear}>
          נקה סינון
        </button>
      </div>
    );
  }

  return (
    <div className="nw-tblwrap">
      <table className="nw-tbl">
        <caption className="nw-sr">
          טבלת העבודה של המודול · {nf.format(rows.length)} שורות מתוך {nf.format(total)}
        </caption>
        <thead>
          <tr>
            {COLS.map((c) => (
              <th
                key={c.he}
                scope="col"
                className={c.cls}
                aria-sort={c.k && sort === c.k ? (dir === -1 ? "descending" : "ascending") : undefined}
              >
                {c.k ? (
                  <button
                    type="button"
                    className="nu-ghost nw-sortbtn"
                    onClick={() => onSort(c.k as SortKey)}
                    data-on={sort === c.k ? "1" : undefined}
                  >
                    {c.he}
                    <em className="nw-sap" aria-hidden="true">
                      {sort === c.k ? (dir === -1 ? "↓" : "↑") : "·"}
                    </em>
                  </button>
                ) : (
                  c.he
                )}
              </th>
            ))}
            <th scope="col" className="nw-c-x">
              <span className="nw-sr">פירוט</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const id = `${r.tp}:${r.n}`;
            const isOpen = open === id;
            return (
              <Fragment key={id}>
                <tr
                  className="nw-row"
                  // The record a return scrolls back to. A row that re-rendered
                  // at a different density has moved every pixel; this has not.
                  data-name={r.n}
                  data-open={isOpen ? "1" : undefined}
                  style={{ "--o": r.obj } as React.CSSProperties}
                >
                  <td className="nw-c-n" data-l="טבלה">
                    <OriginLink
                      className="nu-link nw-name"
                      href={r.href}
                      origin={() => origin(r.n)}
                      onClick={() => pushRecentObject(r.n)}
                    >
                      {/* OBJECT-class hue — the data's own encoding, never the module hue. */}
                      <i className="nw-cls" aria-hidden="true" />
                      <b className="nw-sap">{r.n}</b>
                      <ArrowLeft className="nu-arw" size={13} strokeWidth={2} aria-hidden="true" />
                    </OriginLink>
                    {r.shared ? <span className="nu-chip">משותפת</span> : null}
                  </td>

                  <td className="nw-c-he" data-l="תיאור">
                    <span>{r.he || "–"}</span>
                  </td>

                  <td className="nw-c-tp" data-l="נושא">
                    <span className="nw-sap">{String(r.tp).padStart(2, "0")}</span>
                    <span className="nw-tp-t">{title.get(r.tp) || ""}</span>
                  </td>

                  <td className="nw-c-f" data-l="שדות">
                    <b className="nw-sap">{r.f}</b>
                    {r.pk || r.fk ? (
                      <em className="nw-sap">
                        {r.pk ? `${r.pk} PK` : ""}
                        {r.pk && r.fk ? " · " : ""}
                        {r.fk ? `${r.fk} FK` : ""}
                      </em>
                    ) : null}
                  </td>

                  <td className="nw-c-tc" data-l="T-Codes">
                    {r.tc.length ? (
                      <>
                        {r.tc.slice(0, 2).map((c) => (
                          <span key={c} className="nu-chip is-sap">{c}</span>
                        ))}
                        {r.tc.length > 2 ? <em className="nw-sap">+{r.tc.length - 2}</em> : null}
                      </>
                    ) : (
                      <span className="nw-none">–</span>
                    )}
                  </td>

                  <td className="nw-c-fn" data-l="ממשקים">
                    {r.fnEntries ? <b className="nw-sap">{r.fnEntries}</b> : <span className="nw-none">–</span>}
                  </td>

                  <td className="nw-c-rel" data-l="קשרים">
                    {r.rel ? <b className="nw-sap">{r.rel}</b> : <span className="nw-none">–</span>}
                  </td>

                  <td className="nw-c-cv" data-l="CDS · Fiori">
                    <span className="nw-sap">{r.cds || "–"}</span>
                    <em>{r.fiori ? "Fiori" : "–"}</em>
                  </td>

                  <td className="nw-c-s4" data-l="S/4HANA">
                    {/* STATUS colour: a small filled dot, immediately followed by its
                        word. It is never a surface, a ring, a line or text colour. */}
                    <span className="nu-status" style={{ "--s": s4Dot(r.s4) } as React.CSSProperties}>
                      {S4_HE[r.s4]}
                    </span>
                  </td>

                  <td className="nw-c-x">
                    <button
                      type="button"
                      className="nu-ghost nw-x"
                      aria-expanded={isOpen}
                      aria-controls={`nw-d-${r.tp}-${r.n}`}
                      onClick={() => setOpen((c) => (c === id ? null : id))}
                    >
                      <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
                      <span className="nw-sr">
                        {isOpen ? "סגירת הפירוט של" : "פתיחת הפירוט של"} {r.n}
                      </span>
                    </button>
                  </td>
                </tr>

                {isOpen ? (
                  <tr className="nw-detrow">
                    <td colSpan={COLS.length + 1}>
                      <div className="nw-det" id={`nw-d-${r.tp}-${r.n}`} style={{ "--o": r.obj } as React.CSSProperties}>
                        <section>
                          <h3>שדות מפתח</h3>
                          {r.keys.length ? (
                            <ul className="nw-keys">
                              {r.keys.map((f) => (
                                <li key={f.tech}>
                                  <span className="nw-kb" data-k={/PK/i.test(f.key) ? "pk" : "fk"}>{f.key}</span>
                                  <b className="nw-sap">{f.tech}</b>
                                  <span>{f.he}</span>
                                  <em className="nw-sap">{[f.dt, f.len].filter(Boolean).join(" ") || ""}</em>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="nw-fine">
                              המילון אינו מסמן שדה מפתח לשורה הזאת. {r.f} שדות מתועדים בסך הכול.
                            </p>
                          )}
                        </section>

                        <section>
                          <h3>קשרים ממודלים</h3>
                          {r.rels.length ? (
                            <ul className="nw-joins">
                              {r.rels.map((rel) => (
                                <li key={`${rel.table}-${rel.join}`}>
                                  {/* A link only when the far end is a table the
                                      dictionary documents; otherwise plain text. */}
                                  {rel.href ? (
                                    <OriginLink
                                      className="nu-link"
                                      href={rel.href}
                                      origin={() => origin(rel.table)}
                                      onClick={() => pushRecentObject(rel.table)}
                                    >
                                      <b className="nw-sap">{rel.table}</b>
                                      <ArrowLeft className="nu-arw" size={12} strokeWidth={2} aria-hidden="true" />
                                    </OriginLink>
                                  ) : (
                                    <b className="nw-sap">{rel.table}</b>
                                  )}
                                  <span className="nu-chip is-sap">{rel.card || "ללא ציון"}</span>
                                  {rel.inside ? null : <span className="nw-out">מחוץ למילון המודול</span>}
                                  <span className="nw-join-d">{rel.desc}</span>
                                  <code className="nw-sap">{rel.join}</code>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="nw-fine">המילון אינו מחזיק קשר ER לשורה הזאת.</p>
                          )}
                        </section>

                        <section>
                          <h3>ממשקים</h3>
                          {r.funcs.length ? (
                            <ul className="nw-fns">
                              {r.funcs.map((f) => (
                                <li key={f.n}>
                                  <span className="nw-kind nw-sap">{f.k}</span>
                                  <b className="nw-sap">{f.n}</b>
                                  <span>{f.he}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="nw-fine">אין רשומת ממשק לשורה הזאת.</p>
                          )}
                          {r.tc.length > 2 ? (
                            <p className="nw-alltc">
                              כל הטרנזקציות:{" "}
                              {r.tc.map((c) => (
                                <span key={c} className="nu-chip is-sap">{c}</span>
                              ))}
                            </p>
                          ) : null}
                        </section>

                        <section>
                          <h3>ECC ↔ S/4HANA</h3>
                          <p className="nw-s4note">{r.s4Note || "המילון אינו מחזיק הערת S/4HANA לשורה הזאת."}</p>
                          {r.s4Alt ? (
                            <p className="nw-fine">
                              חלופה כפי שהמילון מנסח אותה: <span className="nw-sap">{r.s4Alt}</span>
                            </p>
                          ) : null}
                          {r.sum ? <p className="nw-fine">SUM · {r.sum}</p> : null}
                          {r.fiori ? (
                            <p className="nw-fine">
                              Fiori: <span className="nw-sap">{r.fiori}</span>
                            </p>
                          ) : null}
                          <OriginLink
                            className="nu-btn2 nw-detgo"
                            href={r.href}
                            origin={() => origin(r.n)}
                            onClick={() => pushRecentObject(r.n)}
                          >
                            עמוד האובייקט המלא של <span className="nw-sap">{r.n}</span>
                            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
                          </OriginLink>
                        </section>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** The STATUS token for a verdict. Fed to .nu-status, which is the only shape
 *  a status colour is allowed to take: a small filled dot plus its word. */
export const s4Dot = (k: S4Class) =>
  k === 0 ? "var(--status-done)" : k === 1 ? "var(--status-in-conversion)" : "var(--status-not-started)";
