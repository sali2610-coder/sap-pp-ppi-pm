import poc from "@/data/library/pm-poc.json";
import { BookOpen, ShieldCheck, ListChecks, Lightbulb, BookMarked, Boxes } from "lucide-react";

export const metadata = { title: "PM · ספריית ידע (PoC) · Project NEO" };

// Copyright-safe knowledge page: summaries / glossary / runbook / lessons only.
// No verbatim book text is stored or rendered (decision #5).

type Topic = { he: string; pages: number[] };
type GlossaryEntry = { obj: string; type: string; he: string };
type Runbook = { titleHe: string; quickGuideHe: string[]; checklistHe: string[] };

interface Poc {
  book: {
    slug: string; title: string; titleHe: string; author: string; module: string;
    source: string; pagesCovered: [number, number]; totalPages: number; poc: boolean;
  };
  summaryHe: string;
  keyFindingsHe: string[];
  topicsHe: Topic[];
  glossary: GlossaryEntry[];
  runbook: Runbook;
  lessonsHe: string[];
  objects: Record<string, string[]>;
}

const D = poc as unknown as Poc;

// SAP identifiers must render LTR even inside RTL Hebrew flow.
function Code({ children }: { children: React.ReactNode }) {
  return (
    <span dir="ltr" className="tech mx-0.5 inline-block rounded bg-muted px-1 text-[0.85em] font-semibold text-foreground">
      {children}
    </span>
  );
}

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section dir="rtl" className="glass rounded-2xl p-5">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
        <span className="text-brand">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PmLibraryPoc() {
  const b = D.book;
  return (
    <div dir="rtl" className="mx-auto flex max-w-4xl flex-col gap-5">
      {/* Header */}
      <header className="glass rounded-2xl border-r-4 border-brand p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand">
          <BookOpen className="size-4" />
          ספריית SAP · מודול PM · הוכחת היתכנות (PoC)
        </div>
        <h1 className="mt-2 text-2xl font-extrabold">{b.titleHe}</h1>
        <p dir="ltr" className="mt-1 text-start text-sm text-muted-foreground">{b.title} — {b.author}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          ידע מובנֵה בעברית שנגזר מהספר. נסרקו עמודים{" "}
          <Code>{`${b.pagesCovered[0]}–${b.pagesCovered[1]}`}</Code> מתוך {b.totalPages}.
        </p>
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-brand-soft/60 p-3 text-xs leading-relaxed">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
          <span>
            הערת זכויות יוצרים: דף זה אינו משכפל טקסט מקורי מהספר. מוצגים אך ורק תקצירים, מונחון,
            נהלים ולקחים שנוצרו מחדש בעברית. מזהי SAP נשמרים כלשונם.
          </span>
        </div>
      </header>

      {/* Summary */}
      <SectionCard icon={<BookMarked className="size-5" />} title="תקציר מנהלים">
        <p className="whitespace-pre-line text-sm leading-relaxed">{D.summaryHe}</p>
        {D.keyFindingsHe?.length > 0 && (
          <ul className="mt-3 list-disc space-y-1 pe-5 text-sm">
            {D.keyFindingsHe.map((k, i) => <li key={i}>{k}</li>)}
          </ul>
        )}
      </SectionCard>

      {/* Topics */}
      {D.topicsHe?.length > 0 && (
        <SectionCard icon={<ListChecks className="size-5" />} title="נושאים מרכזיים">
          <ul className="space-y-2 text-sm">
            {D.topicsHe.map((t, i) => (
              <li key={i} className="flex items-start justify-between gap-3 border-b border-border/40 pb-2 last:border-0">
                <span>{t.he}</span>
                {t.pages?.length > 0 && (
                  <span dir="ltr" className="shrink-0 text-[11px] text-muted-foreground">p.{t.pages.join(", ")}</span>
                )}
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Runbook */}
      {D.runbook && (
        <SectionCard icon={<ListChecks className="size-5" />} title={`Runbook · ${D.runbook.titleHe}`}>
          <ol className="list-decimal space-y-1 pe-5 text-sm">
            {D.runbook.quickGuideHe.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          {D.runbook.checklistHe?.length > 0 && (
            <div className="mt-3 rounded-lg border border-border/50 p-3">
              <p className="mb-2 text-xs font-bold text-muted-foreground">צ׳ק-ליסט</p>
              <ul className="space-y-1 text-sm">
                {D.runbook.checklistHe.map((c, i) => (
                  <li key={i} className="flex items-start gap-2"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" />{c}</li>
                ))}
              </ul>
            </div>
          )}
        </SectionCard>
      )}

      {/* Lessons */}
      {D.lessonsHe?.length > 0 && (
        <SectionCard icon={<Lightbulb className="size-5" />} title="לקחים">
          <ul className="list-disc space-y-1.5 pe-5 text-sm">
            {D.lessonsHe.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </SectionCard>
      )}

      {/* Glossary */}
      {D.glossary?.length > 0 && (
        <SectionCard icon={<BookMarked className="size-5" />} title="מונחון SAP">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="py-2 pe-3 text-start">אובייקט</th>
                  <th className="py-2 pe-3 text-start">סוג</th>
                  <th className="py-2 text-start">הסבר</th>
                </tr>
              </thead>
              <tbody>
                {D.glossary.map((g, i) => (
                  <tr key={i} className="border-b border-border/40">
                    <td className="py-2 pe-3"><Code>{g.obj}</Code></td>
                    <td dir="ltr" className="py-2 pe-3 text-start text-xs text-muted-foreground">{g.type}</td>
                    <td className="py-2">{g.he}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* Object inventory */}
      <SectionCard icon={<Boxes className="size-5" />} title="מצאי אובייקטים (verbatim)">
        <div className="flex flex-col gap-3">
          {Object.entries(D.objects).map(([k, vals]) =>
            vals.length === 0 ? null : (
              <div key={k}>
                <p dir="ltr" className="text-start text-xs font-bold uppercase text-muted-foreground">{k} ({vals.length})</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {vals.map((v) => <Code key={v}>{v}</Code>)}
                </div>
              </div>
            )
          )}
        </div>
      </SectionCard>

      <p className="text-center text-xs text-muted-foreground">
        נגזר אוטומטית מ-{b.source} · צינור ספריית SAP (PoC)
      </p>
    </div>
  );
}
