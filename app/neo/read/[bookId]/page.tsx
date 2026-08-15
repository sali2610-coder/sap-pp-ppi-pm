/* ============================================================================
   PROJECT NEO · READER ROUTE — /neo/read/<bookId>/
   ----------------------------------------------------------------------------
   NEO's own reading experience, as its OWN route.

   The production reader at /library/<id>/ is not wrapped, not forked and not
   touched: components/book-reader.tsx, components/chapter-reader.tsx,
   components/library/** and app/library/** are all unmodified, and every one of
   the project's existing links into them still lands exactly where it did.

   This page reaches the same real content through the same public doors the
   platform already provides — lib/library/registry.ts at build time for the
   spine, and /books/<id>/ch<n>.json at read time for the prose.

   Statically exported over the registry's own id list, so a link can never be
   generated for a page that does not exist (scripts/crawl-dead-links.mjs exits
   1 on the first internal href in out/ with nothing behind it).
   ========================================================================== */

import { notFound } from "next/navigation";
import "@/app/neo/ui.css";
import "@/app/neo/reader.css";
import { readerData, readerBookIds } from "@/components/neo-shell/reader/reader-data";
import { NeoReader } from "@/components/neo-shell/reader/neo-reader";

export const dynamicParams = false;

export function generateStaticParams() {
  return readerBookIds().map((bookId) => ({ bookId }));
}

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  const d = readerData(bookId);
  const title = d ? d.titleHe || d.titleEn : null;
  return {
    title: title ? `${title} · קריאה · Project NEO` : "קריאה · Project NEO",
    description: d
      ? `${d.chapters.length} פרקים ו-${d.totalSections} תת-פרקים, נקראים ממאגר הספרים של הפרויקט.`
      : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function NeoReadPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  const d = readerData(bookId);
  if (!d) notFound();
  return <NeoReader book={d} />;
}
