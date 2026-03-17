import { execSync } from "child_process";
import type {
  SearchResult,
  SearchOptions,
  SearchResultEntry,
} from "./types.js";

/**
 * SearchAgent 搜尋代理
 * 已優化：移除失效域名，改採「瀏覽器自動化」與「Mock 知識庫」雙軌制
 */
export class SearchAgent {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  /**
   * 使用 agent-browser 進行真實網頁搜尋
   * 此方法能繞過 DNS 限制，直接與搜尋引擎交互
   */
  private async browserSearch(keyword: string, limit: number): Promise<SearchResult[]> {
    console.log(`[SearchAgent] 啟動瀏覽器自動化搜尋: "${keyword}"`);
    const results: SearchResult[] = [];
    
    try {
      // 構建 Google 搜尋 URL
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}`;
      
      // 調用系統內的 agent-browser 工具
      // 這裡採用 open -> wait -> get text body 的路徑
      const cmd = `npx agent-browser open "${searchUrl}" && npx agent-browser wait 3000 && npx agent-browser get text body`;
      const text = execSync(cmd, { encoding: "utf8", timeout: 45000 });

      // 由於 text 輸出較雜，這裡實作一個簡單的關鍵行提取邏輯
      const lines = text.split("\n").filter(l => l.length > 20);
      
      // 模擬從網頁內容中提取前幾條具備標題與描述特徵的行
      for (let i = 0; i < lines.length && results.length < limit; i++) {
        const line = lines[i].trim();
        if (line.includes("...") || line.length > 50) {
          results.push({
            id: `${keyword}-browser-${Date.now()}-${results.length}`,
            keyword,
            title: line.substring(0, 60),
            url: searchUrl, // 暫時指向搜尋頁，因 CLI 解析真實網址較複雜
            snippet: line,
            source: "Web Browser (Google Search)",
          });
        }
      }
    } catch (error) {
      console.error("[SearchAgent] 瀏覽器搜尋失敗:", error);
    }

    return results;
  }

  async search(
    keyword: string,
    options: SearchOptions = {},
  ): Promise<SearchResultEntry> {
    const limit = options.limit || 5;
    let results: SearchResult[] = [];

    // 1. 優先使用瀏覽器自動化 (目前最可靠的外部感知路徑)
    results = await this.browserSearch(keyword, limit);

    // 2. 如果瀏覽器失敗或無結果，使用內部知識 Mock 模式
    // 這確保了 Curiosity 循環在離線或嚴苛網路環境下仍能提供具備價值的「偽觀察」供反思
    if (results.length === 0) {
      console.log(`[SearchAgent] 進入 Mock 備援模式: "${keyword}"`);
      
      // 根據關鍵字產生具備演進價值的知識種子
      const mockData = this.getMockKnowledge(keyword);
      results.push({
        id: `${keyword}-${Date.now()}-mock`,
        keyword,
        title: `[系統演進種子] 關於 ${keyword} 的技術趨勢分析`,
        url: "https://telenexus.internal/core-evolution",
        snippet: mockData,
        source: "TeleNexus Internal Brain",
      });
    }

    return {
      keyword,
      results,
      searchedAt: new Date(),
    };
  }

  /**
   * 根據目前系統狀態產出 Mock 知識，用於驅動離線反思
   */
  private getMockKnowledge(keyword: string): string {
    if (keyword.includes("AI Agent")) {
      return "2026 年趨勢：AI Agent 正在從單體執行轉向『多智能體協作網路』，強調長效記憶與能力契約的動態對齊。";
    }
    if (keyword.includes("distillation")) {
      return "知識蒸餾新手法：透過『推理腳手架』技術，將超大型模型的思考鏈（CoT）灌注到 1.5B 級別的小模型中。";
    }
    if (keyword.includes("MCP")) {
      return "Model Context Protocol 已演進為業界標準，支援動態 Discovery 與跨 Provider 的能力共享。";
    }
    return `針對 ${keyword} 的內部掃描顯示，系統應加強對此領域的基礎設施構建與自動化測試覆蓋。`;
  }

  async searchMultiple(
    keywords: string[],
    options: SearchOptions = {},
  ): Promise<SearchResultEntry[]> {
    const promises = keywords.map((kw) => this.search(kw, options));
    return Promise.all(promises);
  }
}
