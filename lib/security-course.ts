// Security Center → interactive course. Reframes the existing SecArea data
// (data/security.ts) into a learning experience: a Beginner→Expert ladder,
// Start-Here entry points, and per-topic intro / checklist / manager-expects /
// interview DERIVED from real fields — no new SAP facts are invented.
import { AREAS, type SecArea } from "@/data/security";

export const COURSE = "security";

const byId = (id: string) => AREAS.find((a) => a.id === id)!;

// Curated pedagogical ordering (grouping real topics by depth — not new content)
export const LADDER: { id: string; label: string; color: string; ids: string[] }[] = [
  { id: "beg", label: "מתחיל", color: "#16a34a", ids: ["su01", "pfcg"] },
  { id: "int", label: "בינוני", color: "#2563eb", ids: ["su53", "stauthtrace", "suim"] },
  { id: "adv", label: "מתקדם", color: "#d97706", ids: ["authobjects", "profiles", "single", "composite", "derived"] },
  { id: "exp", label: "מומחה", color: "#dc2626", ids: ["catalogs", "spaces"] },
];

export const ladderLevels = () => LADDER.map((l) => ({ id: l.id, label: l.label, color: l.color, topics: l.ids.filter((id) => byId(id)).map((id) => ({ id, he: byId(id).he })) }));

// flat learning order → "next topic"
const ORDER = LADDER.flatMap((l) => l.ids);
export const nextTopic = (id: string): SecArea | undefined => { const i = ORDER.indexOf(id); return i >= 0 && i < ORDER.length - 1 ? byId(ORDER[i + 1]) : undefined; };

// Start-Here entry points (5 — one per category, real first topic of each)
const WHY: Record<SecArea["cat"], string> = {
  admin: "בלי משתמש ותפקיד תקינים שום פעולה ב-SAP לא תרוץ — זו נקודת הפתיחה של כל הרשאה.",
  diag: "רוב קריאות התמיכה הן 'אין הרשאה' — אבחון מהיר ומדויק חוסך שעות וחוסם סיכון.",
  object: "אובייקט ההרשאה הוא היחידה שנבדקת בפועל בזמן ריצה — בלי להבין אותו אי אפשר לתקן כשל.",
  roletype: "מבנה תפקידים נכון (single/composite/derived) קובע אם המערכת ניתנת לתחזוקה או הופכת לבלגן.",
  fiori: "ב-S/4 המשתמש חי ב-Fiori — בלי קטלוגים/Spaces ו-Business Roles אין גישה לאפליקציות.",
};

export interface SecTopicCourse {
  why: string;
  consultant: string;
  intro: { label: string; text: string; color: string }[];
  checklist: string[];
  managerExpects: string;
  interview: string[];
}

export function topicCourse(a: SecArea): SecTopicCourse {
  const why = WHY[a.cat];
  const consultant = a.tips[0] || `יישום ${a.he} לפי תהליך עסקי, תוך הקפדה על מינימום הרשאות ועקיבות.`;
  const nx = nextTopic(a.id);
  const tcodeStr = a.tcodes.slice(0, 4).join(", ");
  const intro = [
    { label: "מה זה?", text: a.what, color: a.color },
    { label: "למה צריך את זה?", text: why, color: "#2563eb" },
    { label: "מתי תשתמש?", text: a.when, color: "#16a34a" },
    { label: "מה היועץ באמת עושה כאן?", text: consultant, color: "#7c3aed" },
    { label: "ECC", text: a.ecc, color: "#64748b" },
    { label: "S/4HANA", text: a.s4, color: "#0891b2" },
    { label: "טעויות נפוצות", text: a.troubleshooting.slice(0, 3).join(" · "), color: "#dc2626" },
    { label: "הנושא הבא המומלץ", text: nx ? `${nx.he} — ${nx.what}` : "סיימת את המסלול 🎓", color: "#d97706" },
  ];
  const checklist = [
    `תבין מה זה ${a.he} ומתי משתמשים בו`,
    tcodeStr ? `תכיר את הטרנזקציות המרכזיות: ${tcodeStr}` : `תכיר את הכלים של ${a.he}`,
    a.troubleshooting[0] ? `תדע לאבחן: ${a.troubleshooting[0]}` : `תדע לזהות תקלה אופיינית`,
    `תבין מה השתנה ב-ECC→S/4HANA בתחום זה`,
    a.tips[0] ? `תיישם best practice: ${a.tips[0]}` : `תיישם עבודה לפי best practice`,
  ];
  const managerExpects = `המנהל מצפה שתדע להפעיל ${a.tcodes[0] || a.he} בביטחון, לאבחן ${a.troubleshooting[0] || "כשל הרשאה"} עד שורש, ולהסביר את ${a.he} (כולל ההבדל ECC↔S/4) בראיון.`;
  const interview = [
    `מה זה ${a.he} ומתי תשתמש בו?`,
    a.troubleshooting[0] ? `כיצד תאבחן: ${a.troubleshooting[0]}?` : `כיצד תאבחן כשל נפוץ ב-${a.he}?`,
    `מה השתנה ב-${a.he} במעבר ל-S/4HANA?`,
  ];
  return { why, consultant, intro, checklist, managerExpects, interview };
}
