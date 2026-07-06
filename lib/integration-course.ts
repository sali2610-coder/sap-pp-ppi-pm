// Integration Center → interactive course adapter (reframes data/integration.ts).
import { MODULES, CAT_META, type IntgModule } from "@/data/integration";
import type { CourseTopic } from "@/components/learn/course-center";
import type { LadderLevel } from "@/components/learn/course-kit";

export const COURSE = "integration";
const byId = (id: string) => MODULES.find((m) => m.id === id)!;

const LADDER: { label: string; color: string; ids: string[] }[] = [
  { label: "מתחיל", color: "#16a34a", ids: ["idoc", "ale", "rfc"] },
  { label: "בינוני", color: "#2563eb", ids: ["trfc", "qrfc", "pipo"] },
  { label: "מתקדם", color: "#d97706", ids: ["cpi", "suite", "odata"] },
  { label: "מומחה", color: "#dc2626", ids: ["api", "eventmesh"] },
];
const ORDER = LADDER.flatMap((l) => l.ids);
const nextOf = (id: string) => { const i = ORDER.indexOf(id); return i >= 0 && i < ORDER.length - 1 ? byId(ORDER[i + 1]) : undefined; };

const WHY: Record<IntgModule["cat"], string> = {
  classic: "תקשורת קלאסית on-prem — הבסיס לכל ממשק SAP מסורתי (IDoc/ALE/RFC).",
  middleware: "שכבת התיווך שמנתבת, ממירה ומנטרת הודעות בין מערכות.",
  modern: "ממשקי REST/OData — הבסיס ל-Fiori ולאינטגרציה עם SaaS.",
  event: "אינטגרציה מבוססת אירועים — מערכות מגיבות בזמן אמת (loose coupling).",
};
const ECCS4: Record<IntgModule["cat"], string> = {
  classic: "קיים ב-ECC וב-S/4; ב-S/4 מומלץ ניטור דרך AIF / Cloud ALM.",
  middleware: "PI/PO ב-maintenance; היעד ב-S/4/Cloud הוא SAP Integration Suite (CPI).",
  modern: "מודרני — נטיבי ל-S/4 ול-S/4 Cloud (RAP / OData V4).",
  event: "מודרני — Enterprise Eventing ב-S/4 + Event Mesh ב-BTP.",
};

function topic(m: IntgModule): CourseTopic {
  const nx = nextOf(m.id);
  const mistakes = [...m.troubleshooting, ...m.rootCauses].slice(0, 4);
  return {
    id: m.id, he: m.he, en: m.en, color: m.color,
    intro: [
      { label: "מה זה?", text: m.tagline, color: m.color },
      { label: "למה צריך את זה?", text: WHY[m.cat], color: "#2563eb" },
      { label: "איך זה עובד?", text: m.architecture, color: "#16a34a" },
      { label: "מה היועץ באמת עושה כאן?", text: m.debug[0] || `אבחון, ניטור ותחזוקה של ${m.he}.`, color: "#7c3aed" },
      { label: "ECC ↔ S/4HANA", text: ECCS4[m.cat], color: "#0891b2" },
      { label: "טעויות נפוצות", text: mistakes.slice(0, 3).join(" · "), color: "#dc2626" },
      { label: "הנושא הבא המומלץ", text: nx ? `${nx.he} — ${nx.tagline}` : "סיימת את המסלול 🎓", color: "#d97706" },
    ],
    checklist: [
      `תבין מה זה ${m.he} ואיך זורם בו המידע`,
      m.transactions.length ? `תכיר את כלי הניטור: ${m.transactions.slice(0, 4).join(", ")}` : `תכיר את כלי הניטור של ${m.he}`,
      m.troubleshooting[0] ? `תדע לאבחן: ${m.troubleshooting[0]}` : `תדע לזהות כשל אופייני`,
      `תבין את מצב ${m.he} ב-ECC מול S/4HANA`,
      `תדע לקרוא את ה-OSS keywords הרלוונטיים`,
    ],
    managerExpects: `המנהל מצפה שתדע לנטר ${m.he} (${m.transactions[0] || "כלי הניטור"}), לאבחן ${m.troubleshooting[0] || "כשל ממשק"} עד שורש, ולהסביר את מקומו ב-ECC↔S/4.`,
    interview: [`מה זה ${m.he} ומתי משתמשים בו?`, m.troubleshooting[0] ? `כיצד תאבחן: ${m.troubleshooting[0]}?` : `כיצד תאבחן כשל ב-${m.he}?`, `מה קורה ל-${m.he} במעבר ל-S/4HANA / Cloud?`],
    visual: { flow: m.flow },
    examples: { scenario: m.architecture, bullets: m.monitoring.map((x) => `${x.t} — ${x.what}`) },
    transactions: { tcodes: m.transactions.filter((t) => /^[A-Z/]/.test(t) && !t.includes(" ")), tools: m.monitoring.map((x) => x.t) },
    debug: { issues: [...m.troubleshooting, ...m.rootCauses], steps: m.debug, oss: m.notes },
    scenario: { text: m.scenario, incidents: m.incidents.map((i) => ({ slug: i.slug, label: i.label })) },
    related: m.links.map((l) => ({ label: l.label, href: l.href.includes("/integration/#") ? "#" : l.href })),
  };
}

export function buildIntegrationCourseData() {
  const cats = (["classic", "middleware", "modern", "event"] as const).map((cat) => ({ cat, ...CAT_META[cat], items: MODULES.filter((m) => m.cat === cat) }));
  const ladder: LadderLevel[] = LADDER.map((l, i) => ({ id: `lv${i}`, label: l.label, color: l.color, topics: l.ids.filter((id) => byId(id)).map((id) => ({ id, he: byId(id).he })) }));
  return {
    meta: { he: "מרכז אינטגרציה SAP", sub: "למד אינטגרציית SAP כמסלול — מ-IDoc/ALE/RFC הקלאסיים, דרך PI/PO ו-CPI, ועד OData, APIs ו-Event Mesh. כל נושא: מה זה · איך עובד · ECC↔S/4 · ניטור · אבחון · ראיון · checklist.", eyebrow: "קורס אינטראקטיבי · Integration", accent: "#1e3a8a" },
    startMeta: cats.map((g) => ({ id: g.items[0]?.id || "idoc", he: g.he, sub: `${g.items.length} טכנולוגיות · התחל מ-${g.items[0]?.he || ""}`, color: g.c, cat: g.cat })),
    ladder,
    topics: MODULES.map(topic),
    defaultTopic: "idoc",
    crossLinks: [{ label: "חוקר IDoc", href: "/idoc/" }, { label: "מרכז תקלות", href: "/incidents/" }, { label: "PP-PI", href: "/pp-pi/" }, { label: "אבטחה", href: "/security/" }, { label: "ALM", href: "/alm/" }, { label: "מרכז S/4", href: "/s4hana/" }],
  };
}
