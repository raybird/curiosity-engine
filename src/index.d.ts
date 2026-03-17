import type { CuriosityConfig, InterestOptions } from "./types.js";
export declare class CuriosityEngine {
    private interestManager;
    private searchAgent;
    private memoryBridge;
    private reportGenerator;
    private memoriaAdapter;
    private config;
    constructor(config?: CuriosityConfig);
    addInterest(keyword: string, options?: InterestOptions): import("./types.js").Interest;
    removeInterest(keyword: string): boolean;
    listInterests(): import("./types.js").Interest[];
    search(keyword: string): Promise<import("./types.js").SearchResultEntry>;
    searchAll(): Promise<import("./types.js").SearchResultEntry[]>;
    generateDailyReport(): string;
    generateWeeklyReport(): string;
    generateKeywordReport(keyword: string): string;
    getHistory(keyword: string): import("./types.js").SearchResultEntry[];
}
export { InterestManager } from "./InterestManager.js";
export { SearchAgent } from "./SearchAgent.js";
export { MemoryBridge } from "./MemoryBridge.js";
export { ReportGenerator } from "./ReportGenerator.js";
export { getCuriosityTools, executeTool } from "./mcp/index.js";
export * from "./types.js";
//# sourceMappingURL=index.d.ts.map