// Drive the PptxGenJS MCP server over stdio. Build 4 decks via MCP tool calls.
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SERVER = path.join(ROOT, ".agents/mcp/pptxgenjs-mcp-server/dist/index.js");
const OUT = path.join(ROOT, "presentations/mcp-lab/out");
const IMG = path.join(ROOT, "presentations/mcp-lab/assets/flow.png");
const NAVY = "1F4E79", BLUE = "2E75B6", INK = "2D2D2D", MUT = "777777";

const transport = new StdioClientTransport({ command: "node", args: [SERVER] });
const client = new Client({ name: "mcp-lab-driver", version: "1.0.0" }, { capabilities: {} });
await client.connect(transport);

const tools = (await client.listTools()).tools;
console.log("TOOLS:", tools.map(t => t.name).join(", "));

const call = (name, args) => client.callTool({ name, arguments: args });
const textOf = (r) => (r.content?.[0]?.text || "").trim();

function parseId(r) {
  try { return JSON.parse(textOf(r)).presentationId; }
  catch { return (textOf(r).match(/pres_[\w]+/) || [])[0]; }
}
async function newDeck(meta) { return parseId(await call("create_presentation", meta)); }
async function slide(id) {
  const r = await call("add_slide", { presentationId: id });
  try { return JSON.parse(textOf(r)).slideNumber ?? 1; } catch { return 1; }
}
async function title(id, n, t, sub) {
  await call("add_text", { presentationId:id, slideNumber:n, text:t, x:0.5, y:0.3, w:9, h:0.9, fontSize:26, bold:true, color:NAVY, align:"left" });
  if (sub) await call("add_text", { presentationId:id, slideNumber:n, text:sub, x:0.5, y:1.15, w:9, h:0.4, fontSize:14, color:MUT, align:"left" });
}

async function build(meta, fname, fn) {
  const id = await newDeck(meta);
  await fn(id);
  const sp = await call("save_presentation", { presentationId: id, outputPath: path.join(OUT, fname) });
  console.log("SAVED", fname, "->", textOf(sp));
  return id;
}

// 1) KPI dashboard — charts + KPI tiles
await build({ title:"KPI Dashboard", author:"Sali Halif", company:"CBC Israel" }, "01_kpi_dashboard.pptx", async (id) => {
  let n = await slide(id);
  await title(id, n, "Operational KPIs hold above target across all four streams", "Quarterly cockpit · 2026");
  // KPI tiles
  const tiles = [["Throughput","98.2%","↑ 2.1"],["Defect rate","0.7%","↓ 0.3"],["On-time","96.5%","↑ 1.4"],["Utilization","88.0%","↑ 0.9"]];
  for (let i=0;i<tiles.length;i++){
    const x = 0.5 + i*2.35;
    await call("add_shape",{presentationId:id,slideNumber:n,shape:"roundRect",x,y:1.7,w:2.1,h:1.2,fill:BLUE});
    await call("add_text",{presentationId:id,slideNumber:n,text:tiles[i][0],x,y:1.8,w:2.1,h:0.3,fontSize:12,color:"FFFFFF",align:"center"});
    await call("add_text",{presentationId:id,slideNumber:n,text:tiles[i][1],x,y:2.1,w:2.1,h:0.5,fontSize:26,bold:true,color:"FFFFFF",align:"center"});
    await call("add_text",{presentationId:id,slideNumber:n,text:tiles[i][2],x,y:2.6,w:2.1,h:0.3,fontSize:11,color:"D6E4F0",align:"center"});
  }
  await call("add_chart",{presentationId:id,slideNumber:n,chartType:"line",title:"Throughput trend",
    data:[{name:"Throughput",labels:["Jan","Feb","Mar","Apr","May","Jun"],values:[95,96,97,96,98,98.2]}],x:0.5,y:3.1,w:5.5,h:2.3});
  await call("add_chart",{presentationId:id,slideNumber:n,chartType:"doughnut",title:"Mix",
    data:[{name:"Mix",labels:["PM","PP-PI","Other"],values:[45,40,15]}],x:6.2,y:3.1,w:3.3,h:2.3});
});

// 2) Financial report — table + bar chart
await build({ title:"Financial Report", author:"Sali Halif", company:"CBC Israel" }, "02_financial_report.pptx", async (id) => {
  let n = await slide(id);
  await title(id, n, "Revenue grew 14% while cost ratio fell to 61%", "FY2025 summary");
  await call("add_table",{presentationId:id,slideNumber:n,
    rows:[["Metric","FY2024","FY2025","Δ"],["Revenue","12.4M","14.1M","+14%"],["COGS","8.1M","8.6M","+6%"],
      ["Gross margin","34.7%","39.0%","+4.3pp"],["OpEx","2.9M","3.0M","+3%"],["Net margin","11.2%","14.9%","+3.7pp"]],
    x:0.5,y:1.7,w:4.6,h:3.0});
  await call("add_chart",{presentationId:id,slideNumber:n,chartType:"bar",title:"Revenue vs cost (M)",
    data:[{name:"Revenue",labels:["FY24","FY25"],values:[12.4,14.1]},{name:"COGS",labels:["FY24","FY25"],values:[8.1,8.6]}],
    x:5.4,y:1.7,w:4.1,h:3.0});
  await call("add_text",{presentationId:id,slideNumber:n,text:"Source: management accounts (unaudited).",x:0.5,y:5.0,w:9,h:0.3,fontSize:11,color:MUT});
});

// 3) Academic analytics — scatter + area + image
await build({ title:"Academic Analytics", author:"Sali Halif", company:"CBC Israel" }, "03_academic_analytics.pptx", async (id) => {
  let n = await slide(id);
  await title(id, n, "Mapping completeness correlates with lower defect rate", "Analytics deck · 2026");
  await call("add_chart",{presentationId:id,slideNumber:n,chartType:"area",title:"Defects by completeness band",
    data:[{name:"Defects/100",labels:["<80%","80-90%","90-98%",">98%"],values:[14,9,4,1]}],x:0.5,y:1.7,w:4.5,h:3.0});
  await call("add_chart",{presentationId:id,slideNumber:n,chartType:"pie",title:"Source mix",
    data:[{name:"Sources",labels:["Org","Data","Field","Tool"],values:[18,12,4,8]}],x:5.3,y:1.7,w:4.2,h:3.0});
  await call("add_image",{presentationId:id,slideNumber:n,path:IMG,x:0.5,y:4.9,w:3.0,h:0.45});
  await call("add_text",{presentationId:id,slideNumber:n,text:"Process reference embedded as image (offline asset).",x:3.7,y:5.0,w:5.6,h:0.3,fontSize:11,color:MUT});
});

// 4) SAP management report — table (tcodes) + bar + image
await build({ title:"SAP Management Report", author:"Sali Halif", company:"CBC Israel" }, "04_sap_management_report.pptx", async (id) => {
  let n = await slide(id);
  await title(id, n, "PM and PP-PI migration tracks green; data dictionary 96% complete", "ECC→S/4HANA · Project NEO");
  await call("add_table",{presentationId:id,slideNumber:n,
    rows:[["Module","Tables","Fields","Mapped"],["PP-PI","68","326","98%"],["PM","58","280","93%"],["Total","126","606","96%"]],
    x:0.5,y:1.7,w:4.4,h:2.2});
  await call("add_chart",{presentationId:id,slideNumber:n,chartType:"bar",title:"Fields by module",
    data:[{name:"Fields",labels:["PP-PI","PM"],values:[326,280]}],x:5.2,y:1.7,w:4.3,h:2.2});
  await call("add_image",{presentationId:id,slideNumber:n,path:IMG,x:0.5,y:4.1,w:5.0,h:0.9});
  await call("add_text",{presentationId:id,slideNumber:n,text:"IDoc / process reference · Web Coding · Sali Halif",x:0.5,y:5.05,w:9,h:0.3,fontSize:11,color:MUT});
});

const list = await call("list_presentations", {});
console.log("LIST:", textOf(list).slice(0, 300));
await client.close();
console.log("DONE");
