/* ============================================================================
   PROJECT NEO · REPOINTING THE ACADEMY'S OWN CROSS-LINKS INTO /neo/.
   ----------------------------------------------------------------------------
   SERVER ONLY, build time.

   THE PROBLEM

     The lesson bodies in data/academy/lessons carry their cross-references as
     absolute hrefs written against the LEGACY routes:

       { code: "QA01", label: "יצירת מנת בדיקה", href: "/tcode/QA01/" }

     That is correct data for the legacy site and wrong for NEO. Rendered inside
     /neo/academy/…, those chips walked the reader straight out of the product:
     562 links across the PM, PP-PI and QM courses, 555 of them transaction
     codes.

   WHY THE FIX IS HERE AND NOT IN THE DATA

     data/academy/lessons is validated, hand-written teaching content — 460
     lessons of it. Rewriting hrefs inside those files by hand would be editing
     validated prose to solve a routing problem, and it would have to be redone
     every time a lesson is authored. NEO's own data layer is what owns NEO's
     hrefs, so the translation happens on the way in, once, for every block kind
     at the same time.

   THE RULES

     · Project NEO is the only site: a legacy href either becomes its NEO twin
       or loses its link. A lesson link opens the lesson in its NEO course, a
       book link the NEO reader (keeping ?s= and #ch-), a textbook link its NEO
       course; any other pre-NEO address renders as a plain chip, never as a
       link out of /neo/ (the addresses themselves redirect, vercel.json).
     · Every translated href is GATED by components/neo-shell/reference/ref-links
       — the same gate the rest of /neo/ uses. A code with no NEO page loses its
       link and renders as a plain chip, which the lesson view already supports.
       The code and its Hebrew label are never dropped.
     · A href that is already a /neo/ path is returned untouched.
   ========================================================================== */

import type { Lesson } from "@/lib/academy/lesson-types";
import { bapiHref, cdsHref, fioriHref, idocHref, objectHref, txHref } from "../reference/ref-links";
import { ACADEMY, getLesson } from "@/lib/academy/model";
import { BOOKS as TEXTBOOKS } from "@/data/library/academy-index";
import { neoLessonHref, textbookCourseHref } from "./lesson-links";
import { readerBookIds } from "../reader/reader-data";

/** legacy first segment -> the NEO resolver for that family. */
const FAMILY: Record<string, (id: string) => string | null> = {
  tcode: txHref,
  object: objectHref,
  tables: objectHref,   // the legacy tables route addresses the same names
  bapi: bapiHref,
  idoc: idocHref,
  cds: cdsHref,
  "fiori-apps": fioriHref,
};

/** A legacy family ROOT (`/cds/`, no id) mapped onto NEO's own directory for
 *  that family. Only families whose directory page really exists appear here —
 *  `/object/` has no NEO directory of its own, so it is deliberately absent and
 *  such a link is left alone rather than pointed somewhere plausible. */
const DIRECTORY: Record<string, string> = {
  tcode: "/neo/transactions/",
  tables: "/neo/tables/",
  cds: "/neo/cds/",
  bapi: "/neo/bapi/",
  idoc: "/neo/idoc/",
  "fiori-apps": "/neo/fiori-apps/",
  domain: "/neo/domain-model/",
};

/** /academy/lesson/<slug>/ and /academy/path/<course>/ inside NEO. */
function academyHref(kind: string | undefined, id: string | undefined): string | null {
  if (kind === "lesson" && id) { const l = getLesson(id); return l ? neoLessonHref(l.moduleId, id) : null; }
  if (kind === "path" && id) return ACADEMY[id] ? `/neo/academy/${id}/` : null;
  return kind ? null : "/neo/academy/";
}

/** /library/<book>/… (the NEO reader, with the location kept) and a
 *  textbook's /library/<base>/… (its NEO course). */
let readers: Set<string> | null = null;
function libraryHref(href: string): string | null {
  const u = new URL(href, "https://neo.local");
  const seg = u.pathname.split("/").filter(Boolean);
  if (seg.length === 1) return "/neo/books/";
  const book = seg[1] === "v2" ? seg[2] : seg[1];
  if (!readers) readers = new Set(readerBookIds());
  if (book && readers.has(book)) return `/neo/read/${book}/${u.search}${u.hash}`;
  const tb = TEXTBOOKS.find((b) => b.base === `/library/${seg[1]}`);
  return tb ? textbookCourseHref(tb.id) : null;
}

/** The NEO twin of a legacy href, or null when NEO has no page for it: the
 *  caller renders a plain chip, never a link to the pre-NEO interface. A
 *  non-internal or already-NEO href comes back unchanged. */
export function neoHrefOf(href: string | undefined): string | null | undefined {
  if (!href) return href;
  if (!href.startsWith("/") || href.startsWith("/neo/") || href.startsWith("//")) return href;
  const [, family, id, rest] = href.split(/[/?#]/);
  if (family === "academy") return academyHref(id || undefined, rest || undefined);
  if (family === "library") return libraryHref(href);
  if (!id) return DIRECTORY[family] ?? null;   // a family root, not a record
  const resolve = FAMILY[family];
  if (!resolve) return null;                   // no NEO twin: shown, not linked
  return resolve(decodeURIComponent(id));      // string, or null → render flat
}

/** A shallow clone of the lesson with every block-level href repointed.
 *
 *  The block union has 23 kinds and several carry href-bearing rows under
 *  different property names (`refs`, `rows`, `items`, `links`). Rather than
 *  enumerate them — which would silently miss the next kind someone adds — this
 *  walks the block structurally and rewrites any object that has BOTH an href
 *  and a code/label, which is exactly the shape of a cross-reference and of
 *  nothing else in the union. */
export function withNeoLinks(lesson: Lesson): Lesson {
  const seen = new WeakSet<object>();

  const walk = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(walk);
    if (!v || typeof v !== "object") return v;
    if (seen.has(v as object)) return v;
    seen.add(v as object);

    const o = v as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(o)) out[k] = k === "href" ? val : walk(val);

    if (typeof o.href === "string" && ("code" in o || "label" in o || "name" in o)) {
      const next = neoHrefOf(o.href);
      // null ⇒ no NEO page. Delete the key rather than store null: the lesson
      // view branches on `r.href ? <Link/> : <span/>`, so an absent href is the
      // supported "show it, do not link it" state.
      if (next == null) delete out.href;
      else out.href = next;
    }
    return out;
  };

  return walk(lesson) as Lesson;
}
