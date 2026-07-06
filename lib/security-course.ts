// Security Center → interactive course adapter. Reframes existing SecArea data
// into the normalized course model (no new SAP facts; derivations are grounded
// in real fields). Returns data only — the component adds start-card icons.
import { AREAS, SEC_CAT, SEC_ARCH, ROLE_DESIGN, FIORI_MODEL, SEC_ERRORS, TROUBLE_FLOW, type SecArea } from "@/data/security";
import type { CourseTopic, CourseVisualLayer } from "@/components/learn/course-center";
import type { LadderLevel } from "@/components/learn/course-kit";

export const COURSE = "security";
const byId = (id: string) => AREAS.find((a) => a.id === id)!;

const LADDER: { label: string; color: string; ids: string[] }[] = [
  { label: "מתחיל", color: "#16a34a", ids: ["su01", "pfcg"] },
  { label: "בינוני", color: "#2563eb", ids: ["su53", "stauthtrace", "suim"] },
  { label: "מתקדם", color: "#d97706", ids: ["authobjects", "profiles", "single", "composite", "derived"] },
  { label: "מומחה", color: "#dc2626", ids: ["catalogs", "spaces"] },
];
const ORDER = LADDER.flatMap((l) => l.ids);
const nextOf = (id: string) => { const i = ORDER.indexOf(id); return i >= 0 && i < ORDER.length - 1 ? byId(ORDER[i + 1]) : undefined; };

const WHY: Record<SecArea["cat"], string> = {
  admin: "בלי משתמש ותפקיד תקינים שום פעולה ב-SAP לא תרוץ — נקודת הפתיחה של כל הרשאה.",
  diag: "רוב קריאות התמיכה הן 'אין הרשאה' — אבחון מהיר ומדויק חוסך שעות וחוסם סיכון.",
  object: "אובייקט ההרשאה הוא היחידה שנבדקת בפועל בזמן ריצה — בלי להבין אותו אי אפשר לתקן כשל.",
  roletype: "מבנה תפקידים נכון קובע אם המערכת ניתנת לתחזוקה או הופכת לבלגן.",
  fiori: "ב-S/4 המשתמש חי ב-Fiori — בלי קטלוגים/Spaces ו-Business Roles אין גישה לאפליקציות.",
};
const CAT_LAYER: Record<SecArea["cat"], string> = { admin: "Roles", diag: "Runtime Check", object: "Authorizations", roletype: "Roles", fiori: "Fiori / IAM" };

function topic(a: SecArea): CourseTopic {
  const nx = nextOf(a.id);
  return {
    id: a.id, he: a.he, en: a.en, color: a.color,
    intro: [
      { label: "מה זה?", text: a.what, color: a.color },
      { label: "למה צריך את זה?", text: WHY[a.cat], color: "#2563eb" },
      { label: "מתי תשתמש?", text: a.when, color: "#16a34a" },
      { label: "מה היועץ באמת עושה כאן?", text: a.tips[0] || `יישום ${a.he} לפי תהליך, עם מינימום הרשאות ועקיבות.`, color: "#7c3aed" },
      { label: "ECC", text: a.ecc, color: "#64748b" },
      { label: "S/4HANA", text: a.s4, color: "#0891b2" },
      { label: "טעויות נפוצות", text: a.troubleshooting.slice(0, 3).join(" · "), color: "#dc2626" },
      { label: "הנושא הבא המומלץ", text: nx ? `${nx.he} — ${nx.what}` : "סיימת את המסלול 🎓", color: "#d97706" },
    ],
    checklist: [
      `תבין מה זה ${a.he} ומתי משתמשים בו`,
      a.tcodes.length ? `תכיר את הטרנזקציות: ${a.tcodes.slice(0, 4).join(", ")}` : `תכיר את הכלים של ${a.he}`,
      a.troubleshooting[0] ? `תדע לאבחן: ${a.troubleshooting[0]}` : `תדע לזהות תקלה אופיינית`,
      `תבין מה השתנה ב-ECC→S/4HANA בתחום זה`,
      a.tips[0] ? `תיישם best practice: ${a.tips[0]}` : `תעבוד לפי best practice`,
    ],
    managerExpects: `המנהל מצפה שתדע להפעיל ${a.tcodes[0] || a.he} בביטחון, לאבחן ${a.troubleshooting[0] || "כשל הרשאה"} עד שורש, ולהסביר את ${a.he} (כולל ECC↔S/4) בראיון.`,
    interview: [`מה זה ${a.he} ומתי תשתמש בו?`, a.troubleshooting[0] ? `כיצד תאבחן: ${a.troubleshooting[0]}?` : `כיצד תאבחן כשל נפוץ ב-${a.he}?`, `מה השתנה ב-${a.he} במעבר ל-S/4HANA?`],
    visual: { layers: SEC_ARCH.map((l) => ({ he: l.he, en: l.layer, items: l.items, hot: l.layer === CAT_LAYER[a.cat] })), flow: a.tcodes.slice(0, 6) },
    examples: { scenario: a.when, bullets: a.tips },
    transactions: { tcodes: a.tcodes, tables: a.tables.map((t) => t.split(" ")[0]) },
    debug: { issues: a.troubleshooting, steps: a.debug, oss: a.notes },
    scenario: { text: a.scenario, incidents: a.incidents.map((i) => ({ slug: i.slug, label: i.label })) },
    related: a.links.map((l) => ({ label: l.label, href: l.href.includes("/security/#") ? "#" : l.href })),
  };
}

// Security disciplines preserved as full course topics (no depth lost).
function disc(id: string, he: string, en: string, color: string, what: string, layers: CourseVisualLayer[], opts: { flow?: string[]; issues?: string[]; steps?: string[]; next: string }): CourseTopic {
  return {
    id, he, en, color,
    intro: [
      { label: "מה זה?", text: what, color },
      { label: "למה צריך את זה?", text: "תחום-רוחב באבטחת SAP — חיוני לעבודה נכונה ולמניעת סיכון.", color: "#2563eb" },
      { label: "מה היועץ באמת עושה כאן?", text: `מיישם ומנהל את ${he} בפרויקט אמיתי.`, color: "#7c3aed" },
      { label: "הנושא הבא המומלץ", text: opts.next, color: "#d97706" },
    ],
    checklist: [`תבין מה זה ${he}`, `תכיר את המרכיבים`, `תדע ליישם ${he} נכון`, `תזהה טעויות נפוצות`, `תסביר את ${he} בראיון`],
    managerExpects: `המנהל מצפה שתשלוט ב-${he} ותיישם אותו לפי best practice.`,
    interview: [`מה זה ${he} ומתי תיישם אותו?`, `מהי טעות נפוצה ב-${he}?`],
    visual: { layers, flow: opts.flow },
    debug: { issues: opts.issues, steps: opts.steps },
    related: [],
  };
}
const DISCIPLINES: CourseTopic[] = [
  disc("roledesign", "עיצוב תפקידים", "Role Design", "#2563eb", "עקרונות עיצוב תפקידים — single/composite/derived, SU24, least-privilege ו-org levels.", ROLE_DESIGN.map((r) => ({ he: r.he, items: [r.sub], hot: false })), { next: "מודל Fiori" }),
  disc("fiorimodel", "מודל Fiori/IAM", "Fiori Authorization Model", "#d97706", "שרשרת ההרשאה ב-Fiori — OData→Catalog→Space→Business Role→אובייקטי יישום.", FIORI_MODEL.map((f) => ({ he: f.he, items: [f.sub], hot: false })), { next: "שגיאות נפוצות" }),
  disc("errors", "מרכז שגיאות", "Common Errors", "#dc2626", "השגיאות הנפוצות באבטחה — שגיאה, גורם ותיקון.", [], { issues: SEC_ERRORS.map((e) => `${e.err} — ${e.cause} → ${e.fix}`), next: "זרימת אבחון" }),
  disc("troubleflow", "זרימת אבחון", "Troubleshooting Flow", "#be185d", "הרצף הסטנדרטי לאבחון כשל הרשאה — מכשל ועד אימות.", [], { flow: TROUBLE_FLOW.map((s) => `${s.step}`), steps: TROUBLE_FLOW.map((s) => `${s.step} (${s.t}): ${s.do}`), next: "סיימת" }),
];

export function buildSecurityCourseData() {
  const cats = (["admin", "diag", "object", "roletype", "fiori"] as const).map((cat) => ({ cat, ...SEC_CAT[cat], items: AREAS.filter((x) => x.cat === cat) }));
  const ladder: LadderLevel[] = [
    ...LADDER.map((l, i) => ({ id: `lv${i}`, label: l.label, color: l.color, topics: l.ids.filter((id) => byId(id)).map((id) => ({ id, he: byId(id).he })) })),
    { id: "lvd", label: "תחומי-רוחב", color: "#0f766e", topics: DISCIPLINES.map((d) => ({ id: d.id, he: d.he })) },
  ];
  return {
    meta: { he: "מרכז אבטחה והרשאות SAP", sub: "למד אבטחת SAP כמסלול — מ-SU01/PFCG ועד Fiori/IAM. כל נושא: מה זה · למה · מתי · מה היועץ עושה · ECC↔S/4 · טעויות · ראיון · checklist.", eyebrow: "קורס אינטראקטיבי · Security & IAM", accent: "#0f766e" },
    startMeta: cats.map((g) => ({ id: g.items[0]?.id || "su01", he: g.he, sub: `${g.items.length} נושאים · התחל מ-${g.items[0]?.he || ""}`, color: g.c, cat: g.cat })),
    ladder,
    topics: [...AREAS.map(topic), ...DISCIPLINES],
    defaultTopic: "su01",
    crossLinks: [{ label: "מרכז תקלות", href: "/incidents/" }, { label: "אינטגרציה", href: "/integration/" }, { label: "ALM", href: "/alm/" }, { label: "Fiori", href: "/fiori/" }, { label: "מרכז S/4", href: "/s4hana/" }],
  };
}
