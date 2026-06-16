import { CenterHeader } from "@/components/knowledge";
import { Copilot, type LcLite, type SolLite } from "@/components/copilot";
import { buildSearchIndex, allTcodesMerged } from "@/lib/tcode-search";
import { lifecycle } from "@/data/lifecycle";
import { SOLUTIONS } from "@/data/solutions";

const codes = allTcodesMerged().map((t) => t.code.toUpperCase());
const lcMap: Record<string, LcLite> = {};
for (const c of codes) { const l = lifecycle(c); lcMap[c] = { status: l.status, alt: l.alt, fiori: l.fiori, impact: l.impact, migration: l.migration }; }
const sols: SolLite[] = SOLUTIONS.map((s) => ({ slug: s.slug, he: s.he, title: s.title, keywords: s.keywords }));

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Phase 7 · Consultant Copilot" title="קופיילוט יועץ" sub="שאל שאלה — NEO עונה ממאגר הידע שלו בלבד (T-Codes, lifecycle, פתרונות, טבלאות, תקלות). לא מזיכרון AI כללי." accent="#d62027" />
      <Copilot index={buildSearchIndex()} lifecycle={lcMap} solutions={sols} codes={codes} />
    </div>
  );
}
