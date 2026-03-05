# Curiosity Engine 開發規劃

## 專案進度檢視 (2026/3/5)

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

## 本次開發想法

### 1. MCP Tool 整合 (高優先)

```typescript
// src/mcp/index.ts
export const curiosityTools = [
  {
    name: "curiosity_add_interest",
    description: "新增興趣關鍵字",
    inputSchema: {
      keyword: { type: "string" },
      frequency: { type: "string", enum: ["daily", "weekly", "monthly"] },
    },
  },
  // ... 其他 tools
];
```

### 2. 可考慮的新功能

- **Webhook 觸發**：外部事件觸發搜尋
- **多來源適配器**：Google News、Bing Search、GitHub API
- **CLI 工具**：方便直接執行

---

## 下一步行動

1. 實作 MCP Tool 整合 (預計 30 分鐘)
2. Commit & Push 到 GitHub
