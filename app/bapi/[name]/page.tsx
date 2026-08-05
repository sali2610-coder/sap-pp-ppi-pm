import { registry, registryObject } from "@/lib/bapi-registry";
import { BapiObjectPage } from "@/components/bapi-object-page";

// Every canonical object gets a full page — including verified additions that are
// NOT referenced by any table (the old listFuncs() list missed them → 404). The
// registry is the single source of truth (§14).
export function generateStaticParams() { return registry().map((o) => ({ name: o.id })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<import("next").Metadata> {
  const { name } = await params;
  const o = registryObject(decodeURIComponent(name));
  const kind = o?.objectType === "FM" ? "Function Module" : o?.objectType === "IDoc" ? "IDoc" : "BAPI";
  const title = `${o?.technicalName || decodeURIComponent(name)} — SAP ${kind}`;
  const description = `${title}: purpose, ECC↔S/4HANA status, verification, parameters, related objects and safe usage — SAP by Sali · Project NEO.`;
  return { title, description, openGraph: { title: `SAP by Sali | ${title}`, description } };
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const o = registryObject(decodeURIComponent(name));
  if (!o) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">האובייקט לא נמצא במאגר המרכזי.</div>;
  // resolve related objects (for links) — serializable, keeps ALL_TABLES off the client bundle
  const related = o.relatedObjects.map((id) => registryObject(id)).filter(Boolean).map((r) => ({ id: r!.id, technicalName: r!.technicalName, objectType: r!.objectType, primaryModule: r!.primaryModule, shortDescriptionHe: r!.shortDescriptionHe, verificationStatus: r!.verificationStatus }));
  return (
    <>
      <BapiObjectPage o={o} related={related} />
    </>
  );
}
