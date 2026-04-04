# Curiosity Research: Dynamic Risk-Free Rate & Macro Modeling
> **VERSION: v26.0404.1330 (CST)**
> **STATUS: MACRO_PROTOCOL_LOCKED**

## 1. 宏觀數據主權 (Data Sovereignty)
在 2026 年的執行環境中，價格信號僅佔因果權重的 40%。其餘 60% 取決於宏觀流動性。`request.seed()` 提供了將這些外部物理因素「硬編碼」進策略的標準路徑。

## 2. 核心規格：動態無風險利率規訓
TeleNexus 的高階策略應實裝以下邏輯：

### A. 動態 $r_f$ 獲取路徑
*   **數據源**：優先調用自建的 `telenexus_data` Seed 儲存庫。
*   **備援**：自動回退至 `TVC:US10Y` (10年期美債收益率)。
*   **變換**：`rf_daily = yield_val / 100 / 252`。

### B. 執行過濾器 (The Macro Switch)
*   **Risk-On**：當 $yield\_val < \text{SMA}(yield\_val, 20)$。允許執行趨勢追隨與多頭策略。
*   **Risk-Off**：當 $yield\_val \ge \text{SMA}(yield\_val, 20)$。強制進入「實體避險」模式，暫停所有非必要的槓桿交易。

### C. 績效規訓
*   夏普比率計算必須使用上述動態 $rf\_daily$，以確保回測報告中的「超額回報」不包含因通膨引發的虛假溢價。

## 3. 2026 實作建議
1.  **整合至武器庫**：將此邏輯注入 `tn_max_sharpe_sovereign_v6` 策略中。
2.  **因果標註**：利用 `log.info` 每 24 小時記錄一次宏觀環境位移，作為「每日因果日結」的物理數據源。

## 4. 下一步行動 (Action Items)
*   [ ] 在 `pine-trading-strategies` 中實作一個具備 `request.seed` 的宏觀過濾模組範本。
*   [ ] 研究「Agentic Federated Learning」：如何在 Ghost Grid 節點間進行隱私受控的策略優化。

---
*Curiosity Engine - TeleNexus Economic Research Branch*
