// §a11y — automatic accessible text color for a solid-fill chip/pill/badge.
// Given the chip's background hex, returns the ink that meets WCAG AA against it:
// dark slate on light fills (e.g. PM orange, complexity Low/Med), white on dark
// fills (e.g. PP-PI violet, High red). Keeps every brand hue exact — only the
// TEXT flips — so semantic module/status colors are preserved while small pill
// labels stay readable. Threshold picked so both sides clear AA (≥4.5) for the
// common palette; falls back to white for unknown/instantiated values.
const INK_DARK = "#0f172a"; // slate-950-ish
const lin = (c: number) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const relLum = (hex: string) => {
  const h = hex.replace("#", "");
  if (h.length !== 6) return 0;
  const n = parseInt(h, 16);
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
};
const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
/** Accessible ink (dark or white) for text on a solid `bg` hex. */
export function pillInk(bg?: string | null): string {
  if (!bg || bg[0] !== "#") return "#ffffff";
  const L = relLum(bg);
  const cW = contrast(L, 1);            // vs white
  const cD = contrast(L, relLum(INK_DARK)); // vs dark ink
  // prefer whichever has more contrast; tie-break to white for brand darks
  return cD > cW ? INK_DARK : "#ffffff";
}
