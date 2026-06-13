import { ALL_TABLES } from "@/lib/data";
import { ObjectWorkspace } from "@/components/object-workspace";

export function generateStaticParams() {
  return ALL_TABLES.map((t) => ({ name: t.tableName }));
}

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  return <ObjectWorkspace name={decodeURIComponent(name)} />;
}
