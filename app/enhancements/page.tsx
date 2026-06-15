import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { ENHANCEMENTS } from "@/data/enhancements";

const KIND_COLOR: Record<string, string> = { Exit: "#d97706", BAdI: "#7c3aed", Framework: "#2563eb" };

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · הרחבות" title="מרכז ההרחבות" sub="טכניקות התאמת SAP ללא שבירת הליבה — User/Customer Exits, BAdI, Enhancement Framework. כל טכניקה עם דרך מימוש, מצב ECC/S4, ודוגמאות אחזקה וייצור." accent="#7c3aed" />
      <CardGrid>
        {ENHANCEMENTS.map((e) => <IndexCard key={e.slug} href={`/enhancements/${e.slug}/`} he={e.he} title={e.title} desc={e.def} tag={e.kind} tagColor={KIND_COLOR[e.kind]} />)}
      </CardGrid>
    </div>
  );
}
