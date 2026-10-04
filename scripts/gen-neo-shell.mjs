#!/usr/bin/env node
// Only serializable presentation data crosses this boundary. Never import the
// server builders into the client or edit the generated index by hand.
import { readFileSync, writeFileSync } from "node:fs";
import { shellData } from "../components/neo-shell/nav-data.ts";
import { commandIndex } from "../components/neo-shell/search/command-index.ts";

import { contentIndex } from "../components/neo-shell/search/content-index.ts";

const path = new URL("../components/neo-shell/search/generated-shell-data.json", import.meta.url);
const output = JSON.stringify({ data: shellData(), cmd: commandIndex() }) + "\n";
if (process.argv.includes("--check")) {
  if (readFileSync(path, "utf8") !== output) {
    console.error("NEO shell index is stale. Run npm run gen:neo-shell.");
    process.exit(1);
  }
  console.log("NEO shell: exact equality with canonical presentation builders.");
} else {
  writeFileSync(path, output);
  console.log(`NEO shell: ${Buffer.byteLength(output)} bytes in one shared index.`);
}

const contentPath = new URL("../components/neo-shell/search/generated-content-search.json", import.meta.url);
const contentOutput = JSON.stringify(contentIndex()) + "\n";
if (process.argv.includes("--check")) {
  if (readFileSync(contentPath, "utf8") !== contentOutput) throw new Error("Content search index is stale. Run gen:neo-shell.");
} else {
  writeFileSync(contentPath, contentOutput);
  console.log(`Content search: ${Buffer.byteLength(contentOutput)} bytes, loaded on search open.`);
}
