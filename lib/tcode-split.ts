/** The dictionary's free-text T-code column as codes, for every surface that
 *  lists a table's transactions (the rail, Home, the module workspace and its
 *  sections, search, the object profile, the ERD, the studio). The blueprints
 *  separate codes with commas, slashes and spaces, and the PM workbook also
 *  with semicolons ("IW41; IW42", "BP; (ECC: XK01/MK01 ...)"): a splitter
 *  without ";" dropped the code before it, 20 of PM's 110. A token that is not
 *  a bare code ("(ECC:", a Hebrew note) is dropped, never repaired into one. */
export const splitTcodes = (s: string): string[] =>
  (s || "")
    .split(/[,;\s/]+/)
    .map((x) => x.trim().toUpperCase())
    .filter((x) => /^[A-Z][A-Z0-9_]{1,}$/.test(x));
