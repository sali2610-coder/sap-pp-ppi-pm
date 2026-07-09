import { PM_DATA } from "@/data/sapData.pm";
import { ModuleSection } from "@/components/module-section";
import { NAV_SECTIONS, sectionBySlug } from "@/lib/module-portal";

export function generateStaticParams() { return NAV_SECTIONS.map((s) => ({ section: s.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const m = sectionBySlug(section);
  return { title: m ? `SAP PM · ${m.he}` : "SAP PM", description: m?.desc };
}

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  return <ModuleSection module={PM_DATA} slug="pm" section={section} />;
}
