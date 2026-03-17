import { InterestManager } from "./InterestManager.js";
import { SearchAgent } from "./SearchAgent.js";
import { MemoryBridge } from "./MemoryBridge.js";
import { ReportGenerator } from "./ReportGenerator.js";
import { MemoriaAdapter } from "./MemoriaAdapter.js";
export class CuriosityEngine {
    interestManager;
    searchAgent;
    memoryBridge;
    reportGenerator;
    memoriaAdapter;
    config;
    constructor(config = {}) {
        this.config = config;
        this.interestManager = new InterestManager();
        this.searchAgent = new SearchAgent(config.searchApiKey);
        this.memoryBridge = new MemoryBridge();
        this.reportGenerator = new ReportGenerator(this.memoryBridge);
        this.memoriaAdapter = new MemoriaAdapter();
    }
    addInterest(keyword, options) {
        return this.interestManager.addInterest(keyword, options);
    }
    removeInterest(keyword) {
        return this.interestManager.removeInterest(keyword);
    }
    listInterests() {
        return this.interestManager.listInterests();
    }
    async search(keyword) {
        const result = await this.searchAgent.search(keyword);
        if (this.config.memory) {
            this.memoryBridge.save(result);
            // 同步到 Memoria 中樞
            await this.memoriaAdapter.syncToDaily(result);
        }
        this.interestManager.updateLastSearched(keyword);
        return result;
    }
    async searchAll() {
        const interests = this.interestManager.getInterestsNeedingSearch();
        const keywords = interests.map((i) => i.keyword);
        if (keywords.length === 0) {
            return [];
        }
        const results = await this.searchAgent.searchMultiple(keywords);
        if (this.config.memory) {
            for (const result of results) {
                this.memoryBridge.save(result);
                // 同步到 Memoria 中樞
                await this.memoriaAdapter.syncToDaily(result);
            }
        }
        for (const keyword of keywords) {
            this.interestManager.updateLastSearched(keyword);
        }
        return results;
    }
    generateDailyReport() {
        return this.reportGenerator.generateDailyReport();
    }
    generateWeeklyReport() {
        return this.reportGenerator.generateWeeklyReport();
    }
    generateKeywordReport(keyword) {
        return this.reportGenerator.generateKeywordReport(keyword);
    }
    getHistory(keyword) {
        return this.memoryBridge.getHistory(keyword);
    }
}
export { InterestManager } from "./InterestManager.js";
export { SearchAgent } from "./SearchAgent.js";
export { MemoryBridge } from "./MemoryBridge.js";
export { ReportGenerator } from "./ReportGenerator.js";
export { getCuriosityTools, executeTool } from "./mcp/index.js";
export * from "./types.js";
