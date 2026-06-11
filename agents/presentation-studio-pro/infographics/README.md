# Infographic Library

12 reusable infographic templates, each renderable across **Mermaid · Excalidraw · PPTX · SVG · PNG**.

## Renderer matrix
| Type | Primary | Template | Mermaid | Excalidraw | PPTX | SVG | PNG |
|------|---------|----------|:--:|:--:|:--:|:--:|:--:|
| Process Flow | mermaid | mermaid/01_process_flow.mmd | ✓ | ✓ | ✓ | ✓ | ✓ |
| Timeline | mermaid | mermaid/02_timeline.mmd | ✓ |  | ✓ | ✓ | ✓ |
| Roadmap | mermaid | mermaid/03_roadmap.mmd (gantt) | ✓ |  | ✓ | ✓ | ✓ |
| Swimlane | mermaid | mermaid/04_swimlane.mmd | ✓ | ✓ | ✓ | ✓ | ✓ |
| Org Chart | mermaid | mermaid/05_org_chart.mmd | ✓ | ✓ | ✓ | ✓ | ✓ |
| Architecture | mermaid | mermaid/06_architecture.mmd | ✓ | ✓ | ✓ | ✓ | ✓ |
| Funnel | svg | svg/07_funnel.svg |  | ✓ | ✓ | ✓ | ✓ |
| Pyramid | svg | svg/08_pyramid.svg |  | ✓ | ✓ | ✓ | ✓ |
| KPI Dashboard | svg | svg/09_kpi_dashboard.svg |  |  | ✓ | ✓ | ✓ |
| Comparison Matrix | svg | svg/10_comparison_matrix.svg |  |  | ✓ | ✓ | ✓ |
| Decision Tree | mermaid | mermaid/11_decision_tree.mmd | ✓ | ✓ | ✓ | ✓ | ✓ |
| Value Stream Map | mermaid | mermaid/12_value_stream_map.mmd | ✓ | ✓ | ✓ | ✓ | ✓ |

Registry: `index.json`. PPTX shape recipes: `recipes/pptx-recipes.md`. Rendered proofs: `out/`.

## Render
```bash
# Mermaid types -> SVG + PNG
bash <repo>/.agents/skills/mermaid-diagrams/scripts/render.sh --all mermaid out
# SVG-native types -> PNG (system Chrome, offline)
python3 render_svg.py svg/07_funnel.svg out/07_funnel.png
# PPTX: embed out/*.svg|png via pptxgenjs addImage, or build native shapes (recipes/)
```

## Theming
All templates pull colors from `../../templates/template-library.json`. Swap the active template's
palette to restyle every infographic to match the deck (Academic, SAP, Data Analytics dark, …).

## Why mixed renderers
Mermaid excels at node-edge graphs (flow/swimlane/org/architecture/decision/VSM) and time
(timeline/gantt). Funnel/pyramid/KPI-tiles/matrix aren't graph shapes — hand-authored SVG (and native
PPTX shapes) produce a cleaner, controllable result. Both paths emit SVG + PNG and embed into PPTX.
