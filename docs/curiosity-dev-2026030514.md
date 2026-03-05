# Curiosity Engine 開發規劃

## 專案進度檢視 (2026/3/5 14:35 補跑)

### ✅ 已完成 (Core Modules)

- InterestManager - 關鍵字管理
- SearchAgent - 搜尋引擎
- MemoryBridge - 記憶儲存
- ReportGenerator - 報告生成
- 專案結構初始化
- README.md
- docs/SOP.md

### ⏳ 待完成 (from SPEC.md)

| 優先順序 | 功能          | 說明                              |
| -------- | ------------- | --------------------------------- |
| **高**   | MCP Tool 整合 | 包裝成可被其他 AI 使用的 MCP Tool |
| **中**   | 單元測試      | 確保各模組穩定                    |
| **中**   | npm 發布      | 發布到 npm registry               |
| **低**   | CI/CD 設定    | GitHub Actions                    |

---

## MCP Tool 整合詳細規劃

根據 SPEC.md，需要實作以下 6 個工具：

```typescript
// src/mcp/tools.ts
export const curiosityTools = [
  {
    name: "curiosity_add_interest",
    description: "新增興趣關鍵字進行追蹤",
    inputSchema: {
      keyword: { type: "string", description: "要追蹤的關鍵字" },
      frequency: {
        type: "string",
        enum: ["daily", "weekly", "monthly"],
        optional: true,
      },
      category: { type: "string", optional: true },
    },
  },
  {
    name: "curiosity_remove_interest",
    description: "移除興趣關鍵字",
    inputSchema: {
      keyword: { type: "string" },
    },
  },
  {
    name: "curiosity_list_interests",
    description: "列出所有追蹤中的興趣關鍵字",
    inputSchema: {},
  },
  {
    name: "curiosity_search",
    description: "立即執行搜尋",
    inputSchema: {
      keyword: { type: "string" },
      limit: { type: "number", optional: true },
    },
  },
  {
    name: "curiosity_get_report",
    description: "取得研究報告",
    inputSchema: {
      type: { type: "string", enum: ["daily", "weekly", "keyword"] },
      keyword: { type: "string", optional: true },
    },
  },
  {
    name: "curiosity_schedule",
    description: "設定定時追蹤排程",
    inputSchema: {
      keyword: { type: "string" },
      cron: { type: "string" },
    },
  },
];
```

---

## 下一步行動

1. 建立 `src/mcp/` 目錄
2. 實作 tools.ts
3. 實作 adapter.ts 與 CuriosityEngine 橋接
4. 撰寫單元測試
5. Commit & Push 到 GitHub
