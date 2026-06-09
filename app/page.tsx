import { ALL_TABLES } from "@/lib/data";
import { HomeHero } from "@/components/home-hero";
import { HubCards } from "@/components/hub-cards";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HomeHero tableCount={ALL_TABLES.length} />
      <HubCards />
    </div>
  );
}
