/* ============================================================================
   PROJECT NEO · /neo/best-practices/<slug>/ — the record.
   ----------------------------------------------------------------------------
   SERVER components. The SAP facts are rendered to HTML at build time and the
   browser receives two islands only: the contextual return and the running
   section bar — the same budget the reference record keeps. The catalog that
   lists the records is the client island in ./bp-catalog.tsx (2026-10).

   The composition is the .nxt record family (app/neo/data.css +
   app/neo/reference.css): identity header, running SectionNav, .nxt-sec
   sections, .nu-link / .nu-chip for the two forms a SAP identifier can take.
   app/neo/best-practices.css adds placement only.

   ABSENCE IS RENDERED, NOT HIDDEN. A practice whose record leaves a list empty
   gets «לא קיים תיעוד מאומת במאגר» in that list's own place.

   THE RECORD LANGUAGE (2026-10, components/neo-shell/record-kit.tsx and
   app/neo/record.css): the summary is the hero's lede and the verification
   level its verdict, a ledger of the practice's own counts (each a door to its
   section), every question as the catalog's Sig, the process profile in two
   balanced columns, the sources after the sixth behind one disclosure, and
   the credit at the foot.
   ========================================================================== */

import Link from "next/link";
import {
  AlertTriangle, ArrowLeft, BookOpen, ClipboardCheck, Info, LayoutList, Link2, ListChecks, ShieldCheck,
} from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { EvidenceBlock } from "@/components/neo-shell/evidence/evidence-block";
import { modVar } from "../mod-var";
import { RecordHead } from "../record-kit";
import { CatalogFoot, Ledger, Sig } from "../data/catalog-kit";
import type { BpDetail, BpLineV, BpXrefV } from "./bp-data";

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
      {module === "Cross" ? moduleHe : <><bdi dir="ltr">{module}</bdi> · {moduleHe}</>}
    </span>
  );
}

/* ------------------------------------------------------------- the record */

/** The sources shown before the disclosure. */
const CLAIMS_OPEN = 6;

function Claim({ c }: { c: BpDetail["claims"][number] }) {
  return (
    <li>
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
  );
}

/** One line of a profile field: the sentence, then the ids it names, each a
 *  link only when a page exists (the same Ref the steps use). */
function Line({ l, label }: { l: BpLineV; label: string }) {
  return (
    <li>
      <span className="nxr-text">{l.he}</span>
      {l.xrefs.length ? (
        <ul className="nxt-codes nxr-codes nbp-refs" aria-label={`הפניות · ${label}`}>
          {l.xrefs.map((r) => <Ref key={r.id} r={r} />)}
        </ul>
      ) : null}
    </li>
  );
}

/** The §11 process profile. Every field the record fills is a titled list;
 *  the fields it leaves empty are named in one line, so the gap is visible
 *  instead of silently absent. */
function ProcessProfile({ p }: { p: NonNullable<BpDetail["process"]> }) {
  return (
    <Sig
      id="bp-process"
      icon={<LayoutList size={15} strokeWidth={1.75} />}
      title="פרופיל התהליך"
      count={`${nf.format(p.filled)} מתוך ${nf.format(p.total)} שדות מתועדים`}
    >
      <div className="nbp-fact">
        <span className="nxt-l">מטרה</span>
        <p className="nxt-v nxr-text">{p.purpose}</p>
      </div>
      <dl className="nbp-prof">
        {p.fields.map((f) => (
          <div className="nbp-prof-f" key={f.key} data-field={f.key}>
            <dt className="nxt-l">{f.label}</dt>
            <dd>
              <ul className="nxt-ul nbp-prof-l">
                {f.lines.map((l, i) => <Line key={`${f.key}-${i}`} l={l} label={f.label} />)}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
      <div className="nbp-fact nbp-ref">
        <span className="nxt-l">
          <BookOpen size={13} strokeWidth={1.75} aria-hidden="true" /> הפניה רשמית לתהליך
        </span>
        {p.reference ? (
          <p className="nxt-v nxr-text">
            {p.reference.url ? (
              <a href={p.reference.url} target="_blank" rel="noopener noreferrer" className="nu-link" dir="ltr">
                {p.reference.title}
                <span className="nx-sr"> (נפתח בכרטיסייה חדשה)</span>
              </a>
            ) : (
              <span dir="ltr">{p.reference.title}</span>
            )}
            {" "}
            <span className="nu-status" style={{ "--s": p.reference.levelDot } as React.CSSProperties}>
              {p.reference.levelHe}
            </span>
            {p.reference.note ? <span className="nbp-ref-n"> {p.reference.note}</span> : null}
          </p>
        ) : (
          <p className="nxt-absent">
            טרם אותרה ואומתה הפניה רשמית של SAP לתהליך זה; היא תתווסף בשלב האיסוף ולא מושלמת מהזיכרון.
          </p>
        )}
      </div>
      {p.gaps.length ? (
        <p className="nxt-absent nbp-gaps">
          שדות שהמאגר אינו מתעד עדיין לתהליך זה: {p.gaps.join(" · ")}.
        </p>
      ) : null}
    </Sig>
  );
}

export function BpDetailView({ d }: { d: BpDetail }) {
  const m = modVar(d.module);
  const linked = d.xrefs.filter((x) => x.href).length;

  const nav = [
    { id: "bp-about", label: "מהות השיטה" },
    ...(d.process ? [{ id: "bp-process", label: "פרופיל התהליך" }] : []),
    { id: "bp-steps", label: "צעדי העבודה" },
    { id: "bp-anti", label: "דפוסים שגויים" },
    { id: "bp-checks", label: "בדיקות" },
    { id: "bp-xrefs", label: "רשומות מקושרות" },
    { id: "bp-evidence", label: "אימות ומקורות" },
  ];

  return (
    <article className="nxt nrc nm-scene" data-scene="cream" data-surface="best-practice" style={{ "--m": m } as React.CSSProperties}>
      <SmartReturn
        fallback={{ href: "/neo/best-practices/", label: "שיטות עבודה מומלצות" }}
        hint="לא נשמר מסלול הגעה בביקור הזה"
      />

      {/* ------------------------------------------------------ 1. IDENTITY
          The summary is the lede and the verification level the verdict, so
          what the practice is and how far it is verified are read before any
          section. */}
      <RecordHead
        icon={<ClipboardCheck size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow={`שיטות עבודה מומלצות · ${d.moduleHe}`}
        title={d.he}
        en={d.en || undefined}
        lede={d.summary}
        meta={
          <>
            <ModChip module={d.module} moduleHe={d.moduleHe} />
            <span className="nu-chip">
              <ListChecks size={11} strokeWidth={1.75} aria-hidden="true" />
              {nf.format(d.steps.length)} צעדים
            </span>
            <span className="nu-chip">
              <ShieldCheck size={11} strokeWidth={1.75} aria-hidden="true" />
              {nf.format(d.claims.length)} מקורות
            </span>
            {/* The field is the date the record was last VERIFIED, and says so. */}
            <span className="nxt-known">
              <span className="nx-sr">תאריך האימות האחרון </span>אומת לאחרונה {d.lastVerifiedAt}
            </span>
          </>
        }
        verdict={
          <>
            <span className="nu-status" style={{ "--s": d.evidence.level.dot } as React.CSSProperties}>
              {d.evidence.level.he}
            </span>
            <a className="nu-link" href="#bp-evidence">
              אימות ומקורות
              <ArrowLeft className="nu-arw" size={13} strokeWidth={2} aria-hidden="true" />
            </a>
          </>
        }
      >
        <Ledger
          label="השיטה במספרים. כל מספר מוביל לחלק שלו בעמוד"
          items={[
            ...(d.process ? [{ v: d.process.filled, l: "שדות בפרופיל התהליך", href: "#bp-process" }] : []),
            { v: d.steps.length, l: "צעדי עבודה", href: "#bp-steps" },
            { v: d.antiPatterns.length, l: "דפוסים שגויים", href: "#bp-anti" },
            { v: d.checks.length, l: "בדיקות", href: "#bp-checks" },
            { v: d.xrefs.length, l: "רשומות מקושרות", href: "#bp-xrefs" },
            { v: d.claims.length, l: "מקורות", href: "#bp-evidence" },
          ]}
        />
      </RecordHead>

      <SectionNav sections={nav} />

      {/* ------------------------------------------------------ 2. THE WHAT */}
      <Sig id="bp-about" icon={<Info size={15} strokeWidth={1.75} />} title="מהות השיטה">
        <div className="nbp-fact">
          <span className="nxt-l">הקשר ורקע, מרשומות המאגר</span>
          <p className="nxt-v nxr-text">{d.context || NONE}</p>
        </div>
      </Sig>

      {/* ------------------------------------------------ 2b. THE PROCESS */}
      {d.process ? <ProcessProfile p={d.process} /> : null}

      {/* ------------------------------------------------------- 3. THE HOW */}
      <Sig
        id="bp-steps"
        icon={<ListChecks size={15} strokeWidth={1.75} />}
        title="צעדי העבודה"
        count={`${nf.format(d.steps.length)} צעדים`}
      >
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
      </Sig>

      {/* ------------------------------------------------- 4. ANTI-PATTERNS */}
      <Sig
        id="bp-anti"
        icon={<AlertTriangle size={15} strokeWidth={1.75} />}
        title="דפוסים שגויים"
        count={d.antiPatterns.length ? `${nf.format(d.antiPatterns.length)} דפוסים` : undefined}
      >
        {d.antiPatterns.length ? (
          <ul className="nxt-ul">
            {d.antiPatterns.map((x) => <li key={x.slice(0, 40)}>{x}</li>)}
          </ul>
        ) : (
          <p className="nxt-absent">{NONE} · דפוסים שגויים</p>
        )}
      </Sig>

      {/* ------------------------------------------------------- 5. CHECKS */}
      <Sig
        id="bp-checks"
        icon={<ClipboardCheck size={15} strokeWidth={1.75} />}
        title="בדיקות ואימות בשטח"
        count={d.checks.length ? `${nf.format(d.checks.length)} בדיקות` : undefined}
      >
        {d.checks.length ? (
          <ul className="nxt-ul">
            {d.checks.map((x) => <li key={x.slice(0, 40)}>{x}</li>)}
          </ul>
        ) : (
          <p className="nxt-absent">{NONE} · בדיקות</p>
        )}
      </Sig>

      {/* -------------------------------------------------------- 6. XREFS */}
      <Sig
        id="bp-xrefs"
        icon={<Link2 size={15} strokeWidth={1.75} />}
        title="רשומות מקושרות"
        count={`${nf.format(linked)}/${nf.format(d.xrefs.length)} עם עמוד`}
        lede={d.xrefs.length ? "הפניה שקיים לה עמוד בקטלוגי הפרויקט נפתחת כקישור. הפניה אחרת מוצגת כערך ללא קישור." : undefined}
      >
        {d.xrefs.length ? (
          <ul className="nxt-codes nxr-codes" aria-label="רשומות מקושרות">
            {d.xrefs.map((r) => <Ref key={r.id} r={r} />)}
          </ul>
        ) : (
          <p className="nxt-absent">{NONE} · רשומות מקושרות</p>
        )}
      </Sig>

      {/* ----------------------------------------------------- 7. EVIDENCE */}
      <Sig id="bp-evidence" icon={<ShieldCheck size={15} strokeWidth={1.75} />} title="אימות ומקורות">
        <EvidenceBlock e={d.evidence} />
        {d.claims.length ? (
          <div className="nxt-block">
            <h3 className="nxt-sub">הטענה שכל מקור תומך בה</h3>
            <ul className="nbp-claims">
              {d.claims.slice(0, CLAIMS_OPEN).map((c, i) => <Claim key={`${c.title}-${i}`} c={c} />)}
            </ul>
            {d.claims.length > CLAIMS_OPEN ? (
              <details className="nrc-more">
                <summary>
                  <span>עוד {nf.format(d.claims.length - CLAIMS_OPEN)} מקורות והטענה שכל אחד מהם תומך בה</span>
                </summary>
                <ul className="nbp-claims">
                  {d.claims.slice(CLAIMS_OPEN).map((c, i) => <Claim key={`${c.title}-${i + CLAIMS_OPEN}`} c={c} />)}
                </ul>
              </details>
            ) : null}
          </div>
        ) : null}
      </Sig>

      {/* ------------------------------------------------------ 8. HONESTY */}
      <CatalogFoot
        notes={[
          ...(d.notes ? [<>{d.notes}</>] : []),
          <>
            {nf.format(linked)} מתוך {nf.format(d.xrefs.length)} ההפניות של השיטה מקושרות לעמוד
            בפרויקט; השאר מוצגות כערך.
          </>,
        ]}
      >
        מקור: <span className="nx-sap">data/best-practices</span> · סוקר: {d.reviewer}.
        {" "}נדרש אימות במערכת SAP לפני יישום.
      </CatalogFoot>
    </article>
  );
}
