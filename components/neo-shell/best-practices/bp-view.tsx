/* ============================================================================
   PROJECT NEO · /neo/best-practices — the catalog and the record.
   ----------------------------------------------------------------------------
   SERVER components. The SAP facts are rendered to HTML at build time and the
   browser receives two islands only: the contextual return and the running
   section bar — the same budget the reference record keeps.

   The composition is the .nxt record family (app/neo/data.css +
   app/neo/reference.css): identity header, running SectionNav, .nxt-sec
   sections, .nu-link / .nu-chip for the two forms a SAP identifier can take.
   app/neo/best-practices.css adds placement only.

   ABSENCE IS RENDERED, NOT HIDDEN. A practice whose record leaves a list empty
   gets «לא קיים תיעוד מאומת במאגר» in that list's own place.
   ========================================================================== */

import Link from "next/link";
import {
  AlertTriangle, ArrowLeft, ClipboardCheck, Info, Link2, ListChecks, ShieldCheck,
} from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { EvidenceBlock } from "@/components/neo-shell/evidence/evidence-block";
import { modVar } from "../mod-var";
import type { BpDetail, BpRow, BpXrefV } from "./bp-data";

const nf = new Intl.NumberFormat("he-IL");
const NONE = "לא קיים תיעוד מאומת במאגר";

/* ------------------------------------------------------------ primitives */

/** A cross-reference. A link ONLY when the id resolves to a generated page;
 *  otherwise an inert value chip, and the form itself says so. */
function Ref({ r }: { r: BpXrefV }) {
  if (r.href) {
    return (
      <li>
        <Link href={r.href} prefetch={false} className="nu-link nxr-codelink">
          <span className="nx-sap">{r.name}</span>
          {r.kindHe ? <em className="nbp-kind">{r.kindHe}</em> : null}
          <ArrowLeft size={12} strokeWidth={2} className="nu-arw" aria-hidden="true" />
        </Link>
      </li>
    );
  }
  return (
    <li>
      <span className="nu-chip is-sap">
        {r.name}
        {r.kindHe ? <em className="nbp-kind">{r.kindHe}</em> : null}
      </span>
    </li>
  );
}

function ModChip({ module, moduleHe }: { module: string; moduleHe: string }) {
  return (
    <span className="nu-chip nxt-mod" style={{ "--m": modVar(module) } as React.CSSProperties}>
      <i aria-hidden="true" />
      {module === "Cross" ? moduleHe : `${module} · ${moduleHe}`}
    </span>
  );
}

/* ------------------------------------------------------------ the catalog */

function Row({ r }: { r: BpRow }) {
  return (
    <li className="nbp-item" style={{ "--m": modVar(r.module) } as React.CSSProperties}>
      <Link href={r.href} prefetch={false} className="nu-card nbp-row">
        <span className="nbp-mark" aria-hidden="true" />
        <span className="nbp-body">
          <span className="nbp-t">
            <b>{r.he}</b>
            <em className="nbp-en" dir="ltr">{r.en}</em>
          </span>
          <span className="nbp-sum">{r.summary}</span>
          <span className="nbp-meta">
            <ModChip module={r.module} moduleHe={r.moduleHe} />
            <span className="nu-chip">
              <ListChecks size={11} strokeWidth={1.75} aria-hidden="true" />
              {nf.format(r.steps)} צעדים
            </span>
            <span className="nu-chip">
              <ShieldCheck size={11} strokeWidth={1.75} aria-hidden="true" />
              {nf.format(r.sources)} מקורות
            </span>
            <span className="nu-chip">
              <Link2 size={11} strokeWidth={1.75} aria-hidden="true" />
              {nf.format(r.xrefsLinked)}/{nf.format(r.xrefs)} הפניות מקושרות לעמוד
            </span>
          </span>
        </span>
        <span className="nbp-side">
          <span className="nu-status" style={{ "--s": r.levelDot } as React.CSSProperties}>
            {r.levelHe}
          </span>
          <span className="nu-chip">עומק L{r.depth} · {r.depthHe}</span>
        </span>
        <span className="nbp-go" aria-hidden="true"><ArrowLeft size={15} strokeWidth={2} /></span>
      </Link>
    </li>
  );
}

export function BpCatalog({ rows }: { rows: BpRow[] }) {
  const total = rows.length;
  const steps = rows.reduce((a, r) => a + r.steps, 0);
  const sources = rows.reduce((a, r) => a + r.sources, 0);
  const xrefs = rows.reduce((a, r) => a + r.xrefs, 0);
  const linked = rows.reduce((a, r) => a + r.xrefsLinked, 0);
  const official = rows.filter((r) => r.officialWithUrl > 0).length;

  return (
    <div className="nxt" data-surface="best-practices">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <header className="nxt-head">
        <p className="nx-eyebrow nxt-eyebrow">ידע ולמידה · המעבר ל-S/4HANA</p>
        <h1 className="nbp-h1">שיטות עבודה מומלצות ל-SAP S/4HANA</h1>
        <p className="nbp-lede">
          {nf.format(total)} שיטות עבודה מתועדות בקטלוג.{" "}
          {official === 0
            ? "כולן נגזרות מרשומות מתועדות של המאגר, וטרם צורף להן מקור SAP רשמי מקושר."
            : `${nf.format(official)} מהן מגובות במקור SAP רשמי מקושר, והשאר נגזרות מרשומות המאגר.`}
          {" "}כל שיטה מפרטת צעדי עבודה, דפוסים שגויים ובדיקות, וכל הפניה נפתחת כקישור רק כאשר קיים
          לה עמוד בפרויקט. הקטלוג מורחב בהדרגה לפי משפחות, וכל שיטה תצורף למקורות SAP רשמיים
          בשלב האיסוף.
        </p>
        <div className="nxt-meta">
          <span className="nu-chip">
            <ClipboardCheck size={11} strokeWidth={1.75} aria-hidden="true" />
            {nf.format(total)} שיטות עבודה
          </span>
          <span className="nu-chip">
            <ListChecks size={11} strokeWidth={1.75} aria-hidden="true" />
            {nf.format(steps)} צעדי עבודה
          </span>
          <span className="nu-chip">
            <ShieldCheck size={11} strokeWidth={1.75} aria-hidden="true" />
            {nf.format(sources)} מקורות ברשומות
          </span>
          <span className="nu-chip">
            <Link2 size={11} strokeWidth={1.75} aria-hidden="true" />
            {nf.format(linked)}/{nf.format(xrefs)} הפניות מקושרות לעמוד
          </span>
        </div>
      </header>

      {rows.length ? (
        <ul className="nbp-list">
          {rows.map((r) => <Row key={r.slug} r={r} />)}
        </ul>
      ) : (
        <p className="nxt-absent">{NONE} · שיטות עבודה</p>
      )}

      <footer className="nxt-foot">
        <p>
          רמת האימות והעומק של כל שיטה נמדדות באותו מנגנון ראיות המשמש את קטלוגי העיון
          (lib/evidence): סטטוס, רמת אימות, מקורות ועומק תיעוד.
        </p>
        <p>
          מקור: <span className="nx-sap">data/best-practices</span>: רשומות שנבנו מהפניות מפורשות
          לרשומות המאגר. נדרש אימות במערכת SAP לפני יישום.
        </p>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------- the record */

function SecHead({ id, icon, title, note }: { id: string; icon: React.ReactNode; title: string; note?: string }) {
  return (
    <h2 className="nx-h2 nxt-sec-h" id={id}>
      <span className="nxt-sec-i" aria-hidden="true">{icon}</span>
      {title}
      {note ? <em className="nxt-sec-n">{note}</em> : null}
    </h2>
  );
}

export function BpDetailView({ d }: { d: BpDetail }) {
  const m = modVar(d.module);
  const linked = d.xrefs.filter((x) => x.href).length;

  const nav = [
    { id: "bp-about", label: "מהות השיטה" },
    { id: "bp-steps", label: "צעדי העבודה" },
    { id: "bp-anti", label: "דפוסים שגויים" },
    { id: "bp-checks", label: "בדיקות" },
    { id: "bp-xrefs", label: "רשומות מקושרות" },
    { id: "bp-evidence", label: "אימות ומקורות" },
  ];

  return (
    <article className="nxt" data-surface="best-practice" style={{ "--m": m } as React.CSSProperties}>
      <SmartReturn
        fallback={{ href: "/neo/best-practices/", label: "שיטות עבודה מומלצות" }}
        hint="לא נשמר מסלול הגעה בביקור הזה"
      />

      {/* ------------------------------------------------------ 1. IDENTITY */}
      <header className="nxt-head">
        <span className="nx-modbar" aria-hidden="true" />
        <p className="nx-eyebrow nxt-eyebrow">שיטות עבודה מומלצות · {d.moduleHe}</p>
        <h1 className="nbp-h1">{d.he}</h1>
        <p className="nxt-en" dir="ltr">{d.en}</p>
        <div className="nxt-meta">
          <span className="nu-status" style={{ "--s": d.evidence.level.dot } as React.CSSProperties}>
            {d.evidence.level.he}
          </span>
          <ModChip module={d.module} moduleHe={d.moduleHe} />
          <span className="nu-chip">
            <ListChecks size={11} strokeWidth={1.75} aria-hidden="true" />
            {nf.format(d.steps.length)} צעדים
          </span>
          <span className="nu-chip">
            <ShieldCheck size={11} strokeWidth={1.75} aria-hidden="true" />
            {nf.format(d.claims.length)} מקורות
          </span>
          <span className="nxt-known">
            <span className="nx-sr">עדכון אחרון </span>עודכן {d.lastVerifiedAt}
          </span>
        </div>
      </header>

      <SectionNav sections={nav} />

      {/* ------------------------------------------------------ 2. THE WHAT */}
      <section className="nxt-sec" id="bp-about" aria-labelledby="bp-about-h">
        <SecHead id="bp-about-h" icon={<Info size={15} strokeWidth={1.75} />} title="מהות השיטה" />
        <p className="nxr-text nbp-sumline">{d.summary}</p>
        <div className="nbp-fact">
          <span className="nxt-l">הקשר ורקע, מרשומות המאגר</span>
          <p className="nxt-v nxr-text">{d.context || NONE}</p>
        </div>
      </section>

      {/* ------------------------------------------------------- 3. THE HOW */}
      <section className="nxt-sec" id="bp-steps" aria-labelledby="bp-steps-h">
        <SecHead
          id="bp-steps-h"
          icon={<ListChecks size={15} strokeWidth={1.75} />}
          title="צעדי העבודה"
          note={`${nf.format(d.steps.length)} צעדים`}
        />
        {d.steps.length ? (
          <ol className="nxt-ol nbp-steps">
            {d.steps.map((s) => (
              <li key={s.n}>
                <span className="nxr-text">{s.he}</span>
                {s.xrefs.length ? (
                  <ul className="nxt-codes nxr-codes nbp-refs" aria-label={`הפניות לצעד ${s.n}`}>
                    {s.xrefs.map((r) => <Ref key={r.id} r={r} />)}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        ) : (
          <p className="nxt-absent">{NONE} · צעדי עבודה</p>
        )}
      </section>

      {/* ------------------------------------------------- 4. ANTI-PATTERNS */}
      <section className="nxt-sec" id="bp-anti" aria-labelledby="bp-anti-h">
        <SecHead
          id="bp-anti-h"
          icon={<AlertTriangle size={15} strokeWidth={1.75} />}
          title="דפוסים שגויים"
          note={d.antiPatterns.length ? `${nf.format(d.antiPatterns.length)} דפוסים` : undefined}
        />
        {d.antiPatterns.length ? (
          <ul className="nxt-ul">
            {d.antiPatterns.map((x) => <li key={x.slice(0, 40)}>{x}</li>)}
          </ul>
        ) : (
          <p className="nxt-absent">{NONE} · דפוסים שגויים</p>
        )}
      </section>

      {/* ------------------------------------------------------- 5. CHECKS */}
      <section className="nxt-sec" id="bp-checks" aria-labelledby="bp-checks-h">
        <SecHead
          id="bp-checks-h"
          icon={<ClipboardCheck size={15} strokeWidth={1.75} />}
          title="בדיקות ואימות בשטח"
          note={d.checks.length ? `${nf.format(d.checks.length)} בדיקות` : undefined}
        />
        {d.checks.length ? (
          <ul className="nxt-ul">
            {d.checks.map((x) => <li key={x.slice(0, 40)}>{x}</li>)}
          </ul>
        ) : (
          <p className="nxt-absent">{NONE} · בדיקות</p>
        )}
      </section>

      {/* -------------------------------------------------------- 6. XREFS */}
      <section className="nxt-sec" id="bp-xrefs" aria-labelledby="bp-xrefs-h">
        <SecHead
          id="bp-xrefs-h"
          icon={<Link2 size={15} strokeWidth={1.75} />}
          title="רשומות מקושרות"
          note={`${nf.format(linked)}/${nf.format(d.xrefs.length)} עם עמוד`}
        />
        {d.xrefs.length ? (
          <>
            <p className="nx-muted">
              הפניה שקיים לה עמוד בקטלוגי הפרויקט נפתחת כקישור. הפניה אחרת מוצגת כערך ללא קישור.
            </p>
            <ul className="nxt-codes nxr-codes" aria-label="רשומות מקושרות">
              {d.xrefs.map((r) => <Ref key={r.id} r={r} />)}
            </ul>
          </>
        ) : (
          <p className="nxt-absent">{NONE} · רשומות מקושרות</p>
        )}
      </section>

      {/* ----------------------------------------------------- 7. EVIDENCE */}
      <section className="nxt-sec" id="bp-evidence" aria-labelledby="bp-evidence-h">
        <SecHead id="bp-evidence-h" icon={<ShieldCheck size={15} strokeWidth={1.75} />} title="אימות ומקורות" />
        <EvidenceBlock e={d.evidence} />
        {d.claims.length ? (
          <div className="nxt-block">
            <h3 className="nxt-sub">הטענה שכל מקור תומך בה</h3>
            <ul className="nbp-claims">
              {d.claims.map((c, i) => (
                <li key={`${c.title}-${i}`}>
                  <span className="nbp-claim-t">{c.title}</span>
                  <span className="nbp-claim-m">
                    <span className="nu-status" style={{ "--s": c.levelDot } as React.CSSProperties}>
                      {c.levelHe}
                    </span>
                    {c.sapNote ? <span className="nu-chip is-sap">SAP Note {c.sapNote}</span> : null}
                  </span>
                  <span className="nbp-claim-c">{c.claim}</span>
                  {c.repoRef ? (
                    <span className="nx-sap nbp-claim-ref" dir="ltr">{c.repoRef}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {/* ------------------------------------------------------ 8. HONESTY */}
      <footer className="nxt-foot">
        {d.notes ? (
          <p className="nxt-src">
            <Info size={13} strokeWidth={1.75} aria-hidden="true" />
            {d.notes}
          </p>
        ) : null}
        <p>
          {nf.format(linked)} מתוך {nf.format(d.xrefs.length)} ההפניות של השיטה מקושרות לעמוד
          בפרויקט; השאר מוצגות כערך.
        </p>
        <p>
          מקור: <span className="nx-sap">data/best-practices</span> · סוקר: {d.reviewer}.
          {" "}נדרש אימות במערכת SAP לפני יישום.
        </p>
      </footer>
    </article>
  );
}
