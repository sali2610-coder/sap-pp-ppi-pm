import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { ABAP_TOOLS } from "@/data/centers/abap";
export default function Page() {
  return (<div><CenterHeader eyebrow="Final · ABAP Developer Center" title="מרכז מפתח ABAP" sub={`${ABAP_TOOLS.length} כלי פיתוח — SE80/SE38/SE37/SE24/SE11/SE84/SAT/ST05/ST12/SCI/ATC. מטרה, דוגמאות, שימוש Debug, טבלאות ואובייקטים קשורים.`} accent="#7c3aed" /><CenterIndexGrid items={ABAP_TOOLS} base="/abap/" /></div>);
}
