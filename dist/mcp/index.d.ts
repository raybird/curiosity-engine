import { CuriosityEngine } from "../index.js";
export interface MCPTool {
    name: string;
    description: string;
    inputSchema: Record<string, any>;
}
export declare function getCuriosityTools(engine: CuriosityEngine): MCPTool[];
export declare function executeTool(engine: CuriosityEngine, toolName: string, args: any): Promise<any>;
//# sourceMappingURL=index.d.ts.map