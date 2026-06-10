// Demo deck — validates the Anthropic pptx skill (pptxgenjs path).
// 5 slides. Brand red #d62027. Mandatory footer credit on every slide.
const pptxgen = require("pptxgenjs");

const RED = "D62027";
const INK = "1E293B";
const MUTE = "64748B";
const LIGHT = "F1F5F9";
const WHITE = "FFFFFF";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3" x 7.5"
pres.author = "Sali Halif — Web Coding";
pres.title = "Project NEO Cockpit — pptx skill demo";

const PW = 13.3;
const newShadow = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.18 });

// Mandatory footer credit on every slide
function footer(slide, n) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 7.15, w: PW, h: 0.35, fill: { color: INK } });
  slide.addText("Project NEO Cockpit · CBC Israel", { x: 0.4, y: 7.15, w: 7, h: 0.35, fontSize: 9, color: WHITE, valign: "middle", margin: 0 });
  slide.addText([
    { text: "Web Coding · ", options: { color: "94A3B8" } },
    { text: "Sali Halif", options: { color: WHITE, bold: true } },
    { text: `   |   ${n}/5`, options: { color: "94A3B8" } },
  ], { x: 6.3, y: 7.15, w: 6.6, h: 0.35, fontSize: 9, align: "right", valign: "middle", margin: 0 });
}

// ---- Slide 1: Title ----
let s = pres.addSlide();
s.background = { color: INK };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.25, h: 7.5, fill: { color: RED } });
s.addText("PROJECT NEO COCKPIT", { x: 0.9, y: 2.2, w: 11, h: 0.6, fontSize: 16, color: RED, bold: true, charSpacing: 4, margin: 0 });
s.addText("ECC → S/4HANA Migration Cockpit", { x: 0.9, y: 2.85, w: 11.5, h: 1.0, fontSize: 40, color: WHITE, bold: true, margin: 0 });
s.addText("Offline technical data dictionary for PM and PP-PI", { x: 0.9, y: 3.95, w: 11, h: 0.6, fontSize: 18, color: "CBD5E1", margin: 0 });
footer(s, 1);

// ---- Slide 2: Agenda (bullets) ----
s = pres.addSlide();
s.background = { color: WHITE };
s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.5, w: 0.08, h: 0.7, fill: { color: RED } });
s.addText("Agenda", { x: 0.75, y: 0.5, w: 10, h: 0.7, fontSize: 28, color: INK, bold: true, valign: "middle", margin: 0 });
s.addText([
  { text: "Migration scope — PM and PP-PI modules", options: { bullet: true, breakLine: true, paraSpaceAfter: 10 } },
  { text: "Table & field coverage from definitive blueprints", options: { bullet: true, breakLine: true, paraSpaceAfter: 10 } },
  { text: "S/4 simplification notes, Fiori apps, SUM notes", options: { bullet: true, breakLine: true, paraSpaceAfter: 10 } },
  { text: "100% offline, static export — no CDN, no runtime", options: { bullet: true, breakLine: true, paraSpaceAfter: 10 } },
  { text: "Status persistence & JSON export/import", options: { bullet: true } },
], { x: 0.9, y: 1.6, w: 11, h: 4.5, fontSize: 18, color: INK });
footer(s, 2);

// ---- Slide 3: Scope table ----
s = pres.addSlide();
s.background = { color: WHITE };
s.addText("Coverage Snapshot", { x: 0.75, y: 0.5, w: 11, h: 0.7, fontSize: 28, color: INK, bold: true, margin: 0 });
const hdr = (t) => ({ text: t, options: { fill: { color: RED }, color: WHITE, bold: true, align: "center" } });
s.addTable([
  [hdr("Module"), hdr("Tables"), hdr("Fields"), hdr("Focus")],
  ["PP-PI", "68", "326", "Process orders, recipes, batches"],
  ["PM", "58", "280", "Equipment, functional locations, notifications"],
  [{ text: "Total", options: { bold: true } }, { text: "126", options: { bold: true } }, { text: "606", options: { bold: true } }, "Asserted at build time"],
], {
  x: 0.75, y: 1.5, w: 11.8, rowH: 0.7,
  fontSize: 14, color: INK, valign: "middle", align: "center",
  border: { pt: 0.5, color: "CBD5E1" },
  fill: { color: LIGHT },
  colW: [2.2, 1.8, 1.8, 6.0],
});
footer(s, 3);

// ---- Slide 4: Bar chart ----
s = pres.addSlide();
s.background = { color: WHITE };
s.addText("Tables vs Fields by Module", { x: 0.75, y: 0.5, w: 11, h: 0.7, fontSize: 28, color: INK, bold: true, margin: 0 });
s.addChart(pres.charts.BAR, [
  { name: "Tables", labels: ["PP-PI", "PM"], values: [68, 58] },
  { name: "Fields", labels: ["PP-PI", "PM"], values: [326, 280] },
], {
  x: 0.75, y: 1.5, w: 11.8, h: 5.0, barDir: "col",
  chartColors: [RED, "94A3B8"],
  chartArea: { fill: { color: WHITE } },
  catAxisLabelColor: MUTE, valAxisLabelColor: MUTE,
  valGridLine: { color: "E2E8F0", size: 0.5 }, catGridLine: { style: "none" },
  showValue: true, dataLabelPosition: "outEnd", dataLabelColor: INK, dataLabelFontSize: 11,
  showLegend: true, legendPos: "b", legendColor: MUTE,
});
footer(s, 4);

// ---- Slide 5: Closing ----
s = pres.addSlide();
s.background = { color: INK };
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.4, y: 2.0, w: 6.5, h: 2.6, fill: { color: "0F172A" }, line: { color: RED, width: 1.5 }, rectRadius: 0.12, shadow: newShadow() });
s.addText("Skill validated ✓", { x: 3.4, y: 2.4, w: 6.5, h: 0.8, fontSize: 30, color: WHITE, bold: true, align: "center", margin: 0 });
s.addText("Anthropic pptx skill generated this deck from scratch", { x: 3.6, y: 3.3, w: 6.1, h: 0.6, fontSize: 14, color: "CBD5E1", align: "center", margin: 0 });
s.addText("pptxgenjs → output.pptx → markitdown round-trip", { x: 3.6, y: 3.8, w: 6.1, h: 0.5, fontSize: 12, color: RED, align: "center", margin: 0 });
footer(s, 5);

pres.writeFile({ fileName: "demo.pptx" }).then((f) => console.log("WROTE", f));
