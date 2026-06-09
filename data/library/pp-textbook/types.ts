// ===== PP Digital Textbook — shared types =====
// Every node (chapter subchapter + nested source sub-heading) is a complete
// LearningNode with 18 facets of authored Hebrew — enough to study the topic
// without the original book. Hierarchy follows the source book exactly.
// Transformative Hebrew (no source prose); SAP identifiers verbatim EN.

export interface FlowStep { he: string; code?: string; note?: string }
export interface QA { qHe: string; aHe: string }
export interface RelatedLink { labelHe: string; href: string }

export interface LearningNode {
  id: string;
  titleHe: string;
  titleEn: string;
  // 1–3 explanations at three levels
  execHe: string;        // executive
  beginnerHe: string;    // beginner / first-principles
  consultantHe: string;  // consultant / deep
  // 4–6 context + examples
  purposeHe: string;          // business purpose
  processExampleHe: string;   // real end-to-end process example
  cbcHe: string;              // CBC production example
  // 7–11 reference
  navHe: string[];    // SAP navigation + SPRO path(s)
  tables: string[];
  tcodes: string[];
  fiori: string[];
  // 12–13
  configHe: string[];      // configuration details
  flow?: FlowStep[];       // process-flow diagram
  masterDataHe?: string[]; // master-data impact
  // 14–16
  mistakesHe: string[];      // common mistakes
  troubleshootHe: string[];  // troubleshooting scenarios
  bestPracticeHe: string[];  // best practices
  // 17–18
  interviewHe: QA[];     // interview questions
  takeawaysHe: string[]; // key takeaways
  relatedHe?: RelatedLink[]; // links to related PP / PP-PI concepts
  children?: LearningNode[];
}

export interface TextbookChapter {
  n: number;
  titleHe: string;
  titleEn: string;
  introHe: string;
  subchapters: LearningNode[];
}

// reading-time estimate (Hebrew ~180 wpm) per node, recursive
export function nodeWordCount(n: LearningNode): number {
  const txt = [
    n.execHe, n.beginnerHe, n.consultantHe, n.purposeHe, n.processExampleHe, n.cbcHe,
    ...n.configHe, ...(n.masterDataHe ?? []), ...n.mistakesHe, ...n.troubleshootHe,
    ...n.bestPracticeHe, ...n.takeawaysHe, ...n.interviewHe.flatMap((q) => [q.qHe, q.aHe]),
  ].join(" ");
  return txt.split(/\s+/).filter(Boolean).length;
}

export function countNodes(n: LearningNode): number {
  return 1 + (n.children?.reduce((s, c) => s + countNodes(c), 0) ?? 0);
}
