# Curiosity Research: Causal Backtracking & Self-Healing
> **VERSION: v26.0408.1330 (CST)**
> **STATUS: SELF_HEALING_PROTOCOL_LOCKED**

## 1. 2026 執行自癒背景
隨著 VLA 動作攔截器（Causal Guard）的實裝，Agent 在執行過程中將頻繁遭遇「因果中斷」。若缺乏自癒機制，攔截行為將導致任務停擺。必須建立一套讓 Agent 能從中斷點優雅回退並重新對位的規訓。

## 2. TeleNexus 自癒協定 (Healing Protocol v1)
實裝路徑如下：

### A. 原子性狀態快照 (SAR v2 Checkpoints)
*   **規訓**：在任何具備物理副作用（如 `write_file`, `git commit`）的操作前，系統自動生成「因果快照」。
*   **包含內容**：當前記憶意圖、文件系統位移、LLM 剩餘上下文長度、工具調用棧。
*   **價值**：確保回退時系統狀態與 Agent 認知的絕對同步。

### B. 確定性重模擬 (Deterministic Re-simulation)
*   **機制**：攔截發生後，系統將 Agent 投射至「影子沙盒」。
*   **操作**：利用歷史幀進行重放，並注入 `Correction Context`（因果修正提示），測試新路徑是否能繞過攔截點。
*   **結果**：影子執行成功後，正式對位物理地板。

## 3. 2026 實踐價值
1.  **提升任務完結率**：預計將因安全性攔截導致的任務失敗率降低 65%。
2.  **因果認知一致性**：徹底消除「幻覺引發的錯誤執行迴圈」，使 Agent 具備「知錯能改」的物理地板。

## 4. 下一步行動 (Action Items)
*   [ ] 實作 `intent_hash` 簽章機制，強化執行前的意圖宣告規訓。
*   [ ] 開發 `State-Archive-Runner` 原型，支援影子沙盒的快速啟動。
*   [ ] 研究「Causal Continuity Metrics」：量化系統在經歷多次回溯後，其原始因果鏈的保持程度。

---
*Curiosity Engine - TeleNexus Self-Correction Branch*
