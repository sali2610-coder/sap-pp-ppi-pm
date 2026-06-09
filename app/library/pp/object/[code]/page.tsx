import { notFound } from "next/navigation";
import { PP_OBJECT_SLUGS, objectBySlug } from "@/lib/pp-object-index";
import { PPObjectDetail } from "@/components/pp-object-detail";

export const dynamicParams = false;

export function generateStaticParams() {
  return PP_OBJECT_SLUGS.map((code) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const obj = objectBySlug(code);
  return { title: obj ? `${obj.code} · PP · Project NEO` : "SAP object · PP" };
}

export default async function PPObjectPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const obj = objectBySlug(code);
  if (!obj) notFound();
  return <PPObjectDetail obj={obj} />;
}
