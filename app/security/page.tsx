import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { AUTH_ITEMS } from "@/data/authorizations";

const KIND_COLOR: Record<string, string> = { Tcode: "#dc2626", Concept: "#64748b" };

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · אבטחה" title="מרכז ההרשאות והאבטחה" sub="ניהול משתמשים, תפקידים ואובייקטי הרשאה — SU01, PFCG, SU53, SUIM, SU24, Trace. כל פריט עם מטרה, אבחון כשלים ודוגמאות אחזקה וייצור." accent="#dc2626" />
      <CardGrid>
        {AUTH_ITEMS.map((a) => <IndexCard key={a.slug} href={`/security/${a.slug}/`} he={a.he} title={a.title} desc={a.purpose} tag={a.kind === "Tcode" ? "T-Code" : "מושג"} tagColor={KIND_COLOR[a.kind]} />)}
      </CardGrid>
    </div>
  );
}
