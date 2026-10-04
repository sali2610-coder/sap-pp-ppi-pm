// Project NEO · /neo/academy/pp-pi/objects/<slug>/ — one SAP object of the PP textbook.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { notFound } from "next/navigation";
import { PPObjectView } from "@/components/neo-shell/academy-ref/pp-objects";
import { PP_OBJECT_SLUGS, objectBySlug } from "@/lib/pp-object-index";

export const dynamicParams = false;

export function generateStaticParams() {
  return PP_OBJECT_SLUGS.map((code) => ({ courseId: "pp-pi", code }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string; code: string }> }) {
  const { code } = await params;
  const o = objectBySlug(code);
  return {
    title: o ? `${o.code} · אובייקט ב-PP · Project NEO` : "אובייקט SAP · PP · Project NEO",
    description: o?.he || undefined,
    robots: { index: false, follow: false },
  };
}

export default async function NeoPPObject({ params }: { params: Promise<{ courseId: string; code: string }> }) {
  const { courseId, code } = await params;
  const o = courseId === "pp-pi" ? objectBySlug(code) : undefined;
  if (!o) notFound();
  return <PPObjectView obj={o} />;
}
