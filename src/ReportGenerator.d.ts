import { MemoryBridge } from "./MemoryBridge.js";
export declare class ReportGenerator {
    private memoryBridge;
    constructor(memoryBridge: MemoryBridge);
    generateDailyReport(): string;
    generateWeeklyReport(): string;
    generateKeywordReport(keyword: string): string;
    private filterByDate;
    private formatReport;
    private deduplicateResults;
}
//# sourceMappingURL=ReportGenerator.d.ts.map