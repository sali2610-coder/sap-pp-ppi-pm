import { CallToolRequest } from "@modelcontextprotocol/sdk/types.js";
import { PresentationManager } from "./presentation-manager.js";
export declare function handleToolCall(request: CallToolRequest, manager: PresentationManager): Promise<{
    content: {
        type: string;
        text: string;
    }[];
} | {
    content: {
        type: string;
        text: string;
    }[];
    isError: boolean;
}>;
//# sourceMappingURL=tool-handler.d.ts.map