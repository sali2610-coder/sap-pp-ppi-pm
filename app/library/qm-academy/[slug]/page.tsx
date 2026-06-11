import { notFound } from "next/navigation";
import { QM_TEXTBOOK } from "@/data/library/qm-textbook";
import { AcademyChapter, type AcademyNav } from "@/components/academy-chapter";

export const dynamicParams = false;
const keys = Object.keys(QM_TEXTBOOK).map(Number).sort((a, b) => a - b);
const pad = (n: number) => String(n).padStart(2, "0");

export function generateStaticParams() {
  return keys.map((n) => ({ slug: `chapter-${pad(n)}` }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ch = QM_TEXTBOOK[String(Number(slug.replace("chapter-", "")))];
  return { title: ch ? `${ch.titleHe} · QM · NEO Academy` : "QM Academy" };
}
export default async function QMChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = Number(slug.replace("chapter-", ""));
  const ch = QM_TEXTBOOK[String(n)];
  if (!ch) notFound();
  const prevN = keys.filter((k) => k < n).pop();
  const nextN = keys.find((k) => k > n);
  const nav: AcademyNav = {
    base: "/library/qm-academy", bookLabel: "QM",
    prev: prevN ? { n: prevN, titleHe: QM_TEXTBOOK[String(prevN)].titleHe } : undefined,
    next: nextN ? { n: nextN, titleHe: QM_TEXTBOOK[String(nextN)].titleHe } : undefined,
  };
  return <AcademyChapter chapter={ch} nav={nav} />;
}
