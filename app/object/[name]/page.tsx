import { ALL_TABLES } from "@/lib/data";
import { HR_BW_NAMES } from "@/lib/hr-bw-adapter";
import { ObjectWorkspace } from "@/components/object-workspace";
import { VerifiedObjectView } from "@/components/verified-object-view";
import { verifiedObject, verifiedNames } from "@/data/verified-objects";

const BLUEPRINT = new Set(ALL_TABLES.map((t) => t.tableName));

export function generateStaticParams() {
  return [...new Set([...ALL_TABLES.map((t) => t.tableName), ...HR_BW_NAMES, ...verifiedNames()])].map((name) => ({ name }));
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const n = decodeURIComponent(name);
  // verified supplemental object (VEKP/HU family, deliveries, WM, SD, FI …) that
  // isn't in the PM/PP-PI blueprint → its own honest verified-reference page.
  const vo = verifiedObject(n);
  if (vo && !BLUEPRINT.has(n)) return <VerifiedObjectView o={vo} />;
  return <ObjectWorkspace name={n} />;
}
