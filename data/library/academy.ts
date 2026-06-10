// ===== SAP Learning Academy — book registry + progress =====
// The Academy Template (per-book TextbookChapter[] of 18-facet LearningNodes) is
// the standard for EVERY SAP book. This registry tracks rollout status, chapter
// completion, validation, and quality score per book — feeds the dashboard.

import { PP_TEXTBOOK, PP_TEXTBOOK_STATS } from "./pp-textbook";
import { PP_QUALITY, PP_REVALIDATED } from "./pp-quality";

export type BookStatus = "live" | "in-progress" | "planned";

export interface AcademyBook {
  id: string;
  titleHe: string;
  titleEn: string;
  module: string;          // PP, PM, QM …
  status: BookStatus;
  chaptersTotal: number;
  chaptersDone: number;
  subchapters: number;
  nodes: number;
  validated: boolean;
  qualityScore?: number;   // 0-100 avg confidence
  href?: string;
  reportHref?: string;
  tintHe: string;          // tailwind accent
}

// ---- PP (built) — computed live from the data ----
const ppChapters = Object.keys(PP_TEXTBOOK).length;
const ppNodes = Object.values(PP_TEXTBOOK_STATS).reduce((s, c) => s + c.totalNodes, 0);
const ppSubs = Object.values(PP_TEXTBOOK).reduce((s, c) => s + c.subchapters.length, 0);
const ppQuality = Math.round(PP_QUALITY.reduce((s, c) => s + (PP_REVALIDATED[c.n] ?? c.confidence), 0) / PP_QUALITY.length);

export const ACADEMY_BOOKS: AcademyBook[] = [
  {
    id: "pp", titleHe: "תכנון ייצור ובקרה", titleEn: "Production Planning & Control with SAP S/4HANA",
    module: "PP", status: "live", chaptersTotal: 15, chaptersDone: ppChapters,
    subchapters: ppSubs, nodes: ppNodes, validated: true, qualityScore: ppQuality,
    href: "/library/pp/", reportHref: "/library/pp-quality-report/", tintHe: "from-brand to-brand-dark",
  },
  {
    id: "pm", titleHe: "תחזוקת מפעל (Plant Maintenance)", titleEn: "Configuring Plant Maintenance in SAP S/4HANA",
    module: "PM", status: "planned", chaptersTotal: 0, chaptersDone: 0, subchapters: 0, nodes: 0,
    validated: false, tintHe: "from-rose-500 to-rose-700",
  },
  {
    id: "pp-pi", titleHe: "ייצור תהליכי (PP-PI)", titleEn: "Process Manufacturing with SAP S/4HANA",
    module: "PP-PI", status: "planned", chaptersTotal: 0, chaptersDone: 0, subchapters: 0, nodes: 0,
    validated: false, tintHe: "from-blue-500 to-blue-700",
  },
  {
    id: "qm", titleHe: "ניהול איכות (Quality Management)", titleEn: "Quality Management with SAP S/4HANA",
    module: "QM", status: "planned", chaptersTotal: 0, chaptersDone: 0, subchapters: 0, nodes: 0,
    validated: false, tintHe: "from-emerald-500 to-emerald-700",
  },
  {
    id: "mm", titleHe: "ניהול חומרים (Materials Management)", titleEn: "Materials Management with SAP S/4HANA",
    module: "MM", status: "planned", chaptersTotal: 0, chaptersDone: 0, subchapters: 0, nodes: 0,
    validated: false, tintHe: "from-amber-500 to-amber-700",
  },
  {
    id: "wm", titleHe: "ניהול מחסן (Warehouse / EWM)", titleEn: "Warehouse Management with SAP S/4HANA",
    module: "WM", status: "planned", chaptersTotal: 0, chaptersDone: 0, subchapters: 0, nodes: 0,
    validated: false, tintHe: "from-violet-500 to-violet-700",
  },
];

export const ACADEMY_META = {
  templateVersion: "1.0",
  facets: [
    "מושג", "מטרה עסקית", "הסבר למתחילים", "הסבר ליועצים", "קונפיגורציה", "ניווט SPRO",
    "אובייקטי SAP", "T-Codes", "Tables", "Fiori Apps", "נתוני אב", "תרשים תהליך",
    "דוגמת CBC", "טעויות נפוצות", "פתרון תקלות", "שיטות מומלצות", "שאלות ראיון", "מסקנות מפתח",
  ],
  totals() {
    const live = ACADEMY_BOOKS.filter((b) => b.status === "live");
    return {
      books: ACADEMY_BOOKS.length,
      booksLive: live.length,
      chapters: ACADEMY_BOOKS.reduce((s, b) => s + b.chaptersDone, 0),
      nodes: ACADEMY_BOOKS.reduce((s, b) => s + b.nodes, 0),
    };
  },
};
