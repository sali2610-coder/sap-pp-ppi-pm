import { notFound } from "next/navigation";
import { PMU_TEXTBOOK } from "@/data/library/pmu-textbook";
import { AcademyChapter, type AcademyNav } from "@/components/academy-chapter";
export const dynamicParams = false;
const keys = Object.keys(PMU_TEXTBOOK).map(Number).sort((a, b) => a - b);
const pad = (n: number) => String(n).padStart(2, "0");
export function generateStaticParams() { return keys.map((n) => ({ slug: `chapter-${pad(n)}` })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const ch = PMU_TEXTBOOK[String(Number(slug.replace("chapter-", "")))];
  return { title: ch ? `${ch.titleHe} · PM User · NEO Academy` : "PM User Academy" };
}
export default async function PMUChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const n = Number(slug.replace("chapter-", "")); const ch = PMU_TEXTBOOK[String(n)];
  if (!ch) notFound();
  const prevN = keys.filter((k) => k < n).pop(); const nextN = keys.find((k) => k > n);
  const nav: AcademyNav = { base: "/library/pmu-academy", bookLabel: "PM-User",
    prev: prevN ? { n: prevN, titleHe: PMU_TEXTBOOK[String(prevN)].titleHe } : undefined,
    next: nextN ? { n: nextN, titleHe: PMU_TEXTBOOK[String(nextN)].titleHe } : undefined };
  return <AcademyChapter chapter={ch} nav={nav} />;
}
