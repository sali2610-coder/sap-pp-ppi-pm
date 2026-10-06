/* ============================================================================
   PROJECT NEO · /neo/incidents/<slug>/ — one incident, in full.
   ----------------------------------------------------------------------------
   The catalogue answers "which incident". This answers "what happens, why, how
   do I prove it, and what do I actually do".

   A server component. The only client code on the page is <SmartReturn/>.

   ONLY THE FIELDS THE RECORD CARRIES ARE RENDERED. The catalogue is uneven on
   purpose: 156 records all carry a symptom, root causes, diagnosis transactions
   and fix steps, but only some carry an error text, a technical root cause,
   concrete breakpoints, prevention steps, a worked scenario or a separate
   ECC / S/4HANA behaviour. A section with nothing behind it is not drawn, and
   the two places where absence is itself the answer — the S/4HANA standing and
   the SAP Note trail: say "לא קיים מידע מאומת במאגר" out loud instead.

   THE RECORD LANGUAGE (2026-10, components/neo-shell/record-kit.tsx and
   app/neo/record.css): the catalog's hero with the impact tag as its verdict, a
   ledger of the record's own counts (each a door to its section), every
   question as the catalog's Sig, the S/4HANA plate as a neutral raised card,
   and the credit at the foot. The impact words, their dots and the "verify in
   SE93" codes come from ./incident-vocab, the list's own vocabulary.
   ========================================================================== */

import Link from "next/link";
import {
  AlertTriangle, ArrowLeft, Bug, Info, ListChecks, Puzzle, Quote, Search, ShieldCheck, Sparkles,
  Stethoscope, Table as TableIcon, Terminal,
} from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { RecordHead } from "../record-kit";
import { CatalogFoot, Ledger, Sig } from "../data/catalog-kit";
import { learnModVar } from "./mod";
import { IMPACT_HE, impactDot, splitCode } from "./incident-vocab";
import type { CodeRef, IncidentRow } from "./incidents-data";

const ABSENT = "לא קיים תיעוד מאומת במאגר";

function Absent({ what }: { what: string }) {
  return (
    <span className="nxv-absent">
      <Info size={13} strokeWidth={1.75} aria-hidden="true" />
      {ABSENT} · {what}
    </span>
  );
}

/** A code the record listed. A link only when the project generates a page for
 *  it; otherwise an inert value, and the form itself says so. A code the source
 *  writes as "IWO10009 verify SE93" reads as the code plus where to verify it. */
function Ref({ r, kind }: { r: CodeRef; kind: "tcode" | "table" }) {
  const icon = kind === "tcode"
    ? <Terminal size={13} strokeWidth={1.75} />
    : <TableIcon size={13} strokeWidth={1.75} />;
  const s = splitCode(r.code);
  const at = s.at ? <span className="nrc-vfy">לאימות ב-<bdi>{s.at}</bdi></span> : null;
  if (!r.href) {
    return (
      <span className="nrc-codev">
        <span className="nu-chip is-sap">{s.code}</span>
        {at}
      </span>
    );
  }
  return (
    <Link href={r.href} className="nu-card nxv-ref" prefetch={false}>
      {icon}
      <b>{s.code}</b>
      {at}
      <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" style={{ marginInlineStart: "auto", opacity: 0.5 }} />
    </Link>
  );
}

export function IncidentView({ r }: { r: IncidentRow }) {
  const has = {
    causes: r.rootCauses.length > 0,
    diagnose: !!(r.tcodes.length || r.tables.length || r.debugEntry.length || r.breakpoints.length),
    hooks: !!(r.exits.length || r.funcs.length),
    fix: r.fix.length > 0,
    prevent: r.prevention.length > 0,
  };

  const linked = [...r.tcodes, ...r.tables].filter((x) => x.href).length;
  const totalRefs = r.tcodes.length + r.tables.length;
  const source = (
    <>
      מקור: <span className="nx-sap">data/troubleshooting.ts</span>: תיעוד פתרון בעיות מאומת, שאינו
      {" "}בדיקה חיה במערכת SAP. כל צעד טעון אימות בסביבת בדיקות לפני ביצוע בייצור.
    </>
  );

  return (
    <div
      className="nxv nrc nm-scene"
      data-scene="cream"
      data-surface="incident"
      style={{ "--m": learnModVar(r.module) } as React.CSSProperties}
    >
      <SmartReturn fallback={{ href: "/neo/incidents/", label: "תקלות ופתרון בעיות" }} />

      {/* ------------------------------------------------------ 1. IDENTITY
          The impact tag is the verdict: the first thing a reader triages. */}
      <RecordHead
        icon={<AlertTriangle size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow={`תקלות ופתרון בעיות · ${r.moduleHe || r.module}`}
        title={r.he}
        lede={r.impact && r.impact !== r.impactKind ? r.impact : undefined}
        meta={
          <>
            <span className="nu-chip nxt-mod">
              <i aria-hidden="true" />
              {r.module}{r.moduleHe ? ` · ${r.moduleHe}` : ""}
            </span>
            <span className="nu-chip is-sap">{r.slug}</span>
          </>
        }
        verdict={
          r.impactKind ? (
            <span className="nu-status" style={{ "--s": impactDot(r.impactKind) } as React.CSSProperties}>
              {IMPACT_HE[r.impactKind] || r.impactKind}
            </span>
          ) : (
            <span className="nu-status" style={{ "--s": "var(--status-not-started)" } as React.CSSProperties}>
              ללא תג השפעה
            </span>
          )
        }
      >
        <Ledger
          label="התקלה במספרים. כל מספר מוביל לחלק שלו בעמוד"
          items={[
            ...(has.causes ? [{ v: r.rootCauses.length, l: "סיבות שורש", href: "#i-rc" }] : []),
            ...(totalRefs ? [{ v: totalRefs, l: "קודים לאבחון", href: "#i-dx" }] : []),
            ...(has.fix ? [{ v: r.fix.length, l: "צעדי תיקון", href: "#i-fx" }] : []),
            ...(has.prevent ? [{ v: r.prevention.length, l: "צעדי מניעה", href: "#i-pv" }] : []),
          ]}
        />
      </RecordHead>

      {/* ------------------------------------------------------------ SYMPTOM */}
      <Sig id="i-sym" icon={<Stethoscope size={15} strokeWidth={1.75} />} title="סימפטום">
        {r.symptom ? <p className="nxv-v">{r.symptom}</p> : <Absent what="סימפטום" />}
        {r.error ? (
          <div className="nxv-fact">
            <span className="nxv-l">הודעת השגיאה</span>
            {(() => {
              const e = splitCode(r.error);
              return e.at ? (
                <span className="nrc-codev">
                  <code className="nxv-code">{e.code}</code>
                  <span className="nrc-vfy">לאימות ב-<bdi>{e.at}</bdi></span>
                </span>
              ) : <code className="nxv-code">{r.error}</code>;
            })()}
          </div>
        ) : null}
        {r.techCause ? (
          <div className="nxv-fact">
            <span className="nxv-l">סיבת שורש טכנית</span>
            <p className="nxv-v">{r.techCause}</p>
          </div>
        ) : null}
      </Sig>

      {/* ------------------------------------------------------------- CAUSES */}
      {has.causes ? (
        <Sig id="i-rc" icon={<Bug size={15} strokeWidth={1.75} />} title="סיבות שורש אפשריות">
          <ul className="nxv-ul">
            {r.rootCauses.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </Sig>
      ) : null}

      {/* ----------------------------------------------------------- DIAGNOSE */}
      {has.diagnose ? (
        <Sig id="i-dx" icon={<Search size={15} strokeWidth={1.75} />} title="אבחון">
          {r.tcodes.length ? (
            <div className="nxv-fact">
              <span className="nxv-l">טרנזקציות לאבחון</span>
              <div className="nxv-refs">
                {r.tcodes.map((c) => <Ref key={`tx-${c.code}`} r={c} kind="tcode" />)}
              </div>
            </div>
          ) : null}

          {r.tables.length ? (
            <div className="nxv-fact">
              <span className="nxv-l">טבלאות לבדיקה</span>
              <div className="nxv-refs">
                {r.tables.map((c) => <Ref key={`tb-${c.code}`} r={c} kind="table" />)}
              </div>
            </div>
          ) : null}

          {r.debugEntry.length ? (
            <div className="nxv-fact">
              <span className="nxv-l">נקודות כניסה ל-Debug</span>
              <ul className="nxv-ul">{r.debugEntry.map((d) => <li key={d}>{d}</li>)}</ul>
            </div>
          ) : null}

          {r.breakpoints.length ? (
            <div className="nxv-fact">
              <span className="nxv-l">Breakpoints</span>
              <ul className="nxv-ul">{r.breakpoints.map((d) => <li key={d} className="nx-sap">{d}</li>)}</ul>
            </div>
          ) : null}
        </Sig>
      ) : null}

      {/* -------------------------------------------------------------- HOOKS */}
      {has.hooks ? (
        <Sig id="i-hk" icon={<Puzzle size={15} strokeWidth={1.75} />} title="הרחבות וממשקים">
          {r.exits.length ? (
            <div className="nxv-fact">
              <span className="nxv-l">User Exits · BAdIs</span>
              <div className="nxv-chips">
                {r.exits.map((e) => <span key={e} className="nu-chip is-sap">{e}</span>)}
              </div>
            </div>
          ) : null}
          {r.funcs.length ? (
            <div className="nxv-fact">
              <span className="nxv-l">BAPI ו-FM</span>
              <div className="nxv-chips">
                {r.funcs.map((e) => <span key={e} className="nu-chip is-sap">{e}</span>)}
              </div>
            </div>
          ) : null}
        </Sig>
      ) : null}

      {/* ---------------------------------------------------------------- FIX */}
      {has.fix ? (
        <Sig id="i-fx" icon={<ListChecks size={15} strokeWidth={1.75} />} title="צעדי התיקון">
          <ol className="nxv-ol">
            {r.fix.map((f) => <li key={f}>{f}</li>)}
          </ol>
        </Sig>
      ) : null}

      {/* ----------------------------------------------------------- PREVENT */}
      {has.prevent ? (
        <Sig id="i-pv" icon={<ShieldCheck size={15} strokeWidth={1.75} />} title="צעדי מניעה">
          <ul className="nxv-ul">
            {r.prevention.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </Sig>
      ) : null}

      {/* ------------------------------------------------- THE S/4HANA PLATE — after symptom, diagnosis and fix
          (design audit §7, 2026-09-21): the reader sees what they see first. */}
      {r.hasS4 ? (
        <section className="nxv-s4" data-s4="1" id="i-s4" aria-labelledby="i-s4-h">
          <div className="nxv-s4-top">
            <span className="nx-eyebrow">S/4HANA</span>
            <h2 className="nxv-s4-h" id="i-s4-h">התנהגות התקלה ב-ECC וב-S/4HANA</h2>
          </div>
          <div className="nxv-s4-two">
            <div className="nxv-s4-c">
              <span className="nxv-l">ECC 6.0</span>
              {r.ecc ? <p>{r.ecc}</p> : <Absent what="התנהגות ב-ECC" />}
            </div>
            <div className="nxv-s4-c">
              <span className="nxv-l">S/4HANA</span>
              {r.s4 ? <p>{r.s4}</p> : <Absent what="התנהגות ב-S/4HANA" />}
            </div>
          </div>
        </section>
      ) : (
        <Sig id="i-s4" icon={<Sparkles size={15} strokeWidth={1.75} />} title="ECC ו-S/4HANA">
          <Absent what="הבחנה בין ECC ל-S/4HANA" />
          <p className="nx-muted">
            הרשומה אינה מבחינה בין הגרסאות. נדרש אימות נוסף במערכת לפני הסקה שההתנהגות זהה.
          </p>
        </Sig>
      )}

      {/* ---------------------------------------------------------- SCENARIO */}
      {r.scenario ? (
        <Sig id="i-sc" icon={<Quote size={15} strokeWidth={1.75} />} title="תרחיש לדוגמה">
          <p className="nxv-quote">{r.scenario}</p>
        </Sig>
      ) : null}

      {/* ------------------------------------------------------------- NOTES */}
      <Sig
        id="i-nt"
        icon={<Info size={15} strokeWidth={1.75} />}
        title="איתור SAP Notes"
        lede={r.notes.length || r.oss.length
          ? <>מילות חיפוש ל-SAP for Me. הקטלוג אינו כולל מספרי SAP Note; יש לאמת את ה-Note שנמצא{" "}לפני יישום.</>
          : undefined}
      >
        {r.notes.length || r.oss.length ? (
          <div className="nxv-chips">
            {[...r.notes, ...r.oss].map((k) => <span key={k} className="nu-chip">{k}</span>)}
          </div>
        ) : (
          <Absent what="מילות חיפוש ל-SAP Notes" />
        )}
      </Sig>

      <CatalogFoot notes={totalRefs ? [source] : undefined}>
        {totalRefs
          ? <>{linked} מתוך {totalRefs} הקודים ברשומה מקושרים לעמוד בפרויקט; השאר מוצגים כערך.</>
          : source}
      </CatalogFoot>
    </div>
  );
}
