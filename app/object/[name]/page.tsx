import type { Metadata } from "next";
import { ALL_TABLES } from "@/lib/data";
import { HR_BW_NAMES } from "@/lib/hr-bw-adapter";
import { ObjectWorkspace } from "@/components/object-workspace";
import { VerifiedObjectView } from "@/components/verified-object-view";
import { verifiedObject, verifiedNames } from "@/data/verified-objects";
import { og } from "@/lib/seo";

const BLUEPRINT = new Set(ALL_TABLES.map((t) => t.tableName));

export function generateStaticParams() {
  return [...new Set([...ALL_TABLES.map((t) => t.tableName), ...HR_BW_NAMES, ...verifiedNames()])].map((name) => ({ name }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const n = decodeURIComponent(name);
  const t = ALL_TABLES.find((x) => x.tableName === n);
  const vo = verifiedObject(n);
  const he = t?.descriptionHe || t?.descriptionEn || vo?.he || "";
  const mod = t?.module || "";
  const title = `${n} — SAP Table${mod ? ` (${mod})` : ""}`;
  const description = `${n}${he ? ` — ${he}` : " — SAP table reference"}. Fields, keys, relations, BAPIs, T-Codes and S/4HANA notes on SAP by Sali · Project NEO.`;
  return { title, description, openGraph: og(`SAP by Sali | ${title}`, description) };
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const n = decodeURIComponent(name);
  // verified supplemental object (VEKP/HU family, deliveries, WM, SD, FI …) that
  // isn't in the PM/PP-PI blueprint → its own honest verified-reference page.
  const vo = verifiedObject(n);
  if (vo && !BLUEPRINT.has(n)) return <VerifiedObjectView o={vo} />;
  return <ObjectWorkspace name={n} />;
}
