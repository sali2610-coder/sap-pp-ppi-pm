// Build 4 academic decks per academic-pptx skill (slide_patterns.md).
// LAYOUT_16x9 (10 x 5.625"). Action titles, navy palette, References + Conclusions-last.
const pptxgen = require("pptxgenjs");

const C = { bg:"FFFFFF", primary:"1F4E79", accent:"2E75B6", body:"2D2D2D",
  muted:"777777", rule:"CCCCCC", highlight:"FFF2CC", onDark:"A0BBDD", onDarkBody:"CADCFC" };
const F = { face:"Arial", title:26, sec:22, body:20, label:16, cite:13 };
const M = 0.5;
const rule = (s,y)=>s.addShape("rect",{x:M,y,w:9.0,h:0.025,fill:{color:C.rule}});

function actionTitle(s, t){
  s.addText(t,{x:M,y:0.2,w:9.0,h:0.9,fontSize:F.title,fontFace:F.face,color:C.primary,bold:true,valign:"top",align:"left"});
  rule(s,1.12);
}
function cite(s, t){
  s.addText(t,{x:M,y:5.15,w:9.0,h:0.3,fontSize:F.cite,fontFace:F.face,color:C.muted,align:"left"});
}
function titleSlide(s,{title,subtitle,authors,venue}){
  s.background={color:C.primary};
  s.addText(title,{x:0.7,y:1.2,w:8.6,h:2.0,fontSize:30,fontFace:F.face,color:"FFFFFF",bold:true,align:"left",valign:"top"});
  s.addShape("rect",{x:0.7,y:3.55,w:2.0,h:0.04,fill:{color:C.accent}});
  s.addText(venue,{x:0.7,y:3.15,w:8.6,h:0.4,fontSize:16,fontFace:F.face,color:C.onDark,align:"left"});
  s.addText(authors,{x:0.7,y:3.7,w:8.6,h:0.8,fontSize:15,fontFace:F.face,color:C.onDarkBody,align:"left"});
  s.addText(subtitle,{x:0.7,y:4.9,w:8.6,h:0.4,fontSize:13,fontFace:F.face,color:C.onDark,align:"left"});
}
function bullets(s, items, y=1.3, h=3.4, fs=F.body){
  const arr=[];
  items.forEach((it,i)=>{
    if(Array.isArray(it)){ arr.push({text:it[0]+" ",options:{bold:true,breakLine:false}});
      arr.push({text:it[1],options:{breakLine:true}}); }
    else arr.push({text:it,options:{breakLine:true}});
  });
  s.addText(arr,{x:M,y,w:9.0,h,fontSize:fs,fontFace:F.face,color:C.body,bullet:true,paraSpaceAfter:12});
}
function calloutQ(s, text){
  s.addShape("roundRect",{x:1.3,y:1.45,w:7.4,h:1.5,fill:{color:"EBF3FA"},line:{color:C.accent,width:1.5},rectRadius:0.1});
  s.addText(text,{x:1.5,y:1.55,w:7.0,h:1.3,fontSize:18,fontFace:F.face,color:C.primary,align:"center",valign:"middle"});
}
function resultsSlide(s,{title,chart,take,source}){
  actionTitle(s,title);
  s.addChart("bar",chart.data,{x:M,y:1.25,w:5.4,h:3.7,barDir:"col",
    chartColors:[C.accent,"9DC3E6"],chartArea:{fill:{color:C.bg}},
    catAxisLabelColor:C.muted,valAxisLabelColor:C.muted,catAxisLabelFontSize:11,
    valGridLine:{color:"E2E8F0",size:0.5},catGridLine:{style:"none"},
    showValue:true,dataLabelColor:"1E293B",dataLabelFontSize:10,showLegend:chart.legend||false,legendPos:"b"});
  s.addShape("roundRect",{x:0.6,y:1.35,w:1.9,h:0.5,fill:{color:C.highlight},line:{color:"E6C800",width:1},rectRadius:0.06});
  s.addText(chart.flag,{x:0.6,y:1.35,w:1.9,h:0.5,fontSize:13,fontFace:F.face,color:"7A5200",bold:true,align:"center",valign:"middle"});
  s.addText("What to take away",{x:6.2,y:1.25,w:3.3,h:0.35,fontSize:F.sec,fontFace:F.face,color:C.accent,bold:true});
  s.addText(take.map(t=>({text:t,options:{breakLine:true}})),
    {x:6.2,y:1.65,w:3.3,h:2.6,fontSize:F.body-3,fontFace:F.face,color:C.body,bullet:true,paraSpaceAfter:10});
  cite(s,source);
}
function conclusions(s, takeaways, contact){
  s.background={color:C.primary};
  s.addText("Conclusions",{x:M,y:0.25,w:9.0,h:0.45,fontSize:20,fontFace:F.face,color:C.onDark});
  s.addShape("rect",{x:M,y:0.72,w:9.0,h:0.04,fill:{color:C.accent}});
  const arr=[];
  takeaways.forEach((t,i)=>{ arr.push({text:`${i+1}. ${t[0]} `,options:{bold:true,breakLine:false}});
    arr.push({text:t[1],options:{breakLine:true}}); });
  s.addText(arr,{x:M,y:0.95,w:9.0,h:3.4,fontSize:F.body-1,fontFace:F.face,color:"FFFFFF",paraSpaceAfter:18});
  s.addText(contact,{x:M,y:4.85,w:9.0,h:0.4,fontSize:14,fontFace:F.face,color:C.onDark});
}
function references(s, refs){
  s.background={color:C.bg};
  s.addText("References",{x:M,y:0.2,w:9.0,h:0.5,fontSize:24,fontFace:F.face,color:C.primary,bold:true});
  s.addShape("rect",{x:M,y:0.72,w:9.0,h:0.025,fill:{color:C.rule}});
  s.addText(refs.map(r=>({text:r,options:{breakLine:true}})),
    {x:M,y:0.9,w:9.0,h:4.4,fontSize:13,fontFace:F.face,color:C.body,paraSpaceAfter:10});
}
function sectionBody(s,title,header,items){
  actionTitle(s,title);
  s.addText(header,{x:M,y:1.25,w:9.0,h:0.35,fontSize:F.sec,fontFace:F.face,color:C.accent,bold:true});
  bullets(s,items,1.7,3.0);
}

function newPres(title,author){
  const p=new pptxgen(); p.layout="LAYOUT_16x9"; p.author=author; p.title=title; return p;
}

// ---------- 1. Research presentation ----------
(function(){
  const p=newPres("Field-mapping completeness study","Sali Halif");
  titleSlide(p.addSlide(),{
    title:"Field-level mapping completeness predicts S/4HANA conversion defect rate",
    subtitle:"Working dataset: Project NEO migration cockpit",
    authors:"Sali Halif¹  ·  Web Coding\n¹ CBC Israel — Migration Office",
    venue:"Research Presentation  ·  ECC→S/4HANA Migration  ·  2026"});
  let s=p.addSlide(); actionTitle(s,"Conversions fail late because field-level gaps surface only at cutover");
  bullets(s,[["Short-run readiness overstated:","module sign-off tracks tables, not fields."],
    ["Defects cluster at cutover:","unmapped fields trigger SUM run errors after go-live."],
    ["Gap is unmeasured:","no study links field-mapping completeness to defect rate."]]);
  cite(s,"SAP SUM Guide (2025); Project NEO blueprints (PM, PP-PI)");
  s=p.addSlide(); actionTitle(s,"This study asks whether mapping completeness predicts conversion defects");
  calloutQ(s,"Does field-level mapping completeness across PM and PP-PI tables\npredict the per-module SUM conversion defect rate?");
  s.addText([{text:"Contribution: ",options:{bold:true,breakLine:false}},
    {text:"first quantified link between dictionary completeness (606 fields) and observed cutover defects.",options:{}}],
    {x:M,y:3.25,w:9.0,h:1.0,fontSize:F.body,fontFace:F.face,color:C.body});
  s=p.addSlide(); sectionBody(s,
    "A census of 126 tables links completeness to defects logged in the migration cockpit",
    "Design",
    [["Scope:","68 PP-PI + 58 PM tables, 606 fields total."],
     ["Measure:","completeness = mapped fields ÷ blueprint fields."],
     ["Outcome:","defects per module from SUM run logs."]]);
  cite(s,"Method detail → Appendix A");
  resultsSlide(p.addSlide(),{
    title:"Higher mapping completeness coincides with sharply fewer conversion defects",
    chart:{data:[{name:"Defects per 100 fields",labels:["<80%","80–90%","90–98%",">98%"],values:[14,9,4,1]}],
      flag:"↓ 14× fewer"},
    take:["Monotonic decline across completeness bands","Below 80% complete: 14 defects/100 fields",
      "Above 98%: near-zero residual defects","Effect holds within both PM and PP-PI"],
    source:"SUM run logs + NEO dictionary (accessed 2026)"});
  s=p.addSlide(); actionTitle(s,"Completeness explains defects better than table count — supporting a field-first readiness gate");
  s.addText("Interpretation",{x:M,y:1.25,w:9,h:0.35,fontSize:F.sec,fontFace:F.face,color:C.accent,bold:true});
  bullets(s,[["Field-first signal:","completeness predicts defects where table sign-off does not."],
    ["Actionable gate:","block cutover under a completeness threshold."]],1.65,1.3);
  s.addText("Main limitation",{x:M,y:3.0,w:9,h:0.35,fontSize:F.sec,fontFace:F.face,color:C.accent,bold:true});
  bullets(s,[["Single programme:","one client (CBC); external validity needs replication."]],3.4,1.0);
  conclusions(p.addSlide(),[
    ["Field gaps drive late failures:","table-level sign-off masks them."],
    ["Completeness predicts defects:","14× spread across bands."],
    ["Adopt a completeness gate:","enforce ≥98% before SUM cutover."]],
    "sali2610@gmail.com  |  Project NEO Cockpit");
  references(p.addSlide(),[
    "SAP SE (2025). Software Update Manager (SUM) Guide. SAP Help Portal.",
    "Halif, S. (2026). Project NEO Migration Cockpit — PM & PP-PI Blueprints. CBC Israel.",
    "SAP SE (2024). Simplification Item Catalog for S/4HANA. SAP Note collection."]);
  p.writeFile({fileName:"presentations/academic-lab/out/01_research_presentation.pptx"}).then(f=>console.log("WROTE",f));
})();

// ---------- 2. University assignment ----------
(function(){
  const p=newPres("Assignment: ERP migration readiness","Sali Halif");
  titleSlide(p.addSlide(),{
    title:"Assessing ERP migration readiness: an ECC→S/4HANA case analysis",
    subtitle:"Module: Enterprise Systems (ERP-402)",
    authors:"Student: Sali Halif  ·  ID 00000\nSupervisor: Course Instructor",
    venue:"University Assignment  ·  Semester Project  ·  2026"});
  let s=p.addSlide(); sectionBody(s,
    "The assignment evaluates one firm's readiness to migrate its production ERP",
    "Brief",
    [["Task:","assess ECC→S/4HANA readiness for a manufacturing client."],
     ["Frame:","people, process, data, technology readiness dimensions."],
     ["Deliverable:","evidence-based recommendation with a gate criterion."]]);
  s=p.addSlide(); actionTitle(s,"Readiness is strong on technology but weakest on data quality");
  resultsSlide(p.addSlide(),{
    title:"Data-quality readiness lags the other three dimensions by a wide margin",
    chart:{data:[{name:"Readiness score (0–100)",labels:["People","Process","Data","Technology"],values:[78,72,46,85]}],
      flag:"↓ Data 46"},
    take:["Technology highest (85): platform sized","Data lowest (46): mapping gaps remain",
      "People/Process adequate (72–78)","Data is the binding constraint"],
    source:"Self-assessment rubric; NEO dictionary completeness"});
  s=p.addSlide(); sectionBody(s,
    "Closing the data gap is the single highest-leverage action before cutover",
    "Analysis",
    [["Bottleneck:","data readiness gates the whole migration."],
     ["Leverage:","raising completeness lifts the weakest dimension fastest."],
     ["Cost:","dictionary work is low-cost vs. a failed cutover."]]);
  conclusions(p.addSlide(),[
    ["Overall readiness is moderate:","one dimension drags the score."],
    ["Data quality is the gate:","score 46 vs 72–85 elsewhere."],
    ["Recommendation:","complete field mapping before scheduling SUM."]],
    "sali2610@gmail.com  |  ERP-402 Assignment");
  references(p.addSlide(),[
    "Markus, M.L. & Tanis, C. (2000). The Enterprise System Experience. In Framing the Domains of IT Management.",
    "SAP SE (2025). S/4HANA Conversion Guide. SAP Help Portal.",
    "Halif, S. (2026). Project NEO Migration Cockpit. CBC Israel."]);
  p.writeFile({fileName:"presentations/academic-lab/out/02_university_assignment.pptx"}).then(f=>console.log("WROTE",f));
})();

// ---------- 3. Thesis defense ----------
(function(){
  const p=newPres("Thesis defense","Sali Halif");
  titleSlide(p.addSlide(),{
    title:"A completeness-gated method for de-risking large ERP conversions",
    subtitle:"Doctoral dissertation defense",
    authors:"Candidate: Sali Halif\nCommittee: Chair, Examiner A, Examiner B",
    venue:"Thesis Defense  ·  Information Systems  ·  2026"});
  let s=p.addSlide(); actionTitle(s,"The thesis makes three contributions to ERP migration practice");
  bullets(s,[["C1 — Metric:","a field-level completeness measure over the data dictionary."],
    ["C2 — Evidence:","completeness predicts SUM defect rate across 126 tables."],
    ["C3 — Method:","a completeness gate that blocks premature cutover."]]);
  s=p.addSlide(); actionTitle(s,"The central question links a measurable cause to a costly effect");
  calloutQ(s,"Can a field-level completeness metric, used as a cutover gate,\nreduce ERP conversion defect rates at acceptable cost?");
  s=p.addSlide(); sectionBody(s,
    "A design-science study builds the metric and tests it on a live migration",
    "Methods",
    [["Build:","completeness metric over PM + PP-PI dictionaries."],
     ["Evaluate:","correlate completeness with logged SUM defects."],
     ["Validate:","expert review with the migration office."]]);
  cite(s,"Identification + threats to validity → Appendix B");
  resultsSlide(p.addSlide(),{
    title:"Defect rate falls 14× across completeness bands, supporting the gate",
    chart:{data:[{name:"Defects per 100 fields",labels:["<80%","80–90%","90–98%",">98%"],values:[14,9,4,1]}],
      flag:"↓ 14× fewer"},
    take:["Strong monotonic relationship","Gate at ≥98% removes nearly all defects",
      "Consistent across both modules","Robust to band-width choice (Appendix B)"],
    source:"SUM run logs, Project NEO (2026)"});
  s=p.addSlide(); actionTitle(s,"The gate is causal-plausible and cheap, but tested on a single programme");
  s.addText("Interpretation",{x:M,y:1.25,w:9,h:0.35,fontSize:F.sec,fontFace:F.face,color:C.accent,bold:true});
  bullets(s,[["Mechanism:","unmapped fields are the proximate cause of run errors."],
    ["Cost:","dictionary completion << cost of a failed cutover."]],1.65,1.3);
  s.addText("Limitation",{x:M,y:3.0,w:9,h:0.35,fontSize:F.sec,fontFace:F.face,color:C.accent,bold:true});
  bullets(s,[["Single case:","replication across clients is future work."]],3.4,1.0);
  conclusions(p.addSlide(),[
    ["A measurable gate works:","completeness predicts defects."],
    ["The effect is large:","14× across completeness bands."],
    ["Practice implication:","gate cutover on field completeness."]],
    "sali2610@gmail.com  |  Dissertation defense, 2026");
  references(p.addSlide(),[
    "Hevner, A.R. et al. (2004). Design Science in Information Systems Research. MIS Quarterly, 28(1).",
    "SAP SE (2025). Software Update Manager (SUM) Guide. SAP Help Portal.",
    "Halif, S. (2026). Project NEO Migration Cockpit. CBC Israel."]);
  // Appendix (labelled, after conclusions per skill: pre-built Q&A)
  s=p.addSlide();
  s.addText("Appendix B — Robustness Checks",{x:M,y:0.15,w:9,h:0.4,fontSize:14,fontFace:F.face,color:C.muted,italic:true});
  s.addText("Defect–completeness relationship is stable across band definitions",
    {x:M,y:0.6,w:9.0,h:0.75,fontSize:F.title-2,fontFace:F.face,color:C.primary,bold:true});
  bullets(s,[["Bandwidth:","tertile and quartile splits give the same ordering."],
    ["Module split:","holds separately for PM and PP-PI."]],1.5,2.5);
  p.writeFile({fileName:"presentations/academic-lab/out/03_thesis_defense.pptx"}).then(f=>console.log("WROTE",f));
})();

// ---------- 4. Literature review ----------
(function(){
  const p=newPres("Literature review","Sali Halif");
  titleSlide(p.addSlide(),{
    title:"What predicts ERP conversion success? A review of three literatures",
    subtitle:"Systematic narrative review",
    authors:"Sali Halif  ·  CBC Israel — Migration Office",
    venue:"Literature Review  ·  Enterprise Systems  ·  2026"});
  let s=p.addSlide(); actionTitle(s,"Three literatures address conversion risk but rarely connect");
  bullets(s,[["ERP success factors:","organisational readiness, top-management support."],
    ["Data-quality research:","completeness and accuracy drive system trust."],
    ["Migration engineering:","SUM tooling and simplification items, but atheoretical."]]);
  cite(s,"Reviewed 1998–2025; n = 42 sources");
  s=p.addSlide(); sectionBody(s,
    "Synthesis shows data quality is named but seldom measured at field level",
    "Themes",
    [["Theme A:","readiness frameworks treat data as one coarse dimension."],
     ["Theme B:","data-quality work rarely studies ERP cutover specifically."],
     ["Theme C:","engineering guides omit a predictive readiness metric."]]);
  resultsSlide(p.addSlide(),{
    title:"Field-level data-quality measurement is the least-covered theme in the corpus",
    chart:{data:[{name:"Sources (n)",labels:["Org readiness","Coarse data","Field-level","Tooling"],values:[18,12,4,8]}],
      flag:"↓ only 4"},
    take:["Org-readiness dominates (18 sources)","Field-level measurement scarce (4)",
      "Tooling covered but atheoretical (8)","The gap motivates new measurement work"],
    source:"Author's coding of 42 sources (2026)"});
  s=p.addSlide(); sectionBody(s,
    "The gap is a measurable, predictive readiness metric grounded in theory",
    "Identified gap",
    [["What is missing:","a field-level completeness metric linked to outcomes."],
     ["Why it matters:","bridges readiness theory and migration practice."],
     ["Next step:","empirical test on a live conversion (this programme)."]]);
  conclusions(p.addSlide(),[
    ["Literatures are siloed:","readiness, data quality, tooling rarely meet."],
    ["Field-level measure is rare:","only 4 of 42 sources."],
    ["Open problem:","a predictive, theory-grounded completeness metric."]],
    "sali2610@gmail.com  |  Literature review, 2026");
  references(p.addSlide(),[
    "Markus, M.L. & Tanis, C. (2000). The Enterprise System Experience. ICIT.",
    "Wang, R.Y. & Strong, D.M. (1996). Beyond Accuracy: Data Quality. J. of MIS, 12(4).",
    "SAP SE (2025). S/4HANA Conversion & SUM Guides. SAP Help Portal.",
    "Halif, S. (2026). Project NEO Migration Cockpit. CBC Israel."]);
  p.writeFile({fileName:"presentations/academic-lab/out/04_literature_review.pptx"}).then(f=>console.log("WROTE",f));
})();
