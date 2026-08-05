import { FIORI_APPS, FIORI_BY_SLUG } from "@/data/fiori/apps";
import { FioriAppPage } from "@/components/fiori/app-page";

export function generateStaticParams() { return FIORI_APPS.map((a) => ({ slug: a.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<import("next").Metadata> {
  const { slug } = await params;
  const a = FIORI_BY_SLUG[slug];
  const title = a ? `${a.name} (${a.id}) — Fiori App` : "Fiori App";
  return { title, description: a ? `${a.name} · Fiori ${a.id} · ${a.module} — מטרה עסקית, Business Role, Catalog, OData/CDS, ECC↔S/4 ואימות.` : undefined };
}

export default async function FioriAppDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = FIORI_BY_SLUG[slug];
  if (!app) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">האפליקציה לא נמצאה.</div>;
  return (
    <>
      <FioriAppPage app={app} />
    </>
  );
}
