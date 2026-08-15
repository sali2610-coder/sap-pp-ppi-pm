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
   the SAP Note trail — say "אין מידע מאומת במאגר" out loud instead.

   SECTION NUMBERING is computed from the sections that actually render, so the
   sequence never has a hole where a field was missing.
   ========================================================================== */

import Link from "next/link";
import {
  ArrowLeft, Bug, Info, ListChecks, Puzzle, Quote, Search, ShieldCheck, Sparkles,
  Stethoscope, Table as TableIcon, Terminal,
} from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { learnModVar } from "./mod";
import type { CodeRef, IncidentRow } from "./incidents-data";

const ABSENT = "אין מידע מאומת במאגר";

const IMPACT_HE: Record<string, string> = {
  BLOCKING: "חוסם עבודה",
  "FINANCIAL POSTING RISK": "סיכון ברישום כספי",
  FINANCIAL: "השפעה כספית",
  "DATA INCONSISTENCY": "אי-עקביות נתונים",
  PARTIAL: "פגיעה חלקית",
  "USER-SPECIFIC": "משתמש בודד",
  "MONITORING NOISE": "רעש ניטור",
  MONITORING: "ניטור",
};
const IMPACT_DOT: Record<string, string> = {
  BLOCKING: "var(--status-in-analysis)",
  "FINANCIAL POSTING RISK": "var(--status-in-analysis)",
  FINANCIAL: "var(--status-in-conversion)",
  "DATA INCONSISTENCY": "var(--status-in-conversion)",
  PARTIAL: "var(--status-tested)",
  "USER-SPECIFIC": "var(--status-tested)",
  "MONITORING NOISE": "var(--status-not-started)",
  MONITORING: "var(--status-not-started)",
};

function Absent({ what }: { what: string }) {
  return (
    <span className="nxv-absent">
      <Info size={13} strokeWidth={1.75} aria-hidden="true" />
      {ABSENT} · {what}
    </span>
  );
}

/** A code the record listed. A link only when the project generates a page for
 *  it; otherwise an inert value, and the form itself says so. */
function Ref({ r, kind }: { r: CodeRef; kind: "tcode" | "table" }) {
  const icon = kind === "tcode"
    ? <Terminal size={13} strokeWidth={1.75} />
    : <TableIcon size={13} strokeWidth={1.75} />;
  if (!r.href) return <span className="nu-chip is-sap">{r.code}</span>;
  return (
    <Link href={r.href} className="nu-card nxv-ref" prefetch={false}>
      {icon}
      <b>{r.code}</b>
      <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" style={{ marginInlineStart: "auto", opacity: 0.5 }} />
    </Link>
  );
}

export function IncidentView({ r }: { r: IncidentRow }) {
  // The sections that will actually render, in order. The numbering reads off
  // this list, so it can never show 01 · 02 · 04.
  const order: string[] = [
    "s4",
    "symptom",
    r.rootCauses.length ? "causes" : "",
    r.tcodes.length || r.tables.length || r.debugEntry.length || r.breakpoints.length ? "diagnose" : "",
    r.exits.length || r.funcs.length ? "hooks" : "",
    r.fix.length ? "fix" : "",
    r.prevention.length ? "prevent" : "",
    r.scenario ? "scenario" : "",
    "notes",
  ].filter(Boolean);
  const n = (k: string) => String(order.indexOf(k) + 1).padStart(2, "0");

  const linked = [...r.tcodes, ...r.tables].filter((x) => x.href).length;
  const totalRefs = r.tcodes.length + r.tables.length;

  return (
    <div
      className="nxv"
      data-surface="incident"
      style={{ "--m": learnModVar(r.module) } as React.CSSProperties}
    >
      <SmartReturn fallback={{ href: "/neo/incidents/", label: "קטלוג התקלות" }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">קטלוג התקלות · {r.moduleHe || r.module}</span>
        <div className="nxv-title">
          <h1 className="nxv-h1">{r.he}</h1>
        </div>
        <div className="nxv-meta">
          <span className="nu-chip nxv-mod">
            <i aria-hidden="true" />
            {r.module}
            {r.moduleHe ? <em>{r.moduleHe}</em> : null}
          </span>
          {r.impactKind ? (
            <span className="nu-status" style={{ "--s": IMPACT_DOT[r.impactKind] || "var(--status-not-started)" } as React.CSSProperties}>
              {IMPACT_HE[r.impactKind] || r.impactKind}
            </span>
          ) : (
            <span className="nu-status" style={{ "--s": "var(--status-not-started)" } as React.CSSProperties}>
              השפעה לא תויגה במקור
            </span>
          )}
          <span className="nu-chip is-sap">{r.slug}</span>
        </div>
        {r.impact && r.impact !== r.impactKind ? <p className="nxv-lede">{r.impact}</p> : null}
      </header>

      {/* ------------------------------------------------- THE S/4HANA PLATE */}
      {r.hasS4 ? (
        <section className="nxv-s4" data-s4="1" aria-labelledby="i-s4">
          <div className="nxv-s4-top">
            <span className="nx-eyebrow">S/4HANA · {n("s4")}</span>
            <h2 className="nxv-s4-h" id="i-s4">התקלה הזו מתנהגת אחרת ב-ECC ו-ב-S/4HANA</h2>
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
        <section className="nxv-sec" aria-labelledby="i-s4">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><Sparkles size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-s4">ECC ↔ S/4HANA</h2>
            <em className="nxv-sec-n">{n("s4")}</em>
          </div>
          <Absent what="הפרדה בין התנהגות ב-ECC לבין S/4HANA ברשומה הזו" />
          <p className="nx-muted">
            הרשומה נכתבה בלי להפריד בין הגרסאות. אין להסיק מכך שההתנהגות זהה — יש לאמת מול המערכת.
          </p>
        </section>
      )}

      {/* ------------------------------------------------------------ SYMPTOM */}
      <section className="nxv-sec" aria-labelledby="i-sym">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Stethoscope size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="i-sym">מה המשתמש רואה</h2>
          <em className="nxv-sec-n">{n("symptom")}</em>
        </div>
        {r.symptom ? <p className="nxv-v">{r.symptom}</p> : <Absent what="סימפטום" />}
        {r.error ? (
          <div className="nxv-fact">
            <span className="nxv-l">הודעת השגיאה, כפי שנרשמה</span>
            <code className="nxv-code">{r.error}</code>
          </div>
        ) : null}
        {r.techCause ? (
          <div className="nxv-fact">
            <span className="nxv-l">שורש טכני</span>
            <p className="nxv-v">{r.techCause}</p>
          </div>
        ) : null}
      </section>

      {/* ------------------------------------------------------------- CAUSES */}
      {r.rootCauses.length ? (
        <section className="nxv-sec" aria-labelledby="i-rc">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><Bug size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-rc">סיבות שורש אפשריות</h2>
            <em className="nxv-sec-n">{n("causes")}</em>
          </div>
          <ul className="nxv-ul">
            {r.rootCauses.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>
      ) : null}

      {/* ----------------------------------------------------------- DIAGNOSE */}
      {order.includes("diagnose") ? (
        <section className="nxv-sec" aria-labelledby="i-dx">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><Search size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-dx">איך מאבחנים</h2>
            <em className="nxv-sec-n">{n("diagnose")}</em>
          </div>

          {r.tcodes.length ? (
            <div className="nxv-fact">
              <span className="nxv-l">טרנזקציות לניתוח</span>
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
              <span className="nxv-l">נקודות כניסה לניתוח</span>
              <ul className="nxv-ul">{r.debugEntry.map((d) => <li key={d}>{d}</li>)}</ul>
            </div>
          ) : null}

          {r.breakpoints.length ? (
            <div className="nxv-fact">
              <span className="nxv-l">Breakpoints קונקרטיים</span>
              <ul className="nxv-ul">{r.breakpoints.map((d) => <li key={d} className="nx-sap">{d}</li>)}</ul>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* -------------------------------------------------------------- HOOKS */}
      {order.includes("hooks") ? (
        <section className="nxv-sec" aria-labelledby="i-hk">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><Puzzle size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-hk">הרחבות וממשקים מעורבים</h2>
            <em className="nxv-sec-n">{n("hooks")}</em>
          </div>
          {r.exits.length ? (
            <div className="nxv-fact">
              <span className="nxv-l">Exits · BAdIs</span>
              <div className="nxv-chips">
                {r.exits.map((e) => <span key={e} className="nu-chip is-sap">{e}</span>)}
              </div>
            </div>
          ) : null}
          {r.funcs.length ? (
            <div className="nxv-fact">
              <span className="nxv-l">Function Modules · BAPIs</span>
              <div className="nxv-chips">
                {r.funcs.map((e) => <span key={e} className="nu-chip is-sap">{e}</span>)}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* ---------------------------------------------------------------- FIX */}
      {r.fix.length ? (
        <section className="nxv-sec" aria-labelledby="i-fx">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><ListChecks size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-fx">התיקון, לפי הסדר</h2>
            <em className="nxv-sec-n">{n("fix")}</em>
          </div>
          <ol className="nxv-ol">
            {r.fix.map((f) => <li key={f}>{f}</li>)}
          </ol>
        </section>
      ) : null}

      {/* ----------------------------------------------------------- PREVENT */}
      {r.prevention.length ? (
        <section className="nxv-sec" aria-labelledby="i-pv">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><ShieldCheck size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-pv">איך מונעים שזה יחזור</h2>
            <em className="nxv-sec-n">{n("prevent")}</em>
          </div>
          <ul className="nxv-ul">
            {r.prevention.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </section>
      ) : null}

      {/* ---------------------------------------------------------- SCENARIO */}
      {r.scenario ? (
        <section className="nxv-sec" aria-labelledby="i-sc">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><Quote size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-sc">איך זה נראה בארגון</h2>
            <em className="nxv-sec-n">{n("scenario")}</em>
          </div>
          <p className="nxv-quote">{r.scenario}</p>
        </section>
      ) : null}

      {/* ------------------------------------------------------------- NOTES */}
      <section className="nxv-sec" aria-labelledby="i-nt">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Info size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="i-nt">איתור SAP Note</h2>
          <em className="nxv-sec-n">{n("notes")}</em>
        </div>
        {r.notes.length || r.oss.length ? (
          <>
            <p className="nx-muted">
              מילות חיפוש בלבד. הפרויקט אינו שומר מספרי SAP Note ואינו ממציא אותם — יש לחפש איתן ב-SAP for Me
              {" "}ולאמת את המספר שמתקבל.
            </p>
            <div className="nxv-chips">
              {[...r.notes, ...r.oss].map((k) => <span key={k} className="nu-chip">{k}</span>)}
            </div>
          </>
        ) : (
          <Absent what="מילות חיפוש ל-SAP Note ברשומה הזו" />
        )}
      </section>

      <div className="nxv-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מקור: <span className="nx-sap">data/troubleshooting.ts</span> — ידע תמיכה כתוב, לא בדיקה חיה
            {" "}במערכת SAP ולא תור תמיכה. כל צעד טעון אימות בסביבה לפני ביצוע בייצור.
          </span>
        </p>
        {totalRefs ? (
          <p>
            {linked} מתוך {totalRefs} הקודים שהרשומה מונה נפתרו לעמוד קיים בפרויקט; השאר מוצגים כערך,
            {" "}כי אין להם עמוד ולא הומצא להם אחד.
          </p>
        ) : null}
      </div>
    </div>
  );
}
