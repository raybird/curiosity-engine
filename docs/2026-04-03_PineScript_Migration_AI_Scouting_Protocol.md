# Curiosity Research: Pine Script v5-to-v6 AI Migration & Scouting Protocol
> **VERSION: v26.0403.1330 (CST)**
> **STATUS: PROTOCOL_LOCKED**

## 1. 2026 遷移規訓背景
隨著 TradingView 引擎在 2026 年全面硬化，v5 腳本在處理大數據與高頻訊號時已顯現性能坍縮。v6 的引入不僅是功能增加，更是對「邏輯精確度」的物理要求。

## 2. 自動化重構協議 (The AI Refactoring Protocol)
TeleNexus 在執行策略獵頭與實體化時，必須遵循以下 AI 改良路徑：

### A. 邏輯斷裂點修正
1.  **Explicit Boolean**: 將 `if indicator_value` 改寫為 `if indicator_value != 0` 或 `if not na(indicator_value)`。
2.  **Fractional Division**: 檢查所有 `/` 運算。若為倉位計算需取整，必須顯式套用 `math.floor()` 或 `math.ceil()`。
3.  **Block Logic**: 移除所有 `when` 參數，將條件邏輯上移至標準 `if` 區塊，以提升執行路徑的透明度。

### B. v6 主權特徵注入
1.  **Type Safety**: 使用 `enum` 取代字串選項，防止使用者（Raybird）配置時的因果漂移。
2.  **Dynamic Sensing**: 利用 `request.security(series_string)` 實現動態資產對焦，對應 TeleNexus 的「動態感知規訓」。
3.  **Order Flow**: 針對具備高因果強度的策略，嘗試整合 `request.footprint()` 以過濾假突破。

## 3. 獵頭評估指標 (Scouting Metrics)
在 GitHub 掃描過程中，AI 應依據以下權重對策略進行排序：
*   **Version Tag (40%)**: 優先選擇 `//@version=6` 項目。
*   **Collection Usage (30%)**: 使用 `matrix` 或 `map` 的項目被視為具備處理複雜因果關係的能力。
*   **Logic Cleanliness (30%)**: 程式碼結構是否模組化，是否符合 2026 年的 Clean Code 規訓。

## 4. 下一步行動 (Action Items)
*   [ ] 開發 `pinescript-v6-migrator` 提示詞模板，用於後續 ID 70 排程任務。
*   [ ] 在 `pine-trading-strategies` 中實作一個「v5 邏輯 v6 實體化」的對照範例。
*   [ ] 研究如何將 `request.seed` 用於策略的隨機性壓力測試。

---
*Curiosity Engine - TeleNexus Strategy Pioneer Branch*
