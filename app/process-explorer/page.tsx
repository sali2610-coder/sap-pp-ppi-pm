import { CenterHeader } from "@/components/knowledge";
import { ProcessFlowExplorer } from "@/components/process-flow-explorer";
import { PROCESS_MAPS } from "@/data/processes";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Phase 7 · Process Explorer" title="מפות תהליך מקצה-לקצה" sub={`${PROCESS_MAPS.length} תהליכי E2E — P2P, O2C, Plan-to-Produce, QM, אחזקה. חיפוש חי על שלבים, T-Codes וטבלאות · בחר תהליך וצלול שלב-אחר-שלב.`} accent="#4338ca" />
      <ProcessFlowExplorer />
    </div>
  );
}
