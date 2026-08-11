/**
 * Fitting a diagram onto a sheet of paper.
 *
 * The print stylesheet used to say `svg { width: 100% }` and centre the body
 * with `min-height: 100vh`, which produced two defects that only appear on
 * paper and so survived every screen test:
 *
 * 1. `@media print { body { min-height: auto } }` removed the height the flex
 *    centring depended on, so every diagram hugged the top of the page and left
 *    the lower half blank.
 * 2. `width: 100%` fits the WIDTH only. A wide ER model on a portrait page was
 *    shrunk to a thin unreadable band — technically "not clipped", useless in a
 *    meeting.
 *
 * So fitting is computed here rather than left to CSS: the page box is known in
 * millimetres, the diagram's intrinsic size is known in pixels, and the scale
 * that fills the page follows. When the diagram's aspect ratio is opposite to
 * the paper's, rotating it a quarter turn is what a person would do at a
 * plotter, and it is often the difference between legible and not.
 */

export type PrintProfile = "portrait" | "landscape" | "a3" | "a3-portrait";

export interface PageBox {
  /** Printable width in mm, margins already deducted. */
  w: number;
  /** Printable height in mm. */
  h: number;
  /** The value for the CSS `@page { size: ... }` descriptor. */
  css: string;
}

const MARGIN_MM = 12;

/** ISO sizes in mm, portrait orientation. */
const SHEET = { a4: { w: 210, h: 297 }, a3: { w: 297, h: 420 } };

export function pageBox(profile: PrintProfile, margin = MARGIN_MM): PageBox {
  const a3 = profile === "a3" || profile === "a3-portrait";
  const sheet = a3 ? SHEET.a3 : SHEET.a4;
  const landscape = profile === "landscape" || profile === "a3";
  const w = landscape ? sheet.h : sheet.w;
  const h = landscape ? sheet.w : sheet.h;
  return {
    w: w - margin * 2,
    h: h - margin * 2,
    css: `${a3 ? "A3" : "A4"} ${landscape ? "landscape" : "portrait"}`,
  };
}

/**
 * A3 is the poster size, so the sheet should follow the diagram rather than the
 * other way round: a tall process flow wants a tall sheet. The two A4 profiles
 * stay exactly as the user chose them — those buttons exist so someone can put
 * a diagram on the paper already in the tray.
 */
export function resolveProfile(profile: PrintProfile, dw: number, dh: number): PrintProfile {
  if (profile !== "a3" && profile !== "a3-portrait") return profile;
  if (!(dw > 0) || !(dh > 0)) return "a3";
  return dw >= dh ? "a3" : "a3-portrait";
}

export interface Fit {
  /** Quarter-turn the diagram to make better use of the sheet. */
  rotate: boolean;
  /** Scale actually achieved, relative to the diagram's intrinsic size. */
  scale: number;
  /** Box the diagram is centred in, in mm. Swapped when rotated. */
  box: { w: number; h: number };
}

/**
 * Only rotate when it buys a materially bigger diagram. A marginal gain is not
 * worth handing someone a sideways page.
 */
const ROTATE_GAIN = 1.15;

/**
 * @param dw diagram intrinsic width  (px)
 * @param dh diagram intrinsic height (px)
 */
export function fitToPage(dw: number, dh: number, page: PageBox): Fit {
  // Degenerate input must not produce NaN and silently print an empty sheet.
  if (!(dw > 0) || !(dh > 0)) {
    return { rotate: false, scale: 1, box: { w: page.w, h: page.h } };
  }
  const upright = Math.min(page.w / dw, page.h / dh);
  const turned = Math.min(page.h / dw, page.w / dh);
  const rotate = turned > upright * ROTATE_GAIN;
  return {
    rotate,
    scale: rotate ? turned : upright,
    box: rotate ? { w: page.h, h: page.w } : { w: page.w, h: page.h },
  };
}

/**
 * Wraps a diagram in an outer SVG whose width and height are swapped, turning
 * the content a quarter turn inside SVG coordinates.
 *
 * rotate(-90) maps (x,y) to (y,-x); the translate puts the result back into the
 * positive quadrant, so the content lands exactly in a dh x dw box.
 */
function rotateSvg(svg: string, dw: number, dh: number): string {
  // Strip the XML prolog: it is only legal at the very start of a document.
  const inner = svg.replace(/^<\?xml[^>]*\?>\s*/, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${dh}" height="${dw}" viewBox="0 0 ${dh} ${dw}">`
    + `<g transform="translate(0 ${dw}) rotate(-90)">${inner}</g></svg>`;
}

/**
 * The complete print document.
 *
 * Self-contained on purpose: it is written into a blank iframe, so it cannot
 * inherit the application's stylesheet, and none of the app's chrome can leak
 * onto the page.
 */
export function printDocument({ title, svg, profile, dw, dh }: {
  title: string;
  svg: string;
  profile: PrintProfile;
  dw: number;
  dh: number;
}): string {
  const resolved = resolveProfile(profile, dw, dh);
  const page = pageBox(resolved);
  const fit = fitToPage(dw, dh, page);

  // The quarter turn happens in SVG coordinate space, not CSS.
  //
  // A CSS transform does not affect layout, so a rotated wrapper still occupied
  // its upright box: taller than the sheet, which paginated and sliced the
  // diagram across two pages. Rotating inside the SVG swaps the element's real
  // width and height, so the box is correct by construction and the page needs
  // no absolute positioning, no overflow tricks and no explicit mm sizing.
  const body = fit.rotate ? rotateSvg(svg, dw, dh) : svg;

  const esc = (s: string) => String(s).replace(/[<>&]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));

  return `<!doctype html><html dir="rtl" lang="he"><head><meta charset="utf-8">
<title>${esc(title)}</title>
<style>
  @page { size: ${page.css}; margin: ${MARGIN_MM}mm; }
  html, body { margin:0; padding:0; background:#fff; }
  /* One page, centred. The old rule set min-height:100vh and then removed it
     for print, which is why every diagram hugged the top of the sheet. */
  html { height:100%; }
  body { height:100%; display:flex; align-items:center; justify-content:center;
         overflow:hidden; }
  /* Constrained on BOTH axes. The old rule set width only, so a wide model on a
     portrait page shrank to an unreadable band instead of filling the sheet. */
  svg { max-width:100%; max-height:100%; width:auto; height:auto; display:block; }
</style></head><body>${body}</body></html>`;
}
