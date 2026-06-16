# Hebrew-First Design Standards
Owner: **visual-art-director**. Scope: all studio infographics. Goal: Keynote/Gamma/Deloitte-grade,
Hebrew-first, 4K-ready. Content/figures/sources are never changed by these standards — visual layer only.

---

## 1. Resolution & export
- **SVG is the master.** Every diagram is authored as vector `.svg` on a **1280×720** artboard.
- **Raster is export-only**, rendered at **scale ≥ 3 → ≥ 3840×2160 (4K)** via
  `infographics/render_svg.py <in.svg> <out.png> 3` (system Chrome, offline).
- **Never** ship a low-res PNG, never upscale raster. Must stay sharp at 4K / projector / 300% zoom.
- Native slides (title/intro/tables) stay pptxgen vector — already scale-independent.

## 2. Hebrew-first typography
- Copy is **written natively in Hebrew** — no translated-sounding phrasing, no literal English calques.
- **RTL is default** (`direction="rtl"`). Latin reserved for kickers, figures, source tags, framework names.
- **RTL anchor rule (critical):** in `direction=rtl`, a right-aligned Hebrew line uses
  `text-anchor="start"` with x at the **right** edge (origin = right, flows left). `end` flows the wrong way.
  Latin runs (numbers, kickers) wrap in `direction="ltr" unicode-bidi="isolate"`.
- **Type scale** (artboard px): eyebrow 13 (ls +2.5) · title 32–34 bold · section 18–20 bold ·
  body 13.5–15 · caption 12–13 · **focal number 40–150 (Arial Black)**.
- Font stack (offline): `Arial, 'Arial Hebrew', 'Helvetica Neue', sans-serif`; numbers `'Arial Black'`.

## 3. Color tokens
| Token | Light | Dark-hero |
|---|---|---|
| bg | `#FFFFFF` / `#F5F8FB` | radial `#0E2F4E→#05111F` |
| ink / title | `#07203A` / `#22303C` | `#EAF2F8` |
| muted | `#7C8895` | `#8FA6B8` |
| brand cyan | `#16B6CE` / deep `#0E7C9B` | glow `#2BD4E6` |
| navy | `#0A2540` | surfaces `#0C2A45` |
| semantic | red `#E0413E` · green `#1E9E6A` · amber `#D98A1F` | red `#FF5C58` · green `#34D9A0` · amber `#F2B441` |
Gradients: `gNavy`, `gCyan`, `gGreen`, `gRed`, `gGauge`. Glow filters for dark heroes only.

## 4. Layout & hierarchy
- **Masthead** (no filled bar): right-aligned eyebrow (Latin, letter-spaced) → big Hebrew title →
  hairline rule + short cyan accent on the right. Left pill = `מסגרת N` / `ויזואל N` badge.
- **One focal point per slide.** Visual hierarchy: eyebrow → title → focal metric/metaphor → support → source.
- 40px side margins; soft shadows (`feDropShadow`) for depth; rounded cards (rx 12–22).
- **Source footer** bottom-right on every analytical slide. Framework slides keep the framework label.

## 5. Iconography
- Single **stroke icon system**, 24×24, `stroke-width≈1.9`, round caps/joins; rendered in chips.
- No clip-art, no emoji, no filled stock icons. Icons carry meaning (metaphor), not decoration.

## 6. Information-design patterns (use; don't default to PPT)
- Executive dashboards (gauges, meters, KPI cards), value pipelines/flow ribbons, funnels,
  intensity/heat rows, flywheels, convergence, concentric rings, fit-ledgers, capture/siphon.
- **Big numbers** are heroes. Reduce text — if it reads without paragraphs, it's better.

## 7. Banned
SmartArt look · generic circles connected by lines · plain boxes · default PowerPoint layouts ·
translated-sounding Hebrew · low-res raster / upscaled PNG · decorative-only icons · text walls.

## 8. The one-idea test
For every important slide: **"What is the one visual idea people remember after the talk ends?"**
Build the metaphor + focal metric around that. Target reaction: *"Wow, I understand it immediately."*

---

### Apply / build
```
# author/edit SVG generator -> make_*.py  (1280x720 artboard)
python3 infographics/render_svg.py in.svg out.png 3      # 4K export (3840x2160)
node generate.js                                          # pptxgen build
soffice --headless --convert-to pdf out/<deck>.pptx       # PDF
python3 upgrades/pptx_animate.py out/<deck>.pptx --transition fade --effect fade --dur 0.4
```
