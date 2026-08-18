/* ============================================================================
   PROJECT NEO · READING TYPOGRAPHY — the global font control (§23).
   ----------------------------------------------------------------------------
   THE CONSTRAINT THAT PICKED THESE FONTS
     The product is 100% offline: no webfont, no CDN, no @import. So every
     option has to be a font the machine already has. That rules out choosing by
     taste and forces choosing by what is actually installed on a Mac and on a
     corporate Windows box.

     It also has to differ in HEBREW, not only in Latin. Georgia and Palatino
     are different faces in English and the SAME fallback in Hebrew — offering
     them as two choices would be offering one choice twice. Each stack below
     therefore leads with a real Hebrew face and is followed by its Latin
     partner, so a mixed SAP line ("טבלת AUFK") stays coherent.

   WHAT EACH OPTION IS FOR
     system   the NEO default. Matches the rest of the product.
     grotesk  wider apertures, looser tracking. The everyday reading choice.
     serif    for long prose; the books read noticeably better in it.
     clear    the accessibility option: large x-height, unambiguous shapes,
              generous spacing. Tahoma and Arial Hebrew are on both platforms.
   ========================================================================== */

export type NeoFace = "system" | "grotesk" | "serif" | "clear";
export type NeoSize = "sm" | "md" | "lg" | "xl";

export interface NeoTypePref { face: NeoFace; size: NeoSize }

export const DEFAULT_TYPE: NeoTypePref = { face: "system", size: "md" };

export const FACES: { id: NeoFace; he: string; note: string; stack: string }[] = [
  {
    id: "system", he: "מערכת", note: "ברירת המחדל של NEO",
    stack: `'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`,
  },
  {
    id: "grotesk", he: "סן־סריף", note: "אותיות רחבות, קריאה יומיומית",
    stack: `'Arial Hebrew', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
  },
  {
    id: "serif", he: "סריף", note: "נוח לקריאה ארוכה בספרים",
    stack: `'Frank Ruehl CLM', 'FrankRuehl', 'David', 'Times New Roman', Georgia, serif`,
  },
  {
    id: "clear", he: "קריאוּת מוגברת", note: "אותיות גדולות ומרווחות",
    stack: `Tahoma, 'Arial Hebrew', Verdana, Arial, sans-serif`,
  },
];

export const SIZES: { id: NeoSize; he: string; scale: number }[] = [
  { id: "sm", he: "קטן", scale: 0.94 },
  { id: "md", he: "רגיל", scale: 1 },
  { id: "lg", he: "גדול", scale: 1.12 },
  { id: "xl", he: "גדול מאוד", scale: 1.26 },
];

const KEY = "neo:type:v1";

export function readType(): NeoTypePref {
  if (typeof window === "undefined") return DEFAULT_TYPE;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_TYPE;
    const p = JSON.parse(raw) as Partial<NeoTypePref>;
    const face = FACES.some((f) => f.id === p.face) ? (p.face as NeoFace) : DEFAULT_TYPE.face;
    const size = SIZES.some((s) => s.id === p.size) ? (p.size as NeoSize) : DEFAULT_TYPE.size;
    return { face, size };
  } catch { return DEFAULT_TYPE; }
}

/** The two halves land in different places, on purpose.
 *
 *  FACE goes on the shell. It is inherited, so scoping it to .nx-app keeps it
 *  out of the production routes that share this document.
 *
 *  SIZE has to go on <html>, because every NEO size is expressed in rem and rem
 *  resolves against the root no matter where the variable is set. globals.css
 *  multiplies it into the root font-size beside the presentation ramp, so the
 *  two compose instead of cancelling. clearType() takes it off again when the
 *  NEO shell unmounts, which is what stops a large choice following the reader
 *  out to /library/. */
export function applyType(pref: NeoTypePref, root?: HTMLElement | null): void {
  if (typeof document === "undefined") return;
  const el = root ?? document.querySelector<HTMLElement>(".nx-app");
  const face = FACES.find((f) => f.id === pref.face) ?? FACES[0];
  const size = SIZES.find((s) => s.id === pref.size) ?? SIZES[1];

  if (el) {
    // The default face writes nothing, so the shell keeps inheriting the design
    // system's own stack rather than a copy of it that could drift.
    if (pref.face === "system") el.style.removeProperty("--nx-face");
    else el.style.setProperty("--nx-face", face.stack);
    el.dataset.face = pref.face;
    el.dataset.typeSize = pref.size;
  }
  document.documentElement.style.setProperty("--nx-type-scale", String(size.scale));
}

/** Hand the document back exactly as it was found. */
export function clearType(): void {
  if (typeof document === "undefined") return;
  document.documentElement.style.removeProperty("--nx-type-scale");
}

export function writeType(pref: NeoTypePref): void {
  try { localStorage.setItem(KEY, JSON.stringify(pref)); } catch { /* storage off */ }
  applyType(pref);
}
