/* THE TWO FACTS EVERY RECORD HEADER STATES THE SAME WAY.
   DESIGN-SPEC §2 asks for one header template across record types (table,
   object, transaction, BAPI and FM, CDS, IDoc, Fiori, enhancement); knowledge
   gate 2 (finding 6) measured that only table pages carried the S/4HANA pill in
   the header and that the verification tier sat in a different place on every
   type. This renders both from the record's own evidence block, the one its
   "אימות ומקורות" section shows further down, so the header can never state a
   status or a tier the page's evidence does not. */
import { StatusPill } from "./status-pill";
import type { EvidenceBlockData } from "@/lib/evidence/types";

export function RecordStatus({ e }: { e: EvidenceBlockData }) {
  return (
    <>
      <StatusPill status={e.status.key} label={e.status.label} dot={e.status.dot} />
      <span className="nu-status" style={{ "--s": e.level.dot } as React.CSSProperties}>
        {e.level.he}
      </span>
    </>
  );
}
