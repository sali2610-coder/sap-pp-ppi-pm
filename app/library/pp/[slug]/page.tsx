import { notFound } from "next/navigation";
import { PP_CHAPTERS } from "@/data/library/pp-knowledge";
import { PPChapterDetail } from "@/components/pp-chapter-detail";

const pad = (n: number) => String(n).padStart(2, "0");

export const dynamicParams = false;

export function generateStaticParams() {
  return PP_CHAPTERS.map((c) => ({ slug: `chapter-${pad(c.n)}` }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ch = PP_CHAPTERS.find((c) => `chapter-${pad(c.n)}` === slug);
  return { title: ch ? `${ch.he} · PP · Project NEO` : "PP · Project NEO" };
}

export default async function PPChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ch = PP_CHAPTERS.find((c) => `chapter-${pad(c.n)}` === slug);
  if (!ch) notFound();
  return <PPChapterDetail ch={ch} />;
}
