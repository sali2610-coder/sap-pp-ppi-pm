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

   SECTION NUMBERING is computed from the sections that actually render, so the
   sequence never has a hole where a field was missing.
   ========================================================================== */

import { enDir, enLang } from "../lang";
import Link from "next/link";
import {
  ArrowLeft, Boxes, Bug, FileSearch, GitCompareArrows, Info, ListChecks, Puzzle, Quote, Search, ShieldCheck,
  Stethoscope, Table as TableIcon, Terminal,
} from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { noteHref, oicHref } from "@/components/neo-shell/records/links";
import { SOURCE_HE, TRUST_META, trustDomain } from "@/lib/trust";
import { learnModVar } from "./mod";
import type { CodeRef, IncidentDetail } from "./incidents-data";

const ABSENT = "אין תיעוד מאומת במאגר";

/** "BLOCKING (ייצור לא מקבל הוראות)" → ["BLOCKING", " (ייצור לא מקבל הוראות)"]:
 *  the English tag becomes its own LTR island, the gloss stays in the line. */
const splitImpact = (s: string): [string, string] => {
  const i = s.indexOf(" (");
  return i < 0 ? [s, ""] : [s.slice(0, i), s.slice(i)];
};
const hasHe = (s: string) => /[֐-׿]/.test(s);

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

export function IncidentView({ r }: { r: IncidentDetail }) {
  // The sections that will actually render, in order. The numbering reads off
  // this list, so it can never show 01 · 02 · 04. Diagnosis always renders:
  // the tables line says so out loud when the record lists none.
  // The S/4HANA plate renders after prevention (design audit §7), so it is
  // numbered there too; listed first, it read "07 · 01 · 08".
  const order: string[] = [
    "symptom",
    r.rootCauses.length ? "causes" : "",
    "diagnose",
    r.exits.length || r.funcs.length ? "hooks" : "",
    r.fix.length ? "fix" : "",
    r.prevention.length ? "prevent" : "",
    "s4",
    r.scenario ? "scenario" : "",
    "notes",
  ].filter(Boolean);
  const n = (k: string) => String(order.indexOf(k) + 1).padStart(2, "0");

  const linked = [...r.tcodes, ...r.tables].filter((x) => x.href).length;
  const totalRefs = r.tcodes.length + r.tables.length;
  const [impactTag, impactGloss] = splitImpact(r.impact);
  // The catalogue's own trust level (lib/trust): authored domain knowledge.
  const trust = trustDomain();

  return (
    <div
      className="nxv"
      data-surface="incident"
      style={{ "--m": learnModVar(r.module) } as React.CSSProperties}
    >
      <SmartReturn fallback={{ href: "/neo/incidents/", label: "תקלות ופתרון בעיות" }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">תקלות ופתרון בעיות · {r.moduleHe || r.module}</span>
        <div className="nxv-title">
          <h1 className="nxv-h1 nxv-h1--rec" lang={enLang(r.he)}>{r.he}</h1>
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
              ללא תג השפעה
            </span>
          )}
          <span className="nu-chip is-sap">{r.slug}</span>
        </div>
        {/* The source's impact line, verbatim: the pill above is its Hebrew
            reading, this is what the record says. */}
        {r.impact ? (
          <p className="nxv-lede nxr-impact">
            <b>השפעה עסקית:</b>{" "}
            <span dir="ltr" lang="en">{impactTag}</span>
            {impactGloss}
          </p>
        ) : null}
      </header>

      {/* ------------------------------------------------------------ SYMPTOM */}
      <section className="nxv-sec" aria-labelledby="i-sym">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Stethoscope size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="i-sym">סימפטום</h2>
          <em className="nxv-sec-n">{n("symptom")}</em>
        </div>
        {r.symptom ? <p className="nxv-v">{r.symptom}</p> : <Absent what="סימפטום" />}
        {r.error ? (
          <div className="nxv-fact">
            <span className="nxv-l">קוד שגיאה</span>
            <code className="nxv-code" data-he={hasHe(r.error) ? "1" : undefined}>{r.error}</code>
          </div>
        ) : null}
        {r.techCause ? (
          <div className="nxv-fact">
            <span className="nxv-l">גורם שורש טכני</span>
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
      <section className="nxv-sec" aria-labelledby="i-dx">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Search size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="i-dx">אבחון</h2>
          <em className="nxv-sec-n">{n("diagnose")}</em>
        </div>

        {r.tcodes.length ? (
          <div className="nxv-fact">
            <span className="nxv-l">T-Codes לאבחון</span>
            <div className="nxv-refs">
              {r.tcodes.map((c) => <Ref key={`tx-${c.code}`} r={c} kind="tcode" />)}
            </div>
          </div>
        ) : null}

        <div className="nxv-fact">
          <span className="nxv-l">טבלאות לבדיקה</span>
          {r.tables.length ? (
            <div className="nxv-refs">
              {r.tables.map((c) => <Ref key={`tb-${c.code}`} r={c} kind="table" />)}
            </div>
          ) : (
            <Absent what="טבלאות לבדיקה" />
          )}
        </div>

        {/* The business objects whose primary table is on the list above
            (the project's object registry), each to its object page. */}
        {r.objects.length ? (
          <div className="nxv-fact">
            <span className="nxv-l">אובייקטים מושפעים</span>
            <div className="nxv-refs">
              {r.objects.map((o) => {
                // A link only when /neo/oic/ generates this object's page.
                const href = oicHref(o.slug);
                const body = (
                  <>
                    <Boxes size={13} strokeWidth={1.75} />
                    <b>{o.he}</b>
                    <span className="nx-sap" dir="ltr">{o.table}</span>
                  </>
                );
                return href ? (
                  <Link key={o.slug} href={href} className="nu-card nxv-ref nxr-ref-he" prefetch={false}>
                    {body}
                    <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" style={{ marginInlineStart: "auto", opacity: 0.5 }} />
                  </Link>
                ) : (
                  <span key={o.slug} className="nxv-ref nxr-ref-he nxr-inert">{body}</span>
                );
              })}
            </div>
          </div>
        ) : null}

        {r.debugEntry.length ? (
          <div className="nxv-fact">
            <span className="nxv-l">נקודות Debug</span>
            <ul className="nxv-ul">{r.debugEntry.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        ) : null}

        {r.breakpoints.length ? (
          <div className="nxv-fact">
            <span className="nxv-l">Breakpoints</span>
            <ul className="nxv-ul">{r.breakpoints.map((d) => <li key={d} className="nx-sap">{d}</li>)}</ul>
          </div>
        ) : null}
      </section>

      {/* -------------------------------------------------------------- HOOKS */}
      {order.includes("hooks") ? (
        <section className="nxv-sec" aria-labelledby="i-hk">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><Puzzle size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-hk">הרחבות וממשקים</h2>
            <em className="nxv-sec-n">{n("hooks")}</em>
          </div>
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
        </section>
      ) : null}

      {/* ---------------------------------------------------------------- FIX */}
      {r.fix.length ? (
        <section className="nxv-sec" aria-labelledby="i-fx">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><ListChecks size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-fx">צעדי התיקון</h2>
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
            <h2 className="nx-h2" id="i-pv">צעדי מניעה</h2>
            <em className="nxv-sec-n">{n("prevent")}</em>
          </div>
          <ul className="nxv-ul">
            {r.prevention.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </section>
      ) : null}

      {/* ------------------------------------------------- THE S/4HANA PLATE — after symptom, diagnosis and fix
          (design audit §7, 2026-09-21): the reader sees what they see first. */}
      {r.hasS4 ? (
        <section className="nxv-s4" data-s4="1" aria-labelledby="i-s4">
          <div className="nxv-s4-top">
            <span className="nx-eyebrow">S/4HANA · {n("s4")}</span>
            <h2 className="nxv-s4-h" id="i-s4">התנהגות התקלה ב-ECC וב-S/4HANA</h2>
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
            <span className="nxv-sec-i" aria-hidden="true"><GitCompareArrows size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-s4">ECC ו-S/4HANA</h2>
            <em className="nxv-sec-n">{n("s4")}</em>
          </div>
          <Absent what="הבחנה בין ECC ל-S/4HANA" />
          <p className="nx-muted">
            הרשומה אינה מבחינה בין הגרסאות. נדרש אימות נוסף במערכת לפני הסקה שההתנהגות זהה.
          </p>
        </section>
      )}

      {/* ---------------------------------------------------------- SCENARIO */}
      {r.scenario ? (
        <section className="nxv-sec" aria-labelledby="i-sc">
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true"><Quote size={16} strokeWidth={1.75} /></span>
            <h2 className="nx-h2" id="i-sc">תרחיש לדוגמה</h2>
            <em className="nxv-sec-n">{n("scenario")}</em>
          </div>
          <p className="nxv-quote">{r.scenario}</p>
        </section>
      ) : null}

      {/* ------------------------------------------------------------- NOTES */}
      <section className="nxv-sec" aria-labelledby="i-nt">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Info size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="i-nt">איתור SAP Notes</h2>
          <em className="nxv-sec-n">{n("notes")}</em>
        </div>
        {r.notes.length || r.oss.length || r.noteTopics.length ? (
          <>
            <p className="nx-muted">
              מילות חיפוש ל-SAP for Me. הקטלוג אינו כולל מספרי SAP Note; יש לאמת את ה-Note שנמצא
              {" "}לפני יישום.
            </p>
            {r.notes.length ? (
              <div className="nxv-fact">
                <span className="nxv-l">SAP Notes — מילות חיפוש</span>
                <div className="nxv-chips">
                  {r.notes.map((k) => <span key={k} className="nu-chip" dir={enDir(k)} lang={enLang(k)}>{k}</span>)}
                </div>
              </div>
            ) : null}
            {r.oss.length ? (
              <div className="nxv-fact">
                <span className="nxv-l">OSS / SAP Notes — הפניות</span>
                <div className="nxv-chips">
                  {r.oss.map((k) => <span key={k} className="nu-chip" dir={enDir(k)} lang={enLang(k)}>{k}</span>)}
                </div>
              </div>
            ) : null}
            {/* Resolution topics of the SAP Notes catalogue that name this
                incident: component and title, never a note number. */}
            {r.noteTopics.length ? (
              <div className="nxv-fact">
                <span className="nxv-l">SAP Notes קשורים</span>
                <div className="nxv-refs">
                  {r.noteTopics.map((t) => {
                    // A link only when /neo/sap-notes/ generates this topic's page.
                    const href = noteHref(t.slug);
                    const body = (
                      <>
                        <FileSearch size={13} strokeWidth={1.75} />
                        <b>{t.component}</b>
                        <span>{t.he}</span>
                      </>
                    );
                    return href ? (
                      <Link key={t.slug} href={href} className="nu-card nxv-ref" prefetch={false}>
                        {body}
                        <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" style={{ marginInlineStart: "auto", opacity: 0.5, flex: "none" }} />
                      </Link>
                    ) : (
                      <span key={t.slug} className="nxv-ref nxr-inert">{body}</span>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <Absent what="מילות חיפוש ל-SAP Notes" />
        )}
      </section>

      <div className="nxv-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מקור: קטלוג התקלות של הפרויקט. רמת אמון: {TRUST_META[trust.level].he} · סוג מקור: {SOURCE_HE[trust.source]}.
            {" "}אינו בדיקה חיה במערכת SAP; כל צעד טעון אימות בסביבת בדיקות לפני ביצוע בייצור.
          </span>
        </p>
        {totalRefs ? (
          <p>
            {linked} מתוך {totalRefs} הקודים ברשומה מקושרים לעמוד בפרויקט; השאר מוצגים כערך.
          </p>
        ) : null}
      </div>
    </div>
  );
}
