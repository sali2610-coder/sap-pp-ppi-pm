# Infographic Upgrade

Closes validation gaps #1 (broaden infographic usage) and #2 (domain-specific templates).

## What changed
- **Every deck now embeds a process infographic** (was: only 1/5).
- **6 domain infographic templates added** under `infographics/domain/` (mermaid + svg, rendered to
  SVG+PNG in `infographics/domain/out/`):
  | Template | File | Type |
  |----------|------|------|
  | PP-PI process order flow | `pppi_process.mmd` | COR1→COR2→CO53→COR6N→MIGO→KO88 (real tcodes) |
  | PM maintenance lifecycle | `pm_lifecycle.mmd` | IW21→IW31→IW32→IW41→TECO→KO88 cycle |
  | SAP IDoc landscape | `sap_idoc.mmd` | Zetes→PI/PO→ALE→IDoc→App (tiers) |
  | Academic research method | `academic_method.mmd` | Question→Hypothesis→Data→Method→Results→Conclusion |
  | Financial waterfall bridge | `financial_waterfall.svg` | FY25→+new→+exp→−churn→FY26F |
  | Analytics dashboard layout | `analytics_dashboard.svg` | KPI strip + trend + mix |

## Mandatory-4 rule (now enforced per deck)
Each presentation includes **≥1 process infographic · ≥1 data visualization · ≥1 summary visual ·
≥1 decision/action slide**. `generate_v2.js` builds every deck against this contract; the validator
checks it (5/5 PASS).

## Mapping (deck → infographics)
1 PP-PI → pppi_process (process) + KPI strip (summary)
2 PM → pm_lifecycle (process) + KPI strip (summary)
3 Research → academic_method (process) + KPI strip (summary)
4 Analytics → data pipeline (process) + analytics_dashboard (summary)
5 Financial → forecast pipeline (process) + financial_waterfall (summary)

All infographics pull tier colors from the active template (`templates/template-library.json`).
