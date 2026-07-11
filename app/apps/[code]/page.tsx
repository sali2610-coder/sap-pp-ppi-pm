import { AppObjectPage } from "@/components/app-object";
import { appObject, appCodes } from "@/lib/apps-intel";

export function generateStaticParams() { return appCodes().map((code) => ({ code })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const o = appObject(decodeURIComponent(code));
  return { title: o ? `${o.code} · ${o.intel.module} · Apps Center` : "Apps Center" };
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const o = appObject(decodeURIComponent(code));
  if (!o) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">אובייקט לא נמצא במאגר.</div>;
  return <AppObjectPage o={o} />;
}
