"use client";

// Project NEO · NEO ERD — the full table card.
//
// TWO JOBS, ONE SURFACE
//   1. "הרחב לקריאה" — the side panel is 26rem, and a 16-row field list with a
//      verbatim S/4 statement does not belong at that width. This is where the
//      whole record is readable at body size.
//   2. The fallback destination. 105 of the documented tables have a generated
//      /neo/object/<NAME>/ page; the rest do not. A node for one of those opens
//      THIS instead of pointing at a URL that was never built.
//
// Everything below is verbatim dataset content. Where the dataset is silent the
// card says "לא קיים מידע מאומת" rather than filling the gap.

import { useEffect, useRef } from "react";
import { OriginLink, type OriginArg } from "@/components/neo-shell/nav-context";
import { ArrowUpLeft, X } from "lucide-react";
import {
  REL_HE, ZONE_HE, modVar,
  type ErdEdgeOut, type ErdTable, type RelKind,
} from "./erd-types";

const nf = new Intl.NumberFormat("he-IL");

export function ErdSheet({
  t,
  edges,
  tByName,
  onClose,
  onGo,
  origin,
}: {
  t: ErdTable;
  edges: ErdEdgeOut[];
  tByName: Map<string, ErdTable>;
  onClose: () => void;
  onGo: (n: string) => void;
  /** Builds the origin for the link out of the card, at click time. */
  origin: (name: string) => OriginArg;
}) {
  const parents = edges.filter((e) => e.c === t.n);
  const children = edges.filter((e) => e.p === t.n);

  /* Dialog contract, same as the books quick-view: focus moves INTO the card
     when it opens and Tab wraps inside it. Escape stays with the workspace's
     own ladder, which already closes the sheet — a second handler here would
     double-step it. */
  const cardRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    cardRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = cardRef.current;
      if (!root) return;
      const items = [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")]
        .filter((el) => el.tabIndex !== -1 && el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const at = document.activeElement;
      if (!e.shiftKey && at === last) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && (at === first || !root.contains(at))) { e.preventDefault(); last.focus(); }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, []);

  return (
    /* The scrim closes on the PRESS that starts on it — a text selection that
       begins inside the card and ends over the scrim used to fire a click on
       the wrapper and dismiss the sheet mid-read. */
    <div
      className="ne-sheet"
      role="dialog"
      aria-modal="true"
      aria-label={`כרטיס הטבלה ${t.n}`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="ne-card2 nu-card"
        ref={cardRef}
        tabIndex={-1}
        style={{ "--m": modVar(t.m), "--o": t.o } as React.CSSProperties}
      >
        <header className="ne-c2-h">
          <span className="ne-c2-bar" aria-hidden="true" />
          <div className="ne-c2-id">
            <b className="nx-sap">{t.n}</b>
            <span className="nu-chip">{t.m}</span>
            <span className="nu-chip">{ZONE_HE[t.z] || t.z}</span>
            {t.ms.length > 1 ? <span className="nu-chip">משותפת · {t.ms.join(" · ")}</span> : null}
          </div>
          <p>{t.he || t.en || "לא קיים תיעוד מאומת במאגר"}</p>
          {t.he && t.en ? <small>{t.en}</small> : null}
          <div className="ne-c2-act">
            {t.pg ? (
              <OriginLink className="nu-btn" href={`/neo/object/${t.n}/`} origin={() => origin(t.n)}>
                פתיחת עמוד האובייקט
                <ArrowUpLeft size={14} strokeWidth={1.9} aria-hidden="true" className="nu-arw" />
              </OriginLink>
            ) : (
              <span className="ne-c2-nopage">לטבלה זו אין עמוד אובייקט. כרטיס זה מציג את הרשומה המלאה.</span>
            )}
            <button type="button" className="nu-ghost ne-c2-x" onClick={onClose} aria-label="סגירה">
              <X size={17} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="ne-c2-body">
          <section>
            <h3>שדות · {nf.format(t.fn)}</h3>
            {t.f.length ? (
              <table className="ne-fields ne-fields-big">
                <thead>
                  <tr>
                    <th>שדה</th>
                    <th>תיאור</th>
                    <th>מפתח</th>
                  </tr>
                </thead>
                <tbody>
                  {t.f.map((f) => (
                    <tr key={f[0]} data-k={f[3]}>
                      <td className="nx-sap">{f[0]}</td>
                      <td>
                        {f[2] || "–"}
                        {f[1] ? <em>{f[1]}</em> : null}
                      </td>
                      <td>{f[3] !== "-" ? <span className="nu-chip" data-k={f[3]}>{f[3]}</span> : null}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="ne-none">לא קיים תיעוד מאומת במאגר על שדות הטבלה.</p>
            )}
            {t.fn > t.f.length ? (
              <p className="ne-note">
                מוצגים {nf.format(t.f.length)} מתוך {nf.format(t.fn)} השדות המתועדים.
              </p>
            ) : null}
          </section>

          <section>
            <h3>ECC → S/4HANA</h3>
            {t.s4 ? (
              <>
                <p className="ne-s4">{t.s4}</p>
                {t.s4a ? (
                  <p className="ne-s4-alt">
                    אובייקט חלופי: <b className="nx-sap">{t.s4a}</b>
                  </p>
                ) : null}
              </>
            ) : (
              <p className="ne-none">לא קיים תיעוד מאומת במאגר · נדרש אימות במערכת SAP</p>
            )}

            <h3>טרנזקציות</h3>
            {t.tc.length ? (
              <ul className="ne-chips">
                {t.tc.map((c) => (
                  <li key={c} className="nu-chip is-sap">
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ne-none">לא קיים תיעוד מאומת במאגר</p>
            )}

            <h3>BAPI ו-FM</h3>
            {t.fu.length ? (
              <ul className="ne-chips">
                {t.fu.map((f) => (
                  <li key={f} className="nu-chip is-sap">
                    {f}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ne-none">לא קיים תיעוד מאומת במאגר</p>
            )}

            <h3>CDS Views</h3>
            {t.cds.length ? (
              <ul className="ne-chips">
                {t.cds.map((c) => (
                  <li key={c} className="nu-chip is-sap">
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ne-none">לא קיים תיעוד מאומת במאגר</p>
            )}

            <h3>יישומי Fiori</h3>
            {t.fi ? <p className="ne-s4">{t.fi}</p> : <p className="ne-none">לא קיים תיעוד מאומת במאגר</p>}

            {t.g ? (
              <>
                <h3>הערת יישום</h3>
                <p className="ne-s4">{t.g}</p>
              </>
            ) : null}
          </section>

          <section>
            <h3>טבלאות אב · {nf.format(parents.length)}</h3>
            <RelList list={parents} self={t.n} tByName={tByName} onGo={onGo} />
            <h3>טבלאות בן · {nf.format(children.length)}</h3>
            <RelList list={children} self={t.n} tByName={tByName} onGo={onGo} />
          </section>
        </div>
      </div>
    </div>
  );
}

function RelList({
  list,
  self,
  tByName,
  onGo,
}: {
  list: ErdEdgeOut[];
  self: string;
  tByName: Map<string, ErdTable>;
  onGo: (n: string) => void;
}) {
  if (!list.length) return <p className="ne-none">לא קיים תיעוד מאומת במאגר</p>;
  return (
    <ul className="ne-joins">
      {list.map((e) => {
        const other = e.p === self ? e.c : e.p;
        const o = tByName.get(other);
        return (
          <li key={e.i} data-kind={e.k}>
            <div className="ne-join-h">
              <button type="button" className="nu-ghost ne-join-go nx-sap" onClick={() => onGo(other)}>
                {other}
              </button>
              <span className="ne-card nx-sap">{e.cd || REL_HE[e.k as RelKind]}</span>
              {o ? <span className="nu-chip">{o.m}</span> : null}
            </div>
            {e.ds ? <p className="ne-join-d">{e.ds}</p> : null}
            {e.j.map((j, i) =>
              j.j ? (
                <div className="ne-join-s" key={i} style={{ "--m": modVar(j.m) } as React.CSSProperties}>
                  <span className="ne-join-m">
                    <i aria-hidden="true" />
                    {j.m}
                  </span>
                  <code>{j.j}</code>
                </div>
              ) : null,
            )}
          </li>
        );
      })}
    </ul>
  );
}
