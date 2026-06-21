// SAP Mentor — offline answer engine. NO LLM, NO hallucination: every answer is
// built from real dataset relations + the curated knowledge layer + S/4 layer,
// each block tagged with its source. Intent-matching + retrieval only.

import { ALL_TABLES, objectIntel } from "@/lib/data";
import { tableByName, kgraph } from "@/lib/knowledge-graph";
import { PM_KNOWLEDGE } from "@/data/knowledge/pm-objects";
import { s4For } from "@/lib/s4";
import { LEARN_PATHS } from "@/data/learn/paths";
import { INCIDENTS } from "@/data/troubleshooting";

export type Trust = "dataset" | "curated" | "mixed" | "none";
export interface MentorChip { label: string; href?: string }
export interface MentorBlock { label?: string; text?: string; chips?: MentorChip[] }
export interface MentorAction { label: string; href: string }
export interface MentorAnswer { title: string; intent: string; blocks: MentorBlock[]; actions: MentorAction[]; trust: Trust }

const NAME_SET = new Map<string, string>(); // upper -> canonical
ALL_TABLES.forEach((t) => NAME_SET.set(t.tableName.toUpperCase(), t.tableName));

function entities(q: string): string[] {
  const out: string[] = [];
  for (const tok of q.toUpperCase().split(/[^A-Z0-9_]+/)) {
    if (tok.length >= 3 && NAME_SET.has(tok) && !out.includes(NAME_SET.get(tok)!)) out.push(NAME_SET.get(tok)!);
  }
  return out;
}
const objHref = (n: string) => `/object/${encodeURIComponent(n)}/`;
const objHrefIf = (n: string) => (NAME_SET.has(n.toUpperCase()) ? objHref(n) : undefined);
const chips = (arr: string[], hrefFn?: (n: string) => string | undefined): MentorChip[] => arr.map((x) => ({ label: x, href: hrefFn?.(x) }));

// best-match incident from the curated troubleshooting KB (152 incidents)
function findIncident(q: string, ents: string[]) {
  const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length >= 3);
  let best: typeof INCIDENTS[number] | null = null, score = 0;
  for (const inc of INCIDENTS) {
    const hay = `${inc.he} ${inc.symptom} ${inc.error || ""} ${inc.rootCauses.join(" ")} ${inc.tables.join(" ")} ${inc.analyzeTcodes.join(" ")}`.toLowerCase();
    let s = 0;
    for (const t of terms) if (hay.includes(t)) s++;
    for (const e of ents) if (inc.tables.includes(e) || inc.analyzeTcodes.includes(e) || inc.he.includes(e)) s += 2;
    if (s > score) { score = s; best = inc; }
  }
  return score >= 2 ? best : null;
}

const SUGGESTIONS = [
  "למה AUFK קשורה ל-AFKO?",
  "מה זה JEST?",
  "איך מתחילים ללמוד PM?",
  "מה השתנה ב-S/4 עבור AFKO?",
  "אילו T-Codes משתמשים ב-QMEL?",
  "מה נמצא מעלה ומטה מ-EQUI?",
  "COGI תקוע — מה לעשות?",
];

export function mentorSuggestions() { return SUGGESTIONS; }

export function mentorAnswer(raw: string): MentorAnswer | null {
  const q = (raw || "").trim();
  if (q.length < 2) return null;
  const lc = q.toLowerCase();
  const ents = entities(q);

  // ---- learning intent
  if (/(ללמוד|מתחיל|מאיפה|how.*(learn|start)|learn |start )/.test(lc) && ents.length < 2) {
    const mod = /pp-?pi|תהליכ/.test(lc) ? "pp-pi" : /\bpp\b|ייצור|production/.test(lc) ? "pp" : /pm|אחזק|maint/.test(lc) ? "pm" : null;
    if (mod && LEARN_PATHS[mod]) {
      const p = LEARN_PATHS[mod];
      return {
        title: `איך מתחילים ללמוד ${p.he}`, intent: "learn", trust: "curated",
        blocks: [
          { text: `מסלול הלמידה בנוי שלב-אחרי-שלב לפי התהליך העסקי. השלבים הראשונים:` },
          { label: "שלבים ראשונים", chips: chips(p.steps.slice(0, 4).map((s) => `${s.n}. ${s.titleHe}`)) },
        ],
        actions: [{ label: `פתח מסלול ${p.he}`, href: `/learn/${mod}/` }, { label: "כל המסלולים", href: "/learn/" }],
      };
    }
    return { title: "מאיפה מתחילים?", intent: "learn", trust: "curated", blocks: [{ text: "בחר תחום ללמידה מודרכת — PM (אחזקה) או Manufacturing (PP / PP-PI)." }], actions: [{ label: "פתח מרכז הלמידה", href: "/learn/" }] };
  }

  // ---- troubleshooting (symptom → root cause → resolution)
  if (/תקוע|נכשל|לא (נסגר|משתחרר|נוצר|עובד|מתעדכן)|חסום|שגיאה|נדחה|תקלה|fail|error|stuck|block|cannot|can'?t|won'?t|ru-?505|status ?5[0-9]|\b51\b|\b64\b/.test(lc)) {
    const inc = findIncident(q, ents);
    if (inc) {
      const blocks: MentorBlock[] = [{ label: "תסמין", text: inc.symptom }];
      if (inc.error && inc.error !== "—") blocks.push({ label: "קוד שגיאה", text: inc.error });
      blocks.push({ label: "גורמי שורש", text: inc.rootCauses.map((r) => `• ${r}`).join("\n") });
      if (inc.tables?.length) blocks.push({ label: "טבלאות לבדיקה", chips: chips(inc.tables, objHrefIf) });
      if (inc.analyzeTcodes?.length) blocks.push({ label: "T-Codes לאבחון", chips: chips(inc.analyzeTcodes) });
      blocks.push({ label: "תיקון", text: inc.fix.map((f) => `• ${f}`).join("\n") });
      if (inc.cbc) blocks.push({ label: "דוגמה מ-CBC", text: inc.cbc });
      return { title: inc.he, intent: "troubleshoot", trust: "curated", blocks, actions: [{ label: "פתח תקלה מלאה", href: `/troubleshooting/${inc.slug}/` }, { label: "מרכז תקלות", href: "/troubleshooting/" }] };
    }
    return { title: "פתרון תקלות", intent: "troubleshoot", trust: "curated", blocks: [{ text: "תאר את התסמין עם שם טבלה/T-Code (למשל 'COGI תקוע' או 'פקודה לא משתחררת')." }], actions: [{ label: "מרכז פתרון תקלות", href: "/troubleshooting/" }] };
  }

  // ---- relation between two entities ("why X related to Y")
  if (ents.length >= 2) {
    const [a, b] = ents;
    const ta = tableByName(a), tb = tableByName(b);
    let rel = ta?.relations.find((r) => r.table === b);
    let from = a, to = b;
    if (!rel) { rel = tb?.relations.find((r) => r.table === a); if (rel) { from = b; to = a; } }
    if (rel) {
      const dir = rel.role === "parent" ? `${from} (אב) → ${to} (צאצא)` : `${to} (אב) → ${from} (צאצא)`;
      return {
        title: `הקשר בין ${a} ל-${b}`, intent: "relation", trust: "dataset",
        blocks: [
          { label: "סוג קשר", text: `${dir}${rel.card ? ` · יחס ${rel.card}` : ""}` },
          ...(rel.desc ? [{ label: "משמעות", text: rel.desc }] : []),
          ...(rel.join ? [{ label: "JOIN", text: rel.join }] : []),
        ],
        actions: [{ label: `הדגש בגרף`, href: `/sap-infrastructure/?focus=${encodeURIComponent(a)}` }, { label: `כרטיס ${a}`, href: objHref(a) }, { label: `כרטיס ${b}`, href: objHref(b) }],
      };
    }
    return { title: `${a} ו-${b}`, intent: "relation", trust: "dataset", blocks: [{ text: `לא נמצא קשר ישיר במאגר בין ${a} ל-${b}. ייתכן קשר עקיף דרך טבלאות מתווכות.` }], actions: [{ label: `הדגש ${a} בגרף`, href: `/sap-infrastructure/?focus=${encodeURIComponent(a)}` }] };
  }

  // ---- single entity branches
  if (ents.length === 1) {
    const n = ents[0];
    const t = tableByName(n);
    const intel = objectIntel(n);
    const g = kgraph(n);
    const k = PM_KNOWLEDGE[n];
    const st = t ? s4For(n, t.s4Note, t.s4AltTable) : null;

    // S/4
    if (/s\/?4|השתנה|changed|מיגרצי|deprecat/.test(lc)) {
      const blocks: MentorBlock[] = [];
      if (k?.s4) blocks.push({ label: "ECC ↔ S/4", text: k.s4 });
      if (t?.s4Note) blocks.push({ label: "הערת S/4 (מאגר)", text: t.s4Note });
      if (t?.s4AltTable) blocks.push({ label: "חלופה ב-S/4", text: t.s4AltTable });
      if (st?.impact?.cds?.length) blocks.push({ label: "החלפת CDS", chips: chips(st.impact.cds) });
      if (!blocks.length) blocks.push({ text: `אין הערת S/4 מפורשת ל-${n} במאגר. ברמת השדה — נדרש אימות מול Simplification List / OSS.` });
        return { title: `מה משתנה ב-S/4HANA עבור ${n}`, intent: "s4", trust: k?.s4 ? "mixed" : "dataset", blocks, actions: [{ label: "ניתוח השפעה", href: `/impact/${encodeURIComponent(n)}/` }, { label: "מודל נתונים · פילטר S/4", href: `/sap-infrastructure/?focus=${encodeURIComponent(n)}` }, { label: `כרטיס ${n}`, href: objHref(n) }] };
    }
    // T-Codes
    if (/t-?code|טרנזקצי|transaction/.test(lc)) {
      const tc = intel?.tcodes || [];
      return { title: `T-Codes של ${n}`, intent: "tcodes", trust: "dataset",
        blocks: tc.length ? [{ label: "טרנזקציות (מהמאגר)", chips: chips(tc) }] : [{ text: `לא נמצאו T-Codes משויכים ל-${n} במאגר.` }],
        actions: [{ label: `כרטיס ${n}`, href: objHref(n) }] };
    }
    // upstream / downstream
    if (/upstream|מעלה|downstream|מטה|תלוי|depend|לפני|אחרי/.test(lc)) {
      const blocks: MentorBlock[] = [];
      if (g?.upstream.length) blocks.push({ label: "מעלה (האובייקט תלוי ב)", chips: chips(g.upstream, objHref) });
      if (g?.downstream.length) blocks.push({ label: "מטה (תלויים באובייקט)", chips: chips(g.downstream, objHref) });
      if (!blocks.length) blocks.push({ text: `לא נמצאו תלויות ישירות ל-${n} במאגר.` });
      return { title: `תלויות של ${n}`, intent: "deps", trust: "dataset", blocks, actions: [{ label: "ניתוח השפעה", href: `/impact/${encodeURIComponent(n)}/` }, { label: `הדגש בגרף`, href: `/sap-infrastructure/?focus=${encodeURIComponent(n)}` }, { label: `כרטיס ${n}`, href: objHref(n) }] };
    }
    // default: what is / used for
    const blocks: MentorBlock[] = [];
    if (k) { blocks.push({ label: "מה זה", text: k.role }); blocks.push({ label: "למה צריך", text: k.why }); blocks.push({ label: "מתי משתמשים", text: k.whenUsed }); }
    else if (t) blocks.push({ label: "תיאור (מהמאגר)", text: t.descriptionHe || t.descriptionEn });
    const tc = intel?.tcodes?.slice(0, 6) || [];
    if (tc.length) blocks.push({ label: "T-Codes", chips: chips(tc) });
    if (g?.upstream.length || g?.downstream.length) blocks.push({ label: "קשרים", chips: chips([...(g?.upstream || []), ...(g?.downstream || [])].slice(0, 8), objHref) });
    if (st?.impacted && (k?.s4 || t?.s4Note)) blocks.push({ label: "S/4", text: k?.s4 || t!.s4Note });
    return { title: `מה זה ${n}?`, intent: "explain", trust: k ? "mixed" : "dataset", blocks, actions: [{ label: `כרטיס מלא ${n}`, href: objHref(n) }, { label: "ניתוח השפעה", href: `/impact/${encodeURIComponent(n)}/` }, { label: "הדגש בגרף", href: `/sap-infrastructure/?focus=${encodeURIComponent(n)}` }] };
  }

  // ---- general S/4 (no entity)
  if (/s\/?4|מיגרצי|migration/.test(lc)) {
    return { title: "השפעת S/4HANA", intent: "s4-general", trust: "curated", blocks: [{ text: "טבלאות מושפעות מסומנות בצהוב במודל הנתונים — MATDOC, ACDOCA, Business Partner ועוד. סנן לפי 'מושפע S/4'." }], actions: [{ label: "מודל נתונים · פילטר S/4", href: "/sap-infrastructure/" }] };
  }

  // ---- fallback
  return { title: "לא נמצאה תשובה ישירה", intent: "fallback", trust: "none",
    blocks: [{ text: "נסה לכלול שם טבלה (למשל AUFK, QMEL, MARA) או שאל 'איך מתחילים ללמוד PM'." }, { label: "אפשר לחפש במאגר", chips: [] }],
    actions: [{ label: "חיפוש מלא (⌘K)", href: "#palette" }, { label: "מרכז הלמידה", href: "/learn/" }] };
}
