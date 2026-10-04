/* ============================================================================
   PROJECT NEO · /neo/idoc — the shared IDoc reference, under the list.
   ----------------------------------------------------------------------------
   A SERVER component. The project documents only two IDoc message types, but it
   documents the IDoc MECHANISM deeply: the three physical records, seven status
   codes with their real cause and where to fix them, and the monitoring
   transactions. That knowledge is not per-message-type, so it is rendered once,
   here, instead of being copied onto each record page.

   It is data, not navigation. The only interactive things in it are the T-Code
   links, and each one is emitted only when /neo/transactions really generates
   that page.
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Glyph } from "./icons";
import type { IdocReference } from "./idoc-data";

/** A T-Code: a link when /neo/transactions generates its page, a value when not. */
function Tx({ t, href }: { t: string; href: string | null }) {
  return href ? (
    <Link href={href} prefetch={false} className="nu-link nxr-codelink">
      <span className="nx-sap">{t}</span>
      <ArrowLeft size={12} strokeWidth={2} className="nu-arw" aria-hidden="true" />
    </Link>
  ) : (
    <span className="nu-chip is-sap">{t}</span>
  );
}

export function IdocReferenceBlock({ r }: { r: IdocReference }) {
  return (
    <div className="nxr-ref">
      {/* ------------------------------------------------------- anatomy */}
      <section className="nxt-sec" aria-labelledby="idoc-anat">
        <h2 className="nx-h2 nxt-sec-h" id="idoc-anat">
          <span className="nxt-sec-i" aria-hidden="true"><Glyph i="database" size={15} /></span>
          מבנה ה-IDoc
          <em className="nxt-sec-n">{r.records.length} רשומות פיזיות</em>
        </h2>

        <p className="nxr-text">{r.architecture}</p>

        <ol className="nxr-flow" aria-label="זרימת ההודעה">
          {r.flow.map((step, i) => (
            <li key={`${i}-${step}`}>
              <span className="nxr-flow-n" aria-hidden="true">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <ul className="nxt-tbl">
          {r.records.map((rec) => {
            const inner = (
              <>
                <span className="nxt-tbl-n nx-sap">{rec.table}</span>
                <span className="nxt-tbl-he">{rec.he}</span>
                <span className="nxt-tbl-note">{rec.role}</span>
              </>
            );
            return (
              <li key={rec.table}>
                {rec.href ? (
                  <Link href={rec.href} prefetch={false} className="nu-card nxt-tbl-r">{inner}</Link>
                ) : (
                  <div className="nxt-tbl-r is-flat" aria-label={`${rec.table}: ללא עמוד ייעודי בתיעוד`}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="nxr-route">
          <b>ניתוב:</b>
          {r.routing.map((x) => (
            <span key={x.tx.t} className="nxr-route-i">
              <span lang="en">{x.what}</span>
              <Tx t={x.tx.t} href={x.tx.href} />
              {x.join ? <span aria-hidden="true">{x.join}</span> : null}
            </span>
          ))}
        </p>
      </section>

      {/* ------------------------------------------------------ statuses */}
      <section className="nxt-sec" aria-labelledby="idoc-status">
        <h2 className="nx-h2 nxt-sec-h" id="idoc-status">
          <span className="nxt-sec-i" aria-hidden="true"><Glyph i="shieldCheck" size={15} /></span>
          קודי סטטוס של IDoc
          <em className="nxt-sec-n">{r.statuses.length} קודים מתועדים</em>
        </h2>

        <ul className="nxr-st">
          {r.statuses.map((s) => (
            <li key={s.code} className="nxr-st-i">
              <span className="nxr-st-c nx-sap">{s.code}</span>
              <span className="nu-chip nxr-st-d">{s.dir}</span>
              <span className="nxr-st-he">{s.he}</span>
              <span className="nxr-st-cause">{s.cause}</span>
              <span className="nxr-st-fix">
                {s.fix.map((f) => <Tx key={f.t} t={f.t} href={f.href} />)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------- monitoring */}
      <section className="nxt-sec" aria-labelledby="idoc-mon">
        <h2 className="nx-h2 nxt-sec-h" id="idoc-mon">
          <span className="nxt-sec-i" aria-hidden="true"><Glyph i="terminal" size={15} /></span>
          טרנזקציות ניטור
          <em className="nxt-sec-n">{r.monitoring.length} טרנזקציות</em>
        </h2>

        <ul className="nxr-mon">
          {r.monitoring.map((m) => (
            <li key={m.t} className="nxr-mon-i">
              <Tx t={m.t} href={m.href} />
              <span className="nxr-mon-w">{m.what}</span>
            </li>
          ))}
        </ul>

        <dl className="nxt-grid">
          <div className="nxt-fact">
            <dt className="nxt-l">כלי ניטור (T-Codes)</dt>
            <dd className="nxt-v">
              <ul className="nxt-codes nxr-codes" aria-label="כלי ניטור (T-Codes)">
                {r.transactions.map((x) => <li key={x.t}><Tx t={x.t} href={x.href} /></li>)}
              </ul>
            </dd>
          </div>
        </dl>
      </section>

      {/* -------------------------------------------------- from the field */}
      <section className="nxt-sec" aria-labelledby="idoc-field">
        <h2 className="nx-h2 nxt-sec-h" id="idoc-field">
          <span className="nxt-sec-i" aria-hidden="true"><Glyph i="wrench" size={15} /></span>
          מהשטח בארגון
        </h2>
        <p className="nxr-text">{r.scenario}</p>
        {r.incidents.length ? (
          <ul className="nxt-codes nxr-codes" aria-label="תקלות מקושרות">
            {r.incidents.map((i) => (
              <li key={i.label}>
                {i.href ? (
                  <Link href={i.href} prefetch={false} className="nu-link nxr-codelink">
                    {i.label}
                    <ArrowLeft size={12} strokeWidth={2} className="nu-arw" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="nu-chip">{i.label}</span>
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </div>
  );
}
