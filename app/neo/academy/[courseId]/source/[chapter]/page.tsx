import Link from "next/link";
import { notFound } from "next/navigation";
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import "@/app/neo/learn-extensions.css";
import "@/app/neo/data.css";
import "@/app/neo/academy-experience.css";
import { sourceBook, sourceChapter, sourceChapters, sourceHref, sourceNodes, sourceParams } from "@/components/neo-shell/learn/source-data";
import { SourceContent } from "@/components/neo-shell/learn/source-content";
import { learnModVar } from "@/components/neo-shell/learn/mod";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { CatalogFoot } from "@/components/neo-shell/data/catalog-kit";

export const dynamicParams = false;
export const generateStaticParams = sourceParams;
type Params = { courseId: string; chapter: string };
export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { courseId, chapter } = await params;
  const ch = sourceChapter(courseId, chapter);
  return { title: ch ? `${ch.titleHe} · חומר האקדמיה המלא · Project NEO` : "SAP Academy", robots: { index: false, follow: false } };
}
export default async function AcademySourceChapter({ params }: { params: Promise<Params> }) {
  const { courseId, chapter } = await params;
  const book = sourceBook(courseId);
  const ch = sourceChapter(courseId, chapter);
  if (!book || !ch) notFound();
  const chapters = sourceChapters(courseId);
  const i = chapters.indexOf(ch);
  const nodes = sourceNodes(ch.subchapters);
  return <div className="nxv nxa-source" style={{ "--m": learnModVar(book.module) } as React.CSSProperties} id="source-top">
    <SmartReturn fallback={{ href: "/neo/academy/materials/", label: "תיקיית האקדמיה" }} />
    <nav className="nxa-source-nav" aria-label="מיקום בחומר הלימוד">
      <Link href="/neo/" prefetch={false}>בית</Link><span aria-hidden="true">/</span>
      <Link href="/neo/academy/" prefetch={false}>אקדמיה</Link><span aria-hidden="true">/</span>
      <Link href={`/neo/academy/${courseId}/`} prefetch={false}>{book.titleHe}</Link>
      <span aria-current="page">פרק {ch.n} · {ch.titleHe}</span>
    </nav>
    <header className="nxv-head"><span className="nx-modbar" aria-hidden="true" /><span className="nx-eyebrow">חומר הלימוד המלא · <bdi>{book.module}</bdi></span>
      <h1 className="nxv-h1">{ch.titleHe}</h1><p className="nxv-en" dir="ltr">{ch.titleEn}</p>
      <p className="nx-lede" dir="auto">{ch.introHe}</p>
      <p className="nx-muted">מתוך חומרי האקדמיה שבאתר, כפי שנכתבו. ההרחבה נפרדת מהתקדמות מסלול השיעורים.</p>
    </header>
    <details className="nxa-chapter-toc" open><summary>תוכן הפרק · {nodes.length} נושאים</summary>
      <ul>{nodes.map((n) => <li key={n.id}><a href={`#source-${n.id}`}>{n.id} · {n.titleHe}</a></li>)}</ul>
    </details>
    {nodes.map((node) => <SourceContent key={node.id} node={node} />)}
    <nav className="nxa-source-nav" aria-label="מעבר בין פרקי המקור">
      {i > 0 ? <Link className="nu-btn2" href={sourceHref(courseId, chapters[i - 1].n)} prefetch={false}>הפרק הקודם · {chapters[i - 1].titleHe}</Link> : null}
      <Link className="nu-btn2" href={`/neo/academy/${courseId}/`} prefetch={false}>חזרה לקורס ולכל הפרקים</Link>
      {i < chapters.length - 1 ? <Link className="nu-btn2" href={sourceHref(courseId, chapters[i + 1].n)} prefetch={false}>הפרק הבא · {chapters[i + 1].titleHe}</Link> : null}
    </nav>
    <CatalogFoot>מתוך חומרי האקדמיה שבאתר, כפי שנכתבו.</CatalogFoot>
  </div>;
}
