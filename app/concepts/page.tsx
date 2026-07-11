import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { CONCEPTS } from "@/data/concepts";

const GROUP_HE: Record<string, string> = { Data: "נתונים ומילון", Code: "קוד וממשקים", Enhancement: "הרחבות", "PM/PP": "אחזקה וייצור" };
const GROUP_COLOR: Record<string, string> = { Data: "#0891b2", Code: "#2563eb", Enhancement: "#7c3aed", "PM/PP": "#f97316" };

export default function Page() {
  const groups = ["Data", "Code", "Enhancement", "PM/PP"] as const;
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · מושגים" title="מרכז מושגי SAP" sub="הבסיס המושגי למיגרציה ולעבודה היומיומית — כל מושג עם הסבר עסקי, טכני, מצב ECC מול S/4, דוגמאות ואובייקטים קשורים." accent="#0891b2" />
      {groups.map((g) => {
        const items = CONCEPTS.filter((c) => c.group === g);
        if (!items.length) return null;
        return (
          <section key={g} className="mb-8" dir="rtl">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink-1">
              <span className="size-2.5 rounded-full" style={{ background: GROUP_COLOR[g] }} />{GROUP_HE[g]}
            </h2>
            <CardGrid>
              {items.map((c) => <IndexCard key={c.slug} href={`/concepts/${c.slug}/`} he={c.he} title={c.title} desc={c.biz} tag={GROUP_HE[g]} tagColor={GROUP_COLOR[g]} />)}
            </CardGrid>
          </section>
        );
      })}
    </div>
  );
}
