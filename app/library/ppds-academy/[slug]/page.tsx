import { notFound } from "next/navigation";
import { PPDS_TEXTBOOK } from "@/data/library/ppds-textbook";
import { AcademyChapter, type AcademyNav } from "@/components/academy-chapter";
export const dynamicParams = false;
const keys = Object.keys(PPDS_TEXTBOOK).map(Number).sort((a, b) => a - b);
const pad = (n: number) => String(n).padStart(2, "0");
export function generateStaticParams() { return keys.map((n) => ({ slug: `chapter-${pad(n)}` })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const ch = PPDS_TEXTBOOK[String(Number(slug.replace("chapter-", "")))];
  return { title: ch ? `${ch.titleHe} · PP/DS · NEO Academy` : "PP/DS Academy" };
}
export default async function PPDSChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const n = Number(slug.replace("chapter-", "")); const ch = PPDS_TEXTBOOK[String(n)];
  if (!ch) notFound();
  const prevN = keys.filter((k) => k < n).pop(); const nextN = keys.find((k) => k > n);
  const nav: AcademyNav = { base: "/library/ppds-academy", bookLabel: "PP/DS",
    prev: prevN ? { n: prevN, titleHe: PPDS_TEXTBOOK[String(prevN)].titleHe } : undefined,
    next: nextN ? { n: nextN, titleHe: PPDS_TEXTBOOK[String(nextN)].titleHe } : undefined };
  return <AcademyChapter chapter={ch} nav={nav} />;
}
