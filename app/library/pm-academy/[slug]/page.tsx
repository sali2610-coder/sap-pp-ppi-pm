import { notFound } from "next/navigation";
import { PM_TEXTBOOK } from "@/data/library/pm-textbook";
import { AcademyChapter, type AcademyNav } from "@/components/academy-chapter";

export const dynamicParams = false;

const keys = Object.keys(PM_TEXTBOOK).map(Number).sort((a, b) => a - b);
const pad = (n: number) => String(n).padStart(2, "0");

export function generateStaticParams() {
  return keys.map((n) => ({ slug: `chapter-${pad(n)}` }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = Number(slug.replace("chapter-", ""));
  const ch = PM_TEXTBOOK[String(n)];
  return { title: ch ? `${ch.titleHe} · PM · NEO Academy` : "PM Academy" };
}

export default async function PMChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = Number(slug.replace("chapter-", ""));
  const ch = PM_TEXTBOOK[String(n)];
  if (!ch) notFound();
  const prevN = keys.filter((k) => k < n).pop();
  const nextN = keys.find((k) => k > n);
  const nav: AcademyNav = {
    base: "/library/pm-academy",
    bookLabel: "PM",
    prev: prevN ? { n: prevN, titleHe: PM_TEXTBOOK[String(prevN)].titleHe } : undefined,
    next: nextN ? { n: nextN, titleHe: PM_TEXTBOOK[String(nextN)].titleHe } : undefined,
  };
  return <AcademyChapter chapter={ch} nav={nav} />;
}
