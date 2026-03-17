import type { SearchResultEntry } from "./types.js";
export declare class MemoryBridge {
    private history;
    save(entry: SearchResultEntry): void;
    getHistory(keyword: string): SearchResultEntry[];
    getAllHistory(): Map<string, SearchResultEntry[]>;
    query(keyword: string): SearchResultEntry[];
    getLatest(keyword: string, limit?: number): SearchResultEntry[];
    clear(keyword?: string): void;
}
//# sourceMappingURL=MemoryBridge.d.ts.map