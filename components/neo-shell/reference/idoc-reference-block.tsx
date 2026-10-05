/* ============================================================================
   PROJECT NEO · /neo/idoc — the shared IDoc reference.
   ----------------------------------------------------------------------------
   SERVER components. The project documents only three IDoc message types, but
   it documents the IDoc MECHANISM deeply: the message's route from the
   application to the target system, the three physical records, seven status
   codes with their real cause and where to fix them, and the monitoring
   transactions. That knowledge is not per-message-type, so it is rendered once
   on the directory instead of being copied onto each record page.

     IdocRoute           the page's signature: the route, station by station,
                         in the order the record lists it (above the list).
     IdocReferenceBlock  the anatomy, the status codes in their two directions
                         and the monitoring transactions (under the list).

   It is data, not navigation. The only interactive things in it are the T-Code
   and table links, each emitted only when NEO really generates that page.
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft, Cable } from "lucide-react";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { Sig, fmt } from "../data/catalog-kit";
import { Glyph } from "./icons";
import type { IdocReference } from "./idoc-data";

/** One code: a link when NEO generates its page, a value otherwise. */
function Code({ t, href }: { t: string; href: string | null }) {
  return href
    ? (
      <Link href={href} prefetch={false} className="nxd-code">
        <bdi className="nx-sap">{t}</bdi>
        <ArrowLeft size={12} strokeWidth={2} aria-hidden="true" />
      </Link>
    )
    : <bdi className="nu-chip is-sap">{t}</bdi>;
}

/** A section under the list: a badge with its icon, the title and its count. */
function Sec({ id, icon, title, count, children }: { id: string; icon: React.ReactNode; title: string; count: string; children: React.ReactNode }) {
  return (
    <section className="nxd-ref-sec" id={id} aria-labelledby={`${id}-h`}>
      <header className="nxd-sig-h">
        <span className="nxd-badge" aria-hidden="true">{icon}</span>
        <div className="nxd-sig-tt">
          <h2 className="nxd-sig-t" id={`${id}-h`}>
            <span>{title}</span>
            <span className="nxd-pill">{count}</span>
          </h2>
        </div>
      </header>
      {children}
    </section>
  );
}

export function IdocRoute({ r }: { r: IdocReference }) {
  return (
    <Sig
      id="nxd-sig"
      icon={<Cable size={15} strokeWidth={1.75} />}
      title="מסלול ההודעה"
      count={`${fmt(r.flow.length)} תחנות`}
      lede={<Rtl s={r.architecture} />}
    >
      <ol className="nxd-route nxd-route--flow" aria-label="זרימת ההודעה">
        {r.flow.map((step, i) => (
          <li key={`${i}-${step}`}>
            <span className="nxd-stn">
              <i aria-hidden="true">{i + 1}</i>
              <span><Rtl s={step} /></span>
            </span>
          </li>
        ))}
      </ol>
    </Sig>
  );
}

export function IdocReferenceBlock({ r }: { r: IdocReference }) {
  // The two directions, in the order the record first names them.
  const dirs: string[] = [];
  for (const s of r.statuses) if (!dirs.includes(s.dir)) dirs.push(s.dir);

  return (
    <div className="nxd-ref">
      {/* ------------------------------------------------------- anatomy */}
      <Sec id="idoc-anat" icon={<Glyph i="database" size={15} />} title="מבנה ה-IDoc" count={`${fmt(r.records.length)} רשומות פיזיות`}>
        <ul className="nxd-anat">
          {r.records.map((rec) => {
            const inner = (
              <>
                <bdi className="nx-sap">{rec.table}</bdi>
                <b><Rtl s={rec.he} /></b>
                <span><Rtl s={rec.role} /></span>
              </>
            );
            return (
              <li key={rec.table}>
                {rec.href
                  ? <Link href={rec.href} prefetch={false} className="nxd-anat-c">{inner}</Link>
                  : <div className="nxd-anat-c is-flat">{inner}</div>}
              </li>
            );
          })}
        </ul>
      </Sec>

      {/* ------------------------------------------------------ statuses */}
      <Sec id="idoc-status" icon={<Glyph i="shieldCheck" size={15} />} title="קודי סטטוס של IDoc" count={`${fmt(r.statuses.length)} קודים מתועדים`}>
        <div className="nxd-lanes">
          {dirs.map((d) => {
            const list = r.statuses.filter((s) => s.dir === d);
            return (
              <section key={d} className="nxd-lane" aria-label={`IDoc ${d}`}>
                <h3 className="nxd-lane-h">
                  <span>{d}</span>
                  <span className="nxd-pill">{fmt(list.length)} קודים</span>
                </h3>
                <ul>
                  {list.map((s) => (
                    <li key={s.code} className="nxd-st">
                      <bdi className="nx-sap nxd-st-c">{s.code}</bdi>
                      <div className="nxd-st-b">
                        <b><Rtl s={s.he} /></b>
                        <p><Rtl s={s.cause} /></p>
                        {s.fix.length ? (
                          <p className="nxd-st-fix">
                            <span>לטיפול</span>
                            {s.fix.map((f) => <Code key={f.t} t={f.t} href={f.href} />)}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Sec>

      {/* ---------------------------------------------------- monitoring */}
      <Sec id="idoc-mon" icon={<Glyph i="terminal" size={15} />} title="טרנזקציות ניטור" count={`${fmt(r.monitoring.length)} טרנזקציות`}>
        <ul className="nxd-mon">
          {r.monitoring.map((m) => (
            <li key={m.t}>
              <Code t={m.t} href={m.href} />
              <span><Rtl s={m.what} /></span>
            </li>
          ))}
        </ul>
      </Sec>
    </div>
  );
}
