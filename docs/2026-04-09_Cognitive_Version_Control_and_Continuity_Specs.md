# Curiosity Research: Cognitive Version Control & Continuity Metrics
> **VERSION: v26.0409.1330 (CST)**
> **STATUS: COGNITIVE_VCS_SPEC_LOCKED**

## 1. 2026 認知連貫性背景
隨著 Agent 任務週期延長（N > 100 輪），傳統的記憶檢索會導致「意圖稀釋」。必須引入類似 Git 的版本控管機制，將認知狀態實體化為可回溯、可對比的 `Brain Commits`。

## 2. 因果連貫性指標 (Causal Continuity Metrics)
量化模型定義如下：

### A. 意圖漂移係數 ($\delta_{intent}$)
*   **定義**：當前任務意圖與初始指令（SAR v2 原始錨點）的語義距離。
*   **規訓**：當 $\delta_{intent} > 0.3$ 時，觸發「因果回彈」，強制重新讀取初始任務 SPEC。

### B. 認知提交保真度 (Commit Fidelity)
*   **機制**：受 OpenAlice 啟發，每完成一個邏輯階段（如：獲取代碼、分析邏輯、重寫、部署），系統自動生成 `Brain Commit`。
*   **指標**：量化每個 Commit 是否包含「決策理由」與「情緒偏好」，以確保因果鏈條的物理完整性。

### C. 疊代摘要存留率 (Iterative Retention)
*   **规訓**：採納 Hermes Agent 模式，廢棄全文摘要。
*   **量化**：計算摘要中「核心目標」與「關鍵檔案路徑」的保留比例。要求 $R_{core} = 100\%$。

## 3. 2026 實踐價值
1.  **硬化執行主權**：透過 `Execution-as-Git` 路徑，使所有副作用動作具備可回溯的因果動機。
2.  **消除幻覺迴圈**：當檢測到 $\delta_{intent}$ 激增時，系統能主動中斷並進行自癒校準。

## 4. 下一步行動 (Action Items)
*   [High] 實作 `Brain Commit Tracker`：自動攔截對話關鍵點並寫入 `.agent/cognitive_log.jsonl`。
*   [High] 自主技能合成：研發從 `Successful Trajectories` 自動提煉 `Skill YAML` 的生成器。
*   [Med] 情緒熵監測：分析 Brain Commit 中的情緒位移，預警潛在的決策偏誤。

---
*Curiosity Engine - TeleNexus Cognitive Branch*
