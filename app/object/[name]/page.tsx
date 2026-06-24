import { ALL_TABLES } from "@/lib/data";
import { HR_BW_NAMES } from "@/lib/hr-bw-adapter";
import { ObjectWorkspace } from "@/components/object-workspace";

export function generateStaticParams() {
  return [...ALL_TABLES.map((t) => t.tableName), ...HR_BW_NAMES].map((name) => ({ name }));
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  return <ObjectWorkspace name={decodeURIComponent(name)} />;
}
