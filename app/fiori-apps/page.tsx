import { FioriAppsCenter } from "@/components/fiori-apps-center";
import BOOK7 from "@/data/books/book7.json";

export const metadata = { title: "מרכז אפליקציות Fiori · S/4HANA · NEO" };

// The thin index (data/library/fiori-apps.json) keeps only the last word of each
// app's title, so 61 names are shared by different apps ("Agreements" is three
// of them). Book 7, the SAP PRESS quick reference the index was extracted from,
// carries the full title under the same app id. Both files are protected content
// and neither is edited: the full title is read here, at build time, and handed
// to the list for display and search. Book 7 is a secondary source, and the list
// says so.
type Title = string | { en?: string; he?: string } | undefined;
const nameOf = (t: Title) => (typeof t === "string" ? t : t?.en || "");

function fullNames(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const c of (BOOK7 as { chapters: { sections?: { id: string | number; title: Title }[] }[] }).chapters) {
    for (const s of c.sections ?? []) {
      const n = nameOf(s.title).trim();
      if (n) out[String(s.id)] = n;
    }
  }
  return out;
}

export default function FioriAppsPage() {
  return <FioriAppsCenter fullNames={fullNames()} />;
}
