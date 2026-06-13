import { ALL_TABLES } from "@/lib/data";
import { HomeHero } from "@/components/home-hero";
import { CommandCenter } from "@/components/command-center";

export default function HomePage() {
  const tables = ALL_TABLES.length;
  const relations = ALL_TABLES.reduce((a, t) => a + (t.relations?.length || 0), 0);
  const tcodes = new Set(
    ALL_TABLES.flatMap((t) => (t.tcodes || "").split(/[^A-Za-z0-9_./]+/).filter((x) => x.length >= 3 && /^[A-Z]/i.test(x)))
  ).size;
  const bapis = new Set(ALL_TABLES.flatMap((t) => (t.funcs || []).map((f) => f[0]).filter(Boolean))).size;

  return (
    <div className="space-y-9">
      <HomeHero stats={{ modules: 12, tables, relations, tcodes, bapis, books: 2 }} />
      <CommandCenter />
    </div>
  );
}
