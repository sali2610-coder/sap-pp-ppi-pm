// Project NEO · /neo/pm/<section>/ and /neo/pp-pi/<section>/ — the fifteen
// sections of the legacy module portal (/pm/<section>/, /pp-pi/<section>/) as
// sub-pages of the NEO module page.
//
// Params are generated bottom-up for BOTH segments, and only for the two module
// hubs: app/neo/[hub]/page.tsx has no layout, so its own param list does not
// reach this route, and with dynamicParams = false no other hub gets sections.
import "@/app/neo/ui.css";
import "@/app/neo/module-sections.css";
import { notFound } from "next/navigation";
import { ModuleSectionPage } from "@/components/neo-shell/module-sections/section-page";
import { msModule, msParams, msSection } from "@/components/neo-shell/module-sections/section-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return msParams();
}

type P = { params: Promise<{ hub: string; section: string }> };

export async function generateMetadata({ params }: P) {
  const { hub, section } = await params;
  const mod = msModule(hub);
  const meta = msSection(section);
  return {
    title: mod && meta ? `${meta.he} · SAP ${mod.code} · Project NEO` : "Project NEO",
    description: meta?.desc,
    robots: { index: false, follow: false },
  };
}

export default async function NeoModuleSection({ params }: P) {
  const { hub, section } = await params;
  const mod = msModule(hub);
  if (!mod || !msSection(section)) notFound();
  return <ModuleSectionPage mod={mod} slug={section} />;
}
