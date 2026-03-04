import type { SearchResultEntry } from "./types.js";

export class MemoryBridge {
  private history: Map<string, SearchResultEntry[]> = new Map();

  save(entry: SearchResultEntry): void {
    const existing = this.history.get(entry.keyword) || [];
    existing.push(entry);
    this.history.set(entry.keyword, existing);
  }

  getHistory(keyword: string): SearchResultEntry[] {
    return this.history.get(keyword) || [];
  }

  getAllHistory(): Map<string, SearchResultEntry[]> {
    return this.history;
  }

  query(keyword: string): SearchResultEntry[] {
    const results: SearchResultEntry[] = [];
    for (const [key, entries] of this.history.entries()) {
      if (key.includes(keyword)) {
        results.push(...entries);
      }
    }
    return results;
  }

  getLatest(keyword: string, limit: number = 5): SearchResultEntry[] {
    const entries = this.getHistory(keyword);
    return entries.slice(-limit);
  }

  clear(keyword?: string): void {
    if (keyword) {
      this.history.delete(keyword);
    } else {
      this.history.clear();
    }
  }
}
