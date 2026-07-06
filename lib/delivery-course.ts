// Delivery Center → interactive course adapter (reframes data/project-delivery.ts).
import { PHASES, TEST_LEVELS, TEST_TOOLS, DEFECT_SEVERITY, DEFECT_FLOW, WORKSHOP_TYPES, WORKSHOP_PREP, BLUEPRINT, type Phase } from "@/data/project-delivery";
import { CUTOVER } from "@/data/s4-transformation";
import type { CourseTopic, CourseVisualLayer } from "@/components/learn/course-center";
import type { LadderLevel } from "@/components/learn/course-kit";

// Extra delivery disciplines (Cutover/Test/Defect/Workshop/Blueprint) preserved
// as full course topics so no depth is lost in the migration.
function discipline(id: string, he: string, en: string, color: string, what: string, layers: CourseVisualLayer[], opts: { flow?: string[]; tools?: string[]; bullets?: string[]; next: string } = { next: "" }): CourseTopic {
  return {
    id, he, en, color,
    intro: [
      { label: "מה זה?", text: what, color },
      { label: "למה צריך את זה?", text: `תחום מרכזי במסירת פרויקט S/4HANA — חלק בלתי נפרד מ-SAP Activate.`, color: "#2563eb" },
      { label: "מה היועץ באמת עושה כאן?", text: `מתכנן, מבצע ומנהל את ${he} מול בעלי העניין.`, color: "#7c3aed" },
      { label: "הנושא הבא המומלץ", text: opts.next, color: "#d97706" },
    ],
    checklist: [`תבין מה זה ${he} ומתי בתהליך`, `תכיר את המרכיבים המרכזיים`, `תדע ליישם ${he} בפרויקט אמיתי`, `תזהה את הסיכונים`, `תסביר את ${he} בראיון`],
    managerExpects: `המנהל מצפה שתדע לתכנן ולנהל ${he} בפרויקט S/4HANA.`,
    interview: [`מה זה ${he} ומתי הוא מתבצע?`, `אילו מרכיבים כולל ${he}?`],
    visual: { layers, flow: opts.flow },
    examples: { bullets: opts.bullets },
    transactions: { tools: opts.tools },
    related: [],
  };
}

export const COURSE = "delivery";
const byId = (id: string) => PHASES.find((p) => p.id === id)!;

const LADDER: { label: string; color: string; ids: string[] }[] = [
  { label: "מתחיל", color: "#16a34a", ids: ["discover", "prepare"] },
  { label: "בינוני", color: "#2563eb", ids: ["explore"] },
  { label: "מתקדם", color: "#d97706", ids: ["realize"] },
  { label: "מומחה", color: "#dc2626", ids: ["deploy", "run"] },
];
const ORDER = PHASES.map((p) => p.id);
const nextOf = (id: string) => { const i = ORDER.indexOf(id); return i >= 0 && i < ORDER.length - 1 ? byId(ORDER[i + 1]) : undefined; };
const PHASE_NAMES = PHASES.map((p) => `${p.n}.${p.he}`);

function topic(p: Phase): CourseTopic {
  const nx = nextOf(p.id);
  return {
    id: p.id, he: `${p.n}. ${p.he}`, en: p.en, color: p.color,
    intro: [
      { label: "מה זה?", text: p.goal, color: p.color },
      { label: "למה צריך את זה?", text: `שלב ${p.n} ב-SAP Activate. ביצוע נכון כאן קובע את הצלחת השלבים הבאים.`, color: "#2563eb" },
      { label: "מתי תשתמש?", text: `בשלב ${p.he} של פרויקט ה-S/4HANA — לפי מתודולוגיית SAP Activate.`, color: "#16a34a" },
      { label: "מה היועץ באמת עושה כאן?", text: `מוביל את ${p.objectives[0] || p.he}; גורמים: ${p.roles.slice(0, 3).join(", ")}.`, color: "#7c3aed" },
      { label: "תוצרים מרכזיים", text: p.deliverables.slice(0, 4).join(" · "), color: "#0891b2" },
      { label: "טעויות נפוצות", text: p.mistakes.slice(0, 2).join(" · "), color: "#dc2626" },
      { label: "הנושא הבא המומלץ", text: nx ? `${nx.n}. ${nx.he} — ${nx.goal}` : "סיימת את המסלול 🎓", color: "#d97706" },
    ],
    checklist: [
      `תבין את מטרת שלב ${p.he} ומתי הוא מתרחש`,
      `תכיר את התוצרים: ${p.deliverables.slice(0, 3).join(", ")}`,
      `תדע מי הגורמים המעורבים: ${p.roles.slice(0, 3).join(", ")}`,
      `תזהה את הסיכונים: ${p.risks[0] || "סיכוני השלב"}`,
      `תימנע מהטעות: ${p.mistakes[0] || "טעות אופיינית בשלב"}`,
    ],
    managerExpects: `המנהל מצפה שתדע להוביל את שלב ${p.he} (תוצרים: ${p.deliverables[0] || ""}), לזהות את הסיכונים, ולהסביר את מקומו במתודולוגיית SAP Activate.`,
    interview: [`מה מטרת שלב ${p.he} ב-SAP Activate?`, `אילו תוצרים מרכזיים מפיק שלב זה?`, `מהי טעות נפוצה בשלב ${p.he} וכיצד תימנע ממנה?`],
    visual: { flow: PHASE_NAMES, note: `מיקום השלב הנוכחי במסלול SAP Activate (6 שלבים).` },
    examples: { scenario: p.example, bullets: p.templates },
    transactions: { tools: [...p.meetings, ...p.templates] },
    debug: { issues: [...p.risks, ...p.mistakes] },
    scenario: { text: p.scenario },
    related: (p.links || []).map((l) => ({ label: l.label, href: l.href.includes("#") ? "#" : l.href })),
  };
}

const DISCIPLINES: CourseTopic[] = [
  discipline("cutover", "Cutover", "Cutover Center", "#dc2626", "ניהול ה-Cutover — לפני Go-Live, Go-Live ו-Hypercare.", CUTOVER.map((p) => ({ he: p.phase, items: p.items, hot: false })), { next: "Test Management" }),
  discipline("test", "ניהול בדיקות", "Test Management", "#16a34a", "רמות בדיקה (Unit→Performance), Entry/Exit וכלים.", TEST_LEVELS.map((l) => ({ he: l.he, items: [`${l.sub} · Entry: ${l.entry} · Exit: ${l.exit}`], hot: false })), { tools: TEST_TOOLS, next: "Defect Management" }),
  discipline("defect", "ניהול פגמים", "Defect Management", "#f97316", "חומרת פגמים (S1-S4), SLA ומחזור חיים.", DEFECT_SEVERITY.map((d) => ({ he: `${d.sev} · ${d.he}`, items: [`SLA: ${d.sla}`], hot: false })), { flow: DEFECT_FLOW, next: "Workshop" }),
  discipline("workshop", "סדנאות Fit-to-Standard", "Workshop Center", "#7c3aed", "סוגי סדנאות Fit-to-Standard והכנה.", WORKSHOP_TYPES.map((w) => ({ he: w.he, items: [w.sub], hot: false })), { bullets: WORKSHOP_PREP, next: "Blueprint" }),
  discipline("blueprint", "Blueprint", "Blueprint Center", "#0891b2", BLUEPRINT.approachHe, BLUEPRINT.items.map((b) => ({ he: b.he, items: [b.sub], hot: false })), { next: "סיימת" }),
];

export function buildDeliveryCourseData() {
  const ladder: LadderLevel[] = [
    ...LADDER.map((l, i) => ({ id: `lv${i}`, label: l.label, color: l.color, topics: l.ids.filter((id) => byId(id)).map((id) => ({ id, he: `${byId(id).n}. ${byId(id).he}` })) })),
    { id: "lvd", label: "תחומי מסירה", color: "#0f766e", topics: DISCIPLINES.map((d) => ({ id: d.id, he: d.he })) },
  ];
  return {
    meta: { he: "מרכז ניהול פרויקט SAP", sub: "למד מסירת פרויקט S/4HANA כמסלול — 6 שלבי SAP Activate מ-Discover עד Run. כל שלב: מטרה · תוצרים · גורמים · סיכונים · טעויות · ראיון · checklist.", eyebrow: "קורס אינטראקטיבי · SAP Activate", accent: "#3730a3" },
    startMeta: PHASES.map((p) => ({ id: p.id, he: `${p.n}. ${p.he}`, sub: p.goal.slice(0, 60), color: p.color, cat: p.id })),
    ladder,
    topics: [...PHASES.map(topic), ...DISCIPLINES],
    defaultTopic: "discover",
    crossLinks: [{ label: "ALM", href: "/alm/" }, { label: "אבטחה", href: "/security/" }, { label: "אינטגרציה", href: "/integration/" }, { label: "Migration", href: "/migration-cockpit/" }, { label: "מרכז S/4", href: "/s4hana/" }],
  };
}
