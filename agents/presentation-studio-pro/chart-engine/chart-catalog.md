# Chart Catalog — 14 types

The engine maps **data shape + intent → chart**. `recommend.py` does this automatically; this catalog
is the reference it encodes. Render strategy notes whether the chart is native pptxgenjs or a recipe.

## Decision summary (what the engine keys on)

| Signal in the data | Chart |
|--------------------|-------|
| time column + 1 measure | **line** (area if volume matters) |
| time + 3+ measures that sum to a whole | **stacked_bar** (or stacked area) |
| ≤12 categories × 1 measure | **bar** |
| category × category → value (matrix) | **heatmap** |
| 2 numeric columns, no category | **scatter** |
| 3 numeric columns (x,y,size) | **bubble** |
| 1 category (3–8 axes) × 2+ series | **radar** |
| many parts (>12) by size / parent-child | **treemap** |
| source + target + value columns | **sankey** |
| start → +/- steps → end (signed) | **waterfall** |
| 1 row, 1 headline metric | **kpi_card** |
| 1 metric + a target/goal | **gauge** |
| date + open/high/low/close | **financial** (candlestick) |

## Per-chart reference

### line — trend over time
Data: temporal x + 1..n numeric series. Encoding: x=time, y=value, color=series.
Render: pptxgenjs `charts.LINE` (lineSmooth for curves). Do: ≤5 series; label the focal line. Don't: bars for a trend.

### area — trend with emphasis on volume / cumulative
Data: temporal x + 1 series (or stacked parts). Render: `charts.AREA`. Use when the magnitude under the curve is the message.

### bar — compare categories
Data: ≤12 categories × 1 measure. Render: `charts.BAR` (barDir col/bar). Do: sort by value; annotate the focal bar. Don't: use for a time trend (use line).

### stacked_bar — parts of a whole across time/categories
Data: x (time/cat) + 3+ series summing to a total. Render: `charts.BAR` `barGrouping:"stacked"`. Do: order segments consistently. Don't: stack unrelated measures.

### waterfall — running total with +/- steps
Data: ordered steps (Start, deltas±, End). Render strategy: native bars on an invisible cumulative base.
Recipe: for each step compute the floating base = running cumulative; draw the visible bar from base→base+delta; green for +, red for −, neutral for Start/End. Do: label each step's value.

### scatter — relationship between two variables
Data: 2 numeric, no category. Render: `charts.SCATTER`. Do: add a trend line if correlation is the point. Don't: connect points (that implies a sequence).

### bubble — three variables at once
Data: 3 numeric (x, y, size). Render: `charts.BUBBLE`. Size = magnitude; keep ≤ ~30 bubbles.

### heatmap — value across a 2-D grid
Data: category × category → value (matrix). Render: table with per-cell fill scaled to value, OR an SVG grid. Do: a clear sequential color scale + legend. Don't: more than ~12×12 cells on one slide.

### treemap — many parts by magnitude / hierarchy
Data: parent/child + size, or many (>12) categories by size. Render: SVG nested rects (squarified). Area = magnitude; one or two levels max.

### sankey — flows between stages/nodes
Data: source, target, value rows. Render: Mermaid/Excalidraw flow or SVG ribbons (width = value). Do: keep node count modest; order left→right by stage.

### radar — one/few entities across many axes
Data: 1 category of 3–8 axes × 1–3 numeric series. Render: `charts.RADAR`. Do: same scale per axis; ≤3 overlaid series. Don't: use for time.

### gauge — single metric vs a target
Data: 1 value + target/goal. Render: SVG arc + needle (or filled ring). Show value, target tick, and the gap.

### kpi_card — one headline number
Data: 1 row, 1 metric (optionally a prior value for the delta). Render: rounded rect + big value (54–64pt) + ▲/▼ delta. Use in a 2×2 grid for several KPIs.

### financial — price action over time
Data: date + open/high/low/close (optionally volume). Render: candlestick — native hi-lo bars + open/close boxes (green up / red down); volume as a secondary bar. Alternate: close-price line if detail isn't needed.

## Theming
Chart colors come from the active deck template (`../templates/template-library.json`) — e.g. SAP →
`0A6ED1/D62027/6A737D`, Data Analytics dark → teal/cyan. Always annotate the key finding on the chart
(the `data-storyteller` agent owns that); the engine only chooses the form.
