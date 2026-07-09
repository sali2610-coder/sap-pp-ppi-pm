import Link from "next/link";
import { CenterHeader } from "@/components/knowledge";
import { listFuncs, funcIntel } from "@/lib/object-intel";

export const metadata = { title: "BAPIs / Function Modules · NEO" };

type Row = { name: string; he: string; modules: string[] };
function rows(kind: "BAPI" | "FM"): Row[] {
  return listFuncs(kind)
    .map((n) => { const i = funcIntel(n); return { name: n, he: i?.tables?.[0]?.he || "", modules: i?.modules || [] }; })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function Group({ label, en, data }: { label: string; en: string; data: Row[] }) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline gap-2">
        <h2 className="text-[15px] font-extrabold tracking-tight text-ink-1">{label}</h2>
        <span className="text-[11px] font-medium uppercase tracking-wide text-ink-3">{en} · {data.length}</span>
      </div>
      {data.length ? (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((r) => (
            <Link key={r.name} href={`/bapi/${encodeURIComponent(r.name)}/`} className="card-interactive group flex items-center gap-2.5 p-2.5" dir="rtl">
              <span className="size-1.5 shrink-0 rounded-full bg-brand" />
              <div className="min-w-0 flex-1">
                <span className="tech block truncate font-mono text-[13px] font-bold text-ink-1" dir="ltr">{r.name}</span>
                {(r.he || r.modules.length > 0) && <span className="block truncate text-[11.5px] text-ink-3">{[r.modules.join(" · "), r.he].filter(Boolean).join(" — ")}</span>}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-[13px] text-ink-3">אין רשומות מאומתות.</p>
      )}
    </section>
  );
}

export default function Page() {
  const bapis = rows("BAPI");
  const fms = rows("FM");
  return (
    <div>
      <CenterHeader
        eyebrow="עיון · Function Modules"
        title="BAPIs / Function Modules"
        sub={`${bapis.length} BAPIs ו-${fms.length} Function Modules מהבלוּפרינט של PM / PP / PP-PI — כל אחד עם עמוד ייעודי: תפקיד, פרמטרים וטבלאות קשורות. מבוסס ידע SAP מאומת.`}
        accent="#0f766e"
      />
      <Group label="BAPIs" en="Business APIs" data={bapis} />
      <Group label="Function Modules" en="Function Modules" data={fms} />
    </div>
  );
}
