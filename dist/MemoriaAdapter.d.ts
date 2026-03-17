import type { SearchResultEntry } from "./types.js";
/**
 * MemoriaAdapter (記憶中樞適配器)
 * 負責將 Curiosity Engine 的搜尋結果轉化為 Memoria 系統可識別的結構化觀察 (Observation)。
 */
export declare class MemoriaAdapter {
    private memoriaHome;
    constructor();
    /**
     * 將搜尋結果同步至 Memoria 的 Daily 知識庫
     */
    syncToDaily(entry: SearchResultEntry): Promise<string | null>;
    /**
     * 格式化為帶有 Frontmatter 的 Markdown，以便 Memoria 反思掛鉤識別
     */
    private formatToMarkdown;
}
//# sourceMappingURL=MemoriaAdapter.d.ts.map