import { MemoryBridge } from "./MemoryBridge.js";
import type { SearchResultEntry } from "./types.js";

export class ReportGenerator {
  private memoryBridge: MemoryBridge;

  constructor(memoryBridge: MemoryBridge) {
    this.memoryBridge = memoryBridge;
  }

  generateDailyReport(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const entries = this.filterByDate(yesterday);
    return this.formatReport("每日摘要", entries);
  }

  generateWeeklyReport(): string {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const entries = this.filterByDate(lastWeek);
    return this.formatReport("每週研究報告", entries);
  }

  generateKeywordReport(keyword: string): string {
    const entries = this.memoryBridge.getHistory(keyword);
    return this.formatReport(`關鍵字：${keyword}`, entries);
  }

  private filterByDate(since: Date): SearchResultEntry[] {
    const allHistory = this.memoryBridge.getAllHistory();
    const filtered: SearchResultEntry[] = [];

    for (const [, entries] of allHistory) {
      for (const entry of entries) {
        if (entry.searchedAt >= since) {
          filtered.push(entry);
        }
      }
    }

    return filtered;
  }

  private formatReport(title: string, entries: SearchResultEntry[]): string {
    const date = new Date().toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let report = `# ${title}\n`;
    report += `> 產生日期：${date}\n\n`;

    if (entries.length === 0) {
      report += "暂无资料\n";
      return report;
    }

    const grouped = new Map<string, SearchResultEntry[]>();
    for (const entry of entries) {
      const existing = grouped.get(entry.keyword) || [];
      existing.push(entry);
      grouped.set(entry.keyword, existing);
    }

    for (const [keyword, keywordEntries] of grouped) {
      report += `## 🔍 ${keyword}\n\n`;

      const allResults = keywordEntries.flatMap((e) => e.results);
      const uniqueResults = this.deduplicateResults(allResults);

      for (const result of uniqueResults.slice(0, 5)) {
        report += `- [${result.title}](${result.url})\n`;
        if (result.snippet) {
          report += `  > ${result.snippet.slice(0, 150)}...\n`;
        }
        report += `\n`;
      }
      report += "\n";
    }

    return report;
  }

  private deduplicateResults(results: any[]): any[] {
    const seen = new Set<string>();
    return results.filter((r) => {
      if (seen.has(r.url)) return false;
      seen.add(r.url);
      return true;
    });
  }
}
