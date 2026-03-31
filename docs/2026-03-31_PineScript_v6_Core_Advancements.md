# Curiosity Research: Pine Script v6 Core Advancements
> **VERSION: v26.0331.1400 (CST)**
> **STATUS: INITIAL_SURVEY_COMPLETED**

## 1. 範式轉移：從「指標」到「策略作業系統」
在 2026 年的維度下，Pine Script v6 已不再僅是繪圖語言，它透過 Enums 與無限 Scope 實踐了複雜的狀態機管理。

## 2. 核心變革深度規訓

### A. 動態主權 (Dynamic Requesting)
*   **技術特徵**：`request.security()` 接受 series string。
*   **因果意義**：Agent 可以根據市場情緒動態決定「去哪裡看數據」，而非預設死板的監測列表。這與 TeleNexus 的「動態感知」路徑高度重合。

### B. 訂單流實體化 (Footprint & Volume Row)
*   **技術特徵**：原生支援 `request.footprint()`。
*   **物理價值**：能夠量化「暴力買盤/賣盤」的精確物理位置。對於 TeleNexus 而言，這是從「價格信號」轉向「能量分布感知」的關鍵。

### C. 執行韌性 (Order Trimming)
*   **技術特徵**：自動移除舊訂單以維持長週期運算。
*   **規訓意義**：解決了長效型策略在 24/7 維運時的內存與邏輯堆疊問題。

## 3. 2026 實踐建議
1.  **類型安全化**：立即將所有 v5 舊腳本遷移至 v6，利用其嚴格的類型檢查排除因果漏洞。
2.  **訂單流整合**：開發基於 `footprint` 的「物理地板探針」，輔助加密智庫判斷 $72k 等關鍵位階的實際支撐強度。
3.  **Enums 模組化**：利用列舉類型重構策略配置，降低使用者（Raybird）在設置參數時的錯誤率。

## 4. 下一步行動 (Action Items)
*   [ ] 實作一個利用 `request.footprint()` 的「實體支撐偵測器」原型。
*   [ ] 測試 `input.enum()` 在複雜策略中的 UI 表現。
*   [ ] 評估動態數據請求對策略加載速度的影響。

---
*Curiosity Engine - Technical Scouting Branch*
