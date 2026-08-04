import { CenterDetail } from "@/components/topic-center";
import { FIORI_APPS } from "@/data/centers/fiori";
import { og } from "@/lib/seo";

export function generateStaticParams() { return FIORI_APPS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<import("next").Metadata> {
  const { slug } = await params;
  const item = FIORI_APPS.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return { title: "SAP Fiori App" };
  const title = `${item.title || item.he} — SAP Fiori App`;
  const description = `${item.he || item.title} — SAP Fiori application: purpose, related transactions and S/4HANA usage on SAP by Sali · Project NEO.`;
  return { title, description, openGraph: og(`SAP by Sali | ${title}`, description) };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = FIORI_APPS.find((i) => i.slug === decodeURIComponent(slug));
  if (!item) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">לא נמצא.</div>;
  return <CenterDetail item={item} base="/fiori/" backLabel="מרכז Fiori" />;
}
