# Curiosity Research: Polymarket RRP & System Risk Mapping
> **VERSION: v26.0402.1330 (CST)**
> **STATUS: ARCHITECTURE_LOCKED**

## 1. 預測市場作為「因果傳感器」
在 2026 年的高度不確定性環境下，傳統新聞感知存在滯後。Polymarket 的 CLOB (中央限價訂單簿) 提供了具備真金白銀支撐的即時因果數據。

## 2. 整合規格：RRP (Risk-Refined Pricing)
TeleNexus 的風險管理層將引入以下映射邏輯：

### A. 數據獲取規範
*   **API 終端**：`https://clob.polymarket.com`
*   **工具鏈**：`@polymarket/clob-client` (TypeScript)
*   **主要指標**：
    *   `Price_Yes`: 隱含機率 (Implied Probability)。
    *   `Order_Depth`: 數據的可信度地板（物理支撐強度）。

### B. 因果映射公式 (The Mapping)
系統風險係數 ($\rho$) 計算如下：
$$\rho = \sum (P_{event} \times W_{impact})$$
*   $P_{event}$: 事件發生機率。
*   $W_{impact}$: 對 TeleNexus 執行主權的影響權重（如：能源成本權重為 0.4）。

### C. 執行規訓對位
*   **$\rho < 0.3$**：執行 `Aggressive` 策略（追求最大執行效率）。
*   **$0.3 \le \rho < 0.6$**：執行 `Balanced` 策略。
*   **$\rho \ge 0.6$**：執行 `Sovereign` 策略（強制開啟 Footprint 能量過濾與高 ATR 止損）。

## 3. 實作路徑建議
1.  **開發 MarketOracle 模組**：定期掃描「Fed Rate Cut」、「Oil Price Spike」、「AI Regulation Act」等核心命題。
2.  **因果注入**：將 Oracle 產出的風險係數寫入 `workspace/context/runtime-status.md`，供所有排程任務讀取。

## 4. 下一步行動 (Action Items)
*   [ ] 實作第一個 Polymarket Read-only Client 原型。
*   [ ] 定義首批「核心風險命題清單」。
*   [ ] 在 `tn_footprint_imbalance_v6` 策略中實作風險係數接收端口。

---
*Curiosity Engine - TeleNexus Legal & Economic Research*
