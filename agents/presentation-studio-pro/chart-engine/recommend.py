#!/usr/bin/env python3
"""Chart Intelligence Engine — profile a dataset and recommend the best chart.

Usage:
    python3 recommend.py <data.csv|data.json> [--intent trend|comparison|composition|distribution|relationship|flow|part_to_whole|kpi|financial]
    python3 recommend.py --profile <data.csv>     # just print the profile

Supports recommending among 14 chart types:
  line, area, bar, stacked_bar, waterfall, scatter, bubble, heatmap, treemap, sankey,
  radar, gauge, kpi_card, financial

Deterministic: profiles columns (temporal/categorical/numeric), detects special shapes
(flow source/target/value, matrix, OHLC, waterfall steps, single-metric), then maps to a chart with a
rationale, alternates, and a render strategy. Pure stdlib. An explicit --intent overrides ambiguity.
"""
import sys, csv, json, re, argparse, datetime, statistics

DATE_PATS = [r"^\d{4}-\d{2}-\d{2}", r"^\d{2}/\d{2}/\d{4}", r"^\d{4}$",
             r"^\d{4}[-/ ]?Q[1-4]$", r"(?i)^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)"]
FLOW = {"source", "target", "value"}
OHLC = {"open", "high", "low", "close"}

def is_num(v):
    try: float(str(v).replace(",", "").replace("%", "").replace("$", "")); return True
    except Exception: return False

def is_date(v):
    s = str(v).strip()
    return any(re.match(p, s) for p in DATE_PATS)

def load(path):
    if path.endswith(".json"):
        d = json.load(open(path))
        if isinstance(d, dict) and "rows" in d: d = d["rows"]
        cols = list(d[0].keys()); rows = [[r.get(c) for c in cols] for r in d]
        return cols, rows
    with open(path, newline="") as f:
        r = list(csv.reader(f))
    return r[0], r[1:]

def profile(cols, rows):
    n = len(rows)
    colinfo = []
    for j, c in enumerate(cols):
        vals = [r[j] for r in rows if j < len(r) and r[j] not in (None, "")]
        nonempty = len(vals)
        numeric = nonempty > 0 and all(is_num(v) for v in vals)
        temporal = nonempty > 0 and sum(is_date(v) for v in vals) >= max(1, int(0.8 * nonempty))
        uniq = len(set(map(str, vals)))
        kind = "temporal" if temporal else ("numeric" if numeric else "categorical")
        colinfo.append({"name": c, "kind": kind, "unique": uniq, "n": nonempty})
    lc = [c.lower() for c in cols]
    temporal = [c for c in colinfo if c["kind"] == "temporal"]
    numeric = [c for c in colinfo if c["kind"] == "numeric"]
    categ = [c for c in colinfo if c["kind"] == "categorical"]
    # special shapes
    flow = FLOW.issubset(set(lc))
    ohlc = OHLC.issubset(set(lc))
    matrix = len(categ) == 2 and len(numeric) == 1 and len(temporal) == 0 and not flow
    single_metric = n == 1 and len(numeric) >= 1
    has_target = any(x in lc for x in ("target", "goal", "benchmark"))
    # waterfall: a 'type'/'kind' step column (start/delta/total) or a label col + signed values
    waterfall = (any(x in lc for x in ("step", "bridge", "waterfall")) or
                 (len(categ) == 1 and len(numeric) == 1 and
                  any(str(r[[c['name'] for c in colinfo].index(numeric[0]['name'])]).lstrip("-").replace(",","").isdigit()
                      and str(r[[c['name'] for c in colinfo].index(numeric[0]['name'])]).startswith("-") for r in rows)))
    # composition: numeric series that look like parts (3+ numeric measures over a category/time)
    composition = (len(numeric) >= 3 and not ohlc and
                   (len(temporal) == 1 or (len(categ) == 1 and categ[0]["unique"] <= 12)))
    # hierarchy for treemap
    hierarchy = any(x in lc for x in ("parent", "child")) or (len(categ) == 1 and len(numeric) == 1 and categ[0]["unique"] > 12)
    return {"rows": n, "columns": colinfo, "temporal": temporal, "numeric": numeric,
            "categorical": categ, "flags": {"flow": flow, "ohlc": ohlc, "matrix": matrix,
            "single_metric": single_metric, "has_target": has_target, "waterfall": bool(waterfall),
            "composition": composition, "hierarchy": hierarchy}}

RENDER = {
    "line": "pptxgenjs native (charts.LINE)",
    "area": "pptxgenjs native (charts.AREA)",
    "bar": "pptxgenjs native (charts.BAR)",
    "stacked_bar": "pptxgenjs native (charts.BAR barGrouping:stacked)",
    "scatter": "pptxgenjs native (charts.SCATTER)",
    "bubble": "pptxgenjs native (charts.BUBBLE)",
    "radar": "pptxgenjs native (charts.RADAR)",
    "waterfall": "native shapes: bar + invisible base offsets (recipe in chart-catalog.md)",
    "heatmap": "table with per-cell fill OR SVG grid",
    "treemap": "SVG nested rects (squarified) — see infographics/recipes",
    "sankey": "Mermaid/Excalidraw flow OR SVG ribbons",
    "gauge": "SVG arc + needle",
    "kpi_card": "native shapes (rounded rect + big value + delta)",
    "financial": "candlestick: native hi-lo bars + open/close boxes (recipe)",
}

def recommend(p, intent=None):
    f = p["flags"]; T = len(p["temporal"]); N = len(p["numeric"]); C = len(p["categorical"])
    cat_unique = p["categorical"][0]["unique"] if C else 0
    recs = []  # (chart, why)
    # intent override hints
    if intent == "kpi" or f["single_metric"]:
        if f["has_target"]:
            recs.append(("gauge", "single metric measured against a target/goal → progress arc"))
            recs.append(("kpi_card", "alternate: headline number with a delta vs target"))
        else:
            recs.append(("kpi_card", "single row / one headline metric → show it big with a delta"))
    if intent == "flow" or f["ohlc"] is False and f["flow"]:
        recs.append(("sankey", "source/target/value columns → flows between nodes"))
    if intent == "financial" or f["ohlc"]:
        recs.append(("financial", "date + open/high/low/close → candlestick price chart"))
        recs.append(("line", "alternate: close-price line if OHLC detail isn't needed"))
    if intent == "composition" or f["composition"]:
        if T == 1:
            recs.append(("stacked_bar", "parts of a whole changing over time → stacked bars"))
            recs.append(("area", "alternate: stacked area to emphasize cumulative volume"))
        else:
            recs.append(("stacked_bar", "parts of a whole across categories → stacked bars"))
    if f["matrix"]:
        recs.append(("heatmap", "category × category → value matrix → heatmap"))
    if f["waterfall"]:
        recs.append(("waterfall", "running total with +/- steps (start→changes→end) → waterfall bridge"))
    if f["hierarchy"]:
        recs.append(("treemap", "many parts / hierarchy by size → treemap (area = magnitude)"))
    # core type-driven rules (added if not already strongly chosen)
    if T == 1 and N >= 1 and not f["composition"]:
        recs.append(("line", f"time on x + {N} measure(s) → trend over time" + (" (multi-series)" if N > 1 else "")))
        if N == 1: recs.append(("area", "alternate: area if magnitude/volume is the point"))
    if T == 0 and C == 1 and N == 1 and not f["waterfall"] and not f["hierarchy"]:
        if cat_unique <= 12:
            recs.append(("bar", f"{cat_unique} categories × one measure → compare with bars"))
        else:
            recs.append(("treemap", f"{cat_unique} categories (many) by size → treemap reads better than a long bar list"))
    if T == 0 and C == 1 and N >= 2 and 3 <= cat_unique <= 8:
        recs.append(("radar", f"{cat_unique} axes (dimensions) × {N} series → radar profile"))
    if T == 0 and N == 2 and C == 0:
        recs.append(("scatter", "two numeric variables → relationship/correlation"))
    if T == 0 and N >= 3 and C == 0 and not f["composition"]:
        recs.append(("bubble", "three numerics (x, y, size) → bubble"))
        recs.append(("scatter", "alternate: scatter on the two strongest variables"))
    # dedupe preserving order
    seen = set(); out = []
    for chart, why in recs:
        if chart in seen: continue
        seen.add(chart); out.append({"chart": chart, "why": why, "render": RENDER[chart]})
    if not out:
        out = [{"chart": "bar", "why": "default: categorical comparison", "render": RENDER["bar"]}]
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("data"); ap.add_argument("--intent", default=None)
    ap.add_argument("--profile", action="store_true")
    a = ap.parse_args()
    cols, rows = load(a.data)
    p = profile(cols, rows)
    if a.profile:
        print(json.dumps(p, indent=2)); return
    recs = recommend(p, a.intent)
    print(json.dumps({"dataset": a.data, "rows": p["rows"],
                      "shape": {"temporal": [c["name"] for c in p["temporal"]],
                                "numeric": [c["name"] for c in p["numeric"]],
                                "categorical": [c["name"] for c in p["categorical"]],
                                "flags": {k: v for k, v in p["flags"].items() if v}},
                      "recommended": recs[0], "alternates": recs[1:]}, indent=2))

if __name__ == "__main__":
    main()
