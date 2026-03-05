# Curiosity Engine 開發進度

## 專案狀態 (2026/3/5 16:30)

### ✅ 已完成

- InterestManager, SearchAgent, MemoryBridge, ReportGenerator
- README.md, docs/SOP.md
- **MCP Tool 整合（本次新增）**

### ⏳ 待完成

- 單元測試
- npm 發布

---

## 本次實作

### MCP Tools (6個)

1. `curiosity_add_interest` - 新增興趣關鍵字
2. `curiosity_remove_interest` - 移除興趣關鍵字
3. `curiosity_list_interests` - 列出所有興趣
4. `curiosity_search` - 立即搜尋
5. `curiosity_get_report` - 取得報告
6. `curiosity_schedule` - 設定定時追蹤

### 新增檔案

- `src/mcp/index.ts` - MCP 工具定義與執行器
