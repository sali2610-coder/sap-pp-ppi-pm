// Native per-element animated DEMO — 3 key slides as real shapes/text (not images),
// so pptx_animate.py builds each element in sequence. Dark Bit-cyan palette.
const pptxgen = require("pptxgenjs");
const path = require("path");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
p.title = "Bit-Ribit — animated demo";

const BG="0C1622", PANEL="18242F", LINE="2C3B48", WT="F4F8FC", WMUT="B8C7D4", CY="2DD8EC", CYD="1490B2", NAVY="1B4A6A", GRN="49E2AE", AMB="F6C45C";
const HE = { fontFace: "Arial", rtlMode: true };

// ---------- SLIDE A — transformation builds (payments -> ribit -> platform) ----------
(() => {
  const s = p.addSlide(); s.background = { color: BG };
  s.addText("THE MOVE", { x: 8.6, y: 0.4, w: 4.3, h: 0.3, fontSize: 11, color: CY, bold: true, align: "right", charSpacing: 3, fontFace: "Arial" });
  s.addText("מצינור תשלומים → לפלטפורמה פיננסית", { x: 0.5, y: 0.8, w: 12.3, h: 0.9, fontSize: 34, bold: true, color: WT, align: "center", ...HE });
  // payments (right)
  s.addShape("ellipse", { x: 10.0, y: 3.0, w: 1.5, h: 1.5, fill: { color: PANEL }, line: { color: "3C4F5C", width: 2 } });
  s.addText("תשלומים", { x: 9.3, y: 4.55, w: 2.9, h: 0.4, fontSize: 20, bold: true, color: WT, align: "center", ...HE });
  // arrow 1
  s.addShape("rightArrow", { x: 7.9, y: 3.55, w: 1.9, h: 0.4, rotate: 180, fill: { color: CY } });
  // ribit (center, hinge)
  s.addShape("ellipse", { x: 5.85, y: 2.75, w: 2.0, h: 2.0, fill: { color: NAVY }, line: { color: CY, width: 3 } });
  s.addText("ריביט", { x: 5.6, y: 4.9, w: 2.5, h: 0.5, fontSize: 24, bold: true, color: CY, align: "center", ...HE });
  // arrow 2
  s.addShape("rightArrow", { x: 3.85, y: 3.55, w: 1.9, h: 0.4, rotate: 180, fill: { color: CY } });
  // platform (left)
  s.addShape("ellipse", { x: 1.85, y: 3.0, w: 1.5, h: 1.5, fill: { color: PANEL }, line: { color: WT, width: 2 } });
  s.addText("פלטפורמה", { x: 1.1, y: 4.55, w: 2.9, h: 0.4, fontSize: 20, bold: true, color: WT, align: "center", ...HE });
  s.addText("ריביט הפך את ביט מאפליקציית תשלומים — לפלטפורמה שגם חוסכת.", { x: 0.5, y: 6.2, w: 12.3, h: 0.5, fontSize: 18, color: WMUT, align: "center", ...HE });
})();

// ---------- SLIDE B — 4% zooms in, benefits fly in one by one ----------
(() => {
  const s = p.addSlide(); s.background = { color: BG };
  s.addText("THE PRODUCT", { x: 8.6, y: 0.4, w: 4.3, h: 0.3, fontSize: 11, color: CY, bold: true, align: "right", charSpacing: 3, fontFace: "Arial" });
  s.addText("הכירו את ריביט", { x: 0.5, y: 0.8, w: 12.3, h: 0.8, fontSize: 30, bold: true, color: WT, align: "right", ...HE });
  // big 4% (will zoom)
  s.addText("4%", { x: 0.6, y: 2.4, w: 6.0, h: 2.6, fontSize: 200, bold: true, color: CY, align: "center", fontFace: "Arial Black" });
  s.addText("ריבית שנתית על כסף שיושב בארנק", { x: 0.6, y: 5.2, w: 6.0, h: 0.5, fontSize: 18, color: WMUT, align: "center", ...HE });
  // benefits (each separate -> sequential build)
  const ben = [["נובמבר 2025","מועד ההשקה"],["4% · 3 חודשים","המסלול בהשקה"],["10–20,000 ₪","סכום ההפקדה"],["נזיל או נעול","מסלולי משיכה"]];
  ben.forEach((r, i) => {
    const y = 2.5 + i * 1.05;
    s.addShape("roundRect", { x: 7.2, y, w: 5.6, h: 0.9, fill: { color: PANEL }, line: { color: LINE, width: 1 }, rectRadius: 0.08 });
    s.addText(r[0], { x: 7.4, y: y + 0.08, w: 5.2, h: 0.45, fontSize: 19, bold: true, color: WT, align: "right", ...HE });
    s.addText(r[1], { x: 7.4, y: y + 0.5, w: 5.2, h: 0.35, fontSize: 13, color: WMUT, align: "right", ...HE });
  });
})();

// ---------- SLIDE C — closing punchline builds ----------
(() => {
  const s = p.addSlide(); s.background = { color: BG };
  s.addText("THE TAKEAWAY", { x: 8.6, y: 0.4, w: 4.3, h: 0.3, fontSize: 11, color: CY, bold: true, align: "right", charSpacing: 3, fontFace: "Arial" });
  s.addText("הכסף הרדום", { x: 0.5, y: 2.4, w: 12.3, h: 1.1, fontSize: 54, bold: true, color: WMUT, align: "center", ...HE });
  s.addText("התחיל לעבוד.", { x: 0.5, y: 3.4, w: 12.3, h: 1.4, fontSize: 88, bold: true, color: CY, align: "center", ...HE });
  s.addText("כסף רדום  →  ריביט  →  פלטפורמה", { x: 0.5, y: 5.3, w: 12.3, h: 0.6, fontSize: 20, color: CY, align: "center", ...HE });
})();

p.writeFile({ fileName: path.resolve(__dirname, "out", "Bit_Ribit_Animated_Demo.pptx") }).then((f) => console.log("WROTE", f));
