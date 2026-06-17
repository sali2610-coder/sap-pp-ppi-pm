import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { PROCESS_AUTH } from "@/data/centers/process-auth";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Authorization Center" title="מרכז הרשאות לתהליכים" sub={`לכל תהליך PM/PP-PI — אובייקטי הרשאה, כשלים נפוצים, נתיב אבחון SU53→PFCG · ${PROCESS_AUTH.length} פריטים`} accent="#dc2626" />
      <CenterIndexGrid items={PROCESS_AUTH} base="/authorizations/" />
    </div>
  );
}
