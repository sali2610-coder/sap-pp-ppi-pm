import { notFound } from "next/navigation";
import "@/app/neo/object.css";
import { objectView, tableNames } from "@/components/neo-shell/object/object-data";
import { ObjectPage } from "@/components/neo-shell/object/object-view";

// Static export only — no server runtime. The param list is the dictionary's
// own table list, so an object link can never outrun a generated page:
// scripts/crawl-dead-links.mjs exits 1 on the first internal href in out/ with
// no page behind it, and every /neo/object href on the site is built from the
// same list this route generates from.
export const dynamicParams = false;

export function generateStaticParams() {
  return tableNames().map((name) => ({ name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const v = objectView(name);
  return {
    title: v ? `${v.name} · אובייקט SAP · Project NEO` : "אובייקט SAP · Project NEO",
    description: v?.he || undefined,
    robots: { index: false, follow: false },
  };
}

export default async function NeoObject({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const v = objectView(name);
  if (!v) notFound();
  return <ObjectPage v={v} />;
}
