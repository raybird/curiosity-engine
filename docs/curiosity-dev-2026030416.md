# Curiosity Engine 開發規劃

## 專案進度檢視

### ✅ 已完成 (Core Modules)

- InterestManager - 關鍵字管理
- SearchAgent - 搜尋引擎
- MemoryBridge - 記憶儲存
- ReportGenerator - 報告生成
- 專案結構初始化

### ⏳ 待完成 (from SPEC.md)

| 優先順序 | 功能          | 說明                              |
| -------- | ------------- | --------------------------------- |
| **高**   | MCP Tool 整合 | 包裝成可被其他 AI 使用的 MCP Tool |
| **高**   | 單元測試      | 確保各模組穩定                    |
| **中**   | README 撰寫   | 使用文件                          |
| **中**   | npm 發布      | 發布到 npm registry               |
| **低**   | CI/CD 設定    | GitHub Actions                    |

---

## 下一步具體規劃

### 1. MCP Tool 整合 (預計 30 分鐘)

```
src/mcp/
  ├── index.ts          # MCP Tool 入口
  ├── tools.ts          # 工具定義
  └── adapter.ts        # 與 CuriosityEngine 橋接
```

### 2. 單元測試 (預計 1 小時)

- 使用 vitest
- 測試各模組的核心功能

### 3. README 撰寫 (預計 20 分鐘)

- 安裝方式
- 使用範例
- API 文件

---

## 備註

- 搜尋 API 目前使用Placeholder，需確認實際來源
- GitHub Token 可用於取得 GitHub Trending 資料
