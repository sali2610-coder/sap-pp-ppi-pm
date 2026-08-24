import { notFound } from "next/navigation";
// ui.css is imported per route, not by the layout, so a route that omits it
// ships without the interaction system and its controls fall back to bare
// buttons. Imported first so each route's own CSS still overrides it.
import "@/app/neo/ui.css";
import "@/app/neo/object.css";
import { objectView } from "@/components/neo-shell/object/object-data";
import { objectNames } from "@/components/neo-shell/object/object-names";
import { auxView } from "@/components/neo-shell/object/object-aux";
import { ObjectPage } from "@/components/neo-shell/object/object-view";
import { AuxObjectPage } from "@/components/neo-shell/object/object-aux-view";

// Static export only — no server runtime. The param list is THE object registry
// (components/neo-shell/object/object-names): blueprint + HR/BW + verified — the
// same union the legacy route generated from, and the same union
// components/neo-shell/reference/ref-links gates its links on. One list, so a
// link can never outrun a page and a page can never sit unlinkable;
// scripts/crawl-dead-links.mjs exits 1 on the first internal href in out/ with
// nothing behind it.
//
// This generated from `tableNames()` alone — 105 of 186 — and that one
// expression WAS the 81-object gap the pre-production audit found. Not one page
// below was written by hand to close it.
export const dynamicParams = false;

export function generateStaticParams() {
  return objectNames().map((name) => ({ name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const v = objectView(name) ?? auxView(name);
  return {
    title: v ? `${v.name} · אובייקט SAP · Project NEO` : "אובייקט SAP · Project NEO",
    description: v?.he || undefined,
    robots: { index: false, follow: false },
  };
}

export default async function NeoObject({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  // A blueprint table gets the full workspace: modelled edges, JOINs, the
  // process chain, the S/4 resolver. Everything else gets the page its own
  // registry can honestly fill — object-aux.ts documents why the two are not
  // one template with empty sections.
  const v = objectView(name);
  if (v) return <ObjectPage v={v} />;

  const a = auxView(name);
  if (a) return <AuxObjectPage v={a} />;

  notFound();
}
