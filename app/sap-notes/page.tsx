import { forWhiteText } from "@/lib/contrast";
import Link from "next/link";
import { CenterHeader } from "@/components/knowledge";
import { SAP_NOTES } from "@/data/sap-notes";
import { incidentBySlug } from "@/data/troubleshooting";

const ACC = "#b45309";

const MOD_COLOR: Record<string, string> = {
  PM: "#ea580c", PP: "#7c3aed", "PP-PI": "#2563eb", QM: "#0d9488", Cross: "#475569",
};

export default function Page() {
  return (
    <div dir="rtl">
      <CenterHeader
        eyebrow="מרכז הידע · SAP Notes Center"
        title="מרכז SAP Notes — נתיבי פתרון"
        sub={`${SAP_NOTES.length} נושאי פתרון ל-PM/PP/PP-PI לפי רכיב SAP (Application Component) ומילות חיפוש מאומתות ל-OSS — תסמין, שורש, רלוונטיות ECC↔S/4 ושלבי פתרון. ללא מספרי Note מומצאים: חיפוש לפי מילות מפתח + רכיב באתר ה-Launchpad.`}
        accent={ACC}
      />

      <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
        <b>שיטה:</b> כל כרטיס ממפה תסמין → רכיב SAP מדויק (למשל <span className="tech" dir="ltr">PP-PI-PMA-CON</span>) + מילות חיפוש ל-OSS. אנו <b>לא ממציאים מספרי Note</b> — מאתרים אותם לפי הרכיב והמילים ב-launchpad.support.sap.com. כרטיסים מקושרים לתקלות במרכז פתרון התקלות.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {SAP_NOTES.map((n) => (
          <section key={n.slug} className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-base font-extrabold tracking-tight text-ink-1">{n.he}</h2>
              <span className="tech shrink-0 rounded-lg px-2 py-0.5 text-xs font-bold text-white" dir="ltr" style={{ background: forWhiteText(MOD_COLOR[n.module] ?? ACC) }}>{n.module}</span>
            </div>
            <p className="tech mb-2 text-xs font-bold text-amber-700" dir="ltr">{n.component} · {n.title}</p>

            <p className="text-sm leading-relaxed text-ink-2"><b className="text-ink-1">תסמין:</b> {n.symptom}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-2"><b className="text-ink-1">שורש:</b> {n.cause}</p>

            <div className="mt-3">
              <p className="mb-1 text-xs font-bold text-ink-3">מילות חיפוש OSS</p>
              <div className="flex flex-wrap gap-1.5">
                {n.keywords.map((k) => (
                  <span key={k} className="tech rounded-md border border-hairline bg-surface-2 px-2 py-0.5 text-[11px] font-semibold text-ink-2" dir="ltr">{k}</span>
                ))}
              </div>
            </div>

            <p className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs leading-relaxed text-blue-800"><b>ECC ↔ S/4:</b> {n.relevance}</p>

            <ul className="mt-3 space-y-1">
              {n.resolution.map((r, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: ACC }} />{r}</li>
              ))}
            </ul>

            {n.relatedIncidents && n.relatedIncidents.length > 0 && (
              <div className="mt-3 border-t border-hairline pt-2.5">
                <p className="mb-1 text-xs font-bold text-ink-3">תקלות מקושרות</p>
                <div className="flex flex-wrap gap-1.5">
                  {n.relatedIncidents.map((slug) => {
                    const inc = incidentBySlug(slug);
                    return inc
                      ? <Link key={slug} href={`/troubleshooting/${slug}/`} className="tap rounded-lg border border-red-200 bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand hover:bg-red-100">{inc.he}</Link>
                      : <span key={slug} className="tech rounded-lg border border-dashed border-hairline bg-surface px-2.5 py-1 text-xs font-semibold text-ink-3" dir="ltr">{slug}</span>;
                  })}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
