# Curiosity Engine 專案規格

## 1. 專案概述

**專案名稱：** Curiosity Engine（好奇心引擎）
**類型：** Node.js + TypeScript Library / MCP Tool
**核心功能：** 讓 AI Agent 能夠主動追蹤興趣主題、定期研究並產出報告
**目標使用者：** AI Agent 開發者、需要自動化資訊追蹤的使用者

## 2. 系統架構

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ InterestManager │ ──▶ │   SearchAgent   │ ──▶ │  MemoryBridge  │
│   (關鍵字管理)    │     │   (搜尋引擎)     │     │   (記憶儲存)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         ▼                                               ▼
┌─────────────────┐                             ┌─────────────────┐
│   User Input    │                             │  ReportGenerator│
│  (使用者輸入)    │                             │   (報告生成)    │
└─────────────────┘                             └─────────────────┘
```

## 3. 功能規格

### 3.1 InterestManager（關鍵字管理器）

- **addInterest(keyword: string, options?)** - 新增興趣關鍵字
- **removeInterest(keyword: string)** - 移除關鍵字
- **listInterests()** - 列出所有關鍵字
- **getInterestsByCategory(category: string)** - 按分類取得關鍵字
- 支援自訂搜尋頻率、來源過濾

### 3.2 SearchAgent（搜尋引擎）

- **search(keyword: string, options?)** - 執行單次搜尋
- **searchMultiple(keywords: string[])** - 批量搜尋
- **scheduleSearch(keyword: string, cron: string)** - 定時搜尋
- 支援多種資料來源（Web Search、GitHub API、News API）

### 3.3 MemoryBridge（記憶橋接）

- **save(searchResult)** - 儲存搜尋結果到長期記憶
- **query(query: string)** - 查詢歷史資料
- **getHistory(keyword: string)** - 取得特定關鍵字的歷史追蹤

### 3.4 ReportGenerator（報告生成）

- **generateDailyReport()** - 每日摘要報告
- **generateWeeklyReport()** - 每週研究報告
- **generateCustomReport(options)** - 自訂報告
- 輸出格式：Markdown

## 4. MCP Tool 整合

提供以下 MCP Tool：

- `curiosity_add_interest` - 新增興趣關鍵字
- `curiosity_remove_interest` - 移除興趣關鍵字
- `curiosity_list_interests` - 列出所有興趣
- `curiosity_search` - 立即搜尋
- `curiosity_get_report` - 取得報告
- `curiosity_schedule` - 設定定時追蹤

## 5. 使用範例

```typescript
import { CuriosityEngine } from "@telenexus/curiosity-engine";

const engine = new CuriosityEngine({
  memory: true, // 啟用記憶功能
  scheduler: true, // 啟用排程
});

// 新增興趣關鍵字
await engine.addInterest("AI Agents", { frequency: "daily" });
await engine.addInterest("TypeScript", { frequency: "weekly" });

// 立即搜尋
const results = await engine.search("AI Agents");

// 取得每週報告
const report = await engine.generateWeeklyReport();
```

## 6. 技術規格

- **語言：** TypeScript
- **Node 版本：** >= 18
- **依賴：**
  - `exa-js` 或自訂搜尋適配器
  - `node-schedule` 或內建排程
  - 支援連接外部記憶系統（MCP Memory）

## 7. 預期產出

1. 可發布的 npm 套件
2. MCP Tool 整合
3. 範例專案展示
