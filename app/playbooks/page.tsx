import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { PLAYBOOKS } from "@/data/centers/playbooks";
export default function Page() {
  return (<div><CenterHeader eyebrow="Phase 7 · Implementation Playbooks" title="מדריכי יישום" sub={`${PLAYBOOKS.length} Playbooks — מטרה עסקית, קונפיגורציה, נתוני אב, בדיקות וסיכוני Go-Live.`} accent="#7c2d12" /><CenterIndexGrid items={PLAYBOOKS} base="/playbooks/" /></div>);
}
