import { createElement, type ReactNode } from "react";

/** WCAG 3.1.2, language of parts: an English passage inside the Hebrew page
 *  says so, or a Hebrew voice reads it with Hebrew phonetics (gate 8, B2).
 *  "en" when the text has Latin letters and no Hebrew ones; otherwise nothing,
 *  so the element inherits "he". Fields that hold either language stay safe. */
export const enLang = (s?: string | null): "en" | undefined =>
  s && /[A-Za-z]/.test(s) && !/[֐-׿]/.test(s) ? "en" : undefined;

/** The direction for an English-only title in a box that truncates or clamps:
 *  laid out right to left, its ellipsis cut the title's START ("…ssible
 *  Process") and it lined up against the wrong edge. Hebrew stays inherited. */
export const enDir = (s?: string | null): "ltr" | undefined => (enLang(s) ? "ltr" : undefined);

/** A break opportunity after every slash. A slash joins words without one, so
 *  "פריטים/סיבות/פעילויות/משימות/שותפים" or "(items/causes/activities/tasks)"
 *  is one unbreakable word: it moved to a line of its own and left the line
 *  before it one or two words long (text-layout check, 2026-10-01). <wbr> adds
 *  the opportunity without adding a character, so copied text, find-in-page
 *  and the accessible name are unchanged. */
export function slashBreaks(s?: string | null): ReactNode {
  if (!s || !s.includes("/")) return s ?? null;
  return s.split("/").flatMap((part, i) => (i ? ["/", createElement("wbr", { key: i }), part] : [part]));
}
