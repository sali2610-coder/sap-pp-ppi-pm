import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import { notFound } from "next/navigation";
import { CENTER_FAMILIES, centerFamily } from "@/components/neo-shell/centers/centers-data";
import { CenterFamilyView } from "@/components/neo-shell/centers/centers-view";

export const dynamicParams = false;
export function generateStaticParams() {
  return CENTER_FAMILIES.map((f) => ({ family: f.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ family: string }> }) {
  const { family } = await params;
  const f = centerFamily(family);
  return {
    title: f ? `${f.he} · מרכזי ידע · Project NEO` : "מרכז ידע",
    description: f?.lede,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ family: string }> }) {
  const { family } = await params;
  const f = centerFamily(family);
  if (!f) notFound();
  return <CenterFamilyView fam={f} />;
}
