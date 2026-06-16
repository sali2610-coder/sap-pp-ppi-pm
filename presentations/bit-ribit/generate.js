// Bit-Ribit — NARRATIVE deck (product story). 14 full-bleed slides, near-black + Bit cyan.
// Spine: dormant money -> ribit -> financial platform. Frameworks support the story.
// All images are 4K (3840x2160) SVG exports.
const pptxgen = require("pptxgenjs");
const path = require("path");
const V = path.resolve(__dirname, "visuals");

const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
p.author = "נתנאל יברקן · סאלי חליף";
p.title = "ביט (bit) — כסף רדום → ריביט → פלטפורמה פיננסית";

// order -> relative png under visuals/  (heroes reuse the 4K hero exports)
const slides = [
  "story/s01_cover.png",        // 1  hero: ביט מעירה כסף רדום
  "story/s02_problem.png",      // 2  0% — dormant money (TAM)
  "story/s03_shift.png",        // 3  pipe -> platform (new direction)
  "story/s04_ribit.png",        // 4  meet ribit · 4%
  "story/s05_base.png",         // 5  3.5M captive base (SAM)
  "story/s06_compete.png",      // 6  4% no-condition (competitors)
  "story/s07_change.png",       // 7  intensification + me-too (change type)
  "story/s08_vision.png",       // 8  fits the bank's vision
  "fw3_porter.png",             // 9  Porter equalizer (hero, 4K)
  "story/s10_trojan.png",       // 10 trojan horse
  "story/s11_vpc.png",          // 11 customer value (VPC)
  "fw5_smart_okr.png",          // 12 OKR rings (hero, 4K)
  "new3_value_engine.png",      // 13 value flywheel (hero, 4K)
  "story/s14_ai.png",           // 14 AI critical review
  "story/s14_closing.png",      // 15 takeaway + sources
];

slides.forEach((rel) => {
  const s = p.addSlide();
  s.background = { color: "070A0E" };
  s.addImage({ path: path.join(V, rel), x: 0, y: 0, w: 13.3, h: 7.5 });
});

p.writeFile({ fileName: path.resolve(__dirname, "out", "Bit_Ribit_Strategic.pptx") })
  .then((f) => console.log("WROTE", f));
