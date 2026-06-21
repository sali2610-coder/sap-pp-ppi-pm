import { notFound } from "next/navigation";
import { SOP_TEXTBOOK } from "@/data/library/sop-textbook";
import { AcademyChapter, type AcademyNav } from "@/components/academy-chapter";
export const dynamicParams = false;
const keys = Object.keys(SOP_TEXTBOOK).map(Number).sort((a, b) => a - b);
const pad = (n: number) => String(n).padStart(2, "0");
export function generateStaticParams() { return keys.map((n) => ({ slug: `chapter-${pad(n)}` })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const ch = SOP_TEXTBOOK[String(Number(slug.replace("chapter-", "")))];
  return { title: ch ? `${ch.titleHe} · S&OP · NEO Academy` : "S&OP Academy" };
}
export default async function SOPChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const n = Number(slug.replace("chapter-", "")); const ch = SOP_TEXTBOOK[String(n)];
  if (!ch) notFound();
  const prevN = keys.filter((k) => k < n).pop(); const nextN = keys.find((k) => k > n);
  const nav: AcademyNav = { base: "/library/sop-academy", bookLabel: "S&OP",
    prev: prevN ? { n: prevN, titleHe: SOP_TEXTBOOK[String(prevN)].titleHe } : undefined,
    next: nextN ? { n: nextN, titleHe: SOP_TEXTBOOK[String(nextN)].titleHe } : undefined };
  return <AcademyChapter chapter={ch} nav={nav} />;
}
