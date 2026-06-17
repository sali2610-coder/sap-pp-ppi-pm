import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { DEBUGGINGS } from "@/data/centers/debugging";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Debugging Center" title="מרכז Debugging" sub={`לכל תהליך — Exits/BAdIs, Function Modules, Breakpoints, נתיב Debug, Call Stack · ${DEBUGGINGS.length} פריטים`} accent="#be185d" />
      <CenterIndexGrid items={DEBUGGINGS} base="/debugging/" />
    </div>
  );
}
