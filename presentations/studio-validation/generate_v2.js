// Studio v2 — every deck includes: process infographic · data viz · summary visual · decision/action.
const pptxgen = require("pptxgenjs");
const fs = require("fs"), path = require("path");
const LIB = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../agents/presentation-studio-pro/templates/template-library.json"))).templates;
const IGD = path.resolve(__dirname, "../../agents/presentation-studio-pro/infographics/domain/out");
const IGG = path.resolve(__dirname, "../../agents/presentation-studio-pro/infographics/out");
const OUT = path.resolve(__dirname, "out_v2");

function base(k, title) { const p = new pptxgen(); p.layout = "LAYOUT_WIDE"; p.title = title; p.author = "Web Coding · Sali Halif"; return { p, t: LIB[k] }; }
function title(p, t, o, dark = true) { const s = p.addSlide(), C = t.colors; s.background = { color: dark ? C.primary : C.bg }; const fg = dark ? "FFFFFF" : C.ink;
  s.addShape("rect", { x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: C.accent } });
  s.addText(o.title, { x: 0.8, y: 2.2, w: 11.6, h: 1.8, fontSize: 38, bold: true, color: fg, fontFace: t.typography.face, valign: "top" });
  if (o.sub) s.addText(o.sub, { x: 0.8, y: 4.0, w: 11.6, h: 0.6, fontSize: 20, color: dark ? "CBD5E1" : C.muted, fontFace: t.typography.face });
  s.addText(o.meta || "CBC Israel · Web Coding · Sali Halif", { x: 0.8, y: 6.7, w: 11.6, h: 0.4, fontSize: 14, color: dark ? "94A3B8" : C.muted, fontFace: t.typography.face }); }
function action(p, t, title, dark = false) { const s = p.addSlide(), C = t.colors; s.background = { color: dark ? C.bg : C.bg };
  s.addText(title, { x: 0.5, y: 0.3, w: 12.3, h: 0.9, fontSize: 26, bold: true, color: dark ? C.accent : C.primary, fontFace: t.typography.face, valign: "top" });
  s.addShape("rect", { x: 0.5, y: 1.2, w: 12.3, h: 0.03, fill: { color: C.muted } }); return s; }
function imgSlide(p, t, ttl, png, cap) { const s = action(p, t, ttl); s.addImage({ path: png, x: 0.7, y: 1.45, w: 11.9, h: 4.7 });
  s.addText(cap, { x: 0.5, y: 7.05, w: 12.3, h: 0.3, fontSize: 12, color: t.colors.muted, fontFace: t.typography.face }); return s; }
function kpiStrip(p, t, ttl, tiles) { const s = action(p, t, ttl), C = t.colors;
  tiles.forEach((tl, i) => { const x = 0.5 + i * 3.13; s.addShape("roundRect", { x, y: 2.0, w: 2.9, h: 2.6, fill: { color: t.label === "Data Analytics" ? "0F172A" : "F4F5F7" }, line: { color: C.accent, width: 1 }, rectRadius: 0.08 });
    s.addText(tl[0], { x, y: 2.2, w: 2.9, h: 0.4, fontSize: 14, color: C.muted, align: "center", fontFace: t.typography.face });
    s.addText(tl[1], { x, y: 2.7, w: 2.9, h: 1, fontSize: 34, bold: true, color: C.accent, align: "center", fontFace: t.typography.face });
    s.addText(tl[2], { x, y: 3.8, w: 2.9, h: 0.4, fontSize: 13, color: C.muted, align: "center", fontFace: t.typography.face }); }); return s; }
function decision(p, t, label, lines) { const s = p.addSlide(), C = t.colors; s.background = { color: C.primary };
  s.addText(label, { x: 0.5, y: 0.3, w: 12, h: 0.5, fontSize: 20, color: t.colors.accent, fontFace: t.typography.face });
  s.addShape("rect", { x: 0.5, y: 0.85, w: 12.3, h: 0.04, fill: { color: C.accent } });
  s.addText(lines.map((l, i) => ({ text: (lines.length > 1 ? `${i + 1}. ` : "") + l, options: { breakLine: true } })), { x: 0.5, y: 1.2, w: 12.3, h: 4, fontSize: 22, bold: false, color: "FFFFFF", fontFace: t.typography.face, paraSpaceAfter: 18 });
  s.addText("sali2610@gmail.com", { x: 0.5, y: 6.7, w: 8, h: 0.4, fontSize: 14, color: t.colors.accent, fontFace: t.typography.face }); return s; }
function chart(p, t, ttl, type, data, opts, cap) { const s = action(p, t, ttl), C = t.colors;
  s.addChart(type, data, Object.assign({ x: 0.6, y: 1.5, w: 12, h: 4.6, chartColors: t.chart.palette, catAxisLabelColor: C.muted, valAxisLabelColor: C.muted, showLegend: false }, opts));
  if (cap) s.addText(cap, { x: 0.5, y: 7.05, w: 12.3, h: 0.3, fontSize: 12, color: C.muted, fontFace: t.typography.face }); return s; }

const plans = {};
const APROC = { category: "process_walkthrough" }, ADATA = { category: "kpi_build_up" }, ASUM = { category: "dashboard_animation" }, ADEC = { category: "fade" };

// 1 PP-PI Training (sap)
{ const { p, t } = base("sap", "SAP PP-PI Training");
  title(p, t, { title: "SAP PP-PI: Process Order Lifecycle", sub: "Hands-on training" });
  imgSlide(p, t, "The process order moves through five stages — COR1 to KO88", path.join(IGD, "pppi_process.png"), "Process infographic (PP-PI domain)");
  chart(p, t, "PP-PI carries more tables and fields than PM — plan lab time", "bar", [{ name: "Tables", labels: ["PP-PI", "PM"], values: [68, 58] }, { name: "Fields", labels: ["PP-PI", "PM"], values: [326, 280] }], { showValue: true, showLegend: true, legendPos: "b" }, "Data viz · chart-engine: bar");
  kpiStrip(p, t, "Summary: five stages, three documents to remember", [["Stages", "5", "COR1→KO88"], ["Confirm", "COR6N", "→ AFRU"], ["Settle", "KO88", "→ CO"], ["Dataset", "326", "PP-PI fields"]]);
  decision(p, t, "Action", ["Practice the full chain COR1 → COR2 → CO53 → COR6N → KO88 in the sandbox.", "Confirm to AFRU, then settle with KO88 and verify in the doc flow."]);
  plans["1_sap_pppi_training"] = [ADEC, APROC, ADATA, ASUM, ADEC].map((c, i) => ({ slide: i + 1, ...c, elements: ["a"] }));
  p.writeFile({ fileName: path.join(OUT, "1_sap_pppi_training/deck.pptx") }).then((x) => console.log("WROTE", "1_sap_pppi_training"));  }

// 2 PM Executive (executive)
{ const { p, t } = base("executive", "SAP PM Executive Review");
  title(p, t, { title: "PM Migration: ready to gate cutover on data completeness", sub: "Executive review" });
  imgSlide(p, t, "PM follows a measurable maintenance lifecycle through to settlement", path.join(IGD, "pm_lifecycle.png"), "Process infographic (PM domain)");
  chart(p, t, "Mapping completeness is 96% overall — PM at 93% is the gap", "bar", [{ name: "% complete", labels: ["PP-PI", "PM"], values: [98, 93] }], { showValue: true, valAxisMaxVal: 100, chartColors: [t.colors.accent, "6B7B8C"] }, "Data viz · chart-engine: bar");
  kpiStrip(p, t, "Summary: one gap to close before cutover", [["Overall", "96%", "mapped"], ["PP-PI", "98%", "ready"], ["PM", "93%", "+5 to go"], ["Gate", "≥98%", "threshold"]]);
  decision(p, t, "Decision", ["Approve the ≥98% completeness gate.", "Close the PM 5-point gap, then schedule SUM cutover."]);
  plans["2_sap_pm_exec"] = [ADEC, APROC, ADATA, ASUM, ADEC].map((c, i) => ({ slide: i + 1, ...c, elements: ["a"] }));
  p.writeFile({ fileName: path.join(OUT, "2_sap_pm_exec/deck.pptx") }).then((x) => console.log("WROTE", "2_sap_pm_exec"));  }

// 3 University Research (academic)
{ const { p, t } = base("academic", "University Research Project");
  title(p, t, { title: "Field-mapping completeness predicts ERP conversion defects", sub: "Research project · Information Systems" });
  imgSlide(p, t, "The study runs from question to conclusion through a clear design", path.join(IGD, "academic_method.png"), "Process infographic (research method)");
  chart(p, t, "Higher completeness coincides with 14× fewer defects", "bar", [{ name: "Defects/100 fields", labels: ["<80%", "80-90%", "90-98%", ">98%"], values: [14, 9, 4, 1] }], { showValue: true }, "Data viz · chart-engine: bar");
  kpiStrip(p, t, "Summary: a strong, monotonic completeness→defect gradient", [["Worst", "14", "/100 fields"], ["Best", "1", "/100 fields"], ["Spread", "14×", "fewer"], ["Holds", "PM+PP-PI", "both"]]);
  decision(p, t, "Conclusion", ["Completeness, not table count, is the readiness signal.", "Adopt a field-completeness gate; replicate across clients (limitation)."]);
  plans["3_university_research"] = [ADEC, APROC, ADATA, ASUM, ADEC].map((c, i) => ({ slide: i + 1, ...c, elements: ["a"] }));
  p.writeFile({ fileName: path.join(OUT, "3_university_research/deck.pptx") }).then((x) => console.log("WROTE", "3_university_research"));  }

// 4 Power BI Dashboard (data_analytics)
{ const { p, t } = base("data_analytics", "Power BI Analytics Dashboard");
  title(p, t, { title: "Operational analytics: throughput holds above target", sub: "Power BI readout · Q2 2026" });
  imgSlide(p, t, "Data flows ingest → model → dashboard before any metric is read", path.join(IGG, "01_process_flow.png"), "Process infographic (data pipeline)");
  { const s = p.addSlide(), C = t.colors; s.background = { color: C.bg };
    s.addText("Throughput trended up; mix stayed PM-heavy", { x: 0.5, y: 0.3, w: 12.3, h: 0.7, fontSize: 24, bold: true, color: "E2E8F0", fontFace: t.typography.face });
    s.addChart("line", [{ name: "Throughput", labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], values: [95, 96, 97, 96, 98, 98.2] }], { x: 0.5, y: 1.3, w: 7.5, h: 4.6, chartColors: ["14B8A6"], lineSize: 3, lineSmooth: true, catAxisLabelColor: "94A3B8", valAxisLabelColor: "94A3B8", showLegend: false, chartArea: { fill: { color: C.bg } } });
    s.addChart("doughnut", [{ name: "Mix", labels: ["PM", "PP-PI", "Other"], values: [45, 40, 15] }], { x: 8.2, y: 1.3, w: 4.6, h: 4.6, chartColors: ["14B8A6", "38BDF8", "A78BFA"], showLegend: true, legendPos: "b", legendColor: "94A3B8", dataLabelColor: "FFFFFF" });
    s.addText("Data viz · chart-engine: line (trend) + doughnut (composition)", { x: 0.5, y: 7.05, w: 12.3, h: 0.3, fontSize: 12, color: "94A3B8", fontFace: t.typography.face }); }
  imgSlide(p, t, "Summary dashboard: four KPIs, trend, and mix at a glance", path.join(IGD, "analytics_dashboard.png"), "Summary visual (dashboard layout)");
  decision(p, t, "Action", ["Hold the line on throughput; investigate flat utilization (88%).", "Promote the PM mix gains; keep defect rate < 1%."]);
  plans["4_powerbi_dashboard"] = [ADEC, APROC, ADATA, ASUM, ADEC].map((c, i) => ({ slide: i + 1, ...c, elements: ["a"] }));
  p.writeFile({ fileName: path.join(OUT, "4_powerbi_dashboard/deck.pptx") }).then((x) => console.log("WROTE", "4_powerbi_dashboard"));  }

// 5 Financial Forecast (financial)
{ const { p, t } = base("financial", "Financial Forecast");
  title(p, t, { title: "FY2026 forecast: revenue up 14%, margin expanding", sub: "FP&A · annual outlook" });
  imgSlide(p, t, "The forecast runs assumptions → model → bridge before the number", path.join(IGG, "01_process_flow.png"), "Process infographic (forecast pipeline)");
  chart(p, t, "Revenue is forecast to grow from 14.1M to 16.1M (+14%)", "line", [{ name: "Revenue (M)", labels: ["FY24", "FY25", "FY26F"], values: [12.4, 14.1, 16.1] }], { lineSize: 3, showValue: true }, "Data viz · chart-engine: line (trend)");
  imgSlide(p, t, "Summary bridge: volume adds, churn subtracts, margin holds", path.join(IGD, "financial_waterfall.png"), "Summary visual (waterfall bridge)");
  decision(p, t, "Action", ["Approve the FY26 forecast: +14% revenue, +1.5pp net margin.", "Fund expansion; hold OpEx growth to +7%."]);
  plans["5_financial_forecast"] = [ADEC, APROC, ADATA, ASUM, ADEC].map((c, i) => ({ slide: i + 1, ...c, elements: ["a"] }));
  p.writeFile({ fileName: path.join(OUT, "5_financial_forecast/deck.pptx") }).then((x) => console.log("WROTE", "5_financial_forecast"));  }

// write all
for (const d of Object.keys(plans)) fs.mkdirSync(path.join(OUT, d), { recursive: true });
setTimeout(() => {
  for (const [d, plan] of Object.entries(plans)) fs.writeFileSync(path.join(OUT, d, "animation_plan.json"), JSON.stringify(plan, null, 2));
  console.log("plans written");
}, 1800);
