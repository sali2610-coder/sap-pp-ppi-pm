# SAP Enterprise Architecture Blueprint — תשתית SAP

מבט-על ארגוני: איך מודולי SAP עובדים יחד, איך זורם המידע, איך מסמכים הופכים לרישומים פיננסיים.
**מקור אמת יחיד:** `sap-infrastructure-data.json`. ארכיטקטורה קודם, טבלאות אחרי.

## Deliverables
| File | What |
|---|---|
| `SAP-Enterprise-Architecture-A0.pdf` | פוסטר בלוטפרינט A0 landscape — להדפסה על קיר |
| `SAP-Enterprise-Architecture-A0.png` | תמונה (3600×2546 @1.5×) |
| `SAP-Enterprise-Architecture-A0.svg` | וקטורי standalone |
| `sap-infrastructure-data.json` | מקור אמת — modules, blueprints, valueStream, processes, documents, tables, shared, crossModule |
| `build/` | מחוללים (01-dataset.mjs · arch-poster.html) |

## Poster structure (top → bottom layered blueprint)
1. **זרימת ערך מקצה-לקצה** — Vendor → MM → GR → Inventory → PP-PI → QM → Finished Goods → SD → Billing → FI
2. **תהליכים עסקיים** — P2P · Plan2Produce · M2O · S2C · O2C (doc chains)
3. **בלוטפרינט מודולים** — 9 module cards (purpose · objects · documents · tables · inputs · outputs · connected modules)
4. **ליבת SAP משותפת** — MARA AUFK JEST MATDOC ACDOCA CRHD OBJNR CDHDR CDPOS + master/status/finance
5. **התכנסות פיננסית** — אירוע לוגיסטי → רישום → ACDOCA → FI/CO + אינטראקציה בין מודולים

Light theme, big type, rectangular boxes, few meaningful arrows — Signavio / solution-blueprint style. No network graph.

## Website — תשתית SAP  (route `/sap-infrastructure/`)
Native React page (**no iframe, no nested shell, no 404**), 7 views:
1. סקירה (value stream)  2. תהליכים עסקיים  3. מודולים (click → blueprint panel)
4. טכני (zones)  5. טבלאות (search + module filter → table panel)  6. אינטגרציה  7. מרכז הורדות
- Click module → purpose, objects, documents, tables, inputs/outputs, connected modules.
- Click table → explanation, key fields, parent/child tables, related modules, transactions, Fiori, BAPIs, ECC↔S/4.
- Mobile responsive (cards stack, tabs wrap). Downloads link to poster PDF/PNG/SVG + JSON.

Files served from `public/sap-infrastructure/` (poster + dataset.json + map.html explorer). Nav link in `components/app-shell.tsx` (`nav.infra`).

## Rebuild
```bash
node exports/build/01-dataset.mjs           # -> sap-infrastructure-data.json (+ public copy)
# poster: inject d3+data into exports/build/arch-poster.html, render via headless Chrome -> PDF/PNG/SVG
```
100% offline. Real data = PM + PP-PI (from data/sapData.ts); MM/SD/FI/CO/QM/CS/Batch/Classification/IDOC = canonical SAP model.

*Built by Sali Halif — Web Coding · NEO Cockpit · CBC Israel · 2026*
