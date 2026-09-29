/** WCAG 3.1.2, language of parts: an English passage inside the Hebrew page
 *  says so, or a Hebrew voice reads it with Hebrew phonetics (gate 8, B2).
 *  "en" when the text has Latin letters and no Hebrew ones; otherwise nothing,
 *  so the element inherits "he". Fields that hold either language stay safe. */
export const enLang = (s?: string | null): "en" | undefined =>
  s && /[A-Za-z]/.test(s) && !/[֐-׿]/.test(s) ? "en" : undefined;
