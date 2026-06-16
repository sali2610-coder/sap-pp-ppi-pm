import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { WORKBENCHES } from "@/data/workbenches";

const SUB: Record<string, string> = {
  Debugging: "אבחון תקלות ABAP/SAP לפי סולם דרגות — מלוגים ומוניטורים אל ה-debugger.",
  QM: "ניהול איכות מקצה-לקצה — מנה לבדיקה, רישום תוצאות, החלטת שימוש ושחרור אצווה.",
  PM: "אחזקה מתקדמת — ציוד ומיקומים, הודעה→פקודה→אישור→סגירה, תכנון אחזקה.",
  "PP-PI": "ייצור תהליכי מתקדם — מתכון, גרסת ייצור, פקודת תהליך, control recipe ו-backflush.",
};

export default function Page() {
  const cards = WORKBENCHES.map((w) => ({
    href: `/workbench/${w.slug}/`,
    he: w.he,
    title: w.title,
    tag: "12 מקטעים",
    tagColor: w.accent,
    desc: SUB[w.module] ?? w.intro,
  }));
  return (
    <div>
      <CenterHeader eyebrow="NEO · שולחן עבודה ליועץ" title="שולחנות עבודה ליועץ" sub="ארבעה שולחנות עבודה ברמת יועץ בכיר — Debugging, QM, PM מתקדם, PP-PI מתקדם. כל אחד עם 12 מקטעים: מושגים, ארכיטקטורה, זרימת תהליך, טבלאות, טרנזקציות, FMs, BAdIs, User Exits, תקלות, נקודות Debug, ECC↔S/4 ו-CBC." accent="#be185d" />
      <CardGrid>
        {cards.map((c) => <IndexCard key={c.href} {...c} />)}
      </CardGrid>
    </div>
  );
}
