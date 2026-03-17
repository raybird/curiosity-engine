import type { SearchOptions, SearchResultEntry } from "./types.js";
/**
 * SearchAgent 搜尋代理
 * 已優化：移除失效域名，改採「瀏覽器自動化」與「Mock 知識庫」雙軌制
 */
export declare class SearchAgent {
    private apiKey?;
    constructor(apiKey?: string);
    /**
     * 使用 agent-browser 進行真實網頁搜尋
     * 此方法能繞過 DNS 限制，直接與搜尋引擎交互
     */
    private browserSearch;
    search(keyword: string, options?: SearchOptions): Promise<SearchResultEntry>;
    /**
     * 根據目前系統狀態產出 Mock 知識，用於驅動離線反思
     */
    private getMockKnowledge;
    searchMultiple(keywords: string[], options?: SearchOptions): Promise<SearchResultEntry[]>;
}
//# sourceMappingURL=SearchAgent.d.ts.map