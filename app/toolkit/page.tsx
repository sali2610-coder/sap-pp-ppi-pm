import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { TOOLKIT } from "@/data/centers/toolkit";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Consultant Toolkit" title="ערכת היועץ" sub={`תבניות מוכנות — ראיון, סדנה, בלופרינט, QA, Cutover, Hypercare, Go-Live, ניתוח תקלה · ${TOOLKIT.length} פריטים`} accent="#475569" />
      <CenterIndexGrid items={TOOLKIT} base="/toolkit/" />
    </div>
  );
}
