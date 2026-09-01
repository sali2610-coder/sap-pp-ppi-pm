/* ============================================================================
   PROJECT NEO · THE EVIDENCE BLOCK — one component, every catalog.
   ----------------------------------------------------------------------------
   A SERVER component with no client JS. It renders the EvidenceBlockData a
   builder computed through lib/evidence's evidenceBlock(): the unified S/4HANA
   status, the edition and release the claim is scoped to, the recommended
   action, the successor when one is recorded, the verification tier, the
   sources with their access dates, and the record's measured depth.

   HONESTY RULES, inherited from the surfaces that host it:
     · A successor with no generated page renders as a value (.nu-chip.is-sap),
       never as a link that opens nothing.
     · A record at verification_required says «נדרש אימות נוסף» out loud, and
       when it holds no source at all it says «לא קיים תיעוד מאומת במאגר».
     · Sources are capped at 6 visible; the rest are counted, not hidden.
     · Nothing here invents a fact: every string arrives from the block data.
   ========================================================================== */

import Link from "next/link";
import { EDITION_HE, type EvidenceBlockData, type SourceType } from "@/lib/evidence/types";
import "@/app/neo/evidence.css";

/** UI names for the source kinds. Vocabulary, not SAP data. */
const SOURCE_HE: Record<SourceType, string> = {
  sap_help: "SAP Help Portal",
  sap_api_hub: "SAP Business Accelerator Hub",
  fiori_library: "SAP Fiori Apps Library",
  sap_note: "SAP Note",
  kba: "SAP KBA",
  simplification_item: "פריט פישוט (Simplification Item)",
  sap_press_book: "ספרות מקצועית",
  repository: "נתוני הפרויקט",
  sap_community: "SAP Community",
};

const MAX_VISIBLE_SOURCES = 6;

export function EvidenceBlock({ e }: { e: EvidenceBlockData }) {
  const visible = e.sources.slice(0, MAX_VISIBLE_SOURCES);
  const hidden = e.sources.length - visible.length;

  return (
    <section
      className="nev"
      aria-label="אימות ומקורות"
      data-needs={e.needsVerification ? "1" : undefined}
    >
      <p className="nev-eyebrow">אימות ומקורות</p>

      {/* status pill, the claim's scope, the verification tier, the depth */}
      <div className="nev-head">
        <span className="nu-status" style={{ "--s": e.status.dot } as React.CSSProperties}>
          {e.status.label}
        </span>
        <span className="nu-chip">{EDITION_HE[e.status.edition]}</span>
        {e.status.release ? <span className="nu-chip is-sap">{e.status.release}</span> : null}
        <span className="nu-status" style={{ "--s": e.level.dot } as React.CSSProperties}>
          {e.level.he}
        </span>
        <span className="nu-chip">
          <span className="nev-num">L{e.depth.level}</span> · {e.depth.he}
        </span>
      </div>

      {/* the claim's own explanation, then the recommended action */}
      {e.status.he ? <p className="nev-exp">{e.status.he}</p> : null}
      <p className="nev-act">
        <b>פעולה מומלצת:</b> {e.status.action}
      </p>

      {/* the successor, when the record carries one */}
      {e.status.successor ? (
        <p className="nev-succ">
          <span className="nev-l">האובייקט העוקב לפי הרשומה</span>
          {e.status.successor.href ? (
            <Link href={e.status.successor.href} prefetch={false} className="nu-link">
              <span className="nx-sap">{e.status.successor.label}</span>
            </Link>
          ) : (
            <span className="nu-chip is-sap">{e.status.successor.label}</span>
          )}
        </p>
      ) : null}

      {/* the sources, capped at 6 visible */}
      {e.sources.length ? (
        <div className="nev-srcwrap">
          <p className="nev-l">מקורות הרשומה</p>
          <ul className="nev-src">
            {visible.map((s, i) => (
              <li key={`${s.title}-${i}`}>
                {s.url ? (
                  <a href={s.url} rel="noopener noreferrer" target="_blank" className="nev-a">
                    {s.title}
                  </a>
                ) : (
                  <span className="nev-t">{s.title}</span>
                )}
                <span className="nev-meta">{SOURCE_HE[s.kind]}</span>
                {s.release ? <span className="nev-meta nev-num">{s.release}</span> : null}
                <span className="nev-meta">
                  נגיש בתאריך <span className="nev-num">{s.accessedAt}</span>
                </span>
              </li>
            ))}
          </ul>
          {hidden > 0 ? <p className="nev-more">ועוד {hidden} מקורות ברשומה</p> : null}
        </div>
      ) : null}

      {/* the verification_required state, said out loud */}
      {e.needsVerification ? (
        <p className="nev-warn">
          נדרש אימות נוסף מול תיעוד SAP או מערכת S/4HANA לפני החלטת מעבר.
          {e.sources.length === 0 ? " לא קיים תיעוד מאומת במאגר עבור רשומה זו." : ""}
        </p>
      ) : null}

      {/* provenance footer: when, by whom, and whether the sources disagree */}
      {e.lastVerifiedAt || e.reviewer || e.conflicts > 0 ? (
        <p className="nev-foot">
          {e.lastVerifiedAt ? (
            <span>
              אומת לאחרונה בתאריך <span className="nev-num">{e.lastVerifiedAt}</span>
            </span>
          ) : null}
          {e.reviewer ? <span>סוקר: {e.reviewer}</span> : null}
          {e.conflicts > 0 ? (
            <span className="nu-status" style={{ "--s": "var(--status-removed)" } as React.CSSProperties}>
              {e.conflicts} מקורות עם עדות סותרת
            </span>
          ) : null}
        </p>
      ) : null}
    </section>
  );
}
