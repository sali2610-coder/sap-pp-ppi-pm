// Fiori & UX Center → interactive course adapter (reframes data/fiori.ts).
// Fiori data is section-based; this maps it into 6 progressive topics. Topic
// framing reuses the existing descriptions — no new SAP facts.
import { FIORI_ARCH, APP_TYPES, ODATA_PARTS, ODATA_TCODES, ODATA_VERSIONS, UI5_PARTS, UI5_NOTE, RAP_PARTS, RAP_NOTE, FIORI_INCIDENTS, FIORI_DEBUG, FIORI_EVOLUTION, FIORI_INTERVIEW } from "@/data/fiori";
import type { CourseTopic, CourseVisualLayer } from "@/components/learn/course-center";
import type { LadderLevel } from "@/components/learn/course-kit";

export const COURSE = "fiori";

const evo = (kw: string) => { const r = FIORI_EVOLUTION.find((e) => e.topic.includes(kw) || e.s4.includes(kw)); return r ? `ECC: ${r.ecc} · S/4: ${r.s4}` : "ECC: SAP GUI · S/4: Fiori Launchpad (Fiori Elements / RAP / OData V4)."; };
const partsLayers = (parts: { he: string; en: string; desc: string }[]): CourseVisualLayer[] => parts.map((p) => ({ he: p.he, en: p.en, items: [p.desc], hot: false }));

interface TopicSpec {
  id: string; he: string; en: string; color: string;
  what: string; why: string; consultant: string; eccS4: string; next: string;
  parts: { he: string; en: string; desc: string }[];
  note?: string; tcodes?: string[]; issues?: string[]; steps?: string[];
  interview: string[]; manager: string; checklist: string[];
}

const SPECS: TopicSpec[] = [
  {
    id: "arch", he: "ארכיטקטורת Fiori", en: "Fiori Architecture", color: "#2563eb",
    what: "כיצד בקשת Fiori זורמת מ-Launchpad ועד ה-Backend — Frontend Server, Gateway, OData ושכבת ה-Backend.",
    why: "בלי להבין את שרשרת ה-Launchpad→Gateway→Backend אי אפשר לאבחן שום תקלת Fiori.",
    consultant: "מגדיר פריסה (embedded/hub), מנתב OData, ומחבר Catalogs/Spaces ל-Business Roles.",
    eccS4: evo("ממשק"), next: "סוגי אפליקציות Fiori",
    parts: FIORI_ARCH.map((l) => ({ he: l.he, en: l.en, desc: l.desc })),
    interview: ["תאר את ארכיטקטורת Fiori מקצה לקצה.", "מה ההבדל בין פריסת embedded ל-hub של ה-Frontend Server?"],
    manager: "המנהל מצפה שתדע לשרטט את שרשרת Launchpad→Gateway(/IWFND,/IWBEP)→Backend ולאבחן היכן נשברת בקשת OData.",
    checklist: ["תבין את שכבות ה-Fiori", "תדע מה תפקיד ה-Gateway (/IWFND מול /IWBEP)", "תבין embedded מול hub", "תדע היכן נכשלת בקשת OData", "תכיר את מקום ה-Catalogs/Spaces"],
  },
  {
    id: "apptypes", he: "סוגי אפליקציות", en: "App Types", color: "#7c3aed",
    what: "שלושת סוגי אפליקציות Fiori: Transactional, Analytical ו-Fact Sheet.",
    why: "כל סוג נבנה ונתחזק אחרת — סיווג נכון קובע מהיכן מגיע המידע וכיצד מאבחנים.",
    consultant: "מזהה את סוג האפליקציה, את ה-CDS/OData שמאחוריה ואת אופן הצריכה.",
    eccS4: evo("סוג"), next: "OData",
    parts: APP_TYPES.map((a) => ({ he: a.he, en: a.en, desc: `${a.desc} (${a.tech.join(", ")})` })),
    interview: ["מה ההבדל בין שלושת סוגי אפליקציות Fiori?", "מאיפה Analytical app שואב את הנתונים?"],
    manager: "המנהל מצפה שתזהה סוג אפליקציה (Transactional/Analytical/Fact Sheet) ותדע מה עומד מאחוריה.",
    checklist: ["תבחין בין שלושת סוגי האפליקציות", "תבין Transactional (CRUD/Draft)", "תבין Analytical (CDS/Smart Business)", "תבין Fact Sheet (search)", "תדע לבחור סוג מתאים"],
  },
  {
    id: "odata", he: "OData", en: "OData (SEGW/IWFND/IWBEP)", color: "#d97706",
    what: "פרוטוקול ה-REST של SAP — SEGW/RAP, Gateway hub (/IWFND), backend (/IWBEP), $metadata ו-Entity Sets.",
    why: "OData הוא הצינור בין כל אפליקציית Fiori ל-backend — הבסיס לכל אבחון ופיתוח.",
    consultant: "רושם ומפעיל services (/IWFND/MAINT_SERVICE), קורא error logs ומנקה cache.",
    eccS4: evo("OData"), next: "UI5",
    parts: ODATA_PARTS, note: ODATA_VERSIONS, tcodes: ODATA_TCODES,
    issues: ["Service לא רשום/לא פעיל (404)", "$metadata לא נטען (cache)", "401/403 הרשאה/authentication", "500 exception ב-data provider"],
    steps: ["/IWFND/ERROR_LOG עם timestamp", "/IWFND/GW_CLIENT להרצה ידנית", "Cache cleanup אחרי שינוי metadata"],
    interview: ["OData v2 מול v4 — מתי כל אחד?", "כיצד תאבחן 'App could not be started'?"],
    manager: "המנהל מצפה שתדע לרשום/להפעיל OData service, לקרוא /IWFND/ERROR_LOG ולנקות cache.",
    checklist: ["תבין מה זה OData ו-Entity Sets", "תכיר /IWFND/MAINT_SERVICE ו-ERROR_LOG", "תבדל v2 מ-v4", "תדע לאבחן 404/403/500", "תדע לנקות metadata cache"],
  },
  {
    id: "ui5", he: "UI5", en: "SAPUI5 / MVC", color: "#0d9488",
    what: "MVC, Component+manifest.json, Views, Controllers, Routing ו-Fragments.",
    why: "ב-freestyle UI5 הכול נכתב ידנית — הבנת ה-MVC חיונית לפיתוח ולתחזוקה.",
    consultant: "בונה/מתחזק אפליקציות UI5, מגדיר routing ב-manifest ומשתמש ב-Fragments לשימוש חוזר.",
    eccS4: evo("אפליקציה"), next: "RAP",
    parts: UI5_PARTS, note: UI5_NOTE,
    interview: ["מהו manifest.json ומה תפקידו?", "מה ההבדל בין Fiori Elements ל-freestyle UI5?"],
    manager: "המנהל מצפה שתבין MVC, manifest.json, routing ו-Fragments ותדע מתי Fiori Elements מול freestyle.",
    checklist: ["תבין את עקרון ה-MVC", "תכיר את ה-Component ו-manifest.json", "תבין Routing ו-Targets", "תבין Fragments לשימוש חוזר", "תדע Fiori Elements מול freestyle"],
  },
  {
    id: "rap", he: "RAP", en: "ABAP RESTful (RAP)", color: "#16a34a",
    what: "המודל המודרני ב-S/4: CDS + Behavior Definition + Service Binding → OData V4 ל-Fiori Elements.",
    why: "RAP מחליף את SEGW — הסטנדרט לפיתוח אפליקציות S/4 חדשות.",
    consultant: "מגדיר CDS + Behavior Definition, מממש את ה-behavior ומפרסם Service Binding.",
    eccS4: evo("פיתוח"), next: "תקלות Fiori",
    parts: RAP_PARTS, note: RAP_NOTE,
    interview: ["מה החליף את SEGW ב-S/4 ולמה?", "מהם managed מול unmanaged ב-RAP?"],
    manager: "המנהל מצפה שתבין את שרשרת RAP (CDS→BDEF→Service Binding) ומדוע היא מחליפה את SEGW.",
    checklist: ["תבין מהו RAP ולמה הוא מחליף SEGW", "תכיר CDS כמודל הנתונים", "תבין Behavior Definition", "תבין Service Binding (V4)", "תקשר RAP ל-Fiori Elements"],
  },
  {
    id: "incidents", he: "תקלות Fiori", en: "Fiori Incidents & Debug", color: "#dc2626",
    what: "התקלות הנפוצות: App not found, Catalog missing, Authorization, OData failure, Metadata cache, Gateway errors.",
    why: "רוב קריאות התמיכה ב-Fiori הן אחת מ-6 התקלות הללו — אבחון מהיר חוסך שעות.",
    consultant: "מאבחן לפי הסטטוס (404/403/500), קורא error logs ומנקה cache.",
    eccS4: "תקלות Fiori רלוונטיות ל-S/4 בלבד (ECC = SAP GUI).", next: "סיימת את המסלול",
    parts: FIORI_INCIDENTS.map((i) => ({ he: i.he, en: i.tcodes.join(" "), desc: `${i.symptom} → ${i.fix}` })),
    issues: FIORI_INCIDENTS.map((i) => `${i.he}: ${i.cause}`),
    steps: FIORI_DEBUG.map((d) => `${d.step} (${d.t}): ${d.do}`),
    interview: ["כיצד תאבחן 'App could not be started'?", "מה ההבדל בין כשל catalog לכשל authorization?"],
    manager: "המנהל מצפה שתאבחן כל אחת מ-6 תקלות ה-Fiori הנפוצות עד שורש (F12→ERROR_LOG→STAUTHTRACE→IWBEP).",
    checklist: ["תזהה App not found ותתקן", "תבדיל catalog missing מ-authorization", "תאבחן OData failure (500)", "תטפל ב-metadata cache", "תאבחן gateway/system-alias"],
  },
];

const ORDER = SPECS.map((s) => s.id);

function topic(s: TopicSpec): CourseTopic {
  return {
    id: s.id, he: s.he, en: s.en, color: s.color,
    intro: [
      { label: "מה זה?", text: s.what, color: s.color },
      { label: "למה צריך את זה?", text: s.why, color: "#2563eb" },
      { label: "מה היועץ באמת עושה כאן?", text: s.consultant, color: "#7c3aed" },
      { label: "ECC ↔ S/4HANA", text: s.eccS4, color: "#0891b2" },
      { label: "הנושא הבא המומלץ", text: s.next, color: "#d97706" },
    ],
    checklist: s.checklist,
    managerExpects: s.manager,
    interview: s.interview,
    visual: { layers: partsLayers(s.parts), note: s.note },
    examples: { bullets: s.parts.map((p) => `${p.he} — ${p.desc}`) },
    transactions: { tcodes: s.tcodes },
    debug: { issues: s.issues, steps: s.steps },
    related: [],
  };
}

export function buildFioriCourseData() {
  const LADDER: { label: string; color: string; ids: string[] }[] = [
    { label: "מתחיל", color: "#16a34a", ids: ["arch", "apptypes"] },
    { label: "בינוני", color: "#2563eb", ids: ["odata", "ui5"] },
    { label: "מתקדם", color: "#d97706", ids: ["rap"] },
    { label: "מומחה", color: "#dc2626", ids: ["incidents"] },
  ];
  const byId = (id: string) => SPECS.find((s) => s.id === id)!;
  const ladder: LadderLevel[] = LADDER.map((l, i) => ({ id: `lv${i}`, label: l.label, color: l.color, topics: l.ids.map((id) => ({ id, he: byId(id).he })) }));
  void ORDER; void FIORI_INTERVIEW;
  return {
    meta: { he: "מרכז Fiori ו-UX", sub: "למד את שכבת ה-UX של SAP כמסלול — ארכיטקטורה, סוגי אפליקציות, OData, UI5, RAP ותקלות. כל נושא: מה זה · איך עובד · ECC↔S/4 · אבחון · ראיון · checklist.", eyebrow: "קורס אינטראקטיבי · Fiori & UX", accent: "#0e7490" },
    startMeta: SPECS.map((s) => ({ id: s.id, he: s.he, sub: s.what.slice(0, 60), color: s.color, cat: s.id })),
    ladder,
    topics: SPECS.map(topic),
    defaultTopic: "arch",
    crossLinks: [{ label: "אבטחה", href: "/security/" }, { label: "אינטגרציה", href: "/integration/" }, { label: "מרכז תקלות", href: "/incidents/" }, { label: "ALM", href: "/alm/" }, { label: "מרכז S/4", href: "/s4hana/" }],
  };
}
