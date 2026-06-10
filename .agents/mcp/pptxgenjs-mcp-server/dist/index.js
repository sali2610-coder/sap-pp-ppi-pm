#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { PresentationManager } from "./presentation-manager.js";
import { toolDefinitions } from "./tools/index.js";
import { handleToolCall } from "./tool-handler.js";
const presentationManager = new PresentationManager();
const server = new Server({
    name: "pptxgenjs-mcp-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: toolDefinitions,
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    return handleToolCall(request, presentationManager);
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("PptxGenJS MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map