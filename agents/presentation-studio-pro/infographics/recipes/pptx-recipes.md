# PPTX Recipes — infographics as native shapes (pptxgenjs)

Two paths to PPTX:
1. **Embed the rendered SVG/PNG** from `out/` via `slide.addImage(...)` — fastest, keeps the exact look.
2. **Native shapes** (editable) — recipes below. Coordinates in inches, LAYOUT_WIDE (13.3×7.5).

## Funnel (native)
4 trapezoids, each narrower; pair a label. Build narrowest last.
```
pres.shapes.RECTANGLE won't taper → use freeform/trapezoid:
slide.addShape(pres.shapes.TRAPEZOID, {x,y,w,h, fill:{color:"1F4E79"}, flipV:false});
// stack 4, decreasing w, increasing x to center; addText centered on each.
```

## Pyramid (native)
Use TRIANGLE for apex + 3 TRAPEZOID bands beneath, decreasing y, increasing w.

## KPI Dashboard (native)
2×2 ROUNDED_RECTANGLE tiles; per tile: metric label (14pt muted), value (54–64pt bold accent),
delta (16pt, green ▲ / red ▼). Dark bg slide.background={color:"0B1220"}.

## Comparison Matrix (native)
`slide.addTable(rows, {...})` — header row in primary fill/white; cells use ✓ (good), ~ (warn), ✗ (bad)
colored from the active template's semantic palette. Reserve table when exact marks matter.

## Mermaid/Excalidraw → PPTX
Render the .mmd/.excalidraw to SVG, then `addImage({data: svgBase64})` (modern PowerPoint) or the PNG
fallback. The `ppt-master` skill converts SVG → native DrawingML if fully-editable shapes are required.

## Theming
Pull fills/strokes from the active template in `../../templates/template-library.json` so an infographic
matches the deck (e.g., SAP template → tier colors 0A6ED1 / D62027 / 6A737D).
