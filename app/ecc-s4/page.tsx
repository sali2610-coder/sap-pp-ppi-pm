import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { ECC_S4_TOPICS, STATUS_HE, STATUS_COLOR } from "@/data/ecc-s4";

export default function Page() {
  const order = ["Data", "PP", "PM", "Platform"] as const;
  const AREA_HE: Record<string, string> = { Data: "נתונים ומילון", PP: "ייצור (PP / PP-PI)", PM: "אחזקה (PM)", Platform: "פלטפורמה ו-UX" };
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · מנוע השוואה" title="ECC מול S/4HANA" sub="מה באמת השתנה במעבר — לכל נושא: סטטוס (ללא שינוי / שונה / הוחלף / הוסר), איך עבד ב-ECC, איך עובד ב-S/4, חלופת Fiori/CDS, ופריט הפישוט הרלוונטי." accent="#2563eb" />
      <div className="mb-6 flex flex-wrap gap-2" dir="rtl">
        {(Object.keys(STATUS_HE) as (keyof typeof STATUS_HE)[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1 text-xs font-bold text-ink-2">
            <span className="size-2 rounded-full" style={{ background: STATUS_COLOR[k] }} />{STATUS_HE[k]}
          </span>
        ))}
      </div>
      {order.map((area) => {
        const items = ECC_S4_TOPICS.filter((t) => t.area === area);
        if (!items.length) return null;
        return (
          <section key={area} className="mb-8" dir="rtl">
            <h2 className="mb-3 text-lg font-extrabold tracking-tight text-ink-1">{AREA_HE[area]}</h2>
            <CardGrid>
              {items.map((t) => <IndexCard key={t.slug} href={`/ecc-s4/${t.slug}/`} he={t.he} title={t.title} desc={t.s4} tag={STATUS_HE[t.status]} tagColor={STATUS_COLOR[t.status]} />)}
            </CardGrid>
          </section>
        );
      })}
    </div>
  );
}
