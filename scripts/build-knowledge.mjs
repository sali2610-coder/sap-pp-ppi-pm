// Build a website-ready knowledge package from Book #1:
//   knowledge/books/sap-pm/{chapters,images,translations,glossary}
// - one standalone markdown per chapter (English + Hebrew, embedded figures)
// - images copied + references rewritten to ./images/
// - per-chapter Hebrew translation file
// - bilingual glossary (SAP terms kept English)
//
// Run: node scripts/build-knowledge.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BOOK = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "library", "book1-full.json"), "utf8"));
const FIGS = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "library", "book1-figures.json"), "utf8"));
const FIG_SRC = path.join(ROOT, "public", "assets", "library", "book1", "figures");

const BASE = path.join(ROOT, "knowledge", "books", "sap-pm");
const DIRS = ["chapters", "images", "translations", "glossary"];
for (const d of DIRS) fs.mkdirSync(path.join(BASE, d), { recursive: true });

// copy figures into knowledge images/
let copied = 0;
for (const figs of Object.values(FIGS)) {
  for (const f of figs) {
    const name = path.basename(f.file);
    const src = path.join(FIG_SRC, name);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(BASE, "images", name));
      copied++;
    }
  }
}

const pad = (n) => String(n).padStart(3, "0");

for (const ch of BOOK.chapters) {
  const figs = FIGS[String(ch.n)] ?? [];
  const figMd = figs
    .map((f) => `![SAP figure p.${f.page} / איור עמ' ${f.page}](../images/${path.basename(f.file)})`)
    .join("\n\n");

  // English chapter markdown with embedded figures + Hebrew blockquotes
  let md = `# Chapter ${ch.n}: ${ch.title}\n\n`;
  md += `> Book: Configuring Plant Maintenance in SAP S/4HANA · pages ${ch.pages[0]}–${ch.pages[1]} · ${figs.length} figures\n\n`;
  if (figMd) md += `## Figures\n\n${figMd}\n\n`;
  for (const s of ch.sections) {
    md += `## ${s.id} ${s.title}\n\n`;
    md += `${s.en}\n\n`;
    if (s.he) md += `<div dir="rtl">\n\n**עברית:** ${s.he}\n\n</div>\n\n`;
    else md += `> _תרגום עברי בהכנה._\n\n`;
  }
  md += `\n---\nSource: Configuring Plant Maintenance in SAP S/4HANA pp.${ch.pages[0]}-${ch.pages[1]}\n`;
  fs.writeFileSync(path.join(BASE, "chapters", `chapter-${pad(ch.n)}.md`), md);

  // Hebrew-only translation file (rtl)
  let he = `# פרק ${ch.n}: ${ch.title}\n\n<div dir="rtl">\n\n`;
  for (const s of ch.sections) {
    he += `## ${s.id} ${s.title}\n\n${s.he || "_תרגום בהכנה._"}\n\n`;
  }
  he += `</div>\n\n---\nמקור: Configuring Plant Maintenance in SAP S/4HANA עמ' ${ch.pages[0]}-${ch.pages[1]}\n`;
  fs.writeFileSync(path.join(BASE, "translations", `chapter-${pad(ch.n)}-he.md`), he);
}

// Bilingual glossary — SAP terms kept English, Hebrew explanation
const GLOSSARY = [
  ["EQUI", "טבלת אב הציוד (Equipment master)."],
  ["EQKT", "טקסטים/תיאורי ציוד."],
  ["IFLOT", "טבלת השורש של מיקום פונקציונלי (Functional Location)."],
  ["IFLOS", "תוויות מיקום פונקציונלי (תיוג חלופי)."],
  ["ILOA", "נתוני מיקום/חיוב לאובייקט אחזקה."],
  ["AUFK", "כותרת פקודה (Order header)."],
  ["AFIH", "נתוני אחזקה לפקודה."],
  ["JEST / JSTO", "סטטוס אובייקט (Object status / status object)."],
  ["SPRO", "טרנזקציית ה-Customizing (IMG) — מרכז הקונפיגורציה."],
  ["IW21 / IW22 / IW23", "יצירה / שינוי / תצוגה של הודעת אחזקה."],
  ["IW31 / IW32 / IW33", "יצירה / שינוי / תצוגה של פקודת עבודה."],
  ["IW41", "דיווח ביצוע (Confirmation) לפקודה."],
  ["IH01 / IH06 / IH08", "תצוגות מבנה/רשימות מיקומים וציוד."],
  ["OIBS", "הגדרת פרופיל סטטוס משתמש."],
  ["OIS2", "הגדרת פרופיל מספר סידורי."],
  ["OIOA", "הגדרת סוגי פקודה (Configure Order Types)."],
  ["BOM", "עץ מוצר (Bill of Materials) — רשימת רכיבים/חלקי חילוף."],
  ["PRT", "אמצעי ייצור/כלי עבודה (Production Resource/Tool) — אינו נצרך."],
  ["ATP", "Available-To-Promise — כמות זמינה בבדיקת הזמינות."],
  ["LSMW / IBIP", "כלי העברת נתונים (כללי / ייעודי-אחזקה)."],
];
let g = `# Glossary — SAP PM (bilingual)\n\n| Term (EN, kept verbatim) | הסבר בעברית |\n|---|---|\n`;
for (const [t, h] of GLOSSARY) g += `| \`${t}\` | ${h} |\n`;
g += `\n> SAP transaction codes, tables, programs and BAPIs are preserved in English; only explanations are in Hebrew.\n`;
fs.writeFileSync(path.join(BASE, "glossary", "glossary.md"), g);

// index
const idx = `# SAP PM — Knowledge Package\n\nGenerated from *Configuring Plant Maintenance in SAP S/4HANA* (729 pp).\n\n## Chapters\n${BOOK.chapters
  .map((c) => `- [Chapter ${c.n}: ${c.title}](chapters/chapter-${pad(c.n)}.md) — pp.${c.pages[0]}–${c.pages[1]}, ${(FIGS[String(c.n)] ?? []).length} figures${c.translated ? " · עברית ✓" : ""}`)
  .join("\n")}\n\n- [Glossary](glossary/glossary.md)\n`;
fs.writeFileSync(path.join(BASE, "index.md"), idx);

console.log(`✓ knowledge/books/sap-pm built: ${BOOK.chapters.length} chapters, ${copied} images copied, glossary + index`);
