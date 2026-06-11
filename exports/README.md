# SAP Infrastructure Map — Version 3 (Enterprise)

מפת תשתית SAP מלאה ל-CBC Israel: פוסטר להדפסה + טאב אתר אינטראקטיבי.
**מקור אמת יחיד:** `sap-infrastructure-data.json` (הפוסטר והאתר נטענים ממנו — אין גרסאות כפולות).

---

## 1. Where the files live

### Deliverables (`exports/`)
| File | What |
|---|---|
| `sap-infrastructure-data.json` | **Source of truth** — 155 tables, 175 relationships, 12 modules, 5 zones, 14 shared objects, 6 interfaces |
| `sap-infrastructure-map.html` | Self-contained interactive map (offline, d3 vendored) |
| `sap-infrastructure-poster-A0.pdf` | Print poster, A0 landscape ratio |
| `sap-infrastructure-poster-A0.png` | Hi-res raster (≈5600×3968) |
| `sap-infrastructure-poster-A0.svg` | Vector poster (scalable, standalone) |
| `README.md` | This file |
| `build/` | Reproducible generators (see §4) |

### Website (served by the Next.js app)
| Path | What |
|---|---|
| `app/sap-infrastructure/page.tsx` | The **תשתית SAP** page (route `/sap-infrastructure/`) |
| `public/sap-infrastructure/map.html` | Interactive map embedded by the page |
| `public/sap-infrastructure/sap-infrastructure-poster-A0.{pdf,png,svg}` | Download targets |
| `public/sap-infrastructure/dataset.json` | Download target (= source of truth) |
| `components/app-shell.tsx` | Nav menu — link `תשתית SAP` added |
| `lib/i18n.tsx` | `nav.infra` label (he/en) |

---

## 2. How to use

### Website tab
1. `npm run dev` (or `npm run build` → serve `out/`).
2. Open the app → top nav → **תשתית SAP** (`/sap-infrastructure/`).
3. The page shows download buttons + the embedded interactive map.

Interactive map features:
- **7 view lenses + Zones**: נוף מלא · אזורים · עסקית · פונקציונלית · טכנית · מסד נתונים · אינטגרציה · S/4HANA
- **Zoom presets** (רמת תצוגה): עסקי / פונקציונלי / טכני / ארגוני
- **Search** table by name · **filter** by module · **reset filters** (↺) · **fit** (⊕)
- **Click table** → side panel (module, Hebrew explanation, key fields, parent/child tables, transactions, Fiori, BAPIs, CDS, ECC↔S/4, business impact)
- **Hover** node/edge → relationship tooltip
- **Presentation mode** (▶ הצג ארכיטקטורה) — animated Hebrew walkthrough
- **Downloads** menu (⬇) — PDF / PNG / SVG poster + JSON
- **Mobile**: filters collapse into a drawer (☰ מסננים)

### Poster
- Print `sap-infrastructure-poster-A0.pdf` at A0 landscape for the office wall.
- Center = golden **SAP Core** hub (14 shared objects). Around it: 13 module zones with their main tables. Gold arrows = cross-module flow. Two legends (line meaning + module colors).

---

## 3. Coverage (gap analysis fixed)
- **Modules (12):** MM · SD · PP · PP-PI · PM · CS · QM · Batch · Classification · FI · CO · IDOC (+ PI/PO pod on poster)
- **Zones (5):** Master Data · Transaction Data · Integration Layer · Finance Layer · Shared SAP Objects
- **Added tables:** MCH1/MCHA/MCHB/MCHBH · KLAH/KSSK/AUSP/CABN/CAWN/KSML · QALS/QAVE/QAMV/QPAM · VBEP/KONV/PRCD_ELEMENTS · EKET/EKBE · BSID/BSAD/BSIK/BSAK · EDIDC/EDIDS/EDID4
- **Added relationships:** MATDOC→ACDOCA · VBAP→KONV/PRCD_ELEMENTS · Classification↔Material · Batch↔Material · Batch→Production/Process Orders · QM→Batch · PM→CO · CS→PM · CS→SD · SD Billing→FI · Goods Movement→FI/CO
- Mobile drawer, rail-overlap, hub readability, Hebraized chrome, fit/reset/clear, KPI bar — all addressed.

> Honesty note: PM + PP-PI tables are **real** (from `data/sapData.ts`). MM/SD/FI/CO/QM/CS/Batch/Classification/IDOC tables are **canonical models** (flagged `real:false`, shown dashed). To make them real, extract those blueprints into `sapData.ts` and regenerate.

---

## 4. Rebuild from source (one command chain)
```bash
# 1. dataset (source of truth)
node exports/build/01-dataset.mjs            # -> exports/sap-infrastructure-data.json

# 2. interactive map + poster are generated from that JSON by injecting d3 + data
#    into exports/build/{tpl-v3.html + app-v3.js} and exports/build/poster-v3.html
#    (see the inject one-liners used to produce sap-infrastructure-map.html and the poster).
```
Everything is **100% offline** — d3 v7 is vendored inline, no CDN, no remote fetch.

*Built by Sali Halif — Web Coding · NEO Cockpit · CBC Israel · 2026*
