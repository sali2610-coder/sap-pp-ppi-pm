// ALM Center → interactive course adapter (reframes data/alm.ts).
import { PLATFORMS, LIFECYCLE, TRANSPORT_FLOW, TRANSPORT_CONCEPTS, TRANSPORT_TCODES, CHANGE_TYPES, CHANGE_FLOW, ITSM_NOTE, TEST_CAPS, MONITOR_TYPES, type AlmPlatform } from "@/data/alm";
import type { CourseTopic, CourseVisualLayer } from "@/components/learn/course-center";
import type { LadderLevel } from "@/components/learn/course-kit";

// ALM disciplines preserved as full course topics (no depth lost).
function discipline(id: string, he: string, en: string, color: string, what: string, layers: CourseVisualLayer[], opts: { flow?: string[]; tools?: string[]; note?: string; next: string }): CourseTopic {
  return {
    id, he, en, color,
    intro: [
      { label: "מה זה?", text: what, color },
      { label: "למה צריך את זה?", text: "תחום מרכזי ב-ALM — חיוני לניהול מבוקר של הנוף לאורך מחזור החיים.", color: "#2563eb" },
      { label: "מה היועץ באמת עושה כאן?", text: `מתכנן ומנהל את ${he} מול הצוותים והמערכות.`, color: "#7c3aed" },
      { label: "הנושא הבא המומלץ", text: opts.next, color: "#d97706" },
    ],
    checklist: [`תבין מה זה ${he}`, `תכיר את המרכיבים והכלים`, `תדע ליישם ${he} בפרויקט`, `תזהה את הסיכונים`, `תסביר את ${he} בראיון`],
    managerExpects: `המנהל מצפה שתדע לנהל ${he} בנוף SAP.`,
    interview: [`מה זה ${he} וכיצד מנהלים אותו?`, `אילו כלים תומכים ב-${he}?`],
    visual: { layers, flow: opts.flow, note: opts.note },
    transactions: { tools: opts.tools },
    related: [],
  };
}

export const COURSE = "alm";
const byId = (id: string) => PLATFORMS.find((p) => p.id === id)!;

const LADDER: { label: string; color: string; ids: string[] }[] = [
  { label: "מתחיל", color: "#16a34a", ids: ["solman"] },
  { label: "בינוני", color: "#2563eb", ids: ["fb"] },
  { label: "מתקדם / מומחה", color: "#dc2626", ids: ["calm"] },
];
const ORDER = LADDER.flatMap((l) => l.ids);
const nextOf = (id: string) => { const i = ORDER.indexOf(id); return i >= 0 && i < ORDER.length - 1 ? byId(ORDER[i + 1]) : undefined; };

const WHY: Record<string, string> = {
  solman: "פלטפורמת ALM ה-on-prem — ניהול שינויים (ChaRM), בדיקות וניטור הנוף.",
  fb: "תהליך הטמעה מובנה (requirements → work packages → releases) לפרויקטים גדולים.",
  calm: "ה-ALM הענני המודרני ל-S/4 Cloud / RISE — Implementation + Operations, ללא תשתית.",
};

function topic(p: AlmPlatform): CourseTopic {
  const nx = nextOf(p.id);
  return {
    id: p.id, he: p.he, en: p.en, color: p.color,
    intro: [
      { label: "מה זה?", text: p.what, color: p.color },
      { label: "למה צריך את זה?", text: WHY[p.id] || p.tagline, color: "#2563eb" },
      { label: "מתי תשתמש?", text: p.when, color: "#16a34a" },
      { label: "מה היועץ באמת עושה כאן?", text: p.tips[0] || `תכנון, תפעול וניטור של ${p.he}.`, color: "#7c3aed" },
      { label: "ECC", text: p.ecc, color: "#64748b" },
      { label: "S/4HANA", text: p.s4, color: "#0891b2" },
      { label: "הנושא הבא המומלץ", text: nx ? `${nx.he} — ${nx.tagline}` : "סיימת את המסלול 🎓", color: "#d97706" },
    ],
    checklist: [
      `תבין מה זה ${p.he} ומתי בוחרים בו`,
      `תכיר את היכולות המרכזיות: ${p.capabilities.slice(0, 3).map((c) => c.he).join(", ")}`,
      `תדע את הכלים: ${p.tools.slice(0, 3).join(", ")}`,
      `תבין את מקומו בנוף ECC↔S/4 / Cloud`,
      p.tips[0] ? `תיישם best practice: ${p.tips[0]}` : `תעבוד לפי best practice`,
    ],
    managerExpects: `המנהל מצפה שתדע מתי לבחור ${p.he}, להפעיל את היכולות (${p.capabilities[0]?.he || "core"}), ולהסביר את ההבדל מ-${nx?.he || "פלטפורמות ALM אחרות"} בראיון.`,
    interview: [`מה זה ${p.he} ומתי משתמשים בו?`, `מה ההבדל בין ${p.he} לפלטפורמות ALM אחרות?`, `כיצד ${p.he} משתלב בנוף S/4HANA / Cloud?`],
    visual: { layers: p.capabilities.map((c) => ({ he: c.he, en: c.en, items: [c.desc], hot: false })) },
    examples: { scenario: p.when, bullets: p.tips },
    transactions: { tools: p.tools },
    debug: { oss: p.notes },
    cbc: { text: p.cbc },
    related: p.links.map((l) => ({ label: l.label, href: l.href.includes("/alm/#") ? "#" : l.href })),
  };
}

const DISCIPLINES: CourseTopic[] = [
  discipline("lifecycle", "מחזור חיים E2E", "Lifecycle", "#6366f1", "מחזור החיים מקצה לקצה: Discover→Design→Build→Test→Deploy→Operate.", LIFECYCLE.map((l) => ({ he: l.phase, en: l.tool, items: l.activities, hot: false })), { flow: LIFECYCLE.map((l) => l.phase), next: "ניהול טרנספורטים" }),
  discipline("transport", "ניהול טרנספורטים", "Transport Management", "#0891b2", "DEV→QA→PRD, STMS, CTS+, Retrofit ו-ChaRM-controlled.", TRANSPORT_CONCEPTS.map((c) => ({ he: c.he, en: c.en, items: [c.desc], hot: false })), { flow: TRANSPORT_FLOW, tools: TRANSPORT_TCODES, next: "ניהול שינויים" }),
  discipline("change", "שינויים ותקלות", "Change & Incident", "#7c3aed", "סוגי שינוי (Normal/Urgent/Standard), מחזור חיים ו-ChaRM↔ITSM.", CHANGE_TYPES.map((c) => ({ he: c.he, en: c.en, items: [c.desc], hot: false })), { flow: CHANGE_FLOW, note: ITSM_NOTE, next: "ניהול בדיקות" }),
  discipline("testmgmt", "ניהול בדיקות", "Test Management", "#16a34a", "Test Suite, TBOM, BPCA, CBTA ו-Cloud ALM Test.", TEST_CAPS.map((c) => ({ he: c.he, en: c.en, items: [c.desc], hot: false })), { next: "ניטור" }),
  discipline("monitor", "ניטור", "Monitoring", "#0ea5e9", "System/Health, BPMon, Integration, Job, RCA ו-EarlyWatch.", MONITOR_TYPES.map((m) => ({ he: m.he, en: m.tool, items: [m.desc], hot: false })), { next: "סיימת" }),
];

export function buildAlmCourseData() {
  const ladder: LadderLevel[] = [
    ...LADDER.map((l, i) => ({ id: `lv${i}`, label: l.label, color: l.color, topics: l.ids.filter((id) => byId(id)).map((id) => ({ id, he: byId(id).he })) })),
    { id: "lvd", label: "תחומי ALM", color: "#0f766e", topics: DISCIPLINES.map((d) => ({ id: d.id, he: d.he })) },
  ];
  return {
    meta: { he: "מרכז ALM של SAP", sub: "למד ניהול מחזור חיים כמסלול — Solution Manager, Focused Build ו-Cloud ALM. כל נושא: מה זה · מתי · ECC↔S/4 · יכולות · ראיון · checklist.", eyebrow: "קורס אינטראקטיבי · ALM", accent: "#1e3a8a" },
    startMeta: PLATFORMS.map((p) => ({ id: p.id, he: p.he, sub: p.tagline, color: p.color, cat: p.id })),
    ladder,
    topics: [...PLATFORMS.map(topic), ...DISCIPLINES],
    defaultTopic: "solman",
    crossLinks: [{ label: "מסירה", href: "/delivery/" }, { label: "אבטחה", href: "/security/" }, { label: "אינטגרציה", href: "/integration/" }, { label: "Migration", href: "/migration-cockpit/" }, { label: "מרכז S/4", href: "/s4hana/" }],
  };
}
