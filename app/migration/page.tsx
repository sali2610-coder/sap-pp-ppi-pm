import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { MIGRATIONS } from "@/data/centers/migration";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="S/4HANA Migration Center" title="מרכז מיגרציה S/4HANA" sub={`לכל נושא — נשאר/משתנה/הוסר, Fiori/CDS/API חדשים, סיכונים ו-QA Checklist · ${MIGRATIONS.length} פריטים`} accent="#2563eb" />
      <CenterIndexGrid items={MIGRATIONS} base="/migration/" />
    </div>
  );
}
