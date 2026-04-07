# Curiosity Research: Causal Auditing of VLA Action Streams
> **VERSION: v26.0407.1330 (CST)**
> **STATUS: AUDIT_PROTOCOL_SPECIFIED**

## 1. 2026 因果防火牆背景
隨著 VLA 模型具備直接接管硬體與環境的操作權，單純的後處理（Post-processing）已無法應對毫秒級的物理風險。必須在因果層面（Causal Layer）建立主動攔截機制，確保 Agent 的動作流始終處於主權規訓之內。

## 2. TeleNexus 因果審計協定 (Causal Guard Protocol)
實裝路徑如下：

### A. 意圖解碼與反事實驗證 (Counterfactual Verification)
*   **機制**：攔截每一組 Action Tokens，利用輕量化模型反向生成其語義意圖。
*   **驗證問詢**：針對高風險動作（如修改核心 Repo、轉帳、物理位移），系統執行反事實問詢：「若缺乏 User 或 SPEC 指令，該動作是否仍有生成的必要？」
*   **結果**：若因果鏈條斷裂或動機不明，攔截器立即觸發 `HALT` 指令並緩慢復位。

### B. 因果影響密度規訓
*   **指標**：Causal Impact Density ($\rho_{causal}$)。
*   **規訓**：當單一動作流對系統狀態的位移超過 $0.15 \times \text{Threshold}$ 時，強制觸發影子執行 (Shadow Execution) 預演。
*   **價值**：預防 Agent 在執行過程中出現邏輯「發瘋」導致的系統性崩潰。

## 3. 2026 實踐價值
1.  **硬化執行主權**：即使 VLA 模型遭到對抗性誘導（Prompt Injection），因果層的攔截器也能因其缺乏正當動機鏈而拒絕執行危險動作。
2.  **可解釋性審計**：所有攔截行為均會生成因果日誌，明確指出哪一條「安全因果鏈」被違反，而非僅提供模糊的錯誤碼。

## 4. 下一步行動 (Action Items)
*   [ ] 開發 `Causal-Guard-Hook` 原型，支援 Action Stream 的攔截與影子執行。
*   [ ] 在 `causal-regulator` 中整合「意圖一致性評分」算法。
*   [ ] 研究「Causal Backtracking & Self-Healing」：當動作被攔截後，如何自動引導 Agent 回到上一個安全因果節點。

---
*Curiosity Engine - TeleNexus Causal Security Branch*
