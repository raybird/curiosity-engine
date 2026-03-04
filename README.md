# Curiosity Engine（好奇心引擎）

讓 AI Agent 能夠主動追蹤興趣主題、定期研究並產出報告。

## 功能特色

- **關鍵字管理** - 追蹤興趣主題，自訂搜尋頻率
- **自動化搜尋** - 支援多種資料來源
- **記憶儲存** - 搜尋結果自動寫入長期記憶
- **報告生成** - 每日/每週自動產出摘要報告
- **MCP Tool 整合** - 可供其他 AI Agent 使用

## 安裝

```bash
npm install curiosity-engine
```

## 使用範例

```typescript
import { CuriosityEngine } from "curiosity-engine";

const engine = new CuriosityEngine({
  memory: true,
});

// 新增興趣關鍵字
await engine.addInterest("AI Agents", { frequency: "daily" });

// 立即搜尋
const results = await engine.search("AI Agents");

// 取得每週報告
const report = await engine.generateWeeklyReport();
```

## 專案結構

```
src/
├── InterestManager.ts   # 關鍵字管理
├── SearchAgent.ts      # 搜尋引擎
├── MemoryBridge.ts     # 記憶儲存
├── ReportGenerator.ts  # 報告生成
└── index.ts            # 主入口
```

## 相關資源

- [開發規劃](./docs/)
- [GitHub Repo](https://github.com/raybird/curiosity-engine)
