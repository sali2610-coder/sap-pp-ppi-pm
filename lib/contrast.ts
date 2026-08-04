/**
 * WCAG-safe text colour for a badge sitting on a tint of its own hue.
 *
 * The pattern `background: col + "1a"; color: col` reads well but fails WCAG
 * 1.4.3 for every warm hue. Measured with Lighthouse on /transactions/, which
 * renders one module badge per row — 717 failing nodes on a single page:
 *
 *     PM     #f97316 on #fef1e7   2.53:1
 *     QM     #0d9488 on #e7f6ed   2.95:1
 *     MM     #2563eb tint         2.86:1
 *     brand  #d62027 on #fbe8e9   4.35:1
 *     PP     #2563eb on #e9effd   4.49:1   (just under)
 *
 * 4.5:1 is required: the badges are 9-10px, far below the 18.66px/14px-bold
 * threshold that would let the 3:1 large-text rule apply.
 *
 * Fix: keep the tint and the hue, darken only the text until it passes. The
 * background is untouched, so the visual identity of each module colour is
 * preserved — the change is a shade, not a redesign. Computed rather than
 * hardcoded so it stays correct if a module colour is ever changed.
 */

const srgb = (c: number) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const parse = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  const f = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [parseInt(f.slice(0, 2), 16), parseInt(f.slice(2, 4), 16), parseInt(f.slice(4, 6), 16)];
};

const toHex = (rgb: [number, number, number]) =>
  "#" + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");

const luminance = (hex: string) => {
  const [r, g, b] = parse(hex);
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
};

/** WCAG 2.x contrast ratio between two opaque colours. */
export function contrastRatio(fg: string, bg: string): number {
  const a = luminance(fg);
  const b = luminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/** What `hex` at `alpha` looks like once composited over an opaque backdrop. */
export function composite(hex: string, alpha: number, over = "#ffffff"): string {
  const [r, g, b] = parse(hex);
  const [br, bg, bb] = parse(over);
  return toHex([r * alpha + br * (1 - alpha), g * alpha + bg * (1 - alpha), b * alpha + bb * (1 - alpha)]);
}

const cache = new Map<string, string>();

/**
 * Darken `hex` just enough to reach `target` contrast against its own tint.
 *
 * @param hex    the module / brand colour, also used for the background tint
 * @param alpha  tint opacity — 0x1a/255 for `col + "1a"`, 0x14/255 for `"14"`
 * @param over   the surface the tint sits on (the app's card background)
 * @param target required ratio; 4.5 for body text under WCAG AA
 */
export function onTint(hex: string, alpha = 0x1a / 255, over = "#ffffff", target = 4.5): string {
  const key = `${hex}|${alpha}|${over}|${target}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const bg = composite(hex, alpha, over);
  let out = hex;
  if (contrastRatio(hex, bg) < target) {
    const [r, g, b] = parse(hex);
    // Walk the hue down in 1% steps. Preserves the ratio between channels, so
    // the colour stays recognisably the same — it only loses lightness.
    for (let f = 0.99; f >= 0.2; f -= 0.01) {
      const cand = toHex([r * f, g * f, b * f]);
      if (contrastRatio(cand, bg) >= target) { out = cand; break; }
    }
  }
  cache.set(key, out);
  return out;
}

/**
 * Darken a solid background just enough for white text to pass on it.
 *
 * The mirror of `onTint`. Measured on /library/, where module badges put white
 * text on the module colour at 10.5px:
 *
 *     #ffffff on #f97316   2.80:1
 *     #ffffff on #d97706   3.18:1
 *     #ffffff on #0891b2   3.68:1
 *     #ffffff on #059669   3.76:1
 *
 * Again 4.5:1 applies — 10.5px bold is under the large-text threshold. Only
 * the badge background shifts a shade darker; the hue and the white text are
 * unchanged, so the module colour stays recognisable.
 */
export function forWhiteText(hex: string, target = 4.5): string {
  const key = `solid|${hex}|${target}`;
  const hit = cache.get(key);
  if (hit) return hit;

  let out = hex;
  if (contrastRatio("#ffffff", hex) < target) {
    const [r, g, b] = parse(hex);
    for (let f = 0.99; f >= 0.2; f -= 0.01) {
      const cand = toHex([r * f, g * f, b * f]);
      if (contrastRatio("#ffffff", cand) >= target) { out = cand; break; }
    }
  }
  cache.set(key, out);
  return out;
}
