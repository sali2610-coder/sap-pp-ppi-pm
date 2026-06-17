// Studio validation — build 5 decks via the presentation-studio-pro system.
// Applies template-library tokens, chart-engine picks, an infographic, and an animation plan per deck.
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const LIB = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../agents/presentation-studio-pro/templates/template-library.json"))).templates;
const IG = path.resolve(__dirname, "../../agents/presentation-studio-pro/infographics/out");
const OUT = path.resolve(__dirname, "out");

function deckBase(tplKey, title, author) {
  const t = LIB[tplKey];
  const p = new pptxgen();
  p.layout = "LAYOUT_WIDE"; p.author = author; p.title = title;
  return { p, t, C: t.colors, F: t.typography };
}
const hex = (c) => c; // tokens already 6-char
function titleSlide(p, t, { title, sub, meta }, dark = true) {
  const s = p.addSlide();
  const C = t.colors;
  s.background = { color: dark ? C.primary : C.bg };
  const fg = dark ? "FFFFFF" : C.ink;
  s.addShape("rect", { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: C.accent } });
  s.addText(title, { x: 0.8, y: 2.2, w: 11.6, h: 1.8, fontSize: 40, bold: true, color: fg, fontFace: t.typography.face, align: "left", valign: "top" });
  if (sub) s.addText(sub, { x: 0.8, y: 4.0, w: 11.6, h: 0.6, fontSize: 20, color: dark ? "CBD5E1" : C.muted, fontFace: t.typography.face });
  if (meta) s.addText(meta, { x: 0.8, y: 6.7, w: 11.6, h: 0.4, fontSize: 14, color: dark ? "94A3B8" : C.muted, fontFace: t.typography.face });
  return s;
}
function actionSlide(p, t, title) {
  const s = p.addSlide(); const C = t.colors;
  s.background = { color: C.bg };
  s.addText(title, { x: 0.5, y: 0.3, w: 12.3, h: 0.9, fontSize: 26, bold: true, color: C.primary, fontFace: t.typography.face, valign: "top" });
  s.addShape("rect", { x: 0.5, y: 1.2, w: 12.3, h: 0.03, fill: { color: C.muted } });
  return s;
}
function bullets(s, t, items, x = 0.6, y = 1.5, w = 12, h = 4) {
  const C = t.colors;
  s.addText(items.map((it) => ({ text: it, options: { breakLine: true } })),
    { x, y, w, h, fontSize: 19, color: C.ink, fontFace: t.typography.face, bullet: true, paraSpaceAfter: 12 });
}
function chartColors(t) { return t.chart.palette; }
function cite(s, t, txt) {
  s.addText(txt, { x: 0.5, y: 7.05, w: 12.3, h: 0.3, fontSize: 12, color: t.colors.muted, fontFace: t.typography.face });
}

const plans = {}; // deck -> animation plan (per slide category)

// ---------- 1. SAP PP-PI Training ----------
(function () {
  const { p, t } = deckBase("sap", "SAP PP-PI Training", "Web Coding · Sali Halif");
  titleSlide(p, t, { title: "SAP PP-PI: Process Order Lifecycle", sub: "Hands-on training · Order-to-confirmation", meta: "CBC Israel · Web Coding · Sali Halif" });
  let s = actionSlide(p, t, "The process order moves through five stages from creation to settlement");
  s.addImage({ path: path.join(IG, "01_process_flow.png"), x: 0.6, y: 1.5, w: 12, h: 4.6 });
  cite(s, t, "Infographic: process-flow template (mermaid)");
  s = actionSlide(p, t, "Each stage maps to a transaction and a table you will use");
  s.addTable([
    [{ text: "Stage", options: { bold: true, color: "FFFFFF", fill: { color: t.colors.primary } } }, { text: "Tcode", options: { bold: true, color: "FFFFFF", fill: { color: t.colors.primary } } }, { text: "Table", options: { bold: true, color: "FFFFFF", fill: { color: t.colors.primary } } }],
    ["Create process order", "COR1", "AUFK / AFKO"], ["Release", "COR2", "status REL"],
    ["Control recipe", "CO53", "PI sheet"], ["Confirmation", "COR6N", "AFRU"], ["Settlement", "KO88", "CO docs"],
  ], { x: 0.6, y: 1.5, w: 12, fontSize: 16, color: t.colors.ink, fontFace: "Consolas", border: { pt: 0.5, color: "CCCCCC" }, fill: { color: "F4F5F7" } });
  s = actionSlide(p, t, "PP-PI carries more tables and fields than PM — plan training time accordingly");
  s.addChart("bar", [{ name: "Tables", labels: ["PP-PI", "PM"], values: [68, 58] }, { name: "Fields", labels: ["PP-PI", "PM"], values: [326, 280] }],
    { x: 0.6, y: 1.5, w: 12, h: 4.6, barDir: "col", chartColors: chartColors(t), showValue: true, dataLabelFontSize: 10, showLegend: true, legendPos: "b", catAxisLabelColor: t.colors.muted, valAxisLabelColor: t.colors.muted });
  cite(s, t, "Source: Project NEO blueprints (2026) · chart-engine pick: bar (categories × measure)");
  const cs = p.addSlide(); cs.background = { color: t.colors.primary };
  cs.addText("Recap", { x: 0.5, y: 0.3, w: 12, h: 0.5, fontSize: 20, color: "A0BBDD", fontFace: t.typography.face });
  cs.addText([{ text: "1. Five stages: ", options: { bold: true, breakLine: false } }, { text: "COR1 → COR2 → CO53 → COR6N → KO88.", options: { breakLine: true } },
  { text: "2. Confirmations post to AFRU; settlement closes the order.", options: { breakLine: true } },
  { text: "3. PP-PI is the larger dataset — budget extra lab time.", options: {} }], { x: 0.5, y: 1.0, w: 12, h: 3, fontSize: 20, color: "FFFFFF", fontFace: t.typography.face, paraSpaceAfter: 16 });
  p.writeFile({ fileName: path.join(OUT, "1_sap_pppi_training/deck.pptx") }).then((f) => console.log("WROTE", f));
  plans["1_sap_pppi_training"] = [{ slide: 1, category: "fade", elements: ["title"] }, { slide: 2, category: "process_walkthrough", elements: ["flow"] }, { slide: 3, category: "progressive_reveal", elements: ["r1", "r2", "r3", "r4", "r5"] }, { slide: 4, category: "kpi_build_up", elements: ["bars"] }, { slide: 5, category: "progressive_reveal", elements: ["t1", "t2", "t3"] }];
})();

// ---------- 2. SAP PM Executive Review ----------
(function () {
  const { p, t } = deckBase("executive", "SAP PM Executive Review", "Web Coding · Sali Halif");
  titleSlide(p, t, { title: "PM Migration: ready to gate cutover on data completeness", sub: "Executive review · ECC→S/4HANA", meta: "Steering committee · 2026" });
  let s = actionSlide(p, t, "Recommendation: block cutover until field mapping is ≥98% complete");
  s.addShape("roundRect", { x: 2.5, y: 1.6, w: 8.3, h: 1.6, fill: { color: "F4ECCB" }, line: { color: t.colors.accent, width: 1.5 }, rectRadius: 0.1 });
  s.addText("Gate the cutover on a measurable completeness threshold (≥98%).", { x: 2.7, y: 1.7, w: 7.9, h: 1.4, fontSize: 20, bold: true, color: t.colors.primary, align: "center", valign: "middle", fontFace: t.typography.face });
  bullets(s, t, ["Cheap insurance vs. a failed cutover", "Already measurable from the data dictionary"], 2.5, 3.6, 8.3, 1.5);
  s = actionSlide(p, t, "Mapping completeness is 96% overall — PM at 93% is the gap to close");
  s.addText("96%", { x: 0.8, y: 1.8, w: 4, h: 2, fontSize: 96, bold: true, color: t.colors.accent, fontFace: t.typography.face });
  s.addText("overall field mapping complete", { x: 0.8, y: 3.9, w: 5, h: 0.5, fontSize: 18, color: t.colors.muted, fontFace: t.typography.face });
  s.addChart("bar", [{ name: "% complete", labels: ["PP-PI", "PM"], values: [98, 93] }],
    { x: 6.0, y: 1.6, w: 6.5, h: 4.4, barDir: "col", chartColors: [t.colors.accent, "6B7B8C"], showValue: true, valAxisMaxVal: 100, showLegend: false, catAxisLabelColor: t.colors.muted, valAxisLabelColor: t.colors.muted });
  cite(s, t, "Source: NEO dictionary (2026) · chart-engine pick: bar");
  const cs = p.addSlide(); cs.background = { color: t.colors.primary };
  cs.addText("Decision", { x: 0.5, y: 0.3, w: 12, h: 0.5, fontSize: 20, color: "C9A227", fontFace: t.typography.face });
  cs.addText([{ text: "Approve the ≥98% completeness gate.  ", options: { bold: true, breakLine: true } }, { text: "Close the PM 5-point gap, then schedule SUM.", options: {} }], { x: 0.5, y: 1.2, w: 12, h: 2, fontSize: 24, color: "FFFFFF", fontFace: t.typography.face });
  cs.addText("sali2610@gmail.com", { x: 0.5, y: 6.7, w: 8, h: 0.4, fontSize: 14, color: "C9A227", fontFace: t.typography.face });
  p.writeFile({ fileName: path.join(OUT, "2_sap_pm_exec/deck.pptx") }).then((f) => console.log("WROTE", f));
  plans["2_sap_pm_exec"] = [{ slide: 1, category: "fade", elements: ["title"] }, { slide: 2, category: "zoom", elements: ["callout"] }, { slide: 3, category: "kpi_build_up", elements: ["bignum", "chart"] }, { slide: 4, category: "fade", elements: ["decision"] }];
})();

// ---------- 3. University Research Project ----------
(function () {
  const { p, t } = deckBase("academic", "University Research Project", "Sali Halif");
  titleSlide(p, t, { title: "Field-mapping completeness predicts ERP conversion defects", sub: "Research project · Information Systems", meta: "Sali Halif · 2026" });
  let s = actionSlide(p, t, "Conversions fail late because table sign-off hides field-level gaps");
  bullets(s, t, ["Short-run readiness overstated: sign-off tracks tables, not fields.", "Defects cluster at cutover when unmapped fields surface.", "The completeness→defect link is unmeasured."]);
  cite(s, t, "Heckman-style late-failure analogy; NEO blueprints (2026)");
  s = actionSlide(p, t, "Higher completeness coincides with sharply fewer conversion defects");
  s.addChart("bar", [{ name: "Defects/100 fields", labels: ["<80%", "80-90%", "90-98%", ">98%"], values: [14, 9, 4, 1] }],
    { x: 0.6, y: 1.5, w: 7, h: 4.5, barDir: "col", chartColors: chartColors(t), showValue: true, showLegend: false, catAxisLabelColor: t.colors.muted, valAxisLabelColor: t.colors.muted });
  s.addText("What to take away", { x: 8.0, y: 1.5, w: 4.3, h: 0.4, fontSize: 20, bold: true, color: t.colors.accent, fontFace: t.typography.face });
  bullets(s, t, ["14× fewer defects from worst to best band", ">98% complete: near-zero residual", "Holds in PM and PP-PI"], 8.0, 1.95, 4.3, 3);
  cite(s, t, "Source: SUM run logs (2026) · chart-engine pick: bar");
  s = actionSlide(p, t, "Completeness, not table count, is the readiness signal");
  bullets(s, t, ["Interpretation: field-first gate predicts defects where table sign-off does not.", "Limitation: single programme; replication needed."]);
  const rs = p.addSlide(); rs.background = { color: t.colors.bg };
  rs.addText("References", { x: 0.5, y: 0.3, w: 12, h: 0.5, fontSize: 24, bold: true, color: t.colors.primary, fontFace: t.typography.face });
  rs.addText([{ text: "Halif, S. (2026). Project NEO Migration Cockpit. CBC Israel.", options: { breakLine: true } }, { text: "SAP SE (2025). Software Update Manager (SUM) Guide. SAP Help Portal.", options: {} }], { x: 0.5, y: 1.0, w: 12, h: 3, fontSize: 14, color: t.colors.ink, fontFace: t.typography.face, paraSpaceAfter: 10 });
  p.writeFile({ fileName: path.join(OUT, "3_university_research/deck.pptx") }).then((f) => console.log("WROTE", f));
  plans["3_university_research"] = [{ slide: 1, category: "fade", elements: ["title"] }, { slide: 2, category: "progressive_reveal", elements: ["b1", "b2", "b3"] }, { slide: 3, category: "kpi_build_up", elements: ["chart", "takeaways"] }, { slide: 4, category: "progressive_reveal", elements: ["i1", "i2"] }, { slide: 5, category: "fade", elements: ["refs"] }];
})();

// ---------- 4. Power BI Analytics Dashboard ----------
(function () {
  const { p, t } = deckBase("data_analytics", "Power BI Analytics Dashboard", "Web Coding");
  const C = t.colors;
  titleSlide(p, t, { title: "Operational analytics: throughput holds above target", sub: "Power BI readout · Q2 2026", meta: "Web Coding · Sali Halif" });
  // KPI grid slide (dashboard)
  let s = p.addSlide(); s.background = { color: C.bg };
  s.addText("Four headline metrics, all green this quarter", { x: 0.5, y: 0.3, w: 12.3, h: 0.7, fontSize: 24, bold: true, color: "E2E8F0", fontFace: t.typography.face });
  const tiles = [["Throughput", "98.2%", "▲ +2.1", "14B8A6"], ["Defect rate", "0.7%", "▼ -0.3", "22C55E"], ["On-time", "96.5%", "▲ +1.4", "38BDF8"], ["Utilization", "88.0%", "— flat", "A78BFA"]];
  tiles.forEach((tl, i) => { const x = 0.5 + (i % 2) * 6.3, y = 1.3 + Math.floor(i / 2) * 2.7;
    s.addShape("roundRect", { x, y, w: 5.9, h: 2.4, fill: { color: "0F172A" }, line: { color: "1E293B", width: 1 }, rectRadius: 0.08 });
    s.addText(tl[0], { x: x + 0.3, y: y + 0.2, w: 5, h: 0.4, fontSize: 16, color: "94A3B8", fontFace: t.typography.face });
    s.addText(tl[1], { x: x + 0.3, y: y + 0.7, w: 5, h: 1, fontSize: 48, bold: true, color: tl[3], fontFace: t.typography.face });
    s.addText(tl[2], { x: x + 0.3, y: y + 1.8, w: 5, h: 0.4, fontSize: 15, color: "94A3B8", fontFace: t.typography.face });
  });
  // line + doughnut
  s = p.addSlide(); s.background = { color: C.bg };
  s.addText("Throughput trended up through the quarter; mix stayed PM-heavy", { x: 0.5, y: 0.3, w: 12.3, h: 0.7, fontSize: 24, bold: true, color: "E2E8F0", fontFace: t.typography.face });
  s.addChart("line", [{ name: "Throughput", labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], values: [95, 96, 97, 96, 98, 98.2] }],
    { x: 0.5, y: 1.3, w: 7.5, h: 4.6, chartColors: ["14B8A6"], lineSize: 3, lineSmooth: true, catAxisLabelColor: "94A3B8", valAxisLabelColor: "94A3B8", showLegend: false, chartArea: { fill: { color: C.bg } } });
  s.addChart("doughnut", [{ name: "Mix", labels: ["PM", "PP-PI", "Other"], values: [45, 40, 15] }],
    { x: 8.2, y: 1.3, w: 4.6, h: 4.6, chartColors: ["14B8A6", "38BDF8", "A78BFA"], showLegend: true, legendPos: "b", legendColor: "94A3B8", dataLabelColor: "FFFFFF" });
  cite(s, t, "Source: ops warehouse (2026) · chart-engine picks: line (trend), doughnut (composition)");
  p.writeFile({ fileName: path.join(OUT, "4_powerbi_dashboard/deck.pptx") }).then((f) => console.log("WROTE", f));
  plans["4_powerbi_dashboard"] = [{ slide: 1, category: "fade", elements: ["title"] }, { slide: 2, category: "dashboard_animation", elements: ["t1", "t2", "t3", "t4"] }, { slide: 3, category: "dashboard_animation", elements: ["line", "doughnut"] }];
})();

// ---------- 5. Financial Forecast ----------
(function () {
  const { p, t } = deckBase("financial", "Financial Forecast", "Web Coding · Sali Halif");
  titleSlide(p, t, { title: "FY2026 forecast: revenue up 14%, margin expanding", sub: "FP&A · annual outlook", meta: "Finance · 2026" }, true);
  let s = actionSlide(p, t, "Revenue is forecast to grow from 14.1M to 16.1M (+14%)");
  s.addChart("line", [{ name: "Revenue (M)", labels: ["FY24", "FY25", "FY26F"], values: [12.4, 14.1, 16.1] }],
    { x: 0.6, y: 1.5, w: 7.2, h: 4.5, chartColors: chartColors(t), lineSize: 3, showValue: true, catAxisLabelColor: t.colors.muted, valAxisLabelColor: t.colors.muted, showLegend: false });
  bullets(s, t, ["+14% YoY revenue", "Driven by volume, not price", "Margin +3.7pp"], 8.2, 1.6, 4.3, 3);
  cite(s, t, "Source: management accounts (unaudited) · chart-engine pick: line (trend)");
  s = actionSlide(p, t, "The bridge from FY25 to FY26: volume adds, churn subtracts");
  // waterfall-as-bar (approx): show components
  s.addChart("bar", [{ name: "Δ Revenue (M)", labels: ["FY25", "New", "Expansion", "Churn", "FY26F"], values: [14.1, 1.6, 0.9, -0.5, 16.1] }],
    { x: 0.6, y: 1.5, w: 12, h: 4.5, barDir: "col", chartColors: [t.colors.primary], showValue: true, catAxisLabelColor: t.colors.muted, valAxisLabelColor: t.colors.muted, showLegend: false });
  cite(s, t, "chart-engine pick: waterfall (start→±steps→end), rendered as bridge bars");
  s = actionSlide(p, t, "Summary P&L holds margin discipline through the forecast");
  s.addTable([
    [{ text: "Metric", options: { bold: true, color: "FFFFFF", fill: { color: t.colors.primary } } }, { text: "FY25", options: { bold: true, color: "FFFFFF", fill: { color: t.colors.primary } } }, { text: "FY26F", options: { bold: true, color: "FFFFFF", fill: { color: t.colors.primary } } }, { text: "Δ", options: { bold: true, color: "FFFFFF", fill: { color: t.colors.primary } } }],
    ["Revenue", "14.1M", "16.1M", "+14%"], ["Gross margin", "39.0%", "41.5%", "+2.5pp"], ["OpEx", "3.0M", "3.2M", "+7%"], ["Net margin", "14.9%", "16.4%", "+1.5pp"],
  ], { x: 0.6, y: 1.5, w: 12, fontSize: 16, color: t.colors.ink, fontFace: "Consolas", border: { pt: 0.5, color: "CCCCCC" }, fill: { color: "ECFDF5" } });
  p.writeFile({ fileName: path.join(OUT, "5_financial_forecast/deck.pptx") }).then((f) => console.log("WROTE", f));
  plans["5_financial_forecast"] = [{ slide: 1, category: "fade", elements: ["title"] }, { slide: 2, category: "kpi_build_up", elements: ["chart", "bullets"] }, { slide: 3, category: "timeline_animation", elements: ["bridge"] }, { slide: 4, category: "progressive_reveal", elements: ["table"] }];
})();

// write animation plans after a tick (ensure dirs exist via writeFile)
setTimeout(() => {
  for (const [d, plan] of Object.entries(plans)) {
    const dir = path.join(OUT, d); fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "animation_plan.json"), JSON.stringify(plan, null, 2));
  }
  console.log("animation plans written");
}, 1500);
