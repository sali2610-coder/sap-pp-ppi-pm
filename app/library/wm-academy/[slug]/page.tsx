import { notFound } from "next/navigation";
import { WM_TEXTBOOK } from "@/data/library/wm-textbook";
import { AcademyChapter, type AcademyNav } from "@/components/academy-chapter";
export const dynamicParams = false;
const keys = Object.keys(WM_TEXTBOOK).map(Number).sort((a, b) => a - b);
const pad = (n: number) => String(n).padStart(2, "0");
export function generateStaticParams() { return keys.map((n) => ({ slug: `chapter-${pad(n)}` })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const ch = WM_TEXTBOOK[String(Number(slug.replace("chapter-", "")))];
  return { title: ch ? `${ch.titleHe} · WM · NEO Academy` : "WM Academy" };
}
export default async function WMChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const n = Number(slug.replace("chapter-", "")); const ch = WM_TEXTBOOK[String(n)];
  if (!ch) notFound();
  const prevN = keys.filter((k) => k < n).pop(); const nextN = keys.find((k) => k > n);
  const nav: AcademyNav = { base: "/library/wm-academy", bookLabel: "WM",
    prev: prevN ? { n: prevN, titleHe: WM_TEXTBOOK[String(prevN)].titleHe } : undefined,
    next: nextN ? { n: nextN, titleHe: WM_TEXTBOOK[String(nextN)].titleHe } : undefined };
  return <AcademyChapter chapter={ch} nav={nav} />;
}
