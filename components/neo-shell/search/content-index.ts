// Build-time only. Additional authored content is loaded when search opens,
// never copied into every page or imported with the source textbooks at runtime.
import { academyData } from "../learn/academy-data";
import { sourceChapters, sourceHref, sourceNodes } from "../learn/source-data";
import { ALL_LESSONS } from "@/data/academy/lessons";
import { knowledgeData } from "../learn/knowledge-data";
import { enhDir } from "../reference/enh-data";
import { S4_OBJECTS } from "@/data/s4-objects";
import { ECC_S4_TOPICS } from "@/data/ecc-s4";
import { MIG_OBJECTS } from "@/data/migration-cockpit";
import { idocDir } from "../reference/idoc-data";
import { allBookIds, getBook } from "@/lib/library/registry";
import { neoChapterHref, neoSectionHref } from "../books/links";
import { commandIndex } from "./command-index";
import type { CmdExtraRecord } from "./types";

/** Search all authored words, without repeating full paragraphs in the index.
 * Never include child nodes in their parent's row: each has its own destination. */
function words(value: unknown): string {
  const strings: string[] = [];
  const visit = (v: unknown) => {
    if (typeof v === "string") strings.push(v);
    else if (Array.isArray(v)) v.forEach(visit);
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) {
      if (!["children", "href", "source", "slug", "id"].includes(k)) visit(x);
    }
  };
  visit(value);
  return [...new Set(strings.join(" ").toLocaleLowerCase().split(/\s+/).filter(Boolean))].join(" ");
}

export function contentIndex(): CmdExtraRecord[] {
  const rows: CmdExtraRecord[] = [];
  for (const c of academyData().courses) {
    rows.push({ k: "course", t: c.title, s: c.titleEn, mod: c.module, href: c.href,
      rel: `${c.totals.chapters} פרקים · ${c.totals.lessons} שיעורים`, kw: c.hay });
    for (const ch of c.chapters) for (const l of ch.lessons) if (l.hasLesson) {
      rows.push({ k: "lesson", t: l.title, s: ch.title, href: l.href, mod: c.module,
        rel: `${c.title} · פרק ${ch.index} · ${l.minutes} דק׳`,
        kw: words(ALL_LESSONS[l.slug]) });
    }
    for (const ch of sourceChapters(c.id)) {
      rows.push({ k: "source", t: ch.titleHe, s: ch.introHe.slice(0, 180),
        href: sourceHref(c.id, ch.n), mod: c.module, rel: `${c.title} · פרק ${ch.n}`, kw: words(ch.introHe) });
      for (const n of sourceNodes(ch.subchapters)) rows.push({
        k: "source", t: n.titleHe, s: n.titleEn || n.execHe.slice(0, 180),
        href: sourceHref(c.id, ch.n, n.id), mod: c.module,
        rel: `${c.title} · ${ch.titleHe} · ${n.id}`, kw: words(n),
      });
    }
  }
  for (const r of knowledgeData().centers) rows.push({
    k: "guide", t: r.he, s: r.sub, href: r.href, mod: r.module,
    rel: r.famHe, kw: r.hay,
  });
  for (const r of idocDir().rows) rows.push({
    k: "idoc", t: r.name, s: r.he, href: r.href, mod: r.mods.join(" · "), kw: r.hay,
  });
  for (const r of enhDir().rows) rows.push({
    k: "guide", t: r.he || r.name, s: r.name, href: r.href, mod: r.mods.join(" · "), kw: r.hay,
  });
  for (const item of S4_OBJECTS) rows.push({ k: "guide", t: item.name,
    s: item.he, href: `/neo/s4hana/#s4o-${encodeURIComponent(item.name)}`, rel: "S/4HANA", kw: words(item) });
  for (const item of ECC_S4_TOPICS) rows.push({ k: "guide", t: item.he,
    s: item.title, href: `/neo/s4-readiness/#topic-${item.slug}`, rel: "מוכנות למעבר", kw: words(item) });
  for (const item of MIG_OBJECTS) rows.push({ k: "guide", t: item.he,
    s: item.name, href: `/neo/migration-cockpit/#mo-${item.id}`, rel: "קוקפיט המעבר", kw: words(item) });
  const knownChapters = new Set(commandIndex().recs.filter((r) => r.k === "chapter").map((r) => r.href));
  const bookSections = new Map<string, CmdExtraRecord>();
  for (const id of allBookIds()) {
    const book = getBook(id);
    if (!book) continue;
    const title = book.meta.title.he || book.meta.title.en;
    for (const ch of book.chapters) {
      const href = neoChapterHref(id, ch.n);
      const chTitle = ch.title.he || ch.title.en;
      if (!knownChapters.has(href)) {
        rows.push({ k: "chapter", t: chTitle, s: title,
          href, mod: book.meta.module, rel: `פרק ${ch.n}`, kw: ch.title.en });
        knownChapters.add(href);
      }
      for (const section of ch.sections) {
        const sectionHref = neoSectionHref(id, section.id);
        const kw = `${section.title.en} ${section.title.he || ""}`;
        const existing = bookSections.get(sectionHref);
        if (existing) {
          // The Reader resolves a repeated section ID to its first occurrence.
          // Keep that destination once, while retaining every authored alias.
          existing.kw = `${existing.kw} ${kw} ${chTitle}`;
          continue;
        }
        const row: CmdExtraRecord = { k: "section", t: section.title.he || section.title.en,
          s: `${title} · ${chTitle}`, href: sectionHref, mod: book.meta.module,
          rel: section.id, kw };
        bookSections.set(sectionHref, row);
        rows.push(row);
      }
    }
  }
  return rows;
}
