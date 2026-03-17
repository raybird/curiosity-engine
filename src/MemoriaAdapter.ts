import fs from "fs/promises";
import path from "path";
import type { SearchResultEntry } from "./types.js";

/**
 * MemoriaAdapter (記憶中樞適配器)
 * 負責將 Curiosity Engine 的搜尋結果轉化為 Memoria 系統可識別的結構化觀察 (Observation)。
 */
export class MemoriaAdapter {
  private memoriaHome: string;

  constructor() {
    // 優先讀取環境變數，預設為 TeleNexus 標準路徑
    this.memoriaHome = process.env.MEMORIA_HOME || "/app/workspace/Memoria";
  }

  /**
   * 將搜尋結果同步至 Memoria 的 Daily 知識庫
   */
  async syncToDaily(entry: SearchResultEntry): Promise<string | null> {
    const dailyPath = path.join(this.memoriaHome, "knowledge", "Daily");
    const dateStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const fileName = `${dateStr}_curiosity_${entry.keyword.replace(/\s+/g, "_")}.md`;
    const fullPath = path.join(dailyPath, fileName);

    const content = this.formatToMarkdown(entry);

    try {
      // 確保目錄存在
      await fs.mkdir(dailyPath, { recursive: true });
      await fs.writeFile(fullPath, content, "utf-8");
      return fullPath;
    } catch (error) {
      console.error(`[MemoriaAdapter] 同步失敗: ${error}`);
      return null;
    }
  }

  /**
   * 格式化為帶有 Frontmatter 的 Markdown，以便 Memoria 反思掛鉤識別
   */
  private formatToMarkdown(entry: SearchResultEntry): string {
    const frontmatter = [
      "---",
      `type: Curiosity_Finding`,
      `keyword: ${entry.keyword}`,
      `origin: curiosity-engine`,
      `searched_at: ${entry.searchedAt.toISOString()}`,
      `reflection_status: pending_reflection`,
      `result_count: ${entry.results.length}`,
      "---",
      "",
      `# 好奇心探索結果: ${entry.keyword}`,
      "",
      `探索時間: ${entry.searchedAt.toLocaleString()}`,
      "",
      "## 探索發現",
      "",
      entry.results.map(res => `### ${res.title}\n- **來源**: ${res.source}\n- **網址**: ${res.url}\n- **摘要**: ${res.snippet}`).join("\n\n"),
      "",
      "---",
      "*此檔案由 Curiosity Engine 自動生成，待 TeleNexus Oracle 進行反思分析。*"
    ].join("\n");

    return frontmatter;
  }
}
